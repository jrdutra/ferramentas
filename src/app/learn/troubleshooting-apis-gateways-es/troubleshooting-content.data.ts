import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const TROUBLESHOOTING_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Troubleshooting basada en evidencia: del síntoma a la causa raíz"
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "No cambies la plataforma mediante prueba y error: formula hipótesis, recopila evidencia y reduce el espacio de búsqueda."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/overview.svg",
    "alt": "Investigación de API basada en hipótesis, evidencia y causa raíz",
    "caption": "Figura de apertura: una investigación eficiente reduce el espacio de búsqueda a través de evidencia e hipótesis explícitas."
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
    "text": "La troubleshooting de API rara vez comienza con una descripción precisa. El informe inicial tiende a ser \"la API no funciona\", \"el token no funciona\", \"se agotó el tiempo de espera\" o \"la API Gateway devolvió 502\". Estos síntomas son importantes, pero no identifican la causa. La misma respuesta puede ser producida por diferentes componentes, y el mismo fallo puede aparecer de diferentes formas según el punto de observación."
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway ocupa una posición privilegiada y compleja: finaliza las conexiones de los clientes, ejecuta TLS, valida la identidad, aplica políticas, transforma mensajes, crea conexiones con backends y registra la telemetría. Esto significa que puede detectar problemas anteriores, producir errores propios o simplemente propagar fallas de dependencia. Investigar correctamente requiere separar cada parte de la comunicación y distinguir la evidencia observada de una hipótesis que aún no ha sido confirmada."
  },
  {
    "kind": "paragraph",
    "text": "La metodología de este capítulo combina razonamiento en capas, construcción de líneas de tiempo, correlación distribuida y análisis de cambios. El profesional aprende a partir del impacto y scope, a confirmar el camino realmente recorrido, a localizar el último paso exitoso y a seleccionar herramientas compatibles con la hipótesis. El objetivo no es ejecutar todos los comandos disponibles, sino obtener la evidencia mínima que discrimine entre posibles causas."
  },
  {
    "kind": "paragraph",
    "text": "También se discutirá la operación durante los incidentes: contención, mitigación, preservación de evidencia, comunicación, validación de remediación y análisis posterior al incidente. La troubleshooting madura no termina cuando el gráfico vuelve a la normalidad; registra la causa raíz, soluciona las brechas de detección, reduce la recurrencia y transforma el conocimiento tácito en runbooks y automatización."
  },
  {
    "kind": "paragraph",
    "text": "Cómo estudiar este capítulo Elija una solicitud real o ficticia y mantenga siempre los mismos campos: consumidor, zona horaria, host, IP resuelta, puerto, método, URI, ID de solicitud, ID de seguimiento, estado, latencia y backend seleccionado. Rehaga cada sección preguntando qué evidencia confirmaría o descartaría la hipótesis."
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
      "Aplique una metodología basada en hipótesis y evidencia a los incidentes de API.",
      "Defina el impacto, el scope, el cronograma y el cambio correlacionado antes de cambiar los componentes.",
      "Encuentre fallas entre el cliente, DNS, red, API Gateway, backend y dependencias.",
      "Diagnosticar problemas de autenticación y autorización de TCP, NAT, TLS, mTLS, HTTP.",
      "Distinguir los errores producidos por la API Gateway de las respuestas propagadas por el backend.",
      "Investigue políticas, enrutamiento, transformaciones, límites de velocidad, reintentos y tiempos de espera.",
      "Utilice logs, métricas, rastreos, capturas de red y pruebas sintéticas de forma complementaria.",
      "Diagnosticar API en Kubernetes, malla de servicios y entornos multirregionales.",
      "Realice de forma segura contención, remediación, validación y análisis posteriores al incidente.",
      "Cree listas de verificación, runbooks y evidencia reutilizable para los equipos de soporte e ingeniería."
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
      "38.1 La retroubleshooting como proceso científico",
      "38.2 Impacto, scope, cronograma y cambios",
      "38.3 Modelo de capa y ruta de solicitud real",
      "38.4 DNS, direccionamiento y balanceo",
      "38.5 TCP, sockets, NAT, SNAT y conectividad",
      "38.6 TLS, mTLS, certificados y confianza",
      "38.7 HTTP, códigos de estado y semántica de errores",
      "38.8 Autenticación, autorización e identidad",
      "38.9 Políticas, enrutamiento y transformación en la API Gateway",
      "38.10 Backends, datos, colas y terceros",
      "38.11 Tiempos de espera, reintentos, límites de velocidad y fallas en cascada",
      "38.12 Kubernetes, malla de servicios y nube",
      "38.13 Registros, métricas, seguimiento y correlación",
      "38.14 Herramientas y recopilación segura de pruebas.",
      "38.15 Incidente, runbooks y gestión posterior al incidente",
      "38.16 Estudios de caso",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.1 La retroubleshooting como proceso científico",
    "id": "38-1-la-retroubleshooting-como-proceso-cientifico"
  },
  {
    "kind": "paragraph",
    "text": "La retroubleshooting eficiente sigue una secuencia similar al método científico: observar el síntoma, formular hipótesis, predecir qué evidencia se esperaría, realizar una prueba controlada y actualizar la comprensión. El valor de este enfoque radica en evitar cambios simultáneos y conclusiones coincidentes. Reiniciar un componente y ver que el servicio regresa no prueba que la causa estuviera en ese componente; simplemente muestra que el reinicio cambió el estado del sistema."
  },
  {
    "kind": "paragraph",
    "text": "Una hipótesis debe ser lo suficientemente específica como para poder ser probada. \"La red es mala\" es vago. \"La API Gateway no puede abrir la conexión TCP al backend 10.20.30.40:8443 desde la subred de producción\" es verificable. Esta formulación determina el punto de prueba, la herramienta, el tiempo y la evidencia esperada. Si SYN recibe RST, la hipótesis cambia; si no hay respuesta, otra familia de causas tiene prioridad."
  },
  {
    "kind": "paragraph",
    "text": "El investigador también necesita distinguir la causa, la condición contribuyente y el síntoma. Un certificado caducado puede ser la causa inmediata, mientras que la falta de seguimiento y el proceso de renovación manual son condiciones contribuyentes. El error 502 observado por el cliente es un síntoma. Un análisis maduro registra los tres niveles, ya que corregir sólo el certificado restaura el servicio, pero no previene la recurrencia."
  },
  {
    "kind": "paragraph",
    "text": "Regla general Cambie una variable a la vez siempre que el riesgo lo permita. Antes de realizar una acción destructiva, capture registros, métricas, estado de configuración, conexiones, certificados e identificadores necesarios para reconstruir el incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.2 Impacto, scope, cronograma y cambios",
    "id": "38-2-impacto-scope-cronograma-y-cambios"
  },
  {
    "kind": "paragraph",
    "text": "La investigación comienza con el impacto: ¿qué operaciones, consumidores, regiones, entornos y volúmenes se ven afectados? Un error aislado de un cliente podría indicar una configuración local o de credenciales; una falla en todos los consumidores después de una implementación apunta a un cambio compartido. El scope debe refinarse por método, endpoint, versión, tenant, producto, certificado, API Gateway y backend."
  },
  {
    "kind": "paragraph",
    "text": "La línea de tiempo organiza los hechos en orden. Registre el inicio percibido, la primera alerta, el último éxito conocido, las implementaciones, la rotación de certificados, los cambios de DNS, los cambios de firewall, las escaladas y las acciones de mitigación. Utilice relojes sincronizados e indique la zona horaria. Diferencias de apenas unos minutos pueden revertir la aparente relación entre causa y efecto."
  },
  {
    "kind": "paragraph",
    "text": "Los cambios recientes son candidatos fuertes, pero no deberían dominar el análisis sin evidencia. Sin implementación local, pueden ocurrir caducidad de certificados, agotamiento gradual de puertos, crecimiento de colas y cambios de socios externos. El investigador debe comparar el estado actual con una línea de base conocida: configuración, política, versión, certificado, ruta, límites, número de conexiones y comportamiento del tráfico."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Las preguntas iniciales reducen rápidamente el espacio de búsqueda.",
    "headers": [
      "Pregunta",
      "Ejemplo de respuesta útil",
      "evidencia"
    ],
    "rows": [
      [
        "¿Quién se ve afectado?",
        "Sólo socios externos en la región Sur.",
        "Métricas por consumidor y región."
      ],
      [
        "¿Desde cuándo?",
        "Primer error a las 14:32:18 EDT.",
        "Registros y alertas con marca de tiempo."
      ],
      [
        "¿Qué cambió?",
        "Política publicada a las 14:29.",
        "Registro de auditoría y diferencia de configuración."
      ],
      [
        "¿Cuál es tu último éxito?",
        "Solicitar ID abc a las 14:31:54.",
        "Registro completo de seguimiento y acceso."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.3 Modelo de capa y ruta de solicitud real",
    "id": "38-3-modelo-de-capa-y-ruta-de-solicitud-real"
  },
  {
    "kind": "paragraph",
    "text": "El camino trazado en arquitectura no siempre se corresponde con el camino real. El DNS puede devolver diferentes direcciones según la ubicación; un WAF puede terminar TLS; API Gateway puede utilizar otro proxy para llegar al backend; una red de servicio puede insertar sidecares; y la respuesta puede ir por un camino diferente. Antes de completar, confirme los saltos efectivos y los puntos de terminación de conexión."
  },
  {
    "kind": "paragraph",
    "text": "El modelo de capas ayuda a localizar la falla. Si el nombre no se resuelve, no hay conexión TCP. Si el protocolo de enlace TCP falla, TLS no se ha iniciado. Si TLS se completa y hay una respuesta HTTP 401, la red y el cifrado ya han funcionado hasta que se encuentra un componente capaz de interpretar HTTP. Si la API Gateway registra la solicitud y el backend no, la investigación se centra en la sección API Gateway-backend o en la política previa al enrutamiento."
  },
  {
    "kind": "paragraph",
    "text": "La técnica más útil es identificar la última evidencia de éxito y la primera evidencia de fracaso. Este límite reduce el problema. Un seguimiento muestra la API Gateway iniciando una llamada descendente, pero sin tramo de backend: verifique la propagación, la red o la conexión. El backend registra la operación exitosa, pero el cliente recibe un tiempo de espera: investigar la respuesta, los buffers, la conexión de retorno y la fecha límite externa."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/figure-01.svg",
    "alt": "Modelo en capas para encontrar dónde se detuvo una transacción API",
    "caption": "Figura 1: el modelo en capas organiza las responsabilidades y evita investigar la aplicación antes de confirmar la red y el transporte."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/figure-02.svg",
    "alt": "Puntos de observación durante una llamada API empresarial",
    "caption": "Figura 2 - Diferentes puntos de observación revelan diferentes etapas de una misma transacción."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.4 DNS, direccionamiento y balanceo",
    "id": "38-4-dns-direccionamiento-y-balanceo"
  },
  {
    "kind": "paragraph",
    "text": "Las fallas de DNS incluyen NXDOMAIN, SERVFAIL, tiempo de espera de resolución, respuesta incorrecta, horizonte dividido inconsistente, caché desactualizado y resolución de una familia de IP no compatible. La prueba debe ejecutarse desde el mismo entorno que el runtime afectado. Resolver el nombre en el cuaderno del analista no prueba que el contenedor, pod o API Gateway utilice el mismo servidor DNS, dominio de búsqueda o ruta."
  },
  {
    "kind": "paragraph",
    "text": "Compare respuesta, TTL, cadena CNAME, registros A y AAAA y servidores autorizados. En los cambios recientes, tenga en cuenta los cachés intermedios y las conexiones persistentes: cambiar DNS no mueve las conexiones ya establecidas. En entornos privados, confirme zonas privadas, enlaces de red y reenviadores condicionales. Una diferencia entre entornos puede indicar que se está resolviendo el nombre público donde debería haber una respuesta privada."
  },
  {
    "kind": "paragraph",
    "text": "Al realizar el equilibrio, verifique los controles de estado, el grupo elegible, el algoritmo, la afinidad y el drenaje. Un backend puede responder a la verificación de estado superficial y fallar en la operación real. Los registros del equilibrador y de la API Gateway deben indicar qué instancia se seleccionó. La distribución desigual puede deberse a conexiones persistentes, pesos, sesiones fijas o una pequeña cantidad de clientes."
  },
  {
    "kind": "paragraph",
    "text": "Comandos de vigilancia DNS # Linux / macOS dig api.company.example A dig api.company.example AAAA dig +trace api.company.example # Windows PowerShell Resolve-DnsName api.company.example -Type A Resolve-DnsName api.company.example -Server 10.0.0.10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.5 TCP, sockets, NAT, SNAT y conectividad",
    "id": "38-5-tcp-sockets-nat-snat-y-conectividad"
  },
  {
    "kind": "paragraph",
    "text": "La conectividad debe probarse por origen, destino, protocolo y puerto. Ping no valida una API y puede bloquearse. La prueba relevante es abrir la conexión TCP desde el mismo espacio de nombres de red que el componente afectado. La conexión rechazada normalmente indica RST, falta de escucha o rechazo activo. El tiempo de espera de conexión sugiere que no hay respuesta, ruta, firewall o pérdida. El restablecimiento de la conexión durante el uso indica una terminación abrupta por parte de un par o un intermediario."
  },
  {
    "kind": "paragraph",
    "text": "En las API Gateways existen al menos dos conexiones independientes: cliente-API Gateway y API Gateway-backend. Cada uno tiene sus propias IP, puertos, certificados, grupos y tiempos de espera. Es posible que una llamada llegue correctamente al oyente externo y no obtenga un puerto efímero, atraviese SNAT o reutilice una conexión de backend ya cerrada por el otro lado."
  },
  {
    "kind": "paragraph",
    "text": "El agotamiento de SNAT y de los puertos efímeros aparece como una falla intermitente bajo carga. Investigue la cantidad de destinos, la tasa de nuevas conexiones, el mantenimiento de conexión, la agrupación, el TIME_WAIT, los límites de NAT y la distribución por IP saliente. Los registros de flujo y captura de paquetes ayudan a distinguir SYN-ACK, RST y retransmisiones faltantes. Conserva siempre el punto exacto de captura, ya que la misma conexión puede aparecer traducida en cada salto."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los síntomas de transporte deben estar asociados con la evidencia de la red.",
    "headers": [
      "Síntoma",
      "Hipótesis principal",
      "Próxima evidencia"
    ],
    "rows": [
      [
        "Conexión rechazada",
        "Nada escucha o hay rechazo activo.",
        "Captura con RST y estado de escucha."
      ],
      [
        "Tiempo de espera de conexión",
        "Firewall, ruta, pérdida o destino no disponible.",
        "Registros de flujo y SYN retransmitidos."
      ],
      [
        "Reiniciar después de unos segundos",
        "Tiempo de espera de inactividad o par terminado.",
        "FIN/RST y configuración del grupo."
      ],
      [
        "Intermitente bajo carga",
        "Puertos SNAT, backlog o efímeros.",
        "Conexiones, TIMEWAIT y métricas NAT."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.6 TLS, mTLS, certificados y confianza",
    "id": "38-6-tls-mtls-certificados-y-confianza"
  },
  {
    "kind": "paragraph",
    "text": "Las fallas de TLS requieren distinguir protocolo, cifrado, certificado, nombre y confianza. El cliente puede rechazar un certificado caducado, una cadena incompleta, una autoridad que no es de confianza, un nombre de host incompatible o un algoritmo no permitido. El servidor puede rechazar TLS, conjunto de cifrado, SNI o versión del certificado de cliente. El mensaje genérico de \"fallo en el protocolo de enlace\" debe detallarse mediante registros y herramientas de inspección."
  },
  {
    "kind": "paragraph",
    "text": "En mTLS, verifique si el servidor solicitó el certificado, qué cadena envió el cliente, si la clave privada correspondiente está disponible y si la identidad cumple con la política. Los certificados pueden ser correctos en el sistema de archivos y faltar en el proceso debido a un error de recarga. En HSM o Key Vault, investigue los permisos, la latencia, la versión de la clave y la conectividad."
  },
  {
    "kind": "paragraph",
    "text": "SNI selecciona el contexto TLS antes de que se procese el host HTTP. La prueba mediante IP sin informar a SNI puede devolver un certificado predeterminado y producir un diagnóstico falso. Para los backends, confirme también el nombre utilizado por la API Gateway en la validación: la IP de destino, el nombre de host configurado, el SNI enviado y el almacén de confianza pueden no coincidir."
  },
  {
    "kind": "paragraph",
    "text": "Inspección conceptual de TLS y mTLS # Inspeccionar el protocolo de enlace y la cadena presentada openssl s_client -connect api.empresa.example:443 -servername api.empresa.example -showcerts # Prueba con el certificado de cliente openssl s_client -connect backend.internal:8443 -servername backend.internal -cert client.pem -key client.key Precaución operativa Nunca copie claves privadas o tokens reales para herramientas personales. entradas o chats. Recopile solo lo necesario, utilice entornos autorizados y oculte datos confidenciales antes de compartir evidencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.7 HTTP, códigos de estado y semántica de errores",
    "id": "38-7-http-codigos-de-estado-y-semantica-de-errores"
  },
  {
    "kind": "paragraph",
    "text": "El estado HTTP informa el resultado observado por un componente, no necesariamente la causa raíz. Un 401 puede provenir de la API Gateway, el IdP o el backend. Un 502 generalmente indica que un intermediario recibió una respuesta no válida o no pudo completar la comunicación ascendente, pero se debe confirmar la implementación concreta. Un 504 indica un tiempo de espera en la función de API Gateway, mientras que es posible que el cliente haya finalizado antes de tiempo y el servidor continúa procesando."
  },
  {
    "kind": "paragraph",
    "text": "Compare el estado, los headers, el cuerpo y el componente del remitente. Los headers como Servidor, Vía, Estado de proxy, ID de solicitud y formatos de error ayudan a identificar el origen, pero se pueden eliminar o estandarizar. Los detalles del problema proporcionan una estructura para los errores de API, pero los campos de tipo, título, estado y detalles deben interpretarse en contexto. Evite confiar únicamente en el mensaje de texto."
  },
  {
    "kind": "paragraph",
    "text": "Método de nota, URI, Host, Tipo de contenido, Aceptar, Longitud del contenido, Codificación de transferencia y codificación. Los errores 400 pueden resultar de análisis, límite de tamaño, encabezado no válido o transformación. 404 puede indicar una ruta inexistente, una versión incorrecta o una política de ocultación. 409 puede representar conflicto estatal o idempotencia. Límite de 429 puntos y Retry-After puede guiar el reintento. El código 499 es una convención no estándar utilizada por algunos servidores proxy para clientes que han terminado la conexión."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Los códigos de estado inician el análisis, pero no identifican por sí solos al componente responsable.",
    "headers": [
      "Código",
      "Lectura inicial",
      "Pregunta de diagnóstico"
    ],
    "rows": [
      [
        "400",
        "Mensaje no válido o rechazado.",
        "¿Quién realizó el análisis y qué regla falló?"
      ],
      [
        "401 / 403",
        "Autenticación faltante/no válida o acceso denegado.",
        "¿Qué componente decidió y con qué identidad?"
      ],
      [
        "429",
        "Límite excedido.",
        "¿Qué llave, ventana y mostrador se utilizaron?"
      ],
      [
        "502/503/504",
        "Fallo ascendente, indisponibilidad o tiempo de espera.",
        "¿La API Gateway se conectó, recibió una respuesta o se agotó el tiempo de espera?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.8 Autenticación, autorización e identidad",
    "id": "38-8-autenticacion-autorizacion-e-identidad"
  },
  {
    "kind": "paragraph",
    "text": "En cuestiones de identidad, decisión separada de adquisición, validación y autorización de credenciales. Es posible que un cliente no pueda obtener el token; la pasarela puede rechazar suscripción, issuer, audience o vencimiento; y la aplicación puede aceptar el token, pero negar la operación debido al scope, rol, relación con el recurso o política comercial. Cada etapa tiene diferentes evidencias y dueños."
  },
  {
    "kind": "paragraph",
    "text": "Para JWT, confirme el algoritmo permitido, el kid, la clave resuelta, el issuer exacto, la audience, los tiempos de exp/nbf/iat, la desviación del reloj y el token type. La caché JWKS puede conservar la clave anterior; Una rotación mal coordinada puede crear una ventana de falla. Para tokens opacos, verifique la introspección, la autenticación de la API Gateway, el tiempo de espera y el cache de resultados. Nunca concluya que el token es válido sólo porque puede decodificarse."
  },
  {
    "kind": "paragraph",
    "text": "La autorización por objeto y por rol debe probarse con una identidad realista. Un 403 correcto para un usuario e incorrecto para otro puede indicar claims, mapeo de grupo, tenant, propiedad o datos de contexto. En la federación, conserve el issuer y el sujeto originales antes de vincular la cuenta. En mTLS y DPoP, valide el vínculo entre el token y la clave presentada."
  },
  {
    "kind": "paragraph",
    "text": "Evidencia mínima de identidad Emisor del registro, audience, sujeto seudonimizado, client_id, scopes/roles, política aplicada, decisión y motivo. No registre el token completo. El hash o identificador seguro de la credencial suele ser suficiente para la correlación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.9 Políticas, enrutamiento y transformación en la API Gateway",
    "id": "38-9-politicas-enrutamiento-y-transformacion-en-la-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Las políticas pueden rechazar, transformar, enrutar, almacenar en caché, llamar a servicios externos o finalizar el flujo. El orden de ejecución es parte del comportamiento. Una variable no inicializada, una expresión con un tipo inesperado o una rama incorrecta pueden producir un error muy alejado del punto aparente. Compare la política publicada con la línea base y utilice el seguimiento de políticas cuando la plataforma lo permita."
  },
  {
    "kind": "paragraph",
    "text": "En el enrutamiento, confirme API, versión, operación, método, host, plantilla de ruta, reescritura y backend final. Rutas muy genéricas pueden captar llamadas inapropiadas; una barra diagonal, una codificación o una distinción entre mayúsculas y minúsculas pueden cambiar la coincidencia. En API Gateways de varias etapas, el primer componente puede modificar el host, la ruta o los headers antes que el segundo."
  },
  {
    "kind": "paragraph",
    "text": "Las transformaciones deben evaluarse antes y después. Registre tamaños y hashes seguros, no cargas útiles sensibles. Pueden ocurrir errores JSON/XML debido a la codificación, el espacio de nombres, el esquema o el contenido opcional. Las políticas de caché, reintento y respaldo pueden enmascarar el error original; desactivarlos temporalmente requiere control, aprobación y pruebas en un entorno seguro."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: la sección de políticas le ayuda a localizar cuándo se interrumpió el flujo.",
    "headers": [
      "Etapa de política",
      "Fallo típico",
      "evidencia"
    ],
    "rows": [
      [
        "entrante",
        "Token, cuota o validación rechazada.",
        "Seguimiento de políticas y contexto de entrada."
      ],
      [
        "backend",
        "Ruta, certificado o conexión ascendente.",
        "Backend seleccionado y registro de conexión."
      ],
      [
        "saliente",
        "Tamaño de transformación o respuesta.",
        "Respuesta original y pospolítica."
      ],
      [
        "En error",
        "Error original enmascarado.",
        "Excepción interna antes del controlador."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.10 Backends, datos, colas y terceros",
    "id": "38-10-backends-datos-colas-y-terceros"
  },
  {
    "kind": "paragraph",
    "text": "Cuando la API Gateway completa el reenvío, la investigación pasa al backend y sus dependencias. Diferenciar tiempo de cola, procesamiento, base de datos, llamada externa y serialización. Una CPU baja no demuestra salud: el servicio puede estar bloqueado en grupos de conexiones, bloqueos, DNS o E/S. Las métricas de saturación, colas, subprocesos, bucles de eventos y grupos son más informativas."
  },
  {
    "kind": "paragraph",
    "text": "Las bases de datos pueden experimentar consultas lentas, contención de bloqueo, agotamiento del grupo, réplica retrasada o conmutación por error. La respuesta correcta requiere identificar la operación y el estado transaccional. En la mensajería, verifique la confirmación de publicación, el retraso del consumidor, la nueva entrega, DLQ y los pedidos. Una API puede responder 202 correctamente y fallar más tarde; por lo tanto, el identificador de negocio debe acompañar a la operación asincrónica."
  },
  {
    "kind": "paragraph",
    "text": "Las dependencias de terceros requieren separar las fallas locales y remotas. Compare DNS, certificado, tiempo de conexión, primer byte, estado, límite de velocidad y contrato. Los disyuntores pueden abrirse después de una secuencia de fallas y continuar rechazando incluso después de una recuperación remota hasta el período de prueba. El acuerdo de soporte debe definir evidencia mínima y zonas horarias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.11 Tiempos de espera, reintentos, límites de velocidad y fallas en cascada",
    "id": "38-11-tiempos-de-espera-reintentos-limites-de-velocidad-y-fallas-en-cascada"
  },
  {
    "kind": "paragraph",
    "text": "Los tiempos de espera deben analizarse como un presupuesto. El término del cliente contiene procesamiento en el borde, API Gateway, backend y dependencias. Si el tiempo de espera de la API Gateway es mayor que el del cliente, la API Gateway puede continuar con un trabajo que nadie recibirá. Si el reintento se produce cerca del final del plazo, aumenta la carga sin posibilidades de éxito. Los plazos deben ser propagados y observados por cada capa."
  },
  {
    "kind": "paragraph",
    "text": "Los reintentos solo son seguros cuando la operación es idempotente o está protegida por una clave de idempotencia. El registro debe indicar el número de intento, motivo, retraso y destino. Los reintentos de varios niveles multiplican las llamadas: tres reintentos en el cliente, la API Gateway y el backend pueden producir hasta 27 ejecuciones posteriores. El retroceso y la fluctuación reducen la sincronización, pero no corrigen la dependencia sin capacidad."
  },
  {
    "kind": "paragraph",
    "text": "Los límites de tarifas y las cuotas deben revelar la clave, la ventana, el contador y el scope. Un 429 inesperado podría resultar de una NAT compartida, un client_id incorrecto, un contador global o una política heredada. Los disyuntores, mamparos, colas y deslastre de carga pueden producir rechazos deliberados para proteger el sistema. La retroubleshooting debe reconocer que la protección funciona correctamente y no eliminarla sin evaluar el riesgo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/figure-03.svg",
    "alt": "Alineación de tiempos de espera entre cliente, API Gateway, backend y dependencia",
    "caption": "Figura 3: La alineación de los plazos reduce el trabajo inútil y hace que el componente caducado sea identificable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.12 Kubernetes, malla de servicios y nube",
    "id": "38-12-kubernetes-malla-de-servicios-y-nube"
  },
  {
    "kind": "paragraph",
    "text": "En Kubernetes, confirme Pod, Implementación, ReplicaSet, Servicio, EndpointSlice y ruta de ingreso. Un Servicio puede existir sin endpoints listos. La preparación elimina los Pods del equilibrio; la vivacidad reinicia los procesos; La sonda de inicio protege el inicio lento. El evento Pod, el estado anterior del contenedor y el motivo de la terminación ayudan a diferenciar el fallo de la aplicación, OOMKill, la sonda y el desalojo."
  },
  {
    "kind": "paragraph",
    "text": "Las solicitudes y los límites influyen en la limitación y la programación. La limitación de la CPU puede aumentar la latencia sin mostrar una CPU total alta. La memoria por encima del límite produce OOMKill. DNS interno, NetworkPolicy, CNI y kube-proxy/eBPF pueden afectar la conectividad. Las pruebas se deben realizar dentro del Pod o en un Pod de diagnóstico autorizado en el mismo espacio de nombres y política."
  },
  {
    "kind": "paragraph",
    "text": "En la malla de servicios existen aplicaciones, sidecars o proxies por nodo y plano de control. Verifique la configuración recibida, los certificados de carga de trabajo, los clústeres/endpoints, los reintentos y las políticas de autorización. El proxy puede generar un 503 antes de llegar al servicio. En la nube, incluya endpoints privados, NSG/grupos de seguridad, tablas de rutas, SNAT, balanceadores de carga, identidad administrada y límites de servicio."
  },
  {
    "kind": "paragraph",
    "text": "Comandos de recopilación en un entorno autorizado # Ejemplos de observación en Kubernetes kubectl get pods,svc,endpointslices -n equipe-api kubectl describe pod <pod> -n equipe-api kubectl logs <pod> -c aplicacao --previous kubectl get events -n equipe-api --sort-by=.lastTimestamp"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.13 Registros, métricas, seguimiento y correlación",
    "id": "38-13-registros-metricas-seguimiento-y-correlacion"
  },
  {
    "kind": "paragraph",
    "text": "Los registros muestran eventos discretos; las métricas muestran tendencia y distribución; los rastros muestran el camino y la causalidad aproximada. Ninguna señal es suficiente por sí sola. Una elevación de p99 indica degradación, el seguimiento muestra en qué lapso se gastó el tiempo y el registro explica el error específico. Los ejemplos pueden vincular un punto métrico a una traza representativa."
  },
  {
    "kind": "paragraph",
    "text": "La correlación debe cruzar fronteras. El ID de solicitud se puede generar en el borde, el ID de seguimiento sigue el contexto de seguimiento del W3C y el identificador de negocio permite la conciliación. No sustituyas uno por el otro. La API Gateway debe preservar o regenerar identificadores según la política, evitando confiar ciegamente en valores externos que permitan colisiones o inyección en registros."
  },
  {
    "kind": "paragraph",
    "text": "La cardinalidad no controlada reduce la utilidad de las métricas. No utilice CPF, URL completa, token o ID de solicitud como etiqueta. En los registros, enmascare datos personales y secretos. El muestreo de trazas puede ocultar fallas raras; El muestreo de cola le permite retener errores y latencias altas, pero depende de un recopilador y una capacidad adecuados. Los relojes sincronizados son esenciales para obtener cronogramas confiables."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/figure-04.svg",
    "alt": "Correlación entre identificadores técnicos e identificadores comerciales",
    "caption": "Figura 4: Los identificadores técnicos y comerciales desempeñan funciones complementarias en la investigación."
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas deben elegirse por hipótesis. curl o Invoke-WebRequest validan HTTP; openssl inspecciona TLS; dig y Resolve-DnsName miran DNS; ss, netstat y Get-NetTCPConnection muestran sockets; tcpdump y Wireshark analizan paquetes; los registros de flujo revelan decisiones de red; las herramientas de API Gateway muestran la política y el backend; Las interfaces kubectl y mesh muestran el estado de la carga de trabajo."
  },
  {
    "kind": "paragraph",
    "text": "Una captura de paquetes debe tener un scope, duración y filtro mínimos. Capture solo en un entorno autorizado y proteja el archivo, ya que las cargas útiles, las cookies y los tokens pueden aparecer en el tráfico no cifrado o en los endpoints de terminación. Cuando TLS impide que se lea el contenido, los metadata del protocolo de enlace, los tamaños, los tiempos, las retransmisiones y la terminación siguen siendo útiles."
  },
  {
    "kind": "paragraph",
    "text": "Preservar la evidencia significa registrar el comando, el origen, la hora, la versión, los filtros y el hash del archivo. Los tickets deben contener suficientes datos para la reproducción, pero no secretos. Para entornos críticos, automatice paquetes de diagnóstico que recopilen configuraciones y métricas con enmascaramiento y control de acceso."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - La herramienta correcta depende de la pregunta que quieras responder.",
    "headers": [
      "Hipótesis",
      "herramienta adecuada",
      "Evidencia esperada"
    ],
    "rows": [
      [
        "El nombre se resuelve incorrectamente",
        "cavar /Resolve-NombreDns",
        "Respuesta, TTL y servidor consultado."
      ],
      [
        "El protocolo de enlace TLS falla",
        "cliente openssl",
        "SNI, cadena, alerta y versión."
      ],
      [
        "La API Gateway no se conecta",
        "tcpdump/registros de flujo",
        "SYN, SYN-ACK, RST o soltar."
      ],
      [
        "La política rechaza",
        "Seguimiento de plataforma",
        "Filtro, variable y motivo del error."
      ],
      [
        "backend lento",
        "Seguimiento + métricas",
        "Span, pool, consulta y saturación."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.15 Incidente, runbooks y gestión posterior al incidente",
    "id": "38-15-incidente-runbooks-y-gestion-posterior-al-incidente"
  },
  {
    "kind": "paragraph",
    "text": "Durante un incidente, el objetivo inmediato es reducir el impacto sin destruir evidencia ni crear fallas adicionales. Defina el comandante del incidente, el canal, el escriba, los propietarios técnicos y la frecuencia de actualización. Separe las acciones de contención, como eliminar una instancia defectuosa, de las soluciones permanentes. Toda acción debe registrar tiempo, ejecutor, hipótesis y resultado."
  },
  {
    "kind": "paragraph",
    "text": "Los runbooks deben contener criterios, no solo comandos. Un procedimiento de conmutación por error debería indicarle cuándo ejecutarlo, quién lo aprueba, qué condiciones previas comprobar, cómo validar la integridad y cómo regresar. Los comandos sin contexto pueden ser peligrosos. La automatización debe probarse y producir registros auditables."
  },
  {
    "kind": "paragraph",
    "text": "El análisis posterior al incidente reconstruye el cronograma, la causa raíz, las condiciones contribuyentes, la efectividad de la detección y el impacto. Evite atribuir la causa a un \"error humano\" sin preguntar por qué el sistema permitió la acción, por qué la revisión no la detectó y por qué el radio de la explosión fue amplio. Las actuaciones deben ser concretas, con titular, plazo y criterios de realización."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/es/figure-05.svg",
    "alt": "Ciclo de respuesta a incidentes desde la detección hasta el aprendizaje",
    "caption": "Figura 5: Restaurar el servicio es sólo un paso; la validación y el aprendizaje previenen la recurrencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.16 Estudios de caso",
    "id": "38-16-estudios-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: 502 después de la rotación de certificados: los consumidores llegan a la API Gateway, que registra la falla de TLS en el backend. Se instaló el nuevo certificado, pero la cadena intermedia no se agregó al almacén de confianza de la API Gateway. La mitigación restablece la cadena anterior; La solución agrega validación automática de paquetes, superposición de ventanas y pruebas mTLS sintéticas."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: tiempos de espera intermitentes máximos: las métricas muestran un aumento en las nuevas conexiones y los puertos SNAT consumidos. La API Gateway no reutiliza las conexiones porque el backend finaliza el mantenimiento de vida antes de tiempo. La solución alinea los tiempos de inactividad, permite la agrupación, amplía la capacidad de salida y monitorea los puertos libres. Aumentar sólo el tiempo de espera habría empeorado la saturación."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: 401 solo en una región: la validación JWT usa caché JWKS. Una región no actualizó la clave después de la rotación debido a que no se pudo salir al IdP. El token es válido, pero la API Gateway no puede encontrar al kid. La solución corrige la conectividad, invalida de forma segura el caché y agrega una alerta de actualización de JWKS."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - 504 con backend completando la operación: el cliente caduca en 5 segundos, el gateway en 30 y el backend en 25. Se ejecuta el pago, pero el cliente repite. La solución introduce fecha límite propagada, clave de idempotencia, consulta de estado y alineación de tiempo de espera."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Los casos reales se resuelven localizando el límite entre el éxito y el fracaso.",
    "headers": [
      "caso",
      "Últimas pruebas de éxito",
      "Causa raíz"
    ],
    "rows": [
      [
        "502 post-rotación",
        "La API Gateway recibió la solicitud e inició el backend TLS.",
        "Cadena de confianza incompleta."
      ],
      [
        "Tiempo de espera en el pico",
        "Los SYN se apagan, pero los puertos disponibles se caen.",
        "Agotamiento de SNAT por falta de reutilización."
      ],
      [
        "401 regionales",
        "Token firmado con un chico nuevo.",
        "La caché JWKS no se actualiza mediante la salida."
      ],
      [
        "504 con efecto realizado",
        "El backend confirma la transacción después de que el cliente se da por vencido.",
        "Plazos desalineados y falta de idempotencia."
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
    "text": "La retroubleshooting de API y API Gateways es un proceso guiado por hipótesis, cronograma y evidencia. El investigador comienza con el impacto y el scope, confirma la ruta real de la solicitud y encuentra el último paso exitoso. Este enfoque reduce los cambios de prueba y error y mejora la comunicación entre equipos."
  },
  {
    "kind": "paragraph",
    "text": "DNS, TCP, TLS, HTTP, identidad, políticas, backends, mensajería, Kubernetes y malla de servicios producen sus propios síntomas, pero interactúan. Los códigos de estado y los mensajes son pistas, no evidencia de causalidad. Los registros, métricas, seguimientos, capturas y registros de auditoría deben estar correlacionados por tiempo e identificadores seguros."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones maduras preservan la evidencia, contienen el impacto, validan las correcciones y transforman los incidentes en mejoras. Los runbooks, las pruebas sintéticas, las alertas de vencimiento, las diferencias de configuración, la observabilidad y la automatización reducen el MTTR y la recurrencia sin comprometer la seguridad o la integridad."
  },
  {
    "kind": "paragraph",
    "text": "Próximo paso del curso El Capítulo 39 estudiará casos reales de grandes empresas, aplicando los fundamentos de arquitectura, seguridad, resiliencia y retroubleshooting a decisiones e incidentes conocidos en el mercado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación de troubleshooting",
    "id": "lista-de-verificacion-de-troubleshooting"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Se definen impacto, scope, entorno, región, consumidor y operación.",
      "Los horarios utilizan una zona horaria explícita y los relojes de los componentes están sincronizados.",
      "Se registraron el último éxito conocido, el primer fracaso y los cambios correlacionados.",
      "Se han confirmado la ruta de solicitud real y los endpoints TLS.",
      "Se documentan DNS, IP, puerto, protocolo, SNI, host y backend seleccionado.",
      "Se correlacionaron el ID de solicitud, el ID de seguimiento, el ID de transacción de la API Gateway y el identificador de negocio.",
      "Se ha identificado el componente que produjo el estado o error.",
      "Se evaluaron políticas, rutas, transformaciones, límites, caché, reintentos y tiempos de espera.",
      "Backends, bancos, colas y terceros tienen evidencia del mismo rango.",
      "Las colecciones evitan secretos y datos personales innecesarios.",
      "La mitigación fue validada durante todo el viaje y no solo mediante un control sanitario.",
      "La causa raíz, las condiciones contributivas y las acciones preventivas tienen dueño y plazo."
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
      "Convierta el informe \"API ya disponible\" en cinco preguntas de selección objetivas.",
      "Explique cómo distinguir el tiempo de espera de conexión, el tiempo de espera de lectura y 504.",
      "Describa una investigación de 401 causada por la rotación de claves JWT.",
      "Muestre cómo identificar si un 502 fue producido por la API Gateway o el backend.",
      "Proponer evidencia para confirmar el agotamiento del SNAT.",
      "Establezca un presupuesto de tiempo de espera para el cliente, la API Gateway, el backend y el banco.",
      "Explique por qué aumentar los reintentos puede empeorar un incidente.",
      "Cree un runbook para el certificado mTLS que está a punto de caducar.",
      "Describir cómo investigar un servicio de Kubernetes sin endpoints listos.",
      "Escriba un cronograma resumido para un incidente iniciado después de un cambio de política."
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
    "caption": "Tabla 7 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "Línea de base",
        "Estado conocido utilizado para la configuración y comparación de comportamiento."
      ],
      [
        "radio de explosión",
        "Alcance afectado por una falla, cambio o acción operativa."
      ],
      [
        "Tiempo de espera de conexión",
        "Se excedió el plazo antes de establecer la conexión."
      ],
      [
        "ID de correlación",
        "Identificador utilizado para relacionar eventos de una misma transacción."
      ],
      [
        "Primer byte",
        "Hora a la que se recibe el primer byte de la respuesta."
      ],
      [
        "Hipótesis",
        "Explicación comprobable de un síntoma observado."
      ],
      [
        "Mitigación",
        "Actuación temporal para reducir el impacto antes de la corrección definitiva."
      ],
      [
        "Tiempo de espera de lectura",
        "Se superó el plazo de espera de datos una vez establecida la conexión."
      ],
      [
        "Causa raíz",
        "Condición fundamental cuya eliminación impide que el incidente se repita."
      ],
      [
        "Libro de ejecución",
        "Procedimiento operativo con criterios, pasos, validación y rollback."
      ],
      [
        "Agotamiento de SNAT",
        "Agotamiento de los puertos o recursos de traducción de origen."
      ],
      [
        "Prueba sintética",
        "Viaje automatizado ejecutado periódicamente para validar el servicio."
      ],
      [
        "Línea de tiempo",
        "Secuencia temporal de hechos, cambios, síntomas y acciones."
      ],
      [
        "ID de seguimiento",
        "Identificador compartido por los tramos de una transacción distribuida."
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
      "IETF. RFC 9112-HTTP/1.1.",
      "IETF. RFC 9113-HTTP/2.",
      "IETF. RFC 9114-HTTP/3.",
      "IETF. RFC 8446: Protocolo de seguridad de la capa de transporte (TLS), versión 1.3.",
      "IETF. RFC 9209: campo de encabezado de respuesta HTTP de estado de proxy.",
      "IETF. RFC 9457: Detalles del problema para las API HTTP.",
      "W3C. Recomendación de contexto de seguimiento.",
      "OpenTelemetría. Especificaciones, coleccionistas y convenciones semánticas.",
      "NIST. SP 800-115 - Guía técnica para pruebas y evaluaciones de seguridad de la información.",
      "Documentación de Kubernetes. Servicios de depuración, Pods y networking.",
      "Documentación Axway. Monitoreo, seguimiento y administración de API Gateway.",
      "Microsoft aprende. Diagnóstico y troubleshooting de Azure API Management."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de actualización Los comandos, pantallas, métricas y capacidades para API Gateways, mallas y servicios administrados varían según la versión. Antes de ejecutar procedimientos en producción, valide la documentación oficial de la versión implementada, los runbooks internos y las autorizaciones necesarias."
  }
];
