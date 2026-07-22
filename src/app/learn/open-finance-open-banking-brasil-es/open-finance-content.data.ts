import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OPEN_FINANCE_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Open Finance Brasil: consentimiento, confianza institucional y API estandarizadas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/es/overview.svg",
    "alt": "Cliente que autoriza el intercambio seguro entre instituciones financieras a través de API",
    "caption": "Figura de apertura: el viaje combina la elección del cliente, la confianza entre los participantes y las API estandarizadas."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El cliente controla el consentimiento, mientras que los participantes regulados preservan la seguridad, la interoperabilidad, la evidencia y la responsabilidad de un extremo a otro."
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
    "text": "El Open Finance brasileño es una infraestructura regulada para compartir datos y servicios financieros a través de API. Su propuesta va más allá de la apertura de información bancaria: el cliente puede autorizar a una institución a recibir datos en poder de otra, iniciar servicios de pago y utilizar esta información en viajes de crédito, gestión financiera, inversiones y otros productos. El valor del ecosistema surge de la combinación de portabilidad de la información, competencia, innovación y control por parte del titular."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura es técnicamente exigente porque conecta instituciones independientes en una red común de confianza. No basta con publicar una API REST. Es necesario identificar a los participantes, asegurar el transporte, autenticar al cliente, registrar el consentimiento, emitir tokens, limitar los scopes, estandarizar las cargas útiles, garantizar el no repudio y producir evidencia para el seguimiento y la auditoría. Un error de una sola capa puede impedir el viaje o, peor aún, exponer datos de alto valor."
  },
  {
    "kind": "paragraph",
    "text": "El modelo brasileño ha evolucionado desde la Open Banking hasta un ámbito más amplio de Open Finance. Las fases de implementación históricamente han organizado datos abiertos, datos de registro y transaccionales, inicio de pagos y expansión a otros productos financieros. En 2026, el ecosistema continúa evolucionando a través de estándares, manuales, agenda técnica y nuevas capacidades; Por lo tanto, los profesionales deben distinguir los principios estables de las versiones de API y reglas operativas específicas."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta los conocimientos previos del curso (OAuth 2.0, OpenID Connect, mTLS, JWT, gateways, seguridad, observabilidad y alta disponibilidad) con el contexto brasileño. El objetivo es construir un modelo mental de extremo a extremo, útil para la arquitectura, el desarrollo, el soporte y la retroubleshooting en las instituciones participantes."
  },
  {
    "kind": "paragraph",
    "text": "Cómo estudiar este capítulo Recorra cada flujo identificando cuatro objetos diferentes: consentimiento, sesión de autenticación, access token y llamada API. Están relacionados, pero no son equivalentes. En producción, cada uno tiene su propio ciclo de vida, identificadores y evidencias."
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
      "Diferenciar Open Banking y Open Finance en el contexto brasileño.",
      "Explique los roles de cliente, receptor, transmisor, iniciador y titular de cuenta.",
      "Describa el recorrido del consentimiento, la autenticación, la confirmación y el intercambio.",
      "Relacionar Directorio, certificados, OAuth 2.0, OIDC, FAPI-BR y mTLS.",
      "Comprender las categorías de API, control de versiones, idempotencia y manejo de errores.",
      "Analice el inicio de pago sin confundir recorrido, autorización y liquidación.",
      "Aplicar principios de privacidad, finalidad, minimización y revocación.",
      "Diseño de gateways, observabilidad, alta disponibilidad y respuesta a incidentes.",
      "Diagnosticar fallas de redirección, certificados, tokens, consentimiento y API."
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
      "35.1 Open Banking, Open Finance y portabilidad de datos",
      "35.2 Evolución y marco regulatorio",
      "35.3 Participantes, roles y límites de responsabilidad",
      "35.4 Consentimiento y experiencia del cliente",
      "35.5 Directorio, confianza e identidad institucional",
      "35.6 FAPI-BR, OAuth 2.0, OIDC y mTLS",
      "35.7 Categorías de API y contratos",
      "35.8 Inicio de pagos",
      "35.9 Seguridad, privacidad y prevención de fraude",
      "35.10 API Gateway, observabilidad y disponibilidad",
      "35.11 Certificación y seguimiento",
      "35.12 Experiencia del cliente y redirecciones",
      "35.13 Calidad de datos, semántica y ciclo de vida",
      "35.14 Capacidad y requisitos no funcionales",
      "35.15 Control de versiones y gestión de cambios",
      "35.16 Troubleshooting de un extremo a otro",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.1 Open Banking, Open Finance y portabilidad de datos",
    "id": "35-1-open-banking-open-finance-y-portabilidad-de-datos"
  },
  {
    "kind": "paragraph",
    "text": "Open Banking describe en términos generales la apertura controlada de datos y servicios bancarios. Open Finance extiende este principio a un conjunto más completo de productos y relaciones financieras. En Brasil, el nombre evolucionó porque el scope pasó a incluir datos y servicios que van más allá de las cuentas y tarjetas corrientes, incluyendo créditos, inversiones, cambios, seguros y pensiones, de acuerdo con las normas y manuales aplicables."
  },
  {
    "kind": "paragraph",
    "text": "El cambio de nombre no elimina la arquitectura original. El núcleo sigue siendo el intercambio estandarizado a través de API, previa autorización del cliente cuando los datos son personales o están protegidos. El cliente elige quién los recibe, de dónde proceden los datos, con qué finalidad y durante cuánto tiempo. La institución receptora no recibe acceso ilimitado a la cuenta; recibe únicamente los datos o servicios amparados por el consentimiento y scope autorizado."
  },
  {
    "kind": "paragraph",
    "text": "La portabilidad de datos no significa copiar permanentemente toda su vida financiera a un repositorio central. La arquitectura se distribuye: los datos permanecen en las instituciones que los poseen y se transmiten, previa solicitud, a los participantes autorizados. Esta característica reduce la centralización, pero requiere disponibilidad, interoperabilidad y coherencia operativa entre muchas organizaciones."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Los términos están relacionados, pero no son sinónimos perfectos.",
    "headers": [
      "Concepto",
      "Énfasis",
      "Ejemplo"
    ],
    "rows": [
      [
        "Open Banking",
        "Datos y servicios bancarios.",
        "Cuentas, tarjetas, crédito y pagos."
      ],
      [
        "Open Finance",
        "Ecosistema financiero más amplio.",
        "Inversiones, seguros, cambio y pensiones, según el scope actual."
      ],
      [
        "API abierta",
        "Interfaz publicada con reglas de acceso.",
        "API estandarizada para datos o servicios financieros."
      ],
      [
        "Portabilidad de la información",
        "El cliente controla el movimiento de datos.",
        "Comparta el historial para obtener una mejor propuesta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.2 Evolución y marco regulatorio",
    "id": "35-2-evolucion-y-marco-regulatorio"
  },
  {
    "kind": "paragraph",
    "text": "La implementación brasileña se organizó por etapas. El primero concentró datos abiertos sobre productos, canales y servicios. El segundo introdujo el intercambio de datos de registro y transacciones a través del consentimiento. El tercero incorporaba el inicio de pagos y el envío de propuestas. El cuarto amplió el scope a otros productos financieros. Esta división es útil como descripción histórica, aunque el ecosistema actual se mantiene gracias a una agenda evolutiva en curso."
  },
  {
    "kind": "paragraph",
    "text": "El marco central es la Resolución Conjunta N° 1, de 4 de mayo de 2020, posteriormente modificada por otras normas. El Banco Central publica manuales técnicos y operativos que detallan las API, la experiencia del cliente, la seguridad, los servicios, el scope y el seguimiento. En 2026, nuevas instrucciones regulatorias continuaron actualizando estos manuales, lo que refuerza la necesidad de consultar la versión actual antes de implementar o promover cambios."
  },
  {
    "kind": "paragraph",
    "text": "La Estructura de Gobierno coordina especificaciones, directorio, certificaciones, seguimiento y procesos comunes. Las instituciones siguen siendo responsables de sus sistemas, datos, autenticación, seguridad y cumplimiento normativo. La gobernanza compartida no transfiere la responsabilidad individual por fallas o indisponibilidad de protección."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Las fases explican la evolución, pero la operación actual es continua y versionada.",
    "headers": [
      "Etapa histórica",
      "Contenido predominante",
      "Impacto arquitectónico"
    ],
    "rows": [
      [
        "Datos abiertos",
        "Productos, tarifas, canales y características.",
        "APIs públicas, catálogo y estandarización."
      ],
      [
        "Datos del cliente",
        "Registro y transacciones con consentimiento.",
        "OAuth, identidad, scope y privacidad."
      ],
      [
        "Servicios",
        "Iniciación de pagos y otros viajes.",
        "Idempotencia, estatus, antifraude y alta disponibilidad."
      ],
      [
        "Expansión",
        "Otros productos y datos financieros.",
        "Más dominios, versiones e integración entre industrias."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.3 Participantes, roles y límites de responsabilidad",
    "id": "35-3-participantes-roles-y-limites-de-responsabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Una misma institución puede desempeñar más de un papel. Como transmisor, proporciona los datos que mantiene. Como receptor recibe datos autorizados para ofrecer servicios. Como iniciador de la transacción de pago, usted lidera el proceso y envía un pedido autorizado sin retener los fondos. Como titular de la cuenta, usted autentica al cliente, valida la autorización y ejecuta el pago de acuerdo con las reglas aplicables."
  },
  {
    "kind": "paragraph",
    "text": "Los roles deben modelarse según la función, no sólo según la marca. Un conglomerado puede tener entidades jurídicas distintas, cada una con sus propios certificados, registros y responsabilidades. El enrutamiento y la autorización deben respetar al participante exacto, el entorno, la organización y el software registrado, evitando asumir que todos los componentes de un grupo financiero comparten automáticamente la misma identidad."
  },
  {
    "kind": "paragraph",
    "text": "También hay componentes comunes como directorio, herramientas de certificación, portales de seguimiento y especificaciones. Estos servicios crean interoperabilidad, pero no reemplazan los controles internos de cada participante. La institución debe garantizar que sus API, portales, certificados, credenciales y procesos estén actualizados y operativos."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - El diagnóstico debe registrar el papel que jugó cada institución en la transacción.",
    "headers": [
      "papel",
      "Responsabilidad principal",
      "Evidencia operativa"
    ],
    "rows": [
      [
        "Transmisor de datos",
        "Poner a disposición datos autorizados y estandarizados.",
        "Registros de consentimiento, token y llamadas."
      ],
      [
        "Receptor de datos",
        "Solicitar y utilizar datos según la finalidad.",
        "Registro del viaje y base legal."
      ],
      [
        "Iniciador de pago",
        "Crea el viaje y transmite el orden.",
        "Consentimiento, idempotencia y estatus."
      ],
      [
        "Titular de la cuenta",
        "Autenticar y ejecutar el pago.",
        "Confirmación, antifraude y devolución."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.4 Consentimiento y experiencia del cliente",
    "id": "35-4-consentimiento-y-experiencia-del-cliente"
  },
  {
    "kind": "paragraph",
    "text": "El consentimiento es una autorización explícita para fines y condiciones específicos. No debe confundirse con autenticación. La autenticación demuestra la identidad del cliente ante la institución; El consentimiento registra la decisión sobre datos o servicios. El recorrido debe permitir al cliente comprender quién recibirá los datos, qué categorías se compartirán, durante cuánto tiempo y con qué propósito."
  },
  {
    "kind": "paragraph",
    "text": "La experiencia normalmente comienza en la institución receptora. El cliente selecciona la institución de origen y es redirigido a un canal controlado por ésta. En este entorno se autentica con los mecanismos habituales y confirma la autorización. Luego regresa a la institución receptora, que completa el Token Exchange e inicia las llamadas. El receptor no debe recopilar la contraseña utilizada en el transmisor."
  },
  {
    "kind": "paragraph",
    "text": "La revocación y la caducidad son parte del ciclo de vida. La rescisión del consentimiento impide nuevas llamadas admitidas por el mismo, pero no elimina automáticamente los datos ya recibidos cuando existe una obligación u otra base legal para conservarlos. La gobernanza de datos debe separar el permiso para recopilarlos, el propósito de uso, la retención, la anonimización y la eliminación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/es/figure-01.svg",
    "alt": "Consentimiento, autenticación y llamada API como pasos independientes",
    "caption": "Figura 1: El consentimiento, la autenticación y la llamada API son pasos relacionados pero independientes."
  },
  {
    "kind": "paragraph",
    "text": "Regla de seguridad La contraseña o factor de autenticación del banco de origen sólo debe ingresarse en el ambiente controlado por esa institución. La institución receptora trabaja con redirección, consentimiento y tokens, no con captura de credenciales bancarias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.5 Directorio, confianza e identidad institucional",
    "id": "35-5-directorio-confianza-e-identidad-institucional"
  },
  {
    "kind": "paragraph",
    "text": "El ecosistema depende de una infraestructura de confianza capaz de responder quién es el participante, qué funciones realiza, qué software ha sido registrado, qué endpoints le pertenecen y qué certificados están asociados a la identidad. El Directorio juega un papel central en este descubrimiento y en el establecimiento de relaciones verificables entre organizaciones."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados y las claves deben tratarse como activos de producción. Se debe monitorear la rotación, vencimiento, revocación, cadena de confianza y asociación al entorno correcto. Un certificado criptográficamente válido puede resultar inapropiado si está vinculado a otra organización, otro software u otro propósito. Por tanto, la validación de la identidad no termina en la firma; Incluye metadata y registros de ecosistemas."
  },
  {
    "kind": "paragraph",
    "text": "La confianza también está versionada. Los cambios en certificados, endpoints, perfiles de software y participantes deben propagarse sin ventanas de inconsistencia. Los entornos de aprobación y producción no deben compartir secretos o certificados de forma indiscriminada."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/es/figure-02.svg",
    "alt": "Directorio y confianza institucional que conecta a los participantes a través de criptografía y protocolos",
    "caption": "Figura 2: La confianza institucional combina registro, cifrado, protocolos y evidencia operativa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.6 FAPI-BR, OAuth 2.0, OpenID Connect y mTLS",
    "id": "35-6-fapi-br-oauth-2-0-openid-connect-y-mtls"
  },
  {
    "kind": "paragraph",
    "text": "Las API financieras manejan datos y operaciones de alto riesgo. El perfil de seguridad brasileño, conocido como FAPI-BR, agrega requisitos a OAuth 2.0 y OpenID Connect para reducir la interceptación de códigos, la manipulación de parámetros, los clientes falsos y la reutilización de tokens. Se debe consultar el perfil actual porque las versiones y periodos de convivencia son parte de la evolución técnica del ecosistema."
  },
  {
    "kind": "paragraph",
    "text": "El viaje involucra el authorization server, el cliente registrado y el resource server. El cliente inicia una autorización; el servidor autentica al usuario y vincula la transacción al consentimiento; luego, emite tokens para acceder a las API. Mecanismos como PKCE, parámetros firmados, autorización push, autenticación sólida de cliente y tokens vinculados a certificados pueden participar en el perfil, según la versión aplicable."
  },
  {
    "kind": "paragraph",
    "text": "mTLS protege el transporte y también puede vincular el token al certificado del cliente. En este modelo, robar el token no es suficiente: el atacante también necesitaría demostrar la posesión de la clave privada correspondiente. El gateway debe validar la cadena, identidad, asociación con el software registrado y confirmación presente en el token, además de issuer, audience, vencimiento y scopes."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect admite la autenticación y la entrega de claims de identidad en el flujo de autorización. Sin embargo, las API de datos deben validar access tokens, no utilizar tokens de identificación como sustitutos genéricos. La separación entre autenticación de usuario, autorización de cliente y acceso a recursos sigue siendo esencial."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - La seguridad se compone de capas; ningún mecanismo por sí solo resuelve todo el problema.",
    "headers": [
      "capa",
      "Mecanismo",
      "Responsabilidad"
    ],
    "rows": [
      [
        "Transporte",
        "TLS y mTLS",
        "Confidencialidad, integridad e identidad de vanguardia."
      ],
      [
        "Autorización",
        "OAuth 2.0 / FAPI-BR",
        "Delegación, tokens, scopes y protección de flujo."
      ],
      [
        "Identidad",
        "OpenID Connect",
        "Autenticación y claims sobre el usuario."
      ],
      [
        "Mensaje",
        "JWT/JWS/JWE",
        "Firma, integridad y posible confidencialidad."
      ],
      [
        "Ecosistema",
        "Directorio y certificados",
        "Identidad institucional y descubrimiento confiable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.7 Categorías de API y contratos",
    "id": "35-7-categorias-de-api-y-contratos"
  },
  {
    "kind": "paragraph",
    "text": "El catálogo de Open Finance organiza las API por grupos de datos y servicios. Entre las categorías recurrentes se encuentran canales y productos, datos de registro, cuentas, tarjetas, operaciones de crédito, inversiones, divisas, seguros, pensiones, consentimientos, recursos y pagos. La disponibilidad y la versión exacta deben consultarse en el catálogo oficial vigente."
  },
  {
    "kind": "paragraph",
    "text": "Las especificaciones estandarizan nombres, campos, tipos, paginación, headers, errores y requisitos no funcionales. Esto reduce las ambigüedades entre instituciones, pero no elimina las diferencias en los datos de origen. Los sistemas heredados pueden representar fechas, saldos, contratos y titulares de diferentes maneras. La capa de adaptación debe preservar la semántica, no sólo convertir los nombres de los campos."
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones requiere una coexistencia planificada. Es posible que una institución necesite admitir más de una versión durante las migraciones, realizar pruebas de cumplimiento y comunicar cambios a los consumidores. La API Gateway ayuda con el enrutamiento, pero la compatibilidad real depende del backend, el contrato, la documentación y la observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Ejemplo conceptual de llamada de datos GET /open-banking/accounts/vX/accounts/{accountId}/balances HTTP/1.1 Host: api.instituicao.example Autorización: Portador <access-token> X-Fapi-Interaction-Id: <uuid> Aceptar: application/json # La ruta exacta y los headers dependen de la versión actual de la especificación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.8 Inicio de pagos",
    "id": "35-8-inicio-de-pagos"
  },
  {
    "kind": "paragraph",
    "text": "El inicio del pago permite a una institución autorizada crear la experiencia y transmitir el pedido a la institución donde el cliente mantiene la cuenta. El iniciador no necesita retener los fondos. El cliente elige la cuenta, se autentica como titular y confirma la operación. La ejecución financiera se produce en el acuerdo y en los proveedores involucrados, mientras que el iniciador monitorea los estados y presenta el resultado."
  },
  {
    "kind": "paragraph",
    "text": "Desde una perspectiva de API, el viaje requiere idempotencia, correlación y una máquina de estados. Repetir una solicitud de tiempo de espera no puede crear pagos duplicados. El identificador de idempotencia debe estar asociado al contenido y a una ventana definida. Los estados intermedios deben tratarse como parte del contrato: pendiente, aceptado, rechazado, completado o cancelado pueden requerir consultas o notificaciones adicionales."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad antifraude no desaparece. El titular y el iniciador aplican sus propios controles, respetando la experiencia regulada. Señales como el dispositivo, el comportamiento, el riesgo, el valor, el beneficiario y el historial pueden provocar una mayor autenticación o rechazo. La arquitectura debe evitar la filtración de detalles que ayuden a los atacantes a calibrar los intentos."
  },
  {
    "kind": "subhead",
    "text": "Iniciación de pago: separación entre viaje y movimiento de fondos"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/es/figure-03.svg",
    "alt": "Iniciador de pago que organiza el viaje ejecutado por la institución holding",
    "caption": "Figura 3: El iniciador organiza el viaje, pero la institución controladora ejecuta el movimiento de fondos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.9 Seguridad, privacidad y prevención de fraude",
    "id": "35-9-seguridad-privacidad-y-prevencion-de-fraude"
  },
  {
    "kind": "paragraph",
    "text": "Los datos financieros tienen un gran valor y pueden revelar ingresos, hábitos, ubicación indirecta, relaciones y salud financiera. El principio de minimización requiere solicitar sólo las categorías necesarias para el propósito presentado. El receptor debe impedir el uso secundario incompatible, limitar el acceso interno y registrar quién consultó o procesó los datos."
  },
  {
    "kind": "paragraph",
    "text": "La LGPD se aplica junto con las regulaciones sectoriales. El consentimiento en Open Finance es un mecanismo operativo y regulatorio específico, pero el procesamiento posterior aún debe respetar el propósito, la transparencia, la seguridad y los derechos del titular. Los secretos, tokens, certificados y cargas útiles no deben aparecer en su totalidad en los registros, las herramientas de soporte o los entornos de prueba."
  },
  {
    "kind": "paragraph",
    "text": "Las amenazas incluyen phishing durante la redirección, aplicaciones falsas, robo de tokens, abuso de consentimiento, enumeración de recursos, fraude de pagos, reproducción, SSRF y compromiso de certificados. Los controles eficaces combinan la validación de URI de redireccionamiento, mTLS, tokens cortos, audience restringida, idempotencia, detección de comportamiento y respuesta rápida a incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Cada amenaza necesita control preventivo y evidencia verificable.",
    "headers": [
      "Amenaza",
      "control principal",
      "evidencia"
    ],
    "rows": [
      [
        "Aplicación o participante falso",
        "Directorio, certificados y validación de clientes.",
        "Identidad y software registrados."
      ],
      [
        "Token robada",
        "mTLS/remitente restringido, audience y vencimiento corto.",
        "Fallo de vinculación o uso anómalo."
      ],
      [
        "Consentimiento abusivo",
        "Objeto, scope, plazo y revocación.",
        "Registro del recorrido y pantallas presentadas."
      ],
      [
        "Pago doble",
        "Idempotencia y máquina de estados.",
        "Misma clave y mismo contenido."
      ],
      [
        "fuga de registro",
        "Enmascaramiento y minimización.",
        "Registros sin tokens ni datos confidenciales completos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.10 API Gateway, observabilidad y alta disponibilidad",
    "id": "35-10-api-gateway-observabilidad-y-alta-disponibilidad"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway concentra controles de transporte, validación de certificados, tokens, limitación de velocidad, enrutamiento, transformación y auditoría. Sin embargo, no debería asumir únicamente las reglas comerciales de consentimiento. El backend debe verificar el vínculo entre recurso, cliente, titular y scope. De lo contrario, una mala configuración en la API Gateway podría abrir un acceso no autorizado."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe correlacionar el ID de interacción, el ID de consentimiento, el ID de cliente, la organización, el token, la versión de API, el endpoint, el estado, la latencia y el backend. Los tokens y los datos personales deben estar enmascarados. Las métricas agregadas revelan disponibilidad y rendimiento; los seguimientos ayudan a separar el tiempo entre la API Gateway, el authorization server, el adaptador y el legado."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad es un requisito sistémico. Una institución puede estar sana internamente y aun así fallar debido al DNS, el certificado, el directorio, la dependencia de autorización o el backend. Los tiempos de espera, los reintentos y los disyuntores deben considerar la idempotencia y la naturaleza de la operación. La replay de la lectura puede ser segura; Repetir la creación de pagos sin la clave correcta puede resultar desastroso."
  },
  {
    "kind": "subhead",
    "text": "Arquitectura perimetral para API reguladas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/es/figure-04.svg",
    "alt": "API Gateway aplica controles perimetrales en un recorrido autorizado de extremo a extremo",
    "caption": "Figura 4: La API Gateway aplica controles perimetrales, mientras que el consentimiento y la autorización empresarial permanecen de un extremo a otro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.11 Certificación, seguimiento y cumplimiento",
    "id": "35-11-certificacion-seguimiento-y-cumplimiento"
  },
  {
    "kind": "paragraph",
    "text": "El ecosistema utiliza mecanismos de certificación funcional y de seguridad para aumentar la interoperabilidad. Pasar las pruebas no garantiza un funcionamiento permanente: los cambios en las versiones, los certificados, las dependencias y la infraestructura pueden introducir regresiones. Por lo tanto, el cumplimiento debe integrarse en CI/CD, con pruebas y validaciones automatizadas antes de cada promoción."
  },
  {
    "kind": "paragraph",
    "text": "El seguimiento y los indicadores comunes permiten identificar la indisponibilidad, la degradación y las diferencias de comportamiento entre los participantes. En 2026, el Banco Central actualizó los manuales de monitoreo y seguridad, reforzando la revisión periódica de configuraciones, servicios expuestos y controles de autenticación y autorización. El equipo debe seguir estándares y una agenda evolutiva, no sólo el trabajo atrasado interno."
  },
  {
    "kind": "paragraph",
    "text": "La evidencia de cumplimiento incluye la configuración publicada, la versión de API, el certificado activo, los resultados de las pruebas, los registros de trayectoria, las métricas, los incidentes y los planes de remediación. La ausencia de un rastro auditable convierte los problemas técnicos en riesgos regulatorios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.12 Experiencia del cliente y redirecciones",
    "id": "35-12-experiencia-del-cliente-y-redirecciones"
  },
  {
    "kind": "paragraph",
    "text": "La experiencia del cliente es parte del protocolo operativo. Los redireccionamientos entre aplicaciones y navegadores deben preservar el contexto sin exponer las credenciales. La interfaz debe dejar claro qué institución recibe los datos, quién los transmite, qué datos se utilizarán y durante cuánto tiempo. La ambigüedad visual aumenta el riesgo de phishing y abandono del viaje."
  },
  {
    "kind": "paragraph",
    "text": "Los viajes de aplicación a aplicación y de web a aplicación requieren enlaces profundos, enlaces universales o mecanismos equivalentes configurados con el dominio y la aplicación correctos. El parámetro de estado protege la correlación y ayuda a evitar la reinversión de la sesión. La aplicación debe gestionar la cancelación, la devolución sin código, la caducidad, el cambio de dispositivo y la reanudación del viaje de forma predecible."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación se produce en el entorno de la institución transmisora o titular. El receptor no debe imitar la pantalla del otro banco ni solicitar su contraseña. Los mensajes de error también deben evitar los términos internos e informar al cliente qué paso falló sin revelar detalles de seguridad."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La experiencia segura necesita predecir rutas de error y cancelación.",
    "headers": [
      "Situación",
      "Tratamiento esperado",
      "Riesgo evitado"
    ],
    "rows": [
      [
        "El usuario cancela",
        "Devuelve el estado controlado y no genera consentimiento.",
        "Consentimiento fantasma."
      ],
      [
        "Enlace profundo no válido",
        "Bloquear el retorno y guiar el nuevo intento.",
        "Secuestro de redirección."
      ],
      [
        "estado divergente",
        "Rechaza la respuesta.",
        "CSRF y cambio de sesión."
      ],
      [
        "La sesión expiró",
        "Reinicie la autorización con un contexto claro.",
        "Uso de sesión obsoleta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.13 Calidad de datos, semántica y ciclo de vida",
    "id": "35-13-calidad-de-datos-semantica-y-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "La interoperabilidad no significa sólo JSON válido. Los campos deben conservar su significado en todas las instituciones. El saldo disponible, el saldo bloqueado, el límite, la fecha del contrato y el estado del contrato pueden tener reglas diferentes en los sistemas de origen. El adaptador debe aplicar la semántica de la especificación y las limitaciones del documento, evitando llenar campos con valores aproximados solo para satisfacer el esquema."
  },
  {
    "kind": "paragraph",
    "text": "La calidad incluye integridad, coherencia, puntualidad, unicidad y trazabilidad. Cuando el dato no exista o no corresponda, la representación deberá ajustarse al contrato. Nulo, campo faltante, cero y cadena vacía no son equivalentes. Los errores sistemáticos de mapeo pueden producir decisiones crediticias incorrectas incluso cuando la API está disponible."
  },
  {
    "kind": "paragraph",
    "text": "El receptor también debe gobernar los datos después de su recopilación. Deberá consignar origen, consentimiento, finalidad, fecha de adquisición, transformaciones y normas de conservación. Cuando el consentimiento expire o sea revocado, cesarán los cobros adicionales; El tratamiento de los datos ya recibidos deberá seguir obligaciones legales, contractuales y políticas de disposición."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.14 Capacidad y requisitos no funcionales",
    "id": "35-14-capacidad-y-requisitos-no-funcionales"
  },
  {
    "kind": "paragraph",
    "text": "Las especificaciones del ecosistema incluyen requisitos no funcionales como disponibilidad, latencia, límites de tráfico, monitoreo y comportamiento de error. Estos parámetros varían según el grupo y la versión de API. La planificación de la capacidad debe considerar ráfagas de consentimientos, agregadores que consultan a múltiples instituciones, cierres mensuales y nuevas funciones regulatorias."
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tarifas debe proteger la plataforma sin interrumpir a los consumidores legítimos. La clave de límite puede combinar organización, software, consentimiento, token y API. Los contadores locales son simples, pero pueden permitir desbordamientos en múltiples instancias; Los contadores globales mejoran la coherencia y añaden latencia y dependencia."
  },
  {
    "kind": "paragraph",
    "text": "La estrategia de disponibilidad debe incluir zonas independientes, renovación de certificados, rotación de claves, replicación de configuraciones y pruebas de contingencia. El objetivo no es sólo mantener el endpoint respondiendo, sino preservar la autenticación, la autorización, los datos actualizados y el estado de confianza durante fallas parciales."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Disponibilidad técnica sin calidad ni seguridad no representa éxito.",
    "headers": [
      "Dimensión",
      "Indicador",
      "Pregunta operativa"
    ],
    "rows": [
      [
        "Disponibilidad",
        "Éxito por API y participante.",
        "¿Está disponible el viaje completo?"
      ],
      [
        "Latencia",
        "Percentiles por endpoint y backend.",
        "¿Dónde se consume el tiempo?"
      ],
      [
        "Capacidad",
        "RPS, competición y colas.",
        "¿Hay espacio para ráfagas y reintentos?"
      ],
      [
        "Calidad",
        "Campos faltantes y discrepancias.",
        "¿Es la respuesta semánticamente correcta?"
      ],
      [
        "Seguridad",
        "Fallos de tokens, mTLS y fraude.",
        "¿El control bloquea el riesgo correcto?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.15 Control de versiones y gestión de cambios",
    "id": "35-15-control-de-versiones-y-gestion-de-cambios"
  },
  {
    "kind": "paragraph",
    "text": "El catálogo diferencia versiones actuales, candidatas y periodos de convivencia. Una nueva versión puede cambiar esquemas, endpoints, requisitos de seguridad o reglas no funcionales. La institución necesita hacer un inventario de los consumidores y las dependencias internas, actualizar simulacros, contratos, API Gateways, backends y observabilidad antes de la fecha obligatoria."
  },
  {
    "kind": "paragraph",
    "text": "Los cambios deben entrar en proceso. Linting, pruebas de contrato, pruebas funcionales, certificación, seguridad y rendimiento deben ejecutarse con la misma configuración que llegará a producción. Las excepciones manuales deben tener un plazo y un responsable. La documentación debe informar qué versión está activa, cuál está retirada y cómo identificar el tráfico restante."
  },
  {
    "kind": "paragraph",
    "text": "Los períodos de convivencia no deben convertirse en apoyos indefinidos. La telemetría por versión, organización y software ayuda a confirmar la migración. El retiro solo debe ocurrir cuando los requisitos regulatorios, la comunicación y la evidencia técnica estén alineados."
  },
  {
    "kind": "paragraph",
    "text": "Gobernanza del cambio Trate la configuración estándar, manual, de especificación y de API Gateway como artefactos versionados. Un cambio regulatorio solo finaliza cuando también se han actualizado el código, los certificados, las pruebas, la documentación, el monitoreo y los runbooks."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.16 Troubleshooting de un extremo a otro",
    "id": "35-16-troubleshooting-de-un-extremo-a-otro"
  },
  {
    "kind": "paragraph",
    "text": "Los fracasos de las Open Finance deben clasificarse por etapas. Si la institución no se presenta a la selección, investigue el directorio, registro y descubrimiento. Si la redirección falla, verifique el URI de redirección, el estado, el navegador, la aplicación y el enlace profundo. Si no se emite el token, evalúe la autorización, PKCE, autenticación del cliente, certificado y consentimiento. Si la API devuelve 401 o 403, valide el issuer, la audience, el scope, el enlace y el recurso."
  },
  {
    "kind": "paragraph",
    "text": "Los errores mTLS requieren inspección de la cadena, la validez, el nombre de host, el certificado presentado, el almacén de confianza y la asociación de identidad. Los tiempos de espera pueden ser en DNS, TCP, TLS, authorization server, API Gateway, adaptador o legado. La identificación de interacción debe acompañar la investigación entre organizaciones, preservando datos mínimos y evitando enviar tokens completos en tickets."
  },
  {
    "kind": "paragraph",
    "text": "En pagos diferenciar entre errores de creación, autorización, ejecución y consulta de estado. Un tiempo de espera del cliente no prueba un fracaso financiero. Antes de volver a intentarlo, consulte el estado utilizando los identificadores del contrato. El runbook debe indicar cuándo se permite el reintento, cuándo es obligatoria la conciliación y cuándo se requiere intervención manual."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - El diagnóstico comienza con el paso, no con el producto seleccionado por el usuario.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "Evidencia prioritaria"
    ],
    "rows": [
      [
        "La institución no aparece.",
        "Directorio, registro, caché o entorno.",
        "Registro y descubrimiento de participantes."
      ],
      [
        "Redirección fallida",
        "URI, estado, enlace de aplicación o sesión divergentes.",
        "Solicitud de autorización y registros de canales."
      ],
      [
        "cliente inválido",
        "Certificado, private_key_jwt o registro.",
        "Metadata e identidad del software."
      ],
      [
        "401 en API",
        "Enlace de token, audience o mTLS no válido.",
        "Registros de claims, certificados y API Gateways."
      ],
      [
        "Pago doble",
        "Falta idempotencia o reintento incorrecto.",
        "Historial de claves, carga útil y estado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.17 Estudios de casos y laboratorios",
    "id": "35-17-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: Agregador financiero: una institución receptora obtiene el consentimiento para cuentas y tarjetas mantenidas en dos bancos. El backend normaliza los datos y presenta una vista consolidada. El principal riesgo no es sólo la disponibilidad; es preservar el significado, la vigencia, las fechas, la propiedad y el propósito al combinar diferentes fuentes."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Iniciación de Pix: el cliente inicia el viaje en una aplicación de terceros, se autentica en el banco titular y confirma el pago. El iniciador recibe el estado pendiente después del tiempo de espera. La estrategia correcta es consultar el recurso por identificador y conciliar el estado, no crear un segundo pedido sin verificar la idempotencia."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: Rotación de certificados: se publicó el nuevo certificado, pero una instancia de API Gateway mantuvo el antiguo almacén de confianza. Algunas llamadas fallan de forma intermitente. La investigación combina huella digital, nodo de escucha, tiempo, caché e implementación de configuración."
  },
  {
    "kind": "paragraph",
    "text": "Laboratorios sugeridos 1) Diseñe un recorrido con consentimiento, autorización y API por separado. 2) Validar un JWT conceptual con issuer, audience, vencimiento y confirmación del certificado. 3) Simule una falla de mTLS y registre evidencia por capa. 4) Estados modelo e idempotencia de un inicio de pago."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Open Finance Brasil es una infraestructura regulada y distribuida que combina la elección del cliente, la identidad institucional, el consentimiento, la autenticación, los tokens y las API estandarizadas. La Open Banking representa el origen y parte del scope; Open Finance amplía la visión a otros productos y servicios financieros."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad depende de capas: Directorio, certificados, mTLS, OAuth 2.0, OpenID Connect, FAPI-BR, contratos, monitoreo y controles internos. El consentimiento no reemplaza la autenticación y el token no reemplaza la autorización comercial. La institución deberá validar todas las relaciones hasta el recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "Operar el ecosistema requiere control de versiones, certificación, observabilidad, alta disponibilidad, privacidad y respuesta coordinada a incidentes. A medida que los estándares y manuales continúan evolucionando, los arquitectos y operadores deben tratar la documentación oficial y las agendas regulatorias como dependencias de producción."
  },
  {
    "kind": "paragraph",
    "text": "Próximo paso del curso El siguiente capítulo profundiza en la LGPD aplicada a las API, conectando los fundamentos legales y técnicos de propósito, minimización, derechos de los titulares, seguridad, retención y gobernanza de datos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de arquitectura y operación",
    "id": "lista-de-verificacion-de-arquitectura-y-operacion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se identifican explícitamente las funciones de receptor, transmisor, iniciador y titular.",
      "El consentimiento, la autenticación, el token y la llamada API tienen su propia correlación y ciclo de vida.",
      "El directorio, los certificados, los endpoints y las declaraciones de software están actualizados.",
      "Se validan el issuer, la audience, los scopes, el vencimiento y la vinculación del token.",
      "Los registros no exponen tokens, credenciales ni datos financieros completos.",
      "La idempotencia y la conciliación se definen para las transacciones de pago.",
      "Los períodos de versiones y coexistencia se manejan en la API Gateway y en el backend.",
      "Los runbooks cubren DNS, TLS, mTLS, OAuth, consentimiento, API y legado.",
      "La certificación y las pruebas de regresión son parte del proceso.",
      "Los estándares, manuales y agenda evolutiva son monitoreados por responsables definidos."
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
      "Diferenciar Open Banking y Open Finance en el contexto brasileño.",
      "Explique por qué el consentimiento y la autenticación son objetos diferentes.",
      "Describir el flujo entre la institución receptora, el transmisor y el cliente.",
      "Explicar el papel del Directorio en la confianza entre los participantes.",
      "Lista FAPI-BR, OAuth 2.0, OIDC y mTLS.",
      "Explique por qué el ID token no debe usarse como access token genérico.",
      "Modelar una estrategia de idempotencia para el inicio de pagos.",
      "Enumere la evidencia necesaria para diagnosticar una falla 401.",
      "Proponer métricas y registros para una API de datos de cuenta.",
      "Describir los impactos de una rotación de certificados incompleta."
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
        "Consentimiento",
        "Autorización explícita del cliente con una finalidad, scope y duración determinada."
      ],
      [
        "Titular de la cuenta",
        "Institución que mantiene la cuenta y ejecuta la transacción autorizada."
      ],
      [
        "Directorio",
        "Infraestructura, software y certificados de registro y descubrimiento de participantes."
      ],
      [
        "FAPI-BR",
        "Perfil de seguridad brasileño para API financieras basadas en el ecosistema FAPI."
      ],
      [
        "Iniciador de pago",
        "Participante que inicia el viaje sin tener los fondos en su poder."
      ],
      [
        "ID de interacción",
        "Identificador de correlación utilizado en interacciones API."
      ],
      [
        "Open Banking",
        "Apertura regulada de datos y servicios bancarios."
      ],
      [
        "Open Finance",
        "Ampliar el intercambio para un ecosistema financiero más completo."
      ],
      [
        "Receptor de datos",
        "Participante que recibe los datos autorizados por el cliente."
      ],
      [
        "Transmisor de datos",
        "Participante que proporciona datos que mantiene."
      ],
      [
        "mTLS",
        "TLS mutuo, con autenticación de certificado en ambos lados."
      ],
      [
        "Sender-constrained token",
        "Token cuyo uso depende de la prueba de la clave asociada."
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
      "Banco Central de Brasil. Open Finance: descripción general, seguridad, clientes y participantes.",
      "Resolución Conjunta No. 1, de 4 de mayo de 2020, y modificaciones posteriores.",
      "Banco Central de Brasil. Manual de API de Open Finance - versión actual.",
      "Banco Central de Brasil. Manual de seguridad de Open Finance - versión actual.",
      "Banco Central de Brasil. Manual de experiencia del cliente - versión actual.",
      "Banco Central de Brasil. Manual de Monitoreo de Finanzas Abierto - versión actual.",
      "Open Finance Brasil. Área de Desarrolladores y Catálogo API.",
      "Open Finance Brasil. Perfil de seguridad API de nivel financiero: FAPI-BR.",
      "IETF y Fundación OpenID. OAuth 2.0, OpenID Connect, PKCE, PAR, JAR, JARM y FAPI.",
      "Ley N° 13.709/2018 - Ley General de Protección de Datos Personales."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de actualización Este capítulo presenta principios y arquitectura basados en fuentes oficiales consultadas en julio de 2026. Antes de implementar, confirme siempre la versión actual de los estándares, manuales, API, perfiles de seguridad y períodos de coexistencia publicados por el Banco Central y la Estructura de Gobernanza de Open Finance."
  }
];
