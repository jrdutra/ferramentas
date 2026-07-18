import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { RMM_PT_CHAPTER_BLOCKS } from './rmm-content.data';

@Component({
  selector: 'app-modelo-maturidade-rest-richardson-pt',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeloMaturidadeRestRichardsonPtComponent implements OnInit {
  readonly chapterLabel = 'Capítulo 11';
  readonly seriesName = 'Fundamentos e Arquitetura de APIs Corporativas';
  readonly articleTitle = 'Modelo de Maturidade REST de Richardson';
  readonly articleLead = 'Do endpoint único à hipermídia: como avaliar, evoluir e governar APIs HTTP sem confundir níveis de adoção com conformidade arquitetural completa';
  readonly editionNote = 'Edição aprofundada - material de estudo e consulta profissional';
  readonly byLabel = 'Por';
  readonly dateLabel = '18 de julho de 2026';
  readonly integralLabel = 'Material integral';
  readonly tocLabel = 'Neste capítulo';
  readonly backLabel = 'Voltar para Learn';
  readonly coverImage = '/assets/learn/richardson-rest-maturity-model-cover.png';
  readonly coverAlt = 'Evolução em quatro estágios do modelo de maturidade REST de Richardson, do endpoint único à hipermídia';
  readonly footerText = 'Fim do Capítulo 11 de Fundamentos e Arquitetura de APIs Corporativas.';
  readonly footerLink = 'Voltar para todos os conteúdos Learn';
  readonly blocks = RMM_PT_CHAPTER_BLOCKS;
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
