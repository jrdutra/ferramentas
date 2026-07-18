import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/openid-connect-id-tokens-sessions-federation');
const c = { bg: '#070d22', panel: '#0d1732', line: '#29436f', cyan: '#27d8ff', aqua: '#35f2c1', violet: '#bc78ff', amber: '#ffbd59', red: '#ff6f91', text: '#eff7ff', muted: '#a9bbd1' };
const copy = {
  pt: {
    overview: 'OpenID Connect: identidade verificável e interoperável',
    overviewStages: [['Usuário', 'inicia autenticação'], ['Relying Party', 'cliente OIDC'], ['OpenID Provider', 'autentica e emite'], ['ID Token', 'asserção ao cliente'], ['Aplicação / API', 'sessão e acesso']],
    overviewNote: 'O ID Token prova ao cliente um evento de autenticação; o access token autoriza acesso ao resource server.',
    f1: 'Authorization Code Flow com OpenID Connect',
    roles: [['Navegador', 'user agent'], ['Cliente / RP', 'state, nonce e PKCE'], ['Authorization endpoint', 'login e consentimento'], ['Token endpoint', 'code + verifier'], ['Sessão local', 'ID Token validado']],
    front: 'front-channel: authorization request e retorno do code', back: 'back-channel: troca direta do code e obtenção dos tokens', session: 'A RP cria a sessão somente após validar o ID Token e a transação.',
    f2: 'ID Token: estrutura, destinatário e validação',
    tokenParts: [['Header', 'alg, kid, typ'], ['Payload', 'iss, sub, aud, exp, nonce, acr...'], ['Assinatura', 'integridade e origem']],
    tokenNote: 'Destinatário: o cliente OIDC identificado por client_id. Não use ID Token como credencial genérica de API.',
    f3: 'Validação segura do ID Token: cadeia obrigatória',
    validation: [['Emissor', 'iss exato'], ['Assinatura', 'alg, kid, JWKS'], ['Audiência', 'aud e azp'], ['Tempo', 'exp, iat, auth_time'], ['Vínculo', 'nonce, c_hash, at_hash'], ['Política', 'acr, amr, tenant']],
    validationNote: 'A validação é criptográfica, temporal e contextual ao cliente e ao fluxo utilizado.',
    f4: 'Três estados diferentes: OP, RP e API',
    sessions: [['Sessão no OP', 'cookie do provedor'], ['Sessão no RP', 'cookie da aplicação'], ['Tokens OAuth', 'access / refresh'], ['Sessão da API', 'normalmente stateless']],
    sessionsNote: 'Encerrar uma sessão não revoga automaticamente todas as outras. Logout exige política explícita.',
    f5: 'Mecanismos de logout em OpenID Connect',
    logout: [['RP-Initiated', 'RP redireciona ao OP'], ['Front-Channel', 'OP usa o navegador'], ['Back-Channel', 'OP chama o RP'], ['Sessão local', 'RP limpa cookie e estado']],
    logoutBack: 'Back-channel independe do user agent, mas exige endpoint autenticável e tratamento idempotente.',
    logoutFront: 'Front-channel depende do navegador, cookies, rede e conclusão das navegações.',
    f6: 'Federação: confiança em metadata, chaves e políticas',
    federation: [['Relying Party', 'confia no issuer esperado'], ['Metadata e trust', 'endpoints, chaves e políticas'], ['OpenID Provider', 'autentica e emite claims']],
    federationNote: 'A confiança não vem apenas de HTTPS. Ela depende de issuer, registro, redirect URIs, chaves, algoritmos, políticas e governança.'
  },
  en: {
    overview: 'OpenID Connect: verifiable and interoperable identity',
    overviewStages: [['User', 'starts authentication'], ['Relying Party', 'OIDC client'], ['OpenID Provider', 'authenticates and issues'], ['ID Token', 'assertion to the client'], ['Application / API', 'session and access']],
    overviewNote: 'The ID Token proves an authentication event to the client; the access token authorizes access to the resource server.',
    f1: 'Authorization Code Flow with OpenID Connect',
    roles: [['Browser', 'user agent'], ['Client / RP', 'state, nonce, and PKCE'], ['Authorization endpoint', 'login and consent'], ['Token endpoint', 'code + verifier'], ['Local session', 'validated ID Token']],
    front: 'front-channel: authorization request and code return', back: 'back-channel: direct code exchange and token issuance', session: 'The RP creates the session only after validating the ID Token and transaction.',
    f2: 'ID Token: structure, recipient, and validation',
    tokenParts: [['Header', 'alg, kid, typ'], ['Payload', 'iss, sub, aud, exp, nonce, acr...'], ['Signature', 'integrity and origin']],
    tokenNote: 'Recipient: the OIDC client identified by client_id. Do not use an ID Token as a generic API credential.',
    f3: 'Secure ID Token validation: mandatory chain',
    validation: [['Issuer', 'exact iss'], ['Signature', 'alg, kid, JWKS'], ['Audience', 'aud and azp'], ['Time', 'exp, iat, auth_time'], ['Binding', 'nonce, c_hash, at_hash'], ['Policy', 'acr, amr, tenant']],
    validationNote: 'Validation is cryptographic, temporal, and contextual to the client and flow.',
    f4: 'Three different states: OP, RP, and API',
    sessions: [['OP session', 'provider cookie'], ['RP session', 'application cookie'], ['OAuth tokens', 'access / refresh'], ['API session', 'usually stateless']],
    sessionsNote: 'Ending one session does not automatically revoke all others. Logout requires an explicit policy.',
    f5: 'Logout mechanisms in OpenID Connect',
    logout: [['RP-Initiated', 'RP redirects to the OP'], ['Front-Channel', 'OP uses the browser'], ['Back-Channel', 'OP calls the RP'], ['Local session', 'RP clears cookie and state']],
    logoutBack: 'Back-channel is independent of the user agent, but requires an authenticatable endpoint and idempotent handling.',
    logoutFront: 'Front-channel depends on the browser, cookies, network, and navigation completion.',
    f6: 'Federation: trust in metadata, keys, and policies',
    federation: [['Relying Party', 'trusts the expected issuer'], ['Metadata and trust', 'endpoints, keys, and policies'], ['OpenID Provider', 'authenticates and issues claims']],
    federationNote: 'Trust does not come from HTTPS alone. It depends on issuer, registration, redirect URIs, keys, algorithms, policies, and governance.'
  },
  es: {
    overview: 'OpenID Connect: identidad verificable e interoperable',
    overviewStages: [['Usuario', 'inicia autenticación'], ['Relying Party', 'cliente OIDC'], ['OpenID Provider', 'autentica y emite'], ['ID Token', 'aserción al cliente'], ['Aplicación / API', 'sesión y acceso']],
    overviewNote: 'El ID Token demuestra al cliente un evento de autenticación; el access token autoriza el acceso al resource server.',
    f1: 'Authorization Code Flow con OpenID Connect',
    roles: [['Navegador', 'user agent'], ['Cliente / RP', 'state, nonce y PKCE'], ['Authorization endpoint', 'login y consentimiento'], ['Token endpoint', 'code + verifier'], ['Sesión local', 'ID Token validado']],
    front: 'front-channel: authorization request y retorno del code', back: 'back-channel: intercambio directo del code y obtención de tokens', session: 'El RP crea la sesión solo después de validar el ID Token y la transacción.',
    f2: 'ID Token: estructura, destinatario y validación',
    tokenParts: [['Header', 'alg, kid, typ'], ['Payload', 'iss, sub, aud, exp, nonce, acr...'], ['Firma', 'integridad y origen']],
    tokenNote: 'Destinatario: el cliente OIDC identificado por client_id. No use ID Token como credencial genérica de API.',
    f3: 'Validación segura del ID Token: cadena obligatoria',
    validation: [['Issuer', 'iss exacto'], ['Firma', 'alg, kid, JWKS'], ['Audience', 'aud y azp'], ['Tiempo', 'exp, iat, auth_time'], ['Vínculo', 'nonce, c_hash, at_hash'], ['Política', 'acr, amr, tenant']],
    validationNote: 'La validación es criptográfica, temporal y contextual al cliente y al flujo utilizado.',
    f4: 'Tres estados diferentes: OP, RP y API',
    sessions: [['Sesión en OP', 'cookie del proveedor'], ['Sesión en RP', 'cookie de la aplicación'], ['Tokens OAuth', 'access / refresh'], ['Sesión de API', 'normalmente stateless']],
    sessionsNote: 'Finalizar una sesión no revoca automáticamente todas las demás. Logout requiere una política explícita.',
    f5: 'Mecanismos de logout en OpenID Connect',
    logout: [['RP-Initiated', 'RP redirige al OP'], ['Front-Channel', 'OP usa el navegador'], ['Back-Channel', 'OP llama al RP'], ['Sesión local', 'RP limpia cookie y estado']],
    logoutBack: 'Back-channel no depende del user agent, pero exige un endpoint autenticable y tratamiento idempotente.',
    logoutFront: 'Front-channel depende del navegador, cookies, red y finalización de las navegaciones.',
    f6: 'Federación: confianza en metadata, claves y políticas',
    federation: [['Relying Party', 'confía en el issuer esperado'], ['Metadata y trust', 'endpoints, claves y políticas'], ['OpenID Provider', 'autentica y emite claims']],
    federationNote: 'La confianza no proviene solo de HTTPS. Depende de issuer, registro, redirect URIs, claves, algoritmos, políticas y gobernanza.'
  }
};

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const wrapLines = (value, width, size) => {
  const max = Math.max(11, Math.floor(width / (size * .55)));
  const rows = []; let row = '';
  for (const word of String(value).split(/\s+/)) {
    const next = row ? `${row} ${word}` : word;
    if (row && next.length > max) { rows.push(row); row = word; } else row = next;
  }
  if (row) rows.push(row);
  return rows;
};
const multiline = (value, x, y, width, size = 18, color = c.text, weight = 600, anchor = 'middle') => {
  const rows = wrapLines(value, width, size);
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${rows.map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.28 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
};
const base = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 660" role="img" aria-label="${esc(title)}"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${c.violet}"/><stop offset=".5" stop-color="${c.cyan}"/><stop offset="1" stop-color="${c.aqua}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs><rect width="1200" height="660" rx="28" fill="${c.bg}"/><path d="M0 105H1200M0 605H1200" stroke="${c.line}" opacity=".35"/>${multiline(title, 600, 48, 1080, 27, c.text, 750)}${body}</svg>`;
const card = (x, y, w, h, stroke = c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c.panel}" stroke="${stroke}" stroke-width="2"/>`;
const text = (value, x, y, size = 20, color = c.text, weight = 600) => `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${esc(value)}</text>`;
const arrow = (x1, y1, x2, y2, color = c.cyan) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" marker-end="url(#arrow)" filter="url(#glow)"/>`;

function chain(title, items, note) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua, c.cyan];
  const gap = 18, width = (1120 - gap * (items.length - 1)) / items.length;
  let body = '';
  items.forEach((item, index) => {
    const x = 40 + index * (width + gap);
    body += card(x, 155, width, 215, colors[index]) + `<circle cx="${x + width / 2}" cy="195" r="10" fill="${colors[index]}" filter="url(#glow)"/>` + multiline(item[0], x + width / 2, 245, width - 25, 20, colors[index], 750) + multiline(item[1], x + width / 2, 310, width - 25, 16, c.muted, 500);
    if (index < items.length - 1) body += arrow(x + width, 260, x + width + gap, 260, colors[index]);
  });
  body += card(95, 430, 1010, 110, 'url(#g)') + multiline(note, 600, 470, 920, 19, c.text, 600);
  return base(title, body);
}

