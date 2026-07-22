from __future__ import annotations
import copy, importlib.util, json, re, sys
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_32_Observabilidade_Logs_Metricas_Tracing_OpenTelemetry.pdf')
spec = importlib.util.spec_from_file_location('c31', ROOT / 'scripts/generate-chapter31-content.py')
base = importlib.util.module_from_spec(spec); assert spec.loader; spec.loader.exec_module(base)
CORE, UTIL = base.CORE, base.UTIL
OUTPUTS = {
    'pt': ROOT / 'src/app/learn/observabilidade-logs-metricas-tracing-opentelemetry-pt/observability-content.data.ts',
    'en': ROOT / 'src/app/learn/observability-logs-metrics-tracing-opentelemetry-en/observability-content.data.ts',
    'es': ROOT / 'src/app/learn/observabilidad-logs-metricas-tracing-opentelemetry-es/observability-content.data.ts',
}
ASSET = '/assets/learn/observability-logs-metrics-tracing-opentelemetry'
FIGURES = {
    1: ('figure-01-signals.svg', 'Logs, métricas e traces correlacionados por contexto compartilhado'),
    2: ('figure-02-trace.svg', 'Trace distribuído decompondo a latência entre gateway, serviço e dependências'),
    3: ('figure-03-collector.svg', 'OpenTelemetry Collector processando sinais entre receivers, processors e exporters'),
    4: ('figure-04-sampling.svg', 'Comparação entre head sampling e tail sampling'),
    5: ('figure-05-slo.svg', 'Telemetria transformada em SLI, SLO e alerta de burn rate'),
}

def rows(doc, page, index):
    return [[CORE.clean_table_cell(c) for c in row] for row in doc[page - 1].find_tables().tables[index].extract()]
def tbl(data, caption): return {'kind': 'table', 'caption': caption, 'headers': data[0], 'rows': data[1:]}
def tables(doc):
    return {
        'concepts': tbl(rows(doc, 3, 0), 'Tabela 1 - Os conceitos se complementam, mas atendem objetivos diferentes.'),
        'logs': tbl(rows(doc, 4, 0), 'Tabela 2 - Logs úteis são desenhados como contrato operacional.'),
        'metrics': tbl(rows(doc, 4, 1), 'Tabela 3 - O instrumento precisa representar a semântica da medição.'),
        'otel': tbl(rows(doc, 5, 0), 'Tabela 4 - OpenTelemetry separa contrato de instrumentação e execução do pipeline.'),
        'semantic': tbl(rows(doc, 6, 0), 'Tabela 5 - Convenções semânticas tornam a telemetria interoperável.'),
        'layers': tbl(rows(doc, 8, 0), 'Tabela 6 - Cada camada possui sinais próprios, mas a jornada precisa permanecer correlacionável.'),
        'trouble': tbl(rows(doc, 9, 0), 'Tabela 7 - Diagnóstico começa separando geração, propagação, processamento e armazenamento.'),
        'glossary': tbl(rows(doc, 10, 0), 'Tabela 8 - Vocabulário essencial do capítulo.'),
    }

TABLES = {3: [(90, 185, 'concepts')], 4: [(52, 148, 'logs'), (298, 395, 'metrics')], 5: [(440, 540, 'otel')], 6: [(580, 680, 'semantic')], 8: [(205, 285, 'layers')], 9: [(52, 165, 'trouble')], 10: [(190, 465, 'glossary')]}
FIG_REGIONS = {3: [(340, 490)], 4: [(620, 842)], 6: [(55, 250)], 7: [(95, 275), (550, 735)]}
CODE = {3: [(700, 790)], 5: [(255, 290)], 6: [(270, 440)]}

