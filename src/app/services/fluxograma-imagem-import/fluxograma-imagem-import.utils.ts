import {
  DetectedConnectorCandidate,
  DetectedEdge,
  DetectedFlowchart,
  DetectedNode,
  DetectedTextRegion,
  ShapeClassification,
  ShapeMetrics,
} from '../../models/detected-flowchart.model';
import {
  ConexaoFluxograma,
  Fluxograma,
  FormaTipo,
  NoFluxograma,
  TAMANHO_SETA_PADRAO,
  TipoTraco,
} from '../fluxograma.service';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EdgeInferenceOptions {
  maxEndpointDistance?: number;
}

export interface EdgeInferenceResult {
  edges: DetectedEdge[];
  warnings: string[];
}

export interface FlowchartAdapterOptions {
  corFundo?: string;
  corBorda?: string;
  corTexto?: string;
  corLinha?: string;
  tamanhoSeta?: number;
  tipoTraco?: TipoTraco;
}

const DEFAULT_ADAPTER_OPTIONS: Required<FlowchartAdapterOptions> = {
  corFundo: '#0b2344',
  corBorda: '#00ffd1',
  corTexto: '#f4fbff',
  corLinha: '#5b7cff',
  tamanhoSeta: TAMANHO_SETA_PADRAO,
  tipoTraco: 'solido',
};

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function classifyShape(metrics: ShapeMetrics): ShapeClassification {
  const aspect = metrics.width / Math.max(1, metrics.height);
  const top = metrics.topWidthRatio;
  const mid = metrics.middleWidthRatio;
  const bottom = metrics.bottomWidthRatio;
  const skew = Math.abs(metrics.centerSkewRatio);
  const fill = metrics.fillRatio;
  const circularity = metrics.circularity ?? 0;

  if (mid > 0.68 && top < 0.62 && bottom < 0.62 && aspect >= 0.65 && aspect <= 3.2) {
    const confidence = 0.62 + (0.62 - Math.max(top, bottom)) * 0.35 + Math.min(0.2, mid * 0.12);
    return { type: 'decision', confidence: clamp01(confidence) };
  }

  // Circulo: quase quadrado, largo no meio e arredondado (mais estreito no topo/base que um retangulo).
  if (mid > 0.85 && top > 0.5 && top < 0.82 && bottom > 0.5 && bottom < 0.82 && aspect >= 0.8 && aspect <= 1.28) {
    return { type: 'circle', confidence: clamp01(0.58 + (0.82 - Math.max(top, bottom)) * 0.4) };
  }

  if (mid > 0.72 && top > 0.58 && bottom > 0.58 && skew > 0.08 && aspect >= 1.05) {
    return { type: 'inputOutput', confidence: clamp01(0.58 + skew * 1.5) };
  }

  if (
    mid > 0.72 &&
    top < 0.82 &&
    bottom < 0.82 &&
    aspect >= 1.15 &&
    (circularity > 0.45 || fill < 0.82)
  ) {
    const roundness = (0.82 - Math.max(top, bottom)) + Math.min(0.25, circularity * 0.25);
    return { type: 'terminator', confidence: clamp01(0.56 + roundness) };
  }

  if (metrics.vertices === 4 && skew > 0.07 && aspect >= 1.05) {
    return { type: 'inputOutput', confidence: clamp01(0.54 + skew) };
  }

  if (top > 0.76 && mid > 0.82 && bottom > 0.76 && fill > 0.68) {
    return { type: 'process', confidence: clamp01(0.64 + Math.min(0.24, fill * 0.18)) };
  }

  if (circularity > 0.64 && aspect >= 0.65 && aspect <= 1.7) {
    return { type: 'terminator', confidence: clamp01(0.48 + circularity * 0.28) };
  }

  return { type: 'unknown', confidence: 0.35 };
}

