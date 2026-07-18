import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/oauth-2-flows-tokens-security');
const c = { bg: '#070d22', panel: '#0d1732', line: '#29436f', cyan: '#27d8ff', aqua: '#35f2c1', violet: '#bc78ff', amber: '#ffbd59', red: '#ff6f91', text: '#eff7ff', muted: '#a9bbd1' };
const copy = {
  pt: {
    overview: 'Delegação OAuth 2.0: autoridade limitada, credenciais preservadas',
    overviewStages: [['Usuário', 'resource owner'], ['Cliente', 'solicita autoridade'], ['Authorization Server', 'autoriza e emite tokens'], ['API Gateway', 'valida e aplica política'], ['Resource Server', 'API protegida']],
    overviewNote: 'Autenticação do usuário, autenticação do cliente e autorização da API continuam sendo decisões distintas.',
    f1: 'Papéis e canais de uma implantação OAuth 2.0',
    roles: [['Resource owner', 'concede acesso'], ['Client', 'solicita autoridade'], ['Authorization server', 'política e tokens'], ['Resource server', 'aceita access token']],
    front: 'front-channel: navegador e redirecionamentos', back: 'back-channel: TLS entre cliente e servidor', token: 'access token apresentado à API',
    f2: 'Authorization Code com PKCE: dois canais e uma prova vinculada',
    lanes: ['Usuário / navegador', 'Cliente', 'Authorization Server', 'API'],
    steps: ['1. state + code_challenge + redirect_uri', '2. autenticação e consentimento', '3. authorization code + state', '4. code + code_verifier', '5. access token / refresh token', '6. Authorization: Bearer access_token'],
    f2note: 'O code_challenge vai na autorização; o code_verifier aparece somente no token endpoint.',
    f3: 'Ciclo de vida: emissão, uso, renovação, revogação e expiração',
    lifecycle: [['Grant', 'autoridade obtida'], ['Token endpoint', 'valida cliente e grant'], ['Access token', 'curto e restrito'], ['Resource server', 'valida e autoriza'], ['Refresh / nova emissão', 'rotação e detecção']],
    f3note: 'Revogação reduz uso futuro, mas não apaga chamadas já realizadas.',
    f4: 'Bearer e sender-constrained: quem consegue reutilizar o token?',
    bearer: ['Bearer token', 'Quem obtém o valor pode apresentá-lo até expiração ou revogação.'],
    sender: ['Sender-constrained token', 'O chamador também prova posse da chave vinculada por mTLS ou DPoP.'],
    f4note: 'A restrição de remetente reduz replay, mas exige validação de vínculo e proteção da chave.',
    f5: 'OAuth em uma arquitetura corporativa com API Gateway',
    gateway: [['Cliente', 'obtém token'], ['Authorization Server', 'emite e publica metadata'], ['API Gateway', 'valida token e política'], ['Backend', 'autoriza objeto e domínio']],
    f5note: 'O gateway aplica controles transversais; o backend mantém a autorização fina e as regras de domínio.'
  },
  en: {
    overview: 'OAuth 2.0 delegation: limited authority, preserved credentials',
    overviewStages: [['User', 'resource owner'], ['Client', 'requests authority'], ['Authorization Server', 'authorizes and issues tokens'], ['API Gateway', 'validates and enforces policy'], ['Resource Server', 'protected API']],
    overviewNote: 'User authentication, client authentication, and API authorization remain separate decisions.',
    f1: 'Roles and channels in an OAuth 2.0 deployment',
    roles: [['Resource owner', 'grants access'], ['Client', 'requests authority'], ['Authorization server', 'policy and tokens'], ['Resource server', 'accepts access token']],
    front: 'front-channel: browser and redirects', back: 'back-channel: TLS between client and server', token: 'access token presented to the API',
    f2: 'Authorization Code with PKCE: two channels and bound proof',
    lanes: ['User / browser', 'Client', 'Authorization Server', 'API'],
    steps: ['1. state + code_challenge + redirect_uri', '2. authentication and consent', '3. authorization code + state', '4. code + code_verifier', '5. access token / refresh token', '6. Authorization: Bearer access_token'],
    f2note: 'The code_challenge travels in authorization; the code_verifier appears only at the token endpoint.',
    f3: 'Lifecycle: issuance, use, renewal, revocation, and expiration',
    lifecycle: [['Grant', 'obtained authority'], ['Token endpoint', 'validates client and grant'], ['Access token', 'short and restricted'], ['Resource server', 'validates and authorizes'], ['Refresh / new issuance', 'rotation and detection']],
    f3note: 'Revocation reduces future use, but it does not erase calls already made.',
    f4: 'Bearer and sender-constrained: who can reuse the token?',
    bearer: ['Bearer token', 'Anyone who obtains the value can present it until expiration or revocation.'],
    sender: ['Sender-constrained token', 'The caller also proves possession of the key bound through mTLS or DPoP.'],
    f4note: 'Sender constraint reduces replay, but requires binding validation and key protection.',
    f5: 'OAuth in an enterprise architecture with an API Gateway',
    gateway: [['Client', 'obtains token'], ['Authorization Server', 'issues and publishes metadata'], ['API Gateway', 'validates token and policy'], ['Backend', 'authorizes object and domain']],
    f5note: 'The gateway enforces cross-cutting controls; the backend retains fine-grained and domain authorization.'
  },
  es: {
    overview: 'Delegación OAuth 2.0: autoridad limitada, credenciales preservadas',
    overviewStages: [['Usuario', 'resource owner'], ['Cliente', 'solicita autoridad'], ['Authorization Server', 'autoriza y emite tokens'], ['API Gateway', 'valida y aplica políticas'], ['Resource Server', 'API protegida']],
    overviewNote: 'La autenticación del usuario, la autenticación del cliente y la autorización de la API siguen siendo decisiones distintas.',
    f1: 'Roles y canales de una implementación OAuth 2.0',
    roles: [['Resource owner', 'concede acceso'], ['Client', 'solicita autoridad'], ['Authorization server', 'política y tokens'], ['Resource server', 'acepta access token']],
    front: 'front-channel: navegador y redirecciones', back: 'back-channel: TLS entre cliente y servidor', token: 'access token presentado a la API',
    f2: 'Authorization Code con PKCE: dos canales y una prueba vinculada',
    lanes: ['Usuario / navegador', 'Cliente', 'Authorization Server', 'API'],
    steps: ['1. state + code_challenge + redirect_uri', '2. autenticación y consentimiento', '3. authorization code + state', '4. code + code_verifier', '5. access token / refresh token', '6. Authorization: Bearer access_token'],
    f2note: 'El code_challenge va en la autorización; el code_verifier aparece solo en el token endpoint.',
    f3: 'Ciclo de vida: emisión, uso, renovación, revocación y expiración',
    lifecycle: [['Grant', 'autoridad obtenida'], ['Token endpoint', 'valida cliente y grant'], ['Access token', 'corto y restringido'], ['Resource server', 'valida y autoriza'], ['Refresh / nueva emisión', 'rotación y detección']],
    f3note: 'La revocación reduce el uso futuro, pero no elimina las llamadas ya realizadas.',
    f4: 'Bearer y sender-constrained: ¿quién puede reutilizar el token?',
    bearer: ['Bearer token', 'Quien obtiene el valor puede presentarlo hasta su expiración o revocación.'],
    sender: ['Sender-constrained token', 'El invocador también prueba posesión de la clave vinculada mediante mTLS o DPoP.'],
    f4note: 'La restricción del remitente reduce el replay, pero exige validar el vínculo y proteger la clave.',
    f5: 'OAuth en una arquitectura corporativa con API Gateway',
    gateway: [['Cliente', 'obtiene token'], ['Authorization Server', 'emite y publica metadata'], ['API Gateway', 'valida token y política'], ['Backend', 'autoriza objeto y dominio']],
    f5note: 'El gateway aplica controles transversales; el backend conserva la autorización fina y de dominio.'
  }
};

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const base = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${c.violet}"/><stop offset=".5" stop-color="${c.cyan}"/><stop offset="1" stop-color="${c.aqua}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs><rect width="1200" height="620" rx="28" fill="${c.bg}"/><path d="M0 95H1200M0 548H1200" stroke="${c.line}" opacity=".35"/><text x="60" y="66" fill="${c.text}" font-family="Inter,Arial,sans-serif" font-size="29" font-weight="700">${esc(title)}</text>${body}</svg>`;
const card = (x, y, w, h, stroke = c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c.panel}" stroke="${stroke}" stroke-width="2"/>`;
const text = (value, x, y, size = 20, color = c.text, weight = 600, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${esc(value)}</text>`;
const wrap = (value, x, y, width, size = 18, color = c.text, weight = 600) => { const max = Math.max(12, Math.floor(width / (size * .56))); const rows = []; let row = ''; for (const word of String(value).split(/\s+/)) { const next = row ? `${row} ${word}` : word; if (row && next.length > max) { rows.push(row); row = word; } else row = next; } if (row) rows.push(row); return `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${rows.map((line, index) => `<tspan x="${x}" dy="${index ? size * 1.28 : 0}">${esc(line)}</tspan>`).join('')}</text>`; };
const arrow = (x1, y1, x2, y2, color = c.cyan) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" marker-end="url(#arrow)" filter="url(#glow)"/>`;

function chain(title, items, note) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua, c.cyan];
  const count = items.length;
  const gap = 18;
  const width = (1120 - gap * (count - 1)) / count;
  let body = '';
  items.forEach((item, index) => {
    const x = 40 + index * (width + gap);
    body += card(x, 165, width, 190, colors[index]) + `<circle cx="${x + width / 2}" cy="202" r="11" fill="${colors[index]}" filter="url(#glow)"/>` + wrap(item[0], x + width / 2, 247, width - 28, 20, colors[index], 750) + wrap(item[1], x + width / 2, 302, width - 28, 16, c.muted, 500);
    if (index < count - 1) body += arrow(x + width, 258, x + width + gap, 258, colors[index]);
  });
  body += card(95, 420, 1010, 96, 'url(#g)') + wrap(note, 600, 458, 930, 20, c.text, 600);
  return base(title, body);
}

