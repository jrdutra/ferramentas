import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const HTTPS_TLS_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-01-https-stack.svg",
    "alt": "HTTPS como HTTP ejecutándose sobre TLS y TCP en la pila de comunicación",
    "caption": "Figura 6.1 - HTTPS como una composición de HTTP sobre TLS y TCP."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo explica cómo TLS protege las llamadas API, cómo se construye HTTPS, cómo funcionan los certificados y las cadenas de confianza, qué diferencias importan entre TLS 1.2 y TLS 1.3 y cómo aparecen estos conceptos en las API Gateways empresariales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos del capítulo",
    "id": "objetivos-del-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Comprenda la diferencia entre HTTP, HTTPS, TLS, SSL, certificado digital, clave privada y cadena de confianza.",
      "Comprenda los objetivos de seguridad de TLS: confidencialidad, integridad, autenticación y, cuando esté bien configurado, secreto de reenvío.",
      "Lea el flujo de handshake TLS 1.2 y TLS 1.3 sin tratar el proceso como una caja negra.",
      "Identifique la función de SNI, ALPN, cipher suites, extensiones TLS, certificados X.509, almacenes de confianza, almacenes de claves y rotación de certificados.",
      "Comprenda los modos de implementación del gateway: terminación TLS, recifrado TLS, paso a través de TLS y mTLS.",
      "Diagnostique errores TLS comunes en API Gateways, balanceadores, proxies, redes privadas y backends empresariales."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Mapa mental del capítulo",
    "id": "mapa-mental-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "TLS no debe estudiarse simplemente como \"ese candado del navegador\". En APIs corporativas participa en las decisiones de arquitectura, operación, seguridad, observabilidad y gobierno. Un problema de TLS puede impedir que la solicitud llegue al gateway; puede hacer que el gateway rechace a un cliente; puede evitar que el gateway confíe en el backend; o puede crear una falsa sensación de seguridad cuando la conexión está cifrada pero la identidad del servidor no se valida correctamente."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo sigue un orden práctico: primero explicamos el problema que resuelve TLS; luego analizamos los componentes criptográficos; luego abrimos el apretón de manos; luego pasamos a los certificados; Finalmente, aplicamos todo al mundo de API Gateways, incluida la troubleshooting y el funcionamiento. El objetivo no es memorizar comandos, sino construir un modelo mental que permita diagnosticar fallas y diseñar configuraciones seguras."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "El problema que resuelve HTTPS",
    "id": "el-problema-que-resuelve-https"
  },
  {
    "kind": "paragraph",
    "text": "En la Internet original, los protocolos de aplicación como HTTP viajaban en texto claro. Esto significa que cualquier intermediario capaz de observar paquetes podría leer métodos, URI, encabezados, cookies, tokens, datos personales y respuestas. En una red corporativa moderna, el camino entre el cliente y el servidor puede atravesar Wi-Fi, proxies, balanceadores, firewalls, proveedores, redes privadas, NAT, enlaces dedicados y entornos de nube. Sin una capa criptográfica, cada uno de estos puntos podría ser un lugar para la interceptación o alteración de datos."
  },
  {
    "kind": "paragraph",
    "text": "HTTPS resuelve este problema ejecutando HTTP sobre TLS. HTTP continúa definiendo la semántica de la aplicación: GET, POST, estado 200, estado 401, encabezados, contenido, caché y negociación. TLS se encuentra debajo, creando un canal seguro sobre el transporte. Esta separación es importante porque muchas fallas de API se diagnostican en el nivel incorrecto. Por ejemplo, se produce un error de certificado antes de que se ejecute cualquier política de OAuth en el gateway. Por otro lado, un error 401 suele ocurrir después de que TLS ya se haya negociado exitosamente."
  },
  {
    "kind": "paragraph",
    "text": "En entornos bancarios y de Open Finance, HTTPS no es sólo una buena práctica. Forma parte de la superficie mínima de protección para datos sensibles, tokens, credenciales y operaciones transaccionales. Incluso cuando la red es privada, el cifrado de transporte reduce el impacto de configuraciones incorrectas, acceso inadecuado a segmentos intermedios y ataques de intermediario. La pregunta correcta a menudo no es \"¿necesitamos HTTPS?\" sino \"¿dónde debería terminar TLS, qué identidades se validarán y cómo se regirán los certificados?\" También es fundamental entender que HTTPS no autentica al usuario final, no autoriza la operación y no valida reglas de negocio. Protege el canal y normalmente autentica el servidor ante el cliente. La autenticación de usuario, la autorización de alcance, la validación JWT, la firma de mensajes y el consentimiento son capas superiores. Esta distinción evita un error común: creer que una API es segura sólo porque responde a través de HTTPS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS, SSL y la evolución del protocolo",
    "id": "tls-ssl-y-la-evolucion-del-protocolo"
  },
  {
    "kind": "paragraph",
    "text": "El término SSL todavía aparece en muchas interfaces, documentación y conversaciones de mercado, pero técnicamente SSL es una antigua familia de protocolos. El sucesor moderno es TLS, Transport Layer Security. SSL 2.0 y SSL 3.0 se abandonaron debido a problemas de seguridad y las versiones anteriores de TLS también se desaconsejaron con el tiempo. En la documentación de productos heredados, \"certificado SSL\" a menudo significa simplemente \"certificado utilizado en TLS\"."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.0 y TLS 1.1 formaron parte de la historia de la web segura, pero hoy en día no deberían utilizarse en entornos modernos. TLS 1.2 todavía está ampliamente disponible, especialmente por compatibilidad con clientes más antiguos, bibliotecas heredadas e integraciones B2B. TLS 1.3, definido en RFC 8446, simplificó el protocolo, eliminó opciones inseguras, redujo la latencia del handshake y cifró más metadatos del proceso de negociación. Esto lo convierte en la opción preferida para nuevas arquitecturas cuando la compatibilidad lo permite."
  },
  {
    "kind": "paragraph",
    "text": "La evolución de TLS muestra una lección importante para los arquitectos: la configuración criptográfica no es estática. Un algoritmo considerado aceptable en un momento dado puede volverse inadecuado años después. Los cifrados, las versiones, los tamaños de clave, los modos de operación, los protocolos de renegociación, compresión y revocación evolucionan. Por lo tanto, las plataformas corporativas necesitan un inventario, una política de referencia y un proceso de revisión periódica."
  },
  {
    "kind": "paragraph",
    "text": "En API Gateways, esta evolución se manifiesta de forma concreta. Es posible que el gateway deba aceptar TLS 1.2 de clientes externos para lograr compatibilidad, pero use TLS 1.3 en conexiones internas más modernas. Puede que sea necesario desactivar cifrados antiguos, restringir protocolos, alinear las configuraciones con las políticas de seguridad corporativas y garantizar que los balanceadores, WAF, proxies y backends no mantengan un eslabón débil en el camino."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos de seguridad TLS",
    "id": "objetivos-de-seguridad-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-02-tls-objectives.svg",
    "alt": "Confidencialidad, integridad y autenticidad como objetivos fundamentales de TLS",
    "caption": "Figura 6.2 - Los objetivos fundamentales de TLS."
  },
  {
    "kind": "paragraph",
    "text": "TLS fue diseñado para proteger las aplicaciones contra lecturas inadecuadas, alteración de datos y falsificación de mensajes durante el transporte. En términos prácticos, ofrece confidencialidad, integridad y autenticación. La confidencialidad significa que un observador en la red no debería poder leer el contenido protegido. Integridad significa que se debe detectar un cambio en los bytes transmitidos. La autenticación significa que una parte puede verificar la identidad de la otra, generalmente el cliente que verifica el servidor."
  },
  {
    "kind": "paragraph",
    "text": "Estos objetivos se logran mediante una combinación de cifrado asimétrico, cifrado simétrico, autenticación de mensajes, derivación de claves, certificados y reglas de validación. El cifrado asimétrico se utiliza durante el handshake para autenticar identidades y establecer secretos. Luego, para mejorar el rendimiento, la protección de datos de las aplicaciones utiliza cifrado simétrico. Esta división es fundamental: los algoritmos asimétricos son flexibles para el intercambio y la firma de claves, pero caros; Los algoritmos simétricos son eficaces para proteger grandes volúmenes de datos."
  },
  {
    "kind": "paragraph",
    "text": "Un objetivo adicional muy relevante es el secreto de futuro. En configuraciones con intercambio de claves efímero, como ECDHE, el compromiso futuro de la clave privada del servidor no permite el descifrado automático del tráfico antiguo capturado en el pasado. Esto es crucial para entornos de alto riesgo, porque un atacante puede capturar el tráfico hoy e intentar descifrarlo años más tarde si obtiene una clave privada. TLS 1.3 fue diseñado con este principio de una manera mucho más consistente."
  },
  {
    "kind": "paragraph",
    "text": "A pesar de todos estos beneficios, TLS no protege contra todo. No impide que un cliente autorizado abuse de la API, no corrige la autorización mal diseñada, no valida las cargas útiles, no reemplaza la limitación de velocidad, no resuelve las fugas de tokens en el cliente y no protege los datos después de descifrarlos en el gateway o el backend. En otras palabras, TLS es una capa necesaria pero insuficiente dentro de una arquitectura de seguridad de APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cifrado simétrico, asimétrico, hashes y AEAD",
    "id": "cifrado-simetrico-asimetrico-hashes-y-aead"
  },
  {
    "kind": "paragraph",
    "text": "Para comprender TLS, es necesario comprender cuatro familias de primitivas criptográficas. El cifrado simétrico utiliza la misma clave para cifrar y descifrar. Es rápido y adecuado para datos de aplicaciones. Los ejemplos modernos incluyen AES-GCM y ChaCha20-Poly1305. El cifrado asimétrico utiliza un par de claves: una privada y otra pública. Se utiliza para firmar, verificar y establecer secretos, pero no para cifrar todo el flujo de una API de gran volumen."
  },
  {
    "kind": "paragraph",
    "text": "Las funciones hash producen un resumen de longitud fija a partir de los datos de entrada. En TLS, los hash aparecen en firmas, derivación de claves y comprobaciones de integridad. Un buen hash criptográfico debe ser resistente a colisiones y preimágenes. Sin embargo, el hachís por sí solo no prueba la identidad o autenticidad del origen. Para lograr autenticidad, es necesario combinar la clave y el algoritmo apropiado, como HMAC, o utilizar firmas digitales con clave privada."
  },
  {
    "kind": "paragraph",
    "text": "AEAD, cifrado autenticado con datos asociados, es una construcción moderna que combina confidencialidad e integridad en una sola operación. En lugar de cifrar y luego aplicar una MAC separada de manera propensa a errores, los modos AEAD autentican el contenido protegido y los datos asociados. TLS 1.3 requiere el uso de suites AEAD, lo que simplifica el modelo y evita muchos problemas históricos relacionados con métodos antiguos."
  },
  {
    "kind": "paragraph",
    "text": "En las gateways cotidianas, estas primitivas aparecen en las listas de cipher suites. Cuando un equipo de seguridad exige eliminar 3DES, RC4, CBC débil o intercambio de claves RSA, la motivación radica en esta base criptográfica. Un cipher suite no es sólo un nombre largo: representa opciones sobre algoritmos de intercambio de claves, autenticación, cifrado simétrico y hash. Las malas decisiones pueden permitir ataques conocidos o reducir garantías como el secreto directo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Handshake TLS: descripción general",
    "id": "handshake-tls-descripcion-general"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-03-tls12-handshake.svg",
    "alt": "Flujo de mensajes entre el cliente y el servidor durante un handshake TLS 1.2",
    "caption": "Figura 6.3: Flujo de handshake TLS 1.2 simplificado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-04-tls13-handshake.svg",
    "alt": "Flujo de mensajes simplificado y reducido durante un handshake TLS 1.3",
    "caption": "Figura 6.4: Flujo de handshake TLS 1.3 simplificado."
  },
  {
    "kind": "paragraph",
    "text": "El handshake TLS es el proceso mediante el cual el cliente y el servidor combinan parámetros de seguridad, autentican identidades y obtienen claves para proteger la comunicación. Antes del handshake, sólo existe una conexión de transporte común, normalmente TCP. Después del handshake, los datos de la aplicación están protegidos por el protocolo de registro TLS. Si el handshake falla, ninguna solicitud HTTP llega al servidor de aplicaciones ni a las políticas de gateway."
  },
  {
    "kind": "paragraph",
    "text": "Durante el handshake, el cliente envía un ClientHello con versiones compatibles, conjuntos criptográficos, extensiones y valores aleatorios. Entre las extensiones más importantes para las API modernas se encuentran SNI, que informa el nombre del servidor deseado, y ALPN, que permite negociar protocolos de aplicación como http/1.1 o h2. El servidor responde eligiendo parámetros compatibles y presentando un certificado que será validado por el cliente."
  },
  {
    "kind": "paragraph",
    "text": "Después de intercambiar parámetros, las partes obtienen claves de sesión. Estas claves son diferentes de la clave privada del certificado. La clave privada del servidor no se utiliza para cifrar todos los datos; se utiliza para autenticar el handshake, lo que demuestra que el servidor controla la identidad presentada. Esta distinción ayuda a comprender por qué la captura de una clave de sesión compromete una conexión específica, mientras que la captura de la clave privada compromete la identidad del servidor y, según el protocolo y la configuración, puede tener impactos más amplios."
  },
  {
    "kind": "paragraph",
    "text": "En la troubleshooting, el paso exacto del handshake en el que ocurrió la falla es extremadamente valioso. Un fallo antes de ServerHello sugiere incompatibilidad de versiones, cifrados o extensiones. Un error después del certificado puede indicar problemas de cadena, truststore, nombre de host, validez o revocación. Una falla al final del handshake podría implicar que el intercambio de claves, la firma, mTLS o middleboxes interfieran con el flujo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.2 en profundidad operativa",
    "id": "tls-1-2-en-profundidad-operativa"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.2, definido originalmente en RFC 5246 y posteriormente afectado por recomendaciones de seguridad más recientes, sigue siendo común en entornos corporativos. Permite muchas combinaciones de cipher suites y modos de intercambio de claves. Esta flexibilidad ayudó con la compatibilidad histórica, pero también hizo que las configuraciones inseguras fueran más probables. La calidad de una instalación de TLS 1.2 depende en gran medida de la línea base configurada en el servidor, el gateway y los clientes."
  },
  {
    "kind": "paragraph",
    "text": "En TLS 1.2, la elección del cipher suite contiene más información que en TLS 1.3. Una suite puede indicar RSA para intercambio de claves, ECDHE para intercambio efímero, algoritmo de autenticación, algoritmo simétrico y modo de integridad. Las suites con intercambio de claves RSA estáticas, por ejemplo, no proporcionan secreto directo de la misma manera que ECDHE. Por lo tanto, muchas organizaciones restringen TLS 1.2 a suites con ECDHE y AEAD."
  },
  {
    "kind": "paragraph",
    "text": "Otro punto histórico de TLS 1.2 es la renegociación. La renegociación fue una fuente de problemas y complejidad, especialmente con HTTP/2 y el middleware. En las arquitecturas modernas, debe evitar depender de la renegociación para solicitar un certificado de cliente una vez que la conexión ya esté establecida. Para mTLS, el diseño más claro es exigir el certificado en el handshake inicial en puntos bien definidos de la arquitectura."
  },
  {
    "kind": "paragraph",
    "text": "En API Gateways, TLS 1.2 aparece cuando clientes heredados, socios externos, mainframes, buses antiguos o bibliotecas obsoletas no admiten TLS 1.3. En estos casos, el papel del arquitecto es reducir la superficie de riesgo: permitir solo suites sólidas, deshabilitar la compresión, prohibir protocolos obsoletos, validar los certificados correctamente y planificar la evolución de los clientes hacia una base más moderna."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.3: cambios esenciales",
    "id": "tls-1-3-cambios-esenciales"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3, especificado en RFC 8446, no es sólo una versión incremental. Rediseñó partes importantes del protocolo, eliminó algoritmos y modos históricamente problemáticos y redujo la cantidad de mensajes necesarios para establecer una conexión segura. La idea central era mantener los objetivos de TLS, pero eliminar opciones que creaban complejidad y riesgos operativos."
  },
  {
    "kind": "paragraph",
    "text": "Una diferencia importante es que TLS 1.3 cifra más partes del handshake. Después de ServerHello, muchos mensajes que antes eran visibles ahora viajan protegidos. Esto reduce la exposición de los metadatos y dificulta ciertas formas de inspección pasiva. El intercambio de claves también se ha modernizado para basarse en mecanismos efímeros, favoreciendo el secreto directo por defecto."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 también simplifica los cipher suites. Las suites ahora indican principalmente el algoritmo AEAD y el hash, mientras que los grupos de intercambio de claves y las firmas se negocian mediante extensiones separadas. Esto reduce las ambigüedades y hace que las configuraciones sean más fáciles de entender. La consecuencia práctica es que muchos nombres de cipher suites en TLS 1.3 parecen más cortos, pero el handshake aún negocia varios elementos de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "La reducción de los viajes de ida y vuelta mejora la latencia, especialmente para llamadas geográficamente distantes, API públicas y clientes móviles. También hay datos 0-RTT en TLS 1.3, pero su uso requiere precaución porque los datos 0-RTT pueden ser susceptibles de reproducción. En API transaccionales, financieras o de cambio de estado, 0-RTT debe evaluarse con extrema precaución y, por lo general, evitarse para operaciones no idempotentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificados digitales X.509",
    "id": "certificados-digitales-x-509"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-05-certificate-chain.svg",
    "alt": "Cadena de confianza formada por certificado raíz, intermedio y de servidor",
    "caption": "Figura 6.5 - Cadena de certificados y validación por parte del cliente."
  },
  {
    "kind": "paragraph",
    "text": "Un certificado digital X.509 asocia una identidad a una clave pública. En el contexto de HTTPS, permite al servidor presentar pruebas verificables al cliente de que está autorizado a hacerse pasar por un nombre DNS determinado. El certificado contiene campos como asunto, emisor, validez, clave pública, extensiones, usos de clave y nombres alternativos. Hoy en día, para comprobar los nombres de host, el campo Nombre alternativo del sujeto es el punto central."
  },
  {
    "kind": "paragraph",
    "text": "La clave privada correspondiente al certificado deberá permanecer bajo el control exclusivo de la entidad que presenta el certificado. Cuando un gateway presenta un certificado a api.empresa.com, necesita tener acceso a la clave privada correspondiente. Si se filtra esta clave, un atacante puede hacerse pasar por el servidor mientras los clientes aceptan el certificado. Por lo tanto, la protección de claves privadas, HSM, bóvedas, permisos y rotación son temas operativos tan importantes como el propio archivo de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados son válidos por un período de tiempo. Los clientes correctos deben rechazar un certificado caducado porque la confianza que se le había asignado ha finalizado. Los certificados también pueden tener usos restringidos. Extensiones como Uso de clave y Uso de clave extendido indican si una clave se puede utilizar para la autenticación del servidor, la autenticación del cliente, la firma u otros fines. Ignorar estos campos puede permitir un uso indebido de los certificados."
  },
  {
    "kind": "paragraph",
    "text": "En las API corporativas, es común tratar con certificados públicos emitidos por CA públicas, certificados internos emitidos por PKI corporativa y certificados de socios. Cada tipo requiere una gobernanza diferente. Los certificados públicos son más adecuados para puntos finales expuestos a Internet. Los certificados internos pueden proteger el tráfico entre centros de datos, redes virtuales y backends. Los certificados de socios son comunes en las integraciones mTLS y B2B."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cadena de confianza y validación",
    "id": "cadena-de-confianza-y-validacion"
  },
  {
    "kind": "paragraph",
    "text": "Validar un certificado no significa sólo comprobar si existe. El cliente necesita construir una cadena de certificación hasta una autoridad raíz confiable presente en su truststore. Normalmente, el servidor envía el certificado final y uno o más certificados intermedios. Por lo general, no es necesario enviar la raíz, ya que ya debería estar en el repositorio de confianza del cliente. Si falta un intermediario, es incorrecto o ha caducado, la validación puede fallar."
  },
  {
    "kind": "paragraph",
    "text": "La validación también requiere verificar el nombre. Si el cliente accede a https://api.empresa.com, el certificado debe contener este nombre en sus Nombres Alternativos del Sujeto o estar cubierto por una regla válida, como un comodín apropiado. Un certificado emitido para portal.empresa.com no autentifica a api.empresa.com. Este error es común en entornos con múltiples dominios, migraciones y dominios personalizados en plataformas API Management."
  },
  {
    "kind": "paragraph",
    "text": "Otro aspecto es la validez temporal. El reloj del cliente y del servidor debe ser correcto. Los sistemas con NTP roto pueden rechazar certificados válidos o aceptar estados inconsistentes. En contenedores, máquinas virtuales, dispositivos y entornos locales, sincronización horaria y requisitos silenciosos para TLS, Kerberos, OAuth, registros y auditoría."
  },
  {
    "kind": "paragraph",
    "text": "La validación de la revocación es más compleja. Las CRL y OCSP le permiten comprobar si un certificado ha sido revocado antes de que finalice su validez. En la práctica, las políticas varían: algunos clientes realizan comprobaciones estrictas, otros aceptan fallas temporales de OCSP y algunas gateways dependen de listas configuradas. Para entornos regulados, la decisión entre falla de apertura y falla de cierre debe ser explícita, ya que afecta la disponibilidad y la seguridad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Extensiones SNI, ALPN y TLS",
    "id": "extensiones-sni-alpn-y-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-06-sni-alpn.svg",
    "alt": "SNI y ALPN en ClientHello para selección de certificados y protocolos",
    "caption": "Figura 6.6 - SNI y ALPN en ClientHello."
  },
  {
    "kind": "paragraph",
    "text": "SNI, Indicación de nombre de servidor, es una extensión TLS que permite al cliente ingresar el nombre del servidor al que desea acceder en ClientHello. Esto es necesario porque muchos dominios pueden compartir la misma IP y el mismo puerto 443. Sin SNI, el servidor tendría dificultades para elegir qué certificado presentar antes de conocer el host HTTP, ya que el host HTTP solo aparece dentro de la comunicación protegida después del handshake."
  },
  {
    "kind": "paragraph",
    "text": "En gateways y equilibradores, SNI se utiliza para la selección de certificados, el enrutamiento y la coexistencia de múltiples dominios. Un error de SNI puede hacer que el servidor presente el certificado incorrecto, lo que provocará un error en la validación del nombre de host. También puede hacer que un equilibrador envíe la conexión al grupo incorrecto. Cuando la prueba con IP funciona, pero con el nombre de host falla, o cuando curl necesita --resolver para simular DNS, SNI debería ingresar al análisis."
  },
  {
    "kind": "paragraph",
    "text": "ALPN, negociación de protocolo de capa de aplicación, permite al cliente y al servidor negociar qué protocolo de aplicación se utilizará dentro de TLS, como http/1.1 o h2. Esto era esencial para HTTP/2 sobre TLS. Sin ALPN, el cliente podría establecer un canal seguro, pero no habría un acuerdo claro sobre cómo interpretar los bytes de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Las extensiones TLS son el mecanismo mediante el cual el protocolo evoluciona sin romper la compatibilidad básica. Las versiones admitidas, los algoritmos de firma, los grupos admitidos, el recurso compartido de claves, SNI, ALPN y otras extensiones contienen información importante. En problemas del mundo real, los middleboxes antiguos pueden interferir con extensiones desconocidas, creando fallas que parecen \"misteriosas\". Por lo tanto, los diagnósticos de openssl, los registros de gateway y las capturas de red son valiosos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Protocolo de registro TLS y datos de aplicación",
    "id": "protocolo-de-registro-tls-y-datos-de-aplicacion"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-07-record-protocol.svg",
    "alt": "Protección de un mensaje HTTP mediante fragmentación en registros y cifrado AEAD",
    "caption": "Figura 6.7 - Protección de datos mediante protocolo de registro TLS."
  },
  {
    "kind": "paragraph",
    "text": "Una vez finalizado el handshake, TLS comienza a proteger los datos de la aplicación a través del protocolo de registro. HTTP no se envía como texto claro a través de la red; se fragmenta en registros, se protege mediante claves de sesión y se transmite a través de TCP. Para un observador externo, los métodos, los encabezados y el cuerpo son inaccesibles, aunque algunos metadatos, como IP, puertos y tamaño aproximado del tráfico, aún pueden ser observables."
  },
  {
    "kind": "paragraph",
    "text": "El protocolo de registro separa el acuerdo criptográfico del transporte de datos. Esto permite que la aplicación escriba bytes en el canal seguro sin preocuparse por cada detalle de cifrado. Sin embargo, también crea límites importantes para la troubleshooting. Una herramienta que captura paquetes sin claves no puede ver HTTP dentro de TLS. Para inspeccionar el contenido, es necesario finalizar TLS en un punto autorizado, utilizar registros de aplicaciones o configurar entornos de prueba con claves exportables de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "En API Gateways, esta capa es el punto en el que el tráfico deja de ser opaco. Si el gateway finaliza TLS, ahora ve HTTP y puede aplicar políticas, validar JWT, transformar cargas útiles, enmascarar campos y registrar registros. Si el gateway solo reenvía TLS mediante transferencia, no ve el contenido HTTP y sus capacidades de política se limitan a información de capa 4 o SNI."
  },
  {
    "kind": "paragraph",
    "text": "Esta diferencia impacta la arquitectura. Una empresa que desee aplicar limitación de velocidad por ruta, validar alcances de OAuth, transformar JSON, bloquear campos confidenciales o registrar auditorías de URI debe finalizar TLS antes o dentro del componente que realiza estas funciones. Por otro lado, se puede elegir el paso a través cuando la política requiere que el gateway no tenga acceso al contenido, o cuando mTLS debe ocurrir directamente entre el cliente y el backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modos TLS en API Gateways",
    "id": "modos-tls-en-api-gateways"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-08-gateway-tls-modes.svg",
    "alt": "Terminación TLS, nuevo cifrado y transferencia en gateways y equilibradores",
    "caption": "Figura 6.8: Modos TLS comunes en gateways y equilibradores."
  },
  {
    "kind": "paragraph",
    "text": "El modo más común en plataformas de terminación API y TLS. En este modelo, el cliente establece TLS con el gateway o balanceador. El componente finaliza la sesión, descifra el tráfico y procesa HTTP. Desde allí, puede reenviar al backend a través de HTTP interno o mediante una nueva conexión HTTPS. Aunque simple, este modelo requiere reconocer que el gateway se convierte en un punto de alta confianza, ya que ve el contenido claramente en la memoria."
  },
  {
    "kind": "paragraph",
    "text": "El nuevo cifrado TLS crea dos sesiones TLS independientes: una desde el cliente al gateway y otra desdel gateway al backend. Este diseño es muy común en entornos corporativos porque permite que el gateway aplique políticas HTTP sin renunciar al cifrado en la parte interna. El certificado de interfaz autentical gateway ante el cliente; El certificado de backend autentica el backend en el gateway. Los almacenes de confianza y los almacenes de claves pueden ser diferentes en cada tramo."
  },
  {
    "kind": "paragraph",
    "text": "El paso TLS, a su vez, preserva la sesión TLS de un extremo a otro entre el cliente y el backend. Un equilibrador o gateway de Capa 4 puede reenviar bytes sin descifrarlos. Esto reduce la exposición del contenido en el intermediario, pero también reduce su capacidad para tomar decisiones basadas en HTTP. Puede haber enrutamiento a través de SNI, pero las políticas de autorización, la validación JSON y las transformaciones no son posibles sin terminar TLS."
  },
  {
    "kind": "paragraph",
    "text": "En algunos entornos, existen combinaciones híbridas. Un equilibrador externo finaliza TLS y vuelve a cifrar el gateway; el gateway finaliza nuevamente y se vuelve a cifrar para los servidores; o un WAF está antes del gateway. Cada terminación crea un nuevo límite de confianza y requiere decidir quién valida qué. Una arquitectura segura debe documentar estos límites, los certificados utilizados, los almacenes de confianza involucrados y qué registros existen en cada punto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "mTLS: descripción general introductoria",
    "id": "mtls-descripcion-general-introductoria"
  },
  {
    "kind": "paragraph",
    "text": "mTLS, o mTLS, es el uso de TLS con autenticación bidireccional. En HTTPS normal, el cliente valida el certificado del servidor. En mTLS, el servidor también solicita y valida un certificado del cliente. Esto le permite autenticar una aplicación, organización, dispositivo o socio a través de PKI. En API B2B, Open Finance, integraciones bancarias y sistemas de alta confianza, mTLS se utiliza a menudo como una capa sólida de autenticación de canal."
  },
  {
    "kind": "paragraph",
    "text": "Es importante separar mTLS de la autorización comercial. Un certificado de cliente puede demostrar que la llamada provino de una entidad técnica confiable, pero no necesariamente que esa entidad pueda realizar alguna operación. En arquitecturas maduras, mTLS autentica el canal técnico o el cliente, mientras que OAuth, JWT, los alcances, los consentimientos y las políticas definen la autorización de la aplicación. El error común es tratar el certificado como un permiso total."
  },
  {
    "kind": "paragraph",
    "text": "Desde un punto de vista operativo, mTLS requiere un modelo para emitir, distribuir, rotar y revocar certificados de clientes. El gateway debe confiar en la CA que emitió los certificados, validar la cadena y posiblemente verificar atributos como asunto, SAN, número de serie, huella digital, unidad organizativa o políticas específicas. En muchos productos, estos atributos se pueden copiar en el contexto de la política y usarse en decisiones de enrutamiento o autorización."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta mTLS únicamente como una aplicación de TLS. Un capítulo futuro debería profundizar en el tema con flujos completos, modelos de incorporación, relación con OAuth 2.0, certificados de transporte versus certificados de firma, problemas de propagación de identidad y riesgos de aceptar certificados sin una validación sólida."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTPS, HSTS y redirección",
    "id": "https-hsts-y-redireccion"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS asegura una conexión cuando se utiliza. Pero hay un problema inicial: si el usuario o sistema intenta acceder a HTTP por error, la primera llamada puede viajar sin protección antes de recibir una redirección a HTTPS. En los navegadores, HSTS, definido en RFC 6797, permite que un sitio web declare que solo se debe acceder a él a través de conexiones seguras durante un período de tiempo. El navegador ahora rechazará los intentos HTTP hacia ese host mientras la política esté vigente."
  },
  {
    "kind": "paragraph",
    "text": "En las API de servidor a servidor, HSTS suele tener menos impacto que en los navegadores, porque los clientes programáticos deben configurarse directamente con HTTPS. Aún así, las redirecciones de HTTP a HTTPS en las API merecen precaución. Muchos clientes no reenvían correctamente métodos, cuerpos o encabezados confidenciales después de la redirección. Para las API, lo ideal es publicar contratos en HTTPS y rechazar HTTP en lugar de depender de redirecciones para flujos transaccionales."
  },
  {
    "kind": "paragraph",
    "text": "HSTS también puede crear riesgos operativos si se configura incorrectamente con includeSubDomains y edades máximas largas en dominios amplios. Dado que los navegadores memorizan la política, una falla en el certificado en los subdominios puede hacer que los servicios sean inaccesibles para los usuarios afectados. El uso de la precarga aumenta aún más la responsabilidad al distribuir la política en listas integradas en los navegadores."
  },
  {
    "kind": "paragraph",
    "text": "Para API Gateways, la decisión práctica es garantizar que los puntos finales públicos solo acepten HTTPS, que los certificados sean correctos, que se eviten las redirecciones en flujos API sensibles y que las políticas de encabezado se apliquen de manera consistente cuando haya portales, documentación, consolas o interfaces web asociados con la plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cipher suites, versiones y línea base segura",
    "id": "cipher-suites-versiones-y-linea-base-segura"
  },
  {
    "kind": "paragraph",
    "text": "La configuración de TLS implica elegir versiones permitidas, algoritmos de intercambio de claves, firmas, grupos elípticos, cipher suites, parámetros de sesión y comportamiento de validación. Una línea de base segura debe reflejar las recomendaciones actuales, los requisitos reglamentarios, la compatibilidad del cliente y las capacidades del producto. Permitir que todo sea compatible es una decisión arriesgada; Bloquear cualquier cosa que no sea la más reciente puede dañar a los socios y a los sistemas heredados."
  },
  {
    "kind": "paragraph",
    "text": "RFC 9325 consolidó recomendaciones modernas para el uso seguro de TLS y DTLS. Ella desaconseja los protocolos antiguos y aconseja evitar las suites débiles. NIST SP 800-52 Rev. 2 también proporciona pautas para seleccionar y configurar TLS en contextos que siguen los algoritmos recomendados por NIST. Estas referencias son útiles para crear una política corporativa, pero la implementación concreta depende del producto: gateway, equilibrador de carga, WAF, servidor de aplicaciones, SDK de cliente y sistema operativo."
  },
  {
    "kind": "paragraph",
    "text": "Para las API corporativas, la definición de referencia debe documentarse por entorno. Por ejemplo: los puntos finales públicos aceptan TLS 1.2 y 1.3, con preferencia por TLS 1.3; TLS 1.2 está restringido a suites ECDHE con AEAD; los backends internos requieren validación de certificados; los certificados de producción utilizan claves y algoritmos aprobados; Los protocolos obsoletos están deshabilitados. Esta política debe probarse con herramientas automatizadas y monitorearse continuamente."
  },
  {
    "kind": "paragraph",
    "text": "Al mismo tiempo, una política TLS debe considerar el recorrido migratorio. Si un socio crítico todavía usa la biblioteca anterior, la organización debe decidir si crear una excepción temporal, aislar al socio en un punto final dedicado, aplicar compensaciones de riesgo o requerir una actualización. Mezclar excepciones en el punto final principal puede degradar la seguridad de todos. La segmentación por dominio, host, producto o gateway puede ayudar a controlar este riesgo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Sesión, reanudación y rendimiento",
    "id": "sesion-reanudacion-y-rendimiento"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-09-session-resumption.svg",
    "alt": "Reanudación de sesión TLS con ticket o PSK y handshake reducido",
    "caption": "Figura 6.9: Reanudación de la sesión TLS y costo operativo."
  },
  {
    "kind": "paragraph",
    "text": "El handshake TLS consume CPU y agrega latencia. En API de gran volumen, especialmente con conexiones cortas, esto puede ser significativo. Para reducir costos, TLS ofrece mecanismos de reanudación de sesión. En TLS 1.2, hay ID de sesión y tickets de sesión. En TLS 1.3, la reanudación utiliza PSK derivadas de apretones de manos anteriores. El objetivo es evitar repetir todo el coste criptográfico de una nueva conexión cuando las partes ya comparten material seguro."
  },
  {
    "kind": "paragraph",
    "text": "La reanudación mejora el rendimiento, pero tiene implicaciones operativas. En los clústeres de gateway, es posible que varias instancias necesiten compartir claves de ticket o mantener el estado de la sesión para que vuelva a funcionar después del equilibrio. Si cada instancia tiene material diferente, el currículum puede fallar y el cliente realizará un apretón de manos completo. Por lo general, esto no interrumpe la funcionalidad, pero aumenta la latencia y la CPU. Durante los picos de tráfico, este detalle puede convertirse en un cuello de botella."
  },
  {
    "kind": "paragraph",
    "text": "La agrupación de conexiones también reduce los costos. Un cliente que mantiene conexiones HTTPS persistentes evita apretones de manos repetidos. Las gateways a menudo mantienen grupos para los servidores y reutilizan las conexiones cuando es posible. El diseño de tiempos de espera, mantenimiento de conexión, tiempo de espera de inactividad, conexiones máximas y reintentos influye directamente en la cantidad de apretones de manos y la estabilidad del entorno."
  },
  {
    "kind": "paragraph",
    "text": "La búsqueda del rendimiento no puede comprometer la seguridad. Los tickets con una vida útil excesiva, el intercambio descuidado de claves entre instancias y 0-RTT en operaciones no idempotentes pueden presentar riesgos. La recomendación es tratar la reanudación como una optimización controlada: medir, configurar límites, monitorear métricas y validar el comportamiento en escenarios de conmutación por error y escalabilidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificados en plataformas corporativas",
    "id": "certificados-en-plataformas-corporativas"
  },
  {
    "kind": "paragraph",
    "text": "En una plataforma API, los certificados aparecen en varios lugares. En la interfaz, el gateway presenta un certificado a los clientes. En el backend, el gateway valida el certificado de los servidores internos. En mTLS, el gateway puede requerir certificados de cliente y también presentar su propio certificado al backend. Además, los portales, consolas, agentes, análisis e integraciones internas pueden tener certificados separados."
  },
  {
    "kind": "paragraph",
    "text": "El concepto de keystore y truststore ayuda a organizar. Un keystore contiene las identidades que presenta el componente, normalmente un certificado y una clave privada. Un truststore contiene CA o certificados de confianza que se utilizan para validar el otro extremo. Confundir ambos es una fuente frecuente de error. Importar el certificado de backend al keystore del gateway no hace que el gateway confíe en él; para confiar, debe estar en el truststore o tener su CA de confianza."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, los dominios personalizados pueden usar certificados asociados con el punto final expuesto, incluida la integración con Azure Key Vault en escenarios admitidos. Para los backends, la plataforma también necesita validar TLS y puede trabajar con certificados según las configuraciones y políticas. En las arquitecturas de gateway híbridas y autohospedadas, también entran en juego las redes privadas, los DNS privados y los almacenes de confianza locales."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, la gestión de certificados y claves también es fundamental para las interfaces HTTPS, los certificados de confianza, las conexiones salientes y las políticas. El profesional necesita saber dónde está el certificado presentado al cliente, en qué CA confían los backends y cómo las políticas extraen o validan los atributos del certificado cuando se utiliza mTLS. La diferencia entre error de configuración de interfaz, error de certificado confiable y error de política debe quedar clara."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observabilidad y troubleshooting de TLS",
    "id": "observabilidad-de-tls-y-troubleshooting"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-10-troubleshooting-tree.svg",
    "alt": "Árbol de troubleshooting para clasificar fallas HTTPS por capa",
    "caption": "Figura 6.10 - Árbol de troubleshooting para fallas HTTPS."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting de TLS debe seguir una secuencia en capas. Primero, confirme DNS, IP y puerto. Luego, verifique si la conexión TCP está establecida. Luego, pruebe el handshake TLS, la versión de observación, el cifrado, el certificado presentado, la cadena, SNI y ALPN. Sólo entonces tiene sentido analizar el estado de HTTP y las políticas de gateway. Saltarse pasos conduce a conclusiones erróneas, como investigar OAuth cuando el verdadero error es el certificado caducado."
  },
  {
    "kind": "paragraph",
    "text": "Herramientas como openssl s_client, curl -v, registros de gateway, registros del balanceador de carga, tcpdump y Wireshark ayudan a localizar la falla. Con openssl, es posible ingresar el nombre del servidor para probar SNI, mostrar cadenas, forzar versiones y observar cifrados. Con curl, es posible ver la negociación, el certificado y la respuesta HTTP. En entornos corporativos, el acceso a las capturas puede estar restringido, por lo que los registros de gateway estructurados y las métricas de handshake se vuelven aún más importantes."
  },
  {
    "kind": "paragraph",
    "text": "Los errores comunes incluyen certificado caducado, certificado autofirmado en cadena, imposibilidad de obtener el certificado del emisor local, falta de coincidencia del nombre de host, alerta de versión del protocolo, error en el handshake, CA desconocida, certificado incorrecto, restablecimiento de la conexión y tiempo de espera. Cada error apunta a una capa diferente. CA desconocida sugiere un truststore; la falta de coincidencia del nombre de host sugiere certificado o DNS/SNI; La falla del handshake puede indicar incompatibilidad de cifrado, versión o requisito de certificado del cliente."
  },
  {
    "kind": "paragraph",
    "text": "En las gateways, el diagnóstico debe distinguir el frontend y el backend. Es posible que un cliente no pueda conectarse al gateway debido a un problema con el certificado público. El gateway puede conectarse al cliente, ejecutar políticas y luego no llamar al backend debido a que falta un certificado confiable. Sin separar estas dos patas, el equipo puede cambiar el certificado incorrecto o cambiar una política que no esté involucrada en el problema."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ataques y riesgos históricos",
    "id": "ataques-y-riesgos-historicos"
  },
  {
    "kind": "paragraph",
    "text": "La historia de TLS incluye varios ataques y fallas de implementación que llevaron a cambios en el protocolo y las recomendaciones. Los ataques contra SSL y TLS heredados explotaron la degradación, los modos de bloqueo, la compresión, la renegociación, los cifrados débiles, los oráculos de relleno y los errores de biblioteca. Incluso cuando el protocolo es matemáticamente sólido, una mala configuración o una implementación vulnerable pueden romper la protección esperada."
  },
  {
    "kind": "paragraph",
    "text": "La degradación es un riesgo clásico: un atacante intenta obligar al cliente y al servidor a utilizar versiones o algoritmos más débiles. Los protocolos modernos incluyen protecciones, pero la base del servidor sigue siendo importante. Si los protocolos obsoletos permanecen habilitados, la superficie de ataque crece. Por lo tanto, el refuerzo de TLS normalmente comienza con la eliminación de SSL, TLS 1.0, TLS 1.1 y cifrados obsoletos."
  },
  {
    "kind": "paragraph",
    "text": "Los ataques de intermediario siguen siendo relevantes cuando los clientes desactivan la validación de certificados, aceptan cualquier certificado, ignoran el nombre de host o instalan CA inapropiadas. En el desarrollo, es común utilizar indicadores inseguros para \"hacer que funcione\". El problema surge cuando este patrón migra a producción o a bibliotecas compartidas. La validación correcta del certificado es una parte esencial de TLS, no un detalle opcional."
  },
  {
    "kind": "paragraph",
    "text": "En las API, otro riesgo es la exposición de los datos después de la terminación de TLS. Si el gateway termina TLS y envía HTTP puro al backend a través de una red amplia y mal controlada, se pierde parte de la protección. Si los registros registran encabezados de autorización, tokens o cargas útiles confidenciales, el cifrado en tránsito no evita las fugas debido a una observabilidad mal diseñada. La seguridad del transporte debe estar alineada con la seguridad de las aplicaciones y los datos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ciclo de vida del certificado",
    "id": "ciclo-de-vida-del-certificado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/es/figure-11-certificate-lifecycle.svg",
    "alt": "Ciclo operativo de certificados desde el inventario hasta la rotación.",
    "caption": "Figura 6.11 - Ciclo de vida operativo del certificado."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados tienen un ciclo de vida: solicitud, validación, emisión, instalación, seguimiento, renovación, rotación, revocación y enajenación. En entornos grandes, el desafío no es emitir manualmente un certificado, sino mantener cientos o miles de certificados correctos, actualizados y vinculados a los sistemas correctos. Los errores de renovación provocan incidentes graves porque pueden provocar la caída de puntos finales completos."
  },
  {
    "kind": "paragraph",
    "text": "Un buen proceso comienza con el inventario. La organización necesita saber qué certificados existen, dónde están instalados, qué dominios cubren, cuándo caducan, quién es el responsable, qué CA los emitió, qué clave privada corresponde y qué sistemas dependen de ellos. Sin inventario, la renovación se convierte en una respuesta a la crisis. Con el inventario es posible automatizar alertas, rotación y auditoría."
  },
  {
    "kind": "paragraph",
    "text": "ACME, definido en RFC 8555, popularizó la automatización de certificados para Web PKI. En entornos corporativos, la automatización puede involucrar Key Vaults, HSM, PKI interna, canalizaciones, administradores secretos e integraciones con gateways. El objetivo es reducir la intervención manual, estandarizar la validación y minimizar las ventanas de caducidad. Incluso cuando no se utiliza ACME, el principio operativo sigue siendo válido: los certificados necesitan automatización y gobernanza."
  },
  {
    "kind": "paragraph",
    "text": "La rotación requiere planificación para evitar perder clientes. En mTLS, por ejemplo, el intercambio de certificados de CA o de cliente puede requerir una anulación temporal de la confianza, una distribución temprana y ventanas de compatibilidad. En los servidores, el intercambio de certificados puede requerir la actualización de los almacenes de confianza del gateway. En dominios personalizados, cambiar los certificados puede requerir recargar los oyentes o validar que se presenta la cadena completa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicación en el mundo bancario y financiero",
    "id": "aplicacion-en-el-mundo-bancario-y-financiero"
  },
  {
    "kind": "paragraph",
    "text": "Las instituciones financieras utilizan TLS para proteger canales digitales, API internas, integraciones B2B, finanzas abiertas, pagos, autenticación y tráfico de seguridad entre dominios. La criticidad proviene de la combinación de datos confidenciales, riesgo regulatorio, impacto financiero y dependencia operativa. Una falla de TLS puede resultar en indisponibilidad, rechazo de socios, fallas de auditoría o exposición de información."
  },
  {
    "kind": "paragraph",
    "text": "En entornos bancarios, es común separar los certificados de transporte, los certificados de firma y las credenciales de aplicación. Un certificado TLS autentica el canal. Un certificado de firma puede firmar cargas útiles u objetos. Un token de OAuth puede representar consentimiento, alcance y autorización. La combinación de estos roles crea arquitecturas confusas. Cada artefacto debe tener su propio propósito, autoridad emisora, ciclo de vida y controles."
  },
  {
    "kind": "paragraph",
    "text": "Gateways como Axway y Azure API Management aparecen como puntos de cumplimiento. Pueden requerir TLS sólido en el frontend, validar certificados de cliente, validar JWT, aplicar limitaciones, enrutar por producto, enmascarar registros y llamar a backends a través de TLS interno. Sin embargo, la plataforma sólo es segura si se configura con cadenas correctas, políticas claras y suficiente observabilidad para la auditoría."
  },
  {
    "kind": "paragraph",
    "text": "Los profesionales que dominan TLS pueden hablar mejor con los equipos de redes, seguridad, infraestructura, desarrollo y arquitectura. Puede explicar por qué un certificado comodín puede aumentar el impacto de las filtraciones, por qué un truststore incorrecto provoca que solo falle una parte, por qué SNI es importante en los dominios personalizados, por qué la terminación de TLS cambia el límite de confianza y por qué mTLS no reemplaza la autorización comercial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Tablas de referencia técnica",
    "id": "tablas-de-referencia-tecnica"
  },
  {
    "kind": "paragraph",
    "text": "Las siguientes tablas condensan decisiones que aparecen con frecuencia en proyectos API. No reemplazan la lectura de las especificaciones, pero ayudan a organizar el razonamiento durante el diseño de la arquitectura y la troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Conceptos esenciales de TLS en las API.",
    "headers": [
      "Concepto",
      "¿Qué significa?",
      "Impacto práctico en las API"
    ],
    "rows": [
      [
        "HTTPS",
        "HTTP se ejecuta sobre TLS.",
        "Protege las llamadas API en tránsito, pero no reemplaza la autorización ni la validación del token."
      ],
      [
        "terminación TLS",
        "El intermediario finaliza la sesión TLS del cliente.",
        "Permite políticas, registros y transformaciones HTTP en el gateway."
      ],
      [
        "Volver a cifrar TLS",
        "El intermediario crea una segunda sesión TLS para el backend.",
        "Mantiene el tráfico interno cifrado y separa la confianza entre el frontend y el backend."
      ],
      [
        "Transferencia TLS",
        "El intermediario reenvía bytes sin descifrarlos.",
        "Conserva el cifrado de un extremo a otro, pero limita las políticas HTTP en el gateway."
      ],
      [
        "mTLS",
        "Certificados presentes de cliente y servidor.",
        "Autentica al cliente o socio técnico, pero no reemplaza la autorización de la aplicación."
      ],
      [
        "SNI",
        "Nombre del servidor ingresado en ClientHello.",
        "Le permite seleccionar un certificado y enrutar múltiples dominios en la misma IP."
      ],
      [
        "ALPN",
        "Negociación del protocolo de aplicación dentro de TLS.",
        "Le permite elegir HTTP/2 o HTTP/1.1 en el handshake."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Síntomas, causas probables e investigación de fallas de HTTPS.",
    "headers": [
      "Fallo observado",
      "Causa probable",
      "como investigar"
    ],
    "rows": [
      [
        "el certificado ha caducado",
        "Certificado caducado.",
        "Verificar certificado presentado por el endpoint, cadena y reloj de sistemas."
      ],
      [
        "el nombre de host no coincide",
        "El nombre accedido no aparece en la SAN del certificado.",
        "Verifique DNS, SNI, dominio personalizado y nombre alternativo del sujeto."
      ],
      [
        "no se puede obtener el certificado del emisor local",
        "Cadena incompleta o falta CA en el truststore.",
        "Verifique los intermediarios enviados y las CA confiables en el cliente/gateway."
      ],
      [
        "fracaso del apretón de manos",
        "Versión, cifrado, certificado de cliente o extensión incompatibles.",
        "Fuerce versiones/cifrados en la prueba y analice los registros TLS."
      ],
      [
        "desconocidoca",
        "El certificado presentado fue emitido por una CA no confiable.",
        "Importe la CA correcta al truststore adecuado o utilice una CA pública/validada."
      ],
      [
        "restablecimiento de la conexión durante el handshake",
        "Conexión intermedia cerrada, SNI incorrecto, política LB o requisito mTLS.",
        "Pruebe con SNI explícito y compare frontend/backend."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabla 3 — Decisiones y precauciones arquitectónicas.",
    "headers": [
      "Decisión arquitectónica",
      "cuando tiene sentido",
      "Riesgo o precaución"
    ],
    "rows": [
      [
        "Acepta TLS 1.2 y 1.3",
        "Compatibilidad con clientes y socios corporativos.",
        "Restrinja TLS 1.2 a suites sólidas y planifique la migración."
      ],
      [
        "Requiere TLS 1.3 únicamente",
        "Ecosistema controlado y clientes modernos.",
        "Puede arruinar bibliotecas antiguas y socios B2B."
      ],
      [
        "Usar certificado comodín",
        "Muchos subdominios bajo el mismo dominio.",
        "Las filtraciones clave afectan a varios servicios."
      ],
      [
        "Usar certificados por dominio",
        "Separación de riesgos y gobernanza granular.",
        "Mayor volumen de certificados para operar."
      ],
      [
        "Terminar TLS en el gateway",
        "Necesidad de políticas HTTP y observabilidad.",
        "Gateway ve el contenido descifrado y necesita estar altamente protegido."
      ],
      [
        "Paso al backend",
        "Requiere cifrado de extremo a extremo sin inspección intermedia.",
        "Menos control de API Management en el futuro."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejemplos prácticos de diagnóstico",
    "id": "ejemplos-practicos-de-diagnostico"
  },
  {
    "kind": "paragraph",
    "text": "Los ejemplos siguientes son ilustrativos. Deben adaptarse al entorno, ya que los nombres de host, los certificados, las rutas y las políticas varían. El objetivo es mostrar cómo separar capas durante la investigación."
  },
  {
    "kind": "subhead",
    "text": "Pruebe el certificado presentado con SNI"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -showcerts"
  },
  {
    "kind": "subhead",
    "text": "Fork TLS 1.2 para comparar compatibilidad"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_2"
  },
  {
    "kind": "subhead",
    "text": "Forzar TLS 1.3 para validar el soporte"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_3"
  },
  {
    "kind": "subhead",
    "text": "Ver detalles de la llamada HTTP y la negociación TLS con curl"
  },
  {
    "kind": "code",
    "text": "curl -v https://api.exemplo.com/clientes"
  },
  {
    "kind": "subhead",
    "text": "Pruebe un host con una IP específica mientras conserva SNI/Host"
  },
  {
    "kind": "code",
    "text": "curl -v --resolve api.exemplo.com:443:203.0.113.10 https://api.exemplo.com/health"
  },
  {
    "kind": "subhead",
    "text": "Verifique las fechas de un certificado guardado en el archivo"
  },
  {
    "kind": "code",
    "text": "openssl x509 -in certificado.pem -noout -subject -issuer -dates -ext subjectAltName"
  },
  {
    "kind": "paragraph",
    "text": "En las gateways, una prueba externa exitosa no prueba que el backend sea correcto. Solo prueba que el cliente pudo negociar TLS con el punto final externo y recibir alguna respuesta. Para validar el tramo interno es necesario realizar la prueba desde el propio gateway o desde un origen con la misma ruta, DNS, truststore y política de salida. Esta separación es esencial en entornos con redes virtuales, puntos finales privados, servidores proxy corporativos y firewalls salientes."
  },
  {
    "kind": "paragraph",
    "text": "Cuando mTLS está presente, la prueba también debe presentar un certificado y una clave de cliente. Se puede esperar un fracaso sin un certificado. Una falla de certificado puede indicar una CA no confiable, un certificado caducado, una EKU incorrecta, una cadena incompleta o una política que no reconoce el atributo esperado. Los registros del gateway deben indicar si el error ocurrió en el handshake o en la política después del handshake."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudios de caso",
    "id": "estudios-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: el dominio personalizado en API Management presenta un certificado incorrecto"
  },
  {
    "kind": "paragraph",
    "text": "Un equipo publica api.empresa.com en API Management con varios dominios personalizados. Algunos clientes reciben un error de no coincidencia de nombre de host. La primera sospecha recae en OAuth, porque la API también devuelve 401 en algunos escenarios. La investigación correcta con openssl s_client usando -servername muestra que para una ruta de red determinada, el punto final presenta el certificado portal.empresa.com."
  },
  {
    "kind": "paragraph",
    "text": "La causa probable es una configuración incorrecta de SNI, dominio personalizado o equilibrador antes de APIM. La corrección no está en el JWT ni en la política de autorización. Está en la asociación entre el nombre de host, el certificado y el oyente. Este caso muestra por qué separar TLS de HTTP evita perder tiempo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: el gateway llama al backend HTTPS y falla con una CA desconocida"
  },
  {
    "kind": "paragraph",
    "text": "El cliente externo puede conectarse al gateway y autenticarse normalmente. Sin embargo, la política de gateway no puede llamar al backend con un error de certificado. El equipo cambia el certificado del frontend, pero el problema continúa. La verdadera falla está en el tramo del gateway-backend, no en el tramo del gateway del cliente."
  },
  {
    "kind": "paragraph",
    "text": "La solución es importar la CA o cadena de backend correcta al truststore utilizado por la conexión saliente del gateway, o modificar el certificado de backend para usar una CA confiable. También es necesario verificar que el nombre utilizado en la URL interna coincida con la SAN del certificado backend."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: El socio heredado no admite la línea de base moderna"
  },
  {
    "kind": "paragraph",
    "text": "Una organización deshabilita TLS 1.0 y TLS 1.1 y restringe TLS 1.2 a suites modernas. Un antiguo socio ya no puede llamar a la API. Técnicamente el cambio es correcto, pero operativamente necesita un plan de migración, comunicación y una ventana de excepción controlada."
  },
  {
    "kind": "paragraph",
    "text": "Un enfoque maduro es aislar excepciones temporales en puntos finales dedicados, con monitoreo, fecha límite, compensación de riesgos y propietario responsable. Reabrir cifrados débiles en el punto final principal para todos los clientes aumenta el riesgo general de la plataforma."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4: El certificado expira en un entorno interno"
  },
  {
    "kind": "paragraph",
    "text": "Un backend interno protegido por TLS caduca durante el fin de semana. El gateway ahora devuelve 502 o 500 a clientes externos, aunque el certificado público del gateway es válido. El incidente se produce porque el inventario de certificados internos no estaba integrado con el seguimiento corporativo."
  },
  {
    "kind": "paragraph",
    "text": "La lección es que los certificados internos deben recibir el mismo rigor operativo que los certificados públicos. El monitoreo de vencimientos, los asignados, la rotación temprana y las alertas en los canales correctos reducen los incidentes evitables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios sugeridos",
    "id": "laboratorios-sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "Los laboratorios deben funcionar en un entorno de estudio, sin utilizar certificados ni claves de producción. El objetivo es observar el comportamiento de TLS en condiciones controladas."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Sube un servidor HTTPS local con un certificado autofirmado y observa cómo curl y el navegador rechazan la cadena por falta de confianza.",
      "Cree una CA local, emita un certificado para api.local, agregue la CA al truststore del cliente y compare el resultado.",
      "Pruebe el mismo punto final con y sin SNI usando openssl s_client y observe el certificado devuelto.",
      "Configure un proxy inverso que finalice TLS y reenvíe HTTP a un servidor local. Luego cambie a volver a cifrar y compare los registros.",
      "Fuerce diferentes cifrados o versiones de TLS en el cliente y el servidor para provocar una falla controlada en el handshake.",
      "Simule la caducidad del certificado en un entorno local y observe los mensajes de error en el cliente, el proxy y la aplicación.",
      "Configure mTLS en el laboratorio y pruebe tres escenarios: sin un certificado de cliente, con un certificado emitido por una CA no confiable y con un certificado válido."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitectura TLS para APIs",
    "id": "checklist-de-arquitectura-tls-para-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Todos los puntos finales públicos utilizan HTTPS y no dependen de HTTP con redirección para las operaciones de API.",
      "TLS 1.0, TLS 1.1, SSLv2 y SSLv3 están deshabilitados.",
      "TLS 1.2, cuando se acepta, está restringido a suites fuertes con secreto directo y AEAD.",
      "TLS 1.3 está habilitado cuando lo admiten los clientes y la plataforma.",
      "Los certificados tienen SAN correcto, cadena completa y validez monitorizada.",
      "Las claves privadas están protegidas, con acceso restringido y, en su caso, HSM o Key Vault.",
      "Los almacenes de confianza de frontend, backend y mTLS se documentan por separado.",
      "SNI y ALPN se prueban en puntos finales que alojan múltiples dominios o admiten HTTP/2.",
      "La arquitectura documenta dónde termina TLS y dónde el tráfico deja de estar cifrado.",
      "Los registros no registran tokens, secretos, claves privadas ni cargas útiles confidenciales sin enmascaramiento.",
      "La renovación y rotación de certificados cuentan con proceso, responsable y alertas de vencimiento.",
      "Las excepciones para clientes heredados son temporales, aisladas y aprobadas según el riesgo."
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
    "text": "HTTPS es la combinación de HTTP y TLS. HTTP define la semántica de la API; TLS asegura el canal. Esta separación permite diagnosticar correctamente si ocurrió una falla antes de HTTP, durante el handshake, en la validación del certificado, en la política de gateway o en el backend."
  },
  {
    "kind": "paragraph",
    "text": "TLS ofrece confidencialidad, integridad y autenticación. Con configuraciones modernas, también proporciona secreto directo. Estas garantías dependen de las versiones, cipher suites, certificados, almacenes de confianza, validación del nombre de host y protección de clave privada."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 simplifica y fortalece el protocolo en comparación con TLS 1.2, pero TLS 1.2 aún existe por compatibilidad. El papel del arquitecto es definir líneas de base seguras, gestionar excepciones y planificar la evolución."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados X.509 y las cadenas de confianza son fundamentales. El cliente debe validar la CA, los intermediarios, la validez, el nombre de host, el uso de claves y, según la política, la revocación. En API Gateways, existen diferentes certificados para clientes frontend, backend y mTLS."
  },
  {
    "kind": "paragraph",
    "text": "El funcionamiento de TLS es tan importante como la teoría. El inventario, el monitoreo, la rotación, la automatización y la troubleshooting por capas previenen incidentes y reducen el tiempo de resolución."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario",
    "id": "glosario"
  },
  {
    "kind": "table",
    "caption": "Tabla 4 — Glosario de capítulos.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "TLS",
        "Protocolo de seguridad de transporte utilizado para proteger aplicaciones como HTTP."
      ],
      [
        "HTTPS",
        "HTTP se ejecuta sobre TLS."
      ],
      [
        "Certificado X.509",
        "Documento digital que asocia la identidad a la clave pública y está firmado por una CA."
      ],
      [
        "CA",
        "Autoridad de Certificación, entidad que emite certificados y participa en la cadena de confianza."
      ],
      [
        "truststore",
        "Repositorio de CA/certificados confiables utilizados para validar el otro extremo."
      ],
      [
        "Almacén de claves",
        "Repositorio de identidades locales, normalmente certificados y claves privadas."
      ],
      [
        "SNI",
        "Extensión TLS que informa el nombre del servidor en ClientHello."
      ],
      [
        "ALPN",
        "Extensión TLS para negociar el protocolo de aplicación, como HTTP/2."
      ],
      [
        "cipher suite",
        "Conjunto de algoritmos utilizados por la sesión TLS, especialmente en TLS 1.2."
      ],
      [
        "forward secrecy",
        "La propiedad que pasa por el tráfico permanece protegida incluso si se filtra una futura clave privada."
      ],
      [
        "OCSP",
        "Protocolo para comprobar el estado de revocación de certificados."
      ],
      [
        "HSTS",
        "Mecanismo HTTP para indicar a los navegadores que solo utilicen conexiones seguras con un host."
      ],
      [
        "mTLS",
        "TLS con autenticación mutua mediante certificados."
      ]
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
    "ordered": true,
    "items": [
      "Explique por qué HTTPS no reemplaza a OAuth 2.0, JWT o la autorización de alcance.",
      "Describa la ruta de una llamada HTTPS a un backend cuando el gateway utiliza el recifrado TLS.",
      "Diferenciar keystore y truststore utilizando un ejemplo de cliente, gateway y backend.",
      "Explique el papel de SNI en un entorno con varios dominios personalizados en la misma IP.",
      "Explique cómo ALPN influye en HTTP/2 sobre TLS.",
      "Compare TLS 1.2 y TLS 1.3 desde una perspectiva de seguridad y latencia.",
      "¿Por qué 0-RTT en TLS 1.3 puede ser peligroso para las operaciones transaccionales?",
      "Un cliente recibe un nombre de host que no coincide. Enumere al menos cinco causas posibles.",
      "El gateway devuelve un error al llamar al servidor HTTPS, pero los clientes se conectan al gateway normalmente. ¿Qué pierna se debe investigar?",
      "Explique por qué los certificados internos también necesitan supervisión de caducidad.",
      "Cree una política de referencia TLS para una API pública que necesite admitir clientes empresariales heredados.",
      "Explique cuándo puede ser apropiado el paso TLS y qué capacidades de gateway se pierden."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Preguntas de ensayo para repaso",
    "id": "preguntas-de-ensayo-para-repaso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Imagine que una institución financiera tiene API públicas, API internas y API de socios. Proponer una estrategia de certificación que separe frontend, backend y mTLS. Indique qué almacenes de confianza serían necesarios y qué riesgos monitorearía.",
      "Debe deshabilitar TLS 1.0 y TLS 1.1 en un gateway utilizada por socios heredados. Describa el plan técnico y operativo para reducir el riesgo sin causar tiempos de inactividad inesperados.",
      "Explique cómo investigaría una falla TLS intermitente que solo ocurre cuando el tráfico pasa por un determinado equilibrador. ¿Qué evidencia recolectarías?",
      "Un equipo afirma que no necesitan TLS interno porque la red es privada. Presentar argumentos técnicos a favor y en contra de esta decisión, considerando costo, riesgo y observabilidad."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: Transparencia de Certificados y emisión indebida",
    "id": "profundizacion-transparencia-de-certificados-y-emision-indebida"
  },
  {
    "kind": "paragraph",
    "text": "La Transparencia de Certificados (CT) surgió para reducir el riesgo de certificados emitidos incorrectamente por las autoridades certificadoras. La idea es registrar públicamente los certificados emitidos en registros auditables, lo que permitirá a los propietarios de dominios, navegadores e investigadores detectar certificados sospechosos. CT no reemplaza la validación de cadenas normal; agrega una capa de transparencia al ecosistema Web PKI."
  },
  {
    "kind": "paragraph",
    "text": "Para las arquitecturas empresariales, CT es más relevante en los certificados públicos utilizados por los puntos finales expuestos a Internet. Si una CA pública emite incorrectamente un certificado para el dominio de una empresa, la existencia de ese certificado puede aparecer en los registros de CT. La supervisión de estos registros ayuda a detectar el uso indebido del dominio, errores de emisión o intentos de suplantación de identidad."
  },
  {
    "kind": "paragraph",
    "text": "En los certificados internos emitidos por PKI privada, normalmente no se aplica del mismo modo CT, ya que estos certificados no forman parte de la PKI Web pública. En este caso, controles equivalentes dependen del inventario interno, auditoría de CA, pistas de aprobación, separación de funciones y seguimiento de los certificados emitidos por la propia organización."
  },
  {
    "kind": "paragraph",
    "text": "En las plataformas API, la CT debe verse como parte de la gobernanza del dominio. El equipo responsable de las API necesita saber qué dominios públicos existen, qué certificados se emitieron para ellos, quién aprobó la emisión, dónde están instalados y cuándo caducan. Sin esta visión, un certificado técnico puede convertirse en un riesgo de marca, fraude o indisponibilidad."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 — Transparencia de certificados y controles de emisión.",
    "headers": [
      "controlar",
      "Objetivo",
      "Aplicación en API"
    ],
    "rows": [
      [
        "monitorización por TC",
        "Detectar certificados públicos inesperados.",
        "Alertar problema sospechoso para api.empresa.com o subdominios."
      ],
      [
        "Inventario de dominio",
        "Sepa qué nombres de host existen y quién los posee.",
        "Evite dominios personalizados sin un responsable claro."
      ],
      [
        "Aprobación de emisión",
        "Controlar quién puede solicitar certificados.",
        "Reducir el riesgo de emisiones fuera del proceso corporativo."
      ],
      [
        "Auditoría Interna de CA",
        "Gobierna los certificados privados.",
        "Certificados de control utilizados en backends y mTLS."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: certificate pinning",
    "id": "profundizacion-certificate-pinning"
  },
  {
    "kind": "paragraph",
    "text": "La certificate pinning es la práctica de restringir a un cliente a aceptar solo un certificado específico, una clave pública específica o un conjunto limitado de emisores, en lugar de confiar en general en el truststore del sistema. La motivación es reducir el impacto de las CA comprometidas o de los certificados emitidos incorrectamente. Sin embargo, la fijación aumenta el riesgo operativo, ya que un intercambio de certificados legítimo puede perjudicar a los clientes si la contraseña no se actualiza correctamente."
  },
  {
    "kind": "paragraph",
    "text": "En aplicaciones móviles, la fijación ya se ha utilizado para dificultar la interceptación por parte de servidores proxy locales o CA instaladas en el dispositivo. En las integraciones B2B, algunas organizaciones realizan una forma de fijación utilizando la huella digital del certificado del socio. Este modelo puede ser sencillo de implementar, pero tiende a generar incidentes de renovación. Cuando el certificado caduca y se reemplaza, la huella digital cambia y las llamadas fallan."
  },
  {
    "kind": "paragraph",
    "text": "Una alternativa más flexible es confiar en una CA controlada o en un conjunto de CA intermedias, en lugar de fijar el certificado final. Otro enfoque es la fijación de clave pública, que le permite renovar el certificado conservando la misma clave, aunque reutilizar claves durante períodos prolongados también tiene desventajas. En general, la fijación debe ser una decisión consciente, documentada y acompañada de un plan de rotación."
  },
  {
    "kind": "paragraph",
    "text": "En el contexto de API Gateways, la fijación puede aparecer en clientes que llaman al gateway, en backends llamados por el gateway o en políticas que comparan certificados. La recomendación práctica es evitar dependencias rígidas en el certificado predeterminado de las plataformas administradas y utilizar dominios/certificados personalizados bajo el control de la organización cuando los clientes externos dependen en gran medida de la identidad TLS."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: Estrategias de certificate pinning.",
    "headers": [
      "Estrategia",
      "ventaja",
      "Precaución"
    ],
    "rows": [
      [
        "Pin por certificado final",
        "Control muy específico.",
        "Rompe con cualquier renovación que cambie el certificado."
      ],
      [
        "Pin por clave pública",
        "Le permite renovar un certificado con la misma clave.",
        "La reutilización prolongada de claves reduce la higiene criptográfica."
      ],
      [
        "Pin de CA/intermediario",
        "Más flexibilidad para renovaciones.",
        "Confía en todos los certificados válidos de esa autoridad."
      ],
      [
        "almacén fiduciario corporativo",
        "Modelo escalable y gobernable.",
        "Requiere una sólida gobernanza interna de PKI."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: Java, truststore y errores comunes en clientes corporativos",
    "id": "profundizacion-java-truststore-y-errores-comunes-en-clientes-corporativos"
  },
  {
    "kind": "paragraph",
    "text": "Muchos sistemas empresariales que consumen API se ejecutan en Java. En estos entornos, la validación de TLS depende del truststore utilizado por la JVM o la aplicación. Se produce un error común cuando el certificado funciona en el navegador, pero falla en la aplicación Java. Esto puede suceder porque el navegador utiliza el truststore del sistema operativo, mientras que la JVM utiliza otro conjunto de CA."
  },
  {
    "kind": "paragraph",
    "text": "El error de creación de ruta PKIX generalmente indica que la JVM no pudo construir una cadena de confianza para una CA conocida. La solución no debería ser deshabilitar la validación TLS. La ruta correcta es importar la CA correcta al truststore apropiado, corregir la cadena enviada por el servidor o utilizar un certificado emitido por una CA que ya sea de confianza para la JVM. En producción, aceptar todos los certificados es una vulnerabilidad grave."
  },
  {
    "kind": "paragraph",
    "text": "También es común tener un problema con el nombre de host. Incluso si la CA es confiable, el certificado debe coincidir con el nombre utilizado en la URL. Si la aplicación llama a https://10.0.0.5 pero el certificado fue emitido a api.interno.empresa, la validación debería fallar. La solución es solicitar el nombre de host correcto, ajustar DNS o emitir un certificado con una SAN adecuada, no ignorar el verificador de nombre de host."
  },
  {
    "kind": "paragraph",
    "text": "En gateways que llaman a backends de Java o clientes Java que llaman a gateways, comprender estos detalles reduce los incidentes. El equipo puede explicar por qué la importación de un certificado en un servidor no afecta a otro, por qué los contenedores pueden tener almacenes de confianza diferentes a los de la máquina host y por qué las actualizaciones de JDK pueden cambiar las CA confiables."
  },
  {
    "kind": "subhead",
    "text": "Listar las CA en un truststore de Java"
  },
  {
    "kind": "code",
    "text": "keytool -list -keystore cacerts -storepass changeit"
  },
  {
    "kind": "subhead",
    "text": "Importar una CA corporativa a un truststore de laboratorio"
  },
  {
    "kind": "code",
    "text": "keytool -importcert -file ca-corporativa.pem -alias ca-corporativa -keystore truststore.jks"
  },
  {
    "kind": "subhead",
    "text": "Pruebe el handshake de Java con registros detallados"
  },
  {
    "kind": "code",
    "text": "java -Djavax.net.debug=ssl,handshake -jar cliente.jar"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: TLS en Kubernetes, Ingress y Service Mesh",
    "id": "profundizacion-tls-en-kubernetes-ingress-y-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "En Kubernetes, TLS puede terminar en varios puntos: en el equilibrador de carga externo, en el controlador de ingreso, en el sidecar de la malla de servicio, en el propio módulo o en una combinación de estos puntos. Cada terminación cambia el límite de confianza y cambia dónde se pueden aplicar las políticas. Si Ingress finaliza TLS, ve HTTP. Si la malla realiza mTLS entre sidecars, la aplicación puede recibir tráfico local sin tratar directamente con los certificados."
  },
  {
    "kind": "paragraph",
    "text": "Los controladores de ingreso como NGINX, Envoy y otros generalmente seleccionan certificados mediante SNI y los reenvían a servicios internos. Los certificados pueden ser gestionados por secretos de Kubernetes, operadores o integraciones con gestores externos. El desafío operativo es garantizar que los secretos estén protegidos, renovados, replicados correctamente y asociados con el host correcto."
  },
  {
    "kind": "paragraph",
    "text": "Service Mesh agrega mTLS interno entre cargas de trabajo, a menudo con emisión automática de certificados cortos. Este modelo ayuda con Zero Trust interno, pero no elimina la necesidad de TLS en el borde. También introduce una CA de malla, políticas de identidad de cargas de trabajo y observabilidad patentada. Los arquitectos deben mapear la diferencia entre la identidad externa de la API y la identidad interna de las cargas de trabajo."
  },
  {
    "kind": "paragraph",
    "text": "Cuando un gateway API está antes del clúster, la arquitectura puede tener TLS externo en el gateway, recifrado para Ingress y mTLS dentro de la malla. Esto es poderoso, pero complejo. La documentación de flujo, los nombres DNS, los certificados y los puntos finales se vuelven obligatorios para la troubleshooting y la auditoría."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: Puntos finales TLS en Kubernetes y plataformas empresariales.",
    "headers": [
      "punto de terminación",
      "¿Qué ves?",
      "Uso común"
    ],
    "rows": [
      [
        "Balanceador de carga externo",
        "Solo puedes ver TLS o finalizar y ver HTTP.",
        "Exposición pública y distribución regional."
      ],
      [
        "Controlador de ingreso",
        "Normalmente veo HTTP después de finalizar TLS.",
        "Enrutamiento por host/ruta dentro del clúster."
      ],
      [
        "API Gateway",
        "Consulte el contexto HTTP y API cuando finalice TLS.",
        "Políticas, seguridad, análisis y monetización."
      ],
      [
        "Sidecar de malla de servicio",
        "Protege el tráfico de este a oeste entre cargas de trabajo.",
        "mTLS interno e identidad de servicio."
      ],
      [
        "Solicitud",
        "Control total dentro del código.",
        "Escenarios específicos, pero aumenta la responsabilidad del equipo de desarrollo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: TLS, proxies empresariales e inspección",
    "id": "profundizacion-tls-proxies-empresariales-e-inspeccion"
  },
  {
    "kind": "paragraph",
    "text": "Los apoderados corporativos pueden operar de diferentes maneras. Un proxy simple puede simplemente reenviar conexiones HTTPS usando CONNECT, sin inspeccionar el contenido. Un proxy con inspección TLS actúa como una autoridad intermedia: finaliza TLS con el cliente, crea otra conexión TLS con el destino y presenta al cliente un certificado generado dinámicamente por una CA corporativa instalada en el dispositivo. Este modelo permite la inspección, pero cambia por completo la cadena de confianza percibida por el cliente."
  },
  {
    "kind": "paragraph",
    "text": "Para los navegadores administrados por la empresa, esto puede ser aceptable según la política. Para las API B2B, los clientes externos y mTLS, la inspección puede interrumpir el flujo. Un cliente de fijación puede rechazar el certificado generado por el proxy. Un flujo mTLS puede fallar porque el proxy no tiene el certificado de cliente o no puede pasar la autenticación de forma equivalente. Las aplicaciones pueden fallar si la CA corporativa no se encuentra en el truststore correcto."
  },
  {
    "kind": "paragraph",
    "text": "La presencia de un proxy también afecta la troubleshooting. Es posible que el certificado visto por el cliente no sea el certificado de gateway real. La IP de origen puede cambiar. El handshake con el destino lo puede realizar el proxy, no el cliente original. En caso de incidentes, es necesario identificar si hay inspección TLS en el camino y comparar pruebas desde dentro y fuera de la red corporativa."
  },
  {
    "kind": "paragraph",
    "text": "Para las API confidenciales, muchas organizaciones definen listas de exclusión de inspecciones o canales dedicados. La decisión implica seguridad defensiva, privacidad, cumplimiento, estabilidad y fuertes requisitos de autenticación. El punto técnico es que TLS deja de ser de extremo a extremo cuando hay una inspección intermedia, incluso si cada sección todavía usa TLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: mTLS y propagación de identidad",
    "id": "profundizacion-mtls-y-propagacion-de-identidad"
  },
  {
    "kind": "paragraph",
    "text": "Cuando el gateway autentica a un cliente a través de mTLS, surge una pregunta: ¿cómo llega esta identidad al backend? Una opción es que el gateway tome la decisión localmente y reenvíe sólo una solicitud ya autorizada. Otra opción es propagar los atributos del certificado en encabezados internos. Un tercero es emitir o intercambiar un token que represente la identidad verificada. Cada elección tiene riesgos."
  },
  {
    "kind": "paragraph",
    "text": "La propagación de certificados o atributos por encabezado requiere asegurar firmemente el tramo entre el gateway y el backend. El backend debe confiar en que solo el gateway puede insertar esos encabezados. De lo contrario, un cliente podría falsificar X-Client-Cert o campos similares. Por lo tanto, cuando se utilizan encabezados de identidad, debe haber control de red, eliminación/reescritura de encabezados en el gateway e, idealmente, TLS o mTLS interno."
  },
  {
    "kind": "paragraph",
    "text": "Intercambiar la identidad del canal por token es un modelo más explícito. El gateway valida el certificado, aplica reglas y llama al backend con un JWT interno, un token de delegación o un contexto firmado. Esto acerca la identidad a un formato que los backends entienden mejor. Por otro lado, crea una responsabilidad adicional: proteger la emisión, firma, validez y audiencia de este token interno."
  },
  {
    "kind": "paragraph",
    "text": "En entornos financieros, es habitual combinar mTLS con OAuth. El certificado autentica al cliente técnico y ayuda a vincular el canal; el token lleva alcances, consentimientos y contexto de autorización. Esta separación mejora la auditabilidad y evita darle al certificado más poder del que debería tener."
  },
  {
    "kind": "table",
    "caption": "Tabla 8: Modelos de propagación de identidades mTLS.",
    "headers": [
      "modelo de propagación",
      "Beneficio",
      "Riesgo principal"
    ],
    "rows": [
      [
        "Decisión solo en la puerta de entrada.",
        "Los backends se vuelven simples.",
        "El backend depende completamente del gateway para el contexto de seguridad."
      ],
      [
        "Encabezados con atributos de certificado",
        "Fácil de integrar.",
        "Falsifique encabezados si la ruta interna no está protegida."
      ],
      [
        "Token interno firmado",
        "Contexto explícito y verificable.",
        "Requiere gobernanza de validación y emisión de tokens."
      ],
      [
        "mTLS directo al backend",
        "El backend valida al cliente directamente.",
        "Aumenta el acoplamiento y la complejidad operativa."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: políticas de auditoría y evidencia",
    "id": "profundizacion-politicas-de-auditoria-y-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "En entornos regulados, no basta con configurar TLS correctamente; Es necesario demostrar que la configuración es correcta. La evidencia puede incluir inventario de certificados, informes de vencimiento, líneas base de versión y cifrado, resultados de escaneo, registros de cambios, aprobaciones de excepciones y registros de incidentes. Sin evidencia, la práctica técnica correcta puede ser difícil de defender en una auditoría."
  },
  {
    "kind": "paragraph",
    "text": "La evidencia debe diferenciar frontend, backend y mTLS. Un informe que solo muestra el certificado público del dominio no prueba que las conexiones internas al backend validen los certificados. Del mismo modo, una lista de certificados de clientes registrados no prueba que la política realmente requiera mTLS en el punto final correcto. La granularidad de la evidencia debe seguir la arquitectura."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría también necesita registrar las excepciones. Si un socio utiliza cifrado heredado durante un período específico, la excepción debe tener justificación, aprobador, fecha de vencimiento, controles compensatorios y plan de remediación. Las excepciones sin fecha límite se convierten en una base informal y debilitan la postura de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Una buena práctica es transformar los requisitos de TLS en controles automatizados. Las canalizaciones pueden validar los certificados antes de la implementación; los escáneres pueden verificar los puntos finales; las alertas pueden advertir sobre la caducidad; las políticas como código pueden evitar configuraciones débiles; y los paneles pueden mostrar el cumplimiento por producto, entorno y dominio."
  },
  {
    "kind": "table",
    "caption": "Tabla 9: Evidencia de la auditoría TLS.",
    "headers": [
      "evidencia",
      "Pregunta que responde"
    ],
    "rows": [
      [
        "Inventario de certificados",
        "¿Qué certificados existen y cuándo caducan?"
      ],
      [
        "Aprobado por TLS básico",
        "¿Qué versiones y cifrados están permitidos?"
      ],
      [
        "Resultado del escaneo",
        "¿El criterio de valoración expuesto sigue la línea de base?"
      ],
      [
        "Registro de cambios",
        "¿Quién cambió la política o el certificado TLS?"
      ],
      [
        "Registro de excepciones",
        "¿Por qué todavía se acepta un cliente heredado?"
      ],
      [
        "Prueba de backend TLS",
        "¿El gateway valida correctamente el servidor interno?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Profundización: antipatrones frecuentes",
    "id": "profundizacion-antipatrones-frecuentes"
  },
  {
    "kind": "subhead",
    "text": "Deshabilitar la validación de certificados para resolver el incidente"
  },
  {
    "kind": "paragraph",
    "text": "Puede que haga que la llamada funcione, pero elimina la autenticación del servidor y deja espacio para el intermediario. La solución correcta es ajustar la cadena, el truststore, el nombre de host o el certificado."
  },
  {
    "kind": "subhead",
    "text": "Utilice el mismo certificado comodín en todos los entornos"
  },
  {
    "kind": "paragraph",
    "text": "Aumenta el impacto de las fugas y dificulta el aislamiento. Los entornos de desarrollo, aprobación y producción deben tener una gobernanza separada."
  },
  {
    "kind": "subhead",
    "text": "Confíe en cualquier CA interna sin alcance"
  },
  {
    "kind": "paragraph",
    "text": "Un truststore demasiado amplio puede aceptar certificados inadecuados. La confianza debe ser suficiente para el caso de uso, no ilimitada."
  },
  {
    "kind": "subhead",
    "text": "Renovar certificado sin validar cadena completa"
  },
  {
    "kind": "paragraph",
    "text": "El certificado final puede ser correcto, pero el intermedio faltante provoca que los clientes fallen. Pruebe siempre la cadena presentada por el punto final."
  },
  {
    "kind": "subhead",
    "text": "Certificado de transporte confuso con autorización API"
  },
  {
    "kind": "paragraph",
    "text": "TLS autentica el canal o entidad técnica. Los permisos de operación aún necesitan una política, token, alcance o regla comercial."
  },
  {
    "kind": "subhead",
    "text": "Investigue 401 antes de probar el apretón de manos"
  },
  {
    "kind": "paragraph",
    "text": "Si el handshake falla, no hay HTTP ni 401. La troubleshooting debe seguir capas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas.",
    "id": "referencias-oficiales-y-lecturas-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8446 - Protocolo de seguridad de la capa de transporte (TLS) versión 1.3 - https://www.rfc-editor.org/info/rfc8446/ RFC 9325 - Recomendaciones para el uso seguro de TLS y DTLS - https://datatracker.ietf.org/doc/rfc9325/ RFC 5280 - Certificado de infraestructura de clave pública X.509 de Internet y perfil CRL - https://www.rfc-editor.org/info/rfc5280/ RFC 6066 - Extensiones de seguridad de la capa de transporte (TLS) - SNI - https://datatracker.ietf.org/doc/html/rfc6066 RFC 7301 - Extensión de negociación del protocolo de capa de aplicación TLS - https://datatracker.ietf.org/doc/html/rfc7301 RFC 6960 - Protocolo de estado de certificado en línea - OCSP - https://www.rfc-editor.org/info/rfc6960/ RFC 6797 - Seguridad de transporte estricta HTTP (HSTS) - https://www.rfc-editor.org/info/rfc6797/ RFC 8555 - Entorno de gestión automática de certificados (ACME) - https://datatracker.ietf.org/doc/html/rfc8555/ NIST SP 800-52 Rev. 2: Directrices para implementaciones de TLS: https://csrc.nist.gov/pubs/sp/800/52/r2/final Microsoft Learn: configuración de un nombre de dominio personalizado para Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/configure-custom-domain Microsoft Learn: API seguras mediante autenticación de certificado de cliente en Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-mutual-certificates-for-clients Documentación de Axway: administrar certificados y claves: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/ general_certificates/index.html Documentación de Axway: configurar Servicios HTTP e interfaces HTTPS: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_services/index.html"
  }
];
