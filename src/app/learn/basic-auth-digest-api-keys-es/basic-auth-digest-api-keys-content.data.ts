import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const BASIC_AUTH_DIGEST_API_KEYS_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Tres mecanismos de credenciales con propiedades muy diferentes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/overview.svg",
    "alt": "Basic Auth, Digest y API key como mecanismos de credenciales con diferentes propiedades",
    "caption": "Figura inicial: las Basic Auth, Digest y API Keys parecen simples, pero requieren una gestión de credenciales completa."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Todos dependen de TLS, gestión secreta, privilegios mínimos, rotación y observabilidad para un uso seguro."
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
    "text": "El capítulo anterior separó autenticación y autorización y mostró que una identidad sólo resulta útil cuando existe una prueba, un principal y una decisión de acceso. Ahora, el curso profundiza en tres mecanismos históricamente importantes que aún se encuentran en las API corporativas: HTTP Basic, HTTP Digest y API Keys. Aparecen en integraciones heredadas, automatizaciones, productos SaaS, puertas de enlace, dispositivos y sistemas internos que necesitan una incorporación sencilla."
  },
  {
    "kind": "paragraph",
    "text": "La simplicidad operativa es la razón principal de su persistencia, pero también crea dificultades. Basic Auth envía una credencial reutilizable en cada llamada y depende completamente de TLS para su confidencialidad. Digest evita transmitir la contraseña directamente y utiliza desafío-respuesta, pero sigue siendo sensible a contraseñas débiles, reproducción mal controlada y limitaciones de interoperabilidad. Las API keys identifican aplicaciones y planes de consumo, pero a menudo se tratan como si fueran una identidad de usuario sólida o una autorización suficiente para cualquier operación."
  },
  {
    "kind": "paragraph",
    "text": "Los tres mecanismos son credenciales estáticas o de larga duración en comparación con tokens cortos. Por tanto, la seguridad no puede limitarse al formato del encabezado. Es necesario considerar generación, almacenamiento, exposición de registros, rotación, revocación, alcance, cuotas, segregación por ambiente, auditoría y respuesta a incidentes. Una clave segura filtrada sigue siendo una credencial válida hasta que la plataforma la detecta y la revoca."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta el marco de autenticación HTTP, el flujo detallado de Basic Auth y Digest, la arquitectura de administración de API keys y la aplicación en API Gateways. El objetivo es permitir al lector reconocer cuándo estos mecanismos son aceptables, qué controles compensatorios son indispensables y cuándo se debe priorizar la migración a OAuth 2.0, mTLS o identidades de workload."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada mecanismo, realice un seguimiento de la credencial desde la emisión hasta la revocación. Pregunte dónde existe el secreto a la vista, quién puede reutilizarlo, cómo la puerta de enlace identifica al consumidor, cómo recibe el contexto el backend y durante cuánto tiempo una exposición permanecería válida."
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
      "Explique el marco de desafíos HTTP y el papel de 401, autenticación y autorización WWW.",
      "Describir la codificación de Basic Auth y diferenciar Base64 del cifrado.",
      "Analizar los riesgos de exposición, reproducción, intercambio y almacenamiento de contraseñas.",
      "Comprender el desafío-respuesta de HTTP Digest y sus principales parámetros.",
      "Explique realm, nonce, opaque, qop, nc, cnonce, algorithm y stale.",
      "Reconocer las limitaciones prácticas y de seguridad de Digest en las API modernas.",
      "Distinga la API key de la identidad del usuario, el token OAuth y la firma HMAC.",
      "Diseñar generación, almacenamiento, alcance, cuota, rotación y revocación de claves.",
      "Aplique validación de credenciales a API Gateways sin propagar secretos al backend.",
      "Planifique la migración de credenciales estáticas a mecanismos de prueba de posesión o de corta duración."
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
      "15.1 Credenciales estáticas en el contexto de las API",
      "15.2 Marco de autenticación HTTP",
      "15.3 Basic Auth: formato y flujo",
      "15.4 Base64 no es cifrado",
      "15.5 Basic Auth sobre TLS e intermediarios",
      "15.6 Almacenamiento y validación de contraseñas",
      "15.7 Hardening y migración de Basic Auth",
      "15.8 Digest: motivación y desafío-respuesta",
      "15.9 Parámetros y cálculo de Digest",
      "15.10 Nonce, replay, stale y limitaciones",
      "15.11 API Keys: modelo de propósito y amenaza",
      "15.12 Generación, formato y distribución",
      "15.13 Almacenamiento, búsqueda y metadata",
      "15.14 Alcances, cuotas y autorización",
      "15.15 Rotación, revocación y detección de fugas",
      "15.16 Firma de solicitudes HMAC y mecanismos relacionados",
      "15.17 Uso en API Gateways",
      "15.18 Comparación, retroubleshooting y estudios de casos",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.1 Credenciales estáticas en el contexto de las API",
    "id": "15-1-credenciales-estaticas-en-el-contexto-de-las-api"
  },
  {
    "kind": "paragraph",
    "text": "Una credencial estática es un valor que permanece válido durante un tiempo relativamente largo y se puede reutilizar en varias llamadas. Las contraseñas y las API keys entran en esta categoría. El problema no es solo la duración: debido a que el mismo valor prueba el acceso repetidamente, cualquier copia obtenida por registro, repositorio, estación comprometida, proxy o fuga de configuración se puede utilizar hasta su vencimiento o revocación."
  },
  {
    "kind": "paragraph",
    "text": "Las credenciales estáticas ofrecen una implementación sencilla. Un consumidor recibe un nombre de usuario y contraseña o una clave, agrega un encabezado y llama a la API. No hay servidor de autorización, flujo de obtención de token ni renovación. Esta simplicidad puede ser apropiada en laboratorios, integraciones estrechas y sistemas heredados, pero transfiere la responsabilidad a procesos operativos que muchos equipos descuidan."
  },
  {
    "kind": "paragraph",
    "text": "En una arquitectura segura, cada credencial tiene una identidad individual, propietario, entorno, propósito, alcance, fecha de creación, vencimiento, último uso, estado e historial de rotación. Compartir la misma credencial en múltiples sistemas destruye la trazabilidad y coordina la revocación. El principio fundamental es que la simplicidad del protocolo no puede significar ausencia de gobernanza."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: La credencial estática segura depende del ciclo de vida explícito.",
    "headers": [
      "Propiedad",
      "Pregunta operativa",
      "Riesgo si está ausente"
    ],
    "rows": [
      [
        "Individualización",
        "¿Qué aplicación o persona controla la credencial?",
        "Incapacidad para asignar tráfico e incidencia."
      ],
      [
        "Alcance",
        "¿Qué API y operaciones se pueden utilizar?",
        "El compromiso amplía el acceso lateral."
      ],
      [
        "Caducidad",
        "¿Cuándo deja de aceptarse el valor?",
        "El secreto abandonado permanece activo."
      ],
      [
        "Rotación",
        "¿Cómo intercambiar sin indisponibilidad?",
        "La credencial nunca se renueva."
      ],
      [
        "Revocación",
        "¿Cuánto tiempo para bloquear una fuga?",
        "Larga ventana de abuso."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.2 Marco de autenticación HTTP",
    "id": "15-2-marco-de-autenticacion-http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP define un marco de autenticación general basado en desafíos. Cuando un recurso requiere autenticación y el cliente no presenta una credencial aceptable, el servidor puede responder 401 Unauthorized acompañado de uno o más encabezados WWW-Authenticate. Cada desafío informa el esquema y los parámetros requeridos, como el dominio. El cliente elige un esquema compatible y repite la solicitud con Autorización."
  },
  {
    "kind": "paragraph",
    "text": "El nombre 401 Unauthorized es históricamente confuso: en la práctica, representa la ausencia o falla de autenticación. Una vez autenticada la identidad, una denegación por falta de permiso suele utilizar 403 Prohibido. Esta separación preserva la semántica, facilita la retroubleshooting y evita que los consumidores intenten intercambiar credenciales cuando el verdadero problema es la autorización."
  },
  {
    "kind": "paragraph",
    "text": "Una puerta de enlace puede anunciar más de un desafío u ocultar detalles para reducir la enumeración. En las API, también es común recibir credenciales de forma preventiva, sin el primer 401. Aún así, comprender el modelo de desafío es esencial para Basic y Digest, además de ayudar con la interpretación de registros, clientes HTTP y bibliotecas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/figure-01.svg",
    "alt": "Flujo de desafío HTTP entre el cliente y el servidor o puerta de enlace",
    "caption": "Figura 1: Basic Auth y Digest utilizan el marco de desafío definido por HTTP."
  },
  {
    "kind": "subhead",
    "text": "Ejemplos de desafíos HTTP"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Basic realm=\"api-corporativa\", charset=\"UTF-8\"\n# o\nWWW-Authenticate: Digest realm=\"api-corporativa\",\n  nonce=\"valor-emitido-por-el-servidor\", qop=\"auth\", algorithm=SHA-256"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.3 Basic Auth: formato y flujo",
    "id": "15-3-basic-auth-formato-y-flujo"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic utiliza un identificador de usuario y una contraseña combinados en el formato ID de usuario:contraseña. La secuencia de bytes resultante está codificada en Base64 y se envía en el header Authorization con el prefijo Basic. El servidor descifra el valor, encuentra la cuenta y verifica la contraseña. En las integraciones de máquina a máquina, la identificación de usuario puede representar una aplicación o una cuenta técnica, pero esto no transforma automáticamente el mecanismo en una identidad sólida de workload."
  },
  {
    "kind": "paragraph",
    "text": "El cliente puede esperar un desafío 401 o enviar el encabezado en la primera llamada. Muchos SDK y herramientas ocultan este detalle. En ambos casos, la credencial se transmite en todas las solicitudes, incluso cuando se abren diferentes conexiones. Esto aumenta la superficie de exposición en comparación con una contraseña utilizada únicamente para obtener un token de corta duración."
  },
  {
    "kind": "paragraph",
    "text": "El realm permite al servidor indicar el espacio de protección. Los clientes pueden utilizar esta información para decidir qué credenciales reenviar. En entornos con múltiples hosts, redirecciones y servidores proxy, la configuración debe evitar que la autorización se reenvíe a un destino que no sea de confianza."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de Basic Auth"
  },
  {
    "kind": "code",
    "text": "# Texto lógico antes de la codificación\nintegracion-facturacion:ContrasenaDeEjemplo\n# Header HTTP\nAuthorization: Basic aW50ZWdyYWNhby1mYXR1cmFtZW50bzpTZW5oYURlRXhlbXBsbw=="
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.4 Base64 no es cifrado",
    "id": "15-4-base64-no-es-cifrado"
  },
  {
    "kind": "paragraph",
    "text": "Base64 es una codificación para representar bytes en caracteres seguros para el transporte textual. No utiliza clave, no ofrece confidencialidad y puede ser revertido por cualquier persona o herramienta. Tratar el valor Base64 como hash o cifrado es un error grave. Sólo protege contra problemas de suplantación, no de observación del tráfico."
  },
  {
    "kind": "paragraph",
    "text": "Por este motivo, la Basic Auth solo debe utilizarse sobre TLS correctamente validado. Sin TLS, el nombre de usuario y la contraseña quedan expuestos a quien capture la comunicación. Incluso con TLS, la credencial puede aparecer en registros de depuración, volcados de memoria, herramientas de observabilidad, historial de comandos, variables de entorno y configuraciones. El canal protegido no corrige las fugas en los endpoints o terminadores intermediarios."
  },
  {
    "kind": "paragraph",
    "text": "La codificación tampoco impide la repetición. Si un atacante obtiene el encabezado completo, puede reutilizarlo siempre que la contraseña siga siendo válida. La protección se basa en un alto secreto, rotación, detección de anomalías, limitación de reintentos y privilegios mínimos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/figure-02.svg",
    "alt": "Basic Auth que atraviesa la codificación Base64 y un canal seguro TLS",
    "caption": "Figura 2: El único elemento que protege la confidencialidad de la Basic Auth en tránsito es el canal TLS."
  },
  {
    "kind": "subhead",
    "text": "Regla de funcionamiento"
  },
  {
    "kind": "paragraph",
    "text": "Nunca coloque Basic Auth en URL, cadenas de consulta, registros, tickets o ejemplos con credenciales reales. Las redacciones visuales en las capturas de pantalla no eliminan el valor de los archivos de configuración o los historiales del terminal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.5 Basic Auth sobre TLS e intermediarios",
    "id": "15-5-basic-auth-sobre-tls-e-intermediarios"
  },
  {
    "kind": "paragraph",
    "text": "Cuando hay un proxy inverso o API Gateway, TLS puede finalizar antes que el backend. El tramo cliente-gateway y el tramo gateway-backend son conexiones independientes. Si el gateway pasa la Autorización original al backend, la contraseña continúa circulando internamente y puede aparecer en más puntos de observación. Una mejor arquitectura valida la credencial en el borde y reenvía una identidad interna restringida o un token de corta duración."
  },
  {
    "kind": "paragraph",
    "text": "Los redireccionamientos también merecen atención. Los clientes HTTP seguros evitan reenviar la autorización a otro host, pero los comportamientos varían según la biblioteca y la configuración. Un endpoint autenticado no debe responder con una redirección a un dominio que no sea de confianza. Las reglas de proxy deben eliminar los encabezados de identidad externos antes de insertar un contexto validado."
  },
  {
    "kind": "paragraph",
    "text": "El servidor debe aplicar protección contra la fuerza bruta y el relleno de credenciales. Limitación de tarifas por cuenta, fuente y dispositivo, bloqueo progresivo, detección de contraseñas filtradas, monitoreo y ayuda de alertas. El bloqueo permanente después de algunos intentos puede causar denegación de servicio; La política debe equilibrar la seguridad y la disponibilidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.6 Almacenamiento y validación de contraseñas",
    "id": "15-6-almacenamiento-y-validacion-de-contrasenas"
  },
  {
    "kind": "paragraph",
    "text": "El servidor no debe almacenar una contraseña reversible solo para compararla con el valor recibido. Las contraseñas de los usuarios humanos deben estar protegidas mediante funciones de derivación específicas, con sal individual y parámetros de costo adecuados. El cheque recalcula la derivada y la compara en tiempo constante. Las cuentas técnicas se pueden migrar a claves, certificados o identidades de cargas de trabajo, evitando tratar los secretos de las aplicaciones como contraseñas humanas."
  },
  {
    "kind": "paragraph",
    "text": "Basic requiere que el servidor obtenga la contraseña presentada en cada llamada y la valide. Esto no significa que la contraseña deba quedar clara en el banco. Sin embargo, algunos sistemas heredados delegan la autenticación en directorios o almacenan credenciales reversibles para la integración. Estos casos aumentan el impacto del compromiso y deben contar con un plan de migración."
  },
  {
    "kind": "paragraph",
    "text": "Los registros de autenticación deben registrar el identificador, el resultado, el motivo categorizado, el origen, la correlación y la política aplicada, pero nunca la contraseña ni el header Authorization. Los mensajes al cliente deben evitar diferenciar un usuario inexistente de una contraseña incorrecta cuando esto permita la enumeración."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: El almacenamiento seguro reduce el impacto de las fugas en el almacén de credenciales.",
    "headers": [
      "Elemento",
      "Mejores prácticas",
      "evitar"
    ],
    "rows": [
      [
        "banco de contraseñas",
        "Sal individual y función bypass adecuada.",
        "Borrar contraseña o cifrado reversible sin necesidad."
      ],
      [
        "Comparación",
        "Rutina constante y biblioteca consolidada.",
        "Comparaciones de viviendas y registros de valores."
      ],
      [
        "cuenta técnica",
        "Identidad individual y propietario.",
        "Usuario compartido por múltiples trabajos."
      ],
      [
        "Observabilidad",
        "Resultado, origen y correlación.",
        "Autorización y contraseña en el log."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.7 Migración y refuerzo de Basic Auth",
    "id": "15-7-migracion-y-refuerzo-de-basic-auth"
  },
  {
    "kind": "paragraph",
    "text": "Basic Auth se puede tolerar en una integración controlada cuando se requiere TLS, la cuenta es individual, la contraseña es aleatoria y larga, el acceso es limitado y hay rotación. También debe haber un plan de reemplazo. El mecanismo no es adecuado para credenciales humanas en API de alto riesgo o para aplicaciones distribuidas que no pueden proteger secretos estáticos."
  },
  {
    "kind": "paragraph",
    "text": "Una migración común introduce credenciales de cliente OAuth 2.0, mTLS o identidad administrada. Durante la coexistencia, la puerta de enlace acepta Basic solo para consumidores registrados, registra el uso por client_id y comunica la fecha límite de retiro. El nuevo mecanismo se activa en paralelo; Una vez que la telemetría confirma la migración, se revoca la contraseña anterior."
  },
  {
    "kind": "paragraph",
    "text": "No basta con cambiar Basic por un token de larga duración copiado en la configuración. El objetivo es reducir la reutilización y la superficie: tokens cortos, audiencia específica, alcance mínimo, emisión auditable y credenciales de cliente protegidas por bóveda o prueba asimétrica."
  },
  {
    "kind": "subhead",
    "text": "Criterios de migración"
  },
  {
    "kind": "paragraph",
    "text": "Priorice a los consumidores con credenciales compartidas, falta de rotación, acceso privilegiado, que se ejecutan en dispositivos que no son de confianza o exposición pública. Estos factores aumentan el impacto y la probabilidad de compromiso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.8 Digest: motivación y desafío-respuesta",
    "id": "15-8-digest-motivacion-y-desafio-respuesta"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest se creó para evitar que la contraseña se envíe directamente al servidor con cada solicitud. El servidor envía un desafío con opciones de realm, nonce, algoritmo y calidad de protección. El cliente combina estos valores con nombre de usuario, contraseña, método y URI para calcular una respuesta hash. El servidor realiza un cálculo equivalente y compara el resultado."
  },
  {
    "kind": "paragraph",
    "text": "El nonce es un valor emitido por el servidor para limitar la reutilización. El cliente también puede enviar contador cnonce y nc. Con qop=auth, el método y el URI ingresan a la prueba, vinculando la respuesta a la solicitud. En qop=auth-int también participa el órgano de la entidad, aunque el soporte operativo es más complejo."
  },
  {
    "kind": "paragraph",
    "text": "Digest mejora una propiedad específica respecto a Basic: la contraseña no aparece directamente en el cable. Sin embargo, no reemplaza a TLS. Los metadata y el contenido permanecen expuestos sin cifrado de canal, y aún es necesario considerar la degradación, la manipulación o los ataques de captura sin conexión."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/figure-03.svg",
    "alt": "Flujo de Digest con desafío, nonce y prueba calculada",
    "caption": "Figura 3 - El cliente demuestra conocimiento de un secreto sin enviar la contraseña directamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.9 Parámetros y cálculo de Digest",
    "id": "15-9-parametros-y-calculo-de-digest"
  },
  {
    "kind": "paragraph",
    "text": "El realm separa espacios de protección y participa en el cálculo. El nonce lo genera el servidor; opaque es un valor que el cliente devuelve sin interpretar. El algoritmo informa la función hash y posibles variantes con -sess. qop selecciona la calidad de protección. nc es el contador de uso de nonce y cnonce es un valor aleatorio producido por el cliente."
  },
  {
    "kind": "paragraph",
    "text": "De forma simplificada con qop=auth, HA1 se calcula a partir del usuario, realm y la contraseña; HA2 del método HTTP y destino de solicitud; y respuesta de HA1, nonce, nc, cnonce, qop y HA2. La implementación debe seguir estrictamente las especificaciones y utilizar bibliotecas probadas. Pequeñas diferencias en codificación, URI, juego de caracteres o parámetros producen fallas que son difíciles de diagnosticar."
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos y parámetros deben negociarse de forma segura. Las implementaciones no deberían aceptar rebajas silenciosas por opciones débiles cuando la política requiere algoritmos más sólidos. También es importante validar que el cliente responda al mismo realm, nonce y URI asociados con el desafío."
  },
  {
    "kind": "subhead",
    "text": "Cálculo conceptual resumido con qop=auth"
  },
  {
    "kind": "code",
    "text": "HA1 = H(username : realm : password)\nHA2 = H(method : request-target)\nresponse = H(\n  HA1 : nonce : nc : cnonce : qop : HA2\n)\nAuthorization: Digest username=\"cliente-api\", realm=\"pagos\",\n  nonce=\"...\", uri=\"/v1/ordenes\", algorithm=SHA-256,\n  qop=auth, nc=00000001, cnonce=\"...\", response=\"...\""
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Los parámetros del Digest deben validarse como un conjunto coherente.",
    "headers": [
      "Parámetro",
      "Origen",
      "Función"
    ],
    "rows": [
      [
        "realm",
        "Servidor",
        "Define el espacio de protección y participa en el cálculo."
      ],
      [
        "nonce",
        "Servidor",
        "Hace que la prueba dependa de una prueba y de una validez temporal."
      ],
      [
        "opaque",
        "Servidor",
        "Valor opaque devuelto por el cliente."
      ],
      [
        "qop",
        "Servidor/cliente",
        "Seleccione autenticación u otra calidad admitida."
      ],
      [
        "cnonce",
        "Cliente",
        "Agrega aleatoriedad controlada por el cliente."
      ],
      [
        "nc",
        "Cliente",
        "Cuenta los usos del nonce y ayuda a detectar la repetición."
      ],
      [
        "response",
        "Cliente",
        "Prueba de hash calculada para la solicitud."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.10 Nonce, replay, stale y limitaciones de Digest",
    "id": "15-10-nonce-replay-stale-y-limitaciones-de-digest"
  },
  {
    "kind": "paragraph",
    "text": "Un nonce seguro debe ser impredecible o estar autenticado, tener una ventana de validez y estar vinculado al contexto necesario. El servidor puede mantener el estado o codificar la marca de tiempo y MAC en el valor. Cuando el nonce expira, el desafío puede indicar stale=true, lo que permite al cliente repetir la operación con un nuevo nonce sin asumir que el nombre de usuario o la contraseña son incorrectos."
  },
  {
    "kind": "paragraph",
    "text": "El contador nc debe crecer por cada uso del mismo nonce y cnonce. El servidor puede detectar la reproducción, pero esto requiere lógica de estado o de ventana. Los clústeres distribuidos y las puertas de enlace deben compartir o validar esta información de manera consistente. Una implementación que solo verifica el hash e ignora el contador y la validez pierde una parte importante de la protección de reproducción."
  },
  {
    "kind": "paragraph",
    "text": "Digest permanece sujeto a ataques fuera de línea cuando un atacante captura el desafío y la respuesta y la contraseña tiene baja entropía. Tampoco ofrece confidencialidad de la carga útil, no resuelve la autorización, no reemplaza a MFA y tiene una interoperabilidad desigual entre clientes, servidores proxy y puertas de enlace. En las API modernas, a menudo se mantiene por compatibilidad, no como primera opción para nuevos proyectos."
  },
  {
    "kind": "subhead",
    "text": "Límite de seguridad"
  },
  {
    "kind": "paragraph",
    "text": "Digest protege la contraseña en tránsito de manera diferente a Basic Auth, pero no transforma una contraseña débil en una credencial segura. Capturar una respuesta puede permitirle probar a los candidatos sin conexión sin volver a interactuar con el servidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.11 API Keys: modelo de propósito y amenaza",
    "id": "15-11-api-keys-modelo-de-proposito-y-amenaza"
  },
  {
    "kind": "paragraph",
    "text": "La API key es un valor asignado a una suscripción de consumidor, aplicación, proyecto o producto. Le permite identificar quién está utilizando la API, aplicar cuotas, limitación de tarifas, facturación, análisis y políticas. En algunos entornos también se utiliza como autenticación de aplicaciones. Sin embargo, la posesión de la clave no prueba la identidad humana ni establece, en sí misma, una autorización comercial."
  },
  {
    "kind": "paragraph",
    "text": "Una clave normalmente es portadora: cualquiera que conozca el valor puede utilizarla. Por lo tanto, no debe integrarse en un JavaScript público, una aplicación móvil distribuida, un repositorio o un firmware fácilmente extraíble cuando el acceso asociado sea confidencial. En clientes públicos, la clave sólo puede servir como identificador de producto, sin ser tratada como un secreto fuerte."
  },
  {
    "kind": "paragraph",
    "text": "El modelo de amenaza incluye filtraciones en registros, cadenas de consulta, herramientas de análisis, historial del navegador, referencias, canalizaciones, contenedores, cuadernos, mensajes y soporte. También incluye compartir intencionalmente entre equipos, copiar en el entorno incorrecto y permanecer después de que se cancela el propietario."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.12 Generación, formato y distribución de API Keys",
    "id": "15-12-generacion-formato-y-distribucion-de-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "Se debe generar una API key con una fuente criptográficamente segura y suficiente entropía para evitar conjeturas. Los formatos legibles por humanos pueden incluir un prefijo no secreto que identifica el producto o el entorno, seguido de material aleatorio. El prefijo facilita el enrutamiento, el soporte y la detección de la clave de prueba utilizada en producción sin revelar el secreto completo."
  },
  {
    "kind": "paragraph",
    "text": "La clave solo debe mostrarse al consumidor en el momento de su creación o a través de un canal seguro. Luego, la plataforma almacena una representación protegida. El correo electrónico, las hojas de cálculo y los tickets no son seguros. Las aplicaciones deben recibir el valor a través de un secret manager, una canalización protegida o un mecanismo de arranque, y nunca mediante la confirmación de código."
  },
  {
    "kind": "paragraph",
    "text": "Las claves de producción, homologación y desarrollo deben ser diferentes. La segregación reduce la propagación de fugas y permite políticas diferentes. La plataforma también puede limitar el origen, el certificado, el host, la API o la operación de la red, pero estos controles complementan y no reemplazan la protección de claves."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/figure-04.svg",
    "alt": "Ciclo de vida corporativo de una API key desde su emisión hasta su revocación",
    "caption": "Figura 4: La emisión es solo el comienzo del ciclo de vida de una API key."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.13 Almacenamiento, búsqueda y metadata",
    "id": "15-13-almacenamiento-busqueda-y-metadata"
  },
  {
    "kind": "paragraph",
    "text": "Cuando la clave solo funciona como portadora, el servidor no necesita almacenar el valor en formato claro. Puede almacenar hash o MAC y comparar la presentación. Para una búsqueda eficiente, son útiles los formatos con identificador público y secreto separado: el prefijo ubica el registro y el secreto se valida de forma segura. Esto evita escanear toda la base de hash con cada solicitud."
  },
  {
    "kind": "paragraph",
    "text": "El registro de clave debe contener propietario, aplicación, producto, entorno, alcances, cuotas, estado, creación, vencimiento, última rotación, último uso y motivo de revocación. Los metadata permiten tomar decisiones sin exponer el secreto. También admite campañas de inventario, informes de claves huérfanas y rotación."
  },
  {
    "kind": "paragraph",
    "text": "Si la plataforma necesita recuperar el valor para firmar solicitudes en nombre del consumidor, la clave ya no es solo una clave de verificación y requiere almacenamiento reversible en una bóveda o HSM, con controles de auditoría y acceso más estrictos. Este caso debe distinguirse de una clave utilizada únicamente para autenticar llamadas entrantes."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: La separación de identificador, secreto, verificador y metadata mejora la operación y la respuesta a incidentes.",
    "headers": [
      "Componente",
      "Contenido",
      "Exposición"
    ],
    "rows": [
      [
        "ID de clave/prefijo_",
        "Identificador público para búsqueda.",
        "Puede aparecer en registros y portales."
      ],
      [
        "secret",
        "Material aleatorio presentado en la convocatoria.",
        "Solo para consumidores y proceso de validación."
      ],
      [
        "verificador",
        "Hash o MAC del secreto.",
        "Banco protegido; no permite el uso directo."
      ],
      [
        "metadata",
        "Propietario, alcance, cuota, estado y fechas.",
        "Servicios de gestión y políticas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.14 Transmisión, alcances, cuotas y autorización",
    "id": "15-14-transmision-alcances-cuotas-y-autorizacion"
  },
  {
    "kind": "paragraph",
    "text": "Las API keys deben transmitirse preferiblemente en un encabezado dedicado o Autorización con un esquema definido por la plataforma. Ponerlos en una cadena de consulta aumenta las filtraciones en los registros de acceso, el historial, los análisis, las cachés y los encabezados de Referer. TLS sigue siendo obligatorio porque una clave capturada se puede reutilizar."
  },
  {
    "kind": "paragraph",
    "text": "Cada clave debe tener un alcance mínimo: producto, API, operaciones, entorno y, cuando sea posible, datos o inquilino específicos. Las cuotas y el throttling limitan el consumo y reducen el impacto del abuso, pero no equivalen a una autorización. Una clave con una cuota de mil llamadas aún puede acceder a un objeto inadecuado si el servidor no valida la propiedad."
  },
  {
    "kind": "paragraph",
    "text": "Para operaciones de nombre de usuario, la API key puede identificar la aplicación mientras otro mecanismo autentica al usuario. Esta separación permite asignar el tráfico a dos sujetos: cliente técnico y usuario final. La puerta de enlace debe preservar tanto el contexto como los registros sin confundirlos."
  },
  {
    "kind": "subhead",
    "text": "Métodos de transmisión de API keys"
  },
  {
    "kind": "code",
    "text": "# Header dedicado\nX-API-Key: pk_live_7F2A...secreto...\n# O esquema de Authorization definido por el proveedor\nAuthorization: ApiKey pk_live_7F2A...secreto...\n# Evitar\nGET /v1/clientes?api_key=pk_live_7F2A..."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.15 Rotación, revocación y detección de fugas",
    "id": "15-15-rotacion-revocacion-y-deteccion-de-fugas"
  },
  {
    "kind": "paragraph",
    "text": "La rotación sin tiempo de inactividad normalmente requiere un período de superposición. El consumidor crea o recibe una segunda clave, actualiza sus aplicaciones, valida el tráfico con el nuevo valor y sólo entonces revoca el anterior. Las plataformas pueden permitir dos claves activas por suscripción. El período de coexistencia debe ser breve y vigilado para evitar duplicaciones permanentes."
  },
  {
    "kind": "paragraph",
    "text": "La revocación debe ser rápida y global. Los cachés de puerta de enlace deben respetar el estado de compatibilidad con riesgos y el TTL. En incidentes, el equipo necesita encontrar todos los entornos y dependencias que utilizan la clave. Esto sólo es posible cuando cada consumidor tiene sus propias credenciales y un inventario confiable."
  },
  {
    "kind": "paragraph",
    "text": "La detección de fugas puede utilizar escáneres de repositorio, patrones de prefijos, monitoreo de origen, aumento repentino de volumen, cambios geográficos y uso fuera de horario. Los Honeytokens o las claves no utilizadas deliberadamente pueden generar alertas inmediatas cuando aparecen en el tráfico."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - La respuesta depende del inventario, la individualización y la capacidad de revocación.",
    "headers": [
      "Evento",
      "Acción inmediata",
      "Acciones adicionales"
    ],
    "rows": [
      [
        "Sospecha de fuga",
        "Deshabilitar o reducir privilegios; preservar la evidencia.",
        "Investigar el origen y emitir una nueva clave."
      ],
      [
        "Rotación planificada",
        "Activar nueva clave en paralelo.",
        "Confirmar el uso y revocar el antiguo."
      ],
      [
        "Propietario desconectado",
        "Suspender las credenciales asociadas.",
        "Reasignar o eliminar integración."
      ],
      [
        "clave sin usar",
        "Confirme con el propietario y bloquee la prueba.",
        "Eliminar activo huérfano."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.16 Firma de solicitudes HMAC y mecanismos relacionados",
    "id": "15-16-firma-de-solicitudes-hmac-y-mecanismos-relacionados"
  },
  {
    "kind": "paragraph",
    "text": "La firma HMAC de solicitudes es diferente a simplemente enviar una API key. El cliente utiliza un secreto para calcular una firma sobre el método, la ruta, la marca de tiempo, los encabezados y el hash del cuerpo. El servidor recalcula y compara. La clave puede identificar al consumidor, mientras que la firma vincula la prueba a una solicitud específica y reduce la repetición cuando se validan la marca de tiempo y el nonce."
  },
  {
    "kind": "paragraph",
    "text": "Este modelo lo utilizan algunas API financieras y de nube, pero requiere una canonicalización estricta. Las diferencias en codificación, orden de encabezados, ruta y normalización del cuerpo producen fallas. La seguridad depende de un fuerte secreto, una ventana temporal corta, una comparación segura, una protección del reloj y una prevención de la reutilización."
  },
  {
    "kind": "paragraph",
    "text": "HMAC no reemplaza a TLS: sin TLS, el contenido y los metadata permanecen visibles y pueden manipularse antes de la verificación. Tampoco proporciona no repudio, porque el cliente y el servidor comparten el mismo secreto. Las firmas asimétricas o mTLS pueden ser más apropiadas cuando la separación de responsabilidades y la prueba de propiedad son importantes."
  },
  {
    "kind": "subhead",
    "text": "Distinción importante"
  },
  {
    "kind": "paragraph",
    "text": "Por lo general, una API key se presenta directamente. En la firma HMAC, el secreto no viaja; produce una firma específica para la solicitud. Los dos modelos requieren diferentes ciclos de vida y controles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.17 Uso en API Gateways, Axway y Azure",
    "id": "15-17-uso-en-api-gateways-axway-y-azure"
  },
  {
    "kind": "paragraph",
    "text": "El API Gateway es un punto natural para validar Basic Auth, Digest o API Keys, aplicar limitación de velocidad, registrar consumo y bloquear credenciales revocadas. La política debe ocurrir antes del enrutamiento al backend y debe distinguir falla de autenticación, clave suspendida, cuota excedida y falta de autorización. La puerta de enlace también debe eliminar las credenciales originales antes de reenviar la solicitud, siempre que el backend no las necesite."
  },
  {
    "kind": "paragraph",
    "text": "En productos corporativos, la clave puede estar asociada a una aplicación, contrato, producto o suscripción. La puerta de enlace consulta el repositorio local, la caché o el servicio de administración. Los cachés mejoran el rendimiento, pero hacen que la revocación dependa de la propagación. Para credenciales críticas, el TTL debe ser corto o la plataforma debe ofrecer invalidación activa."
  },
  {
    "kind": "paragraph",
    "text": "La integración con Axway API Gateway, Azure API Management y otros productos debe validarse según la versión implementada. Las políticas pueden extraer encabezados, validar claves de suscripción, consultar bóvedas, aplicar cuotas y transformar el contexto. El diseño debe evitar la derivación directa al backend y garantizar que los encabezados de identidad insertados por la puerta de enlace no puedan falsificarse externamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/es/figure-05.svg",
    "alt": "Validación de credenciales a través de API Gateway con secret store y backend protegido",
    "caption": "Figura 5: la puerta de enlace valida la credencial y reenvía el contexto confiable, no el secreto original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.18 Comparación entre Basic Auth, Digest y API Keys",
    "id": "15-18-comparacion-entre-basic-auth-digest-y-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "Los tres mecanismos comparten la simplicidad y la falta de un flujo complejo de emisión de tokens, pero resuelven problemas diferentes. Basic Auth transporta nombre de usuario y contraseña. Digest crea pruebas basadas en la contraseña y un desafío. La API key identifica una aplicación o suscripción con un valor aleatorio. Ninguno de ellos, de forma aislada, proporciona autorización detallada, identidad federada o consentimiento delegado."
  },
  {
    "kind": "paragraph",
    "text": "La elección debe considerar dónde se puede proteger la credencial, quién es el sujeto, la duración, la necesidad de rotación y la compatibilidad de los clientes. Para los nuevos servicios de alto riesgo, las credenciales cortas, mTLS, OAuth 2.0 o identidades de workload tienden a ofrecer mejores propiedades. Basic Auth, Digest y API Keys siguen siendo útiles cuando se aplican con un alcance limitado y controles de compensación claros."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Ningún mecanismo elimina la necesidad de TLS, alcance, rotación y autorización.",
    "headers": [
      "Criterio",
      "Basic Auth",
      "Digest",
      "API Key"
    ],
    "rows": [
      [
        "El secreto se transmite directamente",
        "Sí, dentro de Base64 y TLS.",
        "No como contraseña, pero existe una prueba reutilizable en contexto.",
        "Sí, normalmente al portador."
      ],
      [
        "Dependencia TLS",
        "Total.",
        "Sigue siendo necesario.",
        "Total."
      ],
      [
        "Sujeto típico",
        "Cuenta de usuario o técnica.",
        "Cuenta de usuario o técnica.",
        "Solicitud, proyecto o suscripción."
      ],
      [
        "Repetir después de la captura",
        "Posible siempre que la contraseña sea válida.",
        "Mitigado por nonce/nc cuando es correcto.",
        "Posible siempre que la clave sea válida."
      ],
      [
        "Operación",
        "Simple, pero la contraseña necesita protección.",
        "Más complejo y menos interoperable.",
        "Simple, requiere un ciclo de vida robusto."
      ],
      [
        "Uso recomendado",
        "Legado controlado y temporal.",
        "Compatibilidad específica.",
        "Identificación y control de aplicaciones."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.19 Troubleshooting basada en evidencia",
    "id": "15-19-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "Cuando Basic falla, confirme que el encabezado llegó al punto correcto, que Base64 se generó a partir del juego de caracteres esperado, que la contraseña contiene caracteres especiales y que el proxy o el redireccionamiento eliminaron la Autorización. Diferenciar entre 401 por credencial inválida y 403 por falta de permiso y 429 por cupo."
  },
  {
    "kind": "paragraph",
    "text": "En Digest, compare realm, nonce, qop, algoritmo, URI y método utilizado en el cálculo. Verifique la sincronización entre nodos, la validez del nonce, el contador nc y la canonicalización del objetivo de solicitud. Las fallas intermitentes del clúster a menudo indican un estado nonce no compartido o claves diferentes para autenticar el desafío."
  },
  {
    "kind": "paragraph",
    "text": "En las API keys, investigue el nombre del encabezado, el entorno, el prefijo, el estado, la caducidad, los alcances, la cuota y la caché de revocación. Una clave de portal válida puede fallar en tiempo de ejecución si el producto, la suscripción o la implementación no son coherentes. Siempre correlacione los registros de la puerta de enlace, el servicio de administración y el backend."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El diagnóstico requiere identificar el punto que produjo la respuesta.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "evidencia"
    ],
    "rows": [
      [
        "Basic devuelve 401",
        "contraseña cambiada, Base64 incorrecta, realm o header eliminado",
        "registros de autenticación, nodos, cuentas y encabezados enmascarados."
      ],
      [
        "Digest falla después de un tiempo",
        "nonce expirado, nc repetido o stale no tratado",
        "desafío, marca de tiempo, contador y nodo de clúster."
      ],
      [
        "La API key funciona en aprobación",
        "clave o producto del entorno incorrecto",
        "prefijo, metadata, implementación y suscripción."
      ],
      [
        "La clave revocada aún funciona",
        "caché o backend directamente accesible",
        "TTL, invalidación y ruta de bypass."
      ],
      [
        "429 inesperado",
        "cuota compartida o clave reutilizada",
        "propietario, mostradores y consumidores por clave."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.20 Estudios de casos y laboratorios",
    "id": "15-20-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: contraseña compartida por diez integraciones"
  },
  {
    "kind": "paragraph",
    "text": "Diez trabajos utilizan el mismo usuario de Basic Auth. Aparece un secreto en un repositorio y la organización no puede atribuir su uso. La respuesta crea cuentas individuales, restringe alcances, migra a las credenciales de la aplicación y revoca el usuario compartido después de que la telemetría confirma la transición."
  },
  {
    "kind": "paragraph",
    "text": "El caso muestra que el mayor problema no fue Base64, sino la falta de individualización y rotación. Incluso en lo que respecta a TLS, la filtración tuvo un amplio impacto y una baja trazabilidad."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Digest intermitente en clúster"
  },
  {
    "kind": "paragraph",
    "text": "Dos nodos emiten nonces con claves diferentes y el balanceador distribuye llamadas sin afinidad. El cliente recibe un desafío de un nodo y envía la prueba al otro, que rechaza el nonce. La solución comparte la clave de autenticación nonce o utiliza una validación consistente entre nodos."
  },
  {
    "kind": "paragraph",
    "text": "Las capturas y los registros muestran 401 sucesivos con diferentes nonces. El error parecía una contraseña incorrecta, pero la causa estaba en el estado distribuido del motor."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: API key expuesta en una cadena de consulta"
  },
  {
    "kind": "paragraph",
    "text": "Una integración envía la clave en consulta. El valor aparece en los registros de proxy y en la herramienta de análisis. El equipo revoca la clave, elimina parámetros de los registros, cambia la transmisión al encabezado, agrega escáneres y revisa a todos los consumidores."
  },
  {
    "kind": "paragraph",
    "text": "La investigación también identifica que se utilizó la misma clave en producción y prueba. La segregación por entorno reduce el impacto de futuras fugas."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Codifique y decodifique un valor de Basic Auth de laboratorio y tenga en cuenta que Base64 es reversible.",
      "Configure un servidor local autorizado con desafío Basic e inspeccione 401, autenticación WWW y autorización.",
      "Simule el cálculo del Digest con nonce controlado y cambie el método o URI para verificar la falla.",
      "Modele una API key con prefijo público, secreto aleatorio y verificador almacenado.",
      "Implemente la rotación con dos claves activas y confirme la revocación de la anterior.",
      "Compare los registros de una clave en el encabezado y la cadena de consulta, utilizando solo valores ficticios."
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
    "text": "La Basic Auth codifica el nombre de usuario y la contraseña en Base64 y envía la credencial en cada llamada. Base64 no protege el secreto; TLS, almacenamiento adecuado, individualización, rotación y limitación de intentos son fundamentales. En las puertas de enlace, la credencial debe validarse en el borde y eliminarse antes del backend cuando sea posible."
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest utiliza desafío-respuesta con realm, nonce, algoritmo, qop, cnonce y contador. Evita transmitir la contraseña directamente, pero se basa en una implementación estricta, una contraseña segura, control de replay y TLS. Su complejidad e interoperabilidad significan que se adopta principalmente por compatibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Las API keys identifican aplicaciones, proyectos o suscripciones y admiten cuotas y análisis. Como normalmente son portadores, necesitan alta entropía, transmisión de encabezados, almacenamiento protegido, metadata, alcance, rotación y revocación rápida. No reemplazan la identidad del usuario ni la autorización de un recurso."
  },
  {
    "kind": "paragraph",
    "text": "Los mecanismos estáticos deben evaluarse durante todo el ciclo de vida. Para nuevos casos de alto riesgo, los tokens cortos, mTLS, OAuth 2.0 y las identidades de cargas de trabajo ofrecen propiedades superiores. La migración debe basarse en la telemetría y la convivencia controlada."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El capítulo 16 profundizará en el OAuth 2.0 completo: roles, otorgamientos, código de autorización con PKCE, credenciales de cliente, tokens de actualización, alcances, seguridad y aplicación en API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de credenciales estáticas",
    "id": "lista-de-verificacion-de-credenciales-estaticas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Basic Auth, Digest y API Keys solo se aceptan a través de TLS correctamente validado.",
      "Cada consumidor tiene una credencial individual, un propietario y un entorno definido.",
      "Los secretos no aparecen en URL, registros, código fuente, tickets ni análisis.",
      "Las contraseñas están protegidas por un mecanismo de almacenamiento adecuado y nunca se registran.",
      "Nonces Digest tiene validez, integridad y control de repetición.",
      "Los algoritmos de Digest y qop siguen una política explícita y no se degradan silenciosamente.",
      "Las API keys tienen suficiente entropía, prefijo seguro y distribución a través de un canal protegido.",
      "Los verificadores y los metadata están separados del secreto presentado.",
      "Los alcances, cuotas y límites de tarifas no reemplazan la autorización de objetos y dominios.",
      "La rotación permite una breve superposición y una revocación confirmada por telemetría.",
      "Los cachés de puerta de enlace respetan la revocación y no crean ventanas excesivas.",
      "No se puede acceder directamente al backend para evitar la política de puerta de enlace.",
      "Las alertas detectan uso anómalo, origen inesperado y claves huérfanas.",
      "Existe un plan de migración de credenciales cortas o asimétricas cuando el riesgo lo requiere."
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
      "Explique por qué Base64 no protege la Basic Auth.",
      "Describir el flujo 401, autenticación WWW y autorización.",
      "Enumere los riesgos de compartir un usuario de Basic Auth entre aplicaciones.",
      "Explique el papel de kingdom, nonce, qop, cnonce y nc en Digest.",
      "Describa cómo stale=true cambia el comportamiento del cliente.",
      "Explique por qué Digest todavía necesita TLS.",
      "Diferenciar entre API key, token de acceso e identidad de usuario.",
      "Proponer un formato con key_id público y secreto aleatorio.",
      "Describir el almacenamiento con verificador y metadata.",
      "Cree un plan de rotación sin tiempo de inactividad.",
      "Compare la API key directa y solicite la firma HMAC.",
      "Describir la troubleshooting para la clave revocada que aún funciona en la puerta de enlace."
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
    "caption": "Tabla 8 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "API Key",
        "Valor asociado a la aplicación, proyecto, producto o suscripción API."
      ],
      [
        "Base64",
        "Codificación de bytes reversible para caracteres textuales."
      ],
      [
        "Basic Auth",
        "Esquema HTTP que transmite el ID de usuario y la contraseña codificados en Base64."
      ],
      [
        "cnonce",
        "Nonce creado por el cliente en HTTP Digest."
      ],
      [
        "Credential stuffing",
        "Uso automatizado de credenciales obtenidas de filtraciones anteriores."
      ],
      [
        "Digest",
        "Esquema de desafío-respuesta HTTP basado en hash."
      ],
      [
        "HA1",
        "Valor derivado del usuario, dominio y contraseña en Digest."
      ],
      [
        "HA2",
        "Valor derivado del método y el destino de la solicitud en Digest."
      ],
      [
        "HMAC",
        "Código de autenticación de mensajes basado en hash y secreto compartido."
      ],
      [
        "ID_clave_",
        "Identificador público utilizado para localizar el registro de una clave."
      ],
      [
        "nc",
        "Contador de uso de un nonce en Digest."
      ],
      [
        "nonce",
        "Valor utilizado una vez o dentro de una ventana limitada para reducir la repetición."
      ],
      [
        "opaque",
        "Valor de desafío resumido devuelto sin interpretación por parte del cliente."
      ],
      [
        "qop",
        "Calidad de la protección negociada en el Digesto."
      ],
      [
        "realm",
        "Espacio de protección anunciado por un desafío HTTP."
      ],
      [
        "Replay",
        "Reutilización no autorizada de una credencial o evidencia capturada."
      ],
      [
        "Secret manager",
        "Servicio de almacenamiento, distribución y auditoría de secretos."
      ],
      [
        "stale",
        "Indicación de que el nonce ha caducado, no necesariamente la contraseña."
      ],
      [
        "Verifier",
        "Representación protegida utilizada para validar un secreto sin almacenarlo de forma clara."
      ],
      [
        "WWW-Authenticate",
        "Encabezado de respuesta que anuncia desafíos de autenticación HTTP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de decisión",
    "id": "anexo-a-matriz-de-decision"
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - La opción adecuada depende de la capacidad de proteger el secreto y del riesgo de la operación.",
    "headers": [
      "Escenario",
      "Opción de inicio",
      "Condiciones"
    ],
    "rows": [
      [
        "Integración temporal heredada",
        "Basic Auth",
        "TLS, cuenta individual, contraseña segura, bóveda y fecha límite de migración."
      ],
      [
        "Equipo con soporte restringido",
        "Digest",
        "Algoritmo seguro, nonce consistente, TLS y pruebas de interoperabilidad."
      ],
      [
        "ID de aplicación y cuota",
        "API Key",
        "Clave individual, alcance, rotación y autorización separada."
      ],
      [
        "Servicio interno moderno",
        "Credenciales de cliente OAuth 2.0, mTLS o federación",
        "Credencial corta, audiencia e identidad de workload."
      ],
      [
        "Cliente o navegador móvil público",
        "No confíes en la API key como un secreto",
        "Backend intermedio, autenticación de usuarios y controles de abuso."
      ],
      [
        "Solicitud que requiere prueba específica",
        "HMAC o firma asimétrica",
        "Canonicalización, marca de tiempo, nonce y protección de claves."
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
      "IETF. RFC 9110 - Semántica HTTP. 2022.",
      "IETF. RFC 7617: el esquema de autenticación HTTP Basic. 2015.",
      "IETF. RFC 7616: Autenticación de acceso implícito HTTP. 2015.",
      "IETF. RFC 7235 - Autenticación HTTP/1.1, posteriormente consolidada en RFC 9110.",
      "OWASP. Hoja de referencia de autenticación.",
      "OWASP. Hoja de referencia para el almacenamiento de contraseñas.",
      "OWASP. Hoja de trucos de seguridad REST.",
      "OWASP. Hoja de referencia de gestión de secretos.",
      "NIST. SP 800-63B - Autenticación y gestión de autenticadores.",
      "Microsoft aprende. Claves y políticas de suscripción de Azure API Management.",
      "Documentación Axway. API Key, HTTP Basic y políticas de autenticación en API Gateway."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los protocolos y productos tienen detalles específicos de implementación y soporte. Antes de adoptar Basic Auth, Digest o API Keys, valide la documentación oficial de la versión implementada y ejecute pruebas en un entorno autorizado."
  }
];
