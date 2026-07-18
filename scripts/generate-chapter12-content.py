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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_12_OpenAPI_Swagger_Contratos_Documentacao_e_Automacao_FINAL.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/openapi-swagger-contratos-documentacao-automacao-pt/openapi-content.data.ts',
    'en': ROOT / 'src/app/learn/openapi-swagger-contracts-documentation-automation-en/openapi-content.data.ts',
    'es': ROOT / 'src/app/learn/openapi-swagger-contratos-documentacion-automatizacion-es/openapi-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Pipeline de contrato com pull request, parser, linter, diff, testes e publicação'),
    2: ('figure-02.svg', 'Anatomia do OpenAPI Object com info, servers, paths, components, security e tags'),
    3: ('figure-03.svg', 'Referências conectando uma operação a responses e schemas reutilizáveis'),
    4: ('figure-04.svg', 'Pipeline de governança reduzindo divergência entre contrato, portal, gateway e runtime'),
}


def clean_text(value: str) -> str:
    value = value.replace('\uf0b7', '●').replace('•', '●').replace('\u00ad', '')
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


def combined_table(document: fitz.Document, parts: list[tuple[int, int]], caption: str) -> dict:
    extracted = [document[page - 1].find_tables().tables[index].extract() for page, index in parts]
    headers = [clean_cell(cell) for cell in extracted[0][0]]
    rows: list[list[str]] = []
    for part_index, part in enumerate(extracted):
        start = 1 if part_index == 0 else 1 if [clean_cell(cell) for cell in part[0]] == headers else 0
        rows.extend([[clean_cell(cell) for cell in row] for row in part[start:]])
    return {'kind': 'table', 'caption': caption, 'headers': headers, 'rows': rows}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'vocabulary': extracted_table(document, 3, 0, 'Tabela 1 - Vocabulário que reduz ambiguidades em projetos e integrações.'),
        'metadata': extracted_table(document, 5, 0, 'Tabela 2 - Metadados também fazem parte da experiência e da governança.'),
        'parameters': extracted_table(document, 6, 0, 'Tabela 3 - A localização altera a serialização e a semântica do parâmetro.'),
        'composition': extracted_table(document, 8, 0, 'Tabela 4 - Composição exige precisão e testes com as ferramentas reais.'),
        'approaches': combined_table(document, [(9, 0), (10, 0)], 'Tabela 5 - A abordagem é uma decisão de processo, não apenas de ferramenta.'),
        'compatibility': extracted_table(document, 11, 0, 'Tabela 6 - Compatibilidade depende da direção dos dados e do comportamento dos consumidores.'),
        'versions': extracted_table(document, 11, 1, 'Tabela 7 - A versão do contrato deve ser escolhida pela capacidade da cadeia completa.'),
        'troubleshooting': combined_table(document, [(12, 0), (13, 0)], 'Tabela 8 - Diagnóstico deve separar validade da especificação, suporte da ferramenta e conformidade do runtime.'),
        'glossary': extracted_table(document, 14, 0, 'Tabela 9 - Vocabulário essencial do capítulo.'),
    }


TABLE_REGIONS = {
    3: [(555, 660, 'vocabulary')],
    5: [(425, 530, 'metadata')],
    6: [(370, 475, 'parameters')],
    8: [(230, 335, 'composition')],
    9: [(700, 785, 'approaches')],
    10: [(50, 115, 'approaches')],
    11: [(252, 390, 'compatibility'), (565, 680, 'versions')],
    12: [(724, 805, 'troubleshooting')],
    13: [(50, 140, 'troubleshooting')],
    14: [(417, 720, 'glossary')],
}

