import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const HTTP_VERSIONS_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "HTTP a menudo se presenta a través de breves ejemplos GET y POST, pero esta vista es insuficiente para quienes operan puertas de enlace empresariales. En producción, HTTP es un protocolo con su propia semántica, estrictas reglas de delimitación, mecanismos de negociación, caché, condiciones, intermediarios y diferentes mapeos de transporte. Una llamada que parece ser una solicitud única se puede recibir en HTTP/3 en el borde, convertirse a HTTP/2 hasta la puerta de enlace y reenviarse en HTTP/1.1 al backend. Cada salto tiene su propia conexión, estado, timeout, compresión de campo y riesgo operativo."
  },
  {
    "kind": "paragraph",
    "text": "Las versiones HTTP/1.1, HTTP/2 y HTTP/3 no representan tres API diferentes. Comparten métodos, códigos de estado, campos y conceptos de representación definidos por la semántica HTTP, pero codifican y transportan estos elementos de diferentes maneras. HTTP/1.1 utiliza una sintaxis textual sobre una secuencia TCP; HTTP/2 introduce tramas binarias y flujos multiplexados a través de una conexión; HTTP/3 lleva la semántica HTTP a QUIC, que funciona sobre UDP e integra TLS 1.3 en el transporte."
  },
  {
    "kind": "paragraph",
    "text": "Para un ingeniero de API Gateway, la distinción entre semántica y control de versiones por cable es fundamental. Un error 405 no es consecuencia de TCP o QUIC; indica que el método no está permitido por el recurso. Un timeout HTTP sin respuesta apunta a otra capa. Es posible que la puerta de enlace haya generado un 502 después de una conexión fallida con el canal ascendente. El comportamiento intermitente en HTTP/2 puede implicar límites de flujo, ventana de flujo, drenaje o una traducción inapropiada a HTTP/1.1 en el siguiente salto."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo construye un modelo mental completo: primero establece la semántica común, luego profundiza en el formato y las conexiones de HTTP/1.1, luego explica la arquitectura de frame y flujo de HTTP/2 y finalmente presenta QUIC y HTTP/3. El objetivo no es memorizar listas, sino comprender qué propiedades permanecen estables, cuáles cambian entre versiones y qué evidencia se debe recopilar en cada punto de una arquitectura empresarial."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La semántica HTTP pertenece a la operación; la versión HTTP y la conexión pertenecen a cada salto. Un proxy finaliza un mensaje, aplica reglas y crea un mensaje nuevo para el siguiente destino."
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
      "Explicar la arquitectura semántica de HTTP y separar el significado, la representación y el mapeo de transporte.",
      "Interprete el método, el objetivo de la solicitud, la autoridad, los campos, el contenido, los avances y los códigos de estado.",
      "Distinguir seguridad, idempotencia y capacidad de caché de los métodos principales.",
      "Diseñe el almacenamiento en caché y la revalidación mediante Cache-Control, Age, ETag, Last-Modified y solicitudes condicionales.",
      "Interprete la sintaxis HTTP/1.1, incluidos CRLF, longitud de contenido, codificación de transferencia y mensajes sin contenido.",
      "Comprenda las conexiones persistentes, la canalización, el mantenimiento de actividad, los tiempos de espera y el bloqueo de cabecera de línea.",
      "Reconozca los riesgos de análisis divergente, request smuggling, división de respuestas y campos salto por salto.",
      "Explicar tramas, flujos, multiplexación, control de flujo, GOAWAY y HPACK en HTTP/2.",
      "Comprenda ALPN, h2, h2c, fusión de conexiones y límites de concurrencia.",
      "Explique QUIC, integración de TLS 1.3, Connection IDs, migración, pérdida y transmisiones independientes.",
      "Comprenda tramas HTTP/3, flujos de control, QPACK, Alt-Svc y descubrimiento de HTTPS/SVCB.",
      "Compare HTTP/1.1, HTTP/2 y HTTP/3 en cuanto a latencia, observabilidad, seguridad y funcionamiento.",
      "Aplicar los conceptos a Axway API Gateway, Azure API Management y arquitecturas con múltiples proxies.",
      "Diagnostica fallas a través de seguimientos, encabezados, registros, métricas de conexión y capturas de tráfico."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estructura del capítulo"
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Organización conceptual del capítulo.",
    "headers": [
      "Bloquear",
      "Contenido",
      "Pregunta guía"
    ],
    "rows": [
      [
        "un",
        "Semántica HTTP",
        "¿Qué significa el mensaje independientemente de la versión?"
      ],
      [
        "b",
        "HTTP/1.1",
        "¿Cómo se delimitan los mensajes de texto dentro de una secuencia TCP?"
      ],
      [
        "c",
        "HTTP/2",
        "¿Cómo comparten eficientemente una conexión los fotogramas y las transmisiones?"
      ],
      [
        "re",
        "HTTP/3 y QUIC",
        "¿Cómo reducir los bloqueos y hacer que la conexión, la seguridad y la movilidad sean parte del transporte?"
      ],
      [
        "y",
        "Puertas de enlace y operación",
        "¿Cómo conviven las distintas versiones y cómo localizar fallos en cada salto?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP: protocolo de aplicación y arquitectura semántica",
    "id": "http-protocolo-de-aplicacion-y-arquitectura-semantica"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9110 define HTTP como un protocolo de aplicación sin estado para sistemas distribuidos y establece conceptos comunes a todas las versiones. \"Sin estado\" no significa que las aplicaciones no puedan mantener la sesión o el estado comercial. Significa que el protocolo no requiere que el servidor preserve, entre solicitudes independientes, el contexto necesario para interpretar el siguiente mensaje. El estado se puede representar en recursos, bases de datos, cookies, tokens, cachés o sesiones, pero cada solicitud debe contener suficiente información para ser procesada según el contrato."
  },
  {
    "kind": "paragraph",
    "text": "La unidad semántica principal es un mensaje de solicitud o respuesta. Una solicitud expresa un método aplicado a un objetivo, acompañado de campos y, opcionalmente, contenido. Una respuesta comunica el resultado a través de un código de estado, campos y posible contenido. HTTP no determina que el contenido sea JSON ni que la API sea REST. El protocolo puede transportar HTML, imágenes, XML, Protobuf, archivos, eventos y otros formatos registrados o acordados entre las partes."
  },
  {
    "kind": "paragraph",
    "text": "La semántica también define propiedades que guían a los intermediarios. Los cachés necesitan saber cuándo se puede reutilizar una respuesta; los servidores proxy deben diferenciar los campos destinados al siguiente salto de los metadatos de un extremo a otro; los clientes deben decidir cuándo se puede repetir una operación después de un fallo; Las puertas de enlace deben preservar la autoridad, el método y el contenido sin crear ambigüedad. Estas propiedades son más importantes para la interoperabilidad que la apariencia textual que se ve en un ejemplo de HTTP/1.1."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-01-shared-semantics.svg",
    "alt": "Semántica HTTP común asignada de forma diferente por HTTP/1.1, HTTP/2 y HTTP/3",
    "caption": "Figura 1: la semántica es compartida; cada versión define un mapeo diferente para la red."
  },
  {
    "kind": "subhead",
    "text": "Lectura para puertas de enlace"
  },
  {
    "kind": "paragraph",
    "text": "Cuando una puerta de enlace recibe HTTP/2 y llama a un backend en HTTP/1.1, no \"reenvía fotogramas\". Decodifica un mensaje, ejecuta políticas y genera otro mensaje compatible con el siguiente protocolo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Evolución: de los mensajes mínimos al transporte multiplexado",
    "id": "evolucion-de-los-mensajes-minimos-al-transporte-multiplexado"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/0.9 tenía una forma extremadamente simple: una solicitud GET seguida de la ruta y una respuesta compuesta por el documento. No hubo códigos de estado, campos, negociación de tipos ni conexión persistente. Esta simplicidad se adaptaba a los primeros documentos web, pero no ofrecía mecanismos adecuados para aplicaciones distribuidas complejas. HTTP/1.0 introdujo versiones de línea iniciales, códigos de estado, campos y tipos de medios, lo que le permite representar metadatos y contenido diferente."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 consolidó conexiones persistentes de forma predeterminada, el campo Host, almacenamiento en caché más completo, solicitudes condicionales, transferencias fragmentadas y reglas de framing. El protocolo ahora admite múltiples sitios en la misma dirección IP y reduce el costo de abrir una conexión por objeto. Aun así, la dependencia de un flujo TCP ordenado y un formato secuencial ha creado límites para páginas y API con muchas operaciones simultáneas."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 conservó la semántica y reemplazó el formato de mensaje de texto con frames binarios asociados con transmisiones. Esto nos permitió intercalar múltiples intercambios en la misma conexión y comprimir campos repetitivos con HPACK. HTTP/3 mantuvo el modelo de flujos y frames, pero reemplazó TCP con QUIC. Por lo tanto, la pérdida en un flujo no necesariamente impide la entrega de datos disponibles de otros flujos, y el protocolo de enlace criptográfico se convierte en parte del establecimiento de transporte."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-02-http-evolution.svg",
    "alt": "Cronología de la evolución de HTTP/0.9 a HTTP/3",
    "caption": "Figura 2 - Evolución histórica del protocolo HTTP."
  },
  {
    "kind": "subhead",
    "text": "Compatibilidad semántica"
  },
  {
    "kind": "paragraph",
    "text": "Un método GET sigue siendo GET en HTTP/1.1, HTTP/2 y HTTP/3. Lo que cambia es cómo se representan y transportan el método, el objetivo, los campos y el contenido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modelo de transacción: solicitud, respuesta y mensajes autodescriptivos.",
    "id": "modelo-de-transaccion-solicitud-respuesta-y-mensajes-autodescriptivos"
  },
  {
    "kind": "paragraph",
    "text": "Una transacción HTTP comienza cuando un cliente envía una solicitud a un servidor de origen o intermediario. La solicitud contiene información de control y metadatos que le permiten determinar el recurso, la operación y la forma de respuesta esperada. El servidor produce una o más respuestas informativas y una respuesta final. En HTTP/1.1, los elementos aparecen como líneas y campos; en HTTP/2 y HTTP/3, se convierten en pseudocampos y frames."
  },
  {
    "kind": "paragraph",
    "text": "El contenido de un mensaje es conceptualmente diferente de su representación en el cable. Campos como Content-Type y Content-Encoding describen la representación. El framing le indica cómo ubicar el contenido dentro de la conexión. En HTTP/1.1, Content-Length o fragmentado pueden delimitar el cuerpo; En HTTP/2 y HTTP/3, el contenido se carga en frames de DATOS y el final de la transmisión indica su finalización. Confundir metadatos de representación con frames produce errores y vulnerabilidades de interoperabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los avances son campos enviados después del contenido. Pueden transportar metadatos calculados al final de la transmisión, como la integridad o el estado de los protocolos creados en HTTP. No todos los intermediarios conservan los remolques y el contrato debe considerar esta posibilidad. En las puertas de enlace, convertir la transmisión en búfer completo puede cambiar la latencia, la memoria consumida y la capacidad de entregar avances al cliente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-03-message-anatomy.svg",
    "alt": "Anatomía conceptual de una solicitud y respuesta HTTP",
    "caption": "Figura 3 - Anatomía conceptual de solicitud y respuesta."
  },
  {
    "kind": "code",
    "text": "POST /v1/payments HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAccept: application/json\nContent-Length: 42\n{\"amount\":100.00,\"currency\":\"BRL\"}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Identificadores, URI, autoridad y destino de la solicitud",
    "id": "identificadores-uri-autoridad-y-destino-de-la-solicitud"
  },
  {
    "kind": "paragraph",
    "text": "Un URI identifica un recurso o referencia utilizada en la interacción. En el uso común de API, el URI incluye esquema, autoridad, ruta y consulta. En `https://api.example.com:443/v1/accounts/123? view=summary`, el esquema es HTTPS, la autoridad contiene host y puerto, la ruta identifica una jerarquía lógica y la consulta agrega parámetros. El fragmento, cuando está presente en un URI, lo procesa el cliente y no se envía en la solicitud HTTP."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 utiliza diferentes formas de solicitud-objetivo según el método y el tipo de intermediario. El formulario de origen envía ruta y consulta; la forma absoluta es típica en proxies directos; CONNECT utiliza el formulario de autoridad; y la forma de asterisco aparece en OPCIONES `*`. El campo Host es obligatorio en HTTP/1.1 e informa a la autoridad prevista. En HTTP/2 y HTTP/3, pseudocampos como `:scheme`, `:authority`, `:path` y `:method` representan estos componentes."
  },
  {
    "kind": "paragraph",
    "text": "Las puertas de enlace deben tratar a la autoridad con cuidado porque participa en el enrutamiento, la selección de certificados, las políticas y la protección contra ataques al encabezado del host. Un proxy puede recibir una dirección pública y llamar a un host interno diferente; Esto no autoriza a sustituir indiscriminadamente el significado de la autoridad original. En algunas arquitecturas, el backend necesita conocer el host externo a través de campos \"reenviados\" o equivalentes, pero estos campos solo deben ser confiables cuando los ingresan intermediarios controlados."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Componentes comunes de un URI HTTP.",
    "headers": [
      "Componente",
      "Ejemplo",
      "Uso técnico"
    ],
    "rows": [
      [
        "esquema",
        "https",
        "Define el esquema de seguridad y las expectativas."
      ],
      [
        "autoridad",
        "api.ejemplo.com:443",
        "Identifica el host y el puerto lógico del origen."
      ],
      [
        "Camino",
        "/v1/cuentas/123",
        "Selecciona recurso o ruta."
      ],
      [
        "Consulta",
        "ver=resumen",
        "Parámetros no jerárquicos."
      ],
      [
        "Fragmento",
        "#sección",
        "No se envía al servidor."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Métodos: intención, seguridad semántica e idempotencia.",
    "id": "metodos-intencion-seguridad-semantica-e-idempotencia"
  },
  {
    "kind": "paragraph",
    "text": "El método expresa la intención de la solicitud. GET solicita la transferencia de una representación; HEAD solicita los mismos metadatos sin contenido de respuesta; POST pide al recurso que procese el contenido según su semántica; PUT reemplaza o crea estado en el URI de destino; DELETE solicita la eliminación de la asociación actual; OPCIONES describe las opciones de comunicación; CONNECT establece un túnel; TRACE ejecuta un diagnóstico de bucle invertido y normalmente está deshabilitado en entornos corporativos."
  },
  {
    "kind": "paragraph",
    "text": "Un método seguro se define como esencialmente de sólo lectura: el cliente no solicita un cambio en el estado del servidor. Esto no impide los registros, las métricas o la facturación operativa, pero sí significa que el efecto deseado no es un cambio empresarial. Idempotencia significa que repetir la misma intención varias veces debería producir el mismo efecto deseado que una sola ejecución. PUT y DELETE son semánticamente idempotentes, aunque las respuestas observables y los efectos secundarios pueden variar."
  },
  {
    "kind": "paragraph",
    "text": "La distinción es decisiva para los retries. Una puerta de enlace puede repetir una solicitud GET después de un fallo de conexión con menos riesgo semántico. Volver a intentar la POST de pago puede duplicar la operación si el backend procesó el contenido antes de que se perdiera la respuesta. Las API financieras a menudo introducen una clave de idempotencia de la aplicación, manteniendo el resultado asociado con una clave única. Esta estrategia complementa, pero no cambia, la semántica del método HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-04-method-properties.svg",
    "alt": "Comparación de seguridad e idempotencia de los principales métodos HTTP",
    "caption": "Figura 4 - Propiedades semánticas de los métodos principales."
  },
  {
    "kind": "subhead",
    "text": "Reintentar no es sólo una decisión técnica"
  },
  {
    "kind": "paragraph",
    "text": "Antes de configurar los retries en la puerta de enlace, clasifique la operación, determine el punto en el que el flujo ascendente puede haber tenido efecto y defina cómo se detectarán los duplicados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Códigos de estado y autoría de respuesta",
    "id": "codigos-de-estado-y-autoria-de-respuesta"
  },
  {
    "kind": "paragraph",
    "text": "El código de estado describe el resultado del intento de interpretar y satisfacer la solicitud. Las respuestas 1xx son informativas; 2xx indica éxito; 3xx aconseja la redirección o el uso de otra representación; 4xx indican que la solicitud no puede atenderse en las condiciones presentadas; 5xx informe del servidor o fallo del intermediario. La clase es relevante, pero el código específico y los campos asociados proporcionan la semántica completa."
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas con proxies, el código final puede ser creado por cualquier intermediario. Un 401 puede provenir de una política de autenticación de puerta de enlace sin que se llame al backend. Un 429 puede representar el límite de velocidad del borde. Un 502 normalmente indica que una puerta de enlace no obtuvo una respuesta válida desde el nivel ascendente; un 504 representa el timeout que actúa como puerta de enlace. Los registros deben registrar la autoría, la etapa de la política y el estado ascendente por separado."
  },
  {
    "kind": "paragraph",
    "text": "Las frases de motivo HTTP/1.1 son informativas y no deben controlar la lógica. HTTP/2 y HTTP/3 llevan el código en `:status` y no llevan la frase de motivo. Los clientes deben tomar decisiones basándose en el número y los campos, no en textos como \"OK\" o \"No autorizado\". En las API, las respuestas de error pueden agregar un formato de problema, correlación y detalles, pero el cuerpo no reemplaza la semántica de estado."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Códigos frecuentes en API corporativas.",
    "headers": [
      "Código",
      "Significado operacional",
      "Punto de atención en pasarelas"
    ],
    "rows": [
      [
        "200",
        "Operación completada con representación.",
        "Se puede almacenar en caché según los campos y el método."
      ],
      [
        "201",
        "Recurso creado.",
        "La ubicación puede identificar el nuevo recurso."
      ],
      [
        "204",
        "Éxito sin contenido.",
        "No inventes un cuerpo durante la transformación."
      ],
      [
        "304",
        "La representación almacenada sigue siendo válida.",
        "No es una respuesta normal del cuerpo."
      ],
      [
        "400",
        "Solicitud no válida.",
        "Puede provenir de análisis, validación o contrato."
      ],
      [
        "401",
        "Credenciales faltantes o no válidas.",
        "WWW-Authenticate describe el desafío."
      ],
      [
        "403",
        "Entidad entendida pero no autorizada.",
        "No confundir con falla de autenticación."
      ],
      [
        "404",
        "Recurso no encontrado u oculto.",
        "Podría provenir del enrutamiento de la puerta de enlace."
      ],
      [
        "409",
        "Conflicto con el estado actual.",
        "Útil en competición e idempotencia."
      ],
      [
        "413",
        "Contenido demasiado grande.",
        "Puede existir límite en cada intermediario."
      ],
      [
        "429",
        "Límite excedido.",
        "Reintentar después puede guiar el retry."
      ],
      [
        "502",
        "Respuesta no válida desde arriba.",
        "Investigue la conexión y el análisis entre la puerta de enlace y el backend."
      ],
      [
        "503",
        "Servicio no disponible.",
        "Piscina vacía, mantenimiento o sobrecarga."
      ],
      [
        "504",
        "Tiempo de espera de la puerta de enlace.",
        "Descubra qué salto expiró primero."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Campos HTTP: metadatos, alcance y normalización",
    "id": "campos-http-metadatos-alcance-y-normalizacion"
  },
  {
    "kind": "paragraph",
    "text": "Los campos HTTP son pares nombre-valor extensibles. Llevan información sobre control, representación, almacenamiento en caché, autenticación, negociación e intermediarios. Los nombres no distinguen entre mayúsculas y minúsculas, aunque los valores pueden tener reglas específicas. Un campo puede permitir una sola aparición, varias ocurrencias o una lista que se puede componer. Las implementaciones no deben concatenar campos indiscriminadamente, especialmente `Set-Cookie`, cuya semántica requiere un tratamiento específico."
  },
  {
    "kind": "paragraph",
    "text": "RFC 9110 distingue los campos de un extremo a otro de la información relacionada con la conexión. HTTP/1.1 utiliza el campo Conexión para declarar nombres de campos que se aplican solo al siguiente salto. Los intermediarios deben eliminar estos campos antes de reenviar. HTTP/2 y HTTP/3 prohíben varios campos específicos de la conexión, ya que los flujos y los frames reemplazan mecanismos como `Transfer-Encoding: fragmentado`. Replicar encabezados HTTP/1.1 sin comprender su alcance puede provocar fallas en el protocolo."
  },
  {
    "kind": "paragraph",
    "text": "La normalización es necesaria pero peligrosa. Las puertas de enlace pueden cambiar las mayúsculas, el orden, combinar líneas, eliminar espacios opcionales o reconstruir mensajes. Las solicitudes no deben depender del orden de los campos. Por otro lado, las firmas HTTP y los esquemas de autenticación pueden definir una canonicalización explícita. Se debe ejecutar una política de puerta de enlace que modifique los valores firmados antes de firmar o preservar exactamente los componentes cubiertos."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Categorías de campos relevantes para las API.",
    "headers": [
      "categoría",
      "Ejemplos",
      "Función"
    ],
    "rows": [
      [
        "Enrutamiento y orientación",
        "Anfitrión, reenviado",
        "Identificar la autoridad y el camino a través de intermediarios."
      ],
      [
        "Representación",
        "Tipo de contenido, codificación de contenido, idioma de contenido",
        "Describe el contenido transferido."
      ],
      [
        "Negociación",
        "Aceptar, Aceptar-Codificación, Aceptar-Idioma",
        "Expresar las preferencias del cliente."
      ],
      [
        "caché",
        "Control de caché, Edad, ETag, Variar",
        "Controlar el almacenamiento y la reutilización."
      ],
      [
        "Autenticación",
        "Autorización, autenticación WWW",
        "Presentar credencial o desafío."
      ],
      [
        "Condición",
        "Si coincide, Si no coincide, Si se modifica desde",
        "Ejecutar la operación según el estado conocido."
      ],
      [
        "Observabilidad",
        "traceparent, tracestate, correlación",
        "Propagar contexto entre servicios."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Representaciones, tipos de medios y negociación de contenidos.",
    "id": "representaciones-tipos-de-medios-y-negociacion-de-contenidos"
  },
  {
    "kind": "paragraph",
    "text": "Un recurso es una abstracción; la representación es una secuencia de bytes y metadatos que describe un estado de ese recurso. El mismo recurso se puede representar como JSON, XML, CSV o imagen. `Content-Type` informa el tipo de medio de la representación enviada, mientras que `Accept` expresa qué tipos el cliente considera aceptables. Enviar JSON sin `Content-Type: application/json` obliga al receptor a inferir o rechazar el contenido."
  },
  {
    "kind": "paragraph",
    "text": "La negociación de contenido puede ocurrir de manera proactiva, utilizando los campos Aceptar, Aceptar-Codificación y Aceptar-Idioma, o reactivamente, cuando el servidor ofrece alternativas. El campo Variar informa qué dimensiones de la solicitud influyeron en la selección de la respuesta y es esencial para las cachés. Si una respuesta varía según \"Aceptar-Codificación\", un caché no debe entregar bytes comprimidos con gzip a un cliente que no los acepta."
  },
  {
    "kind": "paragraph",
    "text": "Content-Encoding describe transformaciones aplicadas a la representación, como gzip o br. No debe confundirse con Transfer-Encoding, que en HTTP/1.1 participa en el framing de mensajes. Las puertas de enlace que descomprimen contenido para su inspección deben decidir si recomprimir, corregir la Content-Length, preservar ETag cuando sea semánticamente válido y considerar límites de expansión para evitar ataques de descompresión."
  },
  {
    "kind": "code",
    "text": "GET /reports/2026 HTTP/1.1\nHost: api.example.com\nAccept: application/json, application/xml;q=0.8\nAccept-Encoding: br, gzip\nHTTP/1.1 200 OK\nContent-Type: application/json\nContent-Encoding: gzip\nVary: Accept, Accept-Encoding"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Caché HTTP: frescura, reutilización e invalidación",
    "id": "cache-http-frescura-reutilizacion-e-invalidacion"
  },
  {
    "kind": "paragraph",
    "text": "El almacenamiento en caché HTTP no es sólo una optimización del navegador. Las CDN, los proxies inversos y las puertas de enlace pueden almacenar respuestas y atender solicitudes sin llamar al backend. RFC 9111 define cuándo una respuesta puede almacenarse, considerarse nueva, reutilizarse o revalidarse. Cache-Control incluye directivas como max-age, no-cache, no-store, private, public y must-revalidate. \"no-cache\" no significa \"no almacenar\"; significa que la respuesta debe validarse antes de su reutilización, excepto para reglas específicas."
  },
  {
    "kind": "paragraph",
    "text": "La antigüedad de una respuesta considera el tiempo desde su generación y permanencia en cachés. El campo Edad informa la edad estimada. Las cachés compartidas deben respetar las políticas de autorización y privacidad. En las API bancarias, almacenar respuestas personalizadas sin la clave de caché adecuada puede provocar fugas entre usuarios. La clave normalmente incluye URI y dimensiones indicadas por Vary, pero las puertas de enlace pueden agregar reglas específicas según la identidad, el inquilino o el producto."
  },
  {
    "kind": "paragraph",
    "text": "Invalidar la caché es difícil porque pueden existir copias en varios niveles. Las estrategias incluyen TTL corto, control de versiones de URI, depuración explícita y revalidación. La elección debe equilibrar la coherencia, el coste y la disponibilidad. Un backend no disponible puede protegerse mediante respuestas almacenadas, pero servir información antigua en operaciones financieras puede ser inaceptable. La política de caché es una decisión de dominio, no sólo de rendimiento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-05-etag-revalidation.svg",
    "alt": "Flujo de revalidación de caché condicional con ETag",
    "caption": "Figura 5 - Revalidación condicional con ETag."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Solicitudes condicionales y control de concurrencia",
    "id": "solicitudes-condicionales-y-control-de-concurrencia"
  },
  {
    "kind": "paragraph",
    "text": "Las solicitudes condicionales le permiten realizar una operación solo si el estado del recurso satisface una condición. `If-None-Match` se utiliza para revalidar el caché o garantizar la creación solo cuando no existe ninguna representación actual. `If-Match` requiere que la entidad actual coincida con una ETag y es útil para evitar la pérdida de actualizaciones. Los campos basados ​​en fechas, como If-Modified-Since y If-Unmodified-Since, tienen menor granularidad y confiabilidad que los validadores opacos."
  },
  {
    "kind": "paragraph",
    "text": "ETag es un identificador de la representación seleccionada. Una ETag fuerte indica equivalencia byte a byte adecuada para operaciones como rangos; uno débil indica suficiente equivalencia semántica para ciertos usos de la caché. No es necesario que sea un hash criptográfico ni que revele una versión interna. Las puertas de enlace que transforman el contenido pueden invalidar la ETag del backend, porque la representación entregada al cliente ya no es la misma."
  },
  {
    "kind": "paragraph",
    "text": "En control optimista, el cliente lee una representación con ETag, la cambia localmente y envía PUT o PATCH con If-Match. Si otro actor modificó el recurso, el servidor responde 412 Precondición fallida. Esto evita sobrescribir silenciosamente una actualización simultánea. La política debe implementarse en el componente que controla el estado del negocio; una puerta de enlace puede validar la presencia y el formato, pero no conoce la versión actual del recurso por sí sola."
  },
  {
    "kind": "code",
    "text": "GET /accounts/123\n<- ETag: \"v17\"\nPATCH /accounts/123\nIf-Match: \"v17\"\nContent-Type: application/merge-patch+json\n{\"nickname\":\"Reserva\"}\n<- 204 No Content   o   412 Precondition Failed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/1.1: sintaxis textual y flujo de bytes",
    "id": "http-1-1-sintaxis-textual-y-flujo-de-bytes"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 representa los mensajes como una línea de inicio, una secuencia de campos, una línea vacía y contenido opcional. Las líneas están delimitadas por CRLF. Una solicitud comienza con método, destino de solicitud y versión; una respuesta comienza con la versión y el estado. Aunque las herramientas muestran mensajes en un formato legible, la implementación debe manejar octetos, límites, espacios y caracteres prohibidos de acuerdo con la especificación. La excesiva tolerancia hacia los mensajes no válidos es una fuente recurrente de inconsistencia entre intermediarios."
  },
  {
    "kind": "paragraph",
    "text": "El receptor necesita determinar dónde termina cada mensaje en una conexión persistente. TCP entrega un flujo de mensajes sin límites: un `recv()` puede devolver parte de una línea, varias líneas o datos de mensajes consecutivos. El analizador HTTP acumula bytes, reconoce la sección del campo y aplica reglas de framing. La conexión no puede simplemente utilizar el \"fin del paquete\" como límite, ya que los paquetes IP y los segmentos TCP son detalles inferiores que se pueden dividir o combinar."
  },
  {
    "kind": "paragraph",
    "text": "En las API, existen límites de tamaño para la fila inicial, los campos y el contenido en todos los clientes, WAF, puertas de enlace y servidores. La puerta de enlace puede rechazar un campo aceptado por el borde; una carga útil permitida por la puerta de enlace puede exceder el backend. Es necesario coordinar los ajustes. Los errores 400, 413, 414 y 431 ayudan a diferenciar entre solicitudes con formato incorrecto, contenido extenso, URI largos y campos excesivos."
  },
  {
    "kind": "code",
    "text": "HTTP-message = start-line CRLF\n               *( field-line CRLF )\n               CRLF\n               [ message-body ]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Framing en HTTP/1.1: Content-Length, chunked y ausencia de cuerpo",
    "id": "framing-en-http-1-1-content-length-chunked-y-ausencia-de-cuerpo"
  },
  {
    "kind": "paragraph",
    "text": "Content-Length informa la Content-Length en octetos. Cuando es válido, el receptor lee exactamente esa cantidad después de la línea vacía. `Transfer-Encoding: fragmentado` codifica el contenido en bloques, cada uno precedido por un tamaño hexadecimal y terminando con un fragmento cero y avances opcionales. Chunked le permite transmitir sin conocer el tamaño total de antemano, pero es un mecanismo salto por salto y no aparece en HTTP/2 o HTTP/3."
  },
  {
    "kind": "paragraph",
    "text": "No todas las respuestas tienen cuerpo. Las respuestas a HEAD no incluyen contenido, aunque los campos describen lo que habría devuelto un GET. Los códigos 1xx, 204 y 304 tienen reglas específicas sin contenido. Las respuestas exitosas a CONNECT cambian la conexión al modo túnel. En otros casos, cerrar la conexión puede limitar la respuesta, pero esto impide la reutilización y es menos sólida."
  },
  {
    "kind": "paragraph",
    "text": "Múltiples longitudes de contenido con valores diferentes, una combinación incorrecta de longitud de contenido y codificación de transferencia o una sintaxis fragmentada no válida deben tratarse como un error. Si un proxy y un backend eligen reglas diferentes, es posible que no estén de acuerdo sobre dónde termina la solicitud. El resultado puede variar desde la corrupción de la conexión hasta el request smuggling. La estrategia segura es un análisis estricto y una normalización consistente antes del reenvío."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-06-http1-framing.svg",
    "alt": "Formas de delimitar el contenido del mensaje en HTTP/1.1",
    "caption": "Figura 6: Dos formas comunes de delimitar contenido en HTTP/1.1."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Determinación de longitud en HTTP/1.1.",
    "headers": [
      "Situación",
      "¿Cómo se determina la longitud?",
      "Nota"
    ],
    "rows": [
      [
        "Responder a la CABEZA",
        "Sin contenido",
        "Los campos pueden describir un GET equivalente."
      ],
      [
        "1xx, 204, 304",
        "Sin contenido",
        "El framing no debería inventar monos."
      ],
      [
        "CONECTAR 2xx",
        "Túnel tras cabeceras",
        "Los siguientes bytes no son mensajes HTTP ordinarios."
      ],
      [
        "Transfer-Encoding final fragmentada",
        "Se reduce al tamaño cero",
        "Los avances pueden seguir al fragmento cero."
      ],
      [
        "Longitud válida del contenido",
        "Número exacto de octetos",
        "Los valores en conflicto son un error."
      ],
      [
        "Respuesta sin frame explícito",
        "Hasta que se cierre la conexión",
        "No reutilizable y susceptible de truncamiento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Conexiones persistentes, reutilización, pooling y tiempos de espera",
    "id": "conexiones-persistentes-reutilizacion-pooling-y-tiempos-de-espera"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 utiliza conexiones persistentes de forma predeterminada. Después de una respuesta, el cliente y el servidor pueden reutilizar TCP/TLS para nuevas solicitudes, lo que reduce los protocolos de enlace y la latencia. La reutilización sólo es segura cuando el mensaje anterior ha sido completamente delimitado y consumido. Si un cliente abandona un cuerpo sin leerlo, la conexión puede desalinearse para la siguiente transacción."
  },
  {
    "kind": "paragraph",
    "text": "Las puertas de enlace mantienen grupos de conexiones para los servidores. El grupo separa la conexión del cliente de la conexión ascendente: cientos de clientes pueden compartir un grupo de conexiones persistentes, según la competencia y la capacidad. Los parámetros relevantes incluyen el máximo por objetivo, el tiempo de inactividad, la vida útil, el timeout de conexión, el timeout de lectura y la validación antes de la reutilización. Un equilibrador de carga puede finalizar conexiones inactivas antes de la puerta de enlace, provocando reinicios al reutilizar sockets aparentemente válidos."
  },
  {
    "kind": "paragraph",
    "text": "Los tiempos de espera deben formar un presupuesto coherente. El cliente tiene que esperar más tiempo que el borde; el borde, más que la puerta de entrada; la puerta de enlace, tiempo suficiente para el backend, pero menos que el límite total del consumidor. Si todos usan el mismo valor, los componentes pueden caducar simultáneamente y producir tormentas de retries. Los registros deben distinguir el tiempo de conexión, el envío, la espera del primer byte y la lectura del contenido."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Límites y tiempos de espera de conexión.",
    "headers": [
      "Parámetro",
      "que limites",
      "Síntoma cuando es inapropiado"
    ],
    "rows": [
      [
        "Tiempo de espera de conexión",
        "Establecimiento de TCP/TLS en sentido ascendente",
        "Falla rápidamente o espera demasiado antes de enviar."
      ],
      [
        "Tiempo de espera de lectura/respuesta",
        "Esperando respuesta o datos",
        "504 incluso cuando el backend se completa más tarde."
      ],
      [
        "Tiempo de inactividad",
        "Tiempo sin tráfico en conexión reutilizable",
        "RST al reutilizar una conexión terminada por otro salto."
      ],
      [
        "Vida útil máxima",
        "Vida total de la conexión",
        "Ayuda a renovar DNS y distribuir conexiones."
      ],
      [
        "Tamaño de la piscina",
        "Conexiones simultáneas por destino",
        "Cola local, latencia o exceso de sockets."
      ],
      [
        "Tiempo de espera total de la solicitud",
        "Presupuesto de operación",
        "Necesita incluir políticas y todos los saltos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Pipelining y bloqueo head-of-line en HTTP/1.1",
    "id": "pipelining-y-bloqueo-head-of-line-en-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "La canalización le permite enviar múltiples solicitudes a través de una conexión sin esperar cada respuesta. Sin embargo, las respuestas deben emitirse en el mismo orden. Si la primera solicitud lleva tiempo, las respuestas listas de solicitudes posteriores se retrasan. Este bloqueo se conoce como encabezado de línea en el nivel HTTP/1.1. La complejidad de los retries, los servidores intermediarios y las implementaciones inconsistentes han limitado la adopción práctica de la canalización."
  },
  {
    "kind": "paragraph",
    "text": "Los clientes a menudo han solucionado el problema abriendo múltiples conexiones paralelas por fuente. Esto aumenta los apretones de manos, el uso de puertos, la congestión de las colas y la presión sobre los equilibradores. Para las API, varias conexiones pueden distribuir la carga de manera diferente a una conexión HTTP/2 con muchas transmisiones. Las métricas basadas únicamente en \"conexiones activas\" no representan correctamente la competencia cuando las versiones coexisten."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 fue diseñado para multiplexar solicitudes independientes sin imponer un orden global de respuestas. Aun así, todas las tramas viajan a través de un flujo TCP, por lo que una pérdida de segmento puede retrasar la entrega de bytes posteriores de todos los flujos. HTTP/3 traslada el aislamiento de flujo al transporte QUIC."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-07-http1-hol.svg",
    "alt": "Bloqueo de encabezado de línea en respuestas de canalización HTTP/1.1",
    "caption": "Figura 7: Cabeza de línea en la canalización HTTP/1.1."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Intermediarios, campos salto a salto y transformación",
    "id": "intermediarios-campos-salto-a-salto-y-transformacion"
  },
  {
    "kind": "paragraph",
    "text": "El proxy es un participante HTTP que recibe un mensaje y reenvía otro. Puede seleccionar el siguiente destino, aplicar autenticación, transformar contenido, almacenar en caché o registrar telemetría. Una puerta de enlace actúa como intermediario con políticas basadas en API. No es necesario que el mensaje de salida sea byte por byte igual que la entrada, pero debe preservar la semántica definida y cumplir con los requisitos de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Los campos salto a salto pertenecen a una única conexión y no deben reenviarse automáticamente. En HTTP/1.1, Connection declara opciones aplicables al salto; TE tiene uso restringido; Transfer-Encoding y Upgrade describen la conexión actual. HTTP/2 y HTTP/3 eliminan o reemplazan estos conceptos. Una puerta de enlace traduce el framing y no debe enviar \"Transfer-Encoding: fragmentada\" en una secuencia HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "Las transformaciones pueden cambiar la Content-Length, la codificación del contenido, la etiqueta ET, la firma, la capacidad de caché y la transmisión. Una política que convierte XML a JSON necesita definir un nuevo tipo de contenido y recalcular la longitud. Si la puerta de enlace almacena en búfer para validar el esquema, la primera respuesta puede ser más lenta y el consumo de memoria puede aumentar con las cargas útiles. La arquitectura debe documentar qué transformaciones están permitidas y en qué salto."
  },
  {
    "kind": "subhead",
    "text": "Regla de funcionamiento"
  },
  {
    "kind": "paragraph",
    "text": "Capture el mensaje lógico antes y después de cada política relevante. Comparar solo los paquetes perimetrales con los registros de backend ignora las transformaciones introducidas en el camino."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Parsing divergente y seguridad de mensajes HTTP/1.1",
    "id": "parsing-divergente-y-seguridad-de-mensajes-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "El request smuggling ocurre cuando dos participantes interpretan los límites de los mensajes de manera diferente. Un atacante envía una cadena ambigua; el primer proxy considera una parte como un cuerpo, mientras que el segundo interpreta los bytes restantes como una nueva solicitud. Esto puede eludir controles, envenenar el caché, mezclar respuestas entre usuarios o tomar rutas imprevistas. Las variaciones clásicas explotan los conflictos entre Content-Length y Transfer-Encoding, pero el problema general es el desacuerdo en el análisis."
  },
  {
    "kind": "paragraph",
    "text": "La división de respuestas explora la inserción de delimitadores de línea en valores que terminan incrustados en los encabezados, creando campos o respuestas adicionales. Las implementaciones deben rechazar CR y LF no permitidos. La normalización inconsistente de espacios, nombres y caracteres también puede crear discrepancias. El principio es aceptar sólo sintaxis válida, rechazar ambigüedades y evitar reenviar mensajes parcialmente interpretados."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 y HTTP/3 tienen frames binarios, pero pueden participar en ataques cuando un intermediario convierte mensajes a HTTP/1.1 de forma insegura. Una solicitud H2 puede contener metadatos que, cuando se serializan, crean ambigüedades en el backend H1. Por lo tanto, la seguridad requiere validación en el punto de traducción, no sólo en el borde. Las actualizaciones recientes de especificaciones también refinan los requisitos de actualización y los datos anticipados; Los operadores deben realizar un seguimiento de las erratas y RFC que actualizan el comportamiento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-08-request-smuggling.svg",
    "alt": "Contrabando de solicitudes causado por interpretaciones de framings divergentes",
    "caption": "Figura 8: Ejemplo conceptual de request smuggling a través de un frame divergente."
  },
  {
    "kind": "subhead",
    "text": "Defensa en profundidad"
  },
  {
    "kind": "paragraph",
    "text": "Utilice analizadores conformes, elimine combinaciones ambiguas, normalice una vez, mantenga actualizados el frontend y el backend y pruebe explícitamente las traducciones H2/H3 a H1."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/2: capa de framing binario",
    "id": "http-2-capa-de-framing-binario"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 es una expresión optimizada de la semántica HTTP. Una vez establecida la conexión, los participantes intercambian tramas binarias con un encabezado fijo que informa la longitud, el tipo, las banderas y el ID de la transmisión. Los frames HEADERS contienen bloques de campos comprimidos; LOS DATOS transportan contenido; AJUSTES negocia parámetros; WINDOW_UPDATE controla el flujo; RST_STREAM finaliza una transmisión; GOAWAY inicia la terminación coordinada de la conexión."
  },
  {
    "kind": "paragraph",
    "text": "Un mensaje HTTP se asigna a una secuencia de fotogramas en una secuencia. La corriente tiene un identificador y un ciclo de vida independientes. La solicitud y la respuesta de una operación utilizan la misma secuencia. Se pueden entrelazar tramas de diferentes flujos, lo que permite la concurrencia sin abrir una conexión TCP para cada llamada. El receptor reconstruye cada mensaje utilizando el ID de transmisión y indicadores como END_HEADERS y END_STREAM."
  },
  {
    "kind": "paragraph",
    "text": "El protocolo comienza con un prefacio de conexión y un intercambio de AJUSTES. Los parámetros incluyen el tamaño de la tabla de campos, el número máximo de transmisiones simultáneas, el tamaño de la ventana inicial y el tamaño máximo del frame. Es necesario confirmar la CONFIGURACIÓN. La configuración es direccional: lo que anuncia un punto final limita el comportamiento del par cuando le envía."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-09-http2-streams.svg",
    "alt": "Frames de diferentes transmisiones entrelazados a través de una conexión HTTP/2",
    "caption": "Figura 9: Frames de múltiples transmisiones que comparten una conexión HTTP/2."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Tramas HTTP/2 importantes.",
    "headers": [
      "frame",
      "Alcance",
      "Propósito"
    ],
    "rows": [
      [
        "FECHA",
        "corriente",
        "Contenido del mensaje y posible END STREAM."
      ],
      [
        "ENCABEZADOS",
        "corriente",
        "Bloque de arranque o remolques comprimidos."
      ],
      [
        "AJUSTES",
        "Conexión",
        "Parámetros y capacidades direccionales."
      ],
      [
        "ACTUALIZACIÓN DE VENTANA",
        "Conexión o transmisión",
        "Incrementar el crédito de control de flujo."
      ],
      [
        "PRIMERA CORRIENTE",
        "corriente",
        "Cancelar una operación específica."
      ],
      [
        "ping",
        "Conexión",
        "Mida la vida/RTT sin semántica HTTP."
      ],
      [
        "GOAWAY",
        "Conexión",
        "Detener nuevos arroyos y drenar los existentes."
      ],
      [
        "ACTUALIZACIÓN PRIORITARIA",
        "corriente",
        "Prioridad de señal según plantilla extensible actual."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Streams, estados y cierre",
    "id": "streams-estados-y-cierre"
  },
  {
    "kind": "paragraph",
    "text": "Las transmisiones pueden estar inactivas, abiertas, medio cerradas, reservadas o cerradas, según las tramas enviadas y recibidas. END_STREAM cierra la dirección del remitente y permite que continúe la otra dirección. RST_STREAM finaliza inmediatamente la transmisión e informa un código de error. Los errores de transmisión no tienen por qué interrumpir toda la conexión; Los errores de conexión requieren GOAWAY y apagado."
  },
  {
    "kind": "paragraph",
    "text": "GOAWAY contiene el ID de transmisión más grande que puede haberse procesado y un código de error. El par no debe crear nuevos flujos en la conexión y puede repetir operaciones de flujo por encima del límite, considerando la idempotencia. En implementaciones y drenajes, las puertas de enlace deben emitir GOAWAY y permitir la finalización de los flujos aceptados. La terminación abrupta de TCP convierte el mantenimiento planificado en fallas de red indistinguibles."
  },
  {
    "kind": "paragraph",
    "text": "La cantidad de transmisiones en competencia está limitada por SETTINGS_MAX_CONCURRENT_STREAMS y los recursos locales. Un cliente puede mantener una conexión, pero ser bloqueado esperando que el crédito abra una nueva transmisión. Las métricas deben mostrar transmisiones activas, pendientes y rechazadas, no solo conexiones. Un solo cliente con HTTP/2 puede generar una alta competencia por una conexión."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - Eventos del ciclo de vida en HTTP/2.",
    "headers": [
      "Evento",
      "Efecto",
      "Decisión operativa"
    ],
    "rows": [
      [
        "FINALIZAR TRANSMISIÓN en solicitud",
        "Contenido terminado por el cliente.",
        "Gateway puede iniciar el procesamiento o la transmisión completos."
      ],
      [
        "FINALIZAR TRANSMISIÓN en respuesta",
        "Mensaje finalizado del servidor.",
        "La transmisión puede cerrarse si ambas direcciones han terminado."
      ],
      [
        "PRIMERA CORRIENTE",
        "Cancela una transmisión específica.",
        "Registrar lanzador y código; Es posible que ya exista un efecto comercial."
      ],
      [
        "SALIDA SIN ERROR",
        "Drenaje coordinado.",
        "Abra una nueva conexión para nuevas transmisiones."
      ],
      [
        "GOAWAY con error",
        "Fallo de conexión.",
        "Evaluar retries por flujo e idempotencia."
      ],
      [
        "Límite de transmisión",
        "Nuevas operaciones esperan.",
        "Incrementar las conexiones o ajustar la competencia con cautela."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Multiplexación, control de flujo y presión de memoria.",
    "id": "multiplexacion-control-de-flujo-y-presion-de-memoria"
  },
  {
    "kind": "paragraph",
    "text": "La multiplexación permite entrelazar tramas, pero no elimina la necesidad de contrapresión. HTTP/2 aplica control de flujo a DATOS a nivel de conexión y flujo. El receptor anuncia crédito; a medida que consume bytes, envía WINDOW_UPDATE. Si la aplicación no lee una secuencia, su ventana puede restablecerse. Si la ventana de conexión se restablece, se impide que todas las transmisiones envíen DATOS, incluso si algunos consumidores son rápidos."
  },
  {
    "kind": "paragraph",
    "text": "El control de flujo no es lo mismo que el control de congestión TCP. El primero protege los buffers del receptor y de la aplicación; el segundo adapta el envío a la capacidad de la red. Ambos actúan simultáneamente. El aumento de las ventanas puede mejorar el rendimiento en rutas de productos con un alto retardo de ancho de banda, pero aumenta la memoria potencial. Las puertas de enlace deben limitar las transmisiones, los frames, los campos y el contenido para evitar que unos pocos clientes monopolicen los recursos."
  },
  {
    "kind": "paragraph",
    "text": "El HTTP/2 original tenía un mecanismo de dependencia y ponderación de prioridades que resultó difícil de implementar de manera interoperable. La especificación actual elimina el antiguo modelo central y permite un esquema extensible. Los operadores no deben asumir que la prioridad del cliente se respetará de extremo a extremo, especialmente cuando hay servidores proxy que reordenan o convierten protocolos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-10-multiplexing-hol.svg",
    "alt": "Multiplexación HTTP/2 y bloqueo residual causado por la pérdida de TCP",
    "caption": "Figura 10: Multiplexación HTTP/2 y bloqueo residual causado por TCP."
  },
  {
    "kind": "subhead",
    "text": "Síntoma clásico"
  },
  {
    "kind": "paragraph",
    "text": "Una conexión TCP en buen estado, un ping HTTP/2 que responde y algunas transmisiones detenidas pueden indicar una ventana de flujo agotada o una aplicación que ha dejado de consumir contenido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HPACK: compresión de campos con estado por conexión",
    "id": "hpack-compresion-de-campos-con-estado-por-conexion"
  },
  {
    "kind": "paragraph",
    "text": "Las API repiten campos como método, esquema, host, tipo de contenido y autenticación. Enviarlos completos con cada solicitud aumenta los gastos generales. HPACK comprime bloques de campos utilizando una tabla estática de entradas comunes, una tabla dinámica construida durante la conexión, representaciones literales y codificación Huffman. Se puede hacer referencia a una entrada repetida mediante el índice en lugar de transmitir el nombre y el valor."
  },
  {
    "kind": "paragraph",
    "text": "La tabla dinámica es direccional y está sincronizada por el orden de los bloques en la conexión. El codificador decide qué valores ingresar; el decodificador mantiene la misma secuencia. Cambiar el tamaño de la tabla o recibir un índice no válido puede generar un error de compresión y finalizar la conexión. Los intermediarios finalizan HPACK: la puerta de enlace decodifica los campos del cliente y crea su propia codificación cuando se conecta al backend."
  },
  {
    "kind": "paragraph",
    "text": "Los campos sensibles como Autorización o cookies no deben indexarse cuando hacerlo aumenta el riesgo o la retención. HPACK incluye representación \"nunca indexada\". La compresión también interactúa con ataques de canal lateral cuando los secretos y los datos controlados comparten contexto. Los límites de tamaño de la lista de campos siguen siendo necesarios, porque una representación compacta puede expandirse a una gran cantidad de metadatos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-11-hpack.svg",
    "alt": "Bloques de campo, tablas estáticas y dinámicas y representación HPACK compacta",
    "caption": "Figura 11 - Componentes conceptuales de HPACK."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Negociación: TLS, ALPN, h2 y h2c",
    "id": "negociacion-tls-alpn-h2-y-h2c"
  },
  {
    "kind": "paragraph",
    "text": "En la web segura, HTTP/2 normalmente se negocia a través de TLS a través de ALPN. El cliente anuncia protocolos, por ejemplo `h2` y `http/1.1`; el servidor selecciona uno y lo informa en el protocolo de enlace. Esto evita enviar una solicitud en el formato incorrecto. El certificado y el nombre aún deben ser válidos para el origen. Una vez que se selecciona h2, el cliente envía el prefacio y los frames HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 también puede funcionar sin TLS usando el identificador h2c, con conocimiento previo o Actualización desde HTTP/1.1, pero este modo es menos común en el tráfico público. En las redes internas, algunos componentes usan h2c para gRPC, mientras que TLS termina en sidecar o puerta de enlace. Esta decisión reduce el cifrado en un paso y debe evaluarse según la confianza, el cumplimiento y la observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "La fusión de conexiones permite reutilizar una conexión HTTP/2 para múltiples fuentes cuando se cumplen los requisitos de resolución, certificado y autoridad. Esto mejora la eficiencia, pero puede sorprender al equilibrio basado en conexiones. Las puertas de enlace y las CDN deben evitar que se proporcione autoridad no autorizada en la conexión. El origen lógico sigue estando determinado por la semántica, no solo por la dirección IP conectada."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-12-alpn.svg",
    "alt": "Negociación HTTP/2 o HTTP/1.1 sobre ALPN durante el protocolo de enlace TLS",
    "caption": "Figura 12 - Negociación del protocolo de solicitud con ALPN."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/3: semántica HTTP sobre QUIC",
    "id": "http-3-semantica-http-sobre-quic"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 asigna la semántica HTTP a QUIC. QUIC es un transporte orientado a conexión encapsulado en UDP, con flujos, control de flujo, detección de pérdidas, control de congestión, seguridad y migración de rutas. TLS 1.3 está integrado en el protocolo de enlace; No existe ningún modo HTTP/3 sin protección criptográfica según la especificación. La aplicación ve flujos confiables y ordenados individualmente, no datagramas UDP sin procesar."
  },
  {
    "kind": "paragraph",
    "text": "Al igual que HTTP/2, HTTP/3 usa ENCABEZADOS y frames de DATOS, pero los frames viajan en flujos QUIC. Cada solicitud utiliza un flujo bidireccional iniciado por el cliente. Los flujos unidireccionales transportan control y QPACK. Las funciones que QUIC ya ofrece, como la identificación de flujo y el control de flujo, no están duplicadas por la capa HTTP. Por lo tanto, algunos frames y mecanismos HTTP/2 desaparecen o cambian."
  },
  {
    "kind": "paragraph",
    "text": "Usar UDP no significa que HTTP/3 no sea confiable. QUIC implementa confirmación, retransmisión y ordenación de transmisiones. La diferencia es que estas funciones están en el espacio del usuario, integradas con criptografía y capaces de evolucionar sin depender de la implementación TCP del sistema operativo. Los firewalls y middleboxes que bloquean UDP pueden impedir QUIC, lo que requiere un respaldo a HTTP/2 o HTTP/1.1."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-13-protocol-stacks.svg",
    "alt": "Comparación de pilas HTTP/1.1, HTTP/2 y HTTP/3",
    "caption": "Figura 13: Pilas simplificadas de HTTP/1.1, HTTP/2 y HTTP/3."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 no es \"HTTP/2 sobre UDP\". Reutiliza ideas de flujos y frames, pero delega en QUIC propiedades que en HTTP/2 dependen de TCP y TLS separados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Handshake QUIC, TLS 1.3 y 0-RTT",
    "id": "handshake-quic-tls-1-3-y-0-rtt"
  },
  {
    "kind": "paragraph",
    "text": "El protocolo de enlace QUIC negocia los parámetros de transporte y ejecuta TLS 1.3. En una nueva conexión, el cliente puede enviar un paquete inicial que contiene datos ClientHello; el servidor responde y las claves evolucionan a través de niveles de cifrado. En condiciones normales, los datos de la aplicación se pueden enviar con un número reducido de viajes de ida y vuelta. QUIC protege casi todo el contenido de control, reduciendo la visibilidad pasiva disponible para los middleboxes."
  },
  {
    "kind": "paragraph",
    "text": "En las conexiones reanudadas, 0-RTT puede permitir que el cliente envíe datos de la aplicación antes de reconocer completamente el nuevo protocolo de enlace. Estos datos no tienen la misma protección de reproducción que los datos 1-RTT. Los servidores deben aceptar 0-RTT solo para operaciones seguras de reproducción o aplicar mecanismos anti-reproducción e idempotencia. Un POST financiero no debe considerarse seguro sólo porque utiliza TLS."
  },
  {
    "kind": "paragraph",
    "text": "QUIC aplica protección de amplificación antes de validar la dirección del cliente: el servidor limita los bytes enviados en relación con los recibidos. Los tokens de retry pueden ayudar a validar el origen y controlar el abuso, a costa de viajes de ida y vuelta adicionales. Las puertas de enlace en el borde deben escalar el estado de intercambio, los umbrales y la protección DoS sin tratar todo el UDP como tráfico sin sesión."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Pasos relevantes del establecimiento de QUIC.",
    "headers": [
      "Fase",
      "Protección/propiedad",
      "Riesgo operacional"
    ],
    "rows": [
      [
        "Inicial",
        "Claves derivables para habilitar el enrutamiento y el inicio del protocolo de enlace.",
        "No confundir con falta de integridad; El contenido no es un secreto fuerte contra el observador."
      ],
      [
        "apretón de manos",
        "TLS autentica y negocia claves finales.",
        "La pérdida o bloqueo de UDP aparece como un error antes que HTTP."
      ],
      [
        "1-RTT",
        "Datos normales protegidos.",
        "Streams activas y control de flujo."
      ],
      [
        "0-RTT",
        "Primeros datos en reanudación.",
        "Posible repetición; restringir las operaciones."
      ],
      [
        "Reintentar",
        "Validación de dirección adicional.",
        "Aumenta la latencia, reduce la amplificación y el estado abusivo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Streams QUIC y eliminación de cabecera de línea entre streams",
    "id": "streams-quic-y-eliminacion-de-cabecera-de-linea-entre-streams"
  },
  {
    "kind": "paragraph",
    "text": "Cada flujo QUIC ofrece una entrega confiable y ordenada dentro del flujo mismo. Los paquetes pueden transportar tramas de múltiples flujos. Si se pierde un paquete con datos del flujo B, el receptor puede continuar entregando datos completos de los flujos A y C. Sólo el punto faltante de B impide el avance ordenado de ese flujo. Esto elimina el bloqueo transversal causado por TCP de flujo único sobre HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "La mejora no elimina todos los bloqueos. Una corriente permanece ordenada; La pérdida de los primeros bytes impide la entrega de bytes posteriores del mismo flujo. El control del flujo de conexión también puede bloquear todas las transmisiones si el receptor no concede crédito. Las dependencias de QPACK pueden suspender la decodificación de un bloque de campos. Por lo tanto, las métricas y los seguimientos deben distinguir la pérdida de paquetes, el flujo bloqueado por datos, el flujo bloqueado por campos y la ventana de conexión."
  },
  {
    "kind": "paragraph",
    "text": "QUIC numera datos y reconoce paquetes, pero retransmite información en paquetes nuevos, no en \"el mismo paquete\". Los números de paquetes nunca se reutilizan en el mismo espacio. La detección de pérdidas y el control de la congestión se especificaron en documentos asociados. La implementación en el espacio del usuario permite la evolución, pero también requiere una observabilidad específica de la biblioteca o proxy que finaliza QUIC."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-14-quic-loss-isolation.svg",
    "alt": "Pérdida de aislamiento entre streams de una conexión QUIC",
    "caption": "Figura 14: Aislamiento de pérdidas entre streams QUIC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Connection IDs, reenlace NAT y migración de ruta",
    "id": "connection-ids-reenlace-nat-y-migracion-de-ruta"
  },
  {
    "kind": "paragraph",
    "text": "TCP identifica una conexión por su conjunto de direcciones y puertos. Si un dispositivo móvil cambia de Wi-Fi a celular, la tupla cambia y normalmente se pierde la conexión. QUIC utiliza Connection IDs elegidos por los puntos finales, lo que le permite asociar paquetes de una nueva ruta a la conexión existente. El nuevo camino se valida con desafíos antes de ser utilizado por completo."
  },
  {
    "kind": "paragraph",
    "text": "Los Connection IDs también permiten a los equilibradores reenviar paquetes sin depender exclusivamente de la tupla. El diseño debe considerar la privacidad y evitar que un identificador estable permita el seguimiento entre redes; Los puntos finales pueden proporcionar múltiples ID y retirarlas. Las puertas de enlace y los balanceadores de carga compatibles con QUIC deben coordinar el enrutamiento, las claves de retry/restablecimiento y la afinidad."
  },
  {
    "kind": "paragraph",
    "text": "La migración no es garantía de continuidad en ningún entorno. Las políticas pueden desactivarlo; los cortafuegos pueden bloquear el nuevo camino; el servidor puede requerir validación; Los cambios de MTU y RTT alteran el rendimiento. Los registros deben registrar la migración y la validación de rutas para diferenciar el intercambio de red legítimo de la inestabilidad o el ataque."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-15-quic-migration.svg",
    "alt": "Migración de ruta QUIC con Connection IDs y validación de nueva dirección",
    "caption": "Figura 15 - Validación de ruta y migración en QUIC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Frames y streams de control en HTTP/3",
    "id": "frames-y-streams-de-control-en-http-3"
  },
  {
    "kind": "paragraph",
    "text": "Una conexión HTTP/3 tiene un flujo de control por punto final. Envía AJUSTES, GOAWAY y otros frames de control. Cerrar prematuramente el flujo de control es un error de conexión. Las solicitudes utilizan flujos bidireccionales del cliente; cada uno lleva ENCABEZADOS, DATOS y avances según lo permitido. Los fotogramas de un mensaje no pueden aparecer en ningún orden arbitrario."
  },
  {
    "kind": "paragraph",
    "text": "Como QUIC proporciona control de flujo y restablecimiento de flujo, HTTP/3 utiliza mecanismos de transporte durante parte del ciclo de vida. Los errores tienen códigos HTTP/3 y QUIC. Una cancelación puede implicar restablecer el envío y solicitar detenerlo en la dirección opuesta. La observabilidad debe asociar el flujo QUIC, la solicitud HTTP y la correlación de la aplicación, ya que una única Connection IDs puede realizar muchas operaciones."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 elimina características de HTTP/2 que dependían del flujo TCP, pero conserva el concepto de drenaje. GOAWAY limita los nuevos flujos de solicitudes aceptadas. Durante la implementación, el borde debe anunciar el cierre, mantener la conexión mientras finalizan las operaciones permitidas y dirigir nuevas llamadas a otra conexión. El cierre abrupto del estado UDP provoca la pérdida de todas las operaciones activas."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - Estructura básica de una conexión HTTP/3.",
    "headers": [
      "elemento HTTP/3",
      "Transporte",
      "Uso"
    ],
    "rows": [
      [
        "Solicitar secuencia",
        "QUIC bidireccional iniciado por el cliente",
        "Una petición y su respuesta."
      ],
      [
        "Flujo de control",
        "QUIC unidireccional por punto final",
        "AJUSTES, GOAWAY y control HTTP."
      ],
      [
        "Flujo del codificador QPACK",
        "QUIC unidireccional",
        "Actualizaciones de la tabla dinámica."
      ],
      [
        "Decodificador de flujo QPACK",
        "QUIC unidireccional",
        "Confirmaciones y cancelaciones."
      ],
      [
        "ENCABEZADOS",
        "Marco HTTP/3",
        "Parcelas de salida o remolques."
      ],
      [
        "FECHA",
        "Marco HTTP/3",
        "Contenido del mensaje."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "QPACK: compresión de campo adecuada para streams QUIC",
    "id": "qpack-compresion-de-campo-adecuada-para-streams-quic"
  },
  {
    "kind": "paragraph",
    "text": "HPACK depende del orden único de conexión TCP para sincronizar la tabla dinámica. En QUIC, las transmisiones se pueden entregar de forma independiente; una actualización de tabla perdida no debería bloquear innecesariamente todas las transmisiones. QPACK utiliza flujos de codificador y decodificador unidireccionales para transmitir instrucciones y reconocimientos, lo que permite que bloques de campos en flujos de solicitud hagan referencias controladas."
  },
  {
    "kind": "paragraph",
    "text": "Un bloque puede depender de entradas que aún no se han recibido y bloquearse hasta que lleguen las instrucciones. El decodificador anuncia límites para la cantidad de transmisiones bloqueadas y el codificador elige entre una mejor compresión y el riesgo de bloqueo. Las representaciones literales y las tablas estáticas le permiten evitar dependencias. Al igual que con HPACK, los valores confidenciales se pueden marcar para no indexarlos."
  },
  {
    "kind": "paragraph",
    "text": "Las puertas de enlace finalizan QPACK y crean un nuevo contexto en la siguiente conexión. Una falla de QPACK es un error de conexión y puede afectar muchas solicitudes. La supervisión únicamente del estado HTTP no revela esta clase de error, porque es posible que el mensaje no se reconstruya. Los registros del terminador HTTP/3 deben exponer códigos de error de descompresión y transmisiones bloqueadas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-16-qpack.svg",
    "alt": "Codificador, decodificador, solicitudes y flujos de tablas dinámicas en QPACK",
    "caption": "Figura 16 - Flujos conceptuales de QPACK."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Descubrimiento y fallback de HTTP/3, Alt-Svc, HTTPS/SVCB",
    "id": "descubrimiento-y-fallback-de-http-3-alt-svc-https-svcb"
  },
  {
    "kind": "paragraph",
    "text": "Un cliente necesita saber qué origen ofrece HTTP/3 y en qué punto final. RFC 9114 define la publicidad mediante servicios alternativos: una respuesta HTTP/1.1 o HTTP/2 puede incluir `Alt-Svc: h3=\":443\"`. El cliente almacena la alternativa por un tiempo limitado y prueba QUIC. DNS también puede proporcionar registros HTTPS/SVCB con parámetros de protocolo y punto final. El soporte varía entre los clientes y la infraestructura."
  },
  {
    "kind": "paragraph",
    "text": "La fuente lógica sigue siendo la misma, incluso si el servicio alternativo está en un host o puerto diferente. El cliente necesita validar la autoridad y el certificado según las reglas. Alt-Svc no es una redirección de aplicaciones y no cambia el URI mostrado. Si el intento de QUIC falla, los clientes normalmente continúan o recurren a HTTP/2/1.1, pero los detalles de la caché de fallas y el tiempo dependen de la implementación."
  },
  {
    "kind": "paragraph",
    "text": "Al solucionar problemas, confirme que el cliente recibió un anuncio, que se intentó UDP, que se negoció ALPN h3 y que se produjo el fallback. Una captura solo del tráfico TCP puede mostrar que la llamada funciona y ocultar los intentos QUIC fallidos. El bloqueo de UDP/443 puede aumentar la latencia inicial incluso cuando el fallback mantiene la disponibilidad. Los registros HTTPS/SVCB incorrectos pueden dirigir a los clientes modernos a un punto final diferente al utilizado por los clientes heredados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-17-http3-discovery.svg",
    "alt": "Descubrimiento, intento QUIC y respaldo a HTTP/2 o HTTP/1.1",
    "caption": "Figura 17: Descubrimiento, intento y respaldo de HTTP/3."
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 200 OK\nAlt-Svc: h3=\":443\"; ma=86400\n# El cliente puede intentar una conexión QUIC al mismo origen en el puerto 443."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Comparación arquitectónica entre HTTP/1.1, HTTP/2 y HTTP/3",
    "id": "comparacion-arquitectonica-entre-http-1-1-http-2-y-http-3"
  },
  {
    "kind": "paragraph",
    "text": "Elegir una versión no es sólo buscar “la más nueva”. HTTP/1.1 tiene una amplia compatibilidad y una observabilidad sencilla, pero requiere más conexiones para la concurrencia y sufre de bloqueo secuencial. HTTP/2 reduce la sobrecarga y permite muchos flujos en una conexión, siendo esencial para gRPC, pero concentra las operaciones en un TCP y requiere métricas de flujo y flujo. HTTP/3 mejora el comportamiento ante pérdidas y movilidad, pero depende de UDP, finaliza el cifrado en el componente que necesita interpretar HTTP y cambia las prácticas de red."
  },
  {
    "kind": "paragraph",
    "text": "Las ganancias dependen del perfil. En una red estable y con baja latencia, una API pequeña puede mostrar una diferencia modesta. En conexiones móviles con pérdida, HTTP/3 puede reducir el impacto entre transmisiones y preservar la conexión durante el cambio de ruta. En una arquitectura empresarial con muchos intermediarios, el beneficio de extremo a extremo puede reducirse si el borde recibe H3 pero el resto usa H1.1 con grupos saturados."
  },
  {
    "kind": "paragraph",
    "text": "Los protocolos también afectan la capacidad. Diez mil solicitudes pueden utilizar miles de conexiones H1, cientos de conexiones H2 o H3, según la simultaneidad y los límites. El equilibrio por conexiones es menos representativo en la multiplexación. Un solo cliente puede concentrar transmisiones en una instancia. Los algoritmos, los límites y la observabilidad deben evolucionar con el protocolo."
  },
  {
    "kind": "table",
    "caption": "Tabla 11 - Comparación resumida de versiones.",
    "headers": [
      "Apariencia",
      "HTTP/1.1",
      "HTTP/2",
      "HTTP/3"
    ],
    "rows": [
      [
        "Transporte",
        "TCP; Separar TLS sobre HTTPS",
        "TCP; normalmente TLS + ALPN",
        "QUIC sobre UDP; TLS 1.3 integrado"
      ],
      [
        "Formato",
        "Líneas y campos textuales",
        "Frames binarios",
        "Frames sobre transmisiones QUIC"
      ],
      [
        "Competencia",
        "Secuencial/canalización; múltiples conexiones",
        "Flujos multiplexados",
        "Flujos multiplexados con pérdida aislada"
      ],
      [
        "Compresión de campo",
        "No estandarizado en el protocolo.",
        "HPACK",
        "paquete q"
      ],
      [
        "HOLA",
        "En HTTP y TCP",
        "Elimina HOL HTTP; mantiene TCP HOL",
        "Los bloques de pérdida solo afectaron la transmisión"
      ],
      [
        "Migración de red",
        "La conexión a menudo se rompe",
        "La conexión a menudo se rompe",
        "Connection IDs y validación de ruta"
      ],
      [
        "Observabilidad pasiva",
        "Más sencillo después de la terminación de TLS",
        "Frames después de la terminación TLS",
        "Más control cifrado; requiere terminador QUIC"
      ],
      [
        "Compatibilidad",
        "Máximo",
        "Amplio en navegadores/proxies modernos",
        "Depende de UDP y soporte perimetral"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "API Gateways y traducción de protocolos por salto",
    "id": "api-gateways-y-traduccion-de-protocolos-por-salto"
  },
  {
    "kind": "paragraph",
    "text": "En una cadena empresarial, cada componente puede negociar su propia versión. Un cliente utiliza HTTP/3 con una CDN; CDN utiliza HTTP/2 con API Gateway; la puerta de enlace utiliza HTTP/1.1 con el backend. Es necesario preservar la semántica, pero se reconstruyen el framing, la compresión, la multiplexación y la conexión. No hay ningún flujo H3 que \"atraviese\" una puerta de enlace que finalice HTTP."
  },
  {
    "kind": "paragraph",
    "text": "La traducción cambia el comportamiento. Muchas solicitudes multiplexadas desde una conexión H2 pueden requerir múltiples conexiones H1 al backend o serializarse según la pooling. Los remolques pueden perderse si el siguiente protocolo o producto no los conserva. Un reinicio de transmisión puede convertirse en una cancelación de socket, mientras que el backend ya ha procesado la operación. GOAWAY por un lado no tiene correspondencia directa en una conexión independiente por el otro lado."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas deben ser semánticas. La limitación de velocidad por conexión no es apropiada cuando una conexión contiene cientos de transmisiones. Los límites de carga útil deben considerar el tamaño sin comprimir. La caché debe utilizar la autoridad correcta y Vary. La observabilidad debe registrar la versión entrante, la versión saliente, la reutilización, el ID de transmisión cuando esté disponible, el retry y el estado creado por la puerta de enlace."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-18-protocol-per-hop.svg",
    "alt": "Versiones HTTP negociadas de forma independiente en cada salto de arquitectura",
    "caption": "Figura 18: Versiones HTTP independientes en cada salto de la arquitectura."
  },
  {
    "kind": "subhead",
    "text": "pregunta de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "¿Cuál es la versión negociada en cada conexión real: client-edge, edge-gateway, gateway-mesh y mesh-backend? La respuesta \"la API usa HTTP/2\" suele estar incompleta."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicación en Axway API Gateway",
    "id": "aplicacion-en-axway-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway utiliza servicios HTTP para recibir tráfico y configuraciones de hosts remotos para conexiones salientes. En un diseño real, las configuraciones de escucha, interfaz, TLS, política, enrutamiento y destino participan en diferentes saltos. La investigación debe separar la versión y los campos recibidos por el oyente de lo que se produce al conectarse al host remoto. Es necesario consultar la documentación y la versión instalada, ya que las capacidades y los estándares pueden variar según la versión."
  },
  {
    "kind": "paragraph",
    "text": "Al reenviar a un backend, la conexión persistente y la pooling influyen en la latencia, la distribución y el consumo de sockets. Las configuraciones heredadas pueden utilizar comportamientos HTTP conservadores y los equipos deben validar explícitamente la versión saliente deseada. Las transformaciones y los filtros pueden cambiar el contenido, los campos y la transmisión. Los registros de acceso a transacciones y el seguimiento de políticas deben registrar el estado final, el tiempo de conexión, el tiempo de respuesta y el error de enrutamiento."
  },
  {
    "kind": "paragraph",
    "text": "Un escenario común es que el cliente observa HTTP/2 en el borde, pero el backend registra HTTP/1.0 o HTTP/1.1. Esto no es necesariamente un error; podría ser una decisión o un incumplimiento del salto de salida. El riesgo surge cuando la aplicación depende de trailers, streaming o competencia que no sobrevive a la traducción. Las pruebas deben cubrir el protocolo real, no sólo el punto final público."
  },
  {
    "kind": "table",
    "caption": "Tabla 12: Evidencia para investigar HTTP en Axway API Gateway.",
    "headers": [
      "Punto de control",
      "evidencia",
      "Pregunta"
    ],
    "rows": [
      [
        "Servicio/escucha HTTP",
        "Configuración de puerto, TLS y protocolo",
        "¿Qué negocia el cliente con la puerta de enlace?"
      ],
      [
        "Flujo de políticas",
        "Filtros de seguimiento y transformaciones.",
        "¿Qué campos y contenidos han cambiado?"
      ],
      [
        "Enrutamiento/host remoto",
        "Destino, versión, grupo y timeout",
        "¿Cómo crea la puerta de enlace la conexión ascendente?"
      ],
      [
        "Registro de acceso",
        "estado, bytes, tiempos, correlación",
        "¿Quién produjo la respuesta y cuánto tiempo tomó?"
      ],
      [
        "Registro de backend",
        "Protocolo y autoridad observados.",
        "¿Qué entró realmente en el servicio?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicación en Azure API Management",
    "id": "aplicacion-en-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, la puerta de enlace recibe llamadas, aplica políticas y las enruta a los backends. La compatibilidad con HTTP/2 entrante, saliente y gRPC depende del tipo y generación de puerta de enlace, nivel y configuración. La política \"forward-request\" tiene un atributo de versión HTTP para los escenarios admitidos. A medida que la plataforma evoluciona, la documentación oficial debe tratarse como la fuente de verdad para la instancia utilizada."
  },
  {
    "kind": "paragraph",
    "text": "La versión entrante no implica una versión saliente. La documentación actual describe comportamientos en los que ciertas generaciones admiten HTTP/2 y pueden degradar el reenvío, mientras que otras le permiten configurar HTTP/2 para el backend. Esto afecta a gRPC, avances y streaming. Las pruebas deben registrar \"contexto\"/rastros, diagnósticos de backend y métricas de instancia para confirmar la ruta efectiva."
  },
  {
    "kind": "paragraph",
    "text": "Políticas como rewrite-uri, set-header, set-body, cache, retry y rate-limit operan en el mensaje lógico y pueden cambiar las características observadas. El retry debe considerar la idempotencia. Set-body generalmente implica acceso al contenido y puede requerir almacenamiento en búfer. La caché debe respetar la identidad y Vary. Al combinar Application Gateway, Front Door, APIM y backend, cada servicio finaliza su propia conexión y puede tener un timeout diferente."
  },
  {
    "kind": "table",
    "caption": "Tabla 13 - Puntos de atención en Azure API Management.",
    "headers": [
      "Elemento APIM",
      "Impacto HTTP",
      "Validación"
    ],
    "rows": [
      [
        "Protocolos de puerta de enlace",
        "Capacidades entrantes y TLS",
        "Verifique la configuración y el nivel."
      ],
      [
        "solicitud de reenvío",
        "Versión y timeout desde el salto al backend",
        "Confirme el soporte de la puerta de enlace utilizada."
      ],
      [
        "Política de retry",
        "Puede repetir la llamada después del fracaso",
        "Clasificar método e idempotencia."
      ],
      [
        "establecer-encabezado/reescribir-uri",
        "Cambiar mensaje reenviado",
        "Compare el seguimiento con el registro de backend."
      ],
      [
        "Políticas de caché",
        "Puede responder sin aguas arriba",
        "Validar clave, TTL y privacidad."
      ],
      [
        "Diagnóstico y telemetría.",
        "Distinguir política, puerta de enlace y backend",
        "Propagar contexto de correlación/rastreo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observabilidad: qué medir en cada versión",
    "id": "observabilidad-que-medir-en-cada-version"
  },
  {
    "kind": "paragraph",
    "text": "Las métricas comunes incluyen tasa de solicitudes, estado, latencia, bytes y errores. Para HTTP/1.1, agregue conexiones abiertas, nuevas conexiones por segundo, reutilización, espera de grupo y restablecimientos. Para HTTP/2, mida las transmisiones activas por conexión, el umbral de simultaneidad, RST_STREAM, GOAWAY, la ventana de transmisión y los errores de compresión. Para HTTP/3, incluya retries QUIC, éxito/retroceso, protocolo de enlace, pérdida, RTT, migración, transmisiones bloqueadas y errores QPACK."
  },
  {
    "kind": "paragraph",
    "text": "La latencia debe descomponerse. DNS, conexión, TLS/QUIC, tiempo de política, espera del grupo, tiempo hasta el primer byte ascendente y transferencia de contenido responden a diferentes preguntas. Una métrica \"total\" alta no identifica la causa. El seguimiento distribuido comienza cuando hay un mensaje HTTP; Las fallas anteriores pueden requerir terminadores y registros de red. La puerta de enlace debe crear o propagar de manera confiable identificadores de correlación."
  },
  {
    "kind": "paragraph",
    "text": "Las capturas de tráfico siguen siendo útiles, pero el cifrado limita el contenido. En TLS sobre TCP, el terminador puede proporcionar un registro de claves en un laboratorio controlado. QUIC cifra más elementos de control, por lo que las métricas de qlog y biblioteca son valiosas. En la producción bancaria, la recaudación debe respetar los datos sensibles: no registrar tokens, cookies, PAN, cargas útiles o encabezados completos sin enmascaramiento y base legal."
  },
  {
    "kind": "table",
    "caption": "Tabla 14 - Observabilidad específica por versión.",
    "headers": [
      "Métrica",
      "HTTP/1.1",
      "HTTP/2",
      "HTTP/3"
    ],
    "rows": [
      [
        "Unidad de Competencia",
        "Conexión/solicitud",
        "corriente",
        "Transmitir QUIC"
      ],
      [
        "Cierre coordinado",
        "Conexión: cerrar / FIN",
        "GOAWAY + transmisiones",
        "GOAWAY + cierre QUIC"
      ],
      [
        "Cancelación",
        "Cerrar la conexión puede afectar otras llamadas",
        "PRIMERA CORRIENTE",
        "Restablecer/detener envío por transmisión"
      ],
      [
        "Compresión de campo",
        "N/A en el núcleo",
        "Errores de HPACK",
        "Errores y bloqueos de QPACK"
      ],
      [
        "señal de respaldo",
        "Nueva conexión en otra versión.",
        "ALPN http/1.1",
        "Fallo QUIC seguido de H2/H1"
      ],
      [
        "Pérdida relevante",
        "retransmisión TCP",
        "La retransmisión TCP afecta las transmisiones",
        "Pérdida de ruta/corriente y recuperación QUIC"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Método de troubleshooting HTTP de un extremo a otro",
    "id": "metodo-de-troubleshooting-http-de-un-extremo-a-otro"
  },
  {
    "kind": "paragraph",
    "text": "El primer paso es determinar si hubo una respuesta HTTP válida. Pueden ocurrir errores de DNS, TCP, UDP, TLS o QUIC antes de cualquier estado. Las herramientas a veces convierten los fallos en mensajes genéricos, pero la puerta de enlace no puede haber producido 504 si la llamada ni siquiera llegó a ella. Identifique el último componente que tiene evidencia del intento y el primero que no."
  },
  {
    "kind": "paragraph",
    "text": "Cuando exista estatus, determine la autoría. Compare el estado público, el estado ascendente, el error interno y la política ejecutada. Se puede conservar un 503 del backend; La puerta de enlace podría crear otros 503 porque no había puntos finales en buen estado disponibles. Los encabezados como Server no son prueba suficiente, ya que pueden eliminarse o falsificarse. Utilice correlación y marcas de tiempo entre registros controlados."
  },
  {
    "kind": "paragraph",
    "text": "Luego registre la versión y la conexión en cada salto. Confirme ALPN, protocolo de salida, reutilización, reinicio de transmisión, GOAWAY, retry y timeout. Compare el método, la autoridad, la ruta, los campos relevantes y la longitud antes y después de la puerta de enlace. Para fallas intermitentes, busque patrones por conexión, instancia, transmisión, tamaño de carga útil, versión, red y tiempo de implementación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/es/figure-19-troubleshooting-tree.svg",
    "alt": "Árbol inicial para clasificar fallas antes y después de una respuesta HTTP",
    "caption": "Figura 19 - Árbol inicial para clasificar fallas HTTP."
  },
  {
    "kind": "table",
    "caption": "Tabla 15 - Matriz de síntomas y evidencias.",
    "headers": [
      "Síntoma",
      "Hipótesis prioritarias",
      "evidencia"
    ],
    "rows": [
      [
        "Sin respuesta/error de conexión",
        "DNS, cortafuegos, TCP/UDP, TLS/QUIC, puerto",
        "dig/nslookup, rastreo de conexión, protocolo de enlace, registros de borde."
      ],
      [
        "400 solo a través de puerta de enlace",
        "Análisis, normalización, umbral, transformación.",
        "Solicitud sin procesar en laboratorio, seguimiento de políticas, registro de backend."
      ],
      [
        "413/431",
        "Limitar contenido o campos en algún salto",
        "Configuración y tamaño real sin comprimir."
      ],
      [
        "502",
        "Fallo/invalidez ascendente, reinicio, protocolo",
        "Error de puerta de enlace interna, captura y registro de backend."
      ],
      [
        "503 intermitente",
        "Grupo, estado, límite de transmisión/conexión, implementación",
        "Métricas por instancia y conexión."
      ],
      [
        "504",
        "Tiempo de espera o cadena de salto de backend de puerta de enlace",
        "Desglose de latencia y presupuesto de timeout."
      ],
      [
        "H2 funciona, H1 falla",
        "Framing, trailers, competencia o presentador",
        "Comparación del mensaje después de la traducción."
      ],
      [
        "H3 lento antes de trabajar",
        "El intento QUIC falla y retrocede",
        "Registros UDP/443, Alt-Svc/HTTPS RR y QUIC."
      ],
      [
        "RST en reutilización",
        "Tiempo de inactividad desalineado",
        "Antigüedad de la conexión y cierre en el otro salto."
      ],
      [
        "Duplicidad después del timeout",
        "Reintento de operación no idempotente",
        "Registros de intentos y clave de idempotencia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudio de caso 1: POST duplicado después de 504",
    "id": "estudio-de-caso-1-post-duplicado-despues-de-504"
  },
  {
    "kind": "paragraph",
    "text": "Un cliente envía POST para crear una transferencia. La puerta de enlace lo reenvía al backend, que confirma la transacción en el banco, pero tarda un poco en generar la respuesta. El timeout de la puerta de enlace expira y devuelve 504. El cliente lo interpreta como un error y repite la llamada. Dado que POST no es idempotente por definición y no existe una clave de deduplicación, el backend crea una segunda transferencia."
  },
  {
    "kind": "paragraph",
    "text": "El problema no se resuelve simplemente aumentando el timeout. La arquitectura debe definir la semántica de idempotencia: el cliente envía una clave única; conservas de entrada; El backend registra la clave y el resultado de forma atómica. Al repetir, devuelve el resultado anterior. La puerta de enlace puede utilizar el retry solo para fallas claramente anteriores al envío o en operaciones clasificadas. Los registros deben mostrar el ID de la solicitud, la clave de idempotencia, el intento y el resultado del backend."
  },
  {
    "kind": "subhead",
    "text": "Aprendizaje"
  },
  {
    "kind": "paragraph",
    "text": "Tiempo de espera significa que no hay confirmación para el observador, ni prueba de que no haya efecto en el sistema remoto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudio de caso 2: Saturación del backend público HTTP/2 y HTTP/1.1",
    "id": "estudio-de-caso-2-saturacion-del-backend-publico-http-2-y-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "Un borde recibe miles de flujos HTTP/2 en unas pocas conexiones y los reenvía a la puerta de enlace. La puerta de enlace llama a un backend HTTP/1.1 con un grupo de 100 conexiones. Durante el pico, las transmisiones ingresan rápidamente pero esperan la conexión ascendente. Las métricas TCP entrantes parecen estables porque hay pocas conexiones H2; la cola y la latencia crecen en el grupo saliente."
  },
  {
    "kind": "paragraph",
    "text": "La solución requiere medir la competencia por flujo y grupo de espera, aplicar límites de admisión, ajustar la capacidad de backend y considerar HTTP/2 saliente cuando sea compatible. Aumentar el grupo sin evaluar los recursos puede sobrecargar el servicio. La limitación de la velocidad por conexión sería ineficaz, ya que una conexión H2 concentra muchos flujos. El objetivo es alinear la competencia lógica con la capacidad real de producción."
  },
  {
    "kind": "subhead",
    "text": "Aprendizaje"
  },
  {
    "kind": "paragraph",
    "text": "En protocolos multiplexados, la conexión ya no es una buena aproximación para el número de operaciones simultáneas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudio de caso 3: HTTP/3 anunciado pero UDP bloqueado",
    "id": "estudio-de-caso-3-http-3-anunciado-pero-udp-bloqueado"
  },
  {
    "kind": "paragraph",
    "text": "Una CDN comienza a anunciar \"Alt-Svc: h3\". Los clientes modernos prueban QUIC en UDP/443, pero una red corporativa bloquea UDP. Después de un retraso, el cliente vuelve a HTTP/2 y la API funciona. Los usuarios reportan lentitud sólo en el primer acceso; las pruebas que fuerzan HTTP/2 no se reproducen. Los registros de API muestran solicitudes normales, porque el intento falla antes de que llegue el mensaje HTTP."
  },
  {
    "kind": "paragraph",
    "text": "La investigación debe analizar los paquetes DNS, Alt-Svc, UDP y el tiempo de reserva. La solución puede implicar habilitar QUIC, eliminar publicidad de redes específicas cuando sea posible o aceptar respaldo con monitoreo. No se debe concluir que HTTP/3 provocó un error de aplicación. El problema radica en el descubrimiento y establecimiento del transporte, antes de la transacción HTTP observada por la puerta de enlace."
  },
  {
    "kind": "subhead",
    "text": "Aprendizaje"
  },
  {
    "kind": "paragraph",
    "text": "La disponibilidad alternativa puede ocultar una falla en la ruta y agregar latencia invisible en los registros de la aplicación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudio de caso 4: La traducción de H2 a H1 crea un framing inseguro",
    "id": "estudio-de-caso-4-la-traduccion-de-h2-a-h1-crea-un-framing-inseguro"
  },
  {
    "kind": "paragraph",
    "text": "Un proxy acepta HTTP/2 y convierte pseudocampos y DATOS a HTTP/1.1. Una combinación con formato incorrecto pasa la validación H2, pero genera dos señales de longitud incompatibles en H1. El backend interpreta el mensaje de manera diferente y los bytes controlados constituyen la siguiente solicitud en la conexión persistente. La vulnerabilidad sólo aparece cuando la ruta incluye la traducción específica."
  },
  {
    "kind": "paragraph",
    "text": "La mitigación requiere validar el mensaje lógico antes de serializar H1, emitir exactamente un mecanismo de framing, rechazar campos prohibidos, actualizar intermediarios y probar variaciones de contrabando. Deshabilitar la reutilización puede reducir el impacto, pero no reemplaza la corrección. Es posible que WAF basado únicamente en texto de entrada H2 no vea el mensaje generado en el backend."
  },
  {
    "kind": "subhead",
    "text": "Aprendizaje"
  },
  {
    "kind": "paragraph",
    "text": "El punto de mayor riesgo suele ser el límite entre dos analizadores o versiones, no un analizador aislado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios de lectura práctica y diagnóstico.",
    "id": "laboratorios-de-lectura-practica-y-diagnostico"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1: Comparar HTTP/1.1 y HTTP/2 con cURL"
  },
  {
    "kind": "paragraph",
    "text": "Utilice un punto final de laboratorio que admita ambas versiones. Ejecute llamadas forzando HTTP/1.1 y HTTP/2 y habilite la salida detallada. Tenga en cuenta la resolución, conexión, TLS, ALPN, línea de solicitud mostrada, reutilización y sincronización. Repita varias llamadas en el mismo proceso para comprobar la reutilización. No utilice puntos finales productivos ni tokens reales."
  },
  {
    "kind": "code",
    "text": "curl -v --http1.1 https://SEU-ENDPOINT-DE-LAB/status\ncurl -v --http2   https://SEU-ENDPOINT-DE-LAB/status\n# También tiempos récord:\ncurl -sS -o /dev/null -w \"connect=%{time_connect} tls=%{time_appconnect} ttfb=%\n{time_starttransfer} total=%{time_total}\\n\" https://SEU-ENDPOINT-DE-LAB/status"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2: Inspeccionar ALPN con OpenSSL"
  },
  {
    "kind": "paragraph",
    "text": "Conéctese a un servidor de laboratorio y anuncie h2 y HTTP/1.1. Confirme el protocolo seleccionado. Luego fuerce solo http/1.1 y compare. El objetivo es darse cuenta de que ALPN ocurre en el protocolo de enlace TLS antes de los mensajes HTTP. En entornos proxy, ejecute desde diferentes puntos de red para identificar diferentes puntos finales."
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect SEU-ENDPOINT-DE-LAB:443 -servername SEU-ENDPOINT-DE-LAB -alpn\n\"h2,http/1.1\"\n# Buscar: Protocolo ALPN: h2"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3: caché y revalidación"
  },
  {
    "kind": "paragraph",
    "text": "Cree un servicio de laboratorio que devuelva ETag y Cache-Control. Haga un GET, almacene el ETag y envíe If-None-Match. Confirma 304 sin contenido. Modifique el recurso y repita. Agregue un proxy de caché controlado y observe Age and Vary. Documente cómo la autenticación cambia la posibilidad de caché compartida."
  },
  {
    "kind": "code",
    "text": "curl -i https://SEU-ENDPOINT-DE-LAB/resource\ncurl -i -H \"If-None-Match: \\\"ETAG-RECEBIDA\\\"\" https://SEU-ENDPOINT-DE-LAB/resource"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 4: Framing HTTP/1.1 en un entorno aislado"
  },
  {
    "kind": "paragraph",
    "text": "En un servidor local creado para estudio, envíe mensajes con la Content-Length correcta y fragmentos válidos. Observe cómo el servidor lee el cuerpo. Luego pruebe las entradas no válidas sólo en un laboratorio autorizado y confirme que sean rechazadas, sin intentar explotar sistemas de terceros. El objetivo es comprender el análisis y la validación, no ejecutar ataques."
  },
  {
    "kind": "code",
    "text": "printf \"POST /echo HTTP/1.1\\r\\nHost: localhost\\r\\nContent-Length: 5\\r\\n\\r\\nhello\" | nc\n127.0.0.1 8080"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 5: Observar HTTP/3 y respaldo"
  },
  {
    "kind": "paragraph",
    "text": "Utilice una herramienta de laboratorio y un punto final con soporte HTTP/3 conocido. Registre el intento de QUIC, el protocolo final y el fallback cuando UDP esté bloqueado en un entorno de prueba. Compare el tiempo con el primer byte. No cambie los firewalls corporativos sin autorización. En clientes que admiten qlog, genere un seguimiento local y vea el protocolo de enlace y las transmisiones."
  },
  {
    "kind": "code",
    "text": "curl -v --http3 https://SEU-ENDPOINT-DE-LAB/status\ncurl -v --http3-only https://SEU-ENDPOINT-DE-LAB/status\n# La disponibilidad de opciones depende de la compilación de cURL y la biblioteca QUIC."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 6: Mapeo de versiones por salto en la puerta de enlace"
  },
  {
    "kind": "paragraph",
    "text": "Publique una API de laboratorio que devuelva encabezados de protocolo, host y correlación observados por el backend. Llame al punto final público en diferentes versiones y compare registros de escucha, seguimientos de políticas y resultados de backend. Dibuje cada conexión independiente y anote TLS, ALPN, versión, grupo, timeout y transformación. Este mapa es más útil que declarar una única \"versión API\"."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Registre el protocolo de borde de cliente.",
      "Registre el protocolo de puerta de enlace de borde.",
      "Registre el protocolo de puerta de enlace-backend.",
      "Compare los campos Host/:autoridad y Reenviado.",
      "Ejecute llamadas con contenido grande y observe el almacenamiento en búfer.",
      "Ejecute un despliegue controlado y observe el drenaje/GOAWAY o los reinicios."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitectura HTTP para API empresariales",
    "id": "checklist-de-arquitectura-http-para-api-empresariales"
  },
  {
    "kind": "table",
    "caption": "Tabla 16 - Checklist de diseño y revisión.",
    "headers": [
      "Tema",
      "Preguntas de revisión"
    ],
    "rows": [
      [
        "Semántica",
        "¿Los métodos y estados siguen sus propiedades? ¿Los retries respetan la idempotencia?"
      ],
      [
        "URI/autoridad",
        "¿Se validan y conservan la autoridad original y de acogida cuando es necesario?"
      ],
      [
        "Campos",
        "¿Cuáles se eliminan, se crean, se firman o se confían en cada salto?"
      ],
      [
        "Contenido",
        "¿Existe un límite de transformación, compresión, almacenamiento en búfer, transmisión o sin comprimir?"
      ],
      [
        "caché",
        "¿Qué respuestas se pueden almacenar? ¿La clave considera identidad y Vary?"
      ],
      [
        "HTTP/1.1",
        "¿El framing es estricto? ¿Están coordinados los pools y los tiempos de inactividad?"
      ],
      [
        "HTTP/2",
        "¿Qué límites de flujo, campo y ventana están configurados? ¿Se trata GOAWAY?"
      ],
      [
        "HTTP/3",
        "¿Se permite UDP? ¿Hay respaldo? ¿Cómo se recopilan las métricas qlog y QUIC?"
      ],
      [
        "Puerta de enlace",
        "¿Las versiones entrantes/salientes han sido confirmadas por evidencia?"
      ],
      [
        "Observabilidad",
        "¿Están separados el estado público, el estado ascendente y el error interno?"
      ],
      [
        "Seguridad",
        "¿Se han probado las traducciones de protocolos contra ambigüedades y contrabando?"
      ],
      [
        "Capacidad",
        "¿La competencia se mide por solicitudes/flujos, no solo por conexiones?"
      ]
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
    "text": "HTTP proporciona una semántica estable para la interacción entre clientes, servidores e intermediarios. Los métodos expresan intención; los estados comunican resultados; los campos describen el control y la representación; La caché y las condiciones permiten la reutilización y la simultaneidad. Estos conceptos son independientes de JSON, REST o la versión de transporte."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 codifica mensajes de texto en una secuencia TCP y requiere reglas de framing estrictas. Las conexiones persistentes ahorran apretones de manos, pero la pooling, los tiempos de espera y el análisis divergente crean riesgos. HTTP/2 introduce tramas, flujos, multiplexación, control de flujo y HPACK, lo que reduce la sobrecarga y el encabezado de línea a nivel HTTP, aunque la pérdida de TCP todavía afecta a todos los flujos."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 usa QUIC sobre UDP, integra TLS 1.3, aísla la pérdida por transmisión, admite Connection IDs y usa QPACK. El descubrimiento puede realizarse a través de registros Alt-Svc y HTTPS/SVCB, con respaldo a versiones anteriores. En las puertas de enlace, cada salto negocia su propia versión; el profesional necesita observar el mensaje lógico y la conexión de cada segmento."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting confiable comienza clasificando si la falla ocurrió antes o después de que hubo una respuesta HTTP, identificando quién creó el estado y asignando versiones, tiempos de espera, grupos, transmisiones y transformaciones. La arquitectura debe proteger la semántica, la idempotencia y la seguridad durante las traducciones entre protocolos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios de repaso",
    "id": "ejercicios-de-repaso"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique la diferencia entre la semántica HTTP y el mapeo de versiones específicas.",
      "¿Por qué apátrida no significa que una aplicación no puede mantener una sesión?",
      "Diferenciar recurso, representación, contenido y framing."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "¿Qué componentes de una URI participan en una solicitud HTTP y cuáles no se envían?",
      "Diferenciar el método seguro del método idempotente y dar ejemplos.",
      "¿Por qué repetir POST después del timeout puede producir duplicidad incluso cuando el cliente recibió 504?",
      "¿Quién puede crear un 502 en una cadena con múltiples proxies?",
      "¿Por qué no debería utilizarse la frase de motivo en la lógica del cliente?",
      "Diferenciar tipo de contenido, codificación de contenido y codificación de transferencia.",
      "Explique por qué Vary es necesario en la negociación de contenido en caché.",
      "¿Qué significa \"Control de caché: sin caché\"?",
      "¿Cómo ayudan ETag e If-Match a evitar la pérdida de actualizaciones?",
      "¿Por qué TCP no conserva los límites de los mensajes HTTP?",
      "¿Qué riesgos existen cuando la Content-Length y la codificación de transferencia se interpretan de manera diferente?",
      "¿Por qué una conexión persistente sólo se puede reutilizar después de consumir por completo el mensaje anterior?",
      "Describir el encabezado de línea en la canalización HTTP/1.",
      "",
      "¿Cómo asigna HTTP/2 una solicitud a frames y transmisiones?",
      "Diferenciar entre control de flujo HTTP/2 y control de congestión TCP.",
      "¿Cuál es la función de SETTINGS_MAX_CONCURRENT_STREAMS?",
      "¿Cómo ayuda GOAWAY con las implementaciones y el drenaje?",
      "¿Cómo reduce HPACK los gastos generales y por qué crea un estado por conexión?",
      "¿Cuál es el papel de ALPN en la negociación HTTP/2?",
      "¿Por qué HTTP/2 sigue sujeto al encabezado de línea de TCP?",
      "¿Por qué es incorrecto afirmar que HTTP/3 es “UDP no confiable”?",
      "¿Cómo permite QUIC la migración de rutas?",
      "¿Cuál es el riesgo de 0-RTT para operaciones con efectos?",
      "¿En qué se diferencia conceptualmente QPACK de HPACK?",
      "¿Cómo puede Alt-Svc anunciar HTTP/3 sin cambiar el origen lógico?",
      "¿Por qué una API puede usar HTTP/3 públicamente y HTTP/1.1 en el backend?",
      "¿Qué métricas adicionales se necesitan en HTTP/2 y HTTP/3?",
      "Proponer un presupuesto de timeout para el cliente, el borde, la puerta de enlace y el backend.",
      "Diseñe una estrategia de retry segura para pagos GET y POST.",
      "Explique cómo una traducción de H2 a H1 puede crear un riesgo de request smuggling.",
      "Describe la evidencia necesaria para demostrar qué versión se utilizó en cada salto."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Preguntas de discusión arquitectónica",
    "id": "preguntas-de-discusion-arquitectonica"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "En una organización con miles de API, ¿qué criterios justifican habilitar HTTP/2 o HTTP/3 en el borde y el backend?",
      "¿Cómo deberían los equilibradores distribuir la carga cuando pocas conexiones transportan muchos flujos?",
      "¿Qué campos deberían eliminarse o reconstruirse en una cadena con CDN, WAF, puerta de enlace y malla de servicios?",
      "¿Cómo garantizar la idempotencia de las operaciones financieras cuando pueden ocurrir tiempos de espera y retries en varios componentes?",
      "¿Qué nivel de observabilidad de QUIC es aceptable en un entorno regulado sin exponer datos confidenciales?",
      "¿Cuándo es necesario el almacenamiento en búfer en la puerta de enlace y cuándo destruye los beneficios del streaming?",
      "¿Cómo probar la seguridad del análisis y la traducción de protocolos en una cinta transportadora automatizada?"
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
    "caption": "Tabla 17 - Glosario de capítulos.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "ALPN",
        "Extensión TLS utilizada para negociar el protocolo de la aplicación, como h2 o http/1.1."
      ],
      [
        "Servicio alternativo",
        "Mecanismo para anunciar un servicio HTTP alternativo, incluido el punto final HTTP/3."
      ],
      [
        "autoridad",
        "Componente que identifica el host y el puerto lógico del origen."
      ],
      [
        "Caché compartido",
        "Caché que puede reutilizar respuestas para más de un usuario o cliente."
      ],
      [
        "Conexión coalescente",
        "Reutilización controlada de una conexión HTTP/2 a más de un origen."
      ],
      [
        "Connection IDs",
        "Identificador QUIC que permite asociar paquetes con la conexión más allá de la tupla IP/puerto."
      ],
      [
        "Contenido",
        "Secuencia de datos del mensaje después de la decodificación de tramas adecuada."
      ],
      [
        "Negociación de contenidos",
        "Selección de representación según preferencias y capacidades."
      ],
      [
        "Flujo de control",
        "Flujo HTTP/3 unidireccional que lleva el control de la conexión."
      ],
      [
        "Campo de extremo a extremo",
        "Campo cuyo significado se aplica a puntos finales, incluso a través de intermediarios."
      ],
      [
        "etiqueta ET",
        "Validador opaco asociado a una representación."
      ],
      [
        "control de flujo",
        "Mecanismo que impide que el emisor supere los buffers anunciados por el receptor."
      ],
      [
        "framing",
        "Reglas para determinar los límites y el contenido de los mensajes en transporte."
      ],
      [
        "GOAWAY",
        "Señale que una conexión no aceptará nuevas transmisiones/solicitudes más allá de un cierto límite."
      ],
      [
        "frame de ENCABEZADOS",
        "Marco que transporta bloque comprimido de campos en HTTP/2 o HTTP/3."
      ],
      [
        "Bloqueo de cabecera de línea",
        "Retraso en operaciones independientes causado por un elemento anterior faltante o lento."
      ],
      [
        "HPACK",
        "Compresión de campos utilizada por HTTP/2."
      ],
      [
        "HTTP/3",
        "Mapeo de la semántica HTTP a QUIC."
      ],
      [
        "Idempotencia",
        "Propiedad por la cual la repetición de la misma intención produce el mismo efecto pretendido."
      ],
      [
        "Intermedio",
        "Participante HTTP que recibe y reenvía mensajes, como un proxy o puerta de enlace."
      ],
      [
        "Multiplexación",
        "Compartir una conexión a través de múltiples intercambios independientes."
      ],
      [
        "Origen",
        "Fuente lógica responsable del recurso identificado por el URI."
      ],
      [
        "Pseudoencabezado",
        "Campo especial HTTP/2/3 que comienza con dos puntos, como por ejemplo: método."
      ],
      [
        "paquete q",
        "Compresión de campos utilizada por HTTP/3."
      ],
      [
        "RÁPIDO",
        "Transporte seguro y multiplexado a través de UDP utilizado por HTTP/3."
      ],
      [
        "Representación",
        "Datos y metadatos que representan el estado de un recurso."
      ],
      [
        "Solicitar contrabando",
        "Ataque basado en divergencia en los límites de solicitudes entre intermediarios."
      ],
      [
        "Método seguro",
        "Método cuya intención es esencialmente la lectura."
      ],
      [
        "corriente",
        "Canal lógico y ordenado dentro de una conexión multiplexada."
      ],
      [
        "Tráiler",
        "Campo enviado después del contenido del mensaje."
      ],
      [
        "Validador",
        "Metadatos utilizados para probar si la representación almacenada sigue siendo válida."
      ],
      [
        "variar",
        "Campo que informa dimensiones de la solicitud utilizada para seleccionar una respuesta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas.",
    "id": "referencias-oficiales-y-lecturas-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "Las referencias a continuación priorizan las especificaciones y la documentación oficial. Se deben consultar los RFC con sus erratas y cualquier documento que las actualice. La documentación del producto debe validarse para la versión, el nivel y la puerta de enlace utilizados en el entorno."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "RFC 9110 - Semántica HTTP - https://www.rfc-editor.org/rfc/rfc9110.html",
      "RFC 9111 - Almacenamiento en caché HTTP - https://www.rfc-editor.org/rfc/rfc9111.html",
      "RFC 9112 - HTTP/1.1 - https://www.rfc-editor.org/rfc/rfc9112.html",
      "RFC 9113-HTTP/2-https://www.rfc-editor.org/rfc/rfc9113.html",
      "RFC 9114-HTTP/3-https://www.rfc-editor.org/rfc/rfc9114.html",
      "RFC 7541 - HPACK: Compresión de encabezado para HTTP/2 - https://www.rfc-editor.org/rfc/rfc7541.html",
      "RFC 9204 - QPACK: Compresión de campos para HTTP/3 - https://www.rfc-editor.org/rfc/rfc9204.html",
      "RFC 9000 - QUIC: un transporte seguro y multiplexado basado en UDP - https://www.rfc-editor.org/rfc/rfc9000.html",
      "RFC 9001: uso de TLS para proteger QUIC: https://www.rfc-editor.org/rfc/rfc9001.html",
      "RFC 9002 - Control de congestión y detección de pérdidas QUIC - https://www.rfc-editor.org/rfc/rfc9002.html",
      "RFC 7838 - Servicios alternativos HTTP - https://www.rfc-editor.org/rfc/rfc7838.html",
      "RFC 9460 - Enlace de servicios y registros de recursos DNS HTTPS - https://www.rfc-editor.org/rfc/rfc9460.html",
      "RFC 9651 - Valores de campos estructurados para HTTP - https://www.rfc-editor.org/rfc/rfc9651.html",
      "RFC 7301: Negociación del protocolo de capa de aplicación TLS: https://www.rfc-editor.org/rfc/rfc7301.html",
      "RFC 9308 - Aplicabilidad del protocolo de transporte QUIC - https://www.rfc-editor.org/rfc/rfc9308.html",
      "RFC 9312 - Manejabilidad del protocolo de transporte QUIC - https://www.rfc-editor.org/rfc/rfc9312.html",
      "Registro de nombres de campos HTTP de IANA: https://www.iana.org/assignments/http-fields/http-fields.xhtml",
      "Registro de códigos de estado HTTP de IANA: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml",
      "Axway: configurar servicios HTTP: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/general_services/index.html",
      "Axway: configurar los ajustes del host remoto: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/general_remote_hosts/index.html",
      "Microsoft: puerta de enlace API en Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/api-management-gateways-overview",
      "Microsoft: política de solicitud de reenvío: https://learn.microsoft.com/en-us/azure/api-management/forward-request-policy",
      "Microsoft: administrar protocolos y cifrados en API Management: https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-manage-protocols-ciphers"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Orden de lectura sugerido"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Lea las secciones introductorias y la terminología de RFC 9110 antes de estudiar versiones específicas.",
      "Estudie RFC 9112 centrándose en el framing de mensajes, la conexión y la seguridad del análisis.",
      "Lea la descripción general, frames, flujos, control de flujo y errores de RFC 9113; consultar HPACK en paralelo.",
      "Estudie QUIC en las secciones de conexión, flujos, control de flujo y migración de RFC 9000, seguido de la integración de TLS en RFC 9001.",
      "Lea RFC 9114 y QPACK, que enumeran lo que se delega a QUIC.",
      "Consulte Alt-Svc y HTTPS/SVCB para comprender el descubrimiento y el fallback.",
      "Finalmente, mapear las capacidades y limitaciones de la versión de Axway y Azure APIM utilizada en el trabajo."
    ]
  },
  {
    "kind": "subhead",
    "text": "Cierre"
  },
  {
    "kind": "paragraph",
    "text": "Dominar HTTP significa dominar el límite entre la intención comercial y el transporte. El próximo capítulo profundizará en HTTPS y TLS, explicando cómo la identidad, la confidencialidad y la integridad protegen cada una de estas conexiones."
  }
];
