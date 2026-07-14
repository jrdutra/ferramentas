import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../data.service';
import {
  CertificadoInfo,
  CertificateValidatorService,
  ChaveInfo,
  PortadorChave,
  ResultadoPar
} from '../../services/certificate/certificate-validator.service';

interface LinhaMatriz {
  portador: PortadorChave;
  celulas: { resultado: ResultadoPar; diagonal: boolean }[];
}

@Component({
  selector: 'app-validador-certificado',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './validador-certificado.component.html',
  styleUrl: './validador-certificado.component.css'
})
export class ValidadorCertificadoComponent {
  certificados: CertificadoInfo[] = [];
  chaves: ChaveInfo[] = [];
  avisos: string[] = [];
  erros: string[] = [];

  portadores: PortadorChave[] = [];
  matriz: LinhaMatriz[] = [];

  senha = '';
  arrastando = false;

  // Modal de senha para PFX / P12
  modalSenhaAberto = false;
  filaP12: File[] = [];
  senhaModal = '';

  hoverRow: number | null = null;
  hoverCol: number | null = null;
  hoverResultado: ResultadoPar | null = null;

  constructor(
    private dataService: DataService,
    private validator: CertificateValidatorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Certificate & Key Validator');
  }

  aoSelecionarArquivos(event: any): void {
    const arquivos: FileList = event?.target?.files;
    if (arquivos && arquivos.length) {
      this.processaArquivos(Array.from(arquivos));
    }
    if (event?.target) event.target.value = '';
  }

  aoSoltar(event: DragEvent): void {
    event.preventDefault();
    this.arrastando = false;
    const arquivos = event.dataTransfer?.files;
    if (arquivos && arquivos.length) {
      this.processaArquivos(Array.from(arquivos));
    }
  }

  aoArrastarSobre(event: DragEvent): void {
    event.preventDefault();
    this.arrastando = true;
  }

  aoSairArrasto(event: DragEvent): void {
    event.preventDefault();
    this.arrastando = false;
  }

  private ehP12(nome: string): boolean {
    return /\.(pfx|p12)$/i.test(nome);
  }

  private processaArquivos(arquivos: File[]): void {
    const p12s = arquivos.filter(a => this.ehP12(a.name));
    const outros = arquivos.filter(a => !this.ehP12(a.name));

    if (outros.length) {
      this.lerArquivos(outros, this.senha || '');
    }
    if (p12s.length) {
      this.filaP12 = this.filaP12.concat(p12s);
      this.senhaModal = '';
      this.modalSenhaAberto = true;
    }
  }

  private lerArquivos(arquivos: File[], senha: string): void {
    let pendentes = arquivos.length;
    arquivos.forEach(arquivo => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = this.validator.carregarArquivo(arquivo.name, reader.result as ArrayBuffer, senha);
        this.certificados.push(...res.certificados);
        this.chaves.push(...res.chaves);
        this.avisos.push(...res.avisos);
        this.erros.push(...res.erros);
        if (--pendentes === 0) this.finalizaCarga();
      };
      reader.onerror = () => {
        this.erros.push(`"${arquivo.name}": failed to read the file.`);
        if (--pendentes === 0) this.finalizaCarga();
      };
      reader.readAsArrayBuffer(arquivo);
    });
  }

  // ---- Modal de senha PFX/P12 ----

  get nomesP12(): string {
    return this.filaP12.map(f => f.name).join(', ');
  }

  confirmarSenhaP12(): void {
    const fila = this.filaP12;
    this.filaP12 = [];
    this.modalSenhaAberto = false;
    const senha = this.senhaModal;
    this.senhaModal = '';
    if (fila.length) this.lerArquivos(fila, senha);
  }

  cancelarSenhaP12(): void {
    this.filaP12 = [];
    this.senhaModal = '';
    this.modalSenhaAberto = false;
  }

  fecharModalPeloFundo(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.cancelarSenhaP12();
  }

  // ---- Estado ----

  private finalizaCarga(): void {
    this.recalculaMatriz();
    this.cdr.detectChanges();
  }

  private recalculaMatriz(): void {
    this.portadores = this.validator.montaPortadores(this.certificados, this.chaves);
    this.matriz = this.portadores.map(linha => ({
      portador: linha,
      celulas: this.portadores.map(coluna => ({
        diagonal: linha.id === coluna.id,
        resultado: linha.id === coluna.id ? 'na' : this.validator.comparaPortadores(linha, coluna)
      }))
    }));
  }

  limpar(): void {
    this.certificados = [];
    this.chaves = [];
    this.avisos = [];
    this.erros = [];
    this.portadores = [];
    this.matriz = [];
    this.filaP12 = [];
    this.modalSenhaAberto = false;
  }

  get temResultado(): boolean {
    return this.certificados.length > 0 || this.chaves.length > 0 ||
      this.erros.length > 0 || this.avisos.length > 0;
  }

  get temMatriz(): boolean {
    return this.portadores.length >= 2;
  }

  // ---- helpers de exibição ----

  rotuloStatus(cert: CertificadoInfo): string {
    if (cert.status === 'expired') return 'Expired';
    if (cert.status === 'not-yet-valid') return 'Not yet valid';
    if (cert.diasRestantes <= 30) return `Expiring soon (${cert.diasRestantes}d)`;
    return `Valid (${cert.diasRestantes}d left)`;
  }

  classeStatus(cert: CertificadoInfo): string {
    if (cert.status !== 'valid') return 'ruim';
    if (cert.diasRestantes <= 30) return 'atencao';
    return 'bom';
  }

  iconeStatus(cert: CertificadoInfo): string {
    if (cert.status !== 'valid') return 'error';
    if (cert.diasRestantes <= 30) return 'warning';
    return 'check_circle';
  }

  formataData(d: Date): string {
    return d.toLocaleString();
  }

  /** "Valid from" ok quando a data atual já passou do notBefore. */
  validFromOk(cert: CertificadoInfo): boolean {
    return new Date() >= cert.notBefore;
  }

  /** "Valid until" ok quando a data atual ainda não passou do notAfter. */
  validUntilOk(cert: CertificadoInfo): boolean {
    return new Date() <= cert.notAfter;
  }

  iconeCelula(r: ResultadoPar): string {
    if (r === 'match') return 'link';
    if (r === 'mismatch') return 'link_off';
    return 'remove';
  }

  aoEntrarCelula(row: number, col: number, resultado: ResultadoPar): void {
    this.hoverRow = row;
    this.hoverCol = col;
    this.hoverResultado = resultado;
  }

  aoSairCelula(): void {
    this.hoverRow = null;
    this.hoverCol = null;
    this.hoverResultado = null;
  }

  iconePortador(tipo: string): string {
    if (tipo === 'certificate') return 'verified_user';
    if (tipo === 'private') return 'vpn_key';
    return 'key';
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }

  trackByLinha(_: number, linha: LinhaMatriz): string {
    return linha.portador.id;
  }
}
