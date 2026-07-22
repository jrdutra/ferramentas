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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_19_SAML_2_0.pdf'
)

spec = importlib.util.spec_from_file_location('chapter18_generator', ROOT / 'scripts/generate-chapter18-content.py')
template = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(template)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/saml-2-em-profundidade-pt/saml-content.data.ts',
    'en': ROOT / 'src/app/learn/saml-2-in-depth-en/saml-content.data.ts',
    'es': ROOT / 'src/app/learn/saml-2-en-profundidad-es/saml-content.data.ts',
}

ASSET_ROOT = '/assets/learn/saml-2-in-depth'
FIGURES = {
    1: ('figure-01-assertion-anatomy.svg', 'Anatomia de uma SAML Assertion com issuer, subject, conditions, statements e assinatura'),
    2: ('figure-02-sp-initiated-sso.svg', 'Fluxo Web Browser SSO iniciado pelo Service Provider'),
    3: ('figure-03-validation-pipeline.svg', 'Pipeline seguro de validação de uma SAMLResponse'),
    4: ('figure-04-bindings.svg', 'Bindings SAML transportando a mesma mensagem por canais diferentes'),
    5: ('figure-05-metadata-trust.svg', 'Metadata de SP e IdP estabelecendo endpoints, identificadores e chaves confiáveis'),
}


