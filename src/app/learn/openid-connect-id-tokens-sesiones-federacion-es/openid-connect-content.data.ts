import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OPENID_CONNECT_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Autenticación federada en una aplicación empresarial"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/overview.svg",
    "alt": "OpenID Connect conectando usuario, Relying Party, OpenID Provider, ID Token y aplicación protegida",
    "caption": "Figura de apertura: OIDC comunica un evento de autenticación verificable e interoperable al cliente."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El ID Token demuestra un evento de autenticación para el cliente; El access token autoriza el acceso al resource server."
  },
  {
    "kind": "paragraph",
    "text": "Edición en profundidad: material de estudio y consulta profesional."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "El capítulo anterior profundizó en OAuth 2.0 como marco de autorización delegada. OAuth permite a un cliente obtener autoridad limitada para acceder a un resource server, pero, por sí solo, no define una forma estandarizada de comunicar al cliente que un usuario ha sido autenticado. OpenID Connect agrega esta capa de identidad mediante el uso de endpoints y mecanismos de OAuth, introduciendo el scope de openid, el ID Token, las claims estandarizadas, la UserInfo, el discovery y las reglas de validación específicas."
  },
  {
    "kind": "paragraph",
    "text": "Esta distinción es decisiva en las arquitecturas empresariales. El access token está destinado a la API; el ID Token está destinado al cliente que inició la autenticación. Una aplicación web puede validar el ID Token y crear su propia sesión, mientras presenta access tokens separados a API Gateway. Reenviar el ID Token al backend como si fuera una credencial API confunde a los destinatarios, aumenta la exposición de los datos personales y crea validaciones incorrectas."
  },
  {
    "kind": "paragraph",
    "text": "OIDC también organiza cuestiones que van más allá del primer inicio de sesión: niveles de autenticación, MFA, step-up, identidad federada, consentimiento de claims, identificadores de sujetos, discovery de metadata, rotación de claves, sesiones distribuidas y cierre de sesión. En entornos con múltiples tenants y proveedores, la seguridad depende de asociar cada token con el issuer correcto y evitar que los metadata o claves de un dominio se apliquen a otro."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo detalla el flujo de authorization code con PKCE desde una perspectiva OIDC, la anatomía y validación del ID Token, nonce, state, acr, amr, auth_time, UserInfo, identificadores de sujeto, sesiones y mecanismos de cierre de sesión. También relaciona conceptos con aplicaciones web, SPA, BFF, aplicaciones nativas, Axway API Gateway, Microsoft Entra y Azure API Management."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "En cada flujo, etiquete cuatro destinatarios: navegador, cliente OIDC, OpenID Provider y API. Luego, asocie cada artefacto con el destinatario correcto: authorization code, ID Token, access token, refresh token, cookie de sesión y token de cierre de sesión."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Objetivos de aprendizaje"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por qué OpenID Connect es una capa de identidad construida sobre OAuth 2.0.",
      "Diferenciar OpenID Provider, Relying Party, End-User, authorization server y resource server.",
      "Describa el flujo del authorization code con scope openid, state, nonce y PKCE.",
      "Interprete y valide ID Tokens, incluidos iss, sub, aud, azp, exp, iat, nonce, auth_time, acr y amr.",
      "Distinga ID Token, access token, refresh token, authorization code y respuesta UserInfo.",
      "Comprender los scopes y claims de identidad solicitados, esenciales y voluntarios.",
      "Diseñe identificadores public y pairwise sin utilizar el correo electrónico como clave inmutable.",
      "Relacione acr, amr, max_age y request con MFA, políticas de incremento y riesgo.",
      "Distinguir sesión en el OpenID Provider, sesión en el cliente y autorización ante API.",
      "Compare RP-Initiated, Front-Channel y Back-Channel Logout.",
      "Utilice discovery y JWKS con validación de issuers, algoritmos y rotación de claves.",
      "Diagnosticar fallas OIDC en aplicaciones, API Gateways y entornos federados."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estructura del capítulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "17.1 OIDC como capa de identidad sobre OAuth 2.0",
      "17.2 Roles, endpoints y artefactos",
      "17.3 La solicitud de autenticación y el scope de openid",
      "17.4 Flujo de authorization code con PKCE",
      "17.5 ID Token: finalidad, formato y claims",
      "17.6 Validación segura del ID Token",
      "17.7 state, nonce, PKCE, c_hash y at_hash",
      "17.8 Claims y scopes de identidad",
      "17.9 Endpoint de UserInfo",
      "17.10 Subject identifiers: public y pairwise",
      "17.11 acr, amr, auth_time, max_age y prompt",
      "17.12 MFA, step-up y contexto de autenticación",
      "17.13 Sesiones en el OP, en el RP y frente a las APIs",
      "17.14 RP-Initiated Logout",
      "17.15 Front-Channel y Back-Channel Logout",
      "17.16 Discovery, metadata y JWKS",
      "17.17 Registro de clientes y redirect URIs",
      "17.18 Federación de identidades y cadena de confianza",
      "17.19 Multi-tenant, múltiples issuers y vinculación de cuentas",
      "17.20 Aplicaciones web, SPA, BFF y aplicaciones nativas",
      "17.21 OIDC en API Gateways, Axway y Azure",
      "17.22 Amenazas y hardening",
      "17.23 Troubleshooting",
      "17.24 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.1 OIDC como capa de identidad sobre OAuth 2.0",
    "id": "17-1-oidc-como-capa-de-identidad-sobre-oauth-2-0"
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect define una capa de identidad que permite al cliente verificar la identidad del usuario basándose en la autenticación realizada por un authorization server que también actúa como OpenID Provider. El protocolo reutiliza el endpoint de autorización, el token endpoint y las grants de OAuth 2.0, pero agrega semántica de autenticación y un conjunto de mensajes y validaciones propias."
  },
  {
    "kind": "paragraph",
    "text": "La activación de OIDC se produce cuando la solicitud contiene el scope de openid. Sin este valor, la transacción sigue siendo OAuth y el cliente no debe asumir que recibirá un ID Token. Otros scopes, como perfil, correo electrónico, dirección y teléfono, solicitan conjuntos estandarizados de claims, pero no reemplazan el scope de openid."
  },
  {
    "kind": "paragraph",
    "text": "El principal resultado de la autenticación es el ID Token, una afirmación de seguridad sobre el evento de autenticación y el identificador del usuario en el contexto de ese issuer. El cliente valida esta afirmación y decide crear o actualizar una sesión local. El ID Token no es una búsqueda de directorio en tiempo real y no garantiza que todos los atributos permanezcan actualizados durante toda la sesión."
  },
  {
    "kind": "subhead",
    "text": "Distinción esencial"
  },
  {
    "kind": "paragraph",
    "text": "OAuth responde \"¿qué autoridad se le dio a este cliente para acceder a un recurso?\". OIDC responde \"¿qué usuario fue autenticado para este cliente, por qué issuer y bajo qué condiciones?\". Un sistema puede utilizar ambos en la misma transacción sin confundir sus tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.2 Roles, endpoints y artefactos",
    "id": "17-2-roles-endpoints-y-artefactos"
  },
  {
    "kind": "paragraph",
    "text": "El Usuario Final es la persona autenticada. La Relying Party, o RP, es el cliente OIDC que solicita y consume autenticación. El OpenID Provider, u OP, autentica al usuario y emite ID Tokens. En muchas plataformas, el mismo producto desempeña las funciones de OP y authorization server, pero el análisis conceptual continúa separando la autenticación para el cliente y la autorización para las API."
  },
  {
    "kind": "paragraph",
    "text": "El endpoint de autorización interactúa con el navegador para iniciar sesión, dar consentimiento y regresar al redirect URI. El token endpoint recibe el authorization code a través del back-channel y devuelve los tokens. El endpoint UserInfo es un recurso protegido al que se accede con un access token. El endpoint de discovery publica metadata y jwks_uri hace referencia a las claves públicas utilizadas en la verificación de firmas."
  },
  {
    "kind": "paragraph",
    "text": "Los artefactos tienen diferentes ciclos de vida. El authorization code es corto y de un solo uso. El ID Token describe la autenticación para el RP. El access token representa autoridad ante un resource server. El refresh token le permite obtener nuevos tokens según la política. Las cookies mantienen sesiones en el OP o RP y no deben tratarse como equivalentes a tokens."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Cada artefacto tiene su propio destinatario y propósito.",
    "headers": [
      "Elemento",
      "Destinatario principal",
      "Propósito"
    ],
    "rows": [
      [
        "Authorization code",
        "Token endpoint",
        "Representa temporalmente la autorización y vincula el front-channel al back-channel."
      ],
      [
        "ID Token",
        "Relying Party",
        "Comunicar el contexto de identidad y autenticación al cliente."
      ],
      [
        "Access token",
        "Resource server/API",
        "Autorizar operaciones protegidas."
      ],
      [
        "Refresh token",
        "Authorization server",
        "Obtener nuevos tokens sin repetir toda la interacción."
      ],
      [
        "Respuesta UserInfo",
        "Relying Party",
        "Entregar claims autorizadas sobre el usuario."
      ],
      [
        "Cookie del OP",
        "OpenID Provider",
        "Mantener la sesión de autenticación federada."
      ],
      [
        "Cookie del RP",
        "Aplicación cliente",
        "Mantener la sesión de la aplicación local."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-01-flow.svg",
    "alt": "Flujo de authorization code OIDC que separa la creación de sesiones de front-channel, back-channel y local",
    "caption": "Figura 1: El code pasa a través del navegador, pero los tokens se obtienen del token endpoint a través de un canal directo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.3 Solicitud de autenticación y scope openid",
    "id": "17-3-solicitud-de-autenticacion-y-scope-openid"
  },
  {
    "kind": "paragraph",
    "text": "La solicitud OIDC es una solicitud de autorización OAuth más requisitos de identidad. Los parámetros habituales incluyen client_id, response_type, redirect_uri, scope, state, nonce, code_challenge y code_challenge_method. Otros parámetros, como request, max_age, login_hint, ui_locales y acr_values, impulsan la experiencia deseada o el nivel de autenticación, siempre que sean compatibles con el OP."
  },
  {
    "kind": "paragraph",
    "text": "El redirect_uri debe coincidir con un valor registrado previamente. Las comparaciones flexibles, los comodines amplios y las redirecciones derivadas de headers externos aumentan el riesgo de secuestro del authorization code y phishing. El cliente debe generar state, nonce y code_verifier con suficiente entropía para cada intento y asociarlos con la transacción local antes de redirigir el navegador."
  },
  {
    "kind": "paragraph",
    "text": "El parámetro de scope debe contener openid. Los scopes adicionales indican grupos de claims que el cliente solicita, pero el OP aún aplica la política, el consentimiento y la minimización. Solicitar el perfil no garantiza que todas las claims del conjunto se devolverán en el ID Token; algunos pueden aparecer en UserInfo o ser omitidos."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: Solicitud de autorización"
  },
  {
    "kind": "code",
    "text": "GET /authorize?\n  response_type=code\n  &client_id=portal-web\n  &redirect_uri=https%3A%2F%2Fportal.example%2Fcallback\n  &scope=openid%20profile%20email\n  &state=Qm9uZGluZy1mbG93LTE\n  &nonce=bm9uY2UtZm9yLWlkLXRva2Vu\n  &code_challenge=9Fq...\n  &code_challenge_method=S256 HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.4 Flujo de authorization code con PKCE",
    "id": "17-4-flujo-de-authorization-code-con-pkce"
  },
  {
    "kind": "paragraph",
    "text": "En el flujo recomendado, el navegador se redirige al endpoint de autorización, el OP autentica al usuario y devuelve un authorization code al redirect URI del cliente. El cliente valida el estado y envía el code al token endpoint junto al code_verifier. Un confidential client también se autentica en el token endpoint utilizando un mecanismo compatible, preferiblemente una credencial asimétrica o un método apropiado para el entorno."
  },
  {
    "kind": "paragraph",
    "text": "PKCE vincula el code a la instancia que inició la transacción. El code_challenge se envió en la solicitud inicial y el code_verifier solo se revela en el intercambio. Incluso si un atacante intercepta el code, no puede intercambiarlo sin el verificador. PKCE no reemplaza el estado ni el nonce: cada valor protege una relación diferente."
  },
  {
    "kind": "paragraph",
    "text": "La respuesta del token endpoint puede contener un ID Token, un access token, un token_type, expires_in y, según la política, un refresh token. El cliente no debe crear una sesión solo porque recibió HTTP 200. Primero valida la respuesta, el ID Token, el issuer, la audience, la firma, la ventana de tiempo, el nonce y otros requisitos de flujo."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: cambiar el authorization code"
  },
  {
    "kind": "code",
    "text": "POST /token HTTP/1.1\nHost: id.example\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code&\ncode=SplxlOBeZQQYbYS6WxSbIA&\nredirect_uri=https%3A%2F%2Fportal.example%2Fcallback&\nclient_id=portal-web&\ncode_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-02.svg",
    "alt": "Estructura de un ID Token con encabezado, carga útil, firma y destinatario explícito",
    "caption": "Figura 2: El ID Token es una afirmación destinada al cliente OIDC, no una credencial universal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.5 ID Token: finalidad, formato y claims",
    "id": "17-5-id-token-finalidad-formato-y-claims"
  },
  {
    "kind": "paragraph",
    "text": "El ID Token es un JWT que contiene claims sobre la autenticación del usuario. Está firmado por el OP y, en escenarios específicos, también puede cifrarse para el cliente. La firma proporciona integridad y autenticación del origen; no ofrece confidencialidad. Cualquier claim confidencial incluido en un JWT firmado únicamente puede ser leído por quien obtenga el valor."
  },
  {
    "kind": "paragraph",
    "text": "Los claims fundamentales incluyen iss, que identifica al issuer; sub, que identifica al usuario localmente ante el issuer; aud, que identifica al cliente destinatario; exp e iat, que definen la validez y la emisión. Dependiendo del flujo y la solicitud, aparecen nonce, auth_time, acr, amr, azp, at_hash y c_hash."
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe utilizar la combinación iss y sub como clave externa estable. El correo electrónico, el teléfono y el nombre son atributos modificables y pueden reciclarse. En arquitecturas multi-tenant, el tenant total o issuer también participa en la identidad; usar solo sub sin contexto puede producir colisiones entre remitentes."
  },
  {
    "kind": "subhead",
    "text": "Carga útil ilustrativa del ID Token"
  },
  {
    "kind": "code",
    "text": "{\n  \"iss\": \"https://id.example\",\n  \"sub\": \"248289761001\",\n  \"aud\": \"portal-web\",\n  \"exp\": 1784127000,\n  \"iat\": 1784126100,\n  \"auth_time\": 1784126000,\n  \"nonce\": \"bm9uY2UtZm9yLWlkLXRva2Vu\",\n  \"acr\": \"urn:example:loa:2\",\n  \"amr\": [\"pwd\", \"otp\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "El ID Token no es un access token"
  },
  {
    "kind": "paragraph",
    "text": "Incluso cuando ambos son JWT y comparten algunas claims, sus destinatarios y su semántica son diferentes. La API debe validar el access token emitido a su audience; el cliente valida el ID Token emitido a su client_id."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-03.svg",
    "alt": "Cadena obligatoria de validación de ID Tokens criptográficos, temporales y contextuales.",
    "caption": "Figura 3: La verificación criptográfica es solo un paso de la validación contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.6 Validación segura del ID Token",
    "id": "17-6-validacion-segura-del-id-token"
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe comparar iss exactamente con el issuer esperado. Luego selecciona una clave confiable para verificar la firma y restringe los algoritmos a aquellos que se aceptan explícitamente. El valor alg del token por sí solo no puede decidir la política. El kid ayuda con la selección de claves, pero no reemplaza la confianza en el jwks_uri asociado con el issuer."
  },
  {
    "kind": "paragraph",
    "text": "El aud del claim debe contener el client_id del RP. Cuando hay múltiples audiences, azp identifica a la parte autorizada y debe ser evaluado de acuerdo con las reglas del protocolo. exp debe estar en el futuro dentro de la tolerancia del reloj; iat no puede estar absurdamente distante; auth_time se valida cuando la solicitud requiere una max_age de autenticación."
  },
  {
    "kind": "paragraph",
    "text": "Si se envió nonce, el token debe contener el mismo valor asociado con el intento local. Las declaraciones de seguridad como acr y amr solo deben usarse cuando su semántica esté documentada y el issuer confíe en ella. La presencia de una cadena similar a “mfa” no crea, en sí misma, un nivel de seguridad interoperable."
  },
  {
    "kind": "paragraph",
    "text": "Las bibliotecas OIDC maduras realizan la mayoría de las comprobaciones, pero aún requieren la configuración correcta del issuer, el ID del cliente, los algoritmos, los redirect URIs y el almacenamiento de estado. Decodificar el JWT manualmente y observar las claims no equivale a validarlo."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: La aceptación del ID Token depende de las validaciones criptográficas y semánticas.",
    "headers": [
      "Verificación",
      "Fracaso evitado",
      "Evidencia"
    ],
    "rows": [
      [
        "iss exacto",
        "Aceptar token de un issuer no autorizado",
        "Issuer obtenido de una configuración confiable."
      ],
      [
        "Firma y alg",
        "Token manipulado o algoritmo inadecuado",
        "JWK correspondiente y lista de algoritmos permitidos."
      ],
      [
        "aud/azp",
        "Token emitido a otro cliente",
        "client_id presente y parte autorizada y consistente."
      ],
      [
        "exp / iat / auth_time",
        "Replay fuera de la ventana o sesión anterior",
        "Reloj sincronizado y tolerancia limitada."
      ],
      [
        "nonce",
        "Reutilización o reemplazo de respuestas de autenticación",
        "Valor por transacción almacenado en el cliente."
      ],
      [
        "acr/amr",
        "Aceptar la autenticación por debajo del requisito",
        "Semántica definida por el issuer y política local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.7 state, nonce, PKCE, c_hash y at_hash",
    "id": "17-7-state-nonce-pkce-c-hash-y-at-hash"
  },
  {
    "kind": "paragraph",
    "text": "state vincula la respuesta de autorización a la transacción iniciada por el cliente y ayuda a proteger contra CSRF y la inyección de respuesta. nonce vincula el ID Token a la solicitud de autenticación y reduce la token replay. PKCE vincula el intercambio del authorization code a la instancia que produjo el code_challenge. Los tres valores pueden coexistir y no deben reutilizarse entre intentos."
  },
  {
    "kind": "paragraph",
    "text": "En los tipos de respuesta que devuelven artefactos a través del endpoint de autorización, c_hash y at_hash pueden vincular, respectivamente, el authorization code y el access token al ID Token. La validación utiliza parte del hash calculado con un algoritmo relacionado con la firma. En un flujo de code puro, es posible que la biblioteca no requiera ambos, pero el implementador debe seguir las reglas del response_type realmente utilizado."
  },
  {
    "kind": "paragraph",
    "text": "Almacenar estos valores solo en variables globales o en localStorage sin vincularse a un intento permite colisiones y ataques por pestañas concurrentes. El cliente debe mantener un registro de transacciones con issuer, client_id, redirect_uri, estado, nonce, code_verifier, tiempo y parámetros esperados, eliminándolo en caso de éxito o vencimiento."
  },
  {
    "kind": "paragraph",
    "text": "Valor Qué vincula Dónde se valida"
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Los valores de correlación protegen distintas relaciones de flujo.",
    "headers": [
      "Valor",
      "Qué vincula",
      "¿Dónde está validado?"
    ],
    "rows": [
      [
        "state",
        "Solicitud de autorización y respuesta",
        "En el callback, antes de procesar code o error."
      ],
      [
        "nonce",
        "Solicitud y ID Token",
        "Dentro del ID Token después de la validación de la firma."
      ],
      [
        "code_verifier",
        "Authorization request y token request",
        "En el token endpoint por parte del OP."
      ],
      [
        "c_hash",
        "Authorization Code y ID Token",
        "En el cliente cuando lo requiera el response_type."
      ],
      [
        "at_hash",
        "Access token y ID Token",
        "En el cliente cuando lo requiera el response_type."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.8 Claims y scopes de identidad",
    "id": "17-8-claims-y-scopes-de-identidad"
  },
  {
    "kind": "paragraph",
    "text": "OIDC define claims estandarizados para perfil, correo electrónico, dirección y número de teléfono. Scopes como perfil y correo electrónico son atajos para solicitar conjuntos de claims. La respuesta efectiva depende del OP, el consentimiento, la política y el lugar de entrega. Un claim puede aparecer en el ID Token, en la respuesta UserInfo o en ambos."
  },
  {
    "kind": "paragraph",
    "text": "El parámetro de claims permite solicitar claims de forma individual e indicar si son imprescindibles. “Esencial” expresa el requerimiento del cliente, pero no obliga a un OP incapaz a fabricar los datos; La transacción puede fallar o continuar según el soporte y la política. También se pueden informar los valores esperados para algunas claims, lo que requiere cuidado con la interoperabilidad."
  },
  {
    "kind": "paragraph",
    "text": "La minimización es una propiedad de seguridad y privacidad. El cliente debe solicitar sólo los atributos necesarios y evitar persistir copias indefinidas. Los claims de grupos y roles pueden crecer, variar entre directorios o representar el estado administrativo; no deben ser tratados como sustitutos universales de la autorización de objetos y las reglas de dominio."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: parámetro de claims"
  },
  {
    "kind": "code",
    "text": "{\n  \"id_token\": {\n    \"acr\": {\"essential\": true, \"values\": [\"urn:example:loa:2\"]},\n    \"email\": {\"essential\": true}\n  },\n  \"userinfo\": {\n    \"given_name\": null,\n    \"family_name\": null\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.9 Endpoint de UserInfo",
    "id": "17-9-endpoint-de-userinfo"
  },
  {
    "kind": "paragraph",
    "text": "El endpoint UserInfo es un recurso protegido que devuelve claims sobre el usuario asociado con el access token. El cliente llama a este endpoint con un bearer token o un mecanismo sender-constrained, según el perfil adoptado. La respuesta suele ser JSON firmada o sin firmar, según la configuración y los metadata del OP."
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe validar que el claim sub de UserInfo es idéntico al sub del ID Token. Esta comparación evita que las claims de otro usuario se asocien con la sesión actual. El hecho de que la conexión utilice TLS no elimina esta validación semántica."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo es útil cuando el cliente necesita claims que no deben aumentar el ID Token o cuando el OP aplica la entrega selectiva. Sin embargo, cada llamada agrega dependencia de la red y manejo de indisponibilidad. El diseño debe decidir qué datos se requieren al iniciar sesión, cuáles se pueden cargar a pedido y durante cuánto tiempo se pueden almacenar."
  },
  {
    "kind": "subhead",
    "text": "Cuidado con los datos personales"
  },
  {
    "kind": "paragraph",
    "text": "Los ID Tokens y la UserInfo pueden contener datos personales. No registre respuestas completas en logs, traces o herramientas de error. Prefiera identificadores mínimos, enmascaramiento y controles de retención alineados con un propósito."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.10 Subject identifiers: public y pairwise",
    "id": "17-10-subject-identifiers-public-y-pairwise"
  },
  {
    "kind": "paragraph",
    "text": "El claim sub proporciona un identificador único local que nunca se reasigna dentro del issuer. En el modo público, el mismo usuario tiende a recibir el mismo sub para diferentes clientes. En modo pairwise, el OP calcula un identificador diferente por sector de cliente, reduciendo la posibilidad de correlacionar al usuario entre aplicaciones independientes."
  },
  {
    "kind": "paragraph",
    "text": "Los pairwise subject identifiers son relevantes para la privacidad, pero requieren vinculación de cuentas, soporte y planificación de migración. Dos clientes del mismo sector pueden compartir el mismo sub según la política de OP; Clientes de diferentes sectores reciben valores diferentes incluso para la misma persona."
  },
  {
    "kind": "paragraph",
    "text": "La base de datos de la aplicación debe conservar el issuer y el subcomo una clave federada, manteniendo atributos como el correo electrónico en campos actualizables. Cuando hay una migración de issuer, fusión de tenants o cambio de estrategia de sujeto, la asociación necesita un procedimiento explícito y pruebas adicionales; no debe inferirse únicamente de la coincidencia del correo electrónico."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - El identificador del sujeto debe equilibrar la estabilidad y la privacidad.",
    "headers": [
      "Estrategia",
      "Ventaja",
      "Atención operativa"
    ],
    "rows": [
      [
        "Public subject",
        "Facilita la correlación entre clientes de un mismo issuer.",
        "Aumenta la posibilidad de seguimiento entre aplicaciones."
      ],
      [
        "Pairwise subject",
        "Reduce la correlación entre sectores de clientes.",
        "Requiere identificador de sector y planificación de vinculación."
      ],
      [
        "Correo electrónico como clave",
        "Suena sencillo para los negocios.",
        "Es modificable, se puede reciclar y no es un identificador seguro."
      ],
      [
        "iss + sub",
        "Identidad federada estable en el dominio del issuer.",
        "Debe conservarse en migraciones y multi-tenant."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.11 acr, amr, auth_time, max_age y prompt",
    "id": "17-11-acr-amr-auth-time-max-age-y-prompt"
  },
  {
    "kind": "paragraph",
    "text": "acr representa una clase o contexto de autenticación logrado, según el vocabulario del issuer o de un perfil. amr enumera los métodos utilizados, como contraseña, OTP, biometría o hardware, pero los valores y combinaciones deben interpretarse de acuerdo con la documentación del OP. auth_time registra cuándo se produjo la autenticación activa."
  },
  {
    "kind": "paragraph",
    "text": "El cliente puede usar max_age para exigir que la autenticación no supere un determinado umbral. Cuando se solicita max_age, auth_time se vuelve esencial para la verificación. interacción de controles rápidos: ninguno intenta una autenticación silenciosa; el inicio de sesión fuerza una nueva autenticación; el consentimiento fuerza una nueva decisión de consentimiento; select_account solicita la selección de cuenta, según sea compatible."
  },
  {
    "kind": "paragraph",
    "text": "acr_values expresa preferencia por contextos de autenticación. En operaciones de alto riesgo, el cliente puede iniciar un nuevo flujo con un requerimiento más fuerte. La política no debe depender únicamente de los parámetros enviados por el front-end; el OP y el cliente deben validar que el contexto devuelto satisface la regla de operación."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Las claims y los parámetros describen el recencia y contexto de autenticación.",
    "headers": [
      "Claim / parámetro",
      "Significado",
      "Uso típico"
    ],
    "rows": [
      [
        "acr",
        "Clase de contexto de autenticación lograda",
        "Comparar con el nivel requerido por la operación."
      ],
      [
        "amr",
        "Métodos utilizados en la autenticación.",
        "Auditorías y políticas específicas del issuer."
      ],
      [
        "auth_time",
        "Instante de la autenticación activa",
        "Validar max_age y antigüedad."
      ],
      [
        "max_age",
        "Edad máxima de autenticación aceptable",
        "Fuerce la reautenticación para operaciones sensibles."
      ],
      [
        "prompt",
        "Comportamiento de interacción solicitado",
        "none, login, consent o select_account."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.12 MFA, step-up y contexto de autenticación",
    "id": "17-12-mfa-step-up-y-contexto-de-autenticacion"
  },
  {
    "kind": "paragraph",
    "text": "MFA significa utilizar factores independientes, no sólo dos pasos del mismo factor. Normalmente, RP no implementa autenticadores; solicita o verifica un contexto emitido por el OP. Para una operación de alto riesgo, el cliente puede iniciar un paso adelante y requerir una nueva autenticación con acr o una política equivalente."
  },
  {
    "kind": "paragraph",
    "text": "La decisión debe considerar la autenticación ya realizada, el riesgo actual, el dispositivo, el recurso y el tiempo transcurrido desde la última prueba. Un usuario puede tener una sesión SSO válida en el OP, pero aún necesita autenticación adicional para autorizar el pago, cambiar credenciales o acceder a datos confidenciales."
  },
  {
    "kind": "paragraph",
    "text": "El resultado del step-up debe vincularse a la operación o sesión adecuada. Aceptar un ID Token antiguo que contenía MFA, sin evaluar auth_time y el contexto de la transacción, permite una reutilización indebida. En sistemas críticos, la confirmación comercial puede requerir controles más allá de OIDC, como firma transaccional o aprobación independiente."
  },
  {
    "kind": "subhead",
    "text": "Principio de assurance"
  },
  {
    "kind": "paragraph",
    "text": "No trate a acr y amr como cadenas universales. Definir qué valores puede emitir cada issuer, qué significan, cómo se auditan y qué operaciones aceptan cada nivel. En las federaciones, este mapeo debe ser parte del acuerdo de confianza."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-04.svg",
    "alt": "Sesiones de OpenID Provider, Relying Party, tokens OAuth y estado de API",
    "caption": "Figura 4: SSO, sesión local y autorización de API son estados relacionados pero independientes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.13 Sesiones en el OP, en el RP y frente a las APIs",
    "id": "17-13-sesiones-en-el-op-en-el-rp-y-frente-a-las-apis"
  },
  {
    "kind": "paragraph",
    "text": "La sesión en OP permite el Single Sign-On entre clientes que confían en el mismo proveedor. Generalmente está representado por una cookie bajo el dominio del OP. Cuando otro RP envía una solicitud de autorización, el OP puede reutilizar la autenticación existente, siempre que la política, prompt y max_age lo permitan."
  },
  {
    "kind": "paragraph",
    "text": "La sesión RP la crea la aplicación después de validar el ID Token. En una aplicación web tradicional o BFF, una cookie HttpOnly, Secure y SameSite hace referencia al estado en el servidor. En SPA puro, las bibliotecas pueden mantener tokens en el navegador, lo que aumenta la importancia de la protección XSS y reduce las assurances de confidencialidad de los secretos."
  },
  {
    "kind": "paragraph",
    "text": "La API normalmente valida los access tokens con cada llamada y no conoce la cookie del OP ni la cookie del RP. La caducidad de la sesión local evita que el navegador realice más acciones, pero no necesariamente revoca los access tokens ya emitidos. Del mismo modo, revocar un refresh token no borra automáticamente todas las cookies de la sesión."
  },
  {
    "kind": "paragraph",
    "text": "El diseño de la sesión debe definir tiempos absolutos y de inactividad, renovación, rotación, revocación, reautenticación y comportamiento en múltiples dispositivos. La experiencia de \"salir de todas partes\" requiere inventario y coordinación entre sesiones y tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.14 RP-Initiated Logout",
    "id": "17-14-rp-initiated-logout"
  },
  {
    "kind": "paragraph",
    "text": "En el RP-Initiated Logout, el cliente redirige el navegador al endpoint de cierre de sesión del OP. Los parámetros comunes incluyen id_token_hint, post_logout_redirect_uri, client_id y state, según las reglas y el soporte del proveedor. El post_logout_redirect_uri debe estar registrado previamente para evitar la redirección abierta."
  },
  {
    "kind": "paragraph",
    "text": "id_token_hint ayuda al OP a identificar la sesión y el cliente, pero no debe tratarse como un access token. State puede correlacionar el retorno posterior al cierre de sesión y la navegación segura. El RP debe limpiar su sesión local independientemente de si se produce la redirección final, evitando que una falla de la red mantenga al usuario aparentemente autenticado en la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "El cierre de sesión iniciado por el RP no garantiza por sí solo que todas las demás aplicaciones conectadas al OP estén cerradas. El OP puede ofrecer propagación por front-channel o por back-channel. La política del producto debe dejar claro si \"salir\" significa finalizar sólo la aplicación actual, la sesión del proveedor o todas las sesiones conocidas."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: RP-Initiated Logout"
  },
  {
    "kind": "code",
    "text": "GET /logout?\n  id_token_hint=eyJ...\n  &post_logout_redirect_uri=https%3A%2F%2Fportal.example%2Fsigned-out\n  &state=bG9nb3V0LXRyYW5zYWN0aW9u HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-05.svg",
    "alt": "Comparación entre el RP-Initiated Logout, el front-channel, el back-channel y la sesión local",
    "caption": "Figura 5: Los mecanismos de cierre de sesión difieren según el canal utilizado y la dependencia del navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.15 Front-Channel y Back-Channel Logout",
    "id": "17-15-front-channel-y-back-channel-logout"
  },
  {
    "kind": "paragraph",
    "text": "El cierre de sesión del front-channel utiliza el agente de usuario para cargar las URL de cierre de sesión desde los RP. El mecanismo es sencillo y compatible con aplicaciones web, pero depende del navegador, de las cookies y de la finalización de la navegación. Las restricciones a las cookies e iframes de terceros pueden reducir la confiabilidad en algunos entornos."
  },
  {
    "kind": "paragraph",
    "text": "El cierre de sesión del back-channel envía una solicitud directa desde el OP al endpoint registrado por el RP. El cuerpo contiene un token de cierre de sesión firmado, con eventos e identificadores específicos como sid o sub. El RP valida issuer, audience, firma, hora, jti y evento antes de invalidar la sesión correspondiente. El endpoint debe ser idempotente, resistente y no depender de las cookies del navegador."
  },
  {
    "kind": "paragraph",
    "text": "Session Management y el polling de estado también pueden detectar cambios, pero el diseño debería preferir mecanismos finales respaldados por el ecosistema. Ningún cierre de sesión reemplaza el vencimiento breve del token, la revocación cuando corresponda y la autorización continua para operaciones de alto riesgo."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: El cierre de sesión debe diseñarse como propagación de estado, no como una redirección única.",
    "headers": [
      "Mecanismo",
      "Canal",
      "Fortalezas",
      "Limitaciones"
    ],
    "rows": [
      [
        "RP-Initiated",
        "Navegador del RP al OP",
        "Experiencia de salida explícita.",
        "No se propaga por sí solo a todos los RPs."
      ],
      [
        "Front-Channel",
        "Navegador del OP a los RPs",
        "Implementación web directa.",
        "Depende del agente de usuario, las cookies y la red."
      ],
      [
        "Back-Channel",
        "OP llama al endpoint de RP",
        "No depende del navegador; más determinista.",
        "Exige endpoint, validación y tratamiento resiliente."
      ],
      [
        "Caducidad local",
        "Control del propio RP",
        "Siempre disponible y sencillo.",
        "No cierra sesión en el OP ni en otros RP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.16 Discovery, metadata y JWKS",
    "id": "17-16-discovery-metadata-y-jwks"
  },
  {
    "kind": "paragraph",
    "text": "OIDC Discovery publica un documento de configuración en una dirección conocida derivada del issuer. El documento informa Authorization_endpoint, token_endpoint, UserInfo_endpoint, jwks_uri, end_session_endpoint cuando esté disponible, tipos de respuesta, scopes, claims, métodos de autenticación del cliente y algoritmos admitidos."
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe iniciar el discovery de un issuer previamente confiable y verificar que el issuer publicado en el documento coincida exactamente con lo esperado. No se debe aceptar un issuer proporcionado libremente por el usuario y, a partir de ahí, recuperar metadata sin política, ya que esto permite SSRF, confusión y confianza en proveedores no autorizados."
  },
  {
    "kind": "paragraph",
    "text": "jwks_uri publica claves públicas. Las bibliotecas almacenan en caché y usan kid para seleccionar la clave. La rotación requiere un período de superposición: los tokens firmados con la clave anterior pueden seguir siendo válidos mientras la nueva clave ya esté publicada. Ante un kid desconocido, el cliente puede actualizar JWKS de manera controlada, evitando bucles de red causados por tokens maliciosos."
  },
  {
    "kind": "subhead",
    "text": "Extracto ilustrativo: Metadata del OpenID Provider"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"userinfo_endpoint\": \"https://id.example/userinfo\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"end_session_endpoint\": \"https://id.example/logout\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"ES256\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "Los metadata son la configuración de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Discovery reduce la configuración manual, pero no hace que ningún endpoint sea confiable. El issuer raíz debe provenir de una configuración, lista de permitidos o cadena de federación validada; Los redireccionamientos y jwks_uri permanecen sujetos a restricciones de red y políticas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.17 Registro de clientes y redirect URIs",
    "id": "17-17-registro-de-clientes-y-redirect-uris"
  },
  {
    "kind": "paragraph",
    "text": "El OP necesita conocer cada cliente: client_id, tipo de aplicación, redirect URIs, post_logout_redirect_uri, métodos de autenticación, claves, scopes y políticas. Los clientes públicos no pueden mantener un secreto confiable; Los clientes confidenciales necesitan proteger sus credenciales y prefieren la autenticación asimétrica cuando el riesgo lo amerita."
  },
  {
    "kind": "paragraph",
    "text": "Los redirect URIs deben ser precisos y utilizar HTTPS, excepto las excepciones controladas para el bucle invertido de la aplicación nativa. Los esquemas de URI personalizados requieren protección contra colisiones y preferencia por enlaces de aplicaciones o enlaces universales cuando estén disponibles. Los comodines y la coincidencia amplia de prefijos pueden permitir que el authorization code se entregue a un destino controlado por el atacante."
  },
  {
    "kind": "paragraph",
    "text": "El registro dinámico puede automatizar los ecosistemas, pero amplía la huella administrativa. Se hacen necesarias declaraciones de software, políticas, autenticación de registrantes, validación de metadata y gestión del ciclo de vida. En entornos empresariales típicos, el registro gobernado por catálogos y canalizaciones ofrece una mayor previsibilidad."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: la clasificación del cliente determina los posibles controles, no solo el nombre de la aplicación.",
    "headers": [
      "Tipo de cliente",
      "Almacenamiento de credenciales",
      "Recomendación"
    ],
    "rows": [
      [
        "Web server / BFF",
        "Puede proteger secretos o claves en el servidor",
        "Code + PKCE y autenticación sólida en el token endpoint."
      ],
      [
        "SPA en el navegador",
        "No tiene un secreto confiable",
        "Code + PKCE; Reduzca los tokens en el navegador y evalúe BFF."
      ],
      [
        "Aplicación nativa",
        "Utiliza el almacenamiento del sistema pero es un cliente público.",
        "Code + PKCE con navegador externo y redireccionamiento seguro."
      ],
      [
        "Daemon confidencial",
        "Puede utilizar clave, certificado o identidad de carga de trabajo",
        "Client Credentials para API; OIDC sólo cuando hay un usuario."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/es/figure-06.svg",
    "alt": "Cadena de confianza federada entre la Relying Party, metadata, claves, políticas y OpenID Provider",
    "caption": "Figura 6: La federación se basa en una cadena explícita de metadata, claves, políticas y gobernanza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.18 Federación de identidades y cadena de confianza",
    "id": "17-18-federacion-de-identidades-y-cadena-de-confianza"
  },
  {
    "kind": "paragraph",
    "text": "La federación permite que una aplicación confíe en la autenticación realizada por otro dominio. En una relación bilateral, el RP configura directamente el issuer, los metadata, las claves y las reglas. En las federaciones multilaterales, las entidades y los trust anchors pueden publicar declaraciones y políticas firmadas que permitan resolver la cadena de confianza de forma escalable."
  },
  {
    "kind": "paragraph",
    "text": "La confianza técnica no reemplaza el acuerdo organizacional. Es necesario definir onboarding, ownership y assurance, la respuesta a incidentes, la rotación de claves, la disponibilidad, la privacidad, la semántica de los claims y el cierre. Un OP puede emitir tokens criptográficamente válidos y aun así proporcionar atributos que son incompatibles con la política del RP."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Federation 1.0 formaliza cadenas de confianza y políticas de metadata para ecosistemas con muchas entidades. La adopción debe considerar la madurez del producto, el perfil del sector y la necesidad real. En una empresa con pocos issuers, la configuración explícita puede ser más sencilla; En los ecosistemas gubernamental, financiero o sanitario, la federación multilateral puede reducir los acuerdos bilaterales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.19 Multi-tenant, múltiples issuers y vinculación de cuentas",
    "id": "17-19-multi-tenant-multiples-issuers-y-vinculacion-de-cuentas"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones multi-tenant pueden aceptar usuarios de varios directorios. La validación debe determinar el issuer autorizado para cada tenant y evitar que una clave válida de un tenant autentique identidades en otro. Los endpoints “comunes” o equivalentes facilitan el discovery inicial, pero el token final debe estar asociado con el issuer concreto y la política de tenancy."
  },
  {
    "kind": "paragraph",
    "text": "La vinculación de cuentas conecta identidades federadas a una cuenta local. El proceso debe requerir una sesión ya autenticada y una nueva prueba en el segundo proveedor, con protección contra CSRF y confirmación clara. Vincular cuentas automáticamente porque tienen el mismo correo electrónico permite tomar el control de la cuenta cuando se reciclan dominios o direcciones."
  },
  {
    "kind": "paragraph",
    "text": "En las migraciones, preserve el historial entre el issuer antiguo, el subdirector antiguo y la nueva identidad mediante una tabla de mapeo gobernada. Los registros de auditoría deben registrar qué identidad federada se utilizó, qué cuenta local resultó del vínculo y quién autorizó el vínculo."
  },
  {
    "kind": "subhead",
    "text": "Regla de issuers múltiples"
  },
  {
    "kind": "paragraph",
    "text": "Nunca elijas la clave de validación solo para el kid sin antes arreglar al issuer confiable. El mismo kid puede existir en diferentes dominios y los metadata de un issuer no deberían validar los tokens de otro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.20 Aplicaciones web, SPA, BFF y aplicaciones nativas",
    "id": "17-20-aplicaciones-web-spa-bff-y-aplicaciones-nativas"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones web backend pueden mantener tokens y credenciales en el servidor y exponer solo una cookie de sesión protegida al navegador. Este modelo reduce la superficie de exfiltración de JavaScript, pero requiere protección contra CSRF, fijación de sesión, robo de cookies y problemas de escalabilidad del estado."
  },
  {
    "kind": "paragraph",
    "text": "Las SPA son clientes públicos. El authorization code con PKCE reemplaza el flujo implícito como enfoque moderno, pero los tokens siguen siendo accesibles en el contexto del navegador si se almacenan en el front-end. Se requiere una política de seguridad de contenido, reducción de dependencia, protección XSS, tokens cortos y un almacenamiento cuidadoso. El estándar BFF transfiere el manejo de tokens al servidor y ofrece al navegador una sesión con origen restringido."
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones nativas deben utilizar un navegador externo o una sesión de autenticación del sistema, no una vista web integrada que capture las credenciales. Los redireccionamientos utilizan enlaces de app links, universal links o loopback según la plataforma. PKCE es obligatorio en la práctica moderna y los refresh tokens deben rotarse y almacenarse en el mecanismo seguro del sistema cuando sean compatibles."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: El flujo es similar, pero la ubicación de ejecución cambia el modelo de amenaza.",
    "headers": [
      "Arquitectura",
      "¿Dónde están los tokens?",
      "Riesgo dominante"
    ],
    "rows": [
      [
        "Web server",
        "Backend del cliente",
        "Sesión, CSRF, credencial de cliente y acceso al servidor."
      ],
      [
        "SPA",
        "Contexto del navegador",
        "XSS, extensión maliciosa y persistencia de tokens."
      ],
      [
        "BFF",
        "backend; el navegador recibe cookies",
        "CSRF, sesión BFF y confianza backend."
      ],
      [
        "Aplicación nativa",
        "Almacenamiento del dispositivo",
        "Malware, secuestro de redireccionamiento y dispositivo comprometido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.21 OIDC en API Gateways, Axway y Azure",
    "id": "17-21-oidc-en-api-gateways-axway-y-azure"
  },
  {
    "kind": "paragraph",
    "text": "Un API Gateway puede actuar como Relying Party para autenticar usuarios del portal o de la consola, como OpenID Provider en arquitecturas específicas o como PEP que valida access tokens emitidos por el mismo ecosistema. Estos roles deben configurarse por separado. La validación del ID Token en una API Gateway no corrige el error de utilizar el token incorrecto; la API sigue necesitando un access token destinado a su audience."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, los filtros y servicios OIDC le permiten actuar como proveedor o Relying Party, crear y validar ID Tokens e integrar flujos de OAuth. El diseño debe separar las políticas de inicio de sesión interactivo de las políticas de protección de API, mantener almacenes y certificados gobernados y validar el issuer, la audience, el nonce y las claims según el rol desempeñado."
  },
  {
    "kind": "paragraph",
    "text": "En Microsoft Entra, las aplicaciones registradas reciben client_id, redireccionan URI y configuraciones de token. Azure API Management normalmente protege las API mediante la validación de access tokens con validate-jwt o validate-azure-ad-token. La política puede utilizar la configuración OpenID para obtener issuers y claves, pero debe requerir audience y claims adecuados; La simple validación criptográfica no reemplaza la autorización."
  },
  {
    "kind": "paragraph",
    "text": "En portales de desarrolladores y consolas administrativas, OIDC puede proporcionar SSO. Para las llamadas en runtime, la API Gateway debe preservar la identidad del usuario y de la aplicación de forma controlada, eliminar headers externos equivalentes y, cuando sea necesario, emitir u obtener las credenciales adecuadas para el backend."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: APIM validando el access token a la API"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "La API Gateway no reemplaza al cliente OIDC"
  },
  {
    "kind": "paragraph",
    "text": "La aplicación cliente valida el ID Token y mantiene la sesión del usuario. La API Gateway protege las API validando access tokens y aplicando políticas. Mezclar estas responsabilidades produce audiences equivocadas y una exposición innecesaria de las claims."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.22 Amenazas y hardening",
    "id": "17-22-amenazas-y-hardening"
  },
  {
    "kind": "paragraph",
    "text": "La inyección de authorization code ocurre cuando un code obtenido en otra transacción se inserta en el callback del cliente. state, PKCE, nonce, la validación del issuer y las reglas contra mix-up reducen el riesgo. El registro abierto o flexible de redirect URIs permite el secuestro del code. XSS puede robar tokens en una SPA, mientras que CSRF puede activar callbacks o logout en un contexto indebido."
  },
  {
    "kind": "paragraph",
    "text": "La sustitución de token ocurre cuando se acepta un ID Token o access token válido para otro cliente, issuer o propósito. La defensa es una validación estricta del issuer, audience, azp, tipo y contexto. Los algoritmos inesperados, las claves obtenidas de la URL indicada por el token y el cache global por kid crean fallas criptográficas y de múltiples issuers."
  },
  {
    "kind": "paragraph",
    "text": "Login CSRF asocia la sesión de la víctima con la cuenta del atacante, lo que hace que la víctima opere con una identidad incorrecta. state por transacción, la correlación de sesiones y la confirmación de cuenta reducen el riesgo. La vinculación automática de cuentas por correo electrónico es otra forma de error de identidad."
  },
  {
    "kind": "paragraph",
    "text": "El cierre de sesión también presenta amenazas: redirección abierta, borrado parcial, replay del token de cierre de sesión y denegación de sesión. post_logout_redirect_uri debe estar registrado; los tokens de cierre de sesión necesitan firma, audience, eventos, jti y tiempo; Los endpoints deben ser idempotentes y limitar el abuso."
  },
  {
    "kind": "table",
    "caption": "Tabla 9: El OIDC seguro depende de los vínculos entre transacciones, issuers, clientes y artefactos.",
    "headers": [
      "Amenaza",
      "Error de implementación",
      "Control principal"
    ],
    "rows": [
      [
        "Issuer mix-up",
        "Procesar respuesta sin fijar el OP esperado",
        "Issuer por transacción, metadata confiables y validación exacta."
      ],
      [
        "Code injection",
        "Aceptar code sin vínculo con la tentativa",
        "PKCE, state, nonce y callback correlacionada."
      ],
      [
        "Sustitución de tokens",
        "Aceptar JWT de otra audience o tipo",
        "aud, azp, typ, issuer y finalidad del token."
      ],
      [
        "Login CSRF",
        "Crear sesión con respuesta no iniciada por el usuario",
        "state fuerte y registro de transacción."
      ],
      [
        "XSS en SPA",
        "Tokens accesibles al script comprometido",
        "BFF, CSP, reducción de scripts y token corto."
      ],
      [
        "Account linking indebido",
        "Vincular por coincidencia de e-mail",
        "Reautenticación con ambas identidades y confirmación explícita."
      ],
      [
        "Replay de cierre de sesión",
        "Aceptar logout token repetido o antiguo",
        "jti, exp/iat, firma e idempotencia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.23 Troubleshooting basada en evidencia",
    "id": "17-23-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico debe separar el front-channel, el token endpoint, la validación del ID Token, la creación de sesiones y el acceso a la API. Un error en la callback podría ser un state divergente, un redirect URI incorrecto o un code expirado. Un error en el token endpoint podría ser la autenticación del cliente, PKCE, la reutilización de code o el reloj. Un inicio de sesión exitoso seguido de un 401 en la API generalmente indica que falta un access token, una audience incorrecta o una política de API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Recopile correlation ID, issuer esperado, client_id, redirect URI normalizada, response_type, scopes, marcas de tiempo, kid, algoritmo, audiences y resultado de cada validación. Nunca registre tokens completos, authorization codes, code_verifiers, secretos o cookies. Para el análisis, utilice claims sintéticas o hashes irreversibles controlados."
  },
  {
    "kind": "paragraph",
    "text": "Los problemas intermitentes después de la rotación de claves pueden indicar cache JWKS, nodos con relojes divergentes o sin superposición. Los fallos en un solo tenant sugieren issuer, consentimiento, claims o política de tenancy. El cierre de sesión que funciona en una aplicación y no en otra debe analizarse por tipo de canal, sid/sub, endpoint registrado y estado local del RP."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - Los síntomas deben estar asociados con la etapa exacta del flujo.",
    "headers": [
      "Síntoma",
      "Hipótesis prioritarias",
      "Evidencia"
    ],
    "rows": [
      [
        "invalid_state",
        "Transacción perdida, cookie bloqueada, callback duplicada",
        "State emitido, recibido y correlacionado."
      ],
      [
        "invalid_grant en el token endpoint",
        "Code expirado/reutilizado, redireccionamiento o verificador divergente",
        "Tiempo, redirect_uri y hash del verifier."
      ],
      [
        "Firma no válida",
        "kid nuevo, issuer incorrecto, caché JWKS",
        "Metadata, JWKS actuales y reloj."
      ],
      [
        "Audience no válida",
        "ID Token emitido a otro client_id",
        "aud, azp y client_id configurados."
      ],
      [
        "nonce inválido",
        "Respuesta de otro intento o replay",
        "nonce almacenado por transacción."
      ],
      [
        "El inicio de sesión funciona, la API devuelve 401",
        "Falta el access token, está caducado o tiene una audience incorrecta",
        "Header Authorization y política de API Gateway."
      ],
      [
        "Cierre de sesión parcial",
        "El mecanismo no se propagó o el RP no borró la sesión",
        "logs de sid/sub, endpoint y cierre de sesión."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Lista de verificación de telemetría sin exposición de credenciales"
  },
  {
    "kind": "code",
    "text": "Registro seguro de diagnóstico:\n- transaction_id y correlation_id\n- issuer esperado y client_id\n- redirect_uri normalizada\n- state_match, nonce_match y pkce_result\n- alg, kid, aud, azp y tiempos sin el token bruto\n- sesión creada, renovada o invalidada\n- código de error del OP y etapa que respondió"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.24 Estudios de caso",
    "id": "17-24-estudios-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: ID Token aceptado por la API"
  },
  {
    "kind": "paragraph",
    "text": "Un portal envía el ID Token en el encabezado de autorización a API Gateway. El token tiene una firma válida y una aud igual al client_id del portal, no a la API. La API Gateway está configurada para verificar únicamente la firma y el vencimiento, por lo que acepta la llamada. El backend comienza a confiar en un token destinado a otro componente y sin scopes de recursos."
  },
  {
    "kind": "paragraph",
    "text": "La solución es solicitar un access token para la audience de API, validar el issuer, la audience, el tipo y los scopes en la API Gateway y mantener el ID Token solo en el cliente. La migración debería tener en cuenta a los consumidores existentes y evitar que ambos tipos sean aceptados indefinidamente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: falla intermitente después de la rotación de la llave"
  },
  {
    "kind": "paragraph",
    "text": "El OP comienza a firmar nuevos tokens con otro kid, pero un nodo de aplicación mantiene JWKS en caché durante un período de tiempo excesivo. Algunos usuarios reciben tokens con la nueva clave y fallan; otros continúan autenticándose con tokens antiguos. Reiniciar el nodo parece solucionarlo temporalmente."
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico compara la edad del kid, del nodo de servicio y del caché. La solución incluye caché con actualización controlada en kids desconocidos, anulación de claves por issuer, observabilidad y biblioteca OIDC actualizada. No debes recuperar la URL clave proporcionada por el token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: Adquisición de cuenta mediante vinculación automática"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación vincula automáticamente una nueva identidad federada a la cuenta local cuando el correo electrónico coincide. Un dominio libera una dirección antigua, que se asigna a otra persona. El nuevo propietario se autentica con el OP y recibe acceso a la cuenta histórica."
  },
  {
    "kind": "paragraph",
    "text": "La solución requiere iss + sub como identidad, proceso de vinculación explícito con reautenticación y confirmación, alertas de usuario y seguimiento de auditoría. El correo electrónico sigue siendo un atributo de contacto, no una prueba de continuidad de identidad."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4: Cerrar sesión cierra el portal, pero no cierra otras aplicaciones"
  },
  {
    "kind": "paragraph",
    "text": "El portal borra su cookie y llama al endpoint de cierre de sesión del OP, pero otro RP mantiene activa la sesión local. La expectativa de \"cierre de sesión global\" no se documentó y el OP no envió el cierre de sesión del front-channel ni del back-channel."
  },
  {
    "kind": "paragraph",
    "text": "El diseño se revisó para registrar endpoints del back-channel, emitir sid, validar tokens de cierre de sesión y definir el comportamiento de indisponibilidad. La interfaz ahora distingue entre \"salir de esta aplicación\" y \"cerrar sesión corporativa\"."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios de observación",
    "id": "laboratorios-de-observacion"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1: flujo OIDC completo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Utilice un proveedor y cliente de laboratorio autorizado.",
      "Capture la solicitud de autorización sin registrar credenciales reales.",
      "Identifique el state, nonce, code_challenge, code y respuesta del token.",
      "Valide el ID Token con la biblioteca y compare iss, aud, nonce y tiempo."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2 - matriz de validación"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cree tokens sintéticos o fixtures firmadas con una clave de laboratorio.",
      "Prueba de issuer incorrecta, audience incorrecta, vencimiento, nonce divergente y algo no permitido.",
      "Registre qué validación rechazó cada token.",
      "Confirme que el cliente no crea sesión después de cualquier falla."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3: UserInfo y minimización"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Solicite openid, perfil y correo electrónico en un entorno de prueba.",
      "Compare los claims del ID Token y UserInfo.",
      "Valida que sub sea el mismo en ambas respuestas.",
      "Reduzca los scopes y observe qué datos no se entregan."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 4: sesión y cierre de sesión"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cree dos RP de laboratorio bajo el mismo OP.",
      "Observe el SSO y diferencie las cookies de OP y RP.",
      "Pruebe el cierre de sesión local, iniciado por RP y, si es compatible, en el back-channel.",
      "Registre qué sesiones permanecen activas en cada escenario."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 5 - Rotación JWKS"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publique dos claves de laboratorio y cambie la clave activa.",
      "Caché de notas, kid y aceptación de tokens antiguos.",
      "Prueba de actualización controlada en kid desconocido.",
      "Establezca ventanas superpuestas y alertas de fallos."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect agrega autenticación interoperable a OAuth 2.0. El scope de openid activa el protocolo y el ID Token comunica un evento de autenticación a la Relying Party. El access token sigue utilizándose para la API. Confundir los dos artefactos es un defecto arquitectónico, aunque ambos son JWT."
  },
  {
    "kind": "paragraph",
    "text": "El flujo de authorization code con PKCE utiliza state, nonce y code_verifier para proteger diferentes relaciones. El cliente valida los requisitos de issuer, firma, algoritmo, audience, azp, tiempo, nonce y seguridad antes de crear la sesión. Claims como acr, amr y auth_time solo son útiles cuando se conoce su semántica."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo entrega claims autorizados y debe mantener el mismo sub del ID Token. La identidad federada debe persistir mediante iss + sub; El correo electrónico no es una clave inmutable. Los sujetos public y pairwise ofrecen diferentes propiedades de correlación y privacidad."
  },
  {
    "kind": "paragraph",
    "text": "La sesión OP, la sesión RP y los tokens API son estados independientes. El cierre de sesión requiere una política explícita y puede utilizar RP-Initiated, Front-Channel o Back-Channel. Discovery y JWKS facilitan la configuración y la rotación, pero es necesario controlar el issuer raíz y la cadena de confianza."
  },
  {
    "kind": "paragraph",
    "text": "En las API Gateways, OIDC protege los inicios de sesión de aplicaciones y portales, mientras que las API normalmente requieren access tokens. Axway y Azure ofrecen recursos para el discovery y la validación, pero la configuración de la audience, las claims y la autorización sigue siendo responsabilidad de la arquitectura."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 18 profundizará en JWT, JWS, JWE y JOSE: serialización, algoritmos, identificadores de claves, JWKS, rotación, validación, cifrado de tokens y dificultades de implementación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de OpenID Connect",
    "id": "checklist-de-openid-connect"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "El scope de openid solo está presente en los flujos de autenticación OIDC.",
      "El cliente utiliza un authorization code con PKCE y un redirect URIs exacto.",
      "state, nonce y code_verifier son únicos por transacción y se eliminan después de su uso.",
      "El issuer está configurado o resuelto por cadena de confianza autorizada.",
      "La firma se valida con el algoritmo permitido y la clave JWKS correcta.",
      "aud y azp se comparan con el client_id esperado.",
      "exp, iat y auth_time usan reloj sincronizado y tolerancia limitada.",
      "El ID Token permanece en el cliente y no reemplaza el access token a la API.",
      "El claim sub de UserInfo se compara con el sub del ID Token.",
      "La cuenta federada utiliza iss+sub, no el correo electrónico, como clave externa.",
      "acr y amr tienen una semántica documentada por issuer.",
      "Las cookies OP y RP tienen política de protección, caducidad y renovación.",
      "El cierre de sesión local, el iniciado por RP, el front-channel y el back-channel tienen un comportamiento definido.",
      "Discovery y JWKS tienen caché, actualización controlada y protección de red.",
      "El multi-tenant valida una política concreta de issuer y tenancy.",
      "Los registros no almacenan tokens, codes, secrets, verifiers ni cookies.",
      "Las bibliotecas OIDC se mantienen actualizadas y se prueban con casos negativos."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios",
    "id": "ejercicios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por qué OAuth 2.0 no es, de forma aislada, un protocolo de inicio de sesión.",
      "Diferenciar OP, RP, authorization server y resource server.",
      "Describa el papel del scope openid, state, nonce y PKCE.",
      "Listar las validaciones obligatorias de un ID Token.",
      "Explique cuándo es necesario analizar azp.",
      "Compare el ID Token, el access token y la respuesta UserInfo.",
      "Explique por qué iss + sub es mejor que el correo electrónico para vincular cuentas.",
      "Compare identificadores de sujetos public y pairwise.",
      "Modelo mejorado usando max_age, auth_time y acr.",
      "Diferenciar sesión en OP, sesión en RP y validez del access token.",
      "Compare RP-Initiated, Front-Channel y Back-Channel Logout.",
      "Describa cómo manejar la rotación de JWKS sin reiniciar las aplicaciones.",
      "Proponer una política multi-tenant que evite confusión de issuers.",
      "Explique por qué la API Gateway debe validar el access token, no el ID Token.",
      "Cree un script de troubleshooting para invalid_state y invalid_grant."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario",
    "id": "glosario"
  },
  {
    "kind": "table",
    "caption": "Tabla 11 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "acr",
        "Referencia de clase de contexto de autenticación; clase de contexto de autenticación."
      ],
      [
        "amr",
        "Referencias a métodos de autenticación; métodos utilizados en la autenticación."
      ],
      [
        "auth_time",
        "Hora a la que se produjo la autenticación de usuario activo."
      ],
      [
        "Authorization Code",
        "Artefacto corto intercambiado en token endpoint."
      ],
      [
        "azp",
        "Parte autorizada; cliente autorizado cuando aud contiene múltiples valores."
      ],
      [
        "Back-Channel Logout",
        "Cierre de sesión directo desde el OP al endpoint del RP."
      ],
      [
        "c_hash",
        "Hash que vincula el authorization code al ID Token en los flujos aplicables."
      ],
      [
        "Discovery",
        "Mecanismo de obtención de metadata del OpenID Provider."
      ],
      [
        "End-User",
        "Persona autenticada por el OpenID Provider."
      ],
      [
        "Front-Channel Logout",
        "Cierre de sesión propagado por el navegador entre OP y RP."
      ],
      [
        "ID Token",
        "JWT destinado al RP para comunicar el evento de autenticación."
      ],
      [
        "iss",
        "Issuer; identificador del issuer del token."
      ],
      [
        "JWKS",
        "Conjunto JSON de claves públicas para validación criptográfica."
      ],
      [
        "max_age",
        "Edad máxima de autenticación aceptable."
      ],
      [
        "nonce",
        "Valor que vincula la solicitud de autenticación y el ID Token."
      ],
      [
        "OpenID Provider",
        "Entidad que autentica al usuario y emite ID Tokens."
      ],
      [
        "Pairwise subject",
        "sub diferente por sector de clientes para reducir la correlación."
      ],
      [
        "prompt",
        "Parámetro que controla la interacción como ninguno, inicio de sesión o consentimiento."
      ],
      [
        "Public subject",
        "sub reutilizado entre clientes según política del issuer."
      ],
      [
        "Relying Party",
        "Cliente OIDC que confía en la autenticación del OP."
      ],
      [
        "RP-Initiated Logout",
        "Solicitud de cierre de sesión iniciada por el cliente."
      ],
      [
        "sid",
        "Identificador de sesión utilizado en los mecanismos de cierre de sesión."
      ],
      [
        "sub",
        "Identificador de sujeto; identificador de usuario en el issuer."
      ],
      [
        "UserInfo",
        "Endpoint protegido que devuelve claims autorizadas del usuario."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de arquitectura OIDC",
    "id": "anexo-a-matriz-de-arquitectura-oidc"
  },
  {
    "kind": "table",
    "caption": "Tabla 12 - La elección depende de la plataforma, riesgo, experiencia y capacidad del proveedor.",
    "headers": [
      "Escenario",
      "Arquitectura inicial",
      "Controles esenciales"
    ],
    "rows": [
      [
        "Aplicación web corporativa",
        "Code + PKCE con sesión del lado del servidor",
        "autenticación de cliente, cookie segura, CSRF, nonce y cierre de sesión."
      ],
      [
        "SPA de bajo riesgo",
        "Code + PKCE",
        "CSP, token corto, sin secreto y protección XSS."
      ],
      [
        "SPA de mayor riesgo",
        "BFF + Code + PKCE",
        "tokens en el backend, cookie HttpOnly y CSRF."
      ],
      [
        "Aplicación nativa",
        "Code + PKCE con navegador externo",
        "app link / universal link, almacenamiento seguro y rotación de refresh tokens."
      ],
      [
        "Portal multi-tenant",
        "Issuer por tenant y política explícita",
        "aud/azp, tenancy, consentimiento y vinculación segura de cuentas."
      ],
      [
        "Operación con step-up",
        "Nueva authorization request con assurance",
        "max_age, acr, tiempo de autenticación y enlace a la operación."
      ],
      [
        "SSO con cierre de sesión corporativo",
        "Sesión OP + RP-Initiated + back-channel",
        "sid, token de cierre de sesión, idempotencia y observabilidad."
      ],
      [
        "federación multilateral",
        "OpenID Federation o perfil sectorial",
        "trust anchors, políticas de metadata y gobernanza."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias técnicas",
    "id": "referencias-tecnicas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Fundación OpenID. OpenID Connect Core 1.0 incorpora el conjunto de erratas 2.",
      "Fundación OpenID. OpenID Connect Discovery 1.0 incorpora el conjunto de erratas 2.",
      "Fundación OpenID. Cierre de sesión iniciado por OpenID Connect RP 1.0. 2022.",
      "Fundación OpenID. Cierre de sesión del front-channel de OpenID Connect 1.0. 2022.",
      "Fundación OpenID. OpenID Connect Back-Channel Logout 1.0, con erratas incorporadas. 2023.",
      "Fundación OpenID. Gestión de sesiones de OpenID Connect 1.0. 2022.",
      "Fundación OpenID. OpenID Federation 1.0. 2026.",
      "IETF. RFC 6749: el marco de autorización de OAuth 2.0. 2012.",
      "IETF. RFC 7636: clave de prueba para el intercambio de códigos por parte de clientes públicos de OAuth. 2015.",
      "IETF. RFC 7519: token web JSON. 2015.",
      "IETF. RFC 8414: Metadata del authorization server OAuth 2.0. 2018.",
      "IETF. RFC 8252: OAuth 2.0 para aplicaciones nativas. 2017.",
      "IETF. RFC 8725: Mejores prácticas actuales de tokens web JSON. 2020.",
      "IETF. RFC 9207: Identificación del issuer del authorization server OAuth 2.0. 2022.",
      "IETF. RFC 9700: mejores prácticas actuales para la seguridad de OAuth 2.0. 2025.",
      "Microsoft aprende. Plataforma de identidad de Microsoft y protocolo OpenID Connect.",
      "Microsoft aprende. Políticas de validación-jwt y validación-azure-ad-token de Azure API Management.",
      "Documentación Axway. API Gateway y OpenID Connect; Filtros OpenID Connect.",
      "OWASP. Hoja de referencia de seguridad de OAuth 2.0 y hoja de referencia de Session Management."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "OIDC es un conjunto de especificaciones y perfiles en evolución. Antes de implementar discovery, cierre de sesión, federación o assurance, confirme la versión admitida por el proveedor, la biblioteca y la API Gateway. Los borradores de Internet y las extensiones propietarias no reemplazan automáticamente las especificaciones finales."
  }
];
