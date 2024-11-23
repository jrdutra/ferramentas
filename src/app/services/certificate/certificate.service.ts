import { Injectable } from '@angular/core';
//import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor() { }

  // generateFingerprints(certificate: string): { md5: string, sha1: string, sha256: string, sha384: string, sha512: string } {
  //   const pemHeader = '-----BEGIN CERTIFICATE-----';
  //   const pemFooter = '-----END CERTIFICATE-----';
  //   let certContent = certificate.replace(pemHeader, '').replace(pemFooter, '').replace(/\n/g, '').replace(/\r/g, '');

  //   let sha1Fingerprint = forge.md.sha1.create().update(certContent).digest().toHex();
  //   let sha256Fingerprint = forge.md.sha256.create().update(certContent).digest().toHex();
  //   let sha384Fingerprint = forge.md.sha384.create().update(certContent).digest().toHex();
  //   let sha512Fingerprint = forge.md.sha512.create().update(certContent).digest().toHex();
  //   let md5Fingerprint = forge.md.md5.create().update(certContent).digest().toHex();

  //   return {
  //     md5: md5Fingerprint,
  //     sha1: sha1Fingerprint,
  //     sha256: sha256Fingerprint,
  //     sha384: sha384Fingerprint,
  //     sha512: sha512Fingerprint
  //   };
  // }
}