FIGURE_REGIONS = {
    4: [(105, 262), (412, 585)],
    8: [(535, 680)],
    12: [(390, 548)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {
            'kind': 'subhead',
            'text': 'Do desenho ao runtime: o contrato como eixo da plataforma',
        },
        {
            'kind': 'figure',
            'src': '/assets/learn/openapi-contracts/pt/overview.svg',
            'alt': 'Contrato OpenAPI conectando design, qualidade, automação, execução, documentação e governança',
            'caption': 'Figura de abertura - O contrato OpenAPI conecta desenho, implementação, testes, documentação e operação.',
        },
        {
            'kind': 'paragraph',
            'text': 'A mesma descrição orienta documentação, validação, segurança, compatibilidade e publicação.',
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
                        'src': f'/assets/learn/openapi-contracts/pt/{filename}',
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
                (page_number == 4 and 590 <= y <= 745)
                or (page_number == 6 and 60 <= y <= 200)
                or (page_number == 6 and 630 <= y <= 760)
                or (page_number == 7 and 265 <= y <= 390)
                or (page_number == 7 and 588 <= y <= 760)
                or (page_number == 9 and 180 <= y <= 325)
                or (page_number == 15 and 60 <= y <= 425)
            )
            if is_code:
                append_block(blocks, {'kind': 'code', 'text': block_code(source_block)})
                continue

            if size >= 14:
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
        ('production, approval, and sandbox', 'production, staging, and sandbox'),
        ('testing and approval', 'testing and staging'),
        ('during approval or production', 'during staging or production'),
        ('Mock is not approval', 'A mock is not a staging environment'),
        ('Mock is not staging', 'A mock is not a staging environment'),
        ('/customers/assets', '/customers/active'),
        ('assets as an id value', 'active as an identifier value'),
        ('describes responses results', 'responses describe results'),
        ('responses describes results', 'responses describe results'),
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
        ('OEA', 'OAS'),
        ('simulacros', 'mocks'),
        ('simulacro', 'mock'),
        ('un burlado', 'un mock'),
        ('La burla no es aprobación', 'Mock no es homologación'),
        ('pruebas y aprobación', 'pruebas y homologación'),
        ('producción, aprobación y zona de pruebas', 'producción, homologación y sandbox'),
        ('operaciones como obtener, publicar, colocar, parchear y eliminar', 'operaciones como get, post, put, patch y delete'),
        ('Cada Objeto de Operación', 'Cada Operation Object'),
        ('el resumen ofrece', 'summary ofrece'),
        ('detalles de los registros de descripción', 'description registra detalles'),
        ('OperationId', 'operationId'),
        ('OperationIds', 'operationIds'),
        ('las etiquetas organizan', 'tags organiza'),
        ('los parámetros y requestBody', 'parameters y requestBody'),
        ('describe los resultados de las respuestas', 'responses describe los resultados'),
        ('la seguridad puede', 'security puede'),
        ('obsoleto indica obsolescencia', 'deprecated indica deprecación'),
        ('/clientes/assets', '/clientes/activos'),
        ('la gateway', 'el gateway'),
        ('un canal de gobernanza', 'un pipeline de gobernanza'),
        ('Diferencia semántica', 'Semantic diff'),
        ('ejecute una diferencia', 'ejecute un diff'),
        ('diferenciación semántica', 'semantic diff'),
        ('diferenciación, burla, generación de SDK y pruebas de contratos en tuberías', 'diff, mocking, generación de SDKs y pruebas de contrato en pipelines'),
        ('Canalización de contratos', 'Pipeline de contratos'),
        ('canalización', 'pipeline'),
        ('canalizaciones', 'pipelines'),
        ('desaprobación', 'deprecación'),
        ('Desaprobar', 'Deprecar'),
        ('marcar obsoletos', 'marcar como deprecated'),
        ('La gateway', 'El gateway'),
        ('Una gateway', 'Un gateway'),
        ('una gateway', 'un gateway'),
        ('a el gateway', 'al gateway'),
        ('de el gateway', 'del gateway'),
        ('configuración de el gateway', 'configuración del gateway'),
        ('tiempo de ejecución', 'runtime'),
        ('confirmación del contrato', 'commit del contrato'),
        ('la misma confirmación', 'el mismo commit'),
        ('La misma confirmación', 'El mismo commit'),
        ('suma de comprobación', 'checksum'),
        ('suma de verificación', 'checksum'),
        ('Pérdidas de expresividad del documento.', 'Documente las pérdidas de expresividad.'),
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


# Chapter 12 terminology overrides the inherited chapter generator helpers.
OPENAPI_REPLACEMENTS = {
    'en': [
        ('OpenAPI description', 'OpenAPI Description'),
        ('OpenAPI specification', 'OpenAPI Specification'),
        ('OpenAPI object', 'OpenAPI Object'),
        ('Schema object', 'Schema Object'),
        ('Operation object', 'Operation Object'),
        ('Path item', 'Path Item'),
        ('Parameter object', 'Parameter Object'),
        ('Response object', 'Response Object'),
        ('Security scheme object', 'Security Scheme Object'),
        ('Security requirement object', 'Security Requirement Object'),
        ('Json schema', 'JSON Schema'),
        ('Problem details', 'Problem Details'),
        ('problem details', 'Problem Details'),
        ('Design first', 'Design-first'),
        ('design first', 'design-first'),
        ('Code first', 'Code-first'),
        ('code first', 'code-first'),
        ('API gateways', 'API Gateways'),
        ('API gateway', 'API Gateway'),
        ('semantic difference', 'semantic diff'),
        ('de-reference', 'dereference'),
        ('Depreciation', 'Deprecation'),
        ('depreciation', 'deprecation'),
        ('production, approval, and sandbox', 'production, staging, and sandbox'),
        ('testing and approval', 'testing and staging'),
        ('Mock is not approval', 'A mock is not a staging environment'),
        ('Mock is not staging', 'A mock is not a staging environment'),
        ('/customers/assets', '/customers/active'),
        ('assets as an id value', 'active as an identifier value'),
        ('describes responses results', 'responses describe results'),
        ('responses describes results', 'responses describe results'),
    ],
    'es': [
        ('Descripción de OpenAPI', 'OpenAPI Description'),
        ('descripción de OpenAPI', 'OpenAPI Description'),
        ('Especificación OpenAPI', 'OpenAPI Specification'),
        ('especificación OpenAPI', 'OpenAPI Specification'),
        ('Objeto OpenAPI', 'OpenAPI Object'),
        ('objeto OpenAPI', 'OpenAPI Object'),
        ('Objeto de esquema', 'Schema Object'),
        ('objeto de esquema', 'Schema Object'),
        ('Objeto de operación', 'Operation Object'),
        ('objeto de operación', 'Operation Object'),
        ('Elemento de ruta', 'Path Item'),
        ('elemento de ruta', 'Path Item'),
        ('Objeto de parámetro', 'Parameter Object'),
        ('Objeto de respuesta', 'Response Object'),
        ('Objeto de esquema de seguridad', 'Security Scheme Object'),
        ('Objeto de requisito de seguridad', 'Security Requirement Object'),
        ('Esquema JSON', 'JSON Schema'),
        ('esquema JSON', 'JSON Schema'),
        ('Detalles del problema', 'Problem Details'),
        ('detalles del problema', 'Problem Details'),
        ('Puertas de enlace API', 'API Gateways'),
        ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'),
        ('puerta de enlace API', 'API Gateway'),
        ('puerta de enlace', 'gateway'),
        ('Puerta de enlace', 'Gateway'),
        ('diseño primero', 'design-first'),
        ('Diseño primero', 'Design-first'),
        ('código primero', 'code-first'),
        ('Código primero', 'Code-first'),
        ('solución de problemas', 'troubleshooting'),
        ('Solución de problemas', 'Troubleshooting'),
        ('diferencia semántica', 'semantic diff'),
        ('La depreciación', 'La deprecación'),
        ('depreciación', 'deprecación'),
        ('OEA', 'OAS'),
        ('simulacros', 'mocks'),
        ('simulacro', 'mock'),
        ('un burlado', 'un mock'),
        ('La burla no es aprobación', 'Mock no es homologación'),
        ('pruebas y aprobación', 'pruebas y homologación'),
        ('producción, aprobación y zona de pruebas', 'producción, homologación y sandbox'),
        ('operaciones como obtener, publicar, colocar, parchear y eliminar', 'operaciones como get, post, put, patch y delete'),
        ('Cada Objeto de Operación', 'Cada Operation Object'),
        ('el resumen ofrece', 'summary ofrece'),
        ('detalles de los registros de descripción', 'description registra detalles'),
        ('OperationIds', 'operationIds'),
        ('OperationId', 'operationId'),
        ('las etiquetas organizan', 'tags organiza'),
        ('los parámetros y requestBody', 'parameters y requestBody'),
        ('describe los resultados de las respuestas', 'responses describe los resultados'),
        ('la seguridad puede', 'security puede'),
        ('obsoleto indica obsolescencia', 'deprecated indica deprecación'),
        ('/clientes/assets', '/clientes/activos'),
        ('la gateway', 'el gateway'),
        ('un canal de gobernanza', 'un pipeline de gobernanza'),
        ('Diferencia semántica', 'Semantic diff'),
        ('ejecute una diferencia', 'ejecute un diff'),
        ('diferenciación semántica', 'semantic diff'),
        ('diferenciación, burla, generación de SDK y pruebas de contratos en tuberías', 'diff, mocking, generación de SDKs y pruebas de contrato en pipelines'),
        ('Canalización de contratos', 'Pipeline de contratos'),
        ('canalizaciones', 'pipelines'),
        ('canalización', 'pipeline'),
        ('desaprobación', 'deprecación'),
        ('Desaprobar', 'Deprecar'),
        ('marcar obsoletos', 'marcar como deprecated'),
        ('La gateway', 'El gateway'),
        ('Una gateway', 'Un gateway'),
        ('una gateway', 'un gateway'),
        ('a el gateway', 'al gateway'),
        ('de el gateway', 'del gateway'),
        ('tiempo de ejecución', 'runtime'),
        ('confirmación del contrato', 'commit del contrato'),
        ('la misma confirmación', 'el mismo commit'),
        ('La misma confirmación', 'El mismo commit'),
        ('suma de comprobación', 'checksum'),
        ('suma de verificación', 'checksum'),
        ('Pérdidas de expresividad del documento.', 'Documente las pérdidas de expresividad.'),
    ],
}


def localize_inline_openapi(value: str, locale: str) -> str:
    replacements = {
        'en': {'/clientes/assets': '/customers/active', '/clientes': '/customers', '{clienteId}': '{customerId}', 'obterCliente': 'getCustomer'},
        'es': {'{clienteId}': '{clienteId}', 'obterCliente': 'obtenerCliente'},
    }[locale]
    for before, after in replacements.items():
        value = value.replace(before, after)
    return value


def polish(value: str, locale: str) -> str:
    for before, after in OPENAPI_REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return localize_inline_openapi(value, locale)


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            'API de Clientes': 'Customers API',
            'api.empresa.example/clientes': 'api.company.example/customers',
            '/clientes': '/customers',
            'clienteId': 'customerId',
            'obterCliente': 'getCustomer',
            'ClienteEncontrado': 'CustomerFound',
            'ClienteNaoEncontrado': 'CustomerNotFound',
            'NovaTransferencia': 'NewTransfer',
            'transferenciaPix': 'pixTransfer',
            'contaOrigem': 'sourceAccount',
            'valor': 'amount',
            'chaveDestino': 'destinationKey',
            'Transferência aceita': 'Transfer accepted',
            'Transferencia': 'Transfer',
            'ProblemaValidacao': 'ValidationProblem',
            'OAuthCorporativo': 'CorporateOAuth',
            'CertificadoCliente': 'ClientCertificate',
            'clientes.leitura': 'customers.read',
            'Consulta clientes': 'Read customers',
            'Cliente criado': 'Customer created',
            'Cliente inválido': 'Invalid customer',
            'Clientes': 'Customers',
            'Cliente': 'Customer',
            'nome': 'name',
            'dataCadastro': 'registrationDate',
            'ATIVO': 'ACTIVE',
            'BLOQUEADO': 'BLOCKED',
            'ENCERRADO': 'CLOSED',
            'Documento mínimo expandido': 'Expanded minimum document',
            'Path Item e operação GET': 'Path Item and GET operation',
            'Corpo JSON com schema e exemplo': 'JSON body with schema and example',
            'Respostas explícitas de sucesso e falha': 'Explicit success and failure responses',
            'Schema de objeto com restrições': 'Object schema with constraints',
            'OAuth 2.0 combinado com mTLS': 'OAuth 2.0 combined with mTLS',
            'Exemplo consolidado em YAML': 'Consolidated YAML example',
            'Obtém um cliente': 'Gets a customer',
            'Cliente localizado': 'Customer found',
            'Customer localizado': 'Customer found',
            'ProblemaNaoEncontrado': 'NotFoundProblem',
            'NaoEncontrado': 'NotFound',
            'cliente@example.com': 'customer@example.com',
        },
        'es': {
            'clienteId': 'clienteId',
            'obterCliente': 'obtenerCliente',
            'ClienteNaoEncontrado': 'ClienteNoEncontrado',
            'NovaTransferencia': 'NuevaTransferencia',
            'contaOrigem': 'cuentaOrigen',
            'valor': 'importe',
            'chaveDestino': 'claveDestino',
            'Transferência aceita': 'Transferencia aceptada',
            'ProblemaValidacao': 'ProblemaValidacion',
            'clientes.leitura': 'clientes.lectura',
            'Consulta clientes': 'Consultar clientes',
            'Cliente criado': 'Cliente creado',
            'Cliente inválido': 'Cliente inválido',
            'nome': 'nombre',
            'dataCadastro': 'fechaRegistro',
            'ATIVO': 'ACTIVO',
            'ENCERRADO': 'CERRADO',
            'Documento mínimo expandido': 'Documento mínimo ampliado',
            'Path Item e operação GET': 'Path Item y operación GET',
            'Corpo JSON com schema e exemplo': 'Cuerpo JSON con schema y ejemplo',
            'Respostas explícitas de sucesso e falha': 'Respuestas explícitas de éxito y fallo',
            'Schema de objeto com restrições': 'Schema de objeto con restricciones',
            'OAuth 2.0 combinado com mTLS': 'OAuth 2.0 combinado con mTLS',
            'Exemplo consolidado em YAML': 'Ejemplo consolidado en YAML',
            'Obtém um cliente': 'Obtiene un cliente',
            'ProblemaNaoEncontrado': 'ProblemaNoEncontrado',
            'NaoEncontrado': 'NoEncontrado',
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

    write_typescript(OUTPUTS['pt'], 'OPENAPI_PT_CHAPTER_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'OPENAPI_EN_CHAPTER_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'OPENAPI_ES_CHAPTER_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
