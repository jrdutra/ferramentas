import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { TCP_UDP_CHAPTER_BLOCKS_EN } from './tcp-udp-content.data';

@Component({ selector: 'app-tcp-udp-ports-sockets', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush })
export class TcpUdpPortsSocketsComponent implements OnInit {
  readonly blocks = TCP_UDP_CHAPTER_BLOCKS_EN;
  readonly glossary = extractGlossary(this.blocks);
  readonly coverImage = '/assets/learn/tcp-udp-portas-sockets-cover.png';
  readonly backLabel = 'Back to Learn'; readonly chapterLabel = 'Chapter 2';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'TCP, UDP, Ports, and Sockets';
  readonly articleLead = 'From establishing a connection to diagnosing timeouts and port exhaustion in API Gateways';
  readonly editionNote = 'In-depth edition - study and professional reference material';
  readonly byLabel = 'By'; readonly dateLabel = 'July 16, 2026'; readonly integralLabel = 'Complete material';
  readonly coverAlt = 'Reliable TCP streams and UDP datagrams crossing an API Gateway between clients and backends';
  readonly tocLabel = 'In this chapter';
  readonly tocItems = [
    ['camada-transporte','Transport layer'],['multiplexacao','Multiplexing and endpoints'],['sockets','Sockets'],['tcp','TCP service'],
    ['handshake','Three-way handshake'],['sequencia','Sequence, ACKs, and retransmission'],['fluxo','Flow control'],
    ['congestionamento','Congestion control'],['encerramento-tcp','FIN, RST, and TIME_WAIT'],['timers','Timers and pooling'],
    ['udp','UDP'],['escolha','TCP or UDP'],['portas','Ports and IANA'],['nat-snat','NAT, SNAT, and ports'],
    ['api-gateways','TCP in API Gateways'],['troubleshooting','Troubleshooting'],['casos','Case studies'],['laboratorios','Labs']
  ].map(([id,label])=>({id,label}));
  readonly footerText = 'End of Chapter 2 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  constructor(private readonly dataService: DataService) {} ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
