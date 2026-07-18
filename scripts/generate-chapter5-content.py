from __future__ import annotations

import copy
import json
import re
import sys
from pathlib import Path

import fitz
from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r'C:\Users\joaor\Downloads\FAAC\FAAC_Capitulo_05_HTTP_1_1_HTTP_2_e_HTTP_3.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/http-1-1-http-2-http-3-pt/http-versions-content.data.ts',
    'en': ROOT / 'src/app/learn/http-1-1-http-2-http-3-en/http-versions-content.data.ts',
    'es': ROOT / 'src/app/learn/http-1-1-http-2-http-3-es/http-versions-content.data.ts',
}

FIGURE_FILES = [
    'figure-01-shared-semantics.svg', 'figure-02-http-evolution.svg', 'figure-03-message-anatomy.svg',
    'figure-04-method-properties.svg', 'figure-05-etag-revalidation.svg', 'figure-06-http1-framing.svg',
    'figure-07-http1-hol.svg', 'figure-08-request-smuggling.svg', 'figure-09-http2-streams.svg',
    'figure-10-multiplexing-hol.svg', 'figure-11-hpack.svg', 'figure-12-alpn.svg',
    'figure-13-protocol-stacks.svg', 'figure-14-quic-loss-isolation.svg', 'figure-15-quic-migration.svg',
    'figure-16-qpack.svg', 'figure-17-http3-discovery.svg', 'figure-18-protocol-per-hop.svg',
    'figure-19-troubleshooting-tree.svg',
]

FIGURE_ALTS = [
    'Semântica HTTP comum mapeada de formas diferentes por HTTP/1.1, HTTP/2 e HTTP/3',
    'Linha do tempo da evolução do HTTP/0.9 ao HTTP/3',
    'Anatomia conceitual de uma requisição e de uma resposta HTTP',
    'Comparação de segurança e idempotência dos principais métodos HTTP',
    'Fluxo de revalidação condicional de cache com ETag',
    'Formas de delimitar o conteúdo de mensagens no HTTP/1.1',
    'Bloqueio head-of-line em respostas de pipelining HTTP/1.1',
    'Request smuggling causado por interpretações divergentes do framing',
    'Frames de diferentes streams intercalados em uma conexão HTTP/2',
    'Multiplexação HTTP/2 e bloqueio residual causado por perda TCP',
    'Blocos de campos, tabelas estática e dinâmica e representação compacta do HPACK',
    'Negociação de HTTP/2 ou HTTP/1.1 por ALPN durante o handshake TLS',
    'Comparação das pilhas HTTP/1.1, HTTP/2 e HTTP/3',
    'Isolamento de perda entre streams de uma conexão QUIC',
    'Migração de caminho QUIC com Connection IDs e validação do novo endereço',
    'Fluxos de encoder, decoder, requisições e tabela dinâmica no QPACK',
    'Descoberta, tentativa QUIC e fallback para HTTP/2 ou HTTP/1.1',
    'Versões HTTP negociadas independentemente em cada salto da arquitetura',
    'Árvore inicial para classificar falhas antes e depois de uma resposta HTTP',
]

TABLE_CAPTIONS = [
    'Tabela 1 - Organização conceitual do capítulo.',
    'Tabela 2 - Componentes comuns de uma URI HTTP.',
    'Tabela 3 - Códigos frequentes em APIs corporativas.',
    'Tabela 4 - Categorias de campos relevantes para APIs.',
    'Tabela 5 - Determinação de comprimento em HTTP/1.1.',
    'Tabela 6 - Timeouts e limites de conexão.',
    'Tabela 7 - Frames importantes do HTTP/2.',
    'Tabela 8 - Eventos de ciclo de vida em HTTP/2.',
    'Tabela 9 - Etapas relevantes do estabelecimento QUIC.',
    'Tabela 10 - Estrutura básica de uma conexão HTTP/3.',
    'Tabela 11 - Comparação resumida das versões.',
    'Tabela 12 - Evidências para investigar HTTP no Axway API Gateway.',
    'Tabela 13 - Pontos de atenção no Azure API Management.',
    'Tabela 14 - Observabilidade específica por versão.',
    'Tabela 15 - Matriz de sintomas e evidências.',
    'Tabela 16 - Checklist de projeto e revisão.',
    'Tabela 17 - Glossário do capítulo.',
]

