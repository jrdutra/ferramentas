import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ReadingProgressService } from './reading-progress.service';
import { ArticleLang, chapterIdForRoute } from './learn-catalog';

interface ToggleLabels {
  mark: string;
  read: string;
  ariaMark: string;
  ariaRead: string;
}

const LABELS: Record<ArticleLang, ToggleLabels> = {
  pt: {
    mark: 'Marcar como lido',
    read: 'Lido',
    ariaMark: 'Marcar este artigo como lido',
    ariaRead: 'Artigo marcado como lido. Clique para desmarcar'
  },
  en: {
    mark: 'Mark as read',
    read: 'Read',
    ariaMark: 'Mark this article as read',
    ariaRead: 'Article marked as read. Click to unmark'
  },
  es: {
    mark: 'Marcar como leído',
    read: 'Leído',
    ariaMark: 'Marcar este artículo como leído',
    ariaRead: 'Artículo marcado como leído. Haz clic para desmarcar'
  }
};

/**
 * In-article "mark as read" control. It identifies its article from the
 * current router URL (matching the routes used on the Learn page) and reads
 * its language from the /learn/<lang>/ segment, so hosting components only need
 * to drop the tag in and add the import — no extra wiring.
 */
@Component({
  selector: 'app-article-read-toggle',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="read-toggle"
      [class.is-read]="isRead()"
      (click)="toggle()"
      [attr.aria-pressed]="isRead()"
      [attr.aria-label]="isRead() ? labels().ariaRead : labels().ariaMark">
      <mat-icon aria-hidden="true">{{ isRead() ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
      <span>{{ isRead() ? labels().read : labels().mark }}</span>
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }

    .read-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      padding: 0.55em 1.1em;
      border: 1px solid rgba(0, 255, 209, 0.35);
      border-radius: 2em;
      background: rgba(3, 11, 27, 0.6);
      color: var(--text-main);
      font: inherit;
      font-weight: 600;
      line-height: 1;
      cursor: pointer;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    }

    .read-toggle:hover {
      border-color: var(--aqua);
      box-shadow: 0 0 16px rgba(0, 255, 209, 0.18);
    }

    .read-toggle:focus-visible {
      outline: 2px solid var(--aqua);
      outline-offset: 2px;
    }

    .read-toggle mat-icon {
      width: 1.2em;
      height: 1.2em;
      font-size: 1.2em;
    }

    .read-toggle.is-read {
      border-color: #1fd47a;
      color: #7dffb8;
      background: rgba(31, 212, 122, 0.12);
    }

    .read-toggle.is-read mat-icon {
      color: #1fd47a;
    }
  `]
})
export class ArticleReadToggleComponent {
  /**
   * Chapter blocks, when provided by the hosting article. Used to cascade the
   * chapter check to every level-2 topic check (and back when unmarking).
   */
  @Input() blocks: { kind: string; level?: number }[] | null = null;

  private readonly router = inject(Router);
  private readonly progressService = inject(ReadingProgressService);

  readonly isRead = computed(() => {
    const chapterId = this.chapterId();
    return chapterId ? this.progressService.progress()[chapterId] === true : false;
  });
  readonly labels = computed(() => LABELS[this.lang()]);

  private route(): string {
    return this.router.url.split('#')[0].split('?')[0];
  }

  private chapterId(): string | null {
    return chapterIdForRoute(this.route());
  }

  private lang(): ArticleLang {
    const segment = this.route().split('/')[2];
    return segment === 'pt' || segment === 'es' ? segment : 'en';
  }

  toggle(): void {
    const chapterId = this.chapterId();
    if (!chapterId) return;
    const topicCount = (this.blocks ?? []).filter((b) => b?.kind === 'heading' && b?.level === 2).length;
    if (topicCount > 0) {
      this.progressService.setChapterRead(chapterId, topicCount, !this.isRead());
    } else {
      this.progressService.toggle(chapterId);
    }
  }
}
