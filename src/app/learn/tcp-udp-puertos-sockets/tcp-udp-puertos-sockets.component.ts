import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { TCP_UDP_CHAPTER_BLOCKS_ES } from './tcp-udp-content.data';

@Component({ selector: 'app-tcp-udp-puertos-sockets', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush })
export class TcpUdpPuertosSocketsComponent implements OnInit {
  readonly blocks = TCP_UDP_CHAPTER_BLOCKS_ES;
  readonly glossary = buildGlossary(this.blocks, 'es');
  readonly coverImage = '/assets/learn/tcp-udp-portas-sockets-cover.png';
  readonly backLabel = 'Volver a Learn'; readonly chapterLabel = 'Capítulo 2';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'TCP, UDP, Puertos y Sockets';
  readonly articleLead = 'Desde el establecimiento de una conexión hasta el diagnóstico de timeouts y agotamiento de puertos en API Gateways';
  readonly editionNote = 'Edición ampliada - material de estudio y consulta profesional';
  readonly byLabel = 'Por'; readonly dateLabel = '16 de julio de 2026'; readonly integralLabel = 'Material integral';
  readonly coverAlt = 'Flujos TCP confiables y datagramas UDP que atraviesan un API Gateway entre clientes y backends';
  readonly tocLabel = 'En este capítulo';
  readonly tocItems = [
    ['camada-transporte','Capa de transporte'],['multiplexacao','Multiplexación y endpoints'],['sockets','Sockets'],['tcp','Servicio TCP'],
    ['handshake','Three-way handshake'],['sequencia','Secuencia, ACKs y retransmisión'],['fluxo','Control de flujo'],
    ['congestionamento','Control de congestión'],['encerramento-tcp','FIN, RST y TIME_WAIT'],['timers','Timers y pooling'],
    ['udp','UDP'],['escolha','TCP o UDP'],['portas','Puertos e IANA'],['nat-snat','NAT, SNAT y puertos'],
    ['api-gateways','TCP en API Gateways'],['troubleshooting','Troubleshooting'],['casos','Estudios de caso'],['laboratorios','Laboratorios']
  ].map(([id,label])=>({id,label}));
  readonly footerText = 'Fin del Capítulo 2 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  constructor(private readonly dataService: DataService) {} ngOnInit(): void { this.dataService.setTituloAplicacao(this.articleTitle); }
}
