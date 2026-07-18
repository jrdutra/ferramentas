import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ENDERECAMENTO_IP_CHAPTER_BLOCKS } from './enderecamento-content.data';

@Component({
  selector: 'app-enderecamento-ip-ipv4-ipv6',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnderecamentoIpIpv4Ipv6Component implements OnInit {
  readonly chapterLabel = 'Capítulo 3';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento';
  readonly articleLead = 'Da leitura de um prefixo CIDR ao diagnóstico de conectividade em API Gateways e redes híbridas';
  readonly editionNote = 'Edição aprofundada — material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/ip-addressing-cover.png';
  readonly coverAlt = 'Ilustração de endereçamento IP, redes IPv4 e IPv6, sub-redes e seleção de rotas';
  readonly footerText = 'Fim do Capítulo 3 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = ENDERECAMENTO_IP_CHAPTER_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) {
      items.push({ id: block.id, label: block.text });
    }
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.articleTitle);
  }
}
