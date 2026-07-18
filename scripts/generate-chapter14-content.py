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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_14_Autenticacao_x_Autorizacao.pdf'
)
OUTPUTS = {
    'pt': ROOT / 'src/app/learn/autenticacao-autorizacao-pt/autenticacao-autorizacao-content.data.ts',
    'en': ROOT / 'src/app/learn/authentication-authorization-en/authentication-authorization-content.data.ts',
    'es': ROOT / 'src/app/learn/autenticacion-autorizacion-es/autenticacion-autorizacion-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Identidade autenticada passando por uma decisão de autorização contextual'),
    2: ('figure-02.svg', 'Cadeia de validação de token do formato à política de acesso'),
    3: ('figure-03.svg', 'Arquitetura de decisão com PEP, PDP, PIP, PAP e recurso protegido'),
    4: ('figure-04.svg', 'Identidade de workload com atestação e credenciais curtas'),
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


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[clean_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'terms': extracted_table(document, 3, 0, 'Tabela 1 - Termos próximos possuem responsabilidades diferentes.'),
        'functions': extracted_table(document, 4, 0, 'Tabela 2 - As funções se encadeiam, mas não devem ser confundidas.'),
        'identity_classes': extracted_table(document, 4, 1, 'Tabela 3 - Cada classe de identidade exige controles próprios.'),
        'factors': extracted_table(document, 5, 0, 'Tabela 4 - Fatores e sinais devem ser avaliados pelo risco da jornada.'),
        'app_credentials': extracted_table(document, 5, 1, 'Tabela 5 - Credenciais de aplicações devem privilegiar prova de posse e automação.'),
        'sessions': extracted_table(document, 6, 0, 'Tabela 6 - Sessões de navegador exigem controles além da autenticação inicial.'),
        'token_types': extracted_table(document, 7, 0, 'Tabela 7 - Formato e modelo de posse são decisões diferentes.'),
        'claims': extracted_table(document, 7, 1, 'Tabela 8 - Claims precisam de semântica e validação explícitas.'),
        'oauth_artifacts': extracted_table(document, 8, 0, 'Tabela 9 - Artefatos de identidade possuem públicos e usos diferentes.'),
        'authorization_models': extracted_table(document, 8, 1, 'Tabela 10 - Modelos podem ser combinados por camada e risco.'),
        'delegation': extracted_table(document, 9, 0, 'Tabela 11 - A identidade do ator não deve desaparecer durante a delegação.'),
        'workloads': extracted_table(document, 10, 0, 'Tabela 12 - Identidade de workload deve acompanhar a plataforma e o ciclo de execução.'),
        'http_status': extracted_table(document, 11, 0, 'Tabela 13 - O status externo deve preservar semântica; o log interno preserva diagnóstico.'),
        'audit': extracted_table(document, 11, 1, 'Tabela 14 - Auditoria útil registra identidade e decisão sem vazar credenciais.'),
        'threats': extracted_table(document, 12, 0, 'Tabela 15 - Tokens válidos não eliminam falhas de autorização e ciclo de vida.'),
        'troubleshooting': extracted_table(document, 12, 1, 'Tabela 16 - Diagnóstico precisa correlacionar credencial, decisão e ponto de resposta.'),
        'glossary': extracted_table(document, 14, 0, 'Tabela 17 - Vocabulário essencial do capítulo.'),
        'mechanism_matrix': extracted_table(document, 15, 0, 'Tabela 18 - A escolha final depende do risco, consumidores e infraestrutura.'),
    }


