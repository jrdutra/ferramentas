from __future__ import annotations

import copy
import importlib.util
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_21_API_Gateways_Conceitos_e_Arquitetura.pdf')
spec = importlib.util.spec_from_file_location('chapter20_generator', ROOT / 'scripts/generate-chapter20-content.py')
base = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(base)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/api-gateways-conceitos-arquitetura-pt/api-gateways-content.data.ts',
    'en': ROOT / 'src/app/learn/api-gateways-concepts-architecture-en/api-gateways-content.data.ts',
    'es': ROOT / 'src/app/learn/api-gateways-conceptos-arquitectura-es/api-gateways-content.data.ts',
}
ASSET_ROOT = '/assets/learn/api-gateways-architecture'
FIGURES = {
    1: ('figure-01-platform-planes.svg', 'Planos de dados, controle, gestão e desenvolvedores de uma plataforma de APIs'),
    2: ('figure-02-request-pipeline.svg', 'Pipeline de processamento de uma requisição no API Gateway'),
    3: ('figure-03-gateway-topologies.svg', 'Topologias centralizada, por domínio, em camadas e híbrida de API Gateway'),
    4: ('figure-04-high-availability.svg', 'Arquitetura de alta disponibilidade do data plane e control plane'),
    5: ('figure-05-observability.svg', 'Correlação e observabilidade entre conexões inbound e outbound do gateway'),
}

def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[base.clean_table_cell(cell) for cell in row] for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}

def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'concepts': extracted_table(document, 3, 0, 'Tabela 1 - Conceitos próximos não devem ser tratados como sinônimos.'),
        'policies': extracted_table(document, 6, 0, 'Tabela 2 - Políticas precisam ser avaliadas pelo efeito operacional, não apenas pela funcionalidade.'),
        'connectivity': extracted_table(document, 6, 1, 'Tabela 3 - A conectividade de saída concentra grande parte dos problemas 502 e 503.'),
        'traffic': extracted_table(document, 7, 0, 'Tabela 4 - Controles de tráfego dependem de chave, estado e semântica.'),
        'dependencies': extracted_table(document, 9, 0, 'Tabela 5 - Cada dependência externa aumenta a disponibilidade composta do gateway.'),
        'capacity': extracted_table(document, 10, 0, 'Tabela 6 - Capacidade é multidimensional e precisa de teste representativo.'),
        'diagnostics': extracted_table(document, 10, 1, 'Tabela 7 - O código final é apenas o início do diagnóstico.'),
        'glossary': extracted_table(document, 12, 0, 'Tabela 8 - Vocabulário essencial do capítulo.'),
    }

TABLE_REGIONS = {
    3: [(529, 646, 'concepts')], 6: [(257, 375, 'policies'), (586, 704, 'connectivity')],
    7: [(433, 550, 'traffic')], 9: [(95, 213, 'dependencies')],
    10: [(294, 411, 'capacity'), (612, 746, 'diagnostics')], 12: [(359, 656, 'glossary')],
}
FIGURE_REGIONS = {4: [(244, 443)], 5: [(60, 242)], 8: [(60, 242), (410, 617)], 9: [(385, 584)]}

