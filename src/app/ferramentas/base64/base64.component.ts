import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Conversor de Base64");
  }

  codificaTexto(){
    let utf8Bytes  = new TextEncoder().encode(this.strTexto);
    // Converte os bytes UTF-8 para uma string de caracteres Latin1
    let binaryString = '';
    utf8Bytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });
    this.strBase64 = btoa(binaryString);
  }

  decodificaTexto(){
    // Decodifica a string Base64 para uma string de caracteres Latin1
    const binaryString = atob(this.strBase64);

    // Converte a string Latin1 para um array de bytes UTF-8
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Converte os bytes UTF-8 para uma string UTF-8
    this.strTexto = new TextDecoder().decode(bytes);
  }

}
