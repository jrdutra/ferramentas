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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_09_mTLS_em_Profundidade_Layout_FAAC_CORRIGIDO.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/mtls-em-profundidade-pt/mtls-content.data.ts',
    'en': ROOT / 'src/app/learn/mtls-in-depth-en/mtls-content.data.ts',
    'es': ROOT / 'src/app/learn/mtls-en-profundidad-es/mtls-content.data.ts',
}

FIGURES = {
    1: ('figure-01.svg', 'Comparação entre autenticação TLS unilateral e autenticação mutual TLS'),
    2: ('figure-02.svg', 'Sequência simplificada do handshake com autenticação mútua em TLS 1.3'),
    3: ('figure-03.svg', 'Etapas de validação e aceitação do certificado do cliente'),
    6: ('figure-06.svg', 'Identidades de workload protegidas por mutual TLS em uma service mesh'),
    7: ('figure-07.svg', 'Token OAuth vinculado ao certificado apresentado na conexão mTLS'),
    8: ('figure-08.svg', 'Ciclo de vida operacional de certificados de cliente'),
    9: ('figure-09.svg', 'Roteiro de diagnóstico para falhas de mutual TLS'),
    10: ('figure-10.svg', 'Arquitetura de integração de pagamentos B2B com mutual TLS'),
}


def clean_text(value: str) -> str:
    value = value.replace('\uf0b7', '•').replace('\u00ad', '')
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


def numbered_items(text: str) -> list[str] | None:
    matches = list(re.finditer(r'(?<!\d)(\d{1,2})\.\s+', text))
    if not matches or matches[0].start() != 0:
        return None
    return [text[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(text)].strip()
            for index, match in enumerate(matches)]