def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Do consumidor ao backend: controle centralizado no caminho da API'},
        {'kind': 'figure', 'src': f'{ASSET_ROOT}/pt/overview.svg', 'alt': 'API Gateway mediando consumidores, edge, políticas e serviços de backend', 'caption': 'Figura de abertura - O API Gateway ocupa uma posição de mediação entre consumidores e backends.'},
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'O gateway divide uma chamada em duas relações independentes: consumidor-gateway e gateway-backend.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    inserted_tables: set[str] = set()
    for page_number in range(2, len(document) + 1):
        page_blocks = sorted((b for b in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in b), key=lambda b: (b['bbox'][1], b['bbox'][0]))
        for source_block in page_blocks:
            text, size, bold = base.template.template.base.base.block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue
            if any(start <= y <= end for start, end in FIGURE_REGIONS.get(page_number, [])):
                match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
                if match:
                    number = int(match.group(1)); filename, alt = FIGURES[number]
                    blocks.append({'kind': 'figure', 'src': f'{ASSET_ROOT}/pt/{filename}', 'alt': alt, 'caption': text})
                continue
            in_table = False
            for start, end, key in TABLE_REGIONS.get(page_number, []):
                if start <= y <= end:
                    if key not in inserted_tables:
                        blocks.append(copy.deepcopy(all_tables[key])); inserted_tables.add(key)
                    in_table = True; break
            if in_table: continue
            if text.startswith(('•', '●')):
                items = [base.template.template.base.base.clean_text(x) for x in re.split(r'[•●]', text) if base.template.template.base.base.clean_text(x)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']: blocks[-1]['items'].extend(items)
                else: blocks.append({'kind': 'list', 'ordered': False, 'items': items})
            elif size >= 14:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': base.template.template.base.base.slugify(text)})
            elif size >= 9.8 and bold: blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5: blocks.append({'kind': 'subhead', 'text': text})
            else: base.template.template.base.base.append_block(blocks, {'kind': 'paragraph', 'text': text})
    return blocks

PRESERVE_TERMS = base.PRESERVE_TERMS | {'API Gateway', 'reverse proxy', 'WAF', 'load balancer', 'service mesh', 'data plane', 'control plane', 'management plane', 'developer plane', 'listener', 'virtual host', 'SNI', 'Host', 'TLS', 'HTTP', 'JWT', 'JWKS', 'OAuth 2.0', 'OpenID Connect', 'mTLS', 'RBAC', 'CI/CD', 'rate limiting', 'quota', 'throttling', 'spike arrest', 'caching', 'retry', 'circuit breaker', 'health check', 'upstream', 'pooling', 'SNAT', 'WebSocket', 'gRPC', 'PDP', 'IdP', 'API Gateway Policy', 'canary', 'blue-green', 'GitOps', 'OpenTelemetry'}
REPLACEMENTS = {
    'en': [('Api Gateway', 'API Gateway'), ('Jwt', 'JWT'), ('Jwks', 'JWKS'), ('Oauth', 'OAuth'), ('Tls', 'TLS'), ('Http', 'HTTP')],
    'es': [('Puerta de enlace API', 'API Gateway'), ('puerta de enlace API', 'API Gateway'), ('Jwt', 'JWT'), ('Jwks', 'JWKS'), ('Oauth', 'OAuth'), ('Tls', 'TLS'), ('Http', 'HTTP'), ('proxy inverso', 'reverse proxy'), ('plano de datos', 'data plane'), ('plano de control', 'control plane')],
}

def polish(value: str, locale: str) -> str:
    value = base.template.template.base.polish(value, locale)
    for before, after in REPLACEMENTS[locale]: value = value.replace(before, after)
    return value.replace('\u200b', '').replace('\u200c', '').replace('\ufeff', '')

def localize(source: list[dict], locale: str, translations: dict[str, str]) -> list[dict]:
    result = copy.deepcopy(source)
    for index, block in enumerate(result):
        original = source[index]; kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            block['text'] = polish(translations[block['text']], locale)
            if kind == 'heading' and block.get('level') == 2: block['id'] = base.template.template.base.base.slugify(block['text'])
        elif kind == 'list': block['items'] = [polish(translations[x], locale) for x in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translations[block['alt']], locale); block['caption'] = polish(translations[block['caption']], locale); block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = polish(translations[block['caption']], locale)
            block['headers'] = [x if x in PRESERVE_TERMS else polish(translations[x], locale) for x in original['headers']]
            block['rows'] = [[x if x in PRESERVE_TERMS else polish(translations[x], locale) for x in row] for row in original['rows']]
    return result

def main() -> None:
    pt = extract_portuguese_blocks(); values = base.template.template.base.base.translatable_values(pt)
    en = localize(pt, 'en', base.template.template.base.base.translate_values(values, 'en'))
    es = localize(pt, 'es', base.template.template.base.base.translate_values(values, 'es'))
    base.template.template.base.write_typescript(OUTPUTS['pt'], 'API_GATEWAYS_PT_BLOCKS', pt, 'pt')
    base.template.template.base.write_typescript(OUTPUTS['en'], 'API_GATEWAYS_EN_BLOCKS', en, 'en')
    base.template.template.base.write_typescript(OUTPUTS['es'], 'API_GATEWAYS_ES_BLOCKS', es, 'es')
    print(json.dumps({'blocks': len(pt), 'values': len(values), 'h2': sum(b.get('level') == 2 for b in pt), 'tables': sum(b['kind'] == 'table' for b in pt), 'figures': sum(b['kind'] == 'figure' for b in pt)}, ensure_ascii=False))

if __name__ == '__main__': main()
