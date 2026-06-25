import type * as PdfJs from 'pdfjs-dist';

export type PdfJsLib = typeof PdfJs;

declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

const PDFJS_SCRIPT_SRC = '/assets/pdf.min.js';
const PDFJS_WORKER_SRC = '/assets/pdf.worker.min.js';
const PDFJS_SCRIPT_SELECTOR = 'script[data-pdfjs-lib="true"]';

let pdfjsLibPromise: Promise<PdfJsLib> | undefined;

export function carregarPdfJsBrowser(): Promise<PdfJsLib> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('PDF.js so pode ser carregado no navegador.'));
  }

  if (window.pdfjsLib) {
    return Promise.resolve(configurarPdfJs(window.pdfjsLib));
  }

  if (!pdfjsLibPromise) {
    pdfjsLibPromise = new Promise((resolve, reject) => {
      const resolver = () => {
        if (window.pdfjsLib) {
          resolve(configurarPdfJs(window.pdfjsLib));
          return;
        }

        pdfjsLibPromise = undefined;
        reject(new Error('PDF.js nao foi inicializado.'));
      };

      const falhar = () => {
        pdfjsLibPromise = undefined;
        reject(new Error('Erro ao carregar PDF.js.'));
      };

      let script = document.querySelector<HTMLScriptElement>(PDFJS_SCRIPT_SELECTOR);
      if (!script) {
        script = document.createElement('script');
        script.src = PDFJS_SCRIPT_SRC;
        script.async = true;
        script.setAttribute('data-pdfjs-lib', 'true');
        script.addEventListener('load', resolver, { once: true });
        script.addEventListener('error', falhar, { once: true });
        document.head.appendChild(script);
        return;
      }

      script.addEventListener('load', resolver, { once: true });
      script.addEventListener('error', falhar, { once: true });
    });
  }

  return pdfjsLibPromise;
}

function configurarPdfJs(pdfjsLib: PdfJsLib): PdfJsLib {
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
  return pdfjsLib;
}
