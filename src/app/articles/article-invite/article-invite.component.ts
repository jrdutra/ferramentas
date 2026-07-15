import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subscription } from 'rxjs';

interface RelatedArticle {
  title: string;
  path: string;
  toolName: string;
  image: string;
  imageAlt: string;
}

@Component({
  selector: 'app-article-invite',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './article-invite.component.html',
  styleUrl: './article-invite.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleInviteComponent implements OnInit, OnDestroy {
  relatedArticle: RelatedArticle | null = null;
  private navigationSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.navigationSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateRelatedArticle());
    this.updateRelatedArticle();
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }

  private updateRelatedArticle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) route = route.firstChild;
    this.relatedArticle = route.snapshot.data['relatedArticle'] as RelatedArticle | null ?? null;
    this.cdr.markForCheck();
  }
}
