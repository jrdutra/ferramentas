import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';
import {
  SwaggerService,
  SpecFormat,
  RenderModel,
  RenderOperation,
  RenderParam,
  RenderSchema
} from '../../services/swagger/swagger.service';
import { SWAGGER_VERSIONS, SwaggerVersion } from '../../services/swagger/swagger-converter';
import { buildStandaloneHtml } from '../../services/swagger/swagger-standalone';

interface TryState {
  values: Record<string, string>;
  body: string;
  running: boolean;
  status: number | null;
  statusText: string;
  timeMs: number | null;
  requestUrl: string;
  responseBody: string;
  responseHtml: SafeHtml | string;
  error: string;
  showAddParam: boolean;
  newParamName: string;
  newParamIn: string;
  newParamType: string;
  showAddResp: boolean;
  newRespCode: string;
  newRespDesc: string;
  newRespExample: string;
}

interface SchemaFormState {
  showAddProp: boolean;
  newPropName: string;
  newPropType: string;
}

interface AttrEntry {
  key: string;
  value: string;
  multiline: boolean;
}

interface AttrEditorState {
  target: any;
  entries: AttrEntry[];
  newKey: string;
  newValue: string;
  suggestions: string[];
}

@Component({
  selector: 'app-editor-swagger',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './editor-swagger.component.html',
  styleUrl: './editor-swagger.component.css'
})
export class EditorSwaggerComponent implements OnInit {

  readonly versions = SWAGGER_VERSIONS;
  readonly formats: { id: SpecFormat; nome: string }[] = [
    { id: 'yaml', nome: 'YAML' },
    { id: 'json', nome: 'JSON' }
  ];
  readonly methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
  readonly paramLocations = ['query', 'path', 'header'];
  readonly paramTypes = ['string', 'integer', 'number', 'boolean', 'array'];

  editorText = '';
  format: SpecFormat = 'yaml';
  version: SwaggerVersion = '2.0';
  parseError = '';
  convertError = '';
  spec: any = null;
  model: RenderModel | null = null;

  serverChoice = '';
  customServer = '';

  expanded = new Set<string>();
  collapsedTags = new Set<string>();
  collapsedSchemas = new Set<string>();
  collapsedParams = new Set<string>();
  collapsedResponses = new Set<string>();
  private exampleHtml = new Map<string, SafeHtml>();
  schemasOpen = true;
  private tryStates = new Map<string, TryState>();
  private schemaForms = new Map<string, SchemaFormState>();

  attrKey = '';
  attrEditor: AttrEditorState | null = null;

  showAddEndpoint = false;
  newPath = '';
  newMethod = 'get';
  newTag = '';
  newSummary = '';
  addEndpointError = '';

  showAddSchema = false;
  newSchemaName = '';

  private editorTimer: any = null;

  highlightedCode: SafeHtml = '';

  constructor(
    private dataService: DataService,
    private swagger: SwaggerService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Swagger Viewer & Editor');

    const saved = this.swagger.load();
    if (saved) {
      this.format = saved.format;
      const parsed = this.swagger.parse(saved.text);
      if (parsed.ok) {
        this.editorText = saved.text;
        this.spec = parsed.spec;
        this.version = parsed.version!;
        this.rebuildModel();
        this.updateHighlight();
        return;
      }
    }
    this.loadPetstore(false);
  }

  // ───────────────────────── Editor (left side) ─────────────────────────

  onEditorInput(): void {
    this.updateHighlight();
    if (this.editorTimer) clearTimeout(this.editorTimer);
    this.editorTimer = setTimeout(() => this.applyEditorText(), 350);
  }

  private applyEditorText(): void {
    this.closeAttrEditor();
    const parsed = this.swagger.parse(this.editorText);
    if (!parsed.ok) {
      this.parseError = parsed.error;
      return;
    }
    this.parseError = '';
    this.convertError = '';
    this.format = parsed.format;
    this.spec = parsed.spec;
    this.version = parsed.version!;
    this.rebuildModel();
    this.swagger.save(this.editorText, this.format);
  }

  setFormat(format: SpecFormat): void {
    if (format === this.format) return;
    this.format = format;
    if (this.spec) {
      this.editorText = this.swagger.serialize(this.spec, format);
      this.updateHighlight();
      this.swagger.save(this.editorText, this.format);
    }
  }

