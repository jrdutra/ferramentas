import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const MICROSERVICES_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Microservicios: autonomía local con coordinación explícita"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/es/overview.svg",
    "alt": "Canal que integra dominios de pedidos, pagos e inventario con datos propietarios",
    "caption": "Figura de apertura: la autonomía del servicio depende de límites claros y de una integración gobernada."
  },
  {
    "kind": "subhead",
    "text": "Integración madura"
  },
  {
    "kind": "paragraph",
    "text": "Los contratos, la coherencia, la idempotencia, la observabilidad y la propiedad son tan importantes como la división de los servicios."
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
    "text": "Los microservicios a menudo se describen como pequeñas aplicaciones que se comunican a través de API. Esta definición es insuficiente. La arquitectura de microservicios es, ante todo, una forma de organizar sistemas y equipos en torno a capacidades comerciales, autonomía de evolución y límites explícitos de responsabilidad. La división técnica sólo produce beneficios cuando acompaña la propiedad de los datos, los contratos, la operación y el ciclo de vida."
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación monolítica puede tener módulos bien definidos, baja dependencia y excelente capacidad de evolución. En cambio, un conjunto de servicios distribuidos puede formar un monolito distribuido: cada cambio requiere coordinación entre múltiples equipos, las llamadas sincrónicas se encadenan, los bancos se comparten y una falla local arruina todo el viaje. Por lo tanto, los microservicios no deben adoptarse como un objetivo en sí mismo, sino como una respuesta a necesidades concretas de escala organizacional, aislamiento y velocidad de cambio."
  },
  {
    "kind": "paragraph",
    "text": "La integración es el punto en el que la autonomía se encuentra con la realidad distribuida. Los servicios necesitan intercambiar comandos, consultas y eventos; coordinar procesos que cruzan dominios; lidiar con mensajes duplicados y desordenados; mantener la coherencia sin una transacción global; aplicar tiempos de espera y reintentos sin multiplicar la carga; y producir evidencia operativa suficiente para investigar fallas. Existen patrones como Saga, Transactional Outbox, Idempotent Consumer, API Composition, CQRS y Event Sourcing para hacer explícitas estas decisiones."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta los fundamentos de la descomposición y los principales patrones de integración. El objetivo no es recomendar una arquitectura única, sino proporcionar un modelo mental para evaluar las compensaciones. Cada patrón resuelve un problema específico e introduce nuevos costos. La madurez radica en reconocer estas compensaciones, medir el comportamiento real y evitar la complejidad distribuida cuando un diseño más simple sería suficiente."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada patrón, identifique el problema que resuelve, las garantías que realmente ofrece, los nuevos estados de falla que introduce y qué evidencia operativa necesitará. Nunca adoptes un patrón sólo porque aparece en los diagramas de referencia."
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
      "Explique los microservicios como arquitectura sociotécnica, no solo como división de código.",
      "Diferenciar capacidad de negocio, subdominio, contexto acotado, servicio y componente.",
      "Evaluar criterios de descomposición, cohesión, acoplamiento y propiedad de los datos.",
      "Compare comunicaciones, comandos, consultas y eventos sincrónicos y asincrónicos.",
      "Comprenda la coherencia local, la coherencia eventual y los límites de las transacciones distribuidas.",
      "Aplicar Saga mediante coreografía y orquestación con compensaciones comerciales.",
      "Explique la bandeja de salida transaccional, CDC, bandeja de entrada y consumidor idempotente.",
      "Distinguir API Composition, CQRS, vistas materializadas y Event Sourcing.",
      "Diseño de contratos, idempotencias, reintentos, plazos y prevención de fallos en cascada.",
      "Planifique la migración heredada, la observabilidad y la retroubleshooting en viajes distribuidos."
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
      "30.1 Microservicios como arquitectura sociotécnica",
      "30.2 Descomposición por dominio y contextos acotados",
      "30.3 Tamaño, cohesión, acoplamiento y autonomía",
      "30.4 Datos por servicio y límites transaccionales",
      "30.5 Comunicación síncrona y asíncrona",
      "30.6 Contratos, comandos, consultas y eventos",
      "30.7 Coherencia distribuida y transacciones",
      "30.8 Saga: coreografía y orquestación",
      "30.9 Bandeja de salida, CDC y bandeja de entrada transaccionales",
      "30.10 Idempotencia, pedido y entrega",
      "30.11 Composición y agregación de API",
      "30.12 CQRS y vistas materializadas",
      "30.13 Fuente de eventos",
      "30.14 Resiliencia y prevención en cascada",
      "30.15 Descubrimiento de servicios, API Gateway y malla",
      "30.16 Observabilidad y correlación",
      "30.17 Seguridad entre servicios",
      "30.18 Migración de monolitos e higo estrangulador",
      "30.19 Pruebas, gobernanza y plataforma interna",
      "30.20 Antipatrones, retroubleshooting y estudios de casos",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.1 Microservicios como arquitectura sociotécnica",
    "id": "30-1-microservicios-como-arquitectura-sociotecnica"
  },
  {
    "kind": "paragraph",
    "text": "Una arquitectura de microservicios organiza un sistema como un conjunto de servicios implementables de forma independiente alineados con las capacidades comerciales y mantenidos por equipos que asumen la responsabilidad de un extremo a otro. Esta responsabilidad incluye código, datos, seguridad, observabilidad, disponibilidad y evolución del contrato. La independencia de implementación es un indicador importante, pero no es absoluto: los cambios de plataforma, los contratos incompatibles y los eventos compartidos aún requieren una coordinación gobernada."
  },
  {
    "kind": "paragraph",
    "text": "El término sociotécnico es importante porque la estructura del software refleja la estructura de comunicación de los equipos. Si cinco equipos necesitan cambiar simultáneamente el mismo servicio, el límite técnico probablemente no corresponde a la propiedad real. Si un solo equipo mantiene docenas de servicios estrechamente relacionados, la división puede generar costos sin autonomía. La arquitectura necesita alinear dominio, organización y operación."
  },
  {
    "kind": "paragraph",
    "text": "Los microservicios también cambian el modelo de falla. Las llamadas que alguna vez fueron funciones locales se convierten en operaciones de red, sujetas a latencia, pérdida, tiempo de espera, duplicación e indisponibilidad parcial. El sistema debe aceptar que un viaje pueda realizarse en estados intermedios. La complejidad no desaparece; pasa a los contratos, la integración, la coherencia y la observabilidad."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El objetivo no es maximizar la cantidad de servicios, sino minimizar el costo del cambio dentro de límites coherentes. Un servicio sólo es verdaderamente autónomo cuando su equipo controla el comportamiento, los datos, la implementación y la operación sin depender continuamente de cambios coordinados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.2 Descomposición por dominio y contextos acotados",
    "id": "30-2-descomposicion-por-dominio-y-contextos-acotados"
  },
  {
    "kind": "paragraph",
    "text": "La descomposición por capacidad empresarial busca separar lo que hace la organización, y no sólo capas técnicas. Los pagos, el registro, el crédito, el fraude y las notificaciones tienen diferentes reglas, vocabulario, datos y tasas de cambio. El diseño basado en dominios le ayuda a reconocer subdominios y contextos acotados, dentro de los cuales los términos tienen un significado coherente."
  },
  {
    "kind": "paragraph",
    "text": "Un contexto acotado no es automáticamente un microservicio. Puede implementarse inicialmente como un módulo y, según sea necesario, dividirse en servicios. La relación importante es semántica: cada contexto tiene su propio modelo y traduce conceptos integrándolos con otros. Un Cliente en el contexto de la relación puede no tener el mismo conjunto de atributos o invariantes que un Prestatario en el contexto del crédito."
  },
  {
    "kind": "paragraph",
    "text": "El límite debe reducir los cambios que cruzan contextos. Cuando una regla comercial requiere cambios frecuentes en dos servicios, esto puede indicar una división incorrecta o un contrato inadecuado. La tormenta de eventos, el análisis de recorrido, la matriz de dependencia y el historial de cambios ayudan a descubrir mejores límites que la separación por tablas o entidades aisladas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/es/figure-01-bounded-contexts.svg",
    "alt": "Descomposición de microservicios por capacidades empresariales y contextos acotados.",
    "caption": "Figura 1 - La descomposición sigue el lenguaje y las reglas del dominio, no solo de las entidades bancarias."
  },
  {
    "kind": "paragraph",
    "text": "No existe un número ideal de líneas, endpoints o personas para definir un microservicio. Lo pequeño es una consecuencia de una responsabilidad cohesiva, no un objetivo numérico. Un servicio puede encapsular una capacidad compleja y aun así ser adecuado. Dividir demasiado aumenta el tráfico, los contratos, las implementaciones, la observabilidad y los estados de falla."
  },
  {
    "kind": "paragraph",
    "text": "La cohesión mide cuánto cambian las responsabilidades internas en conjunto. El acoplamiento mide cuánto requiere un cambio conocimiento o alteración externos. El diseño busca una alta cohesión dentro del servicio y un reducido acoplamiento entre servicios. El acoplamiento temporal ocurre cuando dos componentes necesitan estar disponibles al mismo tiempo; el acoplamiento de datos surge al compartir esquema o interpretación interna; El acoplamiento de secuencia aparece cuando las llamadas deben ocurrir en estricto orden."
  },
  {
    "kind": "paragraph",
    "text": "Autonomía no significa ausencia de normas. Los servicios pueden compartir plataforma, observabilidad, bibliotecas de seguridad y convenciones contractuales. Tenga cuidado de no crear una biblioteca de dominios común que obligue a todos a evolucionar al mismo ritmo. Compartir capacidades técnicas estables y preservar las decisiones comerciales dentro de contextos responsables."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - La calidad del límite se observa por el comportamiento de los cambios.",
    "headers": [
      "Dimensión",
      "signo saludable",
      "señal de advertencia"
    ],
    "rows": [
      [
        "cohesión",
        "Los cambios relacionados permanecen en el mismo servicio.",
        "Una característica simple cambia muchos servicios."
      ],
      [
        "Datos",
        "Acuerdos claros de propiedad y acceso.",
        "Escritura directa a la base de datos de otro dominio."
      ],
      [
        "Implementar",
        "Las versiones se pueden implementar de forma independiente.",
        "Tren de liberación obligatorio para todos los cambios."
      ],
      [
        "Operación",
        "El equipo observa y apoya su capacidad.",
        "Responsabilidad fragmentada entre varias áreas."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "El principio de base de datos por servicio establece que un servicio controla sus datos y que otros componentes acceden a esta información por contrato, no por tablas compartidas. Esto no requiere un servidor físico por servicio; lo importante es la propiedad lógica y la imposibilidad de cambios externos no gobernados. Esquemas separados, permisos distintos y canales de migración independientes ayudan a reforzar la frontera."
  },
  {
    "kind": "paragraph",
    "text": "Compartir una base de datos parece simple al principio, pero permite uniones y actualizaciones que cruzan dominios, lo que convierte al esquema en un contrato implícito. Un cambio de columna ahora requiere una amplia coordinación, y los consumidores que escriben directamente pueden violar las invariantes comerciales. La autonomía del servicio es sólo aparente."
  },
  {
    "kind": "paragraph",
    "text": "La consecuencia es que las transacciones ACID normalmente terminan en el límite del servicio. Los procesos entre servicios deben aceptar una eventual coherencia o utilizar una coordinación explícita. Esto no significa aceptar datos incorrectos; significa modelar estados intermedios, definir invariantes locales, comunicar transiciones y ofrecer mecanismos de reconciliación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.5 Comunicación síncrona y asíncrona",
    "id": "30-5-comunicacion-sincrona-y-asincrona"
  },
  {
    "kind": "paragraph",
    "text": "En la comunicación sincrónica, el consumidor envía una solicitud y espera una respuesta. HTTP/REST y gRPC son ejemplos frecuentes. El modelo es simple para operaciones que requieren resultados inmediatos, pero crea un acoplamiento temporal: el consumidor, la red, los intermediarios y el proveedor deben estar disponibles en el mismo período de tiempo. Las cadenas largas multiplican la latencia y la probabilidad de fallo."
  },
  {
    "kind": "paragraph",
    "text": "En la comunicación asincrónica, el productor publica un mensaje sin depender de la finalización inmediata del consumidor. Los corredores y los registros distribuidos desacoplan la disponibilidad y permiten absorber los picos. El costo es una mayor complejidad estatal: la operación puede ser aceptada pero aún no procesada; los mensajes se pueden repetir; los consumidores pueden retrasarse; y el usuario necesita un mecanismo para verificar el progreso o recibir notificaciones."
  },
  {
    "kind": "paragraph",
    "text": "La elección debe seguir la semántica del negocio. Una consulta de saldo puede requerir una respuesta inmediata. El envío de una notificación puede ser asincrónico. Un pago puede comenzar de forma sincrónica, devolver un identificador y completarse por eventos. Los sistemas maduros combinan modelos en lugar de imponer un estilo único en todos los viajes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/es/figure-02-sync-async.svg",
    "alt": "Comparación entre integración sincrónica y asincrónica",
    "caption": "Figura 2 - Disponibilidad de parejas síncronas; asincrónico introduce estados y procesamiento posterior."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - El modelo de comunicación cambia garantías y experiencia operativa.",
    "headers": [
      "Criterio",
      "sincrónico",
      "Asíncrono"
    ],
    "rows": [
      [
        "Resultado",
        "Disponible en la respuesta.",
        "Completado más tarde."
      ],
      [
        "acoplamiento temporal",
        "Más grande.",
        "El más pequeño entre productor y consumidor."
      ],
      [
        "fracaso",
        "Visible inmediatamente para la persona que llama.",
        "Requiere reintento, DLQ y reconciliación."
      ],
      [
        "Picos",
        "Presionan directamente al proveedor.",
        "Se pueden amortiguar mediante cola o registro."
      ],
      [
        "Experiencia",
        "Flujo simple de solicitud/respuesta.",
        "Estado, devolución de llamada, evento o sondeo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.6 Contratos, comandos, consultas y eventos",
    "id": "30-6-contratos-comandos-consultas-y-eventos"
  },
  {
    "kind": "paragraph",
    "text": "Un comando expresa la intención de cambiar de estado, como AuthorizePayment. Una consulta solicita información sin cambiar el estado observable. Un evento indica que ya ocurrió algo relevante, como un Pago Autorizado. Mezclar estas semánticas produce contratos confusos. Un acontecimiento no debe ser una orden encubierta para un solo consumidor, y una orden no debe publicarse como un hecho consumado."
  },
  {
    "kind": "paragraph",
    "text": "Los eventos de dominio representan hechos relevantes dentro de un contexto acotado. Los eventos de integración son contratos publicados para otros contextos y pueden tener un formato más estable, filtrado y gobernado. No todos los acontecimientos internos deben cruzar la frontera. Publicar demasiados detalles vincula a los consumidores con la implementación."
  },
  {
    "kind": "paragraph",
    "text": "Los contratos deben definir esquema, versión, identidad del productor, clave de correlación, marca de tiempo, semántica de replay y política de evolución. En la comunicación sincrónica, OpenAPI o Protobuf ayudan a formalizarse. En eventos, AsyncAPI, esquemas de registro y pruebas de compatibilidad reducen los cambios importantes."
  },
  {
    "kind": "subhead",
    "text": "Sobre conceptual del evento de incorporación"
  },
  {
    "kind": "code",
    "text": "{\n  \"eventId\": \"0c02d9d2-...\",\n  \"eventType\": \"PagoAutorizado\",\n  \"occurredAt\": \"2026-07-16T11:42:00Z\",\n  \"aggregateId\": \"pag-84219\",\n  \"correlationId\": \"ord-19384\",\n  \"version\": 3,\n  \"data\": { \"importe\": 125.40, \"moneda\": \"BRL\" }\n}\n30.7 Consistência distribuída e transações"
  },
  {
    "kind": "paragraph",
    "text": "Una transacción local protege las invariantes dentro de un servicio. Cuando un proceso cruza múltiples servicios, una transacción ACID global requeriría coordinación distribuida, disponibilidad de los participantes y protocolo de confirmación. En las arquitecturas modernas, este costo y este acoplamiento a menudo hacen que, en última instancia, sea preferible la coherencia con las compensaciones y la reconciliación."
  },
  {
    "kind": "paragraph",
    "text": "La coherencia eventual no significa ausencia de reglas. El sistema define qué invariantes deben ser inmediatos y cuáles pueden converger. Un débito no puede exceder el saldo disponible dentro del servicio que controla la cuenta. La proyección analítica o el estado mostrado en otro contexto se puede actualizar unos segundos más tarde."
  },
  {
    "kind": "paragraph",
    "text": "Los procesos distribuidos necesitan modelar estados como PENDIENTE, RESERVADO, AUTORIZADO, FALLIDO y COMPENSADO. Estos estados hacen que el progreso sea observable y permiten reintentos seguros. Ocultar la espera detrás de una transacción larga o realizar llamadas síncronas en cascada no elimina la distribución; simplemente lo hace más frágil."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.8 Saga: coreografía y orquestación",
    "id": "30-8-saga-coreografia-y-orquestacion"
  },
  {
    "kind": "paragraph",
    "text": "Una Saga coordina una secuencia de transacciones locales. Cada paso confirma su propio estado y desencadena el siguiente. Si un paso posterior falla, las acciones compensatorias intentan deshacer o neutralizar los efectos anteriores. La compensación es una operación comercial, no una reversión técnica perfecta: cancelar una reserva o emitir un reembolso deja registros auditables y puede tener sus propias reglas."
  },
  {
    "kind": "paragraph",
    "text": "En la coreografía, los servicios reaccionan a los eventos de los demás. El modelo reduce un coordinador central, pero el flujo puede resultar difícil de visualizar cuando muchos eventos forman dependencias implícitas. En la orquestación, un componente mantiene el estado del proceso y envía comandos a los participantes. Esto mejora la observabilidad y el control del flujo, pero el organizador debe permanecer centrado en la coordinación, sin absorber reglas internas de todos los dominios."
  },
  {
    "kind": "paragraph",
    "text": "Saga debe prever tiempos de espera, replay, mensajes fuera de orden, compensación que también falla e intervención manual. Es necesario persistir el estado del proceso. Un viaje financiero puede pasar al análisis o la conciliación en lugar de intentar infinitos reintentos. El diseño correcto incluye propietario operativo y procedimiento de recuperación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/es/figure-03-saga.svg",
    "alt": "Saga como secuencia de transacciones y compensaciones locales.",
    "caption": "Figura 3: Saga preserva el progreso a través de transacciones locales y compensaciones explícitas."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La elección depende de la complejidad y necesidad de control del proceso.",
    "headers": [
      "modelo",
      "ventaja",
      "Riesgo"
    ],
    "rows": [
      [
        "Coreografía",
        "Bajo acoplamiento a un coordinador y reacción natural ante los hechos.",
        "Flujo emergente, difícil de rastrear y controlar."
      ],
      [
        "Orquestación",
        "Estado y secuencia explícitos; mejor visibilidad operativa.",
        "El coordinador puede concentrar una lógica indebida."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "La escritura dual ocurre cuando un servicio necesita actualizar su base de datos y publicar un mensaje. Si escribe primero y falla antes de publicar, el estado cambia sin ningún evento. Si publicas primero y fallas antes de grabar, los consumidores observan un hecho que no existe. Una transacción distribuida entre el banco y el corredor podría funcionar, pero a menudo no es deseable ni respaldada."
  },
  {
    "kind": "paragraph",
    "text": "El patrón Bandeja de salida transaccional escribe el cambio comercial y un registro de evento en la misma transacción local. Un relé publica registros pendientes para el corredor. Este relé puede sondear o utilizar la captura de datos modificados para observar el registro bancario. Después de publicar, marque o elimine la entrada. Dado que los errores entre la publicación y el etiquetado pueden generar duplicados, los consumidores deben ser idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "Los registros estándar de la Bandeja de entrada recibieron los mensajes y su estado de procesamiento. Ayuda a deduplicar y proporciona un seguimiento operativo. La Bandeja de salida y la Bandeja de entrada no crean una entrega exactamente una vez en el sentido absoluto; Proporcionan un medio para lograr efectos equivalentes una vez cuando se combinan con idempotencia, claves estables y transacciones locales."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/es/figure-04-transactional-outbox.svg",
    "alt": "Servicio de conexión Transactional Outbox, banco local y corredor",
    "caption": "Figura 4: La bandeja de salida cierra la brecha entre la confirmación local y la publicación, pero no elimina los duplicados."
  },
  {
    "kind": "paragraph",
    "text": "Una operación idempotente se puede repetir sin producir efectos adicionales más allá del primer resultado válido. En las API, una clave de idempotencia permite que los reintentos de creación devuelvan el resultado de la operación original. En la mensajería, el consumidor almacena el eventId procesado o la clave comercial y evita efectos repetidos."
  },
  {
    "kind": "paragraph",
    "text": "At-most-one puede perder mensajes, pero evita la replay. Al menos una vez favorece la entrega, aceptando duplicados. Exactamente una vez suele ser una garantía limitada a corredores específicos o límites de procesamiento transaccional; no significa que un efecto externo, como la facturación o el correo electrónico, no se vaya a repetir nunca. La arquitectura debe explicar claramente los límites de la garantía."
  },
  {
    "kind": "paragraph",
    "text": "El pedido también es contextual. Los corredores normalmente conservan el orden sólo dentro de una partición o clave. Para un agregado, utilice una clave, un número de versión y una validación de cadena consistentes. Cuando los eventos llegan desordenados, el consumidor puede esperar, rechazar, reprocesar o reconstruir la proyección. La estrategia debe definirse, no improvisarse durante un incidente."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: La entrega confiable combina protocolo, persistencia y semántica comercial.",
    "headers": [
      "problema",
      "controlar",
      "Nota"
    ],
    "rows": [
      [
        "Reintento POST",
        "Idempotencia-Clave + resultado persistente.",
        "La clave debe tener un scope, validez y carga útil asociados."
      ],
      [
        "Evento duplicado",
        "Bandeja de entrada o tabla de deduplicación.",
        "La escritura debe ocurrir en la misma transacción que el efecto local."
      ],
      [
        "fuera de servicio",
        "ID agregado + versión.",
        "El orden global suele ser costoso e innecesario."
      ],
      [
        "mensaje venenoso",
        "Intentos limitados + DLQ.",
        "DLQ requiere propiedad, alertas y reprocesamiento controlado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.11 Composición y agregación de API",
    "id": "30-11-composicion-y-agregacion-de-api"
  },
  {
    "kind": "paragraph",
    "text": "Cuando los datos pertenecen a diferentes servicios, una pantalla o informe no puede realizar uniones directas a sus bases de datos. El patrón de composición API consulta múltiples servicios y combina las respuestas. Un BFF, una API Gateway especializada o un servicio de composición pueden asumir esta función. GraphQL también puede servir como capa de composición cuando se gobiernan el esquema y los solucionadores."
  },
  {
    "kind": "paragraph",
    "text": "La composición síncrona hereda la disponibilidad y latencia de todas las dependencias. Es necesario definir plazos, respuestas parciales, caché, respaldo y número máximo de fan-outs. Una página que consulta diez servicios secuencialmente tiende a ser lenta y frágil. El paralelismo ayuda con la latencia, pero aumenta la concurrencia y puede ejercer presión sobre los backends."
  },
  {
    "kind": "paragraph",
    "text": "Cuando la consulta es frecuente y no requiere datos estrictamente actuales, una vista materializada asíncrona puede ser mejor. Los eventos actualizan un modelo de lectura preparado para el viaje. La elección entre capitalización en tiempo real y proyección futura depende de la actualidad, el costo de actualización, el volumen y la tolerancia a la inconsistencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.12 CQRS y vistas materializadas",
    "id": "30-12-cqrs-y-vistas-materializadas"
  },
  {
    "kind": "paragraph",
    "text": "La segregación de responsabilidad de consulta de comandos separa los modelos de escritura y lectura. El lado del comando protege las invariantes y procesa las intenciones. El lado de consulta ofrece plantillas optimizadas para las necesidades de los consumidores. La separación puede existir sólo en el código o involucrar diferentes bancos, esquemas y servicios."
  },
  {
    "kind": "paragraph",
    "text": "CQRS es útil cuando la escritura y la lectura tienen modelos muy diferentes, una gran asimetría de carga o necesidades de consulta específicas. No es un requisito para los microservicios. En sistemas simples, separar todo aumenta el código, la sincronización y la operación sin un beneficio proporcional."
  },
  {
    "kind": "paragraph",
    "text": "Las vistas materializadas son proyecciones actualizadas por eventos. Aceptan algún retraso y necesitan una estrategia de reconstrucción, control de versiones del proyector, manejo de eventos antiguos y verificación de divergencias. El origen autoritativo permanece en el servicio encargado de la redacción; la proyección es un modelo derivado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.13 Fuente de eventos",
    "id": "30-13-fuente-de-eventos"
  },
  {
    "kind": "paragraph",
    "text": "Event Sourcing persiste la secuencia de eventos que representan cambios de estado, en lugar de registrar solo el estado actual. El estado de un agregado se reconstruye aplicando estos eventos. El modelo ofrece una historia completa y permite nuevas proyecciones, pero requiere una rigurosa disciplina de esquemas, invariantes y evolución."
  },
  {
    "kind": "paragraph",
    "text": "Los eventos almacenados son hechos inmutables. Corregir un error normalmente significa agregar un nuevo evento, no editar el pasado. Las instantáneas pueden reducir el costo de reconstrucción. Las proyecciones se derivan y se pueden rehacer. La lógica que interpreta eventos antiguos debe seguir siendo compatible o utilizar upcasters y migraciones controladas."
  },
  {
    "kind": "paragraph",
    "text": "El abastecimiento de eventos a menudo se confunde con la publicación de eventos de integración. Un sistema puede utilizar la bandeja de salida y los eventos sin tener un origen de eventos. Adoptar Event Sourcing sólo para ser auditado puede ser excesivo. Tiene más sentido cuando la secuencia de decisiones es una parte central del dominio y la reconstructibilidad justifica la complejidad."
  },
  {
    "kind": "subhead",
    "text": "Cuidado arquitectónico"
  },
  {
    "kind": "paragraph",
    "text": "CQRS, Event Sourcing y microservicios son estándares independientes. Se pueden combinar, pero ninguno requiere automáticamente de los demás. La adopción conjunta innecesaria crea una plataforma difícil de desarrollar, probar y operar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.14 Resiliencia y prevención de fallas en cascada",
    "id": "30-14-resiliencia-y-prevencion-de-fallas-en-cascada"
  },
  {
    "kind": "paragraph",
    "text": "Los tiempos de espera limitan cuánto puede consumir una dependencia del presupuesto de solicitud. Los plazos deben propagarse para que los servicios posteriores no continúen funcionando después de que el cliente ya se haya dado por vencido. Los reintentos sólo son seguros para operaciones idempotentes o protegidas por clave. Necesitan retroceso, fluctuación, límite de reintentos y presupuesto global."
  },
  {
    "kind": "paragraph",
    "text": "Los disyuntores interrumpen temporalmente las llamadas a una dependencia con una alta tasa de fallas. Los mamparos aíslan grupos, colas o recursos para evitar que un componente consuma toda la capacidad. El deslastre de carga rechaza el trabajo cuando el sistema no puede procesarlo dentro del SLO. Estos controles reducen las cascadas, pero una configuración agresiva puede provocar un rechazo innecesario."
  },
  {
    "kind": "paragraph",
    "text": "Los reintentos multicapa pueden multiplicar las llamadas. Si el cliente, la API Gateway, la malla y el SDK lo intentan tres veces, una sola operación puede producir docenas de intentos. La póliza debe ser propia, considerar la idempotencia y utilizar la telemetría. La resiliencia no consiste en ocultar los fracasos indefinidamente; es preservar la capacidad y producir un comportamiento predecible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.15 Descubrimiento de servicios, API Gateway y malla de servicios",
    "id": "30-15-descubrimiento-de-servicios-api-gateway-y-malla-de-servicios"
  },
  {
    "kind": "paragraph",
    "text": "El descubrimiento de servicios resuelve nombres lógicos para las instancias disponibles. En Kubernetes, los Servicios y DNS proporcionan esta abstracción. En otros entornos, los registros o balanceadores cumplen un papel similar. El cliente no debe depender de IP efímeras. La salud, la preparación y el drenaje deben ser coherentes para evitar el envío a instancias que no pueden atender."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways protegen y gobiernan el tráfico norte-sur, ofreciendo exposición, autenticación, cuotas y mediación. Las mallas de servicios aplican identidad, mTLS, enrutamiento y observabilidad al tráfico de este a oeste. Los límites no son absolutos, pero se deben evitar la duplicación de reintentos, los límites de velocidad y la transformación entre capas."
  },
  {
    "kind": "paragraph",
    "text": "La integración debe preservar el contexto: ID de correlación, contexto de seguimiento, identidad del usuario cuando sea necesario, identidad de la carga de trabajo y fecha límite. Propagar todos los headers sin una lista blanca también es peligroso. Cada salto debe definir qué atributos son confiables y cuáles deben eliminarse o reconstruirse."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.16 Observabilidad y correlación distribuida",
    "id": "30-16-observabilidad-y-correlacion-distribuida"
  },
  {
    "kind": "paragraph",
    "text": "En un viaje distribuido, un error empresarial puede afectar a las API, las colas, los consumidores y las compensaciones. Los registros aislados por servicio no son suficientes. Los ID de seguimiento, los ID de correlación, los ID de causa, los ID de eventos y los ID agregados deben usarse de manera consistente para reconstruir el historial."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas deben combinar señales técnicas y comerciales: latencia, error, saturación, trabajo pendiente, antigüedad de los mensajes, tasa de reintentos, DLQ, sagas pendientes, compensaciones, divergencia de proyección y tiempo para completar el viaje. Una cola vacía no prueba que el proceso esté en buen estado si los mensajes fueron descartados o redirigidos incorrectamente."
  },
  {
    "kind": "paragraph",
    "text": "El rastreo sincrónico sigue el contexto entre llamadas. En modo asíncrono, el productor inyecta contexto en el mensaje y el consumidor crea un nuevo intervalo relacionado. Es necesario controlar la retención y la cardinalidad. Las cargas útiles y los datos personales no se deben copiar en su totalidad en los registros."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.17 Seguridad entre servicios",
    "id": "30-17-seguridad-entre-servicios"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad debe distinguir la identidad del usuario, la aplicación cliente y la carga de trabajo que ejecuta la llamada. mTLS autentica a los pares de transporte, pero no reemplaza la autorización comercial. Los tokens pueden llevar delegación, mientras que las identidades de las cargas de trabajo protegen la comunicación interna. El servicio necesita validar audience, issuer, scopes y contexto esperado."
  },
  {
    "kind": "paragraph",
    "text": "Los acontecimientos también requieren control. Los temas, colas y esquemas tienen políticas de producción y consumo. Un consumidor comprometido no debería leer todos los dominios. Los datos confidenciales necesitan minimización, cifrado y retención adecuada. Las claves y los secretos no deben circular en cargas útiles ni en headers de correlación."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust aplicado a los microservicios implica autenticar cada relación, autorizar por privilegio mínimo y observar el comportamiento. Depender de todo lo que hay en la red interna perpetúa el movimiento lateral. Al mismo tiempo, las políticas excesivamente centralizadas pueden bloquear la autonomía; la plataforma debe ofrecer estándares seguros y automatización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.18 Migración de monolitos e higo estrangulador",
    "id": "30-18-migracion-de-monolitos-e-higo-estrangulador"
  },
  {
    "kind": "paragraph",
    "text": "La migración de un monolito mediante una reescritura completa concentra el riesgo y difiere el valor. El patrón Strangler Fig introduce una capa de enrutamiento y reemplaza gradualmente las capacidades. Pueden nacer nuevas funcionalidades fuera del monolito, mientras que las funcionalidades existentes se extraen mediante sectores comerciales verticales."
  },
  {
    "kind": "paragraph",
    "text": "Antes de extraer, es útil modularizar internamente, mapear dependencias y establecer pruebas. La extracción debe incluir datos, operación y propiedad, no solo endpoints. La captura de datos modificados, las capas anticorrupción y la sincronización temporal pueden respaldar la transición, pero necesitan tiempo para eliminarse."
  },
  {
    "kind": "paragraph",
    "text": "Un paso de migración exitoso reduce el acoplamiento neto. Si el nuevo servicio continúa leyendo y escribiendo tablas desde el monolito, depende de la misma versión y no tiene observabilidad propia, solo había distribución física. Los criterios de salida deben incluir dominio, datos, implementación, operación y contratos independientes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.19 Pruebas, gobernanza y plataforma interna",
    "id": "30-19-pruebas-gobernanza-y-plataforma-interna"
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas unitarias siguen siendo importantes, pero no cubren los contratos distribuidos. Las pruebas de contratos impulsadas por el consumidor verifican las expectativas del consumidor sin exigir todo el entorno. Las pruebas de integración validan corredores, bancos y adaptadores. Las pruebas de un extremo a otro deben cubrir pocos recorridos críticos porque son costosas y frágiles."
  },
  {
    "kind": "paragraph",
    "text": "En eventos, las pruebas de esquema y compatibilidad deben observar la dirección de los datos. Un campo agregado puede romper con los consumidores estrictos. Las pruebas de reproducción verifican que los nuevos proyectores procesen eventos históricos. Las pruebas de fallas y ingeniería del caos evalúan el tiempo de espera, el reintento, la indisponibilidad parcial y la recuperación."
  },
  {
    "kind": "paragraph",
    "text": "Una plataforma de desarrollo interna puede ofrecer plantillas, canalizaciones, observabilidad, identidad, secretos, políticas y catálogos. El objetivo es reducir el trabajo indiferenciado, no imponer un marco rígido. Las rutas doradas deben ser fáciles de usar y permitir excepciones gobernadas cuando el dominio lo requiera."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.20 Antipatrones comunes",
    "id": "30-20-antipatrones-comunes"
  },
  {
    "kind": "paragraph",
    "text": "El monolito distribuido ocurre cuando los servicios deben implementarse juntos, compartir bases de datos y llamarse entre sí en secuencia para cualquier operación. La complejidad de la red se agrega sin autonomía. Otro antipatrón es el nanoservicio, demasiado pequeño para justificar su propio contrato, implementación y operación."
  },
  {
    "kind": "paragraph",
    "text": "Los servicios Chatty intercambian muchos mensajes pequeños para configurar una operación. Las bibliotecas de dominios compartidos difunden reglas y crean actualizaciones coordinadas. Los eventos genéricos con enormes cargas útiles hacen que todos los consumidores dependan del modelo interno. Una cola utilizada como banco permanente sin una estrategia de replay y retención también genera riesgo."
  },
  {
    "kind": "paragraph",
    "text": "Centralizar toda la lógica en una API Gateway, ESB u orquestador recrea un monolito de integración. La plataforma debe aplicar preocupaciones transversales, mientras que las reglas comerciales se mantienen en todos los dominios. Arreglar un antipatrón comienza con medir las dependencias y la frecuencia de los cambios, no solo volver a dibujar diagramas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.21 Troubleshooting orientada al viaje",
    "id": "30-21-troubleshooting-orientada-al-viaje"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico comienza con el viaje y su identificador. Determine qué comando inició el proceso, qué servicios participaron, qué eventos se publicaron, qué estados locales se comprometieron y qué paso está pendiente de completarse. La ausencia de una respuesta HTTP no significa que no se haya realizado el trabajo; Es posible que se haya producido un tiempo de espera después de la confirmación."
  },
  {
    "kind": "paragraph",
    "text": "En flujos sincrónicos, compare plazos, reintentos, estados y seguimientos por salto. En flujos asincrónicos, verifique la compensación, el trabajo pendiente, el grupo de consumidores, los reintentos, DLQ, la deduplicación y el orden por clave. En sagas, examine el estado del orquestador, las compensaciones pendientes y las transacciones locales. El diagnóstico debe separar las fallas transitorias, los errores de contrato y las violaciones de las reglas comerciales."
  },
  {
    "kind": "paragraph",
    "text": "Se debe controlar el reprocesamiento. Reenviar un mensaje sin comprender la idempotencia puede resultar en una doble facturación o notificación. Las herramientas operativas deben registrar quién reprocesó, cuándo, qué versión para el consumidor se utilizó y qué resultado se produjo. La reconciliación es parte del producto entregado, no una actividad improvisada."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La troubleshooting debe reconstruir estados y mensajes, no solo respuestas HTTP.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Orden pendiente",
        "Evento no publicado, consumidor detenido o compensación en espera.",
        "Bandeja de salida, corredor, retraso del consumidor y estado de la saga."
      ],
      [
        "Doble facturación",
        "El reintento sin idempotencia o deduplicación falla.",
        "Clave de idempotencia, eventId e historial transaccional."
      ],
      [
        "Proyección divergente",
        "Evento perdido, fuera de servicio o proyector incompatible.",
        "Versiones, compensaciones, replay y versión agregada."
      ],
      [
        "Latencia en cascada",
        "Distribución en abanico, reintentos múltiples o tiempo de espera de dependencia.",
        "Seguimiento, presupuestos, intentos y saturación."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: una plataforma de comercio crea un pedido, reserva stock y autoriza el pago. El flujo inicial utiliza tres llamadas sincrónicas encadenadas y falla en los picos. La evolución adopta una Saga orquestada, estados persistentes, bandeja de salida y compensaciones. La API devuelve 202 con un identificador de proceso y ofrece una consulta de estado."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: un servicio publica PaymentConfirmed después de actualizar el banco. Los fallos intermitentes entre la confirmación y la publicación provocan solicitudes bloqueadas. La implementación de Transactional Outbox y CDC cierra la brecha. El consumidor agrega una bandeja de entrada y una clave idempotente para tolerar duplicados."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: un panel consulta seis servicios y presenta una alta latencia. El análisis muestra distribución secuencial y datos con una tolerancia de unos pocos segundos. El equipo crea una vista materializada actualizada por eventos, lo que reduce las dependencias de la ruta crítica y mantiene el proceso de reproducción para la reconstrucción."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Modelar una saga de pedidos e identificar compensaciones. 2) Implementar una bandeja de salida en una base de datos relacional y simular una falla después de la confirmación. 3) Crear consumidor idempotente con eventId. 4) Compare la composición de API con una vista materializada. 5) Simule mensajes desordenados utilizando la versión agregada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Los microservicios organizan la autonomía en torno a las capacidades, los datos y la propiedad del negocio. El número de servicios no define la madurez. Los límites coherentes, el despliegue independiente y la responsabilidad operativa son indicadores más importantes que el tamaño físico."
  },
  {
    "kind": "paragraph",
    "text": "La integración hace explícitos los costos de distribución. La comunicación sincrónica crea un acoplamiento temporal; La comunicación asincrónica introduce estados, duplicados y la necesidad de reconciliación. Los comandos, consultas y eventos tienen semánticas diferentes y deben definirse claramente."
  },
  {
    "kind": "paragraph",
    "text": "Saga coordina transacciones y compensaciones locales. La Bandeja de salida transaccional resuelve la escritura dual dentro de los límites del servicio, mientras que la Bandeja de entrada y la idempotencia reducen los efectos duplicados. CQRS, vistas materializadas y Event Sourcing son patrones opcionales, útiles sólo cuando sus beneficios justifican la complejidad."
  },
  {
    "kind": "paragraph",
    "text": "La resiliencia, la seguridad y la observabilidad deben diseñarse desde el principio. Tiempos de espera, reintentos, DLQ, rastreo, correlación y herramientas de reprocesamiento son parte del producto. La migración gradual del legado debería reducir el acoplamiento real y evitar simplemente convertir un monolito en varios procesos dependientes."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en la mensajería con Kafka, RabbitMQ, AMQP y JMS, detallando corredores, colas, temas, particiones, reconocimientos, grupos de consumidores, retención y operación de plataformas asincrónicas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de arquitectura e integración",
    "id": "lista-de-verificacion-de-arquitectura-e-integracion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La descomposición sigue capacidades comerciales y contextos acotados, no solo tablas o capas técnicas.",
      "Cada servicio tiene una propiedad clara de los datos, el contrato, la implementación y la operación.",
      "La elección de síncrono o asíncrono está alineada con la experiencia y garantías del negocio.",
      "Se distinguen semánticamente comandos, consultas y eventos.",
      "Las invariantes inmediatas permanecen dentro de las transacciones locales.",
      "Los procesos distribuidos modelan estados intermedios y reconciliación.",
      "Las sagas tienen compensación, tiempo de espera, persistencia y propietario operativo.",
      "Las escrituras duales utilizan bandeja de salida, CDC o mecanismo equivalente.",
      "Los consumidores son idempotentes y toleran duplicados y reprocesamiento.",
      "El orden se define por agregado o clave cuando sea necesario.",
      "Los reintentos tienen retroceso, jitter, presupuesto y protección contra la multiplicación entre capas.",
      "Los contratos cuentan con pruebas de esquema, versión y compatibilidad.",
      "Los registros, métricas y seguimientos le permiten reconstruir el recorrido de un extremo a otro.",
      "Las migraciones reducen las dependencias y tienen criterios de salida claros."
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
      "Explique por qué los microservicios son una decisión sociotécnica.",
      "Diferenciar subdominio, contexto acotado, servicio y componente.",
      "Identificar signos de un monolito distribuido.",
      "Compare la comunicación sincrónica y asincrónica sobre disponibilidad y experiencia del usuario.",
      "Diferenciar comando, consulta, evento de dominio y evento de integración.",
      "Modelar una Saga por coreografía y otra por orquestación para el mismo proceso.",
      "Explique el problema de la escritura dual y cómo lo mitiga la bandeja de salida.",
      "Describir la idempotencia en una API de creación y un consumidor de eventos.",
      "Compare la composición de API y la vista materializada.",
      "Explique cuándo no se deben utilizar CQRS y Event Sourcing.",
      "Proponer una estrategia de migración de Strangler para un módulo heredado.",
      "Cree un script de troubleshooting para una saga atascada después del pago."
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
    "caption": "Tabla 6 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "agregado",
        "Conjunto de objetos protegidos por un límite de consistencia."
      ],
      [
        "API Composition",
        "Consulta de múltiples servicios con agregación de respuestas."
      ],
      [
        "Contexto acotado",
        "Límite en el que un modelo y su lenguaje tienen un significado consistente."
      ],
      [
        "CDC",
        "Cambiar captura de datos; captura cambios del registro o motor de la base de datos."
      ],
      [
        "Choreography",
        "Coordinación distribuida por reacción a los acontecimientos."
      ],
      [
        "CQRS",
        "Separación entre modelos de comando y consulta."
      ],
      [
        "Event Sourcing",
        "La persistencia del estado como una secuencia de eventos inmutables."
      ],
      [
        "Idempotencia",
        "Propiedad de repetir una operación sin efectos adicionales."
      ],
      [
        "Inbox",
        "Registro local de mensajes recibidos y procesados."
      ],
      [
        "Materialized View",
        "Proyección precalculada para una lectura eficiente."
      ],
      [
        "Monolito distribuido",
        "Servicios físicamente separados pero estrechamente acoplados."
      ],
      [
        "Orchestration",
        "Coordinación por componente que mantiene el estado y la secuencia del proceso."
      ],
      [
        "Bandeja de salida",
        "Tabla o registro local utilizado para publicar eventos después de confirmaciones comerciales."
      ],
      [
        "Saga",
        "Secuencia de transacciones locales con acciones compensatorias."
      ],
      [
        "Strangler Fig",
        "Migración gradual que reemplaza partes de un sistema heredado."
      ],
      [
        "Límite transaccional",
        "Umbral en el que una transacción local protege a las invariantes."
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
      "Evans, Eric. Diseño basado en dominios: abordar la complejidad en el corazón del software.",
      "Fowler, Martín. Patrones de arquitectura de aplicaciones empresariales y artículos sobre microservicios, CQRS y Strangler Fig.",
      "Newman, Sam. Creación de microservicios.",
      "Richardson, Chris. Patrones de microservicios.",
      "Hohpe, Gregor; Woolf, Bobby. Patrones de integración empresarial.",
      "Kleppmann, Martín. Diseño de aplicaciones con uso intensivo de datos.",
      "Microsoft. Patrones de diseño de la nube: Saga, CQRS, reintento, disyuntor, consumidores competitivos y vista materializada.",
      "Guía prescriptiva de AWS. Bandeja de salida transaccional, Saga y patrones de descomposición.",
      "Especificación de CloudEvents y especificación de AsyncAPI.",
      "Documentación de OpenTelemetry. Propagación de contexto y rastreo distribuido."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de aplicación"
  },
  {
    "kind": "paragraph",
    "text": "Los estándares de integración son herramientas de decisión, no requisitos universales. Antes de adoptar Saga, CQRS, Event Sourcing, Outbox o una plataforma de mensajería, valide el problema real, la capacidad operativa y la ruta de recuperación en un entorno autorizado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de selección de patrones",
    "id": "anexo-a-matriz-de-seleccion-de-patrones"
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El estándar se elige en función de la necesidad y el costo operativo aceptable.",
    "headers": [
      "necesidad",
      "Patrón candidato",
      "Pregunta de validación"
    ],
    "rows": [
      [
        "Coordinar el proceso entre servicios.",
        "Saga",
        "¿Se modelan compensaciones y estados intermedios?"
      ],
      [
        "Actualizar base de datos y publicar evento",
        "Transactional Outbox",
        "¿El consumidor tolera duplicados y la retransmisión es observable?"
      ],
      [
        "Consultar datos de múltiples dominios",
        "API Composition",
        "¿Son aceptables la latencia y la disponibilidad de distribución?"
      ],
      [
        "Leer con un modelo muy diferente",
        "CQRS/Vista materializada",
        "¿Es soportable el retraso en la proyección y la reconstrucción?"
      ],
      [
        "Preservar la secuencia completa de decisiones.",
        "Event Sourcing",
        "¿El dominio realmente necesita replay y un historial inmutable?"
      ],
      [
        "Migrar la funcionalidad heredada gradualmente",
        "Strangler Fig",
        "¿La nueva frontera elimina las dependencias de implementación y datos antiguos?"
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿Qué capacidad empresarial posee la decisión y los datos?",
      "¿Qué invariantes deben ser inmediatas y cuáles pueden converger?",
      "¿El consumidor necesita una respuesta inmediata o puede seguir un proceso?",
      "¿Cómo se manejarán los duplicados, los mensajes desordenados y los reintentos?",
      "¿Cuál es el estado observable del viaje durante fallas parciales?",
      "¿Quién reprocesa, concilia y autoriza las intervenciones manuales?",
      "¿Cómo evolucionan los contratos y los esquemas sin coordinar a todos los consumidores?",
      "¿Qué registros, métricas y seguimientos prueban que el proceso finalizó correctamente?",
      "¿Cómo se puede simplificar o revertir el diseño si el costo supera el beneficio?"
    ]
  }
];
