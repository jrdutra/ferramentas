import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { FUNDAMENTOS_CHAPTER_BLOCKS_ES } from './fundamentos-content.data';

@Component({
  selector: 'app-fundamentos-internet-redes-apis-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundamentosInternetRedesApisEsComponent implements OnInit {
  readonly blocks = FUNDAMENTOS_CHAPTER_BLOCKS_ES;
  readonly glossary = buildGlossary(this.blocks, 'es');
  readonly coverImage = '/assets/learn/fundamentos-internet-redes-apis-cover.png';
  readonly backLabel = 'Volver a Learn';
  readonly chapterLabel = 'Capítulo 1';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'Fundamentos de Internet, Redes y APIs';
  readonly articleLead = 'De la comunicación en red al procesamiento de una solicitud en un API Gateway';
  readonly editionNote = 'Edición ampliada - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julio de 2026';
  readonly integralLabel = 'Material integral';
  readonly coverAlt = 'Una llamada de API que atraviesa capas de red y un API Gateway';
  readonly tocLabel = 'En este capítulo';
  readonly tocItems = [
    ['por-que-importa', 'Por qué importan las redes'], ['conceitos', 'Internet, Web y API'], ['evolucao', 'Evolución histórica'],
    ['padroes', 'Estandarización'], ['rfcs', 'RFCs'], ['camadas', 'Encapsulamiento'], ['modelos', 'OSI y TCP/IP'],
    ['enderecamento', 'Direccionamiento IP'], ['dns', 'DNS'], ['transporte', 'TCP, UDP y sockets'],
    ['intermediarios', 'NAT e intermediarios'], ['seguranca', 'TLS y HTTPS'], ['http', 'HTTP'], ['rest', 'REST'],
    ['gateway', 'API Gateway'], ['jornada', 'Recorrido de extremo a extremo'], ['troubleshooting', 'Troubleshooting'],
    ['pratica', 'Entornos corporativos']
  ].map(([id, label]) => ({ id, label }));
  readonly footerText = 'Fin del Capítulo 1 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
