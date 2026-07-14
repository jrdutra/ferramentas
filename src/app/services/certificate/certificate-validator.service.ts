import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

export type StatusValidade = 'valid' | 'expired' | 'not-yet-valid';

export interface CertificadoInfo {
  id: string;
  origem: string;
  formato: string;
  subject: string;
  subjectCN: string;
  issuer: string;
  issuerCN: string;
  serial: string;
  versao: number;
  notBefore: Date;
  notAfter: Date;
  status: StatusValidade;
  diasRestantes: number;
  autoAssinado: boolean;
  algoritmoChave: string;
  tamanhoChaveBits: number | null;
  algoritmoAssinatura: string;
  sans: string[];
  keyUsage: string[];
  fingerprintSha1: string;
  fingerprintSha256: string;
  temChavePrivada: boolean;
  publicKey: any;
}

export interface ChaveInfo {
  id: string;
  origem: string;
  tipo: 'private' | 'public';
  algoritmo: string;
  tamanhoBits: number | null;
  criptografada: boolean;
  suportadaParaPar: boolean;
  key: any;
  modulusFingerprint?: string;
  formatoChave?: string;
  kid?: string;
  kidValido?: boolean;
  thumbprint?: string;
}

export interface ResultadoCarregamento {
  certificados: CertificadoInfo[];
  chaves: ChaveInfo[];
  avisos: string[];
  erros: string[];
}

/** Uma entidade que expõe uma chave pública, usada na matriz de pareamento. */
export interface PortadorChave {
  id: string;
  rotulo: string;
  origem: string;
  tipo: 'certificate' | 'public' | 'private';
  algoritmo: string;
  suportado: boolean;
  modulusFingerprint?: string;
  publicKey?: any;
  privateKey?: any;
}

export type ResultadoPar = 'match' | 'mismatch' | 'na';

@Injectable({
  providedIn: 'root'
})
export class CertificateValidatorService {

  /**
   * Carrega um arquivo (PEM, DER, CRT, CER, PFX, P12 ou chave) e extrai
   * certificados e chaves. Tudo é processado localmente no navegador.
   */
  carregarArquivo(nome: string, buffer: ArrayBuffer, senha: string): ResultadoCarregamento {
    const resultado: ResultadoCarregamento = { certificados: [], chaves: [], avisos: [], erros: [] };
    const bytes = new Uint8Array(buffer);
    const binary = this.uint8ToBinaryString(bytes);
    const texto = this.tentaDecodificarUtf8(bytes);
    const ext = (nome.split('.').pop() || '').toLowerCase();

    const temPem = texto.includes('-----BEGIN');
    const textoTrim = texto.trim();
    const pareceJson = textoTrim.startsWith('{') || textoTrim.startsWith('[');

    try {
      if (pareceJson && this.tentaJwk(nome, textoTrim, resultado)) {
        return resultado;
      }

      if (temPem) {
        this.processaPem(nome, texto, senha, resultado);
        return resultado;
      }

      // Binário: tenta PKCS#12 primeiro (pfx/p12), senão certificado DER.
      if (ext === 'pfx' || ext === 'p12' || this.pareceP12(binary)) {
        try {
          this.processaPkcs12(nome, binary, senha, resultado);
          return resultado;
        } catch (e: any) {
          // Se falhar como P12, tenta como certificado DER antes de desistir.
          if (this.tentaCertificadoDer(nome, binary, resultado)) return resultado;
          resultado.erros.push(this.mensagemErroP12(nome, e));
          return resultado;
        }
      }

      if (this.tentaCertificadoDer(nome, binary, resultado)) return resultado;

      // Última tentativa: chave em DER (PKCS#8 / SPKI).
      if (this.tentaChaveDer(nome, binary, senha, resultado)) return resultado;

      resultado.erros.push(`"${nome}": unrecognized format. Supported: PEM, CRT, CER, DER, PFX, P12 and PEM keys.`);
    } catch (e: any) {
      resultado.erros.push(`"${nome}": ${e?.message || 'failed to read the file.'}`);
    }

    return resultado;
  }

