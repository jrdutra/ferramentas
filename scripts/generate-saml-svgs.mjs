import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/saml-2-in-depth');
const locales = {
  pt: {
    overview: ['Federação SAML: confiança entre domínios', ['Usuário', 'acessa a aplicação'], ['Service Provider', 'solicita autenticação'], ['Identity Provider', 'autentica e emite assertion'], ['Sessão local', 'aplicação concede acesso'], 'Mensagens XML assinadas e metadata confiável conectam os domínios.'],
    assertion: ['Anatomia conceitual de uma SAML Assertion', [['Issuer', 'quem emitiu'], ['Subject', 'quem é o principal'], ['Conditions', 'tempo e audience'], ['Statements', 'authn, atributos, decisão'], ['Signature', 'integridade e origem']], 'A assertion não deve ser aceita apenas porque a assinatura é válida.'],
    sso: ['Web Browser SSO iniciado pelo Service Provider', ['Browser', 'SP', 'IdP'], ['1. Recurso protegido', '2. AuthnRequest', '3. Login / MFA', '4. SAMLResponse via POST', '5. ACS valida e cria sessão']],
    pipeline: ['Pipeline seguro de validação de SAMLResponse', ['Origem e binding', 'XML seguro', 'Assinatura', 'Issuer e chave', 'Tempo', 'Audience', 'Recipient / InResponseTo', 'Criar sessão'], 'Falhar de forma fechada: qualquer inconsistência encerra o processamento.'],
    bindings: ['Bindings: uma mensagem SAML, transportes diferentes', [['HTTP-Redirect', 'query string, DEFLATE'], ['HTTP-POST', 'formulário HTML'], ['HTTP-Artifact', 'referência curta'], ['SOAP', 'canal back-channel']], 'Binding define transporte; profile combina mensagens e regras do caso de uso.'],
    metadata: ['Metadata estabelece confiança antes do runtime', ['SP Metadata', ['entityID', 'ACS', 'certificados']], ['IdP Metadata', ['entityID', 'SSO / SLO', 'chaves']], 'Metadata precisa de distribuição autenticada, cache controlado e rotação.'],
  },
  en: {
    overview: ['SAML federation: trust across domains', ['User', 'accesses the application'], ['Service Provider', 'requests authentication'], ['Identity Provider', 'authenticates and issues assertion'], ['Local session', 'application grants access'], 'Signed XML messages and trusted metadata connect the domains.'],
    assertion: ['Conceptual anatomy of a SAML Assertion', [['Issuer', 'who issued it'], ['Subject', 'who the principal is'], ['Conditions', 'time and audience'], ['Statements', 'authn, attributes, decision'], ['Signature', 'integrity and origin']], 'The assertion must not be accepted merely because the signature is valid.'],
    sso: ['Web Browser SSO initiated by the Service Provider', ['Browser', 'SP', 'IdP'], ['1. Protected resource', '2. AuthnRequest', '3. Login / MFA', '4. SAMLResponse via POST', '5. ACS validates and creates session']],
    pipeline: ['Secure SAMLResponse validation pipeline', ['Origin and binding', 'Secure XML', 'Signature', 'Issuer and key', 'Time', 'Audience', 'Recipient / InResponseTo', 'Create session'], 'Fail closed: any inconsistency must stop processing.'],
    bindings: ['Bindings: one SAML message, different transports', [['HTTP-Redirect', 'query string, DEFLATE'], ['HTTP-POST', 'HTML form'], ['HTTP-Artifact', 'short reference'], ['SOAP', 'back-channel']], 'Binding defines transport; a profile combines messages and use-case rules.'],
    metadata: ['Metadata establishes trust before runtime', ['SP Metadata', ['entityID', 'ACS', 'certificates']], ['IdP Metadata', ['entityID', 'SSO / SLO', 'keys']], 'Metadata requires authenticated distribution, controlled caching, and rotation.'],
  },
  es: {
    overview: ['Federación SAML: confianza entre dominios', ['Usuario', 'accede a la aplicación'], ['Service Provider', 'solicita autenticación'], ['Identity Provider', 'autentica y emite assertion'], ['Sesión local', 'la aplicación concede acceso'], 'Mensajes XML firmados y metadata confiable conectan los dominios.'],
    assertion: ['Anatomía conceptual de una SAML Assertion', [['Issuer', 'quién la emitió'], ['Subject', 'quién es el principal'], ['Conditions', 'tiempo y audience'], ['Statements', 'authn, atributos, decisión'], ['Signature', 'integridad y origen']], 'La assertion no debe aceptarse solo porque la firma sea válida.'],
    sso: ['Web Browser SSO iniciado por el Service Provider', ['Browser', 'SP', 'IdP'], ['1. Recurso protegido', '2. AuthnRequest', '3. Login / MFA', '4. SAMLResponse vía POST', '5. ACS valida y crea sesión']],
    pipeline: ['Pipeline seguro de validación de SAMLResponse', ['Origen y binding', 'XML seguro', 'Firma', 'Issuer y clave', 'Tiempo', 'Audience', 'Recipient / InResponseTo', 'Crear sesión'], 'Fallar de forma cerrada: cualquier inconsistencia detiene el procesamiento.'],
    bindings: ['Bindings: un mensaje SAML, transportes diferentes', [['HTTP-Redirect', 'query string, DEFLATE'], ['HTTP-POST', 'formulario HTML'], ['HTTP-Artifact', 'referencia corta'], ['SOAP', 'canal back-channel']], 'Binding define el transporte; un profile combina mensajes y reglas del caso de uso.'],
    metadata: ['Metadata establece confianza antes del runtime', ['SP Metadata', ['entityID', 'ACS', 'certificados']], ['IdP Metadata', ['entityID', 'SSO / SLO', 'claves']], 'Metadata requiere distribución autenticada, caché controlada y rotación.'],
  },
};

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const defs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061326"/><stop offset="1" stop-color="#120b2d"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#39d9ff"/></marker></defs>`;
const base = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" role="img"><rect width="1200" height="520" rx="30" fill="url(#bg)"/>${defs}<g font-family="Inter,Segoe UI,Arial,sans-serif">${body}</g></svg>`;
const title = text => `<text x="600" y="58" text-anchor="middle" fill="#f4f7ff" font-size="32" font-weight="700">${escape(text)}</text>`;
const note = (text, y=478) => `<rect x="110" y="${y-34}" width="980" height="52" rx="14" fill="#091a32" stroke="#36537d"/><text x="600" y="${y-2}" text-anchor="middle" fill="#c8d7ee" font-size="17">${escape(text)}</text>`;
const card = (x,y,w,h,heading,sub,color='#35d7ff') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0a1b34" stroke="${color}" stroke-width="2"/><text x="${x+w/2}" y="${y+38}" text-anchor="middle" fill="${color}" font-size="21" font-weight="700">${escape(heading)}</text><text x="${x+w/2}" y="${y+70}" text-anchor="middle" fill="#dbe8fb" font-size="15">${escape(sub)}</text>`;
const arrow = (x1,y1,x2,y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#39d9ff" stroke-width="3" fill="none" marker-end="url(#arrow)" filter="url(#glow)"/>`;
const wrappedLines = (value, max = 13) => {
  if (String(value).includes(' / ')) return String(value).split(' / ');
  const words = String(value).split(' ');
  const lines = [];
  for (const word of words) {
    if (!lines.length || `${lines.at(-1)} ${word}`.trim().length > max) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
};
const compactCard = (x, y, w, h, heading, color) => {
  const lines = wrappedLines(heading);
  const texts = lines.map((line, index) => `<text x="${x+w/2}" y="${y+46+index*21}" text-anchor="middle" fill="${color}" font-size="15" font-weight="700">${escape(line)}</text>`).join('');
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0a1b34" stroke="${color}" stroke-width="2"/>${texts}`;
};

function flowDiagram(data) {
  const [heading, ...rest] = data;
  const footer = rest.pop();
  const nodes = rest;
  const width = 235, gap = 43, start = 65;
  let body = title(heading);
  nodes.forEach((node, index) => {
    const x = start + index * (width + gap);
    body += card(x, 178, width, 112, node[0], node[1], index % 2 ? '#c682ff' : '#39d9ff');
    if (index < nodes.length - 1) body += arrow(x + width, 234, x + width + gap - 10, 234);
  });
  return base(body + note(footer));
}

function assertionDiagram([heading, nodes, footer]) {
  let body = title(heading);
  nodes.forEach((node, index) => body += card(36 + index * 232, 175, 200, 125, node[0], node[1], ['#39d9ff','#ffcf6a','#c682ff','#78e2ae','#ff9c75'][index]));
  return base(body + note(footer));
}

function ssoDiagram([heading, actors, steps]) {
  let body = title(heading);
  actors.forEach((actor,index) => body += card(130 + index * 395, 105, 150, 70, actor, '', index === 1 ? '#ffcf6a' : '#8bdcff'));
  const ys = [205,250,295,340,385];
  body += arrow(205,ys[0],600,ys[0]) + arrow(600,ys[1],995,ys[1]) + arrow(995,ys[2],995,ys[2]+1) + arrow(995,ys[3],205,ys[3]) + arrow(205,ys[4],600,ys[4]);
  steps.forEach((step,index) => body += `<rect x="${315 + (index%2)*250}" y="${ys[index]-18}" width="230" height="30" rx="10" fill="#08172c"/><text x="${430 + (index%2)*250}" y="${ys[index]+3}" text-anchor="middle" fill="#eaf2ff" font-size="15">${escape(step)}</text>`);
  return base(body);
}

function pipelineDiagram([heading, nodes, footer]) {
  let body = title(heading);
  nodes.forEach((node,index) => {
    const x = 20 + index * 148;
    const color = index % 3 === 0 ? '#39d9ff' : index % 3 === 1 ? '#c682ff' : '#78e2ae';
    body += compactCard(x, 175, 132, 125, node, color);
    if (index < nodes.length - 1) body += arrow(x+132,237,x+143,237);
  });
  return base(body + note(footer));
}

function bindingsDiagram([heading, nodes, footer]) {
  let body = title(heading);
  nodes.forEach((node,index) => body += card(50 + index*288, 175, 250, 125, node[0], node[1], ['#39d9ff','#ffcf6a','#c682ff','#78e2ae'][index]));
  return base(body + note(footer));
}

function metadataDiagram([heading, left, right, footer]) {
  let body = title(heading);
  body += card(95,155,310,160,left[0],left[1].join(' · '),'#ffcf6a');
  body += card(795,155,310,160,right[0],right[1].join(' · '),'#c682ff');
  body += arrow(405,235,780,235) + arrow(795,260,420,260);
  body += `<text x="600" y="215" text-anchor="middle" fill="#39d9ff" font-size="19" font-weight="700">TRUST</text>`;
  return base(body + note(footer));
}

for (const [locale, data] of Object.entries(locales)) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'overview.svg'), flowDiagram(data.overview));
  fs.writeFileSync(path.join(dir, 'figure-01-assertion-anatomy.svg'), assertionDiagram(data.assertion));
  fs.writeFileSync(path.join(dir, 'figure-02-sp-initiated-sso.svg'), ssoDiagram(data.sso));
  fs.writeFileSync(path.join(dir, 'figure-03-validation-pipeline.svg'), pipelineDiagram(data.pipeline));
  fs.writeFileSync(path.join(dir, 'figure-04-bindings.svg'), bindingsDiagram(data.bindings));
  fs.writeFileSync(path.join(dir, 'figure-05-metadata-trust.svg'), metadataDiagram(data.metadata));
}

console.log('Generated 18 localized SAML SVG assets.');
