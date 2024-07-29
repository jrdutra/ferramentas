import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-quebra-linha',
  standalone: true,
  imports: [],
  templateUrl: './quebra-linha.component.html',
  styleUrl: './quebra-linha.component.css'
})
export class QuebraLinhaComponent {

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Quebra Linha");
  }

}
