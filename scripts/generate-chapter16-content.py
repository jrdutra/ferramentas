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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_16_OAuth_2_0_Completo_Fluxos_Tokens_e_Seguranca.pdf'
)

spec = importlib.util.spec_from_file_location('chapter14_generator', ROOT / 'scripts/generate-chapter14-content.py')
base = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(base)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/oauth-2-fluxos-tokens-seguranca-pt/oauth-2-content.data.ts',
    'en': ROOT / 'src/app/learn/oauth-2-flows-tokens-security-en/oauth-2-content.data.ts',
    'es': ROOT / 'src/app/learn/oauth-2-flujos-tokens-seguridad-es/oauth-2-content.data.ts',
}

FIGURES = {
    1: ('figure-01-roles.svg', 'Papéis OAuth e seus canais de comunicação e confiança'),
    2: ('figure-02.svg', 'Authorization Code com PKCE usando front-channel e back-channel'),
    3: ('figure-03.svg', 'Ciclo de vida de grants, access tokens e refresh tokens'),
    4: ('figure-04.svg', 'Comparação entre bearer token e sender-constrained token'),
    5: ('figure-05.svg', 'OAuth em arquitetura corporativa com API Gateway e backend'),
}


def clean_table_cell(value: str | None) -> str:
    cleaned = base.clean_cell(value)
    replacements = {
        'code verifier': 'code_verifier',
        'code challenge method': 'code_challenge_method',
        'code challenge': 'code_challenge',
        'client secret basic': 'client_secret_basic',
        'private key jwt': 'private_key_jwt',
        'client id': 'client_id',
        'device code': 'device_code',
        'user code': 'user_code',
        'verification uri': 'verification_uri',
        'slow down': 'slow_down',
        'invalid request': 'invalid_request',
        'invalid client': 'invalid_client',
        'invalid grant': 'invalid_grant',
        'invalid token': 'invalid_token',
        'insufficient scope': 'insufficient_scope',
    }
    for before, after in replacements.items():
        cleaned = re.sub(rf'\b{re.escape(before)}\b', after, cleaned, flags=re.IGNORECASE)
    return re.sub(r'(?:\s+_)+\s*$', '', cleaned).strip()


def extracted_table(document: fitz.Document, page: int, index: int, caption: str) -> dict:
    rows = [[clean_table_cell(cell) for cell in row]
            for row in document[page - 1].find_tables().tables[index].extract()]
    return {'kind': 'table', 'caption': caption, 'headers': rows[0], 'rows': rows[1:]}


def append_continuation(table: dict, document: fitz.Document, page: int, index: int) -> None:
    rows = document[page - 1].find_tables().tables[index].extract()
    table['rows'].extend([[clean_table_cell(cell) for cell in row] for row in rows[1:]])


