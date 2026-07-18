import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/http-versions/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const locales = {
  pt: {
    figures: [
      ['Semântica HTTP compartilhada', 'A mensagem conserva intenção, alvo, campos e conteúdo.', ['HTTP/1.1|Texto + CRLF|TCP', 'HTTP/2|Frames binários + HPACK|TCP + TLS ou modo claro', 'HTTP/3|Frames + QPACK|QUIC + TLS 1.3']],
      ['Evolução do HTTP', 'A semântica foi preservada enquanto o transporte evoluiu.', ['HTTP/0.9|Mensagem mínima', 'HTTP/1.0|Status e campos', 'HTTP/1.1|Persistência e framing', 'HTTP/2|Streams multiplexados', 'HTTP/3|QUIC e isolamento de perda']],
      ['Anatomia de uma transação HTTP', 'Requisição e resposta são mensagens autodescritivas.', ['REQUISIÇÃO|Linha inicial ou pseudo-campos|Campos|Conteúdo opcional', 'RESPOSTA|Status|Campos|Conteúdo opcional|Trailers']],
      ['Propriedades semânticas dos métodos', 'Segurança e idempotência orientam retries e políticas.', ['GET|Seguro|Idempotente', 'HEAD|Seguro|Idempotente', 'POST|Não seguro|Não idempotente', 'PUT|Não seguro|Idempotente', 'DELETE|Não seguro|Idempotente']],
      ['Revalidação condicional com ETag', 'Cache correto reduz tráfego sem confundir frescor com validade.', ['1. Cliente|GET + If-None-Match', '2. Cache ou gateway|Compara o validator', '3. Origem|304 Not Modified ou nova representação']],
      ['Delimitação de mensagem no HTTP/1.1', 'O receptor precisa determinar exatamente onde o conteúdo termina.', ['Content-Length|Tamanho declarado em bytes', 'Transfer-Encoding: chunked|Blocos com tamanho e terminador', 'Sem corpo|HEAD, 1xx, 204, 304 e regras do método']],
      ['Head-of-line no pipelining HTTP/1.1', 'Respostas mantêm a ordem da conexão mesmo quando terminam fora de ordem.', ['Cliente|R1  R2  R3', 'Servidor|R1 lenta bloqueia R2 e R3', 'Resultado|Fila e latência acumulada']],
      ['Request smuggling por framing divergente', 'Intermediários que discordam sobre limites podem interpretar mensagens diferentes.', ['Cliente|Mensagem ambígua', 'Proxy de borda|Interpreta Content-Length', 'Backend|Interpreta chunked', 'Risco|Bytes extras viram nova requisição']],
      ['HTTP/2: uma conexão, vários streams', 'Frames de streams diferentes podem ser intercalados.', ['Stream 1|HEADERS  DATA  DATA', 'Stream 3|HEADERS  DATA', 'Stream 5|HEADERS  DATA  DATA', 'Conexão HTTP/2|Frames intercalados']],
      ['Multiplexação e bloqueio residual', 'HTTP/2 remove o HOL entre mensagens, mas uma perda TCP afeta todos os streams.', ['Sem perda|Streams avançam juntos', 'Perda TCP|Todos aguardam retransmissão', 'HTTP/3|Perda fica isolada por stream']],
      ['HPACK e estado por conexão', 'Campos repetidos viram índices em tabelas compartilhadas.', ['Bloco de campos|Nomes e valores', 'Tabela estática|Entradas padronizadas', 'Tabela dinâmica|Estado da conexão', 'Representação compacta|Índices + literais']],
      ['Negociação com ALPN', 'O protocolo de aplicação é escolhido durante o handshake TLS.', ['Cliente|Oferece h2 e http/1.1', 'Servidor ou gateway|Seleciona protocolo suportado', 'Resultado|h2 ou http/1.1']],
      ['Comparação das pilhas', 'As versões mantêm HTTP, mas mudam framing e transporte.', ['HTTP/1.1|Mensagens textuais|TLS opcional|TCP|IP', 'HTTP/2|Frames + HPACK|TLS comum|TCP|IP', 'HTTP/3|Frames + QPACK|TLS 1.3 integrado|QUIC / UDP|IP']],
      ['QUIC: perda controlada por stream', 'Pacotes perdidos em um stream não bloqueiam dados disponíveis nos demais.', ['Stream A|Entrega contínua', 'Stream B|Perda e retransmissão local', 'Stream C|Entrega contínua', 'QUIC|Controle por stream']],
      ['Connection IDs e migração de caminho', 'A conexão pode sobreviver a mudança de endereço após validação.', ['Cliente|Wi-Fi → rede móvel', 'Rede|Novo IP e porta', 'Validação de caminho|Desafio e resposta', 'Servidor|Mantém a conexão QUIC']],
      ['QPACK em HTTP/3', 'Atualizações da tabela e blocos de campos usam streams separados.', ['Encoder stream|Atualiza tabela', 'Request streams|Referenciam entradas', 'Decoder stream|Confirma processamento', 'Tabela QPACK|Estado sincronizado']],
      ['Descoberta e fallback de HTTP/3', 'O cliente tenta QUIC e preserva disponibilidade com versões anteriores.', ['1. DNS ou conexão inicial|Descobre endpoint', '2. Alt-Svc ou HTTPS/SVCB|Anuncia HTTP/3', '3. Tentativa QUIC|UDP + TLS 1.3', '4. Fallback|HTTP/2 ou HTTP/1.1']],
      ['Versões independentes por salto', 'Cada conexão real negocia sua própria versão HTTP.', ['Aplicativo|HTTP/3', 'CDN / WAF|HTTP/2', 'API Gateway|HTTP/1.1', 'Mesh ou proxy|HTTP/2', 'Backend|HTTP/1.1']],
      ['Árvore inicial de troubleshooting', 'Primeiro classifique se houve resposta HTTP válida.', ['Falha antes do HTTP|DNS, TCP, UDP, TLS ou QUIC', 'Resposta HTTP|Identifique autor do status', 'Falha intermitente|Compare conexão, stream e instância', 'Versão inesperada|Mapeie cada salto']],
    ]
  },
  en: {
    figures: [
      ['Shared HTTP semantics', 'The message preserves intent, target, fields, and content.', ['HTTP/1.1|Text + CRLF|TCP', 'HTTP/2|Binary frames + HPACK|TCP + TLS or cleartext', 'HTTP/3|Frames + QPACK|QUIC + TLS 1.3']],
      ['HTTP evolution', 'Semantics remained stable while transport evolved.', ['HTTP/0.9|Minimal message', 'HTTP/1.0|Status and fields', 'HTTP/1.1|Persistence and framing', 'HTTP/2|Multiplexed streams', 'HTTP/3|QUIC and loss isolation']],
      ['Anatomy of an HTTP transaction', 'Requests and responses are self-descriptive messages.', ['REQUEST|Start line or pseudo-fields|Fields|Optional content', 'RESPONSE|Status|Fields|Optional content|Trailers']],
      ['Semantic properties of methods', 'Safety and idempotency guide retries and policies.', ['GET|Safe|Idempotent', 'HEAD|Safe|Idempotent', 'POST|Unsafe|Non-idempotent', 'PUT|Unsafe|Idempotent', 'DELETE|Unsafe|Idempotent']],
      ['Conditional revalidation with ETag', 'Correct caching reduces traffic without confusing freshness and validity.', ['1. Client|GET + If-None-Match', '2. Cache or gateway|Compares the validator', '3. Origin|304 Not Modified or new representation']],
      ['HTTP/1.1 message delimitation', 'The recipient must determine exactly where content ends.', ['Content-Length|Declared size in bytes', 'Transfer-Encoding: chunked|Sized chunks and terminator', 'No body|HEAD, 1xx, 204, 304, and method rules']],
      ['Head-of-line in HTTP/1.1 pipelining', 'Responses retain connection order even when they finish out of order.', ['Client|R1  R2  R3', 'Server|Slow R1 blocks R2 and R3', 'Result|Queueing and accumulated latency']],
      ['Request smuggling from divergent framing', 'Intermediaries that disagree on boundaries may parse different messages.', ['Client|Ambiguous message', 'Edge proxy|Parses Content-Length', 'Backend|Parses chunked', 'Risk|Extra bytes become another request']],
      ['HTTP/2: one connection, many streams', 'Frames from different streams can be interleaved.', ['Stream 1|HEADERS  DATA  DATA', 'Stream 3|HEADERS  DATA', 'Stream 5|HEADERS  DATA  DATA', 'HTTP/2 connection|Interleaved frames']],
      ['Multiplexing and residual blocking', 'HTTP/2 removes message HOL, but one TCP loss affects every stream.', ['No loss|Streams advance together', 'TCP loss|All wait for retransmission', 'HTTP/3|Loss is isolated per stream']],
      ['HPACK and per-connection state', 'Repeated fields become indexes in shared tables.', ['Field block|Names and values', 'Static table|Standard entries', 'Dynamic table|Connection state', 'Compact representation|Indexes + literals']],
      ['Negotiation with ALPN', 'The application protocol is selected during the TLS handshake.', ['Client|Offers h2 and http/1.1', 'Server or gateway|Selects a supported protocol', 'Result|h2 or http/1.1']],
      ['Protocol stack comparison', 'Versions preserve HTTP while changing framing and transport.', ['HTTP/1.1|Text messages|Optional TLS|TCP|IP', 'HTTP/2|Frames + HPACK|TLS commonly used|TCP|IP', 'HTTP/3|Frames + QPACK|Integrated TLS 1.3|QUIC / UDP|IP']],
      ['QUIC: loss controlled per stream', 'A lost packet in one stream does not block available data in the others.', ['Stream A|Continuous delivery', 'Stream B|Local loss and retransmission', 'Stream C|Continuous delivery', 'QUIC|Per-stream control']],
      ['Connection IDs and path migration', 'The connection can survive an address change after validation.', ['Client|Wi-Fi → mobile network', 'Network|New IP and port', 'Path validation|Challenge and response', 'Server|Keeps the QUIC connection']],
      ['QPACK in HTTP/3', 'Table updates and field blocks use separate streams.', ['Encoder stream|Updates the table', 'Request streams|Reference entries', 'Decoder stream|Confirms processing', 'QPACK table|Synchronized state']],
      ['HTTP/3 discovery and fallback', 'The client tries QUIC and preserves availability with earlier versions.', ['1. DNS or initial connection|Discovers endpoint', '2. Alt-Svc or HTTPS/SVCB|Advertises HTTP/3', '3. QUIC attempt|UDP + TLS 1.3', '4. Fallback|HTTP/2 or HTTP/1.1']],
      ['Independent versions per hop', 'Each real connection negotiates its own HTTP version.', ['Application|HTTP/3', 'CDN / WAF|HTTP/2', 'API Gateway|HTTP/1.1', 'Mesh or proxy|HTTP/2', 'Backend|HTTP/1.1']],
      ['Initial troubleshooting tree', 'First classify whether a valid HTTP response existed.', ['Failure before HTTP|DNS, TCP, UDP, TLS, or QUIC', 'HTTP response|Identify the status author', 'Intermittent failure|Compare connection, stream, and instance', 'Unexpected version|Map every hop']],
    ]
  },
  es: {
    figures: [
      ['Semántica HTTP compartida', 'El mensaje conserva intención, destino, campos y contenido.', ['HTTP/1.1|Texto + CRLF|TCP', 'HTTP/2|Frames binarios + HPACK|TCP + TLS o texto claro', 'HTTP/3|Frames + QPACK|QUIC + TLS 1.3']],
      ['Evolución de HTTP', 'La semántica se mantuvo mientras evolucionó el transporte.', ['HTTP/0.9|Mensaje mínimo', 'HTTP/1.0|Status y campos', 'HTTP/1.1|Persistencia y framing', 'HTTP/2|Streams multiplexados', 'HTTP/3|QUIC y aislamiento de pérdidas']],
      ['Anatomía de una transacción HTTP', 'Solicitudes y respuestas son mensajes autodescriptivos.', ['SOLICITUD|Línea inicial o pseudocampos|Campos|Contenido opcional', 'RESPUESTA|Status|Campos|Contenido opcional|Trailers']],
      ['Propiedades semánticas de los métodos', 'Seguridad e idempotencia orientan retries y políticas.', ['GET|Seguro|Idempotente', 'HEAD|Seguro|Idempotente', 'POST|No seguro|No idempotente', 'PUT|No seguro|Idempotente', 'DELETE|No seguro|Idempotente']],
      ['Revalidación condicional con ETag', 'Un caché correcto reduce tráfico sin confundir frescura y validez.', ['1. Cliente|GET + If-None-Match', '2. Caché o gateway|Compara el validator', '3. Origen|304 Not Modified o nueva representación']],
      ['Delimitación de mensajes en HTTP/1.1', 'El receptor debe determinar exactamente dónde termina el contenido.', ['Content-Length|Tamaño declarado en bytes', 'Transfer-Encoding: chunked|Chunks con tamaño y terminador', 'Sin cuerpo|HEAD, 1xx, 204, 304 y reglas del método']],
      ['Head-of-line en pipelining HTTP/1.1', 'Las respuestas conservan el orden aunque terminen fuera de orden.', ['Cliente|R1  R2  R3', 'Servidor|R1 lenta bloquea R2 y R3', 'Resultado|Cola y latencia acumulada']],
      ['Request smuggling por framing divergente', 'Intermediarios que discrepan sobre límites pueden interpretar mensajes distintos.', ['Cliente|Mensaje ambiguo', 'Proxy de borde|Interpreta Content-Length', 'Backend|Interpreta chunked', 'Riesgo|Bytes extra se vuelven otra solicitud']],
      ['HTTP/2: una conexión, varios streams', 'Los frames de streams distintos se pueden intercalar.', ['Stream 1|HEADERS  DATA  DATA', 'Stream 3|HEADERS  DATA', 'Stream 5|HEADERS  DATA  DATA', 'Conexión HTTP/2|Frames intercalados']],
      ['Multiplexación y bloqueo residual', 'HTTP/2 elimina el HOL entre mensajes, pero una pérdida TCP afecta todos los streams.', ['Sin pérdida|Los streams avanzan juntos', 'Pérdida TCP|Todos esperan retransmisión', 'HTTP/3|Pérdida aislada por stream']],
      ['HPACK y estado por conexión', 'Los campos repetidos se vuelven índices en tablas compartidas.', ['Bloque de campos|Nombres y valores', 'Tabla estática|Entradas estándar', 'Tabla dinámica|Estado de la conexión', 'Representación compacta|Índices + literales']],
      ['Negociación con ALPN', 'El protocolo de aplicación se elige durante el handshake TLS.', ['Cliente|Ofrece h2 y http/1.1', 'Servidor o gateway|Elige un protocolo compatible', 'Resultado|h2 o http/1.1']],
      ['Comparación de pilas', 'Las versiones conservan HTTP, pero cambian framing y transporte.', ['HTTP/1.1|Mensajes de texto|TLS opcional|TCP|IP', 'HTTP/2|Frames + HPACK|TLS habitual|TCP|IP', 'HTTP/3|Frames + QPACK|TLS 1.3 integrado|QUIC / UDP|IP']],
      ['QUIC: pérdida controlada por stream', 'Un paquete perdido no bloquea los datos disponibles de los demás streams.', ['Stream A|Entrega continua', 'Stream B|Pérdida y retransmisión local', 'Stream C|Entrega continua', 'QUIC|Control por stream']],
      ['Connection IDs y migración de ruta', 'La conexión puede sobrevivir a un cambio de dirección tras validarlo.', ['Cliente|Wi-Fi → red móvil', 'Red|Nueva IP y puerto', 'Validación de ruta|Desafío y respuesta', 'Servidor|Mantiene la conexión QUIC']],
      ['QPACK en HTTP/3', 'Actualizaciones de tabla y bloques de campos usan streams separados.', ['Encoder stream|Actualiza la tabla', 'Request streams|Referencian entradas', 'Decoder stream|Confirma procesamiento', 'Tabla QPACK|Estado sincronizado']],
      ['Descubrimiento y fallback de HTTP/3', 'El cliente intenta QUIC y conserva disponibilidad con versiones anteriores.', ['1. DNS o conexión inicial|Descubre el endpoint', '2. Alt-Svc o HTTPS/SVCB|Anuncia HTTP/3', '3. Intento QUIC|UDP + TLS 1.3', '4. Fallback|HTTP/2 o HTTP/1.1']],
      ['Versiones independientes por salto', 'Cada conexión real negocia su propia versión HTTP.', ['Aplicación|HTTP/3', 'CDN / WAF|HTTP/2', 'API Gateway|HTTP/1.1', 'Mesh o proxy|HTTP/2', 'Backend|HTTP/1.1']],
      ['Árbol inicial de troubleshooting', 'Primero clasifique si hubo una respuesta HTTP válida.', ['Falla antes de HTTP|DNS, TCP, UDP, TLS o QUIC', 'Respuesta HTTP|Identifique el autor del status', 'Falla intermitente|Compare conexión, stream e instancia', 'Versión inesperada|Mapee cada salto']],
    ]
  }
};

