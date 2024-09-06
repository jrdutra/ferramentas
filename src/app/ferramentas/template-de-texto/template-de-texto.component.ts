import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { VariavelTemplateTexto } from '../../models/variavel-template-texto.model';
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

  strTemplate = ""
  strTexto = ""
  strTipoTexto = "TEMPLATE DE TEXTO"
  strQtCaractere: string = "0";
  strQtPalavras: string = "0";
  variaveisTemplate: VariavelTemplateTexto[] = []; 

  constructor(private dataService: DataService, private manipulaStringService: ManipulaStringService) {  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Template de Texto");
  }

  atualizaQtCaracterePalavra(){
    this.strQtCaractere = this.manipulaStringService.quantidadeCaracteres(this.strTexto).toString()
    this.strQtPalavras = this.manipulaStringService.quantidadePalavras(this.strTexto).toString();
  }

  extraiVariaveisDoTexto(text: string): VariavelTemplateTexto[] {
    let variaveisTemplate: VariavelTemplateTexto[] = []; 
    const regex = /\[\[([a-zA-Z0-9_]+)\]\]/g;
    let encontrado;
    const variaveis = new Set<string>(); 
  
    while ((encontrado = regex.exec(text)) !== null) {
      variaveis.add(encontrado[1]);
    }

    let arrayVariaveis: string[] = Array.from(variaveis);

    for (const str of arrayVariaveis) {
      const novoObjeto: VariavelTemplateTexto = {
        nomeVariavel: str,
        conteudoVariavel: ''
      };
      variaveisTemplate.push(novoObjeto);
    }
  
    return variaveisTemplate;
  }

  carregaTemplate(){
    this.strTemplate = this.strTexto
    this.variaveisTemplate = this.extraiVariaveisDoTexto(this.strTemplate)
    console.log(this.variaveisTemplate);
    this.strTipoTexto = "TEMPLATE DE TEXTO";
  }

  gerarTexto(){
    let textoGerado: string = this.strTemplate;
    
    for(let variavelTemplateTexto of this.variaveisTemplate){
      let textoSubstituir = "[[" + variavelTemplateTexto.nomeVariavel + "]]";
      textoGerado = this.manipulaStringService.substituiStr(textoGerado, textoSubstituir, variavelTemplateTexto.conteudoVariavel);
    }
    this.strTexto = textoGerado
    this.strTipoTexto = "TEXTO FINAL";
  }

  visualizarTemplate(){
    this.strTexto = this.strTemplate;
    this.strTipoTexto = "TEMPLATE DE TEXTO";
  }

}
