import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/assets/learn/openapi-contracts');
const colors = { bg: '#070d22', panel: '#0d1732', line: '#243b69', cyan: '#26d9ff', aqua: '#35f2c1', violet: '#a579ff', amber: '#ffc861', green: '#67e88c', text: '#edf6ff', muted: '#9fb3cd' };

const copy = {
  pt: {
    overviewTitle: 'O contrato OpenAPI como eixo da plataforma',
    stages: [['Design', 'recursos e jornadas'], ['OpenAPI', 'contrato OAS'], ['Qualidade', 'lint e testes'], ['Automação', 'mock, SDK e portal'], ['Execução', 'gateway e backend']],
    contract: 'Contrato executável', contractDetail: 'documentação • validação • segurança • compatibilidade • publicação',
    pipelineTitle: 'Pipeline de contrato: falhar cedo e publicar com evidências',
    pipeline: [['Pull request', 'alteração OAS'], ['Parser', 'estrutura válida'], ['Linter', 'regras internas'], ['Diff', 'compatibilidade'], ['Testes', 'mock e contrato'], ['Publicação', 'portal / gateway']],
    policy: 'operationId único • respostas mínimas • schemas fechados • exemplos válidos • segurança declarada • mudanças sem quebra',
    anatomyTitle: 'Anatomia de uma OpenAPI Description', root: 'OpenAPI Object', rootSub: 'documento raiz',
    anatomy: [['info', 'identidade e versão'], ['servers', 'URLs base'], ['paths', 'operações HTTP'], ['components', 'itens reutilizáveis'], ['security', 'requisitos'], ['tags', 'organização']],
    reuseTitle: 'Reuso com components e $ref', operation: 'paths./clientes.get.responses.200', reference: "$ref: '#/components/responses/ListaClientes'", responses: 'components.responses', response: 'ListaClientes', schema: 'Schema', customer: 'Cliente', detail: 'schema + headers + exemplos',
    governanceTitle: 'Automação, evidência e promoção do contrato', evidence: 'Evidências versionadas', evidenceItems: 'lint • diff • testes • checksum • artefato promovido'
  },
  en: {
    overviewTitle: 'The OpenAPI contract as the platform backbone',
    stages: [['Design', 'resources and journeys'], ['OpenAPI', 'OAS contract'], ['Quality', 'lint and tests'], ['Automation', 'mock, SDK and portal'], ['Execution', 'gateway and backend']],
    contract: 'Executable contract', contractDetail: 'documentation • validation • security • compatibility • publishing',
    pipelineTitle: 'Contract pipeline: fail early and publish with evidence',
    pipeline: [['Pull request', 'OAS change'], ['Parser', 'valid structure'], ['Linter', 'internal rules'], ['Diff', 'compatibility'], ['Tests', 'mock and contract'], ['Publishing', 'portal / gateway']],
    policy: 'unique operationId • minimum responses • closed schemas • valid examples • declared security • non-breaking changes',
    anatomyTitle: 'Anatomy of an OpenAPI Description', root: 'OpenAPI Object', rootSub: 'root document',
    anatomy: [['info', 'identity and version'], ['servers', 'base URLs'], ['paths', 'HTTP operations'], ['components', 'reusable items'], ['security', 'requirements'], ['tags', 'organization']],
    reuseTitle: 'Reuse with components and $ref', operation: 'paths./customers.get.responses.200', reference: "$ref: '#/components/responses/CustomerList'", responses: 'components.responses', response: 'CustomerList', schema: 'Schema', customer: 'Customer', detail: 'schema + headers + examples',
    governanceTitle: 'Contract automation, evidence, and promotion', evidence: 'Versioned evidence', evidenceItems: 'lint • diff • tests • checksum • promoted artifact'
  },
  es: {
    overviewTitle: 'El contrato OpenAPI como eje de la plataforma',
    stages: [['Diseño', 'recursos y recorridos'], ['OpenAPI', 'contrato OAS'], ['Calidad', 'lint y pruebas'], ['Automatización', 'mock, SDK y portal'], ['Ejecución', 'gateway y backend']],
    contract: 'Contrato ejecutable', contractDetail: 'documentación • validación • seguridad • compatibilidad • publicación',
    pipelineTitle: 'Pipeline de contrato: fallar pronto y publicar con evidencias',
    pipeline: [['Pull request', 'cambio OAS'], ['Parser', 'estructura válida'], ['Linter', 'reglas internas'], ['Diff', 'compatibilidad'], ['Pruebas', 'mock y contrato'], ['Publicación', 'portal / gateway']],
    policy: 'operationId único • respuestas mínimas • schemas cerrados • ejemplos válidos • seguridad declarada • cambios sin ruptura',
    anatomyTitle: 'Anatomía de una OpenAPI Description', root: 'OpenAPI Object', rootSub: 'documento raíz',
    anatomy: [['info', 'identidad y versión'], ['servers', 'URLs base'], ['paths', 'operaciones HTTP'], ['components', 'elementos reutilizables'], ['security', 'requisitos'], ['tags', 'organización']],
    reuseTitle: 'Reutilización con components y $ref', operation: 'paths./clientes.get.responses.200', reference: "$ref: '#/components/responses/ListaClientes'", responses: 'components.responses', response: 'ListaClientes', schema: 'Schema', customer: 'Cliente', detail: 'schema + headers + ejemplos',
    governanceTitle: 'Automatización, evidencia y promoción del contrato', evidence: 'Evidencias versionadas', evidenceItems: 'lint • diff • pruebas • checksum • artefacto promovido'
  }
};

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const base = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-label="${esc(title)}"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${colors.cyan}"/><stop offset="1" stop-color="${colors.violet}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="1200" height="620" rx="28" fill="${colors.bg}"/><path d="M0 90H1200M0 530H1200" stroke="${colors.line}" opacity=".35"/><text x="60" y="72" fill="${colors.text}" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700">${esc(title)}</text>${body}</svg>`;
const lines = (text, x, y, width, size = 20, color = colors.text, weight = 600, anchor = 'middle') => {
  const max = Math.max(8, Math.floor(width / (size * .58)));
  const words = String(text).split(/\s+/); const rows = []; let row = '';
  for (const word of words) { const next = row ? `${row} ${word}` : word; if (next.length > max && row) { rows.push(row); row = word; } else row = next; }
  if (row) rows.push(row);
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${rows.map((r, i) => `<tspan x="${x}" dy="${i ? size * 1.25 : 0}">${esc(r)}</tspan>`).join('')}</text>`;
};
const card = (x, y, w, h, stroke = colors.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${colors.panel}" stroke="${stroke}" stroke-width="2"/>`;
const arrow = (x1, y1, x2, y2, color = colors.cyan) => `<path d="M${x1} ${y1}H${x2 - 15}" stroke="${color}" stroke-width="4" filter="url(#glow)"/><path d="M${x2 - 22} ${y2 - 9}L${x2 - 6} ${y2}L${x2 - 22} ${y2 + 9}Z" fill="${color}"/>`;

function overview(t) {
  let body = '';
  t.stages.forEach((stage, i) => { const x = 45 + i * 228; const accent = [colors.violet, colors.cyan, colors.aqua, colors.amber, colors.green][i]; body += card(x, 135, 190, 126, accent) + lines(stage[0], x + 95, 175, 165, 22, colors.text, 700) + lines(stage[1], x + 95, 215, 160, 16, colors.muted, 500); if (i < 4) body += arrow(x + 190, 198, x + 228, 198, accent); });
  body += `<path d="M140 285V350H1060V285" fill="none" stroke="url(#g)" stroke-width="4" filter="url(#glow)"/>` + card(220, 350, 760, 155, colors.aqua) + lines(t.contract, 600, 405, 690, 28, colors.aqua, 700) + lines(t.contractDetail, 600, 455, 680, 19, colors.text, 500);
  return base(t.overviewTitle, body);
}

function pipeline(t, governance = false) {
  let body = '';
  t.pipeline.forEach((stage, i) => { const x = 30 + i * 194; const accent = [colors.violet, colors.cyan, colors.aqua, colors.amber, colors.green, colors.violet][i]; body += card(x, 165, 160, 145, accent) + `<circle cx="${x + 80}" cy="195" r="13" fill="${accent}" filter="url(#glow)"/>` + lines(stage[0], x + 80, 240, 140, 19, colors.text, 700) + lines(stage[1], x + 80, 278, 136, 15, colors.muted, 500); if (i < 5) body += arrow(x + 160, 238, x + 194, 238, accent); });
  body += card(110, 370, 980, 130, governance ? colors.green : colors.cyan) + lines(governance ? t.evidence : 'Políticas típicas', 600, 415, 900, 22, governance ? colors.green : colors.cyan, 700) + lines(governance ? t.evidenceItems : t.policy, 600, 458, 900, 17, colors.text, 500);
  return base(governance ? t.governanceTitle : t.pipelineTitle, body);
}

function anatomy(t) {
  let body = card(430, 225, 340, 170, colors.cyan) + lines(t.root, 600, 285, 300, 27, colors.cyan, 700) + lines(t.rootSub, 600, 335, 280, 18, colors.muted, 500);
  const positions = [[55,140],[310,120],[835,120],[55,410],[310,430],[835,410]];
  t.anatomy.forEach((item,i)=>{const [x,y]=positions[i]; const w=250,h=105; body += card(x,y,w,h,[colors.violet,colors.cyan,colors.amber,colors.aqua,colors.violet,colors.cyan][i]) + lines(item[0],x+w/2,y+38,w-30,20,colors.text,700)+lines(item[1],x+w/2,y+72,w-30,15,colors.muted,500); const sx=x<430?x+w:x; const ex=x<430?430:770; body += `<path d="M${sx} ${y+h/2}L${ex} 310" stroke="${colors.line}" stroke-width="3"/>`;});
  return base(t.anatomyTitle, body);
}

function reuse(t) {
  const body = card(40,180,315,165,colors.cyan)+lines(t.operation,197,235,285,18,colors.text,700)+lines(t.reference,197,290,280,15,colors.cyan,500)+arrow(355,262,445,262)+card(445,155,310,215,colors.violet)+lines(t.responses,600,210,280,19,colors.text,700)+lines(t.response,600,258,260,23,colors.violet,700)+lines(t.detail,600,310,270,16,colors.muted,500)+arrow(755,262,845,262,colors.aqua)+card(845,180,315,165,colors.aqua)+lines(t.schema,1002,235,280,20,colors.text,700)+lines(t.customer,1002,285,280,25,colors.aqua,700)+`<path d="M197 365V470H1002V365" fill="none" stroke="url(#g)" stroke-width="4"/><text x="600" y="510" text-anchor="middle" fill="${colors.muted}" font-family="Inter,Arial,sans-serif" font-size="18">$ref • JSON Pointer • identidade • evolução</text>`;
  return base(t.reuseTitle, body);
}

for (const [locale, t] of Object.entries(copy)) {
  const dir = path.join(root, locale); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'overview.svg'), overview(t));
  fs.writeFileSync(path.join(dir, 'figure-01.svg'), pipeline(t));
  fs.writeFileSync(path.join(dir, 'figure-02.svg'), anatomy(t));
  fs.writeFileSync(path.join(dir, 'figure-03.svg'), reuse(t));
  fs.writeFileSync(path.join(dir, 'figure-04.svg'), pipeline(t, true));
}

console.log('Generated 15 localized OpenAPI SVGs.');
