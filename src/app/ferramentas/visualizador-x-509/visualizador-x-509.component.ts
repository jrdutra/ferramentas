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
    this.chavePublicaAlgoritmo = this.OIDToAlgorithmName[oidChavePublica] + ` (${oidChavePublica})` || "Unknown Algorithm";
    
    this.chavePublicaValor = this.converteUint8ArrayParaHexadecimal(cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);

    if (cert.extensions) {
      cert.extensions.forEach(extension => {
        this.extensoesId = this.OIDToAlgorithmName[extension.extnID] + ` (${extension.extnID})` || "Unknown Algorithm";
        
        this.extensoesCritical = `${extension.critical}`;
        this.extensoesValor = this.converteUint8ArrayParaHexadecimal(extension.extnValue.valueBlock.valueHexView);

        if (extension.extnID === '2.5.29.17') {
          this.nomeAlternativo = '';
          extension.parsedValue.altNames.forEach((altName: any, index: number) => {
            this.nomeAlternativo = this.nomeAlternativo + `Alt Name [${index}]: ${altName.value}; `;
          });
        }
      });
    }

    let oidAssinatura = cert.signatureAlgorithm.algorithmId;
    this.assinaturaAlgoritmo = this.OIDToAlgorithmName[oidAssinatura] + ` (${oidAssinatura})` || "Unknown Algorithm";
    
    this.assinaturaValor = this.converteUint8ArrayParaHexadecimal(cert.signatureValue.valueBlock.valueHexView);

    let fingerprint = this.certificateService.generateFingerprints(pem);

    let { md5, sha1, sha256, sha384, sha512 } = fingerprint;
    this.fingerPrintMD5 = md5;
    this.fingerPrintSha1 = sha1;
    this.fingerPrintSha256 = sha256;
    this.fingerPrintSha384 = sha384;
    this.fingerPrintSha512 = sha512;
  }

  converteUint8ArrayParaHexadecimal(uint8Array: Uint8Array): string {
    return Array.from(uint8Array).map(value => value.toString())
      .map(valor => {
        const hex = parseInt(valor, 10).toString(16);
        return hex.padStart(2, "0");
      }).map(value => value.toUpperCase())
      .join(" ");
  }

  OIDToAlgorithmName: { [key: string]: string } = {
    "1.2.840.113549.1.1.1": "RSA Encryption",
    "1.2.840.113549.1.1.5": "RSA with SHA-1",
    "1.2.840.113549.1.1.11": "RSASSA-PKCS1-v1_5",
    "1.2.840.113549.1.1.12": "RSASSA-PKCS1-v1_5 (SHA-256)",
    "1.2.840.113549.1.1.13": "RSASSA-PKCS1-v1_5 (SHA-512)",
    "1.2.840.10045.2.1": "ECDSA",
    "1.2.840.10045.4.3.2": "ECDSA with SHA-256",
    "1.2.840.10045.4.3.3": "ECDSA with SHA-512",
    "2.16.840.1.101.3.4.2.1": "SHA-256",
    "2.16.840.1.101.3.4.2.2": "SHA-384",
    "2.16.840.1.101.3.4.2.3": "SHA-512",
    "2.16.840.1.101.3.4.3.2": "SHA-512/256",
    "1.2.840.113549.2.5": "MD5",
    "1.2.840.113549.2.2": "SHA-1",
    "1.2.840.113549.1.3.2": "Diffie-Hellman",
    "1.2.840.113549.1.3.1": "Diffie-Hellman (X9.42)",
    "1.2.840.10045.3.1.7": "ECDH (Elliptic Curve Diffie-Hellman)",
    "1.2.840.10045.3.1.8": "ECDH with P-384",
    "1.2.840.10045.3.1.9": "ECDH with P-521",
    "2.16.840.1.101.3.4.1.2": "AES-128",
    "2.16.840.1.101.3.4.1.22": "AES-256",
    "2.16.840.1.101.3.4.1.42": "AES-192",
    "1.2.840.113549.1.1.7": "RSAES-OAEP",
    "1.2.840.113549.1.1.10": "RSAES-OAEP (SHA-1)",
    "1.2.840.10045.4.3.1": "ECDSA with SHA-1",
    "1.2.840.10045.2.1.3": "ECIES",           
    "1.2.840.113549.1.5.12": "PKCS12",
    "1.2.840.113549.1.9.1": "Email",
    "1.2.840.113549.1.9.3": "OID para o Certificado de Assinatura Digital",
    "1.2.840.113549.1.9.4": "OID para o Certificado de Criptografia",
  };

}
