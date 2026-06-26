import { isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-texto-global',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './texto-global.component.html',
  styleUrl: './texto-global.component.css'
})
export class TextoGlobalComponent implements OnInit, OnDestroy {

  private socket: any;
  private readonly url = 'https://compartilhadortexto-fuf5efeqfjhybte3.brazilsouth-01.azurewebsites.net';
  private debounceTimer: any;
  private textoHotTimer: any;

  strStatusConexao: string = 'Desconectado';
  strCaminhoIndicadorConexao: string = './assets/light-red-icon.png';
  strTexto: string = '';
  strGrupo: string = '';
  strCanal: string = '';
  numConectados: number = 0;
  strStatusCanal: string = '';

  // Diretório
  diretorio: { [grupo: string]: string[] } = {};
  gruposAtivos: string[] = [];
  grupoSelecionado: string = '';
  canaisDoGrupo: string[] = [];
  filtroBuscaCanal: string = '';

  // Histórico de alterações
  historico: string[] = [];

  // Glow verde no textarea (10 s após última alteração)
  textoHot: boolean = false;

  // Canais com atualização não vista — persiste até clicar: "grupo::canal" -> true
  canaisHot: { [key: string]: boolean } = {};

  // Canais excluídos mas ainda visíveis em vermelho — persiste até clicar
  canaisExcluidos: { [key: string]: boolean } = {};

  // Admin
  isAdmin: boolean = false;

  // Popup grupo excluído
  mostrarPopupGrupoExcluido: boolean = false;
  grupoExcluidoNome: string = '';

  // Modal novo canal
  mostrarModalNovoCanal: boolean = false;
  nomeNovoCanal: string = '';

  // Ban
  estaBanido: boolean = false;
  motivoBan: string = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.setTituloAplicacao("Compartilhador de Texto");
    if (!isPlatformBrowser(this.platformId)) return;

    const grupoParam = this.route.snapshot.paramMap.get('grupo');
    const canalParam = this.route.snapshot.paramMap.get('canal');
    if (grupoParam) { this.strGrupo = decodeURIComponent(grupoParam); this.grupoSelecionado = this.strGrupo; }
    if (canalParam) { this.strCanal = decodeURIComponent(canalParam); }
    if (this.grupoSelecionado && this.strCanal) this.canaisDoGrupo = [this.strCanal];

    const { io } = await import('socket.io-client');
    this.socket = io(this.url, { rejectUnauthorized: false });
    this.strStatusConexao = 'Conectando...';