function figure1(t) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua, c.cyan];
  let body = '';
  t.roles.forEach((item, index) => {
    const x = 30 + index * 235;
    body += card(x, 140, 205, 180, colors[index]) + multiline(item[0], x + 102.5, 190, 170, 18, colors[index], 750) + multiline(item[1], x + 102.5, 255, 170, 15, c.muted, 500);
    if (index < 4) body += arrow(x + 205, 230, x + 235, 230, colors[index]);
  });
  body += card(80, 365, 1040, 54, c.cyan) + text(t.front, 600, 399, 18, c.text, 650);
  body += card(80, 437, 1040, 54, c.violet) + text(t.back, 600, 471, 18, c.text, 650);
  body += card(80, 509, 1040, 62, c.amber) + multiline(t.session, 600, 540, 940, 17, c.amber, 650);
  return base(t.f1, body);
}

function figure2(t) {
  const colors = [c.cyan, c.violet, c.amber];
  let body = '';
  t.tokenParts.forEach((item, index) => {
    const x = 70 + index * 375;
    body += card(x, 165, 310, 250, colors[index]) + `<circle cx="${x + 155}" cy="220" r="18" fill="${colors[index]}" opacity=".85" filter="url(#glow)"/>` + text(item[0], x + 155, 280, 27, colors[index], 750) + multiline(item[1], x + 155, 340, 260, 20, c.text, 550);
    if (index < 2) body += arrow(x + 310, 290, x + 375, 290, colors[index]);
  });
  body += card(110, 470, 980, 90, 'url(#g)') + multiline(t.tokenNote, 600, 505, 900, 18, c.text, 600);
  return base(t.f2, body);
}

