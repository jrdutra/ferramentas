import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const MESSAGING_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Mensajería: tiempo de desacoplamiento, capacidad y disponibilidad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/overview.svg",
    "alt": "Productor publicando mensajes en broker para consumidores independientes.",
    "caption": "Cifra inicial: Los corredores desvinculan a productores y consumidores, pero la confiabilidad sigue siendo una responsabilidad de extremo a extremo."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La confiabilidad depende del protocolo, del corredor y del correcto comportamiento de productores y consumidores."
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
    "text": "La mensajería es una de las bases de las arquitecturas distribuidas. En lugar de requerir que dos sistemas estén disponibles al mismo tiempo y completen una interacción en el mismo intervalo, un productor publica un mensaje a un intermediario y uno o más consumidores procesan ese mensaje cuando tienen la capacidad. Este desacoplamiento temporal reduce las dependencias directas, absorbe los picos y permite la creación de flujos de negocio asincrónicos."
  },
  {
    "kind": "paragraph",
    "text": "La palabra mensajería, sin embargo, abarca diferentes modelos. Una cola tradicional distribuye unidades de trabajo a los consumidores y tiende a eliminar o confirmar mensajes después del procesamiento. Un registro distribuido mantiene registros durante un período de tiempo y permite a los consumidores independientes avanzar en sus propias compensaciones o reproducirlas. Un sistema de publicación/suscripción entrega copias lógicas a varios grupos interesados. Cada modelo cambia el orden, la retención, la escalabilidad y la recuperación."
  },
  {
    "kind": "paragraph",
    "text": "Kafka y RabbitMQ a menudo se comparan como competidores, pero nacieron con énfasis diferentes. Kafka organiza eventos en temas persistentes y divididos, optimizados para retención, reproducción y alto rendimiento. RabbitMQ es un corredor de mensajería con enrutamiento flexible a través de intercambios, colas, acuses de recibo y diferentes tipos de colas. AMQP puede significar el modelo 0-9-1 asociado con RabbitMQ o el protocolo estandarizado AMQP 1.0. JMS, hoy Jakarta Messaging, es una API de Java y no un único intermediario o protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo construye un modelo mental que comienza con mensajes, confirmación, pedidos e idempotencia; profundiza en Kafka y RabbitMQ; diferencia AMQP 0-9-1 de AMQP 1.0; explica la abstracción JMS; y termina con estándares de integración, seguridad, observabilidad, capacidad y retroubleshooting. El objetivo es permitir decisiones técnicas informadas, no sólo enseñar comandos para un producto."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada flujo, escriba quién lo produce, dónde se almacena el mensaje, cómo confirma el recibo el corredor, cuándo confirma el consumidor el procesamiento, cuál es la unidad de pedido y cómo se manejarán los duplicados. Sin estas respuestas, la promesa de cumplimiento sigue siendo ambigua."
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
      "Explique por qué la mensajería desacopla el tiempo, la capacidad y la disponibilidad entre sistemas.",
      "Distinga cola, tema, registro distribuido, publicación/suscripción y transmisión.",
      "Comprender los acuses de recibo, las confirmaciones, las compensaciones y la semántica de entrega.",
      "Relacionar pedidos, particiones, grupos de consumidores, reintentos e idempotencia.",
      "Describir la arquitectura Kafka, incluidos temas, particiones, réplicas, líderes y KRaft.",
      "Describir la arquitectura RabbitMQ, incluidos intercambios, colas, enlaces, vhosts y canales.",
      "Diferenciar entre AMQP 0-9-1 y AMQP 1.0.",
      "Explique Jakarta Messaging/JMS como una API de programación y una abstracción de proveedor.",
      "Diseñe DLQ, reintento, Bandeja de salida, Bandeja de entrada, solicitud-respuesta y consumidores competitivos.",
      "Aplicar seguridad, observabilidad, planificación de capacidad y retroubleshooting."
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
      "31.1 Fundamentos de mensajería y desacoplamiento",
      "31.2 Cola, publicación/suscripción, transmisión y registro distribuido",
      "31.3 Mensajes, sobres, cabeceras y contratos",
      "31.4 Acuses de recibo, confirmaciones y semántica de entrega",
      "31.5 Ordenamiento, particiones, idempotencia y duplicados",
      "31.6 Kafka: arquitectura, productores y consumidores",
      "31.7 Retención, compresión, reproducción, Connect y Streams",
      "31.8 RabbitMQ: intercambios, colas, enlaces y enrutamiento",
      "31.9 Confiabilidad, colas de quórum, transmisiones, DLX y captación previa",
      "31.10 AMQP 0-9-1 y AMQP 1.0",
      "31.11 Mensajería de Yakarta/JMS",
      "31.12 Estándares de integración, seguridad, observabilidad y retroubleshooting",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.1 Fundamentos de mensajería y desacoplamiento",
    "id": "31-1-fundamentos-de-mensajeria-y-desacoplamiento"
  },
  {
    "kind": "paragraph",
    "text": "En una llamada sincrónica, el consumidor depende de la disponibilidad y el tiempo de respuesta del proveedor. En un flujo asincrónico, el productor transfiere la responsabilidad inmediata a un intermediario o registro, recibe un acuse de recibo apropiado y continúa su procesamiento. El consumidor puede trabajar posteriormente, respetando su propia capacidad. Esta diferencia cambia la arquitectura de fallas: la indisponibilidad temporal del consumidor no tiene por qué impedir la publicación, siempre que el corredor tenga suficiente almacenamiento y capacidad."
  },
  {
    "kind": "paragraph",
    "text": "El desacoplamiento no es absoluto. Los productores y consumidores continúan compartiendo contratos, semántica, plazos esperados y reglas comerciales. Un mensaje puede entregarse técnicamente y aun así ser semánticamente inválido. Un consumidor puede comprometerse demasiado pronto y perder trabajo, o comprometerse demasiado tarde y provocar duplicados. Por lo tanto, la mensajería necesita una estrategia de contrato, propiedad, observabilidad y recuperación."
  },
  {
    "kind": "paragraph",
    "text": "La decisión entre sincrónico y asincrónico debe observar el significado del resultado. Las consultas que deben responder inmediatamente al usuario suelen permanecer sincrónicas. Los procesos largos, la integración con múltiples sistemas, la absorción de picos y la propagación de eventos se benefician de la asincronicidad. Muchos flujos combinan ambos: una API acepta el comando, conserva el estado y publica un evento; el cliente supervisa la conclusión a través de consulta, devolución de llamada o canal de notificación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.2 Cola, publicación/suscripción, transmisión y registro distribuido",
    "id": "31-2-cola-publicacion-suscripcion-transmision-y-registro-distribuido"
  },
  {
    "kind": "paragraph",
    "text": "La cola es una estructura en la que los mensajes esperan a los consumidores. En el patrón de consumidores competitivos, varias instancias comparten la cola y cada mensaje es procesado por solo una de ellas. Publicar/suscribir crea múltiples suscripciones o colas lógicas para que diferentes grupos reciban el mismo evento. El término tema puede representar una entidad de enrutamiento, una categoría de publicación o un registro particionado, según la tecnología."
  },
  {
    "kind": "paragraph",
    "text": "Kafka trata un tema como un registro dividido en particiones. Los registros permanecen según las políticas de retención o compresión, y los consumidores registran compensaciones. Esto permite la replay, múltiples grupos independientes y la reconstrucción de proyecciones. RabbitMQ utiliza intercambios para enrutar mensajes a colas o transmisiones; Los consumidores normalmente reciben de las colas y confirman el procesamiento. Las transmisiones de RabbitMQ agregan retención y lectura compensada, acercándose a los casos de registro."
  },
  {
    "kind": "paragraph",
    "text": "Elegir el modelo correcto es más importante que elegir el producto por marca. El trabajo único y los comandos específicos combinan bien con las colas. Los eventos de dominio dirigidos a múltiples consumidores requieren grupos independientes o en abanico. Historial reprocesable, análisis y transmisión de eventos favorecen registros. Un sistema puede utilizar más de un modelo al mismo tiempo."
  },
  {
    "kind": "subhead",
    "text": "La cola tradicional y el registro distribuido conservan estados diferentes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-01-queue-log.svg",
    "alt": "Cola tradicional comparada con el registro distribuido con compensaciones",
    "caption": "Figura 1: Las colas y los registros se diferencian principalmente en el ciclo de vida del mensaje y la posición que ocupa el consumidor."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: el nombre del tema no tiene exactamente la misma semántica en todas las plataformas.",
    "headers": [
      "modelo",
      "Unidad de consumo",
      "Retención típica",
      "Uso recurrente"
    ],
    "rows": [
      [
        "cola",
        "Un mensaje para un consumidor del grupo.",
        "Hasta reconocimiento, vencimiento o descarte.",
        "Comandos, tareas e integración operativa."
      ],
      [
        "pub/sub",
        "Una copia lógica por suscripción o grupo.",
        "Dependiendo de cada destino.",
        "Eventos para múltiples dominios."
      ],
      [
        "Registro particionado",
        "Compensación por partición y grupo.",
        "Por tiempo, tamaño o compresión.",
        "Reproducción, análisis y transmisión de eventos."
      ],
      [
        "Flujo persistente",
        "Lectura secuencial con offset.",
        "Retención configurada.",
        "Telemetría, eventos y fan-out duradero."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.3 Mensajes, sobres, cabeceras y contratos",
    "id": "31-3-mensajes-sobres-cabeceras-y-contratos"
  },
  {
    "kind": "paragraph",
    "text": "Un mensaje tiene carga útil y metadata. La carga útil transporta los datos comerciales; Los headers o propiedades contienen información como tipo, versión, ID de correlación, tipo de contenido, marca de tiempo, contexto de seguimiento, prioridad, caducidad y clave de partición. Combinar metadata de transporte con reglas comerciales dificulta la migración entre intermediarios y puede crear una dependencia excesiva de una biblioteca específica."
  },
  {
    "kind": "paragraph",
    "text": "Los contratos de eventos deben definir la semántica, no solo JSON. El nombre del evento debe indicar algo que ocurrió, como Pago autorizado, y no una declaración ambigua. El esquema debe informar los campos obligatorios, la posibilidad de anulación, los tipos, las unidades, la precisión, los identificadores y la compatibilidad. Avro, JSON Schema y Protobuf son opciones comunes, pero la gobernanza depende de la evolución, el catálogo y las reglas de prueba."
  },
  {
    "kind": "paragraph",
    "text": "Los sobres estandarizados facilitan la correlación y la observabilidad. Sin embargo, replicar la entidad completa en cada evento puede exponer datos innecesarios y aumentar el acoplamiento. Publicar solo un identificador puede obligar a los consumidores a realizar llamadas sincrónicas. La decisión debe equilibrar la autonomía, la privacidad, el tamaño, la coherencia y la frecuencia del cambio."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de envolvente de evento"
  },
  {
    "kind": "code",
    "text": "{\n  \"specversion\": \"1.0\",\n  \"type\": \"pago.autorizado.v1\",\n  \"id\": \"evt-7f8d2a\",\n  \"source\": \"servicio-pagos\",\n  \"time\": \"2026-07-16T11:30:00Z\",\n  \"subject\": \"pagamento/93842\",\n  \"data\": { \"pagamentoId\": \"93842\", \"valor\": 149.90 }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.4 Acuses de recibo, confirmaciones y semántica de entrega",
    "id": "31-4-acuses-de-recibo-confirmaciones-y-semantica-de-entrega"
  },
  {
    "kind": "paragraph",
    "text": "La confiabilidad debe analizarse pieza por pieza. El productor lo envía al corredor y necesita saber si el mensaje fue aceptado con el nivel de durabilidad requerido. Luego, el corredor lo entrega al consumidor y necesita saber si el procesamiento ha finalizado. Las confirmaciones del editor y los reconocimientos del consumidor resuelven estas dos relaciones separadas. Una confirmación del corredor no prueba que el consumidor haya completado la regla comercial."
  },
  {
    "kind": "paragraph",
    "text": "At-most-once acepta la posibilidad de pérdida para evitar la replay: el mensaje puede considerarse completo antes de procesarlo. Privilegios al menos una vez para no perder, pero acepta duplicados cuando hay una falla después del efecto comercial y antes del reconocimiento. Exactamente una vez es una propiedad contextual, normalmente limitada a límites específicos. No significa que cualquier efecto externo, banco o API remota se ejecutará mágicamente una vez."
  },
  {
    "kind": "paragraph",
    "text": "En sistemas reales, al menos una vez con idempotencia es la base más común. El consumidor registra un identificador procesado o utiliza una operación naturalmente idempotente, ejecuta el efecto y se compromete más tarde. Si el mensaje vuelve a aparecer, se conserva el mismo resultado. Cuando el efecto y el registro de deduplicación no comparten transacciones, todavía hay ventanas de falla que deben ser manejadas por el diseño."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-02-confirms-acks.svg",
    "alt": "Confirmaciones entre productor, corredor y consumidor",
    "caption": "Figura 2: La confirmación de publicación y la confirmación de procesamiento son mecanismos ortogonales."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: La semántica debe definirse de un extremo a otro, no solo por el nombre del recurso del intermediario.",
    "headers": [
      "Semántica",
      "que privilegios",
      "Riesgo residual"
    ],
    "rows": [
      [
        "Como máximo una vez",
        "Evite la replay.",
        "Es posible que se pierda el mensaje."
      ],
      [
        "Al menos una vez",
        "Evite la pérdida.",
        "El consumidor debe tolerar duplicados."
      ],
      [
        "Contextual exactamente una vez",
        "Una transacción o canalización controlada.",
        "Los efectos externos pueden estar fuera de la garantía."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.5 Ordenamiento, particiones, idempotencia y duplicados",
    "id": "31-5-ordenamiento-particiones-idempotencia-y-duplicados"
  },
  {
    "kind": "paragraph",
    "text": "El ordenamiento global reduce el paralelismo y es costoso. La mayoría de las plataformas conservan el orden sólo dentro de una cola, partición, canal o sesión, e incluso ese orden puede cambiarse mediante cola, prioridad, múltiples productores o procesamiento simultáneo. La arquitectura debe definir qué entidad necesita orden: cuenta, orden, cliente o agregado. Esta entidad suele guiar la clave de partición o el destino del mensaje."
  },
  {
    "kind": "paragraph",
    "text": "Una clave estable concentra eventos relacionados en la misma partición, pero puede producir particiones activas si la distribución es desigual. Las claves aleatorias mejoran el equilibrio, pero pierden el orden por entidad. El consumidor también necesita procesar de manera compatible: varios subprocesos en la misma partición pueden fallar si no hay coordinación."
  },
  {
    "kind": "paragraph",
    "text": "Los duplicados surgen en los reintentos del productor, la reentrega después de un error, la conmutación por error y el reprocesamiento intencional. La idempotencia puede utilizar clave comercial, versión agregada, tabla de bandeja de entrada, comparar y configurar, insertar o control de secuencia. La solución debe definir cuánto tiempo se mantiene la deduplicación y cuál es el comportamiento cuando reaparece un mensaje antiguo."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "Pregunte siempre: ¿orden entre qué mensajes, dentro de qué unidad, observado por qué consumidor y durante qué ventana? Decir simplemente que el corredor mantiene el orden es insuficiente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.6 Kafka: arquitectura distribuida",
    "id": "31-6-kafka-arquitectura-distribuida"
  },
  {
    "kind": "paragraph",
    "text": "Kafka organiza los datos en temas divididos. Cada partición es un registro ordenado de registros identificados mediante compensaciones crecientes. Una partición tiene una réplica líder que maneja lecturas y escrituras y réplicas seguidoras que monitorean el registro. La replicación aumenta la tolerancia a fallas, pero la durabilidad percibida depende de las configuraciones del productor, la cantidad de réplicas y el conjunto de réplicas sincronizadas."
  },
  {
    "kind": "paragraph",
    "text": "Los corredores almacenan particiones y atienden a los clientes. Los metadata del clúster se coordinan mediante el modo KRaft, basándose en un quórum de controladores. La separación entre intermediarios y controladores puede ser física o lógica, según el tamaño y la topología. La planificación de la capacidad considera disco secuencial, caché de páginas, red, número de particiones, replicación, retención y patrón de acceso."
  },
  {
    "kind": "paragraph",
    "text": "Los temas no son colas exclusivas. Varios grupos de consumidores pueden leer el mismo tema de forma independiente. Dentro de un grupo, cada partición activa se asigna solo a un consumidor a la vez, lo que limita el paralelismo útil al número de particiones. Agregar consumidores más allá de este número no aumenta el rendimiento de ese grupo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-03-kafka.svg",
    "alt": "Temas, particiones, réplicas y grupos de consumidores en Kafka",
    "caption": "Figura 3: Kafka combina particiones, replicación y grupos de consumidores para escalar el almacenamiento y el consumo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.7 Productores, consumidores, compensaciones y transacciones en Kafka",
    "id": "31-7-productores-consumidores-compensaciones-y-transacciones-en-kafka"
  },
  {
    "kind": "paragraph",
    "text": "El productor elige tema, clave, headers y carga útil. La clave puede determinar la partición y los registros de grupos por lotes para mejorar la eficiencia. La configuración de acks controla cuándo la publicación se considera completa. El productor idempotente evita la duplicación causada por reintentos dentro de las garantías respaldadas por el protocolo. Esto no convierte automáticamente en idempotente a un consumidor que escribe a otro banco."
  },
  {
    "kind": "paragraph",
    "text": "Los consumidores son parte de grupos, reciben particiones y controlan las compensaciones. La confirmación anticipada puede perder el procesamiento; La confirmación tardía puede provocar una nueva entrega. Los reequilibrios redistribuyen particiones cuando los miembros se unen, abandonan o cambian de suscripción. Las estrategias cooperativas y el manejo correcto de las revocaciones reducen las pausas, pero el consumidor necesita terminar o detener el trabajo de manera segura."
  },
  {
    "kind": "paragraph",
    "text": "Las transacciones de Kafka pueden agrupar compensaciones de publicación y compromiso para canalizaciones de consumo, transformación y producción dentro del ecosistema de Kafka. Con un aislamiento adecuado, los consumidores evitan leer registros abortados. La garantía no se extiende automáticamente a bancos externos, correos electrónicos o llamadas HTTP. A estos efectos, la Bandeja de salida, la Bandeja de entrada y la idempotencia siguen siendo relevantes."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La confiabilidad de Kafka surge de la combinación de varias decisiones.",
    "headers": [
      "Elemento",
      "Decisión técnica",
      "Impacto"
    ],
    "rows": [
      [
        "clave",
        "Entidad utilizada en la partición.",
        "Realización de pedidos y distribución de carga."
      ],
      [
        "acks",
        "Nivel de confirmación del clúster.",
        "Durabilidad y latencia."
      ],
      [
        "compromiso de compensación",
        "Momento en el que el grupo avanza.",
        "Pérdida o duplicación tras fallo."
      ],
      [
        "Reequilibrar",
        "Redistribución de particiones.",
        "Pausa, revocación y paralelismo."
      ],
      [
        "Transacción",
        "Puestos atómicos y compensaciones en Kafka.",
        "Exactamente una vez dentro de fronteras controladas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.8 Retención, compresión, reproducción, Kafka Connect y Kafka Streams",
    "id": "31-8-retencion-compresion-reproduccion-kafka-connect-y-kafka-streams"
  },
  {
    "kind": "paragraph",
    "text": "La retención por tiempo o tamaño elimina los segmentos antiguos independientemente de si todos los consumidores los han leído. El escalado debe garantizar que los consumidores tardíos no excedan la ventana de retención. La compresión de registros eventualmente preserva el registro más reciente por clave y es útil para registros de cambios y reconstrucción de estado. Las lápidas representan eliminaciones en el modelo comprimido."
  },
  {
    "kind": "paragraph",
    "text": "La replay es una característica poderosa y peligrosa. Reposicionar las compensaciones le permite reconstruir proyecciones y corregir consumidores, pero también puede repetir efectos externos. Antes del reprocesamiento, el equipo debe separar a los consumidores puramente deterministas de aquellos que envían correos electrónicos, cargan cantidades o llaman a terceros. Los entornos de reproducción, los subprocesos de salida separados y los ensayos en seco reducen el riesgo."
  },
  {
    "kind": "paragraph",
    "text": "Kafka Connect estandariza la integración con orígenes y destinos mediante conectores, tareas y compensaciones. Kafka Streams ofrece una biblioteca para transformaciones, uniones, ventanas y almacenes de estado. Estos componentes no eliminan las decisiones de esquema, semántica, partición y manejo de errores; Proporcionan runtime y abstracciones para implementarlos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.9 RabbitMQ: arquitectura, intercambios, colas y enlaces",
    "id": "31-9-rabbitmq-arquitectura-intercambios-colas-y-enlaces"
  },
  {
    "kind": "paragraph",
    "text": "RabbitMQ recibe conexiones TCP y multiplexa canales lógicos. Los hosts virtuales aíslan espacios de nombres, permisos y topologías. En AMQP 0-9-1, los editores publican en intercambios. El intercambio analiza el tipo, la clave de enrutamiento, los headers y los enlaces para reenviar el mensaje a una o más colas, flujos u otros intercambios. Un mensaje no enrutado se puede descartar o devolver al editor cuando se utiliza el modo obligatorio."
  },
  {
    "kind": "paragraph",
    "text": "Los intercambios directos comparan exactamente las claves de enrutamiento; patrones jerárquicos de uso de temas; distribuir en abanico a todos los enlaces; Los headers utilizan propiedades del mensaje. Las colas almacenan mensajes para los consumidores. La durabilidad de la cola, la persistencia de mensajes y la replicación son conceptos diferentes: todos deben ser coherentes con el requisito de supervivencia ante fallos."
  },
  {
    "kind": "paragraph",
    "text": "Las conexiones requieren relativamente muchos recursos; Los canales se utilizan para operaciones multiplex. Abrir un canal mediante mensaje es antipatrón. Los editores y consumidores de larga duración deben encargarse de la reconexión, la recuperación de la topología, las confirmaciones, los reconocimientos y el flujo. El intermediario no reemplaza la lógica de la aplicación para la deduplicación o la conciliación."
  },
  {
    "kind": "subhead",
    "text": "RabbitMQ AMQP 0-9-1: publicación para intercambio y enrutamiento a colas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-04-rabbitmq.svg",
    "alt": "Publicaciones de enrutamiento de RabbitMQ Exchange a colas",
    "caption": "Figura 4: Los intercambios desacoplan la publicación y las colas mediante reglas de enrutamiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - La central decide el enrutamiento; la cola decide el almacenamiento y la entrega a los consumidores.",
    "headers": [
      "Intercambio",
      "regla",
      "Uso común"
    ],
    "rows": [
      [
        "directo",
        "Enrutamiento de claves exacto.",
        "Comandos por categoría o destino."
      ],
      [
        "Topic",
        "Patrones con palabras y comodines.",
        "Eventos jerárquicos y suscripciones selectivas."
      ],
      [
        "Distribución en abanico",
        "Ignore la clave de enrutamiento y distribúyala a todos.",
        "Transmitir a múltiples colas."
      ],
      [
        "Headers",
        "Combina headers de mensajes.",
        "Enrutamiento por múltiples atributos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.10 RabbitMQ: acuses de recibo, captación previa, colas de quórum, transmisiones y DLX",
    "id": "31-10-rabbitmq-acuses-de-recibo-captacion-previa-colas-de-quorum-transmisiones-y-dlx"
  },
  {
    "kind": "paragraph",
    "text": "Los reconocimientos de los consumidores pueden ser automáticos o manuales. En el modo manual, el consumidor confirma después de completar el trabajo, rechaza sin hacer cola cuando el mensaje no es válido o solicita volver a poner en cola cuando la falla parece temporal. La cola indiscriminada puede crear un bucle de reenvío. La captación previa limita la cantidad de mensajes no confirmados por consumidor y funciona como un mecanismo de contrapresión y distribución de carga."
  },
  {
    "kind": "paragraph",
    "text": "Las confirmaciones del editor informan que el corredor ha asumido la responsabilidad de la publicación. Son independientes de los reconocimientos de los consumidores. Para un alto rendimiento, las aplicaciones suelen utilizar confirmaciones asincrónicas y secuencias de correlación, en lugar de bloquear después de cada mensaje. El uso de transacciones de canal es posible, pero tienden a costar más y no reemplazan las transacciones comerciales."
  },
  {
    "kind": "paragraph",
    "text": "Las colas de quórum son colas replicadas destinadas a la seguridad y el consenso de los datos. Las colas clásicas siguen siendo útiles para casos específicos, pero no son la opción para alta disponibilidad. Las transmisiones y las supertransmisiones ofrecen retención, reproducción y partición. Los intercambios de mensajes fallidos reciben mensajes caducados, rechazados o excedentes según las políticas. Los mensajes venenosos necesitan recuento de intentos, cuarentena y manejo operativo, no solo una cola infinita."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Las características de confiabilidad deben combinarse con el comportamiento correcto de la aplicación.",
    "headers": [
      "Característica",
      "resolver",
      "Precaución"
    ],
    "rows": [
      [
        "captación previa",
        "Número de entregas en vuelo.",
        "Un valor alto aumenta la memoria y el trabajo perdido en caso de falla."
      ],
      [
        "Confirmación del editor",
        "Aceptación de la publicación por parte del corredor.",
        "No confirma el procesamiento del consumidor."
      ],
      [
        "manual de respuesta",
        "Conclusión del consumidor.",
        "Aceptar demasiado pronto puede perder efecto."
      ],
      [
        "Cola de quórum",
        "Replicación y seguridad de datos.",
        "Mayor costo de disco, red y quórum."
      ],
      [
        "DLX/DLQ",
        "Separación de mensajes no procesables.",
        "Necesita propiedad, alertas y reprocesamiento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.11 AMQP 0-9-1 y AMQP 1.0",
    "id": "31-11-amqp-0-9-1-y-amqp-1-0"
  },
  {
    "kind": "paragraph",
    "text": "AMQP 0-9-1 es el modelo de protocolo ampliamente asociado con RabbitMQ. Define intercambios, colas, enlaces, canales y métodos como basic.publish, basic.consume y acuses de recibo. AMQP 1.0 es un estándar OASIS diferente: define protocolo de cable binario, sistema de tipos, mensajes, conexiones, sesiones, enlaces, control de flujo, liquidación y resultados. Compartir el nombre AMQP no hace que las versiones sean directamente interoperables."
  },
  {
    "kind": "paragraph",
    "text": "En AMQP 1.0, un enlace es unidireccional entre el origen y el destino y tiene endpoints de remitente y receptor. Las entregas pueden permanecer sin resolver hasta que las partes acuerden el resultado. Flujo de control de créditos de enlace. La especificación no requiere una topología de intermediario con intercambios y colas iguales a las de RabbitMQ 0-9-1; Los productos asignan conceptos de protocolo a sus propias entidades."
  },
  {
    "kind": "paragraph",
    "text": "Los arquitectos deben registrar la versión y la implementación de forma explícita. Decir que simplemente usamos AMQP es insuficiente. Una biblioteca AMQP 1.0 no se conecta automáticamente a un endpoint que solo acepta 0-9-1. La autenticación SASL, el direccionamiento, la liquidación, las transacciones y las extensiones de productos también varían."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-05-amqp.svg",
    "alt": "Capas de conexión, sesión y enlace AMQP 1.0",
    "caption": "Figura 5: AMQP 1.0 define una pila de protocolos diferente al modelo de cola/intercambio AMQP 0-9-1."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Las dos familias deben documentarse por separado.",
    "headers": [
      "Apariencia",
      "AMQP 0-9-1",
      "AMQP 1.0"
    ],
    "rows": [
      [
        "Énfasis",
        "Modelo de broker con intercambios y colas.",
        "Protocolo cableado y mensajería en capas."
      ],
      [
        "Unidad lógica",
        "Conexión y canal.",
        "Conexión, sesión y vínculo."
      ],
      [
        "Enrutamiento",
        "Intercambio, clave de enrutamiento y fijaciones.",
        "Semántica de origen/destino y producto."
      ],
      [
        "Confirmación",
        "Confirmaciones de editores y reconocimientos de consumidores.",
        "Liquidación, estado de entrega y resultados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.12 Mensajería de Yakarta/JMS",
    "id": "31-12-mensajeria-de-yakarta-jms"
  },
  {
    "kind": "paragraph",
    "text": "JMS era la API de Java estandarizada para mensajería corporativa y ahora forma parte de Jakarta Messaging. Ofrece interfaces para crear conexiones, producir, consumir y leer mensajes a través de un proveedor. La API simplificada utiliza JMSContext, mientras que el modelo clásico separa Conexión, Sesión, MessageProducer y MessageConsumer. El destino representa la cola o el tema."
  },
  {
    "kind": "paragraph",
    "text": "JMS define modelos punto a punto y de publicación/suscripción, suscripciones duraderas, selectores, modo de entrega, prioridad, vencimiento, modos de reconocimiento y sesiones de transacciones. También se integra con transacciones distribuidas por XA cuando el proveedor y el entorno lo admiten. XA puede ser necesario en legados, pero agrega costos operativos y de acoplamiento; Los patrones como Outbox suelen ser los preferidos en los microservicios."
  },
  {
    "kind": "paragraph",
    "text": "JMS no define un protocolo de red único ni garantiza que todos los proveedores implementen topologías idénticas. Un proveedor puede utilizar un protocolo propietario, AMQP u otro transporte. Migrar desde un proveedor requiere validar la semántica del destino, la reenvío, los selectores, las transacciones, los destinos temporales, las suscripciones duraderas y la administración. El código Java puede compilarse y aun así exhibir un comportamiento operativo diferente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/es/figure-06-jms.svg",
    "alt": "Jakarta Messaging conecta la aplicación Java con el proveedor y los destinos",
    "caption": "Figura 6: Jakarta Messaging estandariza la API de la aplicación, mientras el proveedor implementa la conexión con el sistema de mensajería."
  },
  {
    "kind": "code",
    "text": "try (JMSContext context = connectionFactory.createContext()) {\n    Queue fila = context.createQueue(\"cola.pagos\");\n    JMSProducer producer = context.createProducer();\n    producer.setProperty(\"eventType\", \"PagamentoCriado\");\n    producer.send(fila, jsonPayload);\n}\n// El consumidor debe gestionar redelivery e idempotencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.13 Estándares de integración de mensajería",
    "id": "31-13-estandares-de-integracion-de-mensajeria"
  },
  {
    "kind": "paragraph",
    "text": "Los consumidores competidores distribuyen el trabajo entre instancias. Publicar/Suscribir ofrece el mismo evento a diferentes grupos. Solicitud-Respuesta utiliza el ID de correlación y el destino de la respuesta, pero puede recrear el acoplamiento sincrónico a través del intermediario. Dead Letter Channel aísla los mensajes no procesables. El reintento retrasado debe diferenciar el fallo transitorio del error permanente y limitar los reintentos."
  },
  {
    "kind": "paragraph",
    "text": "La Bandeja de salida transaccional registra cambios y eventos comerciales en la misma transacción local; un relevo publica más tarde. La bandeja de entrada registra los mensajes procesados para su deduplicación. Saga coordina transacciones y compensaciones locales. La transferencia de estado transportada por eventos transporta suficientes datos en el evento para reducir las llamadas sincrónicas. Claim Check almacena una gran carga útil fuera del corredor y transporta solo referencias seguras."
  },
  {
    "kind": "paragraph",
    "text": "Cada patrón tiene un costo. Las colas de reintento aumentan la topología y la latencia. DLQ sin un proceso operativo se convierte en un cementerio silencioso. Solicitud-Respuesta puede saturar colas temporales. La transferencia de estado transmitida por eventos replica datos y requiere control de privacidad. El diseño debe incluir SLO, seguimiento, propiedad y procedimiento de reprocesamiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Las normas sólo están completas cuando incluyen operación y recuperación.",
    "headers": [
      "Estándar",
      "Objetivo",
      "Riesgo"
    ],
    "rows": [
      [
        "Consumidores competitivos",
        "Escalar el procesamiento de tareas.",
        "Ordenamiento y carga desiguales."
      ],
      [
        "Pub/Sub",
        "Distribuya eventos a múltiples dominios.",
        "Contratos y consumidores olvidados."
      ],
      [
        "Reintentar + DLQ",
        "Separe las fallas transitorias y permanentes.",
        "Bucles, acumulación y reprocesamiento inseguro."
      ],
      [
        "Bandeja de salida + bandeja de entrada",
        "Coordinar actividades bancarias y editoriales; deduplicar.",
        "Latencia y almacenamiento operativo."
      ],
      [
        "Solicitud-Respuesta",
        "Obtenga una respuesta asincrónica correlacionada.",
        "Recrear la dependencia temporal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.14 Seguridad, gobernanza de esquemas y privacidad",
    "id": "31-14-seguridad-gobernanza-de-esquemas-y-privacidad"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad comienza con el transporte y la identidad. Kafka puede utilizar TLS, mTLS, SASL y ACL; RabbitMQ combina TLS, mecanismos de autenticación, usuarios, vhosts y permisos; Los proveedores de JMS tienen sus propios controles. Las credenciales necesitan rotación, least privilege y separación por aplicación. Depender de una red interna no reemplaza la autenticación entre cargas de trabajo."
  },
  {
    "kind": "paragraph",
    "text": "La autorización debe limitar temas, grupos, intercambios, colas y operaciones administrativas. Un productor comprometido no debería publicar en ningún dominio y un consumidor no debería leer eventos confidenciales innecesariamente. En los corredores multitenant, las cuotas, el aislamiento del espacio de nombres y la protección de vecinos ruidosos son parte de la seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Los esquemas necesitan catálogo, propietario, compatibilidad y clasificación de datos. Los acontecimientos que persisten durante días o meses aumentan el impacto de la filtración y el derecho a retención. El cifrado en reposo protege los medios, pero no impide que los consumidores autorizados vean las cargas útiles. La tokenización, la minimización y la separación de temas pueden ser necesarias para la LGPD y las políticas corporativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.15 Alta disponibilidad, capacidad y contrapresión",
    "id": "31-15-alta-disponibilidad-capacidad-y-contrapresion"
  },
  {
    "kind": "paragraph",
    "text": "Kafka distribuye particiones y réplicas entre intermediarios. RabbitMQ utiliza colas de quórum, transmisiones y otros mecanismos según el tipo de datos. La alta disponibilidad no se trata solo de tener tres nodos: es necesario distribuir fallas, probar la elección del líder, verificar la replicación, dimensionar el disco y asegurarse de que los clientes descubran nuevos líderes o se vuelvan a conectar correctamente."
  },
  {
    "kind": "paragraph",
    "text": "La capacidad está determinada por la tasa de entrada, la tasa de salida, el tamaño del mensaje, la retención, la replicación y el trabajo pendiente máximo. Un flujo que recibe 20 MB/s, se replica tres veces y retiene siete días requiere mucho más que la suma de la carga útil del negocio. En el cálculo se incluyen la compresión, los índices, la caché de páginas, los picos, el reequilibrio y el margen operativo."
  },
  {
    "kind": "paragraph",
    "text": "La contrapresión evita que los productores o intermediarios cobren de más a los consumidores. Kafka expresa la presión del retraso, los límites de las encuestas y la capacidad del consumidor. RabbitMQ utiliza captación previa, control de flujo y límites de cola. La aplicación necesita reducir conscientemente el consumo, escalar o rechazar el trabajo. La acumulación de trabajos pendientes sin SLO solo traslada la indisponibilidad al futuro."
  },
  {
    "kind": "subhead",
    "text": "Planificación de capacidad"
  },
  {
    "kind": "paragraph",
    "text": "Tamaño del peor trabajo atrasado aceptable, no sólo el promedio. Incluya retención, replicación, gastos generales, reprocesamiento, mantenimiento y crecimiento. El corredor necesita sobrevivir al período en el que los consumidores se degradan."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.16 Observabilidad y retroubleshooting",
    "id": "31-16-observabilidad-y-retroubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad de los mensajes debe conectar al productor, al intermediario y al consumidor. Las métricas esenciales incluyen tasa de publicación, tasa de consumo, bytes, latencia, errores, confirmaciones pendientes, mensajes no confirmados, retrasos, trabajos pendientes, antigüedad de los mensajes más antiguos, reenvíos, DLQ, particiones sin réplica sincronizada y utilización del disco. Una sola métrica rara vez explica el problema."
  },
  {
    "kind": "paragraph",
    "text": "En Kafka, un retraso elevado puede significar un consumidor lento, una partición activa, un reequilibrio frecuente, un error de procesamiento o una falta de capacidad. En RabbitMQ, los mensajes listos, los mensajes no confirmados y la tasa de reconocimiento ayudan a distinguir la cola acumulada de los consumidores estancados. En JMS, el diagnóstico también depende del proveedor y del modo de reconocimiento o transacción."
  },
  {
    "kind": "paragraph",
    "text": "Los seguimientos distribuidos deben propagar el contexto traceparent o equivalente en los headers, pero el intervalo asincrónico no debe pretender ser una llamada sincrónica larga. Los ID de correlación, los ID de mensajes, los ID de causa y las marcas de tiempo le permiten reconstruir una cadena de eventos. Los registros deben evitar cargas útiles sensibles y decisiones de registro: publicadas, confirmadas, entregadas, reintentadas, con letras muertas y reconocidas."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: La solución eficaz de problemas separa la publicación, el almacenamiento, la entrega y el procesamiento.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Retraso creciente en Kafka",
        "Consumidor lento, partición en caliente o reequilibrio.",
        "Lag por partición, tiempo de procesamiento y eventos de grupo."
      ],
      [
        "Mensajes listos en RabbitMQ",
        "Falta de consumidores o error de ruta.",
        "Recuento de consumidores, tasa de entrega y consolidaciones."
      ],
      [
        "muchos sin atacar",
        "Captura previa alta, consumidor atascado o respuesta tardía.",
        "No registrado por canal y duración del procesamiento."
      ],
      [
        "DLQ creciendo",
        "Contrato no válido, dependencia rota o mensaje envenenado.",
        "Motivo, reintento de headers y error de aplicación."
      ],
      [
        "Duplicados",
        "Reintentar, volver a enviar o confirmar/reconocer fuera de servicio.",
        "ID, compensaciones, indicador de reenvío y tabla de bandeja de entrada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.17 Estudios de casos y laboratorios",
    "id": "31-17-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso de estudio 1 - pagos: la API registra el pedido y una Bandeja de salida en la misma transacción. Un relé publica PaymentCreated en Kafka usando el id. de pago como clave. Los servicios de fraude, notificación y conciliación utilizan grupos independientes. El servicio antifraude mantiene la orden de pago y publica la decisión. Las repeticiones se realizan en subprocesos de salida aislados para no reenviar efectos externos."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: tareas operativas: un sistema publica comandos en un tema de intercambio de RabbitMQ. Las colas por capacidad reciben mensajes por clave de enrutamiento. Los consumidores utilizan la captación previa limitada, el reconocimiento manual y el reintento retrasado. Después del límite, los mensajes van al DLQ con la causa y el recuento. Un proceso operativo permite corregir y volver a publicar los datos con idempotencia clave."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: Java heredado: una aplicación Jakarta EE utiliza JMS para publicar en un proveedor corporativo. La modernización preserva el contrato lógico, pero revisa las transacciones XA, los selectores, las suscripciones duraderas y la reentrega antes de migrar a otro corredor. El equipo evita asumir que la misma API de Java significa un comportamiento idéntico entre proveedores."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Publicar mensajes en Kafka con dos claves y observar particiones y compensaciones. 2) Crear dos consumidores en el mismo grupo y luego en grupos diferentes. 3) En RabbitMQ, configure intercambios directos, de temas y en abanico. 4) Pruebas manuales de reconocimiento, captación previa, nack, puesta en cola y DLQ. 5) Implementar un consumidor idempotente con Inbox. 6) Comparar una API JMS con el protocolo real utilizado por el proveedor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "La mensajería desacopla a productores y consumidores en tiempo y capacidad, pero no elimina los contratos, la propiedad o las fallas distribuidas. Las colas, la publicación/suscripción y los registros particionados tienen ciclos de vida diferentes. La elección debe considerar la retención, la replay, el orden, la distribución y la naturaleza del trabajo."
  },
  {
    "kind": "paragraph",
    "text": "Kafka organiza temas en particiones persistentes y ofrece grupos de consumidores, compensaciones, retención, compresión y canalizaciones transaccionales dentro de límites controlados. RabbitMQ enfatiza el enrutamiento a través de intercambios, colas, reconocimientos, confirmaciones, colas de quórum, transmisiones y topologías de entrega flexibles. AMQP 0-9-1 y AMQP 1.0 son protocolos distintos a pesar de su nombre común."
  },
  {
    "kind": "paragraph",
    "text": "Jakarta Messaging/JMS estandariza la programación Java, no el intermediario ni el protocolo de conexión. En cualquier plataforma, la verdadera confiabilidad depende de la combinación de confirmaciones, idempotencia, pedidos, reintentos, DLQ, observabilidad y capacidad. El mejor diseño explica las ventanas de falla y el procedimiento de recuperación."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en la observabilidad de las API y los sistemas distribuidos, conectando registros, métricas y seguimiento con OpenTelemetry. Los conceptos de correlación ID, retraso, retraso, reentrega y causalidad aquí estudiados serán esenciales."
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
      "El modelo se eligió conscientemente: cola, pub/sub, registro o transmisión.",
      "Se documenta el contrato, propietario, versión y clasificación de datos del mensaje.",
      "La confirmación del productor y el reconocimiento del consumidor se manejaron por separado.",
      "Se definen la unidad de pedido y la clave de partición.",
      "Los consumidores son idempotentes o tienen una estrategia explícita para los duplicados.",
      "Los reintentos tienen límite, retraso y distinción entre falla transitoria y permanente.",
      "DLQ cuenta con alerta, propietario, procedimiento de análisis y reprocesamiento seguro.",
      "La retención, la reproducción y la compresión se evaluaron en función de la privacidad y la capacidad.",
      "Los permisos siguen el privilegio mínimo para temas, grupos, vhosts, intercambios y colas.",
      "Se monitorean el retraso, el trabajo pendiente, la antigüedad de los mensajes, las confirmaciones, los no confirmados y el DLQ.",
      "Se han probado la conmutación por error, la elección, la reconexión y el desastre.",
      "Los planes de capacidad incluyen replicación, picos, mantenimiento y reprocesamiento."
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
      "Diferenciar cola tradicional, publicación/suscripción y registro distribuido.",
      "Explique por qué la confirmación del editor no reemplaza el reconocimiento del consumidor.",
      "Describe una situación de al menos una vez y cómo hacerla idempotente.",
      "Explique por qué Kafka preserva el orden por partición y no globalmente.",
      "Describa la relación entre tema, partición, compensación y grupo de consumidores.",
      "Compare intercambios directos, de temas, de distribución en abanico y de headers en RabbitMQ.",
      "Diferenciar entre cola de quórum, cola clásica y secuencia.",
      "Explique por qué AMQP 0-9-1 y AMQP 1.0 no deben tratarse como la misma cosa.",
      "Describa la función de JMSContext, Destino, Productor y Consumidor.",
      "Reintento de diseño y DLQ para un consumidor que llama a un servicio externo.",
      "Enumere las métricas para diagnosticar un retraso alto en Kafka y un retraso alto sin verificar en RabbitMQ.",
      "Proponer una estrategia de replay que no repita efectos externos peligrosos."
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
    "caption": "Tabla 9 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Reconocimiento",
        "Confirmación del consumidor al corredor sobre el procesamiento de una entrega."
      ],
      [
        "Encuadernación",
        "Regla que conecta el intercambio con la cola, flujo u otro intercambio en RabbitMQ."
      ],
      [
        "corredor",
        "Intermediario que recibe, almacena, enruta y entrega mensajes."
      ],
      [
        "grupo de consumidores",
        "Conjunto de consumidores que divide particiones de un tema de Kafka."
      ],
      [
        "Cola de mensajes fallidos",
        "Destino de los mensajes que no se pudieron procesar normalmente."
      ],
      [
        "Semántica de entrega",
        "Garantía observada como máximo una vez, al menos una vez o exactamente una vez en un contexto específico."
      ],
      [
        "Intercambio",
        "Entidad RabbitMQ que enruta publicaciones según tipo y enlaces."
      ],
      [
        "Idempotencia",
        "Propiedad de repetir una operación sin cambiar el resultado final más allá de la primera ejecución."
      ],
      [
        "JMSContext",
        "Interfaz principal de la API de mensajería de Yakarta simplificada."
      ],
      [
        "KRaft",
        "Metadata de controladores Kafka y modo de quórum."
      ],
      [
        "compensar",
        "Posición de un registro en una partición o secuencia."
      ],
      [
        "Partición",
        "Subdivisión ordenada y escalable de un tema Kafka."
      ],
      [
        "captación previa",
        "Límite de mensajes no reconocidos entregados a un consumidor de RabbitMQ."
      ],
      [
        "Confirmación del editor",
        "Confirmación del corredor al productor sobre la publicación."
      ],
      [
        "Cola de quórum",
        "Cola replicada RabbitMQ orientada a la seguridad de datos."
      ],
      [
        "Liquidación",
        "Acuerdo sobre el estado final de una entrega en AMQP 1.0."
      ],
      [
        "lápida sepulcral",
        "Registro con valor nulo utilizado para podar en registros comprimidos."
      ],
      [
        "anfitrión virtual",
        "Límite de espacio de nombres y permisos en RabbitMQ."
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
      "Fundación de software Apache. Documentación de Apache Kafka: conceptos, diseño, operaciones, Connect y Streams.",
      "Documentación de RabbitMQ: colas, intercambios, consumidores, confirmaciones de editores, colas de quórum, transmisiones, TTL y mensajes no entregados.",
      "OASIS. Protocolo avanzado de cola de mensajes (AMQP) versión 1.0.",
      "Yakarta EE.UU. Especificación de Jakarta Messaging 3.1 y documentación API.",
      "Patrones de integración empresarial: canal de mensajes, consumidores competitivos, publicación-suscripción, canal de mensajes no entregados y solicitud-respuesta.",
      "Especificación de CloudEvents: sobre estandarizado para eventos.",
      "Especificación OpenTelemetry: propagación de contexto en mensajería.",
      "OWASP y recomendaciones de seguridad corporativa para brokers, credenciales y datos persistentes."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Las versiones de las bibliotecas y proveedores Kafka, RabbitMQ, JMS evolucionan. Antes de adoptar configuraciones, valide la documentación oficial de la versión implementada, especialmente para KRaft, grupos de consumidores, colas de quórum, transmisiones, AMQP 1.0 e integración transaccional."
  }
];
