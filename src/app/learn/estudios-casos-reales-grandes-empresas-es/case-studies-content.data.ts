import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const CASE_STUDIES_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Casos reales: arquitectura, operación, fallas y decisiones a escala"
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El valor del estudio de caso está en el razonamiento y las compensaciones; Copiar la solución sin contexto es un riesgo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/es/overview.svg",
    "alt": "Casos reales que conectan decisiones arquitectónicas con problemas de producción.",
    "caption": "Figura de apertura: los casos conectan decisiones arquitectónicas con problemas observados en la producción."
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
    "text": "Los capítulos anteriores estudiaron protocolos, API Gateways, seguridad, mensajería, observabilidad, Kubernetes, Zero Trust y disponibilidad de forma conceptual y técnica. Este capítulo cambia la perspectiva: en lugar de presentar una tecnología aislada, analiza cómo las grandes organizaciones han documentado problemas reales y las decisiones que han tomado para operar a escala. La intención es acercar la teoría y la práctica sin transformar las historias públicas en recetas universales."
  },
  {
    "kind": "paragraph",
    "text": "Los estudios de casos de empresas globales son útiles porque exponen compensaciones que rara vez aparecen en los tutoriales. Es posible que una API Gateway deba abandonar un modelo de bloqueo; los reintentos pueden amplificar un error; un esquema de versiones debe equilibrar la evolución y la estabilidad; la columna vertebral de un evento debe preservar la retención y el paralelismo; un portal interno necesita reducir la fragmentación de herramientas. Cada decisión responde a un contexto específico de volumen, organización, legado y madurez operativa."
  },
  {
    "kind": "paragraph",
    "text": "Al mismo tiempo, las fuentes públicas están incompletas. Los artículos de ingeniería incluyen extractos, generalmente escritos después de un proyecto exitoso o un incidente importante. Es posible que se omitan costos, intentos fallidos, restricciones comerciales y detalles de seguridad. Por tanto, el lector debe extraer principios, no copiar topologías. La pregunta correcta es: ¿qué propiedad del sistema llevó a la decisión y cómo aparece esta propiedad en mi entorno?"
  },
  {
    "kind": "paragraph",
    "text": "Los casos seleccionados cubren Netflix, Amazon/AWS, Stripe, Shopify, LinkedIn, Google, GitHub y Spotify. Fueron elegidos porque tienen publicaciones técnicas principales y porque conectan varios temas del curso: API Gateway, deslastre de carga, idempotencia, control de versiones, GraphQL, Kafka, SRE, gRPC, OpenAPI, portales de desarrolladores y análisis de incidentes."
  },
  {
    "kind": "paragraph",
    "text": "Cómo estudiar este capítulo Para cada empresa, escriba cinco líneas: contexto, problema, decisión, resultado y límite de transferencia. Luego, convierta la lección en una hipótesis comprobable para un entorno bancario o corporativo. Esta práctica evita copiar soluciones sin comprender el mecanismo que las hizo efectivas."
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
      "Leer publicaciones de ingeniería como evidencia parcial y contextualizada.",
      "Relacionar las decisiones de las grandes empresas con los fundamentos de las API y los sistemas distribuidos.",
      "Analizar la evolución de las API Gateways, las estrategias de resiliencia y la protección contra sobrecargas.",
      "Comprender prácticas reales de idempotencia, control de versiones y limitación de velocidad.",
      "Relacione GraphQL, Kafka, gRPC, SRE y portales de desarrolladores con problemas organizacionales.",
      "Extraiga patrones recurrentes sin confundir correlación con causalidad.",
      "Evaluar cuándo un caso es transferible a entornos bancarios, regulados o híbridos.",
      "Convierta una lección pública en un experimento controlado, un estándar técnico y un runbook."
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
      "39.1 Cómo interpretar los casos públicos con rigor",
      "39.2 Netflix: evolución de la API Gateway Zuul",
      "39.3 Amazon/AWS: reintentos, idempotencia, aislamiento y estabilidad",
      "39.4 Stripe: API predecibles, control de versiones y limitación de velocidad",
      "39.5 Shopify: GraphQL y limitación de costos",
      "39.6 LinkedIn: Kafka como columna vertebral de datos",
      "39.7 Google: SRE, sobrecarga y gRPC",
      "39.8 GitHub: versionado por fecha, OpenAPI y SDKs",
      "39.9 Spotify: incidente de descubrimiento de servicios y plataformas internas",
      "39.10 Comparación transversal y aplicación a los bancos",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.1 Cómo interpretar los casos públicos con rigor",
    "id": "39-1-como-interpretar-los-casos-publicos-con-rigor"
  },
  {
    "kind": "paragraph",
    "text": "Un caso público debe leerse como un marco temporal. La arquitectura descrita puede haber sido reemplazada, ampliada o dividida después de la publicación. Además, un mismo término puede significar cosas diferentes entre empresas. API Gateway, plataforma, célula, dominio y servicio son palabras que dependen del contexto. El lector debe registrar la fecha, la fuente primaria, la escala descrita y el objetivo del texto antes de generalizar cualquier conclusión."
  },
  {
    "kind": "paragraph",
    "text": "El análisis debe separar los hechos publicados de las inferencias. Si una empresa dice que ha migrado una API Gateway a E/S asíncrona, es un hecho. Concluir que cada API Gateway de bloqueo es inadecuada es una inferencia incorrecta. Es posible que el problema solo haya surgido bajo un determinado perfil de conexión, número de fuentes o costo por hilo. Los buenos estudios de casos explican la relación entre síntoma, mecanismo y decisión."
  },
  {
    "kind": "paragraph",
    "text": "También es necesario señalar el sesgo de supervivencia. Las soluciones publicadas normalmente han funcionado lo suficientemente bien como para merecer un artículo, pero eso no significa que sean las únicas posibles. En una organización más pequeña, una arquitectura más simple puede producir una mejor disponibilidad al reducir los componentes y las habilidades necesarios. La escala técnica y la escala organizacional deben considerarse juntas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/es/figure-01.svg",
    "alt": "Marco para analizar el contexto, el problema, la decisión y el resultado de un caso público.",
    "caption": "Figura 1 - El contexto y los límites son tan importantes como la solución descrita."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Un caso técnico debe ser interrogado, no sólo admirado.",
    "headers": [
      "Pregunta",
      "Pruebas deseadas",
      "Riesgo de ignorar"
    ],
    "rows": [
      [
        "¿Cuál fue el problema?",
        "Síntoma, impacto y restricciones.",
        "Copie la tecnología innecesariamente."
      ],
      [
        "¿Cuál fue la escala?",
        "Volumen, cardinalidad, regiones y equipos.",
        "De gran tamaño o de tamaño insuficiente."
      ],
      [
        "¿Cuál fue la compensación?",
        "Costo, complejidad y fallas restantes.",
        "Trate la ganancia como gratuita."
      ],
      [
        "¿Qué cambió después?",
        "Fecha y continuidad de la arquitectura.",
        "Adopte la solución ya reemplazada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.2 Netflix: evolución de la API Gateway Zuul",
    "id": "39-2-netflix-evolucion-de-la-api-gateway-zuul"
  },
  {
    "kind": "paragraph",
    "text": "Netflix publicó Zuul como un servicio de borde utilizado para recibir tráfico, aplicar filtros, enrutar llamadas y proteger sistemas en la nube. La primera generación se basó en un modelo sincrónico y de bloqueo. A medida que el volumen de tráfico y la diversidad crecieron, la compañía construyó Zuul 2 sobre una arquitectura asincrónica y sin bloqueo basada en Netty, cambiando fundamentalmente el modelo de concurrencia de la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "La lección no es simplemente que lo asincrónico sea superior. La ganancia aparece cuando una gran cantidad de conexiones pasan una parte importante de su tiempo esperando E/S. En este escenario, reservar un subproceso por conexión o solicitud puede aumentar los costos y dificultar el control de la capacidad. La migración también aumenta la complejidad de la programación, la depuración y la propagación del contexto. Netflix necesitaba abordar los filtros, la observabilidad y la compatibilidad operativa dentro del nuevo modelo."
  },
  {
    "kind": "paragraph",
    "text": "Publicaciones posteriores muestran que la optimización continuó. La adopción de la multiplexación HTTP/2 para los orígenes redujo la rotación de conexiones y se implementaron mecanismos priorizados de desconexión de carga en la capa de API Gateway para preservar servicios más importantes durante la sobrecarga. Esto demuestra que el borde no es solo enrutamiento: puede ser un punto estratégico de protección, clasificación del tráfico y contención de fallas."
  },
  {
    "kind": "paragraph",
    "text": "Lección transferible En gateways de gran volumen, mida las conexiones abiertas, la reutilización, las colas, el tiempo bloqueado, la deserción y la saturación antes de elegir el modelo de concurrencia. La arquitectura de E/S debe responder al perfil de tráfico real y la desconexión de carga debe estar definida por la criticidad del negocio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.3 Amazon/AWS: reintentos, idempotencia, aislamiento y estabilidad",
    "id": "39-3-amazon-aws-reintentos-idempotencia-aislamiento-y-estabilidad"
  },
  {
    "kind": "paragraph",
    "text": "La biblioteca de Amazon Builders documenta una visión pragmática de la confiabilidad en los sistemas distribuidos. Los tiempos de espera son necesarios para limitar el trabajo y evitar esperas indefinidas, pero los valores incorrectos producen errores falsos o mantienen los recursos inmovilizados. Los reintentos recuperan fallas transitorias, pero también multiplican la carga precisamente cuando el destino puede degradarse. Por lo tanto, la recomendación combina intentos limitados, retroceso exponencial, jitter y operaciones idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "La idempotencia permite al cliente repetir una solicitud sin duplicar el efecto deseado. En las operaciones de creación o pago, la empresa recomienda identificar la intención de la persona que llama mediante una clave estable y conservar el resultado asociado. Este patrón es más seguro que intentar inferir duplicidad únicamente a partir del contenido. También requiere definir la ventana de retención, el conflicto de parámetros y el comportamiento después del tiempo de espera entre el procesamiento y la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Otros textos describen la desconexión de carga, la estabilidad estática, el aislamiento de dependencias y la fragmentación aleatoria. El principio común es reducir el radio de impacto. Un sistema estáticamente estable continúa funcionando con un estado conocido cuando una dependencia de control deja de estar disponible. La fragmentación aleatoria distribuye a los clientes entre diferentes subconjuntos de recursos, lo que reduce la probabilidad de que dos consumidores compartan exactamente el mismo dominio de error. Estos estándares intercambian la máxima eficiencia por la contención y la previsibilidad."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: La confiabilidad proviene de la combinación de mecanismos, no de un solo reintento.",
    "headers": [
      "Estándar",
      "Problema atacado",
      "Compensación"
    ],
    "rows": [
      [
        "Retroceso + inquietud",
        "Sincronización de reintentos y picos.",
        "Mayor latencia para la recuperación."
      ],
      [
        "Idempotencia",
        "Duplicación de efectos después del reintento.",
        "Reglas adicionales de estado y conflicto."
      ],
      [
        "Deslastre de carga",
        "Colapso por sobrecarga.",
        "Se rechaza parte del tráfico."
      ],
      [
        "fragmentación aleatoria",
        "Radio de explosión entre tenants.",
        "Menos capacidad compartida."
      ],
      [
        "estabilidad estática",
        "Dependencia de control no disponible.",
        "El estado puede estar temporalmente desactualizado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.4 Stripe: API predecibles, control de versiones y limitación de velocidad",
    "id": "39-4-stripe-api-predecibles-control-de-versiones-y-limitacion-de-velocidad"
  },
  {
    "kind": "paragraph",
    "text": "Stripe ha publicado prácticas que tratan la API como una infraestructura a largo plazo. En idempotencia, la empresa propone claves proporcionadas por el cliente para realizar reintentos seguros en las operaciones efectivas. El servidor asocia la clave con una ejecución y devuelve el resultado correspondiente en intentos posteriores. El estándar reduce el riesgo de cargos dobles cuando la red falla después del procesamiento pero antes de que la respuesta llegue al consumidor."
  },
  {
    "kind": "paragraph",
    "text": "En el control de versiones, Stripe describe una estrategia en la que las integraciones permanecen asociadas a versiones compatibles a medida que la plataforma evoluciona. El objetivo es permitir cambios internos y nuevos comportamientos sin forzar una migración coordinada de todos los clientes. Esto requiere una capa capaz de aplicar transformaciones o comportamientos por versión, documentación clara y una gobernanza estricta para evitar una matriz de compatibilidad inmanejable."
  },
  {
    "kind": "paragraph",
    "text": "La empresa también describe múltiples limitadores: limitadores de tasa de solicitudes, limitadores de solicitudes simultáneas, reductores de carga de uso de flota y reductores de carga de utilización de trabajadores. La lección importante es que una única ventana de solicitudes por segundo no protege todas las dimensiones. Una llamada larga puede consumir la competencia; un trabajador específico puede saturarse; una operación puede ser más cara que otra. La protección eficaz combina tarifas, competencia y límites de uso."
  },
  {
    "kind": "paragraph",
    "text": "Patrón Conceptual de Idempotencia POST /v1/pagos Clave de Idempotencia: 7b89f6c2-..."
  },
  {
    "kind": "paragraph",
    "text": "# Repetir la misma intención con la misma clave # debería recuperar el resultado anterior o rechazar # los parámetros incompatibles para la clave existente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.5 Shopify: GraphQL y limitación de costos",
    "id": "39-5-shopify-graphql-y-limitacion-de-costos"
  },
  {
    "kind": "paragraph",
    "text": "Shopify adopta una limitación calculada de costos en su API de administración GraphQL. En lugar de contar cada consulta como una unidad equivalente, el sistema asigna puntos a los campos y conexiones solicitados. La combinación de aplicación y tienda recibe un depósito con capacidad y tasa de restauración. Las consultas más sencillas consumen menos puntos; Las consultas amplias o profundamente conectadas consumen más."
  },
  {
    "kind": "paragraph",
    "text": "Este modelo responde a una característica específica de GraphQL: una misma URL puede representar operaciones con costes muy diferentes. Un límite de tasa tradicional por solicitud no distingue entre una consulta pequeña y una operación que atraviesa miles de objetos. El costo estimado le permite proteger el servidor y, al mismo tiempo, brindar previsibilidad al consumidor. La respuesta informa el costo solicitado, el costo real y el estado del depósito, lo que permite al cliente adaptarse."
  },
  {
    "kind": "paragraph",
    "text": "Shopify también recomienda utilizar operaciones masivas para grandes conjuntos de datos. Esto cambia el trabajo prolongado a la ejecución asincrónica y evita que el cliente intente eludir los límites con una paginación agresiva. La lección transferible es separar las interacciones online de baja latencia de las cargas de trabajo analíticas o masivas, ofreciendo una interfaz adecuada para cada perfil."
  },
  {
    "kind": "paragraph",
    "text": "Lección transferible Cuando el costo de una operación varía mucho, limite por peso o complejidad, no solo por número de solicitudes. Exponer al consumidor a suficiente información para reducir costos o migrar al procesamiento asincrónico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.6 LinkedIn: Kafka como columna vertebral de datos",
    "id": "39-6-linkedin-kafka-como-columna-vertebral-de-datos"
  },
  {
    "kind": "paragraph",
    "text": "Kafka nació en LinkedIn para recopilar y entregar grandes volúmenes de datos con baja latencia. Las publicaciones de la empresa describen la evolución de un entorno que traspasó los límites de un banco centralizado y necesitaba integrar sistemas especializados. La abstracción elegida fue un registro distribuido, particionado y replicado, en el que los productores agregan registros y los consumidores mantienen su propia posición mediante compensaciones."
  },
  {
    "kind": "paragraph",
    "text": "La retención diferencia a Kafka de las tradicionales colas desechables. Los consumidores pueden reprocesar datos, crear nuevos conocimientos y avanzar a velocidades independientes. Las particiones proporcionan paralelismo y ordenación por clave dentro de una partición. Estas propiedades hicieron posible utilizar Kafka como columna vertebral de mensajería, ingesta para procesamiento por lotes y alimentación para sistemas de transmisión."
  },
  {
    "kind": "paragraph",
    "text": "La lección organizativa es tan importante como la técnica. Una columna vertebral central reduce las integraciones punto a punto, pero crea una plataforma crítica que requiere propiedad, capacidad, gobernanza de esquemas, cuotas, aislamiento y operación especializada. Convertir a Kafka en el sistema circulatorio de datos aumenta su importancia y su radio de explosión. La empresa invirtió en el ecosistema y las herramientas del corredor, no solo en el clúster."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.7 Google: SRE, sobrecarga y gRPC",
    "id": "39-7-google-sre-sobrecarga-y-grpc"
  },
  {
    "kind": "paragraph",
    "text": "El modelo de ingeniería de confiabilidad del sitio de Google hizo explícita la relación entre la ingeniería de software y las operaciones. El Libro SRE enfatiza los SLI, SLO, alertas procesables, guías, autopsias y reducción del trabajo. En caso de sobrecarga y fallas en cascada, el material muestra que la capacidad planificada no es suficiente: la pérdida de réplicas, reintentos y colas puede generar retroalimentación positiva y derribar componentes que aún están en buen estado."
  },
  {
    "kind": "paragraph",
    "text": "La respuesta implica protección de múltiples capas: límites de concurrencia, deslastre de carga, contrapresión, tiempos de espera, reintentos controlados y degradación. El seguimiento debe representar la experiencia del usuario y la saturación interna. Una lección recurrente es que el sistema debe rechazar anticipadamente el trabajo cuando no puede cumplirlo, preservando la latencia y la capacidad para las solicitudes aceptadas."
  },
  {
    "kind": "paragraph",
    "text": "En la comunicación entre servicios, gRPC se creó a partir de la experiencia de Google con Stubby, una infraestructura RPC utilizada para conectar una gran cantidad de microservicios. Los contratos mecanografiados, la transmisión por secuencias, los plazos, la verificación del estado y la integración con el rastreo demuestran cómo el protocolo lleva a cabo las prácticas de producción. La ganancia no proviene sólo de la serialización binaria; Proviene de la estandarización del comportamiento entre clientes y servidores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.8 GitHub: versionado por fecha, OpenAPI y SDKs",
    "id": "39-8-github-versionado-por-fecha-openapi-y-sdks"
  },
  {
    "kind": "paragraph",
    "text": "GitHub introdujo el control de versiones por fecha en su API REST para continuar evolucionando el contrato sin sorprender a las integraciones existentes. El consumidor informa la versión deseada en un encabezado y recibe un período de migración para nuevas versiones. Esta elección separa la identidad de la característica de la selección de la versión y convierte la fecha en un hito del comportamiento admitido."
  },
  {
    "kind": "paragraph",
    "text": "La compañía también publicó una descripción OpenAPI de su API REST. Además de la documentación, el contrato ahora permite la generación, validación y automatización. En sus SDK, GitHub describió la sustitución de definiciones de rutas manuales con generación a partir de documentación y descripciones estructuradas. Esto reduce la deriva, pero hace que la calidad del contrato y de la tubería sea una parte crítica del producto."
  },
  {
    "kind": "paragraph",
    "text": "La lección es que el control de versiones y los contratos legibles por máquina deben ir de la mano. Una versión no es sólo un valor en el encabezado: debe reflejarse en la documentación, los ejemplos, el código generado, las pruebas y la telemetría. La automatización reduce el trabajo manual, pero propaga rápidamente errores contractuales; por lo tanto, la validación y la revisión siguen siendo esenciales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.9 Spotify: incidente de descubrimiento de servicios y plataformas internas",
    "id": "39-9-spotify-incidente-de-descubrimiento-de-servicios-y-plataformas-internas"
  },
  {
    "kind": "paragraph",
    "text": "Spotify creó Backstage para unificar herramientas, servicios y documentación en una experiencia coherente para los desarrolladores. El portal le permite localizar la propiedad, crear componentes a partir de plantillas e integrar CI/CD, documentación, recursos en la nube y observabilidad. El problema abordado no era sólo técnico: la autonomía de muchos equipos había producido una fragmentación de las herramientas y dificultad para descubrir quién operaba cada servicio."
  },
  {
    "kind": "paragraph",
    "text": "El valor del caso radica en la idea de la plataforma como un producto interno. Las plantillas y complementos reducen la variabilidad sin eliminar la autonomía. A un desarrollador se le proporciona una ruta estándar para crear servicios, mientras que los equipos de la plataforma mantienen barreras de seguridad, catálogos e integraciones. Esto convierte la gobernanza en una experiencia de usuario, en lugar de depender únicamente de documentos y revisiones manuales."
  },
  {
    "kind": "paragraph",
    "text": "En 2022, Spotify publicó un incidente en el que una interrupción en Traffic Director, combinada con un error en una biblioteca cliente gRPC, afectó el inicio de sesión. El informe destaca fallas compuestas: una dependencia externa se degradó y el comportamiento del cliente amplificó el impacto. La lección es revisar los modos de falla de los planos de descubrimiento y control, probar el respaldo, limitar las dependencias críticas y considerar las bibliotecas compartidas como parte de la arquitectura."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/es/figure-02.svg",
    "alt": "Patrones recurrentes de aislamiento, control, evolución y observabilidad.",
    "caption": "Figura 2: El aislamiento, el control, la evolución y la observabilidad aparecen repetidamente porque abordan propiedades fundamentales de los sistemas distribuidos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.10 Comparación transversal de casos",
    "id": "39-10-comparacion-transversal-de-casos"
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Cambios tecnológicos; Se repiten los mecanismos de control y gobernanza.",
    "headers": [
      "Empresa",
      "Problema central",
      "Patrón principal",
      "Cuidado de transferencia"
    ],
    "rows": [
      [
        "Netflix",
        "Borde de gran volumen.",
        "E/S asíncronas, H2 y deslastre de carga.",
        "Complejidad del modelo reactivo."
      ],
      [
        "Amazon/AWS",
        "Fallas transitorias y sobrecarga.",
        "Jitter, idempotencia, aislamiento y estabilidad.",
        "Más estatus y capacidad reservada."
      ],
      [
        "Stripe",
        "API financiera a largo plazo.",
        "Idempotencia, versionado y limitadores múltiples.",
        "Matriz de compatibilidad."
      ],
      [
        "Shopify",
        "Consultas GraphQL heterogéneas.",
        "Límite de tarifas por coste y operaciones masivas.",
        "El cálculo de costes debe ser transparente."
      ],
      [
        "LinkedIn",
        "Integración de datos a escala.",
        "Registro distribuido y ecosistema Kafka.",
        "La columna vertebral se convierte en infraestructura crítica."
      ],
      [
        "Google",
        "Operación confiable y RPC estandarizado.",
        "SLO, deslastre de carga, plazos y gRPC.",
        "Requiere cultura y herramientas."
      ],
      [
        "GitHub",
        "Evolución segura de API pública.",
        "Versión por fecha y contratos OpenAPI.",
        "La automatización propaga errores de contrato."
      ],
      [
        "Spotify",
        "Fragmentación interna y dependencias.",
        "Portal de desarrolladores y análisis de incidencias.",
        "El portal no reemplaza la propiedad real."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.11 Aplicación en arquitecturas bancarias",
    "id": "39-11-aplicacion-en-arquitecturas-bancarias"
  },
  {
    "kind": "paragraph",
    "text": "Los entornos bancarios comparten varias propiedades con los casos: alto volumen, operaciones con uso intensivo de efectivo, integraciones heredadas, múltiples consumidores, requisitos regulatorios y baja tolerancia a la inconsistencia. La aplicación más directa es la idempotencia en pagos, transferencias e iniciaciones. Una clave debe representar la intención del consumidor y verificarse con parámetros relevantes, evitando la duplicación sin enmascarar solicitudes realmente diferentes."
  },
  {
    "kind": "paragraph",
    "text": "En el borde, las lecciones de Netflix, Stripe y Shopify ayudan a diseñar API Gateways con límites de importancia, competencia y costo. Las API de saldo, pago y autenticación no deben competir cara a cara con las consultas analíticas. La reducción de carga y las prioridades deben definirse con la empresa, acompañadas de respuestas predecibles y observabilidad que muestre quién fue rechazado y por qué."
  },
  {
    "kind": "paragraph",
    "text": "Para los datos y la integración, la experiencia de LinkedIn demuestra el valor de un registro de eventos, pero los bancos necesitan agregar esquemas rigurosos de gobernanza, retención, cifrado, conciliación y segregación. El caso de Spotify refuerza la importancia del catálogo, la propiedad y los caminos estandarizados. El modelo de Google muestra que los SLO, los manuales de estrategias y las autopsias deben ser parte de la operación diaria, no una actividad ocasional después de incidentes importantes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/es/figure-03.svg",
    "alt": "Flujo de adopción de una lección por hipótesis, experimento y gobernanza.",
    "caption": "Figura 3 - Un caso sólo debería convertirse en un estándar después de la hipótesis, el experimento y la gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "El primer antipatrón es el escalamiento imaginario: adoptar docenas de componentes porque una empresa global los usa, incluso si el volumen, el personal y los requisitos locales no lo justifican. Cada servicio adicional crea conocimiento operativo, de implementación, de parches, de observabilidad, de respaldo y de seguridad. La complejidad sólo debe adquirirse cuando resuelve una restricción medida."
  },
  {
    "kind": "paragraph",
    "text": "El segundo antipatrón es copiar el componente e ignorar el ecosistema. Kafka sin gobernanza, malla de servicios sin observabilidad, API Gateway sin planificación de capacidad y portal de desarrollador sin propiedad se convierten en escaparates. Las grandes empresas suelen invertir en bibliotecas, plantillas, pruebas, operaciones y equipos especializados en torno a la tecnología central."
  },
  {
    "kind": "paragraph",
    "text": "El tercer antipatrón es copiar el estado final. Las publicaciones muestran una arquitectura después de años de evolución. La organización de lectores necesita construir un camino incremental, con métricas y reversibilidad. El mejor resultado puede ser simplemente adoptar el principio (como el de idempotencia, aislamiento o catálogo) con una implementación más sencilla."
  },
  {
    "kind": "paragraph",
    "text": "Regla de transferencia Copie primero el problema, luego el mecanismo y sólo por último la tecnología. Si el problema local no produce la misma presión arquitectónica, probablemente la solución no debería ser la misma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Los casos muestran que las grandes plataformas evolucionan debido a presiones concretas: conexiones excesivas, fallas transitorias, contratos a largo plazo, consultas de costos variables, integración de datos, sobrecarga, fragmentación de herramientas y dependencias de control. Las respuestas combinan arquitectura, operaciones y gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "Netflix destaca la ventaja como punto de protección y competencia. Amazon destaca la idempotencia, la inquietud, el aislamiento y la estabilidad. Stripe y GitHub tratan las API como contratos duraderos. Shopify demuestra una limitación basada en costos. LinkedIn muestra el poder y el riesgo de una columna vertebral de eventos. Google conecta SRE y RPC estandarizado. Spotify muestra una plataforma interna y un aprendizaje transparente de los incidentes."
  },
  {
    "kind": "paragraph",
    "text": "La principal habilidad es no memorizar los nombres de los productos. Implica reconocer mecanismos: reducir el radio de la explosión, rechazar temprano, hacer que los reintentos sean seguros, desarrollar contratos, medir costos, estandarizar interfaces y transformar operaciones en ingeniería. Estos mecanismos se pueden implementar de diferentes maneras según el contexto."
  },
  {
    "kind": "paragraph",
    "text": "El capítulo prepara el proyecto final, en el que el lector debe combinar los principios del curso en una plataforma API completa. Los casos funcionan como un repertorio para justificar decisiones, pero cada elección de proyecto deberá declarar el contexto, las compensaciones, la evidencia y el plan operativo."
  },
  {
    "kind": "paragraph",
    "text": "El siguiente paso del curso, el Capítulo 40, consolida toda la capacitación en un proyecto final: diseñar y justificar una plataforma API completa, que incluye arquitectura, seguridad, gobernanza, observabilidad, operación y evolución."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación para analizar nuevos casos",
    "id": "lista-de-verificacion-para-analizar-nuevos-casos"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿La fuente es primaria e identifica fecha, autores y contexto?",
      "¿Son explícitos el problema, la escala y las limitaciones?",
      "¿La solución resuelve un mecanismo conocido o simplemente introduce tecnología?",
      "¿Se han considerado los costos, límites y fallas restantes?",
      "¿La arquitectura sigue vigente o ha sido reemplazada?",
      "¿Existe evidencia de resultados más allá de la percepción cualitativa?",
      "¿Tiene el entorno local el mismo perfil de carga, riesgo y madurez?",
      "¿Es posible probar la lección a pequeña escala y con reversión?",
      "¿Se incluyen propiedad, observabilidad, seguridad y operación?",
      "¿La decisión interna registra por qué el caso es aplicable y dónde no?"
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
      "Explique por qué la migración de Zuul a E/S asíncrona no se debe copiar sin medir el perfil de espera y concurrencia.",
      "Diseñe una política de reintento con tiempo de espera, retroceso, fluctuación e idempotencia para una API de pagos.",
      "Compare las versiones de Stripe y GitHub y proponga una política para una API de banca pública.",
      "Modele un límite de tasa por costo para una API GraphQL de extracción.",
      "Explique qué controles adicionales serían necesarios para utilizar Kafka como columna vertebral de un banco.",
      "Relacione la reducción de carga de Google y Netflix con clases prioritarias en API Gateway.",
      "Proponer un catálogo interno inspirado en Backstage con propiedad, OpenAPI, SLO y runbook.",
      "Elija un caso del capítulo y escriba un experimento de adopción con métricas de éxito y reversión.",
      "Enumere tres aspectos inéditos que podrían cambiar su decisión arquitectónica.",
      "Construya una matriz de transferencia con contexto, beneficio, riesgo, requisitos previos y evidencia."
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
    "caption": "Tabla 4 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "radio de explosión",
        "Conjunto de usuarios, servicios o datos afectados por un fallo."
      ],
      [
        "Estudio de caso",
        "Informe contextualizado de problema, decisión y resultado."
      ],
      [
        "celular",
        "Unidad aislada de capacidad y falla que atiende al subconjunto de carga de trabajo."
      ],
      [
        "Developer portal",
        "Interfaz que reúne catálogo, plantillas, documentación y herramientas internas."
      ],
      [
        "flota",
        "Conjunto de instancias que realizan la misma función."
      ],
      [
        "Deslastre de carga",
        "Rechazo controlado de obra para preservar el sistema."
      ],
      [
        "Contratos legibles por máquina",
        "Contrato estructurado interpretable por herramientas, como OpenAPI."
      ],
      [
        "post mortem",
        "Análisis estructurado de incidentes con enfoque en el aprendizaje y la prevención."
      ],
      [
        "fragmentación aleatoria",
        "Aislamiento por subconjuntos de recursos parcialmente superpuestos."
      ],
      [
        "estabilidad estática",
        "Capacidad de continuar operando con un estado conocido cuando fallan las dependencias de control."
      ],
      [
        "Sesgo de supervivencia",
        "Tendencia a observar únicamente soluciones que han sido publicadas o mantenidas."
      ],
      [
        "Transferibilidad",
        "Grado en el que una lección se puede aplicar a otro contexto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias técnicas y casos primarios.",
    "id": "referencias-tecnicas-y-casos-primarios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Blog de tecnología de Netflix. Anuncio de Zuul: servicio perimetral en la nube.",
      "Blog de tecnología de Netflix. Zuul 2: El viaje de Netflix hacia sistemas asíncronos y sin bloqueo.",
      "Blog de tecnología de Netflix. Frenar la rotación de conexiones en Zuul.",
      "Blog de tecnología de Netflix. Mejora de la confiabilidad de Netflix con deslastre de carga priorizado a nivel de servicio.",
      "Biblioteca de constructores de Amazon. Tiempos de espera, reintentos y retrocesos con jitter.",
      "Biblioteca de constructores de Amazon. Hacer que los reintentos sean seguros con API idempotentes.",
      "Biblioteca de constructores de Amazon. Utilizar deslastre de carga para evitar sobrecargas.",
      "Biblioteca de constructores de Amazon. Estabilidad estática mediante zonas de disponibilidad.",
      "Biblioteca de constructores de Amazon. Aislamiento de cargas de trabajo mediante fragmentación aleatoria.",
      "Ingeniería de rayas. Diseño de API robustas y predecibles con idempotencia.",
      "Ingeniería de rayas. API como infraestructura: Stripe preparado para el futuro con control de versiones.",
      "Ingeniería de rayas. Escalando su API con limitadores de velocidad.",
      "Desarrolladores de Shopify. Límites de tasa de API y costo de consulta calculado por GraphQL.",
      "Ingeniería de LinkedIn. Kafka en LinkedIn: presente y futuro; Ejecutando Kafka a escala.",
      "Google SREBook. Monitoreo de Sistemas Distribuidos; Manejo de sobrecarga; Abordar fallas en cascada.",
      "Autores de gRPC. Sobre gRPC y sus orígenes en Google Stubby.",
      "Blog de GitHub. Habilitando el futuro de la API REST de GitHub con control de versiones de API.",
      "Blog de GitHub. Presentamos la descripción de GitHub OpenAPI; Nuestro paso a los SDK generados.",
      "Ingeniería de Spotify. ¿Qué diablos hay detrás del escenario de todos modos?; Cómo utilizamos Backstage en Spotify.",
      "Ingeniería de Spotify. Informe de incidente: interrupción de Spotify el 8 de marzo de 2022."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota metodológica Los casos se construyeron únicamente con información pública y primaria. No representan la arquitectura completa o actual de cada empresa. Antes de utilizar cualquier lección como plantilla, valide la fecha, el contexto y la documentación más reciente."
  }
];
