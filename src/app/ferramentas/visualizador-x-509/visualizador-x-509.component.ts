import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-visualizador-x-509',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule,CommonModule,FormsModule, MatIconModule],
  templateUrl: './visualizador-x-509.component.html',
  styleUrl: './visualizador-x-509.component.css'
})
export class VisualizadorX509Component {

  arquivoCertificado: File = new File([], "", { type: "text/plain" });;
  fileName: string = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Visualizador de X.509");
  }

  carregaArquivo(event: any): void {
    if(event.target != null){
      this.arquivoCertificado = event.target.files[0];
      this.fileName = this.arquivoCertificado.name;
    }
  }

}
