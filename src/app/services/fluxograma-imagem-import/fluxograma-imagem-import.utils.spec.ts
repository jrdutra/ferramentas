import {
  DetectedConnectorCandidate,
  DetectedFlowchart,
  DetectedNode,
  DetectedTextRegion,
} from '../../models/detected-flowchart.model';
import {
  associateTextRegionsToNodes,
  classifyShape,
  detectedFlowchartToFluxograma,
  inferEdgesFromConnectors,
} from './fluxograma-imagem-import.utils';

describe('fluxograma-imagem-import utils', () => {
  it('classifica losango como decisao', () => {
    const result = classifyShape({
      width: 120,
      height: 90,
      fillRatio: 0.52,
      topWidthRatio: 0.18,
      middleWidthRatio: 1,
      bottomWidthRatio: 0.2,
      centerSkewRatio: 0,
    });

    expect(result.type).toBe('decision');
    expect(result.confidence).toBeGreaterThan(0.65);
  });

  it('classifica paralelogramo como entrada/saida', () => {
    const result = classifyShape({
      width: 160,
      height: 70,
      fillRatio: 0.88,
      topWidthRatio: 0.9,
      middleWidthRatio: 1,
      bottomWidthRatio: 0.9,
      centerSkewRatio: 0.16,
      vertices: 4,
    });

    expect(result.type).toBe('inputOutput');
    expect(result.confidence).toBeGreaterThan(0.6);
  });

  it('associa regioes de texto ao no com maior sobreposicao', () => {
    const nodes: DetectedNode[] = [
      node('n1', 10, 10, 120, 70),
      node('n2', 240, 10, 120, 70),
    ];
    const textRegions: DetectedTextRegion[] = [
      { text: 'Validar dados', x: 32, y: 28, width: 72, height: 20, confidence: 0.91 },
      { text: 'Salvar', x: 275, y: 34, width: 50, height: 18, confidence: 0.88 },
    ];

    const result = associateTextRegionsToNodes(nodes, textRegions);

    expect(result[0].text).toBe('Validar dados');
    expect(result[1].text).toBe('Salvar');
  });

  it('infere origem e destino usando ponta de seta no fim do conector', () => {
    const nodes: DetectedNode[] = [
      node('n1', 10, 10, 90, 60),
      node('n2', 190, 10, 90, 60),
    ];
    const connectors: DetectedConnectorCandidate[] = [
      {
        id: 'c1',
        start: { x: 101, y: 40 },
        end: { x: 188, y: 40 },
        points: [{ x: 101, y: 40 }, { x: 188, y: 40 }],
        arrowAtStart: false,
        arrowAtEnd: true,
        confidence: 0.8,
      },
    ];

    const result = inferEdgesFromConnectors(nodes, connectors, { maxEndpointDistance: 16 });

    expect(result.edges.length).toBe(1);
    expect(result.edges[0].sourceNodeId).toBe('n1');
    expect(result.edges[0].targetNodeId).toBe('n2');
    expect(result.edges[0].confidence).toBeGreaterThan(0.7);
  });

  it('gera warning quando a direcao do conector foi inferida sem seta', () => {
    const nodes: DetectedNode[] = [
      node('n1', 10, 10, 90, 60),
      node('n2', 10, 140, 90, 60),
    ];
    const connectors: DetectedConnectorCandidate[] = [
      {
        id: 'c1',
        start: { x: 55, y: 72 },
        end: { x: 55, y: 138 },
        points: [{ x: 55, y: 72 }, { x: 55, y: 138 }],
        arrowAtStart: false,
        arrowAtEnd: false,
        confidence: 0.65,
      },
    ];

    const result = inferEdgesFromConnectors(nodes, connectors, { maxEndpointDistance: 16 });

    expect(result.edges.length).toBe(1);
    expect(result.warnings.some((w) => w.includes('inferida por proximidade'))).toBeTrue();
  });

  it('converte DetectedFlowchart para o modelo atual do editor', () => {
    const detected: DetectedFlowchart = {
      nodes: [
        { ...node('n1', 10, 20, 110, 60), type: 'process', text: 'Processar', confidence: 0.9 },
        { ...node('n2', 200, 20, 90, 90), type: 'decision', text: 'OK?', confidence: 0.8 },
      ],
      edges: [
        {
          id: 'e1',
          sourceNodeId: 'n1',
          targetNodeId: 'n2',
          points: [{ x: 120, y: 50 }, { x: 200, y: 65 }],
          confidence: 0.78,
        },
      ],
      warnings: [],
    };

    const fluxo = detectedFlowchartToFluxograma(detected);

    expect(fluxo.nos.length).toBe(2);
    expect(fluxo.nos[0].tipo).toBe('retangulo');
    expect(fluxo.nos[1].tipo).toBe('losango');
    expect(fluxo.conexoes[0].de).toBe('n1');
    expect(fluxo.conexoes[0].para).toBe('n2');
    expect(fluxo.conexoes[0].setaFim).toBeTrue();
  });
});

function node(id: string, x: number, y: number, width: number, height: number): DetectedNode {
  return {
    id,
    type: 'process',
    text: '',
    x,
    y,
    width,
    height,
    confidence: 0.8,
  };
}
