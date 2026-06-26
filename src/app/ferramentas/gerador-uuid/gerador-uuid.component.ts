import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';

type Versao = 'v4' | 'v7' | 'v1';

const VERSOES: { id: Versao; nome: string; desc: string }[] = [
  { id: 'v4', nome: 'UUID v4', desc: 'Aleatório — o mais comum' },
  { id: 'v7', nome: 'UUID v7', desc: 'Ordenável por tempo (RFC 9562)' },
  { id: 'v1', nome: 'UUID v1', desc: 'Baseado em timestamp + nó' },
];

@Component({
  selector: 'app-gerador-uuid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './gerador-uuid.component.html',
  styleUrl: './gerador-uuid.component.css'
})
export class GeradorUuidComponent implements OnInit {

  readonly versoes = VERSOES;
  readonly opcQtd = [1, 5, 10, 20, 50, 100];

  versao: Versao = 'v4';
  quantidade = 1;
  maiusculas = false;
  semHifens = false;
  uuids: string[] = [];
  copiados = new Set<number>();
  todosCopiados = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Gerador de UUID');
    this.gerar();
  }

  selecionarVersao(v: Versao): void {
    this.versao = v;
    this.gerar();
  }

  selecionarQtd(n: number): void {
    this.quantidade = n;
    this.gerar();
  }

  gerar(): void {
    this.uuids = Array.from({ length: this.quantidade }, () => this.formatar(this.gerarUuid()));
    this.copiados.clear();
    this.todosCopiados = false;
  }

  copiar(uuid: string, index: number): void {
    if (typeof navigator === 'undefined') return;
    navigator.clipboard.writeText(uuid).then(() => {
      this.copiados.add(index);
      setTimeout(() => { this.copiados.delete(index); }, 2000);
    });
  }

  copiarTodos(): void {
    if (typeof navigator === 'undefined' || this.uuids.length === 0) return;
    navigator.clipboard.writeText(this.uuids.join('\n')).then(() => {
      this.todosCopiados = true;
      setTimeout(() => { this.todosCopiados = false; }, 2500);
    });
  }

  limpar(): void {
    this.uuids = [];
    this.copiados.clear();
    this.todosCopiados = false;
  }

  foiCopiado(i: number): boolean { return this.copiados.has(i); }

  // ─── Geração ──────────────────────────────────────────────

  private gerarUuid(): string {
    switch (this.versao) {
      case 'v4': return this.uuidV4();
      case 'v7': return this.uuidV7();
      case 'v1': return this.uuidV1();
    }
  }

  private formatar(uuid: string): string {
    if (this.semHifens) uuid = uuid.replace(/-/g, '');
    return this.maiusculas ? uuid.toUpperCase() : uuid.toLowerCase();
  }

  private bytes(n: number): Uint8Array {
    const arr = new Uint8Array(n);
    if (typeof crypto !== 'undefined') crypto.getRandomValues(arr);
    return arr;
  }

  private uuidV4(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    const b = this.bytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return this.toUuidStr(b);
  }

  private uuidV7(): string {
    const now = Date.now();
    const b = this.bytes(16);
    // 48-bit unix timestamp em ms
    b[0] = (now / 2 ** 40) & 0xff;
    b[1] = (now / 2 ** 32) & 0xff;
    b[2] = (now / 2 ** 24) & 0xff;
    b[3] = (now / 2 ** 16) & 0xff;
    b[4] = (now / 2 ** 8) & 0xff;
    b[5] =  now           & 0xff;
    // Versão 7 e variante
    b[6] = (b[6] & 0x0f) | 0x70;
    b[8] = (b[8] & 0x3f) | 0x80;
    return this.toUuidStr(b);
  }

  private uuidV1(): string {
    // Timestamp UUID v1: 100-ns desde 15/10/1582 → 1970 = 122192928000000000 × 100ns
    const now = Date.now();
    const OFFSET = BigInt('122192928000000000');
    const ts = OFFSET + BigInt(now) * BigInt(10000);

    const tsLow  = Number(ts & BigInt(0xffffffff));
    const tsMid  = Number((ts >> BigInt(32)) & BigInt(0xffff));
    const tsHiV  = Number((ts >> BigInt(48)) & BigInt(0x0fff)) | 0x1000;

    const r = this.bytes(10);
    const clkSeq = ((r[0] & 0x3f) << 8 | r[1]) | 0x8000;
    const node   = Array.from(r.slice(2, 8), b => b.toString(16).padStart(2, '0')).join('');

    const h = (n: number, len: number) => n.toString(16).padStart(len, '0');
    return `${h(tsLow, 8)}-${h(tsMid, 4)}-${h(tsHiV, 4)}-${h(clkSeq, 4)}-${node}`;
  }

  private toUuidStr(b: Uint8Array): string {
    const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  }
}
