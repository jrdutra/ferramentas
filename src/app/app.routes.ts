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
import { ArticlesComponent } from './articles/articles.component';
import { WhatIsUtilyToolsComponent } from './articles/what-is-utily-tools/what-is-utily-tools.component';
import { ToolArticleComponent } from './articles/tool-article/tool-article.component';
import { ARTICLE_SUMMARIES, TOOL_ARTICLES } from './articles/articles.data';
import { CriadorPdfComponent } from './ferramentas/criador-pdf/criador-pdf.component';
import { TextoGlobalComponent } from './ferramentas/texto-global/texto-global.component';
import { CalculadoraRangeIpComponent } from './ferramentas/calculadora-range-ip/calculadora-range-ip.component';

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
  articles: {
    title: 'Articles for Developers',
    description: 'Read practical articles about developer tools, data formats, security, productivity and the features available on utily.tools.',
    keywords: 'developer articles, programming tools, developer productivity, utily.tools guides',
    canonicalPath: '/articles',
    pageType: 'collection',
    imagePath: '/assets/articles/what-is-utily-tools-cover.png',
    imageWidth: 1731,
    imageHeight: 909,
    articleItems: ARTICLE_SUMMARIES.map((article) => ({
      title: article.title,
      path: article.route,
      imagePath: article.image
    }))
  },
  whatIsUtilyTools: {
    title: 'What Is utily.tools?',
    description: 'Discover what utily.tools is, which browser-based developer utilities it provides and how it helps with everyday technical tasks.',
    keywords: 'what is utily.tools, online developer tools, browser developer utilities, free developer tools',
    canonicalPath: '/articles/what-is-utily-tools',
    pageType: 'article',
    imagePath: '/assets/articles/what-is-utily-tools-cover.png',
    imageWidth: 1731,
    imageHeight: 909,
    publishedTime: '2026-07-15T00:00:00-03:00',
    modifiedTime: '2026-07-15T00:00:00-03:00',
    author: 'João Ricardo Dutra',
    section: 'About utily.tools'
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
  ipv4Range: {
    title: 'IPv4 CIDR Range and Subnet Calculator',
    description: 'Calculate IPv4 CIDR ranges, subnet masks, network and broadcast addresses, usable hosts and wildcard masks for prefixes from /0 to /32.',
    keywords: 'IP range calculator, CIDR calculator, subnet calculator, IPv4 calculator, subnet mask calculator, network address, broadcast address',
    canonicalPath: '/ipv4-range-calculator'
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
  pdfCreator: {
    title: 'Create PDF from Images Online',
    description: 'Arrange JPG, PNG and other browser-supported images and create one PDF locally in your browser.',
    keywords: 'create pdf from images, images to pdf, jpg to pdf, png to pdf, online pdf creator'
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

const toolData = (seoData: object, articleSlug: string, toolName: string) => {
  const article = TOOL_ARTICLES.find((item) => item.slug === articleSlug);

  return {
    seo: seoData,
    relatedArticle: {
      title: article?.title ?? toolName,
      path: `/articles/${articleSlug}`,
      toolName,
      image: article?.image ?? '/assets/articles/what-is-utily-tools-cover.png',
      imageAlt: article?.imageAlt ?? `Illustration for the ${toolName} article`
    }
  };
};

const toolArticleRoutes: Routes = TOOL_ARTICLES.map((article) => ({
  path: `articles/${article.slug}`,
  component: ToolArticleComponent,
  data: {
    articleSlug: article.slug,
    seo: {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      canonicalPath: `/articles/${article.slug}`,
      pageType: 'article',
      imagePath: article.image,
      imageWidth: article.imageWidth ?? 1731,
      imageHeight: article.imageHeight ?? 909,
      publishedTime: `${article.publishedIso}T00:00:00-03:00`,
      modifiedTime: article.modifiedIso,
      author: 'João Ricardo Dutra',
      section: article.category
    }
  }
}));

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { seo: seo.home } },
  { path: 'home', component: HomeComponent, data: { seo: seo.home } },
  { path: 'about', component: SobreComponent, data: { seo: seo.about } },
  { path: 'articles', component: ArticlesComponent, data: { seo: seo.articles } },
  { path: 'articles/what-is-utily-tools', component: WhatIsUtilyToolsComponent, data: { seo: seo.whatIsUtilyTools } },
  ...toolArticleRoutes,
  { path: 'base64', component: Base64Component, data: toolData(seo.base64, 'base64-encoding-decoding-guide', 'Base64 Text Converter') },
  { path: 'json-editor', component: EditorJsonComponent, data: toolData(seo.jsonEditor, 'json-formatting-minification-and-validation', 'JSON Editor') },
  { path: 'jwt-viewer', component: VisualizadorJwtComponent, data: toolData(seo.jwtViewer, 'jwt-structure-signing-and-validation', 'JWT Manipulator') },
  { path: 'jwe-viewer', component: VisualizadorJweComponent, data: toolData(seo.jweViewer, 'jwe-encryption-compact-serialization', 'JWE Manipulator') },
  { path: 'url-codec', component: UrlcodecComponent, data: toolData(seo.urlCodec, 'url-encoding-percent-encoding-guide', 'URL Codec') },
  { path: 'image-to-text-ocr', component: ConversorImagemTextoOcrComponent, data: toolData(seo.ocr, 'ocr-image-to-text-technology', 'OCR Converter') },
  { path: 'unix-timestamp', component: UnixTimestampComponent, data: toolData(seo.unixTimestamp, 'unix-timestamp-epoch-time-conversion', 'Unix Timestamp') },
  { path: 'ipv4-range-calculator', component: CalculadoraRangeIpComponent, data: toolData(seo.ipv4Range, 'ipv4-cidr-subnet-range-calculation-guide', 'IPv4 CIDR Range Calculator') },
  { path: 'text-to-qrcode', component: TextoQrcodeComponent, data: toolData(seo.qrCode, 'qr-code-generation-error-correction', 'Text to QR Code') },
  { path: 'text-editor', component: QuebraLinhaComponent, data: toolData(seo.textEditor, 'online-text-editor-text-transformation-guide', 'Text Editor') },
  { path: 'text-template', component: TemplateDeTextoComponent, data: toolData(seo.textTemplate, 'text-templates-variables-and-automation', 'Text Template') },
  { path: 'x509-viewer', component: VisualizadorX509Component, data: toolData(seo.x509Viewer, 'x509-certificate-fields-and-decoding', 'X.509 Certificate Viewer') },
  { path: 'x509-generator', component: GeradorCertificadoX509Component, data: toolData(seo.x509Generator, 'generate-self-signed-x509-certificates', 'X.509 Key & Certificate Generator') },
  { path: 'pdf-merger', component: JuntadorPdfComponent, data: toolData(seo.pdfMerger, 'merge-pdf-and-images-in-browser', 'PDF & Image Merger') },
  { path: 'pdf-splitter', component: SeparadorPdfComponent, data: toolData(seo.pdfSplitter, 'split-pdf-pages-and-export-jpg', 'PDF Splitter') },
  { path: 'pdf-creator', component: CriadorPdfComponent, data: toolData(seo.pdfCreator, 'create-pdf-from-images-browser', 'PDF Creator') },
  { path: 'hash-generator', component: GeradorHashComponent, data: toolData(seo.hashGenerator, 'cryptographic-hash-functions-md5-sha', 'Hash Generator') },
  { path: 'text-diff', component: DiffTextoComponent, data: toolData(seo.textDiff, 'text-diff-algorithms-and-comparison', 'Text Diff') },
  { path: 'uuid-generator', component: GeradorUuidComponent, data: toolData(seo.uuidGenerator, 'uuid-v1-v4-v7-generation-guide', 'UUID Generator') },
  { path: 'password-generator', component: GeradorSenhaComponent, data: toolData(seo.passwordGenerator, 'secure-password-generation-entropy', 'Password Generator') },
  { path: 'hmac-generator', component: GeradorHmacComponent, data: toolData(seo.hmacGenerator, 'hmac-message-authentication-guide', 'HMAC Generator') },
  { path: 'cpf-cnpj-generator', component: GeradorCpfCnpjComponent, data: toolData(seo.cpfCnpjGenerator, 'cpf-cnpj-check-digit-generation-for-testing', 'CPF & CNPJ Generator') },
  { path: 'json-yaml-compare', component: ComparadorJsonYamlComponent, data: toolData(seo.jsonYamlCompare, 'compare-json-yaml-structural-diff', 'JSON & YAML Comparator') },
  { path: 'certificate-validator', component: ValidadorCertificadoComponent, data: toolData(seo.certificateValidator, 'validate-certificates-and-key-pairs', 'Certificate & Key Validator') },
  { path: 'shared-text', component: TextoGlobalComponent, data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
  { path: 'shared-text/:grupo/:canal', component: TextoGlobalComponent, data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
];
