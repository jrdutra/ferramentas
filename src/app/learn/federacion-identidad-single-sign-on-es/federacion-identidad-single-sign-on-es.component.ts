import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { IDENTITY_FEDERATION_ES_BLOCKS } from './identity-federation-content.data';

@Component({
  selector: 'app-federacion-identidad-single-sign-on-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FederacionIdentidadSingleSignOnEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 20';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'Federación de Identidad y Single Sign-On';
  readonly articleLead = 'Cómo establecer confianza entre dominios, reutilizar la autenticación, coordinar sesiones e integrar SAML, OpenID Connect y API Gateways';
  readonly editionNote = 'Edición en profundidad - material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '21 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/identity-federation-sso-cover.png';
  readonly coverAlt = 'Identity Provider central conectando múltiples aplicaciones y dominios mediante relaciones de confianza';
  readonly footerText = 'Fin del Capítulo 20 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos de Learn';
  readonly blocks = IDENTITY_FEDERATION_ES_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'es');
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);
  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
