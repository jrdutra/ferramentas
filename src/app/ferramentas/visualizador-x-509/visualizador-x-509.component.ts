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

    // Carrega o certificado usando ASN.1
    const asn1 = asn1js.fromBER(binaryCert);
    if (asn1.offset === -1) {
      throw new Error('Erro ao decodificar o certificado ASN.1');
    }

    this.blob = base64;

    // Cria um objeto de certificado PKI.js
    const cert = new Certificate({ schema: asn1.result });

    // Exibe informações do emissor
    //console.log('Issuer (Emissor):');
    this.issuer = '';
    cert.issuer.typesAndValues.forEach(attr => {
      //console.log(`  ${attr.type}: ${attr.value.valueBlock.value}`);
      this.issuer = this.issuer + `${attr.type}: ${attr.value.valueBlock.value}; `;
    });

    // Exibe informações do sujeito
    //console.log('Subject (Sujeito):');
    this.subject = '';
    cert.subject.typesAndValues.forEach(attr => {
      //console.log(`  ${attr.type}: ${attr.value.valueBlock.value}`);
      this.subject = this.subject + `${attr.type}: ${attr.value.valueBlock.value}`
    });

    // Exibe número de série
    //console.log('Serial Number (Número de Série):', cert.serialNumber.valueBlock.valueHex);
    this.serial = cert.serialNumber.valueBlock.toString();
    // Exibe o período de validade
    //console.log('Validity Period (Período de Validade):');
    //console.log('  Not Before:', cert.notBefore.value);
    //console.log('  Not After:', cert.notAfter.value);
    this.validadeNotBefore = cert.notBefore.value.toString();
    this.validadeNotAfter = cert.notAfter.value.toString();

    // Exibe a chave pública
    //console.log('Public Key (Chave Pública):');
    //console.log('  Algorithm:', cert.subjectPublicKeyInfo.algorithm.algorithmId);
    //console.log('  Public Key Value:', cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex);

    let oidChavePublica = `${cert.subjectPublicKeyInfo.algorithm.algorithmId}`;
    //this.chavePublicaAlgoritmo = this.OIDToAlgorithmName[oidChavePublica] + ` (${oidChavePublica})` || "Unknown Algorithm";
    this.chavePublicaAlgoritmo = ` (${oidChavePublica})` || "Unknown Algorithm";

    this.chavePublicaValor = this.converteParaHexadecimal(cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);

    if (cert.extensions) {
      cert.extensions.forEach(extension => {
        //this.extensoesId = this.OIDToAlgorithmName[extension.extnID] + ` (${extension.extnID})` || "Unknown Algorithm";
        this.extensoesId = ` (${extension.extnID})` || "Unknown Algorithm";
        
        this.extensoesCritical = `${extension.critical}`;
        this.extensoesValor = this.converteParaHexadecimal(extension.extnValue.valueBlock.valueHexView);

        if (extension.extnID === '2.5.29.17') { // OID para Subject Alternative Name
          //console.log('  Subject Alternative Name:');
          this.nomeAlternativo = '';
          extension.parsedValue.altNames.forEach((altName: any, index: number) => {
            //console.log(`    Alt Name [${index}]: ${altName.value}`);
            this.nomeAlternativo = this.nomeAlternativo + `Alt Name [${index}]: ${altName.value}; `;
          });
        }
      });
    }

    // Exibe a assinatura
    //console.log('Signature (Assinatura):');
    //console.log('  Signature Algorithm:', cert.signatureAlgorithm.algorithmId);
    //console.log('  Signature Value:', cert.signatureValue.valueBlock.valueHex);

    let oidAssinatura = cert.signatureAlgorithm.algorithmId;
    //this.assinaturaAlgoritmo = this.OIDToAlgorithmName[oidAssinatura] + ` (${oidAssinatura})` || "Unknown Algorithm";
    this.assinaturaAlgoritmo = ` (${oidAssinatura})` || "Unknown Algorithm";
    
    this.assinaturaValor = this.converteParaHexadecimal(cert.signatureValue.valueBlock.valueHexView);

    //Gera FingerPrints
    // let fingerprint = this.certificateService.generateFingerprints(pem);

    // let { md5, sha1, sha256, sha384, sha512 } = fingerprint;
    // this.fingerPrintMD5 = md5;
    // this.fingerPrintSha1 = sha1;
    // this.fingerPrintSha256 = sha256;
    // this.fingerPrintSha384 = sha384;
    // this.fingerPrintSha512 = sha512;
  }

  converteParaHexadecimal(uint8Array: Uint8Array): string {
    return Array.from(uint8Array).map(value => value.toString())
      .map(valor => {
        const hex = parseInt(valor, 10).toString(16);
        return hex.padStart(2, "0");
      }).map(value => value.toUpperCase())
      .join(" ");
  }

  // OIDToAlgorithmName: { [key: string]: string } = {
  //   // Algoritmos de assinatura RSA
  //   "1.2.840.113549.1.1.1": "RSA Encryption",          // RSA Encryption (algoritmo de criptografia)
  //   "1.2.840.113549.1.1.5": "RSA with SHA-1",           // RSA assinatura com SHA-1
  //   "1.2.840.113549.1.1.11": "RSASSA-PKCS1-v1_5",       // RSA Signature Scheme (PKCS #1 v1.5)
  //   "1.2.840.113549.1.1.12": "RSASSA-PKCS1-v1_5 (SHA-256)", // RSASSA-PKCS1-v1_5 com SHA-256
  //   "1.2.840.113549.1.1.13": "RSASSA-PKCS1-v1_5 (SHA-512)", // RSASSA-PKCS1-v1_5 com SHA-512
  //   // Algoritmos de assinatura ECDSA (Elliptic Curve Digital Signature Algorithm)
  //   "1.2.840.10045.2.1": "ECDSA",                      // ECDSA (algoritmo de assinatura usando curvas elípticas)
  //   "1.2.840.10045.4.3.2": "ECDSA with SHA-256",         // ECDSA com SHA-256
  //   "1.2.840.10045.4.3.3": "ECDSA with SHA-512",         // ECDSA com SHA-512
  //   // Funções Hash (Hash Functions)
  //   "2.16.840.1.101.3.4.2.1": "SHA-256",                // SHA-256
  //   "2.16.840.1.101.3.4.2.2": "SHA-384",                // SHA-384
  //   "2.16.840.1.101.3.4.2.3": "SHA-512",                // SHA-512
  //   "2.16.840.1.101.3.4.3.2": "SHA-512/256",            // SHA-512/256
  //   "1.2.840.113549.2.5": "MD5",                        // MD5 (não recomendado para segurança)
  //   "1.2.840.113549.2.2": "SHA-1",                       // SHA-1 (não recomendado para segurança)
  //   // Algoritmos de troca de chave
  //   "1.2.840.113549.1.3.2": "Diffie-Hellman",            // Algoritmo de troca de chave Diffie-Hellman
  //   "1.2.840.113549.1.3.1": "Diffie-Hellman (X9.42)",     // Diffie-Hellman com X9.42
  //   // Algoritmos de chave pública (curvas elípticas)
  //   "1.2.840.10045.3.1.7": "ECDH (Elliptic Curve Diffie-Hellman)",  // ECDH usando curvas elípticas
  //   "1.2.840.10045.3.1.8": "ECDH with P-384",             // ECDH usando curva P-384
  //   "1.2.840.10045.3.1.9": "ECDH with P-521",             // ECDH usando curva P-521
  //   // Algoritmos de criptografia de chave simétrica (AES)
  //   "2.16.840.1.101.3.4.1.2": "AES-128",                // AES-128
  //   "2.16.840.1.101.3.4.1.22": "AES-256",                // AES-256
  //   "2.16.840.1.101.3.4.1.42": "AES-192",                // AES-192
  //   // Algoritmos de criptografia RSA
  //   "1.2.840.113549.1.1.7": "RSAES-OAEP",                // RSA com OAEP (Optimal Asymmetric Encryption Padding)
  //   "1.2.840.113549.1.1.10": "RSAES-OAEP (SHA-1)",        // RSAES-OAEP com SHA-1
  //   // Algoritmos de assinatura com ECDSA
  //   "1.2.840.10045.4.3.1": "ECDSA with SHA-1",            // ECDSA com SHA-1
  //   // Algoritmos de criptografia baseados em curvas elípticas (ECIES)
  //   "1.2.840.10045.2.1.3": "ECIES",                      // Elliptic Curve Integrated Encryption Scheme (ECIES)
  //   // Outros algoritmos (comuns em formatos de certificados, como X.509)
  //   "1.2.840.113549.1.5.12": "PKCS12",                   // PKCS12
  //   "1.2.840.113549.1.9.1": "Email",                     // Certificado de e-mail
  //   "1.2.840.113549.1.9.3": "OID para o Certificado de Assinatura Digital",
  //   "1.2.840.113549.1.9.4": "OID para o Certificado de Criptografia", // PKCS #9 OIDs
  // };

}