  setVersion(version: SwaggerVersion): void {
    if (!this.spec || version === this.version) return;
    try {
      this.closeAttrEditor();
      this.spec = this.swagger.convert(this.spec, version);
      this.version = version;
      this.convertError = '';
      this.refresh();
    } catch (e) {
      this.convertError = 'Conversion failed: ' + (e instanceof Error ? e.message : String(e));
    }
  }

  loadPetstore(confirmFirst = true): void {
    if (confirmFirst && typeof window !== 'undefined' && !window.confirm('Replace the current document with the Petstore example?')) {
      return;
    }
    this.closeAttrEditor();
    this.spec = this.swagger.petstore();
    this.version = '2.0';
    this.parseError = '';
    this.convertError = '';
    this.expanded.clear();
    this.tryStates.clear();
    this.refresh();
  }

  /** Serializes the model back into the editor and re-renders the preview. */
  private refresh(): void {
    this.editorText = this.swagger.serialize(this.spec, this.format);
    this.updateHighlight();
    this.rebuildModel();
    this.swagger.save(this.editorText, this.format);
  }

  // ───────────────────────── Syntax highlighting ─────────────────────────

  private updateHighlight(): void {
    this.highlightedCode = this.sanitizer.bypassSecurityTrustHtml(this.buildHighlight(this.editorText) + '\n');
  }

  private buildHighlight(text: string): string {
    if (!text) return '';
    if (text.length > 400000) return this.escapeHtml(text); // keep typing responsive on huge documents
    const t = text.trimStart();
    return t.startsWith('{') || t.startsWith('[') ? this.highlightJson(text) : this.highlightYaml(text);
  }

