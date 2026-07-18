import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { BASIC_AUTH_DIGEST_API_KEYS_EN_BLOCKS } from './basic-auth-digest-api-keys-content.data';

@Component({
  selector: 'app-basic-auth-digest-api-keys-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAuthDigestApiKeysEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 15';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Basic Auth, Digest, and API Keys';
  readonly articleLead = 'Operation, risks, storage, rotation, and controlled use of static credentials in enterprise APIs';
  readonly editionNote = 'In-depth edition - study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/basic-auth-digest-api-keys-cover.png';
  readonly coverAlt = 'Basic Auth, Digest, and API keys converging on a protected enterprise gateway';
  readonly footerText = 'End of Chapter 15 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = BASIC_AUTH_DIGEST_API_KEYS_EN_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
