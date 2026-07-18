from __future__ import annotations

import copy
import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import fitz
from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_10_REST_Arquitetura_e_Boas_Praticas.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/rest-arquitetura-boas-praticas-pt/rest-content.data.ts',
    'en': ROOT / 'src/app/learn/rest-architecture-best-practices-en/rest-content.data.ts',
    'es': ROOT / 'src/app/learn/rest-arquitectura-buenas-practicas-es/rest-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'As restrições arquiteturais que, combinadas, formam o estilo REST'),
    2: ('figure-02.svg', 'Relação entre recurso, estado e representações em formatos diferentes'),
    3: ('figure-03.svg', 'Leitura condicional e controle otimista de concorrência com ETag'),
    4: ('figure-04.svg', 'REST em uma plataforma corporativa com políticas transversais no API Gateway'),
}


def clean_text(value: str) -> str:
    value = value.replace('\uf0b7', '●').replace('\u00ad', '')
    value = re.sub(r'(?<=\w)-\s+(?=\w)', '-', value)
    return re.sub(r'\s+', ' ', value).strip()


def clean_cell(value: str | None) -> str:
    return clean_text((value or '').replace('\n', ' '))


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
    if block['kind'] == 'code' and blocks and blocks[-1]['kind'] == 'code':
        blocks[-1]['text'] += '\n' + block['text']
        return
    if block['kind'] == 'paragraph' and blocks and blocks[-1]['kind'] == 'paragraph':
        previous = blocks[-1]['text']
        if not re.search(r'[.!?:;”\]`]$', previous) and not previous.startswith('http'):
            blocks[-1]['text'] += ' ' + block['text']
            return
    blocks.append(block)


