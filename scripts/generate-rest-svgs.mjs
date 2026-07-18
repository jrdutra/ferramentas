import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/rest-architecture/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const dictionaries = {
  pt: {
    overview: ['Caminho REST de uma operação corporativa', 'Consumidor', 'representação + intenção', 'API Gateway', 'segurança + políticas', 'Recurso REST', 'URI + método HTTP', 'Domínio', 'regras + estado', 'Persistência', 'dados + eventos'],
    f1: ['As restrições que formam o estilo REST', 'REST', 'Cliente-servidor', 'separação de responsabilidades', 'Stateless', 'contexto em cada requisição', 'Cache', 'reuso controlado de respostas', 'Interface uniforme', 'semântica compartilhada', 'Sistema em camadas', 'intermediários transparentes', 'Código sob demanda', 'restrição opcional'],
    f2: ['Recurso, estado e representações', 'Recurso', 'conta 123 · identidade conceitual', 'Estado atual', 'saldo · titular · situação', 'JSON', 'application/json', 'HTML', 'text/html', 'A URI identifica o recurso; cada representação transporta uma visão do estado.'],
    f3: ['Leitura condicional e controle de concorrência', '1. GET /contas/123', 'Resposta: ETag "v7"', '2. Alteração local', 'cliente edita a representação', '3. PUT + If-Match', 'If-Match: "v7"', 'Sucesso', '204/200 + novo ETag', 'Conflito', '412 Precondition Failed'],
    f4: ['REST em uma plataforma de APIs corporativas', 'Consumidor', 'método · URI · headers', 'Borda', 'WAF · TLS · limites', 'API Gateway', 'auth · quota · routing', 'Serviço REST', 'domínio + contrato', 'Dependências', 'DB · filas · APIs', 'Correlação ponta a ponta', 'request ID · trace context · status · latência · origem do erro'],
  },
  en: {
    overview: ['REST path of an enterprise operation', 'Consumer', 'representation + intent', 'API Gateway', 'security + policies', 'REST Resource', 'URI + HTTP method', 'Domain', 'rules + state', 'Persistence', 'data + events'],
    f1: ['Constraints that form the REST style', 'REST', 'Client-server', 'separation of concerns', 'Stateless', 'context in every request', 'Cache', 'controlled response reuse', 'Uniform interface', 'shared semantics', 'Layered system', 'transparent intermediaries', 'Code on demand', 'optional constraint'],
    f2: ['Resource, state, and representations', 'Resource', 'account 123 · conceptual identity', 'Current state', 'balance · holder · status', 'JSON', 'application/json', 'HTML', 'text/html', 'The URI identifies the resource; each representation carries a view of its state.'],
    f3: ['Conditional read and concurrency control', '1. GET /accounts/123', 'Response: ETag "v7"', '2. Local change', 'client edits the representation', '3. PUT + If-Match', 'If-Match: "v7"', 'Success', '204/200 + new ETag', 'Conflict', '412 Precondition Failed'],
    f4: ['REST in an enterprise API platform', 'Consumer', 'method · URI · headers', 'Edge', 'WAF · TLS · limits', 'API Gateway', 'auth · quota · routing', 'REST Service', 'domain + contract', 'Dependencies', 'DB · queues · APIs', 'End-to-end correlation', 'request ID · trace context · status · latency · error origin'],
  },
  es: {
    overview: ['Ruta REST de una operación corporativa', 'Consumidor', 'representación + intención', 'API Gateway', 'seguridad + políticas', 'Recurso REST', 'URI + método HTTP', 'Dominio', 'reglas + estado', 'Persistencia', 'datos + eventos'],
    f1: ['Restricciones que forman el estilo REST', 'REST', 'Cliente-servidor', 'separación de responsabilidades', 'Stateless', 'contexto en cada solicitud', 'Cache', 'reutilización controlada', 'Interfaz uniforme', 'semántica compartida', 'Sistema en capas', 'intermediarios transparentes', 'Código bajo demanda', 'restricción opcional'],
    f2: ['Recurso, estado y representaciones', 'Recurso', 'cuenta 123 · identidad conceptual', 'Estado actual', 'saldo · titular · situación', 'JSON', 'application/json', 'HTML', 'text/html', 'La URI identifica el recurso; cada representación transporta una vista de su estado.'],
    f3: ['Lectura condicional y control de concurrencia', '1. GET /cuentas/123', 'Respuesta: ETag "v7"', '2. Cambio local', 'el cliente edita la representación', '3. PUT + If-Match', 'If-Match: "v7"', 'Éxito', '204/200 + nuevo ETag', 'Conflicto', '412 Precondition Failed'],
    f4: ['REST en una plataforma de APIs corporativas', 'Consumidor', 'método · URI · headers', 'Borde', 'WAF · TLS · límites', 'API Gateway', 'auth · cuota · routing', 'Servicio REST', 'dominio + contrato', 'Dependencias', 'DB · colas · APIs', 'Correlación de extremo a extremo', 'request ID · trace context · status · latencia · origen del error'],
  },
};

const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const defs = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="#061126"/><stop offset="1" stop-color="#15163d"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#45ddff"/></marker></defs>`;

function frame(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}">${defs}<rect width="1200" height="620" rx="34" fill="url(#bg)"/><path d="M42 102H1158" stroke="#274370" stroke-width="2"/><text x="60" y="69" fill="#f4f8ff" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700">${esc(title)}</text>${body}</svg>`;
}

