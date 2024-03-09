import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  minificaJson(strJsonRecebido: string): string {
    if (this.seJsonValido(strJsonRecebido)) {
      return this.padronizaJson(strJsonRecebido);
    }
    return "";
  }

  formataJson(strJsonRecebido: string): string {
    if (this.seJsonValido(strJsonRecebido)) {
      let jsonPadronizado = this.padronizaJson(strJsonRecebido);
      return JSON.stringify(JSON.parse(jsonPadronizado), null, 2);
    }
    return "";
  }

  stringficaJson(strJsonRecebido: string): string {
    if (this.seJsonValido(strJsonRecebido)) {
      return JSON.stringify(strJsonRecebido);
    }
    return "";
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
      return true;
    } catch (error) {
      return false;
    }
  }
}
