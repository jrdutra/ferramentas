import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/mtls-in-depth/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const palettes = {
  blue: ['#0b1732', '#0d2b55', '#21d4fd', '#e9f8ff'],
  violet: ['#0b1732', '#25175a', '#a855f7', '#f5ecff'],
  green: ['#0b1732', '#123c42', '#34d399', '#ecfdf5'],
  amber: ['#0b1732', '#4b3212', '#fbbf24', '#fff8df'],
};

const locales = {
  pt: {
    overview: ['Autenticação mútua no caminho corporativo', 'Consumidor', 'Certificado', 'Borda / WAF', 'Cadeia confiável', 'API Gateway', 'Política e autorização', 'Backend', 'Nova sessão TLS'],
    f1: ['TLS unilateral', 'Cliente', 'Servidor', 'valida o servidor', 'mutual TLS', 'validação mútua'],
    f2: ['Handshake mTLS no TLS 1.3', 'Cliente', 'Servidor', 'ClientHello', 'ServerHello + CertificateRequest', 'Certificado do servidor', 'Certificado do cliente', 'CertificateVerify', 'Finished'],
    f3: ['Validação do certificado do cliente', 'Certificado', 'Cadeia', 'Tempo', 'Uso', 'Identidade', 'Revogação', 'Cadastro', 'Aceito'],
    f6: ['Identidade de workload na service mesh', 'Workload A', 'Sidecar', 'mTLS + identidade', 'Sidecar', 'Workload B', 'Plano de controle', 'Certificado curto'],
    f7: ['Token OAuth vinculado a certificado', 'Cliente OAuth', 'Servidor de autorização', 'Resource server', 'mTLS', 'token certificate-bound', 'prova de posse'],
    f8: ['Ciclo de vida operacional', 'Bootstrap', 'Emitir', 'Distribuir', 'Usar', 'Renovar', 'Revogar', 'Observar'],
    f9: ['Troubleshooting de mTLS', 'TCP estabelecido?', 'Handshake concluiu?', 'Certificado enviado?', 'Cadeia válida?', 'Autorização passou?', 'Corrigir rede', 'Revisar TLS', 'Revisar credencial', 'Revisar truststore', 'Revisar política'],
    f10: ['Integração de pagamentos B2B', 'Parceiro', 'WAF / Borda', 'API Gateway', 'Serviço de pagamento', 'Auditoria', 'mTLS externo', 'mTLS interno', 'Identidade + token'],
  },
  en: {
    overview: ['Mutual authentication across the enterprise path', 'Consumer', 'Certificate', 'Edge / WAF', 'Trusted chain', 'API Gateway', 'Policy & authorization', 'Backend', 'New TLS session'],
    f1: ['Unilateral TLS', 'Client', 'Server', 'validates server', 'mutual TLS', 'mutual validation'],
    f2: ['mTLS handshake in TLS 1.3', 'Client', 'Server', 'ClientHello', 'ServerHello + CertificateRequest', 'Server certificate', 'Client certificate', 'CertificateVerify', 'Finished'],
    f3: ['Client certificate validation', 'Certificate', 'Chain', 'Time', 'Usage', 'Identity', 'Revocation', 'Registry', 'Accepted'],
    f6: ['Workload identity in the service mesh', 'Workload A', 'Sidecar', 'mTLS + identity', 'Sidecar', 'Workload B', 'Control plane', 'Short-lived certificate'],
    f7: ['Certificate-bound OAuth token', 'OAuth client', 'Authorization server', 'Resource server', 'mTLS', 'certificate-bound token', 'proof of possession'],
    f8: ['Operational lifecycle', 'Bootstrap', 'Issue', 'Distribute', 'Use', 'Renew', 'Revoke', 'Observe'],
    f9: ['mTLS troubleshooting', 'TCP established?', 'Handshake complete?', 'Certificate sent?', 'Valid chain?', 'Authorization passed?', 'Fix network', 'Review TLS', 'Review credential', 'Review truststore', 'Review policy'],
    f10: ['B2B payment integration', 'Partner', 'WAF / Edge', 'API Gateway', 'Payment service', 'Audit', 'External mTLS', 'Internal mTLS', 'Identity + token'],
  },
  es: {
    overview: ['Autenticación mutua en la ruta empresarial', 'Consumidor', 'Certificado', 'Borde / WAF', 'Cadena confiable', 'API Gateway', 'Política y autorización', 'Backend', 'Nueva sesión TLS'],
    f1: ['TLS unilateral', 'Cliente', 'Servidor', 'valida el servidor', 'mutual TLS', 'validación mutua'],
    f2: ['Handshake mTLS en TLS 1.3', 'Cliente', 'Servidor', 'ClientHello', 'ServerHello + CertificateRequest', 'Certificado del servidor', 'Certificado del cliente', 'CertificateVerify', 'Finished'],
    f3: ['Validación del certificado del cliente', 'Certificado', 'Cadena', 'Tiempo', 'Uso', 'Identidad', 'Revocación', 'Registro', 'Aceptado'],
    f6: ['Identidad de workload en la service mesh', 'Workload A', 'Sidecar', 'mTLS + identidad', 'Sidecar', 'Workload B', 'Plano de control', 'Certificado de corta duración'],
    f7: ['Token OAuth vinculado a certificado', 'Cliente OAuth', 'Servidor de autorización', 'Resource server', 'mTLS', 'token certificate-bound', 'prueba de posesión'],
    f8: ['Ciclo de vida operativo', 'Bootstrap', 'Emitir', 'Distribuir', 'Usar', 'Renovar', 'Revocar', 'Observar'],
    f9: ['Troubleshooting de mTLS', '¿TCP establecido?', '¿Handshake completo?', '¿Certificado enviado?', '¿Cadena válida?', '¿Autorización aprobada?', 'Corregir red', 'Revisar TLS', 'Revisar credencial', 'Revisar truststore', 'Revisar política'],
    f10: ['Integración de pagos B2B', 'Socio', 'WAF / Borde', 'API Gateway', 'Servicio de pagos', 'Auditoría', 'mTLS externo', 'mTLS interno', 'Identidad + token'],
  },
};