def tables(document: fitz.Document) -> dict[str, dict]:
    artifacts = extracted_table(document, 4, 1, 'Tabela 3 - Artefatos não são intercambiáveis.')
    append_continuation(artifacts, document, 5, 0)
    access_validation = extracted_table(
        document, 8, 1,
        'Tabela 9 - Validação técnica e autorização de negócio são complementares.',
    )
    append_continuation(access_validation, document, 9, 0)
    threats = extracted_table(document, 12, 0, 'Tabela 14 - Controles devem produzir evidências observáveis.')
    append_continuation(threats, document, 13, 0)
    return {
        'roles': extracted_table(document, 3, 0, 'Tabela 1 - Cada papel possui controles e evidências próprias.'),
        'endpoints': extracted_table(document, 4, 0, 'Tabela 2 - Endpoints possuem exposições e controles distintos.'),
        'artifacts': artifacts,
        'pkce': extracted_table(document, 6, 0, 'Tabela 4 - PKCE é uma prova por transação, não uma credencial permanente.'),
        'client_auth': extracted_table(document, 6, 1, 'Tabela 5 - O método deve corresponder à capacidade real do cliente.'),
        'applications': extracted_table(document, 7, 0, 'Tabela 6 - A arquitetura altera onde o token fica exposto.'),
        'device': extracted_table(document, 7, 1, 'Tabela 7 - O fluxo separa o dispositivo solicitante do canal de autenticação.'),
        'refresh': extracted_table(document, 8, 0, 'Tabela 8 - Refresh token precisa de política própria.'),
        'access_validation': access_validation,
        'jwt': extracted_table(document, 9, 1, 'Tabela 10 - Assinatura válida é apenas uma das verificações.'),
        'par': extracted_table(document, 10, 0, 'Tabela 11 - Mecanismos protegem etapas diferentes do front-channel.'),
        'sender': extracted_table(document, 11, 0, 'Tabela 12 - A escolha depende de cliente, infraestrutura e risco.'),
        'exchange': extracted_table(document, 11, 1, 'Tabela 13 - Preserve contexto sem reutilizar autoridade indiscriminadamente.'),
        'threats': threats,
        'troubleshooting': extracted_table(document, 13, 1, 'Tabela 15 - Classifique a etapa antes de alterar policies.'),
        'glossary': extracted_table(document, 16, 0, 'Tabela 16 - Vocabulário essencial do capítulo.'),
        'decision': extracted_table(document, 16, 1, 'Tabela 17 - A escolha final depende de plataforma, risco e capacidade do cliente.'),
    }


TABLE_REGIONS = {
    3: [(675, 775, 'roles')],
    4: [(219, 350, 'endpoints'), (714, 800, 'artifacts')],
    5: [(57, 122, 'artifacts')],
    6: [(145, 244, 'pkce'), (585, 684, 'client_auth')],
    7: [(95, 202, 'applications'), (621, 720, 'device')],
    8: [(374, 490, 'refresh'), (702, 800, 'access_validation')],
    9: [(57, 105, 'access_validation'), (540, 672, 'jwt')],
    10: [(458, 540, 'par')],
    11: [(134, 216, 'sender'), (358, 440, 'exchange')],
    12: [(707, 800, 'threats')],
    13: [(57, 122, 'threats'), (322, 454, 'troubleshooting')],
    16: [(81, 510, 'glossary'), (535, 716, 'decision')],
}

FIGURE_REGIONS = {
    3: [(340, 522)],
    5: [(122, 360)],
    8: [(55, 220)],
    10: [(540, 712)],
    12: [(55, 232)],
}

