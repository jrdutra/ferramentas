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
    },
    {
      chapterLabel: 'Capítulo 18',
      title: 'JWT, JWS, JWE e JOSE em Profundidade',
      description: 'Claims, Base64url, assinaturas, MAC, algoritmos, JWK, JWKS, rotação de chaves, JWE, tokens aninhados e validação segura em API Gateways.',
      route: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade',
      readingTime: '150 min de leitura',
      image: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png',
      imageAlt: 'Token em camadas protegido por assinatura, criptografia e governança de chaves na arquitetura de APIs'
    },
    {
      chapterLabel: 'Capítulo 19',
      title: 'SAML 2.0 em Profundidade',
      description: 'Assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, federação e segurança em ambientes corporativos.',
      route: '/learn/pt/saml-2-em-profundidade',
      readingTime: '110 min de leitura',
      image: '/assets/learn/saml-2-in-depth-cover.png',
      imageAlt: 'Federação SAML entre domínios corporativos com assertion XML assinada e metadata confiável'
    },
    {
      chapterLabel: 'Capítulo 20',
      title: 'Identity Federation e Single Sign-On',
      description: 'Domínios de confiança, SSO, sessões, brokers, SAML, OIDC, account linking, MFA, B2B, workloads e integração com API Gateways.',
      route: '/learn/pt/identity-federation-e-single-sign-on',
      readingTime: '120 min de leitura',
      image: '/assets/learn/identity-federation-sso-cover.png',
      imageAlt: 'Identity Provider central conectando múltiplas aplicações e domínios por relações de confiança'
    },
    {
      chapterLabel: 'Capítulo 21',
      title: 'API Gateways: conceitos e arquitetura',
      description: 'Data plane, control plane, políticas, roteamento, segurança, tráfego, alta disponibilidade, observabilidade, governança e troubleshooting.',
      route: '/learn/pt/api-gateways-conceitos-e-arquitetura',
      readingTime: '135 min de leitura',
      image: '/assets/learn/api-gateways-architecture-cover.png',
      imageAlt: 'API Gateway central mediando consumidores, políticas e serviços de backend'
    },
    {
      chapterLabel: 'Capítulo 22', title: 'Políticas de Gateway (Policies)',
      description: 'Pipeline, ordem, escopos, autenticação, autorização, validação, limites, transformação, roteamento, resiliência e observabilidade.',
      route: '/learn/pt/politicas-de-gateway-policies', readingTime: '115 min de leitura', image: '/assets/learn/gateway-policies-cover.png', imageAlt: 'Pipeline luminoso de policies processando uma chamada de API'
    },
    { chapterLabel: 'Capítulo 23', title: 'Axway API Gateway: arquitetura e funcionamento', description: 'Policy Studio, domínio, Node Managers, runtime, API Manager, KPS, Cassandra, HA, segurança, observabilidade e operação.', route: '/learn/pt/axway-api-gateway-arquitetura-e-funcionamento', readingTime: '140 min de leitura', image: '/assets/learn/axway-api-gateway-architecture-cover.png', imageAlt: 'Arquitetura distribuída de uma plataforma corporativa de API Gateway'
    },
    { chapterLabel: 'Capítulo 24', title: 'Azure API Management (APIM)', description: 'Arquitetura, gateways, policies, tiers, redes privadas, segurança, alta disponibilidade, observabilidade e automação.', route: '/learn/pt/azure-api-management-apim', readingTime: '135 min de leitura', image: '/assets/learn/azure-api-management-apim-cover.png', imageAlt: 'Plataforma gerenciada de APIs conectando gateways, redes híbridas e observabilidade'
    },
    { chapterLabel: 'Capítulo 25', title: 'Segurança de APIs (OWASP API Security Top 10)', description: 'BOLA, autenticação, propriedades, recursos, funções, fluxos de negócio, SSRF, configuração, inventário e consumo inseguro.', route: '/learn/pt/seguranca-apis-owasp-api-security-top-10', readingTime: '105 min de leitura', image: '/assets/learn/api-security-owasp-top-10-cover.png', imageAlt: 'Defesa em profundidade protegendo identidades, gateways, backends e dados de APIs'
    },
    { chapterLabel: 'Capítulo 26', title: 'CORS, CSP, HSTS e outros cabeçalhos HTTP', description: 'Origem, preflight, credenciais, CSP, nonces, HSTS, isolamento cross-origin, cache, cookies e troubleshooting.', route: '/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http', readingTime: '125 min de leitura', image: '/assets/learn/http-security-headers-cover.png', imageAlt: 'Navegador e APIs protegidos por políticas de origem, conteúdo e transporte seguro'
    },
    { chapterLabel: 'Capítulo 27', title: 'Rate Limiting, Quotas e Throttling', description: 'Algoritmos, chaves, custos, burst, concorrência, limites distribuídos, 429, retries, dimensionamento e troubleshooting.', route: '/learn/pt/rate-limiting-quotas-e-throttling', readingTime: '120 min de leitura', image: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageAlt: 'Gateway corporativo controlando fluxos, bursts e orçamentos de consumo de APIs'
    },
    { chapterLabel: 'Capítulo 28', title: 'API Versioning', description: 'Compatibilidade, SemVer, estratégias de seleção, coexistência, depreciação, Sunset, migração, testes e governança.', route: '/learn/pt/api-versioning', readingTime: '125 min de leitura', image: '/assets/learn/api-versioning-cover.png', imageAlt: 'Contratos de API evoluindo por versões coexistentes, migração e retirada segura'
    },
    { chapterLabel: 'Capítulo 29', title: 'Service Mesh (Istio, Linkerd e Envoy)', description: 'Control plane, data plane, sidecar, ambient, mTLS, traffic management, resiliência, observabilidade, xDS e multi-cluster.', route: '/learn/pt/service-mesh-istio-linkerd-e-envoy', readingTime: '130 min de leitura', image: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageAlt: 'Plano de controle coordenando uma malha segura de workloads, proxies e múltiplos clusters'
    },
    { chapterLabel: 'Capítulo 30', title: 'Microserviços e padrões de integração', description: 'Bounded contexts, contratos, comunicação síncrona e assíncrona, Saga, Outbox, CQRS, Event Sourcing e Strangler Fig.', route: '/learn/pt/microservicos-e-padroes-de-integracao', readingTime: '135 min de leitura', image: '/assets/learn/microservices-integration-patterns-cover.png', imageAlt: 'Domínios autônomos integrados por APIs, eventos, sagas, outbox e observabilidade'
    },
    { chapterLabel: 'Capítulo 31', title: 'Mensageria: Kafka, RabbitMQ, AMQP e JMS', description: 'Filas, logs, entrega, ordering, Kafka, RabbitMQ, AMQP, Jakarta Messaging, DLQ, segurança, capacidade e troubleshooting.', route: '/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms', readingTime: '135 min de leitura', image: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageAlt: 'Broker corporativo distribuindo mensagens duráveis entre produtores, partições, filas e consumidores'
    },
    { chapterLabel: 'Capítulo 32', title: 'Observabilidade: Logs, Métricas e Tracing com OpenTelemetry', description: 'Telemetria, correlação, logs estruturados, métricas, cardinalidade, traces, OTLP, Collector, sampling, exemplars e SLOs.', route: '/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry', readingTime: '130 min de leitura', image: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageAlt: 'Plataforma de observabilidade correlacionando logs, métricas e traces de serviços distribuídos'
    },
    { chapterLabel: 'Capítulo 33', title: 'Kubernetes para APIs', description: 'Pods, workloads, Services, Gateway API, configuração, probes, autoscaling, scheduling, segurança, observabilidade e GitOps.', route: '/learn/pt/kubernetes-para-apis', readingTime: '140 min de leitura', image: '/assets/learn/kubernetes-for-apis-cover.png', imageAlt: 'Cluster Kubernetes executando APIs com roteamento, segurança, autoscaling e observabilidade'
    },
    { chapterLabel: 'Capítulo 34', title: 'Zero Trust aplicado a APIs', description: 'Identidade composta, decisão por requisição, PDP, PEP, mTLS, prova de posse, policy-as-code, microsegmentação e risco adaptativo.', route: '/learn/pt/zero-trust-aplicado-a-apis', readingTime: '135 min de leitura', image: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageAlt: 'Arquitetura Zero Trust avaliando identidade, risco e políticas antes de liberar acesso a APIs'
    },
    { chapterLabel: 'Capítulo 35', title: 'Open Finance e Open Banking no Brasil', description: 'Consentimento, participantes, FAPI-BR, diretório, APIs padronizadas, iniciação de pagamentos, segurança e operação ponta a ponta.', route: '/learn/pt/open-finance-e-open-banking-no-brasil', readingTime: '130 min de leitura', image: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageAlt: 'Ecossistema brasileiro de Open Finance conectando cliente, instituições, consentimento e APIs seguras'
    },
    { chapterLabel: 'Capítulo 36', title: 'LGPD aplicada às APIs', description: 'Dados pessoais, princípios, bases legais, minimização, direitos dos titulares, retenção, privacy by design, incidentes e governança.', route: '/learn/pt/lgpd-aplicada-as-apis', readingTime: '130 min de leitura', image: '/assets/learn/lgpd-applied-to-apis-cover.png', imageAlt: 'Ciclo de vida de dados pessoais protegido por controles de privacidade, segurança e governança'
    },
    { chapterLabel: 'Capítulo 37', title: 'Arquiteturas bancárias de alta disponibilidade', description: 'Operações críticas, tolerância à disrupção, RTO, RPO, redundância, consistência, recuperação, reconciliação e testes de resiliência.', route: '/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade', readingTime: '120 min de leitura', image: '/assets/learn/high-availability-banking-architectures-cover.png', imageAlt: 'Arquitetura bancária resiliente com redundância e continuidade transacional'
    },
    { chapterLabel: 'Capítulo 38', title: 'Troubleshooting de APIs e Gateways', description: 'Método científico, diagnóstico por camadas, rede, TLS, HTTP, policies, backends, Kubernetes, observabilidade e resposta a incidentes.', route: '/learn/pt/troubleshooting-de-apis-e-gateways', readingTime: '125 min de leitura', image: '/assets/learn/api-gateway-troubleshooting-cover.png', imageAlt: 'Diagnóstico de APIs e gateways localizando uma falha distribuída'
    },
    { chapterLabel: 'Capítulo 39', title: 'Estudo de casos reais de grandes empresas', description: 'Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub e Spotify: decisões, trade-offs e padrões transferíveis.', route: '/learn/pt/estudo-de-casos-reais-de-grandes-empresas', readingTime: '105 min de leitura', image: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageAlt: 'Casos reais de arquitetura convergindo para padrões governados'
    },
    { chapterLabel: 'Capítulo 40', title: 'Projeto final: plataforma completa de APIs', description: 'Projeto integrador com contratos, identidade, gateway, serviços, eventos, Kubernetes, observabilidade, resiliência e critérios de aceite.', route: '/learn/pt/projeto-final-plataforma-completa-de-apis', readingTime: '135 min de leitura', image: '/assets/learn/complete-api-platform-capstone-cover.png', imageAlt: 'Plataforma completa de APIs integrada de ponta a ponta'
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
    },
    {
      chapterLabel: 'Chapter 18',
      title: 'JWT, JWS, JWE, and JOSE in Depth',
      description: 'Claims, Base64url, signatures, MAC, algorithms, JWK, JWKS, key rotation, JWE, nested tokens, and secure validation in API Gateways.',
      route: '/learn/en/jwt-jws-jwe-and-jose-in-depth',
      readingTime: '150 min read',
      image: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png',
      imageAlt: 'Layered token protected by signatures, encryption, and key governance in an API architecture'
    },
    {
      chapterLabel: 'Chapter 19',
      title: 'SAML 2.0 in Depth',
      description: 'Assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, federation, and enterprise security.',
      route: '/learn/en/saml-2-in-depth',
      readingTime: '110 min read',
      image: '/assets/learn/saml-2-in-depth-cover.png',
      imageAlt: 'SAML federation across enterprise domains with a signed XML assertion and trusted metadata'
    },
    {
      chapterLabel: 'Chapter 20',
      title: 'Identity Federation and Single Sign-On',
      description: 'Trust domains, SSO, sessions, brokers, SAML, OIDC, account linking, MFA, B2B, workloads, and API Gateway integration.',
      route: '/learn/en/identity-federation-and-single-sign-on',
      readingTime: '120 min read',
      image: '/assets/learn/identity-federation-sso-cover.png',
      imageAlt: 'Central Identity Provider connecting multiple applications and domains through trust relationships'
    },
    {
      chapterLabel: 'Chapter 21',
      title: 'API Gateways: Concepts and Architecture',
      description: 'Data plane, control plane, policies, routing, security, traffic control, high availability, observability, governance, and troubleshooting.',
      route: '/learn/en/api-gateways-concepts-and-architecture',
      readingTime: '135 min read',
      image: '/assets/learn/api-gateways-architecture-cover.png',
      imageAlt: 'Central API Gateway mediating consumers, policies, and backend services'
    },
    {
      chapterLabel: 'Chapter 22', title: 'Gateway Policies',
      description: 'Pipeline, ordering, scopes, authentication, authorization, validation, limits, transformation, routing, resilience, and observability.',
      route: '/learn/en/gateway-policies', readingTime: '115 min read', image: '/assets/learn/gateway-policies-cover.png', imageAlt: 'Luminous policy pipeline processing an API call'
    },
    { chapterLabel: 'Chapter 23', title: 'Axway API Gateway: Architecture and Operation', description: 'Policy Studio, domains, Node Managers, runtime, API Manager, KPS, Cassandra, HA, security, observability, and operations.', route: '/learn/en/axway-api-gateway-architecture-and-operation', readingTime: '140 min read', image: '/assets/learn/axway-api-gateway-architecture-cover.png', imageAlt: 'Distributed architecture of an enterprise API Gateway platform'
    },
    { chapterLabel: 'Chapter 24', title: 'Azure API Management (APIM)', description: 'Architecture, gateways, policies, tiers, private networking, security, high availability, observability, and automation.', route: '/learn/en/azure-api-management-apim', readingTime: '135 min read', image: '/assets/learn/azure-api-management-apim-cover.png', imageAlt: 'Managed API platform connecting gateways, hybrid networks, and observability'
    },
    { chapterLabel: 'Chapter 25', title: 'API Security (OWASP API Security Top 10)', description: 'BOLA, authentication, properties, resources, functions, business flows, SSRF, configuration, inventory, and unsafe consumption.', route: '/learn/en/api-security-owasp-api-security-top-10', readingTime: '105 min read', image: '/assets/learn/api-security-owasp-top-10-cover.png', imageAlt: 'Defense in depth protecting API identities, gateways, backends, and data'
    },
    { chapterLabel: 'Chapter 26', title: 'CORS, CSP, HSTS, and Other HTTP Headers', description: 'Origins, preflight, credentials, CSP, nonces, HSTS, cross-origin isolation, caching, cookies, and troubleshooting.', route: '/learn/en/cors-csp-hsts-and-other-http-headers', readingTime: '125 min read', image: '/assets/learn/http-security-headers-cover.png', imageAlt: 'Browser and APIs protected by origin, content, and secure transport policies'
    },
    { chapterLabel: 'Chapter 27', title: 'Rate Limiting, Quotas, and Throttling', description: 'Algorithms, keys, costs, bursts, concurrency, distributed limits, 429, retries, sizing, and troubleshooting.', route: '/learn/en/rate-limiting-quotas-and-throttling', readingTime: '120 min read', image: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageAlt: 'Enterprise gateway controlling API traffic flows, bursts, and consumption budgets'
    },
    { chapterLabel: 'Chapter 28', title: 'API Versioning', description: 'Compatibility, SemVer, selection strategies, coexistence, deprecation, Sunset, migration, testing, and governance.', route: '/learn/en/api-versioning', readingTime: '125 min read', image: '/assets/learn/api-versioning-cover.png', imageAlt: 'API contracts evolving through coexisting versions, migration, and safe retirement'
    },
    { chapterLabel: 'Chapter 29', title: 'Service Mesh (Istio, Linkerd, and Envoy)', description: 'Control plane, data plane, sidecars, ambient mode, mTLS, traffic management, resilience, observability, xDS, and multi-cluster.', route: '/learn/en/service-mesh-istio-linkerd-and-envoy', readingTime: '130 min read', image: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageAlt: 'Control plane coordinating a secure mesh of workloads, proxies, and multiple clusters'
    },
    { chapterLabel: 'Chapter 30', title: 'Microservices and Integration Patterns', description: 'Bounded contexts, contracts, synchronous and asynchronous communication, Saga, Outbox, CQRS, Event Sourcing, and Strangler Fig.', route: '/learn/en/microservices-and-integration-patterns', readingTime: '135 min read', image: '/assets/learn/microservices-integration-patterns-cover.png', imageAlt: 'Autonomous domains integrated through APIs, events, sagas, outbox, and observability'
    },
    { chapterLabel: 'Chapter 31', title: 'Messaging: Kafka, RabbitMQ, AMQP, and JMS', description: 'Queues, logs, delivery, ordering, Kafka, RabbitMQ, AMQP, Jakarta Messaging, DLQ, security, capacity, and troubleshooting.', route: '/learn/en/messaging-kafka-rabbitmq-amqp-and-jms', readingTime: '135 min read', image: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageAlt: 'Enterprise broker distributing durable messages across producers, partitions, queues, and consumers'
    },
    { chapterLabel: 'Chapter 32', title: 'Observability: Logs, Metrics, and Tracing with OpenTelemetry', description: 'Telemetry, correlation, structured logs, metrics, cardinality, traces, OTLP, Collector, sampling, exemplars, and SLOs.', route: '/learn/en/observability-logs-metrics-tracing-opentelemetry', readingTime: '130 min read', image: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageAlt: 'Observability platform correlating logs, metrics, and traces from distributed services'
    },
    { chapterLabel: 'Chapter 33', title: 'Kubernetes for APIs', description: 'Pods, workloads, Services, Gateway API, configuration, probes, autoscaling, scheduling, security, observability, and GitOps.', route: '/learn/en/kubernetes-for-apis', readingTime: '140 min read', image: '/assets/learn/kubernetes-for-apis-cover.png', imageAlt: 'Kubernetes cluster running APIs with routing, security, autoscaling, and observability'
    },
    { chapterLabel: 'Chapter 34', title: 'Zero Trust Applied to APIs', description: 'Composite identity, per-request decisions, PDP, PEP, mTLS, proof of possession, policy-as-code, microsegmentation, and adaptive risk.', route: '/learn/en/zero-trust-applied-to-apis', readingTime: '135 min read', image: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageAlt: 'Zero Trust architecture evaluating identity, risk, and policies before granting API access'
    },
    { chapterLabel: 'Chapter 35', title: 'Open Finance and Open Banking in Brazil', description: 'Consent, participants, FAPI-BR, directory, standardized APIs, payment initiation, security, and end-to-end operations.', route: '/learn/en/open-finance-and-open-banking-in-brazil', readingTime: '130 min read', image: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageAlt: 'Brazilian Open Finance ecosystem connecting customers, institutions, consent, and secure APIs'
    },
    { chapterLabel: 'Chapter 36', title: 'LGPD Applied to APIs', description: 'Personal data, principles, legal bases, minimization, data subject rights, retention, privacy by design, incidents, and governance.', route: '/learn/en/lgpd-applied-to-apis', readingTime: '130 min read', image: '/assets/learn/lgpd-applied-to-apis-cover.png', imageAlt: 'Personal data lifecycle protected by privacy, security, and governance controls'
    },
    { chapterLabel: 'Chapter 37', title: 'High-Availability Banking Architectures', description: 'Critical operations, disruption tolerance, RTO, RPO, redundancy, consistency, recovery, reconciliation, and resilience testing.', route: '/learn/en/high-availability-banking-architectures', readingTime: '120 min read', image: '/assets/learn/high-availability-banking-architectures-cover.png', imageAlt: 'Resilient banking architecture with redundancy and transactional continuity'
    },
    { chapterLabel: 'Chapter 38', title: 'API and Gateway Troubleshooting', description: 'Scientific method, layered diagnostics, networking, TLS, HTTP, policies, backends, Kubernetes, observability, and incident response.', route: '/learn/en/api-and-gateway-troubleshooting', readingTime: '125 min read', image: '/assets/learn/api-gateway-troubleshooting-cover.png', imageAlt: 'API and gateway diagnostics locating a distributed failure'
    },
    { chapterLabel: 'Chapter 39', title: 'Real-World Case Studies from Large Enterprises', description: 'Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub, and Spotify: decisions, trade-offs, and transferable patterns.', route: '/learn/en/real-world-case-studies-from-large-enterprises', readingTime: '105 min read', image: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageAlt: 'Real-world architecture cases converging into governed patterns'
    },
    { chapterLabel: 'Chapter 40', title: 'Capstone Project: Complete API Platform', description: 'Integrating project with contracts, identity, gateways, services, events, Kubernetes, observability, resilience, and acceptance criteria.', route: '/learn/en/complete-api-platform-capstone-project', readingTime: '135 min read', image: '/assets/learn/complete-api-platform-capstone-cover.png', imageAlt: 'Complete end-to-end integrated API platform'
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
    },
    {
      chapterLabel: 'Capítulo 18',
      title: 'JWT, JWS, JWE y JOSE en Profundidad',
      description: 'Claims, Base64url, firmas, MAC, algoritmos, JWK, JWKS, rotación de claves, JWE, tokens anidados y validación segura en API Gateways.',
      route: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad',
      readingTime: '150 min de lectura',
      image: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png',
      imageAlt: 'Token en capas protegido por firmas, cifrado y gobernanza de claves en una arquitectura de APIs'
    },
    {
      chapterLabel: 'Capítulo 19',
      title: 'SAML 2.0 en Profundidad',
      description: 'Assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, federación y seguridad corporativa.',
      route: '/learn/es/saml-2-en-profundidad',
      readingTime: '110 min de lectura',
      image: '/assets/learn/saml-2-in-depth-cover.png',
      imageAlt: 'Federación SAML entre dominios corporativos con una assertion XML firmada y metadata confiable'
    },
    {
      chapterLabel: 'Capítulo 20',
      title: 'Federación de Identidad y Single Sign-On',
      description: 'Dominios de confianza, SSO, sesiones, brokers, SAML, OIDC, account linking, MFA, B2B, workloads e integración con API Gateways.',
      route: '/learn/es/federacion-de-identidad-y-single-sign-on',
      readingTime: '120 min de lectura',
      image: '/assets/learn/identity-federation-sso-cover.png',
      imageAlt: 'Identity Provider central conectando múltiples aplicaciones y dominios mediante relaciones de confianza'
    },
    {
      chapterLabel: 'Capítulo 21',
      title: 'API Gateways: conceptos y arquitectura',
      description: 'Data plane, control plane, políticas, enrutamiento, seguridad, tráfico, alta disponibilidad, observabilidad, gobernanza y troubleshooting.',
      route: '/learn/es/api-gateways-conceptos-y-arquitectura',
      readingTime: '135 min de lectura',
      image: '/assets/learn/api-gateways-architecture-cover.png',
      imageAlt: 'API Gateway central que media consumidores, políticas y servicios backend'
    },
    {
      chapterLabel: 'Capítulo 22', title: 'Políticas de Gateway (Policies)',
      description: 'Pipeline, orden, ámbitos, autenticación, autorización, validación, límites, transformación, enrutamiento, resiliencia y observabilidad.',
      route: '/learn/es/politicas-de-gateway-policies', readingTime: '115 min de lectura', image: '/assets/learn/gateway-policies-cover.png', imageAlt: 'Pipeline luminoso de policies procesando una llamada de API'
    },
    { chapterLabel: 'Capítulo 23', title: 'Axway API Gateway: arquitectura y funcionamiento', description: 'Policy Studio, dominio, Node Managers, runtime, API Manager, KPS, Cassandra, HA, seguridad, observabilidad y operación.', route: '/learn/es/axway-api-gateway-arquitectura-y-funcionamiento', readingTime: '140 min de lectura', image: '/assets/learn/axway-api-gateway-architecture-cover.png', imageAlt: 'Arquitectura distribuida de una plataforma corporativa de API Gateway'
    },
    { chapterLabel: 'Capítulo 24', title: 'Azure API Management (APIM)', description: 'Arquitectura, gateways, policies, tiers, redes privadas, seguridad, alta disponibilidad, observabilidad y automatización.', route: '/learn/es/azure-api-management-apim', readingTime: '135 min de lectura', image: '/assets/learn/azure-api-management-apim-cover.png', imageAlt: 'Plataforma administrada de APIs conectando gateways, redes híbridas y observabilidad'
    },
    { chapterLabel: 'Capítulo 25', title: 'Seguridad de APIs (OWASP API Security Top 10)', description: 'BOLA, autenticación, propiedades, recursos, funciones, flujos de negocio, SSRF, configuración, inventario y consumo inseguro.', route: '/learn/es/seguridad-apis-owasp-api-security-top-10', readingTime: '105 min de lectura', image: '/assets/learn/api-security-owasp-top-10-cover.png', imageAlt: 'Defensa en profundidad protegiendo identidades, gateways, backends y datos de APIs'
    },
    { chapterLabel: 'Capítulo 26', title: 'CORS, CSP, HSTS y otros encabezados HTTP', description: 'Orígenes, preflight, credenciales, CSP, nonces, HSTS, aislamiento cross-origin, caché, cookies y troubleshooting.', route: '/learn/es/cors-csp-hsts-y-otros-encabezados-http', readingTime: '125 min de lectura', image: '/assets/learn/http-security-headers-cover.png', imageAlt: 'Navegador y APIs protegidos por políticas de origen, contenido y transporte seguro'
    },
    { chapterLabel: 'Capítulo 27', title: 'Rate Limiting, Cuotas y Throttling', description: 'Algoritmos, claves, costes, ráfagas, concurrencia, límites distribuidos, 429, reintentos, dimensionamiento y troubleshooting.', route: '/learn/es/rate-limiting-cuotas-y-throttling', readingTime: '120 min de lectura', image: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageAlt: 'Gateway corporativo controlando flujos, ráfagas y presupuestos de consumo de APIs'
    },
    { chapterLabel: 'Capítulo 28', title: 'API Versioning', description: 'Compatibilidad, SemVer, estrategias de selección, coexistencia, deprecación, Sunset, migración, pruebas y gobernanza.', route: '/learn/es/api-versioning', readingTime: '125 min de lectura', image: '/assets/learn/api-versioning-cover.png', imageAlt: 'Contratos de API evolucionando mediante versiones coexistentes, migración y retirada segura'
    },
    { chapterLabel: 'Capítulo 29', title: 'Service Mesh (Istio, Linkerd y Envoy)', description: 'Plano de control, plano de datos, sidecars, ambient, mTLS, traffic management, resiliencia, observabilidad, xDS y multi-cluster.', route: '/learn/es/service-mesh-istio-linkerd-y-envoy', readingTime: '130 min de lectura', image: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageAlt: 'Plano de control coordinando una malla segura de workloads, proxies y múltiples clusters'
    },
    { chapterLabel: 'Capítulo 30', title: 'Microservicios y patrones de integración', description: 'Bounded contexts, contratos, comunicación síncrona y asíncrona, Saga, Outbox, CQRS, Event Sourcing y Strangler Fig.', route: '/learn/es/microservicios-y-patrones-de-integracion', readingTime: '135 min de lectura', image: '/assets/learn/microservices-integration-patterns-cover.png', imageAlt: 'Dominios autónomos integrados mediante APIs, eventos, sagas, outbox y observabilidad'
    },
    { chapterLabel: 'Capítulo 31', title: 'Mensajería: Kafka, RabbitMQ, AMQP y JMS', description: 'Colas, logs, entrega, ordering, Kafka, RabbitMQ, AMQP, Jakarta Messaging, DLQ, seguridad, capacidad y troubleshooting.', route: '/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms', readingTime: '135 min de lectura', image: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageAlt: 'Broker corporativo distribuyendo mensajes duraderos entre productores, particiones, colas y consumidores'
    },
    { chapterLabel: 'Capítulo 32', title: 'Observabilidad: Logs, Métricas y Tracing con OpenTelemetry', description: 'Telemetría, correlación, logs estructurados, métricas, cardinalidad, traces, OTLP, Collector, sampling, exemplars y SLOs.', route: '/learn/es/observabilidad-logs-metricas-tracing-opentelemetry', readingTime: '130 min de lectura', image: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageAlt: 'Plataforma de observabilidad correlacionando logs, métricas y traces de servicios distribuidos'
    },
    { chapterLabel: 'Capítulo 33', title: 'Kubernetes para APIs', description: 'Pods, workloads, Services, Gateway API, configuración, probes, autoscaling, scheduling, seguridad, observabilidad y GitOps.', route: '/learn/es/kubernetes-para-apis', readingTime: '140 min de lectura', image: '/assets/learn/kubernetes-for-apis-cover.png', imageAlt: 'Cluster Kubernetes ejecutando APIs con enrutamiento, seguridad, autoscaling y observabilidad'
    },
    { chapterLabel: 'Capítulo 34', title: 'Zero Trust aplicado a APIs', description: 'Identidad compuesta, decisión por solicitud, PDP, PEP, mTLS, prueba de posesión, policy-as-code, microsegmentación y riesgo adaptativo.', route: '/learn/es/zero-trust-aplicado-a-apis', readingTime: '135 min de lectura', image: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageAlt: 'Arquitectura Zero Trust evaluando identidad, riesgo y políticas antes de permitir acceso a APIs'
    },
    { chapterLabel: 'Capítulo 35', title: 'Open Finance y Open Banking en Brasil', description: 'Consentimiento, participantes, FAPI-BR, directorio, APIs estandarizadas, iniciación de pagos, seguridad y operación integral.', route: '/learn/es/open-finance-y-open-banking-en-brasil', readingTime: '130 min de lectura', image: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageAlt: 'Ecosistema brasileño de Open Finance conectando clientes, instituciones, consentimiento y APIs seguras'
    },
    { chapterLabel: 'Capítulo 36', title: 'LGPD aplicada a las APIs', description: 'Datos personales, principios, bases legales, minimización, derechos de los titulares, retención, privacy by design, incidentes y gobernanza.', route: '/learn/es/lgpd-aplicada-a-las-apis', readingTime: '130 min de lectura', image: '/assets/learn/lgpd-applied-to-apis-cover.png', imageAlt: 'Ciclo de vida de datos personales protegido por controles de privacidad, seguridad y gobernanza'
    },
    { chapterLabel: 'Capítulo 37', title: 'Arquitecturas bancarias de alta disponibilidad', description: 'Operaciones críticas, tolerancia a la disrupción, RTO, RPO, redundancia, consistencia, recuperación, conciliación y pruebas de resiliencia.', route: '/learn/es/arquitecturas-bancarias-de-alta-disponibilidad', readingTime: '120 min de lectura', image: '/assets/learn/high-availability-banking-architectures-cover.png', imageAlt: 'Arquitectura bancaria resiliente con redundancia y continuidad transaccional'
    },
    { chapterLabel: 'Capítulo 38', title: 'Troubleshooting de APIs y Gateways', description: 'Método científico, diagnóstico por capas, red, TLS, HTTP, policies, backends, Kubernetes, observabilidad y respuesta a incidentes.', route: '/learn/es/troubleshooting-de-apis-y-gateways', readingTime: '125 min de lectura', image: '/assets/learn/api-gateway-troubleshooting-cover.png', imageAlt: 'Diagnóstico de APIs y gateways localizando un fallo distribuido'
    },
    { chapterLabel: 'Capítulo 39', title: 'Estudio de casos reales de grandes empresas', description: 'Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub y Spotify: decisiones, trade-offs y patrones transferibles.', route: '/learn/es/estudio-de-casos-reales-de-grandes-empresas', readingTime: '105 min de lectura', image: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageAlt: 'Casos reales de arquitectura convergiendo en patrones gobernados'
    },
    { chapterLabel: 'Capítulo 40', title: 'Proyecto final: plataforma completa de APIs', description: 'Proyecto integrador con contratos, identidad, gateway, servicios, eventos, Kubernetes, observabilidad, resiliencia y criterios de aceptación.', route: '/learn/es/proyecto-final-plataforma-completa-de-apis', readingTime: '135 min de lectura', image: '/assets/learn/complete-api-platform-capstone-cover.png', imageAlt: 'Plataforma completa de APIs integrada de extremo a extremo'
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
