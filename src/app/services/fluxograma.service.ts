import { Injectable } from '@angular/core';

/** Tipos de forma suportados pelo editor de fluxograma. */
export type FormaTipo =
  | 'retangulo'
  | 'arredondado'
  | 'losango'
  | 'circulo'
  | 'elipse'
  | 'paralelogramo'
  | 'terminador'
  | 'hexagono'
  | 'cilindro'
  | 'subprocesso'
  | 'seta'
  | 'container'
  | 'frame'
  | 'grupo'
  | 'swimlane'
  | 'texto'
  | 'notas'
  | 'imagem';

/** Estilo do traço das bordas e linhas. */
export type TipoTraco = 'solido' | 'giz' | 'lapis';
export type TipoTextura = 'diagonal' | 'cruzada' | 'pontos' | 'grade';
export type TipoFonte = 'sans' | 'serif' | 'cursiva';
export type TipoAlinhamentoTexto = 'esquerda' | 'centro' | 'direita';
export type TipoAlinhamentoVerticalTexto = 'topo' | 'meio' | 'rodape';

export const TAMANHO_SETA_PADRAO = 14;

export interface NoFluxograma {
  id: string;
  tipo: FormaTipo;
  x: number;
  y: number;
  largura: number;
  altura: number;
  texto: string;
  corFundo: string;
  corBorda: string;
  espessuraBorda: number;
  corTexto: string;
  tamanhoFonte?: number;
  tipoTraco: TipoTraco;
  alinhamentoTexto?: TipoAlinhamentoTexto;
  alinhamentoVerticalTexto?: TipoAlinhamentoVerticalTexto;
  /** Data URL da imagem (apenas para o tipo 'imagem'). */
  src?: string;
  /** Escala da imagem dentro do quadro do ícone (0..1). */
  escalaImagem?: number;
  /** Raio dos cantos do quadro de imagem/icone, em pixels. */
  raioBordaImagem?: number;
  /** Preenchimento hachurado opcional (usa a cor da borda). */
  textura?: TipoTextura;
  /** Família tipográfica do texto (sem serifa, serifada ou cursiva). */
  fonte?: TipoFonte;
  /** Id da camada (layer) à qual o nó pertence. Ausente = primeira camada. */
  camada?: string;
}

export interface ConexaoFluxograma {
  id: string;
  de: string;
  para: string;
  texto: string;
  cor: string;
  espessura: number;
  tracejada: boolean;
  setaInicio: boolean;
  setaFim: boolean;
  tamanhoSeta: number;
  curvatura?: number;
  pontos?: { x: number; y: number }[];
  estilo?: 'reto' | 'arredondado' | 'curvo';
  raioCanto?: number;
  /** Seta com área (bloco): corpo espesso + flecha triangular. */
  bloco?: boolean;
  /** Largura do corpo da seta de bloco, em pixels. */
  larguraCorpo?: number;
  /** Tamanho da flecha (cabeça) da seta de bloco, em pixels. */
  tamanhoFlecha?: number;
  /** Preenchimento hachurado opcional (usa a cor da linha). */
  textura?: TipoTextura;
  tipoTraco: TipoTraco;
  /** Id da camada (layer) à qual a conexão pertence. Ausente = primeira camada. */
  camada?: string;
}

export interface Fluxograma {
  nos: NoFluxograma[];
  conexoes: ConexaoFluxograma[];
}

