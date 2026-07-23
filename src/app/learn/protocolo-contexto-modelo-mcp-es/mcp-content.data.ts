import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MCP_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "¿Qué es el protocolo de contexto modelo (MCP)?",
    "id": "que-es-el-protocolo-de-contexto-modelo-mcp"
  },
  {
    "kind": "paragraph",
    "text": "Una guía completa sobre servidores MCP, arquitectura, seguridad e integración de agentes de IA"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Tipo de artículo",
      "Buceo técnico profundo"
    ],
    "rows": [
      [
        "fecha de investigación",
        "23 de julio de 2026"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "SELECCIÓN DE TÍTULOS CENTRADA EN SEO"
  },
  {
    "kind": "paragraph",
    "text": "El título comienza con la consulta informativa dominante: \"¿Qué es el protocolo de contexto modelo (MCP)?\" - e incluye términos de soporte de alta intención, como servidores MCP, arquitectura, seguridad, agentes de IA e integración."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen ejecutivo",
    "id": "resumen-ejecutivo"
  },
  {
    "kind": "paragraph",
    "text": "Los grandes modelos de lenguaje son impresionantes razonadores, pero el razonamiento por sí solo no les da acceso confiable a documentos, bases de datos, sistemas de software o acciones comerciales actuales. El protocolo de contexto modelo, generalmente abreviado como MCP, es un protocolo abierto diseñado para estandarizar esa conexión faltante. Proporciona a las aplicaciones de IA una forma coherente de descubrir y utilizar herramientas externas, leer recursos contextuales y ofrecer flujos de trabajo de prompts reutilizables."
  },
  {
    "kind": "paragraph",
    "text": "La idea central es simple: en lugar de escribir un conector personalizado diferente para cada combinación de asistente de IA y servicio externo, los desarrolladores pueden exponer capacidades a través de un servidor MCP. Cualquier host AI compatible puede crear una conexión de cliente MCP a ese servidor. Esto reduce la duplicación de integración, fomenta la interoperabilidad y hace que los sistemas de IA conectados sean más fáciles de probar, gobernar y evolucionar."
  },
  {
    "kind": "paragraph",
    "text": "MCP no es un modelo, un marco de agente, una base de datos ni un reemplazo de las API. Es un contrato de interfaz entre aplicaciones de IA y capacidades externas. Su valor se vuelve más claro cuando la misma herramienta o fuente de conocimiento debe funcionar en múltiples asistentes, IDE, plataformas de agentes o entornos empresariales."
  },
  {
    "kind": "subhead",
    "text": "Conclusiones clave"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "MCP estandariza cómo las aplicaciones de IA se conectan a herramientas externas, fuentes de datos y flujos de trabajo reutilizables.",
      "La arquitectura separa el host, una conexión de cliente MCP y un servidor MCP que expone capacidades.",
      "Los servidores exponen principalmente tres primitivos: herramientas, recursos y avisos.",
      "El protocolo utiliza mensajes JSON-RPC y admite conexiones stdio locales y conexiones HTTP Streamable remotas.",
      "MCP mejora la portabilidad, pero no resuelve automáticamente la autorización, la inyección rápida, la fuga de datos o la ejecución insegura de herramientas.",
      "Los diseños de producción más sólidos combinan privilegios mínimos, aprobación explícita del usuario, validación de esquemas, aislamiento, observabilidad y decisiones cuidadosas sobre la confianza del servidor."
    ]
  },
  {
    "kind": "subhead",
    "text": "Contenido"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "1. Introducción: de los chatbots a los sistemas de inteligencia artificial conectados",
      "2. Una breve historia de MCP",
      "3. Qué es MCP y qué no es",
      "4. El problema que resuelve MCP",
      "5. Arquitectura MCP: host, cliente y servidor",
      "6. La capa de protocolo: JSON-RPC, ciclo de vida y capacidades",
      "7. Las tres primitivas del servidor central",
      "8. Capacidades del lado del cliente",
      "9. Transportes Locales y Remotos",
      "10. Autorización e Identidad",
      "11. MCP en comparación con API, llamadas de funciones, RAG y protocolos de agentes",
      "12. Riesgos de seguridad y diseño defensivo",
      "13. Ejemplo práctico de Python: un pequeño servidor MCP",
      "14. Casos de uso del mundo real",
      "15. Principios de diseño para servidores MCP de producción",
      "16. Limitaciones, compensaciones y conceptos erróneos comunes",
      "17. El futuro del MCP y su impacto social más amplio",
      "18. Conclusión",
      "Glosario y referencias"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1. Introducción: de los chatbots a los sistemas de inteligencia artificial conectados",
    "id": "1-introduccion-de-los-chatbots-a-los-sistemas-de-inteligencia-artificial-conectados"
  },
  {
    "kind": "paragraph",
    "text": "La primera ola de IA generativa enseñó al público a pensar en un modelo de lenguaje como una máquina conversacional: hacer una pregunta y recibir una respuesta. La próxima ola es más ambiciosa. En lugar de simplemente describir lo que se debe hacer, un sistema de inteligencia artificial puede buscar en una base de conocimiento interna, inspeccionar un repositorio de código, consultar una base de datos en vivo, crear un ticket de soporte, actualizar un plan de proyecto o desencadenar un flujo de trabajo controlado."
  },
  {
    "kind": "paragraph",
    "text": "Esa transición cambia el problema de ingeniería. Un modelo puede generar texto sin tocar otro sistema, pero un agente de IA útil necesita contexto, permisos, interfaces y una forma confiable de llamar al software. Antes de que existiera una interfaz estándar, cada conexión era típicamente personalizada: una integración para un asistente y un sistema de archivos, otra para un IDE y GitHub, otra para un bot de soporte y una plataforma de tickets. A medida que crecía el número de aplicaciones de IA y sistemas externos, la matriz de integración se volvió costosa y frágil."
  },
  {
    "kind": "paragraph",
    "text": "MCP aborda este problema a nivel de protocolo. Define un lenguaje común a través del cual una aplicación de IA puede preguntar: \"¿Qué capacidades ofrece?\", recibir descripciones estructuradas, invocar una operación permitida e incorporar el resultado a la conversación en curso. La documentación oficial compara el papel de MCP con un conector universal para aplicaciones de IA, una analogía útil porque el protocolo tiene menos que ver con la inteligencia en sí y más con la interoperabilidad. [2]"
  },
  {
    "kind": "subhead",
    "text": "LA PREGUNTA QUE IMPORTA"
  },
  {
    "kind": "paragraph",
    "text": "¿Qué pasa cuando un modelo de IA deja de estar aislado del mundo y pasa a operar a través de herramientas reales? MCP es una respuesta, pero la calidad y seguridad de esa respuesta dependen de la arquitectura, los permisos y la supervisión humana."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2. Una breve historia de MCP",
    "id": "2-una-breve-historia-de-mcp"
  },
  {
    "kind": "paragraph",
    "text": "MCP surgió de un cuello de botella práctico en el desarrollo de asistentes de IA. La calidad de los modelos estaba mejorando rápidamente, pero los modelos permanecían separados de los datos y sistemas que hacían que sus respuestas fueran útiles dentro de las organizaciones reales. Anthropic presentó públicamente y abrió el protocolo de contexto modelo el 25 de noviembre de 2024, describiéndolo como un estándar para conectar asistentes de IA a repositorios de contenido, herramientas comerciales y entornos de desarrollo. [1]"
  },
  {
    "kind": "paragraph",
    "text": "La versión inicial incluía una especificación, kits de desarrollo de software, soporte para servidores locales e implementaciones de servidores de referencia. La promesa arquitectónica importante era que un desarrollador podría exponer una capacidad una vez como servidor MCP y ponerla a disposición de múltiples clientes compatibles, en lugar de reconstruir la integración para cada producto de IA."
  },
  {
    "kind": "table",
    "caption": "Una línea de tiempo condensada",
    "headers": [
      "Período",
      "Desarrollo",
      "Por qué importaba"
    ],
    "rows": [
      [
        "Antes de finales de 2024",
        "Las integraciones de herramientas de IA se creaban comúnmente como complementos específicos de productos, esquemas de funciones personalizados o adaptadores de marco.",
        "Útil, pero duplicado entre proveedores y difícil de reutilizar."
      ],
      [
        "25 de noviembre de 2024",
        "MCP de código abierto y presentado por Anthropic.",
        "Creó un protocolo público y vocabulario compartido para conexiones de IA al sistema."
      ],
      [
        "2025",
        "El soporte se amplió a asistentes de IA, herramientas de desarrollo, marcos y proveedores de infraestructura. OpenAI agregó compatibilidad con servidores MCP remotos a la API de Responses en mayo de 2025.",
        "MCP avanzó más allá de un experimento de un solo proveedor y se convirtió en una capa de interoperabilidad más amplia."
      ],
      [
        "diciembre 2025",
        "Anthropic donó MCP a la Agentic AI Foundation de la Fundación Linux.",
        "La gestión neutral fortaleció la posición del protocolo como estándar de ecosistema abierto."
      ],
      [
        "2026",
        "El ecosistema se expandió hacia interfaces más ricas, gobernanza de producción y ofertas de servidores empresariales.",
        "MCP se convirtió cada vez más en un límite de plataforma, no simplemente en un formato de conector."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "OpenAI anunció soporte para servidores MCP remotos en su API Responses en mayo de 2025 y declaró que se había unido a los esfuerzos de dirección de MCP. Más tarde ese año, Anthropic donó el proyecto a la Agentic AI Foundation de la Fundación Linux, una medida destinada a preservar la gobernanza abierta y neutral con respecto a los proveedores. [9]"
  },
  {
    "kind": "paragraph",
    "text": "El patrón histórico se asemeja a estándares de infraestructura anteriores: primero, una dolorosa colección de integraciones únicas; luego, un protocolo compartido; finalmente, un ecosistema de herramientas, prácticas de seguridad, registros, puertas de enlace y servicios gestionados. MCP todavía está evolucionando, pero su dirección es clara: su objetivo es hacer que la integración de capacidades de IA sea lo suficientemente portátil como para convertirse en infraestructura. [10]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3. Qué es MCP y qué no es",
    "id": "3-que-es-mcp-y-que-no-es"
  },
  {
    "kind": "paragraph",
    "text": "Model Context Protocol es un protocolo abierto para conectar aplicaciones de modelos de lenguaje grande a fuentes de datos externas y herramientas ejecutables. La especificación oficial define los requisitos para clientes y servidores, mientras que los SDK específicos del idioma implementan gran parte del manejo de mensajes de nivel inferior. [3]"
  },
  {
    "kind": "subhead",
    "text": "Una definición precisa"
  },
  {
    "kind": "paragraph",
    "text": "MCP es una interfaz de ejecución estandarizada que permite a un host de IA descubrir recursos contextuales, mensajes reutilizables y herramientas ejecutables expuestas por uno o más servidores. También define la negociación del ciclo de vida, esquemas de mensajes, transportes, notificaciones y comportamiento de autorización opcional."
  },
  {
    "kind": "subhead",
    "text": "MCP no es..."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Un LLM: MCP conecta modelos con capacidades; no genera lenguaje ni realiza razonamientos por sí solo.",
      "Un marco de agentes: no prescribe bucles de planificación, estrategias de memoria, reflexión ni orquestación de múltiples agentes.",
      "Un reemplazo para REST, GraphQL, bases de datos o intermediarios de mensajes: los servidores MCP a menudo envuelven estos sistemas existentes.",
      "Una garantía de seguridad: el protocolo proporciona estructura, pero un despliegue seguro aún requiere fuertes controles de ingeniería.",
      "Un modelo semántico universal: dos servidores pueden exponer herramientas similares con diferentes nombres, descripciones y esquemas.",
      "Una promesa de que cada cliente admite todas las funciones: las implementaciones negocian capacidades y los clientes pueden presentar herramientas o aprobaciones de manera diferente."
    ]
  },
  {
    "kind": "subhead",
    "text": "UN MODELO MENTAL ÚTIL"
  },
  {
    "kind": "paragraph",
    "text": "Una API describe cómo el software puede acceder a un servicio. MCP describe cómo una aplicación de IA puede descubrir y utilizar capacidades de un servicio en un flujo de trabajo conversacional basado en modelos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4. El problema que resuelve MCP",
    "id": "4-el-problema-que-resuelve-mcp"
  },
  {
    "kind": "paragraph",
    "text": "El problema central a veces se denomina problema de integración N por M. Imagine aplicaciones N AI y sistemas empresariales M. Sin un protocolo compartido, los equipos pueden necesitar un adaptador personalizado para cada emparejamiento relevante. Incluso cuando los conectores comparten una lógica similar, la autenticación, los esquemas, el manejo de errores, la implementación y la aprobación del usuario se implementan repetidamente."
  },
  {
    "kind": "paragraph",
    "text": "MCP reduce esa repetición al colocar un límite de protocolo estable alrededor de las capacidades. Un servidor es propietario de la integración con el sistema externo. Un host es propietario de la experiencia del usuario, la interacción del modelo, el flujo de aprobación y la gestión del contexto. La conexión del cliente MCP se traduce entre esas dos partes mediante un contrato compartido."
  },
  {
    "kind": "subhead",
    "text": "Por qué es importante la palabra \"contexto\""
  },
  {
    "kind": "paragraph",
    "text": "Un modelo responde basándose en lo que aparece en su contexto de entrada actual y lo que aprendió durante el entrenamiento. Sin embargo, las organizaciones reales dependen de información que es privada, dinámica y demasiado grande para colocarla permanentemente en un mensaje. Los recursos y herramientas de MCP permiten al host recuperar solo lo que se necesita en ese momento y luego enviar el resultado al modelo."
  },
  {
    "kind": "paragraph",
    "text": "Esto puede mejorar la relevancia y reducir la sobrecarga del contexto, pero MCP no decide qué información es realmente relevante. La calidad de la recuperación, las descripciones de las herramientas, el comportamiento del modelo y las políticas de la aplicación aún determinan si el contexto correcto llega al modelo."
  },
  {
    "kind": "subhead",
    "text": "De respuestas de sólo lectura a acciones controladas"
  },
  {
    "kind": "paragraph",
    "text": "El segundo problema es la acción. Leer un documento de política es diferente a cambiar el registro de un cliente. Las herramientas MCP pueden representar tanto recuperación como mutación, pero los sistemas de producción deberían tratarlas de manera diferente. Las operaciones de lectura a menudo pueden ser automáticas dentro de un alcance permitido; las operaciones de escritura pueden requerir confirmación, autorización más estricta, registros de auditoría, claves de idempotencia o aprobación de varios pasos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "5. Arquitectura MCP: host, cliente y servidor",
    "id": "5-arquitectura-mcp-host-cliente-y-servidor"
  },
  {
    "kind": "paragraph",
    "text": "MCP sigue una arquitectura cliente-servidor, pero su terminología es más específica que la de una aplicación web convencional. El anfitrión es la aplicación de IA que interactúa con el usuario y coordina el comportamiento del modelo. Para cada conexión de servidor, el host crea un componente de cliente MCP. El servidor MCP expone capacidades y se comunica con ese cliente. [2]"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Partícipe",
      "Responsabilidad primaria",
      "Ejemplos típicos"
    ],
    "rows": [
      [
        "anfitrión MCP",
        "Ejecuta la experiencia de IA, selecciona el modelo, gestiona el contexto, presenta aprobaciones y coordina una o más conexiones de clientes.",
        "Asistente de IA, IDE, agente de escritorio, copiloto empresarial."
      ],
      [
        "cliente MCP",
        "Mantiene una sesión de protocolo dedicada con un servidor MCP y traduce las solicitudes del host en mensajes MCP.",
        "Un objeto de conexión dentro de la aplicación host."
      ],
      [
        "servidor MCP",
        "Expone herramientas, recursos y avisos respaldados por un programa local o servicio remoto.",
        "Conector de sistema de archivos, puerta de enlace de base de datos, integración de tickets, servidor de gestión de nube."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Un host, muchos servidores"
  },
  {
    "kind": "paragraph",
    "text": "Un único host puede conectarse a varios servidores MCP al mismo tiempo. Por ejemplo, un asistente de ingeniería podría conectarse a un servidor Git, un rastreador de problemas, una plataforma de observabilidad y un repositorio de arquitectura interno. El anfitrión sigue siendo responsable de decidir cómo se muestra la lista de capacidades combinadas al modelo y al usuario."
  },
  {
    "kind": "paragraph",
    "text": "La relación de un cliente por servidor crea límites de aislamiento. Las credenciales, sesiones y fallas se pueden separar por conexión. También significa que el host debe manejar los conflictos de nombres, la selección de herramientas, la latencia y el riesgo de que un servidor que no es de confianza influya en el comportamiento que involucra a otro servidor."
  },
  {
    "kind": "subhead",
    "text": "Dos capas de protocolo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Capa de datos: mensajes JSON-RPC, negociación del ciclo de vida, herramientas, recursos, indicaciones, funciones del cliente, notificaciones, progreso y errores.",
      "Capa de transporte: el canal que mueve esos mensajes, incluido el stdio local y el HTTP Streamable remoto."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Esta separación es importante porque la misma herramienta conceptual puede funcionar en un proceso local o en un punto final de red remoto sin cambiar la primitiva MCP de alto nivel. El transporte cambia los requisitos de implementación y seguridad, no el significado de la herramienta en sí. [2]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "6. La capa de protocolo: JSON-RPC, ciclo de vida y capacidades",
    "id": "6-la-capa-de-protocolo-json-rpc-ciclo-de-vida-y-capacidades"
  },
  {
    "kind": "paragraph",
    "text": "MCP utiliza JSON-RPC 2.0 como formato de mensaje base. JSON-RPC define solicitudes, respuestas, notificaciones, nombres de métodos, identificadores, parámetros, resultados y objetos de error. MCP agrega métodos y esquemas específicos de dominio además de esa base. [2]"
  },
  {
    "kind": "subhead",
    "text": "Solicitudes, respuestas y notificaciones"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Solicitud: pide al otro participante que realice una operación e incluye un identificador para poder correlacionar la respuesta.",
      "Respuesta: devuelve un resultado o error estructurado para una solicitud.",
      "Notificación: comunica un evento sin esperar una respuesta, como una señal de cambio de lista o una actualización de progreso."
    ]
  },
  {
    "kind": "subhead",
    "text": "El ciclo de vida de la conexión"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Inicialización: el cliente propone una versión del protocolo y declara las capacidades admitidas.",
      "Negociación: el servidor devuelve su versión seleccionada, información de implementación y capacidades.",
      "Estado inicializado: el cliente indica que pueden comenzar las operaciones normales del protocolo.",
      "Operación: el cliente enumera e invoca primitivas; cualquiera de las partes puede enviar notificaciones o solicitudes respaldadas.",
      "Terminación: la conexión o sesión se cierra según el transporte y el ciclo de vida del host."
    ]
  },
  {
    "kind": "paragraph",
    "text": "La negociación de capacidad impide que cualquiera de las partes suponga que existe una característica opcional. Un servidor puede ofrecer herramientas pero no indicaciones. Un anfitrión puede apoyar el muestreo pero no la obtención. Las implementaciones sólidas se basan en capacidades negociadas en lugar de depender de suposiciones optimistas."
  },
  {
    "kind": "subhead",
    "text": "Descubrimiento dinámico"
  },
  {
    "kind": "paragraph",
    "text": "El protocolo está diseñado para el descubrimiento. Un cliente puede solicitar una lista de herramientas, recursos o indicaciones e inspeccionar metadatos estructurados antes de usarlos. Los servidores también pueden notificar a los clientes que una lista cambió. Esto es más flexible que codificar cada capacidad en el host, pero plantea una pregunta de gobernanza: ¿debería cada capacidad recientemente anunciada estar inmediatamente disponible para el modelo? En entornos de alta confianza, la respuesta puede ser sí. En entornos sensibles, primero se deben revisar, filtrar o verificar las políticas de las capacidades nuevas o modificadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "7. Las tres primitivas del servidor central",
    "id": "7-las-tres-primitivas-del-servidor-central"
  },
  {
    "kind": "paragraph",
    "text": "Los conceptos de MCP más importantes son las tres primitivas que exponen los servidores: herramientas, recursos y avisos. No son intercambiables. Cada uno tiene un modelo de control diferente y debe diseñarse para un tipo diferente de interacción. [2]"
  },
  {
    "kind": "subhead",
    "text": "7.1 Herramientas: funciones invocadas por modelo"
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas son funciones ejecutables expuestas al modelo a través del host. Una herramienta tiene un nombre, una descripción, un esquema de entrada y un resultado. Los ejemplos incluyen consultar una base de datos, crear un ticket, calcular un precio, leer el estado de una implementación o escribir un archivo. En la jerarquía de control oficial, las herramientas están controladas por modelos: el modelo puede decidir que una herramienta es útil mientras responde al usuario. [3]"
  },
  {
    "kind": "paragraph",
    "text": "El diseño de herramientas afecta fuertemente el comportamiento del modelo. Una descripción vaga como \"administrar datos\" es difícil de utilizar de forma segura. Una herramienta precisa como \"get_invoice_status(invoice_id)\" le da al modelo un límite de decisión más estrecho. Los esquemas de entrada deben rechazar formas no válidas y la salida debe estar lo suficientemente estructurada para que el host y el modelo las interpreten de manera confiable."
  },
  {
    "kind": "subhead",
    "text": "PRINCIPIO DE DISEÑO"
  },
  {
    "kind": "paragraph",
    "text": "Prefiera herramientas pequeñas que revelen intenciones a una única herramienta sin restricciones para \"ejecutar cualquier cosa\". Las herramientas limitadas son más fáciles de autorizar, probar, auditar y explicar a los usuarios."
  },
  {
    "kind": "subhead",
    "text": "7.2 Recursos: contexto gestionado por aplicaciones"
  },
  {
    "kind": "paragraph",
    "text": "Los recursos representan datos contextuales que se pueden enumerar y leer. Un recurso puede ser un archivo, un esquema de base de datos, un artículo de conocimientos, un historial de repositorio, una configuración o una respuesta de API. Los recursos están controlados por la aplicación: el host decide cómo los usuarios los descubren, seleccionan, obtienen una vista previa o los adjuntan al contexto del modelo. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Los recursos son especialmente útiles cuando el contenido tiene una identidad direccionable, como un URI, y cuando leer es conceptualmente diferente de realizar una acción. Un recurso bien diseñado incluye metadatos útiles (título, descripción, tipo de medio y señales de actualidad) para que el cliente pueda presentarlo de forma inteligente."
  },
  {
    "kind": "subhead",
    "text": "7.3 Mensajes: plantillas de flujo de trabajo invocadas por el usuario"
  },
  {
    "kind": "paragraph",
    "text": "Las indicaciones son plantillas de interacción parametrizadas y reutilizables. Un mensaje puede codificar un flujo de trabajo recomendado, instrucciones de dominio, ejemplos de algunas tomas o una secuencia estructurada que combine recursos y herramientas. Las indicaciones están controladas por el usuario y normalmente requieren una selección explícita en la interfaz del host. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Las indicaciones ayudan a los autores del servidor a enseñar a los usuarios cómo obtener valor de una capacidad sin colocar toda la orientación del dominio en las descripciones de las herramientas. Por ejemplo, un servidor de seguridad podría ofrecer un mensaje \"Revisar una API para detectar riesgos comunes\" que solicita un documento OpenAPI, un entorno y una tolerancia al riesgo. Los mensajes resultantes pueden guiar el modelo a través de un análisis consistente."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Primitivo",
      "Modelo de control",
      "Mejor usado para",
      "Ejemplo"
    ],
    "rows": [
      [
        "Herramienta",
        "Controlado por modelo",
        "Acciones y recuperación dinámica.",
        "crear_ticket, consulta_pedidos, reiniciar_servicio"
      ],
      [
        "Recurso",
        "Controlado por la aplicación",
        "Contexto direccionable y datos de referencia.",
        "archivo://policy.pdf, db://schema/orders"
      ],
      [
        "Inmediato",
        "Controlado por el usuario",
        "Flujos de trabajo reutilizables e interacciones estructuradas",
        "código de revisión, lanzamiento del plan, resumen del incidente"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8. Capacidades del lado del cliente",
    "id": "8-capacidades-del-lado-del-cliente"
  },
  {
    "kind": "paragraph",
    "text": "MCP es bidireccional. Los servidores no sólo responden a las solicitudes de los clientes; también pueden utilizar capacidades expuestas por el cliente, cuando se negocian. Estas características permiten flujos de trabajo más completos y al mismo tiempo mantienen al anfitrión en control del modelo y la experiencia del usuario. [2]"
  },
  {
    "kind": "subhead",
    "text": "Muestreo"
  },
  {
    "kind": "paragraph",
    "text": "El muestreo permite a un servidor solicitar la finalización de un modelo de lenguaje a través del cliente. Esto ayuda a los desarrolladores de servidores a permanecer independientes del modelo: el servidor puede pedirle al host que razone la información sin incorporar un SDK de modelo específico del proveedor ni poseer las credenciales del modelo del usuario. El anfitrión aún decide si cumplir con la solicitud y cómo."
  },
  {
    "kind": "subhead",
    "text": "Sonsacamiento"
  },
  {
    "kind": "paragraph",
    "text": "La obtención permite a un servidor solicitar más información o confirmación del usuario a través del host. Es posible que una herramienta de implementación necesite un entorno de destino; Es posible que un flujo de trabajo de compras necesite confirmación antes de crear un pedido. El anfitrión debe presentar la solicitud con claridad y evitar convertir la obtención en una elusión de autorización oculta."
  },
  {
    "kind": "subhead",
    "text": "Raíces y límites"
  },
  {
    "kind": "paragraph",
    "text": "Las raíces pueden comunicar los límites del sistema de archivos o del espacio de trabajo que el servidor puede considerar relevantes. Son útiles como herramientas de desarrollo local, pero no deben tratarse como un entorno de pruebas completo. El proceso del servidor aún necesita permisos del sistema operativo, validación de rutas y protección contra escapes transversales o basados ​​en enlaces simbólicos."
  },
  {
    "kind": "subhead",
    "text": "Registro y progreso"
  },
  {
    "kind": "paragraph",
    "text": "El registro, las notificaciones, la cancelación y los informes de progreso hacen que las operaciones de larga duración sean observables e interrumpibles. Estos detalles pueden parecer secundarios, pero son esenciales para la fiabilidad de la producción. Un agente de IA que puede comenzar a trabajar pero no puede explicar el progreso, manejar la cancelación o mostrar errores estructurados crea una experiencia de usuario deficiente y potencialmente insegura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9. Transportes Locales y Remotos",
    "id": "9-transportes-locales-y-remotos"
  },
  {
    "kind": "paragraph",
    "text": "La capa de transporte define cómo se mueven los mensajes MCP entre el cliente y el servidor. La especificación estable describe dos mecanismos estándar: stdio y Streamable HTTP. [4]"
  },
  {
    "kind": "subhead",
    "text": "9.1 stdio: comunicación de procesos locales"
  },
  {
    "kind": "paragraph",
    "text": "Con stdio, el host inicia el servidor MCP como un subproceso. El servidor lee mensajes de protocolo de la entrada estándar y escribe mensajes de protocolo en la salida estándar. Este enfoque es eficaz para las herramientas locales porque evita la sobrecarga de la red y permite al host gestionar el ciclo de vida del proceso del servidor."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Buen ajuste: acceso al sistema de archivos local, herramientas de desarrollo, integraciones de línea de comandos, automatizaciones personales.",
      "Patrón de credenciales: variables de entorno, configuración local o instalaciones del sistema operativo en lugar del flujo de autorización HTTP.",
      "Regla de implementación crítica: los mensajes de protocolo deben ser el único contenido escrito en la salida estándar; los registros deben ir al error estándar o a un archivo."
    ]
  },
  {
    "kind": "subhead",
    "text": "9.2 HTTP transmitible: servicios remotos"
  },
  {
    "kind": "paragraph",
    "text": "HTTP transmitible habilita servidores MCP remotos. Los clientes envían mensajes JSON-RPC a través de solicitudes HTTP, mientras que el servidor puede devolver respuestas JSON o utilizar eventos enviados por el servidor para la transmisión. El diseño admite múltiples conexiones de clientes, mensajes de servidor a cliente, reanudabilidad e identificadores de sesión opcionales. [4]"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Buen ajuste: integraciones SaaS, conectores empresariales administrados centralmente, servicios en la nube, herramientas compartidas en toda la organización.",
      "Preocupaciones operativas: autenticación, TLS, validación de origen, limitación de velocidad, aislamiento de arrendamiento, seguridad de sesión, observabilidad y controles de salida de la red.",
      "Preocupación por la compatibilidad: es posible que las implementaciones más antiguas aún utilicen el transporte HTTP más SSE en desuso, por lo que los clientes y servidores pueden necesitar una estrategia de migración."
    ]
  },
  {
    "kind": "table",
    "caption": "Elegir un transporte",
    "headers": [
      "Pregunta",
      "Prefiero stdio cuando...",
      "Prefiere HTTP Streamable cuando..."
    ],
    "rows": [
      [
        "¿Dónde corre?",
        "El servidor es local para el usuario o la estación de trabajo.",
        "El servidor está alojado de forma centralizada o tiene acceso a Internet."
      ],
      [
        "¿Quién lo usa?",
        "Normalmente, un host es propietario del proceso.",
        "Muchos clientes o usuarios necesitan el mismo servicio."
      ],
      [
        "¿Cómo se manejan las credenciales?",
        "Los permisos de proceso y entorno local son suficientes.",
        "Se requieren OAuth, tokens de portador, puertas de enlace e identidad compatible con los inquilinos."
      ],
      [
        "¿Cuál es el modelo operativo?",
        "Ciclo de vida local simple y latencia mínima.",
        "Implementación escalable, monitoreo, políticas y disponibilidad remota."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10. Autorización e Identidad",
    "id": "10-autorizacion-e-identidad"
  },
  {
    "kind": "paragraph",
    "text": "La autorización es opcional a nivel de protocolo, pero rara vez lo es en una implementación remota importante. La especificación de autorización MCP estable está diseñada principalmente para transportes basados ​​en HTTP. Para stdio, las credenciales generalmente se obtienen a través del entorno local en lugar del protocolo de autorización remota. [5]"
  },
  {
    "kind": "subhead",
    "text": "La autenticación no es autorización."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación responde \"¿Quién es este cliente o usuario?\" La autorización responde \"¿Qué puede hacer esta identidad?\" Un servidor que valida un token pero ignora la audiencia, el alcance, el inquilino, la función o la propiedad del recurso no ha completado el trabajo de seguridad."
  },
  {
    "kind": "subhead",
    "text": "Límites de identidad importantes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Usuario a anfitrión: la aplicación de IA debe saber qué usuario solicita y qué organización o inquilino solicita.",
      "Host o cliente al servidor MCP: el servidor debe validar que las credenciales fueron destinadas a él.",
      "Del servidor MCP a la API descendente: el servidor puede necesitar tokens de usuario delegados, credenciales de servicio o un flujo en nombre de.",
      "Herramienta a objeto comercial: la autorización aún debe verificarse a nivel de registro, proyecto, cuenta o recurso."
    ]
  },
  {
    "kind": "paragraph",
    "text": "El paso de tokens es especialmente peligroso. Un servidor no debe aceptar tokens arbitrarios y reenviarlos a otro servicio sin validar la audiencia y los privilegios previstos. La guía de seguridad oficial advierte explícitamente contra la aceptación de tokens que no fueron emitidos para el servidor MCP. [6]"
  },
  {
    "kind": "subhead",
    "text": "Consentimiento y aprobación"
  },
  {
    "kind": "paragraph",
    "text": "La autorización del protocolo y la aprobación del usuario resuelven diferentes problemas. OAuth puede demostrar que a un usuario se le otorgó acceso a un servicio, mientras que una aprobación en una conversación puede confirmar que el usuario desea una acción específica ahora. Las herramientas de alto impacto a menudo necesitan ambos: un permiso duradero más una confirmación contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11. MCP en comparación con API, llamadas de funciones, RAG y protocolos de agentes",
    "id": "11-mcp-en-comparacion-con-api-llamadas-de-funciones-rag-y-protocolos-de-agentes"
  },
  {
    "kind": "paragraph",
    "text": "MCP es más fácil de entender comparándolo con tecnologías adyacentes. Generalmente los complementa en lugar de reemplazarlos."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Tecnología",
      "Propósito principal",
      "Relación con MCP"
    ],
    "rows": [
      [
        "API REST o GraphQL",
        "Exponer datos y operaciones de aplicaciones a clientes de software.",
        "Un servidor MCP a menudo incluye una o más API y presenta herramientas o recursos orientados a la IA."
      ],
      [
        "Llamada a función de modelo",
        "Deje que una API de modelo específico devuelva argumentos de llamada de función estructurados.",
        "MCP estandariza el descubrimiento y la ejecución entre hosts y servidores externos a través de límites de modelos y proveedores."
      ],
      [
        "TRAPO",
        "Recuperar conocimientos relevantes y ubicarlos en el contexto del modelo.",
        "Un servidor MCP puede exponer herramientas y recursos de búsqueda que implementan una canalización RAG."
      ],
      [
        "Marco del agente",
        "Administre la planificación, la memoria, los bucles, el estado y la orquestación.",
        "Un marco puede utilizar MCP como herramienta y capa de integración de contexto."
      ],
      [
        "Protocolo de agente a agente",
        "Permita que los agentes descubran, deleguen y colaboren con otros agentes.",
        "MCP conecta principalmente aplicaciones de IA con herramientas y contexto; Los protocolos de colaboración de agentes abordan un límite diferente."
      ],
      [
        "Sistema de complementos",
        "Amplíe una aplicación con capacidades empaquetadas.",
        "MCP puede servir como protocolo abierto debajo de un ecosistema de complemento o conector."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "MCP versus llamada directa a funciones"
  },
  {
    "kind": "paragraph",
    "text": "La llamada directa a funciones funciona bien cuando la aplicación ya posee un conjunto de herramientas pequeño y estático. El desarrollador define esquemas de funciones dentro de la solicitud del modelo y ejecuta la función elegida en el código de la aplicación. MCP se vuelve más valioso cuando las herramientas son externas, se descubren dinámicamente, se comparten entre aplicaciones, se implementan de forma independiente o son mantenidas por otro equipo."
  },
  {
    "kind": "subhead",
    "text": "MCP versus RAG"
  },
  {
    "kind": "paragraph",
    "text": "RAG es un patrón de recuperación de información, no un protocolo de interoperabilidad. Un sistema RAG decide cómo indexar, clasificar, fragmentar y recuperar el conocimiento. MCP puede exponer esa capacidad de recuperación como una herramienta o exponer documentos individuales como recursos. No garantiza que la recuperación subyacente sea precisa o que el contexto devuelto sea suficiente."
  },
  {
    "kind": "subhead",
    "text": "MCP versus API"
  },
  {
    "kind": "paragraph",
    "text": "Una API suele estar diseñada para clientes de software deterministas que ya conocen el punto final y el funcionamiento. Un servidor MCP agrega metadatos de descubrimiento orientados a la IA, esquemas de herramientas, indicaciones, recursos y comportamiento del ciclo de vida del protocolo. El servidor todavía necesita una implementación real detrás de él: a menudo una API, un controlador de base de datos, un programa de línea de comandos o un servicio empresarial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12. Riesgos de seguridad y diseño defensivo",
    "id": "12-riesgos-de-seguridad-y-diseno-defensivo"
  },
  {
    "kind": "paragraph",
    "text": "MCP amplía lo que puede alcanzar una aplicación de IA, por lo que también amplía las consecuencias de los errores. La seguridad no se puede reducir a \"usar OAuth\" o \"preguntar al usuario antes de llamar a la herramienta\". Un diseño completo considera el modelo, el host, el servidor, el transporte, los sistemas posteriores, los datos y la interfaz humana como límites de confianza separados."
  },
  {
    "kind": "subhead",
    "text": "12.1 Inyección rápida y contenido no confiable"
  },
  {
    "kind": "paragraph",
    "text": "Una herramienta o recurso puede devolver texto que contenga instrucciones maliciosas. El modelo puede confundir ese contenido con una guía confiable e intentar una acción insegura. Se trata de una inyección de aviso indirecto: el atacante controla los datos en lugar del aviso visible del usuario. Las defensas incluyen separar instrucciones de datos, etiquetar la procedencia, restringir cadenas de herramientas, filtrar acciones sensibles y exigir aprobación para operaciones importantes."
  },
  {
    "kind": "subhead",
    "text": "12.2 Envenenamiento de herramientas y descripciones engañosas"
  },
  {
    "kind": "paragraph",
    "text": "El modelo selecciona herramientas en parte a partir de nombres y descripciones. Un servidor malicioso o comprometido puede anunciar una herramienta de una manera que manipule la selección u oculte los efectos secundarios. Los hosts deben mostrar la identidad de la herramienta, el origen, los permisos y las vistas previas de acciones significativas. Los entornos empresariales pueden necesitar listas permitidas, paquetes firmados, manifiestos revisados ​​o una puerta de enlace que reescriba y filtre los metadatos de herramientas expuestos."
  },
  {
    "kind": "subhead",
    "text": "12.3 Privilegio excesivo"
  },
  {
    "kind": "paragraph",
    "text": "Un servidor que se ejecuta con un amplio sistema de archivos, nube, base de datos o permisos administrativos convierte un error de modelo en un incidente grande. Utilice credenciales con privilegios mínimos, valores predeterminados de solo lectura, alcance de inquilinos y recursos, tokens de corta duración, zonas de pruebas y servidores separados para diferentes niveles de privilegios."
  },
  {
    "kind": "subhead",
    "text": "12.4 Problemas de diputados confundidos"
  },
  {
    "kind": "paragraph",
    "text": "Un servidor puede convertirse en un sustituto confundido cuando tiene una autoridad que el usuario solicitante no tiene. Por ejemplo, una cuenta de servicio compartido puede acceder a todos los registros de clientes aunque el usuario deba ver solo un inquilino. El servidor debe preservar la identidad del usuario y hacer cumplir la autorización comercial en lugar de asumir que una conexión MCP válida implica permiso para todas las acciones posteriores."
  },
  {
    "kind": "subhead",
    "text": "12.5 Falsificación de solicitudes del lado del servidor"
  },
  {
    "kind": "paragraph",
    "text": "La autorización remota y el descubrimiento de metadatos pueden hacer que un cliente obtenga URL proporcionadas por otra parte. Sin una validación estricta, un atacante puede atacar direcciones de red internas, servicios de metadatos en la nube o puntos finales administrativos locales. La guía de seguridad oficial de MCP recomienda controles de red y manejo de solicitudes resistente a SSRF. [6]"
  },
  {
    "kind": "subhead",
    "text": "12.6 Revinculación de DNS y exposición local"
  },
  {
    "kind": "paragraph",
    "text": "La especificación Streamable HTTP requiere validación de origen para las conexiones entrantes y recomienda vincular servidores locales a localhost en lugar de a cada interfaz de red. Sin esas protecciones, un sitio web malicioso podría potencialmente interactuar con un servidor local mediante técnicas de vinculación de DNS. [4]"
  },
  {
    "kind": "subhead",
    "text": "12.7 Fuga de datos e influencia entre servidores"
  },
  {
    "kind": "paragraph",
    "text": "Un host conectado a varios servidores puede mover accidentalmente información de un recurso confiable a una llamada de herramienta que no es confiable. El modelo puede ser el puente. Los hosts deben clasificar datos, restringir qué herramientas pueden recibir contenido confidencial, redactar secretos y aplicar políticas antes de enviar argumentos a un servidor."
  },
  {
    "kind": "subhead",
    "text": "Una lista de verificación práctica para la defensa"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Confíe explícitamente en los servidores; no se conecte automáticamente a puntos finales arbitrarios.",
      "Utilice credenciales de corta duración y privilegios mínimos y valide la audiencia, el emisor, el alcance y el inquilino del token.",
      "Capacidades separadas de solo lectura y escritura; requieren confirmación para operaciones de alto impacto.",
      "Valide cada entrada según un esquema estricto y valide las reglas comerciales de forma independiente.",
      "Desinfecte rutas, URL, argumentos de shell, parámetros SQL y nombres de archivos.",
      "Ejecute servidores locales en una zona de pruebas o una cuenta de sistema operativo restringida.",
      "Valide el origen para los transportes HTTP y vincule los puntos finales locales solo al host local.",
      "Restrinja el acceso a la red saliente y protéjase contra SSRF y el acceso a servicios de metadatos.",
      "Registre la identidad de la herramienta, la identidad del usuario, los argumentos, las aprobaciones, los resultados, la latencia y los errores en un seguimiento de auditoría.",
      "Limite el tamaño de salida y maneje el contenido que no sea de confianza como datos, no como instrucciones privilegiadas.",
      "Pruebe con mensajes maliciosos, descripciones de herramientas envenenadas, esquemas con formato incorrecto, intentos de reproducción y escenarios entre inquilinos.",
      "Proporcione a los usuarios vistas previas claras, acciones reversibles y mensajes de error significativos."
    ]
  },
  {
    "kind": "subhead",
    "text": "PRINCIPIO DE SEGURIDAD"
  },
  {
    "kind": "paragraph",
    "text": "El modelo debe proponer; la política debería decidir; el servidor debe hacer cumplir; y el usuario debe comprender las acciones consecuentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13. Ejemplo práctico de Python: un pequeño servidor MCP",
    "id": "13-ejemplo-practico-de-python-un-pequeno-servidor-mcp"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente ejemplo muestra un servidor MCP local mínimo que expone una herramienta de búsqueda de políticas de solo lectura. Utiliza el asistente FastMCP del SDK de Python, que puede derivar esquemas de herramientas a partir de sugerencias y cadenas de documentos de tipo Python. El ejemplo es intencionalmente pequeño para que el límite del protocolo sea visible. [7]"
  },
  {
    "kind": "subhead",
    "text": "Paso 1: crear el proyecto"
  },
  {
    "kind": "paragraph",
    "text": "Terminal"
  },
  {
    "kind": "code",
    "text": "uv init policy-mcp-server\ncd policy-mcp-server\nuv add \"mcp[cli]\""
  },
  {
    "kind": "subhead",
    "text": "Paso 2: implementar el servidor"
  },
  {
    "kind": "paragraph",
    "text": "servidor_politica.py"
  },
  {
    "kind": "code",
    "text": "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP(\"company-policy\")\n\nPOLICIES = {\n    \"external-api\": (\n        \"External APIs require OAuth 2.0, TLS, rate limiting, \"\n        \"centralized logging, and an approved threat model.\"\n    ),\n    \"data-retention\": (\n        \"Production logs must follow the approved retention schedule \"\n        \"and must not store secrets or full authentication tokens.\"\n    ),\n    \"change-management\": (\n        \"High-risk production changes require peer review, a rollback \"\n        \"plan, and a recorded change ticket.\"\n    ),\n}\n\n@mcp.tool()\ndef search_policies(query: str) -> str:\n    \"\"\"Search approved company policies using a short text query.\n\n    Args:\n        query: Words describing the policy topic to find.\n    \"\"\"\n    terms = query.lower().split()\n    matches = []\n\n    for name, text in POLICIES.items():\n        searchable = f\"{name} {text}\".lower()\n        if all(term in searchable for term in terms):\n            matches.append(f\"{name}: {text}\")\n\n    if not matches:\n        return \"No approved policy matched the query.\"\n\n    return \"\\n\".join(matches)\n\ndef main() -> None:\n    mcp.run(transport=\"stdio\")\n\nif __name__ == \"__main__\":\n    main()"
  },
  {
    "kind": "subhead",
    "text": "Paso 3: conecte un host MCP"
  },
  {
    "kind": "paragraph",
    "text": "Se configura un host local compatible para iniciar el comando del servidor. El formato de configuración exacto depende del host, pero la información esencial es el ejecutable, el directorio de trabajo y los argumentos. Cuando el host inicia el proceso, el canal stdio transporta mensajes MCP JSON-RPC."
  },
  {
    "kind": "paragraph",
    "text": "Configuración local ilustrativa"
  },
  {
    "kind": "code",
    "text": "{\n  \"mcpServers\": {\n    \"company-policy\": {\n      \"command\": \"uv\",\n\n      \"args\": [\n        \"--directory\",\n        \"/absolute/path/to/policy-mcp-server\",\n        \"run\",\n        \"policy_server.py\"\n      ]\n    }\n  }\n}"
  },
  {
    "kind": "subhead",
    "text": "Paso 4: comprender el flujo de tiempo de ejecución"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "El host inicia Policy_server.py como un proceso local.",
      "El cliente y el servidor inicializan la sesión MCP y negocian capacidades.",
      "El cliente enumera herramientas y descubre políticas de búsqueda con su esquema de entrada generado.",
      "El usuario pregunta: \"¿Qué controles se aplican a una API externa?\"",
      "El modelo selecciona políticas de búsqueda y proporciona una consulta como \"API externa\".",
      "El host enruta la llamada al servidor, recibe el texto de la política y lo agrega al contexto del modelo.",
      "El modelo explica la política al usuario y puede citar el resultado obtenido en la conversación."
    ]
  },
  {
    "kind": "subhead",
    "text": "¿Qué hace que esta sea una integración MCP?"
  },
  {
    "kind": "paragraph",
    "text": "La función de búsqueda en sí es Python normal. MCP agrega el límite estandarizado de descubrimiento, esquema, ciclo de vida, transporte e invocación. El mismo servidor puede ser utilizado por otro host compatible sin tener que reescribir la función de búsqueda como un complemento específico del proveedor."
  },
  {
    "kind": "subhead",
    "text": "Cómo evolucionar el ejemplo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Reemplace el diccionario en memoria con un índice de documentos o un servicio de conocimiento aprobado.",
      "Exponer políticas como recursos con URI estables para lectura directa y citación.",
      "Agregue un mensaje invocado por el usuario como \"Crear una lista de verificación de cumplimiento de API externa\".",
      "Devuelve resultados estructurados con ID de política, versión, propietario, fecha de vigencia y URI de origen.",
      "Agregue autorización compatible con inquilinos para una implementación remota de HTTP Streamable.",
      "Utilice MCP Inspector para probar el descubrimiento, las entradas, los resultados, los errores y las notificaciones antes de conectar un host de producción."
    ]
  },
  {
    "kind": "paragraph",
    "text": "El inspector MCP oficial proporciona un entorno interactivo para conectarse a un servidor y examinar sus herramientas, recursos, indicaciones y notificaciones. Es una de las herramientas más útiles para validar un servidor antes de la integración. [8]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14. Casos de uso del mundo real",
    "id": "14-casos-de-uso-del-mundo-real"
  },
  {
    "kind": "subhead",
    "text": "Ingeniería de software"
  },
  {
    "kind": "paragraph",
    "text": "Un IDE o agente de codificación puede utilizar servidores MCP para leer el historial del repositorio, inspeccionar problemas, consultar documentación, comprender el estado de implementación o activar operaciones de compilación controladas. El beneficio es la continuidad contextual: el asistente puede razonar sobre los mismos sistemas que los desarrolladores ya utilizan."
  },
  {
    "kind": "subhead",
    "text": "Conocimiento empresarial"
  },
  {
    "kind": "paragraph",
    "text": "Las organizaciones pueden exponer políticas, decisiones de arquitectura, documentación de productos y conocimientos de soporte a través de recursos y herramientas de búsqueda. Un servidor centralizado puede imponer el control de acceso y devolver metadatos autorizados, reduciendo la tentación de copiar bases de conocimiento privadas enteras en mensajes."
  },
  {
    "kind": "subhead",
    "text": "Atención al cliente y operaciones"
  },
  {
    "kind": "paragraph",
    "text": "Un asistente de soporte puede recuperar el contexto de la cuenta, inspeccionar el estado del servicio, resumir tickets anteriores y redactar una resolución. Las operaciones de escritura (reembolsos, cambios de cuenta, escalamientos) se pueden representar como herramientas separadas con requisitos explícitos de aprobación y auditoría."
  },
  {
    "kind": "subhead",
    "text": "Datos y análisis"
  },
  {
    "kind": "paragraph",
    "text": "Un servidor de análisis puede exponer esquemas de bases de datos como recursos, herramientas de consulta con parámetros limitados y solicitudes de informes estándar. Esto puede hacer que el análisis de lenguaje natural sea más portátil, pero se debe evitar la conversión de texto a SQL sin restricciones en bases de datos de producción sensibles. Un servidor más seguro expone vistas seleccionadas, roles de solo lectura, límites de consultas y controles de tamaño de resultados."
  },
  {
    "kind": "subhead",
    "text": "Nube e infraestructura"
  },
  {
    "kind": "paragraph",
    "text": "Los servidores MCP de administración en la nube pueden ayudar a los usuarios a inspeccionar recursos, diagnosticar incidentes y realizar operaciones aprobadas. Debido a que el nivel de privilegio puede ser alto, los diseños de producción deben separar las herramientas de inventario de las herramientas de mutación, determinar las credenciales por suscripción o proyecto y requerir una confirmación sólida para los cambios."
  },
  {
    "kind": "subhead",
    "text": "Educación e investigación"
  },
  {
    "kind": "paragraph",
    "text": "Un asistente de aprendizaje puede conectarse a materiales del curso, simulaciones, conjuntos de datos y bibliotecas de citas. MCP puede hacer que las herramientas educativas sean reutilizables entre los asistentes, mientras que los metadatos de los recursos pueden ayudar a preservar la procedencia. El protocolo no reemplaza el juicio académico: el sistema aún debe distinguir las fuentes primarias, las interpretaciones y las explicaciones generadas."
  },
  {
    "kind": "subhead",
    "text": "Experiencias interactivas para agentes"
  },
  {
    "kind": "paragraph",
    "text": "El ecosistema MCP también se está expandiendo más allá de los resultados de herramientas de texto sin formato. MCP Apps, introducida como una extensión en 2026, permite que las herramientas devuelvan interfaces interactivas de espacio aislado que se pueden representar dentro de hosts compatibles. Esto apunta hacia agentes que combinan conversación con gráficos, formularios, visores de documentos y manipulación directa. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15. Principios de diseño para servidores MCP de producción",
    "id": "15-principios-de-diseno-para-servidores-mcp-de-produccion"
  },
  {
    "kind": "subhead",
    "text": "Diseño para la comprensión del modelo."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Utilice nombres claros que describan la intención y evite abreviaturas ambiguas.",
      "Escriba descripciones que indiquen el propósito, los efectos secundarios, las limitaciones y cuándo no utilizar la herramienta.",
      "Mantenga los esquemas pequeños, escritos y restringidos con enumeraciones, formatos, rangos y campos obligatorios.",
      "Devolver resultados estructurados y concisos; coloque contenido grande detrás de los recursos o la paginación.",
      "Utilice categorías de error coherentes para que el modelo pueda recuperarse o solicitar al usuario la información faltante."
    ]
  },
  {
    "kind": "subhead",
    "text": "Diseño para humanos"
  },
  {
    "kind": "paragraph",
    "text": "Los usuarios deben poder comprender qué hará una herramienta antes de aprobarla. Los nombres de las herramientas y las vistas previas de los argumentos deben ser legibles, no sólo técnicamente correctos. Para acciones destructivas o costosas, muestre el objetivo, el alcance, el efecto esperado y si la acción puede revertirse."
  },
  {
    "kind": "subhead",
    "text": "Diseño para operaciones"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publicar metadatos de versión e implementación.",
      "Utilice tiempos de espera, cancelación, reintentos con cuidado e idempotencia para mutaciones.",
      "Registre métricas estructuradas para llamadas de herramientas, latencia, fallas, aprobaciones y dependencias posteriores.",
      "Protéjase contra la inundación de resultados con límites de tamaño y paginación.",
      "Admite una degradación gradual cuando una API descendente no está disponible.",
      "Pruebe la compatibilidad con varios clientes porque la interfaz de usuario y el comportamiento de aprobación pueden diferir."
    ]
  },
  {
    "kind": "subhead",
    "text": "Diseño para la gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "Los programas empresariales MCP necesitan propiedad. Cada servidor debe tener un mantenedor, clasificación de datos, alcances aprobados, inventario de dependencias, revisión de seguridad, proceso de incidentes y plan de retiro. Un registro o puerta de enlace"
  },
  {
    "kind": "paragraph",
    "text": "puede facilitar el descubrimiento de servidores, pero también debería comunicar el nivel de confianza y el estado de la política en lugar de funcionar como un mercado no revisado."
  },
  {
    "kind": "table",
    "caption": "Un modelo de madurez",
    "headers": [
      "Nivel",
      "Características",
      "Objetivo principal"
    ],
    "rows": [
      [
        "1 - Experimental",
        "Servidor local, herramienta limitada de solo lectura, configuración manual, uso exclusivo para desarrolladores.",
        "Demostrar utilidad."
      ],
      [
        "2 - controlado",
        "Esquemas definidos, aprobaciones básicas, registros, pruebas, permisos restringidos.",
        "Reducir el riesgo obvio."
      ],
      [
        "3 - Gestionado",
        "Implementación central, integración de identidades, aplicación de políticas, monitoreo, propiedad documentada.",
        "Opere de manera confiable a escala de equipo."
      ],
      [
        "4 - Empresa",
        "Aislamiento de inquilinos, controles de puerta de enlace, pruebas de seguridad continuas, gobernanza de cambios, integración de auditorías.",
        "Escalar en toda la organización."
      ],
      [
        "5 - Ecosistema",
        "Servidores reutilizables entre proveedores y hosts, experiencias interactivas portátiles, confianza y compatibilidad mensurables.",
        "Lograr la interoperabilidad estratégica."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16. Limitaciones, compensaciones y conceptos erróneos comunes",
    "id": "16-limitaciones-compensaciones-y-conceptos-erroneos-comunes"
  },
  {
    "kind": "subhead",
    "text": "El transporte estandarizado no es un significado estandarizado."
  },
  {
    "kind": "paragraph",
    "text": "MCP puede estandarizar cómo se describe y llama una herramienta, pero no puede garantizar que todos los servidores describan conceptos comerciales equivalentes de la misma manera. Es posible que las organizaciones aún necesiten convenciones de nomenclatura, esquemas de dominio, catálogos semánticos y diseños de servidores seleccionados."
  },
  {
    "kind": "subhead",
    "text": "Más herramientas pueden reducir la confiabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Un modelo presentado con cientos de herramientas superpuestas puede elegir mal, consumir más contexto o requerir lógica de enrutamiento adicional. Los hosts pueden necesitar filtrado de herramientas, agrupación, selección de herramientas basada en recuperación o conjuntos de capacidades específicas de tareas."
  },
  {
    "kind": "subhead",
    "text": "La compatibilidad del protocolo no implica calidad."
  },
  {
    "kind": "paragraph",
    "text": "Un servidor puede ser un MCP válido y aun así ser lento, inseguro, mal documentado o semánticamente confuso. La evaluación de la producción debe incluir corrección, disponibilidad, autorización, manejo de datos, observabilidad, experiencia del usuario y resistencia a entradas adversas."
  },
  {
    "kind": "subhead",
    "text": "MCP no hace que un agente sea autónomo"
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas aumentan lo que un sistema puede hacer, pero la autonomía depende del ciclo de planificación, el comportamiento del modelo, la memoria, la política y el diseño de aprobación del host. Una interfaz de chat con una herramienta de búsqueda MCP está conectada, no necesariamente autónoma. Por el contrario, un marco de agente puede ser altamente autónomo sin MCP mediante el uso de integraciones propietarias."
  },
  {
    "kind": "subhead",
    "text": "Local no significa automáticamente seguro"
  },
  {
    "kind": "paragraph",
    "text": "Un servidor stdio local puede acceder a archivos confidenciales o ejecutar comandos con los permisos del usuario. Debido a que no atraviesa la Internet pública, los equipos pueden subestimar su riesgo. Los servidores locales aún deben revisarse, protegerse, delimitarse y monitorearse cuando manejan datos o acciones importantes."
  },
  {
    "kind": "subhead",
    "text": "El protocolo seguirá evolucionando"
  },
  {
    "kind": "paragraph",
    "text": "MCP utiliza versiones de protocolo anticuadas y negociación de capacidades porque las características y requisitos cambian. Los desarrolladores deben fijar las versiones del SDK probadas, monitorear los cambios en las especificaciones, preservar la compatibilidad con versiones anteriores cuando sea necesario y evitar asumir que las características preliminares son universalmente compatibles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17. El futuro del MCP y su impacto social más amplio",
    "id": "17-el-futuro-del-mcp-y-su-impacto-social-mas-amplio"
  },
  {
    "kind": "paragraph",
    "text": "MCP puede influir en algo más que la conveniencia del desarrollador. Una capa de conexión portátil puede reducir la dependencia del proveedor: las organizaciones pueden exponer una capacidad una vez y permitir que los usuarios accedan a ella a través de diferentes hosts de IA compatibles. Eso transfiere algo de poder del proveedor de la interfaz hacia el proveedor de capacidades y el usuario."
  },
  {
    "kind": "paragraph",
    "text": "El protocolo también puede reducir el costo de crear asistentes especializados. Una escuela, institución pública, pequeña empresa o comunidad de código abierto podría publicar un servidor cuidadosamente diseñado que funcione en múltiples aplicaciones de IA. Los estándares compartidos pueden hacer que las integraciones útiles dependan menos de asociaciones exclusivas."
  },
  {
    "kind": "paragraph",
    "text": "Sin embargo, una menor fricción de integración también reduce la fricción de otorgar a los sistemas de IA acceso a herramientas sensibles. La sociedad necesitará mejores normas de consentimiento, procedencia, auditabilidad, revocación, responsabilidad y control humano. La pregunta no es sólo si un agente puede conectarse a un sistema, sino quién autorizó la conexión, qué datos cruzaron el límite, qué acción ocurrió y quién puede explicarla o revertirla."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza neutral bajo la Agentic AI Foundation de la Fundación Linux puede ayudar a que MCP se desarrolle como una infraestructura compartida en lugar de una característica propiedad de un proveedor modelo. Su éxito a largo plazo dependerá de la interoperabilidad práctica, valores predeterminados seguros, estándares claros y la voluntad de los proveedores de hosts y servidores para implementar el protocolo fielmente. [10]"
  },
  {
    "kind": "paragraph",
    "text": "La aparición de las aplicaciones MCP sugiere otra dirección: las propias interfaces pueden convertirse en capacidades de agentes portátiles. En lugar de navegar por aplicaciones separadas, los usuarios pueden trabajar cada vez más a través de un host de IA confiable que presenta el componente interactivo correcto en el momento adecuado. Esto podría simplificar los flujos de trabajo, pero también aumenta la importancia del sandboxing, la procedencia y el consentimiento transparente del usuario. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18. Conclusión",
    "id": "18-conclusion"
  },
  {
    "kind": "paragraph",
    "text": "Model Context Protocol aborda uno de los problemas centrales de ingeniería de la IA conectada: cómo dar a los modelos acceso estructurado y reutilizable al contexto externo y a las acciones sin reconstruir cada integración para cada asistente. Su arquitectura host-cliente-servidor separa la aplicación de IA orientada al usuario de los sistemas que proporcionan herramientas, recursos y flujos de trabajo de prompts. JSON-RPC, negociación de capacidades, transportes locales y remotos y autorización opcional crean una base técnica común."
  },
  {
    "kind": "paragraph",
    "text": "La mayor fortaleza del protocolo es la interoperabilidad. Un servidor MCP bien diseñado puede poner una capacidad a disposición de múltiples hosts compatibles, lo que permite a los equipos invertir en una integración gobernada en lugar de en muchos adaptadores específicos del producto. Esto hace que MCP sea especialmente atractivo para el conocimiento empresarial, las herramientas de desarrollo, las operaciones de soporte, el análisis, la gestión de la nube y otros dominios donde la IA debe funcionar con sistemas activos."
  },
  {
    "kind": "paragraph",
    "text": "Su mayor riesgo también es la interoperabilidad: un conector estándar puede facilitar la conexión de potentes capacidades. Sin los mínimos privilegios, validación, aislamiento, aprobaciones, preservación de identidad y observabilidad, una capa de herramientas conveniente puede convertirse en una superficie de ataque. Por lo tanto, MCP debe tratarse como infraestructura, no como un atajo en torno a la arquitectura de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Mi evaluación es que es probable que MCP se convierta en una parte duradera de la pila de IA agente, no porque haga que los modelos sean más inteligentes, sino porque brinda a la industria una forma compartida de conectar la inteligencia a sistemas útiles. Las implementaciones ganadoras no serán los servidores con mayor número de herramientas. Serán ellos los que expongan las capacidades adecuadas, con una semántica clara, permisos defendibles, operaciones confiables y una experiencia de usuario que mantenga a los humanos en control significativo."
  },
  {
    "kind": "subhead",
    "text": "PENSAMIENTO FINAL"
  },
  {
    "kind": "paragraph",
    "text": "MCP cambia la pregunta \"¿Puede este modelo llamar a mi sistema?\" a un conjunto más importante de preguntas:"
  },
  {
    "kind": "paragraph",
    "text": "\"¿A través de qué norma, bajo qué autoridad, en qué contexto y con qué salvaguardias?\""
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario",
    "id": "glosario"
  },
  {
    "kind": "subhead",
    "text": "Agente de IA: una aplicación de IA que puede razonar, elegir acciones e interactuar con herramientas o entornos en varios pasos."
  },
  {
    "kind": "subhead",
    "text": "Negociación de capacidad: el proceso de inicialización mediante el cual el cliente y el servidor declaran qué características de protocolo opcionales admiten."
  },
  {
    "kind": "subhead",
    "text": "Obtención: Capacidad del cliente que permite a un servidor solicitar información adicional o confirmación del usuario a través del host."
  },
  {
    "kind": "subhead",
    "text": "Host: la aplicación de IA que gestiona la experiencia del usuario, el modelo, el contexto, las aprobaciones y las conexiones del cliente MCP."
  },
  {
    "kind": "subhead",
    "text": "JSON-RPC: un formato ligero de mensaje de llamada a procedimiento remoto utilizado como protocolo base de intercambio de datos de MCP."
  },
  {
    "kind": "subhead",
    "text": "Cliente MCP: el componente dentro de un host que mantiene una conexión dedicada a un servidor MCP."
  },
  {
    "kind": "subhead",
    "text": "Servidor MCP: programa o servicio que expone herramientas, recursos y mensajes a través de MCP."
  },
  {
    "kind": "subhead",
    "text": "Mensaje: una plantilla de flujo de trabajo reutilizable e invocada por el usuario proporcionada por un servidor."
  },
  {
    "kind": "subhead",
    "text": "Recurso: contexto o datos direccionables que un cliente puede enumerar o leer."
  },
  {
    "kind": "subhead",
    "text": "Muestreo: capacidad del cliente a través de la cual un servidor solicita al host que genere una finalización del modelo."
  },
  {
    "kind": "subhead",
    "text": "stdio: un transporte local que intercambia mensajes de protocolo a través de entrada y salida estándar."
  },
  {
    "kind": "subhead",
    "text": "HTTP transmisible: el transporte MCP remoto estándar que utiliza solicitudes HTTP y eventos enviados por el servidor opcionales."
  },
  {
    "kind": "subhead",
    "text": "Herramienta: una función ejecutable expuesta por un servidor para la recuperación o acción seleccionada por el modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias",
    "id": "referencias"
  },
  {
    "kind": "subhead",
    "text": "[1] Anthropic: Presentación del protocolo de contexto modelo. 25 de noviembre de 2024."
  },
  {
    "kind": "subhead",
    "text": "[2] Model Context Protocol: descripción general de la arquitectura. Arquitectura conceptual oficial y capas de protocolo."
  },
  {
    "kind": "subhead",
    "text": "[3] Especificación del protocolo de contexto modelo - 2025-11-25. Especificación de protocolo estable utilizada para este artículo."
  },
  {
    "kind": "subhead",
    "text": "[4] Especificación del Model Context Protocol: transportes. Requisitos stdio y HTTP Streamable."
  },
  {
    "kind": "subhead",
    "text": "[5] Especificación del Model Context Protocol: autorización. Requisitos de autorización para implementaciones basadas en HTTP."
  },
  {
    "kind": "subhead",
    "text": "[6] Protocolo de contexto modelo: mejores prácticas de seguridad. Escenarios de ataque oficiales y orientación de implementación."
  },
  {
    "kind": "subhead",
    "text": "[7] Protocolo de contexto modelo: creación de un servidor MCP. Tutorial oficial de SDK y ejemplo de FastMCP."
  },
  {
    "kind": "subhead",
    "text": "[8] Model Context Protocol: inspector MCP. Herramienta oficial de prueba y depuración de servidores."
  },
  {
    "kind": "subhead",
    "text": "[9] OpenAI: nuevas herramientas y funciones en la API de Responses. Anuncio de soporte remoto de MCP, 21 de mayo de 2025."
  },
  {
    "kind": "subhead",
    "text": "[10] Anthropic: donación de MCP y establecimiento de la Fundación Agentic AI. Anuncio de gobernanza abierta, 9 de diciembre de 2025."
  },
  {
    "kind": "subhead",
    "text": "[11] Blog de protocolo de contexto modelo: aplicaciones MCP. Anuncio de extensión de interfaz de usuario interactiva, 26 de enero de 2026."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Notas de búsqueda y publicación",
    "id": "notas-de-busqueda-y-publicacion"
  },
  {
    "kind": "paragraph",
    "text": "Metatítulo recomendado: ¿Qué es el protocolo de contexto modelo (MCP)? Guía completa de servidores, arquitectura y seguridad"
  },
  {
    "kind": "paragraph",
    "text": "Meta descripción recomendada: aprenda qué es el Protocolo de contexto modelo (MCP), cómo funcionan los servidores y clientes MCP, su arquitectura, herramientas, recursos, indicaciones, riesgos de seguridad y cómo construir un servidor MCP simple en Python."
  },
  {
    "kind": "paragraph",
    "text": "Palabra clave principal: Protocolo de contexto modelo (MCP)"
  },
  {
    "kind": "paragraph",
    "text": "Palabras clave de soporte: qué es MCP, servidor MCP, cliente MCP, arquitectura MCP, herramientas MCP, recursos MCP, avisos MCP, agentes de IA, integración LLM, seguridad MCP, creación de un servidor MCP, servidor MCP Python, integración de herramientas de IA."
  },
  {
    "kind": "subhead",
    "text": "THE BIG LEARN"
  },
  {
    "kind": "paragraph",
    "text": "Aprendizaje técnico profundo para un mundo conectado"
  }
];
