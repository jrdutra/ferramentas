import { CommonModule } from '@angular/common';
import { PDFDocument } from 'pdf-lib';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';
import {
  ConexaoFluxograma,
  Fluxograma,
  FluxogramaService,
  FormaTipo,
  NoFluxograma,
  TipoTraco,
} from '../../services/fluxograma.service';

type Ferramenta = 'selecionar' | 'conectar' | FormaTipo;
type Formato = 'mermaid' | 'xml';

interface OpcaoForma {
  tipo: FormaTipo;
  nome: string;
  icone: string;
}

interface BackupTema {
  nos: Map<string, { f: string; b: string; t: string }>;
  con: Map<string, string>;
  padrao: { corFundo: string; corBorda: string; corTexto: string; corLinha: string };
}

@Component({
  selector: 'app-editor-fluxograma',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './editor-fluxograma.component.html',
  styleUrl: './editor-fluxograma.component.css',
})
export class EditorFluxogramaComponent implements OnInit {

  @ViewChild('svgCanvas') svgCanvas?: ElementRef<SVGSVGElement>;

  readonly formas: OpcaoForma[] = [
    { tipo: 'retangulo', nome: 'Processo', icone: 'crop_16_9' },
    { tipo: 'arredondado', nome: 'Arredondado', icone: 'rounded_corner' },
    { tipo: 'terminador', nome: 'Início/Fim', icone: 'stadium' },
    { tipo: 'losango', nome: 'Decisão', icone: 'change_history' },
    { tipo: 'circulo', nome: 'Círculo', icone: 'circle' },
    { tipo: 'elipse', nome: 'Elipse', icone: 'lens_blur' },
    { tipo: 'paralelogramo', nome: 'Entrada/Saída', icone: 'polyline' },
    { tipo: 'hexagono', nome: 'Preparação', icone: 'hexagon' },
    { tipo: 'cilindro', nome: 'Dados', icone: 'database' },
  ];

  readonly containers: OpcaoForma[] = [
    { tipo: 'subprocesso', nome: 'Subprocesso', icone: 'dynamic_feed' },
    { tipo: 'container', nome: 'Contêiner', icone: 'space_dashboard' },
    { tipo: 'frame', nome: 'Moldura', icone: 'crop_free' },
    { tipo: 'grupo', nome: 'Grupo', icone: 'workspaces' },
    { tipo: 'swimlane', nome: 'Raia', icone: 'view_week' },
  ];

  readonly tracos: { id: TipoTraco; nome: string }[] = [
    { id: 'solido', nome: 'Traço sólido' },
    { id: 'giz', nome: 'Risco de giz' },
    { id: 'lapis', nome: 'Risco de lápis' },
  ];

  get todasFormas(): OpcaoForma[] {
    return [...this.formas, ...this.containers];
  }

  nos: NoFluxograma[] = [];
  conexoes: ConexaoFluxograma[] = [];

  ferramenta: Ferramenta = 'selecionar';
  selecionadoId: string | null = null;
  selecionadoTipo: 'no' | 'conexao' | null = null;

  // Origem temporária ao criar conexões.
  conexaoOrigemId: string | null = null;

  // Estilos padrão aplicados a novos elementos.
  padrao = {
    corFundo: '#0b2344',
    corBorda: '#00ffd1',
    espessuraBorda: 2,
    corTexto: '#f4fbff',
    corLinha: '#5b7cff',
    espessuraLinha: 2,
    tipoTraco: 'solido' as TipoTraco,
  };

  temaClaro = false;
  aviso = '';
  private backupTema: BackupTema | null = null;
  private substituirImagemId: string | null = null;
  private readonly chaveLocal = 'fluxograma-editor-v1';

  // Viewport
  zoom = 1;
  panX = 40;
  panY = 40;

  // Painel de import/export
  painelDados = false;
  formato: Formato = 'mermaid';
  textoDados = '';
  mensagem = '';
  copiado = false;

  // Estado de arraste / pan (apenas em memória durante o gesto).
  private arrastando: NoFluxograma | null = null;
  private arrasteDx = 0;
  private arrasteDy = 0;
  private panning = false;
  private panIniX = 0;
  private panIniY = 0;

  // Estado de redimensionamento.
  private redimensionando: NoFluxograma | null = null;
  private resizeCanto = '';
  private resizeIniX = 0;
  private resizeIniY = 0;
  private resizeBounds = { x: 0, y: 0, largura: 0, altura: 0 };

  private contador = 0;

  constructor(private dataService: DataService, private fluxogramaService: FluxogramaService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Editor de Fluxograma');
    if (!this.carregarLocal()) this.exemplo();
  }

  // ─────────────────────────── Getters ───────────────────────────

