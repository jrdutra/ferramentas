import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const SERVICE_MESH_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Malla de servicios: una capa de comunicación entre cargas de trabajo"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/overview.svg",
    "alt": "Plano de control que distribuye identidades, rutas y políticas a servidores proxy entre servicios.",
    "caption": "Figura de apertura: la malla de servicios introduce una capa operativa uniforme entre los servicios."
  },
  {
    "kind": "paragraph",
    "text": "El plano de datos aplica controles de forma transparente al tráfico de este a oeste."
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
    "text": "En capítulos anteriores, se estudió API Gateway como un punto controlado de exposición, autenticación, políticas y observabilidad del tráfico que entra o sale de un dominio. Sin embargo, en las arquitecturas de microservicios, gran parte de la comunicación ocurre dentro del entorno, entre cargas de trabajo que cambian de dirección, escalan horizontalmente y dependen de múltiples servicios. Aplicar manualmente TLS, reintentos, métricas, autorización y balanceo a cada aplicación genera duplicación, inconsistencia y altos costos de mantenimiento."
  },
  {
    "kind": "paragraph",
    "text": "Una malla de servicios crea una capa de infraestructura para manejar este tráfico de este a oeste. La idea central es separar la lógica empresarial de las funciones de comunicación. Los servidores proxy o componentes equivalentes interceptan conexiones, aplican políticas y producen telemetría. Un plano de control observa el entorno y distribuye la configuración a los componentes del plano de datos. De esta manera, la seguridad y el comportamiento de la red se pueden gestionar de forma relativamente uniforme sin incorporar una biblioteca específica en cada idioma."
  },
  {
    "kind": "paragraph",
    "text": "Esta abstracción no elimina la red ni resuelve automáticamente todos los problemas distribuidos. Al contrario: añade componentes, certificados, reglas de enrutamiento y nuevas dependencias. Una configuración de reintento incorrecta puede multiplicar la carga; una política de autorización puede interrumpir el tráfico legítimo; un proxy puede enmascarar la fuente de latencia; y una actualización mal coordinada del plano de control puede producir divergencia de configuración. La adopción debe estar impulsada por problemas reales y acompañada de capacidad operativa."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo profundiza en los conceptos de malla de servicios y compara tres partes importantes del ecosistema. Istio ofrece un amplio plano de control y dos modelos de plano de datos: sidecar y ambiental. Linkerd enfatiza la simplicidad operativa y utiliza su propio microproxy escrito en Rust. Envoy es un proxy de alto rendimiento utilizado como plano de datos por Istio y varias plataformas, y también puede actuar en API Gateways y servidores proxy independientes."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada recurso en la malla, identifique dónde se declara la decisión, qué componente distribuye la configuración, dónde se ejecuta en la ruta del tráfico y qué evidencia respalda el comportamiento. Esta secuencia reduce los diagnósticos basados únicamente en manifiestos o paneles."
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
      "Explicar el problema que busca resolver una malla de servicios y sus costos arquitectónicos.",
      "Distinguir el tráfico norte-sur y este-oeste, más allá de los límites entre API Gateway y malla.",
      "Describir el plano de control, el plano de datos, el sidecar, el ztunnel y el waypoint proxy.",
      "Comprenda mTLS en cargas de trabajo, identidad de servicio y autorización basada en principales.",
      "Aplique división de tráfico, reintentos, tiempos de espera, interrupción de circuitos e inyección de fallas con sentido crítico.",
      "Interprete la arquitectura de Istio en modo sidecar y modo ambiental.",
      "Interpretar la arquitectura de Linkerd, sus microproxies y componentes de identidad y descubrimiento.",
      "Explique los oyentes, filtros, rutas, clústeres, endpoints y xDS en Envoy.",
      "Relacionar la malla de servicios con API Gateway, GAMMA, multiclúster y observabilidad.",
      "Diagnosticar fallas de inyección, mTLS, protocolo, ruta, política y capacidad."
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
      "29.1 El problema de la comunicación entre servicios; 29.2 ¿Qué es la malla de servicios? 29,3 Norte-sur x este-oeste; 29.4 Plano de control y plano de datos; 29.5 Intercepción de tráfico; 29.6 Identidad y mTLS; 29.7 Autorización; 29.8 Gestión del tráfico; 29.9 Resiliencia; 29.10 Observabilidad; 29.11 Istio; 29.12 Modo sidecar; 29.13 Modo ambiente; 29.14 Linkerd; 29.15 Enviado; 29,16xDS; 29.17 API y API Gateway GAMMA; 29.18 Multiclúster; 29.19 Salida; 29.20 Actuación; 29.21 Seguridad; 29.22 Operación y actualizaciones; 29.23 Troubleshooting; 29.24 Estudios de casos y laboratorios; resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.1 El problema de la comunicación entre servicios.",
    "id": "29-1-el-problema-de-la-comunicacion-entre-servicios"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación monolítica ejecuta llamadas internas dentro del mismo proceso. En una arquitectura distribuida, la llamada se convierte en comunicación de red y depende de DNS, sockets, equilibrio, TLS, tiempos de espera, colas, reintentos y observabilidad. La semántica de una función local no coincide con la semántica de una llamada remota: la respuesta puede retrasarse, la solicitud puede haberse procesado incluso si el cliente recibe un tiempo de espera y el destino puede cambiar durante la ejecución."
  },
  {
    "kind": "paragraph",
    "text": "Cuando cada equipo implementa estas preocupaciones en sus propias bibliotecas, surgen versiones divergentes, configuraciones incompatibles y dificultades de gobernanza. Un servicio Java puede utilizar una política de reintento diferente a la de un servicio Go; es posible que una carga de trabajo heredada no emita métricas; otro puede mantener certificados estáticos durante años. Mesh busca trasladar algunas de estas responsabilidades a la infraestructura, ofreciendo un comportamiento uniforme en todas las aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "El beneficio es mayor cuando hay muchos servicios, múltiples idiomas, un gran volumen de cambios y fuertes requisitos de identidad y observabilidad. En entornos pequeños, los gastos generales de instalación, operación y actualización de una malla pueden superar las ganancias. La decisión debe considerar la complejidad real, la madurez del equipo, la criticidad del tráfico y la capacidad de retroubleshooting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.2 ¿Qué es la malla de servicios?",
    "id": "29-2-que-es-la-malla-de-servicios"
  },
  {
    "kind": "paragraph",
    "text": "La malla de servicios es una capa dedicada a la comunicación entre servicios. No es un protocolo único y no reemplaza a Kubernetes, API Gateway o la lógica empresarial. En su forma más común, consta de un plano de datos distribuido y un plano de control. El plan de datos participa directamente en las conexiones; el plano de control calcula y distribuye el estado, las políticas y la identidad."
  },
  {
    "kind": "paragraph",
    "text": "La malla puede proporcionar descubrimiento de servicios, equilibrio, mTLS, autorización, reintentos, tiempos de espera, interrupción de circuitos, división de tráfico, telemetría e integración de seguimiento. No todas las implementaciones ofrecen todas las funciones y no todas las funciones deben habilitarse indiscriminadamente. Por ejemplo, los reintentos automáticos son útiles para fallas transitorias, pero peligrosos para operaciones no idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "La transparencia es una propiedad operativa, no una ausencia de efectos. Es posible que la aplicación no conozca el proxy, pero sufre los tiempos de espera, reinicios, headers, latencia y políticas que aplica. Por lo tanto, la arquitectura, el SRE y el desarrollo necesitan compartir un modelo mental del camino real de la solicitud."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/figure-01-control-data-plane.svg",
    "alt": "Separación entre el plano de control de la malla de servicios y el plano de datos",
    "caption": "Figura 1 - El plan de control distribuye decisiones; el plano de datos aplica estas decisiones al tráfico."
  },
  {
    "kind": "paragraph",
    "text": "El tráfico norte-sur cruza el borde del entorno: consumidor externo a API Gateway, ingreso o aplicación. El tráfico este-oeste se produce entre servicios dentro del entorno o entre dominios internos. API Gateway centra la exposición, los productos, los consumidores, la autenticación de clientes, las cuotas y la transformación en el borde. La malla de servicios concentra la comunicación entre cargas de trabajo, identidad de servicio, telemetría y política distribuida."
  },
  {
    "kind": "paragraph",
    "text": "Las fronteras pueden superponerse. Istio y Envoy también pueden implementar API Gateways de entrada y salida. Una API Gateway puede estar dentro de la malla y recibir mTLS como cualquier carga de trabajo. El error arquitectónico es suponer que una tecnología reemplaza automáticamente a otra. La pregunta correcta es qué plan de gobernanza, qué audience y qué tipo de contrato controla cada componente."
  },
  {
    "kind": "paragraph",
    "text": "En una plataforma bancaria, por ejemplo, APIM o Axway pueden autenticar la aplicación y aplicar cuotas al tráfico externo, mientras que mesh autentica la API Gateway como una carga de trabajo y controla qué servicios internos se pueden llamar. La identidad del usuario y la identidad de la carga de trabajo son contextos distintos y es posible que sea necesario propagarlas simultáneamente."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Gateway y mesh pueden coexistir con responsabilidades complementarias.",
    "headers": [
      "Componente",
      "Enfoque principal",
      "Ejemplos de responsabilidad"
    ],
    "rows": [
      [
        "API Gateway",
        "Exposición y gobernanza de API.",
        "Productos, consumidores, OAuth, cuotas, transformación y portal."
      ],
      [
        "Ingress Gateway",
        "Entrada de tráfico al cluster.",
        "TLS, host, ruta y enrutamiento inicial."
      ],
      [
        "Service Mesh",
        "Comunicación este-oeste.",
        "mTLS, política de carga de trabajo, reintentos, telemetría y división de tráfico."
      ],
      [
        "Egress Gateway",
        "Salida controlada.",
        "Política, fiscalización y origen estable a destinos externos."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "El plano de datos necesita ejecutar decisiones con baja latencia y alta disponibilidad. Intercepta conexiones, reconoce protocolos, selecciona destinos, establece TLS, aplica filtros y exporta métricas. Al participar en cada solicitud, los fallos de CPU, memoria, configuración o actualización en el plano de datos afectan directamente al tráfico."
  },
  {
    "kind": "paragraph",
    "text": "El plano de control analiza servicios, endpoints, identidades y recursos declarativos. A partir de ahí, produce la configuración para los servidores proxy. En Istio, istiod consolida el descubrimiento, la configuración y la emisión de identidades. En Linkerd, servicios como el destino y la identidad cumplen roles específicos. En el ecosistema Envoy, los planos de control utilizan API xDS para publicar escuchas, rutas, clústeres, endpoints y secretos."
  },
  {
    "kind": "paragraph",
    "text": "La separación reduce la dependencia del plano de control durante cada solicitud. Los servidores proxy normalmente continúan usando la última configuración buena conocida si el plano de control deja de estar disponible temporalmente. Sin embargo, los cambios en los endpoints, los certificados o las políticas ya no se propagan. Por lo tanto, el estado del plano de control y la convergencia del plano de datos deben monitorearse por separado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.5 Intercepción de tráfico: sidecar, CNI y planos de datos por nodo",
    "id": "29-5-intercepcion-de-trafico-sidecar-cni-y-planos-de-datos-por-nodo"
  },
  {
    "kind": "paragraph",
    "text": "En el modelo sidecar, cada módulo recibe un proxy adicional. Las reglas de iptables o eBPF redirigen el tráfico entrante y saliente a este proxy. El beneficio es el aislamiento por carga de trabajo y la capacidad L7 cerca de la aplicación. El costo incluye CPU y memoria por módulo, mayor tiempo de inicio, necesidad de inyección y coordinación del ciclo de vida entre la aplicación y el proxy."
  },
  {
    "kind": "paragraph",
    "text": "Un complemento CNI puede instalar reglas de redirección fuera del contenedor de inicio, lo que reduce los privilegios en el pod. Aún así, el operador necesita conocer los puertos excluidos, las sondas, el tráfico del propio proxy y las condiciones bajo las cuales una conexión pasa por alto la malla. Marcar un espacio de nombres como inyectado no prueba que todos los pods actuales hayan sido excluidos; Es necesario recrear los pods existentes."
  },
  {
    "kind": "paragraph",
    "text": "En el modelo ambiental de Istio, un ztunnel por nodo proporciona conectividad segura y políticas L4. Las cargas de trabajo que necesitan recursos L7 pueden utilizar servidores proxy de waypoint basados en Envoy. Esto reduce la necesidad de un sidecar en cada módulo, pero introduce otra topología operativa y requiere comprender qué controles se aplican al túnel z y cuáles dependen del punto de referencia."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/figure-02-sidecar-ambient.svg",
    "alt": "Modelos ambientales y sidecar del plan de datos de Istio",
    "caption": "Figura 2: Istio ofrece sidecars por módulo o un plan de datos ambientales dividido en L4 y L7."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.6 Identidad de carga de trabajo y mTLS automático",
    "id": "29-6-identidad-de-carga-de-trabajo-y-mtls-automatico"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad de una malla comienza con la identidad de la carga de trabajo. En lugar de confiar simplemente en la dirección IP, el proxy presenta un certificado vinculado a una identidad ambiental, a menudo derivada del espacio de nombres y ServiceAccount. El par valida la cadena, el nombre esperado y las políticas asociadas. De esta manera, la autorización puede seguir siendo válida incluso cuando cambie la dirección del pod."
  },
  {
    "kind": "paragraph",
    "text": "mTLS proporciona confidencialidad, integridad y autenticación mutua entre servidores proxy. Por sí solo, no prueba qué usuario final inició la operación. Para preservar el contexto empresarial, el servicio puede continuar validando access tokens, claims u otros elementos de identidad. La malla protege la comunicación e identifica la carga de trabajo; la aplicación decide qué puede hacer ese usuario o proceso en el dominio."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones de certificados requieren atención a las anclas de confianza, los issuers, la duración, la renovación y el reloj. Linkerd, por ejemplo, vincula certificados a ServiceAccount y utiliza certificados de corta duración en servidores proxy. Istio puede emitir identidades utilizando su CA o integrarse con una PKI externa. En multiclúster, la estrategia de confianza determina qué identidades se reconocen en todos los entornos."
  },
  {
    "kind": "subhead",
    "text": "mTLS no es una autorización completa"
  },
  {
    "kind": "paragraph",
    "text": "Una conexión autenticada le indica quién es la carga de trabajo remota. Aún necesita declarar qué identidades pueden acceder a qué servicio, puerto, método o ruta. Sin una política de autorización, el cifrado puede proteger el tráfico no autorizado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.7 Autorización de servicio y política L4/L7",
    "id": "29-7-autorizacion-de-servicio-y-politica-l4-l7"
  },
  {
    "kind": "paragraph",
    "text": "Las políticas L4 evalúan propiedades como la identidad de origen, el espacio de nombres, el puerto y el protocolo de transporte. Son eficientes y funcionan incluso cuando el proxy no interpreta HTTP. Las políticas L7 pueden considerar método, ruta, host, headers y claims. Este nivel ofrece mayor granularidad, pero depende del conocimiento del protocolo y de un componente capaz de ejecutar filtros de aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "En el entorno Istio, la autorización L4 se puede aplicar en ztunnel, mientras que las reglas L7 dependen del punto de referencia. En el modo sidecar, el Envoy del pod realiza ambos niveles. En Linkerd, el proxy entrante aplica políticas de autorización y los recursos de políticas pueden definir servidores, rutas e identidades permitidas. El diseño debe comenzar con la denegación predeterminada para superficies sensibles y excepciones explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Una política incorrecta puede crear una indisponibilidad total. Por lo tanto, la implementación gradual, el modo de auditoría cuando esté disponible, las pruebas de integración y las métricas de denegación son esenciales. La regla debe revisarse junto con el contrato de aplicación: permitir GET en una ruta no equivale a autorizar cualquier operación comercial accesible a través de esa ruta."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.8 Gestión del tráfico y entrega progresiva",
    "id": "29-8-gestion-del-trafico-y-entrega-progresiva"
  },
  {
    "kind": "paragraph",
    "text": "La malla puede dividir el tráfico entre versiones, aplicar canary, mirroring, afinidad, enrutamiento de encabezado y selección basada en identidad. Estas capacidades ayudan a realizar una entrega progresiva sin incorporar lógica de enrutamiento en cada aplicación. El plano de control convierte la regla declarativa en una configuración distribuida a los proxies."
  },
  {
    "kind": "paragraph",
    "text": "La división del tráfico debe considerar el equilibrio y la persistencia de las unidades. Una regla 90/10 normalmente distribuye solicitudes, no usuarios ni transacciones comerciales. En conexiones largas, streaming HTTP/2 o gRPC, pocas conexiones pueden concentrar mucho tráfico. Se deben analizar las métricas por solicitud y por conexión antes de concluir que la división ha alcanzado el ratio planificado."
  },
  {
    "kind": "paragraph",
    "text": "Además, el enrutamiento de headers puede crear dependencia de metadata que trascienden los límites de confianza. Los headers utilizados para canary o tenant deben ser producidos por componentes validados o confiables. Permitir que cualquier cliente elija una versión privilegiada puede eludir los controles de implementación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/figure-03-traffic-management.svg",
    "alt": "Gestión del tráfico transformando la regla declarativa en división ponderada",
    "caption": "Figura 3: La intención declarativa solo produce el resultado esperado cuando el proxy tiene endpoints y métricas correctos."
  },
  {
    "kind": "paragraph",
    "text": "El tiempo de espera define cuánto tiempo la persona que llama acepta esperar. Reintentar crea un nuevo intento después de un error considerado transitorio. El corte de circuito limita las conexiones, solicitudes pendientes o errores para evitar la saturación. La inyección de fallas introduce un retraso o una falla controlada para probar la resiliencia. Estos mecanismos son poderosos, pero interactúan de forma no lineal."
  },
  {
    "kind": "paragraph",
    "text": "Un reintento configurado en el cliente, el proxy sidecar y la API Gateway puede multiplicar los intentos. Tres capas con dos reintentos adicionales pueden producir hasta veintisiete ejecuciones en una cadena de tres servicios. Por lo tanto, los presupuestos de reintento, la idempotencia, los plazos propagados y la observabilidad tentativa son esenciales. El punto de reintento debe elegirse conscientemente."
  },
  {
    "kind": "paragraph",
    "text": "Los disyuntores proxy protegen los recursos de transporte, pero no reemplazan los límites comerciales ni los mecanismos de cola. La inyección de fallos debe restringirse a entornos, usuarios o porcentajes controlados. Una regla amplia en producción puede simular una falla real y dificultar la distinción entre experimento e incidente."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: La resiliencia requiere límites coordinados entre la aplicación, la API Gateway y la malla.",
    "headers": [
      "Mecanismo",
      "Objetivo",
      "Riesgo de configuración incorrecta"
    ],
    "rows": [
      [
        "Tiempo de espera",
        "Limita las esperas y libera recursos.",
        "Un plazo breve interrumpe las operaciones válidas; A largo plazo se amplifican las colas."
      ],
      [
        "Reintentar",
        "Recuperar fallas transitorias.",
        "Tormenta de intentos y duplicación de operaciones."
      ],
      [
        "ruptura de circuito",
        "Contienen saturación y fallos en cascada.",
        "Rechazos prematuros o estado divergente entre apoderados."
      ],
      [
        "Inyección de fallas",
        "Validar la resiliencia.",
        "Impacto no deseado en el tráfico real."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.10 Observabilidad: métricas, registros y seguimiento",
    "id": "29-10-observabilidad-metricas-registros-y-seguimiento"
  },
  {
    "kind": "paragraph",
    "text": "A medida que el proxy observa el tráfico de manera uniforme, la malla puede producir métricas para la tasa de solicitudes, la tasa de errores, la latencia, los bytes, las conexiones y el estado de TLS sin modificar cada aplicación. Esta uniformidad es valiosa en entornos multilingües. Sin embargo, el proxy ve el protocolo y el transporte, no necesariamente la semántica completa del negocio."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas deben distinguir entre el reportero de origen y el de destino, la carga de trabajo, el espacio de nombres, la ruta y la respuesta. Una cardinalidad excesiva puede hacer que el sistema de métricas sea costoso o inestable. Los registros de acceso son útiles para una investigación detallada, pero pueden contener tokens confidenciales, ID personales y cargas útiles si los formatos no están controlados."
  },
  {
    "kind": "paragraph",
    "text": "El seguimiento distribuido normalmente depende de la propagación del contexto en la aplicación. El proxy puede generar intervalos y medir la comunicación, pero no puede inferir por sí solo la relación entre llamadas asincrónicas o tareas internas. El diseño ideal combina extensiones de aplicaciones con extensiones de infraestructura, utilizando ID de correlación consistentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.11 Istio: arquitectura y componentes",
    "id": "29-11-istio-arquitectura-y-componentes"
  },
  {
    "kind": "paragraph",
    "text": "Istio separa lógicamente el plano de datos y el plano de control. En el modo sidecar, los proxies de Envoy se inyectan en pods y median en el tráfico. istiod observa los recursos de Kubernetes y las configuraciones de malla, realiza el descubrimiento de servicios, convierte reglas en configuración xDS y participa en la emisión de identidades a los servidores proxy."
  },
  {
    "kind": "paragraph",
    "text": "Históricamente, funciones como VirtualService y DestinationRule se han utilizado para políticas de enrutamiento y destino. La adopción de la API de Kubernetes Gateway aumenta la estandarización de los recursos de entrada y de malla. Independientemente de la API declarativa, el operador debe verificar la configuración realmente recibida por Envoy: clústeres, rutas, oyentes y endpoints."
  },
  {
    "kind": "paragraph",
    "text": "Istio ofrece gateways de entrada y salida, integración con telemetría, autorización, extensión por filtros y Wasm y modelos de implementación multiclúster. Esta amplitud aporta flexibilidad y también una gran superficie operativa. Los perfiles, las revisiones del plano de control y las actualizaciones canarias ayudan a reducir el riesgo de actualización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.12 Modo sidecar de Istio",
    "id": "29-12-modo-sidecar-de-istio"
  },
  {
    "kind": "paragraph",
    "text": "En el modo sidecar, cada carga de trabajo mallada recibe un Envoy. El proxy saliente resuelve destinos, aplica rutas y políticas y abre una conexión con el proxy entrante del destino. El proxy entrante valida la identidad y aplica la autorización. Como cada pod tiene un plano de datos dedicado, los recursos y extensiones L7 se pueden aplicar de manera granular."
  },
  {
    "kind": "paragraph",
    "text": "El costo operativo aparece en memoria total, CPU, tiempo de inicio, número de conexiones al plano de control y coordinación de apagado. La aplicación puede iniciarse antes de que el proxy esté listo o finalizar antes de agotar las conexiones. Los enlaces del ciclo de vida, las sondas y las configuraciones de holdApplicationUntilProxyStarts deben evaluarse según el entorno."
  },
  {
    "kind": "paragraph",
    "text": "La inyección automática depende de etiquetas o anotaciones y de un webhook de admisión. Las fallas del webhook pueden impedir la creación de pods. Eliminar puertos incorrectamente puede omitir mTLS o generar bucles. Por lo tanto, una verificación de la disponibilidad de la malla debe observar tanto la cápsula de aplicación como la presencia y estado del sidecar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.13 Modo ambiental de Istio: ztunnel y waypoint",
    "id": "29-13-modo-ambiental-de-istio-ztunnel-y-waypoint"
  },
  {
    "kind": "paragraph",
    "text": "El modo ambiental busca reducir la necesidad de sidecars por carga de trabajo. Un ztunnel ejecutado por nodos captura el tráfico de las cargas de trabajo suscritas a la malla y proporciona mTLS, identidad, telemetría y política L4. Cuando una aplicación necesita enrutamiento, autorización u observabilidad L7, se puede asociar un punto de referencia proxy basado en Envoy con el servicio o identidad relevante."
  },
  {
    "kind": "paragraph",
    "text": "La división L4/L7 le permite adoptar seguridad básica a un costo menor por módulo y agregar funciones avanzadas solo cuando sea necesario. Sin embargo, la troubleshooting cambia: la ruta puede pasar por el ztunnel de origen, el punto de referencia y el ztunnel de destino. Es necesario identificar qué componente debe procesar la política y dónde se interrumpió la conexión."
  },
  {
    "kind": "paragraph",
    "text": "Sidecar y ambient pueden coexistir en la misma malla. Esta capacidad facilita la migración gradual, pero requiere probar flujos entre modos, políticas equivalentes y comportamiento de telemetría. Una carga de trabajo no debe inscribirse de manera ambigua simultáneamente en ambos modos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.14 Linkerd: arquitectura y principios",
    "id": "29-14-linkerd-arquitectura-y-principios"
  },
  {
    "kind": "paragraph",
    "text": "Linkerd también separa el plano de control y el plano de datos. Su plano de datos utiliza un microproxy transparente escrito en Rust, diseñado específicamente para la malla de servicios. El proxy se inyecta como sidecar, intercepta TCP y reconoce HTTP, HTTP/2, gRPC y WebSocket. El objetivo del proyecto es ofrecer recursos esenciales con un funcionamiento relativamente sencillo y un bajo consumo."
  },
  {
    "kind": "paragraph",
    "text": "En el plano de control, el servicio de destino proporciona descubrimiento, identidad del destino esperado, política e información de ruta. El servicio de identidad funciona como una autoridad certificadora y emite certificados a los servidores proxy. El inyector proxy modifica los pods marcados para inyección. Extensiones como viz agregan componentes de panel y observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "En una conexión en malla, el proxy saliente realiza descubrimiento, equilibrio de carga, reintentos y tiempos de espera; el proxy entrante aplica la autorización. mTLS es automático entre pods mallados, con certificados vinculados a ServiceAccount y renovados por el proxy. El operador aún debe ocuparse del ancla de confianza y la rotación de issuers y la confianza entre grupos."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La elección depende de los requisitos, la madurez y el modelo operativo.",
    "headers": [
      "Apariencia",
      "Istio",
      "Linkerd"
    ],
    "rows": [
      [
        "Plan de datos",
        "Envoy sidecar o ambiente con ztunnel/waypoint.",
        "Microproxy propio en Rust como sidecar."
      ],
      [
        "Plano de control",
        "istiod y componentes/API Gateways asociados.",
        "destino, identidad, inyector y extensiones."
      ],
      [
        "Alcance funcional",
        "Amplio conjunto de L4/L7 y extensibilidad.",
        "Énfasis en la simplicidad y las funciones esenciales."
      ],
      [
        "Adopción",
        "Gran flexibilidad y mayor superficie operativa.",
        "Menor complejidad inicial, con compensaciones de recursos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.15 Envoy: proxy, filtros y upstreams",
    "id": "29-15-envoy-proxy-filtros-y-upstreams"
  },
  {
    "kind": "paragraph",
    "text": "Envoy es un proxy de alto rendimiento escrito en C++ y diseñado para arquitecturas distribuidas. Puede actuar como sidecar, API Gateway, proxy de borde o plano de datos universal. En Istio, Envoy ejecuta gran parte de las políticas L4 y L7. Otros planos de control también lo utilizan a través de las API xDS."
  },
  {
    "kind": "paragraph",
    "text": "Un oyente acepta conexiones en una dirección y un puerto. Las cadenas de filtros eligen filtros de red y transporte según las propiedades de la conexión, como SNI. Para HTTP, el administrador de conexiones HTTP realiza filtrado, enrutamiento y observabilidad. Las rutas seleccionan hosts virtuales, clústeres y acciones. Los clústeres representan grupos lógicos de flujos ascendentes y los endpoints son las instancias reales."
  },
  {
    "kind": "paragraph",
    "text": "Envoy mantiene grupos de conexiones, realiza comprobaciones de estado, descubrimiento de servicios y equilibrio de carga. Funciones como la detección de valores atípicos, la interrupción del circuito, el administrador de sobrecarga y el drenaje son importantes en la producción. La flexibilidad de los filtros es poderosa, pero las extensiones Lua o Wasm deben tratarse como código confiable y estar sujetas a gobernanza."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/figure-04-envoy-model.svg",
    "alt": "Oyente, filtros, ruta y clúster en el modelo interno de Envoy",
    "caption": "Figura 4: El oyente, los filtros, la ruta y el clúster forman la ruta lógica de una solicitud en Envoy."
  },
  {
    "kind": "paragraph",
    "text": "xDS es el conjunto de API que se utilizan para configurar dinámicamente Envoy. LDS publica oyentes, RDS publica rutas, CDS publica clústeres, EDS publica endpoints y SDS publica secretos. El servicio de descubrimiento agregado le permite transportar varios tipos a través de una relación gRPC. El plano de control necesita mantener la versión, nonce, ACK/NACK y coherencia entre los recursos relacionados."
  },
  {
    "kind": "paragraph",
    "text": "La configuración dinámica evita reiniciar los servidores proxy con cada cambio, pero crea un sistema distribuido de convergencia. Un proxy puede rechazar una configuración no válida y continuar usando la anterior. Se deben monitorear los registros NACK y el estado de sincronización. Declarar un recurso en Kubernetes no garantiza que todos los servidores proxy hayan aplicado la versión esperada."
  },
  {
    "kind": "paragraph",
    "text": "Al solucionar problemas, resulta útil comparar la intención declarada, el estado calculado por el plano de control y la configuración del proxy real. Las herramientas de Istio como proxy-status y proxy-config materializan este enfoque. En los planos de control propios, las API administrativas de Envoy y los volcados de configuración cumplen una función similar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.17 API y API Gateway GAMMA para malla de servicios",
    "id": "29-17-api-y-api-gateway-gamma-para-malla-de-servicios"
  },
  {
    "kind": "paragraph",
    "text": "La API de Kubernetes Gateway se diseñó como una evolución de las API de ingreso y equilibrio de carga, con una separación explícita de roles. La iniciativa GAMMA extiende su uso a la malla de servicios. En lugar de asociar una ruta HTTP solo con una API Gateway norte-sur, una ruta de malla se puede asociar directamente con un servicio y controlar el tráfico de este a oeste."
  },
  {
    "kind": "paragraph",
    "text": "La estandarización reduce la dependencia de CRD específicos y facilita la portabilidad conceptual. Aún así, cada implementación tiene un nivel de cumplimiento y capacidades extendidas. El operador debe verificar qué campos pertenecen al canal Estándar, cuáles son Experimentales y qué comportamientos dependen de la malla utilizada."
  },
  {
    "kind": "paragraph",
    "text": "La API de API Gateway no elimina la necesidad de comprender el plano de datos. Estandariza la intención declarativa. El resultado sigue dependiendo del controlador, la traducción para la configuración del proxy y la convergencia de los endpoints."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de ruta mesh con API/GAMMA Gateway"
  },
  {
    "kind": "code",
    "text": "apiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: pedidos-canary\nspec:\n  parentRefs:\n  - group: \"\"\n    kind: Service\n    name: pedidos\n  rules:\n  - backendRefs:\n    - name: pedidos-v1\n      port: 8080\n      weight: 90\n    - name: pedidos-v2\n      port: 8080\n      weight: 10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.18 Multiclúster y múltiples redes",
    "id": "29-18-multicluster-y-multiples-redes"
  },
  {
    "kind": "paragraph",
    "text": "Una malla de múltiples clústeres necesita resolver el descubrimiento, la identidad, la conectividad y las políticas entre entornos. Los clústeres pueden compartir una red plana o requerir API Gateways para atravesar diferentes redes. El diseño también debe decidir si habrá un plano de control único, planos de control remoto primario o planos de control independientes con confianza federada."
  },
  {
    "kind": "paragraph",
    "text": "Compartir el ancla de confianza simplifica el reconocimiento de identidad pero amplía los límites de la confianza. Se pueden federar diferentes dominios de confianza con reglas explícitas. La conmutación por error entre clústeres debe considerar la coherencia de los datos, la latencia, la capacidad y el equilibrio de carga teniendo en cuenta la localidad. Redirigir el tráfico sin preparar las dependencias puede simplemente solucionar el problema."
  },
  {
    "kind": "paragraph",
    "text": "Linkerd ofrece componentes de múltiples clústeres y requiere una planificación de confianza entre clústeres. Istio admite varias topologías y API Gateways este-oeste. En ambos DNS, ServiceExport/ServiceImport, las rutas y el estado deben observarse juntos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/es/figure-05-multicluster.svg",
    "alt": "Malla de servicios que conecta servicios y API Gateways en múltiples clústeres",
    "caption": "Figura 5: El multiclúster agrega identidad, descubrimiento, conectividad y conmutación por error a la ecuación."
  },
  {
    "kind": "paragraph",
    "text": "El diseño de malla no debe ignorar el tráfico a bancos, SaaS y API externas. Una API Gateway de salida puede centralizar el origen, la política, el TLS y la auditoría de la red. El beneficio es mayor cuando los objetivos requieren una lista de IP permitidas o una inspección. El costo es crear un punto adicional de capacidad y disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Las entradas de servicios o recursos equivalentes registran destinos externos en el modelo de malla. Esto le permite aplicar enrutamiento y telemetría, pero no transforma un servicio externo en una carga de trabajo confiable. Los certificados, DNS y políticas de salida siguen siendo responsabilidad de la arquitectura."
  },
  {
    "kind": "paragraph",
    "text": "Bloquear cualquier destino desconocido reduce la exfiltración, pero puede romper las dependencias no inventariadas. La adopción segura comienza con la observación, el inventario y la clasificación, seguidos de una aplicación gradual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.20 Rendimiento, capacidad y coste",
    "id": "29-20-rendimiento-capacidad-y-coste"
  },
  {
    "kind": "paragraph",
    "text": "Mesh agrega procesamiento, conexiones, cifrado y telemetría. La latencia por salto puede ser pequeña, pero una cadena larga acumula costos. La CPU y la memoria dependen de la velocidad, el tamaño de la carga útil, el protocolo, la cantidad de rutas, las métricas, los registros de acceso y las extensiones. Los benchmarks genéricos no reemplazan las pruebas con el perfil real de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "En el modelo con sidecar el consumo se multiplica por el número de vainas. En ambiente, parte del costo se comparte por nodo y por punto de referencia. Esto cambia la unidad de planificación de capacidad. Los proxies también mantienen grupos y buffers; Los límites inadecuados pueden provocar OOM, limitación de la CPU o colas internas."
  },
  {
    "kind": "paragraph",
    "text": "El plano de control debe ampliarse con la cantidad de servidores proxy y cambios de configuración. Las actualizaciones masivas de endpoints pueden provocar picos de distribución. La fragmentación, las revisiones y la implementación controlada reducen el radio de explosión. Las métricas de tiempo de convergencia y tamaño de configuración ayudan a identificar el crecimiento insostenible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.21 Modelo de seguridad y amenazas",
    "id": "29-21-modelo-de-seguridad-y-amenazas"
  },
  {
    "kind": "paragraph",
    "text": "Mesh mejora la seguridad al proporcionar identidad y cifrado uniformes, pero también se convierte en una infraestructura crítica. Comprometer el plano de control puede permitir que se distribuyan rutas o políticas maliciosas. Poner en peligro las credenciales de CA puede afectar a toda la confianza. Las API administrativas, los webhooks, los secretos y las cuentas de servicio requieren mínimos privilegios y segmentación."
  },
  {
    "kind": "paragraph",
    "text": "Los servidores proxy procesan tráfico no confiable y extensiones configurables. Los filtros personalizados, Wasm y scripts deben tener cadena de suministro, revisión y firma. Los endpoints de depuración y los volcados de configuración pueden revelar nombres internos, rutas, certificados o headers. No deberían exponerse indiscriminadamente."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust en malla significa verificar la identidad, aplicar autorización explícita y mantener la telemetría, no solo habilitar mTLS. Las políticas deben restringir el movimiento lateral y separar espacios de nombres, entornos y dominios. La seguridad debe incluir el tráfico que evita el proxy, como sondas, puertos excluidos y redes de host."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.22 Operación, actualizaciones y gobernanza",
    "id": "29-22-operacion-actualizaciones-y-gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "Operar una malla requiere gestión de versiones del plano de control, servidores proxy y CRD. Las actualizaciones deben respetar las matrices de compatibilidad. Istio admite revisiones para ejecutar planos de control paralelos y migrar espacios de nombres gradualmente. Linkerd ofrece procedimientos de actualización y controles de estado. Standalone Envoy puede utilizar el reinicio en caliente o el drenaje según el modelo de implementación."
  },
  {
    "kind": "paragraph",
    "text": "GitOps ayuda a auditar los manifiestos, pero no reemplaza la validación del estado del runtime. Los controles de calidad pueden realizar pruebas de pelusa, ensayos, políticas y comparación de rutas. Los recursos compartidos necesitan una propiedad clara: la plataforma mantiene la malla; Los equipos de dominio mantienen rutas y políticas dentro de los límites gobernados."
  },
  {
    "kind": "paragraph",
    "text": "También se debe planificar la retirada de la malla. Desinyectar sidecars, eliminar CNI, eliminar CRD y cambiar las políticas de red fuera de orden pueden interrumpir el tráfico. Un plan de salida saludable demuestra que la aplicación no depende accidentalmente de un comportamiento no documentado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.23 Troubleshooting orientados a rutas reales",
    "id": "29-23-troubleshooting-orientados-a-rutas-reales"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico debe comenzar con la pregunta: ¿qué camino debe tomar la conexión? Identifique la aplicación de origen, el proxy saliente o ztunnel, el waypoint o API Gateway intermedia, el proxy entrante y la aplicación de destino. Luego verifique DNS, endpoints, sincronización de proxy, TLS, política, ruta, clúster, estado y respuesta de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Los errores 503 pueden significar endpoints faltantes, interrupción del circuito, reinicio ascendente, conexión rechazada o política. Los errores de TLS pueden deberse a un dominio de confianza, una identidad esperada, un certificado caducado o tráfico de texto sin formato. Un tiempo de espera puede estar en la aplicación, en el sidecar, en la API Gateway o en el sentido ascendente. El texto del error y el componente que lo produjo son pruebas esenciales."
  },
  {
    "kind": "paragraph",
    "text": "Compara los dos lados. Si el proxy de origen envió la solicitud pero el destino no registró la conexión, investigue la red y mTLS. Si el proxy entrante aceptó pero la aplicación no lo recibió, investigue el puerto y la redirección. Si la aplicación respondió y el cliente recibió un reinicio, observe el drenaje, el tiempo de espera y la conexión nuevamente."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - El diagnóstico debe correlacionar intención, plan de control, proxy y aplicación.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "Evidencia útil"
    ],
    "rows": [
      [
        "Pod sin sidecar",
        "Etiqueta, webhook, espacio de nombres o pod antiguo.",
        "Especificaciones del pod, eventos y registros del inyector."
      ],
      [
        "503 en proxy",
        "No hay endpoint, reinicio, disyuntor ni grupo faltante.",
        "Volcado de configuración, endpoints, indicadores de respuesta y registros ascendentes."
      ],
      [
        "mTLS falla",
        "Confianza, SAN, identidad o reloj.",
        "Registros de certificados, dominios de confianza y protocolos de enlace."
      ],
      [
        "Ruta no aplicada",
        "Recurso no válido, NACK o proxy desactualizado.",
        "Estado de sincronización, ACK/NACK y configuración efectiva."
      ],
      [
        "Alta latencia",
        "Reintentar, poner en cola, CPU proxy o flujo ascendente lento.",
        "Seguimiento de saltos, reintentos y métricas de saturación."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 1: una API Gateway llama a tres microservicios internos. Después de habilitar los reintentos en la malla, la latencia de cola aumenta y el backend se satura durante fallas parciales. La investigación muestra reintentos simultáneos en el SDK, la API Gateway y el sidecar. La corrección centraliza la política, propaga los plazos y limita el presupuesto de reintento."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 2: se migra un espacio de nombres al entorno Istio. mTLS L4 funciona, pero no se aplica una política por ruta. El equipo descubre que el servicio no tenía un waypoint asociado. La solución es implementar waypoint, revisar la política L7 y validar la ruta con telemetría."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso 3: dos clústeres de Linkerd necesitan comunicarse. La conexión falla después de la rotación del issuer. El análisis separa el ancla de confianza compartida, el issuer de cada clúster, los certificados de proxy y los componentes multiclúster, identificando una cadena que no se actualiza en el clúster remoto."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Inyectar dos servicios en una malla y validar mTLS e identidad. 2) Configure 90/10 entre dos versiones y compare solicitudes y conexiones. 3) Aplique el tiempo de espera y vuelva a intentarlo solo en una capa y observe los rastros. 4) Generar una denegación de política e identificar el proxy que respondió. 5) Inspeccionar los oyentes, rutas, clústeres y endpoints de un Envoy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "La malla de servicios transfiere funciones de comunicación a una capa de infraestructura, ofreciendo identidad, mTLS, políticas, enrutamiento y observabilidad para el tráfico de este a oeste. El modelo depende de la separación entre el plano de control, que calcula y distribuye la configuración, y el plano de datos, que participa en las conexiones."
  },
  {
    "kind": "paragraph",
    "text": "Istio ofrece modo sidecar con Envoy por módulo y modo ambiental con ztunnel L4 y waypoint L7. Linkerd utiliza sus propios microproxies en Rust y un plano de control con descubrimiento e identidad. Envoy proporciona el proxy básico, los filtros, los clústeres y la configuración xDS que se utilizan en múltiples plataformas."
  },
  {
    "kind": "paragraph",
    "text": "Mesh no reemplaza API Gateway, la seguridad de las aplicaciones ni las mejores prácticas distribuidas. Es necesario coordinar los reintentos, los tiempos de espera y los disyuntores. mTLS identifica cargas de trabajo, pero no reemplaza la autorización ni la identidad del usuario. La observabilidad del proxy debe combinarse con las métricas y el seguimiento de las aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "La adopción exitosa requiere capacidad, gobernanza, actualizaciones controladas y retroubleshooting basada en rutas. El valor aparece cuando la organización reduce la inconsistencia y mejora la seguridad y la observabilidad sin ocultar los efectos de la red."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en los microservicios y los patrones de integración, conectando las capacidades de las redes de malla con las decisiones de descomposición, la comunicación sincrónica y asincrónica, la coherencia y la resiliencia del dominio."
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
      "El problema que justifica la malla está documentado y medible.",
      "La API Gateway, el ingreso, la salida y la malla tienen responsabilidades delimitadas.",
      "El plano de control y el plano de datos tienen SLO y monitoreo independientes.",
      "Todas las cargas de trabajo esperadas están realmente suscritas a la malla.",
      "Se rigen las anclas de fideicomiso, los issuers y la rotación de certificados.",
      "Las políticas L4 y L7 se probaron con identidades reales y denegación predeterminada controlada.",
      "Los tiempos de espera, los reintentos y los disyuntores se coordinan con la aplicación y la API Gateway.",
      "La división del tráfico se validó por solicitud, conexión e impacto comercial.",
      "Las métricas y los registros evitan una cardinalidad excesiva y datos confidenciales.",
      "Las actualizaciones utilizan control canario, revisión o implementación gradual con reversión.",
      "La configuración declarada se compara con la configuración efectiva de los proxies.",
      "El plan de múltiples clústeres considera la confianza, la creación de redes, la conmutación por error y la coherencia.",
      "Existe un procedimiento para evitar o retirar la malla en caso de emergencia."
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
      "Diferenciar norte-sur y este-oeste y explicar dónde se unen la puerta y la malla.",
      "Describir el flujo de configuración desde el plano de control hasta el proxy.",
      "Compare el modo sidecar y el modo ambiental de Istio.",
      "Explique la función de ztunnel y waypoint.",
      "Describa cómo Linkerd emite identidad y aplica mTLS.",
      "Explique los oyentes, cadenas de filtros, rutas y clústeres en Envoy.",
      "Proponer una estrategia de reintento que evite la multiplicación entre capas.",
      "Defina una política de autorización basada en la identidad de la carga de trabajo.",
      "Explique cómo Gateway API/GAMMA representa rutas de malla.",
      "Diseñe una topología de múltiples clústeres e identifique sus límites de confianza.",
      "Cree un plan de troubleshooting para el error 503 después de cambiar la ruta.",
      "Discuta cuándo no adoptar una malla de servicios."
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
    "caption": "Tabla 5 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Modo ambiente",
        "Modelo de plano de datos de Istio sin sidecar obligatorio en cada módulo."
      ],
      [
        "Plano de control",
        "Componente que calcula y distribuye configuración, identidad y política."
      ],
      [
        "Plan de datos",
        "Proxies o componentes que procesan directamente el tráfico."
      ],
      [
        "este-oeste",
        "Tráfico entre servicios o dominios internos."
      ],
      [
        "Envoy",
        "Proxy L4/L7 de alto rendimiento utilizado en mallas y API Gateways."
      ],
      [
        "GAMMA",
        "Iniciativa para utilizar la API Kubernetes Gateway en malla de servicios."
      ],
      [
        "Istiod",
        "Componente central del plano de control de Istio."
      ],
      [
        "mTLS",
        "TLS con autenticación mutua entre pares."
      ],
      [
        "norte-sur",
        "Tráfico que cruza el borde del entorno."
      ],
      [
        "sidecar",
        "Proxy que se ejecuta junto con la aplicación en el mismo pod."
      ],
      [
        "Identidad del servicio",
        "Identidad criptográfica asociada a la carga de trabajo."
      ],
      [
        "División del tráfico",
        "Distribución ponderada del tráfico entre destinos."
      ],
      [
        "Dominio de confianza",
        "Espacio administrativo de identidades confiables."
      ],
      [
        "Proxy de punto de referencia",
        "Proxy L7 utilizado en el entorno Istio para servicios o cargas de trabajo."
      ],
      [
        "xDS",
        "Familia Envoy de API de configuración dinámica."
      ],
      [
        "ztunnel",
        "Proxy por nodo del entorno del plano de datos de Istio."
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Documentación de Istio. Arquitectura; ¿Sidecar o entorno?; Plan de datos ambientales; Seguridad y Gestión del Tráfico.",
      "Documentación de Linkerd. Arquitectura; mTLS automático; Política de autorización; Comunicación multiclúster.",
      "Documentación de proxy del enviado. Descripción general de la arquitectura; Oyentes; enrutamiento HTTP; Gerente de Clúster; API xDS; Administrador de sobrecarga.",
      "Red Kubernetes SIG. API Gateway; API Gateway para Service Mesh; Iniciativa GAMMA.",
      "CNCF. Interfaz de Service Mesh y materiales de arquitectura nativa de la nube.",
      "IETF. RFC 8446: Protocolo de seguridad de la capa de transporte, versión 1.3.",
      "Documentación de OpenTelemetry. Seguimiento distribuido y convenciones semánticas para HTTP y RPC."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Las API de Istio, Linkerd, Envoy y Gateway evolucionan continuamente. Valide la documentación oficial de la versión implementada antes de aplicar manifiestos, políticas, procedimientos de actualización o decisiones de soporte sidecar, ambiental, API Gateway y multiclúster."
  }
];
