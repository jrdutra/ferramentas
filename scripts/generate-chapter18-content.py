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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_18_JWT_JWS_JWE_e_JOSE_em_Profundidade.pdf'
)

spec = importlib.util.spec_from_file_location('chapter16_generator', ROOT / 'scripts/generate-chapter16-content.py')
base = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(base)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/jwt-jws-jwe-jose-em-profundidade-pt/jose-content.data.ts',
    'en': ROOT / 'src/app/learn/jwt-jws-jwe-jose-in-depth-en/jose-content.data.ts',
    'es': ROOT / 'src/app/learn/jwt-jws-jwe-jose-en-profundidad-es/jose-content.data.ts',
}

ASSET_ROOT = '/assets/learn/jwt-jws-jwe-jose-in-depth'
FIGURES = {
    1: ('figure-01-jose-family.svg', 'Família JOSE separando JWT, JWS, JWE, JWK, JWKS e JWA por responsabilidade'),
    2: ('figure-02-jws-compact.svg', 'JWS Compact Serialization com protected header, payload, assinatura e signing input'),
    3: ('figure-03-key-rotation.svg', 'Rotação de chaves com publicação antecipada, sobreposição e retirada segura'),
    4: ('figure-04-jwe-compact.svg', 'JWE Compact Serialization com protected header, encrypted key, IV, ciphertext e tag'),
    5: ('figure-05-validation-pipeline.svg', 'Pipeline seguro de validação de JWT em um resource server'),
}


def clean_table_cell(value: str | None) -> str:
    cleaned = base.clean_table_cell(value)
    replacements = {
        'key ops': 'key_ops',
        'jwks uri': 'jwks_uri',
        'tenant id': 'tenant_id',
        'client id': 'client_id',
        'x5t s256': 'x5t#S256',
    }
    for before, after in replacements.items():
        cleaned = re.sub(rf'\b{re.escape(before)}\b', after, cleaned, flags=re.IGNORECASE)
    return re.sub(r'(?:\s+_)+\s*$', '', cleaned).strip()


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[clean_table_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'family': extracted_table(document, 3, 0, 'Tabela 1 - Cada componente JOSE resolve uma responsabilidade diferente.'),
        'claims': extracted_table(document, 4, 0, 'Tabela 2 - Claims registradas possuem semântica geral, mas o perfil define a obrigação concreta.'),
        'trust': extracted_table(document, 5, 0, 'Tabela 3 - A escolha do modelo altera fronteiras de confiança e resposta a incidentes.'),
        'algorithms': extracted_table(document, 6, 0, 'Tabela 4 - O algoritmo deve ser escolhido por política, não pelo conteúdo não confiável do token.'),
        'headers': extracted_table(document, 6, 1, 'Tabela 5 - Headers orientam processamento, mas precisam de política local.'),
        'jwks': extracted_table(document, 7, 0, 'Tabela 6 - Distribuição de chaves é parte da disponibilidade e da segurança do token.'),
        'jwe': extracted_table(document, 9, 0, 'Tabela 7 - JWE combina key management, content encryption e metadados protegidos.'),
        'protections': extracted_table(document, 9, 1, 'Tabela 8 - A escolha depende de confidencialidade, autonomia, revogação e complexidade.'),
        'pipeline': extracted_table(document, 10, 0, 'Tabela 9 - Parsing, autenticação do token e autorização são etapas diferentes.'),
        'profiles': extracted_table(document, 11, 0, 'Tabela 10 - Tipos diferentes exigem regras de validação mutuamente exclusivas.'),
        'threats': extracted_table(document, 12, 0, 'Tabela 11 - O hardening combina criptografia, parsing, rede e governança.'),
        'troubleshooting': extracted_table(document, 13, 0, 'Tabela 12 - Sintomas de token apontam para etapas diferentes do pipeline.'),
        'glossary': extracted_table(document, 16, 0, 'Tabela 13 - Vocabulário essencial do capítulo.'),
        'decision': extracted_table(document, 16, 1, 'Tabela 14 - A arquitetura depende do requisito, não apenas da preferência por JWT.'),
    }


TABLE_REGIONS = {
    3: [(470, 581, 'family')],
    4: [(339, 483, 'claims')],
    5: [(612, 707, 'trust')],
    6: [(144, 306, 'algorithms'), (508, 619, 'headers')],
    7: [(354, 465, 'jwks')],
    9: [(133, 244, 'jwe'), (628, 731, 'protections')],
    10: [(419, 546, 'pipeline')],
    11: [(409, 536, 'profiles')],
    12: [(608, 735, 'threats')],
    13: [(431, 558, 'troubleshooting')],
    16: [(81, 407, 'glossary'), (438, 598, 'decision')],
}