function node(x, y, w, h, title, detail = '', color = '#21d4fd', size = 22) {
  const detailSize = detail ? Math.max(11, Math.min(17, Math.floor((w - 24) / (detail.length * 0.58)))) : 17;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="19" fill="#0a1c3b" stroke="${color}" stroke-width="3"/><rect x="${x + 9}" y="${y + 9}" width="${w - 18}" height="${h - 18}" rx="13" fill="#112653" opacity=".75"/><text x="${x + w / 2}" y="${y + h / 2 - (detail ? 8 : -7)}" text-anchor="middle" fill="#f1f7ff" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="700">${esc(title)}</text>${detail ? `<text x="${x + w / 2}" y="${y + h / 2 + 25}" text-anchor="middle" fill="#b9d8f4" font-family="Inter,Arial,sans-serif" font-size="${detailSize}">${esc(detail)}</text>` : ''}</g>`;
}
function arrow(x1, y1, x2, y2) { return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#45ddff" stroke-width="5" fill="none" marker-end="url(#arrow)" filter="url(#glow)"/>`; }
function pill(x, y, w, label, color = '#34d399') { return `<g><rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="#102a42" stroke="${color}" stroke-width="2"/><text x="${x + w / 2}" y="${y + 27}" text-anchor="middle" fill="#eafff8" font-family="Inter,Arial,sans-serif" font-size="17" font-weight="600">${esc(label)}</text></g>`; }

function overview(l) {
  const [title, a, ad, b, bd, c, cd, d, dd, e, ed] = l;
  return frame(title, node(25, 250, 200, 120, a, ad) + node(265, 250, 210, 120, b, bd, '#a855f7') + node(515, 230, 210, 160, c, cd, '#21d4fd') + node(765, 250, 180, 120, d, dd, '#34d399') + node(985, 250, 190, 120, e, ed, '#fbbf24') + arrow(225,310,265,310) + arrow(475,310,515,310) + arrow(725,310,765,310) + arrow(945,310,985,310) + `<path d="M605 164l15-25 15 25 29 6-20 22 4 29-28-12-27 12 3-29-20-22z" fill="#21d4fd" opacity=".9"/>`);
}

function constraints(l) {
  const [title, center, ...rest] = l; let body = `<circle cx="600" cy="332" r="90" fill="#132c5b" stroke="#21d4fd" stroke-width="4"/><text x="600" y="344" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="38" font-weight="800">${center}</text>`;
  const points = [[60,145],[410,125],[805,145],[60,420],[410,445],[805,420]];
  for (let i=0;i<6;i++) { const [x,y]=points[i]; body += node(x,y,335,100,rest[i*2],rest[i*2+1],i%2?'#a855f7':'#34d399',19); body += arrow(x+(x<600?335:0),y+50,x<600?510:690,332); }
  return frame(title, body);
}

function resource(l) {
  const [title,r,rd,s,sd,j,jd,h,hd,note] = l;
  return frame(title, node(70,230,240,145,r,rd,'#21d4fd') + node(480,230,240,145,s,sd,'#34d399') + node(900,145,230,115,j,jd,'#a855f7') + node(900,360,230,115,h,hd,'#fbbf24') + arrow(310,302,480,302) + arrow(720,275,900,205) + arrow(720,330,900,417) + `<text x="600" y="545" text-anchor="middle" fill="#cfe8ff" font-family="Inter,Arial,sans-serif" font-size="19">${esc(note)}</text>`);
}

function concurrency(l) {
  const [title,a,ad,b,bd,c,cd,ok,okd,fail,faild] = l;
  return frame(title, node(35,170,300,115,a,ad) + node(450,170,300,115,b,bd,'#a855f7') + node(865,170,300,115,c,cd,'#21d4fd') + arrow(335,227,450,227) + arrow(750,227,865,227) + `<path d="M1015 285V355H380" stroke="#45ddff" stroke-width="5" fill="none"/>` + node(210,405,340,105,ok,okd,'#34d399') + node(650,405,340,105,fail,faild,'#f87171') + arrow(380,355,380,405) + arrow(820,355,820,405));
}

function platform(l) {
  const [title,...v] = l; let body=''; const xs=[25,255,485,730,955]; const colors=['#21d4fd','#a855f7','#21d4fd','#34d399','#fbbf24'];
  for(let i=0;i<5;i++){body+=node(xs[i],230,200,125,v[i*2],v[i*2+1],colors[i],19);if(i<4)body+=arrow(xs[i]+200,292,xs[i+1],292);} body+=pill(355,430,490,v[10]); body+=`<text x="600" y="515" text-anchor="middle" fill="#cfe8ff" font-family="Inter,Arial,sans-serif" font-size="18">${esc(v[11])}</text>`; return frame(title,body);
}

const builders = {
  'overview.svg': (d) => overview(d.overview),
  'figure-01.svg': (d) => constraints(d.f1),
  'figure-02.svg': (d) => resource(d.f2),
  'figure-03.svg': (d) => concurrency(d.f3),
  'figure-04.svg': (d) => platform(d.f4),
};

for (const [locale, dictionary] of Object.entries(dictionaries)) {
  const dir = join(root, locale);
  mkdirSync(dir, { recursive: true });
  for (const [name, builder] of Object.entries(builders)) writeFileSync(join(dir, name), builder(dictionary), 'utf8');
}
console.log(`Generated ${Object.keys(builders).length * Object.keys(dictionaries).length} localized REST SVGs.`);
