import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlossaryPopoverService implements OnDestroy {
  readonly activeId = signal<string | null>(null);

  private readonly removeListeners: Array<() => void> = [];

  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent): void => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('[data-glossary-trigger]')) {
        this.close();
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('click', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    this.removeListeners.push(
      () => document.removeEventListener('click', closeOnOutsideClick),
      () => document.removeEventListener('keydown', closeOnEscape)
    );
  }

  toggle(id: string): void {
    this.activeId.update((activeId) => activeId === id ? null : id);
  }

  close(): void {
    this.activeId.set(null);
  }

  ngOnDestroy(): void {
    this.removeListeners.forEach((removeListener) => removeListener());
  }
}
