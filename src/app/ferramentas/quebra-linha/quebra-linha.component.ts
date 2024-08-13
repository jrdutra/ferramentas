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
  strCaractereQuebra: string = ';';
  numQtQuebra: number = 0;

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

}
