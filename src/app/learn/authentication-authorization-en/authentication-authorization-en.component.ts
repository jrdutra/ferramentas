import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { AUTHENTICATION_AUTHORIZATION_EN_BLOCKS } from './authentication-authorization-content.data';

@Component({
  selector: 'app-authentication-authorization-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationAuthorizationEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 14';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Authentication vs. Authorization';
  readonly articleLead = 'How to distinguish identity proof, access decisions, delegation, context, and enforcement in enterprise APIs';
  readonly editionNote = 'In-depth edition - study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/authentication-authorization-cover.png';
  readonly coverAlt = 'Authentication and authorization as distinct stages of access security in enterprise APIs';
  readonly footerText = 'End of Chapter 14 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = AUTHENTICATION_AUTHORIZATION_EN_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
