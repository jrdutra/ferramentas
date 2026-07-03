import { Component, Inject, PLATFORM_ID, NgZone, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from '../../data.service';
import { PDFDocument } from 'pdf-lib';
import { carregarPdfJsBrowser } from '../../services/pdfjs/pdfjs-browser-loader';

interface ArquivoCarregado {
  file: File;
  nome: string;
  tipo: 'pdf' | 'imagem';
}

interface PreviewImagem {
  url: string;
  nome: string;
}

@Component({
  selector: 'app-juntador-pdf',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, DragDropModule],
  templateUrl: './juntador-pdf.component.html',
  styleUrl: './juntador-pdf.component.css'
})
export class JuntadorPdfComponent {
  arquivos: ArquivoCarregado[] = [];
  processando = false;
  processandoImg = false;
  mensagem = '';
  erro = false;
  previewImagem: PreviewImagem | null = null;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: object,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Juntador de PDFs e Imagens');
  }

  carregarArquivos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    for (const file of Array.from(input.files)) {
      const tipo: 'pdf' | 'imagem' = file.type === 'application/pdf' ? 'pdf' : 'imagem';
      this.arquivos.push({ file, nome: file.name, tipo });
    }
    input.value = '';
    this.mensagem = '';
  }

  reordenar(event: CdkDragDrop<ArquivoCarregado[]>): void {
    moveItemInArray(this.arquivos, event.previousIndex, event.currentIndex);
  }

  remover(index: number): void {
    if (this.previewImagem?.nome === this.arquivos[index]?.nome) this.fecharPreviewImagem();
    this.arquivos.splice(index, 1);
  }

  limpar(): void {
    this.fecharPreviewImagem();
    this.arquivos = [];
    this.mensagem = '';
    this.erro = false;
  }

  abrirPreviewImagem(arquivo: ArquivoCarregado): void {
    if (arquivo.tipo !== 'imagem' || !isPlatformBrowser(this.platformId)) return;
    this.fecharPreviewImagem();
    this.previewImagem = {
      url: URL.createObjectURL(arquivo.file),
      nome: arquivo.nome,
    };
  }

  fecharPreviewImagem(): void {
    if (this.previewImagem) URL.revokeObjectURL(this.previewImagem.url);
    this.previewImagem = null;
  }

  async juntar(): Promise<void> {
    if (this.arquivos.length === 0) return;
    this.processando = true;
    this.mensagem = '';
    this.erro = false;

    try {
      const pdfFinal = await PDFDocument.create();

      for (const arquivo of this.arquivos) {
        const bytes = await arquivo.file.arrayBuffer();

        if (arquivo.tipo === 'pdf') {
          const pdf = await PDFDocument.load(bytes);
          const paginas = await pdfFinal.copyPages(pdf, pdf.getPageIndices());
          paginas.forEach(p => pdfFinal.addPage(p));
        } else {
          const embedded = await this.embedImagem(pdfFinal, arquivo.file, bytes);
          const { width, height } = embedded;
          const pagina = pdfFinal.addPage([width, height]);
          pagina.drawImage(embedded, { x: 0, y: 0, width, height });
        }
      }

      const pdfBytes = await pdfFinal.save();
      this.download(new Blob([pdfBytes], { type: 'application/pdf' }), 'documento-juntado.pdf');
      this.mensagem = `PDF gerado com sucesso! (${this.arquivos.length} arquivo(s) juntado(s))`;
    } catch (e) {
      console.error(e);
      this.mensagem = 'Erro ao processar os arquivos. Verifique se os PDFs não estão protegidos.';
      this.erro = true;
    } finally {
      this.processando = false;
    }
  }

  async baixarComoImagem(): Promise<void> {
    if (this.arquivos.length === 0 || !isPlatformBrowser(this.platformId)) return;
    this.processandoImg = true;
    this.mensagem = '';
    this.erro = false;

    try {
      const blob = await this.ngZone.runOutsideAngular(async () => {
        const pdfjsLib = await carregarPdfJsBrowser();

        const canvases: { width: number; height: number; draw: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void }[] = [];
        const temOffscreen = typeof OffscreenCanvas !== 'undefined';

        for (const arquivo of this.arquivos) {
          const bytes = await arquivo.file.arrayBuffer();

          if (arquivo.tipo === 'pdf') {
            const pdfDoc = await pdfjsLib.getDocument({ data: new Uint8Array(bytes) }).promise;
            for (let i = 1; i <= pdfDoc.numPages; i++) {
              const page = await pdfDoc.getPage(i);
              const viewport = page.getViewport({ scale: 2.0 });

              if (temOffscreen) {
                const offscreen = new OffscreenCanvas(viewport.width, viewport.height);
                await page.render({ canvasContext: offscreen.getContext('2d') as any, viewport }).promise;
                const bitmap = await createImageBitmap(offscreen);
                const w = viewport.width;
                const h = viewport.height;
                canvases.push({ width: w, height: h, draw: (ctx, x, y, dw, dh) => ctx.drawImage(bitmap, x, y, dw, dh) });
              } else {
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d') as any, viewport }).promise;
                const w = viewport.width;
                const h = viewport.height;
                canvases.push({ width: w, height: h, draw: (ctx, x, y, dw, dh) => ctx.drawImage(canvas, x, y, dw, dh) });
              }
            }
          } else {
            const imgCanvas = await this.imagemParaCanvas(arquivo.file);
            canvases.push({ width: imgCanvas.width, height: imgCanvas.height, draw: (ctx, x, y, dw, dh) => ctx.drawImage(imgCanvas, x, y, dw, dh) });
          }
        }

        const larguraFinal = Math.max(...canvases.map(c => c.width));
        const alturas = canvases.map(c => Math.round(c.height * (larguraFinal / c.width)));
        const alturaTotal = alturas.reduce((acc, h) => acc + h, 0);

        const final = document.createElement('canvas');
        final.width = larguraFinal;
        final.height = alturaTotal;
        const ctx = final.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, larguraFinal, alturaTotal);

        let y = 0;
        for (let i = 0; i < canvases.length; i++) {
          canvases[i].draw(ctx, 0, y, larguraFinal, alturas[i]);
          y += alturas[i];
        }

        return new Promise<Blob>((resolve, reject) => {
          final.toBlob(b => b ? resolve(b) : reject(new Error('Falha ao gerar blob')), 'image/jpeg', 0.92);
        });
      });

      this.download(blob, 'imagens-juntadas.jpg');
      this.mensagem = `Imagem gerada com sucesso!`;
    } catch (e) {
      console.error(e);
      this.mensagem = 'Erro ao gerar a imagem.';
      this.erro = true;
    } finally {
      this.processandoImg = false;
      this.cdr.detectChanges();
    }
  }

  private imagemParaCanvas(file: File): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagem inválida')); };
      img.src = url;
    });
  }

  private async embedImagem(pdfDoc: PDFDocument, file: File, bytes: ArrayBuffer): Promise<any> {
    const tipo = file.type;
    if (tipo === 'image/jpeg' || tipo === 'image/jpg') return pdfDoc.embedJpg(bytes);
    if (tipo === 'image/png') return pdfDoc.embedPng(bytes);
    return this.embedViaCanvas(pdfDoc, file);
  }

  private embedViaCanvas(pdfDoc: PDFDocument, file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
        canvas.toBlob(async (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) { reject(new Error('Falha na conversão da imagem')); return; }
          try { resolve(await pdfDoc.embedJpg(await blob.arrayBuffer())); } catch (e) { reject(e); }
        }, 'image/jpeg', 0.95);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagem inválida')); };
      img.src = url;
    });
  }

  private download(blob: Blob, nome: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
    URL.revokeObjectURL(url);
  }
}
