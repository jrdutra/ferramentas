import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES, TOOL_ARTICLES } from '../articles/articles.data';
import { HOME_FAQ, HomeFaqItem } from './home-faq.data';
import { BaseHomeTool, HOME_TOOL_GROUPS, HOME_TOOL_ITEMS } from './home-tools.data';

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

/** Phrases cycled by the hero typewriter. */
const TYPE_PHRASES = [
  'Base64 encoding',
  'JSON formatting',
  'JWT inspection',
  'QR code generation',
  'hash & HMAC generation',
  'UUID generation',
  'certificate inspection',
  'OCR text extraction',
  'PDF merging & splitting',
  'secure passwords',
  'timestamp conversion'
];

/** Glyphs drifting inside the hero particle field. */
const CANVAS_GLYPHS = ['{', '}', '</>', '#', '$', '=>', '()', '::', '01', '/>', 'ƒ', '&&'];

interface HeroParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glyph: string | null;
  color: 0 | 1 | 2;
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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  filtro = '';

  @ViewChild('articlesTrack') private articlesTrack?: ElementRef<HTMLElement>;
  @ViewChild('heroSection') private heroSection?: ElementRef<HTMLElement>;
  @ViewChild('heroCanvas') private heroCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('typeText') private typeText?: ElementRef<HTMLElement>;

  readonly faq: readonly HomeFaqItem[] = HOME_FAQ;
  readonly firstPhrase = TYPE_PHRASES[0];
  readonly toolCount = new Set(HOME_TOOL_ITEMS.map((t) => t.path)).size;
  readonly groupCount = HOME_TOOL_GROUPS.length;

  /** Newest articles first, so the carousel always leads with fresh content. */
  readonly artigosDestaque = [...ARTICLE_SUMMARIES]
    .sort((a, b) => b.publishedIso.localeCompare(a.publishedIso))
    .slice(0, 12);

  gruposFerramentas: HomeToolGroup[] = HOME_TOOL_GROUPS.map((group) => ({
    ...group,
    ferramentas: group.ferramentas.map(decorateHomeTool)
  }));

  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  private rafId = 0;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;
  private observers: Array<IntersectionObserver | ResizeObserver> = [];
  private teardownFns: Array<() => void> = [];
  private heroVisible = true;
  private reducedMotion = false;

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

  /** Total of tools currently visible, announced to assistive technology while filtering. */
  get totalFerramentasFiltradas(): number {
    return this.gruposFiltrados.reduce((total, grupo) => total + grupo.ferramentas.length, 0);
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Every animation runs outside Angular so OnPush change detection never fires.
    this.zone.runOutsideAngular(() => {
      this.initHeroVisibilityObserver();
      this.initHeroCanvas();
      this.initTypewriter();
      this.initCountUp();
      this.initSectionReveal();
      this.initHeroParallax();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.typeTimer) clearTimeout(this.typeTimer);
    this.observers.forEach((o) => o.disconnect());
    this.observers = [];
    this.teardownFns.forEach((fn) => fn());
    this.teardownFns = [];
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

  scrollToCatalog(): void {
    this.scrollToId('catalogo-ferramentas');
  }

  /** Stable DOM id for a tool group, used by the category chips. */
  anchorId(titulo: string): string {
    return 'grupo-' + titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  scrollToId(id: string): void {
    if (typeof document === 'undefined') return;
    document.getElementById(id)?.scrollIntoView({
      behavior: this.reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
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

  // ────────────────────────────────────────────────────────────────────────
  // Hero: pauses every animation loop while the hero is scrolled off screen.
  // ────────────────────────────────────────────────────────────────────────
  private initHeroVisibilityObserver(): void {
    const hero = this.heroSection?.nativeElement;
    if (!hero || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver((entries) => {
      this.heroVisible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0 });
    io.observe(hero);
    this.observers.push(io);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Hero: canvas constellation of drifting particles and code glyphs,
  // linked by neon threads and gently attracted to the pointer.
  // ────────────────────────────────────────────────────────────────────────
  private particles: HeroParticle[] = [];
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private canvasW = 0;
  private canvasH = 0;
  private pointerX = -9999;
  private pointerY = -9999;

  private initHeroCanvas(): void {
    const hero = this.heroSection?.nativeElement;
    const canvas = this.heroCanvas?.nativeElement;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.canvasCtx = ctx;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.canvasW = w;
      this.canvasH = h;
      this.seedParticles();
    };

    resize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(resize);
      ro.observe(hero);
      this.observers.push(ro);
    }

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      this.pointerX = e.clientX - rect.left;
      this.pointerY = e.clientY - rect.top;
    };
    const onOut = () => {
      this.pointerX = -9999;
      this.pointerY = -9999;
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onOut);
    this.teardownFns.push(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onOut);
    });

    if (this.reducedMotion) {
      // Draw a single static frame so the hero still has texture.
      this.drawCanvasFrame(16);
      return;
    }

    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (this.heroVisible) this.drawCanvasFrame(dt);
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  private seedParticles(): void {
    const count = Math.max(36, Math.min(96, Math.round((this.canvasW * this.canvasH) / 16000)));
    this.particles = Array.from({ length: count }, () => {
      const glyph = Math.random() < 0.22
        ? CANVAS_GLYPHS[Math.floor(Math.random() * CANVAS_GLYPHS.length)]
        : null;
      return {
        x: Math.random() * this.canvasW,
        y: Math.random() * this.canvasH,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6,
        glyph,
        color: Math.floor(Math.random() * 3) as 0 | 1 | 2
      };
    });
  }

  private static readonly PARTICLE_COLORS: ReadonlyArray<readonly [number, number, number]> = [
    [0, 255, 209],   // aqua
    [182, 37, 255],  // purple
    [91, 124, 255]   // blue
  ];

  private drawCanvasFrame(dt: number): void {
    const ctx = this.canvasCtx;
    if (!ctx || !this.canvasW) return;

    const w = this.canvasW;
    const h = this.canvasH;
    const speedScale = dt / 16;
    ctx.clearRect(0, 0, w, h);

    const pts = this.particles;
    const linkDist = 120;

    for (const p of pts) {
      // Gentle pointer attraction gives the field a "reactive" feel.
      const dxm = this.pointerX - p.x;
      const dym = this.pointerY - p.y;
      const dm2 = dxm * dxm + dym * dym;
      if (dm2 < 32400 && dm2 > 1) { // 180px radius
        const dm = Math.sqrt(dm2);
        p.vx += (dxm / dm) * 0.012;
        p.vy += (dym / dm) * 0.012;
      }
      // Speed cap keeps the motion dreamy instead of frantic.
      const v2 = p.vx * p.vx + p.vy * p.vy;
      if (v2 > 0.36) {
        const v = Math.sqrt(v2);
        p.vx = (p.vx / v) * 0.6;
        p.vy = (p.vy / v) * 0.6;
      }

      p.x += p.vx * speedScale;
      p.y += p.vy * speedScale;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
    }

    // Neon threads between close particles.
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > linkDist * linkDist) continue;
        const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.16;
        const [r, g, bl] = HomeComponent.PARTICLE_COLORS[a.color];
        ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Particles and glyphs on top of the threads.
    ctx.font = '11px "Roboto Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const p of pts) {
      const [r, g, b] = HomeComponent.PARTICLE_COLORS[p.color];
      if (p.glyph) {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.34)`;
        ctx.fillText(p.glyph, p.x, p.y);
      } else {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Hero: typewriter cycling through what the tools do.
  // ────────────────────────────────────────────────────────────────────────
  private initTypewriter(): void {
    const el = this.typeText?.nativeElement;
    if (!el || this.reducedMotion) return;

    let phrase = 0;
    let chars = TYPE_PHRASES[0].length;
    let deleting = false;

    const tick = () => {
      const current = TYPE_PHRASES[phrase];
      if (deleting) {
        chars--;
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % TYPE_PHRASES.length;
        }
      } else {
        chars++;
      }
      el.textContent = TYPE_PHRASES[phrase].slice(0, Math.max(chars, 0));

      let delay: number;
      if (!deleting && chars >= current.length && el.textContent === current) {
        deleting = true;
        delay = 2100; // hold the finished phrase
      } else {
        delay = deleting ? 34 : 58;
      }
      this.typeTimer = setTimeout(tick, delay);
    };

    this.typeTimer = setTimeout(tick, 2000);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Hero: count-up animation for the stats row.
  // ────────────────────────────────────────────────────────────────────────
  private initCountUp(): void {
    const hero = this.heroSection?.nativeElement;
    if (!hero) return;
    const counters = Array.from(hero.querySelectorAll<HTMLElement>('[data-count]'));
    if (!counters.length || this.reducedMotion) return;

    const duration = 1300;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      for (const c of counters) {
        const target = Number(c.dataset['count'] ?? '0');
        c.textContent = String(Math.round(target * ease));
      }
      if (t < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Below the hero: sections fade-slide in as they enter the viewport.
  // The hidden state is only applied from JS, so content stays visible
  // for crawlers and users without JavaScript.
  // ────────────────────────────────────────────────────────────────────────
  private initSectionReveal(): void {
    if (typeof IntersectionObserver === 'undefined' || this.reducedMotion) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.home-artigos, .home-faq, .home-cta-final'));
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    for (const t of targets) {
      t.classList.add('reveal');
      io.observe(t);
    }
    this.observers.push(io);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Hero: subtle parallax on the aurora layers, driven by CSS variables.
  // ────────────────────────────────────────────────────────────────────────
  private initHeroParallax(): void {
    const hero = this.heroSection?.nativeElement;
    if (!hero || this.reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--par-x', nx.toFixed(3));
      hero.style.setProperty('--par-y', ny.toFixed(3));
    };
    const onLeave = () => {
      hero.style.setProperty('--par-x', '0');
      hero.style.setProperty('--par-y', '0');
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    this.teardownFns.push(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    });
  }
}
