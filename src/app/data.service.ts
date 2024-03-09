import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tituloAplicacao: any;

  constructor() { }

  setTituloAplicacao(valor: any) {
    this.tituloAplicacao = valor;
  }

  getTituloAplicacao() {
    return this.tituloAplicacao;
  }
}