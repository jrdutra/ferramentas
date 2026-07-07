import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { JsonService } from '../../services/json/json.service'
import { JwtService } from '../../services/jwt/jwt.service'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import * as forge from 'node-forge';

@Component({
  selector: 'app-visualizador-jwt',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './visualizador-jwt.component.html',
  styleUrl: './visualizador-jwt.component.css'
})
export class VisualizadorJwtComponent {

  disposicao: 'vertical' | 'horizontal' = 'vertical';
  zoomJwt = 1;
  zoomDecodificado = 1;
  zoomTextoJwt = 1;
  zoomTextoDecodificado = 1;

  strJwt: string = '';
  strJwtCabecalho: string = '';
  strJwtCorpo: string = '';
  strJwtAssinatura: string = '';
  strChavePublica: string = '';
  strChavePrivada: string = '';

  pfxSelecionado = false;
  nomePfx = '';
  senhaPfx = '';
  erroPfx = '';
  private pfxBytes: string = '';

  assinaturaStatus: 'nenhum' | 'verificando' | 'valida' | 'invalida' = 'nenhum';

  textoValidade: string = '';
  textoValidadeVermelho: boolean = true;

  jwtPartesColoridas: { header: string; body: string; signature: string } | null = null;

  claimsDetectadas: { chave: string; valor: any; descricao: string; valorFormatado: string }[] = [];
  claimAberta: string | null = null;
  corpoSegmentos: { tipo: string; conteudo: string; claimChave?: string; descricao?: string; valorFormatado?: string }[] = [];
  corpoEditando = false;
  camposCabecalhoDetectados: { chave: string; valorFormatado: string; descricao: string; valoresPadrao: string }[] = [];
  cabecalhoSegmentos: { tipo: string; conteudo: string; campoChave?: string; descricao?: string; valorFormatado?: string; valoresPadrao?: string }[] = [];
  campoCabecalhoAberto: string | null = null;
  cabecalhoEditando = false;

  private readonly claimsDocumentadas: { [key: string]: string } = {
    'iss': 'Issuer - Identifies who issued the token.',
    'sub': 'Subject - Identifies the token subject (user).',
    'aud': 'Audience - Identifies the expected recipient of the token.',
    'exp': 'Expiration Time - Date/time when the token expires.',
    'nbf': 'Not Before - Date/time before which the token is not valid.',
    'iat': 'Issued At - Date/time when the token was issued.',
    'jti': 'JWT ID - Unique token identifier to prevent reuse.',
    'name': 'Name - Name of the user associated with the token.',
    'email': 'Email - User email address.',
    'scope': 'Scope - Permissions or scopes granted to the token.',
    'role': 'Role - User role or function in the system.'
  };

  private readonly claimsDeTempo = new Set(['exp', 'nbf', 'iat']);

