import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../data.service';

type Algoritmo = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';
type Formato   = 'hex' | 'base64' | 'base64url';

@Component({
  selector: 'app-gerador-hmac',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule,
            MatTooltipModule, MatFormFieldModule, MatInputModule],
  templateUrl: './gerador-hmac.component.html',
  styleUrl: './gerador-hmac.component.css'
})
export class GeradorHmacComponent implements OnInit {

  readonly algoritmos: Algoritmo[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  readonly formatos: { id: Formato; label: string }[] = [
    { id: 'hex',       label: 'Hex' },
    { id: 'base64',    label: 'Base64' },
    { id: 'base64url', label: 'Base64url' },
  ];

  algoritmo: Algoritmo = 'SHA-256';
  formato: Formato = 'hex';
  mensagem = '';
  chave = '';
  resultado = '';
  maiusculas = false;
  calculando = false;
  erro = '';
  copiado = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Gerador de HMAC');
  }

  async calcular(): Promise<void> {
    if (!this.mensagem || !this.chave) {
      this.erro = 'Preencha a mensagem e a chave antes de calcular.';
      this.resultado = '';
      return;
    }
    this.erro = '';
    this.calculando = true;
    this.resultado = '';
    try {
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(this.chave),
        { name: 'HMAC', hash: this.algoritmo },
        false, ['sign']
      );
      const sig = await crypto.subtle.sign('HMAC', keyMaterial, enc.encode(this.mensagem));
      this.resultado = this.codificar(new Uint8Array(sig));
    } catch (e: any) {
      this.erro = 'Erro ao calcular HMAC: ' + (e?.message ?? String(e));
    } finally {
      this.calculando = false;
    }
  }

  async aoDigitar(): Promise<void> {
    if (this.mensagem && this.chave) await this.calcular();
    else this.resultado = '';
  }

  trocarAlgoritmo(a: Algoritmo): void {
    this.algoritmo = a;
    this.aoDigitar();
  }

  trocarFormato(f: Formato): void {
    this.formato = f;
    if (this.resultado) {
      // recodificar a partir do hex atual (só se o resultado existir)
      this.aoDigitar();
    }
  }

  limpar(): void {
    this.mensagem = '';
    this.chave = '';
    this.resultado = '';
    this.erro = '';
    this.copiado = false;
  }

  copiar(): void {
    if (typeof navigator === 'undefined' || !this.resultado) return;
    navigator.clipboard.writeText(this.resultado).then(() => {
      this.copiado = true;
      setTimeout(() => this.copiado = false, 2000);
    });
  }

  private codificar(bytes: Uint8Array): string {
    switch (this.formato) {
      case 'hex': {
        const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        return this.maiusculas ? hex.toUpperCase() : hex;
      }
      case 'base64':
        return btoa(String.fromCharCode(...bytes));
      case 'base64url':
        return btoa(String.fromCharCode(...bytes))
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
  }

  get temConteudo(): boolean { return !!(this.mensagem || this.chave); }
}
