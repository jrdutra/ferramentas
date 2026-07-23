/**
 * Canonical catalog of Learn content.
 *
 * Each chapter exists in three languages (pt/en/es) but represents a single
 * logical article. Reading progress is tracked per chapter id, so marking a
 * chapter read in one language marks it read in the others, and a path's total
 * counts unique chapters (not language variants).
 */

export type ArticleLang = 'pt' | 'en' | 'es';

export interface LearnChapter {
  /** Language-independent id used as the reading-progress key. */
  id: string;
  /** Number of level-2 topics (sections) in the chapter, identical across languages. */
  topicCount: number;
  routes: Record<ArticleLang, string>;
}

export interface LearnPath {
  id: string;
  chapters: LearnChapter[];
}

export const LEARN_PATHS: LearnPath[] = [
  {
    id: 'corporate-api-fundamentals',
    chapters: [
      {
        id: 'corporate-api/fundamentals',
        topicCount: 24,
        routes: {
          pt: '/learn/pt/fundamentos-da-internet-redes-e-apis',
          en: '/learn/en/internet-networking-api-fundamentals',
          es: '/learn/es/fundamentos-internet-redes-apis'
        }
      },
      {
        id: 'corporate-api/tcp-udp',
        topicCount: 24,
        routes: {
          pt: '/learn/pt/tcp-udp-portas-e-sockets',
          en: '/learn/en/tcp-udp-ports-and-sockets',
          es: '/learn/es/tcp-udp-puertos-y-sockets'
        }
      },
      {
        id: 'corporate-api/ip-addressing',
        topicCount: 28,
        routes: {
          pt: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento',
          en: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing',
          es: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento'
        }
      },
      {
        id: 'corporate-api/dns-nat',
        topicCount: 31,
        routes: {
          pt: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga',
          en: '/learn/en/dns-nat-proxies-and-load-balancers',
          es: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga'
        }
      },
      {
        id: 'corporate-api/http-versions',
        topicCount: 46,
        routes: {
          pt: '/learn/pt/http-1-1-http-2-e-http-3',
          en: '/learn/en/http-1-1-http-2-and-http-3',
          es: '/learn/es/http-1-1-http-2-y-http-3'
        }
      },
      {
        id: 'corporate-api/https-tls',
        topicCount: 41,
        routes: {
          pt: '/learn/pt/https-e-tls-em-profundidade',
          en: '/learn/en/https-and-tls-in-depth',
          es: '/learn/es/https-y-tls-en-profundidad'
        }
      },
      {
        id: 'corporate-api/cryptography',
        topicCount: 34,
        routes: {
          pt: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis',
          en: '/learn/en/cryptography-fundamentals-and-api-applications',
          es: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis'
        }
      },
      {
        id: 'corporate-api/digital-certificates',
        topicCount: 33,
        routes: {
          pt: '/learn/pt/certificados-digitais-pki-e-x509',
          en: '/learn/en/digital-certificates-pki-and-x509',
          es: '/learn/es/certificados-digitales-pki-y-x509'
        }
      },
      {
        id: 'corporate-api/mtls',
        topicCount: 16,
        routes: {
          pt: '/learn/pt/mtls-em-profundidade',
          en: '/learn/en/mtls-in-depth',
          es: '/learn/es/mtls-en-profundidad'
        }
      },
      {
        id: 'corporate-api/rest',
        topicCount: 27,
        routes: {
          pt: '/learn/pt/rest-arquitetura-e-boas-praticas',
          en: '/learn/en/rest-architecture-and-best-practices',
          es: '/learn/es/rest-arquitectura-y-buenas-practicas'
        }
      },
      {
        id: 'corporate-api/richardson-maturity-model',
        topicCount: 29,
        routes: {
          pt: '/learn/pt/modelo-de-maturidade-rest-de-richardson',
          en: '/learn/en/richardson-rest-maturity-model',
          es: '/learn/es/modelo-de-madurez-rest-de-richardson'
        }
      },
      {
        id: 'corporate-api/openapi-contracts',
        topicCount: 32,
        routes: {
          pt: '/learn/pt/openapi-swagger-contratos-documentacao-e-automacao',
          en: '/learn/en/openapi-swagger-contracts-documentation-and-automation',
          es: '/learn/es/openapi-swagger-contratos-documentacion-y-automatizacion'
        }
      },
      {
        id: 'corporate-api/graphql-grpc-websocket',
        topicCount: 21,
        routes: {
          pt: '/learn/pt/graphql-grpc-e-websocket',
          en: '/learn/en/graphql-grpc-and-websocket',
          es: '/learn/es/graphql-grpc-y-websocket'
        }
      },
      {
        id: 'corporate-api/authentication-authorization',
        topicCount: 31,
        routes: {
          pt: '/learn/pt/autenticacao-x-autorizacao',
          en: '/learn/en/authentication-vs-authorization',
          es: '/learn/es/autenticacion-vs-autorizacion'
        }
      },
      {
        id: 'corporate-api/basic-auth-digest-api-keys',
        topicCount: 27,
        routes: {
          pt: '/learn/pt/basic-auth-digest-e-api-keys',
          en: '/learn/en/basic-auth-digest-and-api-keys',
          es: '/learn/es/basic-auth-digest-y-api-keys'
        }
      },
      {
        id: 'corporate-api/oauth-2-flows-tokens-security',
        topicCount: 33,
        routes: {
          pt: '/learn/pt/oauth-2-fluxos-tokens-e-seguranca',
          en: '/learn/en/oauth-2-flows-tokens-and-security',
          es: '/learn/es/oauth-2-flujos-tokens-y-seguridad'
        }
      },
      {
        id: 'corporate-api/openid-connect-id-tokens-sessions-federation',
        topicCount: 32,
        routes: {
          pt: '/learn/pt/openid-connect-id-tokens-sessoes-e-federacao',
          en: '/learn/en/openid-connect-id-tokens-sessions-and-federation',
          es: '/learn/es/openid-connect-id-tokens-sesiones-y-federacion'
        }
      },
      {
        id: 'corporate-api/jwt-jws-jwe-jose-in-depth',
        topicCount: 30,
        routes: {
          pt: '/learn/pt/jwt-jws-jwe-e-jose-em-profundidade',
          en: '/learn/en/jwt-jws-jwe-and-jose-in-depth',
          es: '/learn/es/jwt-jws-jwe-y-jose-en-profundidad'
        }
      },
      {
        id: 'corporate-api/saml-2-in-depth',
        topicCount: 24,
        routes: {
          pt: '/learn/pt/saml-2-em-profundidade',
          en: '/learn/en/saml-2-in-depth',
          es: '/learn/es/saml-2-en-profundidad'
        }
      },
      {
        id: 'corporate-api/identity-federation-single-sign-on',
        topicCount: 25,
        routes: {
          pt: '/learn/pt/identity-federation-e-single-sign-on',
          en: '/learn/en/identity-federation-and-single-sign-on',
          es: '/learn/es/federacion-de-identidad-y-single-sign-on'
        }
      },
      {
        id: 'corporate-api/api-gateways-architecture',
        topicCount: 23,
        routes: {
          pt: '/learn/pt/api-gateways-conceitos-e-arquitetura',
          en: '/learn/en/api-gateways-concepts-and-architecture',
          es: '/learn/es/api-gateways-conceptos-y-arquitectura'
        }
      },
      {
        id: 'corporate-api/gateway-policies', topicCount: 23,
        routes: { pt: '/learn/pt/politicas-de-gateway-policies', en: '/learn/en/gateway-policies', es: '/learn/es/politicas-de-gateway-policies' }
      },
      {
        id: 'corporate-api/axway-api-gateway-architecture', topicCount: 26,
        routes: { pt: '/learn/pt/axway-api-gateway-arquitetura-e-funcionamento', en: '/learn/en/axway-api-gateway-architecture-and-operation', es: '/learn/es/axway-api-gateway-arquitectura-y-funcionamiento' }
      },
      {
        id: 'corporate-api/azure-api-management-apim', topicCount: 24,
        routes: { pt: '/learn/pt/azure-api-management-apim', en: '/learn/en/azure-api-management-apim', es: '/learn/es/azure-api-management-apim' }
      },
      {
        id: 'corporate-api/api-security-owasp-top-10', topicCount: 20,
        routes: { pt: '/learn/pt/seguranca-apis-owasp-api-security-top-10', en: '/learn/en/api-security-owasp-api-security-top-10', es: '/learn/es/seguridad-apis-owasp-api-security-top-10' }
      },
      {
        id: 'corporate-api/http-security-headers', topicCount: 23,
        routes: { pt: '/learn/pt/cors-csp-hsts-e-outros-cabecalhos-http', en: '/learn/en/cors-csp-hsts-and-other-http-headers', es: '/learn/es/cors-csp-hsts-y-otros-encabezados-http' }
      },
      {
        id: 'corporate-api/rate-limiting-quotas-throttling', topicCount: 23,
        routes: { pt: '/learn/pt/rate-limiting-quotas-e-throttling', en: '/learn/en/rate-limiting-quotas-and-throttling', es: '/learn/es/rate-limiting-cuotas-y-throttling' }
      },
      {
        id: 'corporate-api/api-versioning', topicCount: 27,
        routes: { pt: '/learn/pt/api-versioning', en: '/learn/en/api-versioning', es: '/learn/es/api-versioning' }
      },
      {
        id: 'corporate-api/service-mesh-istio-linkerd-envoy', topicCount: 23,
        routes: { pt: '/learn/pt/service-mesh-istio-linkerd-e-envoy', en: '/learn/en/service-mesh-istio-linkerd-and-envoy', es: '/learn/es/service-mesh-istio-linkerd-y-envoy' }
      },
      {
        id: 'corporate-api/microservices-integration-patterns', topicCount: 23,
        routes: { pt: '/learn/pt/microservicos-e-padroes-de-integracao', en: '/learn/en/microservices-and-integration-patterns', es: '/learn/es/microservicios-y-patrones-de-integracion' }
      },
      {
        id: 'corporate-api/messaging-kafka-rabbitmq-amqp-jms', topicCount: 23,
        routes: { pt: '/learn/pt/mensageria-kafka-rabbitmq-amqp-e-jms', en: '/learn/en/messaging-kafka-rabbitmq-amqp-and-jms', es: '/learn/es/mensajeria-kafka-rabbitmq-amqp-y-jms' }
      },
      {
        id: 'corporate-api/observability-logs-metrics-tracing-opentelemetry', topicCount: 21,
        routes: { pt: '/learn/pt/observabilidade-logs-metricas-tracing-opentelemetry', en: '/learn/en/observability-logs-metrics-tracing-opentelemetry', es: '/learn/es/observabilidad-logs-metricas-tracing-opentelemetry' }
      },
      {
        id: 'corporate-api/kubernetes-for-apis', topicCount: 25,
        routes: { pt: '/learn/pt/kubernetes-para-apis', en: '/learn/en/kubernetes-for-apis', es: '/learn/es/kubernetes-para-apis' }
      },
      {
        id: 'corporate-api/zero-trust-applied-to-apis', topicCount: 21,
        routes: { pt: '/learn/pt/zero-trust-aplicado-a-apis', en: '/learn/en/zero-trust-applied-to-apis', es: '/learn/es/zero-trust-aplicado-a-apis' }
      },
      {
        id: 'corporate-api/open-finance-open-banking-brazil', topicCount: 23,
        routes: { pt: '/learn/pt/open-finance-e-open-banking-no-brasil', en: '/learn/en/open-finance-and-open-banking-in-brazil', es: '/learn/es/open-finance-y-open-banking-en-brasil' }
      },
      {
        id: 'corporate-api/lgpd-applied-to-apis', topicCount: 24,
        routes: { pt: '/learn/pt/lgpd-aplicada-as-apis', en: '/learn/en/lgpd-applied-to-apis', es: '/learn/es/lgpd-aplicada-a-las-apis' }
      },
      {
        id: 'corporate-api/high-availability-banking-architectures', topicCount: 23,
        routes: { pt: '/learn/pt/arquiteturas-bancarias-de-alta-disponibilidade', en: '/learn/en/high-availability-banking-architectures', es: '/learn/es/arquitecturas-bancarias-de-alta-disponibilidad' }
      },
      {
        id: 'corporate-api/api-gateway-troubleshooting', topicCount: 21,
        routes: { pt: '/learn/pt/troubleshooting-de-apis-e-gateways', en: '/learn/en/api-and-gateway-troubleshooting', es: '/learn/es/troubleshooting-de-apis-y-gateways' }
      },
      {
        id: 'corporate-api/real-world-enterprise-case-studies', topicCount: 17,
        routes: { pt: '/learn/pt/estudo-de-casos-reais-de-grandes-empresas', en: '/learn/en/real-world-case-studies-from-large-enterprises', es: '/learn/es/estudio-de-casos-reales-de-grandes-empresas' }
      },
      {
        id: 'corporate-api/complete-api-platform-capstone', topicCount: 19,
        routes: { pt: '/learn/pt/projeto-final-plataforma-completa-de-apis', en: '/learn/en/complete-api-platform-capstone-project', es: '/learn/es/proyecto-final-plataforma-completa-de-apis' }
      },
      {
        id: 'corporate-api/model-context-protocol-mcp', topicCount: 23,
        routes: { pt: '/learn/pt/o-que-e-model-context-protocol-mcp', en: '/learn/en/what-is-model-context-protocol-mcp', es: '/learn/es/que-es-model-context-protocol-mcp' }
      }
    ]
  }
];

