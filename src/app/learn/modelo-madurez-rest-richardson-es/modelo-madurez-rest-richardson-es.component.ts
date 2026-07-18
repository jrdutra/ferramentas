import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { RMM_ES_CHAPTER_BLOCKS } from './rmm-content.data';

@Component({
  selector: 'app-modelo-madurez-rest-richardson-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeloMadurezRestRichardsonEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 11';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'Modelo de Madurez REST de Richardson';
  readonly articleLead = 'Del endpoint único a la hipermedia: cómo evaluar, evolucionar y gobernar APIs HTTP sin confundir niveles de adopción con conformidad arquitectónica completa';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julio de 2026';
  readonly integralLabel = 'Material íntegro';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/richardson-rest-maturity-model-cover.png';
  readonly coverAlt = 'Evolución en cuatro etapas del modelo de madurez REST de Richardson, desde un endpoint único hasta la hipermedia';
  readonly footerText = 'Fin del Capítulo 11 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = RMM_ES_CHAPTER_BLOCKS;
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
