import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuTopoComponent } from './menu-topo/menu-topo.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuTopoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ferramentas';
}