TABLE_REGIONS = {
    3: [(484, 600, 'terms')],
    4: [(206, 321, 'functions'), (474, 608, 'identity_classes')],
    5: [(254, 362, 'factors'), (514, 631, 'app_credentials')],
    6: [(538, 638, 'sessions')],
    7: [(55, 154, 'token_types'), (296, 429, 'claims')],
    8: [(389, 489, 'oauth_artifacts'), (630, 731, 'authorization_models')],
    9: [(576, 676, 'delegation')],
    10: [(360, 477, 'workloads')],
    11: [(254, 353, 'http_status'), (620, 737, 'audit')],
    12: [(206, 321, 'threats'), (463, 580, 'troubleshooting')],
    14: [(332, 728, 'glossary')],
    15: [(79, 228, 'mechanism_matrix')],
}
FIGURE_REGIONS = {
    3: [(603, 772)],
    7: [(431, 606)],
    9: [(58, 236)],
    10: [(58, 219)],
}
CODE_REGIONS = {
    6: [(84, 113), (345, 374)],
    8: [(84, 185)],
    10: [(658, 770)],
    11: [(382, 468)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Da identidade à decisão de acesso em uma API corporativa'},
        {
            'kind': 'figure',
            'src': '/assets/learn/authentication-authorization/pt/overview.svg',
            'alt': 'Cadeia de identidade, credencial, autenticação, token, sessão e autorização em uma API corporativa',
            'caption': 'Figura de abertura - A segurança de acesso é uma cadeia de provas, asserções e decisões contextualizadas.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Autenticar prova quem ou o que está chamando; autorizar decide o que essa identidade pode fazer agora.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
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
                match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
                if match:
                    number = int(match.group(1))
                    filename, alt = FIGURES[number]
                    blocks.append({
                        'kind': 'figure',
                        'src': f'/assets/learn/authentication-authorization/pt/{filename}',
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

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
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
    translated_by_index: dict[int, str] = {}
    groups = grouped(values)
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(translate_group, group, target): number
                   for number, group in enumerate(groups, 1)}
        for future in as_completed(futures):
            translated_by_index.update(future.result())
            print(f'{target}: translated group {futures[future]}/{len(groups)}', flush=True)
    return {value: clean_text(translated_by_index[index]) for index, value in enumerate(values)}


TERMINOLOGY = {
    'en': [
        ('API gateways', 'API Gateways'), ('API gateway', 'API Gateway'),
        ('Graphql', 'GraphQL'), ('Grpc', 'gRPC'), ('Websocket', 'WebSocket'),
        ('Protocol buffers', 'Protocol Buffers'), ('Protobuf', 'Protobuf'),
        ('Rest', 'REST'), ('Openapi', 'OpenAPI'),
        ('mutations', 'mutations'), ('subscriptions', 'subscriptions'),
        ('troubleshooting', 'troubleshooting'),
        ('professional consultation', 'professional reference'),
        ('depreciation', 'deprecation'), ('Depreciation', 'Deprecation'),
        ('the customer chooses fields', 'the client chooses fields'),
        ('Selected by the customer', 'Selected by the client'),
        ('customer interface', 'client interface'),
        ('Current balance field', 'current balance field'),
        ('Solve expensive', 'Expensive resolver'), ('Solve', 'Resolver'),
        ('Answer form', 'Response shape'), ('Appearance', 'Aspect'),
        ('Persistent query', 'Persisted query'), ('persistent query', 'persisted query'),
    ],
    'es': [
        ('Puertas de enlace API', 'API Gateways'), ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace API', 'API Gateway'),
        ('Graphql', 'GraphQL'), ('Grpc', 'gRPC'), ('Websocket', 'WebSocket'),
        ('Búferes de protocolo', 'Protocol Buffers'), ('Buffers de protocolo', 'Protocol Buffers'),
        ('Protobuf', 'Protobuf'), ('Openapi', 'OpenAPI'), ('Descanso', 'REST'),
        ('solución de problemas', 'troubleshooting'), ('Solución de problemas', 'Troubleshooting'),
        ('tiempo de ejecución', 'runtime'), ('zócalo web', 'WebSocket'), ('socket web', 'WebSocket'),
        ('DESCANSO', 'REST'), ('Descanso', 'REST'),
        ('retroubleshooting', 'troubleshooting'),
        ('resolutores', 'resolvers'), ('solucionadores', 'resolvers'), ('solucionador', 'resolver'),
        ('procesamiento por lotes', 'batching'),
        ('almacenamiento en caché', 'cache'),
        ('protocolo de enlace', 'handshake'),
        ('tramas', 'frames'), ('marcos', 'frames'),
        ('transmisiones', 'streams'), ('transmisión', 'streaming'),
        ('inserción en tiempo real', 'push en tiempo real'), ('inserción a interfaces', 'push a interfaces'),
        ('avances y streaming', 'trailers y streaming'), ('transmisiones o avances', 'streaming o trailers'),
        ('gestionar actualizaciones, tiempos de espera', 'gestionar el upgrade, timeouts'),
        ('gobierno del esquema', 'gobernanza del schema'), ('gobierno de la ejecución', 'gobernanza de la ejecución'),
        ('Una Consulta se estructura', 'Una Query se estructura'),
        ('En Mutation', 'En Mutation'), ('En Suscripción', 'En Subscription'),
        ('Consulta lenta', 'Query lenta'),
        ('GrafoQL', 'GraphQL'),
        ('Apariencia', 'Aspecto'), ('formulario de respuesta', 'Forma de la respuesta'),
        ('puntos finales', 'endpoints'), ('Puntos finales', 'Endpoints'),
        ('Esquema escrito', 'Schema tipado'), ('esquema escrito', 'schema tipado'),
        ('depreciación', 'deprecación'),
        ('el gobernanza', 'la gobernanza'),
        ('consulta persistente', 'persisted query'), ('consultas persistentes', 'persisted queries'),
        ('contratos escritos', 'contratos tipados'), ('mensajes binarios escritos', 'mensajes binarios tipados'),
        ('mensajes escritos', 'mensajes tipados'), ('escritura fuerte', 'tipado fuerte'),
        ('contratos tipificados', 'contratos tipados'), ('RPC tipificado', 'RPC tipado'),
        ('resguardos de cliente y servidor', 'stubs de cliente y servidor'),
        ('un análisis eficiente', 'un parsing eficiente'),
        ('cuatro estándares principales', 'cuatro patrones principales'),
        ('Estos estándares operan', 'Estos patrones operan'),
        ('En unario', 'En unary'), ('servidor de streaming', 'server streaming'),
        ('streaming del cliente', 'client streaming'), ('la streaming', 'el streaming'),
        ('por streaming', 'por stream'),
        ('fechas límite', 'deadlines'), ('fecha límite', 'deadline'), ('Fecha límite', 'Deadline'),
        ('plazos', 'deadlines'), ('Plazos', 'Deadlines'), ('Plazo', 'Deadline'), ('plazo', 'deadline'),
        ('estado de la solicitud', 'status de aplicación'),
        ('Actualización: websocket', 'Upgrade: websocket'),
        ('tiempos de espera', 'timeouts'), ('Tiempo de inactividad', 'Idle timeout'),
        ('contrapresión', 'backpressure'),
        ('Soporte de variables en pasarelas', 'Soporte variable en gateways'),
        ('Mejores amigos y agregación de datos', 'BFFs y agregación de datos'),
        ('Resuelva costosas', 'Resolver costoso'),
        ('errores comerciales en la matriz de errores', 'errores de negocio en el array errors'),
        ('los avances', 'los trailers'), ('avances', 'trailers'),
        ('Los agentes de red', 'Los intermediarios de red'),
        ('actualizaciones, HTTP/2', 'upgrade, HTTP/2'),
        ('seguimientos por flujo', 'traces por stream'), ('seguimientos', 'traces'),
        ('cierre del apretón de manos', 'close handshake'),
        ('Búfers de protocolo', 'Protocol Buffers'),
        ('Sec-WebSocket-Clave', 'Sec-WebSocket-Key'),
        ('Transmisión bidireccional', 'Bidirectional streaming'),
        ('Transmisión del servidor', 'Server streaming'),
        ('Transmisión', 'Streaming'),
        ('Suscripción', 'Subscription'), ('Fragmento', 'Fragment'), ('Introspección', 'Introspection'),
        ('Tráiler', 'Trailer'), ('Actualizar', 'Upgrade'),
        ('Describa el handshake, los frames, el ping/pong y la terminación de la actualización de WebSocket.', 'Describa el handshake de upgrade de WebSocket, los frames, ping/pong y el cierre.'),
        ('La deadline', 'El deadline'),
        ('una streaming', 'un stream'),
        ('unario, streaming de servidor, streaming de cliente', 'unary, server streaming, client streaming'),
        ('streaming bidireccional completa', 'streaming bidireccional completo'),
        ('actualización HTTP', 'upgrade HTTP'),
        ('integración tipográfica', 'integración tipada'),
        ('streaming continua', 'streaming continuo'),
        ('Formato de serialización binaria escrito', 'Formato tipado de serialización binaria'),
        ('Definir un servicio gRPC con un método unario y otro método de streaming y deadlines de prueba.', 'Defina un servicio gRPC con un método unary y otro de streaming, y pruebe los deadlines.'),
    ],
}

AUTH_REPLACEMENTS = {
    'en': [
        ('API gateways', 'API Gateways'), ('API gateway', 'API Gateway'),
        ('Openid Connect', 'OpenID Connect'), ('Oauth 2.0', 'OAuth 2.0'),
        ('Json Web Token', 'JSON Web Token'), ('Api keys', 'API keys'), ('Api key', 'API key'),
        ('MtlS', 'mTLS'), ('Dpop', 'DPoP'), ('Spiffe', 'SPIFFE'), ('Spire', 'SPIRE'),
        ('Rbac', 'RBAC'), ('Abac', 'ABAC'), ('Rebac', 'ReBAC'), ('Pbac', 'PBAC'),
        ('Proof of possession', 'Proof-of-possession'), ('proof of possession', 'proof-of-possession'),
        ('Sender constrained', 'Sender-constrained'), ('sender constrained', 'sender-constrained'),
        ('work load', 'workload'), ('Work load', 'Workload'),
        ('subject, main, credential', 'subject, principal, credential'),
        ('The main thing is the operational identity', 'The principal is the operational identity'),
        ('The main thing is the representation', 'The principal is the representation'),
        ('main, action, resource and attributes', 'principal, action, resource and attributes'),
        ('main id_', 'principal_id'), ('Main entrance', 'Primary input'), ('Main control', 'Primary control'),
        ('in an appeal', 'on which resource'), ('in what appeal', 'on which resource'),
        ('Token ID', 'ID token'),
        ('customer-supplied identity headers', 'client-supplied identity headers'),
        ('customer key', 'client key'),
        ("subject in the sender's domain", "subject in the issuer's domain"),
        ('subject in the sender', 'subject at the issuer'),
        ('Format Token Validation String to Access Policy', 'Token validation chain leading to access policy'),
    ],
    'es': [
        ('Puertas de enlace API', 'API Gateways'), ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace API', 'API Gateway'),
        ('Openid Connect', 'OpenID Connect'), ('Oauth 2.0', 'OAuth 2.0'),
        ('Json Web Token', 'JSON Web Token'), ('Claves API', 'API keys'), ('Clave API', 'API key'),
        ('MtlS', 'mTLS'), ('Dpop', 'DPoP'), ('Spiffe', 'SPIFFE'), ('Spire', 'SPIRE'),
        ('Rbac', 'RBAC'), ('Abac', 'ABAC'), ('Rebac', 'ReBAC'), ('Pbac', 'PBAC'),
        ('identidad de carga de trabajo', 'workload identity'), ('Identidad de carga de trabajo', 'Workload identity'),
        ('carga de trabajo', 'workload'), ('Carga de trabajo', 'Workload'),
        ('identidad gestionada', 'managed identity'), ('Identidad gestionada', 'Managed identity'),
        ('cuenta de servicio', 'service account'), ('Cuenta de servicio', 'Service account'),
        ('confianza cero', 'zero trust'), ('Confianza cero', 'Zero trust'),
        ('token restringido por el remitente', 'sender-constrained token'),
        ('token restringido por remitente', 'sender-constrained token'),
        ('prueba de posesión', 'proof-of-possession'), ('Prueba de posesión', 'Proof-of-possession'),
        ('token de portador', 'bearer token'), ('Token de portador', 'Bearer token'),
        ('token portador', 'bearer token'), ('Token portador', 'Bearer token'),
        ('servidor de recursos', 'resource server'), ('servidor de autorización', 'authorization server'),
        ('token de acceso', 'access token'), ('Token de acceso', 'Access token'),
        ('token de identificación', 'ID token'), ('Token de identificación', 'ID token'),
        ('token de actualización', 'refresh token'), ('Token de actualización', 'Refresh token'),
        ('reclamos', 'claims'), ('Reclamos', 'Claims'), ('reclamo', 'claim'), ('Reclamo', 'Claim'),
        ('reclamaciones', 'claims'), ('Reclamaciones', 'Claims'), ('reclamar', 'claim'),
        ('alcance_insuficiente', 'insufficient_scope'), ('insuficiente_scope', 'insufficient_scope'),
        ('alcances', 'scopes'), ('Alcances', 'Scopes'),
        ('alcance', 'scope'), ('Alcance', 'Scope'),
        ('inquilinos', 'tenants'), ('inquilino', 'tenant'), ('Inquilino', 'Tenant'),
        ('pólizas', 'policies'), ('póliza', 'policy'), ('Póliza', 'Policy'),
        ('paso adelante', 'step-up'), ('Paso adelante', 'Step-up'),
        ('puntos finales', 'endpoints'), ('punto final', 'endpoint'), ('Punto final', 'Endpoint'),
        ('memoria caché', 'cache'), ('Memoria caché', 'Cache'),
        ('repetición', 'replay'), ('Repetición', 'Replay'),
        ('puertas de enlace', 'gateways'), ('puerta de enlace', 'gateway'), ('Puerta de enlace', 'Gateway'),
        ('autorización de nivel de objeto roto', 'Broken Object Level Authorization'),
        ('Veinte trabajos', 'Veinte jobs'),
        ('suplantación', 'impersonation'), ('Suplantación', 'Impersonation'),
        ('14.17 Delegación, impersonation y representación', '14.17 Delegación, impersonation y on-behalf-of'),
        ('el tema', 'el subject'), ('tema,', 'subject,'),
        ('14.2 Asunto, principal', '14.2 Sujeto, principal'),
        ('Credenciales de solicitud', 'Credenciales de aplicaciones'),
        ('en una apelación', 'sobre qué recurso'),
        ('ficha al portador', 'bearer token'), ('Ficha al portador', 'Bearer token'),
        ('ID de token', 'ID token'),
        ('PPD', 'PDP'), ('PEPE', 'PEP'),
        ('Afirmación realizada en forma simbólica o aseveración.', 'Afirmación transportada en un token o una aserción.'),
        ('Token restringido por el remitente', 'Sender-constrained token'),
        ('metadatos', 'metadata'), ('Metadatos', 'Metadata'),
        ('depreciación', 'deprecación'), ('pasarela', 'gateway'), ('Pasarela', 'Gateway'),
    ],
}


def polish(value: str, locale: str) -> str:
    for before, after in TERMINOLOGY[locale]:
        value = value.replace(before, after)
    for before, after in AUTH_REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value


def localize_code(value: str, locale: str) -> str:
    pre_replacements = {
        'en': {
            '/catalogo/produtos': '/catalog/products', '<valor-secreto>': '<secret-value>',
            '/recurso?api_key=segredo': '/resource?api_key=secret',
            'api.empresa.example': 'api.company.example', 'id.empresa.example': 'id.company.example',
            'app:conciliacao': 'app:reconciliation', 'pagamentos.read': 'payments.read',
            'Credencial inválida ou ausente': 'Invalid or missing credential',
            '# O conteúdo decodificado continua sendo um segredo reutilizável.': '# The decoded content remains a reusable secret.',
        },
        'es': {
            '/catalogo/produtos': '/catalogo/productos', '/recurso?api_key=segredo': '/recurso?api_key=secreto',
            'app:conciliacao': 'app:conciliacion', 'pagamentos.read': 'pagos.lectura',
            'Credencial inválida ou ausente': 'Credencial inválida o ausente',
            '# O conteúdo decodificado continua sendo um segredo reutilizável.': '# El contenido decodificado sigue siendo un secreto reutilizable.',
        },
    }[locale]
    for before, after in pre_replacements.items():
        value = value.replace(before, after)
    replacements = {
        'en': {
            'ClienteDetalhado': 'DetailedCustomer', 'cliente': 'customer', 'nome': 'name',
            'saldoAtual': 'currentBalance', 'pedidos': 'orders', 'numero': 'number',
            'valorTotal': 'totalAmount', 'ClienteService': 'CustomerService',
            'ObterCliente': 'GetCustomer', 'ClienteRequest': 'CustomerRequest',
            'ClienteResponse': 'CustomerResponse', 'ListarEventos': 'ListEvents',
            'EventosRequest': 'EventsRequest', 'EventoResponse': 'EventResponse',
            'api.empresa.example': 'api.company.example',
            '/catalogo/produtos': '/catalog/products', '<valor-secreto>': '<secret-value>',
            '/recurso?api_key=segredo': '/resource?api_key=secret',
            'id.empresa.example': 'id.company.example', 'app:conciliacao': 'app:reconciliation',
            'pagamentos.read': 'payments.read',
            'Credencial inválida ou ausente': 'Invalid or missing credential',
            '# O conteúdo decodificado continua sendo um segredo reutilizável.': '# The decoded content remains a reusable secret.',
        },
        'es': {
            'ClienteDetalhado': 'ClienteDetallado', 'saldoAtual': 'saldoActual',
            'numero': 'numero', 'valorTotal': 'importeTotal',
            'ObterCliente': 'ObtenerCliente', 'ListarEventos': 'ListarEventos',
            'EventosRequest': 'EventosRequest', 'EventoResponse': 'EventoResponse',
            'api.empresa.example': 'api.empresa.example',
            '/catalogo/produtos': '/catalogo/productos',
            '/recurso?api_key=segredo': '/recurso?api_key=secreto',
            'app:conciliacao': 'app:conciliacion', 'pagamentos.read': 'pagos.lectura',
            'Credencial inválida ou ausente': 'Credencial inválida o ausente',
            '# O conteúdo decodificado continua sendo um segredo reutilizável.': '# El contenido decodificado sigue siendo un secreto reutilizable.',
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
    write_typescript(OUTPUTS['pt'], 'AUTHENTICATION_AUTHORIZATION_PT_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'AUTHENTICATION_AUTHORIZATION_EN_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'AUTHENTICATION_AUTHORIZATION_ES_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
