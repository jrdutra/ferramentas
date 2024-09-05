import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-template-de-texto',
  standalone: true,
  imports: [],
  templateUrl: './template-de-texto.component.html',
  styleUrl: './template-de-texto.component.css'
})
export class TemplateDeTextoComponent {

  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Template de Texto");
  }

}
