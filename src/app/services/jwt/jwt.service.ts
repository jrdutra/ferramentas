import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  validaFormatoJwt(strJwt: string): boolean {
    const regex = /^[a-zA-Z0-9_-]+?\.[a-zA-Z0-9_-]+?\.[a-zA-Z0-9_-]+$/;
    if (regex.test(strJwt)) {
      return true;
    }
    return false;
  }

  extraiToken(strJwt: string): string {
    const regex = /^(Bearer\s+|\s+)/;
    let tokenPuro = strJwt.replace(regex, '');
    return tokenPuro;
  }

  separaJWT(jwt: string): { header: string, body: string, signature: string } {
    let parts = jwt.split('.');
    let header = parts[0];
    let body = parts[1];
    let signature = parts[2]; // A assinatura não precisa ser decodificada, pois geralmente é codificada de outra maneira

    return { header, body, signature };
  }

}