export function associateTextRegionsToNodes(
  nodes: DetectedNode[],
  textRegions: DetectedTextRegion[],
): DetectedNode[] {
  const grouped = new Map<string, DetectedTextRegion[]>();
  for (const node of nodes) grouped.set(node.id, []);

  for (const text of textRegions) {
    let bestNode: DetectedNode | null = null;
    let bestScore = 0;
    for (const node of nodes) {
      const score = textNodeScore(text, node);
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    if (bestNode && bestScore > 0.15) {
      grouped.get(bestNode.id)?.push(text);
    }
  }

  return nodes.map((node) => {
    const regions = (grouped.get(node.id) ?? []).sort((a, b) => a.y - b.y || a.x - b.x);
    const text = regions.map((r) => r.text.trim()).filter(Boolean).join('\n');
    if (!text) return node;
    const avgConfidence = regions.reduce((acc, r) => acc + r.confidence, 0) / regions.length;
    return {
      ...node,
      text,
      confidence: clamp01(node.confidence * 0.82 + avgConfidence * 0.18),
    };
  });
}

export function inferEdgesFromConnectors(
  nodes: DetectedNode[],
  connectors: DetectedConnectorCandidate[],
  options: EdgeInferenceOptions = {},
): EdgeInferenceResult {
  const maxEndpointDistance = options.maxEndpointDistance ?? 82;
  const warnings: string[] = [];
  const byPair = new Map<string, DetectedEdge>();

  for (const connector of connectors) {
    const startMatch = nearestNode(connector.start, nodes);
    const endMatch = nearestNode(connector.end, nodes);

    if (!startMatch || !endMatch || startMatch.distance > maxEndpointDistance || endMatch.distance > maxEndpointDistance) {
      warnings.push(`Conector ${connector.id} ignorado: extremidades longe de nos detectados.`);
      continue;
    }
    if (startMatch.node.id === endMatch.node.id) {
      warnings.push(`Conector ${connector.id} ignorado: origem e destino apontam para o mesmo no.`);
      continue;
    }

    let sourceNodeId = startMatch.node.id;
    let targetNodeId = endMatch.node.id;
    let directionConfidence = 0.42;

    if (connector.arrowAtEnd && !connector.arrowAtStart) {
      sourceNodeId = startMatch.node.id;
      targetNodeId = endMatch.node.id;
      directionConfidence = 0.86;
    } else if (connector.arrowAtStart && !connector.arrowAtEnd) {
      sourceNodeId = endMatch.node.id;
      targetNodeId = startMatch.node.id;
      directionConfidence = 0.86;
    } else {
      const source = centerOf(startMatch.node);
      const target = centerOf(endMatch.node);
      if (target.y < source.y - 12 || target.x < source.x - 24) {
        sourceNodeId = endMatch.node.id;
        targetNodeId = startMatch.node.id;
      }
      warnings.push(`Direcao do conector ${connector.id} inferida por proximidade; revise no editor.`);
    }

    const endpointConfidence =
      (1 - Math.min(startMatch.distance, maxEndpointDistance) / maxEndpointDistance) * 0.28 +
      (1 - Math.min(endMatch.distance, maxEndpointDistance) / maxEndpointDistance) * 0.28;
    const confidence = clamp01(connector.confidence * 0.34 + directionConfidence * 0.38 + endpointConfidence);
    const edge: DetectedEdge = {
      id: connector.id.replace(/^c/, 'e'),
      sourceNodeId,
      targetNodeId,
      points: normalizeConnectorPoints(connector.points),
      confidence,
    };

    const key = `${edge.sourceNodeId}->${edge.targetNodeId}`;
    const current = byPair.get(key);
    if (!current || current.confidence < edge.confidence) {
      byPair.set(key, edge);
    }
  }

  return { edges: Array.from(byPair.values()), warnings };
}

export function detectedFlowchartToFluxograma(
  detected: DetectedFlowchart,
  options: FlowchartAdapterOptions = {},
): Fluxograma {
  const style = { ...DEFAULT_ADAPTER_OPTIONS, ...options };
  const ids = new Set(detected.nodes.map((n) => n.id));

  // Escala global para dimensoes compactas (o suficiente para o texto), preservando o layout.
  const alturas = detected.nodes.map((n) => n.height).filter((h) => h > 0).sort((a, b) => a - b);
  const medianaAltura = alturas.length ? alturas[Math.floor(alturas.length / 2)] : 60;
  const escala = Math.min(1, Math.max(0.12, 58 / Math.max(1, medianaAltura)));

  const nos: NoFluxograma[] = detected.nodes.map((node, i) => ({
    id: sanitizeId(node.id, 'n', i + 1),
    tipo: detectedTypeToFormaTipo(node.type),
    x: Math.round(node.x * escala),
    y: Math.round(node.y * escala),
    largura: Math.max(64, Math.round(node.width * escala)),
    altura: Math.max(40, Math.round(node.height * escala)),
    texto: node.text || fallbackNodeText(node.type),
    corFundo: style.corFundo,
    corBorda: node.confidence < 0.55 ? '#ffb020' : style.corBorda,
    espessuraBorda: node.confidence < 0.55 ? 3 : 2,
    corTexto: style.corTexto,
    tipoTraco: style.tipoTraco,
  }));

  const idMap = new Map(detected.nodes.map((n, i) => [n.id, nos[i].id]));
  const conexoes: ConexaoFluxograma[] = detected.edges
    .filter((edge) => ids.has(edge.sourceNodeId) && ids.has(edge.targetNodeId))
    .map((edge, i) => ({
      id: sanitizeId(edge.id, 'e', i + 1),
      de: idMap.get(edge.sourceNodeId) ?? edge.sourceNodeId,
      para: idMap.get(edge.targetNodeId) ?? edge.targetNodeId,
      texto: '',
      cor: edge.confidence < 0.55 ? '#ffb020' : style.corLinha,
      espessura: edge.confidence < 0.55 ? 3 : 2,
      tracejada: false,
      setaInicio: false,
      setaFim: true,
      tamanhoSeta: style.tamanhoSeta,
      tipoTraco: style.tipoTraco,
    }));

  return { nos, conexoes };
}

export function detectedTypeToFormaTipo(type: DetectedNode['type']): FormaTipo {
  switch (type) {
    case 'decision':
      return 'losango';
    case 'terminator':
      return 'terminador';
    case 'inputOutput':
      return 'paralelogramo';
    case 'circle':
      return 'circulo';
    case 'process':
    case 'unknown':
    default:
      return 'retangulo';
  }
}

function textNodeScore(text: DetectedTextRegion, node: DetectedNode): number {
  const intersection = intersectionArea(text, node);
  const textArea = Math.max(1, text.width * text.height);
  const overlap = intersection / textArea;
  const textCenter = centerOf(text);
  const nodeCenter = centerOf(node);
  const maxDistance = Math.hypot(node.width, node.height) || 1;
  const distanceScore = 1 - Math.min(1, distance(textCenter, nodeCenter) / maxDistance);
  return overlap * 0.75 + distanceScore * 0.25;
}

function nearestNode(point: { x: number; y: number }, nodes: DetectedNode[]): { node: DetectedNode; distance: number } | null {
  let best: { node: DetectedNode; distance: number } | null = null;
  for (const node of nodes) {
    const d = distancePointToRect(point, node);
    if (!best || d < best.distance) best = { node, distance: d };
  }
  return best;
}

function distancePointToRect(point: { x: number; y: number }, rect: Rect): number {
  const dx = Math.max(rect.x - point.x, 0, point.x - (rect.x + rect.width));
  const dy = Math.max(rect.y - point.y, 0, point.y - (rect.y + rect.height));
  return Math.hypot(dx, dy);
}

function intersectionArea(a: Rect, b: Rect): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  return Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
}

function centerOf(rect: Rect): { x: number; y: number } {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function normalizeConnectorPoints(points: Array<{ x: number; y: number }>): Array<{ x: number; y: number }> {
  if (points.length <= 2) return points.map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) }));
  const normalized: Array<{ x: number; y: number }> = [];
  for (const point of points) {
    const p = { x: Math.round(point.x), y: Math.round(point.y) };
    const last = normalized[normalized.length - 1];
    if (!last || distance(last, p) > 2) normalized.push(p);
  }
  return normalized;
}

function sanitizeId(id: string, prefix: string, fallbackIndex: number): string {
  const clean = id.replace(/[^A-Za-z0-9_]/g, '');
  return clean || `${prefix}${fallbackIndex}`;
}

function fallbackNodeText(type: DetectedNode['type']): string {
  switch (type) {
    case 'decision':
      return 'Decisao?';
    case 'terminator':
      return 'Inicio/Fim';
    case 'inputOutput':
      return 'Entrada/Saida';
    case 'process':
      return 'Processo';
    default:
      return 'Texto';
  }
}
