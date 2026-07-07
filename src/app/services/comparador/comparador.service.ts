import { Injectable } from '@angular/core';

export type FormatoEntrada = 'auto' | 'json' | 'yaml';

export interface CampoDif {
  caminho: string;
  valorA?: string;
  valorB?: string;
  linhaA?: number;
  linhaB?: number;
}

export type ClasseLinha = '' | 'dif-removido' | 'dif-adicionado' | 'dif-modificado';

export interface LinhaRender {
  n: number;
  texto: string;
  classe: ClasseLinha;
}

export interface ResultadoComparacao {
  okA: boolean;
  okB: boolean;
  erroA: string;
  erroB: string;
  faltamNaEsquerda: CampoDif[];
  faltamNaDireita: CampoDif[];
  diferentes: CampoDif[];
  linhasA: LinhaRender[];
  linhasB: LinhaRender[];
  iguais: boolean;
}

interface ParseResultado {
  ok: boolean;
  valor: unknown;
  erro: string;
}

interface LinhaYaml {
  indent: number;
  texto: string;
}

@Injectable({ providedIn: 'root' })
export class ComparadorService {

  // ─────────────────────── API principal ───────────────────────

  comparar(textoA: string, textoB: string, formato: FormatoEntrada): ResultadoComparacao {
    const a = this.parseEntrada(textoA, formato);
    const b = this.parseEntrada(textoB, formato);

    const base: ResultadoComparacao = {
      okA: a.ok,
      okB: b.ok,
      erroA: a.erro,
      erroB: b.erro,
      faltamNaEsquerda: [],
      faltamNaDireita: [],
      diferentes: [],
      linhasA: [],
      linhasB: [],
      iguais: false,
    };

    if (!a.ok || !b.ok) return base;

    // Serializa em JSON canônico com mapa caminho -> linha.
    const serA = this.serializar(a.valor);
    const serB = this.serializar(b.valor);

    const faltamNaEsquerda: CampoDif[] = []; // existe só em B (direita)
    const faltamNaDireita: CampoDif[] = []; // existe só em A (esquerda)
    const diferentes: CampoDif[] = [];

    this.caminhar(a.valor, b.valor, '', faltamNaDireita, faltamNaEsquerda, diferentes);

    // Preenche números de linha.
    faltamNaEsquerda.forEach((c) => (c.linhaB = serB.mapa.get(c.caminho)));
    faltamNaDireita.forEach((c) => (c.linhaA = serA.mapa.get(c.caminho)));
    diferentes.forEach((c) => {
      c.linhaA = serA.mapa.get(c.caminho);
      c.linhaB = serB.mapa.get(c.caminho);
    });

    // Conjuntos de linhas a destacar.
    const remA = new Set<number>(); // só na esquerda
    const modA = new Set<number>();
    const addB = new Set<number>(); // só na direita
    const modB = new Set<number>();
    faltamNaDireita.forEach((c) => { if (c.linhaA) remA.add(c.linhaA); });
    faltamNaEsquerda.forEach((c) => { if (c.linhaB) addB.add(c.linhaB); });
    diferentes.forEach((c) => { if (c.linhaA) modA.add(c.linhaA); if (c.linhaB) modB.add(c.linhaB); });

    base.faltamNaEsquerda = faltamNaEsquerda;
    base.faltamNaDireita = faltamNaDireita;
    base.diferentes = diferentes;
    base.linhasA = this.montarLinhas(serA.texto, remA, modA, 'dif-removido');
    base.linhasB = this.montarLinhas(serB.texto, addB, modB, 'dif-adicionado');
    base.iguais = faltamNaEsquerda.length === 0 && faltamNaDireita.length === 0 && diferentes.length === 0;

    return base;
  }

  private montarLinhas(texto: string, apenas: Set<number>, mod: Set<number>, classeApenas: ClasseLinha): LinhaRender[] {
    return texto.split('\n').map((t, i) => {
      const n = i + 1;
      let classe: ClasseLinha = '';
      if (mod.has(n)) classe = 'dif-modificado';
      else if (apenas.has(n)) classe = classeApenas;
      return { n, texto: t, classe };
    });
  }

  // ─────────────────────── Parse (JSON / YAML) ───────────────────────