  // ---------------------------------------------------------------------------
  // Pareamento de chaves
  // ---------------------------------------------------------------------------

  /** Constrói a lista de entidades que possuem chave pública para a matriz. */
  montaPortadores(certificados: CertificadoInfo[], chaves: ChaveInfo[]): PortadorChave[] {
    const portadores: PortadorChave[] = [];

    for (const cert of certificados) {
      const suportado = this.ehRsa(cert.publicKey);
      portadores.push({
        id: cert.id,
        rotulo: `Certificate — ${cert.subjectCN || cert.subject || 'no CN'}`,
        origem: cert.origem,
        tipo: 'certificate',
        algoritmo: cert.algoritmoChave,
        suportado,
        publicKey: cert.publicKey,
        modulusFingerprint: suportado ? this.fingerprintModulo(cert.publicKey) : undefined
      });
    }

    for (const chave of chaves) {
      const suportado = chave.suportadaParaPar;
      const pub = chave.tipo === 'private' ? this.publicaDePrivada(chave.key) : chave.key;
      portadores.push({
        id: chave.id,
        rotulo: chave.tipo === 'private' ? 'Private key' : 'Public key',
        origem: chave.origem,
        tipo: chave.tipo,
        algoritmo: chave.algoritmo,
        suportado,
        publicKey: pub,
        privateKey: chave.tipo === 'private' ? chave.key : undefined,
        modulusFingerprint: suportado && pub ? this.fingerprintModulo(pub) : undefined
      });
    }

    return portadores;
  }

  /** Compara dois portadores e diz se compartilham o mesmo par de chaves. */
  comparaPortadores(a: PortadorChave, b: PortadorChave): ResultadoPar {
    if (!a.suportado || !b.suportado || !a.modulusFingerprint || !b.modulusFingerprint) {
      return 'na';
    }
    if (a.modulusFingerprint !== b.modulusFingerprint) return 'mismatch';

    // Confirmação extra por assinatura/verificação quando há privada + pública.
    const priv = a.privateKey || b.privateKey;
    const pub = a.privateKey ? b.publicKey : a.publicKey;
    if (priv && pub) {
      try {
        const md = forge.md.sha256.create();
        md.update('utily.tools key-pair check', 'utf8');
        const sig = priv.sign(md);
        const ok = pub.verify(md.digest().bytes(), sig);
        return ok ? 'match' : 'mismatch';
      } catch {
        // Cai para a comparação por módulo abaixo.
      }
    }
    return 'match';
  }

  // ---------------------------------------------------------------------------
  // Processamento PEM
  // ---------------------------------------------------------------------------

