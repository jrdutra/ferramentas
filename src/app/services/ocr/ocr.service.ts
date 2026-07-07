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
      throw new Error('OCR can only run in the browser.');
    }

    const { createWorker } = await import('tesseract.js');

    const worker = await createWorker(['por', 'eng'], 1, {
      // Usa os arquivos do worker/core hospedados localmente (assets/tesseract)
      // em vez do CDN padrão do tesseract.js, que pode falhar por bloqueadores
      // de anúncio, firewalls corporativos ou instabilidade de rede.
      workerPath: '/assets/tesseract/worker.min.js',
      corePath: '/assets/tesseract',
      workerBlobURL: false,
      logger: (m: any) => {
        if (m.status === 'recognizing text' && onProgresso) {
          onProgresso(Math.round(m.progress * 100));
        }
      },
      // Sem um errorHandler, o tesseract.js relança (throw) qualquer erro
      // interno (ex.: falha ao carregar core/idioma) dentro do handler de
      // mensagens do worker, fora do try/catch deste serviço — era isso que
      // aparecia como "TypeError: a is not a function" no console. A promise
      // do job (recognize/load) já é rejeitada internamente antes desse
      // throw, então basta registrar o erro aqui; o catch de executarOcr()
      // continua tratando a falha normalmente.
      errorHandler: (err: any) => {
        console.error('Erro interno do worker OCR:', err);
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
