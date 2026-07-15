import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES } from './articles.data';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {
  readonly articles = ARTICLE_SUMMARIES;

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Articles');
  }
}