/** Mapa tipo interno -> tokens de abertura/fechamento do Mermaid. */
const MERMAID_FORMAS: Record<FormaTipo, { abre: string; fecha: string }> = {
  retangulo: { abre: '[', fecha: ']' },
  arredondado: { abre: '(', fecha: ')' },
  terminador: { abre: '([', fecha: '])' },
  losango: { abre: '{', fecha: '}' },
  hexagono: { abre: '{{', fecha: '}}' },
  paralelogramo: { abre: '[/', fecha: '/]' },
  cilindro: { abre: '[(', fecha: ')]' },
  // Sem forma nativa equivalente; o desenho real e preservado no meta/XML.
  seta: { abre: '[', fecha: ']' },
  circulo: { abre: '((', fecha: '))' },
  // Sem forma nativa equivalente — exportado como círculo, tipo real preservado no meta.
  elipse: { abre: '((', fecha: '))' },
  subprocesso: { abre: '[[', fecha: ']]' },
  // Contêineres não têm forma nativa — exportados como retângulo; tipo real no meta.
  container: { abre: '[', fecha: ']' },
  frame: { abre: '[', fecha: ']' },
  grupo: { abre: '[', fecha: ']' },
  swimlane: { abre: '[', fecha: ']' },
  texto: { abre: '[', fecha: ']' },
  notas: { abre: '[', fecha: ']' },
  imagem: { abre: '[', fecha: ']' },
};

@Injectable({ providedIn: 'root' })
export class FluxogramaService {

  // ─────────────────────────── MERMAID ───────────────────────────

  /**
   * Gera texto Mermaid (flowchart) válido, com diretivas `style`/`linkStyle`
   * para cores e um comentário `%% meta:` com posições e tipos exatos, o que
   * permite reimportar o diagrama sem perda de informação.
   */
  paraMermaid(fluxo: Fluxograma): string {
    const linhas: string[] = ['flowchart TD'];

    for (const no of fluxo.nos) {
      const { abre, fecha } = MERMAID_FORMAS[no.tipo];
      const rotulo = this.escapaMermaid(no.texto || ' ');
      linhas.push(`    ${no.id}${abre}"${rotulo}"${fecha}`);
    }

    fluxo.conexoes.forEach((c) => {
      const traco = c.tracejada ? '-.' : '--';
      const fim = c.setaFim ? '>' : '-';
      const inicio = c.setaInicio ? '<' : '';
      const meio = c.tracejada ? '.' : '-';
      const seta = `${inicio}${traco}${meio}${fim}`;
      const rotulo = c.texto ? `|"${this.escapaMermaid(c.texto)}"|` : '';
      linhas.push(`    ${c.de} ${seta}${rotulo} ${c.para}`);
    });

    // Estilos de nós (renderizáveis em qualquer visualizador Mermaid).
    for (const no of fluxo.nos) {
      linhas.push(
        `    style ${no.id} fill:${no.corFundo},stroke:${no.corBorda},stroke-width:${no.espessuraBorda}px,color:${no.corTexto}`,
      );
    }
    fluxo.conexoes.forEach((c, i) => {
      const dash = c.tracejada ? ',stroke-dasharray:6 4' : '';
      linhas.push(`    linkStyle ${i} stroke:${c.cor},stroke-width:${c.espessura}px${dash}`);
    });

    // Metadados para reimportação fiel.
    linhas.push('%% meta:' + JSON.stringify(fluxo));

    return linhas.join('\n');
  }

  /** Interpreta texto Mermaid gerando um Fluxograma. Usa o meta quando presente. */
  deMermaid(texto: string): Fluxograma {
    const linhaMeta = texto.split(/\r?\n/).find((l) => l.trim().startsWith('%% meta:'));
    if (linhaMeta) {
      try {
        const json = linhaMeta.trim().substring('%% meta:'.length);
        const fluxo = JSON.parse(json) as Fluxograma;
        if (Array.isArray(fluxo.nos) && Array.isArray(fluxo.conexoes)) {
          return this.normaliza(fluxo);
        }
      } catch {
        /* segue para o parser textual */
      }
    }
    return this.parseMermaidTextual(texto);
  }

