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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_20_Identity_Federation_e_Single_Sign_On.pdf'
)

spec = importlib.util.spec_from_file_location('chapter19_generator', ROOT / 'scripts/generate-chapter19-content.py')
template = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(template)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/identity-federation-single-sign-on-pt/identity-federation-content.data.ts',
    'en': ROOT / 'src/app/learn/identity-federation-single-sign-on-en/identity-federation-content.data.ts',
    'es': ROOT / 'src/app/learn/federacion-identidad-single-sign-on-es/identity-federation-content.data.ts',
}

ASSET_ROOT = '/assets/learn/identity-federation-sso'
FIGURES = {
    1: ('figure-01-federation-flow.svg', 'Fluxo conceitual de federação e SSO entre usuário, aplicação, provedor e sessão local'),
    2: ('figure-02-trust-topologies.svg', 'Comparação entre confiança direta e topologia hub-and-spoke com broker'),
    3: ('figure-03-session-layers.svg', 'Camadas independentes de sessão do IdP, aplicação, navegador e access token'),
    4: ('figure-04-identity-broker.svg', 'Identity broker normalizando confiança, protocolos, claims e sessões'),
}


def clean_table_cell(value: str | None) -> str:
    return template.clean_table_cell(value)


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[clean_table_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'concepts': extracted_table(document, 3, 0, 'Tabela 1 - Conceitos relacionados, mas com responsabilidades diferentes.'),
        'protocols': extracted_table(document, 5, 0, 'Tabela 2 - Os protocolos têm papéis semelhantes, mas ecossistemas e mecanismos diferentes.'),
        'lifecycle': extracted_table(document, 6, 0, 'Tabela 3 - Federação é uma relação de ciclo de vida, não apenas uma configuração inicial.'),
        'populations': extracted_table(document, 7, 0, 'Tabela 4 - Populações diferentes exigem políticas de identidade diferentes.'),
        'threats': extracted_table(document, 8, 0, 'Tabela 5 - A confiança federada precisa ser limitada por validações e políticas locais.'),
        'troubleshooting': extracted_table(document, 9, 0, 'Tabela 6 - Diagnóstico federado exige evidência de todas as camadas.'),
        'glossary': extracted_table(document, 10, 0, 'Tabela 7 - Vocabulário essencial do capítulo.'),
    }


TABLE_REGIONS = {
    3: [(230, 330, 'concepts')],
    5: [(362, 462, 'protocols')],
    6: [(134, 233, 'lifecycle')],
    7: [(519, 619, 'populations')],
    8: [(208, 324, 'threats')],
    9: [(57, 173, 'troubleshooting')],
    10: [(238, 519, 'glossary')],
}

FIGURE_REGIONS = {
    4: [(60, 233), (388, 557)],
    5: [(60, 221)],
    7: [(200, 369)],
}

