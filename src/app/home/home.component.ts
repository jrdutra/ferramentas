import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  gruposFerramentas = [
    {
      titulo: 'Ferramentas de Texto',
      ferramentas: [
        { titulo: 'Quebra Linha', descricao: 'Limpar, quebrar, substituir e transformar textos.', icone: 'notes', rota: 'quebra-linha' },
        { titulo: 'Template de Texto', descricao: 'Preencher textos usando variaveis reutilizaveis.', icone: 'article', rota: 'template-de-texto' },
        { titulo: 'Texto Global', descricao: 'Compartilhar texto em tempo real pela aplicacao.', icone: 'sync_alt', rota: 'texto-global' },
        { titulo: 'Texto para QRCode', descricao: 'Gerar QRCode a partir de textos e URLs.', icone: 'qr_code_2', rota: 'texto-qrcode' },
        { titulo: 'Conversor OCR', descricao: 'Extrair texto de imagens usando OCR.', icone: 'document_scanner', rota: 'conversor-imagem-texto-ocr' }
      ]
    },
    {
      titulo: 'Codificacao e Dados',
      ferramentas: [
        { titulo: 'Conversor de Base64', descricao: 'Codificar e decodificar textos em Base64.', icone: 'data_object', rota: 'base64' },
        { titulo: 'Codec de URL', descricao: 'Codificar e decodificar URLs rapidamente.', icone: 'link', rota: 'codec-de-url' },
        { titulo: 'Editor de Json', descricao: 'Formatar, minificar e stringificar JSON.', icone: 'integration_instructions', rota: 'editor-json' }
      ]
    },
    {
      titulo: 'Ferramentas de Tokens',
      ferramentas: [
        { titulo: 'Visualizador de JWT', descricao: 'Inspecionar cabecalho, corpo e assinatura de tokens JWT.', icone: 'token', rota: 'visualizador-jwt' }
      ]
    },
    {
      titulo: 'Ferramentas de Certificado',
      ferramentas: [
        { titulo: 'Visualizador de X.509', descricao: 'Ler informacoes de certificados digitais X.509.', icone: 'verified_user', rota: 'visualizador-x-509' }
      ]
    },
    {
      titulo: 'Ferramentas Diversas',
      ferramentas: [
        { titulo: 'Unix Timestamp', descricao: 'Converter datas e horarios para timestamp Unix.', icone: 'schedule', rota: 'unix-timestamp' }
      ]
    }
  ];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Inicio');
  }

  navegaFerramenta(rota: string) {
    this.router.navigate(['/' + rota]);
  }
}
