import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OPENID_CONNECT_EN_BLOCKS } from './openid-connect-content.data';

@Component({
  selector: 'app-openid-connect-id-tokens-sessions-federation-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenIdConnectIdTokensSessionsFederationEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 17';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'OpenID Connect (OIDC): ID Tokens, Sessions, and Identity Federation';
  readonly articleLead = 'From user authentication to ID Token validation, UserInfo, assurance levels, SSO, and federated logout';
  readonly editionNote = 'In-depth edition - study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png';
  readonly coverAlt = 'Federated OpenID Connect identity with verifiable ID Tokens, sessions, and Relying Parties';
  readonly footerText = 'End of Chapter 17 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = OPENID_CONNECT_EN_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
