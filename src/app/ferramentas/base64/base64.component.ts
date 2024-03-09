import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';
import { Base64Service } from '../../services/base64/base64.service'

@Component({
  selector: 'app-base64',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './base64.component.html',
  styleUrl: './base64.component.css'
})
export class Base64Component {

  strTexto: string = '';
  strBase64: string = '';

  constructor(private dataService: DataService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Conversor de Base64");
  }

  codificaTexto(){
    this.strBase64 = this.base64Service.codificaTexto(this.strTexto);
  }

  decodificaTexto(){
    this.strTexto = this.base64Service.decodificaTexto(this.strBase64);
  }

}
