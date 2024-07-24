import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Word {
  boundingBox: string;
  text: string;
}

interface Line {
  boundingBox: string;
  words: Word[];
}

interface Region {
  boundingBox: string;
  lines: Line[];
}

interface OcrResponse {
  language: string;
  textAngle: number;
  orientation: string;
  regions: Region[];
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private apiUrl = 'https://ferramentaocr.cognitiveservices.azure.com/vision/v3.0/ocr';
  private subscriptionKey = '5ec41d2976304b119e87567683550f38';

  constructor(private http: HttpClient) { }

  executarOcr(selectedFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const headers = new HttpHeaders().append('Ocp-Apim-Subscription-Key', this.subscriptionKey);
      this.http.post<OcrResponse>(this.apiUrl + '?language=pt&detectOrientation=true', formData, { headers })
        .subscribe(
          response => {
            let stringOcr: string = this.renderizaTexto(response);
            resolve(stringOcr);
          },
          error => {
            reject("Erro ao executar OCR");
          }
        );
    });
  }

  renderizaTexto(response: OcrResponse): string {

    let textoRenderizado: string = "";

    response.regions.forEach((regiao: any) => {
      regiao.lines.forEach((linha: any) => {
        linha.words.forEach((palavra: any) => {
          textoRenderizado += " " + palavra.text;
        });
        textoRenderizado += "\n";
      });
    });

    return textoRenderizado;
  }

}