    this.socket.on('connect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-green-icon.png';
      this.strStatusConexao = 'Conectado';
      if (this.strGrupo.trim() && this.strCanal.trim()) {
        this.socket.emit('joinCanal', { grupo: this.strGrupo.trim(), canal: this.strCanal.trim() });
      }
    });

    this.socket.on('update', (data: string) => {
      this.strTexto = data;
      this.ativarTextoHot();
    });

    this.socket.on('canalInfo', (info: { conectados: number }) => {
      this.numConectados = info.conectados;
      this.strStatusCanal = `${info.conectados} tela(s) conectada(s)`;
    });

    this.socket.on('historicoAtualizado', (hist: string[]) => { this.historico = hist; });

    this.socket.on('canalAtualizado', ({ grupo, canal }: { grupo: string; canal: string }) => {
      const ehAtual = grupo === this.strGrupo.trim() && canal === this.strCanal.trim();
      if (!ehAtual) this.canaisHot = { ...this.canaisHot, [`${grupo}::${canal}`]: true };
    });

    this.socket.on('adminStatus', ({ isAdmin, grupo }: { isAdmin: boolean; grupo: string }) => {
      if (grupo === this.strGrupo.trim()) this.isAdmin = isAdmin;
    });

    // Canal excluído pelo admin
    this.socket.on('canalExcluido', ({ grupo, canal, canaisRestantes }: { grupo: string; canal: string; canaisRestantes: string[] }) => {
      const key = `${grupo}::${canal}`;

      // Navegar se estiver neste canal
      if (this.strGrupo.trim() === grupo && this.strCanal.trim() === canal) {
        const idx = this.canaisDoGrupo.indexOf(canal);
        const proximo = canaisRestantes[idx] ?? canaisRestantes[Math.max(0, idx - 1)] ?? null;
        if (proximo) {
          this.strCanal = proximo;
          this.strTexto = '';
          this.historico = [];
          this.textoHot = false;
          this.socket.emit('joinCanal', { grupo, canal: proximo });
          this.atualizarUrl(grupo, proximo);
        } else {
          // Sem mais canais no grupo
          this.strCanal = '';
          this.strTexto = '';
          this.historico = [];
          this.textoHot = false;
          this.strStatusCanal = '';
        }
      }

      // Marcar como excluído (fica vermelho até o usuário clicar)
      this.canaisExcluidos = { ...this.canaisExcluidos, [key]: true };
      // Remover de hot se estava marcado
      if (this.canaisHot[key]) {
        const next = { ...this.canaisHot };
        delete next[key];
        this.canaisHot = next;
      }
    });

    // Grupo excluído pelo admin
    this.socket.on('grupoExcluido', ({ grupo }: { grupo: string }) => {
      // Popup apenas para quem não é admin (admin sabe que excluiu)
      if (this.strGrupo.trim() === grupo) {
        if (!this.isAdmin) {
          this.grupoExcluidoNome = grupo;
          this.mostrarPopupGrupoExcluido = true;
        }
        this.strGrupo = '';
        this.strCanal = '';
        this.strTexto = '';
        this.historico = [];
        this.isAdmin = false;
        this.textoHot = false;
        this.strStatusCanal = '';
        this.location.replaceState('/texto-global');
      }
      // Limpar entradas de canaisExcluidos do grupo
      const prefix = `${grupo}::`;
      this.canaisExcluidos = Object.fromEntries(
        Object.entries(this.canaisExcluidos).filter(([k]) => !k.startsWith(prefix))
      );
    });

    this.socket.on('diretorioAtualizado', (dir: { [grupo: string]: string[] }) => {
      this.diretorio = dir;
      this.gruposAtivos = Object.keys(dir).sort();

      // Determina qual grupo deve ficar selecionado
      const alvo = this.grupoSelecionado || this.strGrupo.trim();

      if (alvo && this.gruposAtivos.includes(alvo)) {
        // Reseta para '' e reatribui no próximo tick: força o mat-select a
        // reconhecer o valor depois que as <mat-option> já estão no DOM.
        this.grupoSelecionado = '';
        setTimeout(() => {
          this.grupoSelecionado = alvo;
          this.canaisDoGrupo = dir[alvo] ?? [];
        }, 0);
      } else if (this.grupoSelecionado && !this.gruposAtivos.includes(this.grupoSelecionado)) {
        this.canaisDoGrupo = [];
      }
    });

    this.socket.on('disconnect', () => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png';
      this.strStatusConexao = 'Desconectado';
      this.strStatusCanal = '';
      this.numConectados = 0;
    });

    this.socket.on('connect_error', () => {
      this.strCaminhoIndicadorConexao = './assets/light-red-icon.png';
      this.strStatusConexao = 'Erro na conexão';
      this.strStatusCanal = '';
    });

    this.socket.on('banido', ({ motivo }: { motivo: string }) => {
      this.estaBanido = true;
      this.motivoBan = motivo;
    });
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (this.textoHotTimer) clearTimeout(this.textoHotTimer);
    if (this.socket) this.socket.disconnect();
  }

  // ── Glow verde ────────────────────────────────────────────────────────────

  private ativarTextoHot(): void {
    this.textoHot = true;
    if (this.textoHotTimer) clearTimeout(this.textoHotTimer);
    this.textoHotTimer = setTimeout(() => { this.textoHot = false; }, 10000);
  }

  // ── Lógica de canal ───────────────────────────────────────────────────────

  onGrupoOuCanalChange(): void {
    clearTimeout(this.debounceTimer);
    this.strStatusCanal = '';
    this.numConectados = 0;

    // Sincroniza o painel direito imediatamente ao digitar
    const grupoDigitado = this.strGrupo.trim();
    if (grupoDigitado !== this.grupoSelecionado) {
      this.grupoSelecionado = grupoDigitado;
      this.canaisDoGrupo = this.diretorio[grupoDigitado] ?? [];
      this.filtroBuscaCanal = '';
    }
    // canal-ativo já é reativo via [(ngModel)]="strCanal" — sem ação extra

    this.debounceTimer = setTimeout(() => {
      const grupo = this.strGrupo.trim(), canal = this.strCanal.trim();
      if (grupo && canal && this.socket?.connected) {
        this.historico = [];
        this.textoHot = false;
        this.isAdmin = false;
        this.socket.emit('joinCanal', { grupo, canal });
        this.atualizarUrl(grupo, canal);
      }
    }, 600);
  }

  emiteTextoParaServidor(): void {
    const grupo = this.strGrupo.trim(), canal = this.strCanal.trim();
    if (grupo && canal) {
      this.socket?.emit('updateTextoGlobal', { grupo, canal, texto: this.strTexto });
      this.ativarTextoHot();
    }
  }

  onGrupoSelecionadoChange(): void {
    this.canaisDoGrupo = this.diretorio[this.grupoSelecionado] ?? [];
    this.filtroBuscaCanal = '';
  }

  get canaisFiltrados(): string[] {
    const f = this.filtroBuscaCanal.trim().toLowerCase();
    return f ? this.canaisDoGrupo.filter(c => c.toLowerCase().includes(f)) : this.canaisDoGrupo;
  }

  // Canais excluídos (não clicados) para o grupo selecionado no painel direito
  get canaisExcluidosDoGrupo(): string[] {
    const prefix = `${this.grupoSelecionado}::`;
    return Object.keys(this.canaisExcluidos)
      .filter(k => k.startsWith(prefix) && this.canaisExcluidos[k])
      .map(k => k.slice(prefix.length));
  }

  navegarParaCanal(canal: string): void {
    const key = `${this.grupoSelecionado}::${canal}`;
    if (this.canaisHot[key]) {
      const next = { ...this.canaisHot }; delete next[key]; this.canaisHot = next;
    }
    this.strGrupo = this.grupoSelecionado;
    this.strCanal = canal;
    this.strStatusCanal = '';
    this.numConectados = 0;
    this.historico = [];
    this.textoHot = false;
    this.isAdmin = false;
    if (this.socket?.connected) {
      this.socket.emit('joinCanal', { grupo: this.strGrupo, canal });
      this.atualizarUrl(this.strGrupo, canal);
    }
  }

  removerCanalExcluido(canal: string): void {
    const key = `${this.grupoSelecionado}::${canal}`;
    const next = { ...this.canaisExcluidos }; delete next[key]; this.canaisExcluidos = next;
  }

  isCanalHot(canal: string): boolean {
    return !!this.canaisHot[`${this.grupoSelecionado}::${canal}`];
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  // Controles de admin só aparecem quando o usuário está vendo o próprio grupo
  get podeAdministrar(): boolean {
    return this.isAdmin && this.grupoSelecionado === this.strGrupo.trim();
  }

  excluirCanal(canal: string, evento: Event): void {
    evento.stopPropagation();
    if (!this.podeAdministrar) return;
    this.socket?.emit('excluirCanal', { grupo: this.strGrupo.trim(), canal });
  }

  excluirGrupo(): void {
    if (!this.podeAdministrar) return;
    this.socket?.emit('excluirGrupo', { grupo: this.strGrupo.trim() });
  }

  fecharPopupGrupoExcluido(): void {
    this.mostrarPopupGrupoExcluido = false;
  }

  // ── Modal novo canal ──────────────────────────────────────────────────────

  abrirModalNovoCanal(): void {
    this.nomeNovoCanal = '';
    this.mostrarModalNovoCanal = true;
  }

  fecharModalNovoCanal(): void {
    this.mostrarModalNovoCanal = false;
    this.nomeNovoCanal = '';
  }

  confirmarNovoCanal(): void {
    const nome = this.nomeNovoCanal.trim();
    if (!nome || !this.grupoSelecionado) return;
    this.fecharModalNovoCanal();
    // Reutiliza a mesma lógica de navegarParaCanal — une grupo selecionado + canal novo
    this.strGrupo = this.grupoSelecionado;
    this.strCanal = nome;
    this.strStatusCanal = '';
    this.numConectados = 0;
    this.historico = [];
    this.textoHot = false;
    this.isAdmin = false;
    if (this.socket?.connected) {
      this.socket.emit('joinCanal', { grupo: this.strGrupo, canal: nome });
      this.atualizarUrl(this.strGrupo, nome);
    }
  }

  // ── URL compartilhável ────────────────────────────────────────────────────

  private atualizarUrl(grupo: string, canal: string): void {
    this.location.replaceState(
      `/texto-global/${encodeURIComponent(grupo)}/${encodeURIComponent(canal)}`
    );
  }

  get urlCompartilhavel(): string {
    const grupo = this.strGrupo.trim(), canal = this.strCanal.trim();
    if (!grupo || !canal) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    return `${base}/texto-global/${encodeURIComponent(grupo)}/${encodeURIComponent(canal)}`;
  }

  copiarUrl(): void {
    if (this.urlCompartilhavel && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.urlCompartilhavel);
    }
  }

  // ── Formatação ────────────────────────────────────────────────────────────

  formatarDataHora(iso: string): string {
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch { return iso; }
  }
}
