import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { CRYPTOGRAPHY_ES_CHAPTER_BLOCKS } from './cryptography-content.data';

@Component({
  selector: 'app-criptografia-fundamentos-aplicaciones-apis-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriptografiaFundamentosAplicacionesApisEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 7';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'Criptografía: simétrica, asimétrica, hashes y firmas digitales';
  readonly articleLead = 'Criptografía simétrica y asimétrica, hashes, firmas digitales, gestión de claves y aplicaciones en APIs';
  readonly editionNote = 'Edición en profundidad — material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '17 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/cryptography-cover.png';
  readonly coverAlt = 'Núcleo criptográfico que protege claves, firmas, hashes y llamadas de APIs';
  readonly footerText = 'Fin del Capítulo 7 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = CRYPTOGRAPHY_ES_CHAPTER_BLOCKS;
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