# (one-based page number, table index on that page). Several PDF tables cross a physical page break.
TABLE_SEGMENTS = {
    1: [(3, 0)], 2: [(6, 0), (7, 0)], 3: [(8, 0)], 4: [(9, 0)],
    5: [(12, 0)], 6: [(13, 0)], 7: [(16, 0)], 8: [(16, 1), (17, 0)],
    9: [(20, 0)], 10: [(22, 0)], 11: [(24, 0)], 12: [(25, 0), (26, 0)],
    13: [(26, 1)], 14: [(26, 2), (27, 0)], 15: [(27, 1), (28, 0)],
    16: [(31, 0)], 17: [(32, 0), (33, 0), (34, 0)],
}

CALLOUT_HEADINGS = {
    'Princípio central', 'Leitura para gateways', 'Compatibilidade semântica',
    'Retry não é apenas uma decisão técnica', 'Regra operacional', 'Defesa em profundidade',
    'Modelo mental', 'Sintoma clássico', 'Pergunta de arquitetura', 'Aprendizado', 'Encerramento',
}

HEADING_OVERRIDES = {
    'en': {
        'Apresentação do capítulo': 'Chapter overview', 'Objetivos de aprendizagem': 'Learning objectives',
        'Estrutura do capítulo': 'Chapter structure', 'Ordem sugerida de leitura': 'Suggested reading order',
    },
    'es': {
        'Apresentação do capítulo': 'Presentación del capítulo', 'Objetivos de aprendizagem': 'Objetivos de aprendizaje',
        'Estrutura do capítulo': 'Estructura del capítulo', 'Ordem sugerida de leitura': 'Orden de lectura sugerido',
    },
}

TERMINOLOGY_REPLACEMENTS = {
    'en': [
        ('HTTP fields', 'HTTP fields'), ('header fields', 'fields'), ('headers fields', 'fields'),
        ('request target', 'request target'), ('safe method', 'safe method'), ('security method', 'safe method'),
        ('head-of-line lock', 'head-of-line blocking'), ('head-of-line blocking lock', 'head-of-line blocking'),
        ('field compression', 'field compression'), ('header compression', 'field compression'),
        ('shared cache', 'shared cache'), ('request contraband', 'request smuggling'),
        ('Gateway timeout', 'Gateway Timeout'), ('origin server', 'origin server'),
        ('content negotiation', 'content negotiation'), ('framework', 'framing'),
        ('framework rules', 'framing rules'), ('picture', 'frame'), ('pictures', 'frames'),
        ('flow identifier', 'stream ID'), ('flow reset', 'stream reset'),
        ('Trading: TLS, ALPN, h2 and h2c', 'Negotiation: TLS, ALPN, h2 and h2c'),
        ('Methods: intention, security and idempotence', 'Methods: intent, safety, and idempotency'),
        ('Methods: intention, safety and idempotence', 'Methods: intent, safety, and idempotency'),
        ('Fixation exercises', 'Review exercises'),
        ('Practical reading and diagnostic laboratories', 'Practical reading and diagnostic labs'),
        ('Application on Axway API Gateway', 'Using Axway API Gateway'),
        ('lack of body', 'no body'), ('Streams, states and closure', 'Streams, states, and shutdown'),
        ('HPACK: compression of stateful fields per connection', 'HPACK: per-connection stateful field compression'),
        ('query HPACK in parallel', 'consult HPACK in parallel'),
        ('listing what was delegated to QUIC', 'relating what was delegated to QUIC'),
        ('api- management', 'api-management'),
    ],
    'es': [
        ('campos de encabezado', 'campos HTTP'), ('campo de encabezado', 'campo HTTP'),
        ('método de seguridad', 'método seguro'), ('bloqueo de cabeza de línea', 'bloqueo head-of-line'),
        ('bloqueo de línea de cabeza', 'bloqueo head-of-line'), ('contrabando de solicitudes', 'request smuggling'),
        ('compresión de encabezados', 'compresión de campos'), ('encuadre', 'framing'),
        ('Marcos', 'Frames'), ('marcos', 'frames'), ('marco', 'frame'),
        ('servidor de origen', 'servidor de origen'), ('negociación de contenido', 'negociación de contenido'),
        ('tiempo de espera', 'timeout'), ('reintentos', 'retries'), ('reintento', 'retry'),
        ('Encuadre', 'Framing'), ('encuadre', 'framing'), ('Longitud del contenido', 'Content-Length'),
        ('longitud del contenido', 'Content-Length'), ('Codificación de transferencia', 'Transfer-Encoding'),
        ('Corrientes', 'Streams'), ('corrientes', 'streams'), ('Apretón de manos', 'Handshake'),
        ('Canalización', 'Pipelining'), ('agrupación', 'pooling'),
        ('Análisis divergente', 'Parsing divergente'), ('capa de estructura binaria', 'capa de framing binario'),
        ('control de stream', 'control de flujo'), ('ID de conexión', 'Connection IDs'),
        ('reserva de HTTP/3', 'fallback de HTTP/3'), ('el respaldo', 'el fallback'),
        ('solución de problemas', 'troubleshooting'), ('Lista de verificación', 'Checklist'),
        ('Ejercicios de fijación', 'Ejercicios de repaso'),
        ('Métodos: intención, seguridad e idempotencia', 'Métodos: intención, seguridad semántica e idempotencia'),
        ('Caché HTTP: actualización, reutilización e invalidación', 'Caché HTTP: frescura, reutilización e invalidación'),
        ('fragmentado y falta de cuerpo', 'chunked y ausencia de cuerpo'),
        ('Pipelining y bloqueo de cabecera de línea', 'Pipelining y bloqueo head-of-line'),
        ('Flujos QUIC', 'Streams QUIC'), ('entre flujos', 'entre streams'),
        ('Frames y flujos de control', 'Frames y streams de control'),
        ('para flujos QUIC', 'para streams QUIC'),
        ('api- management', 'api-management'),
    ],
}


