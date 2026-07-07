import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { DataService } from '../../data.service';

interface Conjunto { id: string; label: string; chars: string; ativo: boolean; }

@Component({
  selector: 'app-gerador-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSliderModule],
  templateUrl: './gerador-senha.component.html',
  styleUrl: './gerador-senha.component.css'
})
export class GeradorSenhaComponent implements OnInit {

  comprimento = 16;
  quantidade = 1;
  excluirAmbiguos = false;
  senhas: string[] = [];
  copiados = new Set<number>();
  todosCopiados = false;

  readonly opcQtd = [1, 5, 10, 20];

  conjuntos: Conjunto[] = [
    { id: 'maiusculas', label: 'A–Z',  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', ativo: true },
    { id: 'minusculas', label: 'a–z',  chars: 'abcdefghijklmnopqrstuvwxyz', ativo: true },
    { id: 'numeros',    label: '0–9',  chars: '0123456789',                 ativo: true },
    { id: 'especiais',  label: '!@#…', chars: '!@#$%^&*()-_=+[]{}|;:,.<>?', ativo: true },
  ];

  readonly AMBIGUOS = 'Il1O0o';

  forca: 'fraca' | 'media' | 'forte' | 'muito-forte' = 'forte';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Password Generator');
    this.gerar();
  }

  alternarConjunto(c: Conjunto): void {
    const ativos = this.conjuntos.filter(x => x.ativo);
    if (c.ativo && ativos.length === 1) return; // pelo menos 1 deve estar ativo
    c.ativo = !c.ativo;
    this.gerar();
  }

  selecionarQtd(n: number): void { this.quantidade = n; this.gerar(); }

  gerar(): void {
    let pool = this.conjuntos.filter(c => c.ativo).map(c => c.chars).join('');
    if (this.excluirAmbiguos) pool = pool.split('').filter(ch => !this.AMBIGUOS.includes(ch)).join('');
    if (!pool) return;
    this.senhas = Array.from({ length: this.quantidade }, () => this.gerarSenha(pool));
    this.copiados.clear();
    this.todosCopiados = false;
    this.calcularForca();
  }

  copiar(s: string, i: number): void {
    if (typeof navigator === 'undefined') return;
    navigator.clipboard.writeText(s).then(() => {
      this.copiados.add(i);
      setTimeout(() => this.copiados.delete(i), 2000);
    });
  }

  copiarTodos(): void {
    if (typeof navigator === 'undefined' || !this.senhas.length) return;
    navigator.clipboard.writeText(this.senhas.join('\n')).then(() => {
      this.todosCopiados = true;
      setTimeout(() => this.todosCopiados = false, 2500);
    });
  }

  limpar(): void { this.senhas = []; this.copiados.clear(); this.todosCopiados = false; }
  foiCopiado(i: number): boolean { return this.copiados.has(i); }

  get barraForca(): number {
    return { fraca: 25, media: 50, forte: 75, 'muito-forte': 100 }[this.forca];
  }

  get labelForca(): string {
    return { fraca: 'Weak', media: 'Medium', forte: 'Strong', 'muito-forte': 'Very strong' }[this.forca];
  }

  private gerarSenha(pool: string): string {
    const arr = new Uint32Array(this.comprimento);
    if (typeof crypto !== 'undefined') crypto.getRandomValues(arr);
    return Array.from(arr, n => pool[n % pool.length]).join('');
  }

  private calcularForca(): void {
    const ativos = this.conjuntos.filter(c => c.ativo).length;
    const len = this.comprimento;
    if (len < 8 || ativos < 2)               this.forca = 'fraca';
    else if (len < 12 || ativos < 3)          this.forca = 'media';
    else if (len < 16 || ativos < 4)          this.forca = 'forte';
    else                                       this.forca = 'muito-forte';
  }
}
