import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { IP_ADDRESSING_CHAPTER_BLOCKS } from './ip-addressing-content.data';

@Component({
  selector: 'app-ip-addressing-ipv4-ipv6',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IpAddressingIpv4Ipv6Component implements OnInit {
  readonly chapterLabel = 'Chapter 3';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'IP Addressing: IPv4, IPv6, Subnetting, and Routing';
  readonly articleLead = 'From reading a CIDR prefix to diagnosing connectivity in API Gateways and hybrid networks';
  readonly editionNote = 'In-depth edition — study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 16, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/ip-addressing-cover.png';
  readonly coverAlt = 'Illustration of IP addressing, IPv4 and IPv6 networks, subnetting, and route selection';
  readonly footerText = 'End of Chapter 3 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = IP_ADDRESSING_CHAPTER_BLOCKS;
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