  /** Parser textual de Mermaid (para diagramas vindos de fora, sem meta). */
  private parseMermaidTextual(texto: string): Fluxograma {
    const nos = new Map<string, NoFluxograma>();
    const conexoes: ConexaoFluxograma[] = [];
    const linhas = texto.split(/\r?\n/);

    // Ordem importa: tokens mais longos primeiro para não casar parcialmente.
    const formasOrdenadas: [FormaTipo, string, string][] = [
      ['hexagono', '{{', '}}'],
      ['cilindro', '[(', ')]'],
      ['circulo', '((', '))'],
      ['terminador', '([', '])'],
      ['subprocesso', '[[', ']]'],
      ['paralelogramo', '[/', '/]'],
      ['retangulo', '[', ']'],
      ['arredondado', '(', ')'],
      ['losango', '{', '}'],
    ];

    const garanteNo = (id: string): NoFluxograma => {
      let no = nos.get(id);
      if (!no) {
        no = this.noPadrao(id, id);
        nos.set(id, no);
      }
      return no;
    };

    const extraiNo = (fragmento: string): string | null => {
      const t = fragmento.trim();
      const m = t.match(/^([A-Za-z0-9_]+)\s*(.*)$/);
      if (!m) return null;
      const id = m[1];
      const resto = m[2];
      for (const [tipo, abre, fecha] of formasOrdenadas) {
        if (resto.startsWith(abre) && resto.endsWith(fecha) && resto.length >= abre.length + fecha.length) {
          let interno = resto.substring(abre.length, resto.length - fecha.length).trim();
          interno = interno.replace(/^"(.*)"$/s, '$1').replace(/^'(.*)'$/s, '$1');
          const no = garanteNo(id);
          no.tipo = tipo;
          no.texto = this.desescapaMermaid(interno);
          return id;
        }
      }
      if (/^[A-Za-z0-9_]+$/.test(t)) {
        garanteNo(t);
        return t;
      }
      return null;
    };

    const regexAresta = /^(.*?)(<?[-.]{1,}[.-]?>?|<?[=]{2,}>?)(?:\|"?(.*?)"?\|)?(.*)$/;

    for (let bruta of linhas) {
      const linha = bruta.trim();
      if (!linha || linha.startsWith('%%') || /^(flowchart|graph|subgraph|end|style|linkStyle|classDef|class|direction)\b/.test(linha)) {
        continue;
      }

      const conector = linha.match(/<?-{2,}>?|<?-\.-*>?|<?\.-+>?|<?={2,}>?/);
      if (conector && /-|\./.test(conector[0]) && (linha.includes('--') || linha.includes('-.') || linha.includes('.-'))) {
        const m = linha.match(regexAresta);
        if (m) {
          const idDe = extraiNo(m[1]);
          const idPara = extraiNo(m[4]);
          const seta = m[2] || '';
          const rotulo = (m[3] || '').trim();
          if (idDe && idPara) {
            conexoes.push({
              id: this.gerarId('e'),
              de: idDe,
              para: idPara,
              texto: this.desescapaMermaid(rotulo.replace(/^"(.*)"$/, '$1')),
              cor: '#00ffd1',
              espessura: 2,
              tracejada: seta.includes('.'),
              setaInicio: seta.startsWith('<'),
              setaFim: seta.endsWith('>'),
              tamanhoSeta: TAMANHO_SETA_PADRAO,
              curvatura: 0,
              tipoTraco: 'solido',
            });
            continue;
          }
        }
      }
      // Linha de declaração de nó isolado.
      extraiNo(linha);
    }

    const fluxo: Fluxograma = { nos: Array.from(nos.values()), conexoes };
    this.autoLayout(fluxo);
    return fluxo;
  }

  // ──────────────────────────────── XML ────────────────────────────────

