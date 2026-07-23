import { DATA_FORMAT_TOOL_ARTICLES } from './articles-data-formats.data';
import { MEDIA_TOOL_ARTICLES } from './articles-media.data';
import { SECURITY_TOOL_ARTICLES } from './articles-security.data';
import { TEXT_TOOL_ARTICLES } from './articles-text.data';
import { NETWORK_TOOL_ARTICLES } from './articles-network.data';
import { DATA_FORMAT_DEEP_DIVES } from './deep-dives-data-formats.data';
import { MEDIA_DEEP_DIVES } from './deep-dives-media.data';
import { SECURITY_DEEP_DIVES } from './deep-dives-security.data';
import { TEXT_DEEP_DIVES } from './deep-dives-text.data';
import { NETWORK_DEEP_DIVES } from './deep-dives-network.data';
import { ArticleDeepDive, ToolArticle } from './tool-article.model';

export interface ArticleSummary {
  title: string;
  excerpt: string;
  category: string;
  languageFlag?: {
    src: string;
    alt: string;
  };
  publishedAt: string;
  publishedIso: string;
  readingTime: string;
  route: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

const BASE_TOOL_ARTICLES: ToolArticle[] = [
  ...TEXT_TOOL_ARTICLES,
  ...DATA_FORMAT_TOOL_ARTICLES,
  ...SECURITY_TOOL_ARTICLES,
  ...MEDIA_TOOL_ARTICLES,
  ...NETWORK_TOOL_ARTICLES
];

const ARTICLE_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  ...TEXT_DEEP_DIVES,
  ...DATA_FORMAT_DEEP_DIVES,
  ...SECURITY_DEEP_DIVES,
  ...MEDIA_DEEP_DIVES,
  ...NETWORK_DEEP_DIVES
};

export const TOOL_ARTICLES: ToolArticle[] = BASE_TOOL_ARTICLES.map((article) => {
  const deepDive = ARTICLE_DEEP_DIVES[article.slug];
  if (!deepDive) throw new Error(`Deep technical content not found for article: ${article.slug}`);
  return { ...article, ...deepDive };
});

/** Default flag for the English-language articles (tools deep-dives + overview). */
const ENGLISH_FLAG = {
  src: '/assets/learn/usa.png',
  alt: 'English'
};

export const OVERVIEW_ARTICLE: ArticleSummary = {
  title: 'What Is utily.tools?',
  excerpt: 'Learn how utily.tools brings practical developer utilities together in one browser-based workspace.',
  category: 'About utily.tools',
  languageFlag: ENGLISH_FLAG,
  publishedAt: 'July 15, 2026',
  publishedIso: '2026-07-15',
  readingTime: '10 min read',
  route: '/articles/what-is-utily-tools',
  image: '/assets/articles/what-is-utily-tools-cover.png',
  imageAlt: 'Illustration of a browser-based developer toolbox with code, security, document and QR code utilities',
  imageWidth: 1731,
  imageHeight: 909
};

export const MCP_ARTICLES: ArticleSummary[] = [
  {
    title: 'O que é o Model Context Protocol (MCP)?',
    excerpt: 'Guia completo sobre servidores MCP, arquitetura, ferramentas, recursos, prompts, segurança, autorização e integração com agentes de IA.',
    category: 'IA e integração',
    languageFlag: {
      src: '/assets/learn/brazil.png',
      alt: 'Brasil'
    },
    publishedAt: '23 de julho de 2026',
    publishedIso: '2026-07-23',
    readingTime: '75 min de leitura',
    route: '/learn/pt/o-que-e-model-context-protocol-mcp',
    image: '/assets/learn/model-context-protocol-mcp-cover.png',
    imageAlt: 'Host de IA conectado por um hub seguro do Model Context Protocol a ferramentas, recursos, prompts, código e dados',
    imageWidth: 1536,
    imageHeight: 1024
  },
  {
    title: 'What Is the Model Context Protocol (MCP)?',
    excerpt: 'A complete guide to MCP servers, architecture, tools, resources, prompts, security, authorization, and AI agent integration.',
    category: 'AI and integration',
    languageFlag: {
      src: '/assets/learn/usa.png',
      alt: 'United States'
    },
    publishedAt: 'July 23, 2026',
    publishedIso: '2026-07-23',
    readingTime: '75 min read',
    route: '/learn/en/what-is-model-context-protocol-mcp',
    image: '/assets/learn/model-context-protocol-mcp-cover.png',
    imageAlt: 'AI host connected through a secure Model Context Protocol hub to tools, resources, prompts, code, and data',
    imageWidth: 1536,
    imageHeight: 1024
  },
  {
    title: '¿Qué es el Model Context Protocol (MCP)?',
    excerpt: 'Guía completa sobre servidores MCP, arquitectura, herramientas, recursos, prompts, seguridad, autorización e integración con agentes de IA.',
    category: 'IA e integración',
    languageFlag: {
      src: '/assets/learn/espanha.png',
      alt: 'España'
    },
    publishedAt: '23 de julio de 2026',
    publishedIso: '2026-07-23',
    readingTime: '75 min de lectura',
    route: '/learn/es/que-es-model-context-protocol-mcp',
    image: '/assets/learn/model-context-protocol-mcp-cover.png',
    imageAlt: 'Host de IA conectado mediante un hub seguro de Model Context Protocol a herramientas, recursos, prompts, código y datos',
    imageWidth: 1536,
    imageHeight: 1024
  }
];

export const ARTICLE_SUMMARIES: ArticleSummary[] = [
  ...MCP_ARTICLES,
  OVERVIEW_ARTICLE,
  ...TOOL_ARTICLES.map((article) => ({
    title: article.title,
    excerpt: article.description,
    category: article.category,
    languageFlag: ENGLISH_FLAG,
    publishedAt: article.publishedAt,
    publishedIso: article.publishedIso,
    readingTime: article.readingTime,
    route: `/articles/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    imageWidth: article.imageWidth ?? 1731,
    imageHeight: article.imageHeight ?? 909
  }))
];

export function findToolArticle(slug: string): ToolArticle | undefined {
  return TOOL_ARTICLES.find((article) => article.slug === slug);
}
