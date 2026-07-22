import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const API_VERSIONING_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Evolución controlada: cambiar sin sorprender a los consumidores"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/es/overview.svg",
    "alt": "Contrato, cambio, convivencia, depreciación y retiro como etapas de evolución de API",
    "caption": "Figura de apertura: la evolución segura transforma el cambio en un proceso observable y gobernado."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La compatibilidad la percibe el consumidor; El control de versiones es sólo un mecanismo de coordinación."
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
    "text": "En el capítulo anterior, la limitación de tasas, las cuotas y la limitación se presentaron como parte del contrato operativo de una API. Reducir un límite, cambiar la unidad de consumo o modificar el comportamiento de una respuesta 429 puede romper a los consumidores incluso cuando no se han modificado campos JSON. Esta observación conduce al tema central de este capítulo: una API es compatible cuando sigue cumpliendo con las expectativas legítimas del consumidor, no sólo cuando el archivo OpenAPI todavía se puede analizar."
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones de API a menudo se reduce a la elección entre poner v1 en la ruta, en un encabezado o en un parámetro. Esta elección es importante, pero sólo representa la parte visible. El verdadero problema es coordinar la evolución en un sistema distribuido: se han publicado contratos, se han generado SDK, las aplicaciones han incorporado comportamientos y las integraciones pueden estar fuera del control directo del proveedor. Cambiar la API ahora requiere análisis de impacto, comunicación, coexistencia y evidencia de migración."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de vida amplía este análisis. Una versión debe nacer con criterios de estabilidad, activarse, recibir correcciones, comunicar cambios, depreciarse y eventualmente retirarse. Sin gobernanza, las versiones se acumulan en la API Gateway, las vulnerabilidades permanecen en contratos antiguos y los consumidores sólo descubren el retiro cuando falla el tráfico."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta modelos de compatibilidad, taxonomía de cambios, estrategias de selección de versiones, evolución de esquemas, control de versiones en REST, GraphQL, gRPC y eventos, versiones y revisiones en Azure API Management, depreciación con headers Deprecation y Sunset, telemetría, pruebas de contratos y el patrón expandir-migrar-contrato."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada cambio, responda: quién produce los datos, quién los interpreta, qué comportamiento pasado se prometió, qué consumidores aún dependen de ellos y qué evidencia demuestra que el cambio es seguro. Evite clasificar los cambios solo por la apariencia de la diferencia."
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
      "Explique por qué la evolución de API es un problema de contrato distribuido y no solo un problema de código.",
      "Distinguir la compatibilidad sintáctica, estructural, semántica, conductual y operativa.",
      "Clasificar cambios en solicitudes, respuestas, esquemas, errores, seguridad y límites.",
      "Aplicar críticamente el control de versiones semántico a API remotas.",
      "Compare el control de versiones por ruta, query string, encabezado, tipo de medio y datos.",
      "Planificar convivencia, migración y retiro de versiones en API Gateways.",
      "Diferenciar versión pública, revisión, lanzamiento de implementación y versión de especificación.",
      "Utilice Deprecation, Sunset, registros de cambios y guías de migración.",
      "Aplicar diferencias semánticas, pruebas de contrato, telemetría y puertas de calidad.",
      "Diagnostique rutas incorrectas, desvíos de contratos y consumidores atascados en versiones antiguas."
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
      "28.1 Por qué las API necesitan evolucionar; 28.2 Contrato público; 28.3 Dimensiones de compatibilidad; 28.4 Dirección de los datos; 28.5 Taxonomía de cambios; 28,6 SemVer; 28.7 Dimensiones de la versión; 28.8Ruta; 28.9 Consulta, encabezado y tipo de medio; 28.10 Versiones por fecha; 28.11 Criterios de elección; 28.12 Esquemas y enumeraciones; 28.13 Operaciones, errores, seguridad y límites; 28.14 REST, GraphQL, gRPC y eventos; 28.15 Datos persistentes; 28.16 Convivencia; 28.17 APIM de Azure; 28.18 Ciclo de vida; 28.19 Depreciación y Sunset; 28.20 Comunicación; 28.21 Telemetría; 28.22 Diferencias y pruebas; 28.23 Ampliar-migrar-contraer; 28.24 API Gateway y troubleshooting; 28.25 Estudios de casos y laboratorios."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.1 Por qué las API necesitan evolucionar",
    "id": "28-1-por-que-las-api-necesitan-evolucionar"
  },
  {
    "kind": "paragraph",
    "text": "Las API evolucionan porque el dominio cambia. Las nuevas reglas regulatorias, productos, canales, socios y requisitos de seguridad requieren información adicional o comportamientos diferentes. También hay razones técnicas: corregir el modelado, mejorar el rendimiento, reemplazar dependencias, adoptar nuevos formatos y eliminar vulnerabilidades. Congelar una interfaz para siempre transfiere costos al backend, que comienza a mantener adaptaciones y excepciones indefinidamente."
  },
  {
    "kind": "paragraph",
    "text": "Al mismo tiempo, una API publicada crea dependencia. El consumidor puede compilar un SDK, conservar respuestas, validar enumeraciones como conjuntos cerrados, usar un estado HTTP para control de flujo o asumir ciertos pedidos. Estos supuestos no siempre aparecen en el contrato formal. Un pequeño cambio en el proveedor puede resultar perjudicial para las aplicaciones que han incorporado el comportamiento anterior."
  },
  {
    "kind": "paragraph",
    "text": "La evolución segura separa el cambio interno del cambio observable. Refactorizar clases, cambiar bases de datos o mover el servicio entre clústeres no requiere una nueva versión cuando el contrato y las características prometidas permanecen. Cambiar un campo obligatorio, eliminar un valor aceptado o cambiar la semántica de la operación afecta la interfaz pública, incluso si la URL sigue siendo la misma."
  },
  {
    "kind": "subhead",
    "text": "Principio de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "Una nueva implementación no implica automáticamente una nueva versión pública. Se requiere una nueva versión pública cuando el contrato observable cambia de manera incompatible o cuando la organización necesita ofrecer explícitamente comportamientos diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.2 El contrato público de una API",
    "id": "28-2-el-contrato-publico-de-una-api"
  },
  {
    "kind": "paragraph",
    "text": "El contrato público incluye todo lo que el consumidor puede observar y está autorizado a confiar. Las rutas, métodos, parámetros, esquemas, estados, headers, tipos de medios y requisitos de seguridad forman la parte explícita. La latencia, los límites, el orden, la coherencia, la idempotencia, la política de reintento y la ventana de disponibilidad acordados pueden formar una parte operativa igualmente relevante."
  },
  {
    "kind": "paragraph",
    "text": "El acuerdo no se limita al documento OpenAPI. También existe en la API Gateway, la implementación, el portal, los SDK y el comportamiento de producción real. Cuando estas representaciones divergen, surge la deriva contractual. Comparar la nueva propuesta sólo con un archivo obsoleto produce una falsa seguridad; la línea base debe coincidir con la versión realmente publicada y compatible."
  },
  {
    "kind": "paragraph",
    "text": "El consumidor no necesita conocer detalles internos, pero sí previsibilidad. El proveedor puede cambiar la implementación libremente preservando la semántica y las garantías. El límite entre la libertad interna y el compromiso externo es la esencia de una estrategia de control de versiones madura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.3 Dimensiones de compatibilidad",
    "id": "28-3-dimensiones-de-compatibilidad"
  },
  {
    "kind": "paragraph",
    "text": "La compatibilidad sintáctica significa que el mensaje aún se puede analizar. La compatibilidad estructural indica que los tipos, propiedades y restricciones siguen siendo aceptados. La compatibilidad semántica requiere que el significado permanezca. La compatibilidad de comportamiento analiza efectos, transiciones y errores. La compatibilidad operativa incluye rendimiento, disponibilidad, límites y características necesarias para que el consumidor cumpla sus propios objetivos."
  },
  {
    "kind": "paragraph",
    "text": "Una API puede seguir siendo estructuralmente compatible y romperse semánticamente: el campo sigue siendo una cadena, pero el mismo valor comienza a significar otro estado. También puede mantener la semántica y fallar operativamente cuando la paginación disminuye, el límite de velocidad se reduce o el tiempo de espera aumenta más allá del recorrido del consumidor. La diferencia de contrato es necesaria pero no suficiente."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: La compatibilidad debe evaluarse en varias dimensiones.",
    "headers": [
      "Dimensión",
      "Pregunta de verificación",
      "Ejemplo de ruptura"
    ],
    "rows": [
      [
        "Sintáctica",
        "¿Aún se puede leer el mensaje?",
        "Tipo de medio eliminado o carga útil no válida."
      ],
      [
        "estructural",
        "¿Siguen siendo compatibles los tipos y restricciones?",
        "El campo cambia de cadena a número entero."
      ],
      [
        "Semántica",
        "¿Permaneció el significado?",
        "El mismo valor ahora representa otro estado."
      ],
      [
        "conductual",
        "¿Permanecen efectos, orden y errores?",
        "POST, anteriormente idempotente, ahora duplica."
      ],
      [
        "Operacional",
        "¿SLA, límites y volumen siguen siendo viables?",
        "Página máxima o cuota reducida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.4 Dirección de los datos y perspectiva del consumidor",
    "id": "28-4-direccion-de-los-datos-y-perspectiva-del-consumidor"
  },
  {
    "kind": "paragraph",
    "text": "El mismo cambio puede tener el impacto opuesto dependiendo de la dirección de los datos. En una solicitud, el consumidor produce y el proveedor interpreta. Hacer que la validación del proveedor sea más permisiva generalmente preserva las solicitudes antiguas; hacerlo más restrictivo puede rechazarlos. En respuesta, el proveedor produce y el consumidor interpreta; añadir posibilidades puede requerir tolerancia que el cliente no tiene."
  },
  {
    "kind": "paragraph",
    "text": "A menudo, los consumidores existentes admiten agregar valor de enumeración a la solicitud porque pueden continuar enviando valores conocidos. Agregar valor a la respuesta puede romper a los clientes que asignaron el conjunto como cerrado. Las herramientas de diferenciación necesitan conocer esta dirección; Reglas genéricas como “la suma es compatible” producen falsos negativos."
  },
  {
    "kind": "paragraph",
    "text": "Las devoluciones de llamada, los webhooks y los eventos invierten los roles tradicionales. La organización que normalmente actúa como servidor pasa a producir mensajes consumidos por terceros. La revisión debe registrar claramente quién produce y quién interpreta cada elemento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/es/figure-01-data-direction.svg",
    "alt": "Compatibilidad analizada según la dirección de los datos entre consumidor y proveedor",
    "caption": "Figura 1: la dirección de los datos cambia la clasificación de compatibilidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.5 Taxonomía de cambios",
    "id": "28-5-taxonomia-de-cambios"
  },
  {
    "kind": "paragraph",
    "text": "Los cambios aditivos añaden elementos sin eliminar los existentes: nueva operación, campo opcional o tipo de medio adicional. Generalmente son compatibles, pero no son automáticamente seguros. Un campo adicional en respuesta puede romper los deserializadores estrictos; El nuevo valor de enumeración puede alcanzar un cambio sin mayúsculas de minúsculas predeterminadas; La nueva ruta puede colisionar con la ruta genérica en la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Los cambios restrictivos reducen el conjunto de mensajes aceptados. Hacer que un campo sea obligatorio, disminuir maxLength, eliminar enum o aceptar menos formatos tiende a interrumpir solicitudes previamente válidas. Los cambios sustitutivos intercambian un elemento por otro, como cambiar el nombre de una propiedad, ruta o scope de OAuth. Los cambios de comportamiento preservan la estructura, pero alteran las reglas, los efectos secundarios, la coherencia, el orden o la política de errores."
  },
  {
    "kind": "paragraph",
    "text": "La clasificación debe registrar la dirección, el scope y la mitigación. Un cambio puede ser compatible para solicitudes e incompatible para respuestas; seguro para clientes tolerantes y riesgoso para los SDK generados; aceptable en vista previa e inadecuado en producción."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Taxonomía práctica para revisar cambios.",
    "headers": [
      "categoría",
      "Ejemplo",
      "Riesgo principal"
    ],
    "rows": [
      [
        "aditivo",
        "Nueva propiedad opcional en respuesta.",
        "El cliente rechaza campos desconocidos."
      ],
      [
        "restrictivo",
        "El campo que antes era opcional pasa a ser obligatorio.",
        "Las solicitudes existentes fallan."
      ],
      [
        "sustituto",
        "Cambie el nombre de clientId a id.",
        "El código y el SDK deben cambiar."
      ],
      [
        "conductual",
        "Cambiar el orden predeterminado.",
        "La paginación y los resultados ya no son estables."
      ],
      [
        "Operacional",
        "Reduzca el tiempo de espera, la cuota o el límite de velocidad.",
        "El consumidor no completa su viaje."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.6 Versionado semántico y sus límites",
    "id": "28-6-versionado-semantico-y-sus-limites"
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones semántico utiliza MAJOR.MINOR.PATCH. El mayor aumenta cuando hay un cambio incompatible en la API pública; menor cuando exista funcionalidad compatible; parche cuando haya un parche compatible. El modelo es valioso porque te obliga a declarar una interfaz pública y asigna significado al cambio de número."
  },
  {
    "kind": "paragraph",
    "text": "En las API remotas, SemVer necesita pensamiento crítico. El consumidor no necesariamente elige una versión exacta del servidor cuando elige una biblioteca. El proveedor puede implementar continuamente bajo el mismo endpoint y las características operativas también son parte de la experiencia. La publicación de 1.4.3 en info.version no determina cómo la API Gateway seleccionará la versión."
  },
  {
    "kind": "paragraph",
    "text": "Muchas organizaciones exponen solo la versión principal, como v1, y tratan las versiones secundarias y de parche como compatibles en la misma interfaz. Este enfoque reduce la proliferación de terminales, pero requiere una disciplina estricta en la clasificación de compatibilidad. SemVer no reemplaza la política de desaprobación, soporte o migración."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: SemVer comunica la intención, pero depende de reglas de compatibilidad claras.",
    "headers": [
      "Número",
      "intención",
      "Posible uso en API"
    ],
    "rows": [
      [
        "MAJOR",
        "Cambio incompatible.",
        "Nueva interfaz seleccionable: v1 a v2."
      ],
      [
        "MINOR",
        "Funcionalidad admitida.",
        "Versión compatible bajo la misma especialidad."
      ],
      [
        "PATCH",
        "Solución compatible.",
        "Corrección de ejecución sin nuevo contrato público."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.7 Versión pública, contrato, implementación y especificación",
    "id": "28-7-version-publica-contrato-implementacion-y-especificacion"
  },
  {
    "kind": "paragraph",
    "text": "Una arquitectura madura distingue diferentes números. La versión pública identifica una interfaz seleccionable por el consumidor. La versión del contrato identifica una revisión del documento o esquema de OpenAPI. La versión de implementación identifica la compilación o versión del backend. La versión de la especificación, como OpenAPI 3.1, le indica qué dialecto describe el documento."
  },
  {
    "kind": "paragraph",
    "text": "Estos números cambian por diferentes razones. El backend puede recibir múltiples implementaciones sin cambiar la versión pública. El contrato puede corregir una descripción sin cambiar el runtime. Migrar la descripción de OpenAPI 3.0 a 3.1 no requiere crear v2. Las dimensiones confusas producen URL inestables y dificultan la auditoría."
  },
  {
    "kind": "paragraph",
    "text": "Los registros y métricas deben registrar la versión pública solicitada, la revisión de la API Gateway, la compilación del backend y la suma de verificación del contrato. Esta correlación le permite investigar cuándo respuestas aparentemente de la misma API provienen de diferentes implementaciones."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: No trate todos los números como una única versión.",
    "headers": [
      "Dimensión",
      "Ejemplo",
      "Uso"
    ],
    "rows": [
      [
        "Versión pública",
        "v2",
        "Consumidor, portal y enrutamiento."
      ],
      [
        "Contrato",
        "2.3.0",
        "Diferencias, pruebas, catálogo y gobernanza."
      ],
      [
        "Implementación",
        "construir 2026.07.16.4",
        "Despliegue, reversión y observabilidad."
      ],
      [
        "Especificación",
        "openapi: 3.1.1",
        "Analizador, editor y generadores."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.8 Versionado en la ruta URI",
    "id": "28-8-versionado-en-la-ruta-uri"
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones de ruta coloca el identificador en una parte visible del URI, como /v1/clientes. Es fácil de entender, aparece en los registros sin inspección del encabezado y, por lo general, se enruta fácilmente a través de API Gateways. También permite documentación y políticas separadas por ruta base."
  },
  {
    "kind": "paragraph",
    "text": "La principal desventaja es hacer que la versión forme parte de la identidad del recurso. /v1/clientes/10 y /v2/clientes/10 son URI diferentes, aunque representan la misma entidad. Es necesario actualizar los enlaces, cachés e integraciones. El patrón funciona mejor cuando sólo los cambios importantes incompatibles generan un nuevo camino."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway debe evitar ambigüedades, como que /v1beta colisione con /v1, y debe definir el comportamiento de las rutas no versionadas. Redirigir silenciosamente a la versión más reciente puede ser peligroso; el rechazo explícito o la versión predeterminada documentada son opciones más predecibles."
  },
  {
    "kind": "subhead",
    "text": "Versión de ejemplo en la ruta"
  },
  {
    "kind": "code",
    "text": "GET /v2/clientes/123 HTTP/1.1\nHost: api.empresa.example\nAccept: application/json"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.9 Cadena de consulta, encabezado y tipo de medio",
    "id": "28-9-cadena-de-consulta-encabezado-y-tipo-de-medio"
  },
  {
    "kind": "paragraph",
    "text": "La query string expresa la versión como parámetro, por ejemplo ?api-version=2026-07-01. Conserva la ruta y es común en servicios que versionan por fecha. Las API Gateways y los cachés deben incluir el parámetro en la clave y evitar que los valores desconocidos se ignoren silenciosamente."
  },
  {
    "kind": "paragraph",
    "text": "Un encabezado dedicado, como Api-Version: 2, mantiene estable el URI y hace que la negociación sea explícita. La desventaja es una menor visibilidad en herramientas simples y registros que no registran headers. WAF, CORS, proxies y observabilidad deben preservar el campo correctamente."
  },
  {
    "kind": "paragraph",
    "text": "El control de versiones por tipo de medio utiliza Aceptar, como por ejemplo application/vnd.empresa.cliente-v2+json. Combina formato y versión de representación y se alinea con la negociación de contenido. Sin embargo, aumenta la complejidad de las herramientas y requiere Variar: Aceptar cuando la respuesta cambia según el encabezado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/es/figure-02-version-selection.svg",
    "alt": "Estrategias para seleccionar versiones por ruta, consulta, encabezado y tipo de medio",
    "caption": "Figura 2: Las estrategias de selección tienen compensaciones en visibilidad, caché y operación."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - La elección debe abarcar toda la cadena técnica.",
    "headers": [
      "Mecanismo",
      "ventaja",
      "Precaución"
    ],
    "rows": [
      [
        "Camino",
        "Visible y fácil de enrutar.",
        "Cambia el URI y tiende a proliferar."
      ],
      [
        "Consulta",
        "Bueno para versiones por fecha.",
        "La caché y los enlaces deben conservar el parámetro."
      ],
      [
        "encabezado",
        "Mantenga el camino firme.",
        "Menor visibilidad y mayor dependencia del utillaje."
      ],
      [
        "tipo de medio",
        "Negocia versión y representación.",
        "Complejidad de clientes y cachés."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Las versiones por fecha, como 2026-07-01, comunican una línea de base temporal en lugar de una secuencia principal. Son útiles en plataformas con muchos cambios coordinados o cuando el consumidor necesita corregir un comportamiento conocido en una fecha determinada. La fecha no significa necesariamente la fecha de implementación; representa un contrato publicado y debe ser inmutable una vez que esté disponible."
  },
  {
    "kind": "paragraph",
    "text": "Otro enfoque combina una versión importante con niveles de estabilidad: alfa, beta y estable. Alpha admite cambios frecuentes y soporte limitado; beta indica una mayor madurez, pero aún puede evolucionar; ofertas estables compatibilidad y compromisos de soporte. Estas etiquetas sólo tienen valor cuando existen criterios claros de promoción y retirada."
  },
  {
    "kind": "paragraph",
    "text": "Los lanzamientos por fecha y etiquetas de estabilidad no eliminan la necesidad de compatibilidad. Simplemente expresan mejor el modelo de ciclo de vida elegido por la organización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.11 Criterios para elegir una estrategia",
    "id": "28-11-criterios-para-elegir-una-estrategia"
  },
  {
    "kind": "paragraph",
    "text": "No existe un mecanismo universalmente mejor. La decisión debe considerar a los consumidores, el cache, la observabilidad, los portales, los SDK, la infraestructura, las políticas corporativas y la capacidad operativa. Path tiende a favorecer la simplicidad; el encabezado y el tipo de medio favorecen el URI estable; La consulta funciona bien para líneas base de fechas. La coherencia organizacional es más importante que las preferencias individuales."
  },
  {
    "kind": "paragraph",
    "text": "La estrategia también debe definir las versiones faltantes, desconocidas y retiradas. La API Gateway debe responder de forma predecible, con un mensaje de error estandarizado y un enlace a la documentación. El respaldo silencioso a la versión más cercana puede enmascarar fallas y producir un comportamiento incorrecto."
  },
  {
    "kind": "paragraph",
    "text": "Cuando diferentes equipos adoptan mecanismos incompatibles, el costo aparece en el portal, los clientes y la observabilidad. Un estándar empresarial debe permitir excepciones justificadas, pero debe mantener criterios comunes de compatibilidad, ciclo de vida y depreciación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.12 Evolución de esquemas, campos, enumeraciones y nulabilidad",
    "id": "28-12-evolucion-de-esquemas-campos-enumeraciones-y-nulabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Generalmente se admite agregar un campo opcional a una solicitud porque los clientes antiguos simplemente no lo envían. Hacerlo obligatorio rompe los mensajes existentes. En respuesta, agregar un campo puede romper con los clientes estrictos. Eliminar un campo, cambiar el tipo, disminuir los límites o cambiar la capacidad de nulidad tiende a ser incompatible."
  },
  {
    "kind": "paragraph",
    "text": "Las enumeraciones requieren atención especial. A pedido, agregar valor aceptado por el servidor no obliga a los clientes antiguos a usarlo. En respuesta, el nuevo valor puede romper los SDK que generaron una enumeración cerrada. Una política de evolución debe definir si los consumidores deben ignorar valores desconocidos o asignar un estado DESCONOCIDO."
  },
  {
    "kind": "paragraph",
    "text": "Los generadores de esquema JSON, OpenAPI y SDK pueden interpretar los valores faltantes, nulos y vacíos de forma diferente. Cambiar un campo de anulable a no anulable, cambiar las propiedades predeterminadas u omitir propiedades puede afectar la lógica incluso cuando el tipo nominal sigue siendo el mismo."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - La dirección del mensaje cambia el análisis de compatibilidad.",
    "headers": [
      "Cambiar",
      "Solicitar",
      "Response"
    ],
    "rows": [
      [
        "Agregar campo opcional",
        "Generalmente compatibles.",
        "Condicional: el cliente debe tolerar a los extraños."
      ],
      [
        "Hacer que el campo sea obligatorio",
        "Rompedor.",
        "Puede romper el análisis y las expectativas."
      ],
      [
        "Agregar enumeración",
        "Generalmente compatibles.",
        "Arriesgado para clientes con enumeración cerrada."
      ],
      [
        "Tipo de cambio",
        "Rompedor.",
        "Rompedor."
      ],
      [
        "Cambiar nulabilidad",
        "Normalmente disruptivo.",
        "Puede romper la validación y la lógica."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "La operación de adición generalmente se admite, pero puede entrar en conflicto con rutas genéricas. Eliminar o cambiar el nombre de la ruta o método no funciona. Hacer que un parámetro sea obligatorio, cambiar la ubicación de la consulta al encabezado, cambiar la codificación o eliminar el tipo de medio requiere una migración coordinada."
  },
  {
    "kind": "paragraph",
    "text": "Las plantillas de error y estado HTTP son parte del contrato. Cambiar 404 a 200 con cuerpo vacío, cambiar 409 a 422 o reemplazar la estructura de error puede alterar el reintento, la observabilidad y el control de flujo. El proveedor debe mantener códigos estables o proporcionar una nueva versión con una guía de migración clara."
  },
  {
    "kind": "paragraph",
    "text": "Los cambios de seguridad suelen ser incompatibles: requieren un nuevo scope de OAuth, cambian la audience, eliminan la clave API, requieren mTLS o cambian la firma de la solicitud. Lo mismo ocurre con los límites de velocidad, las cuotas, los tiempos de espera y la localización. La versión pública debe reflejar los cambios que hacen inviables a los consumidores existentes, incluso si la carga útil sigue siendo idéntica."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.14 Versionado en REST, GraphQL, gRPC y eventos",
    "id": "28-14-versionado-en-rest-graphql-grpc-y-eventos"
  },
  {
    "kind": "paragraph",
    "text": "En REST, las versiones suelen aparecer en la ruta, consulta, encabezado o tipo de medio. En GraphQL, la evolución generalmente ocurre en el esquema mismo al agregar y desaprobar campos; Crear /v2 para cualquier cambio elimina parte de la flexibilidad del modelo. Los campos incompatibles pueden coexistir temporalmente con @deprecated y telemetría por operación."
  },
  {
    "kind": "paragraph",
    "text": "En gRPC y Protocol Buffers, la compatibilidad depende de los números de campo. Los campos eliminados deben marcarse como reservados y los números antiguos no se pueden reutilizar. Los paquetes y servicios podrán incluir importantes en la nomenclatura cuando exista una avería. La compatibilidad binaria debe probarse con clientes generados en versiones anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Los eventos y los mensajes requieren atención especial porque los mensajes pueden permanecer almacenados. El consumidor puede procesar eventos antiguos después de que se publique una nueva versión. Las estrategias incluyen registro de esquemas, compatibilidad con versiones anteriores y posteriores, control de versiones de sobres y consumidores tolerantes. Actualizar simultáneamente al productor y al consumidor rara vez es seguro en entornos distribuidos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.15 Datos persistentes y migraciones",
    "id": "28-15-datos-persistentes-y-migraciones"
  },
  {
    "kind": "paragraph",
    "text": "Los cambios de API a menudo dependen de cambios en la base de datos. Agregar un campo obligatorio en la versión 2 puede requerir el reabastecimiento de registros históricos. Cambiar un identificador o normalizar una entidad puede afectar enlaces, eventos y cachés. La migración debe considerar los datos antiguos, la reversión y la coexistencia entre versiones de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "El patrón de expansión y contracción también se aplica al banco: primero agregue una nueva columna o estructura sin eliminar la anterior; luego escriba en ambos formatos o rellene; luego migrar lectores; finalmente eliminar la estructura anterior cuando no haya dependientes. Los intercambios instantáneos aumentan el riesgo porque el código y los datos rara vez cambian de forma atómica en toda la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Cuando v1 y v2 necesitan leer y escribir el mismo dominio, la organización debe definir la fuente de verdad, transformación y coherencia. Los adaptadores en la API Gateway resuelven diferencias superficiales; Los cambios semánticos profundos pertenecen al dominio o a los servicios de compatibilidad dedicados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.16 Coexistencia de versiones y adaptadores",
    "id": "28-16-coexistencia-de-versiones-y-adaptadores"
  },
  {
    "kind": "paragraph",
    "text": "La coexistencia permite que los consumidores migren a diferentes ritmos. La API Gateway puede enrutar v1 y v2 a backends separados, a la misma implementación con sucursales internas o a una fachada que adapta los contratos. Cada opción tiene un costo. Los backends separados aumentan el aislamiento pero duplican las operaciones; la implementación compartida reduce la infraestructura pero acumula condicionales; Los adaptadores funcionan bien para diferencias de representación, pero no para reglas comerciales incompatibles."
  },
  {
    "kind": "paragraph",
    "text": "Una versión antigua no debería permanecer disponible indefinidamente sólo porque todavía recibe tráfico. El proveedor necesita medir a los consumidores, clasificar la criticidad, definir la fecha límite y ofrecer soporte para la migración. Sin extinción, las versiones se convierten en productos permanentes y amplían la superficie de ataque."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas, el cache, la autenticación, la observabilidad y los SLA pueden diferir según la versión. El conjunto de versiones debe registrar la versión recomendada, el estado, el propietario, la documentación y la relación de reemplazo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.17 Versiones y revisiones en Azure API Management",
    "id": "28-17-versiones-y-revisiones-en-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, las versiones agrupan API relacionadas y le permiten exponer interfaces incompatibles por ruta, consulta o encabezado. Son apropiados cuando los consumidores necesitan seleccionar explícitamente diferentes contratos. Cada versión puede tener sus propias operaciones, políticas, productos y documentación."
  },
  {
    "kind": "paragraph",
    "text": "Las revisiones resuelven otro problema: cambiar y probar una API sin crear una nueva versión pública. Una revisión puede recibir cambios continuos, probarse por separado y luego actualizarse. El registro de cambios se puede publicar para los consumidores. La revisión no sustituye al versionado cuando el contrato es incompatible."
  },
  {
    "kind": "paragraph",
    "text": "La regla general es simple: los cambios continuos pueden prepararse como una revisión y promocionarse a la versión actual; Los cambios importantes requieren una nueva versión y un plan de migración. El proyecto debe evitar que se actualice una revisión experimental sin pruebas y aprobación."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Versión, revisión y lanzamiento resuelven diferentes problemas.",
    "headers": [
      "Concepto",
      "cuando usar",
      "Efecto sobre el consumidor"
    ],
    "rows": [
      [
        "Version",
        "Contrato incompatible o comportamiento diferente.",
        "Selecciona la versión por motor explícito."
      ],
      [
        "Revision",
        "Cambio controlado bajo la misma versión pública.",
        "Normalmente sigue llamando a la misma versión."
      ],
      [
        "Lanzamiento/compilación",
        "Cambio de implementación interna.",
        "No se requiere selección pública."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.18 Estados del ciclo de vida y gobernanza",
    "id": "28-18-estados-del-ciclo-de-vida-y-gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "Una versión necesita estados claros. El diseño indica contrato bajo revisión; la vista previa permite pilotos y admite cambios; soporte de ofertas activas y SLA; obsoleto informa que la versión ya no se recomienda; la puesta del sol fija la fecha de retiro; retirado indica que el tráfico ya no se atiende."
  },
  {
    "kind": "paragraph",
    "text": "Toda transición necesita criterios de entrada y salida. Para volverse activo, por ejemplo, se debe publicar el contrato, probar las políticas, validar la capacidad y definir el propietario. Para quedar obsoleto, debe haber un reemplazo funcional, una guía de migración y una fecha límite. Para retirarse, la telemetría debe demostrar la ausencia o la aceptación formal de los consumidores restantes."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza debe evitar versiones huérfanas: sin propietario, sin documentación, sin observabilidad o con certificado y dependencias no mantenidas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/es/figure-03-lifecycle.svg",
    "alt": "Ciclo de vida gobernado de una versión de API",
    "caption": "Figura 3: El ciclo de vida transforma la versión en un objeto gobernado y auditable."
  },
  {
    "kind": "paragraph",
    "text": "La depreciación no significa terminación inmediata. Comunica que la característica o versión ya no se recomienda y puede eliminarse en el futuro. El consumidor necesita documentación de reposición, plazo, justificación y migración. La fecha de caducidad representa el momento después del cual el recurso tiende a dejar de responder."
  },
  {
    "kind": "paragraph",
    "text": "El encabezado Deprecation le permite indicar que el recurso estará o ya ha quedado obsoleto. El enlace de obsolescencia de la relación puede apuntar a documentación adicional. El encabezado Sunset le indica cuándo es probable que el URI deje de estar disponible. Estas señales complementan el portal, el correo electrónico y el registro de cambios; No reemplazan la gestión activa del consumidor."
  },
  {
    "kind": "paragraph",
    "text": "La fecha de vencimiento no debe ser anterior a la fecha de depreciación. La API Gateway puede insertar estos headers por versión, pero la configuración debe ser coherente con el catálogo real y el plan de jubilación."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de señalización de depreciación"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 200 OK\nDeprecation: @1782863999\nSunset: Wed, 30 Jun 2027 23:59:59 GMT\nLink: <https://developer.example/migrations/v2>; rel=\"deprecation\""
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.20 Guía de comunicación, registro de cambios y migración",
    "id": "28-20-guia-de-comunicacion-registro-de-cambios-y-migracion"
  },
  {
    "kind": "paragraph",
    "text": "La comunicación efectiva responde qué cambió, por qué cambió, quién se ve afectado, cuándo se retirará la versión y cómo migrar. El registro de cambios debe estar orientado al consumidor, no a una lista de confirmaciones. La guía debe mostrar el mapeo de campos, las diferencias de estado, los nuevos requisitos de seguridad y ejemplos de antes y después."
  },
  {
    "kind": "paragraph",
    "text": "Los consumidores críticos pueden requerir contacto directo, ventana de aprobación y seguimiento. Las notificaciones genéricas en el portal son insuficientes cuando la versión participa en pagos, Open Finance o viajes regulados. La organización debe registrar confirmaciones, riesgos y excepciones."
  },
  {
    "kind": "paragraph",
    "text": "El portal debe indicar versión recomendada, estado de otras, documentación, SDK, registro de cambios y fechas. Los enlaces rotos o la documentación contradictoria reducen la confianza y prolongan las migraciones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.21 Inventario y telemetría del consumidor",
    "id": "28-21-inventario-y-telemetria-del-consumidor"
  },
  {
    "kind": "paragraph",
    "text": "No es posible retirar de forma segura lo que no se mide. El inventario debe identificar la aplicación, el propietario, el tenant, el entorno, la versión utilizada, la importancia y el volumen. La IP aislada es insuficiente en entornos con NAT, proxies y pools compartidos. client_id, clave de suscripción, certificado o identidad de carga de trabajo son mejores claves."
  },
  {
    "kind": "paragraph",
    "text": "La telemetría debe cubrir el tráfico periódico y los viajes estacionales. Una versión puede aparecer inactiva durante días y sólo utilizarse al cierre mensual. Las métricas útiles incluyen llamadas por versión, consumidores únicos, errores, operaciones utilizadas, última actividad y porcentaje de migración."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben conservar la versión solicitada y la versión enrutada efectivamente. Cuando la API Gateway aplica el valor predeterminado o la reescritura, la diferencia debe ser visible para evitar diagnósticos erróneos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.22 Diferencia semántica, pruebas de contrato y puertas de calidad",
    "id": "28-22-diferencia-semantica-pruebas-de-contrato-y-puertas-de-calidad"
  },
  {
    "kind": "paragraph",
    "text": "La diferencia textual identifica líneas modificadas, pero no comprende el impacto. La diferencia semántica interpreta operaciones, esquemas, dirección de datos, requisitos, enumeraciones y restricciones. Aún así, las herramientas no capturan todos los cambios de comportamiento. La revisión humana necesita analizar la semántica, la seguridad y la operación."
  },
  {
    "kind": "paragraph",
    "text": "La canalización debe validar la sintaxis, el linting, las reglas corporativas, la diferenciación con la línea de base publicada, las pruebas de contrato, las pruebas de consumidor y la aprobación de excepciones. La línea de base no puede ser simplemente la rama principal; debe representar el artefacto realmente en producción."
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de contratos impulsadas por el consumidor ayudan a revelar dependencias concretas, pero no reemplazan el contrato del proveedor. Una buena estrategia combina OpenAPI o esquema oficial, pruebas de compatibilidad y telemetría real."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: La automatización reduce el riesgo, pero necesita contexto y revisión.",
    "headers": [
      "Puerta de calidad",
      "Objetivo",
      "Fallo detectado"
    ],
    "rows": [
      [
        "Analizador y linter",
        "Garantizar un contrato válido y consistente.",
        "Error estructural o violación de patrón."
      ],
      [
        "Diferencia semántica",
        "Clasificar el impacto del cambio.",
        "Eliminación, restricción o enumeración incompatible."
      ],
      [
        "Pruebas de contrato",
        "Verificar la implementación contra el contrato.",
        "El runtime difiere de la especificación."
      ],
      [
        "Pruebas de consumo",
        "Validar expectativas reales.",
        "El cliente se rompe a pesar de una diferencia aparentemente segura."
      ],
      [
        "Telemetria",
        "Confirmar adopción y uso.",
        "El consumidor todavía está atascado en la versión anterior."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "El patrón expandir-migrar-contraer evita el cambio instantáneo. En la fase de expansión, el proveedor acepta lo antiguo y lo nuevo: agrega un campo, endpoint o formato sin eliminar el existente. En la migración, los consumidores se trasladan de forma gradual, con telemetría y apoyo. Por contracción, el elemento antiguo se elimina sólo cuando no hay dependientes relevantes."
  },
  {
    "kind": "paragraph",
    "text": "Para cambiar el nombre de un campo obligatorio, por ejemplo, el servidor puede aceptar ambos nombres, responder temporalmente con ambos y registrar qué formulario utiliza cada consumidor. Después de que todos migren, el nombre anterior queda obsoleto y se elimina en la nueva ventana de compatibilidad definida o principal."
  },
  {
    "kind": "paragraph",
    "text": "El patrón aumenta temporalmente la complejidad, pero reduce el riesgo, facilita la reversión y elimina la necesidad de sincronizar las implementaciones de todos los consumidores."
  },
  {
    "kind": "subhead",
    "text": "Expandir, migrar y contraer"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/es/figure-04-expand-migrate-contract.svg",
    "alt": "Evolución segura a través de fases de expansión, migración y contratación.",
    "caption": "Figura 4: La evolución segura utiliza la coexistencia temporal y la evidencia de migración."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.24 API Gateways, enrutamiento y troubleshooting",
    "id": "28-24-api-gateways-enrutamiento-y-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway es un punto de selección de versión natural, pero no debe ocultar semántica incompatible. Las políticas pueden extraer la ruta, la consulta o la versión del encabezado, validar valores, enrutar al backend, insertar headers de obsolescencia y registrar telemetría. El orden de las políticas debe ser predecible: identificar la versión antes del cache, autenticación y enrutamiento específicos."
  },
  {
    "kind": "paragraph",
    "text": "Las fallas comunes incluyen una versión predeterminada inesperada, reescritura incorrecta, caché compartida entre versiones, política heredada solo en parte, backend v2 que recibe tráfico v1 y documentación que apunta a otra URL base. Los registros deben registrar la versión recibida, la versión resuelta, el backend elegido, la revisión y la suma de verificación del contrato."
  },
  {
    "kind": "paragraph",
    "text": "Al solucionar problemas, reproduzca la solicitud con todos los elementos de selección y compare la API Gateway, el portal, OpenAPI y el backend. Un 404 podría significar una operación inexistente en la versión, una ruta no publicada o un conjunto de versiones mal configurado. Un 200 con una carga útil antigua puede indicar un cache o un enrutamiento incorrectos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.25 Estudios de casos y laboratorios",
    "id": "28-25-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: una API de cliente necesita reemplazar idCliente con customerId. El equipo utiliza una expansión temporal, acepta ambas en las solicitudes, responde con ambas durante la migración, mide el uso y publica la versión 2 solo cuando otros cambios incompatibles justifican una nueva especialización."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: una API de pagos ahora requiere mTLS y una nueva audience. Como el cambio afecta las credenciales y la infraestructura del consumidor, el equipo crea v2, mantiene v1 durante un período definido, distribuye certificados en aprobación y utiliza Deprecation y Sunset en producción."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: en Azure APIM, se prepara una corrección de descripción y un nuevo campo opcional como revisión v2. Después de la prueba, la revisión se actualiza sin crear la versión 3. Meses después, un cambio de contrato incompatible genera la v3 en el mismo conjunto de versiones."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Compare dos documentos OpenAPI y clasifique los cambios. 2) Configurar el control de versiones por ruta y encabezado en una API Gateway de laboratorio. 3) Simular la desaprobación y la extinción. 4) Crear telemetría por versión y consumidor. 5) Ejecute una migración de contrato de expansión-migración con un campo renombrado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "API Versioning es un mecanismo de coordinación para cambios observables. El objetivo no es generar números, sino permitir la evolución con riesgo controlado. La compatibilidad debe analizarse en las dimensiones sintáctica, estructural, semántica, conductual y operativa."
  },
  {
    "kind": "paragraph",
    "text": "La dirección de los datos cambia la clasificación de los cambios. Las estrategias basadas en ruta, consulta, encabezado, tipo de medio o datos tienen compensaciones y deben funcionar en toda la cadena. La versión pública, la revisión, el lanzamiento y la versión de especificación son dimensiones diferentes."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo de vida convierte la depreciación y la jubilación en procesos auditables. La desaprobación y la puesta en marcha mejoran la comunicación en runtime, pero el inventario, la telemetría, las guías de migración y la confirmación de adopción determinan la seguridad. La diferencia semántica, las pruebas y expandir-migrar-contraer reducen el riesgo sin impedir la evolución."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "Con las versiones y el ciclo de vida gobernados, el siguiente capítulo profundiza en Service Mesh, incluidos Istio, Linkerd y Envoy, y muestra cómo se aplican las políticas, la identidad y la observabilidad a la comunicación entre servicios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de versiones de API",
    "id": "lista-de-verificacion-de-versiones-de-api"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La línea base corresponde al contrato realmente publicado y respaldado.",
      "El cambio fue analizado en dimensiones sintácticas, estructurales, semánticas, conductuales y operativas.",
      "Se consideraron la dirección de los datos y el comportamiento de los SDK.",
      "Se crea una nueva versión sólo cuando existe incompatibilidad o necesidad explícita de coexistencia.",
      "El mecanismo de selección funciona en cliente, caché, WAF, API Gateway, portal y observabilidad.",
      "La versión pública, la revisión, la compilación y la versión de especificación están separadas.",
      "Depreciation ofrece un canal sustituto, guía, fecha límite, propietario y soporte.",
      "La desaprobación, la extinción, el portal y el catálogo son consistentes.",
      "El inventario identifica a los consumidores por aplicación o identidad, no solo por IP.",
      "La canalización ejecuta analizador, linter, diferenciación, pruebas y aprobación de excepciones.",
      "El retiro tiene evidencia, comunicación y plan de recuperación."
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
      "Explique por qué agregar un campo a la respuesta puede resultar complicado.",
      "Diferenciar entre compatibilidad estructural, semántica y operativa.",
      "Clasifique la adición de enumeraciones en solicitud y respuesta.",
      "Diferenciar versión pública, contrato, revisión, compilación y versión de la Especificación OpenAPI.",
      "Compare ruta, consulta, encabezado, tipo de medio y versión por fecha.",
      "Explique cuándo es preferible una revisión a una nueva versión en Azure APIM.",
      "Escriba una respuesta HTTP con Deprecation, Sunset y Link a la guía de migración.",
      "Describa un plan de expansión, migración y contrato para cambiar el nombre del campo obligatorio.",
      "Proponer métricas para decidir si se puede eliminar la v1.",
      "Describir cómo investigar cuándo v2 devuelve el comportamiento de v1."
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
        "Compatibilidad con versiones anteriores",
        "Capacidad de los consumidores existentes de continuar operando después de un cambio."
      ],
      [
        "Línea de base",
        "Contrato de referencia o comportamiento utilizado en la comparación."
      ],
      [
        "Cambios importantes",
        "Cambio incompatible con las expectativas respaldadas."
      ],
      [
        "Registro de cambios",
        "Registro orientado al consumidor de los cambios publicados."
      ],
      [
        "Ventana de compatibilidad",
        "Periodo de convivencia y migración entre contratos."
      ],
      [
        "Deriva del contrato",
        "Divergencia entre descripción, API Gateway y runtime."
      ],
      [
        "Deprecation",
        "Señalar que no se recomienda una interfaz y que puede eliminarse."
      ],
      [
        "Expandir-migrar-contraer",
        "Estrategia de introducir compatibilidad, migrar y eliminar la anterior."
      ],
      [
        "Revision",
        "Cambio rastreado bajo la misma versión pública."
      ],
      [
        "Diferencia semántica",
        "Comparación que interpreta el impacto del contrato."
      ],
      [
        "SemVer",
        "Versionado semántico MAJOR.MINOR.PATCH."
      ],
      [
        "Sunset",
        "Momento tras el cual un recurso tiende a dejar de responder."
      ],
      [
        "Conjunto de versiones",
        "Grupo de versiones relacionadas de una API."
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
      "IETF. RFC 8594: campo de encabezado HTTP Sunset.",
      "IETF. RFC 9745: campo de encabezado de respuesta HTTP en desuso.",
      "Microsoft aprende. Versiones en Azure API Management.",
      "Microsoft aprende. Revisiones en Azure API Management.",
      "Guía de diseño de API de Google Cloud. AIP-185: Versionado de API.",
      "Especificación de versiones semánticas 2.0.0.",
      "Iniciativa OpenAPI. Especificación de OpenAPI 3.1.",
      "Documentación de buffers de protocolo. Actualización de un tipo de mensaje.",
      "Especificación GraphQL y prácticas de desaprobación de esquemas."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los estándares, los servicios gestionados y las herramientas evolucionan. Antes de automatizar conjuntos de versiones, revisiones, depreciación o diferencias semánticas, valide la documentación oficial de la versión implementada y pruebe el comportamiento en un entorno autorizado."
  }
];
