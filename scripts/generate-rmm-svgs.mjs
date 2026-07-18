import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/richardson-maturity-model/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const dictionaries = {
  pt: {
    levels: ['Evolução segundo o Richardson Maturity Model', 'Nível 0', 'Endpoint único', 'mensagens + operações', 'Nível 1', 'Recursos', 'identificadores distintos', 'Nível 2', 'Semântica HTTP', 'métodos + status + cache', 'Nível 3', 'Hipermídia', 'links + transições'],
    f1: ['Os quatro níveis cumulativos do RMM', 'Nível 0', 'Endpoint único', 'Nível 1', 'Recursos', 'Nível 2', 'Semântica HTTP', 'Nível 3', 'Hipermídia', 'Cada nível acrescenta uma capacidade observável da interface.'],
    f2: ['Nível 0: intenções em um único endereço', 'Aplicativo móvel', 'consultar saldo', 'Portal', 'realizar transferência', 'Batch', 'emitir extrato', 'POST /serviço', 'operation + parâmetros', 'Dispatcher', 'switch por operação'],
    f3: ['Nível 1: identidade em recursos distintos', '/clientes/483', 'cliente', '/contas/991', 'conta', '/transferencias/abc', 'transferência', '/extratos/2026-07', 'extrato', 'Identidade e escopo tornam-se visíveis.'],
    f4: ['Nível 2: semântica HTTP compartilhada', 'Método', 'Intenção', 'Exemplo', 'Resposta', 'GET', 'ler', '/contas/991', '200 / 304', 'POST', 'criar/processar', '/transferencias', '201 / 202', 'PUT', 'substituir', '/preferencias/483', '200 / 204', 'DELETE', 'remover', '/agendamentos/77', '204 / 404'],
    f5: ['Maturidade REST em uma arquitetura com API Gateway', 'Consumidor', 'links + métodos', 'API Gateway', 'auth + quotas + roteamento', 'API', 'recursos + semântica', 'Domínio', 'estado + transições', 'O gateway reforça políticas; a semântica continua pertencendo à API.'],
    f6: ['Nível 3: transições válidas no estado atual', 'Transferência criada', 'status: PENDENTE', 'Confirmar', 'rel: confirm', 'Cancelar', 'rel: cancel', 'Consultar', 'rel: self', 'A representação expõe somente ações permitidas.'],
    f7: ['Roteiro incremental de migração', '1. Inventário', 'operações + consumidores + erros', '2. Recursos', 'identidade + ciclo de vida', '3. HTTP', 'métodos + status + precondições', '4. Hipermídia', 'relações + transições', '5. Governança', 'contrato + testes + telemetria'],
  },
  en: {
    levels: ['Evolution through the Richardson Maturity Model', 'Level 0', 'Single endpoint', 'messages + operations', 'Level 1', 'Resources', 'distinct identifiers', 'Level 2', 'HTTP Semantics', 'methods + status + cache', 'Level 3', 'Hypermedia', 'links + transitions'],
    f1: ['The four cumulative RMM levels', 'Level 0', 'Single endpoint', 'Level 1', 'Resources', 'Level 2', 'HTTP Semantics', 'Level 3', 'Hypermedia', 'Each level adds an observable interface capability.'],
    f2: ['Level 0: intents at a single address', 'Mobile app', 'check balance', 'Portal', 'make transfer', 'Batch', 'issue statement', 'POST /service', 'operation + parameters', 'Dispatcher', 'switch by operation'],
    f3: ['Level 1: identity in distinct resources', '/customers/483', 'customer', '/accounts/991', 'account', '/transfers/abc', 'transfer', '/statements/2026-07', 'statement', 'Identity and scope become visible.'],
    f4: ['Level 2: shared HTTP semantics', 'Method', 'Intent', 'Example', 'Response', 'GET', 'read', '/accounts/991', '200 / 304', 'POST', 'create/process', '/transfers', '201 / 202', 'PUT', 'replace', '/preferences/483', '200 / 204', 'DELETE', 'remove', '/schedules/77', '204 / 404'],
    f5: ['REST maturity in an API Gateway architecture', 'Consumer', 'links + methods', 'API Gateway', 'auth + quotas + routing', 'API', 'resources + semantics', 'Domain', 'state + transitions', 'The gateway enforces policies; semantics remain the API responsibility.'],
    f6: ['Level 3: valid transitions in the current state', 'Transfer created', 'status: PENDING', 'Confirm', 'rel: confirm', 'Cancel', 'rel: cancel', 'View', 'rel: self', 'The representation exposes only permitted actions.'],
    f7: ['Incremental migration roadmap', '1. Inventory', 'operations + consumers + errors', '2. Resources', 'identity + lifecycle', '3. HTTP', 'methods + status + preconditions', '4. Hypermedia', 'relations + transitions', '5. Governance', 'contract + tests + telemetry'],
  },
  es: {
    levels: ['Evolución según el Richardson Maturity Model', 'Nivel 0', 'Endpoint único', 'mensajes + operaciones', 'Nivel 1', 'Recursos', 'identificadores distintos', 'Nivel 2', 'Semántica HTTP', 'métodos + status + cache', 'Nivel 3', 'Hipermedia', 'links + transiciones'],
    f1: ['Los cuatro niveles acumulativos del RMM', 'Nivel 0', 'Endpoint único', 'Nivel 1', 'Recursos', 'Nivel 2', 'Semántica HTTP', 'Nivel 3', 'Hipermedia', 'Cada nivel añade una capacidad observable de la interfaz.'],
    f2: ['Nivel 0: intenciones en una única dirección', 'Aplicación móvil', 'consultar saldo', 'Portal', 'realizar transferencia', 'Batch', 'emitir extracto', 'POST /servicio', 'operation + parámetros', 'Dispatcher', 'switch por operación'],
    f3: ['Nivel 1: identidad en recursos distintos', '/clientes/483', 'cliente', '/cuentas/991', 'cuenta', '/transferencias/abc', 'transferencia', '/extractos/2026-07', 'extracto', 'La identidad y el alcance se hacen visibles.'],
    f4: ['Nivel 2: semántica HTTP compartida', 'Método', 'Intención', 'Ejemplo', 'Respuesta', 'GET', 'leer', '/cuentas/991', '200 / 304', 'POST', 'crear/procesar', '/transferencias', '201 / 202', 'PUT', 'reemplazar', '/preferencias/483', '200 / 204', 'DELETE', 'eliminar', '/programaciones/77', '204 / 404'],
    f5: ['Madurez REST en una arquitectura con API Gateway', 'Consumidor', 'links + métodos', 'API Gateway', 'auth + cuotas + routing', 'API', 'recursos + semántica', 'Dominio', 'estado + transiciones', 'El gateway aplica políticas; la semántica sigue perteneciendo a la API.'],
    f6: ['Nivel 3: transiciones válidas en el estado actual', 'Transferencia creada', 'status: PENDIENTE', 'Confirmar', 'rel: confirm', 'Cancelar', 'rel: cancel', 'Consultar', 'rel: self', 'La representación expone solamente acciones permitidas.'],
    f7: ['Ruta incremental de migración', '1. Inventario', 'operaciones + consumidores + errores', '2. Recursos', 'identidad + ciclo de vida', '3. HTTP', 'métodos + status + precondiciones', '4. Hipermedia', 'relaciones + transiciones', '5. Gobernanza', 'contrato + pruebas + telemetría'],
  },
};