CODE_REGIONS = {
    5: [(538, 606), (633, 710)],
    7: [(369, 428)],
    8: [(655, 700)],
    9: [(273, 390)],
    10: [(239, 307)],
    11: [(608, 676)],
    12: [(409, 494)],
    13: [(478, 570)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Delegação OAuth 2.0: autorização sem compartilhar a senha do usuário'},
        {
            'kind': 'figure',
            'src': '/assets/learn/oauth-2-flows-tokens-security/pt/overview.svg',
            'alt': 'OAuth 2.0 delegando autoridade entre usuário, cliente, authorization server, gateway e API',
            'caption': 'Figura de abertura - OAuth delega autoridade limitada sem transformar o cliente em proprietário das credenciais do usuário.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'O cliente recebe autoridade limitada para acessar uma API; autenticação do usuário e autorização da API continuam sendo decisões distintas.'},
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
                        'src': f'/assets/learn/oauth-2-flows-tokens-security/pt/{filename}',
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
                items = [base.clean_text(item) for item in re.split(r'[•●]', text) if base.clean_text(item)]
                if blocks and blocks[-1]['kind'] == 'list' and not blocks[-1]['ordered']:
                    blocks[-1]['items'].extend(items)
                else:
                    blocks.append({'kind': 'list', 'ordered': False, 'items': items})
                continue

            if any(start <= y <= end for start, end in CODE_REGIONS.get(page_number, [])):
                base.append_block(blocks, {'kind': 'code', 'text': base.block_code(source_block)})
                continue

            if size >= 14:
                if text == 'Requests' and blocks and blocks[-1].get('kind') == 'heading':
                    blocks[-1]['text'] += ' Requests'
                    blocks[-1]['id'] = base.slugify(blocks[-1]['text'])
                else:
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
        ('API gateways', 'API Gateways'), ('API gateway', 'API Gateway'),
        ('Authorization Server', 'Authorization Server'), ('Resource Server', 'Resource Server'),
        ('Authorization code', 'Authorization Code'), ('Authorization Code', 'Authorization Code'),
        ('Client credentials', 'Client Credentials'), ('Device authorization grant', 'Device Authorization Grant'),
        ('Access Token', 'access token'), ('Refresh Token', 'refresh token'), ('Id Token', 'ID token'),
        ('Oauth 2.0', 'OAuth 2.0'), ('Oauth', 'OAuth'), ('Pkce', 'PKCE'), ('Dpop', 'DPoP'),
        ('MtlS', 'mTLS'), ('Jwks', 'JWKS'), ('Jwt', 'JWT'), ('Oidc', 'OIDC'),
        ('Par, Jar and Jarm', 'PAR, JAR, and JARM'), ('Rar', 'RAR'),
        ('Azure Api Management', 'Azure API Management'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('proof of possession', 'proof-of-possession'), ('sender restriction', 'sender constraint'),
        ('Observation laboratories', 'Observation labs'),
        ('Web applications, SPAs, native and BFF', 'Web applications, SPAs, native apps, and BFF'),
        ('endpoint token', 'token endpoint'), ('request token', 'token request'),
        ('Endpoint token', 'Token endpoint'),
        ('client id', 'client_id'), ('code verifier', 'code_verifier'),
        ('invalid request', 'invalid_request'), ('invalid client', 'invalid_client'),
        ('invalid grant', 'invalid_grant'), ('invalid token', 'invalid_token'),
        ('insufficient scope', 'insufficient_scope'), ('private key jwt', 'private_key_jwt'),
        ('client confidential', 'confidential client'),
        ('subscription and time', 'signature and time'), ('subscription, time', 'signature, time'),
        ('issuer membership', 'association with the issuer'),
        ('customer-supplied', 'client-supplied'),
        ('cross-validation', 'cross-cutting validation'),
        ('Play with a single controlled stream', 'Reproduce with a single controlled flow'),
        ('stateless affinity balancing', 'load balancing without session affinity'),
        ('audience by jump', 'audience per hop'),
        ('professional consultation', 'professional reference'),
    ],
    'es': [
        ('Oauth 2.0', 'OAuth 2.0'), ('Oauth', 'OAuth'), ('Pkce', 'PKCE'), ('Dpop', 'DPoP'),
        ('MtlS', 'mTLS'), ('Jwks', 'JWKS'), ('Jwt', 'JWT'), ('Oidc', 'OIDC'),
        ('Código de autorización', 'Authorization Code'), ('código de autorización', 'authorization code'),
        ('Credenciales de cliente', 'Client Credentials'), ('credenciales de cliente', 'client credentials'),
        ('Credenciales del cliente', 'Client Credentials'), ('credenciales del cliente', 'client credentials'),
        ('Credenciales del Cliente', 'Client Credentials'), ('Credenciales de Cliente', 'Client Credentials'),
        ('Concesión de autorización de dispositivo', 'Device Authorization Grant'),
        ('concesión de autorización de dispositivo', 'Device Authorization Grant'),
        ('token de acceso', 'access token'), ('tokens de acceso', 'access tokens'),
        ('Token de acceso', 'Access token'), ('Tokens de acceso', 'Access tokens'),
        ('token de actualización', 'refresh token'), ('tokens de actualización', 'refresh tokens'),
        ('Token de actualización', 'Refresh token'), ('Tokens de actualización', 'Refresh tokens'),
        ('token de identificación', 'ID token'), ('Token de identificación', 'ID token'),
        ('servidor de autorización', 'authorization server'), ('Servidor de autorización', 'Authorization server'),
        ('servidor de recursos', 'resource server'), ('Servidor de recursos', 'Resource server'),
        ('propietario del recurso', 'resource owner'), ('Propietario del recurso', 'Resource owner'),
        ('cliente confidencial', 'confidential client'), ('cliente público', 'public client'),
        ('Puertas de enlace API', 'API Gateways'), ('Puerta de enlace API', 'API Gateway'),
        ('puertas de enlace API', 'API Gateways'), ('puerta de enlace API', 'API Gateway'),
        ('Azure Api Management', 'Azure API Management'), ('Axway Api Gateway', 'Axway API Gateway'),
        ('metadatos', 'metadata'), ('Metadatos', 'Metadata'),
        ('puntos finales', 'endpoints'), ('punto final', 'endpoint'),
        ('Puntos finales', 'Endpoints'), ('Punto final', 'Endpoint'),
        ('alcances', 'scopes'), ('Alcances', 'Scopes'), ('audiencia', 'audience'),
        ('solución de problemas', 'troubleshooting'), ('Solución de problemas', 'Troubleshooting'),
        ('intercambio de tokens', 'Token Exchange'), ('Intercambio de tokens', 'Token Exchange'),
        ('Subvenciones', 'Grants'), ('subvenciones', 'grants'),
        ('Actualizar tokens', 'Refresh tokens'), ('actualizar tokens', 'refresh tokens'),
        ('Fichas opacas', 'Tokens opacos'), ('fichas opacas', 'tokens opacos'),
        ('Ficha opaca', 'Token opaco'), ('ficha opaca', 'token opaco'),
        ('Tokens restringidos por el remitente', 'Sender-constrained tokens'),
        ('tokens restringidos por el remitente', 'sender-constrained tokens'),
        ('Solicitudes de autorización enriquecida', 'Rich Authorization Requests'),
        ('solicitudes de autorización enriquecida', 'Rich Authorization Requests'),
        ('Protección de estado, nonce, emisor y confusión', 'State, nonce, issuer y protección contra mix-up'),
        ('Autenticación de confidential client', 'Autenticación de clientes confidenciales'),
        ('privilegios mínimos', 'least privilege'), ('Privilegios mínimos', 'Least privilege'),
        ('endurecimiento', 'hardening'), ('Endurecimiento', 'Hardening'),
        ('y en nombre de', 'y on-behalf-of'),
        ('En nombre de', 'On-behalf-of'), ('en nombre de', 'on-behalf-of'),
        ('fichas', 'tokens'), ('Fichas', 'Tokens'), ('ficha', 'token'), ('Ficha', 'Token'),
        ('Subvención', 'Grant'), ('subvención', 'grant'),
        ('concesiones', 'grants'), ('Concesiones', 'Grants'),
        ('token del terminal', 'token endpoint'), ('token del endpoint', 'token endpoint'),
        ('endpoint del token', 'token endpoint'), ('token de endpoint', 'token endpoint'),
        ('tipo_respuesta=código', 'response_type=code'), ('id_cliente', 'client_id'),
        ('uri_redireccionamiento', 'redirect_uri'), ('redirección_uri', 'redirect_uri'),
        ('otorgamiento_tipo=código_autorización', 'grant_type=authorization_code'),
        ('código_verificador', 'code_verifier'), ('código_desafío', 'code_challenge'),
        ('solicitud_inválida', 'invalid_request'), ('cliente_inválido', 'invalid_client'),
        ('concesión_inválida', 'invalid_grant'), ('Grant inválida', 'invalid_grant'),
        ('token_inválido', 'invalid_token'), ('alcance_insuficiente', 'insufficient_scope'),
        ('tipo de token', 'token type'), ('tipo de ficha', 'token type'),
        ('código_dispositivo', 'device_code'), ('código_usuario', 'user_code'),
        ('uri_verificación', 'verification_uri'), ('Authorization_pending', 'authorization_pending'),
        ('canal frontal', 'front-channel'), ('canal trasero', 'back-channel'), ('canal secundario', 'back-channel'),
        ('almacenamiento en caché', 'cache'), ('Almacenamiento en caché', 'Cache'),
        ('Pushed Authorization Requestss', 'Pushed Authorization Requests'),
        ('Las solicitudes de autorización enviadas', 'Pushed Authorization Requests'),
        ('La solicitud de autorización segura con JWT', 'JWT-Secured Authorization Request'),
        ('Rich Authorization Requestss', 'Rich Authorization Requests'),
        ('Solicitud de autorización enriquecida', 'Rich Authorization Request'),
        ('protección estatal', 'protección de state'), ('vinculación estatal', 'vínculo de state'),
        ('confusión del authorization server', 'mix-up de authorization server'),
        ('El emisor', 'El issuer'), ('el emisor', 'el issuer'), ('emisores', 'issuers'), ('emisor', 'issuer'),
        ('Los ámbitos', 'Los scopes'), ('los ámbitos', 'los scopes'), ('ámbitos', 'scopes'),
        ('El alcance', 'El scope'), ('el alcance', 'el scope'), ('alcance', 'scope'),
        ('reclamos', 'claims'), ('Reclamos', 'Claims'), ('reclamaciones', 'claims'), ('afirmaciones', 'claims'),
        ('la clave del niño', 'la clave indicada por kid'), ('niño desconocido', 'kid desconocido'),
        ('suscripción y el tiempo', 'firma y el tiempo'), ('suscripción, tiempo', 'firma, tiempo'),
        ('prueba de propiedad', 'proof-of-possession'), ('repetición', 'replay'), ('Repetición', 'Replay'),
        ('servidor nonce', 'nonce del servidor'),
        ('El actor afirma ayudar a grabar la cadena.', 'Los claims de actor ayudan a registrar la cadena.'),
        ('cada problema debe tratarse como una nueva decisión', 'cada salto debe tratarse como una nueva decisión'),
        ('puertas de enlace', 'API Gateways'), ('Puertas de enlace', 'API Gateways'),
        ('puerta de enlace', 'API Gateway'), ('Puerta de enlace', 'API Gateway'),
        ('validar-jwt', 'validate-jwt'), ('validar-azure-ad-token', 'validate-azure-ad-token'),
        ('identidad administrada por autenticación', 'authentication-managed-identity'),
        ('El portal valida', 'El gateway valida'),
        ('encabezado de Autorización', 'header Authorization'), ('encabezados', 'headers'), ('Encabezados', 'Headers'),
        ('cadena de consulta', 'query string'), ('control de caché', 'Cache-Control'),
        ('El referente, el historial y el análisis', 'Referer, el historial y analytics'),
        ('relleno de credenciales', 'credential stuffing'), ('inundación de solicitudes', 'request flooding'),
        ('códigos de usuario', 'user_code'), ('código de usuario', 'user_code'),
        ('tiempo de ejecución', 'runtime'), ('Grant_type', 'grant_type'),
        ('niño', 'kid'), ('Niño', 'Kid'),
        ('Solicitudes de autorización enviadas', 'Pushed Authorization Requests'),
        ('e Token Exchange', 'y Token Exchange'),
        ('redireccionamiento URI', 'redirect URI'),
        ('protección contra confusión', 'protección contra mix-up'),
        ('grants permitidas', 'grants permitidos'),
        ('client credentials', 'Client Credentials'),
        ('origen del reclamo', 'origen del claim'), ('El reclamo cnf', 'El claim cnf'),
        ('Las solicitudes de autorización deben tener gobernanza', 'Los claims de autorización deben tener gobernanza'),
        ('membresía del issuer', 'asociación al issuer'),
        ('La reproducción del token', 'El token replay'),
        ('confusión de AS', 'AS mix-up'),
        ('Concesión para intercambiar un token', 'Grant para intercambiar un token'),
        ('inquilino', 'tenant'), ('Inquilino', 'Tenant'),
        ('Juega con un único flujo controlado', 'Reproduzca con un único flujo controlado'),
        ('equilibrio de afinidad sin estado', 'balanceo sin afinidad de sesión'),
        ('ambientes de aprobación', 'ambientes de homologación'), ('entornos interno, externo y de aprobación', 'entornos interno, externo y de homologación'),
        ('Credenciales de contraseña de propietario de recursos', 'Resource Owner Password Credentials'),
        ('credenciales de contraseña de propietario de recursos', 'Resource Owner Password Credentials'),
        ('concesión implícita', 'Implicit Grant'), ('Concesión implícita', 'Implicit Grant'),
        ('prueba de posesión', 'proof-of-possession'), ('restricción del remitente', 'sender constraint'),
        ('cliente secreto', 'client_secret'), ('secreto del cliente', 'client_secret'),
        ('prácticas recomendadas actuales', 'Best Current Practices'),
    ],
}

PRESERVE_TERMS = {
    'Access token', 'Authorization code', 'Authorization server', 'Bearer token', 'Client',
    'Client Credentials', 'Confidential client', 'Device code', 'DPoP', 'Grant', 'Introspection',
    'JAR', 'JARM', 'JWT access token', 'PAR', 'PKCE', 'Public client', 'Refresh token',
    'Resource owner', 'Resource server', 'Scope', 'Sender-constrained token', 'State',
    'Token Exchange', 'OAuth 2.0', 'mTLS', 'OIDC', 'JWKS', 'RAR', 'BFF', 'API Gateway',
    'client_id', 'client_secret', 'private_key_jwt', 'client_secret_basic', 'client_secret_post',
    'code_verifier', 'code_challenge', 'code_challenge_method', 'S256', 'issuer', 'audience',
    'state', 'nonce', 'redirect URI', 'refresh token', 'access token', 'ID token', 'metadata',
}


def polish(value: str, locale: str) -> str:
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    value = value.replace('\u200b', '').replace('\u200c', '').replace('\ufeff', '')
    return re.sub(r'\s+_+\s*$', '', value)


def localize_code(value: str, locale: str) -> str:
    replacements = {
        'en': {
            'portal-pagamentos': 'payments-portal',
            'pagamentos.read': 'payments.read',
            'pagamentos.write': 'payments.write',
            'SEGREDO_ALEATORIO_DA_INSTANCIA': 'INSTANCE_RANDOM_SECRET',
            'liquidacoes.process': 'settlements.process',
            '<credencial-do-resource-server>': '<resource-server-credential>',
            'TOKEN_OPACO': 'OPAQUE_TOKEN',
            'api.pagamentos.example': 'api.payments.example',
            '"EXEMPLO"': '"EXAMPLE"',
            'api://pagamentos': 'api://payments',
            'realm="pagamentos"': 'realm="payments"',
        },
        'es': {
            'portal-pagamentos': 'portal-pagos',
            'pagamentos.read': 'pagos.read',
            'pagamentos.write': 'pagos.write',
            'SEGREDO_ALEATORIO_DA_INSTANCIA': 'SECRETO_ALEATORIO_DE_LA_INSTANCIA',
            'liquidacoes.process': 'liquidaciones.process',
            '<credencial-do-resource-server>': '<credencial-del-resource-server>',
            'TOKEN_OPACO': 'TOKEN_OPACO',
            'api.pagamentos.example': 'api.pagos.example',
            '"EXEMPLO"': '"EJEMPLO"',
            'api://pagamentos': 'api://pagos',
            'realm="pagamentos"': 'realm="pagos"',
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
    write_typescript(OUTPUTS['pt'], 'OAUTH_2_PT_BLOCKS', portuguese, 'pt')
    write_typescript(OUTPUTS['en'], 'OAUTH_2_EN_BLOCKS', english, 'en')
    write_typescript(OUTPUTS['es'], 'OAUTH_2_ES_BLOCKS', spanish, 'es')
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
