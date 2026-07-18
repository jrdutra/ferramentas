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
