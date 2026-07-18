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
import { EditorSwaggerComponent } from './ferramentas/editor-swagger/editor-swagger.component';
import { ArticlesComponent } from './articles/articles.component';
import { WhatIsUtilyToolsComponent } from './articles/what-is-utily-tools/what-is-utily-tools.component';
import { ToolArticleComponent } from './articles/tool-article/tool-article.component';
import { ARTICLE_SUMMARIES, TOOL_ARTICLES } from './articles/articles.data';
import { CriadorPdfComponent } from './ferramentas/criador-pdf/criador-pdf.component';
import { TextoGlobalComponent } from './ferramentas/texto-global/texto-global.component';
import { CalculadoraRangeIpComponent } from './ferramentas/calculadora-range-ip/calculadora-range-ip.component';
import { LearnComponent } from './learn/learn.component';
import { FundamentosInternetRedesApisComponent } from './learn/fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component';
import { FundamentalsInternetNetworksApisComponent } from './learn/fundamentals-internet-networks-apis/fundamentals-internet-networks-apis.component';
import { FundamentosInternetRedesApisEsComponent } from './learn/fundamentos-internet-redes-apis-es/fundamentos-internet-redes-apis-es.component';
import { TcpUdpPortasSocketsComponent } from './learn/tcp-udp-portas-sockets/tcp-udp-portas-sockets.component';
import { TcpUdpPortsSocketsComponent } from './learn/tcp-udp-ports-sockets/tcp-udp-ports-sockets.component';
import { TcpUdpPuertosSocketsComponent } from './learn/tcp-udp-puertos-sockets/tcp-udp-puertos-sockets.component';
import { EnderecamentoIpIpv4Ipv6Component } from './learn/enderecamento-ip-ipv4-ipv6/enderecamento-ip-ipv4-ipv6.component';
import { IpAddressingIpv4Ipv6Component } from './learn/ip-addressing-ipv4-ipv6/ip-addressing-ipv4-ipv6.component';
import { DireccionamientoIpIpv4Ipv6Component } from './learn/direccionamiento-ip-ipv4-ipv6/direccionamiento-ip-ipv4-ipv6.component';
import { DnsNatProxiesBalanceadoresComponent } from './learn/dns-nat-proxies-balanceadores/dns-nat-proxies-balanceadores.component';
import { DnsNatProxiesLoadBalancersComponent } from './learn/dns-nat-proxies-load-balancers/dns-nat-proxies-load-balancers.component';
import { DnsNatProxiesBalanceadoresEsComponent } from './learn/dns-nat-proxies-balanceadores-es/dns-nat-proxies-balanceadores-es.component';
import { Http11Http2Http3PtComponent } from './learn/http-1-1-http-2-http-3-pt/http-1-1-http-2-http-3-pt.component';
import { Http11Http2Http3EnComponent } from './learn/http-1-1-http-2-http-3-en/http-1-1-http-2-http-3-en.component';
import { Http11Http2Http3EsComponent } from './learn/http-1-1-http-2-http-3-es/http-1-1-http-2-http-3-es.component';
import { HttpsTlsEmProfundidadePtComponent } from './learn/https-tls-em-profundidade-pt/https-tls-em-profundidade-pt.component';
import { HttpsTlsInDepthEnComponent } from './learn/https-tls-in-depth-en/https-tls-in-depth-en.component';
import { HttpsTlsEnProfundidadEsComponent } from './learn/https-tls-en-profundidad-es/https-tls-en-profundidad-es.component';
import { CriptografiaFundamentosAplicacoesApisPtComponent } from './learn/criptografia-fundamentos-aplicacoes-apis-pt/criptografia-fundamentos-aplicacoes-apis-pt.component';
import { CryptographyFundamentalsApiApplicationsEnComponent } from './learn/cryptography-fundamentals-api-applications-en/cryptography-fundamentals-api-applications-en.component';
import { CriptografiaFundamentosAplicacionesApisEsComponent } from './learn/criptografia-fundamentos-aplicaciones-apis-es/criptografia-fundamentos-aplicaciones-apis-es.component';

