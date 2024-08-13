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

}
