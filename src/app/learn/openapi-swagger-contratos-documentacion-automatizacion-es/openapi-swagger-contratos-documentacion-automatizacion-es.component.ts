import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OPENAPI_ES_CHAPTER_BLOCKS } from './openapi-content.data';

@Component({
  selector: 'app-openapi-swagger-contratos-documentacion-automatizacion-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenApiSwaggerContratosDocumentacionAutomatizacionEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 12';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'OpenAPI (Swagger): Contratos, Documentación y Automatización';
  readonly articleLead = 'De la descripción formal de la interfaz a la validación, generación de artefactos, publicación en portales y gobernanza en el API Gateway';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julio de 2026';
  readonly integralLabel = 'Material íntegro';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/openapi-swagger-contracts-cover.png';
  readonly coverAlt = 'Contrato OpenAPI que conecta diseño, validación, documentación, automatización, API Gateway y runtime';
  readonly footerText = 'Fin del Capítulo 12 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = OPENAPI_ES_CHAPTER_BLOCKS;
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
