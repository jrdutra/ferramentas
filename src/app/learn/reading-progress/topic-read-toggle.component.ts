import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ReadingProgressService } from './reading-progress.service';
import { ArticleLang, chapterIdForRoute } from './learn-catalog';

const LABELS: Record<ArticleLang, { mark: string; unmark: string }> = {
  pt: { mark: 'Marcar este tópico como lido', unmark: 'Tópico lido. Clique para desmarcar' },
  en: { mark: 'Mark this topic as read', unmark: 'Topic read. Click to unmark' },
  es: { mark: 'Marcar este tema como leído', unmark: 'Tema leído. Haz clic para desmarcar' }
};

/** Blocks shaped like the Learn chapter content (kind/level are what matters here). */
interface TopicBlockLike {
  kind: string;
  level?: number;
}

/**
 * Per-topic check bullet shown in the left gutter of each chapter section
 * (level-2 heading). It derives the chapter from the router URL, and its topic
 * index from the position of its heading block among the chapter's level-2
 * headings, so the same progress keys work across languages.
 */
@Component({
  selector: 'app-topic-read-toggle',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="topic-check"
      [class.is-read]="isRead()"
      (click)="toggle()"
      [attr.aria-pressed]="isRead()"
      [attr.aria-label]="isRead() ? labels().unmark : labels().mark"
      [title]="isRead() ? labels().unmark : labels().mark">
      <mat-icon aria-hidden="true">{{ isRead() ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }

    .topic-check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: transparent;
      color: rgba(185, 200, 219, 0.55);
      cursor: pointer;
      line-height: 1;
      transition: color 0.2s ease, transform 0.15s ease;
    }

    .topic-check:hover { color: var(--aqua); transform: scale(1.12); }

    .topic-check:focus-visible {
      outline: 2px solid var(--aqua);
      outline-offset: 2px;
      border-radius: 50%;
    }

    .topic-check mat-icon {
      width: 1em;
      height: 1em;
      font-size: 1.35rem;
    }

    .topic-check.is-read { color: #1fd47a; }
  `]
})
export class TopicReadToggleComponent {
  /** The heading block this check belongs to. */
  @Input({ required: true }) block!: TopicBlockLike;
  /** The chapter's full block list, used to derive the topic index and count. */
  @Input({ required: true }) blocks: TopicBlockLike[] = [];

  private readonly router = inject(Router);
  private readonly progressService = inject(ReadingProgressService);

  private topics(): TopicBlockLike[] {
    return (this.blocks ?? []).filter((b) => b?.kind === 'heading' && b?.level === 2);
  }

  private route(): string {
    return this.router.url.split('#')[0].split('?')[0];
  }

  private chapterId(): string | null {
    return chapterIdForRoute(this.route());
  }

  labels(): { mark: string; unmark: string } {
    const segment = this.route().split('/')[2];
    return LABELS[segment === 'pt' || segment === 'es' ? (segment as ArticleLang) : 'en'];
  }

  isRead(): boolean {
    const chapterId = this.chapterId();
    if (!chapterId) return false;
    const index = this.topics().indexOf(this.block);
    return index >= 0 && this.progressService.isTopicRead(chapterId, index);
  }

  toggle(): void {
    const chapterId = this.chapterId();
    if (!chapterId) return;
    const topics = this.topics();
    const index = topics.indexOf(this.block);
    if (index < 0) return;
    this.progressService.setTopicRead(chapterId, index, topics.length, !this.isRead());
  }
}
