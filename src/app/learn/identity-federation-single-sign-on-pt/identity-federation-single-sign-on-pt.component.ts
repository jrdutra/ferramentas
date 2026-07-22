import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { IDENTITY_FEDERATION_PT_BLOCKS } from './identity-federation-content.data';

@Component({
  selector: 'app-identity-federation-single-sign-on-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityFederationSingleSignOnPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 20';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'Identity Federation e Single Sign-On';
  readonly articleLead = 'Como estabelecer confiança entre domínios, reutilizar autenticação, coordenar sessões e integrar SAML, OpenID Connect e API Gateways';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '21 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/identity-federation-sso-cover.png';
  readonly coverAlt = 'Identity Provider central conectando múltiplas aplicações e domínios por relações de confiança';
  readonly footerText = 'Fim do Capítulo 20 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = IDENTITY_FEDERATION_PT_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'pt');
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);
  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
