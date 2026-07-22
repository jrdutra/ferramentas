import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/jwt-jws-jwe-jose-in-depth');
const c = { bg: '#070d22', panel: '#0d1732', line: '#29436f', cyan: '#27d8ff', aqua: '#35f2c1', violet: '#bc78ff', amber: '#ffbd59', red: '#ff6f91', text: '#eff7ff', muted: '#a9bbd1' };
const copy = {
  pt: {
    overview: 'Ciclo criptográfico de um token em uma arquitetura de APIs',
    overviewNodes: [['Emissor', 'claims e chave privada'], ['JWS / JWT', 'header, payload e assinatura'], ['API Gateway', 'validação e política'], ['Backend', 'autorização de domínio']],
    overviewJwe: 'JWE quando há requisito real de confidencialidade do conteúdo',
    overviewNote: 'Assinatura protege integridade e origem; criptografia protege leitura. Nenhuma delas substitui validação de issuer, audience e finalidade.',
    f1: 'Família JOSE: estruturas com responsabilidades diferentes',
    family: [['JWT', 'conjunto de claims'], ['JWS', 'assinatura ou MAC'], ['JWE', 'criptografia autenticada'], ['JWK / JWKS', 'representação de chaves'], ['JWA', 'algoritmos e identificadores']],
    familyNote: 'Um JWT pode ser transportado como JWS, JWE ou estrutura aninhada. O nome do token não define sozinho algoritmo, destinatário ou confiança.',
    f2: 'JWS Compact Serialization: três partes e um signing input',
    jws: [['Protected header', 'alg, kid, typ'], ['Payload', 'claims ou bytes'], ['Signature', 'resultado criptográfico']],
    signing: 'signing input = BASE64URL(UTF8(protected header)) + "." + BASE64URL(payload)',
    jwsNote: 'A verificação reconstrói exatamente os bytes assinados; decodificar e serializar novamente pode alterar o resultado.',
    f3: 'Rotação de chaves sem interrupção',
    rotation: [['T0', 'JWKS publica K1'], ['T1', 'JWKS publica K1 e K2'], ['T2', 'emissor assina com K2'], ['T3', 'K1 sai após expiração']],
    rotationNote: 'A sobreposição precisa superar cache, propagação, vida máxima dos tokens e tolerância operacional.',
    unknownKid: 'kid desconhecido pode iniciar atualização controlada, nunca busca irrestrita indicada pelo token.',
    f4: 'JWE Compact Serialization: cinco partes',
    jwe: [['Protected', 'alg, enc, kid'], ['Encrypted Key', 'CEK protegida'], ['IV', 'nonce criptográfico'], ['Ciphertext', 'conteúdo cifrado'], ['Tag', 'autenticidade']],
    jweNote: 'alg protege ou estabelece a CEK; enc cifra o conteúdo com criptografia autenticada.',
    tagNote: 'Valide a tag antes de usar o plaintext. Uma falha de autenticação encerra o processamento.',
    f5: 'Pipeline de validação de JWT em um resource server',
    validation: [['Tipo', 'typ e perfil'], ['Emissor', 'iss permitido'], ['Algoritmo', 'allowlist'], ['Chave', 'kid e JWKS'], ['Criptografia', 'assinatura ou tag'], ['Semântica', 'aud, exp, claims']],
    validationNote: 'Somente após todas as etapas o token pode alimentar autenticação e autorização. Decodificação isolada não cria confiança.',
  },
  en: {
    overview: 'Cryptographic token lifecycle in an API architecture',
    overviewNodes: [['Issuer', 'claims and private key'], ['JWS / JWT', 'header, payload, and signature'], ['API Gateway', 'validation and policy'], ['Backend', 'domain authorization']],
    overviewJwe: 'JWE when content confidentiality is a genuine requirement',
    overviewNote: 'A signature protects integrity and origin; encryption protects readability. Neither replaces issuer, audience, and purpose validation.',
    f1: 'JOSE family: structures with different responsibilities',
    family: [['JWT', 'claims set'], ['JWS', 'signature or MAC'], ['JWE', 'authenticated encryption'], ['JWK / JWKS', 'key representation'], ['JWA', 'algorithms and identifiers']],
    familyNote: 'A JWT can be carried as a JWS, JWE, or nested structure. The token name alone does not define algorithm, recipient, or trust.',
    f2: 'JWS Compact Serialization: three parts and a signing input',
    jws: [['Protected header', 'alg, kid, typ'], ['Payload', 'claims or bytes'], ['Signature', 'cryptographic result']],
    signing: 'signing input = BASE64URL(UTF8(protected header)) + "." + BASE64URL(payload)',
    jwsNote: 'Verification reconstructs the exact signed bytes; decoding and serializing again can change the result.',
    f3: 'Key rotation without interruption',
    rotation: [['T0', 'JWKS publishes K1'], ['T1', 'JWKS publishes K1 and K2'], ['T2', 'issuer signs with K2'], ['T3', 'K1 leaves after expiration']],
    rotationNote: 'Overlap must exceed cache, propagation, maximum token lifetime, and operational tolerance.',
    unknownKid: 'An unknown kid may trigger a controlled refresh, never an unrestricted lookup directed by the token.',
    f4: 'JWE Compact Serialization: five parts',
    jwe: [['Protected', 'alg, enc, kid'], ['Encrypted Key', 'protected CEK'], ['IV', 'cryptographic nonce'], ['Ciphertext', 'encrypted content'], ['Tag', 'authenticity']],
    jweNote: 'alg protects or establishes the CEK; enc encrypts content with authenticated encryption.',
    tagNote: 'Validate the tag before using plaintext. An authentication failure ends processing.',
    f5: 'JWT validation pipeline in a resource server',
    validation: [['Type', 'typ and profile'], ['Issuer', 'allowed iss'], ['Algorithm', 'allowlist'], ['Key', 'kid and JWKS'], ['Cryptography', 'signature or tag'], ['Semantics', 'aud, exp, claims']],
    validationNote: 'Only after every stage can the token support authentication and authorization. Decoding alone creates no trust.',
  },
  es: {
    overview: 'Ciclo criptográfico de un token en una arquitectura de APIs',
    overviewNodes: [['Issuer', 'claims y clave privada'], ['JWS / JWT', 'header, payload y firma'], ['API Gateway', 'validación y política'], ['Backend', 'autorización de dominio']],
    overviewJwe: 'JWE cuando existe un requisito real de confidencialidad del contenido',
    overviewNote: 'La firma protege integridad y origen; el cifrado protege la lectura. Ninguno sustituye la validación de issuer, audience y finalidad.',
    f1: 'Familia JOSE: estructuras con responsabilidades diferentes',
    family: [['JWT', 'conjunto de claims'], ['JWS', 'firma o MAC'], ['JWE', 'cifrado autenticado'], ['JWK / JWKS', 'representación de claves'], ['JWA', 'algoritmos e identificadores']],
    familyNote: 'Un JWT puede transportarse como JWS, JWE o estructura anidada. El nombre del token no define por sí solo algoritmo, destinatario o confianza.',
    f2: 'JWS Compact Serialization: tres partes y un signing input',
    jws: [['Protected header', 'alg, kid, typ'], ['Payload', 'claims o bytes'], ['Signature', 'resultado criptográfico']],
    signing: 'signing input = BASE64URL(UTF8(protected header)) + "." + BASE64URL(payload)',
    jwsNote: 'La verificación reconstruye exactamente los bytes firmados; decodificar y serializar de nuevo puede alterar el resultado.',
    f3: 'Rotación de claves sin interrupción',
    rotation: [['T0', 'JWKS publica K1'], ['T1', 'JWKS publica K1 y K2'], ['T2', 'issuer firma con K2'], ['T3', 'K1 sale tras la expiración']],
    rotationNote: 'La superposición debe superar cache, propagación, vida máxima de los tokens y tolerancia operativa.',
    unknownKid: 'Un kid desconocido puede iniciar una actualización controlada, nunca una búsqueda irrestricta indicada por el token.',
    f4: 'JWE Compact Serialization: cinco partes',
    jwe: [['Protected', 'alg, enc, kid'], ['Encrypted Key', 'CEK protegida'], ['IV', 'nonce criptográfico'], ['Ciphertext', 'contenido cifrado'], ['Tag', 'autenticidad']],
    jweNote: 'alg protege o establece la CEK; enc cifra el contenido con cifrado autenticado.',
    tagNote: 'Valide la tag antes de usar el plaintext. Un fallo de autenticación termina el procesamiento.',
    f5: 'Pipeline de validación de JWT en un resource server',
    validation: [['Tipo', 'typ y perfil'], ['Issuer', 'iss permitido'], ['Algoritmo', 'allowlist'], ['Clave', 'kid y JWKS'], ['Criptografía', 'firma o tag'], ['Semántica', 'aud, exp, claims']],
    validationNote: 'Solo después de todas las etapas el token puede alimentar autenticación y autorización. La decodificación aislada no crea confianza.',
  },
};

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const wrapLines = (value, width, size) => {
  const max = Math.max(10, Math.floor(width / (size * .55)));
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
  const firstY = y - ((rows.length - 1) * size * .63);
  return `<text x="${x}" y="${firstY}" text-anchor="${anchor}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${rows.map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.28 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
};
const baseSvg = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 660" role="img" aria-label="${esc(title)}"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${c.violet}"/><stop offset=".5" stop-color="${c.cyan}"/><stop offset="1" stop-color="${c.aqua}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs><rect width="1200" height="660" rx="28" fill="${c.bg}"/><path d="M0 105H1200M0 605H1200" stroke="${c.line}" opacity=".35"/>${multiline(title, 600, 55, 1080, 27, c.text, 750)}${body}</svg>`;
const card = (x, y, w, h, stroke = c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c.panel}" stroke="${stroke}" stroke-width="2"/>`;
const arrow = (x1, y1, x2, y2, color = c.cyan) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" marker-end="url(#arrow)" filter="url(#glow)"/>`;

function chain(title, items, note, options = {}) {
  const colors = [c.cyan, c.amber, c.violet, c.aqua, c.cyan, c.violet];
  const gap = options.gap ?? 16;
  const left = 35;
  const total = 1130;
  const width = (total - gap * (items.length - 1)) / items.length;
  const y = options.y ?? 155;
  const h = options.h ?? 220;
  let body = '';
  items.forEach((item, index) => {
    const x = left + index * (width + gap);
    body += card(x, y, width, h, colors[index]);
    body += `<circle cx="${x + width / 2}" cy="${y + 38}" r="9" fill="${colors[index]}" filter="url(#glow)"/>`;
    body += multiline(item[0], x + width / 2, y + 92, width - 24, options.titleSize ?? 20, colors[index], 750);
    body += multiline(item[1], x + width / 2, y + 158, width - 22, options.bodySize ?? 16, c.muted, 550);
    if (index < items.length - 1) body += arrow(x + width, y + h / 2, x + width + gap, y + h / 2, colors[index]);
  });
  body += card(90, 440, 1020, 112, 'url(#g)') + multiline(note, 600, 496, 930, 18, c.text, 600);
  return baseSvg(title, body);
}

function overview(t) {
  const colors = [c.cyan, c.violet, c.amber, c.aqua];
  let body = '';
  t.overviewNodes.forEach((item, index) => {
    const x = 45 + index * 285;
    body += card(x, 145, 245, 160, colors[index]) + multiline(item[0], x + 122.5, 195, 215, 21, colors[index], 750) + multiline(item[1], x + 122.5, 255, 210, 16, c.muted, 550);
    if (index < 3) body += arrow(x + 245, 225, x + 285, 225, colors[index]);
  });
  body += card(110, 350, 980, 70, c.amber) + multiline(t.overviewJwe, 600, 385, 900, 19, c.amber, 700);
  body += card(75, 465, 1050, 100, 'url(#g)') + multiline(t.overviewNote, 600, 515, 950, 18, c.text, 600);
  return baseSvg(t.overview, body);
}

function jws(t) {
  let body = '';
  const colors = [c.cyan, c.violet, c.amber];
  t.jws.forEach((item, i) => {
    const x = 70 + i * 375;
    body += card(x, 145, 310, 180, colors[i]) + multiline(item[0], x + 155, 205, 275, 21, colors[i], 750) + multiline(item[1], x + 155, 270, 260, 18, c.text, 600);
    if (i < 2) body += `<text x="${x + 342}" y="245" text-anchor="middle" fill="${c.text}" font-size="34" font-weight="800">.</text>`;
  });
  body += card(75, 365, 1050, 62, c.cyan) + multiline(t.signing, 600, 396, 980, 17, c.text, 650);
  body += card(100, 465, 1000, 92, 'url(#g)') + multiline(t.jwsNote, 600, 511, 910, 18, c.text, 600);
  return baseSvg(t.f2, body);
}

function rotation(t) {
  let body = '';
  const colors = [c.cyan, c.aqua, c.violet, c.amber];
  t.rotation.forEach((item, i) => {
    const x = 50 + i * 285;
    body += card(x, 145, 245, 165, colors[i]) + multiline(item[0], x + 122.5, 190, 200, 22, colors[i], 800) + multiline(item[1], x + 122.5, 255, 210, 17, c.text, 600);
    if (i < 3) body += arrow(x + 245, 225, x + 285, 225, colors[i]);
  });
  body += card(75, 360, 1050, 80, c.aqua) + multiline(t.rotationNote, 600, 400, 960, 18, c.text, 600);
  body += card(75, 475, 1050, 80, c.amber) + multiline(t.unknownKid, 600, 515, 960, 18, c.text, 600);
  return baseSvg(t.f3, body);
}

function jwe(t) {
  let body = '';
  const colors = [c.cyan, c.violet, c.aqua, c.amber, c.red];
  const gap = 14, w = (1130 - gap * 4) / 5;
  t.jwe.forEach((item, i) => {
    const x = 35 + i * (w + gap);
    body += card(x, 140, w, 190, colors[i]) + multiline(item[0], x + w / 2, 195, w - 20, 18, colors[i], 750) + multiline(item[1], x + w / 2, 265, w - 20, 16, c.text, 600);
    if (i < 4) body += `<text x="${x + w + gap / 2}" y="245" text-anchor="middle" fill="${c.text}" font-size="30" font-weight="800">.</text>`;
  });
  body += card(80, 380, 1040, 72, c.cyan) + multiline(t.jweNote, 600, 416, 950, 18, c.text, 600);
  body += card(80, 485, 1040, 72, c.amber) + multiline(t.tagNote, 600, 521, 950, 18, c.text, 600);
  return baseSvg(t.f4, body);
}

for (const [locale, t] of Object.entries(copy)) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, { recursive: true });
  const files = {
    'overview.svg': overview(t),
    'figure-01-jose-family.svg': chain(t.f1, t.family, t.familyNote, { titleSize: 20, bodySize: 16 }),
    'figure-02-jws-compact.svg': jws(t),
    'figure-03-key-rotation.svg': rotation(t),
    'figure-04-jwe-compact.svg': jwe(t),
    'figure-05-validation-pipeline.svg': chain(t.f5, t.validation, t.validationNote, { titleSize: 18, bodySize: 15 }),
  };
  for (const [filename, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, filename), svg, 'utf8');
  }
}

console.log('Generated 18 localized JOSE SVGs.');
