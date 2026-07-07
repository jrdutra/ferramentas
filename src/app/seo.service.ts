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
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'utily.tools';
  private readonly siteUrl = 'https://utily.toolss';
  private readonly defaultImage = `${this.siteUrl}/assets/capa.png`;
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

    this.title.setTitle(fullTitle);
    this.setCanonical(canonicalUrl);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: this.siteName });
    this.meta.updateTag({ name: 'application-name', content: this.siteName });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ property: 'og:image:alt', content: `${seo.title} on ${this.siteName}` });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'twitter:image:alt', content: `${seo.title} on ${this.siteName}` });

    this.setJsonLd(seo, canonicalUrl);
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

  private setJsonLd(seo: SeoRouteData, canonicalUrl: string): void {
    let script = this.document.querySelector<HTMLScriptElement>('script[data-seo-json-ld="true"]');
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-json-ld', 'true');
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: seo.title,
      description: seo.description,
      url: canonicalUrl,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      image: this.defaultImage,
      isAccessibleForFree: true,
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        url: this.siteUrl,
        logo: this.defaultImage
      }
    });
  }
}
