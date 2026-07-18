import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { HTTPS_TLS_EN_CHAPTER_BLOCKS } from './https-tls-content.data';

@Component({
  selector: 'app-https-tls-in-depth-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpsTlsInDepthEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 6';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'HTTPS and TLS in Depth';
  readonly articleLead = 'Cryptography, handshakes, certificates, and trust in enterprise API architectures';
  readonly editionNote = 'In-depth edition — study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 16, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/https-tls-cover.png';
  readonly coverAlt = 'HTTPS connection protected by TLS, a certificate chain, and an API Gateway';
  readonly footerText = 'End of Chapter 6 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = HTTPS_TLS_EN_CHAPTER_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.articleTitle);
  }
}