def clean_text(value: str) -> str:
    value = re.sub(r'\s+', ' ', value.replace('\uf0b7', '•').replace('\u00ad', '')).strip()
    return (value
            .replace('api- management', 'api-management')
            .replace('/apim_policydev/ apigw_', '/apim_policydev/apigw_')
            .replace('remote_hosts/ index.html', 'remote_hosts/index.html'))


def clean_cell(value: str | None) -> str:
    if not value:
        return ''
    value = value.replace('\n', ' ')
    value = re.sub(r'(^|\s)_+(?=\s|$)', ' ', value)
    value = re.sub(r'(?<=\w)-\s+(?=\w)', '-', value)
    return clean_text(value)


def block_text(block: dict) -> tuple[str, float, bool, bool]:
    spans = [span for line in block.get('lines', []) for span in line.get('spans', [])]
    text = clean_text(' '.join(span['text'] for span in spans))
    size = max((span['size'] for span in spans), default=0)
    bold = any(span['flags'] & 16 for span in spans)
    mono = bool(spans) and all(span['flags'] & 8 for span in spans)
    return text, size, bold, mono


def block_code(block: dict) -> str:
    return '\n'.join(''.join(span['text'] for span in line.get('spans', [])).rstrip()
                     for line in block.get('lines', [])).strip()


def slugify(value: str) -> str:
    replacements = str.maketrans('áàâãéêíóôõúüçñ', 'aaaaeeiooouucn')
    return re.sub(r'[^a-z0-9]+', '-', value.lower().translate(replacements)).strip('-')


def append_block(blocks: list[dict], block: dict) -> None:
    if block['kind'] == 'code' and blocks and blocks[-1]['kind'] == 'code':
        blocks[-1]['text'] += '\n' + block['text']
        return
    if block['kind'] == 'paragraph' and blocks and blocks[-1]['kind'] == 'paragraph':
        if not re.search(r'[.!?:)\]”`]$', blocks[-1]['text']):
            blocks[-1]['text'] += ' ' + block['text']
            return
    blocks.append(block)


def extract_tables(document: fitz.Document) -> tuple[dict[int, dict], dict[int, list[tuple[float, float]]]]:
    found_by_page: dict[int, list[tuple[list[list[str | None]], tuple[float, float, float, float]]]] = {}
    regions: dict[int, list[tuple[float, float]]] = {}
    for page_number in {page for segments in TABLE_SEGMENTS.values() for page, _ in segments}:
        tables = document[page_number - 1].find_tables().tables
        # Materialize each extraction while its Page object is current. PyMuPDF's Table objects
        # retain page-bound state and must not be deferred until another page is loaded.
        found_by_page[page_number] = [(table.extract(), table.bbox) for table in tables]
        regions[page_number] = [(table.bbox[1] - 3, table.bbox[3] + 3) for table in tables]

    tables: dict[int, dict] = {}
    continuation_keys = {'termo', 'métrica', 'evento', 'componente', 'ponto de verificação'}
    for number, segments in TABLE_SEGMENTS.items():
        rows: list[list[str]] = []
        for page_number, table_index in segments:
            extracted, _ = found_by_page[page_number][table_index]
            data = [[clean_cell(cell) for cell in row] for row in extracted]
            if rows and data and data[0] == rows[0]:
                data = data[1:]
            rows.extend(data)

        merged: list[list[str]] = []
        for row in rows:
            if not any(row):
                continue
            first = row[0].casefold()
            if merged and (not row[0] or first in continuation_keys):
                for index, cell in enumerate(row):
                    if cell and not (index == 0 and first in continuation_keys):
                        merged[-1][index] = clean_text(f'{merged[-1][index]} {cell}')
            else:
                merged.append(row)
        tables[number] = {
            'caption': TABLE_CAPTIONS[number - 1],
            'headers': merged[0],
            'rows': merged[1:],
        }
    return tables, regions


