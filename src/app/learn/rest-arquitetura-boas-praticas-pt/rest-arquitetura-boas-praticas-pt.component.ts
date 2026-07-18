import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { REST_PT_CHAPTER_BLOCKS } from './rest-content.data';

@Component({
  selector: 'app-rest-arquitetura-boas-praticas-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestArquiteturaBoasPraticasPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 10';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'REST: Arquitetura e Boas Práticas';
  readonly articleLead = 'Dos princípios arquiteturais de Fielding ao desenho de contratos HTTP consistentes, evolutivos e operáveis em API Gateways';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/rest-architecture-best-practices-cover.png';
  readonly coverAlt = 'Ecossistema REST corporativo com recurso central, clientes, API Gateway, representações, cache e persistência';
  readonly footerText = 'Fim do Capítulo 10 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = REST_PT_CHAPTER_BLOCKS;
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
