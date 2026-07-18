import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { REST_ES_CHAPTER_BLOCKS } from './rest-content.data';

@Component({
  selector: 'app-rest-arquitectura-buenas-practicas-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestArquitecturaBuenasPracticasEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 10';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'REST: Arquitectura y Buenas Prácticas';
  readonly articleLead = 'De los principios arquitectónicos de Fielding al diseño de contratos HTTP consistentes, evolutivos y operables en API Gateways';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julio de 2026';
  readonly integralLabel = 'Material íntegro';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/rest-architecture-best-practices-cover.png';
  readonly coverAlt = 'Ecosistema REST corporativo con recurso central, clientes, API Gateway, representaciones, cache y persistencia';
  readonly footerText = 'Fin del Capítulo 10 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = REST_ES_CHAPTER_BLOCKS;
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