const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const defs = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="#061126"/><stop offset="1" stop-color="#17143d"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#45ddff"/></marker></defs>`;
const colors = ['#f97373', '#45b8f2', '#f4c84b', '#75d58c', '#a855f7'];

function frame(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}">${defs}<rect width="1200" height="620" rx="34" fill="url(#bg)"/><path d="M42 102H1158" stroke="#294572" stroke-width="2"/><text x="60" y="69" fill="#f4f8ff" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700">${esc(title)}</text>${body}</svg>`;
}
function fit(text, width, preferred = 21, minimum = 12) { return Math.max(minimum, Math.min(preferred, Math.floor((width - 24) / Math.max(1, text.length * .56)))); }
function node(x,y,w,h,title,detail='',color='#21d4fd',titleSize=21) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="19" fill="#0b1d3e" stroke="${color}" stroke-width="3"/><rect x="${x+9}" y="${y+9}" width="${w-18}" height="${h-18}" rx="13" fill="#142b58" opacity=".82"/><text x="${x+w/2}" y="${y+h/2-(detail?9:-7)}" text-anchor="middle" fill="#f4f8ff" font-family="Inter,Arial,sans-serif" font-size="${fit(title,w,titleSize,13)}" font-weight="700">${esc(title)}</text>${detail?`<text x="${x+w/2}" y="${y+h/2+25}" text-anchor="middle" fill="#bed8ef" font-family="Inter,Arial,sans-serif" font-size="${fit(detail,w,17,11)}">${esc(detail)}</text>`:''}</g>`;
}
function arrow(x1,y1,x2,y2){return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#45ddff" stroke-width="5" fill="none" marker-end="url(#arrow)" filter="url(#glow)"/>`;}
function note(x,y,text,size=18){return `<text x="${x}" y="${y}" text-anchor="middle" fill="#cfe7ff" font-family="Inter,Arial,sans-serif" font-size="${size}">${esc(text)}</text>`;}

