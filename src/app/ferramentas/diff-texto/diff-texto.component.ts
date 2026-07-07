import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../../data.service';

interface Run { startA: number; endA: number; startB: number; endB: number; }
export interface ChunkDiff { trechoA: string; trechoB: string; }

@Component({
  selector: 'app-diff-texto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule,
            MatFormFieldModule, MatInputModule],
  templateUrl: './diff-texto.component.html',
  styleUrl: './diff-texto.component.css'
})
export class DiffTextoComponent implements OnInit {

  textoA = '';
  textoB = '';
  htmlA: SafeHtml = '';
  htmlB: SafeHtml = '';
  modoComparacao = false;
  chunks: ChunkDiff[] = [];
  semDiferencas = false;
  aviso = '';

  private readonly LIMITE = 5000;
  private readonly MIN_MATCH = 3;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Text Diff');
  }

  comparar(): void {
    const a = this.textoA.slice(0, this.LIMITE);
    const b = this.textoB.slice(0, this.LIMITE);
    this.aviso = (this.textoA.length > this.LIMITE || this.textoB.length > this.LIMITE)
      ? `Text truncated to ${this.LIMITE.toLocaleString('en-US')} characters for better performance.`
      : '';

    const { inLcsA, inLcsB, runs } = this.computeDiff(a, b);

    this.htmlA = this.sanitizer.bypassSecurityTrustHtml(this.renderHtml(a, inLcsA));
    this.htmlB = this.sanitizer.bypassSecurityTrustHtml(this.renderHtml(b, inLcsB));
    this.chunks = this.extrairChunks(a, b, runs);
    this.semDiferencas = this.chunks.length === 0;
    this.modoComparacao = true;
  }

  editar(): void {
    this.modoComparacao = false;
  }

  limpar(): void {
    this.textoA = '';
    this.textoB = '';
    this.htmlA = '';
    this.htmlB = '';
    this.modoComparacao = false;
    this.chunks = [];
    this.semDiferencas = false;
    this.aviso = '';
  }

  temConteudo(): boolean {
    return this.textoA.trim().length > 0 || this.textoB.trim().length > 0;
  }

  // ─── Algoritmo LCS ─────────────────────────────────────────────────────────

  private computeDiff(a: string, b: string): { inLcsA: boolean[]; inLcsB: boolean[]; runs: Run[] } {
    const m = a.length, n = b.length;
    const dp = this.lcsTable(a, b, m, n);

    const allMatches: [number, number][] = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) { allMatches.push([i - 1, j - 1]); i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }
    allMatches.reverse();

    const runs: Run[] = [];
    const inLcsA = new Array(m).fill(false);
    const inLcsB = new Array(n).fill(false);

    let r = 0;
    while (r < allMatches.length) {
      let end = r;
      while (
        end + 1 < allMatches.length &&
        allMatches[end + 1][0] === allMatches[end][0] + 1 &&
        allMatches[end + 1][1] === allMatches[end][1] + 1
      ) end++;

      if (end - r + 1 >= this.MIN_MATCH) {
        runs.push({ startA: allMatches[r][0], endA: allMatches[end][0], startB: allMatches[r][1], endB: allMatches[end][1] });
        for (let k = r; k <= end; k++) {
          inLcsA[allMatches[k][0]] = true;
          inLcsB[allMatches[k][1]] = true;
        }
      }
      r = end + 1;
    }
    return { inLcsA, inLcsB, runs };
  }

  private lcsTable(a: string, b: string, m: number, n: number): number[][] {
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp;
  }

  private renderHtml(text: string, inLcs: boolean[]): string {
    let html = '';
    let i = 0;
    while (i < text.length) {
      if (inLcs[i]) {
        let chunk = '';
        while (i < text.length && inLcs[i]) chunk += text[i++];
        html += this.esc(chunk);
      } else {
        let chunk = '';
        while (i < text.length && !inLcs[i]) chunk += text[i++];
        html += `<mark class="diff-diferente">${this.esc(chunk)}</mark>`;
      }
    }
    return html;
  }

  private extrairChunks(a: string, b: string, runs: Run[]): ChunkDiff[] {
    const chunks: ChunkDiff[] = [];
    const sentinel: Run = { startA: a.length, endA: a.length - 1, startB: b.length, endB: b.length - 1 };
    let iA = 0, iB = 0;
    for (const run of [...runs, sentinel]) {
      const trechoA = a.slice(iA, run.startA);
      const trechoB = b.slice(iB, run.startB);
      if (trechoA.length > 0 || trechoB.length > 0) chunks.push({ trechoA, trechoB });
      iA = run.endA + 1;
      iB = run.endB + 1;
    }
    return chunks;
  }

  private esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
