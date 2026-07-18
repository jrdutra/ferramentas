import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { DNS_NAT_EN_CHAPTER_BLOCKS } from './dns-nat-content.data';

@Component({
  selector: 'app-dns-nat-proxies-load-balancers',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DnsNatProxiesLoadBalancersComponent implements OnInit {
  readonly chapterLabel = 'Chapter 4';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'DNS, NAT, Proxies, and Load Balancers';
  readonly articleLead = 'How names, translations, intermediaries, and pools determine the actual path of an API';
  readonly editionNote = 'In-depth edition — study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 16, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/dns-nat-proxies-load-balancers-cover.png';
  readonly coverAlt = 'DNS, NAT, reverse proxies, and load balancers guiding a request toward backend pools';
  readonly footerText = 'End of Chapter 4 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = DNS_NAT_EN_CHAPTER_BLOCKS;
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
