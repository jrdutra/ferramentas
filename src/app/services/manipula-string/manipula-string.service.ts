import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManipulaStringService {

  constructor() { }

  removeQuebraLinha(strTexto: string): string {
    return strTexto.replace(/(\r\n|\n|\r)/gm, "");
  }

  executaTrim(strTexto: string): string {
    strTexto = strTexto.replace(/\s+/g, ' ');
    return strTexto.trim();
  }

  quebraPorCaractere(strTexto: string, caractere: string): string {
    strTexto = this.removeQuebraLinha(strTexto);
    return strTexto.split(caractere).join(caractere + '\n');
  }

  quebraPorQuantidade(strTexto: string, quantidade: number): string {
    if (quantidade != 0) {
      strTexto = this.removeQuebraLinha(strTexto);
      const partes: string[] = [];
      for (let i = 0; i < strTexto.length; i += quantidade) {
        partes.push(strTexto.slice(i, i + quantidade));
      }
      return partes.join("\n");
    }
    return strTexto;
  }

  substituiStr(strTexto: string, strSubstituir: string, strSubstituirPor: string, ): string {
    return strTexto.replaceAll(strSubstituir, strSubstituirPor);
  }

  todasMaiusculas(strTexto: string): string {
    return strTexto.toUpperCase();
  }

  todasMinusculas(strTexto: string): string {
    return strTexto.toLowerCase();
  }

  primeirasMaiusculas(strTexto: string): string {
    let textoCapitalizado: string = strTexto
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
    .join(' ');
    return textoCapitalizado;
  }

  quantidadePalavras(strTexto: string): number {
    if (!strTexto.trim()) {
      return 0;
    }
    return strTexto.trim().split(/\s+/).length;
  }

  quantidadeCaracteres(strTexto: string): number {
    return strTexto.length;
  }

  numerarLinhas(strTexto: string): string {
    let contador = 1;
    return strTexto.replace(/^|(\n)/g, (_, p1) => {
        // Adiciona o número seguido por um único espaço, removendo espaços extras
        return `${p1 || ''}${contador++} `;
    }).replace(/(\d)\s+/g, '$1 ');
  }

  tracoInicioLinhas(strTexto: string): string{
    return strTexto.replace(/^|(\n)/g, (_, p1) => {
      // Adiciona o caractere '-' seguido por um único espaço
      return `${p1 || ''}- `;
  }).replace(/(-)\s+/g, '$1 ');
  }

}
