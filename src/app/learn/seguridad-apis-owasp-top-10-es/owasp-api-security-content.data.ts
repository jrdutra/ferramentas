import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const OWASP_API_SECURITY_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "OWASP API Security Top 10: riesgos relacionados con el ciclo completo de API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/es/overview.svg",
    "alt": "Seguridad de API de OWASP Los 10 riesgos principales relacionados con el ciclo de vida de API",
    "caption": "Figura de apertura: Los diez riesgos representan clases de fallas que abarcan el diseño, la implementación, la API Gateway y la operación."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway reduce la exposición, pero la autorización y la lógica segura deben existir en todas las capas."
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
    "text": "El capítulo anterior detalló Azure API Management y mostró cómo las API Gateways aplican políticas, límites, autenticación, enrutamiento y observabilidad. Este capítulo amplía la visión: la seguridad de la API no es una funcionalidad exclusiva de la API Gateway. La API puede estar perfectamente protegida por TLS y aun así permitir que un usuario autenticado lea objetos de otro cliente, modifique campos prohibidos o realice una operación administrativa incorrecta."
  },
  {
    "kind": "paragraph",
    "text": "El OWASP API Security Top 10 organiza los riesgos más relevantes para las API en un lenguaje práctico. La edición 2023 destaca fallas de autorización en objetos sensibles, autenticación, propiedades, funciones y flujos; consumo irrestricto de recursos; SSRF; configuraciones inseguras; inventario inadecuado; y dependencia excesiva de API de terceros. Estas categorías ayudan a los equipos de productos, arquitectura, desarrollo, seguridad y operaciones a desarrollar un vocabulario común."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo no es transformar el Top 10 en una lista de control superficial. Cada riesgo representa una familia de causas, condiciones de operación e impactos. Para comprenderlos es necesario relacionar identidad, autorización, esquemas, límites operativos, comportamiento empresarial, topología de red, dependencias externas y ciclo de vida. El capítulo también diferencia los controles preventivos, de detección y de respuesta, mostrando el papel específico de API Gateways, WAF, backends y procesos de gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "Los ejemplos utilizan escenarios corporativos y bancarios sin exponer entornos reales. El lector debería poder reconocer patrones vulnerables, formular hipótesis de ataque, proponer controles en múltiples capas y transformar los hallazgos en requisitos de ingeniería verificables."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada categoría, separe cuatro dimensiones: activo protegido, condición vulnerable, acción del atacante y control verificable. Luego, identifique qué parte pertenece a la API Gateway, cuál pertenece al backend y cuál depende de la gobernanza o del proceso."
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
      "Explique el propósito y las limitaciones de OWASP API Security Top 10.",
      "Identifique las diferencias entre autorización de objeto, propiedad y rol.",
      "Reconozca fallas de autenticación y administre tokens, sesiones y credenciales.",
      "Diseñar límites contra el consumo irrestricto de recursos y el abuso de los flujos de negocios.",
      "Comprenda SSRF, configuraciones inseguras, inventario inadecuado y consumo inseguro de API.",
      "Relacione cada riesgo con controles en código, API Gateway, WAF, red, identidad y observabilidad.",
      "Aplique modelos de amenazas, pruebas de seguridad y evidencia de CI/CD al ciclo de vida.",
      "Construir estrategias de hardening, seguimiento, respuesta y mejora continua."
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
      "25.1 Los 10 principales modelos de seguridad y uso responsable",
      "25.2 API1: Autorización a nivel de objeto roto",
      "25.3 API2: autenticación rota",
      "25.4 API3: Autorización de nivel de propiedad de objeto roto",
      "25.5 API4: Consumo de recursos sin restricciones",
      "25.6 API5: Autorización de nivel de función rota",
      "25.7 API6: Acceso sin restricciones a flujos comerciales confidenciales",
      "25.8 API7: falsificación de solicitudes del lado del servidor",
      "25.9 API8: Configuración incorrecta de seguridad",
      "25.10 API9: Gestión de inventario inadecuada",
      "25.11 API10: Consumo inseguro de API",
      "25.12 Controles de API Gateway y defensa en profundidad",
      "25.13 Pruebas, observabilidad y respuesta",
      "25.14 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.1 Los 10 principales modelos de seguridad y uso responsable",
    "id": "25-1-los-10-principales-modelos-de-seguridad-y-uso-responsable"
  },
  {
    "kind": "paragraph",
    "text": "El Top 10 es un documento de concientización y priorización, no una especificación de seguridad completa. Una API puede ser vulnerable a riesgos que no aparecen en la lista, y la ausencia de hallazgos en el Top 10 no demuestra seguridad. El uso correcto combina modelado de amenazas, requisitos de protección, arquitectura, pruebas, revisión de código, gestión de dependencias, telemetría y respuesta a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "Las API exponen operaciones que el software puede consumir directamente. Esto aumenta la automatización de los atacantes, la velocidad de enumeración y la capacidad de encadenar fallas. Los identificadores en rutas, consultas y cargas útiles se pueden cambiar a gran escala; los esquemas permiten explorar propiedades imprevistas; y se puede abusar de las transmisiones legítimas sin cargas útiles con formato incorrecto. Por lo tanto, la seguridad de la API requiere observar la intención y el contexto, no solo la sintaxis."
  },
  {
    "kind": "paragraph",
    "text": "La defensa en profundidad distribuye responsabilidades. WAF reduce el tráfico malicioso conocido; la pasarela valida tokens, cuotas y contratos; el backend aplica autorización vinculada al dominio; el banco limita el acceso; y la observabilidad detecta patrones anómalos."
  },
  {
    "kind": "paragraph",
    "text": "Ninguna de estas capas reemplaza a las demás. El tráfico interno puede eludir un control perimetral, mientras que un fallo empresarial puede parecer perfectamente válido para un filtro genérico."
  },
  {
    "kind": "subhead",
    "text": "Defensa en profundidad para API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/es/figure-01-defense-in-depth.svg",
    "alt": "Consumidor, WAF, API Gateway, backend y datos como capas de defensa en profundidad",
    "caption": "Figura 1: API Security es un sistema de controles complementarios, no un producto aislado."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Cada capa protege un conjunto diferente de decisiones.",
    "headers": [
      "capa",
      "Control de características",
      "Limitación"
    ],
    "rows": [
      [
        "WAF/borde",
        "Reputación, firmas, protección volumétrica.",
        "Poco contexto de dominio y propiedad."
      ],
      [
        "API Gateway",
        "Token, esquema, cuotas, enrutamiento y auditoría.",
        "No conoces todas las reglas del negocio."
      ],
      [
        "backend",
        "Autorización fina, invariantes y validaciones.",
        "Puede depender de la identidad y el contexto correctos."
      ],
      [
        "Datos/terceros",
        "Mínimo privilegio y restricción de salida.",
        "No reemplaza los controles de la aplicación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.2 API1: Autorización a nivel de objeto roto - BOLA",
    "id": "25-2-api1-autorizacion-a-nivel-de-objeto-roto-bola"
  },
  {
    "kind": "paragraph",
    "text": "La autorización a nivel de objeto roto ocurre cuando una operación recibe un identificador de objeto y no verifica si el sujeto autenticado tiene permiso sobre ese objeto específico. El atacante no necesita romper la autenticación: usa su propia cuenta, cambia una identificación e intenta acceder a una cuenta, contrato, documento, pedido o recurso que pertenece a otra persona u organización."
  },
  {
    "kind": "paragraph",
    "text": "El error común es interpretar la autenticación como autorización. Saber quién realizó la llamada no responde si esa persona puede leer o modificar el objeto solicitado. Los UUID y los identificadores aleatorios reducen la previsibilidad, pero no son control de acceso. Las identificaciones pueden aparecer en registros, enlaces, respuestas, dispositivos o integraciones, y la autorización debe aplicarse independientemente de lo difícil que sea adivinar."
  },
  {
    "kind": "paragraph",
    "text": "La defensa más fuerte es vincular la búsqueda al contexto autorizado. En lugar de cargar un objeto solo por ID y verificarlo más tarde, el repositorio puede buscar por ID, tenant y sujeto autorizado, devolviendo ausencia cuando la relación no existe. Las políticas centralizadas ayudan, pero es necesario darles atributos suficientes. Las pruebas deben variar el usuario, el tenant, la función, el objeto y el método HTTP para encontrar inconsistencias."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/es/figure-02-bola.svg",
    "alt": "Usuario autenticado que intenta acceder a un objeto que pertenece a otro cliente",
    "caption": "Figura 2: La verificación debe relacionar el objeto con el sujeto y el tenant, no solo validar el token."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de autorización por objeto"
  },
  {
    "kind": "code",
    "text": "// Patrón vulnerable\ncuenta = repositorio.buscarPorId(idDeSolicitud)\nreturn cuenta\n// Patrón defensivo\ncuenta = repositorio.buscarPorIdYTitular(idDeSolicitud, subjectDelToken)\nif cuenta == null: denegarAcceso()"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.3 API2: autenticación rota",
    "id": "25-3-api2-autenticacion-rota"
  },
  {
    "kind": "paragraph",
    "text": "La autenticación rota reúne fallas que le permiten asumir o mantener la identidad de otro usuario, aplicación o carga de trabajo. Los ejemplos incluyen credenciales débiles, endpoints de inicio de sesión sin protección de automatización, tokens predecibles, validaciones o claims de firmas incompletas, recuperación de contraseñas inseguras, sesiones que no caducan y refresh tokens reutilizables sin detección."
  },
  {
    "kind": "paragraph",
    "text": "En las API modernas, la autenticación suele implicar más de un sistema: cliente, authorization server, API Gateway y backend. La validación debe confirmar el algoritmo, la firma, el issuer, la audience, la caducidad, el token type y el contexto de uso. Aceptar un ID token donde se espera un access token, ignorar a la audience o confiar en claves obtenidas de una fuente no validada son fallas de diseño, no solo fallas de implementación."
  },
  {
    "kind": "paragraph",
    "text": "Los controles incluyen MFA para operaciones adecuadas, PKCE, rotación de refresh tokens, protección de credential stuffing, limitación de intentos, revocación, detección de anomalías, almacenamiento secreto seguro y proof-of-possession cuando el riesgo lo justifica. Los mensajes de error deben impedir la enumeración de cuentas y los flujos de recuperación deben tener una seguridad equivalente al inicio de sesión principal."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - La autenticación segura depende del protocolo y de su funcionamiento completo.",
    "headers": [
      "fracaso",
      "Impacto",
      "controlar"
    ],
    "rows": [
      [
        "Emisor o audience no validados",
        "Se acepta token de otro contexto.",
        "Estricta validación y configuración por entorno."
      ],
      [
        "Actualizar token sin rotación",
        "El robo mantiene el acceso prolongado.",
        "Detección de rotación y reutilización."
      ],
      [
        "Iniciar sesión sin protección",
        "Relleno y adquisición de credenciales.",
        "Limitación de tarifas, MFA y detección de riesgos."
      ],
      [
        "Secreto en código o registro",
        "Compromiso del cliente.",
        "Salto, rotación y enmascaramiento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.4 API3: Autorización de nivel de propiedad de objeto roto",
    "id": "25-4-api3-autorizacion-de-nivel-de-propiedad-de-objeto-roto"
  },
  {
    "kind": "paragraph",
    "text": "Esta categoría reúne fallas de autorización a nivel de las propiedades de un objeto. Al leer, la API puede devolver campos que el usuario no debería ver. Por escrito, puede aceptar propiedades que el consumidor no debe controlar. La edición de 2023 combina problemas históricamente descritos como exposición excesiva de datos y asignación masiva."
  },
  {
    "kind": "paragraph",
    "text": "Un ejemplo de lectura insegura es devolver el objeto de entidad completo y esperar que el front-end oculte el CPF, el límite interno, las señales de fraude o los datos administrativos. El consumidor controla la solicitud y puede observar la respuesta en bruto. Por escrito, vincular automáticamente el JSON recibido a una entidad permite que aquellos que no tienen autorización cambien campos como rol, estado, ID de propietario o aprobado."
  },
  {
    "kind": "paragraph",
    "text": "La solución utiliza modelos de entrada y salida específicos, listas de campos permitidos, autorización de propiedad, serialización contextual y validación de esquemas. GraphQL requiere atención especial porque pueden existir campos confidenciales en el esquema y requerir su propia autorización. En la API Gateway, la validación y la transformación ayudan, pero el backend debe controlar la verdad del dominio."
  },
  {
    "kind": "subhead",
    "text": "Carga útil que requiere una lista permitida de propiedades editables"
  },
  {
    "kind": "code",
    "text": "{\n  \"nombre\": \"Cliente de Ejemplo\",\n  \"email\": \"cliente@example.com\",\n  \"role\": \"admin\",\n  \"limiteAprobado\": 1000000\n}"
  },
  {
    "kind": "subhead",
    "text": "regla general"
  },
  {
    "kind": "paragraph",
    "text": "Nunca exponga ni acepte automáticamente todas las propiedades de una entidad persistente. Los contratos de API deben ser proyecciones explícitas, basadas en casos de uso y niveles de autorización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.5 API4: Consumo de recursos sin restricciones",
    "id": "25-5-api4-consumo-de-recursos-sin-restricciones"
  },
  {
    "kind": "paragraph",
    "text": "Las API consumen CPU, memoria, subprocesos, conexiones, almacenamiento, ancho de banda y servicios que se cobran por uso. Cuando no hay límites coherentes, un atacante puede provocar indisponibilidad o costos excesivos al enviar muchas solicitudes, grandes cargas útiles, consultas complejas, cargas, exportaciones u operaciones que activan costosas acciones de terceros."
  },
  {
    "kind": "paragraph",
    "text": "La limitación de tarifas por solicitud es solo una parte. Es necesario controlar el tamaño del cuerpo y la respuesta, la profundidad de GraphQL, la duración, la concurrencia, la paginación, la cantidad de elementos, la compresión, la cantidad de conexiones WebSocket y el costo acumulado por operación. Una llamada de informe puede costar miles de veces más que una sola lectura, por lo que los límites uniformes pueden proteger mal el sistema."
  },
  {
    "kind": "paragraph",
    "text": "El diseño debe combinar cuotas por identidad e tenant, tiempos de espera, mamparos, contrapresión, colas, límites de conexión y disyuntores. Las métricas deben distinguir el rechazo protector del error interno. En la nube, las alertas de costos y los presupuestos también integran protección, ya que el abuso puede aparecer primero en la factura antes de causar una indisponibilidad visible."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - El consumo debe medirse por el costo real de la operación.",
    "headers": [
      "Característica",
      "Posible abuso",
      "control técnico"
    ],
    "rows": [
      [
        "procesador/memoria",
        "Consulta compleja, expresión regular costosa, bomba de descompresión.",
        "Complejidad, tamaño y tiempo de espera."
      ],
      [
        "Conexiones",
        "Enchufes persistentes o piscina agotada.",
        "Límite de concurrencia y tiempo de espera de inactividad."
      ],
      [
        "Almacenamiento",
        "Cargas y registros excesivos.",
        "Cuota, retención y tamaño máximo."
      ],
      [
        "Servicio pago",
        "SMS, mapas, IA o antifraude.",
        "Presupuesto, tarifa por flujo y aprobación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.6 API5: Autorización de nivel de función rota",
    "id": "25-6-api5-autorizacion-de-nivel-de-funcion-rota"
  },
  {
    "kind": "paragraph",
    "text": "La autorización de nivel de función rota ocurre cuando un usuario logra invocar una función que debería estar restringida a otro rol, grupo o contexto. La diferencia para BOLA es el enfoque: BOLA pregunta si el usuario puede acceder a ese objeto; BFLA pregunta si puede realizar esa función, independientemente del objeto."
  },
  {
    "kind": "paragraph",
    "text": "Los endpoints administrativos ocultos, los cambios de métodos HTTP y las rutas predecibles son vectores comunes. Un usuario puede intercambiar GET por DELETE, llamar a /admin, reutilizar una operación observada en el portal o invocar directamente una función que la interfaz visual no muestra. Ocultar el botón o el endpoint no es autorización."
  },
  {
    "kind": "paragraph",
    "text": "Los controles incluyen denegación predeterminada, matriz de permisos por rol, pruebas negativas, separación de superficies administrativas y validación consistente en todos los métodos. La API Gateway puede aplicar scopes y roles, pero las decisiones de dominio pueden depender del estado, la autoridad, el valor de la transacción o la segregación de funciones, lo que requiere una evaluación en el backend o PDP."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Los tres niveles de autorización deben probarse por separado.",
    "headers": [
      "Objeto de la decisión",
      "Pregunta",
      "Ejemplo"
    ],
    "rows": [
      [
        "Objeto - BOLA",
        "¿Puede este tipo acceder a esta cuenta?",
        "OBTENER /cuentas/123"
      ],
      [
        "Función - BFLA",
        "¿Este tipo puede cerrar cuentas?",
        "ENVIAR /cuentas/123/cerrar"
      ],
      [
        "Propiedad - BOPLA",
        "¿Este tema puede cambiar este campo?",
        "Rol o límite de PATCH"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.7 API6: Acceso sin restricciones a flujos comerciales confidenciales",
    "id": "25-7-api6-acceso-sin-restricciones-a-flujos-comerciales-confidenciales"
  },
  {
    "kind": "paragraph",
    "text": "Algunas transmisiones son técnicamente legítimas pero valiosas para el abuso automatizado. Los bots pueden explotar a escala la compra de boletos, la creación de cuentas, la solicitud de crédito, el canje de beneficios, el envío de códigos, las reservas y los comentarios, incluso si cada solicitud tiene un esquema válido y un usuario autenticado."
  },
  {
    "kind": "paragraph",
    "text": "El problema requiere modelar la intención y la economía del flujo. Un límite genérico por IP puede fallar cuando el atacante distribuye solicitudes. La protección puede requerir un fuerte vínculo de identidad, límites por persona y dispositivo, detección de comportamiento, colas, pasos adelante, prueba de humanidad, reglas antifraude y restricciones específicas por paso."
  },
  {
    "kind": "paragraph",
    "text": "No existe un control universal. El equipo necesita identificar flujos sensibles durante el modelado de amenazas, estimar cómo generan valor para el atacante y definir signos de abuso. Los registros comerciales, las tasas de conversión, los intentos por entidad y los patrones temporales son más útiles que las métricas HTTP técnicas."
  },
  {
    "kind": "subhead",
    "text": "Diferencia esencial"
  },
  {
    "kind": "paragraph",
    "text": "El abuso del flujo de negocios puede utilizar solicitudes perfectamente válidas. La validación de esquemas y WAF rara vez es suficiente; El control necesita comprender el propósito de la operación y la identidad económica del actor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.8 API7: Falsificación de solicitudes del lado del servidor - SSRF",
    "id": "25-8-api7-falsificacion-de-solicitudes-del-lado-del-servidor-ssrf"
  },
  {
    "kind": "paragraph",
    "text": "SSRF ocurre cuando la API recupera un recurso remoto utilizando una URL o un destino influenciado por el usuario sin las restricciones adecuadas. El servidor tiene una conectividad e identidad diferentes a las del cliente y puede acceder a metadata de la nube, paneles internos, servicios administrativos, loopback o redes privadas inaccesibles directamente para el atacante."
  },
  {
    "kind": "paragraph",
    "text": "Los casos comunes incluyen importación de URL, webhooks, validación de imágenes, conversión de documentos y devoluciones de llamadas. Validar el esquema https por sí solo no lo resolverá: los nombres DNS pueden resolverse en direcciones privadas, las redirecciones pueden cambiar el destino y las representaciones de IP alternativas pueden eludir filtros ingenuos. La nueva vinculación de DNS y las diferencias entre validación y conexión aumentan el riesgo."
  },
  {
    "kind": "paragraph",
    "text": "La defensa preferida es incluir en la lista de destinos y rutas de salida específicos. Cuando se necesiten URL arbitrarias, utilice resolución controlada, bloqueo de rangos privados y especiales, revalidación después de redireccionamientos, protección de cambios de DNS, proxy de salida e identidad mínima. La respuesta remota debe ser limitada en tamaño, tipo y tiempo."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual del intento de la SSRF"
  },
  {
    "kind": "code",
    "text": "POST /importar-documento\n{\n  \"url\": \"http://169.254.169.254/metadata/...\"\n}\n# La entrada parece una URL, pero el destino alcanzado por el servidor\n# puede exponer servicios internos o credenciales de infraestructura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.9 API8: Configuración incorrecta de seguridad",
    "id": "25-9-api8-configuracion-incorrecta-de-seguridad"
  },
  {
    "kind": "paragraph",
    "text": "La configuración incorrecta de seguridad cubre configuraciones inseguras en cualquier capa: CORS permisivo, TLS débil, endpoints de depuración, mensajes detallados, credenciales predeterminadas, headers faltantes, servicios innecesarios, permisos excesivos, depósitos públicos, administración expuesta y políticas inconsistentes en todos los entornos."
  },
  {
    "kind": "paragraph",
    "text": "Las API se componen de muchos componentes y el riesgo surge de las interacciones. Una API Gateway puede validar JWT correctamente, pero confiar en un encabezado de identidad enviado por el cliente. Un backend se puede proteger en el borde y exponer directamente desde otra dirección. Puede existir una política segura en producción, pero no en el espacio de trabajo u operación específica debido a una herencia incorrecta."
  },
  {
    "kind": "paragraph",
    "text": "La solución depende de líneas base versionadas, infraestructura como código, revisión de cambios, escáneres de configuración, separación de entornos, gestión de secretos y pruebas posteriores a la implementación. Los errores deben estandarizarse sin rastros de pila ni detalles internos. Los recursos administrativos necesitan su propia red e identidad."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Se debe verificar la configuración efectiva, no solo el archivo deseado.",
    "headers": [
      "Área",
      "Ejemplo de mala configuración",
      "evidencia"
    ],
    "rows": [
      [
        "TLS",
        "Versión o cifrado inapropiado.",
        "Configuración de protocolo de enlace y escucha."
      ],
      [
        "CORS",
        "Origen reflejado con credenciales.",
        "Headers de políticas y de verificación previa."
      ],
      [
        "API Gateway",
        "Cabecera interna confiada sin remoción.",
        "Seguimiento y configuración efectiva."
      ],
      [
        "backend",
        "Endpoint directo público.",
        "DNS, escaneo autorizado y firewall."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.10 API9: Gestión de inventario inadecuada",
    "id": "25-10-api9-gestion-de-inventario-inadecuada"
  },
  {
    "kind": "paragraph",
    "text": "El inventario inadecuado ocurre cuando la organización no sabe qué API, versiones, hosts, entornos, operaciones y dependencias están activos. Las API ocultas, las versiones antiguas, los endpoints de prueba y la documentación divergente mantienen las superficies vulnerables fuera del proceso de gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "El inventario debe incluir el propietario, la clasificación de los datos, los consumidores, la versión, el entorno, el nombre de host, el backend, la autenticación, la fecha de depreciación y la telemetría. El descubrimiento de tráfico puede complementar el catálogo, ya que la documentación no prueba que solo sean accesibles los endpoints conocidos. El DNS, el ingreso, las API Gateways, los repositorios y la observabilidad deben estar correlacionados."
  },
  {
    "kind": "paragraph",
    "text": "Las versiones retiradas deben retirarse en toda la cadena. Mantener la versión 1 sin soporte por temor a arruinar a los consumidores acumula riesgos. Una política de ciclo de vida con desaprobación, extinción, comunicación, evidencia de uso y apagado controlado reduce las superficies huérfanas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/es/figure-03-api-lifecycle.svg",
    "alt": "Seguridad que acompaña al diseño, construcción, implementación, ejecución y retirada en el ciclo API",
    "caption": "Figura 3: La seguridad acompaña a la API desde su diseño hasta su retiro, con el inventario como eje de gobernanza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.11 API10: Consumo inseguro de API",
    "id": "25-11-api10-consumo-inseguro-de-api"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación puede aplicar una validación estricta a clientes externos y depender excesivamente de las API de socios, proveedores o servicios internos. El consumo inseguro de API ocurre cuando los datos y comportamientos provenientes de estas dependencias se tratan como seguros, lo que permite la inyección, SSRF indirecta, corrupción de datos, indisponibilidad o compromiso de la cadena."
  },
  {
    "kind": "paragraph",
    "text": "La comunicación autenticada y cifrada solo prueba el canal y la identidad del par; no garantiza que la respuesta sea correcta o sin grants. Las respuestas de terceros necesitan esquema, límites de tamaño, tiempo de espera, validación semántica, manejo seguro de redirecciones y codificación. Las bibliotecas de clientes, los certificados, el DNS y la configuración de proxy también integran la superficie."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas resilientes utilizan salida controlada, listas permitidas, disyuntores, aislamiento, contratos, observabilidad de dependencia y least privilege. Los secretos enviados al socio deben ser específicos y rotativos. Los datos devueltos nunca deben concatenarse en SQL, comandos, plantillas o URL sin el tratamiento adecuado."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Las dependencias deben tratarse como límites de confianza.",
    "headers": [
      "dependencia",
      "Riesgo",
      "controlar"
    ],
    "rows": [
      [
        "API de socio",
        "Respuesta maliciosa o inesperada.",
        "Esquema, validación y aislamiento."
      ],
      [
        "Webhook recibido",
        "Origen y replay falsificados.",
        "Firma, marca de tiempo e idempotencia."
      ],
      [
        "SDK/biblioteca",
        "Comportamiento o cadena comprometidos.",
        "SBOM, fijación y actualización controlada."
      ],
      [
        "Servicio interno",
        "Confianza implícita lateral.",
        "mTLS, política de autorización y salida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.12 Controles de API Gateway y defensa en profundidad",
    "id": "25-12-controles-de-api-gateway-y-defensa-en-profundidad"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es una capa privilegiada para aplicar controles uniformes: autenticación, validación de tokens, esquema, límite de carga útil, cuotas, limitación de velocidad, eliminación de headers, enrutamiento, mTLS, observabilidad y bloqueo de versiones. También proporciona un punto de contención para la respuesta a incidentes. Sin embargo, no debería transformarse en el único mecanismo de autorización de dominio."
  },
  {
    "kind": "paragraph",
    "text": "BOLA, autorización por propiedad y flujos confidenciales generalmente requieren datos que solo el backend conoce. La API Gateway puede validar scopes y claims, pero la propiedad, la autoridad, el estado del objeto y la segregación de roles deben evaluarse en el servicio o en un PDP con suficiente contexto. La política debe negar por defecto y propagar la identidad de forma no falsificable."
  },
  {
    "kind": "paragraph",
    "text": "Los controles también deben preservar los diagnósticos. Los rechazos deben registrar la regla, la identidad, la operación, el tenant y la correlación sin exponer secretos. Las métricas para 401, 403, 429, violaciones de esquema y bloqueos WAF ayudan a detectar ataques, pero deben contextualizarse para diferenciar el abuso del error de integración."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: La API Gateway es importante, pero no reemplaza la seguridad de las aplicaciones.",
    "headers": [
      "Riesgo",
      "API Gateway contribuye",
      "El backend/proceso debe garantizar"
    ],
    "rows": [
      [
        "API1 / API3 / API5",
        "Identidad, scopes y contrato.",
        "Titularidad, rol y propiedades autorizadas."
      ],
      [
        "API4/API6",
        "Límites, cuotas y telemetría.",
        "Costo real y reglas de negocio."
      ],
      [
        "API7",
        "Política de salida y política de URL cuando sea compatible.",
        "Validación y aislamiento de objetivos."
      ],
      [
        "API8/API9",
        "Línea base y publicación controlada.",
        "Inventario, ciclo de vida y configuración completa."
      ],
      [
        "API10",
        "mTLS, lista de permitidos y tiempo de espera.",
        "Validación de respuesta y confianza mínima."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.13 Pruebas, observabilidad y respuesta",
    "id": "25-13-pruebas-observabilidad-y-respuesta"
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas de seguridad deben explorar el contexto, no sólo las cargas útiles. Para la autorización, utilice matrices con usuarios, roles, tenants, objetos, propiedades, estados y métodos. Para la autenticación, pruebe los tokens caducados, el issuer incorrecto, la audience diferente, los algoritmos y la revocación. Para los umbrales, mida el comportamiento en condiciones de concurrencia, grandes cargas útiles y operaciones costosas en un entorno autorizado."
  },
  {
    "kind": "paragraph",
    "text": "La automatización de CI/CD puede realizar linting OpenAPI, SAST, SCA, pruebas de contratos, escáneres DAST y políticas de infraestructura. Aún así, los hallazgos automáticos necesitan validación. Las herramientas identifican patrones, pero difícilmente comprenden todos los flujos sensibles y las relaciones de propiedad. Las revisiones manuales y el modelado de amenazas siguen siendo necesarios."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe capturar señales técnicas y comerciales: identidad, tenant, operación, objeto lógico, estado, latencia, tamaño, costo, rechazo, backend y correlación. Las alertas deben buscar anomalías como enumeración de ID, picos 403, creación acelerada de cuentas o llamadas a destinos inusuales. El plan de respuesta debe permitirle revocar credenciales, bloquear rutas, reducir límites y preservar pruebas."
  },
  {
    "kind": "subhead",
    "text": "Pruebas responsables"
  },
  {
    "kind": "paragraph",
    "text": "Las pruebas ofensivas solo deben realizarse en entornos y scopes explícitamente autorizados. Utilice datos sintéticos, límites controlados y un plan de reversión para evitar impactos en los usuarios y los sistemas de producción."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.14 Estudios de casos y laboratorios",
    "id": "25-14-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: BOLA en Open Finance: un endpoint consulta el consentimiento por identificador. El token es válido, pero el servicio no verifica que el consentimiento pertenezca al cliente y participante correcto. La corrección incluye consultas por ID de consentimiento, tema y organización, además de pruebas cruzadas y registros de decisiones."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Abuso de flujo: un endpoint de simulación de crédito llama a servicios pagos y permite un gran volumen de cuentas recién creadas. La limitación de tarifas por IP no va en contra de la distribución. La defensa combina límite por persona, dispositivo, tenant, coste por operación, detección de comportamiento y colas."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: API de socio: un servicio de documentos acepta URL externa y sigue redirecciones. Un dominio permitido redirige a una dirección privada. La solución utiliza proxy de salida, resolución y validación de IP final, bloqueo de redes especiales, límite de redireccionamiento y respuesta máxima."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Construir una matriz de autorización para objeto, rol y propiedad. 2) Modelo de límites de costos para tres operaciones. 3) Revisar una especificación OpenAPI para campos confidenciales y endpoints huérfanos. 4) Diseñar una arquitectura de salida segura para SSRF. 5) Cree alertas de enumeración, abuso y aumento de rebotes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "El OWASP API Security Top 10 2023 organiza los riesgos que aparecen de forma recurrente en las API. Las primeras categorías resaltan que la autenticación y la autorización deben operar en diferentes niveles: objeto, propiedad, función y flujo de negocios. Otros riesgos tienen que ver con el consumo de recursos, SSRF, configuración, inventario y dependencias externas."
  },
  {
    "kind": "paragraph",
    "text": "La protección eficaz combina controles en el borde, la API Gateway, el backend, los datos y los procesos. El portal estandariza las políticas y reduce la exposición, pero no es el único que conoce la propiedad, el estatus y la intención comercial. El desarrollo seguro, el modelado de amenazas, el inventario y la observabilidad son esenciales."
  },
  {
    "kind": "paragraph",
    "text": "El Top 10 debería guiar las preguntas y prioridades, no servir como un certificado de seguridad. Una plataforma madura transforma cada riesgo en requisitos, pruebas, métricas, evidencia y planes de respuesta, manteniendo la protección durante todo el ciclo de vida de la API."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en CORS, CSP, HSTS y otros headers HTTP, mostrando cómo las políticas de transporte y navegador complementan la seguridad de las API y las aplicaciones web."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de seguridad API",
    "id": "lista-de-verificacion-de-seguridad-api"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada operación que recibe una identificación verifica la propiedad, el tenant y el contexto de autorización.",
      "La entrada y la salida utilizan modelos explícitos y listas de propiedades permitidas.",
      "Los tokens se validan por firma, issuer, audience, hora y tipo.",
      "Las funciones administrativas tienen denegar por defecto y pruebas negativas.",
      "Las operaciones tienen límites de tamaño, tiempo, simultaneidad, costo y paginación.",
      "Los flujos sensibles tienen protección contra la automatización y el abuso económico.",
      "Las llamadas salientes utilizan listas permitidas, salida controlada y bloqueo de red especial.",
      "La configuración efectiva se versiona, revisa y prueba después de la implementación.",
      "El inventario contiene propietario, versión, entorno, datos, consumidores y fecha de retiro.",
      "Las respuestas de terceros se validan y se tratan como no confiables.",
      "Los registros y seguimientos preservan la correlación sin registrar credenciales ni datos confidenciales.",
      "Existe un proceso de revocación, bloqueo, reducción de límites y respuesta a incidencias."
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
      "Diferenciar BOLA, BFLA y autorización por propiedad con ejemplos.",
      "Explique por qué UUID no es control de autorización.",
      "Enumere las validaciones necesarias para un access token JWT.",
      "Límites de diseño para una operación de exportación de informes.",
      "Describir cómo los bots pueden abusar de un flujo técnicamente válido.",
      "Proponer controles contra SSRF en una funcionalidad de importación de URL.",
      "Identifique los riesgos de confiar en un encabezado de identidad del cliente.",
      "Cree un inventario mínimo para las API empresariales.",
      "Describir cómo validar las respuestas de una API de socio.",
      "Cree una estrategia de telemetría para detectar la enumeración de objetos."
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
        "BOLA",
        "Autorización a nivel de objeto roto; falla de autorización en un objeto específico."
      ],
      [
        "BFLA",
        "Autorización de nivel de función rota; acceso indebido a una función u operación."
      ],
      [
        "BOPLA",
        "Autorización a nivel de propiedad de objeto roto; exposición indebida o alteración de propiedades."
      ],
      [
        "Relleno de credenciales",
        "Uso automatizado de credenciales filtradas en otros servicios."
      ],
      [
        "Denegar por defecto",
        "Principio de denegar el acceso cuando no existe un permiso explícito."
      ],
      [
        "control de salida",
        "Control de destinos a los que puede acceder una aplicación."
      ],
      [
        "asignación masiva",
        "Vinculación automática de campos de entrada a propiedades internas."
      ],
      [
        "Propiedad",
        "Relación que determina quién puede acceder o modificar un objeto."
      ],
      [
        "Limitación de velocidad",
        "Restricción de frecuencia de llamadas en una ventana."
      ],
      [
        "Flujo de negocios sensible",
        "Flujo legítimo que produce valor y del que se puede abusar a escala."
      ],
      [
        "API sombra",
        "API activa fuera del inventario o gobierno oficial."
      ],
      [
        "SSRF",
        "Falsificación de solicitudes del lado del servidor; inducir al servidor a acceder a destinos inapropiados."
      ],
      [
        "Modelado de amenazas",
        "Análisis estructurado de activos, amenazas, superficies y controles."
      ],
      [
        "Consumo inseguro",
        "Dependencia excesiva de los datos y el comportamiento de las API dependientes."
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
      "Proyecto de seguridad API OWASP. Top 10 de seguridad de API de OWASP - 2023.",
      "OWASP. API1:2023: autorización a nivel de objeto roto.",
      "OWASP. API2:2023: autenticación rota.",
      "OWASP. API3:2023: Autorización a nivel de propiedad de objeto roto.",
      "OWASP. API4:2023 - Consumo de recursos sin restricciones.",
      "OWASP. API5:2023 - Autorización de nivel de función rota.",
      "OWASP. API6:2023: acceso sin restricciones a flujos comerciales confidenciales.",
      "OWASP. API7:2023: falsificación de solicitudes del lado del servidor.",
      "OWASP. API8:2023: configuración incorrecta de seguridad.",
      "OWASP. API9:2023 - Gestión inadecuada del inventario.",
      "OWASP. API10:2023 - Consumo inseguro de API.",
      "Estándar de verificación de seguridad de aplicaciones OWASP y serie de hojas de referencia.",
      "NIST. Marco de desarrollo de software seguro - SSDF.",
      "IETF. RFC 9110 - Semántica HTTP."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo utiliza la edición 2023 de OWASP API Security Top 10, publicado por el proyecto oficial. La lista debería revisarse cuando se publiquen nuevas ediciones, sin abandonar los controles derivados de riesgos que siguen siendo relevantes."
  }
];