  get noSelecionado(): NoFluxograma | null {
    return this.selecionadoTipo === 'no' ? this.nos.find((n) => n.id === this.selecionadoId) ?? null : null;
  }

  get conexaoSelecionada(): ConexaoFluxograma | null {
    return this.selecionadoTipo === 'conexao'
      ? this.conexoes.find((c) => c.id === this.selecionadoId) ?? null
      : null;
  }

  // ─────────────────────── Ferramentas / criação ───────────────────────

  selecionarFerramenta(f: Ferramenta): void {
    this.ferramenta = f;
    this.conexaoOrigemId = null;
    if (f !== 'selecionar') {
      this.selecionadoId = null;
      this.selecionadoTipo = null;
    }
  }

  private novoId(prefixo: string): string {
    this.contador += 1;
    return `${prefixo}${this.contador}`;
  }

  private criarNo(tipo: FormaTipo, x: number, y: number): NoFluxograma {
    let largura = 150;
    let altura = 70;
    if (tipo === 'circulo') {
      largura = 90;
      altura = 90;
    } else if (tipo === 'swimlane') {
      largura = 340;
      altura = 220;
    } else if (this.ehContainer(tipo)) {
      largura = 280;
      altura = 180;
    }
    const no: NoFluxograma = {
      id: this.novoId('n'),
      tipo,
      x: Math.round(x - largura / 2),
      y: Math.round(y - altura / 2),
      largura,
      altura,
      texto: this.textoInicial(tipo),
      corFundo: this.padrao.corFundo,
      corBorda: this.padrao.corBorda,
      espessuraBorda: this.padrao.espessuraBorda,
      corTexto: this.padrao.corTexto,
      tipoTraco: this.padrao.tipoTraco,
    };
    // Contêineres entram no início do array para ficarem atrás dos demais.
    if (this.ehContainer(tipo)) this.nos.unshift(no);
    else this.nos.push(no);
    return no;
  }

  /** Insere (ou substitui) uma imagem a partir de um arquivo selecionado. */
  adicionarImagem(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    input.value = '';
    if (!arquivo) {
      this.substituirImagemId = null;
      return;
    }
    const leitor = new FileReader();
    leitor.onload = () => {
      const src = String(leitor.result || '');
      const img = new Image();
      img.onload = () => {
        if (this.substituirImagemId) {
          const alvo = this.nos.find((n) => n.id === this.substituirImagemId);
          if (alvo) alvo.src = src;
          this.substituirImagemId = null;
        } else {
          this.criarNoImagem(src, img.naturalWidth || 200, img.naturalHeight || 150);
        }
        this.salvar();
      };
      img.onerror = () => {
        this.substituirImagemId = null;
        this.avisar('Não foi possível carregar a imagem.');
      };
      img.src = src;
    };
    leitor.readAsDataURL(arquivo);
  }

  private criarNoImagem(src: string, w: number, h: number): void {
    const max = 240;
    const escala = Math.min(1, max / Math.max(w, h));
    const largura = Math.max(30, Math.round(w * escala));
    const altura = Math.max(30, Math.round(h * escala));
    const centro = this.centroViewport();
    const no: NoFluxograma = {
      id: this.novoId('n'),
      tipo: 'imagem',
      x: Math.round(centro.x - largura / 2),
      y: Math.round(centro.y - altura / 2),
      largura,
      altura,
      texto: '',
      corFundo: 'transparent',
      corBorda: this.padrao.corBorda,
      espessuraBorda: 0,
      corTexto: this.padrao.corTexto,
      tipoTraco: 'solido',
      src,
    };
    this.nos.push(no);
    this.selecionar(no.id, 'no');
  }

  /** Marca a imagem selecionada para ser substituída pelo próximo arquivo escolhido. */
  trocarImagem(): void {
    if (this.noSelecionado?.tipo === 'imagem') {
      this.substituirImagemId = this.noSelecionado.id;
    }
  }

  private centroViewport(): { x: number; y: number } {
    const svg = this.svgCanvas?.nativeElement;
    if (!svg) return { x: 200, y: 150 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (rect.width / 2 - this.panX) / this.zoom,
      y: (rect.height / 2 - this.panY) / this.zoom,
    };
  }

  ehContainer(tipo: FormaTipo): boolean {
    return tipo === 'container' || tipo === 'frame' || tipo === 'grupo' || tipo === 'swimlane';
  }

  get nosContainer(): NoFluxograma[] {
    return this.nos.filter((n) => this.ehContainer(n.tipo));
  }

  get nosNormais(): NoFluxograma[] {
    return this.nos.filter((n) => !this.ehContainer(n.tipo));
  }