CODE_REGIONS = {
    5: [(614, 700)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Uma autenticação, múltiplas aplicações e domínios de confiança'},
        {
            'kind': 'figure',
            'src': f'{ASSET_ROOT}/pt/overview.svg',
            'alt': 'Usuário autenticado por um Identity Provider acessando múltiplas aplicações em domínios de confiança',
            'caption': 'Figura de abertura - Federação conecta domínios de identidade; SSO reduz desafios repetidos sem eliminar as sessões locais.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'Federação transfere confiança entre domínios; SSO reutiliza uma sessão de autenticação sob regras controladas.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted(
            (block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )
        for source_block in page_blocks:
            text, size, bold = template.template.base.base.block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue

            if any(start <= y <= end for start, end in FIGURE_REGIONS.get(page_number, [])):
                match = re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)', text)
                if match:
                    number = int(match.group(1))
                    filename, alt = FIGURES[number]
                    blocks.append({'kind': 'figure', 'src': f'{ASSET_ROOT}/pt/{filename}', 'alt': alt, 'caption': text})
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
                items = [template.template.base.base.clean_text(item) for item in re.split(r'[•●]', text)
                         if template.template.base.base.clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
                template.template.base.base.append_block(blocks, {'kind': 'code', 'text': template.template.base.base.block_code(source_block)})
                continue

            if size >= 14:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': template.template.base.base.slugify(text)})
            elif size >= 9.8 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5:
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                template.template.base.base.append_block(blocks, {'kind': 'paragraph', 'text': text})
    return blocks


PRESERVE_TERMS = template.PRESERVE_TERMS | {
    'Identity Federation', 'Single Sign-On', 'SSO', 'Single Logout', 'SLO', 'IdP', 'SP', 'RP',
    'Identity Provider', 'Service Provider', 'Relying Party', 'identity broker', 'attribute authority',
    'SAML', 'SAML 2.0', 'OpenID Connect', 'OIDC', 'OAuth 2.0', 'JWT', 'JOSE', 'SCIM', 'JIT provisioning',
    'NameID', 'AuthnContextClassRef', 'SessionIndex', 'ID Token', 'Discovery', 'UserInfo', 'JWKS',
    'RP-Initiated Logout', 'Front-Channel Logout', 'Back-Channel Logout', 'Token Exchange',
    'workload identity federation', 'home realm discovery', 'account linking', 'pairwise identifier',
    'issuer', 'subject', 'audience', 'nonce', 'state', 'RelayState', 'InResponseTo', 'acr', 'amr',
    'auth_time', 'azp', 'exp', 'iat', 'sub', 'client_id', 'actor', 'redirect_uri', 'ACS',
    'API Gateway', 'Axway API Gateway', 'Azure API Management', 'mTLS', 'HSM', 'B2B', 'B2C', 'MFA',
}

REPLACEMENTS = {
    'en': [
        ('Saml', 'SAML'), ('Oidc', 'OIDC'), ('Oauth', 'OAuth'), ('Jwt', 'JWT'), ('Jose', 'JOSE'),
        ('Api Gateway', 'API Gateway'), ('Identity federation', 'Identity Federation'),
        ('Single sign-on', 'Single Sign-On'), ('single sign-on', 'Single Sign-On'),
        ('professional consultation', 'professional reference'),
        ('subscription', 'signature'), ('Subscription', 'Signature'),
    ],
    'es': [
        ('Saml', 'SAML'), ('Oidc', 'OIDC'), ('Oauth', 'OAuth'), ('Jwt', 'JWT'), ('Jose', 'JOSE'),
        ('Puerta de enlace API', 'API Gateway'), ('puerta de enlace API', 'API Gateway'),
        ('Proveedor de identidad', 'Identity Provider'), ('proveedor de identidad', 'Identity Provider'),
        ('Proveedor de servicios', 'Service Provider'), ('proveedor de servicios', 'Service Provider'),
        ('Parte que confía', 'Relying Party'), ('Inicio de sesión único', 'Single Sign-On'),
        ('inicio de sesión único', 'Single Sign-On'), ('Cierre de sesión único', 'Single Logout'),
        ('cierre de sesión único', 'Single Logout'), ('corredor de identidad', 'identity broker'),
        ('agente de identidad', 'identity broker'), ('Agente de identidad', 'Identity broker'),
        ('vinculación de cuentas', 'account linking'), ('Vinculación de cuentas', 'Account linking'),
        ('reino natal', 'home realm'), ('solución de problemas', 'troubleshooting'),
        ('Solución de problemas', 'Troubleshooting'), ('suscripción', 'firma'), ('Suscripción', 'Firma'),
    ],
}


def polish(value: str, locale: str) -> str:
    value = template.template.base.polish(value, locale)
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value.replace('\u200b', '').replace('\u200c', '').replace('\ufeff', '')


def localize_blocks(source: list[dict], locale: str, translations: dict[str, str]) -> list[dict]:
    localized = copy.deepcopy(source)
    for index, block in enumerate(localized):
        source_block = source[index]
        kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            block['text'] = polish(translations[block['text']], locale)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = template.template.base.base.slugify(block['text'])
        elif kind == 'list':
            block['items'] = [polish(translations[item], locale) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = polish(translations[block['alt']], locale)
            block['caption'] = polish(translations[block['caption']], locale)
            block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = polish(translations[block['caption']], locale)
            block['headers'] = [value if value in PRESERVE_TERMS else polish(translations[value], locale)
                                for value in source_block['headers']]
            block['rows'] = [[value if value in PRESERVE_TERMS else polish(translations[value], locale)
                              for value in row] for row in source_block['rows']]
    return localized


def main() -> None:
    portuguese = extract_portuguese_blocks()
    values = template.template.base.base.translatable_values(portuguese)
    translations = {
        'en': template.template.base.base.translate_values(values, 'en'),
        'es': template.template.base.base.translate_values(values, 'es'),
    }
    english = localize_blocks(portuguese, 'en', translations['en'])
    spanish = localize_blocks(portuguese, 'es', translations['es'])
    template.template.base.write_typescript(OUTPUTS['pt'], 'IDENTITY_FEDERATION_PT_BLOCKS', portuguese, 'pt')
    template.template.base.write_typescript(OUTPUTS['en'], 'IDENTITY_FEDERATION_EN_BLOCKS', english, 'en')
    template.template.base.write_typescript(OUTPUTS['es'], 'IDENTITY_FEDERATION_ES_BLOCKS', spanish, 'es')
    print(json.dumps({
        'blocks': len(portuguese), 'values': len(values),
        'h2': sum(block.get('level') == 2 for block in portuguese),
        'tables': sum(block['kind'] == 'table' for block in portuguese),
        'figures': sum(block['kind'] == 'figure' for block in portuguese),
        'codes': sum(block['kind'] == 'code' for block in portuguese),
    }, ensure_ascii=False))


if __name__ == '__main__':
    main()
