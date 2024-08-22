import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { ManipulaStringService } from '../../services/manipula-string/manipula-string.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quebra-linha',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './quebra-linha.component.html',
  styleUrl: './quebra-linha.component.css'
})
export class QuebraLinhaComponent {

  strTexto: string = '';
  strCaractereQuebra: string = '.';
  numQtQuebra: number = 0;
  strSubstituir: string = "";
  strSubstituirPor: string = "";
  strQtCaractere: string = "0";
  strQtPalavras: string = "0";

  constructor(private dataService: DataService, private manipulaStringService: ManipulaStringService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Quebra Linha");
  }

  onButtonClick(event: MouseEvent) {
    console.log('Button clicked');
  }

  onInputClick(event: MouseEvent) {
    event.stopPropagation();
    console.log('Input clicked');
  }

  removeQuebraDeLinhaEmStrTexto(){
    this.strTexto = this.manipulaStringService.removeQuebraLinha(this.strTexto);
  }

  executaTrimEmStrTexto(){
    this.strTexto = this.manipulaStringService.executaTrim(this.strTexto);
  }

  quebraPorCaractere(){
    this.strTexto = this.manipulaStringService.quebraPorCaractere(this.strTexto, this.strCaractereQuebra);
  }

  quebraPorQuantidade(){
    this.strTexto = this.manipulaStringService.quebraPorQuantidade(this.strTexto, this.numQtQuebra);
  }

  substituirTexto(){
    this.strTexto = this.manipulaStringService.substituiStr(this.strTexto, this.strSubstituir, this.strSubstituirPor);
  }

  todasMaiusculas() {
    this.strTexto = this.manipulaStringService.todasMaiusculas(this.strTexto);
  }

  todasMinusculas() {
    this.strTexto = this.manipulaStringService.todasMinusculas(this.strTexto);
  }

  primeirasMaiusculas(){
    this.strTexto = this.manipulaStringService.primeirasMaiusculas(this.strTexto);
  }

  atualizaQtCaracterePalavra(){
    this.strQtCaractere = this.manipulaStringService.quantidadeCaracteres(this.strTexto).toString()
    this.strQtPalavras = this.manipulaStringService.quantidadePalavras(this.strTexto).toString();
  }

  numerarLinhas(){
    this.strTexto = this.manipulaStringService.numerarLinhas(this.strTexto);
  }

  tracoInicioLinhas(){
    this.strTexto = this.manipulaStringService.tracoInicioLinhas(this.strTexto);
  }

}
