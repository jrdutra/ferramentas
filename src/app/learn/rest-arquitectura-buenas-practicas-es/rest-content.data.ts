import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const REST_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Ruta REST de una operación empresarial"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/es/overview.svg",
    "alt": "Ruta REST desde una operación empresarial de consumo hasta la persistencia",
    "caption": "Descripción general: el cliente expresa una intención sobre un recurso; El gateway, el dominio y la persistencia preservan la semántica de la operación."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "El cliente selecciona un recurso y una operación sin conocer la implementación interna.",
      "El gateway valida el contexto, impone límites y reenvía un mensaje HTTP semánticamente correcto.",
      "El servicio cambia o consulta el estado del dominio y devuelve una representación del resultado."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "REST a menudo se presenta como una colección de convenciones para crear puntos finales HTTP, pero su origen es arquitectónico. El término describe un conjunto de restricciones aplicadas a sistemas hipermedia distribuidos para inducir propiedades como escalabilidad, simplicidad, evolución independiente, visibilidad de interacciones y uso eficiente de intermediarios. Una API puede utilizar JSON, métodos HTTP y rutas organizadas sin cumplir con todas estas restricciones; Por lo tanto, distinguir \"API HTTP\" de \"arquitectura REST\" evita decisiones basadas únicamente en etiquetas."
  },
  {
    "kind": "paragraph",
    "text": "En este capítulo, la atención se centra en el vínculo entre arquitectura y práctica. Las restricciones se estudiarán basándose en el trabajo de Roy Fielding, pero cada concepto estará conectado con el diseño cotidiano de las API corporativas: identificación de recursos, semántica de métodos, idempotencia, almacenamiento en caché, concurrencia, paginación, errores, versionado, documentación, seguridad y operación en gateways. El objetivo no es imponer una estética única, sino más bien mostrar cómo decisiones aparentemente pequeñas afectan a los consumidores, la observabilidad y la evolución a largo plazo."
  },
  {
    "kind": "paragraph",
    "text": "El HTTP moderno tiene su propia semántica, consolidada principalmente en RFC 9110. REST se beneficia de esta semántica, pero no se reduce a ella. Del mismo modo, OpenAPI describe contratos de API HTTP, pero una descripción de OpenAPI bien formada no transforma automáticamente una interfaz en REST. A lo largo del material se explicarán estos límites para que el lector sepa qué norma o principio es la base de cada elección."
  },
  {
    "kind": "paragraph",
    "text": "En entornos bancarios y corporativos, rara vez se accede directamente a una API. Puede atravesar WAF, balanceador, API Gateway, malla de servicios y servicios de identidad. Estos intermediarios alteran las conexiones, aplican políticas y producen sus propias respuestas. Un diseño REST sólido debe preservar la semántica y la trazabilidad incluso cuando el mensaje atraviesa múltiples capas y diferentes equipos son responsables de cada pieza."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Lea primero las secciones sobre restricciones e interfaz uniforme. Luego utilice los métodos y las tablas de estado como referencia de diseño. En los laboratorios, compare el comportamiento observado en el cliente, el gateway y el backend; la misma respuesta puede haber sido producida por diferentes componentes."
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
      "Explicar REST como un estilo arquitectónico y diferenciar sus restricciones de las convenciones del mercado.",
      "Distinguir recurso, estado, representación, identificador, operación y punto final.",
      "Aplique la interfaz uniforme al diseño de URI, métodos, encabezados, códigos de estado y enlaces.",
      "Analice seguridad, idempotencia y caché sin confundir estos conceptos.",
      "Diseñar colecciones, paginación, filtros, ordenamiento, actualización parcial y operaciones asíncronas.",
      "Estandarice los errores con los Problem Details y controle la concurrencia mediante condiciones previas de HTTP.",
      "Planifique la compatibilidad y el versionado, evitando cambios innecesariamente destructivos.",
      "Utilice OpenAPI, pruebas de contratos, observabilidad y políticas de gateway como mecanismos de gobernanza.",
      "Diagnostique fallas REST distinguiendo problemas de transporte, protocolo, gateway, contrato y dominio."
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
      "10.1 REST como estilo arquitectónico",
      "10.2 Propiedades y restricciones de estilo",
      "10.3 Cliente-servidor y separación de responsabilidades",
      "10.4 Stateless y contexto de la solicitud",
      "10.5 Caché y reutilización de respuestas",
      "10.6 Interfaz uniforme",
      "10.7 Sistemas en capas y código bajo demanda",
      "10.8 Recurso, Estado y Representación",
      "10.9 Identificación de recursos y diseño de URI",
      "10.10 Semántica de los métodos HTTP",
      "10.11 Seguridad, Idempotencia y Reintentos",
      "10.12 Códigos de estado",
      "10.13 Negociación de contenidos y formatos",
      "10.14 PUT, PATCH y actualizaciones",
      "10.15 Colecciones, filtros, clasificación y paginación",
      "10.16 Errores con Problem Details",
      "10.17 Cache Condicional, ETag y Concurrencia",
      "10.18 Operaciones asincrónicas",
      "10.19 Compatibilidad y versiones",
      "10.20 Hipermedia y descubrimiento",
      "10.21 OpenAPI y diseño orientado al contrato",
      "10.22 Seguridad y autorización",
      "10.23 API Gateways y políticas corporativas",
      "10.24 Observabilidad y troubleshooting",
      "10.25 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.1 REST como estilo arquitectónico",
    "id": "10-1-rest-como-estilo-arquitectonico"
  },
  {
    "kind": "paragraph",
    "text": "Roy Fielding introdujo la transferencia de estado representacional como un estilo arquitectónico para sistemas hipermedia distribuidos. Un estilo no es una biblioteca, un protocolo ni un formato de datos. Define un conjunto con nombre de restricciones sobre componentes, conectores y datos, y estas restricciones inducen ciertas propiedades arquitectónicas. Esta definición es importante porque permite analizar una solución por sus decisiones estructurales, no sólo por su sintaxis externa."
  },
  {
    "kind": "paragraph",
    "text": "En la práctica del mercado, \"API REST\" ha llegado a designar casi cualquier API HTTP que utilice recursos aparentes y JSON. Esta simplificación puede resultar útil en conversaciones informales, pero produce confusión cuando se habla de almacenamiento en caché, hipermedia, evolución y acoplamiento. Una interfaz con puntos finales como /executarQuery y /processarPagamento puede funcionar correctamente a través de HTTP, pero está más cerca de RPC. El problema es no utilizar RPC cuando cumple con el contexto; el problema es asignar propiedades REST a una arquitectura que no fue diseñada con sus restricciones."
  },
  {
    "kind": "paragraph",
    "text": "El valor de REST está en las propiedades emergentes. La separación de cliente y servidor permite una evolución independiente; los mensajes autónomos aumentan la visibilidad; el caché reduce las interacciones; la interfaz uniforme simplifica a los intermediarios; Las capas permiten escalabilidad y políticas transversales. Cada beneficio tiene un costo. Stateless transfiere contexto a mensajes o almacenamiento compartido; la interfaz uniforme limita operaciones específicas; Los hipermedia requieren modelos y clientes capaces de interpretar las relaciones."
  },
  {
    "kind": "paragraph",
    "text": "Por tanto, las buenas prácticas deben evaluarse por su efecto en el sistema. El uso de sustantivos en URI es una heurística coherente con los recursos, pero no es la esencia de REST. El uso de todos los códigos HTTP no garantiza una buena semántica. Una API madura define recursos estables, utiliza la semántica del protocolo de manera predecible y documenta explícitamente cuando las necesidades del dominio requieren decisiones diferentes."
  },
  {
    "kind": "subhead",
    "text": "pregunta de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "Antes de preguntar \"¿qué punto final debo crear?\", pregunte: ¿cuál es el recurso, quién controla su estado, qué representación se transferirá y qué propiedades de evolución, caché y visibilidad se necesitan?"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.2 Propiedades y restricciones de estilo",
    "id": "10-2-propiedades-y-restricciones-de-estilo"
  },
  {
    "kind": "paragraph",
    "text": "Fielding deriva REST combinando restricciones conocidas: cliente-servidor, stateless, caché, interfaz uniforme, sistema en capas y, opcionalmente, código bajo demanda. Ninguna de estas restricciones por sí sola define REST. Un sistema cliente-servidor puede mantener una sesión con el servidor; un servicio stateless puede exponer las operaciones RPC; Es posible que una aplicación que se pueda almacenar en caché no tenga una interfaz uniforme. El estilo surge de la composición del conjunto."
  },
  {
    "kind": "paragraph",
    "text": "Las propiedades deseadas incluyen rendimiento de interacción, escalabilidad de componentes, simplicidad de interfaz, modificabilidad, visibilidad, portabilidad y confiabilidad. Hay tensión entre ellos. El almacenamiento en caché puede mejorar el rendimiento y la escalabilidad, pero introduce el riesgo de que los datos queden obsoletos. La estratificación aumenta la flexibilidad y la seguridad, pero agrega latencia. La interfaz uniforme simplifica la arquitectura general, pero puede ser menos eficiente para una operación altamente especializada."
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura empresarial requiere hacer explícitas estas compensaciones. Una API de cotización puede aceptar unos segundos de estancamiento y utilizar un almacenamiento en caché agresivo. Una operación de transferencia financiera necesita una coherencia, autorización e idempotencia más estrictas. Ambos pueden usar HTTP, pero sus políticas de representación, condiciones previas y respuesta serán diferentes."
  },
  {
    "kind": "paragraph",
    "text": "La decisión correcta es no aplicar una lista mecánicamente. Consiste en comprender el propósito de cada restricción, preservar la semántica compartida y documentar las excepciones. Cuando un equipo introduce un servidor de sesión, por ejemplo, debe reconocer el impacto en el equilibrio, la recuperación y la escalabilidad, en lugar de afirmar que el sistema permanece stateless solo porque usa tokens."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/es/figure-01.svg",
    "alt": "Las limitaciones arquitectónicas que, combinadas, forman el estilo REST.",
    "caption": "Figura 1: REST resulta de la combinación de restricciones arquitectónicas, no de una convención aislada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.3 Cliente-servidor y separación de responsabilidades",
    "id": "10-3-cliente-servidor-y-separacion-de-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "La restricción cliente-servidor separa las preocupaciones sobre la interfaz y la experiencia de las preocupaciones sobre el almacenamiento y las reglas comerciales. El cliente conoce el contrato de interacción; el servidor controla los recursos y su evolución interna. Esta división permite que las aplicaciones web, móviles, por lotes y de socios reutilicen capacidades del mismo dominio sin compartir la implementación de backend."
  },
  {
    "kind": "paragraph",
    "text": "Separación no significa ausencia de acoplamiento. El cliente todavía depende de la semántica de las representaciones, identificadores y posibles transiciones. Una API que expone directamente tablas internas o nombres de clases transfiere decisiones de implementación a los consumidores. Los cambios internos se convierten en cambios públicos, reduciendo la independencia que la restricción pretendía crear."
  },
  {
    "kind": "paragraph",
    "text": "En plataformas empresariales, API Gateway y BFF añaden matices. El gateway actúa como intermediario y no debe absorber las reglas del dominio sólo porque es un punto central. Un mejor amigo puede adaptar la granularidad y la representación para un canal específico, pero debe evitar copiar todo el modelo de negocio. El límite apropiado mantiene políticas transversales en el gateway y decisiones de dominio en el servicio responsable."
  },
  {
    "kind": "paragraph",
    "text": "Una buena evaluación se fija en la dirección de las instalaciones. El consumidor debe depender de un contrato estable; el servicio puede cambiar de banco, idioma, algoritmo o topología sin cambiar este contrato. Cuando un cambio interno requiere la actualización simultánea de todos los clientes, la separación existe sólo físicamente, no arquitectónicamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.4 Stateless y contexto de la solicitud",
    "id": "10-4-stateless-y-contexto-de-la-solicitud"
  },
  {
    "kind": "paragraph",
    "text": "Stateless significa que cada solicitud contiene la información necesaria para ser comprendida y procesada, y que el servidor no depende del contexto de sesión de la aplicación almacenado entre solicitudes del mismo cliente. El servidor obviamente mantiene el estado de los recursos, configuraciones, claves y datos comerciales. La restricción se refiere al estado conversacional de la interacción cliente-servidor, no a la falta de persistencia."
  },
  {
    "kind": "paragraph",
    "text": "Los tokens, las cookies y los encabezados pueden transportar contexto, pero el uso de un token no convierte automáticamente a la API en stateless. Si el token hace referencia a una sesión mutable mantenida en la memoria local de una instancia, la siguiente solicitud puede depender de la afinidad. Por otro lado, un identificador de sesión almacenado en un repositorio compartido reduce la dependencia de la instancia, pero aún representa el estado de la sesión en el servidor. El dibujo debe estar descrito con precisión."
  },
  {
    "kind": "paragraph",
    "text": "La principal ventaja operativa es que permite que cualquier instancia compatible procese cualquier solicitud. Esto facilita el equilibrio, el escalado automático y la recuperación. También mejora la visibilidad porque el mensaje contiene suficiente contexto para la auditoría. El costo es aumentar el tamaño de las solicitudes y requerir autorización, correlación y preferencias para reenviarlas o derivarlas de datos compartidos."
  },
  {
    "kind": "paragraph",
    "text": "En operaciones de varios pasos, el dominio a menudo necesita persistir en el progreso. Esto no infringe la condición stateless si el progreso se modela como un recurso, por ejemplo /solicitacoes-transferencia/abc, y no como una memoria implícita de una conversación vinculada a un servidor. Convertir un proceso en un recurso hace que el estado sea observable, consultable y recuperable."
  },
  {
    "kind": "subhead",
    "text": "Stateless no significa \"sin estado\""
  },
  {
    "kind": "paragraph",
    "text": "El servidor mantiene el estado de los recursos. La restricción evita depender de un estado de conversación oculto entre solicitudes. Modelar un recorrido como un recurso persistente suele ser más escalable y auditable que mantener una sesión implícita."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.5 Caché y reutilización de respuestas",
    "id": "10-5-cache-y-reutilizacion-de-respuestas"
  },
  {
    "kind": "paragraph",
    "text": "La restricción de caché requiere respuestas para indicar si se pueden reutilizar. En HTTP, directivas como Cache-Control, validadores como ETag y reglas de caducidad permiten a los clientes e intermediarios evitar transferencias y procesamientos innecesarios. El almacenamiento en caché reduce la latencia y la carga, pero solo es seguro cuando la semántica de respuesta y la variación por usuario, autorización y contenido se declaran correctamente."
  },
  {
    "kind": "paragraph",
    "text": "Una respuesta personalizada no debe almacenarse en una caché compartida sin los controles adecuados. Cache-Control: privado restringe la reutilización al caché privado; no-store solicita que el mensaje no se almacene; Vary te dice qué encabezados cambian la representación. La ausencia de esta información puede provocar fugas entre usuarios o comportamientos inconsistentes, especialmente cuando la CDN, el proxy inverso y el gateway participan en la ruta."
  },
  {
    "kind": "paragraph",
    "text": "No todas las API deberían deshabilitar el almacenamiento en caché de forma predeterminada. Los catálogos, los parámetros públicos, las tarifas de referencia y los metadatos pueden beneficiarse de la revalidación. Incluso cuando la representación cambia con frecuencia, un GET condicional con If-None-Match puede devolver 304 sin cuerpo. Esto preserva la corrección y ahorra ancho de banda."
  },
  {
    "kind": "paragraph",
    "text": "El equipo necesita definir quién controla las políticas. El backend conoce la semántica del recurso; el gateway puede aplicar límites o complementar encabezados, pero no debe inventar la validez de datos que desconoce. Las políticas centralizadas deben parametrizarse contractualmente y probarse con cachés reales para evitar reglas amplias que cambien el comportamiento de diferentes API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.6 Interfaz uniforme",
    "id": "10-6-interfaz-uniforme"
  },
  {
    "kind": "paragraph",
    "text": "La interfaz uniforme es la característica central de REST y tiene cuatro aspectos: identificación de recursos; manipulación por representaciones; mensajes autónomos; y los hipermedia como impulsores del estado de las aplicaciones. El objetivo es reducir el acoplamiento mediante una semántica común que puedan entender los clientes, servidores e intermediarios."
  },
  {
    "kind": "paragraph",
    "text": "Identificar recursos significa utilizar identificadores estables para conceptos, no necesariamente para líneas bancarias. La manipulación por representaciones significa que el cliente recibe o envía una representación y el servidor interpreta esta representación según el método y el contrato. Los mensajes autónomos utilizan método, URI, encabezados, estado y tipo de medio para informar cómo deben procesarse."
  },
  {
    "kind": "paragraph",
    "text": "Los hipermedia añaden posibles relaciones y acciones a la representación. En lugar de que el cliente cree todas las rutas a partir de conocimiento externo, el servidor puede proporcionar enlaces y controles basados ​​en el estado actual. Esta práctica es menos común en las API empresariales, pero su idea sigue siendo valiosa: el servidor debe guiar las transiciones válidas y reducir las reglas de navegación codificadas fuera del contrato."
  },
  {
    "kind": "paragraph",
    "text": "La uniformidad no significa que todas las API tengan las mismos recursos. Significa que la interacción utiliza elementos con significado compartido. GET no debe redefinirse como una operación destructiva, 404 no debe significar indisponibilidad temporal y Content-Type no debe omitirse cuando el cuerpo depende de la interpretación. Cuanto más respeta la API la semántica común, menos conocimientos especiales necesita el consumidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.7 Sistemas en capas y código bajo demanda",
    "id": "10-7-sistemas-en-capas-y-codigo-bajo-demanda"
  },
  {
    "kind": "paragraph",
    "text": "La restricción del sistema en capas permite insertar intermediarios sin que el cliente necesite conocer toda la topología. Los proxies, cachés, puertas de enlace, mallas de servicios y equilibradores pueden recibir una interacción y reenviarla. Cada componente ve sólo a sus vecinos inmediatos y aplica responsabilidades locales. Esta propiedad es fundamental en entornos corporativos, donde la seguridad, el enrutamiento y la observabilidad están distribuidos."
  },
  {
    "kind": "paragraph",
    "text": "La superposición también crea el riesgo de perder contexto. Un intermediario puede reemplazar el Host, finalizar TLS, cambiar el caché, eliminar encabezados o producir su propia respuesta. Por lo tanto, el diseño necesita definir la propagación de identidad, el contexto de seguimiento, la dirección original y la correlación. La transparencia arquitectónica no debería convertirse en invisibilidad operativa: los registros deben mostrar qué capa tomó cada decisión."
  },
  {
    "kind": "paragraph",
    "text": "El código bajo demanda es la única restricción opcional de REST. Permite al servidor enviar código ejecutable para ampliar el cliente, de forma muy parecida a los scripts web. En las API de integración, este mecanismo es poco común y generalmente indeseable por razones de seguridad, previsibilidad y gobernanza. Su ausencia no impide que la arquitectura sea REST."
  },
  {
    "kind": "paragraph",
    "text": "En API Gateways, la capa debe hacer cumplir políticas y adaptar los detalles de la infraestructura, pero la semántica del recurso debe permanecer coherente. Una gateway que convierte todos los errores a 200 o convierte GET en una operación de efecto secundario rompe la interfaz uniforme y obstaculiza las herramientas, los cachés y los consumidores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.8 Recurso, Estado y Representación",
    "id": "10-8-recurso-estado-y-representacion"
  },
  {
    "kind": "paragraph",
    "text": "Recurso es una abstracción conceptual identificable: cliente, cuenta, pago, propuesta, límite o solicitud. El recurso puede cambiar con el tiempo, pero su identidad permanece. El estado es la condición actual de este recurso en el dominio. La representación es una secuencia de bytes acompañada de metadatos que describen alguna vista de ese estado, como JSON, XML, CSV o imagen."
  },
  {
    "kind": "paragraph",
    "text": "Confundir recurso con representación conduce a puntos finales demasiado orientados al formato. /cliente.json puede resultar útil en contextos específicos, pero normalmente el formato se negocia por tipo de medio. Confundir recurso con tabla también limita la evolución: una cuenta puede agregar datos de múltiples fuentes y exponer solo propiedades autorizadas, sin reflejar la estructura interna."
  },
  {
    "kind": "paragraph",
    "text": "No es necesario que la representación contenga todo el estado. Se puede resumir, ampliar, localizar o filtrar según la autorización y el caso de uso. El contrato debe dejar claro qué campos son datos, metadatos, enlaces e información calculada. Los campos faltantes también tienen semántica: pueden significar no aplicable, no autorizado o no solicitado, y esta distinción debe documentarse."
  },
  {
    "kind": "paragraph",
    "text": "En los sistemas bancarios, el mismo recurso puede tener diferentes representaciones para el cliente, el encargado y el auditor. El identificador permanece, pero cada canal recibe atributos compatibles con su propósito y permiso. Este enfoque es más seguro que devolver un objeto completo y esperar que el consumidor ignore los campos confidenciales."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/es/figure-02.svg",
    "alt": "Relación entre recurso, estado y representaciones en diferentes formatos.",
    "caption": "Figura 2: el recurso tiene una identidad; Las representaciones transmiten visiones del Estado en formatos específicos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.9 Identificación de recursos y diseño de URI",
    "id": "10-9-identificacion-de-recursos-y-diseno-de-uri"
  },
  {
    "kind": "paragraph",
    "text": "Los URI deben identificar recursos de forma estable y predecible. Los nombres de colecciones en plural, como /clientes y /pagos, son una convención útil, aunque no normativa. El aspecto clave es preservar el significado y evitar incorporar detalles de implementación volátiles. No es necesario que las rutas reproduzcan la jerarquía de tablas, paquetes o servicios internos."
  },
  {
    "kind": "paragraph",
    "text": "Las relaciones se pueden expresar mediante subrecursos cuando existe una dependencia clara: /clientes/123/accounts. Sin embargo, los caminos muy profundos aumentan el acoplamiento y dificultan la reutilización. Si la cuenta 456 tiene su propia identidad, /accounts/456 puede ser el identificador canónico, mientras que la colección en cliente sirve como forma de navegación o filtro."
  },
  {
    "kind": "paragraph",
    "text": "Los parámetros de consulta representan selección, búsqueda, paginación, ordenación o proyección. No son inferiores a los segmentos del camino; tienen diferentes roles semánticos. /pagos?status=pending selecciona una vista de la colección, mientras que /pagos/abc identifica a un miembro. El equipo debe definir la normalización, la codificación, la distinción entre mayúsculas y minúsculas y el comportamiento de parámetros desconocidos."
  },
  {
    "kind": "paragraph",
    "text": "Evite verbos que dupliquen métodos, como /obterCliente o /deletarPagamento. Las operaciones de dominio que no encajan naturalmente en CRUD se pueden modelar como recursos de acción o proceso, por ejemplo POST /accounts/123/locks. Este modelado crea un registro identificable del bloque y permite realizar auditorías, consultas e idempotencia."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Ejemplos de identificación de recursos y diferentes intenciones.",
    "headers": [
      "Situación",
      "URI preferible",
      "Razón"
    ],
    "rows": [
      [
        "Cobro de cuentas",
        "/cuentas",
        "Identifica el conjunto de recursos."
      ],
      [
        "cuenta especifica",
        "/cuentas/123",
        "Identidad de miembro estable."
      ],
      [
        "Filtrar",
        "/cuentas?status=activo",
        "Selecciona una vista de la colección."
      ],
      [
        "Acción auditable",
        "POST /cuentas/123/bloques",
        "Modela la acción como creación de recursos."
      ],
      [
        "evitar",
        "/executeBloqueioConta?id=123",
        "Combina RPC, parámetro y operación en un nombre inestable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.10 Semántica de los métodos HTTP",
    "id": "10-10-semantica-de-los-metodos-http"
  },
  {
    "kind": "paragraph",
    "text": "Los métodos HTTP llevan semántica compartida. GET solicita la transferencia de una representación; HEAD obtiene metadatos equivalentes sin el contenido; POST solicita al recurso de destino que procese la representación de acuerdo con su semántica; PUT reemplaza el estado de la representación en el identificador; DELETE solicita la eliminación de la asociación; PATCH aplica una modificación parcial; OPCIONES describe las opciones de comunicación."
  },
  {
    "kind": "paragraph",
    "text": "El método no es sólo un campo decorativo. Cachés, proxies, bibliotecas y mecanismos de reproducción toman decisiones basándose en ello. Un GET con un efecto secundario relevante puede activarse mediante captación previa, rastreador o revalidación. Un POST tratado como idempotente sin una clave de idempotencia puede duplicar transacciones cuando el cliente vuelve a intentarlo después de un tiempo de espera."
  },
  {
    "kind": "paragraph",
    "text": "PUT normalmente se dirige a un URI conocido. El cliente envía la representación deseada y, según el contrato, crea o reemplaza el recurso. POST se utiliza a menudo cuando el servidor selecciona el identificador o cuando la semántica no es una simple sustitución. La distinción debe ser observable en el contrato, no sólo en su implementación."
  },
  {
    "kind": "paragraph",
    "text": "A menudo se pasan por alto HEAD y OPTIONS. HEAD puede admitir validadores y comprobaciones de existencia siempre que los encabezados coincidan con GET. OPTIONS puede admitir CORS y el descubrimiento de capacidades, pero no reemplaza la documentación formal. TRACE generalmente está deshabilitado en producción por política de seguridad y rara vez es útil en las API empresariales."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Propiedades semánticas de los métodos HTTP. La idempotencia describe el efecto buscado, no la igualdad literal de respuestas.",
    "headers": [
      "Método",
      "Seguro",
      "idempotente",
      "Uso típico",
      "Respuestas frecuentes"
    ],
    "rows": [
      [
        "OBTENER",
        "si",
        "si",
        "Leer recurso o colección",
        "200, 206, 304, 404"
      ],
      [
        "CABEZA",
        "si",
        "si",
        "Leer metadatos sin contenido",
        "200, 304, 404"
      ],
      [
        "PUBLICAR",
        "No",
        "No por defecto",
        "Crear miembro o comando de proceso",
        "201, 202, 200, 409"
      ],
      [
        "poner",
        "No",
        "si",
        "Crear/reemplazar en URI conocido",
        "200, 201, 204, 412"
      ],
      [
        "PARCHE",
        "No",
        "Depende del formato",
        "Aplicar cambio parcial",
        "200, 204, 409, 412"
      ],
      [
        "BORRAR",
        "No",
        "si en intencion",
        "Eliminar asociación/recurso",
        "202, 204, 404"
      ],
      [
        "OPCIONES",
        "si",
        "si",
        "Opciones y CORS",
        "200, 204"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.11 Seguridad, Idempotencia y Reintentos",
    "id": "10-11-seguridad-idempotencia-y-reintentos"
  },
  {
    "kind": "paragraph",
    "text": "Un método seguro se define como de solo lectura en la intención del cliente. Esto no evita efectos incidentales como logs, métricas o cargos técnicos, siempre y cuando el cliente no haya solicitado un cambio de estado para esa interacción. GET y HEAD son seguros; POST, PUT, PATCH y DELETE no lo son. La seguridad semántica es relevante para la automatización, la precarga y la navegación."
  },
  {
    "kind": "paragraph",
    "text": "Idempotencia significa que varias solicitudes idénticas tienen el mismo efecto previsto que una sola solicitud. PUT y DELETE tienen una intención idempotente, aunque las respuestas pueden variar: el primer DELETE puede devolver 204 y el segundo 404. La propiedad ayuda a los clientes e intermediarios a decidir si se puede volver a intentar una operación después de una falla en el transporte."
  },
  {
    "kind": "paragraph",
    "text": "POST puede obtener un reintento seguro mediante la clave de idempotencia. El cliente envía un identificador único por intento lógico; el servidor almacena el resultado asociado y devuelve la misma operación cuando recibe nuevamente la clave con contenido compatible. La clave debe tener un alcance, fecha límite, reglas de colisión y persistencia definidos. Sólo la deduplicación corporal puede unir transacciones legítimas iguales."
  },
  {
    "kind": "paragraph",
    "text": "El tiempo de espera ambiguo es un escenario crítico. El cliente no sabe si el servidor procesó la solicitud antes de que fallara la conexión. En los pagos, repetir a ciegas puede duplicar la deuda. Un diseño robusto combina identificador de negocio, clave de idempotencia, consulta de estado y conciliación. El gateway puede validar la presencia y el formato de la clave, pero la deduplicación debe llegar a la capa que controla el efecto empresarial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.12 Códigos de estado y semántica de respuesta",
    "id": "10-12-codigos-de-estado-y-semantica-de-respuesta"
  },
  {
    "kind": "paragraph",
    "text": "Los códigos de estado clasifican el resultado de intentar procesar la solicitud. La clase 2xx indica éxito, 3xx redirección o uso de representación almacenada, 4xx condición atribuida a la solicitud o cliente y 5xx falla del servidor o intermediario. La elección debe representar el estado del protocolo, mientras que el cuerpo detalla el dominio del problema."
  },
  {
    "kind": "paragraph",
    "text": "200 es apropiado cuando hay representación de éxito. 201 indica creación y normalmente debe acompañar a Ubicación. 202 le informa que el tratamiento fue aceptado, no completado. 204 indica éxito sin contenido. Usar 200 para todas las situaciones y poner Success=false en el JSON evita que la infraestructura genérica, las métricas y los clientes interpreten correctamente la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Entre 4xx, 400 representa una solicitud sintáctica o semánticamente inválida en general; 401 requiere autenticación válida; 403 indica que se entiende la identidad, pero no se permite la acción; 404 informa que el recurso no fue encontrado o no puede ser revelado; 409 representa conflicto con el estado actual; 412 indica falla de condición previa; 422 puede representar contenido bien formado pero no procesable semánticamente."
  },
  {
    "kind": "paragraph",
    "text": "En 5xx, 500 cubre una falla inesperada del componente que responde; 502 indica una respuesta no válida desde el origen; 503 representa indisponibilidad temporal y puede incluir Reintento después; 504 indica tiempo de espera en sentido ascendente. En una arquitectura en capas, es esencial registrar qué componente produjo el código. Un 502 del gateway no debe confundirse con una respuesta del backend."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Códigos frecuentes en API corporativas y errores de interpretación.",
    "headers": [
      "Código",
      "Uso recomendado",
      "Error común"
    ],
    "rows": [
      [
        "200 bien",
        "Operación completada con representación.",
        "Se utiliza para ocultar errores en el cuerpo."
      ],
      [
        "201 creado",
        "Nuevo recurso creado; Ubicación recomendada",
        "Devolución sin identificador de recurso."
      ],
      [
        "202 Aceptado",
        "Se inició el procesamiento asincrónico",
        "Interpretarlo como la conclusión del trato."
      ],
      [
        "204 Sin contenido",
        "Éxito sin cuerpo",
        "Envíe JSON junto con 204."
      ],
      [
        "400 Solicitud incorrecta",
        "Mensaje o parámetros generales no válidos.",
        "Úselo para cualquier regla de dominio."
      ],
      [
        "401 No autorizado",
        "Credencial faltante o no válida",
        "Úselo cuando el usuario esté autenticado sin permiso."
      ],
      [
        "403 Prohibido",
        "Identidad sin autorización",
        "Revelar detalles confidenciales de la política."
      ],
      [
        "409 Conflicto",
        "Conflicto con el estado actual",
        "Úselo en lugar de la condición previa 412."
      ],
      [
        "429 Demasiadas solicitudes",
        "Límite excedido",
        "No informar ventana o Reintentar después."
      ],
      [
        "Servicio 503 no disponible",
        "Indisponibilidad temporal",
        "Uso en caso de incumplimiento permanente del contrato."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.13 Negociación de contenidos y formatos",
    "id": "10-13-negociacion-de-contenidos-y-formatos"
  },
  {
    "kind": "paragraph",
    "text": "Content-Type describe el tipo de contenido enviado. Aceptar expresa formatos aceptables para la respuesta. Cuando el servidor no puede producir un formato compatible, se puede utilizar 406; cuando no soporta el cuerpo recibido, es apropiado el 415. El tipo de medio es parte de la semántica y no debe inferirse únicamente de la extensión URI."
  },
  {
    "kind": "paragraph",
    "text": "JSON es común por su simplicidad y ecosistema, pero tiene decisiones que deben contraerse: representación de fechas, valores monetarios, números grandes, nulos, enumeraciones, nombres de propiedades y precisión. Los valores financieros no deberían depender del punto flotante binario sin una estrategia explícita. Un importe se puede modelar con una unidad mínima textual decimal o entera acompañada de la moneda."
  },
  {
    "kind": "paragraph",
    "text": "La negociación también puede implicar lenguaje, compresión y perfiles. Accept-Language permite preferencias de idioma, mientras que Content-Encoding describe la compresión. Los encabezados Vary deben reflejar dimensiones que alteran la respuesta para que los cachés no reutilicen representaciones incompatibles."
  },
  {
    "kind": "paragraph",
    "text": "Los tipos de medios específicos pueden desarrollar contratos con mayor precisión, pero aumentan la complejidad operativa. Para muchas organizaciones, la aplicación/json con versiones y documentación claras es suficiente. Lo importante es no mezclar múltiples estructuras incompatibles bajo el mismo tipo sin mecanismos de discriminación y pruebas contractuales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.14 PUT, PATCH y actualizaciones parciales",
    "id": "10-14-put-patch-y-actualizaciones-parciales"
  },
  {
    "kind": "paragraph",
    "text": "PUT representa la sustitución del estado de representación en el URI de destino. Si el contrato permite omitir campos con sentido de preservación, la operación deja de ser una reposición clara y se acerca más a un parche. Para evitar la pérdida de datos, el servidor debe documentar los campos obligatorios de solo lectura, los valores predeterminados y el comportamiento de las propiedades faltantes."
  },
  {
    "kind": "paragraph",
    "text": "PATCH aplica un conjunto de cambios y su comportamiento depende del tipo de medio. JSON Patch describe operaciones como agregar, eliminar, reemplazar y probar en rutas; JSON Merge Patch utiliza un documento similar a un recurso, donde null tiene una semántica de eliminación. Estos formatos resuelven diferentes problemas y deben elegirse conscientemente."
  },
  {
    "kind": "paragraph",
    "text": "La actualización parcial aumenta el riesgo de autorización por propiedad. Un cliente autorizado para editar un apellido puede intentar cambiar el límite, el estado o la propiedad. El servidor necesita validar los permisos a nivel de campo e ignorar silenciosamente propiedades no autorizadas rara vez es una buena opción, ya que enmascara errores y ataques. Devolver un problema explícito es más auditable."
  },
  {
    "kind": "paragraph",
    "text": "PUT y PATCH deben combinarse con condiciones previas cuando la concurrencia sea relevante. Sin If-Match, dos consumidores pueden leer la misma versión y el último sobrescribe los cambios del primero. Los validadores convierten esta condición en un conflicto detectable y permiten al cliente recargar el estado antes de volver a intentarlo."
  },
  {
    "kind": "code",
    "text": "# Ejemplo conceptual de JSON Patch\nPATCH /clientes/123\nContent-Type: application/json-patch+json\nIf-Match: \"v12\"\n[\n  {\"op\": \"replace\", \"path\": \"/apodo\", \"value\": \"Cuenta principal\"},\n  {\"op\": \"test\", \"path\": \"/situacion\", \"value\": \"ACTIVA\"}\n]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.15 Colecciones, filtros, clasificación y paginación",
    "id": "10-15-colecciones-filtros-clasificacion-y-paginacion"
  },
  {
    "kind": "paragraph",
    "text": "Las colecciones deben seguir siendo utilizables a medida que crece el volumen. Devolver todos los registros funciona en el laboratorio, pero produce latencia, consumo de memoria y riesgo de indisponibilidad. La API debe definir el tamaño predeterminado, el máximo permitido y el comportamiento cuando el cliente solicita un valor por encima del límite. Los límites deben existir en el backend, no solo en el gateway."
  },
  {
    "kind": "paragraph",
    "text": "La paginación compensada es simple y le permite saltar a una posición, pero puede repetir u omitir elementos cuando el conjunto cambia entre páginas. La paginación del cursor utiliza una posición opaca derivada de la clasificación y tiende a proporcionar una mejor continuidad al cambiar los datos. El cursor no debe exponer detalles internos que impidan el progreso o permitan una manipulación indebida."
  },
  {
    "kind": "paragraph",
    "text": "Los filtros y la clasificación deben restringirse a los campos admitidos. Aceptar expresiones arbitrarias puede generar consultas o inyecciones costosas. La API debe documentar operadores, valores múltiples, zona horaria, distinción entre mayúsculas y minúsculas y combinación Y/O. El gateway puede limitar el tamaño de la consulta, pero el servicio debe controlar el costo semántico."
  },
  {
    "kind": "paragraph",
    "text": "Los metadatos de paginación pueden aparecer en el cuerpo o en los enlaces. Informar a continuación es más confiable que pedirle al cliente que calcule el siguiente cursor. Los totales precisos pueden resultar costosos e inconsistentes en conjuntos grandes; el contrato debe distinguir total exacto, estimado o faltante. En las pantallas, a veces \"hay más\" es suficiente."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Estrategias de paginación y sus compromisos.",
    "headers": [
      "Estrategia",
      "Ventajas",
      "Limitaciones",
      "Uso indicado"
    ],
    "rows": [
      [
        "Compensación/límite",
        "Sencillo; permite saltos",
        "Inestable bajo inserciones; las compensaciones altas pueden ser costosas",
        "Informes y conjuntos moderados."
      ],
      [
        "pagina numerada",
        "Familiarizado con la interfaz de usuario",
        "Mismas limitaciones que el offset",
        "Navegación humana"
      ],
      [
        "Cursor",
        "Continuidad y rendimiento",
        "No permite saltos arbitrarios; el cursor debe ser opaco",
        "Feeds y grandes colecciones."
      ],
      [
        "Conjunto de claves",
        "Consulta eficiente por clave ordenada",
        "Requiere orden estable y compuesto",
        "Datos transaccionales de gran volumen"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.16 Errores estándar con Problem Details",
    "id": "10-16-errores-estandar-con-problem-details"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9457 define los Problem Details para contener errores legibles por máquina sin crear un nuevo formato para cada API. Los miembros básicos son tipo, título, estado, detalle e instancia. El tipo identifica una clase de problema por URI; el detalle explica el suceso específico; La instancia identifica la ocurrencia cuando corresponde. Las extensiones pueden agregar campos de dominio."
  },
  {
    "kind": "paragraph",
    "text": "El estado del cuerpo no reemplaza el código HTTP; ayuda cuando el objeto se almacena o viaja a través del contexto que separa los metadatos. El tipo no debe ser texto libre mutable. Un URI controlado por la organización puede documentar significado, campos y acciones recomendadas. Los clientes deben tratar las extensiones desconocidas con tolerancia."
  },
  {
    "kind": "paragraph",
    "text": "Los errores de validación pueden incluir una colección de infracciones con la ruta, el código y el mensaje. No incluya stack trace, consulta SQL, nombre de servidor ni detalles de política. La respuesta externa debe apoyar la corrección sin exponer la implementación. El identificador de correlación permite encontrar detalles internos en registros protegidos."
  },
  {
    "kind": "paragraph",
    "text": "La estandarización reduce el código especial para los consumidores y mejora la observabilidad. El gateway puede convertir sus propios fallos técnicos al mismo formato, pero debe preservar origen y categoría. Un problema de autenticación generado por el gateway no debe utilizar el mismo tipo de regla comercial generada por el backend."
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.empresa.example/problemas/cuenta-bloqueada\",\n  \"title\": \"La cuenta no permite movimientos\",\n  \"status\": 409,\n  \"detail\": \"La cuenta 123 está bloqueada para débitos.\",\n  \"instance\": \"/incidencias/req-7f2a\",\n  \"codigo\": \"CUENTA_BLOQUEADA\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Error público y diagnóstico interno."
  },
  {
    "kind": "paragraph",
    "text": "La respuesta debe ser estable y segura. Los registros internos pueden contener stack trace y contexto técnico, vinculados por ID de solicitud. No transmita detalles internos al consumidor sólo para facilitar el soporte."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.17 Cache Condicional, ETag y Concurrencia",
    "id": "10-17-cache-condicional-etag-y-concurrencia"
  },
  {
    "kind": "paragraph",
    "text": "Los validadores le permiten verificar si una representación ha cambiado. ETag es un identificador asignado a la versión de la representación; La última modificación utiliza la fecha de modificación. En las lecturas, If-None-Match puede dar como resultado 304 No modificado. En los cambios, If-Match requiere que la versión actual coincida con el validador enviado y evita la sobrescritura silenciosa."
  },
  {
    "kind": "paragraph",
    "text": "ETag fuerte indica equivalencia byte a byte según las reglas del protocolo; Una ETag débil indica suficiente equivalencia semántica para el almacenamiento en caché, pero no para algunas operaciones de rango. La API debe evitar calcular hash costoso de cuerpos grandes cuando una versión de dominio o un identificador de persistencia ya proporciona un validador adecuado."
  },
  {
    "kind": "paragraph",
    "text": "El control de concurrencia optimista es especialmente importante en registros y configuraciones. El cliente lee v7, lo cambia y envía If-Match: \"v7\". Si otro proceso ya produjo v8, el servidor devuelve 412. Luego, el cliente decide si recargar, fusionar o abandonar. El gateway no debe anular automáticamente esta decisión."
  },
  {
    "kind": "paragraph",
    "text": "Las condiciones previas también protegen la creación. If-None-Match: * puede solicitar que la operación se realice solo si el recurso no existe. Este mecanismo es útil cuando el cliente conoce el URI y quiere evitar sustituciones accidentales. La semántica debe probarse en todos los intermediarios para garantizar que se conserven los encabezados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/es/figure-03.svg",
    "alt": "Lectura condicional y control de concurrencia optimista con ETag",
    "caption": "Figura 3: Los validadores permiten la revalidación y el control de concurrencia optimista sin una sesión del servidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.18 Operaciones asincrónicas y procesos largos",
    "id": "10-18-operaciones-asincronicas-y-procesos-largos"
  },
  {
    "kind": "paragraph",
    "text": "Una operación que requiere minutos no debe mantener la conexión abierta indefinidamente. El servidor puede aceptar la solicitud, crear un recurso de operación y devolver 202 con Location para consulta. El recurso representa el progreso, los resultados, las fallas y las marcas de tiempo, lo que permite al consumidor reanudar el monitoreo después de la desconexión."
  },
  {
    "kind": "paragraph",
    "text": "El estado de la operación debe tener un ciclo de vida claro: recibida, procesando, completada, fallida, cancelada o vencida. El porcentaje sólo debe usarse cuando tenga significado. Para etapas sin pronóstico confiable, informar la etapa actual. El resultado se puede incrustar, vincular o poner a disposición como un recurso independiente."
  },
  {
    "kind": "paragraph",
    "text": "Retry-After indica cuándo volver a consultar, pero el cliente debe utilizar retrocesos y límites. Los webhooks pueden reducir el sondeo, pero introducen autenticación, entrega al menos una vez, reintento y validación de destino. Una arquitectura puede combinar un recurso consultable con un webhook, lo que garantiza la recuperación cuando falla la notificación."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones asincrónicas también necesitan idempotencia. Repetir la creación después del tiempo de espera debería devolver la misma operación lógica cuando la clave es igual. El gateway puede imponer breves tiempos de espera de conexión sin cancelar el procesamiento en el backend; por lo tanto, el estado y la correlación deben sobrevivir a la terminación de la conexión original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.19 Compatibilidad y versiones",
    "id": "10-19-compatibilidad-y-versiones"
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones es una consecuencia de cambios incompatibles, no un objetivo en sí mismo. La adición de campos opcionales suele ser compatible con los clientes tolerantes, mientras que eliminar campos, cambiar el tipo, cambiar el nombre de la enumeración o cambiar el significado puede perjudicar a los clientes. La organización necesita definir su política de compatibilidad y probarla automáticamente."
  },
  {
    "kind": "paragraph",
    "text": "La versión en la ruta, como /v1, es visible y fácil de enrutar, pero hace que la versión forme parte de todos los identificadores. La versión por encabezado o tipo de medio conserva el URI, pero puede ser menos obvia y requerir soporte específico. Ninguna estrategia elimina la necesidad de gobernanza, catalogación, deprecación y migración."
  },
  {
    "kind": "paragraph",
    "text": "Evite crear v2 mediante cualquier adición. Múltiples versiones simultáneas aumentan los costos de seguridad, operación y datos. Las técnicas de evolución incluyen campos aditivos, valores predeterminados, tolerancia a incógnitas, expansión controlada y puntos finales de compatibilidad temporal. Los cambios semánticos deben documentarse incluso cuando el esquema sigue siendo el mismo."
  },
  {
    "kind": "paragraph",
    "text": "La deprecación debe ser observable. El equipo necesita identificar consumidores, comunicar plazos, medir el tráfico y proporcionar un entorno de prueba. Los encabezados de deprecación estandarizados y los enlaces a la documentación pueden complementar la comunicación. Cerrar una versión basándose únicamente en la fecha, sin confirmar la migración de flujos críticos, es un riesgo operativo."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: la compatibilidad depende del comportamiento del consumidor, no solo del esquema.",
    "headers": [
      "Cambiar",
      "¿Sueles ser compatible?",
      "Nota"
    ],
    "rows": [
      [
        "Agregar campo opcional",
        "si",
        "Los clientes deben ignorar los campos desconocidos."
      ],
      [
        "Agregar enumeración recibida por el cliente",
        "tal vez no",
        "Los clientes con un conmutador cerrado pueden fallar."
      ],
      [
        "Eliminar o cambiar el nombre del campo",
        "No",
        "Requiere migración o versionado."
      ],
      [
        "Aumentar límite máximo",
        "Generalmente",
        "Puede afectar el rendimiento y las validaciones."
      ],
      [
        "Hacer obligatorio el campo opcional",
        "No",
        "Romper las solicitudes existentes."
      ],
      [
        "Cambiar de significado sin cambiar de esquema",
        "No",
        "Es una ruptura semántica difícil de detectar."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Tabla 5: la compatibilidad depende del comportamiento del consumidor, no solo del esquema."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.20 Descubrimiento de hipermedia y transición",
    "id": "10-20-descubrimiento-de-hipermedia-y-transicion"
  },
  {
    "kind": "paragraph",
    "text": "Hipermedia como controlador del estado de la aplicación significa que las representaciones incluyen controles que guían posibles acciones. Un pago pendiente puede mostrar un enlace para cancelar; un pago completado puede mostrar un enlace al comprobante. El consumidor sigue relaciones conocidas en lugar de construir URI a partir de reglas externas."
  },
  {
    "kind": "paragraph",
    "text": "El beneficio es reducir el acoplamiento con la estructura de ruta y permitir que el servidor varíe las transiciones según el estado y la autorización. El costo es definir tipos de medios, relaciones y clientes capaces de interpretar los controles. En integraciones internas simples, es posible que la recompensa no justifique una implementación completa, pero los enlaces siguen siendo útiles para la navegación y el descubrimiento."
  },
  {
    "kind": "paragraph",
    "text": "Los enlaces no reemplazan la autorización. La ausencia de un enlace puede guiar la interfaz, pero el servidor debe rechazar las llamadas no permitidas. Asimismo, presentar un enlace no garantiza que la operación siga siendo válida, ya que el estado puede cambiar antes de su uso. El cliente debe abordar los conflictos y las condiciones previas."
  },
  {
    "kind": "paragraph",
    "text": "Un enfoque pragmático incluye enlaces a recursos relacionados, paginación, operación asincrónica, documentación de problemas y deprecación. Las relaciones deben tener nombres estables y significado documentado. Devolver solo URL sin una relación explícita obliga al cliente a interpretar cadenas y pierde parte del valor hipermedia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.21 OpenAPI y diseño orientado al contrato",
    "id": "10-21-openapi-y-diseno-orientado-al-contrato"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI proporciona una descripción legible por máquinas y humanos para las API HTTP. La versión 3.2.0 amplía la especificación manteniendo el objetivo de describir operaciones, parámetros, cuerpos, respuestas, seguridad y componentes reutilizables. El documento puede admitir la generación de documentación, simulacros, validación, SDK y pruebas, pero debe permanecer alineado con el tiempo de ejecución."
  },
  {
    "kind": "paragraph",
    "text": "En el diseño contract-first, los equipos definen la semántica y los ejemplos antes o en paralelo con la implementación. Esto permite la revisión, la seguridad y la arquitectura del consumidor. Code-first puede acelerar los servicios pequeños, pero tiende a capturar los detalles de implementación y producir contratos menos intencionales. Ambos enfoques requieren un pipeline que detecte la divergencia."
  },
  {
    "kind": "paragraph",
    "text": "Los esquemas deben representar restricciones reales: obligatorios, formatos, límites, enumeraciones, nulabilidad y composición. Los ejemplos deben ser válidos y variados, incluidos los errores. Las descripciones no deben repetir el nombre del campo; deben explicar significado, unidad, origen y reglas. Las operaciones necesitan identificadores estables para herramientas y gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "Una especificación completa no garantiza una buena API. Puede documentar cuidadosamente puntos finales inconsistentes. Las revisiones deben combinar validación estructural, estándares corporativos, pruebas de compatibilidad y análisis semántico humano. El contrato publicado también debe indicar la política de SLA, los límites, la autenticación, el soporte y el ciclo de vida."
  },
  {
    "kind": "code",
    "text": "openapi: 3.2.0\ninfo:\n  title: API de Cuentas\n  version: 1.4.0\npaths:\n  /cuentas/{cuentaId}:\n    get:\n      operationId: obtenerCuenta\n      parameters:\n        - name: cuentaId\n          in: path\n          required: true\n          schema: { type: string }\n      responses:\n        \"200\":\n          description: Cuenta encontrada\n        \"404\":\n          description: Cuenta no encontrada"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.22 Seguridad y autorización en API REST",
    "id": "10-22-seguridad-y-autorizacion-en-api-rest"
  },
  {
    "kind": "paragraph",
    "text": "REST no define autenticación o autorización. Las API suelen utilizar TLS, OAuth 2.0, OpenID Connect, mTLS, firmas o mecanismos empresariales. La seguridad debe ser impuesta por los recursos, la operación y la propiedad. Autenticar a un cliente no significa autorizar el acceso a ningún objeto."
  },
  {
    "kind": "paragraph",
    "text": "Broken Object Level Authorization ocurre cuando el servidor acepta un identificador y no verifica si la identidad puede acceder a ese objeto. La protección debe estar en el dominio o en la capa de autorización, no solo en ocultar las identificaciones. Los identificadores no secuenciales reducen la enumeración, pero no reemplazan la verificación."
  },
  {
    "kind": "paragraph",
    "text": "La mass assignment y la autorización de propiedad surgen cuando la API vincula automáticamente el organismo con entidades internas. El contrato debe utilizar plantillas de entrada específicas y listas permitidas. Campos como perfil, límite, propietario y estado no se pueden cambiar simplemente porque aparecen en JSON."
  },
  {
    "kind": "paragraph",
    "text": "También se requieren límites de consumo, validación de URL externa, protección SSRF, tamaño máximo del cuerpo, tiempos de espera y controles de flujo de negocios. El gateway es adecuada para autenticación, cuotas y filtros generales; Decisiones como \"este usuario puede usar esta cuenta en este momento\" dependen del contexto del dominio."
  },
  {
    "kind": "subhead",
    "text": "Principio de autorización"
  },
  {
    "kind": "paragraph",
    "text": "Valide la identidad, el rol, el recurso específico, la operación y las propiedades modificadas. Verificar únicamente a nivel de punto final es insuficiente para objetos con diferentes propietarios y reglas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.23 REST en API Gateways y Políticas Empresariales",
    "id": "10-23-rest-en-api-gateways-y-politicas-empresariales"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway recibe un mensaje HTTP y puede finalizar TLS, autenticar, validar token, aplicar cuota, transformar encabezados, enrutar y registrar métricas. Es parte del sistema en capas y debe preservar la semántica del contrato. Las políticas deben distinguir los errores del consumidor, del gateway y del backend para no convertir todas las fallas en respuestas indistinguibles."
  },
  {
    "kind": "paragraph",
    "text": "La validación del esquema en el gateway bloquea los mensajes no válidos antes del backend, pero debe utilizar la misma versión del contrato. La divergencia entre especificación, política y código produce falsos negativos o diferentes aceptaciones según el entorno. El pipeline debe publicar el contrato y la configuración como artefactos relacionados, con pruebas de un extremo a otro."
  },
  {
    "kind": "paragraph",
    "text": "Las transformaciones son útiles para la compatibilidad y la mediación, pero crean una segunda implementación de la API. Es necesario realizar un seguimiento de los cambios de nombres, valores predeterminados y tipos. Las transformaciones extensas del gateway tienden a ocultar la deuda de backend y dificultar la troubleshooting, especialmente cuando los registros no muestran un mensaje antes y después de la política."
  },
  {
    "kind": "paragraph",
    "text": "La limitación de velocidad puede utilizar el consumidor, la aplicación, la operación o el recurso como clave. El límite global por IP puede castigar a los usuarios detrás de NAT. Los encabezados de reintento posterior y de cuota ayudan a los clientes, pero no deben exponer detalles confidenciales. El gateway también necesita proteger sus conexiones con los servidores mediante la agrupación, los tiempos de espera y la interrupción de circuitos sin cambiar indebidamente el código comercial."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/es/figure-04.svg",
    "alt": "REST en una plataforma empresarial con políticas transversales en API Gateway",
    "caption": "Figura 4 - El portal aplica políticas transversales; el servicio sigue siendo responsable de la semántica del recurso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.24 Observabilidad y troubleshooting",
    "id": "10-24-observabilidad-y-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting debe localizar la capa antes de discutir el diseño del punto final. Se produce un error de DNS, tiempo de espera de conexión o protocolo de enlace TLS antes de la semántica REST. El gateway puede generar un 401; un 404 puede provenir del enrutamiento o del backend; un 504 puede indicar que el gateway esperó más allá del límite para un flujo ascendente. Los registros deben identificar al productor de la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Método de registro, plantilla de ruta, estado, duración, tamaño, consumidor, operación e ID de correlación. Evite registrar tokens, datos personales y cuerpos completos innecesariamente. La plantilla /clientes/{id} es más útil para métricas agregadas que el URI con cada identificador. Los seguimientos deben propagar el contexto a las dependencias internas."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas por código deben interpretarse semánticamente. El crecimiento de 409 puede indicar competencia esperada o regresión de las reglas; 429 puede ser protección funcionando; 404 podría ser una enumeración maliciosa o una falla del catálogo. Combine métricas con registros estructurados, seguimientos y eventos de cambios de configuración."
  },
  {
    "kind": "paragraph",
    "text": "Para reproducir problemas, conserve el método, la URI, los encabezados relevantes, el cuerpo desinfectado, la marca de tiempo y el entorno. Compare el mensaje observado por el gateway con el recibido en el backend. Herramientas como curl le permiten controlar los encabezados y mostrar la negociación, pero las pruebas deben respetar las políticas de autorización y entorno."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Clasificación inicial de síntomas en una arquitectura API.",
    "headers": [
      "Síntoma",
      "capa probable",
      "Evidencia temprana"
    ],
    "rows": [
      [
        "El nombre no funciona",
        "DNS",
        "Consulta el solucionador utilizado por el tiempo de ejecución."
      ],
      [
        "Conexión rechazada",
        "TCP/escucha",
        "IP, puerto, firewall y proceso de escucha."
      ],
      [
        "Fallo del certificado",
        "TLS",
        "SNI, cadena, nombre de host y almacén de confianza."
      ],
      [
        "401 antes del backend",
        "Gateway/identidad",
        "Autenticación y registro de emisor/audiencia."
      ],
      [
        "404 para una sola ruta",
        "Gateway o aplicación",
        "Plantilla publicada y registro de acceso al backend."
      ],
      [
        "409/412",
        "Dominio/condición previa",
        "Versión del recurso y encabezados If-Match."
      ],
      [
        "429",
        "Política de consumo",
        "Clave de cuota, ventana y reintento posterior."
      ],
      [
        "502/504",
        "Gateway/ascendente",
        "Conexión/lectura del tiempo de espera y estado del grupo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.25 Estudios de casos y laboratorios",
    "id": "10-25-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: creación de pago después del tiempo de espera"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación envía POST/pagos y recibe un tiempo de espera. El servidor completó el débito, pero la respuesta se perdió entre el gateway y el cliente. La aplicación repite la solicitud y crea un segundo pago. El problema no es sólo el tiempo de espera; es la ausencia de identidad para el intento lógico. El contrato debe requerir una clave de idempotencia y proporcionar un recurso consultable mediante un identificador de negocio."
  },
  {
    "kind": "paragraph",
    "text": "La investigación debe correlacionar los ID de solicitud, la clave de idempotencia, el identificador de pago y los eventos del libro mayor. Es posible que el gateway haya terminado la espera en 30 segundos mientras que el backend terminó en 32. La solución incluye reducir la latencia, alinear los tiempos de espera e implementar la deduplicación en la capa que controla el efecto financiero."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: actualización perdida en el registro"
  },
  {
    "kind": "paragraph",
    "text": "Dos canales leen la versión 5 de un cliente. Uno cambia de dirección y otro de número de teléfono. Ambos envían PUT completo. El segundo sobrescribe el cambio del primero porque no existe ninguna condición previa. La API parece funcionar correctamente, pero se perdieron datos. ETag y If-Match permitirían detectar la versión divergente y devolver 412."
  },
  {
    "kind": "paragraph",
    "text": "La solución también requiere decidir si el PUT completo es apropiado o si las operaciones parciales representan mejor las intenciones. PATCH reduce el área de conflicto, pero no elimina la competencia. Los validadores siguen siendo necesarios cuando dos cambios afectan la misma propiedad o regla."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: paginación inestable"
  },
  {
    "kind": "paragraph",
    "text": "Una consulta utiliza compensación con orden por fecha. Entre la página 1 y la página 2, los nuevos registros se insertan al principio. Algunos elementos se repiten y otros no aparecen. Para un feed transaccional, un cursor basado en la fecha y el identificador ofrece una posición estable, siempre que se complete el pedido y se valide el cursor."
  },
  {
    "kind": "paragraph",
    "text": "El contrato debe indicar si la vista es una instantánea o un flujo cambiante. Los totales pueden diferir. Para la auditoría, es posible que necesite crear una función de informes divididos en el tiempo; para la navegación operativa, la coherencia final puede ser aceptable."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1 - Semántica y condiciones previas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Ejecute GET en un recurso y registre ETag, Cache-Control, Content-Type y status.",
      "Repita con If-None-Match y verifique si el servidor devuelve 304 sin suplantación.",
      "Envíe la actualización con If-Match correcto y observe el nuevo validador.",
      "Vuelva a intentar usar el validador anterior y confirme 412 o el comportamiento documentado.",
      "Compare los registros de gateway y backend para identificar la preservación del encabezado."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2 - Contrato y errores"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Validar un documento OpenAPI con una herramienta autorizada por la organización.",
      "Cree ejemplos de 400, 401, 403, 404, 409, 412, 429 y 503 en formato Problem Details.",
      "Confirme que ningún error exponga el seguimiento de la pila, el token, el host interno o los datos personales.",
      "Verifique que el tipo, el código y el ID de correlación permanezcan estables entre entornos.",
      "Pruebe si el gateway conserva la aplicación/problema+json de tipo de contenido."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3 - Paginación y costo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Genere un conjunto de pruebas con inserciones simultáneas y compare el desplazamiento con el cursor.",
      "Mida la latencia para aumentar las compensaciones y para la paginación de conjuntos de claves.",
      "Pruebe filtros y clasificaciones no compatibles y confirme el rechazo predecible.",
      "Valide el límite máximo de tamaño de página en el gateway y el backend.",
      "Documente el significado del cursor total, siguiente y caducado."
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
    "text": "REST es un estilo arquitectónico formado por restricciones que producen propiedades para sistemas distribuidos. El diseño de API debe comenzar con recursos, representaciones y semántica compartida, no con una lista de puntos finales. HTTP ofrece métodos, códigos, encabezados, caché y condiciones previas que le permiten expresar intenciones de forma interoperable."
  },
  {
    "kind": "paragraph",
    "text": "Las buenas prácticas no son reglas estéticas aisladas. Los URI estables, los métodos correctos, la idempotencia, los errores estandarizados, la paginación, la compatibilidad y la observabilidad reducen el acoplamiento y las fallas operativas. Las API Gateways aplican políticas transversales, pero no reemplazan la autorización de dominio ni arreglan contratos semánticamente frágiles."
  },
  {
    "kind": "paragraph",
    "text": "Una API empresarial madura es predecible para los consumidores y operativa para los equipos. Le indica cuándo se pueden reutilizar las respuestas, protege las actualizaciones simultáneas, expone procesos largos como recursos, evoluciona de manera compatible y registra suficiente evidencia para localizar fallas en cada capa."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lista de verificación del proyecto"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿Los recursos tienen una identidad estable y no reflejan directamente tablas internas?",
      "¿Los métodos y códigos mantienen la semántica HTTP?",
      "¿Son seguros GET y HEAD y las operaciones repetibles tienen una estrategia de idempotencia?",
      "¿Están permitidos y autorizados explícitamente los campos de entrada?",
      "¿Se han evaluado Cache-Control, ETag, Vary y condiciones previas?",
      "¿Las colecciones tienen límites, paginación y ordenamiento estable?",
      "¿Los errores utilizan un formato coherente sin detalles confidenciales?",
      "¿Las operaciones prolongadas exponen el estado y la función de recuperación?",
      "¿Los cambios están sujetos a análisis de compatibilidad e inventario de consumidores?",
      "¿Se validan OpenAPI, el gateway y la implementación en el mismo proceso?",
      "¿Los registros y seguimientos identifican qué componente produjo la respuesta?"
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
      "Explique por qué utilizar métodos JSON y HTTP no es suficiente para caracterizar REST.",
      "Diferenciar entre estado de recurso y estado de sesión.",
      "Dé un ejemplo en el que POST necesite una clave de idempotencia.",
      "Compare el conflicto 409 y la condición previa 412 fallida.",
      "Modele una solicitud de bloqueo de tarjeta como recurso, indicando URI, método y respuestas.",
      "Establezca una política de paginación para declaraciones con nuevas versiones simultáneas.",
      "Cree Problem Details para el límite diario excedido sin exponer una regla interna confidencial.",
      "Enumere los cambios de esquema que pueden perjudicar a los clientes incluso sin eliminar los puntos finales.",
      "Explique qué responsabilidades pertenecen a el gateway y cuáles permanecen en el servicio.",
      "Describir una hoja de ruta de diagnóstico para 504 observada por el consumidor."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Glosario"
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Glosario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "validador de caché",
        "Metadatos utilizados para comprobar si una representación ha cambiado, como ETag."
      ],
      [
        "cliente-servidor",
        "Separación de responsabilidades entre la interfaz del consumidor y el proveedor de recursos."
      ],
      [
        "Cursor",
        "Token opaco que representa la posición en una colección paginada."
      ],
      [
        "etiqueta ET",
        "Valor que identifica una versión de suplantación para caché y condiciones previas."
      ],
      [
        "ODIAOAS",
        "Uso de hipermedia para guiar las transiciones de estado de las aplicaciones."
      ],
      [
        "Idempotencia",
        "Propiedad de múltiples solicitudes iguales que producen el mismo efecto deseado."
      ],
      [
        "Interfaz uniforme",
        "Semántica común para identificar y manipular recursos mediante mensajes autónomos."
      ],
      [
        "tipo de medio",
        "Formato de contenido e identificador semántico."
      ],
      [
        "Condición previa",
        "Condición expresada por encabezados como If-Match antes de ejecutar la operación."
      ],
      [
        "Problem Details",
        "Formato estandarizado por RFC 9457 para errores en las API HTTP."
      ],
      [
        "Representación",
        "Secuencia de bytes y metadatos que expresan una vista del estado de un recurso."
      ],
      [
        "Característica",
        "Abstracción identificable cuyo estado puede representarse y manipularse."
      ],
      [
        "REST",
        "Estilo arquitectónico de transferencia de estado representacional."
      ],
      [
        "Seguro",
        "Método cuya intención es de solo lectura, como GET."
      ],
      [
        "stateless",
        "Restricción que evita la dependencia del estado conversacional oculto entre solicitudes."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Referencias técnicas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "FIELDING, Roy T. Estilos arquitectónicos y diseño de arquitecturas de software basadas en red. Universidad de California, Irvine, 2000. Capítulo 5: Transferencia estatal representativa.",
      "IETF. RFC 9110 - Semántica HTTP. 2022.",
      "IETF. RFC 9111: almacenamiento en caché HTTP. 2022.",
      "IETF. RFC 3986 - Identificador uniforme de recursos: sintaxis genérica. 2005.",
      "IETF. RFC 8259: formato de intercambio de datos de notación de objetos JavaScript. 2017.",
      "IETF. RFC 5789: Método PATCH para HTTP. 2010.",
      "IETF. RFC 6902: parche de notación de objetos JavaScript. 2013.",
      "IETF. RFC 7386: parche de fusión JSON. 2014.",
      "IETF. RFC 9457: Problem Details para las API HTTP. 2023.",
      "IETF. RFC 6585: códigos de estado HTTP adicionales. 2012.",
      "Iniciativa OpenAPI. Especificación OpenAPI 3.2.0. 2025.",
      "OWASP. API Security Top 10 - Edición 2023.",
      "OWASP. Los 10 principales riesgos de seguridad de las aplicaciones web: edición 2025."
    ]
  },
  {
    "kind": "subhead",
    "text": "Cierre"
  },
  {
    "kind": "paragraph",
    "text": "En el siguiente capítulo, el curso puede profundizar en la semántica HTTP y el modelado de contratos, o pasar a los mecanismos de autenticación y autorización según la secuencia oficial FAAC. Los conceptos de este capítulo seguirán siendo la base de cualquier estilo de API HTTP."
  }
];
