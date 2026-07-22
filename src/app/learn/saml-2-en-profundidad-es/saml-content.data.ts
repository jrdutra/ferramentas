import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const SAML_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Federación SAML: identidad autenticada en un dominio y consumida en otro"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/overview.svg",
    "alt": "Federación SAML entre usuario, Service Provider, Identity Provider y sesión local",
    "caption": "Figura de apertura: SAML conecta dominios de identidad a través de mensajes XML y relaciones de confianza explícitas."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "SAML transporta claims de seguridad entre entidades que ya han establecido metadata, claves y reglas de confianza."
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
    "text": "Los capítulos anteriores estudiaron OAuth 2.0, OpenID Connect y la familia JOSE. Estos estándares dominan las aplicaciones y API modernas, pero no han reemplazado por completo los mecanismos de federación empresarial creados antes que ellos. SAML 2.0 sigue estando ampliamente presente en portales corporativos, sistemas SaaS, entornos académicos, gobiernos, bancos e integraciones entre organizaciones que requieren un inicio de sesión único basado en navegador y un intercambio de atributos estandarizado."
  },
  {
    "kind": "paragraph",
    "text": "SAML, abreviatura de Security Assertion Markup Language, es un marco XML para comunicar claims de autenticación, atributos y decisiones de autorización. Su uso más conocido es el perfil SSO del navegador web, en el que un Identity Provider autentica al usuario y envía una aserción SAML firmada al Service Provider. Sin embargo, comprender por sí solo el flujo visual de la redirección es insuficiente. La seguridad depende de enlaces, metadata, certificados, validación de firmas XML, condiciones temporales, audience, destinatario, correlación y protección de reproducción."
  },
  {
    "kind": "paragraph",
    "text": "A diferencia de un simple token de portador transportado directamente a una API, la respuesta SAML generalmente la consume un endpoint de Service Provider específico llamado Servicio de Consumidor de Aserción. El SP valida el mensaje y crea su propia sesión local. Esta separación explica por qué SAML es especialmente adecuado para el inicio de sesión federado para aplicaciones web, pero menos natural para la autorización delegada de API y llamadas de servicio a servicio."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo construye un modelo mental completo de SAML 2.0: actores, aserciones, mensajes de protocolo, enlaces, perfiles, metadata, NameID, atributos, firma, cifrado, Single Logout, federación e integración con API Gateways. El objetivo es permitir el diseño, la revisión y la troubleshooting de forma segura, sin reducir el estándar a copiar certificados entre dos consolas administrativas."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Separe siempre cuatro capas: aserción, mensaje de protocolo, enlace y perfil. Luego, siga la relación de confianza descrita en los metadata y valide cada restricción de seguridad. Esta descomposición hace que SAML sea mucho menos confuso y evita mezclar transporte, identidad y sesión."
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
      "Explique las responsabilidades del director, el Identity Provider, el Service Provider y las autoridades SAML.",
      "Distinga aserción, mensaje de protocolo, enlace, perfil y metadata.",
      "Describir declaraciones de autenticación, atributos y decisiones de autorización.",
      "Detalle el perfil SSO del navegador web en los modos iniciado por SP e iniciado por IdP.",
      "Interpretar AuthnRequest, Respuesta, Aserción, Asunto, Condiciones y SubjectConfirmation.",
      "Compare bindings HTTP-Redirect, HTTP-POST, HTTP-Artifact y SOAP.",
      "Comprenda el ID de entidad, ACS, el servicio SSO, el servicio SLO, el descriptor de clave y la rotación de certificados.",
      "Aplique una validación de firma XML segura y reconozca el ajuste y la reproducción de firmas.",
      "Comprenda NameID, atributos, mapeo de identidad, SLO y descubrimiento de IdP.",
      "Compare SAML 2.0 con OpenID Connect y reconozca el papel de los intermediarios y API Gateways de identidad."
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
      "19.1 Fundamentos y componentes de SAML 2.0",
      "19.2 Aserciones y declaraciones",
      "19.3 Mensajes de protocolo",
      "19.4 Perfil SSO del navegador web",
      "19.5 SSO iniciado por el SP y el IdP",
      "19.6 AuthnRequest en profundidad",
      "19.7 Response y Assertion en profundidad",
      "19.8 Conditions, SubjectConfirmation y correlación",
      "19.9 Bindings SAML",
      "19.10 Metadata y confianza",
      "19.11 Firma XML y cifrado",
      "19.12 NameID, atributos y mapeo",
      "19.13 Sesiones, SLO y descubrimiento",
      "19.14 SAML x OIDC, API Gateways, seguridad y troubleshooting",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.1 Fundamentos y componentes de SAML 2.0",
    "id": "19-1-fundamentos-y-componentes-de-saml-2-0"
  },
  {
    "kind": "paragraph",
    "text": "SAML organiza la federación en entidades con roles bien definidos. El principal normalmente es el usuario. El Identity Provider, o IdP, autentica este principal y emite claims. El Proveedor de Servicios, o SP, ofrece la aplicación y confía en las claims producidas por el IdP según una relación previamente configurada. En escenarios más amplios, también puede haber autoridades de atributos, autoridades de autenticación y puntos de decisión de políticas."
  },
  {
    "kind": "paragraph",
    "text": "El patrón se compone de piezas complementarias. Core define aserciones y mensajes de protocolo. Los bindings describen cómo se transportan estos mensajes a través de protocolos como HTTP o SOAP. Los perfiles combinan aserciones, mensajes y bindings para resolver casos de uso concretos, como SSO del navegador o Single Logout. Los metadata describen entidades, endpoints, bindings admitidos, identificadores, certificados y otra información necesaria para la interoperabilidad."
  },
  {
    "kind": "paragraph",
    "text": "La relación de confianza no surge porque un mensaje contenga un certificado. El SP debe conocer de antemano el ID de entidad del IdP y las claves aceptadas para la firma. Asimismo, el IdP necesita conocer el ID de entidad del SP, sus endpoints ACS y, según la política, las claves utilizadas por el SP. Los metadata son el mecanismo estándar para distribuir esta información, pero su obtención y actualización también debe ser autenticada y gobernada."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: las capas SAML deben analizarse por separado.",
    "headers": [
      "Concepto",
      "Responsabilidad",
      "Ejemplo"
    ],
    "rows": [
      [
        "Assertion",
        "Contiene declaraciones sobre un tema.",
        "Usuario autenticado con MFA y atributos corporativos."
      ],
      [
        "protocolo",
        "Coordina las solicitudes y respuestas de SAML.",
        "Solicitud y respuesta de autenticación."
      ],
      [
        "Encuadernación",
        "Define el transporte del mensaje.",
        "Redireccionamiento HTTP o HTTP-POST."
      ],
      [
        "Perfil",
        "Combina reglas para un caso de uso.",
        "Perfil SSO del navegador web."
      ],
      [
        "Metadata",
        "Publica identidades, endpoints y claves.",
        "EntityDescriptor del IdP o SP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.2 Aserciones y declaraciones",
    "id": "19-2-aserciones-y-declaraciones"
  },
  {
    "kind": "paragraph",
    "text": "Una aserción SAML es una estructura XML emitida por una autoridad y relacionada con un tema. Tiene identificador, versión, hora de emisión, issuer y cero o más declaraciones. También puede contener una firma, condiciones e información sobre cómo el sujeto debe confirmar su identidad al destinatario."
  },
  {
    "kind": "paragraph",
    "text": "La Declaración de Autenticación registra que una autoridad autenticó al sujeto en un momento y contexto determinados. Puede incluir SessionIndex, SessionNotOnOrAfter y AuthnContextClassRef, elementos utilizados por las aplicaciones que necesitan distinguir contraseña, MFA, certificado u otros métodos. La Declaración de atributos lleva pares de nombre y valor, como identificador interno, correo electrónico, unidad organizativa o grupos."
  },
  {
    "kind": "paragraph",
    "text": "La Declaración de decisión de autorización representa una decisión de autorización sobre un recurso, pero es menos común en el SSO web moderno. En la práctica, muchos SP utilizan atributos y contexto de autenticación para impulsar sus propias políticas locales. Esta elección preserva la autonomía del dominio, pero requiere acuerdos claros sobre semántica, cardinalidad, espacios de nombres y manejo de atributos faltantes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/figure-01-assertion-anatomy.svg",
    "alt": "Anatomía de una afirmación SAML con issuer, sujeto, condiciones, declaraciones y firma",
    "caption": "Figura 1: una afirmación segura combina origen, asunto, restricciones, declaraciones y protección criptográfica."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Las declaraciones tienen una semántica diferente dentro de la afirmación.",
    "headers": [
      "declaración",
      "Declaración principal",
      "Uso recurrente"
    ],
    "rows": [
      [
        "AuthnStatement",
        "Cómo y cuándo se autenticó al usuario.",
        "SSO, intensificación y auditoría."
      ],
      [
        "AttributeStatement",
        "Atributos asociados al tema.",
        "Aprovisionamiento lógico y autorización local."
      ],
      [
        "AuthzDecisionStatement",
        "Decisión sobre la acción en apelación.",
        "Integraciones específicas y heredadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.3 Mensajes de protocolo",
    "id": "19-3-mensajes-de-protocolo"
  },
  {
    "kind": "paragraph",
    "text": "Los mensajes del protocolo SAML coordinan las interacciones entre entidades. AuthnRequest solicita autenticación; Response contiene una o más claims o un estado de error; LogoutRequest y LogoutResponse participan en el Single Logout; ArtifactResolve y ArtifactResponse recuperan mensajes por referencia; AttributeQuery y AuthnQuery consultan autoridades especializadas."
  },
  {
    "kind": "paragraph",
    "text": "Cada mensaje tiene ID, Versión, IssueInstant y, según el tipo, Destino, Consentimiento, InResponseTo y otros atributos. Estos campos no son decorativos. La identificación permite la correlación y la protección de replay. El destino restringe el endpoint esperado. InResponseTo vincula una respuesta a una solicitud emitida previamente. IssueInstant ayuda con la validación temporal y la investigación de relojes desalineados."
  },
  {
    "kind": "paragraph",
    "text": "El estado de la respuesta debe interpretarse antes de la afirmación. El éxito indica que el procesamiento principal está completo, pero no anula todas las validaciones. Otros códigos pueden representar un error del solicitante, un error de respuesta, una autenticación fallida, un método no compatible, un usuario desconocido o una falta de consentimiento."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de AuthnRequest\n<samlp:AuthnRequest\n  ID=\"_a12f...\"\n  Version=\"2.0\"\n  IssueInstant=\"2026-07-15T18:20:00Z\"\n  Destination=\"https://idp.empresa.example/sso\"\n  AssertionConsumerServiceURL=\"https://app.example/saml/acs\">\n  <saml:Issuer>https://app.example/saml</saml:Issuer>\n  <samlp:NameIDPolicy AllowCreate=\"true\"/>\n</samlp:AuthnRequest>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.4 Perfil SSO del navegador web",
    "id": "19-4-perfil-sso-del-navegador-web"
  },
  {
    "kind": "paragraph",
    "text": "El perfil SSO del navegador web es el uso más conocido de SAML 2.0. El navegador actúa como intermediario entre el SP y el IdP. Cuando el usuario accede a un recurso protegido, el SP crea una AuthnRequest y redirige o envía el navegador al IdP. El IdP autentica al usuario, crea la Response, firma la afirmación o la respuesta misma según el acuerdo y devuelve el resultado al Servicio al Consumidor de Aserciones del SP."
  },
  {
    "kind": "paragraph",
    "text": "El ACS recibe el mensaje, realiza validaciones estructurales, criptográficas y semánticas y, si todo es correcto, crea una sesión de aplicación local. SAML no define cómo se debe implementar esta sesión local. Puede utilizar una cookie segura, una sesión del lado del servidor u otro mecanismo. Esto significa que la seguridad posterior al inicio de sesión también depende de controles clásicos como Secure, HttpOnly, SameSite, protección de caducidad, rotación y fijación."
  },
  {
    "kind": "paragraph",
    "text": "RelayState conserva el estado de la aplicación, como el recurso solicitado originalmente. No debe tratarse como un canal de autorización confiable y debe protegerse contra la redirección abierta y la manipulación. La implementación solo debe aceptar objetivos pronosticados o valores opacos almacenados en el lado del servidor."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/figure-02-sp-initiated-sso.svg",
    "alt": "Flujo de SSO del navegador web iniciado por el Service Provider",
    "caption": "Figura 2: en el SSO iniciado por el SP, la respuesta debe estar correlacionada con la AuthnRequest original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.5 SSO iniciado por el SP y el IdP",
    "id": "19-5-sso-iniciado-por-el-sp-y-el-idp"
  },
  {
    "kind": "paragraph",
    "text": "En el SSO iniciado por el SP, el flujo comienza en el Service Provider. El SP crea una AuthnRequest, registra su ID y espera una respuesta correlacionada. Este modelo permite un mejor control del contexto, destino y retorno al recurso solicitado. La validación InResponseTo mitiga los ataques de respuesta en frío y ayuda a asociar la autenticación con la transacción correcta."
  },
  {
    "kind": "paragraph",
    "text": "En el SSO iniciado por el IdP, el flujo comienza en un portal del IdP o catálogo de aplicaciones. El IdP envía una respuesta no solicitada al ACS del SP. Este modo es conveniente para portales corporativos, pero pierde correlación con AuthnRequest. La implementación debe compensar esta reducción en contexto con controles estrictos sobre el issuer, la audience, el destinatario, el tiempo, la replay y los destinos permitidos."
  },
  {
    "kind": "paragraph",
    "text": "Algunas aplicaciones admiten ambos modos. En esta situación, el código de validación debe distinguir claramente entre respuestas solicitadas y no solicitadas. No es seguro simplemente hacer que InResponseTo sea opcional en todos los casos. La política debe definir cuándo se acepta la iniciativa iniciada por IdP, para qué IdP, ACS y flujos de negocios."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Los dos modos requieren políticas de validación diferentes.",
    "headers": [
      "Apariencia",
      "iniciado por SP",
      "Iniciado por IdP"
    ],
    "rows": [
      [
        "Inicio",
        "El usuario accede al SP.",
        "El usuario abandona el portal del IdP."
      ],
      [
        "AuthnRequest",
        "Existe y debe ser rastreado.",
        "Normalmente ausente."
      ],
      [
        "Correlación",
        "InResponseTo y estado local.",
        "No hay ninguna solicitud original."
      ],
      [
        "Riesgo adicional",
        "Abra la redirección y solicite manipulación.",
        "Replay y respuesta no solicitada."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Tabla 3: Los dos modos requieren políticas de validación diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.6 AuthnRequest en profundidad",
    "id": "19-6-authnrequest-en-profundidad"
  },
  {
    "kind": "paragraph",
    "text": "AuthnRequest comunica al IdP qué SP solicita autenticación y, opcionalmente, qué características desea. El issuer identifica al SP. El destino apunta al endpoint del IdP. AssertionConsumerServiceURL o AssertionConsumerServiceIndex selecciona el ACS. ProtocolBinding puede indicar cómo debe regresar la respuesta. NameIDPolicy requiere formato de identificador y puede permitir la creación de un nuevo seudónimo."
  },
  {
    "kind": "paragraph",
    "text": "ForceAuthn solicita al IdP que vuelva a autenticar al usuario incluso si existe una sesión SSO. IsPassive solicita que el IdP no interactúe con el usuario; Si no se puede realizar la autenticación silenciosa, la respuesta debe indicar un error apropiado. RequestedAuthnContext expresa requisitos sobre el método o la solidez de la autenticación, pero su interpretación debe estar alineada entre las partes."
  },
  {
    "kind": "paragraph",
    "text": "La política puede exigir la firma de AuthnRequest, especialmente cuando el SP envía ACS dinámico, solicita ForceAuthn u opera en federaciones con requisitos estrictos. En el binding HTTP-Redirect, la firma se produce a través de parámetros de URL y no a través de un elemento ds:Signature dentro del XML. En el binding HTTP-POST, el mensaje puede llevar una firma XML. Confundir estas dos formas es una causa común de fracaso."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: AuthnRequest controla más que una simple redirección.",
    "headers": [
      "campo",
      "Función",
      "Validación o política"
    ],
    "rows": [
      [
        "Emisor",
        "Identifica el SP solicitante.",
        "Debe coincidir con los metadata confiables."
      ],
      [
        "Destino",
        "Endpoint de Identity Provider.",
        "Comparación exacta con el endpoint recibido."
      ],
      [
        "URL/Índice SCA",
        "Destino de la respuesta.",
        "Sólo valores registrados en metadata."
      ],
      [
        "FuerzaAuthn",
        "Solicita una nueva autenticación.",
        "Aplica solo según póliza."
      ],
      [
        "Contexto de autenticación solicitado",
        "Requisito de autenticación.",
        "Mapear clases y comparar correctamente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.7 Response y Assertion en profundidad",
    "id": "19-7-response-y-assertion-en-profundidad"
  },
  {
    "kind": "paragraph",
    "text": "Response es el mensaje de protocolo entregado al SP. Tiene Issuer, Status, Destination, InResponseTo y puede contener aserciones. En muchos perfiles, la Response y la Afirmación se pueden firmar en diferentes combinaciones. La política del SP debe definir exactamente qué firma se requiere y sobre qué elemento, evitando aceptar de manera inconsistente mensajes parcialmente protegidos."
  },
  {
    "kind": "paragraph",
    "text": "La Aserción contiene las declaraciones consumidas por la aplicación. El SP debe encontrar la aserción autenticada mediante una firma validada, y no simplemente la primera aserción con un XPath determinado. Esta regla es fundamental contra el ajuste de firmas XML, un ataque en el que se mueve un elemento firmado válido y se coloca otro elemento malicioso en la ubicación que procesa la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Una validación completa también verifica el issuer, la versión, el instante del problema, las condiciones, la restricción de audience, los datos de confirmación del sujeto, el destinatario, NotOnOrAfter, InResponseTo, AuthnStatement y el contexto requerido. Después de la validación, los atributos deben asignarse mediante reglas explícitas. El hecho de que un XML haya sido firmado no hace que todos los valores sean adecuados para la aplicación."
  },
  {
    "kind": "code",
    "text": "Estrutura simplificada de Response e Assertion\n<samlp:Response Destination=\"https://app.example/saml/acs\"\n                    InResponseTo=\"_a12f...\">\n  <saml:Issuer>https://idp.example/metadata</saml:Issuer>\n  <samlp:Status>...</samlp:Status>\n  <saml:Assertion ID=\"_assertion123\">\n    <saml:Subject>...</saml:Subject>\n    <saml:Conditions>...</saml:Conditions>\n    <saml:AuthnStatement>...</saml:AuthnStatement>\n    <saml:AttributeStatement>...</saml:AttributeStatement>\n  </saml:Assertion>\n</samlp:Response>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.8 Conditions, SubjectConfirmation y correlación",
    "id": "19-8-conditions-subjectconfirmation-y-correlacion"
  },
  {
    "kind": "paragraph",
    "text": "Las condiciones restringen cuándo y dónde se puede utilizar la afirmación. NotBefore define el instante inicial y NotOnOrAfter define un límite único. AudienceRestriction indica las entidades para las que se emitió la afirmación. La aplicación debe comparar la audience con su identificador esperado y utilizar una tolerancia de reloj pequeña y controlada, sin transformar la desviación del reloj en una ventana de reproducción amplia."
  },
  {
    "kind": "paragraph",
    "text": "SubjectConfirmation normalmente utiliza el método de portador en el SSO del navegador web. SubjectConfirmationData transporta Destinatario, NotOnOrAfter e InResponseTo. El destinatario debe coincidir con el ACS realmente utilizado. InResponseTo debe apuntar a una AuthnRequest pendiente cuando el SP inició el flujo. Una respuesta ya procesada debe marcarse como consumida para evitar que se reproduzca."
  },
  {
    "kind": "paragraph",
    "text": "La correlación también involucra RelayState, cookies temporales y estado local. Estos elementos no se reemplazan entre sí. InResponseTo relaciona la Response con AuthnRequest; RelayState devuelve el contexto de la aplicación; la sesión temporal del SP almacena información sobre la transacción. Un diseño robusto mantiene todos los enlaces y elimina el estado después de su uso."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/figure-03-validation-pipeline.svg",
    "alt": "Canal de validación seguro para una SAMLResponse",
    "caption": "Figura 3: La firma es un paso del proceso, no una validación completa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.9 Bindings SAML",
    "id": "19-9-bindings-saml"
  },
  {
    "kind": "paragraph",
    "text": "El binding define cómo se asigna un mensaje SAML a otro protocolo. En el binding HTTP-Redirect, el mensaje normalmente se comprime con DEFLATE, se codifica en Base64 y se coloca en la query string. Es adecuado para AuthnRequests pequeñas, pero tiene límites de URL y reglas de firma específicas en torno a SAMLRequest, RelayState y SigAlg."
  },
  {
    "kind": "paragraph",
    "text": "En el binding HTTP-POST, el mensaje Base64 se envía en formato HTML, generalmente mediante envío automático. Es el enlace más común para transportar SAMLResponse a ACS. A medida que el navegador entrega contenido de un dominio a otro, el endpoint debe aceptar POST, proteger la sesión local y validar completamente el mensaje antes de cualquier redirección."
  },
  {
    "kind": "paragraph",
    "text": "HTTP-Artifact solo envía una breve referencia a través del navegador. El SP intercambia el artefacto por el mensaje real en un back-channel, normalmente con SOAP. Esto reduce la exposición de las claims al agente de usuario, pero agrega disponibilidad, autenticación y latencia al servicio de resolución de artefactos. SOAP también aparece en consultas de back-channel y Single Logout."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/figure-04-bindings.svg",
    "alt": "Bindings SAML que transportan el mismo mensaje a través de diferentes canales",
    "caption": "Figura 4 - La unión es transporte; el perfil define cómo participa este transporte en el caso de uso."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Cada vinculación tiene su propio formato y riesgos operativos.",
    "headers": [
      "Encuadernación",
      "Uso típico",
      "Punto técnico"
    ],
    "rows": [
      [
        "HTTP-Redirect",
        "AuthnRequest en el navegador.",
        "DEFLATE, codificación de URL y firma de parámetros."
      ],
      [
        "HTTP-POST",
        "SAMLRespuesta para ACS.",
        "Formulario HTML con mensaje Base64."
      ],
      [
        "HTTP-Artifact",
        "Referencia del front-channel.",
        "Resolución de mensajes vía back-channel."
      ],
      [
        "SOAP",
        "Consultas e intercambio directo.",
        "Canal de servidor a servidor con XML SOAP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.10 Metadata y confianza",
    "id": "19-10-metadata-y-confianza"
  },
  {
    "kind": "paragraph",
    "text": "Los metadata SAML describen entidades a través de EntityDescriptor. Un ID de entidad es un identificador estable, a menudo un URI, pero no es necesario que sea una URL accesible. Los descriptores de funciones informan si la entidad actúa como IdP, SP u otra autoridad. Los endpoints incluyen enlace, ubicación, índice y preferencia. KeyDescriptor publica certificados asociados con la firma o el cifrado."
  },
  {
    "kind": "paragraph",
    "text": "Los metadata del SP generalmente contienen endpoints ACS, formatos de NameID y certificados. Los metadata de IdP contienen SingleSignOnService, SingleLogoutService, certificados y otros recursos. El consumidor sólo debe aceptar endpoints y claves de fuentes confiables. Permitir ACS arbitrario proveniente únicamente de AuthnRequest puede convertir al IdP en un transmisor de claims para un atacante."
  },
  {
    "kind": "paragraph",
    "text": "La rotación de certificados requiere superposición. El nuevo certificado debe publicarse antes de poder utilizarse; el antiguo permanece mientras que los mensajes y los cachés aún pueden depender de él. El certificado caducado en los metadata no debe tratarse de manera simplista: el uso de X.509 en SAML suele ser un contenedor de claves, pero las políticas corporativas pueden requerir validaciones adicionales. Lo importante es tener reglas explícitas y auditables."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/es/figure-05-metadata-trust.svg",
    "alt": "Metadata de SP e IdP que establecen endpoints, identificadores y claves confiables",
    "caption": "Figura 5: Los metadata reducen la configuración manual, pero necesitan una cadena de distribución confiable."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de metadata de SP\n<md:EntityDescriptor entityID=\"https://app.example/saml\">\n  <md:SPSSODescriptor AuthnRequestsSigned=\"true\"\n      protocolSupportEnumeration=\"urn:oasis:names:tc:SAML:2.0:protocol\">\n    <md:KeyDescriptor use=\"signing\">...</md:KeyDescriptor>\n    <md:AssertionConsumerService\n       Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\"\n       Location=\"https://app.example/saml/acs\"\n       index=\"0\" isDefault=\"true\"/>\n  </md:SPSSODescriptor>\n</md:EntityDescriptor>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.11 Firma XML y cifrado",
    "id": "19-11-firma-xml-y-cifrado"
  },
  {
    "kind": "paragraph",
    "text": "La firma XML protege la integridad y autenticidad de los elementos XML. Hace referencia a un elemento por ID, aplica transformaciones, canonicalización y resumen y produce SignatureValue. La canonicalización existe porque XML semánticamente equivalente puede tener diferencias en los espacios en blanco, los espacios de nombres y el orden de los atributos. La implementación debe utilizar bibliotecas maduras y una política estricta sobre algoritmos, transformaciones y referencias."
  },
  {
    "kind": "paragraph",
    "text": "El ataque XML Signature Wrapping aprovecha la divergencia entre el elemento verificado y el elemento consumido. La defensa principal es resolver la referencia firmada de forma segura, exigir identificaciones únicas, rechazar estructuras inesperadas y procesar exactamente el nodo autenticado. Las consultas XPath genéricas, como buscar la primera afirmación en el documento, son peligrosas cuando no están vinculadas a la verificación criptográfica."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado XML le permite cifrar la aserción, el ID de nombre o los atributos. El IdP utiliza la clave de cifrado pública del SP y el SP la descifra con su clave privada. La firma y el cifrado resuelven diferentes problemas: el cifrado protege la confidencialidad en el camino y ante los intermediarios; la firma protege la integridad y el origen. Incluso una afirmación cifrada debe validarse después del descifrado."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Los controles criptográficos son complementarios.",
    "headers": [
      "Control criptográfico",
      "Protege",
      "No reemplaza"
    ],
    "rows": [
      [
        "Firma de respuesta",
        "Protocolo y mensaje de destino.",
        "Validación de aserción y condiciones."
      ],
      [
        "Firma de afirmación",
        "Declaraciones y restricciones.",
        "Correlación y protección de sesiones."
      ],
      [
        "Aserción cifrada",
        "Confidencialidad del contenido.",
        "Autenticidad y audience."
      ],
      [
        "TLS",
        "Canal entre participantes.",
        "Firma de extremo a extremo del mensaje."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Regla de implementación"
  },
  {
    "kind": "paragraph",
    "text": "Nunca implemente la firma XML manualmente con concatenación de cadenas o XPath improvisado. Utilice una biblioteca especializada, mantenga un analizador XML reforzado, desactive entidades externas y valide la estructura, los ID y las referencias antes de consumir atributos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.12 NameID, atributos y mapeo de identidad",
    "id": "19-12-nameid-atributos-y-mapeo-de-identidad"
  },
  {
    "kind": "paragraph",
    "text": "NameID identifica al sujeto en formatos estandarizados. Persistente produce un identificador estable y generalmente opaco. Transitorio crea un valor temporal. EmailAddress utiliza el correo electrónico, pero puede no ser adecuado como clave inmutable. No especificado depende del acuerdo bilateral. La elección debe considerar la privacidad, la correlación entre los SP, los cambios de datos y el ciclo de vida de la cuenta."
  },
  {
    "kind": "paragraph",
    "text": "Los atributos se identifican por Nombre y, opcionalmente, NameFormat y FriendlyName. El SP no debe depender únicamente de nombres informales como rol o grupo sin contrato. Es necesario definir el espacio de nombres, el tipo, la cardinalidad, el origen autorizado y el significado. Un grupo de directorio puede no equivaler a un permiso comercial y las asignaciones automáticas pueden elevar los privilegios de manera inapropiada."
  },
  {
    "kind": "paragraph",
    "text": "La vinculación de cuentas merece atención. Cuando el SP recibe un sujeto federado, necesita vincularlo a una cuenta local. La vinculación únicamente por correo electrónico puede permitir la adquisición si diferentes proveedores emiten la misma dirección o si la verificación por correo electrónico no es equivalente. La clave recomendada normalmente combina un identificador de issuer y sujeto estable, con procesos controlados para la migración."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: Los identificadores y atributos necesitan un contrato, no solo un XML válido.",
    "headers": [
      "Formato/elemento",
      "Característica",
      "Precaución"
    ],
    "rows": [
      [
        "ID de nombre persistente",
        "Estable y opaco por relación.",
        "Preservar el enlace durante la migración."
      ],
      [
        "ID de nombre transitorio",
        "Temporales y no correlacionados.",
        "No utilizar como llave permanente."
      ],
      [
        "dirección de correo electrónico",
        "Legible y familiar.",
        "Puede cambiar y no ser globalmente único."
      ],
      [
        "atributo",
        "Valor adicional sobre el tema.",
        "Definir semántica, origen y cardinalidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.13 Sesiones, Single Logout y descubrimiento",
    "id": "19-13-sesiones-single-logout-y-descubrimiento"
  },
  {
    "kind": "paragraph",
    "text": "Hay al menos dos sesiones distintas: la sesión de usuario en el IdP y la sesión local en el SP. AuthnStatement puede contener SessionIndex y SessionNotOnOrAfter, pero el SP decide cómo crear y caducar su cookie. La finalización de la sesión del IdP no finaliza automáticamente todas las sesiones locales a menos que se admita el Single Logout y funcione en toda la cadena."
  },
  {
    "kind": "paragraph",
    "text": "El Single Logout coordina LogoutRequest y LogoutResponse entre los participantes. Puede utilizar el front-channel a través del navegador o el canal posterior. En la práctica, los fallos parciales son comunes: un SP no disponible, una cookie bloqueada o un tiempo de espera pueden dejar las sesiones activas. Por lo tanto, SLO no debe tratarse como un sustituto de sesiones cortas, revocación local y controles de riesgo propios."
  },
  {
    "kind": "paragraph",
    "text": "IdP Discovery aparece cuando un SP acepta varios proveedores. La elección se puede realizar por dominio de usuario, portal, cookie de descubrimiento o servicio dedicado. La interfaz debe evitar el phishing y la selección confusa. En federaciones amplias, los servicios de descubrimiento y metadata agregados deben operarse con firma, vencimiento, filtros y gobernanza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.14 SAML 2.0 x OpenID Connect",
    "id": "19-14-saml-2-0-x-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 y OpenID Connect resuelven la autenticación federada, pero tienen diferentes modelos y ecosistemas. SAML utiliza XML, aserciones, enlaces y perfiles de navegador. OIDC utiliza endpoints OAuth 2.0, JSON, JWT, HTTP y Discovery/JWKS. OIDC tiende a encajar mejor en aplicaciones móviles, SPA, API y arquitecturas modernas; SAML sigue siendo muy sólido en SaaS empresarial y en integraciones B2B heredadas."
  },
  {
    "kind": "paragraph",
    "text": "La comparación no debe reducirse a lo viejo versus lo nuevo. SAML tiene metadata enriquecidos, federaciones maduras e interoperabilidad consolidada en muchos productos empresariales. OIDC ofrece una mejor alineación con API, bibliotecas modernas y tokens JSON. Una organización puede operar ambas cosas durante muchos años, utilizando un intermediario de identidad para traducir protocolos y centralizar políticas."
  },
  {
    "kind": "paragraph",
    "text": "La traducción entre SAML y OIDC no es una mera conversión sintáctica. NameID, asunto, atributos, AuthnContext, acr, amr, sesión y cierre de sesión tienen semánticas diferentes. El intermediario necesita asignaciones explícitas, políticas de confianza y observabilidad para que la garantía de autenticación no se degrade durante la transformación."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - Las normas se superponen en objetivos, pero no en todos los detalles.",
    "headers": [
      "Apariencia",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Formato",
        "XML y firma XML.",
        "JSON, JWT y JOSÉ."
      ],
      [
        "uso dominante",
        "Web corporativa SSO y federación B2B.",
        "Web, aplicaciones móviles, API e identidad moderna."
      ],
      [
        "Descubrimiento",
        "Metadata SAML.",
        "Metadata de descubrimiento y JWKS."
      ],
      [
        "Identificador",
        "NombreID y atributos.",
        "sub y claims."
      ],
      [
        "Sesión y cierre de sesión",
        "SLO para mensajes SAML.",
        "Canales de cierre de sesión iniciados por RP y OIDC."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.15 SAML en API Gateways y brokers de identidad",
    "id": "19-15-saml-en-api-gateways-y-brokers-de-identidad"
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways normalmente protegen las API con tokens OAuth, JWT, mTLS o credenciales técnicas. SAML puede aparecer en la autenticación del portal de desarrolladores, en el inicio de sesión de la consola administrativa o como un protocolo de entrada del agente de identidad. Cuando una aplicación SAML necesita llamar a API, el patrón común es intercambiar la sesión federada con un access token apropiado y no enviar la aserción SAML directamente a todos los servidores."
  },
  {
    "kind": "paragraph",
    "text": "Algunas API Gateways pueden validar claims SAML, extraer atributos y transformarlos en contexto o tokens internos. Esta capacidad debe usarse con cuidado: la API Gateway debe validar la firma, el issuer, la audience, el destinatario, la hora y la reproducción con el mismo rigor que un SP. También debe evitar convertir atributos genéricos en privilegios amplios sin una política explícita."
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas híbridas, un corredor puede recibir SAML de los socios y emitir OIDC/OAuth para aplicaciones modernas. Este puente reduce la necesidad de que cada API comprenda la firma XML, pero centra la confianza en el intermediario. Los registros deben registrar el issuer externo, el sujeto federado, el método de autenticación, las asignaciones y el token emitido, preservando la trazabilidad de un extremo a otro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.16 Amenazas y hardening",
    "id": "19-16-amenazas-y-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Las principales amenazas incluyen replay de claims, firma no válida o elemento incorrecto, aceptación inesperada del issuer, audience inadecuada, ACS abierto, envoltura de firmas XML, analizador XML vulnerable a entidades externas, algoritmos débiles, metadata manipulados, robo de sesiones, redireccionamiento abierto a través de RelayState y mapeo de atributos inseguro."
  },
  {
    "kind": "paragraph",
    "text": "El fortalecimiento comienza con listas permitidas de IdP y SP, metadata autenticados, algoritmos modernos, validación precisa de endpoints, ID únicas, cachés de reproducción, estricta tolerancia de reloj y cierre de fallas. El analizador XML debe deshabilitar DTD y entidades externas. La aplicación sólo debe procesar elementos firmados y rechazar mensajes con estructura ambigua, firmas duplicadas o referencias inesperadas."
  },
  {
    "kind": "paragraph",
    "text": "La operación también importa. Los certificados necesitan inventario, alertas y rotación con superposición. Los relojes deben utilizar una sincronización confiable. Los cambios de atributos y NameID requieren pruebas de regresión. Los registros no deben almacenar claims completas innecesariamente, ya que pueden contener datos personales e información de autenticación."
  },
  {
    "kind": "table",
    "caption": "Tabla 9: la mayoría de las fallas ocurren en la validación y la integración, no en el concepto de SAML.",
    "headers": [
      "Amenaza",
      "Defecto explotado",
      "controlar"
    ],
    "rows": [
      [
        "Reproducir",
        "Aserción válida reutilizada.",
        "Cache de ID y ventanas de tiempo breves."
      ],
      [
        "Envoltorio de firma",
        "El elemento verificado se diferencia del consumido.",
        "Procese exactamente el nodo referenciado y firmado."
      ],
      [
        "inyección SCA",
        "Destino controlado por el atacante.",
        "Solo endpoints registrados en metadata."
      ],
      [
        "XXE",
        "El analizador resuelve la entidad externa.",
        "DTD y entidades externas deshabilitadas."
      ],
      [
        "Mapeo de privilegios",
        "El atributo se convierte en permiso excesivo.",
        "Mapeo explícito y privilegio mínimo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.17 Troubleshooting basada en evidencia",
    "id": "19-17-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting debe identificar el punto exacto del flujo: creación del AuthnRequest, redirección, autenticación en el IdP, emisión de la Response, entrega al ACS, validación criptográfica, mapeo de atributos o creación de sesión. Los errores del navegador, la API Gateway y la aplicación pueden parecer similares, por lo que los ID de solicitud, las marcas de tiempo, los ID de entidad y los endpoints son esenciales."
  },
  {
    "kind": "paragraph",
    "text": "Mensajes como una firma no válida pueden deberse a un certificado incorrecto, una canonicalización, un XML alterado, un algoritmo no permitido o la verificación del elemento incorrecto. La audience no válida apunta a un ID de entidad divergente. La falta de coincidencia del destinatario indica un SCA diferente. La respuesta caducada podría deberse a un reloj desalineado, una cola larga o una ventana pequeña. InResponseTo desconocido apunta a un estado perdido, varios nodos que no comparten una sesión o una respuesta no solicitada."
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas de captura deben usarse en entornos autorizados y con cuidado de no exponer claims. El diagnóstico ideal compara los metadata activos, la solicitud emitida, la respuesta recibida, el certificado seleccionado y la configuración de la aplicación. En los clústeres, verifique la afinidad, solicite el almacenamiento de ID y el reloj de todos los nodos."
  },
  {
    "kind": "table",
    "caption": "Tabla 10: El diagnóstico SAML requiere correlación entre el mensaje, los metadata y el estado local.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Firma no válida",
        "Clave incorrecta, XML, algoritmo o referencia modificados.",
        "Certificado, información firmada, URI de referencia y registros de biblioteca."
      ],
      [
        "Discrepancia de audience",
        "ID de entidad diferente al esperado.",
        "AudienceRestriction y configuración de SP."
      ],
      [
        "En respuesta a desconocido",
        "Estado perdido o respuesta no solicitada.",
        "ID de solicitud, cookie temporal y nodo de clúster."
      ],
      [
        "La afirmación expiró",
        "Desviación del reloj o retraso excesivo.",
        "NotBefore, NotOnOrAfter y el tiempo del host."
      ],
      [
        "Usuario sin permiso",
        "Atributo faltante o asignación incorrecta.",
        "Declaración de atributos y política local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.18 Estudios de casos y laboratorios",
    "id": "19-18-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: una empresa integra su IdP corporativo con un SaaS externo. SP requiere NameID persistente y grupos específicos. El equipo define metadata de dos caras, certificados de firma, mapeo de atributos, ventana de rotación y pruebas de usuarios de múltiples unidades. Inicialmente, el proyecto fracasó porque el correo electrónico se utilizó como clave inmutable; la solución adopta un identificador estable y una migración controlada."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: un portal bancario acepta socios a través de SAML y convierte la identidad en tokens internos para API. El corredor valida la afirmación, aplica la política del issuer y AuthnContext, asigna el sujeto externo a una aplicación asociada y emite un access token con audience restringida. La API Gateway nunca recibe la afirmación original en los servidores, lo que reduce la exposición a XML y centraliza la federación."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: un clúster de SP experimenta fallas intermitentes de InResponseTo. La causa es el almacenamiento local de AuthnRequest en cada nodo sin afinidad o sesión compartida. El navegador comienza en un nodo y regresa a otro. La solución utiliza almacenamiento distribuido de solicitudes pendientes y mantiene la memoria caché de reproducción durante todo el período de validez."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Examinar los metadata de IdP y SP e identificar el ID de entidad, ACS, SSO, SLO y certificados. 2) Decodificar una AuthnRequest y una Respuesta del entorno del laboratorio. 3) Enumere todas las validaciones además de la firma. 4) Simular la rotación de certificados con período superpuesto. 5) Comparar un flujo SAML con Authorization Code + OIDC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 es un marco de federación XML basado en aserciones, mensajes de protocolo, enlaces, perfiles y metadata. Su caso de uso más común es el SSO del navegador web entre un Identity Provider y un Service Provider. El IdP autentica al principal, emite notificaciones y el SP valida el mensaje antes de crear su propia sesión local."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad depende de mucho más que una firma válida. El issuer, la audience, el destinatario, el destino, la respuesta de entrada, la hora, la confirmación del sujeto, la reproducción, la estructura XML y los metadata deben validarse de forma coherente. El ajuste de firmas XML y el análisis inseguro demuestran por qué las bibliotecas maduras y el procesamiento eficaz de elementos firmados son indispensables."
  },
  {
    "kind": "paragraph",
    "text": "SAML sigue siendo relevante en federaciones empresariales y B2B, mientras que OpenID Connect se adapta mejor a las aplicaciones y API modernas. Los intermediarios de identidad permiten la coexistencia y la traducción, pero necesitan preservar la semántica y la trazabilidad. En las plataformas API, SAML normalmente autentica a los usuarios en los portales o ingresa al intermediario, que luego emite los tokens apropiados para las API."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 20 profundizará en la federación de identidades y el inicio de sesión único como arquitectura, comparando dominios de confianza, intermediarios, descubrimiento de dominios de origen, aprovisionamiento, ciclo de vida y coexistencia entre SAML, OpenID Connect y otros mecanismos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de implementación y revisión",
    "id": "lista-de-verificacion-de-implementacion-y-revision"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Los EntityID, los endpoints y los enlaces provienen de metadata versionados y confiables.",
      "Los ID de AuthnRequest son únicos y se almacenan hasta la correlación de respuesta.",
      "ACS acepta solo destinos registrados y rechaza mensajes para otro destinatario.",
      "La biblioteca valida la firma XML y la aplicación consume exactamente el elemento firmado.",
      "Se verifican el issuer, la audience, el destino, el destinatario, InResponseTo y las condiciones temporales.",
      "Las aserciones procesadas se registran en la caché de reproducción durante la ventana requerida.",
      "XML Parser desactiva DTD, entidades externas y construcciones peligrosas.",
      "NameID y los atributos tienen un contrato semántico, de cardinalidad y de origen.",
      "Las asignaciones de grupos a permisos siguen el privilegio mínimo y tienen pruebas.",
      "Los certificados tienen un plan de inventario, monitoreo, superposición y reversión.",
      "La sesión local utiliza cookies seguras y no depende únicamente del Single Logout.",
      "Los registros preservan la correlación sin almacenar datos personales innecesarios."
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
      "Diferenciar entre aserción, mensaje de protocolo, vinculación, perfil y metadata.",
      "Describa el flujo de SSO iniciado por el SP e indique dónde se valida InResponseTo.",
      "Explique por qué una firma válida no es suficiente para aceptar una afirmación.",
      "Compare bindings HTTP-Redirect, HTTP-POST, HTTP-Artifact y SOAP.",
      "Explique el papel de AudienceRestriction, Recipient y SubjectConfirmationData.",
      "Diferenciar entre firma de respuesta y firma de aserción.",
      "Describir el ajuste de firmas XML y la principal regla de defensa.",
      "Proponer rotación de certificados sin tiempo de inactividad.",
      "Compare NameID persistente, transitorio y de dirección de correo electrónico.",
      "Explique por qué SLO puede fallar parcialmente.",
      "Compare SAML 2.0 y OpenID Connect en una arquitectura empresarial.",
      "Diseñe un puente de SAML a OAuth/OIDC utilizando un intermediario de identidad."
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
        "ACS",
        "Servicio al Consumidor de Aserción; endpoint del SP que recibe la respuesta."
      ],
      [
        "Assertion",
        "Estructura XML con declaraciones sobre un tema."
      ],
      [
        "AttributeStatement",
        "Declaración que lleva atributos del sujeto."
      ],
      [
        "AuthnContext",
        "Información sobre el método o la fuerza de autenticación."
      ],
      [
        "AuthnRequest",
        "Mensaje del SP que solicita autenticación al IdP."
      ],
      [
        "Encuadernación",
        "Asignación de mensajes SAML a otro protocolo."
      ],
      [
        "ID de entidad",
        "Identificador estable de una entidad SAML."
      ],
      [
        "IdP",
        "Identity Provider que autentica y emite declaraciones."
      ],
      [
        "InResponseTo",
        "Correlación entre Respuesta y solicitud anterior."
      ],
      [
        "Metadata",
        "Descripción de la entidad, roles, endpoints, enlaces y claves."
      ],
      [
        "NameID",
        "Identificador de sujeto en formato definido."
      ],
      [
        "Perfil",
        "Conjunto de reglas para un caso de uso de SAML."
      ],
      [
        "RelayState",
        "Estado de la aplicación transportado por el flujo del navegador."
      ],
      [
        "SLO",
        "Single Logout coordinado entre los participantes."
      ],
      [
        "SP",
        "Service Provider que consume aserciones y ofrece la aplicación."
      ],
      [
        "SubjectConfirmation",
        "Reglas por las que el sujeto presenta la afirmación."
      ],
      [
        "XML Signature Wrapping",
        "Ataque que separa el elemento verificado del elemento consumido."
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
      "OASIS. Aserciones y protocolos para el lenguaje de marcado de claims de seguridad (SAML) de OASIS V2.0.",
      "OASIS. Bindings para el lenguaje de marcado de afirmación de seguridad (SAML) de OASIS V2.0.",
      "OASIS. Perfiles para el lenguaje de marcado de afirmación de seguridad (SAML) V2.0 de OASIS.",
      "OASIS. Metadata para el lenguaje de marcado de afirmación de seguridad (SAML) de OASIS V2.0.",
      "OASIS. Descripción técnica del lenguaje de marcado de afirmación de seguridad (SAML) V2.0.",
      "OASIS. Perfil de interoperabilidad de metadata SAML V2.0 Versión 1.0.",
      "W3C. Sintaxis y procesamiento de firmas XML.",
      "W3C. Sintaxis y procesamiento de cifrado XML.",
      "OWASP. Hoja de referencia de seguridad SAML.",
      "NIST. Lineamientos de Identidad Digital, cuando sean aplicables al contexto de autenticación y federación."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 es un estándar estable, pero los productos, los algoritmos permitidos, los perfiles de interoperabilidad y las prácticas de refuerzo continúan evolucionando. Antes de la implementación, valide la documentación oficial para el IdP, SP, API Gateway y biblioteca utilizados, incluido el comportamiento de firma, los metadata y la rotación."
  }
];
