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
  meuTitulo = 'Esse é meu titulo renderizado';
  ingredientList = [
    {name: 'noodles', quantity: 1},
    {name: 'miso broth', quantity: 1},
    {name: 'egg', quantity: 2},
    {name: 'egg', quantity: 4},
  ];

  addItem(){
    this.ingredientList.push({name: 'item', quantity: 1})
  }

  removeItem(){
    this.ingredientList.pop();
  }

}
