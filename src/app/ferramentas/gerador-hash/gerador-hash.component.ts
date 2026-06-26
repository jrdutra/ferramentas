import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';

interface HashResultado {
  algoritmo: string;
  valor: string;
  tamanho: string;
}

@Component({
  selector: 'app-gerador-hash',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule,
            MatFormFieldModule, MatInputModule, MatTooltipModule],
  templateUrl: './gerador-hash.component.html',
  styleUrl: './gerador-hash.component.css'
})
export class GeradorHashComponent implements OnInit {

  textoEntrada = '';
  maiusculas = false;
  copiado: string | null = null;
  calculando = false;

  resultados: HashResultado[] = [
    { algoritmo: 'MD5',     valor: '', tamanho: '128 bits' },
    { algoritmo: 'SHA-1',   valor: '', tamanho: '160 bits' },
    { algoritmo: 'SHA-256', valor: '', tamanho: '256 bits' },
    { algoritmo: 'SHA-512', valor: '', tamanho: '512 bits' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Gerador de Hash');
  }

  async calcularHashes(): Promise<void> {
    if (this.calculando) return;
    this.calculando = true;

    const texto = this.textoEntrada;

    // MD5 (implementação pura)
    const md5Hex = this.md5(texto);
    this.resultados[0].valor = this.maiusculas ? md5Hex.toUpperCase() : md5Hex;

    // SHA via Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const algoritmos = ['SHA-1', 'SHA-256', 'SHA-512'];

    for (let i = 0; i < algoritmos.length; i++) {
      const buffer = await crypto.subtle.digest(algoritmos[i], data);
      const hex = Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      this.resultados[i + 1].valor = this.maiusculas ? hex.toUpperCase() : hex;
    }

    this.calculando = false;
  }

  alternarMaiusculas(): void {
    this.maiusculas = !this.maiusculas;
    this.resultados.forEach(r => {
      if (r.valor) {
        r.valor = this.maiusculas ? r.valor.toUpperCase() : r.valor.toLowerCase();
      }
    });
  }

  limpar(): void {
    this.textoEntrada = '';
    this.resultados.forEach(r => r.valor = '');
    this.copiado = null;
  }

  async copiar(algoritmo: string, valor: string): Promise<void> {
    if (!valor) return;
    await navigator.clipboard.writeText(valor);
    this.copiado = algoritmo;
    setTimeout(() => { this.copiado = null; }, 2000);
  }

  // ─── MD5 (RFC 1321) ─────────────────────────────────────────────────────────

  private md5(str: string): string {
    const safeAdd = (x: number, y: number): number => {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    };

    const rol = (n: number, c: number): number => (n << c) | (n >>> (32 - c));

    const cmn = (q: number, a: number, b: number, x: number, s: number, t: number): number =>
      safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);

    const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
      cmn((b & c) | (~b & d), a, b, x, s, t);
    const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
      cmn((b & d) | (c & ~d), a, b, x, s, t);
    const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
      cmn(b ^ c ^ d, a, b, x, s, t);
    const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
      cmn(c ^ (b | ~d), a, b, x, s, t);

    // Encode string to UTF-8 bytes
    const bytes = new TextEncoder().encode(str);
    const byteLen = bytes.length;

    // Padding: append 0x80, zeros, then 64-bit LE length in bits
    const padLen = byteLen % 64 < 56 ? 56 - (byteLen % 64) : 120 - (byteLen % 64);
    const padded = new Uint8Array(byteLen + padLen + 8);
    padded.set(bytes);
    padded[byteLen] = 0x80;

    const bitLen = byteLen * 8;
    const view = new DataView(padded.buffer);
    view.setUint32(byteLen + padLen,     bitLen & 0xffffffff, true);
    view.setUint32(byteLen + padLen + 4, Math.floor(bitLen / 0x100000000), true);

    // Process 64-byte blocks
    let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

    for (let i = 0; i < padded.length; i += 64) {
      const m: number[] = [];
      for (let j = 0; j < 16; j++) {
        m[j] = view.getInt32(i + j * 4, true);
      }

      let [aa, bb, cc, dd] = [a, b, c, d];

      // Round 1
      a = ff(a,b,c,d, m[ 0], 7,-680876936);  d = ff(d,a,b,c, m[ 1],12,-389564586);
      c = ff(c,d,a,b, m[ 2],17, 606105819);  b = ff(b,c,d,a, m[ 3],22,-1044525330);
      a = ff(a,b,c,d, m[ 4], 7,-176418897);  d = ff(d,a,b,c, m[ 5],12, 1200080426);
      c = ff(c,d,a,b, m[ 6],17,-1473231341); b = ff(b,c,d,a, m[ 7],22,-45705983);
      a = ff(a,b,c,d, m[ 8], 7, 1770035416); d = ff(d,a,b,c, m[ 9],12,-1958414417);
      c = ff(c,d,a,b, m[10],17,-42063);       b = ff(b,c,d,a, m[11],22,-1990404162);
      a = ff(a,b,c,d, m[12], 7, 1804603682); d = ff(d,a,b,c, m[13],12,-40341101);
      c = ff(c,d,a,b, m[14],17,-1502002290); b = ff(b,c,d,a, m[15],22, 1236535329);

      // Round 2
      a = gg(a,b,c,d, m[ 1], 5,-165796510);  d = gg(d,a,b,c, m[ 6], 9,-1069501632);
      c = gg(c,d,a,b, m[11],14, 643717713);  b = gg(b,c,d,a, m[ 0],20,-373897302);
      a = gg(a,b,c,d, m[ 5], 5,-701558691);  d = gg(d,a,b,c, m[10], 9, 38016083);
      c = gg(c,d,a,b, m[15],14,-660478335);  b = gg(b,c,d,a, m[ 4],20,-405537848);
      a = gg(a,b,c,d, m[ 9], 5, 568446438);  d = gg(d,a,b,c, m[14], 9,-1019803690);
      c = gg(c,d,a,b, m[ 3],14,-187363961);  b = gg(b,c,d,a, m[ 8],20, 1163531501);
      a = gg(a,b,c,d, m[13], 5,-1444681467); d = gg(d,a,b,c, m[ 2], 9,-51403784);
      c = gg(c,d,a,b, m[ 7],14, 1735328473); b = gg(b,c,d,a, m[12],20,-1926607734);

      // Round 3
      a = hh(a,b,c,d, m[ 5], 4,-378558);     d = hh(d,a,b,c, m[ 8],11,-2022574463);
      c = hh(c,d,a,b, m[11],16, 1839030562); b = hh(b,c,d,a, m[14],23,-35309556);
      a = hh(a,b,c,d, m[ 1], 4,-1530992060); d = hh(d,a,b,c, m[ 4],11, 1272893353);
      c = hh(c,d,a,b, m[ 7],16,-155497632);  b = hh(b,c,d,a, m[10],23,-1094730640);
      a = hh(a,b,c,d, m[13], 4, 681279174);  d = hh(d,a,b,c, m[ 0],11,-358537222);
      c = hh(c,d,a,b, m[ 3],16,-722521979);  b = hh(b,c,d,a, m[ 6],23, 76029189);
      a = hh(a,b,c,d, m[ 9], 4,-640364487);  d = hh(d,a,b,c, m[12],11,-421815835);
      c = hh(c,d,a,b, m[15],16, 530742520);  b = hh(b,c,d,a, m[ 2],23,-995338651);

      // Round 4
      a = ii(a,b,c,d, m[ 0], 6,-198630844);  d = ii(d,a,b,c, m[ 7],10, 1126891415);
      c = ii(c,d,a,b, m[14],15,-1416354905); b = ii(b,c,d,a, m[ 5],21,-57434055);
      a = ii(a,b,c,d, m[12], 6, 1700485571); d = ii(d,a,b,c, m[ 3],10,-1894986606);
      c = ii(c,d,a,b, m[10],15,-1051523);    b = ii(b,c,d,a, m[ 1],21,-2054922799);
      a = ii(a,b,c,d, m[ 8], 6, 1873313359); d = ii(d,a,b,c, m[15],10,-30611744);
      c = ii(c,d,a,b, m[ 6],15,-1560198380); b = ii(b,c,d,a, m[13],21, 1309151649);
      a = ii(a,b,c,d, m[ 4], 6,-145523070);  d = ii(d,a,b,c, m[11],10,-1120210379);
      c = ii(c,d,a,b, m[ 2],15, 718787259);  b = ii(b,c,d,a, m[ 9],21,-343485551);

      a = safeAdd(a, aa); b = safeAdd(b, bb);
      c = safeAdd(c, cc); d = safeAdd(d, dd);
    }

    // Output as little-endian hex
    return [a, b, c, d].map(n =>
      [(n & 0xff), (n >> 8 & 0xff), (n >> 16 & 0xff), (n >> 24 & 0xff)]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
    ).join('');
  }
}
