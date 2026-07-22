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
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES, ArticleSummary } from '../articles/articles.data';

interface Neuron {
  x: number;
  y: number;
  hx: number;  // home x
  hy: number;  // home y
  vx: number;
  vy: number;
  radius: number; // how far it may drift from home
  wander: number; // per-neuron oscillation speed factor
  lum: number;    // per-neuron brightness factor (>= 1)
  neighbors: number[];
  glow: number;
  lastFire: number;
  color: 0 | 1 | 2;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;      // base css px per millisecond
  len: number;        // branch length in css px
  intensity: number;  // per-pulse light strength
  size: number;       // per-pulse light radius factor
  color: 0 | 1 | 2;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home-tbl',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './home-tbl.component.html',
  styleUrl: './home-tbl.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TblHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('homeRoot') private homeRoot?: ElementRef<HTMLElement>;
  @ViewChild('heroSection') private heroSection?: ElementRef<HTMLElement>;
  @ViewChild('heroCanvas') private heroCanvas?: ElementRef<HTMLCanvasElement>;

  readonly articleCount = ARTICLE_SUMMARIES.length;
  readonly learnChapters = 40;
  readonly learnLanguages = 3;

  /** Newest articles first, capped for the home showcase. */
  readonly featuredArticles: ArticleSummary[] = [...ARTICLE_SUMMARIES]
    .sort((a, b) => b.publishedIso.localeCompare(a.publishedIso))
    .slice(0, 6);

  readonly learnHighlights: string[] = [
    'TCP, UDP & Sockets',
    'HTTP/1.1 · 2 · 3',
    'HTTPS, TLS & mTLS',
    'REST & OpenAPI',
    'OAuth 2.0 & OIDC',
    'JWT / JWS / JWE',
    'API Gateways',
    'Kubernetes for APIs',
    'Zero Trust',
    'Observability'
  ];

