import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido, com remoção apenas de cabeçalhos, rodapés e quebras físicas de página.
export const CERTIFICATES_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-01.svg",
    "alt": "Descripción general del certificado y del ecosistema PKI",
    "caption": "Figura 8.1 - Descripción general del ecosistema de certificados y PKI."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo explica cómo los certificados digitales transforman claves públicas en identidades verificables. El lector seguirá el modelo X.509, la construcción y validación de cadenas, emisión por autoridades de certificación, revocación, formatos de almacenamiento y el funcionamiento de estos elementos en TLS, mTLS, API Gateways y entornos corporativos."
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
      "Diferenciar clave pública, certificado, identidad, confianza y autorización, evitando tratar estos conceptos como equivalentes.",
      "Comprender los componentes de una PKI: titular, Autoridad de Registro, Autoridad de Certificación, repositorios, políticas, auditores y partes confiantes.",
      "Lea la estructura de un certificado X.509 v3, incluidos los campos obligatorios, extensiones críticas, nombres, usos de claves e identificadores de autoridad.",
      "Distinga la construcción de la cadena, la validación de la ruta y la decisión de confianza, incluidos los anclajes, los intermediarios, las políticas y las restricciones.",
      "Comprender el ciclo de emisión: generación de claves, CSR PKCS #10, validación, firma, publicación, instalación, renovación, rotación, revocación y destrucción.",
      "Comprenda las CRL, OCSP, el grapado de OCSP, los certificados de corta duración y las compensaciones entre seguridad, privacidad y disponibilidad.",
      "Reconocer formatos de interfaz DER, PEM, PKCS #12, JKS y PKCS #11, diagnosticando errores de cadena, clave privada y conversión.",
      "Aplique certificados en TLS de servidor, autenticación mTLS, Axway API Gateway, Azure API Management e integraciones de backend.",
      "Realice una resolución de problemas estructurada con OpenSSL, registros de protocolo de enlace, inspección del almacén de confianza y análisis de fechas, SAN, EKU y revocación."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cómo estudiar este capítulo",
    "id": "como-estudiar-este-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Los certificados digitales reúnen varias capas a la vez: cifrado asimétrico, formatos ASN.1, reglas de identidad, políticas organizativas, repositorios, protocolos de revocación y decisiones de confianza. La mejor manera de estudiar es separar las preguntas. Primero: ¿qué identidad afirma el certificado? Segundo: ¿quién firmó esta declaración? Tercero: ¿por qué el sistema confía en el remitente? Cuarto: ¿La cadena cumple con las reglas de tiempo, uso, denominación, política y revocación?"
  },
  {
    "kind": "paragraph",
    "text": "El capítulo utiliza como base el perfil de Internet definido por RFC 5280, pero muestra que una PKI real no es solo un conjunto de certificados. Requiere gobernanza, protección de claves, elaboración de perfiles de emisión, auditoría, automatización y respuesta a incidentes. En cada sección, conecte la teoría con un flujo concreto: el certificado presentado por un cliente, el certificado del oyente de una puerta de enlace o el certificado utilizado por la puerta de enlace para autenticarse en un servidor."
  },
  {
    "kind": "subhead",
    "text": "Regla editorial para diagramas."
  },
  {
    "kind": "paragraph",
    "text": "Para evitar texto ajustado dentro de los cuadros, los diagramas de este capítulo utilizan sólo etiquetas cortas. Las explicaciones técnicas completas permanecen en el cuerpo del texto. Los cuadros resaltados de documentos tienen altura automática y márgenes internos ampliados, sin dimensiones verticales fijas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.1 De la clave pública al certificado digital",
    "id": "8-1-de-la-clave-publica-al-certificado-digital"
  },
  {
    "kind": "paragraph",
    "text": "Una clave pública aislada le permite verificar una firma o participar en un protocolo de establecimiento de clave, pero, por sí sola, no le indica quién controla la clave privada correspondiente. Un atacante podría generar su propio par de claves y afirmar que la clave pública pertenece a un banco, un dominio o una aplicación. El problema central no es matemático: es crear una asociación verificable entre un identificador y una clave."
  },
  {
    "kind": "paragraph",
    "text": "El certificado digital soluciona este problema encapsulando la clave pública, los datos de identidad, el período de validez, las restricciones de uso y los metadatos, protegiendo el conjunto con la firma digital del emisor. La firma no hace que toda la información sea verdadera por naturaleza; nos permite verificar que el emisor asumió la responsabilidad técnica de la declaración. La parte que confía aún debe decidir si reconoce a ese emisor, si el perfil es apropiado y si la identidad presentada coincide con el contexto de la transacción."
  },
  {
    "kind": "paragraph",
    "text": "En el servidor TLS, el certificado vincula una clave pública a nombres DNS o direcciones IP. En mTLS, puede vincular una clave a una aplicación, dispositivo, socio o entidad legal. En la firma de código, asocia una clave con una identidad de editor. El mismo marco X.509 puede tener diferentes propósitos, pero las extensiones, las políticas y los procesos de validación determinan lo que realmente puede probar el certificado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.2 ¿Qué es una infraestructura de clave pública?",
    "id": "8-2-que-es-una-infraestructura-de-clave-publica"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-02.svg",
    "alt": "Roles esenciales en una infraestructura de clave pública",
    "caption": "Figura 8.2 - Roles esenciales en una infraestructura de clave pública."
  },
  {
    "kind": "paragraph",
    "text": "PKI, o Infraestructura de Clave Pública, es el conjunto de políticas, procesos, personas, servicios, equipos y software utilizados para emitir, mantener, distribuir, validar y revocar certificados y pares de claves. La infraestructura incluye autoridades de certificación, sistemas de registro, repositorios de certificados y estados, módulos criptográficos, procedimientos de auditoría, segregación de funciones y documentos regulatorios."
  },
  {
    "kind": "paragraph",
    "text": "La Autoridad de Certificación, o CA, firma certificados y listas de revocación. La Autoridad de Registro, o RA, valida la información y autoriza las solicitudes de emisión, pero puede no tener la clave de firma de la CA. El titular controla o utiliza la clave privada vinculada al certificado. La parte que confía valida el certificado antes de aceptar la identidad. Los repositorios ponen a disposición certificados, CRL, información de políticas o respuestas de estado. En una PKI madura, estas funciones están separadas para reducir el fraude y limitar el impacto de un compromiso."
  },
  {
    "kind": "paragraph",
    "text": "También hay roles de gobernanza. La autoridad política define los requisitos de identificación, algoritmos, plazos, usos y responsabilidades. Los operadores gestionan los componentes. Los auditores verifican si las prácticas coinciden con las políticas. Los equipos de seguridad protegen claves, analizan eventos y coordinan la revocación. Por tanto, confiar en un certificado significa confiar en una cadena técnica y, simultáneamente, en una cadena de procesos humanos y organizativos."
  },
  {
    "kind": "table",
    "caption": "Componentes y responsabilidades de una PKI.",
    "headers": [
      "Componente",
      "Función principal",
      "Riesgo si está comprometido"
    ],
    "rows": [
      [
        "CA raíz",
        "Crea un ancla o jerarquía de confianza.",
        "El compromiso puede requerir un reemplazo extenso de la confianza."
      ],
      [
        "aire acondicionado intermedio",
        "Emite certificados finales u otros certificados intermedios bajo restricciones.",
        "Permite una emisión inadecuada dentro del alcance autorizado."
      ],
      [
        "RANA",
        "Valida la identidad y aprueba solicitudes.",
        "Puede autorizar certificados de identidades incorrectas."
      ],
      [
        "Titular",
        "Controla la clave privada y utiliza el certificado.",
        "El robo de claves permite la suplantación de identidad hasta el bloqueo o vencimiento."
      ],
      [
        "Fiesta segura",
        "Construye y valida el camino antes de confiar.",
        "La validación incompleta acepta identidades o usos no válidos."
      ],
      [
        "Repositorio de estado",
        "Publica CRL, OCSP, certificados y metadatos.",
        "La indisponibilidad o los datos desactualizados afectan la decisión."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.3 Codificación X.509, ASN.1 y DER",
    "id": "8-3-codificacion-x-509-asn-1-y-der"
  },
  {
    "kind": "paragraph",
    "text": "X.509 es una familia de estándares para certificados de clave pública, listas de revocación y atributos. En Internet, RFC 5280 define un perfil de certificados X.509 v3 y CRL X.509 v2. Un perfil restringe las opciones de un patrón amplio para que las implementaciones independientes puedan interoperar. No todo lo que permite la sintaxis X.509 es apropiado para TLS público o una PKI empresarial."
  },
  {
    "kind": "paragraph",
    "text": "La estructura se describe en ASN.1, un lenguaje formal para definir tipos de datos. El certificado suele estar codificado con DER, un subconjunto determinista de las Reglas básicas de codificación. DER garantiza una representación única de los valores, una característica importante porque la firma digital se calcula sobre bytes específicos. Cambiar la codificación, incluso sin cambiar el significado aparente, produce bytes diferentes e invalida la firma."
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas suelen mostrar el certificado en formato textual, pero el objeto firmado sigue siendo binario. PEM es solo un envoltorio textual Base64 alrededor del DER, acompañado de líneas como BEGIN CERTIFICATE. Comprender esta diferencia evita confundir representación, estructura y contenido: X.509 define el modelo, ASN.1 describe la sintaxis, DER codifica los bytes y PEM facilita el transporte en archivos y configuraciones textuales."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.4 Anatomía de un certificado X.509 v3",
    "id": "8-4-anatomia-de-un-certificado-x-509-v3"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-03.svg",
    "alt": "Estructura conceptual de un certificado X.509",
    "caption": "Figura 8.3 - Estructura conceptual de un certificado X.509."
  },
  {
    "kind": "paragraph",
    "text": "El objeto Certificado contiene tres partes: tbsCertificate, SignatureAlgorithm y SignatureValue. El acrónimo TBS significa estar firmado. Esta parte contiene versión, número de serie, algoritmo, emisor, validez, asunto, SubjectPublicKeyInfo y extensiones. La CA calcula la firma sobre la codificación DER del tbsCertificate. El verificador utiliza la clave pública del emisor para verificar el valor de la firma."
  },
  {
    "kind": "paragraph",
    "text": "El número de serie identifica el certificado dentro del dominio del emisor y se utiliza en consultas CRL y OCSP. El intervalo de validez contiene notBefore y notAfter. Emisor identifica la entidad emisora; El asunto identifica al titular cuando se utiliza este campo. SubjectPublicKeyInfo incluye el algoritmo y la clave pública. Las extensiones X.509 v3 expresan nombres alternativos, restricciones de autoridad, usos autorizados, políticas, puntos de distribución y relaciones de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Hay dos campos de algoritmo de firma: uno dentro de tbsCertificate y otro en el objeto externo. Necesitan ser consistentes. El algoritmo de firma del certificado no es necesariamente el mismo que el algoritmo de clave pública del titular. Por ejemplo, una CA con una clave RSA puede firmar un certificado que contenga una clave pública elíptica. Lo que importa es que el verificador admita el algoritmo utilizado por el emisor y el algoritmo asociado con la clave del titular para el protocolo posterior."
  },
  {
    "kind": "table",
    "caption": "Campos de un certificado y preguntas de diagnóstico.",
    "headers": [
      "Campo",
      "Significado operacional",
      "Pregunta de diagnóstico"
    ],
    "rows": [
      [
        "número de serie",
        "Identificador único de un emisor.",
        "¿Es correcta la serie consultada en CRL/OCSP?"
      ],
      [
        "Editor",
        "Nombre del emisor declarado.",
        "¿Existe un certificado emisor compatible y confiable?"
      ],
      [
        "Validez",
        "Ventana de tiempo de uso.",
        "¿Son correctos el reloj, la zona horaria y no antes/no después?"
      ],
      [
        "Sujeto",
        "Identidad nominal del titular.",
        "¿El perfil utiliza asunto o se basa principalmente en SAN?"
      ],
      [
        "AsuntoPublicKeyInfo",
        "Algoritmo y clave pública del titular.",
        "¿La clave es compatible y coincide con la clave privada instalada?"
      ],
      [
        "Extensiones",
        "Nombres, usos y restricciones.",
        "¿Hay extensiones críticas desconocidas o incompatibles?"
      ],
      [
        "Firma",
        "Protección de la integridad y autoría del emisor.",
        "¿La firma se verifica con la clave pública del emisor?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.5 Nombres distinguidos, sujeto y emisor",
    "id": "8-5-nombres-distinguidos-sujeto-y-emisor"
  },
  {
    "kind": "paragraph",
    "text": "El sujeto y el emisor suelen utilizar Nombres Distinguidos, estructuras compuestas por Nombres Distinguidos Relativos. Los elementos comunes incluyen nombre de país, nombre de organización, nombre de unidad organizacional y nombre común. Las reglas de orden, codificación y comparación pueden ser más complejas que una simple comparación textual. Dos representaciones visualmente similares no son necesariamente idénticas a nivel de codificación."
  },
  {
    "kind": "paragraph",
    "text": "En los certificados TLS modernos, el nombre común no debe tratarse como la fuente principal para la validación del nombre de host cuando el nombre alternativo del sujeto está presente. SAN se creó para representar formas de nombres apropiadas para el protocolo, como dNSName, iPAddress, rfc822Name y URI. Los sistemas empresariales aún pueden usar DN para la selección de políticas, pero depender de texto sin tema y sin un perfil rígido crea fragilidad y ambigüedades."
  },
  {
    "kind": "paragraph",
    "text": "Emisor y sujeto tampoco son suficientes para construir una cadena de forma segura. Diferentes CA pueden compartir nombres similares o incluso los mismos. En la decisión participan identificadores clave, firmas, restricciones y datos de ruta. Una validación que solo compara al emisor del certificado infantil con el sujeto de un candidato no prueba que el candidato sea el emisor correcto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.6 Nombre alternativo del sujeto y validación de identidad",
    "id": "8-6-nombre-alternativo-del-sujeto-y-validacion-de-identidad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-04.svg",
    "alt": "Validación del identificador solicitado frente al nombre alternativo del sujeto",
    "caption": "Figura 8.4 - Validación del identificador solicitado frente al Nombre alternativo del sujeto."
  },
  {
    "kind": "paragraph",
    "text": "Para una conexión HTTPS, el cliente inicia el acceso con un identificador: normalmente un nombre DNS. Después de validar la firma y la cadena, deberá verificar que este identificador aparece válidamente en el certificado. Un dNSName se compara según reglas de nombres DNS específicas. El acceso a una dirección IP requiere una entrada de dirección IP adecuada; escribir la IP como texto en dNSName no produce la misma semántica."
  },
  {
    "kind": "paragraph",
    "text": "Los comodines reducen la cantidad de certificados, pero tienen límites y aumentan el impacto de una filtración de claves. Un nombre como *.example.com normalmente cubre una sola etiqueta, como api.example.com, y no se debe asumir que cubre a.b.example.com. En entornos internos, los comodines demasiado amplios pueden permitir que la misma clave represente muchos servicios no relacionados, lo que dificulta la segregación y la respuesta a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "SNI y SAN resuelven diferentes problemas. SNI informa al servidor, durante el protocolo de enlace, a qué nombre pretende acceder el cliente, permitiéndole seleccionar un certificado. SAN define qué identificadores está autorizado a representar el certificado. El servidor puede elegir un certificado basado en el SNI y aun así enviar un certificado cuyo SAN no coincida con el nombre. En este caso, la validación debería fallar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.7 Extensiones críticas y no críticas",
    "id": "8-7-extensiones-criticas-y-no-criticas"
  },
  {
    "kind": "paragraph",
    "text": "Cada extensión tiene un identificador OID, un valor y un indicador crítico. Si una implementación no reconoce o no puede procesar una extensión marcada como crítica, la validación debería fallar. Se puede ignorar una extensión desconocida que no sea crítica, aunque su valor aún puede ser relevante para aplicaciones específicas. Marcar todo como crítico perjudica la interoperabilidad; No marcar una restricción esencial como crítica puede permitir que los consumidores la ignoren."
  },
  {
    "kind": "paragraph",
    "text": "La criticidad no significa que la extensión sea importante en términos de negocio, pero define el comportamiento ante el desconocimiento. Un perfil de certificado debe especificar qué extensiones se requieren, sus valores, importancia e interacciones. Las CA no deben limitarse a copiar las extensiones solicitadas en una CSR: deben aplicar el perfil autorizado y rechazar o reemplazar los atributos que el solicitante no puede elegir."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-05.svg",
    "alt": "Familias de extensiones X.509 utilizadas en validación y operación",
    "caption": "Figura 8.5 - Familias de extensiones X.509 utilizadas en validación y operación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.8 Restricciones básicas, uso de claves y uso de claves extendido",
    "id": "8-8-restricciones-basicas-uso-de-claves-y-uso-de-claves-extendido"
  },
  {
    "kind": "paragraph",
    "text": "Las restricciones básicas informan si el certificado puede actuar como CA. El campo cA verdadero identifica la autoridad certificadora y pathLenConstraint puede limitar cuántas CA subordinadas no autoemitidas pueden aparecer debajo de él. Un certificado final de servidor o cliente normalmente debería tener una CA falsa. Aceptar un certificado final como emisor ignorando las restricciones básicas convierte una credencial ordinaria en una autoridad indebida."
  },
  {
    "kind": "paragraph",
    "text": "El uso de claves restringe las operaciones criptográficas básicas, como digitalSignature, keyEncipherment, keyAgreement, keyCertSign y cRLSign. Los certificados de CA necesitan keyCertSign para firmar certificados y, al publicar CRL, cRLSign. Para TLS, los bits apropiados dependen del algoritmo y la versión del protocolo. Las configuraciones estrictas deben seguir el perfil, sin asumir que ninguna clave pública sea adecuada para cualquier operación."
  },
  {
    "kind": "paragraph",
    "text": "El uso de clave extendida, o EKU, expresa propósitos de aplicaciones como serverAuth, clientAuth, codeSigning y OCSPSigning. Un certificado puede tener una clave con capacidad matemática para firmar, pero tener prohibido semánticamente autenticar a un cliente. Las puertas de enlace que validan mTLS deben considerar EKU y no solo cadenas y validez. Del mismo modo, los clientes compatibles pueden rechazar un certificado de servidor sin serverAuth."
  },
  {
    "kind": "table",
    "caption": "Extensiones X.509 y sus efectos.",
    "headers": [
      "Extensión",
      "Ejemplo",
      "Efecto"
    ],
    "rows": [
      [
        "Restricciones básicas",
        "CA=VERDADERO, rutaLen=0",
        "Autoriza la emisión, pero evita intermediarios adicionales por debajo de la CA."
      ],
      [
        "Uso clave",
        "firma digital",
        "Autoriza el uso de la clave para iniciar sesión dentro del perfil."
      ],
      [
        "Uso clave",
        "claveCertSign",
        "Autoriza la clave CA para firmar certificados."
      ],
      [
        "Uso extendido de claves",
        "autenticación del servidor",
        "Declara el propósito de autenticación del servidor TLS."
      ],
      [
        "Uso extendido de claves",
        "autenticación de cliente",
        "Declara el propósito de autenticación del cliente TLS."
      ],
      [
        "Nombre alternativo del sujeto",
        "DNS:api.ejemplo.com",
        "Vincula la clave al identificador utilizado por el cliente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.9 SKI, AKI, AIA y puntos de distribución",
    "id": "8-9-ski-aki-aia-y-puntos-de-distribucion"
  },
  {
    "kind": "paragraph",
    "text": "El Identificador de clave de sujeto, o SKI, identifica la clave pública del certificado. El Identificador de clave de autoridad, o AKI, ayuda a identificar la clave del emisor. Estos valores ayudan a construir una cadena cuando hay emisores con los mismos nombres, renovaciones de CA o múltiples rutas. No reemplazan la verificación de firmas, pero reducen las ambigüedades a la hora de seleccionar candidatos."
  },
  {
    "kind": "paragraph",
    "text": "Authority Information Access puede indicarle lugares para obtener certificados de emisión y servicios OCSP. Los puntos de distribución de CRL indican dónde recuperar las listas de revocación. Estos campos son instrucciones de construcción y estado, no garantías de disponibilidad. Los entornos aislados pueden bloquear el acceso externo y una puerta de enlace puede depender de una memoria caché, un repositorio corporativo o una cadena proporcionada por pares."
  },
  {
    "kind": "paragraph",
    "text": "La recuperación automática de intermediarios por parte de AIA crea diferencias entre clientes. Un navegador puede completar una cadena que una JVM, un dispositivo o una biblioteca no completa de la misma manera. Por tanto, el servidor debe presentar la cadena intermedia necesaria, sin depender de descargas oportunistas. Por lo general, no es necesario enviar la raíz: debe estar en el almacén de confianza de la parte que confía."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.10 Políticas de certificación y restricciones de nombres",
    "id": "8-10-politicas-de-certificacion-y-restricciones-de-nombres"
  },
  {
    "kind": "paragraph",
    "text": "Las políticas de certificado contienen OID que representan las políticas bajo las cuales se emitió el certificado. Una política puede indicar el nivel de validación, la comunidad de confianza, los requisitos contractuales o el perfil de la industria. La presencia de un OID no genera confianza automáticamente: la parte que confía necesita conocer su significado, mapear políticas y configurar OID aceptables cuando la política sea relevante."
  },
  {
    "kind": "paragraph",
    "text": "Las restricciones de políticas, las asignaciones de políticas y la inhibición de cualquier política participan en el procesamiento de políticas a lo largo del camino. RFC 9618 actualizó el algoritmo de validación de políticas de RFC 5280 para evitar un comportamiento exponencial en casos adversos y al mismo tiempo preservar un resultado equivalente. Este ejemplo muestra que incluso los algoritmos de validación aparentemente administrativos pueden tener un impacto en la seguridad y la disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Las restricciones de nombres le permiten restringir los espacios de nombres que una CA subordinada puede certificar, como ciertos dominios, correos electrónicos o redes IP. Es una herramienta poderosa para CA privadas, intermediarios delegados e integraciones entre organizaciones. Sin embargo, el soporte inconsistente en sistemas heredados y la complejidad de los nombres requieren pruebas. Una CA técnicamente restringida es preferible a una CA con amplio poder controlado únicamente por procedimientos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.11 Jerarquías, raíces e intermedios",
    "id": "8-11-jerarquias-raices-e-intermedios"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-06.svg",
    "alt": "Jerarquía de certificados raíz, intermedio y final",
    "caption": "Figura 8.6 - Jerarquía de certificados raíz, intermedio y final."
  },
  {
    "kind": "paragraph",
    "text": "Una CA raíz suele tener un certificado autofirmado, en el que el sujeto y el emisor representan a la propia entidad y la firma se produce mediante la clave privada correspondiente. El hecho de que esté autofirmado no genera confianza. La confianza surge cuando una organización, sistema operativo, navegador, tiempo de ejecución o aplicación instala explícitamente la clave raíz o el certificado como un ancla de confianza."
  },
  {
    "kind": "paragraph",
    "text": "La raíz normalmente permanece fuera de línea o fuertemente protegida y se suscribe a CA intermedias. Los intermediarios realizan la emisión diaria y permiten segmentar por finalidad, entorno, región, socio o nivel de seguridad. Si un intermediario se ve comprometido, la organización puede revocarlo y reemplazarlo sin cambiar inmediatamente todas las raíces. Esta arquitectura reduce la frecuencia de uso de la clave más sensible."
  },
  {
    "kind": "paragraph",
    "text": "Pueden existir cadenas alternativas mediante certificación cruzada o mediante intermediarios con más de un emisor. El mismo certificado final se puede validar a través de diferentes rutas según el almacén de confianza y los certificados disponibles. Esto explica por qué una conexión funciona en un cliente y falla en otro. El diagnóstico debe capturar la cadena realmente construida, no solo la cadena que el servidor pretendía proporcionar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.12 Construcción de cadena versus validación de ruta",
    "id": "8-12-construccion-de-cadena-versus-validacion-de-ruta"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-07.svg",
    "alt": "Diferencia entre construir una cadena y validar el camino",
    "caption": "Figura 8.7 - Diferencia entre construir una cadena y validar el camino."
  },
  {
    "kind": "paragraph",
    "text": "La construcción de una cadena es el proceso de encontrar certificados de candidatos hasta un ancla de confianza. El motor puede utilizar la cadena enviada por el par, certificados locales, cachés, AIA y sus propias reglas de selección. El resultado es una o más rutas candidatas. El orden recibido no siempre es el orden utilizado y es posible que se ignoren los certificados adicionales o se introduzcan rutas inesperadas."
  },
  {
    "kind": "paragraph",
    "text": "La validación de ruta aplica reglas a la ruta elegida: verifica firmas, validez temporal, restricciones básicas, uso de claves, EKU, políticas, restricciones de nombre, extensiones críticas y, según la política local, estado de revocación. Después de eso, la aplicación aún verifica la identidad del servicio, como el nombre de host y las reglas comerciales. Una cadena criptográficamente correcta puede ser inapropiada para serverAuth, clientAuth o la identidad solicitada."
  },
  {
    "kind": "paragraph",
    "text": "El ancla de confianza es una entrada de configuración, no necesariamente un certificado procesado como los demás. Las implementaciones pueden representar anclajes como certificados autofirmados o como un nombre y una clave pública. Lo importante es entender que la firma de la raíz sobre sí misma no es la base de la confianza; la base es la decisión administrativa de confiar en esa clave bajo ciertos parámetros."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.13 Emisión, CSR y prueba de propiedad",
    "id": "8-13-emision-csr-y-prueba-de-propiedad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-08.svg",
    "alt": "Ciclo de vida operativo de un certificado.",
    "caption": "Figura 8.8 - Ciclo de vida operativo de un certificado."
  },
  {
    "kind": "paragraph",
    "text": "La emisión comienza con la generación del par de claves en la ubicación de custodia definida. Siempre que sea posible, la clave privada debe crearse en el componente que la utilizará o en el HSM/KMS, evitando el transporte. Luego, el titular genera una Solicitud de firma de certificado, generalmente PKCS #10. El CSR contiene información de la solicitud, clave pública, atributos y una firma generada con la clave privada correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "La firma de la CSR demuestra la posesión de la clave de firma privada asociada, pero no prueba la identidad reclamada. La RA o CA debe autenticar al solicitante y validar los nombres, la organización, el dominio, la aplicación o el dispositivo según la política. La CA tampoco debe aceptar ciegamente las restricciones básicas, EKU o SAN solicitadas. Emite un certificado según un perfil y autorización, pudiendo modificar o rechazar atributos."
  },
  {
    "kind": "paragraph",
    "text": "Después de la emisión, el certificado y la cadena se instalan en el servicio, mientras que la clave privada permanece protegida. La implementación debe verificar la correspondencia entre clave y certificado, cadena completa, permisos, alias, formato y contraseña. La operación continúa con inventario, seguimiento de vencimientos, renovación, rotación, revocación y destrucción segura. Un certificado olvidado en un oyente secundario puede provocar que no esté disponible incluso si se ha renovado el certificado principal."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de generación de claves y CSR para laboratorio:"
  },
  {
    "kind": "code",
    "text": "openssl req -new -newkey rsa:3072 -nodes \\\n-keyout api.key -out api.csr \\\n-subj '/C=BR/O=Exemplo/CN=api.exemplo.com' \\\n-addext 'subjectAltName=DNS:api.exemplo.com,DNS:api-interno.exemplo.com'"
  },
  {
    "kind": "paragraph",
    "text": "El uso de -nodes deja la clave sin cifrar en el archivo y solo es apropiado para uso controlado en laboratorio. En producción, la protección depende del modelo operativo: contraseña, ACL, administrador secreto, almacén de claves, HSM o identidad administrada. Automatizar no significa almacenar claves en texto claro de forma indiscriminada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.14 Perfiles de certificado y separación de propósitos",
    "id": "8-14-perfiles-de-certificado-y-separacion-de-propositos"
  },
  {
    "kind": "paragraph",
    "text": "Un perfil define campos, extensiones, algoritmos, tamaños de clave, duración, nombres permitidos y proceso de validación para un propósito. Los perfiles comunes incluyen CA raíz, CA intermedia, servidor TLS, cliente TLS, firma de código, firma de documentos y respondedor OCSP. Separar perfiles reduce los permisos y facilita la auditoría. Una única CA que emita cualquier tipo de certificado aumenta el radio de impacto de los errores de política."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados de persona, aplicación y dispositivo pueden utilizar estructuras similares, pero requieren fuentes de identidad diferentes. Se puede emitir automáticamente un certificado de carga de trabajo con una validez breve. Un certificado de socio externo puede requerir validación de contrato y organización. Un certificado de administrador puede requerir protección de token físico. La tecnología X.509 no determina por sí sola el nivel de confianza; el perfil y el proceso de emisión proporcionan el contexto."
  },
  {
    "kind": "paragraph",
    "text": "En la arquitectura empresarial, al menos separe los entornos de producción y no producción, los usos de servidor y cliente, y las autoridades emisoras del día a día desde las raíces. Cuando los socios necesitan confiar sólo en una parte de la organización, un intermediario limitado y dedicado es más seguro que distribuir una amplia raíz corporativa."
  },
  {
    "kind": "table",
    "caption": "Perfiles certificados y atención operativa.",
    "headers": [
      "Perfil",
      "Campos/extensiones típicos",
      "Cuidado principal"
    ],
    "rows": [
      [
        "CA raíz",
        "CA=TRUE, keyCertSign, cRLSign, de larga duración",
        "Clave offline, ceremonia, copias de seguridad y auditoría rigurosa."
      ],
      [
        "aire acondicionado intermedio",
        "CA=TRUE, pathLen y restricciones",
        "Limitar el espacio de nombres y el propósito; facilitar el reemplazo."
      ],
      [
        "servidor TLS",
        "SAN, autenticación del servidor, CA=FALSO",
        "Nombre correcto, cadena completa y rotación sin parar."
      ],
      [
        "Cliente TLS",
        "clientAuth, carga de trabajo/identidad de socio",
        "Mapeo para autorización y revocación rápida."
      ],
      [
        "OCSP responde",
        "OCSPFirma",
        "Delegación y protección contra respuestas inapropiadas."
      ],
      [
        "firma de código",
        "codiseñar",
        "Custodia fuerte y evidencia temporal de firma."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.15 Validación del certificado del servidor TLS",
    "id": "8-15-validacion-del-certificado-del-servidor-tls"
  },
  {
    "kind": "paragraph",
    "text": "El cliente recibe la cadena durante el protocolo de enlace y necesita verificar que exista una ruta a un ancla confiable, que cada firma sea válida, que los certificados sean válidos y que las CA estén autorizadas. Luego valida el uso del servidor y compara el identificador solicitado con SAN. Si algún paso falla, proceder silenciosamente elimina la protección contra la suplantación de identidad."
  },
  {
    "kind": "paragraph",
    "text": "SNI influye en el certificado que presenta el servidor. Una prueba sin SNI puede recibir el certificado predeterminado y generar un diagnóstico de nombre de host falso. Los servidores proxy y las puertas de enlace pueden finalizar TLS e iniciar una nueva conexión de backend; en este caso, existen validaciones independientes. El certificado visto por el cliente externo no es necesariamente el certificado presentado por el backend a la puerta de enlace."
  },
  {
    "kind": "paragraph",
    "text": "En las máquinas clientes, es común deshabilitar la validación para \"resolver\" entornos de prueba. Esta práctica tiende a migrar a la producción. La solución correcta es instalar la CA adecuada en un almacén de confianza delimitado, emitir un certificado con la SAN correcta y ajustar el reloj y la cadena. Trust-all convierte TLS en cifrado sin autenticación de destino."
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 \\\n-servername api.exemplo.com -showcerts -verify_return_error"
  },
  {
    "kind": "paragraph",
    "text": "Este comando muestra la cadena enviada, el certificado seleccionado por SNI, los detalles del protocolo de enlace y el resultado de la verificación. No reemplaza el comportamiento exacto de todas las bibliotecas, pero ayuda a separar la conectividad, la negociación TLS y la validación de certificados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.16 Certificados de cliente y mTLS",
    "id": "8-16-certificados-de-cliente-y-mtls"
  },
  {
    "kind": "paragraph",
    "text": "En TLS unidireccional, sólo el servidor presenta un certificado. En mTLS, el servidor solicita el certificado del cliente y valida la cadena presentada. La clave privada permanece en el cliente y participa en la prueba criptográfica durante el protocolo de enlace. El certificado puede identificar una aplicación, socio o dispositivo, ofreciendo una autenticación sólida en todo el canal."
  },
  {
    "kind": "paragraph",
    "text": "La autenticación no es autorización. Luego de validar el certificado, la puerta de enlace debe asignar la identidad a una política: sujeto, SAN, huella digital, serie, emisor, cadena, OID o registro interno. Confiar en cualquier certificado emitido por una CA amplia puede otorgar acceso a directores no deseados. Una CA de cliente dedicada, EKU clientAuth, restricciones de nombre y registros de socios reducen este riesgo."
  },
  {
    "kind": "paragraph",
    "text": "La rotación mTLS requiere superposición. Durante un período de tiempo, es posible que el servidor deba aceptar certificados nuevos y antiguos o confiar en dos intermediarios. El cliente debe instalar una clave y un certificado nuevos antes de retirar el anterior. El proceso debe considerar la reversión, múltiples instancias, cachés, sesiones TLS y socios que actualizan a diferentes velocidades."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.17 Revocación por CRL",
    "id": "8-17-revocacion-por-crl"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-09.svg",
    "alt": "Principales modelos para obtener el estado del certificado.",
    "caption": "Figura 8.9 - Principales modelos para la obtención del estatus de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Una Lista de revocación de certificados está firmada por una CA o un emisor autorizado y contiene certificados revocados identificados por serie, fechas y motivos. El confiante descarga la CRL, comprueba la firma y validez de la lista y consulta el serial. Las CRL permiten el procesamiento local y pueden funcionar en entornos desconectados, pero crecen con el número de revocaciones y tienen un retraso entre publicaciones."
  },
  {
    "kind": "paragraph",
    "text": "Las CRL delta solo pueden transportar cambios desde una CRL base. Los puntos de distribución le permiten particionar listas por alcance. El proyecto necesita definir periodicidad, nextUpdate, caché, indisponibilidad y comportamiento cuando caduca la CRL. Una CRL accesible mediante HTTP no necesita ser secreta, pero su autenticidad depende de la firma. La disponibilidad del repositorio puede convertirse en una dependencia crítica."
  },
  {
    "kind": "paragraph",
    "text": "Los motivos de revocación incluyen compromiso de clave, cambio de afiliación, reemplazo y cese de operaciones. Algunas razones afectan el análisis de incidentes, pero el consumidor normalmente necesita, como mínimo, distinguir el estado válido, revocado e indeterminado. Revocar a un intermediario puede invalidar un gran conjunto de certificados y requiere coordinación con tiendas fiduciarias y cadenas alternativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.18 OCSP, grapado y certificados de corta duración",
    "id": "8-18-ocsp-grapado-y-certificados-de-corta-duracion"
  },
  {
    "kind": "paragraph",
    "text": "OCSP le permite consultar el estado de un certificado específico sin transferir una CRL completa. La solicitud identifica el emisor y el número de serie; la respuesta firmada indica bueno, revocado o desconocido, con tiempos de producción y validez. Bueno significa que el respondedor no tiene revocación aplicable según su alcance; no es una afirmación universal de que la identidad o todos los demás requisitos sean válidos."
  },
  {
    "kind": "paragraph",
    "text": "Las consultas directas OCSP crean dependencia de disponibilidad y pueden revelar al responder a qué servicios accede el cliente. El grapado OCSP permite al servidor obtener una respuesta y entregarla durante el protocolo de enlace, lo que reduce la latencia y la exposición del cliente. El confiante deberá verificar la firma, tiempos y correspondencia de la respuesta. Las políticas de falla leve mejoran la disponibilidad, pero pueden aceptar un certificado cuando el servicio de estado no está disponible; Hard-Fail aumenta la seguridad de revocación y el riesgo de indisponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados a corto plazo reducen la ventana de exposición y pueden operar sin información de revocación en perfiles específicos. RFC 9608 define una extensión para indicar que no hay revocación disponible en ciertos certificados. Este modelo requiere una automatización fiable: si la renovación falla, el vencimiento llega rápidamente. La decisión entre revocación en línea y de corta duración depende del tiempo de detección, tiempo de distribución, criticidad, disponibilidad y capacidad de automatización."
  },
  {
    "kind": "subhead",
    "text": "Estado de Web PKI en julio de 2026"
  },
  {
    "kind": "paragraph",
    "text": "Los requisitos públicos de CA/Browser Forum ahora limitan los certificados TLS de suscriptor emitidos desde el 15 de marzo de 2026 a un máximo de 200 días. El cronograma oficial exige 100 días a partir del 15 de marzo de 2027 y 47 días a partir del 15 de marzo de 2029. Estos límites se aplican a la PKI web pública; Las PKI privadas deben fijar sus propios plazos, pero la tendencia refuerza la automatización y el inventario."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.19 Formatos y contenedores: DER, PEM, PKCS #12 y JKS",
    "id": "8-19-formatos-y-contenedores-der-pem-pkcs-12-y-jks"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-10.svg",
    "alt": "Formatos comunes de certificados, cadenas y claves",
    "caption": "Figura 8.10 - Formatos comunes para certificados, cadenas y claves."
  },
  {
    "kind": "paragraph",
    "text": "DER es la codificación binaria del objeto ASN.1. PEM representa DER en Base64 con encabezados textuales. Los archivos .cer o .crt pueden contener DER o PEM; la extensión no determina el formato. Un archivo PEM también puede contener varios certificados, una clave privada, parámetros o una CSR. Inspeccione siempre el contenido en lugar de confiar en el nombre."
  },
  {
    "kind": "paragraph",
    "text": "PKCS #12, típicamente .p12 o .pfx, es un contenedor que puede contener clave privada, certificado final y cadena, protegido por contraseña y mecanismos de integridad. Es común en Windows, navegadores, Java y productos de puerta de enlace. Una importación puede fallar debido a un algoritmo de protección no compatible, una contraseña, un alias, una clave privada faltante o una cadena incompleta."
  },
  {
    "kind": "paragraph",
    "text": "JKS es un formato tradicional de almacén de claves de Java. Las versiones modernas de Java también utilizan PKCS #12 como valor predeterminado. El almacén de confianza y el almacén de claves tienen diferentes roles conceptuales: el primero contiene anclajes o certificados confiables; el segundo contiene identidades locales y claves privadas, aunque las herramientas pueden almacenar ambas. PKCS #11 no es un formato de archivo, sino una interfaz para módulos criptográficos como HSM y tokens."
  },
  {
    "kind": "code",
    "text": "# inspeccionar certificado\nopenssl x509 -in api.crt -noout -text"
  },
  {
    "kind": "code",
    "text": "# Inspeccionar la CSR y verificar su firma\nopenssl req -in api.csr -noout -text -verify"
  },
  {
    "kind": "code",
    "text": "# Inspeccionar un PKCS#12 sin exportar la clave\nopenssl pkcs12 -in identidade.p12 -info -nokeys"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.20 Custodia de clave privada y HSM",
    "id": "8-20-custodia-de-clave-privada-y-hsm"
  },
  {
    "kind": "paragraph",
    "text": "El certificado es público; la clave privada es el activo sensible. Quien obtiene la clave puede suplantar al titular, firmar mensajes o establecer sesiones según el uso autorizado. La protección debe considerar la generación, el almacenamiento, el uso, la copia de seguridad, el transporte, la rotación, la recuperación y la destrucción. Los permisos de archivos son solo una capa y pueden ser insuficientes para las claves de CA o los servicios críticos."
  },
  {
    "kind": "paragraph",
    "text": "Los HSM protegen claves en hardware o módulos validados y realizan operaciones sin exportar material privado. Los KMS proporcionan administración central, políticas, auditoría e integración, y pueden usar HSM debajo. Para las raíces, las ceremonias, la autenticación multifactor, el quórum y la operación fuera de línea son comunes. Para las cargas de trabajo, la automatización y las identidades de las máquinas reducen las copias manuales y los secretos estáticos."
  },
  {
    "kind": "paragraph",
    "text": "La copia de seguridad de claves de CA es diferente de la copia de seguridad de claves efímeras del servicio. La pérdida de una clave de CA puede impedir su emisión, revocación o continuidad; copiarlo excesivamente aumenta el riesgo. Es posible que sea necesario archivar las claves de firma según la política, mientras que las claves utilizadas para la confidencialidad histórica pueden requerir recuperación. Cada tipo de clave necesita una estrategia compatible con su finalidad y periodo criptográfico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.21 PKI pública, PKI privada y confianza explícita",
    "id": "8-21-pki-publica-pki-privada-y-confianza-explicita"
  },
  {
    "kind": "paragraph",
    "text": "La PKI web pública está dirigida a nombres verificables públicamente y de confianza distribuidos por los almacenes raíz del navegador y del sistema. Las CA públicas siguen los requisitos de CA/Browser Forum y los programas de almacenamiento raíz. Una PKI privada sirve identidades internas, mTLS, dispositivos y cargas de trabajo, con raíces distribuidas en toda la organización. Los certificados privados no pasan a ser confiables externamente simplemente usando X.509."
  },
  {
    "kind": "paragraph",
    "text": "La ventaja de la PKI pública es la interoperabilidad con clientes comunes. El privado ofrece espacio de nombres, perfil, validez y control de emisión. El costo es distribuir y gobernar la confianza. La instalación de una raíz privada en todo el sistema otorga a la CA amplio poder sobre muchos protocolos; Cuando sea posible, utilice almacenes de confianza específicos de la aplicación e intermediarios restringidos."
  },
  {
    "kind": "paragraph",
    "text": "Los certificados autofirmados del servicio pueden funcionar cuando la clave se distribuye a través de un canal confiable y se fija explícitamente, pero no se escalan bien. Confunden rotación, inventario y validación. Una CA privada le permite renovar certificados mientras mantiene el ancla, separa roles y revoca. Sin embargo, una CA privada mal protegida puede magnificar el impacto en lugar de reducirlo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.22 Transparencia de Certificados, CAA y ACME",
    "id": "8-22-transparencia-de-certificados-caa-y-acme"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Transparency crea registros públicos de solo anexar para certificados web PKI, lo que le permite detectar emisiones incorrectas y aumentar la auditabilidad. Los precertificados y las marcas de tiempo de los certificados firmados son parte de este ecosistema. CT no reemplaza la validación o revocación de la cadena, pero hace que las emisiones sean observables y permite el monitoreo del dominio."
  },
  {
    "kind": "paragraph",
    "text": "CAA es un registro DNS mediante el cual el propietario de un dominio puede indicar qué CA están autorizadas a emitir certificados para él. La CA pública consulta a la CAA según los requisitos aplicables. CAA reduce ciertas emisiones indebidas, pero no protege una clave privada ya comprometida y no reemplaza el control o monitoreo de dominio."
  },
  {
    "kind": "paragraph",
    "text": "ACME, definido en RFC 8555, automatiza la creación de cuentas, solicitudes, impugnaciones, finalización y obtención de certificados. Los desafíos demuestran control sobre los identificadores. La automatización reduce los errores manuales y permite plazos de entrega ajustados, pero las credenciales de cuenta, los permisos de DNS, los agentes y las canalizaciones se convierten en activos críticos. Un atacante con acceso al mecanismo de validación podría emitir certificados legítimos para uso malicioso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.23 Rotación sin indisponibilidad",
    "id": "8-23-rotacion-sin-indisponibilidad"
  },
  {
    "kind": "paragraph",
    "text": "La rotación no es sólo reemplazar un archivo. Es necesario identificar todos los puntos que terminan TLS o presentan un certificado: balanceadores de carga, escuchas de puerta de enlace, controladores de ingreso, backends, trabajos, clientes y entornos de recuperación. El inventario debe registrar titular, emisor, SAN, número de serie, huella dactilar, vigencia, ubicación, titular y proceso de renovación."
  },
  {
    "kind": "paragraph",
    "text": "Una estrategia segura utiliza la superposición. Para los certificados de servidor, implemente el nuevo certificado y confirme que todas las instancias lo muestren antes de eliminar el anterior. Para cambiar AC, primero distribuya el nuevo ancla o intermediario a los consumidores; luego emita y presente la nueva cadena; Por último, elimine la antigua confianza. Invertir el orden provoca fallos en la cadena. La automatización necesita observabilidad. Monitorear solo la fecha de vencimiento en el repositorio no garantiza que el oyente activo se haya actualizado. Las pruebas externas deben abrir el protocolo de enlace, verificar el número de serie y la cadena, y cubrir cada punto final y región. Las alertas deben considerar el tiempo de corrección, las ventanas de cambio y las dependencias de los socios, no solo advertir el último día."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.24 Certificados en API Gateways y múltiples saltos TLS",
    "id": "8-24-certificados-en-api-gateways-y-multiples-saltos-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-11.svg",
    "alt": "Certificados independientes y almacenes de confianza en cada salto de una arquitectura API",
    "caption": "Figura 8.11: Certificados independientes y almacenes de confianza en cada salto de una arquitectura API."
  },
  {
    "kind": "paragraph",
    "text": "En una arquitectura con cliente, balanceador, API Gateway y backend, cada conexión TLS es independiente. El equilibrador puede presentar un certificado al cliente y utilizar otra identidad para hablar con la puerta de enlace. La puerta de enlace puede validar la CA backend y, en mTLS, presentar su propio certificado de cliente. Diagnosticar “el certificado API” sin indicar el salto lleva a conclusiones erróneas."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, las políticas pueden verificar cadenas, consultar CRL y aplicar filtros de validación. El producto también mantiene certificados y claves utilizadas por los oyentes, firmas y conexiones salientes. La configuración debe separar los certificados confiables de las identidades de clave privada, definir fuentes de revocación y proteger el material criptográfico. Los registros deben indicar en qué filtro y en qué etapa falló la validación."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, los certificados se pueden usar para autenticar clientes en el tráfico entrante, autenticar APIM en backends y agregar CA personalizadas para la validación de backend. Las pólizas pueden examinar las propiedades del certificado presentado. En topologías con Application Gateway u otro proxy al frente, es fundamental saber dónde termina TLS y si el certificado del cliente llega criptográficamente al APIM o es transformado en metadatos confiables por una capa previa."
  },
  {
    "kind": "subhead",
    "text": "Principio de funcionamiento"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trate el tema, la huella digital o un encabezado certificado como prueba suficiente sin garantizar la autenticidad del canal que transmite esa información. Cuando un proxy finaliza mTLS, el siguiente salto debe autenticar el proxy y proteger los metadatos contra inyección o sobrescritura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.25 Solución de problemas estructurada",
    "id": "8-25-solucion-de-problemas-estructurada"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/es/figure-12.svg",
    "alt": "Árbol inicial para diagnosticar fallas de certificados",
    "caption": "Figura 8.12 - Árbol inicial para diagnosticar fallas de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Comience identificando la función y salte: certificado de servidor externo, certificado de cliente, certificado de puerta de enlace backend o certificado de una CA. Capture el nombre de host, SNI, puerto, cadena recibida, almacén de confianza efectivo, hora del sistema y política de revocación. Los mensajes genéricos como \"no se puede obtener el certificado del emisor local\" o \"certificado desconocido\" describen los síntomas, no necesariamente la causa raíz."
  },
  {
    "kind": "paragraph",
    "text": "Los errores de sincronización incluyen certificado caducado, certificado aún no válido, CRL u OCSP fuera de ventana y reloj incorrecto. Los fallos de identidad incluyen SAN faltante, comodines no coincidentes, acceso IP y SNI incorrecto. Las fallas de la cadena incluyen intermediario no enviado, raíz faltante, AKI/SKI no coincidente, firma no válida y ruta alternativa que no es de confianza. Los errores de uso incluyen restricciones básicas, uso de claves, EKU o extensiones críticas no compatibles."
  },
  {
    "kind": "paragraph",
    "text": "Después de reproducir, compare el comportamiento entre herramientas. OpenSSL puede utilizar un conjunto de raíces diferente al de JVM, Windows o dispositivo. Una prueba que funciona con -CAfile explícito demuestra que la cadena se puede validar con ese ancla, no que el producto esté configurado para usarlo. También verifique que el certificado y la clave privada coincidan y que la instancia activa haya cargado la nueva versión."
  },
  {
    "kind": "table",
    "caption": "Síntomas frecuentes del certificado y comprobaciones iniciales.",
    "headers": [
      "Síntoma",
      "Causas probables",
      "Verificación"
    ],
    "rows": [
      [
        "El nombre de host no coincide",
        "SAN incorrecto, SNI incorrecto, acceso IP.",
        "Inspeccione SAN y repita el protocolo de enlace con el SNI correcto."
      ],
      [
        "CA desconocida",
        "Falta raíz, almacén de confianza incorrecto, CA privada.",
        "Enumere los anclajes efectivos y valídelos con un archivo CA explícito."
      ],
      [
        "No se puede obtener el emisor",
        "Intermedio no enviado o AIA inaccesible.",
        "Examinar la cadena entregada e instalar el intermediario."
      ],
      [
        "Certificado caducado",
        "El oyente todavía usa una versión antigua o un reloj incorrecto.",
        "Consultar serial presentado por cada instancia y hora."
      ],
      [
        "Propósito del certificado no admitido",
        "Incompatible con EKU/KU.",
        "Inspeccionar extensiones y perfil de emisiones."
      ],
      [
        "La verificación de revocación falló",
        "CRL/OCSP no disponible, respuesta caducada o no válida.",
        "Pruebe el punto final, el caché, la próxima actualización y la política de fallas."
      ],
      [
        "La clave privada no coincide",
        "Certificado importado sin la clave correspondiente.",
        "Compare la clave pública derivada y el alias del almacén de claves."
      ]
    ]
  },
  {
    "kind": "code",
    "text": "# Validar la cadena con raíz e intermedia explícitas\nopenssl verify -CAfile raiz.pem -untrusted intermediaria.pem servidor.pem"
  },
  {
    "kind": "code",
    "text": "# Mostrar fechas, serie, emisor, asunto y SAN\nopenssl x509 -in servidor.pem -noout \\\n-dates -serial -issuer -subject -ext subjectAltName"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.26 Estudios de caso",
    "id": "8-26-estudios-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: cadena incompleta después de la renovación. Una puerta de enlace recibe un nuevo certificado de servidor emitido por otro intermediario. El equipo sólo reemplaza el certificado final pero conserva la cadena anterior. Los navegadores que recuperan el intermediario a través de AIA funcionan; un socio de Java falla. La solución es instalar y presentar la nueva cadena, validar en clientes sin AIA e inventariar la asociación entre los certificados finales e intermedios."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: mTLS válido, autorización inadecuada. La puerta de enlace confía en una CA corporativa que emite certificados para miles de usuarios y aplicaciones. La política acepta cualquier cadena válida y utiliza solo el nombre de la organización. Se accede a un certificado que es legítimo, pero que no está destinado al socio. La solución implica una CA o intermediario dedicado, EKU clientAuth, SAN o identificador estable, registro de autorización y revocación operativa."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: la renovación del backend causa 502. El certificado del backend cambia de una CA pública a una CA privada. La puerta de enlace continúa con el antiguo almacén de confianza y rechaza el protocolo de enlace saliente. Para el cliente, el síntoma es un error de puerta de enlace. El análisis debe separar los TLS entrantes y salientes, detectar el error de backend, instalar la nueva CA con anticipación y mantener la superposición durante la migración."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4: certificado aparentemente caducado. El repositorio contiene el nuevo certificado, pero una instancia del clúster no ha vuelto a cargar la configuración y continúa mostrando el antiguo. Los monitores alternan entre el éxito y el fracaso. La solución es verificar el número de serie y la huella digital por nodo, eliminar instancias inconsistentes, corregir la implementación e incluir pruebas de protocolo de enlace activo en el proceso de implementación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.27 Laboratorios prácticos",
    "id": "8-27-laboratorios-practicos"
  },
  {
    "kind": "paragraph",
    "text": "Laboratorio 1 - lectura de certificados. Obtenga un certificado de laboratorio, ejecute openssl x509 -text e identifique la versión, el número de serie, el algoritmo de firma, el emisor, la validez, el asunto, la clave pública, SAN, restricciones básicas, KU, EKU, SKI, AKI, AIA y puntos de distribución CRL. Explique qué identidad se afirma y qué usos se permiten."
  },
  {
    "kind": "paragraph",
    "text": "Laboratorio 2: CA privada simple. En un entorno desechable, cree una raíz y una intermedia, emita un certificado de servidor con SAN y valide la cadena. Comparar la validación cuando se omite el intermedio. No reutilice claves de laboratorio en sistemas reales; el objetivo es observar la estructura y el flujo, no construir una PKI de producción."
  },
  {
    "kind": "paragraph",
    "text": "Laboratorio 3: error de nombre de host. Emita un certificado para api.lab.local y preséntelo en un servicio al que se accede con otro nombre. Tenga en cuenta que es posible que se confíe en la cadena y que la firma sea correcta, pero la identidad falla. Luego repita con SAN correcto. Registre la diferencia entre confianza en el emisor y coincidencia de nombre."
  },
  {
    "kind": "paragraph",
    "text": "Laboratorio 4 - PKCS #12. Clave de paquete, certificado final e intermedio en un formato .p12. Importe a un almacén de claves de prueba, enumere los alias y confirme que la entrada contiene una clave privada. Cree una versión sin intermediario y compare el comportamiento del servidor. Este ejercicio reproduce una causa común de fallas después de la renovación. Laboratorio 5: diagnóstico de terminales. Utilice s_client con SNI, capture la cadena y ejecute la verificación con un almacén de confianza explícito. Compare el resultado con curl o una JVM. Documente qué almacén de confianza utiliza cada herramienta y por qué los resultados pueden diferir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "El certificado digital asocia una clave pública a la identidad, periodo, usos y restricciones bajo la firma de un emisor.",
      "PKI incluye gobernanza, validación de identidad, CA, RA, repositorios, auditoría, protección de claves y respuesta a incidentes.",
      "X.509 v3 utiliza extensiones para nombres, autoridad, usos, políticas, encadenamiento y estado; extensiones críticas desconocidas invalidan la ruta.",
      "Construir una cadena es encontrar un camino; Validar es aplicar firmas, tiempo, restricciones, usos, políticas, nombres y revocación.",
      "La confianza en la raíz es administrativa. El hecho de que un certificado raíz esté autofirmado no genera confianza automáticamente.",
      "CSR acredita la posesión de la clave correspondiente, pero no acredita la identidad declarada; la CA debe aplicar validación y elaboración de perfiles.",
      "Los certificados CRL, OCSP, grapado y cortos representan diferentes compensaciones entre actualidad, privacidad y disponibilidad.",
      "DER, PEM, PKCS #12 y JKS tienen roles diferentes; La extensión del archivo no garantiza el contenido o la presencia de una clave privada.",
      "En las puertas de enlace, cada salto TLS tiene su propia identidad, cadena y almacén de confianza. La solución de problemas debe nombrar el salto exacto.",
      "La rotación segura depende del inventario, la superposición, la automatización, la observabilidad y las pruebas del certificado realmente presentado."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios de repaso",
    "id": "ejercicios-de-repaso"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por qué una clave pública aislada no es suficiente para autenticar un servidor.",
      "Diferenciar entre CA, RA, titular, parte confiante y depositario.",
      "¿Qué partes de un certificado están firmadas por la CA?",
      "Explique la diferencia entre X.509, ASN.1, DER y PEM.",
      "¿Por qué SAN es esencial para la validación del nombre de host?",
      "¿Cuál es la diferencia entre restricciones básicas, uso de claves y uso de claves extendido?",
      "¿Cómo ayudan SKI y AKI a construir la cadena?",
      "¿Por qué encontrar una cadena a una raíz no significa que el certificado sea válido?",
      "¿Qué prueba una firma CSR y qué no prueba?",
      "Compare CRL, OCSP, grapado OCSP y certificados de corto plazo.",
      "¿Por qué el servidor normalmente no debería enviar la raíz durante el protocolo de enlace?",
      "¿Cuál es la diferencia entre almacén de confianza y almacén de claves?",
      "Describa una estrategia de rotación cuando la CA intermedia también será reemplazada.",
      "En mTLS, ¿por qué validar la cadena no es suficiente para autorizar la llamada?",
      "Un certificado tiene una cadena válida, serverAuth y validez correcta, pero el acceso falla por nombre de host. Explicar.",
      "¿Cómo cambia un equilibrador de carga frente a una puerta de enlace el análisis del certificado?",
      "¿Qué riesgos surgen cuando una organización instala su raíz privada en el almacén de confianza global de los servidores?",
      "Cree una lista de verificación para diagnosticar la imposibilidad de obtener el certificado del emisor local.",
      "Explique por qué monitorear solo los archivos en el repositorio no garantiza una renovación exitosa.",
      "Proponer una arquitectura de CA para producción, aprobación, certificados de servidor y certificados de cliente."
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
    "caption": "Glosario de certificados digitales, PKI y X.509.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "IRA",
        "Identificador de clave de autoridad; ayuda a identificar la clave del remitente."
      ],
      [
        "Ancla de confianza",
        "Clave o certificado configurado como punto de confianza inicial."
      ],
      [
        "AQUÍ",
        "Autoridad de Certificación; entidad que firma certificados y datos de estado."
      ],
      [
        "CRL",
        "Lista firmada de certificados revocados."
      ],
      [
        "RSE",
        "Solicitud de certificado que incluye clave pública y prueba de propiedad."
      ],
      [
        "DER",
        "Codificación binaria determinista para estructuras ASN.1."
      ],
      [
        "DN",
        "Nombre distinguido compuesto por atributos de nombre."
      ],
      [
        "EKU",
        "Uso Extendido de Claves; fines de aplicación autorizados."
      ],
      [
        "HSM",
        "Módulo que protege claves y realiza operaciones criptográficas."
      ],
      [
        "OCSP",
        "Protocolo de consulta online del estado del certificado."
      ],
      [
        "OID",
        "Identificador de objeto numérico utilizado en algoritmos, extensiones y políticas."
      ],
      [
        "PEM",
        "Representación textual Base64 con encabezados."
      ],
      [
        "PKCS#12",
        "Contenedor que puede almacenar clave privada, certificado y cadena."
      ],
      [
        "RANA",
        "Autoridad de Registro; valida los datos y aprueba la emisión."
      ],
      [
        "SAN",
        "Nombre alternativo del sujeto; nombres e identificadores vinculados al certificado."
      ],
      [
        "ESQUÍ",
        "Identificador de clave de asunto; identificador de clave pública del certificado."
      ],
      [
        "tienda de confianza",
        "Conjunto de anclajes confiables y certificados para validación."
      ],
      [
        "X.509",
        "Estándar para certificados, CRL y estructuras relacionadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas.",
    "id": "referencias-oficiales-y-lecturas-recomendadas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "RFC 5280: Certificado de infraestructura de clave pública X.509 de Internet y perfil CRL",
      "RFC 6818 - Actualizaciones de RFC 5280",
      "RFC 9618: actualizaciones de la validación de políticas X.509",
      "RFC 2986: Sintaxis de solicitud de certificación PKCS #10",
      "RFC 6960: Protocolo de estado de certificado en línea",
      "RFC 9608: no hay revocación disponible para certificados X.509",
      "RFC 8555 - Entorno de gestión automática de certificados",
      "RFC 9162 - Transparencia de certificados Versión 2.0",
      "RFC 8659 - Autorización de la autoridad de certificación DNS",
      "NIST SP 800-57 Parte 1 Rev. 5 - Recomendación para la gestión de claves",
      "Foro CA/Browser: Requisitos básicos para certificados de servidor TLS",
      "Microsoft: API seguras mediante autenticación de certificado de cliente en API Management",
      "Microsoft: backend de gestión de API segura mediante certificados de cliente",
      "Microsoft: agregue un certificado de CA personalizado a API Management",
      "Axway - Filtros de validación de certificados",
      "Axway: administración de API Gateway y comprobaciones de la cadena de certificados"
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota sobre actualización regulatoria"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5280 sigue siendo la base del perfil PKIX, pero recibe actualizaciones e interactúa con estándares posteriores. Los requisitos de Web PKI y la documentación del producto cambian con el tiempo. Al aplicar contenido en producción, confirme la versión actual de las políticas de CA, CA/foro del navegador, tiempo de ejecución y puerta de enlace utilizados."
  }
];
