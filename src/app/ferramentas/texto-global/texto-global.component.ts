import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
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
export class TextoGlobalComponent implements OnDestroy {

  private socket: any;
  private readonly url = 'https://compartilhadortexto-fuf5efeqfjhybte3.brazilsouth-01.azurewebsites.net';
  private debounceTimer: any;

  strStatusConexao: string = 'Desconectado';
  strCaminhoIndicadorConexao: string = './assets/light-red-icon.png';
  strTexto: string = '';
  strCanal: string = '';
  numConectados: number = 0;
  strStatusCanal: string = '';

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.setTituloAplicacao("Compartilhador de Texto");

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { io } = await import('socket.io-client');
    this.socket = io(this.url, {
      rejectUnauthorized: false
    });

    this.strStatusConexao = "Conectando...";

    this.socket.on('connect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-green-icon.png';
      this.strStatusConexao = "Conectado";
      // Se já havia um canal digitado, entrar automaticamente
      if (this.strCanal.trim()) {
        this.socket.emit('joinCanal', this.strCanal.trim());
      }
    });

    this.socket.on('update', (data: string) => {
      this.strTexto = data;
    });

    this.socket.on('canalInfo', (info: { conectados: number }) => {
      this.numConectados = info.conectados;
      this.strStatusCanal = `${info.conectados} tela(s) conectada(s)`;
    });

    this.socket.on('disconnect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png';
      this.strStatusConexao = "Desconectado";
      this.strStatusCanal = '';
      this.numConectados = 0;
    });

    this.socket.on('connect_error', (err: Error) => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png';
      this.strStatusConexao = "Erro na conexão";
      this.strStatusCanal = '';
    });
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onCanalChange(): void {
    clearTimeout(this.debounceTimer);
    this.strStatusCanal = '';
    this.numConectados = 0;
    this.debounceTimer = setTimeout(() => {
      const canal = this.strCanal.trim();
      if (canal && this.socket?.connected) {
        this.socket.emit('joinCanal', canal);
      }
    }, 600);
  }

  emiteTextoParaServidor(): void {
    if (this.strCanal.trim()) {
      this.socket?.emit('updateTextoGlobal', {
        canal: this.strCanal.trim(),
        texto: this.strTexto
      });
    }
  }
}