/** All valid chapter ids, used to sanitize imported/stored progress. */
export const VALID_CHAPTER_IDS: ReadonlySet<string> = new Set(
  LEARN_PATHS.flatMap((path) => path.chapters.map((chapter) => chapter.id))
);

const ROUTE_TO_CHAPTER_ID = new Map<string, string>(
  LEARN_PATHS.flatMap((path) =>
    path.chapters.flatMap((chapter) =>
      (Object.values(chapter.routes) as string[]).map((route) => [route, chapter.id] as const)
    )
  )
);

const CHAPTER_ID_TO_PATH_ID = new Map<string, string>(
  LEARN_PATHS.flatMap((path) => path.chapters.map((chapter) => [chapter.id, path.id] as const))
);

const CHAPTER_TOPIC_COUNT = new Map<string, number>(
  LEARN_PATHS.flatMap((path) => path.chapters.map((chapter) => [chapter.id, chapter.topicCount] as const))
);

/** Progress key for one topic (level-2 section) of a chapter. */
export function topicKey(chapterId: string, topicIndex: number): string {
  return `${chapterId}#${topicIndex}`;
}

/** True for well-formed topic keys of known chapters (chapterId#index). */
export function isValidTopicKey(key: string): boolean {
  const hash = key.lastIndexOf('#');
  if (hash <= 0) return false;
  const chapterId = key.slice(0, hash);
  const index = Number(key.slice(hash + 1));
  const total = CHAPTER_TOPIC_COUNT.get(chapterId);
  return total !== undefined && Number.isInteger(index) && index >= 0 && index < total;
}

/** Number of level-2 topics of a chapter (0 when unknown). */
export function topicCountForChapter(chapterId: string): number {
  return CHAPTER_TOPIC_COUNT.get(chapterId) ?? 0;
}

/** Resolve the canonical chapter id for a given article route, if any. */
export function chapterIdForRoute(route: string): string | null {
  return ROUTE_TO_CHAPTER_ID.get(route) ?? null;
}

/** Resolve the path id that owns a given chapter id, if any. */
export function pathIdForChapter(chapterId: string): string | null {
  return CHAPTER_ID_TO_PATH_ID.get(chapterId) ?? null;
}