  private processaPem(nome: string, texto: string, senha: string, out: ResultadoCarregamento): void {
    const blocos = texto.match(/-----BEGIN ([A-Z0-9 ]+)-----[\s\S]*?-----END \1-----/g) || [];
    if (!blocos.length) {
      out.erros.push(`"${nome}": no valid PEM block found.`);
      return;
    }

    for (const bloco of blocos) {
      const tipo = (bloco.match(/-----BEGIN ([A-Z0-9 ]+)-----/) || [])[1] || '';
      try {
        if (tipo.includes('CERTIFICATE') && !tipo.includes('REQUEST')) {
          const cert = forge.pki.certificateFromPem(bloco);
          out.certificados.push(this.mapaCertificado(cert, nome, 'PEM'));
        } else if (tipo === 'PUBLIC KEY' || tipo === 'RSA PUBLIC KEY') {
          out.chaves.push(this.mapaChavePublica(bloco, nome));
        } else if (tipo.includes('PRIVATE KEY')) {
          out.chaves.push(this.mapaChavePrivadaPem(bloco, nome, senha, out));
        } else if (tipo.includes('CERTIFICATE REQUEST')) {
          out.avisos.push(`"${nome}": CSR (certificate request) blocks are not validated.`);
        } else {
          out.avisos.push(`"${nome}": PEM block "${tipo}" ignored.`);
        }
      } catch (e: any) {
        out.erros.push(`"${nome}" (${tipo}): ${e?.message || 'failed to parse.'}`);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Processamento PKCS#12 (pfx / p12)
  // ---------------------------------------------------------------------------

  private processaPkcs12(nome: string, binary: string, senha: string, out: ResultadoCarregamento): void {
    const p12Der = forge.util.createBuffer(binary);
    const p12Asn1 = forge.asn1.fromDer(p12Der);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, senha || '');

    const certBags = p12.getBags({ bagType: forge.pki.oids['certBag'] })[forge.pki.oids['certBag']] || [];
    const keyBags = [
      ...(p12.getBags({ bagType: forge.pki.oids['pkcs8ShroudedKeyBag'] })[forge.pki.oids['pkcs8ShroudedKeyBag']] || []),
      ...(p12.getBags({ bagType: forge.pki.oids['keyBag'] })[forge.pki.oids['keyBag']] || [])
    ];

    let certsAdd = 0;
    const modulosPrivados = new Set<string>();

    for (const kb of keyBags) {
      const key = (kb as any).key;
      if (!key) continue;
      const chave = this.mapaChavePrivadaObjeto(key, nome);
      if (chave.modulusFingerprint) modulosPrivados.add(chave.modulusFingerprint);
      out.chaves.push(chave);
    }

    for (const cb of certBags) {
      const cert = (cb as any).cert;
      if (!cert) continue;
      const info = this.mapaCertificado(cert, nome, 'PKCS#12');
      const fp = this.ehRsa(info.publicKey) ? this.fingerprintModulo(info.publicKey) : undefined;
      info.temChavePrivada = !!fp && modulosPrivados.has(fp);
      out.certificados.push(info);
      certsAdd++;
    }

    if (!certsAdd && !keyBags.length) {
      out.avisos.push(`"${nome}": PKCS#12 opened, but no certificates or keys were found.`);
    }
  }

  private pareceP12(binary: string): boolean {
    // Estrutura PKCS#12 começa com SEQUENCE (0x30). Heurística simples.
    return binary.length > 2 && binary.charCodeAt(0) === 0x30;
  }

  private mensagemErroP12(nome: string, e: any): string {
    const msg = (e?.message || '').toLowerCase();
    if (msg.includes('mac') || msg.includes('password') || msg.includes('invalid')) {
      return `"${nome}": could not open PKCS#12. The password may be incorrect.`;
    }
    return `"${nome}": failed to read PKCS#12 (${e?.message || 'unknown error'}).`;
  }

  // ---------------------------------------------------------------------------
  // Certificados / chaves em DER
  // ---------------------------------------------------------------------------

  private tentaCertificadoDer(nome: string, binary: string, out: ResultadoCarregamento): boolean {
    try {
      const asn1 = forge.asn1.fromDer(forge.util.createBuffer(binary));
      const cert = forge.pki.certificateFromAsn1(asn1);
      out.certificados.push(this.mapaCertificado(cert, nome, 'DER'));
      return true;
    } catch {
      return false;
    }
  }

  private tentaChaveDer(nome: string, binary: string, senha: string, out: ResultadoCarregamento): boolean {
    // PKCS#8 / SPKI em DER -> converte para PEM e reaproveita os parsers.
    try {
      const asn1 = forge.asn1.fromDer(forge.util.createBuffer(binary));
      try {
        const priv = forge.pki.privateKeyFromAsn1(asn1);
        out.chaves.push(this.mapaChavePrivadaObjeto(priv, nome));
        return true;
      } catch {
        const pub = forge.pki.publicKeyFromAsn1(asn1);
        out.chaves.push(this.mapaChavePublicaObjeto(pub, nome));
        return true;
      }
    } catch {
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // Mapeadores
  // ---------------------------------------------------------------------------

  private mapaCertificado(cert: forge.pki.Certificate, origem: string, formato: string): CertificadoInfo {
    const agora = new Date();
    const notBefore = cert.validity.notBefore;
    const notAfter = cert.validity.notAfter;

    let status: StatusValidade = 'valid';
    if (agora < notBefore) status = 'not-yet-valid';
    else if (agora > notAfter) status = 'expired';

    const diasRestantes = Math.floor((notAfter.getTime() - agora.getTime()) / 86400000);

    const subjectCN = this.pegaAtributo(cert.subject.attributes, 'CN');
    const issuerCN = this.pegaAtributo(cert.issuer.attributes, 'CN');
    const autoAssinado = this.mesmoDN(cert.subject.attributes, cert.issuer.attributes);

    const pub: any = cert.publicKey;
    const rsa = this.ehRsa(pub);

    return {
      id: this.novoId(),
      origem,
      formato,
      subject: this.formataDN(cert.subject.attributes),
      subjectCN,
      issuer: this.formataDN(cert.issuer.attributes),
      issuerCN,
      serial: cert.serialNumber,
      versao: (cert.version ?? 2) + 1,
      notBefore,
      notAfter,
      status,
      diasRestantes,
      autoAssinado,
      algoritmoChave: rsa ? 'RSA' : this.nomeAlgoritmoChave(pub),
      tamanhoChaveBits: rsa ? pub.n.bitLength() : null,
      algoritmoAssinatura: this.nomeOid((cert as any).siginfo?.algorithmOid || (cert as any).signatureOid),
      sans: this.pegaSans(cert),
      keyUsage: this.pegaKeyUsage(cert),
      fingerprintSha1: this.fingerprintCert(cert, 'sha1'),
      fingerprintSha256: this.fingerprintCert(cert, 'sha256'),
      temChavePrivada: false,
      publicKey: pub
    };
  }

  private mapaChavePublica(pem: string, origem: string): ChaveInfo {
    const pub: any = forge.pki.publicKeyFromPem(pem);
    return this.mapaChavePublicaObjeto(pub, origem);
  }

  private mapaChavePublicaObjeto(pub: any, origem: string): ChaveInfo {
    const rsa = this.ehRsa(pub);
    return {
      id: this.novoId(),
      origem,
      tipo: 'public',
      algoritmo: rsa ? 'RSA' : this.nomeAlgoritmoChave(pub),
      tamanhoBits: rsa ? pub.n.bitLength() : null,
      criptografada: false,
      suportadaParaPar: rsa,
      key: pub,
      modulusFingerprint: rsa ? this.fingerprintModulo(pub) : undefined
    };
  }

  private mapaChavePrivadaPem(pem: string, origem: string, senha: string, out: ResultadoCarregamento): ChaveInfo {
    const encrypted = /ENCRYPTED/.test(pem) || /Proc-Type:.*ENCRYPTED/.test(pem);
    let priv: any;
    if (encrypted) {
      priv = forge.pki.decryptRsaPrivateKey(pem, senha || '');
      if (!priv) {
        throw new Error('encrypted private key — wrong or missing password.');
      }
    } else {
      priv = forge.pki.privateKeyFromPem(pem);
    }
    const info = this.mapaChavePrivadaObjeto(priv, origem);
    info.criptografada = encrypted;
    return info;
  }

  private mapaChavePrivadaObjeto(priv: any, origem: string): ChaveInfo {
    const rsa = this.ehRsa(priv);
    return {
      id: this.novoId(),
      origem,
      tipo: 'private',
      algoritmo: rsa ? 'RSA' : this.nomeAlgoritmoChave(priv),
      tamanhoBits: rsa ? priv.n.bitLength() : null,
      criptografada: false,
      suportadaParaPar: rsa,
      key: priv,
      modulusFingerprint: rsa ? this.fingerprintModulo(this.publicaDePrivada(priv)) : undefined
    };
  }

  // ---------------------------------------------------------------------------
  // JWK / JWKS
  // ---------------------------------------------------------------------------

  private tentaJwk(nome: string, texto: string, out: ResultadoCarregamento): boolean {
    let json: any;
    try { json = JSON.parse(texto); } catch { return false; }

    const jwks: any[] = Array.isArray(json?.keys)
      ? json.keys
      : (json && json.kty ? [json] : []);
    if (!jwks.length) return false;

    for (const jwk of jwks) {
      try {
        out.chaves.push(this.mapaJwk(jwk, nome));
      } catch (e: any) {
        out.erros.push(`"${nome}" (JWK): ${e?.message || 'failed to parse JWK.'}`);
      }
    }
    return true;
  }

  private mapaJwk(jwk: any, origem: string): ChaveInfo {
    const kty = String(jwk.kty || '').toUpperCase();

    if (kty !== 'RSA') {
      return {
        id: this.novoId(),
        origem,
        tipo: jwk.d ? 'private' : 'public',
        algoritmo: `${jwk.kty || 'Unknown'} (JWK — pairing not supported)`,
        tamanhoBits: null,
        criptografada: false,
        suportadaParaPar: false,
        key: null,
        formatoChave: 'JWK',
        kid: jwk.kid
      };
    }

    const n = this.b64uParaBigInt(jwk.n);
    const e = this.b64uParaBigInt(jwk.e);
    const pub: any = forge.pki.setRsaPublicKey(n, e);

    let key: any = pub;
    let tipo: 'private' | 'public' = 'public';
    if (jwk.d) {
      tipo = 'private';
      if (jwk.p && jwk.q && jwk.dp && jwk.dq && jwk.qi) {
        try {
          key = forge.pki.setRsaPrivateKey(
            n, e,
            this.b64uParaBigInt(jwk.d),
            this.b64uParaBigInt(jwk.p),
            this.b64uParaBigInt(jwk.q),
            this.b64uParaBigInt(jwk.dp),
            this.b64uParaBigInt(jwk.dq),
            this.b64uParaBigInt(jwk.qi)
          );
        } catch { key = pub; }
      }
    }

    const thumbprint = this.jwkThumbprint(jwk.n, jwk.e);
    const kidApp = this.kidPadraoApp(pub);
    let kidValido: boolean | undefined = undefined;
    if (jwk.kid) {
      kidValido = jwk.kid === kidApp || jwk.kid === thumbprint;
    }

    return {
      id: this.novoId(),
      origem,
      tipo,
      algoritmo: 'RSA (JWK)',
      tamanhoBits: pub.n.bitLength(),
      criptografada: false,
      suportadaParaPar: true,
      key,
      modulusFingerprint: this.fingerprintModulo(pub),
      formatoChave: 'JWK',
      kid: jwk.kid,
      kidValido,
      thumbprint
    };
  }

  private b64uParaBigInt(b64u: string): any {
    let s = String(b64u || '').replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bytes = forge.util.decode64(s);
    let hex = forge.util.bytesToHex(bytes);
    if (!hex) hex = '0';
    return new (forge as any).jsbn.BigInteger(hex, 16);
  }

  /** RFC 7638 JWK thumbprint (SHA-256, base64url) para chaves RSA. */
  private jwkThumbprint(n: string, e: string): string {
    const json = `{"e":"${e}","kty":"RSA","n":"${n}"}`;
    const md = forge.md.sha256.create();
    md.update(json, 'utf8');
    return this.paraB64u(md.digest().bytes());
  }

  /** kid no mesmo padrão do gerador do app: sha256(base64url(n)).hex()[:16]. */
  private kidPadraoApp(pub: any): string {
    const nB64u = this.bigIntParaB64u(pub.n);
    return forge.md.sha256.create().update(nB64u).digest().toHex().substring(0, 16);
  }

  private bigIntParaB64u(bi: any): string {
    let hex: string = bi.toString(16);
    if (hex.length % 2) hex = '0' + hex;
    return this.paraB64u(forge.util.hexToBytes(hex));
  }

  private paraB64u(bytes: string): string {
    return forge.util.encode64(bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------

  private ehRsa(key: any): boolean {
    return !!key && !!key.n && !!key.e && typeof key.n.bitLength === 'function';
  }

  private publicaDePrivada(priv: any): any {
    try {
      return forge.pki.setRsaPublicKey(priv.n, priv.e);
    } catch {
      return null;
    }
  }

  private fingerprintModulo(pub: any): string {
    let hex: string = pub.n.toString(16);
    if (hex.length % 2) hex = '0' + hex;
    const bytes = forge.util.hexToBytes(hex);
    return forge.md.sha256.create().update(bytes).digest().toHex();
  }

  private fingerprintCert(cert: forge.pki.Certificate, alg: 'sha1' | 'sha256'): string {
    const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
    const md = alg === 'sha1' ? forge.md.sha1.create() : forge.md.sha256.create();
    md.update(der);
    return (md.digest().toHex().match(/.{2}/g) || []).join(':').toUpperCase();
  }

  private pegaAtributo(attrs: any[], shortName: string): string {
    const found = attrs.find(a => a.shortName === shortName);
    return found ? String(found.value) : '';
  }

  private formataDN(attrs: any[]): string {
    return attrs
      .map(a => `${a.shortName || a.name || a.type}=${a.value}`)
      .join(', ');
  }

  private mesmoDN(a: any[], b: any[]): boolean {
    const norm = (attrs: any[]) =>
      attrs.map(x => `${x.shortName || x.type}=${x.value}`).sort().join('|');
    return norm(a) === norm(b);
  }

  private pegaSans(cert: forge.pki.Certificate): string[] {
    const ext: any = cert.getExtension('subjectAltName');
    if (!ext || !ext.altNames) return [];
    const tipos: { [k: number]: string } = { 1: 'email', 2: 'DNS', 6: 'URI', 7: 'IP' };
    return ext.altNames.map((n: any) => `${tipos[n.type] || 'name'}: ${n.value || n.ip || ''}`);
  }

  private pegaKeyUsage(cert: forge.pki.Certificate): string[] {
    const ku: any = cert.getExtension('keyUsage');
    const usos: string[] = [];
    if (ku) {
      const flags: [string, boolean][] = [
        ['Digital Signature', ku.digitalSignature],
        ['Non Repudiation', ku.nonRepudiation],
        ['Key Encipherment', ku.keyEncipherment],
        ['Data Encipherment', ku.dataEncipherment],
        ['Key Agreement', ku.keyAgreement],
        ['Certificate Sign', ku.keyCertSign],
        ['CRL Sign', ku.cRLSign]
      ];
      flags.forEach(([nome, on]) => { if (on) usos.push(nome); });
    }
    const eku: any = cert.getExtension('extKeyUsage');
    if (eku) {
      ['serverAuth', 'clientAuth', 'codeSigning', 'emailProtection', 'timeStamping']
        .forEach(k => { if (eku[k]) usos.push(this.humaniza(k)); });
    }
    return usos;
  }

  private humaniza(k: string): string {
    return k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
  }

  private nomeAlgoritmoChave(key: any): string {
    if (!key) return 'Unknown';
    if (this.ehRsa(key)) return 'RSA';
    return 'EC / other (pairing not supported)';
  }

  private nomeOid(oid: string | undefined): string {
    if (!oid) return 'Unknown';
    const nome = (forge.pki.oids as any)[oid];
    return nome ? `${nome} (${oid})` : oid;
  }

  private uint8ToBinaryString(bytes: Uint8Array): string {
    let s = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as any);
    }
    return s;
  }

  private tentaDecodificarUtf8(bytes: Uint8Array): string {
    try {
      return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    } catch {
      return this.uint8ToBinaryString(bytes);
    }
  }

  private novoId(): string {
    return 'id-' + Math.random().toString(36).slice(2, 10);
  }
}
