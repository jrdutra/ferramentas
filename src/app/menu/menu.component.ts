import { Component, OnInit, Input, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',

})
export class MenuComponent {

  tituloAplicacao: any;
  router: Router;

  constructor(private r: Router, private dataService: DataService, private renderer: Renderer2) { 
    this.router = r;
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      this.tituloAplicacao = this.dataService.getTituloAplicacao();
    });
  }

  navegaMenu(tag: string) {
    if (tag === 'home') {
      this.router.navigate(['/home']);
      this.tituloAplicacao = "Início";
    }
    if (tag === 'leitor-area-cws') {
      this.router.navigate(['/leitor-area-cws']);
      this.tituloAplicacao = "Leitor de área CWS";
    }
    if (tag === 'base64') {
      this.router.navigate(['/base64']);
      this.tituloAplicacao = "Conversor de Base64";
    }
    if (tag === 'editor-json') {
      this.router.navigate(['/editor-json']);
      this.tituloAplicacao = "Editor de Json";
    }
    if (tag === 'visualizador-jwt') {
      this.router.navigate(['/visualizador-jwt']);
      this.tituloAplicacao = "Visualizador de JWT";
    }
    if (tag === 'codec-de-url') {
      this.router.navigate(['/codec-de-url']);
      this.tituloAplicacao = "Codec de URL";
    }
    if (tag === 'conversor-imagem-texto-ocr') {
      this.router.navigate(['/conversor-imagem-texto-ocr']);
      this.tituloAplicacao = "Conversor OCR";
    }
    if (tag === 'unix-timestamp') {
      this.router.navigate(['/unix-timestamp']);
      this.tituloAplicacao = "Unix Timestamp";
    }
  }
}
