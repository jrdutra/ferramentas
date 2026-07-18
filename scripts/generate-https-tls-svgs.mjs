import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/https-tls/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const locales = {
  pt: [
    ['HTTPS na pilha de comunicação', 'HTTPS não é um protocolo separado: é HTTP executado sobre TLS, normalmente sobre TCP.', ['Aplicação|HTTP|Método, URI, status, campos e conteúdo', 'Segurança de transporte|TLS|Handshake, chaves e record protocol', 'Transporte|TCP|Conexão confiável, ordem e retransmissão', 'Rede|IP|Endereçamento, roteamento, MTU e NAT', 'Enlace e física|Ethernet, Wi-Fi, fibra|Redes privadas']],
    ['Objetivos fundamentais do TLS', 'O TLS transforma um canal TCP sem proteção em um canal criptografado e autenticado.', ['Confidencialidade|Protege o conteúdo|Contra terceiros', 'Integridade|Detecta alteração|Dos registros protegidos', 'Autenticidade|Valida identidade|Esperada do servidor']],
    ['Handshake TLS 1.2', 'Mais mensagens e mais opções históricas aumentam a superfície de configuração.', ['Cliente|ClientHello|Versões, random, ciphers, SNI e ALPN', 'Servidor|ServerHello + certificado|Parâmetros escolhidos', 'Servidor|ServerKeyExchange|CertificateRequest quando aplicável', 'Cliente|ClientKeyExchange + Finished|Segredo pre-master ou ECDHE', 'Servidor|ChangeCipherSpec + Finished|Canal protegido', 'Aplicação|HTTP protegido|TLS records']],
    ['Handshake TLS 1.3', 'Menos round trips, opções antigas removidas e mais partes do handshake criptografadas.', ['Cliente|ClientHello + key_share|Versões, SNI e ALPN', 'Servidor|ServerHello|EncryptedExtensions', 'Servidor|Certificado|CertificateVerify + Finished', 'Cliente|Finished|Confirma negociação', 'Aplicação|Dados protegidos|HTTP/1.1, HTTP/2 ou outro protocolo']],
    ['Cadeia de confiança X.509', 'O cliente valida cadeia, validade, nome, usos de chave, revogação e posse da chave privada.', ['Raiz confiável|Root CA|No truststore', 'CA intermediária|Assina certificados|Separa a raiz da operação', 'Certificado do servidor|api.empresa.com|Identidade do endpoint']],
    ['SNI e ALPN no ClientHello', 'O gateway seleciona certificado e protocolo antes de processar HTTP.', ['Cliente|SNI = api.exemplo.com|ALPN = h2, http/1.1', 'Gateway ou LB|Seleciona certificado|Escolhe protocolo', 'Certificado A|api.exemplo.com|Domínio solicitado', 'Certificado B|portal.exemplo.com|Outro domínio no mesmo IP']],
    ['TLS record protocol', 'A proteção do canal não substitui autorização, controle de acesso ou validação de entrada.', ['Mensagem HTTP|Bytes da aplicação', 'Fragmentação|TLS records|Unidades protegidas', 'Criptografia AEAD|Confidencialidade|Integridade', 'Transporte|Bytes TCP|Entrega ordenada']],
    ['Modos de TLS em gateways', 'Cada modo muda visibilidade, confiança e capacidade de aplicar políticas HTTP.', ['TLS termination|Gateway encerra TLS|Inspeciona HTTP|Backend pode usar HTTP ou HTTPS', 'TLS re-encryption|Duas sessões independentes|Cliente–gateway e gateway–backend', 'TLS pass-through|Gateway não descriptografa|Roteia por SNI ou camada 4']],
    ['Retomada de sessão TLS', 'A retomada reduz latência e CPU, mas exige governança de tickets, chaves e lifetime.', ['Primeira conexão|Handshake completo|Cria material de retomada', 'Ticket ou PSK|Material compartilhado|Políticas de segurança', 'Nova conexão|Handshake reduzido|Menor custo operacional']],
    ['Troubleshooting de falhas HTTPS', 'O diagnóstico caminha por camadas: nome, rede, TCP, TLS, HTTP, gateway e backend.', ['DNS, IP e porta|NXDOMAIN|IP errado, firewall ou porta', 'TCP conectou?|Timeout|RST ou SYN sem retorno', 'TLS negociou?|Certificado, SNI|Versão, cipher ou mTLS', 'HTTP respondeu?|4xx, 5xx e policy|Autor do status e rota']],
    ['Ciclo de vida de certificados', 'Sem processo de ciclo de vida, TLS vira risco operacional.', ['Inventário|Domínios, donos|Datas de expiração', 'Emissão|CA aprovada|Chaves seguras', 'Instalação|Cadeia completa|SNI correto', 'Monitoramento|Validade e revogação|Alertas antecipados', 'Rotação|Renovação testada|Substituição controlada']],
  ],
  en: [
    ['HTTPS in the communication stack', 'HTTPS is not a separate protocol: it is HTTP running over TLS, normally over TCP.', ['Application|HTTP|Method, URI, status, fields, and content', 'Transport security|TLS|Handshake, keys, and record protocol', 'Transport|TCP|Reliable connection, ordering, and retransmission', 'Network|IP|Addressing, routing, MTU, and NAT', 'Link and physical|Ethernet, Wi-Fi, fiber|Private networks']],
    ['Fundamental TLS objectives', 'TLS turns an unprotected TCP channel into an encrypted and authenticated channel.', ['Confidentiality|Protects content|From third parties', 'Integrity|Detects tampering|In protected records', 'Authenticity|Validates identity|Expected from the server']],
    ['TLS 1.2 handshake', 'More messages and historical options increase the configuration surface.', ['Client|ClientHello|Versions, random, ciphers, SNI, and ALPN', 'Server|ServerHello + certificate|Selected parameters', 'Server|ServerKeyExchange|CertificateRequest when applicable', 'Client|ClientKeyExchange + Finished|Pre-master secret or ECDHE', 'Server|ChangeCipherSpec + Finished|Protected channel', 'Application|Protected HTTP|TLS records']],
    ['TLS 1.3 handshake', 'Fewer round trips, obsolete options removed, and more of the handshake encrypted.', ['Client|ClientHello + key_share|Versions, SNI, and ALPN', 'Server|ServerHello|EncryptedExtensions', 'Server|Certificate|CertificateVerify + Finished', 'Client|Finished|Confirms negotiation', 'Application|Protected data|HTTP/1.1, HTTP/2, or another protocol']],
    ['X.509 trust chain', 'The client validates the chain, validity, name, key usage, revocation, and private-key possession.', ['Trusted root|Root CA|In the truststore', 'Intermediate CA|Signs certificates|Separates the root from operations', 'Server certificate|api.example.com|Endpoint identity']],
    ['SNI and ALPN in ClientHello', 'The gateway selects the certificate and protocol before processing HTTP.', ['Client|SNI = api.example.com|ALPN = h2, http/1.1', 'Gateway or LB|Selects certificate|Chooses protocol', 'Certificate A|api.example.com|Requested domain', 'Certificate B|portal.example.com|Another domain on the same IP']],
    ['TLS record protocol', 'Channel protection does not replace authorization, access control, or input validation.', ['HTTP message|Application bytes', 'Fragmentation|TLS records|Protected units', 'AEAD encryption|Confidentiality|Integrity', 'Transport|TCP bytes|Ordered delivery']],
    ['TLS modes in gateways', 'Each mode changes visibility, trust, and the ability to apply HTTP policies.', ['TLS termination|Gateway terminates TLS|Inspects HTTP|Backend may use HTTP or HTTPS', 'TLS re-encryption|Two independent sessions|Client–gateway and gateway–backend', 'TLS pass-through|Gateway does not decrypt|Routes by SNI or layer 4']],
    ['TLS session resumption', 'Resumption reduces latency and CPU cost but requires governance of tickets, keys, and lifetimes.', ['First connection|Full handshake|Creates resumption material', 'Ticket or PSK|Shared material|Security policies', 'New connection|Reduced handshake|Lower operational cost']],
    ['Troubleshooting HTTPS failures', 'Diagnosis proceeds by layer: name, network, TCP, TLS, HTTP, gateway, and backend.', ['DNS, IP, and port|NXDOMAIN|Wrong IP, firewall, or port', 'Did TCP connect?|Timeout|RST or unanswered SYN', 'Did TLS negotiate?|Certificate and SNI|Version, cipher, or mTLS', 'Did HTTP respond?|4xx, 5xx, and policy|Status author and route']],
    ['Certificate lifecycle', 'Without a lifecycle process, TLS becomes an operational risk.', ['Inventory|Domains and owners|Expiration dates', 'Issuance|Approved CA|Secure keys', 'Installation|Complete chain|Correct SNI', 'Monitoring|Validity and revocation|Early alerts', 'Rotation|Tested renewal|Controlled replacement']],
  ],
  es: [
    ['HTTPS en la pila de comunicación', 'HTTPS no es un protocolo separado: es HTTP ejecutado sobre TLS, normalmente sobre TCP.', ['Aplicación|HTTP|Método, URI, status, campos y contenido', 'Seguridad de transporte|TLS|Handshake, claves y record protocol', 'Transporte|TCP|Conexión fiable, orden y retransmisión', 'Red|IP|Direccionamiento, enrutamiento, MTU y NAT', 'Enlace y física|Ethernet, Wi-Fi, fibra|Redes privadas']],
    ['Objetivos fundamentales de TLS', 'TLS convierte un canal TCP desprotegido en un canal cifrado y autenticado.', ['Confidencialidad|Protege el contenido|Frente a terceros', 'Integridad|Detecta alteraciones|En records protegidos', 'Autenticidad|Valida la identidad|Esperada del servidor']],
    ['Handshake TLS 1.2', 'Más mensajes y opciones históricas aumentan la superficie de configuración.', ['Cliente|ClientHello|Versiones, random, ciphers, SNI y ALPN', 'Servidor|ServerHello + certificado|Parámetros elegidos', 'Servidor|ServerKeyExchange|CertificateRequest cuando aplica', 'Cliente|ClientKeyExchange + Finished|Secreto pre-master o ECDHE', 'Servidor|ChangeCipherSpec + Finished|Canal protegido', 'Aplicación|HTTP protegido|TLS records']],
    ['Handshake TLS 1.3', 'Menos round trips, opciones antiguas eliminadas y más partes del handshake cifradas.', ['Cliente|ClientHello + key_share|Versiones, SNI y ALPN', 'Servidor|ServerHello|EncryptedExtensions', 'Servidor|Certificado|CertificateVerify + Finished', 'Cliente|Finished|Confirma la negociación', 'Aplicación|Datos protegidos|HTTP/1.1, HTTP/2 u otro protocolo']],
    ['Cadena de confianza X.509', 'El cliente valida cadena, vigencia, nombre, uso de claves, revocación y posesión de la clave privada.', ['Raíz de confianza|Root CA|En el truststore', 'CA intermedia|Firma certificados|Separa la raíz de la operación', 'Certificado del servidor|api.ejemplo.com|Identidad del endpoint']],
    ['SNI y ALPN en ClientHello', 'El gateway selecciona certificado y protocolo antes de procesar HTTP.', ['Cliente|SNI = api.ejemplo.com|ALPN = h2, http/1.1', 'Gateway o LB|Selecciona certificado|Elige protocolo', 'Certificado A|api.ejemplo.com|Dominio solicitado', 'Certificado B|portal.ejemplo.com|Otro dominio en la misma IP']],
    ['TLS record protocol', 'La protección del canal no sustituye autorización, control de acceso ni validación de entrada.', ['Mensaje HTTP|Bytes de aplicación', 'Fragmentación|TLS records|Unidades protegidas', 'Cifrado AEAD|Confidencialidad|Integridad', 'Transporte|Bytes TCP|Entrega ordenada']],
    ['Modos TLS en gateways', 'Cada modo cambia visibilidad, confianza y capacidad de aplicar políticas HTTP.', ['TLS termination|El gateway termina TLS|Inspecciona HTTP|El backend usa HTTP o HTTPS', 'TLS re-encryption|Dos sesiones independientes|Cliente–gateway y gateway–backend', 'TLS pass-through|El gateway no descifra|Enruta por SNI o capa 4']],
    ['Reanudación de sesión TLS', 'La reanudación reduce latencia y CPU, pero exige gobernanza de tickets, claves y lifetime.', ['Primera conexión|Handshake completo|Crea material de reanudación', 'Ticket o PSK|Material compartido|Políticas de seguridad', 'Nueva conexión|Handshake reducido|Menor coste operativo']],
    ['Troubleshooting de fallos HTTPS', 'El diagnóstico avanza por capas: nombre, red, TCP, TLS, HTTP, gateway y backend.', ['DNS, IP y puerto|NXDOMAIN|IP incorrecta, firewall o puerto', '¿Conectó TCP?|Timeout|RST o SYN sin respuesta', '¿Negoció TLS?|Certificado y SNI|Versión, cipher o mTLS', '¿Respondió HTTP?|4xx, 5xx y policy|Autor del status y ruta']],
    ['Ciclo de vida de certificados', 'Sin un proceso de ciclo de vida, TLS se convierte en riesgo operativo.', ['Inventario|Dominios y responsables|Fechas de expiración', 'Emisión|CA aprobada|Claves seguras', 'Instalación|Cadena completa|SNI correcto', 'Monitorización|Vigencia y revocación|Alertas anticipadas', 'Rotación|Renovación probada|Sustitución controlada']],
  ],
};

