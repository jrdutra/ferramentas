import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const AUTHENTICATION_AUTHORIZATION_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "De la identidad a la decisión de acceso en una API corporativa"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/es/overview.svg",
    "alt": "Cadena de identidad, credencial, autenticación, token, sesión y autorización en una API empresarial",
    "caption": "Figura de apertura: la seguridad del acceso es una cadena de pruebas, afirmaciones y decisiones contextualizadas."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Autenticar demuestra quién o qué llama; autorizar decide qué puede hacer esta identidad ahora."
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
    "text": "El capítulo anterior amplió el repertorio de comunicación al presentar GraphQL, gRPC y WebSocket. Independientemente del protocolo o estilo adoptado, cualquier interfaz corporativa debe responder a dos preguntas fundamentales: quién o qué hace la llamada y qué puede hacer esa identidad en ese contexto. Una API no debe aceptar una operación solo porque el mensaje llegó a través de HTTPS o contiene un encabezado llamado Autorización. Es necesario identificar al llamante, validar las pruebas presentadas, entender en nombre de quién se realiza la operación y aplicar una política coherente al recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "La identidad en las API involucra personas, aplicaciones, dispositivos y cargas de trabajo. Estos sujetos tienen diferentes ciclos de vida, formas de registro y credenciales. Un usuario puede autenticarse con múltiples factores; una aplicación puede utilizar certificado, clave asimétrica o federación; A un pod se le puede asignar una identidad corta mediante certificación del entorno. Tratar a todos como nombre de usuario y contraseña produce secretos estáticos, baja trazabilidad y autorizaciones excesivas."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación y la autorización son responsabilidades separadas. La autenticación establece que una credencial coincide con una identidad bajo un cierto nivel de confianza. La autorización evalúa si esta identidad puede realizar una acción específica en un recurso, considerando el scope, el tenant, los atributos, la relación, el riesgo y el estado del dominio. La autenticación sólida no puede compensar una política de autorización amplia o inexistente."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo construye la base conceptual para capítulos posteriores sobre credenciales, OAuth 2.0, OpenID Connect y tokens. Se estudiarán los límites entre autenticación y autorización, elementos de identidad, sesiones, claims, modelos RBAC/ABAC/ReBAC/PBAC, delegación, workload identity, arquitectura PEP/PDP, respuestas 401/403, observabilidad y aplicación en API Gateways. La autenticación básica, el resumen, las claves API y OAuth aparecen solo en el nivel necesario para establecer diferencias conceptuales; sus detalles se profundizarán en los siguientes capítulos."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "En cada ejemplo, identifique el sujeto, el principal, la credencial, el autenticador, el emisor, la audiencia, el recurso, la política y el punto de aplicación. Esta descomposición evita la conclusión genérica de que “el token es válido” cuando la decisión de acceso aún es incorrecta."
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
      "Diferenciar identidad, sujeto, principal, credencial, autenticador, sesión, token y claim.",
      "Autenticación, autorización, delegación, federación y auditoría separadas.",
      "Distinguir identidades humanas, aplicaciones, dispositivos y cargas de trabajo.",
      "Evaluar claves API, Básicas, cookies, secretos, certificados, tokens y mecanismos de proof-of-possession.",
      "Valide los JWT considerando algoritmo, clave, emisor, audiencia, tiempo, tipo y política.",
      "Comprenda la función de OAuth 2.0 y OpenID Connect sin confundir el access token con la prueba de inicio de sesión.",
      "Compare RBAC, ABAC, ReBAC y políticas orientadas a atributos y contexto.",
      "Diseñar PEP, PDP, PIP y PAP en arquitecturas con gateway y servicios.",
      "Aplique workload identity, identidad administrada, federación y SPIFFE en integraciones de máquina a máquina.",
      "Diagnostica errores 401, 403, tokens rechazados, claims faltantes y decisiones divergentes entre la gateway y el backend."
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
      "14.1 La identidad como base del control de acceso",
      "14.2 Vocabulario: materia, principal, credencial y sesión",
      "14.3 Autenticación, autorización, delegación y auditoría",
      "14.4 Identidades humanas, aplicaciones, dispositivos y cargas de trabajo",
      "14.5 Registro, vinculación y ciclo de vida de la identidad",
      "14.6 Factores de usuario y autenticadores",
      "14.7 Credenciales de aplicaciones y proof-of-possession",
      "14.8 API keys: utilidad y limitaciones",
      "14.9 Credenciales HTTP básicas y estáticas",
      "14.10 Sesiones, cookies, CORS y CSRF",
      "14.11 Tokens opacos, estructurados, portadores y restringidos por remitente",
      "14.12 Claims, emisor, subject, audiencia, scopes y roles",
      "14.13 JWT: estructura y validación segura",
      "14.14 OAuth 2.0 y OpenID Connect: límites conceptuales",
      "14.15 Modelos de autorización RBAC, ABAC, ReBAC y PBAC",
      "14.16 PEP, PDP, PIP y PAP",
      "14.17 Delegación, impersonation y on-behalf-of",
      "14.18 Workload identity y zero trust",
      "14.19 Identidad en API Gateways, Axway y Azure",
      "14.20 Respuestas 401, 403 y insufficient_scope",
      "14.21 Registros, auditoría, privacidad y correlación",
      "14.22 Amenazas y endurecimiento",
      "14.23 Troubleshooting basada en evidencia",
      "14.24 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.1 La identidad como base del control de acceso",
    "id": "14-1-la-identidad-como-base-del-control-de-acceso"
  },
  {
    "kind": "paragraph",
    "text": "Una API expone capacidades, datos y transiciones comerciales. Para protegerlos, el sistema necesita asociar cada solicitud con un principal confiable. Lo principal es la identidad operativa utilizada en la decisión: una persona, una aplicación, un dispositivo, una workload o una combinación, como por ejemplo “aplicación X que actúa en nombre del usuario Y”. Sin esta asociación, los límites de velocidad, los registros de auditoría y las autorizaciones se convierten en aproximaciones basadas en IP o secretos compartidos."
  },
  {
    "kind": "paragraph",
    "text": "Identidad no es sinónimo de nombre textual. Un correo electrónico, client_id o SPIFFE ID es un identificador; La confianza surge del proceso que vincula este identificador a una credencial y la validación realizada en cada uso. Dos sistemas pueden utilizar el mismo texto y tener diferentes dominios de confianza. Por lo tanto, el identificador debe interpretarse según el emisor, el tenant, el tipo de sujeto y la política de registro."
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas intermedias, cada salto puede autenticar diferentes identidades. El equilibrador puede autenticar el certificado de la gateway; la gateway puede validar el access token del consumidor; el backend puede recibir claims propagados o un nuevo token emitido al segmento interno. El diseño debe indicar dónde se establece, transforma, reduce o reemplaza la identidad."
  },
  {
    "kind": "subhead",
    "text": "regla de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "Nunca utilice solo un valor proporcionado por el propio cliente, como X-User-Id o X-Role, como prueba de identidad. Los datos deben provenir de una credencial validada o ser insertados por un intermediario confiable que elimine cualquier valor externo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.2 Sujeto, principal, credencial, autenticador y sesión",
    "id": "14-2-sujeto-principal-credencial-autenticador-y-sesion"
  },
  {
    "kind": "paragraph",
    "text": "El sujeto es la entidad sobre la cual se hace una declaración. En la autenticación humana, puede ser una persona registrada. En una integración, podría ser un servicio. Lo principal es la representación de esta entidad dentro del sistema de seguridad. Una misma persona puede tener distintos mandantes en diferentes tenants; Una aplicación puede operar como su propio principal o actuar en nombre de un usuario."
  },
  {
    "kind": "paragraph",
    "text": "Credencial es el material utilizado para demostrar control o vínculo: contraseña, clave privada, certificado, secreto de cliente, autenticador físico, cookie o token de sesión. El autenticador es el mecanismo que contiene o produce la prueba. En terminología de identidad digital, el proceso de autenticación verifica que el reclamante controle uno o más autenticadores vinculados al suscriptor."
  },
  {
    "kind": "paragraph",
    "text": "La sesión es un estado creado después de la autenticación para evitar repetir el proceso completo en cada interacción. Los tokens pueden representar sesión, delegación o autorización, pero no son automáticamente lo mismo. Puede existir una sesión de navegador en el proveedor de identidad mientras la API recibe tokens de acceso independientes y de corta duración."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Los términos cercanos tienen diferentes responsabilidades.",
    "headers": [
      "Término",
      "Pregunta respondida",
      "Ejemplo"
    ],
    "rows": [
      [
        "Identificador",
        "¿Cómo se nombra la entidad?",
        "sub, identificación del cliente, identificación de SPIFFE. _"
      ],
      [
        "Credencial",
        "¿Qué material se presenta?",
        "contraseña, clave, certificado, token."
      ],
      [
        "Autenticación",
        "¿Es la prueba válida para esta identidad?",
        "MFA, suscripción, mTLS."
      ],
      [
        "Sesión",
        "¿Qué estado temporal se creó?",
        "cookie o sesión segura en el IdP."
      ],
      [
        "Autorización",
        "¿Está permitida la acción en este contexto?",
        "scope, rol, atributo y regla de dominio."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/es/figure-01.svg",
    "alt": "Identidad autenticada sometida a una decisión de autorización contextual",
    "caption": "Figura 1: una identidad autenticada aún debe someterse a una decisión de autorización contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.3 Autenticación, autorización, delegación y auditoría",
    "id": "14-3-autenticacion-autorizacion-delegacion-y-auditoria"
  },
  {
    "kind": "paragraph",
    "text": "La autenticación valida una prueba. La autorización decide el acceso. La delegación permite a un cliente obtener autoridad limitada para actuar en nombre de otro sujeto. La federación permite que un dominio acepte afirmaciones producidas por otro dominio confiable. La auditoría registra suficientes hechos para reconstruir quién hizo qué, en qué apelación, con qué decisión y con qué resultado."
  },
  {
    "kind": "paragraph",
    "text": "Estas funciones pueden ocurrir en diferentes componentes. Un proveedor de identidad autentica al usuario; un authorization server emite un access token; API Gateway valida el token y aplica políticas transversales; el backend verifica la autorización fina relacionada con el estado del recurso. Centrar todas las decisiones en la gateway puede requerir datos de dominio que esta no tiene; concentrar todo en el backend duplica los controles y reduce la gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "El diseño debe separar la decisión y la ejecución. Una política puede ser evaluada localmente por la gateway, por un servicio central o junto con el backend. Independientemente del modelo, la solicitud debe llevar un contexto verificable y la decisión debe ser registrable. Las transformaciones de identidad invisibles crean confusión en incidentes y auditorías."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Las funciones están vinculadas, pero no deben confundirse.",
    "headers": [
      "Función",
      "Entrada principal",
      "Salir"
    ],
    "rows": [
      [
        "Autenticación",
        "credencial, prueba y contexto",
        "principal autenticado y nivel de confianza."
      ],
      [
        "Autorización",
        "principal, acción, recurso y atributos",
        "permitir, negar o exigir condiciones adicionales."
      ],
      [
        "Delegación",
        "consentimiento o autoridad otorgada",
        "token limitado para actuar en nombre de otro."
      ],
      [
        "Federación",
        "afirmación de otro dominio",
        "identidad aceptada según política de confianza."
      ],
      [
        "Auditoría",
        "eventos y decisiones",
        "rastro correlacionado e investigable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.4 Identidades humanas, aplicaciones, dispositivos y cargas de trabajo",
    "id": "14-4-identidades-humanas-aplicaciones-dispositivos-y-cargas-de-trabajo"
  },
  {
    "kind": "paragraph",
    "text": "Las identidades humanas tienen características como empleo, cuenta personal, consentimiento, recuperación y autenticación multifactor. El riesgo incluye phishing, secuestro de sesión, uso compartido de cuentas y uso después del cierre. La autorización suele considerar función, unidad, relación con el recurso y acciones realizadas en nombre propio."
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones y las cargas de trabajo son identidades no humanas. No ingresan una contraseña ni responden a un segundo factor. Requieren credenciales proporcionadas, certificación de entorno o federación. El ciclo de vida debe seguir el despliegue, la rotación, el cambio de propietario y la desactivación. Un secreto sin dueño y sin caducidad es una deuda operativa y de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Los dispositivos pueden proporcionar señales clave protegidas por hardware, de postura o de registro. La identidad del dispositivo no reemplaza la identidad del usuario o de la aplicación; agrega contexto. Una solicitud puede involucrar simultáneamente al usuario, el cliente OAuth, el dispositivo y la workload que ejecuta el backend. Las claims y los registros deben conservar estas capas sin contraerlas en un solo campo."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Cada clase de identidad requiere sus propios controles.",
    "headers": [
      "Tipo",
      "Identificador típico",
      "Credencial preferida",
      "Riesgo del ciclo de vida"
    ],
    "rows": [
      [
        "humano",
        "sujeto por tenant",
        "MFA resistente al phishing cuando corresponda",
        "apagado, recuperación y sesión."
      ],
      [
        "Solicitud",
        "ID de cliente/principal de servicio _",
        "clave asimétrica o federación",
        "secreto huérfano y amplios permisos."
      ],
      [
        "Workload",
        "service account / ID SPIFFE",
        "credencial corta emitida por atestación",
        "Réplica efímera e identidad compartida."
      ],
      [
        "Dispositivo",
        "ID y clave del dispositivo",
        "clave protegida y registro",
        "Pérdida, clonación o postura obsoleta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.5 Registro, vinculación y ciclo de vida de la identidad",
    "id": "14-5-registro-vinculacion-y-ciclo-de-vida-de-la-identidad"
  },
  {
    "kind": "paragraph",
    "text": "La autenticación segura comienza antes de iniciar sesión. El registro debe establecer quién puede crear la identidad, en qué atributos se confía, quién es el propietario y cómo se revocará el vínculo. En el caso de las identidades humanas, esto puede implicar pruebas de identidad y procesos de recursos humanos. En las aplicaciones, implica registro, propietario técnico, entorno, propósito, repositorio y aprobación de permisos."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de vida incluye creación, activación, cambio, suspensión, recuperación, rotación y terminación. El control no debe depender únicamente de la eliminación de una credencial: también es necesario invalidar roles, concesiones, sesiones, tokens de actualización, certificados y asociaciones en catálogos. Desactivar la cuenta sin cerrar sesiones puede mantener el acceso durante horas o días."
  },
  {
    "kind": "paragraph",
    "text": "Las identidades compartidas eliminan la responsabilidad. Cuando varios sistemas utilizan el mismo client_id y el mismo secreto, es imposible asignar el tráfico con precisión, imponer privilegios mínimos o eliminar solo un consumidor. La individualización de la identidad permite cuotas por aplicación, políticas, telemetría y respuesta a incidentes."
  },
  {
    "kind": "subhead",
    "text": "Control mínimo de registro"
  },
  {
    "kind": "paragraph",
    "text": "Cada identidad de aplicación debe tener propietario, propósito, entorno, fecha de revisión, mecanismo de credenciales, permisos aprobados y procedimiento de desactivación. La ausencia de cualquier artículo impedirá el ascenso a producción."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.6 Factores de usuario y autenticadores",
    "id": "14-6-factores-de-usuario-y-autenticadores"
  },
  {
    "kind": "paragraph",
    "text": "Los factores de autenticación a menudo se agrupan en algo que el usuario sabe, tiene o es. El número de factores no es suficiente para determinar la resistencia: dos secretos memorizados no equivalen a dos factores independientes. También es necesario evaluar la resistencia al phishing, la reproducción, el robo del autenticador, la recuperación y la vinculación entre sesión y contexto."
  },
  {
    "kind": "paragraph",
    "text": "En las API a las que acceden las aplicaciones interactivas, la autenticación del usuario normalmente ocurre en el proveedor de identidad, no directamente en el endpoint del negocio. La API recibe una aserción resultante o un access token. Esto le permite centralizar las políticas de sesión, riesgo y MFA, mientras que la API se centra en validar el token y autorizar el recurso."
  },
  {
    "kind": "paragraph",
    "text": "El nivel de autenticación puede variar según la acción. La consulta de datos de bajo riesgo puede utilizar la sesión existente; Cambiar el límite o registrar un beneficiario puede requerir un step-up. Claims como acr y amr pueden contener información sobre el método, pero el consumidor sólo debe interpretar valores documentados por el emisor y apropiados para la policy."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Los factores y señales deben evaluarse según el riesgo del viaje.",
    "headers": [
      "categoría",
      "Ejemplo",
      "Nota"
    ],
    "rows": [
      [
        "conocimiento",
        "contraseña o PIN",
        "vulnerables al phishing, la reutilización y las fugas."
      ],
      [
        "posesión",
        "clave de seguridad o aplicación de autenticación",
        "La seguridad depende de la protección y la vinculación."
      ],
      [
        "inherencia",
        "biometria",
        "normalmente desbloquea un autenticador; requiere cuidado con la privacidad."
      ],
      [
        "Contexto",
        "dispositivo, red, riesgo",
        "es un signo adicional, no un factor universal aislado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.7 Credenciales de aplicaciones y proof-of-possession",
    "id": "14-7-credenciales-de-aplicaciones-y-proof-of-possession"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones pueden utilizar secreto compartido, certificado, clave privada, firma de mensaje, mTLS o federación de identidades. Los secretos son simples, pero cualquier copia permite la impersonation. Las claves asimétricas reducen la distribución de secretos: la clave privada permanece en el cliente y el verificador utiliza la clave pública o el certificado."
  },
  {
    "kind": "paragraph",
    "text": "La proof-of-possession significa que el cliente demuestra el control de la clave, no solo presentando un valor copiable. mTLS vincula la autenticación al certificado utilizado en el canal. DPoP agrega pruebas firmadas a nivel HTTP y puede vincular tokens a una clave. Estos mecanismos reducen la replay de tokens robados, pero requieren la validación de nonce, método, URI, huella digital y ventana de tiempo según el protocolo."
  },
  {
    "kind": "paragraph",
    "text": "La federación de cargas de trabajo evita almacenar secretos de larga duración. Un entorno externo presenta una breve afirmación de su proveedor; El dominio de destino valida el emisor, el sujeto y las condiciones y emite un token local. La confianza debe restringirse a sujetos y públicos específicos, nunca a ningún token emitido por el proveedor."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Las credenciales de solicitud deben priorizar la proof-of-possession y la automatización.",
    "headers": [
      "Mecanismo",
      "Material en el cliente",
      "ventaja",
      "Precaución"
    ],
    "rows": [
      [
        "secreto del cliente",
        "secreto copiable",
        "amplio apoyo",
        "rotación, vertido y distribución."
      ],
      [
        "Certificado/clave privada",
        "clave asimétrica",
        "prueba criptográfica y separación de claves públicas",
        "protección de claves y ciclo de certificados."
      ],
      [
        "mTLS",
        "certificado en apretón de manos",
        "Posible autenticación de canal y enlace de token.",
        "Terminación TLS y proxys."
      ],
      [
        "Federación",
        "breve afirmación ambiental",
        "ningún secreto estático local",
        "La política de confianza debe ser específica."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.8 API keys: utilidad y limitaciones",
    "id": "14-8-api-keys-utilidad-y-limitaciones"
  },
  {
    "kind": "paragraph",
    "text": "Una clave API es un identificador secreto o semisecreto asociado con un consumidor, producto o plan. Es útil para mediciones, cuotas, descubrimiento de abusos y separación del tráfico. Sin embargo, no representa automáticamente una identidad fuerte. Si se copia, cualquier parte puede reutilizarlo y muchas implementaciones no tienen audiencia, caducidad corta ni prueba de propiedad."
  },
  {
    "kind": "paragraph",
    "text": "Las claves API no deben enviarse en una cadena de consulta, porque las URL aparecen en registros, historial, análisis y árbitros. Prefiere encabezado dedicado o Autorización según el contrato. El valor debe ser tratado como un secreto: almacenado de forma segura, mostrado solo una vez, giratorio y nunca registrado por completo."
  },
  {
    "kind": "paragraph",
    "text": "En las API públicas de bajo riesgo, una clave puede complementar los controles. En operaciones sensibles, debe combinarse con la autenticación y autorización adecuadas. La gateway puede validar la clave y aplicar el plan, pero el backend aún necesita autorizar el recurso cuando la identidad o el contexto empresarial son importantes."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de transporte de encabezado"
  },
  {
    "kind": "code",
    "text": "GET /catalogo/productos HTTP/1.1\nHost: api.empresa.example\nX-API-Key: <valor-secreto>"
  },
  {
    "kind": "subhead",
    "text": "Antipatrón"
  },
  {
    "kind": "paragraph",
    "text": "No utilice GET /recurso?api_key=secret. La URL puede ser registrada por proxies, servidores, herramientas APM y navegadores, ampliando la superficie de exposición."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.9 Credenciales HTTP básicas y estáticas",
    "id": "14-9-credenciales-http-basicas-y-estaticas"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic transporta un identificador y una contraseña codificados en Base64. Base64 no es cifrado; el mecanismo se basa en TLS para garantizar la confidencialidad. El encabezado se puede reenviar en cada solicitud y, cuando se comparte una credencial, cualquier fuga permite su uso hasta la rotación."
  },
  {
    "kind": "paragraph",
    "text": "Básico todavía aparece en integraciones heredadas y endpoints administrativos. El uso debe limitarse a canales protegidos, credenciales individuales, scope mínimo, limitación de velocidad y rotación. Nunca reutilice una contraseña de directorio humano como contraseña de integración. Una credencial de servicio debe tener su propio ciclo de vida y propietario."
  },
  {
    "kind": "paragraph",
    "text": "La migración puede aceptar Basic y token durante la ventana controlada, registrar a los consumidores restantes y retirar el mecanismo anterior. Simplemente convertir el nombre de usuario/contraseña en un token en la gateway sin mejorar el registro, la rotación y la autorización preserva la fragilidad original."
  },
  {
    "kind": "subhead",
    "text": "Marco conceptual"
  },
  {
    "kind": "code",
    "text": "Authorization: Basic base64(client-id:secret)\n# El contenido decodificado sigue siendo un secreto reutilizable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.10 Sesiones, cookies, CORS y CSRF",
    "id": "14-10-sesiones-cookies-cors-y-csrf"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones del navegador suelen utilizar cookies de sesión. El navegador los envía automáticamente al dominio correspondiente, lo que crea el riesgo de falsificación de solicitudes entre sitios cuando un origen malicioso induce una solicitud autenticada. SameSite, tokens anti-CSRF, validación de origen y métodos apropiados reducen el riesgo; CORS no es un mecanismo de protección completo contra CSRF."
  },
  {
    "kind": "paragraph",
    "text": "Las cookies de sesión deben utilizar Secure, HttpOnly cuando no es necesario leerlas mediante JavaScript, un scope mínimo de dominio/ruta y una política SameSite compatible con la arquitectura. El identificador de sesión debe ser impredecible y rotar tras la autenticación o elevación de privilegios. El cierre de sesión debe finalizar el estado en el servidor cuando la sesión tiene estado."
  },
  {
    "kind": "paragraph",
    "text": "En los SPA, almacenar tokens al portador en localStorage aumenta el impacto de XSS. Una arquitectura backend-for-frontend puede mantener tokens en el servidor y exponer solo cookies de sesión protegidas al navegador. La elección depende del modelo de amenaza, pero el diseño debe considerar XSS, CSRF, exfiltración, actualización y múltiples pestañas."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Las sesiones del navegador requieren controles más allá de la autenticación inicial.",
    "headers": [
      "controlar",
      "Riesgo tratado",
      "Nota"
    ],
    "rows": [
      [
        "Seguro",
        "enviando en un canal que no sea TLS",
        "no protege contra scripts o servidores comprometidos."
      ],
      [
        "Sólo Http",
        "leyendo por JavaScript",
        "Reduce la exfiltración directa por XSS."
      ],
      [
        "Mismo sitio",
        "envío entre sitios",
        "necesita admitir inicios de sesión federados y flujos legítimos."
      ],
      [
        "Token de origen/CSRF",
        "petición inducida",
        "el servidor debe validar operaciones efectivas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.11 Tokens opacos, estructurados, portadores y restringidos por remitente",
    "id": "14-11-tokens-opacos-estructurados-portadores-y-restringidos-por-remitente"
  },
  {
    "kind": "paragraph",
    "text": "Un token opaco no revela significado para el cliente. El resource server consulta la introspección o el estado local para descubrir la actividad, el subject, el scope y el vencimiento. Esto facilita la revocación y reduce la exposición de las claims, pero introduce dependencia de la red, la cache y la disponibilidad del authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Un token estructurado, como JWT, conlleva afirmaciones verificables localmente. Esto reduce las llamadas por solicitud, pero la revocación inmediata es más difícil y el contenido se puede copiar durante su vigencia. La firma garantiza integridad y origen, no confidencialidad. La carga útil de un JWS normalmente sólo está codificada y puede leerse."
  },
  {
    "kind": "paragraph",
    "text": "El bearer token otorga acceso a quien lo posee. El sender-constrained token requiere prueba adicional de cliente legítimo, como mTLS o DPoP. La vinculación reduce la replay, pero no elimina la necesidad de una caducidad corta, una audiencia correcta, un scope mínimo y protección del endpoint emisor."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Formato y modelo de posesión son decisiones diferentes.",
    "headers": [
      "Tipo",
      "Validación",
      "ventaja",
      "Limitación"
    ],
    "rows": [
      [
        "opaco",
        "introspección o almacenamiento local",
        "revocación y poca exposición",
        "Latencia y dependencia central."
      ],
      [
        "JWT firmado",
        "clave pública y claims",
        "validación local e interoperabilidad",
        "replay y revocación hasta su vencimiento."
      ],
      [
        "Portador",
        "posesión de valor",
        "simplicidad",
        "el robo permite la reutilización."
      ],
      [
        "Restringido por el remitente",
        "token más prueba de clave",
        "reduce la replay por parte de terceros",
        "mayor complejidad operativa."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.12 Claims, emisor, subject, audiencia, scopes y roles",
    "id": "14-12-claims-emisor-subject-audiencia-scopes-y-roles"
  },
  {
    "kind": "paragraph",
    "text": "Los claims son declaraciones sobre el token, subject, cliente o contexto. iss identifica al emisor; sub identifica el asunto en el dominio del remitente; aud indica el destinatario previsto; exp, nbf e iat establecen el tiempo; jti puede identificar el token. La combinación iss + sub es más segura que interpretar sub solo."
  },
  {
    "kind": "paragraph",
    "text": "El scope representa la autoridad delegada en términos comprensibles para el resource server. El rol generalmente representa un rol asignado a un usuario o aplicación. El permiso o el derecho pueden expresar capacidades más específicas. Mezclar a todos en el mismo campo hace que la política sea ambigua. La organización necesita definir vocabulario, espacio de nombres y semántica."
  },
  {
    "kind": "paragraph",
    "text": "Las claims no deben contener datos innecesarios o sensibles. Los tokens pasan a través de clientes, gateways, registros y herramientas. Cuando el backend necesita información dinámica, puede buscar datos por identificador o utilizar un servicio de atributos. Los claims muy grandes aumentan los encabezados, la latencia y el riesgo de exposición."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: Las afirmaciones necesitan semántica y validación explícitas.",
    "headers": [
      "claim",
      "Significado",
      "Validación"
    ],
    "rows": [
      [
        "es",
        "quien emitió",
        "comparación exacta con el emisor de confianza."
      ],
      [
        "sub",
        "asunto en el remitente",
        "interpretar junto con iss y tipo de identidad."
      ],
      [
        "aud",
        "recurso destinatario",
        "debe incluir la API esperada."
      ],
      [
        "exp/nbf",
        "ventana de tiempo",
        "Utilice un reloj confiable y una desviación limitada."
      ],
      [
        "scope",
        "autoridad delegada",
        "requieren sólo los scopes necesarios para la operación."
      ],
      [
        "azp/clientid_",
        "cliente autorizado",
        "distinguir la aplicación del usuario."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/es/figure-02.svg",
    "alt": "Formatear la cadena de validación del token para acceder a la política",
    "caption": "Figura 2: La firma es solo un paso para validar un token."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.13 JWT: estructura, firma, cifrado y validación segura",
    "id": "14-13-jwt-estructura-firma-cifrado-y-validacion-segura"
  },
  {
    "kind": "paragraph",
    "text": "JWT es un formato de claims que puede estar protegido por JWS o JWE. En un JWT firmado, el encabezado, la carga útil y la firma se codifican en segmentos separados. El encabezado indica parámetros criptográficos; la carga útil contiene claims; la firma protege la integridad. JWE añade cifrado, pero no debería introducirse sólo para ocultar un diseño de datos excesivo."
  },
  {
    "kind": "paragraph",
    "text": "La validación debe corregir los algoritmos aceptados y rechazar combinaciones inesperadas. El verificador no debe confiar ciegamente en las URL clave o alg proporcionadas por el token. Las claves deben provenir de una configuración o metadata confiables, con cache, rotación y protección contra la confusión entre claves simétricas y asimétricas."
  },
  {
    "kind": "paragraph",
    "text": "Además de la firma, valide el emisor, la audiencia, la exp, el nbf, el tipo de token y los claims obligatorios. Una API no debe aceptar un ID token válido para un cliente OpenID Connect como access token. La tipificación explícita, las reglas distintas y las audiencias separadas reducen la sustitución entre contextos."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo didáctico de claims de tokens de acceso."
  },
  {
    "kind": "code",
    "text": "HEADER\n{ \"alg\": \"RS256\", \"typ\": \"at+jwt\", \"kid\": \"key-2026-01\" }\nPAYLOAD\n{\n  \"iss\": \"https://id.empresa.example\",\n  \"sub\": \"app:conciliacion\",\n  \"aud\": \"https://api.empresa.example/pagamentos\",\n  \"scope\": \"pagos.lectura\",\n  \"iat\": 1784130000,\n  \"exp\": 1784130300\n}"
  },
  {
    "kind": "subhead",
    "text": "Validación mínima"
  },
  {
    "kind": "paragraph",
    "text": "Aceptar solo una firma válida sin verificar iss, aud, hora y tipo equivale a aceptar credenciales emitidas para otros sistemas. Cada API debe declarar exactamente qué emisores, audiencias, algoritmos y claims están permitidos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.14 OAuth 2.0 y OpenID Connect: límites conceptuales",
    "id": "14-14-oauth-2-0-y-openid-connect-limites-conceptuales"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 es un marco de autorización delegada. Define roles y mecanismos para que un cliente obtenga un access token y acceda a un resource server con autoridad limitada. OAuth no define por sí solo cómo se autenticó al usuario ni garantiza que un access token contenga una identidad humana. Las credenciales de cliente, por ejemplo, representan el acceso a la aplicación en su propio nombre."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect agrega una capa de autenticación además de OAuth 2.0. El ID token comunica afirmaciones sobre la autenticación del usuario al cliente y el endpoint UserInfo puede proporcionar datos adicionales. El ID token está destinado al cliente y no debe enviarse como una credencial genérica para las API, a menos que exista un contrato explícito y un perfil adecuado."
  },
  {
    "kind": "paragraph",
    "text": "La API debe validar el access token destinado a ella. El cliente valida el ID token destinado a él. Confundir los dos puede permitir la sustitución de fichas. Los próximos capítulos profundizarán en el código de autorización, PKCE, credenciales de cliente, actualización, consentimiento, metadata, introspección y seguridad moderna según OAuth Security BCP."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Los artefactos de identidad tienen diferentes audiencias y usos.",
    "headers": [
      "artefacto",
      "Destinatario",
      "Propósito"
    ],
    "rows": [
      [
        "access token",
        "resource server/API",
        "autorizar el acceso a los recursos."
      ],
      [
        "ID token",
        "Cliente OpenID Connect",
        "informar el resultado de la autenticación del usuario."
      ],
      [
        "Upgrade ficha",
        "authorization server",
        "obtener nuevos tokens de acceso según la política."
      ],
      [
        "código de autorización",
        "token de endpoint por cliente",
        "Intercambio intermedio a corto deadline."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.15 Modelos de autorización: RBAC, ABAC, ReBAC y PBAC",
    "id": "14-15-modelos-de-autorizacion-rbac-abac-rebac-y-pbac"
  },
  {
    "kind": "paragraph",
    "text": "RBAC asigna roles a directores y permisos a roles. Es simple para roles organizacionales estables, pero los roles demasiado granulares producen una explosión y los roles amplios violan los privilegios mínimos. El rol de “analista” no responde por sí solo si el usuario puede consultar cualquier cuenta o sólo las de su cartera."
  },
  {
    "kind": "paragraph",
    "text": "ABAC evalúa atributos del sujeto, recurso, acción y entorno. Puede combinar unidad, clasificación, tenant, tiempo, dispositivo y riesgo. La flexibilidad aumenta la necesidad de datos confiables, semántica clara y pruebas. Los atributos obsoletos o manipulables hacen que la política sea insegura."
  },
  {
    "kind": "paragraph",
    "text": "ReBAC utiliza relaciones, como propietario, miembro, responsable o gerente. Es útil cuando el acceso depende de la posición del sujeto en un gráfico. PBAC es un término amplio para decisiones basadas en políticas, que a menudo combinan roles, atributos y relaciones. En los sistemas reales, los modelos híbridos son comunes."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - Los modelos se pueden combinar por capa y riesgo.",
    "headers": [
      "modelo",
      "Base de la decisión",
      "Uso adecuado",
      "Riesgo"
    ],
    "rows": [
      [
        "RBAC",
        "función o rol",
        "permisos organizacionales estables",
        "explosión de roles y exceso de privilegios."
      ],
      [
        "ABAC",
        "atributos y contexto",
        "reglas contextuales y multitenant",
        "atributos incorrectos y política compleja."
      ],
      [
        "ReBAC",
        "relaciones entre entidades",
        "propietario, equipo, cartera y acción",
        "gráfico desactualizado o consulta costosa."
      ],
      [
        "PBAC",
        "política declarativa",
        "combinación centralizada de señales",
        "dependencia del PDP y la gobernanza."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/es/figure-03.svg",
    "alt": "Arquitectura de decisión con PEP, PDP, PIP, PAP y recurso protegido",
    "caption": "Figura 3: La aplicación de la ley puede permanecer en la gateway o servicio mientras la decisión utiliza atributos y políticas externos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.16 PEP, PDP, PIP y PAP",
    "id": "14-16-pep-pdp-pip-y-pap"
  },
  {
    "kind": "paragraph",
    "text": "El Punto de Aplicación de Políticas intercepta la operación y aplica la decisión. API Gateway es un PEP natural para autenticación, scope, cuota y reglas transversales. El backend también actúa como PEP para la autorización de dominio. Policy Decision Point evalúa las políticas y devuelve una decisión, posiblemente con obligaciones como enmascarar campos o requerir un step-up."
  },
  {
    "kind": "paragraph",
    "text": "El punto de información de política proporciona atributos: datos de usuario, tenant, relación, clasificación de recursos o riesgo. El punto de administración de políticas es donde se crean, revisan, versionan y publican las políticas. La separación de estos roles permite la gobernanza, pero agrega latencia, disponibilidad y coherencia como requisitos arquitectónicos."
  },
  {
    "kind": "paragraph",
    "text": "Las decisiones centralizadas necesitan cache y estrategias de comportamiento fallido. La apertura fallida puede exponer datos cuando falla el PDP; El cierre fallido puede causar indisponibilidad. La elección depende del riesgo de la operación. Las políticas críticas deben tener pruebas, control de versiones, reversión y observabilidad equivalentes al código de producción."
  },
  {
    "kind": "subhead",
    "text": "División recomendada"
  },
  {
    "kind": "paragraph",
    "text": "Utilice la gateway para validar credenciales y aplicar controles independientes del estado del dominio. Mantenga en el servicio las decisiones que dependen de la propiedad, el saldo, el estado de la transacción o las reglas que cambian con el negocio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.17 Delegación, impersonation y on-behalf-of",
    "id": "14-17-delegacion-impersonation-y-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "La delegación otorga autoridad limitada a un cliente para actuar en nombre de un sujeto. El token debe distinguir usuario, cliente y scope delegado. Al registrar solo al usuario se oculta qué aplicación realizó la acción; al registrar sólo la solicitud se pierde a la persona que la autorizó. Los registros deben conservar ambos cuando el flujo involucra a ambos."
  },
  {
    "kind": "paragraph",
    "text": "La impersonation es más fuerte: un componente adquiere la identidad de otro. Debe ser raro, explícitamente autorizado y auditado, ya que elimina fronteras. En las herramientas administrativas, la interfaz debe indicar que el operador está actuando como otro usuario y registrar el actor original, el motivo y la duración."
  },
  {
    "kind": "paragraph",
    "text": "En nombre de ocurre cuando un servicio llama a otro manteniendo el contexto del usuario. Reenviar el mismo token a todos los backends amplía la audiencia y la exposición. El intercambio de tokens o emisión de un token específico para el siguiente recurso reduce los privilegios y permite representar la cadena de actores de forma controlada."
  },
  {
    "kind": "table",
    "caption": "Tabla 11 - La identidad del actor no debe desaparecer durante la delegación.",
    "headers": [
      "Escenario",
      "Identidades que deben aparecer",
      "controlar"
    ],
    "rows": [
      [
        "Aplicación en nombre del usuario",
        "usuario + cliente",
        "scopes delegados y consentimiento/política."
      ],
      [
        "Servicio por cuenta del usuario",
        "usuario + servicio de llamadas",
        "audiencia específica y cadena de actores."
      ],
      [
        "Solo aplicación",
        "aplicación/workload",
        "Permisos de aplicación y propietario."
      ],
      [
        "Impersonation administrativa",
        "operador + sujeto asumido",
        "aprobación, deadline, motivo y auditoría reforzada."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/es/figure-04.svg",
    "alt": "Workload identity con certificación y credenciales breves",
    "caption": "Figura 4: La certificación y las credenciales breves reducen los secretos persistentes en las cargas de trabajo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.18 Workload identity y zero trust",
    "id": "14-18-workload-identity-y-zero-trust"
  },
  {
    "kind": "paragraph",
    "text": "La identidad de la workload representa el software en ejecución. En la nube, puede ser un servicio principal o una identidad administrada. En Kubernetes, puede utilizar cuentas de servicios federados. En SPIFFE, la workload recibe un ID de SPIFFE y documentos de identidad verificables a través de la API de workload. El objetivo es vincular las credenciales con el entorno del proceso y el ciclo de vida reales."
  },
  {
    "kind": "paragraph",
    "text": "La zero trust no significa desconfiar de todo en abstracto; significa no otorgar confianza implícita solo por la ubicación de la red. Cada acceso debe evaluar identidad, recurso y contexto. Estar dentro de la VNet o del clúster no reemplaza la autenticación. La segmentación de la red sigue siendo útil, pero funciona junto con la identidad."
  },
  {
    "kind": "paragraph",
    "text": "Las credenciales breves y rotadas automáticamente reducen el margen de abuso. El servicio no debería poder exportar una credencial de larga duración cuando la plataforma puede emitir tokens a pedido. La autorización debe limitar la audiencia y los permisos; una identidad administrada sin un secreto aún puede ser peligrosa si tiene una función de administrador."
  },
  {
    "kind": "table",
    "caption": "Tabla 12: La identidad de la workload debe seguir la plataforma y el ciclo de ejecución.",
    "headers": [
      "Tecnología",
      "Identidad",
      "Emisión",
      "Uso"
    ],
    "rows": [
      [
        "Identidad administrada",
        "servicio central gestionado",
        "La plataforma Azure emite tokens",
        "acceso a recursos que confían en Microsoft Entra."
      ],
      [
        "Federación de cargas de trabajo",
        "sujeto externo mapeado",
        "afirmación de intercambio por token local",
        "CI/CD, Kubernetes y multinube sin secreto."
      ],
      [
        "SPIFFE/SPIRE",
        "ID DE SPIFFE",
        "SVID corto mediante certificación",
        "mTLS o JWT en cargas de trabajo."
      ],
      [
        "Service account estática",
        "service account",
        "token secreto o persistente",
        "legado; Requiere rotación y restricción."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.19 Identidad en API Gateways, Axway y Azure",
    "id": "14-19-identidad-en-api-gateways-axway-y-azure"
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway puede extraer credenciales, validar clave API, certificado o JWT, aplicar scopes, consultar identidades externas y propagar contexto al backend. La política debe eliminar los encabezados de identidad proporcionados por el cliente e insertar solo valores derivados de la validación. El backend debe confiar en estos encabezados solo cuando la conexión proviene de la gateway autorizada."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, políticas como validar-jwt y validar-azure-ad-token validan tokens y pueden requerir emisor, audiencia y notificaciones. La configuración debe utilizar metadata y claves de emisor correctos, registrar fallas sin exponer el token y separar la autorización de la gateway de las reglas de dominio. La gateway o el backend pueden utilizar la identidad administrada para obtener tokens sin secretos estáticos en escenarios admitidos."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, los filtros OAuth, OpenID Connect y la verificación JWT pueden participar en las políticas. El diseño debe declarar si la gateway actúa como authorization server, cliente o resource server. Como los productos y las versiones varían, la política debe probarse con tokens autorizados reales, rotación de claves y escenarios de error."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de política en Azure API Management"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://pagamentos</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"any\">\n      <value>pagos.lectura</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Atención operativa"
  },
  {
    "kind": "paragraph",
    "text": "La validación de JWT depende de los metadata, el caché de claves y la rotación. Pruebe el comportamiento cuando el niño cambie, los metadata dejen de estar disponibles, el reloj diverja o el token tenga múltiples audiencias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.20 Respuestas 401, 403 y insufficient_scope",
    "id": "14-20-respuestas-401-403-y-insufficient-scope"
  },
  {
    "kind": "paragraph",
    "text": "HTTP 401 indica que la solicitud no tiene credenciales de autenticación válidas para el recurso. La respuesta debe utilizar WWW-Authenticate cuando corresponda, proporcionando el esquema y los parámetros seguros. El código no significa necesariamente \"usuario inexistente\"; puede representar un token faltante, caducado, una suscripción no válida o una audiencia incorrecta."
  },
  {
    "kind": "paragraph",
    "text": "HTTP 403 indica que el servidor comprende la solicitud y se niega a atenderla. Puede ocurrir cuando la identidad es válida pero no tiene permiso. En algunos recursos confidenciales, el servidor puede preferir que 404 no revele su existencia, siempre que el comportamiento sea coherente y esté documentado."
  },
  {
    "kind": "paragraph",
    "text": "Cuando se utilizan tokens de portador, errores como invalid_token e insufficient_scope ayudan al cliente, pero los detalles no deben revelar claves, reglas internas o la existencia de datos. La gateway y el backend deben registrar internamente la causa exacta y exponer un error estable, correlacionable y seguro al consumidor."
  },
  {
    "kind": "table",
    "caption": "Tabla 13 - El estado externo debe preservar la semántica; el registro interno conserva el diagnóstico.",
    "headers": [
      "Situación",
      "Estado probable",
      "evidencia interna"
    ],
    "rows": [
      [
        "Token faltante o no válido",
        "401",
        "motivo de validación y emisor/audiencia esperado."
      ],
      [
        "Token válido sin permiso",
        "403",
        "scope, rol o regla denegada."
      ],
      [
        "Característica deliberadamente oculta",
        "404 posible",
        "decisión política registrada."
      ],
      [
        "Límite de tarifa excedido",
        "429",
        "identidad, plan, límite y ventana."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Respuesta externa sin detalles sensibles"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"pagamentos\", error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.example/problems/authentication\",\n  \"title\": \"Credencial inválida o ausente\",\n  \"status\": 401,\n  \"correlationId\": \"9c0f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.21 Registros, auditoría, privacidad y correlación",
    "id": "14-21-registros-auditoria-privacidad-y-correlacion"
  },
  {
    "kind": "paragraph",
    "text": "Los registros de acceso deben registrar el principal, el tipo de identidad, el cliente, el emisor, la audiencia, la operación, el recurso, la decisión, la versión de la política y el ID de correlación. No registre bearer token, secreto, contraseña, cookie o clave completa. Cuando un identificador es confidencial, utilice seudonimización o hash estable controlado según sea necesario para la investigación."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría debe distinguir entre autenticación exitosa, autorización denegada y falla de infraestructura. Un 401 para un token caducado es diferente de un error al recuperar metadata. Un 403 desde la gateway es diferente de un 403 desde el backend. Campos como decision_source y Response_origin reducen las investigaciones basadas en conjeturas."
  },
  {
    "kind": "paragraph",
    "text": "La retención y el acceso a los registros deben respetar la privacidad y el propósito. Las afirmaciones del perfil no se deben copiar en su totalidad para todos los eventos. Registre solo los atributos necesarios para la seguridad, el soporte y el cumplimiento. Los registros administrativos de los cambios de políticas y subvenciones son tan importantes como los registros de llamadas."
  },
  {
    "kind": "table",
    "caption": "Tabla 14: Identidad y decisión de registros de auditoría útiles sin filtrar credenciales.",
    "headers": [
      "campo",
      "Ejemplo",
      "Precaución"
    ],
    "rows": [
      [
        "identificación principal_",
        "iss + sub normalizado",
        "No utilice correo electrónico modificable como clave única."
      ],
      [
        "id_cliente_",
        "aplicación de llamada",
        "preservar en flujos delegados."
      ],
      [
        "método de autenticación_",
        "mTLS, JWT, sesión",
        "no registre material de credenciales."
      ],
      [
        "decisión",
        "permitir/denegar",
        "incluya la política y el punto que usted decidió."
      ],
      [
        "ID de correlación _",
        "identificador de extremo a extremo",
        "validar y normalizar el valor externo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.22 Amenazas y endurecimiento",
    "id": "14-22-amenazas-y-endurecimiento"
  },
  {
    "kind": "paragraph",
    "text": "El relleno de credenciales y la pulverización de contraseñas explotan las contraseñas reutilizadas. Phishing captura sesión o factor. La filtración secreta expone las credenciales de las aplicaciones en repositorios y canalizaciones. La reproducción de tokens reutiliza tokens al portador. Los ataques de confusión hacen que un sistema acepte tokens de otro contexto. La autorización a nivel de objeto roto permite el acceso al recurso de otro usuario incluso con un token válido."
  },
  {
    "kind": "paragraph",
    "text": "El endurecimiento comienza con privilegios mínimos, credenciales breves, rotación automática y separación de audiencias. Los JWT deben seguir buenas prácticas de algoritmos, tipificación y validación. Es necesario restringir los URI, los clientes y los ámbitos de redireccionamiento. Las sesiones y tokens de actualización deben tener revocación y detección de anomalías según el riesgo."
  },
  {
    "kind": "paragraph",
    "text": "La autorización debe ocurrir en cada objeto y función, no solo en el endpoint genérico. Listar /contas con scope contatos.read no garantiza que el sujeto pueda ver todas las cuentas devueltas. El backend debe filtrar por relación y evitar que los ID manipulados eludan la regla."
  },
  {
    "kind": "table",
    "caption": "Tabla 15: Los tokens válidos no eliminan las fallas de autorización y del ciclo de vida.",
    "headers": [
      "Amenaza",
      "Defecto explotado",
      "control principal"
    ],
    "rows": [
      [
        "Replay de fichas",
        "portador copiable",
        "TLS, vencimiento corto y restricción del remitente cuando sea necesario."
      ],
      [
        "Sustitución de tokens",
        "audiencia/tipo no validado",
        "aud, iss, typ y reglas separados por token."
      ],
      [
        "BOLA",
        "objeto sin control de propiedad",
        "autorización por objeto en el servicio."
      ],
      [
        "Fuga secreta",
        "credencial persistente en el código",
        "bóveda, federación y escaneo."
      ],
      [
        "Arrastre de privilegios",
        "subvenciones acumuladas",
        "revisión periódica y ciclo de vida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.23 Troubleshooting basada en evidencia",
    "id": "14-23-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "La investigación comienza identificando quién produjo la respuesta. Verifique si la solicitud llegó al gateway, si había una credencial, qué política se ejecutó y si se llamó al backend. Un 401 generado en el borde no aparecerá en el registro de la aplicación. Puede producirse un 403 desde el backend después de que la gateway acepte el token."
  },
  {
    "kind": "paragraph",
    "text": "Para JWT, extraiga encabezados y claims solo en un entorno seguro, sin pegar tokens de producción en sitios web externos. Compare iss, aud, exp, nbf, typ, kid, ámbitos y client_id con la configuración. Confirme el reloj de la gateway, el descubrimiento de OpenID, JWKS y la rotación de claves. La suscripción válida con una audiencia incorrecta debe seguir rechazándose."
  },
  {
    "kind": "paragraph",
    "text": "Para autorización reproducir con el mismo principio y recurso. Verifique atributos, tenant, propiedad, versión de política y caché. Es posible que un permiso recién otorgado no aparezca debido a un retraso en la replicación o a un token antiguo. Puede ser necesario emitir un nuevo token cuando los claims se incorporan en el momento de la emisión."
  },
  {
    "kind": "table",
    "caption": "Tabla 16 - El diagnóstico debe correlacionar la credencial, el punto de decisión y de respuesta.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "401 intermitente",
        "vencimiento, asimetría del reloj, rotación de claves",
        "marcas de tiempo, niño, JWKS y nodo de gateway."
      ],
      [
        "403 solo en algunas identificaciones",
        "propiedad o tenant",
        "regla de recurso, principal y dominio."
      ],
      [
        "Funciona en el portal, el script falla",
        "audiencia, tipo de cliente o credencial",
        "tokens comparados y flujo utilizado."
      ],
      [
        "La gateway acepta, el backend rechaza",
        "propagación o política divergente",
        "encabezados confiables, audiencia interna y registros de ambos saltos."
      ],
      [
        "Después de que la concesión todavía lo niega",
        "token/caché antiguo",
        "iat, versión de política y atributo TTL."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.24 Estudios de casos y laboratorios",
    "id": "14-24-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: access token aceptado como ID token"
  },
  {
    "kind": "paragraph",
    "text": "Un SPA utiliza el access token devuelto por el proveedor para establecer la sesión local del usuario, leyendo sub y correo electrónico sin validar audiencia ni tipo. La aplicación presenta y acepta un token destinado a otra API. La firma es válida, pero el token no se emitió para ese cliente."
  },
  {
    "kind": "paragraph",
    "text": "La solución separa la validación del ID token y del access token, requiere una audiencia y un nonce adecuados y utiliza la biblioteca de protocolos. El caso muestra que el cifrado válido no reemplaza el contexto de uso."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: la gateway autoriza, el backend expone el objeto de otro cliente"
  },
  {
    "kind": "paragraph",
    "text": "La gateway requiere scope contas.read y reenvía GET /contas/{id}. El backend busca el ID sin comprobar el enlace con el asunto. Un consumidor autenticado cambia la identificación y lee la cuenta de otro cliente. La autenticación y el scope son correctos, pero existe una Broken Object Level Authorization."
  },
  {
    "kind": "paragraph",
    "text": "La solución aplica autorización por objeto en el dominio y registra el principal, el tenant y el recurso. La gateway continúa validando el token y el scope, pero no intenta inferir la propiedad sin datos confiables."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: secreto compartido entre veinte aplicaciones"
  },
  {
    "kind": "paragraph",
    "text": "Veinte jobs utilizan el mismo client_id y secreto. Tras una filtración, la organización necesita rotar a todos simultáneamente y no logra identificar al responsable del tráfico. La migración crea una identidad individual, un propietario, un scope y una cuota por trabajo, seguido de la revocación del secreto compartido."
  },
  {
    "kind": "paragraph",
    "text": "La ganancia no es sólo criptográfica. La individualización permite privilegios mínimos, auditorías, deprecación y respuesta a incidentes por consumidor."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1: validar afirmaciones de un JWT sintético"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Genere un JWT de laboratorio con emisor, audiencia, exp y scope controlados.",
      "Valide la firma con una clave local y luego cambie aud, exp y typ.",
      "Confirme que cada cambio sea rechazado por una regla específica.",
      "Registre únicamente encabezados y claims sintéticos, nunca tokens de producción reales."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2 - matriz de autorización"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Modele operaciones de lectura, creación, aprobación y cancelación.",
      "Enumere roles, atributos, relaciones y condiciones necesarias.",
      "Implemente permitir y denegar casos con pruebas automatizadas.",
      "Incluya el intento de acceder al objeto de otro tenant."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3: política en la gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure una gateway o un simulador autorizado para requerir audiencia y scope.",
      "Envía tokens faltantes, vencidos, de otro emisor y sin scope.",
      "Compare 401 y 403 y registre qué capa respondió.",
      "Cambie la clave de firma y observe el comportamiento de cache y rotación."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 4: inventario de identidades de cargas de trabajo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Enumere las entidades principales de servicio, las identidades administradas, las cuentas de servicio y los secretos para un entorno de laboratorio.",
      "Propietario asociado, recurso, permisos y vencimiento.",
      "Identifique credenciales estáticas reemplazables por federación o identidad administrada.",
      "Definir proceso de desactivación y prueba de revocación."
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
    "text": "La identidad es la base del control de acceso, pero depende del registro, las credenciales, la validación y el ciclo de vida. El identificador no es prueba. La autenticación establece un principal en un contexto determinado; La autorización decide una acción sobre un recurso. La delegación, la federación y la auditoría completan la cadena."
  },
  {
    "kind": "paragraph",
    "text": "Las API pueden utilizar claves API, básicas, sesiones, tokens opacos, JWT, mTLS y pruebas de posesión. Cada mecanismo tiene límites. Los tokens al portador son reutilizables para quien los obtenga; los tokens restringidos por el remitente reducen la replay. El JWT firmado no está cifrado y necesita validación del emisor, la audiencia, la hora, el tipo, el algoritmo y las afirmaciones."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 maneja la autorización delegada; OpenID Connect agrega autenticación para los clientes. El access token, el ID token y el refresh token tienen diferentes destinatarios y propósitos. La autorización puede combinar RBAC, ABAC, ReBAC y políticas centralizadas, pero las reglas de dominio y objeto siguen siendo responsabilidad del servicio."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways funcionan como PEP para controles transversales y pueden validar tokens, certificados y claves. La arquitectura debe preservar la identidad del usuario y de la aplicación, evitar encabezados falsificados, registrar el origen de la decisión y utilizar identidades de workload de corta duración. La seguridad eficaz requiere pruebas mínimas de privilegios, rotación, observabilidad y negación."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 15 profundizará en la autenticación básica, el resumen y las claves API, analizando el streaming de credenciales, los desafíos HTTP, el almacenamiento secreto, la reproducción, la rotación, la identificación de aplicaciones y las limitaciones de estos mecanismos en las API empresariales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de identidad y acceso",
    "id": "lista-de-verificacion-de-identidad-y-acceso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada llamada se puede asociar con un principal individual y un propietario conocido.",
      "La autenticación es independiente de la operación y la autorización de objetos.",
      "El emisor, la audiencia, el tipo, el algoritmo y el tiempo se validan explícitamente.",
      "El access token y el ID token no son intercambiables.",
      "Las claves y secretos de API no aparecen en las URL, los registros ni el código fuente.",
      "Las credenciales de solicitud tienen fecha de rotación y revisión.",
      "Los ámbitos, roles, permisos y atributos tienen una semántica documentada.",
      "La gateway elimina los encabezados de identidad externos antes de ingresar al contexto confiable.",
      "El backend aplica una autorización detallada cuando depende del estado o la propiedad.",
      "401 y 403 preservan la semántica y no revelan detalles sensibles.",
      "Los registros registran principal, cliente, decisión, recurso, política y correlación sin tokens.",
      "Las cargas de trabajo utilizan credenciales cortas o federación cuando es posible.",
      "Las políticas tienen pruebas positivas y negativas, control de versiones y reversión.",
      "El proceso de inventario y cierre incluye subvenciones, sesiones, tokens y certificados."
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
      "Diferenciar entre sujeto, principal, identificador, credencial y token.",
      "Explique por qué la autenticación sólida no soluciona la autorización a nivel de objeto roto.",
      "Compare la clave API, el secreto del cliente, el certificado y la federación de cargas de trabajo.",
      "Explique por qué una firma válida no es suficiente para aceptar un JWT.",
      "Diferenciar access token, token de ID y refresh token.",
      "Modelo de autorización de una transferencia utilizando rol, atributos y propiedad.",
      "Describa cuándo se pueden utilizar 401, 403 y 404.",
      "Explique el papel de PEP, PDP, PIP y PAP.",
      "Proponer registros para una llamada delegada preservando al mismo tiempo el usuario y la aplicación.",
      "Cree un plan de migración de Básico a credencial o token asimétrico.",
      "Lista de controles contra la reproducción de tokens al portador.",
      "Describir la troubleshooting para el token aceptado en la gateway y rechazado en el backend."
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
    "caption": "Tabla 17 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "ABAC",
        "Autorización basada en atributos de sujeto, recurso, acción y entorno."
      ],
      [
        "access token",
        "Credencial utilizada por un cliente para acceder a un resource server."
      ],
      [
        "clave API",
        "Valor asociado al consumidor o plan; no implica una identidad fuerte en sí misma."
      ],
      [
        "Audiencia",
        "Destinatario a quien se emitió un token."
      ],
      [
        "Autenticación",
        "Proceso de validación de prueba vinculada a una identidad."
      ],
      [
        "Autorización",
        "Decisión sobre la acción permitida a un principal sobre qué recurso."
      ],
      [
        "bearer token",
        "Token utilizable por quien posee el valor."
      ],
      [
        "claim",
        "Afirmación transportada en un token o una aserción."
      ],
      [
        "Credencial",
        "Material utilizado para demostrar control o vinculación de identidad."
      ],
      [
        "Delegación",
        "Concesión limitada para actuar en nombre de otro sujeto."
      ],
      [
        "Federación",
        "Aceptación de identidades o afirmaciones de otro dominio de confianza."
      ],
      [
        "ID token",
        "Token de OpenID Connect destinado al cliente para comunicar la autenticación."
      ],
      [
        "Emisor",
        "Entidad que emite y firma el token o aserción."
      ],
      [
        "JWT",
        "Formato compacto para claims protegidas por JWS o JWE."
      ],
      [
        "PDP",
        "Componente que evalúa la política y produce decisión."
      ],
      [
        "PEP",
        "Componente que aplica la decisión de acceso."
      ],
      [
        "principal",
        "Representación operativa de una identidad en el sistema."
      ],
      [
        "RBAC",
        "Autorización basada en roles."
      ],
      [
        "ReBAC",
        "Autorización basada en relaciones."
      ],
      [
        "Scope",
        "Autoridad delegada expresada para un access token."
      ],
      [
        "Sender-constrained token",
        "Token vinculado a la prueba de una clave de cliente."
      ],
      [
        "Workload identity",
        "Identidad no humana asignada al software en ejecución."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de elección de mecanismo",
    "id": "anexo-a-matriz-de-eleccion-de-mecanismo"
  },
  {
    "kind": "table",
    "caption": "Tabla 18 - La elección final depende del riesgo, los consumidores y la infraestructura.",
    "headers": [
      "Escenario",
      "Mecanismo de arranque",
      "Controles adicionales"
    ],
    "rows": [
      [
        "API pública de bajo riesgo con cuota",
        "clave API",
        "TLS, rotación, limitación de velocidad y monitorización."
      ],
      [
        "Integración heredada controlada",
        "Temporal básico",
        "credencial individual, TLS, bóveda y plan de migración."
      ],
      [
        "Usuario en aplicación web",
        "OIDC + sesión o tokens",
        "MFA, CSRF/XSS, audiencia y autorización de objetos."
      ],
      [
        "Servicio a servicio",
        "credenciales de cliente, mTLS o federación",
        "scope mínimo, audiencia, rotación y propietario."
      ],
      [
        "Workload en Azure",
        "identidad administrada",
        "RBAC y registros de inicio de sesión mínimos."
      ],
      [
        "Workload multinube/Kubernetes",
        "federación de cargas de trabajo o SPIFFE",
        "confianza específica, credencial corta y atestación."
      ],
      [
        "API de alto riesgo",
        "sender-constrained token + política contextual",
        "mTLS/DPoP, intensificación, detección y auditoría mejorada."
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
      "IETF. RFC 9110 - Semántica HTTP. 2022.",
      "IETF. RFC 7617: el esquema de autenticación HTTP básico. 2015.",
      "IETF. RFC 6750: uso de tokens de portador de OAuth 2.0. 2012.",
      "IETF. RFC 7519: token web JSON (JWT). 2015.",
      "IETF. RFC 7662: Introspection de tokens OAuth 2.0. 2015.",
      "IETF. RFC 8414: Metadata del authorization server OAuth 2.0. 2018.",
      "IETF. RFC 8705: tokens de acceso vinculados a certificados y autenticación de cliente Mutual-TLS de OAuth 2.0. 2020.",
      "IETF. RFC 8725: Mejores prácticas actuales de tokens web JSON. 2020.",
      "IETF. RFC 9068: perfil JWT para tokens de acceso OAuth 2.0. 2021.",
      "IETF. RFC 9449: OAuth 2.0 que demuestra proof-of-possession. 2023.",
      "IETF. RFC 9700: mejores prácticas actuales para la seguridad de OAuth 2.0. 2025.",
      "IETF. RFC 9728: Metadata de recursos protegidos de OAuth 2.0. 2025.",
      "Fundación OpenID. OpenID Connect Core 1.0, segundo conjunto de erratas.",
      "NIST. SP 800-63-4 - Directrices de identidad digital. 2025.",
      "NIST. SP 800-63B-4 - Autenticación y gestión de autenticadores. 2025.",
      "NIST. SP 800-207: Arquitectura de zero trust. 2020.",
      "SPIFFE. Conceptos SPIFFE, API de workload y especificaciones SVID.",
      "Microsoft aprende. Microsoft Introduzca identidades de workload e identidades administradas.",
      "Microsoft aprende. Políticas de validación-jwt y validación-azure-ad-token de Azure API Management.",
      "Documentación Axway. OAuth 2.0, OpenID Connect y verificación JWT en API Gateway.",
      "OWASP. API Security Top 10 - Edición 2023."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los protocolos, bibliotecas, productos y políticas de identidad evolucionan. Antes de implementar cualquier flujo o política, valide las especificaciones actuales, la versión del producto y el comportamiento en un entorno autorizado."
  }
];
