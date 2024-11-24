import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CertificateService } from '../../services/certificate/certificate.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import * as asn1js from 'asn1js';
import { Certificate } from 'pkijs';

@Component({
  selector: 'app-visualizador-x-509',
  standalone: true,
  imports: [MatDividerModule, MatFormFieldModule, MatButtonModule, MatInputModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './visualizador-x-509.component.html',
  styleUrl: './visualizador-x-509.component.css'
})
export class VisualizadorX509Component {

  arquivoCertificado: File = new File([], "", { type: "text/plain" });

  mostraDados: boolean = false;

  fileName: string = "-";
  blob: string = "-"
  issuer: string = "-";
  subject: string = "-";
  serial: string = "-";
  validadeNotBefore: string = "-";
  validadeNotAfter: string = "-";
  chavePublicaAlgoritmo: string = "-";
  chavePublicaValor: string = "-";
  extensoesId: string = "-";
  extensoesCritical: string = "-";
  extensoesValor: string = "-";
  nomeAlternativo: string = "-";
  assinaturaAlgoritmo: string = "-";
  assinaturaValor: string = "-";
  fingerPrintSha1: string = "-";
  fingerPrintSha256: string = "-";
  fingerPrintSha384: string = "-";
  fingerPrintSha512: string = "-";
  fingerPrintMD5: string = "-";

  constructor(private dataService: DataService,
    private certificateService: CertificateService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Visualizador de X.509");
  }

  carregaArquivo(event: any): void {
    if (event.target != null) {
      this.arquivoCertificado = event.target.files[0];
      this.fileName = this.arquivoCertificado.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const stringCertificado = e.target.result;
        this.leCertificado(stringCertificado);
      };
      reader.onerror = (error) => {
        console.error('Erro ao ler o arquivo:', error);
      };
      reader.readAsText(this.arquivoCertificado);
    }
  }

  leCertificado(pem: string) {
    let dadosCertificado = this.certificateService.extraiInformacoesCertificado(pem);

    this.blob = dadosCertificado.blob;
    this.issuer = dadosCertificado.issuer;
    this.subject = dadosCertificado.subject;
    this.serial = dadosCertificado.serial;
    this.validadeNotBefore = dadosCertificado.validadeNotBefore;
    this.validadeNotAfter = dadosCertificado.validadeNotAfter;
    this.chavePublicaAlgoritmo = dadosCertificado.chavePublicaAlgoritmo;
    this.chavePublicaValor = dadosCertificado.chavePublicaValor;
    this.extensoesId = dadosCertificado.extensoesId;
    this.extensoesCritical = dadosCertificado.extensoesCritical;
    this.extensoesValor = dadosCertificado.extensoesValor;
    this.nomeAlternativo = dadosCertificado.nomeAlternativo;
    this.assinaturaAlgoritmo = dadosCertificado.assinaturaAlgoritmo;
    this.assinaturaValor = dadosCertificado.assinaturaValor;
    this.fingerPrintSha1 = dadosCertificado.fingerPrintSha1;
    this.fingerPrintSha256 = dadosCertificado.fingerPrintSha256;
    this.fingerPrintSha384 = dadosCertificado.fingerPrintSha384;
    this.fingerPrintSha512 = dadosCertificado.fingerPrintSha512;
    this.fingerPrintMD5 = dadosCertificado.fingerPrintMD5;

    this.mostraDados = true;
  }

}
