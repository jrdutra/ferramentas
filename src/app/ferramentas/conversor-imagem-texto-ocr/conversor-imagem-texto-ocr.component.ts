import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { OcrService } from '../../services/ocr/ocr.service'
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

  selectedFile: File | string = "";
  strTextoExtraido: string = "";
  strTextoBotaoExecutarOcr = "Executar OCR";
 
  constructor(private dataService: DataService, 
    private ocrService: OcrService) { 

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
    
    this.strTextoBotaoExecutarOcr = "PROCESSANDO...";

    console.log('Arquivo selecionado:', this.selectedFile);
    if(this.selectedFile instanceof File){
      this.ocrService.executarOcr(this.selectedFile)
      .then(result => {
        this.strTextoExtraido = result;
        this.strTextoBotaoExecutarOcr = "Executar OCR";
      })
      .catch(error => {
        this.strTextoExtraido = error;
        this.strTextoBotaoExecutarOcr = "Executar OCR";
      });;
    
    }
  }

  getPreviewUrl(file: File | string): string {
    if(file instanceof File){
      return URL.createObjectURL(file);
    }
    return file;
  }
}
