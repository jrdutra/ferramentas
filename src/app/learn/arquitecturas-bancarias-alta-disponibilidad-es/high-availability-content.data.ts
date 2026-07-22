import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const HIGH_AVAILABILITY_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Alta disponibilidad bancaria: continuidad de extremo a extremo, no solo servidores duplicados"
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El servicio crítico debe sobrevivir a fallas de procesos, nodos, zonas, regiones, proveedores, cambios y errores humanos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/overview.svg",
    "alt": "Arquitectura bancaria resiliente que protege la continuidad de extremo a extremo",
    "caption": "Cifra de apertura: La disponibilidad del banco depende de la continuidad de toda la cadena, no sólo de componentes aislados."
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
    "text": "En una institución financiera, la falta de disponibilidad no significa sólo una pantalla lenta. Puede impedir pagos, bloquear transferencias, interrumpir liquidaciones, dejar a los clientes sin acceso a los saldos, retrasar las conciliaciones y aumentar la exposición al fraude. Por lo tanto, la arquitectura bancaria de alta disponibilidad debe construirse basándose en las operaciones comerciales críticas y las consecuencias de su interrupción, y no solo en la duplicación de servidores."
  },
  {
    "kind": "paragraph",
    "text": "El Comité de Basilea define la resiliencia operativa como la capacidad de un banco para realizar operaciones críticas durante una interrupción. Esta perspectiva es más amplia que la disponibilidad técnica: incluye personas, procesos, tecnología, instalaciones, proveedores y dependencias externas. La arquitectura debe asumir que ocurrirán fallas y establecer tolerancias a la disrupción, mecanismos de protección, respuesta, adaptación, recuperación y aprendizaje."
  },
  {
    "kind": "paragraph",
    "text": "En Brasil, el tema se relaciona con las estructuras de gestión de riesgos, la política de ciberseguridad, la contratación de servicios de procesamiento y en la nube y los requisitos de los acuerdos de pago. Los estándares y manuales no prescriben una topología única, sino que requieren gobernanza, continuidad, controles, pruebas, recuperabilidad y gestión de terceros. El diseño técnico debe transformar estas obligaciones en propiedades verificables."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta API Gateways, microservicios, mensajería, Kubernetes, observabilidad y Zero Trust con una visión bancaria de continuidad. Se estudiarán RTO, RPO, SLO, dominios de falla, activo-activo, activo-pasivo, consistencia, replicación, idempotencia, reconciliación, capacidad, seguridad, recuperación ante desastres y pruebas de escenarios severos pero plausibles."
  },
  {
    "kind": "paragraph",
    "text": "Cómo estudiar este capítulo Para cada arquitectura, identifique la operación crítica, la dependencia que podría fallar, el efecto observado por el cliente, la tolerancia aceptada, la estrategia de recuperación y la evidencia producida por las pruebas. La alta disponibilidad sin criterios mensurables es sólo una intención."
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
      "Diferenciar entre disponibilidad, confiabilidad, continuidad del negocio, recuperación ante desastres y resiliencia operativa.",
      "Definir operaciones críticas, impacto, tolerancia a interrupciones, RTO, RPO, SLI y SLO.",
      "Diseñe la redundancia por proceso, nodo, zona, región, red, proveedor y equipo.",
      "Compare topologías activa-activa, activa-pasiva, de espera cálida y de luz piloto.",
      "Comprender la replicación sincrónica y asincrónica, el quórum, el cerebro dividido y la coherencia.",
      "Aplique semántica de idempotencia, libro mayor, bandeja de salida, conciliación y entrega a transacciones financieras.",
      "Diseñe DNS, balanceadores, API Gateways, salida y conectividad con conmutación por error controlada.",
      "Relacionar seguridad, HSM, PKI, gestión de secretos y proveedores con disponibilidad.",
      "Planifique la capacidad, la degradación gradual, el deslastre de carga y la protección contra fallas en cascada.",
      "Cree pruebas de recuperación ante desastres, ingeniería del caos, observabilidad y respuesta a incidentes auditables."
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
      "37.1 Alta disponibilidad y resiliencia operativa",
      "37.2 Operaciones críticas, impacto y tolerancia a la disrupción",
      "37.3 Métricas: disponibilidad, SLI, SLO, RTO y RPO",
      "37.4 Dominios de falla y verdadera redundancia",
      "37.5 Activo-activo, activo-pasivo y multirregión",
      "37.6 Datos: replicación, quórum y consistencia",
      "37.7 Integridad transaccional, idempotencia y conciliación",
      "37.8 Red, DNS, balanceadores y API Gateways",
      "37.9 Seguridad, HSM, PKI, nube y terceros",
      "37.10 Capacidad, contrapresión y degradación controlada",
      "37.11 Observabilidad y respuesta a incidentes",
      "37.12 Cambios, DR, pruebas e ingeniería del caos",
      "37.13 Arquitecturas híbridas, mainframe, Pix y pagos instantáneos",
      "37.14 Troubleshooting y estudios de casos",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.1 Alta disponibilidad y resiliencia operativa",
    "id": "37-1-alta-disponibilidad-y-resiliencia-operativa"
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad es la capacidad de un servicio de permanecer accesible dentro de un nivel acordado. La confiabilidad se refiere a la probabilidad de funcionar correctamente durante un período de tiempo; la continuidad del negocio se ocupa del mantenimiento de las actividades esenciales; la recuperación ante desastres se centra en restaurar la tecnología después de un desastre; La resiliencia operativa integra prevención, absorción, respuesta, recuperación y aprendizaje. En los bancos estos conceptos se superponen, pero no son sinónimos."
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación puede tener un tiempo de actividad del 99,99 % y seguir siendo operativamente frágil si una falla produce saldos incorrectos, pagos duplicados o una conciliación incompleta. Por tanto, la calidad de la recuperación es tan importante como su velocidad. La arquitectura debe preservar la integridad, la trazabilidad y la capacidad de explicar el estado final de cada transacción."
  },
  {
    "kind": "paragraph",
    "text": "La resiliencia debe evaluarse por operación crítica, no por el estado agregado de la infraestructura. La aplicación móvil puede estar disponible mientras el inicio del pago falla debido a la falta de disponibilidad de un HSM o un participante externo. La cadena debe modelarse desde el canal hasta el libro mayor, incluida la autenticación, la API Gateway, los servicios, las colas, los bancos, las redes, los proveedores y los procesos humanos."
  },
  {
    "kind": "subhead",
    "text": "Resiliencia en capas: cada dependencia necesita una respuesta al fracaso"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/figure-01.svg",
    "alt": "Capas interdependientes de resiliencia bancaria, desde las empresas hasta la infraestructura",
    "caption": "Figura 1: La resiliencia se compone de capas técnicas y organizativas interdependientes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.2 Operaciones críticas, impacto y tolerancia a la disrupción",
    "id": "37-2-operaciones-criticas-impacto-y-tolerancia-a-la-disrupcion"
  },
  {
    "kind": "paragraph",
    "text": "El primer paso es identificar operaciones críticas, como consulta de saldo, autorización de tarjeta, liquidación, Pix, emisión de facturas, autenticación, prevención de fraude y acceso de socios. La clasificación debe considerar a los clientes, la estabilidad financiera, las obligaciones regulatorias, las pérdidas financieras, la reputación y el efecto sistémico. Los servicios internos también pueden ser críticos cuando respaldan múltiples viajes externos."
  },
  {
    "kind": "paragraph",
    "text": "El Análisis de Impacto Empresarial relaciona operaciones, dependencias, periodos pico, volúmenes, consecuencias y prioridades de recuperación. La tolerancia a la disrupción expresa cuánto impacto acepta la institución en escenarios severos pero plausibles. Esta tolerancia no es sólo tiempo: puede implicar número de clientes afectados, volumen financiero, retraso en la liquidación, divergencia tolerable y capacidad de contingencia manual."
  },
  {
    "kind": "paragraph",
    "text": "Mapear dependencias requiere ir más allá del diagrama lógico. Es necesario registrar certificados, HSM, DNS, colas, bancos, sistemas heredados, proveedores de nube, telecomunicaciones, equipos de guardia y contratos de soporte. Una dependencia compartida puede invalidar redundancias aparentemente independientes. Dos centros de datos que utilizan el mismo circuito, la misma autoridad de certificación o el mismo canal de configuración tienen riesgos comunes."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - La resiliencia comienza con la operación empresarial y sus dependencias reales.",
    "headers": [
      "Elemento",
      "pregunta de arquitectura",
      "evidencia"
    ],
    "rows": [
      [
        "Operación crítica",
        "¿Qué servicio debería continuar durante la interrupción?",
        "Catálogo, BIA y propietario."
      ],
      [
        "Tolerancia",
        "¿Qué impacto es aceptable y por cuánto tiempo?",
        "Límites y escenarios aprobados."
      ],
      [
        "Dependencias",
        "¿Qué recursos respaldan la operación de un extremo a otro?",
        "Mapa técnico y de terceros."
      ],
      [
        "Contingencia",
        "¿Cómo operar en modo degradado o manual?",
        "Runbook y pruebas periódicas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.3 Métricas: disponibilidad, SLI, SLO, RTO y RPO",
    "id": "37-3-metricas-disponibilidad-sli-slo-rto-y-rpo"
  },
  {
    "kind": "paragraph",
    "text": "La disponibilidad se puede medir como la proporción de tiempo o solicitudes que tienen éxito. Para las API, el indicador debe considerar la semántica: una respuesta HTTP 200 con datos incorrectos no es exitosa. Los SLI pueden medir la tasa de éxito, la latencia, la actualización de los datos, la integridad, el tiempo de procesamiento y el trabajo pendiente. El SLO define el objetivo y el presupuesto de errores le permite decidir cuánto cambio o riesgo operativo cabe en el período."
  },
  {
    "kind": "paragraph",
    "text": "RTO es el tiempo máximo esperado para restaurar la operación después de una interrupción. RPO es la cantidad máxima de datos que se pueden perder, expresada como la distancia temporal entre el último punto recuperable y la falla. Estos valores guían la frecuencia de replicación, copia de seguridad, conmutación por error, automatización y prueba. El RPO cero normalmente requiere mecanismos sincrónicos o un libro de contabilidad distribuido con una fuerte coordinación, lo que aumenta la latencia y la complejidad."
  },
  {
    "kind": "paragraph",
    "text": "MTTR y MTBF ayudan a observar la frecuencia de recuperación y fallas, pero no sustituyen las métricas de experiencia. En los sistemas distribuidos, las degradaciones parciales son más comunes que las fallas totales. Por lo tanto, los tableros deben mostrar la disponibilidad por operación, región, canal y dependencia, así como indicadores de integridad y conciliación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/figure-02.svg",
    "alt": "Cronología que compara RPO y RTO durante una recuperación",
    "caption": "Figura 2: RPO limita la pérdida de datos; RTO limita el tiempo para restaurar la operación."
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Las métricas técnicas deben vincularse a la arquitectura y las decisiones comerciales.",
    "headers": [
      "Objetivo",
      "Significado",
      "decisión influenciada"
    ],
    "rows": [
      [
        "SLO",
        "Nivel de servicio deseado en una sola ventana.",
        "Capacidad, alertas y presupuesto de errores."
      ],
      [
        "RTO",
        "Plazo para restablecer operación.",
        "Automatización, standby y prioridad."
      ],
      [
        "RPO",
        "Pérdida de datos máxima aceptable.",
        "Replicación, diario y respaldo."
      ],
      [
        "Tolerancia a la interrupción",
        "Máximo impacto aceptado en el negocio.",
        "Estrategia de extremo a extremo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.4 Dominios de falla y verdadera redundancia",
    "id": "37-4-dominios-de-falla-y-verdadera-redundancia"
  },
  {
    "kind": "paragraph",
    "text": "Un dominio de falla es un conjunto de componentes que pueden verse afectados por el mismo evento. Los procesos en el mismo host comparten el nodo; los nodos en el mismo rack pueden compartir energía; las zonas pueden compartir una región; Las regiones pueden compartir proveedor, plano de control, identidad o red de área amplia. La verdadera alta disponibilidad requiere identificar el evento más grande que la arquitectura debe tolerar."
  },
  {
    "kind": "paragraph",
    "text": "La redundancia elimina puntos únicos sólo cuando las copias son independientes y se prueban. Dos firewalls con la misma configuración defectuosa pueden fallar simultáneamente. Dos clústeres que reciben el mismo cambio incorrecto no protegen contra errores lógicos. La diversidad operativa, la separación de tuberías, la implementación por etapas y la capacidad de congelar los cambios durante un incidente son parte de la arquitectura."
  },
  {
    "kind": "paragraph",
    "text": "La independencia también debe incluir a las personas y los procedimientos. Es posible que el mismo equipo no pueda operar dos entornos durante una crisis. Las credenciales de emergencia, la comunicación fuera de banda, los contactos de proveedores y el acceso a los runbooks deben sobrevivir a la falta de disponibilidad de los sistemas normales."
  },
  {
    "kind": "paragraph",
    "text": "Prueba de Independencia Pregunte: ¿Qué causa común derriba todas las réplicas? Ya sea que la respuesta incluya identidad, DNS, repositorio de configuración, HSM, ruta, telecomunicaciones, proveedor o equipo, la redundancia todavía tiene un punto compartido que debe abordarse."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.5 Activo-activo, activo-pasivo y multirregión",
    "id": "37-5-activo-activo-activo-pasivo-y-multirregion"
  },
  {
    "kind": "paragraph",
    "text": "En activo-activo, dos o más ubicaciones atienden el tráfico simultáneamente. La capacidad ya se ha calentado y el fallo se puede absorber más rápidamente. Sin embargo, el modelo requiere distribución de datos, enrutamiento, prevención de división del cerebro, coherencia de la configuración y conciliación entre regiones. Obtener RTO puede ir acompañado de una mayor complejidad y costos continuos."
  },
  {
    "kind": "paragraph",
    "text": "En activo-pasivo, una ubicación principal responde y otra permanece lista para asumir el control. El modo de espera puede ser caliente, tibio o frío, según la capacidad, los datos y los componentes activos. Este modelo simplifica algunas decisiones de coherencia, pero la conmutación por error debe automatizarse y probarse. Los entornos pasivos que nunca reciben tráfico tienden a acumular desviaciones, certificados caducados y dependencias no validadas."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas multirregionales necesitan definir la granularidad de la conmutación por error. Mover toda la institución a la vez aumenta el radio de la explosión; mover operaciones por dominio permite el control pero requiere dependencias desacopladas. El regreso a la región original, o conmutación por recuperación, debe tratarse como otro cambio de alto riesgo, con su propia sincronización y criterios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/figure-03.svg",
    "alt": "Comparación entre topologías activo-activo y activo-pasivo",
    "caption": "Figura 3: Activo-activo reduce el tiempo de activación; activo-pasivo reduce la concurrencia, pero requiere un modo de espera listo y demostrable."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La elección debe reflejar tolerancia, integridad, costo y capacidad operativa.",
    "headers": [
      "Topología",
      "ventaja",
      "Riesgo dominante"
    ],
    "rows": [
      [
        "Activo-activo",
        "Capacidad en uso y conmutación por error rápida.",
        "Coherencia, cerebro dividido y conflicto."
      ],
      [
        "Modo de espera activo",
        "RTO bajo con escritura concentrada.",
        "El entorno pasivo puede divergir."
      ],
      [
        "Espera cálida",
        "Menor costo que el modo de espera activo.",
        "Escalar y poner en marcha durante la crisis."
      ],
      [
        "luz piloto",
        "Componentes mínimos y datos replicados.",
        "RTO más grande y locales sin calefacción."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.6 Datos: replicación, quórum y consistencia",
    "id": "37-6-datos-replicacion-quorum-y-consistencia"
  },
  {
    "kind": "paragraph",
    "text": "Los datos suelen ser la parte más difícil de la alta disponibilidad. La replicación sincrónica confirma la escritura solo después de alcanzar la cantidad requerida de réplicas, lo que reduce el RPO, pero aumenta la latencia y la sensibilidad de la red. La replicación asincrónica permite una respuesta más rápida, pero puede perder transacciones aún no replicadas durante una falla. La decisión debe tomarse por clase de datos, no por una única regla para toda la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Los sistemas basados en quórum requieren que las lecturas y escrituras lleguen a una cantidad suficiente de nodos para preservar las propiedades deseadas. Sin embargo, el quórum no elimina automáticamente los conflictos. Es necesario comprender la elección del líder, las tokens de vallado, los relojes, la coherencia linealizable, la coherencia eventual y el comportamiento bajo particiones. El cerebro dividido ocurre cuando lados aislados aceptan operaciones incompatibles; la prevención y la reconciliación deben ser explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Los libros financieros normalmente requieren inmutabilidad lógica, doble entrada, seguimiento auditable y reconstructibilidad. Los cachés y las vistas materializadas pueden eventualmente ser consistentes, siempre y cuando el sistema autorizado permanezca claro. La arquitectura debe diferenciar los datos de decisión, los datos derivados y los datos de presentación, evitando que una réplica tardía sea tratada como una fuente oficial."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: La replicación cumple con la disponibilidad; La copia de seguridad también se ocupa de la corrupción y la pérdida lógica.",
    "headers": [
      "Mecanismo",
      "Propiedad",
      "Precaución"
    ],
    "rows": [
      [
        "replicación sincrónica",
        "Menor pérdida potencial.",
        "Latencia y disponibilidad bajo partición."
      ],
      [
        "replicación asincrónica",
        "Menor latencia y mayor distancia.",
        "RPO y promoción de réplica retrasada."
      ],
      [
        "Quórum",
        "Coordinación entre réplicas.",
        "Configuración, elección y particiones."
      ],
      [
        "Copia de seguridad inmutable",
        "Recuperación de corrupción o ataque.",
        "Es necesario probar la restauración."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.7 Integridad transaccional, idempotencia y conciliación",
    "id": "37-7-integridad-transaccional-idempotencia-y-conciliacion"
  },
  {
    "kind": "paragraph",
    "text": "Las fallas en las transacciones financieras generan estados ambiguos: el cliente recibió un tiempo de espera, pero el pago fue aceptado; la puerta repitió la petición; el servicio registró el libro mayor, pero no publicó el evento; el mensaje se consumió dos veces. La arquitectura necesita resolver la ambigüedad mediante identificadores únicos, claves de idempotencia, estados transaccionales, consultas de estado y conciliación."
  },
  {
    "kind": "paragraph",
    "text": "La idempotencia le permite repetir una operación sin producir efectos financieros adicionales. La clave debe estar vinculada al consumidor, la operación y la carga útil relevante. El servidor debe conservar el resultado o el estado antes de responder para que los reintentos en competencia no eludan la protección. En el caso de la mensajería, la bandeja de entrada, la deduplicación y el procesamiento transaccional reducen los efectos de entrega al menos una vez."
  },
  {
    "kind": "paragraph",
    "text": "El patrón Bandeja de salida transaccional registra el cambio y evento comercial en la misma transacción local; un editor independiente envía el evento más tarde. Esto evita la doble escritura entre el banco y el corredor. Aún así, los consumidores deben tolerar duplicados. La conciliación compara fuentes autorizadas, eventos, acuerdos y declaraciones para identificar diferencias que los controles en línea no resolvieron."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/figure-04.svg",
    "alt": "Flujo resiliente de una transacción financiera con idempotencia y reconciliación.",
    "caption": "Figura 4: Una transacción resistente debe preservar el estado y permitir la recuperación sin duplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "Flujo conceptual de procesamiento idempotente POST/pagos HTTP/1.1 Idempotency-Key: 98f4d0b2-..."
  },
  {
    "kind": "paragraph",
    "text": "1. Reservar la clave y validar el comando 2. Registrar la transacción en el libro mayor 3. Registrar el evento en la Bandeja de salida 4. Responder con el identificador y el estado 5. Publicar el evento y conciliar de forma asincrónica"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.8 Red, DNS, balanceadores y API Gateways",
    "id": "37-8-red-dns-balanceadores-y-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "El camino de una API bancaria pasa por DNS, protección perimetral, balanceadores, API Gateways, redes privadas, proxies y backends. Cada capa necesita controles de estado que reflejen la capacidad real. Una verificación de TCP puede declarar en buen estado una instancia que no puede acceder al HSM o al banco. La preparación debe considerar las dependencias esenciales sin crear una cascada en la que todas las réplicas se eliminen simultáneamente."
  },
  {
    "kind": "paragraph",
    "text": "DNS y GSLB pueden dirigir el tráfico entre regiones, pero TTL, cachés y clientes persistentes retrasan la convergencia. Los equilibradores L4 y L7 pueden mantener las conexiones existentes con la región anterior. En HTTP/2, gRPC y WebSocket, las conexiones duraderas requieren un drenaje y una reconexión controlados. La conmutación por error debe probarse con clientes reales y no sólo con consultas administrativas."
  },
  {
    "kind": "paragraph",
    "text": "Las API Gateways deben distribuir la configuración de forma segura, mantener políticas críticas durante la pérdida del plano de control y tener dependencias de baja latencia para la limitación de velocidad, la autenticación y el enrutamiento. Una arquitectura puede elegir entre falla abierta o falla cerrada mediante control, pero la decisión debe considerar el fraude, la indisponibilidad y la integridad. El cache de claves y políticas necesita caducidad, revocación y observabilidad."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: La disponibilidad de API depende de la convergencia de toda la cadena de red.",
    "headers": [
      "Componente",
      "Fallo típico",
      "controlar"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "El destino anterior permanece en caché.",
        "TTL, salud global y pruebas de convergencia."
      ],
      [
        "equilibrador de carga",
        "Control de salud superficial.",
        "Preparación sin dependencias no esenciales."
      ],
      [
        "API Gateway",
        "El almacén de políticas o el plano de control no están disponibles.",
        "Configuración local válida y reversión."
      ],
      [
        "Red privada",
        "Ruta asimétrica o circuito único.",
        "Caminos independientes y registros de flujo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.9 Seguridad, HSM, PKI, nube y terceros",
    "id": "37-9-seguridad-hsm-pki-nube-y-terceros"
  },
  {
    "kind": "paragraph",
    "text": "La seguridad depende de la disponibilidad. Si falla la autoridad de identidad, HSM, PKI o el servicio secreto, las aplicaciones en buen estado pueden dejar de autenticar y firmar operaciones. Estos componentes necesitan redundancia, capacidad, rotación segura y procedimientos de emergencia. Los certificados de contingencia no deben improvisarse durante el incidente."
  },
  {
    "kind": "paragraph",
    "text": "Contratar la nube y el procesamiento externo requiere conocer regiones, modelos de responsabilidad, soporte, portabilidad, respaldo, acceso administrativo y subcontratistas. La nube múltiple puede reducir la dependencia de un proveedor, pero aumenta la complejidad, las diferencias operativas y la superficie de error. En muchos casos, una arquitectura bien probada en un proveedor con portabilidad de datos es más resistente que dos nubes con un mantenimiento desigual."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust sigue siendo aplicable durante la contingencia. Las cuentas de emergencia deben estar fuertemente aseguradas, auditadas y probadas. La presión por recuperar no justifica desactivar controles y compensaciones atemporales. La respuesta debe registrar quién autorizó, qué restricciones se relajaron y cuándo se restablecerá la configuración normal."
  },
  {
    "kind": "paragraph",
    "text": "Riesgo de dependencia oculta Los sistemas críticos pueden compartir el mismo HSM, tenant de identidad, bóveda secreta, canalización o proveedor de telecomunicaciones. Estos componentes deben aparecer en el mapa de dependencia y en los escenarios de prueba, incluso cuando no formen parte del flujo funcional visible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.10 Capacidad, contrapresión y degradación controlada",
    "id": "37-10-capacidad-contrapresion-y-degradacion-controlada"
  },
  {
    "kind": "paragraph",
    "text": "La conmutación por error aumenta la carga en la infraestructura sobreviviente. Si dos regiones operan al 70% cada una, la pérdida de una no puede ser absorbida por la otra. La planificación de la capacidad debe considerar los picos, el mantenimiento, el crecimiento, los reintentos y la degradación de la dependencia. N+1 significa que la operación continúa después de perder un componente; en el caso de varias regiones, la institución debe decidir si requiere capacidad total o un servicio degradado."
  },
  {
    "kind": "paragraph",
    "text": "La contrapresión evita que los productores cobren de más a los consumidores. Las colas, los límites de concurrencia, la limitación de velocidad y los disyuntores deben mantener el sistema en un rango recuperable. Los reintentos necesitan retrasos, fluctuaciones y presupuesto; de lo contrario, multiplican el tráfico durante la falla. El deslastre de carga rechaza el trabajo de menor prioridad para preservar las operaciones críticas."
  },
  {
    "kind": "paragraph",
    "text": "La degradación elegante debe planificarse con antelación. El banco puede mantener la consulta de saldo y los pagos mientras suspende los informes, las recomendaciones y el enriquecimiento no esenciales. Las respuestas degradadas deben ser explícitas para evitar decisiones basadas en datos obsoletos. Los indicadores de funciones de contingencia deben probarse, versionarse y protegerse contra activaciones inadecuadas."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - La resiliencia incluye controlar la demanda, no solo aumentar la infraestructura.",
    "headers": [
      "Técnica",
      "Objetivo",
      "Ejemplo bancario"
    ],
    "rows": [
      [
        "Contrapresión",
        "Reducir el insumo cuando el consumidor se satura.",
        "Limite los comandos mientras se recupera el libro mayor."
      ],
      [
        "Deslastre de carga",
        "Preservar el tráfico prioritario.",
        "Suspender la presentación de informes antes de los pagos."
      ],
      [
        "disyuntor",
        "Interrumpe llamadas sin posibilidades de éxito.",
        "Evite la conexión en cascada a un proveedor no disponible."
      ],
      [
        "mamparo",
        "Aislar grupos y recursos.",
        "Tarjetas separadas, Pix y consultas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.11 Observabilidad y respuesta a incidentes",
    "id": "37-11-observabilidad-y-respuesta-a-incidentes"
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe responder a si la operación crítica está disponible, es correcta y está dentro de la tolerancia. Las métricas de infraestructura son insuficientes sin señales comerciales: pagos aceptados, liquidados, pendientes, duplicados, revertidos y conciliados. Los seguimientos distribuidos ayudan a localizar la dependencia, mientras que los registros de auditoría explican las decisiones y los cambios."
  },
  {
    "kind": "paragraph",
    "text": "Las alertas deben ser procesables y estar impulsadas por SLO. Una pequeña tasa de error puede ser crítica en una operación de alto valor; una latencia alta puede ser tolerable en los informes. Las alertas de tasa de grabación detectan un consumo acelerado del presupuesto de errores. Las transacciones sintéticas y las sondas externas verifican el recorrido completo, pero necesitan utilizar datos controlados y no crean efectos financieros reales."
  },
  {
    "kind": "paragraph",
    "text": "Durante el incidente, el comando necesita combinar tecnología, negocios, seguridad, comunicaciones y proveedores. Los runbooks describen acciones, condiciones previas y reversiones, pero no sustituyen el juicio. Después de la recuperación, se debe realizar una conciliación y un análisis de causa raíz antes de declarar el cierre definitivo."
  },
  {
    "kind": "subhead",
    "text": "Ciclo de resiliencia operativa"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/es/figure-05.svg",
    "alt": "Ciclo de respuesta, recuperación, reconciliación y aprendizaje ante incidentes.",
    "caption": "Figura 5 - Recuperar el servicio es sólo un paso; conciliando y aprendiendo una resiliencia completa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.12 Cambios, recuperación ante desastres e ingeniería del caos",
    "id": "37-12-cambios-recuperacion-ante-desastres-e-ingenieria-del-caos"
  },
  {
    "kind": "paragraph",
    "text": "Los cambios son una de las principales fuentes de indisponibilidad. La entrega progresiva, canario, azul-verde, indicadores de funciones, validación automática y reversión reducen el riesgo. Los cambios de esquema y las migraciones de datos requieren expandir-migrar-contratar para permitir la coexistencia. La automatización debería bloquear la promoción cuando fallan los SLO, la conciliación o los controles de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "La recuperación ante desastres debe ejercerse con objetivos reales. Simplemente probar la creación de una máquina no prueba que la operación crítica funcione. Las pruebas deben incluir habilitación de tráfico, identidad, claves, datos, colas, proveedores, canales y comentarios. La evidencia debe registrar tiempos, pérdida de datos, intervenciones manuales, desviaciones y acciones correctivas."
  },
  {
    "kind": "paragraph",
    "text": "La ingeniería del caos introduce fallos controlados para validar hipótesis. En los bancos, el scope debe respetar el riesgo y el entorno: la pérdida de pod, el retraso de la red, la indisponibilidad de la zona, la caducidad del certificado, el trabajo pendiente o la falla del HSM se pueden simular progresivamente. El objetivo no es provocar el caos, sino descubrir debilidades ante un hecho real."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Es necesario realizar pruebas para validar hipótesis comerciales y tecnológicas.",
    "headers": [
      "prueba",
      "Hipótesis",
      "Evidencia esperada"
    ],
    "rows": [
      [
        "Pérdida de nodo",
        "Orchestrator restaura la capacidad sin impacto relevante.",
        "Tiempo de recuperación y errores observados."
      ],
      [
        "Fallo de zona",
        "El tráfico migra y los datos se mantienen consistentes.",
        "SLO, quórum y trabajo pendiente."
      ],
      [
        "Promoción regional",
        "El modo de espera asume el control dentro del RTO/RPO.",
        "Camino completo y de reconciliación."
      ],
      [
        "Restauración de copia de seguridad",
        "La corrupción lógica se puede recuperar.",
        "Tiempo, integridad y cadena de custodia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.13 Arquitecturas híbridas, mainframe, Pix y pagos instantáneos",
    "id": "37-13-arquitecturas-hibridas-mainframe-pix-y-pagos-instantaneos"
  },
  {
    "kind": "paragraph",
    "text": "Los bancos suelen combinar mainframes, middleware, banca distribuida, nube y gateways. El mainframe puede ser el libro de contabilidad autorizado, mientras que los canales y las API operan en plataformas modernas. La alta disponibilidad depende del acoplamiento entre estos mundos: las colas, las transacciones, los adaptadores, las ventanas de lotes, la capacidad del host y los límites de conexión deben observarse juntos."
  },
  {
    "kind": "paragraph",
    "text": "Los pagos instantáneos aumentan la necesidad de funcionamiento continuo y baja latencia. La institución necesita tratar la conectividad, los certificados, la firma, la prevención del fraude, los límites, la mensajería, la conciliación y la contingencia como una cadena. La respuesta del cliente debe distinguir el rechazo total, el procesamiento pendiente y el estado desconocido, permitiendo una consulta posterior sin repetir el efecto financiero."
  },
  {
    "kind": "paragraph",
    "text": "En las arquitecturas híbridas, la migración a la nube debe ocurrir a través de capacidades y dominios, no solo mediante fotocopiadoras. Strangler, eventos, API anticorrupción y replicación controlada permiten una transición gradual. La coexistencia necesita criterios claros de propiedad de los datos y de desconexión heredada para evitar dos sistemas autorizados."
  },
  {
    "kind": "paragraph",
    "text": "Caso Pix Una falla de comunicación después de enviar un pedido no debe tratarse automáticamente como una falla comercial. El sistema debe consultar el estado, utilizar identificadores únicos y conciliar antes de permitir otro intento que pueda duplicar el pago."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.14 Troubleshooting y estudios de casos",
    "id": "37-14-troubleshooting-y-estudios-de-casos"
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting de alta disponibilidad comienza con la línea de tiempo. Determine qué cambio o falla ocurrió, qué región o zona se vio afectada, cuándo reaccionó la verificación de estado, cuándo convergió el enrutamiento y qué estado de los datos se promovió. Los registros sin relojes sincronizados e ID de correlación dificultan la reconstrucción."
  },
  {
    "kind": "paragraph",
    "text": "Para conmutaciones por error intermitentes, investigue comprobaciones de estado intermitentes, TTL, grupos de conexiones, sesiones, elecciones de líderes y dependencias con capacidad insuficiente. En caso de divergencia de datos, interrumpa los nuevos escritos contradictorios, preserve la evidencia y establezca la fuente autorizada antes de conciliar. Recuperar la disponibilidad a expensas de la integridad puede agravar la pérdida."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso: una región primaria pierde conectividad con la base de datos. El equilibrador mantiene las instancias en buen estado porque el endpoint técnico responde. Los clientes reciben errores durante varios minutos. La solución implica preparación orientada a la operación, disyuntor, eliminación gradual del tráfico, promoción de réplicas, verificación de retrasos y conciliación posterior."
  },
  {
    "kind": "paragraph",
    "text": "Estudio de caso: después de una implementación, los dos clústeres activo-activo comienzan a rechazar tokens debido a una configuración incorrecta del issuer. La redundancia no protegía contra fallas de configuración comunes. La respuesta requiere una reversión independiente, una implementación por etapas, una validación sintética y una separación de canales entre las oleadas de implementación."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - El diagnóstico debe preservar la integridad y reconstruir la secuencia de los acontecimientos.",
    "headers": [
      "Síntoma",
      "Hipótesis",
      "Evidencia prioritaria"
    ],
    "rows": [
      [
        "Conmutación por error lenta",
        "DNS, conexiones persistentes o espera en frío.",
        "Cronograma y capacidad de enrutamiento."
      ],
      [
        "Pagos duplicados",
        "Vuelva a intentarlo sin idempotencia ni deduplicación.",
        "Claves, libro mayor y registros de comando."
      ],
      [
        "Regiones divergentes",
        "Replicación cerebral retrasada o dividida.",
        "LSN/compensación, quórum y elección."
      ],
      [
        "Fallo simultáneo",
        "Dependencia o cambio compartido.",
        "Mapa y configuración del radio de explosión."
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
    "text": "Las arquitecturas bancarias de alta disponibilidad deben partir de las operaciones críticas y su tolerancia a las interrupciones. La disponibilidad técnica por sí sola no garantiza la resiliencia: integridad, conciliación, seguridad, personas, proveedores y comunicación son parte del resultado."
  },
  {
    "kind": "paragraph",
    "text": "RTO, RPO, SLO y tolerancias impulsan la topología, la replicación, la capacidad y las pruebas. Activo-activo y activo-pasivo tienen diferentes compensaciones; Ninguna de las opciones elimina la necesidad de comprender los datos, las dependencias comunes y el comportamiento bajo la partición."
  },
  {
    "kind": "paragraph",
    "text": "Las transacciones financieras requieren idempotencia, libro de contabilidad autorizado, bandeja de salida, consulta de estado y conciliación. Las redes, DNS, API Gateways, HSM, identidad y nube también son dependencias críticas. La resiliencia operativa se demuestra a través de ejercicios, evidencia y aprendizaje continuo."
  },
  {
    "kind": "paragraph",
    "text": "El siguiente paso del curso, el Capítulo 38, profundizará en la retroubleshooting de API y Gateways, consolidando una metodología para localizar fallas en DNS, TCP, TLS, autenticación, políticas, backends, datos y plataformas distribuidas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de arquitectura",
    "id": "lista-de-verificacion-de-arquitectura"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se documentan las operaciones críticas, propietarios, dependencias y tolerancias.",
      "Los SLI y SLO miden el éxito real, la latencia, la integridad y la actualización por operación.",
      "RTO y RPO tienen pruebas y mecanismos técnicos compatibles.",
      "Se identificaron dominios de falla y dependencias compartidas.",
      "La topología activo-activo o activo-pasivo tiene criterios de promoción y conmutación por recuperación.",
      "Se definen la replicación, el quórum, el cercado y la prevención del cerebro dividido.",
      "Las transacciones utilizan idempotencia, libro mayor, bandeja de salida y conciliación.",
      "Se probaron DNS, equilibradores, API Gateways, conexiones persistentes y clientes en conmutación por error.",
      "En los ejercicios participan HSM, PKI, identidad, secretos, nube y terceros.",
      "La capacidad de supervivencia respalda el fracaso con margen y prioridades explícitas.",
      "La contrapresión, los reintentos, los disyuntores y el deslastre de carga evitan cascadas.",
      "DR, restauración, pruebas de caos y runbooks producen evidencia y acciones correctivas."
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
      "Diferenciar alta disponibilidad, recuperación ante desastres y resiliencia operativa.",
      "Definir RTO y RPO para consulta de saldo, Pix y reporte mensual, justificando diferencias.",
      "Diseñe una arquitectura activo-activo e identifique riesgos de coherencia.",
      "Explique por qué la replicación no reemplaza la copia de seguridad.",
      "Describa cómo evitar pagos duplicados después del tiempo de espera.",
      "Proponer controles de estado para la API Gateway, el servicio y el libro mayor.",
      "Enumere las dependencias comunes que pueden provocar la caída de dos regiones simultáneamente.",
      "Definir una estrategia de degradación elegante para un banco digital.",
      "Cree una prueba de recuperación ante desastres que valide el recorrido completo y la conciliación.",
      "Analice un escenario en el que el servicio regresa rápidamente, pero los datos son divergentes."
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
        "Activo-activo",
        "Topología en la que varias ubicaciones atienden el tráfico simultáneamente."
      ],
      [
        "Activo-pasivo",
        "Topología con ubicación primaria y otra preparada para tomar el relevo."
      ],
      [
        "BIA",
        "Análisis de impacto empresarial utilizado para priorizar la continuidad y la recuperación."
      ],
      [
        "radio de explosión",
        "Alcance afectado por una falla, cambio o incidente."
      ],
      [
        "Recuperación ante desastres",
        "Capacidad de restaurar la tecnología después de un evento severo."
      ],
      [
        "token de esgrima",
        "Mecanismo que impide que un nodo antiguo siga escribiendo después de perder el liderazgo."
      ],
      [
        "Conmutación por recuperación",
        "Retorno controlado a la ubicación original después de la conmutación por error."
      ],
      [
        "Idempotencia",
        "Propiedad que permite repetir una operación sin duplicar su efecto."
      ],
      [
        "Deslastre de carga",
        "Rechazo deliberado de trabajos para preservar operaciones prioritarias."
      ],
      [
        "RPO",
        "Pérdida de datos máxima aceptable medida en el tiempo."
      ],
      [
        "RTO",
        "Plazo máximo esperado para restablecer la operación."
      ],
      [
        "Cerebro dividido",
        "Condición en la que particiones aisladas aceptan decisiones contradictorias."
      ],
      [
        "Tolerancia a la interrupción",
        "Impacto máximo aceptado para una operación crítica."
      ],
      [
        "Espera cálida",
        "Entorno secundario parcialmente activo, ampliado durante la conmutación por error."
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
      "Comité de Basilea de Supervisión Bancaria. Principios para la resiliencia operativa. 2021.",
      "Comité de Basilea de Supervisión Bancaria. Revisiones a los Principios para la Buena Gestión del Riesgo Operacional. 2021.",
      "Banco Central de Brasil. Resolución CMN nº 4.557, de 23 de febrero de 2017 - estructura de gestión de riesgos y capital.",
      "Banco Central de Brasil. Resolución CMN N° 4.893, de 26 de febrero de 2021, con modificaciones posteriores - ciberseguridad y contratación de procesamiento, almacenamiento y nube.",
      "Banco Central de Brasil. Resolución CMN nº 5.274, de 18 de diciembre de 2025 - modificaciones a los requisitos de ciberseguridad y servicios tecnológicos.",
      "Banco Central de Brasil. Normativa Pix y manuales técnicos y de seguridad vigentes.",
      "NIST. SP 800-34 Rev. 1 - Guía de planificación de contingencias para sistemas de información federales.",
      "NIST. Marco de Ciberseguridad 2.0.",
      "Google. Ingeniería de confiabilidad del sitio: disponibilidad, SLO y presupuestos de errores.",
      "OpenTelemetría. Especificaciones y convenciones semánticas para observabilidad distribuida."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de actualización Las regulaciones bancarias, los manuales de acuerdos de pago y los requisitos de los proveedores evolucionan. Antes de aplicar controles o declarar cumplimiento, validar el texto actual del Banco Central, los manuales de servicios críticos y las capacidades reales de la versión implementada."
  }
];
