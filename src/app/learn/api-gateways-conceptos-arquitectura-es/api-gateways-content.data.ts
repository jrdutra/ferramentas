import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const API_GATEWAYS_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Del consumidor al backend: control centralizado en toda la ruta API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/overview.svg",
    "alt": "API Gateway mediando consumidores, borde, políticas y servicios backend",
    "caption": "Figura de apertura: API Gateway ocupa una posición de mediación entre los consumidores y los backends."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway divide una llamada en dos relaciones independientes: consumidor-API Gateway y API Gateway-backend."
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
    "text": "Los capítulos anteriores construyeron las bases necesarias para comprender cómo funciona realmente una API Gateway. El direccionamiento, DNS, TCP, HTTP, TLS, certificados, autenticación, autorización, OAuth, OpenID Connect, JWT, SAML y federación no son temas periféricos de la API Gateway: son mecanismos que ésta termina, valida, transforma, registra o reenvía con frecuencia. Este capítulo reúne este conocimiento en una arquitectura coherente."
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway a menudo se presenta como una simple caja que se encuentra frente a los servicios. Esta representación es útil en diagramas de alto nivel, pero insuficiente para el funcionamiento. En la práctica, la API Gateway mantiene oyentes, finaliza conexiones, selecciona API, ejecuta políticas, consulta repositorios, aplica límites, crea conexiones con servidores, transforma mensajes y produce telemetría. Cada llamada pasa por diferentes estados y puede ocurrir una falla antes de que se ejecute cualquier código comercial."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura también incluye elementos que no participan directamente en cada solicitud. Los planos de control distribuyen las configuraciones, los planos de gestión organizan el ciclo de vida, los portales sirven a los desarrolladores, los bancos almacenan metadata y los componentes analíticos agregan eventos. Un diseño robusto necesita distinguir estos planes y decidir cómo se comporta el runtime cuando algún componente de gestión no está disponible."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo de este capítulo es proporcionar un modelo mental completo e independiente del producto. Los conceptos estarán relacionados con arquitecturas que se encuentran en API Gateways comerciales, servicios gestionados, servidores proxy programables y plataformas híbridas. Los próximos capítulos abordarán las políticas, Axway API Gateway y Azure API Management; Por lo tanto, este material enfatiza responsabilidades, límites y decisiones arquitectónicas que siguen siendo válidas en diferentes implementaciones."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Siga cada sección dibujando dos flechas: del consumidor a la API Gateway y de la API Gateway al backend. Para cada flecha, registre DNS, IP, puerto, TLS, protocolo, tiempo de espera, identidad y telemetría. Esta separación evita atribuir al backend una falla que ocurrió en el oyente o atribuir al consumidor una falla creada en el segmento de salida."
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
      "Defina API Gateway y diferencielo de proxy, balanceador de carga, WAF, controlador de ingreso y malla de servicios.",
      "Explique la separación entre el data plane, el control plane, el plano de gestión y el plano de desarrollador.",
      "Describe el ciclo completo de una solicitud desde el oyente hasta el backend y la respuesta.",
      "Comprenda el enrutamiento, las políticas, la transformación, la autenticación, las cuotas, el cache y la observabilidad.",
      "Compare topologías centralizadas, de dominio, en capas, regionales, híbridas y administradas.",
      "Diseñe alta disponibilidad, tolerancia a fallas, consistencia de configuración y continuidad operativa.",
      "Relacione TLS, mTLS, certificados, grupos de conexiones, comprobaciones de estado, reintentos y disyuntores con la API Gateway.",
      "Analice la multitenant, el aislamiento, la gobernanza y el ciclo de vida de las API.",
      "Escale la capacidad en función de las conexiones, el rendimiento, la latencia, la CPU, la memoria y las dependencias externas.",
      "Diagnostique fallas por etapa y cree evidencia correlacionada entre el consumidor, la API Gateway y el backend."
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
      "21.1 ¿Qué es una API Gateway?",
      "21.2 Qué no es una API Gateway",
      "21.3 Datos, control, gestión y planes de desarrollo",
      "21.4 Anatomía de una solicitud en la API Gateway",
      "21.5 Oyentes, hosts virtuales y selección de API",
      "21.6 Motor de políticas y cadena de procesamiento",
      "21.7 Enrutamiento, descubrimiento y conectividad con backends",
      "21.8 Seguridad en la entrada y salida",
      "21.9 Control de tráfico, protección y cache",
      "21.10 Topologías y modelos de implementación",
      "21.11 Alta disponibilidad y coherencia",
      "21.12 Estado, sesiones y dependencias externas",
      "21.13 Observabilidad, auditoría y correlación",
      "21.14 Gobernanza, portal y ciclo de vida",
      "21.15 Planificación del desempeño y la capacidad",
      "21.16 Fallos, antipatrones y retroubleshooting",
      "21.17 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.1 ¿Qué es una API Gateway?",
    "id": "21-1-que-es-una-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway es un componente de mediación que recibe llamadas de consumidores en un conjunto controlado de endpoints y las enruta a servicios backend de acuerdo con reglas de seguridad, tráfico, transformación y enrutamiento. Sirve como punto de aplicación de políticas en la ruta del mensaje. La centralización de controles reduce la duplicación entre servicios, mejora la coherencia y permite proteger los backends de la exposición directa."
  },
  {
    "kind": "paragraph",
    "text": "La palabra API Gateway indica cambio de contexto. El componente no sólo reenvía bytes; puede finalizar una conexión TLS, interpretar HTTP, validar credenciales, convertir una identidad externa en contexto interno, seleccionar una versión de API, transformar headers, llamar a un servicio de autorización y crear una nueva conexión con el backend. Por lo tanto, la API Gateway del consumidor y el backend son relaciones independientes."
  },
  {
    "kind": "paragraph",
    "text": "En términos de arquitectura, la API Gateway actúa principalmente en el data plane. Con cada solicitud, toma decisiones basadas en la configuración publicada y los datos de runtime. Estas decisiones deben ser rápidas, deterministas y observables. La API Gateway no debe depender de una llamada remota lenta para cada política simple, ni debe convertirse en un único punto de falla que bloquee toda la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Una plataforma API puede incluir múltiples API Gateways. Una API Gateway externa protege las API públicas; otro sirve a las integraciones internas; un tercio está en una región específica; Los dominios regulados pueden utilizar API Gateways dedicadas. La definición es funcional: todos son puntos de mediación y política, aunque los productos, topologías y responsabilidades varían."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "La puerta de entrada no es sólo una dirección. Es un runtime que transforma una llamada entrante en una decisión de política y una nueva llamada a un destino seleccionado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.2 Qué no es una API Gateway",
    "id": "21-2-que-no-es-una-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Un reverse proxy acepta conexiones on-behalf-of servidores ascendentes y reenvía mensajes. Cada API Gateway ejecuta algún tipo de reverse proxy, pero no todos los reverse proxys ofrecen catalogación, publicación, suscripción, análisis, autenticación delegada o gobernanza del ciclo de vida. El concepto de API Gateway añade una capa de productos y políticas además de la intermediación básica."
  },
  {
    "kind": "paragraph",
    "text": "Un equilibrador de carga distribuye conexiones o solicitudes entre destinos elegibles. La API Gateway también puede equilibrar los backends, pero su función no se limita a eso. Comprende la API, la identidad del consumidor, la operación llamada y las políticas asociadas. Un equilibrador L4 puede elegir una instancia sin interpretar HTTP; una API Gateway normalmente opera en L7, aunque depende de los componentes circundantes de L4."
  },
  {
    "kind": "paragraph",
    "text": "Un WAF busca patrones de ataque en el tráfico web. Complementa la API Gateway, pero no reemplaza la autorización comercial, la validación de tokens, las cuotas de aplicaciones o la transformación de contratos. Un controlador de entrada publica servicios desde un clúster de Kubernetes y puede tener capacidades de API Gateway; Una malla de servicios controla el tráfico entre cargas de trabajo y puede tener API Gateways de entrada y salida. Los límites se superponen, pero las responsabilidades de gobernanza y exposición deben permanecer claras."
  },
  {
    "kind": "paragraph",
    "text": "Por último, la API Gateway no debe convertirse en un servidor disfrazado. Cuando la lógica de dominio, las reglas comerciales complejas y las orquestaciones extensas se combinan en políticas, la plataforma se vuelve difícil de probar, versionar y evolucionar. La pasarela deberá realizar mediaciones y controles transversales; la lógica que define el negocio sigue siendo de los servicios responsables."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Los conceptos cercanos no deben tratarse como sinónimos.",
    "headers": [
      "Componente",
      "Responsabilidad principal",
      "Relación con la API Gateway"
    ],
    "rows": [
      [
        "reverse proxy",
        "Termine y vuelva a crear conexiones a aguas arriba.",
        "Es una capacidad básica de la API Gateway."
      ],
      [
        "equilibrador de carga",
        "Distribuir el flujo entre destinos.",
        "Puede existir antes, dentro o después de la API Gateway."
      ],
      [
        "WAF",
        "Detecta y bloquea ataques web genéricos.",
        "Complementa políticas API específicas."
      ],
      [
        "Controlador de ingreso",
        "Publicar servicios desde un clúster.",
        "Puede implementar o integrar una API Gateway."
      ],
      [
        "Malla de servicio",
        "Controlar la comunicación entre cargas de trabajo.",
        "Complementa la API Gateway en la malla interna."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.3 Datos, control, gestión y planes de desarrollo",
    "id": "21-3-datos-control-gestion-y-planes-de-desarrollo"
  },
  {
    "kind": "paragraph",
    "text": "El data plane es el conjunto de tiempos de ejecución que procesan el tráfico. Mantiene escuchas, conexiones, tablas de rutas, políticas compiladas, cachés y grupos ascendentes. Tu prioridad es la disponibilidad y la baja latencia. Un problema en el portal o en la base de datos de configuración no debería interrumpir las llamadas ya publicadas, siempre y cuando el runtime tenga una copia válida y suficiente de la configuración."
  },
  {
    "kind": "paragraph",
    "text": "El control plane transforma la intención en configuración distribuida. Recibe definiciones de API, políticas, certificados, endpoints y parámetros, valida la coherencia y publica el estado en los tiempos de ejecución. Dependiendo de la plataforma, esta distribución se produce mediante push, pull, base de datos compartida, archivos, API administrativas o mecanismos de configuración dinámica. El diseño debe gestionar el control de versiones, la confirmación de la aplicación y la reversión."
  },
  {
    "kind": "paragraph",
    "text": "El plan de gestión concentra operaciones administrativas y de gobernanza: creación de API, control del entorno, RBAC administrativo, auditoría, catálogo, informes y automatización CI/CD. El plan de desarrollador atiende a consumidores y productores a través de un portal, documentación, credenciales, productos, planes y análisis. Estos planes pueden estar en el mismo producto, pero tener diferentes requisitos de seguridad y disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "La separación protege el runtime de un acoplamiento excesivo. También mejora la seguridad: no es necesario exponer la interfaz administrativa en la misma red o puerto que el tráfico API. En entornos regulados, los cambios en el control plane pueden requerir aprobación, firma de artefactos, segregación de funciones y un seguimiento auditable antes de llegar al data plane."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/figure-01-platform-planes.svg",
    "alt": "Planes de datos, control, gestión y desarrollo de una plataforma API",
    "caption": "Figura 1: La plataforma API tiene planes con diferentes responsabilidades y criticidades."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.4 Anatomía de una solicitud en la API Gateway",
    "id": "21-4-anatomia-de-una-solicitud-en-la-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "El viaje comienza antes de la puerta de entrada. El consumidor resuelve un nombre, selecciona una dirección, establece TCP o QUIC y negocia TLS. Un equilibrador o una puerta de entrada puede recibir la conexión antes que la API Gateway. Cuando el runtime finalmente acepta el mensaje, debe asociarlo con un oyente y una definición de API basada en SNI, host, método, ruta, headers u otras propiedades."
  },
  {
    "kind": "paragraph",
    "text": "Después de la selección, la API Gateway ejecuta una cadena de procesamiento. Algunos pasos son comunes: validación de tamaño y formato, autenticación, autorización, cuotas, transformación, enriquecimiento, enrutamiento y observabilidad. El orden importa. Aplicar una transformación antes de validar la firma puede cambiar el contenido protegido; consultar un backend antes de autorizar puede filtrar información debido al tiempo de respuesta; Registrar cargas útiles antes de enmascarar datos puede violar la privacidad."
  },
  {
    "kind": "paragraph",
    "text": "En el tramo de salida, la API Gateway resuelve el nombre del backend, elige la ruta y la dirección de origen, abre o reutiliza una conexión, negocia TLS y envía la solicitud transformada. La respuesta atraviesa las políticas de devolución, se puede convertir, filtrar, almacenar en caché y registrar. Sólo entonces se devuelve a través de la conexión de entrada. Las dos partes pueden utilizar diferentes versiones de HTTP, diferentes certificados y diferentes tiempos de espera."
  },
  {
    "kind": "paragraph",
    "text": "Una arquitectura operativa debe hacer visible esta secuencia. Los registros con estado final únicamente no indican dónde ocurrió la falla. El runtime debe exponer la etapa, la política, la identificación de la ruta, el flujo ascendente elegido, el tiempo de conexión, el tiempo de respuesta y el motivo del rechazo sin revelar secretos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/figure-02-request-pipeline.svg",
    "alt": "Canalización para procesar una solicitud en API Gateway",
    "caption": "Figura 2 - Una llamada se procesa por etapas que pueden aceptar, transformar, reenviar o interrumpir el flujo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.5 Oyentes, hosts virtuales y selección de API",
    "id": "21-5-oyentes-hosts-virtuales-y-seleccion-de-api"
  },
  {
    "kind": "paragraph",
    "text": "Un oyente asocia el runtime con direcciones y puertos en los que aceptará conexiones. Puede escuchar en una IP específica, en todas las interfaces o en direcciones virtuales proporcionadas por un balanceador de carga. El oyente define los protocolos permitidos, las versiones de TLS, los certificados, los límites de conexión y las opciones HTTP. Una configuración incorrecta puede hacer que la API parezca no estar disponible incluso cuando las políticas sean correctas."
  },
  {
    "kind": "paragraph",
    "text": "Los hosts virtuales permiten que varias API compartan una dirección y un puerto, diferenciados por nombre. En HTTPS, SNI participa en la selección de certificados durante el protocolo de enlace TLS; luego, el encabezado del Host o la autoridad HTTP identifica el destino lógico de la solicitud. SNI y Host suelen coincidir, pero no son el mismo objeto. Las discrepancias pueden provocar un certificado incorrecto, un enrutamiento inesperado o un rechazo de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "La selección de API generalmente utiliza el método y la ruta después de elegir el host. Las reglas deben ser deterministas. Las rutas superpuestas, los comodines amplios, las versiones ambiguas y las diferencias entre barras diagonales pueden dirigir una llamada a la política incorrecta. Se recomienda probar la tabla de ruta como contrato, incluidos casos negativos y conflictos."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway también debe normalizar las entradas con cuidado. La decodificación de URL, el manejo de barras diagonales duplicadas, la distinción entre mayúsculas y minúsculas y la normalización de headers pueden afectar la seguridad. Si la API Gateway y el backend interpretan la ruta de manera diferente, un atacante puede aprovechar la discrepancia para eludir la autorización o el cache."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de selección de API"
  },
  {
    "kind": "paragraph",
    "text": "Entrada recibida SNI: api.empresa.example Host: api.empresa.example Método: GET Ruta: /clientes/v2/123 Selección lógica Oyente HTTPS 443 Host virtual api.empresa.example API cliente-v2 Operación get-client"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.6 Motor de políticas y cadena de procesamiento",
    "id": "21-6-motor-de-politicas-y-cadena-de-procesamiento"
  },
  {
    "kind": "paragraph",
    "text": "El motor de políticas es la parte de la API Gateway que evalúa las reglas sobre la solicitud y la respuesta. Una política puede ser declarativa, como validar JWT con un issuer y una audience específicos, o procesal, como ejecutar un script. Diferentes productos utilizan flujos gráficos, XML, YAML, lenguajes propietarios o filtros de subprocesos. Independientemente de la forma, la política debe tener insumos, resultados, fallas y efectos secundarios conocidos."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas transversales incluyen autenticación, autorización, limitación de velocidad, cuotas, CORS, validación de esquema, transformación, enmascaramiento, cache, enrutamiento, reintentos y registro. Se debe diseñar la orden de ejecución. Por ejemplo, la autenticación suele preceder a las cuotas por consumidor; la validación del tamaño debe realizarse antes del costoso análisis; La desinfección de registros debe realizarse antes de emitir el evento de auditoría."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway debe distinguir entre fallas técnicas y decisiones comerciales. Una firma no válida puede generar 401; scope insuficiente, 403; límite superado, 429; backend no disponible, 503; error de conexión o protocolo, 502. Las respuestas estandarizadas mejoran la experiencia y la observabilidad del cliente, pero no deben ocultar la causa interna en los registros administrativos."
  },
  {
    "kind": "paragraph",
    "text": "Los scripts y las extensiones ofrecen flexibilidad pero aumentan el riesgo. El código arbitrario puede bloquear subprocesos, consumir memoria, filtrar secretos o crear dependencias difíciles de gobernar. Prefiera capacidades nativas y declarativas para controles comunes; Utilice extensiones sólo cuando exista una estrategia de revisión, prueba, límites y mantenimiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Las políticas deben evaluarse según su efecto operativo, no solo por su funcionalidad.",
    "headers": [
      "categoría",
      "Ejemplos",
      "pregunta de arquitectura"
    ],
    "rows": [
      [
        "Seguridad",
        "JWT, mTLS, clave API, autorización.",
        "¿La decisión es local o depende de un servicio externo?"
      ],
      [
        "Tráfico",
        "Límite de tasa, cuota, detención de picos.",
        "¿El estado es por nodo, clúster o servicio global?"
      ],
      [
        "Mediación",
        "Headers, JSON/XML, versionado.",
        "¿La transformación preserva la semántica y la firma?"
      ],
      [
        "Resiliencia",
        "Tiempo de espera, reintento, disyuntor.",
        "¿Es la operación idempotente y segura de repetir?"
      ],
      [
        "Observabilidad",
        "Registros, métricas, seguimientos, auditoría.",
        "¿Cómo correlacionar las entradas y salidas?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.7 Enrutamiento, descubrimiento y conectividad con backends",
    "id": "21-7-enrutamiento-descubrimiento-y-conectividad-con-backends"
  },
  {
    "kind": "paragraph",
    "text": "El enrutamiento convierte la API lógica en un destino físico. El destino puede ser una URL fija, un grupo de servidores, un servicio descubierto por DNS, un endpoint privado, un clúster de Kubernetes o una función administrada. La API Gateway debe decidir cómo resolver nombres, cuánto tiempo almacenar en caché las respuestas, cuándo reevaluar los endpoints y cómo reaccionar ante los cambios de salud."
  },
  {
    "kind": "paragraph",
    "text": "La conexión al backend es independiente de la conexión entrante. La API Gateway utiliza una dirección y un puerto de origen, posiblemente sujetos a SNAT, listas permitidas y agotamiento de puertos. Puede reutilizar conexiones mediante agrupación, negociar HTTP/2, enviar SNI diferente al Host y presentar el certificado del cliente en mTLS. Todos estos detalles deben estar alineados con las expectativas del backend."
  },
  {
    "kind": "paragraph",
    "text": "Los controles de salud indican si un destino es elegible, pero no garantizan que todas las operaciones funcionen. Una prueba superficial en /health puede arrojar resultados exitosos mientras las dependencias críticas no estén disponibles. La preparación debe representar la capacidad real para recibir tráfico. El drenaje es necesario durante las implementaciones para evitar que se envíen nuevas solicitudes a una instancia de terminación."
  },
  {
    "kind": "paragraph",
    "text": "Los reintentos y los disyuntores mejoran la resiliencia cuando se aplican con cuidado. Repetir automáticamente una operación no idempotente puede duplicar el pago o la creación de recursos. La API Gateway debe considerar el método, la clave de idempotencia, la etapa de falla y el tiempo restante del presupuesto. Los disyuntores deben proteger el sistema sin transformar un problema local en una indisponibilidad prolongada debido a una configuración agresiva."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La conectividad saliente concentra la mayoría de los problemas 502 y 503.",
    "headers": [
      "Elemento",
      "Función",
      "Fallo típico"
    ],
    "rows": [
      [
        "dns/descubrimiento",
        "Encuentre endpoints actuales.",
        "Caché obsoleto o falta resolución privada."
      ],
      [
        "Grupo de conexiones",
        "Reutilizar el transporte y reducir los apretones de manos.",
        "Conexiones inactivas cerradas por el par."
      ],
      [
        "control de salud",
        "Eliminar objetivos incapaces.",
        "Falso positivo debido a prueba superficial."
      ],
      [
        "Reintentar",
        "Recuperar fallas transitorias.",
        "Duplicación o tormenta de llamadas."
      ],
      [
        "disyuntor",
        "Contener fallas persistentes.",
        "Apertura inadecuada o recuperación lenta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.8 Seguridad en la entrada y salida",
    "id": "21-8-seguridad-en-la-entrada-y-salida"
  },
  {
    "kind": "paragraph",
    "text": "Al ingresar, la API Gateway generalmente finaliza TLS, valida el certificado del servidor y, en mTLS, verifica el certificado del cliente. Luego interpreta mecanismos de aplicación como autenticación básica, clave API, access token OAuth, JWT o SAML convertidos por un corredor. La autenticación identifica al principal; La autorización decide si puede llamar a la operación y acceder al recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway no debe confiar automáticamente en los headers de identidad recibidos de Internet. Los headers como X-User, X-Roles o X-Client-ID deben eliminarse o sobrescribirse antes de propagar el contexto interno. De lo contrario, el consumidor podrá falsificar su identidad. El contexto confiable debe surgir de un mecanismo validado y estar protegido en el segmento de salida, preferiblemente mediante TLS y autenticación entre cargas de trabajo."
  },
  {
    "kind": "paragraph",
    "text": "A la salida, la API Gateway puede presentar su propia identidad al backend mediante mTLS, identidad administrada, Token Exchange o credencial técnica. Esta identidad representa la API Gateway o la aplicación de consumidor, según el modelo. Preservar solo una identidad genérica simplifica la integración, pero puede reducir la auditoría y la autorización detalladas. Propagar el token original aumenta el contexto, pero expone el backend a semántica externa y puede ampliar la superficie de confianza."
  },
  {
    "kind": "paragraph",
    "text": "Los secretos, claves y certificados deben obtenerse de repositorios apropiados, rotarse y auditarse. La configuración de texto claro, los registros de autorización y la exportación sin restricciones de claves privadas son fallas graves. El runtime debe continuar funcionando durante las rotaciones, aceptando períodos controlados de superposición cuando sea necesario."
  },
  {
    "kind": "subhead",
    "text": "Límite de confianza"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway protege el backend solo cuando el acceso directo está bloqueado o estrictamente controlado. Si el servicio continúa expuesto a través de otra ruta, se pueden eludir las políticas de API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.9 Control de tráfico, protección y cache",
    "id": "21-9-control-de-trafico-proteccion-y-cache"
  },
  {
    "kind": "paragraph",
    "text": "La limitación de velocidad controla la velocidad de las llamadas dentro de una ventana; la cuota controla el consumo acumulado en un período; la limitación describe la reducción o el rechazo del tráfico cuando se alcanzan los umbrales; la detención de picos suaviza los picos. Los términos varían entre productos, pero la arquitectura debe definir la clave de conteo, la granularidad, el almacenamiento del estado y el comportamiento cuando falla el servicio de conteo."
  },
  {
    "kind": "paragraph",
    "text": "El conteo por dirección IP es insuficiente en entornos con NAT y proxies. Contar por ID de aplicación, suscripción, asunto, tenant u operación produce un control más alineado con el contrato. En los clústeres, los límites locales por nodo pueden permitir un consumo agregado mayor al esperado. Los límites globales requieren coordinación distribuida y añaden latencia y dependencia."
  },
  {
    "kind": "paragraph",
    "text": "El cache reduce la latencia y la carga, pero debe respetar la semántica, la identidad y la privacidad de HTTP. La clave de caché puede incluir método, URL, consulta, headers de negociación y contexto del consumidor. Almacenar respuestas personalizadas sin variar según el usuario puede filtrar datos. La API Gateway también debe definir la invalidación, el TTL, el manejo de errores y el comportamiento durante la indisponibilidad del backend."
  },
  {
    "kind": "paragraph",
    "text": "Se deben implementar protecciones de tamaño, tiempo de espera, análisis y concurrencia antes de operaciones costosas. Umbrales demasiado bajos invalidan los casos válidos; Límites muy altos permiten el abuso de memoria y CPU. La plataforma debe publicar valores, medir rebotes y ajustar en función del tráfico real."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Los controles de tráfico dependen de la clave, el estado y la semántica.",
    "headers": [
      "controlar",
      "Posible clave",
      "decisión importante"
    ],
    "rows": [
      [
        "Límite de tarifa",
        "cliente + API + operación.",
        "Ventana fija, corredera o cubeta simbólica."
      ],
      [
        "Cuota",
        "suscripción + periodo.",
        "Comportamiento al alcanzar el total."
      ],
      [
        "Competencia",
        "backend + ruta.",
        "Cola, rebote o contrapresión."
      ],
      [
        "caché",
        "URI + headers + identidad.",
        "Variación, TTL y datos sensibles."
      ],
      [
        "Payload",
        "operación + tipo de contenido.",
        "Talla antes y después de la descompresión."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.10 Topologías y modelos de implementación",
    "id": "21-10-topologias-y-modelos-de-implementacion"
  },
  {
    "kind": "paragraph",
    "text": "En la topología centralizada, un clúster compartido publica API de múltiples áreas. El modelo simplifica la gobernanza y las operaciones, pero puede crear una cola de cambios, un amplio radio de explosión y límites de capacidad comunes. La plataforma necesita multitenant, aislamiento de configuración y procesos claros para evitar que un equipo afecte a otro."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways por dominio o producto acercan la propiedad al runtime y reducen el radio de explosión. Por otro lado, aumentan el número de instancias, los costos, la actualización y el riesgo de estándares divergentes. Un modelo federado puede combinar una plataforma de automatización y estándares centrales con tiempos de ejecución delegados a dominios."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas en capas utilizan API Gateways externas en el borde y API Gateways internas cerca de los servicios. La capa externa concentra la protección contra Internet, la identidad de los socios y los contratos públicos; el interno controla el tráfico entre zonas y dominios. Es necesario evitar duplicidad de políticas y latencia acumulada. Cada capa debe tener una responsabilidad explícita."
  },
  {
    "kind": "paragraph",
    "text": "Los modelos gestionados transfieren la operación de parte de la infraestructura al proveedor. Los modelos autohospedados ofrecen mayor control y personalización de la red. Las arquitecturas híbridas mantienen el control plane central y el data plane en centros de datos, clústeres o regiones privadas. La elección depende de los requisitos de conectividad, soberanía, latencia, cumplimiento, dotación de personal y continuidad."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/figure-03-gateway-topologies.svg",
    "alt": "Topologías de API Gateway centralizadas, por dominio, escalonadas e híbridas",
    "caption": "Figura 3: La topología debe equilibrar la centralización, la autonomía, el aislamiento y el costo operativo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.11 Alta disponibilidad y coherencia",
    "id": "21-11-alta-disponibilidad-y-coherencia"
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad comienza con el data plane. Varias instancias deben recibir tráfico a través del equilibrador de carga o enrutamiento equivalente. Las instancias deben ser reemplazables, con un estado mínimo local y una configuración reproducible. La pérdida de un nodo no puede interrumpir todo el servicio ni requerir una recuperación manual prolongada."
  },
  {
    "kind": "paragraph",
    "text": "El control plane también debe ser resistente, pero su falta de disponibilidad puede tener un impacto diferente. Si las API Gateways ya tienen una configuración válida, pueden continuar procesando llamadas mientras se bloquean nuevas publicaciones. Este modo degradado es deseable. El riesgo surge cuando el runtime consulta el control plane en cada solicitud o no mantiene suficiente configuración local."
  },
  {
    "kind": "paragraph",
    "text": "La distribución de la configuración necesita control de versiones y confirmación. Una publicación parcial puede dejarnos con políticas diferentes. El sistema debe identificar la versión activa en cada instancia, rechazar artefactos no válidos, aplicar cambios de forma atómica cuando sea posible y permitir la reversión. El valor canario de configuración reduce el riesgo al exponer una pequeña porción del tráfico antes de la propagación completa."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad regional requiere decidir sobre DNS, tráfico global, replicación de claves, cuotas, cachés y datos de suscripción. Activo-activo aumenta la capacidad y reduce el tiempo de recuperación, pero requiere coherencia y prevención de doble conteo. Activo-pasivo simplifica algunos estados, pero requiere pruebas frecuentes para que el entorno pasivo esté realmente listo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/figure-04-high-availability.svg",
    "alt": "Arquitectura del control plane y del data plane de alta disponibilidad",
    "caption": "Figura 4: La continuidad del runtime no debe depender de una sola instancia o del portal administrativo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.12 Estado, sesiones y dependencias externas",
    "id": "21-12-estado-sesiones-y-dependencias-externas"
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways funcionan mejor cuando el procesamiento de solicitudes es predominantemente sin estado. Sin embargo, varias políticas introducen estados: cuotas, límites de velocidad distribuida, cachés, sesiones, nonces, listas de revocación y disyuntores. La arquitectura necesita identificar dónde reside este estado, cómo se replica, qué coherencia se requiere y qué sucede cuando el repositorio deja de estar disponible."
  },
  {
    "kind": "paragraph",
    "text": "Las dependencias externas incluyen proveedores de identidad, endpoints de introspección, PDP, bancos, servicios secretos, DNS, PKI y sistemas de análisis. Llamar a un servicio remoto en cada solicitud aumenta la latencia y la disponibilidad compuesta. Las cachés controladas, la validación JWT local, las decisiones precompiladas y los tiempos de espera breves pueden reducir el riesgo, siempre que se consideren la revocación y la actualización."
  },
  {
    "kind": "paragraph",
    "text": "La política de fracaso debe ser explícita. La apertura fallida permite el tráfico cuando un control no está disponible; Bloques cerrados ante fallos. Para la autorización y validación de credenciales, a menudo es necesario el cierre fallido. Para la telemetría no crítica, el runtime puede almacenar eventos temporalmente o descartarlos de forma controlada para preservar la disponibilidad. No existe una regla única; existe una clasificación de criticidad."
  },
  {
    "kind": "paragraph",
    "text": "Se deben evitar las sesiones de API Gateway cuando no sean necesarias. La afinidad puede reducir la flexibilidad de escalado y dificultar la recuperación. Cuando un protocolo requiere un estado de conexión, como WebSocket, este estado debe tratarse como una parte explícita de la arquitectura, con drenaje, reconexión y distribución de eventos."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: cada dependencia externa aumenta la disponibilidad compuesta de la API Gateway.",
    "headers": [
      "dependencia",
      "Uso",
      "Estrategia de resiliencia"
    ],
    "rows": [
      [
        "Proveedor de identidad/JWKS",
        "Validar tokens y claves.",
        "Caché con actualización y rotación controladas."
      ],
      [
        "PDP",
        "Decisión de autorización.",
        "Tiempo de espera corto, cache en riesgo y cierre fallido."
      ],
      [
        "Redis/contador",
        "Cuotas globales y límites de tarifas.",
        "Clúster, degradación conocida y métricas."
      ],
      [
        "tienda secreta",
        "Credenciales y certificados.",
        "Caché seguro, rotación y acceso mínimo."
      ],
      [
        "Analítica",
        "Eventos y reportajes.",
        "Amortiguación asincrónica y contrapresión."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.13 Observabilidad, auditoría y correlación",
    "id": "21-13-observabilidad-auditoria-y-correlacion"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad de la API Gateway debe mostrar lo que sucedió en cada tramo. Las métricas entrantes miden las conexiones, las solicitudes, el estado y la latencia percibida por el consumidor. Las métricas de salida miden la resolución, la conexión, el protocolo de enlace, el tiempo hasta el primer byte y la respuesta del backend. La diferencia entre los dos ayuda a identificar los costos de las políticas y la espera interna."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben registrar la marca de tiempo, API, operación, versión, consumidor, identidad, política de fallas, ID de ruta, flujo ascendente, estado y tiempos relevantes. Es necesario enmascarar los secretos y los datos personales. La API Gateway no debe registrar autorización, cookies o carga útil completa de forma predeterminada. La auditoría administrativa debe estar separada de los registros de acceso y registrar quién cambió la configuración, qué cambió y cuándo entró en vigor."
  },
  {
    "kind": "paragraph",
    "text": "El rastreo distribuido conecta al consumidor, la API Gateway y el backend. La API Gateway debe preservar o generar un contexto de seguimiento de acuerdo con la política de la organización, creando intervalos para el procesamiento interno y las llamadas salientes. Cuando existen varios servidores proxy, cada capa debe contribuir sin sobrescribir la correlación. Los ID de solicitud de propiedad aún pueden ser útiles, pero deben coexistir con los estándares de seguimiento."
  },
  {
    "kind": "paragraph",
    "text": "La cardinalidad es un riesgo. Colocar asunto, URL completa o valores de consulta en etiquetas de métricas puede disparar las series temporales y los costos. Los datos de alta cardinalidad pertenecen a registros o seguimientos. Las métricas deben utilizar dimensiones controladas, como API, operación, clase de estado, región y grupo de backend."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/es/figure-05-observability.svg",
    "alt": "Correlación y observabilidad entre conexiones de API Gateway entrantes y salientes",
    "caption": "Figura 5: La correlación debe acompañar a la llamada en las dos conexiones mantenidas por la API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.14 Gobernanza, portal y ciclo de vida",
    "id": "21-14-gobernanza-portal-y-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway es parte de una plataforma, no el ciclo de vida completo. Los productores deben registrar API, publicar contratos, definir propiedad, entornos, versiones, productos y políticas. Los consumidores necesitan descubrir documentación, solicitar acceso, obtener credenciales y realizar un seguimiento del consumo. El portal de desarrolladores materializa parte de esta relación, pero depende de procesos y datos fiables."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza debe automatizarse en el proceso. OpenAPI, políticas, certificados, configuraciones de backend y pruebas se pueden versionar como código. Linting, validación de seguridad, diferenciación de contratos y promoción entre entornos reducen los cambios manuales. La interfaz administrativa de la API Gateway no debería ser el único lugar donde existe la verdad."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de vida incluye borrador, revisión, publicación, operación, depreciación y retiro. La API Gateway debe permitir la coexistencia de versiones, la comunicación final y la medición de consumidores aún activos. Eliminar una ruta sin telemetría y sin un plan de migración convierte la gobernanza en indisponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los productos y planes agrupan API con reglas comerciales u operativas. Una suscripción puede vincular consumidor, credencial, cuota y conjunto de operaciones. Estos objetos necesitan propiedad, caducidad, rotación y auditoría. Las credenciales huérfanas suponen un riesgo tan importante como el de las API huérfanas."
  },
  {
    "kind": "subhead",
    "text": "Gobernanza práctica"
  },
  {
    "kind": "paragraph",
    "text": "La configuración publicada en la API Gateway debe ser reproducible en canalización, revisable por pares y asociada con un contrato. Los cambios exclusivamente manuales dificultan la auditoría, la reversión y la coherencia entre entornos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.15 Planificación del desempeño y la capacidad",
    "id": "21-15-planificacion-del-desempeno-y-la-capacidad"
  },
  {
    "kind": "paragraph",
    "text": "El rendimiento de la API Gateway no se puede resumir en solicitudes por segundo. El costo depende del tamaño de la carga útil, TLS, algoritmo criptográfico, cantidad de políticas, transformaciones, llamadas externas, registro, compresión, protocolos y latencia de backend. Dos API con el mismo RPS pueden consumir recursos muy diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Las conexiones son una dimensión en sí mismas. Una API Gateway puede recibir muchas conexiones cortas, pocas conexiones HTTP/2 multiplexadas o miles de WebSockets persistentes. Es necesario dimensionar los límites de los descriptores de archivos, los buffers, los puertos efímeros, los pools y los tiempos de espera. La CPU puede agotarse a medida que el sistema agota los sockets o la memoria intermedia."
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de carga deben reproducir la distribución real de operaciones, autenticación, tamaños, errores y tiempo de reflexión. Probar solo una ruta simple en un bucle le proporciona un número de laboratorio, no una capacidad de producción. Es necesario observar percentiles de latencia, saturación, colas, retransmisiones, recolección de basura, conexiones y dependencias externas."
  },
  {
    "kind": "paragraph",
    "text": "La planificación incluye margen para fallas. Si el clúster solo admite una carga normal con todos los nodos, la pérdida de una instancia provoca la saturación. La capacidad debe considerar el mantenimiento, la implementación, el pico, el crecimiento y la conmutación por error regional. El ajuste de escala automático ayuda, pero tiene retrasos; el sistema necesita sobrevivir hasta que las nuevas instancias estén listas y en funcionamiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - La capacidad es multidimensional y necesita pruebas representativas.",
    "headers": [
      "Dimensión",
      "Indicadores",
      "Pregunta de capacidad"
    ],
    "rows": [
      [
        "Tráfico",
        "RPS, bytes/s, operaciones.",
        "¿Cuál es la combinación de llamadas real?"
      ],
      [
        "Conexiones",
        "activo, nuevo/s, reutilización.",
        "¿Existe agrupación, HTTP/2 o WebSocket?"
      ],
      [
        "CPU",
        "cifrado, análisis y secuencias de comandos.",
        "¿Qué políticas dominan el costo?"
      ],
      [
        "Memoria",
        "buffers, caché, cargas útiles.",
        "¿Cuál es el peor tamaño simultáneo?"
      ],
      [
        "Dependencias",
        "Latencia y error externo.",
        "¿Se satura la pasarela esperando a terceros?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.16 Fallos, antipatrones y retroubleshooting",
    "id": "21-16-fallos-antipatrones-y-retroubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Se puede producir un error 404 porque el host no coincidió, no se encontró la ruta, la versión no existe o el backend devolvió 404. Un 401 podría provenir de la API Gateway, el IdP, una política personalizada o el servicio. Un 502 normalmente indica una falla al comunicarse con el canal ascendente, pero puede implicar DNS, TCP, TLS, HTTP no válidos o una conexión cerrada. La investigación necesita localizar al remitente de la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "El antipatrón más común es tratar la API Gateway como una caja opaca. Sin métricas de etapa ni acceso a registros correlacionados, los equipos cambian las políticas, los tiempos de espera y los backends mediante prueba. Otro antipatrón es acumular lógica empresarial en la puerta de entrada, creando flujos largos y frágiles. También es peligroso publicar todas las API en un clúster sin capacidades de aislamiento o contención de fallas."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting debe seguir capas. Primero confirme el DNS y la dirección. Luego conexión TCP, TLS, escucha y selección de API. Luego examine la autenticación, autorización, cuotas y transformaciones. Sólo entonces investigue la ruta, el DNS backend, la conexión saliente y la respuesta ascendente. La captura debe indicar el punto de observación, porque la IP y el puerto cambian al atravesar la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Los cambios de configuración son una fuente importante de incidentes. Registre la versión activa, el tiempo de publicación y la diferencia con la versión anterior. Si solo unos pocos nodos tienen errores, sospeche de propagación parcial, caché o estado local. Si el problema aparece después de la rotación de certificados, verifique los almacenes de confianza, las cadenas, el SNI y la superposición de validez."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El código final es sólo el comienzo del diagnóstico.",
    "headers": [
      "Síntoma",
      "Pasos para comprobar",
      "Evidencia útil"
    ],
    "rows": [
      [
        "Conexión rechazada",
        "oyente, firewall, IP/puerto.",
        "SYN/RST, socket de escucha, estado del nodo."
      ],
      [
        "El protocolo de enlace TLS falló",
        "certificado, SNI, confianza, versión.",
        "Alerta TLS y cadena presentada."
      ],
      [
        "401 / 403",
        "credencial, claims, póliza y PDP.",
        "issuer, audience, scope e ID de política."
      ],
      [
        "429",
        "contar clave y estado.",
        "mostrador, ventana, nodo y consumidor."
      ],
      [
        "502/503",
        "ruta, DNS, grupo, conexión y estado.",
        "tiempos elegidos de entrada y salida."
      ],
      [
        "Alta latencia",
        "cola, política exterior, backend.",
        "lapsos y descomposición del tiempo."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Lista de verificación de troubleshooting operativos"
  },
  {
    "kind": "paragraph",
    "text": "Ruta mínima de diagnóstico 1. Resolver nombre y confirmar destino. 2. Pruebe TCP y TLS hasta el oyente. 3. Confirme el host, el método, la ruta y la API seleccionada. 4. Identifique la política que aceptó o rechazó. 5. Confirmar ruta elegida y aguas arriba. 6. Mida DNS, conexión, TLS y tiempo de backend. 7. Correlacione la respuesta con la versión de configuración."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.17 Estudios de casos y laboratorios",
    "id": "21-17-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: API Gateway externa e interna: una institución expone las API a los socios a través de una API Gateway perimetral y reenvía llamadas a una API Gateway interna cercana a los servicios. La API Gateway externa valida el certificado del socio y el access token; el interno aplica autorización por dominio y rutas a backends privados. El diseño funciona cuando cada capa tiene una responsabilidad distinta y la correlación cruza ambas."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: configuración parcial: después de una publicación, la mitad de las llamadas devuelven 401. El equilibrador distribuye el tráfico entre cuatro nodos, pero dos no recibieron la nueva clave JWKS. La versión de configuración registrada por instancia revela la divergencia. El incidente demuestra la necesidad de mantener el estado de la publicación, el compromiso y la configuración atómicos, no solo el estado del proceso."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: Agotamiento de la salida: la API Gateway recibe tráfico normalmente, pero comienza a devolver 502 en picos. La CPU y la memoria son estables. Las métricas de socket muestran una gran cantidad de conexiones y puertos cortos en TIME_WAIT debido a la ausencia de agrupación. Ajustar el mantenimiento de conexión, los límites y la estrategia SNAT resuelve la causa, que no estaba en las políticas HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - Dependencia de la autorización: todas las solicitudes consultan un PDP remoto. Cuando el PDP experimenta latencia, la API Gateway acumula subprocesos y aumenta el tiempo de respuesta de las API no relacionadas. La solución combina tiempo de espera, barrera, cache de decisiones de bajo riesgo y escalamiento discreto, preservando el cierre de fallas para operaciones sensibles."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Configure un reverse proxy simple y observe ambas conexiones. 2) Simule la falla del DNS de backend y compárelo con un oyente no disponible. 3) Aplicar una política JWT y registrar la etapa de rechazo. 4) Prueba de agrupación, reintentos y tiempos de espera con un backend lento. 5) Publique dos versiones de configuración y verifique la reversión."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es un runtime de mediación y aplicación de políticas entre consumidores y backends. Finaliza una relación de transporte y crea otra, pudiendo cambiar identidad, protocolo, cabeceras, formato y destino. Esta posición concentra el valor de seguridad y gobernanza, pero también crea criticidad operativa."
  },
  {
    "kind": "paragraph",
    "text": "Una plataforma madura separa el data plane, el control plane, el plano de gestión y el plano de desarrollador. El runtime debe permanecer disponible con una configuración válida incluso durante fallas de administración. Las publicaciones deben ser versionadas, confirmadas y reversibles. La topología, la alta disponibilidad y el estado distribuido deben definirse explícitamente."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de solicitud incluye escucha, selección de API, políticas, enrutamiento, conexión saliente y procesamiento de respuesta. La seguridad, el tráfico, el cache, la resiliencia y la observabilidad dependen del orden y el estado de estos pasos. Un diagnóstico confiable separa las entradas y las salidas y localiza el componente que produjo la decisión."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway no reemplaza la lógica empresarial, WAF, balanceador de carga, malla de servicios ni gobernanza completa. Se integra con estos componentes. La arquitectura adecuada equilibra centralización, autonomía, aislamiento, capacidad y continuidad. El próximo capítulo profundizará en las políticas ejecutadas por el motor de API Gateway."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 22 profundizará en las Políticas de Puerta de Enlace: estructura, orden de ejecución, variables de contexto, autenticación, autorización, transformación, enrutamiento, resiliencia, scripts, manejo de errores y buenas prácticas de gobierno."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de la arquitectura de la API Gateway",
    "id": "lista-de-verificacion-de-la-arquitectura-de-la-api-gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Las responsabilidades de la API Gateway se diferencian de WAF, equilibrador de carga, ingreso y malla de servicios.",
      "El data plane, el control plane, el plano de gestión y el plano de desarrollador tienen límites y SLA definidos.",
      "La indisponibilidad del plan de gestión no interrumpe el tráfico ya publicado.",
      "Los oyentes, SNI, host, rutas y reglas de selección son deterministas y probados.",
      "El orden de las políticas evita eludiciones, costos innecesarios y fugas de datos.",
      "El acceso directo a los servidores está bloqueado o estrictamente controlado.",
      "Se dimensionan las conexiones salientes, DNS, SNAT, pooling, comprobaciones de estado y tiempos de espera.",
      "Los reintentos solo se aplican cuando la operación se puede repetir de forma segura.",
      "Los límites de velocidad y las cuotas tienen clave, scope y estado de almacenamiento conocidos.",
      "Los cachés varían según la identidad y no almacenan datos confidenciales de forma insegura.",
      "Las configuraciones están versionadas, canalizadas, confirmadas y reversibles.",
      "Los registros, métricas y seguimientos correlacionan las políticas entrantes y salientes.",
      "El clúster admite la pérdida de nodos y tiene margen para picos y conmutación por error.",
      "Las dependencias externas tienen tiempo de espera, estrategia de falla y observabilidad.",
      "Hay runbooks para 401, 403, 429, 502, 503, TLS y latencia."
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
      "Explique por qué la API Gateway del consumidor y el backend de la API Gateway son conexiones independientes.",
      "Diferenciar entre API Gateway, reverse proxy, WAF, balanceador de carga y malla de servicios.",
      "Describir los cuatro planos lógicos de una plataforma API.",
      "Armar la secuencia de procesamiento de una solicitud y justificar el orden de las políticas.",
      "Explique cómo SNI y Host participan en la selección de API.",
      "Compare topologías centralizadas, de dominio, en capas e híbridas.",
      "Proponer una arquitectura de alta disponibilidad que sobreviva la pérdida del control plane.",
      "Analice cuándo es preferible la validación JWT local a la introspección remota.",
      "Explique cómo la agrupación y SNAT afectan la conectividad con los backends.",
      "Proponer métricas para separar la latencia de la API Gateway y la latencia del backend.",
      "Analice los riesgos de almacenar una lógica empresarial extensa en las políticas.",
      "Cree un script para investigar respuestas 502 intermitentes en una sola región."
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
        "API Gateway",
        "Tiempo de ejecución para la mediación y aplicación de políticas entre consumidores y backends."
      ],
      [
        "Plano de control",
        "Plan que distribuye la configuración y el estado deseado a los tiempos de ejecución."
      ],
      [
        "Plan de datos",
        "Plan que procesa el tráfico real de las API."
      ],
      [
        "Portal de desarrolladores",
        "Interfaz de descubrimiento, documentación, incorporación y consumo."
      ],
      [
        "Drenar",
        "Proceso de detener nuevas solicitudes antes de terminar una instancia."
      ],
      [
        "Salida",
        "Tráfico saliente desde la API Gateway hacia el backend."
      ],
      [
        "cerrado por falla",
        "Comportamiento que bloquea cuando falla un control crítico."
      ],
      [
        "Apertura fallida",
        "Comportamiento que permite la continuidad cuando falla un control."
      ],
      [
        "Entrada",
        "Tráfico que ingresa al runtime a través del oyente."
      ],
      [
        "oyente",
        "Endpoint local que acepta conexiones y protocolos."
      ],
      [
        "plan de manejo",
        "Plan administrativo de publicación, catalogación y gobierno."
      ],
      [
        "Política",
        "Regla ejecutada ante solicitud, respuesta o error."
      ],
      [
        "ruta",
        "Mapeo entre API lógica y destino de backend."
      ],
      [
        "SNAT",
        "Traducción de la dirección y puerto de origen en el segmento de salida."
      ],
      [
        "aguas arriba",
        "Servidor o grupo de destino llamado por la API Gateway."
      ],
      [
        "anfitrión virtual",
        "Dirección y puerto compartidos de identidad del host lógico."
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
      "IETF. RFC 9110 - Semántica HTTP.",
      "IETF. RFC 9111: cache HTTP.",
      "IETF. RFC 8446: Protocolo de seguridad de la capa de transporte, versión 1.3.",
      "IETF. RFC 9457: Detalles del problema para las API HTTP.",
      "NIST. SP 800-204 - Estrategias de seguridad para sistemas de aplicaciones basados en microservicios.",
      "NIST. SP 800-207: Arquitectura de confianza cero.",
      "Iniciativa OpenAPI. Especificación de OpenAPI.",
      "Centro de arquitectura de Microsoft Azure. Patrón de API Gateway.",
      "Documentación de proxy del enviado. Descripción general de la arquitectura y filtros HTTP.",
      "OWASP. Top 10 de seguridad de API.",
      "CNCF. API de API Gateway y materiales arquitectónicos de malla de servicios."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los productos Gateway evolucionan a su propio ritmo. Al aplicar los conceptos a una plataforma específica, confirme la documentación de la versión implementada, especialmente para protocolos, políticas, agrupación en clústeres, límites, integración de identidades y comportamiento de alta disponibilidad."
  }
];
