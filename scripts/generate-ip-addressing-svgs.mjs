import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputRoot = fileURLToPath(new URL('../src/assets/learn/ip-addressing/', import.meta.url));

const locales = {
  pt: {
    aria: 'Diagrama educacional sobre endereçamento IP',
    name: 'Nome', dns: 'Resolução DNS', ip: 'Endereço IP', route: 'Decisão de rota', link: 'Endereço de enlace', neighbor: 'Resolução de vizinho',
    layers: 'Cada etapa responde a uma pergunta diferente', prefix: 'Prefixo de rede', host: 'Bits de host', mask: 'Máscara', address: 'Endereço', block: 'Tamanho do bloco', network: 'Rede', broadcast: 'Broadcast', hosts: 'Faixa de hosts',
    privateClient: 'Cliente privado', translator: 'NAT / PAT', publicOrigin: 'Origem pública observada', api: 'API pública', trust: 'X-Forwarded-For só é confiável quando construído por proxies conhecidos',
    destination: 'Destino', matchingRoutes: 'Rotas correspondentes', winner: 'rota escolhida', full: 'Forma completa', canonical: 'Forma canônica', url: 'Em URLs, use colchetes antes da porta',
    loopback: 'Loopback', linkLocal: 'Link-local', ula: 'Uso interno', global: 'Global unicast', multicast: 'Multicast', scope: 'Escopo',
    hostNode: 'Host', router: 'Roteador', solicitation: 'Solicita anúncio', advertisement: 'Anuncia prefixo e rota padrão', dad: 'Verifica endereço duplicado', discovery: 'Resolve endereço de enlace',
    client: 'Cliente dual stack', dnsRecords: 'DNS publica A e AAAA', ipv4Path: 'Caminho IPv4', ipv6Path: 'Caminho IPv6', selection: 'Happy Eyeballs seleciona o caminho saudável',
    consumer: 'Consumidor', waf: 'WAF / Balanceador', gateway: 'API Gateway', backend: 'Backend', inbound: 'Endereço de entrada', outbound: 'Origem de saída / SNAT', observed: 'Endereço observado', forwardingChain: 'socket IP + cadeia de encaminhamento confiável', chainTitle: 'Cadeia de endereços em uma API', chain: 'Cada salto pode resolver, rotear e traduzir de forma independente'
  },
  en: {
    aria: 'Educational diagram about IP addressing',
    name: 'Name', dns: 'DNS resolution', ip: 'IP address', route: 'Route decision', link: 'Link-layer address', neighbor: 'Neighbor resolution',
    layers: 'Each stage answers a different question', prefix: 'Network prefix', host: 'Host bits', mask: 'Mask', address: 'Address', block: 'Block size', network: 'Network', broadcast: 'Broadcast', hosts: 'Host range',
    privateClient: 'Private client', translator: 'NAT / PAT', publicOrigin: 'Observed public source', api: 'Public API', trust: 'X-Forwarded-For is trustworthy only when built by known proxies',
    destination: 'Destination', matchingRoutes: 'Matching routes', winner: 'selected route', full: 'Full form', canonical: 'Canonical form', url: 'In URLs, use brackets before the port',
    loopback: 'Loopback', linkLocal: 'Link-local', ula: 'Internal use', global: 'Global unicast', multicast: 'Multicast', scope: 'Scope',
    hostNode: 'Host', router: 'Router', solicitation: 'Requests an advertisement', advertisement: 'Announces prefix and default route', dad: 'Checks for a duplicate address', discovery: 'Resolves the link-layer address',
    client: 'Dual-stack client', dnsRecords: 'DNS publishes A and AAAA', ipv4Path: 'IPv4 path', ipv6Path: 'IPv6 path', selection: 'Happy Eyeballs selects the healthy path',
    consumer: 'Consumer', waf: 'WAF / Load Balancer', gateway: 'API Gateway', backend: 'Backend', inbound: 'Inbound address', outbound: 'Outbound source / SNAT', observed: 'Observed address', forwardingChain: 'IP socket + trusted forwarding chain', chainTitle: 'Address chain in an API', chain: 'Each hop can resolve, route, and translate independently'
  },
  es: {
    aria: 'Diagrama educativo sobre direccionamiento IP',
    name: 'Nombre', dns: 'Resolución DNS', ip: 'Dirección IP', route: 'Decisión de ruta', link: 'Dirección de enlace', neighbor: 'Resolución de vecino',
    layers: 'Cada etapa responde a una pregunta diferente', prefix: 'Prefijo de red', host: 'Bits de host', mask: 'Máscara', address: 'Dirección', block: 'Tamaño del bloque', network: 'Red', broadcast: 'Broadcast', hosts: 'Rango de hosts',
    privateClient: 'Cliente privado', translator: 'NAT / PAT', publicOrigin: 'Origen público observado', api: 'API pública', trust: 'X-Forwarded-For solo es confiable cuando lo construyen proxies conocidos',
    destination: 'Destino', matchingRoutes: 'Rutas coincidentes', winner: 'ruta seleccionada', full: 'Forma completa', canonical: 'Forma canónica', url: 'En URLs, use corchetes antes del puerto',
    loopback: 'Loopback', linkLocal: 'Link-local', ula: 'Uso interno', global: 'Global unicast', multicast: 'Multicast', scope: 'Ámbito',
    hostNode: 'Host', router: 'Router', solicitation: 'Solicita un anuncio', advertisement: 'Anuncia prefijo y ruta predeterminada', dad: 'Comprueba una dirección duplicada', discovery: 'Resuelve la dirección de enlace',
    client: 'Cliente dual stack', dnsRecords: 'DNS publica A y AAAA', ipv4Path: 'Ruta IPv4', ipv6Path: 'Ruta IPv6', selection: 'Happy Eyeballs selecciona la ruta saludable',
    consumer: 'Consumidor', waf: 'WAF / Balanceador', gateway: 'API Gateway', backend: 'Backend', inbound: 'Dirección de entrada', outbound: 'Origen de salida / SNAT', observed: 'Dirección observada', forwardingChain: 'socket IP + cadena de reenvío confiable', chainTitle: 'Cadena de direcciones en una API', chain: 'Cada salto puede resolver, enrutar y traducir de forma independiente'
  }
};

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function text(x, y, value, className = 'label', anchor = 'middle') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function lines(x, y, values, className = 'small', anchor = 'middle', gap = 27) {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${values.map((value, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : gap}">${esc(value)}</tspan>`).join('')}</text>`;
}

function card(x, y, width, height, title, value, accent = 'cyan') {
  return `<g class="card ${accent}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="22"/>${text(x + 24, y + 38, title, 'eyebrow', 'start')}${text(x + width / 2, y + 88, value, 'value')}</g>`;
}

function arrow(x1, y1, x2, y2, label = '') {
  return `<g><path d="M ${x1} ${y1} L ${x2} ${y2}" class="arrow" marker-end="url(#arrow)"/>${label ? text((x1 + x2) / 2, (y1 + y2) / 2 - 16, label, 'small') : ''}</g>`;
}

function svg(t, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 650" role="img" aria-label="${esc(`${t.aria}: ${title}`)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071a34"/><stop offset="1" stop-color="#030817"/></linearGradient>
    <linearGradient id="cyan" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00ffd1"/><stop offset="1" stop-color="#009cff"/></linearGradient>
    <linearGradient id="violet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9c5bff"/><stop offset="1" stop-color="#ff2db2"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#55dfff"/></marker>
    <style>
      text{font-family:Inter,Segoe UI,Arial,sans-serif;fill:#dcecff}.title{font-size:30px;font-weight:800}.label{font-size:24px;font-weight:700}.value{font-size:25px;font-weight:800}.small{font-size:20px;font-weight:600;fill:#a9c3d8}.eyebrow{font-size:17px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;fill:#7eeaff}.mono{font-family:Cascadia Code,Consolas,monospace;font-size:22px;font-weight:700}.card rect{fill:#07172d;stroke:#2e5d88;stroke-width:2}.card.cyan rect{stroke:#00d0ff}.card.violet rect{stroke:#a55dff}.card.green rect{stroke:#00ffd1}.arrow{fill:none;stroke:#55dfff;stroke-width:4}.muted{fill:#6f8ba5}.bright{fill:#00ffd1}.violetText{fill:#c18cff}.pill{fill:#081b35;stroke:#3c78a8;stroke-width:2}.highlight{fill:#0b2840;stroke:#00ffd1;stroke-width:3;filter:url(#glow)}
    </style>
  </defs>
  <rect width="1200" height="650" rx="28" fill="url(#bg)"/>
  <path d="M0 520 C280 430 420 650 710 535 S1040 460 1200 535" fill="none" stroke="#5534a5" stroke-opacity=".25" stroke-width="3"/>
  ${text(56, 58, title, 'title', 'start')}
  ${body}
  </svg>`;
}

const figures = [
  ['figure-01-name-address-route.svg', (t) => svg(t, `${t.name} → ${t.ip} → ${t.link}`,
    card(70, 190, 280, 145, t.name, 'api.empresa.com') + card(460, 190, 280, 145, t.ip, '10.20.30.40', 'violet') + card(850, 190, 280, 145, t.link, '00:1A:2B:3C:4D:5E', 'green') +
    arrow(350, 262, 450, 262, t.dns) + arrow(740, 262, 840, 262, t.neighbor) +
    card(365, 415, 470, 105, t.route, '10.20.30.0/24 → eth0', 'violet') + text(600, 575, t.layers, 'small'))],

  ['figure-02-ipv4-binary-prefix.svg', (t) => {
    const octets = [['192','11000000'],['168','10101000'],['10','00001010'],['77','01001101']];
    const boxes = octets.map(([decimal,binary], i) => card(80 + i * 270, 155, 230, 135, `${t.address} ${i + 1}`, decimal, i === 3 ? 'violet' : 'cyan') + text(195 + i * 270, 335, binary, 'mono')).join('');
    return svg(t, 'IPv4 · 192.168.10.77/26', boxes +
      `<rect x="80" y="390" width="945" height="70" rx="18" class="highlight"/><rect x="1025" y="390" width="95" height="70" rx="18" class="card"/>` +
      text(552, 434, `${t.prefix}: 26 bits`, 'label') + text(1072, 434, `${t.host}: 6`, 'small') +
      text(600, 535, `${t.mask}: 255.255.255.192`, 'mono'));
  }],

  ['figure-03-ipv4-subnet-calculation.svg', (t) => svg(t, '192.168.10.77/26',
    card(65, 130, 320, 120, t.address, '192.168.10.77') + card(440, 130, 320, 120, t.mask, '255.255.255.192', 'violet') + card(815, 130, 320, 120, t.block, '64', 'green') +
    card(65, 335, 320, 120, t.network, '192.168.10.64', 'green') + card(440, 335, 320, 120, t.broadcast, '192.168.10.127', 'violet') + card(815, 335, 320, 120, t.hosts, '192.168.10.65 – 126') +
    arrow(385, 190, 430, 190) + arrow(760, 190, 805, 190) + text(600, 555, '01001101 AND 11000000 = 01000000', 'mono'))],

  ['figure-04-nat-observed-address.svg', (t) => svg(t, 'NAT / PAT',
    card(55, 185, 285, 145, t.privateClient, '10.20.30.40:53120') + card(455, 185, 290, 145, t.translator, '203.0.113.10:62001', 'violet') + card(860, 185, 285, 145, t.api, '198.51.100.25:443', 'green') +
    arrow(340, 258, 445, 258) + arrow(745, 258, 850, 258) + text(600, 395, `${t.publicOrigin}: 203.0.113.10`, 'label') +
    `<rect x="120" y="455" width="960" height="90" rx="20" class="pill"/>` + lines(600, 492, [t.trust], 'small'))],

  ['figure-05-longest-prefix-match.svg', (t) => {
    const routes = [['0.0.0.0/0','Internet'],['10.0.0.0/8','Core'],['10.20.0.0/16','Region'],['10.20.30.0/24',t.winner]];
    return svg(t, `${t.destination}: 10.20.30.25`, text(105, 130, t.matchingRoutes, 'eyebrow', 'start') + routes.map(([prefix,label],i) =>
      `<g><rect x="100" y="${155+i*88}" width="1000" height="64" rx="16" class="${i===3?'highlight':'pill'}"/>${text(135, 195+i*88, prefix, 'mono', 'start')}${text(1035, 195+i*88, label, i===3?'label bright':'small', 'end')}</g>`).join('') +
      arrow(600, 515, 600, 585) + text(600, 620, '/24 > /16 > /8 > /0', 'mono'));
  }],

  ['figure-06-ipv6-canonical-form.svg', (t) => svg(t, 'IPv6',
    text(95, 150, t.full, 'eyebrow', 'start') + card(90, 175, 1020, 110, '', '2001:0db8:0000:0000:021a:2bff:fe3c:4d5e', 'violet') +
    arrow(600, 300, 600, 365) + text(95, 405, t.canonical, 'eyebrow', 'start') + card(90, 430, 1020, 110, '', '2001:db8::21a:2bff:fe3c:4d5e', 'green') +
    text(600, 600, `${t.url}: https://[2001:db8::25]:8443/`, 'small'))],

  ['figure-07-ipv6-address-scopes.svg', (t) => {
    const scopes = [['::1/128',t.loopback,'#8a5cff'],['fe80::/10',t.linkLocal,'#00d0ff'],['fd00::/8',t.ula,'#00ffd1'],['2000::/3',t.global,'#ff2db2'],['ff00::/8',t.multicast,'#ffbf47']];
    return svg(t, `IPv6 · ${t.scope}`, scopes.map(([prefix,label,color],i) =>
      `<g><rect x="90" y="${125+i*91}" width="1020" height="68" rx="18" fill="${color}" fill-opacity=".10" stroke="${color}" stroke-width="2"/>${text(130, 168+i*91,prefix,'mono','start')}${text(1060,168+i*91,label,'label','end')}</g>`).join(''));
  }],

  ['figure-08-ipv6-neighbor-discovery.svg', (t) => svg(t, 'IPv6 Neighbor Discovery',
    card(70, 150, 260, 105, t.hostNode, 'fe80::25') + card(870, 150, 260, 105, t.router, 'fe80::1', 'violet') +
    arrow(330, 205, 860, 205, `RS · ${t.solicitation}`) + arrow(860, 300, 340, 300, `RA · ${t.advertisement}`) +
    arrow(330, 395, 860, 395, `NS · DAD · ${t.dad}`) + arrow(860, 490, 340, 490, `NA · ${t.discovery}`) +
    text(600, 580, 'ICMPv6 · RS · RA · NS · NA', 'mono'))],

  ['figure-09-dual-stack.svg', (t) => svg(t, 'Dual stack',
    card(55, 220, 250, 135, t.client, 'IPv4 + IPv6') + card(475, 110, 250, 115, t.dnsRecords, 'A · AAAA', 'violet') + card(895, 220, 250, 135, t.api, 'IPv4 + IPv6', 'green') +
    arrow(305, 270, 465, 185, 'DNS') + arrow(725, 170, 885, 260, t.ipv6Path) + arrow(305, 330, 885, 330, t.ipv4Path) +
    `<rect x="205" y="455" width="790" height="95" rx="22" class="highlight"/>` + text(600, 512, t.selection, 'label'))],

  ['figure-10-api-addressing-chain.svg', (t) => {
    const nodes = [[40,t.consumer,'192.0.2.25'],[330,t.waf,'203.0.113.20'],[620,t.gateway,'10.20.4.10'],[910,t.backend,'10.30.8.25']];
    return svg(t, t.chainTitle, nodes.map(([x,label,value],i) => card(x, 180, 250, 125, label, value, i%2?'violet':'cyan')).join('') +
      arrow(290, 242, 320, 242) + arrow(580, 242, 610, 242) + arrow(870, 242, 900, 242) +
      text(455, 375, t.inbound, 'small') + text(745, 375, t.outbound, 'small') +
      `<rect x="100" y="440" width="1000" height="105" rx="22" class="pill"/>` +
      lines(600, 470, [t.chain, `DNS → ${t.route} → NAT`, `${t.observed}: ${t.forwardingChain}`], 'small'));
  }]
];

for (const [locale, translations] of Object.entries(locales)) {
  const directory = join(outputRoot, locale);
  await mkdir(directory, { recursive: true });
  for (const [filename, render] of figures) {
    await writeFile(join(directory, filename), render(translations), 'utf8');
  }
}

console.log(`Generated ${figures.length * Object.keys(locales).length} localized SVG diagrams.`);
