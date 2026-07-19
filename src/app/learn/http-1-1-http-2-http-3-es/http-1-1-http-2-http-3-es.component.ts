import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { HTTP_VERSIONS_ES_CHAPTER_BLOCKS } from './http-versions-content.data';

@Component({
  selector: 'app-http-1-1-http-2-http-3-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Http11Http2Http3EsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 5';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'HTTP/1.1, HTTP/2 y HTTP/3';
  readonly articleLead = 'Semántica, mensajes, conexiones, multiplexación y QUIC en arquitecturas de APIs';
  readonly editionNote = 'Edición en profundidad — material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/http-versions-cover.png';
  readonly coverAlt = 'Evolución de mensajes HTTP a streams multiplexados y QUIC a través de un API Gateway';
  readonly footerText = 'Fin del Capítulo 5 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = HTTP_VERSIONS_ES_CHAPTER_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'es');
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.articleTitle);
  }
}
