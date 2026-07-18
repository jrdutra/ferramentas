import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OAUTH_2_EN_BLOCKS } from './oauth-2-content.data';

@Component({
  selector: 'app-oauth-2-flows-tokens-security-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OAuth2FlowsTokensSecurityEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 16';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'OAuth 2.0 in Depth: Flows, Tokens, and Security';
  readonly articleLead = 'Roles, endpoints, Authorization Code with PKCE, Client Credentials, refresh tokens, introspection, revocation, and modern protection practices';
  readonly editionNote = 'In-depth edition - study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/oauth-2-flows-tokens-security-cover.png';
  readonly coverAlt = 'OAuth 2.0 flows protected by PKCE, tokens, and modern security controls';
  readonly footerText = 'End of Chapter 16 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = OAUTH_2_EN_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