  private readonly camposCabecalhoDocumentados: { [key: string]: { descricao: string; valoresPadrao: string } } = {
    'alg': {
      descricao: 'Algorithm - Algorithm used to sign or protect the token.',
      valoresPadrao: 'none, HS256, HS384, HS512, RS256, RS384, RS512, PS256, PS384, PS512, ES256, ES384, ES512 or EdDSA.'
    },
    'typ': {
      descricao: 'Type - Declares the type of object represented by the token.',
      valoresPadrao: 'JWT is the most common value. Specific profiles also use values such as at+jwt.'
    },
    'cty': {
      descricao: 'Content Type - Indicates the type of content carried by the token.',
      valoresPadrao: 'JWT for nested tokens; it may also receive another media type known by the application.'
    },
    'kid': {
      descricao: 'Key ID - Identifier of the key used to sign or encrypt.',
      valoresPadrao: 'String defined by the issuer; usually matches the kid published in a JWKS.'
    },
    'jku': {
      descricao: 'JWK Set URL - Address of the key set used to validate the token.',
      valoresPadrao: 'HTTPS URL that points to a JWKS document.'
    },
    'jwk': {
      descricao: 'JSON Web Key - Public key included directly in the header.',
      valoresPadrao: 'Valid JWK object, with fields such as kty, kid, use, alg and key parameters.'
    },
    'x5u': {
      descricao: 'X.509 URL - Address of the X.509 certificate chain associated with the key.',
      valoresPadrao: 'HTTPS URL that returns a PEM-encoded certificate chain.'
    },
    'x5c': {
      descricao: 'X.509 Certificate Chain - Certificate chain used in the signature.',
      valoresPadrao: 'Array of Base64 DER X.509 certificates, starting with the signer certificate.'
    },
    'x5t': {
      descricao: 'X.509 SHA-1 Thumbprint - SHA-1 fingerprint of the certificate.',
      valoresPadrao: 'Base64URL string without padding containing the SHA-1 hash.'
    },
    'x5t#S256': {
      descricao: 'X.509 SHA-256 Thumbprint - SHA-256 fingerprint of the certificate.',
      valoresPadrao: 'Base64URL string without padding containing the SHA-256 hash.'
    },
    'crit': {
      descricao: 'Critical - Lists header extensions that must be understood by the recipient.',
      valoresPadrao: 'Array of parameter names present in the header. Example: ["b64"].'
    },
    'b64': {
      descricao: 'Base64url-Encode Payload - Defines whether the JWS payload was Base64URL encoded.',
      valoresPadrao: 'true (default) or false. When false, it should usually also appear in crit.'
    },
    'enc': {
      descricao: 'Encryption Algorithm - Algorithm used to encrypt the content of a JWE.',
      valoresPadrao: 'A128GCM, A192GCM, A256GCM, A128CBC-HS256, A192CBC-HS384 or A256CBC-HS512.'
    },
    'zip': {
      descricao: 'Compression Algorithm - Algorithm applied to compress the content before encryption.',
      valoresPadrao: 'DEF (DEFLATE) is the most common registered value.'
    }
  };

  private atualizandoInterno = false;

  constructor(private dataService: DataService,
    private jsonService: JsonService,
    private jwtService: JwtService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("JWT Manipulator");
  }

  definirDisposicao(disposicao: 'vertical' | 'horizontal'): void {
    this.disposicao = disposicao;
  }

  ajustarZoomJwt(delta: number): void {
    this.zoomJwt = this.limitarZoom(this.zoomJwt + delta);
  }

  ajustarZoomDecodificado(delta: number): void {
    this.zoomDecodificado = this.limitarZoom(this.zoomDecodificado + delta);
  }

  ajustarZoomTextoJwt(delta: number): void {
    this.zoomTextoJwt = this.limitarZoom(this.zoomTextoJwt + delta);
  }

  ajustarZoomTextoDecodificado(delta: number): void {
    this.zoomTextoDecodificado = this.limitarZoom(this.zoomTextoDecodificado + delta);
  }

  restaurarVisualizacao(): void {
    this.zoomJwt = 1;
    this.zoomDecodificado = 1;
    this.zoomTextoJwt = 1;
    this.zoomTextoDecodificado = 1;
    this.disposicao = 'vertical';
  }

  get alturaJwtHorizontalEm(): number | null {
    if (this.disposicao !== 'horizontal') return null;

    const larguraDisponivel = typeof window === 'undefined' ? 1200 : Math.max(320, window.innerWidth - 96);
    const caracteresPorLinha = Math.max(32, Math.floor(larguraDisponivel / (12 * this.zoomTextoJwt)));
    const linhas = Math.max(1, Math.ceil(Math.max(this.strJwt.length, 1) / caracteresPorLinha));
    return Math.min(30, Math.max(7, 3.8 + linhas * 2) * this.zoomJwt);
  }

