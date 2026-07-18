import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ReadingProgressService } from './reading-progress/reading-progress.service';
import { LEARN_PATHS, chapterIdForRoute } from './reading-progress/learn-catalog';

interface LearnArticle {
  chapterLabel: string;
  title: string;
  description: string;
  route: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}

type SeriesKey = 'english' | 'spanish' | 'portuguese';

const SERIES_STATE_KEY = 'utily.learn.series-open';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearnComponent implements OnInit {
  @ViewChild('portugueseTrack') private portugueseTrack?: ElementRef<HTMLElement>;
  @ViewChild('englishTrack') private englishTrack?: ElementRef<HTMLElement>;
  @ViewChild('spanishTrack') private spanishTrack?: ElementRef<HTMLElement>;
  @ViewChild('importInput') private importInput?: ElementRef<HTMLInputElement>;

  readonly corporateApiPathContentId = 'corporate-api-path-content';
  isCorporateApiPathOpen = false;

  /** Each language carousel starts collapsed; state is persisted in localStorage. */
  seriesOpen: Record<SeriesKey, boolean> = this.loadSeriesState();

  importFeedback: { type: 'success' | 'error'; message: string } | null = null;

  readonly portugueseArticles: LearnArticle[] = [
    {
      chapterLabel: 'Capítulo 1',
      title: 'Fundamentos da Internet, Redes e APIs',
      description: 'Da comunicação em rede ao processamento completo de uma requisição em um API Gateway.',
      route: '/learn/pt/fundamentos-da-internet-redes-e-apis',
      readingTime: '45 min de leitura',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'Fluxo de uma chamada de API atravessando camadas de rede e um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 2',
      title: 'TCP, UDP, Portas e Sockets',
      description: 'Da criação de conexões ao diagnóstico de timeouts, pooling, SNAT e esgotamento de portas em API Gateways.',
      route: '/learn/pt/tcp-udp-portas-e-sockets',
      readingTime: '50 min de leitura',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'Fluxos TCP e datagramas UDP atravessando um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 3',
      title: 'Endereçamento IP: IPv4, IPv6, Sub-redes e Roteamento',
      description: 'De prefixos CIDR e sub-redes ao diagnóstico de rotas, NAT, MTU e conectividade em API Gateways.',
      route: '/learn/pt/enderecamento-ip-ipv4-ipv6-sub-redes-e-roteamento',
      readingTime: '55 min de leitura',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'Endereçamento IP, redes IPv4 e IPv6, sub-redes e seleção de rotas'
    },
    {
      chapterLabel: 'Capítulo 4',
      title: 'DNS, NAT, Proxies e Balanceadores de Carga',
      description: 'Da resolução DNS e tradução de endereços à terminação TLS, health checks e seleção de backends.',
      route: '/learn/pt/dns-nat-proxies-e-balanceadores-de-carga',
      readingTime: '65 min de leitura',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies e balanceadores conduzindo uma chamada até pools de backends'
    },
    {
      chapterLabel: 'Capítulo 5',
      title: 'HTTP/1.1, HTTP/2 e HTTP/3',
      description: 'Da semântica e do framing à multiplexação, HPACK, QUIC, QPACK e tradução de protocolo em API Gateways.',
      route: '/learn/pt/http-1-1-http-2-e-http-3',
      readingTime: '80 min de leitura',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolução de mensagens HTTP para streams multiplexados e QUIC através de um API Gateway'
    },
    {
      chapterLabel: 'Capítulo 6',
      title: 'HTTPS e TLS em profundidade',
      description: 'De criptografia e handshakes TLS 1.2/1.3 a certificados X.509, mTLS, HSTS e troubleshooting em API Gateways.',
      route: '/learn/pt/https-e-tls-em-profundidade',
      readingTime: '70 min de leitura',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'Conexão HTTPS protegida por TLS, cadeia de certificados e API Gateway'
    },
    {
      chapterLabel: 'Capítulo 7',
      title: 'Criptografia: simétrica, assimétrica, hashes e assinaturas digitais',
      description: 'De AES, hashes, HMAC e assinaturas digitais à gestão de chaves, KMS, HSM, criptografia pós-quântica e troubleshooting.',
      route: '/learn/pt/criptografia-fundamentos-e-aplicacoes-em-apis',
      readingTime: '65 min de leitura',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Núcleo criptográfico protegendo chaves, assinaturas, hashes e chamadas de APIs'
    }
  ];
  readonly englishArticles: LearnArticle[] = [
    {
      chapterLabel: 'Chapter 1',
      title: 'Internet, Networking, and API Fundamentals',
      description: 'From network communication to the complete processing of a request in an API Gateway.',
      route: '/learn/en/internet-networking-api-fundamentals',
      readingTime: '45 min read',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'An API call crossing network layers and an API Gateway'
    },
    {
      chapterLabel: 'Chapter 2',
      title: 'TCP, UDP, Ports, and Sockets',
      description: 'From connection establishment to diagnosing timeouts, pooling, SNAT, and port exhaustion in API Gateways.',
      route: '/learn/en/tcp-udp-ports-and-sockets',
      readingTime: '50 min read',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'TCP streams and UDP datagrams crossing an API Gateway'
    },
    {
      chapterLabel: 'Chapter 3',
      title: 'IP Addressing: IPv4, IPv6, Subnetting, and Routing',
      description: 'From CIDR prefixes and subnetting to diagnosing routes, NAT, MTU, and connectivity in API Gateways.',
      route: '/learn/en/ip-addressing-ipv4-ipv6-subnetting-and-routing',
      readingTime: '55 min read',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'IP addressing, IPv4 and IPv6 networks, subnetting, and route selection'
    },
    {
      chapterLabel: 'Chapter 4',
      title: 'DNS, NAT, Proxies, and Load Balancers',
      description: 'From DNS resolution and address translation to TLS termination, health checks, and backend selection.',
      route: '/learn/en/dns-nat-proxies-and-load-balancers',
      readingTime: '65 min read',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies, and load balancers guiding a request toward backend pools'
    },
    {
      chapterLabel: 'Chapter 5',
      title: 'HTTP/1.1, HTTP/2, and HTTP/3',
      description: 'From semantics and framing to multiplexing, HPACK, QUIC, QPACK, and protocol translation in API Gateways.',
      route: '/learn/en/http-1-1-http-2-and-http-3',
      readingTime: '80 min read',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolution from HTTP messages to multiplexed streams and QUIC through an API Gateway'
    },
    {
      chapterLabel: 'Chapter 6',
      title: 'HTTPS and TLS in Depth',
      description: 'From cryptography and TLS 1.2/1.3 handshakes to X.509 certificates, mTLS, HSTS, and API Gateway troubleshooting.',
      route: '/learn/en/https-and-tls-in-depth',
      readingTime: '70 min read',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'HTTPS connection protected by TLS, a certificate chain, and an API Gateway'
    },
    {
      chapterLabel: 'Chapter 7',
      title: 'Cryptography: Symmetric, Asymmetric, Hashes, and Digital Signatures',
      description: 'From AES, hashes, HMAC, and digital signatures to key management, KMS, HSM, post-quantum cryptography, and troubleshooting.',
      route: '/learn/en/cryptography-fundamentals-and-api-applications',
      readingTime: '65 min read',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Cryptographic core protecting keys, signatures, hashes, and API calls'
    }
  ];
  readonly spanishArticles: LearnArticle[] = [
    {
      chapterLabel: 'Capítulo 1',
      title: 'Fundamentos de Internet, Redes y APIs',
      description: 'De la comunicación en red al procesamiento completo de una solicitud en un API Gateway.',
      route: '/learn/es/fundamentos-internet-redes-apis',
      readingTime: '45 min de lectura',
      image: '/assets/learn/fundamentos-internet-redes-apis-cover.png',
      imageAlt: 'Una llamada de API que atraviesa capas de red y un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 2',
      title: 'TCP, UDP, Puertos y Sockets',
      description: 'Desde el establecimiento de conexiones hasta el diagnóstico de timeouts, pooling, SNAT y agotamiento de puertos en API Gateways.',
      route: '/learn/es/tcp-udp-puertos-y-sockets',
      readingTime: '50 min de lectura',
      image: '/assets/learn/tcp-udp-portas-sockets-cover.png',
      imageAlt: 'Flujos TCP y datagramas UDP que atraviesan un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 3',
      title: 'Direccionamiento IP: IPv4, IPv6, Subredes y Enrutamiento',
      description: 'De prefijos CIDR y subredes al diagnóstico de rutas, NAT, MTU y conectividad en API Gateways.',
      route: '/learn/es/direccionamiento-ip-ipv4-ipv6-subredes-y-enrutamiento',
      readingTime: '55 min de lectura',
      image: '/assets/learn/ip-addressing-cover.png',
      imageAlt: 'Direccionamiento IP, redes IPv4 e IPv6, subredes y selección de rutas'
    },
    {
      chapterLabel: 'Capítulo 4',
      title: 'DNS, NAT, Proxies y Balanceadores de Carga',
      description: 'De la resolución DNS y la traducción de direcciones a la terminación TLS, health checks y selección de backends.',
      route: '/learn/es/dns-nat-proxies-y-balanceadores-de-carga',
      readingTime: '65 min de lectura',
      image: '/assets/learn/dns-nat-proxies-load-balancers-cover.png',
      imageAlt: 'DNS, NAT, proxies y balanceadores guiando una solicitud hacia pools de backends'
    },
    {
      chapterLabel: 'Capítulo 5',
      title: 'HTTP/1.1, HTTP/2 y HTTP/3',
      description: 'De la semántica y el framing a la multiplexación, HPACK, QUIC, QPACK y traducción de protocolos en API Gateways.',
      route: '/learn/es/http-1-1-http-2-y-http-3',
      readingTime: '80 min de lectura',
      image: '/assets/learn/http-versions-cover.png',
      imageAlt: 'Evolución de mensajes HTTP a streams multiplexados y QUIC a través de un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 6',
      title: 'HTTPS y TLS en profundidad',
      description: 'De la criptografía y los handshakes TLS 1.2/1.3 a certificados X.509, mTLS, HSTS y troubleshooting en API Gateways.',
      route: '/learn/es/https-y-tls-en-profundidad',
      readingTime: '70 min de lectura',
      image: '/assets/learn/https-tls-cover.png',
      imageAlt: 'Conexión HTTPS protegida por TLS, cadena de certificados y un API Gateway'
    },
    {
      chapterLabel: 'Capítulo 7',
      title: 'Criptografía: simétrica, asimétrica, hashes y firmas digitales',
      description: 'De AES, hashes, HMAC y firmas digitales a gestión de claves, KMS, HSM, criptografía poscuántica y troubleshooting.',
      route: '/learn/es/criptografia-fundamentos-y-aplicaciones-en-apis',
      readingTime: '65 min de lectura',
      image: '/assets/learn/cryptography-cover.png',
      imageAlt: 'Núcleo criptográfico que protege claves, firmas, hashes y llamadas de APIs'
    }
  ];

  constructor(
    private readonly dataService: DataService,
    private readonly readingProgress: ReadingProgressService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Learn');
  }

  toggleCorporateApiPath(): void {
    this.isCorporateApiPathOpen = !this.isCorporateApiPathOpen;
  }

  isSeriesOpen(key: SeriesKey): boolean {
    return this.seriesOpen[key] === true;
  }

  toggleSeries(key: SeriesKey): void {
    this.seriesOpen = { ...this.seriesOpen, [key]: !this.seriesOpen[key] };
    this.persistSeriesState();
  }

  private loadSeriesState(): Record<SeriesKey, boolean> {
    const fallback: Record<SeriesKey, boolean> = { english: false, spanish: false, portuguese: false };

    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }

    try {
      const raw = window.localStorage.getItem(SERIES_STATE_KEY);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw) as Partial<Record<SeriesKey, unknown>>;
      return {
        english: parsed.english === true,
        spanish: parsed.spanish === true,
        portuguese: parsed.portuguese === true
      };
    } catch {
      return fallback;
    }
  }

  private persistSeriesState(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    try {
      window.localStorage.setItem(SERIES_STATE_KEY, JSON.stringify(this.seriesOpen));
    } catch {
      // Ignore storage errors (quota / disabled); in-memory state still applies.
    }
  }

  /** A card shows the green check when its chapter is read in any language. */
  isRead(route: string): boolean {
    const chapterId = chapterIdForRoute(route);
    return chapterId ? this.readingProgress.progress()[chapterId] === true : false;
  }

  /** Global sum shown in the hero: unique chapters read across all paths. */
  get totalReadCount(): number {
    return this.readingProgress.count();
  }

  /**
   * Percentage (0-100) of a path the user has read, with topic granularity:
   * partially read chapters contribute their fraction of read topics.
   */
  pathCompletionPercent(pathId: string): number {
    const path = LEARN_PATHS.find((item) => item.id === pathId);
    if (!path || !path.chapters.length) {
      return 0;
    }
    const sum = path.chapters.reduce(
      (total, chapter) => total + this.readingProgress.chapterCompletion(chapter.id, chapter.topicCount),
      0
    );
    return Math.round((sum / path.chapters.length) * 100);
  }

  /** Unique chapters read in a given path (a chapter read in any language counts once). */
  pathReadCount(pathId: string): number {
    const path = LEARN_PATHS.find((item) => item.id === pathId);
    if (!path) {
      return 0;
    }
    const progress = this.readingProgress.progress();
    return path.chapters.reduce((total, chapter) => total + (progress[chapter.id] === true ? 1 : 0), 0);
  }

  /** Total unique chapters in a path (counts one language only). */
  pathTotal(pathId: string): number {
    return LEARN_PATHS.find((item) => item.id === pathId)?.chapters.length ?? 0;
  }

  exportProgress(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = JSON.stringify(this.readingProgress.export(), null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'utily-learn-progress.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  triggerImport(): void {
    this.importFeedback = null;
    this.importInput?.nativeElement.click();
  }

  onImportFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = this.readingProgress.import(String(reader.result ?? ''));
        this.importFeedback = {
          type: 'success',
          message: `Imported progress for ${imported} article${imported === 1 ? '' : 's'}.`
        };
      } catch {
        this.importFeedback = { type: 'error', message: 'Could not read that file. Please select a valid progress JSON.' };
      }
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.onerror = () => {
      this.importFeedback = { type: 'error', message: 'Could not read that file. Please try again.' };
      input.value = '';
      this.cdr.markForCheck();
    };
    reader.readAsText(file);
  }

  scroll(track: 'portuguese' | 'english' | 'spanish', direction: -1 | 1): void {
    const tracks = {
      portuguese: this.portugueseTrack?.nativeElement,
      english: this.englishTrack?.nativeElement,
      spanish: this.spanishTrack?.nativeElement
    };

    tracks[track]?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  }
}