def split_embedded_sections(text: str) -> list[tuple[str, str]]:
    pattern = re.compile(r'(?<!\d)(5\.\d+\s+[^\n]+?)(?=(?:\s+\d+\.\s)|$)')
    match = pattern.search(text)
    if not match or match.start() == 0:
        return [('text', text)]
    before = text[:match.start()].strip()
    heading = match.group(1).strip()
    return [('text', before), ('heading', heading)]


def numbered_items(text: str) -> list[str] | None:
    matches = list(re.finditer(r'(?<!\d)(\d{1,2})\.\s+', text))
    if not matches or matches[0].start() != 0:
        return None
    return [text[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(text)].strip()
            for index, match in enumerate(matches)]


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    tables, table_regions = extract_tables(document)
    blocks: list[dict] = []
    pending_list: dict | None = None

    def flush_list() -> None:
        nonlocal pending_list
        if pending_list:
            blocks.append(pending_list)
            pending_list = None

    for page_number in range(2, len(document) + 1):
        page = document[page_number - 1]
        page_blocks = sorted((block for block in page.get_text('dict')['blocks'] if 'lines' in block),
                             key=lambda block: (block['bbox'][1], block['bbox'][0]))
        for source_block in page_blocks:
            text, size, bold, mono = block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue

            figure_match = re.match(r'Figura\s+(\d+)\s+-\s+(.+)', text)
            if figure_match:
                flush_list()
                number = int(figure_match.group(1))
                blocks.append({
                    'kind': 'figure',
                    'src': f'/assets/learn/http-versions/pt/{FIGURE_FILES[number - 1]}',
                    'alt': FIGURE_ALTS[number - 1],
                    'caption': text,
                })
                continue

            table_match = re.match(r'Tabela\s+(\d+)\s+-', text)
            if table_match:
                flush_list()
                blocks.append({'kind': 'table', **copy.deepcopy(tables[int(table_match.group(1))])})
                continue
            if any(start <= y <= end for start, end in table_regions.get(page_number, [])):
                continue

            if mono:
                flush_list()
                append_block(blocks, {'kind': 'code', 'text': block_code(source_block)})
                continue

            # LibreOffice occasionally joins the end of a paragraph and the next numbered section in one block.
            embedded = re.search(r'\s+(5\.\d+\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ])', text)
            if embedded:
                before = text[:embedded.start()].strip()
                after = text[embedded.start():].strip()
                if before:
                    flush_list()
                    if before.startswith('•'):
                        blocks.append({
                            'kind': 'list', 'ordered': False,
                            'items': [clean_text(item) for item in before.split('•') if clean_text(item)],
                        })
                    elif numbered_items(before):
                        blocks.append({'kind': 'list', 'ordered': True, 'items': numbered_items(before)})
                    else:
                        append_block(blocks, {'kind': 'paragraph', 'text': before})
                text = after
                size = 19
                bold = True

            if text.startswith('•'):
                items = [clean_text(item) for item in text.split('•') if clean_text(item)]
                if pending_list and pending_list['ordered'] is False:
                    pending_list['items'].extend(items)
                else:
                    flush_list()
                    pending_list = {'kind': 'list', 'ordered': False, 'items': items}
                continue

            items = numbered_items(text) if size < 13 else None
            if items:
                if pending_list and pending_list['ordered'] is True:
                    pending_list['items'].extend(items)
                else:
                    flush_list()
                    pending_list = {'kind': 'list', 'ordered': True, 'items': items}
                continue

            flush_list()
            if size >= 18:
                heading = re.sub(r'^5\.\d+\s+', '', text).strip()
                blocks.append({'kind': 'heading', 'level': 2, 'text': heading, 'id': slugify(heading)})
            elif size >= 13.5 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif text in CALLOUT_HEADINGS or (bold and size >= 9.4):
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                append_block(blocks, {'kind': 'paragraph', 'text': text})

    flush_list()
    return blocks


