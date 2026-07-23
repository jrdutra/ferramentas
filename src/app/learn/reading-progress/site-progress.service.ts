import { Injectable, inject } from '@angular/core';

import { ArticleProgressService } from './article-progress.service';
import { ReadingProgressService } from './reading-progress.service';

/** Display metadata for each learning path (trilha), keyed by path id. */
const LEARN_PATH_META: ReadonlyArray<{ id: string; title: string }> = [
  { id: 'corporate-api-fundamentals', title: 'Corporate API Fundamentals and Architecture' }
];

export interface LearnPathOption {
  id: string;
  title: string;
  hasProgress: boolean;
}

export interface ProgressSelection {
  /** Include standalone article progress. */
  articles: boolean;
  /** Learning path ids to include. */
  paths: string[];
}

export interface SiteProgressExport {
  app: string;
  kind: string;
  version: number;
  exportedAt: string;
  articles?: Record<string, boolean>;
  learn?: Record<string, boolean>;
}

/**
 * Coordinates the two progress stores (Learn chapters + standalone articles)
 * for a single, selectable export/import experience shared across the site.
 */
@Injectable({ providedIn: 'root' })
export class SiteProgressService {
  private readonly learn = inject(ReadingProgressService);
  private readonly articles = inject(ArticleProgressService);

  /** All learning paths, flagged with whether they currently hold progress. */
  pathOptions(): LearnPathOption[] {
    return LEARN_PATH_META.map((meta) => ({
      id: meta.id,
      title: meta.title,
      hasProgress: this.learn.pathHasProgress(meta.id)
    }));
  }

  /** Paths that currently hold progress (pre-checked in the export modal). */
  pathsWithProgress(): string[] {
    return this.learn.pathsWithProgress();
  }

  articleCount(): number {
    return this.articles.count();
  }

  learnCount(): number {
    return this.learn.count();
  }

  hasAnyProgress(): boolean {
    return this.articleCount() > 0 || this.learnCount() > 0;
  }

  /** Builds an export payload restricted to the user's selection. */
  buildExport(selection: ProgressSelection): SiteProgressExport {
    const payload: SiteProgressExport = {
      app: 'The Big Learn',
      kind: 'site-reading-progress',
      version: 2,
      exportedAt: new Date().toISOString()
    };

    if (selection.articles) {
      payload.articles = this.articles.snapshot();
    }
    if (selection.paths.length) {
      payload.learn = this.learn.snapshotForPaths(new Set(selection.paths));
    }
    return payload;
  }

  /**
   * Imports a payload, merging both stores. Accepts the new combined format
   * (v2, with `articles` / `learn`) and the legacy learn-only format
   * (`progress` map). Returns how many entries were applied to each store.
   * Throws on invalid JSON so callers can surface an error.
   */
  import(raw: string): { articles: number; learn: number } {
    const data = JSON.parse(raw) as Record<string, unknown>;

    let learnApplied = 0;
    let articlesApplied = 0;

    if (data['articles'] && typeof data['articles'] === 'object') {
      articlesApplied = this.articles.merge(data['articles'] as Record<string, boolean>);
    }
    if (data['learn'] && typeof data['learn'] === 'object') {
      learnApplied = this.learn.merge(data['learn'] as Record<string, boolean>);
    }

    // Legacy format: a flat `progress` map of learn keys (or the object itself).
    if (!data['articles'] && !data['learn']) {
      const legacy = (data['progress'] && typeof data['progress'] === 'object')
        ? (data['progress'] as Record<string, boolean>)
        : (data as Record<string, boolean>);
      learnApplied = this.learn.merge(legacy);
      articlesApplied = this.articles.merge(legacy);
    }

    return { articles: articlesApplied, learn: learnApplied };
  }
}
