import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { DNS_NAT_PT_CHAPTER_BLOCKS } from './dns-nat-content.data';

@Component({
  selector: 'app-dns-nat-proxies-balanceadores',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DnsNatProxiesBalanceadoresComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 4';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'DNS, NAT, Proxies e Balanceadores de Carga';
  readonly articleLead = 'Como nomes, traduções, intermediários e pools determinam o caminho real de uma API';
  readonly editionNote = 'Edição aprofundada — material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/dns-nat-proxies-load-balancers-cover.png';
  readonly coverAlt = 'DNS, NAT, reverse proxies e balanceadores conduzindo uma chamada até pools de backends';
  readonly footerText = 'Fim do Capítulo 4 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = DNS_NAT_PT_CHAPTER_BLOCKS;
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
