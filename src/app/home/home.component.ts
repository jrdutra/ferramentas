import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import { TOOL_ARTICLES } from '../articles/articles.data';

interface BaseHomeTool {
  titulo: string;
  descricao: string;
  icone: string;
  rota: string;
  novo: boolean;
}

interface HomeTool extends BaseHomeTool {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  external: boolean;
}

interface BaseHomeToolGroup {
  titulo: string;
  ferramentas: BaseHomeTool[];
}

interface HomeToolGroup {
  titulo: string;
  ferramentas: HomeTool[];
}

const ARTICLES_BY_TOOL_ROUTE = new Map(
  TOOL_ARTICLES.map((article) => [article.toolRoute.replace(/^\//, ''), article])
);

const EXTERNAL_TOOL_IMAGES: Record<string, { image: string; imageAlt: string; imageWidth: number; imageHeight: number }> = {
  'https://kanbanapp.io': {
    image: '/assets/articles/kanbanapp-card-cover.png',
    imageAlt: 'Neon Kanban board with organized task columns, progress indicators and completed cards',
    imageWidth: 1672,
    imageHeight: 941
  },
  'https://praebere.com': {
    image: '/assets/articles/flowchart-editor-card-cover.png',
    imageAlt: 'Neon flowchart with connected process nodes, decisions and directional paths',
    imageWidth: 1672,
    imageHeight: 941
  }
};

function decorateHomeTool(tool: BaseHomeTool): HomeTool {
  const article = ARTICLES_BY_TOOL_ROUTE.get(tool.rota);
  const externalImage = EXTERNAL_TOOL_IMAGES[tool.rota];

  return {
    ...tool,
    image: article?.image ?? externalImage?.image ?? '/assets/articles/what-is-utily-tools-cover.png',
    imageAlt: article?.imageAlt ?? externalImage?.imageAlt ?? `Illustration for ${tool.titulo}`,
    imageWidth: article?.imageWidth ?? externalImage?.imageWidth ?? 1731,
    imageHeight: article?.imageHeight ?? externalImage?.imageHeight ?? 909,
    external: tool.rota.startsWith('http')
  };
}

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

  gruposFerramentas: HomeToolGroup[] = ([
    {
      titulo: 'Text Tools',
      ferramentas: [
        { titulo: 'Text Editor', descricao: 'Clean, split, replace and transform text.', icone: 'notes', rota: 'text-editor', novo: false },
        { titulo: 'Text Template', descricao: 'Fill in text using reusable variables.', icone: 'article', rota: 'text-template', novo: false },
        { titulo: 'Text to QR Code', descricao: 'Generate QR codes from text and URLs.', icone: 'qr_code_2', rota: 'text-to-qrcode', novo: false },
        { titulo: 'Text Sharer', descricao: 'Share temporary text between screens in real time.', icone: 'sync_alt', rota: 'shared-text', novo: true },
        { titulo: 'OCR Converter', descricao: 'Extract text from images using OCR.', icone: 'document_scanner', rota: 'image-to-text-ocr', novo: false },
        { titulo: 'Text Diff', descricao: 'Compare two blocks of text and highlight the differences.', icone: 'difference', rota: 'text-diff', novo: true }
      ]
    },
    {
      titulo: 'Developer Tools',
      ferramentas: [
        { titulo: 'Base64 Text Converter', descricao: 'Encode and decode text in Base64.', icone: 'data_object', rota: 'base64', novo: false },
        { titulo: 'URL Codec', descricao: 'Encode and decode URLs quickly.', icone: 'link', rota: 'url-codec', novo: false },
        { titulo: 'JSON Editor', descricao: 'Format, minify and stringify JSON.', icone: 'integration_instructions', rota: 'json-editor', novo: false },
        { titulo: 'Hash Generator', descricao: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes.', icone: 'tag', rota: 'hash-generator', novo: true },
        { titulo: 'JSON & YAML Comparator', descricao: 'Compare fields of two JSON or YAML files: missing on each side and differing values.', icone: 'compare_arrows', rota: 'json-yaml-compare', novo: true },
        { titulo: 'UUID Generator', descricao: 'Generate v4, v7 and v1 UUIDs with formatting options.', icone: 'fingerprint', rota: 'uuid-generator', novo: true },
        { titulo: 'Unix Timestamp', descricao: 'Convert dates and times to Unix timestamps.', icone: 'schedule', rota: 'unix-timestamp', novo: false },
        { titulo: 'IPv4 CIDR Calculator', descricao: 'Calculate subnet ranges, masks, network, broadcast and usable addresses.', icone: 'lan', rota: 'ipv4-range-calculator', novo: true },
        { titulo: 'JWT Manipulator', descricao: 'Inspect header, payload and signature of JWT tokens.', icone: 'token', rota: 'jwt-viewer', novo: false },
        { titulo: 'JWE Manipulator', descricao: 'Split header, encrypted key, IV, ciphertext and tag of JWE tokens.', icone: 'vpn_key', rota: 'jwe-viewer', novo: false },
        { titulo: 'HMAC Generator', descricao: 'Compute HMAC with SHA-256, SHA-512 and other algorithms.', icone: 'vpn_lock', rota: 'hmac-generator', novo: true },
        { titulo: 'X.509 Certificate Viewer', descricao: 'Read information from X.509 digital certificates.', icone: 'verified_user', rota: 'x509-viewer', novo: false },
        { titulo: 'X.509 Key & Certificate Generator', descricao: 'Generate X.509 digital certificates with RSA keys.', icone: 'add_moderator', rota: 'x509-generator', novo: false },
        { titulo: 'Certificate & Key Validator', descricao: 'Validate certificate expiry and match certificates, public and private keys. Supports PEM, CRT, CER, DER, PFX and P12.', icone: 'fact_check', rota: 'certificate-validator', novo: true },
        { titulo: 'KanbanApp', descricao: 'Kanban board to organize tasks and projects.', icone: 'view_kanban', rota: 'https://kanbanapp.io', novo: true }
      ]
    },
    {
      titulo: 'Generators',
      ferramentas: [
        { titulo: 'Password Generator', descricao: 'Generate secure passwords with length and character options.', icone: 'password', rota: 'password-generator', novo: true },
        { titulo: 'CPF & CNPJ Generator', descricao: 'Generate valid CPF and CNPJ numbers for software testing.', icone: 'badge', rota: 'cpf-cnpj-generator', novo: true }
      ]
    },
    {
      titulo: 'Image, Graphics & PDF Tools',
      ferramentas: [
        { titulo: 'Flowchart Editor', descricao: 'Draw flowcharts with shapes, arrows and colors; import and export as Mermaid and XML.', icone: 'account_tree', rota: 'https://praebere.com', novo: true },
        { titulo: 'PDF & Image Merger', descricao: 'Merge multiple PDFs and images into a single PDF or image file, with reordering.', icone: 'merge_type', rota: 'pdf-merger', novo: false },
        { titulo: 'PDF Splitter', descricao: 'Split a PDF into individual pages, download as a ZIP of PDFs or JPGs.', icone: 'call_split', rota: 'pdf-splitter', novo: false },
        { titulo: 'PDF Creator', descricao: 'Arrange images and create a single PDF in your browser.', icone: 'picture_as_pdf', rota: 'pdf-creator', novo: true },
        { titulo: 'OCR Converter', descricao: 'Extract text from images using local OCR with Tesseract.js.', icone: 'document_scanner', rota: 'image-to-text-ocr', novo: false }
      ]
    }
  ] as BaseHomeToolGroup[]).map((group) => ({
    ...group,
    ferramentas: group.ferramentas.map(decorateHomeTool)
  }));

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
    this.dataService.setTituloAplicacao('Home');
  }

  navegaFerramenta(rota: string) {
    if (rota.startsWith('http')) {
      window.open(rota, '_blank', 'noopener');
      return;
    }
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
