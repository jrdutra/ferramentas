import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { ManipulaStringService } from '../../services/manipula-string/manipula-string.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-de-texto',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './template-de-texto.component.html',
  styleUrl: './template-de-texto.component.css'
})
export class TemplateDeTextoComponent {

  strTexto = ""
  strTipoTexto = "TEMPLATE DE TEXTO"
  strQtCaractere: string = "0";
  strQtPalavras: string = "0";

  constructor(private dataService: DataService, private manipulaStringService: ManipulaStringService) {  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Template de Texto");
  }

  atualizaQtCaracterePalavra(){
    this.strQtCaractere = this.manipulaStringService.quantidadeCaracteres(this.strTexto).toString()
    this.strQtPalavras = this.manipulaStringService.quantidadePalavras(this.strTexto).toString();
  }

}
