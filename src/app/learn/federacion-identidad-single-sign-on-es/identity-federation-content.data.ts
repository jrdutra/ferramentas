import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const IDENTITY_FEDERATION_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Una autenticación, múltiples aplicaciones y dominios confiables"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/es/overview.svg",
    "alt": "Usuario autenticado por un Identity Provider que accede a múltiples aplicaciones en dominios confiables",
    "caption": "Figura de apertura: la federación conecta dominios de identidad; SSO reduce los desafíos repetidos sin eliminar las sesiones locales."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La federación transfiere confianza entre dominios; SSO reutiliza una sesión de autenticación bajo reglas controladas."
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
    "text": "Los capítulos anteriores presentaron OAuth 2.0, OpenID Connect, JWT/JOSE y SAML 2.0. Cada tecnología resuelve parte del problema: delegación de acceso, autenticación moderna, protección de tokens o intercambio de aserciones entre organizaciones. Este capítulo reúne estas piezas en una visión arquitectónica más amplia: cómo los dominios de identidad independientes establecen confianza y cómo la autenticación realizada en un punto puede reutilizarse en múltiples aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "La Federación de Identidad es un acuerdo de confianza en el que un dominio acepta claims de identidad producidas por otro dominio. El Single Sign-On es la experiencia en la que el usuario accede a múltiples aplicaciones sin repetir el desafío de autenticación con cada acceso. Los conceptos están relacionados, pero no son equivalentes. Es posible tener SSO dentro de un único dominio sin federación y es posible federar identidades sin proporcionar una experiencia de SSO perfecta."
  },
  {
    "kind": "paragraph",
    "text": "La verdadera complejidad surge cuando coexisten múltiples sesiones, protocolos, claves, certificados, identificadores, políticas y ciclos de vida. La sesión del Identity Provider no es la misma que la sesión de la aplicación. Un token emitido para una API no representa necesariamente la sesión del navegador. Cerrar sesión en una capa no cierra automáticamente la sesión en las demás. La account linking mal diseñada puede vincular identidades incorrectas. Los metadata obsoletos pueden arruinar toda la federación."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo profundiza en dominios de confianza, topologías, agentes de identidad, federación SAML y OIDC, sesiones, cierre de sesión, autenticación incremental, multitenencia, B2B/B2C, account linking, federación de cargas de trabajo, seguridad, privacidad, alta disponibilidad e integración con API Gateways. El objetivo es ofrecer un modelo mental que permita diseñar, operar y diagnosticar federaciones corporativas complejas."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "En cada flujo, separe cuatro elementos: la sesión en el Identity Provider, la aserción o token transportado, la sesión local creada por la aplicación y la política de autorización aplicada al recurso. Muchos problemas de SSO surgen cuando estas capas se tratan como una sola cosa."
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
      "Distinguir identidad federada, SSO, aprovisionamiento, sincronización y delegación.",
      "Explique los dominios de confianza, IdP, SP, RP, intermediario, directorio y atributos de autoridad.",
      "Compare la confianza directa, la federación radial, multilateral y dinámica.",
      "Comprenda las capas de sesión en el IdP, la aplicación, el navegador y las API.",
      "Relacione SAML 2.0, OpenID Connect y otros protocolos con casos de uso de federación.",
      "Diseñe metadata, claves, certificados, endpoints, claims e identificadores de manera gobernada.",
      "Evalúe la account linking, los identificadores públicos/por pares y los riesgos de correlación indebida.",
      "Aplicar MFA, step-up, nivel de aseguramiento, acr y amr en recorridos federados.",
      "Comprender la intermediación de identidades, la traducción de protocolos y la federación B2B/B2C/multitenant.",
      "Diagnosticar bucles de inicio de sesión, fallos de cierre de sesión, desfase del reloj, audience, issuer, metadata y sesión."
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
      "20.1 Identidad federada y SSO: conceptos diferentes",
      "20.2 Dominios de identidad y límites de confianza",
      "20.3 Roles: IdP, SP, RP, intermediario y autoridad de atributos",
      "20.4 Topologías de confianza federadas",
      "20.5 SSO y múltiples capas de sesión",
      "20.6 Federación con SAML 2.0 y OpenID Connect",
      "20.7 Metadata, claves, certificados y descubrimiento",
      "20.8 Incorporación, ciclo de vida y gobernanza de socios",
      "20.9 Identificadores, claims y account linking",
      "20.10 AMF, niveles de incremento y garantía",
      "20.11 Cierre de sesión y sesiones de cierre",
      "20.12 Identity brokeres y traducción de protocolos",
      "20.13 Multitenencia, B2B, B2C e identidad de la fuerza laboral",
      "20.14 Federación de cargas de trabajo y Token Exchange",
      "20.15 Seguridad, privacidad y amenazas",
      "20.16 Alta disponibilidad y recuperación ante desastres",
      "20.17 Integración con API Gateways",
      "20.18 Observabilidad, auditoría y retroubleshooting",
      "20.19 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.1 Identidad federada y SSO: conceptos diferentes",
    "id": "20-1-identidad-federada-y-sso-conceptos-diferentes"
  },
  {
    "kind": "paragraph",
    "text": "La federación de identidades es el establecimiento de una relación de confianza entre distintos dominios administrativos. Un dominio autentica al sujeto y produce una afirmación; otro dominio acepta esta afirmación y crea un principal local o temporal. El consumidor de la afirmación no necesita conocer la contraseña, el factor biométrico o el dispositivo utilizado en la autenticación original. Confía en el proceso del remitente y en las condiciones del mensaje recibido."
  },
  {
    "kind": "paragraph",
    "text": "El Single Sign-On describe una experiencia: después de autenticarse una vez, el usuario accede a aplicaciones adicionales sin repetir completamente el desafío. El SSO normalmente depende de una sesión central en el IdP. Cuando una nueva aplicación redirige el navegador a este IdP, la sesión existente le permite emitir una nueva aserción. Aun así, cada aplicación mantiene su propia sesión, sus propias reglas de caducidad y autorización independiente."
  },
  {
    "kind": "paragraph",
    "text": "El aprovisionamiento y la sincronización son problemas diferentes. Los procesos SCIM, directorios y IAM pueden crear cuentas y grupos antes del primer inicio de sesión; La federación le permite autenticar y transportar atributos en el momento del acceso. Una organización puede utilizar el aprovisionamiento justo a tiempo durante el primer inicio de sesión, pero esto no elimina la necesidad de controlar el cierre, los cambios de roles y la revocación de acceso."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Conceptos relacionados, pero con diferentes responsabilidades.",
    "headers": [
      "Concepto",
      "pregunta principal",
      "Ejemplo"
    ],
    "rows": [
      [
        "Federación",
        "¿En qué issuer confía la aplicación?",
        "La empresa A acepta claims del IdP de la empresa B."
      ],
      [
        "SSO",
        "¿El usuario necesita autenticarse nuevamente?",
        "Una sesión en el IdP sirve para múltiples aplicaciones."
      ],
      [
        "Aprovisionamiento",
        "¿La cuenta existe y tiene atributos?",
        "SCIM crea el usuario y los grupos en SaaS."
      ],
      [
        "Delegación",
        "¿Quién actúa on-behalf-of quién?",
        "La aplicación accede a la API on-behalf-ofl usuario."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.2 Dominios de identidad y límites de confianza",
    "id": "20-2-dominios-de-identidad-y-limites-de-confianza"
  },
  {
    "kind": "paragraph",
    "text": "Un dominio de identidad es el conjunto administrativo que controla el registro, la autenticación, el ciclo de vida, las políticas, las credenciales y los atributos de una población. En una federación, el dominio consumidor acepta que otro dominio realice parte de estas responsabilidades. Esta aceptación debe ser explícita: qué issuers son confiables, qué algoritmos están permitidos, qué claims pueden guiar la autorización y qué niveles de autenticación son suficientes para cada operación."
  },
  {
    "kind": "paragraph",
    "text": "El límite de confianza no coincide necesariamente con la red. Un IdP puede estar en la nube, el SP en un centro de datos y el usuario en una red pública. La confianza es criptográfica y administrativa: claves, certificados, metadata, contratos, auditorías y procedimientos de respuesta a incidentes respaldan la relación. Colocar componentes en la misma VNet o VPN no reemplaza la validación de issuer, audience, firma y condiciones temporales."
  },
  {
    "kind": "paragraph",
    "text": "Los dominios federados también necesitan alinear la semántica. El atributo role=admin de un socio no debe otorgar automáticamente la administración local. Los claims externos deben correlacionarse con conceptos internos bajo una política controlada. El consumidor de la federación sigue siendo responsable de autorizar el acceso a su recurso."
  },
  {
    "kind": "subhead",
    "text": "Umbral de confianza"
  },
  {
    "kind": "paragraph",
    "text": "Aceptar una afirmación de identidad no significa delegar toda la política de autorización al issuer. El dominio consumidor debe decidir en qué declaraciones externas se confía, cómo se transformarán y qué acciones locales pueden permitir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.3 Roles: IdP, SP, RP, intermediario y autoridad de atributos",
    "id": "20-3-roles-idp-sp-rp-intermediario-y-autoridad-de-atributos"
  },
  {
    "kind": "paragraph",
    "text": "El Identity Provider autentica al sujeto y emite información de identidad. En SAML, la aplicación consumidora se denomina tradicionalmente Service Provider. En OpenID Connect, se llama Parte de confianza. Los nombres cambian, pero la función es similar: confiar en el remitente, validar el mensaje y crear una sesión o identidad local."
  },
  {
    "kind": "paragraph",
    "text": "Un intermediario de identidad se posiciona entre múltiples proveedores y múltiples aplicaciones. Recibe aserciones de un dominio, aplica transformaciones de protocolo y claims, y emite una nueva aserción a otro dominio. El broker reduce el número de integraciones punto a punto, pero se convierte en un componente crítico: concentra claves, políticas, disponibilidad, registros y el impacto de una configuración incorrecta."
  },
  {
    "kind": "paragraph",
    "text": "Una autoridad de atributo es una fuente confiable de atributos adicionales, que pueden no provenir del IdP principal. En las arquitecturas modernas, esta función puede realizarse mediante directorios, API de perfil, mecanismos de derechos o puntos de información de políticas. El uso de atributos dinámicos requiere atención a la frescura, la coherencia y la privacidad."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/es/figure-01-federation-flow.svg",
    "alt": "Flujo conceptual de federación y SSO entre usuario, aplicación, proveedor y sesión local",
    "caption": "Figura 1: la aplicación crea su propia sesión después de validar la aserción federada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.4 Topologías de confianza federadas",
    "id": "20-4-topologias-de-confianza-federadas"
  },
  {
    "kind": "paragraph",
    "text": "En confianza directa, cada aplicación configura individualmente el IdP asociado. El modelo es simple para unas pocas relaciones, pero no se adapta bien: cada cambio de certificado, endpoint o reclamo debe coordinarse con múltiples sistemas. En ecosistemas grandes, la cantidad de integraciones crece rápidamente y la coherencia de la seguridad disminuye."
  },
  {
    "kind": "paragraph",
    "text": "En el modelo hub-and-spoke, un corredor o API Gateway de federación centraliza las relaciones. Los IdP confían en el intermediario y también lo hacen las aplicaciones. El corredor normaliza protocolos y atributos, aplica políticas y proporciona una interfaz más estable. La ventaja operativa es significativa, pero requiere alta disponibilidad y una gobernanza estricta, ya que una falla afecta múltiples viajes."
  },
  {
    "kind": "paragraph",
    "text": "Las federaciones multilaterales utilizan una autoridad agregada o metadata para distribuir la confianza entre muchos participantes. El sector académico y los ecosistemas regulados son ejemplos comunes. En los modelos dinámicos, las entidades construyen cadenas de confianza y consultan declaraciones firmadas. Estos arreglos reducen la configuración manual pero aumentan la complejidad de la validación y la gobernanza."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/es/figure-02-trust-topologies.svg",
    "alt": "Comparación entre confianza directa y topología hub-and-spoke con broker",
    "caption": "Figura 2: La topología define cómo se distribuyen y operan las relaciones de confianza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.5 SSO y múltiples capas de sesión",
    "id": "20-5-sso-y-multiples-capas-de-sesion"
  },
  {
    "kind": "paragraph",
    "text": "El SSO a menudo se explica como una única sesión, pero la arquitectura real contiene varias. El IdP tiene una sesión de autenticación central, normalmente representada por una cookie. Cada aplicación crea su sesión local después de validar la aserción. Las API pueden recibir access tokens separados, con su propia audience y vencimiento. El navegador mantiene cookies y contexto, pero no es la autoridad final en ninguna de estas sesiones."
  },
  {
    "kind": "paragraph",
    "text": "Cuando el usuario accede a una segunda aplicación, se redirige al IdP. Si la sesión central aún es válida y la política lo permite, el IdP emite una nueva afirmación sin solicitar credenciales. Esto es SSO. La segunda aplicación aún necesita validar issuer, audience, nonce o InResponseTo, condiciones temporales y firma, y solo entonces crear su propia sesión."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas de tiempo pueden diferir. El IdP puede mantener una sesión durante ocho horas, mientras que una aplicación financiera requiere una nueva autenticación cada quince minutos para acciones sensibles. Otro sistema podría aceptar una sesión de una hora pero requerir MFA para una transferencia. SSO no elimina la autenticación intensificada ni los controles de riesgo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/es/figure-03-session-layers.svg",
    "alt": "Capas de sesión independientes de IdP, aplicación, navegador y access token",
    "caption": "Figura 3: La sesión central, la sesión local y los tokens tienen ciclos de vida independientes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.6 Federación con SAML 2.0 y OpenID Connect",
    "id": "20-6-federacion-con-saml-2-0-y-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 se utiliza ampliamente en SSO empresarial y en la integración con aplicaciones web empresariales. Transporta claims XML a través de enlaces como HTTP-Redirect y HTTP-POST. Los metadata describen ID de entidades, endpoints, certificados y capacidades. El modelo está maduro, pero requiere cuidado con la firma XML, la canonicalización, el Destino, la Restricción de audience, el Destinatario y la Respuesta en respuesta."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect utiliza OAuth 2.0 como base e introduce ID token, descubrimiento, información de usuario, scopes de identidad y mecanismos de sesión y cierre de sesión. Se adapta naturalmente a aplicaciones web modernas, SPA, dispositivos móviles y arquitecturas orientadas a JSON. La validación debe considerar el issuer, la audience, azp, nonce, exp, iat, firma y algoritmo."
  },
  {
    "kind": "paragraph",
    "text": "La elección no debe tratarse como una disputa abstracta. SAML puede ser la mejor opción para el SaaS empresarial heredado y la federación de la fuerza laboral; A menudo se prefiere OIDC en aplicaciones modernas y experiencias digitales. Los intermediarios de identidad permiten que un socio SAML acceda a una aplicación OIDC o viceversa, siempre que la transformación preserve el contexto y la seguridad."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Los protocolos tienen funciones similares, pero ecosistemas y mecanismos diferentes.",
    "headers": [
      "Apariencia",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Formato",
        "XML y aserciones.",
        "JSON/JWT y ID token."
      ],
      [
        "Aplicaciones típicas",
        "SSO empresarial y SaaS.",
        "Web moderna, móvil, SPA y BFF."
      ],
      [
        "Descubrimiento",
        "Metadata XML.",
        "Documento de descubrimiento y JWKS."
      ],
      [
        "Sesión y cierre de sesión",
        "Perfil SLO y fijaciones.",
        "Iniciado por RP, front-channel y canal posterior."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.7 Metadata, claves, certificados y descubrimiento",
    "id": "20-7-metadata-claves-certificados-y-descubrimiento"
  },
  {
    "kind": "paragraph",
    "text": "La federación se basa en una configuración confiable de identificadores, endpoints y claves. En SAML, los metadata XML pueden contener ID de entidad, SingleSignOnService, AssertionConsumerService, SingleLogoutService y certificados. En OIDC, el documento Discovery publica Authorization_endpoint, token_endpoint, jwks_uri, issuer y recursos admitidos."
  },
  {
    "kind": "paragraph",
    "text": "Las claves y los certificados necesitan una rotación planificada. El intercambio debe admitir la renovación: la nueva clave se publica antes de usarse y la clave anterior permanece disponible hasta que caduquen los tokens o las claims emitidas con ella. La rotación instantánea sin ventana de coexistencia provoca fallas distribuidas de las que es difícil recuperarse."
  },
  {
    "kind": "paragraph",
    "text": "Los metadata no deben consumirse sin validación. Es necesario definir las URL, TLS, firma de metadata, origen del documento, caché y frecuencia de actualización. En federación con socios, los cambios deben pasar por un proceso de gestión de cambios, contactos técnicos y pruebas previas."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de resumen de metadata OIDC"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.empresa.example\",\n  \"authorization_endpoint\": \"https://id.empresa.example/authorize\",\n  \"token_endpoint\": \"https://id.empresa.example/token\",\n  \"jwks_uri\": \"https://id.empresa.example/.well-known/jwks.json\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"PS256\"]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.8 Incorporación, ciclo de vida y gobernanza de socios",
    "id": "20-8-incorporacion-ciclo-de-vida-y-gobernanza-de-socios"
  },
  {
    "kind": "paragraph",
    "text": "Una federación segura comienza antes del primer mensaje. La incorporación debe identificar las partes responsables, dominios, entornos, endpoints, certificados, claims, audiences, niveles de autenticación, contactos de incidentes, ventanas de mantenimiento y criterios de cierre. Los entornos de prueba deben utilizar entidades y claves independientes de las de producción."
  },
  {
    "kind": "paragraph",
    "text": "El contrato de federación debe definir quién es responsable de la prueba de identidad, el ciclo de vida del usuario y la calidad de los atributos. Si un empleado abandona la empresa colaboradora, ¿cuánto tiempo tarda en revocarse el acceso? Si se filtra un certificado, ¿cuál es el procedimiento de emergencia? Si un atributo cambia de significado, ¿cómo se protegerán las aplicaciones consumidoras?"
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza necesita inventariar relaciones activas, algoritmos, certificados, últimas autenticaciones, aplicaciones dependientes y fechas de vencimiento. Las federaciones olvidadas representan un riesgo: claves antiguas, endpoints abandonados y cuentas sin propietario siguen siendo rutas de acceso."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: La federación es una relación de ciclo de vida, no solo una configuración inicial.",
    "headers": [
      "Fase",
      "Actividades esenciales",
      "evidencia"
    ],
    "rows": [
      [
        "Incorporación",
        "Intercambio de metadata, pruebas, mapeo y aprobación.",
        "Lista de verificación y resultado de aprobación."
      ],
      [
        "Operación",
        "Seguimiento, rotación y soporte.",
        "Métricas, alertas y contactos válidos."
      ],
      [
        "Cambiar",
        "Nuevo certificado, endpoint o reclamo.",
        "Plan de convivencia y retroceso."
      ],
      [
        "Offboarding",
        "Bloqueo, eliminación de confianza y auditoría.",
        "Confirmación de cierre."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.9 Identificadores, claims y account linking",
    "id": "20-9-identificadores-claims-y-account-linking"
  },
  {
    "kind": "paragraph",
    "text": "El identificador federado debe ser estable, único dentro del contexto correcto y es poco probable que se reutilice. El correo electrónico puede cambiar, reciclarse o tener alias; por lo tanto, no debería ser la única clave de enlace. En OIDC, el par issuer + sujeto identifica al usuario. En SAML, el NameID y los atributos deben interpretarse dentro de la entidad issuera y el formato acordado."
  },
  {
    "kind": "paragraph",
    "text": "La account linking asocia una identidad externa con una cuenta local existente. El proceso es delicado: la vinculación automática por correo electrónico puede permitir la adquisición cuando se reutilizan dominios o direcciones. El vínculo debe exigir prueba suficiente de control de ambas identidades, o seguir un proceso administrativo verificado."
  },
  {
    "kind": "paragraph",
    "text": "Los identificadores por pares reducen la correlación entre aplicaciones, ya que un mismo usuario recibe asuntos diferentes para cada sector o cliente. Esta técnica mejora la privacidad, pero requiere una estrategia de soporte y auditoría. Se deben minimizar los claims: la aplicación solo debe recibir los atributos necesarios para el propósito declarado."
  },
  {
    "kind": "subhead",
    "text": "Riesgo de account linking"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trates las coincidencias de correo electrónico como prueba universal de que dos identidades pertenecen a la misma persona. El enlace debe considerar el issuer, la verificación del dominio, el ciclo de vida de la dirección y pruebas controladas adicionales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.10 AMF, niveles de incremento y garantía",
    "id": "20-10-amf-niveles-de-incremento-y-garantia"
  },
  {
    "kind": "paragraph",
    "text": "La Federación necesita transmitir no sólo quién fue autenticado, sino también cómo y cuándo. Las aplicaciones confidenciales pueden requerir autenticación multifactor resistente al phishing o una reautenticación reciente. En OIDC, acr, amr y auth_time ayudan a expresar el contexto. En SAML, AuthnContextClassRef y SessionIndex cumplen una función relacionada."
  },
  {
    "kind": "paragraph",
    "text": "El aumento ocurre cuando una sesión existente es insuficiente para una operación de mayor riesgo. La aplicación solicita un nuevo nivel de autenticación al IdP, posiblemente con MFA. El resultado debe ser validado; no basta con confiar en que el usuario fue redirigido. Las políticas deben definir qué niveles se aceptan para cada viaje."
  },
  {
    "kind": "paragraph",
    "text": "El nivel de seguridad también depende del registro inicial, la gestión de credenciales y el dispositivo. Un factor fuerte aplicado a una identidad mal verificada no produce una garantía alta. En los ecosistemas regulados, los niveles deben definirse de forma objetiva y auditable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.11 Cierre de sesión y sesiones de cierre",
    "id": "20-11-cierre-de-sesion-y-sesiones-de-cierre"
  },
  {
    "kind": "paragraph",
    "text": "El cierre de sesión federado es difícil porque hay varias sesiones independientes. Cerrar la sesión local elimina el acceso a la aplicación, pero la sesión central en el IdP puede permanecer activa. Al regresar, el usuario puede autenticarse silenciosamente. Es posible que cerrar la sesión del IdP no llegue a todas las aplicaciones, especialmente cuando las cookies de terceros están bloqueadas o cuando una aplicación no está disponible."
  },
  {
    "kind": "paragraph",
    "text": "SAML Single Logout coordina LogoutRequest y LogoutResponse entre los participantes. OIDC define el cierre de sesión iniciado por RP, front-channel y canal posterior. El back-channel es más confiable para notificar a los servidores sin depender del navegador, pero requiere endpoints autenticados y un procesamiento sólido. Ningún mecanismo revoca automáticamente todos los access tokens ya emitidos, a menos que exista una integración con la revocación o la introspección."
  },
  {
    "kind": "paragraph",
    "text": "El diseño debe distinguir el cierre de sesión de la interfaz, la terminación de la sesión local, la terminación del IdP y la revocación del token. En aplicaciones de alto riesgo, puede ser necesario registrar una lista de sesiones activas, emitir eventos de revocación y reducir la vida útil de los tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.12 Identity brokeres y traducción de protocolos",
    "id": "20-12-identity-brokeres-y-traduccion-de-protocolos"
  },
  {
    "kind": "paragraph",
    "text": "El corredor reduce las integraciones punto a punto y crea una capa de abstracción. Puede recibir SAML de un socio, convertir la identidad en una sesión interna y emitir OIDC para aplicaciones modernas. También puede consolidar los IdP sociales, la fuerza laboral y los socios B2B. La traducción, sin embargo, no debe inventar un contexto que no existe en el origen."
  },
  {
    "kind": "paragraph",
    "text": "Los niveles de autenticación y claims deben normalizarse cuidadosamente. Un SAML AuthnContext no debe convertirse automáticamente a una acr alta sin una asignación explícita. Los grupos externos se pueden convertir en atributos intermedios, pero la autorización final debe permanecer bajo el control del dominio consumidor."
  },
  {
    "kind": "paragraph",
    "text": "El corredor también centraliza el descubrimiento de IdP, el descubrimiento del ámbito de origen, las políticas de riesgo, MFA, la account linking y la sesión. Esto mejora la coherencia pero aumenta la criticidad operativa. La arquitectura debe proporcionar escalabilidad, claves protegidas, segregación de tenants y recuperación ante desastres."
  },
  {
    "kind": "subhead",
    "text": "Identity broker como punto de traducción y política"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/es/figure-04-identity-broker.svg",
    "alt": "Identity broker que normaliza la confianza, los protocolos, los claims y las sesiones.",
    "caption": "Figura 4: El corredor normaliza la confianza y los protocolos, pero no elimina la responsabilidad de la aplicación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.13 Multitenencia, B2B, B2C e identidad de la fuerza laboral",
    "id": "20-13-multitenencia-b2b-b2c-e-identidad-de-la-fuerza-laboral"
  },
  {
    "kind": "paragraph",
    "text": "La identidad de la fuerza laboral sirve a los empleados y a terceros internos; B2B integra identidades de organizaciones asociadas; B2C sirve a los consumidores a gran escala. Los modelos pueden compartir tecnología, pero tienen diferentes riesgos, atributos y experiencias. Una política corporativa de AMF favorable a los empleados puede resultar inviable para millones de consumidores; Es posible que un reclamo de departamento no exista en B2C."
  },
  {
    "kind": "paragraph",
    "text": "En entornos multitenant, es necesario validar rigurosamente el issuer, el tenant y la audience. Aceptar tokens de cualquier tenant sin una lista de permitidos puede permitir un acceso inadecuado. Las solicitudes deben decidir si confiar en una autoridad común, en tenants específicos o en un intermediario que aplique la política de admisión."
  },
  {
    "kind": "paragraph",
    "text": "El descubrimiento del dominio principal selecciona el IdP correcto según el dominio, la invitación, el tenant o la elección del usuario. El descubrimiento no debe ser vulnerable a la suplantación de identidad o al reenvío a issuers que no sean de confianza. Las invitaciones B2B deben caducar y estar vinculadas a la identidad esperada."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Diferentes poblaciones requieren diferentes políticas de identidad.",
    "headers": [
      "Población",
      "Características",
      "Control crítico"
    ],
    "rows": [
      [
        "fuerza laboral",
        "Directorio corporativo y ciclo de RRHH.",
        "Apagado rápido y fuerte MFA."
      ],
      [
        "B2B",
        "Usuarios gestionados por el socio.",
        "Lista de permitidos de IdP y acuerdo de confianza."
      ],
      [
        "B2C",
        "Gran escala y recuperación de cuentas.",
        "Protección contra fraude y privacidad."
      ],
      [
        "Cargas de trabajo",
        "Procesos y servicios sin usuario.",
        "Credenciales breves y atestación ambiental."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.14 Federación de cargas de trabajo y Token Exchange",
    "id": "20-14-federacion-de-cargas-de-trabajo-y-token-exchange"
  },
  {
    "kind": "paragraph",
    "text": "La federación no se limita a los usuarios. Las cargas de trabajo, los clústeres y las canalizaciones de la nube pueden intercambiar identidades sin almacenar secretos permanentes. Un issuer externo presenta una aserción al servicio de token de seguridad, que verifica el origen y emite credenciales cortas para el dominio de destino. Este modelo se utiliza en la federación de identidades de cargas de trabajo y en integraciones entre nubes."
  },
  {
    "kind": "paragraph",
    "text": "Token Exchange le permite transformar un token en otro adecuado para el siguiente recurso o dominio. El nuevo token debería reducir la audience, el scope y la vida útil, preservando al sujeto y al actor cuando sea necesario. La transformación no debería ampliar los privilegios. Los registros deben registrar la cadena de delegación para la auditoría."
  },
  {
    "kind": "paragraph",
    "text": "En los microservicios, la identidad del usuario y la identidad del servicio pueden coexistir. El backend necesita saber si la operación fue realizada por una aplicación autónoma o on-behalf-of un usuario. Afirmaciones como sub, client_id y actor ayudan, pero es necesario estandarizar la semántica."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.15 Seguridad, privacidad y amenazas",
    "id": "20-15-seguridad-privacidad-y-amenazas"
  },
  {
    "kind": "paragraph",
    "text": "Federación concentra riesgos de alto impacto. Si la clave IdP se ve comprometida, un atacante puede emitir claims para múltiples aplicaciones. Si la aplicación no valida audience o issuer, podrá aceptar tokens destinados a otro servicio. Si se manipulan RelayState, redirigir_uri o ACS, es posible que se desvíen las respuestas. La reproducción ocurre cuando se reutiliza una afirmación válida fuera de la ventana o contexto esperado."
  },
  {
    "kind": "paragraph",
    "text": "Los ataques de confusión aprovechan la confusión entre issuers o endpoints. El ajuste de firmas en SAML aprovecha las diferencias entre el elemento firmado y el elemento procesado. Algoritmos débiles, metadata no autenticados, excesiva desviación del reloj y claves antiguas amplían la superficie. La defensa requiere una validación estricta, bibliotecas maduras, fijación de lógica de issuer y monitoreo."
  },
  {
    "kind": "paragraph",
    "text": "La privacidad requiere minimización de claims, consentimiento cuando corresponda, retención limitada y protección contra la correlación. Un corredor que centraliza todas las autenticaciones tiene una visión amplia del comportamiento del usuario. Los registros deben evitar almacenar tokens completos y datos confidenciales innecesariamente."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La confianza federada debe estar limitada por validaciones y políticas locales.",
    "headers": [
      "Amenaza",
      "Fallo típico",
      "controlar"
    ],
    "rows": [
      [
        "Reproducir",
        "Aseveración reutilizada.",
        "Nonce, InResponseTo, jti, ventana corta y caché de uso."
      ],
      [
        "Confusión del issuer",
        "Token aceptado del issuer equivocado.",
        "Lista de permitidos y validación exacta del issuer."
      ],
      [
        "Discrepancia de audience",
        "Token destinado a otro servicio.",
        "Valide aud y azp cuando corresponda."
      ],
      [
        "Compromiso clave",
        "Emisión fraudulenta a gran escala.",
        "HSM, rotación, revocación y respuesta a incidentes."
      ],
      [
        "Inyección de claims",
        "El atributo externo se convierte en privilegio interno.",
        "Mapeo explícito y autorización local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.16 Alta disponibilidad y recuperación ante desastres",
    "id": "20-16-alta-disponibilidad-y-recuperacion-ante-desastres"
  },
  {
    "kind": "paragraph",
    "text": "El IdP y el intermediario se encuentran en la ruta crítica de inicio de sesión. Una interrupción puede bloquear varias aplicaciones al mismo tiempo. La arquitectura debe considerar múltiples instancias, equilibrio, almacenamiento de sesiones, replicación de claves, DNS, comprobaciones de estado y capacidad de supervivencia ante fallas regionales."
  },
  {
    "kind": "paragraph",
    "text": "La recuperación ante desastres debe probar no sólo el endpoint, sino también el issuer, los metadata, los certificados y las cookies. Cambiar de issuer durante la conmutación por error interrumpe la validación. Usar el mismo issuer en diferentes regiones requiere una coordinación consistente de claves y estados. Las sesiones se pueden perder sin impedir nuevos inicios de sesión siempre que el dominio de confianza permanezca estable."
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones deben definir el comportamiento cuando el IdP no está disponible. Las sesiones ya establecidas pueden continuar durante algún tiempo, pero las nuevas autenticaciones fallarán. La omisión de autenticación manual no debe utilizarse como una contingencia improvisada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.17 Integración con API Gateways",
    "id": "20-17-integracion-con-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Los API Gateways participan en la federación como consumidores de tokens, puntos de cumplimiento o intermediarios de traducción. Una API Gateway puede validar access tokens OIDC/OAuth, convertir identidades en headers internos, aplicar políticas por reclamo y emitir tokens internos al backend. También podría estar detrás de un portal autenticado SAML u OIDC."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway no debe aceptar ciegamente headers de identidad de Internet. Información como X-User o X-Roles debe eliminarse en el borde y recrearse solo después de la validación. La confianza entre la API Gateway y el backend debe estar protegida mediante mTLS, una red controlada o un token restringido por el remitente."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway y Azure API Management, la implementación puede incluir validación, introspección, políticas, certificados, productos y suscripciones de JWT. El diseño debe separar la autenticación del portal, la autenticación del consumidor de API y la identidad del backend. Estas identidades pueden ser diferentes en un mismo viaje."
  },
  {
    "kind": "subhead",
    "text": "Buenas prácticas en la puerta de entrada"
  },
  {
    "kind": "paragraph",
    "text": "Propague solo los claims necesarios y estandarizados al backend. Registre el issuer, el sujeto, el cliente, el tenant, el método de autenticación y la decisión de política, pero nunca exponga ni registre tokens completos sin necesidad operativa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.18 Observabilidad, auditoría y retroubleshooting",
    "id": "20-18-observabilidad-auditoria-y-retroubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting de la federación necesita reconstruir la cadena: aplicación inicial, redirección, IdP seleccionado, sesión existente, solicitud de autenticación, respuesta emitida, validación, creación de sesión local y acceso a la API. Cada paso tiene sus propios ID, marcas de tiempo y registros. La correlación evita atribuir un error producido por la aplicación o la API Gateway al IdP."
  },
  {
    "kind": "paragraph",
    "text": "Los bucles de inicio de sesión generalmente indican que la aplicación no conservó el estado/RelayState, no pudo crear una cookie local, rechazó la afirmación o fue redirigida nuevamente al IdP. Los errores intermitentes pueden surgir por asimetría horaria, rotación de claves no propagadas, afinidad de sesión, metadata divergentes o cookies de SameSite."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría debe registrar la autenticación, el resultado, el IdP, el nivel de garantía, la aplicación, el tenant, el sujeto seudonimizado cuando sea posible, la creación y el cierre de la sesión, el cambio de enlace y la decisión de acceso. Las métricas de tasa de éxito, latencia, MFA, fallas por issuer y vencimiento de certificados ayudan a anticipar incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: El diagnóstico federado requiere evidencia de todos los niveles.",
    "headers": [
      "Síntoma",
      "Pruebas para recoger",
      "Hipótesis"
    ],
    "rows": [
      [
        "Bucle de inicio de sesión",
        "estado/RelayState, cookies y registros de aplicaciones.",
        "Sesión local no creada o respuesta rechazada."
      ],
      [
        "Audiencia no válida",
        "audience esperada y metadata.",
        "Aplicación o entorno incorrecto."
      ],
      [
        "Firma no válida",
        "kid, certificado, JWKS y horario.",
        "Rotación incompleta o transmisor incorrecto."
      ],
      [
        "Cierre de sesión parcial",
        "sesiones locales, IdP y tokens.",
        "Capas descoordinadas."
      ],
      [
        "Usuario duplicado",
        "issuer, asunto, NameID y mapeo.",
        "Vinculación de cuenta o identificador inestable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.19 Estudios de casos y laboratorios",
    "id": "20-19-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso de estudio 1 - SaaS corporativo: los empleados acceden a un sistema externo a través de SAML. El IdP corporativo se autentica con MFA y envía NameID persistente y grupos controlados. SaaS crea sesiones locales y asigna grupos a sus propios roles. La gobernanza incluye la rotación de certificados, la baja y las pruebas de SLO."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Portal B2B: los socios utilizan sus propios IdP. Un corredor central acepta SAML u OIDC, normaliza el asunto, el tenant y la garantía, y emite un token interno. El portal utiliza OIDC, mientras que API Gateway valida access tokens y aplica cuotas por organización. Los socios están permitidos mediante lista de permitidos y acuerdo de confianza."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: Federación de cargas de trabajo: una canalización de nube externa obtiene una identidad corta mediante certificación del entorno e intercambia esta afirmación por un token de dominio corporativo. No se almacenan secretos permanentes. La audience está restringida al servicio de implementación y el token caduca a los pocos minutos."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Diseñar las sesiones de un flujo SSO con dos aplicaciones. 2) Comparar metadata SAML y Discovery OIDC. 3) Simular la rotación de claves con superposición. 4) Crear una matriz de claims externos y roles internos. 5) Investigar un bucle de inicio de sesión utilizando estado, cookies y registros."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation transfiere confianza entre dominios; El Single Sign-On reutiliza una autenticación central para reducir los desafíos repetidos. Los conceptos están relacionados, pero no equivalentes. El aprovisionamiento, la delegación y la autorización siguen siendo responsabilidades separadas."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura federada está respaldada por issuers, aplicaciones de consumo, intermediarios, metadata, claves, certificados, claims y políticas. Cada aplicación mantiene una sesión local, mientras que el IdP mantiene una sesión central. El cierre de sesión y la revocación deben coordinar múltiples capas independientes."
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 y OpenID Connect ofrecen mecanismos maduros para la federación. La elección depende del ecosistema, tipo de aplicación y capacidad operativa. Los agentes de identidad simplifican las integraciones y traducen protocolos, pero concentran el riesgo y la disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad requiere una validación estricta del issuer, la audience, la firma, la hora, el nonce, InResponseTo y el contexto. Los claims externos deben mapearse, no aceptarse como privilegios locales. La gobernanza, la observabilidad, la alta disponibilidad y la gestión del ciclo de vida determinan la calidad real de la federación."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "Con los fundamentos de identidad, autenticación y federación consolidados, el siguiente capítulo comienza con la capa de plataforma: API Gateways, sus planos de datos y control, responsabilidades arquitectónicas y su papel en la seguridad y gobernanza de API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de federación y SSO",
    "id": "lista-de-verificacion-de-federacion-y-sso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se inventarian los dominios fiduciarios, los issuers y las aplicaciones de los consumidores.",
      "El issuer, la audience, los endpoints y los identificadores se validan con precisión.",
      "Los metadata y las claves tienen origen, caché y rotación confiables con superposición.",
      "Los claims externos se minimizan, normalizan y asignan a conceptos internos.",
      "La account linking requiere pruebas controladas y no depende únicamente del correo electrónico.",
      "La política define los niveles de MFA, step-up, auth_time y garantía por viaje.",
      "La sesión de IdP, la sesión de aplicación y los tokens tienen vidas útiles coherentes.",
      "El cierre de sesión local, el cierre de sesión central y la revocación de token se documentan por separado.",
      "Los corredores tienen alta disponibilidad, segregación de tenants y protección de claves.",
      "Las federaciones B2B tienen propietario, contacto de incidente, baja y fecha de revisión.",
      "Las API Gateways eliminan los headers de identidad que no son de confianza y propagan solo notificaciones normalizadas.",
      "Los registros y métricas le permiten correlacionar el inicio de sesión, la emisión, la validación, la sesión y el acceso a la API."
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
      "Diferenciar entre identidad federada, SSO, aprovisionamiento y delegación.",
      "Explique por qué SSO no significa una única sesión técnica.",
      "Compare la confianza directa y el sistema hub-and-spoke con el intermediario de identidades.",
      "Describa cómo SAML y OIDC representan al issuer, la audience y la sesión.",
      "Explique por qué la account linking por correo electrónico puede ser insegura.",
      "Proponer un flujo intensificador para una transacción financiera sensible.",
      "Diferenciar entre cierre de sesión local, cierre de sesión de IdP y revocación de access token.",
      "Diseñe una federación B2B multitenant con una lista de socios permitidos.",
      "Explique cómo la federación de identidades de cargas de trabajo elimina los secretos estáticos.",
      "Enumere la evidencia necesaria para diagnosticar un bucle de inicio de sesión."
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
    "caption": "Tabla 7 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Vinculación de cuenta",
        "Asociación controlada entre identidades externas y una cuenta local."
      ],
      [
        "autoridad de atributo",
        "Fuente confiable de atributos adicionales sobre un tema."
      ],
      [
        "Federación",
        "Relación de confianza entre dominios de identidad."
      ],
      [
        "Descubrimiento del reino de origen",
        "Proceso de selección del IdP adecuado para el usuario o tenant."
      ],
      [
        "Identity broker",
        "Intermediario que normaliza confianza, protocolos, claims y sesiones."
      ],
      [
        "IdP",
        "Identity Provider que autentica al sujeto y emite claims."
      ],
      [
        "JIT provisioning",
        "Creación de cuenta local durante el primer inicio de sesión federado."
      ],
      [
        "Identificador por pares",
        "Identificador diferente de un mismo usuario para cada cliente o sector."
      ],
      [
        "Relying Party",
        "Aplicación OIDC que confía en el proveedor OpenID."
      ],
      [
        "Service Provider",
        "Aplicación SAML que consume aserciones del IdP."
      ],
      [
        "Single Logout",
        "Coordinación de sesiones de cierre entre participantes."
      ],
      [
        "Single Sign-On",
        "Experiencia en el acceso a múltiples aplicaciones con reutilización de autenticación."
      ],
      [
        "Autenticación mejorada",
        "Autenticación adicional para elevar el nivel de seguridad."
      ],
      [
        "Dominio de confianza",
        "Dominio administrativo que controla identidades y políticas de confianza."
      ],
      [
        "Federación de cargas de trabajo",
        "Intercambio de identidad entre entornos sin secreto permanente."
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
      "OASIS. Lenguaje de marcado de afirmación de seguridad (SAML) V2.0 Núcleo, enlaces, perfiles y metadata.",
      "Fundación OpenID. OpenID Connect Core 1.0.",
      "Fundación OpenID. OpenID Connect Descubrimiento 1.0.",
      "Fundación OpenID. Cierre de sesión iniciado por RP, cierre de sesión del front-channel y cierre de sesión del canal posterior.",
      "IETF. RFC 8693: Token Exchange OAuth 2.0.",
      "IETF. RFC 7644 - Sistema de gestión de identidades entre dominios: Protocolo.",
      "NIST. Pautas de identidad digital.",
      "OWASP. Hojas de referencia de autenticación, seguridad SAML y seguridad OAuth.",
      "Microsoft aprende. Federación de identidades, identidades externas y federación de identidades de cargas de trabajo.",
      "Proyecto SPIFFE. Especificaciones y documentación de SPIFFE y SPIRE."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los protocolos, los navegadores, las políticas de cookies y los productos de identidad evolucionan. Antes de implementar la federación, valide la documentación oficial de la versión utilizada, los algoritmos permitidos, el comportamiento de cierre de sesión y las capacidades de la API Gateway o corredor en el entorno autorizado."
  }
];