const seo = {
  home: {
    title: 'Free Online Developer Tools',
    description: 'Free online tools for developers: Base64, JSON, JWT, QR codes, hashes, UUIDs, passwords, PDF tools, OCR and more.',
    keywords: 'developer tools, online tools, free tools, base64, json formatter, jwt decoder, qr code generator, hash generator, uuid generator, password generator',
    canonicalPath: '/',
    imageAlt: 'Developer tools connected to structured technical learning on utily.tools'
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
  learn: {
    title: 'Learn About Corporate APIs',
    description: 'Learn corporate API fundamentals and architecture through structured article series in Portuguese, English and Spanish.',
    keywords: 'corporate APIs, API fundamentals, API architecture, fundamentos de APIs, arquitetura de APIs',
    canonicalPath: '/learn',
    pageType: 'collection',
    articleItems: [
      { title: 'Internet, Networking, and API Fundamentals', path: '/learn/en/internet-networking-api-fundamentals', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png' },
      { title: 'TCP, UDP, Ports, and Sockets', path: '/learn/en/tcp-udp-ports-and-sockets', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png' },
      { title: 'IP Addressing: IPv4, IPv6, Subnetting, and Routing', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', imagePath: '/assets/learn/ip-addressing-cover.png' },
      { title: 'DNS, NAT, Proxies, and Load Balancers', path: '/learn/en/dns-nat-proxies-and-load-balancers', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png' },
      { title: 'HTTP/1.1, HTTP/2, and HTTP/3', path: '/learn/en/http-1-1-http-2-and-http-3', imagePath: '/assets/learn/http-versions-cover.png' },
      { title: 'HTTPS and TLS in Depth', path: '/learn/en/https-and-tls-in-depth', imagePath: '/assets/learn/https-tls-cover.png' },
      { title: 'Cryptography: Symmetric, Asymmetric, Hashes, and Digital Signatures', path: '/learn/en/cryptography-fundamentals-and-api-applications', imagePath: '/assets/learn/cryptography-cover.png' },
      { title: 'Fundamentos de Internet, Redes y APIs', path: '/learn/es/fundamentos-internet-redes-apis', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png' },
      { title: 'TCP, UDP, Puertos y Sockets', path: '/learn/es/tcp-udp-puertos-y-sockets', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png' },
      { title: 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento', path: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', imagePath: '/assets/learn/ip-addressing-cover.png' },
      { title: 'DNS, NAT, Proxies y Balanceadores de Carga', path: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png' },
      { title: 'HTTP/1.1, HTTP/2 y HTTP/3', path: '/learn/es/http-1-1-http-2-y-http-3', imagePath: '/assets/learn/http-versions-cover.png' },
      { title: 'HTTPS y TLS en profundidad', path: '/learn/es/https-y-tls-en-profundidad', imagePath: '/assets/learn/https-tls-cover.png' },
      { title: 'Criptografía: simétrica, asimétrica, hashes y firmas digitales', path: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', imagePath: '/assets/learn/cryptography-cover.png' },
      { title: 'Fundamentos da Internet, Redes e APIs', path: '/learn/pt/fundamentos-da-internet-redes-e-apis', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png' },
      { title: 'TCP, UDP, Portas e Sockets', path: '/learn/pt/tcp-udp-portas-e-sockets', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png' },
      { title: 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento', path: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', imagePath: '/assets/learn/ip-addressing-cover.png' },
      { title: 'DNS, NAT, Proxies e Balanceadores de Carga', path: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png' },
      { title: 'HTTP/1.1, HTTP/2 e HTTP/3', path: '/learn/pt/http-1-1-http-2-e-http-3', imagePath: '/assets/learn/http-versions-cover.png' },
      { title: 'HTTPS e TLS em profundidade', path: '/learn/pt/https-e-tls-em-profundidade', imagePath: '/assets/learn/https-tls-cover.png' },
      { title: 'Criptografia: simétrica, assimétrica, hashes e assinaturas digitais', path: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', imagePath: '/assets/learn/cryptography-cover.png' }
    ]
  },
  learnFundamentosInternet: {
    title: 'Fundamentos da Internet, Redes e APIs',
    description: 'Entenda a jornada completa de uma requisição: DNS, IP, TCP, TLS, HTTP, API Gateway, backend e troubleshooting por camadas.',
    keywords: 'fundamentos de APIs, redes para APIs, DNS, TCP, TLS, HTTP, API Gateway, arquitetura de APIs corporativas',
    canonicalPath: '/learn/pt/fundamentos-da-internet-redes-e-apis',
    pageType: 'article',
    imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
    imageWidth: 1536,
    imageHeight: 1024,
    publishedTime: '2026-07-16T00:00:00-03:00',
    modifiedTime: '2026-07-16T00:00:00-03:00',
    author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas',
    language: 'pt-BR',
    locale: 'pt_BR'
  },
  learnFundamentalsInternetEnglish: {
    title: 'Internet, Networking, and API Fundamentals',
    description: 'Understand the complete request journey through DNS, IP, TCP, TLS, HTTP, an API Gateway, the backend, and layered troubleshooting.',
    keywords: 'API fundamentals, networking for APIs, DNS, TCP, TLS, HTTP, API Gateway, corporate API architecture',
    canonicalPath: '/learn/en/internet-networking-api-fundamentals',
    pageType: 'article', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png', imageWidth: 1536, imageHeight: 1024,
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US'
  },
  learnFundamentosInternetSpanish: {
    title: 'Fundamentos de Internet, Redes y APIs',
    description: 'Comprende el recorrido completo de una solicitud: DNS, IP, TCP, TLS, HTTP, API Gateway, backend y troubleshooting por capas.',
    keywords: 'fundamentos de APIs, redes para APIs, DNS, TCP, TLS, HTTP, API Gateway, arquitectura de APIs corporativas',
    canonicalPath: '/learn/es/fundamentos-internet-redes-apis',
    pageType: 'article', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png', imageWidth: 1536, imageHeight: 1024,
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES'
  },
  learnTcpUdpPortuguese: {
    title: 'TCP, UDP, Portas e Sockets',
    description: 'Entenda TCP, UDP, portas, sockets, handshakes, retransmissões, timeouts, pooling, NAT, SNAT e troubleshooting em API Gateways.',
    keywords: 'TCP, UDP, portas, sockets, three-way handshake, retransmissão, TIME_WAIT, API Gateway, NAT, SNAT, troubleshooting de redes',
    canonicalPath: '/learn/pt/tcp-udp-portas-e-sockets',
    pageType: 'article', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Fluxos TCP confiáveis e datagramas UDP atravessando um API Gateway entre clientes e backends',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['TCP', 'UDP', 'Sockets', 'API Gateway', 'Redes', 'SNAT', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/tcp-udp-portas-e-sockets', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/tcp-udp-ports-and-sockets', locale: 'en_US' },
      { language: 'es', path: '/learn/es/tcp-udp-puertos-y-sockets', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/tcp-udp-ports-and-sockets' }
    ]
  },
  learnTcpUdpEnglish: {
    title: 'TCP, UDP, Ports, and Sockets',
    description: 'Understand TCP, UDP, ports, sockets, handshakes, retransmissions, timeouts, pooling, NAT, SNAT, and troubleshooting in API Gateways.',
    keywords: 'TCP, UDP, ports, sockets, three-way handshake, retransmission, TIME_WAIT, API Gateway, NAT, SNAT, network troubleshooting',
    canonicalPath: '/learn/en/tcp-udp-ports-and-sockets',
    pageType: 'article', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Reliable TCP streams and UDP datagrams crossing an API Gateway between clients and backends',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['TCP', 'UDP', 'Sockets', 'API Gateway', 'Networking', 'SNAT', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/tcp-udp-portas-e-sockets', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/tcp-udp-ports-and-sockets', locale: 'en_US' },
      { language: 'es', path: '/learn/es/tcp-udp-puertos-y-sockets', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/tcp-udp-ports-and-sockets' }
    ]
  },
  learnTcpUdpSpanish: {
    title: 'TCP, UDP, Puertos y Sockets',
    description: 'Comprende TCP, UDP, puertos, sockets, handshakes, retransmisiones, timeouts, pooling, NAT, SNAT y troubleshooting en API Gateways.',
    keywords: 'TCP, UDP, puertos, sockets, three-way handshake, retransmisión, TIME_WAIT, API Gateway, NAT, SNAT, troubleshooting de redes',
    canonicalPath: '/learn/es/tcp-udp-puertos-y-sockets',
    pageType: 'article', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Flujos TCP confiables y datagramas UDP que atraviesan un API Gateway entre clientes y backends',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['TCP', 'UDP', 'Sockets', 'API Gateway', 'Redes', 'SNAT', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/tcp-udp-portas-e-sockets', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/tcp-udp-ports-and-sockets', locale: 'en_US' },
      { language: 'es', path: '/learn/es/tcp-udp-puertos-y-sockets', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/tcp-udp-ports-and-sockets' }
    ]
  },
  learnIpAddressingPortuguese: {
    title: 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento',
    description: 'Aprenda endereçamento IPv4 e IPv6, CIDR, cálculo de sub-redes, VLSM, NAT, tabelas de rotas, MTU e diagnóstico de conectividade em API Gateways.',
    keywords: 'endereçamento IP, IPv4, IPv6, CIDR, cálculo de sub-redes, VLSM, longest prefix match, tabela de rotas, NAT, MTU, API Gateway, troubleshooting de rede',
    canonicalPath: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento',
    pageType: 'article', imagePath: '/assets/learn/ip-addressing-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Endereçamento IP, redes IPv4 e IPv6, sub-redes e seleção de rotas em uma arquitetura de APIs',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Endereçamento IP', 'IPv4', 'IPv6', 'CIDR', 'Sub-redes', 'Roteamento', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', locale: 'en_US' },
      { language: 'es', path: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing' }
    ]
  },
  learnIpAddressingEnglish: {
    title: 'IP Addressing: IPv4, IPv6, Subnetting, and Routing',
    description: 'Learn IPv4 and IPv6 addressing, CIDR, subnet calculation, VLSM, NAT, routing tables, MTU, and connectivity troubleshooting in API Gateways.',
    keywords: 'IP addressing, IPv4, IPv6, CIDR, subnetting, VLSM, longest prefix match, routing table, NAT, MTU, API Gateway, network troubleshooting',
    canonicalPath: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing',
    pageType: 'article', imagePath: '/assets/learn/ip-addressing-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'IP addressing, IPv4 and IPv6 networks, subnetting, and route selection in an API architecture',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['IP Addressing', 'IPv4', 'IPv6', 'CIDR', 'Subnetting', 'Routing', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', locale: 'en_US' },
      { language: 'es', path: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing' }
    ]
  },
  learnIpAddressingSpanish: {
    title: 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento',
    description: 'Aprende direccionamiento IPv4 e IPv6, CIDR, cálculo de subredes, VLSM, NAT, tablas de rutas, MTU y diagnóstico de conectividad en API Gateways.',
    keywords: 'direccionamiento IP, IPv4, IPv6, CIDR, cálculo de subredes, VLSM, longest prefix match, tabla de rutas, NAT, MTU, API Gateway, troubleshooting de red',
    canonicalPath: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento',
    pageType: 'article', imagePath: '/assets/learn/ip-addressing-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Direccionamiento IP, redes IPv4 e IPv6, subredes y selección de rutas en una arquitectura de APIs',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Direccionamiento IP', 'IPv4', 'IPv6', 'CIDR', 'Subredes', 'Enrutamiento', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', locale: 'en_US' },
      { language: 'es', path: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing' }
    ]
  },
  learnDnsNatPortuguese: {
    title: 'DNS, NAT, Proxies e Balanceadores de Carga',
    description: 'Aprenda DNS, TTL, DNSSEC, NAT, SNAT, proxies, TLS, balanceamento L4 e L7, health checks e troubleshooting em arquiteturas de APIs corporativas.',
    keywords: 'DNS, NAT, SNAT, DNAT, proxy reverso, balanceador de carga, DNSSEC, TTL, TLS, health check, API Gateway, Axway, Azure API Management',
    canonicalPath: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga',
    pageType: 'article', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'DNS, NAT, proxies e balanceadores conduzindo uma chamada até pools de backends',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['DNS', 'NAT', 'SNAT', 'Reverse Proxy', 'Load Balancing', 'TLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/dns-nat-proxies-and-load-balancers', locale: 'en_US' },
      { language: 'es', path: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/dns-nat-proxies-and-load-balancers' }
    ]
  },
  learnDnsNatEnglish: {
    title: 'DNS, NAT, Proxies, and Load Balancers',
    description: 'Learn DNS, TTL, DNSSEC, NAT, SNAT, proxies, TLS, L4 and L7 load balancing, health checks, and troubleshooting for corporate API architectures.',
    keywords: 'DNS, NAT, SNAT, DNAT, reverse proxy, load balancer, DNSSEC, TTL, TLS, health check, API Gateway, Axway, Azure API Management',
    canonicalPath: '/learn/en/dns-nat-proxies-and-load-balancers',
    pageType: 'article', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'DNS, NAT, proxies, and load balancers guiding a request toward backend pools',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['DNS', 'NAT', 'SNAT', 'Reverse Proxy', 'Load Balancing', 'TLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/dns-nat-proxies-and-load-balancers', locale: 'en_US' },
      { language: 'es', path: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/dns-nat-proxies-and-load-balancers' }
    ]
  },
  learnDnsNatSpanish: {
    title: 'DNS, NAT, Proxies y Balanceadores de Carga',
    description: 'Aprende DNS, TTL, DNSSEC, NAT, SNAT, proxies, TLS, balanceo L4 y L7, health checks y troubleshooting en arquitecturas de APIs corporativas.',
    keywords: 'DNS, NAT, SNAT, DNAT, proxy inverso, balanceador de carga, DNSSEC, TTL, TLS, health check, API Gateway, Axway, Azure API Management',
    canonicalPath: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga',
    pageType: 'article', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'DNS, NAT, proxies y balanceadores guiando una solicitud hacia pools de backends',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['DNS', 'NAT', 'SNAT', 'Reverse Proxy', 'Balanceo de carga', 'TLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/dns-nat-proxies-and-load-balancers', locale: 'en_US' },
      { language: 'es', path: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/dns-nat-proxies-and-load-balancers' }
    ]
  },
  learnHttpVersionsPortuguese: {
    title: 'HTTP/1.1, HTTP/2 e HTTP/3',
    description: 'Aprenda semântica HTTP, métodos, status, cache, framing HTTP/1.1, multiplexação HTTP/2, HPACK, QUIC, HTTP/3, QPACK e troubleshooting em API Gateways.',
    keywords: 'HTTP/1.1, HTTP/2, HTTP/3, semântica HTTP, framing, multiplexação, HPACK, QUIC, QPACK, ALPN, API Gateway, Axway, Azure API Management, troubleshooting HTTP',
    canonicalPath: '/learn/pt/http-1-1-http-2-e-http-3',
    pageType: 'article', imagePath: '/assets/learn/http-versions-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Evolução de mensagens HTTP para streams multiplexados e QUIC através de um API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['HTTP/1.1', 'HTTP/2', 'HTTP/3', 'QUIC', 'HPACK', 'QPACK', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/http-1-1-http-2-e-http-3', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/http-1-1-http-2-and-http-3', locale: 'en_US' },
      { language: 'es', path: '/learn/es/http-1-1-http-2-y-http-3', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/http-1-1-http-2-and-http-3' }
    ]
  },
  learnHttpVersionsEnglish: {
    title: 'HTTP/1.1, HTTP/2, and HTTP/3',
    description: 'Learn HTTP semantics, methods, status codes, caching, HTTP/1.1 framing, HTTP/2 multiplexing, HPACK, QUIC, HTTP/3, QPACK, and API Gateway troubleshooting.',
    keywords: 'HTTP/1.1, HTTP/2, HTTP/3, HTTP semantics, framing, multiplexing, HPACK, QUIC, QPACK, ALPN, API Gateway, Axway, Azure API Management, HTTP troubleshooting',
    canonicalPath: '/learn/en/http-1-1-http-2-and-http-3',
    pageType: 'article', imagePath: '/assets/learn/http-versions-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Evolution from HTTP messages to multiplexed streams and QUIC through an API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['HTTP/1.1', 'HTTP/2', 'HTTP/3', 'QUIC', 'HPACK', 'QPACK', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/http-1-1-http-2-e-http-3', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/http-1-1-http-2-and-http-3', locale: 'en_US' },
      { language: 'es', path: '/learn/es/http-1-1-http-2-y-http-3', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/http-1-1-http-2-and-http-3' }
    ]
  },
  learnHttpVersionsSpanish: {
    title: 'HTTP/1.1, HTTP/2 y HTTP/3',
    description: 'Aprende semántica HTTP, métodos, códigos de estado, caché, framing HTTP/1.1, multiplexación HTTP/2, HPACK, QUIC, HTTP/3, QPACK y troubleshooting en API Gateways.',
    keywords: 'HTTP/1.1, HTTP/2, HTTP/3, semántica HTTP, framing, multiplexación, HPACK, QUIC, QPACK, ALPN, API Gateway, Axway, Azure API Management, troubleshooting HTTP',
    canonicalPath: '/learn/es/http-1-1-http-2-y-http-3',
    pageType: 'article', imagePath: '/assets/learn/http-versions-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Evolución de mensajes HTTP a streams multiplexados y QUIC a través de un API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['HTTP/1.1', 'HTTP/2', 'HTTP/3', 'QUIC', 'HPACK', 'QPACK', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/http-1-1-http-2-e-http-3', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/http-1-1-http-2-and-http-3', locale: 'en_US' },
      { language: 'es', path: '/learn/es/http-1-1-http-2-y-http-3', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/http-1-1-http-2-and-http-3' }
    ]
  },
  learnHttpsTlsPortuguese: {
    title: 'HTTPS e TLS em profundidade',
    description: 'Aprenda HTTPS e TLS em profundidade: criptografia, handshake TLS 1.2 e 1.3, certificados X.509, cadeia de confiança, SNI, ALPN, mTLS, HSTS e troubleshooting em API Gateways.',
    keywords: 'HTTPS, TLS, SSL, TLS 1.2, TLS 1.3, handshake TLS, certificado X.509, cadeia de confiança, SNI, ALPN, mTLS, HSTS, cipher suites, API Gateway, troubleshooting TLS',
    canonicalPath: '/learn/pt/https-e-tls-em-profundidade',
    pageType: 'article', imagePath: '/assets/learn/https-tls-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Conexão HTTPS protegida por TLS, cadeia de certificados e API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['HTTPS', 'TLS', 'TLS 1.3', 'X.509', 'SNI', 'ALPN', 'mTLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/https-e-tls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/https-and-tls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/https-y-tls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/https-and-tls-in-depth' }
    ]
  },
  learnHttpsTlsEnglish: {
    title: 'HTTPS and TLS in Depth',
    description: 'Learn HTTPS and TLS in depth: cryptography, TLS 1.2 and 1.3 handshakes, X.509 certificates, trust chains, SNI, ALPN, mTLS, HSTS, and API Gateway troubleshooting.',
    keywords: 'HTTPS, TLS, SSL, TLS 1.2, TLS 1.3, TLS handshake, X.509 certificate, trust chain, SNI, ALPN, mTLS, HSTS, cipher suites, API Gateway, TLS troubleshooting',
    canonicalPath: '/learn/en/https-and-tls-in-depth',
    pageType: 'article', imagePath: '/assets/learn/https-tls-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'HTTPS connection protected by TLS, a certificate chain, and an API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['HTTPS', 'TLS', 'TLS 1.3', 'X.509', 'SNI', 'ALPN', 'mTLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/https-e-tls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/https-and-tls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/https-y-tls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/https-and-tls-in-depth' }
    ]
  },
  learnHttpsTlsSpanish: {
    title: 'HTTPS y TLS en profundidad',
    description: 'Aprende HTTPS y TLS en profundidad: criptografía, handshakes TLS 1.2 y 1.3, certificados X.509, cadena de confianza, SNI, ALPN, mTLS, HSTS y troubleshooting en API Gateways.',
    keywords: 'HTTPS, TLS, SSL, TLS 1.2, TLS 1.3, handshake TLS, certificado X.509, cadena de confianza, SNI, ALPN, mTLS, HSTS, cipher suites, API Gateway, troubleshooting TLS',
    canonicalPath: '/learn/es/https-y-tls-en-profundidad',
    pageType: 'article', imagePath: '/assets/learn/https-tls-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Conexión HTTPS protegida por TLS, cadena de certificados y un API Gateway',
    publishedTime: '2026-07-16T00:00:00-03:00', modifiedTime: '2026-07-16T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['HTTPS', 'TLS', 'TLS 1.3', 'X.509', 'SNI', 'ALPN', 'mTLS', 'API Gateway', 'Troubleshooting'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/https-e-tls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/https-and-tls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/https-y-tls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/https-and-tls-in-depth' }
    ]
  },
  learnCryptographyPortuguese: {
    title: 'Criptografia: simétrica, assimétrica, hashes e assinaturas digitais',
    description: 'Aprenda criptografia aplicada a APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, curvas elípticas, assinaturas digitais, KMS, HSM, envelope encryption e criptografia pós-quântica.',
    keywords: 'criptografia em APIs, AES, ChaCha20, AEAD, SHA-256, HMAC, RSA, ECC, assinatura digital, KMS, HSM, envelope encryption, criptografia pós-quântica, API Gateway',
    canonicalPath: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis',
    pageType: 'article', imagePath: '/assets/learn/cryptography-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Núcleo criptográfico protegendo chaves, assinaturas, hashes e chamadas de APIs',
    publishedTime: '2026-07-17T00:00:00-03:00', modifiedTime: '2026-07-17T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Criptografia', 'AES', 'AEAD', 'Hash', 'HMAC', 'Assinatura digital', 'KMS', 'HSM', 'API Gateway', 'Pós-quântica'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/cryptography-fundamentals-and-api-applications', locale: 'en_US' },
      { language: 'es', path: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/cryptography-fundamentals-and-api-applications' }
    ]
  },
  learnCryptographyEnglish: {
    title: 'Cryptography: Symmetric, Asymmetric, Hashes, and Digital Signatures',
    description: 'Learn cryptography for APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, elliptic curves, digital signatures, KMS, HSM, envelope encryption, and post-quantum cryptography.',
    keywords: 'cryptography for APIs, AES, ChaCha20, AEAD, SHA-256, HMAC, RSA, ECC, digital signature, KMS, HSM, envelope encryption, post-quantum cryptography, API Gateway',
    canonicalPath: '/learn/en/cryptography-fundamentals-and-api-applications',
    pageType: 'article', imagePath: '/assets/learn/cryptography-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Cryptographic core protecting keys, signatures, hashes, and API calls',
    publishedTime: '2026-07-17T00:00:00-03:00', modifiedTime: '2026-07-17T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Cryptography', 'AES', 'AEAD', 'Hash', 'HMAC', 'Digital signatures', 'KMS', 'HSM', 'API Gateway', 'Post-quantum'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/cryptography-fundamentals-and-api-applications', locale: 'en_US' },
      { language: 'es', path: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/cryptography-fundamentals-and-api-applications' }
    ]
  },
  learnCryptographySpanish: {
    title: 'Criptografía: simétrica, asimétrica, hashes y firmas digitales',
    description: 'Aprende criptografía aplicada a APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, curvas elípticas, firmas digitales, KMS, HSM, envelope encryption y criptografía poscuántica.',
    keywords: 'criptografía en APIs, AES, ChaCha20, AEAD, SHA-256, HMAC, RSA, ECC, firma digital, KMS, HSM, envelope encryption, criptografía poscuántica, API Gateway',
    canonicalPath: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis',
    pageType: 'article', imagePath: '/assets/learn/cryptography-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Núcleo criptográfico que protege claves, firmas, hashes y llamadas de APIs',
    publishedTime: '2026-07-17T00:00:00-03:00', modifiedTime: '2026-07-17T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Criptografía', 'AES', 'AEAD', 'Hash', 'HMAC', 'Firma digital', 'KMS', 'HSM', 'API Gateway', 'Poscuántica'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/cryptography-fundamentals-and-api-applications', locale: 'en_US' },
      { language: 'es', path: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/cryptography-fundamentals-and-api-applications' }
    ]
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
  swaggerEditor: {
    title: 'Swagger Editor & OpenAPI Viewer with API Testing',
    description: 'Free online Swagger editor and OpenAPI viewer: edit YAML or JSON, convert between Swagger 2.0, OpenAPI 3.0 and 3.1, test API endpoints from the browser and export standalone HTML documentation.',
    keywords: 'swagger editor, swagger viewer, openapi editor, openapi viewer, swagger editor online, openapi 3.1 converter, swagger 2.0 to openapi 3.0, convert swagger to openapi, swagger yaml to json, test api endpoints online, api documentation generator, swagger ui alternative, openapi specification editor'
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
  { path: 'learn', component: LearnComponent, data: { seo: seo.learn } },
  { path: 'learn/pt/fundamentos-da-internet-redes-e-apis', component: FundamentosInternetRedesApisComponent, data: { seo: seo.learnFundamentosInternet } },
  { path: 'learn/en/internet-networking-api-fundamentals', component: FundamentalsInternetNetworksApisComponent, data: { seo: seo.learnFundamentalsInternetEnglish } },
  { path: 'learn/es/fundamentos-internet-redes-apis', component: FundamentosInternetRedesApisEsComponent, data: { seo: seo.learnFundamentosInternetSpanish } },
  { path: 'learn/pt/tcp-udp-portas-e-sockets', component: TcpUdpPortasSocketsComponent, data: { seo: seo.learnTcpUdpPortuguese } },
  { path: 'learn/en/tcp-udp-ports-and-sockets', component: TcpUdpPortsSocketsComponent, data: { seo: seo.learnTcpUdpEnglish } },
  { path: 'learn/es/tcp-udp-puertos-y-sockets', component: TcpUdpPuertosSocketsComponent, data: { seo: seo.learnTcpUdpSpanish } },
  { path: 'learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', component: EnderecamentoIpIpv4Ipv6Component, data: { seo: seo.learnIpAddressingPortuguese } },
  { path: 'learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', component: IpAddressingIpv4Ipv6Component, data: { seo: seo.learnIpAddressingEnglish } },
  { path: 'learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', component: DireccionamientoIpIpv4Ipv6Component, data: { seo: seo.learnIpAddressingSpanish } },
  { path: 'learn/pt/dns-nat-proxies-e-balanceadores-de-carga', component: DnsNatProxiesBalanceadoresComponent, data: { seo: seo.learnDnsNatPortuguese } },
  { path: 'learn/en/dns-nat-proxies-and-load-balancers', component: DnsNatProxiesLoadBalancersComponent, data: { seo: seo.learnDnsNatEnglish } },
  { path: 'learn/es/dns-nat-proxies-y-balanceadores-de-carga', component: DnsNatProxiesBalanceadoresEsComponent, data: { seo: seo.learnDnsNatSpanish } },
  { path: 'learn/pt/http-1-1-http-2-e-http-3', component: Http11Http2Http3PtComponent, data: { seo: seo.learnHttpVersionsPortuguese } },
  { path: 'learn/en/http-1-1-http-2-and-http-3', component: Http11Http2Http3EnComponent, data: { seo: seo.learnHttpVersionsEnglish } },
  { path: 'learn/es/http-1-1-http-2-y-http-3', component: Http11Http2Http3EsComponent, data: { seo: seo.learnHttpVersionsSpanish } },
  { path: 'learn/pt/https-e-tls-em-profundidade', component: HttpsTlsEmProfundidadePtComponent, data: { seo: seo.learnHttpsTlsPortuguese } },
  { path: 'learn/en/https-and-tls-in-depth', component: HttpsTlsInDepthEnComponent, data: { seo: seo.learnHttpsTlsEnglish } },
  { path: 'learn/es/https-y-tls-en-profundidad', component: HttpsTlsEnProfundidadEsComponent, data: { seo: seo.learnHttpsTlsSpanish } },
  { path: 'learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', component: CriptografiaFundamentosAplicacoesApisPtComponent, data: { seo: seo.learnCryptographyPortuguese } },
  { path: 'learn/en/cryptography-fundamentals-and-api-applications', component: CryptographyFundamentalsApiApplicationsEnComponent, data: { seo: seo.learnCryptographyEnglish } },
  { path: 'learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', component: CriptografiaFundamentosAplicacionesApisEsComponent, data: { seo: seo.learnCryptographySpanish } },
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
  { path: 'swagger-editor', component: EditorSwaggerComponent, data: toolData({ ...seo.swaggerEditor, canonicalPath: '/swagger-editor' }, 'swagger-openapi-specification-guide', 'Swagger Viewer & Editor') },
  { path: 'shared-text', component: TextoGlobalComponent, data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
  { path: 'shared-text/:grupo/:canal', component: TextoGlobalComponent, data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
];
