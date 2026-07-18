from __future__ import annotations

import copy
import importlib.util
import json
import re
import sys
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_15_Basic_Auth_Digest_e_API_Keys.pdf'
)

spec = importlib.util.spec_from_file_location('chapter14_generator', ROOT / 'scripts/generate-chapter14-content.py')
base = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(base)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/basic-auth-digest-api-keys-pt/basic-auth-digest-api-keys-content.data.ts',
    'en': ROOT / 'src/app/learn/basic-auth-digest-api-keys-en/basic-auth-digest-api-keys-content.data.ts',
    'es': ROOT / 'src/app/learn/basic-auth-digest-api-keys-es/basic-auth-digest-api-keys-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Fluxo de desafio HTTP entre cliente e servidor ou gateway'),
    2: ('figure-02.svg', 'Basic Auth atravessando codificação Base64 e um canal TLS protegido'),
    3: ('figure-03.svg', 'Fluxo Digest com desafio, nonce e prova calculada'),
    4: ('figure-04.svg', 'Ciclo de vida corporativo de uma API Key da emissão à revogação'),
    5: ('figure-05.svg', 'Validação de credencial por API Gateway com secret store e backend protegido'),
}


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[base.clean_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    key_storage = extracted_table(
        document, 7, 0,
        'Tabela 4 - Separar identificador, segredo, verificador e metadata melhora operação e resposta a incidentes.',
    )
    continuation = document[7].find_tables().tables[0].extract()
    key_storage['rows'].extend([
        [base.clean_cell(cell) for cell in row]
        for row in continuation[1:]
    ])
    return {
        'lifecycle': extracted_table(document, 3, 0, 'Tabela 1 - Credencial estática segura depende de ciclo de vida explícito.'),
        'passwords': extracted_table(document, 5, 0, 'Tabela 2 - Armazenamento seguro reduz impacto de vazamento do repositório de credenciais.'),
        'digest': extracted_table(document, 6, 0, 'Tabela 3 - Parâmetros de Digest precisam ser validados como um conjunto coerente.'),
        'key_storage': key_storage,
        'rotation': extracted_table(document, 8, 1, 'Tabela 5 - A resposta depende de inventário, individualização e capacidade de revogação.'),
        'comparison': extracted_table(document, 9, 0, 'Tabela 6 - Nenhum mecanismo elimina a necessidade de TLS, escopo, rotação e autorização.'),
        'troubleshooting': extracted_table(document, 10, 0, 'Tabela 7 - Diagnóstico exige identificar o ponto que produziu a resposta.'),
        'glossary': extracted_table(document, 12, 0, 'Tabela 8 - Vocabulário essencial do capítulo.'),
        'decision': extracted_table(document, 12, 1, 'Tabela 9 - A opção adequada depende da capacidade de proteger segredo e do risco da operação.'),
    }


TABLE_REGIONS = {
    3: [(219, 330, 'lifecycle')],
    5: [(249, 352, 'passwords')],
    6: [(515, 659, 'digest')],
    7: [(740, 811, 'key_storage')],
    8: [(57, 118, 'key_storage'), (516, 609, 'rotation')],
    9: [(576, 720, 'comparison')],
    10: [(134, 253, 'troubleshooting')],
    12: [(81, 434, 'glossary'), (469, 635, 'decision')],
}
FIGURE_REGIONS = {
    3: [(490, 656)],
    4: [(437, 594)],
    6: [(59, 239)],
    7: [(429, 594)],
    9: [(281, 446)],
}
CODE_REGIONS = {
    3: [(688, 737)],
    4: [(236, 280)],
    6: [(424, 510)],
    8: [(293, 361)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Três mecanismos de credencial com propriedades muito diferentes'},
        {
            'kind': 'figure',
            'src': '/assets/learn/basic-auth-digest-api-keys/pt/overview.svg',
            'alt': 'Basic Auth, Digest e API Key como mecanismos de credencial com propriedades diferentes',
            'caption': 'Figura de abertura - Basic, Digest e API Keys parecem simples, mas exigem gestão completa de credenciais.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Todos dependem de TLS, gestão de segredo, menor privilégio, rotação e observabilidade para uso seguro.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted(
            (block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )
        for source_block in page_blocks:
            text, size, bold = base.block_text(source_block)
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
                        'src': f'/assets/learn/basic-auth-digest-api-keys/pt/{filename}',
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
                items = [base.clean_text(item) for item in text.split('●') if base.clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
                base.append_block(blocks, {'kind': 'code', 'text': base.block_code(source_block)})
                continue

            if size >= 14:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': base.slugify(text)})
            elif size >= 9.8 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5:
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                base.append_block(blocks, {'kind': 'paragraph', 'text': text})

    return blocks


REPLACEMENTS = {
    'en': [
        ('Sharing the same credential across multiple systems destroys traceability and makes revocation coordinated.', 'Sharing the same credential across multiple systems destroys traceability and makes coordinated revocation difficult.'),
        ('Production, approval and development keys', 'Production, staging, and development keys'),
        ('API Key works in approval', 'API Key works in staging'),
        ('customer returns', 'client returns'), ('customer support', 'client support'),
        ('exchange Basic for', 'replace Basic Auth with'), ('short credentials', 'short-lived credentials'),
        ('API gateways', 'API Gateways'), ('API gateway', 'API Gateway'),
        ('Api Keys', 'API Keys'), ('Api Key', 'API Key'), ('Api keys', 'API keys'), ('Api key', 'API key'),
        ('Basic authentication', 'Basic Auth'), ('Basic Authentication', 'Basic Auth'),
        ('Http Digest', 'HTTP Digest'), ('Http Basic', 'HTTP Basic'),
        ('Oauth 2.0', 'OAuth 2.0'), ('MtlS', 'mTLS'),
        ('Azure Api Management', 'Azure API Management'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('Work load', 'Workload'), ('work load', 'workload'),
        ('secret manager', 'secret manager'), ('metadata', 'metadata'),
        ('professional consultation', 'professional reference'),
    ],
    'es': [
        ('flujo básico y resumen detallado', 'flujo detallado de Basic Auth y Digest'),
        ('claves básica, resumen y API', 'Basic Auth, Digest y API Keys'),
        ('Basic Auth, resumen y API key', 'Basic Auth, Digest y API Key'),
        ('15.7 Endurecimiento y migración desde Básico', '15.7 Hardening y migración de Basic Auth'),
        ('15.8 Resumen: motivación y desafío-respuesta', '15.8 Digest: motivación y desafío-respuesta'),
        ('15.9 Parámetros de resumen y cálculo', '15.9 Parámetros y cálculo de Digest'),
        ('15.10 Limitaciones de nonce, repetición, obsoleto y resumen', '15.10 Nonce, replay, stale y limitaciones de Digest'),
        ('15.10 Nonce, repetición, obsoleto y limitaciones', '15.10 Nonce, replay, stale y limitaciones'),
        ('15.18 Comparación entre claves básicas, compendidas y API', '15.18 Comparación entre Basic Auth, Digest y API Keys'),
        ('Básico, Resumen y claves', 'Basic Auth, Digest y API Keys'),
        ('Las claves básicas, de resumen y de API', 'Basic Auth, Digest y API Keys'),
        ('Las claves Básicas, Digest o API', 'Basic Auth, Digest o API Keys'),
        ('claves Básicas, Digest o API', 'Basic Auth, Digest o API Keys'),
        ('Básico transporta', 'Basic Auth transporta'),
        ('Lo básico se puede tolerar', 'Basic Auth se puede tolerar'),
        ('de manera diferente que Básica', 'de manera diferente a Basic Auth'),
        ('usuario Básico', 'usuario de Basic Auth'),
        ('valor básico de laboratorio', 'valor de Basic Auth de laboratorio'),
        ('desafío básico', 'desafío Basic'),
        ('Básico y Digest utilizan', 'Basic Auth y Digest utilizan'),
        ('prefijo Básico', 'prefijo Basic'),
        ('autenticación HTTP básico', 'autenticación HTTP Basic'),
        ('opciones de reino, nonce', 'opciones de realm, nonce'),
        ('El reino permite', 'El realm permite'), ('El reino separa', 'El realm separa'),
        ('Explique reino, nonce, opaco, qop, nc, cnonce, algoritmo y obsoleto.', 'Explique realm, nonce, opaque, qop, nc, cnonce, algorithm y stale.'),
        ('; opaco es un valor', '; opaque es un valor'),
        ('Estado opaco devuelto por el cliente.', 'Valor opaque devuelto por el cliente.'),
        ('mismo dominio, nonce y URI', 'mismo realm, nonce y URI'),
        ('usuario, el dominio y la contraseña', 'usuario, realm y la contraseña'),
        ('compare dominio, nonce', 'compare realm, nonce'),
        ('dominio o encabezado eliminado', 'realm o header eliminado'),
        ('obsoleto = verdadero', 'stale=true'),
        ('nonce caducado, nc repetido o obsoleto no controlado', 'nonce expirado, nc repetido o stale no tratado'),
        ('Producción, aprobación y desarrollo', 'Producción, homologación y desarrollo'),
        ('producción, aprobación y desarrollo', 'producción, homologación y desarrollo'),
        ('API key funciona en aprobación', 'API Key funciona en homologación'),
        ('La API key funciona en aprobación', 'La API Key funciona en homologación'),
        ('atención al cliente', 'compatibilidad de los clientes'),
        ('Viajes secretos directamente', 'El secreto se transmite directamente'),
        ('Tema típico', 'Sujeto típico'),
        ('Devoluciones básicas 401', 'Basic devuelve 401'),
        ('El resumen falla después de un tiempo', 'Digest falla después de un tiempo'),
        ('Derogado todavía funciona', 'La clave revocada aún funciona'),
        ('Caso 2: resumen de clúster intermitente', 'Caso 2 - Digest intermitente en clúster'),
        ('Las cuotas y la limitación limitan', 'Las cuotas y el throttling limitan'),
        ('401 No autorizado', '401 Unauthorized'),
        ('encabezado de Autorización', 'header Authorization'),
        ('desafío-respuesta con dominio, nonce', 'desafío-respuesta con realm, nonce'),
        ('control de reproducción', 'control de replay'),
        ('Puertas de enlace API', 'API Gateways'), ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace API', 'API Gateway'),
        ('Claves API', 'API Keys'), ('Clave API', 'API Key'), ('claves API', 'API keys'), ('clave API', 'API key'),
        ('Autenticación básica', 'Basic Auth'), ('autenticación básica', 'Basic Auth'),
        ('Autenticación Basic', 'Basic Auth'), ('Digestión', 'Digest'),
        ('Http Digest', 'HTTP Digest'), ('Http Basic', 'HTTP Basic'),
        ('Oauth 2.0', 'OAuth 2.0'), ('MtlS', 'mTLS'),
        ('Azure Api Management', 'Azure API Management'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('carga de trabajo', 'workload'), ('Carga de trabajo', 'Workload'),
        ('metadatos', 'metadata'), ('Metadatos', 'Metadata'),
        ('puntos finales', 'endpoints'), ('punto final', 'endpoint'),
        ('solución de problemas', 'troubleshooting'), ('Solución de problemas', 'Troubleshooting'),
        ('almacén secreto', 'secret store'), ('administrador secreto', 'secret manager'),
        ('token de portador', 'bearer token'), ('tokens de portador', 'bearer tokens'),
        ('resumen', 'Digest'),
    ],
}

PRESERVE_TERMS = {
    'API Key', 'Base64', 'Basic Auth', 'cnonce', 'Credential stuffing', 'Digest', 'HA1', 'HA2',
    'HMAC', 'key_id', 'nc', 'nonce', 'opaque', 'qop', 'realm', 'Replay', 'Secret manager',
    'stale', 'Verifier', 'WWW-Authenticate', 'response', 'secret', 'metadata',
}


def polish(value: str, locale: str) -> str:
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            '# Texto lógico antes da codificação': '# Logical text before encoding',
            'integracao-faturamento:SenhaDeExemplo': 'billing-integration:ExamplePassword',
            '# Header HTTP': '# HTTP header',
            '# ou': '# or',
            'realm="api-corporativa"': 'realm="corporate-api"',
            'nonce="valor-emitido-pelo-servidor"': 'nonce="server-issued-value"',
            'username="cliente-api"': 'username="api-client"',
            'realm="pagamentos"': 'realm="payments"',
            'uri="/v1/ordens"': 'uri="/v1/orders"',
            '# Header dedicado': '# Dedicated header',
            '...segredo...': '...secret...',
            '# Ou esquema de Authorization definido pelo provedor': '# Or an Authorization scheme defined by the provider',
            '# Evitar': '# Avoid',
            '/v1/clientes': '/v1/customers',
        },
        'es': {
            '# Texto lógico antes da codificação': '# Texto lógico antes de la codificación',
            'integracao-faturamento:SenhaDeExemplo': 'integracion-facturacion:ContrasenaDeEjemplo',
            '# Header HTTP': '# Header HTTP',
            '# ou': '# o',
            'realm="api-corporativa"': 'realm="api-corporativa"',
            'nonce="valor-emitido-pelo-servidor"': 'nonce="valor-emitido-por-el-servidor"',
            'username="cliente-api"': 'username="cliente-api"',
            'realm="pagamentos"': 'realm="pagos"',
            'uri="/v1/ordens"': 'uri="/v1/ordenes"',
            '# Header dedicado': '# Header dedicado',
            '...segredo...': '...secreto...',
            '# Ou esquema de Authorization definido pelo provedor': '# O esquema de Authorization definido por el proveedor',
            '# Evitar': '# Evitar',
            '/v1/clientes': '/v1/clientes',
        },
    }[locale]
    for before, after in replacements.items():
        value = value.replace(before, after)
    return value


def localize_blocks(source: list[dict], locale: str, translations: dict[str, str]) -> list[dict]:
    localized = copy.deepcopy(source)
    for index, block in enumerate(localized):
        source_block = source[index]
        kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            original = block['text']
            block['text'] = polish(translations[original], locale)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = base.slugify(block['text'])
        elif kind == 'list':
            block['items'] = [polish(translations[item], locale) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translations[block['alt']], locale)
            block['caption'] = polish(translations[block['caption']], locale)
            block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = polish(translations[block['caption']], locale)
            block['headers'] = [
                value if value in PRESERVE_TERMS else polish(translations[value], locale)
                for value in source_block['headers']
            ]
            block['rows'] = [[
                value if value in PRESERVE_TERMS else polish(translations[value], locale)
                for value in row
            ] for row in source_block['rows']]
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
    values = base.translatable_values(portuguese)
    translations = {
        'en': base.translate_values(values, 'en'),
        'es': base.translate_values(values, 'es'),
    }
    english = localize_blocks(portuguese, 'en', translations['en'])
    spanish = localize_blocks(portuguese, 'es', translations['es'])
    write_typescript(OUTPUTS['pt'], 'BASIC_AUTH_DIGEST_API_KEYS_PT_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'BASIC_AUTH_DIGEST_API_KEYS_EN_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'BASIC_AUTH_DIGEST_API_KEYS_ES_BLOCKS', spanish, 'es')
    print(json.dumps({
        'blocks': len(portuguese),
        'values': len(values),
        'h2': sum(block.get('level') == 2 for block in portuguese),
        'tables': sum(block['kind'] == 'table' for block in portuguese),
        'figures': sum(block['kind'] == 'figure' for block in portuguese),
        'codes': sum(block['kind'] == 'code' for block in portuguese),
    }, ensure_ascii=False))


if __name__ == '__main__':
    main()