def extract():
    doc = fitz.open(PDF_PATH); table_data = tables(doc); seen = set()
    out = [
        {'kind': 'subhead', 'text': 'Observabilidade: correlacionar sinais para explicar o comportamento real'},
        {'kind': 'figure', 'src': f'{ASSET}/pt/overview.svg', 'alt': 'Logs, métricas e traces convergindo em contexto compartilhado', 'caption': 'Figura de abertura - Logs, métricas e traces ganham valor quando compartilham contexto e semântica.'},
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Sinais isolados mostram sintomas; correlação por contexto permite reconstruir causa, impacto e dependências.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    for page_number in range(2, len(doc) + 1):
        blocks = sorted((b for b in doc[page_number - 1].get_text('dict')['blocks'] if 'lines' in b), key=lambda b: (b['bbox'][1], b['bbox'][0]))
        for source in blocks:
            text, size, bold = UTIL.block_text(source); y = source['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text): continue
            figure_caption = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
            if figure_caption:
                number = int(figure_caption.group(1)); filename, alt = FIGURES[number]
                out.append({'kind': 'figure', 'src': f'{ASSET}/pt/{filename}', 'alt': alt, 'caption': text}); continue
            if any(a <= y <= z for a, z in FIG_REGIONS.get(page_number, [])): continue
            hit = False
            for a, z, key in TABLES.get(page_number, []):
                if a <= y <= z:
                    if key not in seen: out.append(copy.deepcopy(table_data[key])); seen.add(key)
                    hit = True; break
            if hit: continue
            if any(a <= y <= z for a, z in CODE.get(page_number, [])):
                UTIL.append_block(out, {'kind': 'code', 'text': UTIL.block_code(source)}); continue
            if text.startswith(('•', '●')):
                items = [UTIL.clean_text(x) for x in re.split(r'[•●]', text) if UTIL.clean_text(x)]
                if out and out[-1]['kind'] == 'list' and not out[-1]['ordered']: out[-1]['items'].extend(items)
                else: out.append({'kind': 'list', 'ordered': False, 'items': items})
            elif size >= 14: out.append({'kind': 'heading', 'level': 2, 'text': text, 'id': UTIL.slugify(text)})
            elif size >= 9.8 and bold: out.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.3: out.append({'kind': 'subhead', 'text': text})
            else: UTIL.append_block(out, {'kind': 'paragraph', 'text': text})
    return out

PRESERVE = base.PRESERVE | {'OpenTelemetry', 'OTel', 'OTLP', 'Collector', 'API', 'SDK', 'logs', 'metrics', 'traces', 'profiles', 'Resource', 'Resource attributes', 'trace_id', 'span_id', 'traceparent', 'tracestate', 'baggage', 'Baggage', 'Trace Context', 'W3C Trace Context', 'Span', 'Trace', 'SpanKind', 'SERVER', 'CLIENT', 'PRODUCER', 'CONSUMER', 'INTERNAL', 'Events', 'Links', 'Counter', 'Histogram', 'Gauge', 'UpDownCounter', 'View', 'LogRecord', 'Exemplar', 'SLI', 'SLO', 'error budget', 'burn rate', 'head sampling', 'tail sampling', 'parent-based sampling', 'semantic conventions', 'service.name', 'service.version', 'deployment.environment.name', 'http.route', 'http.request.method', 'http.response.status_code', 'rpc.system', 'rpc.service', 'rpc.method', 'messaging.system', 'receiver', 'processor', 'exporter', 'extension', 'memory_limiter', 'batch', 'gRPC', 'HTTP', 'JSON', 'YAML', 'Prometheus', 'Kubernetes', 'Kafka', 'API Gateway', 'LGPD', 'PII', 'TLS', 'eBPF', 'OTel Weaver'}
def polish(value, language):
    value = CORE.template.template.base.polish(value, language).replace('\u200b', '').replace('\ufeff', '')
    replacements = {
        'en': {'specimens': 'exemplars', 'Specimens': 'Exemplars'},
        'es': {
            'OpenTelemetría': 'OpenTelemetry', 'retroubleshooting': 'troubleshooting',
            'recopiladores': 'Collectors', 'recopilador': 'Collector', 'Recopilador': 'Collector',
            'seguimientos': 'traces', 'seguimiento': 'trace', 'Seguimiento': 'Trace',
            'trazados': 'traces', 'trazado distribuido': 'tracing distribuido', 'Trazado distribuido': 'Tracing distribuido',
            'tramos': 'spans', 'tramo': 'span', 'lapsos': 'spans', 'lapso': 'span',
            'equipaje': 'baggage', 'Equipaje': 'Baggage',
            'muestreo basado en los padres': 'parent-based sampling', 'Muestreo basado en los padres': 'Parent-based sampling',
            'muestreo de cabezas': 'head sampling', 'muestreo de cabeza': 'head sampling', 'Muestreo de cabeza': 'Head sampling',
            'muestreo de cola': 'tail sampling', 'Muestreo de cola': 'Tail sampling',
            'muestreo': 'sampling', 'Muestreo': 'Sampling',
            'oleoducto': 'pipeline', 'tubería': 'pipeline',
            'especímenes': 'exemplars', 'especímen': 'exemplar',
        },
    }
    for old, new in replacements.get(language, {}).items(): value = value.replace(old, new)
    return value
def localize(source, language, translated):
    output = copy.deepcopy(source)
    for index, block in enumerate(output):
        original, kind = source[index], block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            block['text'] = polish(translated[block['text']], language)
            if kind == 'heading' and block.get('level') == 2: block['id'] = UTIL.slugify(block['text'])
        elif kind == 'list': block['items'] = [polish(translated[item], language) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translated[block['alt']], language); block['caption'] = polish(translated[block['caption']], language); block['src'] = block['src'].replace('/pt/', f'/{language}/')
        elif kind == 'code':
            replacements = {
                'en': {'pagamentos-api': 'payments-api', 'producao': 'production', '/pagamentos/{id}/confirmacao': '/payments/{id}/confirmation', 'observabilidade.internal': 'observability.internal', 'tenant.tier': 'tenant.tier', 'region.origin': 'region.origin'},
                'es': {'pagamentos-api': 'pagos-api', 'producao': 'produccion', '/pagamentos/{id}/confirmacao': '/pagos/{id}/confirmacion', 'observabilidade.internal': 'observabilidad.internal', 'tenant.tier': 'tenant.tier', 'region.origin': 'region.origin'},
            }
            for old, new in replacements[language].items(): block['text'] = block['text'].replace(old, new)
        elif kind == 'table':
            block['caption'] = polish(translated[block['caption']], language)
            block['headers'] = [value if value in PRESERVE else polish(translated[value], language) for value in original['headers']]
            block['rows'] = [[value if value in PRESERVE else polish(translated[value], language) for value in row] for row in original['rows']]
    return output

def main():
    pt = extract(); values = UTIL.translatable_values(pt)
    en = localize(pt, 'en', UTIL.translate_values(values, 'en')); es = localize(pt, 'es', UTIL.translate_values(values, 'es'))
    writer = CORE.template.template.base.write_typescript
    writer(OUTPUTS['pt'], 'OBSERVABILITY_PT_BLOCKS', pt, 'pt'); writer(OUTPUTS['en'], 'OBSERVABILITY_EN_BLOCKS', en, 'en'); writer(OUTPUTS['es'], 'OBSERVABILITY_ES_BLOCKS', es, 'es')
    print(json.dumps({'blocks': len(pt), 'values': len(values), 'h2': sum(b.get('level') == 2 for b in pt), 'tables': sum(b['kind'] == 'table' for b in pt), 'figures': sum(b['kind'] == 'figure' for b in pt), 'codes': sum(b['kind'] == 'code' for b in pt)}, ensure_ascii=False))
if __name__ == '__main__': main()