  private escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private highlightJson(text: string): string {
    const esc = this.escapeHtml(text);
    return esc.replace(
      /("(?:[^"\\]|\\.)*")(\s*:)?|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b(?:true|false|null)\b/g,
      (match, str: string | undefined, colon: string | undefined) => {
        if (str !== undefined) {
          return colon !== undefined
            ? `<span class="tk-key">${str}</span><span class="tk-punc">${colon}</span>`
            : `<span class="tk-str">${str}</span>`;
        }
        if (match === 'true' || match === 'false' || match === 'null') return `<span class="tk-lit">${match}</span>`;
        return `<span class="tk-num">${match}</span>`;
      }
    );
  }

  private highlightYaml(text: string): string {
    return text.split('\n').map((line) => this.highlightYamlLine(this.escapeHtml(line))).join('\n');
  }

  private highlightYamlLine(line: string): string {
    let code = line;
    let comment = '';
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === '#' && !inSingle && !inDouble && (i === 0 || line[i - 1] === ' ' || line[i - 1] === '\t')) {
        code = line.slice(0, i);
        comment = `<span class="tk-com">${line.slice(i)}</span>`;
        break;
      }
    }
    let html: string;
    const keyMatch = code.match(/^(\s*(?:-\s+)?)("(?:[^"\\]|\\.)*"|'[^']*'|[^\s][^:]*?)(:)(\s.*|$)/);
    if (keyMatch) {
      const [, prefix, key, colon, rest] = keyMatch;
      html = `${this.hlBullet(prefix)}<span class="tk-key">${key}</span><span class="tk-punc">${colon}</span>${this.hlScalar(rest)}`;
    } else {
      const bullet = code.match(/^(\s*-\s+)([\s\S]*)$/);
      if (bullet) html = `${this.hlBullet(bullet[1])}${this.hlScalar(bullet[2])}`;
      else html = this.hlScalar(code);
    }
    return html + comment;
  }

  private hlBullet(prefix: string): string {
    return prefix.replace('-', '<span class="tk-punc">-</span>');
  }

  private hlScalar(text: string): string {
    const t = text.trim();
    if (!t) return text;
    const start = text.indexOf(t);
    const before = text.slice(0, start);
    const after = text.slice(start + t.length);
    let cls = 'tk-str';
    if (/^(true|false|null|~)$/i.test(t)) cls = 'tk-lit';
    else if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(t)) cls = 'tk-num';
    else if (/^[&*|>]/.test(t)) cls = 'tk-punc';
    return `${before}<span class="${cls}">${t}</span>${after}`;
  }

  private rebuildModel(): void {
    try {
      this.model = this.swagger.normalize(this.spec);
      this.exampleHtml.clear();
      for (const group of this.model.groups) {
        for (const op of group.ops) {
          for (const resp of op.responses) {
            if (resp.exampleText) {
              this.exampleHtml.set(
                `${op.id}:${resp.code}`,
                this.sanitizer.bypassSecurityTrustHtml(this.highlightJson(resp.exampleText))
              );
            }
          }
        }
      }
      if (!this.model.servers.includes(this.serverChoice) && this.serverChoice !== '__custom__') {
        this.serverChoice = this.model.servers[0] ?? '/';
      }
    } catch (e) {
      this.model = null;
      this.parseError = 'Could not render the specification: ' + (e instanceof Error ? e.message : String(e));
    }
  }

  // ───────────────────────── Try-out state ─────────────────────────

  t(op: RenderOperation): TryState {
    let state = this.tryStates.get(op.id);
    if (!state) {
      state = {
        values: {}, body: op.bodyExample, running: false, status: null, statusText: '',
        timeMs: null, requestUrl: '', responseBody: '', responseHtml: '', error: '',
        showAddParam: false, newParamName: '', newParamIn: 'query', newParamType: 'string',
        showAddResp: false, newRespCode: '', newRespDesc: '', newRespExample: ''
      };
      this.tryStates.set(op.id, state);
    }
    return state;
  }

  sf(schema: RenderSchema): SchemaFormState {
    let state = this.schemaForms.get(schema.name);
    if (!state) {
      state = { showAddProp: false, newPropName: '', newPropType: 'string' };
      this.schemaForms.set(schema.name, state);
    }
    return state;
  }

  toggle(op: RenderOperation): void {
    if (this.expanded.has(op.id)) this.expanded.delete(op.id);
    else this.expanded.add(op.id);
  }

  toggleTag(tag: string): void {
    if (this.collapsedTags.has(tag)) this.collapsedTags.delete(tag);
    else this.collapsedTags.add(tag);
  }

  isTagOpen(tag: string): boolean {
    return !this.collapsedTags.has(tag);
  }

  toggleSchema(name: string): void {
    if (this.collapsedSchemas.has(name)) this.collapsedSchemas.delete(name);
    else this.collapsedSchemas.add(name);
  }

  isSchemaOpen(name: string): boolean {
    return !this.collapsedSchemas.has(name);
  }

  toggleParams(op: RenderOperation): void {
    if (this.collapsedParams.has(op.id)) this.collapsedParams.delete(op.id);
    else this.collapsedParams.add(op.id);
  }

  isParamsOpen(op: RenderOperation): boolean {
    return !this.collapsedParams.has(op.id);
  }

  toggleResponses(op: RenderOperation): void {
    if (this.collapsedResponses.has(op.id)) this.collapsedResponses.delete(op.id);
    else this.collapsedResponses.add(op.id);
  }

  isResponsesOpen(op: RenderOperation): boolean {
    return !this.collapsedResponses.has(op.id);
  }

  isOpen(op: RenderOperation): boolean {
    return this.expanded.has(op.id);
  }

  paramKey(p: RenderParam): string {
    return p.location + ':' + p.name;
  }

  respExampleHtml(op: RenderOperation, resp: { code: string; exampleText: string | null }): SafeHtml | string {
    return this.exampleHtml.get(`${op.id}:${resp.code}`) ?? resp.exampleText ?? '';
  }

  serverBase(): string {
    const base = this.serverChoice === '__custom__' ? this.customServer : this.serverChoice;
    return (base ?? '').replace(/\/$/, '');
  }

  // ───────────────────────── Execute requests ─────────────────────────

  async execute(op: RenderOperation): Promise<void> {
    if (typeof window === 'undefined') return;
    const state = this.t(op);
    state.running = true;
    state.error = '';
    state.status = null;
    state.responseBody = '';

    let path = op.path;
    const query: string[] = [];
    const headers: Record<string, string> = {};
    for (const p of op.params) {
      const value = state.values[this.paramKey(p)];
      if (!value) continue;
      if (p.location === 'path') path = path.split(`{${p.name}}`).join(encodeURIComponent(value));
      else if (p.location === 'query') query.push(`${encodeURIComponent(p.name)}=${encodeURIComponent(value)}`);
      else if (p.location === 'header') headers[p.name] = value;
    }
    const url = this.serverBase() + path + (query.length ? '?' + query.join('&') : '');
    state.requestUrl = url;

    const init: RequestInit = { method: op.method.toUpperCase(), headers };
    if (op.hasBody && state.body.trim()) {
      headers['Content-Type'] = op.bodyContentType;
      init.body = state.body;
    }

    const started = Date.now();
    try {
      const response = await fetch(url, init);
      state.timeMs = Date.now() - started;
      state.status = response.status;
      state.statusText = response.statusText;
      const text = await response.text();
      try {
        state.responseBody = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        state.responseBody = text || '(empty body)';
      }
      state.responseHtml = this.sanitizer.bypassSecurityTrustHtml(this.highlightJson(state.responseBody));
    } catch (e) {
      state.timeMs = Date.now() - started;
      state.error = 'Request failed: ' + (e instanceof Error ? e.message : String(e)) +
        '. This is often caused by CORS restrictions on the target server or an unreachable host.';
    } finally {
      state.running = false;
      // The continuation of a native async/await can escape zone.js change
      // detection, so trigger a render explicitly once the request settles.
      this.cdr.detectChanges();
    }
  }

  // ───────────────────────── Structure editing (+ / −) ─────────────────────────

  private rawOp(op: RenderOperation): any {
    return this.spec?.paths?.[op.path]?.[op.method];
  }

  addEndpoint(): void {
    this.addEndpointError = '';
    const path = this.newPath.trim();
    if (!path.startsWith('/')) {
      this.addEndpointError = 'The path must start with "/". Example: /pets/{petId}';
      return;
    }
    this.spec.paths = this.spec.paths ?? {};
    this.spec.paths[path] = this.spec.paths[path] ?? {};
    if (this.spec.paths[path][this.newMethod]) {
      this.addEndpointError = `${this.newMethod.toUpperCase()} ${path} already exists.`;
      return;
    }
    const op: any = { summary: this.newSummary.trim() || 'New operation', responses: { '200': { description: 'OK' } } };
    if (this.newTag.trim()) op.tags = [this.newTag.trim()];
    this.spec.paths[path][this.newMethod] = op;
    this.expanded.add(`${this.newMethod} ${path}`);
    this.newPath = '';
    this.newSummary = '';
    this.showAddEndpoint = false;
    this.refresh();
  }

  removeOperation(op: RenderOperation): void {
    const item = this.spec?.paths?.[op.path];
    if (!item) return;
    delete item[op.method];
    if (!this.methods.some((m) => item[m])) delete this.spec.paths[op.path];
    this.tryStates.delete(op.id);
    this.expanded.delete(op.id);
    this.refresh();
  }

  addParam(op: RenderOperation): void {
    const state = this.t(op);
    const name = state.newParamName.trim();
    if (!name) return;
    const node = this.rawOp(op);
    if (!node) return;
    node.parameters = node.parameters ?? [];
    const param: any = this.version === '2.0'
      ? { name, in: state.newParamIn, required: state.newParamIn === 'path', type: state.newParamType }
      : { name, in: state.newParamIn, required: state.newParamIn === 'path', schema: { type: state.newParamType } };
    node.parameters.push(param);
    state.newParamName = '';
    state.showAddParam = false;
    this.refresh();
  }

  removeParam(op: RenderOperation, param: RenderParam): void {
    const list = param.fromPathItem ? this.spec?.paths?.[op.path]?.parameters : this.rawOp(op)?.parameters;
    if (!Array.isArray(list)) return;
    const matches = (raw: any): boolean => {
      const resolved = raw?.$ref ? this.swagger.resolveRef(this.spec, raw.$ref) : raw;
      return resolved?.name === param.name && resolved?.in === param.location;
    };
    const index = list.findIndex(matches);
    if (index >= 0) list.splice(index, 1);
    if (!list.length) {
      if (param.fromPathItem) delete this.spec.paths[op.path].parameters;
      else delete this.rawOp(op).parameters;
    }
    this.refresh();
  }

  addBody(op: RenderOperation): void {
    const node = this.rawOp(op);
    if (!node) return;
    if (this.version === '2.0') {
      node.parameters = node.parameters ?? [];
      node.parameters.push({ in: 'body', name: 'body', required: false, schema: { type: 'object' } });
    } else {
      node.requestBody = { content: { 'application/json': { schema: { type: 'object' } } } };
    }
    this.refresh();
  }

  removeBody(op: RenderOperation): void {
    const node = this.rawOp(op);
    if (!node) return;
    if (this.version === '2.0') {
      if (Array.isArray(node.parameters)) {
        node.parameters = node.parameters.filter((p: any) => p?.in !== 'body');
        if (!node.parameters.length) delete node.parameters;
      }
    } else {
      delete node.requestBody;
    }
    this.tryStates.delete(op.id);
    this.refresh();
  }

  addResponse(op: RenderOperation): void {
    const state = this.t(op);
    const code = state.newRespCode.trim() || '200';
    const node = this.rawOp(op);
    if (!node) return;
    node.responses = node.responses ?? {};
    const resp: any = { description: state.newRespDesc.trim() || 'OK' };
    const exampleText = state.newRespExample.trim();
    if (exampleText) {
      let example: any;
      try {
        example = JSON.parse(exampleText);
      } catch {
        example = exampleText;
      }
      if (this.version === '2.0') resp.examples = { 'application/json': example };
      else resp.content = { 'application/json': { example } };
    }
    node.responses[code] = resp;
    state.newRespCode = '';
    state.newRespDesc = '';
    state.newRespExample = '';
    state.showAddResp = false;
    this.refresh();
  }

  removeResponse(op: RenderOperation, code: string): void {
    const node = this.rawOp(op);
    if (node?.responses) {
      delete node.responses[code];
      this.refresh();
    }
  }

  private schemaContainer(): Record<string, any> {
    if (this.version === '2.0') {
      this.spec.definitions = this.spec.definitions ?? {};
      return this.spec.definitions;
    }
    this.spec.components = this.spec.components ?? {};
    this.spec.components.schemas = this.spec.components.schemas ?? {};
    return this.spec.components.schemas;
  }

  addSchema(): void {
    const name = this.newSchemaName.trim();
    if (!name) return;
    const container = this.schemaContainer();
    if (!container[name]) {
      container[name] = { type: 'object', properties: {} };
    }
    this.newSchemaName = '';
    this.showAddSchema = false;
    this.refresh();
  }

  removeSchema(schema: RenderSchema): void {
    const container = this.schemaContainer();
    delete container[schema.name];
    this.schemaForms.delete(schema.name);
    this.refresh();
  }

  addProp(schema: RenderSchema): void {
    const state = this.sf(schema);
    const name = state.newPropName.trim();
    if (!name) return;
    const container = this.schemaContainer();
    const node = container[schema.name];
    if (!node) return;
    node.properties = node.properties ?? {};
    node.properties[name] = state.newPropType === 'array'
      ? { type: 'array', items: { type: 'string' } }
      : { type: state.newPropType };
    state.newPropName = '';
    state.showAddProp = false;
    this.refresh();
  }

  removeProp(schema: RenderSchema, propName: string): void {
    const container = this.schemaContainer();
    const node = container[schema.name];
    if (!node?.properties) return;
    delete node.properties[propName];
    if (Array.isArray(node.required)) {
      node.required = node.required.filter((r: string) => r !== propName);
      if (!node.required.length) delete node.required;
    }
    this.refresh();
  }

  // ───────────────────────── Generic attribute editing ─────────────────────────

  toggleAttrEditor(key: string, target: any, suggestions: string[]): void {
    if (this.attrKey === key) {
      this.closeAttrEditor();
      return;
    }
    if (!target) return;
    this.attrKey = key;
    this.attrEditor = { target, entries: this.buildAttrEntries(target), newKey: '', newValue: '', suggestions };
  }

  closeAttrEditor(): void {
    this.attrKey = '';
    this.attrEditor = null;
  }

  private buildAttrEntries(target: any): AttrEntry[] {
    return Object.entries(target ?? {}).map(([key, value]) => {
      const text = typeof value === 'string'
        ? value
        : JSON.stringify(value, null, value !== null && typeof value === 'object' ? 2 : 0) ?? '';
      return { key, value: text, multiline: text.includes('\n') || text.length > 60 };
    });
  }

  applyAttrs(): void {
    if (!this.attrEditor) return;
    const target = this.attrEditor.target;
    for (const entry of this.attrEditor.entries) {
      target[entry.key] = this.parseAttrValue(entry.value);
    }
    this.refresh();
    this.attrEditor.entries = this.buildAttrEntries(target);
  }

  removeAttr(key: string): void {
    if (!this.attrEditor) return;
    delete this.attrEditor.target[key];
    this.refresh();
    this.attrEditor.entries = this.buildAttrEntries(this.attrEditor.target);
  }

  addAttr(): void {
    if (!this.attrEditor) return;
    const key = this.attrEditor.newKey.trim();
    if (!key) return;
    this.attrEditor.target[key] = this.parseAttrValue(this.attrEditor.newValue);
    this.attrEditor.newKey = '';
    this.attrEditor.newValue = '';
    this.refresh();
    this.attrEditor.entries = this.buildAttrEntries(this.attrEditor.target);
  }

  /** JSON when it parses, plain text otherwise — so booleans, numbers, arrays and objects are supported. */
  private parseAttrValue(text: string): any {
    const t = (text ?? '').trim();
    if (!t) return '';
    try {
      return JSON.parse(t);
    } catch {
      return text;
    }
  }

  rawInfo(): any {
    this.spec.info = this.spec.info ?? {};
    return this.spec.info;
  }

  rawOpNode(op: RenderOperation): any {
    return this.rawOp(op);
  }

  rawParamNode(op: RenderOperation, param: RenderParam): any {
    const list = param.fromPathItem ? this.spec?.paths?.[op.path]?.parameters : this.rawOp(op)?.parameters;
    if (!Array.isArray(list)) return null;
    return list
      .map((raw: any) => (raw?.$ref ? this.swagger.resolveRef(this.spec, raw.$ref) : raw))
      .find((p: any) => p?.name === param.name && p?.in === param.location) ?? null;
  }

  rawRespNode(op: RenderOperation, code: string): any {
    return this.rawOp(op)?.responses?.[code] ?? null;
  }

  rawSchemaNode(name: string): any {
    return this.schemaContainer()[name] ?? null;
  }

  rawPropNode(schemaName: string, propName: string): any {
    return this.schemaContainer()[schemaName]?.properties?.[propName] ?? null;
  }

  infoAttrSuggestions(): string[] {
    const base = ['title', 'version', 'description', 'termsOfService', 'contact', 'license'];
    return this.version === '3.1' ? [...base, 'summary'] : base;
  }

  opAttrSuggestions(): string[] {
    const base = ['summary', 'description', 'operationId', 'deprecated', 'tags', 'security', 'externalDocs'];
    return this.version === '2.0' ? [...base, 'consumes', 'produces', 'schemes'] : [...base, 'servers', 'callbacks'];
  }

  paramAttrSuggestions(): string[] {
    return this.version === '2.0'
      ? ['description', 'required', 'type', 'format', 'default', 'enum', 'items', 'collectionFormat', 'minimum', 'maximum', 'minLength', 'maxLength', 'pattern', 'allowEmptyValue']
      : ['description', 'required', 'deprecated', 'schema', 'example', 'examples', 'style', 'explode', 'allowEmptyValue'];
  }

  respAttrSuggestions(): string[] {
    return this.version === '2.0'
      ? ['description', 'schema', 'headers', 'examples']
      : ['description', 'content', 'headers', 'links'];
  }

  schemaAttrSuggestions(): string[] {
    const base = ['type', 'format', 'description', 'required', 'properties', 'items', 'enum', 'default', 'example', 'additionalProperties', 'minimum', 'maximum', 'minLength', 'maxLength', 'pattern'];
    if (this.version === '3.0') return [...base, 'nullable', 'oneOf', 'anyOf', 'allOf', 'discriminator'];
    if (this.version === '3.1') return [...base, 'examples', 'const', 'oneOf', 'anyOf', 'allOf', 'discriminator'];
    return base;
  }

  // ───────────────────────── Downloads ─────────────────────────

  private fileBase(): string {
    const title = this.model?.title ?? 'swagger';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'swagger';
  }

  private download(content: string, filename: string, mime: string): void {
    if (typeof window === 'undefined' || !this.spec) return;
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  downloadJson(): void {
    this.download(this.swagger.serialize(this.spec, 'json'), this.fileBase() + '.json', 'application/json');
  }

  downloadYaml(): void {
    this.download(this.swagger.serialize(this.spec, 'yaml'), this.fileBase() + '.yaml', 'application/yaml');
  }

  downloadHtml(): void {
    if (!this.model) return;
    this.download(buildStandaloneHtml(this.model), this.fileBase() + '.html', 'text/html');
  }

  // ───────────────────────── trackBy helpers ─────────────────────────

  trackGroup(_: number, group: { tag: string }): string { return group.tag; }
  trackOp(_: number, op: RenderOperation): string { return op.id; }
  trackParam(_: number, p: RenderParam): string { return p.location + ':' + p.name; }
  trackResp(_: number, r: { code: string }): string { return r.code; }
  trackSchema(_: number, s: RenderSchema): string { return s.name; }
  trackProp(_: number, p: { name: string }): string { return p.name; }
  trackValue(_: number, v: string): string { return v; }
  trackAttr(_: number, e: AttrEntry): string { return e.key; }
}
