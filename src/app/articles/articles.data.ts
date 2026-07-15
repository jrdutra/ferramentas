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

export const OVERVIEW_ARTICLE: ArticleSummary = {
  title: 'What Is utily.tools?',
  excerpt: 'Learn how utily.tools brings practical developer utilities together in one browser-based workspace.',
  category: 'About utily.tools',
  publishedAt: 'July 15, 2026',
  publishedIso: '2026-07-15',
  readingTime: '10 min read',
  route: '/articles/what-is-utily-tools',
  image: '/assets/articles/what-is-utily-tools-cover.png',
  imageAlt: 'Illustration of a browser-based developer toolbox with code, security, document and QR code utilities',
  imageWidth: 1731,
  imageHeight: 909
};

export const ARTICLE_SUMMARIES: ArticleSummary[] = [
  OVERVIEW_ARTICLE,
  ...TOOL_ARTICLES.map((article) => ({
    title: article.title,
    excerpt: article.description,
    category: article.category,
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
