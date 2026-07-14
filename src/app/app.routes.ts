import { Routes } from '@angular/router';

import { Base64Component } from './ferramentas/base64/base64.component';
import { EditorJsonComponent } from './ferramentas/editor-json/editor-json.component';
import { VisualizadorJwtComponent } from './ferramentas/visualizador-jwt/visualizador-jwt.component';
import { VisualizadorJweComponent } from './ferramentas/visualizador-jwe/visualizador-jwe.component';
import { UrlcodecComponent } from './ferramentas/urlcodec/urlcodec.component';
import { ConversorImagemTextoOcrComponent } from './ferramentas/conversor-imagem-texto-ocr/conversor-imagem-texto-ocr.component';
import { UnixTimestampComponent } from './ferramentas/unix-timestamp/unix-timestamp.component';
import { TextoQrcodeComponent } from './ferramentas/texto-qrcode/texto-qrcode.component';
import { QuebraLinhaComponent } from './ferramentas/quebra-linha/quebra-linha.component';
import { TemplateDeTextoComponent } from './ferramentas/template-de-texto/template-de-texto.component';
import { VisualizadorX509Component } from './ferramentas/visualizador-x-509/visualizador-x-509.component';
import { GeradorCertificadoX509Component } from './ferramentas/gerador-certificado-x509/gerador-certificado-x509.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { JuntadorPdfComponent } from './ferramentas/juntador-pdf/juntador-pdf.component';
import { SeparadorPdfComponent } from './ferramentas/separador-pdf/separador-pdf.component';
import { GeradorHashComponent } from './ferramentas/gerador-hash/gerador-hash.component';
import { DiffTextoComponent } from './ferramentas/diff-texto/diff-texto.component';
import { GeradorUuidComponent } from './ferramentas/gerador-uuid/gerador-uuid.component';
import { GeradorSenhaComponent } from './ferramentas/gerador-senha/gerador-senha.component';
import { GeradorHmacComponent } from './ferramentas/gerador-hmac/gerador-hmac.component';
import { GeradorCpfCnpjComponent } from './ferramentas/gerador-cpf-cnpj/gerador-cpf-cnpj.component';
import { ComparadorJsonYamlComponent } from './ferramentas/comparador-json-yaml/comparador-json-yaml.component';
import { ValidadorCertificadoComponent } from './ferramentas/validador-certificado/validador-certificado.component';

