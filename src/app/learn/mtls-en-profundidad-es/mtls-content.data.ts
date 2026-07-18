import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const MTLS_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Autenticación mutua en la ruta empresarial de una API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/overview.svg",
    "alt": "Descripción general de la autenticación mutua en la ruta empresarial de una API",
    "caption": "Descripción general: desde la presentación del certificado hasta la autorización del consumidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "En capítulos anteriores, los certificados, PKI y la confianza X.509 se presentaron como fundamentos de la protección de API. Este capítulo profundiza en mutual TLS, o mTLS, el mecanismo en el que el cliente y el servidor se autentican entre sí durante el protocolo de enlace TLS. Además de validar el certificado del servidor, el cliente presenta su propia credencial y demuestra que controla la clave privada correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "En entornos empresariales, mTLS se utiliza en integraciones de máquina a máquina, exponiendo API a socios, comunicación entre microservicios, service meshes, acceso administrativo y flujos OAuth con tokens vinculados a certificados. Sin embargo, habilitar el requisito de certificado de cliente es sólo el comienzo. La seguridad real depende de la emisión, la cadena de confianza, la validación de la extensión, el mapeo de identidad, la autorización, la rotación, la revocación y la observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "Para los profesionales que trabajan con API Gateways, es esencial comprender en qué punto finaliza la sesión TLS. Una gateway puede autenticar al consumidor y crear una conexión diferente con el backend; un equilibrador puede terminar TLS antes que la gateway; o una estructura puede establecer nuevas identidades de workload en el tráfico interno. Cada salto tiene certificados, truststores, tiempos de espera y responsabilidades independientes."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo no es sólo reconocer los mensajes de handshake, sino también construir un modelo operativo completo. Al final, el lector debería poder diseñar políticas de confianza, separar la autenticación de la autorización, planificar el ciclo de vida de las credenciales e investigar fallos como desconocido_ca, certificado_incorrecto, certificado_expirado, certificado faltante y divergencia de identidad."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Siga las explicaciones con los comandos y laboratorios presentados. Registre siempre: quién inicia la conexión, quién solicita el certificado, qué cadena se presentó, qué truststore se utiliza, qué identidad se extrajo y qué política de autorización decidió el acceso."
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
      "Diferenciar TLS unidireccional, autenticación mutua y autorización de aplicaciones.",
      "Explique CertificateRequest, Certificate, CertificateVerify y Finished en TLS 1.3.",
      "Cadena de validación, período de validez, uso de clave, uso de clave extendido, SAN, algoritmos y revocación.",
      "Diseñe truststores y paquetes de confianza segmentados por dominio de integración.",
      "Asigne certificados a identidades canónicas de consumidores, socios y workloads.",
      "Aplique mTLS a API Gateways, service meshes y comunicación con backends.",
      "Comprenda la autenticación OAuth mediante mTLS y tokens vinculados a certificados.",
      "Planificar la emisión, almacenamiento, rotación, revocación y respuesta de compromiso.",
      "Utilice OpenSSL, curl, Java y herramientas de captura para solucionar problemas.",
      "Defina métricas, registros, alertas y controles reforzados para operaciones a escala."
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
      "9.1 De TLS unidireccional a mTLS",
      "Handshake de 9.2 mTLS en TLS 1.3",
      "9.3 Validación completa del certificado de cliente",
      "9.4 De la autenticación a la autorización",
      "9.5 mTLS en API Gateways",
      "9.6 mTLS entre microservicios y service mesh",
      "9.7 OAuth 2.0 con mutual TLS",
      "9.8 Ciclo de vida de certificados y claves",
      "9.9 Patrones arquitectónicos corporativos",
      "9.10 Herramientas prácticas de configuración y diagnóstico",
      "9.11 Fallos frecuentes y método de troubleshooting",
      "9.12 Observabilidad, auditoría y métricas",
      "9.13 Decisiones de hardening y seguridad",
      "9.14 Estudio de caso: Integración de pagos B2B",
      "9.15 Resumen técnico y revisión",
      "Referencias técnicas, ejercicios y lista de verificación operativa."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.1 De TLS unidireccional a mTLS",
    "id": "9-1-de-tls-unidireccional-a-mtls"
  },
  {
    "kind": "paragraph",
    "text": "En el uso más común de HTTPS, la autenticación se produce únicamente de servidor a cliente. El servidor presenta su certificado, el cliente construye y valida una cadena de confianza, verifica el nombre esperado y participa en la negociación de la clave de sesión. Este proceso protege la confidencialidad y la integridad del tráfico y reduce el riesgo de que el cliente hable con un servidor impostor."
  },
  {
    "kind": "paragraph",
    "text": "Sin embargo, el cliente normalmente no presenta una identidad criptográfica durante el protocolo de enlace. Su autenticación se realiza posteriormente, dentro del protocolo de la aplicación, a través de una contraseña, sesión, clave API, token OAuth, firma de mensaje u otro mecanismo. mTLS añade una segunda autenticación al propio establecimiento del canal: el servidor solicita un certificado al cliente, valida ese certificado y exige prueba de posesión de la clave privada correspondiente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Qué se autentica"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-01.svg",
    "alt": "Comparación entre la autenticación TLS unidireccional y la autenticación mutua TLS",
    "caption": "Figura 1: Comparación conceptual entre TLS unilateral y TLS mutua."
  },
  {
    "kind": "paragraph",
    "text": "Un certificado de cliente no autentica una \"solicitud HTTP\" de forma aislada; autentica la entidad que participa en la sesión TLS. En una conexión persistente, varias solicitudes pueden compartir el mismo canal autenticado. Esto mejora la eficiencia, pero requiere cuidado al relacionar la identidad TLS, la agrupación de conexiones, la multiplexación HTTP/2, los servidores proxy intermedios y el contexto de autorización de aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "La prueba criptográfica se produce porque la parte autenticada firma los datos derivados de la transcripción del protocolo de enlace con su clave privada. La clave privada no se envía a través de la red. El certificado lleva la clave pública y los atributos firmados por una autoridad de certificación, mientras que la firma del protocolo de enlace demuestra que la entidad que presentó el certificado controla la clave privada correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 define contextos separados para la firma del cliente y del servidor en el mensaje CertificateVerify. [1]"
  },
  {
    "kind": "subhead",
    "text": "Concepto clave"
  },
  {
    "kind": "paragraph",
    "text": "mTLS no es sólo “HTTPS con dos certificados”. Es una composición de tres garantías: cadena de confianza, prueba de posesión de la clave privada y vinculación de identidad a la sesión TLS."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lo que mTLS no puede resolver solo"
  },
  {
    "kind": "paragraph",
    "text": "Incluso cuando el certificado sea válido, aún debe decidir qué puede hacer esa identidad. La autenticación responde a “quién participa en la conexión”; La autorización responde \"a qué recursos y operaciones puede acceder esta identidad\". Permitir cualquier certificado emitido por una CA corporativa puede ampliar excesivamente la superficie de acceso si la misma jerarquía emite certificados para cientos de sistemas con diferentes propósitos."
  },
  {
    "kind": "paragraph",
    "text": "mTLS tampoco reemplaza la validación de entradas, la limitación de tasas, la segregación de funciones, la protección contra abuso lógico, la auditoría o la seguridad del código. Puede reducir los riesgos de credenciales reutilizables y clientes no autorizados, pero un consumidor autenticado aún es capaz de enviar cargas útiles con formato incorrecto, explotar permisos excesivos o utilizar la API fuera de su propósito previsto."
  },
  {
    "kind": "subhead",
    "text": "Atención"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trate \"certificado válido\" como sinónimo de \"acceso completo\". El resultado de la validación debe incorporarse a una política de autorización explícita."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Handshake de 9.2 mTLS en TLS 1.3",
    "id": "handshake-de-9-2-mtls-en-tls-1-3"
  },
  {
    "kind": "paragraph",
    "text": "El protocolo de enlace TLS 1.3 negocia la versión, los algoritmos, los parámetros de intercambio de claves y el material criptográfico para proteger la sesión. Cuando el servidor requiere autenticación del cliente, envía CertificateRequest. Este mensaje le informa que se espera un certificado de cliente y puede indicar autoridades de certificación y algoritmos de firma aceptados."
  },
  {
    "kind": "paragraph",
    "text": "Luego el servidor envía su propia cadena, su prueba de posesión y el mensaje Finalizado. El cliente responde con su cadena de certificados, el mensaje CertificateVerify y su mensaje Finalizado. La firma en CertificateVerify se calcula en función de la transcripción del protocolo de enlace, con un contexto específico."
  },
  {
    "kind": "paragraph",
    "text": "Esto evita que una firma realizada con otro propósito se reutilice como prueba válida dentro de TLS. El mensaje Finalizado confirma la integridad y propiedad de los secretos derivados de la negociación. [1]"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Solicitud de certificado y selección de certificado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-02.svg",
    "alt": "Secuencia de protocolo de enlace simplificada con autenticación mutua en TLS 1.3",
    "caption": "Figura 2: Secuencia de autenticación mutua simplificada en TLS 1.3."
  },
  {
    "kind": "paragraph",
    "text": "Un cliente puede tener varios certificados. La selección correcta depende de la información enviada por el servidor, los algoritmos admitidos, el emisor admitido, el propósito del certificado y la política local del cliente. En integraciones automatizadas, esta decisión debe ser determinista."
  },
  {
    "kind": "paragraph",
    "text": "Una configuración ambigua puede seleccionar un certificado incorrecto o fallar después de una actualización del truststore. La lista de autoridades aceptables sirve como guía, pero no debe confundirse con la autorización final. El servidor aún necesita validar la cadena presentada, las extensiones y las reglas de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "En entornos con múltiples PKI, es común separar los paquetes de confianza por dominio de integración para evitar que una CA confiable para un contexto sea aceptada incorrectamente en otro."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "CertificateVerify: prueba de posesión"
  },
  {
    "kind": "paragraph",
    "text": "La presencia de un certificado por sí sola no prueba que el participante controle la clave privada. Cualquiera puede copiar un certificado público. El mensaje CertificateVerify contiene una firma producida con la clave privada correspondiente a la clave pública del certificado."
  },
  {
    "kind": "paragraph",
    "text": "La otra parte verifica la firma y confirma que el presentador posee la clave necesaria para participar en esa sesión. Esta distinción es importante durante los incidentes. La filtración de un certificado público no compromete la identidad; La filtración de la clave privada, sí."
  },
  {
    "kind": "paragraph",
    "text": "Por lo tanto, la protección del archivo de claves, el almacén de claves, el secreto del clúster, el HSM o el mecanismo de firma remota es fundamental."
  },
  {
    "kind": "paragraph",
    "text": "Los permisos de archivos, el control de acceso, la no exportabilidad, la rotación y la auditoría deben considerarse controles de seguridad primarios."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TLS 1.2 y TLS 1.3"
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Comparación operativa entre TLS 1.2 y TLS 1.3.",
    "headers": [
      "Apariencia",
      "TLS 1.2",
      "TLS 1.3"
    ],
    "rows": [
      [
        "Negociación",
        "Más opciones históricas y combinaciones heredadas.",
        "Montaje y desmontaje simplificados de construcciones antiguas inseguras."
      ],
      [
        "Autenticación del cliente",
        "CertificateRequest, Certificado y CertificateVerify según suite y flujo.",
        "Autenticación de certificado con transcripción y contexto definidos para CertificateVerify."
      ],
      [
        "Latencia",
        "Un handshake completo normalmente requiere más intercambios.",
        "El handshake maestro reduce los viajes de ida y vuelta."
      ],
      [
        "Algoritmos",
        "Permite combinaciones que necesitan restricción explícita.",
        "Elimina varias opciones obsoletas, pero aún requiere una política corporativa."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Decisión arquitectónica"
  },
  {
    "kind": "paragraph",
    "text": "Admitir TLS 1.2 por compatibilidad no significa habilitar ningún algoritmo heredado. La política debería restringir versiones, cifrados, firmas y curvas según el riesgo y los requisitos corporativos. NIST SP 800-52 Rev. 2 proporciona pautas de selección y configuración de TLS. [4]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.3 Validación completa del certificado de cliente",
    "id": "9-3-validacion-completa-del-certificado-de-cliente"
  },
  {
    "kind": "paragraph",
    "text": "La validación no debe limitarse a comprobar si el certificado se encuentra dentro de su fecha de caducidad. El servidor necesita crear una cadena hasta un ancla de confianza autorizada, verificar firmas, restricciones de CA, extensiones críticas, políticas aplicables y propósito de uso. El perfil del certificado X.509 y el algoritmo de validación de ruta se definen en RFC 5280, posteriormente actualizado y aclarado por otros documentos. [2][5] En una API empresarial, la regla de aceptación suele ser más restrictiva que la validación genérica X.509."
  },
  {
    "kind": "paragraph",
    "text": "Un certificado puede ser criptográficamente válido, pero pertenecer a una cadena que no fue aprobada para ese producto, tener una SAN no estándar, usar un propósito incompatible, haber sido emitido para un entorno diferente o representar una aplicación desactivada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Controles esenciales"
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Comprobaciones imprescindibles a la hora de validar el certificado de cliente.",
    "headers": [
      "Verificación",
      "¿Qué se debe evaluar?",
      "Riesgo cuando se ignora"
    ],
    "rows": [
      [
        "cadena de confianza",
        "Suscripciones a una CA raíz o intermedia de confianza explícita.",
        "Aceptación de certificados emitidos por jerarquía no autorizada."
      ],
      [
        "Validez temporal",
        "notBefore y notAfter, reloj confiable y margen controlado.",
        "Uso de un certificado caducado o aún no válido."
      ],
      [
        "Restricciones básicas",
        "Intermedios marcados como CA y profundidad respetada.",
        "Construcción de cadena no válida o uso indebido del certificado final como CA."
      ],
      [
        "Uso clave/EKU",
        "Uso de clave y clientAuth compatibles con el propósito.",
        "Certificado emitido para otro fin utilizado como cliente TLS."
      ],
      [
        "SAN/identidad",
        "Formato, espacio de nombres y normalización aprobados.",
        "Mapeo ambiguo o falsos positivos."
      ],
      [
        "Revocación",
        "CRL, OCSP o estrategia equivalente.",
        "Continuidad del acceso después del compromiso."
      ],
      [
        "Algoritmos",
        "Firmas, curvas y tamaños permitidos.",
        "Dependencia de algoritmos débiles u obsoletos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore no es una colección indiscriminada de CA"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-03.svg",
    "alt": "Pasos de validación y aceptación del certificado de cliente",
    "caption": "Figura 3: Pasos de validación y aceptación del certificado del cliente."
  },
  {
    "kind": "paragraph",
    "text": "El truststore define qué anclas pueden iniciar una cadena aceptada. En entornos empresariales, reutilizar el truststore global del sistema operativo puede resultar inapropiado para las API mTLS, ya que a menudo contiene autoridades públicas destinadas a autenticar servidores de Internet. Para los clientes empresariales, es preferible mantener conjuntos de confianza dedicados al dominio de integración."
  },
  {
    "kind": "paragraph",
    "text": "También se recomienda separar la confianza por contexto: los socios externos, las aplicaciones internas, las workloads de malla y el acceso administrativo pueden tener raíces y políticas diferentes. Esta segmentación reduce el impacto de una emisión inadecuada y facilita la revocación de una jerarquía sin interrumpir integraciones no relacionadas."
  },
  {
    "kind": "subhead",
    "text": "Buena práctica"
  },
  {
    "kind": "paragraph",
    "text": "Trate cada paquete de confianza como una política de seguridad versionada. Propietario del registro, propósito, CA incluidas, entornos, consumidores afectados, fecha de revisión y proceso de cambio."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidad en Subject y SAN"
  },
  {
    "kind": "paragraph",
    "text": "Históricamente, muchas implementaciones extraían la identidad del nombre común en el asunto. En las arquitecturas modernas, el Nombre alternativo del sujeto es más apropiado para identidades estructuradas. La SAN puede transportar DNS, URI, dirección IP, correo electrónico u otros nombres."
  },
  {
    "kind": "paragraph",
    "text": "Para workloads, los URI con espacios de nombres corporativos o las identidades de estilo SPIFFE pueden reducir la ambigüedad y facilitar las políticas automatizadas. El punto central no es sólo elegir un campo, sino definir un contrato de identidad. El formato debe ser único, estable, no reutilizable y vinculado al ciclo de vida de la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Los nombres basados únicamente en el nombre del host pueden resultar inapropiados cuando la workload es efímera; los nombres humanos pueden cambiar; Los identificadores de proyecto se pueden reutilizar. Una buena identidad técnica sigue siendo rastreable hasta el propietario y el inventario corporativo."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo conceptual de espacio de nombres"
  },
  {
    "kind": "paragraph",
    "text": "Ejemplo de SAN URI para una identidad de workload:"
  },
  {
    "kind": "code",
    "text": "URI: spiffe://corp.exemplo/financeiro/pagamentos/worker-a\nDominio de confianza: corp.exemplo\nÁrea: financeiro\nProducto: pagamentos\nWorkload: worker-a"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.4 De la autenticación a la autorización",
    "id": "9-4-de-la-autenticacion-a-la-autorizacion"
  },
  {
    "kind": "paragraph",
    "text": "Después de validar el certificado, el componente perimetral debe extraer una identidad canónica. Esta identidad no debe ser el certificado completo ni una concatenación inestable de campos. Normalmente, se elige un atributo principal, como SAN URI, SAN DNS o identificador registrado, y se aplica una normalización estricta."
  },
  {
    "kind": "paragraph",
    "text": "El resultado está asociado con un registro de consumidor o de workload. Luego, la autorización puede considerar la identidad, la ruta, el método HTTP, el entorno, el alcance, el contrato, el tiempo, el origen de la red y el contexto adicional. En una API Gateway, el certificado puede seleccionar un plan de acceso, una lista de API, cuotas y políticas."
  },
  {
    "kind": "paragraph",
    "text": "En una service mesh, la identidad de la workload se puede utilizar en reglas de servicio a servicio, por ejemplo: solo el servicio de facturación puede invocar la operación de liquidación."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estrategias de mapeo"
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Estrategias de mapeo de identidad X.509.",
    "headers": [
      "Estrategia",
      "ventaja",
      "Limitación"
    ],
    "rows": [
      [
        "DN de asunto completo",
        "Disponible en prácticamente todos los certificados.",
        "Puede variar según el orden, el escape y los atributos opcionales."
      ],
      [
        "nombre común",
        "Sencillo y ampliamente conocido.",
        "Puede resultar ambiguo y no es el mejor campo para la identidad moderna."
      ],
      [
        "DNS SAN",
        "Adecuado para identidades asociadas con nombres DNS.",
        "Puede confundir la identidad de la workload con la ubicación."
      ],
      [
        "SAN URI",
        "Permite espacios de nombres estructurados y semánticos.",
        "Requiere una gobernanza y un apoyo coherentes."
      ],
      [
        "huella digital",
        "Identifica un problema específico.",
        "Cambia en cada rotación."
      ],
      [
        "hash SPKI",
        "Puede sobrevivir a la reemisión con la misma clave.",
        "Puede desalentar la rotación de claves."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidad estable versus instancia de certificado"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación tiene una identidad lógica; un certificado es una credencial temporal de esa identidad. La autorización debe basarse preferentemente en la identidad lógica, mientras que el inventario registra el número de serie, el emisor, la huella digital, la clave y la validez de la emisión actual. Esto le permite rotar certificados sin reconfigurar todos los permisos."
  },
  {
    "kind": "paragraph",
    "text": "Hay casos en los que la política requiere fijar una cuestión o clave específica. Esta técnica puede aumentar el control, pero aumenta los costos operativos. Si la regla está vinculada a la huella digital, cada rotación requiere una actualización coordinada."
  },
  {
    "kind": "paragraph",
    "text": "Si está vinculado a la clave, la rotación criptográfica ya no es transparente. El uso debe ser consciente y reservado para escenarios donde la confianza en la CA y los atributos no es suficiente."
  },
  {
    "kind": "subhead",
    "text": "Regla de diseño"
  },
  {
    "kind": "paragraph",
    "text": "Separe tres objetos: identidad de la aplicación, credencial X.509 actual y política de autorización. Mezclar estos conceptos crea acoplamiento y hace que la rotación sea más riesgosa."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Propagación de identidad después de la terminación de TLS"
  },
  {
    "kind": "paragraph",
    "text": "Cuando la gateway finaliza la sesión mTLS, el backend no recibe directamente el certificado original en el protocolo de enlace. Si es necesario que la identidad llegue al servicio, la gateway debe propagarla de manera confiable. Insertar un encabezado simple como X-Client-Cert o X-Client-Id solo es seguro cuando el backend acepta tráfico exclusivamente desde la gateway y el canal interno evita la inyección o alteración por parte de terceros."
  },
  {
    "kind": "paragraph",
    "text": "Un enfoque sólido es eliminar los encabezados provenientes del cliente, generar un nuevo atributo a partir del certificado validado, firmar o asegurar el contexto y establecer mTLS entre la gateway y el backend. En arquitecturas más avanzadas, la identidad se puede representar en un token interno de corta duración emitido por un componente confiable. El servicio debe distinguir la identidad del cliente original, la identidad de la gateway y el contexto de delegación."
  },
  {
    "kind": "subhead",
    "text": "Pipeline recomendada"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Elimine los encabezados de identidad recibidos externamente.",
      "Cadena de validación, validez, EKU, SAN y revocación.",
      "Resuelva SAN URI -> consumer_id corporativo.",
      "Aplicar autorización y cupo.",
      "Cree un contexto interno firmado y de corta duración.",
      "Reenviar al backend a través del nuevo canal mTLS."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.5 mTLS en API Gateways",
    "id": "9-5-mtls-en-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es un punto natural para aplicar mTLS en integraciones externas porque concentra listeners, certificados de servidor, truststores de clientes, políticas, registros y limitación de velocidad. Puede rechazar la conexión antes de procesar HTTP, lo que reduce la exposición de las API a consumidores sin credenciales confiables. También centraliza las reglas de incorporación y la segregación por dominio o producto."
  },
  {
    "kind": "paragraph",
    "text": "Esta centralización no elimina la necesidad de un diseño cuidadoso. Debe decidir si la gateway requiere un certificado para todo el listener, para nombres de host específicos o para rutas específicas; cómo tratar a los clientes que no utilizan mTLS; cómo seleccionar truststores; cómo publicar la cadena correcta; cómo registrar fallas en el handshake; y cómo propagar la identidad validada a los servicios internos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Listener dedicado o compartido"
  },
  {
    "kind": "table",
    "caption": "Tabla 4: Alternativas de aplicación y escucha de mTLS.",
    "headers": [
      "modelo",
      "Descripción",
      "cuando usar"
    ],
    "rows": [
      [
        "Listener dedicado",
        "El nombre de host y el puerto únicos requieren un certificado de cliente para cada conexión.",
        "Integraciones B2B críticas, fuerte segregación y operación predecible."
      ],
      [
        "mTLS opcional",
        "El servidor solicita un certificado, pero también acepta clientes sin credencial.",
        "Migración controlada o rutas mixtas, con estricta autorización."
      ],
      [
        "Política después de la terminación",
        "Un proxy de front-end recopila el certificado y pasa el contexto protegido a la gateway.",
        "Cuando el terminador TLS está fuera de la gateway y existe una confianza operativa sólida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Terminación, recriptografía y passthrough"
  },
  {
    "kind": "paragraph",
    "text": "En la terminación TLS, la gateway descifra el tráfico, valida el cliente y crea una nueva conexión con el backend. Esto le permite inspeccionar HTTP y aplicar políticas API. En el paso a través, la gateway de capa 4 reenvía la conexión sin terminar TLS; el backend realiza la autenticación."
  },
  {
    "kind": "paragraph",
    "text": "Passthrough conserva la autenticación de un extremo a otro, pero limita las capacidades de la Capa 7 en el medio. El nuevo cifrado combina la terminación externa con nuevos TLS o mTLS internos. Este patrón es común porque permite el control de API en la gateway y asegura el recorrido hacia el servicio."
  },
  {
    "kind": "paragraph",
    "text": "Es importante no decir que existe \"mTLS de extremo a extremo\" cuando hay dos sesiones distintas. Hay dos relaciones de confianza: cliente-gateway y gateway-backend. La identidad del cliente original debe propagarse por separado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.6 mTLS entre microservicios y service mesh",
    "id": "9-6-mtls-entre-microservicios-y-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas de microservicios, mTLS puede autenticar workloads y proteger el tráfico de este a oeste. Una service mesh normalmente utiliza servidores proxy secundarios o nodos de plano de datos para establecer automáticamente conexiones mTLS. El plano de control distribuye identidades, certificados de corta duración, paquetes de confianza y políticas."
  },
  {
    "kind": "paragraph",
    "text": "Esto reduce la necesidad de que cada aplicación implemente directamente toda la lógica TLS. Sin embargo, la automatización no elimina la gobernanza. La organización necesita definir el dominio de confianza, la identidad de cada workload, el proceso de certificación, la emisión, la rotación, la política de autorización y los límites entre clústeres, entornos y unidades de negocio."
  },
  {
    "kind": "paragraph",
    "text": "Una estructura configurada en modo permisivo puede aceptar tráfico de texto sin formato y mTLS simultáneamente, lo que puede mantener rutas de derivación durante las migraciones."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidad de workload"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-06.svg",
    "alt": "Identidades de workload protegidas por mutual TLS en una service mesh",
    "caption": "Figura 6: Identidades de workloads en una service mesh."
  },
  {
    "kind": "paragraph",
    "text": "Una identidad de workload debe representar el software en ejecución, no solo el nodo o la dirección IP. Los contenedores y las vainas son efímeros; Las IP cambian y se pueden reutilizar. Al asociar el certificado con la cuenta de servicio, el espacio de nombres, el clúster y la workload, la política sigue la aplicación en lugar de la topología de red momentánea."
  },
  {
    "kind": "paragraph",
    "text": "El proceso de emisión debe depender de algún tipo de certificación: identidad de plataforma, token de cuenta de servicio, metadatos de instancia, TPM, nodo registrado u otra evidencia. Si algún proceso puede solicitar un certificado en nombre de otra workload, mTLS simplemente cifrará una identidad falsa. Por tanto, la seguridad del remitente y el bootstrap es tan importante como el protocolo de enlace."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Modos permisivos y estrictos"
  },
  {
    "kind": "table",
    "caption": "Modos permisivos y estrictos en una service mesh.",
    "headers": [
      "Modo",
      "Comportamiento",
      "Riesgo operacional"
    ],
    "rows": [
      [
        "permisivo",
        "Acepta mTLS y conexiones de texto sin formato.",
        "Facilita la migración, pero puede mantener una derivación silenciosa."
      ],
      [
        "estricto",
        "Requiere mTLS para tráfico cubierto.",
        "Más seguro; Requiere inventario completo y compatibilidad."
      ],
      [
        "Discapacitado",
        "No utiliza mTLS en ese ámbito.",
        "Sólo es adecuado cuando otro control ofrece una seguridad equivalente y documentada."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Una migración segura puede comenzar con la telemetría, identificar dependencias, habilitar la emisión automática, aplicar mTLS permisivo por un período corto y evolucionar hacia un modo estricto con una fecha definida."
  },
  {
    "kind": "paragraph",
    "text": "Dejar el entorno indefinidamente permisivo crea una falsa sensación de confianza cero. El objetivo debe ser medible: porcentaje de conexiones autenticadas, workloads incompatibles y excepciones con fecha límite. También es necesario validar la salida."
  },
  {
    "kind": "paragraph",
    "text": "Un servicio autenticado dentro de la estructura puede iniciar conexiones a destinos externos. Las políticas de salida, las puertas de salida y la identidad de las personas que llaman ayudan a prevenir la filtración y hacen que la auditoría sea más completa."
  },
  {
    "kind": "subhead",
    "text": "Atención"
  },
  {
    "kind": "paragraph",
    "text": "El cifrado automático sin autorización de workload a workload produce una red protegida pero aún excesivamente abierta. mTLS debe combinarse con políticas explícitas sobre quién puede llamar a quién."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.7 OAuth 2.0 con mutual TLS",
    "id": "9-7-oauth-2-0-con-mutual-tls"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 normalmente autentica a los clientes en el servidor de autorización y emite tokens para acceder a los recursos. RFC 8705 define dos usos principales de mTLS: autenticación de cliente en el punto final del token y tokens de acceso vinculados a certificados. La autenticación puede utilizar certificados emitidos por PKI o certificados autofirmados previamente registrados, según el modelo adoptado. [3] En la autenticación del cliente, el servidor de autorización valida la conexión mTLS y asocia el certificado con client_id."
  },
  {
    "kind": "paragraph",
    "text": "Esto reemplaza o complementa los secretos compartidos. Debido a que la clave privada no se transmite, disminuye el riesgo de reutilizar un secreto estático. Aun así, es necesario proteger la clave privada y el registro de certificados debe admitir la rotación."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Tokens vinculados a certificados"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-07.svg",
    "alt": "Token de OAuth vinculado al certificado presentado en la conexión mTLS",
    "caption": "Figura 7: Token de OAuth vinculado al certificado mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Quienquiera que lo posea puede utilizar un token al portador tradicional. Si se extrae, otro proceso puede presentarlo al servidor de recursos. Un token vinculado a certificado incluye o hace referencia a la clave del cliente/huella digital del certificado."
  },
  {
    "kind": "paragraph",
    "text": "El servidor de recursos requiere mTLS y verifica que la credencial utilizada en la conexión coincida con el enlace del token. Por lo tanto, el token y la clave privada deben estar presentes juntos. Esta técnica reduce el valor de un token robado de forma aislada pero introduce requisitos de interoperabilidad."
  },
  {
    "kind": "paragraph",
    "text": "El servidor de autorización, la gateway y el servidor de recursos deben ponerse de acuerdo sobre la información de confirmación, el certificado presentado y la forma de comparación. En arquitecturas con servidores proxy, la terminación mTLS debe preservar evidencia confiable para el componente que valida el enlace."
  },
  {
    "kind": "subhead",
    "text": "Concepto clave"
  },
  {
    "kind": "paragraph",
    "text": "El token vinculado al certificado no elimina la caducidad, la audiencia, el alcance y la validación del emisor. Agrega prueba de posesión al uso del token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Flujo resumido"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "El cliente establece mTLS con el servidor de autorización y solicita un token.",
      "El servidor de autorización autentica al cliente y vincula el token a la clave/certificado presentado.",
      "El cliente establece mTLS con el servidor de recursos o gateway y envía el token.",
      "El servidor de recursos valida la firma, el emisor, la audiencia, el vencimiento, los alcances y la confirmación del certificado."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "La solicitud sólo se acepta cuando la ficha y el comprobante de posesión coinciden."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "PKI versus certificado autofirmado registrado"
  },
  {
    "kind": "table",
    "caption": "PKI versus certificado autofirmado registrado.",
    "headers": [
      "modelo",
      "Cómo se establece la confianza",
      "Implicación"
    ],
    "rows": [
      [
        "PKI",
        "Encadenamiento a CA confiable y asociación por atributos de certificado.",
        "Escalar con la gobernanza de las emisiones; requiere una PKI bien gestionada."
      ],
      [
        "Registrado autofirmado",
        "El certificado o la clave pública se registra directamente en el cliente OAuth.",
        "Reduce la dependencia de AC, pero requiere una actualización coordinada en cada rotación."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "El registro directo puede ser adecuado para algunos clientes de alta importancia, pero el costo crece con la cantidad de integraciones y entornos. La decisión debe considerar escala, automatización, segregación y capacidad de revocación."
  },
  {
    "kind": "paragraph",
    "text": "Cuando la gateway valida el token y finaliza mTLS, debe verificar el enlace antes de reenviarlo. Pasar solo el token de portador al backend sin contexto puede ser aceptable si la gateway es el punto de cumplimiento confiable y el canal interno está protegido. Si el backend también valida la prueba de posesión, debe recibir evidencia autenticada del certificado o participar directamente en mTLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.8 Ciclo de vida de certificados y claves",
    "id": "9-8-ciclo-de-vida-de-certificados-y-claves"
  },
  {
    "kind": "paragraph",
    "text": "La mayoría de los problemas de mTLS en producción son operativos: certificado caducado, cadena incompleta, reloj incorrecto, truststore desactualizado, rotación no superpuesta, clave inaccesible o revocación que no funciona. El diseño debe asumir que los certificados caducan y serán reemplazados. La renovación no es una excepción; Es una parte normal del sistema."
  },
  {
    "kind": "paragraph",
    "text": "Un programa maduro mantiene un inventario de certificados, propietarios, aplicaciones, entornos, emisores, claves, fechas de vencimiento, dependencias y políticas. Las alertas deben comenzar lo suficientemente temprano para el diagnóstico y el cambio. La automatización de la emisión y distribución reduce los fallos manuales, pero debe incluir una sólida autenticación del solicitante y un seguimiento de auditoría."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Emisión y bootstrap"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-08.svg",
    "alt": "Ciclo de vida operativo de los certificados de cliente.",
    "caption": "Figura 8 - Ciclo de vida operativo del certificado."
  },
  {
    "kind": "paragraph",
    "text": "El primer certificado crea un problema de arranque: ¿cómo sabe la CA que el solicitante representa una determinada aplicación? La respuesta puede implicar aprobación humana, identidad de plataforma, secreto único, certificación de nodo, cuenta de servicio o canalización autenticada. El mecanismo debe evitar que un equipo solicite credenciales para la identidad de otro producto."
  },
  {
    "kind": "paragraph",
    "text": "La solicitud de firma debe generar la clave en el lugar más adecuado. En muchos casos, la clave privada debe permanecer en la workload, el HSM o el almacén de claves y solo se debe enviar la CSR. Generar la clave de forma centralizada y distribuirla aumenta la cantidad de lugares donde puede filtrarse."
  },
  {
    "kind": "paragraph",
    "text": "Cuando es necesaria la exportación, es necesario asegurar y auditar el transporte."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Rotación sin tiempo de inactividad"
  },
  {
    "kind": "paragraph",
    "text": "La rotación debe utilizar la superposición de ventanas. El servidor puede confiar temporalmente en las credenciales nuevas y antiguas mientras el cliente recibe el nuevo certificado y reinicia o recarga la configuración. Sólo después de confirmar el uso de la nueva credencial se elimina la antigua."
  },
  {
    "kind": "paragraph",
    "text": "A cambio de CA, la superposición debe incluir la cadena antigua y nueva, con un plan de reversión. Las aplicaciones necesitan saber cómo recargar certificados. Algunas bibliotecas cargan el almacén de claves sólo al inicio; otros admiten la recarga dinámica."
  },
  {
    "kind": "paragraph",
    "text": "Los reinicios coordinados pueden generar picos en las conexiones e indisponibilidad. Los certificados a corto plazo reducen la ventana de exposición, pero requieren una automatización y observabilidad del proceso de renovación altamente confiables."
  },
  {
    "kind": "subhead",
    "text": "Patrón de rotación"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Publicar nueva CA o cadena para validadores.",
      "Emita una nueva credencial para la misma identidad lógica.",
      "Acepte credenciales nuevas y antiguas durante la superposición.",
      "Confirmar la adopción mediante telemetría y pruebas sintéticas.",
      "Elimine la credencial anterior y revoque cuando corresponda."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Revocación"
  },
  {
    "kind": "paragraph",
    "text": "Revocar un certificado significa declarar que ya no debe aceptarse antes de su vencimiento. La PKI puede publicar CRL o responder a través de OCSP. La validación debe definir el comportamiento cuando el servicio de estado no está disponible: la apertura fallida conserva la disponibilidad, pero puede aceptar credenciales revocadas; El cierre fallido aumenta la seguridad, pero puede interrumpir las integraciones cuando el verificador no está disponible."
  },
  {
    "kind": "paragraph",
    "text": "En entornos internos con certificados muy cortos, algunas arquitecturas priorizan la caducidad rápida y el bloqueo de identidad en el plano de control. Esto no elimina la necesidad de una estrategia de compromiso inmediato. La elección entre CRL, OCSP, listas locales, eliminación de confianza, lista de denegación de serie o emisión breve debe documentarse y probarse."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Protección de clave privada"
  },
  {
    "kind": "table",
    "caption": "Protección de clave privada.",
    "headers": [
      "Ubicación",
      "Ventajas",
      "cuidado"
    ],
    "rows": [
      [
        "Archivo protegido",
        "Sencillo y compatible.",
        "Permisos, copias, respaldo, imagen de contenedor y logs."
      ],
      [
        "Almacén de claves PKCS#12/JKS",
        "Integración con plataformas Java.",
        "Contraseña, distribución, recarga y acceso a archivos."
      ],
      [
        "Secreto del orquestador",
        "Automatización y montaje en la workload.",
        "Controle el acceso al espacio de nombres, etc., instantáneas y rotación."
      ],
      [
        "HSM/KMS",
        "La clave puede no ser exportable y las operaciones están auditadas.",
        "Latencia, disponibilidad, costo y compatibilidad TLS."
      ],
      [
        "Sidecar/agente",
        "Emisión y rotación de aplicaciones de resúmenes.",
        "Confíe en el agente, el socket local y el aislamiento de la workload."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.9 Patrones arquitectónicos corporativos",
    "id": "9-9-patrones-arquitectonicos-corporativos"
  },
  {
    "kind": "paragraph",
    "text": "No existe una topología mTLS única para todos los casos. El diseño debe considerar los límites de confianza, la necesidad de inspección, la responsabilidad de los certificados, los requisitos de auditoría, el legado y la escala. Los siguientes son patrones recurrentes en las plataformas API."
  },
  {
    "kind": "paragraph",
    "text": "El elemento común es hacer explícitas las relaciones de confianza. Cada sesión de TLS tiene sus propios participantes y política. Cuando hay proxies, balanceadores y gateways, la conexión original finaliza en algún momento."
  },
  {
    "kind": "paragraph",
    "text": "A partir de ahí, se puede crear una nueva sesión con otra identidad. Los diagramas y la documentación deben evitar la impresión de que el certificado del cliente atraviesa mágicamente toda la cadena."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Patrón A - socio hacia el gateway"
  },
  {
    "kind": "paragraph",
    "text": "El socio recibe un certificado de cliente y se conecta a un nombre de host dedicado. La gateway valida la cadena, extrae la identidad, aplica cuota y autorización y registra el resultado. El backend confía en la gateway y recibe un contexto interno protegido."
  },
  {
    "kind": "paragraph",
    "text": "Este patrón es adecuado para B2B, Open Finance, integraciones de pagos y API con un contrato bidireccional. El principal riesgo es la propagación insegura de la identidad. El backend no debe aceptar el mismo encabezado de clientes que puedan omitir la gateway."
  },
  {
    "kind": "paragraph",
    "text": "Las reglas de red, el mTLS interno y la firma de contexto reducen este riesgo. El registro de socios debe vincular certificado, entorno, contratos, contactos y plan de rotación."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Patrón B - gateway como cliente mTLS del backend"
  },
  {
    "kind": "paragraph",
    "text": "La gateway utiliza su propia credencial para autenticarse en cada backend o dominio. Esta identidad representa la puerta de entrada, no el socio externo. El backend autoriza la gateway y, cuando es necesario, utiliza contexto adicional para aplicar permisos del consumidor original."
  },
  {
    "kind": "paragraph",
    "text": "Es un patrón útil para consolidar la salida y proteger los servicios heredados. El uso de la misma credencial de gateway para todos los backends crea un gran radio de impacto. Es preferible segmentar los certificados por entorno, clúster, dominio o producto."
  },
  {
    "kind": "paragraph",
    "text": "Por lo tanto, comprometer una clave no garantiza el acceso universal y se puede apuntar a la revocación."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Patrón C - passthrough hasta el servicio"
  },
  {
    "kind": "paragraph",
    "text": "Un equilibrador de capa 4 reenvía la sesión TLS al servicio, que valida directamente el certificado del cliente. La autenticación es realmente entre el cliente y el servicio, y los intermediarios no acceden a HTTP. Este patrón puede ser necesario cuando los requisitos requieren la terminación en el destino o cuando el servicio implementa un protocolo que no es HTTP."
  },
  {
    "kind": "paragraph",
    "text": "La limitación es la pérdida de la funcionalidad de la gateway de capa 7, como la transformación, la validación de la carga útil y el enrutamiento de contenido. La observabilidad también puede ser más difícil. Puede combinar el paso a través con la telemetría de capa 4, pero las políticas de API deben residir en el servicio u otro componente dentro de la sesión."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Patrón D: identidad de workload automatizada"
  },
  {
    "kind": "paragraph",
    "text": "La plataforma emite certificados cortos para workloads y la malla aplica mTLS y autorización. El desarrollador utiliza una identidad lógica, mientras que el plano de control gestiona los paquetes de confianza y rotación. Este estándar ofrece escala y reduce las credenciales estáticas, pero depende de la madurez de la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "El mayor riesgo es confiar ciegamente en la automatización. Es necesario auditar la certificación, el RBAC del emisor, el aislamiento entre espacios de nombres, la protección del socket del agente y la política de aprobación. Un atacante que pueda solicitar una identidad a otro servicio puede eludir todas las políticas basadas en esa identidad."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.10 Herramientas prácticas de configuración y diagnóstico",
    "id": "9-10-herramientas-practicas-de-configuracion-y-diagnostico"
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas de línea de comandos ayudan a verificar la cadena, el protocolo de enlace, los certificados presentados y las causas de las fallas. Deben usarse en ambientes autorizados y con cuidado de no exponer claves en historial, logs o procesos. Los ejemplos siguientes son deliberadamente genéricos y deben adaptarse al sistema operativo y la política de su organización."
  },
  {
    "kind": "paragraph",
    "text": "Los diagnósticos eficaces separan capas: resolución DNS, conectividad TCP, negociación TLS, validación del servidor, solicitud de certificado del cliente, selección de credenciales, validación de cadena, autorización HTTP y política API. Intentar resolver todo como “error 403” puede ocultar el hecho de que la conexión TLS ni siquiera se estableció."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Prueba con curl"
  },
  {
    "kind": "subhead",
    "text": "Ejemplo de llamada mTLS"
  },
  {
    "kind": "code",
    "text": "curl --verbose   --cert cliente.pem   --key cliente.key   --cacert ca-servidor.pem   https://api-\nparceiros.exemplo.com/v1/status"
  },
  {
    "kind": "paragraph",
    "text": "La opción --cert muestra el certificado del cliente; --key apunta a la clave privada; --cacert establece la confianza utilizada para validar el servidor. En producción, los archivos clave deben tener permisos restringidos. Cuando el certificado y la clave están en PKCS#12, el formato y la protección con contraseña dependen de la herramienta y la versión instalada."
  },
  {
    "kind": "paragraph",
    "text": "El modo detallado revela mensajes importantes, pero puede imprimir detalles confidenciales del encabezado. Los registros de diagnóstico no se deben compartir sin revisarlos. El código HTTP sólo aparece si el protocolo de enlace está completo; Los fallos anteriores suelen surgir como errores de TLS, alertas o terminación de la conexión."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Inspección con OpenSSL"
  },
  {
    "kind": "subhead",
    "text": "inspección de handshake"
  },
  {
    "kind": "code",
    "text": "openssl s_client \\\n  -connect api-parceiros.exemplo.com:443 \\\n  -servername api-parceiros.exemplo.com \\\n  -cert cliente.pem \\\n  -key cliente.key \\\n  -CAfile cadeia-servidor.pem \\\n  -showcerts -state -tlsextdebug"
  },
  {
    "kind": "paragraph",
    "text": "Los certificados públicos se pueden compartir con menos riesgo, pero aún pueden revelar nombres internos y estructuras organizativas."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore Java"
  },
  {
    "kind": "subhead",
    "text": "Importar un ancla de confianza"
  },
  {
    "kind": "code",
    "text": "keytool -importcert \\\n  -alias ca-parceiros-producao \\\n  -file ca-parceiros.pem \\\n  -keystore truststore.p12 \\\n  -storetype PKCS12"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Seguridad operativa"
  },
  {
    "kind": "paragraph",
    "text": "Nunca envíe claves privadas por correo electrónico, chat o ticket. Para el diagnóstico, prefiera metadatos, certificados públicos, serie, emisor, fechas, huellas digitales y registros desinfectados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.11 Fallos frecuentes y método de troubleshooting",
    "id": "9-11-fallos-frecuentes-y-metodo-de-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Los mensajes de error de TLS varían entre bibliotecas y servidores proxy. La misma causa puede aparecer como Unknown_ca, bad_certificate, Certificate_required, handshake_failure, alerta de certificado caducado o simplemente conexión cerrada. El objetivo de la troubleshooting no es memorizar mensajes, sino encontrar qué verificación falló y en qué componente."
  },
  {
    "kind": "paragraph",
    "text": "Un método estructurado reduce el riesgo de \"solucionar\" la falla al deshabilitar las validaciones. Primero confirme la topología real y el terminador TLS. Luego capture la hora, el nombre de host, el SNI, el origen, la versión de TLS, la cadena presentada y la identidad esperada."
  },
  {
    "kind": "paragraph",
    "text": "Comparar con pólizas e inventario. Sólo entonces cambie la configuración."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Matriz de fallas"
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Matriz de síntomas e hipótesis diagnósticas.",
    "headers": [
      "Síntoma",
      "Hipótesis principal",
      "Pruebas para recoger"
    ],
    "rows": [
      [
        "desconocidoca_",
        "El emisor no está en el truststore o en una cadena incompleta.",
        "Cadena enviada, paquete de confianza y emisor/asunto."
      ],
      [
        "mal certificado _",
        "Certificado, firma o formato rechazado.",
        "Alerta TLS, extensiones y algoritmos."
      ],
      [
        "certificado caducado_",
        "Fecha caducada o reloj incorrecto.",
        "notBefore/notAfter y tiempos de nodo."
      ],
      [
        "error de handshake_",
        "Versión, cifrado, curva, firma o política incompatible.",
        "Registros ClientHello, ServerHello y TLS."
      ],
      [
        "Sin certificado",
        "El cliente no seleccionó la credencial o el servidor no la solicitó.",
        "CertificateRequest y configuración del almacén de claves."
      ],
      [
        "HTTP 403 después de mTLS",
        "Autenticación aprobada, autorización o registro fallido.",
        "Identidad extraída, identificación del consumidor y política. _"
      ],
      [
        "falla intermitente",
        "Nodos con diferentes truststores o rotación parcial.",
        "Configuración por instancia y serial observado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Hoja de ruta de diagnóstico"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-09.svg",
    "alt": "Hoja de ruta de diagnóstico para fallas mutuas de TLS",
    "caption": "Figura 9: Guía resumida de troubleshooting."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Identifique exactamente dónde termina TLS: balanceador de carga, WAF, gateway, ingreso, sidecar o aplicación."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Confirme DNS, dirección, puerto y SNI; un nombre de host incorrecto puede seleccionar otro certificado y política."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Pruebe la validación del servidor sin certificado de cliente para separar la confianza del servidor y la autenticación del cliente."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Tenga en cuenta si se envía CertificateRequest y qué emisores/algoritmos son compatibles.",
      "Confirmar que el cliente presenta la cadena completa y tiene acceso a la clave privada.",
      "Valide cadena, vencimiento, EKU, SAN, revocación y política criptográfica en el terminador.",
      "Después del protocolo de enlace, verifique la identidad canónica, el mapeo, el token, la ruta y la autorización.",
      "Compare todos los nodos y entornos; La divergencia de configuración es común en los clústeres."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "El peligro del bypass temporal"
  },
  {
    "kind": "paragraph",
    "text": "Deshabilitar la validación de certificados, aceptar cualquier CA o hacer que el certificado sea opcional puede restaurar la conectividad, pero elimina la propiedad de seguridad que se supone que debe proporcionar mTLS. Los cambios de emergencia deben ser explícitos, limitados, aprobados, monitoreados y tener un período de reversión. Siempre que sea posible, corrija la cadena, el truststore o la rotación sin ampliar la confianza."
  },
  {
    "kind": "paragraph",
    "text": "Una excepción temporal también puede volverse permanente por olvido. Utilice mecanismos de configuración con vencimiento, tickets vinculados, alertas y revisión post-incidente. Las pruebas automatizadas deberían detectar escuchas que ya no requieren un certificado o truststores que comienzan a aceptar autoridades inesperadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.12 Observabilidad, auditoría y métricas",
    "id": "9-12-observabilidad-auditoria-y-metricas"
  },
  {
    "kind": "paragraph",
    "text": "Los errores de protocolo de enlace ocurren antes de la capa HTTP y es posible que no aparezcan en los registros de API convencionales. El terminador TLS debe exponer sus propias métricas y eventos: intentos, éxitos, fracasos por motivo, versión negociada, algoritmo, emisor, identidad extraída y proximidad de vencimiento. Los datos confidenciales deben minimizarse y protegerse."
  },
  {
    "kind": "paragraph",
    "text": "La auditoría debe responder quién accedió, con qué credencial, a través de qué gateway, a qué hora, qué API, decisión de autorización y resultado. El número de serie y la huella digital ayudan a vincular el evento con el problema específico, mientras que la identidad lógica le permite rastrear al consumidor a través de rotaciones. Guardar sólo el Subject textual puede resultar insuficiente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Métricas recomendadas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Tasa de apretones de manos mTLS exitosos y fallidos por listener, socio y motivo.",
      "Distribución de versiones TLS, algoritmos de firma y conjuntos de cifrado negociados.",
      "Certificados activos por rango de vencimiento: 90, 60, 30, 15, 7 y 1 día.",
      "Renovaciones completadas, fallas y tiempo promedio de propagación de nuevas credenciales.",
      "Uso de certificado antiguo durante la ventana de renovación.",
      "Fallos de revocación, indisponibilidad de OCSP/CRL y decisiones de apertura/cierre fallidas.",
      "Identidades no asignadas, intentos de salir del espacio de nombres y violaciones de autorización.",
      "Conexiones de texto plano o permisivas en entornos que deberían ser estrictos."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Registros útiles y minimización."
  },
  {
    "kind": "paragraph",
    "text": "Es útil para registrar el emisor, el serial, el SAN canónico, la validez y el resultado de la validación. Sin embargo, el certificado puede contener datos internos o personales. La política de registro debe definir qué campos son obligatorios, enmascaramiento, retención y acceso."
  },
  {
    "kind": "paragraph",
    "text": "Las claves privadas nunca se registran; Rara vez es necesario repetir cadenas completas en cada solicitud. La correlación entre el protocolo de enlace y la solicitud se puede realizar con el identificador de conexión, el ID de seguimiento o el contexto generado por la gateway. En HTTP/2, varias solicitudes comparten la conexión, por lo que la telemetría debe mantener la asociación sin asumir un protocolo de enlace por solicitud."
  },
  {
    "kind": "paragraph",
    "text": "En los proxies agrupados, es esencial distinguir la sesión externa de la sesión interna."
  },
  {
    "kind": "subhead",
    "text": "Indicador de madurez"
  },
  {
    "kind": "paragraph",
    "text": "Una plataforma madura descubre certificados caducados e identidades sin propietario antes de que el consumidor abra un incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.13 Decisiones de hardening y seguridad",
    "id": "9-13-decisiones-de-hardening-y-seguridad"
  },
  {
    "kind": "paragraph",
    "text": "El hardening de mTLS implica reducir algoritmos, identidades y rutas aceptadas al mínimo necesario. La política debe definir versiones de TLS, firmas, curvas, tamaños de clave, autoridades, profundidad de la cadena, EKU, espacio de nombres SAN, revocación y manejo de errores. Los valores de biblioteca predeterminados pueden ser demasiado amplios para una integración empresarial específica."
  },
  {
    "kind": "paragraph",
    "text": "También necesita proteger la configuración. Un atacante que cambia el truststore o cambia el modo de autenticación del cliente puede desactivar la seguridad sin tocar el código de la aplicación. Los archivos, secretos, canalizaciones y consolas de administración deben tener control de acceso, revisión y seguimiento de auditoría."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "lista de verificación de hardening"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Prefiera TLS 1.3 y restrinja TLS 1.2 a las necesidades de compatibilidad aprobadas.",
      "Deshabilite las versiones y algoritmos heredados de acuerdo con la política criptográfica actual.",
      "Utilice listeners dedicados o una segregación clara para rutas que requieran mTLS.",
      "Mantenga truststores mínimos y específicos por dominio de confianza.",
      "Requerir EKU y atributos de identidad consistentes con el propósito del certificado.",
      "Normalizar y validar SAN antes del mapeo; Evite expresiones regulares permisivas y coincidencias parciales.",
      "Denegar certificados válidos que no estén asignados a un consumidor activo.",
      "Proteja las claves privadas y prefiera credenciales cortas con rotación automatizada.",
      "Revocación de pruebas, vencimiento, cambio de CA, cadena incompleta e indisponibilidad del verificador.",
      "Elimine los encabezados de identidad externos y proteja la propagación interna.",
      "Registre los cambios en el truststore, la política TLS y la autorización como cambios de seguridad.",
      "Supervise el modo permisivo y las excepciones con fecha de finalización obligatoria."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pinning: usar con criterio"
  },
  {
    "kind": "paragraph",
    "text": "La fijación de certificados restringe la confianza a un certificado, clave o conjunto específico. Puede reducir la dependencia de una CA amplia, pero crea un acoplamiento operativo. La fijación de certificados se interrumpe en cada reemisión; La fijación de claves permite volver a emitir con la misma clave, pero puede desalentar la rotación de claves."
  },
  {
    "kind": "paragraph",
    "text": "La fijación de CA intermedia es más flexible, pero amplía el conjunto aceptado. En las integraciones B2B, un registro de certificados puede verse como una fijación operativa. Para evitar la falta de disponibilidad, el sistema debe permitir dos credenciales simultáneas durante la rotación, registrar las fechas de activación y desactivación y ofrecer un proceso de actualización seguro."
  },
  {
    "kind": "paragraph",
    "text": "La fijación no reemplaza la verificación de validez, propósito y autorización."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Fail-open versus fail-closed"
  },
  {
    "kind": "paragraph",
    "text": "Cuando falla una dependencia de validación, el cierre fallido rechaza las conexiones; La apertura fallida mantiene la disponibilidad. No existe una respuesta universal. Para la autenticación de clientes API críticos, el cierre fallido normalmente preserva la intención de seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Sin embargo, una infraestructura de revocación inestable puede provocar una indisponibilidad sistémica. La arquitectura debería mejorar la redundancia y el almacenamiento en caché en lugar de simplemente deshabilitar la verificación. La decisión debe estar basada en riesgos, documentada en controles y probada."
  },
  {
    "kind": "paragraph",
    "text": "Es posible combinar almacenamiento en caché de respuestas válidas, CRL distribuidas, certificados cortos, lista de denegación de emergencia y circuitos operativos. El peor de los casos es un comportamiento implícito y desconocido que varía según los productos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.14 Estudio de caso: Integración de pagos B2B",
    "id": "9-14-estudio-de-caso-integracion-de-pagos-b2b"
  },
  {
    "kind": "paragraph",
    "text": "Considere una empresa que expone una API de pagos a tres socios. Cada socio tiene solicitudes de producción y aprobación. La plataforma utiliza un WAF, un API Gateway y servicios internos."
  },
  {
    "kind": "paragraph",
    "text": "El requisito es evitar clientes no registrados, vincular llamadas al socio correcto, proteger los tokens de OAuth y permitir la rotación sin tiempo de inactividad. La solución comienza con nombres de host separados por entorno y listeners que requieren un certificado. Partner PKI emite certificados con SAN URI estandarizado."
  },
  {
    "kind": "paragraph",
    "text": "La gateway confía solo en las CA aprobadas para ese ecosistema, valida la autenticación del cliente EKU, la validez, la cadena y la revocación, y consulta un registro de consumidores. Los certificados no asignados se rechazan incluso cuando la cadena es válida."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Modelo de identidad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/es/figure-10.svg",
    "alt": "Arquitectura de integración de pagos B2B con mutual TLS",
    "caption": "Figura 10: Arquitectura de estudio de caso B2B."
  },
  {
    "kind": "subhead",
    "text": "Identidad y registro del consumidor."
  },
  {
    "kind": "code",
    "text": "SAN URI:\nspiffe://b2b.exemplo/parceiro-017/app-pagamentos/producao\nconsumer_id: partner-017-payments-prod\nowner: parceiro-017\nallowed_apis: payments.create, payments.status\nrate_plan: b2b-gold\noauth_client_id: p017-payments-prod"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Flujo de solicitudes"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "El socio establece mTLS con la gateway utilizando la credencial de producción.",
      "La gateway valida el certificado y resuelve el URI de SAN en consumer_id.",
      "El socio presenta el token OAuth vinculado al certificado.",
      "La gateway valida el token y la correspondencia entre la confirmación y el certificado mTLS.",
      "La política verifica la API, el método, el alcance, la cuota y el entorno.",
      "La pasarela crea una conexión mTLS interna con el servicio de pagos.",
      "La identidad del socio se propaga en un contexto interno firmado y auditable.",
      "El servicio realiza la autorización comercial y registra el ID del consumidor y el número de serie de la credencial."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Rotación planificada"
  },
  {
    "kind": "paragraph",
    "text": "Treinta días antes de la fecha de vencimiento, la plataforma notifica al socio. Se emite un nuevo certificado para la misma identidad lógica. El registro acepta temporalmente ambas emisiones."
  },
  {
    "kind": "paragraph",
    "text": "El socio instala la nueva credencial y ejecuta pruebas en el punto final de validación. La telemetría confirma que se está utilizando la nueva serie. Después del plazo acordado, la emisión anterior se desactiva y, si es necesario, se revoca."
  },
  {
    "kind": "paragraph",
    "text": "Si hay un cambio de CA intermedia, la gateway recibe la nueva cadena de confianza antes de emitir los certificados. La configuración se distribuye a todos los nodos y se valida mediante pruebas sintéticas. Sólo entonces migra la pareja."
  },
  {
    "kind": "paragraph",
    "text": "El runbook incluye la reversión a la cadena anterior durante la ventana de superposición."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Respuesta al compromiso"
  },
  {
    "kind": "paragraph",
    "text": "Cuando el socio sospecha una filtración de claves, el acceso de emisión se bloquea inmediatamente en el registro y se revoca el certificado. Las alertas buscan el uso en serie después del momento del incidente, orígenes anormales y tokens asociados. Se genera una nueva clave y el certificado de reemplazo se incorpora de emergencia."
  },
  {
    "kind": "paragraph",
    "text": "La identidad lógica y la historia permanecen preservadas. Este flujo demuestra por qué depender únicamente de la exhalación es insuficiente. También muestra la utilidad de separar identidad, credencial y autorización: bloquear un problema comprometido no requiere eliminar al consumidor o recrear todos los contratos API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.15 Resumen técnico y revisión",
    "id": "9-15-resumen-tecnico-y-revision"
  },
  {
    "kind": "paragraph",
    "text": "mTLS autentica ambos extremos durante el establecimiento del canal TLS. La cadena X.509 vincula la clave pública a una identidad emitida por una autoridad confiable, mientras que CertificateVerify demuestra la propiedad de la clave privada. La máxima seguridad depende de una validación rigurosa, truststores segmentados, identidad canónica, autorización y protección de claves."
  },
  {
    "kind": "paragraph",
    "text": "En las plataformas API, el principal desafío es transformar este mecanismo criptográfico en capacidad operativa. Las puertas de enlace, las service meshes y los servidores de autorización deben compartir modelos de identidad y procesos de ciclo de vida. La rotación, la revocación, la telemetría, la troubleshooting y la respuesta a incidentes deben diseñarse antes de entrar en producción."
  },
  {
    "kind": "subhead",
    "text": "Resumen del capítulo"
  },
  {
    "kind": "paragraph",
    "text": "mTLS proporciona una identidad sólida para la sesión, pero sólo una arquitectura completa transforma esa identidad en un acceso seguro, escalable y operable."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Preguntas de revisión"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "¿Cuál es la diferencia entre validar un certificado y demostrar la propiedad de la clave privada?",
      "¿Por qué no se debería conceder acceso automáticamente a un certificado válido?",
      "¿Qué campos y extensiones X.509 se deben marcar en un certificado de cliente?",
      "¿Por qué el truststore del sistema operativo podría ser demasiado amplio para las API B2B?",
      "¿Cómo separar la identidad lógica de la solicitud y la emisión actual del certificado?",
      "¿Qué cambia cuando la gateway finaliza mTLS y crea otra sesión en el backend?",
      "¿Cómo reducen los tokens OAuth vinculados a certificados el riesgo de robo de tokens?",
      "¿Cuál es el orden seguro para rotar una CA o un certificado sin tiempo de inactividad?",
      "¿Qué métricas detectan problemas antes del vencimiento?",
      "¿Cuándo se debe considerar la apertura o el cierre fallidos en la validación de revocación?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejercicio de arquitectura"
  },
  {
    "kind": "paragraph",
    "text": "Diseñe una solución para una API empresarial consumida por diez socios y cinco servicios internos. Definir: límites de terminación TLS; almacenes fiduciarios; formato SAN; registro de consumidores; política de autorización; propagación de identidad; flujo de OAuth; rotación; revocación; métrica; registros y procedimiento de troubleshooting. Explique cómo su solución evita que se utilice un certificado válido de un socio para acceder a las API de otro contrato."
  },
  {
    "kind": "paragraph",
    "text": "Luego, simule el intercambio de la CA intermedia y describa la secuencia de implementación. Incluya ventana de reinversión, pruebas sintéticas, reversión, observación de adopción y retiro de cadena antigua. El ejercicio debe demostrar que el funcionamiento de la PKI es parte de la arquitectura, no sólo de la infraestructura."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Referencias oficiales y lecturas recomendadas."
  },
  {
    "kind": "paragraph",
    "text": "Las referencias siguientes respaldan los conceptos de protocolo de enlace TLS 1.3, validación X.509, autenticación OAuth sobre mTLS y configuración segura de TLS. Los documentos normativos pueden recibir actualizaciones; Las políticas corporativas deben acompañar las erratas y revisiones aplicables."
  },
  {
    "kind": "paragraph",
    "text": "1. RFC 8446: Protocolo de seguridad de la capa de transporte (TLS), versión 1.3. https://www.rfc-editor.org/rfc/rfc8446.html: especificación de TLS 1.3 y los mensajes utilizados en el protocolo de enlace."
  },
  {
    "kind": "paragraph",
    "text": "2. RFC 5280: Certificado de infraestructura de clave pública de Internet X.509 y perfil CRL. https://www.rfc-editor.org/rfc/rfc5280.html - Perfil de certificado X.509 y algoritmo de validación de ruta."
  },
  {
    "kind": "paragraph",
    "text": "3. RFC 8705: tokens de acceso vinculados a certificados y autenticación de cliente Mutual-TLS de OAuth 2.0. https://www.rfc-editor.org/rfc/rfc8705.html: autenticación de cliente OAuth a través de mTLS y tokens vinculados a certificados."
  },
  {
    "kind": "paragraph",
    "text": "4. NIST SP 800-52 Rev. 2: Directrices para implementaciones de TLS. https://csrc.nist.gov/pubs/sp/800/52/r2/final: directrices para seleccionar, configurar y utilizar TLS de forma segura."
  },
  {
    "kind": "paragraph",
    "text": "5. RFC 6818: Actualizaciones del certificado PKI X.509 de Internet y del perfil CRL. https://www.rfc-editor.org/rfc/rfc6818.html - Actualizaciones y aclaraciones al perfil X.509 del RFC 5280."
  },
  {
    "kind": "paragraph",
    "text": "6. RFC 9618: actualizaciones de la validación de políticas X.509. https://www.rfc-editor.org/rfc/rfc9618.html: actualizaciones relacionadas con la validación de la política de certificados X.509."
  }
];
