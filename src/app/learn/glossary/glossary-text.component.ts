import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { GlossaryEntry } from './glossary.model';
import { GlossaryPopoverService } from './glossary-popover.service';

interface GlossaryTextSegment {
  text: string;
  entry?: GlossaryEntry;
}

interface GlossaryCandidate {
  text: string;
  entry: GlossaryEntry;
}

let nextComponentId = 0;

@Component({
  selector: 'app-glossary-text',
  standalone: true,
  templateUrl: './glossary-text.component.html',
  styleUrl: './glossary-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlossaryTextComponent implements OnChanges {
  @Input({ required: true }) text = '';
  @Input({ required: true }) glossary: readonly GlossaryEntry[] = [];

  readonly componentId = `glossary-text-${nextComponentId++}`;
  segments: readonly GlossaryTextSegment[] = [];

  constructor(readonly popover: GlossaryPopoverService) {}

  ngOnChanges(): void {
    this.segments = this.segmentText(this.text, this.glossary);
  }

  occurrenceId(index: number): string {
    return `${this.componentId}-${index}`;
  }

  private segmentText(text: string, glossary: readonly GlossaryEntry[]): readonly GlossaryTextSegment[] {
    const candidates = this.buildCandidates(glossary);
    if (!text || candidates.length === 0) {
      return [{ text }];
    }

    const candidateByText = new Map(candidates.map((candidate) => [candidate.text.toLocaleLowerCase(), candidate]));
    const alternatives = candidates.map((candidate) => this.escapeRegExp(candidate.text)).join('|');
    const matcher = new RegExp(`(^|[^\\p{L}\\p{N}_])(${alternatives})(?=$|[^\\p{L}\\p{N}_])`, 'giu');
    const segments: GlossaryTextSegment[] = [];
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text)) !== null) {
      const prefix = match[1];
      const matchedTerm = match[2];
      const termStart = match.index + prefix.length;

      if (termStart > cursor) {
        segments.push({ text: text.slice(cursor, termStart) });
      }

      const candidate = candidateByText.get(matchedTerm.toLocaleLowerCase());
      segments.push({ text: matchedTerm, entry: candidate?.entry });
      cursor = termStart + matchedTerm.length;
    }

    if (cursor < text.length) {
      segments.push({ text: text.slice(cursor) });
    }

    return segments.length > 0 ? segments : [{ text }];
  }

  private buildCandidates(glossary: readonly GlossaryEntry[]): readonly GlossaryCandidate[] {
    const candidates = new Map<string, GlossaryCandidate>();

    for (const entry of glossary) {
      const variants = [entry.term];
      if (entry.term.includes('/')) {
        variants.push(...entry.term.split('/'));
      }

      for (const parenthetical of entry.term.matchAll(/\(([^()]+)\)/g)) {
        variants.push(parenthetical[1]);
      }

      for (const variant of variants) {
        const normalized = variant.trim();
        if (normalized.length > 1) {
          candidates.set(normalized.toLocaleLowerCase(), { text: normalized, entry });
        }
      }
    }

    return [...candidates.values()].sort((a, b) => b.text.length - a.text.length);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
