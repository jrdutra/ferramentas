import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { AUTHENTICATION_AUTHORIZATION_PT_BLOCKS } from './autenticacao-autorizacao-content.data';

@Component({
  selector: 'app-autenticacao-autorizacao-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutenticacaoAutorizacaoPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 14';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'Autenticação x Autorização';
  readonly articleLead = 'Como distinguir prova de identidade, decisão de acesso, delegação, contexto e enforcement em APIs corporativas';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/authentication-authorization-cover.png';
  readonly coverAlt = 'Autenticação e autorização como etapas distintas da segurança de acesso em APIs corporativas';
  readonly footerText = 'Fim do Capítulo 14 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = AUTHENTICATION_AUTHORIZATION_PT_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