const seo = {
  home: {
    title: 'Free Online Developer Tools',
    description: 'Free online tools for developers: Base64, JSON, JWT, QR codes, hashes, UUIDs, passwords, PDF tools, OCR and more.',
    keywords: 'developer tools, online tools, free tools, base64, json formatter, jwt decoder, qr code generator, hash generator, uuid generator, password generator',
    canonicalPath: '/'
  },
  about: {
    title: 'About utily.tools',
    description: 'Learn about utily.tools, a collection of practical browser-based tools for developers and technology professionals.',
    keywords: 'utily.tools, developer utilities, browser tools, online developer tools',
    canonicalPath: '/about'
  },
  base64: {
    title: 'Base64 Encoder and Decoder Online',
    description: 'Encode text to Base64 or decode Base64 strings back to readable text directly in your browser.',
    keywords: 'base64 encoder, base64 decoder, base64 encode online, base64 decode online, text to base64, base64 to text'
  },
  jsonEditor: {
    title: 'JSON Formatter, Minifier and Stringifier',
    description: 'Format, beautify, minify and stringify JSON online to make API responses and configuration files easier to read.',
    keywords: 'json formatter, json beautifier, json minifier, json validator, json editor, stringify json, format json online'
  },
  jwtViewer: {
    title: 'JWT Decoder and Token Manipulator',
    description: 'Decode, inspect and edit JWT headers, payloads and signatures for debugging JSON Web Tokens in the browser.',
    keywords: 'jwt decoder, jwt debugger, json web token, jwt viewer, decode jwt, jwt token inspector, jwt manipulator'
  },
  jweViewer: {
    title: 'JWE Decoder and Token Manipulator',
    description: 'Inspect JWE tokens by splitting header, encrypted key, IV, ciphertext and authentication tag for secure debugging.',
    keywords: 'jwe decoder, jwe debugger, json web encryption, encrypted jwt, jwe token, jwe viewer, jwe manipulator'
  },
  urlCodec: {
    title: 'URL Encoder and Decoder Online',
    description: 'Encode and decode URLs, query strings and percent-encoded text with UTF-8 support.',
    keywords: 'url encoder, url decoder, percent encoding, url encode online, url decode online, query string encoder'
  },
  ocr: {
    title: 'Image to Text OCR Converter',
    description: 'Extract text from images with OCR directly in the browser using local processing.',
    keywords: 'image to text, OCR online, image OCR, extract text from image, picture to text, tesseract ocr'
  },
  unixTimestamp: {
    title: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to readable dates and convert dates back to epoch time in seconds or milliseconds.',
    keywords: 'unix timestamp converter, epoch converter, timestamp to date, date to timestamp, epoch time, unix time'
  },
  qrCode: {
    title: 'Text to QR Code Generator',
    description: 'Create QR codes from text and URLs, customize the design and download the generated code.',
    keywords: 'qr code generator, text to qr code, url to qr code, create qr code, free qr code, qr code maker'
  },
  textEditor: {
    title: 'Online Text Editor and Text Cleaner',
    description: 'Clean, split, replace, sort and transform text online with quick formatting utilities.',
    keywords: 'text editor online, text cleaner, split text, replace text, sort lines, remove line breaks, text tools'
  },
  sharedText: {
    title: 'Real-Time Text Sharer',
    description: 'Share text in real time between screens using a browser-based text channel.',
    keywords: 'share text online, real time text sharing, browser text share, shared clipboard, text sharer',
    canonicalPath: '/shared-text'
  },
  textTemplate: {
    title: 'Text Template Generator',
    description: 'Fill reusable text templates with variables to generate repeated messages, snippets and documents faster.',
    keywords: 'text template, template generator, variable template, reusable text, text snippet generator'
  },
  x509Viewer: {
    title: 'X.509 Certificate Viewer and Decoder',
    description: 'Decode X.509 certificates and inspect issuer, subject, validity, public key, fingerprints and extensions.',
    keywords: 'x509 certificate decoder, certificate viewer, ssl certificate decoder, pem decoder, certificate parser'
  },
  x509Generator: {
    title: 'X.509 Key and Certificate Generator',
    description: 'Generate RSA keys and self-signed X.509 certificates for development and software testing.',
    keywords: 'x509 certificate generator, self signed certificate, rsa key generator, certificate generator, pem certificate'
  },
  pdfMerger: {
    title: 'PDF and Image Merger Online',
    description: 'Merge PDFs and images into a single PDF or image file, reorder files and download the combined result.',
    keywords: 'merge pdf, pdf merger, combine pdf, merge images to pdf, pdf and image merger, online pdf merger'
  },
  pdfSplitter: {
    title: 'PDF Splitter Online',
    description: 'Split PDF files into pages and download individual PDFs or JPG images in a ZIP file.',
    keywords: 'split pdf, pdf splitter, extract pdf pages, pdf to jpg pages, separate pdf, online pdf splitter'
  },
  hashGenerator: {
    title: 'Hash Generator for MD5, SHA-1 and SHA-256',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text directly in the browser.',
    keywords: 'hash generator, md5 generator, sha256 generator, sha512 hash, sha1 hash, generate hash online'
  },
  textDiff: {
    title: 'Online Text Diff Checker',
    description: 'Compare two blocks of text and highlight line-by-line differences for code, documents and notes.',
    keywords: 'text diff, diff checker, compare text online, text compare, difference checker, compare two texts'
  },
  uuidGenerator: {
    title: 'UUID Generator Online',
    description: 'Generate UUID v4, v7 and v1 identifiers with uppercase, lowercase, hyphen and bulk output options.',
    keywords: 'uuid generator, guid generator, uuid v4, uuid v7, uuid v1, generate uuid online, random uuid'
  },
  passwordGenerator: {
    title: 'Secure Password Generator',
    description: 'Generate strong random passwords with configurable length, uppercase, lowercase, numbers and symbols.',
    keywords: 'password generator, secure password generator, random password, strong password, generate password online'
  },
  hmacGenerator: {
    title: 'HMAC Generator Online',
    description: 'Generate HMAC signatures with SHA-256, SHA-384, SHA-512 and other algorithms using a secret key.',
    keywords: 'hmac generator, hmac sha256, hmac sha512, signature generator, message authentication code, hmac online'
  },
  cpfCnpjGenerator: {
    title: 'CPF and CNPJ Generator for Testing',
    description: 'Generate valid CPF and CNPJ numbers for Brazilian software testing, QA and form validation.',
    keywords: 'cpf generator, cnpj generator, cpf cnpj generator, brazil document generator, test cpf, test cnpj'
  },
  jsonYamlCompare: {
    title: 'JSON and YAML Comparator',
    description: 'Compare JSON and YAML files structurally to find missing fields and different values side by side.',
    keywords: 'json compare, yaml compare, json diff, yaml diff, compare json online, compare yaml online, structural diff'
  },
  certificateValidator: {
    title: 'Certificate and Key Validator',
    description: 'Validate X.509 certificates and keys: check expiry dates and match certificates, public keys and private keys. Supports PEM, CRT, CER, DER, PFX and P12.',
    keywords: 'certificate validator, key pair checker, pfx validator, p12 validator, x509 validator, certificate expiry check, match private key certificate, verify key pair'
  }
};

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { seo: seo.home } },
  { path: 'home', component: HomeComponent, data: { seo: seo.home } },
  { path: 'about', component: SobreComponent, data: { seo: seo.about } },
  { path: 'base64', component: Base64Component, data: { seo: seo.base64 } },
  { path: 'json-editor', component: EditorJsonComponent, data: { seo: seo.jsonEditor } },
  { path: 'jwt-viewer', component: VisualizadorJwtComponent, data: { seo: seo.jwtViewer } },
  { path: 'jwe-viewer', component: VisualizadorJweComponent, data: { seo: seo.jweViewer } },
  { path: 'url-codec', component: UrlcodecComponent, data: { seo: seo.urlCodec } },
  { path: 'image-to-text-ocr', component: ConversorImagemTextoOcrComponent, data: { seo: seo.ocr } },
  { path: 'unix-timestamp', component: UnixTimestampComponent, data: { seo: seo.unixTimestamp } },
  { path: 'text-to-qrcode', component: TextoQrcodeComponent, data: { seo: seo.qrCode } },
  { path: 'text-editor', component: QuebraLinhaComponent, data: { seo: seo.textEditor } },
  { path: 'text-template', component: TemplateDeTextoComponent, data: { seo: seo.textTemplate } },
  { path: 'x509-viewer', component: VisualizadorX509Component, data: { seo: seo.x509Viewer } },
  { path: 'x509-generator', component: GeradorCertificadoX509Component, data: { seo: seo.x509Generator } },
  { path: 'pdf-merger', component: JuntadorPdfComponent, data: { seo: seo.pdfMerger } },
  { path: 'pdf-splitter', component: SeparadorPdfComponent, data: { seo: seo.pdfSplitter } },
  { path: 'hash-generator', component: GeradorHashComponent, data: { seo: seo.hashGenerator } },
  { path: 'text-diff', component: DiffTextoComponent, data: { seo: seo.textDiff } },
  { path: 'uuid-generator', component: GeradorUuidComponent, data: { seo: seo.uuidGenerator } },
  { path: 'password-generator', component: GeradorSenhaComponent, data: { seo: seo.passwordGenerator } },
  { path: 'hmac-generator', component: GeradorHmacComponent, data: { seo: seo.hmacGenerator } },
  { path: 'cpf-cnpj-generator', component: GeradorCpfCnpjComponent, data: { seo: seo.cpfCnpjGenerator } },
  { path: 'json-yaml-compare', component: ComparadorJsonYamlComponent, data: { seo: seo.jsonYamlCompare } },
  { path: 'certificate-validator', component: ValidadorCertificadoComponent, data: { seo: seo.certificateValidator } },
];
