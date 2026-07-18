import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const RMM_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Evolución de la interfaz según el modelo de madurez de Richardson"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/overview.svg",
    "alt": "Evolución de la interfaz a través de los cuatro niveles del Modelo de Madurez de Richardson",
    "caption": "Descripción general: el punto final único, las capacidades, la semántica HTTP y los hipermedios forman una progresión acumulativa de capacidades observables."
  },
  {
    "kind": "paragraph",
    "text": "Cada nivel agrega una habilidad de dibujo; el modelo no certifica la total conformidad con REST."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "El modelo de madurez de Richardson, comúnmente abreviado como RMM, organiza las interfaces de servicio en cuatro niveles: un punto de entrada orientado a mensajes, recursos identificables, uso semántico de HTTP y controles de hipermedia. El modelo fue propuesto por Leonard Richardson y popularizado por Martin Fowler como una forma didáctica de descomponer algunos elementos centrales de un enfoque REST. Su valor radica en permitir a los equipos observar capacidades concretas de la interfaz sin depender únicamente de la etiqueta \"RESTful\"."
  },
  {
    "kind": "paragraph",
    "text": "El modelo, sin embargo, no es un estándar de certificación y no reemplaza las restricciones arquitectónicas descritas por Roy Fielding. Una API puede alcanzar el nivel 2 mediante el uso consistente de recursos, métodos y código HTTP y aun así mantener una sesión conversacional en el servidor, evitar el almacenamiento en caché, exponer detalles de implementación o crear un fuerte acoplamiento temporal. Asimismo, una interfaz puede adoptar enlaces sin que sus clientes naveguen realmente por las transiciones ofrecidas. Por tanto, nivel y calidad no son sinónimos automáticos."
  },
  {
    "kind": "paragraph",
    "text": "En este capítulo, cada nivel se analizará en profundidad, con ejemplos de API corporativas y bancarias ficticias. Se estudiarán los efectos sobre contratos, consumidores, API Gateways, retries, idempotencia, almacenamiento en caché, autorización, observabilidad y evolución. El objetivo no es defender que toda API debe alcanzar el nivel 3, sino proporcionar criterios para elegir conscientemente hasta dónde avanzar y qué propiedades obtener."
  },
  {
    "kind": "paragraph",
    "text": "El análisis también mostrará que la migración entre niveles no es sólo un intercambio de URL. Requiere identificar recursos, separar comandos de representaciones, asignar semántica correcta a métodos y respuestas, definir relaciones hipermedia, planificar la compatibilidad y ajustar las políticas de gateway. En entornos con muchos consumidores, la secuencia de evolución debe ser mensurable y reversible."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo Utilice la misma operación comercial al pasar por todos los niveles. Compare la forma de direccionamiento, la intención expresada por el método, los códigos devueltos, la posibilidad de almacenamiento en caché, las reglas de reintento y el conocimiento requerido por parte del cliente. La comparación revela mejor lo que añade cada nivel."
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
      "Explicar el origen, propósito y límites del Modelo de Madurez de Richardson.",
      "Diferenciar los niveles 0, 1, 2 y 3 por propiedades observables de la interfaz.",
      "Reconocer patrones RPC y mensajes imperativos concentrados en un punto final.",
      "Modele recursos estables sin confundir recursos, tablas, DTO y operaciones.",
      "Aplique métodos, códigos, encabezados, caché y condiciones previas HTTP en el nivel 2.",
      "Diseñar enlaces hipermedia y acciones que representen transiciones permitidas.",
      "Compare RMM con restricciones arquitectónicas REST y con OpenAPI.",
      "Evalúe las API existentes sin convertir el análisis en una puntuación superficial.",
      "Planifique la migración incremental, la gobernanza y la troubleshooting en API Gateways."
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
      "11.1 Origen y finalidad del modelo",
      "11.2 Qué mide RMM y qué no mide",
      "11.3 Descripción general de los cuatro niveles",
      "11.4 Nivel 0: El pantano de POX",
      "11.5 Estándares y riesgos operativos de nivel 0",
      "11.6 Transición del nivel 0 al nivel 1",
      "11.7 Nivel 1: Recursos",
      "11.8 Identidad, granularidad y ciclo de vida",
      "11.9 Limitaciones de nivel 1",
      "11.10 Transición al nivel 2",
      "11.11 Nivel 2: métodos HTTP y semántica",
      "11.12 Estado, encabezados, caché y condiciones previas",
      "11.13 Idempotencia, retries y errores",
      "11.14 Nivel 2 en API Gateways",
      "11.15 Nivel 3: Controles de hipermedia",
      "11.16 Relaciones, vínculos y acciones",
      "11.17 Tipos de contratos de medios e hipermedia",
      "11.18 Clientes orientados por transiciones",
      "11.19 Beneficios, costos y dificultades del nivel 3",
      "11,20 RMM frente al REST de Fielding",
      "11.21 RMM, OpenAPI y gobernanza",
      "11.22 Matriz de evaluación",
      "11.23 Estrategia de migración",
      "11.24 Observabilidad y troubleshooting",
      "11.25 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.1 Origen y finalidad del modelo",
    "id": "11-1-origen-y-finalidad-del-modelo"
  },
  {
    "kind": "paragraph",
    "text": "Leonard Richardson formuló el modelo como una forma de clasificar los estilos de servicios web mediante la adopción progresiva de funciones web. Martin Fowler lo popularizó en 2010 con la imagen de una escalera: en el nivel 0 hay un único punto de entrada orientado a mensajes; en el nivel 1 aparecen recursos; en el nivel 2 la interfaz utiliza métodos y respuestas HTTP; en el nivel 3 las representaciones ofrecen controles hipermedia. La simplicidad de esta descomposición ha hecho que RMM sea útil en capacitación, revisiones de arquitectura y debates sobre modernización."
  },
  {
    "kind": "paragraph",
    "text": "La palabra madurez puede dar lugar a una mala interpretación. Un nivel más alto no significa necesariamente que el producto, equipo o dominio sea \"más maduro\" en todos los aspectos. El modelo describe una dimensión específica de la interfaz. La seguridad, la disponibilidad, la gobernanza, la documentación, el rendimiento, la privacidad, la coherencia y la experiencia del desarrollador necesitan sus propias evaluaciones. Una API de nivel 2 puede ser muy confiable y apropiada para el contexto; una API de nivel 3 puede ser insegura o estar mal operada."
  },
  {
    "kind": "paragraph",
    "text": "El modelo funciona mejor como lenguaje de diagnóstico. En lugar de simplemente preguntar “¿esta API es REST?”, el equipo puede preguntar: ¿hay recursos identificables? ¿Los métodos expresan intención? ¿La respuesta utiliza estados y encabezados coherentes? ¿El consumidor descubre transiciones a través de los hipermedia? Estas preguntas producen evidencia y decisiones en evolución."
  },
  {
    "kind": "subhead",
    "text": "Uso responsable del término madurez Utilice el nivel para describir las capacidades de la interfaz, no para clasificar personas o determinar la calidad total. Registre por separado atributos como seguridad, compatibilidad, SLO, documentación, gobernanza y costo operativo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.2 Qué mide RMM y qué no mide",
    "id": "11-2-que-mide-rmm-y-que-no-mide"
  },
  {
    "kind": "paragraph",
    "text": "RMM observa principalmente tres movimientos: descomponer una operación genérica en recursos identificables, aprovechar la semántica estandarizada de HTTP y hacer que las transiciones sean visibles en la representación misma. Estos movimientos reducen parte del acoplamiento entre el consumidor y el servidor porque transfieren conocimiento a elementos web compartidos: URI, métodos, códigos, encabezados, enlaces y relaciones."
  },
  {
    "kind": "paragraph",
    "text": "El modelo no verifica todas las restricciones REST. Cliente-servidor, stateless, caché, sistema en capas y código bajo demanda no aparecen como pasos independientes. El nivel 2 aborda el almacenamiento en caché y la interfaz uniforme, y el nivel 3 aborda el hipermedia como un controlador del estado de la aplicación, pero la evaluación completa de REST requiere un análisis arquitectónico más amplio. Por lo tanto, Fowler describe el nivel 3 como un paso hacia la “gloria del REST”, no como una prueba automática de cumplimiento."
  },
  {
    "kind": "paragraph",
    "text": "Tampoco existe una prueba universal para decidir el nivel cuando la API mezcla estilos. Una plataforma puede tener puntos finales de consulta en el nivel 2, comandos heredados en el nivel 0 y un flujo específico con hipermedia. En estos casos, clasificar toda la API por un único número oculta información. El análisis deberá realizarse por superficie, recurso o recorrido de negocio, registrando excepciones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.3 Descripción general de los cuatro niveles",
    "id": "11-3-descripcion-general-de-los-cuatro-niveles"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-01.svg",
    "alt": "Los cuatro niveles acumulativos del modelo de madurez de Richardson",
    "caption": "Figura 1: RMM organiza las capacidades de la interfaz en cuatro niveles acumulativos, pero no mide todos los atributos de una plataforma API."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Capacidades, dependencias y riesgos asociados a cada nivel.",
    "headers": [
      "Nivel",
      "Elemento agregado",
      "Conocimiento básico del cliente",
      "Riesgo característico"
    ],
    "rows": [
      [
        "0",
        "Mensajes sobre un punto final",
        "Operaciones y formato propietario",
        "Dispatcher central, poca semántica compartida"
      ],
      [
        "1",
        "Recursos e identificadores",
        "Qué recursos existen y cómo abordarlos",
        "Recursos tratados únicamente como sobres de comando"
      ],
      [
        "2",
        "Métodos HTTP, estado y encabezados",
        "Semántica de protocolo y contrato de recursos.",
        "Uso decorativo de verbos o códigos inconsistentes."
      ],
      [
        "3",
        "Controles de hipermedia",
        "Relaciones y tipos de medios.",
        "Enlaces sin semántica ni clientes que siguen codificando el flujo"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.4 Nivel 0: El pantano de POX",
    "id": "11-4-nivel-0-el-pantano-de-pox"
  },
  {
    "kind": "paragraph",
    "text": "En el nivel 0, el servicio normalmente publica un único punto final y utiliza el cuerpo del mensaje para indicar qué operación se debe realizar. POX significa \"Plain Old XML\", una expresión histórica para mensajes XML sin aprovechar recursos web más ricos; En la práctica actual, la misma estructura puede aparecer con JSON, Protobuf u otro formato. El aspecto decisivo no es el formato, sino la concentración de intenciones en una interfaz genérica."
  },
  {
    "kind": "paragraph",
    "text": "Un servicio de pagos siempre podría recibir pagos POST/servicio y distinguir operaciones por un campo como operación. Verificar saldo, crear transferencia, cancelar cita y emitir estado de cuenta comparten la misma dirección y método. El servidor actúa como dispatcher: interpreta el comando y lo reenvía a la rutina correspondiente. Muchos servicios SOAP, RPC sobre HTTP e integraciones heredadas se acercan a este nivel."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-02.svg",
    "alt": "Múltiples intenciones que convergen en un punto final y un dispatcher en el nivel 0",
    "caption": "Figura 2 - En el nivel 0, el protocolo transporta un mensaje propietario y el cuerpo concentra la intención de la operación."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de un mensaje en el nivel 0"
  },
  {
    "kind": "code",
    "text": "POST /servicio-pagos HTTP/1.1\nContent-Type: application/json\n{\n  \"operation\": \"CREAR_TRANSFERENCIA\",\n  \"cuentaOrigen\": \"991\",\n  \"cuentaDestino\": \"552\",\n  \"importe\": 120.00\n}"
  },
  {
    "kind": "paragraph",
    "text": "El nivel 0 no es sinónimo de mala implementación. En escenarios cerrados, colas de comandos, protocolos binarios, operaciones altamente especializadas o compatibilidad con sistemas heredados, RPC puede ser una decisión válida. El problema surge cuando la organización espera propiedades de la Web -almacenamiento en caché, semántica uniforme, visibilidad a través de intermediarios y evolución desacoplada-sin exponer elementos que permitan obtenerlas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.5 Estándares y riesgos operativos de nivel 0",
    "id": "11-5-estandares-y-riesgos-operativos-de-nivel-0"
  },
  {
    "kind": "paragraph",
    "text": "La principal consecuencia es que los componentes intermedios ven poca diferencia entre las operaciones. Una API Gateway observa múltiples POST para la misma ruta y la distinción real está oculta en el cuerpo. Las reglas de autorización, cuotas, almacenamiento en caché, métricas y enrutamiento deben inspeccionar el contenido o confiar en campos propietarios. Esto aumenta los costos de las políticas, reduce el rendimiento y dificulta la correlación con herramientas que agregan métricas por método y ruta."
  },
  {
    "kind": "paragraph",
    "text": "Los retries también se vuelven riesgosos. El método POST no indica si una operación es repetible y el mismo punto final puede contener consultas, comandos idempotentes y comandos no idempotentes. Un tiempo de espera deja al cliente sin saber si el servidor realizó la acción. La solución a menudo requiere identificadores de correlación, claves de idempotencia o estado de procesamiento, pero estos mecanismos deben definirse fuera de la semántica básica del protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Los errores suelen devolver 200 con un sobre que contiene Success=false o códigos internos. Esta práctica evita que los balanceadores de carga, las puertas de enlace, los SDK y la observabilidad utilicen la clase de estado HTTP como señal. También crea ambigüedad entre fallas en el transporte, rechazo del gateway y errores comerciales. El consumidor necesita interpretar el cuerpo antes de clasificar cualquier resultado."
  },
  {
    "kind": "subhead",
    "text": "Señal de nivel 0 Si la documentación comienza con una lista de operaciones aceptadas en un campo acción, comando, operación o nombre de servicio y casi todo usa POST en la misma ruta, la interfaz probablemente esté en el nivel 0, incluso cuando los mensajes son JSON y el producto se llama API REST."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Efectos típicos de una interfaz concentrada en el nivel 0.",
    "headers": [
      "Síntoma",
      "Impacto en la puerta de entrada",
      "Impacto en el consumidor"
    ],
    "rows": [
      [
        "Un URI para todo",
        "Las políticas dependen de la inspección corporal.",
        "El SDK necesita conocer los códigos internos y del dispatcher"
      ],
      [
        "200 por acierto y error",
        "Las métricas de estado se vuelven engañosas",
        "El manejo de errores depende del sobre."
      ],
      [
        "POST para leer y escribir",
        "El caché y la seguridad no pueden inferir la intención",
        "El reintento requiere una regla específica por operación"
      ],
      [
        "Contrato básico extenso",
        "Los cambios afectan a una gran superficie.",
        "El control de versiones y las pruebas se vuelven monolíticos"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.6 Transición del nivel 0 al nivel 1",
    "id": "11-6-transicion-del-nivel-0-al-nivel-1"
  },
  {
    "kind": "paragraph",
    "text": "La primera transición consiste en hacer explícitas las entidades o conceptos que tienen identidad y ciclo de vida. En lugar de enviar todos los mensajes a /servicio, la interfaz ahora aborda clientes, cuentas, transferencias, citas y extractos. Este cambio requiere comprender el ámbito: una transferencia no es sólo una función; se puede crear, validar, confirmar, rechazar, cancelar y consultar a lo largo del tiempo."
  },
  {
    "kind": "paragraph",
    "text": "La migración debe comenzar con el inventario. Cada operación del dispatcher se clasifica como consulta, creación, cambio, comando, proceso o integración. A continuación, el equipo identifica qué objetos necesitan una dirección estable, cuáles están subordinados a otros y cuáles representan procesos. El objetivo no es convertir cada tabla en un punto final, sino encontrar unidades de significado a las que los consumidores puedan hacer referencia."
  },
  {
    "kind": "paragraph",
    "text": "La compatibilidad se puede preservar con una capa de adaptación. El punto final heredado continúa aceptando mensajes y llama internamente a los nuevos servicios orientados a recursos. Los nuevos consumidores adoptan la nueva superficie, mientras que las métricas miden la reducción del uso del antiguo contrato. Esta estrategia evita una migración “big bang” y le permite validar el modelado antes de eliminar el dispatcher."
  },
  {
    "kind": "subhead",
    "text": "Pregunta de modelado ¿Qué es necesario identificar, consultar o referenciar una vez completada la operación? La respuesta suele revelar un recurso. Una solicitud de transferencia, por ejemplo, sigue existiendo como entidad auditable incluso después de la respuesta inicial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.7 Nivel 1: Recursos",
    "id": "11-7-nivel-1-recursos"
  },
  {
    "kind": "paragraph",
    "text": "En el nivel 1, la interfaz publica múltiples recursos con sus propios identificadores. El consumidor ya no conoce sólo una gateway genérica y comienza a interactuar con direcciones que representan partes del dominio. El URI sirve como identificador, no como una descripción completa de la implementación. /transferencias/abc puede seguir siendo válido incluso si el servicio cambia de banco, idioma o topología."
  },
  {
    "kind": "paragraph",
    "text": "El modelo no requiere el nivel 1 para utilizar correctamente todos los métodos HTTP. La API puede seguir enviando POST a /clientes/483/consultar, /transferencias/abc/cancelar o /cuentas/991/extracto. Ha habido avances en la identificación, pero la intención todavía está parcialmente codificada en los verbos de ruta o en el cuerpo. Esta característica explica por qué los recursos son necesarios pero insuficientes para una interfaz HTTP semánticamente rica."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-03.svg",
    "alt": "Rasgos distintivos con identidad y alcance visibles en el nivel 1.",
    "caption": "Figura 3: Las capacidades distintivas hacen visibles la identidad y el alcance, aunque las operaciones aún pueden seguir siendo imperativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.8 Identidad, granularidad y ciclo de vida",
    "id": "11-8-identidad-granularidad-y-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "Un recurso es una abstracción identificable, no necesariamente una línea bancaria. Puede representar una entidad duradera, una colección, una proyección, un documento, un proceso o el resultado de un cálculo. /limits-operacional/cliente-483 puede ser una vista calculada; /solicitudes-transferencia/abc puede representar un proceso; /extractos/cuenta-991/2026-07 puede representar un documento elaborado por un período."
  },
  {
    "kind": "paragraph",
    "text": "La granularidad debe reflejar patrones de cohesión y acceso. Recursos excesivamente grandes obligan a los consumidores a transferir y actualizar datos irrelevantes. Los recursos muy fragmentados aumentan los viajes de ida y vuelta y la complejidad de la composición. En los sistemas corporativos, los límites también deben considerar la autorización, la propiedad, la coherencia transaccional y la capacidad de evolución independiente."
  },
  {
    "kind": "paragraph",
    "text": "Los identificadores públicos no deberían exponer las claves internas innecesariamente. Un número secuencial puede facilitar la enumeración y revelar el volumen; una clave de tabla puede cambiar durante las migraciones. La API puede utilizar identificadores opacos, alias comerciales o URI estables. Lo importante es definir la unicidad, alcance, permanencia y comportamiento cuando el recurso es eliminado o reemplazado."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Preguntas para modelar recursos en el nivel 1.",
    "headers": [
      "decisión",
      "pregunta técnica",
      "Ejemplo"
    ],
    "rows": [
      [
        "Identidad",
        "¿Es necesario hacer referencia al recurso más adelante?",
        "/transferencias/{id}"
      ],
      [
        "Alcance",
        "¿La identidad es global o subordinada?",
        "/cuentas/{cuenta}/programaciones/{id}"
      ],
      [
        "Granularidad",
        "¿Qué datos cambian y se autorizan juntos?",
        "preferencias de registro separadas"
      ],
      [
        "ciclo de vida",
        "¿Qué estados y transiciones hay?",
        "PENDIENTE -> CONFIRMADO -> RESUELTO"
      ],
      [
        "Permanencia",
        "¿Sobrevive el identificador a las migraciones internas?",
        "identificación pública opaca"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.9 Limitaciones de nivel 1",
    "id": "11-9-limitaciones-de-nivel-1"
  },
  {
    "kind": "paragraph",
    "text": "La separación de recursos mejora la observabilidad y la organización, pero no resuelve por sí sola la semántica de las operaciones. Puntos finales como POST /transferencias/abc/consultar y POST /transferencias/abc/eliminar aún ocultan propiedades conocidas por HTTP. El gateway no puede inferir que la consulta es segura o que la eliminación debería producir una determinada clase de respuesta. El cliente depende de convenciones específicas de cada API."
  },
  {
    "kind": "paragraph",
    "text": "Otro riesgo es crear “recursos falsos” sólo para dar cabida a los verbos. Rutas como /crearTransferencia, /ejecutarPago u /obtenerClientes utilizan múltiples direcciones, pero continúan modelando funciones. Esta interfaz puede ser clara y funcional, pero el progreso hacia una interfaz uniforme es limitado. El análisis debe centrarse en el significado del identificador, no sólo en contar las URL."
  },
  {
    "kind": "paragraph",
    "text": "En el nivel 1, las colecciones y relaciones también pueden ser inconsistentes. Un equipo puede utilizar /cliente/483/cuenta y otro /consultarContasPorCliente?id=483. Sin estándares de denominación, cardinalidad, paginación y errores, la expansión de recursos aumenta la superficie sin generar previsibilidad. La gobernanza sigue siendo necesaria."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.10 Transición al nivel 2",
    "id": "11-10-transicion-al-nivel-2"
  },
  {
    "kind": "paragraph",
    "text": "La segunda transición consiste en asignar intenciones a la semántica HTTP. Las consultas utilizan GET o HEAD; la creación suele utilizar POST en la colección; la sustitución idempotente puede usar PUT; la eliminación utiliza DELETE; Las actualizaciones parciales pueden usar PATCH cuando se definen su formato y semántica. El método deja de ser sólo un campo de transporte y pasa a comunicar propiedades a clientes e intermediarios."
  },
  {
    "kind": "paragraph",
    "text": "Esta migración también requiere revisar las respuestas. La creación puede devolver 201 Created con Location; el procesamiento asincrónico puede utilizar 202 Accepted; la condición previa insatisfecha puede producir 412; el conflicto estatal puede producir 409; la validación puede utilizar Problem Details. Encabezados como ETag, Cache-Control, Allow, Retry-After y Vary pasan a formar parte del contrato."
  },
  {
    "kind": "paragraph",
    "text": "No basta con reemplazar POST con verbos diferentes. El comportamiento debe respetar la seguridad, la idempotencia y la semántica. Un GET que cancela una programación sigue siendo peligroso, incluso si la ruta parece orientada a recursos. Un PUT que crea efectos adicionales en cada repetición no es idempotente. El nivel 2 se basa en el comportamiento observable, no en la decoración sintáctica."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de lectura con semántica HTTP"
  },
  {
    "kind": "code",
    "text": "GET /transferencias/abc HTTP/1.1\nAccept: application/json\nHTTP/1.1 200 OK\nContent-Type: application/json\nETag: \"v7\"\n{ \"id\": \"abc\", \"status\": \"PENDIENTE\", \"importe\": 120.00 }"
  },
  {
    "kind": "subhead",
    "text": "Criterios de transición Para cada operación, registre: recurso de destino, método, propiedad de seguridad, idempotencia, respuesta exitosa, errores, encabezados, capacidad de caché y política de reintento. La tabla destaca dónde cambiar el verbo requiere un cambio real de comportamiento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.11 Nivel 2: métodos HTTP y semántica",
    "id": "11-11-nivel-2-metodos-http-y-semantica"
  },
  {
    "kind": "paragraph",
    "text": "En el nivel 2, la interfaz utiliza el vocabulario HTTP para expresar intenciones. La semántica se comparte entre navegadores, bibliotecas, servidores proxy, puertas de enlace y herramientas de observabilidad. GET es seguro y no debería solicitar un cambio de estado; PUT y DELETE son idempotentes; POST es flexible y normalmente no idempotente; HEAD tiene la misma semántica que GET sin contenido de respuesta. PATCH depende del tipo de documento de parche utilizado."
  },
  {
    "kind": "paragraph",
    "text": "El beneficio no es sólo estético. Una gateway puede aplicar diferentes reglas de lectura y escritura, las cachés pueden reutilizar respuestas, los SDK pueden clasificar los resultados por estado, los clientes pueden implementar retries de operaciones idempotentes de forma más segura y los equipos de SRE pueden agrupar métricas por método y ruta. La interfaz se vuelve más visible para los componentes que no conocen el dominio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-04.svg",
    "alt": "Métodos HTTP y respuestas que llevan semántica compartida en el nivel 2",
    "caption": "Figura 4: Los métodos y respuestas estandarizados permiten que los componentes genéricos comprendan las propiedades de interacción."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.12 Estado, encabezados, caché y condiciones previas",
    "id": "11-12-estado-encabezados-cache-y-condiciones-previas"
  },
  {
    "kind": "paragraph",
    "text": "Los códigos de estado clasifican el resultado de intentar procesar la solicitud. No reemplazan los detalles del dominio, pero proporcionan una primera capa interoperable. 2xx indica procesamiento exitoso; 3xx aconseja redirección o reutilización; 4xx indica que la solicitud no puede atenderse en las condiciones presentadas; 5xx apunta a una falla del servidor o intermediario. La elección debe reflejar quién produjo la respuesta y el estado observado."
  },
  {
    "kind": "paragraph",
    "text": "Los encabezados amplían la semántica. Location identifica el recurso creado o la ubicación relevante; ETag representa una versión de la representación; If-Match y If-None-Match expresan condiciones previas; Cache-Control controla la reutilización; Retry-After orienta el reintento; Allow informa los métodos compatibles; Vary describe qué campos de la solicitud influyen en la respuesta. Ignorar estos elementos reduce el nivel 2 a una tabla de verbos."
  },
  {
    "kind": "paragraph",
    "text": "Las condiciones previas son especialmente importantes en las API empresariales. Dos consumidores pueden leer la versión v7 de un recurso e intentar actualizarlo. Sin control, la última escritura sobrescribe la anterior. Con ETag e If-Match, el servidor realiza el cambio sólo si la versión aún coincide. Si el estado ha cambiado, devuelve 412 Precondition Failed, lo que permite al cliente recargar y reconciliar."
  },
  {
    "kind": "subhead",
    "text": "Actualización protegida con condiciones previas"
  },
  {
    "kind": "code",
    "text": "PUT /preferencias/cliente-483 HTTP/1.1\nContent-Type: application/json\nIf-Match: \"v7\"\n{ \"idioma\": \"pt-BR\", \"notificaciones\": true }\nHTTP/1.1 412 Precondition Failed\nContent-Type: application/problem+json"
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Elementos del protocolo que hacen que la interfaz sea más operable.",
    "headers": [
      "Elemento HTTP",
      "Usar en el nivel 2",
      "Fallo común"
    ],
    "rows": [
      [
        "201 + Location",
        "Confirmar creación e informar identificador.",
        "Devuelve 200 sin referencia a un nuevo recurso."
      ],
      [
        "202 + monitor",
        "Proceso de aceptación aún no completado",
        "Tratar la aceptación como el éxito final"
      ],
      [
        "ETag/Si coincide",
        "Previene la pérdida de actualizaciones",
        "Generar ETag sin validar condiciones previas"
      ],
      [
        "Control de caché",
        "Define reutilización y revalidación.",
        "Respuesta sensible al caché sin política explícita"
      ],
      [
        "Retry-After",
        "Guía nuevo intento",
        "Responder 429/503 sin ventana ni estrategia"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.13 Idempotencia, retries y errores",
    "id": "11-13-idempotencia-retries-y-errores"
  },
  {
    "kind": "paragraph",
    "text": "Idempotencia significa que repetir la misma solicitud produce el mismo efecto deseado en el servidor, aunque la representación de la respuesta puede variar. PUT y DELETE se definen como idempotentes; POST no recibe esta garantía por defecto. En sistemas distribuidos, el tiempo de espera no prueba que la operación haya fallado. El cliente puede perder la respuesta después de que el servidor complete el comando, creando un riesgo de duplicación."
  },
  {
    "kind": "paragraph",
    "text": "Para operaciones no idempotentes, una clave de idempotencia puede asociar intentos equivalentes con un único resultado. El servidor necesita definir el alcance, la caducidad, la comparación de la carga útil, la persistencia y el comportamiento concurrente. El gateway puede requerir el formato de encabezado y límite, pero la deduplicación empresarial generalmente pertenece al servicio que conoce la operación y su transacción."
  },
  {
    "kind": "paragraph",
    "text": "Los errores deben combinar el estado HTTP y una representación estable. Problem Details, actualmente definido por RFC 9457, proporciona campos como tipo, título, estado, detalle e instancia, así como extensiones. El estado clasifica el resultado; el tipo identifica una categoría de problema; Las extensiones llevan datos estructurados. Los mensajes internos, los seguimientos de la pila y los datos confidenciales no deben exponerse."
  },
  {
    "kind": "subhead",
    "text": "Error estructurado en el nivel 2"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.ejemplo/problemas/estado-invalido\",\n  \"title\": \"Transición no permitida\",\n  \"status\": 409,\n  \"detail\": \"La transferencia ya fue liquidada.\",\n  \"instance\": \"/transferencias/abc\"\n}"
  },
  {
    "kind": "subhead",
    "text": "El reintento no es solo la configuración del cliente. La estrategia depende del método, la idempotencia, la fase de falla y la capacidad de deduplicación. Repetir automáticamente un POST financiero después del tiempo de espera sin una clave de idempotencia puede duplicar los efectos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.14 Nivel 2 en API Gateways",
    "id": "11-14-nivel-2-en-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways se benefician directamente de la semántica de nivel 2. Las políticas pueden separar la lectura y la escritura por método, aplicar cuotas por operación, bloquear métodos no publicados, validar el tipo de contenido y aceptar, propagar ID de correlación, producir 405 cuando el método no está permitido y normalizar errores de infraestructura. Las métricas por plantilla de ruta y estado se vuelven más representativas."
  },
  {
    "kind": "paragraph",
    "text": "El gateway, sin embargo, no transforma una API al nivel 2 simplemente reescribiendo rutas o métodos. Si recibe GET e internamente llama a un comando que cambia de estado, se ha violado la propiedad de seguridad. Si convierte cada error de backend en 200, destruye la semántica. Si agrega ETag sin asegurarse de que la versión represente el estado, crea una condición previa falsa. La responsabilidad debe ser compartida con el servicio."
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas de múltiples saltos, debe registrar dónde se creó cada respuesta. Un 429 puede provenir del gateway de cuota, un 503 del balanceador, un 409 del dominio y un 401 del proveedor de identidad. La estandarización ayuda al consumidor, pero los registros y los encabezados de correlación deben preservar la fuente para la troubleshooting."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-05.svg",
    "alt": "API Gateway aplica políticas sin anular la semántica del dominio",
    "caption": "Figura 5 - El gateway refuerza la interfaz y aplica políticas transversales; la semántica del dominio todavía pertenece a la API."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Uso del nivel 2 en políticas de gateway.",
    "headers": [
      "politica",
      "Responsabilidad adecuada",
      "Antipatrón"
    ],
    "rows": [
      [
        "Autenticación",
        "Validar credencial y contexto",
        "Inventar autorización ligera sin datos de dominio"
      ],
      [
        "Enrutamiento",
        "Asignar contrato a upstream",
        "Enmascarar rutas incompatibles sin observabilidad"
      ],
      [
        "Limitación de velocidad",
        "Proteger la capacidad y los planes",
        "Utilice el mismo límite para lecturas ligeras y comandos costosos"
      ],
      [
        "Validación",
        "Rechazar forma de contrato no válida",
        "Acepte la carga útil y cambie el significado silenciosamente"
      ],
      [
        "Transformación de errores",
        "Normalizar la infraestructura y el formato",
        "Convierta todos los errores a 200 o 500"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.15 Nivel 3: Controles de hipermedia",
    "id": "11-15-nivel-3-controles-de-hipermedia"
  },
  {
    "kind": "paragraph",
    "text": "El nivel 3 agrega controles hipermedia a las representaciones. Además de devolver datos, el servidor informa las relaciones y transiciones disponibles en el estado actual. Una transferencia pendiente puede ofrecer enlaces self, confirm y cancel; una transferencia liquidada solo puede ofrecer self y receipt. El cliente no necesita construir todas las URL ni mantener una tabla de estados completa para saber qué acciones están habilitadas."
  },
  {
    "kind": "paragraph",
    "text": "Este enfoque está relacionado con el principio HATEOAS: hipermedia como motor del estado de la aplicación. El “estado de la aplicación” se refiere al progreso del cliente a través de una secuencia de interacciones, guiadas por controles entrantes. El servidor continúa controlando el estado de los recursos, mientras la representación describe posibles rutas. La Web funciona de esta manera cuando un navegador recibe enlaces y formularios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-06.svg",
    "alt": "Controles de hipermedia que exponen las transiciones permitidas para una transferencia",
    "caption": "Figura 6: La representación de una transferencia pendiente expone solo las transiciones permitidas en ese momento."
  },
  {
    "kind": "subhead",
    "text": "Representación conceptual con controles hipermedia."
  },
  {
    "kind": "code",
    "text": "{\n  \"id\": \"abc\",\n  \"status\": \"PENDIENTE\",\n  \"importe\": 120.00,\n  \"_links\": {\n    \"self\":    { \"href\": \"/transferencias/abc\" },\n    \"confirm\": { \"href\": \"/transferencias/abc/confirmacion\", \"method\": \"POST\" },\n    \"cancel\":  { \"href\": \"/transferencias/abc/cancelacion\", \"method\": \"POST\" }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.16 Relaciones, vínculos y acciones",
    "id": "11-16-relaciones-vinculos-y-acciones"
  },
  {
    "kind": "paragraph",
    "text": "Un enlace útil tiene un destino y una relación semántica. La relación consigo mismo indica la identificación canónica de la representación; siguiente y anterior pueden navegar por las páginas; puntos de recogida a la recogida; El artículo relaciona colección y miembro. Las relaciones registradas en la IANA permiten un significado compartido, mientras que las relaciones específicas pueden utilizar sus propios URI. El nombre del campo por sí solo no debería ser la única definición semántica."
  },
  {
    "kind": "paragraph",
    "text": "Las acciones requieren más información que un href. El cliente puede necesitar método, tipo de contenido, campos, restricciones y documentación. Los diferentes formatos hipermedia representan esta información de diferentes maneras. No existe un formato único obligatorio para REST; el contrato debe definir el tipo de medios, las relaciones y cómo interpretar los controles."
  },
  {
    "kind": "paragraph",
    "text": "Los controles deben reflejar la autorización y el estatus, pero su ausencia no reemplaza la aplicación de la ley. El servidor debe validar cada acción nuevamente. Un cliente puede fabricar una solicitud o reutilizar un enlace antiguo. La hipermedia guía la experiencia y reduce los intentos no válidos; la autorización y la validación siguen siendo obligatorias."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Las relaciones deben tener un significado estable y documentado.",
    "headers": [
      "relación",
      "Posible significado",
      "Nota"
    ],
    "rows": [
      [
        "yo",
        "Identificador de representación actual",
        "Ayuda para el almacenamiento en caché, la correlación y la actualización"
      ],
      [
        "colección",
        "Colección a la que pertenece el artículo",
        "Puede guiar la navegación y la creación."
      ],
      [
        "siguiente/anterior",
        "Paginación o secuencia",
        "Prefiero enlaces completos a la reconstrucción del cursor."
      ],
      [
        "confirmar",
        "Transición de dominio específico",
        "Definir relación por URI o contrato de medios"
      ],
      [
        "descrito por",
        "Documento que describe el recurso.",
        "No reemplaza los controles ejecutables."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.17 Tipos de contratos de medios e hipermedia",
    "id": "11-17-tipos-de-contratos-de-medios-e-hipermedia"
  },
  {
    "kind": "paragraph",
    "text": "Los hipermedia dependen de una convención que el cliente entiende. application/json, por sí solo, solo define la sintaxis JSON; no le dice que los _links contienen relaciones, que las acciones describen formularios o cómo se deben expandir las plantillas de URI. La API puede adoptar un tipo de medio conocido, un perfil o un tipo específico de organización. Lo importante es que el significado sea explícito y versionable."
  },
  {
    "kind": "paragraph",
    "text": "Los tipos de medios específicos pueden permitir la evolución independiente de las URL, pero también aumentar la gobernanza y las herramientas. Los SDK, validadores, puertas de enlace y documentación necesitan conocer el formato. En organizaciones con muchos equipos, una especificación hipermedia interna debe definir campos obligatorios, relaciones registradas, plantillas, acciones, errores, compatibilidad y reglas de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Los enlaces web, definidos por RFC 8288, le permiten transportar enlaces en encabezados y representaciones. Las plantillas URI, definidas por RFC 6570, permiten describir destinos parametrizados. Estos patrones pueden componer una solución, pero no proporcionan por sí solos un modelo completo de acciones. La elección debe considerar las capacidades reales de los consumidores."
  },
  {
    "kind": "subhead",
    "text": "JSON no tiene hipermedia de forma predeterminada. Un campo llamado enlaces son solo datos hasta que el contrato define relaciones, objetivos, cardinalidad, plantillas y comportamiento del cliente. La madurez está en la semántica compartida, no en el nombre del objeto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.18 Clientes orientados por transiciones",
    "id": "11-18-clientes-orientados-por-transiciones"
  },
  {
    "kind": "paragraph",
    "text": "Un cliente impulsado por hipermedia comienza con un pequeño conjunto de puntos conocidos y navega a través de relaciones. Busca rel=confirmar, en lugar de concatenar /confirmación; interpreta una acción disponible, en lugar de codificar que PENDIENTE siempre permite la confirmación. Esto reduce el acoplamiento a la topología y parte de las reglas de flujo."
  },
  {
    "kind": "paragraph",
    "text": "La reducción no es absoluta. El cliente aún conoce las relaciones, los tipos de medios y la semántica de dominio. Cambiar el significado de confirmar es un cambio radical. Eliminar una relación puede cambiar la funcionalidad. La hipermedia cambia el acoplamiento de URL y secuencias rígidas a vocabularios y posibilidades, que necesitan gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "Los clientes generados exclusivamente desde OpenAPI tienden a llamar a operaciones estáticas. Para explorar el nivel 3, el tiempo de ejecución necesita analizar representaciones y elegir transiciones. Es posible combinar los enfoques: OpenAPI describe operaciones y esquemas, mientras que las relaciones en las respuestas guían la disponibilidad y la navegación. Las pruebas deben verificar ambos."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo de cliente basado en relaciones"
  },
  {
    "kind": "code",
    "text": "transfer = GET(entrypoint).follow(\"transfer-by-id\", id=\"abc\")\nif transfer.has_relation(\"confirm\"):\n    result = transfer.follow(\"confirm\", body={\"otp\": \"...\"})\nelse:\n    show_message(\"La confirmación no está disponible en el estado actual\")"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.19 Beneficios, costos y dificultades del nivel 3",
    "id": "11-19-beneficios-costos-y-dificultades-del-nivel-3"
  },
  {
    "kind": "paragraph",
    "text": "El principal beneficio es que permite al servidor comunicar transiciones válidas y cambiar ciertos destinos sin necesidad de que los clientes reconstruyan las URL. Esto puede mejorar la capacidad de descubrimiento, reducir las llamadas no válidas, facilitar transmisiones largas y hacer que el estado sea más explícito. En dominios con máquinas de estado relevantes (incorporación, pagos, pedidos, aprobaciones), los controles dinámicos pueden aportar un valor concreto."
  },
  {
    "kind": "paragraph",
    "text": "El costo aparece en diseño, documentación, bibliotecas y pruebas. El equipo necesita definir vocabularios de relaciones, representar acciones, mantener tipos de medios y educar a los consumidores. Las herramientas empresariales están más maduras para OpenAPI y SDK estáticos que para clientes hipermedia genéricos. Si los consumidores ignoran los enlaces y continúan concatenando caminos, el costo se paga sin obtener el beneficio."
  },
  {
    "kind": "paragraph",
    "text": "Un error común es devolver todos los enlaces posibles, independientemente del estado o la autorización. Esto convierte a los hipermedia en un catálogo estático y puede exponer información innecesaria. Otra es utilizar relaciones indefinidas, como acción1 o ejecutar. También es inapropiado creer que los enlaces eliminan las versiones: los esquemas, las relaciones y la semántica continúan evolucionando."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - La decisión de adoptar hipermedia depende del dominio y del ecosistema.",
    "headers": [
      "Situación",
      "El nivel 3 tiende a ayudar",
      "El nivel 3 puede no dar sus frutos"
    ],
    "rows": [
      [
        "Flujo de negocios",
        "Múltiples estados y transiciones dinámicas",
        "CRUD simple y estable"
      ],
      [
        "Consumidores",
        "Clientes capaces de interpretar las relaciones.",
        "Integraciones por lotes estrictas y SDK generados"
      ],
      [
        "Topología",
        "Los destinos y las acciones evolucionan con frecuencia.",
        "Pocas operaciones y URL estables"
      ],
      [
        "Gobernanza",
        "Vocabulario compartido y tipo de medios.",
        "Cada equipo inventa su propio formato"
      ],
      [
        "Operación",
        "Telemetría de relaciones y transiciones.",
        "Los enlaces no se observan ni se prueban."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11,20 RMM frente al REST de Fielding",
    "id": "11-20-rmm-frente-al-rest-de-fielding"
  },
  {
    "kind": "paragraph",
    "text": "El RMM es una descomposición didáctica de algunos elementos; REST es un estilo arquitectónico compuesto de limitaciones. El nivel 1 se relaciona con la identificación de recursos. El nivel 2 es el que más se acerca a una interfaz uniforme y al uso de la semántica HTTP. El nivel 3 enfatiza los controles hipermedia. Sin embargo, el modelo no tiene pasos explícitos para cliente-servidor, stateless, caché, sistema en capas y código bajo demanda."
  },
  {
    "kind": "paragraph",
    "text": "Una API puede estar en el nivel 3 y aún depender de la afinidad de sesión en una instancia, deshabilitar el almacenamiento en caché en todas las respuestas, exponer detalles de persistencia y requerir coordinación simultánea entre el cliente y el servidor con cada cambio. En esta situación, la interfaz utiliza hipermedia, pero la arquitectura no logra varias propiedades REST esperadas."
  },
  {
    "kind": "paragraph",
    "text": "Lo contrario también requiere matices. Una API de nivel 2 puede aplicar cliente-servidor, stateless, caché y capas de forma robusta, quedando lejos del uso completo del hipermedia. Llamarlo “inmaduro” sin considerar el contexto puede ser menos útil que registrar exactamente qué restricciones y propiedades están presentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: RMM y REST responden preguntas relacionadas pero diferentes.",
    "headers": [
      "Apariencia",
      "Richardson Maturity Model",
      "REST"
    ],
    "rows": [
      [
        "Propósito",
        "Clasificar las capacidades de la interfaz visible",
        "Definir estilo arquitectónico y propiedades emergentes."
      ],
      [
        "Estructura",
        "Cuatro niveles acumulativos",
        "Conjunto de restricciones combinado"
      ],
      [
        "Enfoque",
        "Recursos, HTTP e hipermedia",
        "Componentes, conectores, datos y restricciones."
      ],
      [
        "Resultado",
        "Lenguaje de evaluación y evolución.",
        "Análisis de propiedades arquitectónicas."
      ],
      [
        "Límite",
        "No mide la calidad total ni todas las restricciones.",
        "No prescribe un diseño de punto final único"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.21 RMM, OpenAPI y gobernanza",
    "id": "11-21-rmm-openapi-y-gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describe operaciones, parámetros, esquemas, respuestas y mecanismos de seguridad HTTP. Es excelente para diseño de contratos, documentación, generación de clientes, burlas y pruebas. Sin embargo, una descripción válida puede representar cualquier nivel: un único POST con campo de operación, múltiples recursos aún manejados por POST, una interfaz de nivel 2 u operaciones cuyas respuestas incluyen hipermedia."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza puede utilizar reglas automáticas para detectar signos de niveles: concentración excesiva de POST, verbos en rutas, falta de respuestas 4xx, creación sin Location, métodos incompatibles con la seguridad, falta de esquemas de error y operaciones sin etiquetas de recursos. Estas reglas son heurísticas. La semántica real, el comportamiento idempotente y la calidad de las relaciones requieren revisión y pruebas humanas."
  },
  {
    "kind": "paragraph",
    "text": "En los canales empresariales, el análisis debe combinar lint de contrato, pruebas de contrato, pruebas de comportamiento y telemetría. OpenAPI informa lo que se ha declarado; las pruebas verifican lo que ejecuta el tiempo de ejecución; El gateway muestra cómo los consumidores utilizan realmente la interfaz. Una API puede documentar PUT e implementar un efecto no idempotente; sólo el comportamiento revela la divergencia."
  },
  {
    "kind": "subhead",
    "text": "El contrato no es un comportamiento OpenAPI puede declarar métodos y respuestas correctos mientras la implementación devuelve 200 para todos los errores o cambios de estado en GET. La madurez debe verificarse mediante pruebas y pruebas operativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.22 Matriz de evaluación",
    "id": "11-22-matriz-de-evaluacion"
  },
  {
    "kind": "paragraph",
    "text": "Una revisión útil evita reducir la interfaz a un grado. Para cada viaje, registre la evidencia, el impacto y la acción recomendada. El nivel puede ser informado, pero debe ir acompañado de observaciones sobre REST, seguridad y funcionamiento. La siguiente tabla proporciona preguntas mínimas que se pueden aplicar a una API o un conjunto de puntos finales."
  },
  {
    "kind": "paragraph",
    "text": "El equipo también debe considerar el peso y el contexto. La ausencia de hipermedia puede tener un impacto bajo en una API interna con dos consumidores estables, mientras que la POST no idempotente sin deduplicación puede representar un riesgo crítico. La prioridad de mejora debe estar determinada por el riesgo y el valor, no solo por la distancia al nivel 3."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Matriz de evaluación basada en evidencia.",
    "headers": [
      "Dimensión",
      "Pregunta de evidencia",
      "Pista"
    ],
    "rows": [
      [
        "Punto final",
        "¿Las intenciones convergen en un único URI genérico?",
        "Nivel 0"
      ],
      [
        "Recursos",
        "¿Las entidades y procesos tienen una identidad estable?",
        "Nivel 1"
      ],
      [
        "Métodos",
        "¿GET, POST, PUT, PATCH y DELETE respetan la semántica?",
        "Nivel 2"
      ],
      [
        "Respuestas",
        "¿Los estados y encabezados permiten una interpretación genérica?",
        "Nivel 2"
      ],
      [
        "hipermedia",
        "¿Las representaciones exponen las relaciones y transiciones actuales?",
        "Nivel 3"
      ],
      [
        "stateless",
        "¿La solicitud depende de una sesión local previa?",
        "Restricción de REST"
      ],
      [
        "caché",
        "¿Las respuestas reutilizables tienen una política explícita?",
        "Restricción de REST"
      ],
      [
        "capas",
        "¿El cliente depende de la topología interna?",
        "Restricción de REST"
      ],
      [
        "Operación",
        "¿Los registros distinguen gateway, API y dominio?",
        "Calidad operativa"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejemplo de conclusión de evaluación"
  },
  {
    "kind": "subhead",
    "text": "Viaje: consulta y cancelación de cita. Evidencia: recursos identificados por /citas/{id}; la lectura usa GET; la cancelación utiliza POST /cancelar; los errores utilizan 200 con sobre. Clasificación: nivel 1 con elementos parciales de nivel 2. Riesgo: observabilidad inconsistente y manejo de retries. Siguiente acción: adopte DELETE o un recurso de cancelación según la semántica del dominio, el estado HTTP y los Problem Details, manteniendo la ruta anterior durante la migración."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.23 Estrategia de migración",
    "id": "11-23-estrategia-de-migracion"
  },
  {
    "kind": "paragraph",
    "text": "La migración debe comenzar con un viaje de valor y no con una reescritura total del catálogo. Seleccionar operaciones con altos costos de soporte, riesgo de duplicidad o dificultad en la evolución. Consumidores, volúmenes, dependencias de carga útil, códigos internos y políticas del gateway de inventario. Defina métricas de éxito antes de publicar la nueva interfaz."
  },
  {
    "kind": "paragraph",
    "text": "La nueva superficie puede coexistir con la antigua. Un adaptador traduce mensajes de nivel 0 a recursos y métodos de nivel 2; Las respuestas antiguas se conservan para los clientes heredados. Los contratos tienen fechas, políticas de deprecación y telemetría de uso. Los cambios irreversibles sólo ocurren después de que haya evidencia de migración."
  },
  {
    "kind": "paragraph",
    "text": "Se debe agregar hipermedia cuando haya un caso de uso. Comenzar con los enlaces de relaciones propias, siguientes, anteriores y de proceso le permite probar herramientas y consumidores. Se pueden introducir acciones dinámicas en flujos con estados relevantes. El equipo evita crear un marco amplio antes de demostrar el beneficio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/es/figure-07.svg",
    "alt": "Hoja de ruta de migración incremental basada en riesgos y compatibilidad",
    "caption": "Figura 7: La evolución entre niveles puede ser incremental, compatible y estar impulsada por el riesgo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.24 Observabilidad y troubleshooting",
    "id": "11-24-observabilidad-y-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La madurez de la interfaz cambia la calidad de las señales operativas. En el nivel 0, las métricas por POST/servicio agregan todas las intenciones; Es necesario extraer la operación del cuerpo o agregar un atributo comercial. En el nivel 1, las rutas distinguen recursos, pero las acciones pueden permanecer ocultas. En el nivel 2, el método, la plantilla de ruta y el estado ofrecen dimensiones estandarizadas. En el nivel 3, las relaciones seguidas pueden revelar transiciones y viajes."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben registrar el método, la plantilla de ruta, el estado, la latencia, el origen de la respuesta, el ID de correlación, el consumidor y el identificador del recurso cuando esté permitido. Evite utilizar el URI concreto como etiqueta métrica, ya que los ID de alta cardinalidad degradan los sistemas de observabilidad. Utilice /transferencias/{id} como dimensión y conserve el identificador solo en registros o rastreos protegidos."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting debe separar el contrato y el transporte. Se produce un tiempo de espera antes de cualquier clasificación RMM; un 405 indica que respondió un componente HTTP; un 409 podría representar un conflicto de dominio; un 200 con error interno sugiere contrato de nivel 0 o mal ajuste. Para las puertas de enlace, confirme si la respuesta fue producida por el proxy, la política o el backend."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - Síntomas útiles al investigar interfaces en diferentes niveles.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "Pruebas para recoger"
    ],
    "rows": [
      [
        "Todo aparece como una ruta.",
        "Punto final genérico de nivel 0",
        "campo de operación, política de extracción y rastreo"
      ],
      [
        "GET cambia el estado",
        "Semántica de nivel 2 violada",
        "registros de dominio y pruebas repetidas"
      ],
      [
        "Reintentar operación de duplicados",
        "POST sin deduplicación",
        "clave de idempotencia y registros transaccionales"
      ],
      [
        "El enlace existe pero falla.",
        "Control obsoleto o no autorizado",
        "decisión de representación, estatus y autorización"
      ],
      [
        "405 en el gateway",
        "Método bloqueado o no publicado",
        "Allow, configuración de ruta y upstream"
      ],
      [
        "200 con problema",
        "Envoltura heredada o transformación",
        "cuerpo, cadena de políticas y estado del backend"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.25 Estudios de casos y laboratorios",
    "id": "11-25-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Los siguientes ejercicios utilizan un dominio de transferencia ficticio. Ejecútelo solo en laboratorio o en entornos simulados. El objetivo es observar diferencias en contratos y comportamiento; No reproduce datos reales ni integraciones."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudio de caso 1: modernización del dispatcher"
  },
  {
    "kind": "paragraph",
    "text": "Una API recibe POST /transacciones con acción=CONSULTAR, acción=CREAR y acción=CANCELAR. Todos los resultados utilizan 200. Proponer recursos, métodos y respuestas. Considere cómo preservar a los antiguos consumidores, cómo correlacionar la nueva transferencia y cómo manejar el tiempo de espera después de la creación. Compara métricas de antes y después."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudio de caso 2: proceso asincrónico"
  },
  {
    "kind": "paragraph",
    "text": "Una transferencia puede permanecer bajo revisión. Modele la solicitud como un recurso, devuelva 202 cuando el procesamiento aún no haya finalizado y proporcione un monitor. Luego agregue relaciones propias, de cancelación y de recibo según el estado. Verifique que el servidor rechace acciones no autorizadas incluso cuando el enlace sea fabricado."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1 - clasificación por evidencia"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Enumere todos los puntos finales para una API de prueba y agrupe por recorrido.",
      "Identificar operaciones centradas en el cuerpo o verbos en el camino.",
      "Califique cada recorrido, no solo la API completa.",
      "Registre evidencia de recursos, métodos, estado, encabezados e hipermedia.",
      "Producir recomendaciones priorizadas por riesgo y valor."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2: Prueba de semántica HTTP"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Ejecute GET repetidamente y confirme que no se haya solicitado ningún efecto en el dominio.",
      "Repita PUT y DELETE y observe el efecto deseado.",
      "Simule actualizaciones simultáneas con ETag e If-Match.",
      "Causar validación, conflicto, ausencia e indisponibilidad; compare el estado y los Problem Details.",
      "Inspeccione el gateway y el backend para descubrir qué componente produjo cada respuesta."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3 - cliente hipermedia"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Comience en un punto de entrada y busque relaciones, sin concatenar caminos.",
      "Realizar únicamente acciones presentes en la representación.",
      "Cambiar el destino de una relación en el servidor sin modificar el cliente.",
      "Elimine una transición de cambio de estado y observe el comportamiento.",
      "Capture métricas de relaciones seguidas y fallas de transición."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "El modelo de madurez de Richardson describe la evolución en cuatro niveles. El nivel 0 centra las operaciones en mensajes enviados a un punto final genérico. El nivel 1 introduce recursos e identificadores. El nivel 2 utiliza la semántica HTTP a través de métodos, estados, encabezados, caché y condiciones previas. El nivel 3 agrega controles hipermedia que guían las transiciones en el estado actual."
  },
  {
    "kind": "paragraph",
    "text": "El modelo es útil para diagnóstico y planificación, pero no mide todos los atributos de una plataforma. La seguridad, la confiabilidad, la gobernanza, el rendimiento, la documentación y la compatibilidad requieren su propio análisis. Tampoco reemplaza las restricciones REST descritas por Fielding. Una interfaz puede alcanzar el nivel 3 sin obtener todas las propiedades arquitectónicas del estilo."
  },
  {
    "kind": "paragraph",
    "text": "La evolución debe estar impulsada por el riesgo y el valor. Los recursos estables mejoran la identidad; La semántica HTTP mejora la interoperabilidad y el funcionamiento; Los hipermedia pueden reducir el acoplamiento con las URL y las reglas de flujo. Cada paso tiene costos y depende del ecosistema de consumidores. El objetivo no es lograr una puntuación, sino construir interfaces predecibles, evolutivas y observables."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lista de verificación de evaluación"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿Las operaciones están concentradas en un punto final y diferenciadas por organismo?",
      "¿Los conceptos de dominio tienen recursos e identificadores estables?",
      "¿Los URI representan recursos en lugar de nombres de funciones?",
      "¿Los métodos respetan la seguridad y la idempotencia?",
      "¿Los códigos de estado identifican correctamente el éxito, el error del cliente y la falla del servidor?",
      "¿Las creaciones, los procesos asincrónicos y las condiciones previas utilizan encabezados adecuados?",
      "¿Los errores tienen un formato estructurado y no exponen datos confidenciales?",
      "¿Los retries consideran la idempotencia y la deduplicación?",
      "¿Las representaciones exponen vínculos y acciones con relaciones definidas?",
      "¿Los clientes realmente interpretan las relaciones o continúan codificando las URL?",
      "¿La evaluación separa RMM, restricciones REST y atributos de calidad?",
      "¿El gateway, el backend y el dominio conservan la misma semántica?",
      "¿Las métricas utilizan plantillas de ruta y distinguen el origen de la respuesta?",
      "¿La migración cuenta con inventario de consumo, telemetría y plan de deprecación?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejercicios de repaso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por qué el uso de JSON y POST no determina el nivel de una API.",
      "Clasifique una interfaz con múltiples rutas, todas manejadas por POST, y justifíquela.",
      "Modelo de consulta, creación y cancelación de transferencias en los niveles 0, 1 y 2.",
      "Describa una situación en la que un nivel API 2 es adecuado y el nivel 3 no es adecuado.",
      "Explique cómo ETag e If-Match contribuyen a una interfaz de nivel 2.",
      "Proponer relaciones hipermedia para un proceso de aprobación de cuatro estados.",
      "Diferenciar entre ausencia de enlace y falta de autorización en el servidor.",
      "Compare RMM con restricciones de caché REST y stateless.",
      "Explique por qué OpenAPI no certifica el comportamiento idempotente.",
      "Cree un plan de migración para un único punto final utilizado por cinco consumidores.",
      "Describe un script de troubleshooting para 200 que contiene un error interno.",
      "Cree una matriz de evidencia para evaluar una API en el gateway y el backend."
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
    "caption": "Glosario de capítulos esenciales.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Asequibilidad",
        "Indicación de una posible acción y cómo ejecutarla en el contexto de una representación."
      ],
      [
        "Punto final",
        "Punto de interacción expuesto por una API, normalmente asociado con URI y método."
      ],
      [
        "ODIAOAS",
        "Uso de hipermedia para guiar el estado de la aplicación y las próximas transiciones."
      ],
      [
        "hipermedia",
        "Medios que contienen controles, relaciones o enlaces capaces de guiar la navegación y las acciones."
      ],
      [
        "Idempotencia",
        "Propiedad por la cual repeticiones equivalentes producen el mismo efecto deseado."
      ],
      [
        "relación de enlace",
        "Relación que define el significado de un vínculo entre el contexto y el objetivo."
      ],
      [
        "viruela",
        "XML antiguo y sencillo; en RMM, representa mensajes propietarios transportados por un punto final genérico, incluso cuando el formato moderno es JSON."
      ],
      [
        "Problem Details",
        "Formato estandarizado para representar Problem Details en las API HTTP."
      ],
      [
        "Recurso",
        "Abstracción identificable que puede tener representaciones y estados controlados por el servidor."
      ],
      [
        "Representación",
        "Datos transferidos que describen el estado actual o previsto de un recurso."
      ],
      [
        "Richardson Maturity Model",
        "Modelo de cuatro niveles para observar la adopción de funciones, la semántica HTTP y los hipermedia."
      ],
      [
        "RMM",
        "Acrónimo de Richardson Maturity Model."
      ],
      [
        "Semántica HTTP",
        "Significado compartido de métodos, códigos, encabezados y otros elementos del protocolo."
      ],
      [
        "Plantilla URI",
        "Sintaxis para expresar URI parametrizados que los clientes pueden ampliar."
      ],
      [
        "Enlaces web",
        "Modelo estandarizado para expresar enlaces y relaciones en mensajes web."
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
    "kind": "paragraph",
    "text": "Las referencias siguientes deben leerse juntas. El artículo de Fowler presenta el modelo; La disertación de Fielding proporciona la base arquitectónica de REST; Los RFC definen la semántica interoperable utilizada en los ejemplos."
  },
  {
    "kind": "paragraph",
    "text": "[1] FOWLER, Martín. Richardson Maturity Model: pasos hacia la gloria de REST. 2010. Disponible en: martinfowler.com/articles/richardsonMaturityModel.html."
  },
  {
    "kind": "paragraph",
    "text": "[2] FIELDING, Roy Thomas. Estilos arquitectónicos y diseño de arquitecturas de software basadas en red. Universidad de California, Irvine, 2000. Capítulo 5: Transferencia estatal representativa."
  },
  {
    "kind": "paragraph",
    "text": "[3] IETF. RFC 9110 - Semántica HTTP. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[4] IETF. RFC 9111: almacenamiento en caché HTTP. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[5] IETF. RFC 8288 - Enlaces web. 2017."
  },
  {
    "kind": "paragraph",
    "text": "[6] IETF. RFC 6570 - Plantilla URI. 2012."
  },
  {
    "kind": "paragraph",
    "text": "[7] IETF. RFC 9457: Problem Details para las API HTTP. 2023."
  },
  {
    "kind": "paragraph",
    "text": "[8] IANA. Registro de Relaciones de Enlace. Registro de relaciones estandarizadas para enlaces."
  },
  {
    "kind": "paragraph",
    "text": "[9] Iniciativa OpenAPI. Especificación de OpenAPI. Especificación para describir las API HTTP."
  },
  {
    "kind": "paragraph",
    "text": "[10] IETF. RFC 6902: parche de notación de objetos JavaScript (JSON). 2013."
  },
  {
    "kind": "paragraph",
    "text": "[11] IETF. RFC 7386: parche de fusión JSON. 2014."
  },
  {
    "kind": "paragraph",
    "text": "[12] IETF. RFC 7232 - Protocolo de transferencia de hipertexto (HTTP/1.1): Solicitudes condicionales. 2014. Obsoleto como documento agregado, pero históricamente relevante; La semántica actual está consolidada en RFC 9110."
  },
  {
    "kind": "subhead",
    "text": "Fin del capítulo El siguiente paso del curso es profundizar en la descripción y gobernanza de los contratos API, conectando el modelado HTTP, OpenAPI, validación, compatibilidad y automatización de pipelines."
  }
];
