import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { MCP_EN_BLOCKS } from './mcp-content.data';

@Component({
  selector: 'app-model-context-protocol-mcp-en',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    GlossaryTextComponent,
    ArticleReadToggleComponent,
    TopicReadToggleComponent
  ],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelContextProtocolMcpEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 41';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'What Is the Model Context Protocol (MCP)?';
  readonly articleLead =
    'A complete guide to MCP servers, architecture, security, and AI agent integration';
  readonly editionNote = 'Technical deep dive with a practical Python example';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 23, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this article';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/model-context-protocol-mcp-cover.png';
  readonly coverAlt =
    'AI host connected through a secure Model Context Protocol hub to tools, resources, prompts, code, and data';
  readonly footerText =
    'End of Chapter 41 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = MCP_EN_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>(
    (items, block) => {
      if (block.kind === 'heading' && block.level === 2 && block.id) {
        items.push({ id: block.id, label: block.text });
      }
      return items;
    },
    []
  );

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.articleTitle);
  }
}
