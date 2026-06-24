import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly tituloAplicacaoSubject = new BehaviorSubject<string>('Inicio');
  readonly tituloAplicacao$ = this.tituloAplicacaoSubject.asObservable();

  constructor() { }

  setTituloAplicacao(valor: string) {
    this.tituloAplicacaoSubject.next(valor);
  }

  getTituloAplicacao() {
    return this.tituloAplicacaoSubject.value;
  }
}
