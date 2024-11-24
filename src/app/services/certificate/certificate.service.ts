import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor() { }

  generateFingerprints(certificate: string): { md5: string, sha1: string, sha256: string, sha384: string, sha512: string } {
    const pemHeader = '-----BEGIN CERTIFICATE-----';
    const pemFooter = '-----END CERTIFICATE-----';
    let certContent = certificate.replace(pemHeader, '').replace(pemFooter, '').replace(/\n/g, '').replace(/\r/g, '');

    let sha1Fingerprint = forge.md.sha1.create().update(certContent).digest().toHex();
    let sha256Fingerprint = forge.md.sha256.create().update(certContent).digest().toHex();
    let sha384Fingerprint = forge.md.sha384.create().update(certContent).digest().toHex();
    let sha512Fingerprint = forge.md.sha512.create().update(certContent).digest().toHex();
    let md5Fingerprint = forge.md.md5.create().update(certContent).digest().toHex();

    return {
      md5: md5Fingerprint,
      sha1: sha1Fingerprint,
      sha256: sha256Fingerprint,
      sha384: sha384Fingerprint,
      sha512: sha512Fingerprint
    };
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
