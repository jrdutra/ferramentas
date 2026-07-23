import { Injectable, signal } from '@angular/core';

import { ARTICLE_SUMMARIES } from '../../articles/articles.data';

const STORAGE_KEY = 'utily.articles.reading-progress';

/** Every route that counts as a standalone article, used to sanitize input. */
const VALID_ARTICLE_ROUTES: ReadonlySet<string> = new Set(
  ARTICLE_SUMMARIES.map((article) => article.route)
);

/**
 * Tracks which standalone articles (the Articles tab) the user has marked as
 * read. Mirrors {@link ReadingProgressService} but keyed by article route and
 * stored under its own localStorage namespace. SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class ArticleProgressService {
  private readonly state = signal<Record<string, boolean>>(this.load());

  /** Reactive read-only view of the read map ({ route: true }). */
  readonly progress = this.state.asReadonly();

  private hasStorage(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private load(): Record<string, boolean> {
    if (!this.hasStorage()) return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? this.sanitize(JSON.parse(raw)) : {};
    } catch {
      return {};
    }
  }

  /** Keeps only known article routes flagged true. Accepts flat or wrapped maps. */
  sanitize(value: unknown): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    if (!value || typeof value !== 'object') return result;

    const candidate = value as Record<string, unknown>;
    const map =
      candidate['articles'] && typeof candidate['articles'] === 'object'
        ? (candidate['articles'] as Record<string, unknown>)
        : candidate;

    for (const [key, val] of Object.entries(map)) {
      if (VALID_ARTICLE_ROUTES.has(key) && val === true) result[key] = true;
    }
    return result;
  }

  private persist(next: Record<string, boolean>): void {
    this.state.set(next);
    if (!this.hasStorage()) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota / disabled-storage errors: in-memory state still updates.
    }
  }

  isRead(route: string): boolean {
    return this.state()[route] === true;
  }

  setRead(route: string, read: boolean): void {
    const current = this.state();
    if (read === (current[route] === true)) return;
    const next = { ...current };
    if (read) next[route] = true;
    else delete next[route];
    this.persist(next);
  }

  toggle(route: string): void {
    this.setRead(route, !this.isRead(route));
  }

  /** Number of articles currently marked as read. */
  count(): number {
    return Object.keys(this.state()).filter((k) => VALID_ARTICLE_ROUTES.has(k)).length;
  }

  /** Snapshot of the read map (for combined export). */
  snapshot(): Record<string, boolean> {
    return { ...this.state() };
  }

  /** Merges a sanitized map into the current progress and persists it. */
  merge(map: Record<string, boolean>): number {
    const clean = this.sanitize(map);
    this.persist({ ...this.state(), ...clean });
    return Object.keys(clean).length;
  }

  clear(): void {
    this.persist({});
  }
}