const filenames = [
  'figure-01-https-stack.svg', 'figure-02-tls-objectives.svg',
  'figure-03-tls12-handshake.svg', 'figure-04-tls13-handshake.svg',
  'figure-05-certificate-chain.svg', 'figure-06-sni-alpn.svg',
  'figure-07-record-protocol.svg', 'figure-08-gateway-tls-modes.svg',
  'figure-09-session-resumption.svg', 'figure-10-troubleshooting-tree.svg',
  'figure-11-certificate-lifecycle.svg',
];

const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

function wrap(value, maxChars, maxLines = 4) {
  const words = value.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) { lines.push(current); current = word; }
    else current = next;
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function textBlock(value, x, y, width, fontSize = 22, color = '#dbeafe', weight = 500, maxLines = 4) {
  const lines = wrap(value, Math.max(10, Math.floor(width / (fontSize * 0.54))), maxLines);
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="${fontSize}" font-weight="${weight}" text-anchor="middle">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? fontSize * 1.24 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function renderFigure(title, subtitle, rawCards, index) {
  const cards = rawCards.map((entry) => entry.split('|'));
  const count = cards.length;
  const gap = count >= 6 ? 14 : count >= 5 ? 18 : 28;
  const margin = 62;
  const cardWidth = (1400 - margin * 2 - gap * (count - 1)) / count;
  const titleFont = title.length > 42 ? 34 : 38;
  const titleLines = wrap(title, Math.floor(1220 / (titleFont * 0.54)), 3);
  const subtitleY = 80 + (titleLines.length - 1) * titleFont * 1.24 + 62;
  const subtitleLines = wrap(subtitle, 98, 3);
  const cardY = Math.max(252, subtitleY + (subtitleLines.length - 1) * 27 + 72);
  const cardH = 345;
  const palette = ['#38bdf8', '#818cf8', '#c084fc', '#22d3ee', '#60a5fa', '#a78bfa'];
  const cardsSvg = cards.map((lines, cardIndex) => {
    const x = margin + cardIndex * (cardWidth + gap);
    const color = palette[cardIndex % palette.length];
    const heading = lines[0];
    const details = lines.slice(1);
    const headingFont = count >= 6 ? 20 : count >= 5 ? 22 : 27;
    const headingLines = wrap(heading, Math.max(10, Math.floor((cardWidth - 34) / (headingFont * 0.54))), 3);
    const detailsStart = cardY + 92 + headingLines.length * headingFont * 1.2;
    const detailsEnd = cardY + cardH - 56;
    const detailGap = details.length > 1 ? Math.min(60, Math.max(42, (detailsEnd - detailsStart) / (details.length - 1))) : 0;
    const detailFont = count >= 6 ? 16 : count >= 5 ? 17 : 20;
    const arrow = cardIndex < count - 1
      ? `<path d="M ${x + cardWidth + 4} ${cardY + cardH / 2} H ${x + cardWidth + gap - 4}" stroke="#67e8f9" stroke-width="4" marker-end="url(#arrow)" opacity=".75"/>`
      : '';
    return `<g><rect x="${x}" y="${cardY}" width="${cardWidth}" height="${cardH}" rx="24" fill="url(#card${cardIndex % 3})" stroke="${color}" stroke-width="2.5"/><rect x="${x + 16}" y="${cardY + 17}" width="${cardWidth - 32}" height="8" rx="4" fill="${color}" opacity=".9"/>${textBlock(heading, x + cardWidth / 2, cardY + 72, cardWidth - 34, headingFont, '#f8fafc', 750, 3)}${details.map((detail, detailIndex) => textBlock(detail, x + cardWidth / 2, detailsStart + detailIndex * detailGap, cardWidth - 30, detailFont, '#cbd5e1', 500, 3)).join('')}${details.length < 4 ? `<circle cx="${x + cardWidth / 2}" cy="${cardY + cardH - 28}" r="8" fill="${color}" filter="url(#glow)"/>` : ''}${arrow}</g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="780" viewBox="0 0 1400 780" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".55" stop-color="#071426"/><stop offset="1" stop-color="#11104a"/></linearGradient><linearGradient id="card0" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b2442"/><stop offset="1" stop-color="#101a3a"/></linearGradient><linearGradient id="card1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111c44"/><stop offset="1" stop-color="#23154a"/></linearGradient><linearGradient id="card2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#12243d"/><stop offset="1" stop-color="#151b35"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#67e8f9"/></marker><pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#1d4ed8" stroke-width="1" opacity=".12"/></pattern></defs><rect width="1400" height="780" rx="28" fill="url(#bg)"/><rect width="1400" height="780" rx="28" fill="url(#grid)"/><circle cx="165" cy="115" r="115" fill="#0ea5e9" opacity=".08"/><circle cx="1240" cy="650" r="170" fill="#7c3aed" opacity=".09"/>${textBlock(title, 700, 80, 1220, titleFont, '#f8fafc', 800, 3)}${textBlock(subtitle, 700, subtitleY, 1180, 22, '#93c5fd', 500, 3)}${cardsSvg}<path d="M70 688 H1330" stroke="#334155" stroke-width="1"/><text x="70" y="730" fill="#64748b" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="18">FAAC · ${String(index + 1).padStart(2, '0')}</text></svg>`;
}

for (const [locale, figures] of Object.entries(locales)) {
  const target = join(root, locale);
  mkdirSync(target, { recursive: true });
  figures.forEach(([title, subtitle, cards], index) => {
    writeFileSync(join(target, filenames[index]), renderFigure(title, subtitle, cards, index), 'utf8');
  });
}

console.log(`Generated ${filenames.length * Object.keys(locales).length} localized SVG diagrams.`);
