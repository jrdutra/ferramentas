/**
 * Exportador GIF89a puro (sem dependências externas): paleta global de até
 * 256 cores (buckets de 15 bits) e compressão LZW padrão do formato GIF.
 * Usado pelo editor de fluxograma para gravar a apresentação animada.
 */

/** Escritor de bytes com buffer que cresce sob demanda. */
class EscritorBytes {
  private buf = new Uint8Array(1 << 16);
  private n = 0;

  byte(b: number): void {
    if (this.n >= this.buf.length) this.crescer(this.n + 1);
    this.buf[this.n] = b & 0xff;
    this.n += 1;
  }

  bytes(dados: Uint8Array): void {
    if (this.n + dados.length > this.buf.length) this.crescer(this.n + dados.length);
    this.buf.set(dados, this.n);
    this.n += dados.length;
  }

  u16(v: number): void {
    this.byte(v & 0xff);
    this.byte((v >> 8) & 0xff);
  }

  texto(s: string): void {
    for (let i = 0; i < s.length; i += 1) this.byte(s.charCodeAt(i));
  }

  resultado(): Uint8Array {
    return this.buf.slice(0, this.n);
  }

  private crescer(min: number): void {
    let cap = this.buf.length;
    while (cap < min) cap *= 2;
    const novo = new Uint8Array(cap);
    novo.set(this.buf.subarray(0, this.n));
    this.buf = novo;
  }
}

export interface PaletaGif {
  /** 256 cores RGB (768 bytes). */
  cores: Uint8Array;
  /** Índice da cor da paleta mais próxima do pixel dado. */
  indiceDe(r: number, g: number, b: number): number;
}

/**
 * Monta a paleta global a partir de um quadro RGBA (idealmente o estado final,
 * que contém todas as cores): histograma em buckets de 15 bits e as 256 cores
 * mais frequentes, cada uma na média do seu bucket.
 */
export function criarPaletaGif(rgba: Uint8ClampedArray): PaletaGif {
  const cont = new Uint32Array(32768);
  const somaR = new Float64Array(32768);
  const somaG = new Float64Array(32768);
  const somaB = new Float64Array(32768);
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i];
    const g = rgba[i + 1];
    const b = rgba[i + 2];
    const chave = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    cont[chave] += 1;
    somaR[chave] += r;
    somaG[chave] += g;
    somaB[chave] += b;
  }
  const usados: number[] = [];
  for (let k = 0; k < 32768; k += 1) if (cont[k]) usados.push(k);
  usados.sort((a, b) => cont[b] - cont[a]);
  const n = Math.max(1, Math.min(256, usados.length));
  const cores = new Uint8Array(768);
  for (let i = 0; i < n && i < usados.length; i += 1) {
    const k = usados[i];
    cores[i * 3] = Math.round(somaR[k] / cont[k]);
    cores[i * 3 + 1] = Math.round(somaG[k] / cont[k]);
    cores[i * 3 + 2] = Math.round(somaB[k] / cont[k]);
  }

  // Mapeamento pixel -> índice com cache por bucket (busca linear só no primeiro acesso).
  const cache = new Int16Array(32768).fill(-1);
  const indiceDe = (r: number, g: number, b: number): number => {
    const chave = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const emCache = cache[chave];
    if (emCache >= 0) return emCache;
    let melhor = 0;
    let melhorDist = Infinity;
    for (let i = 0; i < n; i += 1) {
      const dr = r - cores[i * 3];
      const dg = g - cores[i * 3 + 1];
      const db = b - cores[i * 3 + 2];
      const d = dr * dr + dg * dg + db * db;
      if (d < melhorDist) {
        melhorDist = d;
        melhor = i;
      }
    }
    cache[chave] = melhor;
    return melhor;
  };
  return { cores, indiceDe };
}

/** Converte um quadro RGBA em índices da paleta. */
export function indexarQuadroGif(rgba: Uint8ClampedArray, paleta: PaletaGif): Uint8Array {
  const saida = new Uint8Array(rgba.length / 4);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p += 1) {
    saida[p] = paleta.indiceDe(rgba[i], rgba[i + 1], rgba[i + 2]);
  }
  return saida;
}

