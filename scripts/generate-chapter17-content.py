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
    r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_17_OpenID_Connect_ID_Tokens_Sessoes_e_Federacao.pdf'
)

spec = importlib.util.spec_from_file_location('chapter16_generator', ROOT / 'scripts/generate-chapter16-content.py')
base = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(base)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/openid-connect-id-tokens-sessoes-federacao-pt/openid-connect-content.data.ts',
    'en': ROOT / 'src/app/learn/openid-connect-id-tokens-sessions-federation-en/openid-connect-content.data.ts',
    'es': ROOT / 'src/app/learn/openid-connect-id-tokens-sesiones-federacion-es/openid-connect-content.data.ts',
}

FIGURES = {
    1: ('figure-01-flow.svg', 'Authorization Code Flow OIDC separando front-channel, back-channel e criação da sessão local'),
    2: ('figure-02.svg', 'Estrutura de um ID Token com header, payload, assinatura e destinatário explícito'),
    3: ('figure-03.svg', 'Cadeia obrigatória de validação criptográfica, temporal e contextual do ID Token'),
    4: ('figure-04.svg', 'Sessões do OpenID Provider, Relying Party, tokens OAuth e estado da API'),
    5: ('figure-05.svg', 'Comparação entre RP-Initiated, Front-Channel, Back-Channel Logout e sessão local'),
    6: ('figure-06.svg', 'Cadeia de confiança federada entre Relying Party, metadata, chaves, políticas e OpenID Provider'),
}


