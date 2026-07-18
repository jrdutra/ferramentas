import { Injectable, signal } from '@angular/core';

import { VALID_CHAPTER_IDS, isValidTopicKey, topicKey } from './learn-catalog';

const STORAGE_KEY = 'utily.learn.reading-progress';

export interface ReadingProgressExport {
  app: string;
  kind: string;
  version: number;
  exportedAt: string;
  progress: Record<string, boolean>;
}

/**
 * Stores which Learn articles the user has marked as read.
 *
 * State is kept in a signal so OnPush components (Learn page cards and the
 * in-article toggle) update automatically. It is persisted to localStorage and
 * is SSR-safe: on the server there is no window, so it degrades to an in-memory
 * empty map and never throws.
 */
@Injectable({ providedIn: 'root' })
export class ReadingProgressService {
  private readonly state = signal<Record<string, boolean>>(this.load());

  /** Reactive read-only view of the read map ({ route: true }). */
  readonly progress = this.state.asReadonly();

  private hasStorage(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private load(): Record<string, boolean> {
    if (!this.hasStorage()) {
      return {};
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? this.sanitize(JSON.parse(raw)) : {};
    } catch {
      return {};
    }
  }

  /**
   * Accepts either a flat map ({ chapterId: true }) or a full export object
   * ({ progress: { chapterId: true } }). Only keeps known chapter ids flagged
   * true, discarding anything unrecognized (including legacy route-based keys).
   */
  private sanitize(value: unknown): Record<string, boolean> {
    const result: Record<string, boolean> = {};

    if (!value || typeof value !== 'object') {
      return result;
    }

    const candidate = value as Record<string, unknown>;
    const map =
      candidate['progress'] && typeof candidate['progress'] === 'object'
        ? (candidate['progress'] as Record<string, unknown>)
        : candidate;

    for (const [key, val] of Object.entries(map)) {
      if ((VALID_CHAPTER_IDS.has(key) || isValidTopicKey(key)) && val === true) {
        result[key] = true;
      }
    }

    return result;
  }

  private persist(next: Record<string, boolean>): void {
    this.state.set(next);

    if (!this.hasStorage()) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota / disabled-storage errors: in-memory state still updates.
    }
  }

  isRead(chapterId: string): boolean {
    return this.state()[chapterId] === true;
  }

  setRead(chapterId: string, read: boolean): void {
    const current = this.state();
    if (read === (current[chapterId] === true)) {
      return;
    }

    const next = { ...current };
    if (read) {
      next[chapterId] = true;
    } else {
      delete next[chapterId];
    }
    this.persist(next);
  }

  toggle(chapterId: string): void {
    this.setRead(chapterId, !this.isRead(chapterId));
  }

  /** A topic counts as read when its own key is set or the whole chapter is read. */
  isTopicRead(chapterId: string, topicIndex: number): boolean {
    const state = this.state();
    return state[topicKey(chapterId, topicIndex)] === true || state[chapterId] === true;
  }

  /**
   * Marks one topic and keeps the chapter in sync: reading the last missing
   * topic marks the chapter read; unreading any topic unmarks the chapter
   * (materializing the other topics first when the chapter was read).
   */
  setTopicRead(chapterId: string, topicIndex: number, topicCount: number, read: boolean): void {
    const current = this.state();
    const next = { ...current };
    if (read) {
      next[topicKey(chapterId, topicIndex)] = true;
      let all = true;
      for (let i = 0; i < topicCount; i++) {
        if (next[topicKey(chapterId, i)] !== true) {
          all = false;
          break;
        }
      }
      if (all && topicCount > 0) next[chapterId] = true;
    } else {
      if (current[chapterId] === true) {
        for (let i = 0; i < topicCount; i++) {
          if (i !== topicIndex) next[topicKey(chapterId, i)] = true;
        }
      }
      delete next[topicKey(chapterId, topicIndex)];
      delete next[chapterId];
    }
    this.persist(next);
  }

  /** Sets the chapter and cascades the same state to all of its topics. */
  setChapterRead(chapterId: string, topicCount: number, read: boolean): void {
    const next = { ...this.state() };
    if (read) {
      next[chapterId] = true;
      for (let i = 0; i < topicCount; i++) next[topicKey(chapterId, i)] = true;
    } else {
      delete next[chapterId];
      for (let i = 0; i < topicCount; i++) delete next[topicKey(chapterId, i)];
    }
    this.persist(next);
  }

  /** Fraction (0..1) of a chapter that has been read, using topic granularity. */
  chapterCompletion(chapterId: string, topicCount: number): number {
    const state = this.state();
    if (state[chapterId] === true) return 1;
    if (topicCount <= 0) return 0;
    let read = 0;
    for (let i = 0; i < topicCount; i++) {
      if (state[topicKey(chapterId, i)] === true) read++;
    }
    return read / topicCount;
  }

  clear(): void {
    this.persist({});
  }

  /** Number of articles (chapters) currently marked as read. */
  count(): number {
    return Object.keys(this.state()).filter((key) => VALID_CHAPTER_IDS.has(key)).length;
  }

  export(): ReadingProgressExport {
    return {
      app: 'utily.tools',
      kind: 'learn-reading-progress',
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: { ...this.state() }
    };
  }

  /**
   * Merges an exported payload into the current progress and persists it.
   * Returns the number of read entries found in the imported payload.
   * Throws on invalid JSON so the caller can surface an error.
   */
  import(raw: string): number {
    const sanitized = this.sanitize(JSON.parse(raw));
    this.persist({ ...this.state(), ...sanitized });
    return Object.keys(sanitized).filter((key) => VALID_CHAPTER_IDS.has(key)).length;
  }
}