FIGURE_REGIONS = {
    3: [(135, 314)],
    5: [(60, 236)],
    8: [(60, 241), (478, 663)],
    10: [(60, 236)],
}

CODE_REGIONS = {
    4: [(67, 132)],
    5: [(391, 456)],
    7: [(67, 147), (621, 694)],
    9: [(399, 472)],
    11: [(67, 201), (692, 772)],
    12: [(243, 362)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Criptografia, contexto e governança para tokens seguros'},
        {
            'kind': 'figure',
            'src': f'{ASSET_ROOT}/pt/overview.svg',
            'alt': 'Ciclo criptográfico de um token entre emissor, JWS ou JWT, API Gateway e backend',
            'caption': 'Figura de abertura - Tokens seguros dependem de criptografia, contexto, destinatário e governança de chaves.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Assinatura protege integridade e origem; criptografia protege leitura. Nenhuma delas substitui validação de issuer, audience e finalidade.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted(
            (block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )
        for source_block in page_blocks:
            text, size, bold = base.base.block_text(source_block)
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
                        'src': f'{ASSET_ROOT}/pt/{filename}',
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

            if text.startswith(('•', '●')):
                items = [base.base.clean_text(item) for item in re.split(r'[•●]', text) if base.base.clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
                base.base.append_block(blocks, {'kind': 'code', 'text': base.base.block_code(source_block)})
                continue

            if size >= 14:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': base.base.slugify(text)})
            elif size >= 9.8 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5:
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                base.base.append_block(blocks, {'kind': 'paragraph', 'text': text})

    return blocks


REPLACEMENTS = {
    'en': [
        ('Json Web', 'JSON Web'), ('Jwt', 'JWT'), ('Jws', 'JWS'), ('Jwe', 'JWE'),
        ('Jwk', 'JWK'), ('Jwks', 'JWKS'), ('Jose', 'JOSE'), ('Oauth', 'OAuth'),
        ('Openid Connect', 'OpenID Connect'), ('Api Gateway', 'API Gateway'),
        ('API gateways', 'API Gateways'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('Azure Api Management', 'Azure API Management'), ('MtlS', 'mTLS'),
        ('Dpop', 'DPoP'), ('Hsm', 'HSM'), ('Kms', 'KMS'),
        ('Base64Url', 'Base64url'), ('Base64 URL', 'Base64url'),
        ('algorithm confusion', 'algorithm confusion'), ('proof of possession', 'proof-of-possession'),
        ('professional consultation', 'professional reference'),
        ('The JOSE family and their responsibilities', 'The JOSE family and its responsibilities'),
        ('Key rotation, caching and retrieval', 'Key rotation, caching, and key retirement'),
        ('Application on API Gateways', 'Application in API Gateways'),
        ('Subscription with HSM/KMS', 'Signature with HSM/KMS'),
        ('intended for a specific customer', 'intended for a specific recipient'),
    ],
    'es': [
        ('Json Web', 'JSON Web'), ('Jwt', 'JWT'), ('Jws', 'JWS'), ('Jwe', 'JWE'),
        ('Jwk', 'JWK'), ('Jwks', 'JWKS'), ('Jose', 'JOSE'), ('Oauth', 'OAuth'),
        ('Openid Connect', 'OpenID Connect'), ('Puerta de enlace API', 'API Gateway'),
        ('puerta de enlace API', 'API Gateway'), ('Puertas de enlace API', 'API Gateways'),
        ('puertas de enlace API', 'API Gateways'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('Azure Api Management', 'Azure API Management'), ('MtlS', 'mTLS'),
        ('Dpop', 'DPoP'), ('Hsm', 'HSM'), ('Kms', 'KMS'),
        ('Base64Url', 'Base64url'), ('Base64 URL', 'Base64url'),
        ('reclamos', 'claims'), ('Reclamos', 'Claims'), ('reclamaciones', 'claims'),
        ('emisor', 'issuer'), ('Emisor', 'Issuer'), ('audiencia', 'audience'),
        ('prueba de posesiÃ³n', 'proof-of-possession'), ('token de acceso', 'access token'),
        ('Token de acceso', 'Access token'), ('Token de identificaciÃ³n', 'ID Token'),
        ('token de identificaciÃ³n', 'ID Token'), ('servidor de recursos', 'resource server'),
        ('Servidor de recursos', 'Resource server'), ('endurecimiento', 'hardening'),
        ('soluciÃ³n de problemas', 'troubleshooting'), ('SoluciÃ³n de problemas', 'Troubleshooting'),
        ('notificaciones', 'claims'), ('Reclamaciones', 'Claims'), ('reclamaciones', 'claims'),
        ('reclamación', 'claim'), ('reclamo', 'claim'), ('Reclamar', 'Claim'),
        ('entrada de firmas', 'signing input'), ('listas permitidas', 'allowlists'),
        ('Headers tipo, cty, kid y crítico', 'Headers typ, cty, kid y crit'),
        ('huellas digitales', 'thumbprints'), ('huella digital', 'thumbprint'),
        ('recuperación de claves', 'retirada de claves'),
        ('clave de cifrado de contenido', 'Content Encryption Key'),
        ('Canal de validación segura', 'Pipeline de validación segura'),
        ('Privacidad, registro y minimización', 'Privacidad, logging y minimización'),
        ('Prueba de posesión', 'Proof-of-possession'),
        ('Suscripción con HSM/KMS', 'Firma con HSM/KMS'),
        ('afirmación del cliente', 'client assertion'), ('afirmación cnf', 'claim cnf'),
        ('la token', 'el token'), ('la etiqueta', 'la tag'),
        ('texto sin formato', 'plaintext'), ('token de preparación', 'token de staging'),
        ('escritura explícita', 'tipado explícito'), ('funciones emitidas', 'roles emitidos'),
    ],
}

PRESERVE_TERMS = base.PRESERVE_TERMS | {
    'JOSE', 'JWT', 'JWS', 'JWE', 'JWK', 'JWKS', 'JWA', 'Base64url', 'UTF-8',
    'Protected Header', 'Payload', 'Signature', 'Signing input', 'MAC', 'HMAC',
    'RS256', 'PS256', 'ES256', 'HS256', 'EdDSA', 'A256GCM', 'RSA-OAEP-256',
    'Content Encryption Key', 'CEK', 'AAD', 'Nested JWT', 'RFC 8725', 'RFC 9068',
    'RFC 9864', 'RFC 9901', 'SD-JWT', 'DPoP', 'mTLS', 'HSM', 'KMS',
    'alg', 'enc', 'typ', 'cty', 'kid', 'crit', 'jku', 'x5u', 'x5c', 'x5t',
    'x5t#S256', 'kty', 'use', 'key_ops', 'iss', 'sub', 'aud', 'exp', 'nbf',
    'iat', 'jti', 'cnf', 'jkt', 'issuer', 'audience', 'access token', 'ID Token',
    'API Gateway', 'Axway API Gateway', 'Azure API Management',
}


def polish(value: str, locale: str) -> str:
    value = base.polish(value, locale)
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value.replace('\u200b', '').replace('\u200c', '').replace('\ufeff', '')


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            'CEK protegida para o destinatario': 'CEK protected for the recipient',
            'valor unico exigido pelo algoritmo': 'unique value required by the algorithm',
            'conteudo cifrado': 'encrypted content',
            'autenticidade do ciphertext e dados associados': 'authenticity of ciphertext and associated data',
        },
        'es': {
            'CEK protegida para o destinatario': 'CEK protegida para el destinatario',
            'valor unico exigido pelo algoritmo': 'valor único exigido por el algoritmo',
            'conteudo cifrado': 'contenido cifrado',
            'autenticidade do ciphertext e dados associados': 'autenticidad del ciphertext y de los datos asociados',
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
            block['text'] = polish(translations[block['text']], locale)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = base.base.slugify(block['text'])
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
            block['headers'] = [value[:1].upper() + value[1:] if value else value for value in block['headers']]
            block['rows'] = [[
                value if value in PRESERVE_TERMS else polish(translations[value], locale)
                for value in row
            ] for row in source_block['rows']]
        elif kind == 'code':
            block['text'] = localize_code(block['text'], locale)
    return localized


def main() -> None:
    portuguese = extract_portuguese_blocks()
    values = base.base.translatable_values(portuguese)
    translations = {
        'en': base.base.translate_values(values, 'en'),
        'es': base.base.translate_values(values, 'es'),
    }
    english = localize_blocks(portuguese, 'en', translations['en'])
    spanish = localize_blocks(portuguese, 'es', translations['es'])
    base.write_typescript(OUTPUTS['pt'], 'JOSE_PT_BLOCKS', portuguese, 'pt')
    base.write_typescript(OUTPUTS['en'], 'JOSE_EN_BLOCKS', english, 'en')
    base.write_typescript(OUTPUTS['es'], 'JOSE_ES_BLOCKS', spanish, 'es')
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
