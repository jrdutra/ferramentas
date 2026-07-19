import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES, TOOL_ARTICLES } from '../articles/articles.data';
import { HOME_FAQ, HomeFaqItem } from './home-faq.data';
import { BaseHomeTool, HOME_TOOL_GROUPS } from './home-tools.data';

interface HomeTool extends BaseHomeTool {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  external: boolean;
}

interface HomeToolGroup {
  titulo: string;
  ferramentas: HomeTool[];
}

const ARTICLES_BY_TOOL_ROUTE = new Map(
  TOOL_ARTICLES.map((article) => [article.toolRoute.replace(/^\//, ''), article])
);

const EXTERNAL_TOOL_IMAGES: Record<string, { image: string; imageAlt: string; imageWidth: number; imageHeight: number }> = {
  'https://kanbanapp.io': {
    image: '/assets/articles/kanbanapp-card-cover.png',
    imageAlt: 'Neon Kanban board with organized task columns, progress indicators and completed cards',
    imageWidth: 1672,
    imageHeight: 941
  },
  'https://praebere.com': {
    image: '/assets/articles/flowchart-editor-card-cover.png',
    imageAlt: 'Neon flowchart with connected process nodes, decisions and directional paths',
    imageWidth: 1672,
    imageHeight: 941
  }
};

function decorateHomeTool(tool: BaseHomeTool): HomeTool {
  const article = ARTICLES_BY_TOOL_ROUTE.get(tool.rota);
  const externalImage = EXTERNAL_TOOL_IMAGES[tool.rota];

  return {
    ...tool,
    image: article?.image ?? externalImage?.image ?? '/assets/articles/what-is-utily-tools-cover.png',
    imageAlt: article?.imageAlt ?? externalImage?.imageAlt ?? `Illustration for ${tool.titulo}`,
    imageWidth: article?.imageWidth ?? externalImage?.imageWidth ?? 1731,
    imageHeight: article?.imageHeight ?? externalImage?.imageHeight ?? 909,
    external: tool.rota.startsWith('http')
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  filtro = '';

  @ViewChild('articlesTrack') private articlesTrack?: ElementRef<HTMLElement>;

  readonly faq: readonly HomeFaqItem[] = HOME_FAQ;

  /** Newest articles first, so the carousel always leads with fresh content. */
  readonly artigosDestaque = [...ARTICLE_SUMMARIES]
    .sort((a, b) => b.publishedIso.localeCompare(a.publishedIso))
    .slice(0, 12);

  gruposFerramentas: HomeToolGroup[] = HOME_TOOL_GROUPS.map((group) => ({
    ...group,
    ferramentas: group.ferramentas.map(decorateHomeTool)
  }));

  get gruposFiltrados() {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) return this.gruposFerramentas;
    return this.gruposFerramentas
      .map(g => ({
        ...g,
        ferramentas: g.ferramentas.filter(f =>
          f.titulo.toLowerCase().includes(termo) ||
          f.descricao.toLowerCase().includes(termo)
        )
      }))
      .filter(g => g.ferramentas.length > 0);
  }

  get semResultados(): boolean {
    return this.filtro.trim().length > 0 && this.gruposFiltrados.length === 0;
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Home');

    // Backs the SearchAction declared in the home page structured data, so that
    // /?search=term really does land on a filtered catalogue.
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.filtro = search;
    }
  }

  navegaFerramenta(rota: string) {
    if (rota.startsWith('http')) {
      window.open(rota, '_blank', 'noopener');
      return;
    }
    this.router.navigate(['/' + rota]);
  }

  limparFiltro(): void {
    this.filtro = '';
  }

  trackByGrupo(_: number, grupo: { titulo: string }): string {
    return grupo.titulo;
  }

  trackByFerramenta(_: number, f: { rota: string }): string {
    return f.rota;
  }

  trackByArtigo(_: number, artigo: { route: string }): string {
    return artigo.route;
  }

  trackByPergunta(_: number, item: HomeFaqItem): string {
    return item.question;
  }

  /** Scrolls the article carousel by roughly one card, in either direction. */
  moveCarrossel(direcao: -1 | 1): void {
    const track = this.articlesTrack?.nativeElement;
    if (!track) return;

    const card = track.querySelector<HTMLElement>('.artigo-card');
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: direcao * step, behavior: 'smooth' });
  }
}
