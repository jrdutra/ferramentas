import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OPENID_CONNECT_ES_BLOCKS } from './openid-connect-content.data';

@Component({
  selector: 'app-openid-connect-id-tokens-sesiones-federacion-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenIdConnectIdTokensSesionesFederacionEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 17';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'OpenID Connect (OIDC): ID Tokens, Sesiones y Federación de Identidad';
  readonly articleLead = 'De la autenticación del usuario a la validación de ID Tokens, UserInfo, niveles de assurance, SSO y logout federado';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julio de 2026';
  readonly integralLabel = 'Material íntegro';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png';
  readonly coverAlt = 'Identidad federada OpenID Connect con ID Tokens verificables, sesiones y Relying Parties';
  readonly footerText = 'Fin del Capítulo 17 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = OPENID_CONNECT_ES_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
