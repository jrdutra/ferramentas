import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';

type Tipo = 'cpf' | 'cnpj';

@Component({
  selector: 'app-gerador-cpf-cnpj',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './gerador-cpf-cnpj.component.html',
  styleUrl: './gerador-cpf-cnpj.component.css'
})
export class GeradorCpfCnpjComponent implements OnInit {

  readonly opcQtd = [1, 5, 10, 20, 50];

  tipo: Tipo = 'cpf';
  formatado = true;
  quantidade = 1;
  resultados: string[] = [];
  copiados = new Set<number>();
  todosCopiados = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Gerador de CPF e CNPJ');
    this.gerar();
  }

  selecionarTipo(t: Tipo): void {
    this.tipo = t;
    this.gerar();
  }

  selecionarQtd(n: number): void {
    this.quantidade = n;
    this.gerar();
  }

  gerar(): void {
    this.resultados = Array.from({ length: this.quantidade }, () =>
      this.tipo === 'cpf' ? this.gerarCpf() : this.gerarCnpj()
    );
    this.copiados.clear();
    this.todosCopiados = false;
  }

  copiar(valor: string, i: number): void {
    if (typeof navigator === 'undefined') return;
    navigator.clipboard.writeText(valor).then(() => {
      this.copiados.add(i);
      setTimeout(() => this.copiados.delete(i), 2000);
    });
  }

  copiarTodos(): void {
    if (typeof navigator === 'undefined' || !this.resultados.length) return;
    navigator.clipboard.writeText(this.resultados.join('\n')).then(() => {
      this.todosCopiados = true;
      setTimeout(() => this.todosCopiados = false, 2500);
    });
  }

  limpar(): void {
    this.resultados = [];
    this.copiados.clear();
    this.todosCopiados = false;
  }

  foiCopiado(i: number): boolean { return this.copiados.has(i); }

  // ─── Geradores ─────────────────────────────────────────────

  private digitos(n: number): number[] {
    const arr = new Uint8Array(n);
    if (typeof crypto !== 'undefined') crypto.getRandomValues(arr);
    return Array.from(arr, b => b % 10);
  }

  private digitoVerificadorCpf(nums: number[], peso: number): number {
    const soma = nums.reduce((acc, d, i) => acc + d * (peso - i), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  private gerarCpf(): string {
    const d = this.digitos(9);
    const d1 = this.digitoVerificadorCpf(d, 10);
    const d2 = this.digitoVerificadorCpf([...d, d1], 11);
    const n = [...d, d1, d2];
    if (!this.formatado) return n.join('');
    return `${n.slice(0,3).join('')}.${n.slice(3,6).join('')}.${n.slice(6,9).join('')}-${n.slice(9).join('')}`;
  }

  private digitoVerificadorCnpj(nums: number[], pesos: number[]): number {
    const soma = nums.reduce((acc, d, i) => acc + d * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  private gerarCnpj(): string {
    const raiz = this.digitos(8);
    const ordem = [0, 0, 0, 1]; // filial 0001
    const base = [...raiz, ...ordem];
    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = this.digitoVerificadorCnpj(base, pesos1);
    const d2 = this.digitoVerificadorCnpj([...base, d1], pesos2);
    const n = [...base, d1, d2];
    if (!this.formatado) return n.join('');
    const s = n.join('');
    return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
  }
}