function figure1(t) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua];
  let body = '';
  t.roles.forEach((item, index) => {
    const x = 40 + index * 290;
    body += card(x, 145, 250, 150, colors[index]) + wrap(item[0], x + 125, 195, 210, 21, colors[index], 750) + wrap(item[1], x + 125, 248, 205, 17, c.muted, 500);
    if (index < 3) body += arrow(x + 250, 220, x + 290, 220, colors[index]);
  });
  body += card(90, 345, 1020, 52, c.cyan) + text(t.front, 600, 378, 18, c.text, 650);
  body += card(90, 415, 1020, 52, c.violet) + text(t.back, 600, 448, 18, c.text, 650);
  body += card(90, 485, 1020, 52, c.amber) + text(t.token, 600, 518, 18, c.amber, 700);
  return base(t.f1, body);
}

function figure2(t) {
  const xs = [85, 380, 675, 970];
  let body = '';
  xs.forEach((x, index) => {
    body += text(t.lanes[index], x, 135, index === 2 ? 17 : 18, [c.cyan, c.amber, c.violet, c.aqua][index], 750);
    body += `<path d="M${x} 155V480" stroke="${c.line}" stroke-width="2" stroke-dasharray="6 8"/>`;
  });
  const flows = [
    [1, 2, 185, t.steps[0], c.amber], [0, 2, 235, t.steps[1], c.cyan], [2, 1, 285, t.steps[2], c.violet],
    [1, 2, 345, t.steps[3], c.amber], [2, 1, 395, t.steps[4], c.aqua], [1, 3, 445, t.steps[5], c.cyan]
  ];
  flows.forEach(([from, to, y, label, color]) => { body += arrow(xs[from], y, xs[to], y, color) + text(label, (xs[from] + xs[to]) / 2, y - 12, 15, c.text, 650); });
  body += card(120, 505, 960, 72, 'url(#g)') + wrap(t.f2note, 600, 535, 880, 18, c.text, 600);
  return base(t.f2, body);
}

function figure4(t) {
  let body = card(70, 165, 485, 235, c.red) + text(t.bearer[0], 312, 225, 26, c.red, 750) + wrap(t.bearer[1], 312, 280, 405, 19, c.text, 550);
  body += card(645, 165, 485, 235, c.aqua) + text(t.sender[0], 887, 225, 26, c.aqua, 750) + wrap(t.sender[1], 887, 280, 405, 19, c.text, 550);
  body += card(110, 450, 980, 80, 'url(#g)') + wrap(t.f4note, 600, 480, 900, 19, c.text, 600);
  return base(t.f4, body);
}

for (const [locale, t] of Object.entries(copy)) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, { recursive: true });
  const files = {
    'overview.svg': chain(t.overview, t.overviewStages, t.overviewNote),
    'figure-01-roles.svg': figure1(t),
    'figure-02.svg': figure2(t),
    'figure-03.svg': chain(t.f3, t.lifecycle, t.f3note),
    'figure-04.svg': figure4(t),
    'figure-05.svg': chain(t.f5, t.gateway, t.f5note)
  };
  for (const [name, svg] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), svg);
}
console.log('Generated 18 localized OAuth 2.0 SVGs.');