def clean_table_cell(value: str | None) -> str:
    cleaned = base.clean_table_cell(value)
    replacements = {
        'client id': 'client_id',
        'post logout redirect uri': 'post_logout_redirect_uri',
        'id token hint': 'id_token_hint',
        'code verifier': 'code_verifier',
        'code challenge': 'code_challenge',
        'invalid state': 'invalid_state',
        'invalid grant': 'invalid_grant',
        'state match': 'state_match',
        'nonce match': 'nonce_match',
        'pkce result': 'pkce_result',
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
    validation = extracted_table(
        document, 5, 0,
        'Tabela 2 - A aceitação do ID Token depende de validações criptográficas e semânticas.',
    )
    append_continuation(validation, document, 6, 0)
    return {
        'artifacts': extracted_table(document, 3, 0, 'Tabela 1 - Cada artefato possui destinatário e finalidade próprios.'),
        'validation': validation,
        'correlation': extracted_table(document, 6, 1, 'Tabela 3 - Valores de correlação protegem relações distintas do fluxo.'),
        'subjects': extracted_table(document, 7, 0, 'Tabela 4 - O identificador de sujeito deve equilibrar estabilidade e privacidade.'),
        'assurance': extracted_table(document, 7, 1, 'Tabela 5 - Claims e parâmetros descrevem recência e contexto de autenticação.'),
        'logout': extracted_table(document, 9, 0, 'Tabela 6 - Logout precisa ser projetado como propagação de estado, não como um único redirect.'),
        'clients': extracted_table(document, 10, 0, 'Tabela 7 - A classificação do cliente determina controles possíveis, não apenas o nome do aplicativo.'),
        'architectures': extracted_table(document, 11, 0, 'Tabela 8 - O fluxo é semelhante, mas o local de execução muda o modelo de ameaça.'),
        'threats': extracted_table(document, 12, 0, 'Tabela 9 - OIDC seguro depende de vínculos entre transações, emissores, clientes e artefatos.'),
        'troubleshooting': extracted_table(document, 12, 1, 'Tabela 10 - Sintomas devem ser associados à etapa exata do fluxo.'),
        'glossary': extracted_table(document, 15, 0, 'Tabela 11 - Vocabulário essencial do capítulo.'),
        'decision': extracted_table(document, 15, 1, 'Tabela 12 - A escolha depende de plataforma, risco, experiência e capacidade do provedor.'),
    }


TABLE_REGIONS = {
    3: [(468, 614, 'artifacts')],
    5: [(726, 800, 'validation')],
    6: [(55, 136, 'validation'), (298, 403, 'correlation')],
    7: [(300, 389, 'subjects'), (540, 646, 'assurance')],
    9: [(394, 500, 'logout')],
    10: [(261, 359, 'clients')],
    11: [(300, 389, 'architectures')],
    12: [(241, 387, 'threats'), (550, 688, 'troubleshooting')],
    15: [(86, 502, 'glossary'), (538, 709, 'decision')],
}

FIGURE_REGIONS = {
    3: [(621, 755)],
    4: [(50, 70), (613, 781)],
    5: [(376, 547)],
    8: [(111, 284)],
    9: [(60, 241)],
    10: [(365, 533)],
}

CODE_REGIONS = {
    4: [(253, 332), (530, 601)],
    5: [(220, 312)],
    6: [(578, 656)],
    8: [(641, 680)],
    9: [(674, 745)],
    11: [(625, 727)],
    12: [(721, 784)],
}


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    all_tables = tables(document)
    blocks: list[dict] = [
        {'kind': 'subhead', 'text': 'Autenticação federada em uma aplicação corporativa'},
        {
            'kind': 'figure',
            'src': '/assets/learn/openid-connect-id-tokens-sessions-federation/pt/overview.svg',
            'alt': 'OpenID Connect conectando usuário, Relying Party, OpenID Provider, ID Token e aplicação protegida',
            'caption': 'Figura de abertura - OIDC comunica ao cliente um evento de autenticação verificável e interoperável.',
        },
        {'kind': 'subhead', 'text': 'Princípio central'},
        {'kind': 'paragraph', 'text': 'O ID Token prova ao cliente um evento de autenticação; o access token autoriza acesso ao resource server.'},
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
                        'src': f'/assets/learn/openid-connect-id-tokens-sessions-federation/pt/{filename}',
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
        ('Openid Connect', 'OpenID Connect'), ('Openid Provider', 'OpenID Provider'),
        ('Relying party', 'Relying Party'), ('End-user', 'End-User'),
        ('Id Token', 'ID Token'), ('Id Tokens', 'ID Tokens'), ('Userinfo', 'UserInfo'),
        ('Jwks', 'JWKS'), ('Oidc', 'OIDC'), ('Oauth', 'OAuth'), ('Pkce', 'PKCE'),
        ('Rp-initiated', 'RP-Initiated'), ('Front-channel Logout', 'Front-Channel Logout'),
        ('Back-channel Logout', 'Back-Channel Logout'), ('Single Sign-on', 'Single Sign-On'),
        ('Api Gateway', 'API Gateway'), ('Azure Api Management', 'Azure API Management'),
        ('client id', 'client_id'), ('code verifier', 'code_verifier'),
        ('code challenge', 'code_challenge'), ('post logout redirect uri', 'post_logout_redirect_uri'),
        ('id token hint', 'id_token_hint'), ('invalid state', 'invalid_state'),
        ('invalid grant', 'invalid_grant'), ('state match', 'state_match'),
        ('nonce match', 'nonce_match'), ('pkce result', 'pkce_result'),
        ('ID tokens', 'ID Tokens'), ('ID token', 'ID Token'),
        ('AuthorizationServer', 'Authorization Server'), ('PR cookie', 'RP cookie'),
        ("that's exact", 'exact iss'), ('Signature and more', 'Signature and alg'),
        ('subscription', 'signature'), ('auth time', 'auth_time'), ('max age', 'max_age'),
        ('c hash', 'c_hash'), ('at hash', 'at_hash'),
        ('Navigator from RP to OP', 'Browser from RP to OP'),
        ('Control your own PR', 'RP-controlled'), ('Type of customer', 'Client type'),
        ('Webserver/BFF', 'Web server / BFF'), ('webserver', 'Web server'),
        ('Customer backend', 'Client backend'), ('customer sectors', 'client sectors'),
        ('authorized customer', 'authorized client'), ('SubjectIdentifier', 'Subject Identifier'),
        ('Customer-initiated logout request', 'Client-initiated logout request'),
        ('Low risk spa', 'Low-risk SPA'), ('Higher risk spa', 'Higher-risk SPA'),
        ('Native App', 'Native app'), ('Confidential Daemon', 'Confidential daemon'),
        ('new test on the second provider', 'new proof at the second provider'),
        ('Two-sided reauthentication', 'Reauthentication with both identities'),
        ('Engine not propagated', 'Mechanism not propagated'),
        ('script minification', 'script reduction'), ('token logout', 'logout token'),
        ('redirect uri', 'redirect_uri'), ('invalid nonce', 'invalid_nonce'),
        ('Logout initiated by Relying Party', 'RP-Initiated Logout'),
        ('Process response without fixing expected OP', 'Process a response without fixing the expected OP'),
        ('Accept code without connection to attempt', 'Accept a code not bound to the attempt'),
        ('CSRF Login', 'Login CSRF'), ('strong state and transaction log', 'Strong state and transaction record'),
        ('state issued, received and correlated session', 'state issued and received, with a correlated session'),
        ('Time, redirect_uri and verifier hash', 'Time, redirect_uri, and verifier hash'),
        ('different sub by client sector', 'Different sub per client sector'),
        ('Observation laboratories', 'Observation labs'),
        ('professional consultation', 'professional reference'),
    ],
    'es': [
        ('Openid Connect', 'OpenID Connect'), ('Proveedor OpenID', 'OpenID Provider'),
        ('proveedor OpenID', 'OpenID Provider'), ('Parte de confianza', 'Relying Party'),
        ('parte de confianza', 'Relying Party'), ('Usuario final', 'End-User'),
        ('usuario final', 'End-User'), ('Token de identificación', 'ID Token'),
        ('Tokens de identificación', 'ID Tokens'), ('token de identificación', 'ID Token'),
        ('tokens de identificación', 'ID Tokens'), ('Información de usuario', 'UserInfo'),
        ('userinfo', 'UserInfo'), ('Jwks', 'JWKS'), ('Oidc', 'OIDC'), ('Oauth', 'OAuth'), ('Pkce', 'PKCE'),
        ('código de autorización', 'authorization code'), ('Código de autorización', 'Authorization Code'),
        ('token de acceso', 'access token'), ('tokens de acceso', 'access tokens'),
        ('Token de acceso', 'Access token'), ('Tokens de acceso', 'Access tokens'),
        ('token de actualización', 'refresh token'), ('tokens de actualización', 'refresh tokens'),
        ('emisor', 'issuer'), ('Emisor', 'Issuer'), ('audiencia', 'audience'), ('Audiencia', 'Audience'),
        ('reclamaciones', 'claims'), ('Reclamaciones', 'Claims'), ('reclamos', 'claims'), ('Reclamos', 'Claims'),
        ('ámbito', 'scope'), ('Ámbito', 'Scope'), ('ámbitos', 'scopes'), ('Ámbitos', 'Scopes'),
        ('sujeto público', 'public subject'), ('Sujeto público', 'Public subject'),
        ('sujeto por pares', 'pairwise subject'), ('Sujeto por pares', 'Pairwise subject'),
        ('Cierre de sesión iniciado por RP', 'RP-Initiated Logout'),
        ('cierre de sesión iniciado por RP', 'RP-Initiated Logout'),
        ('Cierre de sesión de canal frontal', 'Front-Channel Logout'),
        ('cierre de sesión de canal frontal', 'Front-Channel Logout'),
        ('Cierre de sesión de canal posterior', 'Back-Channel Logout'),
        ('cierre de sesión de canal posterior', 'Back-Channel Logout'),
        ('canal frontal', 'front-channel'), ('canal posterior', 'back-channel'),
        ('Inicio de sesión único', 'Single Sign-On'), ('inicio de sesión único', 'Single Sign-On'),
        ('Descubrimiento', 'Discovery'), ('descubrimiento', 'discovery'),
        ('metadatos', 'metadata'), ('Metadatos', 'Metadata'),
        ('Puerta de enlace API', 'API Gateway'), ('puerta de enlace API', 'API Gateway'),
        ('Azure Api Management', 'Azure API Management'),
        ('id_cliente', 'client_id'), ('verificador de código', 'code_verifier'),
        ('desafío de código', 'code_challenge'), ('uri de redirección posterior al cierre de sesión', 'post_logout_redirect_uri'),
        ('sugerencia de token de identificación', 'id_token_hint'),
        ('estado inválido', 'invalid_state'), ('concesión inválida', 'invalid_grant'),
        ('coincidencia de estado', 'state_match'), ('coincidencia de nonce', 'nonce_match'),
        ('resultado pkce', 'pkce_result'), ('niño', 'kid'), ('Niño', 'Kid'),
        ('solución de problemas', 'troubleshooting'), ('Solución de problemas', 'Troubleshooting'),
        ('inquilino', 'tenant'), ('Inquilino', 'Tenant'),
        ('ID tokens', 'ID Tokens'), ('ID token', 'ID Token'),
        ('respuesta de información de usuario', 'respuesta UserInfo'),
        ('Respuesta de información de usuario', 'Respuesta UserInfo'),
        ('información de usuario', 'UserInfo'), ('Información de usuario', 'UserInfo'),
        ('reivindicaciones', 'claims'), ('Reivindicaciones', 'Claims'),
        ('reclamo/parámetro', 'claim / parámetro'), ('reclamo', 'claim'), ('Reclamo', 'Claim'),
        ('parte que confía', 'Relying Party'), ('Parte que confía', 'Relying Party'),
        ('parte que confia', 'Relying Party'), ('Parte que confia', 'Relying Party'),
        ('públicos y por pares', 'public y pairwise'), ('Públicos y por pares', 'Public y pairwise'),
        ('sujetos públicos y por pares', 'public y pairwise subjects'),
        ('identificadores de sujetos por pares', 'pairwise subject identifiers'),
        ('Identificadores de sujeto: public y pairwise', 'Subject identifiers: public y pairwise'),
        ('Asunto público', 'Public subject'), ('asunto público', 'public subject'),
        ('modo de pares', 'modo pairwise'),
        ('paso a paso', 'step-up'), ('intensificación', 'step-up'),
        ('17.12 MFA, contexto de step-up y autenticación', '17.12 MFA, step-up y contexto de autenticación'),
        ('17.7 estado, nonce', '17.7 state, nonce'),
        ('estado, nonce, code_challenge', 'state, nonce, code_challenge'),
        ('el estado puede correlacionar', 'state puede correlacionar'),
        ('El estado puede correlacionar', 'State puede correlacionar'),
        ('estado fuerte', 'state fuerte'), ('Estado fuerte', 'State fuerte'),
        ('estado emitido, recibido y correlacionado', 'state emitido, recibido y correlacionado'),
        ('Estado emitido, recibido y correlacionado', 'State emitido, recibido y correlacionado'),
        ('PKCE, estado, nonce', 'PKCE, state, nonce'),
        ('respuesta_tipo', 'response_type'), ('cliente_id', 'client_id'),
        ('suscripción', 'firma'), ('Suscripción', 'Firma'),
        ('hora de autenticación', 'auth_time'), ('Hora de autenticación', 'auth_time'),
        ('edad máxima', 'max_age'), ('Edad máxima', 'max_age'),
        ('c hash', 'c_hash'), ('en picadillo', 'at_hash'),
        ('aviso', 'prompt'), ('Aviso', 'Prompt'),
        ('Endpoint del token', 'Token endpoint'), ('galleta de OP', 'Cookie del OP'),
        ('galleta de relaciones públicas', 'Cookie del RP'), ('Solicitud de cliente', 'Aplicación cliente'),
        ('eso es exacto', 'iss exacto'), ('Firma y más', 'Firma y alg'),
        ('hora de exp/iat/autenticación', 'exp / iat / auth_time'),
        ('Reproducir fuera de la ventana', 'Replay fuera de la ventana'),
        ('que une', 'Qué vincula'), ('devolución de llamada', 'callback'),
        ('En la callback, antes de procesar el código o el error', 'En el callback, antes de procesar code o error'),
        ('Solicitud de autorización y solicitud de token', 'Authorization request y token request'),
        ('Navegador de RP a OP', 'Navegador del RP al OP'),
        ('Iniciado por RP', 'RP-Initiated'), ('Canal frontal', 'Front-Channel'),
        ('Canal trasero', 'Back-Channel'), ('Controla tus propias relaciones públicas', 'Control del propio RP'),
        ('No se propaga a todos los RP', 'No se propaga por sí solo a todos los RPs'),
        ('Requiere criterio de valoración', 'Exige endpoint'),
        ('tipo de cliente', 'Tipo de cliente'), ('Servidor web/mejor amiga', 'Web server / BFF'),
        ('Código + PKCE', 'Code + PKCE'), ('Código caducado', 'Code expirado'),
        ('código sin conexión para intentar', 'code sin vínculo con la tentativa'),
        ('código o el error', 'code o error'), ('código y respuesta', 'code y respuesta'),
        ('demonio confidencial', 'Daemon confidencial'),
        ('¿Dónde están las tokens?', '¿Dónde están los tokens?'),
        ('servidor web', 'Web server'), ('Servicio de atención al cliente', 'Backend del cliente'),
        ('Confusión de issuers', 'Issuer mix-up'), ('inyección de código', 'Code injection'),
        ('Iniciar sesión', 'Login CSRF'), ('Registro de transacciones y state sólido', 'state fuerte y registro de transacción'),
        ('minificación de scripts', 'reducción de scripts'),
        ('Vinculación de cuenta incorrecta', 'Account linking indebido'),
        ('Enlace por correo electrónico coincidente', 'Vincular por coincidencia de e-mail'),
        ('Reautenticación bilateral', 'Reautenticación con ambas identidades'),
        ('chico nuevo', 'kid nuevo'), ('Encabezado de autorización', 'Header Authorization'),
        ('El motor no se propagó', 'El mecanismo no se propagó'),
        ('registros de sid/sub', 'logs de sid/sub'),
        ('URI de redireccionamiento posterior al cierre de sesión', 'post_logout_redirect_uri'),
        ('URI de redireccionamiento', 'redirect URIs'),
        ('uri de redirección', 'redirect_uri'),
        ('clientes sensibles', 'clientes confidenciales'),
        ('encuestas estatales', 'polling de estado'), ('gestión de sesiones', 'Session Management'),
        ('política de arrendamiento', 'política de tenancy'), ('arrendamiento', 'tenancy'),
        ('Lista de verificación de conexión OpenID', 'Checklist de OpenID Connect'),
        ('sub token de ID', 'sub del ID Token'), ('sub claim de UserInfo', 'claim sub de UserInfo'),
        ('sub claim', 'claim sub'), ('Eso no puede ser absurdamente distante', 'iat no puede estar absurdamente distante'),
        ('Token de ID', 'ID Token'), ('public client.', 'cliente público.'),
        ('Balneario de bajo riesgo', 'SPA de bajo riesgo'), ('Spa de mayor riesgo', 'SPA de mayor riesgo'),
        ('aplicación/enlace universal', 'app link / universal link'),
        ('rotación de actualización', 'rotación de refresh tokens'),
        ('Operación intensificada', 'Operación con step-up'),
        ('solicitud de autorización con garantía', 'authorization request con assurance'),
        ('iniciada por RP', 'RP-Initiated'), ('Federación OpenID', 'OpenID Federation'),
        ('anclajes de confianza', 'trust anchors'),
        ('token de ID', 'ID Token'), ('Token de ID', 'ID Token'),
        ('sub ID Token', 'sub del ID Token'), ('claims de ID Token', 'claims del ID Token'),
        ('Validación del ID Token segura', 'Validación segura del ID Token'),
        ('17.14 Cierre de sesión iniciado por la Relying Party', '17.14 RP-Initiated Logout'),
        ('17.15 Cierre de sesión del front-channel y del back-channel', '17.15 Front-Channel y Back-Channel Logout'),
        ('Multitenant', 'Multi-tenant'), ('multitenant', 'multi-tenant'),
        ('El estado vincula', 'state vincula'), ('el estado vincula', 'state vincula'),
        ('estado divergente', 'state divergente'), ('Estado divergente', 'State divergente'),
        ('Registro de transacciones y estado sólido', 'state fuerte y registro de transacción'),
        ('caché infantil global', 'cache global por kid'),
        ('proveedor de OpenID', 'OpenID Provider'), ('Proveedor de OpenID', 'OpenID Provider'),
        ('Usuario de conexión de OpenID Connect, Relying Party, OpenID Provider, ID Token y aplicación protegida', 'OpenID Connect conectando usuario, Relying Party, OpenID Provider, ID Token y aplicación protegida'),
        ('Obtén nuevos tokens', 'Obtener nuevos tokens'),
        ('client_id parte autorizada presente', 'client_id presente y parte autorizada'),
        ('max_age de autenticación aceptable', 'Edad máxima de autenticación aceptable'),
        ('ninguno, iniciar sesión, dar consentimiento o seleccionar cuenta', 'none, login, consent o select_account'),
        ('Navegador de OP a RP', 'Navegador del OP a los RPs'),
        ('Respuesta del proceso sin corregir el OP esperado', 'Procesar respuesta sin fijar el OP esperado'),
        ('Hora, redirect_uri y hash del verificador', 'Tiempo, redirect_uri y hash del verifier'),
        ('JWT pretendía que el RP comunicara el evento de autenticación', 'JWT destinado al RP para comunicar el evento de autenticación'),
        ('diferentes sub por sector de clientes', 'sub diferente por sector de clientes'),
        ('confía en la autenticación OP', 'confía en la autenticación del OP'),
        ('El subtítulo UserInfo se compara con el subtítulo ID Token', 'El claim sub de UserInfo se compara con el sub del ID Token'),
        ('compare iss, aud, nonce y time', 'compare iss, aud, nonce y tiempo'),
        ('redirect URIs.', 'redirect URI.'), ('al redirect URIs', 'al redirect URI'),
        ('un redirect URIs incorrecto', 'un redirect URI incorrecto'),
        ('redirect URIs normalizado', 'redirect URI normalizada'),
        ('route_uri', 'redirect_uri'), ('omisión de código', 'secuestro del authorization code'),
        ('El código pasa', 'El code pasa'), ('el código al token endpoint', 'el code al token endpoint'),
        ('el código a la instancia', 'el code a la instancia'), ('intercepta el código', 'intercepta el code'),
        ('reutilización de código', 'reutilización de code'), ('código caducado', 'code expirado'),
        ('En un flujo de código puro', 'En un flujo de code puro'),
        ('El cliente debe compararlo con precisión con el issuer esperado', 'El cliente debe comparar iss exactamente con el issuer esperado'),
        ('reproducción del token', 'token replay'),
        ('token de portador', 'bearer token'), ('mecanismo restringido por el remitente', 'mecanismo sender-constrained'),
        ('registros, seguimientos', 'logs, traces'),
        ('contexto de autenticación y actualidad', 'recencia y contexto de autenticación'),
        ('Autenticación activa instantánea', 'Instante de la autenticación activa'),
        ('Principio de aseguramiento', 'Principio de assurance'),
        ('la política, el mensaje y max_age', 'la política, prompt y max_age'),
        ('La Session Management y las polling de estado', 'Session Management y el polling de estado'),
        ('En caso de falla infantil', 'Ante un kid desconocido'),
        ('la incorporación, la propiedad, la garantía', 'onboarding, ownership y assurance'),
        ('aplicaciones, enlaces universales', 'app links, universal links'),
        ('El estado por transacción', 'state por transacción'),
        ('Aceptar cierre de sesión de token antiguo o repetido', 'Aceptar logout token repetido o antiguo'),
        ('ID de correlación', 'correlation ID'), ('tipo de respuesta', 'response_type'),
        ('códigos de autorización', 'authorization codes'),
        ('Afirmaciones como acr', 'Claims como acr'),
        ('requisitos de seguridad antes de crear la sesión', 'requisitos de assurance antes de crear la sesión'),
        ('tokens, códigos, secretos, verificadores', 'tokens, codes, secrets, verifiers'),
        ('accesorios firmados', 'fixtures firmadas'),
        ('Compare el RP-Initiated Logout, en el front-channel y en el back-channel', 'Compare RP-Initiated, Front-Channel y Back-Channel Logout'),
        ('notificaciones de discovery', 'discovery'),
        ('garantía', 'assurance'), ('Garantía', 'Assurance'),
        ('17.13 Sesiones en el OP, en el RP y antes de las API', '17.13 Sesiones en el OP, en el RP y frente a las APIs'),
        ('"evidencia"', '"Evidencia"'), ('"ventaja"', '"Ventaja"'),
        ('"canal"', '"Canal"'), ('"control principal"', '"Control principal"'),
        ('La inyección de authorization code ocurre cuando un código obtenido en otra transacción se inserta en la callback del cliente. Las reglas estatales, PKCE, nonce, validación del issuer y confusión reducen el riesgo. El registro abierto o flexible de redirect URIs permite omitir el código. XSS puede robar tokens en SPA, mientras que CSRF puede activar devoluciones de llamada o cerrar sesión en un contexto inapropiado.',
         'La inyección de authorization code ocurre cuando un code obtenido en otra transacción se inserta en el callback del cliente. state, PKCE, nonce, la validación del issuer y las reglas contra mix-up reducen el riesgo. El registro abierto o flexible de redirect URIs permite el secuestro del code. XSS puede robar tokens en una SPA, mientras que CSRF puede activar callbacks o logout en un contexto indebido.'),
    ],
}

