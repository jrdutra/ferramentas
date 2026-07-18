import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción completa al español del capítulo 2 de FAAC.
export const TCP_UDP_CHAPTER_BLOCKS_ES: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "En el capítulo anterior, la capa de transporte apareció como un paso en el camino seguido por una solicitud API. Ahora será estudiado en detalle. TCP y UDP se sitúan entre la aplicación y el IP: reciben datos producidos por procesos, identifican puntos de comunicación por puertos y ofrecen servicios de transporte con diferentes características. Esta posición explica por qué una API puede fallar antes de que se procese cualquier método HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Para quienes operan la API Gateways, comprender el transporte es esencial porque el gateway participa en al menos dos relaciones de red: recibe conexiones de los consumidores y crea conexiones para el backends. Estas relaciones son independientes. Es posible que una llamada llegue correctamente al listener externo y aún así falle cuando el gateway intenta abrir o reutilizar un socket para el servicio interno. Timeouts, reseteos, colas de aceptación, pools, puertos efímeros y estados como TIME_WAIT pasan a formar parte del diagnóstico diario."
  },
  {
    "kind": "paragraph",
    "text": "El capítulo combina la especificación contemporánea de TCP, consolidada en RFC 9293, la definición clásica de UDP en RFC 768, los procedimientos de registro de puertos de RFC 6335 y la interfaz sockets estandarizada por POSIX. También se enumeran conceptos operativos presentes en plataformas corporativas, como conexiones persistentes, timeout inactivo, agotamiento de SNAT y seguimiento de fallas en Axway API Gateway y Azure API Management."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo no es memorizar todos los campos o estados, sino construir un modelo mental preciso. Al final, el lector debería poder observar un error como conexión rechazada, restablecimiento de conexión, conectar timeout o leer timeout y formular hipótesis técnicas coherentes sobre dónde se detuvo la comunicación y qué pruebas se deben recopilar."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Siga las explicaciones con una captura de paquetes o con los comandos presentados en la práctica. TCP es más fácil de entender cuando SYN, ACK, números de secuencia, ventanas y apagado dejan de ser abstracciones y se convierten en eventos observables."
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
      "Explicar la función de la capa de transporte y el proceso de multiplexación de puertos.",
      "Diferenciar entre socket, conexión, sesión de aplicación, puerto y punto final.",
      "Describa el protocolo de enlace de tres vías, el flujo de bytes, los números de secuencia, los ACK y las retransmisiones TCP.",
      "Distinga entre control de flujo y control de congestión.",
      "Comprenda FIN, RST, medio cerrado, TIME_WAIT y sus impactos operativos.",
      "Explicar las características de UDP y reconocer cuándo la aplicación debe implementar garantías.",
      "Comprenda los puertos conocidos, registrados y efímeros, incluidos los conflictos de puertos y enlaces.",
      "Relacione la agrupación, el mantenimiento de conexión, NAT/SNAT y el agotamiento de puertos con fallas en gateways.",
      "Aplique herramientas y síntomas para investigar problemas de transporte en las API empresariales."
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
      "2.1 La capa de transporte y su relación con las API",
      "2.2 Multiplexación, puntos finales y tuplas de conexión",
      "2.3 Sockets como abstracción del sistema operativo",
      "2.4 TCP: servicio de flujo de bytes confiable",
      "2.5 Apretón de manos de tres vías",
      "2.6 Números de secuencia, ACK y retransmisión",
      "2.7 Control de flujo",
      "2.8 Control de congestión",
      "2.9 Cierre, FIN, RST y TIME_WAIT",
      "2.10 Temporizadores, timeouts, mantenimiento de actividad y agrupación",
      "2.11 UDP: transporte de datagramas",
      "2.12 TCP o UDP: criterios de elección",
      "2.13 Puertos, registros IANA y puertos efímeros",
      "2.14 NAT, SNAT y agotamiento de puertos",
      "2.15 TCP en API Gateways",
      "2.16 Solución de problemas y herramientas",
      "2.17 Estudios de caso",
      "2.18 Laboratorios de observación",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.1 La capa de transporte y su relación con las API",
    "id": "camada-transporte"
  },
  {
    "kind": "paragraph",
    "text": "El protocolo IP entrega paquetes entre interfaces de red identificadas por direcciones, pero no identifica por sí solo qué proceso debe recibir los datos dentro de la computadora. Un servidor puede ejecutar simultáneamente un gateway, una base de datos, un agente de monitoreo y servicios administrativos en la misma dirección IP. La capa de transporte agrega identificadores de servicio (los puertos) y permite que el sistema operativo entregue cada unidad entrante al proceso correcto."
  },
  {
    "kind": "paragraph",
    "text": "La capa de transporte también define el tipo de servicio ofrecido a la aplicación. TCP proporciona una conexión lógica, un flujo ordenado de bytes, detección de pérdidas, retransmisión, control de flujo y control de congestión. UDP ofrece datagramas independientes con un mecanismo mínimo: puertos, tamaño y suma de comprobación. Esta diferencia no significa que UDP sea defectuoso; significa que la aplicación elige qué garantías son necesarias y dónde se implementarán."
  },
  {
    "kind": "paragraph",
    "text": "En las API HTTP/1.1 y HTTP/2, el transporte tradicional es TCP. La aplicación escribe bytes en un socket y TCP decide cómo segmentarlos, transmitirlos, reconocerlos y retransmitirlos. HTTP no recibe información de que se ha perdido un segmento de IP en particular; sólo ve un flujo que tarda más o una conexión que termina. Esta separación de responsabilidades simplifica la aplicación, pero puede ocultar la causa de las latencias y timeouts."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utiliza QUIC, que opera sobre UDP. QUIC implementa, en el espacio del usuario, varias propiedades asociadas con el transporte confiable, incluido el establecimiento seguro, la recuperación de pérdidas y el control de la congestión. Por tanto, decir que HTTP/3 utiliza UDP no significa que acepte la pérdida de datos incontrolada; significa que las garantías se construyeron en otra capa."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "IP intenta transportar paquetes al host. TCP o UDP identifican procesos por puertos. La aplicación interpreta el contenido. En caso de fracaso, primero determine a cuál de estas responsabilidades apunta la evidencia."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-1-es.svg",
    "alt": "Procesos de multiplexación por direcciones y puertos.",
    "caption": "Figura 1 - Multiplexación de procesos por direcciones y puertos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.2 Multiplexación, puntos finales y tuplas de conexión",
    "id": "multiplexacao"
  },
  {
    "kind": "paragraph",
    "text": "Un punto final de transporte suele estar representado por la combinación de dirección IP y puerto. El punto final 10.20.30.40:443 identifica una interfaz y un puerto en ese host, pero no identifica una conexión específica por sí solo. Un servidor puede mantener miles de conexiones simultáneas en el puerto 443 porque cada cliente utiliza una dirección de origen y un puerto diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Una conexión TCP se distingue por la combinación de protocolo, IP de origen, puerto de origen, IP de destino y puerto de destino. Esta identificación a menudo se denomina 5-tupla; cuando el protocolo es implícito, hablamos de 4-tupla. Por lo tanto, dos clientes pueden acceder a la misma dirección y puerto gateway sin conflicto, y un solo cliente puede abrir múltiples conexiones usando diferentes puertos efímeros."
  },
  {
    "kind": "paragraph",
    "text": "La multiplexación es el proceso de combinar datos de múltiples procesos en una infraestructura de red compartida. La demultiplexación es el proceso inverso: al recibir un segmento, el sistema operativo examina el protocolo, las direcciones y los puertos para encontrar el socket correspondiente. En UDP, la asociación puede ser menos específica dependiendo de cómo se vinculó socket; En TCP, cada conexión establecida tiene una identidad precisa."
  },
  {
    "kind": "paragraph",
    "text": "La dirección de los campos también importa. En una captura realizada en el cliente aparece el puerto 443 como destino en el envío y como origen en la respuesta. En una captura sobre gateway, la conexión a backend puede utilizar otro puerto de origen, otra IP e incluso otro protocolo de seguridad. El diagnóstico siempre debe indicar el punto de observación para evitar interpretar la tupla al revés."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de tuplas distintas"
  },
  {
    "kind": "code",
    "text": "Conexión A: TCP 192.0.2.10:51021 -> 203.0.113.20:443\nConexión B: TCP 192.0.2.10:51022 -> 203.0.113.20:443\nConexión C: TCP 192.0.2.11:49800 -> 203.0.113.20:443"
  },
  {
    "kind": "code",
    "text": "Todos llegan al mismo listener, pero son flujos independientes."
  },
  {
    "kind": "subhead",
    "text": "Aplicación en registros"
  },
  {
    "kind": "paragraph",
    "text": "Al correlacionar registros de firewall, balanceador y gateway, conserve la IP y el puerto de origen. La IP por sí sola puede no ser suficiente en entornos con NAT, servidores proxy y un gran volumen de conexiones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.3 Sockets como abstracción del sistema operativo",
    "id": "sockets"
  },
  {
    "kind": "paragraph",
    "text": "Socket no es un protocolo transmitido por la red. Es una abstracción que ofrece el sistema operativo para que los procesos utilicen servicios de comunicación. En sistemas compatibles con POSIX, socket() crea un descriptor; bind() asocia una dirección local; listen() marca un socket de flujo como receptor de conexiones; accept() retira una conexión pendiente de la cola y crea un nuevo socket conectado; connect() inicia una asociación con un endpoint remoto."
  },
  {
    "kind": "paragraph",
    "text": "En un servidor TCP, el socket de escucha permanece asociado al puerto publicado. Cada llamada exitosa a accept() produce otro descriptor dedicado a una conexión. Esta distinción es importante: cerrar un socket aceptado finaliza únicamente ese cliente, mientras que cerrar el socket de escucha impide nuevas conexiones. Los procesos de gateway utilizan variantes más sofisticadas, con múltiples hilos, bucles de eventos o procesos, pero el principio permanece."
  },
  {
    "kind": "paragraph",
    "text": "Un socket tiene envío y recepción administrados por el kernel buffers. Cuando la aplicación llama a send(), los bytes solo se pueden copiar al buffer local; esto no significa que el par ya los haya recibido o procesado. Asimismo, recv() podrá devolver sólo una parte del contenido solicitado. Las aplicaciones basadas en TCP necesitan delimitar mensajes a nivel de protocolo, porque TCP conserva el orden de los bytes, no los límites de llamadas send()."
  },
  {
    "kind": "paragraph",
    "text": "Los sockets pueden ser bloqueantes o no bloqueantes. En modo bloqueante, una operación puede esperar datos, espacio en el buffer o su finalización. En modo no bloqueante, la aplicación recibe un estado que indica que debe intentarlo de nuevo y utiliza mecanismos como select, poll, epoll o puertos de finalización de E/S. Los gateways de alto rendimiento evitan reservar un hilo bloqueado para cada conexión y utilizan modelos orientados a eventos o pools controlados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-2-es.svg",
    "alt": "Operaciones conceptuales de sockets en el cliente y el servidor.",
    "caption": "Figura 2: Operaciones conceptuales de sockets en el cliente y el servidor."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo: el código real debe manejar la concurrencia y los errores"
  },
  {
    "kind": "code",
    "text": "# Flujo conceptual de un servidor TCP\nfd_escucha = socket(AF_INET, SOCK_STREAM, 0)\nbind(fd_escucha, '0.0.0.0:8443')\nlisten(fd_escucha, backlog)"
  },
  {
    "kind": "code",
    "text": "while activo:\n    fd_cliente = accept(fd_escucha)\n    gestionar_conexion(fd_cliente)\n    close(fd_cliente)"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "0.0.0 no es un objetivo remoto"
    ]
  },
  {
    "kind": "paragraph",
    "text": "Cuando se vincula a 0.0.0.0, el proceso solicita escuchar en todas las interfaces IPv4 locales compatibles. Los consumidores no deben utilizar 0.0.0.0 como dirección de destino de la API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.4 TCP: servicio de flujo de bytes confiable",
    "id": "tcp"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9293 consolida la especificación moderna del Protocolo de control de transmisión. TCP está orientado a la conexión: antes del intercambio de datos normal, los puntos finales establecen un estado común. El protocolo proporciona comunicación full-duplex, por lo que cada lado puede enviar y recibir simultáneamente. Cada dirección tiene su propia secuencia de bytes, ventanas y acuses de recibo."
  },
  {
    "kind": "paragraph",
    "text": "La unidad entregada a la aplicación es un flujo de bytes. Si una aplicación llama a send() dos veces, el receptor puede leer los datos en una sola llamada o en varias partes. TCP no mantiene los límites lógicos de JSON, HTTP o cualquier otro mensaje. Los protocolos de aplicación resuelven el encuadre utilizando tamaños explícitos, delimitadores, encabezados o reglas propias; HTTP/1.1, por ejemplo, utiliza longitud de contenido, transferencia fragmentada o cierre en contextos definidos."
  },
  {
    "kind": "paragraph",
    "text": "Confiabilidad significa que TCP intenta entregar bytes no duplicados y en orden mientras la conexión siga siendo viable. El remitente asigna números de secuencia, el receptor reconoce el siguiente byte esperado y los segmentos no reconocidos pueden retransmitirse. Si la comunicación resulta imposible, la aplicación recibe un error; TCP no puede garantizar el éxito ante un fallo permanente de un par o de la red."
  },
  {
    "kind": "paragraph",
    "text": "El encabezado TCP contiene puertos, números de secuencia y reconocimiento, banderas, ventanas, sumas de comprobación y opciones. El campo de ventana participa en el control de flujo. Banderas como SYN, ACK, FIN y RST controlan el ciclo de conexión. Las opciones negociadas en el protocolo de enlace pueden informar el tamaño máximo del segmento, la escala de la ventana, las marcas de tiempo y admitir el reconocimiento selectivo."
  },
  {
    "kind": "paragraph",
    "text": "TCP no conoce solicitudes HTTP, tokens ni métodos REST. Transporta bytes. Una conexión puede seguir en buen estado mientras la aplicación está bloqueada y no produce respuesta; en ese caso, connect() ya se completó, pero el consumidor puede experimentar un read timeout. Separar la conectividad del procesamiento de la aplicación es una de las distinciones más útiles en el troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: campos y funciones de encabezado TCP relevantes.",
    "headers": [
      "Elemento",
      "Función principal"
    ],
    "rows": [
      [
        "Puerto de origen/destino",
        "Identificar puntos finales de transporte"
      ],
      [
        "Número de secuencia",
        "Colocar bytes en la secuencia"
      ],
      [
        "Número de acuse de recibo",
        "Indique el siguiente byte esperado"
      ],
      [
        "Banderas",
        "Control de apertura, confirmación, reset y cierre."
      ],
      [
        "ventana",
        "Anunciar capacidad de recepción"
      ],
      [
        "Suma de comprobación",
        "Detectar corrupción de segmentos"
      ],
      [
        "Opciones",
        "Negociar extensiones como MSS, SACK, WS y marcas de tiempo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.5 Handshake de tres vías",
    "id": "handshake"
  },
  {
    "kind": "paragraph",
    "text": "El establecimiento normal de una conexión TCP utiliza tres segmentos. El iniciador envía SYN con un número de secuencia inicial. El receptor responde SYN+ACK, acusando recibo del SYN recibido y presentando su propio número inicial. El iniciador concluye con ACK. Después de este intercambio, ambas partes tienen suficiente estado para transportar bytes en ambas direcciones."
  },
  {
    "kind": "paragraph",
    "text": "El handshake no sirve únicamente para preguntar si el puerto está abierto. Sincroniza los espacios de secuencia y permite negociar opciones que afectarán a toda la conexión. MSS limita el tamaño del payload TCP que el par pretende recibir en un segmento; Window Scale amplía la capacidad de anuncio de ventana; SACK Permitted habilita acknowledgments selectivos; los timestamps ayudan a medir el RTT y protegen contra la reutilización problemática de números."
  },
  {
    "kind": "paragraph",
    "text": "Cuando no hay ningún proceso escuchando en el puerto de destino, el host generalmente responde con RST, lo que genera una conexión rechazada en el cliente. Cuando un firewall desconecta silenciosamente el SYN, no hay respuesta inmediata; el cliente retransmite y finalmente llega a conectar timeout. Estos síntomas parecen similares para el usuario, pero apuntan a comportamientos de red diferentes."
  },
  {
    "kind": "paragraph",
    "text": "El SYN backlog y la cola de accept también influyen en la disponibilidad. El kernel necesita mantener el estado de las conexiones en establecimiento y de las conexiones completadas que aún esperan la llamada accept() de la aplicación. Bajo sobrecarga, ataque o cuando la aplicación no acepta con suficiente rapidez, las colas pueden saturarse. El resultado puede ser pérdida de SYN, retrasos, resets o fallos intermitentes aunque el proceso parezca activo."
  },
  {
    "kind": "paragraph",
    "text": "La latencia del protocolo de enlace contribuye al tiempo total de una llamada, especialmente en redes distantes o cuando se crean nuevas conexiones para cada solicitud. La reutilización de la conexión evita la repetición del protocolo de enlace TCP y, cuando TLS está presente, también reduce las negociaciones criptográficas. Es por eso que el mantenimiento de conexión y la agrupación de conexiones tienen un impacto importante en el rendimiento y la latencia."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-3-es.svg",
    "alt": "Establecimiento normal de una conexión TCP",
    "caption": "Figura 3 - Establecimiento normal de una conexión TCP."
  },
  {
    "kind": "subhead",
    "text": "Connect timeout vs. read timeout"
  },
  {
    "kind": "paragraph",
    "text": "La conexión timeout se produce antes de que se establezca la conexión. La lectura timeout ocurre después de que hay una conexión, pero los datos esperados no llegan a tiempo. Los escenarios y las hipótesis causales son diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.6 Números de secuencia, ACK y retransmisión",
    "id": "sequencia"
  },
  {
    "kind": "paragraph",
    "text": "Números TCP en bytes, no en paquetes. Si un segmento transporta 500 bytes del número 1000, el siguiente byte esperado es 1500. El receptor utiliza el campo de reconocimiento para comunicar este valor. Los ACK tradicionales son acumulativos: ACK 2000 confirma que todos los bytes anteriores al 2000 se recibieron continuamente, incluso si los segmentos posteriores llegaron desordenados."
  },
  {
    "kind": "paragraph",
    "text": "Las pérdidas se pueden detectar mediante un temporizador o mediante un patrón de ACK. El remitente mantiene una estimación del tiempo de ida y vuelta y calcula una retransmisión timeout según el algoritmo estandarizado en RFC 6298. Cuando el plazo vence sin confirmación, los datos se retransmiten y se ajusta el temporizador. La repetición de Timeouts normalmente provoca un retroceso, lo que aumenta el intervalo para evitar que empeore la congestión."
  },
  {
    "kind": "paragraph",
    "text": "Los ACK duplicados pueden indicar que faltaba un segmento intermedio mientras llegaban segmentos posteriores. Los algoritmos de retransmisión rápida permiten retransmitir antes del RTO bajo ciertas condiciones. Con el reconocimiento selectivo, el receptor informa que recibió bloques desordenados, lo que permite al remitente retransmitir pérdidas específicas en lugar de repetir una pista más grande."
  },
  {
    "kind": "paragraph",
    "text": "La retransmisión mejora la confiabilidad pero aumenta la latencia. Una API puede experimentar picos de tiempo de respuesta sin errores HTTP cuando la capa de transporte recupera las pérdidas. Las métricas exclusivas de la aplicación pueden mostrar una solicitud lenta; La captura de paquetes o las métricas del sistema pueden revelar retransmisiones, ACK duplicados y variaciones de RTT."
  },
  {
    "kind": "paragraph",
    "text": "La suma de comprobación detecta daños durante el transporte, pero no es un mecanismo criptográfico. No protege contra alteraciones maliciosas y no reemplaza a TLS. Su finalidad es detectar errores accidentales en el segmento y direcciones consideradas por el pseudoencabezado. La integridad de la seguridad debe ser proporcionada por protocolos criptográficos apropiados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-4-es.svg",
    "alt": "ACK acumulativo y retransmisión de un hueco en el flujo",
    "caption": "Figura 4 - ACK acumulativo y retransmisión de una brecha en el flujo."
  },
  {
    "kind": "subhead",
    "text": "Lectura de capturas"
  },
  {
    "kind": "paragraph",
    "text": "Una retransmisión observada en gateway no prueba automáticamente que gateway haya causado la pérdida. La captura muestra el punto de observación. Compare ambos lados del camino cuando la ubicación exacta de la pérdida sea importante."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.7 Control de flujo",
    "id": "fluxo"
  },
  {
    "kind": "paragraph",
    "text": "El control de flujo protege al receptor contra un remitente que es más rápido que su capacidad para consumir datos. El receptor anuncia una ventana de recepción, normalmente derivada del espacio disponible en su buffer. El remitente limita el número de bytes no reconocidos para no exceder esta ventana. Si la aplicación receptora deja de leer, buffer puede llenarse y la ventana se reducirá."
  },
  {
    "kind": "paragraph",
    "text": "Cuando el receptor anuncia la ventana cero, el remitente detiene el envío normal y utiliza el mecanismo de persistencia para comprobar periódicamente si la ventana se ha abierto de nuevo. Es posible que una conexión permanezca establecida, pero sin que la aplicación avance. En el diagnóstico, la ventana cero y la ventana llena indican presión en el lado receptor, no necesariamente congestión en la ruta."
  },
  {
    "kind": "paragraph",
    "text": "El campo de ventana original tiene 16 bits de longitud. En redes con un producto de gran ancho de banda x retardo, este límite puede impedir el uso completo de la ruta. La opción Window Scale, actualmente definida en RFC 7323, negocia un factor en SYN para representar ventanas más grandes. La opción debe negociarse durante el establecimiento; no se activa a mitad de la conexión."
  },
  {
    "kind": "paragraph",
    "text": "Un Buffers demasiado pequeño puede limitar el rendimiento, mientras que un buffers excesivo puede aumentar la latencia y la memoria. El ajuste depende del sistema operativo, RTT, volumen y patrón de tráfico. Cambiar parámetros globales sin medir puede cambiar un problema por otro. En gateways, también hay buffers y límites en la capa de aplicación, por lo que es necesario distinguir entre ventana TCP y almacenamiento en búfer HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-5-es.svg",
    "alt": "Umbrales de recepción y congestión independientes",
    "caption": "Figura 5 - Límites de congestión y recepción independiente."
  },
  {
    "kind": "subhead",
    "text": "rwnd no es un límite de tasa"
  },
  {
    "kind": "paragraph",
    "text": "La ventana TCP controla los bytes en tránsito según la capacidad del receptor. La limitación de tasas de API controla las solicitudes de acuerdo con una política comercial o de protección. Son mecanismos de diferentes capas y unidades."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.8 Control de congestión",
    "id": "congestionamento"
  },
  {
    "kind": "paragraph",
    "text": "El control de congestión protege la red compartida. Incluso si el receptor tiene un buffer grande, es posible que la ruta no admita una ráfaga de datos. TCP mantiene una ventana de congestión en el remitente y limita los bytes en tránsito al valor más pequeño entre cwnd y la ventana de recepción. Por tanto, el control de flujo protege el destino y el control de congestión protege el camino."
  },
  {
    "kind": "paragraph",
    "text": "RFC 5681 describe algoritmos interconectados clásicos: inicio lento, evitación de congestión, retransmisión rápida y recuperación rápida. El inicio lento comienza con una ventana limitada y aumenta rápidamente a medida que regresan los ACK. A pesar del nombre, el crecimiento puede ser exponencial por viaje de ida y vuelta. Al alcanzar un umbral o observar una pérdida, el algoritmo cambia a un comportamiento más conservador."
  },
  {
    "kind": "paragraph",
    "text": "La prevención de la congestión generalmente sigue la idea de escalamiento aditivo y escalamiento multiplicativo: la ventana crece gradualmente cuando la red parece saludable y se reduce significativamente ante signos de congestión. Las implementaciones modernas pueden utilizar algoritmos como CUBIC, BBR o variantes específicas, pero aún así deben coexistir de manera responsable con otras corrientes."
  },
  {
    "kind": "paragraph",
    "text": "La pérdida no es la única señal posible. La notificación explícita de congestión permite a los dispositivos marcar paquetes en lugar de descartarlos cuando hay soporte de extremo a extremo disponible. Las colas, el buffering y el jitter también afectan la latencia. Una API puede transferir poco contenido y aun así sufrir porque comparte la ruta con flujos más grandes o porque la cola de cuellos de botella ha crecido."
  },
  {
    "kind": "paragraph",
    "text": "En los centros de datos y las nubes, los tiempos cortos de RTT hacen que las ráfagas y microráfagas sean relevantes. El rendimiento agregado de gateways puede estar limitado por la CPU, el cifrado, las conexiones o la red. Antes de aumentar los límites de las aplicaciones, es necesario verificar que la capa de transporte esté reaccionando a la congestión real y que la arquitectura distribuya adecuadamente el tráfico."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Conceptos de rendimiento y recuperación en TCP.",
    "headers": [
      "Concepto",
      "Pregunta respondida",
      "Signo típico"
    ],
    "rows": [
      [
        "Ventana de recepción",
        "¿Puede el receptor almacenar más bytes?",
        "Ventana reducida o ventana cero"
      ],
      [
        "Ventana de congestión",
        "¿Parece que la red admite más bytes en vuelo?",
        "Crecimiento y reducción según ACKs/pérdidas"
      ],
      [
        "RTT",
        "¿Cuánto tiempo tarda la confirmación?",
        "Variación de latencia"
      ],
      [
        "RTO",
        "¿Cuándo considerar perdidos los datos no confirmados?",
        "Retransmisión después de timeout"
      ],
      [
        "saco",
        "¿Qué bloques fuera de servicio ya han llegado?",
        "Recuperación más selectiva"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.9 Cierre, FIN, RST y TIME_WAIT",
    "id": "encerramento-tcp"
  },
  {
    "kind": "paragraph",
    "text": "TCP es full-duplex, por lo que cada dirección se puede terminar por separado. FIN indica que el remitente no enviará nuevos bytes en esa dirección, pero aún puede recibir datos. El peer reconoce el FIN con ACK y, cuando también termina de enviar, transmite su propio FIN. Por tanto, la terminación normal puede implicar cuatro segmentos."
  },
  {
    "kind": "paragraph",
    "text": "Medio cerrado es el estado en el que un lado ha terminado su dirección de envío pero continúa recibiendo. Algunas aplicaciones utilizan este comportamiento para indicar el final de la entrada y esperar resultados. HTTP persistente normalmente delimita los mensajes sin depender del cierre, ya que cerrar la conexión impediría su reutilización."
  },
  {
    "kind": "paragraph",
    "text": "RST finaliza abruptamente la conexión e indica que el estado esperado no existe o que un punto final ha decidido abortar. El restablecimiento de la conexión por parte del par puede ocurrir cuando la aplicación cierra un socket con datos pendientes, un intermediario elimina el estado, se reinicia un proceso o llega un subproceso para una conexión que ya no se conoce. Identificar quién envió el RST es decisivo."
  },
  {
    "kind": "paragraph",
    "text": "TIME_WAIT es un estado que normalmente mantiene la parte que realizó el cierre activo y envió el ACK final. Le permite absorber segmentos retrasados ​​de la conexión anterior y retransmitir el ACK final si es necesario. La duración depende de la implementación y se refiere a la vida útil máxima del segmento. TIME_WAIT no es una fuga por definición; Es parte del funcionamiento seguro de TCP."
  },
  {
    "kind": "paragraph",
    "text": "Una gran cantidad de TIME_WAIT puede indicar una alta tasa de apertura y cierre. El problema no es sólo la memoria: los puertos efímeros pueden no estar disponibles temporalmente para el mismo destino, especialmente con NAT. Reutilizar conexiones es generalmente más saludable que intentar eliminar el estado ajustando agresivamente los parámetros del sistema operativo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-6-es.svg",
    "alt": "Apagado normal y permanencia en TIME_WAIT",
    "caption": "Figura 6: Apagado normal y permanencia en TIME_WAIT."
  },
  {
    "kind": "subhead",
    "text": "RST no es código HTTP"
  },
  {
    "kind": "paragraph",
    "text": "Se produce un reinicio en la capa de transporte. Es posible que el consumidor no reciba ninguna respuesta HTTP o que un intermediario convierta el error en 502/503. Diferenciar el evento TCP de la representación generada por un gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.10 Temporizadores, timeouts, keep-alive y pooling",
    "id": "timers"
  },
  {
    "kind": "paragraph",
    "text": "Timeout es una política de espera aplicada en un punto específico. Conecte el establecimiento de límites timeout; lectura o respuesta timeout limita la espera de datos después de la conexión; escribir límites timeout enviar progreso; inactivo timeout cierra las conexiones inactivas; La solicitud timeout puede abarcar varios pasos. Los productos y bibliotecas usan nombres diferentes, por lo que la documentación debe indicar exactamente el reloj iniciado y el evento que lo finaliza."
  },
  {
    "kind": "paragraph",
    "text": "TCP keepalive es un mecanismo del sistema operativo para detectar pares inalcanzables en conexiones inactivas, generalmente con valores predeterminados largos. Una conexión HTTP permanente o persistente significa reutilizar la conexión para múltiples mensajes. Son conceptos relacionados, pero no equivalentes. Una conexión HTTP puede ser persistente sin frecuentes sondeos de mantenimiento de conexión de TCP."
  },
  {
    "kind": "paragraph",
    "text": "La agrupación de conexiones mantiene un grupo de conexiones listas para un destino determinado. El pool reduce los protocolos de enlace, el uso de CPU, la latencia y el consumo de puertos. Sin embargo, requiere límites, validación de conexión, timeout inactivo y estrategia para conexiones que el par cerró silenciosamente. Una conexión eliminada de pool puede estar obsoleta, lo que produce un reinicio o una falla en la primera escritura."
  },
  {
    "kind": "paragraph",
    "text": "Los timeouts deben estar alineados entre los saltos. Si el balanceador cierra conexiones inactivas a los 60 segundos y el gateway cree que siguen siendo válidas durante cinco minutos, el pool puede reutilizar sockets que el intermediario ya eliminó. Si el timeout del cliente es menor que el timeout del gateway, este puede seguir procesando una operación cuyo consumidor ya desistió, con riesgo de reintentos y duplicidad."
  },
  {
    "kind": "paragraph",
    "text": "Los reintentos no deben agregarse automáticamente a cada falla. Es posible que se haya procesado una operación en backend incluso si se perdió la respuesta o se agotó el tiempo de espera del cliente. Los métodos y operaciones idempotentes permiten estrategias más seguras; Las operaciones financieras necesitan claves de idempotencia, correlación y reglas explícitas antes de la repetición."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: Timeouts debe nombrarse según el paso que controla.",
    "headers": [
      "Timeout",
      "comienzo tipico",
      "Ejemplo de causa"
    ],
    "rows": [
      [
        "DNS timeout",
        "Consulta de nombre",
        "Resolver ruta no disponible o bloqueada"
      ],
      [
        "Conectar timeout",
        "Enviando SYN/conexión",
        "Firewall descarte, ruta o atraso"
      ],
      [
        "Apretón de manos TLS timeout",
        "Después de TCP, durante TLS",
        "Certificado, algoritmo o par lento"
      ],
      [
        "Lectura/respuesta timeout",
        "Después de enviar la solicitud",
        "Backend lento, punto muerto o pérdida recuperada"
      ],
      [
        "Inactivo timeout",
        "Sin bytes por período",
        "Conexión persistente sin actividad"
      ],
      [
        "Pool adquirir timeout",
        "Esperando conexión desde pool",
        "Pool saturado o con fugas"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Axway y conexiones persistentes"
  },
  {
    "kind": "paragraph",
    "text": "La documentación de la API de Axway Gateway le permite configurar hosts remotos y timeout inactivos para conexiones persistentes. El valor debe ser coherente con firewalls, balanceadores y backends que participan en el mismo salto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.11 UDP: transporte de datagramas",
    "id": "udp"
  },
  {
    "kind": "paragraph",
    "text": "UDP se definió para proporcionar comunicación de datagramas con un mecanismo mínimo. Cada envío produce una unidad de mensaje preservada: un recvfrom() recibe un datagrama, no un fragmento arbitrario de flujo como en TCP. El encabezado tiene puertos de origen y destino, longitud y suma de comprobación. La simplicidad reduce el estado y la sobrecarga, pero no proporciona una conexión confiable."
  },
  {
    "kind": "paragraph",
    "text": "UDP no garantiza la entrega, el pedido, la eliminación de duplicados ni el control de congestión. Los datagramas pueden perderse, repetirse o llegar desordenados. Si la aplicación necesita estas propiedades, debe implementarlas o utilizar un protocolo sobre UDP que las proporcione. Esta responsabilidad incluye temporizadores, identificadores, retransmisión, control de velocidad y manejo de fragmentación."
  },
  {
    "kind": "paragraph",
    "text": "El tamaño del mensaje es importante. Un datagrama grande puede requerir fragmentación de IP o exceder la ruta MTU, lo que aumenta el riesgo de pérdida. Las aplicaciones robustas evitan depender de la fragmentación y diseñan en consecuencia. En redes con filtros, UDP también puede comportarse de manera diferente que TCP, porque los dispositivos mantienen un estado temporal basado en flujos sin protocolo de enlace."
  },
  {
    "kind": "paragraph",
    "text": "DNS es un ejemplo clásico de protocolo que usa UDP para consultas comunes y puede usar TCP en situaciones específicas. QUIC utiliza UDP como sustrato, pero implementa conexión, cifrado, flujos, recuperación y congestión. Las aplicaciones de voz y vídeo en tiempo real pueden preferir descartar los datos retrasados ​​en lugar de esperar la retransmisión, pero aún necesitan controlar la velocidad y afrontar las pérdidas."
  },
  {
    "kind": "paragraph",
    "text": "UDP tiene una suma de comprobación para la detección de errores, pero no autentica al remitente. Como no existe un protocolo de enlace equivalente a TCP, es necesario considerar la suplantación y amplificación de direcciones en el diseño de servicios públicos. Los protocolos deben validar las solicitudes, limitar las respuestas y seguir prácticas de prevención de abusos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-7-es.svg",
    "alt": "Comparación de servicios ofrecidos a nivel de aplicación",
    "caption": "Figura 7 - Comparación de servicios ofrecidos a nivel de aplicación."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Encabezado UDP clásico de 8 bytes.",
    "headers": [
      "campo UDP",
      "Tamaño",
      "Propósito"
    ],
    "rows": [
      [
        "Puerto de origen",
        "16 bits",
        "Puerto de origen; puede ser cero en contextos permitidos"
      ],
      [
        "Puerto de destino",
        "16 bits",
        "Puerto de proceso de destino"
      ],
      [
        "Longitud",
        "16 bits",
        "Longitud del encabezado y de los datos"
      ],
      [
        "Suma de comprobación",
        "16 bits",
        "Detección de errores sobre pseudoencabezado, encabezado y datos"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.12 TCP o UDP: criterios de elección",
    "id": "escolha"
  },
  {
    "kind": "paragraph",
    "text": "La elección no debe basarse únicamente en frases como TCP es seguro y UDP es rápido. TCP no proporciona seguridad criptográfica y UDP no es automáticamente más rápido en ninguna aplicación. El criterio central es el servicio requerido: flujo confiable y ordenado, datagramas independientes, tolerancia a datos retrasados, control sobre la retransmisión, movilidad, multiplexación de flujos y compatibilidad de infraestructura."
  },
  {
    "kind": "paragraph",
    "text": "Para las API REST tradicionales, TCP sigue siendo natural porque HTTP/1.1 y HTTP/2 se diseñaron sobre un flujo confiable. El coste de establecer una conexión se puede amortizar mediante pooling. Para HTTP/3, QUIC se creó sobre UDP para reducir las limitaciones de transporte e integrar la seguridad, pero esto no hace que una aplicación UDP simple sea equivalente a TCP."
  },
  {
    "kind": "paragraph",
    "text": "En tiempo real, la información puede perder valor rápidamente. Un paquete de audio retrasado puede ser peor que un pequeño intervalo y la retransmisión indiscriminada puede aumentar la latencia. En transferencias de archivos o transacciones financieras, la correcta entrega y confirmación son fundamentales. Aun así, TCP no proporciona automáticamente la semántica empresarial como exactamente una vez; La aplicación necesita idempotencia y persistencia."
  },
  {
    "kind": "paragraph",
    "text": "La infraestructura también influye. Firewalls, NAT, proxies y observabilidad pueden tratar a UDP de manera diferente. Antes de elegir, valide el soporte de ruta, el comportamiento en caso de pérdida, la estrategia de seguridad, los límites de MTU y las herramientas de operación. La arquitectura empresarial debe considerar no sólo el rendimiento del laboratorio, sino también la gobernanza y la capacidad de diagnóstico."
  },
  {
    "kind": "subhead",
    "text": "exactamente una vez"
  },
  {
    "kind": "paragraph",
    "text": "TCP garantiza un flujo de bytes no duplicado dentro de una conexión, pero no garantiza que una operación comercial se ejecute exactamente una vez ante reintentos, fallas y reconexiones. Esta propiedad requiere diseño en la aplicación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.13 Puertos, registros IANA y puertos efímeros",
    "id": "portas"
  },
  {
    "kind": "paragraph",
    "text": "Los puertos son números de 16 bits, por lo que varían de 0 a 65535. La IANA mantiene el Registro de números de puerto de protocolo de transporte y nombres de servicio y el RFC 6335 describe los procedimientos de gestión. El rango 0-1023 se denomina tradicionalmente Puertos del sistema o Puertos conocidos; 1024-49151 corresponde a Puertos de Usuario o Registrados; 49152-65535 son puertos dinámicos y/o privados."
  },
  {
    "kind": "paragraph",
    "text": "El registro no significa que un puerto esté técnicamente reservado en todos los sistemas, ni el uso de un número conocido hace que aparezca el protocolo correspondiente. Un proceso puede intentar escuchar en un puerto diferente, sujeto a permisos y políticas. El registro promueve la interoperabilidad y la capacidad de descubrimiento, pero la seguridad debe validar el protocolo y la identidad, no solo el número de puerto."
  },
  {
    "kind": "paragraph",
    "text": "El sistema operativo elige puertos efímeros para las conexiones salientes. El rango efectivo puede variar según la plataforma y la configuración, aunque el rango dinámico de IANA sea una referencia. Cuando un cliente abre una conexión al puerto 443, normalmente recibe un puerto local temporal. El par local y remoto debe seguir siendo único mientras existan la conexión y ciertos estados relacionados. bind() puede asociar el socket a una dirección específica, a todas las interfaces o a un puerto elegido. El error address already in use puede ocurrir cuando otro socket ya ocupa la combinación o cuando las reglas de reutilización no permiten una nueva asociación. SO_REUSEADDR y opciones similares tienen semánticas dependientes del sistema y no deben utilizarse como solución genérica sin comprender su efecto."
  },
  {
    "kind": "paragraph",
    "text": "Escuchar en todas las interfaces aumenta la superficie de exposición. Un servicio administrativo que sólo debería estar en bucle invertido o en la red interna puede publicarse accidentalmente. Firewalls aún son necesarios, pero el principio de mínima exposición recomienda vincular listeners solo a las direcciones requeridas y documentar cada puerto abierto."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Rangos de puertos según la clasificación utilizada en el registro de IANA.",
    "headers": [
      "Rango",
      "Clasificación IANA",
      "Uso típico"
    ],
    "rows": [
      [
        "0-1023",
        "Sistema / Conocido",
        "Servicios ampliamente estandarizados; Es posible que se requieran privilegios."
      ],
      [
        "1024-49151",
        "Usuario / Registrado",
        "Aplicaciones y servicios registrados"
      ],
      [
        "49152-65535",
        "Dinámico/Privado",
        "Asignación dinámica y uso privado"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "El puerto 443 no prueba HTTPS"
  },
  {
    "kind": "paragraph",
    "text": "Un proceso puede aceptar cualquier protocolo en el puerto 443 y HTTPS se puede configurar en otro puerto. El puerto crea una convención operativa; la negociación y los bytes observados determinan el protocolo real."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.14 NAT, SNAT y agotamiento de puertos",
    "id": "nat-snat"
  },
  {
    "kind": "paragraph",
    "text": "La traducción de direcciones de red modifica direcciones y, a menudo, puertos para permitir que múltiples flujos compartan una dirección. En las conexiones salientes, Source NAT reemplaza la dirección privada y el puerto de origen con una combinación pública o intermedia. El equipo mantiene el estado para devolver las respuestas al flujo correcto."
  },
  {
    "kind": "paragraph",
    "text": "Dado que el puerto es parte de la identidad de la conexión, el traductor tiene un inventario finito por dirección y reglas de reutilización. Muchas conexiones simultáneas o altas tasas de apertura y cierre hacia el mismo destino pueden consumir puertos disponibles. Los estados retenidos después del cierre, como TIME_WAIT o los tiempos de retención de NAT, retrasan la reutilización."
  },
  {
    "kind": "paragraph",
    "text": "El síntoma común es la intermitencia: algunas conexiones funcionan y las nuevas conexiones al mismo host y puerto fallan hasta que se liberan los recursos. La aplicación puede registrar la conexión timeout, la excepción socket o 5xx generado por un intermediario. Aumentar timeout no crea puertos y puede empeorar la presión al mantener los recursos ocupados por más tiempo."
  },
  {
    "kind": "paragraph",
    "text": "Las primeras correcciones son arquitectónicas: reutilizar conexiones, escalar pools, reducir la creación innecesaria, distribuir destinos cuando sean legítimos y utilizar conectividad privada o NAT del tamaño de una plataforma. Agregar IP expande el inventario, pero solo puede posponer el problema si el patrón de conexión sigue siendo ineficiente."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, las llamadas a backends pueden consumir puertos SNAT según la topología y el destino. La documentación oficial describe fallas intermitentes y estrategias como NAT Gateway en escenarios admitidos, múltiples IP de backend y mitigación abierta repetitiva. Las métricas de conexión, destino y tarifa ayudan a confirmar la hipótesis."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-8-es.svg",
    "alt": "Conexiones gateway y presión en los puertos de salida.",
    "caption": "Figura 8 - Conexiones gateway y presión en los puertos de salida."
  },
  {
    "kind": "subhead",
    "text": "Señal de funcionamiento"
  },
  {
    "kind": "paragraph",
    "text": "Si las fallas aumentan con la tasa de nuevas conexiones, concéntrese en el mismo destino y desaparecen después del deslastre de carga, investigue la agrupación y SNAT. Aún así, confirma con métricas y capturas antes de concluir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.15 TCP en API Gateways",
    "id": "api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Un HTTP gateway actúa como proxy y finaliza una conexión de consumidor. Interpreta el mensaje y, para reenviarlo, utiliza otra conexión a backend. Incluso cuando ambos saltos usan TCP 443, son sockets, números de secuencia, certificados, timeouts y estados independientes. gateway no se limita a extender el mismo flujo TCP al servicio."
  },
  {
    "kind": "paragraph",
    "text": "En el frente, las preocupaciones incluyen la capacidad de listener, el trabajo pendiente de SYN, el límite de conexión, el TLS externo, el mantenimiento del cliente y la protección contra conexiones lentas. En la parte posterior, gateway necesita resolver el nombre de backend, adquirir o abrir una conexión desde pool, negociar TLS interno cuando corresponda, enviar la solicitud y esperar una respuesta. Una falla backend se puede convertir a 502, 503 o 504 dependiendo de la plataforma y el escenario."
  },
  {
    "kind": "paragraph",
    "text": "La agrupación de conexiones en gateway debe considerar el destino por host, IP, puerto, protocolo y configuración de seguridad. Los cambios de DNS, la rotación de certificados y el equilibrio pueden interactuar con las conexiones existentes. DNS TTL no finaliza automáticamente el sockets ya conectado; un cambio de dirección afecta las nuevas conexiones, mientras que las conexiones persistentes pueden permanecer en el destino anterior hasta que se cierren."
  },
  {
    "kind": "paragraph",
    "text": "El timeout inactivo debe ser compatible con el intermediario. Si firewall elimina el estado anterior a gateway, una conexión aparentemente disponible en pool puede fallar. Los controles de estado validan parcialmente la disponibilidad y no garantizan que todas las solicitudes comerciales funcionen. Los disyuntores y los reintentos deben usarse con semántica de idempotencia y telemetría."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, la configuración del host remoto le permite controlar las propiedades de las conexiones persistentes, incluido el timeout inactivo. En Azure API Management, el seguimiento, los diagnósticos y las métricas ayudan a separar los errores de procesamiento de políticas de los errores de conectividad y SNAT. En ambos casos, el ingeniero debe identificar si el error ocurrió antes de listener, en el procesamiento entrante, en la conexión saliente o después de que respondiera backend."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: una solicitud puede atravesar varias conexiones independientes.",
    "headers": [
      "salto",
      "estado independiente",
      "Fallas representativas"
    ],
    "rows": [
      [
        "Consumidor -> borde/gateway",
        "TCP externo, TLS y mantener vivo",
        "SYN bloqueado, reinicio del cliente, protocolo de enlace lento"
      ],
      [
        "Gateway -> backend",
        "Pool, DNS, TCP, TLS y timeout interno",
        "Conecte timeout, conexión obsoleta, reinicio, SNAT"
      ],
      [
        "Backend -> dependencias",
        "Sockets específico de la aplicación",
        "Pool banco agotado, cola, flujo descendente lento"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Pregunta de diagnóstico"
  },
  {
    "kind": "paragraph",
    "text": "¿Pudo el cliente establecer TCP con la dirección pública? ¿gateway recibió la solicitud? ¿El gateway ha adquirido una conexión para el backend? ¿backend envió algún byte de respuesta? Estas preguntas dividen el problema en pasos observables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.16 Solución de problemas y herramientas",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La resolución de problemas de transporte comienza con la definición del síntoma y el punto de observación. Conexión rechazada indica un rechazo inmediato, generalmente por parte de RST. Connect timeout indica que no se completó a tiempo. El restablecimiento de la conexión indica la terminación abrupta de una conexión existente o establecida. Leer timeout indica que la aplicación esperó datos después de conectarse. No hay ruta a los puntos de host para el enrutamiento o señalización de la red."
  },
  {
    "kind": "paragraph",
    "text": "Los comandos sockets muestran el estado local. ss -lntp identifica listeners TCP y procesos; ss -ant muestra conexiones y estados; lsof -i relaciona descriptores y red; netstat puede existir en sistemas más antiguos. En Windows, Get-NetTCPConnection y netstat -ano proporcionan información equivalente. La ausencia de listener en la dirección esperada debe resolverse antes de investigar HTTP. curl -v muestra la resolución, el intento de conexión, TLS y HTTP. El tiempo se puede separar con opciones métricas. nc o Test-NetConnection ayudan a probar la apertura del puerto, pero el éxito solo prueba la conexión TCP; no valida protocolo, certificado, autenticación ni reglas de negocio. openssl s_client es útil en el capítulo TLS para inspeccionar el protocolo de enlace y la cadena. tcpdump y Wireshark le permiten observar SYN, SYN+ACK, ACK, FIN, RST, retransmisiones, ventanas y RTT. Las capturas deben realizarse con autorización, filtrado y protección de datos. Las cargas útiles pueden contener información confidencial. Registre siempre el tiempo, las interfaces, la dirección y la topología para correlacionar eventos."
  },
  {
    "kind": "paragraph",
    "text": "Los registros de gateway completan la captura. Un paquete muestra transporte; el seguimiento muestra políticas y decisiones de aplicación. Las métricas revelan un patrón temporal: conexiones activas, tasa de nuevas conexiones, errores backend, saturación y latencia de pool. Una investigación sólida combina evidencia en lugar de depender de un único mensaje de error."
  },
  {
    "kind": "subhead",
    "text": "Comandos de observación: adaptarse a las políticas del sistema y del entorno."
  },
  {
    "kind": "code",
    "text": "# Linux - listeners y conexiones\nss -lntp\nss -ant state time-wait\nss -s\nlsof -nP -iTCP:8443 -sTCP:LISTEN"
  },
  {
    "kind": "code",
    "text": "# Pruebas de cliente\ncurl -v --connect-timeout 5 https://api.exemplo.com/health\nnc -vz api.exemplo.com 443"
  },
  {
    "kind": "code",
    "text": "# Captura autorizada\nsudo tcpdump -i any -nn 'tcp port 443 and host 10.20.30.40'"
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Mapeo inicial entre síntomas e hipótesis.",
    "headers": [
      "Síntoma",
      "evidencia probable",
      "Hipótesis iniciales"
    ],
    "rows": [
      [
        "Conexión rechazada",
        "RST después de SYN",
        "Sin listener, puerto defectuoso, rechazo activo"
      ],
      [
        "Conectar timeout",
        "SYN retransmitido sin respuesta",
        "Firewall descarte, ruta, par no disponible, cola"
      ],
      [
        "Restablecer por igual",
        "primero en conexión",
        "Aplicación cancelada, obsoleta pool, estado de intermediario eliminado"
      ],
      [
        "Leer timeout",
        "Conexión establecida sin respuesta suficiente",
        "Backend lento, dependencia atascada, pérdida o ventana cero"
      ],
      [
        "Dirección ya en uso",
        "el enlace falla",
        "Listener existente, conflicto o estado/reutilización"
      ],
      [
        "Demasiados archivos abiertos",
        "No se pudo crear/aceptar socket",
        "Límite o fuga del descriptor"
      ],
      [
        "Muchos TIME_WAIT",
        "Alta tasa de cierre activo",
        "Sin agrupaciones, reintentos, conexiones cortas"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.17 Estudios de caso",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: la API pública funciona, pero el backend devuelve 504 de forma intermitente"
  },
  {
    "kind": "paragraph",
    "text": "El consumidor establece TCP y TLS con gateway y envía la solicitud. El seguimiento entrante confirma la autenticación y el enrutamiento. Sin embargo, en horas pico, gateway no recibe una respuesta de backend a tiempo y genera 504. La primera conclusión no debería ser que gateway sea lento; el código representa timeout en el salto ascendente."
  },
  {
    "kind": "paragraph",
    "text": "La investigación correlaciona la latencia de backend, las conexiones de pool y las capturas. Se encuentra que las nuevas conexiones se abren excesivamente porque el backend responde con cierres frecuentes. La velocidad de conexión aumenta, los puertos de salida se presionan y algunas conexiones toman tiempo. La solución incluye alinear keep-alive, reutilizar conexiones y medir el límite SNAT en lugar de simplemente aumentar la respuesta timeout."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: errores de restablecimiento de la conexión después del período de inactividad"
  },
  {
    "kind": "paragraph",
    "text": "El pool de gateway mantiene las conexiones durante cinco minutos, pero un firewall intermedio elimina las conexiones inactivas después de sesenta segundos. Cuando llega una nueva solicitud, gateway selecciona un socket que considera válido. El primer envío encuentra un estado inexistente en firewall o en el par y se restablece."
  },
  {
    "kind": "paragraph",
    "text": "La solución es alinear el timeouts inactivo y establecer la validación o el reciclaje antes del límite inferior de la ruta. TCP keepalive puede ayudar en algunos escenarios, pero no sustituye a una configuración coherente. Las capturas de ambos lados muestran que el reset se produce tras el periodo de inactividad, confirmando la relación con el estado obsoleto."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: duplicidad tras el timeout del cliente"
  },
  {
    "kind": "paragraph",
    "text": "El cliente envía una operación de creación y el tiempo de espera se agota en diez segundos. gateway y backend continúan procesándose y la transacción se confirma en el segundo once. El cliente interpreta timeout como un error y repite la llamada, creando un efecto duplicado. TCP garantizó el transporte de cada intento; no conoce la identidad lógica de la operación."
  },
  {
    "kind": "paragraph",
    "text": "La solución implica clave de idempotencia, consulta de estado, correlación y política de reintento basada en semántica. La cadena timeouts también debe diseñarse de manera que los componentes internos no continúen indefinidamente después del abandono del consumidor. Este caso demuestra por qué la confiabilidad del transporte no equivale a la confiabilidad empresarial."
  },
  {
    "kind": "subhead",
    "text": "Principio de funcionamiento"
  },
  {
    "kind": "paragraph",
    "text": "Antes de cambiar un timeout, describa qué paso está expirando, si la operación puede continuar en el servidor y cuál será el comportamiento de reintento. Un número mayor puede ocultar la saturación y magnificar los impactos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.18 Laboratorios de observación",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Los siguientes laboratorios se pueden ejecutar de forma segura en una máquina de desarrollo o en un entorno autorizado. El objetivo es observar el comportamiento, no realizar pruebas de carga. Utilice únicamente direcciones y servicios bajo su control. Las capturas de entornos corporativos requieren autorización y procesamiento de datos adecuado."
  },
  {
    "kind": "paragraph",
    "text": "En la primera práctica de laboratorio, ejecute un pequeño servidor local, conéctese y observe la creación de socket. En el segundo, compare la conexión rechazada y timeout utilizando objetivos controlados. En el tercero, observe los estados ESTABLISHED y TIME_WAIT. El resultado exacto varía según el sistema operativo, firewall y la versión, y esta variación es parte del proceso de aprendizaje."
  },
  {
    "kind": "subhead",
    "text": "Servidor TCP local en Python"
  },
  {
    "kind": "code",
    "text": "# servidor_tcp.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "HOST, PORT = '127.0.0.1', 9090\nwith socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:\n    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n    server.bind((HOST, PORT))\n    server.listen(10)\n    print(f'Escuchando en {HOST}:{PORT}')\n    conn, addr = server.accept()\n    with conn:\n        print('Cliente:', addr)\n        data = conn.recv(4096)\n        conn.sendall(b'RECIBIDO: ' + data)"
  },
  {
    "kind": "subhead",
    "text": "Cliente TCP local en Python"
  },
  {
    "kind": "code",
    "text": "# cliente_tcp.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "with socket.create_connection(('127.0.0.1', 9090), timeout=3) as sock:\n    sock.sendall(b'hola gateway')\n    print(sock.recv(4096).decode())"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Antes de iniciar el servidor, ejecute el cliente y registre el error. Compruebe si el sistema responde con conexión rechazada.",
      "Inicie el servidor, ejecute ss -lntp o netstat -ano e identifique listener en el puerto 9090.",
      "Ejecute el cliente y observe la conexión ESTABLISHED durante una pausa agregada al código.",
      "Capture solo el puerto local e identifique SYN, SYN+ACK, ACK, datos, FIN y ACK.",
      "Cambie el servidor a modo de suspensión antes de responder y configure timeout como corto en el cliente. Tenga en cuenta que se ha establecido la conexión, pero se ha agotado el tiempo de lectura.",
      "Repita varias conexiones secuenciales y observe TIME_WAIT. Luego modifique el cliente para reutilizar una conexión en un protocolo simple y compare."
    ]
  },
  {
    "kind": "subhead",
    "text": "No confunda las pruebas de puertos con las pruebas de API"
  },
  {
    "kind": "paragraph",
    "text": "nc o Test-NetConnection demuestran que el protocolo de enlace TCP fue posible. Una API aún puede fallar en TLS, HTTP, autenticación, políticas o backend. Registre explícitamente el nivel validado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La capa de transporte entrega datos a los procesos a través de puertos y ofrece diferentes servicios a la aplicación.",
      "Socket es una abstracción del sistema operativo; La conexión TCP es un estado distribuido entre puntos finales.",
      "TCP transporta un flujo de bytes confiable y ordenado mediante secuencia, ACK, retransmisión, control de flujo y congestión.",
      "El protocolo de enlace de tres vías sincroniza las opciones de estado y comercio; Los fallos antes y después producen síntomas diferentes.",
      "La ventana de recepción protege al receptor; La ventana de congestión protege la red.",
      "FIN finaliza una dirección normalmente; RST aborta; TIME_WAIT protege contra segmentos retrasados ​​y pérdida del ACK final.",
      "UDP conserva los datagramas pero no proporciona entrega, pedido ni retransmisión; Los protocolos superiores pueden añadir garantías.",
      "Los puertos efímeros y las traducciones SNAT son recursos finitos. La agrupación y la reutilización reducen la presión y la latencia.",
      "Un gateway mantiene conexiones independientes con los clientes y backends. Cada salto tiene sus propios estados, timeouts y causas de falla.",
      "Los diagnósticos eficaces combinan síntomas, estados de socket, captura de paquetes, registros de gateway y métricas."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lista de verificación de diagnóstico para API"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿El nombre resolvió la IP esperada?",
      "¿Hay alguna ruta a la dirección y al puerto?",
      "¿Hay SYN+ACK o RST? ¿Ha finalizado la conexión?",
      "¿Qué lado envió FIN o RST?",
      "¿Se estableció la conexión, pero no hubo respuesta?",
      "¿Hay retransmisiones, ventana cero o RTT alto?",
      "¿Está activo listener en la dirección correcta? ¿Están saturadas las colas?",
      "¿El gateway falló en la parte delantera o trasera?",
      "¿El pool tiene conexiones disponibles y en buen estado?",
      "¿La tasa de nuevas conexiones o TIME_WAIT sugiere una falta de reutilización?",
      "¿Hay signos de agotamiento efímero o del puerto SNAT?",
      "¿Están alineados Timeouts entre el cliente, gateway, firewall y backend?",
      "¿Es seguro operar con Retry y hay idempotencia?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios de fijación",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por qué un servidor puede atender a miles de clientes en el mismo puerto 443.",
      "Diferenciar entre escuchar socket y socket conectado creado por accept().",
      "¿Por qué dos llamadas send() no corresponden necesariamente a dos llamadas recv() en el par?",
      "Describe el protocolo de enlace de tres vías y la función de los números de secuencia iniciales.",
      "Compare la conexión rechazada y conecte timeout en términos de paquetes observables.",
      "Explique la diferencia entre ACK acumulativo, retransmisión timeout y SACK.",
      "Diferenciar entre ventana de recepción y ventana de congestión.",
      "¿Por qué pueden aparecer muchos estados TIME_WAIT en un cliente gateway o HTTP?",
      "Explique la diferencia entre TCP keepalive y conexión persistente HTTP.",
      "¿Qué garantías no ofrece UDP y por qué podría ser aceptable?",
      "¿Qué son los puertos efímeros y cómo participan en las conexiones salientes?",
      "¿Cómo ayuda la agrupación de conexiones a reducir el agotamiento de SNAT?",
      "¿Por qué aumentar timeout puede no resolver la falla de puertos agotados?",
      "Explique por qué una solicitud que llegó a gateway podría fallar antes de llegar a backend.",
      "¿Por qué TCP no garantiza que una transacción de pago se ejecute exactamente una vez?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Preguntas de escenario"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Un consumidor recibe el 502 sólo en la primera llamada después de unos minutos sin tráfico; La segunda llamada funciona. Proponer hipótesis y evidencia para confirmar una conexión obsoleta.",
      "Durante el pico, las nuevas llamadas al mismo backend fallan, pero las conexiones ya establecidas continúan. Relacionar el escenario con los puertos/SNAT y describir medidas a corto y largo plazo.",
      "El tiempo de espera del cliente se agota después de 5 segundos, pero backend registra el éxito después de 7 segundos. Describir los riesgos de reintento y un diseño con idempotencia.",
      "Una prueba NC para el puerto 443 funciona, pero curl falla. Enumere las capas que aún no han sido validadas por las pruebas del puerto.",
      "Una captura muestra SYN repetidos sin respuesta. Otro muestra SYN seguido inmediatamente de RST. Explique la diferencia operativa."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Respuestas orientadoras"
  },
  {
    "kind": "paragraph",
    "text": "Las respuestas deben demostrar un razonamiento en capas, no solo términos aislados. En la pregunta 1, el puerto del servidor es compartido porque las conexiones se distinguen por la tupla de direcciones y puertos. En la pregunta 2, listener recibe nuevas conexiones y accept() crea descriptores independientes para cada cliente. En la pregunta 3, TCP es un flujo de bytes y no conserva los límites de escritura."
  },
  {
    "kind": "paragraph",
    "text": "En preguntas sobre fallas, la conexión rechazada se asocia con un rechazo activo, a menudo RST, mientras que timeout generalmente indica que no hay respuesta antes de la fecha límite. La agrupación reduce las nuevas conexiones, pero debe lidiar con sockets obsoleto. El agotamiento de SNAT se confirma mediante la correlación entre tasa, objetivo, métricas y fallas; no debe asumirse simplemente por un mensaje genérico."
  },
  {
    "kind": "paragraph",
    "text": "En cuestiones comerciales, TCP confirma bytes dentro de una conexión, no el resultado duradero de una transacción. Si se pierde la respuesta, es posible que el cliente no sepa si la operación se completó. Las claves de idempotencia, los registros de estado y las consultas le permiten volver a intentarlo o recuperarlo de forma segura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - Términos esenciales del capítulo.",
    "headers": [
      "Término",
      "Breve definición"
    ],
    "rows": [
      [
        "ACK",
        "Confirmación que informa el siguiente byte esperado en la secuencia TCP."
      ],
      [
        "Trabajo pendiente",
        "Cola asociada a conexiones pendientes o completadas en espera de aceptación."
      ],
      [
        "cwnd",
        "Ventana de congestión mantenida por el remitente."
      ],
      [
        "datagrama",
        "Unidad de mensajes conservada por UDP."
      ],
      [
        "Punto final",
        "Combinación de dirección y puerto en un lado de la comunicación."
      ],
      [
        "ALETA",
        "Indicador de terminación normal para una dirección de flujo TCP."
      ],
      [
        "5-tupla",
        "Protocolo, IP/puerto de origen e IP/puerto de destino."
      ],
      [
        "MSS",
        "Mayor cantidad de datos TCP que el par anuncia recibir en un segmento."
      ],
      [
        "Puerto efímero",
        "Puerto local temporal elegido para la comunicación, normalmente de salida."
      ],
      [
        "primero",
        "Bandera que aborta o rechaza el estado de la conexión TCP."
      ],
      [
        "RTO",
        "Temporizador utilizado para decidir la retransmisión por falta de confirmación."
      ],
      [
        "RTT",
        "Se anota el tiempo de ida y vuelta entre el envío y la confirmación."
      ],
      [
        "rwnd",
        "Ventana anunciada por el receptor para control de flujo."
      ],
      [
        "saco",
        "Mecanismo que reporta bloques recibidos fuera de servicio."
      ],
      [
        "SNAT",
        "Traducción de la dirección y, en general, del puerto de origen."
      ],
      [
        "Socket",
        "Abstracción del sistema operativo utilizado por los procesos para la comunicación."
      ],
      [
        "TIME_WAIT",
        "Estado temporal después del apagado activo para seguridad del apagado y segmentos retrasados."
      ],
      [
        "UDP",
        "Transporte mediante datagramas con mecanismo mínimo y sin garantías de entrega/pedido."
      ],
      [
        "Ventana Cero",
        "Anuncio de que el receptor no tiene espacio disponible buffer."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas.",
    "id": "referencias"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9293 - Protocolo de control de transmisión (TCP): https://www.rfc-editor.org/rfc/rfc9293 RFC 768 - Protocolo de datagrama de usuario: https://www.rfc-editor.org/rfc/rfc768 RFC 5681 - Control de congestión de TCP: https://www.rfc-editor.org/rfc/rfc5681 RFC 6298 - Temporizador de retransmisión de TCP informático: https://www.rfc-editor.org/rfc/rfc6298 RFC 7323 - Extensiones de TCP para alto rendimiento: https://www.rfc-editor.org/rfc/rfc7323 RFC 8304 - Funciones de transporte de UDP y UDP-Lite: https://www.rfc-editor.org/rfc/rfc8304 RFC 6335 - Procedimientos de IANA para nombres de servicios y números de puerto: https://www.rfc-editor.org/rfc/rfc6335 IANA - Registro de número de puerto de protocolo de transporte y nombre de servicio: https://www.iana.org/assignments/service-names-port-numbers/ The Open Group - socket(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/socket.html The Open Group - bind(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/bind.html The Open Group - listen(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/listen.html The Open Group - accept(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/accept.html The Open Group - connect(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/connect.html Microsoft - Solución de problemas del cliente respuesta timeouts y errores con Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/troubleshoot-response-timeout-and-errors Microsoft - Traducción de dirección de red de origen para conexiones salientes: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-outbound-connections Microsoft - Depuración de API en Azure API Management mediante seguimiento de solicitudes: https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-api-inspector Axway - Configurar ajustes de host remoto: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_remote_hosts/index.html Axway - Introducción a API Administración de Gateway: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/admin_intro/index.html"
  },
  {
    "kind": "subhead",
    "text": "Orden de lectura recomendado"
  },
  {
    "kind": "paragraph",
    "text": "Comience con RFC 9293, utilizando este capítulo como mapa. Luego lea RFC 5681 y RFC 6298 para conocer el rendimiento y la recuperación. Consultar RFC 6335 y el registro de IANA al estudiar puertos. Utilice la documentación de Axway y Azure para relacionar los fundamentos con las configuraciones de la plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cierre",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "TCP, UDP, puertos y sockets forman el puente entre los procesos de la aplicación y la red IP. Explican cómo miles de consumidores comparten un listener, cómo se confirman y recuperan los bytes, por qué las conexiones permanecen en estados después del cierre y cómo los recursos de salida finitos pueden provocar explosiones."
  },
  {
    "kind": "paragraph",
    "text": "En el siguiente capítulo, el estudio avanza hacia el direccionamiento IP, subredes, IPv4, IPv6 y enrutamiento. Estos conceptos le permitirán comprender cómo los paquetes eligen rutas, por qué las redes privadas necesitan traducción y cómo gateways llega a backends distribuido en centros de datos, nubes y clústeres."
  }
];