  private textoInicial(tipo: FormaTipo): string {
    switch (tipo) {
      case 'losango':
        return 'Decisão?';
      case 'terminador':
        return 'Início';
      case 'paralelogramo':
        return 'Entrada';
      case 'cilindro':
        return 'Dados';
      case 'subprocesso':
        return 'Subprocesso';
      case 'container':
        return 'Contêiner';
      case 'frame':
        return 'Moldura';
      case 'grupo':
        return 'Grupo';
      case 'swimlane':
        return 'Raia';
      default:
        return 'Texto';
    }
  }

  // ─────────────────────── Eventos do canvas ───────────────────────

  aoClicarCanvas(evento: MouseEvent): void {
    // Clique em área vazia.
    if (this.ferramenta !== 'selecionar' && this.ferramenta !== 'conectar') {
      const p = this.pontoCanvas(evento);
      const no = this.criarNo(this.ferramenta, p.x, p.y);
      this.selecionar(no.id, 'no');
      this.ferramenta = 'selecionar';
      this.salvar();
      return;
    }
    // Modo selecionar: clicar no vazio limpa a seleção.
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.conexaoOrigemId = null;
  }

  aoPressionarNo(evento: MouseEvent, no: NoFluxograma): void {
    evento.stopPropagation();

    if (this.ferramenta === 'conectar') {
      if (!this.conexaoOrigemId) {
        this.conexaoOrigemId = no.id;
        this.selecionar(no.id, 'no');
      } else if (this.conexaoOrigemId !== no.id) {
        this.criarConexao(this.conexaoOrigemId, no.id);
        this.conexaoOrigemId = null;
        this.salvar();
      }
      return;
    }

    // Modo selecionar → inicia arraste.
    this.selecionar(no.id, 'no');
    const p = this.pontoCanvas(evento);
    this.arrastando = no;
    this.arrasteDx = p.x - no.x;
    this.arrasteDy = p.y - no.y;
  }

  aoClicarConexao(evento: MouseEvent, c: ConexaoFluxograma): void {
    evento.stopPropagation();
    if (this.ferramenta === 'conectar') return;
    this.selecionar(c.id, 'conexao');
  }

  aoPressionarFundo(evento: MouseEvent): void {
    if (this.ferramenta === 'selecionar') {
      this.panning = true;
      this.panIniX = evento.clientX - this.panX;
      this.panIniY = evento.clientY - this.panY;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  aoMover(evento: MouseEvent): void {
    if (this.redimensionando) {
      this.redimensionar(evento);
      return;
    }
    if (this.arrastando) {
      const p = this.pontoCanvas(evento);
      this.arrastando.x = Math.round(p.x - this.arrasteDx);
      this.arrastando.y = Math.round(p.y - this.arrasteDy);
    } else if (this.panning) {
      this.panX = evento.clientX - this.panIniX;
      this.panY = evento.clientY - this.panIniY;
    }
  }

  @HostListener('window:mouseup')
  aoSoltar(): void {
    const mudou = !!(this.arrastando || this.redimensionando || this.panning);
    this.arrastando = null;
    this.panning = false;
    this.redimensionando = null;
    if (mudou) this.salvar();
  }

  @HostListener('window:keydown', ['$event'])
  aoTeclar(evento: KeyboardEvent): void {
    const alvo = evento.target as HTMLElement | null;
    if (alvo && ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName)) return;
    if ((evento.key === 'Delete' || evento.key === 'Backspace') && this.selecionadoId) {
      evento.preventDefault();
      this.excluirSelecionado();
    }
    if (evento.key === 'Escape') {
      this.selecionadoId = null;
      this.selecionadoTipo = null;
      this.conexaoOrigemId = null;
      this.ferramenta = 'selecionar';
    }
  }

  private criarConexao(de: string, para: string): ConexaoFluxograma {
    const c: ConexaoFluxograma = {
      id: this.novoId('e'),
      de,
      para,
      texto: '',
      cor: this.padrao.corLinha,
      espessura: this.padrao.espessuraLinha,
      tracejada: false,
      setaInicio: false,
      setaFim: true,
      tipoTraco: this.padrao.tipoTraco,
    };
    this.conexoes.push(c);
    this.selecionar(c.id, 'conexao');
    return c;
  }

  private selecionar(id: string, tipo: 'no' | 'conexao'): void {
    this.selecionadoId = id;
    this.selecionadoTipo = tipo;
  }

  excluirSelecionado(): void {
    if (!this.selecionadoId) return;
    if (this.selecionadoTipo === 'no') {
      const id = this.selecionadoId;
      this.nos = this.nos.filter((n) => n.id !== id);
      this.conexoes = this.conexoes.filter((c) => c.de !== id && c.para !== id);
    } else {
      this.conexoes = this.conexoes.filter((c) => c.id !== this.selecionadoId);
    }
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.salvar();
  }

  // ─────────────────────── Coordenadas / viewport ───────────────────────

  private pontoCanvas(evento: MouseEvent): { x: number; y: number } {
    const svg = this.svgCanvas?.nativeElement;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (evento.clientX - rect.left - this.panX) / this.zoom,
      y: (evento.clientY - rect.top - this.panY) / this.zoom,
    };
  }

