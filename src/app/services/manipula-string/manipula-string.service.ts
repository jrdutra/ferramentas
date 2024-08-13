import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManipulaStringService {

  constructor() { }

  removeQuebraLinha(strTexto: string): string {
    return strTexto.replace(/(\r\n|\n|\r)/gm, "");
  }

}
