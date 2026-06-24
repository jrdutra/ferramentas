import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
  tituloQrCode: string = 'Meu QRCode';
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
  nomeNovoEstilo = '';
  private estiloBaseParaSalvar?: EstiloQrCode;
  novoEstilo: EstiloQrCode = this.criarEstiloInicial();

  estilos: EstiloQrCode[] = [
    {
      nome: 'Básico',
      descricao: 'Preto no branco, simples e direto.',
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
      iluminarTitulo: false
    },
    {
      nome: 'Básico Escuro',
      descricao: 'Branco sobre azul-marinho, com alto contraste.',
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
      iluminarTitulo: false
    },
    {
      nome: 'Escuro classico',
      descricao: 'Alto contraste, simples e seguro para leitura.',
      classe: 'estilo-escuro-classico',
      colorDark: '#050816',
      colorLight: '#f8fbff',
      icone: 'contrast',
      glow: '#5b7cff',
      glowSecundario: '#b625ff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#5b7cff',
      corBordaSecundaria: '#b625ff',
      corFundoRetangulo: '#111827',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#f8fbff',
      iluminarTitulo: false
    },
    {
      nome: 'Neon da pagina',
      descricao: 'Azul, roxo e rosa com energia do tema atual.',
      classe: 'estilo-neon-pagina',
      colorDark: '#8ee8ff',
      colorLight: '#050816',
      icone: 'auto_awesome',
      glow: '#00d0ff',
      glowSecundario: '#ff2db2',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#00d0ff',
      corBordaSecundaria: '#ff2db2',
      corFundoRetangulo: '#08142d',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#f4fbff',
      iluminarTitulo: false
    },
    {
      nome: 'Fofo pastel',
      descricao: 'Visual claro, macio e amigavel.',
      classe: 'estilo-fofo-pastel',
      colorDark: '#7d4cff',
      colorLight: '#fff4fb',
      icone: 'favorite',
      glow: '#ff8bd6',
      glowSecundario: '#8ee8ff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#ff8bd6',
      corBordaSecundaria: '#8ee8ff',
      corFundoRetangulo: '#fff4fb',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#4b2767',
      iluminarTitulo: false
    },
    {
      nome: 'Dark iluminado',
      descricao: 'Fundo escuro com brilho marcante.',
      classe: 'estilo-dark-iluminado',
      colorDark: '#ffffff',
      colorLight: '#101125',
      icone: 'flare',
      glow: '#8ee8ff',
      glowSecundario: '#b625ff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#8ee8ff',
      corBordaSecundaria: '#b625ff',
      corFundoRetangulo: '#101125',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#ffffff',
      iluminarTitulo: false
    },
    {
      nome: 'Dark discreto',
      descricao: 'Escuro, elegante e pouco iluminado.',
      classe: 'estilo-dark-discreto',
      colorDark: '#d7dcff',
      colorLight: '#111827',
      icone: 'nightlight',
      glow: '#5b7cff',
      glowSecundario: '#7d4cff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#5b7cff',
      corBordaSecundaria: '#7d4cff',
      corFundoRetangulo: '#111827',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#e5e7ff',
      iluminarTitulo: false
    },
    {
      nome: 'Claro limpo',
      descricao: 'Fundo claro com leitura objetiva.',
      classe: 'estilo-claro-limpo',
      colorDark: '#111827',
      colorLight: '#ffffff',
      icone: 'wb_sunny',
      glow: '#5b7cff',
      glowSecundario: '#8ee8ff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#5b7cff',
      corBordaSecundaria: '#8ee8ff',
      corFundoRetangulo: '#ffffff',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#111827',
      iluminarTitulo: false
    },
    {
      nome: 'Claro azul',
      descricao: 'Claro, tecnico e levemente colorido.',
      classe: 'estilo-claro-azul',
      colorDark: '#0f3d70',
      colorLight: '#eaf7ff',
      icone: 'water_drop',
      glow: '#0ea5e9',
      glowSecundario: '#7dd3fc',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#0ea5e9',
      corBordaSecundaria: '#7dd3fc',
      corFundoRetangulo: '#eaf7ff',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#0f3d70',
      iluminarTitulo: false
    },
    {
      nome: 'Rosa eletrico',
      descricao: 'Vivo, moderno e com bastante personalidade.',
      classe: 'estilo-rosa-eletrico',
      colorDark: '#ff2db2',
      colorLight: '#1a0822',
      icone: 'bolt',
      glow: '#ff2db2',
      glowSecundario: '#8b5cf6',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#ff2db2',
      corBordaSecundaria: '#8b5cf6',
      corFundoRetangulo: '#1a0822',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#fff4fb',
      iluminarTitulo: false
    },
    {
      nome: 'Aurora fria',
      descricao: 'Mistura suave de azul, lilas e verde frio.',
      classe: 'estilo-aurora-fria',
      colorDark: '#2f5cff',
      colorLight: '#eef7ff',
      icone: 'waves',
      glow: '#38bdf8',
      glowSecundario: '#a78bfa',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#38bdf8',
      corBordaSecundaria: '#a78bfa',
      corFundoRetangulo: '#eef7ff',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#102452',
      iluminarTitulo: false
    },
    {
      nome: 'Luxo violeta',
      descricao: 'Escuro elegante com violeta profundo.',
      classe: 'estilo-luxo-violeta',
      colorDark: '#f5edff',
      colorLight: '#190a2d',
      icone: 'diamond',
      glow: '#b625ff',
      glowSecundario: '#ff2db2',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#b625ff',
      corBordaSecundaria: '#ff2db2',
      corFundoRetangulo: '#190a2d',
      cantosArredondados: true,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#f5edff',
      iluminarTitulo: false
    },
    {
      nome: 'Minimal cinza',
      descricao: 'Claro, neutro e profissional.',
      classe: 'estilo-minimal-cinza',
      colorDark: '#263241',
      colorLight: '#f3f4f6',
      icone: 'crop_square',
      glow: '#94a3b8',
      glowSecundario: '#cbd5e1',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#94a3b8',
      corBordaSecundaria: '#cbd5e1',
      corFundoRetangulo: '#f3f4f6',
      cantosArredondados: false,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#263241',
      iluminarTitulo: false
    },
    {
      nome: 'Terminal neon',
      descricao: 'Inspirado em terminal, com glow futurista.',
      classe: 'estilo-terminal-neon',
      colorDark: '#7cffd9',
      colorLight: '#04120f',
      icone: 'terminal',
      glow: '#7cffd9',
      glowSecundario: '#00d0ff',
      exibirBorda: true,
      quantidadeBordas: 1,
      corBorda: '#7cffd9',
      corBordaSecundaria: '#00d0ff',
      corFundoRetangulo: '#04120f',
      cantosArredondados: false,
      cantosQrCodeArredondados: false,
      formatoModulo: 'quadrado',
      textoTitulo: '#d9fff5',
      iluminarTitulo: false
    }
  ];

  estiloSelecionado: EstiloQrCode = this.estilos[3];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Texto para QrCode');
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
    this.agendarRenderizacao();
  }

  selecionarEstiloPorTeclado(evento: KeyboardEvent, estilo: EstiloQrCode) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      this.selecionarEstilo(estilo);
    }
  }

  abrirModalEstilo() {
    this.novoEstilo = this.criarEstiloInicial();
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
      descricao: 'Estilo criado por você.',
      classe: 'estilo-personalizado',
      icone: 'palette',
      personalizado: true
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
      descricao: 'Estilo criado por você.',
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

    const titulo = this.tituloQrCode.trim();
    const padding = 72;
    const larguraQr = origem.width;
    const alturaQr = origem.height;
    const tituloAltura = titulo ? Math.ceil(this.tamanhoTexto * 1.75) : 0;
    const espacoTitulo = titulo ? 18 : 0;
    const dimensoesLogotipo = this.calcularDimensoesLogotipo(larguraQr);
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
    this.desenharFundoRetangulo(contexto, largura, altura, padding);
    this.desenharContorno(contexto, largura, altura, padding);

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
    contexto.shadowColor = this.estiloSelecionado.glow;
    contexto.shadowBlur = 26;
    contexto.strokeStyle = this.estiloSelecionado.corBorda;
    this.desenharRetanguloArredondado(contexto, x, y, w, h, raio);
    contexto.stroke();

    if (this.estiloSelecionado.quantidadeBordas === 1) {
      contexto.restore();
      return;
    }

    contexto.shadowColor = this.estiloSelecionado.glowSecundario;
    contexto.shadowBlur = 34;
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

  private nomeArquivoDownload() {
    const nome = this.tituloQrCode.trim() || 'qrcode';
    return `${nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'qrcode'}.png`;
  }
}
