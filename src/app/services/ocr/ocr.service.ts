import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async executarOcr(
    file: File,
    onProgresso?: (porcentagem: number) => void
  ): Promise<string> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('OCR só pode ser executado no navegador.');
    }

    const { createWorker } = await import('tesseract.js');

    const worker = await createWorker(['por', 'eng'], 1, {
      logger: (m: any) => {
        if (m.status === 'recognizing text' && onProgresso) {
          onProgresso(Math.round(m.progress * 100));
        }
      }
    } as any);

    try {
      const resultado = await worker.recognize(file);
      return resultado.data.text.trim();
    } finally {
      await worker.terminate();
    }
  }
}
