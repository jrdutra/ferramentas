import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { DataService } from '../../data.service';

interface EstiloQrCode {
  nome: string;
  descricao: string;
  classe: string;
  colorDark: string;
  colorLight: string;
  icone: string;
  glow: string;
  glowSecundario: string;
  exibirBorda: boolean;
  corBorda: string;
  corBordaSecundaria: string;
  corFundoRetangulo: string;
  cantosArredondados: boolean;
  textoTitulo: string;
}

@Component({
  selector: 'app-texto-qrcode',
  standalone: true,
  imports: [CommonModule, QRCodeModule, MatSliderModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatMenuModule, FormsModule],
  templateUrl: './texto-qrcode.component.html',
  styleUrl: './texto-qrcode.component.css'
})
export class TextoQrcodeComponent implements AfterViewInit {
  @ViewChild('previewQrCode') previewQrCode?: ElementRef<HTMLElement>;
  @ViewChild('previewCanvas') previewCanvas?: ElementRef<HTMLCanvasElement>;

  texto: string = 'www.google.com.br';
  tituloQrCode: string = 'Meu QRCode';
  tamanho: number = 256;

  estilos: EstiloQrCode[] = [
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
      corBorda: '#5b7cff',
      corBordaSecundaria: '#b625ff',
      corFundoRetangulo: '#111827',
      cantosArredondados: true,
      textoTitulo: '#f8fbff'
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
      corBorda: '#00d0ff',
      corBordaSecundaria: '#ff2db2',
      corFundoRetangulo: '#08142d',
      cantosArredondados: true,
      textoTitulo: '#f4fbff'
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
      corBorda: '#ff8bd6',
      corBordaSecundaria: '#8ee8ff',
      corFundoRetangulo: '#fff4fb',
      cantosArredondados: true,
      textoTitulo: '#4b2767'
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
      corBorda: '#8ee8ff',
      corBordaSecundaria: '#b625ff',
      corFundoRetangulo: '#101125',
      cantosArredondados: true,
      textoTitulo: '#ffffff'
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
      corBorda: '#5b7cff',
      corBordaSecundaria: '#7d4cff',
      corFundoRetangulo: '#111827',
      cantosArredondados: true,
      textoTitulo: '#e5e7ff'
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
      corBorda: '#5b7cff',
      corBordaSecundaria: '#8ee8ff',
      corFundoRetangulo: '#ffffff',
      cantosArredondados: true,
      textoTitulo: '#111827'
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
      corBorda: '#0ea5e9',
      corBordaSecundaria: '#7dd3fc',
      corFundoRetangulo: '#eaf7ff',
      cantosArredondados: true,
      textoTitulo: '#0f3d70'
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
      corBorda: '#ff2db2',
      corBordaSecundaria: '#8b5cf6',
      corFundoRetangulo: '#1a0822',
      cantosArredondados: true,
      textoTitulo: '#fff4fb'
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
      corBorda: '#38bdf8',
      corBordaSecundaria: '#a78bfa',
      corFundoRetangulo: '#eef7ff',
      cantosArredondados: true,
      textoTitulo: '#102452'
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
      corBorda: '#b625ff',
      corBordaSecundaria: '#ff2db2',
      corFundoRetangulo: '#190a2d',
      cantosArredondados: true,
      textoTitulo: '#f5edff'
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
      corBorda: '#94a3b8',
      corBordaSecundaria: '#cbd5e1',
      corFundoRetangulo: '#f3f4f6',
      cantosArredondados: false,
      textoTitulo: '#263241'
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
      corBorda: '#7cffd9',
      corBordaSecundaria: '#00d0ff',
      corFundoRetangulo: '#04120f',
      cantosArredondados: false,
      textoTitulo: '#d9fff5'
    }
  ];

  estiloSelecionado: EstiloQrCode = this.estilos[1];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Texto para QrCode');
  }

  ngAfterViewInit(): void {
    this.agendarRenderizacao();
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

    window.setTimeout(() => this.renderizarPreview(0), 80);
  }

  private renderizarPreview(tentativa: number = 0) {
    const origem = this.previewQrCode?.nativeElement.querySelector('canvas');
    const destino = this.previewCanvas?.nativeElement;

    if (!origem || !destino) {
      if (typeof window !== 'undefined' && tentativa < 5) {
        window.setTimeout(() => this.renderizarPreview(tentativa + 1), 80);
      }
      return;
    }

    const titulo = this.tituloQrCode.trim();
    const padding = 72;
    const tituloAltura = titulo ? 46 : 0;
    const espacoTitulo = titulo ? 22 : 0;
    const larguraQr = origem.width;
    const alturaQr = origem.height;
    const largura = larguraQr + padding * 2;
    const altura = alturaQr + padding * 2 + tituloAltura + espacoTitulo;
    destino.width = largura;
    destino.height = altura;

    const contexto = destino.getContext('2d');
    if (!contexto) {
      return;
    }

    contexto.clearRect(0, 0, largura, altura);
    this.desenharFundoRetangulo(contexto, largura, altura, padding);
    this.desenharContorno(contexto, largura, altura, padding);

    if (titulo) {
      contexto.font = '700 26px Roboto, Arial, sans-serif';
      contexto.fillStyle = this.estiloSelecionado.textoTitulo;
      contexto.textAlign = 'center';
      contexto.textBaseline = 'middle';
      contexto.shadowColor = this.estiloSelecionado.glow;
      contexto.shadowBlur = 12;
      contexto.fillText(titulo, largura / 2, padding + tituloAltura / 2, largura - padding);
      contexto.shadowBlur = 0;
    }

    const xQr = padding;
    const yQr = padding + tituloAltura + espacoTitulo;
    contexto.drawImage(origem, xQr, yQr);
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
