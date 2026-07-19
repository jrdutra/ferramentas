import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { TCP_UDP_CHAPTER_BLOCKS } from './tcp-udp-content.data';

@Component({ selector: 'app-tcp-udp-portas-sockets', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush })
export class TcpUdpPortasSocketsComponent implements OnInit {
  readonly blocks = TCP_UDP_CHAPTER_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'pt');
  readonly coverImage = '/assets/learn/tcp-udp-portas-sockets-cover.png';
  readonly backLabel = 'Voltar para Learn'; readonly chapterLabel = 'Capítulo 2';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'TCP, UDP, Portas e Sockets';
  readonly articleLead = 'Da criação de uma conexão ao diagnóstico de timeouts e esgotamento de portas em API Gateways';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por'; readonly dateLabel = '16 de julho de 2026'; readonly integralLabel = 'Material integral';
  readonly coverAlt = 'Fluxos TCP confiáveis e datagramas UDP atravessando um API Gateway entre clientes e backends';
  readonly tocLabel = 'Neste capítulo';
  readonly tocItems = [
    ['camada-transporte','Camada de transporte'],['multiplexacao','Multiplexação e endpoints'],['sockets','Sockets'],['tcp','Serviço TCP'],
    ['handshake','Three-way handshake'],['sequencia','Sequência, ACKs e retransmissão'],['fluxo','Controle de fluxo'],
    ['congestionamento','Controle de congestionamento'],['encerramento-tcp','FIN, RST e TIME_WAIT'],['timers','Timers e pooling'],
    ['udp','UDP'],['escolha','TCP ou UDP'],['portas','Portas e IANA'],['nat-snat','NAT, SNAT e portas'],
    ['api-gateways','TCP em API Gateways'],['troubleshooting','Troubleshooting'],['casos','Estudos de caso'],['laboratorios','Laboratórios']
  ].map(([id,label])=>({id,label}));
  readonly footerText = 'Fim do Capítulo 2 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  constructor(private readonly dataService: DataService) {} ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
