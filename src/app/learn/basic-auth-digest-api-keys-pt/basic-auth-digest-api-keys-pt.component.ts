import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { BASIC_AUTH_DIGEST_API_KEYS_PT_BLOCKS } from './basic-auth-digest-api-keys-content.data';

@Component({
  selector: 'app-basic-auth-digest-api-keys-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAuthDigestApiKeysPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 15';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'Basic Auth, Digest e API Keys';
  readonly articleLead = 'Funcionamento, riscos, armazenamento, rotação e uso controlado de credenciais estáticas em APIs corporativas';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/basic-auth-digest-api-keys-cover.png';
  readonly coverAlt = 'Basic Auth, Digest e API Keys convergindo para um gateway corporativo protegido';
  readonly footerText = 'Fim do Capítulo 15 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = BASIC_AUTH_DIGEST_API_KEYS_PT_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'pt');
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}
  ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
