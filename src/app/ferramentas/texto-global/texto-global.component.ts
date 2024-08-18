import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
//import { SocketService } from '../../services/socket/socket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-texto-global',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './texto-global.component.html',
  styleUrl: './texto-global.component.css'
})
export class TextoGlobalComponent {

  private socket: Socket;
  private readonly url = 'https://compartilhadortexto-fuf5efeqfjhybte3.brazilsouth-01.azurewebsites.net';
  //private readonly url = 'http://localhost:3000';

  strStatusConexao: string = 'Desconectado'
  strCaminhoIndicadorConexao: string = './assets/light-red-icon.png'
  strTexto: string = ''

  constructor(private dataService: DataService) {
    this.socket = io(this.url, {
      rejectUnauthorized: false
    });
  }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.io');
      this.strCaminhoIndicadorConexao = './assets/light-green-icon.png'
      this.strStatusConexao = "Conectado"
    });
    this.socket.on('update', (data) => {
      this.strTexto = data;
    });

    // Evento acionado quando a conexão for fechada
    this.socket.on('disconnect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png'
      this.strStatusConexao = "Desconectado"
    });

    // Evento acionado quando ocorre um erro
    this.socket.on('connect_error', (err) => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png'
      this.strStatusConexao = "Desconectado"
    });
  }

  emiteTextoParaServidor() {
    this.socket.emit('updateTextoGlobal', this.strTexto);
  }

}