  readonly features: Feature[] = [
    {
      icon: 'lock_open',
      title: 'Free & no sign-up',
      description: 'Every chapter and article is free, with no account and no paywall — ever.'
    },
    {
      icon: 'menu_book',
      title: 'In-depth, not shallow',
      description: 'Long-form content that explains the "why" behind each protocol, pattern and decision.'
    },
    {
      icon: 'translate',
      title: 'Multilingual',
      description: 'The full learning track is available in English, Portuguese and Spanish.'
    }
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'What is The Big Learn?',
      answer:
        'The Big Learn (TBL) is a free learning platform for developers. Its core is an in-depth, multilingual track on corporate APIs — networking, security, protocols and architecture — supported by practical articles.'
    },
    {
      question: 'What does "Explore more. Understand deeply." mean?',
      answer:
        'It is the promise of TBL: keep exploring new topics, and go deep enough to truly understand how things work — not just memorise them.'
    },
    {
      question: 'Is everything really free?',
      answer:
        'Yes. All learning content and articles are completely free, require no account and open directly in your browser.'
    },
    {
      question: 'Which languages are supported?',
      answer:
        'The Learn track is available in English, Portuguese and Spanish, with the same 40+ chapters in each language.'
    }
  ];

  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  private rafId = 0;
  private observers: Array<IntersectionObserver | ResizeObserver> = [];
  private teardownFns: Array<() => void> = [];
  private reducedMotion = false;
  private paused = false;

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Home');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.zone.runOutsideAngular(() => {
      this.initNeuralField();
      this.initCountUp();
      this.initSectionReveal();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.observers.forEach((o) => o.disconnect());
    this.observers = [];
    this.teardownFns.forEach((fn) => fn());
    this.teardownFns = [];
  }

  trackByString(_: number, value: string): string {
    return value;
  }

  trackByTitle(_: number, item: { title: string }): string {
    return item.title;
  }

  trackByRoute(_: number, item: { route: string }): string {
    return item.route;
  }

  trackByQuestion(_: number, item: FaqItem): string {
    return item.question;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Neural field: interconnected neurons firing synaptic pulses along their
  // branches. A neuron that receives a pulse randomly re-transmits to some of
  // its other branches (and skips the rest). Activity concentrates near the
  // pointer.
  // ══════════════════════════════════════════════════════════════════════
  private static readonly COLORS: ReadonlyArray<readonly [number, number, number]> = [
    [0, 255, 209],   // aqua
    [91, 124, 255],  // blue
    [182, 37, 255]   // purple
  ];

  private neurons: Neuron[] = [];
  private pulses: Pulse[] = [];
  private ctx: CanvasRenderingContext2D | null = null;
  private cssW = 0;
  private cssH = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private mouseActive = false;
  private spawnAccumulator = 0;

  private readonly MOUSE_RADIUS = 260;
  private readonly MAX_PULSES = 300;
  private readonly BRANCH_PROB = 0.55;
  private readonly MAX_BRANCHES = 3;
  private readonly REFRACTORY_MS = 190;
  private readonly PULSE_SPEED = 0.052;      // slow base speed (css px per ms)
  private readonly MOUSE_SPEED_BOOST = 0.95;  // near-pointer travel speed factor
  private readonly NEURON_ATTRACT_RADIUS = 320; // pointer influence on neuron drift

  private initNeuralField(): void {
    const host = this.homeRoot?.nativeElement;
    const canvas = this.heroCanvas?.nativeElement;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    let lastW = 0;
    let lastH = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = host.clientWidth;
      const h = host.scrollHeight;
      if (!w || !h) return;
      // Ignore tiny height jitters from hover/reveal transitions.
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 48) return;
      lastW = w;
      lastH = h;
      this.cssW = w;
      this.cssH = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.buildNetwork();
    };

    resize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => resize());
      ro.observe(host);
      this.observers.push(ro);
    }

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.mouseActive = true;
    };
    const onLeave = () => {
      this.mouseActive = false;
      this.mouseX = -9999;
      this.mouseY = -9999;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });
    this.teardownFns.push(() => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
    });

    const onVisibility = () => { this.paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);
    this.teardownFns.push(() => document.removeEventListener('visibilitychange', onVisibility));

    // Seed some initial activity.
    for (let i = 0; i < 5; i++) this.fireNeuron(Math.floor(Math.random() * this.neurons.length), -1, performance.now());

    if (this.reducedMotion) {
      this.drawFrame(0, performance.now());
      return;
    }

    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!this.paused) this.drawFrame(dt, now);
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  /** Grid-jittered neuron placement, wired to nearby neighbours. */
  private buildNetwork(): void {
    const w = this.cssW;
    const h = this.cssH;
    if (!w || !h) return;

    const cell = 155;
    const cols = Math.max(2, Math.round(w / cell));
    const rows = Math.max(2, Math.round(h / cell));
    const cw = w / cols;
    const ch = h / rows;

    const neurons: Neuron[] = [];
    const grid: number[][] = Array.from({ length: cols * rows }, () => []);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * cw + (Math.random() - 0.5) * cw * 0.72;
        const y = (r + 0.5) * ch + (Math.random() - 0.5) * ch * 0.72;
        const idx = neurons.length;
        neurons.push({
          x,
          y,
          hx: x,
          hy: y,
          vx: 0,
          vy: 0,
          radius: 104 + Math.random() * 120,
          wander: 0.65 + Math.random() * 0.7,
          lum: 1 + Math.random() * 0.7,
          neighbors: [],
          glow: 0,
          lastFire: -1e9,
          color: Math.floor(Math.random() * 3) as 0 | 1 | 2
        });
        grid[r * cols + c].push(idx);
      }
    }

    const maxDist = Math.max(cw, ch) * 1.7;
    const maxDist2 = maxDist * maxDist;
    const maxDegree = 5;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        for (const i of grid[r * cols + c]) {
          const a = neurons[i];
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const rr = r + dr;
              const cc = c + dc;
              if (rr < 0 || cc < 0 || rr >= rows || cc >= cols) continue;
              for (const j of grid[rr * cols + cc]) {
                if (j <= i) continue;
                const b = neurons[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                if (dx * dx + dy * dy > maxDist2) continue;
                if (a.neighbors.length < maxDegree && b.neighbors.length < maxDegree) {
                  a.neighbors.push(j);
                  b.neighbors.push(i);
                }
              }
            }
          }
        }
      }
    }

    // Guarantee no isolated neurons: link to the closest one if needed.
    for (let i = 0; i < neurons.length; i++) {
      if (neurons[i].neighbors.length) continue;
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < neurons.length; j++) {
        if (j === i) continue;
        const dx = neurons[i].x - neurons[j].x;
        const dy = neurons[i].y - neurons[j].y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = j; }
      }
      if (best >= 0) {
        neurons[i].neighbors.push(best);
        neurons[best].neighbors.push(i);
      }
    }

    this.neurons = neurons;
    this.pulses = [];
  }

  private fireNeuron(index: number, from: number, now: number): void {
    const n = this.neurons[index];
    if (!n) return;
    if (now - n.lastFire < this.REFRACTORY_MS) return;
    n.lastFire = now;
    n.glow = 1;

    const candidates = n.neighbors.filter((j) => j !== from);

    if (this.mouseActive) {
      // Bias transmission towards the pointer: branches that move closer to the
      // mouse fire often, the ones moving away only rarely. Signals therefore
      // migrate from wherever they start towards the pointer.
      const di = Math.hypot(n.x - this.mouseX, n.y - this.mouseY);
      candidates.sort((a, b) => this.distToMouse(a) - this.distToMouse(b));
      let branches = 0;
      for (const j of candidates) {
        if (branches >= this.MAX_BRANCHES || this.pulses.length >= this.MAX_PULSES) break;
        const prob = this.distToMouse(j) < di ? 0.9 : 0.16;
        if (Math.random() < prob) {
          this.spawnPulse(index, j);
          branches++;
        }
      }
    } else {
      // No pointer: pick which branches transmit at random — some fire, some stay silent.
      for (let i = candidates.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[k]] = [candidates[k], candidates[i]];
      }
      let branches = 0;
      for (const j of candidates) {
        if (branches >= this.MAX_BRANCHES || this.pulses.length >= this.MAX_PULSES) break;
        if (Math.random() < this.BRANCH_PROB) {
          this.spawnPulse(index, j);
          branches++;
        }
      }
    }
  }

  private distToMouse(index: number): number {
    const n = this.neurons[index];
    return Math.hypot(n.x - this.mouseX, n.y - this.mouseY);
  }

  private spawnPulse(from: number, to: number): void {
    const a = this.neurons[from];
    const b = this.neurons[to];
    if (!a || !b) return;
    const len = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    this.pulses.push({
      from,
      to,
      t: 0,
      speed: this.PULSE_SPEED * (0.8 + Math.random() * 0.5),
      len,
      intensity: 0.45 + Math.random() * 0.8,
      size: 0.65 + Math.random() * 0.9,
      color: b.color
    });
  }

  /**
   * Spontaneous firing seeds new signals. When the pointer is present, origins
   * are biased AWAY from it, so the pulses are born elsewhere and then migrate
   * inward towards the pointer through the branch bias in fireNeuron().
   */
  private spontaneousFire(now: number, count: number): void {
    if (!this.neurons.length) return;
    for (let c = 0; c < count; c++) {
      let index = Math.floor(Math.random() * this.neurons.length);
      if (this.mouseActive) {
        let bestD = -1;
        for (let k = 0; k < 4; k++) {
          const j = Math.floor(Math.random() * this.neurons.length);
          const d = this.distToMouse(j);
          if (d > bestD) { bestD = d; index = j; }
        }
      }
      this.fireNeuron(index, -1, now);
    }
  }

  /**
   * Each neuron drifts gently within its own leash radius. When the pointer is
   * near, it leans towards the pointer but never leaves its allowed circle.
   */
  private updateNeurons(dt: number): void {
    const f = Math.min(dt, 32) / 16;
    const attractR = this.NEURON_ATTRACT_RADIUS;
    const attract2 = attractR * attractR;

    for (const n of this.neurons) {
      // Subtle random wander — its magnitude varies a little per neuron.
      n.vx += (Math.random() - 0.5) * 0.055 * n.wander;
      n.vy += (Math.random() - 0.5) * 0.055 * n.wander;

      // Lean towards the pointer, stronger the closer it is.
      if (this.mouseActive) {
        const dx = this.mouseX - n.x;
        const dy = this.mouseY - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < attract2 && d2 > 1) {
          const d = Math.sqrt(d2);
          const infl = 1 - d / attractR;
          n.vx += (dx / d) * infl * 0.17;
          n.vy += (dy / d) * infl * 0.17;
        }
      }

      // Mild pull back home + damping keeps the motion calm and bounded.
      n.vx += (n.hx - n.x) * 0.006;
      n.vy += (n.hy - n.y) * 0.006;
      n.vx *= 0.9;
      n.vy *= 0.9;

      const sp2 = n.vx * n.vx + n.vy * n.vy;
      const maxV = 0.9 * n.wander;
      if (sp2 > maxV * maxV) {
        const s = maxV / Math.sqrt(sp2);
        n.vx *= s;
        n.vy *= s;
      }

      n.x += n.vx * f;
      n.y += n.vy * f;

      // Hard leash: never drift beyond the neuron's radius from home.
      const hx = n.x - n.hx;
      const hy = n.y - n.hy;
      const hd = Math.hypot(hx, hy);
      if (hd > n.radius) {
        n.x = n.hx + (hx / hd) * n.radius;
        n.y = n.hy + (hy / hd) * n.radius;
      }
    }
  }

  private drawFrame(dt: number, now: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.neurons.length) return;

    const host = this.homeRoot?.nativeElement;
    const rect = host?.getBoundingClientRect();
    const viewTop = rect ? Math.max(0, -rect.top) : 0;
    const viewH = typeof window !== 'undefined' ? window.innerHeight : this.cssH;
    const margin = 60;
    const bandTop = viewTop - margin;
    const bandBottom = viewTop + viewH + margin;

    // Only clear/redraw the on-screen slice — keeps a tall canvas cheap.
    ctx.clearRect(0, bandTop, this.cssW, viewH + margin * 2);

    // Drift the neurons within their leash and let them lean towards the pointer.
    if (!this.reducedMotion) this.updateNeurons(dt);

    // Seed a steady, modest amount of activity (origins biased away from pointer).
    if (!this.reducedMotion) {
      this.spawnAccumulator += dt;
      const interval = 430;
      while (this.spawnAccumulator >= interval) {
        this.spawnAccumulator -= interval;
        this.spontaneousFire(now, 1);
      }
      if (this.pulses.length < 6) this.spontaneousFire(now, 2);
    }

    const inBand = (y: number) => y >= bandTop && y <= bandBottom;

    // ── Branches (edges) ──────────────────────────────────────────────
    ctx.lineWidth = 1;
    for (let i = 0; i < this.neurons.length; i++) {
      const a = this.neurons[i];
      for (const j of a.neighbors) {
        if (j <= i) continue;
        const b = this.neurons[j];
        if (!inBand(a.y) && !inBand(b.y)) continue;
        const activity = Math.max(a.glow, b.glow);
        const alpha = 0.0381 + activity * 0.2704;
        const [r, g, bl] = TblHomeComponent.COLORS[a.color];
        ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // ── Neuron bodies ─────────────────────────────────────────────────
    for (const n of this.neurons) {
      if (!this.reducedMotion) n.glow *= Math.pow(0.9, dt / 16);
      if (!inBand(n.y)) continue;
      const [r, g, b] = TblHomeComponent.COLORS[n.color];

      if (n.glow > 0.02) {
        const halo = 4 + n.glow * 9;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, halo);
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(n.glow * 0.4225 * n.lum, 1).toFixed(3)})`);
        grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, halo, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min((0.26 + n.glow * 0.507) * n.lum, 1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.5 + n.glow * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Synaptic pulses ───────────────────────────────────────────────
    // Additive blending so overlapping halos accumulate: the more pulses in an
    // area, the brighter that area glows.
    ctx.globalCompositeOperation = 'lighter';
    const mR2 = this.MOUSE_RADIUS * this.MOUSE_RADIUS;
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      const a = this.neurons[p.from];
      const b = this.neurons[p.to];
      if (!a || !b) { this.pulses.splice(i, 1); continue; }

      // Proximity to the pointer, measured at the current position.
      let near = false;
      if (this.mouseActive) {
        const cx = a.x + (b.x - a.x) * p.t;
        const cy = a.y + (b.y - a.y) * p.t;
        const dx = cx - this.mouseX;
        const dy = cy - this.mouseY;
        if (dx * dx + dy * dy < mR2) near = true;
      }

      // Slow by default; only accelerate while travelling near the pointer.
      if (!this.reducedMotion) {
        const mult = near ? this.MOUSE_SPEED_BOOST : 1;
        p.t += (p.speed * mult / p.len) * dt;
      }

      if (p.t >= 1) {
        this.fireNeuron(p.to, p.from, now);
        this.pulses.splice(i, 1);
        continue;
      }

      const x = a.x + (b.x - a.x) * p.t;
      const y = a.y + (b.y - a.y) * p.t;
      if (!inBand(y)) continue;

      const bright = (near ? 1.5 : 1) * p.intensity * 0.325;
      const [r, g, bl] = TblHomeComponent.COLORS[p.color];

      // Wide, very soft ambient light — accumulates with nearby pulses.
      const ambR = (near ? 42 : 32) * p.size;
      const amb = ctx.createRadialGradient(x, y, 0, x, y, ambR);
      amb.addColorStop(0, `rgba(${r}, ${g}, ${bl}, ${(0.033 * bright).toFixed(3)})`);
      amb.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);
      ctx.fillStyle = amb;
      ctx.beginPath();
      ctx.arc(x, y, ambR, 0, Math.PI * 2);
      ctx.fill();

      // Focused halo that fades smoothly to transparent.
      const glowR = (near ? 16 : 12) * p.size;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      grd.addColorStop(0, `rgba(${r}, ${g}, ${bl}, ${(0.3 * bright).toFixed(3)})`);
      grd.addColorStop(0.35, `rgba(${r}, ${g}, ${bl}, ${(0.11 * bright).toFixed(3)})`);
      grd.addColorStop(0.7, `rgba(${r}, ${g}, ${bl}, ${(0.03 * bright).toFixed(3)})`);
      grd.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Gentle luminous core.
      ctx.fillStyle = `rgba(235, 255, 250, ${(0.65 * bright).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    if (this.pulses.length > this.MAX_PULSES) {
      this.pulses.splice(0, this.pulses.length - this.MAX_PULSES);
    }
  }

  // ── Hero: count-up animation for the stats row ──────────────────────────
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

  // ── Below the hero: sections fade-slide in as they enter the viewport ───
  private initSectionReveal(): void {
    if (typeof IntersectionObserver === 'undefined' || this.reducedMotion) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.tbl-reveal'));
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tbl-reveal-in');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    for (const t of targets) io.observe(t);
    this.observers.push(io);
  }
}
