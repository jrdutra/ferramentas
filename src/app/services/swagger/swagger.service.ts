import { Injectable } from '@angular/core';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { detectVersion, convertSpec, HTTP_METHODS, SwaggerVersion } from './swagger-converter';
import { PETSTORE_SPEC } from './petstore-default';

export type SpecFormat = 'yaml' | 'json';

export interface ParseResult {
  ok: boolean;
  spec: any;
  format: SpecFormat;
  version: SwaggerVersion | null;
  error: string;
}

export interface RenderParam {
  name: string;
  location: string;
  required: boolean;
  type: string;
  description: string;
  enumVals: string[] | null;
  fromPathItem: boolean;
}

export interface RenderResponse {
  code: string;
  description: string;
  exampleText: string | null;
}

export interface RenderOperation {
  id: string;
  method: string;
  path: string;
  summary: string;
  description: string;
  deprecated: boolean;
  params: RenderParam[];
  hasBody: boolean;
  bodyContentType: string;
  bodyExample: string;
  bodyRequired: boolean;
  responses: RenderResponse[];
  tags: string[];
}

export interface RenderTagGroup {
  tag: string;
  description: string;
  ops: RenderOperation[];
}

export interface RenderSchemaProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface RenderSchema {
  name: string;
  type: string;
  props: RenderSchemaProp[];
}

export interface RenderModel {
  title: string;
  apiVersion: string;
  specVersion: SwaggerVersion;
  description: string;
  servers: string[];
  groups: RenderTagGroup[];
  schemas: RenderSchema[];
}

const STORAGE_TEXT = 'swagger-editor-spec';
const STORAGE_FORMAT = 'swagger-editor-format';

@Injectable({ providedIn: 'root' })
export class SwaggerService {

  // ───────────────────────── Parse / serialize ─────────────────────────

