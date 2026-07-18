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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_13_GraphQL_gRPC_e_WebSocket.pdf'
)
OUTPUTS = {
    'pt': ROOT / 'src/app/learn/graphql-grpc-websocket-pt/graphql-grpc-websocket-content.data.ts',
    'en': ROOT / 'src/app/learn/graphql-grpc-websocket-en/graphql-grpc-websocket-content.data.ts',
    'es': ROOT / 'src/app/learn/graphql-grpc-websocket-es/graphql-grpc-websocket-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Runtime GraphQL executando uma árvore de resolvers a partir da operação solicitada'),
    2: ('figure-02.svg', 'Quatro padrões de chamada gRPC: unary, server streaming, client streaming e bidirecional'),
    3: ('figure-03.svg', 'Ciclo de vida WebSocket do upgrade HTTP ao encerramento da conexão'),
    4: ('figure-04.svg', 'Comparação semântica entre GraphQL, gRPC e WebSocket em uma arquitetura híbrida'),
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
        'graphql': extracted_table(document, 3, 0, 'Tabela 1 - A mudança principal em GraphQL é de modelo de contrato, não apenas de sintaxe.'),
        'governance': extracted_table(document, 4, 0, 'Tabela 2 - Em GraphQL, governança do schema e governança de execução caminham juntas.'),
        'grpc': extracted_table(document, 5, 0, 'Tabela 3 - A eficiência do gRPC depende de disciplina operacional, não apenas do uso de Protobuf.'),
        'comparison': extracted_table(document, 7, 0, 'Tabela 4 - O melhor critério de escolha é a natureza do problema e da operação.'),
        'troubleshooting': extracted_table(document, 8, 0, 'Tabela 5 - O sintoma correto depende da semântica de cada tecnologia.'),
        'glossary': extracted_table(document, 9, 0, 'Tabela 5 - Vocabulário essencial do capítulo.'),
    }


TABLE_REGIONS = {
    3: [(280, 379, 'graphql')],
    4: [(598, 697, 'governance')],
    5: [(584, 684, 'grpc')],
    7: [(228, 369, 'comparison')],
    8: [(154, 237, 'troubleshooting')],
    9: [(428, 709, 'glossary')],
}
FIGURE_REGIONS = {
    3: [(558, 719)],
    5: [(428, 584)],
    6: [(310, 461)],
    7: [(372, 533)],
}
CODE_REGIONS = {
    4: [(84, 180)],
    5: [(160, 240)],
    6: [(489, 544)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Três modelos, três semânticas: consulta, RPC e canal persistente'},
        {
            'kind': 'figure',
            'src': '/assets/learn/graphql-grpc-websocket/pt/overview.svg',
            'alt': 'GraphQL, gRPC e WebSocket combinados em uma arquitetura moderna de APIs',
            'caption': 'Figura de abertura - O capítulo compara três estilos frequentemente combinados em arquiteturas de APIs e integração.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Escolher a interface correta exige alinhar modelo de dados, acoplamento, latência, streaming e governança.'},
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
                        'src': f'/assets/learn/graphql-grpc-websocket/pt/{filename}',
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


def polish(value: str, locale: str) -> str:
    for before, after in TERMINOLOGY[locale]:
        value = value.replace(before, after)
    return value


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            'ClienteDetalhado': 'DetailedCustomer', 'cliente': 'customer', 'nome': 'name',
            'saldoAtual': 'currentBalance', 'pedidos': 'orders', 'numero': 'number',
            'valorTotal': 'totalAmount', 'ClienteService': 'CustomerService',
            'ObterCliente': 'GetCustomer', 'ClienteRequest': 'CustomerRequest',
            'ClienteResponse': 'CustomerResponse', 'ListarEventos': 'ListEvents',
            'EventosRequest': 'EventsRequest', 'EventoResponse': 'EventResponse',
            'api.empresa.example': 'api.company.example',
        },
        'es': {
            'ClienteDetalhado': 'ClienteDetallado', 'saldoAtual': 'saldoActual',
            'numero': 'numero', 'valorTotal': 'importeTotal',
            'ObterCliente': 'ObtenerCliente', 'ListarEventos': 'ListarEventos',
            'EventosRequest': 'EventosRequest', 'EventoResponse': 'EventoResponse',
            'api.empresa.example': 'api.empresa.example',
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
    write_typescript(OUTPUTS['pt'], 'GRAPHQL_GRPC_WEBSOCKET_PT_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'GRAPHQL_GRPC_WEBSOCKET_EN_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'GRAPHQL_GRPC_WEBSOCKET_ES_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