/** Codificador GIF89a com paleta global e repetição infinita. */
export class CodificadorGif {
  private saida = new EscritorBytes();

  constructor(private largura: number, private altura: number, paleta: PaletaGif) {
    this.saida.texto('GIF89a');
    this.saida.u16(largura);
    this.saida.u16(altura);
    this.saida.byte(0xf7); // paleta global, 256 cores, 8 bits por canal
    this.saida.byte(0); // índice da cor de fundo
    this.saida.byte(0); // proporção de pixel
    this.saida.bytes(paleta.cores);
    // Extensão NETSCAPE 2.0: repetir para sempre.
    this.saida.byte(0x21);
    this.saida.byte(0xff);
    this.saida.byte(0x0b);
    this.saida.texto('NETSCAPE2.0');
    this.saida.byte(0x03);
    this.saida.byte(0x01);
    this.saida.u16(0); // 0 = loop infinito
    this.saida.byte(0x00);
  }

  adicionarQuadro(indices: Uint8Array, atrasoCs: number): void {
    // Graphic Control Extension.
    this.saida.byte(0x21);
    this.saida.byte(0xf9);
    this.saida.byte(0x04);
    this.saida.byte(0x04); // disposal = 1 (mantém o quadro), sem transparência
    this.saida.u16(Math.max(2, Math.round(atrasoCs)));
    this.saida.byte(0);
    this.saida.byte(0);
    // Image Descriptor (quadro inteiro, sem paleta local).
    this.saida.byte(0x2c);
    this.saida.u16(0);
    this.saida.u16(0);
    this.saida.u16(this.largura);
    this.saida.u16(this.altura);
    this.saida.byte(0);
    this.escreverLzw(indices);
  }

  finalizar(): Uint8Array {
    this.saida.byte(0x3b); // trailer
    return this.saida.resultado();
  }

  /** Compressão LZW do GIF (código mínimo 8, códigos de 9 a 12 bits, LSB primeiro). */
  private escreverLzw(indices: Uint8Array): void {
    const fluxo = new EscritorBytes();
    const CLEAR = 256;
    const FIM = 257;
    let acumulado = 0;
    let nBits = 0;
    let tamCodigo = 9;
    const escreve = (codigo: number): void => {
      acumulado |= codigo << nBits;
      nBits += tamCodigo;
      while (nBits >= 8) {
        fluxo.byte(acumulado & 0xff);
        acumulado >>>= 8;
        nBits -= 8;
      }
    };

    let dicionario = new Map<number, number>();
    let proximo = 258;
    escreve(CLEAR);
    let prefixo = indices.length ? indices[0] : 0;
    for (let i = 1; i < indices.length; i += 1) {
      const k = indices[i];
      const chave = (prefixo << 8) | k;
      const codigo = dicionario.get(chave);
      if (codigo !== undefined) {
        prefixo = codigo;
        continue;
      }
      escreve(prefixo);
      if (proximo === 4096) {
        escreve(CLEAR);
        dicionario = new Map<number, number>();
        tamCodigo = 9;
        proximo = 258;
      } else {
        if (proximo >= 1 << tamCodigo) tamCodigo += 1;
        dicionario.set(chave, proximo);
        proximo += 1;
      }
      prefixo = k;
    }
    escreve(prefixo);
    escreve(FIM);
    if (nBits > 0) fluxo.byte(acumulado & 0xff);

    // Dados em sub-blocos de até 255 bytes.
    this.saida.byte(8); // tamanho mínimo do código LZW
    const dados = fluxo.resultado();
    for (let i = 0; i < dados.length; i += 255) {
      const fatia = dados.subarray(i, Math.min(i + 255, dados.length));
      this.saida.byte(fatia.length);
      this.saida.bytes(fatia);
    }
    this.saida.byte(0);
  }
}
