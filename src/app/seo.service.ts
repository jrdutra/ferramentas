import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface SeoRouteData {
  title: string;
  description: string;
  keywords: string;
  canonicalPath?: string;
  pageType?: 'website' | 'collection' | 'article';
  imagePath?: string;
  imageWidth?: number;
  imageHeight?: number;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  articleItems?: SeoArticleListItem[];
}

export interface SeoArticleListItem {
  title: string;
  path: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'utily.tools';
  private readonly siteUrl = 'https://utily.tools';
  private readonly defaultImage = `${this.siteUrl}/assets/capa.png`;
  private readonly robotsDirective = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  private initialized = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.applyRouteSeo());

    this.applyRouteSeo();
  }

  private applyRouteSeo(): void {
    const route = this.getDeepestRoute(this.activatedRoute);
    const seo = route.snapshot.data['seo'] as SeoRouteData | undefined;
    if (!seo) return;

    const path = seo.canonicalPath ?? this.router.url.split('?')[0].split('#')[0];
    const normalizedPath = path === '/home' ? '/' : path;
    const canonicalUrl = `${this.siteUrl}${normalizedPath === '/' ? '' : normalizedPath}`;
    const fullTitle = `${seo.title} | ${this.siteName}`;
    const imageUrl = seo.imagePath ? `${this.siteUrl}${seo.imagePath}` : this.defaultImage;
    const imageWidth = seo.imageWidth ?? 1200;
    const imageHeight = seo.imageHeight ?? 1200;
    const openGraphType = seo.pageType === 'article' ? 'article' : 'website';

    this.title.setTitle(fullTitle);
    this.setCanonical(canonicalUrl);
    this.setAlternate('en', canonicalUrl);
    this.setAlternate('x-default', canonicalUrl);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    this.meta.updateTag({ name: 'robots', content: this.robotsDirective });
    this.meta.updateTag({ name: 'googlebot', content: this.robotsDirective });
    this.meta.updateTag({ name: 'bingbot', content: this.robotsDirective });
    this.meta.updateTag({ name: 'author', content: this.siteName });
    this.meta.updateTag({ name: 'application-name', content: this.siteName });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: openGraphType });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:url', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
    this.meta.updateTag({ property: 'og:image:width', content: String(imageWidth) });
    this.meta.updateTag({ property: 'og:image:height', content: String(imageHeight) });
    this.meta.updateTag({ property: 'og:image:alt', content: `${seo.title} on ${this.siteName}` });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:domain', content: 'utily.tools' });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: `${seo.title} on ${this.siteName}` });

    this.setArticleMeta(seo);
    this.setJsonLd(seo, canonicalUrl, imageUrl, imageWidth, imageHeight);
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setAlternate(language: string, url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${language}"]`);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', language);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setArticleMeta(seo: SeoRouteData): void {
    const articleMeta = [
      { property: 'article:published_time', content: seo.publishedTime },
      { property: 'article:modified_time', content: seo.modifiedTime },
      { property: 'article:author', content: seo.author },
      { property: 'article:section', content: seo.section }
    ];

    for (const item of articleMeta) {
      if (seo.pageType === 'article' && item.content) {
        this.meta.updateTag({ property: item.property, content: item.content });
      } else {
        this.meta.removeTag(`property='${item.property}'`);
      }
    }
  }

  private setJsonLd(
    seo: SeoRouteData,
    canonicalUrl: string,
    imageUrl: string,
    imageWidth: number,
    imageHeight: number
  ): void {
    let script = this.document.querySelector<HTMLScriptElement>('script[data-seo-json-ld="true"]');
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-json-ld', 'true');
      this.document.head.appendChild(script);
    }

    const isHome = canonicalUrl === this.siteUrl;
    const pageSchemaType = seo.pageType === 'collection' ? 'CollectionPage' : 'WebPage';
    const graph: object[] = [
      {
        '@type': pageSchemaType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${this.siteUrl}/#website` },
        primaryImageOfPage: { '@id': `${imageUrl}#primaryimage` }
      },
      {
        '@type': 'ImageObject',
        '@id': `${imageUrl}#primaryimage`,
        url: imageUrl,
        contentUrl: imageUrl,
        width: imageWidth,
        height: imageHeight,
        caption: `${seo.title} on ${this.siteName}`
      },
      {
        '@type': 'Organization',
        '@id': `${this.siteUrl}/#organization`,
        name: this.siteName,
        url: `${this.siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: this.defaultImage,
          width: 1200,
          height: 1200
        }
      }
    ];

    if (seo.pageType === 'article') {
      graph.push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: seo.title,
        description: seo.description,
        url: canonicalUrl,
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
        image: { '@id': `${imageUrl}#primaryimage` },
        datePublished: seo.publishedTime,
        dateModified: seo.modifiedTime ?? seo.publishedTime,
        articleSection: seo.section,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: seo.author ?? this.siteName,
          url: `${this.siteUrl}/about`
        },
        publisher: { '@id': `${this.siteUrl}/#organization` }
      });
    } else if (seo.pageType === 'collection') {
      graph.push({
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#articles`,
        name: seo.title,
        numberOfItems: seo.articleItems?.length ?? 0,
        itemListElement: (seo.articleItems ?? []).map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${this.siteUrl}${article.path}`,
          name: article.title,
          image: `${this.siteUrl}${article.imagePath}`
        }))
      });
    } else {
      graph.push({
        '@type': 'WebApplication',
        '@id': `${canonicalUrl}#application`,
        name: seo.title,
        description: seo.description,
        url: canonicalUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires a modern web browser with JavaScript enabled',
        image: imageUrl,
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD'
        },
        publisher: { '@id': `${this.siteUrl}/#organization` }
      });
    }

    if (isHome) {
      graph.push({
        '@type': 'WebSite',
        '@id': `${this.siteUrl}/#website`,
        url: `${this.siteUrl}/`,
        name: this.siteName,
        alternateName: 'utily tools',
        inLanguage: 'en',
        publisher: { '@id': `${this.siteUrl}/#organization` }
      });
    } else {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${this.siteUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: seo.title,
            item: canonicalUrl
          }
        ]
      });
    }

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });
  }
}
