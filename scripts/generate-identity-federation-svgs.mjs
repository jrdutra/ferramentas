import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/identity-federation-sso');
const locales = {
  pt: {
    overview: ['Uma autenticação, múltiplas aplicações', ['Usuário', 'credencial e sessão'], ['Identity Provider', 'autentica e emite asserções'], [['Aplicação A', 'sessão local'], ['Aplicação B', 'sessão local'], ['Aplicação C', 'sessão local']], 'Federação transfere confiança; cada aplicação mantém sua própria sessão.'],
    flow: ['Fluxo conceitual de federação e SSO', [['1. Usuário', 'acessa aplicação'], ['2. RP / SP', 'redireciona'], ['3. IdP', 'autentica'], ['4. Asserção', 'retorna identidade'], ['5. Aplicação', 'cria sessão local']], 'Ao abrir outra aplicação, a sessão no IdP pode evitar um novo desafio.'],
    topologies: ['Topologias de confiança federada', ['Confiança direta', ['IdP parceiro', 'Aplicação']], ['Hub-and-spoke com broker', ['IdP A / B', 'Identity Broker', 'Aplicações']], 'A topologia define como relações de confiança são distribuídas e operadas.'],
    sessions: ['SSO não significa uma única sessão técnica', [['Sessão do IdP', 'autenticação central'], ['Sessão da aplicação', 'estado local do RP/SP'], ['Access token', 'acesso à API'], ['Sessão do navegador', 'cookies e contexto']], 'Logout exige coordenar camadas independentes.'],
    broker: ['Identity broker como ponto de tradução e política', [['IdP corporativo', 'SAML'], ['IdP social', 'OIDC'], ['Parceiro', 'SAML / OIDC']], ['Identity Broker', 'normaliza claims, confiança e sessão'], [['Portal', 'OIDC'], ['API', 'token'], ['SaaS', 'SAML']], 'O broker normaliza protocolos sem eliminar a responsabilidade da aplicação.'],
  },
  en: {
    overview: ['One authentication, multiple applications', ['User', 'credential and session'], ['Identity Provider', 'authenticates and issues assertions'], [['Application A', 'local session'], ['Application B', 'local session'], ['Application C', 'local session']], 'Federation transfers trust; each application maintains its own session.'],
    flow: ['Conceptual federation and SSO flow', [['1. User', 'accesses application'], ['2. RP / SP', 'redirects'], ['3. IdP', 'authenticates'], ['4. Assertion', 'returns identity'], ['5. Application', 'creates local session']], 'When another application opens, the IdP session may avoid a new challenge.'],
    topologies: ['Federated trust topologies', ['Direct trust', ['Partner IdP', 'Application']], ['Hub-and-spoke with broker', ['IdP A / B', 'Identity Broker', 'Applications']], 'The topology defines how trust relationships are distributed and operated.'],
    sessions: ['SSO does not mean one technical session', [['IdP session', 'central authentication'], ['Application session', 'local RP/SP state'], ['Access token', 'API access'], ['Browser session', 'cookies and context']], 'Logout requires coordination across independent layers.'],
    broker: ['Identity broker as a translation and policy point', [['Corporate IdP', 'SAML'], ['Social IdP', 'OIDC'], ['Partner', 'SAML / OIDC']], ['Identity Broker', 'normalizes claims, trust, and session'], [['Portal', 'OIDC'], ['API', 'token'], ['SaaS', 'SAML']], 'The broker normalizes protocols without removing application responsibility.'],
  },
  es: {
    overview: ['Una autenticación, múltiples aplicaciones', ['Usuario', 'credencial y sesión'], ['Identity Provider', 'autentica y emite aserciones'], [['Aplicación A', 'sesión local'], ['Aplicación B', 'sesión local'], ['Aplicación C', 'sesión local']], 'La federación transfiere confianza; cada aplicación mantiene su propia sesión.'],
    flow: ['Flujo conceptual de federación y SSO', [['1. Usuario', 'accede a la aplicación'], ['2. RP / SP', 'redirecciona'], ['3. IdP', 'autentica'], ['4. Aserción', 'devuelve identidad'], ['5. Aplicación', 'crea sesión local']], 'Al abrir otra aplicación, la sesión del IdP puede evitar un nuevo desafío.'],
    topologies: ['Topologías de confianza federada', ['Confianza directa', ['IdP asociado', 'Aplicación']], ['Hub-and-spoke con broker', ['IdP A / B', 'Identity Broker', 'Aplicaciones']], 'La topología define cómo se distribuyen y operan las relaciones de confianza.'],
    sessions: ['SSO no significa una única sesión técnica', [['Sesión del IdP', 'autenticación central'], ['Sesión de la aplicación', 'estado local del RP/SP'], ['Access token', 'acceso a la API'], ['Sesión del navegador', 'cookies y contexto']], 'Logout exige coordinar capas independientes.'],
    broker: ['Identity broker como punto de traducción y política', [['IdP corporativo', 'SAML'], ['IdP social', 'OIDC'], ['Socio', 'SAML / OIDC']], ['Identity Broker', 'normaliza claims, confianza y sesión'], [['Portal', 'OIDC'], ['API', 'token'], ['SaaS', 'SAML']], 'El broker normaliza protocolos sin eliminar la responsabilidad de la aplicación.'],
  },
};

