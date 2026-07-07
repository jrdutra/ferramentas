import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as forge from 'node-forge';
import { CompactEncrypt, compactDecrypt, importJWK, importPKCS8, importSPKI, importX509 } from 'jose';
import { DataService } from '../../data.service';
import { JsonService } from '../../services/json/json.service';
import { JwePartes, JweService } from '../../services/jwe/jwe.service';

@Component({
  selector: 'app-visualizador-jwe',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './visualizador-jwe.component.html',
  styleUrl: './visualizador-jwe.component.css'
})
export class VisualizadorJweComponent {
  strJwe = '';
  strProtectedHeader = '';
  strEncryptedKey = '';
  strInitializationVector = '';
  strCiphertext = '';
  strAuthenticationTag = '';
  strCiphertextCodificado = '';
  strChavePublica = '';
  strChavePrivada = '';

  textoValidade = '';
  textoValidadeVermelho = false;
  mensagemErro = '';
  mensagemChaves = '';
  ciphertextStatus: 'nenhum' | 'processando' | 'descriptografado' | 'criptografado' | 'erro' = 'nenhum';

  pfxSelecionado = false;
  nomePfx = '';
  senhaPfx = '';
  erroPfx = '';
  private pfxBytes = '';

  jwePartesColoridas: JwePartes | null = null;
  private atualizandoInterno = false;
  private versaoCriptografia = 0;

  readonly camposCabecalho = [
    { campo: 'alg', descricao: 'Algorithm used to protect the Content Encryption Key (CEK).' },
    { campo: 'enc', descricao: 'Algorithm used to encrypt the payload.' },
    { campo: 'kid', descricao: 'Identifier of the key used for encryption.' },
    { campo: 'typ', descricao: 'Type of the token or JOSE object.' },
    { campo: 'cty', descricao: 'Type of the inner content, for example JWT in nested tokens.' },
    { campo: 'zip', descricao: 'Compression applied before encryption, usually DEF.' }
  ];

  readonly algoritmosJwe = {
    alg: [
      'RSA-OAEP', 'RSA-OAEP-256', 'RSA-OAEP-384', 'RSA-OAEP-512',
      'ECDH-ES', 'ECDH-ES+A128KW', 'ECDH-ES+A192KW', 'ECDH-ES+A256KW',
      'dir', 'A128KW', 'A192KW', 'A256KW',
      'A128GCMKW', 'A192GCMKW', 'A256GCMKW',
      'PBES2-HS256+A128KW', 'PBES2-HS384+A192KW', 'PBES2-HS512+A256KW'
    ],
    enc: ['A128GCM', 'A192GCM', 'A256GCM', 'A128CBC-HS256', 'A192CBC-HS384', 'A256CBC-HS512']
  };

  constructor(
    private dataService: DataService,
    private jsonService: JsonService,
    private jweService: JweService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('JWE Manipulator');
  }

  lerTokenJwe(): void {
    if (this.atualizandoInterno) return;

    this.strJwe = this.jweService.extraiToken(this.strJwe);
    this.atualizarValidade();
    this.atualizarPartesColoridas();

    const partes = this.strJwe.split('.');
    if (partes.length !== 5) {
      this.limparCampos();
      return;
    }

    const jwePartes = this.jweService.separaJwe(this.strJwe);
    this.atualizandoInterno = true;
    try {
      const headerDecodificado = this.jweService.decodificarBase64Url(jwePartes.protectedHeader);
      this.strProtectedHeader = this.jsonService.formataJson(headerDecodificado);
      this.mensagemErro = '';
    } catch {
      this.strProtectedHeader = '';
      this.mensagemErro = 'Could not decode the Protected Header.';
    }

    this.strEncryptedKey = jwePartes.encryptedKey;
    this.strInitializationVector = jwePartes.initializationVector;
    this.strCiphertextCodificado = jwePartes.ciphertext;
    this.strCiphertext = jwePartes.ciphertext;
    this.ciphertextStatus = jwePartes.ciphertext ? 'criptografado' : 'nenhum';
    this.strAuthenticationTag = jwePartes.authenticationTag;
    this.atualizandoInterno = false;

    if (this.strChavePrivada.trim()) {
      this.descriptografarJwe();
    }
  }

