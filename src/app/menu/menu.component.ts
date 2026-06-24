import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',

})
export class MenuComponent {

  readonly tituloAplicacao$ = this.dataService.tituloAplicacao$;
  router: Router;

  constructor(private r: Router, private dataService: DataService) {
    this.router = r;
  }

  navegaMenu(tag: string) {
    if (tag === 'home') {
      this.router.navigate(['/home']);
      this.dataService.setTituloAplicacao('Inicio');
    }
    if (tag === 'sobre') {
      this.router.navigate(['/sobre']);
      this.dataService.setTituloAplicacao('Sobre');
    }
    if (tag === 'leitor-area-cws') {
      this.router.navigate(['/leitor-area-cws']);
      this.dataService.setTituloAplicacao('Leitor de área CWS');
    }
    if (tag === 'base64') {
      this.router.navigate(['/base64']);
      this.dataService.setTituloAplicacao('Conversor de Base64');
    }
    if (tag === 'editor-json') {
      this.router.navigate(['/editor-json']);
      this.dataService.setTituloAplicacao('Editor de Json');
    }
    if (tag === 'visualizador-jwt') {
      this.router.navigate(['/visualizador-jwt']);
      this.dataService.setTituloAplicacao('Manipulador de JWT');
    }
    if (tag === 'codec-de-url') {
      this.router.navigate(['/codec-de-url']);
      this.dataService.setTituloAplicacao('Codec de URL');
    }
    if (tag === 'conversor-imagem-texto-ocr') {
      this.router.navigate(['/conversor-imagem-texto-ocr']);
      this.dataService.setTituloAplicacao('Conversor OCR');
    }
    if (tag === 'unix-timestamp') {
      this.router.navigate(['/unix-timestamp']);
      this.dataService.setTituloAplicacao('Unix Timestamp');
    }
    if (tag === 'texto-qrcode') {
      this.router.navigate(['/texto-qrcode']);
      this.dataService.setTituloAplicacao('Texto para QrCode');
    }
    if (tag === 'quebra-linha') {
      this.router.navigate(['/quebra-linha']);
      this.dataService.setTituloAplicacao('Editor de Texto');
    }
    if (tag === 'texto-global') {
      this.router.navigate(['/texto-global']);
      this.dataService.setTituloAplicacao('Texto Global');
    }
    if (tag === 'template-de-texto') {
      this.router.navigate(['/template-de-texto']);
      this.dataService.setTituloAplicacao('Template de Texto');
    }
    if (tag === 'visualizador-x-509') {
      this.router.navigate(['/visualizador-x-509']);
      this.dataService.setTituloAplicacao('Visualizador de Certificado X.509');
    }
    if (tag === 'gerador-certificado-x509') {
      this.router.navigate(['/gerador-certificado-x509']);
      this.dataService.setTituloAplicacao('Gerador de Chaves e Certificados X.509');
    }
  }
}