PRESERVE_TERMS = base.PRESERVE_TERMS | {
    'OpenID Connect', 'OIDC', 'OpenID Provider', 'Relying Party', 'End-User', 'ID Token',
    'UserInfo', 'Single Sign-On', 'RP-Initiated Logout', 'Front-Channel Logout',
    'Back-Channel Logout', 'Discovery', 'JWKS', 'OpenID Federation', 'issuer', 'iss',
    'sub', 'aud', 'azp', 'exp', 'iat', 'nonce', 'auth_time', 'acr', 'amr', 'max_age',
    'prompt', 'c_hash', 'at_hash', 'sid', 'jti', 'public subject', 'pairwise subject',
    'client_id', 'post_logout_redirect_uri', 'id_token_hint', 'invalid_state',
    'invalid_grant', 'state_match', 'nonce_match', 'pkce_result', 'front-channel', 'back-channel',
}


def polish(value: str, locale: str) -> str:
    value = base.polish(value, locale)
    for before, after in REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value.replace('\u200b', '').replace('\u200c', '').replace('\ufeff', '')


def localize_code(value: str, locale: str) -> str:
    value = base.localize_code(value, locale)
    replacements = {
        'en': {
            'Registro seguro de diagnóstico:': 'Secure diagnostic logging:',
            '- transaction_id e correlation_id': '- transaction_id and correlation_id',
            '- issuer esperado e client_id': '- expected issuer and client_id',
            '- redirect_uri normalizada': '- normalized redirect_uri',
            '- state_match, nonce_match e pkce_result': '- state_match, nonce_match, and pkce_result',
            '- alg, kid, aud, azp e tempos sem token bruto': '- alg, kid, aud, azp, and timestamps without the raw token',
            '- sessão criada, renovada ou invalidada': '- session created, renewed, or invalidated',
            '- código de erro do OP e etapa que respondeu': '- OP error code and responding stage',
        },
        'es': {
            'Registro seguro de diagnóstico:': 'Registro seguro de diagnóstico:',
            '- transaction_id e correlation_id': '- transaction_id y correlation_id',
            '- issuer esperado e client_id': '- issuer esperado y client_id',
            '- redirect_uri normalizada': '- redirect_uri normalizada',
            '- state_match, nonce_match e pkce_result': '- state_match, nonce_match y pkce_result',
            '- alg, kid, aud, azp e tempos sem token bruto': '- alg, kid, aud, azp y tiempos sin el token bruto',
            '- sessão criada, renovada ou invalidada': '- sesión creada, renovada o invalidada',
            '- código de erro do OP e etapa que respondeu': '- código de error del OP y etapa que respondió',
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
    base.write_typescript(OUTPUTS['pt'], 'OPENID_CONNECT_PT_BLOCKS', portuguese, 'pt')
    base.write_typescript(OUTPUTS['en'], 'OPENID_CONNECT_EN_BLOCKS', english, 'en')
    base.write_typescript(OUTPUTS['es'], 'OPENID_CONNECT_ES_BLOCKS', spanish, 'es')
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