def extracted_table(document: fitz.Document, page_number: int, table_index: int, caption: str) -> dict:
    rows = [[clean_cell(cell) for cell in row]
            for row in document[page_number - 1].find_tables().tables[table_index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    # Table 1 crosses a physical page boundary in the PDF, so its rows are joined here.
    table_1a = document[6].find_tables().tables[0].extract()
    table_1b = document[7].find_tables().tables[0].extract()
    table_1_rows = [[clean_cell(cell) for cell in row] for row in table_1a]
    table_1_rows.extend([[clean_cell(cell) for cell in row] for row in table_1b[1:]])
    return {
        'resources': {
            'kind': 'table',
            'caption': 'Tabela 1 - Exemplos de identificação de recursos e intenções distintas.',
            'headers': table_1_rows[0],
            'rows': table_1_rows[1:],
        },
        'methods': extracted_table(document, 8, 1, 'Tabela 2 - Propriedades semânticas dos métodos HTTP. Idempotência descreve o efeito pretendido, não a igualdade literal das respostas.'),
        'status': extracted_table(document, 9, 0, 'Tabela 3 - Códigos frequentes em APIs corporativas e erros de interpretação.'),
        'pagination': extracted_table(document, 10, 0, 'Tabela 4 - Estratégias de paginação e seus compromissos.'),
        'compatibility': extracted_table(document, 12, 0, 'Tabela 5 - Compatibilidade depende do comportamento dos consumidores, não apenas do schema.'),
        'troubleshooting': extracted_table(document, 15, 0, 'Tabela 6 - Classificação inicial de sintomas em uma arquitetura de APIs.'),
        'glossary': extracted_table(document, 18, 0, 'Tabela 7 - Glossário essencial do capítulo.'),
    }


TABLE_REGIONS = {
    7: [(690, 790, 'resources')],
    8: [(40, 105, 'resources'), (338, 520, 'methods')],
    9: [(288, 530, 'status')],
    10: [(600, 738, 'pagination')],
    12: [(650, 795, 'compatibility')],
    15: [(82, 262, 'troubleshooting')],
    18: [(60, 360, 'glossary')],
}

FIGURE_REGIONS = {
    4: (45, 275),
    7: (280, 458),
    12: (40, 232),
    14: (430, 628),
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {
            'kind': 'subhead',
            'text': 'Caminho REST de uma operação corporativa',
        },
        {
            'kind': 'figure',
            'src': '/assets/learn/rest-architecture/pt/overview.svg',
            'alt': 'Caminho REST de uma operação corporativa do consumidor até a persistência',
            'caption': 'Visão geral - o cliente expressa uma intenção sobre um recurso; gateway, domínio e persistência preservam a semântica da operação.',
        },
        {
            'kind': 'list',
            'ordered': True,
            'items': [
                'O cliente seleciona um recurso e uma operação sem conhecer a implementação interna.',
                'O gateway valida contexto, aplica limites e encaminha uma mensagem HTTP semanticamente correta.',
                'O serviço altera ou consulta o estado do domínio e devolve uma representação do resultado.',
            ],
        },
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted(
            (block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )
        for source_block in page_blocks:
            text, size, bold = block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue

            figure_region = FIGURE_REGIONS.get(page_number)
            if figure_region and figure_region[0] <= y <= figure_region[1]:
                figure_match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
                if figure_match:
                    number = int(figure_match.group(1))
                    filename, alt = FIGURES[number]
                    blocks.append({
                        'kind': 'figure',
                        'src': f'/assets/learn/rest-architecture/pt/{filename}',
                        'alt': alt,
                        'caption': text,
                    })
                continue

            in_table = False
            for start, end, table_key in TABLE_REGIONS.get(page_number, []):
                if start <= y <= end:
                    if table_key not in inserted_tables:
                        blocks.append(copy.deepcopy(all_tables[table_key]))
                        inserted_tables.add(table_key)
                    in_table = True
                    break
            if in_table:
                continue

            if text.startswith('●'):
                items = [clean_text(item) for item in text.split('●') if clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            is_code = (
                (page_number == 10 and 280 <= y <= 370)
                or (page_number == 11 and 255 <= y <= 365)
                or (page_number == 13 and 510 <= y <= 685)
            )
            if is_code:
                append_block(blocks, {'kind': 'code', 'text': block_code(source_block)})
                continue

            if size >= 16:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': slugify(text)})
            elif size >= 10.8 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5:
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                append_block(blocks, {'kind': 'paragraph', 'text': text})

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


def grouped(values: list[str], max_chars: int = 3300) -> list[list[tuple[int, str]]]:
    groups: list[list[tuple[int, str]]] = []
    current: list[tuple[int, str]] = []
    size = 0
    for index, value in enumerate(values):
        estimate = len(value) + 24
        if current and size + estimate > max_chars:
            groups.append(current)
            current, size = [], 0
        current.append((index, value))
        size += estimate
    if current:
        groups.append(current)
    return groups


def translate_group(group: list[tuple[int, str]], target: str) -> dict[int, str]:
    payload = '\n'.join(f'[[[UTB{index:04d}]]]\n{value}' for index, value in group)
    result = GoogleTranslator(source='pt', target=target).translate(payload)
    parts = re.split(r'\[\[\[UTB(\d{4})\]\]\]', result)
    parsed = {int(parts[position]): parts[position + 1].strip()
              for position in range(1, len(parts), 2)}
    if len(parsed) != len(group):
        translator = GoogleTranslator(source='pt', target=target)
        parsed = {index: translator.translate(value) for index, value in group}
    return parsed


def translate_values(values: list[str], target: str) -> dict[str, str]:
    groups = grouped(values)
    translated_by_index: dict[int, str] = {}
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(translate_group, group, target): number
                   for number, group in enumerate(groups, 1)}
        for future in as_completed(futures):
            translated_by_index.update(future.result())
            print(f'{target}: translated group {futures[future]}/{len(groups)}', flush=True)
    return {value: clean_text(translated_by_index[index]) for index, value in enumerate(values)}


REPLACEMENTS = {
    'en': [
        ('API gateways', 'API Gateways'),
        ('Api Gateway', 'API Gateway'),
        ('State without state', 'Stateless'),
        ('state-free', 'stateless'),
        ('media types', 'media types'),
        ('Problem detail', 'Problem Details'),
        ('problem detail', 'Problem Details'),
        ('contract oriented', 'contract-driven'),
        ('contract-oriented', 'contract-driven'),
        ('mass allocation', 'mass assignment'),
        ('broken object level authorization', 'Broken Object Level Authorization'),
        ('idempotence', 'idempotency'),
        ('Idempotence', 'Idempotency'),
        ('Resource, status and representation', 'Resource, State, and Representation'),
        ('Security, idempotency and repetition', 'Security, Idempotency, and Retries'),
        ('Conditional cache, ETag and concurrency', 'Conditional Caching, ETag, and Concurrency'),
        ('Stateless is not "stateless"', 'Stateless does not mean "without state"'),
        ('Update lost in registration', 'Lost Update in a Record'),
        ('the customer expresses an intention about a feature', 'the client expresses an intention about a resource'),
        ('The customer knows the interaction contract', 'The client knows the interaction contract'),
        ('without the customer needing to know', 'without the client needing to know'),
        ('Confusing feature with representation', 'Confusing resource with representation'),
        ('all APIs have the same features', 'all APIs have the same resources'),
        ('A customer authorized to edit a surname', 'A client authorized to edit a nickname'),
        ('Customers should treat unknown extensions', 'Clients should treat unknown extensions'),
        ('tolerant customers', 'tolerant clients'),
        ('break customers', 'break clients'),
        ('customers capable of interpreting controls', 'clients capable of interpreting controls'),
        ('The drawing must be accurately described', 'The design must be described accurately'),
        ('bank lines', 'database rows'),
        ('Recommended location', 'Location recommended'),
        ('Depreciation', 'Deprecation'),
        ('depreciation', 'deprecation'),
        ('link for proof', 'link to the receipt'),
        ('reporting feature', 'report resource'),
        ('status and recovery feature', 'status and recovery resource'),
    ],
    'es': [
        ('Puertas de enlace API', 'API Gateways'),
        ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'),
        ('puerta de enlace API', 'API Gateway'),
        ('sin estado', 'stateless'),
        ('Sin estado', 'Stateless'),
        ('Detalles del problema', 'Problem Details'),
        ('detalles del problema', 'Problem Details'),
        ('asignación masiva', 'mass assignment'),
        ('Autorización de nivel de objeto rota', 'Broken Object Level Authorization'),
        ('autorización de nivel de objeto rota', 'Broken Object Level Authorization'),
        ('solución de problemas', 'troubleshooting'),
        ('Solución de problemas', 'Troubleshooting'),
        ('puerta de enlace', 'gateway'),
        ('Puerta de enlace', 'Gateway'),
        ('EL DESCANSO', 'REST'),
        ('El DESCANSO', 'REST'),
        ('DESCANSO', 'REST'),
        ('Un apátrida no es "apátrida"', 'Stateless no significa "sin estado"'),
        ('apátrida', 'stateless'),
        ('Recursos, estatus y representación', 'Recurso, Estado y Representación'),
        ('Seguridad, idempotencia y repetición', 'Seguridad, Idempotencia y Reintentos'),
        ('Caché condicional, ETag y concurrencia', 'Cache Condicional, ETag y Concurrencia'),
        ('diseño orientado a contratos', 'diseño orientado al contrato'),
        ('retroubleshooting', 'troubleshooting'),
        ('La autorización de nivel de objeto roto', 'Broken Object Level Authorization'),
        ('la gateway', 'el gateway'),
        ('La gateway', 'El gateway'),
        ('La pasarela', 'El gateway'),
        ('la pasarela', 'el gateway'),
        ('sobre una característica', 'sobre un recurso'),
        ('mismas características', 'mismos recursos'),
        ('Confundir característica con representación', 'Confundir recurso con representación'),
        ('Contexto stateless y de solicitud', 'Stateless y contexto de la solicitud'),
        ('la simultaneidad', 'la concurrencia'),
        ('seguimiento de pila', 'stack trace'),
        ('Ubicación para realizar consultas', 'Location para consulta'),
        ('La depreciación', 'La deprecación'),
        ('depreciación', 'deprecación'),
        ('enlace como prueba', 'enlace al comprobante'),
        ('diseño de contrato primero', 'diseño contract-first'),
        ('El código primero', 'Code-first'),
        ('una canalización', 'un pipeline'),
        ('La canalización', 'El pipeline'),
        ('de el gateway', 'del gateway'),
    ],
}


def polish(value: str, locale: str) -> str:
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    if locale == 'en':
        value = re.sub(r'\brestrictions\b', 'constraints', value)
        value = re.sub(r'\bRestrictions\b', 'Constraints', value)
        value = re.sub(r'\brestriction\b', 'constraint', value)
        value = re.sub(r'\bRestriction\b', 'Constraint', value)
    return value


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            '# Exemplo conceitual de JSON Patch': '# Conceptual JSON Patch example',
            'API de Contas': 'Accounts API',
            'obterConta': 'getAccount',
            'Conta principal': 'Primary account',
            'A conta não permite movimentação': 'The account does not allow transactions',
            'A conta 123 está bloqueada para débitos.': 'Account 123 is blocked for debits.',
            'conta-bloqueada': 'account-blocked',
            'ocorrencias': 'occurrences',
            'codigo': 'code',
            '/clientes/123': '/customers/123',
            '/apelido': '/nickname',
            '/situacao': '/status',
            'ATIVA': 'ACTIVE',
            'api.empresa.example/problemas': 'api.company.example/problems',
            'CONTA_BLOQUEADA': 'ACCOUNT_BLOCKED',
            '/contas/{contaId}': '/accounts/{accountId}',
            'contaId': 'accountId',
            'Conta encontrada': 'Account found',
            'Conta não encontrada': 'Account not found',
        },
        'es': {
            '# Exemplo conceitual de JSON Patch': '# Ejemplo conceptual de JSON Patch',
            'API de Contas': 'API de Cuentas',
            'obterConta': 'obtenerCuenta',
            'Conta principal': 'Cuenta principal',
            'A conta não permite movimentação': 'La cuenta no permite movimientos',
            'A conta 123 está bloqueada para débitos.': 'La cuenta 123 está bloqueada para débitos.',
            'conta-bloqueada': 'cuenta-bloqueada',
            'ocorrencias': 'incidencias',
            'codigo': 'codigo',
            '/apelido': '/apodo',
            '/situacao': '/situacion',
            'ATIVA': 'ACTIVA',
            'api.empresa.example/problemas': 'api.empresa.example/problemas',
            'CONTA_BLOQUEADA': 'CUENTA_BLOQUEADA',
            '/contas/{contaId}': '/cuentas/{cuentaId}',
            'contaId': 'cuentaId',
            'Conta encontrada': 'Cuenta encontrada',
            'Conta não encontrada': 'Cuenta no encontrada',
        },
    }[locale]
    for before, after in replacements.items():
        value = value.replace(before, after)
    return value


def localize_blocks(source: list[dict], locale: str, translations: dict[str, str]) -> list[dict]:
    localized = copy.deepcopy(source)
    for block in localized:
        kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            original = block['text']
            block['text'] = polish(translations[original], locale)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = slugify(block['text'])
        elif kind == 'list':
            block['items'] = [polish(translations[item], locale) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translations[block['alt']], locale)
            block['caption'] = polish(translations[block['caption']], locale)
            block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = polish(translations[block['caption']], locale)
            block['headers'] = [polish(translations[value], locale) for value in block['headers']]
            block['rows'] = [[polish(translations[value], locale) for value in row] for row in block['rows']]
        elif kind == 'code':
            block['text'] = localize_code(block['text'], locale)
    return localized


def write_typescript(path: Path, const_name: str, blocks: list[dict], locale: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    comment = {
        'pt': 'Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.',
        'en': 'Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.',
        'es': 'Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.',
    }[locale]
    path.write_text(
        "import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';\n\n"
        f'// {comment}\nexport const {const_name}: ChapterBlock[] = '
        + json.dumps(blocks, ensure_ascii=False, indent=2) + ';\n',
        encoding='utf-8',
    )


def main() -> None:
    portuguese = extract_portuguese_blocks()
    values = translatable_values(portuguese)
    with ThreadPoolExecutor(max_workers=2) as pool:
        future_en = pool.submit(translate_values, values, 'en')
        future_es = pool.submit(translate_values, values, 'es')
        translations = {'en': future_en.result(), 'es': future_es.result()}

    english = localize_blocks(portuguese, 'en', translations['en'])
    spanish = localize_blocks(portuguese, 'es', translations['es'])

    write_typescript(OUTPUTS['pt'], 'REST_PT_CHAPTER_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'REST_EN_CHAPTER_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'REST_ES_CHAPTER_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
