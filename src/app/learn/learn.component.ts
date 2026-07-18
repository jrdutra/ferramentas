import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ReadingProgressService } from './reading-progress/reading-progress.service';
import { LEARN_PATHS, chapterIdForRoute } from './reading-progress/learn-catalog';

interface LearnArticle {
  chapterLabel: string;
  title: string;
  description: string;
  route: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}

type SeriesKey = 'english' | 'spanish' | 'portuguese';

const SERIES_STATE_KEY = 'utily.learn.series-open';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearnComponent implements OnInit {
  @ViewChild('portugueseTrack') private portugueseTrack?: ElementRef<HTMLElement>;
  @ViewChild('englishTrack') private englishTrack?: ElementRef<HTMLElement>;
  @ViewChild('spanishTrack') private spanishTrack?: ElementRef<HTMLElement>;
  @ViewChild('importInput') private importInput?: ElementRef<HTMLInputElement>;

  readonly corporateApiPathContentId = 'corporate-api-path-content';
  isCorporateApiPathOpen = false;

  /** Each language carousel starts collapsed; state is persisted in localStorage. */
  seriesOpen: Record<SeriesKey, boolean> = this.loadSeriesState();

  importFeedback: { type: 'success' | 'error'; message: string } | null = null;

  readonly portugueseArticles: LearnArticle[] = [
    {
      chapterLabel: 'Capítulo 1',
      title: 'Fundamentos da Internet, Redes e APIs',
      description: 'Da comunicação em rede ao processamento completo de uma requisição em um API Gateway.',
      route: '/learn/pt/fundamentos-da-internet-redes-e-apis',
      readingTime: '45 min de leitura',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'Fluxo de uma chamada de API atravessando camadas de rede e um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 2',
      title: 'TCP, UDP, Portas e Sockets',
      description: 'Da criação de conexões ao diagnóstico de timeouts, pooling, SNAT e esgotamento de portas em API Gateways.',
      route: '/learn/pt/tcp-udp-portas-e-sockets',
      readingTime: '50 min de leitura',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'Fluxos TCP e datagramas UDP atravessando um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 3',
      title: 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento',
      description: 'De prefixos CIDR e sub-redes ao diagnóstico de rotas, NAT, MTU e conectividade em API Gateways.',
      route: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento',
      readingTime: '55 min de leitura',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'Endereçamento IP, redes IPv4 e IPv6, sub-redes e seleção de rotas'
    },
    {
      chapterLabel: 'Capítulo 4',
      title: 'DNS, NAT, Proxies e Balanceadores de Carga',
      description: 'Da resolução DNS e tradução de endereços à terminação TLS, health checks e seleção de backends.',
      route: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga',
      readingTime: '65 min de leitura',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies e balanceadores conduzindo uma chamada até pools de backends'
    },
    {
      chapterLabel: 'Capítulo 5',
      title: 'HTTP/1.1, HTTP/2 e HTTP/3',
      description: 'Da semântica e do framing à multiplexação, HPACK, QUIC, QPACK e tradução de protocolo em API Gateways.',
      route: '/learn/pt/http-1-1-http-2-e-http-3',
      readingTime: '80 min de leitura',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolução de mensagens HTTP para streams multiplexados e QUIC através de um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 6',
      title: 'HTTPS e TLS em profundidade',
      description: 'De criptografia e handshakes TLS 1.2/1.3 a certificados X.509, mTLS, HSTS e troubleshooting em API Gateways.',
      route: '/learn/pt/https-e-tls-em-profundidade',
      readingTime: '70 min de leitura',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'Conexão HTTPS protegida por TLS, cadeia de certificados e API Gateway'
    },
    {
      chapterLabel: 'Capítulo 7',
      title: 'Criptografia: simétrica, assimétrica, hashes e assinaturas digitais',
      description: 'De AES, hashes, HMAC e assinaturas digitais à gestão de chaves, KMS, HSM, criptografia pós-quântica e troubleshooting.',
      route: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis',
      readingTime: '65 min de leitura',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Núcleo criptográfico protegendo chaves, assinaturas, hashes e chamadas de APIs'
    },
    {
      chapterLabel: 'Capítulo 8',
      title: 'Certificados digitais, PKI e X.509',
      description: 'De identidade, emissão e cadeia de confiança a SAN, CSR, CRL, OCSP, HSM, mTLS e operação em API Gateways.',
      route: '/learn/pt/certificados-digitais-pki-e-x509',
      readingTime: '75 min de leitura',
      image: '/assets/learn/digital-certificates-pki-x509-cover.png',
      imageAlt: 'Cadeia de confiança PKI conectando uma CA raiz, certificados, HSM, API Gateway e servidores'
    },
    {
      chapterLabel: 'Capítulo 9',
      title: 'mTLS em profundidade',
      description: 'De handshake TLS 1.3 e certificados de cliente a identidade, autorização, API Gateways, service mesh, OAuth e operação segura.',
      route: '/learn/pt/mtls-em-profundidade',
      readingTime: '75 min de leitura',
      image: '/assets/learn/mtls-in-depth-cover.png',
      imageAlt: 'Cliente e servidor apresentam certificados e validam mutuamente suas identidades em uma arquitetura de API corporativa'
    },
    {
      chapterLabel: 'Capítulo 10',
      title: 'REST: Arquitetura e Boas Práticas',
      description: 'Dos princípios de Fielding a recursos, semântica HTTP, idempotência, cache, concorrência, OpenAPI, segurança e operação em API Gateways.',
      route: '/learn/pt/rest-arquitetura-e-boas-praticas',
      readingTime: '85 min de leitura',
      image: '/assets/learn/rest-architecture-best-practices-cover.png',
      imageAlt: 'Ecossistema REST corporativo com recurso central, clientes, API Gateway, representações, cache e persistência'
    },
    {
      chapterLabel: 'Capítulo 11',
      title: 'Modelo de Maturidade REST de Richardson',
      description: 'Do endpoint único à hipermídia: níveis 0 a 3, semântica HTTP, HATEOAS, avaliação, governança e migração de APIs corporativas.',
      route: '/learn/pt/modelo-de-maturidade-rest-de-richardson',
      readingTime: '80 min de leitura',
      image: '/assets/learn/richardson-rest-maturity-model-cover.png',
      imageAlt: 'Evolução em quatro estágios do modelo de maturidade REST de Richardson, do endpoint único à hipermídia'
    },
    {
      chapterLabel: 'Capítulo 12',
      title: 'OpenAPI (Swagger): Contratos, Documentação e Automação',
      description: 'Da descrição formal da interface à validação, linting, semantic diff, mocks, geração de SDKs, portais, governança e API Gateways.',
      route: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao',
      readingTime: '90 min de leitura',
      image: '/assets/learn/openapi-swagger-contracts-cover.png',
      imageAlt: 'Contrato OpenAPI conectando design, validação, documentação, automação, API Gateway e runtime'
    },
    {
      chapterLabel: 'Capítulo 13',
      title: 'GraphQL, gRPC e WebSocket',
      description: 'De schemas, resolvers e N+1 a Protobuf, streaming, deadlines, conexões persistentes, segurança e critérios de arquitetura corporativa.',
      route: '/learn/pt/graphql-grpc-e-websocket',
      readingTime: '65 min de leitura',
      image: '/assets/learn/graphql-grpc-websocket-cover.png',
      imageAlt: 'GraphQL, gRPC e WebSocket conectados em uma arquitetura corporativa moderna'
    },
    {
      chapterLabel: 'Capítulo 14',
      title: 'Autenticação x Autorização',
      description: 'Da prova de identidade à decisão de acesso: credenciais, tokens, OAuth, modelos RBAC, ABAC, ReBAC e PBAC, policy enforcement, workload identity e troubleshooting.',
      route: '/learn/pt/autenticacao-x-autorizacao',
      readingTime: '120 min de leitura',
      image: '/assets/learn/authentication-authorization-cover.png',
      imageAlt: 'Fluxo corporativo que separa a prova de identidade da decisão de acesso a APIs protegidas'
    },
    {
      chapterLabel: 'Capítulo 15',
      title: 'Basic Auth, Digest e API Keys',
      description: 'Desafios HTTP, Base64, TLS, nonce, replay, armazenamento, escopos, quotas, rotação, revogação, HMAC e validação segura em API Gateways.',
      route: '/learn/pt/basic-auth-digest-e-api-keys',
      readingTime: '90 min de leitura',
      image: '/assets/learn/basic-auth-digest-api-keys-cover.png',
      imageAlt: 'Basic Auth, Digest e API Keys convergindo para um gateway corporativo protegido'
    },
    {
      chapterLabel: 'Capítulo 16',
      title: 'OAuth 2.0 em Profundidade: Fluxos, Tokens e Segurança',
      description: 'Papéis, endpoints, Authorization Code com PKCE, Client Credentials, refresh tokens, introspecção, revogação, PAR, JAR, JARM, DPoP, mTLS e segurança em API Gateways.',
      route: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca',
      readingTime: '150 min de leitura',
      image: '/assets/learn/oauth-2-flows-tokens-security-cover.png',
      imageAlt: 'Fluxos OAuth 2.0 protegidos por PKCE, tokens e controles modernos de segurança'
    },
    {
      chapterLabel: 'Capítulo 17',
      title: 'OpenID Connect (OIDC): ID Tokens, Sessões e Federação de Identidade',
      description: 'Da autenticação do usuário à validação de ID Tokens, UserInfo, assurance, SSO, logout federado, discovery, JWKS e federação de identidade.',
      route: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao',
      readingTime: '140 min de leitura',
      image: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png',
      imageAlt: 'Identidade federada OpenID Connect com ID Tokens verificáveis, sessões e Relying Parties'
    }
  ];
  readonly englishArticles: LearnArticle[] = [
    {
      chapterLabel: 'Chapter 1',
      title: 'Internet, Networking, and API Fundamentals',
      description: 'From network communication to the complete processing of a request in an API Gateway.',
      route: '/learn/en/internet-networking-api-fundamentals',
      readingTime: '45 min read',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'An API call crossing network layers and an API Gateway'
    },
    {
      chapterLabel: 'Chapter 2',
      title: 'TCP, UDP, Ports, and Sockets',
      description: 'From connection establishment to diagnosing timeouts, pooling, SNAT, and port exhaustion in API Gateways.',
      route: '/learn/en/tcp-udp-ports-and-sockets',
      readingTime: '50 min read',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'TCP streams and UDP datagrams crossing an API Gateway'
    },
    {
      chapterLabel: 'Chapter 3',
      title: 'IP Addressing: IPv4, IPv6, Subnetting, and Routing',
      description: 'From CIDR prefixes and subnetting to diagnosing routes, NAT, MTU, and connectivity in API Gateways.',
      route: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing',
      readingTime: '55 min read',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'IP addressing, IPv4 and IPv6 networks, subnetting, and route selection'
    },
    {
      chapterLabel: 'Chapter 4',
      title: 'DNS, NAT, Proxies, and Load Balancers',
      description: 'From DNS resolution and address translation to TLS termination, health checks, and backend selection.',
      route: '/learn/en/dns-nat-proxies-and-load-balancers',
      readingTime: '65 min read',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies, and load balancers guiding a request toward backend pools'
    },
    {
      chapterLabel: 'Chapter 5',
      title: 'HTTP/1.1, HTTP/2, and HTTP/3',
      description: 'From semantics and framing to multiplexing, HPACK, QUIC, QPACK, and protocol translation in API Gateways.',
      route: '/learn/en/http-1-1-http-2-and-http-3',
      readingTime: '80 min read',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolution from HTTP messages to multiplexed streams and QUIC through an API Gateway'
    },
    {
      chapterLabel: 'Chapter 6',
      title: 'HTTPS and TLS in Depth',
      description: 'From cryptography and TLS 1.2/1.3 handshakes to X.509 certificates, mTLS, HSTS, and API Gateway troubleshooting.',
      route: '/learn/en/https-and-tls-in-depth',
      readingTime: '70 min read',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'HTTPS connection protected by TLS, a certificate chain, and an API Gateway'
    },
    {
      chapterLabel: 'Chapter 7',
      title: 'Cryptography: Symmetric, Asymmetric, Hashes, and Digital Signatures',
      description: 'From AES, hashes, HMAC, and digital signatures to key management, KMS, HSM, post-quantum cryptography, and troubleshooting.',
      route: '/learn/en/cryptography-fundamentals-and-api-applications',
      readingTime: '65 min read',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Cryptographic core protecting keys, signatures, hashes, and API calls'
    },
    {
      chapterLabel: 'Chapter 8',
      title: 'Digital Certificates, PKI, and X.509',
      description: 'From identity, issuance, and trust chains to SAN, CSR, CRL, OCSP, HSM, mTLS, and API Gateway operations.',
      route: '/learn/en/digital-certificates-pki-and-x509',
      readingTime: '75 min read',
      image: '/assets/learn/digital-certificates-pki-x509-cover.png',
      imageAlt: 'PKI trust chain connecting a root CA, certificates, an HSM, an API Gateway, and servers'
    },
    {
      chapterLabel: 'Chapter 9',
      title: 'mTLS in Depth',
      description: 'From TLS 1.3 handshakes and client certificates to identity, authorization, API Gateways, service meshes, OAuth, and secure operations.',
      route: '/learn/en/mtls-in-depth',
      readingTime: '75 min read',
      image: '/assets/learn/mtls-in-depth-cover.png',
      imageAlt: 'Client and server present certificates and mutually validate their identities in an enterprise API architecture'
    },
    {
      chapterLabel: 'Chapter 10',
      title: 'REST: Architecture and Best Practices',
      description: "From Fielding's principles to resources, HTTP semantics, idempotency, caching, concurrency, OpenAPI, security, and API Gateway operations.",
      route: '/learn/en/rest-architecture-and-best-practices',
      readingTime: '85 min read',
      image: '/assets/learn/rest-architecture-best-practices-cover.png',
      imageAlt: 'Enterprise REST ecosystem with a central resource, clients, API Gateway, representations, cache, and persistence'
    },
    {
      chapterLabel: 'Chapter 11',
      title: 'Richardson REST Maturity Model',
      description: 'From a single endpoint to hypermedia: levels 0 through 3, HTTP semantics, HATEOAS, assessment, governance, and enterprise API migration.',
      route: '/learn/en/richardson-rest-maturity-model',
      readingTime: '80 min read',
      image: '/assets/learn/richardson-rest-maturity-model-cover.png',
      imageAlt: 'Four-stage evolution of the Richardson REST Maturity Model, from a single endpoint to hypermedia'
    },
    {
      chapterLabel: 'Chapter 12',
      title: 'OpenAPI (Swagger): Contracts, Documentation, and Automation',
      description: 'From formal interface description to validation, linting, semantic diff, mocks, SDK generation, portals, governance, and API Gateways.',
      route: '/learn/en/openapi-swagger-contracts-documentation-and-automation',
      readingTime: '90 min read',
      image: '/assets/learn/openapi-swagger-contracts-cover.png',
      imageAlt: 'OpenAPI contract connecting design, validation, documentation, automation, API Gateway, and runtime'
    },
    {
      chapterLabel: 'Chapter 13',
      title: 'GraphQL, gRPC, and WebSocket',
      description: 'From schemas, resolvers, and N+1 to Protobuf, streaming, deadlines, persistent connections, security, and enterprise architecture criteria.',
      route: '/learn/en/graphql-grpc-and-websocket',
      readingTime: '65 min read',
      image: '/assets/learn/graphql-grpc-websocket-cover.png',
      imageAlt: 'GraphQL, gRPC, and WebSocket connected in a modern enterprise architecture'
    },
    {
      chapterLabel: 'Chapter 14',
      title: 'Authentication vs. Authorization',
      description: 'From identity proof to access decisions: credentials, tokens, OAuth, RBAC, ABAC, ReBAC and PBAC models, policy enforcement, workload identity, and troubleshooting.',
      route: '/learn/en/authentication-vs-authorization',
      readingTime: '120 min read',
      image: '/assets/learn/authentication-authorization-cover.png',
      imageAlt: 'Enterprise flow separating identity proof from access decisions for protected APIs'
    },
    {
      chapterLabel: 'Chapter 15',
      title: 'Basic Auth, Digest, and API Keys',
      description: 'HTTP challenges, Base64, TLS, nonce, replay, storage, scopes, quotas, rotation, revocation, HMAC, and secure validation in API Gateways.',
      route: '/learn/en/basic-auth-digest-and-api-keys',
      readingTime: '90 min read',
      image: '/assets/learn/basic-auth-digest-api-keys-cover.png',
      imageAlt: 'Basic Auth, Digest, and API keys converging on a protected enterprise gateway'
    },
    {
      chapterLabel: 'Chapter 16',
      title: 'OAuth 2.0 in Depth: Flows, Tokens, and Security',
      description: 'Roles, endpoints, Authorization Code with PKCE, Client Credentials, refresh tokens, introspection, revocation, PAR, JAR, JARM, DPoP, mTLS, and API Gateway security.',
      route: '/learn/en/oauth-2-flows-tokens-and-security',
      readingTime: '150 min read',
      image: '/assets/learn/oauth-2-flows-tokens-security-cover.png',
      imageAlt: 'OAuth 2.0 flows protected by PKCE, tokens, and modern security controls'
    },
    {
      chapterLabel: 'Chapter 17',
      title: 'OpenID Connect (OIDC): ID Tokens, Sessions, and Identity Federation',
      description: 'From user authentication to ID Token validation, UserInfo, assurance, SSO, federated logout, discovery, JWKS, and identity federation.',
      route: '/learn/en/openid-connect-id-tokens-sessions-and-federation',
      readingTime: '140 min read',
      image: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png',
      imageAlt: 'Federated OpenID Connect identity with verifiable ID Tokens, sessions, and Relying Parties'
    }
  ];
  readonly spanishArticles: LearnArticle[] = [
    {
      chapterLabel: 'Capítulo 1',
      title: 'Fundamentos de Internet, Redes y APIs',
      description: 'De la comunicación en red al procesamiento completo de una solicitud en un API Gateway.',
      route: '/learn/es/fundamentos-internet-redes-apis',
      readingTime: '45 min de lectura',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'Una llamada de API que atraviesa capas de red y un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 2',
      title: 'TCP, UDP, Puertos y Sockets',
      description: 'Desde el establecimiento de conexiones hasta el diagnóstico de timeouts, pooling, SNAT y agotamiento de puertos en API Gateways.',
      route: '/learn/es/tcp-udp-puertos-y-sockets',
      readingTime: '50 min de lectura',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'Flujos TCP y datagramas UDP que atraviesan un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 3',
      title: 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento',
      description: 'De prefijos CIDR y subredes al diagnóstico de rutas, NAT, MTU y conectividad en API Gateways.',
      route: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento',
      readingTime: '55 min de lectura',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'Direccionamiento IP, redes IPv4 e IPv6, subredes y selección de rutas'
    },
    {
      chapterLabel: 'Capítulo 4',
      title: 'DNS, NAT, Proxies y Balanceadores de Carga',
      description: 'De la resolución DNS y la traducción de direcciones a la terminación TLS, health checks y selección de backends.',
      route: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga',
      readingTime: '65 min de lectura',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies y balanceadores guiando una solicitud hacia pools de backends'
    },
    {
      chapterLabel: 'Capítulo 5',
      title: 'HTTP/1.1, HTTP/2 y HTTP/3',
      description: 'De la semántica y el framing a la multiplexación, HPACK, QUIC, QPACK y traducción de protocolos en API Gateways.',
      route: '/learn/es/http-1-1-http-2-y-http-3',
      readingTime: '80 min de lectura',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolución de mensajes HTTP a streams multiplexados y QUIC a través de un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 6',
      title: 'HTTPS y TLS en profundidad',
      description: 'De la criptografía y los handshakes TLS 1.2/1.3 a certificados X.509, mTLS, HSTS y troubleshooting en API Gateways.',
      route: '/learn/es/https-y-tls-en-profundidad',
      readingTime: '70 min de lectura',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'Conexión HTTPS protegida por TLS, cadena de certificados y un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 7',
      title: 'Criptografía: simétrica, asimétrica, hashes y firmas digitales',
      description: 'De AES, hashes, HMAC y firmas digitales a gestión de claves, KMS, HSM, criptografía poscuántica y troubleshooting.',
      route: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis',
      readingTime: '65 min de lectura',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Núcleo criptográfico que protege claves, firmas, hashes y llamadas de APIs'
    },
    {
      chapterLabel: 'Capítulo 8',
      title: 'Certificados digitales, PKI y X.509',
      description: 'De identidad, emisión y cadena de confianza a SAN, CSR, CRL, OCSP, HSM, mTLS y operación en API Gateways.',
      route: '/learn/es/certificados-digitales-pki-y-x509',
      readingTime: '75 min de lectura',
      image: '/assets/learn/digital-certificates-pki-x509-cover.png',
      imageAlt: 'Cadena de confianza PKI que conecta una CA raíz, certificados, un HSM, un API Gateway y servidores'
    },
    {
      chapterLabel: 'Capítulo 9',
      title: 'mTLS en profundidad',
      description: 'De handshakes TLS 1.3 y certificados de cliente a identidad, autorización, API Gateways, service mesh, OAuth y operación segura.',
      route: '/learn/es/mtls-en-profundidad',
      readingTime: '75 min de lectura',
      image: '/assets/learn/mtls-in-depth-cover.png',
      imageAlt: 'Cliente y servidor presentan certificados y validan mutuamente sus identidades en una arquitectura de API empresarial'
    },
    {
      chapterLabel: 'Capítulo 10',
      title: 'REST: Arquitectura y Buenas Prácticas',
      description: 'De los principios de Fielding a recursos, semántica HTTP, idempotencia, cache, concurrencia, OpenAPI, seguridad y operación en API Gateways.',
      route: '/learn/es/rest-arquitectura-y-buenas-practicas',
      readingTime: '85 min de lectura',
      image: '/assets/learn/rest-architecture-best-practices-cover.png',
      imageAlt: 'Ecosistema REST corporativo con recurso central, clientes, API Gateway, representaciones, cache y persistencia'
    },
    {
      chapterLabel: 'Capítulo 11',
      title: 'Modelo de Madurez REST de Richardson',
      description: 'Del endpoint único a la hipermedia: niveles 0 a 3, semántica HTTP, HATEOAS, evaluación, gobernanza y migración de APIs corporativas.',
      route: '/learn/es/modelo-de-madurez-rest-de-richardson',
      readingTime: '80 min de lectura',
      image: '/assets/learn/richardson-rest-maturity-model-cover.png',
      imageAlt: 'Evolución en cuatro etapas del modelo de madurez REST de Richardson, desde un endpoint único hasta la hipermedia'
    },
    {
      chapterLabel: 'Capítulo 12',
      title: 'OpenAPI (Swagger): Contratos, Documentación y Automatización',
      description: 'De la descripción formal de la interfaz a validación, linting, semantic diff, mocks, generación de SDKs, portales, gobernanza y API Gateways.',
      route: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion',
      readingTime: '90 min de lectura',
      image: '/assets/learn/openapi-swagger-contracts-cover.png',
      imageAlt: 'Contrato OpenAPI que conecta diseño, validación, documentación, automatización, API Gateway y runtime'
    },
    {
      chapterLabel: 'Capítulo 13',
      title: 'GraphQL, gRPC y WebSocket',
      description: 'De schemas, resolvers y N+1 a Protobuf, streaming, deadlines, conexiones persistentes, seguridad y criterios de arquitectura corporativa.',
      route: '/learn/es/graphql-grpc-y-websocket',
      readingTime: '65 min de lectura',
      image: '/assets/learn/graphql-grpc-websocket-cover.png',
      imageAlt: 'GraphQL, gRPC y WebSocket conectados en una arquitectura corporativa moderna'
    },
    {
      chapterLabel: 'Capítulo 14',
      title: 'Autenticación vs. Autorización',
      description: 'De la prueba de identidad a la decisión de acceso: credenciales, tokens, OAuth, modelos RBAC, ABAC, ReBAC y PBAC, aplicación de políticas, workload identity y troubleshooting.',
      route: '/learn/es/autenticacion-vs-autorizacion',
      readingTime: '120 min de lectura',
      image: '/assets/learn/authentication-authorization-cover.png',
      imageAlt: 'Flujo corporativo que separa la prueba de identidad de la decisión de acceso a APIs protegidas'
    },
    {
      chapterLabel: 'Capítulo 15',
      title: 'Basic Auth, Digest y API Keys',
      description: 'Desafíos HTTP, Base64, TLS, nonce, replay, almacenamiento, scopes, quotas, rotación, revocación, HMAC y validación segura en API Gateways.',
      route: '/learn/es/basic-auth-digest-y-api-keys',
      readingTime: '90 min de lectura',
      image: '/assets/learn/basic-auth-digest-api-keys-cover.png',
      imageAlt: 'Basic Auth, Digest y API Keys convergiendo en un gateway corporativo protegido'
    },
    {
      chapterLabel: 'Capítulo 16',
      title: 'OAuth 2.0 en Profundidad: Flujos, Tokens y Seguridad',
      description: 'Roles, endpoints, Authorization Code con PKCE, Client Credentials, refresh tokens, introspección, revocación, PAR, JAR, JARM, DPoP, mTLS y seguridad en API Gateways.',
      route: '/learn/es/oauth-2-flujos-tokens-y-seguridad',
      readingTime: '150 min de lectura',
      image: '/assets/learn/oauth-2-flows-tokens-security-cover.png',
      imageAlt: 'Flujos OAuth 2.0 protegidos por PKCE, tokens y controles modernos de seguridad'
    },
    {
      chapterLabel: 'Capítulo 17',
      title: 'OpenID Connect (OIDC): ID Tokens, Sesiones y Federación de Identidad',
      description: 'De la autenticación del usuario a la validación de ID Tokens, UserInfo, assurance, SSO, logout federado, discovery, JWKS y federación de identidad.',
      route: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion',
      readingTime: '140 min de lectura',
      image: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png',
      imageAlt: 'Identidad federada OpenID Connect con ID Tokens verificables, sesiones y Relying Parties'
    }
  ];

  constructor(
    private readonly dataService: DataService,
    private readonly readingProgress: ReadingProgressService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Learn');
  }

  toggleCorporateApiPath(): void {
    this.isCorporateApiPathOpen = !this.isCorporateApiPathOpen;
  }

  isSeriesOpen(key: SeriesKey): boolean {
    return this.seriesOpen[key] === true;
  }

  toggleSeries(key: SeriesKey): void {
    this.seriesOpen = { ...this.seriesOpen, [key]: !this.seriesOpen[key] };
    this.persistSeriesState();
  }

  private loadSeriesState(): Record<SeriesKey, boolean> {
    const fallback: Record<SeriesKey, boolean> = { english: false, spanish: false, portuguese: false };

    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }

    try {
      const raw = window.localStorage.getItem(SERIES_STATE_KEY);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw) as Partial<Record<SeriesKey, unknown>>;
      return {
        english: parsed.english === true,
        spanish: parsed.spanish === true,
        portuguese: parsed.portuguese === true
      };
    } catch {
      return fallback;
    }
  }

  private persistSeriesState(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    try {
      window.localStorage.setItem(SERIES_STATE_KEY, JSON.stringify(this.seriesOpen));
    } catch {
      // Ignore storage errors (quota / disabled); in-memory state still applies.
    }
  }

  /** A card shows the green check when its chapter is read in any language. */
  isRead(route: string): boolean {
    const chapterId = chapterIdForRoute(route);
    return chapterId ? this.readingProgress.progress()[chapterId] === true : false;
  }

  /** Global sum shown in the hero: unique chapters read across all paths. */
  get totalReadCount(): number {
    return this.readingProgress.count();
  }

  /**
   * Percentage (0-100) of a path the user has read, with topic granularity:
   * partially read chapters contribute their fraction of read topics.
   */
  pathCompletionPercent(pathId: string): number {
    const path = LEARN_PATHS.find((item) => item.id === pathId);
    if (!path || !path.chapters.length) {
      return 0;
    }
    const sum = path.chapters.reduce(
      (total, chapter) => total + this.readingProgress.chapterCompletion(chapter.id, chapter.topicCount),
      0
    );
    return Math.round((sum / path.chapters.length) * 100);
  }

  /** Unique chapters read in a given path (a chapter read in any language counts once). */
  pathReadCount(pathId: string): number {
    const path = LEARN_PATHS.find((item) => item.id === pathId);
    if (!path) {
      return 0;
    }
    const progress = this.readingProgress.progress();
    return path.chapters.reduce((total, chapter) => total + (progress[chapter.id] === true ? 1 : 0), 0);
  }

  /** Total unique chapters in a path (counts one language only). */
  pathTotal(pathId: string): number {
    return LEARN_PATHS.find((item) => item.id === pathId)?.chapters.length ?? 0;
  }

  exportProgress(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = JSON.stringify(this.readingProgress.export(), null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'utily-learn-progress.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  triggerImport(): void {
    this.importFeedback = null;
    this.importInput?.nativeElement.click();
  }

  onImportFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = this.readingProgress.import(String(reader.result ?? ''));
        this.importFeedback = {
          type: 'success',
          message: `Imported progress for ${imported} article${imported === 1 ? '' : 's'}.`
        };
      } catch {
        this.importFeedback = { type: 'error', message: 'Could not read that file. Please select a valid progress JSON.' };
      }
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.onerror = () => {
      this.importFeedback = { type: 'error', message: 'Could not read that file. Please try again.' };
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.readAsText(file);
  }

  scroll(track: 'portuguese' | 'english' | 'spanish', direction: -1 | 1): void {
    const tracks = {
      portuguese: this.portugueseTrack?.nativeElement,
      english: this.englishTrack?.nativeElement,
      spanish: this.spanishTrack?.nativeElement
    };

    tracks[track]?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  }
}