  aplicarZoom(fator: number): void {
    this.zoom = Math.min(3, Math.max(0.25, +(this.zoom * fator).toFixed(2)));
  }

  ajustarZoom(valor: number): void {
    this.zoom = valor;
  }

  resetarView(): void {
    this.zoom = 1;
    this.panX = 40;
    this.panY = 40;
  }

  /** Alterna o tema do gráfico entre escuro (atual) e claro (fundo branco, traços escuros). */
  alternarTema(): void {
    this.temaClaro = !this.temaClaro;
    if (this.temaClaro) {
      this.backupTema = {
        nos: new Map(this.nos.map((n) => [n.id, { f: n.corFundo, b: n.corBorda, t: n.corTexto }])),
        con: new Map(this.conexoes.map((c) => [c.id, c.cor])),
        padrao: {
          corFundo: this.padrao.corFundo,
          corBorda: this.padrao.corBorda,
          corTexto: this.padrao.corTexto,
          corLinha: this.padrao.corLinha,
        },
      };
      const borda = '#1f2937';
      const texto = '#111827';
      const fundo = '#ffffff';
      const linha = '#334155';
      this.nos.forEach((n) => {
        n.corFundo = fundo;
        n.corBorda = borda;
        n.corTexto = texto;
      });
      this.conexoes.forEach((c) => (c.cor = linha));
      this.padrao.corFundo = fundo;
      this.padrao.corBorda = borda;
      this.padrao.corTexto = texto;
      this.padrao.corLinha = linha;
    } else if (this.backupTema) {
      const bk = this.backupTema;
      this.nos.forEach((n) => {
        const o = bk.nos.get(n.id);
        if (o) {
          n.corFundo = o.f;
          n.corBorda = o.b;
          n.corTexto = o.t;
        }
      });
      this.conexoes.forEach((c) => {
        const o = bk.con.get(c.id);
        if (o !== undefined) c.cor = o;
      });
      this.padrao.corFundo = bk.padrao.corFundo;
      this.padrao.corBorda = bk.padrao.corBorda;
      this.padrao.corTexto = bk.padrao.corTexto;
      this.padrao.corLinha = bk.padrao.corLinha;
      this.backupTema = null;
    }
    this.salvar();
  }

  /** Filtro SVG (giz/lápis) correspondente ao tipo de traço. */
  filtroTraco(tipo: TipoTraco): string | null {
    if (tipo === 'giz') return 'url(#traco-giz)';
    if (tipo === 'lapis') return 'url(#traco-lapis)';
    return null;
  }

  aoRolar(evento: WheelEvent): void {
    if (!evento.ctrlKey) return;
    evento.preventDefault();
    this.aplicarZoom(evento.deltaY < 0 ? 1.1 : 0.9);
  }

  // ─────────────────────── Geometria das formas ───────────────────────

  cx(no: NoFluxograma): number {
    return no.x + no.largura / 2;
  }
  cy(no: NoFluxograma): number {
    return no.y + no.altura / 2;
  }

  /** Ponto na borda do nó na direção de (px, py). */
  private pontoBorda(no: NoFluxograma, px: number, py: number): { x: number; y: number } {
    const cx = this.cx(no);
    const cy = this.cy(no);
    let dx = px - cx;
    let dy = py - cy;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };
    const rx = no.largura / 2;
    const ry = no.altura / 2;