  paraXml(fluxo: Fluxograma): string {
    const esc = (s: string) =>
      String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const linhas: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<fluxograma>', '  <nos>'];
    for (const n of fluxo.nos) {
      linhas.push(
        `    <no id="${esc(n.id)}" tipo="${n.tipo}" x="${n.x}" y="${n.y}" largura="${n.largura}" altura="${n.altura}"` +
          ` corFundo="${esc(n.corFundo)}" corBorda="${esc(n.corBorda)}" espessuraBorda="${n.espessuraBorda}"` +
          ` corTexto="${esc(n.corTexto)}" tamanhoFonte="${this.normalizaTamanhoFonte(n.tamanhoFonte)}" tipoTraco="${n.tipoTraco}"` +
          (n.alinhamentoTexto ? ` alinhamentoTexto="${n.alinhamentoTexto}"` : '') +
          (n.alinhamentoVerticalTexto ? ` alinhamentoVerticalTexto="${n.alinhamentoVerticalTexto}"` : '') +
          (n.src ? ` src="${esc(n.src)}"` : '') +
          (n.escalaImagem != null ? ` escalaImagem="${n.escalaImagem}"` : '') +
          (n.raioBordaImagem != null ? ` raioBordaImagem="${n.raioBordaImagem}"` : '') +
          (n.textura ? ` textura="${n.textura}"` : '') +
          (n.fonte ? ` fonte="${n.fonte}"` : '') +
          (n.camada ? ` camada="${esc(n.camada)}"` : '') +
          `>${esc(n.texto)}</no>`,
      );
    }
    linhas.push('  </nos>', '  <conexoes>');
    for (const c of fluxo.conexoes) {
      linhas.push(
        `    <conexao id="${esc(c.id)}" de="${esc(c.de)}" para="${esc(c.para)}" cor="${esc(c.cor)}"` +
          ` espessura="${c.espessura}" tracejada="${c.tracejada}" setaInicio="${c.setaInicio}" setaFim="${c.setaFim}"` +
          ` tamanhoSeta="${this.normalizaTamanhoSeta(c.tamanhoSeta)}"` +
          ` curvatura="${c.curvatura ?? 0}"` +
          (c.pontos && c.pontos.length ? ` pontos="${c.pontos.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(' ')}"` : '') +
          (c.estilo ? ` estilo="${c.estilo}"` : '') +
          (c.raioCanto != null ? ` raioCanto="${c.raioCanto}"` : '') +
          (c.bloco ? ` bloco="true"` : '') +
          (c.larguraCorpo != null ? ` larguraCorpo="${c.larguraCorpo}"` : '') +
          (c.tamanhoFlecha != null ? ` tamanhoFlecha="${c.tamanhoFlecha}"` : '') +
          (c.textura ? ` textura="${c.textura}"` : '') +
          (c.camada ? ` camada="${esc(c.camada)}"` : '') +
          ` tipoTraco="${c.tipoTraco}">${esc(c.texto)}</conexao>`,
      );
    }
    linhas.push('  </conexoes>', '</fluxograma>');
    return linhas.join('\n');
  }

