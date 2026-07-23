import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { LearnPathOption, SiteProgressService } from './site-progress.service';

@Component({
  selector: 'app-site-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-progress.component.html',
  styleUrl: './site-progress.component.css'
})
export class SiteProgressComponent {
  /** Visual style of the two buttons: 'pill' (default) or 'cta' (home hero). */
  @Input() variant: 'pill' | 'cta' = 'pill';
  /** When false, hides the small "N read" summary next to the buttons. */
  @Input() showCount = true;

  @ViewChild('importInput') private importInput?: ElementRef<HTMLInputElement>;

  private readonly progress = inject(SiteProgressService);
  private readonly cdr = inject(ChangeDetectorRef);

  modalOpen = false;
  pathOptions: LearnPathOption[] = [];
  articlesSelected = true;
  pathSelected: Record<string, boolean> = {};

  feedback: { type: 'success' | 'error'; message: string } | null = null;

  get articleCount(): number {
    return this.progress.articleCount();
  }

  get learnCount(): number {
    return this.progress.learnCount();
  }

  get totalCount(): number {
    return this.articleCount + this.learnCount;
  }

  // ── Export modal ──────────────────────────────────────────────────────
  openExport(): void {
    this.pathOptions = this.progress.pathOptions();
    this.articlesSelected = this.articleCount > 0;
    this.pathSelected = {};
    for (const option of this.pathOptions) {
      this.pathSelected[option.id] = option.hasProgress;
    }
    this.feedback = null;
    this.modalOpen = true;
    this.cdr.markForCheck();
  }

  closeExport(): void {
    this.modalOpen = false;
    this.cdr.markForCheck();
  }

  /** True when every path that has progress is selected (drives the Learn box). */
  get learnAllSelected(): boolean {
    const withProgress = this.pathOptions.filter((p) => p.hasProgress);
    return withProgress.length > 0 && withProgress.every((p) => this.pathSelected[p.id]);
  }

  get learnSomeSelected(): boolean {
    return this.pathOptions.some((p) => p.hasProgress && this.pathSelected[p.id]);
  }

  get learnIndeterminate(): boolean {
    return this.learnSomeSelected && !this.learnAllSelected;
  }

  toggleLearnAll(checked: boolean): void {
    for (const option of this.pathOptions) {
      if (option.hasProgress) this.pathSelected[option.id] = checked;
    }
    this.cdr.markForCheck();
  }

  get selectedPathIds(): string[] {
    return this.pathOptions.filter((p) => this.pathSelected[p.id]).map((p) => p.id);
  }

  get canExport(): boolean {
    return this.articlesSelected || this.selectedPathIds.length > 0;
  }

  confirmExport(): void {
    if (!this.canExport || typeof window === 'undefined') return;

    const payload = this.progress.buildExport({
      articles: this.articlesSelected,
      paths: this.selectedPathIds
    });

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = url;
    link.download = `the-big-learn-progress-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.modalOpen = false;
    this.feedback = { type: 'success', message: 'Progress exported.' };
    this.cdr.markForCheck();
  }

  // ── Import ────────────────────────────────────────────────────────────
  triggerImport(): void {
    this.feedback = null;
    this.importInput?.nativeElement.click();
  }

  onImportFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = this.progress.import(String(reader.result ?? ''));
        const parts: string[] = [];
        if (result.learn) parts.push(`${result.learn} learn ${result.learn === 1 ? 'chapter' : 'chapters'}`);
        if (result.articles) parts.push(`${result.articles} ${result.articles === 1 ? 'article' : 'articles'}`);
        this.feedback = {
          type: 'success',
          message: parts.length ? `Imported ${parts.join(' and ')}.` : 'No new progress found in that file.'
        };
      } catch {
        this.feedback = { type: 'error', message: 'That file is not a valid progress export.' };
      }
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.onerror = () => {
      this.feedback = { type: 'error', message: 'Could not read that file.' };
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.readAsText(file);
  }
}