const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function defs() {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071126"/><stop offset="1" stop-color="#111c3f"/></linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#21d4fd"/><stop offset="1" stop-color="#a855f7"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#55dcff"/></marker>
  </defs>`;
}

function frame(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}">
    ${defs()}<rect width="1200" height="620" rx="34" fill="url(#bg)"/>
    <path d="M40 102H1160" stroke="#243e72" stroke-width="2"/><text x="60" y="70" fill="#f2f7ff" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700">${esc(title)}</text>
    ${body}</svg>`;
}

function node(x, y, w, h, label, theme = 'blue', size = 22) {
  const [bg, fill, stroke, text] = palettes[theme];
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${fill}" stroke="${stroke}" stroke-width="3"/><rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="14" fill="${bg}" opacity=".45"/><text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" fill="${text}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="650">${esc(label)}</text></g>`;
}

function arrow(x1, y1, x2, y2, label = '', both = false) {
  return `<g><path d="M${x1} ${y1}L${x2} ${y2}" stroke="url(#line)" stroke-width="5" fill="none" marker-end="url(#arrow)" ${both ? 'marker-start="url(#arrow)"' : ''} filter="url(#glow)"/>${label ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 16}" text-anchor="middle" fill="#d9f7ff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="600">${esc(label)}</text>` : ''}</g>`;
}

function label(x, y, value, size = 18, color = '#d9f7ff') {
  return `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="600">${esc(value)}</text>`;
}

function overview(l) {
  const [title, consumer, cert, edge, chain, gateway, policy, backend, session] = l;
  return frame(title,
    node(55, 278, 220, 120, consumer, 'blue') + node(330, 278, 220, 120, edge, 'violet') +
    node(650, 278, 240, 120, gateway, 'blue') + node(970, 278, 180, 120, backend, 'green') +
    arrow(275, 338, 330, 338) + arrow(550, 338, 650, 338) + arrow(890, 338, 970, 338) +
    label(302, 254, cert) + label(600, 254, chain) + label(930, 254, session) +
    `<path d="M720 176l50-38 50 38v52c0 43-26 73-50 86-24-13-50-43-50-86z" fill="#0d2b55" stroke="#34d399" stroke-width="4"/><path d="M752 211v-13a18 18 0 0136 0v13" fill="none" stroke="#e9f8ff" stroke-width="5"/><rect x="744" y="211" width="52" height="43" rx="9" fill="#21d4fd"/><text x="770" y="452" text-anchor="middle" fill="#c4b5fd" font-family="Inter,Arial,sans-serif" font-size="22">${esc(policy)}</text>`);
}

function unilateral(l) {
  const [left, client, server, validates, right, mutual] = l;
  return frame(`${left} × ${right}`,
    `<text x="300" y="150" text-anchor="middle" fill="#8be8ff" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="700">${esc(left)}</text>` +
    node(80, 230, 180, 105, client) + node(340, 230, 180, 105, server, 'green') + arrow(260, 282, 340, 282) + label(300, 210, validates) +
    `<text x="900" y="150" text-anchor="middle" fill="#c4b5fd" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="700">${esc(right)}</text>` +
    node(680, 230, 180, 105, client, 'violet') + node(940, 230, 180, 105, server, 'green') + arrow(860, 282, 940, 282, '', true) + label(900, 210, mutual));
}

function sequence(l) {
  const [title, client, server, ...messages] = l;
  let body = node(120, 120, 190, 75, client) + node(890, 120, 190, 75, server, 'green');
  body += `<path d="M215 200V570M985 200V570" stroke="#416190" stroke-width="3" stroke-dasharray="10 10"/>`;
  messages.forEach((message, index) => {
    const y = 235 + index * 52;
    const reverse = index === 0 || index >= 3;
    body += reverse ? arrow(225, y, 975, y, message) : arrow(975, y, 225, y, message);
  });
  return frame(title, body);
}

function pipeline(l) {
  const [title, ...steps] = l;
  const widths = [140, 110, 100, 100, 135, 130, 120, 110];
  let x = 35;
  let body = '';
  steps.forEach((step, i) => {
    const w = widths[i];
    body += node(x, 245, w, 110, step, i === steps.length - 1 ? 'green' : i % 2 ? 'violet' : 'blue', i === 5 ? 17 : 18);
    if (i < steps.length - 1) body += arrow(x + w, 300, x + w + 22, 300);
    x += w + 22;
  });
  return frame(title, body);
}

function mesh(l) {
  const [title, wa, sa, channel, sb, wb, control, short] = l;
  return frame(title,
    node(45, 270, 180, 105, wa, 'blue') + node(260, 270, 160, 105, sa, 'violet') +
    node(780, 270, 160, 105, sb, 'violet') + node(975, 270, 180, 105, wb, 'green') +
    arrow(420, 322, 780, 322, channel, true) + node(470, 125, 260, 100, control, 'amber') +
    arrow(545, 225, 340, 270) + arrow(655, 225, 860, 270) + label(340, 248, short, 17) + label(860, 248, short, 17));
}

function oauth(l) {
  const [title, client, auth, resource, mtls, token, proof] = l;
  return frame(title,
    node(55, 245, 230, 120, client, 'blue') + node(480, 145, 250, 120, auth, 'violet') +
    node(915, 245, 230, 120, resource, 'green') + arrow(285, 285, 480, 205) +
    arrow(730, 205, 915, 285) + arrow(285, 330, 915, 330) + label(370, 180, mtls) + label(830, 180, token, 17) + label(600, 390, proof));
}

function lifecycle(l) {
  const [title, ...steps] = l;
  const points = [[600,150],[830,220],[900,420],[710,510],[490,510],[300,420],[370,220]];
  let body = '';
  steps.forEach((_step, i) => {
    const [x,y] = points[i]; const [nx,ny] = points[(i+1)%points.length];
    body += arrow(x,y,nx,ny);
  });
  steps.forEach((step, i) => {
    const [x,y] = points[i];
    body += node(x-95,y-42,190,84,step,i%2?'violet':'blue',20);
  });
  body += `<circle cx="600" cy="335" r="80" fill="#0d2b55" stroke="#34d399" stroke-width="4"/><path d="M565 335h70M600 300v70" stroke="#e9f8ff" stroke-width="7" stroke-linecap="round"/>`;
  return frame(title, body);
}

function troubleshooting(l) {
  const [title, a,b,c,d,e,na,nb,nc,nd,ne] = l;
  const questions=[a,b,c,d,e], fixes=[na,nb,nc,nd,ne]; let body='';
  questions.forEach((q,i)=>{ const x=35+i*232; body+=node(x,150,205,92,q,'blue',18)+node(x,420,205,82,fixes[i],'amber',18)+arrow(x+102,242,x+102,420)+label(x+102,385,'×',24,'#fbbf24'); if(i<4) body+=arrow(x+205,196,x+232,196)+label(x+218,135,'✓',22,'#34d399'); });
  return frame(title,body);
}

function caseStudy(l) {
  const [title, partner,waf,gateway,service,audit,external,internal,context]=l;
  return frame(title,
    node(30,250,190,110,partner,'blue')+node(270,250,190,110,waf,'violet')+node(520,230,210,150,gateway,'blue')+node(790,250,210,110,service,'green')+node(1040,250,130,110,audit,'amber',19)+
    arrow(220,305,270,305)+arrow(460,305,520,305)+arrow(730,305,790,305)+arrow(1000,305,1040,305)+
    label(245,220,external,17)+label(490,220,context,17)+label(760,220,internal,17));
}

const builders = {
  'overview.svg': (d) => overview(d.overview),
  'figure-01.svg': (d) => unilateral(d.f1),
  'figure-02.svg': (d) => sequence(d.f2),
  'figure-03.svg': (d) => pipeline(d.f3),
  'figure-06.svg': (d) => mesh(d.f6),
  'figure-07.svg': (d) => oauth(d.f7),
  'figure-08.svg': (d) => lifecycle(d.f8),
  'figure-09.svg': (d) => troubleshooting(d.f9),
  'figure-10.svg': (d) => caseStudy(d.f10),
};

for (const [locale, dictionary] of Object.entries(locales)) {
  const dir = join(root, locale);
  mkdirSync(dir, { recursive: true });
  for (const [filename, build] of Object.entries(builders)) {
    writeFileSync(join(dir, filename), build(dictionary), 'utf8');
  }
}

console.log(`Generated ${Object.keys(builders).length * Object.keys(locales).length} localized mTLS SVGs.`);