def translatable_values(blocks: list[dict]) -> list[str]:
    values: list[str] = []
    for block in blocks:
        if block['kind'] in {'heading', 'subhead', 'paragraph'}:
            values.append(block['text'])
        elif block['kind'] == 'list':
            values.extend(block['items'])
        elif block['kind'] == 'figure':
            values.extend([block['alt'], block['caption']])
        elif block['kind'] == 'table':
            values.extend([block['caption'], *block['headers']])
            values.extend(cell for row in block['rows'] for cell in row)
    return list(dict.fromkeys(value for value in values if value))


def translate_values(values: list[str], target: str) -> dict[str, str]:
    groups: list[list[tuple[int, str]]] = []
    current: list[tuple[int, str]] = []
    current_size = 0
    for index, value in enumerate(values):
        estimated = len(value) + 24
        if current and current_size + estimated > 3600:
            groups.append(current)
            current, current_size = [], 0
        current.append((index, value))
        current_size += estimated
    if current:
        groups.append(current)

    translator = GoogleTranslator(source='pt', target=target)
    translated: dict[str, str] = {}
    for group_index, group in enumerate(groups, start=1):
        payload = '\n'.join(f'[[[UTB{index:04d}]]]\n{value}' for index, value in group)
        result = translator.translate(payload)
        parts = re.split(r'\[\[\[UTB(\d{4})\]\]\]', result)
        parsed = {int(parts[position]): parts[position + 1].strip()
                  for position in range(1, len(parts), 2)}
        if len(parsed) != len(group):
            parsed = {index: translator.translate(value) for index, value in group}
        for index, original in group:
            translated[original] = clean_text(parsed[index])
        print(f'{target}: translated group {group_index}/{len(groups)}', flush=True)
    return translated


def polish(value: str, locale: str) -> str:
    for before, after in TERMINOLOGY_REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value


def localize_code(value: str, locale: str) -> str:
    target = 'en' if locale == 'en' else 'es'
    translator = GoogleTranslator(source='pt', target=target)
    lines = []
    for line in value.splitlines():
        match = re.match(r'^(\s*(?:#|;|//)\s*)(.+)$', line)
        if match and re.search(r'[A-Za-zÀ-ÿ]{4}', match.group(2)):
            line = match.group(1) + translator.translate(match.group(2))
        lines.append(line)
    localized = '\n'.join(lines)
    return localized.replace('   ou   ', '   or   ' if locale == 'en' else '   o   ')


def localize_blocks(source: list[dict], locale: str) -> list[dict]:
    translations = translate_values(translatable_values(source), 'en' if locale == 'en' else 'es')
    translations.update(HEADING_OVERRIDES[locale])
    localized = copy.deepcopy(source)
    for block in localized:
        kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            original = block['text']
            block['text'] = polish(translations.get(original, original), locale)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = slugify(block['text'])
        elif kind == 'list':
            block['items'] = [polish(translations.get(item, item), locale) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translations[block['alt']], locale)
            block['caption'] = polish(translations[block['caption']], locale)
            block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = polish(translations[block['caption']], locale)
            block['headers'] = [polish(translations.get(value, value), locale) for value in block['headers']]
            block['rows'] = [[polish(translations.get(value, value), locale) for value in row]
                             for row in block['rows']]
        elif kind == 'code':
            block['text'] = localize_code(block['text'], locale)
    return localized


def write_typescript(path: Path, const_name: str, blocks: list[dict], locale: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    comment = {
        'pt': 'Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.',
        'en': 'Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.',
        'es': 'Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.',
    }[locale]
    path.write_text(
        "import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';\n\n"
        f'// {comment}\nexport const {const_name}: ChapterBlock[] = '
        + json.dumps(blocks, ensure_ascii=False, indent=2) + ';\n',
        encoding='utf-8',
    )


portuguese = extract_portuguese_blocks()
english = localize_blocks(portuguese, 'en')
spanish = localize_blocks(portuguese, 'es')

write_typescript(OUTPUTS['pt'], 'HTTP_VERSIONS_PT_CHAPTER_BLOCKS', portuguese, 'pt')
write_typescript(OUTPUTS['en'], 'HTTP_VERSIONS_EN_CHAPTER_BLOCKS', english, 'en')
write_typescript(OUTPUTS['es'], 'HTTP_VERSIONS_ES_CHAPTER_BLOCKS', spanish, 'es')

print(f'Generated {len(portuguese)} Portuguese blocks and two complete translations.')