  parseEntrada(texto: string, formato: FormatoEntrada): ParseResultado {
    const t = (texto || '').trim();
    if (!t) return { ok: false, valor: null, erro: 'Empty input.' };

    const tentarJson = (): ParseResultado => {
      try {
        return { ok: true, valor: JSON.parse(t), erro: '' };
      } catch (e) {
        return { ok: false, valor: null, erro: 'Invalid JSON: ' + (e instanceof Error ? e.message : '') };
      }
    };
    const tentarYaml = (): ParseResultado => {
      try {
        return { ok: true, valor: this.parseYaml(t), erro: '' };
      } catch (e) {
        return { ok: false, valor: null, erro: 'Invalid YAML: ' + (e instanceof Error ? e.message : '') };
      }
    };

    if (formato === 'json') return tentarJson();
    if (formato === 'yaml') return tentarYaml();

    // auto: tenta JSON e cai para YAML.
    const j = tentarJson();
    if (j.ok) return j;
    const y = tentarYaml();
    if (y.ok) return y;
    return { ok: false, valor: null, erro: 'Could not interpret as JSON or YAML.' };
  }

  /** Parser YAML enxuto (subconjunto comum: mapas, listas, escalares, fluxo JSON). */
  parseYaml(texto: string): unknown {
    const rows: LinhaYaml[] = [];
    for (const bruta of texto.split(/\r?\n/)) {
      const linha = this.removerComentario(bruta);
      if (!linha.trim()) continue;
      const indent = linha.length - linha.replace(/^\s+/, '').length;
      rows.push({ indent, texto: linha.slice(indent) });
    }
    if (!rows.length) return null;
    const pos = { i: 0 };
    return this.parseNode(rows, pos, rows[0].indent);
  }

  private parseNode(rows: LinhaYaml[], pos: { i: number }, indent: number): unknown {
    if (pos.i >= rows.length) return null;
    if (rows[pos.i].texto.startsWith('-')) return this.parseSeq(rows, pos, indent);
    return this.parseMap(rows, pos, indent);
  }

  private parseSeq(rows: LinhaYaml[], pos: { i: number }, indent: number): unknown[] {
    const arr: unknown[] = [];
    while (pos.i < rows.length && rows[pos.i].indent === indent && this.ehItemLista(rows[pos.i].texto)) {
      const bruto = rows[pos.i].texto.replace(/^-/, '');
      const espacos = bruto.length - bruto.replace(/^\s+/, '').length;
      const conteudo = bruto.replace(/^\s+/, '');
      if (conteudo === '') {
        pos.i += 1;
        if (pos.i < rows.length && rows[pos.i].indent > indent) {
          arr.push(this.parseNode(rows, pos, rows[pos.i].indent));
        } else {
          arr.push(null);
        }
      } else if (this.ehLinhaMapa(conteudo)) {
        const filhoIndent = indent + 1 + espacos;
        rows[pos.i] = { indent: filhoIndent, texto: conteudo };
        arr.push(this.parseMap(rows, pos, filhoIndent));
      } else {
        pos.i += 1;
        arr.push(this.parseScalar(conteudo));
      }
    }
    return arr;
  }

