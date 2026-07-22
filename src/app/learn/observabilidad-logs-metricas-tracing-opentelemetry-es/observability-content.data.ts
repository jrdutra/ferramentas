import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OBSERVABILITY_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Observabilidad: correlación de señales para explicar el comportamiento real."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/overview.svg",
    "alt": "Registros, métricas y traces que convergen en un contexto compartido",
    "caption": "Figura de apertura: los registros, las métricas y los traces ganan valor cuando comparten contexto y semántica."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Los signos aislados muestran síntomas; La correlación por contexto permite reconstruir la causa, el impacto y las dependencias."
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
    "text": "Los capítulos anteriores han demostrado que una transacción API puede atravesar DNS, balanceadores, API Gateways, mallas de servicios, servicios, bancos y sistemas de mensajería. Cuando algo falla, ningún componente ve el recorrido completo. La observabilidad es la disciplina que transforma las señales emitidas por estos componentes en la capacidad de comprender el estado interno del sistema, reconstruir la causalidad y evaluar el impacto para los consumidores y los procesos comerciales."
  },
  {
    "kind": "paragraph",
    "text": "Los registros, las métricas y el trace distribuido a menudo se denominan pilares de la observabilidad. La expresión es útil, pero puede dar lugar a una interpretación fragmentada. El valor no está en almacenar tres tipos de datos en diferentes herramientas; es correlacionarlos por identidad del servicio, entorno, versión, solicitud, trace y contexto empresarial. Una métrica indica que la latencia ha aumentado, un trace localiza el paso responsable y un registro explica el error específico."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry proporciona API, SDK, convenciones semánticas, protocolos y un Collector independiente del proveedor para producir, procesar y exportar telemetría. No reemplaza el backend de observabilidad. Su función es estandarizar la instrumentación y el transporte, reduciendo la dependencia de agentes propietarios y permitiendo enviar señales consistentes a diferentes destinos."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo profundiza en la teoría de la observabilidad, el diseño de registros y métricas, la anatomía de trazas y spans, propagación de contexto, OTLP, Collector, convenciones semánticas, sampling, ejemplos, SLO, seguridad, control de cardinalidad y troubleshooting. La atención se centra en las API empresariales, las API Gateways y las arquitecturas distribuidas."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Elija un único recorrido empresarial (por ejemplo, crear un pago) y realice un trace de cómo aparece en las tres señales. Pregunte qué identidad describe el servicio, cómo el contexto atraviesa cada salto, qué atributos son estables y cómo cambiaría el diagnóstico si faltara una de las señales."
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
      "Diferenciar entre monitorización, telemetría, observabilidad, diagnóstico y auditoría.",
      "Diseñe registros estructurados, métricas útiles y traces distribuidos con un contexto coherente.",
      "Explique el trace, la extensión, el contexto de la extensión, el recurso, el evento, el enlace, el estado y el baggage.",
      "Comprenda el contexto de trace del W3C, traceparent, tracestate y propagación entre protocolos.",
      "Describir API, SDK, instrumentación automática, OTLP y OpenTelemetry Collector.",
      "Aplicar convenciones semánticas y controlar atributos de alta cardinalidad.",
      "Compare el head sampling, el parent-based sampling y el tail sampling.",
      "Relacione muestras, registros y trazas con métricas y SLO.",
      "Diseñar ductos resilientes, seguros y económicamente sustentables.",
      "Diagnosticar fallas de instrumentación y brechas de correlación en API Gateways y microservicios."
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
      "32.1 Observabilidad, trace y telemetría",
      "32.2 Señales y correlación",
      "32.3 Registros estructurados",
      "32.4 Métricas y cardinalidad",
      "32.5 Tracing distribuido y vanos",
      "32.6 Propagación del contexto y baggage",
      "32.7 OpenTelemetry: API, SDK e instrumentación",
      "32.8 OTLP y Collector OpenTelemetry",
      "32.9 Convenciones y recursos semánticos",
      "32.10 Sampling y exemplars",
      "32.11 SLI, SLO, alertas y paneles",
      "32.12 Observabilidad en gateways, Kubernetes y mensajería",
      "32.13 Seguridad, privacidad, costos y troubleshooting",
      "Resumen, lista de verificación, laboratorios, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.1 Observabilidad, trace y telemetría",
    "id": "32-1-observabilidad-trace-y-telemetria"
  },
  {
    "kind": "paragraph",
    "text": "La telemetría es el conjunto de datos emitidos por el sistema: registros de eventos, mediciones, trazas, perfiles y otras señales. La monitorización utiliza parte de estos datos para monitorear condiciones conocidas, comparar valores con límites y activar alertas. La observabilidad es una propiedad más amplia: la capacidad de inferir el estado interno y responder preguntas novedosas a partir de señales externas disponibles."
  },
  {
    "kind": "paragraph",
    "text": "Un sistema puede ser monitoreado intensamente y aun así ser poco observable. Docenas de paneles de CPU, memoria y disponibilidad no explican por qué solo los consumidores de una región reciben 502 cuando consultan un backend específico. La observabilidad requiere contexto, correlación, granularidad adecuada y una arquitectura de datos que le permita navegar desde los síntomas agregados hasta la evidencia individual."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría tiene un objetivo diferente. Un registro de auditoría registra acciones relevantes para la seguridad y el cumplimiento, preservando la autoría, la integridad y la retención. Puede participar en investigaciones, pero no debe confundirse con el registro de diagnóstico. Combinar los dos usos genera demasiados datos confidenciales en las herramientas operativas o pistas de auditoría incompletas."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Los conceptos se complementan, pero cumplen objetivos diferentes.",
    "headers": [
      "Concepto",
      "pregunta principal",
      "Ejemplo"
    ],
    "rows": [
      [
        "Telemetria",
        "¿Qué señales envió el sistema?",
        "Registros, métricas, traces y perfiles."
      ],
      [
        "Monitoreo",
        "¿Ocurrió alguna condición conocida?",
        "Tasa de error por encima del umbral."
      ],
      [
        "Observabilidad",
        "¿Qué explica este comportamiento?",
        "Correlacione ruta, versión, backend y trace."
      ],
      [
        "Auditoría",
        "¿Quién hizo qué, cuándo y bajo qué autoridad?",
        "Cambio de política o acceso a datos sensibles."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.2 Registros, métricas y trazas como señales correlacionadas",
    "id": "32-2-registros-metricas-y-trazas-como-senales-correlacionadas"
  },
  {
    "kind": "paragraph",
    "text": "Los registros registran eventos discretos con un contexto detallado. Las métricas representan mediciones agregadas y son poderosas para tendencias, alertas y capacidad. Las huellas representan el camino causal de una operación a través de procesos y servicios. Cada señal tiene diferentes costos, modelos de consulta y granularidades; Ninguno de ellos es suficiente para todos los diagnósticos."
  },
  {
    "kind": "paragraph",
    "text": "La correlación depende de atributos comunes. El recurso identifica la entidad que produjo la telemetría, como servicio, instancia, pod, clúster y entorno. Trace ID y Span ID conectan registros a una ejecución específica. Los atributos semánticos estandarizan conceptos como método HTTP, ruta, sistema de mensajería, base de datos y código de error. Sin coherencia, los paneles y las consultas se convirtieron en conjuntos de excepciones por equipo."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry también trata el baggage y los perfiles como señales o mecanismos adyacentes. Baggage propaga pares clave-valor a través del contexto distribuido; Los perfiles registran el uso de recursos a nivel de código y están evolucionando en el ecosistema. En este capítulo, la atención se centra en las tres señales más presentes en las API, sin ignorar que la arquitectura moderna puede correlacionarlas con otros datos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/figure-01-signals.svg",
    "alt": "Registros, métricas y traces correlacionados por contexto compartido",
    "caption": "Figura 1: Las señales adquieren valor operativo cuando describen la misma entidad y el mismo viaje."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.3 Registros estructurados y eventos operativos",
    "id": "32-3-registros-estructurados-y-eventos-operativos"
  },
  {
    "kind": "paragraph",
    "text": "Un registro estructurado representa el evento como campos escritos o pares clave-valor, normalmente serializados en JSON o en el formato nativo del agente. En lugar de simplemente escribir \"pago fallido\", el registro incluye marca de tiempo, gravedad, servicio, entorno, versión, operación, código de error, trace_id, span_id e identificadores comerciales permitidos. Este marco mejora el filtrado, la agregación y la correlación automáticos."
  },
  {
    "kind": "paragraph",
    "text": "La gravedad debe reflejar la capacidad de acción. DEBUG y TRACE ayudan en entornos controlados; INFO registra eventos operativos relevantes; ADVERTENCIA indica degradación o condición inesperada que no interrumpió la operación; ERROR registra el fracaso de una acción; FATAL o equivalente indica incapacidad para continuar. Registrar cada excepción como ERROR crea ruido y destruye el valor de la alerta."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben evitar datos personales, tokens, cookies, secretos, cargas útiles completas y números financieros innecesarios. Un mayor enmascaramiento no es una defensa suficiente, porque es posible que los datos ya hayan sido transportados o persistan. El diseño correcto comienza en el origen, con lista de campos permitidos, clasificación de datos, retención proporcional y acceso restringido."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de un evento estructurado y correlacionable"
  },
  {
    "kind": "code",
    "text": "{\n  \"timestamp\": \"2026-07-16T11:42:31.052Z\",\n  \"severity\": \"ERROR\",\n  \"service.name\": \"pagos-api\",\n  \"deployment.environment.name\": \"produccion\",\n  \"http.route\": \"/pagos/{id}/confirmacion\",\n  \"error.type\": \"BackendTimeout\",\n  \"trace_id\": \"4bf92f3577b34da6a3ce929d0e0e4736\",\n  \"span_id\": \"00f067aa0ba902b7\"\n}"
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los registros útiles se elaboran como contrato operativo.",
    "headers": [
      "Buena practica",
      "Razón",
      "Antipatrón"
    ],
    "rows": [
      [
        "Campos estables",
        "Habilite consultas y alertas reutilizables.",
        "Mensajes gratis con diferentes formatos."
      ],
      [
        "Marca de tiempo confiable",
        "Ordena eventos y facilita la correlación.",
        "Relojes divergentes sin sincronización."
      ],
      [
        "Trace y distribución de ID",
        "Conecte el evento al trace.",
        "ID de correlación creado solo en un servicio."
      ],
      [
        "Escribiendo en la fuente",
        "Previene la exposición de secretos y PII.",
        "Elimine datos solo en el backend de registros."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.4 Métricas, instrumentos, agregaciones y cardinalidad",
    "id": "32-4-metricas-instrumentos-agregaciones-y-cardinalidad"
  },
  {
    "kind": "paragraph",
    "text": "Las métricas representan observaciones numéricas agregadas a lo largo del tiempo. Los contadores acumulan eventos, como solicitudes y errores. Los histogramas distribuyen valores, como la duración y el tamaño de la carga útil, en rangos o representaciones adecuadas para el backend. Los indicadores registran un valor actual, como conexiones abiertas o profundidad de la cola. UpDownCounters representan cantidades que aumentan y disminuyen."
  },
  {
    "kind": "paragraph",
    "text": "La elección del instrumento define cómo se puede agregar la medición. La duración de una solicitud no debe registrarse simplemente como un promedio, porque el promedio oculta las colas. Los histogramas te permiten consultar percentiles y distribución. Aun así, los percentiles agregados incorrectamente pueden producir conclusiones erróneas; Es necesario comprender el modelo de backend y la ventana de tiempo."
  },
  {
    "kind": "paragraph",
    "text": "La cardinalidad es el número de combinaciones distintas de atributos. Agregar user_id, order_id, URL completa o trace_id como etiqueta de métrica crea series casi ilimitadas, aumenta la memoria y el costo y puede bloquear la canalización. Las métricas deben utilizar dimensiones limitadas y estables, como ruta normalizada, método, clase de estado, región y versión. La evidencia individual permanece en registros o rastros."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - El instrumento debe representar la semántica de la medición.",
    "headers": [
      "Instrumento/formulario",
      "Uso típico",
      "Ejemplo en API"
    ],
    "rows": [
      [
        "Counter",
        "Eventos que sólo crecen.",
        "Solicitudes, errores y reintentos."
      ],
      [
        "Histogram",
        "Distribución de valores.",
        "Duración, tamaño de la solicitud y cola."
      ],
      [
        "Gauge",
        "Valor observado en este momento.",
        "Abra las conexiones WebSocket."
      ],
      [
        "UpDownCounter",
        "Cantidad que sube y baja.",
        "Operaciones en curso."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "regla de cardinalidad"
  },
  {
    "kind": "paragraph",
    "text": "Los atributos de métricas deben responder preguntas agregadas. Los identificadores prácticamente únicos pertenecen a registros y traces. Antes de agregar una dimensión, calcule cuántos valores diferentes puede tomar por entorno, servicio y ventana de retención."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.5 Tracing distribuido, traces y spans",
    "id": "32-5-tracing-distribuido-traces-y-spans"
  },
  {
    "kind": "paragraph",
    "text": "Un trace representa una operación distribuida, como una llamada API que cruza la API Gateway, el servicio, la mensajería y el banco. Cada paso está representado por un span, con nombre, intervalo de tiempo, contexto, atributos, eventos, estado y relaciones con otros spans. El marco le permite observar la latencia total, la ruta crítica y las dependencias activadas."
  },
  {
    "kind": "paragraph",
    "text": "SpanKind describe el rol del span como SERVIDOR, CLIENTE, PRODUCTOR, CONSUMIDOR o INTERNO. La clasificación le ayuda a comprender los límites y calcular métricas a partir de traces. Los eventos registran ocurrencias específicas dentro del span, como excepción. Los enlaces relacionan spans que no tienen una única jerarquía padre-hijo, una situación común en el procesamiento asincrónico y distribuido."
  },
  {
    "kind": "paragraph",
    "text": "El nombre del span debe tener una cardinalidad baja y reflejar la operación, no el identificador concreto. En HTTP, es preferible una ruta normalizada a la URL completa. En la mensajería, el nombre del destino y la operación ayudan a reconstruir la producción y el consumo. El rastro no debe transformarse en un almacenamiento indiscriminado de cargas útiles; Los atributos y eventos obedecen las mismas reglas de privacidad que los registros."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/figure-02-trace.svg",
    "alt": "Trace distribuido que descompone la latencia entre API Gateway, servicio y dependencias",
    "caption": "Figura 2: un trace muestra la descomposición de la latencia y la ruta crítica de la transacción."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.6 Propagación de contexto, contexto de trace del W3C y baggage",
    "id": "32-6-propagacion-de-contexto-contexto-de-trace-del-w3c-y-baggage"
  },
  {
    "kind": "paragraph",
    "text": "Para que spans de diferentes procesos pertenezcan al mismo trace, el contexto debe cruzar el límite de la red. El contexto de trace del W3C estandariza los headers traceparent y tracestate para HTTP. traceparent lleva versión, ID de trace, ID de padre y banderas. tracestate transporta información específica del proveedor de forma interoperable. Las instrumentaciones deben extraer el contexto entrante e inyectarlo en las llamadas salientes."
  },
  {
    "kind": "paragraph",
    "text": "En gRPC, mensajería y protocolos propietarios, los metadata o las propiedades del mensaje aplican el mismo principio. La propagación debe respetar los límites de confianza: aceptar identificaciones externas sin validación o copiar todo el baggage a sistemas internos puede generar abusos, fugas y una mayor carga útil."
  },
  {
    "kind": "paragraph",
    "text": "El baggage lleva el contexto de la aplicación en pares clave-valor. No deberá transportar secretos, datos personales o información de alta cardinalidad sin justificación. Como puede atravesar muchos servicios, un pequeño campo se multiplica por todo el recorrido. El baggage tampoco sustituye a la autorización; la aplicación no debe confiar en un reclamo propagado solo porque llegó al contexto."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de contexto distribuido"
  },
  {
    "kind": "code",
    "text": "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\ntracestate: vendorname=opaque-value\nbaggage: tenant.tier=premium,region.origin=br-south"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.7 OpenTelemetry: API, SDK e instrumentación",
    "id": "32-7-opentelemetry-api-sdk-e-instrumentacion"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separa API y SDK. La API es utilizada por bibliotecas y aplicaciones para crear instrumentos sin depender de una implementación específica. El SDK implementa sampling, procesamiento, agregación y exportación. Esta separación permite instrumentar una biblioteca sin necesidad de que el consumidor envíe datos a un proveedor específico."
  },
  {
    "kind": "paragraph",
    "text": "La instrumentación manual es adecuada para operaciones comerciales y secciones que la instrumentación genérica no comprende. La autoinstrumentación utiliza agentes, código de bytes, parches de mono, eBPF o mecanismos equivalentes para capturar marcos y bibliotecas con pocos cambios de código. La combinación suele ser superior: automática para cobertura de infraestructura y manual para semántica empresarial."
  },
  {
    "kind": "paragraph",
    "text": "Instrumentar no significa generar tantos datos como sea posible. Cada span, atributo, registro y serie tiene un costo. El equipo debe definir una estrategia de telemetría: qué viajes son críticos, qué atributos se requieren, qué convenciones son estables, qué señales se derivarán y cómo se probará la instrumentación junto con el código."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: OpenTelemetry separa el contrato de instrumentación y la ejecución del canal.",
    "headers": [
      "Componente",
      "Responsabilidad",
      "Ejemplo"
    ],
    "rows": [
      [
        "API",
        "Superficie utilizada por la instrumentación.",
        "API de rastreador, medidor y registrador."
      ],
      [
        "SDK",
        "Procesa y exporta la señal.",
        "Sampler, SpanProcessor y MetricReader."
      ],
      [
        "Biblioteca de instrumentación",
        "Captura un marco o biblioteca.",
        "Cliente HTTP, JDBC, gRPC o Kafka."
      ],
      [
        "Auto-instrumentación",
        "Aplica instrumentación sin grandes cambios de código.",
        "Agente Java o mecanismo equivalente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.8 OTLP y Collector OpenTelemetry",
    "id": "32-8-otlp-y-collector-opentelemetry"
  },
  {
    "kind": "paragraph",
    "text": "OTLP es el protocolo nativo de OpenTelemetry para transportar telemetría. Puede operar a través de gRPC o HTTP y tiene plantillas para traces, métricas y registros. El protocolo reduce la necesidad de diferentes formatos por proveedor, pero no elimina las decisiones de red, la autenticación, la compresión, las colas, los reintentos y la protección contra pérdidas."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry Collector recibe, procesa y exporta telemetría. Los receptores aceptan OTLP y otros formatos. Los procesadores aplican procesamiento por lotes, filtrado, transformación, enriquecimiento, sampling y protección de la memoria. Los exportadores envían datos a los backends. Las extensiones proporcionan capacidades auxiliares, como controles de estado y autenticación. Las pipelines se declaran mediante letrero."
  },
  {
    "kind": "paragraph",
    "text": "El Collector se puede implementar como un agente cercano a la aplicación, una API Gateway central por clúster o región, o una combinación en capas. El patrón del agente reduce los saltos y recopila datos locales; El patrón de API Gateway centraliza el procesamiento y las credenciales de backend. El diseño debe considerar la disponibilidad, las colas persistentes, el aislamiento por tenant, la escalabilidad y el riesgo de convertir al Collector en un único punto de falla."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/figure-03-collector.svg",
    "alt": "OpenTelemetry Collector procesa señales entre receptores, procesadores y exportadores",
    "caption": "Figura 3: Collector desacopla las aplicaciones de los backends y aplica el procesamiento en canalizaciones."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de resumen de canalización de Collector"
  },
  {
    "kind": "code",
    "text": "receivers:\n  otlp:\n    protocols:\n      grpc: {}\n      http: {}\nprocessors:\n  memory_limiter:\n    limit_mib: 1024\n  batch: {}\nexporters:\n  otlp/backend:\n    endpoint: observabilidad.internal:4317\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, batch]\n      exporters: [otlp/backend]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.9 Convenciones semánticas, gobernanza de recursos y atributos",
    "id": "32-9-convenciones-semanticas-gobernanza-de-recursos-y-atributos"
  },
  {
    "kind": "paragraph",
    "text": "Las convenciones semánticas definen nombres, tipos y significados comunes para atributos, nombres de spans, métricas y unidades. Sin estas convenciones, cada equipo podría registrar un método HTTP como método, httpMethod o verbo, haciendo inviables los paneles corporativos. La estandarización permite consultar servicios escritos en diferentes idiomas con una misma lógica."
  },
  {
    "kind": "paragraph",
    "text": "El recurso describe la entidad que produjo la telemetría. Atributos como nombre.servicio, versión.servicio, nombre.entorno.despliegue, host, contenedor y Kubernetes le ayudan a localizar el origen. El recurso no debe confundirse con los atributos de operación: service.name describe al issuer; http.route describe la solicitud."
  },
  {
    "kind": "paragraph",
    "text": "No todas las convenciones semánticas tienen el mismo nivel de estabilidad. La gobernanza debe registrar la versión adoptada, realizar un trace de los cambios experimentales y evitar cambios de nombre silenciosos. Tel Weaver y las herramientas de esquema pueden ayudar a las organizaciones a validar contratos de telemetría, pero la disciplina comienza con un catálogo claro de atributos permitidos."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Las convenciones semánticas hacen que la telemetría sea interoperable.",
    "headers": [
      "Categoría",
      "Ejemplos de atributos",
      "Precaución"
    ],
    "rows": [
      [
        "Resource",
        "nombre.servicio, versión.servicio, k8s.cluster.name",
        "Valores estables por entidad."
      ],
      [
        "HTTP",
        "http.solicitud.método, http.ruta, http.respuesta.código de estado",
        "Utilice ruta normalizada."
      ],
      [
        "RPC",
        "rpc.sistema, rpc.servicio, rpc.método",
        "Vigilar la estabilidad de la convención."
      ],
      [
        "Mensajería",
        "sistema.de.mensajería, destino y funcionamiento",
        "Evite identificaciones únicas como etiquetas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.10 Sampling, pérdida controlada y conservación de trazas útiles",
    "id": "32-10-sampling-perdida-controlada-y-conservacion-de-trazas-utiles"
  },
  {
    "kind": "paragraph",
    "text": "El sampling reduce el volumen de trazas. El head sampling se decide al principio, utilizando la probabilidad, el contexto principal o las reglas locales. Es barato y rápido, pero no sabes el resultado final. Se puede descartar un error poco común antes de que suceda. El sampling basado en padres ayuda a mantener la coherencia entre los intervalos secundarios y la decisión de trace."
  },
  {
    "kind": "paragraph",
    "text": "El tail sampling se decide después de reunir suficientes spans en el Collector o en el backend. Puede conservar rastros con errores, alta latencia o atributos específicos. Por otro lado, requiere memoria, espera, enrutamiento consistente de spans de la misma traza y planificación de capacidad. Una implementación distribuida sin afinidad de trace puede tomar decisiones incompletas."
  },
  {
    "kind": "paragraph",
    "text": "La política debe reflejar objetivos: mantener el 100 % de errores, trazas por encima del SLO, muestras representativas por ruta y un pequeño porcentaje de tráfico saludable. El sampling no corrige la telemetría mal diseñada. Incluso los traces descartados pueden contribuir a las métricas derivadas, según el punto en el que se produce la agregación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/figure-04-sampling.svg",
    "alt": "Comparación entre head sampling y tail sampling.",
    "caption": "Figura 4: El head sampling y cola tiene diferentes costos y capacidades de decisión."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.11 Ejemplares y correlación entre métricas, registros y traces",
    "id": "32-11-ejemplares-y-correlacion-entre-metricas-registros-y-traces"
  },
  {
    "kind": "paragraph",
    "text": "Ejemplar asocia una observación métrica con un rastro o contexto representativo. Al observar un depósito de alta latencia, el operador puede abrir un rastro real que contribuyó a ese valor. Esta navegación reduce el salto entre la vista agregada y la evidencia individual, especialmente en incidentes de cola de latencia."
  },
  {
    "kind": "paragraph",
    "text": "Los registros también pueden contener trace_id y span_id. La correlación ideal le permite navegar desde una alerta a la serie, desde la serie a un ejemplo, desde el ejemplo a la traza y desde el intervalo a los registros de la misma ejecución. Esta experiencia se basa en una instrumentación consistente, sincronización horaria, retención compatible e integración entre backends."
  },
  {
    "kind": "paragraph",
    "text": "La correlación no debe utilizarse para copiar todos los datos de todas las señales. Las métricas permanecen agregadas; las huellas siguen siendo selectivas; los registros continúan los eventos. El objetivo es mantener claves de navegación y semántica comunes, preservando las ventajas económicas y operativas de cada modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.12 SLI, SLO, presupuesto de errores y alertas",
    "id": "32-12-sli-slo-presupuesto-de-errores-y-alertas"
  },
  {
    "kind": "paragraph",
    "text": "SLI es una medida del comportamiento observado, como la proporción de solicitudes válidas que se completan exitosamente por debajo de un umbral de latencia. SLO establece el objetivo en una ventana, por ejemplo, 99,9 % en 30 días. El presupuesto de errores representa la cantidad de fallas toleradas antes de exceder el objetivo. Este enfoque conecta la telemetría con las expectativas del usuario."
  },
  {
    "kind": "paragraph",
    "text": "Las alertas exclusivas de infraestructura producen muchos falsos positivos y falsos negativos. Una CPU alta puede ser normal; Una CPU baja puede coexistir con una indisponibilidad total debido a un error de DNS. Las alertas de tasa de grabación observan qué tan rápido se consume el presupuesto de errores y pueden combinar ventanas cortas y largas para equilibrar la velocidad y la estabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los paneles deben seguir preguntas operativas. Para las API, las señales doradas (latencia, tráfico, errores y saturación) son un buen punto de partida. Sin embargo, la ruta, el consumidor, la región, la versión y el backend deben ser dimensiones controladas. Los paneles sin propietario, SLO y acción asociada se convierten en decoración."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/es/figure-05-slo.svg",
    "alt": "Telemetría transformada en SLI, SLO y alerta de tasa de grabación",
    "caption": "Figura 5 - La telemetría sólo se vuelve confiabilidad cuando alimenta objetivos y decisiones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.13 Observabilidad en API Gateways, Kubernetes y mensajería",
    "id": "32-13-observabilidad-en-api-gateways-kubernetes-y-mensajeria"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway debe registrar la vista de borde y la vista ascendente por separado. La duración total, el tiempo hasta el backend, el estado producido por la API Gateway, el estado ascendente, la política que falló, la ruta, el consumidor y el contexto de trace son pruebas diferentes. Un 502 debe indicar si hubo una falla de DNS, tiempo de espera de conexión, TLS, reinicio o respuesta no válida del backend."
  },
  {
    "kind": "paragraph",
    "text": "En Kubernetes, los atributos de recursos e infraestructura conectan el servicio lógico al clúster, el espacio de nombres, la carga de trabajo, el pod, el contenedor y el nodo. Collector puede enriquecer la telemetría con metadata ambientales. El diseño debe tolerar pods, implementaciones y cambios de IP efímeros sin tratar la instancia como una identidad permanente."
  },
  {
    "kind": "paragraph",
    "text": "En la mensajería, la causalidad puede no formar un árbol simple. La producción, el almacenamiento, el consumo, los reintentos y el DLQ ocurren en momentos diferentes. Los enlaces y atributos semánticos ayudan a relacionar los mensajes. Las métricas de retraso, la antigüedad del mensaje, la tasa de reenvío y la profundidad de la cola complementan los traces, pero deben interpretarse dentro de la semántica del corredor."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Cada capa tiene sus propias señales, pero el viaje debe seguir siendo correlacionable.",
    "headers": [
      "capa",
      "Métricas esenciales",
      "evidencia detallada"
    ],
    "rows": [
      [
        "API Gateway",
        "Solicitudes, latencia, errores, tiempo de subida, fallos de TLS.",
        "Rastree los registros de enrutamiento y políticas."
      ],
      [
        "Kubernetes",
        "CPU, memoria, reinicios, aceleración, disponibilidad.",
        "Atributos de recursos, eventos y registros de pods."
      ],
      [
        "Mensajería",
        "Retraso, profundidad, rendimiento, antigüedad, reentrega.",
        "Se controlan los intervalos de productor/consumidor y los ID de mensajes."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.14 Seguridad, privacidad e integridad de la telemetría",
    "id": "32-14-seguridad-privacidad-e-integridad-de-la-telemetria"
  },
  {
    "kind": "paragraph",
    "text": "La telemetría es un activo sensible. Puede revelar topología interna, nombres de servicios, versiones, fallas, identificadores de usuarios y decisiones de seguridad. La canalización debe utilizar autenticación, cifrado en tránsito, segregación de tenants, controles de acceso, retención y trace de administración. Los Collectors no deben aceptar datos de ninguna fuente sin validación."
  },
  {
    "kind": "paragraph",
    "text": "La propagación del contexto de trace cruza fronteras externas y necesita políticas. Las identificaciones recibidas pueden aceptarse, regenerarse o relacionarse mediante enlaces según el riesgo y la necesidad de correlación. El baggage debe filtrarse. Los registros de autenticación deben evitar tokens y credenciales; Los atributos SQL o HTTP no deben registrar valores confidenciales de forma predeterminada."
  },
  {
    "kind": "paragraph",
    "text": "La integridad también importa. Un atacante puede intentar ocultar la actividad reduciendo la telemetría, inundando la pipeline o inyectando campos engañosos. Los límites, la autenticación mutua, la validación de esquemas, el monitoreo del propio Collector y el almacenamiento inmutable para auditoría reducen este riesgo."
  },
  {
    "kind": "subhead",
    "text": "La telemetría no es un área libre de LGPD"
  },
  {
    "kind": "paragraph",
    "text": "Los datos de observación permanecen sujetos a finalidad, minimización, retención, acceso y seguridad. Es posible que una identificación de trace no identifique a una persona por sí sola, pero los registros y el baggage a menudo contienen un contexto que hace posible la correlación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.15 Costos de pipelines, retención, cardinalidad y capacidad",
    "id": "32-15-costos-de-pipelines-retencion-cardinalidad-y-capacidad"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad cuesta CPU, memoria, red, almacenamiento, indexación y consultas. El costo surge en la instrumentación y se multiplica por volumen, cardinalidad y retención. Una aplicación que agrega cinco atributos de alta cardinalidad puede aumentar las series y los índices mucho más de lo que sugiere el crecimiento del tráfico."
  },
  {
    "kind": "paragraph",
    "text": "La estrategia debe definir niveles de retención, sampling, compresión, agregación y enrutamiento de señales. Los registros de depuración pueden permanecer durante unos días; las métricas agregadas pueden tener una retención prolongada; se pueden muestrear trazas completas; La auditoría sigue su propia política. Collector le permite filtrar, transformar y reenviar datos a diferentes destinos antes de pagar el costo total en el backend."
  },
  {
    "kind": "paragraph",
    "text": "El pipeline también necesita SLO. Se deben monitorear las colas internas, los intervalos perdidos, los errores de exportación, las denegaciones de memoria, el tiempo de procesamiento y el uso de la CPU del Collector. Una plataforma de observabilidad que pierde datos silenciosamente puede llevar a los equipos a conclusiones incorrectas durante los incidentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.16 Troubleshooting de observabilidad",
    "id": "32-16-troubleshooting-de-observabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Cuando se rompe un rastro, primero verifique la propagación. ¿El cliente inyectó traceparent? ¿La puerta de entrada conservó o recreó el contexto? ¿La biblioteca de servicios extrajo el encabezado? ¿Las llamadas asincrónicas cargaron el contexto correcto? Una falla en cualquier salto crea rastros separados, incluso si todos los componentes están instrumentados."
  },
  {
    "kind": "paragraph",
    "text": "Cuando las métricas desaparezcan, investigue el instrumento, las vistas, la temporalidad, el intervalo de exportación, los filtros y la cardinalidad. En los registros, verifique el análisis, la marca de tiempo, las líneas múltiples, la codificación y el mapeo de gravedad. En el Collector, examine el estado, las colas, el limitador de memoria, los lotes, los reintentos y los errores del exportador. El propio pipeline necesita emitir telemetría para ser diagnosticado."
  },
  {
    "kind": "paragraph",
    "text": "Las diferencias horarias producen spans con orden imposible y registros fuera de la ventana. La sincronización del reloj es un requisito básico. También es común que nombres de servicios vacíos o inconsistentes agrupen diferentes aplicaciones en el backend. Una lista de verificación de recursos y convenciones semánticas debe ser parte de la implementación."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El diagnóstico comienza separando generación, propagación, procesamiento y almacenamiento.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Trazo dividido",
        "Contexto no propagado o formato incompatible.",
        "Headers/metadata en cada salto."
      ],
      [
        "spans faltantes",
        "Sampling, parada sin lavado ni fallo del exportador.",
        "Registros del SDK y métricas del Collector."
      ],
      [
        "La métrica explota",
        "Atributo de alta cardinalidad.",
        "Recuento de series por etiqueta."
      ],
      [
        "Registros no correlacionados",
        "traceid/spanid no inyectado.",
        "Configuración del appender y contexto activo."
      ],
      [
        "El Collector descarta datos",
        "Límite de memoria, cola llena o backend no disponible.",
        "Errores de telemetría interna y exportador."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.17 Estudios de casos y laboratorios",
    "id": "32-17-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: Los consumidores reciben intermitentemente 504 en una API bancaria. La métrica de latencia solo muestra un aumento en una ruta. Un ejemplo abre un trace cuyo intervalo de API Gateway consume poco tiempo, pero el intervalo de backend permanece cerca del tiempo de espera. Los registros del mismo trace indican un grupo de conexiones agotado. La correlación evita cambiar las políticas de API Gateway innecesariamente."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Después de una implementación, el costo de las métricas se multiplica por diez. La investigación muestra que una nueva versión agregó customer_id como atributo de histograma. La solución elimina el identificador de la métrica y lo conserva solo en intervalos de muestra y registros autorizados. El incidente demuestra por qué la telemetría necesita una revisión del contrato."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: los mensajes de Kafka aparecen como rastros separados de la solicitud original. El productor creó spans, pero no inyectó contexto en los headers de los mensajes. Después de corregir la propagación y utilizar enlaces en el consumidor cuando corresponda, la plataforma comienza a reconstruir el viaje asincrónico sin forzar una jerarquía incorrecta."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Instrumentar una API con autoinstrumentación y scope comercial manual. 2) Propagar traceparent a través de la API Gateway y confirmar la continuidad del trace. 3) Configurar un Collector con receptor OTLP, limitador de memoria, lote y dos exportadores. 4) Cree una métrica con baja cardinalidad y asocie ejemplos. 5) Simule error, tiempo de espera y mensaje asincrónico y compare las tres señales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad es la capacidad de explicar el comportamiento interno de los sistemas a partir de señales externas. Los registros, métricas y traces tienen modelos diferentes y deben estar correlacionados por recurso, contexto distribuido y convenciones semánticas. La calidad de la correlación es más importante que la cantidad de datos."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separa API, SDK, instrumentaciones, protocolo OTLP y Collector. Esta arquitectura permite instrumentación independiente del proveedor, procesamiento centralizado y exportación a múltiples backends. Sin embargo, el Collector debe diseñarse como un componente crítico, con su propia capacidad, colas, seguridad y telemetría."
  },
  {
    "kind": "paragraph",
    "text": "El sampling, los ejemplos, los SLO y las alertas transforman las señales en decisiones. La cardinalidad, la privacidad y el costo deben abordarse desde el diseño. En gateways, Kubernetes y mensajería, cada capa produce evidencia específica, pero el recorrido completo solo aparece cuando el contexto y la semántica cruzan todos los límites."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en Kubernetes para API, conectando cargas de trabajo, servicios, API de entrada/API Gateway, sondas, escalado automático, seguridad y operaciones con las prácticas de observabilidad que se presentan aquí."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de observabilidad",
    "id": "lista-de-verificacion-de-observabilidad"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada servicio define el nombre del servicio, la versión, el entorno y la propiedad de forma coherente.",
      "Los registros están estructurados, correlacionables y no contienen secretos ni datos personales innecesarios.",
      "Las métricas utilizan instrumentos correctos y atributos de baja cardinalidad.",
      "Los intervalos describen operaciones estables, dependencias, errores y tiempos sin copiar cargas útiles completas.",
      "El contexto de trace se propaga a través de HTTP, gRPC y mensajería, respetando los límites de confianza.",
      "Las convenciones semánticas y su estabilidad se rigen como un contrato.",
      "El sampling preserva los errores, la alta latencia y la representación saludable del tráfico.",
      "Collector tiene limitador de memoria, lotes, colas, reintentos, comprobaciones de estado y telemetría interna.",
      "Los paneles y las alertas están vinculados a SLI, SLO, propietarios y acciones conocidas.",
      "Los costos, la retención, la cardinalidad y la privacidad se revisan antes de la producción."
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
      "Diferenciar entre telemetría, trace, observabilidad y auditoría.",
      "Explique por qué trace_id no es apropiado como etiqueta de métrica.",
      "Describa el recurso, la extensión, el evento, el enlace, el estado y el bagaje.",
      "Explique traceparent y tracestate en una llamada HTTP distribuida.",
      "Comparar instrumentación manual y autoinstrumentación.",
      "Diseñar un pipeline de Collector con receptores, procesadores y exportadores.",
      "Compare el head sampling y el tail sampling.",
      "Explique cómo los ejemplos conectan métricas y traces.",
      "Proponer un SLI de disponibilidad y un SLI de latencia para una API.",
      "Enumerar controles para evitar la exposición de tokens y PII en telemetría.",
      "Describir cómo diagnosticar un trace roto entre la API Gateway y el backend.",
      "Proponer un laboratorio para correlacionar solicitudes HTTP, mensajes y procesamiento asincrónico."
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
        "atributo",
        "Par clave-valor asociado con recurso, intervalo, métrica o registro."
      ],
      [
        "Baggage",
        "Contexto de la aplicación propagado entre procesos."
      ],
      [
        "Exemplar",
        "Observación métrica asociada a una traza o contexto representativo."
      ],
      [
        "Head sampling",
        "Decisión de sampling tomada al inicio del trazado."
      ],
      [
        "LogRecord",
        "Modelo de registro de registros en OpenTelemetry."
      ],
      [
        "OTLP",
        "Protocolo de transporte nativo OpenTelemetry."
      ],
      [
        "Resource",
        "Entidad que produce telemetría."
      ],
      [
        "Convenciones semánticas",
        "Nombres estándar y significados de la telemetría."
      ],
      [
        "SLI",
        "Indicador cuantitativo del comportamiento observado."
      ],
      [
        "SLO",
        "Objetivo establecido para un SLI en una ventana."
      ],
      [
        "Span",
        "Unidad de trabajo cronometrada dentro de una traza."
      ],
      [
        "Tail sampling",
        "Decisión de sampling después de observar spans de traza."
      ],
      [
        "Trace",
        "Representación causal de una operación distribuida."
      ],
      [
        "Trace Context",
        "Estándar de propagación de contexto distribuido del W3C."
      ],
      [
        "View",
        "Configuración que cambia la agregación de métricas y los atributos en el SDK."
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
      "OpenTelemetry. ¿Qué es OpenTelemetry? y Manual de observabilidad.",
      "OpenTelemetry. Conceptos: Señales, Trazas, Métricas, Registros, Bagaje y Propagación de Contexto.",
      "Especificación de OpenTelemetry. Descripción general, trace, métricas y registros.",
      "Convenciones semánticas de OpenTelemetry.",
      "OpenTelemetry Collector: arquitectura, configuración, patrones de implementación y escalado.",
      "W3C. Nivel de contexto de trace 2.",
      "W3C. Baggage.",
      "Google SRE. Objetivos de Nivel de Servicio y Presupuestos de Error.",
      "CNCF. Documentación del proyecto OpenTelemetry."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry evoluciona signo por signo y las convenciones semánticas pueden ser estables o experimentales. Antes de estandarizar atributos, exportadores o configuración declarativa, valide el estado de la versión adoptada y pruebe las migraciones en un entorno controlado."
  }
];
