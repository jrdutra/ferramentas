import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-unix-timestamp',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './unix-timestamp.component.html',
  styleUrl: './unix-timestamp.component.css'
})
export class UnixTimestampComponent {

  dia: number = 0;
  mes: number = 0;
  ano: number = 0;
  hora: number = 0;
  minuto: number = 0;
  segundo: number = 0;
  unixTimestamp: number = 0;

  data: Date = new Date();

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Unix Timestamp");
    this.exibeDataHora();
  }

  atualizaDataHora(): void {
    this.data = new Date(this.ano, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo);
    this.exibeDataHora();
  }

  atualizaTimestamp(): void {
    this.data = new Date(this.unixTimestamp * 1000);;
    this.exibeDataHora();
  }

  atualizaDataHoraAgora(): void{
    this.data = new Date();
    this.exibeDataHora();
  }

  exibeDataHora(): void {
    this.dia = this.data.getDate();
    this.mes = this.data.getMonth() + 1; // Os meses começam de 0, então adicionamos 1
    this.ano = this.data.getFullYear();
    this.hora = this.data.getHours();
    this.minuto = this.data.getMinutes();
    this.segundo = this.data.getSeconds();
    this.unixTimestamp = Math.floor(this.data.getTime() / 1000); // Convertendo para timestamp UNIX em segundos
  }

}