def extracted_table(document: fitz.Document, page_number: int, table_index: int, caption: str) -> dict:
    rows = [[clean_cell(cell) for cell in row]
            for row in document[page_number - 1].find_tables().tables[table_index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'tls': extracted_table(document, 5, 0, 'Tabela 1 - Comparação operacional entre TLS 1.2 e TLS 1.3.'),
        'validation': extracted_table(document, 5, 1, 'Tabela 2 - Verificações essenciais na validação do certificado de cliente.'),
        'identity': extracted_table(document, 7, 0, 'Tabela 3 - Estratégias de mapeamento de identidade X.509.'),
        'listener': extracted_table(document, 8, 0, 'Tabela 4 - Alternativas de listener e aplicação de mTLS.'),
        'mesh_modes': {
            'kind': 'table',
            'caption': 'Modos permissivo e estrito em uma service mesh.',
            'headers': ['Modo', 'Comportamento', 'Risco operacional'],
            'rows': [
                ['Permissivo', 'Aceita conexões mTLS e plaintext.', 'Facilita migração, mas pode manter bypass silencioso.'],
                ['Estrito', 'Exige mTLS para o tráfego coberto.', 'Mais seguro; requer inventário e compatibilidade completos.'],
                ['Desabilitado', 'Não usa mTLS naquele escopo.', 'Adequado apenas quando outro controle oferece garantia equivalente e documentada.'],
            ],
        },
        'oauth_models': {
            'kind': 'table',
            'caption': 'PKI versus certificado autoassinado registrado.',
            'headers': ['Modelo', 'Como a confiança é estabelecida', 'Implicação'],
            'rows': [
                ['PKI', 'Cadeia até CA confiável e associação por atributos do certificado.', 'Escala com governança de emissão; exige PKI bem administrada.'],
                ['Autoassinado registrado', 'Certificado ou chave pública é registrado diretamente para o cliente OAuth.', 'Reduz dependência de CA, mas exige atualização coordenada em cada rotação.'],
            ],
        },
        'key_storage': {
            'kind': 'table',
            'caption': 'Proteção da chave privada.',
            'headers': ['Local', 'Vantagens', 'Cuidados'],
            'rows': [
                ['Arquivo protegido', 'Simples e compatível.', 'Permissões, cópias, backup, imagem de container e logs.'],
                ['Keystore PKCS#12/JKS', 'Integração com plataformas Java.', 'Senha, distribuição, reload e acesso ao arquivo.'],
                ['Secret de orquestrador', 'Automação e montagem no workload.', 'Controle de acesso ao namespace, etcd, snapshots e rotação.'],
                ['HSM / KMS', 'Chave pode ser não exportável e operações são auditadas.', 'Latência, disponibilidade, custo e compatibilidade TLS.'],
                ['Sidecar/agente', 'Abstrai emissão e rotação da aplicação.', 'Confiança no agente, socket local e isolamento do workload.'],
            ],
        },
        'failures': extracted_table(document, 14, 0, 'Tabela 4 - Matriz de sintomas e hipóteses de diagnóstico.'),
    }


TABLE_REGIONS = {
    5: [(95, 264, 'tls'), (510, 779, 'validation')],
    7: [(134, 360, 'identity')],
    8: [(307, 455, 'listener')],
    9: [(378, 435, 'mesh_modes')],
    10: [(593, 659, 'oauth_models')],
    12: [(191, 292, 'key_storage')],
    14: [(261, 510, 'failures')],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {
            'kind': 'subhead',
            'text': 'Autenticação mútua no caminho corporativo de uma API',
        },
        {
            'kind': 'figure',
            'src': '/assets/learn/mtls-in-depth/pt/overview.svg',
            'alt': 'Visão geral da autenticação mútua no caminho corporativo de uma API',
            'caption': 'Visão geral - da apresentação do certificado à autorização do consumidor.',
        },
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted((block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
                             key=lambda block: (block['bbox'][1], block['bbox'][0]))
        for source_block in page_blocks:
            text, size, bold = block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
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

            figure_match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
            if figure_match:
                number = int(figure_match.group(1))
                filename, alt = FIGURES[number]
                blocks.append({
                    'kind': 'figure',
                    'src': f'/assets/learn/mtls-in-depth/pt/{filename}',
                    'alt': alt,
                    'caption': text,
                })
                continue

            if text.startswith('•'):
                items = [clean_text(item) for item in text.split('•') if clean_text(item)]
                blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            items = numbered_items(text)
            if items and not (page_number == 18 and y >= 586):
                blocks.append({'kind': 'list', 'ordered': True, 'items': items})
                continue

            # Fixed-width examples and commands in the source document.
            is_code = (
                (page_number == 6 and 608 <= y <= 669)
                or (page_number == 13 and size <= 8.1)
                or (page_number == 17 and 270 <= y <= 360)
            )
            if is_code:
                append_block(blocks, {'kind': 'code', 'text': block_code(source_block)})
                continue

            if size >= 16:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': slugify(text)})
            elif size >= 12.2 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 9.8:
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
        ('mutual TLS', 'mutual TLS'), ('API gateways', 'API Gateways'),
        ('service networks', 'service meshes'), ('confidence chain', 'trust chain'),
        ('confidence repository', 'truststore'), ('trust repository', 'truststore'),
        ('work loads', 'workloads'), ('certificate linked', 'certificate-bound'),
        ('proof of ownership', 'proof of possession'),
        ('Enterprise architectural standards', 'Enterprise architectural patterns'),
        ('Pattern A - partner for gateway', 'Pattern A - partner to gateway'),
        ('Frequent faults', 'Frequent failures'),
        ('hardening checklist', 'Hardening checklist'),
        ('Troubleshooting', 'Troubleshooting'),
    ],
    'es': [
        ('TLS mutuo', 'mutual TLS'), ('tls mutuo', 'mutual TLS'),
        ('Puertas de enlace API', 'API Gateways'), ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace API', 'API Gateway'),
        ('almacén de confianza', 'truststore'), ('almacenes de confianza', 'truststores'),
        ('carga de trabajo', 'workload'), ('cargas de trabajo', 'workloads'),
        ('malla de servicios', 'service mesh'), ('mallas de servicios', 'service meshes'),
        ('Apretón de manos', 'Handshake'), ('apretón de manos', 'handshake'),
        ('Tubería', 'Pipeline'), ('tubería', 'pipeline'),
        ('Oyente', 'Listener'), ('oyente', 'listener'),
        ('Terminación, nuevo cifrado y transferencia', 'Terminación, recriptografía y passthrough'),
        ('Estándares arquitectónicos empresariales', 'Patrones arquitectónicos corporativos'),
        ('Patrón A: socio para la puerta de enlace', 'Patrón A - socio hacia el gateway'),
        ('Patrón B: puerta de enlace como cliente mTLS backend', 'Patrón B - gateway como cliente mTLS del backend'),
        ('Patrón C: paso al servicio', 'Patrón C - passthrough hasta el servicio'),
        ('puerta de enlace', 'gateway'), ('Puerta de enlace', 'Gateway'),
        ('Prueba con rizo', 'Prueba con curl'),
        ('solución de problemas', 'troubleshooting'), ('retroubleshooting', 'troubleshooting'),
        ('Almacén de confianza Java', 'Truststore Java'),
        ('que esta autenticado', 'Qué se autentica'),
        ('prueba de propiedad', 'prueba de posesión'),
        ('Flujo de resumen', 'Flujo resumido'),
        ('Emisión y arranque', 'Emisión y bootstrap'),
        ('Fijar: utilizar con discreción', 'Pinning: usar con criterio'),
        ('Apertura en caso de fallo versus cierre en caso de fallo', 'Fail-open versus fail-closed'),
        ('endurecimiento', 'hardening'), ('Asunto', 'Subject'),
        ('Buena practica', 'Buena práctica'),
    ],
}


def polish(value: str, locale: str) -> str:
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    if locale == 'es':
        value = re.sub(r'\b9,(\d)', r'9.\1', value)
    return value


def localize_code(value: str, locale: str) -> str:
    labels = {
        'en': {
            'Domínio de confiança': 'Trust domain',
            'Área': 'Area',
            'Produto': 'Product',
        },
        'es': {
            'Domínio de confiança': 'Dominio de confianza',
            'Área': 'Área',
            'Produto': 'Producto',
        },
    }[locale]
    translated_lines: list[str] = []
    for line in value.splitlines():
        match = re.match(r'^(\s*)([^:]+):(.*)$', line)
        if match and match.group(2) in labels:
            translated_lines.append(f'{match.group(1)}{labels[match.group(2)]}:{match.group(3)}')
        else:
            translated_lines.append(line)
    return '\n'.join(translated_lines)


def localize_blocks(source: list[dict], locale: str, translations: dict[str, str] | None = None) -> list[dict]:
    translations = translations or translate_values(translatable_values(source), locale)
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

    write_typescript(OUTPUTS['pt'], 'MTLS_PT_CHAPTER_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'MTLS_EN_CHAPTER_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'MTLS_ES_CHAPTER_BLOCKS', spanish, 'es')
    print(json.dumps({'pt_blocks': len(portuguese), 'values': len(values)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
