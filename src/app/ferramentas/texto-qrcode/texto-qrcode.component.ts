import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-texto-qrcode',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './texto-qrcode.component.html',
  styleUrl: './texto-qrcode.component.css'
})
export class TextoQrcodeComponent {
  text: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Texto para QrCode");
    this.text = 'Texto é uma produção, verbal ou não verbal, que se constitui com algum código, no intuito de comunicar algo a alguém, em determinado tempo e espaço. Sua definição ampla se deve ao fato de também abranger diversos formatos.Pode-se compreender o texto verbal, oral e escrito, como uma prática social que utiliza estruturas verbais, organizadas e caracterizadas por suas estruturas linguísticas e sua função social, com vistas a cumprir um papel pessoal ou coletivo na vida humana. O mesmo se aplica aos textos não verbais, também compreendidos como uma ação social, diferenciando-se somente em função das estruturas e códigos utilizados.';
  }
}
