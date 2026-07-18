import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { OPENID_CONNECT_PT_BLOCKS } from './openid-connect-content.data';

@Component({
  selector: 'app-openid-connect-id-tokens-sessoes-federacao-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenIdConnectIdTokensSessoesFederacaoPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 17';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'OpenID Connect (OIDC): ID Tokens, Sessões e Federação de Identidade';
  readonly articleLead = 'Da autenticação do usuário à validação de ID Tokens, UserInfo, níveis de assurance, SSO e logout federado';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/openid-connect-id-tokens-sessions-federation-cover.png';
  readonly coverAlt = 'Identidade federada OpenID Connect com ID Tokens verificáveis, sessões e Relying Parties';
  readonly footerText = 'Fim do Capítulo 17 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = OPENID_CONNECT_PT_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