const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const defs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061326"/><stop offset="1" stop-color="#120b2d"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#39d9ff"/></marker></defs>`;
const base = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" role="img"><rect width="1200" height="520" rx="30" fill="url(#bg)"/>${defs}<g font-family="Inter,Segoe UI,Arial,sans-serif">${body}</g></svg>`;
const title = text => `<text x="600" y="58" text-anchor="middle" fill="#f4f7ff" font-size="32" font-weight="700">${esc(text)}</text>`;
const note = text => `<rect x="100" y="438" width="1000" height="54" rx="14" fill="#091a32" stroke="#36537d"/><text x="600" y="471" text-anchor="middle" fill="#c8d7ee" font-size="17">${esc(text)}</text>`;
const card = (x,y,w,h,heading,sub,color='#39d9ff',font=21) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0a1b34" stroke="${color}" stroke-width="2"/><text x="${x+w/2}" y="${y+40}" text-anchor="middle" fill="${color}" font-size="${font}" font-weight="700">${esc(heading)}</text><text x="${x+w/2}" y="${y+75}" text-anchor="middle" fill="#dbe8fb" font-size="16">${esc(sub)}</text>`;
const arrow = (x1,y1,x2,y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#39d9ff" stroke-width="3" fill="none" marker-end="url(#arrow)" filter="url(#glow)"/>`;

function overview([heading,user,idp,apps,footer]) {
  let body=title(heading)+card(45,185,230,120,user[0],user[1]);
  body+=card(355,185,300,120,idp[0],idp[1],'#c682ff')+arrow(275,245,340,245);
  apps.forEach((app,index)=>{const y=105+index*110; body+=card(830,y,300,82,app[0],app[1],index===1?'#ffcf6a':'#78e2ae'); body+=arrow(655,245,815,y+41);});
  return base(body+note(footer));
}

function flow([heading,nodes,footer]) {
  let body=title(heading);
  nodes.forEach((node,index)=>{const x=30+index*235; body+=card(x,180,205,120,node[0],node[1],['#39d9ff','#ffcf6a','#c682ff','#ff9c75','#78e2ae'][index],19); if(index<nodes.length-1)body+=arrow(x+205,240,x+225,240);});
  return base(body+note(footer));
}

function topologies([heading,left,right,footer]) {
  let body=title(heading);
  body+=`<text x="300" y="125" text-anchor="middle" fill="#ffcf6a" font-size="23" font-weight="700">${esc(left[0])}</text>`;
  body+=card(90,185,190,110,left[1][0],'','#39d9ff')+card(360,185,190,110,left[1][1],'','#78e2ae')+arrow(280,240,345,240);
  body+=`<text x="880" y="125" text-anchor="middle" fill="#c682ff" font-size="23" font-weight="700">${esc(right[0])}</text>`;
  body+=card(650,185,160,110,right[1][0],'','#39d9ff',18)+card(850,185,180,110,right[1][1],'','#c682ff',18)+card(1070,185,110,110,right[1][2],'','#78e2ae',16)+arrow(810,240,835,240)+arrow(1030,240,1055,240);
  return base(body+note(footer));
}

function sessions([heading,nodes,footer]) {
  let body=title(heading);
  nodes.forEach((node,index)=>body+=card(45+index*290,175,250,130,node[0],node[1],['#39d9ff','#78e2ae','#ffcf6a','#c682ff'][index],19));
  return base(body+note(footer));
}

function broker([heading,inputs,center,outputs,footer]) {
  let body=title(heading)+card(455,170,290,150,center[0],center[1],'#c682ff',23);
  inputs.forEach((node,index)=>{const y=105+index*115; body+=card(30,y,245,90,node[0],node[1],'#39d9ff',18)+arrow(275,y+45,440,225);});
  outputs.forEach((node,index)=>{const y=105+index*115; body+=card(925,y,245,90,node[0],node[1],'#78e2ae',18)+arrow(760,245,910,y+45);});
  return base(body+note(footer));
}

for (const [locale,data] of Object.entries(locales)) {
  const dir=path.join(root,locale); fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'overview.svg'),overview(data.overview));
  fs.writeFileSync(path.join(dir,'figure-01-federation-flow.svg'),flow(data.flow));
  fs.writeFileSync(path.join(dir,'figure-02-trust-topologies.svg'),topologies(data.topologies));
  fs.writeFileSync(path.join(dir,'figure-03-session-layers.svg'),sessions(data.sessions));
  fs.writeFileSync(path.join(dir,'figure-04-identity-broker.svg'),broker(data.broker));
}

console.log('Generated 15 localized Identity Federation SVG assets.');
