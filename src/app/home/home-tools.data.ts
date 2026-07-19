export interface BaseHomeTool {
  titulo: string;
  descricao: string;
  icone: string;
  rota: string;
  novo: boolean;
}

export interface BaseHomeToolGroup {
  titulo: string;
  ferramentas: BaseHomeTool[];
}

/**
 * Single source of truth for the tool catalogue shown on the home page.
 *
 * The home component renders it, and the home route derives the ItemList
 * structured data from it, so the catalogue that search engines see always
 * matches the catalogue that visitors see.
 */
export const HOME_TOOL_GROUPS: BaseHomeToolGroup[] = [
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
      { titulo: 'Swagger Viewer & Editor', descricao: 'View, edit and test Swagger/OpenAPI specs: convert versions, call endpoints and export standalone HTML docs.', icone: 'api', rota: 'swagger-editor', novo: true },
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
];

/** Flat list used to build the ItemList structured data of the home page. */
export const HOME_TOOL_ITEMS = HOME_TOOL_GROUPS.flatMap((group) =>
  group.ferramentas.map((tool) => ({
    name: tool.titulo,
    description: tool.descricao,
    path: tool.rota.startsWith('http') ? tool.rota : `/${tool.rota}`
  }))
);
