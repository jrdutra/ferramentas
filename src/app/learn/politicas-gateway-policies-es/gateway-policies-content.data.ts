import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const GATEWAY_POLICIES_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Políticas como canal ejecutable de control, protección y mediación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/es/overview.svg",
    "alt": "Canalización de policys programables entre la entrada y la respuesta de API Gateway",
    "caption": "Figura de apertura: las policys transforman la API Gateway en un canal de mediación y control programable."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Una policy es un código de infraestructura: el orden, las dependencias, los efectos secundarios y el manejo de fallas determinan su comportamiento."
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
    "text": "El capítulo anterior presentó API Gateway como un intermediario especializado que finaliza conexiones, aplica controles, selecciona rutas y crea una nueva relación con el backend. Este capítulo profundiza en el mecanismo que hace que este comportamiento sea programable: las policys de API Gateway. Una policy representa una unidad de decisión o transformación ejecutada en un determinado punto del flujo. La autenticación, la validación de tokens, la limitación de velocidad, el cache, la transformación de la carga útil, el enrutamiento y la observabilidad se pueden implementar mediante policys encadenadas."
  },
  {
    "kind": "paragraph",
    "text": "En una demostración sencilla, las policys parecen bloques independientes que se pueden arrastrar o escribir en XML, YAML, JSON o un lenguaje gráfico. Sin embargo, en producción forman un programa distribuido. El orden cambia el resultado; una policy produce un contexto consumido por la siguiente; las llamadas externas introducen latencia y disponibilidad; leer el cuerpo puede consumir corrientes; los reintentos pueden multiplicar los efectos; y una falla puede finalizar la solicitud antes de que se scope el backend."
  },
  {
    "kind": "paragraph",
    "text": "Las policys también son parte del modelo de seguridad. Un error de precedencia puede permitir el tráfico antes de la autorización, registrar tokens sin cifrar, aplicar cuota al identificador incorrecto o transformar un mensaje firmado e invalidar su integridad. Por lo tanto, el diseño de policys requiere el mismo cuidado que la ingeniería de software: responsabilidades claras, pruebas, revisión, control de versiones, observabilidad, reversión y control de cambios."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo de este capítulo es construir un modelo mental independiente del producto y relacionarlo con implementaciones como Axway API Gateway, Azure API Management y proxies basados en filtros. Al final, el lector debería poder diseñar una canalización, justificar su orden, predecir los efectos de las fallas, identificar dependencias externas y diagnosticar en qué policy se cambió o rechazó una llamada."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada policy, registre cinco elementos: entrada, condición de ejecución, efecto, estado producido y comportamiento de falla. Luego analice cómo interactúa con las policys anteriores y posteriores. Este método convierte una cadena visual en un programa comprensible."
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
      "Explicar la policy como unidad ejecutable de decisión, control o transformación en el plan de datos.",
      "Distinga las secciones entrante, backend, saliente y en caso de error, reconociendo equivalentes en diferentes productos.",
      "Analizar orden, dependencias, cortocircuito, variables de contexto y efectos secundarios.",
      "Diseñar policys de autenticación, autorización, validación, aceleración, cache, transformación y enrutamiento.",
      "Comprender los reintentos, los tiempos de espera, el disyuntor, el respaldo y la idempotencia.",
      "Reconozca los riesgos de lectura del cuerpo, almacenamiento en búfer, manipulación de headers y llamadas externas.",
      "Cree un manejo de errores consistente sin ocultar la causa técnica.",
      "Aplique registros, métricas, seguimientos, correlación y auditoría a nivel de policys.",
      "Organice la reutilización, la herencia, los scopes, los fragmentos, las plantillas y los parámetros.",
      "Aplique CI/CD, pruebas, revisión, segregación de funciones y reversión a policys de API Gateway."
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
      "22.1 ¿Qué es una póliza?",
      "22.2 Modelo de ejecución y apartados",
      "22.3 Orden, contexto y cortocircuito",
      "22.4 Scopes, herencia y precedencia",
      "22.5 Políticas de autenticación e identidad",
      "22.6 Autorización y decisiones externas",
      "22.7 Validación de mensajes y contratos",
      "22.8 Limitación de tasas, cuotas y estrangulamiento",
      "22.9 Transformación de headers, URL y carga útil",
      "22.10 Selección de enrutamiento y backend",
      "22.11 Caché y coherencia",
      "22.12 Resiliencia y llamados externos",
      "22.13 Manejo de errores",
      "22.14 Observabilidad y auditoría",
      "22.15 Reutilización y gobernanza",
      "22.16 Pruebas, CI/CD y retroubleshooting",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.1 ¿Qué es una póliza?",
    "id": "22-1-que-es-una-poliza"
  },
  {
    "kind": "paragraph",
    "text": "Una policy es una regla ejecutada por la API Gateway en una solicitud, respuesta, conexión o contexto. Puede observar datos, producir variables, permitir o negar continuidad, modificar el mensaje, llamar a un servicio externo, cambiar el destino o generar una respuesta sin reenviar la solicitud. En productos gráficos, la policy puede representarse mediante filtros conectados; en plataformas declarativas, por elementos de configuración ejecutados en secuencia."
  },
  {
    "kind": "paragraph",
    "text": "La policy no debe confundirse con la policy organizacional abstracta. Una regla como “solo las aplicaciones asociadas con un contrato activo pueden acceder a la API” es una policy comercial o de seguridad. Para ejecutarlo, el gateway puede combinar varias policys técnicas: validar certificado, extraer client_id, consultar un PDP, verificar el estado del contrato, registrar la decisión y aplicar cuota. El oleoducto es la implementación operativa de la regla."
  },
  {
    "kind": "paragraph",
    "text": "Las policys pueden ser locales, cuando solo utilizan el contexto ya disponible, o remotas, cuando consultan IdP, endpoint de introspección, banco, caché, servicio de autorización o sistema antifraude. Las policys remotas aumentan la potencia, pero también introducen dependencia de la red, tiempo de espera, reintento, autenticación entre componentes y el riesgo de indisponibilidad en cascada."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Una policy debe tener un efecto objetivo explícito y observable.",
    "headers": [
      "clase",
      "Ejemplos",
      "efecto dominante"
    ],
    "rows": [
      [
        "Seguridad",
        "JWT, mTLS, clave API, autorización.",
        "Permitir, negar o enriquecer la identidad."
      ],
      [
        "Tráfico",
        "Límite de tasa, cuota, detención de picos.",
        "Controlar el volumen y la competencia."
      ],
      [
        "Mediación",
        "Headers, carga útil, protocolo.",
        "Cambiar de representación o de contexto."
      ],
      [
        "Enrutamiento",
        "Backend, versión, región, canario.",
        "Elige destino y estrategia."
      ],
      [
        "Operación",
        "Registros, métricas, seguimiento, auditoría.",
        "Producir evidencia y telemetría."
      ],
      [
        "Resiliencia",
        "Tiempo de espera, reintento, disyuntor.",
        "Contener fallas y proteger dependencias."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.2 Modelo de ejecución y apartados",
    "id": "22-2-modelo-de-ejecucion-y-apartados"
  },
  {
    "kind": "paragraph",
    "text": "Las plataformas de entrada a menudo dividen el proceso en fases. En inbound, la solicitud se recibe y puede ser autenticada, validada, limitada y transformada. En la fase de backend, la API Gateway prepara y ejecuta la llamada al upstream. En salida, procesa la respuesta, elimina datos, agrega headers, normaliza errores o almacena caché. En caso de falla, una sección de error o equivalente produce un manejo específico."
  },
  {
    "kind": "paragraph",
    "text": "Estas fases son lógicas, no universales. Un producto puede representar todo como un árbol de filtros, otro como secciones declarativas y otro como filtros HTTP conectados al oyente. El arquitecto debe relacionar el concepto con el producto sin asumir una equivalencia perfecta. El punto decisivo es saber dónde está el mensaje, si ya se ha llamado al backend y qué contexto sigue disponible."
  },
  {
    "kind": "paragraph",
    "text": "Una policy puede provocar un cortocircuito y producir una respuesta inmediata. Una validación de token no válida puede devolver 401; un límite de tasa excedido puede devolver 429; un hit de caché puede devolver 200 sin acceder al backend. Por lo tanto, \"la API Gateway recibió la llamada\" no significa que se llamó al backend. Los registros de cada fase deben hacer visible esta decisión."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/es/figure-01-policy-phases.svg",
    "alt": "Fases de entrada, backend, salida y en caso de error del proceso de policys",
    "caption": "Figura 1 - El ducto tiene fases, pero cualquiera puede terminar o desviar el flujo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.3 Orden, contexto y cortocircuito",
    "id": "22-3-orden-contexto-y-cortocircuito"
  },
  {
    "kind": "paragraph",
    "text": "El orden de ejecución es parte de la semántica. Correlacionar la solicitud antes de cualquier rechazo garantiza que las respuestas 401 y 429 también tengan ID de solicitud. Autenticar antes de autorizar proporciona identidad a la policy de decisión. Validar el tamaño de la carga útil antes del análisis evita desperdiciar CPU en mensajes abusivos. Aplicar la transformación antes de la validación puede ser correcto cuando la API Gateway normaliza un formato heredado, pero peligroso cuando oculta entradas no válidas."
  },
  {
    "kind": "paragraph",
    "text": "Las policys intercambian información a través de un contexto de ejecución. Este contexto puede contener método, URL, headers, certificado, identidad, variables, respuesta parcial, error actual y métricas. Las variables deben tener nombres predecibles, un tipo conocido y un scope documentado. La reutilización de nombres genéricos como token, usuario o resultado en diferentes fragmentos aumenta las colisiones y dificulta la retroubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "El cortocircuito es útil para rechazar anticipadamente y guardar el backend. Sin embargo, la respuesta debe preservar la observabilidad, CORS cuando corresponda, los headers de seguridad y el formato de error. De lo contrario, las llamadas rechazadas por la API Gateway se comportan de manera diferente a las respuestas producidas por el backend, confundiendo a los consumidores y a los monitores."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/es/figure-02-policy-order.svg",
    "alt": "Correlación, autenticación, autorización, límites, transformación y orden de enrutamiento.",
    "caption": "Figura 2: La secuencia debe reflejar las dependencias y los objetivos de protección."
  },
  {
    "kind": "subhead",
    "text": "Pregunta de revisión"
  },
  {
    "kind": "paragraph",
    "text": "Si se intercambian dos policys, ¿cambia el comportamiento? Si la respuesta es sí, esta dependencia debe documentarse y cubrirse mediante pruebas. Si el equipo no sabe cómo responder, es que aún no se comprende suficientemente el proceso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.4 Scopes, herencia y precedencia",
    "id": "22-4-scopes-herencia-y-precedencia"
  },
  {
    "kind": "paragraph",
    "text": "Las policys se pueden aplicar en diferentes scopes: global, espacio de trabajo, producto, API, versión, operación o instancia específica. Los scopes amplios reducen la duplicación y garantizan controles mínimos, mientras que los scopes estrechos permiten un comportamiento especializado. El riesgo aparece cuando la herencia y la precedencia no están claras. Una API puede imaginar que ha reemplazado una policy global cuando, en realidad, acaba de agregar un paso más."
  },
  {
    "kind": "paragraph",
    "text": "La herencia debe utilizarse para las invariantes empresariales: correlación, headers mínimos, protección secreta, registros esenciales y controles obligatorios. Las reglas de negocio, el enrutamiento específico y la transformación de la carga útil suelen pertenecer a scopes más cercanos a la API. Mientras más lógica de negocios se coloque globalmente, mayor será el radio de impacto de un cambio."
  },
  {
    "kind": "paragraph",
    "text": "Los fragmentos y las plantillas deben recibir parámetros explícitos y evitar dependencias ocultas de variables globales. Un cambio en un fragmento reutilizado puede afectar a cientos de API. Por lo tanto, las referencias deben ser versionadas, probadas por los consumidores y publicadas gradualmente."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - El scope correcto equilibra consistencia y autonomía.",
    "headers": [
      "Alcance",
      "Uso adecuado",
      "Riesgo"
    ],
    "rows": [
      [
        "Mundial",
        "Controles corporativos invariantes.",
        "Cambie con un gran radio de explosión."
      ],
      [
        "Producto/espacio de trabajo",
        "Políticas comunes a un dominio o canal.",
        "Acoplamiento entre diferentes API."
      ],
      [
        "API",
        "Contrato y seguridad de esa interfaz.",
        "Duplicación si no hay fragmentos."
      ],
      [
        "Operación",
        "Excepciones específicas y semántica fina.",
        "Configuración fragmentada y difícil de auditar."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.5 Políticas de autenticación e identidad",
    "id": "22-5-politicas-de-autenticacion-e-identidad"
  },
  {
    "kind": "paragraph",
    "text": "Las policys de autenticación verifican la credencial presentada y establecen una identidad confiable. Esto puede implicar clave API, autenticación básica, certificado de cliente, access token opaco, JWT o credenciales personalizadas. El resultado no debería ser simplemente booleano. El canal debe producir un contexto normalizado: sujeto, cliente, issuer, audience, scopes, método de autenticación y nivel de garantía."
  },
  {
    "kind": "paragraph",
    "text": "En la validación JWT, la póliza debe verificar la firma, el algoritmo permitido, el issuer, la audience, el vencimiento y los claims requeridos. Simplemente decodificar el token no autentica a nadie. Para tokens opacos, la policy puede consultar la introspección, con cache controlado y tiempo de espera breve. Para mTLS, la identidad no debe derivarse únicamente del CN sin reglas de confianza, SAN y cadena de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Las credenciales no deben registrarse. Cuando la API Gateway propaga la identidad al backend a través de headers, debe eliminar los headers equivalentes enviados por el consumidor y escribir valores confiables. El backend debe aceptar estos headers solo desde una red autenticada o una identidad de API Gateway; de lo contrario, el consumidor puede falsificar el contexto."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo: establecimiento y propagación de identidad"
  },
  {
    "kind": "paragraph",
    "text": "# Flujo de autenticación conceptual remove_header_unreliable(\"X-Authenticated-Subject\") credencial = extraer_credential(solicitud) identidad = validar(credencial) si identidad.invalida: devolver 401 contexto.subject = identidad.subject contexto.client_id = identidad.client_id add_header_backend(\"X-Authenticated-Subject\", contexto.subject)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.6 Autorización y decisiones externas",
    "id": "22-6-autorizacion-y-decisiones-externas"
  },
  {
    "kind": "paragraph",
    "text": "La autorización responde a si la identidad puede realizar la acción sobre el recurso en ese contexto. Las policys simples verifican scopes, roles o claims. Los casos avanzados consultan un punto de decisión de policy, enviando atributos del sujeto, recurso, acción y entorno. La policy de API Gateway actúa como una PEP: recopila datos, solicita una decisión, aplica permitir o denegar y registra pruebas."
  },
  {
    "kind": "paragraph",
    "text": "Una llamada de autorización externa necesita un contrato estable, autenticación mutua, tiempo de espera, disyuntor y decisión de apertura o cierre fallido. Para operaciones sensibles, el cierre fallido es la regla segura: si el PDP no responde, se deniega el acceso. Para la telemetría no crítica, una policy puede fallar de forma degradada. Esta elección debe ser explícita y estar aprobada por el riesgo, no decidida accidentalmente por el comportamiento predeterminado de la herramienta."
  },
  {
    "kind": "paragraph",
    "text": "Las decisiones se pueden almacenar en caché cuando los atributos y la validez lo permitan. La clave de caché debe incluir todos los elementos que influyen en la decisión. El cache solo por usuario, ignorando el recurso, la acción o el tenant, crea una autorización incorrecta. La invalidación también debe considerar el cambio de rol, la revocación y la rescisión del contrato."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La autorización debe equilibrar expresividad, latencia y disponibilidad.",
    "headers": [
      "Estrategia",
      "ventaja",
      "Precaución técnica"
    ],
    "rows": [
      [
        "Ámbitos/roles locales",
        "Baja latencia y simplicidad.",
        "Puede ser insuficiente para un contexto dinámico."
      ],
      [
        "PDP externo",
        "Centraliza decisiones complejas.",
        "Disponibilidad, tiempo de espera y caché."
      ],
      [
        "Política híbrida",
        "Prefiltro local y decisión externa.",
        "Consistencia entre dos capas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.7 Validación de mensajes y contratos",
    "id": "22-7-validacion-de-mensajes-y-contratos"
  },
  {
    "kind": "paragraph",
    "text": "Método de verificación de policys de validación, tipo de contenido, tamaño, esquema, campos obligatorios, parámetros y restricciones. La validación temprana protege el backend y hace que los errores sean consistentes. OpenAPI puede proporcionar parte del contrato, pero no todas las reglas comerciales deben transferirse a la API Gateway. Las validaciones complejas, que dependen del estado del dominio, pertenecen al servicio responsable."
  },
  {
    "kind": "paragraph",
    "text": "La validación de JSON o XML requiere análisis y puede consumir memoria. La API Gateway debe imponer un límite de tamaño antes de cargar el cuerpo. En transmisiones, cargas y descargas de gran tamaño, el almacenamiento en búfer completo puede destruir el rendimiento. Las policys que necesitan leer el cuerpo deben documentar si preservan la transmisión para pasos posteriores."
  },
  {
    "kind": "paragraph",
    "text": "La validación en modo de detección o de solo registro puede ayudar con la migración, pero no debería convertirse en un estado permanente. Si la organización recopila infracciones sin bloquearlas, necesita tiempo y criterio para activar la aplicación de la ley. De lo contrario, el contrato declarado y el tráfico real siguen divergiendo."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - La pasarela protege el contrato; el backend preserva la verdad del dominio.",
    "headers": [
      "capa",
      "Ejemplos",
      "Ubicación preferida"
    ],
    "rows": [
      [
        "Sintaxis",
        "JSON bien formado, XML válido.",
        "API Gateway."
      ],
      [
        "Contrato",
        "Esquema, tipos, requeridos, tamaño.",
        "Pruebas de gateway y backend."
      ],
      [
        "Semántica simple",
        "Rangos, enumeraciones, formatos.",
        "API Gateway o backend según la propiedad."
      ],
      [
        "regla de dominio",
        "Equilibrio, elegibilidad, transición estatal.",
        "Backend del dominio."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.8 Limitación de tasas, cuotas y estrangulamiento",
    "id": "22-8-limitacion-de-tasas-cuotas-y-estrangulamiento"
  },
  {
    "kind": "paragraph",
    "text": "La limitación de velocidad restringe la cantidad de eventos en una ventana; la cuota controla el consumo acumulado durante un período más largo; La limitación regula la velocidad o la concurrencia para proteger la capacidad. Aunque los términos varían entre productos, la policy debe definir unidad, clave, algoritmo, ventana, respuesta y scope distribuido."
  },
  {
    "kind": "paragraph",
    "text": "La posición en el oleoducto cambia el objetivo. Limitar por IP antes de la autenticación reduce los ataques volumétricos. El límite por client_id después de la autenticación se aplica al plan o contrato comercial. La limitación por operación protege los costosos endpoints. Muchas plataformas combinan capas, pero cada contador aumenta el costo y la dependencia del estado compartido."
  },
  {
    "kind": "paragraph",
    "text": "En API Gateways distribuidas, los contadores locales pueden permitir que el total agregado supere el límite. Los contadores globales requieren un servicio compartido e introducen latencia. La arquitectura debe declarar si el límite es aproximado o estricto. La respuesta 429 debe incluir orientación como Reintentar después cuando sea posible y no revelar detalles internos innecesarios."
  },
  {
    "kind": "subhead",
    "text": "Profundización adicional"
  },
  {
    "kind": "paragraph",
    "text": "El capítulo 27 estará dedicado a la limitación de tasas, cuotas y estrangulamiento. Aquí, la atención se centra en comprender cómo estas policys participan en la canalización e interactúan con la identidad, el estado distribuido y el manejo de errores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.9 Transformación de headers, URL y carga útil",
    "id": "22-9-transformacion-de-headers-url-y-carga-util"
  },
  {
    "kind": "paragraph",
    "text": "Las policys de transformación adaptan a los consumidores y los backends: agregue o elimine headers, reescriba rutas, convierta parámetros de consulta, cambie el tipo de contenido o transforme JSON y XML. Son útiles para modernizar legados y mantener contratos estables, pero pueden crear un acoplamiento invisible. El backend ahora depende de un mensaje que ningún consumidor envía directamente."
  },
  {
    "kind": "paragraph",
    "text": "Los headers de seguridad e identidad requieren reglas especiales. La API Gateway debe eliminar los valores que no sean de confianza antes de insertar los suyos propios. Los headers salto a salto no deben propagarse como headers de un extremo a otro. El host y el SNI deben manejarse conscientemente, ya que una reescritura incorrecta puede llegar al host virtual equivocado o provocar una falla en el certificado."
  },
  {
    "kind": "paragraph",
    "text": "Las transformaciones de carga útil cuestan CPU y memoria y pueden cambiar la firma, el hash o la clave de idempotencia. Si un mensaje está firmado por el consumidor, cualquier cambio invalida la firma, a menos que el modelo prevea una nueva firma por parte de la pasarela. Las transformaciones deben ser pequeñas, probadas y observables; Una lógica empresarial extensa en la puerta de entrada se convierte en un monolito de integración difícil de evolucionar."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de policys declarativas"
  },
  {
    "kind": "paragraph",
    "text": "<entrante> <set-header name=\"X-Correlation-ID\" existe-action=\"skip\"> <valor>@(Guid.NewGuid().ToString())</value> </set-header> <rewrite-uri template=\"/clientes/{id}\" /> <set-backend-service base-url=\"https://backend.interno\" /> </inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.10 Selección de enrutamiento y backend",
    "id": "22-10-seleccion-de-enrutamiento-y-backend"
  },
  {
    "kind": "paragraph",
    "text": "Las policys de enrutamiento eligen la implementación de backend, versión, región, clúster, tenant o canary. La decisión puede utilizar ruta, encabezado, reclamo, peso, estado, latencia o configuración externa. El enrutamiento es diferente de la autorización: un consumidor puede ser autorizado y aun así ser enviado al servidor equivocado si las reglas de precedencia son ambiguas."
  },
  {
    "kind": "paragraph",
    "text": "Canario y azul-verde requieren afinidad cuando la experiencia debe permanecer consistente en todas las llamadas. La API Gateway debe registrar qué variante se eligió y propagar el identificador para su seguimiento. El respaldo entre regiones debe considerar la residencia, la coherencia y la idempotencia de los datos. Enviar automáticamente una escritura a otra región después del tiempo de espera puede duplicar transacciones."
  },
  {
    "kind": "paragraph",
    "text": "El descubrimiento de backend puede depender del DNS, el registro de servicios o la configuración estática. Las policys no deben realizar una resolución personalizada para cada solicitud sin cache ni límites. El plano de control debe distribuir los destinos de forma segura, mientras que el plano de datos continúa procesando el tráfico incluso durante la indisponibilidad temporal del plano de gestión."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: El enrutamiento debe poder explicarse en registros y seguimientos.",
    "headers": [
      "decisión",
      "señal de entrada",
      "Se necesita evidencia"
    ],
    "rows": [
      [
        "Versión",
        "Ruta, encabezado o consulta.",
        "Versión solicitada y ruta aplicada."
      ],
      [
        "canario",
        "Peso, cookie o client_id.",
        "Variante seleccionada y motivo."
      ],
      [
        "Región",
        "Localidad, salud y policy.",
        "Región elegida y respaldo."
      ],
      [
        "tenant",
        "Reclamar o acoger.",
        "Backend validado y aislado por tenants."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.11 Caché y coherencia",
    "id": "22-11-cache-y-coherencia"
  },
  {
    "kind": "paragraph",
    "text": "Las policys de caché pueden reducir la latencia y la carga de backend, pero requieren comprender la semántica HTTP y el contrato de datos. La clave debe incluir el método, el URI normalizado y todas las variaciones relevantes, como tenant, idioma, aceptación y autorización. Almacenar en caché la respuesta privada sin separar a los consumidores puede provocar fugas graves."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway debe respetar las reglas de Cache-Control, variación y invalidación cuando corresponda. En las API autenticadas, la caché a menudo debe ser privada por consumidor o limitarse a datos verdaderamente públicos. Un acierto de caché también debería generar registros y métricas; de lo contrario, el backend se verá saludable porque recibe menos tráfico, mientras que los consumidores pueden recibir contenido obsoleto."
  },
  {
    "kind": "paragraph",
    "text": "El caché no soluciona universalmente la lentitud del backend. Cambia la consistencia y el comportamiento en caso de falla. El estado obsoleto durante la revalidación y el respaldo con datos antiguos pueden ser válidos para el catálogo, pero inapropiados para el equilibrio o la autorización. La policy debe reflejar la criticidad del ámbito."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.12 Resiliencia y llamados externos",
    "id": "22-12-resiliencia-y-llamados-externos"
  },
  {
    "kind": "paragraph",
    "text": "El tiempo de espera limita el tiempo que espera la API Gateway. Reintentar repite una operación bajo condiciones específicas. El disyuntor detiene las llamadas cuando la dependencia tiene fallas persistentes. El respaldo produce una respuesta alternativa o utiliza otra fuente. Estos mecanismos deben diseñarse en conjunto con el presupuesto de latencia total y la idempotencia del método."
  },
  {
    "kind": "paragraph",
    "text": "Reintentar GET puede ser seguro en muchos casos, pero no automáticamente. Un GET mal diseñado puede provocar efectos secundarios. El reintento en POST puede duplicar transacciones sin idempotencia de claves ni deduplicación de backend. También es necesario evitar la multiplicación entre capas: cliente, gateway, mesh y backend pueden repetirse simultáneamente y convertir un pequeño fallo en una tormenta."
  },
  {
    "kind": "paragraph",
    "text": "Los llamados auxiliares realizados por las policys (introspección, PPD, bóveda, antifraude) necesitan tiempos de espera más breves que el presupuesto principal. La API Gateway debe distinguir el error de la API empresarial del error de dependencia de la policy. Sin esta distinción, la indisponibilidad del servicio de autorización aparece como un 500 genérico y dificulta la respuesta operativa."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/es/figure-03-resilience.svg",
    "alt": "Coordinación entre tiempo de espera, reintento, disyuntor y respaldo",
    "caption": "Figura 3 - La resiliencia requiere coordinación entre mecanismos y capas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.13 Manejo de errores y respuestas estandarizadas",
    "id": "22-13-manejo-de-errores-y-respuestas-estandarizadas"
  },
  {
    "kind": "paragraph",
    "text": "Las policys de error convierten las fallas internas en respuestas estables de los consumidores. Deben conservar el estado correcto, un código de error empresarial o de plataforma, un mensaje seguro, un ID de correlación y documentación. El tratamiento no puede transformar ningún fallo en 200 ni ocultar la diferencia entre autenticación, autorización, limitación, tiempo de espera e indisponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Una respuesta estandarizada debe evitar detalles confidenciales como el seguimiento de la pila, el nombre del clúster, la ruta del archivo, SQL, el endpoint interno o el contenido del token. Al mismo tiempo, los registros internos deben mantener la causa, la policy, el tiempo y la dependencia involucrada. El consumidor recibe una visión segura; la operación recibe pruebas suficientes."
  },
  {
    "kind": "paragraph",
    "text": "Los errores producidos antes del backend deben aplicar headers comunes, incluido CORS cuando sea necesario. De lo contrario, el navegador puede ocultar el error real debido a una falla de CORS. También es importante evitar que la policy de errores falle al intentar leer variables que no fueron creadas, generando una segunda excepción que enmascare la primera."
  },
  {
    "kind": "code",
    "text": "Ejemplo de respuesta de error estandarizada\n{\n  \"type\": \"https://api.empresa.example/errors/rate-limit\",\n  \"title\": \"Límite de solicitudes excedido\",\n  \"status\": 429,\n  \"detail\": \"Inténtelo de nuevo después del período indicado.\",\n  \"correlationId\": \"8f4d9c2a-...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.14 Observabilidad y auditoría a nivel de policys",
    "id": "22-14-observabilidad-y-auditoria-a-nivel-de-policys"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad de la API Gateway debe responder qué policys ejecutaron, cuánto tiempo tardaron y qué decisión tomaron. Un registro de acceso con estado y duración total es necesario, pero insuficiente. La policía remota debe medir la latencia y los resultados. El límite de tarifa debe registrar una clave y un contador anonimizados. El enrutamiento debe registrar el backend seleccionado. La autenticación debe registrar el método y el motivo del error sin exponer las credenciales."
  },
  {
    "kind": "paragraph",
    "text": "El seguimiento distribuido debe crear o preservar el contexto de seguimiento y generar intervalos para llamadas de backend y dependencias de policys. Una policy de transformación puede agregar atributos útiles, pero es necesario controlar la cardinalidad. client_id, API, operación, versión y resultado son dimensiones útiles; La carga útil completa y los identificadores personales no deben convertirse en etiquetas de métricas."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría difiere del registro operativo. Registra cambios administrativos y decisiones sensibles con integridad, retención y acceso controlado. Quién cambió una policy global, quién la aprobó, qué versión se implementó y qué API se vieron afectadas son información esencial para la investigación y el cumplimiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Registros, métricas, seguimientos y auditoría responden a diferentes preguntas.",
    "headers": [
      "evidencia",
      "Ejemplo",
      "Uso"
    ],
    "rows": [
      [
        "Registro de acceso",
        "API, funcionamiento, estado, duración.",
        "Diagnóstico de tráfico."
      ],
      [
        "Métrica",
        "Fallos debidos a policys, latencia externa.",
        "Alertas y aforo."
      ],
      [
        "traza",
        "Gateway, PDP y tramos de backend.",
        "Análisis de extremo a extremo."
      ],
      [
        "Auditoría",
        "Autor, versión, aprobación y despliegue.",
        "Gobernanza y cumplimiento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.15 Reutilización, fragmentos y gobernanza",
    "id": "22-15-reutilizacion-fragmentos-y-gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "La reutilización reduce la duplicación, pero debe controlarse como una biblioteca. Los fragmentos deben tener contrato, versión, propietario, ejemplos, pruebas y registro de cambios. Un fragmento de validación JWT, por ejemplo, debe declarar issuers, audiences, algoritmos, variables producidas y formato de error. Sin esto, cada API se vuelve dependiente de un comportamiento implícito."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza debe separar las policys obligatorias, recomendadas y opcionales. Los requisitos obligatorios pueden aplicarse globalmente o comprobarse en proceso. Se recomiendan plantillas adaptables. Las opciones cubren casos específicos. Las excepciones requieren justificación y plazo; de lo contrario, la plataforma acumula configuraciones permanentes que nadie comprende."
  },
  {
    "kind": "paragraph",
    "text": "La segregación de funciones impide que una sola persona cambie la autenticación, publique y apruebe su propio cambio en la producción. El repositorio Git, las solicitudes de extracción, la validación automática, los entornos y la promoción controlada transforman la policy en infraestructura como código. El portal o el editor visual pueden seguir existiendo, pero los cambios manuales deben conciliarse con la fuente de la verdad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.16 Pruebas, CI/CD y retroubleshooting",
    "id": "22-16-pruebas-ci-cd-y-retroubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de policys deben cubrir ruta feliz, credencial faltante, token no válido, permiso insuficiente, límite excedido, backend no disponible, tiempo de espera externo y respuesta con formato incorrecto. Las pruebas unitarias o simuladas validan expresiones y fragmentos; las pruebas de integración ejecutan la API Gateway real; las pruebas de carga revelan el costo del análisis, las llamadas remotas y el estado distribuido."
  },
  {
    "kind": "paragraph",
    "text": "La canalización de CI/CD puede validar la sintaxis, el esquema, las referencias, los secretos, las policys prohibidas, el orden mínimo y la presencia de observabilidad. Luego, impleméntelo en un entorno de prueba, ejecute casos automatizados y promueva un artefacto inmutable. Canary en la propia API Gateway reduce el riesgo, pero necesita una reversión rápida y métricas comparables."
  },
  {
    "kind": "paragraph",
    "text": "Al solucionar problemas, primero identifique si la llamada llegó al oyente y qué API/operación se seleccionó. Luego, revise el proceso: ID de correlación, autenticación, autorización, límite de velocidad, transformación, ruta, llamada de backend, saliente y en caso de error. Evite comenzar con el backend cuando la API Gateway respondió sin reenviar la solicitud."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El diagnóstico debe ubicar la decisión exacta dentro del proceso.",
    "headers": [
      "Síntoma",
      "Hipótesis policys",
      "evidencia"
    ],
    "rows": [
      [
        "401 inesperado",
        "Emisor, audience, visualización, encabezado eliminado.",
        "El seguimiento de autenticación sin token está claro."
      ],
      [
        "403 intermitente",
        "Caché de decisiones, tenant o atributo dinámico.",
        "ID de decisión de PDP y clave de caché."
      ],
      [
        "429 en unos pocos pedidos",
        "Clave o contador global incorrecto.",
        "Identificador de límites y scope."
      ],
      [
        "502/504",
        "Ruta, tiempo de espera, reintento o backend.",
        "Backend elegido y tiempos por intento."
      ],
      [
        "Carga útil vacía",
        "Cuerpo consumido por la transformación.",
        "Registros de policys y tamaño antes/después."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudios de caso",
    "id": "estudios-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: token válido, autorización incorrecta: la API Gateway valida la firma y el vencimiento de JWT, pero no verifica la audience. Se acepta un token emitido a otra API. La corrección no consiste simplemente en añadir una condición; es revisar el fragmento corporativo, agregar pruebas negativas, identificar las API afectadas y promover nueva versión de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Tormenta de reintentos: el cliente, la API Gateway y la malla de servicios repiten la misma llamada. Durante la degradación del backend, cada solicitud original genera múltiples intentos, lo que agota las conexiones. El rediseño define un único propietario de reintento, un presupuesto total, condiciones por método y un disyuntor en función del error y la latencia."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: encabezado de identidad falsificado: el backend confía en X-User-ID, pero la API Gateway conserva el valor enviado por el cliente cuando no hay ningún token. El atacante inyecta el cabezazo. La solución siempre elimina el encabezado externo, produce un nuevo valor solo después de la autenticación y restringe el backend a conexiones mTLS provenientes de la API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Las policys son el programa ejecutado por el plano de datos. Observan, deciden, transforman, llaman dependencias y pueden cerrar el flujo. El comportamiento final depende del orden, el contexto, los scopes, la herencia y el manejo de fallas."
  },
  {
    "kind": "paragraph",
    "text": "Un pipeline robusto autentica y autoriza con criterios explícitos, valida mensajes sin asumir reglas de dominio, controla el tráfico con claves correctas, transforma solo lo necesario, enruta de forma explicable y aplica cacheing y resiliencia según la semántica de la operación."
  },
  {
    "kind": "paragraph",
    "text": "Las policys deben tratarse como código: fuente versionada, revisión, pruebas, CI/CD, observabilidad, auditoría, reversión y propiedad. El editor visual es sólo una forma de creación; No elimina dependencias ni efectos secundarios."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting eficiente avanza a través del proceso con identificación de correlación y evidencia por paso. La pregunta central ya no es \"¿falló la API Gateway?\" y se convierte en “¿qué policy tomó qué decisión, con qué insumos y en cuánto tiempo?”."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 23 profundizará en la arquitectura y funcionamiento de Axway API Gateway, relacionando conceptos de este capítulo con Policy Studio, filtros, circuitos, grupos, instancias, cachés, configuración y funcionamiento de la plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de revisión de policys",
    "id": "lista-de-verificacion-de-revision-de-policys"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada policy tiene un objetivo, propietario, entrada, salida y comportamiento de falla documentados.",
      "El orden de la canalización refleja las dependencias y está cubierto por pruebas.",
      "El consumidor no puede falsificar headers ni variables de identidad.",
      "Los tokens, secretos y datos personales se eliminan de los registros.",
      "Las llamadas externas tienen tiempo de espera, autenticación, métricas y decisión de falla de apertura/cierre de falla.",
      "Límites de uso de clave, scope y contador consistentes con el objetivo.",
      "Las transformaciones preservan el contrato, la transmisión, la firma y la idempotencia.",
      "Los reintentos tienen un presupuesto, una condición y un propietario únicos.",
      "Los errores mantienen el estado correcto, el formato seguro y la identificación de correlación.",
      "Los fragmentos están versionados, probados y tienen un radio de explosión conocido.",
      "Los cambios pasan por Git, revisión, validación, promoción y reversión.",
      "Los registros, métricas, seguimientos y auditorías le permiten reconstruir decisiones."
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
      "Diseñe una canalización para API protegida por JWT y explique el orden de las policys.",
      "Compare la aplicación del límite de tasa antes y después de la autenticación.",
      "Explique por qué una policy de lectura corporal puede afectar pasos posteriores.",
      "Proponer tratamiento ante la indisponibilidad de un PDP externo.",
      "Describir los riesgos de reintento en una operación POST.",
      "Establezca una clave de caché segura para la API multitenant autenticada.",
      "Explique cómo evitar headers de identidad falsificados.",
      "Proponer scopes globales, API y de operación para diferentes policys.",
      "Cree una matriz de prueba para token vencido, audience incorrecta y scope faltante.",
      "Describir un script de troubleshooting para el error 502 producido en la API Gateway."
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
        "Sección de fondo",
        "Fase que prepara o ejecuta la llamada al upstream."
      ],
      [
        "disyuntor",
        "Mecanismo que interrumpe las llamadas cuando una dependencia se degrada."
      ],
      [
        "Contexto",
        "Estado disponible durante la ejecución del pipeline."
      ],
      [
        "cerrado por falla",
        "Denegar la operación cuando falla el motor de decisión."
      ],
      [
        "Apertura fallida",
        "Permitir o degradar la operación cuando falla un control."
      ],
      [
        "Fragmento",
        "Fragmento de configuración de policys reutilizable."
      ],
      [
        "entrante",
        "Fase de tramitación de la solicitud recibida."
      ],
      [
        "En error",
        "Flujo ejecutado cuando ocurre una falla en la tubería."
      ],
      [
        "saliente",
        "Fase de procesamiento de respuesta."
      ],
      [
        "PDP",
        "Componente que calcula la decisión de autorización."
      ],
      [
        "PEPE",
        "Punto al que se aplica una decisión de autorización."
      ],
      [
        "Expresión de policy",
        "Expresión evaluada en runtime para producir una condición o valor."
      ],
      [
        "Cortocircuito",
        "Terminación anticipada del flujo con respuesta propia."
      ],
      [
        "Arresto de pico",
        "Control de ráfagas para suavizar los picos de tráfico."
      ],
      [
        "estrangulamiento",
        "Regulación de la celeridad o concurrencia de solicitudes."
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
      "IETF. RFC 9209: campo de encabezado de respuesta HTTP de estado de proxy.",
      "Microsoft aprende. Políticas en Azure API Management.",
      "Microsoft aprende. Referencias de policys y expresiones de policys de Azure API Management.",
      "Microsoft aprende. Validar contenido, elegir, reintentar, buscar en caché y establecer referencias de variables.",
      "Portal de documentación de Axway. API Gateway, Policy Studio y filtros de policys.",
      "Documentación de proxy del enviado. Filtros HTTP, autorización externa y limitación de velocidad.",
      "OWASP. API Security Top 10 - Edición 2023.",
      "OpenTelemetría. Contexto de seguimiento y convenciones semánticas para HTTP."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "La sintaxis, la disponibilidad y el scope de las policys varían según el producto, la edición y la versión. Antes de aplicar ejemplos, valide la documentación oficial de la plataforma implementada y ejecute pruebas en un entorno autorizado."
  }
];
