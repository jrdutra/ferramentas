import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { create as criarQrCode } from 'qrcode';
import { DataService } from '../../data.service';

interface EstiloQrCode {
  id?: string;
  personalizado?: boolean;
  nome: string;
  descricao: string;
  classe: string;
  colorDark: string;
  colorLight: string;
  icone: string;
  glow: string;
  glowSecundario: string;
  exibirBorda: boolean;
  quantidadeBordas: 1 | 2;
  corBorda: string;
  corBordaSecundaria: string;
  corFundoRetangulo: string;
  cantosArredondados: boolean;
  cantosQrCodeArredondados: boolean;
  formatoModulo: 'quadrado' | 'redondo';
  textoTitulo: string;
  iluminarTitulo: boolean;
  iluminarBordaPrincipal: boolean;
  iluminarBordaSecundaria: boolean;
  exibirTitulo: boolean;
  exibirRetangulo: boolean;
  exibirLogo: boolean;
  logotipoDataUrl?: string;
  nomeLogotipo?: string;
}

@Component({
  selector: 'app-texto-qrcode',
  standalone: true,
  imports: [CommonModule, QRCodeModule, MatSliderModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatMenuModule, FormsModule],
  templateUrl: './texto-qrcode.component.html',
  styleUrl: './texto-qrcode.component.css'
})
export class TextoQrcodeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('previewQrCode') previewQrCode?: ElementRef<HTMLElement>;
  @ViewChild('previewCanvas') previewCanvas?: ElementRef<HTMLCanvasElement>;

  texto: string = 'www.google.com.br';
  tituloQrCode: string = 'My QR Code';
  tamanho: number = 256;
  tamanhoTexto: number = 26;
  tamanhoLogotipo: number = 100;
  nomeLogotipo: string = '';
  private logotipo?: HTMLImageElement;
  private renderizacaoAgendada?: number;
  private novaTentativaAgendada?: number;
  private cacheQrRedondo?: { chave: string; canvas: HTMLCanvasElement };
  private readonly chaveEstilosPersonalizados = 'qrcode-estilos-personalizados';

  modalEstiloAberto = false;
  modalNomeEstiloAberto = false;
  secaoModalAtiva = 'geral';
  nomeNovoEstilo = '';
  private estiloBaseParaSalvar?: EstiloQrCode;
  novoEstilo: EstiloQrCode = this.criarEstiloInicial();

  estilos: EstiloQrCode[] = [
    {
      nome: 'Basic',
      descricao: 'Black on white, simple and direct.',
      classe: 'estilo-basico',
      colorDark: '#000000',
      colorLight: '#ffffff',
      icone: 'qr_code_2',
      glow: '#000000',
      glowSecundario: '#000000',
      exibirBorda: false,
      quantidadeBordas: 1,
      corBorda: '#000000',
      corBordaSecundaria: '#000000',
      corFundoRetangulo: '#ffffff',
      cantosArredondados: false,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#000000',
      iluminarTitulo: false,
      iluminarBordaPrincipal: false,
      iluminarBordaSecundaria: false,
      exibirTitulo: true,
      exibirRetangulo: true,
      exibirLogo: true
    },
    {
      nome: 'Dark Basic',
      descricao: 'White on navy blue, with high contrast.',
      classe: 'estilo-basico-escuro',
      colorDark: '#ffffff',
      colorLight: '#07152f',
      icone: 'dark_mode',
      glow: '#ffffff',
      glowSecundario: '#ffffff',
      exibirBorda: false,
      quantidadeBordas: 1,
      corBorda: '#ffffff',
      corBordaSecundaria: '#ffffff',
      corFundoRetangulo: '#07152f',
      cantosArredondados: false,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#ffffff',
      iluminarTitulo: false,
      iluminarBordaPrincipal: true,
      iluminarBordaSecundaria: true,
      exibirTitulo: true,
      exibirRetangulo: true,
      exibirLogo: true
    }
  ];

  estiloSelecionado: EstiloQrCode = this.estilos[0];
  isBrowser: boolean;

  constructor(private dataService: DataService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Text to QR Code');
    this.carregarEstilosPersonalizados();
  }

  ngAfterViewInit(): void {
    this.agendarRenderizacao();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.renderizacaoAgendada !== undefined) {
      window.clearTimeout(this.renderizacaoAgendada);
    }
    if (this.novaTentativaAgendada !== undefined) {
      window.clearTimeout(this.novaTentativaAgendada);
    }
  }

  selecionarEstilo(estilo: EstiloQrCode) {
    this.estiloSelecionado = estilo;
    if (estilo.personalizado) {
      if (estilo.logotipoDataUrl) {
        const imagem = new Image();
        imagem.onload = () => {
          this.logotipo = imagem;
          this.nomeLogotipo = estilo.nomeLogotipo || '';
          this.agendarRenderizacao();
        };
        imagem.src = estilo.logotipoDataUrl;
        return;
      } else {
        this.logotipo = undefined;
        this.nomeLogotipo = '';
      }
    }
    this.agendarRenderizacao();
  }

  selecionarEstiloPorTeclado(evento: KeyboardEvent, estilo: EstiloQrCode) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      this.selecionarEstilo(estilo);
    }
  }

  fixarMenuEsquerda() {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      const pane = document.querySelector('.cdk-overlay-pane:has(.menu-estilo-qrcode)') as HTMLElement | null;
      if (!pane) return;
      pane.style.left = '0.75rem';
      pane.style.right = 'auto';
      pane.style.transform = 'none';
    }, 0);
  }

  abrirModalEstilo() {
    this.novoEstilo = this.criarEstiloInicial();
    this.secaoModalAtiva = 'geral';
    this.modalEstiloAberto = true;
  }

  fecharModalEstilo() {
    this.modalEstiloAberto = false;
  }

  fecharModalPeloFundo(evento: MouseEvent) {
    if (evento.target === evento.currentTarget) {
      this.fecharModalEstilo();
    }
  }

  abrirModalSalvarEstilo(estilo: EstiloQrCode) {
    this.estiloBaseParaSalvar = estilo;
    this.nomeNovoEstilo = '';
    this.modalNomeEstiloAberto = true;
  }

  fecharModalSalvarEstilo() {
    this.modalNomeEstiloAberto = false;
    this.nomeNovoEstilo = '';
    this.estiloBaseParaSalvar = undefined;
  }

  fecharModalSalvarPeloFundo(evento: MouseEvent) {
    if (evento.target === evento.currentTarget) {
      this.fecharModalSalvarEstilo();
    }
  }

  salvarCopiaEstilo() {
    const nome = this.nomeNovoEstilo.trim();
    if (!nome || !this.estiloBaseParaSalvar) {
      return;
    }

    this.adicionarEstiloPersonalizado(
      this.criarEstiloPersonalizado(this.estiloBaseParaSalvar, nome)
    );
    this.fecharModalSalvarEstilo();
  }

  salvarNovoEstilo() {
    const nome = this.novoEstilo.nome.trim();
    if (!nome) {
      return;
    }

    this.adicionarEstiloPersonalizado(this.criarEstiloPersonalizado(this.novoEstilo, nome));
    this.fecharModalEstilo();
  }

  excluirEstiloPersonalizado(estilo: EstiloQrCode, evento: Event) {
    evento.stopPropagation();
    const index = this.estilos.indexOf(estilo);
    if (index === -1) {
      return;
    }
    this.estilos.splice(index, 1);
    if (this.estiloSelecionado === estilo) {
      this.estiloSelecionado = this.estilos[0];
    }
    this.persistirEstilosPersonalizados();
    this.agendarRenderizacao();
  }

  atualizarEstilo(estilo: EstiloQrCode) {
    if (estilo.personalizado) {
      this.persistirEstilosPersonalizados();
    }
    this.agendarRenderizacao();
  }

  private criarEstiloPersonalizado(base: EstiloQrCode, nome: string): EstiloQrCode {
    return {
      ...base,
      id: this.gerarIdEstilo(),
      nome,
      descricao: 'Style created by you.',
      classe: 'estilo-personalizado',
      icone: 'palette',
      personalizado: true,
      logotipoDataUrl: this.logotipo?.src || undefined,
      nomeLogotipo: this.nomeLogotipo || undefined
    };
  }

  private adicionarEstiloPersonalizado(estilo: EstiloQrCode) {
    const quantidadePersonalizados = this.estilos.filter(item => item.personalizado).length;
    this.estilos.splice(quantidadePersonalizados, 0, estilo);
    this.persistirEstilosPersonalizados();
    this.selecionarEstilo(estilo);
  }

  private criarEstiloInicial(): EstiloQrCode {
    return {
      nome: '',
      descricao: 'Style created by you.',
      classe: 'estilo-personalizado',
      colorDark: '#7c3aed',
      colorLight: '#fff7ff',
      icone: 'palette',
      glow: '#ec4899',
      glowSecundario: '#a855f7',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#ec4899',
      corBordaSecundaria: '#a855f7',
      corFundoRetangulo: '#fff7ff',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#581c87',
      iluminarTitulo: false,
      iluminarBordaPrincipal: true,
      iluminarBordaSecundaria: true,
      exibirTitulo: true,
      exibirRetangulo: true,
      exibirLogo: true,
      personalizado: true
    };
  }

  private carregarEstilosPersonalizados() {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const armazenados = JSON.parse(window.localStorage.getItem(this.chaveEstilosPersonalizados) ?? '[]');
      if (!Array.isArray(armazenados)) {
        return;
      }

      const estilosValidos = armazenados
        .filter(item => item && typeof item === 'object' && typeof item.nome === 'string')
        .map(item => ({ ...this.criarEstiloInicial(), ...item, classe: 'estilo-personalizado', personalizado: true }));
      this.estilos.unshift(...estilosValidos);
    } catch {
      // Mantém os estilos nativos caso o conteúdo do localStorage esteja inválido.
    }
  }

  private persistirEstilosPersonalizados() {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const personalizados = this.estilos.filter(estilo => estilo.personalizado);
      window.localStorage.setItem(this.chaveEstilosPersonalizados, JSON.stringify(personalizados));
    } catch {
      // O navegador pode bloquear ou estar sem espaço no armazenamento local.
    }
  }

  private gerarIdEstilo() {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `estilo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  selecionarLogotipo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (!arquivo || !arquivo.type.startsWith('image/')) {
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onload = () => {
        this.logotipo = imagem;
        this.nomeLogotipo = arquivo.name;
        if (this.estiloSelecionado.personalizado) {
          this.estiloSelecionado.logotipoDataUrl = imagem.src;
          this.estiloSelecionado.nomeLogotipo = arquivo.name;
          this.persistirEstilosPersonalizados();
        }
        this.agendarRenderizacao();
      };
      imagem.onerror = () => {
        input.value = '';
        this.logotipo = undefined;
        this.nomeLogotipo = '';
      };
      imagem.src = String(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  }

  removerLogotipo(input: HTMLInputElement) {
    input.value = '';
    this.logotipo = undefined;
    this.nomeLogotipo = '';
    if (this.estiloSelecionado.personalizado) {
      this.estiloSelecionado.logotipoDataUrl = undefined;
      this.estiloSelecionado.nomeLogotipo = undefined;
      this.persistirEstilosPersonalizados();
    }
    this.agendarRenderizacao();
  }

  baixarPng() {
    this.renderizarPreview();

    const destino = this.previewCanvas?.nativeElement;
    if (!destino) {
      return;
    }

    const link = document.createElement('a');
    link.href = destino.toDataURL('image/png');
    link.download = this.nomeArquivoDownload();
    link.click();
  }

  agendarRenderizacao() {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.renderizacaoAgendada !== undefined) {
      return;
    }

    if (this.novaTentativaAgendada !== undefined) {
      window.clearTimeout(this.novaTentativaAgendada);
      this.novaTentativaAgendada = undefined;
    }

    this.renderizacaoAgendada = window.setTimeout(() => {
      this.renderizacaoAgendada = undefined;
      this.renderizarPreview(0);
    }, 16);
  }

  private renderizarPreview(tentativa: number = 0) {
    const origem = this.previewQrCode?.nativeElement.querySelector('canvas');
    const destino = this.previewCanvas?.nativeElement;

    if (!origem || !destino || origem.width !== this.tamanho || origem.height !== this.tamanho) {
      if (typeof window !== 'undefined' && tentativa < 5) {
        if (this.novaTentativaAgendada !== undefined) {
          window.clearTimeout(this.novaTentativaAgendada);
        }
        this.novaTentativaAgendada = window.setTimeout(() => {
          this.novaTentativaAgendada = undefined;
          this.renderizarPreview(tentativa + 1);
        }, 40);
      }
      return;
    }

    const titulo = this.estiloSelecionado.exibirTitulo ? this.tituloQrCode.trim() : '';
    const padding = 72;
    const larguraQr = origem.width;
    const alturaQr = origem.height;
    const tituloAltura = titulo ? Math.ceil(this.tamanhoTexto * 1.75) : 0;
    const espacoTitulo = titulo ? 18 : 0;
    const dimensoesLogotipo = this.estiloSelecionado.exibirLogo ? this.calcularDimensoesLogotipo(larguraQr) : undefined;
    const espacoLogotipo = dimensoesLogotipo ? 22 : 0;
    const largura = larguraQr + padding * 2;
    const altura = alturaQr + padding * 2 + tituloAltura + espacoTitulo
      + (dimensoesLogotipo?.altura ?? 0) + espacoLogotipo;
    if (destino.width !== largura) {
      destino.width = largura;
    }
    if (destino.height !== altura) {
      destino.height = altura;
    }

    const contexto = destino.getContext('2d');
    if (!contexto) {
      return;
    }

    contexto.clearRect(0, 0, largura, altura);
    if (this.estiloSelecionado.exibirRetangulo) {
      this.desenharFundoRetangulo(contexto, largura, altura, padding);
      this.desenharContorno(contexto, largura, altura, padding);
    }

    if (titulo) {
      contexto.save();
      contexto.font = `700 ${this.tamanhoTexto}px Roboto, Arial, sans-serif`;
      contexto.fillStyle = this.estiloSelecionado.textoTitulo;
      contexto.textAlign = 'center';
      contexto.textBaseline = 'middle';
      if (this.estiloSelecionado.iluminarTitulo) {
        contexto.shadowColor = this.estiloSelecionado.glow;
        contexto.shadowBlur = 12;
      }
      contexto.fillText(titulo, largura / 2, padding + tituloAltura / 2, largura - padding);
      contexto.restore();
    }

    let yConteudo = padding + tituloAltura + espacoTitulo;
    if (this.logotipo && dimensoesLogotipo) {
      contexto.save();
      contexto.imageSmoothingEnabled = true;
      contexto.imageSmoothingQuality = 'high';
      contexto.drawImage(
        this.logotipo,
        (largura - dimensoesLogotipo.largura) / 2,
        yConteudo,
        dimensoesLogotipo.largura,
        dimensoesLogotipo.altura
      );
      contexto.restore();
      yConteudo += dimensoesLogotipo.altura + espacoLogotipo;
    }

    const xQr = padding;
    this.desenharImagemQrCode(contexto, origem, xQr, yConteudo, larguraQr, alturaQr);
  }

  private desenharImagemQrCode(
    contexto: CanvasRenderingContext2D,
    origem: HTMLCanvasElement,
    x: number,
    y: number,
    largura: number,
    altura: number
  ) {
    const imagemQrCode = this.estiloSelecionado.formatoModulo === 'redondo'
      ? this.criarImagemQrCodeComModulosRedondos(largura)
      : origem;

    if (!this.estiloSelecionado.cantosQrCodeArredondados) {
      contexto.drawImage(imagemQrCode, x, y, largura, altura);
      return;
    }

    const raio = Math.min(24, largura * 0.08, altura * 0.08);
    contexto.save();
    this.desenharRetanguloArredondado(contexto, x, y, largura, altura, raio);
    contexto.clip();
    contexto.drawImage(imagemQrCode, x, y, largura, altura);
    contexto.restore();
  }

  private criarImagemQrCodeComModulosRedondos(tamanho: number) {
    const chaveCache = [
      this.texto,
      tamanho,
      this.estiloSelecionado.colorDark,
      this.estiloSelecionado.colorLight
    ].join('|');

    if (this.cacheQrRedondo?.chave === chaveCache) {
      return this.cacheQrRedondo.canvas;
    }

    const canvas = document.createElement('canvas');
    canvas.width = tamanho;
    canvas.height = tamanho;

    const contexto = canvas.getContext('2d');
    if (!contexto) {
      return canvas;
    }

    const qrCode = criarQrCode(this.texto || ' ', { errorCorrectionLevel: 'M' });
    const margem = 2;
    const quantidadeModulos = qrCode.modules.size;
    const escala = tamanho / (quantidadeModulos + margem * 2);
    const margemEscalada = margem * escala;

    contexto.fillStyle = this.estiloSelecionado.colorLight;
    contexto.fillRect(0, 0, tamanho, tamanho);
    contexto.fillStyle = this.estiloSelecionado.colorDark;

    for (let linha = 0; linha < quantidadeModulos; linha++) {
      for (let coluna = 0; coluna < quantidadeModulos; coluna++) {
        if (!qrCode.modules.get(linha, coluna)) {
          continue;
        }

        const x = margemEscalada + coluna * escala;
        const y = margemEscalada + linha * escala;

        if (qrCode.modules.isReserved(linha, coluna)) {
          const xFinal = margemEscalada + (coluna + 1) * escala;
          const yFinal = margemEscalada + (linha + 1) * escala;
          contexto.fillRect(Math.floor(x), Math.floor(y), Math.ceil(xFinal) - Math.floor(x), Math.ceil(yFinal) - Math.floor(y));
          continue;
        }

        contexto.beginPath();
        contexto.arc(x + escala / 2, y + escala / 2, escala * 0.42, 0, Math.PI * 2);
        contexto.fill();
      }
    }

    this.cacheQrRedondo = { chave: chaveCache, canvas };
    return canvas;
  }

  private calcularDimensoesLogotipo(larguraQr: number) {
    if (!this.logotipo) {
      return undefined;
    }

    const larguraOriginal = this.logotipo.naturalWidth || this.logotipo.width;
    const alturaOriginal = this.logotipo.naturalHeight || this.logotipo.height;
    if (!larguraOriginal || !alturaOriginal) {
      return undefined;
    }

    const fatorTamanho = this.tamanhoLogotipo / 100;
    const larguraMaxima = Math.min(larguraQr * 0.42, 144) * fatorTamanho;
    const alturaMaxima = 72 * fatorTamanho;
    const escala = Math.min(larguraMaxima / larguraOriginal, alturaMaxima / alturaOriginal);

    return {
      largura: Math.round(larguraOriginal * escala),
      altura: Math.round(alturaOriginal * escala)
    };
  }

  private desenharContorno(contexto: CanvasRenderingContext2D, largura: number, altura: number, padding: number) {
    if (!this.estiloSelecionado.exibirBorda) {
      return;
    }

    const raio = this.estiloSelecionado.cantosArredondados ? 24 : 0;
    const x = padding / 2;
    const y = padding / 2;
    const w = largura - padding;
    const h = altura - padding;

    contexto.save();
    contexto.lineWidth = 3;
    contexto.shadowColor = this.estiloSelecionado.iluminarBordaPrincipal ? this.estiloSelecionado.glow : 'transparent';
    contexto.shadowBlur = this.estiloSelecionado.iluminarBordaPrincipal ? 26 : 0;
    contexto.strokeStyle = this.estiloSelecionado.corBorda;
    this.desenharRetanguloArredondado(contexto, x, y, w, h, raio);
    contexto.stroke();

    if (this.estiloSelecionado.quantidadeBordas === 1) {
      contexto.restore();
      return;
    }

    contexto.shadowColor = this.estiloSelecionado.iluminarBordaSecundaria ? this.estiloSelecionado.glowSecundario : 'transparent';
    contexto.shadowBlur = this.estiloSelecionado.iluminarBordaSecundaria ? 34 : 0;
    contexto.strokeStyle = this.estiloSelecionado.corBordaSecundaria;
    contexto.lineWidth = 1.5;
    this.desenharRetanguloArredondado(contexto, x + 8, y + 8, w - 16, h - 16, Math.max(0, raio - 6));
    contexto.stroke();
    contexto.restore();
  }

  private desenharFundoRetangulo(contexto: CanvasRenderingContext2D, largura: number, altura: number, padding: number) {
    const margem = padding / 2;
    const raio = this.estiloSelecionado.cantosArredondados ? 24 : 0;
    contexto.save();
    contexto.fillStyle = this.estiloSelecionado.corFundoRetangulo;
    this.desenharRetanguloArredondado(contexto, margem, margem, largura - padding, altura - padding, raio);
    contexto.fill();
    contexto.restore();
  }

  private desenharRetanguloArredondado(contexto: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    contexto.beginPath();
    contexto.moveTo(x + r, y);
    contexto.lineTo(x + w - r, y);
    contexto.quadraticCurveTo(x + w, y, x + w, y + r);
    contexto.lineTo(x + w, y + h - r);
    contexto.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    contexto.lineTo(x + r, y + h);
    contexto.quadraticCurveTo(x, y + h, x, y + h - r);
    contexto.lineTo(x, y + r);
    contexto.quadraticCurveTo(x, y, x + r, y);
    contexto.closePath();
  }

  private nomeArquivoDownload(): string {
    const titulo = this.tituloQrCode.trim() || 'qrcode';
    return titulo.toLowerCase().replace(/\s+/g, '-') + '.png';
  }
}
