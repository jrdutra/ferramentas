import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MenuComponent} from './menu/menu.component'
import {MatCardModule} from '@angular/material/card';
import { SeoService } from './seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly consentStorageKey = 'utily.tools.privacy-consent.v1';

  title = 'utily.tools';
  showPrivacyConsent = false;

  constructor(
    private readonly seoService: SeoService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.seoService.init();
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.showPrivacyConsent = localStorage.getItem(this.consentStorageKey) !== 'accepted';
  }

  acceptPrivacyTerms(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.consentStorageKey, 'accepted');
    }
    this.showPrivacyConsent = false;
  }
}