  deXml(texto: string): Fluxograma {
    if (typeof DOMParser === 'undefined') {
      throw new Error('Importação de XML disponível apenas no navegador.');
    }
    const doc = new DOMParser().parseFromString(texto, 'application/xml');
    if (doc.querySelector('parsererror')) {
      throw new Error('XML inválido.');
    }

    const nos: NoFluxograma[] = [];
    doc.querySelectorAll('no').forEach((el) => {
      const id = el.getAttribute('id') || this.gerarId('n');
      const base = this.noPadrao(id, el.textContent || '');
      nos.push({
        ...base,
        tipo: (el.getAttribute('tipo') as FormaTipo) || 'retangulo',
        x: this.num(el.getAttribute('x'), base.x),
        y: this.num(el.getAttribute('y'), base.y),
        largura: this.num(el.getAttribute('largura'), base.largura),
        altura: this.num(el.getAttribute('altura'), base.altura),
        corFundo: el.getAttribute('corFundo') || base.corFundo,
        corBorda: el.getAttribute('corBorda') || base.corBorda,
        espessuraBorda: this.num(el.getAttribute('espessuraBorda'), base.espessuraBorda),
        corTexto: el.getAttribute('corTexto') || base.corTexto,
        tamanhoFonte: this.normalizaTamanhoFonte(el.getAttribute('tamanhoFonte')),
        tipoTraco: (el.getAttribute('tipoTraco') as TipoTraco) || 'solido',
        alinhamentoTexto: (el.getAttribute('alinhamentoTexto') as TipoAlinhamentoTexto) || undefined,
        alinhamentoVerticalTexto: (el.getAttribute('alinhamentoVerticalTexto') as TipoAlinhamentoVerticalTexto) || undefined,
        src: el.getAttribute('src') || undefined,
        escalaImagem: el.getAttribute('escalaImagem') != null ? this.normalizaEscalaImagem(el.getAttribute('escalaImagem')) : undefined,
        raioBordaImagem: el.getAttribute('raioBordaImagem') != null ? this.normalizaRaioBordaImagem(el.getAttribute('raioBordaImagem')) : undefined,
        textura: (el.getAttribute('textura') as TipoTextura) || undefined,
        fonte: (el.getAttribute('fonte') as TipoFonte) || undefined,
        camada: el.getAttribute('camada') || undefined,
      });
    });

    const conexoes: ConexaoFluxograma[] = [];
    doc.querySelectorAll('conexao').forEach((el) => {
      conexoes.push({
        id: el.getAttribute('id') || this.gerarId('e'),
        de: el.getAttribute('de') || '',
        para: el.getAttribute('para') || '',
        texto: el.textContent || '',
        cor: el.getAttribute('cor') || '#00ffd1',
        espessura: this.num(el.getAttribute('espessura'), 2),
        tracejada: el.getAttribute('tracejada') === 'true',
        setaInicio: el.getAttribute('setaInicio') === 'true',
        setaFim: el.getAttribute('setaFim') !== 'false',
        tamanhoSeta: this.normalizaTamanhoSeta(el.getAttribute('tamanhoSeta')),
        curvatura: this.num(el.getAttribute('curvatura'), 0),
        pontos: this.parsePontos(el.getAttribute('pontos')),
        estilo: (el.getAttribute('estilo') as 'reto' | 'arredondado' | 'curvo') || undefined,
        raioCanto: el.getAttribute('raioCanto') != null ? this.num(el.getAttribute('raioCanto'), 10) : undefined,
        bloco: el.getAttribute('bloco') === 'true' || undefined,
        larguraCorpo: el.getAttribute('larguraCorpo') != null ? this.num(el.getAttribute('larguraCorpo'), 16) : undefined,
        tamanhoFlecha: el.getAttribute('tamanhoFlecha') != null ? this.num(el.getAttribute('tamanhoFlecha'), 26) : undefined,
        textura: (el.getAttribute('textura') as TipoTextura) || undefined,
        tipoTraco: (el.getAttribute('tipoTraco') as TipoTraco) || 'solido',
        camada: el.getAttribute('camada') || undefined,
      });
    });

    const fluxo: Fluxograma = { nos, conexoes };
    if (nos.every((n) => n.x === 0 && n.y === 0)) this.autoLayout(fluxo);
    return this.normaliza(fluxo);
  }

  // ──────────────────────────── Auxiliares ────────────────────────────

  noPadrao(id: string, texto: string): NoFluxograma {
    return {
      id,
      tipo: 'retangulo',
      x: 0,
      y: 0,
      largura: 150,
      altura: 70,
      texto,
      corFundo: 'transparent',
      corBorda: '#00ffd1',
      espessuraBorda: 2,
      corTexto: '#f4fbff',
      tamanhoFonte: 13,
      tipoTraco: 'solido',
      alinhamentoTexto: 'centro',
      alinhamentoVerticalTexto: 'meio',
    };
  }

  gerarId(prefixo: string): string {
    return prefixo + Math.random().toString(36).slice(2, 8);
  }