  private parseMap(rows: LinhaYaml[], pos: { i: number }, indent: number): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    while (pos.i < rows.length && rows[pos.i].indent === indent && !this.ehItemLista(rows[pos.i].texto)) {
      const m = rows[pos.i].texto.match(/^("(?:[^"\\]|\\.)*"|'[^']*'|[^:]+?):\s?(.*)$/);
      if (!m) {
        pos.i += 1;
        continue;
      }
      const chave = this.desaspar(m[1].trim());
      const resto = m[2];
      if (resto === '') {
        pos.i += 1;
        if (pos.i < rows.length && rows[pos.i].indent > indent) {
          obj[chave] = this.parseNode(rows, pos, rows[pos.i].indent);
        } else {
          obj[chave] = null;
        }
      } else {
        pos.i += 1;
        obj[chave] = this.parseScalar(resto);
      }
    }
    return obj;
  }

  private ehItemLista(t: string): boolean {
    return t === '-' || t.startsWith('- ');
  }

  private ehLinhaMapa(t: string): boolean {
    return /^("(?:[^"\\]|\\.)*"|'[^']*'|[^:]+?):(\s|$)/.test(t);
  }

  private parseScalar(sBruto: string): unknown {
    const s = sBruto.trim();
    if (s === '') return null;
    if ((s[0] === '"' && s[s.length - 1] === '"') || (s[0] === "'" && s[s.length - 1] === "'")) {
      return this.desaspar(s);
    }
    if (s[0] === '{' || s[0] === '[') {
      try {
        return JSON.parse(s);
      } catch {
        /* mantém como texto */
      }
    }
    if (s === 'null' || s === '~') return null;
    if (s === 'true' || s === 'True') return true;
    if (s === 'false' || s === 'False') return false;
    if (/^-?\d+$/.test(s)) return parseInt(s, 10);
    if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s);
    return s;
  }

  private desaspar(s: string): string {
    if (s.length >= 2) {
      if (s[0] === '"' && s[s.length - 1] === '"') return s.slice(1, -1).replace(/\\"/g, '"');
      if (s[0] === "'" && s[s.length - 1] === "'") return s.slice(1, -1);
    }
    return s;
  }

  private removerComentario(linha: string): string {
    let inS = false;
    let inD = false;
    for (let i = 0; i < linha.length; i += 1) {
      const ch = linha[i];
      if (ch === "'" && !inD) inS = !inS;
      else if (ch === '"' && !inS) inD = !inD;
      else if (ch === '#' && !inS && !inD && (i === 0 || /\s/.test(linha[i - 1]))) {
        return linha.slice(0, i);
      }
    }
    return linha;
  }

  // ─────────────────────── Comparação estrutural ───────────────────────

  private caminhar(
    a: unknown,
    b: unknown,
    caminho: string,
    faltamNaDireita: CampoDif[],
    faltamNaEsquerda: CampoDif[],
    diferentes: CampoDif[],
  ): void {
    const aU = a === undefined;
    const bU = b === undefined;
    if (aU && bU) return;
    if (aU && !bU) {
      faltamNaEsquerda.push({ caminho: caminho || '(raiz)', valorB: this.resumir(b) });
      return;
    }
    if (bU && !aU) {
      faltamNaDireita.push({ caminho: caminho || '(raiz)', valorA: this.resumir(a) });
      return;
    }

    if (this.ehObjeto(a) && this.ehObjeto(b)) {
      const ao = a as Record<string, unknown>;
      const bo = b as Record<string, unknown>;
      const chaves = Array.from(new Set([...Object.keys(ao), ...Object.keys(bo)])).sort();
      for (const k of chaves) {
        const filho = caminho ? `${caminho}.${k}` : k;
        this.caminhar(ao[k], bo[k], filho, faltamNaDireita, faltamNaEsquerda, diferentes);
      }
      return;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      const n = Math.max(a.length, b.length);
      for (let i = 0; i < n; i += 1) {
        this.caminhar(a[i], b[i], `${caminho}[${i}]`, faltamNaDireita, faltamNaEsquerda, diferentes);
      }
      return;
    }

    // Pelo menos um é escalar (ou tipos diferentes).
    if (!this.saoIguais(a, b)) {
      diferentes.push({ caminho: caminho || '(raiz)', valorA: this.resumir(a), valorB: this.resumir(b) });
    }
  }

  private saoIguais(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  private ehObjeto(v: unknown): boolean {
    return typeof v === 'object' && v !== null && !Array.isArray(v);
  }

  private resumir(v: unknown): string {
    let s: string;
    try {
      s = JSON.stringify(v);
    } catch {
      s = String(v);
    }
    if (s === undefined) s = String(v);
    return s.length > 120 ? s.slice(0, 117) + '…' : s;
  }

  // ─────────────────────── Serialização com linhas ───────────────────────

  private serializar(obj: unknown): { texto: string; mapa: Map<string, number> } {
    const linhas: string[] = [];
    const mapa = new Map<string, number>();
    const ind = (n: number) => '  '.repeat(n);

    const rec = (valor: unknown, caminho: string, prefixo: string, nivel: number, virgula: boolean): void => {
      if (this.ehObjeto(valor)) {
        const o = valor as Record<string, unknown>;
        const chaves = Object.keys(o).sort();
        linhas.push(ind(nivel) + prefixo + '{');
        if (caminho) mapa.set(caminho, linhas.length);
        chaves.forEach((k, i) => {
          const filho = caminho ? `${caminho}.${k}` : k;
          rec(o[k], filho, `"${k}": `, nivel + 1, i < chaves.length - 1);
        });
        linhas.push(ind(nivel) + '}' + (virgula ? ',' : ''));
      } else if (Array.isArray(valor)) {
        linhas.push(ind(nivel) + prefixo + '[');
        if (caminho) mapa.set(caminho, linhas.length);
        valor.forEach((v, i) => {
          rec(v, `${caminho}[${i}]`, '', nivel + 1, i < valor.length - 1);
        });
        linhas.push(ind(nivel) + ']' + (virgula ? ',' : ''));
      } else {
        linhas.push(ind(nivel) + prefixo + JSON.stringify(valor) + (virgula ? ',' : ''));
        if (caminho) mapa.set(caminho, linhas.length);
      }
    };

    rec(obj, '', '', 0, false);
    return { texto: linhas.join('\n'), mapa };
  }
}
