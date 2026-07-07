import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CertificateService } from '../../services/certificate/certificate.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
  assinaturaValorBase64: string = "-";
  fingerPrintSha1: string = "-";
  fingerPrintSha256: string = "-";
  fingerPrintSha384: string = "-";
  fingerPrintSha512: string = "-";
  fingerPrintMD5: string = "-";
  fingerPrintMD5Hex: string = "-";
  fingerPrintSha1Hex: string = "-";
  fingerPrintSha256Hex: string = "-";
  fingerPrintSha384Hex: string = "-";
  fingerPrintSha512Hex: string = "-";

  constructor(private dataService: DataService,
    private certificateService: CertificateService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("X.509 Certificate Viewer");
  }

  carregaArquivo(event: any): void {
    if (event.target != null) {
      this.arquivoCertificado = event.target.files[0];
      this.fileName = this.arquivoCertificado.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const stringCertificado = e.target.result;
        this.leCertificado(stringCertificado);
        this.cdr.detectChanges();
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(this.arquivoCertificado);
    }
  }

  leCertificado(pem: string) {
    try {
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
      this.assinaturaValorBase64 = dadosCertificado.assinaturaValorBase64;
      this.fingerPrintSha1 = dadosCertificado.fingerPrintSha1;
      this.fingerPrintSha256 = dadosCertificado.fingerPrintSha256;
      this.fingerPrintSha384 = dadosCertificado.fingerPrintSha384;
      this.fingerPrintSha512 = dadosCertificado.fingerPrintSha512;
      this.fingerPrintMD5 = dadosCertificado.fingerPrintMD5;

      this.fingerPrintMD5Hex = this.formatarHex(dadosCertificado.fingerPrintMD5);
      this.fingerPrintSha1Hex = this.formatarHex(dadosCertificado.fingerPrintSha1);
      this.fingerPrintSha256Hex = this.formatarHex(dadosCertificado.fingerPrintSha256);
      this.fingerPrintSha384Hex = this.formatarHex(dadosCertificado.fingerPrintSha384);
      this.fingerPrintSha512Hex = this.formatarHex(dadosCertificado.fingerPrintSha512);

      this.mostraDados = true;
    } catch (e) {
      console.error('Error reading certificate:', e);
    }
  }

  private formatarHex(hex: string): string {
    return hex.toUpperCase().match(/.{1,2}/g)?.join(':') || hex;
  }

}