  parse(text: string): ParseResult {
    const t = (text ?? '').trim();
    if (!t) return { ok: false, spec: null, format: 'yaml', version: null, error: 'Empty document.' };

    let spec: any = null;
    let format: SpecFormat = 'yaml';
    if (t.startsWith('{') || t.startsWith('[')) {
      try {
        spec = JSON.parse(t);
        format = 'json';
      } catch (e) {
        return { ok: false, spec: null, format: 'json', version: null, error: 'Invalid JSON: ' + this.msg(e) };
      }
    } else {
      try {
        spec = parseYaml(t);
        format = 'yaml';
      } catch (e) {
        return { ok: false, spec: null, format: 'yaml', version: null, error: 'Invalid YAML: ' + this.msg(e) };
      }
    }

    if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
      return { ok: false, spec: null, format, version: null, error: 'The document is not an object.' };
    }
    const version = detectVersion(spec);
    if (!version) {
      return {
        ok: false, spec, format, version: null,
        error: 'Unrecognized specification: expected a "swagger: 2.0" or "openapi: 3.x" field.'
      };
    }
    return { ok: true, spec, format, version, error: '' };
  }

  serialize(spec: any, format: SpecFormat): string {
    if (format === 'json') return JSON.stringify(spec, null, 2);
    return stringifyYaml(spec, { aliasDuplicateObjects: false, lineWidth: 0 });
  }

  convert(spec: any, target: SwaggerVersion): any {
    return convertSpec(spec, target);
  }

  detect(spec: any): SwaggerVersion | null {
    return detectVersion(spec);
  }

  petstore(): any {
    return JSON.parse(JSON.stringify(PETSTORE_SPEC));
  }

  private msg(e: unknown): string {
    return e instanceof Error ? e.message : String(e);
  }

  // ───────────────────────── Local storage ─────────────────────────

  load(): { text: string; format: SpecFormat } | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      const text = window.localStorage.getItem(STORAGE_TEXT);
      if (!text) return null;
      const format = (window.localStorage.getItem(STORAGE_FORMAT) === 'json' ? 'json' : 'yaml') as SpecFormat;
      return { text, format };
    } catch {
      return null;
    }
  }

  save(text: string, format: SpecFormat): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(STORAGE_TEXT, text);
      window.localStorage.setItem(STORAGE_FORMAT, format);
    } catch {
      /* storage full or unavailable — ignore */
    }
  }

  // ───────────────────────── Normalization for rendering ─────────────────────────

  normalize(spec: any): RenderModel {
    const version = detectVersion(spec) ?? '3.0';
    const model: RenderModel = {
      title: spec.info?.title ?? 'API',
      apiVersion: String(spec.info?.version ?? ''),
      specVersion: version,
      description: spec.info?.description ?? '',
      servers: this.servers(spec, version),
      groups: [],
      schemas: []
    };

    const tagDescriptions = new Map<string, string>();
    for (const t of spec.tags ?? []) {
      if (t?.name) tagDescriptions.set(t.name, t.description ?? '');
    }

    const groups = new Map<string, RenderTagGroup>();
    for (const [path, item] of Object.entries<any>(spec.paths ?? {})) {
      if (!item || typeof item !== 'object') continue;
      const pathParams: any[] = Array.isArray(item.parameters) ? item.parameters : [];
      for (const method of HTTP_METHODS) {
        const op = item[method];
        if (!op || typeof op !== 'object') continue;
        const rendered = this.operation(spec, version, method, path, op, pathParams);
        const tags: string[] = Array.isArray(op.tags) && op.tags.length ? op.tags : ['default'];
        for (const tag of tags) {
          if (!groups.has(tag)) {
            groups.set(tag, { tag, description: tagDescriptions.get(tag) ?? '', ops: [] });
          }
          groups.get(tag)!.ops.push(rendered);
        }
      }
    }
    model.groups = Array.from(groups.values());

    const schemaSource: Record<string, any> = version === '2.0' ? (spec.definitions ?? {}) : (spec.components?.schemas ?? {});
    for (const [name, schema] of Object.entries<any>(schemaSource)) {
      model.schemas.push(this.schema(name, schema));
    }
    return model;
  }

  private servers(spec: any, version: SwaggerVersion): string[] {
    if (version === '2.0') {
      const schemes: string[] = Array.isArray(spec.schemes) && spec.schemes.length ? spec.schemes : ['https'];
      if (spec.host) return schemes.map((s) => `${s}://${spec.host}${spec.basePath ?? ''}`);
      return [spec.basePath ?? '/'];
    }
    const urls = (spec.servers ?? []).map((s: any) => s?.url).filter((u: any) => typeof u === 'string');
    return urls.length ? urls : ['/'];
  }

  private operation(spec: any, version: SwaggerVersion, method: string, path: string, op: any, pathParams: any[]): RenderOperation {
    const out: RenderOperation = {
      id: `${method} ${path}`,
      method,
      path,
      summary: op.summary ?? '',
      description: op.description ?? '',
      deprecated: op.deprecated === true,
      params: [],
      hasBody: false,
      bodyContentType: 'application/json',
      bodyExample: '',
      bodyRequired: false,
      responses: [],
      tags: Array.isArray(op.tags) ? op.tags : []
    };

    const resolveParam = (p: any): any => {
      if (p?.$ref && typeof p.$ref === 'string') {
        const resolved = this.resolveRef(spec, p.$ref);
        return resolved ?? p;
      }
      return p;
    };

    const collect = (list: any[], fromPathItem: boolean) => {
      for (const raw of list) {
        const p = resolveParam(raw);
        if (!p || typeof p !== 'object') continue;
        if (version === '2.0' && p.in === 'body') {
          out.hasBody = true;
          out.bodyRequired = p.required === true;
          out.bodyContentType = (op.consumes ?? spec.consumes ?? ['application/json'])[0];
          out.bodyExample = this.exampleText(spec, p.schema);
          continue;
        }
        const schema = version === '2.0' ? p : (p.schema ?? {});
        out.params.push({
          name: p.name ?? '',
          location: p.in ?? '',
          required: p.required === true,
          type: this.typeLabel(spec, schema),
          description: p.description ?? '',
          enumVals: this.enumOf(spec, schema),
          fromPathItem
        });
      }
    };
    collect(pathParams, true);
    collect(Array.isArray(op.parameters) ? op.parameters : [], false);

    if (version !== '2.0' && op.requestBody) {
      const body = op.requestBody.$ref ? this.resolveRef(spec, op.requestBody.$ref) : op.requestBody;
      const content: Record<string, any> = body?.content ?? {};
      const types = Object.keys(content);
      if (types.length) {
        out.hasBody = true;
        out.bodyContentType = types[0];
        out.bodyRequired = body.required === true;
        out.bodyExample = this.exampleText(spec, content[types[0]].schema, content[types[0]].example);
      }
    }

    for (const [code, rawResp] of Object.entries<any>(op.responses ?? {})) {
      const resp = rawResp?.$ref ? this.resolveRef(spec, rawResp.$ref) : rawResp;
      if (!resp || typeof resp !== 'object') continue;
      let exampleText: string | null = null;
      if (version === '2.0') {
        const explicit = resp.examples && typeof resp.examples === 'object'
          ? resp.examples[Object.keys(resp.examples)[0]]
          : undefined;
        if (resp.schema || explicit !== undefined) exampleText = this.exampleText(spec, resp.schema, explicit);
      } else {
        const content: Record<string, any> = resp.content ?? {};
        const types = Object.keys(content);
        if (types.length) exampleText = this.exampleText(spec, content[types[0]].schema, content[types[0]].example);
      }
      out.responses.push({ code, description: resp.description ?? '', exampleText });
    }
    return out;
  }

  private schema(name: string, schema: any): RenderSchema {
    const out: RenderSchema = { name, type: schema?.type ?? (schema?.properties ? 'object' : ''), props: [] };
    const required: string[] = Array.isArray(schema?.required) ? schema.required : [];
    for (const [propName, prop] of Object.entries<any>(schema?.properties ?? {})) {
      out.props.push({
        name: propName,
        type: this.typeLabel(null, prop),
        required: required.includes(propName),
        description: prop?.description ?? ''
      });
    }
    return out;
  }

  private typeLabel(spec: any, schema: any): string {
    if (!schema || typeof schema !== 'object') return '';
    if (typeof schema.$ref === 'string') return schema.$ref.split('/').pop() ?? 'object';
    let type = Array.isArray(schema.type) ? schema.type.filter((t: string) => t !== 'null').join(' | ') : schema.type;
    if (type === 'array') {
      return `array<${this.typeLabel(spec, schema.items ?? {}) || 'any'}>`;
    }
    if (!type && schema.properties) type = 'object';
    if (schema.format) return `${type ?? 'string'} (${schema.format})`;
    return type ?? '';
  }

  private enumOf(spec: any, schema: any): string[] | null {
    if (!schema || typeof schema !== 'object') return null;
    if (Array.isArray(schema.enum)) return schema.enum.map((v: any) => String(v));
    if (schema.items && Array.isArray(schema.items.enum)) return schema.items.enum.map((v: any) => String(v));
    return null;
  }

  resolveRef(spec: any, ref: string): any {
    if (typeof ref !== 'string' || !ref.startsWith('#/')) return null;
    const parts = ref.substring(2).split('/').map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
    let node: any = spec;
    for (const part of parts) {
      if (!node || typeof node !== 'object') return null;
      node = node[part];
    }
    return node;
  }

  // ───────────────────────── Example generation ─────────────────────────

  exampleText(spec: any, schema: any, explicitExample?: any): string {
    if (explicitExample !== undefined) return JSON.stringify(explicitExample, null, 2);
    if (!schema) return '';
    const value = this.exampleValue(spec, schema, 0);
    return value === undefined ? '' : JSON.stringify(value, null, 2);
  }

  private exampleValue(spec: any, schema: any, depth: number): any {
    if (!schema || typeof schema !== 'object' || depth > 6) return undefined;
    if (typeof schema.$ref === 'string') {
      const resolved = this.resolveRef(spec, schema.$ref);
      return resolved ? this.exampleValue(spec, resolved, depth + 1) : {};
    }
    if (schema.example !== undefined) return schema.example;
    if (schema.default !== undefined) return schema.default;
    if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum[0];
    if (Array.isArray(schema.allOf)) {
      const merged: any = {};
      for (const part of schema.allOf) {
        const value = this.exampleValue(spec, part, depth + 1);
        if (value && typeof value === 'object' && !Array.isArray(value)) Object.assign(merged, value);
      }
      return merged;
    }
    if (Array.isArray(schema.oneOf) && schema.oneOf.length) return this.exampleValue(spec, schema.oneOf[0], depth + 1);
    if (Array.isArray(schema.anyOf) && schema.anyOf.length) return this.exampleValue(spec, schema.anyOf[0], depth + 1);

    const type = Array.isArray(schema.type) ? schema.type.find((t: string) => t !== 'null') : schema.type;
    switch (type) {
      case 'object':
      case undefined: {
        if (!schema.properties) return type === 'object' ? {} : undefined;
        const obj: any = {};
        for (const [name, prop] of Object.entries<any>(schema.properties)) {
          const value = this.exampleValue(spec, prop, depth + 1);
          if (value !== undefined) obj[name] = value;
        }
        return obj;
      }
      case 'array': {
        const item = this.exampleValue(spec, schema.items ?? { type: 'string' }, depth + 1);
        return item === undefined ? [] : [item];
      }
      case 'string':
        switch (schema.format) {
          case 'date-time': return new Date().toISOString();
          case 'date': return new Date().toISOString().substring(0, 10);
          case 'email': return 'user@example.com';
          case 'uuid': return '3fa85f64-5717-4562-b3fc-2c963f66afa6';
          case 'uri': return 'https://example.com';
          case 'binary':
          case 'byte': return 'string';
          default: return 'string';
        }
      case 'integer':
      case 'number':
        return 0;
      case 'boolean':
        return true;
      default:
        return undefined;
    }
  }
}
