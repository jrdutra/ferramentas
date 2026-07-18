import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const GRAPHQL_GRPC_WEBSOCKET_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Tres modelos, tres semánticas: consulta, RPC y canal persistente"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/es/overview.svg",
    "alt": "GraphQL, gRPC y WebSocket combinados en una arquitectura API moderna",
    "caption": "Figura inicial: el capítulo compara tres estilos que a menudo se combinan en arquitecturas API y de integración."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Elegir la interfaz adecuada requiere alinear el modelo de datos, el acoplamiento, la latencia, el streaming y la gobernanza."
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
    "text": "Hasta ahora, el curso ha cubierto la comunicación HTTP clásica, el modelado REST y la descripción formal de contratos utilizando OpenAPI. Estos elementos siguen siendo fundamentales para las plataformas corporativas, pero no cubren todas las cuestiones de integración. Los sistemas distribuidos a menudo necesitan resolver consultas flexibles de gráficos de datos, comunicación eficiente entre servicios y entrega de eventos en tiempo real. Es en este espacio donde GraphQL, gRPC y WebSocket cobran relevancia."
  },
  {
    "kind": "paragraph",
    "text": "Aunque los tres nombres aparecen con frecuencia en las discusiones modernas, no son alternativas directas entre sí. GraphQL es un modelo de ejecución y lenguaje de consulta basado en esquemas. gRPC es un marco de llamada a procedimientos remotos fuertemente tipado, generalmente compatible con Protocol Buffers y HTTP/2. WebSocket es un protocolo para mantener un canal bidireccional persistente, dejando la semántica de la aplicación a una capa superior. Compararlos sólo por desempeño o popularidad lleva a decisiones superficiales."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas maduras analizan qué problema debe resolverse: consulta agregada para el front-end, comunicación interna de baja latencia, streaming unidireccional o bidireccional, push a interfaces enriquecidas o mediación a través de puertas de enlace. También analizan la gobernanza, la seguridad, la observabilidad, el cache, la curva de adopción, las herramientas y la compatibilidad heredada. En muchos escenarios, la mejor solución no es elegir un único modelo, sino combinar más de uno con roles bien definidos."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta los fundamentos, la semántica, los patrones operativos, los obstáculos y los criterios de selección. El objetivo es permitir al lector comprender cómo funciona cada tecnología, reconocer cuándo encaja bien e identificar riesgos operativos en gateways, mallas de servicios y plataformas corporativas."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Al leer cada tecnología, responde cuatro preguntas: cuál es el contrato expuesto, quién controla la evolución del esquema o interfaz, cómo se realiza la observabilidad y qué intermediarios pueden participar correctamente en el flujo. Esta disciplina evita tratar soluciones de diferente naturaleza como si fueran sólo formatos de carga útil alternativos."
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
      "Distinga las responsabilidades de GraphQL, gRPC y WebSocket y evite comparaciones simplistas.",
      "Explique el modelo, la ejecución y la resolución del esquema GraphQL.",
      "Comprender consultas, mutaciones, suscripciones, tipos, fragmentos e introspección.",
      "Reconozca problemas como la recuperación excesiva, la recuperación insuficiente, N+1, la profundidad excesiva y la complejidad de las consultas.",
      "Explique el modelo de servicio gRPC, la función de Protocol Buffers y los cuatro patrones de llamada.",
      "Relacione gRPC con HTTP/2, multiplexación, deadlines, metadatos, códigos de estado y streaming.",
      "Describa el handshake de upgrade de WebSocket, los frames, ping/pong y el cierre.",
      "Analice la escala, la afinidad, la autenticación y la observabilidad en conexiones persistentes.",
      "Compare las implicaciones del cache, el control de versiones, las puertas de enlace, los cortafuegos y los equilibradores.",
      "Aplicar criterios prácticos para elegir y combinar estas tecnologías en arquitecturas empresariales."
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
      "13.1 ¿Por qué existe este capítulo después de OpenAPI?",
      "13.2 GraphQL: descripción general y motivación",
      "13.3 Esquema, tipos, consultas, mutaciones y suscripciones",
      "13.4 Resolvedores, batching, N+1 y federación",
      "13.5 Seguridad, gobernanza y observabilidad en GraphQL",
      "13.6 gRPC: descripción general y buffers de protocolo",
      "13.7 Patrones de llamadas, deadlines y streaming",
      "13.8 Seguridad, malla y gobernanza en gRPC",
      "13.9 WebSocket: handshake, frames y ciclo de vida",
      "13.10 Funcionamiento, escalabilidad y seguridad en WebSocket",
      "13.11 Comparación práctica entre GraphQL, gRPC y WebSocket",
      "13.12 Uso en API Gateways, estudios de casos, resumen, ejercicios y referencias"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.1 Por qué este capítulo viene después de OpenAPI",
    "id": "13-1-por-que-este-capitulo-viene-despues-de-openapi"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describe muy bien las API HTTP orientadas a recursos u operaciones. Sin embargo, no representa un gráfico consultable con tanta naturalidad como GraphQL, llamadas RPC binarias y streaming bidireccional como en gRPC, ni un canal persistente orientado a mensajes como WebSocket. El lector que domina OpenAPI ya tiene una base excelente para los contratos, la semántica HTTP y la gobernanza; ahora es necesario comprender dónde estos fundamentos siguen siendo válidos y dónde los nuevos modelos requieren otra forma de pensar."
  },
  {
    "kind": "paragraph",
    "text": "En términos de arquitectura, este capítulo es una ampliación del repertorio y no una negación de lo que se ha estudiado antes. REST sigue siendo muy fuerte para la exposición pública y la integración entre organizaciones. Lo que cambia es que ciertas necesidades prácticas -como pantallas que requieren agregaciones muy variadas, microservicios internos con alta cadencia y aplicaciones que dependen de la push en tiempo real-pueden satisfacerse mejor mediante diferentes modelos."
  },
  {
    "kind": "paragraph",
    "text": "También es importante comprender la diferencia entre tecnología de interfaz y tecnología de transporte. GraphQL normalmente usa HTTP, pero su semántica de contrato no es la misma que REST. gRPC utiliza HTTP/2 como base, pero presenta al desarrollador la abstracción de métodos y mensajes. WebSocket nace de un handshake HTTP, pero luego abandona la lógica de solicitud/respuesta para operar con frames full-duplex. Esta distinción evita conclusiones incorrectas sobre el cache, la seguridad y la troubleshooting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.2 GraphQL: descripción general y motivación",
    "id": "13-2-graphql-descripcion-general-y-motivacion"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL surgió para ofrecer a los consumidores un mayor control sobre la forma de los datos devueltos. En lugar de que la API exponga una gran colección de endpoints con respuestas preformateadas, publica un schema tipado y permite al cliente declarar, en una consulta, exactamente qué campos desea obtener. Esto reduce la recuperación insuficiente, cuando el cliente necesita llamar a varios endpoints para ensamblar una pantalla, y puede reducir la recuperación excesiva, cuando la respuesta contiene una gran cantidad de datos que son irrelevantes para ese caso específico."
  },
  {
    "kind": "paragraph",
    "text": "El modelo es particularmente atractivo en experiencias front-end con múltiples variaciones de composición: web, móvil, socios, paneles analíticos y diferentes recorridos en el mismo dominio. Una puerta de enlace basada en GraphQL o BFF puede recopilar datos de múltiples API y bases de datos, dejando la tarea de componer el resultado a la capa de resolución. Sin embargo, esta flexibilidad traslada la complejidad al servidor, que necesita validar, ejecutar, limitar costos y observar el comportamiento de las consultas entrantes."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL no es un lenguaje de acceso a bases de datos arbitrario. El contrato sigue siendo definido por el proveedor, a través de un esquema, y ​​la ejecución está controlada por los resolvers. Esto significa que el hecho de que el cliente elija campos no elimina la necesidad de gobernanza. Al contrario: la autenticación, la autorización por campo, los límites de profundidad, la desactivación de la introspección en algunos escenarios, las persisted queries y las protecciones contra el abuso se vuelven esenciales en los entornos corporativos."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: El principal cambio en GraphQL es el modelo de contrato, no solo la sintaxis.",
    "headers": [
      "Aspecto",
      "REST tradicional",
      "GraphQL"
    ],
    "rows": [
      [
        "Unidad principal",
        "Recursos y endpoints.",
        "Schema tipado y operaciones en un punto final lógico."
      ],
      [
        "Forma de la respuesta",
        "Predominantemente definido por el servidor.",
        "Seleccionado por el cliente dentro del esquema."
      ],
      [
        "Evolución",
        "Nueva representación, nuevos campos o nuevos endpoints.",
        "Evolución del esquema con deprecación de campos y tipos."
      ],
      [
        "Riesgo característico",
        "Endpoints insuficientes o explosivos.",
        "Consultas caras, N+1 y control de complejidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.3 Esquema, tipos, consultas, mutaciones y suscripciones",
    "id": "13-3-esquema-tipos-consultas-mutaciones-y-suscripciones"
  },
  {
    "kind": "paragraph",
    "text": "El esquema GraphQL describe tipos escalares, objetos, enumeraciones, interfaces, uniones, entradas y operaciones raíz. La operación de consulta representa lectura; La mutación representa cambios de estado; La suscripción representa la recepción asincrónica de eventos bajo una relación en curso. El esquema funciona como un contrato de datos y también como un punto de introspección para herramientas, generación de tipos y experiencia de desarrollo."
  },
  {
    "kind": "paragraph",
    "text": "Una Query se estructura como un documento declarativo en el que el consumidor especifica los campos deseados. Los fragmentos le permiten reutilizar selecciones, los alias cambian el nombre de los campos en la respuesta y las variables separan el documento de los valores dinámicos. En Mutation, el consumidor invoca un cambio de estado definido por el servidor, con tipos de entrada claros. En Subscription, el cliente se suscribe a un stream que se emitirá con el tiempo, generalmente a través de WebSocket o tecnología equivalente."
  },
  {
    "kind": "paragraph",
    "text": "A pesar de su apariencia compacta, la ejecución no es trivial. Cada campo de esquema se puede asociar con un resolver. Una operación simple, desde el punto de vista del cliente, puede hacer que el servidor active múltiples backends. Por tanto, el esquema debe diseñarse con disciplina. Los tipos muy genéricos, los campos que ocultan operaciones pesadas y la falta de límites entre dominios dificultan la operación del contrato."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/es/figure-01.svg",
    "alt": "GraphQL Runtime ejecuta un árbol de resolvers según la operación solicitada",
    "caption": "Figura 1: el runtime de GraphQL ejecuta un árbol de resolvers según la operación solicitada."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de consulta GraphQL"
  },
  {
    "kind": "code",
    "text": "query ClienteDetallado($id: ID!) {\n  cliente(id: $id) {\n    id\n    nome\n    saldoActual\n    pedidos(limit: 5) {\n      numero\n      importeTotal\n    }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.4 Resolvedores, batching, N+1 y federación",
    "id": "13-4-resolvedores-batching-n-1-y-federacion"
  },
  {
    "kind": "paragraph",
    "text": "Los resolvers son funciones responsables de producir el valor de un campo. En un objeto de cliente, por ejemplo, el campo Saldo actual puede provenir de un núcleo bancario, mientras que los pedidos pueden provenir de una API transaccional. Esta granularidad es poderosa, pero también crea el clásico problema N+1: al recuperar una lista de clientes y, para cada uno, obtener datos adicionales de otra fuente, el servidor puede desencadenar un número excesivo de llamadas."
  },
  {
    "kind": "paragraph",
    "text": "La mitigación típica implica batching y cache de corta duración dentro del alcance de la solicitud. Bibliotecas como DataLoader agrupan múltiples solicitudes lógicas en una sola búsqueda en el backend. El equipo de arquitectura también debería preguntarse si el diseño del esquema induce un acceso ineficiente. En algunos casos, el problema no se puede resolver únicamente con técnicas de ejecución; requiere revisar el modelo e introducir campos o agregados más apropiados."
  },
  {
    "kind": "paragraph",
    "text": "En organizaciones grandes, la federación GraphQL le permite componer un supergrafo a partir de subgrafos mantenidos por diferentes equipos. Este enfoque mejora la autonomía, pero introduce una gobernanza más sofisticada: propiedad de tipos y campos, composición segura, control de versiones de supergrafos, enrutamiento, observabilidad distribuida y protección contra la explosión de cardinalidad. Sin estas prácticas, la federación puede intercambiar el acoplamiento de endpoints por el acoplamiento de esquemas."
  },
  {
    "kind": "subhead",
    "text": "Punto crítico de operación"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL no elimina las llamadas entre sistemas; a menudo los esconde detrás del árbol de ejecución. En la troubleshooting, correlacione la consulta recibida con los resolvers activados, los backends consultados y el costo total de la operación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.5 Seguridad, gobernanza y observabilidad en GraphQL",
    "id": "13-5-seguridad-gobernanza-y-observabilidad-en-graphql"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad en GraphQL va más allá de controlar la autenticación de endpoints. A medida que el cliente elige la forma de la consulta, el servidor debe limitar la profundidad, la cardinalidad y el costo computacional. Las consultas recursivas, el uso abusivo de fragmentos, la introspección expuesta incorrectamente y los intentos de enumerar campos son vectores relevantes. Las persisted queries reducen el riesgo al permitir solo documentos previamente registrados e identificados mediante hash."
  },
  {
    "kind": "paragraph",
    "text": "La autorización puede ocurrir en múltiples niveles: operación, tipo, campo e incluso valor devuelto. Es común que un mismo tipo tenga campos con diferentes sensibilidades, como saldo, límite, CPF enmascarado o historial completo. La política debe ser explícita, comprobable y observable. En las puertas de enlace, una práctica útil es propagar la identidad y el contexto al servidor GraphQL, mientras que el control de campo detallado permanece en el runtime o en un PDP conectado a él."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad también cambia. En REST, la ruta del punto final ya dice mucho. En GraphQL, varias operaciones diferentes pueden viajar a través del mismo punto final. Por lo tanto, los nombres de las operaciones, el hash de persisted queries, el costo calculado, la profundidad, el tiempo de resolución y las llamadas posteriores se convierten en métricas esenciales. Registrar la consulta literal requiere cuidado con la privacidad y el volumen de registros."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: en GraphQL, la gobernanza del schema y la gobernanza de la ejecución van de la mano.",
    "headers": [
      "controlar",
      "Objetivo",
      "Ejemplo práctico"
    ],
    "rows": [
      [
        "Límite de profundidad",
        "Evite la navegación excesiva.",
        "Rechazar consultas por encima de un umbral definido."
      ],
      [
        "Cálculo de complejidad",
        "Controlar el coste estimado.",
        "Asigne pesos a campos costosos."
      ],
      [
        "persisted query",
        "Reducir la superficie de ataque y la carga útil.",
        "Solo acepte hashes previamente registrados."
      ],
      [
        "Autorización por campo",
        "Proteja los datos confidenciales.",
        "Los campos financieros requieren un alcance adicional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.6 gRPC: descripción general y buffers de protocolo",
    "id": "13-6-grpc-descripcion-general-y-buffers-de-protocolo"
  },
  {
    "kind": "paragraph",
    "text": "gRPC es un marco RPC moderno que enfatiza los contratos tipados, la generación de código y la comunicación eficiente. En lugar de modelar recursos y representaciones como en REST, el proveedor define servicios y métodos en archivos .proto. Estos archivos describen mensajes, campos y operaciones, y las herramientas generan stubs de cliente y servidor en varios idiomas."
  },
  {
    "kind": "paragraph",
    "text": "Protocol Buffers, o Protobuf, es el mecanismo de serialización más asociado con gRPC. Codifica mensajes binarios tipados compactos, con evolución basada en números de campo. Esto produce cargas útiles más pequeñas y un parsing eficiente, especialmente útil en la comunicación interna de microservicios. Sin embargo, la ganancia de rendimiento no debe idealizarse: depende del caso de uso, la red, el idioma, el tamaño de los mensajes y el costo real de la lógica de negocios."
  },
  {
    "kind": "paragraph",
    "text": "El acoplamiento al contrato es más explícito que en las integraciones puramente textuales. Esto es positivo para la seguridad y la productividad de los tipos, pero requiere disciplina en la evolución: los números de los campos no deben reutilizarse, se deben aplicar reservas cuando se elimina algo y los errores deben manejarse dentro de la semántica gRPC, que distingue el estado de transporte y el estado de la aplicación."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de definición de .proto"
  },
  {
    "kind": "code",
    "text": "syntax = \"proto3\";\nservice ClienteService {\n  rpc ObtenerCliente (ClienteRequest) returns (ClienteResponse);\n  rpc ListarEventos (EventosRequest) returns (stream EventoResponse);\n}\nmessage ClienteRequest { string id = 1; }\nmessage ClienteResponse { string id = 1; string nome = 2; }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.7 Patrones de llamadas, deadlines y streaming",
    "id": "13-7-patrones-de-llamadas-deadlines-y-streaming"
  },
  {
    "kind": "paragraph",
    "text": "gRPC ofrece cuatro patrones principales. En unary, una solicitud produce una respuesta. En el server streaming, el cliente envía una solicitud y recibe una secuencia de respuestas. En el client streaming, el cliente envía varios mensajes antes de recibir el resultado consolidado. En el streaming bidireccional, ambas partes intercambian mensajes continuamente, sin una relación uno a uno fija entre el envío y la recepción."
  },
  {
    "kind": "paragraph",
    "text": "Estos patrones operan sobre HTTP/2, aprovechando la multiplexación, los encabezados comprimidos y el streaming full-duplex por stream. Aun así, el desarrollador debe comprender conceptos específicos de gRPC, como deadlines, cancelación, metadatos y códigos de estado. El deadline es especialmente importante en producción: sin ella, las llamadas pueden permanecer pendientes más allá de lo razonable, consumiendo recursos y degradando cadenas de dependencia enteras."
  },
  {
    "kind": "paragraph",
    "text": "El manejo de errores también cambia de matices. Una respuesta gRPC exitosa en el transporte puede llevar estados de aplicación como NOT_FOUND, PERMISSION_DENIED o UNAVAILABLE. La observabilidad y los reintentos deben considerar estas diferencias. En entornos empresariales, es común traducir parcial o totalmente las llamadas de gRPC a HTTP/JSON en el borde, preservando gRPC solo entre servicios internos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/es/figure-02.svg",
    "alt": "Cuatro patrones de llamadas gRPC: unary, server streaming, client streaming y bidireccional",
    "caption": "Figura 2: El contrato gRPC admite todo, desde llamadas simples hasta streaming bidireccional completo."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: la eficiencia de gRPC depende de la disciplina operativa, no solo del uso de Protobuf.",
    "headers": [
      "Tema",
      "Mejores prácticas",
      "Riesgo si se ignora"
    ],
    "rows": [
      [
        "Deadlines",
        "Establezca deadlines por método y propague el contexto.",
        "Llamadas atrapadas y saturación en cascada."
      ],
      [
        "Versionado",
        "Evoluciona mensajes con campos opcionales y reservas.",
        "Ruptura de compatibilidad binaria."
      ],
      [
        "Códigos de estado",
        "Mapee cuidadosamente el status de aplicación.",
        "Reintentos incorrectos o diagnósticos confusos."
      ],
      [
        "Streaming",
        "Controlar la backpressure y la cancelación.",
        "Consumo excesivo de memoria y cola."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.8 Seguridad, malla y gobernanza en gRPC",
    "id": "13-8-seguridad-malla-y-gobernanza-en-grpc"
  },
  {
    "kind": "paragraph",
    "text": "Como gRPC se adopta a menudo en la comunicación este-oeste, suele aparecer junto a las mallas de servicios. En este contexto, la malla o el sidecar pueden aplicar mTLS, identidad de carga de trabajo, reintentos, interrupción de circuitos y telemetría, mientras que el servicio mantiene la semántica del método. Esto simplifica ciertos controles, pero también introduce capas adicionales en el diagnóstico."
  },
  {
    "kind": "paragraph",
    "text": "En seguridad, el contrato .proto debe tratarse como un artefacto gobernado. Los métodos administrativos, operaciones peligrosas y mensajes con datos confidenciales necesitan un control de autorización explícito. La presencia de conexión interna no implica confianza automática. Además, algunos servidores proxy y puertas de enlace tienen soporte limitado para funciones gRPC más avanzadas, especialmente cuando se trata de streams o trailers."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza incluye catálogo de servicios, .proto linting, políticas de nomenclatura, control de versiones, compatibilidad, seguimiento distribuido y pruebas de contratos. En escenarios de integración con equipos front-end, se debe evaluar si la organización desea exponer gRPC directamente, utilizar gRPC-Web o traducir a HTTP/JSON. Cada elección cambia las herramientas, la seguridad del navegador y las capacidades de intermediario."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.9 WebSocket: handshake, frames y ciclo de vida",
    "id": "13-9-websocket-handshake-frames-y-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "WebSocket es un protocolo estandarizado para la comunicación persistente full-duplex entre cliente y servidor. El proceso comienza con una solicitud HTTP que contiene Upgrade: websocket y otros encabezados específicos. Si el servidor acepta, responde con el estado 101 Switching Protocols y la conexión comienza a operar con frames WebSocket. A partir de entonces ya no existe la semántica clásica de una solicitud seguida de una única respuesta."
  },
  {
    "kind": "paragraph",
    "text": "El protocolo es valioso en aplicaciones que requieren baja latencia y envío de servidor a cliente, como paneles en tiempo real, chats, seguimiento de pedidos, notificaciones operativas y paneles de observabilidad. Por sí solo, no define la semántica del mensaje. La aplicación puede enviar sobres JSON, binarios, mecanografiados o protocolos más elaborados a través del canal. Esto proporciona flexibilidad, pero también requiere estandarización interna."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de vida de una conexión WebSocket incluye autenticación inicial, apertura, intercambio de frames, mantenimiento de la actividad mediante ping/pong y terminación controlada. En plataformas de escala horizontal, el diseño debe considerar la afinidad, la distribución en abanico, la distribución de eventos y la sincronización de estados. Es común utilizar un intermediario o pub/sub detrás del servidor WebSocket para desacoplar la emisión de eventos del mantenimiento de la conexión."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/es/figure-03.svg",
    "alt": "Ciclo de vida de WebSocket desde la upgrade HTTP hasta el cierre de la conexión",
    "caption": "Figura 3 - HTTP sólo participa en el establecimiento; el resto del ciclo ya pertenece al protocolo WebSocket."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de resumen de apretón de manos de apertura"
  },
  {
    "kind": "code",
    "text": "GET /stream HTTP/1.1\nHost: api.empresa.example\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==\nSec-WebSocket-Version: 13"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.10 Funcionamiento, escalabilidad y seguridad en WebSocket",
    "id": "13-10-funcionamiento-escalabilidad-y-seguridad-en-websocket"
  },
  {
    "kind": "paragraph",
    "text": "Operar miles o millones de conexiones persistentes es muy diferente a operar solicitudes HTTP cortas. La infraestructura debe admitir sockets abiertos prolongados, timeouts coherentes, protección contra clientes lentos y mecanismos de backpressure. Los servidores proxy, firewalls y balanceadores deben configurarse para no finalizar la conexión debido a una inactividad indebida. Además, métricas como conexiones activas, tasa de mensajes, bytes por conexión y motivos de cierre se vuelven esenciales."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación generalmente ocurre en el handshake inicial o en un primer mensaje de aplicación. Los tokens caducan y es necesario planificar la estrategia de renovación. También debe decidir cómo manejar la autorización dinámica: una conexión abierta no debería garantizar un permiso eterno para todos los eventos futuros. En algunos escenarios, el servidor necesita volver a evaluar el contexto del cliente al publicar eventos confidenciales."
  },
  {
    "kind": "paragraph",
    "text": "Desde una perspectiva de seguridad, WebSocket amplía la importancia de la validación del origen, el control de la carga útil, la limitación del tamaño del marco, la serialización segura y la segregación de temas. A medida que la conexión persiste, un error de autorización o distribución puede filtrar rápidamente un gran volumen de información. Los registros estructurados, los ID de conexión, la correlación de identidades de usuarios y los registros de cierre ayudan a solucionar problemas."
  },
  {
    "kind": "subhead",
    "text": "Trampa común"
  },
  {
    "kind": "paragraph",
    "text": "Usar WebSocket sólo porque la aplicación parece \"moderna\" puede aumentar los costos operativos innecesariamente. Si el caso de uso es una simple notificación unidireccional, el SSE o una encuesta bien diseñada pueden ser suficientes. Elija por comportamiento requerido, no por novedad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.11 Comparación práctica entre GraphQL, gRPC y WebSocket",
    "id": "13-11-comparacion-practica-entre-graphql-grpc-y-websocket"
  },
  {
    "kind": "paragraph",
    "text": "La comparación más útil no pregunta qué tecnología es mejor en abstracto, sino qué semántica se adapta mejor al problema. GraphQL es sólido cuando el desafío es brindar al consumidor flexibilidad de consulta sobre un modelo de datos complejo. gRPC es fuerte cuando el enfoque es la integración tipada entre servicios, especialmente con alto volumen, baja latencia y streaming. WebSocket es fuerte cuando el problema principal es mantener un canal abierto para el intercambio continuo de eventos o mensajes."
  },
  {
    "kind": "paragraph",
    "text": "Estas fuerzas tienen costos. GraphQL requiere un esquema detallado y una gobernanza de ejecución. gRPC requiere herramientas específicas, contratos .proto y comprensión de HTTP/2 y sus propios estados. WebSocket requiere un funcionamiento cuidadoso de las conexiones persistentes, la afinidad y los canales de publicación. A cambio, cada uno resuelve con elegancia problemas que serían más difíciles o menos naturales en un modelo puramente REST."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas híbridas son comunes. Un banco digital puede exponer REST/JSON o GraphQL a canales digitales, utilizar gRPC en servicios de dominio interno y emplear WebSocket para actualizar posiciones de inversión en tiempo real en la interfaz del cliente. Lo importante es que la organización tenga criterios arquitectónicos claros y no permita la proliferación descontrolada de estándares incompatibles."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - El mejor criterio de elección es la naturaleza del problema y la operación.",
    "headers": [
      "Criterio",
      "GraphQL",
      "gRPC",
      "WebSocket"
    ],
    "rows": [
      [
        "Problema central",
        "Consulta de datos flexible.",
        "RPC tipado y eficiente.",
        "Canal persistente y full-duplex."
      ],
      [
        "Contrato",
        "Esquema GraphQL.",
        ".proto/servicio y mensajes.",
        "Contrato de aplicación definido externamente."
      ],
      [
        "Transporte común",
        "HTTP.",
        "HTTP/2.",
        "Protocolo WebSocket después de la upgrade HTTP."
      ],
      [
        "Streaming",
        "Suscripciones según implementación.",
        "Nativo en varios modos.",
        "Nativo del canal."
      ],
      [
        "Caché e intermediarios",
        "Menos trivial que REST.",
        "Soporte variable en gateways.",
        "Muy diferente del HTTP tradicional."
      ],
      [
        "Uso recurrente",
        "BFFs y agregación de datos.",
        "Microservicios e integración interna.",
        "Tiempo real, chat y notificaciones."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/es/figure-04.svg",
    "alt": "Comparación semántica entre GraphQL, gRPC y WebSocket en una arquitectura híbrida",
    "caption": "Figura 4: Muchas plataformas combinan más de una de estas tecnologías con funciones complementarias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.12 API Gateways, estudios de casos y aplicación empresarial",
    "id": "13-12-api-gateways-estudios-de-casos-y-aplicacion-empresarial"
  },
  {
    "kind": "paragraph",
    "text": "Las puertas de enlace tradicionales se diseñaron principalmente para HTTP/REST, autenticación, transformación, enrutamiento y políticas perimetrales. Cuando una organización adopta GraphQL, gRPC o WebSocket, debe comprobar hasta qué punto la puerta de enlace puede comprender el protocolo o la semántica de la aplicación. En algunos casos, la puerta de enlace actúa teniendo en cuenta la tecnología; en otros, funciona sólo como proxy o terminador TLS."
  },
  {
    "kind": "paragraph",
    "text": "Para GraphQL, las plataformas maduras pueden aplicar autenticación, WAF, limitación de velocidad y observabilidad básica en el borde, mientras que la gobernanza detallada del esquema y la ejecución permanece en el servidor GraphQL. Para gRPC, el soporte debe considerar HTTP/2 de extremo a extremo, trailers y streaming. Para WebSocket, la puerta de enlace debe gestionar el upgrade, timeouts prolongados, afinidad y políticas adecuadas para conexiones persistentes. En Axway, Azure APIM, Envoy y otros productos, el nivel de soporte varía según la característica y la versión."
  },
  {
    "kind": "paragraph",
    "text": "Como caso de estudio, imagine una plataforma de inversión. La aplicación móvil utiliza GraphQL para crear un panel y una cartera. Los microservicios internos de computación y consolidación intercambian datos a través de gRPC. El módulo de cotización en tiempo real publica eventos a través de WebSocket para los clientes conectados. La arquitectura es coherente porque cada elección responde a un comportamiento diferente, y no a un intento de estandarizarlo todo en un único mecanismo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.13 Troubleshooting y diagnóstico",
    "id": "13-13-troubleshooting-y-diagnostico"
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting de GraphQL, gRPC y WebSocket requiere separar la semántica de transporte, protocolo y aplicación. En GraphQL, una respuesta HTTP 200 puede contener errores de negocio en el array errors, mientras que en gRPC el transporte puede estar en buen estado y el estado final indica PERMISSION_DENIED, DEADLINE_EXCEEDED o UNAVAILABLE. En WebSocket, el análisis debe considerar el handshake, la permanencia de la conexión, el ping/pong, los códigos de cierre y los mensajes de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas y la evidencia también cambian. En GraphQL, los nombres de las operaciones, la complejidad calculada, el tiempo de resolución y la correlación con los backends son más útiles que simplemente mirar la URL. En gRPC, los registros de métodos, los metadatos, los deadlines, los trailers, las métricas por código de estado y los traces por stream ayudan a localizar cuellos de botella. En WebSocket, el recuento de conexiones abiertas, la tasa de mensajes, la distribución, la duración promedio, los bytes por cliente y los códigos de cierre apuntan a problemas de escala y comportamiento anómalo."
  },
  {
    "kind": "paragraph",
    "text": "Desde la perspectiva de la puerta de enlace y la red, es importante saber que pueden ocurrir fallas antes de que la tecnología de la aplicación entre en juego. Un proxy sin compatibilidad total con HTTP/2 puede degradar gRPC. Un equilibrador de tiempo de espera agresivo puede derribar WebSockets estables. Una política WAF genérica puede interferir con las cargas útiles de GraphQL. Es necesario identificar la capa correcta del problema para evitar cambios aleatorios de código."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - El síntoma correcto depende de la semántica de cada tecnología.",
    "headers": [
      "Tecnología",
      "Síntoma",
      "Hipótesis iniciales"
    ],
    "rows": [
      [
        "GraphQL",
        "Query lenta o error parcial.",
        "Resolver costoso, N+1, backend lento o límite de complejidad."
      ],
      [
        "gRPC",
        "Deadline excedido.",
        "Deadline corto, backend saturado, flujo estancado o pérdida de capacidad."
      ],
      [
        "WebSocket",
        "Desconexiones frecuentes.",
        "Idle timeout, falta de afinidad, ping/pong inadecuado o red inestable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.14 Estudios de casos y laboratorios",
    "id": "13-14-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso de estudio 1: un portal de servicios necesita consolidar perfil, productos, límites y últimas interacciones en una única pantalla móvil. El equipo opta por GraphQL para permitir que el front-end seleccione solo los datos necesarios para cada viaje. La ganancia proviene de la flexibilidad, pero el servidor necesita introducir batching, persisted queries y autorización por campo para evitar una explosión de costos y la exposición de datos confidenciales."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: un conjunto de microservicios de pagos necesita intercambiar mensajes pequeños con alta cadencia y tipado fuerte. El equipo adopta gRPC con Protobuf entre servicios internos, mientras mantiene REST en el borde para socios externos. El éxito depende de la gestión de archivos .proto, deadlines coherentes, mTLS, observabilidad distribuida y una traducción adecuada cuando las llamadas deben atravesar capas de puerta de enlace."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: una plataforma de cotizaciones en tiempo real envía actualizaciones continuas a paneles operativos y aplicaciones móviles. El canal push se implementa con WebSocket, mientras que la consulta de posición inicial todavía usa HTTP. El diseño sólo es sostenible porque existe un intermediario de eventos, escalabilidad horizontal, afinidad de sesión, identificación de conexiones y una política de reautenticación clara cuando el token expira."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Cree una consulta GraphQL con fragmentos y observe el árbol de resolución. 2) Defina un servicio gRPC con un método unary y otro de streaming, y pruebe los deadlines. 3) Abra un WebSocket, envíe mensajes, simule ping/pong y observe el close handshake. 4) En todos los casos, recopile evidencia de registros, métricas y traces."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.15 Criterios de decisión arquitectónica",
    "id": "13-15-criterios-de-decision-arquitectonica"
  },
  {
    "kind": "paragraph",
    "text": "La decisión entre estas tecnologías debe institucionalizarse como un conjunto de criterios. Las preguntas útiles incluyen: ¿Necesita el consumidor elegir campos dinámicamente? ¿Existe una gran diversidad de pantallas y agregaciones? ¿El tráfico es predominantemente de servicio a servicio y requiere contratos tipados? ¿El caso de uso implica streaming continuo o envío de eventos? ¿Las puertas de enlace actuales admiten el protocolo de forma nativa? ¿Tiene el equipo la madurez para operar el modelo elegido?"
  },
  {
    "kind": "paragraph",
    "text": "Los criterios no funcionan si son sólo técnicos. Es necesario considerar la incorporación del equipo, la generación de SDK, la capacidad de soporte, la capacitación, la postura de seguridad, el costo de observabilidad, la curva de troubleshooting y el cumplimiento de los estándares corporativos. Una tecnología teóricamente excelente puede resultar inadecuada si la organización no cuenta con los procesos y herramientas para operarla de manera segura."
  },
  {
    "kind": "paragraph",
    "text": "Por último, la decisión debe revisarse periódicamente. Los productos de puerta de enlace, las mallas de servicios, las plataformas en la nube y las bibliotecas evolucionan. Lo que era inviable en una versión antigua puede resultar sencillo más adelante. Aún así, el cambio tecnológico nunca debería ocurrir simplemente porque el mercado cambia de enfoque; necesita generar beneficios operativos o comerciales mensurables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL, gRPC y WebSocket amplían el repertorio de integración, pero no compiten en el mismo plano semántico. GraphQL es una consulta flexible y basada en esquemas; gRPC está orientado a servicios, métodos y mensajes tipados; WebSocket está orientado en torno a un canal persistente full-duplex sobre el cual la aplicación define su propia semántica."
  },
  {
    "kind": "paragraph",
    "text": "La decisión arquitectónica correcta debe considerar el problema empresarial, la forma del contrato, los requisitos de latencia y streaming, la capacidad de gobernanza, el soporte de la puerta de enlace y la madurez operativa de la organización. Las decisiones tomadas únicamente por el desempeño teórico o las tendencias del mercado tienden a fallar cuando se topan con observabilidad, seguridad y mantenibilidad en el mundo real."
  },
  {
    "kind": "paragraph",
    "text": "En entornos corporativos es habitual combinar estos modelos con REST y OpenAPI. Esta combinación funciona bien cuando la propiedad, los estándares contractuales, las políticas de seguridad y los criterios de troubleshooting son explícitos. El principal beneficio del capítulo es permitir al lector reconocer el papel apropiado de cada tecnología en una plataforma API moderna."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "Con los modelos de comunicación alternativos presentados, el siguiente capítulo vuelve al eje de seguridad y gobernanza para diferenciar autenticación y autorización, base conceptual indispensable antes de pasar a las credenciales, OAuth 2.0, OpenID Connect y tokens."
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
      "La elección entre GraphQL, gRPC y WebSocket se basó en el comportamiento requerido, no solo en la preferencia tecnológica.",
      "El contrato publicado está claramente identificado: esquema GraphQL, .proto o protocolo de aplicación sobre WebSocket.",
      "Existe una estrategia de autenticación, autorización y auditoría compatible con el modelo elegido.",
      "Las herramientas de observabilidad capturan la granularidad correcta: operación GraphQL, método gRPC o evento/mensaje WebSocket.",
      "Los intermediarios de red y la puerta de enlace admiten correctamente upgrade, HTTP/2, streaming, trailers o conexiones persistentes.",
      "Se definió el modelo de versionado y evolución para esquema, mensajes y clientes.",
      "Existe protección contra el abuso: complejidad de consultas, límites de streaming, cuotas y backpressure.",
      "La troubleshooting considera toda la cadena: cliente, puerta de enlace, runtime de la tecnología, backends y transporte."
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
      "Explique por qué GraphQL no es simplemente \"REST con un único punto final\".",
      "Diferenciar entre recuperación insuficiente, recuperación excesiva y N+1 en GraphQL.",
      "Describe los cuatro patrones de llamadas de gRPC y brinda un caso de uso para cada uno.",
      "Explique el papel de los deadlines en gRPC y los riesgos de ignorarlos.",
      "Describa qué cambios en la conexión después del estado 101 de WebSocket.",
      "Compare los requisitos operativos de WebSocket y HTTP tradicional.",
      "Proponer una arquitectura que utilice REST o GraphQL en el borde, gRPC entre servicios y WebSocket para eventos.",
      "Enumere los controles de seguridad importantes para un servidor GraphQL expuesto públicamente.",
      "Explique cuándo una puerta de enlace actúa teniendo en cuenta el protocolo y cuándo actúa sólo como un proxy genérico.",
      "Analice por qué la comparación más útil entre estas tecnologías debería guiarse por la semántica del problema."
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
    "caption": "Tabla 5 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Alias",
        "Función GraphQL para cambiar el nombre de un campo en la respuesta."
      ],
      [
        "batching",
        "Agrupación de múltiples búsquedas lógicas en una llamada más eficiente al backend."
      ],
      [
        "Bidirectional streaming",
        "Intercambio de mensajes bidireccional fluido en gRPC."
      ],
      [
        "Deadline",
        "Deadline máximo aceptado para completar una llamada de gRPC."
      ],
      [
        "Federación GraphQL",
        "Composición de un supergrafo a partir de subgrafos mantenidos por diferentes equipos."
      ],
      [
        "Fragment",
        "Fragment de selección de campos reutilizable en GraphQL."
      ],
      [
        "Introspection",
        "Capacidad para consultar su propio esquema GraphQL."
      ],
      [
        "persisted query",
        "Consulta previamente registrada y normalmente referenciada por hash."
      ],
      [
        "Protocol Buffers",
        "Formato tipado de serialización binaria que se utiliza con frecuencia en gRPC."
      ],
      [
        "resolver",
        "Función que produce el valor de un campo en el runtime de GraphQL."
      ],
      [
        "Sec-WebSocket-Key",
        "Encabezado utilizado en el handshake WebSocket."
      ],
      [
        "Server streaming",
        "Patrón en el que el cliente realiza una solicitud y recibe múltiples respuestas en gRPC."
      ],
      [
        "Subscription",
        "Operación GraphQL para la entrega continua de eventos al consumidor."
      ],
      [
        "Trailer",
        "Metadatos enviados al final de una secuencia HTTP/2, relevantes en gRPC."
      ],
      [
        "Upgrade",
        "Mecanismo HTTP utilizado para la transición inicial al protocolo WebSocket."
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
      "Fundación GraphQL. Especificación GraphQL.",
      "Fundación GraphQL. Especificación GraphQL sobre HTTP.",
      "Autores de gRPC. Documentación gRPC.",
      "Documentación de buffers de protocolo.",
      "IETF. RFC 6455: el protocolo WebSocket.",
      "IETF. RFC 8441: Arranque de WebSockets con HTTP/2.",
      "Microsoft aprende. Guía para GraphQL, gRPC y WebSocket en servicios de Azure.",
      "Documentación de proxy del enviado. Compatibilidad con gRPC, WebSocket y HTTP/2.",
      "OWASP. Hoja de referencia de GraphQL y seguridad API Top 10."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas, puertas de enlace y mallas evolucionan rápidamente. Antes de publicar políticas o decisiones arquitectónicas, valide la versión específica del producto implementado en su organización que admita GraphQL, gRPC, HTTP/2, streaming y WebSocket."
  }
];
