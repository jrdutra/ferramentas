import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { RMM_EN_CHAPTER_BLOCKS } from './rmm-content.data';

@Component({
  selector: 'app-richardson-rest-maturity-model-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichardsonRestMaturityModelEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 11';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Richardson REST Maturity Model';
  readonly articleLead = 'From a single endpoint to hypermedia: how to assess, evolve, and govern HTTP APIs without confusing adoption levels with complete architectural compliance';
  readonly editionNote = 'In-depth edition - study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/richardson-rest-maturity-model-cover.png';
  readonly coverAlt = 'Four-stage evolution of the Richardson REST Maturity Model, from a single endpoint to hypermedia';
  readonly footerText = 'End of Chapter 11 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = RMM_EN_CHAPTER_BLOCKS;
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
