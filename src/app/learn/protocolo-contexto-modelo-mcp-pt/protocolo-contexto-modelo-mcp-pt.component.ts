import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { MCP_PT_BLOCKS } from './mcp-content.data';

@Component({
  selector: 'app-protocolo-contexto-modelo-mcp-pt',
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
export class ProtocoloContextoModeloMcpPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 41';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'O que é o Model Context Protocol (MCP)?';
  readonly articleLead =
    'Um guia completo sobre servidores MCP, arquitetura, segurança e integração com agentes de IA';
  readonly editionNote = 'Análise técnica aprofundada com exemplo prático em Python';
  readonly byLabel = 'Por';
  readonly dateLabel = '23 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste artigo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/model-context-protocol-mcp-cover.png';
  readonly coverAlt =
    'Host de IA conectado por um hub seguro do Model Context Protocol a ferramentas, recursos, prompts, código e dados';
  readonly footerText =
    'Fim do Capítulo 41 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = MCP_PT_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'pt');
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
