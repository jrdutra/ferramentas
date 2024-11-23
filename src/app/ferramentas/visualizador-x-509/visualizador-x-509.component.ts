import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as asn1js from 'asn1js';
import { Certificate } from 'pkijs';


@Component({
  selector: 'app-visualizador-x-509',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './visualizador-x-509.component.html',
  styleUrl: './visualizador-x-509.component.css'
})
export class VisualizadorX509Component {

  arquivoCertificado: File = new File([], "", { type: "text/plain" });;
  fileName: string = "";
  //Atributos do certificado
  issuer: string = "";
  subject: string = "";
  serial: string = "";
  validade: string = "";
  chavePublicaAlgoritmo: string = "";
  chavePublicaValor: string = "";
  extensoesId: string = "";
  extensoesCritical: string = "";
  extensoesValor: string = "";
  nomeAlternativo: string = "";
  assinaturaAlgoritmo: string = "";
  assinaturaValor: string = "";


  constructor(private dataService: DataService) { }

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

    // Cria um objeto de certificado PKI.js
    const cert = new Certificate({ schema: asn1.result });

    // Exibe informações do emissor
    //console.log('Issuer (Emissor):');
    cert.issuer.typesAndValues.forEach(attr => {
      //console.log(`  ${attr.type}: ${attr.value.valueBlock.value}`);
      this.issuer = this.issuer + `  ${attr.type}: ${attr.value.valueBlock.value}`;
    });

    // Exibe informações do sujeito
    console.log('Subject (Sujeito):');
    cert.subject.typesAndValues.forEach(attr => {
      console.log(`  ${attr.type}: ${attr.value.valueBlock.value}`);
    });

    // Exibe número de série
    console.log('Serial Number (Número de Série):', cert.serialNumber.valueBlock.valueHex);

    // Exibe o período de validade
    console.log('Validity Period (Período de Validade):');
    console.log('  Not Before:', cert.notBefore.value);
    console.log('  Not After:', cert.notAfter.value);

    // Exibe a chave pública
    console.log('Public Key (Chave Pública):');
    console.log('  Algorithm:', cert.subjectPublicKeyInfo.algorithm.algorithmId);
    console.log('  Public Key Value:', cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex);

    // Exibe extensões, se houver
    if (cert.extensions) {
      console.log('Extensions (Extensões):');
      cert.extensions.forEach(extension => {
        console.log(`  Extension ID: ${extension.extnID}`);
        console.log(`  Critical: ${extension.critical}`);
        console.log(`  Value: ${extension.extnValue.valueBlock.valueHex}`);
        // Para decodificar extensões específicas, como o Nome Alternativo do Sujeito:
        if (extension.extnID === '2.5.29.17') { // OID para Subject Alternative Name
          console.log('  Subject Alternative Name:');
          extension.parsedValue.altNames.forEach((altName: any, index: number) => {
            console.log(`    Alt Name [${index}]: ${altName.value}`);
          });
        }
      });
    }

    // Exibe a assinatura
    console.log('Signature (Assinatura):');
    console.log('  Signature Algorithm:', cert.signatureAlgorithm.algorithmId);
    console.log('  Signature Value:', cert.signatureValue.valueBlock.valueHex);
  }

}
