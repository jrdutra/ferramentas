import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { HTTP_VERSIONS_EN_CHAPTER_BLOCKS } from './http-versions-content.data';

@Component({
  selector: 'app-http-1-1-http-2-http-3-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Http11Http2Http3EnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 5';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'HTTP/1.1, HTTP/2, and HTTP/3';
  readonly articleLead = 'Semantics, messages, connections, multiplexing, and QUIC in API architectures';
  readonly editionNote = 'In-depth edition — professional study and reference material';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 16, 2026';
  readonly integralLabel = 'Full material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/http-versions-cover.png';
  readonly coverAlt = 'Evolution from HTTP messages to multiplexed streams and QUIC through an API Gateway';
  readonly footerText = 'End of Chapter 5 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = HTTP_VERSIONS_EN_CHAPTER_BLOCKS;
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
