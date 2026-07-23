import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { findToolArticle } from '../articles.data';
import { ToolArticle } from '../tool-article.model';
import { ArticleProgressService } from '../../learn/reading-progress/article-progress.service';

@Component({
  selector: 'app-tool-article',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './tool-article.component.html',
  styleUrl: './tool-article.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolArticleComponent implements OnInit {
  readonly article: ToolArticle;
  readonly articleRoute: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly articleProgress: ArticleProgressService
  ) {
    const slug = this.route.snapshot.data['articleSlug'] as string;
    const article = findToolArticle(slug);
    if (!article) throw new Error(`Article not found: ${slug}`);
    this.article = article;
    this.articleRoute = `/articles/${slug}`;
  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.article.toolName);
  }

  get isRead(): boolean {
    return this.articleProgress.isRead(this.articleRoute);
  }

  toggleRead(): void {
    this.articleProgress.toggle(this.articleRoute);
  }
}
