/**
 * Best-effort conversion between Swagger 2.0, OpenAPI 3.0 and OpenAPI 3.1.
 * The goal is a faithful, editable adaptation of the document — not a
 * byte-perfect migration of every corner case of the specifications.
 */

export type SwaggerVersion = '2.0' | '3.0' | '3.1';

export const SWAGGER_VERSIONS: { id: SwaggerVersion; nome: string }[] = [
  { id: '2.0', nome: 'Swagger 2.0' },
  { id: '3.0', nome: 'OpenAPI 3.0' },
  { id: '3.1', nome: 'OpenAPI 3.1' }
];

export const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'] as const;

export function detectVersion(spec: any): SwaggerVersion | null {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) return null;
  if (typeof spec.swagger === 'string' && spec.swagger.startsWith('2')) return '2.0';
  if (typeof spec.openapi === 'string') {
    if (spec.openapi.startsWith('3.1')) return '3.1';
    if (spec.openapi.startsWith('3.')) return '3.0';
  }
  // Tolerate numbers (YAML may parse `swagger: 2.0` as a number).
  if (spec.swagger !== undefined && String(spec.swagger).startsWith('2')) return '2.0';
  return null;
}

export function convertSpec(spec: any, target: SwaggerVersion): any {
  const from = detectVersion(spec);
  if (!from || from === target) return spec;
  const order: SwaggerVersion[] = ['2.0', '3.0', '3.1'];
  let current = clone(spec);
  let i = order.indexOf(from);
  const j = order.indexOf(target);
  while (i < j) {
    current = i === 0 ? v2ToV30(current) : v30ToV31(current);
    i++;
  }
  while (i > j) {
    current = i === 2 ? v31ToV30(current) : v30ToV2(current);
    i--;
  }
  return current;
}

