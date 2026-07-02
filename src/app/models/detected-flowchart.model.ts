export type DetectedNodeType = 'process' | 'decision' | 'terminator' | 'inputOutput' | 'circle' | 'unknown';

export interface DetectedPoint {
  x: number;
  y: number;
}

export interface DetectedFlowchart {
  nodes: DetectedNode[];
  edges: DetectedEdge[];
  warnings: string[];
}

export interface DetectedNode {
  id: string;
  type: DetectedNodeType;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export interface DetectedEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  points: DetectedPoint[];
  confidence: number;
}

export interface DetectedTextRegion {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export interface DetectedConnectorCandidate {
  id: string;
  points: DetectedPoint[];
  start: DetectedPoint;
  end: DetectedPoint;
  arrowAtStart: boolean;
  arrowAtEnd: boolean;
  confidence: number;
}

export interface ShapeMetrics {
  width: number;
  height: number;
  fillRatio: number;
  topWidthRatio: number;
  middleWidthRatio: number;
  bottomWidthRatio: number;
  centerSkewRatio: number;
  vertices?: number;
  circularity?: number;
}

export interface ShapeClassification {
  type: DetectedNodeType;
  confidence: number;
}

export interface FlowchartImageImportProgress {
  stage: 'loading' | 'preprocessing' | 'shapes' | 'connectors' | 'ocr' | 'normalizing';
  progress: number;
  message: string;
}
