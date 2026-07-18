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
    r'C:\Users\joaor\Downloads\FAAC\FAAC_Capitulo_06_HTTPS_e_TLS_em_profundidade.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/https-tls-em-profundidade-pt/https-tls-content.data.ts',
    'en': ROOT / 'src/app/learn/https-tls-in-depth-en/https-tls-content.data.ts',
    'es': ROOT / 'src/app/learn/https-tls-en-profundidad-es/https-tls-content.data.ts',
}

FIGURE_FILES = [
    'figure-01-https-stack.svg', 'figure-02-tls-objectives.svg',
    'figure-03-tls12-handshake.svg', 'figure-04-tls13-handshake.svg',
    'figure-05-certificate-chain.svg', 'figure-06-sni-alpn.svg',
    'figure-07-record-protocol.svg', 'figure-08-gateway-tls-modes.svg',
    'figure-09-session-resumption.svg', 'figure-10-troubleshooting-tree.svg',
    'figure-11-certificate-lifecycle.svg',
]

FIGURE_ALTS = [
    'HTTPS como HTTP executado sobre TLS e TCP na pilha de comunicação',
    'Confidencialidade, integridade e autenticidade como objetivos fundamentais do TLS',
    'Fluxo de mensagens entre cliente e servidor durante um handshake TLS 1.2',
    'Fluxo simplificado e reduzido de mensagens durante um handshake TLS 1.3',
    'Cadeia de confiança formada por raiz, intermediária e certificado do servidor',
    'SNI e ALPN no ClientHello para seleção de certificado e protocolo',
    'Proteção de uma mensagem HTTP por fragmentação em records e criptografia AEAD',
    'Terminação, re-encryption e pass-through de TLS em gateways e balanceadores',
    'Retomada de sessão TLS com ticket ou PSK e handshake reduzido',
    'Árvore de troubleshooting para classificar falhas HTTPS por camada',
    'Ciclo operacional de certificados do inventário à rotação',
]

TABLE_CAPTIONS = [
    'Tabela 1 — Conceitos essenciais de TLS em APIs.',
    'Tabela 2 — Sintomas, causas prováveis e investigação de falhas HTTPS.',
    'Tabela 3 — Decisões arquiteturais e cuidados.',
    'Tabela 4 — Glossário do capítulo.',
    'Tabela 5 — Controles de Certificate Transparency e emissão.',
    'Tabela 6 — Estratégias de certificate pinning.',
    'Tabela 7 — Pontos de terminação TLS em Kubernetes e plataformas corporativas.',
    'Tabela 8 — Modelos de propagação de identidade mTLS.',
    'Tabela 9 — Evidências para auditoria TLS.',
]

# Logical tables can cross a physical page boundary in the source PDF.
TABLE_SEGMENTS = {
    1: [(15, 0)],
    2: [(15, 1), (16, 0)],
    3: [(16, 1)],
    4: [(18, 0), (19, 0)],
    5: [(20, 0)],
    6: [(20, 1)],
    7: [(21, 0), (22, 0)],
    8: [(22, 1), (23, 0)],
    9: [(23, 1)],
}

# The first physical segment is also the insertion point in the reconstructed article.
TABLE_STARTS = {
    1: (15, 448.3), 2: (15, 731.6), 3: (16, 246.9), 4: (18, 610.3),
    5: (20, 163.1), 6: (20, 587.1), 7: (21, 710.0), 8: (22, 679.1),
    9: (23, 350.4),
}