function levels(l, compact=false){
  const [title,...v]=l; const heights=compact?[105,125,145,165]:[120,145,170,195]; const yBase=470; let body='';
  for(let i=0;i<4;i++){const x=35+i*290,w=250,h=heights[i],y=yBase-h;body+=node(x,y,w,h,v[i*3],`${v[i*3+1]} · ${v[i*3+2]}`,colors[i],20);if(i<3)body+=arrow(x+w,yBase-30,x+290,yBase-30);}
  return frame(title,body);
}
function fourLevels(l){
  const [title,...v]=l;let body='';
  for(let i=0;i<4;i++){const x=35+i*290;body+=node(x,220,250,150,v[i*2],v[i*2+1],colors[i],22);if(i<3)body+=arrow(x+250,295,x+290,295);}
  body+=note(600,500,v[8],19);return frame(title,body);
}
function dispatcher(l){
  const [title,a,ad,b,bd,c,cd,service,sd,dispatcher,dd]=l;
  return frame(title,node(35,145,230,90,a,ad,colors[1])+node(35,265,230,90,b,bd,colors[4])+node(35,385,230,90,c,cd,colors[2])+node(430,240,300,150,service,sd,colors[4],23)+node(920,260,240,110,dispatcher,dd,colors[0],23)+arrow(265,190,430,280)+arrow(265,310,430,315)+arrow(265,430,430,350)+arrow(730,315,920,315));
}
function resources(l){
  const [title,...v]=l;let body='';
  for(let i=0;i<4;i++){const x=35+i*290;body+=node(x,220,250,140,v[i*2],v[i*2+1],colors[(i+1)%4],21);}
  body+=`<path d="M160 360V430H1030V360" stroke="#45ddff" stroke-width="4" fill="none"/>`+note(600,500,v[8],19);return frame(title,body);
}
function semantics(l){
  const [title,...v]=l;const widths=[160,230,340,220],xs=[45,205,435,775];let body='';
  for(let c=0;c<4;c++)body+=`<rect x="${xs[c]}" y="145" width="${widths[c]}" height="55" fill="#17436b"/><text x="${xs[c]+widths[c]/2}" y="180" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="19" font-weight="700">${esc(v[c])}</text>`;
  for(let r=0;r<4;r++){const y=200+r*78;for(let c=0;c<4;c++){const text=v[4+r*4+c];body+=`<rect x="${xs[c]}" y="${y}" width="${widths[c]}" height="78" fill="${r%2?'#0d2244':'#112b52'}" stroke="#294d78"/><text x="${xs[c]+widths[c]/2}" y="${y+46}" text-anchor="middle" fill="#eaf5ff" font-family="Inter,Arial,sans-serif" font-size="${fit(text,widths[c],18,12)}" font-weight="${c===0?'700':'500'}">${esc(text)}</text>`;}}
  return frame(title,body);
}
function gateway(l){
  const [title,...v]=l;let body='';const xs=[35,330,625,920];
  for(let i=0;i<4;i++){body+=node(xs[i],220,245,140,v[i*2],v[i*2+1],colors[(i+1)%5],21);if(i<3)body+=arrow(xs[i]+245,290,xs[i]+295,290);}
  body+=note(600,500,v[8],18);return frame(title,body);
}
function transitions(l){
  const [title,root,rd,a,ad,b,bd,c,cd,footer]=l;
  return frame(title,node(55,245,285,150,root,rd,colors[1],22)+node(510,135,250,110,a,ad,colors[3],22)+node(510,380,250,110,b,bd,colors[2],22)+node(900,245,245,150,c,cd,colors[0],22)+arrow(340,300,510,190)+arrow(340,340,510,435)+arrow(340,320,900,320)+note(600,555,footer,18));
}
function migration(l){
  const [title,...v]=l;let body='';const ws=[210,210,210,210,210],xs=[25,260,495,730,965];
  for(let i=0;i<5;i++){body+=node(xs[i],220,ws[i],150,v[i*2],v[i*2+1],colors[i],19);if(i<4)body+=arrow(xs[i]+210,295,xs[i]+235,295);}
  return frame(title,body);
}

const builders={
  'overview.svg':d=>levels(d.levels),
  'figure-01.svg':d=>fourLevels(d.f1),
  'figure-02.svg':d=>dispatcher(d.f2),
  'figure-03.svg':d=>resources(d.f3),
  'figure-04.svg':d=>semantics(d.f4),
  'figure-05.svg':d=>gateway(d.f5),
  'figure-06.svg':d=>transitions(d.f6),
  'figure-07.svg':d=>migration(d.f7),
};

for(const [locale,dictionary] of Object.entries(dictionaries)){
  const dir=join(root,locale);mkdirSync(dir,{recursive:true});
  for(const [name,builder] of Object.entries(builders))writeFileSync(join(dir,name),builder(dictionary),'utf8');
}
console.log(`Generated ${Object.keys(builders).length*Object.keys(dictionaries).length} localized RMM SVGs.`);
