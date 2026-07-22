import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TblHomeComponent } from './home-tbl/home-tbl.component';
import { ARTICLE_SUMMARIES, TOOL_ARTICLES } from './articles/articles.data';
import { HOME_FAQ } from './home/home-faq.data';
import { HOME_TOOL_ITEMS } from './home/home-tools.data';

const seo = {
  home: {
    title: 'In-Depth API Learning for Developers',
    description: 'The Big Learn (TBL) — explore more, understand deeply. A free platform to learn how corporate APIs really work: networking, protocols, security, gateways and architecture, in English, Portuguese and Spanish. No sign-up, no cost.',
    keywords: 'the big learn, TBL, thebiglearn, developer learning platform, learn corporate apis, api architecture course, api security course, rest, oauth 2.0, openid connect, jwt, tls, mtls, api gateway, kubernetes for apis, zero trust',
    canonicalPath: '/',
    imageAlt: 'The Big Learn — in-depth learning platform for corporate APIs',
    searchUrlTemplate: '/tools?search={search_term_string}',
    faq: [
      { question: 'What is The Big Learn?', answer: 'The Big Learn (TBL) is a free learning platform for developers. Its core is an in-depth, multilingual track on corporate APIs — networking, security, protocols and architecture — supported by practical articles. Everything is free and runs in your browser, with no sign-up.' },
      { question: 'What does the slogan "Explore more. Understand deeply." mean?', answer: 'It is the promise of The Big Learn: keep exploring new topics, and go deep enough to truly understand how things work under the hood, not just memorise them.' },
      { question: 'Is The Big Learn free to use?', answer: 'Yes. All learning content and articles on The Big Learn are completely free, require no account and run entirely in your browser.' },
      { question: 'What can I learn on The Big Learn?', answer: 'The Learn track covers 40+ chapters on corporate APIs — from TCP/IP, HTTP and TLS to REST, OAuth 2.0, OpenID Connect, JWT, API gateways, Kubernetes and zero trust — available in English, Portuguese and Spanish.' },
      { question: 'Which languages are supported?', answer: 'The Learn track is available in English, Portuguese and Spanish, with the same 40+ chapters in each language.' }
    ]
  },
  tools: {
    title: 'Free Online Developer Tools',
    description: 'Free online developer tools in your browser: Base64, JSON, JWT and X.509 viewers, hash, UUID and password generators, QR codes, OCR and PDF tools. No sign-up needed.',
    keywords: 'free online developer tools, online tools for developers, base64 encoder decoder, url encoder decoder, json formatter online, jwt decoder, x509 certificate viewer, hash generator, uuid generator, password generator, qr code generator, pdf merger, ocr online, ipv4 cidr calculator, browser based tools',
    canonicalPath: '/tools',
    imageAlt: 'Developer tools catalogue on The Big Learn',
    searchUrlTemplate: '/tools?search={search_term_string}',
    faq: HOME_FAQ.map((item) => ({ question: item.question, answer: item.answer })),
    toolItems: HOME_TOOL_ITEMS
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
      { title: 'Digital Certificates, PKI, and X.509', path: '/learn/en/digital-certificates-pki-and-x509', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png' },
      { title: 'mTLS in Depth: Mutual Authentication for APIs', path: '/learn/en/mtls-in-depth', imagePath: '/assets/learn/mtls-in-depth-cover.png' },
      { title: 'REST: Architecture and Best Practices for APIs', path: '/learn/en/rest-architecture-and-best-practices', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png' },
      { title: 'Richardson REST Maturity Model: Complete Guide', path: '/learn/en/richardson-rest-maturity-model', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png' },
      { title: 'OpenAPI and Swagger: Contracts, Documentation, and Automation', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png' },
      { title: 'GraphQL, gRPC, and WebSocket: Complete Enterprise API Guide', path: '/learn/en/graphql-grpc-and-websocket', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png' },
      { title: 'Authentication vs. Authorization: Complete Enterprise API Guide', path: '/learn/en/authentication-vs-authorization', imagePath: '/assets/learn/authentication-authorization-cover.png' },
      { title: 'Basic Auth, Digest, and API Keys: Complete Enterprise API Guide', path: '/learn/en/basic-auth-digest-and-api-keys', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png' },
      { title: 'OAuth 2.0 in Depth: Flows, Tokens, and Enterprise API Security', path: '/learn/en/oauth-2-flows-tokens-and-security', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png' },
      { title: 'OpenID Connect: ID Tokens, Sessions, SSO, and Identity Federation', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png' },
      { title: 'JWT, JWS, JWE, and JOSE in Depth', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png' },
      { title: 'SAML 2.0 in Depth', path: '/learn/en/saml-2-in-depth', imagePath: '/assets/learn/saml-2-in-depth-cover.png' },
      { title: 'Identity Federation and Single Sign-On', path: '/learn/en/identity-federation-and-single-sign-on', imagePath: '/assets/learn/identity-federation-sso-cover.png' },
      { title: 'API Gateways: Concepts and Architecture', path: '/learn/en/api-gateways-concepts-and-architecture', imagePath: '/assets/learn/api-gateways-architecture-cover.png' },
      { title: 'Gateway Policies', path: '/learn/en/gateway-policies', imagePath: '/assets/learn/gateway-policies-cover.png' },
      { title: 'Axway API Gateway: Architecture and Operation', path: '/learn/en/axway-api-gateway-architecture-and-operation', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png' },
      { title: 'Azure API Management (APIM)', path: '/learn/en/azure-api-management-apim', imagePath: '/assets/learn/azure-api-management-apim-cover.png' },
      { title: 'API Security: OWASP API Security Top 10', path: '/learn/en/api-security-owasp-api-security-top-10', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png' },
      { title: 'CORS, CSP, HSTS, and Other HTTP Headers', path: '/learn/en/cors-csp-hsts-and-other-http-headers', imagePath: '/assets/learn/http-security-headers-cover.png' },
      { title: 'Rate Limiting, Quotas, and Throttling', path: '/learn/en/rate-limiting-quotas-and-throttling', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png' },
      { title: 'API Versioning', path: '/learn/en/api-versioning', imagePath: '/assets/learn/api-versioning-cover.png' },
      { title: 'Service Mesh (Istio, Linkerd, and Envoy)', path: '/learn/en/service-mesh-istio-linkerd-and-envoy', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png' },
      { title: 'Microservices and Integration Patterns', path: '/learn/en/microservices-and-integration-patterns', imagePath: '/assets/learn/microservices-integration-patterns-cover.png' },
      { title: 'Messaging: Kafka, RabbitMQ, AMQP, and JMS', path: '/learn/en/messaging-kafka-rabbitmq-amqp-and-jms', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png' },
      { title: 'Observability: Logs, Metrics, and Tracing with OpenTelemetry', path: '/learn/en/observability-logs-metrics-tracing-opentelemetry', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png' },
      { title: 'Kubernetes for APIs', path: '/learn/en/kubernetes-for-apis', imagePath: '/assets/learn/kubernetes-for-apis-cover.png' },
      { title: 'Zero Trust Applied to APIs', path: '/learn/en/zero-trust-applied-to-apis', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png' },
      { title: 'Open Finance and Open Banking in Brazil', path: '/learn/en/open-finance-and-open-banking-in-brazil', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png' },
      { title: 'LGPD Applied to APIs', path: '/learn/en/lgpd-applied-to-apis', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png' },
      { title: 'High-Availability Banking Architectures', path: '/learn/en/high-availability-banking-architectures', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png' },
      { title: 'API and Gateway Troubleshooting', path: '/learn/en/api-and-gateway-troubleshooting', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png' },
      { title: 'Real-World Case Studies from Large Enterprises', path: '/learn/en/real-world-case-studies-from-large-enterprises', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png' },
      { title: 'Capstone Project: Complete API Platform', path: '/learn/en/complete-api-platform-capstone-project', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png' },
      { title: 'Fundamentos de Internet, Redes y APIs', path: '/learn/es/fundamentos-internet-redes-apis', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png' },
      { title: 'TCP, UDP, Puertos y Sockets', path: '/learn/es/tcp-udp-puertos-y-sockets', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png' },
      { title: 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento', path: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', imagePath: '/assets/learn/ip-addressing-cover.png' },
      { title: 'DNS, NAT, Proxies y Balanceadores de Carga', path: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png' },
      { title: 'HTTP/1.1, HTTP/2 y HTTP/3', path: '/learn/es/http-1-1-http-2-y-http-3', imagePath: '/assets/learn/http-versions-cover.png' },
      { title: 'HTTPS y TLS en profundidad', path: '/learn/es/https-y-tls-en-profundidad', imagePath: '/assets/learn/https-tls-cover.png' },
      { title: 'Criptografía: simétrica, asimétrica, hashes y firmas digitales', path: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', imagePath: '/assets/learn/cryptography-cover.png' },
      { title: 'Certificados digitales, PKI y X.509', path: '/learn/es/certificados-digitales-pki-y-x509', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png' },
      { title: 'mTLS en profundidad: autenticación mutua para APIs', path: '/learn/es/mtls-en-profundidad', imagePath: '/assets/learn/mtls-in-depth-cover.png' },
      { title: 'REST: Arquitectura y Buenas Prácticas para APIs', path: '/learn/es/rest-arquitectura-y-buenas-practicas', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png' },
      { title: 'Modelo de Madurez REST de Richardson: Guía Completa', path: '/learn/es/modelo-de-madurez-rest-de-richardson', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png' },
      { title: 'OpenAPI y Swagger: Contratos, Documentación y Automatización', path: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png' },
      { title: 'GraphQL, gRPC y WebSocket: Guía Completa para APIs Corporativas', path: '/learn/es/graphql-grpc-y-websocket', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png' },
      { title: 'Autenticación vs. Autorización: Guía Completa para APIs Corporativas', path: '/learn/es/autenticacion-vs-autorizacion', imagePath: '/assets/learn/authentication-authorization-cover.png' },
      { title: 'Basic Auth, Digest y API Keys: Guía Completa para APIs Corporativas', path: '/learn/es/basic-auth-digest-y-api-keys', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png' },
      { title: 'OAuth 2.0 en Profundidad: Flujos, Tokens y Seguridad para APIs', path: '/learn/es/oauth-2-flujos-tokens-y-seguridad', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png' },
      { title: 'OpenID Connect: ID Tokens, Sesiones, SSO y Federación de Identidad', path: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png' },
      { title: 'JWT, JWS, JWE y JOSE en Profundidad', path: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png' },
      { title: 'SAML 2.0 en Profundidad', path: '/learn/es/saml-2-en-profundidad', imagePath: '/assets/learn/saml-2-in-depth-cover.png' },
      { title: 'Federación de Identidad y Single Sign-On', path: '/learn/es/federacion-de-identidad-y-single-sign-on', imagePath: '/assets/learn/identity-federation-sso-cover.png' },
      { title: 'API Gateways: conceptos y arquitectura', path: '/learn/es/api-gateways-conceptos-y-arquitectura', imagePath: '/assets/learn/api-gateways-architecture-cover.png' },
      { title: 'Políticas de Gateway (Policies)', path: '/learn/es/politicas-de-gateway-policies', imagePath: '/assets/learn/gateway-policies-cover.png' },
      { title: 'Axway API Gateway: arquitectura y funcionamiento', path: '/learn/es/axway-api-gateway-arquitectura-y-funcionamiento', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png' },
      { title: 'Azure API Management (APIM)', path: '/learn/es/azure-api-management-apim', imagePath: '/assets/learn/azure-api-management-apim-cover.png' },
      { title: 'Seguridad de APIs: OWASP API Security Top 10', path: '/learn/es/seguridad-apis-owasp-api-security-top-10', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png' },
      { title: 'CORS, CSP, HSTS y otros encabezados HTTP', path: '/learn/es/cors-csp-hsts-y-otros-encabezados-http', imagePath: '/assets/learn/http-security-headers-cover.png' },
      { title: 'Rate Limiting, Cuotas y Throttling', path: '/learn/es/rate-limiting-cuotas-y-throttling', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png' },
      { title: 'API Versioning', path: '/learn/es/api-versioning', imagePath: '/assets/learn/api-versioning-cover.png' },
      { title: 'Service Mesh (Istio, Linkerd y Envoy)', path: '/learn/es/service-mesh-istio-linkerd-y-envoy', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png' },
      { title: 'Microservicios y patrones de integración', path: '/learn/es/microservicios-y-patrones-de-integracion', imagePath: '/assets/learn/microservices-integration-patterns-cover.png' },
      { title: 'Mensajería: Kafka, RabbitMQ, AMQP y JMS', path: '/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png' },
      { title: 'Observabilidad: Logs, Métricas y Tracing con OpenTelemetry', path: '/learn/es/observabilidad-logs-metricas-tracing-opentelemetry', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png' },
      { title: 'Kubernetes para APIs', path: '/learn/es/kubernetes-para-apis', imagePath: '/assets/learn/kubernetes-for-apis-cover.png' },
      { title: 'Zero Trust aplicado a APIs', path: '/learn/es/zero-trust-aplicado-a-apis', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png' },
      { title: 'Open Finance y Open Banking en Brasil', path: '/learn/es/open-finance-y-open-banking-en-brasil', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png' },
      { title: 'LGPD aplicada a las APIs', path: '/learn/es/lgpd-aplicada-a-las-apis', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png' },
      { title: 'Arquitecturas bancarias de alta disponibilidad', path: '/learn/es/arquitecturas-bancarias-de-alta-disponibilidad', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png' },
      { title: 'Troubleshooting de APIs y Gateways', path: '/learn/es/troubleshooting-de-apis-y-gateways', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png' },
      { title: 'Estudio de casos reales de grandes empresas', path: '/learn/es/estudio-de-casos-reales-de-grandes-empresas', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png' },
      { title: 'Proyecto final: plataforma completa de APIs', path: '/learn/es/proyecto-final-plataforma-completa-de-apis', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png' },
      { title: 'Fundamentos da Internet, Redes e APIs', path: '/learn/pt/fundamentos-da-internet-redes-e-apis', imagePath: '/assets/learn/fundamentos-internet-redes-apis-cover.png' },
      { title: 'TCP, UDP, Portas e Sockets', path: '/learn/pt/tcp-udp-portas-e-sockets', imagePath: '/assets/learn/tcp-udp-portas-sockets-cover.png' },
      { title: 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento', path: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', imagePath: '/assets/learn/ip-addressing-cover.png' },
      { title: 'DNS, NAT, Proxies e Balanceadores de Carga', path: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga', imagePath: '/assets/learn/dns-nat-proxies-load-balancers-cover.png' },
      { title: 'HTTP/1.1, HTTP/2 e HTTP/3', path: '/learn/pt/http-1-1-http-2-e-http-3', imagePath: '/assets/learn/http-versions-cover.png' },
      { title: 'HTTPS e TLS em profundidade', path: '/learn/pt/https-e-tls-em-profundidade', imagePath: '/assets/learn/https-tls-cover.png' },
      { title: 'Criptografia: simétrica, assimétrica, hashes e assinaturas digitais', path: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', imagePath: '/assets/learn/cryptography-cover.png' },
      { title: 'Certificados digitais, PKI e X.509', path: '/learn/pt/certificados-digitais-pki-e-x509', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png' },
      { title: 'mTLS em profundidade: autenticação mútua para APIs', path: '/learn/pt/mtls-em-profundidade', imagePath: '/assets/learn/mtls-in-depth-cover.png' },
      { title: 'REST: Arquitetura e Boas Práticas para APIs', path: '/learn/pt/rest-arquitetura-e-boas-praticas', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png' },
      { title: 'Modelo de Maturidade REST de Richardson: Guia Completo', path: '/learn/pt/modelo-de-maturidade-rest-de-richardson', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png' },
      { title: 'OpenAPI e Swagger: Contratos, Documentação e Automação', path: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png' },
      { title: 'GraphQL, gRPC e WebSocket: Guia Completo para APIs Corporativas', path: '/learn/pt/graphql-grpc-e-websocket', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png' },
      { title: 'Autenticação x Autorização: Guia Completo para APIs Corporativas', path: '/learn/pt/autenticacao-x-autorizacao', imagePath: '/assets/learn/authentication-authorization-cover.png' },
      { title: 'Basic Auth, Digest e API Keys: Guia Completo para APIs Corporativas', path: '/learn/pt/basic-auth-digest-e-api-keys', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png' },
      { title: 'OAuth 2.0 em Profundidade: Fluxos, Tokens e Segurança para APIs', path: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png' },
      { title: 'OpenID Connect (OIDC): ID Tokens, Sessões e Federação de Identidade', path: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png' },
      { title: 'JWT, JWS, JWE e JOSE em Profundidade', path: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png' },
      { title: 'SAML 2.0 em Profundidade', path: '/learn/pt/saml-2-em-profundidade', imagePath: '/assets/learn/saml-2-in-depth-cover.png' },
      { title: 'Identity Federation e Single Sign-On', path: '/learn/pt/identity-federation-e-single-sign-on', imagePath: '/assets/learn/identity-federation-sso-cover.png' },
      { title: 'API Gateways: conceitos e arquitetura', path: '/learn/pt/api-gateways-conceitos-e-arquitetura', imagePath: '/assets/learn/api-gateways-architecture-cover.png' },
      { title: 'Políticas de Gateway (Policies)', path: '/learn/pt/politicas-de-gateway-policies', imagePath: '/assets/learn/gateway-policies-cover.png' },
      { title: 'Axway API Gateway: arquitetura e funcionamento', path: '/learn/pt/axway-api-gateway-arquitetura-e-funcionamento', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png' },
      { title: 'Azure API Management (APIM)', path: '/learn/pt/azure-api-management-apim', imagePath: '/assets/learn/azure-api-management-apim-cover.png' },
      { title: 'Segurança de APIs: OWASP API Security Top 10', path: '/learn/pt/seguranca-apis-owasp-api-security-top-10', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png' },
      { title: 'CORS, CSP, HSTS e outros cabeçalhos HTTP', path: '/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http', imagePath: '/assets/learn/http-security-headers-cover.png' }
      ,{ title: 'Rate Limiting, Quotas e Throttling', path: '/learn/pt/rate-limiting-quotas-e-throttling', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png' }
      ,{ title: 'API Versioning', path: '/learn/pt/api-versioning', imagePath: '/assets/learn/api-versioning-cover.png' }
      ,{ title: 'Service Mesh (Istio, Linkerd e Envoy)', path: '/learn/pt/service-mesh-istio-linkerd-e-envoy', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png' }
      ,{ title: 'Microserviços e padrões de integração', path: '/learn/pt/microservicos-e-padroes-de-integracao', imagePath: '/assets/learn/microservices-integration-patterns-cover.png' }
      ,{ title: 'Mensageria: Kafka, RabbitMQ, AMQP e JMS', path: '/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png' }
      ,{ title: 'Observabilidade: Logs, Métricas e Tracing com OpenTelemetry', path: '/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png' }
      ,{ title: 'Kubernetes para APIs', path: '/learn/pt/kubernetes-para-apis', imagePath: '/assets/learn/kubernetes-for-apis-cover.png' }
      ,{ title: 'Zero Trust aplicado a APIs', path: '/learn/pt/zero-trust-aplicado-a-apis', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png' }
      ,{ title: 'Open Finance e Open Banking no Brasil', path: '/learn/pt/open-finance-e-open-banking-no-brasil', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png' }
      ,{ title: 'LGPD aplicada às APIs', path: '/learn/pt/lgpd-aplicada-as-apis', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png' }
      ,{ title: 'Arquiteturas bancárias de alta disponibilidade', path: '/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png' }
      ,{ title: 'Troubleshooting de APIs e Gateways', path: '/learn/pt/troubleshooting-de-apis-e-gateways', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png' }
      ,{ title: 'Estudo de casos reais de grandes empresas', path: '/learn/pt/estudo-de-casos-reais-de-grandes-empresas', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png' }
      ,{ title: 'Projeto final: plataforma completa de APIs', path: '/learn/pt/projeto-final-plataforma-completa-de-apis', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png' }
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
    description: 'Aprenda HTTPS e TLS em profundidade: criptografia, handshake TLS 1.2 e 1.3, certificados X.509, cadeia de confiança, SNI, ALPN, mTLS e HSTS.',
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
    description: 'Aprende HTTPS y TLS en profundidad: criptografía, handshakes TLS 1.2 y 1.3, certificados X.509, cadena de confianza, SNI, ALPN, mTLS y HSTS.',
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
    description: 'Aprenda criptografia aplicada a APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, curvas elípticas, assinaturas digitais, KMS, HSM e criptografia pós-quântica.',
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
    description: 'Learn cryptography for APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, elliptic curves, digital signatures, KMS, HSM, and post-quantum cryptography.',
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
    description: 'Aprende criptografía aplicada a APIs: AES, ChaCha20, AEAD, hashes, HMAC, KDFs, RSA, curvas elípticas, firmas digitales, KMS, HSM y criptografía poscuántica.',
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
  learnCertificatesPortuguese: {
    title: 'Certificados digitais, PKI e X.509',
    description: 'Aprenda certificados digitais e PKI em profundidade: X.509, CA raiz e intermediária, SAN, EKU, cadeia de confiança, CSR, CRL, OCSP, HSM, mTLS e API Gateways.',
    keywords: 'certificados digitais, PKI, X.509, autoridade certificadora, CA raiz, CA intermediária, SAN, EKU, CSR, CRL, OCSP, HSM, mTLS, API Gateway, OpenSSL',
    canonicalPath: '/learn/pt/certificados-digitais-pki-e-x509',
    pageType: 'article', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Cadeia de confiança PKI conectando uma CA raiz, certificados, HSM, API Gateway e servidores',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Certificados digitais', 'PKI', 'X.509', 'CA', 'SAN', 'CSR', 'CRL', 'OCSP', 'HSM', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/certificados-digitais-pki-e-x509', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/digital-certificates-pki-and-x509', locale: 'en_US' },
      { language: 'es', path: '/learn/es/certificados-digitales-pki-y-x509', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/digital-certificates-pki-and-x509' }
    ]
  },
  learnCertificatesEnglish: {
    title: 'Digital Certificates, PKI, and X.509',
    description: 'Learn digital certificates and PKI in depth: X.509, root and intermediate CAs, SAN, EKU, trust chains, CSR, CRL, OCSP, HSM, mTLS, and API Gateways.',
    keywords: 'digital certificates, PKI, X.509, certificate authority, root CA, intermediate CA, SAN, EKU, CSR, CRL, OCSP, HSM, mTLS, API Gateway, OpenSSL',
    canonicalPath: '/learn/en/digital-certificates-pki-and-x509',
    pageType: 'article', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'PKI trust chain connecting a root CA, certificates, an HSM, an API Gateway, and servers',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Digital certificates', 'PKI', 'X.509', 'CA', 'SAN', 'CSR', 'CRL', 'OCSP', 'HSM', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/certificados-digitais-pki-e-x509', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/digital-certificates-pki-and-x509', locale: 'en_US' },
      { language: 'es', path: '/learn/es/certificados-digitales-pki-y-x509', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/digital-certificates-pki-and-x509' }
    ]
  },
  learnCertificatesSpanish: {
    title: 'Certificados digitales, PKI y X.509',
    description: 'Aprende certificados digitales y PKI en profundidad: X.509, CA raíz e intermedia, SAN, EKU, cadena de confianza, CSR, CRL, OCSP, HSM, mTLS y API Gateways.',
    keywords: 'certificados digitales, PKI, X.509, autoridad certificadora, CA raíz, CA intermedia, SAN, EKU, CSR, CRL, OCSP, HSM, mTLS, API Gateway, OpenSSL',
    canonicalPath: '/learn/es/certificados-digitales-pki-y-x509',
    pageType: 'article', imagePath: '/assets/learn/digital-certificates-pki-x509-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Cadena de confianza PKI que conecta una CA raíz, certificados, un HSM, un API Gateway y servidores',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Certificados digitales', 'PKI', 'X.509', 'CA', 'SAN', 'CSR', 'CRL', 'OCSP', 'HSM', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/certificados-digitais-pki-e-x509', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/digital-certificates-pki-and-x509', locale: 'en_US' },
      { language: 'es', path: '/learn/es/certificados-digitales-pki-y-x509', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/digital-certificates-pki-and-x509' }
    ]
  },
  learnMtlsPortuguese: {
    title: 'mTLS em profundidade: autenticação mútua para APIs',
    description: 'Aprenda mTLS em profundidade: handshake TLS 1.3, certificados de cliente, truststores, identidade, autorização, API Gateways, service mesh e troubleshooting.',
    keywords: 'mTLS, mutual TLS, autenticação mútua, certificado de cliente, TLS 1.3, CertificateRequest, CertificateVerify, truststore, API Gateway, service mesh, OAuth mTLS, certificate-bound token, OpenSSL',
    canonicalPath: '/learn/pt/mtls-em-profundidade',
    pageType: 'article', imagePath: '/assets/learn/mtls-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Cliente e servidor apresentam certificados e validam mutuamente suas identidades em uma arquitetura de API corporativa',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['mTLS', 'Mutual TLS', 'TLS 1.3', 'Certificado de cliente', 'Truststore', 'API Gateway', 'Service mesh', 'OAuth', 'Certificate-bound token', 'OpenSSL'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/mtls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/mtls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/mtls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/mtls-in-depth' }
    ]
  },
  learnMtlsEnglish: {
    title: 'mTLS in Depth: Mutual Authentication for APIs',
    description: 'Learn mTLS in depth: TLS 1.3 handshakes, client certificates, truststores, identity, authorization, API Gateways, service meshes, and troubleshooting.',
    keywords: 'mTLS, mutual TLS, mutual authentication, client certificate, TLS 1.3, CertificateRequest, CertificateVerify, truststore, API Gateway, service mesh, OAuth mTLS, certificate-bound token, OpenSSL',
    canonicalPath: '/learn/en/mtls-in-depth',
    pageType: 'article', imagePath: '/assets/learn/mtls-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Client and server present certificates and mutually validate their identities in an enterprise API architecture',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['mTLS', 'Mutual TLS', 'TLS 1.3', 'Client certificate', 'Truststore', 'API Gateway', 'Service mesh', 'OAuth', 'Certificate-bound token', 'OpenSSL'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/mtls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/mtls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/mtls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/mtls-in-depth' }
    ]
  },
  learnMtlsSpanish: {
    title: 'mTLS en profundidad: autenticación mutua para APIs',
    description: 'Aprende mTLS en profundidad: handshake TLS 1.3, certificados de cliente, truststores, identidad, autorización, API Gateways, service mesh y troubleshooting.',
    keywords: 'mTLS, mutual TLS, autenticación mutua, certificado de cliente, TLS 1.3, CertificateRequest, CertificateVerify, truststore, API Gateway, service mesh, OAuth mTLS, token certificate-bound, OpenSSL',
    canonicalPath: '/learn/es/mtls-en-profundidad',
    pageType: 'article', imagePath: '/assets/learn/mtls-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Cliente y servidor presentan certificados y validan mutuamente sus identidades en una arquitectura de API empresarial',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['mTLS', 'Mutual TLS', 'TLS 1.3', 'Certificado de cliente', 'Truststore', 'API Gateway', 'Service mesh', 'OAuth', 'Token certificate-bound', 'OpenSSL'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/mtls-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/mtls-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/mtls-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/mtls-in-depth' }
    ]
  },
  learnRestPortuguese: {
    title: 'REST: Arquitetura e Boas Práticas para APIs',
    description: 'Aprenda REST em profundidade: restrições arquiteturais, recursos, URIs, métodos HTTP, idempotência, cache, ETag, paginação, Problem Details e OpenAPI.',
    keywords: 'REST, arquitetura REST, API REST, boas práticas APIs, recursos REST, URI, métodos HTTP, idempotência, cache HTTP, ETag, paginação, Problem Details, OpenAPI, API Gateway',
    canonicalPath: '/learn/pt/rest-arquitetura-e-boas-praticas',
    pageType: 'article', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Ecossistema REST corporativo com recurso central, clientes, API Gateway, representações, cache e persistência',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['REST', 'Arquitetura REST', 'API REST', 'HTTP', 'Idempotência', 'Cache', 'ETag', 'Problem Details', 'OpenAPI', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/rest-arquitetura-e-boas-praticas', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/rest-architecture-and-best-practices', locale: 'en_US' },
      { language: 'es', path: '/learn/es/rest-arquitectura-y-buenas-practicas', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/rest-architecture-and-best-practices' }
    ]
  },
  learnRestEnglish: {
    title: 'REST: Architecture and Best Practices for APIs',
    description: 'Learn REST in depth: architectural constraints, resources, URIs, HTTP methods, idempotency, caching, ETags, pagination, Problem Details, and OpenAPI.',
    keywords: 'REST, REST architecture, REST API, API best practices, REST resources, URI, HTTP methods, idempotency, HTTP cache, ETag, pagination, Problem Details, OpenAPI, API Gateway',
    canonicalPath: '/learn/en/rest-architecture-and-best-practices',
    pageType: 'article', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Enterprise REST ecosystem with a central resource, clients, API Gateway, representations, cache, and persistence',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['REST', 'REST Architecture', 'REST API', 'HTTP', 'Idempotency', 'Caching', 'ETag', 'Problem Details', 'OpenAPI', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/rest-arquitetura-e-boas-praticas', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/rest-architecture-and-best-practices', locale: 'en_US' },
      { language: 'es', path: '/learn/es/rest-arquitectura-y-buenas-practicas', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/rest-architecture-and-best-practices' }
    ]
  },
  learnRestSpanish: {
    title: 'REST: Arquitectura y Buenas Prácticas para APIs',
    description: 'Aprende REST en profundidad: restricciones arquitectónicas, recursos, URIs, métodos HTTP, idempotencia, cache, ETag, paginación, Problem Details y OpenAPI.',
    keywords: 'REST, arquitectura REST, API REST, buenas prácticas APIs, recursos REST, URI, métodos HTTP, idempotencia, cache HTTP, ETag, paginación, Problem Details, OpenAPI, API Gateway',
    canonicalPath: '/learn/es/rest-arquitectura-y-buenas-practicas',
    pageType: 'article', imagePath: '/assets/learn/rest-architecture-best-practices-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Ecosistema REST corporativo con recurso central, clientes, API Gateway, representaciones, cache y persistencia',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['REST', 'Arquitectura REST', 'API REST', 'HTTP', 'Idempotencia', 'Cache', 'ETag', 'Problem Details', 'OpenAPI', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/rest-arquitetura-e-boas-praticas', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/rest-architecture-and-best-practices', locale: 'en_US' },
      { language: 'es', path: '/learn/es/rest-arquitectura-y-buenas-practicas', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/rest-architecture-and-best-practices' }
    ]
  },
  learnRichardsonPortuguese: {
    title: 'Modelo de Maturidade REST de Richardson: Guia Completo',
    description: 'Aprenda o Richardson Maturity Model em profundidade: níveis 0 a 3, recursos, semântica HTTP, hipermídia, HATEOAS, OpenAPI, API Gateways, governança e migração.',
    keywords: 'Richardson Maturity Model, modelo de maturidade REST, níveis REST, nível 0 POX, nível 1 recursos, nível 2 HTTP, nível 3 hipermídia, HATEOAS, API Gateway, OpenAPI',
    canonicalPath: '/learn/pt/modelo-de-maturidade-rest-de-richardson',
    pageType: 'article', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Evolução em quatro estágios do modelo de maturidade REST de Richardson, do endpoint único à hipermídia',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Richardson Maturity Model', 'REST', 'HTTP', 'Hipermídia', 'HATEOAS', 'OpenAPI', 'API Gateway', 'Governança de APIs'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/modelo-de-maturidade-rest-de-richardson', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/richardson-rest-maturity-model', locale: 'en_US' },
      { language: 'es', path: '/learn/es/modelo-de-madurez-rest-de-richardson', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/richardson-rest-maturity-model' }
    ]
  },
  learnRichardsonEnglish: {
    title: 'Richardson REST Maturity Model: Complete Guide',
    description: 'Learn the Richardson Maturity Model in depth: levels 0 through 3, resources, HTTP semantics, hypermedia, HATEOAS, OpenAPI, API Gateways, governance, and migration.',
    keywords: 'Richardson Maturity Model, REST maturity model, REST levels, level 0 POX, level 1 resources, level 2 HTTP, level 3 hypermedia, HATEOAS, API Gateway, OpenAPI',
    canonicalPath: '/learn/en/richardson-rest-maturity-model',
    pageType: 'article', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Four-stage evolution of the Richardson REST Maturity Model, from a single endpoint to hypermedia',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Richardson Maturity Model', 'REST', 'HTTP', 'Hypermedia', 'HATEOAS', 'OpenAPI', 'API Gateway', 'API Governance'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/modelo-de-maturidade-rest-de-richardson', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/richardson-rest-maturity-model', locale: 'en_US' },
      { language: 'es', path: '/learn/es/modelo-de-madurez-rest-de-richardson', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/richardson-rest-maturity-model' }
    ]
  },
  learnRichardsonSpanish: {
    title: 'Modelo de Madurez REST de Richardson: Guía Completa',
    description: 'Aprende el Richardson Maturity Model en profundidad: niveles 0 a 3, recursos, semántica HTTP, hipermedia, HATEOAS, OpenAPI, API Gateways, gobernanza y migración.',
    keywords: 'Richardson Maturity Model, modelo de madurez REST, niveles REST, nivel 0 POX, nivel 1 recursos, nivel 2 HTTP, nivel 3 hipermedia, HATEOAS, API Gateway, OpenAPI',
    canonicalPath: '/learn/es/modelo-de-madurez-rest-de-richardson',
    pageType: 'article', imagePath: '/assets/learn/richardson-rest-maturity-model-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Evolución en cuatro etapas del modelo de madurez REST de Richardson, desde un endpoint único hasta la hipermedia',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Richardson Maturity Model', 'REST', 'HTTP', 'Hipermedia', 'HATEOAS', 'OpenAPI', 'API Gateway', 'Gobernanza de APIs'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/modelo-de-maturidade-rest-de-richardson', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/richardson-rest-maturity-model', locale: 'en_US' },
      { language: 'es', path: '/learn/es/modelo-de-madurez-rest-de-richardson', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/richardson-rest-maturity-model' }
    ]
  },
  learnOpenApiPortuguese: {
    title: 'OpenAPI e Swagger: Contratos, Documentação e Automação',
    description: 'Aprenda OpenAPI e Swagger em profundidade: contratos de API, OAS 3, YAML, JSON Schema, segurança, linting, semantic diff, mocks, SDKs, portais e API Gateways.',
    keywords: 'OpenAPI, Swagger, contrato de API, OAS 3, YAML, JSON Schema, documentação de API, linting, semantic diff, mock server, geração de SDK, API Gateway',
    canonicalPath: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao',
    pageType: 'article', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Contrato OpenAPI conectando design, validação, documentação, automação, API Gateway e runtime',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['OpenAPI', 'Swagger', 'Contratos de API', 'OAS 3', 'YAML', 'JSON Schema', 'Linting', 'Semantic Diff', 'SDK', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation' }
    ]
  },
  learnOpenApiEnglish: {
    title: 'OpenAPI and Swagger: Contracts, Documentation, and Automation',
    description: 'Learn OpenAPI and Swagger in depth: API contracts, OAS 3, YAML, JSON Schema, security, linting, semantic diff, mocks, SDKs, portals, and API Gateways.',
    keywords: 'OpenAPI, Swagger, API contract, OAS 3, YAML, JSON Schema, API documentation, linting, semantic diff, mock server, SDK generation, API Gateway',
    canonicalPath: '/learn/en/openapi-swagger-contracts-documentation-and-automation',
    pageType: 'article', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'OpenAPI contract connecting design, validation, documentation, automation, API Gateway, and runtime',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['OpenAPI', 'Swagger', 'API Contracts', 'OAS 3', 'YAML', 'JSON Schema', 'Linting', 'Semantic Diff', 'SDK', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation' }
    ]
  },
  learnOpenApiSpanish: {
    title: 'OpenAPI y Swagger: Contratos, Documentación y Automatización',
    description: 'Aprende OpenAPI y Swagger en profundidad: contratos de API, OAS 3, YAML, JSON Schema, seguridad, linting, semantic diff, mocks, SDKs, portales y API Gateways.',
    keywords: 'OpenAPI, Swagger, contrato de API, OAS 3, YAML, JSON Schema, documentación de API, linting, semantic diff, mock server, generación de SDK, API Gateway',
    canonicalPath: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion',
    pageType: 'article', imagePath: '/assets/learn/openapi-swagger-contracts-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Contrato OpenAPI que conecta diseño, validación, documentación, automatización, API Gateway y runtime',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['OpenAPI', 'Swagger', 'Contratos de API', 'OAS 3', 'YAML', 'JSON Schema', 'Linting', 'Semantic Diff', 'SDK', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openapi-swagger-contracts-documentation-and-automation' }
    ]
  },
  learnGraphqlGrpcWebsocketPortuguese: {
    title: 'GraphQL, gRPC e WebSocket: Guia Completo para APIs Corporativas',
    description: 'Aprenda GraphQL, gRPC e WebSocket em profundidade: schemas, resolvers, N+1, Protobuf, streaming, deadlines, conexões persistentes, segurança e arquitetura.',
    keywords: 'GraphQL, gRPC, WebSocket, APIs corporativas, schema GraphQL, resolvers, N+1, Protocol Buffers, Protobuf, streaming, HTTP/2, real time APIs',
    canonicalPath: '/learn/pt/graphql-grpc-e-websocket',
    pageType: 'article', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'GraphQL, gRPC e WebSocket conectados em uma arquitetura corporativa moderna',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['GraphQL', 'gRPC', 'WebSocket', 'Protocol Buffers', 'Streaming', 'HTTP/2', 'APIs em tempo real', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/graphql-grpc-e-websocket', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/graphql-grpc-and-websocket', locale: 'en_US' },
      { language: 'es', path: '/learn/es/graphql-grpc-y-websocket', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/graphql-grpc-and-websocket' }
    ]
  },
  learnGraphqlGrpcWebsocketEnglish: {
    title: 'GraphQL, gRPC, and WebSocket: Complete Enterprise API Guide',
    description: 'Learn GraphQL, gRPC, and WebSocket in depth: schemas, resolvers, N+1, Protobuf, streaming, deadlines, persistent connections, security, and architecture.',
    keywords: 'GraphQL, gRPC, WebSocket, enterprise APIs, GraphQL schema, resolvers, N+1, Protocol Buffers, Protobuf, streaming, HTTP/2, real-time APIs',
    canonicalPath: '/learn/en/graphql-grpc-and-websocket',
    pageType: 'article', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'GraphQL, gRPC, and WebSocket connected in a modern enterprise architecture',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['GraphQL', 'gRPC', 'WebSocket', 'Protocol Buffers', 'Streaming', 'HTTP/2', 'Real-time APIs', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/graphql-grpc-e-websocket', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/graphql-grpc-and-websocket', locale: 'en_US' },
      { language: 'es', path: '/learn/es/graphql-grpc-y-websocket', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/graphql-grpc-and-websocket' }
    ]
  },
  learnGraphqlGrpcWebsocketSpanish: {
    title: 'GraphQL, gRPC y WebSocket: Guía Completa para APIs Corporativas',
    description: 'Aprende GraphQL, gRPC y WebSocket en profundidad: schemas, resolvers, N+1, Protobuf, streaming, deadlines, conexiones persistentes, seguridad y arquitectura.',
    keywords: 'GraphQL, gRPC, WebSocket, APIs corporativas, schema GraphQL, resolvers, N+1, Protocol Buffers, Protobuf, streaming, HTTP/2, APIs en tiempo real',
    canonicalPath: '/learn/es/graphql-grpc-y-websocket',
    pageType: 'article', imagePath: '/assets/learn/graphql-grpc-websocket-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'GraphQL, gRPC y WebSocket conectados en una arquitectura corporativa moderna',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['GraphQL', 'gRPC', 'WebSocket', 'Protocol Buffers', 'Streaming', 'HTTP/2', 'APIs en tiempo real', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/graphql-grpc-e-websocket', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/graphql-grpc-and-websocket', locale: 'en_US' },
      { language: 'es', path: '/learn/es/graphql-grpc-y-websocket', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/graphql-grpc-and-websocket' }
    ]
  },
  learnAuthenticationAuthorizationPortuguese: {
    title: 'Autenticação x Autorização: Guia Completo para APIs Corporativas',
    description: 'Aprenda autenticação e autorização em profundidade: identidade, credenciais, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC e workload identity.',
    keywords: 'autenticação, autorização, AuthN, AuthZ, identidade, credenciais, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC, PBAC, PEP, PDP, workload identity, API Gateway, 401, 403',
    canonicalPath: '/learn/pt/autenticacao-x-autorizacao',
    pageType: 'article', imagePath: '/assets/learn/authentication-authorization-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Fluxo corporativo que separa a prova de identidade da decisão de acesso a APIs protegidas',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Autenticação', 'Autorização', 'Identidade', 'JWT', 'OAuth 2.0', 'OpenID Connect', 'RBAC', 'ABAC', 'PEP', 'PDP', 'Workload identity', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/autenticacao-x-autorizacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/authentication-vs-authorization', locale: 'en_US' },
      { language: 'es', path: '/learn/es/autenticacion-vs-autorizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/authentication-vs-authorization' }
    ]
  },
  learnAuthenticationAuthorizationEnglish: {
    title: 'Authentication vs. Authorization: Complete Enterprise API Guide',
    description: 'Learn authentication and authorization in depth: identity, credentials, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC, and workload identity.',
    keywords: 'authentication, authorization, AuthN, AuthZ, identity, credentials, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC, PBAC, PEP, PDP, workload identity, API Gateway, 401, 403',
    canonicalPath: '/learn/en/authentication-vs-authorization',
    pageType: 'article', imagePath: '/assets/learn/authentication-authorization-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Enterprise flow separating identity proof from access decisions for protected APIs',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Authentication', 'Authorization', 'Identity', 'JWT', 'OAuth 2.0', 'OpenID Connect', 'RBAC', 'ABAC', 'PEP', 'PDP', 'Workload identity', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/autenticacao-x-autorizacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/authentication-vs-authorization', locale: 'en_US' },
      { language: 'es', path: '/learn/es/autenticacion-vs-autorizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/authentication-vs-authorization' }
    ]
  },
  learnAuthenticationAuthorizationSpanish: {
    title: 'Autenticación vs. Autorización: Guía Completa para APIs Corporativas',
    description: 'Aprende autenticación y autorización en profundidad: identidad, credenciales, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC y workload identity.',
    keywords: 'autenticación, autorización, AuthN, AuthZ, identidad, credenciales, JWT, OAuth 2.0, OpenID Connect, RBAC, ABAC, ReBAC, PBAC, PEP, PDP, workload identity, API Gateway, 401, 403',
    canonicalPath: '/learn/es/autenticacion-vs-autorizacion',
    pageType: 'article', imagePath: '/assets/learn/authentication-authorization-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Flujo corporativo que separa la prueba de identidad de la decisión de acceso a APIs protegidas',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Autenticación', 'Autorización', 'Identidad', 'JWT', 'OAuth 2.0', 'OpenID Connect', 'RBAC', 'ABAC', 'PEP', 'PDP', 'Workload identity', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/autenticacao-x-autorizacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/authentication-vs-authorization', locale: 'en_US' },
      { language: 'es', path: '/learn/es/autenticacion-vs-autorizacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/authentication-vs-authorization' }
    ]
  },
  learnBasicAuthDigestApiKeysPortuguese: {
    title: 'Basic Auth, Digest e API Keys: Guia Completo para APIs Corporativas',
    description: 'Aprenda Basic Auth, HTTP Digest e API Keys em profundidade: desafios HTTP, Base64, TLS, nonce, replay, escopos, quotas, rotação, revogação e HMAC.',
    keywords: 'Basic Auth, HTTP Digest, API Keys, autenticação HTTP, WWW-Authenticate, Authorization, Base64, TLS, nonce, replay, HMAC, API Gateway, rotação de chaves, segurança de APIs',
    canonicalPath: '/learn/pt/basic-auth-digest-e-api-keys',
    pageType: 'article', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Basic Auth, Digest e API Keys convergindo para um gateway corporativo protegido',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Basic Auth', 'HTTP Digest', 'API Keys', 'Autenticação HTTP', 'Base64', 'TLS', 'Nonce', 'Replay', 'HMAC', 'API Gateway', 'Rotação de chaves'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/basic-auth-digest-e-api-keys', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/basic-auth-digest-and-api-keys', locale: 'en_US' },
      { language: 'es', path: '/learn/es/basic-auth-digest-y-api-keys', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/basic-auth-digest-and-api-keys' }
    ]
  },
  learnBasicAuthDigestApiKeysEnglish: {
    title: 'Basic Auth, Digest, and API Keys: Complete Enterprise API Guide',
    description: 'Learn Basic Auth, HTTP Digest, and API keys in depth: HTTP challenges, Base64, TLS, nonce, replay, scopes, quotas, rotation, revocation, and HMAC.',
    keywords: 'Basic Auth, HTTP Digest, API keys, HTTP authentication, WWW-Authenticate, Authorization, Base64, TLS, nonce, replay, HMAC, API Gateway, key rotation, API security',
    canonicalPath: '/learn/en/basic-auth-digest-and-api-keys',
    pageType: 'article', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Basic Auth, Digest, and API keys converging on a protected enterprise gateway',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Basic Auth', 'HTTP Digest', 'API Keys', 'HTTP Authentication', 'Base64', 'TLS', 'Nonce', 'Replay', 'HMAC', 'API Gateway', 'Key rotation'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/basic-auth-digest-e-api-keys', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/basic-auth-digest-and-api-keys', locale: 'en_US' },
      { language: 'es', path: '/learn/es/basic-auth-digest-y-api-keys', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/basic-auth-digest-and-api-keys' }
    ]
  },
  learnBasicAuthDigestApiKeysSpanish: {
    title: 'Basic Auth, Digest y API Keys: Guía Completa para APIs Corporativas',
    description: 'Aprende Basic Auth, HTTP Digest y API Keys en profundidad: desafíos HTTP, Base64, TLS, nonce, replay, scopes, quotas, rotación, revocación y HMAC.',
    keywords: 'Basic Auth, HTTP Digest, API Keys, autenticación HTTP, WWW-Authenticate, Authorization, Base64, TLS, nonce, replay, HMAC, API Gateway, rotación de claves, seguridad de APIs',
    canonicalPath: '/learn/es/basic-auth-digest-y-api-keys',
    pageType: 'article', imagePath: '/assets/learn/basic-auth-digest-api-keys-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Basic Auth, Digest y API Keys convergiendo en un gateway corporativo protegido',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Basic Auth', 'HTTP Digest', 'API Keys', 'Autenticación HTTP', 'Base64', 'TLS', 'Nonce', 'Replay', 'HMAC', 'API Gateway', 'Rotación de claves'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/basic-auth-digest-e-api-keys', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/basic-auth-digest-and-api-keys', locale: 'en_US' },
      { language: 'es', path: '/learn/es/basic-auth-digest-y-api-keys', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/basic-auth-digest-and-api-keys' }
    ]
  },
  learnOAuth2Portuguese: {
    title: 'OAuth 2.0 em Profundidade: Fluxos, Tokens e Segurança para APIs',
    description: 'Aprenda OAuth 2.0 em profundidade: Authorization Code com PKCE, Client Credentials, refresh tokens, JWT, introspecção, revogação, DPoP e mTLS.',
    keywords: 'OAuth 2.0, Authorization Code, PKCE, Client Credentials, refresh token, access token, JWT, introspecção, revogação, PAR, JAR, JARM, RAR, DPoP, mTLS, API Gateway, segurança de APIs',
    canonicalPath: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca',
    pageType: 'article', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Fluxos OAuth 2.0 protegidos por PKCE, tokens e controles modernos de segurança',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['OAuth 2.0', 'Authorization Code', 'PKCE', 'Client Credentials', 'Refresh tokens', 'JWT', 'Introspection', 'Revocation', 'PAR', 'JAR', 'JARM', 'DPoP', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/oauth-2-flows-tokens-and-security', locale: 'en_US' },
      { language: 'es', path: '/learn/es/oauth-2-flujos-tokens-y-seguridad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/oauth-2-flows-tokens-and-security' }
    ]
  },
  learnOAuth2English: {
    title: 'OAuth 2.0 in Depth: Flows, Tokens, and Enterprise API Security',
    description: 'Learn OAuth 2.0 in depth: Authorization Code with PKCE, Client Credentials, refresh tokens, JWT access tokens, introspection, revocation, DPoP, and mTLS.',
    keywords: 'OAuth 2.0, Authorization Code, PKCE, Client Credentials, refresh token, access token, JWT, introspection, revocation, PAR, JAR, JARM, RAR, DPoP, mTLS, API Gateway, API security',
    canonicalPath: '/learn/en/oauth-2-flows-tokens-and-security',
    pageType: 'article', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'OAuth 2.0 flows protected by PKCE, tokens, and modern security controls',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['OAuth 2.0', 'Authorization Code', 'PKCE', 'Client Credentials', 'Refresh tokens', 'JWT', 'Introspection', 'Revocation', 'PAR', 'JAR', 'JARM', 'DPoP', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/oauth-2-flows-tokens-and-security', locale: 'en_US' },
      { language: 'es', path: '/learn/es/oauth-2-flujos-tokens-y-seguridad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/oauth-2-flows-tokens-and-security' }
    ]
  },
  learnOAuth2Spanish: {
    title: 'OAuth 2.0 en Profundidad: Flujos, Tokens y Seguridad para APIs',
    description: 'Aprende OAuth 2.0 en profundidad: Authorization Code con PKCE, Client Credentials, refresh tokens, JWT, introspección, revocación, DPoP y mTLS.',
    keywords: 'OAuth 2.0, Authorization Code, PKCE, Client Credentials, refresh token, access token, JWT, introspección, revocación, PAR, JAR, JARM, RAR, DPoP, mTLS, API Gateway, seguridad de APIs',
    canonicalPath: '/learn/es/oauth-2-flujos-tokens-y-seguridad',
    pageType: 'article', imagePath: '/assets/learn/oauth-2-flows-tokens-security-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Flujos OAuth 2.0 protegidos por PKCE, tokens y controles modernos de seguridad',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['OAuth 2.0', 'Authorization Code', 'PKCE', 'Client Credentials', 'Refresh tokens', 'JWT', 'Introspection', 'Revocation', 'PAR', 'JAR', 'JARM', 'DPoP', 'mTLS', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/oauth-2-flows-tokens-and-security', locale: 'en_US' },
      { language: 'es', path: '/learn/es/oauth-2-flujos-tokens-y-seguridad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/oauth-2-flows-tokens-and-security' }
    ]
  },
  learnOpenIdConnectPortuguese: {
    title: 'OpenID Connect (OIDC): ID Tokens, Sessões e Federação de Identidade',
    description: 'Aprenda OpenID Connect em profundidade: ID Tokens, UserInfo, nonce, claims, sessões, SSO, logout, discovery, JWKS, assurance, multi-tenant e federação de identidade.',
    keywords: 'OpenID Connect, OIDC, ID Token, UserInfo, nonce, claims, sessão, SSO, logout federado, RP-Initiated Logout, Front-Channel Logout, Back-Channel Logout, discovery, JWKS, assurance, federação de identidade',
    canonicalPath: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao',
    pageType: 'article', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Identidade federada OpenID Connect com ID Tokens verificáveis, sessões e Relying Parties',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['OpenID Connect', 'OIDC', 'ID Token', 'UserInfo', 'Nonce', 'Claims', 'SSO', 'Logout', 'Discovery', 'JWKS', 'Assurance', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation' }
    ]
  },
  learnOpenIdConnectEnglish: {
    title: 'OpenID Connect: ID Tokens, Sessions, SSO, and Identity Federation',
    description: 'Learn OpenID Connect in depth: ID Tokens, UserInfo, nonce, claims, sessions, SSO, logout, discovery, JWKS, assurance, multi-tenant identity, and federation.',
    keywords: 'OpenID Connect, OIDC, ID Token, UserInfo, nonce, claims, session, SSO, federated logout, RP-Initiated Logout, Front-Channel Logout, Back-Channel Logout, discovery, JWKS, assurance, identity federation',
    canonicalPath: '/learn/en/openid-connect-id-tokens-sessions-and-federation',
    pageType: 'article', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Federated OpenID Connect identity with verifiable ID Tokens, sessions, and Relying Parties',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['OpenID Connect', 'OIDC', 'ID Token', 'UserInfo', 'Nonce', 'Claims', 'SSO', 'Logout', 'Discovery', 'JWKS', 'Assurance', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation' }
    ]
  },
  learnOpenIdConnectSpanish: {
    title: 'OpenID Connect: ID Tokens, Sesiones, SSO y Federación de Identidad',
    description: 'Aprende OpenID Connect en profundidad: ID Tokens, UserInfo, nonce, claims, sesiones, SSO, logout, discovery, JWKS, assurance, identidad multi-tenant y federación.',
    keywords: 'OpenID Connect, OIDC, ID Token, UserInfo, nonce, claims, sesión, SSO, logout federado, RP-Initiated Logout, Front-Channel Logout, Back-Channel Logout, discovery, JWKS, assurance, federación de identidad',
    canonicalPath: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion',
    pageType: 'article', imagePath: '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Identidad federada OpenID Connect con ID Tokens verificables, sesiones y Relying Parties',
    publishedTime: '2026-07-18T00:00:00-03:00', modifiedTime: '2026-07-18T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['OpenID Connect', 'OIDC', 'ID Token', 'UserInfo', 'Nonce', 'Claims', 'SSO', 'Logout', 'Discovery', 'JWKS', 'Assurance', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation', locale: 'en_US' },
      { language: 'es', path: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/openid-connect-id-tokens-sessions-and-federation' }
    ]
  },
  learnJosePortuguese: {
    title: 'JWT, JWS, JWE e JOSE em Profundidade',
    description: 'Aprenda JWT, JWS, JWE e JOSE em profundidade: claims, Base64url, assinaturas, criptografia, JWK, JWKS, rotação de chaves e validação segura em API Gateways.',
    keywords: 'JWT, JWS, JWE, JOSE, JWK, JWKS, JWA, claims, Base64url, assinatura digital, criptografia, rotação de chaves, validação JWT, API Gateway',
    canonicalPath: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade',
    pageType: 'article', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Token em camadas protegido por assinatura, criptografia e governança de chaves na arquitetura de APIs',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['JWT', 'JWS', 'JWE', 'JOSE', 'JWK', 'JWKS', 'JWA', 'Base64url', 'Claims', 'Digital Signature', 'Encryption', 'Key Rotation', 'RFC 8725', 'RFC 9068', 'RFC 9864', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth' }
    ]
  },
  learnJoseEnglish: {
    title: 'JWT, JWS, JWE, and JOSE in Depth',
    description: 'Learn JWT, JWS, JWE, and JOSE in depth: claims, Base64url, signatures, encryption, JWK, JWKS, key rotation, and secure validation in API Gateways.',
    keywords: 'JWT, JWS, JWE, JOSE, JWK, JWKS, JWA, claims, Base64url, digital signature, encryption, key rotation, JWT validation, API Gateway',
    canonicalPath: '/learn/en/jwt-jws-jwe-and-jose-in-depth',
    pageType: 'article', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Layered token protected by signatures, encryption, and key governance in an API architecture',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['JWT', 'JWS', 'JWE', 'JOSE', 'JWK', 'JWKS', 'JWA', 'Base64url', 'Claims', 'Digital Signature', 'Encryption', 'Key Rotation', 'RFC 8725', 'RFC 9068', 'RFC 9864', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth' }
    ]
  },
  learnJoseSpanish: {
    title: 'JWT, JWS, JWE y JOSE en Profundidad',
    description: 'Aprende JWT, JWS, JWE y JOSE en profundidad: claims, Base64url, firmas, cifrado, JWK, JWKS, rotación de claves y validación segura en API Gateways.',
    keywords: 'JWT, JWS, JWE, JOSE, JWK, JWKS, JWA, claims, Base64url, firma digital, cifrado, rotación de claves, validación JWT, API Gateway',
    canonicalPath: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad',
    pageType: 'article', imagePath: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Token en capas protegido por firmas, cifrado y gobernanza de claves en una arquitectura de APIs',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['JWT', 'JWS', 'JWE', 'JOSE', 'JWK', 'JWKS', 'JWA', 'Base64url', 'Claims', 'Digital Signature', 'Encryption', 'Key Rotation', 'RFC 8725', 'RFC 9068', 'RFC 9864', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/jwt-jws-jwe-and-jose-in-depth' }
    ]
  },
  learnSamlPortuguese: {
    title: 'SAML 2.0 em Profundidade: Assertions, SSO e Federação',
    description: 'Aprenda SAML 2.0 em profundidade: assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, segurança e integração corporativa.',
    keywords: 'SAML 2.0, SAML, assertion, AuthnRequest, SAMLResponse, Identity Provider, Service Provider, SSO, SLO, metadata SAML, XML Signature, XML Encryption, NameID, federação de identidade, API Gateway',
    canonicalPath: '/learn/pt/saml-2-em-profundidade',
    pageType: 'article', imagePath: '/assets/learn/saml-2-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Federação SAML entre domínios corporativos com assertion XML assinada e metadata confiável',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['SAML 2.0', 'Assertion', 'AuthnRequest', 'SAMLResponse', 'Identity Provider', 'Service Provider', 'SSO', 'SLO', 'Metadata', 'XML Signature', 'XML Encryption', 'NameID', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/saml-2-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/saml-2-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/saml-2-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/saml-2-in-depth' }
    ]
  },
  learnSamlEnglish: {
    title: 'SAML 2.0 in Depth: Assertions, SSO, and Federation',
    description: 'Learn SAML 2.0 in depth: assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, security, and enterprise integration.',
    keywords: 'SAML 2.0, SAML, assertion, AuthnRequest, SAMLResponse, Identity Provider, Service Provider, SSO, SLO, SAML metadata, XML Signature, XML Encryption, NameID, identity federation, API Gateway',
    canonicalPath: '/learn/en/saml-2-in-depth',
    pageType: 'article', imagePath: '/assets/learn/saml-2-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'SAML federation across enterprise domains with a signed XML assertion and trusted metadata',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['SAML 2.0', 'Assertion', 'AuthnRequest', 'SAMLResponse', 'Identity Provider', 'Service Provider', 'SSO', 'SLO', 'Metadata', 'XML Signature', 'XML Encryption', 'NameID', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/saml-2-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/saml-2-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/saml-2-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/saml-2-in-depth' }
    ]
  },
  learnSamlSpanish: {
    title: 'SAML 2.0 en Profundidad: Assertions, SSO y Federación',
    description: 'Aprende SAML 2.0 en profundidad: assertions, AuthnRequest, bindings, metadata, XML Signature, SSO, SLO, NameID, seguridad e integración corporativa.',
    keywords: 'SAML 2.0, SAML, assertion, AuthnRequest, SAMLResponse, Identity Provider, Service Provider, SSO, SLO, metadata SAML, XML Signature, XML Encryption, NameID, federación de identidad, API Gateway',
    canonicalPath: '/learn/es/saml-2-en-profundidad',
    pageType: 'article', imagePath: '/assets/learn/saml-2-in-depth-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Federación SAML entre dominios corporativos con una assertion XML firmada y metadata confiable',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['SAML 2.0', 'Assertion', 'AuthnRequest', 'SAMLResponse', 'Identity Provider', 'Service Provider', 'SSO', 'SLO', 'Metadata', 'XML Signature', 'XML Encryption', 'NameID', 'Identity Federation', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/saml-2-em-profundidade', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/saml-2-in-depth', locale: 'en_US' },
      { language: 'es', path: '/learn/es/saml-2-en-profundidad', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/saml-2-in-depth' }
    ]
  },
  learnIdentityFederationPortuguese: {
    title: 'Identity Federation e Single Sign-On: Guia Completo',
    description: 'Aprenda Identity Federation e SSO em profundidade: domínios de confiança, brokers, SAML, OIDC, sessões, logout, account linking, MFA, B2B, workloads e API Gateways.',
    keywords: 'identity federation, single sign-on, SSO, federação de identidade, identity broker, trust domain, SAML, OpenID Connect, OIDC, account linking, MFA, B2B, workload identity federation, token exchange, API Gateway',
    canonicalPath: '/learn/pt/identity-federation-e-single-sign-on',
    pageType: 'article', imagePath: '/assets/learn/identity-federation-sso-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Identity Provider central conectando múltiplas aplicações e domínios por relações de confiança',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Identity Federation', 'Single Sign-On', 'SSO', 'Identity Broker', 'Trust Domain', 'SAML', 'OpenID Connect', 'OIDC', 'Account Linking', 'MFA', 'B2B', 'Workload Identity Federation', 'Token Exchange', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/identity-federation-e-single-sign-on', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/identity-federation-and-single-sign-on', locale: 'en_US' },
      { language: 'es', path: '/learn/es/federacion-de-identidad-y-single-sign-on', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/identity-federation-and-single-sign-on' }
    ]
  },
  learnIdentityFederationEnglish: {
    title: 'Identity Federation and Single Sign-On: Complete Guide',
    description: 'Learn Identity Federation and SSO in depth: trust domains, brokers, SAML, OIDC, sessions, logout, account linking, MFA, B2B, workloads, and API Gateways.',
    keywords: 'identity federation, single sign-on, SSO, identity broker, trust domain, SAML, OpenID Connect, OIDC, account linking, MFA, B2B, workload identity federation, token exchange, API Gateway',
    canonicalPath: '/learn/en/identity-federation-and-single-sign-on',
    pageType: 'article', imagePath: '/assets/learn/identity-federation-sso-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Central Identity Provider connecting multiple applications and domains through trust relationships',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Identity Federation', 'Single Sign-On', 'SSO', 'Identity Broker', 'Trust Domain', 'SAML', 'OpenID Connect', 'OIDC', 'Account Linking', 'MFA', 'B2B', 'Workload Identity Federation', 'Token Exchange', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/identity-federation-e-single-sign-on', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/identity-federation-and-single-sign-on', locale: 'en_US' },
      { language: 'es', path: '/learn/es/federacion-de-identidad-y-single-sign-on', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/identity-federation-and-single-sign-on' }
    ]
  },
  learnIdentityFederationSpanish: {
    title: 'Federación de Identidad y Single Sign-On: Guía Completa',
    description: 'Aprende federación de identidad y SSO en profundidad: dominios de confianza, brokers, SAML, OIDC, sesiones, logout, account linking, MFA, B2B, workloads y API Gateways.',
    keywords: 'federación de identidad, identity federation, single sign-on, SSO, identity broker, dominio de confianza, SAML, OpenID Connect, OIDC, account linking, MFA, B2B, workload identity federation, token exchange, API Gateway',
    canonicalPath: '/learn/es/federacion-de-identidad-y-single-sign-on',
    pageType: 'article', imagePath: '/assets/learn/identity-federation-sso-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Identity Provider central conectando múltiples aplicaciones y dominios mediante relaciones de confianza',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra',
    section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Identity Federation', 'Single Sign-On', 'SSO', 'Identity Broker', 'Trust Domain', 'SAML', 'OpenID Connect', 'OIDC', 'Account Linking', 'MFA', 'B2B', 'Workload Identity Federation', 'Token Exchange', 'API Gateway'],
    alternateLanguages: [
      { language: 'pt-BR', path: '/learn/pt/identity-federation-e-single-sign-on', locale: 'pt_BR' },
      { language: 'en', path: '/learn/en/identity-federation-and-single-sign-on', locale: 'en_US' },
      { language: 'es', path: '/learn/es/federacion-de-identidad-y-single-sign-on', locale: 'es_ES' },
      { language: 'x-default', path: '/learn/en/identity-federation-and-single-sign-on' }
    ]
  },
  learnApiGatewaysPortuguese: {
    title: 'API Gateways: Conceitos e Arquitetura | Guia Completo',
    description: 'Aprenda API Gateways em profundidade: data plane, control plane, políticas, roteamento, segurança, tráfego, alta disponibilidade, observabilidade e troubleshooting.',
    keywords: 'API Gateway, arquitetura de API Gateway, data plane, control plane, políticas de API, rate limiting, roteamento, reverse proxy, load balancer, WAF, service mesh, alta disponibilidade, observabilidade, troubleshooting',
    canonicalPath: '/learn/pt/api-gateways-conceitos-e-arquitetura', pageType: 'article', imagePath: '/assets/learn/api-gateways-architecture-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'API Gateway central mediando consumidores, políticas e serviços de backend', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['API Gateway', 'Data Plane', 'Control Plane', 'Policies', 'Routing', 'Rate Limiting', 'High Availability', 'Observability', 'Reverse Proxy', 'Load Balancer', 'WAF', 'Service Mesh'],
    alternateLanguages: [{ language: 'pt-BR', path: '/learn/pt/api-gateways-conceitos-e-arquitetura', locale: 'pt_BR' }, { language: 'en', path: '/learn/en/api-gateways-concepts-and-architecture', locale: 'en_US' }, { language: 'es', path: '/learn/es/api-gateways-conceptos-y-arquitectura', locale: 'es_ES' }, { language: 'x-default', path: '/learn/en/api-gateways-concepts-and-architecture' }]
  },
  learnApiGatewaysEnglish: {
    title: 'API Gateways: Concepts and Architecture | Complete Guide',
    description: 'Learn API Gateways in depth: data plane, control plane, policies, routing, security, traffic control, high availability, observability, and troubleshooting.',
    keywords: 'API Gateway, API Gateway architecture, data plane, control plane, API policies, rate limiting, routing, reverse proxy, load balancer, WAF, service mesh, high availability, observability, troubleshooting',
    canonicalPath: '/learn/en/api-gateways-concepts-and-architecture', pageType: 'article', imagePath: '/assets/learn/api-gateways-architecture-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'Central API Gateway mediating consumers, policies, and backend services', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['API Gateway', 'Data Plane', 'Control Plane', 'Policies', 'Routing', 'Rate Limiting', 'High Availability', 'Observability', 'Reverse Proxy', 'Load Balancer', 'WAF', 'Service Mesh'],
    alternateLanguages: [{ language: 'pt-BR', path: '/learn/pt/api-gateways-conceitos-e-arquitetura', locale: 'pt_BR' }, { language: 'en', path: '/learn/en/api-gateways-concepts-and-architecture', locale: 'en_US' }, { language: 'es', path: '/learn/es/api-gateways-conceptos-y-arquitectura', locale: 'es_ES' }, { language: 'x-default', path: '/learn/en/api-gateways-concepts-and-architecture' }]
  },
  learnApiGatewaysSpanish: {
    title: 'API Gateways: Conceptos y Arquitectura | Guía Completa',
    description: 'Aprende API Gateways en profundidad: data plane, control plane, políticas, enrutamiento, seguridad, control de tráfico, alta disponibilidad, observabilidad y troubleshooting.',
    keywords: 'API Gateway, arquitectura de API Gateway, data plane, control plane, políticas de API, rate limiting, enrutamiento, reverse proxy, load balancer, WAF, service mesh, alta disponibilidad, observabilidad, troubleshooting',
    canonicalPath: '/learn/es/api-gateways-conceptos-y-arquitectura', pageType: 'article', imagePath: '/assets/learn/api-gateways-architecture-cover.png', imageWidth: 1536, imageHeight: 1024,
    imageAlt: 'API Gateway central que media consumidores, políticas y servicios backend', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['API Gateway', 'Data Plane', 'Control Plane', 'Policies', 'Routing', 'Rate Limiting', 'High Availability', 'Observability', 'Reverse Proxy', 'Load Balancer', 'WAF', 'Service Mesh'],
    alternateLanguages: [{ language: 'pt-BR', path: '/learn/pt/api-gateways-conceitos-e-arquitetura', locale: 'pt_BR' }, { language: 'en', path: '/learn/en/api-gateways-concepts-and-architecture', locale: 'en_US' }, { language: 'es', path: '/learn/es/api-gateways-conceptos-y-arquitectura', locale: 'es_ES' }, { language: 'x-default', path: '/learn/en/api-gateways-concepts-and-architecture' }]
  },
  learnGatewayPoliciesPortuguese: {
    title: 'Políticas de Gateway: Policies em Profundidade',
    description: 'Aprenda Gateway Policies: pipeline, ordem, escopos, autenticação, autorização, validação, rate limiting, transformação, roteamento, resiliência e observabilidade.',
    keywords: 'gateway policies, políticas de gateway, API Gateway policy, policy pipeline, autenticação, autorização, rate limiting, quotas, transformação, roteamento, circuit breaker, observabilidade, troubleshooting',
    canonicalPath: '/learn/pt/politicas-de-gateway-policies', pageType: 'article', imagePath: '/assets/learn/gateway-policies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Pipeline luminoso de policies processando uma chamada de API',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR',
    tags: ['Gateway Policies','API Gateway','Policy Pipeline','Authentication','Authorization','Rate Limiting','Transformation','Routing','Circuit Breaker','Observability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/politicas-de-gateway-policies',locale:'pt_BR'},{language:'en',path:'/learn/en/gateway-policies',locale:'en_US'},{language:'es',path:'/learn/es/politicas-de-gateway-policies',locale:'es_ES'},{language:'x-default',path:'/learn/en/gateway-policies'}]
  },
  learnGatewayPoliciesEnglish: {
    title: 'Gateway Policies: Complete In-Depth Guide',
    description: 'Learn Gateway Policies in depth: pipelines, ordering, scopes, authentication, authorization, validation, rate limiting, transformation, routing, resilience, and observability.',
    keywords: 'gateway policies, API Gateway policy, policy pipeline, authentication, authorization, rate limiting, quotas, transformation, routing, circuit breaker, observability, troubleshooting',
    canonicalPath: '/learn/en/gateway-policies', pageType: 'article', imagePath: '/assets/learn/gateway-policies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Luminous policy pipeline processing an API call',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US',
    tags: ['Gateway Policies','API Gateway','Policy Pipeline','Authentication','Authorization','Rate Limiting','Transformation','Routing','Circuit Breaker','Observability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/politicas-de-gateway-policies',locale:'pt_BR'},{language:'en',path:'/learn/en/gateway-policies',locale:'en_US'},{language:'es',path:'/learn/es/politicas-de-gateway-policies',locale:'es_ES'},{language:'x-default',path:'/learn/en/gateway-policies'}]
  },
  learnGatewayPoliciesSpanish: {
    title: 'Políticas de Gateway: Guía Completa en Profundidad',
    description: 'Aprende Gateway Policies en profundidad: pipeline, orden, ámbitos, autenticación, autorización, validación, rate limiting, transformación, enrutamiento, resiliencia y observabilidad.',
    keywords: 'gateway policies, políticas de gateway, API Gateway policy, policy pipeline, autenticación, autorización, rate limiting, cuotas, transformación, enrutamiento, circuit breaker, observabilidad, troubleshooting',
    canonicalPath: '/learn/es/politicas-de-gateway-policies', pageType: 'article', imagePath: '/assets/learn/gateway-policies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Pipeline luminoso de policies procesando una llamada de API',
    publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES',
    tags: ['Gateway Policies','API Gateway','Policy Pipeline','Authentication','Authorization','Rate Limiting','Transformation','Routing','Circuit Breaker','Observability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/politicas-de-gateway-policies',locale:'pt_BR'},{language:'en',path:'/learn/en/gateway-policies',locale:'en_US'},{language:'es',path:'/learn/es/politicas-de-gateway-policies',locale:'es_ES'},{language:'x-default',path:'/learn/en/gateway-policies'}]
  },
  learnAxwayGatewayPortuguese: {
    title: 'Axway API Gateway: Arquitetura e Funcionamento', description: 'Aprenda a arquitetura do Axway API Gateway: Policy Studio, Node Managers, runtime, API Manager, KPS, Cassandra, HA, TLS, observabilidade, containers e troubleshooting.',
    keywords: 'Axway API Gateway, Policy Studio, Admin Node Manager, Node Manager, API Gateway Manager, API Manager, KPS, Cassandra, Traffic Monitor, policy circuit, message context, alta disponibilidade, troubleshooting', canonicalPath: '/learn/pt/axway-api-gateway-arquitetura-e-funcionamento', pageType: 'article', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitetura distribuída de uma plataforma corporativa de API Gateway', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Axway API Gateway','Policy Studio','Admin Node Manager','Node Manager','API Manager','KPS','Cassandra','Traffic Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/axway-api-gateway-arquitetura-e-funcionamento',locale:'pt_BR'},{language:'en',path:'/learn/en/axway-api-gateway-architecture-and-operation',locale:'en_US'},{language:'es',path:'/learn/es/axway-api-gateway-arquitectura-y-funcionamiento',locale:'es_ES'},{language:'x-default',path:'/learn/en/axway-api-gateway-architecture-and-operation'}]
  },
  learnAxwayGatewayEnglish: {
    title: 'Axway API Gateway: Architecture and Operation', description: 'Learn Axway API Gateway architecture: Policy Studio, Node Managers, runtime, API Manager, KPS, Cassandra, HA, TLS, observability, containers, and troubleshooting.',
    keywords: 'Axway API Gateway, Policy Studio, Admin Node Manager, Node Manager, API Gateway Manager, API Manager, KPS, Cassandra, Traffic Monitor, policy circuit, message context, high availability, troubleshooting', canonicalPath: '/learn/en/axway-api-gateway-architecture-and-operation', pageType: 'article', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Distributed architecture of an enterprise API Gateway platform', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Axway API Gateway','Policy Studio','Admin Node Manager','Node Manager','API Manager','KPS','Cassandra','Traffic Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/axway-api-gateway-arquitetura-e-funcionamento',locale:'pt_BR'},{language:'en',path:'/learn/en/axway-api-gateway-architecture-and-operation',locale:'en_US'},{language:'es',path:'/learn/es/axway-api-gateway-arquitectura-y-funcionamiento',locale:'es_ES'},{language:'x-default',path:'/learn/en/axway-api-gateway-architecture-and-operation'}]
  },
  learnAxwayGatewaySpanish: {
    title: 'Axway API Gateway: Arquitectura y Funcionamiento', description: 'Aprende la arquitectura de Axway API Gateway: Policy Studio, Node Managers, runtime, API Manager, KPS, Cassandra, HA, TLS, observabilidad, contenedores y troubleshooting.',
    keywords: 'Axway API Gateway, Policy Studio, Admin Node Manager, Node Manager, API Gateway Manager, API Manager, KPS, Cassandra, Traffic Monitor, policy circuit, message context, alta disponibilidad, troubleshooting', canonicalPath: '/learn/es/axway-api-gateway-arquitectura-y-funcionamiento', pageType: 'article', imagePath: '/assets/learn/axway-api-gateway-architecture-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitectura distribuida de una plataforma corporativa de API Gateway', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Axway API Gateway','Policy Studio','Admin Node Manager','Node Manager','API Manager','KPS','Cassandra','Traffic Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/axway-api-gateway-arquitetura-e-funcionamento',locale:'pt_BR'},{language:'en',path:'/learn/en/axway-api-gateway-architecture-and-operation',locale:'en_US'},{language:'es',path:'/learn/es/axway-api-gateway-arquitectura-y-funcionamiento',locale:'es_ES'},{language:'x-default',path:'/learn/en/axway-api-gateway-architecture-and-operation'}]
  },
  learnAzureApimPortuguese: {
    title: 'Azure API Management (APIM): Arquitetura e Operação', description: 'Aprenda Azure API Management em profundidade: gateways, policies, tiers, redes privadas, segurança, Key Vault, alta disponibilidade, observabilidade, automação e troubleshooting.',
    keywords: 'Azure API Management, APIM, managed gateway, self-hosted gateway, workspace gateway, APIM policies, VNet, Private Link, Key Vault, Azure Monitor, Application Insights, API management', canonicalPath: '/learn/pt/azure-api-management-apim', pageType: 'article', imagePath: '/assets/learn/azure-api-management-apim-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma gerenciada de APIs conectando gateways, redes híbridas e observabilidade', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Azure API Management','APIM','Managed Gateway','Self-hosted Gateway','Policies','VNet','Private Link','Key Vault','Azure Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/azure-api-management-apim',locale:'pt_BR'},{language:'en',path:'/learn/en/azure-api-management-apim',locale:'en_US'},{language:'es',path:'/learn/es/azure-api-management-apim',locale:'es_ES'},{language:'x-default',path:'/learn/en/azure-api-management-apim'}]
  },
  learnAzureApimEnglish: {
    title: 'Azure API Management (APIM): Architecture and Operations', description: 'Learn Azure API Management in depth: gateways, policies, tiers, private networking, security, Key Vault, high availability, observability, automation, and troubleshooting.',
    keywords: 'Azure API Management, APIM, managed gateway, self-hosted gateway, workspace gateway, APIM policies, VNet, Private Link, Key Vault, Azure Monitor, Application Insights, API management', canonicalPath: '/learn/en/azure-api-management-apim', pageType: 'article', imagePath: '/assets/learn/azure-api-management-apim-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Managed API platform connecting gateways, hybrid networks, and observability', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Azure API Management','APIM','Managed Gateway','Self-hosted Gateway','Policies','VNet','Private Link','Key Vault','Azure Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/azure-api-management-apim',locale:'pt_BR'},{language:'en',path:'/learn/en/azure-api-management-apim',locale:'en_US'},{language:'es',path:'/learn/es/azure-api-management-apim',locale:'es_ES'},{language:'x-default',path:'/learn/en/azure-api-management-apim'}]
  },
  learnAzureApimSpanish: {
    title: 'Azure API Management (APIM): Arquitectura y Operación', description: 'Aprende Azure API Management en profundidad: gateways, policies, tiers, redes privadas, seguridad, Key Vault, alta disponibilidad, observabilidad, automatización y troubleshooting.',
    keywords: 'Azure API Management, APIM, managed gateway, self-hosted gateway, workspace gateway, APIM policies, VNet, Private Link, Key Vault, Azure Monitor, Application Insights, gestión de APIs', canonicalPath: '/learn/es/azure-api-management-apim', pageType: 'article', imagePath: '/assets/learn/azure-api-management-apim-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma administrada de APIs conectando gateways, redes híbridas y observabilidad', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Azure API Management','APIM','Managed Gateway','Self-hosted Gateway','Policies','VNet','Private Link','Key Vault','Azure Monitor','High Availability'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/azure-api-management-apim',locale:'pt_BR'},{language:'en',path:'/learn/en/azure-api-management-apim',locale:'en_US'},{language:'es',path:'/learn/es/azure-api-management-apim',locale:'es_ES'},{language:'x-default',path:'/learn/en/azure-api-management-apim'}]
  },
  learnOwaspApiSecurityPortuguese: {
    title: 'Segurança de APIs: OWASP API Security Top 10', description: 'Aprenda segurança de APIs com o OWASP API Security Top 10: BOLA, autenticação, autorização, consumo de recursos, SSRF, misconfiguration, inventário e defesa em profundidade.',
    keywords: 'OWASP API Security Top 10, segurança de APIs, API security, BOLA, broken authentication, BOPLA, resource consumption, BFLA, business flows, SSRF, security misconfiguration, API inventory, unsafe consumption', canonicalPath: '/learn/pt/seguranca-apis-owasp-api-security-top-10', pageType: 'article', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Defesa em profundidade protegendo identidades, gateways, backends e dados de APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['OWASP API Security Top 10','API Security','BOLA','Broken Authentication','BOPLA','BFLA','SSRF','Security Misconfiguration','API Inventory','Defense in Depth'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/seguranca-apis-owasp-api-security-top-10',locale:'pt_BR'},{language:'en',path:'/learn/en/api-security-owasp-api-security-top-10',locale:'en_US'},{language:'es',path:'/learn/es/seguridad-apis-owasp-api-security-top-10',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-security-owasp-api-security-top-10'}]
  },
  learnOwaspApiSecurityEnglish: {
    title: 'API Security: OWASP API Security Top 10', description: 'Learn API security through the OWASP API Security Top 10: BOLA, authentication, authorization, resource consumption, SSRF, misconfiguration, inventory, and defense in depth.',
    keywords: 'OWASP API Security Top 10, API security, BOLA, broken authentication, BOPLA, unrestricted resource consumption, BFLA, business flows, SSRF, security misconfiguration, API inventory, unsafe consumption', canonicalPath: '/learn/en/api-security-owasp-api-security-top-10', pageType: 'article', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Defense in depth protecting API identities, gateways, backends, and data', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['OWASP API Security Top 10','API Security','BOLA','Broken Authentication','BOPLA','BFLA','SSRF','Security Misconfiguration','API Inventory','Defense in Depth'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/seguranca-apis-owasp-api-security-top-10',locale:'pt_BR'},{language:'en',path:'/learn/en/api-security-owasp-api-security-top-10',locale:'en_US'},{language:'es',path:'/learn/es/seguridad-apis-owasp-api-security-top-10',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-security-owasp-api-security-top-10'}]
  },
  learnOwaspApiSecuritySpanish: {
    title: 'Seguridad de APIs: OWASP API Security Top 10', description: 'Aprende seguridad de APIs con OWASP API Security Top 10: BOLA, autenticación, autorización, consumo de recursos, SSRF, misconfiguration, inventario y defensa en profundidad.',
    keywords: 'OWASP API Security Top 10, seguridad de APIs, API security, BOLA, broken authentication, BOPLA, resource consumption, BFLA, business flows, SSRF, security misconfiguration, inventario de APIs, unsafe consumption', canonicalPath: '/learn/es/seguridad-apis-owasp-api-security-top-10', pageType: 'article', imagePath: '/assets/learn/api-security-owasp-top-10-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Defensa en profundidad protegiendo identidades, gateways, backends y datos de APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['OWASP API Security Top 10','API Security','BOLA','Broken Authentication','BOPLA','BFLA','SSRF','Security Misconfiguration','API Inventory','Defense in Depth'],
    alternateLanguages: [{language:'pt-BR',path:'/learn/pt/seguranca-apis-owasp-api-security-top-10',locale:'pt_BR'},{language:'en',path:'/learn/en/api-security-owasp-api-security-top-10',locale:'en_US'},{language:'es',path:'/learn/es/seguridad-apis-owasp-api-security-top-10',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-security-owasp-api-security-top-10'}]
  },
  learnHttpSecurityHeadersPortuguese: {
    title: 'CORS, CSP, HSTS e Outros Cabeçalhos HTTP', description: 'Aprenda CORS, CSP, HSTS e cabeçalhos HTTP de segurança: preflight, credenciais, nonces, hashes, reporting, isolamento cross-origin, cache, cookies e troubleshooting.', keywords: 'CORS, CSP, HSTS, cabeçalhos HTTP, preflight, Content Security Policy, Same-Origin Policy, security headers, Referrer-Policy, Permissions-Policy, COOP, COEP, CORP, Cache-Control', canonicalPath: '/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http', pageType: 'article', imagePath: '/assets/learn/http-security-headers-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Navegador e APIs protegidos por políticas de origem, conteúdo e transporte seguro', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['CORS','CSP','HSTS','HTTP Security Headers','Same-Origin Policy','Referrer-Policy','Permissions-Policy','COOP','COEP','CORP'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http',locale:'pt_BR'},{language:'en',path:'/learn/en/cors-csp-hsts-and-other-http-headers',locale:'en_US'},{language:'es',path:'/learn/es/cors-csp-hsts-y-otros-encabezados-http',locale:'es_ES'},{language:'x-default',path:'/learn/en/cors-csp-hsts-and-other-http-headers'}]
  },
  learnHttpSecurityHeadersEnglish: {
    title: 'CORS, CSP, HSTS, and Other HTTP Security Headers', description: 'Learn CORS, CSP, HSTS, and HTTP security headers: preflight, credentials, nonces, hashes, reporting, cross-origin isolation, caching, cookies, and troubleshooting.', keywords: 'CORS, CSP, HSTS, HTTP security headers, preflight, Content Security Policy, Same-Origin Policy, Referrer-Policy, Permissions-Policy, COOP, COEP, CORP, Cache-Control', canonicalPath: '/learn/en/cors-csp-hsts-and-other-http-headers', pageType: 'article', imagePath: '/assets/learn/http-security-headers-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Browser and APIs protected by origin, content, and secure transport policies', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['CORS','CSP','HSTS','HTTP Security Headers','Same-Origin Policy','Referrer-Policy','Permissions-Policy','COOP','COEP','CORP'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http',locale:'pt_BR'},{language:'en',path:'/learn/en/cors-csp-hsts-and-other-http-headers',locale:'en_US'},{language:'es',path:'/learn/es/cors-csp-hsts-y-otros-encabezados-http',locale:'es_ES'},{language:'x-default',path:'/learn/en/cors-csp-hsts-and-other-http-headers'}]
  },
  learnHttpSecurityHeadersSpanish: {
    title: 'CORS, CSP, HSTS y Otros Encabezados HTTP', description: 'Aprende CORS, CSP, HSTS y encabezados HTTP de seguridad: preflight, credenciales, nonces, hashes, reporting, aislamiento cross-origin, caché, cookies y troubleshooting.', keywords: 'CORS, CSP, HSTS, encabezados HTTP, preflight, Content Security Policy, Same-Origin Policy, security headers, Referrer-Policy, Permissions-Policy, COOP, COEP, CORP, Cache-Control', canonicalPath: '/learn/es/cors-csp-hsts-y-otros-encabezados-http', pageType: 'article', imagePath: '/assets/learn/http-security-headers-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Navegador y APIs protegidos por políticas de origen, contenido y transporte seguro', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['CORS','CSP','HSTS','HTTP Security Headers','Same-Origin Policy','Referrer-Policy','Permissions-Policy','COOP','COEP','CORP'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http',locale:'pt_BR'},{language:'en',path:'/learn/en/cors-csp-hsts-and-other-http-headers',locale:'en_US'},{language:'es',path:'/learn/es/cors-csp-hsts-y-otros-encabezados-http',locale:'es_ES'},{language:'x-default',path:'/learn/en/cors-csp-hsts-and-other-http-headers'}]
  },
  learnRateLimitingPortuguese: {
    title: 'Rate Limiting, Quotas e Throttling em APIs', description: 'Aprenda rate limiting, quotas e throttling: algoritmos, token bucket, concorrência, limites distribuídos, HTTP 429, retries, dimensionamento e troubleshooting.', keywords: 'rate limiting, quotas, throttling, token bucket, fixed window, sliding window, GCRA, concurrency limit, backpressure, HTTP 429, Retry-After, API Gateway', canonicalPath: '/learn/pt/rate-limiting-quotas-e-throttling', pageType: 'article', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Gateway corporativo controlando fluxos, bursts e orçamentos de consumo de APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Rate Limiting','Quotas','Throttling','Token Bucket','GCRA','Concurrency Limit','Backpressure','HTTP 429','Retry-After','API Gateway'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/rate-limiting-quotas-e-throttling',locale:'pt_BR'},{language:'en',path:'/learn/en/rate-limiting-quotas-and-throttling',locale:'en_US'},{language:'es',path:'/learn/es/rate-limiting-cuotas-y-throttling',locale:'es_ES'},{language:'x-default',path:'/learn/en/rate-limiting-quotas-and-throttling'}]
  },
  learnRateLimitingEnglish: {
    title: 'Rate Limiting, Quotas, and Throttling for APIs', description: 'Learn rate limiting, quotas, and throttling: algorithms, token bucket, concurrency, distributed limits, HTTP 429, retries, sizing, and troubleshooting.', keywords: 'rate limiting, quotas, throttling, token bucket, fixed window, sliding window, GCRA, concurrency limit, backpressure, HTTP 429, Retry-After, API Gateway', canonicalPath: '/learn/en/rate-limiting-quotas-and-throttling', pageType: 'article', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Enterprise gateway controlling API traffic flows, bursts, and consumption budgets', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Rate Limiting','Quotas','Throttling','Token Bucket','GCRA','Concurrency Limit','Backpressure','HTTP 429','Retry-After','API Gateway'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/rate-limiting-quotas-e-throttling',locale:'pt_BR'},{language:'en',path:'/learn/en/rate-limiting-quotas-and-throttling',locale:'en_US'},{language:'es',path:'/learn/es/rate-limiting-cuotas-y-throttling',locale:'es_ES'},{language:'x-default',path:'/learn/en/rate-limiting-quotas-and-throttling'}]
  },
  learnRateLimitingSpanish: {
    title: 'Rate Limiting, Cuotas y Throttling para APIs', description: 'Aprende rate limiting, cuotas y throttling: algoritmos, token bucket, concurrencia, límites distribuidos, HTTP 429, reintentos, dimensionamiento y troubleshooting.', keywords: 'rate limiting, cuotas, throttling, token bucket, fixed window, sliding window, GCRA, límite de concurrencia, backpressure, HTTP 429, Retry-After, API Gateway', canonicalPath: '/learn/es/rate-limiting-cuotas-y-throttling', pageType: 'article', imagePath: '/assets/learn/rate-limiting-quotas-throttling-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Gateway corporativo controlando flujos, ráfagas y presupuestos de consumo de APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Rate Limiting','Cuotas','Throttling','Token Bucket','GCRA','Límite de concurrencia','Backpressure','HTTP 429','Retry-After','API Gateway'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/rate-limiting-quotas-e-throttling',locale:'pt_BR'},{language:'en',path:'/learn/en/rate-limiting-quotas-and-throttling',locale:'en_US'},{language:'es',path:'/learn/es/rate-limiting-cuotas-y-throttling',locale:'es_ES'},{language:'x-default',path:'/learn/en/rate-limiting-quotas-and-throttling'}]
  },
  learnApiVersioningPortuguese: {
    title: 'API Versioning: Compatibilidade e Ciclo de Vida', description: 'Aprenda versionamento de APIs, compatibilidade, SemVer, path, headers, coexistência, Deprecation, Sunset, migração, testes de contrato e governança.', keywords: 'API versioning, versionamento de APIs, compatibilidade, breaking change, SemVer, Deprecation, Sunset, contract testing, semantic diff, API lifecycle, Azure API Management', canonicalPath: '/learn/pt/api-versioning', pageType: 'article', imagePath: '/assets/learn/api-versioning-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Contratos de API evoluindo por versões coexistentes, migração e retirada segura', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['API Versioning','Compatibility','SemVer','Breaking Change','Deprecation','Sunset','Contract Testing','Semantic Diff','API Lifecycle','Azure API Management'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/api-versioning',locale:'pt_BR'},{language:'en',path:'/learn/en/api-versioning',locale:'en_US'},{language:'es',path:'/learn/es/api-versioning',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-versioning'}]
  },
  learnApiVersioningEnglish: {
    title: 'API Versioning: Compatibility and Lifecycle', description: 'Learn API versioning, compatibility, SemVer, paths, headers, coexistence, Deprecation, Sunset, migration, contract testing, and governance.', keywords: 'API versioning, API compatibility, breaking change, SemVer, Deprecation, Sunset, contract testing, semantic diff, API lifecycle, Azure API Management', canonicalPath: '/learn/en/api-versioning', pageType: 'article', imagePath: '/assets/learn/api-versioning-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'API contracts evolving through coexisting versions, migration, and safe retirement', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['API Versioning','Compatibility','SemVer','Breaking Change','Deprecation','Sunset','Contract Testing','Semantic Diff','API Lifecycle','Azure API Management'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/api-versioning',locale:'pt_BR'},{language:'en',path:'/learn/en/api-versioning',locale:'en_US'},{language:'es',path:'/learn/es/api-versioning',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-versioning'}]
  },
  learnApiVersioningSpanish: {
    title: 'API Versioning: Compatibilidad y Ciclo de Vida', description: 'Aprende versionado de APIs, compatibilidad, SemVer, rutas, headers, coexistencia, Deprecation, Sunset, migración, pruebas de contrato y gobernanza.', keywords: 'API versioning, versionado de APIs, compatibilidad, breaking change, SemVer, Deprecation, Sunset, pruebas de contrato, semantic diff, ciclo de vida de APIs, Azure API Management', canonicalPath: '/learn/es/api-versioning', pageType: 'article', imagePath: '/assets/learn/api-versioning-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Contratos de API evolucionando mediante versiones coexistentes, migración y retirada segura', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['API Versioning','Compatibility','SemVer','Breaking Change','Deprecation','Sunset','Contract Testing','Semantic Diff','API Lifecycle','Azure API Management'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/api-versioning',locale:'pt_BR'},{language:'en',path:'/learn/en/api-versioning',locale:'en_US'},{language:'es',path:'/learn/es/api-versioning',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-versioning'}]
  },
  learnServiceMeshPortuguese: {
    title: 'Service Mesh: Istio, Linkerd e Envoy', description: 'Aprenda service mesh com Istio, Linkerd e Envoy: control plane, data plane, sidecars, ambient mode, mTLS, traffic management, xDS, observabilidade e multi-cluster.', keywords: 'service mesh, Istio, Linkerd, Envoy, control plane, data plane, sidecar, ambient mode, ztunnel, waypoint proxy, mTLS, xDS, Gateway API, GAMMA, multi-cluster', canonicalPath: '/learn/pt/service-mesh-istio-linkerd-e-envoy', pageType: 'article', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plano de controle coordenando uma malha segura de workloads, proxies e múltiplos clusters', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Service Mesh','Istio','Linkerd','Envoy','Control Plane','Data Plane','Sidecar','Ambient Mode','mTLS','xDS'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/service-mesh-istio-linkerd-e-envoy',locale:'pt_BR'},{language:'en',path:'/learn/en/service-mesh-istio-linkerd-and-envoy',locale:'en_US'},{language:'es',path:'/learn/es/service-mesh-istio-linkerd-y-envoy',locale:'es_ES'},{language:'x-default',path:'/learn/en/service-mesh-istio-linkerd-and-envoy'}]
  },
  learnServiceMeshEnglish: {
    title: 'Service Mesh: Istio, Linkerd, and Envoy', description: 'Learn service mesh with Istio, Linkerd, and Envoy: control plane, data plane, sidecars, ambient mode, mTLS, traffic management, xDS, observability, and multi-cluster.', keywords: 'service mesh, Istio, Linkerd, Envoy, control plane, data plane, sidecar, ambient mode, ztunnel, waypoint proxy, mTLS, xDS, Gateway API, GAMMA, multi-cluster', canonicalPath: '/learn/en/service-mesh-istio-linkerd-and-envoy', pageType: 'article', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Control plane coordinating a secure mesh of workloads, proxies, and multiple clusters', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Service Mesh','Istio','Linkerd','Envoy','Control Plane','Data Plane','Sidecar','Ambient Mode','mTLS','xDS'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/service-mesh-istio-linkerd-e-envoy',locale:'pt_BR'},{language:'en',path:'/learn/en/service-mesh-istio-linkerd-and-envoy',locale:'en_US'},{language:'es',path:'/learn/es/service-mesh-istio-linkerd-y-envoy',locale:'es_ES'},{language:'x-default',path:'/learn/en/service-mesh-istio-linkerd-and-envoy'}]
  },
  learnServiceMeshSpanish: {
    title: 'Service Mesh: Istio, Linkerd y Envoy', description: 'Aprende service mesh con Istio, Linkerd y Envoy: plano de control, plano de datos, sidecars, ambient mode, mTLS, traffic management, xDS, observabilidad y multi-cluster.', keywords: 'service mesh, Istio, Linkerd, Envoy, plano de control, plano de datos, sidecar, ambient mode, ztunnel, waypoint proxy, mTLS, xDS, Gateway API, GAMMA, multi-cluster', canonicalPath: '/learn/es/service-mesh-istio-linkerd-y-envoy', pageType: 'article', imagePath: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plano de control coordinando una malla segura de workloads, proxies y múltiples clusters', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Service Mesh','Istio','Linkerd','Envoy','Control Plane','Data Plane','Sidecar','Ambient Mode','mTLS','xDS'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/service-mesh-istio-linkerd-e-envoy',locale:'pt_BR'},{language:'en',path:'/learn/en/service-mesh-istio-linkerd-and-envoy',locale:'en_US'},{language:'es',path:'/learn/es/service-mesh-istio-linkerd-y-envoy',locale:'es_ES'},{language:'x-default',path:'/learn/en/service-mesh-istio-linkerd-and-envoy'}]
  },
  learnMicroservicesPortuguese: {
    title: 'Microserviços e Padrões de Integração', description: 'Aprenda microserviços, bounded contexts, Saga, Transactional Outbox, CDC, idempotência, CQRS, Event Sourcing, resiliência, observabilidade e Strangler Fig.', keywords: 'microserviços, padrões de integração, bounded context, Saga, Transactional Outbox, CDC, idempotência, CQRS, Event Sourcing, API Composition, Strangler Fig, sistemas distribuídos', canonicalPath: '/learn/pt/microservicos-e-padroes-de-integracao', pageType: 'article', imagePath: '/assets/learn/microservices-integration-patterns-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Domínios autônomos integrados por APIs, eventos, sagas, outbox e observabilidade', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Microservices','Integration Patterns','Bounded Context','Saga','Transactional Outbox','CDC','CQRS','Event Sourcing','API Composition','Strangler Fig'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/microservicos-e-padroes-de-integracao',locale:'pt_BR'},{language:'en',path:'/learn/en/microservices-and-integration-patterns',locale:'en_US'},{language:'es',path:'/learn/es/microservicios-y-patrones-de-integracion',locale:'es_ES'},{language:'x-default',path:'/learn/en/microservices-and-integration-patterns'}]
  },
  learnMicroservicesEnglish: {
    title: 'Microservices and Integration Patterns', description: 'Learn microservices, bounded contexts, Saga, Transactional Outbox, CDC, idempotency, CQRS, Event Sourcing, resilience, observability, and Strangler Fig.', keywords: 'microservices, integration patterns, bounded context, Saga, Transactional Outbox, CDC, idempotency, CQRS, Event Sourcing, API Composition, Strangler Fig, distributed systems', canonicalPath: '/learn/en/microservices-and-integration-patterns', pageType: 'article', imagePath: '/assets/learn/microservices-integration-patterns-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Autonomous domains integrated through APIs, events, sagas, outbox, and observability', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Microservices','Integration Patterns','Bounded Context','Saga','Transactional Outbox','CDC','CQRS','Event Sourcing','API Composition','Strangler Fig'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/microservicos-e-padroes-de-integracao',locale:'pt_BR'},{language:'en',path:'/learn/en/microservices-and-integration-patterns',locale:'en_US'},{language:'es',path:'/learn/es/microservicios-y-patrones-de-integracion',locale:'es_ES'},{language:'x-default',path:'/learn/en/microservices-and-integration-patterns'}]
  },
  learnMicroservicesSpanish: {
    title: 'Microservicios y Patrones de Integración', description: 'Aprende microservicios, bounded contexts, Saga, Transactional Outbox, CDC, idempotencia, CQRS, Event Sourcing, resiliencia, observabilidad y Strangler Fig.', keywords: 'microservicios, patrones de integración, bounded context, Saga, Transactional Outbox, CDC, idempotencia, CQRS, Event Sourcing, API Composition, Strangler Fig, sistemas distribuidos', canonicalPath: '/learn/es/microservicios-y-patrones-de-integracion', pageType: 'article', imagePath: '/assets/learn/microservices-integration-patterns-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Dominios autónomos integrados mediante APIs, eventos, sagas, outbox y observabilidad', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Microservices','Integration Patterns','Bounded Context','Saga','Transactional Outbox','CDC','CQRS','Event Sourcing','API Composition','Strangler Fig'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/microservicos-e-padroes-de-integracao',locale:'pt_BR'},{language:'en',path:'/learn/en/microservices-and-integration-patterns',locale:'en_US'},{language:'es',path:'/learn/es/microservicios-y-patrones-de-integracion',locale:'es_ES'},{language:'x-default',path:'/learn/en/microservices-and-integration-patterns'}]
  },
  learnMessagingPortuguese: {
    title: 'Mensageria: Kafka, RabbitMQ, AMQP e JMS', description: 'Aprenda mensageria com Kafka, RabbitMQ, AMQP e JMS: filas, logs, partições, entrega, ordering, replay, exchanges, DLQ, segurança e troubleshooting.', keywords: 'mensageria, Kafka, RabbitMQ, AMQP, JMS, Jakarta Messaging, filas, event streaming, consumer groups, exchanges, acknowledgements, DLQ, replay, distributed messaging', canonicalPath: '/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms', pageType: 'article', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Broker corporativo distribuindo mensagens duráveis entre produtores, partições, filas e consumidores', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Messaging','Kafka','RabbitMQ','AMQP','JMS','Jakarta Messaging','Consumer Groups','Exchanges','DLQ','Event Streaming'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms',locale:'pt_BR'},{language:'en',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms',locale:'en_US'},{language:'es',path:'/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms',locale:'es_ES'},{language:'x-default',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms'}]
  },
  learnMessagingEnglish: {
    title: 'Messaging: Kafka, RabbitMQ, AMQP, and JMS', description: 'Learn messaging with Kafka, RabbitMQ, AMQP, and JMS: queues, logs, partitions, delivery, ordering, replay, exchanges, DLQ, security, and troubleshooting.', keywords: 'messaging, Kafka, RabbitMQ, AMQP, JMS, Jakarta Messaging, queues, event streaming, consumer groups, exchanges, acknowledgements, DLQ, replay, distributed messaging', canonicalPath: '/learn/en/messaging-kafka-rabbitmq-amqp-and-jms', pageType: 'article', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Enterprise broker distributing durable messages across producers, partitions, queues, and consumers', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Messaging','Kafka','RabbitMQ','AMQP','JMS','Jakarta Messaging','Consumer Groups','Exchanges','DLQ','Event Streaming'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms',locale:'pt_BR'},{language:'en',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms',locale:'en_US'},{language:'es',path:'/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms',locale:'es_ES'},{language:'x-default',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms'}]
  },
  learnMessagingSpanish: {
    title: 'Mensajería: Kafka, RabbitMQ, AMQP y JMS', description: 'Aprende mensajería con Kafka, RabbitMQ, AMQP y JMS: colas, logs, particiones, entrega, ordering, replay, exchanges, DLQ, seguridad y troubleshooting.', keywords: 'mensajería, Kafka, RabbitMQ, AMQP, JMS, Jakarta Messaging, colas, event streaming, consumer groups, exchanges, acknowledgements, DLQ, replay, mensajería distribuida', canonicalPath: '/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms', pageType: 'article', imagePath: '/assets/learn/messaging-kafka-rabbitmq-amqp-jms-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Broker corporativo distribuyendo mensajes duraderos entre productores, particiones, colas y consumidores', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Messaging','Kafka','RabbitMQ','AMQP','JMS','Jakarta Messaging','Consumer Groups','Exchanges','DLQ','Event Streaming'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms',locale:'pt_BR'},{language:'en',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms',locale:'en_US'},{language:'es',path:'/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms',locale:'es_ES'},{language:'x-default',path:'/learn/en/messaging-kafka-rabbitmq-amqp-and-jms'}]
  },
  learnObservabilityPortuguese: {
    title: 'Observabilidade: Logs, Métricas e Tracing com OpenTelemetry', description: 'Aprenda observabilidade para APIs com logs estruturados, métricas, tracing distribuído, OpenTelemetry, OTLP, Collector, sampling, exemplars, SLI e SLO.', keywords: 'observabilidade, OpenTelemetry, OTLP, logs estruturados, métricas, tracing distribuído, traces, spans, Collector, semantic conventions, sampling, exemplars, SLI, SLO, API observability', canonicalPath: '/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry', pageType: 'article', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma de observabilidade correlacionando logs, métricas e traces de serviços distribuídos', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Observability','OpenTelemetry','OTLP','Logs','Metrics','Distributed Tracing','Collector','Sampling','Exemplars','SLO'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry',locale:'pt_BR'},{language:'en',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry',locale:'en_US'},{language:'es',path:'/learn/es/observabilidad-logs-metricas-tracing-opentelemetry',locale:'es_ES'},{language:'x-default',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry'}]
  },
  learnObservabilityEnglish: {
    title: 'Observability: Logs, Metrics, and Tracing with OpenTelemetry', description: 'Learn API observability with structured logs, metrics, distributed tracing, OpenTelemetry, OTLP, Collector, sampling, exemplars, SLIs, and SLOs.', keywords: 'observability, OpenTelemetry, OTLP, structured logs, metrics, distributed tracing, traces, spans, Collector, semantic conventions, sampling, exemplars, SLI, SLO, API observability', canonicalPath: '/learn/en/observability-logs-metrics-tracing-opentelemetry', pageType: 'article', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Observability platform correlating logs, metrics, and traces from distributed services', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Observability','OpenTelemetry','OTLP','Logs','Metrics','Distributed Tracing','Collector','Sampling','Exemplars','SLO'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry',locale:'pt_BR'},{language:'en',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry',locale:'en_US'},{language:'es',path:'/learn/es/observabilidad-logs-metricas-tracing-opentelemetry',locale:'es_ES'},{language:'x-default',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry'}]
  },
  learnObservabilitySpanish: {
    title: 'Observabilidad: Logs, Métricas y Tracing con OpenTelemetry', description: 'Aprende observabilidad para APIs con logs estructurados, métricas, tracing distribuido, OpenTelemetry, OTLP, Collector, sampling, exemplars, SLI y SLO.', keywords: 'observabilidad, OpenTelemetry, OTLP, logs estructurados, métricas, tracing distribuido, traces, spans, Collector, semantic conventions, sampling, exemplars, SLI, SLO, observabilidad de APIs', canonicalPath: '/learn/es/observabilidad-logs-metricas-tracing-opentelemetry', pageType: 'article', imagePath: '/assets/learn/observability-logs-metrics-tracing-opentelemetry-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma de observabilidad correlacionando logs, métricas y traces de servicios distribuidos', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Observability','OpenTelemetry','OTLP','Logs','Metrics','Distributed Tracing','Collector','Sampling','Exemplars','SLO'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry',locale:'pt_BR'},{language:'en',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry',locale:'en_US'},{language:'es',path:'/learn/es/observabilidad-logs-metricas-tracing-opentelemetry',locale:'es_ES'},{language:'x-default',path:'/learn/en/observability-logs-metrics-tracing-opentelemetry'}]
  },
  learnKubernetesPortuguese: {
    title: 'Kubernetes para APIs', description: 'Aprenda Kubernetes para APIs: Pods, Deployments, Services, Gateway API, probes, autoscaling, scheduling, segurança, observabilidade, GitOps e troubleshooting.', keywords: 'Kubernetes para APIs, Pods, Deployments, Services, Gateway API, probes, HPA, autoscaling, scheduling, RBAC, NetworkPolicy, GitOps, troubleshooting Kubernetes', canonicalPath: '/learn/pt/kubernetes-para-apis', pageType: 'article', imagePath: '/assets/learn/kubernetes-for-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Cluster Kubernetes executando APIs com roteamento, segurança, autoscaling e observabilidade', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Kubernetes','APIs','Pods','Deployments','Services','Gateway API','Autoscaling','RBAC','GitOps','Observability'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/kubernetes-para-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/kubernetes-for-apis',locale:'en_US'},{language:'es',path:'/learn/es/kubernetes-para-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/kubernetes-for-apis'}]
  },
  learnKubernetesEnglish: {
    title: 'Kubernetes for APIs', description: 'Learn Kubernetes for APIs: Pods, Deployments, Services, Gateway API, probes, autoscaling, scheduling, security, observability, GitOps, and troubleshooting.', keywords: 'Kubernetes for APIs, Pods, Deployments, Services, Gateway API, probes, HPA, autoscaling, scheduling, RBAC, NetworkPolicy, GitOps, Kubernetes troubleshooting', canonicalPath: '/learn/en/kubernetes-for-apis', pageType: 'article', imagePath: '/assets/learn/kubernetes-for-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Kubernetes cluster running APIs with routing, security, autoscaling, and observability', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Kubernetes','APIs','Pods','Deployments','Services','Gateway API','Autoscaling','RBAC','GitOps','Observability'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/kubernetes-para-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/kubernetes-for-apis',locale:'en_US'},{language:'es',path:'/learn/es/kubernetes-para-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/kubernetes-for-apis'}]
  },
  learnKubernetesSpanish: {
    title: 'Kubernetes para APIs', description: 'Aprende Kubernetes para APIs: Pods, Deployments, Services, Gateway API, probes, autoscaling, scheduling, seguridad, observabilidad, GitOps y troubleshooting.', keywords: 'Kubernetes para APIs, Pods, Deployments, Services, Gateway API, probes, HPA, autoscaling, scheduling, RBAC, NetworkPolicy, GitOps, troubleshooting Kubernetes', canonicalPath: '/learn/es/kubernetes-para-apis', pageType: 'article', imagePath: '/assets/learn/kubernetes-for-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Cluster Kubernetes ejecutando APIs con enrutamiento, seguridad, autoscaling y observabilidad', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Kubernetes','APIs','Pods','Deployments','Services','Gateway API','Autoscaling','RBAC','GitOps','Observability'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/kubernetes-para-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/kubernetes-for-apis',locale:'en_US'},{language:'es',path:'/learn/es/kubernetes-para-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/kubernetes-for-apis'}]
  },
  learnZeroTrustPortuguese: {
    title: 'Zero Trust aplicado a APIs', description: 'Aprenda Zero Trust para APIs: identidade, contexto, decisão por requisição, PDP, PEP, mTLS, prova de posse, policy-as-code, microsegmentação e risco.', keywords: 'Zero Trust APIs, NIST SP 800-207, PDP, PEP, policy engine, identidade de workload, mTLS, DPoP, proof of possession, policy-as-code, microsegmentação, API Gateway', canonicalPath: '/learn/pt/zero-trust-aplicado-a-apis', pageType: 'article', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitetura Zero Trust avaliando identidade, risco e políticas antes de liberar acesso a APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Zero Trust','APIs','NIST','PDP','PEP','mTLS','DPoP','Policy as Code','Microsegmentation','Adaptive Risk'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/zero-trust-aplicado-a-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/zero-trust-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/zero-trust-aplicado-a-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/zero-trust-applied-to-apis'}]
  },
  learnZeroTrustEnglish: {
    title: 'Zero Trust Applied to APIs', description: 'Learn Zero Trust for APIs: identity, context, per-request decisions, PDP, PEP, mTLS, proof of possession, policy-as-code, microsegmentation, and risk.', keywords: 'Zero Trust APIs, NIST SP 800-207, PDP, PEP, policy engine, workload identity, mTLS, DPoP, proof of possession, policy-as-code, microsegmentation, API Gateway', canonicalPath: '/learn/en/zero-trust-applied-to-apis', pageType: 'article', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Zero Trust architecture evaluating identity, risk, and policies before granting API access', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Zero Trust','APIs','NIST','PDP','PEP','mTLS','DPoP','Policy as Code','Microsegmentation','Adaptive Risk'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/zero-trust-aplicado-a-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/zero-trust-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/zero-trust-aplicado-a-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/zero-trust-applied-to-apis'}]
  },
  learnZeroTrustSpanish: {
    title: 'Zero Trust aplicado a APIs', description: 'Aprende Zero Trust para APIs: identidad, contexto, decisión por solicitud, PDP, PEP, mTLS, prueba de posesión, policy-as-code, microsegmentación y riesgo.', keywords: 'Zero Trust APIs, NIST SP 800-207, PDP, PEP, policy engine, identidad de workload, mTLS, DPoP, prueba de posesión, policy-as-code, microsegmentación, API Gateway', canonicalPath: '/learn/es/zero-trust-aplicado-a-apis', pageType: 'article', imagePath: '/assets/learn/zero-trust-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitectura Zero Trust evaluando identidad, riesgo y políticas antes de permitir acceso a APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Zero Trust','APIs','NIST','PDP','PEP','mTLS','DPoP','Policy as Code','Microsegmentation','Adaptive Risk'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/zero-trust-aplicado-a-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/zero-trust-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/zero-trust-aplicado-a-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/zero-trust-applied-to-apis'}]
  },
  learnOpenFinancePortuguese: {
    title: 'Open Finance e Open Banking no Brasil', description: 'Aprenda Open Finance Brasil: consentimento, participantes, FAPI-BR, OAuth, OIDC, mTLS, diretório, APIs de dados, iniciação de pagamentos, segurança e operação.', keywords: 'Open Finance Brasil, Open Banking Brasil, FAPI-BR, consentimento, OAuth 2.0, OpenID Connect, mTLS, iniciação de pagamentos, Pix, API Gateway, Banco Central', canonicalPath: '/learn/pt/open-finance-e-open-banking-no-brasil', pageType: 'article', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Ecossistema brasileiro de Open Finance conectando cliente, instituições, consentimento e APIs seguras', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Open Finance','Open Banking','Brazil','FAPI-BR','OAuth','OIDC','mTLS','Consent','Pix','Payment Initiation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/open-finance-e-open-banking-no-brasil',locale:'pt_BR'},{language:'en',path:'/learn/en/open-finance-and-open-banking-in-brazil',locale:'en_US'},{language:'es',path:'/learn/es/open-finance-y-open-banking-en-brasil',locale:'es_ES'},{language:'x-default',path:'/learn/en/open-finance-and-open-banking-in-brazil'}]
  },
  learnOpenFinanceEnglish: {
    title: 'Open Finance and Open Banking in Brazil', description: 'Learn Open Finance Brazil: consent, participants, FAPI-BR, OAuth, OIDC, mTLS, directory, data APIs, payment initiation, security, and operations.', keywords: 'Open Finance Brazil, Open Banking Brazil, FAPI-BR, consent, OAuth 2.0, OpenID Connect, mTLS, payment initiation, Pix, API Gateway, Central Bank of Brazil', canonicalPath: '/learn/en/open-finance-and-open-banking-in-brazil', pageType: 'article', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Brazilian Open Finance ecosystem connecting customers, institutions, consent, and secure APIs', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Open Finance','Open Banking','Brazil','FAPI-BR','OAuth','OIDC','mTLS','Consent','Pix','Payment Initiation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/open-finance-e-open-banking-no-brasil',locale:'pt_BR'},{language:'en',path:'/learn/en/open-finance-and-open-banking-in-brazil',locale:'en_US'},{language:'es',path:'/learn/es/open-finance-y-open-banking-en-brasil',locale:'es_ES'},{language:'x-default',path:'/learn/en/open-finance-and-open-banking-in-brazil'}]
  },
  learnOpenFinanceSpanish: {
    title: 'Open Finance y Open Banking en Brasil', description: 'Aprende Open Finance Brasil: consentimiento, participantes, FAPI-BR, OAuth, OIDC, mTLS, directorio, APIs de datos, iniciación de pagos, seguridad y operación.', keywords: 'Open Finance Brasil, Open Banking Brasil, FAPI-BR, consentimiento, OAuth 2.0, OpenID Connect, mTLS, iniciación de pagos, Pix, API Gateway, Banco Central de Brasil', canonicalPath: '/learn/es/open-finance-y-open-banking-en-brasil', pageType: 'article', imagePath: '/assets/learn/open-finance-open-banking-brazil-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Ecosistema brasileño de Open Finance conectando clientes, instituciones, consentimiento y APIs seguras', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Open Finance','Open Banking','Brazil','FAPI-BR','OAuth','OIDC','mTLS','Consent','Pix','Payment Initiation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/open-finance-e-open-banking-no-brasil',locale:'pt_BR'},{language:'en',path:'/learn/en/open-finance-and-open-banking-in-brazil',locale:'en_US'},{language:'es',path:'/learn/es/open-finance-y-open-banking-en-brasil',locale:'es_ES'},{language:'x-default',path:'/learn/en/open-finance-and-open-banking-in-brazil'}]
  },
  learnLgpdPortuguese: {
    title: 'LGPD aplicada às APIs', description: 'Aprenda LGPD para APIs: dados pessoais, princípios, bases legais, minimização, direitos dos titulares, retenção, privacy by design, incidentes e governança.', keywords: 'LGPD APIs, proteção de dados, dados pessoais, bases legais, minimização, direitos dos titulares, privacy by design, RIPD, ANPD, retenção, segurança, governança', canonicalPath: '/learn/pt/lgpd-aplicada-as-apis', pageType: 'article', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Ciclo de vida de dados pessoais protegido por controles de privacidade, segurança e governança', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['LGPD','APIs','Data Protection','Privacy by Design','Data Minimization','ANPD','Data Subject Rights','Retention','Security','Governance'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/lgpd-aplicada-as-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/lgpd-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/lgpd-aplicada-a-las-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/lgpd-applied-to-apis'}]
  },
  learnLgpdEnglish: {
    title: 'LGPD Applied to APIs', description: 'Learn LGPD for APIs: personal data, principles, legal bases, minimization, data subject rights, retention, privacy by design, incidents, and governance.', keywords: 'LGPD APIs, data protection, personal data, legal bases, minimization, data subject rights, privacy by design, DPIA, ANPD, retention, security, governance', canonicalPath: '/learn/en/lgpd-applied-to-apis', pageType: 'article', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Personal data lifecycle protected by privacy, security, and governance controls', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['LGPD','APIs','Data Protection','Privacy by Design','Data Minimization','ANPD','Data Subject Rights','Retention','Security','Governance'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/lgpd-aplicada-as-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/lgpd-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/lgpd-aplicada-a-las-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/lgpd-applied-to-apis'}]
  },
  learnLgpdSpanish: {
    title: 'LGPD aplicada a las APIs', description: 'Aprende LGPD para APIs: datos personales, principios, bases legales, minimización, derechos de los titulares, retención, privacy by design, incidentes y gobernanza.', keywords: 'LGPD APIs, protección de datos, datos personales, bases legales, minimización, derechos de los titulares, privacy by design, DPIA, ANPD, retención, seguridad, gobernanza', canonicalPath: '/learn/es/lgpd-aplicada-a-las-apis', pageType: 'article', imagePath: '/assets/learn/lgpd-applied-to-apis-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Ciclo de vida de datos personales protegido por controles de privacidad, seguridad y gobernanza', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['LGPD','APIs','Data Protection','Privacy by Design','Data Minimization','ANPD','Data Subject Rights','Retention','Security','Governance'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/lgpd-aplicada-as-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/lgpd-applied-to-apis',locale:'en_US'},{language:'es',path:'/learn/es/lgpd-aplicada-a-las-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/lgpd-applied-to-apis'}]
  },
  learnHighAvailabilityPortuguese: {
    title: 'Arquiteturas bancárias de alta disponibilidade', description: 'Aprenda a projetar operações bancárias resilientes com tolerância à disrupção, RTO, RPO, redundância, consistência, failover, reconciliação e disaster recovery.', keywords: 'arquitetura bancária alta disponibilidade, resiliência operacional, RTO, RPO, active-active, active-passive, disaster recovery, failover, consistência, idempotência, reconciliação, APIs bancárias', canonicalPath: '/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade', pageType: 'article', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitetura bancária resiliente com redundância e continuidade transacional', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['High Availability','Banking Architecture','Operational Resilience','RTO','RPO','Active-Active','Disaster Recovery','Failover','Idempotency','Reconciliation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade',locale:'pt_BR'},{language:'en',path:'/learn/en/high-availability-banking-architectures',locale:'en_US'},{language:'es',path:'/learn/es/arquitecturas-bancarias-de-alta-disponibilidad',locale:'es_ES'},{language:'x-default',path:'/learn/en/high-availability-banking-architectures'}]
  },
  learnHighAvailabilityEnglish: {
    title: 'High-Availability Banking Architectures', description: 'Learn how to design resilient banking operations with disruption tolerance, RTO, RPO, redundancy, consistency, failover, reconciliation, and disaster recovery.', keywords: 'high availability banking architecture, operational resilience, RTO, RPO, active-active, active-passive, disaster recovery, failover, consistency, idempotency, reconciliation, banking APIs', canonicalPath: '/learn/en/high-availability-banking-architectures', pageType: 'article', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Resilient banking architecture with redundancy and transactional continuity', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['High Availability','Banking Architecture','Operational Resilience','RTO','RPO','Active-Active','Disaster Recovery','Failover','Idempotency','Reconciliation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade',locale:'pt_BR'},{language:'en',path:'/learn/en/high-availability-banking-architectures',locale:'en_US'},{language:'es',path:'/learn/es/arquitecturas-bancarias-de-alta-disponibilidad',locale:'es_ES'},{language:'x-default',path:'/learn/en/high-availability-banking-architectures'}]
  },
  learnHighAvailabilitySpanish: {
    title: 'Arquitecturas bancarias de alta disponibilidad', description: 'Aprende a diseñar operaciones bancarias resilientes con tolerancia a la disrupción, RTO, RPO, redundancia, consistencia, failover, conciliación y disaster recovery.', keywords: 'arquitectura bancaria alta disponibilidad, resiliencia operativa, RTO, RPO, active-active, active-passive, disaster recovery, failover, consistencia, idempotencia, conciliación, APIs bancarias', canonicalPath: '/learn/es/arquitecturas-bancarias-de-alta-disponibilidad', pageType: 'article', imagePath: '/assets/learn/high-availability-banking-architectures-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Arquitectura bancaria resiliente con redundancia y continuidad transaccional', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['High Availability','Banking Architecture','Operational Resilience','RTO','RPO','Active-Active','Disaster Recovery','Failover','Idempotency','Reconciliation'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade',locale:'pt_BR'},{language:'en',path:'/learn/en/high-availability-banking-architectures',locale:'en_US'},{language:'es',path:'/learn/es/arquitecturas-bancarias-de-alta-disponibilidad',locale:'es_ES'},{language:'x-default',path:'/learn/en/high-availability-banking-architectures'}]
  },
  learnTroubleshootingPortuguese: {
    title: 'Troubleshooting de APIs e Gateways', description: 'Aprenda troubleshooting de APIs e API Gateways com hipóteses, evidências, diagnóstico por camadas, rede, TLS, HTTP, policies, observabilidade e resposta a incidentes.', keywords: 'troubleshooting APIs, API Gateway, diagnóstico APIs, causa raiz, DNS, TCP, TLS, mTLS, HTTP, policies, timeout, Kubernetes, OpenTelemetry, logs, métricas, tracing, incidentes', canonicalPath: '/learn/pt/troubleshooting-de-apis-e-gateways', pageType: 'article', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Diagnóstico de APIs e gateways localizando uma falha distribuída', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['API Troubleshooting','API Gateway','Root Cause Analysis','DNS','TCP','TLS','HTTP','Kubernetes','OpenTelemetry','Incident Response'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/troubleshooting-de-apis-e-gateways',locale:'pt_BR'},{language:'en',path:'/learn/en/api-and-gateway-troubleshooting',locale:'en_US'},{language:'es',path:'/learn/es/troubleshooting-de-apis-y-gateways',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-and-gateway-troubleshooting'}]
  },
  learnTroubleshootingEnglish: {
    title: 'API and Gateway Troubleshooting', description: 'Learn API and API Gateway troubleshooting through hypotheses, evidence, layered diagnostics, networking, TLS, HTTP, policies, observability, and incident response.', keywords: 'API troubleshooting, API Gateway, API diagnostics, root cause analysis, DNS, TCP, TLS, mTLS, HTTP, policies, timeout, Kubernetes, OpenTelemetry, logs, metrics, tracing, incidents', canonicalPath: '/learn/en/api-and-gateway-troubleshooting', pageType: 'article', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'API and gateway diagnostics locating a distributed failure', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['API Troubleshooting','API Gateway','Root Cause Analysis','DNS','TCP','TLS','HTTP','Kubernetes','OpenTelemetry','Incident Response'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/troubleshooting-de-apis-e-gateways',locale:'pt_BR'},{language:'en',path:'/learn/en/api-and-gateway-troubleshooting',locale:'en_US'},{language:'es',path:'/learn/es/troubleshooting-de-apis-y-gateways',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-and-gateway-troubleshooting'}]
  },
  learnTroubleshootingSpanish: {
    title: 'Troubleshooting de APIs y Gateways', description: 'Aprende troubleshooting de APIs y API Gateways mediante hipótesis, evidencias, diagnóstico por capas, red, TLS, HTTP, policies, observabilidad y respuesta a incidentes.', keywords: 'troubleshooting APIs, API Gateway, diagnóstico APIs, causa raíz, DNS, TCP, TLS, mTLS, HTTP, policies, timeout, Kubernetes, OpenTelemetry, logs, métricas, tracing, incidentes', canonicalPath: '/learn/es/troubleshooting-de-apis-y-gateways', pageType: 'article', imagePath: '/assets/learn/api-gateway-troubleshooting-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Diagnóstico de APIs y gateways localizando un fallo distribuido', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['API Troubleshooting','API Gateway','Root Cause Analysis','DNS','TCP','TLS','HTTP','Kubernetes','OpenTelemetry','Incident Response'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/troubleshooting-de-apis-e-gateways',locale:'pt_BR'},{language:'en',path:'/learn/en/api-and-gateway-troubleshooting',locale:'en_US'},{language:'es',path:'/learn/es/troubleshooting-de-apis-y-gateways',locale:'es_ES'},{language:'x-default',path:'/learn/en/api-and-gateway-troubleshooting'}]
  },
  learnCaseStudiesPortuguese: {
    title: 'Estudo de casos reais de grandes empresas', description: 'Analise casos de Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub e Spotify sobre gateways, APIs, confiabilidade, mensageria e plataformas.', keywords: 'casos reais arquitetura APIs, Netflix Zuul, AWS retries, Stripe APIs, Shopify GraphQL, LinkedIn Kafka, Google SRE gRPC, GitHub OpenAPI, Spotify Backstage', canonicalPath: '/learn/pt/estudo-de-casos-reais-de-grandes-empresas', pageType: 'article', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Casos reais de arquitetura convergindo para padrões governados', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['Case Studies','Netflix','AWS','Stripe','Shopify','LinkedIn','Google','GitHub','Spotify','Distributed Systems'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/estudo-de-casos-reais-de-grandes-empresas',locale:'pt_BR'},{language:'en',path:'/learn/en/real-world-case-studies-from-large-enterprises',locale:'en_US'},{language:'es',path:'/learn/es/estudio-de-casos-reales-de-grandes-empresas',locale:'es_ES'},{language:'x-default',path:'/learn/en/real-world-case-studies-from-large-enterprises'}]
  },
  learnCaseStudiesEnglish: {
    title: 'Real-World Case Studies from Large Enterprises', description: 'Analyze Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub, and Spotify cases involving gateways, APIs, reliability, messaging, and platforms.', keywords: 'real-world API architecture cases, Netflix Zuul, AWS retries, Stripe APIs, Shopify GraphQL, LinkedIn Kafka, Google SRE gRPC, GitHub OpenAPI, Spotify Backstage', canonicalPath: '/learn/en/real-world-case-studies-from-large-enterprises', pageType: 'article', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Real-world architecture cases converging into governed patterns', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['Case Studies','Netflix','AWS','Stripe','Shopify','LinkedIn','Google','GitHub','Spotify','Distributed Systems'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/estudo-de-casos-reais-de-grandes-empresas',locale:'pt_BR'},{language:'en',path:'/learn/en/real-world-case-studies-from-large-enterprises',locale:'en_US'},{language:'es',path:'/learn/es/estudio-de-casos-reales-de-grandes-empresas',locale:'es_ES'},{language:'x-default',path:'/learn/en/real-world-case-studies-from-large-enterprises'}]
  },
  learnCaseStudiesSpanish: {
    title: 'Estudio de casos reales de grandes empresas', description: 'Analiza casos de Netflix, Amazon, Stripe, Shopify, LinkedIn, Google, GitHub y Spotify sobre gateways, APIs, confiabilidad, mensajería y plataformas.', keywords: 'casos reales arquitectura APIs, Netflix Zuul, AWS retries, Stripe APIs, Shopify GraphQL, LinkedIn Kafka, Google SRE gRPC, GitHub OpenAPI, Spotify Backstage', canonicalPath: '/learn/es/estudio-de-casos-reales-de-grandes-empresas', pageType: 'article', imagePath: '/assets/learn/real-world-enterprise-case-studies-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Casos reales de arquitectura convergiendo en patrones gobernados', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['Case Studies','Netflix','AWS','Stripe','Shopify','LinkedIn','Google','GitHub','Spotify','Distributed Systems'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/estudo-de-casos-reais-de-grandes-empresas',locale:'pt_BR'},{language:'en',path:'/learn/en/real-world-case-studies-from-large-enterprises',locale:'en_US'},{language:'es',path:'/learn/es/estudio-de-casos-reales-de-grandes-empresas',locale:'es_ES'},{language:'x-default',path:'/learn/en/real-world-case-studies-from-large-enterprises'}]
  },
  learnCapstonePortuguese: {
    title: 'Projeto final: plataforma completa de APIs', description: 'Construa uma plataforma completa de APIs com OpenAPI, OAuth, gateway, microserviços, mensageria, Kubernetes, observabilidade, CI/CD, resiliência e governança.', keywords: 'projeto final APIs, plataforma API completa, OpenAPI, OAuth, API Gateway, microserviços, Kafka, Kubernetes, OpenTelemetry, CI/CD, alta disponibilidade, arquitetura corporativa', canonicalPath: '/learn/pt/projeto-final-plataforma-completa-de-apis', pageType: 'article', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma completa de APIs integrada de ponta a ponta', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos e Arquitetura de APIs Corporativas', language: 'pt-BR', locale: 'pt_BR', tags: ['API Platform','Capstone','OpenAPI','OAuth','API Gateway','Microservices','Kubernetes','OpenTelemetry','CI/CD','Resilience'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/projeto-final-plataforma-completa-de-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/complete-api-platform-capstone-project',locale:'en_US'},{language:'es',path:'/learn/es/proyecto-final-plataforma-completa-de-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/complete-api-platform-capstone-project'}]
  },
  learnCapstoneEnglish: {
    title: 'Capstone Project: Building a Complete API Platform', description: 'Build a complete API platform with OpenAPI, OAuth, gateways, microservices, messaging, Kubernetes, observability, CI/CD, resilience, and governance.', keywords: 'API capstone project, complete API platform, OpenAPI, OAuth, API Gateway, microservices, Kafka, Kubernetes, OpenTelemetry, CI/CD, high availability, enterprise architecture', canonicalPath: '/learn/en/complete-api-platform-capstone-project', pageType: 'article', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Complete end-to-end integrated API platform', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Corporate API Fundamentals and Architecture', language: 'en', locale: 'en_US', tags: ['API Platform','Capstone','OpenAPI','OAuth','API Gateway','Microservices','Kubernetes','OpenTelemetry','CI/CD','Resilience'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/projeto-final-plataforma-completa-de-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/complete-api-platform-capstone-project',locale:'en_US'},{language:'es',path:'/learn/es/proyecto-final-plataforma-completa-de-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/complete-api-platform-capstone-project'}]
  },
  learnCapstoneSpanish: {
    title: 'Proyecto final: construyendo una plataforma completa de APIs', description: 'Construye una plataforma completa de APIs con OpenAPI, OAuth, gateway, microservicios, mensajería, Kubernetes, observabilidad, CI/CD, resiliencia y gobernanza.', keywords: 'proyecto final APIs, plataforma API completa, OpenAPI, OAuth, API Gateway, microservicios, Kafka, Kubernetes, OpenTelemetry, CI/CD, alta disponibilidad, arquitectura empresarial', canonicalPath: '/learn/es/proyecto-final-plataforma-completa-de-apis', pageType: 'article', imagePath: '/assets/learn/complete-api-platform-capstone-cover.png', imageWidth: 1536, imageHeight: 1024, imageAlt: 'Plataforma completa de APIs integrada de extremo a extremo', publishedTime: '2026-07-21T00:00:00-03:00', modifiedTime: '2026-07-21T00:00:00-03:00', author: 'João Ricardo Dutra', section: 'Fundamentos y Arquitectura de APIs Corporativas', language: 'es', locale: 'es_ES', tags: ['API Platform','Capstone','OpenAPI','OAuth','API Gateway','Microservices','Kubernetes','OpenTelemetry','CI/CD','Resilience'], alternateLanguages: [{language:'pt-BR',path:'/learn/pt/projeto-final-plataforma-completa-de-apis',locale:'pt_BR'},{language:'en',path:'/learn/en/complete-api-platform-capstone-project',locale:'en_US'},{language:'es',path:'/learn/es/proyecto-final-plataforma-completa-de-apis',locale:'es_ES'},{language:'x-default',path:'/learn/en/complete-api-platform-capstone-project'}]
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
    description: 'Encode text to Base64 or decode Base64 back to readable text directly in your browser. Free and instant, with no sign-up — paste, convert and copy the result.',
    keywords: 'base64 encoder, base64 decoder, base64 encode online, base64 decode online, text to base64, base64 to text'
  },
  jsonEditor: {
    title: 'JSON Formatter, Minifier and Stringifier',
    description: 'Format, beautify, minify and stringify JSON online to make API responses and configuration files easier to read. Free JSON tools — no sign-up required.',
    keywords: 'json formatter, json beautifier, json minifier, json validator, json editor, stringify json, format json online'
  },
  jwtViewer: {
    title: 'JWT Decoder and Token Manipulator',
    description: 'Decode, inspect and edit JWT headers, payloads and signatures in your browser. Free JWT debugger for development and troubleshooting — no sign-up required.',
    keywords: 'jwt decoder, jwt debugger, json web token, jwt viewer, decode jwt, jwt token inspector, jwt manipulator'
  },
  jweViewer: {
    title: 'JWE Decoder and Token Manipulator',
    description: 'Inspect JWE tokens by splitting header, encrypted key, IV, ciphertext and authentication tag for secure debugging in your browser — free, with no sign-up.',
    keywords: 'jwe decoder, jwe debugger, json web encryption, encrypted jwt, jwe token, jwe viewer, jwe manipulator'
  },
  urlCodec: {
    title: 'URL Encoder and Decoder Online',
    description: 'Encode and decode URLs, query strings and percent-encoded text with UTF-8 support. Free online URL codec for developers — no sign-up, instant results.',
    keywords: 'url encoder, url decoder, percent encoding, url encode online, url decode online, query string encoder'
  },
  ocr: {
    title: 'Image to Text OCR Converter',
    description: 'Extract text from images with OCR directly in your browser. Upload a picture or screenshot and copy the recognized text — free and with no sign-up.',
    keywords: 'image to text, OCR online, image OCR, extract text from image, picture to text, tesseract ocr'
  },
  unixTimestamp: {
    title: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and dates back to epoch time in seconds or milliseconds. Free online epoch converter — no sign-up needed.',
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
    description: 'Create QR codes from text and URLs, customize colors and design, then download the image. Free online QR code generator — no sign-up needed.',
    keywords: 'qr code generator, text to qr code, url to qr code, create qr code, free qr code, qr code maker'
  },
  textEditor: {
    title: 'Online Text Editor and Text Cleaner',
    description: 'Clean, split, replace, sort and transform text online with quick formatting utilities. Free browser-based text editor and cleaner — no sign-up required.',
    keywords: 'text editor online, text cleaner, split text, replace text, sort lines, remove line breaks, text tools'
  },
  sharedText: {
    title: 'Real-Time Text Sharer',
    description: 'Share temporary text between screens in real time through a simple browser channel. Open it on two devices and sync instantly — free, with no sign-up.',
    keywords: 'share text online, real time text sharing, browser text share, shared clipboard, text sharer',
    canonicalPath: '/shared-text'
  },
  textTemplate: {
    title: 'Text Template Generator',
    description: 'Fill reusable text templates with variables to generate repeated messages, snippets and documents faster. Free online template generator — no sign-up.',
    keywords: 'text template, template generator, variable template, reusable text, text snippet generator'
  },
  x509Viewer: {
    title: 'X.509 Certificate Viewer and Decoder',
    description: 'Decode X.509 certificates and inspect issuer, subject, validity, public key, fingerprints and extensions in your browser. Free — no sign-up required.',
    keywords: 'x509 certificate decoder, certificate viewer, ssl certificate decoder, pem decoder, certificate parser'
  },
  x509Generator: {
    title: 'X.509 Key and Certificate Generator',
    description: 'Generate RSA keys and self-signed X.509 certificates for development and software testing directly in your browser. Free and with no sign-up required.',
    keywords: 'x509 certificate generator, self signed certificate, rsa key generator, certificate generator, pem certificate'
  },
  pdfMerger: {
    title: 'PDF and Image Merger Online',
    description: 'Merge multiple PDFs and images into a single PDF or image file, reorder pages and download the combined result. Free online PDF merger — no sign-up.',
    keywords: 'merge pdf, pdf merger, combine pdf, merge images to pdf, pdf and image merger, online pdf merger'
  },
  pdfSplitter: {
    title: 'PDF Splitter Online',
    description: 'Split PDF files into individual pages and download them as separate PDFs or JPG images in a ZIP. Free online PDF splitter — no sign-up required.',
    keywords: 'split pdf, pdf splitter, extract pdf pages, pdf to jpg pages, separate pdf, online pdf splitter'
  },
  pdfCreator: {
    title: 'Create PDF from Images Online',
    description: 'Arrange JPG, PNG and other images and create a single PDF locally in your browser. Free online PDF creator with reordering — no sign-up required.',
    keywords: 'create pdf from images, images to pdf, jpg to pdf, png to pdf, online pdf creator'
  },
  hashGenerator: {
    title: 'Hash Generator for MD5, SHA-1 and SHA-256',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text directly in your browser. Free online hash calculator — no sign-up required.',
    keywords: 'hash generator, md5 generator, sha256 generator, sha512 hash, sha1 hash, generate hash online'
  },
  textDiff: {
    title: 'Online Text Diff Checker',
    description: 'Compare two blocks of text and highlight line-by-line differences for code, documents and notes. Free online diff checker — no sign-up required.',
    keywords: 'text diff, diff checker, compare text online, text compare, difference checker, compare two texts'
  },
  uuidGenerator: {
    title: 'UUID Generator Online',
    description: 'Generate UUID v4, v7 and v1 identifiers with uppercase, lowercase, hyphen and bulk output options. Free online UUID generator — no sign-up required.',
    keywords: 'uuid generator, guid generator, uuid v4, uuid v7, uuid v1, generate uuid online, random uuid'
  },
  passwordGenerator: {
    title: 'Secure Password Generator',
    description: 'Generate strong random passwords with configurable length, uppercase, lowercase, numbers and symbols. Free secure password generator — no sign-up.',
    keywords: 'password generator, secure password generator, random password, strong password, generate password online'
  },
  hmacGenerator: {
    title: 'HMAC Generator Online',
    description: 'Generate HMAC signatures with SHA-256, SHA-384, SHA-512 and other algorithms using a secret key. Free online HMAC calculator — no sign-up required.',
    keywords: 'hmac generator, hmac sha256, hmac sha512, signature generator, message authentication code, hmac online'
  },
  cpfCnpjGenerator: {
    title: 'CPF and CNPJ Generator for Testing',
    description: 'Generate valid CPF and CNPJ numbers for Brazilian software testing, QA and form validation. Free test data generator — no sign-up required.',
    keywords: 'cpf generator, cnpj generator, cpf cnpj generator, brazil document generator, test cpf, test cnpj'
  },
  jsonYamlCompare: {
    title: 'JSON and YAML Comparator',
    description: 'Compare JSON and YAML files structurally to find missing fields and differing values side by side. Free online comparator — no sign-up required.',
    keywords: 'json compare, yaml compare, json diff, yaml diff, compare json online, compare yaml online, structural diff'
  },
  swaggerEditor: {
    title: 'Swagger Editor & OpenAPI Viewer with API Testing',
    description: 'Free online Swagger editor and OpenAPI viewer: edit YAML or JSON, convert between Swagger 2.0, OpenAPI 3.0 and 3.1, test endpoints and export HTML docs.',
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
  loadComponent: () => import('./articles/tool-article/tool-article.component').then((m) => m.ToolArticleComponent),
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
  { path: '', component: TblHomeComponent, data: { seo: seo.home } },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'tools', component: HomeComponent, data: { seo: seo.tools } },
  { path: 'about', loadComponent: () => import('./sobre/sobre.component').then((m) => m.SobreComponent), data: { seo: seo.about } },
  { path: 'articles', loadComponent: () => import('./articles/articles.component').then((m) => m.ArticlesComponent), data: { seo: seo.articles } },
  { path: 'learn', loadComponent: () => import('./learn/learn.component').then((m) => m.LearnComponent), data: { seo: seo.learn } },
  { path: 'learn/pt/fundamentos-da-internet-redes-e-apis', loadComponent: () => import('./learn/fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component').then((m) => m.FundamentosInternetRedesApisComponent), data: { seo: seo.learnFundamentosInternet } },
  { path: 'learn/en/internet-networking-api-fundamentals', loadComponent: () => import('./learn/fundamentals-internet-networks-apis/fundamentals-internet-networks-apis.component').then((m) => m.FundamentalsInternetNetworksApisComponent), data: { seo: seo.learnFundamentalsInternetEnglish } },
  { path: 'learn/es/fundamentos-internet-redes-apis', loadComponent: () => import('./learn/fundamentos-internet-redes-apis-es/fundamentos-internet-redes-apis-es.component').then((m) => m.FundamentosInternetRedesApisEsComponent), data: { seo: seo.learnFundamentosInternetSpanish } },
  { path: 'learn/pt/tcp-udp-portas-e-sockets', loadComponent: () => import('./learn/tcp-udp-portas-sockets/tcp-udp-portas-sockets.component').then((m) => m.TcpUdpPortasSocketsComponent), data: { seo: seo.learnTcpUdpPortuguese } },
  { path: 'learn/en/tcp-udp-ports-and-sockets', loadComponent: () => import('./learn/tcp-udp-ports-sockets/tcp-udp-ports-sockets.component').then((m) => m.TcpUdpPortsSocketsComponent), data: { seo: seo.learnTcpUdpEnglish } },
  { path: 'learn/es/tcp-udp-puertos-y-sockets', loadComponent: () => import('./learn/tcp-udp-puertos-sockets/tcp-udp-puertos-sockets.component').then((m) => m.TcpUdpPuertosSocketsComponent), data: { seo: seo.learnTcpUdpSpanish } },
  { path: 'learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento', loadComponent: () => import('./learn/enderecamento-ip-ipv4-ipv6/enderecamento-ip-ipv4-ipv6.component').then((m) => m.EnderecamentoIpIpv4Ipv6Component), data: { seo: seo.learnIpAddressingPortuguese } },
  { path: 'learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing', loadComponent: () => import('./learn/ip-addressing-ipv4-ipv6/ip-addressing-ipv4-ipv6.component').then((m) => m.IpAddressingIpv4Ipv6Component), data: { seo: seo.learnIpAddressingEnglish } },
  { path: 'learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento', loadComponent: () => import('./learn/direccionamiento-ip-ipv4-ipv6/direccionamiento-ip-ipv4-ipv6.component').then((m) => m.DireccionamientoIpIpv4Ipv6Component), data: { seo: seo.learnIpAddressingSpanish } },
  { path: 'learn/pt/dns-nat-proxies-e-balanceadores-de-carga', loadComponent: () => import('./learn/dns-nat-proxies-balanceadores/dns-nat-proxies-balanceadores.component').then((m) => m.DnsNatProxiesBalanceadoresComponent), data: { seo: seo.learnDnsNatPortuguese } },
  { path: 'learn/en/dns-nat-proxies-and-load-balancers', loadComponent: () => import('./learn/dns-nat-proxies-load-balancers/dns-nat-proxies-load-balancers.component').then((m) => m.DnsNatProxiesLoadBalancersComponent), data: { seo: seo.learnDnsNatEnglish } },
  { path: 'learn/es/dns-nat-proxies-y-balanceadores-de-carga', loadComponent: () => import('./learn/dns-nat-proxies-balanceadores-es/dns-nat-proxies-balanceadores-es.component').then((m) => m.DnsNatProxiesBalanceadoresEsComponent), data: { seo: seo.learnDnsNatSpanish } },
  { path: 'learn/pt/http-1-1-http-2-e-http-3', loadComponent: () => import('./learn/http-1-1-http-2-http-3-pt/http-1-1-http-2-http-3-pt.component').then((m) => m.Http11Http2Http3PtComponent), data: { seo: seo.learnHttpVersionsPortuguese } },
  { path: 'learn/en/http-1-1-http-2-and-http-3', loadComponent: () => import('./learn/http-1-1-http-2-http-3-en/http-1-1-http-2-http-3-en.component').then((m) => m.Http11Http2Http3EnComponent), data: { seo: seo.learnHttpVersionsEnglish } },
  { path: 'learn/es/http-1-1-http-2-y-http-3', loadComponent: () => import('./learn/http-1-1-http-2-http-3-es/http-1-1-http-2-http-3-es.component').then((m) => m.Http11Http2Http3EsComponent), data: { seo: seo.learnHttpVersionsSpanish } },
  { path: 'learn/pt/https-e-tls-em-profundidade', loadComponent: () => import('./learn/https-tls-em-profundidade-pt/https-tls-em-profundidade-pt.component').then((m) => m.HttpsTlsEmProfundidadePtComponent), data: { seo: seo.learnHttpsTlsPortuguese } },
  { path: 'learn/en/https-and-tls-in-depth', loadComponent: () => import('./learn/https-tls-in-depth-en/https-tls-in-depth-en.component').then((m) => m.HttpsTlsInDepthEnComponent), data: { seo: seo.learnHttpsTlsEnglish } },
  { path: 'learn/es/https-y-tls-en-profundidad', loadComponent: () => import('./learn/https-tls-en-profundidad-es/https-tls-en-profundidad-es.component').then((m) => m.HttpsTlsEnProfundidadEsComponent), data: { seo: seo.learnHttpsTlsSpanish } },
  { path: 'learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis', loadComponent: () => import('./learn/criptografia-fundamentos-aplicacoes-apis-pt/criptografia-fundamentos-aplicacoes-apis-pt.component').then((m) => m.CriptografiaFundamentosAplicacoesApisPtComponent), data: { seo: seo.learnCryptographyPortuguese } },
  { path: 'learn/en/cryptography-fundamentals-and-api-applications', loadComponent: () => import('./learn/cryptography-fundamentals-api-applications-en/cryptography-fundamentals-api-applications-en.component').then((m) => m.CryptographyFundamentalsApiApplicationsEnComponent), data: { seo: seo.learnCryptographyEnglish } },
  { path: 'learn/es/criptografia-fundamentos-y-aplicaciones-en-apis', loadComponent: () => import('./learn/criptografia-fundamentos-aplicaciones-apis-es/criptografia-fundamentos-aplicaciones-apis-es.component').then((m) => m.CriptografiaFundamentosAplicacionesApisEsComponent), data: { seo: seo.learnCryptographySpanish } },
  {
    path: 'learn/pt/certificados-digitais-pki-e-x509',
    loadComponent: () => import('./learn/certificados-digitais-pki-x509-pt/certificados-digitais-pki-x509-pt.component')
      .then((module) => module.CertificadosDigitaisPkiX509PtComponent),
    data: { seo: seo.learnCertificatesPortuguese }
  },
  {
    path: 'learn/en/digital-certificates-pki-and-x509',
    loadComponent: () => import('./learn/digital-certificates-pki-x509-en/digital-certificates-pki-x509-en.component')
      .then((module) => module.DigitalCertificatesPkiX509EnComponent),
    data: { seo: seo.learnCertificatesEnglish }
  },
  {
    path: 'learn/es/certificados-digitales-pki-y-x509',
    loadComponent: () => import('./learn/certificados-digitales-pki-x509-es/certificados-digitales-pki-x509-es.component')
      .then((module) => module.CertificadosDigitalesPkiX509EsComponent),
    data: { seo: seo.learnCertificatesSpanish }
  },
  {
    path: 'learn/pt/mtls-em-profundidade',
    loadComponent: () => import('./learn/mtls-em-profundidade-pt/mtls-em-profundidade-pt.component')
      .then((module) => module.MtlsEmProfundidadePtComponent),
    data: { seo: seo.learnMtlsPortuguese }
  },
  {
    path: 'learn/en/mtls-in-depth',
    loadComponent: () => import('./learn/mtls-in-depth-en/mtls-in-depth-en.component')
      .then((module) => module.MtlsInDepthEnComponent),
    data: { seo: seo.learnMtlsEnglish }
  },
  {
    path: 'learn/es/mtls-en-profundidad',
    loadComponent: () => import('./learn/mtls-en-profundidad-es/mtls-en-profundidad-es.component')
      .then((module) => module.MtlsEnProfundidadEsComponent),
    data: { seo: seo.learnMtlsSpanish }
  },
  {
    path: 'learn/pt/rest-arquitetura-e-boas-praticas',
    loadComponent: () => import('./learn/rest-arquitetura-boas-praticas-pt/rest-arquitetura-boas-praticas-pt.component')
      .then((module) => module.RestArquiteturaBoasPraticasPtComponent),
    data: { seo: seo.learnRestPortuguese }
  },
  {
    path: 'learn/en/rest-architecture-and-best-practices',
    loadComponent: () => import('./learn/rest-architecture-best-practices-en/rest-architecture-best-practices-en.component')
      .then((module) => module.RestArchitectureBestPracticesEnComponent),
    data: { seo: seo.learnRestEnglish }
  },
  {
    path: 'learn/es/rest-arquitectura-y-buenas-practicas',
    loadComponent: () => import('./learn/rest-arquitectura-buenas-practicas-es/rest-arquitectura-buenas-practicas-es.component')
      .then((module) => module.RestArquitecturaBuenasPracticasEsComponent),
    data: { seo: seo.learnRestSpanish }
  },
  {
    path: 'learn/pt/modelo-de-maturidade-rest-de-richardson',
    loadComponent: () => import('./learn/modelo-maturidade-rest-richardson-pt/modelo-maturidade-rest-richardson-pt.component')
      .then((module) => module.ModeloMaturidadeRestRichardsonPtComponent),
    data: { seo: seo.learnRichardsonPortuguese }
  },
  {
    path: 'learn/en/richardson-rest-maturity-model',
    loadComponent: () => import('./learn/richardson-rest-maturity-model-en/richardson-rest-maturity-model-en.component')
      .then((module) => module.RichardsonRestMaturityModelEnComponent),
    data: { seo: seo.learnRichardsonEnglish }
  },
  {
    path: 'learn/es/modelo-de-madurez-rest-de-richardson',
    loadComponent: () => import('./learn/modelo-madurez-rest-richardson-es/modelo-madurez-rest-richardson-es.component')
      .then((module) => module.ModeloMadurezRestRichardsonEsComponent),
    data: { seo: seo.learnRichardsonSpanish }
  },
  {
    path: 'learn/pt/openapi-swagger-contratos-documentacao-e-automacao',
    loadComponent: () => import('./learn/openapi-swagger-contratos-documentacao-automacao-pt/openapi-swagger-contratos-documentacao-automacao-pt.component')
      .then((module) => module.OpenApiSwaggerContratosDocumentacaoAutomacaoPtComponent),
    data: { seo: seo.learnOpenApiPortuguese }
  },
  {
    path: 'learn/en/openapi-swagger-contracts-documentation-and-automation',
    loadComponent: () => import('./learn/openapi-swagger-contracts-documentation-automation-en/openapi-swagger-contracts-documentation-automation-en.component')
      .then((module) => module.OpenApiSwaggerContractsDocumentationAutomationEnComponent),
    data: { seo: seo.learnOpenApiEnglish }
  },
  {
    path: 'learn/es/openapi-swagger-contratos-documentacion-y-automatizacion',
    loadComponent: () => import('./learn/openapi-swagger-contratos-documentacion-automatizacion-es/openapi-swagger-contratos-documentacion-automatizacion-es.component')
      .then((module) => module.OpenApiSwaggerContratosDocumentacionAutomatizacionEsComponent),
    data: { seo: seo.learnOpenApiSpanish }
  },
  {
    path: 'learn/pt/graphql-grpc-e-websocket',
    loadComponent: () => import('./learn/graphql-grpc-websocket-pt/graphql-grpc-websocket-pt.component')
      .then((module) => module.GraphqlGrpcWebsocketPtComponent),
    data: { seo: seo.learnGraphqlGrpcWebsocketPortuguese }
  },
  {
    path: 'learn/en/graphql-grpc-and-websocket',
    loadComponent: () => import('./learn/graphql-grpc-websocket-en/graphql-grpc-websocket-en.component')
      .then((module) => module.GraphqlGrpcWebsocketEnComponent),
    data: { seo: seo.learnGraphqlGrpcWebsocketEnglish }
  },
  {
    path: 'learn/es/graphql-grpc-y-websocket',
    loadComponent: () => import('./learn/graphql-grpc-websocket-es/graphql-grpc-websocket-es.component')
      .then((module) => module.GraphqlGrpcWebsocketEsComponent),
    data: { seo: seo.learnGraphqlGrpcWebsocketSpanish }
  },
  {
    path: 'learn/pt/autenticacao-x-autorizacao',
    loadComponent: () => import('./learn/autenticacao-autorizacao-pt/autenticacao-autorizacao-pt.component')
      .then((module) => module.AutenticacaoAutorizacaoPtComponent),
    data: { seo: seo.learnAuthenticationAuthorizationPortuguese }
  },
  {
    path: 'learn/en/authentication-vs-authorization',
    loadComponent: () => import('./learn/authentication-authorization-en/authentication-authorization-en.component')
      .then((module) => module.AuthenticationAuthorizationEnComponent),
    data: { seo: seo.learnAuthenticationAuthorizationEnglish }
  },
  {
    path: 'learn/es/autenticacion-vs-autorizacion',
    loadComponent: () => import('./learn/autenticacion-autorizacion-es/autenticacion-autorizacion-es.component')
      .then((module) => module.AutenticacionAutorizacionEsComponent),
    data: { seo: seo.learnAuthenticationAuthorizationSpanish }
  },
  {
    path: 'learn/pt/basic-auth-digest-e-api-keys',
    loadComponent: () => import('./learn/basic-auth-digest-api-keys-pt/basic-auth-digest-api-keys-pt.component')
      .then((module) => module.BasicAuthDigestApiKeysPtComponent),
    data: { seo: seo.learnBasicAuthDigestApiKeysPortuguese }
  },
  {
    path: 'learn/en/basic-auth-digest-and-api-keys',
    loadComponent: () => import('./learn/basic-auth-digest-api-keys-en/basic-auth-digest-api-keys-en.component')
      .then((module) => module.BasicAuthDigestApiKeysEnComponent),
    data: { seo: seo.learnBasicAuthDigestApiKeysEnglish }
  },
  {
    path: 'learn/es/basic-auth-digest-y-api-keys',
    loadComponent: () => import('./learn/basic-auth-digest-api-keys-es/basic-auth-digest-api-keys-es.component')
      .then((module) => module.BasicAuthDigestApiKeysEsComponent),
    data: { seo: seo.learnBasicAuthDigestApiKeysSpanish }
  },
  {
    path: 'learn/pt/oauth-2-fluxos-tokens-e-seguranca',
    loadComponent: () => import('./learn/oauth-2-fluxos-tokens-seguranca-pt/oauth-2-fluxos-tokens-seguranca-pt.component')
      .then((module) => module.OAuth2FluxosTokensSegurancaPtComponent),
    data: { seo: seo.learnOAuth2Portuguese }
  },
  {
    path: 'learn/en/oauth-2-flows-tokens-and-security',
    loadComponent: () => import('./learn/oauth-2-flows-tokens-security-en/oauth-2-flows-tokens-security-en.component')
      .then((module) => module.OAuth2FlowsTokensSecurityEnComponent),
    data: { seo: seo.learnOAuth2English }
  },
  {
    path: 'learn/es/oauth-2-flujos-tokens-y-seguridad',
    loadComponent: () => import('./learn/oauth-2-flujos-tokens-seguridad-es/oauth-2-flujos-tokens-seguridad-es.component')
      .then((module) => module.OAuth2FlujosTokensSeguridadEsComponent),
    data: { seo: seo.learnOAuth2Spanish }
  },
  {
    path: 'learn/pt/openid-connect-id-tokens-sessoes-e-federacao',
    loadComponent: () => import('./learn/openid-connect-id-tokens-sessoes-federacao-pt/openid-connect-id-tokens-sessoes-federacao-pt.component')
      .then((module) => module.OpenIdConnectIdTokensSessoesFederacaoPtComponent),
    data: { seo: seo.learnOpenIdConnectPortuguese }
  },
  {
    path: 'learn/en/openid-connect-id-tokens-sessions-and-federation',
    loadComponent: () => import('./learn/openid-connect-id-tokens-sessions-federation-en/openid-connect-id-tokens-sessions-federation-en.component')
      .then((module) => module.OpenIdConnectIdTokensSessionsFederationEnComponent),
    data: { seo: seo.learnOpenIdConnectEnglish }
  },
  {
    path: 'learn/es/openid-connect-id-tokens-sesiones-y-federacion',
    loadComponent: () => import('./learn/openid-connect-id-tokens-sesiones-federacion-es/openid-connect-id-tokens-sesiones-federacion-es.component')
      .then((module) => module.OpenIdConnectIdTokensSesionesFederacionEsComponent),
    data: { seo: seo.learnOpenIdConnectSpanish }
  },
  {
    path: 'learn/pt/jwt-jws-jwe-e-jose-em-profundidade',
    loadComponent: () => import('./learn/jwt-jws-jwe-jose-em-profundidade-pt/jwt-jws-jwe-jose-em-profundidade-pt.component')
      .then((module) => module.JwtJwsJweJoseEmProfundidadePtComponent),
    data: { seo: seo.learnJosePortuguese }
  },
  {
    path: 'learn/en/jwt-jws-jwe-and-jose-in-depth',
    loadComponent: () => import('./learn/jwt-jws-jwe-jose-in-depth-en/jwt-jws-jwe-jose-in-depth-en.component')
      .then((module) => module.JwtJwsJweJoseInDepthEnComponent),
    data: { seo: seo.learnJoseEnglish }
  },
  {
    path: 'learn/es/jwt-jws-jwe-y-jose-en-profundidad',
    loadComponent: () => import('./learn/jwt-jws-jwe-jose-en-profundidad-es/jwt-jws-jwe-jose-en-profundidad-es.component')
      .then((module) => module.JwtJwsJweJoseEnProfundidadEsComponent),
    data: { seo: seo.learnJoseSpanish }
  },
  {
    path: 'learn/pt/saml-2-em-profundidade',
    loadComponent: () => import('./learn/saml-2-em-profundidade-pt/saml-2-em-profundidade-pt.component')
      .then((module) => module.Saml2EmProfundidadePtComponent),
    data: { seo: seo.learnSamlPortuguese }
  },
  {
    path: 'learn/en/saml-2-in-depth',
    loadComponent: () => import('./learn/saml-2-in-depth-en/saml-2-in-depth-en.component')
      .then((module) => module.Saml2InDepthEnComponent),
    data: { seo: seo.learnSamlEnglish }
  },
  {
    path: 'learn/es/saml-2-en-profundidad',
    loadComponent: () => import('./learn/saml-2-en-profundidad-es/saml-2-en-profundidad-es.component')
      .then((module) => module.Saml2EnProfundidadEsComponent),
    data: { seo: seo.learnSamlSpanish }
  },
  {
    path: 'learn/pt/identity-federation-e-single-sign-on',
    loadComponent: () => import('./learn/identity-federation-single-sign-on-pt/identity-federation-single-sign-on-pt.component')
      .then((module) => module.IdentityFederationSingleSignOnPtComponent),
    data: { seo: seo.learnIdentityFederationPortuguese }
  },
  {
    path: 'learn/en/identity-federation-and-single-sign-on',
    loadComponent: () => import('./learn/identity-federation-single-sign-on-en/identity-federation-single-sign-on-en.component')
      .then((module) => module.IdentityFederationSingleSignOnEnComponent),
    data: { seo: seo.learnIdentityFederationEnglish }
  },
  {
    path: 'learn/es/federacion-de-identidad-y-single-sign-on',
    loadComponent: () => import('./learn/federacion-identidad-single-sign-on-es/federacion-identidad-single-sign-on-es.component')
      .then((module) => module.FederacionIdentidadSingleSignOnEsComponent),
    data: { seo: seo.learnIdentityFederationSpanish }
  },
  {
    path: 'learn/pt/api-gateways-conceitos-e-arquitetura',
    loadComponent: () => import('./learn/api-gateways-conceitos-arquitetura-pt/api-gateways-conceitos-arquitetura-pt.component').then((m) => m.ApiGatewaysConceitosArquiteturaPtComponent),
    data: { seo: seo.learnApiGatewaysPortuguese }
  },
  {
    path: 'learn/en/api-gateways-concepts-and-architecture',
    loadComponent: () => import('./learn/api-gateways-concepts-architecture-en/api-gateways-concepts-architecture-en.component').then((m) => m.ApiGatewaysConceptsArchitectureEnComponent),
    data: { seo: seo.learnApiGatewaysEnglish }
  },
  {
    path: 'learn/es/api-gateways-conceptos-y-arquitectura',
    loadComponent: () => import('./learn/api-gateways-conceptos-arquitectura-es/api-gateways-conceptos-arquitectura-es.component').then((m) => m.ApiGatewaysConceptosArquitecturaEsComponent),
    data: { seo: seo.learnApiGatewaysSpanish }
  },
  { path: 'learn/pt/politicas-de-gateway-policies', loadComponent: () => import('./learn/politicas-gateway-policies-pt/politicas-gateway-policies-pt.component').then((m) => m.PoliticasGatewayPoliciesPtComponent), data: { seo: seo.learnGatewayPoliciesPortuguese } },
  { path: 'learn/en/gateway-policies', loadComponent: () => import('./learn/gateway-policies-en/gateway-policies-en.component').then((m) => m.GatewayPoliciesEnComponent), data: { seo: seo.learnGatewayPoliciesEnglish } },
  { path: 'learn/es/politicas-de-gateway-policies', loadComponent: () => import('./learn/politicas-gateway-policies-es/politicas-gateway-policies-es.component').then((m) => m.PoliticasGatewayPoliciesEsComponent), data: { seo: seo.learnGatewayPoliciesSpanish } },
  { path: 'learn/pt/axway-api-gateway-arquitetura-e-funcionamento', loadComponent: () => import('./learn/axway-api-gateway-arquitetura-pt/axway-api-gateway-arquitetura-pt.component').then((m) => m.AxwayApiGatewayArquiteturaPtComponent), data: { seo: seo.learnAxwayGatewayPortuguese } },
  { path: 'learn/en/axway-api-gateway-architecture-and-operation', loadComponent: () => import('./learn/axway-api-gateway-architecture-en/axway-api-gateway-architecture-en.component').then((m) => m.AxwayApiGatewayArchitectureEnComponent), data: { seo: seo.learnAxwayGatewayEnglish } },
  { path: 'learn/es/axway-api-gateway-arquitectura-y-funcionamiento', loadComponent: () => import('./learn/axway-api-gateway-arquitectura-es/axway-api-gateway-arquitectura-es.component').then((m) => m.AxwayApiGatewayArquitecturaEsComponent), data: { seo: seo.learnAxwayGatewaySpanish } },
  { path: 'learn/pt/azure-api-management-apim', loadComponent: () => import('./learn/azure-api-management-apim-pt/azure-api-management-apim-pt.component').then((m) => m.AzureApiManagementApimPtComponent), data: { seo: seo.learnAzureApimPortuguese } },
  { path: 'learn/en/azure-api-management-apim', loadComponent: () => import('./learn/azure-api-management-apim-en/azure-api-management-apim-en.component').then((m) => m.AzureApiManagementApimEnComponent), data: { seo: seo.learnAzureApimEnglish } },
  { path: 'learn/es/azure-api-management-apim', loadComponent: () => import('./learn/azure-api-management-apim-es/azure-api-management-apim-es.component').then((m) => m.AzureApiManagementApimEsComponent), data: { seo: seo.learnAzureApimSpanish } },
  { path: 'learn/pt/seguranca-apis-owasp-api-security-top-10', loadComponent: () => import('./learn/seguranca-apis-owasp-top-10-pt/seguranca-apis-owasp-top-10-pt.component').then((m) => m.SegurancaApisOwaspTop10PtComponent), data: { seo: seo.learnOwaspApiSecurityPortuguese } },
  { path: 'learn/en/api-security-owasp-api-security-top-10', loadComponent: () => import('./learn/api-security-owasp-top-10-en/api-security-owasp-top-10-en.component').then((m) => m.ApiSecurityOwaspTop10EnComponent), data: { seo: seo.learnOwaspApiSecurityEnglish } },
  { path: 'learn/es/seguridad-apis-owasp-api-security-top-10', loadComponent: () => import('./learn/seguridad-apis-owasp-top-10-es/seguridad-apis-owasp-top-10-es.component').then((m) => m.SeguridadApisOwaspTop10EsComponent), data: { seo: seo.learnOwaspApiSecuritySpanish } },
  { path: 'learn/pt/cors-csp-hsts-e-outros-cabecalhos-http', loadComponent: () => import('./learn/cors-csp-hsts-cabecalhos-http-pt/cors-csp-hsts-cabecalhos-http-pt.component').then((m) => m.CorsCspHstsCabecalhosHttpPtComponent), data: { seo: seo.learnHttpSecurityHeadersPortuguese } },
  { path: 'learn/en/cors-csp-hsts-and-other-http-headers', loadComponent: () => import('./learn/cors-csp-hsts-http-headers-en/cors-csp-hsts-http-headers-en.component').then((m) => m.CorsCspHstsHttpHeadersEnComponent), data: { seo: seo.learnHttpSecurityHeadersEnglish } },
  { path: 'learn/es/cors-csp-hsts-y-otros-encabezados-http', loadComponent: () => import('./learn/cors-csp-hsts-encabezados-http-es/cors-csp-hsts-encabezados-http-es.component').then((m) => m.CorsCspHstsEncabezadosHttpEsComponent), data: { seo: seo.learnHttpSecurityHeadersSpanish } },
  { path: 'learn/pt/rate-limiting-quotas-e-throttling', loadComponent: () => import('./learn/rate-limiting-quotas-throttling-pt/rate-limiting-quotas-throttling-pt.component').then((m) => m.RateLimitingQuotasThrottlingPtComponent), data: { seo: seo.learnRateLimitingPortuguese } },
  { path: 'learn/en/rate-limiting-quotas-and-throttling', loadComponent: () => import('./learn/rate-limiting-quotas-throttling-en/rate-limiting-quotas-throttling-en.component').then((m) => m.RateLimitingQuotasThrottlingEnComponent), data: { seo: seo.learnRateLimitingEnglish } },
  { path: 'learn/es/rate-limiting-cuotas-y-throttling', loadComponent: () => import('./learn/rate-limiting-cuotas-throttling-es/rate-limiting-cuotas-throttling-es.component').then((m) => m.RateLimitingCuotasThrottlingEsComponent), data: { seo: seo.learnRateLimitingSpanish } },
  { path: 'learn/pt/api-versioning', loadComponent: () => import('./learn/api-versioning-pt/api-versioning-pt.component').then((m) => m.ApiVersioningPtComponent), data: { seo: seo.learnApiVersioningPortuguese } },
  { path: 'learn/en/api-versioning', loadComponent: () => import('./learn/api-versioning-en/api-versioning-en.component').then((m) => m.ApiVersioningEnComponent), data: { seo: seo.learnApiVersioningEnglish } },
  { path: 'learn/es/api-versioning', loadComponent: () => import('./learn/api-versioning-es/api-versioning-es.component').then((m) => m.ApiVersioningEsComponent), data: { seo: seo.learnApiVersioningSpanish } },
  { path: 'learn/pt/service-mesh-istio-linkerd-e-envoy', loadComponent: () => import('./learn/service-mesh-istio-linkerd-envoy-pt/service-mesh-istio-linkerd-envoy-pt.component').then((m) => m.ServiceMeshIstioLinkerdEnvoyPtComponent), data: { seo: seo.learnServiceMeshPortuguese } },
  { path: 'learn/en/service-mesh-istio-linkerd-and-envoy', loadComponent: () => import('./learn/service-mesh-istio-linkerd-envoy-en/service-mesh-istio-linkerd-envoy-en.component').then((m) => m.ServiceMeshIstioLinkerdEnvoyEnComponent), data: { seo: seo.learnServiceMeshEnglish } },
  { path: 'learn/es/service-mesh-istio-linkerd-y-envoy', loadComponent: () => import('./learn/service-mesh-istio-linkerd-envoy-es/service-mesh-istio-linkerd-envoy-es.component').then((m) => m.ServiceMeshIstioLinkerdEnvoyEsComponent), data: { seo: seo.learnServiceMeshSpanish } },
  { path: 'learn/pt/microservicos-e-padroes-de-integracao', loadComponent: () => import('./learn/microservicos-padroes-integracao-pt/microservicos-padroes-integracao-pt.component').then((m) => m.MicroservicosPadroesIntegracaoPtComponent), data: { seo: seo.learnMicroservicesPortuguese } },
  { path: 'learn/en/microservices-and-integration-patterns', loadComponent: () => import('./learn/microservices-integration-patterns-en/microservices-integration-patterns-en.component').then((m) => m.MicroservicesIntegrationPatternsEnComponent), data: { seo: seo.learnMicroservicesEnglish } },
  { path: 'learn/es/microservicios-y-patrones-de-integracion', loadComponent: () => import('./learn/microservicios-patrones-integracion-es/microservicios-patrones-integracion-es.component').then((m) => m.MicroserviciosPatronesIntegracionEsComponent), data: { seo: seo.learnMicroservicesSpanish } },
  { path: 'learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms', loadComponent: () => import('./learn/mensageria-kafka-rabbitmq-amqp-jms-pt/mensageria-kafka-rabbitmq-amqp-jms-pt.component').then((m) => m.MensageriaKafkaRabbitmqAmqpJmsPtComponent), data: { seo: seo.learnMessagingPortuguese } },
  { path: 'learn/en/messaging-kafka-rabbitmq-amqp-and-jms', loadComponent: () => import('./learn/messaging-kafka-rabbitmq-amqp-jms-en/messaging-kafka-rabbitmq-amqp-jms-en.component').then((m) => m.MessagingKafkaRabbitmqAmqpJmsEnComponent), data: { seo: seo.learnMessagingEnglish } },
  { path: 'learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms', loadComponent: () => import('./learn/mensajeria-kafka-rabbitmq-amqp-jms-es/mensajeria-kafka-rabbitmq-amqp-jms-es.component').then((m) => m.MensajeriaKafkaRabbitmqAmqpJmsEsComponent), data: { seo: seo.learnMessagingSpanish } },
  { path: 'learn/pt/observabilidade-logs-metricas-tracing-opentelemetry', loadComponent: () => import('./learn/observabilidade-logs-metricas-tracing-opentelemetry-pt/observabilidade-logs-metricas-tracing-opentelemetry-pt.component').then((m) => m.ObservabilidadeLogsMetricasTracingOpentelemetryPtComponent), data: { seo: seo.learnObservabilityPortuguese } },
  { path: 'learn/en/observability-logs-metrics-tracing-opentelemetry', loadComponent: () => import('./learn/observability-logs-metrics-tracing-opentelemetry-en/observability-logs-metrics-tracing-opentelemetry-en.component').then((m) => m.ObservabilityLogsMetricsTracingOpentelemetryEnComponent), data: { seo: seo.learnObservabilityEnglish } },
  { path: 'learn/es/observabilidad-logs-metricas-tracing-opentelemetry', loadComponent: () => import('./learn/observabilidad-logs-metricas-tracing-opentelemetry-es/observabilidad-logs-metricas-tracing-opentelemetry-es.component').then((m) => m.ObservabilidadLogsMetricasTracingOpentelemetryEsComponent), data: { seo: seo.learnObservabilitySpanish } },
  { path: 'learn/pt/kubernetes-para-apis', loadComponent: () => import('./learn/kubernetes-para-apis-pt/kubernetes-para-apis-pt.component').then((m) => m.KubernetesParaApisPtComponent), data: { seo: seo.learnKubernetesPortuguese } },
  { path: 'learn/en/kubernetes-for-apis', loadComponent: () => import('./learn/kubernetes-for-apis-en/kubernetes-for-apis-en.component').then((m) => m.KubernetesForApisEnComponent), data: { seo: seo.learnKubernetesEnglish } },
  { path: 'learn/es/kubernetes-para-apis', loadComponent: () => import('./learn/kubernetes-para-apis-es/kubernetes-para-apis-es.component').then((m) => m.KubernetesParaApisEsComponent), data: { seo: seo.learnKubernetesSpanish } },
  { path: 'learn/pt/zero-trust-aplicado-a-apis', loadComponent: () => import('./learn/zero-trust-aplicado-apis-pt/zero-trust-aplicado-apis-pt.component').then((m) => m.ZeroTrustAplicadoApisPtComponent), data: { seo: seo.learnZeroTrustPortuguese } },
  { path: 'learn/en/zero-trust-applied-to-apis', loadComponent: () => import('./learn/zero-trust-applied-to-apis-en/zero-trust-applied-to-apis-en.component').then((m) => m.ZeroTrustAppliedToApisEnComponent), data: { seo: seo.learnZeroTrustEnglish } },
  { path: 'learn/es/zero-trust-aplicado-a-apis', loadComponent: () => import('./learn/zero-trust-aplicado-apis-es/zero-trust-aplicado-apis-es.component').then((m) => m.ZeroTrustAplicadoApisEsComponent), data: { seo: seo.learnZeroTrustSpanish } },
  { path: 'learn/pt/open-finance-e-open-banking-no-brasil', loadComponent: () => import('./learn/open-finance-open-banking-brasil-pt/open-finance-open-banking-brasil-pt.component').then((m) => m.OpenFinanceOpenBankingBrasilPtComponent), data: { seo: seo.learnOpenFinancePortuguese } },
  { path: 'learn/en/open-finance-and-open-banking-in-brazil', loadComponent: () => import('./learn/open-finance-open-banking-brazil-en/open-finance-open-banking-brazil-en.component').then((m) => m.OpenFinanceOpenBankingBrazilEnComponent), data: { seo: seo.learnOpenFinanceEnglish } },
  { path: 'learn/es/open-finance-y-open-banking-en-brasil', loadComponent: () => import('./learn/open-finance-open-banking-brasil-es/open-finance-open-banking-brasil-es.component').then((m) => m.OpenFinanceOpenBankingBrasilEsComponent), data: { seo: seo.learnOpenFinanceSpanish } },
  { path: 'learn/pt/lgpd-aplicada-as-apis', loadComponent: () => import('./learn/lgpd-aplicada-apis-pt/lgpd-aplicada-apis-pt.component').then((m) => m.LgpdAplicadaApisPtComponent), data: { seo: seo.learnLgpdPortuguese } },
  { path: 'learn/en/lgpd-applied-to-apis', loadComponent: () => import('./learn/lgpd-applied-to-apis-en/lgpd-applied-to-apis-en.component').then((m) => m.LgpdAppliedToApisEnComponent), data: { seo: seo.learnLgpdEnglish } },
  { path: 'learn/es/lgpd-aplicada-a-las-apis', loadComponent: () => import('./learn/lgpd-aplicada-apis-es/lgpd-aplicada-apis-es.component').then((m) => m.LgpdAplicadaApisEsComponent), data: { seo: seo.learnLgpdSpanish } },
  { path: 'learn/pt/arquiteturas-bancarias-de-alta-disponibilidade', loadComponent: () => import('./learn/arquiteturas-bancarias-alta-disponibilidade-pt/arquiteturas-bancarias-alta-disponibilidade-pt.component').then((m) => m.ArquiteturasBancariasAltaDisponibilidadePtComponent), data: { seo: seo.learnHighAvailabilityPortuguese } },
  { path: 'learn/en/high-availability-banking-architectures', loadComponent: () => import('./learn/high-availability-banking-architectures-en/high-availability-banking-architectures-en.component').then((m) => m.HighAvailabilityBankingArchitecturesEnComponent), data: { seo: seo.learnHighAvailabilityEnglish } },
  { path: 'learn/es/arquitecturas-bancarias-de-alta-disponibilidad', loadComponent: () => import('./learn/arquitecturas-bancarias-alta-disponibilidad-es/arquitecturas-bancarias-alta-disponibilidad-es.component').then((m) => m.ArquitecturasBancariasAltaDisponibilidadEsComponent), data: { seo: seo.learnHighAvailabilitySpanish } },
  { path: 'learn/pt/troubleshooting-de-apis-e-gateways', loadComponent: () => import('./learn/troubleshooting-apis-gateways-pt/troubleshooting-apis-gateways-pt.component').then((m) => m.TroubleshootingApisGatewaysPtComponent), data: { seo: seo.learnTroubleshootingPortuguese } },
  { path: 'learn/en/api-and-gateway-troubleshooting', loadComponent: () => import('./learn/api-gateway-troubleshooting-en/api-gateway-troubleshooting-en.component').then((m) => m.ApiGatewayTroubleshootingEnComponent), data: { seo: seo.learnTroubleshootingEnglish } },
  { path: 'learn/es/troubleshooting-de-apis-y-gateways', loadComponent: () => import('./learn/troubleshooting-apis-gateways-es/troubleshooting-apis-gateways-es.component').then((m) => m.TroubleshootingApisGatewaysEsComponent), data: { seo: seo.learnTroubleshootingSpanish } },
  { path: 'learn/pt/estudo-de-casos-reais-de-grandes-empresas', loadComponent: () => import('./learn/estudos-casos-reais-grandes-empresas-pt/estudos-casos-reais-grandes-empresas-pt.component').then((m) => m.EstudosCasosReaisGrandesEmpresasPtComponent), data: { seo: seo.learnCaseStudiesPortuguese } },
  { path: 'learn/en/real-world-case-studies-from-large-enterprises', loadComponent: () => import('./learn/real-world-enterprise-case-studies-en/real-world-enterprise-case-studies-en.component').then((m) => m.RealWorldEnterpriseCaseStudiesEnComponent), data: { seo: seo.learnCaseStudiesEnglish } },
  { path: 'learn/es/estudio-de-casos-reales-de-grandes-empresas', loadComponent: () => import('./learn/estudios-casos-reales-grandes-empresas-es/estudios-casos-reales-grandes-empresas-es.component').then((m) => m.EstudiosCasosRealesGrandesEmpresasEsComponent), data: { seo: seo.learnCaseStudiesSpanish } },
  { path: 'learn/pt/projeto-final-plataforma-completa-de-apis', loadComponent: () => import('./learn/projeto-final-plataforma-completa-apis-pt/projeto-final-plataforma-completa-apis-pt.component').then((m) => m.ProjetoFinalPlataformaCompletaApisPtComponent), data: { seo: seo.learnCapstonePortuguese } },
  { path: 'learn/en/complete-api-platform-capstone-project', loadComponent: () => import('./learn/complete-api-platform-capstone-en/complete-api-platform-capstone-en.component').then((m) => m.CompleteApiPlatformCapstoneEnComponent), data: { seo: seo.learnCapstoneEnglish } },
  { path: 'learn/es/proyecto-final-plataforma-completa-de-apis', loadComponent: () => import('./learn/proyecto-final-plataforma-completa-apis-es/proyecto-final-plataforma-completa-apis-es.component').then((m) => m.ProyectoFinalPlataformaCompletaApisEsComponent), data: { seo: seo.learnCapstoneSpanish } },
  { path: 'articles/what-is-utily-tools', loadComponent: () => import('./articles/what-is-utily-tools/what-is-utily-tools.component').then((m) => m.WhatIsUtilyToolsComponent), data: { seo: seo.whatIsUtilyTools } },
  ...toolArticleRoutes,
  { path: 'base64', loadComponent: () => import('./ferramentas/base64/base64.component').then((m) => m.Base64Component), data: toolData(seo.base64, 'base64-encoding-decoding-guide', 'Base64 Text Converter') },
  { path: 'json-editor', loadComponent: () => import('./ferramentas/editor-json/editor-json.component').then((m) => m.EditorJsonComponent), data: toolData(seo.jsonEditor, 'json-formatting-minification-and-validation', 'JSON Editor') },
  { path: 'jwt-viewer', loadComponent: () => import('./ferramentas/visualizador-jwt/visualizador-jwt.component').then((m) => m.VisualizadorJwtComponent), data: toolData(seo.jwtViewer, 'jwt-structure-signing-and-validation', 'JWT Manipulator') },
  { path: 'jwe-viewer', loadComponent: () => import('./ferramentas/visualizador-jwe/visualizador-jwe.component').then((m) => m.VisualizadorJweComponent), data: toolData(seo.jweViewer, 'jwe-encryption-compact-serialization', 'JWE Manipulator') },
  { path: 'url-codec', loadComponent: () => import('./ferramentas/urlcodec/urlcodec.component').then((m) => m.UrlcodecComponent), data: toolData(seo.urlCodec, 'url-encoding-percent-encoding-guide', 'URL Codec') },
  { path: 'image-to-text-ocr', loadComponent: () => import('./ferramentas/conversor-imagem-texto-ocr/conversor-imagem-texto-ocr.component').then((m) => m.ConversorImagemTextoOcrComponent), data: toolData(seo.ocr, 'ocr-image-to-text-technology', 'OCR Converter') },
  { path: 'unix-timestamp', loadComponent: () => import('./ferramentas/unix-timestamp/unix-timestamp.component').then((m) => m.UnixTimestampComponent), data: toolData(seo.unixTimestamp, 'unix-timestamp-epoch-time-conversion', 'Unix Timestamp') },
  { path: 'ipv4-range-calculator', loadComponent: () => import('./ferramentas/calculadora-range-ip/calculadora-range-ip.component').then((m) => m.CalculadoraRangeIpComponent), data: toolData(seo.ipv4Range, 'ipv4-cidr-subnet-range-calculation-guide', 'IPv4 CIDR Range Calculator') },
  { path: 'text-to-qrcode', loadComponent: () => import('./ferramentas/texto-qrcode/texto-qrcode.component').then((m) => m.TextoQrcodeComponent), data: toolData(seo.qrCode, 'qr-code-generation-error-correction', 'Text to QR Code') },
  { path: 'text-editor', loadComponent: () => import('./ferramentas/quebra-linha/quebra-linha.component').then((m) => m.QuebraLinhaComponent), data: toolData(seo.textEditor, 'online-text-editor-text-transformation-guide', 'Text Editor') },
  { path: 'text-template', loadComponent: () => import('./ferramentas/template-de-texto/template-de-texto.component').then((m) => m.TemplateDeTextoComponent), data: toolData(seo.textTemplate, 'text-templates-variables-and-automation', 'Text Template') },
  { path: 'x509-viewer', loadComponent: () => import('./ferramentas/visualizador-x-509/visualizador-x-509.component').then((m) => m.VisualizadorX509Component), data: toolData(seo.x509Viewer, 'x509-certificate-fields-and-decoding', 'X.509 Certificate Viewer') },
  { path: 'x509-generator', loadComponent: () => import('./ferramentas/gerador-certificado-x509/gerador-certificado-x509.component').then((m) => m.GeradorCertificadoX509Component), data: toolData(seo.x509Generator, 'generate-self-signed-x509-certificates', 'X.509 Key & Certificate Generator') },
  { path: 'pdf-merger', loadComponent: () => import('./ferramentas/juntador-pdf/juntador-pdf.component').then((m) => m.JuntadorPdfComponent), data: toolData(seo.pdfMerger, 'merge-pdf-and-images-in-browser', 'PDF & Image Merger') },
  { path: 'pdf-splitter', loadComponent: () => import('./ferramentas/separador-pdf/separador-pdf.component').then((m) => m.SeparadorPdfComponent), data: toolData(seo.pdfSplitter, 'split-pdf-pages-and-export-jpg', 'PDF Splitter') },
  { path: 'pdf-creator', loadComponent: () => import('./ferramentas/criador-pdf/criador-pdf.component').then((m) => m.CriadorPdfComponent), data: toolData(seo.pdfCreator, 'create-pdf-from-images-browser', 'PDF Creator') },
  { path: 'hash-generator', loadComponent: () => import('./ferramentas/gerador-hash/gerador-hash.component').then((m) => m.GeradorHashComponent), data: toolData(seo.hashGenerator, 'cryptographic-hash-functions-md5-sha', 'Hash Generator') },
  { path: 'text-diff', loadComponent: () => import('./ferramentas/diff-texto/diff-texto.component').then((m) => m.DiffTextoComponent), data: toolData(seo.textDiff, 'text-diff-algorithms-and-comparison', 'Text Diff') },
  { path: 'uuid-generator', loadComponent: () => import('./ferramentas/gerador-uuid/gerador-uuid.component').then((m) => m.GeradorUuidComponent), data: toolData(seo.uuidGenerator, 'uuid-v1-v4-v7-generation-guide', 'UUID Generator') },
  { path: 'password-generator', loadComponent: () => import('./ferramentas/gerador-senha/gerador-senha.component').then((m) => m.GeradorSenhaComponent), data: toolData(seo.passwordGenerator, 'secure-password-generation-entropy', 'Password Generator') },
  { path: 'hmac-generator', loadComponent: () => import('./ferramentas/gerador-hmac/gerador-hmac.component').then((m) => m.GeradorHmacComponent), data: toolData(seo.hmacGenerator, 'hmac-message-authentication-guide', 'HMAC Generator') },
  { path: 'cpf-cnpj-generator', loadComponent: () => import('./ferramentas/gerador-cpf-cnpj/gerador-cpf-cnpj.component').then((m) => m.GeradorCpfCnpjComponent), data: toolData(seo.cpfCnpjGenerator, 'cpf-cnpj-check-digit-generation-for-testing', 'CPF & CNPJ Generator') },
  { path: 'json-yaml-compare', loadComponent: () => import('./ferramentas/comparador-json-yaml/comparador-json-yaml.component').then((m) => m.ComparadorJsonYamlComponent), data: toolData(seo.jsonYamlCompare, 'compare-json-yaml-structural-diff', 'JSON & YAML Comparator') },
  { path: 'certificate-validator', loadComponent: () => import('./ferramentas/validador-certificado/validador-certificado.component').then((m) => m.ValidadorCertificadoComponent), data: toolData(seo.certificateValidator, 'validate-certificates-and-key-pairs', 'Certificate & Key Validator') },
  { path: 'swagger-editor', loadComponent: () => import('./ferramentas/editor-swagger/editor-swagger.component').then((m) => m.EditorSwaggerComponent), data: toolData({ ...seo.swaggerEditor, canonicalPath: '/swagger-editor' }, 'swagger-openapi-specification-guide', 'Swagger Viewer & Editor') },
  { path: 'shared-text', loadComponent: () => import('./ferramentas/texto-global/texto-global.component').then((m) => m.TextoGlobalComponent), data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
  { path: 'shared-text/:grupo/:canal', loadComponent: () => import('./ferramentas/texto-global/texto-global.component').then((m) => m.TextoGlobalComponent), data: toolData(seo.sharedText, 'real-time-text-sharing-websockets', 'Text Sharer') },
];
