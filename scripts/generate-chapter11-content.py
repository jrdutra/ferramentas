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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_11_Modelo_de_Maturidade_REST_de_Richardson.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/modelo-maturidade-rest-richardson-pt/rmm-content.data.ts',
    'en': ROOT / 'src/app/learn/richardson-rest-maturity-model-en/rmm-content.data.ts',
    'es': ROOT / 'src/app/learn/modelo-madurez-rest-richardson-es/rmm-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Os quatro níveis cumulativos do Richardson Maturity Model'),
    2: ('figure-02.svg', 'Várias intenções convergindo para um endpoint e um dispatcher no nível 0'),
    3: ('figure-03.svg', 'Recursos distintos com identidade e escopo visíveis no nível 1'),
    4: ('figure-04.svg', 'Métodos e respostas HTTP carregando semântica compartilhada no nível 2'),
    5: ('figure-05.svg', 'API Gateway reforçando políticas sem substituir a semântica do domínio'),
    6: ('figure-06.svg', 'Controles de hipermídia expondo as transições permitidas para uma transferência'),
    7: ('figure-07.svg', 'Roteiro incremental de migração orientado por risco e compatibilidade'),
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
    glossary_rows = []
    for source in [
        'Affordance. Indicação de uma ação possível e de como executá-la no contexto de uma representação.',
        'Endpoint. Ponto de interação exposto por uma API, normalmente associado a URI e método.',
        'HATEOAS. Uso de hipermídia para orientar o estado da aplicação e as próximas transições.',
        'Hipermídia. Mídia que contém controles, relações ou links capazes de orientar navegação e ações.',
        'Idempotência. Propriedade pela qual repetições equivalentes produzem o mesmo efeito pretendido.',
        'Link relation. Relação que define o significado de um link entre o contexto e o destino.',
        'POX. Plain Old XML; no RMM, representa mensagens proprietárias transportadas por um endpoint genérico, mesmo quando o formato moderno é JSON.',
        'Problem Details. Formato padronizado para representar detalhes de problemas em APIs HTTP.',
        'Recurso. Abstração identificável que pode possuir representações e estado controlado pelo servidor.',
        'Representação. Dados transferidos que descrevem o estado atual ou pretendido de um recurso.',
        'Richardson Maturity Model. Modelo de quatro níveis para observar adoção de recursos, semântica HTTP e hipermídia.',
        'RMM. Sigla de Richardson Maturity Model.',
        'Semântica HTTP. Significado compartilhado de métodos, códigos, headers e outros elementos do protocolo.',
        'URI Template. Sintaxe para expressar URIs parametrizadas que podem ser expandidas por clientes.',
        'Web Linking. Modelo padronizado para expressar links e relações em mensagens web.',
    ]:
        term, definition = source.split('. ', 1)
        glossary_rows.append([term, definition])
    return {
        'levels': extracted_table(document, 4, 0, 'Tabela 1 - Capacidades, dependências e riscos associados a cada nível.'),
        'level0_effects': extracted_table(document, 5, 0, 'Tabela 2 - Efeitos típicos de uma interface concentrada no nível 0.'),
        'resource_questions': extracted_table(document, 6, 0, 'Tabela 3 - Perguntas para modelar recursos no nível 1.'),
        'http_elements': extracted_table(document, 8, 0, 'Tabela 4 - Elementos do protocolo que tornam a interface mais operável.'),
        'gateway_policies': extracted_table(document, 9, 0, 'Tabela 5 - Uso do nível 2 em políticas de gateway.'),
        'link_relations': extracted_table(document, 10, 0, 'Tabela 6 - Relações devem possuir significado estável e documentado.'),
        'hypermedia_tradeoffs': extracted_table(document, 11, 0, 'Tabela 7 - A decisão de adotar hipermídia depende do domínio e do ecossistema.'),
        'rmm_rest': extracted_table(document, 12, 0, 'Tabela 8 - RMM e REST respondem a perguntas relacionadas, porém diferentes.'),
        'assessment': extracted_table(document, 12, 1, 'Tabela 9 - Matriz de avaliação baseada em evidências.'),
        'troubleshooting': extracted_table(document, 13, 0, 'Tabela 10 - Sintomas úteis na investigação de interfaces em diferentes níveis.'),
        'glossary': {
            'kind': 'table',
            'caption': 'Glossário essencial do capítulo.',
            'headers': ['Termo', 'Definição'],
            'rows': glossary_rows,
        },
    }


