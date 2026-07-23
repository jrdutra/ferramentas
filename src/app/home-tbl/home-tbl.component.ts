import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';
import { ARTICLE_SUMMARIES, ArticleSummary } from '../articles/articles.data';
import { SiteProgressComponent } from '../learn/reading-progress/site-progress.component';

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
  tx: number;     // icon-formation target x
  ty: number;     // icon-formation target y
  captured: boolean; // true while pinned onto an invisible icon stroke
  alpha: number;  // 0..1 opacity, used for fade-in (new points) and fade-out (dispersal)
  life: 'alive' | 'dying' | 'dead';
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

interface LearnFeature {
  category: string;
  title: string;
  excerpt: string;
  route: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

/** Curated Learn chapters (English) shown in the home Learn carousel. */
const LEARN_FEATURE_POOL: LearnFeature[] = [
  {
    category: 'Networking', title: 'Internet, Networking, and API Fundamentals',
    excerpt: 'From network communication to the complete processing of a request in an API Gateway.',
    route: '/learn/en/internet-networking-api-fundamentals', readingTime: '45 min read',
    image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
    imageAlt: 'An API call crossing network layers and an API Gateway'
  },
  {
    category: 'Networking', title: 'TCP, UDP, Ports, and Sockets',
    excerpt: 'From connection establishment to diagnosing timeouts, pooling, SNAT, and port exhaustion.',
    route: '/learn/en/tcp-udp-ports-and-sockets', readingTime: '50 min read',
    image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
    imageAlt: 'TCP streams and UDP datagrams crossing an API Gateway'
  },
  {
    category: 'Protocols', title: 'HTTP/1.1, HTTP/2, and HTTP/3',
    excerpt: 'From semantics and framing to multiplexing, HPACK, QUIC, QPACK, and protocol translation.',
    route: '/learn/en/http-1-1-http-2-and-http-3', readingTime: '80 min read',
    image: '/assets/learn/http-versions-cover.png',
    imageAlt: 'Evolution from HTTP messages to multiplexed streams and QUIC through an API Gateway'
  },
  {
    category: 'Security', title: 'HTTPS and TLS in Depth',
    excerpt: 'From cryptography and TLS 1.2/1.3 handshakes to X.509 certificates, mTLS, and HSTS.',
    route: '/learn/en/https-and-tls-in-depth', readingTime: '70 min read',
    image: '/assets/learn/https-tls-cover.png',
    imageAlt: 'HTTPS connection protected by TLS, a certificate chain, and an API Gateway'
  },
  {
    category: 'Cryptography', title: 'Cryptography: Symmetric, Asymmetric, Hashes, and Signatures',
    excerpt: 'From AES, hashes, HMAC, and digital signatures to key management, KMS, HSM, and PQC.',
    route: '/learn/en/cryptography-fundamentals-and-api-applications', readingTime: '65 min read',
    image: '/assets/learn/cryptography-cover.png',
    imageAlt: 'Cryptographic core protecting keys, signatures, hashes, and API calls'
  },
  {
    category: 'Security', title: 'Digital Certificates, PKI, and X.509',
    excerpt: 'From identity, issuance, and trust chains to SAN, CSR, CRL, OCSP, HSM, and mTLS.',
    route: '/learn/en/digital-certificates-pki-and-x509', readingTime: '75 min read',
    image: '/assets/learn/digital-certificates-pki-x509-cover.png',
    imageAlt: 'PKI trust chain connecting a root CA, certificates, an HSM, an API Gateway, and servers'
  },
  {
    category: 'API design', title: 'REST: Architecture and Best Practices',
    excerpt: "From Fielding's principles to resources, HTTP semantics, idempotency, caching, and OpenAPI.",
    route: '/learn/en/rest-architecture-and-best-practices', readingTime: '85 min read',
    image: '/assets/learn/rest-architecture-best-practices-cover.png',
    imageAlt: 'Enterprise REST ecosystem with a central resource, clients, API Gateway, and persistence'
  },
  {
    category: 'API design', title: 'GraphQL, gRPC, and WebSocket',
    excerpt: 'From schemas, resolvers, and N+1 to Protobuf, streaming, deadlines, and persistent connections.',
    route: '/learn/en/graphql-grpc-and-websocket', readingTime: '65 min read',
    image: '/assets/learn/graphql-grpc-websocket-cover.png',
    imageAlt: 'GraphQL, gRPC, and WebSocket connected in a modern enterprise architecture'
  },
  {
    category: 'Identity', title: 'Authentication vs. Authorization',
    excerpt: 'From identity proof to access decisions: credentials, tokens, OAuth, RBAC, ABAC, and ReBAC.',
    route: '/learn/en/authentication-vs-authorization', readingTime: '120 min read',
    image: '/assets/learn/authentication-authorization-cover.png',
    imageAlt: 'Enterprise flow separating identity proof from access decisions for protected APIs'
  },
  {
    category: 'Identity', title: 'OAuth 2.0 in Depth: Flows, Tokens, and Security',
    excerpt: 'Authorization Code with PKCE, Client Credentials, refresh tokens, introspection, PAR, and DPoP.',
    route: '/learn/en/oauth-2-flows-tokens-and-security', readingTime: '150 min read',
    image: '/assets/learn/oauth-2-flows-tokens-security-cover.png',
    imageAlt: 'OAuth 2.0 flows protected by PKCE, tokens, and modern security controls'
  },
  {
    category: 'Identity', title: 'JWT, JWS, JWE, and JOSE in Depth',
    excerpt: 'Claims, Base64url, signatures, MAC, algorithms, JWK, JWKS, key rotation, and secure validation.',
    route: '/learn/en/jwt-jws-jwe-and-jose-in-depth', readingTime: '150 min read',
    image: '/assets/learn/jwt-jws-jwe-jose-in-depth-cover.png',
    imageAlt: 'Layered token protected by signatures, encryption, and key governance in an API architecture'
  },
  {
    category: 'Architecture', title: 'API Gateways: Concepts and Architecture',
    excerpt: 'Data plane, control plane, policies, routing, security, traffic control, and high availability.',
    route: '/learn/en/api-gateways-concepts-and-architecture', readingTime: '135 min read',
    image: '/assets/learn/api-gateways-architecture-cover.png',
    imageAlt: 'Central API Gateway mediating consumers, policies, and backend services'
  },
  {
    category: 'Security', title: 'API Security (OWASP API Security Top 10)',
    excerpt: 'BOLA, authentication, properties, resources, functions, business flows, SSRF, and configuration.',
    route: '/learn/en/api-security-owasp-api-security-top-10', readingTime: '105 min read',
    image: '/assets/learn/api-security-owasp-top-10-cover.png',
    imageAlt: 'Defense in depth protecting API identities, gateways, backends, and data'
  },
  {
    category: 'Cloud native', title: 'Service Mesh (Istio, Linkerd, and Envoy)',
    excerpt: 'Control plane, data plane, sidecars, ambient mode, mTLS, traffic management, and resilience.',
    route: '/learn/en/service-mesh-istio-linkerd-and-envoy', readingTime: '130 min read',
    image: '/assets/learn/service-mesh-istio-linkerd-envoy-cover.png',
    imageAlt: 'Control plane coordinating a secure mesh of workloads, proxies, and multiple clusters'
  },
  {
    category: 'Cloud native', title: 'Kubernetes for APIs',
    excerpt: 'Pods, workloads, Services, Gateway API, configuration, probes, autoscaling, and GitOps.',
    route: '/learn/en/kubernetes-for-apis', readingTime: '140 min read',
    image: '/assets/learn/kubernetes-for-apis-cover.png',
    imageAlt: 'Kubernetes cluster running APIs with routing, security, autoscaling, and observability'
  },
  {
    category: 'Security', title: 'Zero Trust Applied to APIs',
    excerpt: 'Composite identity, per-request decisions, PDP, PEP, mTLS, policy-as-code, and adaptive risk.',
    route: '/learn/en/zero-trust-applied-to-apis', readingTime: '135 min read',
    image: '/assets/learn/zero-trust-applied-to-apis-cover.png',
    imageAlt: 'Zero Trust architecture evaluating identity, risk, and policies before granting API access'
  }
];

@Component({
  selector: 'app-home-tbl',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, SiteProgressComponent],
  templateUrl: './home-tbl.component.html',
  styleUrl: './home-tbl.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TblHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('homeRoot') private homeRoot?: ElementRef<HTMLElement>;
  @ViewChild('heroSection') private heroSection?: ElementRef<HTMLElement>;
  @ViewChild('heroCanvas') private heroCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('articlesTrack') private articlesTrack?: ElementRef<HTMLElement>;
  @ViewChild('learnTrack') private learnTrack?: ElementRef<HTMLElement>;

  readonly articleCount = ARTICLE_SUMMARIES.length;
  readonly learnChapters = 40;
  readonly learnLanguages = 3;

  private readonly allArticles: ArticleSummary[] = [...ARTICLE_SUMMARIES];

  /**
   * 12 articles for the home carousel. Initialised deterministically (newest
   * first) so SSR and the first client render match; a random selection is
   * applied in the browser after hydration (see afterNextRender below).
   */
  featuredArticles: ArticleSummary[] = [...ARTICLE_SUMMARIES]
    .sort((a, b) => b.publishedIso.localeCompare(a.publishedIso))
    .slice(0, 12);

  /** 12 Learn chapters for the home carousel, randomised in the browser. */
  featuredLearn: LearnFeature[] = LEARN_FEATURE_POOL.slice(0, 12);

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
    },
    {
      question: 'Who is The Big Learn for?',
      answer:
        'For developers, architects, students and anyone who works with or wants to understand corporate APIs — from people taking their first steps to experienced engineers filling gaps in networking, security or architecture.'
    },
    {
      question: 'Do I need to follow the chapters in order?',
      answer:
        'No. The Learn track is designed as a progressive series, so reading in order builds the strongest foundation, but every chapter also works as a standalone reference you can jump straight into.'
    },
    {
      question: 'Do you use cookies or track me?',
      answer:
        'We do not store cookies on your device. Reading progress is kept locally in your own browser, and for security we retain only the request IP and accessed path for 7 days. See the About page for the full cookie and privacy policies.'
    },
    {
      question: 'Are there developer tools here too?',
      answer:
        'Yes. Alongside the learning content, The Big Learn includes a set of free, no-sign-up developer utilities — Base64, JSON, JWT, QR codes and more — available under Tools.'
    }
  ];

  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  private rafId = 0;
  private observers: Array<IntersectionObserver | ResizeObserver> = [];
  private teardownFns: Array<() => void> = [];
  private reducedMotion = false;
  private paused = false;

  constructor(
    private readonly dataService: DataService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Randomise the home carousels in the browser only, after the first render,
    // so server-rendered HTML and hydration stay in sync (no mismatch).
    afterNextRender(() => {
      this.featuredArticles = this.pickRandom(this.allArticles, 12);
      this.featuredLearn = this.pickRandom(LEARN_FEATURE_POOL, 12);
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Home');
  }

  /** Returns up to `count` items picked at random (Fisher–Yates on a copy). */
  private pickRandom<T>(source: readonly T[], count: number): T[] {
    const pool = [...source];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
  }

  /** Scrolls a home carousel one "page" left (-1) or right (1). */
  scrollCarousel(which: 'articles' | 'learn', dir: -1 | 1): void {
    const track = which === 'articles'
      ? this.articlesTrack?.nativeElement
      : this.learnTrack?.nativeElement;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.85, 280);
    track.scrollBy({ left: amount * dir, behavior: 'smooth' });
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
  private maxLinkDist = 0;
  private baseCount = 0;
  private rewireAcc = 0;
  private iconActive = false;
  private iconAnchorX = 0;
  private iconAnchorY = 0;
  private capturedIdx: number[] = [];
  private stillX = -9999;
  private stillY = -9999;
  private stillSince = 0;

  private readonly MOUSE_RADIUS = 260;
  private readonly MAX_PULSES = 300;
  private readonly BRANCH_PROB = 0.55;
  private readonly MAX_BRANCHES = 3;
  private readonly REFRACTORY_MS = 190;
  private readonly PULSE_SPEED = 0.052;      // slow base speed (css px per ms)
  private readonly MOUSE_SPEED_BOOST = 0.95;  // near-pointer travel speed factor
  private readonly ICON_SIZE = 330;           // rendered size of the invisible icon strokes
  private readonly ICON_POINTS = 92;          // how many points arrange onto the strokes
  private readonly DISPERSE_MS = 2600;        // slow fade-out while a drawing disperses
  private readonly SPAWN_FADE_MS = 1400;      // fade-in for replacement points
  private readonly ICON_RECRUIT_RADIUS = 450; // how far points may be recruited from
  private readonly NEURON_ATTRACT_RADIUS = 320; // pointer influence on free-point drift
  private readonly REWIRE_INTERVAL = 850;     // ms between connection dissolve/grow steps

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
      // Track stillness: drawings only start after the pointer rests in place.
      if (Math.hypot(this.mouseX - this.stillX, this.mouseY - this.stillY) > 14) {
        this.stillX = this.mouseX;
        this.stillY = this.mouseY;
        this.stillSince = performance.now();
      }
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
          tx: x,
          ty: y,
          captured: false,
          alpha: 1,
          life: 'alive',
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
    this.maxLinkDist = maxDist;

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
    this.baseCount = neurons.length;
    this.pulses = [];
  }

  private fireNeuron(index: number, from: number, now: number): void {
    const n = this.neurons[index];
    if (!n || n.life !== 'alive') return;
    if (now - n.lastFire < this.REFRACTORY_MS) return;
    n.lastFire = now;
    n.glow = Math.max(n.glow, 1);

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
    if (!a || !b || a.life !== 'alive' || b.life !== 'alive') return;

    // Inside a formed drawing, synapses keep flowing like everywhere else —
    // just mildly reduced so the icon stays readable.
    if ((a.captured || b.captured) && Math.random() > 0.5) return;

    // A line normally carries a single pulse; a second one is rare, never a third.
    let onEdge = 0;
    for (const q of this.pulses) {
      if ((q.from === from && q.to === to) || (q.from === to && q.to === from)) onEdge++;
    }
    if (onEdge >= 2) return;
    if (onEdge === 1 && Math.random() > 0.12) return;

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
      if (this.iconActive && this.capturedIdx.length && Math.random() < 0.45) {
        // The drawing is part of the network: seed pulses on its own points so
        // synapses visibly run between them too.
        index = this.capturedIdx[Math.floor(Math.random() * this.capturedIdx.length)];
      } else if (this.mouseActive) {
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
   * Fixed points oscillate inside their own leash radius. They only ever leave
   * that radius under mouse influence: nearby points are recruited onto the
   * invisible strokes of a themed icon (article, learning, security…) and hold
   * position there until the pointer moves away.
   */
  private updateNeurons(dt: number, now: number): void {
    const f = Math.min(dt, 32) / 16;

    this.manageIconFormation(now);
    this.rewire(dt);
    if (this.iconActive) this.migrateCapturedLinks();

    for (let ni = 0; ni < this.neurons.length; ni++) {
      const n = this.neurons[ni];
      if (n.life === 'dead') continue;

      if (n.life === 'dying') {
        // Slow dispersal: the point drifts apart and fades away.
        n.vx += (Math.random() - 0.5) * 0.03;
        n.vy += (Math.random() - 0.5) * 0.03;
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.x += n.vx * f;
        n.y += n.vy * f;
        n.alpha -= dt / this.DISPERSE_MS;
        if (n.alpha <= 0) {
          n.alpha = 0;
          n.life = 'dead';
          this.stripLinks(ni);
        }
        continue;
      }

      // Freshly spawned replacement points fade in.
      if (n.alpha < 1) n.alpha = Math.min(1, n.alpha + dt / this.SPAWN_FADE_MS);

      if (n.captured) {
        const dxT = n.tx - n.x;
        const dyT = n.ty - n.y;
        const settled = dxT * dxT + dyT * dyT < 36; // within 6px of its stroke

        // Mouse influence: drift calmly onto the invisible icon stroke
        // (1/3 of the previous formation speed).
        n.vx += dxT * 0.00167;
        n.vy += dyT * 0.00167;
        if (settled) {
          // Once the drawing has formed, hover in place at a very low speed.
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
        n.vx *= 0.85;
        n.vy *= 0.85;
        const spc = n.vx * n.vx + n.vy * n.vy;
        // Distant recruits fly in faster and glide as they arrive, so the whole
        // outline completes together instead of trickling in (1/3 speed).
        const maxC = settled ? 0.14 : Math.min(0.67, 0.25 + Math.sqrt(dxT * dxT + dyT * dyT) / 1200);
        if (spc > maxC * maxC) {
          const s = maxC / Math.sqrt(spc);
          n.vx *= s;
          n.vy *= s;
        }
        n.x += n.vx * f;
        n.y += n.vy * f;
        continue; // leash suspended while it belongs to the drawing
      }

      // Subtle random wander — its magnitude varies a little per neuron.
      n.vx += (Math.random() - 0.5) * 0.055 * n.wander;
      n.vy += (Math.random() - 0.5) * 0.055 * n.wander;

      // Free points lean towards the pointer, stronger the closer it is —
      // the leash below still keeps them inside their own radius.
      if (this.mouseActive) {
        const dxm = this.mouseX - n.x;
        const dym = this.mouseY - n.y;
        const dm2 = dxm * dxm + dym * dym;
        const aR = this.NEURON_ATTRACT_RADIUS;
        if (dm2 < aR * aR && dm2 > 1) {
          const dm = Math.sqrt(dm2);
          const infl = 1 - dm / aR;
          n.vx += (dxm / dm) * infl * 0.17;
          n.vy += (dym / dm) * infl * 0.17;
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

      // Soft leash: beyond its radius the point is pulled back by a spring,
      // so points released far away (after a drawing dissolves) glide home
      // smoothly instead of snapping to the boundary.
      const hx = n.x - n.hx;
      const hy = n.y - n.hy;
      const hd = Math.hypot(hx, hy);
      if (hd > n.radius) {
        const over = (hd - n.radius) / hd;
        n.vx -= hx * over * 0.03;
        n.vy -= hy * over * 0.03;
      }
    }
  }

  // ── Icon formation under mouse influence ────────────────────────────────
  private manageIconFormation(now: number): void {
    if (this.mouseActive) {
      if (!this.iconActive) {
        // A drawing starts after the pointer rests 15s in the same spot.
        if (now - this.stillSince > 15000) this.formIcon();
      } else {
        // The drawing stays where it formed. If the pointer strays further than
        // 20% of the icon size from it, the drawing starts to dissolve.
        const moved = Math.hypot(this.mouseX - this.iconAnchorX, this.mouseY - this.iconAnchorY);
        if (moved > this.ICON_SIZE * 0.2) {
          this.releaseIcon();
        }
      }
    } else if (this.iconActive) {
      // Pointer gone (left the page): let the drawing disperse slowly.
      this.releaseIcon();
    }
  }

  /** Recruits the nearest points and pins them along the icon's invisible strokes. */
  private formIcon(): void {
    const icons = TblHomeComponent.getIcons();
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const locals = this.sampleIcon(icon, this.ICON_POINTS);
    if (!locals.length) return;

    this.iconAnchorX = this.mouseX;
    this.iconAnchorY = this.mouseY;

    const targets = locals.map((p) => ({
      x: this.iconAnchorX + p.lx * this.ICON_SIZE,
      y: this.iconAnchorY + p.ly * this.ICON_SIZE
    }));

    // Recruit enough points to complete the WHOLE drawing: widen the search
    // radius until there are at least as many candidates as stroke targets.
    let recruitR = this.ICON_RECRUIT_RADIUS;
    let pool: number[] = [];
    for (let round = 0; round < 4; round++) {
      const r2 = recruitR * recruitR;
      pool = [];
      for (let i = 0; i < this.neurons.length; i++) {
        const n = this.neurons[i];
        if (n.life !== 'alive' || n.captured) continue;
        const dx = n.x - this.mouseX;
        const dy = n.y - this.mouseY;
        if (dx * dx + dy * dy < r2) pool.push(i);
      }
      if (pool.length >= targets.length) break;
      recruitR *= 1.7;
    }

    // If points are still scarce, thin the targets uniformly across all strokes
    // so the full outline always forms (just at a lower density) — never leave
    // half a drawing missing.
    let chosen = targets;
    if (pool.length < targets.length && pool.length > 0) {
      chosen = [];
      const step = targets.length / pool.length;
      for (let k = 0; k < pool.length; k++) {
        chosen.push(targets[Math.min(targets.length - 1, Math.floor(k * step))]);
      }
    }

    const used = new Set<number>();
    for (const t of chosen) {
      let best = -1;
      let bestD = Infinity;
      for (const i of pool) {
        if (used.has(i)) continue;
        const n = this.neurons[i];
        const d = (n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y);
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best < 0) break;
      used.add(best);
      const n = this.neurons[best];
      n.captured = true;
      n.tx = t.x;
      n.ty = t.y;
      this.capturedIdx.push(best);
      // Fill the vacancy it leaves behind with a fresh point fading in.
      this.spawnReplacement(n.hx, n.hy);
    }

    this.iconActive = true;
  }

  /**
   * The drawing dissolves without any fade: each point gets a small scatter
   * impulse and then travels back to its place of origin, pulled home by the
   * containment spring in updateNeurons().
   */
  private releaseIcon(): void {
    for (const i of this.capturedIdx) {
      const n = this.neurons[i];
      if (!n) continue;
      n.captured = false;
      const ang = Math.random() * Math.PI * 2;
      const sp = 0.2 + Math.random() * 0.35;
      n.vx = Math.cos(ang) * sp;
      n.vy = Math.sin(ang) * sp;
      // hx/hy stay untouched: the point returns to where it came from.
    }
    this.capturedIdx = [];
    this.iconActive = false;
  }

  /** Removes every link of a point that has fully faded out. */
  private stripLinks(index: number): void {
    const n = this.neurons[index];
    for (const j of n.neighbors) {
      const b = this.neurons[j];
      const k = b?.neighbors.indexOf(index) ?? -1;
      if (k >= 0) b.neighbors.splice(k, 1);
    }
    n.neighbors = [];
  }

  /** Spawns a fresh point (fading in) at the vacancy a recruited point left. */
  private spawnReplacement(hx: number, hy: number): void {
    // Dispersed points stay alive now, so cap the population to avoid growth.
    let alive = 0;
    for (const n of this.neurons) if (n.life === 'alive') alive++;
    if (alive >= this.baseCount * 1.25) return;

    const fresh: Neuron = {
      x: hx + (Math.random() - 0.5) * 30,
      y: hy + (Math.random() - 0.5) * 30,
      hx,
      hy,
      vx: 0,
      vy: 0,
      radius: 104 + Math.random() * 120,
      wander: 0.65 + Math.random() * 0.7,
      lum: 1 + Math.random() * 0.7,
      tx: hx,
      ty: hy,
      captured: false,
      alpha: 0,
      life: 'alive',
      neighbors: [],
      glow: 0,
      lastFire: -1e9,
      color: Math.floor(Math.random() * 3) as 0 | 1 | 2
    };

    // Reuse a dead slot when possible so the population stays stable.
    let idx = this.neurons.findIndex((n) => n.life === 'dead');
    if (idx >= 0) {
      this.neurons[idx] = fresh;
    } else {
      idx = this.neurons.length;
      this.neurons.push(fresh);
    }

    // Wire it into the local mesh (up to 3 nearby links).
    const maxD2 = this.maxLinkDist * this.maxLinkDist;
    const near: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < this.neurons.length; j++) {
      if (j === idx) continue;
      const b = this.neurons[j];
      if (b.life !== 'alive' || b.captured || b.neighbors.length >= 5) continue;
      const dx = b.x - fresh.x;
      const dy = b.y - fresh.y;
      const d = dx * dx + dy * dy;
      if (d < maxD2) near.push({ j, d });
    }
    near.sort((a, b) => a.d - b.d);
    for (const { j } of near.slice(0, 3)) {
      fresh.neighbors.push(j);
      this.neurons[j].neighbors.push(idx);
    }
  }

  /**
   * While a drawing forms, its points gradually drop the connections they
   * brought from their origin and bond with nearby points of the icon instead.
   */
  private migrateCapturedLinks(): void {
    const bondDist2 = 90 * 90;
    for (const i of this.capturedIdx) {
      const a = this.neurons[i];
      if (!a || !a.captured) continue;

      // Fade out one origin link now and then (never isolating either side).
      if (Math.random() < 0.05 && a.neighbors.length > 1) {
        for (const j of a.neighbors) {
          const b = this.neurons[j];
          if (!b.captured && b.neighbors.length > 1) {
            a.neighbors.splice(a.neighbors.indexOf(j), 1);
            b.neighbors.splice(b.neighbors.indexOf(i), 1);
            break;
          }
        }
      }

      // Bond with the closest fellow point of the drawing.
      if (a.neighbors.length < 5 && Math.random() < 0.08) {
        let best = -1;
        let bestD = Infinity;
        for (const j of this.capturedIdx) {
          if (j === i) continue;
          const b = this.neurons[j];
          if (b.neighbors.length >= 5 || a.neighbors.includes(j)) continue;
          const d = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
          if (d < bestD) { bestD = d; best = j; }
        }
        if (best >= 0 && bestD < bondDist2) {
          a.neighbors.push(best);
          this.neurons[best].neighbors.push(i);
        }
      }
    }
  }

  /** Evenly samples points along the icon strokes, in local centred coordinates. */
  private sampleIcon(icon: number[][][], count: number): Array<{ lx: number; ly: number }> {
    const targets: Array<{ lx: number; ly: number }> = [];
    const cums: number[][] = icon.map((s) => {
      const cum: number[] = [0];
      for (let i = 1; i < s.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]));
      }
      return cum;
    });
    const total = cums.reduce((a, c) => a + c[c.length - 1], 0) || 1;

    icon.forEach((s, si) => {
      const cum = cums[si];
      const len = cum[cum.length - 1];
      if (len <= 0) return;
      const n = Math.max(2, Math.round((len / total) * count));
      for (let k = 0; k < n; k++) {
        const d = ((k + 0.5) / n) * len;
        let i = 1;
        while (i < cum.length - 1 && cum[i] < d) i++;
        const t = (d - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
        const x = s[i - 1][0] + (s[i][0] - s[i - 1][0]) * t;
        const y = s[i - 1][1] + (s[i][1] - s[i - 1][1]) * t;
        targets.push({ lx: x - 0.5, ly: y - 0.5 });
      }
    });
    return targets;
  }

  // ── Icon library: invisible strokes themed on articles & learning ───────
  private static iconCache: number[][][][] | null = null;

  private static circleStroke(cx: number, cy: number, r: number, segments = 22): number[][] {
    const pts: number[][] = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }

  private static arcStroke(cx: number, cy: number, r: number, a0: number, a1: number, segments = 12): number[][] {
    const pts: number[][] = [];
    for (let i = 0; i <= segments; i++) {
      const a = a0 + ((a1 - a0) * i) / segments;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }

  private static getIcons(): number[][][][] {
    if (this.iconCache) return this.iconCache;
    const C = (cx: number, cy: number, r: number, seg?: number) => TblHomeComponent.circleStroke(cx, cy, r, seg);
    const A = (cx: number, cy: number, r: number, a0: number, a1: number) => TblHomeComponent.arcStroke(cx, cy, r, a0, a1);

    // Article / document — outline, folded corner, title, text lines and a bullet
    const doc: number[][][] = [
      [[0.28, 0.06], [0.6, 0.06], [0.76, 0.22], [0.76, 0.94], [0.28, 0.94], [0.28, 0.06]],
      [[0.6, 0.06], [0.6, 0.22], [0.76, 0.22]],
      [[0.36, 0.32], [0.56, 0.32]],
      [[0.36, 0.46], [0.68, 0.46]],
      [[0.36, 0.58], [0.68, 0.58]],
      [[0.36, 0.7], [0.6, 0.7]],
      C(0.4, 0.84, 0.03, 8),
      [[0.47, 0.84], [0.68, 0.84]]
    ];
    // Lightbulb — ideas & learning, with filament and inner glow
    const bulb: number[][][] = [
      C(0.5, 0.36, 0.2),
      [[0.42, 0.62], [0.58, 0.62]],
      [[0.43, 0.71], [0.57, 0.71]],
      [[0.46, 0.8], [0.54, 0.8]],
      [[0.5, 0.04], [0.5, 0.11]],
      [[0.2, 0.16], [0.26, 0.22]],
      [[0.8, 0.16], [0.74, 0.22]],
      [[0.43, 0.62], [0.43, 0.5], [0.5, 0.42], [0.57, 0.5], [0.57, 0.62]],
      C(0.5, 0.33, 0.07, 12)
    ];
    // Graduation cap — the Learn track, with inner board and tassel knob
    const cap: number[][][] = [
      [[0.5, 0.18], [0.92, 0.36], [0.5, 0.54], [0.08, 0.36], [0.5, 0.18]],
      [[0.5, 0.26], [0.74, 0.36], [0.5, 0.46], [0.26, 0.36], [0.5, 0.26]],
      [[0.28, 0.45], [0.28, 0.66]],
      [[0.72, 0.45], [0.72, 0.66]],
      [[0.28, 0.66], [0.5, 0.78], [0.72, 0.66]],
      [[0.92, 0.36], [0.92, 0.6]],
      C(0.92, 0.64, 0.035, 8)
    ];
    // Code brackets — developer content, with code lines around
    const code: number[][][] = [
      [[0.32, 0.28], [0.12, 0.5], [0.32, 0.72]],
      [[0.68, 0.28], [0.88, 0.5], [0.68, 0.72]],
      [[0.56, 0.22], [0.44, 0.78]],
      [[0.36, 0.16], [0.52, 0.16]],
      [[0.48, 0.84], [0.64, 0.84]]
    ];
    // Padlock — security chapters, with double shackle, keyhole and rivets
    const lock: number[][][] = [
      [[0.28, 0.48], [0.72, 0.48], [0.72, 0.92], [0.28, 0.92], [0.28, 0.48]],
      [[0.34, 0.54], [0.66, 0.54]],
      A(0.5, 0.48, 0.15, Math.PI, Math.PI * 2),
      A(0.5, 0.48, 0.09, Math.PI, Math.PI * 2),
      C(0.5, 0.68, 0.05, 12),
      [[0.5, 0.73], [0.5, 0.8]],
      C(0.33, 0.87, 0.02, 6),
      C(0.67, 0.87, 0.02, 6)
    ];
    // Two people working together at a desk with a laptop
    const people: number[][][] = [
      C(0.34, 0.3, 0.09, 14),
      [[0.18, 0.62], [0.22, 0.5], [0.34, 0.44], [0.46, 0.5], [0.5, 0.62]],
      C(0.66, 0.34, 0.09, 14),
      [[0.5, 0.66], [0.54, 0.55], [0.66, 0.5], [0.78, 0.55], [0.82, 0.66]],
      [[0.12, 0.72], [0.88, 0.72]],
      [[0.42, 0.72], [0.46, 0.6], [0.6, 0.6], [0.62, 0.72]]
    ];
    // Magnifier — "explore more", with inner lens, reflection and thick handle
    const search: number[][][] = [
      C(0.42, 0.42, 0.2),
      C(0.42, 0.42, 0.13, 16),
      A(0.42, 0.42, 0.16, Math.PI * 1.1, Math.PI * 1.6),
      [[0.57, 0.57], [0.82, 0.82]],
      [[0.6, 0.54], [0.85, 0.79]]
    ];

    // Shield with a check — API security, with inner shield outline
    const shield: number[][][] = [
      [[0.5, 0.06], [0.86, 0.2], [0.84, 0.55], [0.5, 0.94], [0.16, 0.55], [0.14, 0.2], [0.5, 0.06]],
      [[0.5, 0.16], [0.76, 0.26], [0.75, 0.52], [0.5, 0.82], [0.25, 0.52], [0.24, 0.26], [0.5, 0.16]],
      [[0.36, 0.48], [0.47, 0.6], [0.68, 0.34]]
    ];
    // Key — cryptography & secrets, with inner bow ring
    const key: number[][][] = [
      C(0.3, 0.35, 0.14),
      C(0.3, 0.35, 0.07, 12),
      [[0.4, 0.45], [0.78, 0.83]],
      [[0.66, 0.71], [0.58, 0.79]],
      [[0.74, 0.79], [0.66, 0.87]]
    ];
    // Gear — engineering & configuration, with hub
    const gear: number[][][] = [
      C(0.5, 0.5, 0.16),
      C(0.5, 0.5, 0.06, 10),
      C(0.5, 0.5, 0.3, 20),
      ...Array.from({ length: 8 }, (_, k) => {
        const a = (k / 8) * Math.PI * 2;
        return [
          [0.5 + Math.cos(a) * 0.3, 0.5 + Math.sin(a) * 0.3],
          [0.5 + Math.cos(a) * 0.42, 0.5 + Math.sin(a) * 0.42]
        ];
      })
    ];
    // Open book — the Learn track, with text lines on both pages
    const book: number[][][] = [
      [[0.5, 0.25], [0.5, 0.85]],
      [[0.5, 0.25], [0.18, 0.16], [0.18, 0.76], [0.5, 0.85]],
      [[0.5, 0.25], [0.82, 0.16], [0.82, 0.76], [0.5, 0.85]],
      [[0.26, 0.3], [0.44, 0.37]],
      [[0.26, 0.42], [0.44, 0.49]],
      [[0.56, 0.37], [0.74, 0.3]],
      [[0.56, 0.49], [0.74, 0.42]]
    ];
    // Cloud — cloud & infrastructure, with download arrow
    const cloud: number[][][] = [
      A(0.34, 0.58, 0.13, Math.PI * 0.55, Math.PI * 1.45),
      A(0.5, 0.46, 0.17, Math.PI * 0.85, Math.PI * 2.1),
      A(0.68, 0.58, 0.13, Math.PI * 1.55, Math.PI * 2.45),
      [[0.34, 0.71], [0.68, 0.71]],
      [[0.5, 0.76], [0.5, 0.92]],
      [[0.44, 0.86], [0.5, 0.92], [0.56, 0.86]]
    ];
    // Database cylinder — data & storage, with status dots
    const db: number[][][] = [
      A(0.5, 0.25, 0.3, Math.PI, Math.PI * 2),
      [[0.2, 0.25], [0.8, 0.25]],
      [[0.2, 0.25], [0.2, 0.75]],
      [[0.8, 0.25], [0.8, 0.75]],
      A(0.5, 0.45, 0.3, 0, Math.PI),
      A(0.5, 0.75, 0.3, 0, Math.PI),
      C(0.3, 0.38, 0.02, 6),
      C(0.3, 0.6, 0.02, 6)
    ];
    // Terminal — command line, with title bar and window dots
    const term: number[][][] = [
      [[0.12, 0.2], [0.88, 0.2], [0.88, 0.8], [0.12, 0.8], [0.12, 0.2]],
      [[0.12, 0.32], [0.88, 0.32]],
      C(0.18, 0.26, 0.015, 6),
      C(0.24, 0.26, 0.015, 6),
      C(0.3, 0.26, 0.015, 6),
      [[0.22, 0.46], [0.32, 0.56], [0.22, 0.66]],
      [[0.4, 0.66], [0.58, 0.66]]
    ];
    // Bar chart — observability & metrics, with trend line and arrow
    const chart: number[][][] = [
      [[0.15, 0.15], [0.15, 0.85], [0.88, 0.85]],
      [[0.3, 0.85], [0.3, 0.6]],
      [[0.47, 0.85], [0.47, 0.45]],
      [[0.64, 0.85], [0.64, 0.68]],
      [[0.8, 0.85], [0.8, 0.3]],
      [[0.22, 0.55], [0.4, 0.4], [0.58, 0.5], [0.78, 0.24]],
      [[0.7, 0.24], [0.78, 0.24], [0.78, 0.32]]
    ];
    // Linked nodes — networking & integrations, with central hub
    const network: number[][][] = [
      [[0.5, 0.2], [0.2, 0.7]],
      [[0.5, 0.2], [0.8, 0.7]],
      [[0.2, 0.7], [0.8, 0.7]],
      [[0.5, 0.2], [0.5, 0.5]],
      [[0.2, 0.7], [0.5, 0.5]],
      [[0.8, 0.7], [0.5, 0.5]],
      C(0.5, 0.2, 0.07, 12),
      C(0.2, 0.7, 0.07, 12),
      C(0.8, 0.7, 0.07, 12),
      C(0.5, 0.5, 0.05, 10)
    ];
    // Rocket — launches & getting started, with porthole detail and inner flame
    const rocket: number[][][] = [
      [[0.5, 0.08], [0.62, 0.3], [0.62, 0.62], [0.38, 0.62], [0.38, 0.3], [0.5, 0.08]],
      [[0.38, 0.5], [0.26, 0.7], [0.38, 0.66]],
      [[0.62, 0.5], [0.74, 0.7], [0.62, 0.66]],
      C(0.5, 0.36, 0.06, 12),
      C(0.5, 0.36, 0.03, 8),
      [[0.38, 0.56], [0.62, 0.56]],
      [[0.46, 0.66], [0.5, 0.8], [0.54, 0.66]],
      [[0.48, 0.66], [0.5, 0.73], [0.52, 0.66]]
    ];
    // Chat bubbles — community & conversation, with a reply bubble
    const chat: number[][][] = [
      [[0.15, 0.25], [0.85, 0.25], [0.85, 0.62], [0.45, 0.62], [0.3, 0.78], [0.32, 0.62], [0.15, 0.62], [0.15, 0.25]],
      C(0.35, 0.44, 0.03, 8),
      C(0.5, 0.44, 0.03, 8),
      C(0.65, 0.44, 0.03, 8),
      [[0.62, 0.7], [0.88, 0.7], [0.88, 0.88], [0.74, 0.88], [0.66, 0.95], [0.68, 0.88], [0.62, 0.88], [0.62, 0.7]]
    ];
    // Globe — the web & multilingual content, with meridians and latitudes
    const globe: number[][][] = [
      C(0.5, 0.5, 0.3),
      [[0.2, 0.5], [0.8, 0.5]],
      [[0.5, 0.2], [0.5, 0.8]],
      [[0.35, 0.24], [0.28, 0.5], [0.35, 0.76]],
      [[0.65, 0.24], [0.72, 0.5], [0.65, 0.76]],
      [[0.26, 0.35], [0.5, 0.3], [0.74, 0.35]],
      [[0.26, 0.65], [0.5, 0.7], [0.74, 0.65]]
    ];

    // Envelope — messaging, with flap, fold lines and stamp
    const mail: number[][][] = [
      [[0.12, 0.25], [0.88, 0.25], [0.88, 0.75], [0.12, 0.75], [0.12, 0.25]],
      [[0.12, 0.25], [0.5, 0.55], [0.88, 0.25]],
      [[0.12, 0.75], [0.38, 0.5]],
      [[0.88, 0.75], [0.62, 0.5]],
      [[0.72, 0.32], [0.8, 0.32], [0.8, 0.4], [0.72, 0.4], [0.72, 0.32]]
    ];
    // Wi-Fi — connectivity, three arcs and the source dot
    const wifi: number[][][] = [
      A(0.5, 0.72, 0.42, Math.PI * 1.25, Math.PI * 1.75),
      A(0.5, 0.72, 0.3, Math.PI * 1.25, Math.PI * 1.75),
      A(0.5, 0.72, 0.18, Math.PI * 1.25, Math.PI * 1.75),
      C(0.5, 0.72, 0.035, 8)
    ];
    // Chain links — integrations, interlocked rings with inner edges
    const link: number[][][] = [
      C(0.38, 0.5, 0.16),
      C(0.62, 0.5, 0.16),
      C(0.38, 0.5, 0.09, 12),
      C(0.62, 0.5, 0.09, 12),
      [[0.46, 0.5], [0.54, 0.5]]
    ];
    // Fingerprint — identity, concentric ridge arcs with core
    const finger: number[][][] = [
      A(0.5, 0.5, 0.3, Math.PI * 1.1, Math.PI * 2.4),
      A(0.5, 0.5, 0.22, Math.PI * 0.9, Math.PI * 2.2),
      A(0.5, 0.5, 0.14, Math.PI * 1.2, Math.PI * 2.6),
      A(0.5, 0.55, 0.07, Math.PI * 0.8, Math.PI * 2.0),
      C(0.5, 0.55, 0.02, 6)
    ];
    // Bug — debugging, body, head, six legs, antennae and spine
    const bug: number[][][] = [
      C(0.5, 0.55, 0.18),
      C(0.5, 0.32, 0.08, 12),
      [[0.5, 0.37], [0.5, 0.73]],
      [[0.32, 0.45], [0.18, 0.38]],
      [[0.32, 0.58], [0.16, 0.58]],
      [[0.32, 0.68], [0.2, 0.78]],
      [[0.68, 0.45], [0.82, 0.38]],
      [[0.68, 0.58], [0.84, 0.58]],
      [[0.68, 0.68], [0.8, 0.78]],
      [[0.45, 0.26], [0.4, 0.16]],
      [[0.55, 0.26], [0.6, 0.16]]
    ];
    // Folder — files, with tab, divider and label line
    const folder: number[][][] = [
      [[0.12, 0.3], [0.38, 0.3], [0.44, 0.38], [0.88, 0.38], [0.88, 0.78], [0.12, 0.78], [0.12, 0.3]],
      [[0.12, 0.46], [0.88, 0.46]],
      [[0.2, 0.6], [0.5, 0.6]]
    ];
    // Clock — schedules, with hands, hub and tick marks
    const clock: number[][][] = [
      C(0.5, 0.5, 0.3),
      [[0.5, 0.5], [0.5, 0.3]],
      [[0.5, 0.5], [0.64, 0.58]],
      C(0.5, 0.5, 0.03, 8),
      [[0.5, 0.22], [0.5, 0.26]],
      [[0.5, 0.74], [0.5, 0.78]],
      [[0.22, 0.5], [0.26, 0.5]],
      [[0.74, 0.5], [0.78, 0.5]]
    ];
    // Target — goals, three rings and crosshairs
    const target: number[][][] = [
      C(0.5, 0.5, 0.3),
      C(0.5, 0.5, 0.19, 16),
      C(0.5, 0.5, 0.08, 10),
      [[0.5, 0.12], [0.5, 0.24]],
      [[0.5, 0.76], [0.5, 0.88]],
      [[0.12, 0.5], [0.24, 0.5]],
      [[0.76, 0.5], [0.88, 0.5]]
    ];
    // Puzzle piece — problem solving, outline with four knobs
    const puzzle: number[][][] = [
      [[0.2, 0.25], [0.4, 0.25]],
      A(0.47, 0.25, 0.07, Math.PI, Math.PI * 2),
      [[0.54, 0.25], [0.78, 0.25], [0.78, 0.45]],
      A(0.78, 0.52, 0.07, Math.PI * 1.5, Math.PI * 2.5),
      [[0.78, 0.59], [0.78, 0.78], [0.55, 0.78]],
      A(0.48, 0.78, 0.07, 0, Math.PI),
      [[0.41, 0.78], [0.2, 0.78], [0.2, 0.55]],
      A(0.2, 0.48, 0.07, Math.PI * 0.5, Math.PI * 1.5),
      [[0.2, 0.41], [0.2, 0.25]]
    ];
    // Trophy — achievement, cup with handles, stem, base and medal dot
    const trophy: number[][][] = [
      [[0.32, 0.18], [0.68, 0.18], [0.66, 0.42], [0.5, 0.55], [0.34, 0.42], [0.32, 0.18]],
      A(0.28, 0.26, 0.09, Math.PI * 0.5, Math.PI * 1.5),
      A(0.72, 0.26, 0.09, Math.PI * 1.5, Math.PI * 2.5),
      [[0.5, 0.55], [0.5, 0.68]],
      [[0.38, 0.68], [0.62, 0.68]],
      [[0.34, 0.78], [0.66, 0.78]],
      C(0.5, 0.32, 0.05, 10)
    ];
    // Star — favorites, five points with inner ring
    const star: number[][][] = [
      [[0.5, 0.18], [0.576, 0.395], [0.804, 0.401], [0.624, 0.54], [0.688, 0.759],
       [0.5, 0.63], [0.312, 0.759], [0.376, 0.54], [0.196, 0.401], [0.424, 0.395], [0.5, 0.18]],
      C(0.5, 0.5, 0.06, 10)
    ];
    // Pencil — writing, body, tip, eraser and edge lines
    const pencil: number[][][] = [
      [[0.25, 0.75], [0.62, 0.38], [0.72, 0.48], [0.35, 0.85], [0.25, 0.75]],
      [[0.25, 0.75], [0.2, 0.9], [0.35, 0.85]],
      [[0.62, 0.38], [0.7, 0.3], [0.8, 0.4], [0.72, 0.48]],
      [[0.66, 0.34], [0.76, 0.44]],
      [[0.27, 0.83], [0.24, 0.86]]
    ];
    // Server rack — infrastructure, three units with LEDs and vents
    const server: number[][][] = [
      [[0.2, 0.18], [0.8, 0.18], [0.8, 0.38], [0.2, 0.38], [0.2, 0.18]],
      [[0.2, 0.42], [0.8, 0.42], [0.8, 0.62], [0.2, 0.62], [0.2, 0.42]],
      [[0.2, 0.66], [0.8, 0.66], [0.8, 0.86], [0.2, 0.86], [0.2, 0.66]],
      C(0.28, 0.28, 0.02, 6),
      [[0.55, 0.28], [0.72, 0.28]],
      C(0.28, 0.52, 0.02, 6),
      [[0.55, 0.52], [0.72, 0.52]],
      C(0.28, 0.76, 0.02, 6),
      [[0.55, 0.76], [0.72, 0.76]]
    ];
    // Browser window — the web, with toolbar, buttons, URL bar and content
    const browser: number[][][] = [
      [[0.12, 0.18], [0.88, 0.18], [0.88, 0.82], [0.12, 0.82], [0.12, 0.18]],
      [[0.12, 0.32], [0.88, 0.32]],
      C(0.18, 0.25, 0.015, 6),
      C(0.24, 0.25, 0.015, 6),
      C(0.3, 0.25, 0.015, 6),
      [[0.38, 0.25], [0.82, 0.25]],
      [[0.2, 0.45], [0.55, 0.45]],
      [[0.2, 0.57], [0.8, 0.57]],
      [[0.2, 0.69], [0.68, 0.69]]
    ];
    // Mobile phone — apps, with screen edges, speaker, button and content
    const phone: number[][][] = [
      [[0.34, 0.1], [0.66, 0.1], [0.66, 0.9], [0.34, 0.9], [0.34, 0.1]],
      [[0.34, 0.2], [0.66, 0.2]],
      [[0.34, 0.78], [0.66, 0.78]],
      [[0.44, 0.15], [0.56, 0.15]],
      C(0.5, 0.84, 0.03, 8),
      [[0.4, 0.32], [0.6, 0.32]],
      [[0.4, 0.44], [0.6, 0.44]]
    ];
    // Certificate — completion, with text lines, seal and ribbon
    const cert: number[][][] = [
      [[0.14, 0.22], [0.86, 0.22], [0.86, 0.7], [0.14, 0.7], [0.14, 0.22]],
      [[0.24, 0.34], [0.76, 0.34]],
      [[0.24, 0.44], [0.62, 0.44]],
      [[0.24, 0.54], [0.55, 0.54]],
      C(0.72, 0.6, 0.06, 10),
      [[0.69, 0.65], [0.66, 0.82], [0.72, 0.76], [0.78, 0.82], [0.75, 0.65]]
    ];

    // Laptop — screen with content, hinged base and trackpad
    const laptop: number[][][] = [
      [[0.22, 0.2], [0.78, 0.2], [0.78, 0.62], [0.22, 0.62], [0.22, 0.2]],
      [[0.26, 0.26], [0.74, 0.26], [0.74, 0.56], [0.26, 0.56], [0.26, 0.26]],
      [[0.3, 0.34], [0.6, 0.34]],
      [[0.3, 0.42], [0.68, 0.42]],
      [[0.22, 0.62], [0.14, 0.72]],
      [[0.78, 0.62], [0.86, 0.72]],
      [[0.14, 0.72], [0.86, 0.72]],
      [[0.42, 0.67], [0.58, 0.67]]
    ];
    // Camera — body, double lens, flash and status LED
    const camera: number[][][] = [
      [[0.14, 0.32], [0.36, 0.32], [0.42, 0.24], [0.58, 0.24], [0.64, 0.32], [0.86, 0.32],
       [0.86, 0.78], [0.14, 0.78], [0.14, 0.32]],
      C(0.5, 0.55, 0.15),
      C(0.5, 0.55, 0.08, 12),
      [[0.72, 0.4], [0.8, 0.4]],
      C(0.24, 0.42, 0.02, 6)
    ];
    // Music — double beam with two note heads
    const music: number[][][] = [
      [[0.34, 0.72], [0.34, 0.3], [0.72, 0.22], [0.72, 0.64]],
      [[0.34, 0.38], [0.72, 0.3]],
      C(0.29, 0.74, 0.06, 12),
      C(0.67, 0.66, 0.06, 12)
    ];
    // Heart — outline with inner highlight
    const heart: number[][][] = [
      A(0.36, 0.36, 0.16, Math.PI * 0.75, Math.PI * 1.95),
      A(0.64, 0.36, 0.16, Math.PI * 1.05, Math.PI * 2.25),
      [[0.21, 0.44], [0.5, 0.85], [0.79, 0.44]],
      A(0.42, 0.4, 0.06, Math.PI * 0.9, Math.PI * 1.9)
    ];
    // Map pin — location, with double ring and ground shadow
    const pin: number[][][] = [
      A(0.5, 0.4, 0.22, Math.PI * 0.85, Math.PI * 2.15),
      [[0.316, 0.53], [0.5, 0.88], [0.684, 0.53]],
      C(0.5, 0.4, 0.1, 14),
      C(0.5, 0.4, 0.04, 8),
      A(0.5, 0.92, 0.13, 0, Math.PI)
    ];
    // Calendar — frame, rings, grid and a marked day
    const calendar: number[][][] = [
      [[0.14, 0.24], [0.86, 0.24], [0.86, 0.84], [0.14, 0.84], [0.14, 0.24]],
      [[0.14, 0.38], [0.86, 0.38]],
      [[0.3, 0.16], [0.3, 0.3]],
      [[0.7, 0.16], [0.7, 0.3]],
      [[0.26, 0.52], [0.74, 0.52]],
      [[0.26, 0.66], [0.74, 0.66]],
      [[0.38, 0.44], [0.38, 0.78]],
      [[0.62, 0.44], [0.62, 0.78]],
      C(0.5, 0.59, 0.035, 8)
    ];
    // Trend line — axes, data points and ticks
    const trend: number[][][] = [
      [[0.14, 0.14], [0.14, 0.86], [0.88, 0.86]],
      [[0.2, 0.7], [0.38, 0.52], [0.56, 0.62], [0.8, 0.3]],
      C(0.2, 0.7, 0.025, 6),
      C(0.38, 0.52, 0.025, 6),
      C(0.56, 0.62, 0.025, 6),
      C(0.8, 0.3, 0.025, 6),
      [[0.14, 0.3], [0.18, 0.3]],
      [[0.14, 0.5], [0.18, 0.5]],
      [[0.14, 0.7], [0.18, 0.7]]
    ];
    // Flask — science, with liquid line and rising bubbles
    const flask: number[][][] = [
      [[0.44, 0.14], [0.56, 0.14]],
      [[0.46, 0.14], [0.46, 0.4], [0.28, 0.78], [0.3, 0.84], [0.7, 0.84], [0.72, 0.78], [0.54, 0.4], [0.54, 0.14]],
      [[0.36, 0.62], [0.64, 0.62]],
      C(0.45, 0.72, 0.025, 6),
      C(0.55, 0.68, 0.02, 6),
      C(0.5, 0.77, 0.02, 6)
    ];
    // Brain — two lobes with folds
    const brain: number[][][] = [
      A(0.38, 0.4, 0.16, Math.PI * 0.5, Math.PI * 1.6),
      A(0.62, 0.4, 0.16, Math.PI * 1.4, Math.PI * 2.5),
      A(0.35, 0.62, 0.12, Math.PI * 0.6, Math.PI * 1.7),
      A(0.65, 0.62, 0.12, Math.PI * 1.3, Math.PI * 2.4),
      [[0.5, 0.26], [0.5, 0.74]],
      A(0.42, 0.5, 0.05, 0, Math.PI * 1.5),
      A(0.58, 0.5, 0.05, Math.PI * 1.5, Math.PI * 3)
    ];
    // Eye — lids, iris, pupil and lashes
    const eye: number[][][] = [
      A(0.5, 0.75, 0.42, Math.PI * 1.22, Math.PI * 1.78),
      A(0.5, 0.25, 0.42, Math.PI * 0.22, Math.PI * 0.78),
      C(0.5, 0.5, 0.13),
      C(0.5, 0.5, 0.06, 10),
      [[0.3, 0.28], [0.26, 0.22]],
      [[0.5, 0.24], [0.5, 0.17]],
      [[0.7, 0.28], [0.74, 0.22]]
    ];
    // Sun — double disc with eight rays
    const sun: number[][][] = [
      C(0.5, 0.5, 0.18),
      C(0.5, 0.5, 0.11, 14),
      [[0.5, 0.12], [0.5, 0.24]],
      [[0.5, 0.76], [0.5, 0.88]],
      [[0.12, 0.5], [0.24, 0.5]],
      [[0.76, 0.5], [0.88, 0.5]],
      [[0.23, 0.23], [0.32, 0.32]],
      [[0.68, 0.32], [0.77, 0.23]],
      [[0.23, 0.77], [0.32, 0.68]],
      [[0.68, 0.68], [0.77, 0.77]]
    ];
    // Umbrella — scalloped canopy, pole, hook and tip
    const umbrella: number[][][] = [
      A(0.5, 0.5, 0.34, Math.PI, Math.PI * 2),
      A(0.27, 0.5, 0.11, 0, Math.PI),
      A(0.5, 0.5, 0.11, 0, Math.PI),
      A(0.73, 0.5, 0.11, 0, Math.PI),
      [[0.5, 0.12], [0.5, 0.16]],
      [[0.5, 0.16], [0.5, 0.78]],
      A(0.56, 0.78, 0.06, 0, Math.PI)
    ];
    // House — roof, walls, door with knob, cross window and chimney
    const house: number[][][] = [
      [[0.5, 0.12], [0.88, 0.42]],
      [[0.5, 0.12], [0.12, 0.42]],
      [[0.2, 0.42], [0.2, 0.84], [0.8, 0.84], [0.8, 0.42]],
      [[0.44, 0.84], [0.44, 0.6], [0.56, 0.6], [0.56, 0.84]],
      C(0.53, 0.73, 0.012, 6),
      [[0.26, 0.5], [0.38, 0.5], [0.38, 0.62], [0.26, 0.62], [0.26, 0.5]],
      [[0.32, 0.5], [0.32, 0.62]],
      [[0.26, 0.56], [0.38, 0.56]],
      [[0.66, 0.16], [0.66, 0.3], [0.74, 0.3], [0.74, 0.24]]
    ];
    // Coffee — cup with handle, saucer, coffee line and steam
    const coffee: number[][][] = [
      [[0.2, 0.4], [0.68, 0.4], [0.66, 0.78], [0.22, 0.78], [0.2, 0.4]],
      A(0.68, 0.52, 0.1, Math.PI * 1.5, Math.PI * 2.5),
      [[0.14, 0.86], [0.74, 0.86]],
      [[0.24, 0.5], [0.64, 0.5]],
      [[0.3, 0.16], [0.28, 0.24], [0.32, 0.3]],
      [[0.44, 0.12], [0.42, 0.2], [0.46, 0.28]],
      [[0.58, 0.16], [0.56, 0.24], [0.6, 0.3]]
    ];
    // Scissors — crossed blades, pivot and finger rings
    const scissors: number[][][] = [
      [[0.3, 0.3], [0.72, 0.68]],
      [[0.3, 0.7], [0.72, 0.32]],
      C(0.26, 0.26, 0.06, 10),
      C(0.26, 0.74, 0.06, 10),
      C(0.51, 0.5, 0.02, 6),
      [[0.72, 0.68], [0.82, 0.74]],
      [[0.72, 0.32], [0.82, 0.26]]
    ];
    // Bell — notifications, with clapper and sound waves
    const bell: number[][][] = [
      A(0.5, 0.42, 0.22, Math.PI, Math.PI * 2),
      [[0.28, 0.42], [0.26, 0.66], [0.2, 0.72], [0.8, 0.72], [0.74, 0.66], [0.72, 0.42]],
      [[0.46, 0.14], [0.54, 0.14]],
      [[0.5, 0.14], [0.5, 0.2]],
      C(0.5, 0.78, 0.04, 8),
      A(0.5, 0.5, 0.38, Math.PI * 1.8, Math.PI * 2.05),
      A(0.5, 0.5, 0.38, Math.PI * 0.95, Math.PI * 1.2)
    ];
    // Battery — body, terminal and charge bars
    const battery: number[][][] = [
      [[0.14, 0.34], [0.78, 0.34], [0.78, 0.66], [0.14, 0.66], [0.14, 0.34]],
      [[0.78, 0.42], [0.86, 0.42], [0.86, 0.58], [0.78, 0.58]],
      [[0.22, 0.42], [0.22, 0.58]],
      [[0.3, 0.42], [0.3, 0.58]],
      [[0.38, 0.42], [0.38, 0.58]],
      [[0.46, 0.42], [0.46, 0.58]]
    ];
    // Flag — pole with finial, waving cloth and stripe
    const flag: number[][][] = [
      [[0.24, 0.12], [0.24, 0.88]],
      C(0.24, 0.1, 0.02, 6),
      [[0.24, 0.18], [0.5, 0.24], [0.78, 0.16], [0.78, 0.5], [0.5, 0.58], [0.24, 0.52]],
      [[0.24, 0.35], [0.5, 0.41], [0.78, 0.33]]
    ];
    // Compass — double ring, needle, hub and north tick
    const compass: number[][][] = [
      C(0.5, 0.5, 0.32),
      C(0.5, 0.5, 0.26, 18),
      [[0.36, 0.64], [0.55, 0.45], [0.64, 0.36], [0.45, 0.55], [0.36, 0.64]],
      C(0.5, 0.5, 0.03, 8),
      [[0.5, 0.16], [0.5, 0.21]]
    ];
    // Gift — box with band, lid, ribbon and bow
    const gift: number[][][] = [
      [[0.16, 0.4], [0.84, 0.4], [0.84, 0.52], [0.16, 0.52], [0.16, 0.4]],
      [[0.2, 0.52], [0.2, 0.86], [0.8, 0.86], [0.8, 0.52]],
      [[0.5, 0.4], [0.5, 0.86]],
      [[0.2, 0.66], [0.8, 0.66]],
      A(0.42, 0.33, 0.08, Math.PI * 0.5, Math.PI * 1.7),
      A(0.58, 0.33, 0.08, Math.PI * 1.3, Math.PI * 2.5)
    ];

    this.iconCache = [
      doc, bulb, cap, code, lock, people, search,
      shield, key, gear, book, cloud, db, term, chart, network, rocket, chat, globe,
      mail, wifi, link, finger, bug, folder, clock, target, puzzle, trophy, star,
      pencil, server, browser, phone, cert,
      laptop, camera, music, heart, pin, calendar, trend, flask, brain, eye, sun,
      umbrella, house, coffee, scissors, bell, battery, flag, compass, gift
    ];
    return this.iconCache;
  }

  // ── Connection dynamics: links dissolve over time and new ones appear ───
  private rewire(dt: number): void {
    this.rewireAcc += dt;
    if (this.rewireAcc < this.REWIRE_INTERVAL) return;
    this.rewireAcc = 0;
    const N = this.neurons.length;
    if (!N) return;

    // Dissolve one existing connection (never leaving a point isolated).
    for (let attempt = 0; attempt < 6; attempt++) {
      const i = Math.floor(Math.random() * N);
      const a = this.neurons[i];
      if (a.neighbors.length < 2) continue;
      const j = a.neighbors[Math.floor(Math.random() * a.neighbors.length)];
      const b = this.neurons[j];
      if (b.neighbors.length < 2) continue;
      a.neighbors.splice(a.neighbors.indexOf(j), 1);
      b.neighbors.splice(b.neighbors.indexOf(i), 1);
      break;
    }

    // Prune overstretched links left behind when a drawing dissolves.
    const stretch2 = this.maxLinkDist * this.maxLinkDist * 2.56;
    for (let attempt = 0; attempt < 12; attempt++) {
      const i = Math.floor(Math.random() * N);
      const a = this.neurons[i];
      if (a.neighbors.length < 2) continue;
      for (const j of a.neighbors) {
        const b = this.neurons[j];
        if (b.neighbors.length < 2) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy > stretch2) {
          a.neighbors.splice(a.neighbors.indexOf(j), 1);
          b.neighbors.splice(b.neighbors.indexOf(i), 1);
          break;
        }
      }
    }

    // Grow one new connection between nearby points.
    const maxD2 = this.maxLinkDist * this.maxLinkDist;
    for (let attempt = 0; attempt < 10; attempt++) {
      const i = Math.floor(Math.random() * N);
      const j = Math.floor(Math.random() * N);
      if (i === j) continue;
      const a = this.neurons[i];
      const b = this.neurons[j];
      if (a.life !== 'alive' || b.life !== 'alive') continue;
      if (a.neighbors.length >= 5 || b.neighbors.length >= 5) continue;
      if (a.neighbors.includes(j)) continue;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      if (dx * dx + dy * dy > maxD2) continue;
      a.neighbors.push(j);
      b.neighbors.push(i);
      break;
    }

    // Density regulator: after a drawing dissolves, the field carries surplus
    // points (returned originals + their replacements). Retire up to two free
    // points per tick until the base density is restored — a full icon's
    // surplus clears in roughly 20 seconds.
    let alive = 0;
    for (const n of this.neurons) if (n.life === 'alive') alive++;
    let culls = Math.min(2, alive - this.baseCount);
    for (let attempt = 0; attempt < 24 && culls > 0; attempt++) {
      const i = Math.floor(Math.random() * N);
      const n = this.neurons[i];
      if (n.life !== 'alive' || n.captured) continue;
      n.life = 'dying';
      culls--;
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

    // Drift the neurons within their leash and manage icon formations.
    if (!this.reducedMotion) this.updateNeurons(dt, now);

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
      if (a.life === 'dead') continue;
      for (const j of a.neighbors) {
        if (j <= i) continue;
        const b = this.neurons[j];
        if (!inBand(a.y) && !inBand(b.y)) continue;
        const activity = Math.max(a.glow, b.glow);
        const alpha = (0.0381 + activity * 0.2704) * Math.min(a.alpha, b.alpha);
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
      if (n.life === 'dead') continue;
      if (!this.reducedMotion) n.glow *= Math.pow(0.9, dt / 16);
      if (!inBand(n.y)) continue;
      const [r, g, b] = TblHomeComponent.COLORS[n.color];

      if (n.glow > 0.02) {
        const halo = 4 + n.glow * 9;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, halo);
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(n.glow * 0.4225 * n.lum * n.alpha, 1).toFixed(3)})`);
        grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, halo, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min((0.26 + n.glow * 0.507) * n.lum * n.alpha, 1).toFixed(3)})`;
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
        // Each arriving pulse stacks glow on the node, so simultaneous arrivals
        // light it up proportionally to how many came in.
        const target = this.neurons[p.to];
        if (target && target.life !== 'dead') {
          target.glow = Math.min(target.glow + 0.65, 2.2);
        }
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