function figure3(t) {
  const colors = [c.cyan, c.violet, c.amber, c.aqua, c.cyan, c.violet];
  let body = '';
  t.validation.forEach((item, index) => {
    const col = index % 3, row = Math.floor(index / 3), x = 70 + col * 375, y = 145 + row * 190;
    body += card(x, y, 310, 145, colors[index]) + text(item[0], x + 155, y + 50, 23, colors[index], 750) + multiline(item[1], x + 155, y + 95, 270, 18, c.text, 550);
    if (col < 2) body += arrow(x + 310, y + 72, x + 375, y + 72, colors[index]);
  });
  body += card(120, 530, 960, 70, 'url(#g)') + multiline(t.validationNote, 600, 562, 880, 18, c.text, 600);
  return base(t.f3, body);
}

function fourCards(title, items, note, secondNote = null) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua];
  let body = '';
  items.forEach((item, index) => {
    const x = 40 + index * 290;
    body += card(x, 155, 250, 210, colors[index]) + text(item[0], x + 125, 220, 22, colors[index], 750) + multiline(item[1], x + 125, 285, 205, 17, c.muted, 500);
  });
  if (secondNote) {
    body += card(75, 420, 1050, 62, c.aqua) + multiline(note, 600, 449, 960, 17, c.text, 600);
    body += card(75, 500, 1050, 62, c.violet) + multiline(secondNote, 600, 529, 960, 17, c.text, 600);
  } else {
    body += card(100, 440, 1000, 100, 'url(#g)') + multiline(note, 600, 478, 920, 19, c.text, 600);
  }
  return base(title, body);
}

for (const [locale, t] of Object.entries(copy)) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, { recursive: true });
  const files = {
    'overview.svg': chain(t.overview, t.overviewStages, t.overviewNote),
    'figure-01-flow.svg': figure1(t),
    'figure-02.svg': figure2(t),
    'figure-03.svg': figure3(t),
    'figure-04.svg': fourCards(t.f4, t.sessions, t.sessionsNote),
    'figure-05.svg': fourCards(t.f5, t.logout, t.logoutBack, t.logoutFront),
    'figure-06.svg': chain(t.f6, t.federation, t.federationNote)
  };
  for (const [name, svg] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), svg);
}
console.log('Generated 21 localized OpenID Connect SVGs.');
