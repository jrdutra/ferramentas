import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-editor-json',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './editor-json.component.html',
  styleUrl: './editor-json.component.css'
})
export class EditorJsonComponent {

  strJson: string = '';
  strResultado: string = ''
  strJsonValido = 'Validade do Json';
  textoVermelho: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Editor de Json");
  }

  minificaJson() {
    if (this.seJsonValido(this.strJson)) {
      this.strResultado = this.padronizaJson(this.strJson);
    }
  }

  formataJson() {
    if (this.seJsonValido(this.strJson)) {
      let jsonPadronizado = this.padronizaJson(this.strJson);
      this.strResultado = JSON.stringify(JSON.parse(jsonPadronizado), null, 2);
    }
  }

  stringficaJson() {
    if (this.seJsonValido(this.strJson)) {
      this.strResultado = JSON.stringify(this.strJson);
    }
  }

  copiaJsonProcessadoEntrada(){
    this.strJson = this.strResultado;
    this.strResultado = '';
  }

  padronizaJson(strJsonRecebido: string): string {
    // Remover \n fora das aspas
    let texto1 = strJsonRecebido.replaceAll("\\n", '');
    // Remover \" por "
    let texto2 = texto1.replaceAll("\\\"", '"');
    // Remover \n fora das aspas
    let texto3 = texto2.replace(/\n/g, '');
    // Substitui  , " por , "
    let texto4 = texto3.replace(/\s*,\s*\"/g, ', \"');
    // Substitui  {   " por { " 
    let texto4_1 = texto4.replace(/\{\s*/g, '\{');
    // Substitui }            por }
    let texto4_2 = texto4_1.replace(/\}\s*/g, '\}');
    // Substitui            { por {
    let texto5 = texto4_2.replace(/\s*\{/g, '\{');
    //substitui       } por }
    let texto5_1 = texto5.replace(/\s*\}/g, '\}');
    //substitui         ] por ]
    let texto5_2 = texto5_1.replace(/\s*\]/g, '\]');
    //substitui [           por []
    let texto5_3 = texto5_2.replace(/\[\s*/g, '\[');
    //substituiu "{ por {
    let texto6 = texto5_3.replaceAll("\"{", '{');
    //substituiu "{ por {
    let texto7 = texto6.replaceAll("}\"", '}');
    return texto7;
  }

  seJsonValido(stringJson: string): boolean {
    try {
      JSON.parse(stringJson);
      this.strJsonValido = "Json válido";
      this.textoVermelho = false;
      return true;
    } catch (error) {
      this.strJsonValido = "Json inválido";
      this.textoVermelho = true;
      return false;
    }
  }
}
