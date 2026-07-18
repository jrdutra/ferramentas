import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/graphql-grpc-websocket');
const c = { bg: '#070d22', panel: '#0d1732', line: '#28416e', cyan: '#27d8ff', aqua: '#35f2c1', violet: '#bc78ff', amber: '#ffbd59', text: '#eff7ff', muted: '#a9bbd1' };
const copy = {
  pt: {
    overview: 'Três modelos, três semânticas complementares', graph: ['GraphQL', 'Consulta sob demanda', 'schema + resolvers'], grpc: ['gRPC', 'RPC tipado', 'Protobuf + streaming'], ws: ['WebSocket', 'Canal persistente', 'eventos full-duplex'], center: 'Arquitetura corporativa', principle: 'Modelo de dados • acoplamento • latência • streaming • governança',
    f1: 'Execução GraphQL: um documento, vários resolvedores', client: 'Cliente', operation: 'query ou mutation', server: 'GraphQL Server', engine: 'parser • validação • execução', resolvers: [['Resolver usuário', 'perfil'], ['Resolver pedidos', 'histórico'], ['Resolver saldo', 'core financeiro']], result: 'Resposta com a forma solicitada',
    f2: 'Padrões de chamada do gRPC', unary: ['Unary', '1 request', '1 response'], serverStream: ['Server streaming', '1 request', 'N responses'], clientStream: ['Client streaming', 'N requests', '1 response'], bidi: ['Bidirectional', 'N requests', 'N responses'], contract: 'Contrato .proto • HTTP/2 • deadlines • status • cancelamento',
    f3: 'Fluxo operacional de WebSocket', stages: [['HTTP Upgrade', 'handshake'], ['Conexão aberta', 'canal persistente'], ['Frames / eventos', 'full-duplex'], ['Ping / Pong', 'liveness'], ['Close handshake', 'encerramento']], note: 'Após o upgrade, a comunicação deixa o modelo request/response e troca frames nos dois sentidos.',
    f4: 'Comparar tecnologia por semântica, não por moda', flexible: ['Dados flexíveis', 'GraphQL', 'BFFs • agregação • múltiplos clientes'], typed: ['RPC tipado', 'gRPC', 'microsserviços • baixa latência • streaming'], realtime: ['Eventos em tempo real', 'WebSocket', 'push • chat • painéis ao vivo'], hybrid: 'Arquitetura híbrida', hybridNote: 'REST/OpenAPI na borda • gRPC entre serviços • WebSocket para push'
  },
  en: {
    overview: 'Three models, three complementary semantics', graph: ['GraphQL', 'On-demand queries', 'schema + resolvers'], grpc: ['gRPC', 'Typed RPC', 'Protobuf + streaming'], ws: ['WebSocket', 'Persistent channel', 'full-duplex events'], center: 'Enterprise architecture', principle: 'Data model • coupling • latency • streaming • governance',
    f1: 'GraphQL execution: one document, multiple resolvers', client: 'Client', operation: 'query or mutation', server: 'GraphQL Server', engine: 'parser • validation • execution', resolvers: [['User resolver', 'profile'], ['Orders resolver', 'history'], ['Balance resolver', 'financial core']], result: 'Response shaped as requested',
    f2: 'gRPC call patterns', unary: ['Unary', '1 request', '1 response'], serverStream: ['Server streaming', '1 request', 'N responses'], clientStream: ['Client streaming', 'N requests', '1 response'], bidi: ['Bidirectional', 'N requests', 'N responses'], contract: '.proto contract • HTTP/2 • deadlines • status • cancellation',
    f3: 'WebSocket operational flow', stages: [['HTTP Upgrade', 'handshake'], ['Open connection', 'persistent channel'], ['Frames / events', 'full-duplex'], ['Ping / Pong', 'liveness'], ['Close handshake', 'termination']], note: 'After the upgrade, communication leaves the request/response model and exchanges frames in both directions.',
    f4: 'Compare technologies by semantics, not by fashion', flexible: ['Flexible data', 'GraphQL', 'BFFs • aggregation • multiple clients'], typed: ['Typed RPC', 'gRPC', 'microservices • low latency • streaming'], realtime: ['Real-time events', 'WebSocket', 'push • chat • live dashboards'], hybrid: 'Hybrid architecture', hybridNote: 'REST/OpenAPI at the edge • gRPC between services • WebSocket for push'
  },
  es: {
    overview: 'Tres modelos, tres semánticas complementarias', graph: ['GraphQL', 'Consultas bajo demanda', 'schema + resolvers'], grpc: ['gRPC', 'RPC tipado', 'Protobuf + streaming'], ws: ['WebSocket', 'Canal persistente', 'eventos full-duplex'], center: 'Arquitectura corporativa', principle: 'Modelo de datos • acoplamiento • latencia • streaming • gobernanza',
    f1: 'Ejecución GraphQL: un documento, varios resolvers', client: 'Cliente', operation: 'query o mutation', server: 'GraphQL Server', engine: 'parser • validación • ejecución', resolvers: [['Resolver de usuario', 'perfil'], ['Resolver de pedidos', 'historial'], ['Resolver de saldo', 'core financiero']], result: 'Respuesta con la forma solicitada',
    f2: 'Patrones de llamada de gRPC', unary: ['Unary', '1 request', '1 response'], serverStream: ['Server streaming', '1 request', 'N responses'], clientStream: ['Client streaming', 'N requests', '1 response'], bidi: ['Bidirectional', 'N requests', 'N responses'], contract: 'Contrato .proto • HTTP/2 • deadlines • status • cancelación',
    f3: 'Flujo operativo de WebSocket', stages: [['HTTP Upgrade', 'handshake'], ['Conexión abierta', 'canal persistente'], ['Frames / eventos', 'full-duplex'], ['Ping / Pong', 'liveness'], ['Close handshake', 'cierre']], note: 'Después del upgrade, la comunicación abandona el modelo request/response e intercambia frames en ambos sentidos.',
    f4: 'Comparar tecnologías por semántica, no por moda', flexible: ['Datos flexibles', 'GraphQL', 'BFFs • agregación • múltiples clientes'], typed: ['RPC tipado', 'gRPC', 'microservicios • baja latencia • streaming'], realtime: ['Eventos en tiempo real', 'WebSocket', 'push • chat • paneles en vivo'], hybrid: 'Arquitectura híbrida', hybridNote: 'REST/OpenAPI en el borde • gRPC entre servicios • WebSocket para push'
  }
};

