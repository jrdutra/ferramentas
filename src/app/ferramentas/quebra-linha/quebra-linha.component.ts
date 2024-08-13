import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quebra-linha',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './quebra-linha.component.html',
  styleUrl: './quebra-linha.component.css'
})
export class QuebraLinhaComponent {

  strTexto: string = '';

  constructor(private dataService: DataService) { }

  onButtonClick(event: MouseEvent) {
    console.log('Button clicked');
  }

  onInputClick(event: MouseEvent) {
    // Impede que o clique do input seja propagado para o botão
    event.stopPropagation();
    console.log('Input clicked');
  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Quebra Linha");
  }

}
