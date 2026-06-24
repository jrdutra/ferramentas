import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

export interface DadosCertificado {
  commonName: string;
  organization: string;
  organizationalUnit: string;
  country: string;
  state: string;
  locality: string;
  email: string;
  validadeDias: number;
  tamanhoBits: number;
}

export interface CertificadoGerado {
  certificadoPem: string;
  chavePrivadaPem: string;
  chavePublicaPem: string;
  dados: DadosCertificado;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateGeneratorService {

  gerarDadosAleatorios(): DadosCertificado {
    const id = this.gerarHex(4);
    return {
      commonName: `certificado-${id}.local`,
      organization: `Organizacao ${id}`,
      organizationalUnit: 'TI',
      country: 'BR',
      state: 'Sao Paulo',
      locality: 'Sao Paulo',
      email: `admin-${id}@exemplo.local`,
      validadeDias: 365,
      tamanhoBits: 2048
    };
  }

  gerarCertificado(dados: DadosCertificado): CertificadoGerado {
    const keys = forge.pki.rsa.generateKeyPair(dados.tamanhoBits);

    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = this.gerarSerial();
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + dados.validadeDias);

    const attrs: forge.pki.CertificateField[] = [];
    if (dados.commonName) attrs.push({ name: 'commonName', value: dados.commonName });
    if (dados.organization) attrs.push({ name: 'organizationName', value: dados.organization });
    if (dados.organizationalUnit) attrs.push({ shortName: 'OU', value: dados.organizationalUnit });
    if (dados.country) attrs.push({ name: 'countryName', value: dados.country });
    if (dados.state) attrs.push({ name: 'stateOrProvinceName', value: dados.state });
    if (dados.locality) attrs.push({ name: 'localityName', value: dados.locality });
    if (dados.email) attrs.push({ name: 'emailAddress', value: dados.email });

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    cert.setExtensions([
      { name: 'basicConstraints', cA: true },
      { name: 'keyUsage', keyCertSign: true, digitalSignature: true, keyEncipherment: true },
      { name: 'subjectAltName', altNames: [{ type: 2, value: dados.commonName }] }
    ] as any[]);

    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
      certificadoPem: forge.pki.certificateToPem(cert),
      chavePrivadaPem: forge.pki.privateKeyToPem(keys.privateKey),
      chavePublicaPem: forge.pki.publicKeyToPem(keys.publicKey),
      dados
    };
  }

  gerarPfxBytes(certPem: string, chavePrivadaPem: string, senha: string | null): ArrayBuffer {
    const cert = forge.pki.certificateFromPem(certPem);
    const privateKey = forge.pki.privateKeyFromPem(chavePrivadaPem);
    const p12Asn1 = forge.pkcs12.toPkcs12Asn1(privateKey, [cert], senha, { algorithm: '3des' });
    const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
    return this.stringToArrayBuffer(p12Der);
  }

  pemToDer(pem: string): ArrayBuffer {
    const base64 = pem.replace(/(-----BEGIN .*-----|-----END .*-----|\r?\n)/g, '');
    const binary = atob(base64);
    return this.stringToArrayBuffer(binary);
  }

  chavePrivadaParaPkcs8Pem(chavePrivadaPem: string): string {
    const privateKey = forge.pki.privateKeyFromPem(chavePrivadaPem);
    const asn1Key = forge.pki.privateKeyToAsn1(privateKey);
    const privateKeyInfo = forge.pki.wrapRsaPrivateKey(asn1Key);
    const derBytes = forge.asn1.toDer(privateKeyInfo).getBytes();
    const base64 = forge.util.encode64(derBytes);
    const lines = base64.match(/.{1,64}/g) || [];
    return '-----BEGIN PRIVATE KEY-----\n' + lines.join('\n') + '\n-----END PRIVATE KEY-----\n';
  }

  chavePublicaParaJwk(chavePublicaPem: string): object {
    const publicKey = forge.pki.publicKeyFromPem(chavePublicaPem) as any;
    const n = this.bigIntToBase64Url(publicKey.n);
    const kid = forge.md.sha256.create()
      .update(n)
      .digest()
      .toHex()
      .substring(0, 16);
    return {
      kty: 'RSA',
      use: 'sig',
      kid,
      n,
      e: this.bigIntToBase64Url(publicKey.e)
    };
  }

  chavePrivadaParaJwk(chavePrivadaPem: string): object {
    const privateKey = forge.pki.privateKeyFromPem(chavePrivadaPem) as any;
    return {
      kty: 'RSA',
      use: 'enc',
      n: this.bigIntToBase64Url(privateKey.n),
      e: this.bigIntToBase64Url(privateKey.e),
      d: this.bigIntToBase64Url(privateKey.d),
      p: this.bigIntToBase64Url(privateKey.p),
      q: this.bigIntToBase64Url(privateKey.q),
      dp: this.bigIntToBase64Url(privateKey.dP),
      dq: this.bigIntToBase64Url(privateKey.dQ),
      qi: this.bigIntToBase64Url(privateKey.qInv)
    };
  }

  private bigIntToBase64Url(bi: any): string {
    let hex: string = bi.toString(16);
    if (hex.length % 2) hex = '0' + hex;
    const bytes = forge.util.hexToBytes(hex);
    return forge.util.encode64(bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private stringToArrayBuffer(str: string): ArrayBuffer {
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer.buffer;
  }

  private gerarSerial(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private gerarHex(length: number): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
