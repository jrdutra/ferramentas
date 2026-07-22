import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const AXWAY_GATEWAY_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "De la configuración en Policy Studio al procesamiento distribuido en runtime"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/overview.svg",
    "alt": "Plataforma Axway con diseño, administración, ejecución, persistencia y operación.",
    "caption": "Figura de apertura: la plataforma combina herramientas de diseño, administración centralizada, runtime de políticas y componentes de persistencia y observabilidad."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway combina topología administrativa, configuración versionable y runtime de políticas de alto rendimiento."
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
    "text": "El capítulo anterior estudió las políticas de API Gateway como unidades ejecutables de seguridad, transformación, enrutamiento y observabilidad. Ahora la atención se centra en una implementación corporativa concreta: Axway API Gateway. El producto materializa estos conceptos a través de dominios administrativos, grupos, instancias de API Gateway, administradores de nodos, Policy Studio, herramientas de operación web y repositorios de datos utilizados por las políticas y el API Manager."
  },
  {
    "kind": "paragraph",
    "text": "Entender la arquitectura requiere separar tres puntos de vista. La primera es la visión de diseño, en la que los equipos construyen circuitos de políticas, oyentes, servicios, certificados, KPS y configuraciones de entorno. La segunda es la vista administrativa, donde el dominio controla grupos, instancias, implementaciones y acceso operativo. La tercera es la vista en runtime, en la que un mensaje ingresa a través de un oyente, recibe contexto, pasa por filtros, puede consultar repositorios, llama a un backend y produce una respuesta, registros y métricas."
  },
  {
    "kind": "paragraph",
    "text": "En entornos bancarios y de gran escala, la puerta de entrada rara vez está sola. Por lo general, opera detrás de balanceadores, en zonas externas e internas, con bancos de métricas, Cassandra, servicios de identidad, HSM, directorios, observabilidad empresarial y backends distribuidos. Una falla en cualquiera de estas dependencias puede parecerle al consumidor como un tiempo de espera, 502, 401, reinicio o error de política. Por lo tanto, el operador necesita dominar tanto la herramienta como la red, HTTP, TLS y los fundamentos de identidad estudiados en capítulos anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo no pretende reemplazar la documentación de una versión específica del producto. Su objetivo es construir un modelo mental estable para arquitectura, operación, implementación, alta disponibilidad, rendimiento y retroubleshooting. Los nombres de los menús y los detalles de configuración pueden variar entre versiones, pero los conceptos de dominio, grupos, instancias, administración y aplicación de políticas siguen siendo fundamentales."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Siga cada sección distinguiendo plan administrativo, runtime del tráfico y persistencia. Al solucionar problemas, escriba explícitamente qué componente se está observando: Policy Studio, Admin Node Manager, Node Manager, instancia de API Gateway, API Manager, Cassandra, base de datos de métricas o backend."
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
      "Explique la relación entre dominio, grupos, instancias, administradores de nodos y administrador de nodos.",
      "Distinga Policy Studio, API Gateway Manager, API Manager y Traffic Monitor.",
      "Describir cómo se modelan, validan, implementan y activan las configuraciones en runtime.",
      "Explique los oyentes, los servicios, los circuitos de políticas, los filtros y el contexto del mensaje.",
      "Relacione API Manager con API Gateway sin confundir los dos productos.",
      "Comprender el papel de KPS, Cassandra, bancos de métricas y archivos de configuración.",
      "Diseñar centros de datos de alta disponibilidad, escalabilidad horizontal, multizona y múltiples.",
      "Aplique TLS, mTLS, OAuth, claves API, certificados y HSM en el contexto del producto.",
      "Interpretar registros, métricas, Traffic Monitor y trazas para diagnóstico.",
      "Planifique el rendimiento, la capacidad, el despliegue de contenedores y el refuerzo operativo."
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
      "23.1 Posicionamiento del producto y componentes principales.",
      "23.2 Dominio, grupos e instancias",
      "23.3 Node Manager y administradores de nodos",
      "23.4 Policy Studio y modelo de configuración",
      "23.5 Tiempo de ejecución: oyentes, servicios, circuitos y filtros",
      "23.6 Contexto del mensaje y flujo de ejecución",
      "23.7 Administrador de API sobre API Gateway",
      "23.8 KPS, Cassandra y bancos de métricas",
      "23.9 Despliegue, promoción y reversión",
      "23.10 Alta disponibilidad y escalabilidad",
      "23.11 Topologías de zona y múltiples centros de datos",
      "23.12 TLS, mTLS, PKI y cifrado",
      "23.13 Claves de autenticación, OAuth y API",
      "23.14 Enrutamiento, conexión a backends y resiliencia",
      "23.15 Monitor de Observabilidad y Tráfico",
      "23.16 Rendimiento y capacidad",
      "23.17 Contenedores y OpenShift",
      "23.18 Seguridad y refuerzo administrativo",
      "23.19 Troubleshooting y estudios de casos",
      "Resumen, lista de verificación, laboratorios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.1 Posicionamiento del producto y componentes principales.",
    "id": "23-1-posicionamiento-del-producto-y-componentes-principales"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway es un runtime de mediación y seguridad para API y tráfico de servicios. Recibe mensajes en oyentes configurados, interpreta protocolos admitidos, ejecuta cadenas de filtros y reenvía llamadas a destinos. El producto puede funcionar como proxy inverso, punto de cumplimiento de seguridad, transformador de mensajes, enrutador y punto de observabilidad. Sus capacidades no se concentran en un solo ejecutable: está organizado por herramientas de diseño, administración, runtime y persistencia."
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio es la principal herramienta de desarrollo y configuración. API Gateway Manager es la interfaz web para administrar la topología, rastrear instancias, registros y tráfico. El Admin Node Manager centraliza las operaciones de gestión de dominios, mientras que los Node Managers administran los componentes en los hosts y grupos correspondientes. Las instancias de API Gateway ejecutan tráfico empresarial. API Manager agrega capacidades de publicación, virtualización, aplicaciones, consumidores, claves, portales y ciclo de vida además del runtime de la API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Esta separación le permite desarrollar políticas sin acoplar el tráfico a la consola administrativa. También requiere disciplina: los puertos administrativos deben estar segregados, el acceso debe estar protegido por RBAC, las configuraciones deben estar versionadas y las dependencias externas deben monitorearse. En producción, el runtime debe continuar procesando el tráfico incluso cuando las herramientas de diseño están apagadas; sin embargo, los cambios administrativos y las operaciones dependen del estado del dominio de gestión."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Componentes con diferentes funciones dentro de la plataforma.",
    "headers": [
      "Componente",
      "Responsabilidad principal",
      "Pregunta operativa"
    ],
    "rows": [
      [
        "Policy Studio",
        "Desarrollar y configurar políticas, oyentes, certificados y entorno.",
        "¿Qué configuración se creó y validó?"
      ],
      [
        "Admin Node Manager",
        "Administración central de dominios.",
        "¿Está disponible el plan administrativo?"
      ],
      [
        "Node Manager",
        "Administre instancias y componentes en el host o grupo.",
        "¿El nodo recibe y aplica operaciones?"
      ],
      [
        "Instancia de API Gateway",
        "Ejecutar circuitos de tráfico y políticas.",
        "¿La solicitud alcanzó el runtime?"
      ],
      [
        "API Gateway Manager",
        "Supervise la topología, los registros, las métricas y el tráfico.",
        "¿Qué evidencia produjo el runtime?"
      ],
      [
        "API Manager",
        "Gestione API, consumidores y publicaciones.",
        "¿Cómo se virtualizó y expuso la API?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.2 Dominio, grupos e instancias",
    "id": "23-2-dominio-grupos-e-instancias"
  },
  {
    "kind": "paragraph",
    "text": "Un dominio API Gateway es el límite administrativo que reúne a grupos e instancias bajo una estructura de gestión común. El dominio tiene un administrador de nodo de administración y puede contener varios grupos. Un grupo representa una unidad lógica de implementación y administración, a menudo alineada con una función, zona, entorno o conjunto de instancias. Dentro de cada grupo, las instancias de API Gateway realizan configuraciones y procesan el tráfico."
  },
  {
    "kind": "paragraph",
    "text": "La organización en grupos evita tratar cada instancia como una configuración aislada. Cuando se implementa una configuración en un grupo, las instancias de ese grupo deben funcionar de forma coherente. Esto es esencial en los clústeres detrás de un equilibrador: cualquier nodo elegible debe reconocer los mismos oyentes, certificados, políticas, rutas y referencias de entorno, salvo diferencias parametrizadas explícitamente."
  },
  {
    "kind": "paragraph",
    "text": "El dominio no debe confundirse con el dominio DNS o el dominio empresarial. Esta es una unidad del producto. Tampoco se debe dar por sentado que todos los grupos de un dominio reciben la misma configuración. Es posible organizar grupos externos, internos, administrativos o especializados, con diferentes responsabilidades y exposiciones. La elección influye en el radio de explosión, la gobernanza y el proceso de promoción."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/figure-01-domain-topology.svg",
    "alt": "Dominio Axway con Admin Node Manager, grupos, Node Managers e instancias",
    "caption": "Figura 1: el dominio organiza la administración central, los grupos, los administradores de nodos y las instancias de runtime."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "El grupo es una unidad lógica de implementación; la instancia es el proceso de ejecución; Node Manager gestiona los componentes; Admin Node Manager coordina el dominio. Confundir estos niveles conduce a implementaciones en objetivos equivocados y diagnósticos inexactos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.3 Node Manager y administradores de nodos",
    "id": "23-3-node-manager-y-administradores-de-nodos"
  },
  {
    "kind": "paragraph",
    "text": "El administrador del nodo de administración, a menudo abreviado como ANM, es el servidor administrativo central del dominio. Herramientas como Policy Studio y API Gateway Manager se conectan al plano administrativo a través de él. El ANM coordina las operaciones de topología, implementación y gestión y, por lo tanto, debe protegerse como un componente crítico. Su falta de disponibilidad puede impedir cambios y ciertas operaciones administrativas, incluso si las instancias de API Gateway continúan atendiendo tráfico con la configuración ya activa."
  },
  {
    "kind": "paragraph",
    "text": "Los administradores de nodos realizan funciones de administración en hosts o grupos y se comunican con el administrador de nodos. La separación permite a ANM mantener una visión central mientras los administradores de nodos realizan las operaciones locales. En topologías grandes, el estado de esta comunicación es tan importante como el estado de las instancias de API Gateway. Los problemas con certificados, puertos, DNS, firewall o versiones pueden impedir la administración sin afectar inmediatamente el tráfico empresarial."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad administrativa requiere una planificación específica. No basta con colocar el detector de API detrás de un equilibrador de carga. El canal de gestión utiliza sus propios puertos y flujos y necesita una estrategia de HA, respaldo, recuperación y segregación. El acceso a ANM debe restringirse a redes administrativas, cuentas con least privilege y autenticación sólida. Los registros administrativos deben conservarse para la auditoría."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: La disponibilidad de gestión y la disponibilidad de tráfico son dimensiones diferentes.",
    "headers": [
      "Fallo observado",
      "Tráfico comercial",
      "administración",
      "Hipótesis"
    ],
    "rows": [
      [
        "ANM no disponible",
        "Puedes continuar con la configuración activa.",
        "La implementación y la topología pueden fallar.",
        "Fallo en el plan administrativo."
      ],
      [
        "Node Manager aislados",
        "La instancia puede permanecer activa.",
        "Las operaciones locales no son suficientes.",
        "Red, certificado o proceso local."
      ],
      [
        "Instancia de API Gateway detenida",
        "El nodo no atiende tráfico.",
        "Puede aparecer sin conexión.",
        "Proceso, JVM, recursos o configuración."
      ],
      [
        "Puerto administrativo bloqueado",
        "Las API pueden responder.",
        "El estudio/administrador de políticas falla.",
        "Firewall o ruta de gestión."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.4 Policy Studio y el modelo de configuración",
    "id": "23-4-policy-studio-y-el-modelo-de-configuracion"
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio ofrece una vista estructurada del proyecto de API Gateway. Configura circuitos de políticas, filtros, oyentes, servicios, certificados, almacenes, alertas, KPS, recursos del entorno y referencias a sistemas externos. La herramienta no debe tratarse simplemente como un editor visual: lo que produce es una infraestructura ejecutable, con dependencias, orden de filtros, variables y efectos secundarios que necesitan revisión y prueba."
  },
  {
    "kind": "paragraph",
    "text": "Una política bien diseñada tiene insumos, resultados y responsabilidades claras. Los filtros de autenticación deben establecer atributos predecibles; los filtros de autorización deben consumir identidad confiable; los filtros de enrutamiento deben tener una URL definida y un tiempo de espera; Los filtros de error deben producir respuestas consistentes. Los subcircuitos reutilizables reducen la duplicación, pero pueden aumentar el radio de los cambios. Por lo tanto, la reutilización requiere control de versiones y un contrato."
  },
  {
    "kind": "paragraph",
    "text": "Los datos de configuración y entorno deben separarse siempre que sea posible. Las URL de backend, los alias de certificados, las credenciales, los nombres de host, los tiempos de espera y los parámetros por entorno no deberían requerir la edición manual de la lógica central. Esta separación facilita la promoción del mismo artefacto entre desarrollo, aprobación y producción, lo que reduce la deriva y el riesgo humano."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual: circuito de políticas"
  },
  {
    "kind": "paragraph",
    "text": "# Estructura conceptual de una política Inicio -> ID de correlación -> Validación de canales y métodos -> Autenticación -> Autorización -> Límite de tasa/cuota -> Transformación controlada -> Enrutamiento al backend -> Normalización de respuesta -> Auditoría y métricas -> Fin"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.5 Tiempo de ejecución: oyentes, servicios, circuitos y filtros",
    "id": "23-5-tiempo-de-ejecucion-oyentes-servicios-circuitos-y-filtros"
  },
  {
    "kind": "paragraph",
    "text": "En runtime, el oyente es el punto de entrada asociado con la dirección, el puerto, el protocolo y los parámetros TLS. Cuando llega una conexión, la API Gateway negocia el transporte y la seguridad, identifica el servicio aplicable y crea el contexto del mensaje. El servicio seleccionado dirige la ejecución a un circuito de políticas. El circuito se compone de filtros conectados según el éxito, el fracaso y las rutas de derivación explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Los filtros son unidades de procesamiento: validar certificado, extraer encabezado, consultar KPS, llamar al servicio, verificar JWT, transformar XML/JSON, registrar registro o definir un mensaje. Cada filtro lee y escribe atributos del contexto del mensaje. El comportamiento final depende del orden y los caminos. Un filtro aparentemente simple puede consumir cuerpo, bloquear subprocesos, acceder a la red o producir una respuesta, cambiando el rendimiento y la semántica."
  },
  {
    "kind": "paragraph",
    "text": "Los circuitos pueden llamar a subcircuitos y compartir lógica. Esta modularidad ayuda a estandarizar la autenticación, la auditoría y el error. Sin embargo, las dependencias implícitas de los atributos generados por otro circuito hacen que la configuración sea frágil. Un subcircuito debe documentar qué atributos requiere, cuáles produce y cómo señala fallas. Sin este contrato, los pequeños cambios generan regresiones difíciles de localizar."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/figure-02-runtime-request.svg",
    "alt": "Oyente, servicio, circuito de políticas, enrutamiento y ruta de respuesta en runtime",
    "caption": "Figura 2: El runtime convierte una conexión entrante en filtrado, enrutamiento y ejecución de respuesta observable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.6 Contexto del mensaje y flujo de ejecución",
    "id": "23-6-contexto-del-mensaje-y-flujo-de-ejecucion"
  },
  {
    "kind": "paragraph",
    "text": "El contexto del mensaje es la memoria de trabajo de la transacción. Contiene propiedades de solicitud, conexión, autenticación, certificados, headers, cuerpo, destino, respuesta y atributos intermedios creados por filtros. Muchas decisiones en Policy Studio se expresan como selectores o referencias a atributos de contexto. Esto ofrece flexibilidad, pero requiere estandarización de nombres y tipos."
  },
  {
    "kind": "paragraph",
    "text": "Un atributo sólo puede existir en una ruta determinada. Si la autenticación falla antes de crear el asunto, un filtro de auditoría no puede asumir que el atributo está presente. Si una llamada es atendida por caché, es posible que los atributos generados cuando se enruta al backend no existan. Las políticas sólidas manejan explícitamente la ausencia, los valores vacíos y los tipos inesperados."
  },
  {
    "kind": "paragraph",
    "text": "El contexto también es un límite de seguridad. Los headers recibidos del consumidor no deben promocionarse directamente a la identidad confiable. La API Gateway debe eliminar o sobrescribir los atributos que se propagarán al backend. Los datos confidenciales, como tokens, contraseñas y claves, no deben incluirse en los rastreos de forma indiscriminada. El operador necesita equilibrar el diagnóstico y la protección de la información."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: El contexto es poderoso, pero necesita higiene de contrato y seguridad.",
    "headers": [
      "Tipo de atributo",
      "Ejemplo",
      "Precaución"
    ],
    "rows": [
      [
        "Transporte",
        "IP, puerto, TLS, certificado.",
        "NAT y los proxies cambian el origen observado."
      ],
      [
        "HTTP",
        "Método, URI, headers, cuerpo.",
        "El cuerpo puede transmitirse y tener límite de memoria."
      ],
      [
        "Identidad",
        "asunto, client_id, scopes.",
        "Sólo después de una validación fiable."
      ],
      [
        "Enrutamiento",
        "URL final, tiempo de espera, grupo.",
        "No registre secretos presentes en la URL."
      ],
      [
        "Observabilidad",
        "ID de correlación, hora, estado.",
        "Preservar la coherencia en todos los caminos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.7 Administrador de API sobre API Gateway",
    "id": "23-7-administrador-de-api-sobre-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "API Manager es una capa de administración de API construida sobre el runtime de API Gateway. Agrega conceptos como API virtualizadas, aplicaciones de consumo, credenciales, planes, publicación, catálogo y portal. El Gateway sigue siendo el mecanismo que ejecuta políticas y atiende el tráfico. Esta relación explica por qué la instalación y configuración de API Manager depende de un dominio y de las instancias de API Gateway disponibles."
  },
  {
    "kind": "paragraph",
    "text": "La virtualización de una API convierte un contrato importado o definido en una interfaz publicada en la API Gateway. El proceso asocia frontend, backend, seguridad, cuotas, políticas y metadata del catálogo. Los cambios realizados en API Manager pueden generar o actualizar artefactos que la API Gateway ejecutará. Por lo tanto, los equipos deben evitar editar manualmente los componentes administrados por API Manager sin comprender cómo se comportan las sincronizaciones futuras."
  },
  {
    "kind": "paragraph",
    "text": "API Manager también utiliza su propia persistencia, a menudo respaldada por Cassandra, para datos de aplicaciones, organizaciones, API y credenciales. El estado del runtime y el estado del plano de gestión pueden diferir. Una API existente puede continuar respondiendo mientras las operaciones de registro o publicación fallan debido a la falta de disponibilidad de Cassandra. El diagnóstico debe separar el consumo de API, la gestión de API y el almacenamiento de datos del plan de gestión."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: El plano de gestión y el runtime cooperan, pero no son la misma capa.",
    "headers": [
      "Objeto",
      "API Manager",
      "Tiempo de ejecución de API Gateway"
    ],
    "rows": [
      [
        "API virtualizada",
        "Define publicación, frontend y políticas.",
        "Realiza escucha, circuitos y enrutamiento."
      ],
      [
        "Solicitud",
        "Representa al consumidor y las credenciales.",
        "Valida credencial durante la llamada."
      ],
      [
        "Cuota/plan",
        "Configurar regla de consumo.",
        "Aplica contraataques y decisión."
      ],
      [
        "Portal/catálogo",
        "Facilita el descubrimiento y la incorporación.",
        "No participa en todas las convocatorias."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.8 KPS, Cassandra y bancos de métricas",
    "id": "23-8-kps-cassandra-y-bancos-de-metricas"
  },
  {
    "kind": "paragraph",
    "text": "Key Property Store, o KPS, es una tabla de datos consultados por políticas. Es adecuado para información que se lee con frecuencia y se cambia con menos frecuencia, como asignaciones, parámetros, listas y datos auxiliares. KPS no debe utilizarse como reemplazo genérico de un dominio bancario transaccional. Las consultas y los índices deben reflejar los patrones de acceso reales de las políticas."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra es utilizada por API Manager y también puede admitir datos de KPS y otros componentes según la configuración. Debido a que está distribuido, el banco ofrece escalabilidad y tolerancia a fallos, pero requiere operaciones especializadas: la coherencia, la replicación, la reparación, la compresión, el espacio en disco, el montón, la latencia y el estado del clúster influyen directamente en el plan de gestión y las políticas dependientes."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas y los informes pueden utilizar bases de datos relacionales compatibles. Este repositorio tiene un perfil diferente al de Cassandra y KPS. La falta de disponibilidad del banco de métricas puede degradar los informes y la visibilidad sin necesariamente impedir el tráfico. Sin embargo, las configuraciones de registro sincrónico o las dependencias mal diseñadas pueden convertir la observabilidad en un cuello de botella. El objetivo es que la recopilación de métricas esté controlada y que la plataforma tenga una retención y depuración planificada."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/figure-03-data-stores.svg",
    "alt": "API Gateway en runtime conectada a KPS, Cassandra y base de datos de métricas",
    "caption": "Figura 3: Diferentes tiendas tienen diferentes propósitos: ejecución de políticas, gestión y observabilidad."
  },
  {
    "kind": "subhead",
    "text": "regla de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "No coloque datos en KPS o Cassandra que requieran transacciones sólidas, consultas arbitrarias o actualizaciones por solicitud sin evaluar el impacto. La tienda debe elegirse en función de los estándares de coherencia y acceso, no solo porque ya existe en la plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.9 Despliegue, promoción y reversión",
    "id": "23-9-despliegue-promocion-y-reversion"
  },
  {
    "kind": "paragraph",
    "text": "Implementar una configuración significa transferir artefactos validados al dominio y activarlos en los grupos o instancias elegidos. En entornos maduros, esta operación debe automatizarse por canalización, vincularse al versionado y acompañarse de evidencia. Exportar e importar manualmente configuraciones sin trazabilidad aumenta la deriva y dificulta la reversión."
  },
  {
    "kind": "paragraph",
    "text": "La promoción entre entornos debe separar la lógica y los datos específicos. El mismo proyecto puede hacer referencia a variables, alias y endpoints parametrizados por entorno. Antes de la implementación, las canalizaciones deben realizar validación estática, pruebas de políticas, verificación de certificados y compatibilidad con la versión en runtime. Después de la implementación, las pruebas de humo deben cubrir los oyentes, la autenticación, las rutas, los errores y la observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Revertir no es simplemente reinstalar un archivo anterior. Si el cambio creó estructuras en KPS, cambió certificados, cambió el esquema en Cassandra o actualizó dependencias externas, restaurar la configuración por sí sola puede ser insuficiente. El plan debe describir artefactos, datos, secuencia y criterios de devolución. En grupos con múltiples instancias, el tiempo de inactividad cero requiere coordinación para evitar que todas se recarguen o se detengan simultáneamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/figure-04-deployment-cycle.svg",
    "alt": "Ciclo de configuración entre Policy Studio, Admin Node Manager, Node Managers e instancias",
    "caption": "Figura 4: El ciclo de implementación debe controlarse desde el diseño hasta la activación en runtime."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.10 Alta disponibilidad y escalabilidad",
    "id": "23-10-alta-disponibilidad-y-escalabilidad"
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad del tráfico se logra ejecutando múltiples instancias detrás de un equilibrador o mecanismo equivalente. Cada instancia debe poder ofrecer la misma API con configuración y dependencias coherentes. Los controles de estado deben distinguir el proceso en vivo, el oyente activo y la preparación real para llamar a los backends. Una prueba superficial puede dejar un nodo en el grupo sin acceso a KPS, Cassandra, DNS o un servicio crítico."
  },
  {
    "kind": "paragraph",
    "text": "La escalabilidad horizontal funciona mejor cuando las políticas no tienen estado o utilizan almacenes distribuidos adecuados. El estado local, la caché no compartida y la afinidad inadecuada pueden producir un comportamiento incoherente. Cuando alguna función requiere rigidez, el motivo debe ser explícito y se debe probar el impacto en la conmutación por error. La preferencia debe ser por identidad, cuota y sesión independientes del nodo siempre que sea posible."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad administrativa es una dimensión separada. El Node Manager de administración se puede configurar con una estrategia de alta disponibilidad y el canal administrativo utiliza un puerto diferente al del tráfico empresarial. La copia de seguridad de configuración, datos, certificados y archivos esenciales también forma parte de la disponibilidad. HA sin la capacidad de recuperar credenciales y configuración después de que el desastre esté incompleto."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/es/figure-05-high-availability.svg",
    "alt": "Equilibrador de carga con múltiples API Gateways y alta disponibilidad administrativa",
    "caption": "Figura 5 - El equilibrio del tráfico y la disponibilidad administrativa requieren diseños propios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.11 Topologías de zona y múltiples centros de datos",
    "id": "23-11-topologias-de-zona-y-multiples-centros-de-datos"
  },
  {
    "kind": "paragraph",
    "text": "Las organizaciones suelen separar las API Gateways en zonas externas e internas. La zona exterior recibe tráfico de consumidores y aplica controles de borde; la zona interna realiza mediación adicional o accede a sistemas protegidos. La comunicación entre zonas debe ser autenticada, limitada y observable. Replicar todas las políticas en ambas capas aumenta la latencia y dificulta la propiedad; cada zona debe tener una responsabilidad clara."
  },
  {
    "kind": "paragraph",
    "text": "En múltiples centros de datos, el diseño debe decidir qué componentes son locales y qué datos se replican. Las API Gateways en runtime pueden operar cerca de los consumidores y los backends, mientras que la administración, Cassandra, las métricas y el catálogo requieren coherencia y una estrategia de recuperación. La latencia entre centros de datos no debe ignorarse en KPS, introspección, llamadas de políticas o bases de datos distribuidas."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario realizar una conmutación por error entre sitios. DNS, GSLB, certificados, rutas, firewall, replicación y capacidad de supervivencia del sitio son parte de la prueba. No basta con confirmar que el proceso se inicia en el segundo centro de datos; es necesario demostrar que los consumidores eligen la dirección correcta, que las credenciales siguen siendo válidas y que las cuotas, las API y los datos de gestión son coherentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La topología debe equilibrar el aislamiento, la latencia, la coherencia y la operatividad.",
    "headers": [
      "Topología",
      "ventaja",
      "Riesgo principal"
    ],
    "rows": [
      [
        "Un solo sitio, múltiples nodos",
        "Simplicidad y HA local.",
        "Fallo del centro de datos."
      ],
      [
        "Grupos externos + internos",
        "Separación de zonas y responsabilidades.",
        "Duplicación de políticas y latencia."
      ],
      [
        "Multi-DC activo/pasivo",
        "Recuperación más sencilla.",
        "Capacidad inactiva y conmutación por error mal probada."
      ],
      [
        "DC múltiple activo/activo",
        "Distribución y menor RTO.",
        "Coherencia, enrutamiento y operación complejos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.12 TLS, mTLS, PKI y cifrado",
    "id": "23-12-tls-mtls-pki-y-cifrado"
  },
  {
    "kind": "paragraph",
    "text": "Los oyentes HTTPS dependen de certificados de servidor, claves privadas, conjuntos criptográficos y almacenes de confianza. La API Gateway puede finalizar TLS desde el consumidor e iniciar una nueva conexión TLS al backend. Estos dos fragmentos son independientes: el certificado, la versión, el SNI, la verificación del nombre de host, el almacén de confianza y mTLS pueden ser diferentes. La troubleshooting debe indicar en qué parte falló el protocolo de enlace."
  },
  {
    "kind": "paragraph",
    "text": "En mTLS entrante, el oyente solicita el certificado del cliente y valida la cadena y las propiedades. Luego, la política puede asignar el certificado a una identidad, pero debería preferir SAN y reglas explícitas en lugar de simplemente confiar en el CN. En salida, la API Gateway puede presentar un certificado al backend. Un alias incorrecto, una cadena incompleta, una clave no disponible o un permiso faltante en el HSM provocan un error antes de HTTP."
  },
  {
    "kind": "paragraph",
    "text": "En entornos con HSM o aceleración criptográfica, las operaciones clave se delegan al dispositivo o proveedor. Esto aumenta la protección de claves, pero introduce dependencias de sesión, controlador, red y capacidad. El monitoreo debe incluir la latencia y la disponibilidad del módulo. Es necesario ensayar la rotación de certificados para evitar interrupciones debido a recargas, alias o almacenes de confianza desactualizados."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Cada canal tiene su propia identidad criptográfica y cadena de confianza.",
    "headers": [
      "Extracto",
      "La API Gateway actúa como",
      "Configuraciones críticas"
    ],
    "rows": [
      [
        "Cliente -> API Gateway",
        "Servidor TLS.",
        "Certificado, oyente, confianza del cliente, suites."
      ],
      [
        "API Gateway -> Servidor",
        "Cliente TLS.",
        "Truststore, SNI, nombre de host, certificado de cliente."
      ],
      [
        "administración",
        "Gestión de servidor/cliente.",
        "Certificados administrativos y RBAC."
      ],
      [
        "HSM",
        "Consumidor clave protegido.",
        "Proveedor, sesión, slot, PIN y capacidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.13 Claves de autenticación, OAuth y API",
    "id": "23-13-claves-de-autenticacion-oauth-y-api"
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway ofrece filtros y configuraciones para varios mecanismos de autenticación. Las claves API se pueden almacenar o consultar en KPS y vincularse a aplicaciones administradas por API Manager. Los tokens de OAuth pueden validarse localmente, consultarse mediante introspección o emitirse cuando la API Gateway actúa como authorization server, según la arquitectura. Los certificados, LDAP, Kerberos y mecanismos personalizados también pueden participar en las políticas."
  },
  {
    "kind": "paragraph",
    "text": "La elección debe preservar la separación entre autenticación y autorización. La validación de una clave o token establece cliente y sujeto; no significa que se libere ninguna operación. El circuito necesita verificar scopes, roles, contrato, producto, cuota, tenant y contexto. La identidad propagada al backend debe estar firmada, protegida por mTLS o aceptada únicamente desde redes confiables."
  },
  {
    "kind": "paragraph",
    "text": "El cache de claves, la introspección y los metadata mejora el rendimiento, pero cambia el tiempo de revocación. La política debe documentar el TTL, el comportamiento de falla y la coherencia. La autenticación de error de apertura suele ser inapropiada. Si el servicio de identidad no responde, permitir la llamada puede convertir la indisponibilidad en una elusión de seguridad."
  },
  {
    "kind": "subhead",
    "text": "Canal conceptual de autenticación y autorización"
  },
  {
    "kind": "paragraph",
    "text": "# Flujo de seguridad conceptual extraer credencial validar integridad y validez resolver cliente y sujeto verificar audience y scopes consultar cuota o plan aplicar autorización contextual eliminar headers que no sean confiables propagar la identidad confiable al backend"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.14 Enrutamiento, backends y resiliencia",
    "id": "23-14-enrutamiento-backends-y-resiliencia"
  },
  {
    "kind": "paragraph",
    "text": "El enrutamiento saliente transforma una decisión lógica en una conexión real con un backend. La política define URL, método, headers, TLS, tiempo de espera, agrupación y manejo de respuestas. DNS, ruta IP, firewall, NAT y certificado siguen siendo relevantes. Un error de filtro de enrutamiento puede deberse a una ruta faltante, un grupo agotado, un tiempo de espera de conexión, un tiempo de espera de lectura, una discrepancia en el nombre de host o un reinicio del servidor."
  },
  {
    "kind": "paragraph",
    "text": "Los grupos de conexiones reducen los costos del protocolo de enlace, pero requieren límites, mantenimiento, tiempo de inactividad y validación. Si el backend cierra las conexiones antes que la API Gateway, la reutilización puede producir reinicios intermitentes. Si la API Gateway abre demasiadas conexiones, puede agotar los puertos efímeros o SNAT. Las métricas de pool y socket deben estar correlacionadas con el rendimiento y la latencia."
  },
  {
    "kind": "paragraph",
    "text": "El reintento solo debe aplicarse a operaciones idempotentes o aquellas protegidas por una clave de idempotencia. Repetir una transferencia financiera después de un tiempo de espera de lectura puede duplicar el efecto. El disyuntor, el respaldo y el equilibrio deben considerar la semántica empresarial. La resiliencia no es simplemente volver a intentarlo; es contener fallas sin multiplicar la carga ni corromper el estado."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - El error que presenta el gateway debe desglosarse por capa.",
    "headers": [
      "Síntoma",
      "capa probable",
      "evidencia"
    ],
    "rows": [
      [
        "Tiempo de espera de conexión",
        "Red backend o oyente.",
        "SYN, ruta, firewall, grupo."
      ],
      [
        "Tiempo de espera de lectura",
        "Backend lento o respuesta bloqueada.",
        "Tiempo y rastreo aguas arriba."
      ],
      [
        "Restablecer conexión",
        "Conexión cerrada entre pares o intermediarios.",
        "Capture registros de TCP y backend."
      ],
      [
        "502 desde la API Gateway",
        "No se pudo obtener una respuesta válida.",
        "Monitor de tráfico, filtro de seguimiento y enrutamiento."
      ],
      [
        "Error de salida TLS",
        "Confianza, SNI, nombre de host o certificado.",
        "Apretón de manos y cuerda presentada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.15 Observabilidad, registros y Monitor de Tráfico",
    "id": "23-15-observabilidad-registros-y-monitor-de-trafico"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway Manager proporciona información operativa sobre instancias, registros y tráfico. Traffic Monitor registra los detalles del mensaje según la configuración y puede ayudar a reconstruir la ruta de una transacción. Trace Log revela mensajes de ejecución y diagnóstico. Las métricas agregadas le permiten observar el rendimiento, el estado, la latencia y el estado. Cada fuente tiene un costo y propósito diferente."
  },
  {
    "kind": "paragraph",
    "text": "La supervisión detallada del tráfico puede consumir CPU, E/S, base de datos y almacenamiento. En grandes volúmenes, registrar la carga útil completa es costoso y arriesgado. La estrategia debe seleccionar eventos, enmascarar datos, limitar el tamaño y definir la retención. El rastreo de alto nivel debe ser temporal y aplicarse al menor scope posible. La observabilidad no puede comprometer la disponibilidad que pretende explicar."
  },
  {
    "kind": "paragraph",
    "text": "La correlación de un extremo a otro debe utilizar un identificador creado o validado al principio de la política y propagado al backend. Los registros de la API Gateway deben registrar la API, la operación, el cliente, el asunto cuando está permitido, el grupo, la instancia, el backend, el estado, la latencia y el motivo del error. Para la investigación de seguridad, conserve los eventos administrativos, los cambios de configuración y las autenticaciones de consola."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - Cada fuente responde a una pregunta operativa diferente.",
    "headers": [
      "Fuente",
      "Granularidad",
      "Uso"
    ],
    "rows": [
      [
        "Registro de seguimiento",
        "Detalles de ejecución y diagnóstico.",
        "Investigar políticas, filtros y excepciones."
      ],
      [
        "Traffic Monitor",
        "Transacción y mensaje según configuración.",
        "Reconstruir llamadas y respuestas."
      ],
      [
        "Métricas",
        "Agregados temporales.",
        "Capacidad, SLA y tendencias."
      ],
      [
        "Registros de auditoría/administración",
        "Acciones de gestión.",
        "Gobernanza e investigación."
      ],
      [
        "Abrir registro/SIEM",
        "Eventos exportados.",
        "Correlación y retención corporativa."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.16 Planificación del desempeño y la capacidad",
    "id": "23-16-planificacion-del-desempeno-y-la-capacidad"
  },
  {
    "kind": "paragraph",
    "text": "El rendimiento depende de la CPU, la memoria, la recolección de basura, los subprocesos, los sockets, el cifrado, el tamaño del mensaje, la complejidad de las políticas y la latencia de dependencia. Una política que solo valida un encabezado tiene un perfil diferente a una que realiza transformación XML, firma digital, llamada externa y registro detallado. La planificación de la capacidad debe utilizar una carga de trabajo representativa, no sólo solicitudes abstractas por segundo."
  },
  {
    "kind": "paragraph",
    "text": "Los filtros de red síncronos aumentan la latencia y consumen recursos mientras se espera. Las consultas de KPS y Cassandra necesitan índices y proximidad. Las grandes transformaciones pueden requerir almacenamiento en búfer. El cifrado asimétrico y el protocolo de enlace TLS son más costosos que la reutilización de la conexión. El análisis de rendimiento necesita descomponer el tiempo dentro de la API Gateway y el tiempo dedicado a servicios externos."
  },
  {
    "kind": "paragraph",
    "text": "El ajuste sin evidencia puede empeorar el sistema. Aumentar demasiado el montón prolonga las pausas; aumentar los hilos puede aumentar la contención; La ampliación de los grupos puede ejercer presión sobre los backends y SNAT. El proceso correcto establece una línea de base, mide percentiles, identifica un cuello de botella, cambia una variable y repite la prueba. Las configuraciones de seguimiento y Monitor de tráfico deben incluirse en los escenarios, porque cambian el costo del runtime."
  },
  {
    "kind": "table",
    "caption": "Tabla 9: La planificación de capacidad requiere métricas y dependencias de runtime.",
    "headers": [
      "Dimensión",
      "Métrica",
      "Interpretación"
    ],
    "rows": [
      [
        "CPU",
        "usar, hacer cola, robar.",
        "Políticas computacionales y criptografía."
      ],
      [
        "Memoria",
        "montón, GC, RSS.",
        "Buffering, fugas y volumen de objetos."
      ],
      [
        "Conexiones",
        "activo, grupo, errores.",
        "TCP/TLS y capacidad de backend."
      ],
      [
        "Latencia",
        "p50, p95, p99.",
        "Colas lentas y dependencias."
      ],
      [
        "tiendas",
        "latencia y error de KPS/Cassandra.",
        "Impacto de la persistencia en la política."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.17 Contenedores, Kubernetes y OpenShift",
    "id": "23-17-contenedores-kubernetes-y-openshift"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway se puede implementar en arquitecturas en contenedores, incluidos Kubernetes y OpenShift, siguiendo las referencias de productos. La creación de contenedores no elimina los conceptos de dominio, configuración, secretos, persistencia y HA. La diferencia es que las instancias se vuelven efímeras, escaladas por el orquestador y sujetas a sondeos, solicitudes, límites, volúmenes y mecanismos de distribución de configuración."
  },
  {
    "kind": "paragraph",
    "text": "Las imágenes deben ser inmutables y las configuraciones deben promoverse de forma reproducible. Los certificados y credenciales deben ingresarse mediante secretos o integraciones de bóveda, no escritos en la imagen. La preparación debe confirmar que la API Gateway está realmente lista para recibir tráfico; liveness no puede reiniciar el pod debido a la lentitud transitoria de un backend. El período de gracia de preparada y terminación ayuda a drenar las conexiones."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra y los bancos métricos requieren su propio diseño y no deben tratarse como detalles del grupo. Escalar la API Gateway sin respetar los límites de dependencia solo puede aumentar la presión. En OpenShift, las SCC, las rutas, los servicios, las políticas de red, el almacenamiento y la observabilidad deben estar alineados con las políticas corporativas y de referencia."
  },
  {
    "kind": "subhead",
    "text": "Atención en contenedores"
  },
  {
    "kind": "paragraph",
    "text": "El ajuste de escala automático de pod horizontal solo de CPU puede reaccionar tarde a la latencia o las conexiones del backend. Combine métricas comerciales, conexiones, colas y capacidad de los sistemas dependientes. Ampliar la API Gateway no crea capacidad en el núcleo bancario."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.18 Seguridad y refuerzo administrativo",
    "id": "23-18-seguridad-y-refuerzo-administrativo"
  },
  {
    "kind": "paragraph",
    "text": "El plano administrativo deberá estar aislado del tráfico público. Los puertos ANM, los administradores de nodos y las consolas no deben estar expuestos a Internet. RBAC debe separar el desarrollo de políticas, la implementación, la operación, la auditoría y la administración de seguridad. Las cuentas compartidas comprometen la trazabilidad. Las credenciales y los secretos predeterminados de los archivos deben eliminarse o protegerse según la versión."
  },
  {
    "kind": "paragraph",
    "text": "El refuerzo incluye parches, versiones compatibles, TLS administrativo, rotación de certificados, protección de archivos, least privilege del sistema operativo, limitación del acceso a Cassandra y a los bancos, copia de seguridad cifrada e integración SIEM. Se deben inventariar las configuraciones personalizadas para que no desaparezcan ni se rompan durante las actualizaciones."
  },
  {
    "kind": "paragraph",
    "text": "La actualización es un proyecto de compatibilidad. Es necesario evaluar políticas personalizadas, scripts, filtros, bibliotecas, controladores, HSM, Cassandra, base de datos de métricas y sistema operativo. El entorno debe probarse con tráfico y reversión realistas. Mantener una versión antigua sin soporte aumenta los riesgos de seguridad y dificulta la integración con dependencias modernas."
  },
  {
    "kind": "table",
    "caption": "Tabla 10: El hardening combina producto, sistema operativo, red y proceso.",
    "headers": [
      "controlar",
      "Objetivo",
      "evidencia"
    ],
    "rows": [
      [
        "RBAC",
        "Mínimo privilegio administrativo.",
        "Perfiles, grupos y revisión periódica."
      ],
      [
        "Segregación de red",
        "Puertos de gestión seguros.",
        "Cortafuegos, rutas y bastión."
      ],
      [
        "Gestión de secretos",
        "Evite la exposición en el proyecto y los registros.",
        "Bóveda, alias y rotación."
      ],
      [
        "Parche/actualización",
        "Corrija vulnerabilidades y mantenga el soporte.",
        "Inventario y calendario."
      ],
      [
        "Auditoría",
        "Seguimiento de cambios y accesos.",
        "Registros inmutables y SIEM."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.19 Troubleshooting orientada a capas",
    "id": "23-19-troubleshooting-orientada-a-capas"
  },
  {
    "kind": "paragraph",
    "text": "Una investigación eficiente comienza por clasificar el problema. Si el nombre no se resuelve, la póliza aún no ha participado. Si TCP no se establece, examine la ruta, el firewall y el oyente. Si TLS falla, examine el certificado, el SNI y la confianza. Si la solicitud ingresa a Traffic Monitor y no pasa un filtro, analice el contexto del mensaje y la ruta de la política. Si el filtro de enrutamiento se inicia y el backend no responde, continúe con la conexión saliente."
  },
  {
    "kind": "paragraph",
    "text": "El punto de observación es imprescindible. Los registros de consumidor, equilibrador, API Gateway externa, API Gateway interna y backend describen diferentes conexiones. NAT y proxies cambian IP y puerto. La marca de tiempo debe estar sincronizada. Se debe conservar el ID de correlación. Sin estos elementos, los equipos pueden comparar transacciones dispares y concluir incorrectamente que la API Gateway perdió un mensaje."
  },
  {
    "kind": "paragraph",
    "text": "Evite habilitar el seguimiento máximo en todo el clúster durante el pico. Reproducir en un entorno controlado o limitar por instancia y ventana. Recopile la configuración de políticas, la versión implementada, el grupo, la instancia, los registros, las métricas, la captura cuando esté autorizado y la evidencia del backend. Luego, formule hipótesis comprobables en lugar de cambiar varios tiempos de espera simultáneamente."
  },
  {
    "kind": "table",
    "caption": "Tabla 11: El diagnóstico por capas reduce el ensayo y error.",
    "headers": [
      "paso",
      "prueba",
      "Interpretación"
    ],
    "rows": [
      [
        "DNS",
        "Resuelva el frontend y el backend en el host de la API Gateway.",
        "Nombre, dividir DNS y caché."
      ],
      [
        "tcp",
        "Pruebe la conexión a los puertos requeridos.",
        "Ruta, firewall y oyente."
      ],
      [
        "TLS",
        "Inspeccionar el apretón de manos y la cadena.",
        "Confianza, SNI, nombre de host y mTLS."
      ],
      [
        "Política",
        "Encuentra el filtro y la ruta ejecutada.",
        "Contexto, condición y excepción."
      ],
      [
        "backend",
        "Correlacionar la llamada entrante.",
        "La API Gateway llamó o finalizó antes de tiempo."
      ],
      [
        "persistencia",
        "Consulta KPS, Cassandra y métricas.",
        "Dependencia externa del flujo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.20 Estudios de caso",
    "id": "23-20-estudios-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: 502 intermitente después de un aumento de tráfico. Traffic Monitor muestra que la política llega al filtro de enrutamiento, pero algunas conexiones se restablecen. Las métricas revelan la reutilización de conexiones mantenidas durante más tiempo que el tiempo de inactividad del backend. La solución alinea la validación de mantenimiento y de grupo; aumentar el tiempo de espera de lectura no resolvería la causa."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: Policy Studio no se implementa, pero las API continúan respondiendo. El error está restringido al puerto administrativo entre la estación y el administrador del nodo de administración. El oyente empresarial está sano. La separación de planes evita una mayor indisponibilidad y dirige la investigación al firewall, certificado administrativo y servicio ANM."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: el registro de una nueva aplicación falla en API Manager mientras las API existentes permanecen activas. Cassandra introduce latencia y nodos no disponibles. El runtime ya tiene datos cargados, pero el plano de administración no puede persistir en la operación. El incidente requiere un equipo de banca distribuida, no un cambio en la política frontal."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 4: después de la rotación de certificados salientes, solo falla un nodo. El equilibrador distribuye llamadas entre dos instancias y la falla parece aleatoria. La comparación muestra el almacén de confianza o el alias no actualizado en la configuración efectiva de un miembro del grupo. La solución es arreglar la promoción y validar la coherencia entre instancias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway organiza el runtime y la administración entre dominios, grupos, instancias, administradores de nodos y un administrador de nodos central. Policy Studio modela la configuración; API Gateway Manager proporciona operación y observabilidad; Las instancias de API Gateway ejecutan escuchas, circuitos de políticas y enrutamiento. API Manager agrega administración de API y consumidores además de este runtime."
  },
  {
    "kind": "paragraph",
    "text": "El funcionamiento de una llamada depende del contexto del mensaje, los filtros, las tiendas, la red, TLS, la identidad y los servidores. KPS, Cassandra y los bancos de métricas tienen propósitos diferentes y no deben tratarse como un repositorio único. La implementación, HA, múltiples DC y contenedores requieren una configuración reproducible y una separación clara entre el plano administrativo y el tráfico empresarial."
  },
  {
    "kind": "paragraph",
    "text": "Operar la plataforma de forma segura requiere RBAC, segregación de puertos administrativos, gestión de certificados, observabilidad controlada, planificación de capacidad y actualización disciplinada. La retroubleshooting debe seguir las capas y los puntos de observación, preservando la identificación de correlación y la evidencia de cada componente."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en Azure API Management (APIM), permitiéndole comparar una plataforma gestionada en la nube con la arquitectura y el funcionamiento estudiados en Axway API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación operativa",
    "id": "lista-de-verificacion-operativa"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "El dominio, los grupos, las instancias, los administradores de nodos y los ANM están documentados e inventariados.",
      "Los puertos administrativos están segregados y protegidos por RBAC y la red de gestión.",
      "Las políticas tienen contratos de atributos de propiedad, control de versiones, pruebas y contexto de mensajes.",
      "Los datos de configuración y entorno están separados y canalizados.",
      "KPS, Cassandra y base de datos de métricas cuentan con monitoreo, respaldo y capacidad.",
      "Los controles de estado verifican la preparación real sin sobrecargar las dependencias.",
      "Los TLS entrantes, salientes y administrativos tienen almacenes de confianza controlados y rotativos.",
      "Los pools, los tiempos de espera, los reintentos y los disyuntores respetan la semántica de las operaciones.",
      "Traffic Monitor y el seguimiento tienen scope, enmascaramiento y retención definidos.",
      "La capacidad se probó con percentiles representativos de carga de trabajo y latencia.",
      "Los contenedores tienen la preparación, la vivacidad, el drenaje, los secretos y los límites adecuados.",
      "Las actualizaciones incluyen políticas personalizadas, controladores, HSM, tiendas y reversión.",
      "Los runbooks de troubleshooting separan DNS, TCP, TLS, políticas, backend y persistencia."
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
      "Dibujar un dominio con dos grupos y dos instancias por grupo, indicando ANM, Administradores de Nodos y flujos administrativos.",
      "Crear una política conceptual de autenticación, autorización, KPS, enrutamiento y errores; documentar los atributos producidos y consumidos.",
      "Simule la falla de ANM y explique qué puede continuar funcionando en runtime.",
      "Diferenciar una falla de Cassandra en API Manager de una falla de conexión saliente al backend.",
      "Proponer una estrategia de implementación sin tiempo de inactividad para un grupo con cuatro instancias.",
      "Enumere evidencia para investigar un 502 intermitente en un solo nodo.",
      "Diseñar topología de zona externa/interna con distintas responsabilidades.",
      "Explique cómo validar la rotación de certificados mTLS entrantes y salientes.",
      "Proponer un conjunto mínimo de métricas para la planificación de la capacidad de la API Gateway.",
      "Describa cómo migrar la plataforma a OpenShift sin incorporar secretos en la imagen."
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
    "caption": "Tabla 12 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Node Manager de administración (ANM)",
        "Componente de administración central para un dominio API Gateway."
      ],
      [
        "API Gateway Manager",
        "Consola web para administración, monitoreo, logs y topología."
      ],
      [
        "API Manager",
        "Capa de gestión de API, aplicaciones, consumidores y publicaciones en la API Gateway."
      ],
      [
        "Dominio",
        "Frontera administrativa que agrupa a grupos e instancias."
      ],
      [
        "Filtrar",
        "Unidad de procesamiento utilizada en un circuito de pólizas."
      ],
      [
        "grupo",
        "Unidad lógica, por ejemplo, implementación y administración."
      ],
      [
        "instancia",
        "Proceso API Gateway que ejecuta el tráfico."
      ],
      [
        "KPS",
        "Key Property Store consultado por políticas para obtener datos auxiliares."
      ],
      [
        "Contexto del mensaje",
        "Conjunto de atributos y mensajes mantenidos durante la transacción."
      ],
      [
        "Node Manager",
        "Componente de gestión de instancias y servicios en un nodo o grupo."
      ],
      [
        "Circuito de políticas",
        "Flujo de filtros conectados por rutas de éxito y fracaso."
      ],
      [
        "Policy Studio",
        "Herramienta de desarrollo y configuración de API Gateway."
      ],
      [
        "Traffic Monitor",
        "Vista de tráfico y transacciones disponible en API Gateway Manager."
      ],
      [
        "API virtualizada",
        "API publicada y mediada por API Manager/API Gateway."
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
      "Documentación Axway. Grupos y dominios de API Gateway.",
      "Documentación Axway. Configure la alta disponibilidad de Admin Node Manager.",
      "Documentación Axway. Administrar API Gateway y gestionar operaciones.",
      "Documentación Axway. Desarrollar políticas y configuración de Policy Studio.",
      "Documentación Axway. Descripción general y configuración de Key Property Store.",
      "Documentación Axway. Monitoreo, Monitor de Tráfico, registro y métricas.",
      "Documentación Axway. Configure API Manager y virtualice las API.",
      "Documentación Axway. Administrador Apache Cassandra para API Management.",
      "Documentación Axway. Configuración multicentro de datos de API Management.",
      "Documentación Axway. Arquitecturas de referencia de contenedores para Kubernetes y OpenShift.",
      "Documentación Axway. Ajuste del rendimiento y requisitos del sistema."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de lanzamiento"
  },
  {
    "kind": "paragraph",
    "text": "El producto evoluciona a través de lanzamientos y parches. Antes de aplicar comandos, puertos, parámetros o procedimientos validar la documentación oficial correspondiente a la versión instalada, sistema operativo, banco, modo de implementación y componentes licenciados en el entorno."
  }
];