TERMINOLOGY_REPLACEMENTS = {
    'en': [
        ('Symmetrical, asymmetrical encryption, hashes and AEAD', 'Symmetric and asymmetric cryptography, hashes, and AEAD'),
        ('Application in the banking and financial world', 'Application in banking and finance'),
        ('Certificate expires indoors', 'Certificate expires in an internal environment'),
        ('Deepening:', 'Deep dive:'),
        ('Deep Dive:', 'Deep dive:'), ('unknown ca', 'unknown CA'),
        ('TLS Modes on API Gateways', 'TLS Modes in API Gateways'),
        ('Enterprise Proxies', 'enterprise proxies'), ('Frequent Anti-Patterns', 'frequent anti-patterns'),
        ('and Inspection', 'and inspection'),
        ('handshake error', 'handshake failure'), ('confidence chain', 'trust chain'),
        ('confidence store', 'truststore'), ('key store', 'keystore'),
        ('mutual TLS', 'mTLS'), ('front-end', 'frontend'), ('back-end', 'backend'),
        ('cipher set', 'cipher suite'), ('cipher suites set', 'cipher suites'),
        ('certificate fixation', 'certificate pinning'),
        ('session resume', 'session resumption'), ('direct secrecy', 'forward secrecy'),
        ('client hello', 'ClientHello'), ('server hello', 'ServerHello'),
        ('application protocol negotiation', 'application protocol negotiation'),
    ],
    'es': [
        ('Apretón de manos TLS', 'Handshake TLS'),
        ('Sesión, reanudación y actuación.', 'Sesión, reanudación y rendimiento'),
        ('Observabilidad de TLS y retroubleshooting', 'Observabilidad y troubleshooting de TLS'),
        ('Observabilidad de TLS y re-troubleshooting', 'Observabilidad y troubleshooting de TLS'),
        ('retroubleshooting', 'troubleshooting'), ('re-troubleshooting', 'troubleshooting'),
        ('El certificado vence en el interior', 'El certificado expira en un entorno interno'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace', 'gateway'),
        ('Puerta de enlace API', 'API Gateway'), ('puertas de enlace', 'gateways'),
        ('de la gateway', 'del gateway'), ('a la gateway', 'al gateway'),
        ('en la gateway', 'en el gateway'), ('con la gateway', 'con el gateway'),
        ('La gateway', 'El gateway'), ('Una gateway', 'Un gateway'),
        ('la gateway', 'el gateway'), ('una gateway', 'un gateway'),
        ('Conjuntos de cifrado', 'Cipher suites'), ('conjuntos de cifrado', 'cipher suites'),
        ('ca desconocida', 'CA desconocida'), ('protocolo de enlace', 'handshake'),
        ('ese bloqueo del navegador', 'ese candado del navegador'),
        ('En API corporativas', 'En APIs corporativas'), ('seguridad API', 'seguridad de APIs'),
        ('Lista de verificación de arquitectura TLS para API', 'Checklist de arquitectura TLS para APIs'),
        ('Análisis profundo:', 'Profundización:'),
        ('cadena de confianza', 'cadena de confianza'), ('almacén de confianza', 'truststore'),
        ('almacén de claves', 'keystore'), ('TLS mutuo', 'mTLS'),
        ('conjunto de cifrado', 'cipher suite'), ('conjuntos de cifrado', 'cipher suites'),
        ('fijación de certificados', 'certificate pinning'),
        ('reanudación de sesión', 'reanudación de sesión'),
        ('secreto hacia adelante', 'forward secrecy'),
        ('saludo del cliente', 'ClientHello'), ('saludo del servidor', 'ServerHello'),
        ('solución de problemas', 'troubleshooting'),
    ],
}


def clean_text(value: str) -> str:
    value = value.replace('\uf0b7', '•').replace('\u00ad', '')
    value = re.sub(r'\s+', ' ', value).strip()
    return (value
            .replace('api- management', 'api-management')
            .replace('certificates-for- clients', 'certificates-for-clients')
            .replace('Certiﬁcate', 'Certificate')
            .replace('certiﬁcate', 'certificate'))


def clean_cell(value: str | None) -> str:
    if not value:
        return ''
    value = value.replace('\n', ' ')
    value = re.sub(r'(^|\s)_+(?=\s|$)', ' ', value)
    value = re.sub(r'(?<=\w)-\s+(?=\w)', '-', value)
    return clean_text(value)


def block_text(block: dict) -> tuple[str, float, bool]:
    spans = [span for line in block.get('lines', []) for span in line.get('spans', [])]
    text = clean_text(' '.join(span['text'] for span in spans))
    size = max((span['size'] for span in spans), default=0)
    bold = any(span['flags'] & 16 for span in spans)
    return text, size, bold


def block_code(block: dict) -> str:
    return '\n'.join(''.join(span['text'] for span in line.get('spans', [])).rstrip()
                     for line in block.get('lines', [])).strip()


def slugify(value: str) -> str:
    replacements = str.maketrans('áàâãéêíóôõúüçñ', 'aaaaeeiooouucn')
    return re.sub(r'[^a-z0-9]+', '-', value.lower().translate(replacements)).strip('-')


def append_block(blocks: list[dict], block: dict) -> None:
    if block['kind'] == 'paragraph' and blocks and blocks[-1]['kind'] == 'paragraph':
        if not re.search(r'[.!?:)\]”`]$', blocks[-1]['text']):
            blocks[-1]['text'] += ' ' + block['text']
            return
    blocks.append(block)


def extract_tables(document: fitz.Document) -> tuple[dict[int, dict], dict[int, list[tuple[float, float]]]]:
    pages = {page for segments in TABLE_SEGMENTS.values() for page, _ in segments}
    found: dict[int, list[tuple[list[list[str | None]], tuple[float, float, float, float]]]] = {}
    regions: dict[int, list[tuple[float, float]]] = {}
    for page_number in pages:
        physical = document[page_number - 1].find_tables().tables
        found[page_number] = [(table.extract(), table.bbox) for table in physical]
        regions[page_number] = [(table.bbox[1] - 3, table.bbox[3] + 3) for table in physical]

    tables: dict[int, dict] = {}
    for number, segments in TABLE_SEGMENTS.items():
        rows: list[list[str]] = []
        for page_number, table_index in segments:
            extracted, _ = found[page_number][table_index]
            data = [[clean_cell(cell) for cell in row] for row in extracted]
            if rows and data and data[0] == rows[0]:
                data = data[1:]
            rows.extend(data)

        merged: list[list[str]] = []
        for row in rows:
            if not any(row):
                continue
            if merged and not row[0]:
                for index, cell in enumerate(row):
                    if cell:
                        merged[-1][index] = clean_text(f'{merged[-1][index]} {cell}')
            else:
                merged.append(row)
        tables[number] = {
            'caption': TABLE_CAPTIONS[number - 1],
            'headers': merged[0],
            'rows': merged[1:],
        }
    return tables, regions


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
    inserted_tables: set[int] = set()

    def flush_list() -> None:
        nonlocal pending_list
        if pending_list:
            blocks.append(pending_list)
            pending_list = None

    for page_number in range(1, len(document) + 1):
        page = document[page_number - 1]
        page_blocks = sorted((block for block in page.get_text('dict')['blocks'] if 'lines' in block),
                             key=lambda block: (block['bbox'][1], block['bbox'][0]))
        for source_block in page_blocks:
            text, size, bold = block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Capitulo 6'):
                continue
            if page_number == 1 and text in {
                'FAAC', 'Fundamentos e Arquitetura de APIs Corporativas', 'Capitulo 6',
                'HTTPS e TLS em profundidade',
            }:
                continue
            if page_number == 1 and text.startswith('Capitulo 6 HTTPS e TLS em profundidade'):
                continue

            for table_number, (start_page, start_y) in TABLE_STARTS.items():
                if table_number not in inserted_tables and page_number == start_page and y >= start_y - 3:
                    flush_list()
                    blocks.append({'kind': 'table', **copy.deepcopy(tables[table_number])})
                    inserted_tables.add(table_number)

            if any(start <= y <= end for start, end in table_regions.get(page_number, [])):
                continue

            figure_match = re.match(r'Figura\s+6\.(\d+)\s+-\s+(.+)', text)
            if figure_match:
                flush_list()
                number = int(figure_match.group(1))
                blocks.append({
                    'kind': 'figure',
                    'src': f'/assets/learn/https-tls/pt/{FIGURE_FILES[number - 1]}',
                    'alt': FIGURE_ALTS[number - 1],
                    'caption': text,
                })
                continue

            # Commands in the PDF use a smaller font than the body copy.
            if size <= 8.6 and page_number >= 16:
                flush_list()
                blocks.append({'kind': 'code', 'text': block_code(source_block)})
                continue

            # LibreOffice can join a paragraph or list to the following numbered section.
            embedded = re.search(r'\s+(6\.\d+(?:\.\d+)?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ])', text)
            if embedded:
                before = text[:embedded.start()].strip()
                after = text[embedded.start():].strip()
                if before:
                    flush_list()
                    if before.startswith('•'):
                        blocks.append({'kind': 'list', 'ordered': False,
                                       'items': [clean_text(item) for item in before.split('•') if clean_text(item)]})
                    elif numbered_items(before):
                        blocks.append({'kind': 'list', 'ordered': True, 'items': numbered_items(before)})
                    else:
                        append_block(blocks, {'kind': 'paragraph', 'text': before})
                text, size, bold = after, 17, True

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
            if size >= 16:
                heading = re.sub(r'^6\.\d+(?:\.\d+)?\s+', '', text).strip()
                blocks.append({'kind': 'heading', 'level': 2, 'text': heading, 'id': slugify(heading)})
            elif size >= 12.5 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 10.5:
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
    size = 0
    for index, value in enumerate(values):
        estimate = len(value) + 24
        if current and size + estimate > 3600:
            groups.append(current)
            current, size = [], 0
        current.append((index, value))
        size += estimate
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


def localize_blocks(source: list[dict], locale: str) -> list[dict]:
    translations = translate_values(translatable_values(source), locale)
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
    return localized


def polish_tree(value, locale: str):
    if isinstance(value, str):
        return polish(value, locale)
    if isinstance(value, list):
        return [polish_tree(item, locale) for item in value]
    if isinstance(value, dict):
        return {key: polish_tree(item, locale) for key, item in value.items()}
    return value


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
english = polish_tree(localize_blocks(portuguese, 'en'), 'en')
spanish = polish_tree(localize_blocks(portuguese, 'es'), 'es')

assert 'retroubleshooting' not in json.dumps(spanish, ensure_ascii=False)
assert 're-troubleshooting' not in json.dumps(spanish, ensure_ascii=False)

write_typescript(OUTPUTS['pt'], 'HTTPS_TLS_PT_CHAPTER_BLOCKS', portuguese, 'pt')
write_typescript(OUTPUTS['en'], 'HTTPS_TLS_EN_CHAPTER_BLOCKS', english, 'en')
write_typescript(OUTPUTS['es'], 'HTTPS_TLS_ES_CHAPTER_BLOCKS', spanish, 'es')

print(f'Generated {len(portuguese)} Portuguese blocks and two complete translations.')