const esc = v => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const base = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${c.violet}"/><stop offset=".5" stop-color="${c.aqua}"/><stop offset="1" stop-color="${c.amber}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs><rect width="1200" height="620" rx="28" fill="${c.bg}"/><path d="M0 95H1200M0 540H1200" stroke="${c.line}" opacity=".35"/><text x="60" y="68" fill="${c.text}" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700">${esc(title)}</text>${body}</svg>`;
const card = (x,y,w,h,stroke=c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${c.panel}" stroke="${stroke}" stroke-width="2"/>`;
const text = (v,x,y,size=20,color=c.text,weight=600,anchor='middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${esc(v)}</text>`;
const multiline = (rows,x,y,size=18,color=c.text,weight=600,gap=28) => `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${rows.map((row,i)=>`<tspan x="${x}" dy="${i?gap:0}">${esc(row)}</tspan>`).join('')}</text>`;
const arrow = (x1,y1,x2,y2,color=c.cyan) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" marker-end="url(#arrow)" filter="url(#glow)"/>`;

function overview(t) {
  const items = [[t.graph,c.violet,55],[t.grpc,c.aqua,445],[t.ws,c.amber,835]];
  let body='';
  for(const [item,color,x] of items) body += card(x,130,310,170,color)+`<circle cx="${x+155}" cy="165" r="13" fill="${color}" filter="url(#glow)"/>`+multiline(item,x+155,210,22,c.text,700,34);
  body += arrow(210,315,500,390,c.violet)+arrow(600,315,600,390,c.aqua)+arrow(990,315,700,390,c.amber)+card(390,385,420,115,'url(#g)')+text(t.center,600,432,27,c.text,700)+text(t.principle,600,475,17,c.muted,500);
  return base(t.overview,body);
}

function graph(t) {
  let body=card(45,215,190,130,c.violet)+text(t.client,140,260,23,c.violet,700)+text(t.operation,140,303,17,c.muted,500)+arrow(235,280,365,280,c.violet)+card(365,185,300,190,c.cyan)+text(t.server,515,235,25,c.cyan,700)+text(t.engine,515,278,17,c.muted,500);
  const ys=[135,265,395];
  t.resolvers.forEach((r,i)=>{body+=arrow(665,280,770,ys[i]+52,[c.violet,c.aqua,c.amber][i])+card(770,ys[i],370,104,[c.violet,c.aqua,c.amber][i])+text(r[0],955,ys[i]+40,20,c.text,700)+text(r[1],955,ys[i]+76,17,c.muted,500);});
  body += `<path d="M955 500V535H515V375" fill="none" stroke="url(#g)" stroke-width="4" marker-end="url(#arrow)"/>`+text(t.result,735,570,18,c.aqua,600);
  return base(t.f1,body);
}

function grpc(t) {
  const items=[t.unary,t.serverStream,t.clientStream,t.bidi], colors=[c.violet,c.cyan,c.aqua,c.amber]; let body='';
  items.forEach((item,i)=>{const x=35+i*290; body+=card(x,140,255,275,colors[i])+text(item[0],x+127,188,21,colors[i],700)+`<circle cx="${x+55}" cy="265" r="24" fill="${c.bg}" stroke="${colors[i]}" stroke-width="3"/><circle cx="${x+200}" cy="265" r="24" fill="${c.bg}" stroke="${colors[i]}" stroke-width="3"/>`+text('C',x+55,272,18,c.text,700)+text('S',x+200,272,18,c.text,700)+arrow(x+82,245,x+172,245,colors[i]); if(i===1||i===3) body+=arrow(x+172,285,x+82,285,colors[i]); if(i===2||i===3) body+=arrow(x+82,315,x+172,315,colors[i]); body+=text(item[1],x+127,355,17,c.text,600)+text(item[2],x+127,385,17,c.muted,500);});
  body+=card(135,460,930,88,'url(#g)')+text(t.contract,600,515,19,c.text,600); return base(t.f2,body);
}

function websocket(t) {
  let body=''; t.stages.forEach((stage,i)=>{const x=25+i*235; const color=[c.violet,c.cyan,c.aqua,c.amber,c.violet][i]; body+=card(x,165,200,150,color)+`<circle cx="${x+100}" cy="200" r="12" fill="${color}" filter="url(#glow)"/>`+text(stage[0],x+100,245,19,c.text,700)+text(stage[1],x+100,280,16,c.muted,500); if(i<4) body+=arrow(x+200,240,x+235,240,color);});
  body+=`<path d="M135 355C300 470 900 470 1065 355" fill="none" stroke="url(#g)" stroke-width="7" filter="url(#glow)"/><path d="M1065 390C900 505 300 505 135 390" fill="none" stroke="url(#g)" stroke-width="3" marker-end="url(#arrow)"/>`+card(125,505,950,65,c.line)+text(t.note,600,545,16,c.muted,500); return base(t.f3,body);
}

function comparison(t) {
  const items=[[t.flexible,c.violet,45],[t.typed,c.aqua,425],[t.realtime,c.amber,805]]; let body='';
  for(const [item,color,x] of items) body+=card(x,125,350,220,color)+text(item[0],x+175,175,20,c.muted,600)+text(item[1],x+175,225,29,color,800)+text(item[2],x+175,290,16,c.text,500);
  body+=arrow(220,355,500,430,c.violet)+arrow(600,355,600,430,c.aqua)+arrow(980,355,700,430,c.amber)+card(355,425,490,125,'url(#g)')+text(t.hybrid,600,472,25,c.text,700)+text(t.hybridNote,600,516,16,c.muted,500); return base(t.f4,body);
}

for(const [locale,t] of Object.entries(copy)) {
  const dir=path.join(root,locale); fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'overview.svg'),overview(t));
  fs.writeFileSync(path.join(dir,'figure-01.svg'),graph(t));
  fs.writeFileSync(path.join(dir,'figure-02.svg'),grpc(t));
  fs.writeFileSync(path.join(dir,'figure-03.svg'),websocket(t));
  fs.writeFileSync(path.join(dir,'figure-04.svg'),comparison(t));
}
console.log('Generated 15 localized GraphQL/gRPC/WebSocket SVGs.');
