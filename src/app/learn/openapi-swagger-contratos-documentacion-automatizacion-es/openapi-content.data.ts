import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OPENAPI_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Del diseño al runtime: el contrato como eje de la plataforma"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/es/overview.svg",
    "alt": "Contrato OpenAPI que conecta diseño, calidad, automatización, ejecución, documentación y gobernanza",
    "caption": "Figura de apertura: el contrato OpenAPI conecta el diseño, la implementación, las pruebas, la documentación y la operación."
  },
  {
    "kind": "paragraph",
    "text": "La misma descripción guía la documentación, validación, seguridad, compatibilidad y publicación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "En capítulos anteriores, se estudió REST como estilo arquitectónico y se utilizó el modelo de madurez de Richardson para observar recursos, semántica HTTP e hipermedia. El siguiente paso es transformar estas decisiones en un contrato explícito, revisable y procesable mediante herramientas. La OpenAPI Specification, a menudo asociada con el nombre Swagger por razones históricas, proporciona un lenguaje estandarizado para describir interfaces HTTP sin depender de un lenguaje de programación específico."
  },
  {
    "kind": "paragraph",
    "text": "Una OpenAPI Description no es solo una página de documentación. Cuando está completo y coherente, registra rutas, operaciones, parámetros, cuerpos, representaciones, respuestas, encabezados, modelos de datos, requisitos de seguridad e información del servidor. Este documento puede alimentar portales de desarrolladores, validadores, mocks, generadores de clientes, pruebas de contratos, políticas de gateway, catálogos y motores de análisis de compatibilidad."
  },
  {
    "kind": "paragraph",
    "text": "En entornos empresariales, el valor del contrato aumenta porque varios equipos dependen de la misma API. El consumidor necesita saber qué puede enviar y recibir; el desarrollador backend necesita implementar la interfaz acordada; el equipo de gateway necesita publicar y proteger las operaciones; la seguridad necesita evaluar los esquemas de autenticación; las pruebas necesitan construir escenarios; y la gobernanza necesita detectar cambios incompatibles. Sin una fuente común, cada área crea su propia interpretación y las divergencias aparecen tarde, normalmente durante la aprobación o la producción."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo utiliza la familia OpenAPI 3 como referencia. Se cubrirá la estructura del documento, la relación con el JSON Schema, el uso de YAML y JSON, referencias reutilizables, seguridad, ejemplos, devoluciones de llamadas, webhooks, design-first, code-first, linting, semantic diff, generación de artefactos e integración con API Gateways. El énfasis está en producir contratos precisos, no sólo archivos que pasan por un editor visual."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Mantenga abierto un editor OpenAPI y valide cada ejemplo. Para cada operación, pregunte: ¿qué recurso se representa, qué insumos se requieren, qué respuestas son posibles, cómo se modelan los errores, qué seguridad se aplica y cómo distinguirá una herramienta el cambio compatible del cambio radical?"
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
      "Explicar el propósito de la OpenAPI Specification y diferenciar especificación, descripción, contrato, documentación e implementación.",
      "Distinga OpenAPI de Swagger y reconozca el papel histórico y actual de estos términos.",
      "Cree la estructura raíz de una OpenAPI Description en YAML o JSON.",
      "Describa rutas, operaciones, parámetros, requestBody, respuestas, encabezados y tipos de medios.",
      "Modelar datos con Objetos de esquema, composición, restricciones, nulabilidad y discriminación.",
      "Reutiliza elementos con componentes y referencias sin crear ciclos ni dependencias frágiles.",
      "Declare claves API, autenticación HTTP, OAuth 2.0, OpenID Connect y mTLS en el contrato.",
      "Compare los enfoques híbridos y de design-first, primero el código y criterios técnicos y organizativos.",
      "Aplique análisis, linting, diff, mocking, generación de SDKs y pruebas de contrato en pipelines.",
      "Integre OpenAPI con portales, catálogos, API Gateways y procesos de gobierno."
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
      "12.1 ¿Qué es OpenAPI y qué problema resuelve?",
      "12.2 OpenAPI y Swagger: términos relacionados pero diferentes",
      "12.3 OpenAPI Description como contrato ejecutable",
      "12.4 Estructura raíz del documento",
      "12.5 YAML, JSON y reglas de serialización",
      "12.6 información, servidores, etiquetas y documentos externos",
      "12.7 rutas, Path Item y Operation Object",
      "12.8 Parámetros de ruta, consulta, encabezado y cookie",
      "12.9 cuerpo de solicitud, contenido y tipos de medios",
      "12.10 Respuestas, encabezados, enlaces y errores",
      "12.11 Schema Object y JSON Schema",
      "12.12 Restricciones, composición y polimorfismo",
      "12.13 componentes, $ref y modularización",
      "12.14 Seguridad en el contrato",
      "12.15 Ejemplos, devoluciones de llamada y webhooks",
      "12.16 Enfoque híbrido, primero el diseño, primero el código",
      "12.17 Análisis, validación y linting",
      "12.18 Servidores simulados, generación de SDK y stubs",
      "12.19 Pruebas de contrato y cumplimiento",
      "12.20 Compatibilidad y cambios importantes",
      "12.21 OpenAPI 3.0, 3.1 y 3.2",
      "12.22 Portales, catálogos y API Gateways",
      "12.23 Gobernanza y CI/CD",
      "12.24 Troubleshooting",
      "12.25 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.1 ¿Qué es OpenAPI y qué problema resuelve?",
    "id": "12-1-que-es-openapi-y-que-problema-resuelve"
  },
  {
    "kind": "paragraph",
    "text": "La OpenAPI Specification, u OAS, define una forma estandarizada e independiente del lenguaje para describir las API HTTP. El documento resultante se denomina OpenAPI Description. Puede ser leído por personas, pero su característica definitoria es que está lo suficientemente estructurado como para que los programas descubran operaciones, datos y requisitos sin inspeccionar el código fuente del servicio ni observar el tráfico de la red."
  },
  {
    "kind": "paragraph",
    "text": "El problema central resuelto es la ambigüedad de la interfaz. La documentación escrita sólo en texto puede indicar que el campo de valor es numérico, pero no decir si acepta negativos, cuántos decimales se permiten, si es obligatorio o cómo se representan los errores. En OpenAPI, estas reglas se pueden expresar mediante tipos, formatos, límites, patrones, enumeraciones, requisitos, tipos de contenido y respuestas asociadas con cada operación."
  },
  {
    "kind": "paragraph",
    "text": "La especificación no implementa el servicio y no garantiza que el runtime cumplirá el contrato. Describe la interfaz esperada. El cumplimiento depende de la generación controlada, la validación de mensajes, las pruebas y la observabilidad. Tampoco define la lógica de negocio: saber que POST/transferencias acepta una estructura no explica cómo se calcula el saldo, antifraude, límites o compensaciones."
  },
  {
    "kind": "paragraph",
    "text": "OAS es particularmente útil en plataformas con múltiples consumidores porque le permite separar la interfaz pública de la estructura interna del backend. Un servicio puede cambiar la base de datos, las clases, el marco o la topología sin cambiar el contrato. Cuando es necesario un cambio de interfaz, las herramientas pueden comparar versiones e indicar posibles interrupciones antes de la publicación."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describe lo que un consumidor puede observar y utilizar en la interfaz HTTP. El código implementa este comportamiento; las pruebas verifican la correspondencia; El gateway y el portal publican y gobiernan la interfaz. Ninguno de estos elementos reemplaza a los demás."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.2 OpenAPI y Swagger: términos relacionados pero diferentes",
    "id": "12-2-openapi-y-swagger-terminos-relacionados-pero-diferentes"
  },
  {
    "kind": "paragraph",
    "text": "Swagger era el nombre del proyecto original creado para describir las API RESTful y proporcionar herramientas como una interfaz de documentación, generación de código y editor. En 2015, la especificación fue donada a la Iniciativa OpenAPI y comenzó a desarrollarse como OpenAPI Specification. La versión Swagger 2.0 se convirtió en la base de OpenAPI 2.0; Las líneas posteriores adoptaron oficialmente el nombre OpenAPI 3.x."
  },
  {
    "kind": "paragraph",
    "text": "Hoy en día, Swagger suele designar un ecosistema de herramientas y productos que funcionan con OpenAPI, mientras que OpenAPI designa la especificación. Expresiones como el archivo Swagger todavía aparecen en los proyectos, pero pueden ser imprecisas: es necesario saber si el documento está en Swagger/OpenAPI 2.0 u OpenAPI 3.x, porque la estructura de los servidores, requestBody, contenido, componentes y seguridad ha cambiado significativamente."
  },
  {
    "kind": "paragraph",
    "text": "La distinción evita errores de integración. Una herramienta que solo admite Swagger 2.0 no necesariamente comprende OpenAPI 3.1. De manera similar, una interfaz visual llamada Swagger UI puede representar una OpenAPI Description sin que Swagger genere el servicio ni utilice ninguna biblioteca específica. El contrato pertenece a la organización y debe seguir siendo portátil."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Vocabulario que reduce ambigüedades en proyectos e integraciones.",
    "headers": [
      "Término",
      "Uso recomendado",
      "Nota"
    ],
    "rows": [
      [
        "Especificación de API abierta",
        "Estándar que define el lenguaje y objetos de la descripción.",
        "Dispone de versiones y documentos normativos."
      ],
      [
        "Descripción de API abierta",
        "Documento API concreto, en YAML o JSON.",
        "Puede ser único o distribuido en varios archivos."
      ],
      [
        "Arrogancia 2.0",
        "Nombre histórico frecuentemente asociado con OpenAPI 2.0.",
        "Estructura diferente a OAS 3.x."
      ],
      [
        "Herramientas de arrogancia",
        "Editores, UI, generadores y bibliotecas.",
        "Las herramientas no son las especificaciones."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.3 OpenAPI Description como contrato ejecutable",
    "id": "12-3-openapi-description-como-contrato-ejecutable"
  },
  {
    "kind": "paragraph",
    "text": "El término contrato ejecutable indica que la descripción puede participar en el ciclo de ingeniería, no sólo publicarse al final. Un analizador comprueba si YAML o JSON forma un documento válido; un validador verifica las reglas de especificación; un linter hace cumplir las convenciones organizativas; un generador produce stubs o SDK; un mock responde según ejemplos; y una prueba compara mensajes reales con esquemas declarados."
  },
  {
    "kind": "paragraph",
    "text": "Ejecutable no significa perfectamente completo. Las reglas comerciales complejas, las dependencias entre campos, la autorización contextual y los efectos secundarios pueden requerir pruebas o extensiones adicionales. Aún así, cuanto más precisa sea la descripción, mayor será el número de controles automáticos posibles. Las descripciones vagas, con esquemas de tipo objeto sin propiedades o respuestas genéricas predeterminadas, brindan poca protección."
  },
  {
    "kind": "paragraph",
    "text": "En gobernanza, el contrato hace que la revisión sea objetiva. En lugar de simplemente evaluar capturas de pantalla o documentos separados, el equipo revisa un cambio versionado. Las solicitudes de extracción registran quién cambió la interfaz, qué reglas fallaron, qué impacto se detectó y qué aprobaciones se produjeron. Este rastro es especialmente importante en API externas que están reguladas o compartidas en muchos dominios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/es/figure-01.svg",
    "alt": "Pipeline de contratos con solicitud de extracción, analizador, linter, diferencias, pruebas y publicación",
    "caption": "Figura 1: un proceso de contrato transforma la descripción en controles repetibles antes de publicarla."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.4 Estructura raíz del documento",
    "id": "12-4-estructura-raiz-del-documento"
  },
  {
    "kind": "paragraph",
    "text": "La raíz de una OpenAPI Description es el OpenAPI Object. El campo openapi informa la versión de la especificación utilizada por el documento. El objeto de información identifica la API y la versión del contrato. las rutas describen puntos finales y operaciones; los componentes almacenan objetos reutilizables; security puede aplicar requisitos globales; tags organiza las operaciones; servidores indica URL base; externalDocs apunta a material adicional. En versiones recientes, los webhooks también pueden aparecer en la raíz."
  },
  {
    "kind": "paragraph",
    "text": "No todos los campos son obligatorios en todas las versiones, pero un documento mínimo útil debe ir más allá de la validez sintáctica. Un analizador puede aceptar una descripción sin operaciones, respuestas o esquemas y aun así seguir siendo inapropiada para los consumidores. Los criterios de calidad deben considerar si la interfaz puede entenderse, probarse y evolucionarse."
  },
  {
    "kind": "paragraph",
    "text": "Las extensiones de especificación suelen comenzar con x-, como x-owner-team o x-gateway-policy. Le permiten transportar metadatos no estándar, pero crean un acoplamiento con herramientas. Una extensión debe tener propietario, esquema, versión, documentación y política de compatibilidad; de lo contrario, el contrato se convierte en un contenedor de configuraciones arbitrarias."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/es/figure-02.svg",
    "alt": "Anatomía de objetos OpenAPI con información, servidores, rutas, componentes, seguridad y etiquetas.",
    "caption": "Figura 2 - Áreas principales del OpenAPI Object y sus responsabilidades."
  },
  {
    "kind": "code",
    "text": "Documento mínimo ampliado\nopenapi: 3.1.1\ninfo:\n  title: API de Clientes\n  version: 1.4.0\nservers:\n  - url: https://api.empresa.example/clientes/v1\npaths:\n  /clientes/{clienteId}:\n    get:\n      operationId: obtenerCliente\n      responses:\n        '200':\n          description: Cliente localizado\ncomponents:\n  schemas: {}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.5 YAML, JSON y reglas de serialización",
    "id": "12-5-yaml-json-y-reglas-de-serializacion"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI se puede serializar en JSON o YAML. Los dos formatos representan la misma estructura lógica, pero tienen riesgos diferentes. JSON es explícito entre comillas, llaves y corchetes; YAML es más legible para la edición manual, pero depende de la sangría y tiene características que pueden variar entre analizadores. En ambos casos, los nombres, tipos y valores de los campos deben respetar la versión OAS."
  },
  {
    "kind": "paragraph",
    "text": "En YAML, las tabulaciones no deben usarse para sangría, las cadenas con caracteres especiales pueden requerir comillas y valores como sí, no, el o las fechas pueden interpretarse de maneras inesperadas en implementaciones más antiguas. Los códigos de respuesta deben tratarse como cadenas, por ejemplo '200'. Se debe revisar una ruta que contenga dos puntos, almohadilla o llaves para evitar malas interpretaciones."
  },
  {
    "kind": "paragraph",
    "text": "La organización debe estandarizar la codificación UTF-8, los finales de línea, el orden lógico y el formato. Un formateador automático reduce las diferencias y los conflictos ruidosos. Los comentarios son útiles para los autores, pero no forman parte del modelo semántico que consumen todas las herramientas; La información esencial debe estar en descripción, resumen o extensiones definidas."
  },
  {
    "kind": "subhead",
    "text": "Regla general para YAML"
  },
  {
    "kind": "paragraph",
    "text": "Utilice dos espacios por nivel, nunca tabulaciones; incluya los códigos de estado entre comillas; evitar tipos implícitos ambiguos; líneas límite; y ejecute parser y linter en el mismo commit. Un archivo visualmente alineado aún puede representar tipos inesperados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.6 información, servidores, etiquetas y documentos externos",
    "id": "12-6-informacion-servidores-etiquetas-y-documentos-externos"
  },
  {
    "kind": "paragraph",
    "text": "El objeto de información proporciona identidad humana al contrato. el título debe distinguir la API; versión representa la versión de la descripción o interfaz, según la convención declarada; la descripción explica el alcance, la audiencia, los límites y los supuestos; contacto y registro de licencia responsabilidad y condiciones de uso. La versión en info no es la versión de la OAS, que permanece en el campo openapi."
  },
  {
    "kind": "paragraph",
    "text": "servers enumera las URL base y puede contener variables. Una descripción puede presentar producción, homologación y sandbox, pero la publicación de puntos finales internos en un contrato externo puede exponer la topología. En muchas organizaciones, el contrato canónico utiliza una URL lógica y el portal inyecta el entorno. Las variables deben tener valores predeterminados y enumeraciones coherentes para evitar combinaciones no válidas."
  },
  {
    "kind": "paragraph",
    "text": "Las etiquetas agrupan operaciones por capacidad o dominio. No deben reproducir la estructura de equipos o controladores de forma automática si esto perjudica la experiencia del consumidor. Los documentos externos se utilizan para materiales que no encajan en el contrato, como guías de incorporación, reglas comerciales, runbooks o políticas legales. Los enlaces externos necesitan un ciclo de vida y un seguimiento para evitar que se conviertan en referencias rotas."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los metadatos también forman parte de la experiencia y la gobernanza.",
    "headers": [
      "Elemento",
      "Pregunta que responde",
      "error frecuente"
    ],
    "rows": [
      [
        "información",
        "¿Qué API es esta, quién la mantiene y qué versión se publica?",
        "Versión sin convención u omitir propietario."
      ],
      [
        "servidores",
        "¿Sobre qué bases se puede llamar a la interfaz?",
        "Mezcla ambientes interiores y exteriores."
      ],
      [
        "etiquetas",
        "¿Cómo se agrupan las operaciones para el descubrimiento?",
        "Copie los nombres de clases o escuadrones."
      ],
      [
        "documentos externos",
        "¿Dónde están las guías y reglas complementarias?",
        "Punto de documentos sin mantenimiento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.7 rutas, Path Item y Operation Object",
    "id": "12-7-rutas-path-item-y-operation-object"
  },
  {
    "kind": "paragraph",
    "text": "paths es un mapa cuyas claves representan plantillas de ruta. Cada Path Item puede contener operaciones como get, post, put, patch y delete, así como parámetros compartidos. La ruta describe la estructura relativa a la URL base; La cadena de consulta no debe estar incrustada en la clave. /clientes/{clienteId} representa un recurso identificado, mientras que los filtros pertenecen a parámetros."
  },
  {
    "kind": "paragraph",
    "text": "Cada Operation Object debe comunicar la intención. summary ofrece una frase corta; description registra detalles; operationId crea un identificador estable utilizado por los generadores; tags organiza; parameters y requestBody describen las entradas; responses describe los resultados; security puede anular la regla global; deprecated indica deprecación sin eliminar inmediatamente la operación."
  },
  {
    "kind": "paragraph",
    "text": "operationId debe ser único en todo el documento y estable en el tiempo. Los generadores suelen convertirlo en el nombre de un método. Cambiarle el nombre puede dañar los SDK incluso cuando la URL y HTTP siguen siendo los mismos. Las rutas también deben evitar ambigüedades como /clientes/{id} y /clientes/activos en el mismo nivel cuando el enrutador puede tratar los activos como un valor de identificación."
  },
  {
    "kind": "paragraph",
    "text": "El contrato debe documentar las respuestas relevantes de éxito y fracaso. Declarar solo 200 oculta validación, autenticación, autorización, conflicto, limitación e indisponibilidad. Por otro lado, enumerar todos los códigos HTTP posibles no relacionados con la operación genera ruido. La selección debe reflejar comportamientos que los consumidores deben abordar."
  },
  {
    "kind": "code",
    "text": "Path Item y operación GET\npaths:\n  /clientes/{clienteId}:\n    parameters:\n      - $ref: '#/components/parameters/ClienteId'\n    get:\n      tags: [Clientes]\n      summary: Obtiene un cliente\n      operationId: obtenerCliente\n      responses:\n        '200':\n          $ref: '#/components/responses/ClienteEncontrado'\n        '404':\n          $ref: '#/components/responses/ProblemaNoEncontrado'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.8 Parámetros de ruta, consulta, encabezado y cookie",
    "id": "12-8-parametros-de-ruta-consulta-encabezado-y-cookie"
  },
  {
    "kind": "paragraph",
    "text": "El objeto de parámetro describe los valores transportados en la ruta, consulta, encabezado o cookie. nombre y en forma la identidad del parámetro. Los parámetros de ruta siempre son obligatorios porque la plantilla no se puede resolver sin el valor. Los parámetros de consulta representan filtros, paginación, ordenación o proyección; los encabezados contienen metadatos; Las cookies son menos comunes en las API empresariales de máquina a máquina."
  },
  {
    "kind": "paragraph",
    "text": "El esquema define el tipo y las restricciones. style y explode controlan la serialización de matrices y objetos, un detalle que a menudo se ignora. Una matriz de estado se puede enviar como estado=ACTIVO&status;=BLOQUEADO, como estado=ACTIVO,BLOQUEADO o de otras formas. Sin declarar la estrategia, los clientes y los servidores pueden producir representaciones incompatibles a pesar de estar de acuerdo sobre el tipo lógico."
  },
  {
    "kind": "paragraph",
    "text": "Los parámetros no deben duplicar la información del cuerpo sin una regla de precedencia explícita. No es necesario redefinir los encabezados estandarizados HTTP de manera inconsistente. Se pueden declarar identificadores de correlación, claves de idempotencia y versiones condicionales, pero la semántica debe aparecer en la descripción y, cuando sea posible, estar asociada a esquemas, ejemplos y respuestas."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Semántica y serialización de parámetros de cambios de ubicación.",
    "headers": [
      "Ubicación",
      "Uso típico",
      "cuidado"
    ],
    "rows": [
      [
        "camino",
        "Identidad obligatoria en la dirección del recurso.",
        "requerido = coincidencia verdadera y exacta con la plantilla."
      ],
      [
        "consulta",
        "Filtros, paginación, clasificación y campos opcionales.",
        "Defina la serialización de la matriz, los valores predeterminados y los límites."
      ],
      [
        "encabezado",
        "Correlación, idempotencia, preferencias y condiciones previas.",
        "Evite duplicar encabezados reservados o datos confidenciales."
      ],
      [
        "galleta",
        "Estado asociado al cliente en escenarios específicos.",
        "Evalúe la idoneidad de la seguridad, el dominio, SameSite y el estilo de API."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.9 cuerpo de solicitud, contenido y tipos de medios",
    "id": "12-9-cuerpo-de-solicitud-contenido-y-tipos-de-medios"
  },
  {
    "kind": "paragraph",
    "text": "En OpenAPI 3, los cuerpos de solicitud se describen mediante requestBody. El campo de contenido asigna tipos de medios a esquemas y ejemplos. Esto permite que la misma operación acepte diferentes representaciones, como aplicación/json y aplicación/xml, siempre que el comportamiento sea realmente compatible. Declarar tipos de medios solo para completar la documentación crea falsas expectativas y amplía la superficie de prueba y seguridad."
  },
  {
    "kind": "paragraph",
    "text": "requerido indica si el cuerpo es obligatorio. El esquema describe la estructura, pero no reemplaza los límites operativos como el tamaño máximo, la compresión admitida o las reglas de carga. multipart/form-data requiere modelar piezas y sus tipos; aplicación/flujo de octeto representa contenido binario; Los archivos JSON normalmente necesitan una codificación y metadatos claros."
  },
  {
    "kind": "paragraph",
    "text": "El contrato debe distinguir ausencia de propiedad, valor nulo y cadena vacía. Esta diferencia afecta la creación, la actualización completa y el PATCH. En actualizaciones parciales, un campo faltante puede significar mantener el valor, mientras que nulo puede significar eliminar. La semántica no se infiere automáticamente mediante el esquema y debe documentarse."
  },
  {
    "kind": "code",
    "text": "Cuerpo JSON con schema y ejemplo\nrequestBody:\n  required: true\n  content:\n    application/json:\n      schema:\n        $ref: '#/components/schemas/NuevaTransferencia'\n      examples:\n        transferenciaPix:\n          value:\n            cuentaOrigen: '000123'\n            importe: 125.90\n            claveDestino: cliente@example.com"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.10 Respuestas, encabezados, enlaces y errores",
    "id": "12-10-respuestas-encabezados-enlaces-y-errores"
  },
  {
    "kind": "paragraph",
    "text": "Las respuestas son obligatorias en cada operación y asigna códigos de estado o rangos a objetos de respuesta. Cada respuesta tiene una descripción y puede incluir encabezados, contenido y enlaces. La descripción debe explicar el significado de esa respuesta en el contexto de la operación, no simplemente repetir la frase genérica del código HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Los encabezados de respuesta como Ubicación, ETag, Retry-After, RateLimit o identificadores de correlación son parte del contrato observable. La ubicación en una creación indica el recurso creado; ETag participa en el almacenamiento en caché y las condiciones previas; Reintentar después guía el reintento; Los encabezados de limitación deben tener una semántica estandarizada por la organización. Documentarlos permite generar y probar clientes más realistas."
  },
  {
    "kind": "paragraph",
    "text": "Los errores deben tener un modelo consistente. Una estructura inspirada en los Problem Details puede registrar tipos, títulos, estados, detalles, instancias y extensiones de dominio. El contrato debe diferenciar error de validación, autenticación, autorización, conflicto e indisponibilidad. Devolver 200 con un campo éxito=falso reduce la capacidad de los intermediarios y clientes para aplicar la semántica HTTP estudiada en capítulos anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Los enlaces en el objeto de respuesta describen cómo los valores de una respuesta pueden incorporarse a otra operación. No son idénticos a los enlaces hipermedia enviados en la carga útil, pero ayudan a las herramientas a comprender las relaciones y los flujos. Para viajes complejos, la organización puede complementar OpenAPI con especificaciones para flujos de trabajo, pruebas o documentación."
  },
  {
    "kind": "code",
    "text": "Respuestas explícitas de éxito y fallo\nresponses:\n  '201':\n    description: Transferencia aceptada\n    headers:\n      Location:\n        schema: { type: string, format: uri-reference }\n    content:\n      application/json:\n        schema:\n          $ref: '#/components/schemas/Transferencia'\n  '422':\n    $ref: '#/components/responses/ProblemaValidacion'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.11 Schema Object y JSON Schema",
    "id": "12-11-schema-object-y-json-schema"
  },
  {
    "kind": "paragraph",
    "text": "El Schema Object describe la forma y las restricciones de los datos utilizados en parámetros, cuerpos y respuestas. En la línea OpenAPI 3.1, el modelo se ha alineado ampliamente con el borrador del JSON Schema 2020-12. Esto le permite utilizar palabras clave de validación y composición de manera más consistente, aunque las herramientas pueden implementar subconjuntos o tener diferencias en el soporte."
  },
  {
    "kind": "paragraph",
    "text": "Los tipos básicos incluyen cadena, número, entero, booleano, objeto, matriz y nulo, según el dialecto aplicable. las propiedades definen los miembros del objeto; listas requeridas nombres requeridos; adicionalProperties controla los campos no declarados; elementos describe elementos de la matriz; valores límite enumeración y constante; Mínimo, máximo, minLength, patrón y formatos refinan la validación."
  },
  {
    "kind": "paragraph",
    "text": "El formato normalmente funciona como una anotación semántica y su validación depende de la herramienta y la configuración. Formato de declaración: fecha y hora no garantiza que todos los analizadores rechacen valores no válidos. Los contratos críticos deben probar ejemplos y mensajes reales con la misma implementación utilizada en el proceso o en runtime."
  },
  {
    "kind": "paragraph",
    "text": "Los esquemas demasiado permisivos debilitan el contrato. adicionalProperties: true puede estar bien para mapas dinámicos, pero en DTO estables permite campos desconocidos y dificulta la detección de errores tipográficos. Por el contrario, cerrar todos los objetos sin una estrategia de evolución puede convertir las adiciones compatibles en pausas para los consumidores que validan estrictamente."
  },
  {
    "kind": "code",
    "text": "Schema de objeto con restricciones\ncomponents:\n  schemas:\n    Cliente:\n      type: object\n      additionalProperties: false\n      required: [id, nombre, status]\n      properties:\n        id:\n          type: string\n          pattern: '^[0-9]{10}$'\n        nombre:\n          type: string\n          minLength: 1\n          maxLength: 120\n        status:\n          type: string\n          enum: [ACTIVO, BLOQUEADO, CERRADO]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.12 Restricciones, composición y polimorfismo",
    "id": "12-12-restricciones-composicion-y-polimorfismo"
  },
  {
    "kind": "paragraph",
    "text": "allOf, anyOf, oneOf y no le permiten componer esquemas. allOf requiere que la instancia satisfaga todos los subesquemas y, a menudo, se usa para combinar estructuras; oneOf requiere exactamente una alternativa válida; anyOf acepta uno o más; no rechaza el esquema indicado. El uso debe considerar cómo los validadores y generadores interpretan la composición."
  },
  {
    "kind": "paragraph",
    "text": "allOf no debe tratarse automáticamente como herencia orientada a objetos. Representa la intersección de restricciones. Si dos subesquemas definen propiedades incompatibles, la composición puede resultar imposible. Los generadores pueden producir diferentes clases para el mismo contrato; por lo tanto, la prioridad es la semántica de la instancia, no la estructura deseada en el código."
  },
  {
    "kind": "paragraph",
    "text": "El discriminador ayuda a seleccionar alternativas para una propiedad, pero no reemplaza a oneOf ni valida todos los casos. Las asignaciones deben apuntar a esquemas existentes y los valores deben ser estables. El polimorfismo sin discriminador puede depender de formatos mutuamente excluyentes, lo que aumenta los costos de validación y puede generar mensajes de error difíciles."
  },
  {
    "kind": "paragraph",
    "text": "Las restricciones condicionales del JSON Schema, cuando son compatibles, le permiten expresar relaciones como: si el tipo es EMPRESA, entonces cnpj es obligatorio. Antes de adoptarlos, consulte el soporte de editores, portales, generadores y validadores. Un contrato teóricamente correcto puede resultar poco práctico si las herramientas críticas ignoran la palabra clave."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - La composición requiere precisión y pruebas con herramientas reales.",
    "headers": [
      "palabra clave",
      "Semántica",
      "Trampa"
    ],
    "rows": [
      [
        "todo de",
        "La instancia debe satisfacer todos los esquemas.",
        "Intersección confusa con herencia de clases."
      ],
      [
        "uno de",
        "Debe ser válida exactamente una alternativa.",
        "Las alternativas superpuestas validan más de una."
      ],
      [
        "cualquiera de",
        "Una o más alternativas pueden ser válidas.",
        "El consumidor no sabe qué representación recibió."
      ],
      [
        "discriminador",
        "Ayuda a elegir esquema por propiedad.",
        "Mapeo incompleto o valores inestables."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.13 componentes, $ref y modularización",
    "id": "12-13-componentes-ref-y-modularizacion"
  },
  {
    "kind": "paragraph",
    "text": "Los componentes almacenan esquemas, respuestas, parámetros, ejemplos, cuerpos de solicitud, encabezados, esquemas de seguridad, enlaces, devoluciones de llamadas y otros objetos reutilizables. La reutilización reduce la duplicación y le permite aplicar correcciones en un punto. Sin embargo, los componentes globales no se utilizan automáticamente: la operación u otro objeto deben hacer referencia a ellos."
  },
  {
    "kind": "paragraph",
    "text": "$ref reemplaza el objeto donde aparece con una referencia a otro componente o documento, según las reglas de la versión. Las referencias internas utilizan un puntero JSON, como #/components/schemas/Cliente. Las referencias externas pueden apuntar a archivos o recursos de red. Es necesario controlar la identidad, la resolución relativa, la codificación de caracteres y la política de acceso para lograr compilaciones reproducibles."
  },
  {
    "kind": "paragraph",
    "text": "Dividir un contrato en muchos archivos mejora la organización, pero aumenta la complejidad de su resolución y empaquetado. La agrupación reúne recursos manteniendo las referencias; La desreferenciación reemplaza las referencias con contenido, lo que puede aumentar el tamaño y crear problemas con los ciclos. La herramienta de publicación debe producir un formulario compatible con el portal, el gateway y los consumidores sin perder la fuente modular."
  },
  {
    "kind": "paragraph",
    "text": "Las bibliotecas de esquemas empresariales pueden promover la coherencia, pero también unir dominios y obstaculizar la evolución. Los componentes compartidos deben representar conceptos verdaderamente estables, tener control de versiones y evitar que un cambio en un archivo central rompa decenas de API. La reutilización por coincidencia estructural es más peligrosa que la duplicación consciente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/es/figure-03.svg",
    "alt": "Referencias que conectan una operación con respuestas y esquemas reutilizables",
    "caption": "Figura 3: $ref conecta operaciones con componentes reutilizables, pero la gobernanza necesita controlar la identidad y la evolución."
  },
  {
    "kind": "subhead",
    "text": "Evite el componente universal"
  },
  {
    "kind": "paragraph",
    "text": "Un esquema de Persona utilizado por cliente, empleado, abogado y beneficiario tiende a acumular campos opcionales y reglas contradictorias. Prefiera modelos de operación orientados al contexto y solo comparta elementos con una semántica verdaderamente común."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.14 Seguridad en el contrato",
    "id": "12-14-seguridad-en-el-contrato"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describe mecanismos de seguridad mediante objetos de esquema de seguridad y aplica requisitos mediante objetos de requisitos de seguridad. Los esquemas comunes incluyen apiKey, http, oauth2, openIdConnect y mutualTLS en las versiones que lo admiten. La descripción indica cómo el consumidor presenta las credenciales, pero no contiene secretos ni implementa autenticación."
  },
  {
    "kind": "paragraph",
    "text": "Se puede definir un requisito global en la raíz y anularlo por operación. Una lista de requisitos representa alternativas lógicas; Varios esquemas en el mismo objeto representan una combinación. Esta sintaxis debe revisarse cuidadosamente: declarar OAuth o una clave API como alternativas es diferente a exigir ambas."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 debe informar los flujos, la URL de autorización, la URL del token y los alcances aplicables. OpenID Connect utiliza la URL de descubrimiento. Los tokens de portador se describen como portadores HTTP, con BearerFormat solo como una pista. mTLS describe la autenticación de certificados, pero los detalles del almacén de confianza, la emisión, la revocación y la asignación de sujetos permanecen en las políticas operativas."
  },
  {
    "kind": "paragraph",
    "text": "No coloque tokens, claves, contraseñas o certificados reales en ejemplos, descripciones o extensiones. Los contratos se copian en repositorios, portales y artefactos. Los datos de las pruebas también deben ser sintéticos para evitar exponer información o secretos personales."
  },
  {
    "kind": "code",
    "text": "OAuth 2.0 combinado con mTLS\ncomponents:\n  securitySchemes:\n    OAuthCorporativo:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes:\n            clientes.lectura: Consultar clientes\n    CertificadoCliente:\n      type: mutualTLS\nsecurity:\n  - OAuthCorporativo: [clientes.lectura]\n    CertificadoCliente: []"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.15 Ejemplos, devoluciones de llamada y webhooks",
    "id": "12-15-ejemplos-devoluciones-de-llamada-y-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "Los ejemplos concretan el contrato y alimentan la documentación, los mocks y las pruebas. Un esquema puede tener ejemplos y los objetos multimedia pueden tener ejemplos con nombre. Los ejemplos deben ser válidos según el esquema, cubrir casos representativos y evitar datos reales. Un ejemplo desactualizado genera más confusión que su ausencia, por lo que conviene validarlo automáticamente."
  },
  {
    "kind": "paragraph",
    "text": "Las devoluciones de llamada describen las solicitudes que el proveedor realizará a una URL proporcionada durante una operación. La ruta de devolución de llamada puede utilizar una expresión que extraiga la URL de la solicitud o respuesta. Son útiles en el procesamiento asincrónico, pero requieren modelado de autenticación de devolución de llamada, reintentos, idempotencia, disponibilidad y validación de URL para evitar el abuso de las conexiones salientes."
  },
  {
    "kind": "paragraph",
    "text": "Los webhooks definidos en la raíz describen las solicitudes iniciadas por el proveedor sin depender de una operación específica que registre la URL. La descripción informa el contrato del mensaje, pero la firma, la protección de reproducción, la entrega, el pedido y la política de reproducción requieren documentación adicional. Los consumidores deben considerar que los eventos pueden llegar duplicados o desordenados."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describe bien las operaciones individuales, pero los recorridos con múltiples llamadas y dependencias pueden requerir especificaciones, escenarios de prueba o documentos de flujo de trabajo adicionales. No fuerces todas las reglas temporales en descripciones largas; Utilice referencias gobernadas y ejemplos ejecutables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.16 Enfoque híbrido, primero el diseño, primero el código",
    "id": "12-16-enfoque-hibrido-primero-el-diseno-primero-el-codigo"
  },
  {
    "kind": "paragraph",
    "text": "En el design-first, el contrato se redacta y revisa antes de su implementación. Esto le permite involucrar a los consumidores, la arquitectura, la seguridad y el gateway mientras los cambios aún son económicos. Los mocks pueden desbloquear el desarrollo paralelo. El riesgo es que el contrato se aleje del código si el equipo no automatiza el cumplimiento."
  },
  {
    "kind": "paragraph",
    "text": "En code-first, el servicio se implementa y la descripción se genera a partir de anotaciones, reflexiones o metadatos. El enfoque reduce la duplicación inicial y tiende a seguir tipos de código, pero puede exponer detalles del marco, producir ID de operación inestables, omitir errores y dificultar la revisión de la experiencia antes del desarrollo. El contrato ahora refleja lo que estaba codificado, no necesariamente lo que debería ser público."
  },
  {
    "kind": "paragraph",
    "text": "El enfoque híbrido define un contrato canónico, genera parte del código y valida el runtime con respecto a él. También puede extraer la descripción del código y enviarla a reglas y aprobación como un artefacto. El punto esencial es establecer una fuente de verdad: cuando el contrato y el código divergen, ¿cuál se corrige y qué proceso impide la publicación?"
  },
  {
    "kind": "paragraph",
    "text": "La elección debe considerar la madurez del equipo, el ciclo de lanzamiento, la cantidad de consumidores, la necesidad de simulaciones, el soporte de herramientas y la gobernanza. En API externas o ampliamente compartidas, el design-first a menudo ofrece un mayor control. En servicios internos simples, el code-first puede ser aceptable siempre que el contrato publicado sea estable y esté revisado."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - El enfoque es una decisión de proceso, no sólo una decisión de herramienta.",
    "headers": [
      "Enfoque",
      "Fortaleza principal",
      "Riesgo principal",
      "Control necesario"
    ],
    "rows": [
      [
        "Design-first",
        "Revisión temprana y trabajo paralelo.",
        "Divergencia entre contrato y runtime.",
        "Ensayos de conformidad y generación controlada."
      ],
      [
        "Code-first",
        "Proximidad a tipos e implementación.",
        "Contrato acoplado al marco y tardío.",
        "Linting, diff y revisión del artefacto generado."
      ],
      [
        "Híbrido",
        "Combina contrato canónico y automatización.",
        "Flujo complejo sin una fuente clara de verdad.",
        "Prioridad explícita y política de pipeline."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.17 Análisis, validación y linting",
    "id": "12-17-analisis-validacion-y-linting"
  },
  {
    "kind": "paragraph",
    "text": "El análisis comprueba si se puede leer YAML o JSON. La validación estructural verifica si los objetos cumplen con la versión OAS. La resolución de referencia confirma que existen objetivos. La validación de esquemas analiza palabras clave y ejemplos. Linting aplica reglas de estilo, gobernanza y calidad que la especificación no requiere, como un ID de operación único, descripciones mínimas, convención de nomenclatura y respuestas obligatorias."
  },
  {
    "kind": "paragraph",
    "text": "Estos pasos deben separarse porque producen diagnósticos diferentes. Un documento puede ser sintácticamente válido y estructuralmente inválido; puede ser válido por la OAS y contradecir normas corporativas; puede pasar el linter y tener una referencia externa no disponible. Los mensajes de pipeline deben indicar el archivo, la ruta del objeto, la regla, la gravedad y la solución sugerida."
  },
  {
    "kind": "paragraph",
    "text": "Las reglas de Linting deben tener justificación y control de versiones. Convertir cada preferencia en un error de bloqueo crea fricciones y fomenta excepciones. Clasificar las reglas en error, advertencia e información; proporcionar un mecanismo de supresión rastreable; revisar falsos positivos; y medir qué reglas previenen incidentes o incompatibilidades reales."
  },
  {
    "kind": "paragraph",
    "text": "La validación debe ocurrir localmente, en la solicitud de extracción y antes de la publicación. El uso de diferentes versiones del analizador en cada paso produce resultados inconsistentes. Corrija versiones, registre sumas de verificación cuando sea necesario y actualice herramientas a través de un proceso controlado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.18 Servidores simulados, generación de SDK y stubs",
    "id": "12-18-servidores-simulados-generacion-de-sdk-y-stubs"
  },
  {
    "kind": "paragraph",
    "text": "Un servidor simulado interpreta el contrato y devuelve respuestas simuladas. Permite a los consumidores desarrollar antes que el backend, demuestra la API en portales y ejecuta pruebas de integración aisladas. El mock puede elegir ejemplos explícitos o generar valores a partir de esquemas. Los valores generados automáticamente no siempre representan casos comerciales realistas, por lo que los ejemplos nombrados son importantes."
  },
  {
    "kind": "paragraph",
    "text": "Los generadores transforman operaciones y esquemas en clientes, modelos o resguardos de servidor. El resultado depende del ID de operación, los nombres de los esquemas, la posibilidad de nulos, la composición y los formatos. Los cambios aparentemente cosméticos pueden cambiar el nombre de métodos o tipos. Antes de adoptar la generación masiva, el equipo debe evaluar la calidad del código, la extensibilidad, el manejo de errores, la autenticación, los reintentos y las actualizaciones de versiones."
  },
  {
    "kind": "paragraph",
    "text": "Los SDK generados no deben ocultar la semántica HTTP de forma peligrosa. Un método que genera la misma excepción para 400, 404 y 409 impide que los consumidores tomen decisiones. El generador o las plantillas deben preservar el estado, los encabezados, el cuerpo del error y la correlación. También es necesario definir quién publica el SDK, cómo se versiona y cómo se solucionan las vulnerabilidades en las dependencias."
  },
  {
    "kind": "paragraph",
    "text": "Los stubs de servidor aceleran el andamiaje, pero no implementan reglas comerciales, seguridad ni observabilidad. El código generado debe aislarse de las extensiones manuales para permitir la regeneración. Cambiar directamente los archivos generados crea conflictos y hace que las actualizaciones futuras sean impredecibles."
  },
  {
    "kind": "subhead",
    "text": "Mock no es homologación"
  },
  {
    "kind": "paragraph",
    "text": "Un mock demuestra que el consumidor comprende el contrato simulado. No prueba que el backend real cumpla con la semántica, la autorización, el rendimiento, la coherencia o los efectos secundarios. Utilice mocks para paralelismo y pruebas rápidas, y complételo con el cumplimiento de entornos reales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.19 Pruebas de contrato y cumplimiento",
    "id": "12-19-pruebas-de-contrato-y-cumplimiento"
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de contrato verifican que los mensajes y comportamientos observables coincidan con la descripción. Del lado del proveedor, las respuestas reales se pueden validar según el estado, el tipo de medio y el esquema. Del lado del consumidor, las solicitudes generadas se pueden validar antes de enviarlas. Las pruebas negativas confirman el rechazo de campos, formatos y estados no válidos."
  },
  {
    "kind": "paragraph",
    "text": "La validación en runtime debe equilibrar la seguridad y el costo. La validación de todas las cargas útiles grandes puede aumentar la latencia y el consumo de CPU; Es posible que validar solo muestras no bloquee las infracciones. Una estrategia común combina validación total en pruebas y homologación, protección selectiva en el gateway y observabilidad en producción. Los datos confidenciales deben estar enmascarados en los registros de errores."
  },
  {
    "kind": "paragraph",
    "text": "El cumplimiento no es sólo un esquema. Una respuesta puede tener una estructura válida y un estado incorrecto; un POST puede devolver 200 en lugar de 201; un GET puede modificar el estado; es posible que falte un encabezado obligatorio; una operación puede aceptar tipos de medios no declarados. Las pruebas deben cubrir la semántica, la seguridad y las reglas de compatibilidad de HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Los contratos impulsados por el consumidor capturan expectativas específicas del consumidor, mientras que OpenAPI describe la interfaz general. Los enfoques pueden complementarse entre sí: OpenAPI es la fuente amplia y los contratos de los consumidores validan las interacciones críticas. Es necesario evitar que expectativas particulares impidan una evolución legítima para todos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.20 Compatibilidad y cambios importantes",
    "id": "12-20-compatibilidad-y-cambios-importantes"
  },
  {
    "kind": "paragraph",
    "text": "Un cambio importante es aquel que podría provocar que un consumidor previamente compatible deje de funcionar. Eliminar ruta, operación, parámetro, propiedad o respuesta es un caso obvio. Hacer que un campo opcional sea obligatorio, restringir la enumeración, reducir el límite, cambiar el tipo o cambiar la seguridad también puede fallar. Los cambios aditivos suelen ser compatibles, pero dependen del comportamiento del consumidor."
  },
  {
    "kind": "paragraph",
    "text": "Agregar la propiedad de respuesta puede dañar a los clientes que rechazan campos desconocidos. Agregar un nuevo valor de enumeración puede romper los cambios exhaustivos. Agregar la respuesta 429 puede revelar una nueva condición operativa. Hacer más estricta la validación puede rechazar datos previamente aceptados. Por lo tanto, la semantic diff debe combinarse con políticas sólidas y conocimiento del ecosistema."
  },
  {
    "kind": "paragraph",
    "text": "El versionado del contrato debe distinguir la versión OAS, la versión del documento en info.version y la versión de la interfaz expuesta en la URL o encabezado. Sin esta distinción, los equipos actualizan openapi: 3.1.1 y creen que han creado una nueva versión empresarial. La convención debe definir cuándo se cambian los niveles mayor, menor y el parche y cómo se comunica la deprecación."
  },
  {
    "kind": "paragraph",
    "text": "Deprecar implica marcar como deprecated, publicar reemplazos, medir el uso, notificar a los consumidores, ofrecer fechas límite y eliminar solo después de los criterios. Un portal puede mostrar una advertencia, pero el gateway y la observabilidad deben identificar quién sigue llamando a la operación. El contrato sin telemetría no informa el impacto real de la eliminación."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La compatibilidad depende de la dirección de los datos y del comportamiento del consumidor.",
    "headers": [
      "Cambiar",
      "Clasificación probable",
      "¿Por qué?"
    ],
    "rows": [
      [
        "Quitar operación",
        "interruptor",
        "Los clientes no logran encontrar el punto final."
      ],
      [
        "Agregar propiedad opcional en respuesta",
        "Potencialmente compatible",
        "Los clientes estrictos pueden rechazar campos desconocidos."
      ],
      [
        "Agregar valor a la enumeración de respuesta",
        "Potencialmente disruptivo",
        "Es posible que el consumidor no se ocupe del nuevo caso."
      ],
      [
        "Entrada relajada minLength",
        "Compatible para clientes",
        "El servidor ahora acepta conjuntos más grandes."
      ],
      [
        "Hacer obligatorio el parámetro opcional",
        "interruptor",
        "Las solicitudes existentes dejan de ser válidas."
      ],
      [
        "Agregar ejemplo",
        "No rompible",
        "No cambia la validación, si el ejemplo ya es válido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.21 OpenAPI 3.0, 3.1 y 3.2",
    "id": "12-21-openapi-3-0-3-1-y-3-2"
  },
  {
    "kind": "paragraph",
    "text": "La línea 3.0 reorganizó profundamente el modelo con respecto a la versión 2.0, introduciendo servidores, componentes, requestBody y contenido por tipo de medio. La línea 3.1 acercó Schema Object al JSON Schema Draft 2020-12, permitió expresar nulo como tipo, agregó jsonSchemaDialect y perfeccionó varios puntos de interoperabilidad."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI 3.2.0 se publicó como una evolución adicional de la especificación. La adopción en entornos corporativos debe considerar el apoyo real de editores, generadores, validadores, portales y gateways. El hecho de que se publique una versión no significa que todas las cadenas de herramientas la implementarán de inmediato."
  },
  {
    "kind": "paragraph",
    "text": "La migración no debe realizarse simplemente cambiando el valor del campo openapi. Las palabras clave, la posibilidad de anulación, los ejemplos, las referencias y el comportamiento de las herramientas pueden cambiar. Realice una conversión controlada, valide la descripción resultante, compare los artefactos generados y pruebe las importaciones en todos los componentes críticos."
  },
  {
    "kind": "paragraph",
    "text": "Cuando un gateway admite solo una versión anterior, mantenga una fuente canónica y una transformación comprobada en lugar de editar manualmente dos descripciones. Documente las pérdidas de expresividad. Una conversión que elimina webhooks, devoluciones de llamadas, tipos o restricciones puede generar documentación que parece correcta pero semánticamente incompleta."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - La versión del contrato debe elegirse en función de la capacidad de la cadena completa.",
    "headers": [
      "Línea",
      "Características relevantes",
      "Atención operativa"
    ],
    "rows": [
      [
        "3.0.x",
        "Modelo OAS 3 con componentes, solicitudCuerpo y contenido.",
        "El Schema Object tiene diferencias con el JSON Schema completo."
      ],
      [
        "3.1.x",
        "Mayor alineación con JSON Schema 2020-12 y dialecto explícito.",
        "Las herramientas antiguas pueden interpretar la nulidad y las palabras clave de forma diferente."
      ],
      [
        "3.2.x",
        "Evolución publicada de la OAS.",
        "Confirme la compatibilidad de un extremo a otro antes de adoptarlo como formato canónico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.22 Portales, catálogos y API Gateways",
    "id": "12-22-portales-catalogos-y-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Los portales de desarrolladores representan operaciones, esquemas y ejemplos del contrato. Una descripción bien organizada reduce la documentación duplicada y permite la exploración interactiva. Sin embargo, la interfaz de prueba debe manejar la autenticación, CORS, los entornos y los datos de forma segura. Habilitar llamadas de producción directamente en el navegador puede resultar inadecuado para operaciones confidenciales."
  },
  {
    "kind": "paragraph",
    "text": "Los catálogos utilizan metadatos para descubrimiento, propiedad, clasificación de datos, dominio, ciclo de vida y dependencias. Parte de estos datos pueden estar en x-extensiones, pero la organización debe evitar acoplar el contrato a un catálogo específico innecesariamente. Una capa de metadatos externa puede complementar a la OAS y preservar la portabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways a menudo importan OpenAPI para crear rutas, métodos, políticas o productos. La importación no reemplaza la configuración del backend, los tiempos de espera, la autenticación, las transformaciones y la observabilidad. También puede haber diferencias entre lo que aceptal gateway y la versión canónica. El pipeline debe validar la transformación antes de aplicar cambios en producción."
  },
  {
    "kind": "paragraph",
    "text": "La publicación debe ser idempotente y rastreable. El mismo commit debe generar el artefacto del portal, la configuración del gateway y la evidencia de prueba. Los cambios manuales en la consola provocan deriva: el contrato dice una cosa, el gateway ejecuta otra. Exportar la configuración y comparar el estado ayuda a detectar divergencias."
  },
  {
    "kind": "subhead",
    "text": "El contrato no es una política de gateway completa"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI puede declarar la interfaz y la seguridad esperada, pero la limitación de velocidad, las cuotas, los disyuntores, las transformaciones, el enrutamiento, el registro y la protección contra amenazas generalmente requieren una configuración adicional. Las extensiones pueden ayudar, siempre y cuando sean estandarizadas y portátiles cuando sea posible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.23 Gobernanza y CI/CD",
    "id": "12-23-gobernanza-y-ci-cd"
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza eficaz convierte los estándares en retroalimentación automatizada. El repositorio debe contener la fuente canónica, reglas de pelusa, ejemplos, registro de cambios y propiedad. Las solicitudes de extracción ejecutan analizador, resolución, linter, validación de ejemplos, diferencias de compatibilidad, pruebas y generación de vista previa. Las aprobaciones pueden variar según el riesgo: una corrección textual no requiere el mismo flujo que una baja de operación."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas deben distinguir los requisitos universales de las convenciones por dominio. Cada API puede requerir un ID de operación único, un modelo de seguridad y error explícito; La clave de paginación o idempotencia depende de la operación. Las reglas demasiado genéricas producen contratos y extensiones artificiales para eludir el estándar."
  },
  {
    "kind": "paragraph",
    "text": "Los artefactos deben ser inmutables y promocionarse en todos los entornos. Regenerar el contrato en cada etapa puede introducir diferencias. Firme o registre la checksum, asocie la versión con la confirmación y conserve el informe de validación. Cuando el gateway transforma la descripción, también almacena el artefacto realmente importado."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas de gobernanza pueden incluir cobertura de respuesta, porcentaje de operaciones con ejemplos, violaciones por regla, tiempo de revisión, cambios importantes bloqueados, contratos de runtime desviados y uso de operaciones obsoletas. Las métricas deben guiar la mejora, no fomentar el llenado superficial."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/es/figure-04.svg",
    "alt": "Canal de gobernanza que reduce la divergencia entre contrato, portal, gateway y runtime",
    "caption": "Figura 4: La automatización reduce la divergencia y mantiene evidencia del contrato promocionado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.24 Troubleshooting",
    "id": "12-24-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Cuando una herramienta rechaza el contrato, primero identifique la capa de falla: YAML/JSON no válido, regla OAS, referencia no resuelta, palabra clave del JSON Schema, extensión desconocida o limitación específica del producto. Probar el mismo archivo en varios editores sin registrar versiones puede resultar confuso ya que cada implementación tiene una cobertura diferente."
  },
  {
    "kind": "paragraph",
    "text": "Los errores de referencia requieren verificar la base de URI, la ruta relativa, el puntero JSON, la codificación de caracteres y la disponibilidad de recursos. En entornos aislados, las referencias HTTP externas pueden fallar. Empaquetar dependencias o utilizar un registro interno hace que las compilaciones sean reproducibles. Los ciclos pueden ser válidos para modelos recursivos, pero algunos generadores no los admiten."
  },
  {
    "kind": "paragraph",
    "text": "Cuando la documentación y el runtime diverjan, capture la solicitud y la respuesta reales, identifique la operación por método y ruta, valide el tipo de medio y el esquema, verifique la versión implementada y compare la commit del contrato. El problema podría estar en el backend, el gateway, la transformación, la caché del portal o un artefacto antiguo. El hash y el identificador de compilación expuestos en los metadatos ayudan a correlacionarse."
  },
  {
    "kind": "paragraph",
    "text": "Los errores de importación de puertas de enlace deben reproducirse con el artefacto exacto. Verifique la versión, el tamaño, las extensiones, los esquemas complejos, los ID de operación duplicados, las rutas incompatibles y los esquemas de seguridad de OAS aceptados. No simplificar el contrato manualmente sin registrar lo perdido; crear pruebas automatizadas de transformación y regresión."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: El diagnóstico debe separar la validez de las especificaciones, el soporte de herramientas y el cumplimiento del runtime.",
    "headers": [
      "Síntoma",
      "Hipótesis inicial",
      "evidencia"
    ],
    "rows": [
      [
        "El editor no abre el archivo.",
        "Sintaxis YAML/JSON o tamaño excesivo.",
        "Analizador local, línea/columna y codificación."
      ],
      [
        "$referencia no encontrada",
        "Falta base relativa, puntero o archivo.",
        "URI resuelto y paquete generado."
      ],
      [
        "SDK cambia de nombre inesperadamente",
        "operationId o nombre de esquema inestable.",
        "Contrato de configuración de diferencial y generador."
      ],
      [
        "El portal muestra una versión antigua",
        "Caché o artefacto no promocionado.",
        "Suma de comprobación, confirmación y marca de tiempo de publicación."
      ],
      [
        "El gateway ignora la restricción",
        "El importador no admite palabras clave.",
        "Matriz de soporte y configuración efectiva."
      ],
      [
        "La respuesta real falla en el esquema",
        "Desviación del runtime o esquema incorrecto.",
        "Carga útil enmascarada e informe de validación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.25 Estudios de casos y laboratorios",
    "id": "12-25-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudio de caso 1: contrato generado después del backend"
  },
  {
    "kind": "paragraph",
    "text": "Un equipo implementó puntos finales y generó OpenAPI mediante anotaciones. El contrato publicado contenía solo 200 respuestas, esquemas sin requisitos e ID de operación derivados de nombres de métodos Java. Después de la refactorización interna, los SDK se regeneraron con nombres diferentes y los consumidores tuvieron que cambiar el código a pesar de que las URL y las cargas útiles seguían siendo las mismas."
  },
  {
    "kind": "paragraph",
    "text": "La solución fue estabilizar los ID de operación, modelar respuestas de error, declarar obligatorio y enviar el artefacto generado para diferenciar y revisar. El caso muestra que el code-first no elimina el diseño del contrato; simplemente cambia el punto en el que necesita ser controlado."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudio de caso 2: importación parcial al gateway"
  },
  {
    "kind": "paragraph",
    "text": "Un contrato OpenAPI 3.1 utilizaba palabras clave de JSON Schema no reconocidas por el importador del gateway. La importación finalizó sin un error grave, pero se descartaron algunas restricciones. El portal mostró el esquema completo mientras que el runtime aceptó mensajes más amplios."
  },
  {
    "kind": "paragraph",
    "text": "El equipo creó un paso de transformación para la versión compatible, publicó un informe de pérdidas y mantuvo la validación de mensajes críticos en un componente compatible. Se comenzaron a realizar pruebas de regresión para comparar el contrato canónico, el artefacto transformado y la conducta efectiva."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1: crear y validar una API de cliente"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cree información, servidores y etiquetas para una API de cliente ficticia.",
      "Describa GET /clientes/{clienteId} y POST /clientes con operationIds estables.",
      "Modelo de cliente, nuevo cliente y Problem Details en componentes/esquemas.",
      "Incluye parámetros, ejemplos, respuestas 201, 400, 401, 404, 409 y 500 según el comportamiento definido.",
      "Ejecutar analizador, validación estructural y linter; corregir cada diagnóstico registrando la causa."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2: detectar cambios importantes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cree una versión inicial del contrato y genere un cliente.",
      "Elimine una propiedad, haga que otra sea obligatoria y agregue un valor de enumeración de respuesta.",
      "Realice una semantic diff y clasifique cada cambio por dirección de datos.",
      "Restaurar la compatibilidad o proponer una nueva versión principal con plan de deprecación."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3: publicar con mock y gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Inicie un servidor simulado a partir de los ejemplos y valide un consumidor simple.",
      "Genere un paquete para importar y compárelo con la fuente modular.",
      "Importe a un gateway autorizada o a un entorno de simulador y registre los campos ignorados.",
      "Compare una respuesta real con el esquema y produzca un informe de cumplimiento."
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
    "text": "OpenAPI proporciona un lenguaje estandarizado para describir interfaces HTTP de forma legible y procesable. El contrato conecta a los consumidores, el backend, las pruebas, la documentación, el portal, el gateway y la gobernanza. Su valor depende de la precisión de rutas, operaciones, parámetros, cuerpos, respuestas, esquemas y seguridad."
  },
  {
    "kind": "paragraph",
    "text": "La descripción no reemplaza la implementación ni garantiza el cumplimiento. El análisis, la validación, el linting, los ejemplos, las pruebas y la observabilidad son necesarios para mantener alineados el contrato y el runtime. La reutilización con componentes y $ref reduce la duplicación, pero requiere control de identidad, modularización y compatibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los enfoques híbridos y de design-first, primero el código y pueden funcionar cuando hay una fuente de verdad y un canal que bloquea los desacuerdos. Los cambios importantes deben detectarse semánticamente y evaluarse mediante el comportamiento real del consumidor. La versión OAS, la versión de contrato y la versión de API pública son conceptos distintos."
  },
  {
    "kind": "paragraph",
    "text": "En las plataformas empresariales, OpenAPI debe tratarse como un artefacto gobernado: versionado, revisado, validado, promovido y correlacionado con el estado del gateway y el portal. Un archivo que simplemente se representa en una interfaz de usuario no es suficiente; el objetivo es un contrato confiable que reduzca la ambigüedad y permita una automatización segura."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "Después de formalizar el contrato con OpenAPI, el curso puede profundizar en el control de versiones, la compatibilidad, la gobernanza y el ciclo de vida de la API, conectando las decisiones de diseño con la publicación, la obsolescencia y la operación a escala."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación para revisar una OpenAPI Description",
    "id": "lista-de-verificacion-para-revisar-una-openapi-description"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La versión de openapi es compatible con el analizador, el portal, el generador y el gateway utilizados en la pipeline.",
      "La información identifica API, versión, responsable y alcance sin confundir la versión de OAS.",
      "Cada operación tiene un resumen, un ID de operación único, etiquetas, entradas y respuestas relevantes.",
      "Los parámetros tienen ubicación coherente, mandato, esquema y serialización.",
      "Los cuerpos de solicitud y las respuestas declaran los tipos de medios realmente admitidos.",
      "Los esquemas tienen tipos, requisitos, límites y estrategias para campos desconocidos.",
      "Los errores siguen un modelo común y preservan el estado, la correlación y los detalles seguros.",
      "Los esquemas y requisitos de seguridad representan correctamente alternativas y combinaciones.",
      "Los ejemplos son sintéticos, válidos y probados automáticamente.",
      "Las referencias se pueden resolver y el paquete publicado es reproducible.",
      "La diferencia de compatibilidad se realiza con la versión actualmente compatible.",
      "El portal, el gateway y el runtime se pueden correlacionar con el mismo commit y checksum."
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
      "Explique por qué una OpenAPI Description válida aún puede ser un contrato débil.",
      "Diferenciar OpenAPI Specification, descripción OpenAPI, Swagger 2.0 y Swagger UI.",
      "Modele la operación PATCH /clientes/{id} y describa la diferencia entre un campo faltante y nulo.",
      "Cree un objeto de parámetro para una lista de estado y elija estilo/explosión, justificando la serialización.",
      "Modele las respuestas 200, 304, 404 y 412 para un GET condicional con ETag.",
      "Compare allOf y oneOf y presente un caso en el que las alternativas superpuestas hagan que oneOf no sea válido.",
      "Describir cómo requerir simultáneamente OAuth 2.0 y mTLS y cómo declarar alternativas.",
      "Clasificar como compatible o incompatible la adición de una propiedad opcional en respuesta.",
      "Proponer un pipeline de gobernanza para el contrato de design-first publicado en un API Gateway.",
      "Explique cómo investigar una discrepancia entre la documentación del portal y la respuesta real."
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
        "OAS",
        "OpenAPI Specification, estándar para describir API HTTP."
      ],
      [
        "ODA",
        "OpenAPI Descripción, documento concreto que describe una API."
      ],
      [
        "OpenAPI Object",
        "Descripción del objeto raíz."
      ],
      [
        "Path Item",
        "Objeto asociado a una plantilla de ruta y sus operaciones."
      ],
      [
        "Operation Object",
        "Descripción de una operación HTTP específica."
      ],
      [
        "Schema Object",
        "Estructura de datos y restricciones sobre parámetros y mensajes."
      ],
      [
        "JSON Schema",
        "Vocabulario para describir y validar documentos JSON."
      ],
      [
        "$referencia",
        "Referencia a otro objeto o documento."
      ],
      [
        "agrupación",
        "Embalaje de documentos que mantienen referencias."
      ],
      [
        "Desreferenciación",
        "Reemplazo de referencias con contenido referenciado."
      ],
      [
        "pelusa",
        "Aplicación de normas de calidad y gobierno."
      ],
      [
        "Semantic diff",
        "Comparación que considera el impacto del contrato, no sólo el texto."
      ],
      [
        "servidor simulado",
        "Servidor simulado basado en el contrato y ejemplos."
      ],
      [
        "Design-first",
        "Proceso en el que el contrato precede a la ejecución."
      ],
      [
        "Code-first",
        "Proceso en el que el contrato se deriva del código."
      ],
      [
        "Deriva",
        "Divergencia entre contrato, configuración publicada y runtime."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Ejemplo de contrato integrado",
    "id": "anexo-a-ejemplo-de-contrato-integrado"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente extracto reúne los elementos centrales estudiados: metadatos, servidor, ruta, operación, parámetro, seguridad, respuesta y esquema reutilizable. Es deliberadamente compacto y debe ampliarse con errores, ejemplos y reglas específicos antes de su uso real."
  },
  {
    "kind": "code",
    "text": "Ejemplo consolidado en YAML\nopenapi: 3.1.1\ninfo:\n  title: API de Clientes\n  version: 1.0.0\nservers:\n  - url: https://api.empresa.example/clientes/v1\npaths:\n  /clientes/{clienteId}:\n    get:\n      operationId: obtenerCliente\n      security:\n        - OAuthCorporativo: [clientes.lectura]\n      parameters:\n        - name: clienteId\n          in: path\n          required: true\n          schema: { type: string, pattern: '^[0-9]{10}$' }\n      responses:\n        '200':\n          description: Cliente localizado\n          content:\n            application/json:\n              schema: { $ref: '#/components/schemas/Cliente' }\n        '404': { $ref: '#/components/responses/NoEncontrado' }\ncomponents:\n  securitySchemes:\n    OAuthCorporativo:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes: { clientes.lectura: Consultar clientes }\n  schemas:\n    Cliente:\n      type: object\n      required: [id, nombre, status]\n      properties:\n        id: { type: string }\n        nombre: { type: string, maxLength: 120 }\n        status: { type: string, enum: [ACTIVO, BLOQUEADO] }"
  },
  {
    "kind": "subhead",
    "text": "Cómo utilizar el archivo adjunto"
  },
  {
    "kind": "paragraph",
    "text": "Valide el fragmento, genere documentación, inicie un mock y luego agregue respuestas de autenticación, autorización, validación, conflicto e indisponibilidad. Luego ejecute un diff después de cambiar la enumeración, los requisitos y los esquemas para observar el impacto."
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
      "Iniciativa OpenAPI. OpenAPI Specification 3.2.0. Documento normativo publicado el 19 de septiembre. 2025.",
      "Iniciativa OpenAPI. OpenAPI Specification 3.1.1. Documento normativo publicado el 24 de octubre. 2024.",
      "Iniciativa OpenAPI. Aprenda OpenAPI: introducción, estructura, rutas, componentes, seguridad, referencias y mejores prácticas.",
      "JSON Schema. Borrador 2020-12: especificaciones básicas y de validación.",
      "IETF. RFC 9110 - Semántica HTTP.",
      "IETF. RFC 9111: almacenamiento en caché HTTP.",
      "IETF. RFC 9457: Problem Details para las API HTTP.",
      "Fielding, Roy T. Estilos arquitectónicos y diseño de arquitecturas de software basadas en red. 2000.",
      "Iniciativa OpenAPI. Especificación Arazzo 1.1.0, para describir secuencias de llamadas y dependencias."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota sobre las versiones"
  },
  {
    "kind": "paragraph",
    "text": "La especificación y el soporte de las herramientas evolucionan. Antes de adoptar funciones de una versión, consulte la documentación oficial y pruebe toda la cadena: editor, analizador, linter, generador, portal, gateway y runtime. Este material prioriza principios duraderos y utiliza la familia OpenAPI 3 como base."
  }
];