  /** Distribui nós sem posição em uma grade simples. */
  private autoLayout(fluxo: Fluxograma): void {
    const semPos = fluxo.nos.filter((n) => n.x === 0 && n.y === 0);
    const colunas = Math.max(1, Math.ceil(Math.sqrt(semPos.length)));
    semPos.forEach((n, i) => {
      n.x = 80 + (i % colunas) * 220;
      n.y = 80 + Math.floor(i / colunas) * 140;
    });
  }

  /** Garante campos válidos após import. */
  private normaliza(fluxo: Fluxograma): Fluxograma {
    fluxo.nos.forEach((n) => {
      const base = this.noPadrao(n.id, n.texto);
      n.largura = n.largura || base.largura;
      n.altura = n.altura || base.altura;
      n.espessuraBorda = n.espessuraBorda || base.espessuraBorda;
      n.corFundo = n.corFundo || base.corFundo;
      n.corBorda = n.corBorda || base.corBorda;
      n.corTexto = n.corTexto || base.corTexto;
      n.tamanhoFonte = this.normalizaTamanhoFonte(n.tamanhoFonte);
      n.tipo = n.tipo || 'retangulo';
      n.tipoTraco = n.tipoTraco || 'solido';
      n.alinhamentoTexto = this.normalizaAlinhamentoTexto(n.alinhamentoTexto);
      n.alinhamentoVerticalTexto = this.normalizaAlinhamentoVerticalTexto(n.alinhamentoVerticalTexto);
      if (n.tipo === 'imagem') {
        n.escalaImagem = this.normalizaEscalaImagem(n.escalaImagem);
        n.raioBordaImagem = this.normalizaRaioBordaImagem(n.raioBordaImagem);
      }
    });
    fluxo.conexoes.forEach((c) => {
      c.tipoTraco = c.tipoTraco || 'solido';
      c.tamanhoSeta = this.normalizaTamanhoSeta(c.tamanhoSeta);
      c.curvatura = Number.isFinite(c.curvatura as number) ? (c.curvatura as number) : 0;
    });
    return fluxo;
  }

  private normalizaTamanhoSeta(v: unknown): number {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    if (!Number.isFinite(n)) return TAMANHO_SETA_PADRAO;
    return Math.min(24, Math.max(3, n));
  }

  private normalizaEscalaImagem(v: unknown): number {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    if (!Number.isFinite(n)) return 1;
    return Math.min(1, Math.max(0.2, n));
  }

  private normalizaRaioBordaImagem(v: unknown): number {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    if (!Number.isFinite(n)) return 18;
    return Math.min(80, Math.max(0, n));
  }

  private normalizaTamanhoFonte(v: unknown): number {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    if (!Number.isFinite(n)) return 13;
    return Math.min(48, Math.max(8, n));
  }

  private normalizaAlinhamentoTexto(v: unknown): TipoAlinhamentoTexto {
    return v === 'esquerda' || v === 'direita' || v === 'centro' ? v : 'centro';
  }

  private normalizaAlinhamentoVerticalTexto(v: unknown): TipoAlinhamentoVerticalTexto {
    return v === 'topo' || v === 'rodape' || v === 'meio' ? v : 'meio';
  }

  private parsePontos(v: string | null): { x: number; y: number }[] | undefined {
    if (!v) return undefined;
    const pts = v
      .trim()
      .split(/\s+/)
      .map((par) => {
        const [x, y] = par.split(',').map((n) => parseFloat(n));
        return { x, y };
      })
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
    return pts.length ? pts : undefined;
  }

  private num(v: string | null, padrao: number): number {
    const n = parseFloat(v ?? '');
    return Number.isFinite(n) ? n : padrao;
  }

  private escapaMermaid(t: string): string {
    return t.replace(/"/g, '&quot;').replace(/\r?\n/g, '<br/>');
  }

  private desescapaMermaid(t: string): string {
    return t.replace(/<br\s*\/?>/gi, '\n').replace(/&quot;/g, '"');
  }
}
