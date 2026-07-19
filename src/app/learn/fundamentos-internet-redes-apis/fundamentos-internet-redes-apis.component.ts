import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { buildGlossary } from '../glossary/glossary.model';
import { FUNDAMENTOS_CHAPTER_BLOCKS } from './fundamentos-content.data';

@Component({
  selector: 'app-fundamentos-internet-redes-apis',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: './fundamentos-internet-redes-apis.component.html',
  styleUrl: './fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundamentosInternetRedesApisComponent implements OnInit {
  readonly blocks = FUNDAMENTOS_CHAPTER_BLOCKS;
  readonly glossary = buildGlossary(this.blocks, 'pt');

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Fundamentos da Internet, Redes e APIs');
  }
}
