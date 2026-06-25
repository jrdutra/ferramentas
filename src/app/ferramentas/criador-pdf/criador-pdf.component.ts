import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from '../../data.service';
import { PDFDocument } from 'pdf-lib';

interface ImagemCarregada {
  file: File;
  nome: string;
  preview: string;
}

@Component({
  selector: 'app-criador-pdf',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, DragDropModule],
  templateUrl: './criador-pdf.component.html',
  styleUrl: './criador-pdf.component.css'
})
export class CriadorPdfComponent {
  imagens: ImagemCarregada[] = [];
  processando = false;
  mensagem = '';
  erro = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Criador de PDF');
  }

  carregarImagens(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    for (const file of Array.from(input.files)) {
      this.imagens.push({
        file,
        nome: file.name,
        preview: URL.createObjectURL(file)
      });
    }
    input.value = '';
    this.mensagem = '';
  }

  reordenar(event: CdkDragDrop<ImagemCarregada[]>): void {
    moveItemInArray(this.imagens, event.previousIndex, event.currentIndex);
  }

  remover(index: number): void {
    URL.revokeObjectURL(this.imagens[index].preview);
    this.imagens.splice(index, 1);
  }

  limpar(): void {
    this.imagens.forEach(img => URL.revokeObjectURL(img.preview));
    this.imagens = [];
    this.mensagem = '';
    this.erro = false;
  }

  async criarPdf(): Promise<void> {
    if (this.imagens.length === 0) return;
    this.processando = true;
    this.mensagem = '';
    this.erro = false;

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imagem of this.imagens) {
        const bytes = await imagem.file.arrayBuffer();
        let embedded: any;

        const tipo = imagem.file.type;
        if (tipo === 'image/jpeg' || tipo === 'image/jpg') {
          embedded = await pdfDoc.embedJpg(bytes);
        } else if (tipo === 'image/png') {
          embedded = await pdfDoc.embedPng(bytes);
        } else {
          embedded = await this.embedViaCanvas(pdfDoc, imagem.file);
        }

        const { width, height } = embedded;
        const pagina = pdfDoc.addPage([width, height]);
        pagina.drawImage(embedded, { x: 0, y: 0, width, height });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'imagens-para-pdf.pdf';
      a.click();
      URL.revokeObjectURL(url);

      this.mensagem = `PDF criado com ${this.imagens.length} página(s)!`;
    } catch (e) {
      console.error(e);
      this.mensagem = 'Erro ao criar o PDF. Verifique se as imagens são válidas.';
      this.erro = true;
    } finally {
      this.processando = false;
    }
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
          if (!blob) { reject(new Error('Falha ao converter imagem')); return; }
          try {
            resolve(await pdfDoc.embedJpg(await blob.arrayBuffer()));
          } catch (e) { reject(e); }
        }, 'image/jpeg', 0.95);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagem inválida')); };
      img.src = url;
    });
  }
}