def clean_table_cell(value: str | None) -> str:
    return template.clean_table_cell(value)


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[clean_table_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def tables(document: fitz.Document) -> dict[str, dict]:
    return {
        'layers': extracted_table(document, 3, 0, 'Tabela 1 - As camadas do SAML devem ser analisadas separadamente.'),
        'statements': extracted_table(document, 3, 1, 'Tabela 2 - Statements carregam semânticas distintas dentro da assertion.'),
        'initiated': extracted_table(document, 4, 1, 'Tabela 3 - Os dois modos exigem políticas de validação distintas.'),
        'request': extracted_table(document, 5, 0, 'Tabela 4 - A AuthnRequest controla mais do que um simples redirecionamento.'),
        'bindings': extracted_table(document, 6, 0, 'Tabela 5 - Cada binding possui formato e riscos operacionais próprios.'),
        'crypto': extracted_table(document, 7, 0, 'Tabela 6 - Controles criptográficos são complementares.'),
        'identity': extracted_table(document, 8, 0, 'Tabela 7 - Identificadores e atributos precisam de contrato, não apenas de XML válido.'),
        'comparison': extracted_table(document, 8, 1, 'Tabela 8 - Os padrões se sobrepõem em objetivo, mas não em todos os detalhes.'),
        'threats': extracted_table(document, 9, 0, 'Tabela 9 - A maioria das falhas ocorre na validação e integração, não no conceito de SAML.'),
        'troubleshooting': extracted_table(document, 9, 1, 'Tabela 10 - Diagnóstico SAML exige correlação entre mensagem, metadata e estado local.'),
        'glossary': extracted_table(document, 11, 0, 'Tabela 11 - Vocabulário essencial do capítulo.'),
    }


TABLE_REGIONS = {
    3: [(133, 246, 'layers'), (600, 681, 'statements')],
    4: [(707, 800, 'initiated')],
    5: [(234, 348, 'request')],
    6: [(559, 657, 'bindings')],
    7: [(563, 662, 'crypto')],
    8: [(144, 243, 'identity'), (536, 651, 'comparison')],
    9: [(247, 362, 'threats'), (514, 629, 'troubleshooting')],
    11: [(81, 393, 'glossary')],
}

FIGURE_REGIONS = {
    3: [(414, 600)],
    4: [(372, 558)],
    6: [(60, 238), (381, 558)],
    7: [(87, 272)],
}

CODE_REGIONS = {
    4: [(105, 198)],
    5: [(500, 608)],
    7: [(280, 382)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Federação SAML: identidade autenticada em um domínio e consumida em outro'},
        {
            'kind': 'figure',
            'src': f'{ASSET_ROOT}/pt/overview.svg',
            'alt': 'Federação SAML entre usuário, Service Provider, Identity Provider e sessão local',
            'caption': 'Figura de abertura - O SAML conecta domínios de identidade por meio de mensagens XML e relações explícitas de confiança.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'SAML transporta declarações de segurança entre entidades que já estabeleceram metadados, chaves e regras de confiança.'},
        {'kind': 'paragraph', 'text': 'Edição aprofundada - material de estudo e consulta profissional'},
    ]
    inserted_tables: set[str] = set()

    for page_number in range(2, len(document) + 1):
        page_blocks = sorted(
            (block for block in document[page_number - 1].get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )
        for source_block in page_blocks:
            text, size, bold = template.base.base.block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue

            if any(start <= y <= end for start, end in FIGURE_REGIONS.get(page_number, [])):
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
                items = [template.base.base.clean_text(item) for item in re.split(r'[•●]', text) if template.base.base.clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
                template.base.base.append_block(blocks, {'kind': 'code', 'text': template.base.base.block_code(source_block)})
                continue

            if size >= 14:
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': template.base.base.slugify(text)})
            elif size >= 9.8 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif bold and size >= 8.5:
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                template.base.base.append_block(blocks, {'kind': 'paragraph', 'text': text})

    return blocks


PRESERVE_TERMS = template.PRESERVE_TERMS | {
    'SAML', 'SAML 2.0', 'XML', 'XML Signature', 'XML Encryption', 'XML Signature Wrapping',
    'IdP', 'SP', 'SSO', 'SLO', 'ACS', 'NameID', 'AuthnRequest', 'AuthnStatement',
    'AttributeStatement', 'AuthzDecisionStatement', 'AuthnContext', 'Response', 'Assertion',
    'SubjectConfirmation', 'SubjectConfirmationData', 'InResponseTo', 'RelayState',
    'AudienceRestriction', 'EntityDescriptor', 'KeyDescriptor', 'SingleSignOnService',
    'SingleLogoutService', 'HTTP-Redirect', 'HTTP-POST', 'HTTP-Artifact', 'SOAP',
    'Base64', 'DEFLATE', 'DTD', 'XXE', 'XPath', 'SignedInfo', 'Reference URI',
    'OpenID Connect', 'OIDC', 'OAuth', 'OAuth 2.0', 'JWT', 'JOSE', 'JWKS', 'API Gateway',
}

REPLACEMENTS = {
    'en': [('Saml', 'SAML'), ('Oauth', 'OAuth'), ('Oidc', 'OIDC'), ('Jwt', 'JWT'), ('Jose', 'JOSE'),
           ('Xml', 'XML'), ('Idp', 'IdP'), ('Api Gateway', 'API Gateway'),
           ('subscription rules', 'signature rules'), ('Response Subscription', 'Response Signature'),
           ('Assertion Subscription', 'Assertion Signature'), ('operated with subscription, expiration', 'operated with signature, expiration'),
           ('query expert authorities', 'query specialized authorities'),
           ('professional consultation', 'professional reference')],
    'es': [('Saml', 'SAML'), ('Oauth', 'OAuth'), ('Oidc', 'OIDC'), ('Jwt', 'JWT'), ('Jose', 'JOSE'),
           ('Xml', 'XML'), ('Idp', 'IdP'), ('Puerta de enlace API', 'API Gateway'),
           ('proveedor de identidad', 'Identity Provider'), ('Proveedor de identidad', 'Identity Provider'),
           ('proveedor de servicios', 'Service Provider'), ('Proveedor de servicios', 'Service Provider'),
           ('retroubleshooting', 'troubleshooting'), ('Afirmaciones', 'Aserciones'), ('afirmaciones', 'aserciones'),
           ('Aseveración', 'Aserción'), ('aseveración', 'aserción'),
           ('Respuesta y Aserción', 'Response y Assertion'), ('Confirmación del Asunto', 'SubjectConfirmation'),
           ('Condiciones, SubjectConfirmation', 'Conditions, SubjectConfirmation'),
           ('Enlaces SAML', 'Bindings SAML'), ('Conexión OpenID', 'OpenID Connect'),
           ('agentes de identidad', 'brokers de identidad'), ('cierre de sesión único', 'Single Logout'),
           ('Cierre de sesión único', 'Single Logout'), ('suscripción', 'firma'), ('Suscripción', 'Firma'),
           ('los enlaces HTTP-', 'los bindings HTTP-'), ('Compare enlaces HTTP-', 'Compare bindings HTTP-'),
           ('El enlace HTTP-', 'El binding HTTP-'), ('En el enlace HTTP-', 'En el binding HTTP-'),
           ('En el enlace de redireccionamiento', 'En el binding HTTP-Redirect'),
           ('En el enlace POST', 'En el binding HTTP-POST'), ('El enlace define', 'El binding define'),
           ('Los enlaces describen', 'Los bindings describen'), ('mensajes y enlaces', 'mensajes y bindings'),
           ('endpoints, enlaces admitidos', 'endpoints, bindings admitidos'),
           ('OASIS. Enlaces para', 'OASIS. Bindings para'),
           ('Autoridades expertas en consultas AttributeQuery y AuthnQuery.', 'AttributeQuery y AuthnQuery consultan autoridades especializadas.'),
           ('La respuesta conlleva', 'Response contiene'), ('La respuesta es el mensaje', 'Response es el mensaje'),
           ('La Respuesta', 'La Response'), ('la Respuesta', 'la Response'),
           ('Respuesta y la Afirmación', 'Response y la Assertion'),
           ('Tiene Emisor, Estado, Destino,', 'Tiene Issuer, Status, Destination,')],
}


def polish(value: str, locale: str) -> str:
    value = template.base.polish(value, locale)
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
                block['id'] = template.base.base.slugify(block['text'])
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
    values = template.base.base.translatable_values(portuguese)
    translations = {
        'en': template.base.base.translate_values(values, 'en'),
        'es': template.base.base.translate_values(values, 'es'),
    }
    english = localize_blocks(portuguese, 'en', translations['en'])
    spanish = localize_blocks(portuguese, 'es', translations['es'])
    template.base.write_typescript(OUTPUTS['pt'], 'SAML_PT_BLOCKS', portuguese, 'pt')
    template.base.write_typescript(OUTPUTS['en'], 'SAML_EN_BLOCKS', english, 'en')
    template.base.write_typescript(OUTPUTS['es'], 'SAML_ES_BLOCKS', spanish, 'es')
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