  atualizarDePartes(): void {
    if (this.atualizandoInterno) return;

    try {
      const headerCompacto = JSON.stringify(JSON.parse(this.strProtectedHeader));
      const headerB64 = this.jweService.textoParaBase64Url(headerCompacto);

      this.atualizandoInterno = true;
      this.strJwe = [
        headerB64,
        this.strEncryptedKey.trim(),
        this.strInitializationVector.trim(),
        this.strCiphertextCodificado.trim() || this.strCiphertext.trim(),
        this.strAuthenticationTag.trim()
      ].join('.');
      this.atualizandoInterno = false;

      this.mensagemErro = '';
      this.atualizarValidade();
      this.atualizarPartesColoridas();
    } catch {
      this.mensagemErro = 'The Protected Header must be valid JSON to update the JWE.';
    }
  }

  sincronizarScroll(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const colorido = textarea.parentElement?.querySelector('.jwe-colorido') as HTMLElement;
    if (colorido) {
      colorido.scrollTop = textarea.scrollTop;
    }
  }

  inserirExemplo(): void {
    this.strJwe = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.OKOawDo13gRp2ojaHV7LFpA.48V1_ALb6US04U3b.5eym8TW_c8SuK0ltJ3rpYIzOeDQ.XFBoMYUZodetZdvTiFvSkQ';
    this.lerTokenJwe();
  }

  async criptografarJwe(): Promise<void> {
    const payloadClaro = this.strCiphertext;
    const versaoAtual = ++this.versaoCriptografia;
    if (!this.strChavePublica.trim()) {
      this.ciphertextStatus = 'erro';
      this.mensagemErro = 'Enter or load a public key to encrypt.';
      return;
    }

    let header: any;
    try {
      header = JSON.parse(this.strProtectedHeader || '{}');
      header.alg = header.alg || 'RSA-OAEP-256';
      header.enc = header.enc || 'A256GCM';
    } catch {
      this.ciphertextStatus = 'erro';
      this.mensagemErro = 'The Protected Header must be valid JSON to encrypt.';
      return;
    }

    this.ciphertextStatus = 'processando';
    try {
      const chave = await this.importarChaveParaJose(this.strChavePublica.trim(), header.alg, 'publica');
      const token = await this.comTimeout(new CompactEncrypt(new TextEncoder().encode(payloadClaro))
        .setProtectedHeader(header)
        .encrypt(chave as any), 'Timed out while encrypting. Check whether the header algorithm matches the key.');

      if (versaoAtual !== this.versaoCriptografia) return;

      this.atualizandoInterno = true;
      this.strJwe = token;
      this.atualizandoInterno = false;
      this.atualizarCamposCodificadosDoToken(token);
      this.strCiphertext = this.formatarPayload(payloadClaro);
      this.ciphertextStatus = 'descriptografado';
      this.mensagemErro = '';
      this.cdr.detectChanges();
    } catch (e) {
      if (versaoAtual !== this.versaoCriptografia) return;
      this.ciphertextStatus = 'erro';
      this.mensagemErro = this.mensagemErroCriptografia('Could not encrypt the JWE.', e);
      this.cdr.detectChanges();
      console.error('Error encrypting JWE:', e);
    }
  }

  async descriptografarJwe(): Promise<void> {
    if (!this.strChavePrivada.trim() || !this.jweService.validaFormatoJwe(this.strJwe)) return;

    this.ciphertextStatus = 'processando';
    try {
      const header = JSON.parse(this.strProtectedHeader || '{}');
      const chave = await this.importarChaveParaJose(this.strChavePrivada.trim(), header.alg || 'RSA-OAEP-256', 'privada');
      const { plaintext } = await this.comTimeout(compactDecrypt(this.strJwe, chave as any), 'Timed out while decrypting. Check whether the header algorithm matches the key.');

      this.strCiphertext = this.formatarPayload(new TextDecoder().decode(plaintext));
      this.ciphertextStatus = 'descriptografado';
      this.mensagemErro = '';
      this.cdr.detectChanges();
    } catch (e) {
      if (this.strCiphertextCodificado) {
        this.strCiphertext = this.strCiphertextCodificado;
        this.ciphertextStatus = 'criptografado';
      } else {
        this.ciphertextStatus = 'erro';
      }
      this.mensagemErro = this.mensagemErroCriptografia('The private key could not decrypt the ciphertext.', e);
      this.cdr.detectChanges();
      console.error('Error decrypting JWE:', e);
    }
  }

