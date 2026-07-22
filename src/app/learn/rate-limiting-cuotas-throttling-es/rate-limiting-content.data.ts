import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const RATE_LIMITING_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Control del consumo en múltiples escalas temporales"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/es/overview.svg",
    "alt": "Límite de tarifas, cuota, limitación y equidad como controles complementarios",
    "caption": "Cifra inicial: Frecuencia, presupuesto acumulado y reacción operativa son conceptos relacionados pero distintos."
  },
  {
    "kind": "subhead",
    "text": "Pregunta fundamental"
  },
  {
    "kind": "paragraph",
    "text": "¿Quién puede consumir cuánto, en qué ventana, a qué coste y qué comportamiento se produce cuando se acaba el presupuesto?"
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
    "text": "En capítulos anteriores, se estudió la API Gateway como punto de seguridad, enrutamiento, transformación y observabilidad. Este capítulo profundiza en una responsabilidad que parece simple, pero que se vuelve compleja cuando la plataforma atiende a miles de consumidores, múltiples regiones y backends con diferentes costos: controlar el consumo sin destruir la experiencia legítima del usuario."
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tasas, las cuotas y la limitación a menudo se utilizan indistintamente. Esta simplificación esconde decisiones importantes. La limitación de velocidad controla la frecuencia en ventanas cortas; la cuota controla un presupuesto acumulado durante períodos más largos o incluso durante toda la vida de la suscripción; La limitación describe la reacción aplicada cuando la política identifica un exceso, como rechazar, retrasar, poner en cola, degradar o redirigir. Una arquitectura puede combinar los tres mecanismos."
  },
  {
    "kind": "paragraph",
    "text": "El control tampoco debe reducirse a solicitudes por minuto. Una llamada puede costar mucho más que otra: generar un informe, consultar un historial extenso, procesar un archivo, ejecutar inferencias de IA o desencadenar una transacción comercial. Los límites modernos consideran unidades ponderadas, bytes, tokens, simultaneidad y costos posteriores. La clave contable puede ser suscripción, aplicación, usuario, tenant, IP, operación o una composición de estos elementos."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo es construir un modelo mental preciso para el diseño y la retroubleshooting. El lector aprenderá algoritmos, semántica HTTP, estado distribuido, aplicación en API Gateways, comportamiento del cliente, pruebas y métricas. Al final, debería poder explicar no sólo qué número se configuró, sino también por qué existe el límite, dónde se cuenta, qué precisión es posible y cómo debe reaccionar el consumidor."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada política, registre seis elementos: objetivo, clave, unidad de costo, ventana, algoritmo y reacción de desbordamiento. La ausencia de cualquiera de estos elementos hace que la configuración sea ambigua y dificulta las pruebas, la comunicación y la auditoría."
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
      "Diferenciar entre limitación de velocidad, cuota, limitación, concurrencia, deslastre de carga y protección contra abuso.",
      "Explique la ventana fija, la ventana corrediza, el cubo de tokens, el cubo con fugas y GCRA.",
      "Definir claves contables consistentes con identidad, producto, tenant y operación.",
      "Modele los costos ponderados por llamada, byte, token o recurso descendente.",
      "Comprender los límites locales, globales, jerárquicos y distribuidos.",
      "Interprete los headers informativos 429, Reintento después y umbral.",
      "Reintentos de diseño con retroceso, jitter e idempotencia.",
      "Aplique políticas en Axway API Gateway, Azure API Management y proxies modernos.",
      "Límites de escala basados en capacidad, SLO, ráfagas y comportamiento real.",
      "Diagnostica rechazos inesperados, sobreimpulsos, teclas de acceso rápido y contadores divergentes."
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
      "27.1 Conceptos y objetivos; 27.2 Claves, unidades y scopes; 27.3 Ventana fija; 27.4 Ventana corredera; 27,5 depósito de tokens; 27.6 Balde con fugas y GCRA; 27.7 Competencia y contrapresión; 27.8 Límites locales y globales; 27.9 Estado distribuido; 27.10 Políticas jerárquicas; 27.11 Semántica HTTP; 27.12 Comportamiento del cliente; 27.13 Seguridad y abuso; 27.14 Dimensionamiento; 27.15 APIM de Azure; 27.16 Axway y Envoy; 27.17 Observabilidad; 27.18 Pruebas; 27.19 Troubleshooting; estudios de caso, resumen, ejercicios y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.1 Conceptos: límite de tarifa, cuota y estrangulamiento",
    "id": "27-1-conceptos-limite-de-tarifa-cuota-y-estrangulamiento"
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tarifas es una política de flujo. Establece cuántas unidades se pueden consumir durante un período corto, por ejemplo 20 solicitudes por segundo o 600 unidades por minuto. Su función principal es absorber picos, reducir ráfagas destructivas y preservar la capacidad para otros consumidores. La política puede permitir una explosión controlada sin abandonar una tasa promedio sostenible."
  },
  {
    "kind": "paragraph",
    "text": "La cuota es una política presupuestaria. Cuenta el consumo en un horizonte más amplio: llamadas por día, bytes por mes, transacciones por ciclo de facturación o tokens de IA por suscripción. Una cuota puede ser renovable, vitalicia o vinculada a un plan comercial. A diferencia de la limitación de velocidad, no necesita controlar la forma temporal precisa del tráfico; un consumidor puede gastar rápidamente una cuota que aún está disponible."
  },
  {
    "kind": "paragraph",
    "text": "La estrangulación es la acción de contención. La forma más común en las API es responder a 429 demasiadas solicitudes, pero los sistemas internos pueden poner en cola, retrasar, reducir la calidad, limitar el paralelismo o reenviar a una capacidad alternativa. La elección debe considerar la latencia, la idempotencia y el costo. Retrasar las solicitudes sincrónicas durante demasiado tiempo a menudo simplemente transfiere presión a los sockets, subprocesos y colas."
  },
  {
    "kind": "paragraph",
    "text": "Estos controles no reemplazan la planificación de capacidad, WAF, protección o autorización DDoS. La limitación de velocidad por IP, por ejemplo, puede reducir la fuerza bruta, pero es frágil frente a NAT compartida, botnets o rotación de origen. Una defensa sólida combina identidad, comportamiento, reputación y límites en capas."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - La política debe separar presupuesto, velocidad y reacción.",
    "headers": [
      "Concepto",
      "Pregunta respondida",
      "horizonte típico",
      "Reacción"
    ],
    "rows": [
      [
        "Rate limit",
        "¿Con qué frecuencia puedes consumirlo?",
        "Segundos o minutos.",
        "429, breve retraso o cobertizo."
      ],
      [
        "Quota",
        "¿Cuánto puedes consumir en total?",
        "Horas, días, meses o toda la vida.",
        "Bloquear hasta renovación o actualización."
      ],
      [
        "Throttling",
        "¿Qué hacer al excederse?",
        "Inmediato y operativo.",
        "Rechazar, poner en cola, degradar o redirigir."
      ],
      [
        "Límite de competencia",
        "¿Cuántos empleos pueden quedar en fuga?",
        "Mientras duren las operaciones.",
        "No aceptes más trabajo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.2 Claves, unidades de coste y scopes",
    "id": "27-2-claves-unidades-de-coste-y-scopes"
  },
  {
    "kind": "paragraph",
    "text": "La clave identifica el sujeto que se está contando. Limitar solo por dirección IP es simple, pero puede penalizar a miles de usuarios detrás de la misma NAT y permitir la evasión debido a la rotación de IP. Después de la autenticación, claves como la clave de suscripción, client_id, asunto, tenant o certificado mTLS suelen representar mejor al consumidor. En los flujos B2B, una composición tenant + aplicación + operación ofrece un aislamiento más preciso."
  },
  {
    "kind": "paragraph",
    "text": "La unidad de costo define lo que representa el contador. El modelo más sencillo asigna un coste 1 a cada llamada. En API heterogéneas, esta igualdad es engañosa. Una consulta por ID y una exportación de millones de registros no deben utilizar la misma unidad. Es posible ponderar por operación, tamaño de carga útil, líneas procesadas, duración estimada, llamadas descendentes o tokens consumidos."
  },
  {
    "kind": "paragraph",
    "text": "El scope indica dónde se aplica la regla: global, producto, API, operación, región, tenant o backend. Las reglas superpuestas necesitan una semántica explícita. Una llamada puede superar el límite de protección global, el límite del plan comercial y un límite de operación costosa específico. En general, la solicitud debe rechazarse cuando se agote el presupuesto obligatorio."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - La clave correcta depende del límite de responsabilidad.",
    "headers": [
      "clave",
      "ventaja",
      "Riesgo/precaución"
    ],
    "rows": [
      [
        "IP de origen",
        "Disponible antes de la autenticación.",
        "NAT compartida, proxies y evasión de IP."
      ],
      [
        "Clave de suscripción",
        "Alinea el consumo con el plan API.",
        "Clave compartida por muchos usuarios."
      ],
      [
        "client_id",
        "Identifica la aplicación OAuth.",
        "No separa a los usuarios de una misma aplicación."
      ],
      [
        "subusuario",
        "Equidad por usuario final.",
        "Requiere token validado e identidad estable."
      ],
      [
        "tenant + operación",
        "Aislamiento corporativo y de costos.",
        "Cardinalidad y teclas de acceso rápido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.3 Contador de ventana fija",
    "id": "27-3-contador-de-ventana-fija"
  },
  {
    "kind": "paragraph",
    "text": "El contador de ventana fijo divide el tiempo en bloques discretos. Una regla de 100 llamadas por minuto mantiene un contador para cada minuto del reloj o para cada período que comienza en un instante de referencia. La implementación es simple: calcula la ventana, incrementa atómicamente la clave y compara con el límite. El estado expira al final del período."
  },
  {
    "kind": "paragraph",
    "text": "La principal limitación es la explosión de límites. Un consumidor podría enviar 100 llamadas en los últimos segundos de una ventana y otras 100 inmediatamente al comienzo de la siguiente. Aunque cada ventana respeta el límite, la infraestructura observa 200 llamadas en unos segundos. Este comportamiento es aceptable en algunos productos y peligroso en backends sensibles a ráfagas."
  },
  {
    "kind": "paragraph",
    "text": "La ventana fija es adecuada para cuotas y presupuestos largos donde la simplicidad y la auditabilidad importan más que la fluidez. Para una protección a muy corto plazo, generalmente se combina con un depósito de tokens, una ventana deslizante o un límite de competencia."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo conceptual de fixed window\nwindow_id = floor(now_epoch_seconds / window_seconds)\nkey = \"rl:\" + consumer_id + \":\" + window_id\ncount = atomic_increment(key)\nset_expiry_if_first_increment(key, window_seconds)\nallow = count <= limit"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.4 Ventana deslizante: registro exacto y contador aproximado",
    "id": "27-4-ventana-deslizante-registro-exacto-y-contador-aproximado"
  },
  {
    "kind": "paragraph",
    "text": "La ventana deslizante considera el intervalo inmediatamente anterior al instante actual. En la variante log, cada consumo registra una marca de tiempo; Antes de decidir, el sistema elimina los eventos antiguos y cuenta los restantes. La precisión es alta, pero el estado crece con el tráfico y las operaciones sobre colecciones temporales pueden resultar costosas."
  },
  {
    "kind": "paragraph",
    "text": "La variante del contador aproxima la ventana utilizando el contador del período actual y una fracción ponderada del período anterior. Reduce la memoria y el costo, pero puede admitir pequeñas inexactitudes. Los productos distribuidos aún acumulan retraso de propagación y concurrencia, por lo que la palabra \"deslizante\" no significa precisión matemática absoluta."
  },
  {
    "kind": "paragraph",
    "text": "La elección debe estar guiada por el riesgo. Las operaciones de inicio de sesión y antifraude pueden justificar una mayor precisión. Las API de lectura de gran volumen pueden preferir una aproximación rápida. Lo importante es documentar la tolerancia de exceso y validar el comportamiento en condiciones de ráfaga real."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: La precisión, el costo y la ráfaga son compensaciones inseparables.",
    "headers": [
      "Algoritmo",
      "Estado",
      "Precisión",
      "Comportamiento"
    ],
    "rows": [
      [
        "Registro deslizante",
        "Marca de tiempo por evento.",
        "Alto.",
        "Ventana móvil exacta, alto costo."
      ],
      [
        "mostrador deslizante",
        "Mostradores de ventanas adyacentes.",
        "Aproximado.",
        "Suaviza las fronteras con poco Estado."
      ],
      [
        "ventana fija",
        "Un contador por período.",
        "Exacto por bloque, no por rango móvil.",
        "Puede estallar dos veces en el borde."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.5 Cubo de tokens",
    "id": "27-5-cubo-de-tokens"
  },
  {
    "kind": "paragraph",
    "text": "El depósito de tokens modela la capacidad acumulativa. Un depósito tiene la capacidad máxima B y recibe tokens a una tasa r. Cada solicitud consume c tokens. Si hay saldo, se pasa inmediatamente; si no lo hay, la política aplica limitación. Mientras el consumidor está inactivo, los tokens se acumulan en B, lo que permite una ráfaga inicial controlada."
  },
  {
    "kind": "paragraph",
    "text": "La tasa r rige el consumo medio sostenible, mientras que B define el estallido tolerado. Un depósito con capacidad para 20 y que repone 10 tokens por segundo puede aceptar 20 llamadas instantáneas después de estar inactivo y luego sostener aproximadamente 10 por segundo. Las operaciones costosas pueden consumir más de un token, convirtiendo el algoritmo en un limitador ponderado."
  },
  {
    "kind": "paragraph",
    "text": "En la implementación distribuida, el reabastecimiento continuo generalmente se calcula de manera diferida: al recibir una solicitud, el sistema determina cuántos tokens deberían haberse reabastecido desde la última actualización, limita el máximo a B y realiza un consumo atómico. Los relojes, la concurrencia y la partición deben manejarse con cuidado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/es/figure-01-token-bucket.svg",
    "alt": "Cubo de tokens con capacidad de ráfaga y tasa promedio sostenible",
    "caption": "Figura 1: El depósito de tokens permite ráfagas limitadas sin abandonar la tasa promedio configurada."
  },
  {
    "kind": "code",
    "text": "Lógica conceptual de reposición diferida\nelapsed = now - last_refill\navailable = min(B, stored_tokens + elapsed * refill_rate)\nif available >= request_cost:\n    available -= request_cost\n    decision = ALLOW\nelse:\n    decision = THROTTLE"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.6 Balde con fugas y GCRA",
    "id": "27-6-balde-con-fugas-y-gcra"
  },
  {
    "kind": "paragraph",
    "text": "El cubo con fugas representa una cola que se drena a un ritmo aproximadamente constante. Las solicitudes entran al contenedor y salen de forma suavizada. Cuando la cola está llena, se rechazan las nuevas entradas. A diferencia del cubo de tokens, cuyo objetivo clásico es permitir el estallido de la capacidad acumulada, el cubo con fugas enfatiza la regularidad de la producción."
  },
  {
    "kind": "paragraph",
    "text": "Este suavizado puede ser útil en la integración asincrónica, pero en las API síncronas las colas deben ser limitadas. Mantener las solicitudes en espera consume conexiones, memoria y tiempos de espera. A menudo es mejor rechazar pronto con información clara para que el cliente pueda volver a intentarlo de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "El algoritmo genérico de velocidad de celda, o GCRA, representa una forma matemática de verificar el cumplimiento temporal a través de un tiempo de llegada teórico. Es eficiente y aparece en implementaciones que necesitan modelar la velocidad y la tolerancia a ráfagas sin almacenar cada evento. Para el arquitecto, el punto central es entender que diferentes algoritmos pueden producir diferentes decisiones con la misma etiqueta comercial de \"10 por segundo\"."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.7 Límite de concurrencia, contrapresión y deslastre de carga",
    "id": "27-7-limite-de-concurrencia-contrapresion-y-deslastre-de-carga"
  },
  {
    "kind": "paragraph",
    "text": "La tarifa por unidad de tiempo no controla directamente el trabajo en vuelo. Diez llamadas por segundo pueden ser seguras si duran 20 ms y desastrosas si cada una dura 30 segundos. El límite de concurrencia protege subprocesos, conexiones, grupos y colas al restringir la cantidad de operaciones que pueden ejecutar simultáneamente."
  },
  {
    "kind": "paragraph",
    "text": "La contrapresión es la capacidad de un componente de indicar que el consumidor debe reducir la velocidad. En HTTP sincrónico, 429, 503 y Retry-After son señales comunes. En streaming y mensajería, el protocolo puede controlar ventanas, créditos o confirmación. El deslastre de carga es el rechazo deliberado del trabajo para preservar la salud del sistema; Debe priorizar las operaciones críticas y rechazarlas temprano antes de consumir recursos costosos."
  },
  {
    "kind": "paragraph",
    "text": "Los limitadores adaptativos analizan la latencia, las colas y los errores para ajustar la admisión. Pueden reaccionar mejor ante variaciones de capacidad, pero requieren estabilidad de control y métricas confiables. Una política adaptativa mal calibrada oscila, reduce el rendimiento innecesariamente o aumenta la carga en el momento equivocado."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Limitar la frecuencia y limitar la concurrencia resuelven diferentes problemas.",
    "headers": [
      "controlar",
      "variable protegida",
      "cuando usar"
    ],
    "rows": [
      [
        "Rate limit",
        "Llegadas por tiempo.",
        "Explosión y equidad del consumo."
      ],
      [
        "Límite de competencia",
        "Trabajo simultáneo.",
        "Operaciones lentas, pools y llamadas descendentes."
      ],
      [
        "en cola",
        "Artículos en espera.",
        "Absorbe microráfagas con sujeción limitada."
      ],
      [
        "Deslastre de carga",
        "Capacidad global.",
        "Severa degradación y preservación del núcleo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.8 Límites locales y globales",
    "id": "27-8-limites-locales-y-globales"
  },
  {
    "kind": "paragraph",
    "text": "Un límite local mantiene el estado dentro de cada API Gateway, proceso o conexión. Es rápido, resistente a fallas de red y adecuado para la contención inicial. Sin embargo, en un clúster con N instancias, un límite de 100 por segundo en cada nodo puede permitir aproximadamente N veces esta cantidad cuando se distribuye el tráfico."
  },
  {
    "kind": "paragraph",
    "text": "Un límite global consulta o actualiza el estado compartido. Ofrece una vista consolidada por consumidor, producto o tenant, pero agrega latencia y dependencia de un servicio crítico. El diseño debe elegir el comportamiento ante fallos: la apertura ante fallos preserva la disponibilidad y puede exceder el límite; El cierre fallido conserva la protección y puede bloquear el tráfico legítimo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/es/figure-02-local-global.svg",
    "alt": "Límites locales por instancia y límite global compartido",
    "caption": "Figura 2: los límites locales son rápidos; Las fronteras globales coordinan el conjunto, a costa de la coherencia y la disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los contadores distribuidos enfrentan simultaneidad, replicación y partición. Si cada nodo mantiene el caché y se sincroniza periódicamente, varios nodos pueden admitir solicitudes basadas en el mismo saldo. Si cada decisión se basa en la escritura sincrónica en el almacenamiento central, la precisión mejora, pero aumentan la latencia y el riesgo de cuellos de botella."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones atómicas, los scripts que se ejecutan en el servidor de datos, la fragmentación de claves y la caducidad son técnicas comunes. Las teclas de acceso rápido surgen cuando muchas solicitudes comparten la misma identidad, como un socio grande o un límite global. Distribuir esta clave sin perder semántica requiere partición del presupuesto, contadores aproximados o agregación jerárquica."
  },
  {
    "kind": "paragraph",
    "text": "El exceso debe tratarse como una propiedad de diseño. La documentación del producto puede advertir que los límites distribuidos no son completamente precisos. La arquitectura necesita definir la tolerancia: una API de consulta puede aceptar un pequeño exceso; una cuota financiera o de licencia puede requerir una conciliación posterior y un seguimiento auditable."
  },
  {
    "kind": "subhead",
    "text": "No prometas exactitud imposible"
  },
  {
    "kind": "paragraph",
    "text": "En grupos y regiones distribuidas, \"100 llamadas\" pueden significar un objetivo operativo con tolerancia. Registre el algoritmo, el punto de contabilidad, la frecuencia de sincronización y el exceso máximo aceptado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.10 Políticas jerárquicas y ventanas múltiples",
    "id": "27-10-politicas-jerarquicas-y-ventanas-multiples"
  },
  {
    "kind": "paragraph",
    "text": "Una sola ventana rara vez es suficiente. Un consumidor puede realizar 60.000 llamadas por hora y aun así enviarlas todas en unos pocos segundos. Por tanto, las pólizas maduras combinan ventanas: 50 por segundo, 1.000 por minuto y 50 mil por día. Cada uno protege un aspecto diferente: explosión, estabilidad y presupuesto."
  },
  {
    "kind": "paragraph",
    "text": "Los límites jerárquicos distribuyen la capacidad en niveles. Puede haber un presupuesto global para la plataforma, una parte por producto, otra por tenant y una regla por usuario. Este diseño evita que un gran consumidor agote toda la capacidad, pero crea un riesgo de subutilización si las reservas son escasas. En los sistemas avanzados, la capacidad inactiva se puede tomar prestada con límites y prioridad máximos."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario explicar la composición al consumidor. El límite más cercano a agotarse puede resultar más útil que publicar decenas de contadores. Internamente, las métricas deben indicar qué regla ganó la decisión, su clave y su scope."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/es/figure-03-layered-control.svg",
    "alt": "Políticas de contención en capas desde el borde hasta el backend",
    "caption": "Figura 3: la contención en capas reduce el costo y mejora la precisión de la clave utilizada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.11 Semántica HTTP: 429, Reintentar después y limitar campos",
    "id": "27-11-semantica-http-429-reintentar-despues-y-limitar-campos"
  },
  {
    "kind": "paragraph",
    "text": "El estado 429 Demasiadas solicitudes informa que el cliente ha enviado demasiadas solicitudes en un período de tiempo. La respuesta debe ser producida por el componente que conoce la política y debe distinguirse de 401, 403, 503 y tiempos de espera. Un 429 sin identificación de reglas, sin correlación y sin guía de recuperación convierte un mecanismo de protección en una fuente de incidentes."
  },
  {
    "kind": "paragraph",
    "text": "El campo Reintentar después puede contener una cantidad de segundos o una fecha HTTP. El cliente debe tratarlo como una pauta mínima antes de repetir, considerando tiempo, idempotencia y presupuesto propio. Cuando se aplican múltiples límites, la respuesta debe reflejar la restricción efectiva, no sólo la respuesta más fácil de obtener."
  },
  {
    "kind": "paragraph",
    "text": "Los headers X-RateLimit-* se utilizan ampliamente, pero no tienen una semántica universal. En mayo de 2026, el trabajo del IETF en los campos RateLimit todavía es un borrador de Internet y define RateLimit-Policy y RateLimit; por lo tanto, debe tratarse como una especificación en evolución. La adopción debe ser versionada y probada con los clientes, sin presentar el borrador como un RFC publicado."
  },
  {
    "kind": "code",
    "text": "Respuesta recomendada al superar un límite a corto plazo\nHTTP/1.1 429 Too Many Requests\nContent-Type: application/problem+json\nRetry-After: 20\n{\n  \"type\": \"https://api.empresa.example/problems/rate-limit\",\n  \"title\": \"Límite de solicitudes excedido\",\n  \"status\": 429,\n  \"detail\": \"Espere antes de repetir la operación.\",\n  \"policy\": \"cliente-lectura-burst\",\n  \"traceId\": \"7b2f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.12 Comportamiento correcto del cliente",
    "id": "27-12-comportamiento-correcto-del-cliente"
  },
  {
    "kind": "paragraph",
    "text": "El cliente debe respetar Retry-After cuando esté presente y aplicar un retroceso exponencial con jitter para evitar que miles de instancias regresen al mismo tiempo. El backoff debe tener un límite máximo, número de intentos y presupuesto de tiempo. Los reintentos infinitos convierten un apagón breve en una tormenta prolongada."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones no idempotentes requieren cuidado. Si el cliente no sabe si el servidor procesó la solicitud, repetirla puede duplicar los efectos. La clave de idempotencia, los identificadores comerciales y la consulta de estado reducen este riesgo. Para el 429 recibido antes del backend, la operación probablemente no se realizó, pero la API Gateway debe garantizar y documentar esta propiedad."
  },
  {
    "kind": "paragraph",
    "text": "Los clientes de la cooperativa también pueden controlar su propia tarifa antes de recibir rechazos. Un SDK puede implementar la agrupación de tokens local según el contrato publicado. Este comportamiento reduce la latencia desperdiciada, pero no elimina la aplicación de la ley al servidor, porque los clientes pueden estar desactualizados, mal configurados o ser maliciosos."
  },
  {
    "kind": "code",
    "text": "Backoff exponencial con jitter - pseudocódigo\ndelay = retry_after if present else min(base * 2**attempt, max_delay)\ndelay = random_between(delay * 0.5, delay * 1.5)\nsleep(delay)\nretry_only_if(operation_is_safe_or_idempotent)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.13 Seguridad, abuso y límites por flujo sensible",
    "id": "27-13-seguridad-abuso-y-limites-por-flujo-sensible"
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tasas es un control importante contra la fuerza bruta, el credential stuffing, la enumeración, el raspado y el abuso de los flujos comerciales. Sin embargo, el límite debe ser específico para el ataque. El inicio de sesión puede combinar IP, cuenta y dispositivo; la recuperación de contraseñas debería limitar las solicitudes por identidad y destino; La consulta de stock puede requerir reglas por producto y aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Se pueden utilizar umbrales demasiado predecibles para descubrir identificadores válidos o desencadenar una denegación lógica de servicio contra una víctima. Bloquear una cuenta después de unos pocos intentos permite a un atacante impedir el acceso legítimo. Los mecanismos progresivos, los desafíos adicionales y las señales de riesgo suelen ser mejores que los bloqueos absolutos."
  },
  {
    "kind": "paragraph",
    "text": "El recuento debe realizarse con suficiente antelación para proteger los recursos, pero después de una validación suficiente para obtener la clave correcta. Una capa aproximada por IP puede preceder a la autenticación; una capa delgada por usuario viene después de la validación del token. Las cargas útiles enormes necesitan límites de conexión y tamaño antes de cualquier análisis costoso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.14 Tamaño de límites",
    "id": "27-14-tamano-de-limites"
  },
  {
    "kind": "paragraph",
    "text": "Un número no debe nacer de una preferencia personal. El proceso comienza con la capacidad sostenible del backend, la latencia SLO, el margen de seguridad y los patrones de ráfaga. La capacidad útil debe descontar el tráfico interno, los reintentos, las comprobaciones de estado, las tareas por lotes y los fallos parciales. Luego se distribuye entre clases de consumidores y operaciones."
  },
  {
    "kind": "paragraph",
    "text": "Los percentiles de tráfico son más útiles que los promedios aislados. Es necesario observar las solicitudes por segundo, la competencia, la duración, los bytes, la tasa de error y la distribución posterior. Un endpoint que genera cinco llamadas internas debe consumir un presupuesto compatible. En las API monetizadas, el plan comercial debe seguir respetando la capacidad física."
  },
  {
    "kind": "paragraph",
    "text": "El despliegue debe comenzar en modo observación o sombra, registrando decisiones sin bloquear. Luego, se aplica una aplicación gradual por porcentaje, entorno o consumidor piloto. Las alertas deben distinguir el acercamiento al límite, el rechazo esperado del contrato y la anomalía de la plataforma."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Los límites deben derivar de la capacidad observada y de la política empresarial.",
    "headers": [
      "Entrada",
      "Pregunta de diseño",
      "evidencia"
    ],
    "rows": [
      [
        "Capacidad",
        "¿Cuánto soporta el backend con SLO?",
        "Pruebas de carga y métricas de producción."
      ],
      [
        "Explosión",
        "¿Qué ráfaga es tolerable?",
        "Depósito de tokens, cola y grupo descendente."
      ],
      [
        "Fairness",
        "¿Cómo dividir entre consumidores?",
        "Planes, tenants, prioridades e historia."
      ],
      [
        "Margen",
        "¿Cuánto reservar para fallos y reintentos?",
        "Escenarios degradados y modelo de capacidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.15 Gestión de API de Azure",
    "id": "27-15-gestion-de-api-de-azure"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management ofrece políticas por suscripción y por clave. velocidad de control de límite de velocidad y límite de velocidad por tecla; cuota y cuota por clave controlan el volumen de llamadas y/o el ancho de banda. La clave personalizada se puede construir mediante expresión de IP, sujeto JWT, tenant, operación u otro atributo confiable."
  },
  {
    "kind": "paragraph",
    "text": "La implementación varía según el nivel. La documentación actual indica ventana deslizante en niveles clásicos y depósito de tokens en niveles v2. También advierte que la limitación de tarifas distribuidas no es del todo precisa. En varias regiones, los contadores de límite de velocidad se aplican por API Gateway regional, mientras que las cuotas operan globalmente a nivel de instancia."
  },
  {
    "kind": "paragraph",
    "text": "El orden de la política importa. Para utilizar la identidad JWT como contraclave, primero se debe validar el token. La condición de incremento solo puede contar respuestas específicas, pero las evaluaciones salientes cambian el tiempo de actualización. Los valores y fragmentos con nombre ayudan a estandarizar los límites, pero claves iguales en diferentes scopes necesitan parámetros coherentes."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de política en Azure API Management"
  },
  {
    "kind": "code",
    "text": "<inbound>\n  <base />\n  <validate-jwt header-name=\"Authorization\" />\n  <rate-limit-by-key\n      calls=\"120\"\n      renewal-period=\"60\"\n      counter-key=\"@(context.Principal?.Identity?.Name ?? context.Request.IpAddress)\"\n      remaining-calls-header-name=\"X-Calls-Remaining\" />\n</inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.16 Axway API Gateway, Envoy y proxies modernos",
    "id": "27-16-axway-api-gateway-envoy-y-proxies-modernos"
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, el filtro Throttling se puede insertar en el circuito de políticas para limitar las llamadas a servicios y consumidores. El diseño debe definir la clave a partir del contexto del mensaje y, cuando sea necesario, utilizar KPS para datos de configuración o asociación con planes. La posición del filtro determina qué costos ya se han pagado y qué atributos están disponibles."
  },
  {
    "kind": "paragraph",
    "text": "En topologías con múltiples instancias, es esencial verificar dónde reside el estado del algoritmo y cómo se comparten los contadores. Una política visualmente idéntica puede comportarse de manera diferente si cada API Gateway aplica su propio contador. Los registros y el Monitor de tráfico deben registrar la clave, la regla y la decisión derivadas sin exponer las credenciales."
  },
  {
    "kind": "paragraph",
    "text": "Envoy ofrece limitación de tasa local basada en depósitos de tokens y un filtro global que consulta un servicio de limitación de tasa para descriptores. Los descriptores le permiten combinar atributos de ruta, fuente, método y metadata. El arquitecto debe decidir si se abre o se cierra cuando falla el servicio global y medir la latencia adicional de la decisión."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.17 Observabilidad e indicadores",
    "id": "27-17-observabilidad-e-indicadores"
  },
  {
    "kind": "paragraph",
    "text": "429 contadores son sólo el comienzo. La plataforma necesita medir las solicitudes evaluadas, permitidas, limitadas y no supervisadas, los errores del servicio de decisiones y las fallas de apertura. Las métricas deben segmentarse por política, operación, producto, región y clase de consumidor, sin crear una cardinalidad incontrolable."
  },
  {
    "kind": "paragraph",
    "text": "Utilizar el presupuesto es más informativo que el rechazo final. El porcentaje de tokens disponibles, el tiempo hasta la renovación, la competencia actual y el enfoque de cuotas le permiten alertar antes del impacto. Las teclas de acceso rápido, los consumidores dominantes y las operaciones costosas necesitan paneles de control específicos."
  },
  {
    "kind": "paragraph",
    "text": "Los seguimientos deben mostrar la decisión del limitador como lapso o evento, incluida la política y la duración de la consulta, pero evitando la clave sin formato cuando contiene una identidad confidencial. Los registros de auditoría registran los cambios de configuración, propiedad, justificación, implementación y reversión."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Las métricas deben explicar las fallas de protección, equidad y mecanismos.",
    "headers": [
      "Métrica",
      "Interpretación"
    ],
    "rows": [
      [
        "permitido / tarifa limitada",
        "Tomo aceptado y rechazado por norma."
      ],
      [
        "proporción restante",
        "Proximidad del agotamiento presupuestario."
      ],
      [
        "latencia de decisión",
        "Costo limitador en el camino crítico."
      ],
      [
        "exceso estimado",
        "Diferencia entre consumo contractual y observado."
      ],
      [
        "concentración de teclas de acceso rápido",
        "Dependencia de pocos consumidores o tenants."
      ],
      [
        "modo de falla permitido",
        "Tráfico liberado debido a una falla en el servicio de decisiones."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas deben reproducir el patrón temporal, no sólo el volumen total. Los casos mínimos incluyen tráfico por debajo del umbral, ráfaga instantánea, límite de ventana, múltiples conmutadores, múltiples nodos, caducidad, cambio de configuración y falla de almacenamiento. El reloj utilizado en la prueba debe controlarse o registrarse con precisión."
  },
  {
    "kind": "paragraph",
    "text": "Validar distribución de estados y orientación al cliente. Reintentar después debe ser coherente con la ventana efectiva. Pruebe si las solicitudes rechazadas llegan o no al backend, si el contador se incrementa con las respuestas de error y si las operaciones con diferentes pesos consumen las unidades esperadas."
  },
  {
    "kind": "paragraph",
    "text": "En un entorno autorizado, realice una carga progresiva y compare el tráfico generado, aceptado y observado en el backend. Un limitador aparentemente correcto en la API Gateway puede fallar debido a un reintento automático, múltiples regiones o un equilibrio desigual. La prueba debe incluir correlación de un extremo a otro."
  },
  {
    "kind": "code",
    "text": "Plan de validación temporal\n# Ejemplo conceptual de escenario de prueba\n1. enviar 8 req/s por 30 s  -> no se esperan rechazos\n2. enviar burst de 30       -> rechazo según la capacidad del bucket\n3. repetir con 4 identidades -> aislamiento entre claves\n4. distribuir entre 3 gateways -> medir overshoot y alcance del contador\n5. desactivar rate-limit service -> validar fail-open/fail-closed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.19 Troubleshooting",
    "id": "27-19-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Cuando un consumidor informa 429, primero identifique qué componente respondió. CDN, WAF, ingreso, API Gateway, malla de servicio y backend pueden tener límites independientes. El cuerpo de la respuesta, los headers, el ID de seguimiento y la firma visual ayudan a localizar la fuente. Luego, determine la clave realmente utilizada y si coincide con la identidad esperada."
  },
  {
    "kind": "paragraph",
    "text": "Los rebotes intermitentes pueden deberse a múltiples ventanas, contadores regionales, desfase del reloj, teclas de acceso rápido, caché de configuración o reintentos invisibles. Un cliente puede enviar una llamada y una biblioteca la repite automáticamente, duplicando el consumo. En HTTP/2, varias transmisiones comparten una conexión; La limitación por conexión produce una semántica muy diferente a la limitación por usuario."
  },
  {
    "kind": "paragraph",
    "text": "Si el límite no parece funcionar, verifique el orden de las políticas, la condición de incremento, el scope, la clave vacía, el recurso a IP y la coherencia entre instancias. En sistemas distribuidos, pruebe cada nodo y región. La ausencia de 429 no prueba la ausencia de aceleración: el motor puede retrasarse, hacer cola o responder con otro estado."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: La troubleshooting comienza con la localización de la aplicación y la clave real.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Todos comparten el mismo límite",
        "Clave vacía o IP proxy.",
        "Registro de contraclave y cadena X-Forwarded-For confiable."
      ],
      [
        "El límite se multiplica por el número de nodos.",
        "Contador local por instancia.",
        "Pruebe fijando la ruta en cada API Gateway."
      ],
      [
        "429 después de algunas llamadas",
        "Múltiples pólizas o costo ponderado.",
        "ID de política ganadora y recuento de incrementos."
      ],
      [
        "Se sigue aceptando cupo excedido",
        "Propagación/reinicio o ventana incorrecta.",
        "Estado del contador e inicio de período."
      ],
      [
        "Sobrecargas de backend sin 429",
        "Límite demasiado alto o aplicado tarde.",
        "RPS y concurrencia antes/después de la API Gateway."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: API de saldo bancario: el límite por usuario evita que una sola sesión degrade a las demás, mientras que el límite por client_id protege el canal. Una norma de competencia global protege el núcleo. El endpoint recibe el costo 1; las exportaciones de extractos reciben un costo más alto. La API Gateway devuelve 429 antes de llamar al backend e incluye Retry-After."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: Socio de Open Finance: cada organización tiene una cuota mensual contractual y un límite de tasa de explosión. La clave combina declaración de software, client_id e institución. mTLS evita que el simple hecho de tener una clave consuma el presupuesto. Las métricas separan el consumo regulatorio, los reintentos y las fallas comerciales."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: plataforma de IA: la política controla las solicitudes por minuto y los tokens procesados. Las indicaciones y respuestas tienen un costo variable, por lo que el contador se actualiza con el consumo real cuando está disponible. Una estimación previa evita cargas útiles extremas; la cuota mensual controla los costos comerciales; la competencia protege las GPU y los backends."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tarifas controla la velocidad, la cuota controla el presupuesto y la limitación define la reacción al exceso. La política completa también necesita clave, unidad, ventana, algoritmo, scope y comportamiento de falla."
  },
  {
    "kind": "paragraph",
    "text": "La ventana fija es simple, la ventana deslizante suaviza los límites, el depósito de tokens combina la tasa promedio con la ráfaga, el depósito con fugas regulariza la producción y los límites de concurrencia protegen el trabajo en vuelo. Ningún algoritmo es universalmente superior."
  },
  {
    "kind": "paragraph",
    "text": "En clústeres distribuidos, la precisión compite con la latencia y la disponibilidad. Los límites locales y globales se pueden combinar y el exceso debe tratarse como una propiedad mensurable. Las respuestas 429 y Retry-After permiten la cooperación del cliente; El retroceso, la inquietud y la idempotencia evitan tormentas de recuperación."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways como Azure API Management y Axway ofrecen sus propias políticas, mientras que los servidores proxy como Envoy distinguen entre limitadores locales y servicios globales. La configuración debe validarse con carga temporal, observabilidad y retroubleshooting por clave y scope."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 28 cubrirá el control de versiones de API, relacionando la evolución del contrato, la compatibilidad, la coexistencia, la depreciación y la gobernanza del ciclo de vida."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación del proyecto",
    "id": "lista-de-verificacion-del-proyecto"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se documenta el objetivo del límite: protección, equidad, seguridad, coste o plan de negocio.",
      "La clave es estable, confiable y compatible con NAT, proxies e identidad.",
      "La unidad de consumo representa el costo real de la operación.",
      "Cuando fue necesario se combinaron ventanas cortas y largas.",
      "Se conocen el algoritmo y la capacidad de ráfaga.",
      "El scope local, regional o global es explícito.",
      "Se decidió falla de apertura/fallo de cierre para contar las fallas del servicio.",
      "429, el reintento posterior y el cuerpo del error son coherentes y comprobables.",
      "Los clientes tienen orientación sobre retroceso, inquietud e idempotencia.",
      "Política de registro de métricas, decisión, exceso, teclas de acceso rápido y latencia.",
      "El lanzamiento pasó por un modo oculto y una aplicación gradual.",
      "Las pruebas cubren límites de ventanas, múltiples nodos y cambios de configuración."
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
      "Diferenciar entre límite de tasa, cuota, limitación y límite de competencia.",
      "Explique la explosión del límite de la ventana fija.",
      "Calcule cualitativamente el comportamiento de un depósito de tokens con B=20 y r=5/s.",
      "Compare el tronco deslizante y el mostrador deslizante.",
      "Proponer claves de inicio de sesión, API B2B y API multitenant.",
      "Explique por qué un límite local puede multiplicarse en un clúster.",
      "Defina una estrategia de apertura/cierre fallida para una API crítica.",
      "Escriba una respuesta 429 con Reintentar después y Detalles del problema.",
      "Proponga múltiples ventanas para proteger la cuota mensual y de ráfaga.",
      "Cree un plan de prueba para tres API Gateways y dos regiones.",
      "Describir métricas para detectar teclas de acceso rápido y excesos.",
      "Explique cuándo el costo ponderado es mayor que contar las llamadas."
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
        "Contrapresión",
        "Señalización para que el productor reduzca la velocidad de envío."
      ],
      [
        "Explosión",
        "Breve ráfaga por encima de la tasa media sostenible."
      ],
      [
        "contrallave",
        "Identificador utilizado para agrupar y contabilizar el consumo."
      ],
      [
        "cerrado por falla",
        "Bloquear cuando falla el servicio de decisiones."
      ],
      [
        "Apertura fallida",
        "Permitir cuando falla el servicio de decisiones."
      ],
      [
        "ventana fija",
        "Contar en períodos discretos."
      ],
      [
        "GCRA",
        "Algoritmo temporal para verificar el cumplimiento de la velocidad y la ráfaga."
      ],
      [
        "tecla de acceso rápido",
        "Clave con volumen desproporcionado de actualizaciones."
      ],
      [
        "balde con fugas",
        "La cola se agotó a un ritmo aproximadamente constante."
      ],
      [
        "Deslastre de carga",
        "Negativa deliberada a trabajar para preservar la salud."
      ],
      [
        "Sobrepasar",
        "Consumo admitido por encima del límite configurado."
      ],
      [
        "Quota",
        "Presupuesto de consumo acumulado."
      ],
      [
        "Rate limit",
        "Control de frecuencia de consumo."
      ],
      [
        "Retry-After",
        "Campo HTTP que guía cuándo repetir."
      ],
      [
        "ventana corredera",
        "Mover la ventana sobre el intervalo anterior al instante actual."
      ],
      [
        "Throttling",
        "Acción de contención aplicada al exceder una política."
      ],
      [
        "Cubo de tokens",
        "Algoritmo de máxima capacidad y reposición de tokens."
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
      "IETF. RFC 6585: códigos de estado HTTP adicionales, incluidas 429 demasiadas solicitudes.",
      "IETF. RFC 9110: Semántica HTTP, incluido el reintento posterior.",
      "Grupo de trabajo HTTPAPI del IETF. Campos de encabezado RateLimit para HTTP: borrador de Internet, trabajo en progreso.",
      "Microsoft aprende. Azure API Management: políticas de límite de tasa, límite de tasa por clave, cuota y cuota por clave.",
      "Microsoft aprende. Limitación avanzada de solicitudes con Azure API Management.",
      "Documentación Axway. Referencia del filtro de regulación y del filtro de políticas de API Gateway.",
      "Documentación de proxy del enviado. Filtros de límite de tarifa local y límite de tarifa global.",
      "OWASP API Security Top 10: consumo de recursos sin restricciones y protección de flujos confidenciales.",
      "UIT-T/literatura sobre vigilancia del tráfico. Balde de tokens, balde con fugas y GCRA."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos y la semántica de los productos administrados pueden cambiar según el nivel y la versión. La redacción de campos RateLimit aún es un trabajo en progreso en 2026. Antes de estandarizar headers o copiar políticas, valide la documentación oficial de la versión implementada."
  }
];
