import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Complete Spanish translation of the Portuguese source article.
export const FUNDAMENTOS_CHAPTER_BLOCKS_ES: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del Capítulo",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "Las API corporativas aparecen, a primera vista, como una tecnología concentrada en la capa de aplicación: un consumidor envía una solicitud, un servicio ejecuta una operación y devuelve una respuesta. Sin embargo, esta visión oculta una extensa cadena de mecanismos. Antes de que un método HTTP llegue al backend, el nombre de host debe ser resuelto, los paquetes deben ser enrutados, se debe establecer una conexión, se deben negociar parámetros criptográficos, y las políticas de seguridad se pueden evaluar en diferentes componentes de la infraestructura."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta esta cadena progresivamente. El objetivo no es transformar inmediatamente al lector en un experto en redes sino proporcionar un modelo mental suficientemente preciso para entender dónde puede fallar una llamada, qué componente tiene cada responsabilidad, y por qué las tecnologías como TLS, OAuth, JWT, mTLS y API Gateways dependen de bases anteriores. En capítulos subsiguientes, cada una de estas áreas será explorada en profundidad."
  },
  {
    "kind": "paragraph",
    "text": "El enfoque combina el contexto histórico, la teoría del protocolo y la aplicación práctica en entornos corporativos. Siempre que sea posible, el texto relaciona conceptos con plataformas como Axway API Gateway y Azure API Management. Ejemplos utilizan una API de clientes bancarios ficticios para demostrar la ruta completa de comunicación sin exponer detalles de entornos del mundo real."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Lea las secciones secuencialmente en su primer paso. Luego, lea de nuevo siguiendo el diagrama final a extremo y trate de clasificar cada posible fracaso por capa donde ocurre. Esta práctica prepara el razonamiento de solución de problemas utilizado por equipos de gateway y equipos de integración."
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
      "Destinguir entre Internet, Web, HTTP, API y API REST, evitando el uso de estos términos como sinónimos.",
      "Explique cómo se definen los estándares técnicos por organizaciones como el IETF, RFC Editor, NIST,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "IEEE, W3C, OpenID Foundation y OpenAPI Initiative."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Comprender la encapsulación, dirección, enrutamiento, puertos, conexiones, resolución del nombre,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "y protección criptográfica a nivel conceptual."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Describir el camino completo de una solicitud HTTPS del consumidor a un backend"
    ]
  },
  {
    "kind": "paragraph",
    "text": "protegido por una API Gateway."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Identificar las responsabilidades típicas de cortafuegos, balanceadores de carga, proxies, portales, identidad"
    ]
  },
  {
    "kind": "paragraph",
    "text": "proveedores y servicios de backend."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Utilice el modelo capado para organizar investigaciones de errores DNS, TCP, TLS y HTTP,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "autenticación, enrutamiento y errores de aplicación."
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
      "1.1 Por qué los fundamentos de red son importantes para las APIs",
      "1.2 Internet, Web y API: conceptos diferentes",
      "1.3 Evolución histórica: de la conmutación de paquetes a las plataformas de APIs",
      "1.4 Ecosistema de estandarización",
      "1.5 RFCs: cómo se documentan los protocolos",
      "1.6 Comunicación en red y encapsulamiento",
      "1.7 Modelos OSI y TCP/IP",
      "1.8 Direccionamiento IP y enrutamiento",
      "1.9 DNS y resolución de nombres",
      "1.10 TCP, UDP, puertos y sockets",
      "1.11 NAT, firewall, proxy y balanceo de carga",
      "1.12 TLS, HTTPS y confianza",
      "1.13 Anatomía de un mensaje HTTP",
      "1.14 REST y el concepto de recurso",
      "1.15 API Gateway y plataforma de APIs",
      "1.16 Recorrido de extremo a extremo",
      "1.17 Troubleshooting orientado por capas",
      "1.18 Aplicación en entornos corporativos y bancarios",
      "Resumen, ejercicios, glosario y referencias"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.1 Por qué los fundamentos de red son importantes para las APIs",
    "id": "por-que-importa"
  },
  {
    "kind": "paragraph",
    "text": "Un equipo de API Gateways trabaja en la intersección entre desarrollo, infraestructura, identidad y seguridad. La puerta de entrada recibe mensajes de aplicación pero la disponibilidad de este punto de entrada depende de elementos que existen antes de la aplicación: DNS, rutas, direcciones, puertos, conexiones y certificados. Es por eso que un error observado como \"la API no está respondiendo\" puede tener causas completamente diferentes, de un nombre que no resuelve a una política que rechaza una señal."
  },
  {
    "kind": "paragraph",
    "text": "La misma respuesta HTTP puede ocultar orígenes distintos. Un código de 502 podría indicar que la puerta de entrada no estableció comunicación con el backend; un 401 normalmente se relaciona con la autenticación pero puede ser producido por la puerta de entrada, proveedor de identidad o servicio; un tiempo de salida puede ocurrir en el consumidor, balanceador de carga, puerta de entrada o backend. Sin una visión capa, el diagnóstico tiende a convertirse en prueba y error."
  },
  {
    "kind": "paragraph",
    "text": "El conocimiento fundamental también mejora las decisiones arquitectónicas. Al entender donde se garantiza la confidencialidad, el arquitecto puede diferenciar la seguridad del transporte de la integridad del mensaje. Al entender las conexiones y sesiones, pueden evaluar los efectos de la terminación de mantenimiento, estanqueidad y TLS. Al entender la resolución DNS, pueden diseñar fallos, múltiples entornos y estrategias de descubrimiento de servicios con menos supuestos incorrectos."
  },
  {
    "kind": "paragraph",
    "text": "En este material, el término 'fundamentales' no significa contenido superficial. Significa estudiar los mecanismos que apoyan tecnologías más visibles como OAuth 2.0, JWT, OpenID Connect, mTLS y políticas de gateway. Estos conceptos serán más fáciles de entender cuando está claro lo que sucede antes, durante y después de una transmisión de solicitud."
  },
  {
    "kind": "subhead",
    "text": "En el trabajo"
  },
  {
    "kind": "paragraph",
    "text": "Cuando un consumidor reporta un timeout, la pregunta inicial no debe ser simplemente '¿Qué política de gateway falló?'. En primer lugar, determinar si se produjo la resolución DNS, el establecimiento TCP, la negociación TLS y la solicitud que llegó al oyente de la puerta de entrada. Sólo entonces proceder a HTTP, autenticación y enrutamiento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.2 Internet, Web y API: conceptos diferentes",
    "id": "conceitos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Internet"
  },
  {
    "kind": "paragraph",
    "text": "Internet es una infraestructura global formada por interconectar redes independientes. Cada organización puede operar sus propios enlaces, routers, sistemas autónomos y políticas, pero la comunicación es posible porque los participantes adoptan protocolos comunes. El término 'internet' en el sentido genérico significa una red de redes; 'Internet', con una inicial mayúscula, generalmente se refiere al sistema público global que utiliza la familia IP de protocolos."
  },
  {
    "kind": "paragraph",
    "text": "El funcionamiento de Internet está descentralizado. No hay un solo servidor central que dirija todos los mensajes. Operadores de telecomunicaciones, proveedores de cloud, empresas, universidades y gobiernos gestionan partes de la infraestructura. Rotar entre estas partes permite a los paquetes atravesar múltiples redes hasta llegar a su destino. Esta característica explica por qué latencia, pérdida de paquetes y caminos asimétricos pueden variar incluso cuando el cliente y el servidor no cambian."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "World Wide Web"
  },
  {
    "kind": "paragraph",
    "text": "La Web es un sistema de recursos interconectados que utiliza Internet como su infraestructura. Fue concebido en torno a identificadores de recursos, representaciones transferidas entre clientes y servidores, y enlaces que conectan documentos. Los navegadores populares y servidores web popularizaron HTTP, pero Internet existía antes de la Web y continúa transportando muchos protocolos que no pertenecen a la Web."
  },
  {
    "kind": "paragraph",
    "text": "Decir que una API se accede a través de la Web generalmente significa que utiliza tecnologías asociadas con la Web, especialmente URI, HTTP, y formatos como JSON. Esto no transforma cada API en una página web. La interfaz puede ser consumida por aplicaciones móviles, sistemas de lotes, dispositivos, microservicios o partners sin ninguna interacción del navegador."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "API y API RESTful"
  },
  {
    "kind": "paragraph",
    "text": "Una API es una interfaz creada para permitir que un software utilice las capacidades ofrecidas por otro software. La interfaz define operaciones, datos esperados, respuestas, errores y reglas de uso. Existen API en diferentes niveles: bibliotecas locales, sistemas operativos, bases de datos, interfaces de mensajería e interfaces remotas. Por lo tanto, una API no es sinónimo de HTTP ni REST."
  },
  {
    "kind": "paragraph",
    "text": "Una API RESTful es una interfaz remota diseñada según los principios del estilo arquitectónico REST y típicamente expuesta sobre HTTP. En la práctica del mercado, muchas interfaces se llaman REST sólo porque usan métodos JSON y HTTP. Una evaluación más rigurosa también observa la identificación de recursos, semántica de métodos, ausencia de estado de sesión en el servidor, la caché y la arquitectura capa."
  },
  {
    "kind": "subhead",
    "text": "Distinción esencial"
  },
  {
    "kind": "paragraph",
    "text": "Internet es la infraestructura de redes. La Web es un sistema construido sobre esta infraestructura. HTTP es un protocolo de aplicación. Una API es un contrato entre sistemas de software. REST es un estilo arquitectónico. Estos conceptos se relacionan pero no son equivalentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.3 Evolución histórica: de la conmutación de paquetes a las plataformas de APIs",
    "id": "evolucao"
  },
  {
    "kind": "paragraph",
    "text": "Las primeras redes informáticas se construyeron a menudo para entornos específicos y tenían poca interoperabilidad. La investigación en el cambio de paquetes introdujo la idea de dividir datos en unidades más pequeñas que podrían atravesar la red a través de caminos compartidos. En lugar de reservar un circuito físico dedicado a lo largo de la comunicación, la red podría utilizar su capacidad estadísticamente y reconstruir los datos en el destino."
  },
  {
    "kind": "paragraph",
    "text": "El ARPANET, operativo desde 1969, fue uno de los proyectos que demostraban la viabilidad de este enfoque en redes de larga distancia. No era la Internet moderna, pero proporcionó experiencia técnica y organizativa para la evolución posterior. El siguiente reto no era sólo conectar ordenadores dentro de una sola red sino permitir que diferentes redes se comunicaran sin requerir una tecnología física única."
  },
  {
    "kind": "paragraph",
    "text": "La suite TCP/IP surgió para resolver este problema de interconexión. La capa IP proporciona un mecanismo para abordar y entregar datagramas entre redes, mientras que los protocolos de transporte como TCP proporcionan propiedades adicionales a las aplicaciones. La adopción de TCP/IP por ARPANET en 1983 se considera tradicionalmente un hito en la consolidación de la Internet moderna."
  },
  {
    "kind": "paragraph",
    "text": "A finales del decenio de 1980 y principios del decenio de 1990, la Web añadió una capa para la publicación y navegación de los recursos. URI, HTTP y HTML formaron un sistema simple, extensible y distribuido."
  },
  {
    "kind": "paragraph",
    "text": "Con el crecimiento de aplicaciones dinámicas, HTTP comenzó a transportar no sólo documentos para personas sino datos entre sistemas."
  },
  {
    "kind": "paragraph",
    "text": "A principios de los años 2000, las arquitecturas orientadas al servicio y las API web adquirieron importancia en la integración empresarial. REST se hizo popular para alinearse con la infraestructura ya extendida de la Web. Posteriormente, la informática en la nube, los microservicios, las aplicaciones móviles y los ecosistemas asociados aumentaron el número de API y consumidores, creando una necesidad de gobernanza, protección y observabilidad a escala."
  },
  {
    "kind": "paragraph",
    "text": "En este contexto surgieron plataformas modernas de gestión de API. Un API Gateway comenzó a funcionar como un punto controlado de exposición y mediación, mientras que los componentes de plano de gestión manejaban la configuración, catalogación, publicación, análisis y ciclo de vida. Productos como Axway API Gateway y Azure API Management representan implementaciones corporativas de esta evolución."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/timeline-api-platforms-es.svg",
    "alt": "Timeline de ARPANET a API Platforms",
    "caption": "Figure 1 - Simplified timeline of network infrastructure leading up to API platforms."
  },
  {
    "kind": "subhead",
    "text": "Lectura crítica"
  },
  {
    "kind": "paragraph",
    "text": "La evolución no ocurrió como un reemplazo completo. Conviven tecnologías antiguas y nuevas. HTTP/1.1 permanece presente junto con HTTP/2 y HTTP/3; TLS 1.2 todavía puede coexistir con TLS 1.3; los sistemas heredados pueden ser expuestos por los portales modernos. La arquitectura corporativa requiere entender estas combinaciones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.4 Ecosistema de estandarización y referencias técnicas",
    "id": "padroes"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "IETF y RFC Editor"
  },
  {
    "kind": "paragraph",
    "text": "El Equipo de Tareas de Ingeniería de Internet (IETF) es una comunidad abierta responsable de desarrollar muchos estándares utilizados en Internet. El trabajo se organiza en grupos que analizan problemas técnicos, analizan propuestas y producen documentos. Este ecosistema define o actualiza protocolos como HTTP, TLS, DNS, TCP, OAuth 2.0 y diversos mecanismos de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "El Editor RFC publica y mantiene la serie de RFCs. Un RFC recibe un número permanente y no se edita después de su publicación. Cuando una especificación necesita ser corregida o reemplazada, se publica un nuevo RFC y registra su relación con documentos anteriores, por ejemplo \"actualizaciones\" o \"obsoletos\". Esta característica es importante: al investigar un protocolo, los profesionales deben verificar si el RFC encontrado sigue siendo actual."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NIST, W3C, IEEE y otras organizaciones"
  },
  {
    "kind": "paragraph",
    "text": "El Instituto Nacional de Normas y Tecnología (NIST) publica normas ampliamente utilizadas en materia de seguridad, criptografía, identidad y gestión de riesgos. Aunque una institución de los Estados Unidos, sus publicaciones influyen en las organizaciones de varios países. Para las API, los documentos de NIST ayudan a organizar controles de protección durante el desarrollo, el despliegue y la operación."
  },
  {
    "kind": "paragraph",
    "text": "El World Wide Web Consortium (W3C) produce estándares relacionados con la plataforma web, incluyendo tecnologías utilizadas por los navegadores. El Instituto de Ingenieros Eléctricos y Electrónicos (IEEE) mantiene importantes estándares en las capas físicas y de enlace, como las familias Ethernet y Wi-Fi. Estos estándares están por debajo de HTTP pero afectan directamente la conectividad, la capacidad y el comportamiento de la red."
  },
  {
    "kind": "paragraph",
    "text": "La Fundación OpenID mantiene especificaciones relacionadas con la identidad, incluyendo OpenID Connect y perfiles utilizados en ecosistemas financieros. La Iniciativa OpenAPI mantiene la especificación OpenAPI, que se utiliza para describir los contratos HTTP de manera legible tanto por personas como por herramientas. OEAIS mantiene estándares como SAML. Cada organización actúa dentro de su dominio, y los proyectos corporativos combinan con frecuencia especificaciones de múltiples fuentes."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Cómo evaluar la autoridad de un documento"
  },
  {
    "kind": "paragraph",
    "text": "La documentación del fabricante explica cómo un producto implementa un estándar pero no reemplaza la especificación normativa. Para entender el comportamiento de Azure APIM, consulte a Microsoft; para Axway API Gateway, consulte Axway. Sin embargo, para entender la semántica HTTP, consulte la RFC aplicable. Esta distinción evita la conflación de decisiones de productos con requisitos de protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Una estrategia de estudio eficiente comprende tres niveles. Primero, una introducción didáctica establece vocabulario. En segundo lugar, la especificación oficial aclara los requisitos normativos y los casos de borde. Finalmente, la documentación del producto demuestra cómo configurar o observar ese comportamiento de una manera específica de implementación. Esta secuencia reduce el riesgo de aprender sólo procedimientos sin entender los fundamentos."
  },
  {
    "kind": "subhead",
    "text": "Regla del pulgar"
  },
  {
    "kind": "paragraph",
    "text": "Para responder '¿qué permite el protocolo?', mire la especificación. Para responder '¿cómo implementa el producto o configura esto?', mire la documentación del fabricante. Para responder '¿qué control se recomienda?', consulte guías de seguridad y riesgo como NIST y OWASP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.5 RFCs: cómo se documentan y evolucionan los protocolos",
    "id": "rfcs"
  },
  {
    "kind": "paragraph",
    "text": "RFC significa Solicitud de Comentarios, un nombre histórico que ha permanecido incluso cuando partes de la serie comenzaron a registrar estándares consolidados. No todas las RFC son normas de Internet. Existen documentos en diferentes ámbitos y categorías, incluyendo Standards Track, Best Current Practice, Informational y Experimental. Por lo tanto, citar sólo un número sin verificar su estado puede llevar a conclusiones incorrectas."
  },
  {
    "kind": "paragraph",
    "text": "Antes de la publicación, las propuestas del IETF suelen circular como Internet-Drafts. Un borrador es un documento temporal: puede cambiar, expirar o nunca convertirse en un RFC. Durante el análisis, los participantes discuten la interoperabilidad, seguridad, claridad y experiencia de implementación. El objetivo no es simplemente producir una descripción pulida sino permitir que las implementaciones independientes se comuniquen correctamente."
  },
  {
    "kind": "paragraph",
    "text": "Las RFC utilizan palabras normativas tales como DEBE, DEBE NO, DEBE y MAYO según convenciones específicas. En una lectura técnica, estas palabras indican diferentes niveles de obligación. DEBE describir un requisito esencial para la conformidad; SHOULD permite excepciones justificadas; MAY indica la opcionalidad permitida. Las traducciones oficiosas pueden suavizar estas diferencias y alterar la interpretación."
  },
  {
    "kind": "paragraph",
    "text": "La evolución de HTTP destaca la importancia de rastrear las relaciones de documentos. Los RFC más antiguos pueden permanecer fuertemente citados a pesar de ser reemplazados. Semántica HTTP moderna se consolidan en RFC 9110, mientras que las versiones de transporte tienen sus propios documentos. TCP también recibió una especificación de consolidación más reciente en RFC 9293, que supera el histórico RFC 793."
  },
  {
    "kind": "paragraph",
    "text": "Al estudiar una RFC, comience con el resumen, estado, relación con otros documentos, y abstracto. A continuación, identifique terminología, modelo operativo, requisitos normativos y sección de seguridad. No necesitas memorizar todo el documento. El objetivo inicial es aprender cómo localizar la fuente formal de una consulta e interpretar el extracto pertinente en el contexto correcto."
  },
  {
    "kind": "subhead",
    "text": "Vocabulario regulatorio simplificado"
  },
  {
    "kind": "code",
    "text": "MUST requirement mandatory\nMUST NOT prohibited behavior\nSHOULD recommended, unless justified by technical reasons\nMAY optional per specification"
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de investigación"
  },
  {
    "kind": "paragraph",
    "text": "Al encontrar una configuración que acepte TLS 1.0, no concluya basándose únicamente en la pantalla del producto mostrándola como se recomienda. Verificar las normas, las directrices actuales de seguridad y la política de organización. La capacidad técnica para configurar no equipara a una decisión segura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.6 Comunicación de red, paquetes y encapsulación",
    "id": "camadas"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones funcionan con mensajes significativos para el negocio: una solicitud para consultar a un cliente, una respuesta JSON o una ficha de acceso. Sin embargo, la infraestructura de red debe transportar estos datos a través de medios con límites de tamaño, especificaciones de dirección y reglas propias. Cada capa agrega información de control al contenido recibido de la capa superior. Este proceso se llama encapsulación."
  },
  {
    "kind": "paragraph",
    "text": "En una llamada HTTP sobre TLS y TCP, la aplicación produce bytes de un mensaje HTTP. TLS organiza estos bytes en registros protegidos. TCP trata el flujo como una secuencia confiable y crea segmentos. IP anexa las direcciones de origen y destino a los datagramas. La tecnología de enlace crea marcos apropiados para el medio local, como Ethernet o Wi-Fi. En el destino, cada capa elimina e interpreta su cabecera antes de pasar el contenido a la capa superior."
  },
  {
    "kind": "paragraph",
    "text": "Esta separación permite una evolución independiente. La misma aplicación HTTP puede funcionar en diferentes redes físicas, y el mismo enlace puede transportar diferentes protocolos de capa superior. Esto explica por qué las herramientas de diagnóstico muestran puntos de vista distintos: una captura de paquetes puede mostrar direcciones y puertos, mientras que los registros de las pasarelas revelan métodos HTTP, caminos y encabezados."
  },
  {
    "kind": "paragraph",
    "text": "El tamaño de los datos importa. Las interfaces tienen una Unidad Máxima de Transmisión (MTU), y los mensajes más grandes deben dividirse o ajustarse para ajustarse a los límites del camino. Los problemas y la fragmentación de MTU pueden producir síntomas difíciles de detectar, como conexiones que funcionan para mensajes pequeños pero que no tienen grandes certificados, encabezados extensos o subidas."
  },
  {
    "kind": "paragraph",
    "text": "La encapsulación no significa que todas las capas sean igualmente visibles en cada componente. Un router principalmente rutas basadas en información IP. Un balanceador de carga de capa 4 puede utilizar información IP y portuaria. Una capa 7 proxy interpreta HTTP. Una puerta de entrada puede inspeccionar el método, URI, token y cuerpo. Cuanto mayor sea la capa operacional, mayor será la comprensión semántica del mensaje, y normalmente mayor será el costo de procesamiento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/encapsulamento-api-es.svg",
    "alt": "Cinco capas Encapsulando una solicitud HTTP",
    "caption": "Figura 2 - Vista simplificada de la Encapsulación de llamadas HTTP Protegida por TLS."
  },
  {
    "kind": "subhead",
    "text": "Relación con la observabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Registros de aplicaciones, registros de gateway, trazas distribuidas y capturas de paquetes observan a diferentes niveles. Una investigación completa puede requerir timetamps correlativos, dirección, puerto, SNI, método HTTP, identificación de correlación y identificación de trazas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.7 Modelos OSI y TCP/IP",
    "id": "modelos"
  },
  {
    "kind": "paragraph",
    "text": "Los modelos de capa son herramientas conceptuales. Ayudan a las responsabilidades separadas y organizan el razonamiento, pero no representan perfectamente todos los detalles de una aplicación. El modelo OSI describe siete capas: física, enlace, red, transporte, sesión, presentación y aplicación. El modelo TCP/IP se presenta a menudo con cuatro o cinco capas, agrupando funciones de una manera más cercana a la arquitectura de Internet."
  },
  {
    "kind": "paragraph",
    "text": "En la práctica de API, las capas más citadas son red, transporte y aplicación. IP pertenece a la capa de red; TCP y UDP pertenecen a la capa de transporte; HTTP, DNS y protocolos de identidad aparecen en la capa de aplicación. TLS se posiciona frecuentemente entre aplicación y transporte, aunque su clasificación varía dependiendo del modelo utilizado. Lo importante es entender su función en lugar de simplemente disputar el número de capa que ocupa."
  },
  {
    "kind": "paragraph",
    "text": "El modelo OSI es útil para la solución de problemas porque fomenta un orden de operaciones. Primero, ¿tenemos conectividad física o virtual? Siguiente, ¿se puede llegar a la dirección? ¿El puerto de transporte acepta conexiones? ¿Está completa la negociación TLS? ¿Es válido el mensaje HTTP? ¿Se acepta la autenticación? ¿Funciona la regla del negocio? Este camino reduce las investigaciones que comienzan desde políticas complejas cuando el problema es una ruta perdida."
  },
  {
    "kind": "paragraph",
    "text": "Los términos como 'capa 4 balancer' y 'capa 7 proxy' derivan de este vocabulario. Un dispositivo de capa 4 toma principalmente decisiones basadas en la dirección de transporte e información portuaria. Un componente de capa 7 interpreta el protocolo de aplicación y puede recorrerlo por host, ruta o encabezado. Una pasarela API es típicamente un componente de capa 7, aunque depende de recursos de capas inferiores."
  },
  {
    "kind": "table",
    "caption": "Cuadro 1 - Mapping aproximado entre la OSI y la TCP/IP.",
    "headers": [
      "OSI",
      "TCP/IP aprox.",
      "Ejemplos en el contexto de las API"
    ],
    "rows": [
      [
        "Layer 7 Application",
        "Application Layer",
        "HTTP, DNS, OAuth, OpenID Connect"
      ],
      [
        "Presentación de la Capa 6",
        "Application Layer",
        "JSON, codificación, serialización, TLS en algunos modelos"
      ],
      [
        "Layer 5 Session",
        "Application Layer",
        "Sesiones lógicas, negociación y contexto"
      ],
      [
        "4 Transporte",
        "Transporte",
        "TCP, UDP, QUIC"
      ],
      [
        "3 Network",
        "Internet",
        "IPv4, IPv6, routing"
      ],
      [
        "2 Enlace",
        "Acceso a la red",
        "Ethernet, Wi-Fi, VLAN"
      ],
      [
        "1 Física",
        "Acceso a la red",
        "Cable, fibra, radio"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.8 Direccionamiento IP y enrutamiento",
    "id": "enderecamento"
  },
  {
    "kind": "paragraph",
    "text": "El protocolo IP proporciona tratamiento lógico y entrega de datagramas entre redes. Una dirección identifica una interfaz de red en un contexto dado de la red, no necesariamente una persona, aplicación o máquina permanentemente. Los dispositivos pueden tener múltiples direcciones, direcciones pueden cambiar y los mecanismos intermedios pueden traducir fuentes y destinos."
  },
  {
    "kind": "paragraph",
    "text": "IPv4 utiliza direcciones de 32 bits y normalmente está representado por cuatro números decimales. IPv6 utiliza 128 bits y representación hexadecimal, ofreciendo un espacio mucho mayor y otras mejoras arquitectónicas. En redes corporativas, IPv4 privado sigue siendo común, mientras que IPv6 puede aparecer cada vez más en entornos externos, nube y redes modernas. Una API puede publicar registros DNS para ambas familias."
  },
  {
    "kind": "paragraph",
    "text": "Una máscara o prefijo identifica qué parte de la dirección corresponde a la red. Cuando el destino está fuera de la red local, el host envía el datagram a la entrada predeterminada. Los routers consultan sus mesas y reenvian el paquete hop-by-hop. Cada router decide el siguiente camino; no necesita saber la lógica de API, sólo suficiente información para llegar a la red de destino."
  },
  {
    "kind": "paragraph",
    "text": "El enrutamiento difiere del enrutamiento de API. El primero ocurre en la infraestructura IP y elige caminos entre redes. Este último sucede en proxies y gateways y puede elegir un backend basado en host, ruta, versión, encabezado o política. Una falla de enrutamiento IP evita la conexión antes de que la puerta analiza HTTP; una falla de enrutamiento de API ocurre después de que el mensaje ya haya llegado a la puerta de entrada."
  },
  {
    "kind": "paragraph",
    "text": "En centros de nube y datos, las rutas pueden ser influenciadas por redes virtuales, subredes, túneles, electrodomésticos de seguridad y reglas de salida. Estar en la misma empresa no garantiza la conectividad directa. Los arquitectos deben tratar la ruta de la red, resolución DNS, reglas de cortafuegos y dependencias de salida como partes explícitas del diseño."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de abordar"
  },
  {
    "kind": "code",
    "text": "Example private IPv4: 10.20.30.40/24\nApproximate network: 10.20.30.0/24\nDefault gateway: 10.20.30.1\nExternal destination: forwarded to the gateway"
  },
  {
    "kind": "subhead",
    "text": "Diagnosis"
  },
  {
    "kind": "paragraph",
    "text": "Si el nombre se resuelve pero la conexión pasa sin respuesta, investigue la ruta IP, cortafuegos, enrutamiento y oyente. Si la conexión se rechaza inmediatamente, el objetivo puede ser accesible pero sin servicio de escucha en ese puerto o debido al rechazo activo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.9 DNS y resolución de nombres",
    "id": "dns"
  },
  {
    "kind": "paragraph",
    "text": "El sistema de nombres de dominio (DNS) permite utilizar nombres jerárquicos en lugar de confiar en direcciones IP fijas. En una URL como https://api.exemplo.com,, el host api.exemplo.com necesita ser resuelto a una dirección que el cliente pueda alcanzar. Esta resolución puede incluir caché local, resolución corporativa, servidores recursivos y servidores autorizados."
  },
  {
    "kind": "paragraph",
    "text": "DNS es distribuido y jerárquico. La zona responsable de un dominio publica registros que describen cómo deben resolverse los nombres. A records associate names with IPv4 addresses; AAAA records associate them with IPv6 addresses; CNAME creates an alias for another name; TXT records transport textual information used by various mechanisms; SRV can indicate services and ports. En las arquitecturas de API, los CNAME son comunes para decodificar la dirección pública de la infraestructura física o de proveedores."
  },
  {
    "kind": "paragraph",
    "text": "El tiempo para vivir (TTL) dicta cuánto tiempo puede permanecer una respuesta en caché. Un TTL alto reduce las consultas y puede mejorar la eficiencia, pero hace que los cambios sean más lentos para los consumidores que todavía tienen datos obsoletos. Un bajo TTL acelera las transiciones pero aumenta las consultas y no elimina todos los caches intermedios. Las estrategias de migración y recuperación de desastres deben considerar este comportamiento."
  },
  {
    "kind": "paragraph",
    "text": "Split -horizon DNS ocurre cuando el mismo nombre devuelve diferentes respuestas basadas en el origen de la consulta. Un consumidor interno puede recibir una dirección privada, mientras que un consumidor externo recibe un punto final público. Esta técnica es útil pero puede causar confusión si las pruebas realizadas en diferentes redes producen resultados distintos."
  },
  {
    "kind": "paragraph",
    "text": "DNS también se relaciona con TLS. El cliente normalmente valida si el certificado presentado por el servidor es válido para el nombre solicitado. Por lo tanto, señalar un nombre a otro punto final por sí solo es insuficiente; el punto final debe presentar un certificado compatible y responder apropiadamente al anfitrión esperado o SNI (Indicación de Nombre del Usuario). Las fallas de certificados y nombres suelen ocurrir juntas durante las migraciones."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de resolución y verificación de conexiones"
  },
  {
    "kind": "code",
    "text": "$ nslookup api.exemplo.com\nName: api.exemplo.com\nAddress: 203.0.113.20\n$ curl -v https://api.exemplo.com/clientes\n* Host api.exemplo.com:443 was resolved\n* Connected to api.exemplo.com (...) port 443"
  },
  {
    "kind": "subhead",
    "text": "Punto de precaución"
  },
  {
    "kind": "paragraph",
    "text": "Un ping exitoso no confirma que una API está disponible. ICMP puede ser bloqueado, y la API depende de DNS, enrutamiento, puerto, TLS y HTTP. Del mismo modo, un ping bloqueado no prueba que el servicio HTTPS no esté disponible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.10 TCP, UDP, puertos y sockets",
    "id": "transporte"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TCP"
  },
  {
    "kind": "paragraph",
    "text": "TCP proporciona un flujo de byte confiable y ordenado entre dos puntos finales. Antes del intercambio de datos, se establece una conexión a través de un apretón de manos de tres vías: SYN, SYN-ACK y ACK. La conexión mantiene números de secuencia, confirma las recepciones y retransmite datos según sea necesario. Estas propiedades simplifican el trabajo de protocolos como HTTP/1.1 y HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "La fiabilidad viene con costo. TCP debe gestionar el estado, tamaños de ventana, retransmisiones y control de congestión. Las pérdidas de paquetes pueden aumentar la latencia incluso cuando la aplicación recibe todos los bytes al final. Las conexiones y piscinas persistentes evitan repetir apretones de manos para cada solicitud, pero requieren una cuidadosa configuración de timeouts y límites en clientes, gateways y backends."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "UDP and QUIC"
  },
  {
    "kind": "paragraph",
    "text": "UDP ofrece datagramas sin el establecimiento de conexiones y sin garantías de entrega o orden dentro del propio protocolo. Esto no significa que las aplicaciones en UDP sean necesariamente poco fiables; pueden implementar los mecanismos necesarios. DNS utiliza tradicionalmente UDP en muchas consultas, con alternativas y extensiones para otros escenarios."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utiliza QUIC, que opera sobre UDP e incorpora recursos de transporte y seguridad. La elección permite reducir algunos costos de configuración y evitar ciertos efectos de bloqueo entre los flujos. Sin embargo, el punto clave para un profesional de gateway en este capítulo es reconocer que HTTP moderno no depende exclusivamente de TCP en todas las versiones."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Puertos y sockets"
  },
  {
    "kind": "paragraph",
    "text": "Un puerto identifica un punto de comunicación lógico en el host. HTTPS utiliza normalmente 443 y 80 por convención, pero los servicios pueden operar en otros puertos. La dirección IP y el par de puerto identifican un punto final de transporte; combinado con puntos de referencia y protocolo de origen y destino, forma una identificación de comunicación."
  },
  {
    "kind": "paragraph",
    "text": "Socket es una abstracción utilizada por el sistema operativo para permitir que las aplicaciones envíen y reciban datos. Un servidor crea un socket, asocia una dirección y un puerto, y pasa escuchando conexiones. Si el proceso no está escuchando, el cliente puede recibir una conexión rechazada error. Si un cortafuegos desecha silenciosamente paquetes, el cliente tiende a esperar hasta un tiempo libre."
  },
  {
    "kind": "subhead",
    "text": "Conexiones distintas en el camino"
  },
  {
    "kind": "code",
    "text": "Client 10.1.5.20:53144 -> Gateway 10.2.8.10:443\nephemeral port of the service\nGateway 10.2.8.10:48720 -> Backend 10.3.9.15:8443\nnew backend listener connection"
  },
  {
    "kind": "subhead",
    "text": "Consecuencias arquitectónicas"
  },
  {
    "kind": "paragraph",
    "text": "Las conexiones cliente-puerta y gateway-backend son típicamente independientes. La puerta de entrada puede terminar TLS, reutilizar conexiones de backend y aplicar diferentes timeouts. Esto explica por qué un problema puede existir sólo en un lado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.11 NAT, cortafuegos, proxy inverso y balanceador de carga",
    "id": "intermediarios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NAT"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifica la información de la dirección, a menudo incluyendo la información del puerto, durante el paso del tráfico. NAT permite a las direcciones privadas utilizar un pequeño conjunto de direcciones públicas y es común en redes corporativas y entornos cloud. Como resultado, la dirección del servidor observada puede ser la dirección del dispositivo intermedio en lugar de la dirección original del consumidor."
  },
  {
    "kind": "paragraph",
    "text": "Para preservar la información de origen de capas de aplicaciones, los proxies pueden añadir encabezados como Forwarded o X-Forwarded-For. Estos encabezados requieren una cadena de confianza: aceptar valores directamente de cualquier cliente permite manipular. El componente fronterizo debe eliminar o sobrescribir valores no confiados antes de pasar la información."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Firewall"
  },
  {
    "kind": "paragraph",
    "text": "Los cortafuegos aplican reglas para permitir, rechazar o descartar tráfico basado en criterios tales como dirección, puerto, protocolo y estado de conexión. Los cortafuegos de aplicación pueden analizar protocolos de capa superior. En entornos API, pueden existir diferentes capas de cortafuegos en los niveles de consumo, red, borde público, cluster y host."
  },
  {
    "kind": "paragraph",
    "text": "Un lanzamiento de cortafuegos debe considerar dirección, origen, destino, puerto y protocolo. Las solicitudes como 'allow the API' son insuficientes. Además, el retorno normal suele depender del estado de conexión, y el tráfico a proveedores de identidad, servicios de validación de certificados o servicios externos también puede requerir reglas específicas."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Proxy inverso y balanceador"
  },
  {
    "kind": "paragraph",
    "text": "Un proxy reverso recibe solicitudes en nombre de servidores internos. Puede terminar TLS, aplicar reglas, normalizar los encabezados, comprimir respuestas y ocultar la topología backend. Una API Gateway tiene una función de proxy inversa, pero añade funciones de gestión de API, seguridad y gobernanza específicas."
  },
  {
    "kind": "paragraph",
    "text": "Los balanceadores de carga distribuyen tráfico en múltiples casos para aumentar la capacidad y la disponibilidad. Los algoritmos pueden considerar la robina redonda, conexiones activas, pesos, latencia o afinidad. Los controles de salud determinan qué casos pueden recibir tráfico. Un servicio puede aparecer disponible en una prueba local pero falla externamente si el balanceador de carga considera todas las instancias poco saludables."
  },
  {
    "kind": "subhead",
    "text": "Error común"
  },
  {
    "kind": "paragraph",
    "text": "Terminar TLS en el balanceador no significa necesariamente que el segmento hasta la puerta de entrada es desprotegido; la re-encriptación puede ocurrir. El diseño debe registrar cada hop, donde TLS termina, que certificado es validado, y qué encabezados de contexto son confiables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.12 TLS, HTTPS y establecimiento de confianza",
    "id": "seguranca"
  },
  {
    "kind": "paragraph",
    "text": "TLS protege la comunicación contra la lectura, alteración y falsificación no deseadas dentro del modelo de amenaza considerado. HTTPS es HTTP transportado sobre un canal protegido por TLS. El protocolo negocia parámetros criptográficos, autentica al menos el servidor en configuraciones comunes y establece las claves utilizadas para proteger los datos transmitidos."
  },
  {
    "kind": "paragraph",
    "text": "El servidor presenta un certificado asociando una clave pública con identidades, típicamente nombres DNS. El cliente verifica la firma, período de validez, cadena de certificados, uso permitido y coincidencia de nombre. La confianza depende de las autoridades de certificación aceptadas por el cliente. En entornos corporativos, los certificados pueden ser expedidos por las autoridades públicas o los PKI internos."
  },
  {
    "kind": "paragraph",
    "text": "Durante el apretón de manos, el cliente y el servidor negocian versiones y algoritmos compatibles. TLS 1.3 partes simplificadas y modernizadas del protocolo en comparación con versiones anteriores. La aplicación sólo debe enviar información confidencial después de que se establezca y valide el canal. Si la negociación fracasa, no se puede ejecutar ninguna política de HTTP de puerta de entrada porque aún no se ha recibido el mensaje de solicitud."
  },
  {
    "kind": "paragraph",
    "text": "mTLS añade autenticación al cliente en el nivel TLS. Además de validar el certificado del servidor, el servidor solicita y valida un certificado presentado por el cliente. Esto es común en B2B e integraciones financieras. mTLS autentica una identidad técnica vinculada al certificado; la autorización de negocios puede depender todavía de fichas, alcances, contratos y contexto."
  },
  {
    "kind": "paragraph",
    "text": "TLS puede terminar en múltiples puntos. Una conexión externa podría terminar con un WAF o un balanceador de carga, seguido de otra conexión TLS con el Portal de API. La API Gateway podría crear una tercera conexión con el backend. Cada segmento tiene su propio apretón de manos, configuración, tienda de confianza, certificado y perfil de riesgo. Simplemente decir 'la API utiliza HTTPS' es insuficiente para entender la arquitectura."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de tubos TLS"
  },
  {
    "kind": "code",
    "text": "Client --TLS 1--> Load Balancer --TLS 2--> API Gateway --TLS 3--> Backend\ncertificate public internal mTLS optional\nEach arrow represents a connection and potentially different validation."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico a mano"
  },
  {
    "kind": "paragraph",
    "text": "Mensajes como certificado desconocido, desajuste de hostname, CA desconocido, certificado caducado, ninguna versión de cifrado compartido o protocolo apunta a diferentes clases de fracasos. Capturing the error and identifying the hop are essential."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.13 Anatomía de un mensaje HTTP",
    "id": "http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP sigue un modelo de respuesta a solicitudes. La solicitud contiene métodos, metas, encabezados (cuando sea aplicable), y contenido. La respuesta contiene códigos de estado, encabezados y contenidos. HTTP define semántica: un método no es sólo una palabra, y un código no es sólo un número. Clientes, caches, proxies y gateways toman decisiones basadas en estos significados."
  },
  {
    "kind": "paragraph",
    "text": "El método GET solicita una representación y se considera seguro e idempotente en el modelo de protocolo. POST envía contenido para el procesamiento definido por el recurso. PUT asocia con la creación o sustitución del estado en el objetivo y es idempotente. DELETE pide eliminación y también tiene semántica idempotente, aunque la respuesta y los efectos observables pueden variar. PATCH aplica modificaciones parciales según el formato utilizado."
  },
  {
    "kind": "paragraph",
    "text": "Los encabezados llevan metadatos. Host or : Authority identifica la autoridad de destino; Content-Type describe el tipo de contenido enviado; Aceptar indica las representaciones aceptadas; Autorización lleva credenciales de aplicación; Cache-Control dirige caching; traceparent puede propagar el contexto de localización. Las pasarelas validan frecuentemente, eliminan, añaden o transforman los encabezados."
  },
  {
    "kind": "paragraph",
    "text": "Los códigos de estado 2xx indican el éxito; 3xx mango redirecciones; 4xx indican que la solicitud no puede ser cumplida en las condiciones presentadas; 5xx indican fallos del lado del servidor o del intermediario. El código debe interpretarse con el cuerpo, los encabezados, el componente emisor y el contexto. Un 404 podría significar un recurso de backend ausente o una ruta de entrada inédita."
  },
  {
    "kind": "paragraph",
    "text": "HTTP es apátridas en el sentido de que cada solicitud debe contener la información necesaria para su interpretación. Las aplicaciones pueden construir sesiones usando cookies o fichas, pero esto ocurre por encima de la semántica básica del protocolo. Las API corporativas suelen preferir fichas explícitas y contexto de búsqueda para facilitar la distribución y escalabilidad."
  },
  {
    "kind": "code",
    "text": "Simplified HTTP Request and Response\nGET /v1/clientes/123 HTTP/1.1\nHost: api.exemplo.com\nAccept: application/json\nAuthorization: Bearer <token>\nX-Correlation-ID: 7ad3c8c0\nHTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nX-Correlation-ID: 7ad3c8c0\n{\n    \"id\": 123,\n    \"nome\": \"Cliente de Exemplo\"\n}"
  },
  {
    "kind": "table",
    "caption": "Cuadro 2 - Interpretación inicial de los códigos de estado común en Gateways.",
    "headers": [
      "Código",
      "Interpretación inicial",
      "Posible origen en las API"
    ],
    "rows": [
      [
        "200",
        "Operación terminada",
        "Backend o respuesta sintetizada por la puerta"
      ],
      [
        "400",
        "Solicitud inválida",
        "Esquema, parámetro, encabezado o sintaxis"
      ],
      [
        "401",
        "No autorizado",
        "Token ausente/inválido o certificado no asociado"
      ],
      [
        "403",
        "Autorizado sin permiso",
        "Alcance, función, contrato o cuestión de política"
      ],
      [
        "404",
        "Recursos o ruta no encontrada",
        "Gateway, backend o versión incorrecta"
      ],
      [
        "429",
        "Tasa límite excedida",
        "Tasa límite o cuota"
      ],
      [
        "502",
        "Invalid upstream response",
        "Fallo de puerta trasera"
      ],
      [
        "503",
        "Servicio no disponible",
        "No hay casos saludables ni protección de la capacidad"
      ],
      [
        "504",
        "Tiempo de salida",
        "Backend no respondió a tiempo"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.14 REST y el concepto de recurso",
    "id": "rest"
  },
  {
    "kind": "paragraph",
    "text": "REST fue definido por Roy Fielding como un estilo arquitectónico para sistemas de hipermedia distribuidos. Un estilo arquitectónico es un conjunto de limitaciones que producen ciertas propiedades. REST combina cliente-servidor, apátridas, caché, interfaz uniforme, sistema de capas y codificación opcional impulsada por la demanda. El resultado deseado incluye escalabilidad, visibilidad y evolución independiente de los componentes."
  },
  {
    "kind": "paragraph",
    "text": "El concepto central es el recurso. Un recurso representa algo que se puede identificar: un cliente, una cuenta, un pago, un contrato o una colección. Los consumidores interactúan con las representaciones del recurso, como JSON o XML. El URI identifica el recurso; el método expresa la intención; los encabezados y el contenido completan el mensaje. Esta separación evita dibujar la interfaz sólo como llamadas de procedimiento disfrazadas."
  },
  {
    "kind": "paragraph",
    "text": "Apátridas significa que el servidor no debe depender del contexto de sesión oculta entre las solicitudes para interpretar la próxima operación. Cada solicitud trae el contexto necesario. Esto facilita la distribución entre casos y aumenta la visibilidad, pero puede aumentar el tamaño del mensaje. Las fichas de acceso son un ejemplo de información contextual transportada explícitamente."
  },
  {
    "kind": "paragraph",
    "text": "La interfaz uniforme limita las variaciones y permite a los intermediarios comprender la comunicación. La semántica del método correcto y las representaciones autodescribiendo e hipermedia forman parte del modelo. Muchas API comerciales adoptan sólo un subconjunto de estas restricciones. Es útil reconocer la diferencia entre REST como definida académicamente y el uso coloquial de \"REST API\"."
  },
  {
    "kind": "paragraph",
    "text": "El sistema de capa permite insertar proxies, caches, gateways y balanceadores sin requerir que el consumidor conozca toda la topología. Esta restricción se conecta directamente al mundo de API Gateways: el cliente llama a una autoridad pública y no necesita saber qué microservicio, cluster o datacenter procesa la operación."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de modelos orientados a los recursos"
  },
  {
    "kind": "code",
    "text": "GET /clientes/123 retrieve customer representation\nPUT /clientes/123 replace state according to contract\nPATCH /clientes/123 apply partial change\nDELETE /clientes/123 request removal\nGET /clientes/123/contas navigate sub-resources"
  },
  {
    "kind": "subhead",
    "text": "Ten cuidado con los verbos en la URI"
  },
  {
    "kind": "paragraph",
    "text": "Rutas como /consultarCliente o /deletarCliente hacen que la interfaz se parezca a RPC. Aunque no todos los usos son automáticamente incorrectos, el diseño debe ser intencional y coherente con el estilo elegido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.15 API Gateway y plataforma de APIs",
    "id": "gateway"
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway es un intermediario especializado que recibe llamadas de consumidores y los envía a los servicios de backend. A lo largo del camino, aplica políticas relacionadas con seguridad, tráfico, mediación, enrutamiento y observabilidad. Esta posición permite normalizar los controles sin duplicar todas las implementaciones en cada servicio."
  },
  {
    "kind": "paragraph",
    "text": "La puerta de entrada no debe confundirse con toda la plataforma API Management. La plataforma puede incluir planos de gestión, catálogos, portales de desarrolladores, análisis, gestión de productos, suscripciones, credenciales y gestión del ciclo de vida. La puerta de entrada es el componente de tiempo de ejecución o plano de datos que procesa el tráfico. Diferentes productos utilizan sus propios nombres y separaciones, pero la distinción conceptual es útil."
  },
  {
    "kind": "paragraph",
    "text": "La seguridad de la entrada puede incluir validación de claves API, JWTs, OAuth 2.0, mTLS, verificación de firmas, listas de permisos y protección contra contenidos malformados. El control de tráfico puede incluir la limitación de tarifas, cuotas, arresto de picos y ruptura de circuitos. La mediación puede transformar encabezados, caminos y formatos. La observabilidad recoge registros, métricas y rastros para la operación y auditoría."
  },
  {
    "kind": "paragraph",
    "text": "La centralización trae beneficios y riesgos. Las políticas consistentes aumentan la gobernanza, pero la puerta de entrada puede convertirse en un punto crítico de capacidad y disponibilidad. Las reglas excesivamente complejas elevan latencia y complican el mantenimiento. La lógica del negocio profundo en la puerta crea acoplamiento y reduce la claridad de responsabilidad. El diseño debe mantener el equilibrio entre los controles transversales y el dominio backend."
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway proporciona funciones de gestión, entrega y seguridad de API con políticas y componentes de administración. Azure API Management ofrece una plataforma gestionada con portal, plano de gestión y portal. A pesar de las diferencias de productos, los fundamentos de este capítulo se aplican a ambos: oyentes, certificados, DNS, aguas arriba, políticas HTTP, identidad, registros y capacidad."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-responsabilidades-es.svg",
    "alt": "Consumidores, responsabilidades de API Gateway y responsabilidades de backend",
    "caption": "Figura 3 - Las responsabilidades típicamente intersectoriales se concentran en el Portal de API."
  },
  {
    "kind": "subhead",
    "text": "Responsabilidad Boundary"
  },
  {
    "kind": "paragraph",
    "text": "La puerta de entrada puede validar que una ficha contiene el alcance apropiado, pero el backend sigue siendo responsable de las reglas de autorización vinculadas a los datos y dominio, como verificar si el cliente autenticado puede acceder a esa cuenta específica."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.16 Recorrido de extremo a extremo de una llamada de API",
    "id": "jornada"
  },
  {
    "kind": "paragraph",
    "text": "Considere una aplicación corporativa que envía GET https://api.exemplo.com/v1/clientes/123. Antes de enviar el mensaje, la biblioteca cliente interpreta la URI, identifica el esquema HTTPS, host, puerto predeterminado 443, y ruta. Realiza la resolución de nombre, posiblemente usando caches del proceso, sistema operativo y resolución configurada."
  },
  {
    "kind": "paragraph",
    "text": "Después de obtener una dirección, el cliente inicia una conexión de transporte. En HTTP/1.1 o HTTP/2 sobre TCP, se produce un apretón de manos de tres vías. Luego comienza el apretón de manos TLS. El cliente informa las capacidades, la versión y el nombre del servidor; el endpoint presenta el certificado y negocia las claves. Si la validación falla, la operación termina antes de que exista una solicitud útil de HTTP para la entrada."
  },
  {
    "kind": "paragraph",
    "text": "Con el canal establecido, el cliente envía método, camino, cabeceras y cuerpo. Un componente fronterizo puede recibir la conexión, aplicar reglas de cortafuegos de aplicación, tamaño límite y enviar el mensaje. La API Gateway selecciona la API publicada basada en host, path, método y configuración. Las políticas pueden validar el certificado del cliente, token, scope, schema y límites de consumo."
  },
  {
    "kind": "paragraph",
    "text": "Si la solicitud es aceptada, la puerta de entrada determina el backend, construye o reutiliza una conexión, y envía un mensaje aguas arriba. El backend realiza autenticación adicional o autorización de dominio, consultas dependencias y produce respuesta. La puerta de entrada recibe esta respuesta, puede transformarla, eliminar los encabezados internos, registrar métricas y devolverla al consumidor."
  },
  {
    "kind": "paragraph",
    "text": "Las respuestas atraviesan conexiones independientes. El backend no conoce necesariamente la dirección original del cliente, ni el cliente conoce la dirección backend. Los encabezados controlados pueden propagar IDs de correlación, identidad técnica e información de origen. Cada hop debe tener contratos claros para evitar la espoofía, pérdida de contexto y exposición de detalles internos."
  },
  {
    "kind": "paragraph",
    "text": "En caso de fallo, el componente que detecta el problema puede generar la respuesta. Un 401 puede ser producido por la política de la puerta de entrada sin llamar al backend. Un 502 puede resultar de la falla de conexión aguas arriba. Un 500 puede venir del backend y sólo atravesar la puerta de entrada. Identificar el remitente real es una de las habilidades clave para resolver problemas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jornada-requisicao-api-es.svg",
    "alt": "Pasos en una llamada HTTPS cliente a los datos",
    "caption": "Figura 4 - Componentes principales a lo largo del viaje final a fin."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Secuencia detallada"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "La aplicación construye URI, encabezados, contenido y sus ajustes de timeout.",
      "El host es resuelto por DNS; el cliente elige una de las direcciones devueltas.",
      "Las reglas de la cadena permiten o evitan llegar al punto final.",
      "Se establece la conexión TCP o QUIC.",
      "TLS negocia parámetros, valida certificados y crea claves de sesión.",
      "La frontera recibe la solicitud y puede solicitar protección inicial.",
      "La puerta de entrada identifica la API y ejecuta políticas de entrada.",
      "Las credenciales son validadas localmente o con sistemas de identidad.",
      "La puerta de entrada selecciona el río arriba y reenvía la solicitud.",
      "El backend ejecuta reglas de negocio y accede a dependencias.",
      "La respuesta vuelve a la puerta de entrada, que aplica políticas de egreso.",
      "Se registran métricas, registros y trazas; la respuesta vuelve al cliente."
    ]
  },
  {
    "kind": "subhead",
    "text": "Cuestión operacional"
  },
  {
    "kind": "paragraph",
    "text": "¿Cuál de estos pasos se detuvo la llamada? Esta pregunta es más útil que 'The API is down?' porque transforma un síntoma amplio en hipótesis verificables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.17 Solución de problemas con capas",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La solución eficaz de problemas comienza con pruebas, no cambios. Horarios de registro en zona horaria, punto final, consumidor, método, identificación de correlación, código, duración y mensaje completo. Compare las llamadas que fallan con las que funcionan. Cambios recientes DNS, actualizaciones de certificados, ajustes de ruta, modificaciones de políticas, reinicios de backend o refrescos creíbles ayudan a priorizar hipótesis pero no reemplazan la validación."
  },
  {
    "kind": "paragraph",
    "text": "La investigación puede proceder de abajo a arriba. Primero, ¿se resuelve el nombre a la dirección esperada? Segundo, ¿se establece la conectividad al puerto? Tercero, ¿el TLS apretó el certificado completo y validado? Cuarto, ¿la solicitud HTTP llega a API Gateway? Quinto, ¿qué política o ruta se selecciona? Sexto, ¿responde al corriente? Séptimo, ¿ concluye la regla del negocio? Este pedido evita analizar las cargas de pago cuando las conexiones no existen."
  },
  {
    "kind": "paragraph",
    "text": "También es necesario observar los timeouts de cadena. El tiempo de salida del consumidor debe ser consistente con el borde, la puerta de entrada y los timeouts backend. Si la puerta de entrada espera 60 segundos pero el balanceador de carga sale en 30, el límite efectivo es 30. Los registros automáticos pueden multiplicar la carga y transformar la latencia en indisponibilidad. Los horarios, las retries y los interruptores necesitan ser diseñados juntos."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben permitir la correlación entre los tubos. Un ID de correlación estable facilita el seguimiento de las transacciones mientras que los IDs de traza y los intervalos muestran dependencias y duración. Tenga cuidado con datos sensibles: no se deben registrar indiscriminadamente fichas, certificados privados, contraseñas y cargas personales. La observabilidad requiere un diagnóstico equilibrado, seguridad, privacidad y coste."
  },
  {
    "kind": "paragraph",
    "text": "La puerta de entrada ofrece un punto privilegiado de observación pero no lo ve todo. Si el apretón de manos TLS falla ante el oyente, puede que no haya registro de políticas. Si backend acepta la conexión interna, la puerta de entrada sólo observa los timeouts. Si el cliente cancela la solicitud, el backend puede continuar el procesamiento. La interpretación requiere combinar fuentes."
  },
  {
    "kind": "table",
    "caption": "Cuadro 3 - Matriz inicial de solución de problemas.",
    "headers": [
      "Layer/Stage",
      "Pruebas o pruebas",
      "Fracasos comunes"
    ],
    "rows": [
      [
        "DNS",
        "nslookup/dig, cache, registro esperado",
        "NXDOMAIN, viejo IP, split DNS"
      ],
      [
        "Red",
        "ruta, cortafuegos, conexión al puerto",
        "timeout, reset, connection refused"
      ],
      [
        "TLS",
        "openssl/curl -v, chain and name",
        "CA desconocido, caducado, desajustado"
      ],
      [
        "HTTP",
        "método, camino, cabeceras, tamaño",
        "400, 404, 405, 413"
      ],
      [
        "Gateway",
        "traza de políticas, API seleccionada",
        "401, 403, 429, ruta incorrecta"
      ],
      [
        "Upstream",
        "piscina, control de salud, conexión de backend",
        "502, 503, 504"
      ],
      [
        "Application Layer",
        "registros, trazas, bases de datos y dependencias",
        "500, perezosos, regla de negocios"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Mejor práctica"
  },
  {
    "kind": "paragraph",
    "text": "Antes de reiniciar un componente, preservar evidencia. Los reinicios pueden aliviar los síntomas y borrar el estado útil para el análisis en entornos críticos, seguir la gestión de incidentes, el control de cambios y los procedimientos de comunicación definidos por la organización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.18 Aplicación en entornos corporativos y bancarios",
    "id": "pratica"
  },
  {
    "kind": "paragraph",
    "text": "Las instituciones financieras operan API con alta confidencialidad, integridad, disponibilidad, trazabilidad y requisitos de segregación. Una llamada puede atravesar internet público, redes privadas, zonas de seguridad, múltiples portales, proveedores de identidad, sistemas heredados y plataformas cloud. Cada límite añade controles y también complejidad operacional."
  },
  {
    "kind": "paragraph",
    "text": "mTLS se utiliza frecuentemente para autenticar a los participantes técnicos y establecer confianza entre organizaciones o capas internas. OAuth 2.0 y tokens pueden representar autorización delegada, alcances y contexto cliente. El uso de ambos juntos no es simple redundancia: mTLS protege y autentica el canal técnico/participant, mientras que las fichas pueden llevar autorización de aplicación y consentimiento según el ecosistema."
  },
  {
    "kind": "paragraph",
    "text": "Los portales corporativos aplican patrones comunes para evitar que cada backend implemente validación de certificados, limitación de tarifas, cuotas y registro de manera diferente. Sin embargo, las políticas deben ser versionadas, probadas y observadas como software. Un cambio en la tienda de confianza, algoritmo, timeout o transformación puede afectar muchas API de inmediato."
  },
  {
    "kind": "paragraph",
    "text": "Las arquitecturas híbridas pueden utilizar una puerta de entrada local y otra en la nube. Una solicitud puede pasar a través de Axway en el borde corporativo y Azure APIM cerca de servicios en Azure, o viceversa dependiendo del diseño. En estos casos, es esencial definir qué capa autentica, autoriza, qué cabeceras pueden atravesar, dónde termina TLS, y cómo se conservan los IDs de correlación."
  },
  {
    "kind": "paragraph",
    "text": "El riesgo de API no se limita a ataques externos. La configuración incorrecta, el inventario incompleto, las credenciales excesivas, las dependencias inseguras y el consumo de API de terceros pueden exponer datos y operaciones. El OWASP API Security Top 10 y NIST SP 800-228 proporcionan estructuras para el estudio de vulnerabilidades y controles en fases de tiempo previo y de tiempo de ejecución."
  },
  {
    "kind": "paragraph",
    "text": "Comprender capas también mejora la comunicación entre equipos. En lugar de atribuir un fallo genérico a la puerta de entrada, las redes pueden confirmar el camino y el cortafuegos; la seguridad puede validar certificados y confianza; la identidad puede analizar fichas; la plataforma puede verificar políticas y aguas arriba; la aplicación puede investigar reglas de negocio. Un vocabulario común reduce el tiempo de resolución."
  },
  {
    "kind": "subhead",
    "text": "Situación bancaria simplificada"
  },
  {
    "kind": "paragraph",
    "text": "El socio presenta el certificado mTLS a la puerta de entrada. La puerta valida la cadena, validez e identidad registrada. A continuación, valida el acceso token y sus alcances. El backend también verifica la autorización sobre el recurso solicitado. Los registros registran la transacción sin guardar secretos."
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
      "Las API dependen de una cadena formada por DNS, red, transporte, TLS, HTTP, gateway y"
    ]
  },
  {
    "kind": "paragraph",
    "text": "backend."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Internet, Web, HTTP, API y REST son conceptos relacionados pero entidades distintas.",
      "El Editor IETF y RFC define y publica muchos protocolos; los fabricantes documentan sus"
    ]
  },
  {
    "kind": "paragraph",
    "text": "implementaciones."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La encapsulación separa las responsabilidades y permite que las capas evolucionan"
    ]
  },
  {
    "kind": "paragraph",
    "text": "relativamente independientemente."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "DNS asocia nombres con información de resolución; IP maneja dirección y enrutamiento; TCP"
    ]
  },
  {
    "kind": "paragraph",
    "text": "proporciona un flujo de byte confiable; TLS protege el canal; HTTP define mensajes de aplicación y semántica."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Un API Gateway es el plano de datos que aplica políticas y rutas de tráfico; API Management"
    ]
  },
  {
    "kind": "paragraph",
    "text": "abarca un ciclo de vida más amplio."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Las conexiones cliente-a-puerta y gateway-a-backend son independientes y pueden tener diferentes certificados,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "timeouts, y modos de falla."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "La solución de problemas con capa comienza con evidencia e identifica la etapa exacta donde"
    ]
  },
  {
    "kind": "paragraph",
    "text": "la transacción paró."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Preguntas de revisión",
    "id": "questoes"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por qué Internet y Web no son sinónimos.",
      "¿Cuál es la diferencia entre una API y una API REST?",
      "¿Por qué la documentación del fabricante no reemplaza a un RFC?",
      "¿Qué ocurre durante la encapsulación y la decapsulación?",
      "¿Cómo ayuda el modelo de capa en investigación de fallas?",
      "¿Cuál es la diferencia entre el enrutamiento IP y el enrutamiento API?",
      "¿Cómo influye DNS TTL en las migraciones y la debilidad?",
      "¿Por qué una conexión rechazada y el tiempo libre sugieren diferentes hipótesis?",
      "¿Cuál es la diferencia entre las conexiones cliente-puerta y gateway-backend?",
      "¿Qué protege TLS y qué no resuelve solo?",
      "¿Por qué pueden usarse juntos mTLS y OAuth?",
      "¿Cómo interpretar un código HTTP producido por la puerta de entrada en lugar del backend?",
      "¿Qué responsabilidades son apropiadas para la puerta de entrada y que debe permanecer en el backend?",
      "¿Cómo afectan a una llamada los plazos no deseados entre componentes?",
      "Describir, en orden, el viaje completo HTTPS pide ciclo de vida."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudios de caso",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Certificado intercambiado durante la migración"
  },
  {
    "kind": "paragraph",
    "text": "Un equipo cambia el CNAME de api.exemplo.com a un nuevo balanceador de carga. Algunos consumidores acceden normalmente mientras que otros reciben el nombre de host o errores de cadena no confiados. DNS parece correcto en pruebas realizadas por el equipo responsable."
  },
  {
    "kind": "paragraph",
    "text": "Analizar posibles causas considerando la caché DNS, split-horizon, SNI, certificado presentado por el nuevo endpoint, cadena intermedia y diferentes almacenes. Lista evidencia que recogería antes de reconfigurar DNS de nuevo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Intermitente 504"
  },
  {
    "kind": "paragraph",
    "text": "Una API exhibe intermitente 504 durante las horas pico. El backend registra algunas operaciones completas después de 40 segundos, pero la puerta de entrada tiene un tiempo de 30 segundos. El cliente realiza dos entradas automáticas."
  },
  {
    "kind": "paragraph",
    "text": "Explique cómo los timeouts y retries pueden aumentar la carga y producir operaciones duplicadas. Proponer un conjunto de análisis que implican latencia, idempotencia, capacidad de entrada, límite de entrada y comportamiento de consumo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Sólo 401 en un ambiente único"
  },
  {
    "kind": "paragraph",
    "text": "El mismo token funciona en el entorno sandbox, pero recibe un error de 401 en la producción. El formato de la ficha parece correcto y la API tiene el mismo camino en ambos entornos."
  },
  {
    "kind": "paragraph",
    "text": "Investigar posibles diferencias en emisor, audiencia, clave de firma, reloj, alcance, política, cadena mTLS y producto API. Explique qué datos se pueden registrar de forma segura para comparar las dos ejecuciones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario esencial",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Mandato",
      "Definición en el contexto del capítulo"
    ],
    "rows": [
      [
        "API",
        "Una interfaz que define cómo los componentes de software pueden utilizar las capacidades proporcionadas por otro componente."
      ],
      [
        "API Gateway",
        "Un intermediario especializado que recibe, protege, media y envía llamadas API."
      ],
      [
        "Backend/Upstream",
        "El servicio de destino al que la puerta de entrada de la solicitud."
      ],
      [
        "DNS",
        "Sistema de nombres distribuidos utilizado para resolver nombres y otros datos asociados."
      ],
      [
        "Encapsulación",
        "Proceso en el que cada capa agrega información de control a los datos."
      ],
      [
        "Punto final",
        "Un punto de comunicación identificado por información como esquema, host, puerto y ruta."
      ],
      [
        "HTTP",
        "Protocolo de aplicación con un modelo de solicitud/respuesta y semántica estandarizada."
      ],
      [
        "IP",
        "El protocolo responsable de abordar y transmitir datagramas entre redes."
      ],
      [
        "mTLS",
        "Transport Layer Security (TLS) con autenticación de certificados de cliente, además de autenticación del servidor."
      ],
      [
        "Proxy inverso",
        "Un intermediario que recibe solicitudes en nombre de servidores internos."
      ],
      [
        "Transferencia del Estado Representacional",
        "Un estilo de patrón arquitectónico para sistemas de hipermedia distribuidos."
      ],
      [
        "RFC",
        "Documento publicado en la serie Solicitud de Comentarios, que puede registrar normas, prácticas o material informativo."
      ],
      [
        "Socket",
        "Una abstracción utilizada por aplicaciones para comunicarse a través de una red."
      ],
      [
        "TCP",
        "Un protocolo que proporciona una transmisión de flujo de byte confiable y ordenado."
      ],
      [
        "TLS",
        "Un protocolo que asegura las comunicaciones y establece la confianza criptográfica."
      ],
      [
        "Uniform Resource Identifier (URI)",
        "Identificador compacto para un recurso abstracto o físico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas",
    "id": "referencias"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "IETF - Sobre RFCs. https://www.ietf.org/process/rfcs/ - Vista general del papel de las RFC y el proceso IETF.",
      "Editor RFC. https://www.rfc-editor.org/ - Investigación y estado de RFCs.",
      "RFC 9293 - Protocolo de Control de Transmisiones. https://www.rfc-editor.org/rfc/rfc9293 - Especificación consolidada de TCP.",
      "RFC 8200 - Especificación IPv6. https://www.rfc-editor.org/rfc/rfc8200 - Especificación IPv6.",
      "RFC 1034 - DNS Conceptos e Instalaciones. https://www.rfc-editor.org/rfc/rfc1034 - Fundaciones conceptuales del DNS.",
      "RFC 1035 - DNS Implementación y Especificación. https://www.rfc-editor.org/rfc/rfc1035 - Formato y funcionamiento del DNS.",
      "RFC 3986 - URI Generic Syntax. https://www.rfc-editor.org/rfc/rfc3986 - Sintaxis genérica para URIs.",
      "RFC 9110 - HTTP Semantics. https://www.rfc-editor.org/rfc/rfc9110 - Semántica moderna para HTTP.",
      "RFC 9112 - HTTP/1.1. https://www.rfc-editor.org/rfc/rfc9112 - HTTP/1.1 Mensajes y conexiones.",
      "RFC 9113 - HTTP/2. https://www.rfc-editor.org/rfc/rfc9113 - HTTP/2 Especificación.",
      "RFC 9114 - HTTP/3. https://www.rfc-editor.org/rfc/rfc9114 - Especificación HTTP/3.",
      "RFC 8446 - TLS 1.3. https://www.rfc-editor.org/rfc/rfc8446 - TLS 1.3 Especificación.",
      "Roy Fielding - Estilo Arquitectónico REST. https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm - Capítulo de la tesis que describe REST.",
      "NIST SP 800-228. https://csrc.nist.gov/pubs/sp/800/228/final - Directrices para la seguridad de API en sistemas nativos de nube.",
      "OWASP API Security Project. https://owasp.org/www-project-api-security/ - Riesgos y materiales de seguridad para APIs.",
      "Microsoft - Azure API Management conceptos. https://learn.microsoft.com/azure/api-management/api-management-key-concepts - Conceptos y componentes de Azure API Management.",
      "Microsoft - API Management vista de la puerta de entrada. https://learn.microsoft.com/azure/api-management/api-management-gateways-overview - Papel de la puerta de entrada en el plano de datos.",
      "Axway - Introducción a API Gateway. https://docs.axway.com/bundle/axway-open-docs/page/docs/api_mgmt_overview/api_mgmt_components/apigateway/index.html - Descripción oficial de Axway API Gateway."
    ]
  }
];