  onChavePublicaChange(): void {
    this.mensagemChaves = this.strChavePublica.trim() ? 'Public key loaded. Edit the payload in the Ciphertext field and encrypt the JWE.' : '';
    this.atualizarStatusCiphertextPeloConteudo();
  }

  onChavePrivadaChange(): void {
    this.mensagemChaves = this.strChavePrivada.trim() ? 'Private key loaded. The JWE can be decrypted.' : '';
    if (this.strChavePrivada.trim()) {
      this.descriptografarJwe();
    } else {
      this.atualizarStatusCiphertextPeloConteudo();
    }
  }

  onCiphertextChange(): void {
    if (this.strChavePublica.trim()) {
      this.versaoCriptografia++;
      this.ciphertextStatus = this.strCiphertext.trim() ? 'descriptografado' : 'nenhum';
      return;
    }

    if (this.strChavePrivada.trim()) {
      this.ciphertextStatus = this.strCiphertext.trim() ? 'descriptografado' : 'nenhum';
      return;
    }

    this.strCiphertextCodificado = this.strCiphertext;
    this.ciphertextStatus = this.strCiphertext ? 'criptografado' : 'nenhum';
    this.atualizarDePartes();
  }

  selecionarArquivoChavePublica(event: Event): void {
    this.lerArquivoTexto(event, (conteudo, nome) => {
      this.strChavePublica = conteudo;
      this.mensagemChaves = `Public key loaded: ${nome}`;
      this.onChavePublicaChange();
    });
  }

  selecionarArquivoChavePrivada(event: Event): void {
    this.lerArquivoTexto(event, (conteudo, nome) => {
      this.strChavePrivada = conteudo;
      this.mensagemChaves = `Private key loaded: ${nome}`;
      this.onChavePrivadaChange();
    });
  }

  selecionarPfx(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.nomePfx = file.name;
    this.erroPfx = '';
    this.senhaPfx = '';
    this.pfxSelecionado = false;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bytes = new Uint8Array(e.target.result as ArrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      this.pfxBytes = binary;
      this.pfxSelecionado = true;
      this.cdr.detectChanges();
    };
    reader.readAsArrayBuffer(file);
    input.value = '';
  }

