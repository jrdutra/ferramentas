export interface ArticleTechnicalPoint {
  title: string;
  paragraphs: string[];
}

export interface ArticleExample {
  title: string;
  description: string;
}

export interface ArticleDetailItem {
  name: string;
  description: string;
}

export interface ArticleDetailTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleDeepDiveSection {
  title: string;
  paragraphs: string[];
  items?: ArticleDetailItem[];
  table?: ArticleDetailTable;
}

export interface ArticleReference {
  title: string;
  url: string;
  publisher: string;
}

export interface ArticleDeepDive {
  readingTime: string;
  deepDiveSections: ArticleDeepDiveSection[];
  references: ArticleReference[];
}

export interface ToolArticle {
  slug: string;
  toolName: string;
  toolRoute: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  publishedAt: string;
  publishedIso: string;
  modifiedIso: string;
  readingTime: string;
  introduction: string[];
  theoryTitle: string;
  theory: string[];
  technicalIntroduction: string[];
  technicalPoints: ArticleTechnicalPoint[];
  examples: ArticleExample[];
  conclusion: string[];
  deepDiveSections?: ArticleDeepDiveSection[];
  references?: ArticleReference[];
}
