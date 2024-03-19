import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-conversor-imagem-texto-ocr',
  standalone: true,
  imports: [],
  templateUrl: './conversor-imagem-texto-ocr.component.html',
  styleUrl: './conversor-imagem-texto-ocr.component.css'
})
export class ConversorImagemTextoOcrComponent {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Conversor OCR");
  }

}
