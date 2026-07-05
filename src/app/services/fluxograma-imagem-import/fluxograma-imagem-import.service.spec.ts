import { FluxogramaImagemImportService } from './fluxograma-imagem-import.service';

describe('FluxogramaImagemImportService', () => {
  let service: FluxogramaImagemImportService;

  beforeEach(() => {
    service = new FluxogramaImagemImportService('browser' as unknown as object);
  });

  it('detecta formas e conectores coloridos sem confundir texto claro', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 520;
    canvas.height = 260;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = '#061426';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ff2db2';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 120, 70);
    ctx.beginPath();
    ctx.moveTo(350, 45);
    ctx.lineTo(450, 80);
    ctx.lineTo(350, 115);
    ctx.lineTo(250, 80);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = '#00e676';
    ctx.beginPath();
    ctx.moveTo(162, 75);
    ctx.lineTo(248, 75);
    ctx.stroke();

    ctx.fillStyle = '#f4fbff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Processo', 62, 82);
    ctx.fillText('OK?', 334, 86);

    const pre = (service as any).preprocessar(ctx.getImageData(0, 0, canvas.width, canvas.height));
    const nodes = (service as any).detectarNosPorCores(pre);
    const connectors = (service as any).detectarConectores(pre, nodes);

    expect(nodes.length).toBe(2);
    expect(nodes.map((n: any) => n.type)).toContain('process');
    expect(nodes.map((n: any) => n.type)).toContain('decision');
    expect(connectors.length).toBeGreaterThan(0);
  });
});
