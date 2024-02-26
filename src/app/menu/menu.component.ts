import { Component, OnInit } from '@angular/core';
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
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  tituloAplicacao: string = '';

  ngOnInit(): void {
    this.tituloAplicacao = "Início";
  }

  constructor(private router: Router) { }

  navigateMenu(tag: string) {
    if (tag === 'ferramenta1') {
      this.router.navigate(['/ferramenta1']);
      this.tituloAplicacao = "Ferramenta 1";
    }
    if (tag === 'ferramenta2') {
      this.router.navigate(['/ferramenta2']);
      this.tituloAplicacao = "Ferramenta 2";
    }
    if (tag === 'home') {
      this.router.navigate(['/home']);
      this.tituloAplicacao = "Início";
    }
  }
}