  extrairChavesDoPfx(): void {
    this.erroPfx = '';
    try {
      const p12Asn1 = forge.asn1.fromDer(this.pfxBytes);
      const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, this.senhaPfx || '');

      const certBagType = forge.pki.oids['certBag'];
      const certBags = p12.getBags({ bagType: certBagType });
      const certs = certBags[certBagType];
      if (certs && certs.length > 0 && certs[0].cert) {
        this.strChavePublica = forge.pki.certificateToPem(certs[0].cert);
      }

      const keyBagType = forge.pki.oids['pkcs8ShroudedKeyBag'];
      const keyBags = p12.getBags({ bagType: keyBagType });
      const keys = keyBags[keyBagType];
      if (keys && keys.length > 0 && keys[0].key) {
        this.strChavePrivada = forge.pki.privateKeyToPem(keys[0].key);
      }

      this.pfxSelecionado = false;
      this.mensagemChaves = 'Keys extracted from PFX/P12.';
      this.onChavePublicaChange();
      this.onChavePrivadaChange();
      this.cdr.detectChanges();
    } catch (e) {
      this.erroPfx = 'Error opening the file. Check the password.';
      this.cdr.detectChanges();
      console.error('Error extracting keys from PFX:', e);
    }
  }

  get ciphertextLabel(): string {
    return 'Ciphertext';
  }

  get podeCriptografar(): boolean {
    return !!this.strChavePublica.trim() && !!this.strCiphertext.trim();
  }

  get podeDescriptografar(): boolean {
    return !!this.strChavePrivada.trim() && this.jweService.validaFormatoJwe(this.strJwe);
  }

  private atualizarValidade(): boolean {
    if (!this.strJwe.trim()) {
      this.textoValidade = '';
      this.textoValidadeVermelho = false;
      return false;
    }

    const valido = this.jweService.validaFormatoJwe(this.strJwe);
    this.textoValidade = valido ? 'Valid' : 'Invalid';
    this.textoValidadeVermelho = !valido;
    return valido;
  }

  private atualizarPartesColoridas(): void {
    const partes = this.strJwe.split('.');
    this.jwePartesColoridas = partes.length === 5 ? this.jweService.separaJwe(this.strJwe) : null;
  }

  private limparCampos(): void {
    this.strProtectedHeader = '';
    this.strEncryptedKey = '';
    this.strInitializationVector = '';
    this.strCiphertext = '';
    this.strCiphertextCodificado = '';
    this.strAuthenticationTag = '';
  }

  private atualizarStatusCiphertextPeloConteudo(): void {
    if (!this.strCiphertext.trim()) {
      this.ciphertextStatus = 'nenhum';
      return;
    }

    if (this.strCiphertextCodificado && this.strCiphertext === this.strCiphertextCodificado) {
      this.ciphertextStatus = 'criptografado';
      return;
    }

    this.ciphertextStatus = this.strChavePublica.trim() || this.strChavePrivada.trim() ? 'descriptografado' : 'criptografado';
  }

  private atualizarCamposCodificadosDoToken(token: string): void {
    const partes = this.jweService.separaJwe(token);
    this.strEncryptedKey = partes.encryptedKey;
    this.strInitializationVector = partes.initializationVector;
    this.strCiphertextCodificado = partes.ciphertext;
    this.strAuthenticationTag = partes.authenticationTag;

    try {
      const headerDecodificado = this.jweService.decodificarBase64Url(partes.protectedHeader);
      this.strProtectedHeader = this.jsonService.formataJson(headerDecodificado);
    } catch {
      this.strProtectedHeader = '';
    }

    this.atualizarValidade();
    this.atualizarPartesColoridas();
  }

  private lerArquivoTexto(event: Event, callback: (conteudo: string, nome: string) => void): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => callback(e.target.result as string, file.name);
    reader.readAsText(file);
    input.value = '';
  }

  private async importarChaveParaJose(input: string, alg: string, tipo: 'publica' | 'privada'): Promise<CryptoKey | Uint8Array> {
    if (input.startsWith('{')) {
      return importJWK(JSON.parse(input), alg);
    }

    if (input.includes('BEGIN CERTIFICATE')) {
      return importX509(input, alg);
    }

    if (input.includes('BEGIN PUBLIC KEY')) {
      return importSPKI(input, alg);
    }

    if (input.includes('BEGIN PRIVATE KEY')) {
      return importPKCS8(input, alg);
    }

    if (input.includes('BEGIN RSA PRIVATE KEY')) {
      const privateKey = forge.pki.privateKeyFromPem(input);
      const asn1Key = forge.pki.privateKeyToAsn1(privateKey);
      const privateKeyInfo = forge.pki.wrapRsaPrivateKey(asn1Key);
      const derBytes = forge.asn1.toDer(privateKeyInfo).getBytes();
      const b64 = forge.util.encode64(derBytes);
      const lines = b64.match(/.{1,64}/g) || [];
      return importPKCS8('-----BEGIN PRIVATE KEY-----\n' + lines.join('\n') + '\n-----END PRIVATE KEY-----', alg);
    }

    if (tipo === 'publica') {
      throw new Error('Unrecognized public key format.');
    }
    throw new Error('Unrecognized private key format.');
  }

  private formatarPayload(payload: string): string {
    const payloadFormatado = this.jsonService.formataJson(payload);
    return payloadFormatado || payload;
  }

  private mensagemErroCriptografia(prefixo: string, erro: unknown): string {
    const detalhe = erro instanceof Error ? erro.message : String(erro);
    return `${prefixo} ${detalhe}`;
  }

  private comTimeout<T>(promessa: Promise<T>, mensagem: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(mensagem)), 10000);
      promessa.then((valor) => {
        clearTimeout(timer);
        resolve(valor);
      }).catch((erro) => {
        clearTimeout(timer);
        reject(erro);
      });
    });
  }
}