function clone<T>(value: T): T {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function isObj(v: any): boolean {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

/** Walks the whole tree rewriting `$ref` values with the given replacements. */
function rewriteRefs(node: any, map: [string, string][]): void {
  if (Array.isArray(node)) {
    node.forEach((item) => rewriteRefs(item, map));
    return;
  }
  if (!isObj(node)) return;
  if (typeof node['$ref'] === 'string') {
    for (const [from, to] of map) {
      if (node['$ref'].startsWith(from)) {
        node['$ref'] = to + node['$ref'].substring(from.length);
        break;
      }
    }
  }
  Object.values(node).forEach((value) => rewriteRefs(value, map));
}

/** Applies fn to every object node of the tree (bottom-up). */
function walkObjects(node: any, fn: (obj: Record<string, any>) => void): void {
  if (Array.isArray(node)) {
    node.forEach((item) => walkObjects(item, fn));
    return;
  }
  if (!isObj(node)) return;
  Object.values(node).forEach((value) => walkObjects(value, fn));
  fn(node);
}

const PARAM_SCHEMA_KEYS = [
  'type', 'format', 'items', 'enum', 'default', 'maximum', 'exclusiveMaximum', 'minimum',
  'exclusiveMinimum', 'maxLength', 'minLength', 'pattern', 'maxItems', 'minItems',
  'uniqueItems', 'multipleOf'
];

// ───────────────────────── Swagger 2.0 → OpenAPI 3.0 ─────────────────────────

function v2ToV30(v2: any): any {
  const out: any = { openapi: '3.0.3', info: clone(v2.info) ?? { title: 'API', version: '1.0.0' } };

  const schemes: string[] = Array.isArray(v2.schemes) && v2.schemes.length ? v2.schemes : ['https'];
  if (v2.host) {
    out.servers = schemes.map((s: string) => ({ url: `${s}://${v2.host}${v2.basePath ?? ''}` }));
  } else if (v2.basePath) {
    out.servers = [{ url: v2.basePath }];
  }

  if (v2.tags) out.tags = clone(v2.tags);
  if (v2.externalDocs) out.externalDocs = clone(v2.externalDocs);

  const rootConsumes: string[] = Array.isArray(v2.consumes) ? v2.consumes : [];
  const rootProduces: string[] = Array.isArray(v2.produces) ? v2.produces : [];

  out.paths = {};
  for (const [path, item] of Object.entries<any>(v2.paths ?? {})) {
    if (!isObj(item)) continue;
    const newItem: any = {};
    if (item.parameters) {
      const converted = (item.parameters as any[]).map((p) => convertParamTo3(p, rootConsumes));
      newItem.parameters = converted.filter((c) => !c.__requestBody).map((c) => c.param);
    }
    for (const method of HTTP_METHODS) {
      if (isObj(item[method])) {
        newItem[method] = convertOperationTo3(item[method], rootConsumes, rootProduces);
      }
    }
    out.paths[path] = newItem;
  }

  const components: any = {};
  if (v2.definitions) components.schemas = clone(v2.definitions);
  if (v2.parameters) {
    components.parameters = {};
    for (const [name, p] of Object.entries<any>(v2.parameters)) {
      const converted = convertParamTo3(p, rootConsumes);
      if (converted.__requestBody) {
        components.requestBodies = components.requestBodies ?? {};
        components.requestBodies[name] = converted.requestBody;
      } else {
        components.parameters[name] = converted.param;
      }
    }
  }
  if (v2.responses) {
    components.responses = {};
    for (const [name, r] of Object.entries<any>(v2.responses)) {
      components.responses[name] = convertResponseTo3(r, rootProduces);
    }
  }
  if (v2.securityDefinitions) {
    components.securitySchemes = {};
    for (const [name, sec] of Object.entries<any>(v2.securityDefinitions)) {
      components.securitySchemes[name] = convertSecurityTo3(sec);
    }
  }
  if (Object.keys(components).length) out.components = components;
  if (v2.security) out.security = clone(v2.security);

  walkObjects(out, fixSchemaTo3);
  rewriteRefs(out, [
    ['#/definitions/', '#/components/schemas/'],
    ['#/parameters/', '#/components/parameters/'],
    ['#/responses/', '#/components/responses/']
  ]);
  return out;
}

function fixSchemaTo3(obj: Record<string, any>): void {
  if (obj['type'] === 'file') {
    obj['type'] = 'string';
    obj['format'] = 'binary';
  }
  delete obj['collectionFormat'];
}

function convertOperationTo3(op: any, rootConsumes: string[], rootProduces: string[]): any {
  const out: any = {};
  for (const key of ['tags', 'summary', 'description', 'externalDocs', 'operationId', 'deprecated', 'security']) {
    if (op[key] !== undefined) out[key] = clone(op[key]);
  }
  const consumes: string[] = Array.isArray(op.consumes) && op.consumes.length ? op.consumes : rootConsumes;
  const produces: string[] = Array.isArray(op.produces) && op.produces.length ? op.produces : rootProduces;

  const params: any[] = [];
  const formProps: Record<string, any> = {};
  const formRequired: string[] = [];
  let hasFile = false;

  for (const p of op.parameters ?? []) {
    if (isObj(p) && p.in === 'formData') {
      const schema: any = {};
      for (const key of PARAM_SCHEMA_KEYS) if (p[key] !== undefined) schema[key] = clone(p[key]);
      if (p.type === 'file') { schema.type = 'string'; schema.format = 'binary'; hasFile = true; }
      if (p.description) schema.description = p.description;
      formProps[p.name] = schema;
      if (p.required) formRequired.push(p.name);
      continue;
    }
    const converted = convertParamTo3(p, consumes);
    if (converted.__requestBody) {
      out.requestBody = converted.requestBody;
    } else {
      params.push(converted.param);
    }
  }

  if (Object.keys(formProps).length) {
    const contentType = hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded';
    const schema: any = { type: 'object', properties: formProps };
    if (formRequired.length) schema.required = formRequired;
    out.requestBody = { content: { [contentType]: { schema } } };
  }
  if (params.length) out.parameters = params;

  out.responses = {};
  for (const [code, resp] of Object.entries<any>(op.responses ?? {})) {
    out.responses[code] = convertResponseTo3(resp, produces);
  }
  return out;
}

function convertParamTo3(p: any, consumes: string[]): any {
  if (!isObj(p)) return { param: clone(p) };
  if (p['$ref']) return { param: clone(p) };
  if (p.in === 'body') {
    const contentType = consumes.length ? consumes[0] : 'application/json';
    const requestBody: any = { content: { [contentType]: { schema: clone(p.schema) ?? {} } } };
    if (p.description) requestBody.description = p.description;
    if (p.required) requestBody.required = true;
    return { __requestBody: true, requestBody };
  }
  const param: any = { name: p.name, in: p.in };
  if (p.description) param.description = p.description;
  if (p.required) param.required = true;
  if (p.allowEmptyValue) param.allowEmptyValue = true;
  const schema: any = {};
  for (const key of PARAM_SCHEMA_KEYS) if (p[key] !== undefined) schema[key] = clone(p[key]);
  param.schema = schema;
  return { param };
}

function convertResponseTo3(resp: any, produces: string[]): any {
  if (!isObj(resp) || resp['$ref']) return clone(resp);
  const out: any = { description: resp.description ?? '' };
  if (resp.schema) {
    const types = produces.length ? produces : ['application/json'];
    out.content = {};
    for (const t of types) out.content[t] = { schema: clone(resp.schema) };
    if (resp.examples) {
      for (const [mime, example] of Object.entries<any>(resp.examples)) {
        if (out.content[mime]) out.content[mime].example = clone(example);
      }
    }
  }
  if (resp.headers) {
    out.headers = {};
    for (const [name, h] of Object.entries<any>(resp.headers)) {
      const header: any = {};
      if (h.description) header.description = h.description;
      const schema: any = {};
      for (const key of PARAM_SCHEMA_KEYS) if (h[key] !== undefined) schema[key] = clone(h[key]);
      header.schema = schema;
      out.headers[name] = header;
    }
  }
  return out;
}

function convertSecurityTo3(sec: any): any {
  if (!isObj(sec)) return clone(sec);
  if (sec.type === 'basic') {
    const out: any = { type: 'http', scheme: 'basic' };
    if (sec.description) out.description = sec.description;
    return out;
  }
  if (sec.type === 'oauth2') {
    const flowName = ({ implicit: 'implicit', password: 'password', application: 'clientCredentials', accessCode: 'authorizationCode' } as any)[sec.flow] ?? 'implicit';
    const flow: any = { scopes: clone(sec.scopes) ?? {} };
    if (sec.authorizationUrl) flow.authorizationUrl = sec.authorizationUrl;
    if (sec.tokenUrl) flow.tokenUrl = sec.tokenUrl;
    const out: any = { type: 'oauth2', flows: { [flowName]: flow } };
    if (sec.description) out.description = sec.description;
    return out;
  }
  return clone(sec); // apiKey and others are compatible
}

// ───────────────────────── OpenAPI 3.0 → Swagger 2.0 ─────────────────────────

function v30ToV2(v3: any): any {
  const out: any = { swagger: '2.0', info: clone(v3.info) ?? { title: 'API', version: '1.0.0' } };

  const serverUrl: string | undefined = v3.servers?.[0]?.url;
  if (serverUrl) {
    try {
      const url = new URL(serverUrl);
      out.host = url.host;
      if (url.pathname && url.pathname !== '/') out.basePath = url.pathname.replace(/\/$/, '');
      out.schemes = [url.protocol.replace(':', '')];
    } catch {
      out.basePath = serverUrl;
    }
  }

  if (v3.tags) out.tags = clone(v3.tags);
  if (v3.externalDocs) out.externalDocs = clone(v3.externalDocs);

  const allConsumes = new Set<string>();
  const allProduces = new Set<string>();

  out.paths = {};
  for (const [path, item] of Object.entries<any>(v3.paths ?? {})) {
    if (!isObj(item)) continue;
    const newItem: any = {};
    if (item.parameters) newItem.parameters = (item.parameters as any[]).map(convertParamTo2);
    for (const method of HTTP_METHODS) {
      if (isObj(item[method])) {
        newItem[method] = convertOperationTo2(item[method], allConsumes, allProduces);
      }
    }
    out.paths[path] = newItem;
  }

  const comp = v3.components ?? {};
  if (comp.schemas) out.definitions = clone(comp.schemas);
  if (comp.parameters) {
    out.parameters = {};
    for (const [name, p] of Object.entries<any>(comp.parameters)) out.parameters[name] = convertParamTo2(p);
  }
  if (comp.responses) {
    out.responses = {};
    for (const [name, r] of Object.entries<any>(comp.responses)) out.responses[name] = convertResponseTo2(r, allProduces);
  }
  if (comp.securitySchemes) {
    out.securityDefinitions = {};
    for (const [name, sec] of Object.entries<any>(comp.securitySchemes)) {
      out.securityDefinitions[name] = convertSecurityTo2(sec);
    }
  }
  if (v3.security) out.security = clone(v3.security);

  walkObjects(out, fixSchemaTo2);
  rewriteRefs(out, [
    ['#/components/schemas/', '#/definitions/'],
    ['#/components/parameters/', '#/parameters/'],
    ['#/components/responses/', '#/responses/']
  ]);
  return out;
}

function fixSchemaTo2(obj: Record<string, any>): void {
  if (obj['nullable'] === true) {
    delete obj['nullable'];
    obj['x-nullable'] = true;
  }
  if (obj['type'] === 'string' && obj['format'] === 'binary') {
    delete obj['format'];
  }
  delete obj['discriminator']?.mapping;
  if (isObj(obj['discriminator'])) obj['discriminator'] = obj['discriminator']['propertyName'];
}

function convertOperationTo2(op: any, allConsumes: Set<string>, allProduces: Set<string>): any {
  const out: any = {};
  for (const key of ['tags', 'summary', 'description', 'externalDocs', 'operationId', 'deprecated', 'security']) {
    if (op[key] !== undefined) out[key] = clone(op[key]);
  }
  const params: any[] = (op.parameters ?? []).map(convertParamTo2);

  if (isObj(op.requestBody)) {
    const content: Record<string, any> = op.requestBody.content ?? {};
    const types = Object.keys(content);
    const formType = types.find((t) => t.includes('form-urlencoded') || t.includes('multipart'));
    if (formType && isObj(content[formType]?.schema?.properties)) {
      out.consumes = [formType];
      const schema = content[formType].schema;
      const required: string[] = schema.required ?? [];
      for (const [name, prop] of Object.entries<any>(schema.properties)) {
        const param: any = { name, in: 'formData', required: required.includes(name) };
        if (prop.description) param.description = prop.description;
        if (prop.format === 'binary') param.type = 'file';
        else for (const key of PARAM_SCHEMA_KEYS) if (prop[key] !== undefined) param[key] = clone(prop[key]);
        params.push(param);
      }
    } else if (types.length) {
      out.consumes = types;
      types.forEach((t) => allConsumes.add(t));
      const bodyParam: any = { in: 'body', name: 'body', schema: clone(content[types[0]].schema) ?? {} };
      if (op.requestBody.description) bodyParam.description = op.requestBody.description;
      if (op.requestBody.required) bodyParam.required = true;
      params.push(bodyParam);
    }
  }
  if (params.length) out.parameters = params;

  const produces = new Set<string>();
  out.responses = {};
  for (const [code, resp] of Object.entries<any>(op.responses ?? {})) {
    out.responses[code] = convertResponseTo2(resp, produces);
  }
  if (produces.size) out.produces = Array.from(produces);
  produces.forEach((p) => allProduces.add(p));
  return out;
}

function convertParamTo2(p: any): any {
  if (!isObj(p) || p['$ref']) return clone(p);
  const out: any = { name: p.name, in: p.in };
  if (p.description) out.description = p.description;
  if (p.required) out.required = true;
  const schema = isObj(p.schema) ? p.schema : {};
  for (const key of PARAM_SCHEMA_KEYS) if (schema[key] !== undefined) out[key] = clone(schema[key]);
  if (!out.type) out.type = 'string';
  return out;
}

function convertResponseTo2(resp: any, produces: Set<string>): any {
  if (!isObj(resp) || resp['$ref']) return clone(resp);
  const out: any = { description: resp.description ?? '' };
  const content: Record<string, any> = resp.content ?? {};
  const types = Object.keys(content);
  if (types.length) {
    types.forEach((t) => produces.add(t));
    if (content[types[0]].schema) out.schema = clone(content[types[0]].schema);
    if (content[types[0]].example !== undefined) out.examples = { [types[0]]: clone(content[types[0]].example) };
  }
  if (resp.headers) {
    out.headers = {};
    for (const [name, h] of Object.entries<any>(resp.headers)) {
      const header: any = {};
      if (h.description) header.description = h.description;
      const schema = isObj(h.schema) ? h.schema : {};
      for (const key of PARAM_SCHEMA_KEYS) if (schema[key] !== undefined) header[key] = clone(schema[key]);
      if (!header.type) header.type = 'string';
      out.headers[name] = header;
    }
  }
  return out;
}

function convertSecurityTo2(sec: any): any {
  if (!isObj(sec)) return clone(sec);
  if (sec.type === 'http' && sec.scheme === 'basic') {
    const out: any = { type: 'basic' };
    if (sec.description) out.description = sec.description;
    return out;
  }
  if (sec.type === 'http') {
    // bearer and others have no 2.0 equivalent — approximate with a header apiKey.
    return { type: 'apiKey', name: 'Authorization', in: 'header', description: sec.description ?? `HTTP ${sec.scheme} authentication` };
  }
  if (sec.type === 'oauth2' && isObj(sec.flows)) {
    const [flowName, flow] = Object.entries<any>(sec.flows)[0] ?? ['implicit', {}];
    const map: any = { implicit: 'implicit', password: 'password', clientCredentials: 'application', authorizationCode: 'accessCode' };
    const out: any = { type: 'oauth2', flow: map[flowName] ?? 'implicit', scopes: clone(flow.scopes) ?? {} };
    if (flow.authorizationUrl) out.authorizationUrl = flow.authorizationUrl;
    if (flow.tokenUrl) out.tokenUrl = flow.tokenUrl;
    if (sec.description) out.description = sec.description;
    return out;
  }
  return clone(sec);
}

// ───────────────────────── OpenAPI 3.0 ↔ OpenAPI 3.1 ─────────────────────────

function v30ToV31(v3: any): any {
  const out = clone(v3);
  out.openapi = '3.1.0';
  walkObjects(out, (obj) => {
    if (obj['nullable'] === true && typeof obj['type'] === 'string') {
      obj['type'] = [obj['type'], 'null'];
      delete obj['nullable'];
    }
    if (obj['exclusiveMinimum'] === true && typeof obj['minimum'] === 'number') {
      obj['exclusiveMinimum'] = obj['minimum'];
      delete obj['minimum'];
    } else if (obj['exclusiveMinimum'] === false) delete obj['exclusiveMinimum'];
    if (obj['exclusiveMaximum'] === true && typeof obj['maximum'] === 'number') {
      obj['exclusiveMaximum'] = obj['maximum'];
      delete obj['maximum'];
    } else if (obj['exclusiveMaximum'] === false) delete obj['exclusiveMaximum'];
  });
  return out;
}

function v31ToV30(v31: any): any {
  const out = clone(v31);
  out.openapi = '3.0.3';
  delete out.webhooks;
  delete out.jsonSchemaDialect;
  walkObjects(out, (obj) => {
    if (Array.isArray(obj['type'])) {
      const types = obj['type'].filter((t: string) => t !== 'null');
      if (types.length !== obj['type'].length) obj['nullable'] = true;
      obj['type'] = types.length ? types[0] : 'string';
    }
    if (obj['const'] !== undefined) {
      obj['enum'] = [obj['const']];
      delete obj['const'];
    }
    if (typeof obj['exclusiveMinimum'] === 'number') {
      obj['minimum'] = obj['exclusiveMinimum'];
      obj['exclusiveMinimum'] = true;
    }
    if (typeof obj['exclusiveMaximum'] === 'number') {
      obj['maximum'] = obj['exclusiveMaximum'];
      obj['exclusiveMaximum'] = true;
    }
  });
  return out;
}
