import { Injectable } from '@angular/core';

export interface JwePartes {
  protectedHeader: string;
  encryptedKey: string;
  initializationVector: string;
  ciphertext: string;
  authenticationTag: string;
}

@Injectable({
  providedIn: 'root'
})
export class JweService {

  extraiToken(strJwe: string): string {
    return strJwe.trim().replace(/^Bearer\s+/i, '').trim();
  }

  separaJwe(jwe: string): JwePartes {
    const parts = jwe.split('.');
    return {
      protectedHeader: parts[0] || '',
      encryptedKey: parts[1] || '',
      initializationVector: parts[2] || '',
      ciphertext: parts[3] || '',
      authenticationTag: parts[4] || ''
    };
  }

  validaFormatoJwe(strJwe: string): boolean {
    const parts = strJwe.split('.');
    if (parts.length !== 5) return false;

    const base64Url = /^[a-zA-Z0-9_-]*$/;
    const [protectedHeader, encryptedKey, initializationVector, ciphertext, authenticationTag] = parts;

    return !!protectedHeader &&
      base64Url.test(protectedHeader) &&
      base64Url.test(encryptedKey) &&
      !!initializationVector &&
      base64Url.test(initializationVector) &&
      !!ciphertext &&
      base64Url.test(ciphertext) &&
      !!authenticationTag &&
      base64Url.test(authenticationTag);
  }

  decodificarBase64Url(base64url: string): string {
    let b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);

    const binaryString = atob(b64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new TextDecoder().decode(bytes);
  }

  textoParaBase64Url(texto: string): string {
    const bytes = new TextEncoder().encode(texto);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}