TABLE_REGIONS = {
    4: [(45, 190, 'levels')],
    5: [(165, 275, 'level0_effects')],
    6: [(395, 525, 'resource_questions')],
    8: [(205, 335, 'http_elements')],
    9: [(300, 430, 'gateway_policies')],
    10: [(340, 470, 'link_relations')],
    11: [(420, 550, 'hypermedia_tradeoffs')],
    12: [(40, 170, 'rmm_rest'), (515, 710, 'assessment')],
    13: [(565, 710, 'troubleshooting')],
    16: [(75, 340, 'glossary')],
}

FIGURE_REGIONS = {
    3: [(625, 780)],
    4: [(320, 475)],
    6: [(45, 220)],
    7: [(470, 655)],
    9: [(145, 305), (565, 765)],
    13: [(200, 390)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {
            'kind': 'subhead',
            'text': 'Evolução da interface segundo o Richardson Maturity Model',
        },
        {
            'kind': 'figure',
            'src': '/assets/learn/richardson-maturity-model/pt/overview.svg',
            'alt': 'Evolução da interface pelos quatro níveis do Richardson Maturity Model',
            'caption': 'Visão geral - endpoint único, recursos, semântica HTTP e hipermídia formam uma progressão cumulativa de capacidades observáveis.',
        },
        {
            'kind': 'paragraph',
            'text': 'Cada nível acrescenta uma capacidade de desenho; o modelo não certifica conformidade completa com REST.',
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

            figure_region = next((region for region in FIGURE_REGIONS.get(page_number, []) if region[0] <= y <= region[1]), None)
            if figure_region:
                figure_match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
                if figure_match:
                    number = int(figure_match.group(1))
                    filename, alt = FIGURES[number]
                    blocks.append({
                        'kind': 'figure',
                        'src': f'/assets/learn/richardson-maturity-model/pt/{filename}',
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
                (page_number == 4 and 495 <= y <= 590)
                or (page_number == 7 and 175 <= y <= 270)
                or (page_number == 8 and 125 <= y <= 210)
                or (page_number == 8 and 540 <= y <= 650)
                or (page_number == 10 and 70 <= y <= 180)
                or (page_number == 11 and 165 <= y <= 235)
            )
            if is_code:
                append_block(blocks, {'kind': 'code', 'text': block_code(source_block)})
                continue

            if size >= 16:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': slugify(text)})
            elif size >= 9.8 and bold:
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
        ('Richardson REST Maturity Model', 'Richardson Maturity Model'),
        ('maturity level', 'maturity level'),
        ('one endpoint', 'single endpoint'),
        ('message-oriented entry point', 'message-oriented entry point'),
        ('hypermedia controls', 'hypermedia controls'),
        ('customers capable of interpreting relations', 'clients capable of interpreting relations'),
        ('customer knowledge', 'client knowledge'),
        ('customer must', 'client must'),
        ('customer needs', 'client needs'),
        ('customer depends', 'client depends'),
        ('customer follows', 'client follows'),
        ('customer concatenates', 'client concatenates'),
        ('its customers actually navigating', 'its clients actually navigating'),
        ('Transition-driven customers', 'Transition-driven clients'),
        ('transition-driven customers', 'transition-driven clients'),
        ('contract and transportation', 'contract and transport'),
        ('feature adoption', 'capability adoption'),
        ('Distinctive features with identity', 'Distinct resources with identity'),
        ('bank line', 'database row'),
        ('transversal policies', 'cross-cutting policies'),
        ('Features', 'Resources'),
        ('Answers', 'Responses'),
        ('Feature', 'Resource'),
        ('cancellation feature', 'cancellation resource'),
        ('Model consultation, creation', 'Model retrieval, creation'),
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
        ('Descanso', 'REST'),
        ('descanso', 'REST'),
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
        ('Modelo de madurez REST de Richardson', 'Richardson Maturity Model'),
        ('Modelo de Madurez REST de Richardson', 'Richardson Maturity Model'),
        ('controladores de hipermedia', 'controles de hipermedia'),
        ('controlador central', 'dispatcher central'),
        ('despachador', 'dispatcher'),
        ('Despachador', 'Dispatcher'),
        ('reintentos', 'retries'),
        ('Reintentos', 'Retries'),
        ('Modelo de madurez de Richardson', 'Richardson Maturity Model'),
        ('Su importe radica', 'Su valor radica'),
        ('Clientes impulsados por la transición', 'Clientes orientados por transiciones'),
        ('la eliminación utiliza BORRAR', 'la eliminación utiliza DELETE'),
        ('201 Creado con ubicación', '201 Created con Location'),
        ('202 Aceptado', '202 Accepted'),
        ('Ubicación identifica', 'Location identifica'),
        ('201 + Ubicación', '201 + Location'),
        ('Reutilización de controles de control de caché; Reintentar después guía el reintento; Permitir métodos compatibles con informes;', 'Cache-Control controla la reutilización; Retry-After orienta el reintento; Allow informa los métodos compatibles;'),
        ('Reintentar después', 'Retry-After'),
        ('creación sin Ubicación', 'creación sin Location'),
        ('El portal refuerza', 'El gateway refuerza'),
        ('enlaces de autoconfirmación y cancelación', 'enlaces self, confirm y cancel'),
        ('sólo puede ofrecer uno mismo y un recibo', 'solo puede ofrecer self y receipt'),
        ('Los hipermedia cambian', 'La hipermedia cambia'),
        ('Características', 'Recursos'),
        ('Característica', 'Recurso'),
        ('¿OBTENER, POST', '¿GET, POST'),
        ('OBTENER cambios de estado', 'GET cambia el estado'),
        ('adopte la función ELIMINAR o cancelar', 'adopte DELETE o un recurso de cancelación'),
        ('Permitir, enrutar y configurar ascendentes', 'Allow, configuración de ruta y upstream'),
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
    return localize_code(value, locale, code_context=False)


def localize_code(value: str, locale: str, code_context: bool = True) -> str:
    replacements = {
        'en': {
            '/servico-pagamentos': '/payment-service',
            'CRIAR_TRANSFERENCIA': 'CREATE_TRANSFER',
            'contaOrigem': 'sourceAccount',
            'contaDestino': 'destinationAccount',
            'valor': 'amount',
            '/transferencias': '/transfers',
            'PENDENTE': 'PENDING',
            '/preferencias/cliente': '/preferences/customer',
            'idioma': 'language',
            'notificacoes': 'notifications',
            'api.exemplo/problemas/estado-invalido': 'api.example/problems/invalid-state',
            'Transição não permitida': 'Transition not allowed',
            'A transferência já foi liquidada.': 'The transfer has already been settled.',
            '/confirmacao': '/confirmation',
            '/cancelamento': '/cancellation',
            'A confirmação não está disponível no estado atual': 'Confirmation is not available in the current state',
            '/servico': '/service',
            '/clientes': '/customers',
            '/cliente': '/customer',
            '/contas': '/accounts',
            '/conta': '/account',
            '/extrato': '/statement',
            '/extratos': '/statements',
            '/solicitacoes-transferencia': '/transfer-requests',
            '/agendamentos': '/appointments',
            '/consultar': '/view',
            '/cancelar': '/cancel',
            '/remover': '/remove',
            '/criarTransferencia': '/createTransfer',
            '/executarPagamento': '/executePayment',
            '/obterClientes': '/getCustomers',
        },
        'es': {
            '/servico-pagamentos': '/servicio-pagos',
            'CRIAR_TRANSFERENCIA': 'CREAR_TRANSFERENCIA',
            'contaOrigem': 'cuentaOrigen',
            'contaDestino': 'cuentaDestino',
            'valor': 'importe',
            '/transferencias': '/transferencias',
            'PENDENTE': 'PENDIENTE',
            '/preferencias/cliente': '/preferencias/cliente',
            'idioma': 'idioma',
            'notificacoes': 'notificaciones',
            'api.exemplo/problemas/estado-invalido': 'api.ejemplo/problemas/estado-invalido',
            'Transição não permitida': 'Transición no permitida',
            'A transferência já foi liquidada.': 'La transferencia ya fue liquidada.',
            '/confirmacao': '/confirmacion',
            '/cancelamento': '/cancelacion',
            'A confirmação não está disponível no estado atual': 'La confirmación no está disponible en el estado actual',
            '/servico': '/servicio',
            '/contas': '/cuentas',
            '/conta': '/cuenta',
            '/extrato': '/extracto',
            '/extratos': '/extractos',
            '/solicitacoes-transferencia': '/solicitudes-transferencia',
            '/agendamentos': '/citas',
            '/remover': '/eliminar',
            '/criarTransferencia': '/crearTransferencia',
            '/executarPagamento': '/ejecutarPago',
            '/obterClientes': '/obtenerClientes',
        },
    }[locale]
    for before, after in replacements.items():
        if not code_context and before == 'valor':
            continue
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

    write_typescript(OUTPUTS['pt'], 'RMM_PT_CHAPTER_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'RMM_EN_CHAPTER_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'RMM_ES_CHAPTER_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
