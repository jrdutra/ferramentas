import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const CAPSTONE_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Proyecto integrador: del contrato a la operación resiliente"
  },
  {
    "kind": "subhead",
    "text": "Objetivo final"
  },
  {
    "kind": "paragraph",
    "text": "Construya una plataforma demostrable, segura, observable y operable, con decisiones documentadas y pruebas reproducibles."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/es/overview.svg",
    "alt": "Plataforma API completa que conecta diseño, protección, ejecución y operación",
    "caption": "Figura de apertura: el proyecto conecta las disciplinas del curso en una plataforma operable de extremo a extremo."
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
    "text": "Este capítulo transforma los fundamentos y prácticas estudiados a lo largo del curso en un proyecto técnico completo. El objetivo no es solo publicar una API que responda correctamente, sino construir una pequeña plataforma capaz de demostrar diseño de contrato, protección perimetral, identidad, autorización, integración sincrónica y asincrónica, implementación automatizada, observabilidad, resiliencia, gobernanza y operación. El resultado debe poder ser explicado, probado y reproducido por otro equipo."
  },
  {
    "kind": "paragraph",
    "text": "El escenario propuesto representa una institución financiera ficticia llamada Banco Horizonte. La organización quiere proporcionar API para consultar clientes y cuentas, iniciar pagos y recibir notificaciones. Los consumidores internos, los canales digitales y los socios tendrán diferentes perfiles de acceso. La plataforma debe cumplir requisitos de seguridad y privacidad similares a los de entornos corporativos reales, sin utilizar datos de producción ni credenciales."
  },
  {
    "kind": "paragraph",
    "text": "El proyecto es intencionalmente modular. Es posible implementar una versión mínima en un entorno local con contenedores y evolucionar a Kubernetes, service mesh, message broker y observabilidad distribuida. Esta progresión evita que la infraestructura oculte conceptos esenciales. Cada paso debe introducir una capacidad clara y evidencia objetiva de que funciona."
  },
  {
    "kind": "paragraph",
    "text": "La evaluación considera tanto el producto final como el razonamiento arquitectónico. Diagramas, ADR, contratos OpenAPI, modelos de amenazas, canalizaciones, paneles, pruebas y runbooks forman parte del proyecto. Una plataforma sin documentación y capacidades de diagnóstico no se considera completa, incluso si sus llamadas básicas están funcionando."
  },
  {
    "kind": "paragraph",
    "text": "Cómo utilizar este capítulo Trate el capítulo como un script en ejecución. En cada sección, registre decisiones, hipótesis y evidencia. Siempre que una herramienta específica no esté disponible, reemplácela por una equivalente, preservando el concepto arquitectónico y documentando las compensaciones."
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
      "Diseñar una plataforma API completa basada en requisitos funcionales y no funcionales.",
      "Transforme los dominios empresariales en contratos OpenAPI coherentes y versionables.",
      "Aplicar OAuth 2.0, OpenID Connect, mTLS, API Keys y autorización según el perfil del consumidor.",
      "Configurar un API Gateway con políticas de seguridad, enrutamiento, transformación, límites y observabilidad.",
      "Implementar integración síncrona, asíncrona, idempotencia, Bandeja de salida y manejo de fallas.",
      "Implemente servicios en Kubernetes con sondas, escalado automático, seguridad y estrategia de implementación.",
      "Instrumente registros, métricas y seguimientos con OpenTelemetry y defina SLI y SLO.",
      "Planifique alta disponibilidad, respaldo, recuperación, pruebas de desastres y retroubleshooting.",
      "Producir documentación, automatización y criterios de aceptación que permitan la auditoría y el mantenimiento."
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
      "40.1 Escenario, scope y restricciones",
      "40.2 Arquitectura de referencia",
      "40.3 Requisitos funcionales y no funcionales",
      "40.4 Dominios, API y contratos",
      "40.5 Identidad y seguridad",
      "40.6 API Gateway y políticas",
      "40.7 Microservicios, datos y mensajería",
      "40.8 Kubernetes, malla de servicios y redes",
      "40.9 Observabilidad y SRE",
      "40.10 CI/CD, IaC y gobernanza",
      "40.11 Alta disponibilidad y recuperación",
      "40.12 Fases de implementación",
      "40.13 Criterios de aceptación",
      "40.14 Entregables, demostración y evaluación",
      "40.15 Laboratorios, retroubleshooting y evolución futura"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.1 Escenario, scope y restricciones",
    "id": "40-1-escenario-scope-y-restricciones"
  },
  {
    "kind": "paragraph",
    "text": "Banco Horizonte necesita exponer una plataforma a tres clases de consumidores. La aplicación móvil consulta los datos del cliente e inicia los pagos. Los sistemas internos consultan cuentas y publican eventos de actualización. Los socios externos acceden a operaciones limitadas a través de credenciales, consentimiento y políticas de limitación de velocidad. El diseño debe diferenciar claramente la identidad humana, la aplicación del cliente y la carga de trabajo que realiza cada servicio."
  },
  {
    "kind": "paragraph",
    "text": "La primera versión del proyecto debe contener cuatro capacidades comerciales: registro y consulta de clientes, consulta de cuentas y saldos, inicio idempotente de pagos y publicación de eventos de estado. El scope técnico incluye una API Gateway, un proveedor de identidad, al menos dos servicios de dominio, una base de datos, un corredor o registro de eventos, instrumentación OpenTelemetry y un transportador de entrega automatizado."
  },
  {
    "kind": "paragraph",
    "text": "Existen restricciones para fomentar decisiones realistas. Los datos personales deben ser ficticios y estar minimizados. Los secretos no se pueden versionar en el repositorio. El entorno debe ser reproducible mediante código. Cada operación de escritura debe admitir la idempotencia. Las fallas de dependencia deberían producir respuestas controladas. Los registros no pueden registrar tokens, contraseñas, claves ni cargas útiles confidenciales completos."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - El proyecto debe demostrar capacidades, no sólo presentar componentes.",
    "headers": [
      "Dimensión",
      "Alcance mínimo",
      "Evidencia esperada"
    ],
    "rows": [
      [
        "Negocios",
        "Clientes, cuentas, pagos y eventos.",
        "Los viajes se demostraron de principio a fin."
      ],
      [
        "Seguridad",
        "OAuth/OIDC, autorización, TLS y secretos.",
        "Pruebas positivas y negativas."
      ],
      [
        "Operación",
        "Registros, métricas, seguimientos y alertas.",
        "Cuadro de mando y seguimiento correlacionado."
      ],
      [
        "Entrega",
        "Pipeline, IaC y versionado.",
        "Entorno recreado automáticamente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.2 Arquitectura de referencia",
    "id": "40-2-arquitectura-de-referencia"
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura de referencia separa el borde, la identidad, los dominios, los datos y las operaciones. En el borde, DNS y equilibrio del tráfico de reenvío a API Gateway. La API Gateway finaliza TLS, valida las credenciales, aplica políticas y enruta a servicios internos. El proveedor de identidad emite tokens para usuarios y aplicaciones. Los servicios de Clientes, Cuentas y Pagos mantienen sus propias responsabilidades y evitan compartir tablas directamente."
  },
  {
    "kind": "paragraph",
    "text": "La comunicación síncrona utiliza HTTP/JSON o gRPC según el objetivo del laboratorio. Los eventos de actualización de pagos y registros se publican en Kafka, RabbitMQ o un corredor equivalente. El servicio de notificaciones consume eventos y demuestra un desacoplamiento temporal. Se puede introducir una caché para los datos leídos siempre que la política de invalidación sea explícita."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/es/figure-01.svg",
    "alt": "Arquitectura lógica completa de la plataforma API del proyecto final.",
    "caption": "Figura 1 - Arquitectura lógica del proyecto; Los productos concretos pueden variar sin cambiar las responsabilidades."
  },
  {
    "kind": "paragraph",
    "text": "Regla arquitectónica Cada componente debe existir por una razón verificable. No agregue malla de servicios, caché, corredor o banco adicional solo para aumentar la cantidad de tecnologías. Necesidades de complejidad para resolver una necesidad documentada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.3 Requisitos funcionales y no funcionales",
    "id": "40-3-requisitos-funcionales-y-no-funcionales"
  },
  {
    "kind": "paragraph",
    "text": "Los requisitos funcionales describen comportamientos comerciales observables. El consumidor debe consultar a un cliente autorizado, enumerar las cuentas asociadas, obtener el saldo e iniciar un pago. El pago debe recibir una clave de idempotencia, producir un identificador estable y evolucionar a través de estados controlados. Una consulta de estado debe devolver el mismo resultado independientemente de la instancia que responda la llamada."
  },
  {
    "kind": "paragraph",
    "text": "Los requisitos no funcionales determinan la calidad y la operatividad. Defina la disponibilidad de objetivos, la latencia percentil, el rendimiento, los límites de carga útil, la tasa por consumidor, RTO, RPO, retención de registros y eventos, criterios de privacidad y requisitos de trazabilidad. Incluso en el laboratorio, los números explícitos permiten probar y discutir compensaciones."
  },
  {
    "kind": "paragraph",
    "text": "Los requisitos deben ser mensurables. En lugar de escribir, la API debe ser rápida, establezca, por ejemplo, p95 en menos de 300 ms para consultas sin dependencia degradada. En lugar de que la plataforma sea segura, enumere las comprobaciones: tokens con issuer y audience válidos, least privilege, secretos externos, registros sin datos confidenciales y comunicación interna autenticada."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los requisitos no funcionales deben generar pruebas y evidencia.",
    "headers": [
      "Categoría",
      "Ejemplo de requisito",
      "como comprobar"
    ],
    "rows": [
      [
        "Latencia",
        "p95 de GET /cuentas por debajo de 300 ms.",
        "Pruebas de carga y panel de control."
      ],
      [
        "Disponibilidad",
        "SLO mensual del 99,9% para consultas.",
        "Métrica de éxito por ventana."
      ],
      [
        "Recuperación",
        "RPO de 5 min y RTO de 30 min.",
        "Ejercicio de restauración."
      ],
      [
        "Seguridad",
        "Cada llamada protegida tiene identidad y scope.",
        "Pruebas negativas y auditoría."
      ],
      [
        "Privacidad",
        "Registros sin CPF completo, tokens o secretos.",
        "Escáner y revisión de muestras."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.4 Dominios, API y contratos",
    "id": "40-4-dominios-api-y-contratos"
  },
  {
    "kind": "paragraph",
    "text": "La descomposición comienza con el dominio, no con los endpoints. El cliente representa la identidad y las preferencias de registro. La cuenta representa el vínculo financiero y el saldo disponible. El pago representa intención, validación, ejecución y finalización. La notificación representa la comunicación derivada de eventos. Cada dominio debe tener un propietario, un modelo y un límite de datos claros."
  },
  {
    "kind": "paragraph",
    "text": "Los contratos OpenAPI necesitan definir recursos, métodos, parámetros, esquemas, ejemplos, errores y seguridad. El diseño debe utilizar una semántica HTTP coherente: GET para lectura, POST para creación de intenciones, PUT o PATCH solo cuando la semántica sea clara y los códigos de estado sean estables. Los errores deben utilizar un sobre estandarizado con código, mensaje seguro, ID de correlación y detalles apropiados."
  },
  {
    "kind": "paragraph",
    "text": "La evolución del contrato debe probarse automáticamente. Los cambios incompatibles requieren una nueva versión o un proceso formal. Los campos agregados a las respuestas deben considerar consumidores estrictos. Las enumeraciones, la nulidad, los formatos y los límites son parte del contrato. El portal debe publicar documentación, ejemplos y registro de cambios."
  },
  {
    "kind": "paragraph",
    "text": "Fragmento mínimo del contrato de pagos de openapi: 3.1.0 información: título: Versión de API de pagos: 1.0.0 rutas: /pagos: publicación: operaciónId: iniciarParámetros de pago: - en: nombre del encabezado: Idempotencia-Clave requerida: verdadero esquema: { tipo: cadena, minLongitud: 16 } respuestas: '202': { descripción: Pago aceptado para procesamiento } '409': { descripción: idempotencia clave en conflicto}"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/es/figure-02.svg",
    "alt": "Ciclo impulsado por contratos desde la implementación hasta la evolución",
    "caption": "Figura 2 - El contrato guía la implementación, publicación, operación y evolución."
  },
  {
    "kind": "paragraph",
    "text": "El diseño debe separar la autenticación del usuario, la autenticación de la aplicación y la identidad de la carga de trabajo. La aplicación móvil utiliza un authorization code con PKCE y OpenID Connect. Las integraciones de máquina a máquina utilizan Client Credentials, preferiblemente con una autenticación de cliente sólida. A las cargas de trabajo internas se les asigna su propia identidad y no reutilizan credenciales humanas."
  },
  {
    "kind": "paragraph",
    "text": "La API Gateway valida la firma, el issuer, la audience, la hora y los scopes del access token. El backend sigue siendo responsable de la autorización de objetos y las reglas comerciales. Un token válido no garantiza el acceso a ninguna cuenta; el servicio necesita verificar la relación entre sujeto, consentimiento y recurso solicitado. Esta división demuestra una defensa en profundidad."
  },
  {
    "kind": "paragraph",
    "text": "Los secretos deben permanecer en un administrador de secretos o una solución equivalente. Los certificados y claves necesitan una rotación planificada. Las API externas utilizan TLS; Las integraciones confidenciales pueden utilizar mTLS y tokens vinculados. El modelo de amenazas debe cubrir BOLA, autenticación rota, SSRF, abuso de transmisiones, consumo sin restricciones y exposición de datos."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - La credencial debe corresponder al tipo de sujeto y al riesgo.",
    "headers": [
      "Flujo",
      "Identidad principal",
      "Control esencial"
    ],
    "rows": [
      [
        "Móvil -> API",
        "Usuario + public client.",
        "OIDC, PKCE, estado, nonce y scopes."
      ],
      [
        "Socio -> API",
        "Solicitud confidencial.",
        "Client Credentials, mTLS y cuota."
      ],
      [
        "Servicio -> servicio",
        "Carga de trabajo.",
        "Identidad corta, mTLS y política."
      ],
      [
        "Operador -> plataforma",
        "Persona administrativa.",
        "MFA, RBAC y auditoría."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.6 API Gateway y políticas",
    "id": "40-6-api-gateway-y-politicas"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es el punto de entrada controlado, pero no debe contener toda la lógica empresarial. La canalización entrante valida TLS, autenticación, autorización general, esquema, tamaño de carga útil, límite de velocidad y correlación. La sección backend selecciona el destino y aplica el tiempo de espera. El resultado elimina headers internos, estandariza las respuestas y registra la telemetría. El flujo de errores convierte las fallas técnicas en respuestas consistentes."
  },
  {
    "kind": "paragraph",
    "text": "Las políticas deben organizarse por scope y reutilización. Las reglas globales se ocupan de la correlación y la seguridad básica; las políticas de productos abordan las cuotas; Las políticas de API validan contratos; Las políticas operativas cubren excepciones específicas. Los cambios pasan por control de versiones, revisión y pruebas automatizadas. El proyecto debe demostrar al menos un bloqueo de token no válido, un 429 controlado, una transformación segura y un disyuntor o de reserva."
  },
  {
    "kind": "paragraph",
    "text": "Los registros de API Gateway deben registrar la ruta, el consumidor, el estado, la latencia, el backend y el ID de correlación, sin capturar secretos. Las métricas distinguen los errores producidos en el borde de los errores de backend. Un seguimiento debe mostrar la API Gateway y los servicios descendentes en el mismo árbol."
  },
  {
    "kind": "paragraph",
    "text": "Canalización conceptual de políticas entrantes: - validate-jwt: issuer, audience, firma, exp - requerir-scope: pagos.escribir - límite de tasa: 20 req/s por client_id - validar contenido: OpenAPI - establecer-correlación-id backend: - tiempo de espera: 2 s - ruta: servicio de pago saliente: - eliminar headers internos - emitir-telemetría en caso de error: - asignar-error-a-detalles-del-problema"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.7 Microservicios, datos y mensajería",
    "id": "40-7-microservicios-datos-y-mensajeria"
  },
  {
    "kind": "paragraph",
    "text": "Cada servicio tiene su propio modelo de datos y expone contratos en lugar de tablas. El servicio de pagos registra la intención y publica un evento sin depender de una transacción distribuida entre el banco y el corredor. El patrón Transactional Outbox registra el evento y el estado en la misma transacción local; un proceso posterior publica el evento y programa la entrega."
  },
  {
    "kind": "paragraph",
    "text": "Los consumidores deben ser idempotentes. El servicio de notificaciones mantiene el registro de la bandeja de entrada o de los mensajes procesados. Los reintentos utilizan retrocesos y fluctuaciones, y los mensajes no procesados van al DLQ con suficiente contexto para su investigación. Solo se requiere realizar pedidos mediante la clave comercial, como el ID de pago, lo que evita un cuello de botella global innecesario."
  },
  {
    "kind": "paragraph",
    "text": "Las consultas agregadas pueden utilizar la API de composición o una vista materializada. CQRS y Event Sourcing son extensiones opcionales; Sólo deben incluirse cuando el estudiante pueda explicar su coste. El diseño mínimo debe demostrar explícitamente una eventual coherencia y una estrategia de reconciliación para los desacuerdos."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Los patrones distribuidos deben probarse mediante pruebas de falla.",
    "headers": [
      "Estándar",
      "Problema resuelto",
      "Evidencias en el proyecto."
    ],
    "rows": [
      [
        "Clave de idempotencia",
        "Replay segura de comandos.",
        "Mismo resultado para una replay válida."
      ],
      [
        "Outbox",
        "Atomicidad entre estado y evento.",
        "Evento publicado después del compromiso local."
      ],
      [
        "Inbox",
        "Deduplicación del consumidor.",
        "El mensaje repetido no duplica el efecto."
      ],
      [
        "DLQ",
        "Aislamiento de fallas no transitorias.",
        "Mensaje inspeccionable y reprocesable."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.8 Kubernetes, malla de servicios y redes",
    "id": "40-8-kubernetes-malla-de-servicios-y-redes"
  },
  {
    "kind": "paragraph",
    "text": "Los servicios deben empaquetarse en imágenes inmutables y ejecutarse como un usuario sin privilegios. Las implementaciones definen réplicas, estrategias, solicitudes, límites y sondas. La preparación solo es verdadera cuando la instancia puede recibir tráfico; la vivacidad detecta un choque real; El inicio protege los inicios lentos. PodDisruptionBudget y la distribución de topología reducen la concentración en un único dominio de falla."
  },
  {
    "kind": "paragraph",
    "text": "Los servicios y DNS internos proporcionan descubrimiento. NetworkPolicies restringen la comunicación, la salida y el acceso a los bancos. La API de entrada o API Gateway expone solo la API Gateway externa. Los secretos se ensamblan u obtienen mediante la identidad de la carga de trabajo, evitando credenciales fijas en los manifiestos. HPA puede escalar según la CPU y, preferiblemente, según las métricas relacionadas con la demanda."
  },
  {
    "kind": "paragraph",
    "text": "Una malla de servicio opcional aplica mTLS y la autorización este-oeste. El proyecto debe comparar beneficios y costos: los sidecars o la malla ambiental consumen recursos y agregan otra capa de diagnóstico. La adopción es válida cuando existen requisitos claros para la identidad de la carga de trabajo, la telemetría y el control uniforme."
  },
  {
    "kind": "paragraph",
    "text": "Resumen de carga de trabajo apiVersion: apps/v1 tipo: Metadata de implementación: { nombre: pago-servicio } especificación: réplicas: 3 plantilla: especificación: contenedores: - nombre: imagen de la aplicación: registro/pagamento-servicio: 1.0.0 recursos: solicitudes: { cpu: 200 m, memoria: 256 Mi } límites: { cpu: 500 m, memoria: 512 Mi } readinessProbe: httpGet: { ruta: /health/ready, puerto: 8080 } livenessProbe: httpGet: { ruta: /health/live, puerto: 8080 }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.9 Observabilidad y SRE",
    "id": "40-9-observabilidad-y-sre"
  },
  {
    "kind": "paragraph",
    "text": "Todos los componentes emiten registros, métricas y seguimientos estructurados. El ID de correlación sigue el recorrido, mientras que W3C Trace Context propaga traceparent entre la API Gateway, los servicios y los consumidores. OpenTelemetry Collector recibe señales y elimina atributos confidenciales antes de exportar. Se adoptan convenciones semánticas para HTTP, mensajería, banca y recursos de Kubernetes."
  },
  {
    "kind": "paragraph",
    "text": "Defina SLI alineados con el consumidor: tasa de éxito, latencia, disponibilidad y frescura del procesamiento asincrónico. Un SLO para pago puede combinar la aceptación de la intención y la finalización dentro de una ventana. Las alertas deben utilizar la tasa de consumo y los síntomas percibidos, evitando notificaciones debido a cualquier variación de la CPU."
  },
  {
    "kind": "paragraph",
    "text": "La demostración debe incluir un seguimiento completo, un panel de señales doradas y una alerta ejercida. Introduzca una falla controlada, como la latencia del backend o la indisponibilidad del broker, y muestre cómo se degrada el sistema, qué políticas operan y qué evidencia le permite localizar la causa."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Las señales doradas transforman la plataforma en un sistema investigable.",
    "headers": [
      "señal",
      "Métrica clave",
      "Pregunta respondida"
    ],
    "rows": [
      [
        "Tráfico",
        "solicitudes/s y mensajes/s.",
        "¿Cuánto trabajo es suficiente?"
      ],
      [
        "Errores",
        "Tarifa por código y origen.",
        "¿Dónde y cómo falla?"
      ],
      [
        "Latencia",
        "p50, p95 y p99.",
        "¿Quién nota la lentitud?"
      ],
      [
        "Saturación",
        "CPU, colas, conexiones y retrasos.",
        "¿Qué recurso está cerca del límite?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.10 CI/CD, infraestructura como código y gobernanza",
    "id": "40-10-ci-cd-infraestructura-como-codigo-y-gobernanza"
  },
  {
    "kind": "paragraph",
    "text": "El repositorio debe separar el código, los contratos, la infraestructura y la documentación de forma comprensible. Las solicitudes de extracción ejecutan OpenAPI lint, pruebas unitarias, pruebas de contrato, SAST, análisis de dependencia, creación de imágenes y verificación de manifiesto. La promoción a entornos utiliza artefactos inmutables, no reconstrucción."
  },
  {
    "kind": "paragraph",
    "text": "La infraestructura como código crea redes, clústeres, API Gateways, observabilidad e identidades. GitOps puede conciliar manifiestos de clúster. Los secretos permanecen fuera de Git y se hace referencia a ellos mediante nombres o identidades. La canalización genera SBOM, firma imágenes cuando es posible y bloquea componentes vulnerables por encima del umbral definido."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza no debe impedir la autonomía sin razón. Las plantillas, los fragmentos de políticas, las bibliotecas de observabilidad y los caminos dorados reducen las decisiones repetitivas. Las excepciones tienen titular, justificación, plazo y compensación. Los ADR registran opciones como REST versus gRPC, corredor utilizado, estrategia de control de versiones y modelo de autenticación."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/es/figure-03.svg",
    "alt": "Fases del proyecto con criterios de aceptación y evidencia almacenada.",
    "caption": "Figura 3 - Cada fase debe finalizar con criterios de aceptación y evidencia almacenada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.11 Alta disponibilidad, continuidad y recuperación",
    "id": "40-11-alta-disponibilidad-continuidad-y-recuperacion"
  },
  {
    "kind": "paragraph",
    "text": "La plataforma debe tolerar la pérdida de una instancia sin interrupciones perceptibles. Las réplicas se distribuyen entre nodos o zonas. La API Gateway y los servicios no tienen estado siempre que sea posible. El estado persistente utiliza replicación y copias de seguridad probadas. Las dependencias críticas tienen tiempos de espera, mamparos y límites de concurrencia."
  },
  {
    "kind": "paragraph",
    "text": "RTO y RPO guían la estrategia de recuperación. Una copia de seguridad que nunca ha sido restaurada no es evidencia de recuperación. El laboratorio debe realizar al menos una prueba: eliminación del pod, indisponibilidad del backend, reinicio del broker o restauración de una base en un entorno aislado. El resultado debe documentarse con el tiempo, las pérdidas observadas y las acciones correctivas."
  },
  {
    "kind": "paragraph",
    "text": "La conmutación por error no puede crear duplicidad financiera. La idempotencia, el esgrima y la reconciliación son esenciales. El plan de continuidad incluye contactos, criterios de declaración, runbooks, comunicación y feedback controlado. La alta disponibilidad sin capacidades de operación humana sigue siendo frágil."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.12 Fases de implementación",
    "id": "40-12-fases-de-implementacion"
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - El proyecto evoluciona por capacidad demostrable, no por número de componentes.",
    "headers": [
      "Fase",
      "Entregables clave",
      "Marco de aceptación"
    ],
    "rows": [
      [
        "1. Fundación",
        "Repositorios, ADRs, OpenAPI, entorno local y CI.",
        "Contrato validado y construcción reproducible."
      ],
      [
        "2. Borde e identidad",
        "Gateway, IdP, TLS, JWT, scopes y límites de velocidad.",
        "Horarios autorizados y bloques comprobados."
      ],
      [
        "3. Dominio y eventos",
        "Servicios, banca, idempotencia, Outbox y consumidor.",
        "Pago fluido y flujo de eventos."
      ],
      [
        "4. Plataforma",
        "Kubernetes, observabilidad, SLO, IaC y DR.",
        "Fallo inyectado, diagnosticado y recuperado."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "En la fase de fundación, priorice la claridad del dominio y del contrato. La fase perimetral agrega seguridad antes de aumentar la cantidad de servicios. La tercera fase introduce coherencia y mensajería distribuidas. La fase final endurece la operación, la observabilidad y la recuperación. Este orden reduce la posibilidad de terminar con una infraestructura sofisticada y un flujo de negocios incompleto."
  },
  {
    "kind": "paragraph",
    "text": "Cada fase debe tener una demostración breve y automatizable. Los scripts de pruebas de humo, las recopilaciones de solicitudes y los datos sintéticos aceleran la validación. La documentación debe indicar comandos, requisitos previos y resultado esperado. Una persona que no haya participado en el desarrollo debería poder ejecutar el guión."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.13 Criterios técnicos de aceptación",
    "id": "40-13-criterios-tecnicos-de-aceptacion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Contratos OpenAPI válidos, documentados y versionados sin cambios incompatibles no aprobados.",
      "Trabajo de autenticación y autorización para usuario, socio y carga de trabajo; Las pruebas negativas producen respuestas correctas.",
      "Gateway aplica validación, límite de velocidad, correlación, tiempo de espera y manejo de errores sin exponer datos internos.",
      "El pago es idempotente, persiste en el estado y publica el evento de manera confiable.",
      "El consumidor admite duplicados, reintentos y DLQ; existe un procedimiento de reprocesamiento.",
      "Las cargas de trabajo tienen solicitudes, límites, sondeos, implementación y política de red.",
      "Los registros, métricas y seguimientos le permiten localizar una falla de un extremo a otro.",
      "Pipeline realiza pruebas, escaneos e implementación reproducible; La infraestructura se crea mediante código.",
      "Hay SLO, alerta probada, copia de seguridad restaurada y runbook de incidentes críticos.",
      "La documentación describe la arquitectura, las compensaciones, los riesgos, los costos y la evolución futura."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.14 Entregables, demostración y evaluación",
    "id": "40-14-entregables-demostracion-y-evaluacion"
  },
  {
    "kind": "paragraph",
    "text": "El paquete final debe contener un diagrama de contexto, diagrama de contenedor, flujos de autenticación y pago, contratos OpenAPI, archivos .proto si se usan, modelo de eventos, ADR, modelo de amenazas, manifiestos o gráficos, infraestructura como código, canalizaciones, paneles, alertas, runbooks e informes de prueba. Las capturas aisladas no reemplazan los artefactos versionados."
  },
  {
    "kind": "paragraph",
    "text": "La demostración sugerida dura de quince a veinte minutos. Primero, presente el problema y la arquitectura. Luego realice un viaje autorizado, un intento bloqueado, un reintento idempotente y un consumo de eventos. Luego, inserte una falla, explore métricas y seguimientos, aplique la recuperación y muestre el estado final. Cierre con limitaciones y próximos pasos."
  },
  {
    "kind": "paragraph",
    "text": "La evaluación debe equilibrar funcionalidad, seguridad, confiabilidad, observabilidad, automatización y claridad. Una solución más pequeña pero coherente y bien probada vale más que una arquitectura extensa sin evidencia. Las decisiones conscientes de no utilizar una determinada tecnología también son válidas cuando están justificadas."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Rúbrica sugerida para evaluar el proyecto final.",
    "headers": [
      "Dimensión",
      "Peso sugerido",
      "Pregunta de evaluación"
    ],
    "rows": [
      [
        "Arquitectura y contratos",
        "20%",
        "¿Son coherentes los límites y las interfaces?"
      ],
      [
        "Seguridad y privacidad",
        "20%",
        "¿Están protegidas las identidades, los datos y los secretos?"
      ],
      [
        "Fiabilidad y datos",
        "20%",
        "¿Se manejan fallas, duplicados y recuperaciones?"
      ],
      [
        "Operación y observabilidad",
        "20%",
        "¿Es posible detectar, explicar y responder?"
      ],
      [
        "Automatización y documentación.",
        "20%",
        "¿Puede otro equipo reproducirlo y mantenerlo?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.15 Troubleshooting y laboratorios finales",
    "id": "40-15-troubleshooting-y-laboratorios-finales"
  },
  {
    "kind": "paragraph",
    "text": "El laboratorio final debe causar fallas en diferentes capas: DNS incorrecto, certificado no confiable, token con audience incorrecta, política de API Gateway mal ordenada, tiempo de espera de backend, Pod sin preparación, broker no disponible y consumidor con retraso. Para cada caso, escriba hipótesis, evidencia, prueba confirmatoria y corrección. El objetivo es demostrar el método, no sólo encontrar rápidamente la respuesta."
  },
  {
    "kind": "paragraph",
    "text": "Una segunda secuencia debe probar el abuso y los límites: carga útil superior a la permitida, enumeración no válida, BOLA, replay de pago, ráfaga de solicitudes, secreto expuesto en el registro y consulta lenta. Registre cómo responden la API Gateway, el backend, la banca y la observabilidad. Las defensas deben fallar de manera segura y producir señales suficientes para funcionar."
  },
  {
    "kind": "paragraph",
    "text": "Como evolución, el proyecto puede recibir GraphQL para composición de canales, gRPC entre servicios, WebSocket para notificaciones, políticas multiclúster, activo-activo, Open Finance o adaptativas Zero Trust. Cada extensión debe preservar el principio del curso: comprender las responsabilidades, los contratos, los riesgos y la evidencia antes de agregar complejidad."
  },
  {
    "kind": "paragraph",
    "text": "Cierre del curso Una plataforma API es un sistema sociotécnico: protocolos, código, infraestructura, seguridad, operaciones, gobernanza y personas deben trabajar juntos. El proyecto final tiene éxito cuando hace que estas relaciones sean explícitas y demostrables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de entrega final",
    "id": "lista-de-verificacion-de-entrega-final"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se documentan el escenario, el scope, las limitaciones y los requisitos.",
      "La arquitectura cuenta con diagramas y ADR actualizados.",
      "Las API, eventos y errores tienen contratos versionados.",
      "Las identidades, scopes, consentimientos y reglas de autorización son explícitos.",
      "La API Gateway y las políticas están en código, probadas y observables.",
      "Se ejercieron idempotencia, Bandeja de salida, Bandeja de entrada, reintentos y DLQ.",
      "Kubernetes tiene políticas de seguridad, sondas, recursos, implementación y red.",
      "Se demostraron registros, métricas, seguimientos, SLO y alertas.",
      "Pipelines, IaC, SBOM y estrategia de reversión están disponibles.",
      "Se han probado la copia de seguridad, la restauración, la conmutación por error y los runbooks.",
      "Los datos personales son ficticios, minimizados y protegidos.",
      "Otra persona puede ejecutar la demostración utilizando la documentación."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios de consolidación",
    "id": "ejercicios-de-consolidacion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Diseñe la arquitectura mínima e identifique todos los límites de confianza.",
      "Defina scopes y reglas de autorización de objetos para clientes, cuentas y pagos.",
      "Modele el estado de un pago e indique dónde se aplica la idempotencia.",
      "Redactar el contrato del evento PaymentUpdated y la política de evolución.",
      "Proponer SLO y alertas para consultas e inicio de pagos.",
      "Defina una falla que debería resultar en 502, otra en 503 y otra en 504.",
      "Cree un plan de reversión para una versión de API incompatible.",
      "Describir cómo restaurar el banco y conciliar los acontecimientos después del desastre.",
      "Enumere qué controles pertenecen a la API Gateway, el backend, la malla y la plataforma.",
      "Presente tres ampliaciones futuras y el costo operativo de cada una."
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
    "caption": "Tabla 8 - Vocabulario esencial del proyecto final.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "ADR",
        "Registro de una decisión arquitectónica, contexto, alternativas y consecuencias."
      ],
      [
        "camino dorado",
        "Forma estandarizada y compatible de construir y operar servicios."
      ],
      [
        "Clave de idempotencia",
        "Identificador utilizado para repetir un comando sin duplicar su efecto."
      ],
      [
        "Outbox",
        "Patrón que registra estado y evento en una misma transacción local."
      ],
      [
        "PPD/PEP",
        "Componentes de decisión y aplicación de políticas de acceso."
      ],
      [
        "RPO/RTO",
        "Límites de pérdida de datos y tiempo de recuperación."
      ],
      [
        "SLI/SLO",
        "Indicador medido y objetivo de confiabilidad."
      ],
      [
        "SBOM",
        "Inventario de componentes de software presentes en un artefacto."
      ],
      [
        "modelo de amenaza",
        "Análisis de activos, amenazas, superficies y controles."
      ],
      [
        "Trace Context",
        "Patrón de propagación del contexto de seguimiento distribuido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias técnicas para la ejecución.",
    "id": "referencias-tecnicas-para-la-ejecucion"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Iniciativa OpenAPI. Especificación de OpenAPI 3.1.",
      "IETF. RFC 9110 - Semántica HTTP.",
      "IETF. Mejores prácticas actuales de seguridad de OAuth 2.0, PKCE y OAuth 2.0.",
      "Fundación OpenID. Núcleo de conexión OpenID.",
      "OWASP. API Security Top 10 y estándar de verificación de seguridad de aplicaciones.",
      "Documentación de Kubernetes. Cargas de trabajo, Servicios, Seguridad y API Gateway.",
      "Documentación de OpenTelemetry. Señales, coleccionistas y convenciones semánticas.",
      "NIST SP 800-207. Arquitectura de confianza cero.",
      "Marco de desarrollo de software seguro del NIST.",
      "Documentación oficial de la API Gateway, corredor, banco y proveedor de identidad elegido."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota final Las herramientas y servicios cambian; los principios evaluados permanecen. Registrar versiones, validar la documentación oficial del entorno utilizado y preservar scripts y evidencias para que el proyecto siga siendo reproducible."
  }
];
