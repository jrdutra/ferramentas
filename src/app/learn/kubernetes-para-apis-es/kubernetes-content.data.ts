import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const KUBERNETES_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Kubernetes para API: conciliar estado, tráfico y capacidad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/overview.svg",
    "alt": "Clúster de Kubernetes que ejecuta API con enrutamiento, seguridad y observabilidad",
    "caption": "Figura de apertura: Kubernetes proporciona conciliación y abstracciones operativas; la ruta de la API atraviesa varias capas."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes mantiene el estado deseado mediante la reconciliación; La confiabilidad depende de la combinación correcta de cargas de trabajo, red, capacidad, seguridad y observabilidad."
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
    "text": "Los capítulos anteriores presentaron microservicios, mensajería, malla de servicios y observabilidad. Kubernetes es la plataforma que a menudo reúne estos elementos en producción: programa cargas de trabajo, distribuye configuraciones, expone servicios, ejecuta implementaciones, aplica políticas y proporciona una API declarativa para la automatización. Sin embargo, para los equipos de API, no basta con conocer los comandos de kubectl. Es necesario comprender cómo cada abstracción interfiere con la ruta de solicitud, el consumo de recursos, la identidad de la carga de trabajo y el comportamiento durante las fallas."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes no transforma automáticamente una aplicación en un sistema resistente. El cluster puede reiniciar un contenedor, pero no sabe si una operación comercial es idempotente. Puede crear más réplicas, pero no conoce el límite de conexión de la base de datos. Puede equilibrar el tráfico entre Pods, pero no soluciona una prueba de preparación superficial. La plataforma automatiza mecanismos; La arquitectura necesita proporcionar señales, contratos, límites y políticas coherentes."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo recorre el cluster desde el plano de control hasta el Pod y conecta los conceptos directamente con el ciclo de vida de la API. Se estudiarán implementaciones, servicios, EndpointSlices, DNS, API Gateway, recursos y límites, sondas, escalado automático, programación, configuración, secretos, identidad, RBAC, NetworkPolicy, almacenamiento, observabilidad, GitOps y retroubleshooting. El objetivo es construir un modelo mental operativo: dado un síntoma observado por el consumidor, ¿qué objetos y pruebas deben examinarse?"
  },
  {
    "kind": "paragraph",
    "text": "El enfoque considera clusters administrados y autoadministrados, sin depender de un proveedor específico. Los ejemplos utilizan características estables y estándares ampliamente adoptados. Las funciones, controladores y CRD adicionales pueden ampliar Kubernetes, pero deben evaluarse como software con su propio ciclo de vida, compatibilidad, permisos e impacto operativo."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada objeto, diferencie especificación (estado deseado), estado (estado observado), controlador responsable, eventos generados y dependencias externas. Esta lectura es más útil que memorizar comandos aislados."
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
      "Explicar la arquitectura del cluster y la función de los componentes principales del plano de control y los nodos.",
      "Relacionar el modelo declarativo y el bucle de conciliación con el funcionamiento de las API.",
      "Distinga Pod, ReplicaSet, Deployment, StatefulSet, DaemonSet, Job y CronJob.",
      "Comprenda servicios, DNS, EndpointSlices, Ingress y API Gateway.",
      "Configure solicitudes, límites, sondeos y estrategias de implementación de manera coherente.",
      "Explique HPA, VPA y el escalado automático de nodos, incluidas sus dependencias y conflictos.",
      "Aplique protección de ServiceAccounts, RBAC, Pod Security Standards, NetworkPolicies y Secrets.",
      "Relacione espacios de nombres, cuotas, programación y topología con el aislamiento y la disponibilidad.",
      "Integre registros, métricas, seguimiento y eventos en la troubleshooting del cluster.",
      "Diseñe una cadena de entrega declarativa, auditable y segura para las API."
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
      "33.1 Kubernetes como sistema de conciliación",
      "33.2 Arquitectura del cluster",
      "33.3 Ciclo de vida de pods y contenedores",
      "33.4 Implementaciones y controladores de carga de trabajo",
      "33.5 Servicios, DNS y EndpointSlices",
      "33.6 Ingreso y API Gateway",
      "33.7 ConfigMaps, secretos y configuración",
      "33.8 Solicitudes, límites y QoS",
      "33.9 Sondas de inicio, preparación y vida",
      "33.10 Autoescalado y capacidad",
      "33.11 Programación, topología y disponibilidad",
      "33.12 Seguridad, identidad y red",
      "33.13 Almacenamiento y cargas de trabajo con estado",
      "33.14 Observabilidad, entrega, retroubleshooting y laboratorios"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.1 Kubernetes como sistema de conciliación",
    "id": "33-1-kubernetes-como-sistema-de-conciliacion"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes es una plataforma declarativa. El usuario crea o cambia objetos en la API, describiendo un estado deseado. Los controladores observan estos objetos y el estado real del cluster, calculan las diferencias y toman medidas para reducir la divergencia. Una implementación con tres réplicas no es un comando para iniciar tres procesos; es una declaración persistente que continuará conciliándose cuando los Pods fallen, los nodos se agoten o se publique una nueva versión."
  },
  {
    "kind": "paragraph",
    "text": "Este modelo produce un cambio importante en el razonamiento. En los sistemas imperativos, la automatización ejecuta pasos y considera el trabajo completo cuando los comandos son exitosos. En Kubernetes, aceptar un manifiesto simplemente indica que el objeto pasó por la API y persistió. La disponibilidad real depende de la programación, la descarga de imágenes, la inicialización, las sondas, las dependencias y el estado del controlador. Por lo tanto, las tuberías deben cumplir con las condiciones, no solo con el retorno del material."
  },
  {
    "kind": "paragraph",
    "text": "La API de Kubernetes es extensible. CustomResourceDefinitions permite registrar nuevos tipos y los controladores pueden implementar su propia semántica, formando operadores. Esta capacidad habilita bancos, gateways, certificados y plataformas internas, pero también aumenta la superficie operativa. Cada CRD necesita propiedad, política de actualización, RBAC, copias de seguridad y comprensión de lo que sucede cuando su controlador deja de estar disponible."
  },
  {
    "kind": "subhead",
    "text": "modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "Objeto aceptado no significa carga de trabajo lista. Lea la generación, la generación observada, las condiciones, los eventos y el estado del controlador para saber si realmente se alcanzó el estado deseado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.2 Arquitectura del cluster",
    "id": "33-2-arquitectura-del-cluster"
  },
  {
    "kind": "paragraph",
    "text": "Un cluster tiene un plano de control y nodos trabajadores. Kube-apiserver expone la API y centraliza la autenticación, autorización, admisión y persistencia. etcd almacena el estado del cluster. El programador elige un nodo para los Pods aún no programados considerando recursos, afinidades, restricciones y complementos. Kube-controller-manager ejecuta bucles de reconciliación para objetos nativos. Los proveedores pueden agregar el administrador del controlador de la nube y otros controladores."
  },
  {
    "kind": "paragraph",
    "text": "En los nodos, kubelet garantiza que los contenedores descritos en PodSpecs se ejecuten en un runtime de contenedor compatible. La red Pod se implementa mediante complementos CNI; la persistencia utiliza CSI; La integración de dispositivos puede utilizar complementos específicos. El componente proxy o una implementación equivalente mantiene las reglas de reenvío de Servicios. En los clusteres gestionados, algunos de estos componentes son operados por el proveedor, pero sus responsabilidades siguen siendo relevantes desde el punto de vista del diagnóstico."
  },
  {
    "kind": "paragraph",
    "text": "La API del cluster es una frontera crítica. Cada automatización, operador y persona con credenciales puede potencialmente cambiar el estado del entorno según sus permisos. La disponibilidad del plano de control afecta los cambios y la conciliación, aunque las cargas de trabajo existentes pueden continuar procesando el tráfico durante algún tiempo. Etcd copias de seguridad, políticas de acceso, procedimientos de auditoría y recuperación pertenecen al diseño de la plataforma."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-01.svg",
    "alt": "Plano de control que coordina los nodos trabajadores y las cargas de trabajo.",
    "caption": "Figura 1 - El plano de control mantiene el estado y coordina los nodos; Las cargas de trabajo se ejecutan en nodos trabajadores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.3 Ciclo de vida de pods y contenedores",
    "id": "33-3-ciclo-de-vida-de-pods-y-contenedores"
  },
  {
    "kind": "paragraph",
    "text": "Pod es la unidad implementable más pequeña de Kubernetes. Un Pod contiene uno o más contenedores ubicados conjuntamente, que comparten el espacio de nombres de red y los volúmenes definidos en PodSpec. Los contenedores en el mismo Pod se comunican a través de localhost y se programan juntos. Este acoplamiento es adecuado para sidecares o auxiliares que pertenecen al mismo ciclo de vida; no es un mecanismo para colocar múltiples microservicios independientes en la misma unidad."
  },
  {
    "kind": "paragraph",
    "text": "Las Pods son desechables. Un nuevo Pod normalmente recibe un nuevo UID y dirección IP. Las aplicaciones no deben depender de la identidad de una instancia específica. El estado duradero debe estar en sistemas externos o volúmenes persistentes, y el descubrimiento debe utilizar el Servicio o mecanismos equivalentes. Kubernetes reinicia los contenedores en el mismo Pod de acuerdo con la política de reinicio, pero los reemplazos realizados por los controladores generan nuevos Pods."
  },
  {
    "kind": "paragraph",
    "text": "El ciclo incluye creación, programación, extracción de imágenes, ejecución de contenedores de inicio, inicio de contenedores, sondas, enlaces y terminación. Al retirar un Pod, el kubelet envía una señal de terminación, respeta el período de gracia y termina con fuerza cuando es necesario. Las API deben responder a SIGTERM, dejar de aceptar nuevas solicitudes, completar el trabajo en curso a tiempo y cerrar recursos. Ignorar este ciclo provoca errores durante las implementaciones y drenajes de nodos."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Los contenedores en el mismo Pod comparten destino operativo y ciclo de vida.",
    "headers": [
      "Elemento",
      "Función",
      "Uso en API"
    ],
    "rows": [
      [
        "contenedor de inicio",
        "Corre antes de los contenedores principales.",
        "Preparación breve y determinista; no debería reemplazar la migración coordinada."
      ],
      [
        "sidecar",
        "Contenedor auxiliar en el mismo Pod.",
        "Proxy de malla, agente o adaptación estrechamente acoplada."
      ],
      [
        "Contenedor efímero",
        "Diagnóstico temporal.",
        "Inspección de Pods sin herramientas, bajo control de acceso."
      ],
      [
        "Gancho de ciclo de vida",
        "Acción sobre eventos de contenedores.",
        "Drenaje, registro o cierre controlado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.4 Implementaciones y controladores de carga de trabajo",
    "id": "33-4-implementaciones-y-controladores-de-carga-de-trabajo"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones no deben crear Pods aislados para producción. Los controladores de carga de trabajo gestionan réplicas y reemplazos. La implementación es la opción común para las API sin estado: mantiene ReplicaSets y realiza actualizaciones declarativas. StatefulSet proporciona identidad y ordenamiento estables para cargas de trabajo que realmente necesitan estas propiedades. DaemonSet realiza una copia por nodo elegible, mientras que Job y CronJob representan un trabajo finito y programado."
  },
  {
    "kind": "paragraph",
    "text": "En la actualización continua, la implementación crea gradualmente pods de la nueva revisión y elimina las réplicas antiguas. maxSurge controla la capacidad temporal adicional; maxUnavailable limita la indisponibilidad durante la implementación. Estos valores deben ser compatibles con las cuotas, la capacidad de los nodos y el comportamiento de la sonda. Una implementación puede verse bloqueada por una imagen no válida, falta de recursos, fallas en la preparación o políticas de programación y PDB restrictivas."
  },
  {
    "kind": "paragraph",
    "text": "La reversión restaura una revisión anterior de la plantilla, pero no deshace los cambios en la base de datos, los temas, los contratos o las dependencias externas. Las estrategias seguras separan los cambios de esquema, mantienen la compatibilidad durante la ventana de coexistencia y utilizan la telemetría para la promoción. Canary y blue-green normalmente requieren un controlador de entrega o enrutamiento que divida el tráfico y evalúe las métricas; Pure Kubernetes proporciona los bloques, no toda la política de decisión."
  },
  {
    "kind": "subhead",
    "text": "Implementación en pocas palabras para una API sin estado"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: apps/v1 tipo: Metadata de implementación: nombre: clientes-api especificación: réplicas: 3 estrategia: RollingUpdate: maxSurge: 1 maxUnavailable: 0 selector: matchLabels: aplicación: clientes-api plantilla: metadata: etiquetas: aplicación: clientes-api especificación: contenedores: - nombre: imagen de api: registro.ejemplo/clientes-api:2.4.0 puertos: - contenedorPort: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.5 Servicios, DNS y EndpointSlices",
    "id": "33-5-servicios-dns-y-endpointslices"
  },
  {
    "kind": "paragraph",
    "text": "El servicio proporciona un endpoint lógico estable para un conjunto de Pods seleccionados por etiquetas o configuración explícita. ClusterIP crea acceso interno; NodePort publica un puerto en nodos; LoadBalancer solicita integración con un balanceador externo cuando la plataforma ofrece esta función. ExternalName crea un alias DNS y no actúa como proxy. La elección debe reflejar la topología, no la conveniencia momentánea."
  },
  {
    "kind": "paragraph",
    "text": "El DNS del cluster crea nombres para los servicios. Una aplicación en el mismo espacio de nombres sólo puede utilizar el nombre corto; en otros espacios de nombres, utiliza un nombre calificado como cliente-api.pagamentos.svc. El TTL, el comportamiento del solucionador, los grupos de conexiones y las actualizaciones de EndpointSlices influyen en el tiempo que los consumidores conservan los destinos antiguos. Una conexión ya establecida no se mueve automáticamente cuando cambia el conjunto de Pods."
  },
  {
    "kind": "paragraph",
    "text": "EndpointSlices representa direcciones de backend asociadas con los Servicios e incluye condiciones como listo, servicio y terminación. Los servidores proxy y los controladores utilizan esta información para programar el tráfico. Si falla una prueba de preparación, el Pod puede continuar ejecutándose, pero ya no aparecerá como un objetivo listo. Este detalle explica por qué mirar únicamente la fase Pod es insuficiente durante los incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Destinos de resúmenes de servicios, pero la implementación de la red sigue siendo relevante.",
    "headers": [
      "Tipo de Servicio",
      "Exposición",
      "Nota"
    ],
    "rows": [
      [
        "ClusterIP",
        "Sólo red de cluster.",
        "Estándar para la comunicación interna."
      ],
      [
        "NodePort",
        "Puerto en cada nodo.",
        "A menudo se utiliza como bloque para equilibradores; Requiere control de red."
      ],
      [
        "LoadBalancer",
        "Dirección externa o interna del proveedor.",
        "El costo, los controles de salud y el origen del cliente dependen de la implementación."
      ],
      [
        "ExternalName",
        "CNAME en el DNS del cluster.",
        "Sin selector nativo, proxy o control de estado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.6 Ingreso y API Gateway",
    "id": "33-6-ingreso-y-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Ingress es un recurso consolidado para exponer HTTP y HTTPS, pero su modelo es limitado y varios comportamientos dependen de anotaciones específicas para cada controlador. API Gateway desarrolla esta área con una separación explícita de responsabilidades. GatewayClass representa una implementación; Gateway solicita oyentes e infraestructura; Las rutas, como HTTPRoute, describen cómo se asocia el tráfico con los Servicios."
  },
  {
    "kind": "paragraph",
    "text": "La separación permite al equipo de la plataforma gestionar clases, direcciones y oyentes, mientras que los equipos de aplicaciones controlan las rutas autorizadas. HTTPRoute ofrece coincidencias por nombre de host, ruta, headers y otros criterios, así como filtros y múltiples backends según lo admita la implementación. ReferenceGrant controla las referencias entre espacios de nombres y reduce el acoplamiento implícito."
  },
  {
    "kind": "paragraph",
    "text": "Para las API empresariales, API Gateway puede organizar el tráfico entrante sin reemplazar una API Gateway completa. La autenticación OAuth, las cuotas de consumidores, la monetización, la transformación avanzada y el portal para desarrolladores pueden permanecer en una plataforma de API Management. El diseño debe decidir dónde termina TLS, dónde se valida la identidad, cómo se conserva la dirección de origen y qué políticas se aplican en cada capa."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-02.svg",
    "alt": "API Gateway y ruta de reenvío de tráfico a través de Service y EndpointSlices",
    "caption": "Figura 2: API Gateway y Ruta, seleccione el Servicio; EndpointSlices enruta el tráfico a Pods elegibles."
  },
  {
    "kind": "subhead",
    "text": "Ruta HTTP simplificada"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: gateway.networking.k8s.io/v1 tipo: HTTPRoute metadata: nombre: especificación de clientes: parentRefs: - nombre: gateway-nombres de host corporativos: - api.example.com reglas: - coincidencias: - ruta: tipo: PathPrefix valor: /clientes backendRefs: - nombre: clientes-api puerto: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.7 ConfigMaps, secretos y configuración",
    "id": "33-7-configmaps-secretos-y-configuracion"
  },
  {
    "kind": "paragraph",
    "text": "ConfigMap almacena datos no confidenciales desacoplados de la imagen. Se puede consumir como variables de entorno, argumentos o archivos en volúmenes. Los cambios a las variables no actualizan los procesos existentes; Los volúmenes proyectados pueden reflejar cambios después de un tiempo, pero la aplicación necesita recargar el archivo. Los reinicios controlados por hash de configuración son comunes para hacer explícita la versión efectiva."
  },
  {
    "kind": "paragraph",
    "text": "Secret representa una pequeña cantidad de datos confidenciales, pero su existencia no garantiza una protección completa. Los datos pueden simplemente codificarse en base64 en el manifiesto, persistir en etcd y exponerse a usuarios con permisos de lectura o crear Pods capaces de montarlos. Las mejores prácticas incluyen cifrado en reposo, RBAC mínimo, integración con proveedores KMS o CSI, rotación y prevención de registros accidentales."
  },
  {
    "kind": "paragraph",
    "text": "La configuración debe ser versionada y validada como parte del contrato operativo. Los tiempos de espera, las URL, las banderas, los certificados y los límites necesitan un esquema, propiedad y estrategia de reversión. Colocar archivos grandes, artefactos binarios o secretos de larga duración en objetos genéricos aumenta el riesgo. Para las API, la configuración no válida debería provocar un error de inicialización claro, no un comportamiento parcialmente funcional."
  },
  {
    "kind": "subhead",
    "text": "El secreto no es identidad."
  },
  {
    "kind": "paragraph",
    "text": "Montar una credencial estática en todos los Pods crea dificultades en la distribución y rotación. Cuando sea posible, prefiera la identidad de la carga de trabajo y las credenciales temporales vinculadas a la cuenta de servicio o al proveedor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.8 Solicitudes, límites y clases de QoS",
    "id": "33-8-solicitudes-limites-y-clases-de-qos"
  },
  {
    "kind": "paragraph",
    "text": "Las solicitudes expresan los recursos utilizados por el programador para posicionar Pods y son la base para varios mecanismos de capacidad y escalamiento automático. Los límites restringen el consumo en función del recurso y el runtime. La CPU por encima del límite tiende a acelerarse; La memoria que excede el límite puede provocar OOMKill. Una solicitud demasiado baja provoca un compromiso excesivo y competencia; Demasiado alto impide la programación y desperdicia capacidad reservada."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes clasifica los Pods en clases de QoS según las solicitudes y los límites. Garantizado requiere solicitudes y límites iguales para CPU y memoria para todos los contenedores. Burstable cubre los otros Pods con cierta reserva. BestEffort no tiene solicitudes ni límites y tiende a ser el primer candidato bajo presión de recursos. QoS no reemplaza la prioridad, PDB o capacidad; es sólo una de las señales utilizadas en situaciones de presión."
  },
  {
    "kind": "paragraph",
    "text": "Para las API, el valor debe provenir de las pruebas y la telemetría. La CPU generalmente sigue el rendimiento, mientras que la memoria puede depender del montón, el caché, los búferes, las conexiones y las cargas útiles. Los sidecars también consumen recursos y deben incluirse en el cálculo. Los límites estrictos pueden aumentar la latencia mediante la limitación; La ausencia de límites puede permitir que una falla afecte a todo el nodo. La decisión debe equilibrar el aislamiento, la eficiencia y el comportamiento en runtime."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Las solicitudes y los límites son parámetros de ingeniería, no valores decorativos.",
    "headers": [
      "Configuración",
      "efecto principal",
      "Fallo común"
    ],
    "rows": [
      [
        "solicitud de CPU",
        "Reserva lógica para programación.",
        "Demasiado bajo crea discordia; demasiado alto deja el Pod Pendiente."
      ],
      [
        "límite de CPU",
        "Límite de tiempo de CPU.",
        "Estrangulamiento y alta latencia."
      ],
      [
        "solicitud de memoria",
        "Base de programación y capacidad.",
        "La subestimación produce presiones y desalojos."
      ],
      [
        "Límite de memoria",
        "Techo de memoria del contenedor.",
        "OOMKill y reinicia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.9 Sondas de inicio, preparación y vida",
    "id": "33-9-sondas-de-inicio-preparacion-y-vida"
  },
  {
    "kind": "paragraph",
    "text": "La sonda de inicio indica si la aplicación ha terminado de iniciarse. Si bien no tiene éxito, se puede suprimir la actividad y la preparación, evitando que una aplicación lenta se reinicie antes de que esté lista. La preparación determina si el endpoint debe recibir tráfico; El fallo elimina el Pod de los objetivos listos. La vivacidad indica que el proceso está irremediablemente estancado y debe reiniciarse."
  },
  {
    "kind": "paragraph",
    "text": "Mezclar estas responsabilidades es peligroso. Una sonda de actividad que consulta la base de datos, el DNS o el servicio externo puede reiniciar todas las réplicas durante una falla posterior, magnificando el incidente. La preparación puede considerar dependencias esenciales, pero debe evitar efectos fluctuantes y en cascada. La respuesta de la sonda debe ser barata, determinista y tener un tiempo de espera más corto que el período."
  },
  {
    "kind": "paragraph",
    "text": "Durante la terminación, la aplicación debe fallar antes de cerrar las conexiones, lo que permite que el equilibrador deje de enviar nuevas solicitudes. preStop puede ayudar, pero no debería depender de un tiempo arbitrario sin observación. El período de gracia debe cubrir el drenaje, las solicitudes largas y la descarga de telemetría. Los consumidores de mensajería y transmisión de WebSocket, gRPC requieren su propia lógica de terminación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-03.svg",
    "alt": "Sondas de inicio, preparación y vida con diferentes responsabilidades.",
    "caption": "Figura 3 - El inicio, la preparación y la vida controlan diferentes momentos y decisiones."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de sondas con responsabilidades separadas"
  },
  {
    "kind": "paragraph",
    "text": "startupProbe: httpGet: ruta: /health/startup puerto: 8080 periodSeconds: 5 FailureThreshold: 30 readinessProbe: httpGet: ruta: /health/ready puerto: 8080 periodSeconds: 5 timeoutSeconds: 2 livenessProbe: httpGet: ruta: /health/live puerto: 8080 periodSeconds: 10 FailureThreshold: 3"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.10 Autoescalado y capacidad",
    "id": "33-10-autoescalado-y-capacidad"
  },
  {
    "kind": "paragraph",
    "text": "HorizontalPodAutoscaler ajusta la cantidad deseada de réplicas de un objetivo escalable en función de las métricas. La CPU y la memoria pueden provenir de la API de métricas de recursos; Las métricas personalizadas y externas requieren adaptadores. El cálculo utiliza solicitudes como referencia en varios escenarios, por lo que las solicitudes faltantes o incorrectas afectan el comportamiento. Las políticas ScaleUp, ScaleDown, stabilizationWindow y tolerancia reducen las oscilaciones."
  },
  {
    "kind": "paragraph",
    "text": "VerticalPodAutoscaler recomienda o aplica nuevas solicitudes y límites según el historial, según el modo y la implementación instalada. Los cambios pueden requerir recrear Pods. HPA y VPA pueden competir cuando ambos actúan según la misma métrica, por lo que la arquitectura debe definir responsabilidades. El escalado automático de nodos agrega o consolida nodos cuando los pods no se pueden programar o hay capacidad inactiva."
  },
  {
    "kind": "paragraph",
    "text": "El escalado horizontal no elimina los límites externos. Si todas las réplicas utilizan el mismo grupo de bases de datos, el aumento de Pods puede saturar las conexiones antes. Las métricas de RPS, colas, latencia o concurrencia a menudo representan la demanda de API mejor que la CPU por sí sola. El tiempo de arranque, el calentamiento de la caché y la velocidad de aprovisionamiento de nodos deben tenerse en cuenta para lograr el escalamiento máximo."
  },
  {
    "kind": "subhead",
    "text": "Escalado coordinado en múltiples capas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-04.svg",
    "alt": "HPA, planificador y capacidad de nodos en un sistema acoplado",
    "caption": "Figura 4: HPA, el programador y la capacidad del nodo forman un sistema acoplado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.11 Programación, topología y disponibilidad",
    "id": "33-11-programacion-topologia-y-disponibilidad"
  },
  {
    "kind": "paragraph",
    "text": "El programador filtra y puntúa los nodos según los recursos, selectores, afinidad, contaminación, tolerancias y restricciones de topología. nodeSelector es simple; La afinidad de nodo expresa reglas obligatorias o preferidas. La afinidad del pod se aproxima a las cargas de trabajo, mientras que las restricciones de distribución de topología y antiafinidad distribuyen las réplicas entre nodos y zonas. Las restricciones excesivas pueden dejar los Pods pendientes durante fallas o expansión."
  },
  {
    "kind": "paragraph",
    "text": "Las manchas repelen los Pods sin la tolerancia correspondiente y son útiles para nodos dedicados, GPU, cargas de trabajo críticas o condiciones especiales. La tolerancia sólo permite programar; no garantiza preferencia o exclusividad. PriorityClass influye en la preferencia, eliminando potencialmente los Pods de menor prioridad para acomodar el trabajo crítico. Este mecanismo necesita gobernanza para no hacer de cada aplicación una prioridad máxima."
  },
  {
    "kind": "paragraph",
    "text": "PodDisruptionBudget limita las interrupciones voluntarias simultáneas, como el drenaje y el mantenimiento, pero no protege contra fallas del nodo o de la aplicación. Una PDB que sea incompatible con la cantidad de réplicas puede bloquear las actualizaciones. La verdadera disponibilidad combina réplicas, distribución entre zonas, sondas, capacidad, tiempos de espera y redundancia de dependencia. Tener tres Pods en el mismo nodo no proporciona tolerancia a la pérdida de nodos."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: La programación traduce los requisitos de aislamiento y disponibilidad en restricciones.",
    "headers": [
      "Mecanismo",
      "Pregunta respondida",
      "Precaución"
    ],
    "rows": [
      [
        "Afinidad / antiafinidad",
        "¿Qué pods o nodos deberían estar juntos o separados?",
        "Las normas obligatorias pueden reducir la capacidad elegible."
      ],
      [
        "Extensión de topología",
        "¿Cómo distribuir réplicas por dominio?",
        "Las etiquetas de topología deben ser confiables."
      ],
      [
        "Contaminaciones/tolerancias",
        "¿Qué cargas de trabajo pueden utilizar un nodo determinado?",
        "La tolerancia no crea afinidad."
      ],
      [
        "PDB",
        "¿Cuántas interrupciones voluntarias están permitidas?",
        "No cubre fallas no intencionales ni reemplaza réplicas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.12 Seguridad, identidad y aislamiento de red",
    "id": "33-12-seguridad-identidad-y-aislamiento-de-red"
  },
  {
    "kind": "paragraph",
    "text": "ServiceAccount proporciona identidad a los procesos en Pods cuando acceden a la API de Kubernetes o a los sistemas integrados. Los tokens proyectados son temporales, tienen una audience y pueden vincularse al ciclo de vida del Pod. Cada carga de trabajo debe tener una ServiceAccount específica y automountServiceAccountToken debe estar deshabilitado cuando el token no sea necesario. La identidad de la carga de trabajo no debe compartirse entre aplicaciones sin ningún motivo."
  },
  {
    "kind": "paragraph",
    "text": "RBAC controla las acciones en los recursos API a través de Roles, ClusterRoles y enlaces. Permisos como crear Pods, actualizar Implementaciones, leer Secretos o vincular roles pueden permitir una escalada indirecta. El principio de privilegio mínimo requiere revisar verbos, recursos, subrecursos, espacios de nombres y capacidades de suplantación. El acceso humano y de automatización debe auditarse y separarse."
  },
  {
    "kind": "paragraph",
    "text": "Los estándares de seguridad del Pod definen los niveles privilegiados, básicos y restringidos para las propiedades de seguridad del Pod. La admisión puede aplicar políticas por espacio de nombres. Los controles NetworkPolicy permitieron la comunicación entre Pods y entidades de red, siempre que el complemento CNI implemente la función. Las políticas de denegación predeterminada, la salida explícita, la ejecución sin raíz, el sistema de archivos de solo lectura, seccomp y las capacidades mínimas reducen el impacto del compromiso."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-05.svg",
    "alt": "Capas de seguridad que protegen cargas de trabajo y secretos",
    "caption": "Figura 5: La seguridad eficaz combina identidad, autorización, políticas de Pod, redes y protección de secretos."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Cada control protege una superficie diferente.",
    "headers": [
      "controlar",
      "Alcance",
      "Ejemplo de API"
    ],
    "rows": [
      [
        "ServiceAccount",
        "Identidad de la carga de trabajo.",
        "API utiliza una credencial temporal para acceder al servicio en la nube."
      ],
      [
        "RBAC",
        "API de Kubernetes.",
        "El runtime no puede enumerar secretos ni cambiar implementaciones."
      ],
      [
        "Seguridad del módulo",
        "Configuración del módulo.",
        "Sin root, sin escalada de privilegios y con seccomp."
      ],
      [
        "NetworkPolicy",
        "Tráfico L3/L4 entre cargas de trabajo.",
        "Sólo la API Gateway accede al puerto API; salida limitada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.13 Espacios de nombres, cuotas y multitenant",
    "id": "33-13-espacios-de-nombres-cuotas-y-multitenant"
  },
  {
    "kind": "paragraph",
    "text": "Los espacios de nombres organizan nombres y políticas, pero no son un límite de seguridad absoluto en sí mismos. Muchos recursos, como Roles, ResourceQuotas y NetworkPolicies, tienen un ámbito de espacio de nombres, lo que le permite delegar partes del cluster a los equipos. Los recursos, nodos, CRD y componentes compartidos del cluster siguen requiriendo una gobernanza central."
  },
  {
    "kind": "paragraph",
    "text": "ResourceQuota limita el consumo agregado de CPU, memoria, almacenamiento y cantidad de objetos en un espacio de nombres. LimitRange define valores predeterminados y límites por objeto. Las cuotas impiden que un equipo consuma toda su capacidad, pero los valores rígidos sin un proceso de ajuste pueden bloquear las implementaciones y la respuesta a incidentes. Los entornos compartidos también necesitan aislamiento de red, RBAC, admisión y observabilidad de los tenants."
  },
  {
    "kind": "paragraph",
    "text": "La multitenant sólida puede requerir clusteres separados, virtualización o mecanismos adicionales según el riesgo. El aislamiento del espacio de nombres suele ser adecuado para equipos de la misma organización con confianza parcial; No debe asumirse que sea equivalente a entornos físicamente independientes. La decisión debe considerar datos, requisitos regulatorios, radio de explosión, costo y capacidad operativa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.14 Almacenamiento con estado y cargas de trabajo",
    "id": "33-14-almacenamiento-con-estado-y-cargas-de-trabajo"
  },
  {
    "kind": "paragraph",
    "text": "Los volúmenes resuelven las necesidades de datos dentro del ciclo del Pod, mientras que PersistentVolume y PersistentVolumeClaim abstraen el almacenamiento con su propio ciclo de vida. StorageClass describe clases y aprovisionamiento dinámico. Los modos de acceso, la política de recuperación, la expansión, las instantáneas, las zonas y el rendimiento varían según el controlador y el proveedor de CSI. Un Bound PVC no garantiza que la aplicación tenga consistencia o respaldo adecuado."
  },
  {
    "kind": "paragraph",
    "text": "StatefulSet proporciona plantillas estables de identidad, ordenamiento y volumen por réplica, pero no transforma ninguna base de datos en un sistema distribuido seguro. Los operadores bancarios pueden automatizar los miembros, la conmutación por error y la copia de seguridad, pero añaden una dependencia crítica de un controlador. Para la mayoría de las API sin estado, los datos deben permanecer en servicios externos diseñados para la persistencia, mientras que los Pods se pueden reemplazar libremente."
  },
  {
    "kind": "paragraph",
    "text": "Las copias de seguridad deben incluir datos, metadata y capacidad de restauración probada. La copia de manifiestos no recupera volúmenes ni estados externos. Los cambios de esquema deben ser compatibles con implementaciones y reversiones. Los trabajos migratorios necesitan bloqueo, idempotencia y observabilidad; Ejecutarlos como contenedor de inicio de cada réplica puede producir simultaneidad e indisponibilidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.15 Observabilidad del cluster y APIs",
    "id": "33-15-observabilidad-del-cluster-y-apis"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes produce múltiples fuentes: métricas de componentes y nodos, registros de contenedores y sistemas, eventos de objetos, registros de auditoría y estado de recursos. Los eventos son útiles para programación, extracción, sondeos y admisión, pero tienen una retención limitada y no reemplazan los registros centralizados. Los registros necesitan un almacenamiento cíclico independiente de los pods y los nodos para sobrevivir a los reinicios y los desalojos."
  },
  {
    "kind": "paragraph",
    "text": "La aplicación debe seguir emitiendo registros, métricas y trazas estructurados como se estudió en el capítulo anterior. Los atributos de recursos como cluster, espacio de nombres, pod, contenedor e implementación permiten la correlación. kube-state-metrics expone el estado de los objetos; metrics-server admite la API de métricas de recursos y el escalado automático, no reemplaza una plataforma de observabilidad completa. Collector se puede implementar como agente por nodo y como API Gateway central según el volumen y los requisitos."
  },
  {
    "kind": "paragraph",
    "text": "Las alertas deben relacionar los síntomas del usuario con las señales del grupo. El aumento de 5xx puede coincidir con Pods no listos, OOMKills, limitación, DNS, NetworkPolicy o backend externo. Los paneles de control exclusivos de CPU no explican esta cadena. Los seguimientos con identidad de pod, los registros con trace_id y las métricas por revisión reducen el tiempo para separar las fallas de la plataforma de las fallas de las aplicaciones."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Los diagnósticos confiables combinan telemetría de ejecución y estado declarativo.",
    "headers": [
      "evidencia",
      "Pregunta",
      "Herramienta u objeto"
    ],
    "rows": [
      [
        "Estado y condiciones",
        "¿El controlador logró lo que deseaba?",
        "kubectl obtiene/describe y API de objetos."
      ],
      [
        "Events",
        "¿Qué decisión reciente ocurrió?",
        "Programación, extracción, sondeo y eventos de volumen."
      ],
      [
        "Registros",
        "¿Qué registró el proceso?",
        "Troncos de contenedores, sidecar y componentes."
      ],
      [
        "Métricas y seguimientos",
        "¿Qué impacto y camino?",
        "Prometheus/OpenTelemetry y backend de observabilidad."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.16 Entrega declarativa, imágenes y cadena de suministro",
    "id": "33-16-entrega-declarativa-imagenes-y-cadena-de-suministro"
  },
  {
    "kind": "paragraph",
    "text": "Una cadena segura comienza con la imagen. La compilación debe ser reproducible, utilizar una base mínima y actualizada, producir SBOM, ejecutar escáneres y firmar el artefacto. Las etiquetas mutables dificultan la auditoría; Los resúmenes identifican el contenido exacto. El runtime debe restringir los registros, verificar las firmas de acuerdo con la política y evitar contenedores privilegiados o imágenes no aprobadas."
  },
  {
    "kind": "paragraph",
    "text": "Los manifiestos se pueden gestionar con YAML, Kustomize, Helm o herramientas equivalentes. GitOps mantiene el estado deseado en el repositorio y un controlador reconcilia el cluster, creando un rastro auditable. Esto no elimina la validación: las solicitudes de extracción necesitan esquema, política como código, diferencias, pruebas y segregación de funciones. Los secretos no deben revelarse en texto claro."
  },
  {
    "kind": "paragraph",
    "text": "Las implementaciones necesitan preparación, estrategia de aumento, capacidad temporal y métricas de éxito. La entrega progresiva puede pausar, analizar los SLO y promoverlos gradualmente. La reversión debe considerar el banco y los contratos. Una implementación técnicamente exitosa, pero con un error funcional, sólo se detendrá si los criterios de telemetría y promoción representan la experiencia real del consumidor."
  },
  {
    "kind": "subhead",
    "text": "Entrega declarativa: del artefacto al estado reconciliado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-06.svg",
    "alt": "GitOps concilia el estado deseado y el estado observado",
    "caption": "Figura 6: GitOps hace que el estado deseado sea auditable; los controladores siguen siendo responsables de la convergencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.17 API Gateways, malla de servicios y Kubernetes",
    "id": "33-17-api-gateways-malla-de-servicios-y-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "En Kubernetes, la API de entrada o API Gateway se encarga de la entrada y el enrutamiento a los Servicios, mientras que una plataforma de gestión de API puede proporcionar catálogo, autenticación, cuotas, políticas y análisis. La API Gateway puede ejecutarse en el exterior, en el borde del cluster o como una carga de trabajo interna. La decisión afecta la latencia, el radio de explosión, la gestión de certificados y la dependencia del propio cluster para recibir tráfico."
  },
  {
    "kind": "paragraph",
    "text": "La malla de servicios opera principalmente en el tráfico de este a oeste y proporciona identidad de carga de trabajo, mTLS, telemetría y políticas. No debe duplicar reintentos, tiempos de espera y disyuntores ya existentes en el cliente o API Gateway de forma descoordinada. La cadena consumidor-borde-API Gateway-malla-servicio puede tener múltiples endpoints TLS y observabilidad; el dibujo debe documentar la autoridad de cada capa."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways y los servidores proxy también necesitan solicitudes, límites, sondas, PDB y distribución de zonas. El hecho de que sean infraestructuras compartidas aumenta su impacto. Las actualizaciones deben preservar las conexiones, rutas y políticas. Los contadores de limitación de velocidad distribuidos, las cachés y los almacenes de sesiones necesitan su propia arquitectura; no deberían depender únicamente del número de réplicas de API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.18 Troubleshooting de API en Kubernetes",
    "id": "33-18-troubleshooting-de-api-en-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico comienza con el síntoma externo y va por capas. Si el nombre no se resuelve, investigue el DNS y la dirección de API Gateway. Si hay un tiempo de espera de conexión, valide el equilibrador de carga, los oyentes, las políticas de red y los endpoints. Si la API Gateway responde 503, examine la ruta, el servicio, los EndpointSlices y la preparación. Si el Pod se reinicia, consulte el estado del contenedor, último estado, código de salida, eventos, límites y registros anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Lo pendiente suele apuntar a una programación: recursos insuficientes, PVC, afinidad, manchas o cuotas. ImagePullBackOff indica acceso, nombre, etiqueta, credencial o registro. CrashLoopBackOff es una política de espera después de fallos repetidos, no la causa; la causa está en el proceso, la configuración, la sonda o la dependencia. OOMKilled se relaciona con la memoria, mientras que la limitación de la CPU aparece en las métricas y la latencia sin necesariamente reiniciar el contenedor."
  },
  {
    "kind": "paragraph",
    "text": "Se deben utilizar herramientas con hipótesis. kubectl describe muestra eventos y condiciones; logs --previous recupera la ejecución anterior; el reenvío de puertos aísla la ruta de la red; Los contenedores efímeros ayudan cuando la imagen no tiene utilidades. Las capturas, DNS y pruebas de conectividad deben respetar la autorización. Cambiar la sonda, la política o el límite sin evidencia puede ocultar el problema y crear otro incidente."
  },
  {
    "kind": "subhead",
    "text": "Troubleshooting orientada a capas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/es/figure-07.svg",
    "alt": "Troubleshooting de flujo desde objetos de Kubernetes a la aplicación",
    "caption": "Figura 7: la investigación avanza desde el objeto declarado hasta el comportamiento de la aplicación y sus dependencias."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: los estados conocidos reducen la troubleshooting de prueba y error.",
    "headers": [
      "Síntoma",
      "Evidencia temprana",
      "Hipótesis"
    ],
    "rows": [
      [
        "Pod pendiente",
        "Mensaje de eventos y agenda.",
        "Recursos, afinidad, contaminación, PVC, cuota."
      ],
      [
        "CrashLoopBackOff",
        "Registros actuales/anteriores y código de salida.",
        "Configuración, proceso, sondeo o dependencia."
      ],
      [
        "Servicio sin endpoints",
        "EndpointSlices y preparación.",
        "Selector incorrecto o Pods no listos."
      ],
      [
        "503 en la API Gateway",
        "Ruta, servicio, endpoints y registros ascendentes.",
        "Backend no disponible, política o tiempo de espera."
      ],
      [
        "OOMKilled",
        "lastState, límites y métricas.",
        "Montón, fuga, caché, carga útil o límite bajo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.19 Estudios de casos y laboratorios",
    "id": "33-19-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: implementación con 503: una nueva versión comienza en 70 segundos, pero la vida comienza después de 10 segundos y reinicia el contenedor. La implementación nunca prepara réplicas. La solución separa el inicio y la vida, ajusta el período de gracia y agrega monitoreo por revisión. La causa no fue en el Servicio, aunque el consumidor observó 503."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: HPA aumenta el error del banco: HPA escala de 5 a 40 Pods por CPU, pero cada Pod abre 20 conexiones. El banco sólo admite 300 conexiones. La respuesta correcta incluye grupo global coherente, límite de escala, métrica de cola y protección de backend; simplemente aumentar el grupo magnificaría el fracaso."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: API inaccesible después de la denegación predeterminada: un ingreso de NetworkPolicy permite el espacio de nombres de la API Gateway, pero el selector de pod no coincide con las etiquetas reales. Los EndpointSlices todavía están listos, pero el CNI bloquea los paquetes. La investigación compara etiquetas, políticas y tráfico, sin eliminar toda la política de forma permanente."
  },
  {
    "kind": "subhead",
    "text": "Laboratorios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Implementar una API con Implementación, Servicio y HTTPRoute. 2) Simule una falla de preparación y observe EndpointSlices. 3) Configurar solicitudes/límites y activar OOM en un entorno aislado. 4) Aplicar HPA y realizar un seguimiento de las métricas. 5) Cree una cuenta de servicio, RBAC mínimo y denegación predeterminada de NetworkPolicy. 6) Realizar implementación y reversión con observabilidad de revisión."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes proporciona una API declarativa y controladores que concilian el estado deseado. Esta abstracción le permite automatizar réplicas, implementaciones, programación, configuración y exposición, pero no reemplaza las decisiones sobre contratos, dependencias y coherencia. Para las API, cada objeto debe estar relacionado con la ruta de solicitud y las señales utilizadas para la operación."
  },
  {
    "kind": "paragraph",
    "text": "Las Pods son efímeras; Revisiones de control de implementaciones; Los servicios y EndpointSlices brindan descubrimiento; Gateway API organiza entradas y rutas. Solicitudes, límites, sondeos, escalado automático y programación forman un sistema acoplado. Las configuraciones incoherentes crean indisponibilidad incluso cuando todos los objetos parecen válidos individualmente."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad combina ServiceAccounts, RBAC, Pod Security, NetworkPolicy, secretos, cadena de suministro y aislamiento. La observabilidad combina estado, eventos, registros, métricas y seguimientos. La entrega segura utiliza artefactos inmutables, validación, conciliación y criterios de promoción. La retroubleshooting eficaz comienza desde el estado observado y avanza a través de capas."
  },
  {
    "kind": "subhead",
    "text": "Siguiente paso del curso"
  },
  {
    "kind": "paragraph",
    "text": "El siguiente capítulo profundiza en Zero Trust aplicado a las API, conectando la identidad de la carga de trabajo, los least privilege, la segmentación, la verificación continua y las políticas distribuidas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación para API en Kubernetes",
    "id": "lista-de-verificacion-para-api-en-kubernetes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La implementación utiliza una imagen inmutable, una estrategia de implementación y reversión compatible con bancos y contratos.",
      "Las solicitudes y los límites se definieron mediante pruebas y telemetría, incluidos los sidecars.",
      "La puesta en marcha, la preparación y la vitalidad responden a diferentes preguntas.",
      "Servicio y Ruta tienen selectores, puertos, nombres de host y referencias validados.",
      "HPA utiliza métricas representativas y respeta las dependencias de capacidad.",
      "Las réplicas se distribuyen entre nodos y zonas, con PDB coherente.",
      "ServiceAccount y RBAC siguen el privilegio mínimo; El token se desactiva cuando no es necesario.",
      "Pod Security y NetworkPolicies reducen los privilegios y las rutas de red.",
      "Los secretos utilizan cifrado, rotación y acceso mínimo.",
      "Los registros, métricas, seguimientos, eventos y estados se correlacionan por revisión y Pod.",
      "Pipeline valida manifiestos, políticas, imágenes y condiciones de implementación.",
      "Los runbooks cubren pendientes, extracción, fallas, OOM, endpoints vacíos, DNS y 503."
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
      "Explique la diferencia entre aplicar un manifiesto y alcanzar el estado deseado.",
      "Compare Pod, Deployment, StatefulSet, DaemonSet, Job y CronJob.",
      "Describa la ruta DNS/Gateway/Route/Service/EndpointSlice/Pod.",
      "Explique por qué es posible que un Running Pod no reciba tráfico.",
      "Proponer solicitudes, límites y sondeos para una API Java con inicialización diferida.",
      "Compare HPA, VPA y el escalado automático de nodos e identifique posibles conflictos.",
      "Diseñe RBAC y NetworkPolicy mínimos para una API accesible solo a través de la API Gateway.",
      "Explique cómo una PDB puede bloquear el mantenimiento y por qué no protege contra fallas del nodo.",
      "Describa una implementación canary con criterios de promoción basados en SLO.",
      "Cree un runbook para investigar 503 intermitentes después de una implementación."
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
        "controlador de admisión",
        "Paso que valida o modifica objetos antes de la persistencia."
      ],
      [
        "CNI",
        "Interfaz de complemento que implementa una red de contenedores y Pods."
      ],
      [
        "Controlador",
        "Bucle que concilia el estado observado y el deseado."
      ],
      [
        "CRD",
        "Extensión API que registra un nuevo tipo de recurso."
      ],
      [
        "CSI",
        "Interfaz para integrar controladores de almacenamiento."
      ],
      [
        "Deployment",
        "Controlador de actualización declarativa para cargas de trabajo generalmente sin estado."
      ],
      [
        "EndpointSlice",
        "Recurso que representa los endpoints de red de un Servicio."
      ],
      [
        "Gateway API",
        "Familia de funciones para enrutamiento L4/L7 con roles separados."
      ],
      [
        "HPA",
        "Controlador que ajusta las réplicas horizontalmente por métricas."
      ],
      [
        "Namespace",
        "Alcance lógico para nombres, políticas y delegación."
      ],
      [
        "NetworkPolicy",
        "Política de comunicación del pod implementada por el CNI."
      ],
      [
        "PDB",
        "Limitar las interrupciones voluntarias simultáneas."
      ],
      [
        "Pod",
        "La unidad de Kubernetes desplegable más pequeña."
      ],
      [
        "Service",
        "Abstracción de red estable para un conjunto de backends."
      ],
      [
        "ServiceAccount",
        "Identidad de Kubernetes destinada a cargas de trabajo."
      ],
      [
        "StatefulSet",
        "Controlador para Pods con identidad y pedidos estables."
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
      "Documentación de Kubernetes. Conceptos, Arquitectura de Clúster y Componentes.",
      "Documentación de Kubernetes. Pods, implementaciones, servicios y EndpointSlices.",
      "Documentación de Kubernetes. ConfigMaps, secretos y volúmenes persistentes.",
      "Documentación de Kubernetes. Sondas, Autoescalado de carga de trabajo y Autoescalado de nodos.",
      "Documentación de Kubernetes. Cuentas de servicio, buenas prácticas de RBAC y estándares de seguridad de pods.",
      "Documentación de Kubernetes. Políticas de red, multitenant, registro y observabilidad.",
      "API de API Gateway de Kubernetes. Descripción general de API, HTTPRoute, seguridad y control de versiones.",
      "Fundación de Computación Nativa en la Nube. Documentación del ecosistema y del proyecto Kubernetes."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes, API Gateway, complementos CNI/CSI y servicios gestionados evolucionan continuamente. Antes de aplicar ejemplos, valide la versión del cluster, el soporte de implementación y el estado de estabilidad de cada característica en la documentación oficial."
  }
];
