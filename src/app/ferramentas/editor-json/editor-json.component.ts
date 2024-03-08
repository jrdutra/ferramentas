import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-editor-json',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './editor-json.component.html',
  styleUrl: './editor-json.component.css'
})
export class EditorJsonComponent {

  strJson: string = '';
  strResultado: string = ''
  strJsonValido = '...';

  minificaJson() {
    this.strResultado = this.padronizaJson(this.strJson);
  }

  formataJson() {
    let jsonPadronizado = this.padronizaJson(this.strJson);
    this.strResultado = JSON.stringify(JSON.parse(jsonPadronizado), null, 2);
  }

  stringficaJson() {
    this.strResultado = JSON.stringify(this.strJson);
  }

  padronizaJson(strJsonRecebido: string): string{
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

}
