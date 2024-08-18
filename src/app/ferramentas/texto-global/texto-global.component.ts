import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-texto-global',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './texto-global.component.html',
  styleUrl: './texto-global.component.css'
})
export class TextoGlobalComponent {

  strStatusConexao: string = 'Desconectado'
  strCaminhoIndicadorConexao: string = './assets/light-red-icon.png'
  strTexto: string = ''

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Texto Global");
  }

  emiteTextoParaServidor(){

  }

  conectaComServidorDeTexto(){
    
  }

}
