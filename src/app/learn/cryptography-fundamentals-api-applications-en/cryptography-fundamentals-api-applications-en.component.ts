import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { CRYPTOGRAPHY_EN_CHAPTER_BLOCKS } from './cryptography-content.data';

@Component({
  selector: 'app-cryptography-fundamentals-api-applications-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptographyFundamentalsApiApplicationsEnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 7';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Cryptography: Symmetric, Asymmetric, Hashes, and Digital Signatures';
  readonly articleLead = 'Symmetric and asymmetric cryptography, hashes, digital signatures, key management, and API applications';
  readonly editionNote = 'In-depth edition — study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 17, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/cryptography-cover.png';
  readonly coverAlt = 'Cryptographic core protecting keys, signatures, hashes, and API calls';
  readonly footerText = 'End of Chapter 7 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = CRYPTOGRAPHY_EN_CHAPTER_BLOCKS;
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
