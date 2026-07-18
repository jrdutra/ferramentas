import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { HTTPS_TLS_PT_CHAPTER_BLOCKS } from './https-tls-content.data';

@Component({
  selector: 'app-https-tls-em-profundidade-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpsTlsEmProfundidadePtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 6';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'HTTPS e TLS em profundidade';
  readonly articleLead = 'Criptografia, handshakes, certificados e confiança em arquiteturas corporativas de APIs';
  readonly editionNote = 'Edição aprofundada — material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '16 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/https-tls-cover.png';
  readonly coverAlt = 'Conexão HTTPS protegida por TLS, cadeia de certificados e API Gateway';
  readonly footerText = 'Fim do Capítulo 6 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = HTTPS_TLS_PT_CHAPTER_BLOCKS;
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
