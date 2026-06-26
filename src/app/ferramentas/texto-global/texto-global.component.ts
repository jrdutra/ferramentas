import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-texto-global',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule
  ],
  templateUrl: './texto-global.component.html',
  styleUrl: './texto-global.component.css'
})
export class TextoGlobalComponent implements OnInit, OnDestroy {

  private socket: any;
  private readonly url = 'https://compartilhadortexto-fuf5efeqfjhybte3.brazilsouth-01.azurewebsites.net';
  private debounceTimer: any;

  strStatusConexao: string = 'Desconectado';
  strCaminhoIndicadorConexao: string = './assets/light-red-icon.png';
  strTexto: string = '';
  strGrupo: string = '';
  strCanal: string = '';
  numConectados: number = 0;
  strStatusCanal: string = '';

  // Diretório de grupos/canais ativos
  diretorio: { [grupo: string]: string[] } = {};
  gruposAtivos: string[] = [];
  grupoSelecionado: string = '';
  canaisDoGrupo: string[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.setTituloAplicacao("Compartilhador de Texto");

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Ler path params
    const grupoParam = this.route.snapshot.paramMap.get('grupo');
    const canalParam = this.route.snapshot.paramMap.get('canal');
    if (grupoParam) this.strGrupo = decodeURIComponent(grupoParam);
    if (canalParam) this.strCanal = decodeURIComponent(canalParam);

    const { io } = await import('socket.io-client');
    this.socket = io(this.url, {
      rejectUnauthorized: false
    });

    this.strStatusConexao = "Conectando...";

    this.socket.on('connect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-green-icon.png';
      this.strStatusConexao = "Conectado";
      if (this.strGrupo.trim() && this.strCanal.trim()) {
        this.socket.emit('joinCanal', {
          grupo: this.strGrupo.trim(),
          canal: this.strCanal.trim()
        });
      }
    });

    this.socket.on('update', (data: string) => {
      this.strTexto = data;
    });

    this.socket.on('canalInfo', (info: { conectados: number }) => {
      this.numConectados = info.conectados;
      this.strStatusCanal = `${info.conectados} tela(s) conectada(s)`;
    });

    this.socket.on('diretorioAtualizado', (dir: { [grupo: string]: string[] }) => {
      this.diretorio = dir;
      this.gruposAtivos = Object.keys(dir).sort();
      // Atualiza canais do grupo selecionado no painel direito
      if (this.grupoSelecionado) {
        this.canaisDoGrupo = dir[this.grupoSelecionado] ?? [];
        if (!this.gruposAtivos.includes(this.grupoSelecionado)) {
          this.grupoSelecionado = '';
          this.canaisDoGrupo = [];
        }
      }
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

  onGrupoOuCanalChange(): void {
    clearTimeout(this.debounceTimer);
    this.strStatusCanal = '';
    this.numConectados = 0;
    this.debounceTimer = setTimeout(() => {
      const grupo = this.strGrupo.trim();
      const canal = this.strCanal.trim();
      if (grupo && canal && this.socket?.connected) {
        this.socket.emit('joinCanal', { grupo, canal });
        this.router.navigate(['/texto-global', encodeURIComponent(grupo), encodeURIComponent(canal)], { replaceUrl: true });
      }
    }, 600);
  }

  emiteTextoParaServidor(): void {
    const grupo = this.strGrupo.trim();
    const canal = this.strCanal.trim();
    if (grupo && canal) {
      this.socket?.emit('updateTextoGlobal', { grupo, canal, texto: this.strTexto });
    }
  }

  onGrupoSelecionadoChange(): void {
    this.canaisDoGrupo = this.diretorio[this.grupoSelecionado] ?? [];
  }

  navegarParaCanal(canal: string): void {
    this.strGrupo = this.grupoSelecionado;
    this.strCanal = canal;
    this.strStatusCanal = '';
    this.numConectados = 0;
    this.strTexto = '';
    if (this.socket?.connected) {
      this.socket.emit('joinCanal', { grupo: this.strGrupo, canal: this.strCanal });
      this.router.navigate(
        ['/texto-global', encodeURIComponent(this.strGrupo), encodeURIComponent(this.strCanal)],
        { replaceUrl: true }
      );
    }
  }

  get urlCompartilhavel(): string {
    const grupo = this.strGrupo.trim();
    const canal = this.strCanal.trim();
    if (!grupo || !canal) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    return `${base}/texto-global/${encodeURIComponent(grupo)}/${encodeURIComponent(canal)}`;
  }

  copiarUrl(): void {
    if (this.urlCompartilhavel && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.urlCompartilhavel);
    }
  }
}
