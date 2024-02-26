import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-leitor-area-cws',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './leitor-area-cws.component.html',
  styleUrl: './leitor-area-cws.component.css'
})
export class LeitorAreaCwsComponent {
  esconderBrancoseZeros = true;
  bookCws = '';
  areaComunicacao = '';
  resultadoLeitura = "arquivo lido com sucesso!";

  executar(): void {
    let textoBook: string = this.bookCws;
    let textoComunicacao: string = this.areaComunicacao;

    let linhas: string[] = textoBook.split(/\r?\n/);
    
    let linhasUteis: string[] = this.retornaLinhasUteis(linhas);

    let campos: Campo[] = this.lerCampos(linhasUteis, textoComunicacao); // Supondo que `lerCampos` retorna um array de tipo 'Campo', substitua 'Campo' pelo tipo correto.

    const checkOmitirZeros: boolean = this.esconderBrancoseZeros;

    let textoResultado: string = "";
    for (let i = 0; i < campos.length; i++) {
        const regexSemInformacao: RegExp = /^[0\s]+$/;

        const conteudo = campos[i].conteudo ?? "";

        if (checkOmitirZeros) {
            if (!regexSemInformacao.test(conteudo)) {
                // Constrói texto
                textoResultado = textoResultado + this.retornaTextoLinhaExibicao(campos[i]);
            }
        } else {
            textoResultado = textoResultado + this.retornaTextoLinhaExibicao(campos[i]);
        }
    }
    this.resultadoLeitura = textoResultado; // Se resultadoLeitura é uma variável de instância, você deve usar 'this.resultadoLeitura'.
}


  retornaTextoLinhaExibicao(campo: any): string {
    let espacamento = "";
    for (let l = 0; l < campo.nivel; l++) {
      espacamento += "&nbsp";
    }
    let textoOcorrencia = parseInt(campo.ocorrencia) !== -1 ? `[${(parseInt(campo.ocorrencia) + 1).toString()} de ${campo.ocorrenciaTotal}] ` : "";
    let textoLinha = `<br>${espacamento}${textoOcorrencia}${campo.nome} = ${campo.conteudo}`;
    return textoLinha;
  }

  lerCampos(linhas: string[], textoComunicacao: string): any[] {
    let campos = [];
    let pivor = 0;
    const regexSomenteNumeros = /^[0-9]+$/;

    for (let i = 0; i < linhas.length; i++) {
      if (!regexSomenteNumeros.test(linhas[i])) {
        let conteudoCampo = textoComunicacao.substring(pivor, pivor + this.retornaTamanho(linhas[i]));
        pivor += this.retornaTamanho(linhas[i]);
        let campo = { nome: this.retornaNome(linhas[i]), tamanho: this.retornaTamanho(linhas[i]), nivel: this.retornaNivel(linhas[i]), ocorrencia: -1, ocorrenciaTotal: -1, conteudo: conteudoCampo };
        campos.push(campo);
      } else {
        let listaOcorrencias = [];
        const regexDependingOn = /DEPENDING ON/;
        const regexCampoDependingOn = /DEPENDING ON ([A-Z]|[0-9]|-)+/;
        let numeroOcorrencia = 0;

        if (regexDependingOn.test(linhas[i + 1])) {
          let nomeCampoDependingOn = linhas[i + 1].match(regexCampoDependingOn)![0].replace("DEPENDING ON ", "");
          let campoDependingOn = campos.filter(campo => campo.nome === nomeCampoDependingOn)[0];
          numeroOcorrencia = parseInt(campoDependingOn.conteudo);
          i++; // Avança um para pegar a primeira linha das ocorrências
        } else {
          numeroOcorrencia = parseInt(linhas[i]);
        }

        let nivelPrimeiraOcorrencia = this.retornaNivel(linhas[i + 1]);
        let nivelDemaisOcorrencia = nivelPrimeiraOcorrencia;
        let contadorCampoOcorrencias = 1;

        while (nivelPrimeiraOcorrencia === nivelDemaisOcorrencia) {
          listaOcorrencias.push(linhas[i + contadorCampoOcorrencias]);
          contadorCampoOcorrencias++;
          if (i + contadorCampoOcorrencias < linhas.length) { // Evita acessar índice fora do array
            nivelDemaisOcorrencia = this.retornaNivel(linhas[i + contadorCampoOcorrencias]);
          } else {
            break;
          }
        }

        i += contadorCampoOcorrencias - 1;

        for (let j = 0; j < numeroOcorrencia; j++) {
          for (let k = 0; k < listaOcorrencias.length; k++) {
            let conteudoCampo = textoComunicacao.substring(pivor, pivor + this.retornaTamanho(listaOcorrencias[k]));
            pivor += this.retornaTamanho(listaOcorrencias[k]);
            let campo = { nome: this.retornaNome(listaOcorrencias[k]), tamanho: this.retornaTamanho(listaOcorrencias[k]), nivel: this.retornaNivel(listaOcorrencias[k]), ocorrencia: j, ocorrenciaTotal: numeroOcorrencia, conteudo: conteudoCampo };
            campos.push(campo);
          }
        }
      }
    }
    return campos;
  }

