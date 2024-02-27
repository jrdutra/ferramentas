import { Component, OnInit, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',

})
export class MenuComponent {

  tituloAplicacao: string = "...";

  ngOnInit(): void {
    let currentRoutePath = this.router.url; // Isso divide a URL no ponto de interrogação (excluindo os parâmetros de consulta)
  }

  constructor(private router: Router) { }

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
      this.tituloAplicacao = "Base64 Codec";
    }
  }
}
