import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { FUNDAMENTALS_CHAPTER_BLOCKS } from './fundamentals-content.data';

@Component({
  selector: 'app-fundamentals-internet-networks-apis',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundamentalsInternetNetworksApisComponent implements OnInit {
  readonly blocks = FUNDAMENTALS_CHAPTER_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly coverImage = '/assets/learn/fundamentos-internet-redes-apis-cover.png';
  readonly backLabel = 'Back to Learn';
  readonly chapterLabel = 'Chapter 1';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Internet, Networking, and API Fundamentals';
  readonly articleLead = 'From network communication to request processing in an API Gateway';
  readonly editionNote = 'In-depth edition - study and professional reference material';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 16, 2026';
  readonly integralLabel = 'Complete material';
  readonly coverAlt = 'An API call crossing network layers and an API Gateway';
  readonly tocLabel = 'In this chapter';
  readonly tocItems = [
    ['por-que-importa', 'Why networks matter'], ['conceitos', 'Internet, Web, and API'], ['evolucao', 'Historical evolution'],
    ['padroes', 'Standardization'], ['rfcs', 'RFCs'], ['camadas', 'Encapsulation'], ['modelos', 'OSI and TCP/IP'],
    ['enderecamento', 'IP addressing'], ['dns', 'DNS'], ['transporte', 'TCP, UDP, and sockets'],
    ['intermediarios', 'NAT and intermediaries'], ['seguranca', 'TLS and HTTPS'], ['http', 'HTTP'], ['rest', 'REST'],
    ['gateway', 'API Gateway'], ['jornada', 'End-to-end journey'], ['troubleshooting', 'Troubleshooting'],
    ['pratica', 'Corporate environments']
  ].map(([id, label]) => ({ id, label }));
  readonly footerText = 'End of Chapter 1 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
