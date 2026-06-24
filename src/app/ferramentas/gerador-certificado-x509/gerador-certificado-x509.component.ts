import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService } from '../../data.service';
import {
  CertificateGeneratorService,
  CertificadoGerado,
  DadosCertificado
} from '../../services/certificate/certificate-generator.service';

@Component({
  selector: 'app-gerador-certificado-x509',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './gerador-certificado-x509.component.html',
  styleUrl: './gerador-certificado-x509.component.css'
})
export class GeradorCertificadoX509Component {
  certificado?: CertificadoGerado;
  gerando = false;
  modalAberto = false;
  senhaPfx = '';
  dadosManuais: DadosCertificado = this.criarDadosVazios();

  constructor(
    private dataService: DataService,
    private generatorService: CertificateGeneratorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Gerador de Chaves e Certificados X.509');
  }

  gerarAleatoriamente() {
    this.gerando = true;
    this.certificado = undefined;
    setTimeout(() => {
      try {
        const dados = this.generatorService.gerarDadosAleatorios();
        this.certificado = this.generatorService.gerarCertificado(dados);
      } catch (e) {
        console.error('Erro ao gerar certificado:', e);
      }
      this.gerando = false;
      this.cdr.detectChanges();
    }, 100);
  }

  abrirModal() {
    this.dadosManuais = this.criarDadosVazios();
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  fecharModalPeloFundo(evento: MouseEvent) {
    if (evento.target === evento.currentTarget) {
      this.fecharModal();
    }
  }

  gerarManualmente() {
    this.modalAberto = false;
    this.gerando = true;
    this.certificado = undefined;
    setTimeout(() => {
      try {
        this.certificado = this.generatorService.gerarCertificado(this.dadosManuais);
      } catch (e) {
        console.error('Erro ao gerar certificado:', e);
      }
      this.gerando = false;
      this.cdr.detectChanges();
    }, 100);
  }

  baixarPfx() {
    if (!this.certificado) return;
    const senha = this.senhaPfx.trim() ? this.senhaPfx.trim() : null;
    const bytes = this.generatorService.gerarPfxBytes(
      this.certificado.certificadoPem, this.certificado.chavePrivadaPem, senha
    );
    this.baixarArquivo(bytes, this.nomeArquivo('pfx'), 'application/x-pkcs12');
  }

  baixarP12() {
    if (!this.certificado) return;
    const senha = this.senhaPfx.trim() ? this.senhaPfx.trim() : null;
    const bytes = this.generatorService.gerarPfxBytes(
      this.certificado.certificadoPem, this.certificado.chavePrivadaPem, senha
    );
    this.baixarArquivo(bytes, this.nomeArquivo('p12'), 'application/x-pkcs12');
  }

  baixarCer() {
    if (!this.certificado) return;
    const bytes = this.generatorService.pemToDer(this.certificado.certificadoPem);
    this.baixarArquivo(bytes, this.nomeArquivo('cer'), 'application/x-x509-ca-cert');
  }

  baixarCertPem() {
    if (!this.certificado) return;
    this.baixarArquivo(this.certificado.certificadoPem, this.nomeArquivo('pem'), 'application/x-pem-file');
  }

  baixarChavePublicaPem() {
    if (!this.certificado) return;
    this.baixarArquivo(this.certificado.chavePublicaPem, 'chave-publica.pem', 'application/x-pem-file');
  }

  baixarChavePrivadaPem() {
    if (!this.certificado) return;
    this.baixarArquivo(this.certificado.chavePrivadaPem, 'chave-privada-rsa.pem', 'application/x-pem-file');
  }

  baixarChavePrivadaPkcs8Pem() {
    if (!this.certificado) return;
    const pkcs8 = this.generatorService.chavePrivadaParaPkcs8Pem(this.certificado.chavePrivadaPem);
    this.baixarArquivo(pkcs8, 'chave-privada.pem', 'application/x-pem-file');
  }

  baixarChavePublicaJwk() {
    if (!this.certificado) return;
    const jwk = this.generatorService.chavePublicaParaJwk(this.certificado.chavePublicaPem);
    this.baixarArquivo(JSON.stringify(jwk, null, 2), 'chave-publica.jwk', 'application/json');
  }

  baixarChavePrivadaJwk() {
    if (!this.certificado) return;
    const jwk = this.generatorService.chavePrivadaParaJwk(this.certificado.chavePrivadaPem);
    this.baixarArquivo(JSON.stringify(jwk, null, 2), 'chave-privada.jwk', 'application/json');
  }

  async baixarTudo() {
    if (!this.certificado) return;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const nome = this.nomeBase();
    const senha = this.senhaPfx.trim() ? this.senhaPfx.trim() : null;

    const pfxBytes = this.generatorService.gerarPfxBytes(
      this.certificado.certificadoPem, this.certificado.chavePrivadaPem, senha
    );
    zip.file(`${nome}.pfx`, pfxBytes);
    zip.file(`${nome}.p12`, pfxBytes);
    zip.file(`${nome}.cer`, this.generatorService.pemToDer(this.certificado.certificadoPem));
    zip.file(`${nome}.pem`, this.certificado.certificadoPem);
    zip.file('chave-publica.pem', this.certificado.chavePublicaPem);
    zip.file('chave-privada-rsa.pem', this.certificado.chavePrivadaPem);
    zip.file('chave-privada.pem', this.generatorService.chavePrivadaParaPkcs8Pem(this.certificado.chavePrivadaPem));
    zip.file('chave-publica.jwk', JSON.stringify(this.generatorService.chavePublicaParaJwk(this.certificado.chavePublicaPem), null, 2));
    zip.file('chave-privada.jwk', JSON.stringify(this.generatorService.chavePrivadaParaJwk(this.certificado.chavePrivadaPem), null, 2));

    const blob = await zip.generateAsync({ type: 'blob' });
    this.baixarArquivo(blob, `${nome}-completo.zip`, 'application/zip');
  }

  private baixarArquivo(conteudo: string | ArrayBuffer | Blob, nomeArquivo: string, tipo: string) {
    const blob = conteudo instanceof Blob ? conteudo : new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }

  private nomeBase(): string {
    if (!this.certificado) return 'certificado';
    const cn = this.certificado.dados.commonName;
    return cn
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9\-_.]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'certificado';
  }

  private nomeArquivo(extensao: string): string {
    return `${this.nomeBase()}.${extensao}`;
  }

  private criarDadosVazios(): DadosCertificado {
    return {
      commonName: '',
      organization: '',
      organizationalUnit: '',
      country: 'BR',
      state: '',
      locality: '',
      email: '',
      validadeDias: 365,
      tamanhoBits: 2048
    };
  }
}
