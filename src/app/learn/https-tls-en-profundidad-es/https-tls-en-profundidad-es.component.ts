import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { HTTPS_TLS_ES_CHAPTER_BLOCKS } from './https-tls-content.data';

@Component({
  selector: 'app-https-tls-en-profundidad-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpsTlsEnProfundidadEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 6';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'HTTPS y TLS en profundidad';
  readonly articleLead = 'Criptografía, handshakes, certificados y confianza en arquitecturas corporativas de APIs';
  readonly editionNote = 'Edición en profundidad — material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/https-tls-cover.png';
  readonly coverAlt = 'Conexión HTTPS protegida por TLS, cadena de certificados y un API Gateway';
  readonly footerText = 'Fin del Capítulo 6 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = HTTPS_TLS_ES_CHAPTER_BLOCKS;
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
