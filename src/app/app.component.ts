import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule  } from '@angular/router';

import {MenuComponent} from './menu/menu.component'
import {MatCardModule} from '@angular/material/card';

import { Ferramenta1Component } from './ferramentas/ferramenta1/ferramenta1.component'
import { Ferramenta2Component } from './ferramentas/ferramenta2/ferramenta2.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule , MenuComponent, MatCardModule, Ferramenta1Component, Ferramenta2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ferramentas';
}
