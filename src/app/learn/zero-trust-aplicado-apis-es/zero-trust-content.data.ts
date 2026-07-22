import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const ZERO_TRUST_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Zero Trust para las API: verifique y decida explícitamente según cada solicitud"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/overview.svg",
    "alt": "Solicitud API que cruza identidad, riesgo, política y verificación de cumplimiento",
    "caption": "Figura de apertura: el acceso a una API es una decisión dinámica basada en el tema, el recurso, el contexto y la política actual."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Ninguna ubicación otorga confianza implícita; cada acceso debe ser autenticado, autorizado, limitado y evaluado continuamente."
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
    "text": "La arquitectura de seguridad tradicional se construyó alrededor de los límites de la red. Los usuarios, servidores y aplicaciones ubicados dentro de una red corporativa recibieron, explícita o implícitamente, un mayor nivel de confianza. Este modelo perdió efectividad cuando las API comenzaron a conectar nubes, socios, dispositivos móviles, proveedores, aplicaciones SaaS, centros de datos y cargas de trabajo efímeras. El origen de una conexión sigue siendo relevante como señal, pero ya no es suficiente para decidir si se debe autorizar una operación."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust es un conjunto de principios y una estrategia arquitectónica basada en la eliminación de la confianza implícita. Los recursos se protegen individualmente o en pequeños grupos; se identifican sujetos y dispositivos; las decisiones de acceso utilizan políticas e información actuales; las comunicaciones están protegidas; y la telemetría se utiliza para mejorar continuamente la postura. El objetivo no es desconfiar de las personas de forma genérica, sino evitar que la ubicación, la propiedad o la autenticación pasada produzcan una autorización amplia y permanente."
  },
  {
    "kind": "paragraph",
    "text": "Las API son un punto natural para aplicar Zero Trust porque ya materializan operaciones, identidades, datos y políticas. Una API Gateway puede actuar como un Policy Enforcement Point en el borde, mientras que las mallas de servicios aplican controles entre cargas de trabajo. Los proveedores de identidad emiten credenciales y tokens; los mecanismos posturales proporcionan contexto; los impulsores de políticas toman decisiones; y la observabilidad registra lo que sucedió. Sin embargo, comprar una API Gateway, habilitar mTLS o requerir MFA no crea por sí solo una arquitectura Zero Trust."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta los fundamentos de identidad, OAuth, mTLS, API Gateways, políticas, malla de servicios, Kubernetes y observabilidad estudiados anteriormente. El enfoque es técnico y operativo: cómo modelar sujetos y recursos, cómo evaluar cada solicitud, cómo limitar privilegios, cómo reducir el movimiento lateral, cómo manejar fallas en los componentes de decisión y cómo evolucionar la implementación sin interrumpir las integraciones críticas."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada flujo, identifique: sujeto, recurso, acción, contexto, fuente de identidad, motor de decisión, punto de cumplimiento y evidencia registrada. Esta descomposición transforma el término Zero Trust en arquitectura verificable."
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
      "Explique Zero Trust sin reducirlo a producto, VPN, mTLS o autenticación multifactor.",
      "Relacionar los principios de NIST SP 800-207 con el diseño de API corporativas.",
      "Distinga motor de políticas, administrador de políticas, Policy Enforcement Point, PDP, PIP y PAP.",
      "Modele identidades humanas, aplicaciones, cargas de trabajo, dispositivos y sesiones.",
      "Aplique autorización contextual y least privilege a las operaciones y datos de API.",
      "Comprenda los tokens al portador, los tokens vinculados, mTLS y DPoP en el contexto de la reducción de repeticiones.",
      "Diseñar controles Zero Trust en API Gateways, mallas de servicios y Kubernetes.",
      "Combine microsegmentación, salida controlada, protección de datos y observabilidad.",
      "Defina estrategias de disponibilidad, cache, apertura y cierre ante fallos para decisiones políticas.",
      "Planifique un viaje de madurez con métricas, pruebas, gobernanza y respuesta adaptativa."
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
      "34.1 Qué es y qué no es Zero Trust",
      "34.2 Principios y componentes lógicos",
      "34.3 Recursos, sujetos y superficies protegidos",
      "34.4 Decisión por solicitud y confianza dinámica",
      "34.5 Identidad humana, aplicación, carga de trabajo y dispositivo",
      "34.6 Tokens, mTLS y proof-of-possession",
      "34.7 Autorización granular y arquitectura de políticas",
      "34.8 API Gateways como puntos de cumplimiento",
      "34.9 Malla de servicios, Kubernetes y tráfico este-oeste",
      "34.10 Microsegmentación, salida y protección de datos",
      "34.11 Telemetría, riesgo y respuesta adaptativa",
      "34.12 Disponibilidad, gobernanza, madurez y retroubleshooting",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.1 Qué es y qué no es Zero Trust",
    "id": "34-1-que-es-y-que-no-es-zero-trust"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust es un modelo de seguridad, un conjunto de principios de diseño y una estrategia de gestión coordinada. Su premisa es que las amenazas pueden existir dentro y fuera de los límites tradicionales y que no se debe otorgar confianza implícita a ningún elemento únicamente por su ubicación, propiedad o relación organizacional. La protección pasa de amplios segmentos de red a usuarios, dispositivos, cargas de trabajo, aplicaciones, datos y recursos específicos."
  },
  {
    "kind": "paragraph",
    "text": "El término no significa bloquear todo, volver a autenticar manualmente al usuario con cada clic o eliminar por completo las redes privadas. Significa que cada acceso debe estar respaldado por una identidad, una política y un contexto suficientes para el riesgo de esa acción. Una solicitud para leer datos públicos y una transacción financiera irreversible no requieren necesariamente la misma fuerza de autenticación, el mismo conjunto de señales o el mismo tiempo de validez de autorización."
  },
  {
    "kind": "paragraph",
    "text": "Tampoco existe un producto único llamado Zero Trust. En la arquitectura pueden participar proveedores de identidad, API Gateways, mallas de servicios, EDR, motores de políticas, catálogos de datos, SIEM y plataformas de observabilidad. El valor surge de la integración coherente entre estos componentes, la calidad de las políticas, la cobertura de los recursos y la capacidad de medir y reaccionar ante las desviaciones."
  },
  {
    "kind": "paragraph",
    "text": "Una red interna aún puede reducir la exposición y un firewall sigue siendo útil. El error es transformar la presencia en esta red en prueba suficiente de identidad y autorización. De manera similar, mTLS autentica los extremos de un canal, pero no define por sí mismo si el servicio A puede realizar la operación X en el recurso Y on-behalf-ofl usuario Z."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Zero Trust debe entenderse como una arquitectura y un proceso, no como una marca de producto.",
    "headers": [
      "Afirmación",
      "Evaluación",
      "Explicación"
    ],
    "rows": [
      [
        "Zero Trust es la ausencia total de confianza.",
        "Incorrecto.",
        "La confianza ya no es implícita y pasa a ser explícitamente evaluada y limitada."
      ],
      [
        "VPN implementa Zero Trust.",
        "Incompleto.",
        "VPN crea conectividad; no garantiza autorización granular ni evaluación continua."
      ],
      [
        "mTLS es suficiente.",
        "Incorrecto.",
        "Autentica a sus pares, pero necesita políticas, identidad empresarial y controles de datos."
      ],
      [
        "Cada solicitud debe ser evaluada.",
        "Correcto como principio.",
        "La evaluación puede utilizar decisiones locales, cache seguro y señales actuales según el riesgo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.2 Principios y componentes lógicos",
    "id": "34-2-principios-y-componentes-logicos"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-207 describe principios que se pueden aplicar directamente a las API: los recursos y servicios se tratan como activos; toda comunicación está protegida independientemente de su ubicación; el acceso se otorga por sesión y con el mínimo privilegio; las decisiones consideran la identidad, el estado de los activos, el comportamiento y el contexto; y la organización recopila información para mejorar continuamente la postura."
  },
  {
    "kind": "paragraph",
    "text": "En la arquitectura lógica del NIST, el motor de políticas toma la decisión de otorgar, denegar o revocar el acceso. El administrador de políticas ejecuta esta decisión, por ejemplo configurando o finalizando una sesión. El Policy Enforcement Point habilita, monitorea y finaliza la conexión entre el sujeto y el recurso. En una plataforma API, la API Gateway, un proxy de malla, un sidecar o el propio backend pueden desempeñar el papel de cumplimiento."
  },
  {
    "kind": "paragraph",
    "text": "La terminología de autorización utilizada en las arquitecturas de software suele complementar este modelo con PDP, PEP, PIP y PAP. El Policy Decision Point evalúa la política; el Punto de Información sobre Políticas proporciona atributos; el Punto de Administración de Políticas administra las políticas; y el Policy Enforcement Point hace cumplir la decisión. Los nombres varían según el producto, pero las responsabilidades deben permanecer claras para evitar puntos ciegos y decisiones contradictorias."
  },
  {
    "kind": "paragraph",
    "text": "Una decisión puede ser binaria, pero las arquitecturas avanzadas también generan obligaciones: exigir un paso adelante, enmascarar campos, reducir el límite transaccional, activar el registro reforzado, imponer un límite de tasa específico o reenviar la operación para su aprobación. Estas obligaciones deben estar respaldadas por medidas de cumplimiento y auditadas como parte del resultado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-01.svg",
    "alt": "Policy Decision Point separado del Policy Enforcement Point y impulsado por señales",
    "caption": "Figura 1: La toma de decisiones y su aplicación son funciones distintas, alimentadas por múltiples fuentes de señales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.3 Recursos, sujetos y superficies protegidos",
    "id": "34-3-recursos-sujetos-y-superficies-protegidos"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust comienza identificando los recursos que realmente necesitan protección. En las API, el recurso no es solo el nombre de host o el endpoint. Puede ser una operación, un registro, un campo confidencial, un conjunto de datos, una cola, un secreto, una clave de firma o una función administrativa. Cuanto más precisa sea la clasificación, más granular puede ser la política."
  },
  {
    "kind": "paragraph",
    "text": "El tema también necesita ser modelado correctamente. La misma solicitud puede llevar la identidad del usuario final, la aplicación cliente y la carga de trabajo intermedia. En los flujos delegados, el backend debe distinguir quién actúa y on-behalf-of quién. Perder esta distinción produce tokens genéricos, registros incompletos y privilegios excesivos."
  },
  {
    "kind": "paragraph",
    "text": "La superficie protegida incluye interfaces públicas, integraciones B2B, API internas, endpoints administrativos, canales de mensajería y dependencias externas. El inventario debe enumerar el propietario, los datos procesados, el método de autenticación, la exposición, los consumidores, la criticidad y las políticas. Es difícil incorporar API desconocidas, antiguas o de prueba a una estrategia de Zero Trust porque no tienen un contexto de riesgo ni un ciclo de vida gobernado."
  },
  {
    "kind": "paragraph",
    "text": "La clasificación de los datos influye en la decisión. Un consumidor autenticado puede recibir campos básicos pero no datos financieros completos. Es posible que una carga de trabajo autorizada para leer un registro no tenga permiso para exportar miles de registros. El principio de privilegio mínimo debe cubrir el volumen, el propósito, el tiempo, el contexto y las propiedades del objeto."
  },
  {
    "kind": "subhead",
    "text": "Diferentes identidades participan en una misma convocatoria"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-02.svg",
    "alt": "Identidad efectiva compuesta por usuario, aplicación, carga de trabajo y dispositivo.",
    "caption": "Figura 2: La identidad efectiva de una llamada se compone de varias capas, no solo del usuario."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.4 Decisión por solicitud y confianza dinámica",
    "id": "34-4-decision-por-solicitud-y-confianza-dinamica"
  },
  {
    "kind": "paragraph",
    "text": "En una API, la unidad de decisión práctica suele ser la solicitud o una sesión corta asociada con un conjunto limitado de operaciones. La API Gateway identifica al sujeto, valida la credencial, extrae claims, consulta atributos cuando es necesario y evalúa la política aplicable al método, ruta, recurso y contexto. La autorización no debe inferirse simplemente porque se aceptó una conexión anterior."
  },
  {
    "kind": "paragraph",
    "text": "La confianza dinámica significa que el resultado puede cambiar cuando cambian las señales. Un usuario autenticado con MFA puede perder el acceso si el dispositivo se ve comprometido, la ubicación se vuelve incompatible, se revoca el token o aumenta el riesgo de la sesión. En aplicaciones críticas, las acciones sensibles pueden requerir una nueva autenticación, pruebas adicionales o confirmación fuera de banda."
  },
  {
    "kind": "paragraph",
    "text": "La evaluación continua no implica que cada llamada dependa de decenas de servicios remotos. Las políticas se pueden compilar y distribuir a las PDP locales; los atributos pueden tener TTL cortos; las decisiones de bajo riesgo se pueden almacenar en caché; y los eventos de revocación pueden invalidar el estado. El desafío es equilibrar la puntualidad, la disponibilidad, la latencia y la seguridad."
  },
  {
    "kind": "paragraph",
    "text": "El diseño debe especificar el comportamiento cuando las señales no están disponibles. Una API de consulta pública puede funcionar de forma degradada, mientras que una transferencia de alto valor debe denegar el acceso si no se puede consultar el PDP, el servicio antifraude o la confirmación de postura. La apertura y el cierre ante fallos son decisiones por clase de operación, no opciones globales."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-03.svg",
    "alt": "Secuencia de identificación, contexto, decisión y ejecución.",
    "caption": "Figura 3: La autorización es una secuencia de identificación, evaluación contextual, decisión y ejecución."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.5 Identidad humana, aplicación, carga de trabajo y dispositivo",
    "id": "34-5-identidad-humana-aplicacion-carga-de-trabajo-y-dispositivo"
  },
  {
    "kind": "paragraph",
    "text": "La identidad humana normalmente la establece un proveedor de identidad con autenticación multifactor y políticas de riesgo. El token resultante debe tener un issuer, un tema, una audience, un scope, una hora y un nivel de autenticación adecuados. Los grupos corporativos son útiles, pero a menudo demasiado amplios para una autorización detallada; Los atributos de función, unidad, relación y contexto pueden complementar la decisión."
  },
  {
    "kind": "paragraph",
    "text": "La aplicación del cliente también es un tema. En OAuth 2.0, client_id identifica el software registrado y el tipo de cliente influye en los controles disponibles. Los clientes confidenciales se autentican en el token endpoint; Los clientes públicos dependen de PKCE y de la protección del medio ambiente. En las integraciones B2B, la identidad de la organización y el sistema asociado deben estar separadas de la identidad del usuario final."
  },
  {
    "kind": "paragraph",
    "text": "La identidad de la carga de trabajo evita credenciales estáticas compartidas entre servicios. Los certificados de corta duración, los ID de SPIFFE, las identidades administradas y los tokens diseñados para cuentas de servicio le permiten vincular la llamada a la instancia o servicio en ejecución. En Kubernetes, las ServiceAccounts y la federación de identidades con la nube reducen la necesidad de secretos permanentes en los Pods."
  },
  {
    "kind": "paragraph",
    "text": "El dispositivo proporciona señales adicionales: registro, integridad, control de versiones, cifrado, postura EDR y cumplimiento. Estas señales no deben confundirse con la identidad del usuario. A una persona válida en un dispositivo no administrado se le puede otorgar acceso limitado; una carga de trabajo válida en un nodo comprometido puede requerir cuarentena. Las políticas maduras combinan las dimensiones sin transformar ninguna de ellas en confianza absoluta."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Zero Trust combina identidades y señales sin asumir que un solo atributo sea suficiente.",
    "headers": [
      "Identidad",
      "Ejemplos de evidencia",
      "Uso en política"
    ],
    "rows": [
      [
        "Usuario",
        "sub, acr, amr, grupos, riesgo.",
        "Acciones permitidas, intensificación y segregación de funciones."
      ],
      [
        "Solicitud",
        "ID de cliente, certificado, declaración de software.",
        "Consumidor, canal, cuotas y scopes."
      ],
      [
        "Carga de trabajo",
        "ID de SPIFFE, identidad administrada, ServiceAccount.",
        "Llamadas entre servicios y acceso a backends."
      ],
      [
        "Dispositivo",
        "registro, postura, EDR, versión.",
        "Acceso adaptativo y reducción de privilegios."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.6 Tokens, mTLS y proof-of-possession",
    "id": "34-6-tokens-mtls-y-proof-of-possession"
  },
  {
    "kind": "paragraph",
    "text": "Los tokens al portador los utiliza quien los posee. Si se copian de registros, memoria, navegador o canal comprometidos, se pueden reutilizar hasta que caduquen o sean revocados. Por lo tanto, necesitan transporte protegido, almacenamiento seguro, audience restringida, scopes mínimos y una vida útil corta. Zero Trust no elimina los tokens al portador, pero reduce su scope y asume que las filtraciones son posibles."
  },
  {
    "kind": "paragraph",
    "text": "Los sender-constrained tokens vinculan el uso del token a una clave criptográfica. En OAuth, mTLS puede vincular el token al certificado del cliente, mientras que DPoP utiliza una prueba firmada a nivel de aplicación y vincula el token a una clave pública. El resource server valida no sólo el token, sino también la demostración de posesión de la clave correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "mTLS es especialmente adecuado para integraciones de servidor a servidor, cargas de trabajo y entornos con PKI operativa. DPoP puede ser utilizado por clientes que no pueden presentar certificados TLS de manera conveniente. Ambos reducen el valor de un token robado, pero no evitan el uso indebido por parte de un cliente legítimo comprometido ni reemplazan la autorización y la protección de replay de la operación en sí."
  },
  {
    "kind": "paragraph",
    "text": "En APIs de alto riesgo se debe combinar la proof-of-possession con idempotencia, firma de mensajes cuando sea necesario, audience específica y detección de anomalías. Los tokens amplios, la larga duración y la propagación indiscriminada entre microservicios contradicen el privilegio mínimo, incluso si están vinculados criptográficamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-04.svg",
    "alt": "Token vinculado a una clave criptográfica como proof-of-possession",
    "caption": "Figura 4: Vincular el token a una clave agrega una condición criptográfica para su uso."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: La proof-of-possession mejora la resistencia a la replay de tokens, pero requiere una validación y operación correctas.",
    "headers": [
      "Mecanismo",
      "Evidencia presentada",
      "Uso típico",
      "Precaución"
    ],
    "rows": [
      [
        "Bearer",
        "Sólo la token.",
        "API generales y flujos OAuth comunes.",
        "Estricta protección contra fugas."
      ],
      [
        "mTLS de OAuth",
        "Certificado de cliente en TLS.",
        "B2B y cargas de trabajo con PKI.",
        "Ciclo de vida del certificado y terminación TLS."
      ],
      [
        "DPoP",
        "Prueba JWT firmada por solicitud.",
        "Clientes de aplicaciones y API HTTP.",
        "Validación de htm, htu, iat, jti y nonce cuando se utilizan."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.7 Autorización granular y arquitectura de políticas",
    "id": "34-7-autorizacion-granular-y-arquitectura-de-politicas"
  },
  {
    "kind": "paragraph",
    "text": "RBAC es útil para responsabilidades estables, pero rara vez es suficiente por sí solo para API complejas. ABAC permite combinar atributos del sujeto, recurso, acción y entorno. ReBAC representa relaciones, como director, representante o miembro de una organización. Las políticas pueden combinar estos modelos siempre que sigan siendo comprensibles, comprobables y auditables."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura necesita definir dónde ocurre la decisión. Una API Gateway puede consultar un PDP central, utilizar políticas locales como código o combinar decisiones. El backend sigue siendo responsable de las reglas que dependen del estado del negocio y de evitar el acceso directo que pasa por alto la API Gateway. En una malla de servicios, la autorización entre cargas de trabajo puede ocurrir en el proxy, mientras que la autorización de objetos permanece en la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Los PIP proporcionan atributos de directorio, CMDB, inventario de dispositivos, clasificadores de datos, riesgo y contexto. El PAP gestiona las políticas y su ciclo de vida. Para la producción, las políticas necesitan control de versiones, revisión, pruebas unitarias, simulaciones con tráfico histórico, aprobación, implementación y reversión gradual."
  },
  {
    "kind": "paragraph",
    "text": "El resultado de la decisión debe ser explicable. No es necesario que los registros expongan la política completa, pero deben registrar el identificador de la decisión, la versión de la política, el tema, el recurso, la acción, el resultado y el motivo principal. Esta evidencia es esencial para la auditoría, la retroubleshooting y la investigación de incidentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-05.svg",
    "alt": "Cadena gobernada de atributos, políticas, decisiones y cumplimiento.",
    "caption": "Figura 5: La autorización depende de una aplicación no eludida y de una cadena gobernada de políticas y atributos."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de política como código"
  },
  {
    "kind": "paragraph",
    "text": "paquete api.transferencias predeterminado permitir := false permitir si { input.subject.assurance >= 2 input.subject.tenant == input.resource.tenant \"transfer:write\" en input.token.scopes input.transaction.amount <= input.subject.daily_limit input.device.compliant == true }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.8 API Gateways como puntos de cumplimiento",
    "id": "34-8-api-gateways-como-puntos-de-cumplimiento"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es un PEP natural para el tráfico norte-sur. Puede terminar TLS, validar tokens, verificar certificados, consultar PDP, aplicar límites de velocidad, eliminar credenciales externas, propagar identidades controladas y registrar decisiones. Su posición central facilita la coherencia, pero no permite convertir la pasarela en el único elemento de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway debe validar el issuer, la audience, la firma, la hora, el token type y los claims obligatorios. Las políticas genéricas basadas únicamente en la presencia de tokens generan una falsa sensación de protección. La ruta debe estar asociada con una política de autorización explícita y los endpoints administrativos deben tener controles aún más restrictivos."
  },
  {
    "kind": "paragraph",
    "text": "La identidad propagada al backend debe protegerse contra la suplantación de identidad. Los headers internos deben eliminarse de la solicitud externa y la API Gateway debe volver a crearlos; el canal hacia el backend debe estar autenticado; y el servicio debe aceptar estos headers solo de fuentes autorizadas. Como alternativa, la API Gateway puede intercambiar el token por un token de audience específico o utilizar credenciales de carga de trabajo."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad requiere evaluar las dependencias de las API Gateways: introspección, JWKS, PDP, KPS, directorios y servicios de riesgo. Los cachés deben respetar la caducidad, la revocación y el control de versiones. Las métricas deben separar los errores de autenticación, las denegaciones de políticas, la indisponibilidad de PDP, los errores de backend y los bloqueos de umbral."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: La API Gateway debe producir diagnósticos por paso, sin devolver detalles confidenciales al consumidor.",
    "headers": [
      "Paso en la puerta de entrada",
      "Control de Zero Trust",
      "Falta que debe diferenciarse"
    ],
    "rows": [
      [
        "TLS/mTLS",
        "Canal protegido e identidad de pares.",
        "Certificado, SNI, CA o revocación no válidos."
      ],
      [
        "token",
        "Emisor, audience, firma, hora y cnf.",
        "Token no válido, caducado o desvinculado."
      ],
      [
        "politica",
        "Sujeto + acción + recurso + contexto.",
        "Denegación legítima o PDP no disponible."
      ],
      [
        "Propagación",
        "Cabeceras o token interno controlado.",
        "Spoofing, audience equivocada o claims excesivas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.9 Malla de servicios, Kubernetes y tráfico este-oeste",
    "id": "34-9-malla-de-servicios-kubernetes-y-trafico-este-oeste"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad perimetral no impide el movimiento lateral si los servicios internos confían en cualquier fuente de la red. Una malla de servicios puede proporcionar mTLS automático, identidad de carga de trabajo y autorización L4/L7 entre servicios. Cada llamada se asocia con la identidad de la carga de trabajo, independientemente de la IP efímera o del nodo en el que se ejecuta el Pod."
  },
  {
    "kind": "paragraph",
    "text": "En Kubernetes, la identidad puede provenir de ServiceAccounts y estar federada con proveedores de nube. Los pods no deben compartir credenciales estáticas de larga duración. RBAC controla las acciones en la API del clúster, mientras que las políticas de malla y NetworkPolicies controlan las comunicaciones de la carga de trabajo. Estos mecanismos actúan en diferentes planos y deben diseñarse juntos."
  },
  {
    "kind": "paragraph",
    "text": "La política de malla puede restringir qué cargas de trabajo llaman a qué servicio, puerto, método o ruta. Para la autorización on-behalf-ofl usuario, el proxy puede evaluar las claims propagadas, pero se deben garantizar el origen y la integridad. El backend sigue siendo necesario para decisiones basadas en objetos, saldos, relaciones o estado comercial."
  },
  {
    "kind": "paragraph",
    "text": "La adopción gradual debería evitar la creencia de que el modo permisivo es un estado final. Primero, se inventariaría el tráfico; luego, se habilitan mTLS y la identidad; entonces las políticas explícitas reemplazan los permisos amplios. La telemetría ayuda a detectar dependencias ocultas antes del bloqueo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-06.svg",
    "alt": "Malla de servicios que aplica identidades y políticas en todas las cargas de trabajo",
    "caption": "Figura 6: La malla reduce la confianza implícita entre cargas de trabajo y permite la aplicación cerca del servicio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.10 Microsegmentación, salida y protección de datos",
    "id": "34-10-microsegmentacion-salida-y-proteccion-de-datos"
  },
  {
    "kind": "paragraph",
    "text": "La microsegmentación limita las vías de comunicación para reducir la superficie de ataque y el radio de impacto. En las API, la segmentación puede utilizar la identidad de la carga de trabajo, el espacio de nombres, el dominio, la sensibilidad y el propósito, en lugar de depender únicamente de las direcciones IP. Las políticas de red, las políticas de malla, los firewalls y las API Gateways internas pueden cooperar, siempre que se definan la propiedad y la precedencia."
  },
  {
    "kind": "paragraph",
    "text": "La salida controlada es una parte importante del modelo. Una carga de trabajo comprometida no debe poder acceder a ningún destino de Internet, metadata de la nube o servicio interno. Las API Gateways de salida, las listas permitidas de nombres e identidades, el DNS controlado, los servidores proxy y la supervisión ayudan a limitar la exfiltración y la SSRF. Las reglas deben considerar resolución, redirecciones, IP privadas, protocolos y cambios de destino."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust se basa en recursos y datos. El cifrado en tránsito y en reposo es necesario, pero las políticas también deben controlar la minimización, el enmascaramiento, la finalización, la retención y la exportación. Una API que devuelve campos innecesarios o permite una paginación ilimitada puede violar el privilegio mínimo incluso con una autenticación sólida."
  },
  {
    "kind": "paragraph",
    "text": "Los secretos, claves y certificados deben tener scope, rotación y seguimiento de uso. El acceso puede estar mediado por servidores proxy con reconocimiento de identidad, almacenes secretos e identidades administradas. Las credenciales compartidas entre servicios evitan la asignación y revocación selectivas, lo que aumenta el radio de impacto de un compromiso."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La microsegmentación es solo una capa de una estrategia orientada a los recursos.",
    "headers": [
      "capa",
      "Objetivo",
      "Ejemplo de control"
    ],
    "rows": [
      [
        "Red",
        "Reducir posibles caminos.",
        "NetworkPolicy, firewall y puerta de salida."
      ],
      [
        "Identidad",
        "Vincular llamada a asunto verificable.",
        "mTLS, identidad de carga de trabajo y token."
      ],
      [
        "Solicitud",
        "Restringir acción y objeto.",
        "ABAC, ReBAC y autorización de recursos."
      ],
      [
        "Datos",
        "Minimizar la exposición y el impacto.",
        "Enmascaramiento, clasificación y límites de exportación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.11 Telemetría, riesgo y respuesta adaptativa",
    "id": "34-11-telemetria-riesgo-y-respuesta-adaptativa"
  },
  {
    "kind": "paragraph",
    "text": "Las decisiones adaptativas dependen de una telemetría confiable. IdP, API Gateway, malla, endpoint, WAF, SIEM y aplicación producen señales que pueden indicar anomalías: cambios de ubicación, volumen inusual, enumeración de objetos, fallas repetidas, postura degradada del dispositivo, nuevo certificado o acceso no estándar. Estas señales deben normalizarse, correlacionarse y evaluarse con una latencia compatible con el caso de uso."
  },
  {
    "kind": "paragraph",
    "text": "La respuesta no tiene por qué ser simplemente bloquear. La arquitectura puede requerir MFA, reducir scopes, limitar tasas, deshabilitar la exportación, marcar la sesión para revisión o revocar credenciales. La elección debe considerar el impacto y la confiabilidad del detector. Los controles demasiado agresivos sin retroalimentación crean indisponibilidad y fomentan excepciones permanentes."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust Observability necesita registrar decisiones, no solo tráfico. Las métricas útiles incluyen la proporción de permiso/denegación por política, latencia de PDP, aciertos de caché, decisiones sin atributos, fallas de propagación, uso de credenciales obsoletas, cobertura mTLS, flujos no inventariados y tiempo de revocación. Los seguimientos ayudan a identificar qué PEP o backend tomó la decisión final."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario considerar la privacidad y seguridad de las señales mismas. Los registros de autorización pueden contener identificadores, grupos, riesgos y contexto. La recopilación debe minimizarse, protegerse mediante acceso y retención, y nunca incluir tokens completos, claves privadas o datos confidenciales innecesarios."
  },
  {
    "kind": "subhead",
    "text": "El escaneo continuo no es vigilancia indiscriminada"
  },
  {
    "kind": "paragraph",
    "text": "La recaudación debe ser proporcional, finalista y protegida. Zero Trust requiere señales suficientes para las decisiones y la investigación, pero no justifica el registro de credenciales, cargas útiles sensibles o atributos sin necesidad operativa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.12 Disponibilidad y fallas de los componentes de confianza",
    "id": "34-12-disponibilidad-y-fallas-de-los-componentes-de-confianza"
  },
  {
    "kind": "paragraph",
    "text": "Una arquitectura Zero Trust agrega componentes críticos al camino: IdP, JWKS, introspección, PDP, PIP, servicio de riesgo e infraestructura de certificados. Cada dependencia necesita SLO, redundancia, tiempo de espera, caché, respaldo y runbook. Una política segura que haga que todas las API no estén disponibles debido a una simple falla está operativamente incompleta."
  },
  {
    "kind": "paragraph",
    "text": "El cache de claves públicas suele ser seguro cuando se respeta la rotación y los identificadores. El cache de decisiones es más delicado porque los atributos y el riesgo pueden cambiar. La caché debe incluir asunto, recurso, acción, contexto relevante, versión de política y TTL. Los eventos de revocación pueden invalidar las decisiones antes de su vencimiento."
  },
  {
    "kind": "paragraph",
    "text": "La apertura fallida puede ser aceptable para operaciones públicas o de bajo impacto, siempre que el modo degradado sea explícito y monitoreado. El cierre de fallas es apropiado para operaciones financieras, administrativas o de datos confidenciales. Entre los extremos, la organización puede ofrecer lecturas limitadas, congelar cambios o requerir un canal alternativo."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario probar la recuperación. La rotación de certificados, la indisponibilidad del IdP, la reversión de políticas, la pérdida de caché y el cambio de issuer son escenarios de continuidad. Los ejercicios controlados muestran si el equipo puede distinguir una negación legítima de una falla de infraestructura."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La disponibilidad y la seguridad deben modelarse juntas.",
    "headers": [
      "dependencia",
      "Riesgo",
      "Estrategia"
    ],
    "rows": [
      [
        "JWKS/PKI",
        "Clave no disponible o rotación incorrecta.",
        "Cache, transferencia de claves y monitoreo."
      ],
      [
        "PDP",
        "Latencia o indisponibilidad.",
        "Instancias locales, política de tiempo de espera y degradación."
      ],
      [
        "PIP/riesgo",
        "Atributo faltante o desactualizado.",
        "TTL, calidad de señal y decisión conservadora."
      ],
      [
        "IdP",
        "Error al iniciar sesión o emitir.",
        "Redundancia, sesiones cortas existentes y plan de continuidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.13 Gobernanza y viaje de madurez",
    "id": "34-13-gobernanza-y-viaje-de-madurez"
  },
  {
    "kind": "paragraph",
    "text": "Adoptar Zero Trust es un viaje de transformación, no un proyecto único. Un punto de partida práctico es inventariar recursos, identidades, flujos y políticas; eliminar credenciales compartidas; centralizar la identidad; comunicaciones seguras; tomar decisiones explícitas; y ampliar la observabilidad. El orden exacto depende del riesgo y la capacidad de la organización."
  },
  {
    "kind": "paragraph",
    "text": "Los modelos de madurez ayudan a organizar el trabajo en pilares. CISA Zero Trust Maturity Model 2.0 funciona con identidad, dispositivos, redes, aplicaciones y cargas de trabajo, datos, visibilidad/análisis y automatización/orquestación. Para las API, estos pilares se traducen en identidad, postura, microsegmentación, políticas de API Gateway, protección de datos, telemetría y respuesta automática sólidas."
  },
  {
    "kind": "paragraph",
    "text": "Las excepciones necesitan titular, justificación, scope, plazo y compensación. Las políticas y atributos deben contar con catálogo, versionado y evidencia de prueba. Las métricas de madurez deben medir la cobertura y los resultados: porcentaje de API inventariadas, tokens de audience restringida, cargas de trabajo sin credenciales estáticas, tráfico mTLS, políticas explícitas, tiempo de revocación e incidentes de acceso inadecuado."
  },
  {
    "kind": "paragraph",
    "text": "La estrategia debe evitar el big bang. Un modo de observación identifica flujos; las políticas se aplican a grupos controlados; se analizan las negaciones; y la cobertura crece por dominio. Los resultados de seguridad deben combinarse con métricas de latencia, disponibilidad y experiencia del cliente."
  },
  {
    "kind": "subhead",
    "text": "Evolución de la madurez: de controles aislados a decisiones adaptativas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-07.svg",
    "alt": "Pilares coordinados de madurez de Zero Trust",
    "caption": "Figura 7 - La madurez crece a través de la coordinación entre pilares, no a través de la optimización aislada de un producto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.14 Retroubleshooting e investigación",
    "id": "34-14-retroubleshooting-e-investigacion"
  },
  {
    "kind": "paragraph",
    "text": "Se puede crear una denegación de Zero Trust en varias capas: certificado, token, postura, política, límite de tasa, malla o regla comercial. La retroubleshooting comienza identificando la PEP que respondió, el decision_id y la etapa de la falla. El consumidor debe recibir una respuesta segura; Los detalles permanecen en registros protegidos."
  },
  {
    "kind": "paragraph",
    "text": "En la autenticación, verifique la cadena del certificado, el issuer, la audience, la firma, la hora, el nonce y la vinculación. En autorización, compare asunto, acción, recurso, contexto, atributos proporcionados y versión de política. En malla, confirme la identidad de la carga de trabajo, el modo mTLS y la regla aplicada. En Kubernetes, valide ServiceAccount, etiquetas, espacio de nombres y NetworkPolicy."
  },
  {
    "kind": "paragraph",
    "text": "Relojes incorrectos, cachés antiguos, rotación incompleta, headers eliminados, audiences incorrectas y atributos faltantes producen incidentes intermitentes. Los seguimientos distribuidos deben preservar la correlación sin propagar tokens. Cuando participa un PDP externo, su latencia y resultado deben aparecer como lapso o evento."
  },
  {
    "kind": "paragraph",
    "text": "La investigación debe evitar desactivar controles amplios en un primer intento. Una derivación temporal debe ser mínima, aprobada, monitoreada y eliminada. De lo contrario, la organización convierte la retroubleshooting en la creación de deuda de seguridad."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/es/figure-08.svg",
    "alt": "Investigación siguiendo la identidad, el contexto, la política, la aplicación y los recursos.",
    "caption": "Figura 8: La investigación sigue la cadena de identidad, contexto, política, aplicación y recurso."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: la respuesta HTTP es solo el síntoma final; la evidencia necesita localizar la decisión.",
    "headers": [
      "Síntoma",
      "Hipótesis iniciales",
      "evidencia"
    ],
    "rows": [
      [
        "401 después de la rotación",
        "JWKS antiguos, aire acondicionado incorrecto o desviación del reloj.",
        "registros infantiles, cadenas, caché, fechas y IdP."
      ],
      [
        "403 solo en una ruta",
        "Política/scope/audience u autorización de objeto.",
        "ID de decisión, ID de política, claims y recursos."
      ],
      [
        "falla intermitente",
        "PDP regional, caché, señal de riesgo o propagación.",
        "Latencia por instancia y seguimiento completo."
      ],
      [
        "Servicio interno bloqueado",
        "Identidad de carga de trabajo o política de malla.",
        "ID SPIFFE, certificado, etiquetas y regla L7."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.15 Estudios de casos y laboratorios",
    "id": "34-15-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: integración B2B: un socio utiliza Client Credentials OAuth con mTLS. El access token tiene una audience específica y scopes mínimos; la API Gateway valida el certificado y el enlace del token; el backend recibe una identidad interna controlada. La rotación se produce con certificados superpuestos y la telemetría identifica a los consumidores que todavía se quedan con el material antiguo."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: microservicios en Kubernetes: las cargas de trabajo reciben identidades cortas y se comunican a través de una malla de servicios con mTLS. Las políticas permiten solo los flujos necesarios y las NetworkPolicies limitan las rutas de red. La identidad del usuario final se propaga de forma verificable sólo cuando sea necesario; Las decisiones sobre objetos permanecen en el servicio de dominio."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: transacción financiera adaptable: se autoriza una transferencia común con una sesión MFA válida, un dispositivo compatible y un límite diario. Cuando el riesgo aumenta, el PDP requiere un aumento y reduce el valor máximo. El resultado, las señales y la versión de la política se auditan sin registrar el token ni la carga útil completa."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Modelar tema, recurso, acción y contexto para tres API. 2) Implementar una política de denegación por defecto en un entorno de prueba. 3) Compare el token al portador y DPoP/mTLS. 4) Configurar la autorización de la carga de trabajo en la malla de servicios. 5) Simular la indisponibilidad de PDP y validar el modo degradado. 6) Cree un panel de cobertura, decisiones y latencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust elimina la confianza implícita basada únicamente en la red, la propiedad o la autenticación anterior. La protección se centra en recursos y decisiones explícitos. En las API, esto significa identificar sujetos, clasificar datos, validar credenciales, evaluar el contexto, aplicar autorización por acción y objeto y observar continuamente el resultado."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways, las mallas de servicios y los backends desempeñan funciones de cumplimiento complementarias. mTLS autentica a sus pares; los tokens vinculados reducen la replay; Políticas expresas RBAC, ABAC y ReBAC; la identidad de la carga de trabajo reemplaza los secretos estáticos; la microsegmentación reduce el movimiento lateral; y la telemetría apoya la respuesta adaptativa. Ningún control único implementa Zero Trust."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura debe estar disponible, gobernable y explicable. Las políticas, atributos y cachés tienen un ciclo de vida; las dependencias críticas requieren SLO y respaldo; las denegaciones deben ser investigables; y la adopción debe avanzar gradualmente según el riesgo y la propiedad. La madurez se mide por la cobertura y la reducción efectiva de privilegios y el radio de impacto."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo aplica los fundamentos de las API, la identidad, la seguridad y la gobernanza al ecosistema de Open Finance y Open Banking Brasil, en el que la confianza federada, el consentimiento, los certificados, los estándares de seguridad y la alta disponibilidad son requisitos centrales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de Zero Trust para API",
    "id": "lista-de-verificacion-de-zero-trust-para-api"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se inventarian y clasifican las API, las operaciones, los datos, los propietarios y los consumidores.",
      "Ninguna ubicación de red se utiliza como prueba suficiente de autorización.",
      "Usuario, cliente, carga de trabajo y dispositivo son identidades separadas y correlacionables.",
      "Los tokens tienen una audience, scope y vida útil mínimos; Las credenciales estáticas son excepciones controladas.",
      "Se aplica mTLS o DPoP cuando la reducción de la reproducción justifica el costo operativo.",
      "Las políticas evalúan el tema, la acción, el recurso y el contexto y tienen denegación por defecto cuando corresponde.",
      "Los PEP no se pueden eludir y los backends mantienen la autorización comercial y de objetos.",
      "Las cargas de trabajo utilizan identidades cortas; La malla de servicio y las NetworkPolicies reducen el movimiento lateral.",
      "La salida, los secretos, los datos y las exportaciones están controlados por un propósito y un privilegio mínimo.",
      "Las decisiones, el ID_política, la versión, la latencia y los motivos se pueden observar sin registrar secretos.",
      "Las fallas de IdP, PDP, PIP, JWKS y PKI tienen modo de degradación y runbook probados.",
      "El recorrido de madurez tiene métricas de cobertura, fecha límite, propietario y eliminación de excepciones."
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
      "Explique por qué una red privada no debería otorgar autorización automática a una API.",
      "Asigne el motor de políticas, el administrador de políticas y el PEP a una arquitectura de API Gateway y malla de servicios.",
      "Diferenciar identidad de usuario, aplicación, carga de trabajo y dispositivo en una sola llamada.",
      "Compare el token de portador, OAuth mTLS y DPoP desde el punto de vista de reproducción y operación.",
      "Diseñar una política ABAC de consulta y modificación de datos financieros.",
      "Defina el comportamiento de falla de apertura, falla de cierre y degradado para tres clases de operación.",
      "Proponer microsegmentación y salida controlada para una API en Kubernetes.",
      "Describir qué señales deben registrarse para explicar una decisión de acceso.",
      "Cree un plan de migración de credenciales estáticas a identidad de carga de trabajo.",
      "Defina indicadores de madurez Zero Trust para una plataforma API empresarial."
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
    "caption": "Tabla 8 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Verificación continua",
        "Uso recurrente de señales actuales para mantener, limitar o revocar el acceso."
      ],
      [
        "Denegación por defecto",
        "Postura en la que se deniega el acceso no permitido explícitamente."
      ],
      [
        "DPoP",
        "Mecanismo de proof-of-possession de OAuth a nivel de aplicación."
      ],
      [
        "cerrado por falla",
        "Comportamiento que niega el acceso cuando no se puede obtener la decisión segura."
      ],
      [
        "Apertura fallida",
        "Comportamiento que permite el acceso en caso de fallo, aplicable sólo a riesgos explícitamente aceptados."
      ],
      [
        "Microsegmentación",
        "Restricción granular de las vías de comunicación para reducir el movimiento lateral."
      ],
      [
        "papa",
        "Punto responsable de la administración y ciclo de vida de las políticas."
      ],
      [
        "PDP",
        "Componente que evalúa la política y produce una decisión de autorización."
      ],
      [
        "PEP",
        "Componente que aplica la decisión de acceso al tráfico o recurso."
      ],
      [
        "PIP",
        "Fuente de atributos y contexto utilizado por la decisión."
      ],
      [
        "Policy Administrator",
        "Componente que ejecuta la decisión del motor de políticas y establece o finaliza el acceso."
      ],
      [
        "Policy Engine",
        "Componente lógico que decide conceder, denegar o revocar el acceso."
      ],
      [
        "Sender-constrained token",
        "Token cuyo uso requiere acreditar la posesión de una clave vinculada."
      ],
      [
        "Autenticación mejorada",
        "Requisito de autenticación más estricto para acciones o alto riesgo."
      ],
      [
        "Identidad de carga de trabajo",
        "Identidad asignada al software, servicio o instancia de ejecución."
      ],
      [
        "Arquitectura de Zero Trust",
        "Arquitectura que elimina la confianza implícita y protege los recursos con decisiones explícitas."
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
      "NIST SP 800-207: Arquitectura de Zero Trust. 2020.",
      "NIST SP 800-207A: un modelo de arquitectura Zero Trust para control de acceso en aplicaciones nativas de la nube en entornos de múltiples ubicaciones. 2023.",
      "CISA - Modelo de Madurez Zero Trust, Versión 2.0. 2023.",
      "NIST SP 800-204B: control de acceso basado en atributos para aplicaciones basadas en microservicios que utilizan una malla de servicios. 2021.",
      "NIST SP 800-204C: Implementación de DevSecOps para una aplicación basada en microservicios con una malla de servicios. 2022.",
      "IETF RFC 6750: uso de tokens de portador OAuth 2.0.",
      "IETF RFC 8705: access tokens vinculados a certificados y autenticación de cliente Mutual-TLS de OAuth 2.0.",
      "IETF RFC 9449: OAuth 2.0 que demuestra proof-of-possession en la capa de aplicación (DPoP).",
      "OpenID Foundation: OpenID Connect Core y especificaciones relacionadas.",
      "Proyecto SPIFFE - Especificaciones y documentación SPIFFE y SPIRE.",
      "Documentación de Kubernetes: cuentas de servicio, RBAC, políticas de red y seguridad de pod.",
      "Documentación de Istio: seguridad, autenticación de pares y política de autorización."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust es una estrategia evolutiva y depende de la versión del producto, el modelo de amenaza y el contexto regulatorio. Antes de aplicar los ejemplos, valide las especificaciones oficiales, la API Gateway, la estructura, el proveedor de identidad y el soporte de la plataforma implementada."
  }
];