const filenames = [
  'figure-01-shared-semantics.svg', 'figure-02-http-evolution.svg', 'figure-03-message-anatomy.svg',
  'figure-04-method-properties.svg', 'figure-05-etag-revalidation.svg', 'figure-06-http1-framing.svg',
  'figure-07-http1-hol.svg', 'figure-08-request-smuggling.svg', 'figure-09-http2-streams.svg',
  'figure-10-multiplexing-hol.svg', 'figure-11-hpack.svg', 'figure-12-alpn.svg',
  'figure-13-protocol-stacks.svg', 'figure-14-quic-loss-isolation.svg', 'figure-15-quic-migration.svg',
  'figure-16-qpack.svg', 'figure-17-http3-discovery.svg', 'figure-18-protocol-per-hop.svg',
  'figure-19-troubleshooting-tree.svg'
];

const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

function wrap(value, maxChars) {
  const words = value.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) { lines.push(current); current = word; }
    else current = next;
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function textBlock(value, x, y, width, fontSize = 22, color = '#dbeafe', weight = 500) {
  const lines = wrap(value, Math.max(12, Math.floor(width / (fontSize * 0.56))));
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="${fontSize}" font-weight="${weight}" text-anchor="middle">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? fontSize * 1.25 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function renderFigure(title, subtitle, rawCards, index) {
  const cards = rawCards.map((entry) => entry.split('|'));
  const count = cards.length;
  const gap = count >= 5 ? 18 : 28;
  const margin = 72;
  const cardWidth = (1400 - margin * 2 - gap * (count - 1)) / count;
  const cardY = 250;
  const cardH = 340;
  const palette = ['#38bdf8', '#818cf8', '#c084fc', '#22d3ee', '#60a5fa'];
  const cardsSvg = cards.map((lines, cardIndex) => {
    const x = margin + cardIndex * (cardWidth + gap);
    const color = palette[cardIndex % palette.length];
    const heading = lines[0];
    const details = lines.slice(1);
    const headingFont = count >= 5 ? 23 : 27;
    const headingMaxChars = Math.max(12, Math.floor((cardWidth - 42) / (headingFont * 0.56)));
    const headingLineCount = wrap(heading, headingMaxChars).length;
    const detailsStart = cardY + 104 + headingLineCount * headingFont * 1.2;
    const detailsEnd = cardY + cardH - 58;
    const detailGap = details.length > 1
      ? Math.min(58, Math.max(42, (detailsEnd - detailsStart) / (details.length - 1)))
      : 0;
    const arrow = cardIndex < count - 1
      ? `<path d="M ${x + cardWidth + 5} ${cardY + cardH / 2} H ${x + cardWidth + gap - 5}" stroke="#67e8f9" stroke-width="5" marker-end="url(#arrow)" opacity=".8"/>`
      : '';
    return `<g>
      <rect x="${x}" y="${cardY}" width="${cardWidth}" height="${cardH}" rx="24" fill="url(#card${cardIndex % 3})" stroke="${color}" stroke-width="2.5"/>
      <rect x="${x + 18}" y="${cardY + 18}" width="${cardWidth - 36}" height="8" rx="4" fill="${color}" opacity=".9"/>
      ${textBlock(heading, x + cardWidth / 2, cardY + 78, cardWidth - 42, headingFont, '#f8fafc', 750)}
      ${details.map((detail, detailIndex) => textBlock(detail, x + cardWidth / 2, detailsStart + detailIndex * detailGap, cardWidth - 42, count >= 5 ? 18 : 21, '#cbd5e1', 500)).join('')}
      ${details.length < 4 ? `<circle cx="${x + cardWidth / 2}" cy="${cardY + cardH - 30}" r="9" fill="${color}" filter="url(#glow)"/>` : ''}
      ${arrow}
    </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="780" viewBox="0 0 1400 780" role="img" aria-labelledby="title desc">
    <title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(subtitle)}</desc>
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".55" stop-color="#071426"/><stop offset="1" stop-color="#11104a"/></linearGradient>
      <linearGradient id="card0" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b2442"/><stop offset="1" stop-color="#101a3a"/></linearGradient>
      <linearGradient id="card1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111c44"/><stop offset="1" stop-color="#23154a"/></linearGradient>
      <linearGradient id="card2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#12243d"/><stop offset="1" stop-color="#151b35"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#67e8f9"/></marker>
      <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#1d4ed8" stroke-width="1" opacity=".12"/></pattern>
    </defs>
    <rect width="1400" height="780" rx="28" fill="url(#bg)"/><rect width="1400" height="780" rx="28" fill="url(#grid)"/>
    <circle cx="165" cy="115" r="115" fill="#0ea5e9" opacity=".08"/><circle cx="1240" cy="650" r="170" fill="#7c3aed" opacity=".09"/>
    ${textBlock(title, 700, 82, 1220, 36, '#f8fafc', 800)}
    ${textBlock(subtitle, 700, 145, 1180, 22, '#93c5fd', 500)}
    ${cardsSvg}
    <text x="70" y="722" fill="#64748b" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="18">FAAC · ${String(index + 1).padStart(2, '0')}</text>
    <path d="M70 678 H1330" stroke="#334155" stroke-width="1"/>
  </svg>`;
}

for (const [locale, data] of Object.entries(locales)) {
  const target = join(root, locale);
  mkdirSync(target, { recursive: true });
  data.figures.forEach(([title, subtitle, cards], index) => {
    writeFileSync(join(target, filenames[index]), renderFigure(title, subtitle, cards, index), 'utf8');
  });
}

console.log(`Generated ${filenames.length * Object.keys(locales).length} localized SVG diagrams.`);
