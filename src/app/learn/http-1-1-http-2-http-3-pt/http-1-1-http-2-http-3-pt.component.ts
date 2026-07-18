import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { HTTP_VERSIONS_PT_CHAPTER_BLOCKS } from './http-versions-content.data';

@Component({
  selector: 'app-http-1-1-http-2-http-3-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Http11Http2Http3PtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 5';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'HTTP/1.1, HTTP/2 e HTTP/3';
  readonly articleLead = 'Semântica, mensagens, conexões, multiplexação e QUIC em arquiteturas de APIs';
  readonly editionNote = 'Edição aprofundada — material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/http-versions-cover.png';
  readonly coverAlt = 'Evolução de mensagens HTTP para streams multiplexados e QUIC através de um API Gateway';
  readonly footerText = 'Fim do Capítulo 5 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = HTTP_VERSIONS_PT_CHAPTER_BLOCKS;
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
