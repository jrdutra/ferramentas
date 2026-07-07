import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';
import { Base64Service } from '../../services/base64/base64.service';

interface SegmentoMapeado {
  texto: string;
  base64: string;
  cor: string;
}

const CORES_BLOCO = [
  'rgba(0, 208, 255, 0.18)',
  'rgba(182, 37, 255, 0.18)',
  'rgba(255, 45, 178, 0.18)',
  'rgba(91, 124, 255, 0.18)',
  'rgba(0, 232, 92, 0.18)',
  'rgba(255, 230, 0, 0.18)',
  'rgba(255, 120, 50, 0.18)',
  'rgba(160, 230, 200, 0.18)',
];

const CORES_BLOCO_HOVER = [
  'rgba(0, 208, 255, 0.45)',
  'rgba(182, 37, 255, 0.45)',
  'rgba(255, 45, 178, 0.45)',
  'rgba(91, 124, 255, 0.45)',
  'rgba(0, 232, 92, 0.45)',
  'rgba(255, 230, 0, 0.45)',
  'rgba(255, 120, 50, 0.45)',
  'rgba(160, 230, 200, 0.45)',
];

@Component({
  selector: 'app-base64',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './base64.component.html',
  styleUrl: './base64.component.css'
})
export class Base64Component {

  strTexto: string = '';
  strBase64: string = '';
  segmentos: SegmentoMapeado[] = [];
  blocoDestacado: number = -1;

  constructor(private dataService: DataService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Base64 Text Converter");
  }

  codificaTexto() {
    this.strBase64 = this.base64Service.codificaTexto(this.strTexto);
    this.gerarMapeamento();
  }

  decodificaTexto() {
    this.strTexto = this.base64Service.decodificaTexto(this.strBase64);
    this.gerarMapeamento();
  }

  destacarBloco(indice: number) {
    this.blocoDestacado = indice;
  }

  limparDestaque() {
    this.blocoDestacado = -1;
  }

  corBloco(indice: number): string {
    if (this.blocoDestacado === indice) {
      return CORES_BLOCO_HOVER[indice % CORES_BLOCO_HOVER.length];
    }
    return CORES_BLOCO[indice % CORES_BLOCO.length];
  }

  private gerarMapeamento() {
    this.segmentos = [];
    if (!this.strTexto || !this.strBase64) return;

    const bytes = new TextEncoder().encode(this.strTexto);
    const textoOriginal = this.strTexto;
    let byteOffset = 0;
    let charOffset = 0;
    let base64Offset = 0;

    while (byteOffset < bytes.length) {
      const blocoBytes = Math.min(3, bytes.length - byteOffset);
      let charCount = 0;
      let bytesContados = 0;

      while (bytesContados < blocoBytes && charOffset + charCount < textoOriginal.length) {
        const codePoint = textoOriginal.codePointAt(charOffset + charCount)!;
        let bytesDoChar: number;
        if (codePoint <= 0x7F) bytesDoChar = 1;
        else if (codePoint <= 0x7FF) bytesDoChar = 2;
        else if (codePoint <= 0xFFFF) bytesDoChar = 3;
        else bytesDoChar = 4;

        if (bytesContados + bytesDoChar > blocoBytes && bytesContados > 0) {
          break;
        }

        charCount += codePoint > 0xFFFF ? 2 : 1;
        bytesContados += bytesDoChar;
      }

      const base64Chars = Math.ceil(bytesContados * 4 / 3);
      const base64ComPadding = Math.ceil(base64Chars / 4) * 4;
      const base64Restante = this.strBase64.length - base64Offset;
      const base64Len = Math.min(base64ComPadding, base64Restante);

      this.segmentos.push({
        texto: textoOriginal.substring(charOffset, charOffset + charCount),
        base64: this.strBase64.substring(base64Offset, base64Offset + base64Len),
        cor: CORES_BLOCO[this.segmentos.length % CORES_BLOCO.length]
      });

      byteOffset += bytesContados;
      charOffset += charCount;
      base64Offset += base64Len;
    }
  }
}
