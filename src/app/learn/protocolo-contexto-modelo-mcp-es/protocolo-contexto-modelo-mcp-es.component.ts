import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { MCP_ES_BLOCKS } from './mcp-content.data';

@Component({
  selector: 'app-protocolo-contexto-modelo-mcp-es',
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
export class ProtocoloContextoModeloMcpEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 41';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = '¿Qué es el Model Context Protocol (MCP)?';
  readonly articleLead =
    'Una guía completa sobre servidores MCP, arquitectura, seguridad e integración con agentes de IA';
  readonly editionNote = 'Análisis técnico en profundidad con un ejemplo práctico en Python';
  readonly byLabel = 'Por';
  readonly dateLabel = '23 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este artículo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/model-context-protocol-mcp-cover.png';
  readonly coverAlt =
    'Host de IA conectado mediante un hub seguro de Model Context Protocol a herramientas, recursos, prompts, código y datos';
  readonly footerText =
    'Fin del Capítulo 41 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = MCP_ES_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'es');
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
