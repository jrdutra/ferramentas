import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { QRCodeModule } from 'angularx-qrcode';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-texto-qrcode',
  standalone: true,
  imports: [QRCodeModule,MatSliderModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './texto-qrcode.component.html',
  styleUrl: './texto-qrcode.component.css'
})
export class TextoQrcodeComponent {
  texto: string = 'www.google.com.br';
  tamanho: number = 256;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Texto para QrCode");
  }
}
