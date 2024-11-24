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
    const base64 = pem.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n|\r)/g, '');
    const binary = atob(base64);
    const binaryArray = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      binaryArray[i] = binary.charCodeAt(i);
    }
    
    const binaryCert = binaryArray.buffer;
    const asn1 = asn1js.fromBER(binaryCert);
    if (asn1.offset === -1) {
      throw new Error('Erro ao decodificar o certificado ASN.1');
    }

    this.blob = base64;
    const cert = new Certificate({ schema: asn1.result });

    this.issuer = '';
    cert.issuer.typesAndValues.forEach(attr => {
      this.issuer = this.issuer + `${attr.type}: ${attr.value.valueBlock.value}; `;
    });

    this.subject = '';
    cert.subject.typesAndValues.forEach(attr => {
      this.subject = this.subject + `${attr.type}: ${attr.value.valueBlock.value}`
    });

    this.serial = cert.serialNumber.valueBlock.toString();

    this.validadeNotBefore = cert.notBefore.value.toString();
    this.validadeNotAfter = cert.notAfter.value.toString();

    let oidChavePublica = `${cert.subjectPublicKeyInfo.algorithm.algorithmId}`;
    this.chavePublicaAlgoritmo = this.certificateService.OIDToAlgorithmName[oidChavePublica] + ` (${oidChavePublica})` || "Unknown Algorithm";
    
    this.chavePublicaValor = this.certificateService.converteUint8ArrayParaHexadecimal(cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);

    if (cert.extensions) {
      cert.extensions.forEach(extension => {
        this.extensoesId = this.certificateService.OIDToAlgorithmName[extension.extnID] + ` (${extension.extnID})` || "Unknown Algorithm";
        
        this.extensoesCritical = `${extension.critical}`;
        this.extensoesValor = this.certificateService.converteUint8ArrayParaHexadecimal(extension.extnValue.valueBlock.valueHexView);

        if (extension.extnID === '2.5.29.17') {
          this.nomeAlternativo = '';
          extension.parsedValue.altNames.forEach((altName: any, index: number) => {
            this.nomeAlternativo = this.nomeAlternativo + `Alt Name [${index}]: ${altName.value}; `;
          });
        }
      });
    }

    let oidAssinatura = cert.signatureAlgorithm.algorithmId;
    this.assinaturaAlgoritmo = this.certificateService.OIDToAlgorithmName[oidAssinatura] + ` (${oidAssinatura})` || "Unknown Algorithm";
    
    this.assinaturaValor = this.certificateService.converteUint8ArrayParaHexadecimal(cert.signatureValue.valueBlock.valueHexView);

    let fingerprint = this.certificateService.generateFingerprints(pem);

    let { md5, sha1, sha256, sha384, sha512 } = fingerprint;
    this.fingerPrintMD5 = md5;
    this.fingerPrintSha1 = sha1;
    this.fingerPrintSha256 = sha256;
    this.fingerPrintSha384 = sha384;
    this.fingerPrintSha512 = sha512;
  }

}
