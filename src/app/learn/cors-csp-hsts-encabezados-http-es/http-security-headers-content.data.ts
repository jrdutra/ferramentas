import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const HTTP_SECURITY_HEADERS_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Headers como políticas declarativas entre servidor, API Gateway y navegador."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/es/overview.svg",
    "alt": "CORS, CSP, HSTS y otros headers como capas declarativas de protección",
    "caption": "Figura de apertura: los headers forman una capa declarativa de protección, pero actúan sobre diferentes problemas."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Los headers no corrigen la autorización, la autenticación o la lógica empresarial; gobiernan el comportamiento de clientes e intermediarios."
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
    "text": "El capítulo anterior presentó el Top 10 de seguridad de API de OWASP y mostró que la protección de una API depende de controles distribuidos entre el cliente, el navegador, la API Gateway, el backend, la identidad, la red y la operación. Este capítulo profundiza en una parte específica de esa defensa: los headers HTTP que instruyen a los navegadores e intermediarios cómo manejar orígenes, contenido ejecutable, transporte seguro, aislamiento de contexto, privacidad y cache."
  },
  {
    "kind": "paragraph",
    "text": "CORS, CSP y HSTS suelen agruparse como headers de seguridad, pero resuelven problemas muy diferentes. CORS define cuándo un navegador puede exponer una respuesta obtenida de otra fuente a una aplicación web. CSP limita las fuentes de script, los estilos, los marcos, las conexiones y otros recursos, lo que reduce el impacto de la inyección de contenido. HSTS indica al navegador que utilice HTTPS para un host durante un período de tiempo definido. Ninguno de ellos reemplaza la autenticación, autorización, validación de datos o reparación de vulnerabilidades en el backend."
  },
  {
    "kind": "paragraph",
    "text": "Otros cabezales complementan este modelo. Referrer-Policy limita la información enviada al Referer; La política de permisos controla los recursos del navegador; X-Content-Type-Options reduce las interpretaciones MIME inesperadas; frame-ancestros y X-Frame-Options manejan la incrustación en marcos; COOP, COEP y CORP participan en aislamiento entre orígenes; Cache-Control protege las respuestas confidenciales contra un almacenamiento inadecuado; Los atributos de las cookies reducen la exposición a scripts, transporte inseguro y solicitudes entre sitios."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo es construir un modelo mental preciso para la implementación y retroubleshooting. El lector debe saber cómo distinguir una falla real de API de una decisión del navegador, reconocer errores de configuración en API Gateways y CDN, planificar la implementación segura de políticas restrictivas y probar protecciones sin depender únicamente de escáneres automáticos."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada encabezado, identifique cinco elementos: quién envía, quién aplica, qué activo protege, qué amenaza mitiga y qué comportamiento legítimo se puede romper. Este análisis evita la peligrosa práctica de copiar un conjunto de headers sin comprender sus efectos."
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
      "Explique el origen, el sitio, la política del mismo origen y los límites de seguridad del navegador.",
      "Describa solicitudes CORS simples, verificación previa, credenciales y caché de verificación previa.",
      "Configure correctamente Access-Control-Allow-Origin y headers relacionados.",
      "Diferenciar CORS de autenticación, CSRF, firewall y seguridad servidor-servidor.",
      "Diseñe una política de seguridad de contenido con directivas, nonces, hashes e implementación de solo informes.",
      "Comprenda HSTS, incluya subdominios, precarga y riesgos de implementación incorrecta.",
      "Aplique opciones de tipo de contenido X, ancestros de marco, política de referencia y política de permisos.",
      "Relacionar COOP, COEP y CORP con el aislamiento entre orígenes.",
      "Establezca el Cache-Control y los atributos de cookies para respuestas y sesiones confidenciales.",
      "Implementar, probar y observar headers en aplicaciones, gateways y CDN."
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
      "26.1 Modelo de seguridad del navegador y headers declarativos",
      "26.2 Origen, sitio web y Política del Mismo Origen",
      "26.3 CORS: propósito y flujo de decisiones",
      "26.4 Solicitudes simples y de verificación previa",
      "26.5 Headers de solicitud y respuesta CORS",
      "26.6 Credenciales, cookies, Autorización y comodines",
      "26.7 CORS en API Gateways y errores frecuentes",
      "26.8 Política de Seguridad de Contenidos: modelo y directivas",
      "26.9 Nonces, hashes, scripts dinámicos estrictos y en línea",
      "26.10 Informes e implementación gradual del PEP",
      "26.11 Seguridad de transporte estricta HTTP",
      "26.12 Clickjacking, rastreo MIME y protección de marcos",
      "26.13 Política de referencia y política de permisos",
      "26.14 COOP, COEP y CORP",
      "26.15 Control de caché, borrado de datos del sitio y cookies",
      "26.16 Headers obsoletos, troubleshooting y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.1 Modelo de seguridad del navegador y headers declarativos",
    "id": "26-1-modelo-de-seguridad-del-navegador-y-headers-declarativos"
  },
  {
    "kind": "paragraph",
    "text": "Los navegadores ejecutan código proporcionado por múltiples fuentes y necesitan evitar que una página maliciosa lea datos de otra aplicación simplemente porque el usuario está autenticado allí. Esta protección no se implementa mediante un único mecanismo. La Política del Mismo Origen establece un límite básico; CORS permite excepciones controladas; CSP restringe el contenido que se puede cargar o ejecutar; las cookies tienen sus propios atributos; y las políticas de aislamiento reducen el intercambio entre contextos."
  },
  {
    "kind": "paragraph",
    "text": "Los headers de seguridad son declarativos: el servidor envía una política y el agente compatible decide cómo aplicarla. Esto crea una diferencia importante entre la seguridad del navegador y la seguridad de la API. Un cliente escrito en Java, Python o curl puede ignorar completamente CORS y CSP, porque estos mecanismos no fueron diseñados como control de acceso universal. La API aún necesita validar credenciales, autorización, esquema y reglas comerciales en cada solicitud."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway es un punto eficaz para estandarizar los headers, pero no conoce automáticamente todas las necesidades de la aplicación. Un CSP adecuado depende de los scripts, marcos y conexiones realmente utilizados por cada interfaz. CORS depende de los orígenes de los consumidores y de la política de credenciales. Cache-Control depende de la sensibilidad y la capacidad de compartir. Por lo tanto, la plataforma puede proporcionar valores predeterminados y barreras de seguridad, mientras que el producto mantiene la propiedad de la póliza específica."
  },
  {
    "kind": "subhead",
    "text": "Distinción esencial"
  },
  {
    "kind": "paragraph",
    "text": "CORS no protege la API contra llamadas externas; controla si un navegador entrega la respuesta a JavaScript desde otra fuente. Un atacante o un sistema servidor-servidor aún puede enviar la solicitud. La autorización y la protección contra el abuso siguen siendo obligatorias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.2 Origen, sitio web y Política del Mismo Origen",
    "id": "26-2-origen-sitio-web-y-politica-del-mismo-origen"
  },
  {
    "kind": "paragraph",
    "text": "Una fuente se define conceptualmente por el trío de esquema, host y puerto. https://app.empresa.com y https://api.empresa.com tienen diferentes hosts y por tanto diferentes orígenes. https://app.empresa.com y http://app.empresa.com difieren en el esquema. https://app.empresa.com:443 y https://app.empresa.com:8443 se diferencian en el puerto. La ruta URL no participa en el origen."
  },
  {
    "kind": "paragraph",
    "text": "El concepto de sitio web está relacionado, pero no es idéntico. Mecanismos como SameSite en las cookies funcionan con la noción de sitio, mientras que CORS usa origen. Dos subdominios pueden ser del mismo sitio e incluso de origen cruzado. Esta diferencia explica escenarios en los que se envía una cookie pero JavaScript no puede leer la respuesta porque la política CORS no autorizó el origen."
  },
  {
    "kind": "paragraph",
    "text": "La Política del Mismo Origen limita la lectura y la interacción entre contextos de diferentes orígenes. No impide todo el envío de datos entre orígenes: formularios, imágenes, enlaces y otros recursos históricamente realizan solicitudes. La principal protección consiste en restringir la capacidad del script para observar el contenido y manipular objetos de otra fuente. CORS es el protocolo que permite al servidor declarar excepciones controladas para determinadas operaciones."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: el origen está determinado por el esquema, el host y el puerto, no por la ruta.",
    "headers": [
      "URL A",
      "URLB",
      "¿Mismo origen?",
      "Razón"
    ],
    "rows": [
      [
        "https://aplicación.ejemplo.com",
        "https://app.exemplo.com/perfil",
        "si",
        "Mismo esquema, host y puerto."
      ],
      [
        "https://aplicación.ejemplo.com",
        "https://api.exemplo.com",
        "No",
        "Anfitrión diferente."
      ],
      [
        "http://aplicación.ejemplo.com",
        "https://aplicación.ejemplo.com",
        "No",
        "Esquema diferente."
      ],
      [
        "https://aplicación.ejemplo.com",
        "https://app.exemplo.com:8443",
        "No",
        "Puerto diferente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.3 CORS: propósito y flujo de decisiones",
    "id": "26-3-cors-proposito-y-flujo-de-decisiones"
  },
  {
    "kind": "paragraph",
    "text": "El intercambio de recursos entre orígenes es un protocolo integrado en el modelo de recuperación del navegador. Cuando un script intenta acceder a una API desde otro origen, el navegador agrega el encabezado Origen. La respuesta debe contener headers que indiquen si esa fuente, método, conjunto de headers y uso de credenciales están permitidos. Cuando la política no coincide, la solicitud puede incluso llegar al servidor, pero la respuesta no está disponible para JavaScript."
  },
  {
    "kind": "paragraph",
    "text": "Esta característica produce un síntoma frecuente: el backend registra el éxito, la API Gateway devuelve 200, pero la consola del navegador muestra un error de CORS. No hay contradicción. El servidor procesó la operación; el navegador bloqueó la visualización de la respuesta. Por lo tanto, las operaciones con efectos secundarios no pueden depender de CORS como protección contra CSRF o acciones inadecuadas."
  },
  {
    "kind": "paragraph",
    "text": "El navegador puede enviar la solicitud directamente cuando cumple con los criterios para una solicitud CORS simple. En otras situaciones, realice una verificación previa con OPCIONES. Preflight pregunta al servidor si se aceptan el método y los headers previstos antes de enviar la operación real. La respuesta positiva puede almacenarse en la caché de un navegador específico durante un período de tiempo limitado."
  },
  {
    "kind": "subhead",
    "text": "CORS con verificación previa: el navegador negocia antes de enviar la operación real"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/es/figure-01-cors-preflight.svg",
    "alt": "Navegador negociando OPCIONES de verificación previa con API antes de la solicitud real",
    "caption": "Figura 1: Preflight negocia el permiso; La decisión final de mostrar la respuesta pertenece al navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.4 Solicitudes simples y de verificación previa",
    "id": "26-4-solicitudes-simples-y-de-verificacion-previa"
  },
  {
    "kind": "paragraph",
    "text": "El término simple solicitud no significa que la operación sea segura para el negocio. Indica que el navegador puede enviarlo sin verificación previa para mantener la compatibilidad con los estándares web históricos. Métodos como GET, HEAD y POST pueden participar cuando los headers y Content-Type permanecen dentro del conjunto permitido por el protocolo. Una aplicación POST/json, por ejemplo, normalmente provoca una verificación previa."
  },
  {
    "kind": "paragraph",
    "text": "La verificación previa utiliza OPCIONES e incluye el método de solicitud de control de acceso. Si el script pretende enviar headers no seguros, el navegador también incluye Access-Control-Request-Headers. El servidor responde con métodos y headers autorizados. La solicitud real sólo se libera cuando la respuesta satisface las comprobaciones del navegador."
  },
  {
    "kind": "paragraph",
    "text": "La verificación previa no es autenticación. Algunas arquitecturas cometen el error de requerir un token en OPCIONES o reenviar la verificación previa a servidores que no conocen CORS. Dado que la verificación previa es una consulta de política realizada antes de la solicitud real, las API Gateways generalmente la tratan específicamente. Sin embargo, responder permisivamente a cualquier fuente y método también genera riesgo; La política debe derivarse de una configuración confiable."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de verificación previa y respuesta"
  },
  {
    "kind": "code",
    "text": "OPTIONS /clientes/123 HTTP/1.1\nHost: api.empresa.example\nOrigin: https://portal.empresa.example\nAccess-Control-Request-Method: PUT\nAccess-Control-Request-Headers: authorization, content-type\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://portal.empresa.example\nAccess-Control-Allow-Methods: GET, PUT\nAccess-Control-Allow-Headers: Authorization, Content-Type\nAccess-Control-Max-Age: 600\nVary: Origin"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.5 Headers de solicitud y respuesta CORS",
    "id": "26-5-headers-de-solicitud-y-respuesta-cors"
  },
  {
    "kind": "paragraph",
    "text": "Origen identifica el origen del contexto que inició la solicitud. Access-Control-Allow-Origin le indica qué origen está autorizado para leer la respuesta. El valor puede ser un origen específico o un comodín en escenarios sin credenciales. Cuando la lista de permitidos es dinámica, el servidor debe validar el valor recibido con una lista de permitidos y devolver exactamente la fuente aprobada, sin reflejar nunca ningún valor sin verificar."
  },
  {
    "kind": "paragraph",
    "text": "Access-Control-Allow-Methods y Access-Control-Allow-Headers participan principalmente en la verificación previa. Access-Control-Expose-Headers permite que JavaScript lea headers de respuesta que no pertenecen al conjunto expuesto de forma predeterminada. Access-Control-Max-Age influye en la caché de verificación previa, sujeto a los límites del navegador. Access-Control-Allow-Credentials permite respuestas acreditadas cuando se combinan con una fuente explícita."
  },
  {
    "kind": "paragraph",
    "text": "Variar: el origen es importante cuando la respuesta puede cambiar según el origen de la solicitud y pasa por cachés compartidos. Sin esta indicación, un caché puede reutilizar una respuesta que contiene un origen-control-permisión-acceso específico para otro origen. En plataformas con CDN o API Gateway, la clave de caché y la política CORS deben diseñarse juntas."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: el conjunto CORS forma un protocolo de negociación, no un encabezado aislado.",
    "headers": [
      "encabezado",
      "Dirección",
      "Función"
    ],
    "rows": [
      [
        "Origin",
        "Solicitar",
        "Identifica el origen del contexto solicitante."
      ],
      [
        "Access-Control-Allow-Origin",
        "Response",
        "Autoriza una fuente o, en casos limitados, el comodín."
      ],
      [
        "Access-Control-Allow-Methods",
        "respuesta previa al vuelo",
        "Declara métodos permitidos."
      ],
      [
        "Access-Control-Allow-Headers",
        "respuesta previa al vuelo",
        "Declara headers permitidos en la solicitud real."
      ],
      [
        "Access-Control-Expose-Headers",
        "Response",
        "Expone headers adicionales a JavaScript."
      ],
      [
        "Access-Control-Allow-Credentials",
        "Response",
        "Permite responder con credenciales en contexto CORS."
      ],
      [
        "Access-Control-Max-Age",
        "respuesta previa al vuelo",
        "Controla la duración de la caché de verificación previa."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Una solicitud de credenciales puede implicar cookies, certificados de cliente o credenciales HTTP controladas por agentes. En la recuperación, el modo de credenciales determina si se envían las credenciales y si se consideran las respuestas con Set-Cookie. Para que JavaScript reciba una respuesta de origen cruzado con credenciales, el servidor debe devolver Access-Control-Allow-Credentials: verdadero y un origen explícito."
  },
  {
    "kind": "paragraph",
    "text": "El comodín en Access-Control-Allow-Origin no se puede utilizar para exponer respuestas con credenciales. Esta restricción reduce el riesgo de que un sitio web arbitrario lea datos asociados con la sesión del usuario. Tampoco es apropiado generar Access-Control-Allow-Origin copiando el Origin recibido sin validación. La reflexión irrestricta convierte la política en una autorización universal disfrazada."
  },
  {
    "kind": "paragraph",
    "text": "Los atributos de cookies de CORS y SameSite están relacionados pero no son equivalentes. Es posible que la cookie no se envíe debido a reglas de SameSite, Secure o de terceros antes de que se evalúe CORS. En otro escenario, se envía la cookie y el servidor procesa la solicitud, pero el navegador bloquea la lectura de la respuesta. El diagnóstico debe analizar el envío de cookies, la verificación previa, la respuesta real y la consola del navegador por separado."
  },
  {
    "kind": "subhead",
    "text": "regla general"
  },
  {
    "kind": "paragraph",
    "text": "Para las API de sesión basadas en cookies, trate CORS, SameSite, CSRF y la política de origen como controles complementarios. Para las API con un token al portador, valide el token y la autorización normalmente; El hecho de que el navegador requiera una verificación previa no hace que el endpoint sea seguro frente a clientes externos al navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.7 CORS en API Gateways y errores frecuentes",
    "id": "26-7-cors-en-api-gateways-y-errores-frecuentes"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways puede centralizar CORS, responder a la verificación previa sin llegar al backend y aplicar listas de permitidos por entorno, producto o API. Esta centralización reduce la duplicación, pero requiere definir la propiedad. Si la API Gateway y el backend agregan headers diferentes, la respuesta puede contener valores duplicados o contradictorios. Algunos navegadores rechazan respuestas con múltiples Access-Control-Allow-Origin."
  },
  {
    "kind": "paragraph",
    "text": "La política también debe aplicarse a las respuestas de error. Una API que devuelve CORS solo en 2xx puede hacer que el navegador oculte el cuerpo de 401, 403 o 500, dificultando el diagnóstico y la experiencia del cliente. La sección de error o equivalente de la API Gateway debe producir los mismos headers relevantes sin abrir permisos adicionales."
  },
  {
    "kind": "paragraph",
    "text": "Otro error común es permitir fuentes mediante comparación textual insegura. Pruebas como terminaCon(\"empresa.com\") pueden aceptar dominios maliciosos. El valor debe interpretarse como origen y compararse con la lista de permitidos exacta o una regla de subdominio cuidadosamente definida. Las expresiones regulares deben anclarse y probarse con esquemas, puertos, normalización de casos y fuentes nulas cuando corresponda."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Los errores de CORS suelen ser errores de arquitectura y no solo errores de sintaxis.",
    "headers": [
      "fracaso",
      "Síntoma",
      "Corrección"
    ],
    "rows": [
      [
        "OPCIONES requiere autenticación",
        "La verificación previa devuelve 401 antes de la llamada real.",
        "Trate las OPCIONES de acuerdo con la política CORS y no como una operación comercial."
      ],
      [
        "CORS solo en respuestas 2xx",
        "La interfaz ve un error genérico.",
        "Aplique también headers al flujo de errores."
      ],
      [
        "Origen reflejado sin validación",
        "Cualquier sitio web recibe permiso.",
        "Comparar con la lista de permitidos confiable."
      ],
      [
        "Headers duplicados de API Gateway y backend",
        "El navegador rechaza respuestas ambiguas.",
        "Definir un único punto de emisión."
      ],
      [
        "Sin variación: origen almacenado en caché",
        "El origen recibe la póliza de otro origen.",
        "Ajuste la clave Vary y caché."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.8 Política de Seguridad de Contenidos: modelo y directivas",
    "id": "26-8-politica-de-seguridad-de-contenidos-modelo-y-directivas"
  },
  {
    "kind": "paragraph",
    "text": "La política de seguridad de contenido define restricciones sobre los recursos que una página puede cargar o ejecutar. La política se puede enviar en el encabezado Content-Security-Policy o, en casos específicos, por metaelemento. El encabezado tiene mayor scope y es la forma preferida para políticas completas. CSP no soluciona la vulnerabilidad que permitió la inyección, pero puede reducir lo que puede hacer el contenido inyectado."
  },
  {
    "kind": "paragraph",
    "text": "Las directivas son especializadas. default-src proporciona respaldo para varios tipos de recursos. script-src controla los scripts; style-src controla los estilos; imágenes img-src; conexiones connect-src realizadas mediante fetch, XHR, WebSocket y mecanismos relacionados; fuentes font-src; contenido frame-src cargado en marcos; los ancestros del marco definen quién puede incrustar la página; complementos de controles object-src; base-uri restringe la URL base; La forma-acción limita los objetivos de la forma."
  },
  {
    "kind": "paragraph",
    "text": "Una política debe ser mínima y compatible con la aplicación real. Autorizar ampliamente https: o usar unsafe-inline y unsafe-eval reduce la protección. Al mismo tiempo, bloquear recursos sin inventario puede interrumpir el inicio de sesión, la telemetría, las fuentes, las integraciones y la funcionalidad legítimos. Por lo tanto, CSP debe construirse a partir de inventario, pruebas y observación, no copiarse de otra aplicación."
  },
  {
    "kind": "subhead",
    "text": "CSP: cada recurso se compara con la política antes de cargarlo o ejecutarlo"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/es/figure-02-csp-resources.svg",
    "alt": "Documento HTML que utiliza directivas CSP para controlar scripts, marcos y conexiones.",
    "caption": "Figura 2: la política compara cada tipo de recurso con la política correspondiente."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de política de CSP restrictiva"
  },
  {
    "kind": "code",
    "text": "Content-Security-Policy:\n  default-src 'none';\n  script-src 'self' 'nonce-R4nd0mBase64';\n  style-src 'self';\n  img-src 'self' data:;\n  connect-src 'self' https://api.empresa.example;\n  frame-ancestors 'none';\n  base-uri 'none';\n  form-action 'self'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.9 Nonces, hashes, scripts dinámicos estrictos y en línea",
    "id": "26-9-nonces-hashes-scripts-dinamicos-estrictos-y-en-linea"
  },
  {
    "kind": "paragraph",
    "text": "Los scripts en línea son una fuente importante de riesgo porque una inyección de HTML puede convertirse en una ejecución de JavaScript. Eliminar scripts en línea y servir archivos estáticos es la solución más sencilla siempre que sea posible. Cuando la aplicación requiere secuencias de comandos en línea, se puede generar un nonce criptográficamente impredecible por respuesta e incluirlo tanto en el CSP como en el elemento de secuencia de comandos autorizado."
  },
  {
    "kind": "paragraph",
    "text": "Los hashes le permiten autorizar contenido en línea cuyo texto es conocido y estable. El navegador calcula el hash del bloque y lo compara con el valor de la política. Los pequeños cambios en el contenido requieren un nuevo hash. Los nonces son más adecuados para contenido dinámico, siempre que no se reutilicen ni se inserten automáticamente en contenido controlado por el usuario."
  },
  {
    "kind": "paragraph",
    "text": "estricto-dinámico permite que los scripts confiables cargados por nonce o hash propaguen la confianza a los scripts que agregan, lo que reduce la dependencia de las listas de hosts permitidos. Esta estrategia requiere pruebas de compatibilidad y comprensión del arranque de la aplicación. unsafe-inline y unsafe-eval deben tratarse como arrendamientos temporales con un plan de eliminación, no como una configuración predeterminada."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Nonces y hashes permiten reducir la dependencia de inseguros en línea.",
    "headers": [
      "Mecanismo",
      "cuando usar",
      "Cuidado principal"
    ],
    "rows": [
      [
        "Archivo externo en uno mismo",
        "La aplicación controla los scripts en el propio host.",
        "El compromiso del host todavía compromete los scripts."
      ],
      [
        "Nonce",
        "Scripts en línea dinámicos autorizados por respuesta.",
        "Genere valor impredecible y único por respuesta."
      ],
      [
        "picadillo",
        "Bloque en línea estable y conocido.",
        "Cualquier cambio requiere actualizar el hash."
      ],
      [
        "strict-dynamic",
        "Bootstrap confiable carga dependencias.",
        "Validar compatibilidad y cadena de confianza."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.10 Informes e implementación gradual del PEP",
    "id": "26-10-informes-e-implementacion-gradual-del-pep"
  },
  {
    "kind": "paragraph",
    "text": "Content-Security-Policy-Report-Only le permite observar violaciones sin bloquear recursos. Es útil para inventariar dependencias y descubrir código en línea, dominios de terceros y flujos no documentados. Sin embargo, la función de solo informar no protege al usuario; es una etapa de implementación. Una organización madura establece una fecha límite para convertir las observaciones en políticas efectivas."
  },
  {
    "kind": "paragraph",
    "text": "Los informes pueden contener URL e información confidenciales. El endpoint de recopilación necesita control de volumen, retención y privacidad. Los eventos deben agregarse por política, origen y versión de la aplicación para distinguir ataques, extensiones del navegador, ruido y regresiones reales. Una política eficaz y una política de observación pueden coexistir, permitiendo un hardening progresivo."
  },
  {
    "kind": "paragraph",
    "text": "La implementación recomendada comienza con el inventario, pasa solo por informes, corrige infracciones legítimas, bloquea políticas de menor riesgo y avanza hacia una política restrictiva. Los cambios de CSP deben participar en la canalización y probarse con recorridos críticos, porque un encabezado incorrecto puede hacer que todo el front-end no esté disponible incluso si la API se mantiene en buen estado."
  },
  {
    "kind": "subhead",
    "text": "CSP no es una lista de dominios confiables"
  },
  {
    "kind": "paragraph",
    "text": "Autorizar un dominio significa aceptar todo el contenido que pueda servir en ese contexto. Las CDN compartidas, los endpoints de carga y los servicios de terceros amplían la superficie. Prefiera nonces, hashes y fuentes específicas a listas permitidas demasiado amplias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.11 Seguridad de transporte estricta HTTP",
    "id": "26-11-seguridad-de-transporte-estricta-http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Strict Transport Security permite que un host declare que solo se debe acceder a él a través de HTTPS. El navegador almacena la política recibida en una conexión HTTPS válida y, durante la edad máxima, transforma los intentos HTTP a HTTPS antes de enviar la solicitud a través de la red. Esto reduce la exposición a ataques de eliminación y degradación de TLS después de que se sabe que el host es seguro."
  },
  {
    "kind": "paragraph",
    "text": "El encabezado tiene la directiva max-age y puede incluir includeSubDomains. Este último extiende la política a los subdominios y requiere un inventario completo: cualquier subdominio sin HTTPS funcional puede volverse inaccesible. La directiva de precarga se utiliza como señal de intención de precargar programas, pero la inclusión real depende de requisitos y procesos externos al protocolo."
  },
  {
    "kind": "paragraph",
    "text": "HSTS no repara certificados caducados, nombres de host incorrectos o cadenas no válidas. En cambio, el navegador debe fallar considerablemente y no ofrecer una degradación insegura. El primer acceso sigue siendo una consideración cuando el host aún no se encuentra en el estado HSTS; La precarga puede reducir esta ventana, pero aumenta el compromiso operativo a largo plazo."
  },
  {
    "kind": "subhead",
    "text": "HSTS cambia las decisiones futuras del navegador a un host conocido"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/es/figure-03-hsts.svg",
    "alt": "Navegador aprendiendo HSTS y promocionando HTTP a HTTPS",
    "caption": "Figura 3: Una vez aprendido, HSTS hace que el navegador prefiera HTTPS y rechace la degradación."
  },
  {
    "kind": "subhead",
    "text": "Ejemplos de HSTS"
  },
  {
    "kind": "code",
    "text": "Strict-Transport-Security: max-age=31536000; includeSubDomains\n# Posible despliegue gradual\nStrict-Transport-Security: max-age=300\nStrict-Transport-Security: max-age=86400\nStrict-Transport-Security: max-age=31536000; includeSubDomains"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.12 Clickjacking, rastreo MIME y protección de marcos",
    "id": "26-12-clickjacking-rastreo-mime-y-proteccion-de-marcos"
  },
  {
    "kind": "paragraph",
    "text": "El clickjacking ocurre cuando una aplicación está integrada de manera invisible o engañosa en otro sitio web y el usuario interactúa con los controles sin darse cuenta del contexto real. La directiva CSP frame-ancestros es el mecanismo moderno para controlar qué orígenes pueden enmarcar la página. X-Frame-Options ofrece DENY y SAMEORIGIN, que siguen siendo relevantes en compatibilidad, pero carecen de la flexibilidad de una lista de orígenes."
  },
  {
    "kind": "paragraph",
    "text": "X-Content-Type-Options: nosniff indica al navegador que respete los tipos MIME en contextos relevantes en lugar de inferir contenido ejecutable. Esto reduce los escenarios en los que un recurso servido con el tipo incorrecto se interpreta como un script o una hoja de estilo. El encabezado no reemplaza el tipo de contenido correcto; ambos deben estar configurados."
  },
  {
    "kind": "paragraph",
    "text": "frame-ancestros protege los documentos que se pueden enmarcar, mientras que frame-src controla qué marcos puede cargar la página. Confundir las dos directivas produce políticas ineficaces. También es importante tener en cuenta que las API JSON puras normalmente no necesitan renderizarse en marcos, pero los portales, las consolas administrativas y las páginas de autenticación necesitan protección explícita."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La protección del marco y el tipo de contenido son responsabilidades diferentes.",
    "headers": [
      "Encabezado o directiva",
      "Ejemplo",
      "Uso"
    ],
    "rows": [
      [
        "Ancestros del marco CSP",
        "ancestros del marco 'ninguno'",
        "Bloquea la incorporación desde cualquier fuente."
      ],
      [
        "X-Frame-Options",
        "NEGAR o MISMO ORIGEN",
        "Compatibilidad de protección de marcos."
      ],
      [
        "X-Content-Type-Options",
        "nosniff",
        "Reduce el rastreo MIME de recursos ejecutables."
      ],
      [
        "Content-Type",
        "aplicación/json",
        "Declara el tipo real de carga útil."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.13 Política de referencia y política de permisos",
    "id": "26-13-politica-de-referencia-y-politica-de-permisos"
  },
  {
    "kind": "paragraph",
    "text": "El encabezado Referer puede revelar la URL de origen de navegación o carga. Cuando las URL contienen identificadores, parámetros internos o estructuras confidenciales, compartirlas crea un riesgo para la privacidad. La Política de referencia controla la cantidad de información que se envía. Políticas como sin referencia, mismo origen y origen estricto cuando hay origen cruzado ofrecen diferentes niveles de restricción."
  },
  {
    "kind": "paragraph",
    "text": "La elección debe equilibrar la privacidad, la lucha contra el fraude, el análisis y la retroubleshooting. Rara vez es necesario enviar la URL completa a terceros. Una política orientada al origen reduce la exposición de rutas y consultas en navegaciones entre orígenes, manteniendo suficiente información para algunos controles. Los datos confidenciales no deben estar en las URL, incluso con una política restrictiva, porque pueden aparecer en los registros y el historial."
  },
  {
    "kind": "paragraph",
    "text": "La Política de permisos le permite habilitar o deshabilitar las funciones del navegador para el documento y los marcos, como cámara, micrófono, geolocalización y pantalla completa, según el conjunto admitido. El objetivo es reducir las capacidades disponibles para contenidos propios y de terceros. Se reemplazó la antigua nomenclatura de Políticas de Funciones; Las configuraciones deben utilizar la sintaxis y las capacidades actuales del agente de destino."
  },
  {
    "kind": "subhead",
    "text": "Ejemplos de privacidad y capacidades del navegador"
  },
  {
    "kind": "code",
    "text": "Referrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=(self)\n# Ejemplo más restrictivo\nReferrer-Policy: no-referrer"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.14 COOP, COEP y CORP",
    "id": "26-14-coop-coep-y-corp"
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin-Opener-Policy controla la relación entre un documento y las ventanas abiertas o abiertas. Al aislar los grupos de contexto, se reducen los ataques y las interferencias que dependen de referencias entre ventanas. Cross-Origin-Embedder-Policy requiere que CORS o CORP puedan compartir explícitamente los recursos integrados de origen cruzado, según el modo adoptado."
  },
  {
    "kind": "paragraph",
    "text": "La política de recursos de origen cruzado permite que un recurso declare si puede ser cargado por documentos del mismo origen, el mismo sitio o cualquier contexto permitido. Juntos, COOP y COEP pueden producir un aislamiento entre orígenes, necesario para algunas API de navegador potentes. Esta configuración debe probarse porque es posible que los recursos de terceros sin los headers adecuados no se carguen."
  },
  {
    "kind": "paragraph",
    "text": "Estos headers no reemplazan a CSP o CORS. CORS controla el acceso programático a las respuestas; CORP protege el recurso contra ciertas cargas de origen cruzado; COOP separa los contextos de navegación; COEP define requisitos de incorporación. La arquitectura necesita saber qué lado publica cada política y cómo se comportan las CDN, imágenes, fuentes y scripts de terceros."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Las políticas entre orígenes se complementan entre sí, pero protegen fronteras diferentes.",
    "headers": [
      "Mecanismo",
      "Pregunta que responde",
      "Ejemplo"
    ],
    "rows": [
      [
        "COOP",
        "¿Con qué ventanas comparte este documento el grupo de contexto?",
        "Política de apertura de origen cruzado: mismo origen"
      ],
      [
        "COEP",
        "¿Qué características de origen cruzado se pueden incorporar?",
        "Política de inserción de origen cruzado: require-corp"
      ],
      [
        "CORP",
        "¿Quién puede subir este recurso?",
        "Política de recursos de origen cruzado: mismo sitio"
      ],
      [
        "CORS",
        "¿Qué fuente puede acceder a la respuesta a través del navegador?",
        "Control-de-acceso-permitir-origen: https://app..."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.15 Control de caché, borrado de datos del sitio y cookies",
    "id": "26-15-control-de-cache-borrado-de-datos-del-sitio-y-cookies"
  },
  {
    "kind": "paragraph",
    "text": "Las respuestas confidenciales pueden permanecer en la memoria caché, el proxy o la CDN del navegador. Cache-Control establece políticas de almacenamiento y reutilización. no almacenar es apropiado cuando no se acepta ninguna retención; privado permite el cache privado pero no compartido; el no-cache requiere revalidación antes de su uso; max-age define la frescura. Las directivas deben elegirse según la semántica de la respuesta, no según una sola regla para toda la API."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación no hace que una respuesta no se pueda almacenar en caché automáticamente. Las API Gateways y las CDN deben considerar la autorización, las cookies, la variación y las reglas explícitas. Una respuesta personalizada almacenada en un caché compartido puede filtrar datos entre usuarios. Por otro lado, deshabilitar todo el caché indiscriminadamente puede degradar el rendimiento y aumentar el costo. El diseño debe separar el contenido público, privado, inmutable y transaccional."
  },
  {
    "kind": "paragraph",
    "text": "Clear-Site-Data le permite solicitar la eliminación de categorías de datos del sitio web, como caché, cookies y almacenamiento, según el soporte. Puede ser útil para cerrar sesión o responder a incidentes, pero debe usarse con cuidado para no eliminar estados legítimos ni provocar bucles. No reemplaza la revocación de sesión en el servidor."
  },
  {
    "kind": "paragraph",
    "text": "Set-Cookie tiene atributos relevantes para la seguridad. Secure restringe el envío a canales seguros; HttpOnly impide el acceso a través de JavaScript; SameSite influye en el envío en contextos entre sitios; Alcance del control de ruta y dominio; Max-Age y Expires definen la persistencia. Las cookies de sesión y autenticación deben utilizar un scope mínimo y no contener información confidencial en texto claro."
  },
  {
    "kind": "subhead",
    "text": "Ejemplos de caché, borrado y cookies"
  },
  {
    "kind": "code",
    "text": "Cache-Control: no-store\nClear-Site-Data: \"cache\", \"cookies\", \"storage\"\nSet-Cookie: __Host-session=<valor>; Path=/; Secure; HttpOnly; SameSite=Lax\n# Contenido público versionado\nCache-Control: public, max-age=31536000, immutable"
  },
  {
    "kind": "table",
    "caption": "Tabla 7: la caché y las cookies requieren precisión semántica; Los nombres intuitivos pueden resultar engañosos.",
    "headers": [
      "Directiva o atributo",
      "Significado operacional",
      "Precaución"
    ],
    "rows": [
      [
        "sin tienda",
        "No almacene la respuesta.",
        "Útil para datos altamente confidenciales."
      ],
      [
        "privado",
        "Permitir caché privado, no compartido.",
        "Es posible que aún permanezca en el dispositivo del usuario."
      ],
      [
        "sin caché",
        "Almacenar, pero revalidar antes de usar.",
        "No significa que no haya almacenamiento."
      ],
      [
        "Secure",
        "Envíe cookies únicamente a través de un canal seguro.",
        "Depende de HTTPS implementado correctamente."
      ],
      [
        "HttpOnly",
        "Impedir el acceso por JavaScript.",
        "No impide el envío automático de la cookie."
      ],
      [
        "SameSite",
        "Limite el envío en contexto entre sitios.",
        "La elección depende del flujo de inicio de sesión y de incorporación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.16 Headers obsoletos y divulgación de tecnología",
    "id": "26-16-headers-obsoletos-y-divulgacion-de-tecnologia"
  },
  {
    "kind": "paragraph",
    "text": "No todos los headers recomendados históricamente deberían seguir implementándose. X-XSS-Protection se relaciona con filtros de navegador más antiguos y no reemplaza a CSP. La fijación de clave pública para HTTP generó importantes riesgos operativos y fue abandonada por los navegadores; HPKP no debe reintroducirse como hardening genérico. Expect-CT perdió relevancia con la evolución de la transparencia de los certificados y el soporte de los agentes."
  },
  {
    "kind": "paragraph",
    "text": "La Política de funciones ha sido reemplazada por la Política de permisos. X-Frame-Options sigue siendo útil por motivos de compatibilidad, pero frame-ancestros ofrece un control moderno. Pragma es un legado para el cache HTTP/1.0 y no reemplaza una política clara de Cache-Control. La gestión de headers debe seguir estándares y soporte real, eliminando recomendaciones obsoletas de las plantillas corporativas."
  },
  {
    "kind": "paragraph",
    "text": "Los headers como Server y X-Powered-By pueden revelar productos y versiones. Reducir la divulgación evita proporcionar información innecesaria, pero no debe confundirse con corregir vulnerabilidades. Un atacante puede identificar la tecnología mediante otras señales. La prioridad sigue siendo la aplicación de parches, la configuración segura, el inventario y la reducción de superficie."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: La seguridad requiere eliminar controles obsoletos, no solo agregar nuevos headers.",
    "headers": [
      "Artículo",
      "Situación recomendada",
      "Alternativa u observación"
    ],
    "rows": [
      [
        "X-XSS-Protection",
        "No lo trate como control moderno principal.",
        "Utilice CSP y corrija la inyección/XSS."
      ],
      [
        "Public-Key-Pins",
        "No implementar.",
        "Gestionar certificados, CT y automatización de renovaciones."
      ],
      [
        "Expect-CT",
        "No adoptar como un nuevo requisito.",
        "Utilice el ecosistema actual de transparencia de certificados."
      ],
      [
        "Feature-Policy",
        "Migrar.",
        "Utilice la política de permisos."
      ],
      [
        "X-Powered-By",
        "Retirar cuando sea posible.",
        "No reemplaza el hardening ni el parcheo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.17 Implementación en aplicaciones, gateways y CDN",
    "id": "26-17-implementacion-en-aplicaciones-gateways-y-cdn"
  },
  {
    "kind": "paragraph",
    "text": "La aplicación conoce mejor el contenido y debe participar en políticas específicas de CSP, cookies, caché y recorrido. La API Gateway puede aplicar valores predeterminados, CORS, HSTS, eliminación de divulgación, observabilidad y barreras de seguridad. La CDN puede agregar o normalizar headers, pero es necesario comprender su posición en la secuencia para evitar sobrescritura y duplicación."
  },
  {
    "kind": "paragraph",
    "text": "Una política corporativa madura define una matriz por tipo de activo: API JSON pública, API privada, portal estático, aplicación autenticada, consola administrativa y descarga de archivos. Cada categoría recibe excepciones básicas y aprobadas. Aplicar el mismo CSP a una API JSON y a un SPA no tiene sentido; de manera similar, CORS puede ser irrelevante para la integración exclusivamente de servidor a servidor."
  },
  {
    "kind": "paragraph",
    "text": "La configuración como código y las pruebas automatizadas reducen la deriva. La canalización puede comprobar la presencia, el valor, la duplicidad y la coherencia de los headers. Las pruebas de un extremo a otro deben validar el comportamiento real en el navegador, porque los servidores proxy, las redirecciones y las respuestas de error pueden cambiar la política. En entornos distribuidos, registre qué componente agregó o eliminó cada encabezado."
  },
  {
    "kind": "subhead",
    "text": "orden de responsabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Evite múltiples componentes escribiendo el mismo encabezado sin reglas de precedencia. Defina claramente si la aplicación, la API Gateway, la entrada, la CDN o el servidor web es la fuente autorizada. La duplicidad puede ser tan peligrosa como la ausencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.18 Retroubleshooting y laboratorios",
    "id": "26-18-retroubleshooting-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico comienza en el navegador: la red muestra verificación previa, redireccionamientos, cookies y headers; La consola presenta violaciones de CORS y CSP; Las herramientas de la aplicación muestran cookies y almacenamiento. Luego compare la respuesta observada en el navegador con curl o un cliente servidor-servidor. Si curl funciona y fetch falla, la diferencia probablemente esté en el modelo de seguridad del navegador, no en la conectividad básica."
  },
  {
    "kind": "paragraph",
    "text": "Para CORS, verifique Origen, método, headers solicitados, respuesta de OPCIONES, respuesta real, credenciales, variación y duplicidad. Para CSP, identifique la política violada, la URL bloqueada, nonce o hash y la política efectiva. Para HSTS, confirme que el encabezado se recibió a través de HTTPS, el estado del host y la cobertura del subdominio. Para el caché, observe Edad, Control de caché, Variación y el componente que proporcionó la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Los laboratorios deben realizarse en ambientes autorizados. Es útil configurar dos fuentes locales en diferentes puertos, observar solicitudes y comprobaciones previas simples, activar credenciales, probar la lista de permitidos, implementar CSP solo para informes, introducir un script en línea bloqueado, habilitar HSTS con una edad máxima corta y validar headers en las respuestas de error de la API Gateway."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - El diagnóstico debe identificar qué agente aplicó la política.",
    "headers": [
      "Síntoma",
      "capa probable",
      "Pruebas para recoger"
    ],
    "rows": [
      [
        "Error de CORS, backend registrado 200",
        "Política del navegador o respuesta CORS.",
        "Origen, ACAO, credenciales, consola y respuesta real."
      ],
      [
        "El script no se ejecuta después de la implementación",
        "CSP.",
        "Directiva violada, nonce/hash y solo informe."
      ],
      [
        "Subdominio detenido después de HSTS",
        "Incluye cobertura de SubDominios.",
        "Estado HSTS y TLS del subdominio."
      ],
      [
        "Aparecen los datos de otro usuario",
        "Caché compartido.",
        "Cache-Control, Vary, claves y headers de identidad."
      ],
      [
        "El Iframe legítimo ha sido bloqueado",
        "ancestros del marco/XFO.",
        "Política efectiva y origen del incrustador."
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
    "text": "CORS, CSP y HSTS son mecanismos distintos. CORS controla el acceso entre orígenes mediado por el navegador; CSP restringe la carga y ejecución de contenido; HSTS establece el uso obligatorio de HTTPS una vez que se conoce la política. Ninguno de ellos reemplaza la seguridad, autenticación o autorización del backend."
  },
  {
    "kind": "paragraph",
    "text": "Los headers complementarios reducen otras clases de riesgo: frame-ancestros y X-Frame-Options manejan el clickjacking; X-Content-Type-Options reduce el rastreo MIME; La Política de referencia mejora la privacidad; La política de permisos limita las capacidades; COOP, COEP y CORP participan de forma aislada; Los atributos de Cache-Control y cookies protegen el estado y las respuestas confidenciales."
  },
  {
    "kind": "paragraph",
    "text": "La implementación correcta requiere propiedad, implementación gradual, pruebas del navegador, coherencia en las respuestas de error y observabilidad. Las plantillas genéricas sin comprensión pueden dañar las aplicaciones o producir una falsa sensación de seguridad. La política debe reflejar la arquitectura y revisarse a medida que evolucionan los estándares, los navegadores y los productos."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en Rate Limiting, Quotas y Throttling, mecanismos que controlan el consumo, protegen la capacidad y aplican contratos operativos en API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de implementación",
    "id": "lista-de-verificacion-de-implementacion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "CORS tiene una lista de permitidos explícita y no refleja arbitrariamente el origen.",
      "La verificación previa se maneja correctamente y no depende de la autenticación de la operación real.",
      "Los headers CORS también aparecen en las respuestas de error relevantes.",
      "Las respuestas variables por origen utilizan Vary y una clave de caché coherente.",
      "CSP se implementó con un plan de eliminación de inventario, solo informe y evaluación insegura/en línea insegura.",
      "Los scripts en línea autorizados utilizan nonce o hash correctamente.",
      "HSTS se habilitó gradualmente e includeSubDomains fue precedido por el inventario.",
      "frame-ancestros, nosniff, Referrer-Policy y Permissions-Policy tienen valores apropiados para el activo.",
      "COOP, COEP y CORP fueron probados con recursos de terceros.",
      "Cache-Control protege las respuestas personalizadas y confidenciales sin bloquear el caché legítimo de forma indiscriminada.",
      "Las cookies de sesión utilizan Secure, HttpOnly, SameSite y scope mínimo.",
      "Se han eliminado los headers obsoletos de la línea base.",
      "Hay un componente autorizado para cada encabezado y pruebas contra duplicaciones.",
      "Los recorridos críticos se prueban en el navegador después de cambios en la API Gateway, la CDN o la aplicación."
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
      "Explique por qué CORS no impide que un cliente servidor-servidor llame a una API.",
      "Diferenciar origen y sitio y relacionar la diferencia con CORS y SameSite.",
      "Describa el flujo de verificación previa completo para un PUT con autorización y aplicación/json.",
      "Explique por qué Access-Control-Allow-Origin: * no funciona con respuesta acreditada.",
      "Proponer un CSP para un SPA que cargue sus propios scripts y llame a una API específica.",
      "Compare nonce, hash y unsafe-inline.",
      "Explique el riesgo operativo de includeSubDomains en HSTS.",
      "Diferenciar entre frame-src, frame-ancestros y X-Frame-Options.",
      "Compare sin almacenamiento y sin caché con una API bancaria de ejemplo.",
      "Explique las diferencias entre CORS, CORP, COOP y COEP.",
      "Configure un plan de implementación de API Gateway para CSP y CORS sin tiempo de inactividad.",
      "Enumere la evidencia necesaria para investigar un error de CORS que solo ocurre en producción."
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
    "caption": "Tabla 10 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Lista de permitidos",
        "Conjunto explícito de orígenes o fuentes autorizadas."
      ],
      [
        "CORS",
        "Protocolo para compartir de forma controlada recursos entre orígenes en el navegador."
      ],
      [
        "CSP",
        "Política que restringe los recursos cargados y ejecutados por una página."
      ],
      [
        "COEP",
        "Política de requisitos para la incorporación de origen cruzado."
      ],
      [
        "COOP",
        "Política de aislamiento entre contextos de navegación."
      ],
      [
        "CORP",
        "Política de recurso declarado sobre carga entre orígenes."
      ],
      [
        "Solicitud de acreditación",
        "Solicitud CORS que utiliza credenciales según el modo de cliente."
      ],
      [
        "HSTS",
        "Política que requiere el uso de HTTPS durante un período determinado."
      ],
      [
        "MIME olfateando",
        "Inferencia del tipo de contenido por parte del navegador en desacuerdo con el tipo declarado."
      ],
      [
        "Nonce",
        "Valor impredecible utilizado para autorizar contenido específico en CSP."
      ],
      [
        "Origin",
        "Combinación de esquema, host y puerto."
      ],
      [
        "verificación previa",
        "Consulta de OPCIONES realizada antes de ciertas solicitudes CORS."
      ],
      [
        "referente",
        "Información sobre el contexto que llevó a la navegación o carga."
      ],
      [
        "Same-Origin Policy",
        "Conjunto de restricciones que separan contextos de distintos orígenes."
      ],
      [
        "Vary",
        "Encabezado que indica las dimensiones de la solicitud utilizadas para seleccionar la representación en caché."
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
      "QUÉ. Estándar de recuperación: protocolo CORS, verificación previa y políticas de recuperación.",
      "QUÉ. Estándar HTML: políticas de origen, navegación y contexto.",
      "W3C. Política de seguridad de contenidos Nivel 3.",
      "IETF. RFC 6797: Seguridad de transporte estricta HTTP (HSTS).",
      "IETF. RFC 7034: Opciones de marco X del campo de encabezado HTTP.",
      "IETF. RFC 9110 - Semántica HTTP.",
      "IETF. RFC 9111: cache HTTP.",
      "W3C. Política de referencia.",
      "W3C. Política de permisos.",
      "W3C. Borrar datos del sitio.",
      "OWASP. Hoja de referencia de headers HTTP y hoja de referencia para compartir recursos entre orígenes."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los headers y el comportamiento del navegador evolucionan. Antes de adoptar una política corporativa, valide la especificación actual, la compatibilidad de los navegadores de destino y el comportamiento de la versión específica de la API Gateway, la entrada, la CDN y el marco utilizados."
  }
];