  retornaLinhasUteis(linhas: string[]): string[] {
    let linhasUteis = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      const regexCampo = /[0-9][0-9] ([A-Z]|[0-9]|-)+( )+PIC( )+((X\([0-9]+\))|(9\([0-9]+\)V[0-9]\([0-9]+\))|(9\([0-9]+\)V[0-9][0-9])|(9\([0-9]+\)V[0-9])|9\([0-9]+\))/;
      const regexOcorrencias = /OCCURS( )+[0-9]+( )+TIMES/;
      const regexApenasNumero = /[0-9]+/;
      const regexDependingOn = /DEPENDING ON/;
      const regexCampoDependingOn = /DEPENDING ON ([A-Z]|[0-9]|-)+/;

      if (regexCampo.test(linha)) {
        linhasUteis.push(linha.match(regexCampo)![0]);
      }

      if (regexOcorrencias.test(linha)) {
        let qtdOccurs = linha.match(regexOcorrencias)![0].match(regexApenasNumero)![0];
        linhasUteis.push(qtdOccurs);

        if (!regexDependingOn.test(linha)) {
          if (regexDependingOn.test(linhas[i + 1])) {
            linha = linhas[i + 1];
          }
        }

        if (regexDependingOn.test(linha)) {
          let textoDependingOn = linha.match(regexCampoDependingOn)![0];
          linhasUteis.push(textoDependingOn);
        }
      }
    }
    return linhasUteis;
  }

  buscaLinhaPorNomeCampo(linhas: string[], nomeCampo: string): string {
    const regexNomeCampo = new RegExp(nomeCampo);
    const regexComentario = /\*/;
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      if (regexNomeCampo.test(linha) && !regexComentario.test(linha)) {
        return linha;
      }
    }
    return "";
  }

  retornaNivel(linha: string): number {
    try {
      const regexNivel = /^[0-9]+ /;
      let nivel = linha.match(regexNivel)![0].trim();
      return parseInt(nivel);
    } catch (exceptionVar) {
      return -1;
    }
  }

  retornaNome(linha: string): string {
    try {
      const regexNome = /([A-Z]|[0-9]|-){4,}/;
      let nome = linha.match(regexNome)![0];
      return nome;
    } catch (exceptionVar) {
      return "ERRO_AO_BUSCAR_NOME";
    }
  }


  retornaTamanho(linha: string): number {
    let tamanhoAlfaNumerico = /X\([0-9]+\)/;
    let tamanhoInteiroRegex = /9\.[0-9]+\./;
    let tamanhoDecimalRegex = /9\.[0-9]+\.[A-Z].+/;

    let tamanho: string;

    if (tamanhoAlfaNumerico.test(linha)) {
      tamanho = linha.match(tamanhoAlfaNumerico)![0]; // Usamos '!' para afirmar que o resultado não será nulo.
      const regexApenasNumero = new RegExp("[0-9]+");
      tamanho = tamanho.match(regexApenasNumero)![0];
      return parseInt(tamanho, 10);
    }

    if (tamanhoDecimalRegex.test(linha)) {
      tamanho = linha.match(tamanhoDecimalRegex)![0];
      const regexApenasNumeroParenteses = /[0-9]+\)/;
      let tamanhoInteiro = tamanho.substring(2).match(regexApenasNumeroParenteses)![0];
      tamanhoInteiro = tamanhoInteiro.slice(0, tamanhoInteiro.length - 1);

      // Calcular tamanho decimal
      let tamanhoDecimal = tamanho.substring(5);
      let tamanhoDecimalNum = 0;
      const regexTamanhoDecimal1 = /V9/;
      if (regexTamanhoDecimal1.test(tamanhoDecimal)) {
        tamanhoDecimalNum = 1;
      }

      const regexTamanhoDecimal2 = /V99/;
      if (regexTamanhoDecimal2.test(tamanhoDecimal)) {
        tamanhoDecimalNum = 2;
      }

      const regexTamanhoDecimalN = /V9\([0-9]+\)/;
      if (regexTamanhoDecimalN.test(tamanhoDecimal)) {
        tamanhoDecimal = tamanhoDecimal.match(regexTamanhoDecimalN)![0];
        tamanhoDecimal = tamanhoDecimal.substring(2);
        tamanhoDecimal = tamanhoDecimal.match(new RegExp("[0-9]+"))![0];
        tamanhoDecimalNum = parseInt(tamanhoDecimal, 10);
      }

      return parseInt(tamanhoInteiro, 10) + tamanhoDecimalNum;
    }

    if (tamanhoInteiroRegex.test(linha)) {
      tamanho = linha.match(tamanhoInteiroRegex)![0];
      tamanho = tamanho.substring(2);
      tamanho = tamanho.match(new RegExp("[0-9]+"))![0];
      return parseInt(tamanho, 10);
    }

    return 0;
  }


}

class Campo {
  nome: string | null;
  tamanho: number | null;
  nivel: number | null;
  ocorrencia: number | null;
  ocorrenciaTotal: number | null;
  conteudo: string | null;

  constructor() {
    this.nome = null;
    this.tamanho = null;
    this.nivel = null;
    this.ocorrencia = null;
    this.ocorrenciaTotal = null;
    this.conteudo = null;
  }

  toString(): string {
    return `Nome: ${this.nome}, Tamanho: ${this.tamanho}, Nível: ${this.nivel}, Ocorrência: ${this.ocorrencia}, Ocorrência Total: ${this.ocorrenciaTotal}, Conteúdo: ${this.conteudo}`;
  }
}