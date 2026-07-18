import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OAUTH_2_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Delegación OAuth 2.0: autorización sin compartir la contraseña del usuario"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/overview.svg",
    "alt": "OAuth 2.0 delegando autoridad entre usuario, cliente, authorization server, API Gateway y API",
    "caption": "Figura de apertura: OAuth delega autoridad limitada sin convertir al cliente en el propietario de las credenciales del usuario."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Al cliente se le otorga autoridad limitada para acceder a una API; La autenticación de usuario y la autorización de API siguen siendo decisiones independientes."
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
    "text": "Los capítulos anteriores separaron identidad, autenticación, autorización y credenciales estáticas. Ahora el curso profundiza en el marco OAuth 2.0, creado para permitir a un cliente obtener autoridad limitada para acceder a un recurso protegido. La idea central es reemplazar el intercambio directo de credenciales con artefactos temporales, con audience, scope, duración y contexto controlados."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 no es un protocolo único y cerrado. Es una familia de roles, endpoints, grants, tipos de clientes, formatos de tokens y extensiones. La seguridad de un despliegue depende de la correcta composición de estos elementos. Un flujo de authorization code puede ser sólido cuando utiliza PKCE, URI de redireccionamiento estricto y protección de state, pero puede ser vulnerable cuando acepta redirecciones amplias, mezcla issuers o expone códigos y tokens en registros."
  },
  {
    "kind": "paragraph",
    "text": "La especificación original sigue siendo importante, pero la práctica moderna también se guía por documentos posteriores. Las mejores prácticas actuales de seguridad consolidan experiencias operativas, desaconsejan modos inseguros y refuerzan PKCE, redirect URI exacto, protección contra mix-up, restricción de refresh token y defensa de replay. Extensiones como PAR, JAR, RAR, mTLS, DPoP, metadata de recursos y Token Exchange abordan escenarios de mayor riesgo e integraciones corporativas."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo recorre el ciclo completo: registro de cliente, solicitud de autorización, emisión y uso de tokens, renovación, revocación, introspección, delegación entre servicios y aplicación en API Gateway. El objetivo es permitir al lector diseñar y diagnosticar flujos reales sin confundir la autenticación de usuario, la autenticación de cliente, el consentimiento, la autorización de recursos y la validación de tokens."
  },
  {
    "kind": "subhead",
    "text": "Estado de la especificación"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.1 seguirá siendo un borrador de Internet en 2026. Consolida las prácticas modernas, pero no reemplaza automáticamente los RFC publicados. Para decisiones regulatorias, utilice los RFC actuales y las mejores prácticas actuales de seguridad de OAuth 2.0, consultando la versión preliminar actual solo para obtener orientación adicional."
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
      "Explique el problema de delegación resuelto por OAuth 2.0 y sus límites.",
      "Distinga propietario de recursos, cliente, authorization server y resource server.",
      "Diferenciar endpoint de autorización, endpoint de token, introspección, revocación y metadata.",
      "Clasifique clientes públicos y confidenciales y elija una autenticación compatible con su capacidad para proteger claves.",
      "Describir el authorization code con PKCE y los controles de estado, nonce, issuer y URI de redireccionamiento.",
      "Aplique Client Credentials, Device Authorization Grant y refresh tokens en escenarios apropiados.",
      "Distinga grants, códigos, access tokens, refresh tokens y tokens de identificación.",
      "Diseñar scopes, audiences, indicadores de recursos, consentimiento y autorización detallada.",
      "Comprenda los tokens opacos, los JWT, la introspección, la revocación y los perfiles de access tokens.",
      "Aplicar PAR, JAR, JARM, RAR, mTLS, DPoP y Token Exchange según riesgo.",
      "Integre OAuth con API Gateways, Axway API Gateway y Azure API Management.",
      "Diagnosticar invalid_request, invalid_client, invalid_grant, invalid_token y insufficient_scope."
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
      "16.1 El problema que resuelve OAuth 2.0",
      "16.2 Roles y límites de confianza",
      "16.3 Endpoints, metadata y canales",
      "16.4 Registro, tipos de clientes y URI de redireccionamiento",
      "16.5 Grants, flujos y tipos de tokens",
      "16.6 Authorization Code en profundidad",
      "16.7 PKCE y protección de interceptación",
      "16.8 State, nonce, issuer y protección contra mix-up",
      "16.9 Autenticación de clientes confidenciales",
      "16.10 Aplicaciones web, SPA, nativas y BFF",
      "16.11 Client Credentials",
      "16.12 Device Authorization Grant",
      "16.13 Refresh tokens, rotación y reutilización",
      "16.14 Access tokens, scopes, audience e indicadores de recursos",
      "16.15 Tokens opacos, introspección y revocación",
      "16.16 Access tokens y validación de JWT",
      "16.17 Consentimiento, least privilege y Rich Authorization Requests",
      "16.18 PAR, JAR y JARM",
      "16.19 Sender-constrained tokens con mTLS y DPoP",
      "16.20 Token Exchange y on-behalf-of",
      "16.21 Metadata del authorization server y recurso protegido",
      "16.22 OAuth en API Gateways, Axway y Azure",
      "16.23 Amenazas y hardening",
      "16.24 Troubleshooting basada en evidencia",
      "16.25 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.1 El problema que resuelve OAuth 2.0",
    "id": "16-1-el-problema-que-resuelve-oauth-2-0"
  },
  {
    "kind": "paragraph",
    "text": "Antes de los marcos de delegación, era común que una aplicación solicitara la contraseña de un usuario para acceder a otro sistema. Esta práctica otorgaba al cliente un poder excesivo, impedía limitar las operaciones, dificultaba la revocación selectiva y exponía las credenciales reutilizables. Si el cliente estuviera comprometido, el atacante podría actuar como usuario en cualquier interfaz que aceptara la misma contraseña."
  },
  {
    "kind": "paragraph",
    "text": "OAuth reemplaza este intercambio con una concesión de autoridad. El cliente solicita autorización para una finalidad; El authorization server autentica al usuario cuando es necesario, aplica políticas y emite un access token destinado al resource server. El cliente recibe sólo la capacidad representada por el token, no la credencial principal del usuario."
  },
  {
    "kind": "paragraph",
    "text": "El marco no define por sí solo cómo se autentica el usuario, cómo modela la API los permisos de los objetos o cómo se debe formatear el token. Tampoco transforma un access token en prueba de inicio de sesión para el cliente. OpenID Connect satisface la necesidad de comunicar la autenticación del usuario al cliente, mientras que la API sigue siendo responsable de la autorización detallada y las reglas comerciales."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "OAuth responde: \"¿cómo obtiene y presenta un cliente una autoridad limitada para un recurso?\" No se responde a sí mismo: \"¿quién es el usuario de la interfaz?\", \"¿el usuario es propietario de este objeto?\" o \"¿esta transacción está permitida por el dominio?\"."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/figure-01-roles.svg",
    "alt": "Roles de OAuth y sus canales de comunicación y confianza",
    "caption": "Figura 1: Los roles son responsabilidades lógicas; un producto puede implementar más de una función, pero los límites deben permanecer explícitos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.2 Roles y límites de confianza",
    "id": "16-2-roles-y-limites-de-confianza"
  },
  {
    "kind": "paragraph",
    "text": "El resource owner es la entidad capaz de otorgar acceso al recurso. En muchos flujos se trata de una persona, pero también puede ser una organización o una política administrativa. El cliente es la aplicación que solicita acceso. No es automáticamente propietario de los datos y no se le debe otorgar más autoridad de la necesaria para su función."
  },
  {
    "kind": "paragraph",
    "text": "El authorization server autentica al resource owner cuando corresponde, evalúa la solicitud, registra el consentimiento o la política y emite tokens. El resource server es la API que acepta access tokens y decide si se permite la operación. En una plataforma empresarial, API Gateway puede actuar como parte del resource server validando el token y aplicando controles transversales, mientras que el backend conserva las decisiones de dominio."
  },
  {
    "kind": "paragraph",
    "text": "Los roles lógicos no necesariamente equivalen a procesos separados. El mismo producto puede alojar autorizaciones y recursos, y una API Gateway puede intermediar varias API. Aun así, el issuer, la audience, las claves, los endpoints y las responsabilidades deben ser distintos para evitar que un token emitido para un servicio sea aceptado indebidamente por otro."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Cada rol tiene sus propios controles y evidencia.",
    "headers": [
      "papel",
      "Responsabilidad principal",
      "Error de dibujo común"
    ],
    "rows": [
      [
        "Resource owner",
        "otorga autoridad sobre los recursos",
        "Trate el consentimiento como una autorización sin restricciones."
      ],
      [
        "Client",
        "solicitar y usar tokens",
        "almacenar secreto en la aplicación incapaz de protegerlo."
      ],
      [
        "Authorization server",
        "emite tokens y publica metadata",
        "emitir una audience amplia y aceptar URI de redireccionamiento flexible."
      ],
      [
        "Resource server",
        "valida el token y autoriza la operación",
        "Acepte JWT solo porque la firma es válida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.3 Endpoints, metadata y canales",
    "id": "16-3-endpoints-metadata-y-canales"
  },
  {
    "kind": "paragraph",
    "text": "El endpoint de autorización recibe solicitudes a través del agente de usuario y realiza interacción con el resource owner. El cliente accede directamente al token endpoint para intercambiar grants por tokens. Esta separación crea dos canales: front-channel, expuesto al navegador, historial, extensiones y redireccionamientos; y back-channel, protegido por TLS y utilizado para solicitudes directas entre el cliente y el authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Los endpoints opcionales amplían la operación y la interoperabilidad. La introspección permite al resource server consultar el estado de un token. La revocación le permite invalidar refresh tokens y, según la implementación, access tokens. PAR recibe los parámetros de autorización por adelantado a través del back-channel. Los metadata describen el issuer, los endpoints, los métodos de autenticación, los algoritmos y las capacidades admitidas."
  },
  {
    "kind": "paragraph",
    "text": "Las URL de los endpoints son datos de seguridad. El cliente no debe construirlos mediante concatenación ni aceptar metadata de una fuente que no sea de confianza. El issuer devuelto debe coincidir con el issuer configurado. TLS, la validación del nombre de host y la resolución DNS confiable siguen siendo esenciales porque OAuth protege la autoridad, no reemplaza la seguridad del canal."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Los criterios de valoración tienen diferentes exposiciones y controles.",
    "headers": [
      "Endpoint",
      "canal tipico",
      "Propósito"
    ],
    "rows": [
      [
        "Autorización",
        "front-channel",
        "interacción del usuario y emisión de códigos de autorización."
      ],
      [
        "token",
        "back-channel",
        "intercambio de grants y autenticación de clientes."
      ],
      [
        "Introspection",
        "back-channel",
        "consulta de actividad y atributos de token."
      ],
      [
        "Revocación",
        "back-channel",
        "invalidación del token según la política."
      ],
      [
        "PAR",
        "back-channel",
        "registro protegido de parámetros de autorización."
      ],
      [
        "Metadata",
        "lectura autenticada en fuente",
        "descubrimiento de endpoints y capacidades."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.4 Registro, tipos de clientes y URI de redireccionamiento",
    "id": "16-4-registro-tipos-de-clientes-y-uri-de-redireccionamiento"
  },
  {
    "kind": "paragraph",
    "text": "El registro asocia client_id, URI de redireccionamiento, tipo de aplicación, contactos, claves, métodos de autenticación y grants permitidos. client_id es un identificador público, no un secreto. La seguridad depende del vínculo correcto entre el identificador y las propiedades registradas, especialmente los URI de redireccionamiento y el material criptográfico."
  },
  {
    "kind": "paragraph",
    "text": "Los clientes confidenciales pueden mantener las credenciales bajo control, como aplicaciones o servicios web backend. Los clientes públicos se ejecutan en entornos donde el usuario o atacante puede extraer el software y sus valores, como SPA y aplicaciones nativas. Insertar client_secret en un JavaScript, un paquete móvil o una aplicación distribuida no hace que el cliente sea confidencial; el secreto se vuelve copiable."
  },
  {
    "kind": "paragraph",
    "text": "El URI de redireccionamiento debe compararse mediante una coincidencia exacta, excepto en el caso de reglas muy específicas para el bucle invertido de la aplicación nativa. Los comodines, la coincidencia de prefijos y los redirectores abiertos permiten omitir códigos. Cada entorno debe tener sus propios URI y la aplicación debe validar la ruta de retorno antes de iniciar cualquier sesión local."
  },
  {
    "kind": "subhead",
    "text": "Secreto público del cliente"
  },
  {
    "kind": "paragraph",
    "text": "Un valor integrado en un SPA, una aplicación móvil o un binario distribuido debe considerarse público. La protección adecuada proviene de PKCE, URI de redireccionamiento estricto, sistema operativo, BFF cuando corresponda y restricción de token, no de intentar ocultar un client_secret."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.5 Grants, flujos y tipos de tokens",
    "id": "16-5-grants-flujos-y-tipos-de-tokens"
  },
  {
    "kind": "paragraph",
    "text": "Grant es la representación de una autorización utilizada por el cliente para obtener un access token. El authorization code, el refresh token, las Client Credentials y el código del dispositivo son ejemplos. “Flujo” describe la secuencia completa de interacciones. Confundir concesión con token conduce a registros y políticas inexactas: el authorization code es corto, de un solo uso y está destinado al token endpoint; el access token se presenta a la API."
  },
  {
    "kind": "paragraph",
    "text": "El access token representa la autoridad para un resource server. El refresh token le permite solicitar nuevos access tokens y debe estar restringido al authorization server. El ID token pertenece a OpenID Connect y comunica datos sobre la autenticación al cliente; no debe utilizarse como access token. Cada artefacto tiene un destinatario, vida útil y protección diferente."
  },
  {
    "kind": "paragraph",
    "text": "Las antiguas Resource Owner Password Credentials y Implicit Grant no se deben elegir para proyectos nuevos. El primero expone tokens en el front-channel y ha perdido su justificación con PKCE; el segundo entrega las credenciales de usuario al cliente e impide muchos controles modernos. Las migraciones deben priorizar el Authorization Code con PKCE o flujos apropiados de máquina a máquina."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Los artefactos no son intercambiables.",
    "headers": [
      "artefacto",
      "Destinatario",
      "Propiedad operativa"
    ],
    "rows": [
      [
        "Authorization code",
        "token endpoint",
        "URI/PKCE corto, de un solo uso y vinculado al cliente/redireccionamiento."
      ],
      [
        "Access token",
        "resource server",
        "autoridad temporal, audience y scope."
      ],
      [
        "Refresh token",
        "authorization server",
        "credencial de relativa larga duración; Requiere protección y rotación."
      ],
      [
        "ID token",
        "Cliente OIDC",
        "afirmación sobre autenticación, no credencial API genérica."
      ],
      [
        "device_code",
        "token endpoint",
        "sondeo controlado para dispositivos limitados."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/figure-02.svg",
    "alt": "Authorization Code con PKCE utilizando el front-channel y el canal posterior",
    "caption": "Figura 2: PKCE vincula el intercambio del authorization code a una prueba creada por el cliente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.6 Authorization Code en profundidad",
    "id": "16-6-authorization-code-en-profundidad"
  },
  {
    "kind": "paragraph",
    "text": "El cliente crea una solicitud de autorización que contiene los parámetros response_type=code, client_id, redirect_uri, scope, estado y PKCE. El navegador se redirige al authorization server, donde se puede autenticar al usuario y evaluar la política. Si tiene éxito, el authorization server devuelve un authorization code para el URI de redireccionamiento registrado."
  },
  {
    "kind": "paragraph",
    "text": "El cliente recibe el código y lo intercambia en el token endpoint. Esta solicitud directa incluye grant_type=authorization_code, código, redirect_uri y code_verifier. Los clientes confidenciales también se autentican. El servidor verifica el uso único, el plazo, el cliente, el URI de redireccionamiento y PKCE antes de emitir tokens."
  },
  {
    "kind": "paragraph",
    "text": "El código no debe tener autoridad reutilizable ni enviarse a API. Existe para reducir la exposición del token en el front-channel y permitir validaciones en el canal posterior. Los registros, las herramientas de análisis, las páginas de error y las referencias no deben registrar el valor. Después del cambio, la aplicación debe eliminar los parámetros confidenciales de la URL y establecer su propio estado de sesión de forma segura."
  },
  {
    "kind": "subhead",
    "text": "Solicitud de autorización - valores ilustrativos"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=portal-pagos\n  &redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n  &scope=pagos.read%20pagos.write\n  &state=valor-aleatorio\n  &code_challenge=base64url-sha256-verifier\n  &code_challenge_method=S256"
  },
  {
    "kind": "subhead",
    "text": "Intercambio de código por tokens"
  },
  {
    "kind": "code",
    "text": "POST /token\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code\n&code=AUTHORIZATION_CODE\n&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n&client_id=portal-pagos\n&code_verifier=SECRETO_ALEATORIO_DE_LA_INSTANCIA"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.7 PKCE y protección de interceptación",
    "id": "16-7-pkce-y-proteccion-de-interceptacion"
  },
  {
    "kind": "paragraph",
    "text": "PKCE comienza con un code_verifier aleatorio, de alta entropía y exclusivo de prueba. El cliente calcula code_challenge = BASE64URL(SHA256(code_verifier)) y envía el desafío al endpoint de autorización. Al cambiar el código, muestra el verificador original. El authorization server vuelve a calcular el desafío y requiere una coincidencia."
  },
  {
    "kind": "paragraph",
    "text": "Si un atacante intercepta el authorization code, no podrá intercambiarlo sin el verificador. Se debe utilizar el método S256; Plain existe para una compatibilidad restringida y no ofrece la misma protección contra la observación que la impugnación. PKCE no reemplaza el estado, el URI de redireccionamiento exacto, TLS ni la autenticación de confidential client. Resuelve una amenaza específica: la interceptación e inyección de códigos de autorización."
  },
  {
    "kind": "paragraph",
    "text": "También se debe exigir PKCE a los clientes confidenciales cuando utilicen el Authorization Code. Además de estandarizar el flujo, protege contra ataques en los que se inyecta código obtenido en otro contexto en la sesión del cliente. El verificador no se debe reutilizar y debe estar asociado con la misma transacción que contiene el URI de estado y de redireccionamiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: PKCE es una prueba por transacción, no una credencial permanente.",
    "headers": [
      "Elemento",
      "donde aparece",
      "Requisito"
    ],
    "rows": [
      [
        "code_verifier",
        "solicitud de token",
        "aleatorio, secreto durante la transacción y no reutilizado."
      ],
      [
        "code_challenge",
        "solicitud de autorización",
        "derivado del verificador por S256."
      ],
      [
        "code_challenge_method",
        "solicitud de autorización",
        "S256 para sistemas nuevos."
      ],
      [
        "vínculo",
        "estado del cliente",
        "Mismo intento, client_id, redirect URI y código."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.8 State, nonce, issuer y protección contra mix-up",
    "id": "16-8-state-nonce-issuer-y-proteccion-contra-mix-up"
  },
  {
    "kind": "paragraph",
    "text": "El estado vincula la respuesta de autorización a la sesión que inició la solicitud y ayuda a prevenir CSRF. Debe ser impredecible, de un solo uso y asociado localmente con el issuer, el URI de redireccionamiento, el PKCE y la intención del usuario. Tratar el estado únicamente como una URL de retorno firmada puede dejar la sesión sin la protección adecuada contra respuestas no solicitadas."
  },
  {
    "kind": "paragraph",
    "text": "Nonce pertenece a OpenID Connect y vincula el ID token a la solicitud de autenticación. No reemplaza al estado para asegurar el flujo de OAuth. En clientes que usan OIDC, es posible que se requieran ambos: el estado protege la redirección y el nonce se valida dentro del token de ID."
  },
  {
    "kind": "paragraph",
    "text": "Los ataques de mix-up de authorization server explotan a los clientes que hablan con varios issuers y no vinculan la respuesta al issuer correcto. El cliente debe utilizar metadata confiables, validar el parámetro iss cuando sea compatible y enviar el código solo al token endpoint del issuer asociado con la transacción. Nunca seleccione el token endpoint basándose en datos de respuesta no validados."
  },
  {
    "kind": "subhead",
    "text": "Estado transaccional mínimo"
  },
  {
    "kind": "paragraph",
    "text": "Almacene, tentativamente: issuer esperado, client_id, URI de redireccionamiento, estado, code_verifier, nonce cuando hay OIDC, scopes solicitados y tiempo. Consume el registro una vez y caduca rápidamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.9 Autenticación de clientes confidenciales",
    "id": "16-9-autenticacion-de-clientes-confidenciales"
  },
  {
    "kind": "paragraph",
    "text": "El token endpoint debe distinguir al cliente que presenta la concesión. client_secret_basic es simple, pero se basa en un transporte secreto y seguro simétrico. client_secret_post coloca el secreto en el cuerpo y aumenta el riesgo de registro; debe evitarse cuando se admite el método básico. Los secretos necesitan almacenamiento en bóveda, rotación, propiedad y scope por entorno."
  },
  {
    "kind": "paragraph",
    "text": "private_key_jwt utiliza una aserción JWT firmada por la clave privada del cliente. El authorization server valida issuer/sujeto, audience, vencimiento, identificador único y firma. La clave privada no se envía y JWKS puede gestionar la rotación. El mecanismo requiere prevención de reproducción jti y una validación estricta de la audience del token endpoint."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación del cliente mTLS vincula la autenticación al certificado presentado en la conexión TLS. Puede utilizar PKI tradicional o certificado registrado. En entornos con proxies, debe quedar claro dónde termina TLS y cómo se preserva la identidad del certificado. La autenticación sólida del cliente no elimina la necesidad de PKCE en el Authorization Code."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - El método debe corresponder a la capacidad real del cliente.",
    "headers": [
      "Método",
      "Materiales",
      "ventaja",
      "Precaución"
    ],
    "rows": [
      [
        "client_secret_basic",
        "secreto simétrico",
        "amplio apoyo",
        "rotación, registros y uso compartido."
      ],
      [
        "private_key_jwt",
        "clave privada",
        "no envía secretos; buena automatización",
        "jti, audience y rotación de JWKS."
      ],
      [
        "Autenticación de cliente mTLS",
        "certificado y clave",
        "fuerte conexión con el canal",
        "Terminación TLS y ciclo de certificados."
      ],
      [
        "ninguno",
        "sin autenticación",
        "Apto para clientes públicos.",
        "Requiere PKCE y URI de redireccionamiento seguro."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.10 Aplicaciones web, SPA, nativas y BFF",
    "id": "16-10-aplicaciones-web-spa-nativas-y-bff"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones web tradicionales mantienen el código y las credenciales en el servidor. El navegador solo recibe una cookie de sesión protegida, mientras que el backend ejecuta el authorization code, almacena tokens y llama a las API. Esta separación reduce la exposición de los tokens a JavaScript, pero requiere protección contra CSRF, fijación, XSS y robo de sesiones."
  },
  {
    "kind": "paragraph",
    "text": "Las SPA son clientes públicos. El authorization code con PKCE es el flujo moderno, pero los access tokens almacenados en el navegador todavía están expuestos a XSS y extensiones. Un Backend para Frontend puede recibir el código, mantener tokens en el servidor y exponer solo cookies HttpOnly, Secure y SameSite al navegador. BFF agrega estado e infraestructura pero reduce la huella del token."
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones nativas utilizan navegadores externos y redirigen URI según enlaces de aplicaciones, enlaces universales, esquemas personalizados o loopback. Las vistas web integradas degradan la seguridad y la experiencia de SSO. El sistema debe evitar que otra aplicación capture el URI de redireccionamiento y siempre combinar el mecanismo de devolución con PKCE."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La arquitectura cambia donde se expone el token.",
    "headers": [
      "Tipo",
      "Clasificación",
      "Almacenamiento preferido",
      "Flujo"
    ],
    "rows": [
      [
        "Web con backend",
        "confidencial",
        "tokens en el servidor; cookie de sesión del navegador",
        "Authorization Code + PKCE."
      ],
      [
        "puro SPA",
        "publico",
        "memoria cuando sea posible; minimizar la persistencia",
        "Authorization Code + PKCE."
      ],
      [
        "SPA con mejor amiga",
        "mejor amiga confidencial",
        "tokens en BFF; cookie protegida",
        "Authorization Code + PKCE."
      ],
      [
        "Aplicación nativa",
        "publico",
        "almacenamiento seguro del sistema",
        "Authorization Code + PKCE y navegador externo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.11 Client Credentials",
    "id": "16-11-client-credentials"
  },
  {
    "kind": "paragraph",
    "text": "Las Client Credentials se utilizan cuando el cliente actúa por cuenta propia, sin un propietario de recurso humano en la transacción. El cliente se autentica en el token endpoint y recibe un access token asociado con la identidad de la aplicación. Es adecuado para servicios, trabajos y automatizaciones que tengan sus propios permisos."
  },
  {
    "kind": "paragraph",
    "text": "Grant no debe usarse para simular usuarios ni transportar user_id arbitrario. La autorización debe basarse en el principal de la aplicación, su tenant, propietario y los permisos de la aplicación. Si un servicio necesita preservar el contexto del usuario al llamar a otro, es más adecuado el Token Exchange o on-behalf-of."
  },
  {
    "kind": "paragraph",
    "text": "Dado que el token puede abrir un acceso amplio, las credenciales estáticas deben reemplazarse con private_key_jwt, mTLS, identidad administrada o federación de cargas de trabajo cuando sea posible. Los scopes de aplicación deben separarse de los scopes delegados para evitar que un token exclusivo de aplicación se confunda con la autoridad del usuario."
  },
  {
    "kind": "subhead",
    "text": "Client Credentials: ejemplo conceptual"
  },
  {
    "kind": "code",
    "text": "POST /token\nAuthorization: Basic base64(client_id:client_secret)\nContent-Type: application/x-www-form-urlencoded\ngrant_type=client_credentials\n&scope=liquidaciones.process"
  },
  {
    "kind": "subhead",
    "text": "Pregunta de revisión"
  },
  {
    "kind": "paragraph",
    "text": "Si la operación necesita saber “¿qué usuario autorizó?”, las Client Credentials por sí solas no proporcionan esa respuesta. Lo principal es la aplicación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.12 Device Authorization Grant",
    "id": "16-12-device-authorization-grant"
  },
  {
    "kind": "paragraph",
    "text": "La Device Authorization Grant admite dispositivos con entrada limitada o sin un navegador conveniente. El cliente solicita device_code y user_code, presenta al usuario un verification_uri y comienza a sondear el token endpoint. El usuario completa la autenticación y autorización en otro dispositivo compatible con navegador."
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe respetar el intervalo, expires_in y errores como authorization_pending y slow_down. El sondeo agresivo crea carga y puede provocar bloqueos. El user_code debe ser lo suficientemente corto para escribirlo, pero protegido por limitación de velocidad, caducidad y vinculación al device_code de alta entropía."
  },
  {
    "kind": "paragraph",
    "text": "El flujo no debe usarse como acceso directo para aplicaciones que ya tienen un navegador adecuado. La interfaz debe mostrar claramente qué dispositivo y operación se está autorizando, reduciendo los ataques de phishing en los que la víctima ingresa un código enviado por un tercero."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: el flujo separa el dispositivo solicitante del canal de autenticación.",
    "headers": [
      "paso",
      "artefacto",
      "controlar"
    ],
    "rows": [
      [
        "Inicio",
        "device_code + user_code",
        "device_code secreto; user_code corto y caducable."
      ],
      [
        "Interacción",
        "verificación_uri",
        "mostrar el contexto del cliente y prevenir el phishing."
      ],
      [
        "sondeo",
        "device_code",
        "respetar el intervalo y la desaceleración."
      ],
      [
        "Conclusión",
        "access token/actualización",
        "vincularse al cliente y a la política aprobada."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/figure-03.svg",
    "alt": "Ciclo de vida de grants, access tokens y refresh tokens",
    "caption": "Figura 3: Los tokens tienen diferentes ciclos de vida y decisiones de revocación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.13 Refresh tokens, rotación y reutilización",
    "id": "16-13-refresh-tokens-rotacion-y-reutilizacion"
  },
  {
    "kind": "paragraph",
    "text": "El refresh token es una credencial de alto valor porque le permite obtener nuevos access tokens sin repetir toda la interacción. Solo debe enviarse al token endpoint, protegerse en un almacenamiento adecuado y limitarse al cliente y la autorización original. Los access tokens cortos reducen la exposición; Los refresh tokens mantienen una continuidad controlada."
  },
  {
    "kind": "paragraph",
    "text": "Para los clientes públicos, BCP recomienda refresh tokens rotados o restringidos por el remitente. En rotación, cada uso produce un nuevo refresh token e invalida el anterior. Si vuelve a aparecer un token antiguo, el servidor detecta un posible robo y revoca la familia o autorización correspondiente. La implementación debe manejar la simultaneidad y las respuestas perdidas sin crear falsos positivos."
  },
  {
    "kind": "paragraph",
    "text": "Se deberá definir caducidad absoluta, caducidad por inactividad, revocación por cierre de sesión, cambio de contraseña, retirada del consentimiento y riesgo. El “refresh token nunca caduca” transfiere todo el control a la revocación perfecta, algo difícil en los sistemas distribuidos. El cliente debe tratar invalid_grant como una necesidad de reautorización, no como un motivo para repetir indefinidamente."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: El refresh token necesita su propia política.",
    "headers": [
      "controlar",
      "Objetivo",
      "Decisión operativa"
    ],
    "rows": [
      [
        "Rotación",
        "detectar reutilización",
        "revocar la familia y registrar el incidente cuando reaparezca el token antiguo."
      ],
      [
        "Restricción del remitente",
        "unirse a una clave",
        "validar mTLS/DPoP en cada renovación."
      ],
      [
        "Caducidad absoluta",
        "limitar la duración total",
        "requerir una nueva autorización después de un período definido."
      ],
      [
        "Inactividad",
        "cerrar autorizaciones abandonadas",
        "renovarse sólo mientras exista un uso legítimo."
      ],
      [
        "Revocación",
        "responder al riesgo y al cierre",
        "propagar rápidamente y auditar el motivo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.14 Access tokens, scopes, audience e indicadores de recursos",
    "id": "16-14-access-tokens-scopes-audience-e-indicadores-de-recursos"
  },
  {
    "kind": "paragraph",
    "text": "El access token solo debe ser aceptado por el resource server para el cual fue emitido. Una amplia audience convierte un token en un pase reutilizable entre API. Los indicadores de recursos permiten al cliente declarar el recurso deseado durante la autorización o la solicitud de token, lo que ayuda al authorization server a emitir tokens específicos."
  },
  {
    "kind": "paragraph",
    "text": "El scope representa la autoridad solicitada y concedida, pero su semántica debe estar documentada. Los scopes como lectura y escritura son simples, pero pueden resultar ambiguos en plataformas grandes. Los nombres de dominio, operación y recursos ayudan: pagos.read, pagos.create y conciliacao.execute. El scope no reemplaza la autorización de estado de objeto, tenant o dominio."
  },
  {
    "kind": "paragraph",
    "text": "El resource server valida la audience, el scope y el contexto de la solicitud. Una API no debería aceptar un token porque contiene \"admin\" sin verificar el issuer, el tipo y el origen del claim. Los claims de autorización deben tener gobernanza: quién las emite, cuándo cambian, cómo se revocan y qué servicio tiene autoridad para interpretarlas."
  },
  {
    "kind": "subhead",
    "text": "Indicador de recursos: ejemplo conceptual"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=app\n  &resource=https%3A%2F%2Fapi.pagos.example\n  &scope=pagos.read"
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - La validación técnica y la autorización comercial son complementarias.",
    "headers": [
      "Elemento",
      "Pregunta de validación"
    ],
    "rows": [
      [
        "audience",
        "¿Se emitió este token para esta API o API Gateway?"
      ],
      [
        "scope",
        "¿La autoridad otorgada incluye la operación?"
      ],
      [
        "sujeto/cliente",
        "¿Quién es el mandante y qué aplicación opera?"
      ],
      [
        "tenant",
        "¿El principal y el recurso pertenecen al contexto permitido?"
      ],
      [
        "token type",
        "¿Es el artefacto un access token esperado, no un ID token u otro JWT?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.15 Tokens opacos, introspección y revocación",
    "id": "16-15-tokens-opacos-introspeccion-y-revocacion"
  },
  {
    "kind": "paragraph",
    "text": "El token opaco no revela la estructura al cliente o al resource server. La API consulta el authorization server mediante introspección o utiliza un estado local distribuido. Este enfoque facilita la revocación inmediata y minimiza la exposición de claims, pero crea dependencias en la disponibilidad, latencia, autenticación de API y política de cache."
  },
  {
    "kind": "paragraph",
    "text": "La introspección devuelve atributos activos y autorizados para el solicitante. active=false debería ser una respuesta normal para un token no válido, caducado, revocado o desconocido, sin revelar detalles. El endpoint necesita autenticar los servidores de recursos y limitar los datos que cada uno puede consultar. La caché reduce la carga, pero aumenta la ventana entre la revocación y la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "La revocación permite al cliente solicitar la invalidación. La respuesta exitosa no debería revelar si el token existía. La revocación del refresh token normalmente cancela la capacidad de renovación; Los access tokens ya emitidos pueden continuar hasta que caduquen si son autónomos. Las arquitecturas de alto riesgo combinan eventos TTL cortos, introspección, revocación o lista de denegados."
  },
  {
    "kind": "subhead",
    "text": "Introspección - ejemplo simplificado"
  },
  {
    "kind": "code",
    "text": "POST /introspect\nAuthorization: Basic <credencial-del-resource-server>\nContent-Type: application/x-www-form-urlencoded\ntoken=TOKEN_OPACO\nHTTP/1.1 200 OK\n{\n  \"active\": true,\n  \"client_id\": \"portal\",\n  \"scope\": \"pagos.read\",\n  \"exp\": 1770000000\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.16 Access tokens y validación de JWT",
    "id": "16-16-access-tokens-y-validacion-de-jwt"
  },
  {
    "kind": "paragraph",
    "text": "JWT permite que el resource server valide firmas y claims localmente, lo que reduce las llamadas al authorization server. El perfil del access token JWT estandariza las claims y los tipos útiles, pero la API aún necesita conocer el issuer, la audience, los algoritmos y las claves confiables. La decodificación de Base64URL no se valida."
  },
  {
    "kind": "paragraph",
    "text": "La validación debe corregir los algoritmos permitidos, localizar la clave indicada por kid en JWKS confiable, verificar la firma, el issuer, la audience, el vencimiento, no antes, cuando esté presente y el tipo esperado. El resource server debe rechazar los tokens emitidos para otros usos, incluso si la misma clave firma tokens de identificación. Las reglas de tipo y perfil ayudan a evitar confusiones entre los tipos de JWT."
  },
  {
    "kind": "paragraph",
    "text": "La rotación de claves requiere cache y actualización controlada. Cuando aparece un kid desconocido, la API Gateway puede actualizar JWKS, pero no debe permitir que el token apunte a una URL de clave arbitraria. La falla temporal de los metadata no debería invalidar inmediatamente todas las claves que aún son confiables; al mismo tiempo, el exceso de caché retrasa la eliminación de la clave comprometida."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - La firma válida es solo uno de los controles.",
    "headers": [
      "Validación",
      "No evitar"
    ],
    "rows": [
      [
        "firma y algoritmo fijo",
        "token alterado o confusión de algoritmo."
      ],
      [
        "issuer exacto",
        "token de dominio que no es de confianza."
      ],
      [
        "audience",
        "reutilizar en otra API."
      ],
      [
        "exp/nbf/reloj",
        "utilizar fuera de la ventana permitida."
      ],
      [
        "tipo/perfil",
        "confusión entre access token, ID token y otros JWT."
      ],
      [
        "scopes y claims",
        "operación más allá de la autoridad otorgada."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Contenido no cifrado"
  },
  {
    "kind": "paragraph",
    "text": "Un JWT firmado normalmente protege la integridad, no la confidencialidad. Evite PII y datos innecesarios. El token pasa por clientes, servidores proxy, API Gateways, herramientas y registros; trátelo como una credencial confidencial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.17 Consentimiento, least privilege y Rich Authorization Requests",
    "id": "16-17-consentimiento-least-privilege-y-rich-authorization-requests"
  },
  {
    "kind": "paragraph",
    "text": "El consentimiento es una interfaz de decisión, no un sustituto de la política. En entornos corporativos, algunos permisos son aprobados por administradores o contratos, mientras que otros dependen del usuario. La pantalla debe identificar cliente, datos, acciones, duración y consecuencias, evitando scopes técnicos incomprensibles."
  },
  {
    "kind": "paragraph",
    "text": "El privilegio mínimo comienza con la definición de scopes y continúa en el resource server. Solicitar todos los scopes “para evitar nuevos consentimientos” aumenta el impacto de las filtraciones. La autorización incremental le permite solicitar autoridad adicional solo cuando se utiliza la funcionalidad. El authorization server puede otorgar un subconjunto y el cliente debe verificar la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Las Rich Authorization Requests representan detalles estructurados como monto, moneda, cuenta y tipo de transacción. Esto permite autorizaciones más precisas que las cadenas de scope, especialmente en pagos y datos financieros. El objeto de autorización debe ser validado, firmado o protegido según el perfil adoptado y no debe ser aceptado como dato gratuito enviado por el cliente a la API."
  },
  {
    "kind": "subhead",
    "text": "Rich Authorization Request: ejemplo de enseñanza"
  },
  {
    "kind": "code",
    "text": "{\n  \"authorization_details\": [{\n    \"type\": \"payment_initiation\",\n    \"instructedAmount\": {\"currency\": \"BRL\", \"amount\": \"150.00\"},\n    \"creditorAccount\": {\"iban\": \"EJEMPLO\"}\n  }]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.18 PAR, JAR y JARM",
    "id": "16-18-par-jar-y-jarm"
  },
  {
    "kind": "paragraph",
    "text": "Pushed Authorization Requests permiten al cliente enviar parámetros al authorization server a través del back-channel y recibir request_uri de corta duración. El navegador sólo lleva la referencia. Esto reduce la manipulación, la exposición y la longitud de la URL y permite la autenticación del cliente antes de la interacción del usuario."
  },
  {
    "kind": "paragraph",
    "text": "JWT-Secured Authorization Request representa la solicitud en un JWT firmado y, opcionalmente, cifrado. El authorization server valida la integridad y el origen de los parámetros. PAR y JAR se pueden combinar: el cliente envía un objeto de solicitud firmado al endpoint PAR y utiliza request_uri en el endpoint de autorización."
  },
  {
    "kind": "paragraph",
    "text": "JARM protege la respuesta de autorización en un JWT firmado o cifrado. En lugar de depender únicamente de parámetros vagos en la redirección, el cliente valida el issuer, la audience, la firma y el tiempo. Estos mecanismos aumentan la complejidad y la gestión de claves, por lo que son más comunes en perfiles financieros, ecosistemas regulados e integraciones de alto riesgo."
  },
  {
    "kind": "table",
    "caption": "Tabla 11 - Mecanismos de protección de las diferentes etapas del frente-canal.",
    "headers": [
      "Mecanismo",
      "Protege",
      "Beneficio"
    ],
    "rows": [
      [
        "PAR",
        "enviando parámetros",
        "back-channel autenticado y URL acortada."
      ],
      [
        "JAR",
        "solicitar contenido",
        "integridad, origen y posible confidencialidad."
      ],
      [
        "JARM",
        "respuesta de autorización",
        "firma verificable, issuer y audience."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/figure-04.svg",
    "alt": "Comparación entre token de portador y token restringido por remitente",
    "caption": "Figura 4: La proof-of-possession reduce la utilidad de un token copiado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.19 Sender-constrained tokens con mTLS y DPoP",
    "id": "16-19-sender-constrained-tokens-con-mtls-y-dpop"
  },
  {
    "kind": "paragraph",
    "text": "El token al portador funciona como dinero al portador: quien obtiene el valor puede presentarlo. El token restringido por el remitente vincula el access token a una clave de cliente. El resource server requiere, además del token, la correspondiente proof-of-possession. El objetivo es reducir la replay después de fugas en registros, servidores proxy, memoria o canales laterales."
  },
  {
    "kind": "paragraph",
    "text": "Con mTLS, el authorization server asocia el token con el certificado del cliente y el resource server verifica el certificado presentado en la conexión. El claim cnf puede cargar la huella digital. La arquitectura debe garantizar que la API observe la identidad TLS correcta incluso cuando haya equilibradores de carga o API Gateways que terminen las conexiones."
  },
  {
    "kind": "paragraph",
    "text": "DPoP utiliza un JWT de prueba firmado por el cliente en cada solicitud, que contiene el método HTTP, URI, hora, identificador único y enlace al access token. La API valida firma, htm, htu, iat, jti, key y ath. DPoP es una protección de la capa de aplicación y no reemplaza a TLS. El nonce del servidor y el caché jti pueden fortalecer la defensa de replay según el riesgo."
  },
  {
    "kind": "table",
    "caption": "Tabla 12 - La elección depende del cliente, la infraestructura y el riesgo.",
    "headers": [
      "Mecanismo",
      "vínculo",
      "punto fuerte",
      "Desafío"
    ],
    "rows": [
      [
        "mTLS",
        "certificado de conexión",
        "fuerte para clientes y servicios controlados",
        "proxy, PKI y terminación TLS."
      ],
      [
        "DPoP",
        "clave y prueba bajo petición",
        "aplicable sin certificado de cliente",
        "Validación de URI, reloj, jti y clave."
      ],
      [
        "Portador",
        "ninguno",
        "simplicidad y compatibilidad",
        "replay después de la copia del token."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.20 Token Exchange y on-behalf-of",
    "id": "16-20-token-exchange-y-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "En las arquitecturas de servicios, es posible que el primer backend necesite llamar a otro manteniendo parte de la autoridad original. Reenviar el mismo access token a todos los servicios amplía las audiences y expone la credencial. Token Exchange le permite intercambiar un token sujeto por otro token apropiado para el siguiente recurso."
  },
  {
    "kind": "paragraph",
    "text": "El nuevo token puede representar al usuario, al servicio del actor o a ambos. Los claims de actor ayudan a registrar la cadena. La política debe limitar qué clientes pueden intercambiar tokens, qué audiences pueden solicitarse y qué scopes pueden conservarse. El intercambio no debe elevar el privilegio más allá del token de entrada y la autoridad del actor."
  },
  {
    "kind": "paragraph",
    "text": "On-behalf-of es una implementación de delegación en la que un servicio actúa on-behalf-ofl usuario. Los registros deben preservar el usuario, el cliente inicial, el servicio intermedio y la autorización efectiva. Si una llamada pasa por varios dominios de confianza, cada salto debe tratarse como una nueva decisión, no como una simple copia de los headers."
  },
  {
    "kind": "table",
    "caption": "Tabla 13 - Preservar el contexto sin reutilizar indiscriminadamente la autoridad.",
    "headers": [
      "Estrategia",
      "ventaja",
      "Riesgo"
    ],
    "rows": [
      [
        "Reenviar token original",
        "sencillo",
        "amplia audience, fugas y acoplamiento."
      ],
      [
        "Token Exchange",
        "token específico por salto",
        "complejidad y correlación de las políticas."
      ],
      [
        "Sólo credencial de servicio",
        "separa el backend",
        "Pierde el contexto del usuario cuando es necesario."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.21 Metadata del authorization server y recurso protegido",
    "id": "16-21-metadata-del-authorization-server-y-recurso-protegido"
  },
  {
    "kind": "paragraph",
    "text": "Los metadata del authorization server publican issuers, endpoints, métodos de autenticación, grants, scopes y algoritmos. Los clientes deben obtener el documento fuente configurado y validar la coherencia entre el issuer y la URL. Los metadata simplifican la rotación y la interoperabilidad, pero no deberían convertir el descubrimiento en confianza automática."
  },
  {
    "kind": "paragraph",
    "text": "Los metadata de recursos protegidos permiten que una API publique identificadores de recursos, servidores de autorización relacionados, scopes y métodos de presentación admitidos. Esto ayuda a los clientes y servidores de autorización a comprender cómo obtener tokens para un recurso y mejora los desafíos de WWW-Authenticate."
  },
  {
    "kind": "paragraph",
    "text": "Los metadata deben ser versionados y monitoreados como parte de la plataforma. Los cambios en el endpoint, el algoritmo o el issuer pueden dañar a todos los clientes. La caché debe respetar la disponibilidad sin congelar la configuración indefinidamente. Los entornos interno, externo y de homologación deben tener documentos separados para evitar la mezcla de confianza."
  },
  {
    "kind": "subhead",
    "text": "Metadata del authorization server: extracto ilustrativo"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"code_challenge_methods_supported\": [\"S256\"]\n}"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/es/figure-05.svg",
    "alt": "OAuth en arquitectura empresarial con API Gateway y backend",
    "caption": "Figura 5 - La API Gateway actúa como control transversal; La autorización del dominio permanece en el backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.22 OAuth en API Gateways, Axway y Azure",
    "id": "16-22-oauth-en-api-gateways-axway-y-azure"
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways pueden validar access tokens, consultar introspección, requerir scopes, imponer cuotas por client_id y propagar contexto confiable. Antes de insertar headers internos, la API Gateway debe eliminar las versiones proporcionadas por el cliente. El backend debe aceptar estos headers solo desde una conexión autenticada proveniente de la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, validate-jwt y validate-azure-ad-token pueden validar tokens antes del backend. Las políticas pueden requerir issuer, audience y claims, mientras que la authentication-managed-identity permite que la API Gateway obtenga un token para un backend compatible. La configuración del portal para desarrolladores para OAuth facilita las pruebas, pero no reemplaza la aplicación de políticas."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, los filtros y servicios de OAuth pueden implementar políticas de authorization server, validación de tokens, autenticación de clientes y servidores de recursos. La topología necesita registrar qué componentes emiten, qué validaciones, dónde se almacenan las claves y cómo se manejan la revocación y la rotación. A medida que cambien las versiones y las licencias, valide la documentación del producto instalado."
  },
  {
    "kind": "subhead",
    "text": "Administración de API de Azure: política conceptual"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences><audience>api://pagos</audience></audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\"><value>pagos.read</value></claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "División de responsabilidad"
  },
  {
    "kind": "paragraph",
    "text": "El gateway valida issuer, audience, firma, tiempo, scopes y requisitos transversales. El backend continúa verificando el tenant, la propiedad, el estado de la transacción, los límites comerciales y la autorización de objetos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.23 Amenazas y hardening",
    "id": "16-23-amenazas-y-hardening"
  },
  {
    "kind": "paragraph",
    "text": "PKCE reduce la interceptación del authorization code. CSRF y el inicio de sesión CSRF requieren vínculo de state y transaccional. La confusión requiere asociación al issuer. La manipulación del URI de redireccionamiento requiere una comparación exacta. La fuga de tokens requiere TLS, higiene de registros, headers correctos, almacenamiento seguro y reducción de TTL. El token replay puede requerir una sender constraint."
  },
  {
    "kind": "paragraph",
    "text": "Los redirectores abiertos en el cliente o en el authorization server aumentan la omisión de código. Referer, el historial y analytics pueden capturar parámetros del front-channel. Los tokens de query string se filtran fácilmente y no deben usarse como forma normal de presentación. Los access tokens deben seguir el header Authorization y las respuestas necesitan un Cache-Control adecuado."
  },
  {
    "kind": "paragraph",
    "text": "Los servidores de autorización deben proteger los endpoints contra la fuerza bruta, el credential stuffing, la request flooding y el abuso de user_code. Los clientes deben validar todas las respuestas y no mostrar detalles internos. Los servidores de recursos deben limitar los algoritmos, validar audiences y no confiar en claims sin espacio de nombres ni gobernanza. Cada implementación requiere un inventario de clientes, propietarios, grants, URI de redireccionamiento y claves."
  },
  {
    "kind": "table",
    "caption": "Tabla 14 - Los controles deben producir evidencia observable.",
    "headers": [
      "Amenaza",
      "control principal",
      "evidencia"
    ],
    "rows": [
      [
        "Intercepción de código",
        "PKCE S256 y código de un solo uso",
        "Fallos y reutilización del verificador."
      ],
      [
        "CSRF/inyección de inicio de sesión",
        "estado vinculado a la sesión",
        "estado ausente, divergente o consumido."
      ],
      [
        "AS mix-up",
        "issuer vinculado y metadata",
        "issuer de respuesta y token endpoint utilizados."
      ],
      [
        "Replay de tokens",
        "TTL, mTLS/DPoP y detección",
        "jti, huella digital y origen."
      ],
      [
        "Actualizar robo de tokens",
        "detección de rotación y reutilización",
        "Familia revocada y evento de riesgo."
      ],
      [
        "Abuso de redirección",
        "comparación exacta y sin redirección abierta",
        "URI registrado y URI recibido."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Prácticas desaconsejadas"
  },
  {
    "kind": "paragraph",
    "text": "No utilice credenciales de contraseña de propietario de recurso o de Implicit Grant en proyectos nuevos. No almacene client_secret en el public client. No acepte URI de redireccionamiento por prefijo. No trate el ID token como un access token. No acepte JWT sólo porque \"decodifica sin errores\"."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.24 Troubleshooting basada en evidencia",
    "id": "16-24-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico comienza identificando el endpoint y el paso. El error en el endpoint de autorización implica parámetros, sesión, política y URI de redireccionamiento. El error del token endpoint implica autenticación, código, verificador, concesión y reloj del cliente. El error de API implica presentación, validación y autorización. Combinar estos pasos convierte invalid_grant en \"JWT no válido\" o 403 en \"fallo de inicio de sesión\"."
  },
  {
    "kind": "paragraph",
    "text": "Recopile ID de correlación, issuer esperado, client_id, grant_type, URI de redireccionamiento normalizado, scopes, audience, kid, hora y estado sin registrar tokens ni códigos. Compara el reloj de los componentes. Confirme los metadata y JWKS a los que accede el runtime, no solo el cuaderno del operador. En entornos proxy, registre el nombre de host, TLS y el destino real."
  },
  {
    "kind": "paragraph",
    "text": "Para la intermitencia, investigue la rotación de claves, múltiples nodos con cache divergente, authorization code simultáneo o reutilización de refresh tokens, balanceo sin afinidad de sesión y DNS. Reproduzca con un único flujo controlado y tokens sintéticos. Un token puede funcionar en una API Gateway y fallar en otra debido a una configuración o caché diferente."
  },
  {
    "kind": "table",
    "caption": "Tabla 15 - Clasificar el paso antes de cambiar de política.",
    "headers": [
      "error",
      "Hipótesis iniciales",
      "evidencia"
    ],
    "rows": [
      [
        "invalid_request",
        "parámetro faltante, duplicado o incompatible",
        "Solicitud normalizada y metadata."
      ],
      [
        "invalid_client",
        "método, secreto, certificado o afirmación",
        "client_id, método de autenticación, jti y huella digital del certificado."
      ],
      [
        "invalid_grant",
        "código caducado/usado, PKCE, URI de redireccionamiento o actualización revocada",
        "estado de la transacción e historial de uso."
      ],
      [
        "invalid_token",
        "firma, issuer, audience, hora o revocación",
        "código de motivo interno y kid."
      ],
      [
        "insufficient_scope",
        "token válido no se requiere autoridad",
        "scope otorgado y política de operación."
      ],
      [
        "401/403 divergente",
        "diferentes capas respondieron",
        "Vía, servidor, ID de solicitud y registros correlacionados."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Error externo estable; La causa detallada permanece en el registro seguro"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"pagos\",\n  error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://errors.example/oauth/invalid-token\",\n  \"status\": 401,\n  \"correlationId\": \"corr-8f12\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.25 Estudios de casos",
    "id": "16-25-estudios-de-casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - SPA con secreto incorporado"
  },
  {
    "kind": "paragraph",
    "text": "Un SPA envía client_secret en el token de solicitud. El valor es visible en el paquete y cualquier usuario puede copiarlo. La solución es registrar el cliente como público, usar el authorization code con PKCE y el URI de redireccionamiento exacto. Si el riesgo de tokens en el navegador es alto, adopte BFF y esté protegido por cookies."
  },
  {
    "kind": "paragraph",
    "text": "La investigación también verifica CORS, almacenamiento de tokens, XSS, cierre de sesión y renovación. Simplemente eliminar el secreto no resuelve la exposición del refresh token o del access token persistente en localStorage."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: token aceptado por una API incorrecta"
  },
  {
    "kind": "paragraph",
    "text": "Dos API confían en el mismo issuer y clave, pero una de ellas no valida la audience. Se acepta para los pagos un token emitido para informes. La solución es requerir una audience específica y scopes separados. En sistemas críticos, los indicadores de recursos y los tokens de recursos reducen la posibilidad de reutilización cruzada."
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de contratos de seguridad deben enviar tokens válidos a audiences vecinas y esperar el rechazo. Esta verificación negativa debe existir en la API Gateway y en el backend cuando ambos validan los tokens."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: refresh token reutilizado después del tiempo de espera"
  },
  {
    "kind": "paragraph",
    "text": "El cliente utiliza un refresh token, recibe un tiempo de espera y repite la llamada. El primer procesamiento había emitido un nuevo token; la replay parece robo y la familia queda revocada. La solución combina idempotencia operativa, ventana de tolerancia controlada o lógica de cliente que serializa la renovación y maneja las respuestas perdidas."
  },
  {
    "kind": "paragraph",
    "text": "Una tolerancia amplia debilita la detección de reutilización. La decisión debe considerar el riesgo, la red y la capacidad de correlacionar intentos. Los registros deben registrar la familia, el token predecesor, el cliente y el resultado sin almacenar el valor bruto."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4: la API Gateway valida, el backend rechaza"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway acepta el token para su propia audience y lo reenvía al backend, que espera el token destinado a él. La arquitectura debe elegir: el backend confía en el contexto propagado por la API Gateway en un canal autenticado, o la API Gateway obtiene un nuevo token para el backend utilizando una identidad administrada, Client Credentials o Token Exchange."
  },
  {
    "kind": "paragraph",
    "text": "Reenviar el token original solo es correcto cuando el backend es el resource server para esa audience. La decisión debe documentarse en el contrato de seguridad y probarse con múltiples API."
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
    "text": "Laboratorio 1: Authorization Code con PKCE"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Utilice un authorization server de laboratorio o un simulador autorizado.",
      "Generar verificador aleatorio y desafío S256.",
      "Ejecute el flujo correcto y registre solo valores sintéticos.",
      "Repita con el verificador incorrecto, el estado divergente, el código reutilizado y el URI de redireccionamiento modificado.",
      "Clasifique cada error por paso y endpoint."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2: validación de audience y scope"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure dos API con diferentes audiences.",
      "Emita el token para la API A e intente usarlo en la API B.",
      "Falta scope de prueba, caducado y issuer alternativo.",
      "Compare la respuesta externa y el código de motivo interno."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3: introspección y caché"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Utilice tokens de endpoint de introspección y laboratorio opacos.",
      "Mida la latencia sin caché y con caché corto.",
      "Revocar el token y observar la ventana hasta el rechazo.",
      "Documente la decisión entre disponibilidad y velocidad de revocación."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 4: rotación de refresh tokens"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Obtenga un refresh token sintético.",
      "Renovar y confirmar emisión del sucesor.",
      "Reutilice el predecesor y observe la política familiar.",
      "Simula dos renovaciones competidoras y analiza el resultado."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 5: política en la puerta de entrada"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure el issuer, la audience y el scope en la API Gateway del laboratorio.",
      "Prueba de kid desconocido y actualización de JWKS.",
      "Elimine los headers de identidad enviados por el cliente.",
      "Solo propague claims validados y compárelos con la autorización de backend."
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
    "text": "OAuth 2.0 es un marco de delegación. El resource owner, el cliente, el authorization server y el resource server tienen diferentes responsabilidades. El endpoint de autorización y el endpoint de token utilizan canales diferentes, y cada artefacto (código, access token, refresh token y token de ID) tiene su propio destinatario y ciclo de vida."
  },
  {
    "kind": "paragraph",
    "text": "El authorization code con PKCE es la base moderna para aplicaciones basadas en usuarios. PKCE protege contra la interceptación, el estado vincula la transacción, el nonce pertenece al OIDC y el issuer protege a los clientes de múltiples issuers. Los clientes públicos no tienen secretos fiables; Los clientes confidenciales pueden utilizar secret, private_key_jwt o mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Las Client Credentials representan la aplicación, la autorización del dispositivo cumple con la entrada limitada y los refresh tokens requieren restricciones de rotación o del remitente. Los access tokens necesitan una audience y un scope mínimos. Los tokens opacos favorecen el control central; Los JWT favorecen la validación local, pero requieren una verificación completa y gestión de claves."
  },
  {
    "kind": "paragraph",
    "text": "PAR, JAR, JARM y RAR fortalecen las solicitudes y respuestas; mTLS y DPoP reducen la replay; Token Exchange controla la delegación entre servicios. Las API Gateways aplican validación cruzada, mientras que los backends conservan la autorización del dominio. La seguridad depende del inventario, el privilegio mínimo, el URI de redireccionamiento exacto, la higiene del registro, la observabilidad y las pruebas negativas."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 17 profundizará en OpenID Connect: ID token, información de usuario, nonce, acr, amr, autenticación federada, sesiones, cierre de sesión e integración segura de aplicaciones con proveedores de identidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de OAuth 2.0",
    "id": "lista-de-verificacion-de-oauth-2-0"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada cliente tiene un propietario, tipo, URI de redireccionamiento y grants registrados explícitamente.",
      "El authorization code utiliza PKCE S256, incluso para clientes confidenciales.",
      "El estado es aleatorio, de un solo uso y está vinculado al issuer, al URI de redireccionamiento y al verificador.",
      "Los clientes públicos no dependen de client_secret.",
      "Los URI de redireccionamiento utilizan coincidencias exactas y no contienen redirectores abiertos.",
      "Las grants implícitas y de contraseña no se utilizan en proyectos nuevos.",
      "Los access tokens tienen una audience y un scope mínimos.",
      "El ID token no se acepta como access token.",
      "Los refresh tokens tienen rotación, restricción de remitente o política equivalente.",
      "Los JWT validan firma, algoritmo, issuer, audience, tipo y hora.",
      "La introspección está autenticada y tiene cache con reconocimiento de revocación.",
      "Los tokens no aparecen en URL, registros, análisis o mensajes de error.",
      "Se considera que mTLS o DPoP tienen un alto riesgo de replay.",
      "La API Gateway y el backend tienen una división de autorización explícita.",
      "Se prueba la rotación de JWKS, certificados y Client Credentials.",
      "Los errores de OAuth se pueden correlacionar sin revelar detalles confidenciales.",
      "Los clientes, grants, consentimientos y tokens tienen un proceso de terminación."
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
      "Explique por qué OAuth 2.0 no es, por sí solo, un protocolo de autenticación de usuarios.",
      "Diferenciar authorization code, access token, refresh token y ID token.",
      "Describir las verificaciones del Authorization Code con PKCE.",
      "Explique por qué el estado y PKCE no se reemplazan entre sí.",
      "Califica un SPA y justifica por qué su client_secret no es confiable.",
      "Compare client_secret_basic, private_key_jwt y mTLS.",
      "Client Credentials modelo para un trabajo sin usuario.",
      "Explique la detección de reutilización en la rotación de refresh tokens.",
      "Compare el token opaco con JWT en cuanto a revocación y disponibilidad.",
      "Enumere las validaciones obligatorias de un access token JWT.",
      "Explique los indicadores de audience y recursos en una plataforma con múltiples API.",
      "Compare PAR, JAR y JARM.",
      "Diferenciar entre token vinculado a mTLS y token vinculado a DPoP.",
      "Proponer Token Exchange para tres servicios preservando al usuario.",
      "Cree un script de troubleshooting para invalid_grant intermitente."
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
    "caption": "Tabla 16 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Access token",
        "Credencial presentada al resource server para ejercer la autoridad."
      ],
      [
        "Authorization code",
        "Grant breve y de un solo uso intercambiada en el token endpoint."
      ],
      [
        "Authorization server",
        "Componente que evalúa la autorización y emite tokens."
      ],
      [
        "Bearer token",
        "Token utilizable por cualquier poseedor del valor."
      ],
      [
        "Client",
        "Aplicación que solicita y utiliza autoridad."
      ],
      [
        "Client Credentials",
        "Grant en la que la solicitud actúa por cuenta propia."
      ],
      [
        "Confidential client",
        "Cliente capaz de proteger las credenciales de autenticación."
      ],
      [
        "device_code",
        "Artefacto utilizado en el sondeo de Device Authorization Grant."
      ],
      [
        "DPoP",
        "Prueba mediante solicitud que vincula el token a una clave."
      ],
      [
        "Grant",
        "Representación de autorización utilizada para obtener el token."
      ],
      [
        "Introspection",
        "Consulta autenticada sobre actividad y atributos de token."
      ],
      [
        "JAR",
        "Solicitud de autorización protegida en JWT."
      ],
      [
        "JARM",
        "Respuesta de autorización protegida en JWT."
      ],
      [
        "JWT access token",
        "Access token estructurado y firmado según perfil."
      ],
      [
        "PAR",
        "Envío de parámetros por adelantado vía back-channel."
      ],
      [
        "PKCE",
        "Prueba que vincula el intercambio de código con la instancia del cliente."
      ],
      [
        "Public client",
        "El cliente no puede mantener el secreto de manera confiable."
      ],
      [
        "Refresh token",
        "Credencial utilizada para obtener nuevos access tokens."
      ],
      [
        "Resource owner",
        "Entidad capaz de otorgar acceso al recurso."
      ],
      [
        "Resource server",
        "API que acepta access tokens y protege los recursos."
      ],
      [
        "Scope",
        "Representación textual de la autoridad solicitada u otorgada."
      ],
      [
        "Sender-constrained token",
        "Token vinculado a la prueba de una clave de cliente."
      ],
      [
        "State",
        "Valor que vincula solicitud y respuesta y ayuda contra CSRF."
      ],
      [
        "Token Exchange",
        "Grant para intercambiar un token por otro adecuado a un nuevo contexto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de elección de flujo",
    "id": "anexo-a-matriz-de-eleccion-de-flujo"
  },
  {
    "kind": "table",
    "caption": "Tabla 17 - La elección final depende de la plataforma, el riesgo y la capacidad del cliente.",
    "headers": [
      "Escenario",
      "Flujo inicial",
      "Controles esenciales"
    ],
    "rows": [
      [
        "Aplicación web con usuario.",
        "Authorization Code + PKCE",
        "URI de redireccionamiento exacto, confidencial, de estado, protegido por cookies y confidencial del cliente."
      ],
      [
        "puro SPA",
        "Authorization Code + PKCE",
        "Cliente público, refuerzo XSS, token corto y sin secreto."
      ],
      [
        "Spa de mayor riesgo",
        "BFF + Authorization Code + PKCE",
        "tokens del lado del servidor, CSRF y cookie HttpOnly/SameSite."
      ],
      [
        "Aplicación nativa",
        "Authorization Code + PKCE",
        "Navegador externo, aplicación/enlace universal y almacenamiento del sistema."
      ],
      [
        "Servicio a servicio",
        "Client Credentials",
        "private_key_jwt, mTLS o identidad de carga de trabajo; Audiencia mínima."
      ],
      [
        "Dispositivo limitado",
        "Device Authorization Grant",
        "Código de usuario caducable, sondeo controlado y antiphishing."
      ],
      [
        "cadena de servicio",
        "Token Exchange / on-behalf-of",
        "Audiencia por salto, actor y correlación."
      ],
      [
        "Ecosistema regulado",
        "Código + PKCE + PAR/JAR/JARM",
        "RAR, sender constraint, firma y auditoría reforzada."
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
      "IETF. RFC 6749: el marco de autorización de OAuth 2.0. 2012.",
      "IETF. RFC 6750: uso de tokens de portador de OAuth 2.0. 2012.",
      "IETF. RFC 7009: Revocación de token de OAuth 2.0. 2013.",
      "IETF. RFC 7519: token web JSON (JWT). 2015.",
      "IETF. RFC 7636: clave de prueba para el intercambio de códigos por parte de clientes públicos de OAuth. 2015.",
      "IETF. RFC 7662: Introspección de tokens OAuth 2.0. 2015.",
      "IETF. RFC 8252: OAuth 2.0 para aplicaciones nativas. 2017.",
      "IETF. RFC 8414: Metadata del authorization server OAuth 2.0. 2018.",
      "IETF. RFC 8628: Device Authorization Grant OAuth 2.0. 2019.",
      "IETF. RFC 8693: Token Exchange OAuth 2.0. 2020.",
      "IETF. RFC 8705: access tokens vinculados a certificados y autenticación de cliente Mutual-TLS de OAuth 2.0. 2020.",
      "IETF. RFC 8725: Mejores prácticas actuales de tokens web JSON. 2020.",
      "IETF. RFC 9101: Solicitud de autorización asegurada por JWT. 2021.",
      "IETF. RFC 9126: Pushed Authorization Requests. 2021.",
      "IETF. RFC 9068: perfil JWT para access tokens OAuth 2.0. 2021.",
      "IETF. RFC 9207: Identificación del issuer del authorization server OAuth 2.0. 2022.",
      "IETF. RFC 9396: Rich Authorization Requests de OAuth 2.0. 2023.",
      "IETF. RFC 9449: OAuth 2.0 que demuestra proof-of-possession. 2023.",
      "IETF. RFC 9700: mejores prácticas actuales para la seguridad de OAuth 2.0. 2025.",
      "IETF. RFC 9701: Respuesta de JWT para la introspección de tokens de OAuth. 2025.",
      "IETF. RFC 9728: Metadata de recursos protegidos de OAuth 2.0. 2025.",
      "Grupo de trabajo IETF OAuth. El marco de autorización OAuth 2.1 - Internet-Draft, versión consultada en 2026.",
      "Microsoft aprende. Autenticación de Azure API Management, validate-jwt, validate-azure-ad-token y políticas de identidad administrada.",
      "Documentación Axway. Servicios OAuth 2.0, autenticación de clientes y validación de tokens en API Gateway.",
      "Fundación OpenID. Perfil de seguridad API de nivel financiero y especificaciones OpenID Connect, cuando corresponda al ecosistema."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "OAuth evoluciona a través de RFC, mejores prácticas actuales, perfiles y borradores. Antes de implementar un flujo o una política, valide la especificación actual, la documentación de la versión del producto y el comportamiento en un entorno autorizado. Trate los borradores de Internet como un trabajo en progreso, no como reemplazos automáticos de los RFC."
  }
];
