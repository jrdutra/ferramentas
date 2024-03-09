import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { JsonService } from '../../services/json/json.service'
import { Base64Service } from '../../services/base64/base64.service'

@Component({
  selector: 'app-visualizador-jwt',
  standalone: true,
  imports: [],
  templateUrl: './visualizador-jwt.component.html',
  styleUrl: './visualizador-jwt.component.css'
})
export class VisualizadorJwtComponent {

  constructor(private dataService: DataService, private jsonService: JsonService, private base64Service: Base64Service){}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Visualizador de Jwt");
  }

}
