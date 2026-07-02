import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  filtro = '';

  gruposFerramentas = [
    {
      titulo: 'Ferramentas de Texto',
      ferramentas: [
        { titulo: 'Editor de Texto', descricao: 'Limpar, quebrar, substituir e transformar textos.', icone: 'notes', rota: 'quebra-linha', novo: false },
        { titulo: 'Template de Texto', descricao: 'Preencher textos usando variaveis reutilizaveis.', icone: 'article', rota: 'template-de-texto', novo: false },
        { titulo: 'Compartilhador de Texto', descricao: 'Compartilhar texto em tempo real pela aplicacao.', icone: 'public', rota: 'texto-global', novo: false },
        { titulo: 'Texto para QRCode', descricao: 'Gerar QRCode a partir de textos e URLs.', icone: 'qr_code_2', rota: 'texto-qrcode', novo: false },
        { titulo: 'Conversor OCR', descricao: 'Extrair texto de imagens usando OCR.', icone: 'document_scanner', rota: 'conversor-imagem-texto-ocr', novo: false },
        { titulo: 'Diff de Texto', descricao: 'Comparar dois blocos de texto e destacar as diferencas.', icone: 'difference', rota: 'diff-texto', novo: true }
      ]
    },
    {
      titulo: 'Ferramentas de Desenvolvimento',
      ferramentas: [
        { titulo: 'Conversor de Base64 Texto', descricao: 'Codificar e decodificar textos em Base64.', icone: 'data_object', rota: 'base64', novo: false },
        { titulo: 'Codec de URL', descricao: 'Codificar e decodificar URLs rapidamente.', icone: 'link', rota: 'codec-de-url', novo: false },
        { titulo: 'Editor de Json', descricao: 'Formatar, minificar e stringificar JSON.', icone: 'integration_instructions', rota: 'editor-json', novo: false },
        { titulo: 'Gerador de Hash', descricao: 'Gerar hashes MD5, SHA-1, SHA-256 e SHA-512.', icone: 'tag', rota: 'gerador-hash', novo: true },
        { titulo: 'Diff de JSON', descricao: 'Comparar dois JSONs lado a lado e destacar diferencas.', icone: 'compare', rota: 'diff-json', novo: true },
        { titulo: 'Gerador de UUID', descricao: 'Gerar UUIDs v4, v7 e v1 com opcoes de formato.', icone: 'fingerprint', rota: 'gerador-uuid', novo: true },
        { titulo: 'Unix Timestamp', descricao: 'Converter datas e horarios para timestamp Unix.', icone: 'schedule', rota: 'unix-timestamp', novo: false },
        { titulo: 'Manipulador de JWT', descricao: 'Inspecionar cabecalho, corpo e assinatura de tokens JWT.', icone: 'token', rota: 'visualizador-jwt', novo: false },
        { titulo: 'Manipulador de JWE', descricao: 'Separar header, chave criptografada, IV, ciphertext e tag de tokens JWE.', icone: 'vpn_key', rota: 'visualizador-jwe', novo: false },
        { titulo: 'Gerador de HMAC', descricao: 'Calcular HMAC com SHA-256, SHA-512 e outros algoritmos.', icone: 'vpn_lock', rota: 'gerador-hmac', novo: true },
        { titulo: 'Visualizador de Certificado X.509', descricao: 'Ler informacoes de certificados digitais X.509.', icone: 'verified_user', rota: 'visualizador-x-509', novo: false },
        { titulo: 'Gerador de Chaves e Certificados X.509', descricao: 'Gerar certificados digitais X.509 com chaves RSA.', icone: 'add_moderator', rota: 'gerador-certificado-x509', novo: false }
      ]
    },
    {
      titulo: 'Geradores',
      ferramentas: [
        { titulo: 'Gerador de Senhas', descricao: 'Gerar senhas seguras com configuracoes de comprimento e caracteres.', icone: 'password', rota: 'gerador-senha', novo: true },
        { titulo: 'Gerador de CPF e CNPJ', descricao: 'Gerar CPFs e CNPJs validos para testes de software.', icone: 'badge', rota: 'gerador-cpf-cnpj', novo: true }
      ]
    },
    {
      titulo: 'Ferramentas de Imagens, Gráficas e PDF',
      ferramentas: [
        { titulo: 'Editor de Fluxograma', descricao: 'Desenhar fluxogramas com formas, setas e cores; importar e exportar em Mermaid e XML.', icone: 'account_tree', rota: 'editor-fluxograma', novo: true },
        { titulo: 'Juntador de PDFs e Imagens', descricao: 'Juntar varios PDFs e imagens em um unico arquivo PDF ou imagem, com reordenacao.', icone: 'merge_type', rota: 'juntador-pdf', novo: false },
        { titulo: 'Separador de PDFs', descricao: 'Separar um PDF em paginas individuais, baixar como ZIP de PDFs ou JPGs.', icone: 'call_split', rota: 'separador-pdf', novo: false },
        { titulo: 'Conversor OCR', descricao: 'Extrair texto de imagens usando OCR local com Tesseract.js.', icone: 'document_scanner', rota: 'conversor-imagem-texto-ocr', novo: false }
      ]
    }
  ];

  get gruposFiltrados() {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) return this.gruposFerramentas;
    return this.gruposFerramentas
      .map(g => ({
        ...g,
        ferramentas: g.ferramentas.filter(f =>
          f.titulo.toLowerCase().includes(termo) ||
          f.descricao.toLowerCase().includes(termo)
        )
      }))
      .filter(g => g.ferramentas.length > 0);
  }

  get semResultados(): boolean {
    return this.filtro.trim().length > 0 && this.gruposFiltrados.length === 0;
  }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Inicio');
  }

  navegaFerramenta(rota: string) {
    this.router.navigate(['/' + rota]);
  }

  limparFiltro(): void {
    this.filtro = '';
  }

  trackByGrupo(_: number, grupo: { titulo: string }): string {
    return grupo.titulo;
  }

  trackByFerramenta(_: number, f: { rota: string }): string {
    return f.rota;
  }
}
