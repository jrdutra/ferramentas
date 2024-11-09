import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-visualizador-x-509',
  standalone: true,
  imports: [],
  templateUrl: './visualizador-x-509.component.html',
  styleUrl: './visualizador-x-509.component.css'
})
export class VisualizadorX509Component {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Visualizador de X.509");
  }

}
