import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES, ArticleSummary } from './articles.data';
import { SiteProgressComponent } from '../learn/reading-progress/site-progress.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink, SiteProgressComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {
  readonly articles = ARTICLE_SUMMARIES;
  filtro = '';

  constructor(
    private readonly dataService: DataService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Articles');
  }

  /** Articles whose title matches the current filter term. */
  get articlesFiltrados(): ArticleSummary[] {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) {
      return this.articles;
    }
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(termo)
    );
  }

  get semResultados(): boolean {
    return this.filtro.trim().length > 0 && this.articlesFiltrados.length === 0;
  }

  limparFiltro(): void {
    this.filtro = '';
    this.cdr.markForCheck();
  }
}