    if (no.tipo === 'circulo' || no.tipo === 'elipse') {
      const ang = Math.atan2(dy, dx);
      return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
    }
    if (no.tipo === 'losango') {
      const t = 1 / (Math.abs(dx) / rx + Math.abs(dy) / ry);
      return { x: cx + dx * t, y: cy + dy * t };
    }
    // Retângulo e derivados.
    const escala = 1 / Math.max(Math.abs(dx) / rx, Math.abs(dy) / ry);
    return { x: cx + dx * escala, y: cy + dy * escala };
  }

  pontosConexao(c: ConexaoFluxograma): { x1: number; y1: number; x2: number; y2: number } | null {
    const a = this.nos.find((n) => n.id === c.de);
    const b = this.nos.find((n) => n.id === c.para);
    if (!a || !b) return null;
    const p1 = this.pontoBorda(a, this.cx(b), this.cy(b));
    const p2 = this.pontoBorda(b, this.cx(a), this.cy(a));
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
  }

  meioConexao(c: ConexaoFluxograma): { x: number; y: number } {
    const p = this.pontosConexao(c);
    if (!p) return { x: 0, y: 0 };
    return { x: (p.x1 + p.x2) / 2, y: (p.y1 + p.y2) / 2 };
  }

  /** Pontos do polígono (losango, paralelogramo, hexágono) em coordenadas absolutas. */
  pontosPoligono(no: NoFluxograma): string {
    const { x, y, largura: w, altura: h } = no;
    if (no.tipo === 'losango') {
      return `${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`;
    }
    if (no.tipo === 'paralelogramo') {
      const d = w * 0.22;
      return `${x + d},${y} ${x + w},${y} ${x + w - d},${y + h} ${x},${y + h}`;
    }
    if (no.tipo === 'hexagono') {
      const d = w * 0.18;
      return `${x + d},${y} ${x + w - d},${y} ${x + w},${y + h / 2} ${x + w - d},${y + h} ${x + d},${y + h} ${x},${y + h / 2}`;
    }
    return '';
  }

  /** Caminho do cilindro (banco de dados). */
  caminhoCilindro(no: NoFluxograma): string {
    const { x, y, largura: w, altura: h } = no;
    const r = Math.min(h * 0.18, 14);
    return (
      `M ${x} ${y + r} ` +
      `A ${w / 2} ${r} 0 0 1 ${x + w} ${y + r} ` +
      `L ${x + w} ${y + h - r} ` +
      `A ${w / 2} ${r} 0 0 1 ${x} ${y + h - r} ` +
      `Z`
    );
  }

  caminhoTopoCilindro(no: NoFluxograma): string {
    const { x, y, largura: w } = no;
    const r = Math.min(no.altura * 0.18, 14);
    return `M ${x} ${y + r} A ${w / 2} ${r} 0 0 0 ${x + w} ${y + r}`;
  }

  raioArredondado(no: NoFluxograma): number {
    if (no.tipo === 'terminador') return no.altura / 2;
    if (no.tipo === 'arredondado') return 14;
    return 0;
  }

  // ─────────────────────── Redimensionamento ───────────────────────

  /** Tamanho das alças (constante em pixels de tela, independente do zoom). */
  tamAlca(): number {
    return 9 / this.zoom;
  }

  /** Posições das 8 alças ao redor do nó. */
  alcas(no: NoFluxograma): { x: number; y: number; canto: string; cursor: string }[] {
    const { x, y, largura: w, altura: h } = no;
    return [
      { x, y, canto: 'nw', cursor: 'nwse-resize' },
      { x: x + w / 2, y, canto: 'n', cursor: 'ns-resize' },
      { x: x + w, y, canto: 'ne', cursor: 'nesw-resize' },
      { x: x + w, y: y + h / 2, canto: 'e', cursor: 'ew-resize' },
      { x: x + w, y: y + h, canto: 'se', cursor: 'nwse-resize' },
      { x: x + w / 2, y: y + h, canto: 's', cursor: 'ns-resize' },
      { x, y: y + h, canto: 'sw', cursor: 'nesw-resize' },
      { x, y: y + h / 2, canto: 'w', cursor: 'ew-resize' },
    ];
  }

  iniciarResize(evento: MouseEvent, no: NoFluxograma, canto: string): void {
    evento.stopPropagation();
    evento.preventDefault();
    this.selecionar(no.id, 'no');
    this.redimensionando = no;
    this.resizeCanto = canto;
    const p = this.pontoCanvas(evento);
    this.resizeIniX = p.x;
    this.resizeIniY = p.y;
    this.resizeBounds = { x: no.x, y: no.y, largura: no.largura, altura: no.altura };
  }

  private redimensionar(evento: MouseEvent): void {
    if (!this.redimensionando) return;
    const p = this.pontoCanvas(evento);
    const dx = p.x - this.resizeIniX;
    const dy = p.y - this.resizeIniY;
    const b = this.resizeBounds;
    const c = this.resizeCanto;
    const min = 24;

    let nw = b.largura;
    let nh = b.altura;
    if (c.includes('e')) nw = b.largura + dx;
    if (c.includes('w')) nw = b.largura - dx;
    if (c.includes('s')) nh = b.altura + dy;
    if (c.includes('n')) nh = b.altura - dy;

    // Imagens mantêm a proporção original para não distorcer.
    if (this.redimensionando.tipo === 'imagem') {
      const aspect = b.largura / b.altura || 1;
      if (c === 'n' || c === 's') nw = nh * aspect;
      else nh = nw / aspect;
    }

    nw = Math.max(min, Math.round(nw));
    nh = Math.max(min, Math.round(nh));

    let nx = b.x;
    let ny = b.y;
    if (c.includes('w')) nx = b.x + b.largura - nw;
    if (c.includes('n')) ny = b.y + b.altura - nh;

    const no = this.redimensionando;
    no.largura = nw;
    no.altura = nh;
    no.x = Math.round(nx);
    no.y = Math.round(ny);
  }

  /** Quebra o texto em linhas para renderizar em tspans. */
  linhasTexto(no: NoFluxograma): string[] {
    const bruto = (no.texto || '').split(/\r?\n/);
    const maxChars = Math.max(6, Math.floor(no.largura / 8));
    const linhas: string[] = [];
    for (const parte of bruto) {
      if (parte.length <= maxChars) {
        linhas.push(parte);
        continue;
      }
      const palavras = parte.split(/\s+/);
      let atual = '';
      for (const p of palavras) {
        if ((atual + ' ' + p).trim().length > maxChars && atual) {
          linhas.push(atual);
          atual = p;
        } else {
          atual = (atual + ' ' + p).trim();
        }
      }
      if (atual) linhas.push(atual);
    }
    return linhas.length ? linhas : [''];
  }

  // ─────────────────────── Import / Export ───────────────────────

  get fluxograma(): Fluxograma {
    return { nos: this.nos, conexoes: this.conexoes };
  }

  abrirPainelDados(formato: Formato): void {
    this.formato = formato;
    this.painelDados = true;
    this.gerar();
  }

  gerar(): void {
    this.mensagem = '';
    this.textoDados =
      this.formato === 'mermaid'
        ? this.fluxogramaService.paraMermaid(this.fluxograma)
        : this.fluxogramaService.paraXml(this.fluxograma);
  }

  aplicar(): void {
    try {
      const fluxo =
        this.formato === 'mermaid'
          ? this.fluxogramaService.deMermaid(this.textoDados)
          : this.fluxogramaService.deXml(this.textoDados);
      this.carregar(fluxo);
      this.mensagem = `Diagrama importado: ${fluxo.nos.length} formas, ${fluxo.conexoes.length} conexões.`;
    } catch (e) {
      this.mensagem = 'Erro ao importar: ' + (e instanceof Error ? e.message : 'formato inválido.');
    }
  }

  private carregar(fluxo: Fluxograma): void {
    this.nos = fluxo.nos;
    this.conexoes = fluxo.conexoes;
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    // Ajusta o contador para evitar colisão de ids.
    const nums = [...this.nos, ...this.conexoes]
      .map((x) => parseInt(x.id.replace(/^\D+/, ''), 10))
      .filter((n) => Number.isFinite(n));
    this.contador = nums.length ? Math.max(...nums) : 0;
    this.resetarView();
    this.salvar();
  }

  copiar(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.textoDados).then(() => {
      this.copiado = true;
      setTimeout(() => (this.copiado = false), 2000);
    });
  }

  baixar(): void {
    if (typeof document === 'undefined') return;
    const ext = this.formato === 'mermaid' ? 'mmd' : 'xml';
    const mime = this.formato === 'mermaid' ? 'text/plain' : 'application/xml';
    const blob = new Blob([this.textoDados], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fluxograma.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  carregarArquivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      const conteudo = String(leitor.result || '');
      this.textoDados = conteudo;
      const inicio = conteudo.trimStart();
      this.formato = inicio.startsWith('<') || arquivo.name.endsWith('.xml') ? 'xml' : 'mermaid';
      this.painelDados = true;
      this.aplicar();
      input.value = '';
    };
    leitor.readAsText(arquivo);
  }

  private get fundoExport(): string {
    return this.temaClaro ? '#ffffff' : '#061326';
  }

  /** Limites do conteúdo (todas as formas). */
  private limitesConteudo(): { minX: number; minY: number; largura: number; altura: number } | null {
    if (!this.nos.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of this.nos) {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.largura);
      maxY = Math.max(maxY, n.y + n.altura);
    }
    const pad = 32;
    return { minX: minX - pad, minY: minY - pad, largura: maxX - minX + pad * 2, altura: maxY - minY + pad * 2 };
  }

  /** Constrói um SVG autônomo, recortado ao conteúdo e com setas coloridas embutidas. */
  private construirSvgExport(
    fundo: string | null,
    semPreenchimento = false,
  ): { svg: string; largura: number; altura: number } | null {
    if (typeof document === 'undefined' || !this.svgCanvas) return null;
    const lim = this.limitesConteudo();
    if (!lim) return null;

    const ns = 'http://www.w3.org/2000/svg';
    const clone = this.svgCanvas.nativeElement.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', ns);
    clone.setAttribute('width', String(lim.largura));
    clone.setAttribute('height', String(lim.altura));
    clone.setAttribute('viewBox', `${lim.minX} ${lim.minY} ${lim.largura} ${lim.altura}`);
    clone.removeAttribute('class');

    // Remove a escala/pan do grupo de conteúdo (mantém os transforms de rótulo).
    clone.querySelectorAll('g').forEach((g) => {
      const t = g.getAttribute('transform');
      if (t && t.includes('scale')) g.removeAttribute('transform');
    });

    clone.querySelector('.fundo-grade')?.remove();
    clone.querySelectorAll('.conexao-hit, .contorno-selecao, .alca').forEach((el) => el.remove());

    // Estilos essenciais embutidos (o SVG exportado não carrega o CSS do componente).
    const estilo = document.createElementNS(ns, 'style');
    estilo.textContent =
      "text{font-family:Roboto,'Helvetica Neue',Arial,sans-serif;}" +
      '.no-texto{font-size:13px;font-weight:600;}' +
      '.conexao-rotulo{font-size:12px;font-weight:600;}' +
      '.conexao-linha{fill:none;}';
    clone.insertBefore(estilo, clone.firstChild);

    const defs = clone.querySelector('defs');
    // Substitui as setas por marcadores coloridos por conexão (context-stroke não é confiável fora do DOM).
    if (defs) {
      let i = 0;
      clone.querySelectorAll('.conexao-linha').forEach((linha) => {
        const cor = linha.getAttribute('stroke') || '#5b7cff';
        if (linha.getAttribute('marker-end')) {
          const id = `exp-fim-${i}`;
          defs.appendChild(this.criarMarcador(ns, id, cor, true));
          linha.setAttribute('marker-end', `url(#${id})`);
        }
        if (linha.getAttribute('marker-start')) {
          const id = `exp-ini-${i}`;
          defs.appendChild(this.criarMarcador(ns, id, cor, false));
          linha.setAttribute('marker-start', `url(#${id})`);
        }
        i += 1;
      });
    }

    // Fundo sólido (para JPG/PDF).
    if (fundo) {
      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', String(lim.minX));
      rect.setAttribute('y', String(lim.minY));
      rect.setAttribute('width', String(lim.largura));
      rect.setAttribute('height', String(lim.altura));
      rect.setAttribute('fill', fundo);
      clone.insertBefore(rect, defs ? defs.nextSibling : clone.firstChild);
    }

    // Preenchimentos transparentes: mantém apenas bordas, texto e linhas.
    if (semPreenchimento) {
      clone.querySelectorAll('rect, ellipse, polygon, path').forEach((el) => {
        if (el.closest('defs')) return;
        el.setAttribute('fill', 'none');
        el.removeAttribute('fill-opacity');
      });
    }

    const svg = new XMLSerializer().serializeToString(clone);
    return { svg, largura: lim.largura, altura: lim.altura };
  }

  private criarMarcador(ns: string, id: string, cor: string, fim: boolean): SVGMarkerElement {
    const marker = document.createElementNS(ns, 'marker') as SVGMarkerElement;
    marker.setAttribute('id', id);
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', fim ? '9' : '1');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '7');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('orient', 'auto-start-reverse');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', fim ? 'M 0 0 L 10 5 L 0 10 z' : 'M 10 0 L 0 5 L 10 10 z');
    path.setAttribute('fill', cor);
    marker.appendChild(path);
    return marker;
  }

  private salvarBlob(blob: Blob, nome: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Rasteriza o diagrama para um blob PNG/JPEG. */
  private rasterizar(mime: string, fundo: string | null, escala = 2, semPreenchimento = false): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const dados = this.construirSvgExport(fundo, semPreenchimento);
      if (!dados) {
        reject(new Error('Adicione ao menos uma forma ao diagrama.'));
        return;
      }
      const blob = new Blob([dados.svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(dados.largura * escala));
        canvas.height = Math.max(1, Math.round(dados.altura * escala));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas indisponível.'));
          return;
        }
        if (fundo) {
          ctx.fillStyle = fundo;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao gerar a imagem.'))), mime, 0.95);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Falha ao renderizar o diagrama.'));
      };
      img.src = url;
    });
  }

  baixarSvg(): void {
    const dados = this.construirSvgExport(null);
    if (!dados) {
      this.avisar('Adicione ao menos uma forma ao diagrama.');
      return;
    }
    this.salvarBlob(new Blob([dados.svg], { type: 'image/svg+xml' }), 'fluxograma.svg');
  }

  baixarPng(): void {
    this.rasterizar('image/png', this.fundoExport)
      .then((b) => this.salvarBlob(b, 'fluxograma.png'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  /** PNG com fundo transparente e formas sem preenchimento (apenas contornos). */
  baixarPngTransparente(): void {
    this.rasterizar('image/png', null, 2, true)
      .then((b) => this.salvarBlob(b, 'fluxograma-transparente.png'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  baixarJpg(): void {
    this.rasterizar('image/jpeg', this.fundoExport)
      .then((b) => this.salvarBlob(b, 'fluxograma.jpg'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  async baixarPdf(): Promise<void> {
    try {
      const blob = await this.rasterizar('image/png', this.fundoExport);
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const pdf = await PDFDocument.create();
      const png = await pdf.embedPng(bytes);
      const page = pdf.addPage([png.width, png.height]);
      page.drawImage(png, { x: 0, y: 0, width: png.width, height: png.height });
      const saida = await pdf.save();
      this.salvarBlob(new Blob([saida], { type: 'application/pdf' }), 'fluxograma.pdf');
    } catch (e) {
      this.avisar(e instanceof Error ? e.message : 'Erro ao exportar PDF.');
    }
  }

  private avisar(texto: string): void {
    this.aviso = texto;
    setTimeout(() => (this.aviso = ''), 3500);
  }

  // ─────────────────────── Persistência (localStorage) ───────────────────────

  salvar(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(
        this.chaveLocal,
        JSON.stringify({
          nos: this.nos,
          conexoes: this.conexoes,
          zoom: this.zoom,
          panX: this.panX,
          panY: this.panY,
          temaClaro: this.temaClaro,
          padrao: this.padrao,
          contador: this.contador,
        }),
      );
    } catch {
      /* localStorage cheio ou indisponível — ignora */
    }
  }

  private carregarLocal(): boolean {
    if (typeof localStorage === 'undefined') return false;
    try {
      const raw = localStorage.getItem(this.chaveLocal);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (!Array.isArray(d.nos) || !Array.isArray(d.conexoes)) return false;
      this.nos = d.nos;
      this.conexoes = d.conexoes;
      this.zoom = d.zoom ?? 1;
      this.panX = d.panX ?? 40;
      this.panY = d.panY ?? 40;
      this.temaClaro = !!d.temaClaro;
      if (d.padrao) this.padrao = d.padrao;
      this.contador = d.contador ?? 0;
      return true;
    } catch {
      return false;
    }
  }

  /** Baixa a versão HTML standalone (offline) da ferramenta. */
  async baixarOffline(): Promise<void> {
    if (typeof fetch === 'undefined') return;
    try {
      const resp = await fetch('assets/fluxograma-offline.html');
      if (!resp.ok) throw new Error('arquivo não encontrado');
      const texto = await resp.text();
      this.salvarBlob(new Blob([texto], { type: 'text/html' }), 'fluxograma-offline.html');
    } catch {
      this.avisar('Não foi possível baixar o arquivo offline.');
    }
  }

  // ─────────────────────── Ações gerais ───────────────────────

  limparTudo(): void {
    this.nos = [];
    this.conexoes = [];
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.contador = 0;
    this.salvar();
  }

  private exemplo(): void {
    this.limparTudo();
    const inicio = this.criarNo('terminador', 160, 70);
    inicio.texto = 'Início';
    const proc = this.criarNo('retangulo', 160, 200);
    proc.texto = 'Processar dados';
    const dec = this.criarNo('losango', 160, 340);
    dec.texto = 'Válido?';
    const fim = this.criarNo('terminador', 400, 340);
    fim.texto = 'Fim';
    this.criarConexao(inicio.id, proc.id);
    this.criarConexao(proc.id, dec.id);
    const cSim = this.criarConexao(dec.id, fim.id);
    cSim.texto = 'Sim';
    const cNao = this.criarConexao(dec.id, proc.id);
    cNao.texto = 'Não';
    cNao.tracejada = true;
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.salvar();
  }

  // Helpers de binding numérico para inputs range.
  setEspessuraBorda(no: NoFluxograma, v: string): void {
    no.espessuraBorda = +v;
    this.salvar();
  }
  setEspessuraLinha(c: ConexaoFluxograma, v: string): void {
    c.espessura = +v;
    this.salvar();
  }

  larguraRotulo(texto: string, max: number): number {
    return Math.min(max, Math.max(40, (texto ? texto.length : 0) * 7 + 20));
  }

  trackNo(_: number, n: NoFluxograma): string {
    return n.id;
  }

  trackConexao(_: number, c: ConexaoFluxograma): string {
    return c.id;
  }
}

