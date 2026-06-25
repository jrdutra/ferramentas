import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../../data.service';
import { OcrService } from '../../services/ocr/ocr.service';

@Component({
  selector: 'app-conversor-imagem-texto-ocr',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './conversor-imagem-texto-ocr.component.html',
  styleUrl: './conversor-imagem-texto-ocr.component.css'
})
export class ConversorImagemTextoOcrComponent {
  selectedFile: File | null = null;
  previewUrl = '';
  strTextoExtraido = '';
  processando = false;
  progresso = 0;
  mensagemErro = '';
  copiado = false;

  constructor(
    private dataService: DataService,
    private ocrService: OcrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Conversor OCR');
  }

  carregaArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = URL.createObjectURL(this.selectedFile);
    this.strTextoExtraido = '';
    this.mensagemErro = '';
    this.progresso = 0;
  }

  async executarOcr(): Promise<void> {
    if (!this.selectedFile) return;
    this.processando = true;
    this.progresso = 0;
    this.strTextoExtraido = '';
    this.mensagemErro = '';
    this.copiado = false;

    try {
      this.strTextoExtraido = await this.ocrService.executarOcr(
        this.selectedFile,
        (p) => {
          this.progresso = p;
          this.cdr.detectChanges();
        }
      );
    } catch (e) {
      console.error(e);
      this.mensagemErro = 'Erro ao executar OCR. Tente novamente com outra imagem.';
    } finally {
      this.processando = false;
      this.progresso = 0;
      this.cdr.detectChanges();
    }
  }

  copiarTexto(): void {
    if (!this.strTextoExtraido) return;
    navigator.clipboard.writeText(this.strTextoExtraido).then(() => {
      this.copiado = true;
      setTimeout(() => { this.copiado = false; this.cdr.detectChanges(); }, 2000);
    });
  }
}
