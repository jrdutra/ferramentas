import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService } from '../../data.service';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { carregarPdfJsBrowser } from '../../services/pdfjs/pdfjs-browser-loader';

@Component({
  selector: 'app-separador-pdf',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './separador-pdf.component.html',
  styleUrl: './separador-pdf.component.css'
})
export class SeparadorPdfComponent {
  arquivo: File | null = null;
  numeroPaginas = 0;
  processandoPdf = false;
  processandoJpg = false;
  mensagem = '';
  erro = false;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('PDF Splitter');
  }

  async carregarArquivo(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.arquivo = input.files[0];
    this.mensagem = '';
    this.erro = false;
    this.numeroPaginas = 0;

    try {
      const bytes = await this.arquivo.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      this.numeroPaginas = pdf.getPageCount();
    } catch (e) {
      this.mensagem = 'Error reading the PDF. The file may be corrupted or protected.';
      this.erro = true;
      this.arquivo = null;
    }
  }

  async baixarZipPdfs(): Promise<void> {
    if (!this.arquivo) return;
    this.processandoPdf = true;
    this.mensagem = '';
    this.erro = false;

    try {
      const bytes = await this.arquivo.arrayBuffer();
      const pdfOriginal = await PDFDocument.load(bytes);
      const zip = new JSZip();

      for (let i = 0; i < pdfOriginal.getPageCount(); i++) {
        const novoPdf = await PDFDocument.create();
        const [pagina] = await novoPdf.copyPages(pdfOriginal, [i]);
        novoPdf.addPage(pagina);
        const pdfBytes = await novoPdf.save();
        zip.file(`page-${String(i + 1).padStart(3, '0')}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      this.download(zipBlob, 'split-pages.zip');
      this.mensagem = `ZIP generated with ${this.numeroPaginas} PDF file(s).`;
    } catch (e) {
      console.error(e);
      this.mensagem = 'Error splitting the pages.';
      this.erro = true;
    } finally {
      this.processandoPdf = false;
      this.cdr.detectChanges();
    }
  }

  async baixarZipJpgs(): Promise<void> {
    if (!this.arquivo || !isPlatformBrowser(this.platformId)) return;
    this.processandoJpg = true;
    this.mensagem = '';
    this.erro = false;

    try {
      const zipBlob = await this.ngZone.runOutsideAngular(async () => {
        const pdfjsLib = await carregarPdfJsBrowser();

        const bytes = await this.arquivo!.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: new Uint8Array(bytes) }).promise;
        const zip = new JSZip();

        const temOffscreen = typeof OffscreenCanvas !== 'undefined';
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          let blob: Blob;

          if (temOffscreen) {
            const offscreen = new OffscreenCanvas(viewport.width, viewport.height);
            await page.render({ canvasContext: offscreen.getContext('2d') as any, viewport }).promise;
            blob = await offscreen.convertToBlob({ type: 'image/jpeg', quality: 0.92 });
          } else {
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: canvas.getContext('2d') as any, viewport }).promise;
            blob = await this.canvasParaJpgBlob(canvas);
          }

          zip.file(`page-${String(i).padStart(3, '0')}.jpg`, blob);
        }

        return zip.generateAsync({ type: 'blob' });
      });

      this.download(zipBlob, 'jpg-pages.zip');
      this.mensagem = `ZIP generated with ${this.numeroPaginas} JPG image(s).`;
    } catch (e) {
      console.error(e);
      this.mensagem = 'Error converting pages to JPG.';
      this.erro = true;
    } finally {
      this.processandoJpg = false;
      this.cdr.detectChanges();
    }
  }

  removerArquivo(): void {
    this.arquivo = null;
    this.numeroPaginas = 0;
    this.mensagem = '';
    this.erro = false;
  }

  private download(blob: Blob, nome: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
    URL.revokeObjectURL(url);
  }

  private canvasParaJpgBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Failed to generate JPG')),
        'image/jpeg',
        0.92
      );
    });
  }
}
