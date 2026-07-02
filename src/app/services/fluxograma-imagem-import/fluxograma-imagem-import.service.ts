import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  DetectedConnectorCandidate,
  DetectedFlowchart,
  DetectedNode,
  DetectedPoint,
  FlowchartImageImportProgress,
  ShapeMetrics,
} from '../../models/detected-flowchart.model';
import { Fluxograma } from '../fluxograma.service';
import {
  classifyShape,
  detectedFlowchartToFluxograma,
  FlowchartAdapterOptions,
  inferEdgesFromConnectors,
} from './fluxograma-imagem-import.utils';

interface PreprocessedImage {
  width: number;
  height: number;
  gray: Uint8Array;
  binary: Uint8Array;
  threshold: number;
  inverted: boolean;
}

interface BackgroundRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
  rowMin: number[];
  rowMax: number[];
}

interface PixelComponent {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
  pixels: number[];
}

@Injectable({ providedIn: 'root' })
export class FluxogramaImagemImportService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async importarImagem(
    file: File,
    onProgress?: (progress: FlowchartImageImportProgress) => void,
  ): Promise<DetectedFlowchart> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Importacao por imagem disponivel apenas no navegador.');
    }
    this.validarArquivo(file);

    const progress = (stage: FlowchartImageImportProgress['stage'], value: number, message: string) =>
      onProgress?.({ stage, progress: Math.max(0, Math.min(100, Math.round(value))), message });

    progress('loading', 4, 'Carregando imagem');
    const image = await this.carregarImagem(file);
    const canvas = this.desenharEmCanvas(image);
    const ctx = this.contexto2d(canvas);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    progress('preprocessing', 18, 'Pre-processando pixels');
    const pre = this.preprocessar(imageData);
    const warnings: string[] = [];
    if (pre.inverted) {
      warnings.push('A imagem parece ter fundo escuro; a binarizacao foi invertida automaticamente.');
    }

    progress('shapes', 34, 'Detectando formas fechadas');
    let nodes = this.detectarNos(pre);
    if (!nodes.length) {
      warnings.push('Nao foi possivel encontrar formas fechadas; tentando fallback por componentes de borda.');
      nodes = this.detectarNosPorComponentes(pre);
    }
    if (!nodes.length) {
      throw new Error('Nao foi possivel detectar formas de fluxograma nesta imagem.');
    }

    progress('connectors', 52, 'Detectando conectores e setas');
    const connectors = this.detectarConectores(pre, nodes);
    const edgeResult = inferEdgesFromConnectors(nodes, connectors);
    warnings.push(...edgeResult.warnings);
    if (!edgeResult.edges.length) {
      warnings.push('Nenhuma conexao foi detectada com seguranca. As formas foram importadas sem ligacoes.');
    }

    progress('ocr', 60, 'Executando OCR nos nos detectados');
    nodes = await this.aplicarOcr(canvas, pre, nodes, warnings, (p) => {
      progress('ocr', 60 + p * 0.32, 'Lendo textos com OCR local');
    });

    progress('normalizing', 96, 'Normalizando resultado');
    return {
      nodes,
      edges: edgeResult.edges,
      warnings,
    };
  }

  converterParaFluxograma(detected: DetectedFlowchart, options?: FlowchartAdapterOptions): Fluxograma {
    return detectedFlowchartToFluxograma(detected, options);
  }

  private validarArquivo(file: File): void {
    const nomeValido = /\.(png|jpe?g)$/i.test(file.name);
    const tipoValido = /^image\/(png|jpeg)$/.test(file.type);
    if (!nomeValido && !tipoValido) {
      throw new Error('Envie uma imagem PNG ou JPG.');
    }
    if (file.size < 500) {
      throw new Error('Imagem vazia ou invalida.');
    }
  }

  private carregarImagem(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        if (!image.naturalWidth || !image.naturalHeight) {
          reject(new Error('Imagem invalida.'));
          return;
        }
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Nao foi possivel carregar a imagem.'));
      };
      image.src = url;
    });
  }

  private desenharEmCanvas(image: HTMLImageElement): HTMLCanvasElement {
    const maxDimensao = 1800;
    const escala = Math.min(1, maxDimensao / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * escala));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * escala));
    this.contexto2d(canvas).drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  private contexto2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas indisponivel neste navegador.');
    return ctx;
  }

  private preprocessar(imageData: ImageData): PreprocessedImage {
    const { width, height, data } = imageData;
    const gray = new Uint8Array(width * height);
    for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
      gray[p] = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    }

    const threshold = this.otsu(gray);
    let binary = new Uint8Array(width * height);
    let count = 0;
    for (let i = 0; i < gray.length; i += 1) {
      const ink = gray[i] < threshold ? 1 : 0;
      binary[i] = ink;
      count += ink;
    }

    const inverted = count / gray.length > 0.48;
    if (inverted) {
      count = 0;
      for (let i = 0; i < gray.length; i += 1) {
        const ink = gray[i] > threshold ? 1 : 0;
        binary[i] = ink;
        count += ink;
      }
    }

    binary = this.limparRuido(binary, width, height);
    binary = this.fecharPequenasFalhas(binary, width, height);
    return { width, height, gray, binary, threshold, inverted };
  }

  private otsu(gray: Uint8Array): number {
    const hist = new Array<number>(256).fill(0);
    for (const value of gray) hist[value] += 1;

    const total = gray.length;
    let sum = 0;
    for (let i = 0; i < 256; i += 1) sum += i * hist[i];

    let sumB = 0;
    let wB = 0;
    let maxVariance = -1;
    let threshold = 128;
    for (let t = 0; t < 256; t += 1) {
      wB += hist[t];
      if (wB === 0) continue;
      const wF = total - wB;
      if (wF === 0) break;
      sumB += t * hist[t];
      const mB = sumB / wB;
      const mF = (sum - sumB) / wF;
      const variance = wB * wF * (mB - mF) * (mB - mF);
      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = t;
      }
    }
    return threshold;
  }

  private limparRuido(src: Uint8Array, width: number, height: number): Uint8Array {
    const out = new Uint8Array(src.length);
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const i = y * width + x;
        const count =
          src[i] +
          src[i - 1] +
          src[i + 1] +
          src[i - width] +
          src[i + width] +
          src[i - width - 1] +
          src[i - width + 1] +
          src[i + width - 1] +
          src[i + width + 1];
        out[i] = src[i] ? (count >= 2 ? 1 : 0) : count >= 7 ? 1 : 0;
      }
    }
    return out;
  }

  private fecharPequenasFalhas(src: Uint8Array, width: number, height: number): Uint8Array {
    const dilated = new Uint8Array(src.length);
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const i = y * width + x;
        dilated[i] =
          src[i] ||
          src[i - 1] ||
          src[i + 1] ||
          src[i - width] ||
          src[i + width]
            ? 1
            : 0;
      }
    }

    const eroded = new Uint8Array(src.length);
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const i = y * width + x;
        eroded[i] =
          dilated[i] &&
          dilated[i - 1] &&
          dilated[i + 1] &&
          dilated[i - width] &&
          dilated[i + width]
            ? 1
            : 0;
      }
    }
    return eroded;
  }

  private detectarNos(pre: PreprocessedImage): DetectedNode[] {
    const regions = this.encontrarRegioesInternas(pre.binary, pre.width, pre.height);
    const minArea = Math.max(600, (pre.width * pre.height) / 4500);
    const nodes = regions
      .filter((r) => r.area >= minArea && r.width >= 34 && r.height >= 24)
      .map((region, i) => this.regionToNode(region, pre.width, pre.height, i + 1))
      .filter((node) => node.width >= 42 && node.height >= 30);

    return this.deduplicarNos(nodes).sort((a, b) => a.y - b.y || a.x - b.x).map((node, i) => ({
      ...node,
      id: `n${i + 1}`,
    }));
  }

  private detectarNosPorComponentes(pre: PreprocessedImage): DetectedNode[] {
    const comps = this.componentesForeground(pre.binary, pre.width, pre.height);
    const nodes = comps
      .filter((c) => c.width >= 48 && c.height >= 32)
      .filter((c) => c.width / Math.max(1, c.height) < 5.5 && c.height / Math.max(1, c.width) < 3.5)
      .filter((c) => c.area / Math.max(1, c.width * c.height) < 0.42)
      .map((c, i) => {
        const metrics: ShapeMetrics = {
          width: c.width,
          height: c.height,
          fillRatio: Math.min(1, c.area / Math.max(1, c.width * c.height) * 2.4),
          topWidthRatio: 0.9,
          middleWidthRatio: 1,
          bottomWidthRatio: 0.9,
          centerSkewRatio: 0,
        };
        const cls = classifyShape(metrics);
        return {
          id: `n${i + 1}`,
          type: cls.type,
          text: '',
          x: c.x,
          y: c.y,
          width: c.width,
          height: c.height,
          confidence: Math.min(cls.confidence, 0.48),
        };
      });
    return this.deduplicarNos(nodes).sort((a, b) => a.y - b.y || a.x - b.x).map((node, i) => ({
      ...node,
      id: `n${i + 1}`,
    }));
  }

  private encontrarRegioesInternas(binary: Uint8Array, width: number, height: number): BackgroundRegion[] {
    const visited = new Uint8Array(binary.length);
    this.marcarFundoExterno(binary, width, height, visited);

    const regions: BackgroundRegion[] = [];
    for (let i = 0; i < binary.length; i += 1) {
      if (binary[i] === 0 && !visited[i]) {
        regions.push(this.coletarRegiaoFundo(i, binary, width, height, visited));
      }
    }
    return regions;
  }

  private marcarFundoExterno(binary: Uint8Array, width: number, height: number, visited: Uint8Array): void {
    const queue = new Int32Array(binary.length);
    let head = 0;
    let tail = 0;
    const push = (idx: number) => {
      if (idx < 0 || idx >= binary.length || visited[idx] || binary[idx]) return;
      visited[idx] = 1;
      queue[tail] = idx;
      tail += 1;
    };

    for (let x = 0; x < width; x += 1) {
      push(x);
      push((height - 1) * width + x);
    }
    for (let y = 0; y < height; y += 1) {
      push(y * width);
      push(y * width + width - 1);
    }

    while (head < tail) {
      const idx = queue[head];
      head += 1;
      const x = idx % width;
      if (x > 0) push(idx - 1);
      if (x < width - 1) push(idx + 1);
      if (idx >= width) push(idx - width);
      if (idx < binary.length - width) push(idx + width);
    }
  }

  private coletarRegiaoFundo(
    start: number,
    binary: Uint8Array,
    width: number,
    height: number,
    visited: Uint8Array,
  ): BackgroundRegion {
    const queue = new Int32Array(binary.length);
    const rowMin = new Array<number>(height).fill(Infinity);
    const rowMax = new Array<number>(height).fill(-Infinity);
    let head = 0;
    let tail = 0;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let area = 0;

    const push = (idx: number) => {
      if (idx < 0 || idx >= binary.length || visited[idx] || binary[idx]) return;
      visited[idx] = 1;
      queue[tail] = idx;
      tail += 1;
    };
    push(start);

    while (head < tail) {
      const idx = queue[head];
      head += 1;
      const x = idx % width;
      const y = Math.floor(idx / width);
      area += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      rowMin[y] = Math.min(rowMin[y], x);
      rowMax[y] = Math.max(rowMax[y], x);
      if (x > 0) push(idx - 1);
      if (x < width - 1) push(idx + 1);
      if (y > 0) push(idx - width);
      if (y < height - 1) push(idx + width);
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
      area,
      rowMin,
      rowMax,
    };
  }

  private regionToNode(region: BackgroundRegion, imageWidth: number, imageHeight: number, index: number): DetectedNode {
    const pad = 6;
    const x = Math.max(0, region.x - pad);
    const y = Math.max(0, region.y - pad);
    const width = Math.min(imageWidth - x, region.width + pad * 2);
    const height = Math.min(imageHeight - y, region.height + pad * 2);
    const metrics = this.metricsFromRegion(region);
    const cls = classifyShape(metrics);
    return {
      id: `n${index}`,
      type: cls.type,
      text: '',
      x,
      y,
      width,
      height,
      confidence: cls.confidence,
    };
  }

  private metricsFromRegion(region: BackgroundRegion): ShapeMetrics {
    const maxSpan = this.maxSpan(region);
    const top = this.spanRatioAt(region, 0.12, maxSpan);
    const middle = this.spanRatioAt(region, 0.5, maxSpan);
    const bottom = this.spanRatioAt(region, 0.88, maxSpan);
    const topCenter = this.centerAt(region, 0.22);
    const bottomCenter = this.centerAt(region, 0.78);
    const centerSkewRatio = (topCenter - bottomCenter) / Math.max(1, region.width);
    return {
      width: region.width,
      height: region.height,
      fillRatio: region.area / Math.max(1, region.width * region.height),
      topWidthRatio: top,
      middleWidthRatio: middle,
      bottomWidthRatio: bottom,
      centerSkewRatio,
      circularity: this.circularityFromSpans(top, middle, bottom),
    };
  }

  private maxSpan(region: BackgroundRegion): number {
    let max = 1;
    for (let y = region.y; y < region.y + region.height; y += 1) {
      if (Number.isFinite(region.rowMin[y]) && Number.isFinite(region.rowMax[y])) {
        max = Math.max(max, region.rowMax[y] - region.rowMin[y] + 1);
      }
    }
    return max;
  }

  private spanRatioAt(region: BackgroundRegion, relativeY: number, maxSpan: number): number {
    const y = Math.max(region.y, Math.min(region.y + region.height - 1, Math.round(region.y + region.height * relativeY)));
    for (let offset = 0; offset < 8; offset += 1) {
      for (const yy of [y - offset, y + offset]) {
        if (yy >= 0 && yy < region.rowMin.length && Number.isFinite(region.rowMin[yy]) && Number.isFinite(region.rowMax[yy])) {
          return (region.rowMax[yy] - region.rowMin[yy] + 1) / maxSpan;
        }
      }
    }
    return 0;
  }

  private centerAt(region: BackgroundRegion, relativeY: number): number {
    const y = Math.max(region.y, Math.min(region.y + region.height - 1, Math.round(region.y + region.height * relativeY)));
    for (let offset = 0; offset < 8; offset += 1) {
      for (const yy of [y - offset, y + offset]) {
        if (yy >= 0 && yy < region.rowMin.length && Number.isFinite(region.rowMin[yy]) && Number.isFinite(region.rowMax[yy])) {
          return (region.rowMin[yy] + region.rowMax[yy]) / 2;
        }
      }
    }
    return region.x + region.width / 2;
  }

  private circularityFromSpans(top: number, middle: number, bottom: number): number {
    const roundedTop = 1 - Math.abs(middle - top);
    const roundedBottom = 1 - Math.abs(middle - bottom);
    return Math.max(0, Math.min(1, (roundedTop + roundedBottom) / 2));
  }

  private deduplicarNos(nodes: DetectedNode[]): DetectedNode[] {
    const sorted = [...nodes].sort((a, b) => b.width * b.height - a.width * a.height);
    const result: DetectedNode[] = [];
    for (const node of sorted) {
      const duplicate = result.some((other) => this.overlapRatio(node, other) > 0.55);
      if (!duplicate) result.push(node);
    }
    return result;
  }

  private overlapRatio(a: DetectedNode, b: DetectedNode): number {
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.width, b.x + b.width);
    const y2 = Math.min(a.y + a.height, b.y + b.height);
    const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
    return inter / Math.max(1, Math.min(a.width * a.height, b.width * b.height));
  }

  private detectarConectores(pre: PreprocessedImage, nodes: DetectedNode[]): DetectedConnectorCandidate[] {
    const mask = this.nodeMask(nodes, pre.width, pre.height, 8);
    const comps = this.componentesForeground(pre.binary, pre.width, pre.height, mask);
    const candidates: DetectedConnectorCandidate[] = [];

    for (const comp of comps) {
      const density = comp.area / Math.max(1, comp.width * comp.height);
      if (comp.area < 8 || density > 0.62) continue;
      if (Math.max(comp.width, comp.height) < 18) continue;

      const pair = this.farthestPair(comp.pixels, pre.width);
      if (!pair) continue;
      const points = this.connectorPoints(comp, pair.start, pair.end, pre.width);
      const arrowAtStart = this.arrowEndpointScore(comp, pair.start, pair.end, pre.width) >
        this.arrowEndpointScore(comp, pair.end, pair.start, pre.width) * 1.18;
      const arrowAtEnd = this.arrowEndpointScore(comp, pair.end, pair.start, pre.width) >
        this.arrowEndpointScore(comp, pair.start, pair.end, pre.width) * 1.18;
      candidates.push({
        id: `c${candidates.length + 1}`,
        points,
        start: pair.start,
        end: pair.end,
        arrowAtStart,
        arrowAtEnd,
        confidence: Math.min(0.88, 0.45 + Math.min(0.3, Math.max(comp.width, comp.height) / 320) + (density < 0.22 ? 0.12 : 0)),
      });
    }

    return candidates;
  }

  private nodeMask(nodes: DetectedNode[], width: number, height: number, pad: number): Uint8Array {
    const mask = new Uint8Array(width * height);
    for (const node of nodes) {
      const x1 = Math.max(0, Math.floor(node.x - pad));
      const y1 = Math.max(0, Math.floor(node.y - pad));
      const x2 = Math.min(width - 1, Math.ceil(node.x + node.width + pad));
      const y2 = Math.min(height - 1, Math.ceil(node.y + node.height + pad));
      for (let y = y1; y <= y2; y += 1) {
        const row = y * width;
        for (let x = x1; x <= x2; x += 1) mask[row + x] = 1;
      }
    }
    return mask;
  }

  private componentesForeground(binary: Uint8Array, width: number, height: number, mask?: Uint8Array): PixelComponent[] {
    const visited = new Uint8Array(binary.length);
    const comps: PixelComponent[] = [];
    const queue = new Int32Array(binary.length);

    for (let start = 0; start < binary.length; start += 1) {
      if (!binary[start] || visited[start] || mask?.[start]) continue;
      let head = 0;
      let tail = 0;
      let minX = width;
      let minY = height;
      let maxX = 0;
      let maxY = 0;
      const pixels: number[] = [];
      visited[start] = 1;
      queue[tail] = start;
      tail += 1;

      while (head < tail) {
        const idx = queue[head];
        head += 1;
        pixels.push(idx);
        const x = idx % width;
        const y = Math.floor(idx / width);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);

        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const nidx = ny * width + nx;
            if (visited[nidx] || !binary[nidx] || mask?.[nidx]) continue;
            visited[nidx] = 1;
            queue[tail] = nidx;
            tail += 1;
          }
        }
      }

      comps.push({
        x: minX,
        y: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
        area: pixels.length,
        pixels,
      });
    }
    return comps;
  }

  private farthestPair(pixels: number[], width: number): { start: DetectedPoint; end: DetectedPoint } | null {
    if (pixels.length < 2) return null;
    const first = this.pointFromIndex(pixels[0], width);
    const a = this.farthestFrom(first, pixels, width);
    const b = this.farthestFrom(a, pixels, width);
    return { start: a, end: b };
  }

  private farthestFrom(point: DetectedPoint, pixels: number[], width: number): DetectedPoint {
    let best = this.pointFromIndex(pixels[0], width);
    let bestDistance = -1;
    for (const idx of pixels) {
      const p = this.pointFromIndex(idx, width);
      const d = (p.x - point.x) * (p.x - point.x) + (p.y - point.y) * (p.y - point.y);
      if (d > bestDistance) {
        bestDistance = d;
        best = p;
      }
    }
    return best;
  }

  private pointFromIndex(idx: number, width: number): DetectedPoint {
    return { x: idx % width, y: Math.floor(idx / width) };
  }

  private connectorPoints(comp: PixelComponent, start: DetectedPoint, end: DetectedPoint, width: number): DetectedPoint[] {
    if (comp.width < 24 || comp.height < 24) return [start, end];
    const cornerA = { x: start.x, y: end.y };
    const cornerB = { x: end.x, y: start.y };
    const scoreA = this.axisPathScore(comp.pixels, width, [start, cornerA, end]);
    const scoreB = this.axisPathScore(comp.pixels, width, [start, cornerB, end]);
    const bestCorner = scoreA > scoreB ? cornerA : cornerB;
    const bestScore = Math.max(scoreA, scoreB);
    return bestScore > 0.48 ? [start, bestCorner, end] : [start, end];
  }

  private axisPathScore(pixels: number[], width: number, points: DetectedPoint[]): number {
    let near = 0;
    for (const idx of pixels) {
      const p = this.pointFromIndex(idx, width);
      if (this.distanceToAxisPolyline(p, points) <= 4) near += 1;
    }
    return near / Math.max(1, pixels.length);
  }

  private distanceToAxisPolyline(p: DetectedPoint, points: DetectedPoint[]): number {
    let best = Infinity;
    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      if (Math.abs(a.y - b.y) <= Math.abs(a.x - b.x)) {
        const minX = Math.min(a.x, b.x);
        const maxX = Math.max(a.x, b.x);
        if (p.x >= minX && p.x <= maxX) best = Math.min(best, Math.abs(p.y - a.y));
      } else {
        const minY = Math.min(a.y, b.y);
        const maxY = Math.max(a.y, b.y);
        if (p.y >= minY && p.y <= maxY) best = Math.min(best, Math.abs(p.x - a.x));
      }
    }
    return best;
  }

  private arrowEndpointScore(comp: PixelComponent, endpoint: DetectedPoint, other: DetectedPoint, width: number): number {
    const radius = 13;
    const dx = endpoint.x - other.x;
    const dy = endpoint.y - other.y;
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;
    let count = 0;
    let minProj = Infinity;
    let maxProj = -Infinity;
    for (const idx of comp.pixels) {
      const p = this.pointFromIndex(idx, width);
      const dist = Math.hypot(p.x - endpoint.x, p.y - endpoint.y);
      if (dist > radius) continue;
      count += 1;
      const proj = (p.x - endpoint.x) * px + (p.y - endpoint.y) * py;
      minProj = Math.min(minProj, proj);
      maxProj = Math.max(maxProj, proj);
    }
    const spread = Number.isFinite(minProj) ? maxProj - minProj : 0;
    return count + spread * 2;
  }

  private async aplicarOcr(
    canvas: HTMLCanvasElement,
    pre: PreprocessedImage,
    nodes: DetectedNode[],
    warnings: string[],
    onProgress: (progress: number) => void,
  ): Promise<DetectedNode[]> {
    if (!nodes.length) return nodes;
    let worker: any;
    try {
      const { createWorker } = await import('tesseract.js');
      // Usa os caminhos padrao (CDN) do tesseract.js. Os assets locais estavam
      // incompletos (faltavam os binarios .wasm e os traineddata dos idiomas),
      // por isso o worker falhava ao iniciar e nenhum texto era extraido.
      worker = await createWorker(['por', 'eng'], 1, {
        logger: (m: any) => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            onProgress(m.progress);
          }
        },
        errorHandler: (err: any) => console.error('Erro interno do OCR do importador:', err),
      } as any);
    } catch (e) {
      warnings.push(
        'OCR indisponivel (' +
          (e instanceof Error ? e.message : 'falha ao iniciar o Tesseract') +
          '). Os nos foram importados sem texto.',
      );
      return nodes;
    }

    try {
      // Trata cada recorte como um bloco unico de texto.
      await worker.setParameters({ tessedit_pageseg_mode: '6' } as any);
    } catch {
      /* ignora se a versao do tesseract nao aceitar */
    }

    const result: DetectedNode[] = [];
    try {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const crop = this.cropTextoNo(pre, node) ?? this.cropNode(canvas, node);
        try {
          const ocr = await worker.recognize(crop as any);
          const text = this.limparTextoOcr(String(ocr.data?.text ?? ''));
          const confidence = typeof ocr.data?.confidence === 'number' ? ocr.data.confidence / 100 : 0;
          result.push({
            ...node,
            text,
            confidence: text ? Math.min(1, node.confidence * 0.85 + confidence * 0.15) : node.confidence,
          });
        } catch {
          warnings.push(`OCR falhou no no ${node.id}.`);
          result.push(node);
        }
        onProgress((i + 1) / nodes.length);
      }
    } finally {
      await worker.terminate();
    }
    return result;
  }

  /**
   * Recorta apenas a regiao com texto dentro do no (excluindo a borda da forma),
   * gerando uma imagem binaria limpa (texto preto sobre branco) e ampliada para o OCR.
   */
  private cropTextoNo(pre: PreprocessedImage, node: DetectedNode): HTMLCanvasElement | null {
    const W = pre.width;
    const H = pre.height;
    const mx = Math.round(Math.min(node.width * 0.16, 12));
    const my = Math.round(Math.min(node.height * 0.18, 10));
    const ix0 = Math.max(0, Math.round(node.x + mx));
    const iy0 = Math.max(0, Math.round(node.y + my));
    const ix1 = Math.min(W - 1, Math.round(node.x + node.width - mx));
    const iy1 = Math.min(H - 1, Math.round(node.y + node.height - my));
    if (ix1 <= ix0 || iy1 <= iy0) return null;

    let minx = ix1;
    let miny = iy1;
    let maxx = ix0;
    let maxy = iy0;
    let count = 0;
    for (let y = iy0; y <= iy1; y += 1) {
      const row = y * W;
      for (let x = ix0; x <= ix1; x += 1) {
        if (pre.binary[row + x]) {
          count += 1;
          if (x < minx) minx = x;
          if (x > maxx) maxx = x;
          if (y < miny) miny = y;
          if (y > maxy) maxy = y;
        }
      }
    }
    if (count < 6 || maxx < minx || maxy < miny) return null;

    const pad = 3;
    minx = Math.max(ix0, minx - pad);
    miny = Math.max(iy0, miny - pad);
    maxx = Math.min(ix1, maxx + pad);
    maxy = Math.min(iy1, maxy + pad);
    const w = maxx - minx + 1;
    const h = maxy - miny + 1;
    const escala = Math.max(2, Math.min(8, Math.round(56 / Math.max(1, h))));

    const canvas = document.createElement('canvas');
    canvas.width = w * escala;
    canvas.height = h * escala;
    const ctx = this.contexto2d(canvas);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    for (let y = miny; y <= maxy; y += 1) {
      const row = y * W;
      for (let x = minx; x <= maxx; x += 1) {
        if (pre.binary[row + x]) {
          ctx.fillRect((x - minx) * escala, (y - miny) * escala, escala, escala);
        }
      }
    }
    return canvas;
  }

  private cropNode(source: HTMLCanvasElement, node: DetectedNode): HTMLCanvasElement {
    const padX = Math.min(14, Math.max(6, node.width * 0.12));
    const padY = Math.min(12, Math.max(5, node.height * 0.16));
    const sx = Math.max(0, Math.round(node.x + padX));
    const sy = Math.max(0, Math.round(node.y + padY));
    const sw = Math.max(1, Math.min(source.width - sx, Math.round(node.width - padX * 2)));
    const sh = Math.max(1, Math.min(source.height - sy, Math.round(node.height - padY * 2)));
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = sw * scale;
    canvas.height = sh * scale;
    const ctx = this.contexto2d(canvas);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  private limparTextoOcr(text: string): string {
    return text
      .replace(/[|_~`]/g, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join('\n')
      .trim();
  }
}
