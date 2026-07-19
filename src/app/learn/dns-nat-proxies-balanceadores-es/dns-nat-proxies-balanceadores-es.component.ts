import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { DNS_NAT_ES_CHAPTER_BLOCKS } from './dns-nat-content.data';

@Component({
  selector: 'app-dns-nat-proxies-balanceadores-es',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DnsNatProxiesBalanceadoresEsComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 4';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'DNS, NAT, Proxies y Balanceadores de Carga';
  readonly articleLead = 'Cómo los nombres, las traducciones, los intermediarios y los pools determinan la ruta real de una API';
  readonly editionNote = 'Edición en profundidad — material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/dns-nat-proxies-load-balancers-cover.png';
  readonly coverAlt = 'DNS, NAT, reverse proxies y balanceadores guiando una solicitud hacia pools de backends';
  readonly footerText = 'Fin del Capítulo 4 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = DNS_NAT_ES_CHAPTER_BLOCKS;
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
