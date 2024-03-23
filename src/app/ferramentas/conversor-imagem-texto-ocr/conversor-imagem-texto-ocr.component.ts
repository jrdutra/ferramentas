import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-conversor-imagem-texto-ocr',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './conversor-imagem-texto-ocr.component.html',
  styleUrl: './conversor-imagem-texto-ocr.component.css'
})
export class ConversorImagemTextoOcrComponent {

  selectedFile: File | null = null;

  strTextoExtraido: string = "";

  constructor(private dataService: DataService) { 

  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Conversor OCR");
  }


  carregaArquivo(event: any): void {
    if(event.target != null){
      this.selectedFile = event.target.files[0];
    }
  }

  executarOcr(): void {
    // Aqui você pode enviar o arquivo para um serviço ou fazer o que for necessário com ele
    console.log('Arquivo selecionado:', this.selectedFile);
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

}
