import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  codificaTexto(strTexto: string): string{
    let utf8Bytes  = new TextEncoder().encode(strTexto);
    // Converte os bytes UTF-8 para uma string de caracteres Latin1
    let binaryString = '';
    utf8Bytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString);
  }

  decodificaTexto(strBase64: string): string{
    // Decodifica a string Base64 para uma string de caracteres Latin1
    const binaryString = atob(strBase64);

    // Converte a string Latin1 para um array de bytes UTF-8
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Converte os bytes UTF-8 para uma string UTF-8
    return new TextDecoder().decode(bytes);
  }
}