  private limitarZoom(valor: number): number {
    return Math.round(Math.min(1.6, Math.max(0.7, valor)) * 10) / 10;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.claimAberta || this.campoCabecalhoAberto) {
      const target = event.target as HTMLElement;
      if (!target.closest('.claim-ajuda') && !target.closest('.claim-balao')) {
        this.claimAberta = null;
        this.campoCabecalhoAberto = null;
      }
    }
  }

  lerTokenJwt() {
    if (this.atualizandoInterno) return;
    this.strJwt = this.jwtService.extraiToken(this.strJwt);
    this.validaJwt(this.strJwt);
    this.atualizarPartesColoridas();

    if (this.jwtService.validaFormatoJwt(this.strJwt)) {
      let { header, body, signature } = this.jwtService.separaJWT(this.strJwt);

      try {
        this.atualizandoInterno = true;
        this.strJwtCabecalho = this.decodificarBase64Url(header);
        this.strJwtCabecalho = this.jsonService.formataJson(this.strJwtCabecalho);
        this.strJwtCorpo = this.decodificarBase64Url(body);
        this.strJwtCorpo = this.jsonService.formataJson(this.strJwtCorpo);
        this.strJwtAssinatura = signature;
        this.atualizandoInterno = false;
      } catch (e) {
        this.atualizandoInterno = false;
        console.error('Error decoding JWT:', e);
        this.strJwtCabecalho = '';
        this.strJwtCorpo = '';
        this.strJwtAssinatura = signature || '';
      }

      this.cdr.detectChanges();
      this.extrairCamposCabecalho();
      this.extrairClaims();
      this.verificarOuAssinar();
    } else {
      this.strJwtCabecalho = '';
      this.strJwtCorpo = '';
      this.strJwtAssinatura = '';
      this.camposCabecalhoDetectados = [];
      this.cabecalhoSegmentos = [];
      this.claimsDetectadas = [];
      this.assinaturaStatus = 'nenhum';
    }
  }

  atualizarDePartes() {
    if (this.atualizandoInterno) return;
    try {
      const headerCompact = JSON.stringify(JSON.parse(this.strJwtCabecalho));
      const bodyCompact = JSON.stringify(JSON.parse(this.strJwtCorpo));
      const headerB64 = this.textoParaBase64Url(headerCompact);
      const bodyB64 = this.textoParaBase64Url(bodyCompact);

      this.atualizandoInterno = true;
      this.strJwt = headerB64 + '.' + bodyB64 + '.' + (this.strJwtAssinatura || '');
      this.atualizandoInterno = false;

      this.validaJwt(this.strJwt);
      this.atualizarPartesColoridas();
      this.extrairCamposCabecalho();
      this.extrairClaims();
      this.verificarOuAssinar();
    } catch {
      // Invalid JSON while editing, ignore.
    }
  }

  async verificarOuAssinar() {
    if (!this.jwtService.validaFormatoJwt(this.strJwt)) {
      this.assinaturaStatus = 'nenhum';
      return;
    }

    const partes = this.strJwt.split('.');
    if (partes.length !== 3) {
      this.assinaturaStatus = 'nenhum';
      return;
    }

    let alg = 'RS256';
    try {
      const headerJson = JSON.parse(atob(partes[0].replace(/-/g, '+').replace(/_/g, '/')));
      alg = headerJson.alg || 'RS256';
    } catch { /* usa RS256 */ }

    if (this.strChavePrivada.trim()) {
      const assinado = await this.assinarJwt(partes, alg);
      if (assinado && this.strChavePublica.trim()) {
        const partesNovas = this.strJwt.split('.');
        await this.verificarComPublica(partesNovas, alg);
      }
    } else if (this.strChavePublica.trim()) {
      await this.verificarComPublica(partes, alg);
    } else {
      this.assinaturaStatus = 'nenhum';
    }

    this.cdr.detectChanges();
  }

  private async assinarJwt(partes: string[], alg: string): Promise<boolean> {
    this.assinaturaStatus = 'verificando';
    try {
      const privateKey = await this.importarChavePrivada(this.strChavePrivada.trim(), alg);
      if (!privateKey) {
        this.assinaturaStatus = 'invalida';
        return false;
      }

      const dadosAssinados = partes[0] + '.' + partes[1];
      const algParams = this.obterParametrosCrypto(alg);
      const dadosBytes = new TextEncoder().encode(dadosAssinados);
      const assinaturaBuffer = await crypto.subtle.sign(algParams, privateKey, dadosBytes);
      const novaAssinatura = this.arrayBufferParaBase64Url(assinaturaBuffer);

      this.strJwtAssinatura = novaAssinatura;
      this.atualizandoInterno = true;
      this.strJwt = partes[0] + '.' + partes[1] + '.' + novaAssinatura;
      this.atualizandoInterno = false;
      this.atualizarPartesColoridas();
      this.assinaturaStatus = 'valida';
      return true;
    } catch (e) {
      console.error('Error signing JWT:', e);
      this.assinaturaStatus = 'invalida';
      return false;
    }
  }

  private async verificarComPublica(partes: string[], alg: string) {
    this.assinaturaStatus = 'verificando';
    try {
      const cryptoKey = await this.importarChavePublica(this.strChavePublica.trim(), alg);
      if (!cryptoKey) {
        this.assinaturaStatus = 'invalida';
        return;
      }

      const dadosAssinados = partes[0] + '.' + partes[1];
      const algParams = this.obterParametrosCrypto(alg);
      const assinaturaBytes = this.base64UrlParaArrayBuffer(partes[2]);
      const dadosBytes = new TextEncoder().encode(dadosAssinados);

      const valido = await crypto.subtle.verify(algParams, cryptoKey, assinaturaBytes, dadosBytes);
      this.assinaturaStatus = valido ? 'valida' : 'invalida';
    } catch (e) {
      console.error('Error verifying signature:', e);
      this.assinaturaStatus = 'invalida';
    }
  }

  atualizarPartesColoridas() {
    const partes = this.strJwt.split('.');
    if (partes.length === 3 && partes[0] && partes[1] && partes[2]) {
      this.jwtPartesColoridas = { header: partes[0], body: partes[1], signature: partes[2] };
    } else {
      this.jwtPartesColoridas = null;
    }
  }

  sincronizarScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const colorido = textarea.parentElement?.querySelector('.jwt-colorido') as HTMLElement;
    if (colorido) {
      colorido.scrollTop = textarea.scrollTop;
    }
  }

  extrairCamposCabecalho() {
    this.camposCabecalhoDetectados = [];
    this.campoCabecalhoAberto = null;
    try {
      const cabecalho = JSON.parse(this.strJwtCabecalho);
      for (const chave of Object.keys(cabecalho)) {
        const documentacao = this.camposCabecalhoDocumentados[chave];
        if (!documentacao) continue;
        const valor = cabecalho[chave];
        this.camposCabecalhoDetectados.push({
          chave,
          valorFormatado: typeof valor === 'string' ? valor : JSON.stringify(valor, null, 2),
          descricao: documentacao.descricao,
          valoresPadrao: documentacao.valoresPadrao
        });
      }
    } catch { /* header is not valid JSON */ }
    this.gerarCabecalhoSegmentos();
  }

  gerarCabecalhoSegmentos() {
    this.cabecalhoSegmentos = [];
    const texto = this.strJwtCabecalho;
    if (!texto) return;

    const presentes = this.camposCabecalhoDetectados.map(campo => campo.chave);
    if (presentes.length === 0) {
      this.cabecalhoSegmentos = [{ tipo: 'texto', conteudo: texto }];
      return;
    }

    const escaped = presentes.map(chave => chave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`"(${escaped.join('|')})"(?=\\s*:)`, 'g');
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(texto)) !== null) {
      if (match.index > lastIndex) {
        this.cabecalhoSegmentos.push({ tipo: 'texto', conteudo: texto.substring(lastIndex, match.index) });
      }
      const chave = match[1];
      const campo = this.camposCabecalhoDetectados.find(item => item.chave === chave);
      this.cabecalhoSegmentos.push({
        tipo: 'campo',
        conteudo: match[0],
        campoChave: chave,
        descricao: campo?.descricao,
        valorFormatado: campo?.valorFormatado,
        valoresPadrao: campo?.valoresPadrao
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < texto.length) {
      this.cabecalhoSegmentos.push({ tipo: 'texto', conteudo: texto.substring(lastIndex) });
    }
  }

  toggleCampoCabecalho(chave: string, event?: Event) {
    if (event) event.stopPropagation();
    this.claimAberta = null;
    this.campoCabecalhoAberto = this.campoCabecalhoAberto === chave ? null : chave;
  }

  iniciarEdicaoCabecalho(event: Event) {
    if (!this.strChavePrivada.trim()) return;
    const target = event.target as HTMLElement;
    if (target.closest('.claim-ajuda') || target.closest('.claim-balao')) return;
    this.campoCabecalhoAberto = null;
    this.cabecalhoEditando = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      const el = document.querySelector('.cabecalho-textarea-edit') as HTMLTextAreaElement;
      if (el) el.focus();
    });
  }

  finalizarEdicaoCabecalho() {
    this.cabecalhoEditando = false;
    this.extrairCamposCabecalho();
  }

  extrairClaims() {
    this.claimsDetectadas = [];
    this.claimAberta = null;
    try {
      const corpo = JSON.parse(this.strJwtCorpo);
      for (const chave of Object.keys(corpo)) {
        if (this.claimsDocumentadas[chave]) {
          const valor = corpo[chave];
          let valorFormatado = String(valor);
          if (this.claimsDeTempo.has(chave) && typeof valor === 'number') {
            const data = new Date(valor * 1000);
            valorFormatado = `${valor} (${data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`;
          }
          this.claimsDetectadas.push({
            chave,
            valor,
            descricao: this.claimsDocumentadas[chave],
            valorFormatado
          });
        }
      }
    } catch { /* payload is not valid JSON */ }
    this.gerarCorpoSegmentos();
  }

  gerarCorpoSegmentos() {
    this.corpoSegmentos = [];
    const texto = this.strJwtCorpo;
    if (!texto) return;

    const presentes = this.claimsDetectadas.map(c => c.chave);
    if (presentes.length === 0) {
      this.corpoSegmentos = [{ tipo: 'texto', conteudo: texto }];
      return;
    }

    const escaped = presentes.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`"(${escaped.join('|')})"(?=\\s*:)`, 'g');
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(texto)) !== null) {
      if (match.index > lastIndex) {
        this.corpoSegmentos.push({ tipo: 'texto', conteudo: texto.substring(lastIndex, match.index) });
      }
      const chave = match[1];
      const claim = this.claimsDetectadas.find(c => c.chave === chave);
      this.corpoSegmentos.push({
        tipo: 'claim',
        conteudo: match[0],
        claimChave: chave,
        descricao: claim?.descricao || this.claimsDocumentadas[chave],
        valorFormatado: claim?.valorFormatado || ''
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < texto.length) {
      this.corpoSegmentos.push({ tipo: 'texto', conteudo: texto.substring(lastIndex) });
    }
  }

  toggleClaim(chave: string, event?: Event) {
    if (event) event.stopPropagation();
    this.campoCabecalhoAberto = null;
    this.claimAberta = this.claimAberta === chave ? null : chave;
  }

  iniciarEdicaoCorpo(event: Event) {
    if (!this.strChavePrivada.trim()) return;
    const target = event.target as HTMLElement;
    if (target.closest('.claim-ajuda') || target.closest('.claim-balao')) return;
    this.claimAberta = null;
    this.corpoEditando = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      const el = document.querySelector('.corpo-textarea-edit') as HTMLTextAreaElement;
      if (el) el.focus();
    });
  }

  finalizarEdicaoCorpo() {
    this.corpoEditando = false;
    this.extrairClaims();
  }

  onChavePublicaChange() {
    this.verificarOuAssinar();
  }

  onChavePrivadaChange() {
    this.cabecalhoEditando = false;
    this.corpoEditando = false;
    this.extrairCamposCabecalho();
    this.extrairClaims();
    this.verificarOuAssinar();
  }

  selecionarPfx(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.nomePfx = file.name;
    this.erroPfx = '';
    this.senhaPfx = '';
    this.pfxSelecionado = false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer: ArrayBuffer = e.target.result;
      const bytes = new Uint8Array(arrayBuffer);
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
      this.corpoEditando = false;
      this.extrairClaims();
      this.verificarOuAssinar();
      this.cdr.detectChanges();
    } catch (e) {
      this.erroPfx = 'Error opening the file. Check the password.';
      this.cdr.detectChanges();
      console.error('Error extracting keys from PFX:', e);
    }
  }

  private async importarChavePrivada(input: string, alg: string): Promise<CryptoKey | null> {
    const algParams = this.obterParametrosImport(alg);
    try {
      if (input.startsWith('{')) {
        const jwk = JSON.parse(input);
        return await crypto.subtle.importKey('jwk', jwk, algParams, false, ['sign']);
      }

      if (input.includes('BEGIN PRIVATE KEY')) {
        return this.importarPkcs8(input, algParams);
      }

      if (input.includes('BEGIN RSA PRIVATE KEY')) {
        const privateKey = forge.pki.privateKeyFromPem(input);
        const asn1Key = forge.pki.privateKeyToAsn1(privateKey);
        const privateKeyInfo = forge.pki.wrapRsaPrivateKey(asn1Key);
        const derBytes = forge.asn1.toDer(privateKeyInfo).getBytes();
        const b64 = forge.util.encode64(derBytes);
        const lines = b64.match(/.{1,64}/g) || [];
        const pkcs8Pem = '-----BEGIN PRIVATE KEY-----\n' + lines.join('\n') + '\n-----END PRIVATE KEY-----';
        return this.importarPkcs8(pkcs8Pem, algParams);
      }

      return null;
    } catch (e) {
      console.error('Error importing private key:', e);
      return null;
    }
  }

  private async importarPkcs8(pem: string, algParams: any): Promise<CryptoKey> {
    const b64 = pem.replace(/(-----BEGIN .*-----|-----END .*-----|\r?\n)/g, '');
    const binary = atob(b64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return crypto.subtle.importKey('pkcs8', buffer, algParams, false, ['sign']);
  }

  private async importarChavePublica(input: string, alg: string): Promise<CryptoKey | null> {
    const algParams = this.obterParametrosImport(alg);
    try {
      if (input.startsWith('{')) {
        const jwk = JSON.parse(input);
        return await crypto.subtle.importKey('jwk', jwk, algParams, false, ['verify']);
      }

      if (input.includes('BEGIN CERTIFICATE')) {
        const cert = forge.pki.certificateFromPem(input);
        const pubKeyPem = forge.pki.publicKeyToPem(cert.publicKey);
        return this.importarSpki(pubKeyPem, algParams);
      }

      if (input.includes('BEGIN PUBLIC KEY')) {
        return this.importarSpki(input, algParams);
      }

      return null;
    } catch (e) {
      console.error('Error importing public key:', e);
      return null;
    }
  }

  private async importarSpki(pem: string, algParams: any): Promise<CryptoKey> {
    const b64 = pem.replace(/(-----BEGIN .*-----|-----END .*-----|\r?\n)/g, '');
    const binary = atob(b64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return crypto.subtle.importKey('spki', buffer, algParams, false, ['verify']);
  }

  private obterParametrosImport(alg: string): any {
    switch (alg) {
      case 'RS384': return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-384' };
      case 'RS512': return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512' };
      case 'PS256': return { name: 'RSA-PSS', hash: 'SHA-256' };
      case 'PS384': return { name: 'RSA-PSS', hash: 'SHA-384' };
      case 'PS512': return { name: 'RSA-PSS', hash: 'SHA-512' };
      case 'ES256': return { name: 'ECDSA', namedCurve: 'P-256' };
      case 'ES384': return { name: 'ECDSA', namedCurve: 'P-384' };
      case 'ES512': return { name: 'ECDSA', namedCurve: 'P-521' };
      default: return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
    }
  }

  private obterParametrosCrypto(alg: string): any {
    switch (alg) {
      case 'PS256': return { name: 'RSA-PSS', saltLength: 32 };
      case 'PS384': return { name: 'RSA-PSS', saltLength: 48 };
      case 'PS512': return { name: 'RSA-PSS', saltLength: 64 };
      case 'ES256': return { name: 'ECDSA', hash: 'SHA-256' };
      case 'ES384': return { name: 'ECDSA', hash: 'SHA-384' };
      case 'ES512': return { name: 'ECDSA', hash: 'SHA-512' };
      default: return { name: 'RSASSA-PKCS1-v1_5' };
    }
  }

  private base64UrlParaArrayBuffer(b64url: string): ArrayBuffer {
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    const padded = pad ? b64 + '='.repeat(4 - pad) : b64;
    const binary = atob(padded);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
  }

  private decodificarBase64Url(base64url: string): string {
    let b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);
    const binaryString = atob(b64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }

  private textoParaBase64Url(texto: string): string {
    const bytes = new TextEncoder().encode(texto);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private arrayBufferParaBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  validaJwt(strJwt: string): boolean {
    if (this.jwtService.validaFormatoJwt(strJwt)) {
      this.textoValidadeVermelho = false;
      this.textoValidade = 'Valid';
      return true;
    } else {
      this.textoValidadeVermelho = true;
      this.textoValidade = 'Invalid';
      if (!strJwt.trim()) {
        this.textoValidadeVermelho = false;
        this.textoValidade = '';
      }
      return false;
    }
  }

}
