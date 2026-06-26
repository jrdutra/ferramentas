import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';

export type TipoDiff = 'igual' | 'adicionado' | 'removido' | 'modificado' | 'chave';

export interface NoDiff {
  tipo: TipoDiff;
  chave: string;
  indent: number;
  valorA: string;
  valorB: string;
  /** true = apenas aparece em A, false = apenas em B, null = em ambos */
  lado: 'a' | 'b' | 'ambos';
}

@Component({
  selector: 'app-diff-json',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule,
            MatFormFieldModule, MatInputModule, MatTooltipModule],
  templateUrl: './diff-json.component.html',
  styleUrl: './diff-json.component.css'
})
export class DiffJsonComponent implements OnInit {

  textoA = '';
  textoB = '';

  erroA = '';
  erroB = '';

  nos: NoDiff[] = [];
  totalAdicionados = 0;
  totalRemovidos   = 0;
  totalModificados = 0;
  totalIguais      = 0;
  semDiferencas    = false;
  comparado        = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Diff de JSON');
  }

  comparar(): void {
    this.erroA = '';
    this.erroB = '';

    let objA: unknown, objB: unknown;

    try { objA = JSON.parse(this.textoA); } catch {
      this.erroA = 'JSON inválido';
      return;
    }
    try { objB = JSON.parse(this.textoB); } catch {
      this.erroB = 'JSON inválido';
      return;
    }

    this.nos = [];
    this.diffValor('', objA, objB, 0);

    this.totalAdicionados = this.nos.filter(n => n.tipo === 'adicionado').length;
    this.totalRemovidos   = this.nos.filter(n => n.tipo === 'removido').length;
    this.totalModificados = this.nos.filter(n => n.tipo === 'modificado').length;
    this.totalIguais      = this.nos.filter(n => n.tipo === 'igual').length;
    this.semDiferencas    = this.totalAdicionados === 0 && this.totalRemovidos === 0 && this.totalModificados === 0;
    this.comparado        = true;
  }

  formatar(lado: 'a' | 'b'): void {
    const texto = lado === 'a' ? this.textoA : this.textoB;
    try {
      const formatado = JSON.stringify(JSON.parse(texto), null, 2);
      if (lado === 'a') { this.textoA = formatado; this.erroA = ''; }
      else              { this.textoB = formatado; this.erroB = ''; }
    } catch {
      if (lado === 'a') this.erroA = 'JSON inválido';
      else              this.erroB = 'JSON inválido';
    }
  }

  limpar(): void {
    this.textoA = ''; this.textoB = '';
    this.erroA  = ''; this.erroB  = '';
    this.nos = [];
    this.comparado = false;
    this.semDiferencas = false;
    this.totalAdicionados = this.totalRemovidos = this.totalModificados = this.totalIguais = 0;
  }

  temConteudo(): boolean {
    return this.textoA.trim().length > 0 || this.textoB.trim().length > 0;
  }

  // ─── Diff recursivo ──────────────────────────────────────────────────────────

  private diffValor(chave: string, a: unknown, b: unknown, indent: number): void {
    const tipoA = this.tipoJson(a);
    const tipoB = this.tipoJson(b);

    if (tipoA === 'object' && tipoB === 'object') {
      this.diffObjeto(chave, a as Record<string, unknown>, b as Record<string, unknown>, indent);
    } else if (tipoA === 'array' && tipoB === 'array') {
      this.diffArray(chave, a as unknown[], b as unknown[], indent);
    } else if (JSON.stringify(a) === JSON.stringify(b)) {
      this.nos.push({ tipo: 'igual', chave, indent, valorA: this.exibir(a), valorB: this.exibir(b), lado: 'ambos' });
    } else {
      this.nos.push({ tipo: 'modificado', chave, indent, valorA: this.exibir(a), valorB: this.exibir(b), lado: 'ambos' });
    }
  }

  private diffObjeto(chave: string, a: Record<string, unknown>, b: Record<string, unknown>, indent: number): void {
    const todasChaves = new Set([...Object.keys(a), ...Object.keys(b)]);

    if (chave !== '') {
      this.nos.push({ tipo: 'chave', chave, indent, valorA: '{', valorB: '{', lado: 'ambos' });
      indent++;
    }

    todasChaves.forEach(k => {
      const temA = Object.prototype.hasOwnProperty.call(a, k);
      const temB = Object.prototype.hasOwnProperty.call(b, k);

      if (temA && temB) {
        this.diffValor(k, a[k], b[k], indent);
      } else if (temA) {
        this.adicionarArvore(k, a[k], indent, 'removido');
      } else {
        this.adicionarArvore(k, b[k], indent, 'adicionado');
      }
    });

    if (chave !== '') {
      this.nos.push({ tipo: 'chave', chave: '', indent: indent - 1, valorA: '}', valorB: '}', lado: 'ambos' });
    }
  }

  private diffArray(chave: string, a: unknown[], b: unknown[], indent: number): void {
    if (chave !== '') {
      this.nos.push({ tipo: 'chave', chave, indent, valorA: '[', valorB: '[', lado: 'ambos' });
      indent++;
    }

    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= a.length) {
        this.adicionarArvore(`[${i}]`, b[i], indent, 'adicionado');
      } else if (i >= b.length) {
        this.adicionarArvore(`[${i}]`, a[i], indent, 'removido');
      } else {
        this.diffValor(`[${i}]`, a[i], b[i], indent);
      }
    }

    if (chave !== '') {
      this.nos.push({ tipo: 'chave', chave: '', indent: indent - 1, valorA: ']', valorB: ']', lado: 'ambos' });
    }
  }

  private adicionarArvore(chave: string, valor: unknown, indent: number, tipo: 'adicionado' | 'removido'): void {
    const lado: 'a' | 'b' = tipo === 'removido' ? 'a' : 'b';
    const t = this.tipoJson(valor);

    if (t === 'object') {
      const obj = valor as Record<string, unknown>;
      this.nos.push({ tipo, chave, indent, valorA: tipo === 'removido' ? '{' : '', valorB: tipo === 'adicionado' ? '{' : '', lado });
      Object.keys(obj).forEach(k => this.adicionarArvore(k, obj[k], indent + 1, tipo));
      this.nos.push({ tipo, chave: '', indent, valorA: tipo === 'removido' ? '}' : '', valorB: tipo === 'adicionado' ? '}' : '', lado });
    } else if (t === 'array') {
      const arr = valor as unknown[];
      this.nos.push({ tipo, chave, indent, valorA: tipo === 'removido' ? '[' : '', valorB: tipo === 'adicionado' ? '[' : '', lado });
      arr.forEach((v, i) => this.adicionarArvore(`[${i}]`, v, indent + 1, tipo));
      this.nos.push({ tipo, chave: '', indent, valorA: tipo === 'removido' ? ']' : '', valorB: tipo === 'adicionado' ? ']' : '', lado });
    } else {
      const exibido = this.exibir(valor);
      this.nos.push({
        tipo, chave, indent,
        valorA: tipo === 'removido' ? exibido : '',
        valorB: tipo === 'adicionado' ? exibido : '',
        lado
      });
    }
  }

  private tipoJson(v: unknown): string {
    if (v === null) return 'null';
    if (Array.isArray(v)) return 'array';
    return typeof v;
  }

  private exibir(v: unknown): string {
    if (typeof v === 'string') return `"${v}"`;
    if (v === null) return 'null';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  }
}
