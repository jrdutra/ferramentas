import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { DIRECCIONAMIENTO_IP_CHAPTER_BLOCKS } from './direccionamiento-content.data';

@Component({
  selector: 'app-direccionamiento-ip-ipv4-ipv6',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DireccionamientoIpIpv4Ipv6Component implements OnInit {
  readonly chapterLabel = 'Capítulo 3';
  readonly seriesName = 'Fundamentos y Arquitectura de APIs Corporativas';
  readonly articleTitle = 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento';
  readonly articleLead = 'Desde la lectura de un prefijo CIDR hasta el diagnóstico de conectividad en API Gateways y redes híbridas';
  readonly editionNote = 'Edición en profundidad — material de estudio y consulta profesional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julio de 2026';
  readonly integralLabel = 'Material completo';
  readonly tocLabel = 'En este capítulo';
  readonly backLabel = 'Volver a Learn';
  readonly coverImage = '/assets/learn/ip-addressing-cover.png';
  readonly coverAlt = 'Ilustración de direccionamiento IP, redes IPv4 e IPv6, subredes y selección de rutas';
  readonly footerText = 'Fin del Capítulo 3 de Fundamentos y Arquitectura de APIs Corporativas.';
  readonly footerLink = 'Volver a todos los contenidos Learn';
  readonly blocks = DIRECCIONAMIENTO_IP_CHAPTER_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'es');
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
