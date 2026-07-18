import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OAUTH_2_ES_BLOCKS } from './oauth-2-content.data';

@Component({
  selector: 'app-oauth-2-flujos-tokens-seguridad-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OAuth2FlujosTokensSeguridadEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 16';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'OAuth 2.0 en Profundidad: Flujos, Tokens y Seguridad';
  readonly articleLead = 'Roles, endpoints, Authorization Code con PKCE, Client Credentials, refresh tokens, introspección, revocación y prácticas modernas de protección';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julio de 2026';
  readonly integralLabel = 'Material íntegro';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/oauth-2-flows-tokens-security-cover.png';
  readonly coverAlt = 'Flujos OAuth 2.0 protegidos por PKCE, tokens y controles modernos de seguridad';
  readonly footerText = 'Fin del Capítulo 16 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = OAUTH_2_ES_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
