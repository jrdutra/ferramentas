import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const AZURE_APIM_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Desde la publicación en Azure hasta la aplicación distribuida en la API Gateway"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/es/overview.svg",
    "alt": "Plan de gestión, gateway gestionado, developer portal, gateway autohospedado y observabilidad en APIM",
    "caption": "Figura de apertura: APIM reúne el plan de gestión, las API Gateways y la experiencia del consumidor en una única plataforma."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "APIM separa las operaciones de gobernanza, publicación y tráfico, pero cada decisión de nivel y red cambia las capacidades y los límites."
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
    "text": "El capítulo anterior estudió la arquitectura de Axway API Gateway, separando diseño, dominio administrativo, instancias de ejecución, persistencia y operación. Azure API Management, conocido como APIM, resuelve un conjunto similar de problemas en un modelo de servicio administrado en Azure. Combina un plano de gestión expuesto por el portal y las API, una API Gateway responsable del tráfico, capacidades de publicación y un portal para el consumidor."
  },
  {
    "kind": "paragraph",
    "text": "La función administrada reduce las tareas de instalación y mantenimiento del producto, pero no elimina las decisiones arquitectónicas. La elección del nivel, la topología de la red, la capacidad, la región, el modelo de identidad, las políticas, los certificados, el developer portal y la estrategia de alta disponibilidad sigue siendo responsabilidad de la organización. La nube abstrae parte de la infraestructura; no reemplaza el diseño, la gobernanza y la retroubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "APIM también ha evolucionado para escenarios híbridos y federados. Además de la API Gateway administrada, la plataforma ofrece una API Gateway autohospedada para ejecutarse en contenedores fuera del servicio administrado y espacios de trabajo para descentralizar la administración de API en una infraestructura compartida. Como la disponibilidad de estos recursos varía según el nivel, la API Gateway y la región, las decisiones deben verificarse en la documentación oficial y en la matriz de recursos actual."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo construye un modelo mental completo: componentes, objetos de configuración, procesamiento de políticas, importación de contratos, seguridad, redes, escalabilidad, observabilidad, automatización y fallas recurrentes. El objetivo no es simplemente enseñar los clics en el portal, sino permitir al lector razonar sobre el comportamiento del runtime y diseñar una plataforma empresarial sostenible."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Separe siempre tres preguntas: qué pertenece al plano de gestión, qué ejecuta la API Gateway en la ruta de solicitud y qué pertenece al ecosistema del consumidor. Luego, identifique en qué nivel y tipo de API Gateway está disponible la funcionalidad."
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
      "Explicar la arquitectura lógica de Azure API Management y sus componentes principales.",
      "Distinga entre plano de administración, API Gateway administrada, API Gateway autohospedada, API Gateway del espacio de trabajo y portal de desarrollador.",
      "Comprender el modelo de API, operaciones, backends, productos, suscripciones, usuarios y grupos.",
      "Explicar apartados, scopes, herencia y orden de ejecución de las políticas.",
      "Diseño de autenticación, mTLS, certificados, identidades administradas e integración con Microsoft Entra ID.",
      "Compare conectividad pública, VNet, endpoint privado y topologías híbridas.",
      "Planificar unidades de escala, zonas de disponibilidad, multirregión y recuperación.",
      "Aplique observabilidad con Azure Monitor, Application Insights, registros y seguimiento.",
      "Automatice la configuración con ARM, Bicep, Terraform, REST, CLI y canalizaciones.",
      "Diagnosticar fallas de políticas, redes, certificados, backend, capacidad y publicación."
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
      "24.1 Posicionamiento y arquitectura lógica",
      "24.2 Plano de gestión, API Gateway y portal de desarrollador",
      "24.3 Niveles, pasarelas y criterios de selección",
      "24.4 Modelo de recursos APIM",
      "24.5 Importación y publicación de API",
      "24.6 Políticas: secciones, orden y contexto",
      "24.7 Scopes, herencia y fundamento",
      "24.8 Valores con nombre y expresiones de política",
      "24.9 Identidad, suscripciones y autorización",
      "24.10 TLS, mTLS, certificados y Key Vault",
      "Redes 24.11, VNet, Private Link y backends privados",
      "24.12 Alta disponibilidad, zonas y multirregión",
      "24.13 Backends, resiliencia, caché y límites",
      "24.14 Espacios de trabajo y gobernanza federada",
      "24.15 Portal de desarrolladores, productos e incorporación",
      "24.16 Observabilidad y retroubleshooting",
      "24.17 Automatización, CI/CD e infraestructura como código",
      "24.18 Seguridad, refuerzo y estudios de casos",
      "Resumen, lista de verificación, laboratorios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.1 Posicionamiento y arquitectura lógica",
    "id": "24-1-posicionamiento-y-arquitectura-logica"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management es una plataforma de administración de API que recibe tráfico a través de una API Gateway, aplica políticas y reenvía la llamada a un backend. Durante este runtime, la plataforma ofrece registro e importación de API, productos, suscripciones, usuarios, grupos, análisis, developer portal e interfaces administrativas. El servicio no necesariamente aloja la lógica de negocio: crea una fachada gobernada frente a backends que pueden estar en Azure, en centros de datos, en otras nubes o en servicios SaaS."
  },
  {
    "kind": "paragraph",
    "text": "La puerta de entrada es el plano de datos. Finaliza conexiones, selecciona API y operación, ejecuta políticas, llama al backend y procesa la respuesta. El plano de administración se usa para crear o cambiar la configuración a través de Azure Portal, REST, ARM, Bicep, Terraform, PowerShell o CLI. El portal para desarrolladores organiza el descubrimiento, la documentación, las pruebas y la incorporación. Esta separación permite que la configuración se administre de forma centralizada mientras el tráfico circula a través de API Gateways administradas o distribuidas."
  },
  {
    "kind": "paragraph",
    "text": "El modelo mental más importante es no confundir el recurso de Azure con el endpoint de tráfico. Una instancia APIM tiene recursos administrativos, endpoints de API Gateway y, según la configuración, portal, API de administración y otros nombres de host. DNS, certificados, firewall y monitoreo pueden ser diferentes para cada endpoint. Un error en el portal administrativo no significa automáticamente un error en la API Gateway y lo contrario también ocurre."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/es/figure-01-logical-architecture.svg",
    "alt": "Consumidores, API Gateway, backends, plano de administración y developer portal en Azure API Management",
    "caption": "Figura 1: La API Gateway se encuentra en la ruta del tráfico; El plan de gestión y el portal tienen diferentes responsabilidades."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Los componentes deben ser monitoreados y protegidos según su función.",
    "headers": [
      "Componente",
      "Responsabilidad",
      "Evidencia típica"
    ],
    "rows": [
      [
        "plan de manejo",
        "Aprovisionar y configurar el servicio.",
        "Registro de actividad, implementaciones, API administrativa."
      ],
      [
        "Managed gateway",
        "Ejecutar políticas y desviar llamadas.",
        "Registros, métricas y seguimientos de la API Gateway."
      ],
      [
        "Self-hosted gateway",
        "Ejecute el plano de datos en un contenedor fuera del servicio administrado.",
        "Registros locales y telemetría enviados a Azure."
      ],
      [
        "Workspace gateway",
        "Tiempo de ejecución asociado a un espacio de trabajo.",
        "Métricas y configuración del espacio de trabajo."
      ],
      [
        "Developer portal",
        "Documentación, productos, registro y pruebas.",
        "Publicación, contenidos e identidad del portal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.2 Plano de gestión, API Gateway y portal de desarrollador",
    "id": "24-2-plano-de-gestion-api-gateway-y-portal-de-desarrollador"
  },
  {
    "kind": "paragraph",
    "text": "El plan de gestión almacena y distribuye la configuración del servicio: API, operaciones, políticas, backends, valores con nombre, certificados, productos, suscripciones y diagnósticos. Los cambios se realizan como operaciones de administración de Azure y pueden tardar algún tiempo en llegar a todos los tiempos de ejecución. Esto significa que la implementación completa y la propagación completa no son exactamente el mismo evento. Las canalizaciones deben incluir validación posterior a la implementación y pruebas sintéticas."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway administrada es operada por Microsoft y procesa el tráfico según el nivel y la topología. Debe tratarse como un componente distribuido: las unidades de escala, regiones y zonas afectan la capacidad y la resiliencia. La API Gateway tiene un endpoint de estado que se puede utilizar para monitorear y validar la disponibilidad. Sin embargo, una verificación del estado de la plataforma no reemplaza una transacción sintética que ejercita DNS, TLS, política, identidad y backend."
  },
  {
    "kind": "paragraph",
    "text": "El portal para desarrolladores es una aplicación independiente de la propia API. Permite a los consumidores descubrir API agrupadas en productos, leer documentación, probar operaciones y solicitar suscripciones. La experiencia del portal depende de la publicación de contenido, las identidades permitidas, la configuración de CORS y la disponibilidad de la API Gateway. En entornos regulados, debe revisar cuidadosamente lo que se muestra, qué muestras contienen datos y cómo se invita o elimina a los usuarios externos."
  },
  {
    "kind": "subhead",
    "text": "Separación operativa"
  },
  {
    "kind": "paragraph",
    "text": "La falta de disponibilidad del plan de gestión puede impedir cambios sin reducir inmediatamente el tráfico existente. Un error en la API Gateway afecta a los consumidores incluso si se puede acceder al portal y a Azure Resource Manager."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.3 Niveles, pasarelas y criterios de selección",
    "id": "24-3-niveles-pasarelas-y-criterios-de-seleccion"
  },
  {
    "kind": "paragraph",
    "text": "APIM tiene familias de niveles con diferentes características de capacidad, red, escala, alta disponibilidad y recursos de gobernanza. La familia clásica incluye Developer, Basic, Standard y Premium, además del modelo de Consumo. La familia v2 moderniza las opciones Básica, Estándar y Premium. Como la disponibilidad de funciones varía y cambia con el tiempo, la arquitectura debe utilizar la matriz oficial como fuente de verdad y no suposiciones basadas únicamente en el nombre del nivel."
  },
  {
    "kind": "paragraph",
    "text": "El nivel de Desarrollador está dirigido a escenarios no productivos y no debe elegirse como base para la disponibilidad. Los niveles de producción deben seleccionarse según el rendimiento, el SLA, la conectividad privada, las zonas, las múltiples regiones, los espacios de trabajo, la API Gateway autohospedada y los requisitos de cumplimiento. Consumo utiliza un modelo sin servidor apropiado para cargas específicas, pero tiene diferencias operativas y de funcionalidad que deben evaluarse."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway autohospedada es un contenedor asociado con una instancia APIM, que se ejecuta en la infraestructura del cliente, como Kubernetes, OpenShift, local u otra nube. Mantiene la gestión central en Azure y acerca el plano de datos a los backends o consumidores. Esta arquitectura requiere conectividad saliente para la sincronización de la configuración y, cuando está habilitada, el envío de telemetría. También requiere responsabilidad local por la capacidad, actualización, seguridad y disponibilidad de los contenedores."
  },
  {
    "kind": "paragraph",
    "text": "Los espacios de trabajo le permiten delegar la administración de API y el producto a los equipos, manteniendo la infraestructura compartida. Tienen sus propios recursos y API Gateways dentro del modelo compatible. Los espacios de trabajo no son sólo carpetas: introducen límites de administración, propiedad y runtime que deben incorporarse al diseño de gobernanza."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - El tipo de gateway cambia el modelo operativo y de responsabilidad.",
    "headers": [
      "Opción",
      "Uso típico",
      "Responsabilidad crítica"
    ],
    "rows": [
      [
        "Managed gateway",
        "Exposición administrada en Azure.",
        "Elija nivel, escala, red y regiones."
      ],
      [
        "Self-hosted gateway",
        "Proximidad local, multinube y backend.",
        "Operar contenedor, capacidad y conectividad."
      ],
      [
        "Workspace gateway",
        "Tiempo de ejecución del equipo en la gobernanza federada.",
        "Definir la propiedad y los límites del espacio de trabajo."
      ],
      [
        "Consumption",
        "Modelo elástico de carga y consumo.",
        "Validar limitaciones y comportamiento de escalado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.4 Modelo de recursos APIM",
    "id": "24-4-modelo-de-recursos-apim"
  },
  {
    "kind": "paragraph",
    "text": "Una API en APIM es una fachada administrada. Tiene nombre, nombre para mostrar, ruta, protocolos, requisitos de suscripción y operaciones. Cada operación define un método y una plantilla de URL y puede tener sus propios parámetros, representaciones y políticas. El backend identifica el destino real y puede encapsular URL, credenciales, disyuntor, grupo u otras propiedades según los recursos disponibles."
  },
  {
    "kind": "paragraph",
    "text": "API de grupo de productos y define una unidad de consumo. Un producto puede requerir suscripción, tener términos y cuotas o políticas asociadas. Las suscripciones generan credenciales de acceso, normalmente una clave primaria y una clave secundaria, que facilitan la rotación. Los usuarios y grupos controlan quién accede a los productos a través del portal. Este modelo es útil para la incorporación, pero no debe confundirse con la autorización comercial fina."
  },
  {
    "kind": "paragraph",
    "text": "Los valores con nombre almacenan parámetros reutilizables en políticas. Pueden contener valores simples, valores secretos o referencias a Key Vault, según la configuración. Los certificados representan certificados utilizados en nombres de host, validación de clientes o autenticación de backend. Los registradores y diagnósticos conectan la API Gateway con los objetivos de observabilidad. El diseño debe tratar estos recursos como código y mantener la propiedad, el nombre y el ciclo de vida."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Los recursos administrativos tienen diferentes responsabilidades.",
    "headers": [
      "Objeto",
      "Función",
      "Error común"
    ],
    "rows": [
      [
        "API",
        "Operaciones grupales bajo fachada.",
        "Mezclar dominios y ciclos de vida incompatibles."
      ],
      [
        "operación",
        "Definir método y ruta lógica.",
        "Plantillas ambiguas o no gobernadas."
      ],
      [
        "backend",
        "Representar el objetivo y su configuración.",
        "URL y credenciales duplicadas en políticas."
      ],
      [
        "Producto",
        "Empaquetar API para consumo.",
        "Utilice el producto como autorización comercial."
      ],
      [
        "Suscripción",
        "Identificar el consumo y proporcionar claves.",
        "Compartir clave entre aplicaciones."
      ],
      [
        "Valor nombrado",
        "Parametrizar políticas y secretos.",
        "Escriba el secreto directamente en XML."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.5 Importación y publicación de API",
    "id": "24-5-importacion-y-publicacion-de-api"
  },
  {
    "kind": "paragraph",
    "text": "APIM puede crear o importar API de fuentes como OpenAPI, WSDL, OData, Azure Compute Services, WebSocket, GraphQL y gRPC backends, según lo admitido actualmente por el servicio y el nivel. La importación acelera el registro, pero no transforma automáticamente un contrato frágil en una API gobernada. Las rutas, los ID de operación, los esquemas, la seguridad, los servidores, los ejemplos y las descripciones deben revisarse antes de publicar."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI es la opción más común para las API HTTP. El proceso de importación crea operaciones y metadata, pero ciertas extensiones, límites y versiones de la especificación pueden tener restricciones. Para SOAP, se puede importar un WSDL como transferencia o utilizarlo en escenarios de conversión REST. GraphQL y WebSocket tienen sus propios modelos y políticas que se aplican de manera diferente. La canalización debe validar el tipo de API y probar el comportamiento real en la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Publicar una API implica más que importarla. Es necesario configurar la base de URL, backend, políticas, seguridad, producto, suscripción, documentación, versionado, revisión y observabilidad. Las revisiones le permiten probar cambios en la misma versión pública; Las versiones representan interfaces distintas para los consumidores. La promoción deberá estar automatizada y acompañada de pruebas de humo."
  },
  {
    "kind": "subhead",
    "text": "Canalización conceptual: publicación de API en APIM"
  },
  {
    "kind": "code",
    "text": "# Flujo conceptual de publicación\nContrato validado\n  -> importación o actualización de la API\n  -> configuración de backend y named values\n  -> aplicación de policies por ámbito\n  -> asociación a product\n  -> pruebas en el gateway\n  -> publicación en el developer portal\n  -> observabilidad y rollout"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.6 Políticas: secciones, orden y contexto",
    "id": "24-6-politicas-secciones-orden-y-contexto"
  },
  {
    "kind": "paragraph",
    "text": "Las políticas son documentos XML ejecutados por la API Gateway. La configuración se divide en entrante, backend, saliente y en caso de error. El entrante procesa la solicitud antes de reenviarla: autenticación, límite de velocidad, reescritura, validación y transformación son ejemplos comunes. El backend controla la interacción con el destino, incluidos el reenvío y los reintentos. La salida procesa la respuesta. On-error se ejecuta cuando ocurre una falla y le permite estandarizar el error, registrar telemetría o implementar rutas controladas."
  },
  {
    "kind": "paragraph",
    "text": "El orden de las declaraciones es semántico. Una validación JWT realizada después de una solicitud de envío confidencial no protege la llamada ya realizada. Una reescritura antes de la selección correcta de la operación puede cambiar el contexto. Una respuesta de retorno detiene la ejecución y produce una respuesta inmediata. Si ocurre una falla, los pasos restantes de las secciones normales se omiten y la ejecución pasa a error."
  },
  {
    "kind": "paragraph",
    "text": "Las expresiones de política utilizan C# limitado para evaluar el contexto, los headers, las variables y los resultados. Son poderosos y pueden introducir una lógica compleja. La API Gateway no debe convertirse en una aplicación monolítica escrita en XML. Las políticas deben seguir siendo breves, comprobables y centradas en preocupaciones transversales. La lógica empresarial extensa pertenece al backend o a un componente específico."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/es/figure-02-policy-pipeline.svg",
    "alt": "Canalización APIM entrante, backend, saliente y en caso de error",
    "caption": "Figura 2: la API Gateway ejecuta declaraciones en secuencia y cambia a estado de error cuando ocurre una falla."
  },
  {
    "kind": "code",
    "text": "Ejemplo simplificado - policy XML\n<policies>\n  <inbound>\n    <base />\n    <set-variable name=\"correlationId\"\n                  value=\"@(context.Request.Headers.GetValueOrDefault(\"x-correlation-id\", Guid.NewGuid().ToString()))\" />\n    <validate-jwt header-name=\"Authorization\" failed-validation-httpcode=\"401\">\n      <openid-config url=\"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration\" />\n    </validate-jwt>\n  </inbound>\n  <backend>\n    <base />\n    <forward-request timeout=\"30\" />\n  </backend>\n  <outbound><base /></outbound>\n  <on-error><base /></on-error>\n</policies>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.7 Scopes, herencia y fundamento",
    "id": "24-7-scopes-herencia-y-fundamento"
  },
  {
    "kind": "paragraph",
    "text": "Las políticas se pueden aplicar a scopes como global, espacio de trabajo, producto, API y operación, según el recurso y el tipo de API Gateway. La composición permite imponer controles generales y normas especializadas cercanas a la operación. El elemento base incluye políticas heredadas del ámbito superior. El lugar donde se coloca la base define cuándo se ejecuta la cadena heredada en relación con las declaraciones en el scope actual."
  },
  {
    "kind": "paragraph",
    "text": "Omitir la base puede romper la herencia y permitir que una API ya no reciba autenticación, registro o límites definidos globalmente. Por otro lado, heredar ciegamente todas las políticas puede producir duplicación, orden incorrecto o impacto inesperado. La gobernanza madura define qué controles son obligatorios y cómo se aprueban las excepciones."
  },
  {
    "kind": "paragraph",
    "text": "El scope del producto debe usarse con cuidado porque una API puede asociarse con varios productos o llamarse mediante suscripción en un scope diferente. La autorización comercial no debe depender únicamente de la presencia de un producto. Global y el espacio de trabajo ayudan a implementar la línea base, mientras que la API y la operación especializan el comportamiento. Cada política debe declarar el scope esperado y sus dependencias."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Alcance define el scope y el riesgo de un cambio de política.",
    "headers": [
      "Alcance",
      "Aplicación típica",
      "Precaución"
    ],
    "rows": [
      [
        "Mundial",
        "Línea base de seguridad y observabilidad.",
        "Amplio radio de explosión."
      ],
      [
        "Espacio de trabajo",
        "Normas comunes para un equipo federado.",
        "Coherencia con la línea de base central."
      ],
      [
        "Producto",
        "Límites y normas de consumo.",
        "Membresía y suscripción múltiple."
      ],
      [
        "API",
        "Contrato y backend de una API.",
        "No duplique la política global."
      ],
      [
        "operación",
        "Excepción o semántica específica.",
        "Evite la fragmentación excesiva."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.8 Valores con nombre y expresiones de política",
    "id": "24-8-valores-con-nombre-y-expresiones-de-politica"
  },
  {
    "kind": "paragraph",
    "text": "Los valores con nombre le permiten reemplazar literales repetidos con nombres administrados, como URL, audiences, tiempos de espera, indicadores y claves. Los valores secretos se pueden proteger y las referencias a Azure Key Vault reducen la necesidad de almacenar material confidencial en APIM. Aún así, es necesario monitorear la política de acceso a Key Vault, la identidad administrada y la conectividad. La referencia externa no elimina la dependencia operativa."
  },
  {
    "kind": "paragraph",
    "text": "Las expresiones de política acceden a contexto.Solicitud, contexto.Respuesta, contexto.Api, contexto.Operación, contexto.Suscripción y variables. Pueden procesar cadenas, fechas, JSON, certificados y claims dentro del conjunto permitido. Debido a que los errores en las expresiones ocurren en runtime, las canalizaciones deben probar rutas positivas, negativas y valores faltantes. Es preferible el uso de GetValueOrDefault cuando es posible que no exista un encabezado."
  },
  {
    "kind": "paragraph",
    "text": "Los fragmentos de políticas permiten la reutilización, pero requieren control de versiones y propiedad. Un cambio en el fragmento compartido puede afectar a muchas API. Se recomienda mantener pruebas de catálogo, unitarias o funcionales, revisión por pares y despliegue progresivo. Los valores con nombre deben tener nombres estables y no incorporar el entorno de forma confusa."
  },
  {
    "kind": "subhead",
    "text": "El secreto no es una configuración común."
  },
  {
    "kind": "paragraph",
    "text": "Nunca registre claves, tokens, contraseñas o certificados directamente en la política, el repositorio o el seguimiento. Utilice valores con nombre secreto, Key Vault, identidades administradas y enmascaramiento de registros."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.9 Identidad, suscripciones y autorización",
    "id": "24-9-identidad-suscripciones-y-autorizacion"
  },
  {
    "kind": "paragraph",
    "text": "APIM puede requerir claves de suscripción, validar JWT, autenticar clientes mediante certificado, usar Basic en integraciones heredadas y obtener tokens para backends. La clave de suscripción identifica una suscripción y habilita cuotas o análisis, pero no reemplaza una identidad de usuario sólida ni una autorización comercial. Las llaves deben estar separadas por aplicación, rotadas y protegidas contra fugas."
  },
  {
    "kind": "paragraph",
    "text": "validate-jwt y validate-azure-ad-token se utilizan para validar tokens según el issuer, la audience, la suscripción y las claims. La póliza debe verificar los elementos requeridos por el contrato, no simplemente aceptar cualquier token emitido por un tenant. Después de la validación, los claims pueden usarse para decisiones simples o enviarse a un PDP externo. Las autorizaciones complejas deben evitar listas extensas codificadas en XML."
  },
  {
    "kind": "paragraph",
    "text": "La identidad administrada permite que la API Gateway obtenga access tokens de Microsoft Entra ID para acceder a backends y recursos protegidos sin almacenar secretos del cliente. La política de authentication-managed-identity solicita y mantiene el token en caché hasta su vencimiento. Debe otorgar permisos a la identidad correcta y garantizar la conectividad con el recurso. En entornos con identidades asignadas por el usuario, el diseño debe documentar qué identidad utiliza cada backend."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Los mecanismos se pueden combinar; resuelven diferentes problemas.",
    "headers": [
      "Mecanismo",
      "¿Qué prueba?",
      "Uso adecuado"
    ],
    "rows": [
      [
        "Clave de suscripción",
        "Posesión de una clave de suscripción.",
        "Medición, onboarding y acceso básico."
      ],
      [
        "JWT/OAuth",
        "Token emitido y claims validadas.",
        "API de usuario o aplicación."
      ],
      [
        "Certificado de cliente",
        "Posesión de la clave privada asociada.",
        "Socios mTLS y B2B."
      ],
      [
        "Identidad administrada",
        "Identidad APIM Azure.",
        "Autenticación de API Gateway en el backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.10 TLS, mTLS, certificados y Key Vault",
    "id": "24-10-tls-mtls-certificados-y-key-vault"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway finaliza TLS en el nombre de host publicado. Los dominios personalizados le permiten utilizar sus propios nombres y certificados corporativos. Se recomienda Azure Key Vault para administrar certificados de nombre de host y facilitar la renovación, siempre que la identidad administrada tenga acceso y la referencia siga siendo válida. La operación necesita monitorear el vencimiento, la cadena, el nombre, la versión secreta y la actualización en APIM."
  },
  {
    "kind": "paragraph",
    "text": "mTLS se puede aplicar en la entrada para autenticar a los consumidores mediante certificado y en la salida para autenticar el APIM en el backend. Al ingresar, la API Gateway debe negociar y validar el certificado de acuerdo con la topología. Los poderes anteriores pueden cambiar la forma en que se presenta el certificado y deben considerarse. En el resultado, la política asocia o hace referencia al certificado del cliente y debe contener una clave privada utilizable."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados autofirmados o las cadenas privadas requieren una instalación y confianza explícitas. La troubleshooting debe separar el error de negociación de TLS, el error de cadena, la discrepancia de nombre de host, la caducidad y el rechazo de la política. La renovación del certificado sin pruebas puede provocar indisponibilidad cuando el nuevo material no contiene la cadena o el formato esperado."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: certificados en política"
  },
  {
    "kind": "code",
    "text": "<authentication-certificate thumbprint=\"{{backend-client-cert-thumbprint}}\" />\n<!-- Validación simplificada del certificado de cliente -->\n<choose>\n  <when condition=\"@(context.Request.Certificate == null)\">\n    <return-response>\n      <set-status code=\"401\" reason=\"Client certificate required\" />\n    </return-response>\n  </when>\n</choose>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Redes 24.11, VNet, Private Link y backends privados",
    "id": "redes-24-11-vnet-private-link-y-backends-privados"
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura de red APIM necesita distinguir el acceso entrante a la API Gateway y la conectividad saliente al backend. Un punto de conexión privado crea una entrada privada al punto de conexión de la API Gateway a través de Azure Private Link. Por sí solo, no proporciona una ruta privada desde APIM a los servidores. Para lograr servicios privados, la API Gateway necesita conectividad saliente que cumpla con los niveles, como integración o inyección de VNet, emparejamiento, DNS privado y rutas adecuadas."
  },
  {
    "kind": "paragraph",
    "text": "En los niveles clásicos que admiten VNet, el modo externo mantiene la API Gateway accesible externamente y al mismo tiempo le permite acceder a los recursos de la red; El modo interno publica endpoints en la red virtual y requiere una capa posterior o acceso privado. En los niveles v2, los modelos de integración y de endpoint privado tienen sus propias características. Como las diferencias son significativas, la elección debe validarse en la documentación de la familia de niveles adoptada."
  },
  {
    "kind": "paragraph",
    "text": "DNS es una dependencia frecuente. La API Gateway debe resolver nombres de host de backend, puntos de enlace de identidad, Key Vault y servicios de telemetría. Un endpoint privado sin la zona DNS privada correcta puede resolverse en una dirección pública. Las UDR, NSG, firewalls y la inspección TLS pueden bloquear llamadas de control o de datos. Las pruebas deberán registrar origen, destino, resolución y recorrido efectivo."
  },
  {
    "kind": "paragraph",
    "text": "En marzo de 2026, Microsoft eliminó el mecanismo de conectividad de servicios confiables de la API Gateway para ciertos servicios de Azure en el plano de datos. Las arquitecturas que dependían de esta derivación deben utilizar conectividad de red explícita. Este cambio refuerza un principio general: la conectividad implícita y las excepciones del firewall deben tratarse como dependencias versionadas y monitoreadas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/es/figure-03-private-network.svg",
    "alt": "Entrada privada a APIM y acceso privado a backends",
    "caption": "Figura 3: El ingreso privado y el acceso privado al backend son problemas de red diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - El diagnóstico de la red necesita observar el punto real de ejecución.",
    "headers": [
      "Síntoma",
      "Verificación"
    ],
    "rows": [
      [
        "Gateway responde, el backend se agota",
        "DNS backend, ruta de salida, NSG, firewall y puerto."
      ],
      [
        "Existe un endpoint privado, pero el acceso utiliza una IP pública",
        "Zona DNS privada, vínculo VNet y caché."
      ],
      [
        "Funciona en el portal, falla en la API Gateway",
        "El origen y la identidad de la red son diferentes."
      ],
      [
        "El dominio personalizado no se actualiza",
        "Acceso a Key Vault, identidad administrada y versión del certificado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.12 Alta disponibilidad, zonas y multirregión",
    "id": "24-12-alta-disponibilidad-zonas-y-multirregion"
  },
  {
    "kind": "paragraph",
    "text": "La escala en APIM se expresa en unidades, capacidad de nivel y, en algunos modelos, comportamiento elástico. Agregar unidades aumenta la capacidad y puede contribuir a la redundancia. La métrica de Capacidad debe interpretarse junto con la latencia, las solicitudes, la CPU lógica, las políticas pesadas y las dependencias de backend. Las pruebas de carga son esenciales porque el rendimiento varía según la carga útil, TLS, la política y el caché."
  },
  {
    "kind": "paragraph",
    "text": "Las zonas de disponibilidad protegen contra fallas de zona en regiones y niveles admitidos. La recomendación de redundancia debe considerar un número mínimo de unidades y distribución automática o configurada según el servicio. Las zonas no protegen contra fallas regionales, errores de configuración global o backend no disponibles. La multirregión agrega API Gateways regionales a una instancia y puede reducir la latencia y mejorar la resiliencia, pero requiere diseño de enrutamiento, certificados, backends y datos compartidos."
  },
  {
    "kind": "paragraph",
    "text": "Una implementación multirregional necesita decidir cómo el consumidor elige la región, generalmente con DNS o servicio entrante global. Las políticas y la configuración están distribuidas, pero los servidores pueden tener diferentes topologías. Los valores nombrados y las rutas regionales deben ser explícitos. Se debe probar la conmutación por error, incluida la posibilidad de que una región APIM esté en buen estado mientras el backend regional no esté disponible."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways autohospedadas añaden otra dimensión: pueden mantener el procesamiento cerca del backend incluso cuando la conectividad de baja latencia con Azure se degrada, dentro de los límites de salud y sincronización admitidos. La organización es responsable de las réplicas, las sondas, las actualizaciones y los recursos del clúster."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/es/figure-04-availability.svg",
    "alt": "Unidades de escala, zonas de disponibilidad, gateway multirregional y autohospedado",
    "caption": "Figura 4: La capacidad, la zona, la región y la API Gateway híbrida resuelven diferentes clases de fallas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.13 Backends, resiliencia, caché y límites",
    "id": "24-13-backends-resiliencia-cache-y-limites"
  },
  {
    "kind": "paragraph",
    "text": "Los backends deben definirse como recursos reutilizables cuando varias API comparten objetivos, credenciales o parámetros. Políticas como set-backend-service seleccionan el backend. Los reintentos deben utilizarse con discreción: repetir una operación no idempotente puede duplicar el efecto. El reintento APIM ejecuta políticas secundarias según la condición y el recuento; no hace que la operación sea segura automáticamente."
  },
  {
    "kind": "paragraph",
    "text": "Los tiempos de espera deben formar un presupuesto de un extremo a otro. El tiempo de espera del consumidor debe ser mayor de lo necesario para la API Gateway y el backend, pero no tan alto como para mantener los recursos indefinidamente. La llamada auxiliar mediante solicitud de envío también consume mucho tiempo. Los grupos de disyuntores y backend, cuando están disponibles en el modelo adoptado, ayudan a contener las fallas, pero requieren umbrales coherentes y observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "El cache puede reducir la latencia y la carga, pero sólo se deben almacenar las respuestas adecuadas. Los datos personalizados, los tokens, los headers confidenciales y las variaciones por usuario requieren claves y reglas correctas. El límite de velocidad controla las ráfagas o la velocidad por ventana; La cuota controla el volumen acumulado. Las políticas pueden utilizar suscripción, IP, reclamo u otra clave, pero es necesario evaluar la cardinalidad y la distribución."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway no debe compensar indefinidamente un backend de tamaño deficiente. Los reintentos, el cache y la limitación son controles de resiliencia, no sustitutos de la capacidad y la corrección. Una política agresiva puede amplificar las fallas: los reintentos sincronizados aumentan la carga, el registro de la carga útil consume recursos y las transformaciones extensas aumentan la latencia."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - La resiliencia necesita considerar la semántica y el comportamiento en caso de falla.",
    "headers": [
      "controlar",
      "Beneficio",
      "Riesgo"
    ],
    "rows": [
      [
        "Reintentar",
        "Recuperar fallas transitorias.",
        "Duplicidad y tormenta de reintentos."
      ],
      [
        "caché",
        "Reduce la latencia y la carga.",
        "Fuga o respuesta desactualizada."
      ],
      [
        "Límite de tarifa",
        "Contener la tasa en una ventana corta.",
        "Consumidores de grupos clave incorrectos."
      ],
      [
        "Cuota",
        "Controlar el consumo acumulado.",
        "Bloqueo de período inesperado."
      ],
      [
        "Tiempo de espera",
        "Limitar esperas y recursos.",
        "Cortes prematuros o conexiones atascadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.14 Espacios de trabajo y gobernanza federada",
    "id": "24-14-espacios-de-trabajo-y-gobernanza-federada"
  },
  {
    "kind": "paragraph",
    "text": "Se crearon espacios de trabajo para permitir que los equipos descentralizados administren y publiquen API en una infraestructura APIM compartida. Un espacio de trabajo contiene API, productos, suscripciones y otros recursos compatibles, con acceso administrativo independiente y API Gateway asociada. Esto permite un modelo federado: la plataforma central opera la infraestructura y la línea base; Los equipos de dominio controlan el ciclo de vida de sus API."
  },
  {
    "kind": "paragraph",
    "text": "El beneficio llega con nuevas fronteras. Las políticas globales, locales y de espacio de trabajo deben diseñarse sin elusiones. Se deben estandarizar los nombres, las etiquetas, la propiedad, los diagnósticos, los costos y los límites. No se deben otorgar permisos para todo el servicio a los equipos cuando solo se necesita un espacio de trabajo. Al mismo tiempo, la plataforma debe evitar una centralización excesiva que convierta cada cambio en una cola operativa."
  },
  {
    "kind": "paragraph",
    "text": "Los espacios de trabajo no significan un aislamiento físico completo. Según el nivel y la API Gateway, es posible que se compartan los recursos y los límites de la infraestructura. La evaluación de cumplimiento debe verificar el plano de datos, los registros, las identidades, la red y el radio de la explosión. La característica evoluciona rápidamente y es necesario revisar su matriz antes de asumir compromisos arquitectónicos."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - La federación requiere responsabilidades explícitas.",
    "headers": [
      "Responsable",
      "Funciones sugeridas"
    ],
    "rows": [
      [
        "Plataforma central",
        "Zona de aterrizaje, nivel, red, identidad, línea de base, observabilidad y barreras de seguridad."
      ],
      [
        "Equipo de dominio",
        "Contratos, backends, políticas específicas, productos y soporte funcional."
      ],
      [
        "Seguridad",
        "Estándares de tokens, certificados, registro y aprobación de excepciones."
      ],
      [
        "SRE/Operación",
        "Capacidad, incidentes, SLO, pruebas de conmutación por error y runbooks."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.15 Portal de desarrolladores, productos e incorporación",
    "id": "24-15-portal-de-desarrolladores-productos-e-incorporacion"
  },
  {
    "kind": "paragraph",
    "text": "El portal para desarrolladores transforma el catálogo técnico en una experiencia para el consumidor. Las API se presentan directamente o dentro de los productos, con documentación, ejemplos y una consola de prueba. Los consumidores pueden crear una cuenta, solicitar una suscripción y obtener claves según el flujo de trabajo configurado. En las API externas, los términos de uso, contacto, límites y procesos de soporte deben ser visibles."
  },
  {
    "kind": "paragraph",
    "text": "Los productos deben representar ofertas coherentes, no sólo agrupaciones arbitrarias. Un producto puede diferenciar entre sandbox y producción, socio e interno o niveles de servicio. Las políticas de productos pueden aplicar cuotas, pero los contratos comerciales y la autorización permanecen en los niveles apropiados. El portal debe evitar publicar endpoints internos, headers confidenciales o cargas útiles reales en ejemplos."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario versionar y probar la personalización del portal. Los cambios de identidad, dominio, CORS o contenido pueden impedir la incorporación incluso si la API Gateway está en buen estado. API Center puede complementar el descubrimiento empresarial de múltiples API Gateways, mientras que el portal para desarrolladores de APIM sigue centrado en consumir las API administradas en esa plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.16 Observabilidad y retroubleshooting",
    "id": "24-16-observabilidad-y-retroubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "APIM expone métricas y registros de recursos a través de Azure Monitor y puede integrar diagnósticos con Application Insights. Las métricas muestran volumen, latencia, capacidad y códigos de respuesta. Los registros de API Gateway le permiten investigar solicitudes, operaciones, backend, políticas y errores. Application Insights agrega correlación y análisis distribuido cuando el backend también participa en el seguimiento."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe equilibrar el detalle y la seguridad. El registro de carga útil puede capturar datos personales, tokens y secretos. Los headers deben estar en la lista permitida y enmascarados. El muestreo reduce los costos, pero puede ocultar errores poco comunes. Los ID de correlación deben propagarse al backend y devolverse al consumidor cuando corresponda. El seguimiento de políticas puede agregar eventos personalizados a los seguimientos y la telemetría según la configuración."
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico debe separar el error generado por APIM del error devuelto por el backend. Un 401 puede provenir de validate-jwt, suscripción, mTLS o servicio comercial. Un 502 puede indicar un error en la conexión DNS, TLS o backend, pero también una transformación de respuesta no válida. El contexto LastError en caso de error proporciona fuente, motivo, mensaje, scope, sección y ruta, lo que es útil para clasificar el paso fallido."
  },
  {
    "kind": "paragraph",
    "text": "Los rastreos de prueba son útiles, pero deben protegerse y no utilizarse como sustituto de la telemetría continua. Los controles de salud validan la API Gateway; las transacciones sintéticas validan el viaje. Los paneles deben separar la latencia total, el tiempo de backend y el tiempo de la política para evitar culpar al componente equivocado."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Cada fuente de telemetría responde a una capa diferente.",
    "headers": [
      "señal",
      "Pregunta respondida"
    ],
    "rows": [
      [
        "Solicitudes y estado de la API Gateway",
        "¿Qué volumen y qué respuestas recibió el consumidor?"
      ],
      [
        "Duración del backend",
        "¿Cuánto tiempo se dedicó al servicio de destino?"
      ],
      [
        "Capacidad",
        "¿Se acerca la API Gateway al límite de nivel/unidad?"
      ],
      [
        "Application Insights",
        "¿Qué dependencia, rastreo y excepción participaron?"
      ],
      [
        "Registro de actividad",
        "¿Quién cambió el recurso o la configuración administrativa?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.17 Automatización, CI/CD e infraestructura como código",
    "id": "24-17-automatizacion-ci-cd-e-infraestructura-como-codigo"
  },
  {
    "kind": "paragraph",
    "text": "La configuración manual a través del portal es útil para el aprendizaje y el diagnóstico, pero no debería ser la forma principal de promover entornos. APIM puede ser administrado por ARM, Bicep, Terraform, REST, PowerShell y CLI. Los contratos, políticas, valores con nombre, backends, productos y diagnósticos deben tener versiones. Los secretos deben ingresar a través de referencias seguras, no del repositorio."
  },
  {
    "kind": "paragraph",
    "text": "Las canalizaciones deben separar la infraestructura de la plataforma y el contenido de la API cuando la propiedad es diferente. Un equipo central puede aprovisionar instancias, redes, identidades y registros; Los equipos de dominio publican API y políticas dentro de las barreras de seguridad. XML Lint, validación de OpenAPI, diferenciación de contratos, pruebas de políticas, pruebas de humo y aprobación de cambios reducen las regresiones."
  },
  {
    "kind": "paragraph",
    "text": "Las revisiones le permiten probar un cambio sin cambiar inmediatamente la versión pública. Después de la validación, una revisión pasa a ser actual. Las versiones permiten la coexistencia de contratos incompatibles. La reversión debe considerar qué configuración puede haberse propagado y qué consumidores pueden haber observado el cambio. La copia de seguridad y la restauración, cuando corresponda al nivel y modelo, no reemplazan el código fuente ni la reconstrucción automatizada."
  },
  {
    "kind": "code",
    "text": "El drift entre el portal y el repositorio es un riesgo. Azure Policy, RBAC, locks y pipelines ayudan a reducir los cambios no rastreados. Cuando\nse realiza manualmente una corrección de emergencia, debe reconciliarse inmediatamente con el código.\nEjemplo conceptual - API Management as code\n# Estructura de repositorio sugerida\ninfra/\n  apim.bicep\n  networking.bicep\n  diagnostics.bicep\napis/\n  clientes/openapi.yaml\n  clientes/policies/\n    api-policy.xml\n    operations/\nshared/\n  policy-fragments/\n  naming-and-standards.md"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.18 Seguridad, refuerzo y estudios de casos",
    "id": "24-18-seguridad-refuerzo-y-estudios-de-casos"
  },
  {
    "kind": "paragraph",
    "text": "El hardening comienza reduciendo la exposición. El plan de gestión debe utilizar RBAC, PIM y pistas de auditoría con least privilege. Gateway sólo debe aceptar protocolos, conjuntos de cifrado y nombres de host necesarios dentro de las capacidades del servicio. El acceso a la red pública debe estar deshabilitado cuando se valida la arquitectura privada. Los dominios, certificados y DNS personalizados necesitan propiedad y renovación automatizada."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas globales deben imponer líneas de base, headers, límites y registros de autenticación, pero las excepciones deben ser explícitas. Los valores y certificados con nombre deben usar Key Vault cuando sea apropiado. Los seguimientos y registros no pueden registrar credenciales. Los portales y las API administrativas deben protegerse por separado del endpoint de la API Gateway. Dependencias como Entra ID, Key Vault, Application Insights y DNS necesitan supervisión."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: una API pública utiliza Azure Front Door con WAF delante de APIM, un punto de conexión privado en la API Gateway y backends privados. Front Door proporciona entrada global y protección L7; APIM realiza OAuth, cuotas y transformación. El diseño debe garantizar DNS privado, certificado entre capas y preservación segura de la IP original."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: una empresa mantiene backends de OpenShift localmente y utiliza una API Gateway autohospedada en el clúster. Azure mantiene la configuración y el catálogo, mientras que el tráfico sigue siendo local. La operación necesita escalar réplicas, usar mTLS, garantizar la salida 443 para la sincronización y monitorear las versiones del contenedor."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: Los equipos de pagos, crédito y registro utilizan espacios de trabajo. La plataforma central aplica líneas de base y observabilidad, mientras que cada dominio gestiona API y productos. El principal riesgo es que una política de espacio de trabajo ignore la herencia o cree un comportamiento inconsistente; Pruebas automáticas verifican bases y estándares obligatorios."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "Con Axway y Azure APIM estudiados, el siguiente capítulo profundiza en la seguridad de API según el OWASP API Security Top 10, conectando amenazas concretas a los controles de API Gateway, aplicaciones, identidad y operación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management separa el plano de administración, el plano de datos y la experiencia de consumo. La API Gateway ejecuta políticas y reenvía tráfico; el plan de gestión gestiona la configuración; El portal para desarrolladores organiza el descubrimiento y la incorporación. Las API Gateways administradas, autohospedadas y de espacio de trabajo sirven diferentes topologías y transfieren diferentes responsabilidades operativas."
  },
  {
    "kind": "paragraph",
    "text": "El modelo de recursos combina API, operaciones, backends, productos, suscripciones, valores con nombre, certificados y diagnósticos. Las políticas se ejecutan en entrada, backend, salida y en caso de error, con scopes y herencia controlados por base. El orden de las declaraciones es parte del comportamiento y necesita pruebas."
  },
  {
    "kind": "paragraph",
    "text": "La red y la disponibilidad dependen del nivel. El endpoint privado protege la entrada, mientras que la conectividad backend requiere un diseño de salida. Las unidades de escala, zonas y multiregiones resuelven diferentes clases de fallas. La identidad administrada, Key Vault, TLS y mTLS reducen los secretos, pero dependen de los permisos y la conectividad."
  },
  {
    "kind": "paragraph",
    "text": "La operación madura requiere observabilidad, automatización, control de deriva, pruebas de contrato, capacidad y runbooks. APIM se gestiona, pero la organización sigue siendo responsable de la arquitectura, las políticas, la identidad, los datos, los servidores y la experiencia del cliente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de arquitectura y operación",
    "id": "lista-de-verificacion-de-arquitectura-y-operacion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "El nivel y el tipo de API Gateway se eligieron en función de la matriz de recursos actual y el SLA requerido.",
      "La entrada a la API Gateway y la salida a los servidores tienen un diseño de red independiente y documentado.",
      "Los DNS, los certificados, los dominios personalizados y los endpoints privados tienen pruebas y propiedad.",
      "Las políticas globales y de espacio de trabajo utilizan la base y tienen un proceso de excepción formal.",
      "Las claves de suscripción no se utilizan como sustituto de la identidad y la autorización comercial.",
      "Las identidades administradas solo tienen los permisos necesarios y no dependen de la omisión implícita del firewall.",
      "Los valores, secretos y certificados con nombre utilizan el almacenamiento y la rotación adecuados.",
      "Se probaron tiempos de espera, reintentos, caché, límites de velocidad y cuotas en escenarios de falla.",
      "Métricas, registros, Application Insights y transacciones sintéticas cubren el recorrido.",
      "La configuración se versiona y se publica mediante canalización con prueba de humo y plan de reversión.",
      "La alta disponibilidad incluye backends, identidad, DNS, ingreso global y proceso de recuperación.",
      "El portal y los productos para desarrolladores exponen únicamente documentación y ejemplos aprobados."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "laboratorios y ejercicios",
    "id": "laboratorios-y-ejercicios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Importe una OpenAPI e identifique las API, las operaciones y el backend generados.",
      "Cree políticas de entrada, salida y en caso de error y observe el orden de ejecución.",
      "Aplicar una política global y API usando base; Pruebe el efecto de omitir la base en el laboratorio.",
      "Configure un valor con nombre y reemplace un literal de política.",
      "Validar un JWT y diferenciar 401 de 403 en respuestas controladas.",
      "Utilice una identidad administrada para autenticar APIM en un backend protegido.",
      "Configure un dominio personalizado con un certificado de Key Vault en un entorno de prueba.",
      "Diseñar una topología con Front Door, endpoint privado y backend privado, indicando DNS y rutas.",
      "Cree un panel con solicitudes, estado, duración y capacidad del backend.",
      "Simule el tiempo de espera del backend y capture LastError en caso de error.",
      "Modele un espacio de trabajo con responsabilidades de plataforma y dominio.",
      "Escriba una canalización conceptual de importación, política, prueba y publicación."
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
        "Instancias de gestión de API",
        "Recurso de Azure que reúne capacidades de configuración, API Gateway y administración."
      ],
      [
        "backend",
        "Recurso que representa el destino llamado por la API Gateway."
      ],
      [
        "Política básica",
        "Elemento que incluye políticas heredadas del ámbito superior."
      ],
      [
        "Capacidad",
        "Métrica que indica la utilización relativa de la capacidad de la API Gateway."
      ],
      [
        "Developer portal",
        "Portal de descubrimiento, documentación, pruebas e incorporación."
      ],
      [
        "Diagnóstico",
        "Configuración de emisión de telemetría para registrador o destino."
      ],
      [
        "Managed gateway",
        "Plano de datos operado por Microsoft."
      ],
      [
        "Identidad administrada",
        "Inicio de sesión de identidad administrado por Azure para acceso sin secreto estático."
      ],
      [
        "Valor nombrado",
        "Parámetro reutilizable utilizado en políticas."
      ],
      [
        "operación",
        "Combinación de método y plantilla de URL dentro de una API."
      ],
      [
        "Expresión de política",
        "Expresión de C# limitada evaluada en runtime de la política."
      ],
      [
        "Producto",
        "Paquete API ofrecido a los consumidores."
      ],
      [
        "Revisión",
        "Revisión de una API bajo la misma versión pública."
      ],
      [
        "Self-hosted gateway",
        "API GatewayM ejecutándose como contenedor en la infraestructura del cliente."
      ],
      [
        "Suscripción",
        "Entidad consumidora que puede tener claves primarias y secundarias."
      ],
      [
        "Espacio de trabajo",
        "Límite administrativo para la gestión de API federadas."
      ],
      [
        "Workspace gateway",
        "API Gateway asociada con el runtime de un espacio de trabajo."
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
      "Microsoft aprende. Azure API Management: descripción general y conceptos clave. Actualizado en 2025.",
      "Microsoft aprende. API Gateway en Azure API Management. Actualizado en mayo de 2026.",
      "Microsoft aprende. Niveles de Azure API Management v2. Actualizado en marzo de 2026.",
      "Microsoft aprende. Comparación basada en características de los niveles de Azure API Management. Actualizado en 2026.",
      "Microsoft aprende. Políticas en Azure API Management. Actualizado en mayo de 2026.",
      "Microsoft aprende. Espacios de trabajo en Azure API Management. Actualizado en junio de 2026.",
      "Microsoft aprende. Descripción general de la API Gateway autohospedada y políticas de soporte. Actualizado en 2026.",
      "Microsoft aprende. Configure un punto de conexión privado entrante para Azure API Management. Actualizado en junio de 2026.",
      "Microsoft aprende. Fiabilidad en Azure API Management e implementación multirregional.",
      "Microsoft aprende. Utilice identidades administradas en Azure API Management. Actualizado en abril de 2026.",
      "Microsoft aprende. Integre Azure API Management con Application Insights. Actualizado en marzo de 2026.",
      "Microsoft aprende. Observabilidad en Azure API Management. Actualizado en junio de 2026.",
      "Microsoft aprende. Importe las API de OpenAPI y SOAP a Azure API Management.",
      "Marco de buena arquitectura de Microsoft Azure. Guía de servicios para Azure API Management."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management evoluciona con frecuencia. Los niveles, regiones, límites, espacios de trabajo, API Gateways y políticas pueden cambiar. Antes de implementar una decisión, valide la documentación oficial y la matriz de recursos para la región y el nivel seleccionados."
  }
];
