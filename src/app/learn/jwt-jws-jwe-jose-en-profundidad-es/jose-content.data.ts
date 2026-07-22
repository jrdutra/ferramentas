import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const JOSE_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Criptografía, contexto y gobernanza para tokens seguros"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/overview.svg",
    "alt": "Ciclo criptográfico de un token entre issuer, JWS o JWT, API Gateway y backend",
    "caption": "Figura de apertura: los tokens seguros dependen del cifrado, el contexto, el destinatario y la gobernanza de claves."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La firma protege la integridad y el origen; el cifrado protege la lectura. Ninguno de ellos reemplaza la validación de issuer, audience y propósito."
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
    "text": "El capítulo anterior presentó OpenID Connect y mostró que los tokens de identificación, access tokens, tokens de cierre de sesión y otros artefactos pueden usar JSON Web Token como formato. Sin embargo, reconocer tres segmentos separados por puntos no es suficiente para intercambiar tokens de forma segura. Es necesario comprender la familia JOSE, la diferencia entre claims y protección criptográfica, la selección de algoritmos, la distribución de claves y las validaciones específicas para cada perfil."
  },
  {
    "kind": "paragraph",
    "text": "JWT es un marco para el transporte de claims. JWS protege el contenido con una firma digital o un código de autenticación de mensajes. JWE protege la confidencialidad mediante cifrado autenticado. JWK representa una clave en JSON; un JWKS publica conjuntos de claves; JWA registra algoritmos e identificadores. Estos componentes se combinan, pero no son sinónimos. Un JWT puede ser un JWS, un JWE o una estructura anidada."
  },
  {
    "kind": "paragraph",
    "text": "En las API empresariales, los errores más graves rara vez se producen en la decodificación de Base64url. Surgen cuando el consumidor acepta algoritmos imprevistos, elige claves utilizando datos que no son de confianza, ignora al issuer o la audience, mezcla ID token y access token, reutiliza la misma regla para diferentes tipos de JWT o mantiene la rotación de claves incompatible con las cachés y la vida útil del token."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo profundiza en serializaciones compactas y JSON, headers protegidos, claims, JWK, JWKS, thumbprints, rotación, JWE, tokens anidados y perfiles de access tokens. También incorpora las mejores prácticas de RFC 8725 y la actualización de RFC 9864 sobre identificadores de algoritmos completamente especificados, además de relacionar los conceptos con Axway API Gateway, Azure API Management y bibliotecas de validación."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada ejemplo, responda en orden: cuál es el tipo de objeto, quién lo emitió, quién es el destinatario, qué algoritmo está permitido, de dónde proviene la clave, qué bytes se protegieron y qué claims deben validarse. Esta secuencia reduce la posibilidad de aceptar un token solo porque su firma parece válida."
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
      "Distinguir JOSE, JWT, JWS, JWE, JWK, JWKS y JWA.",
      "Explique Base64url, UTF-8, JSON y el impacto de la representación exacta de bytes.",
      "Interpretar claims registradas, públicas y privadas sin confundir presencia con confianza.",
      "Describir la serialización compacta JWS y la serialización JSON.",
      "Diferenciar firma digital y MAC, incluidas las implicaciones de no repudio y distribución de claves.",
      "Restrinja los algoritmos por lista de permitidos y evite la confusión de algoritmos.",
      "Utilice typ, cty, kid y crit de forma segura y contextual.",
      "Interprete los JWK RSA, EC, OKP y oct y separe el material público del privado.",
      "Planifique JWKS, cache, rotación, transferencia y eliminación de claves.",
      "Explique los parámetros alg y enc en JWE y la estructura de cinco partes.",
      "Diseñe tokens anidados y decida cuándo firmar, cifrar o utilizar ambos.",
      "Valide los JWT de forma criptográfica, temporal y semántica.",
      "Aplique el perfil JWT para acceder a tokens y distinguir otros tipos de JWT.",
      "Diagnostique fallas de firma, audience, issuer, kid, caché, reloj y cifrado."
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
      "18.1 La familia JOSE y sus responsabilidades",
      "18.2 Base64url, UTF-8 y JSON canónico",
      "18.3 JWT: claims y sobre de seguridad",
      "18.4 Claims registradas, públicas y privadas",
      "18.5 JWS: signing input y serializaciones",
      "18.6 Firma digital y MAC",
      "18.7 Algoritmos, allowlists y RFC 9864",
      "18.8 Headers typ, cty, kid y crit",
      "18.9 JWK: anatomía y tipos clave",
      "18.10 JWKS y distribución de claves",
      "18.11 kid, thumbprints y certificados X.509",
      "18.12 Rotación, cache y retirada de claves",
      "18.13 JWE: alg, enc y Content Encryption Key",
      "18.14 Serializaciones de JWE y destinatarios múltiples",
      "18.15 JWT anidado y orden de protecciones",
      "18.16 Pipeline de validación segura",
      "18.17 Perfil JWT para access tokens OAuth 2.0",
      "18.18 Otros perfiles JWT",
      "18.19 Proof-of-possession y claim cnf",
      "18.20 Aplicación en API Gateways, Axway y Azure",
      "18.21 Amenazas y hardening",
      "18.22 Privacidad, logging y minimización",
      "18.23 Troubleshooting",
      "18.24 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/figure-01-jose-family.svg",
    "alt": "Familia JOSE separa JWT, JWS, JWE, JWK, JWKS y JWA por responsabilidad",
    "caption": "Figura 1 - JOSE es una familia de estructuras; JWT es sólo una parte del modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.1 La familia JOSE y sus responsabilidades",
    "id": "18-1-la-familia-jose-y-sus-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "JSON Object Signing and Encryption es el conjunto de especificaciones que definen estructuras JSON para firma, autenticación, cifrado y representación de claves. El objetivo es transportar objetos de seguridad de forma que sea compatible con HTTP, URI y aplicaciones que ya utilizan JSON. La familia se dividió en documentos para separar la estructura, los algoritmos, las claves y la semántica de las claims."
  },
  {
    "kind": "paragraph",
    "text": "JWT define un conjunto de claims y reglas de procesamiento. JWS define cómo proteger una secuencia de bytes con una firma digital o MAC. JWE define cifrado autenticado y gestión de claves de contenido. JWK define cómo representar claves criptográficas en JSON, mientras que JWA asocia identificadores como RS256, ES256 o A256GCM con operaciones concretas."
  },
  {
    "kind": "paragraph",
    "text": "Un token comercialmente llamado JWT suele ser un JWS en serialización compacta, pero esta es una convención frecuente, no una equivalencia formal. También hay JWT cifrados como JWE, JWS cuya carga útil no es un JWT y objetos JOSE con múltiples firmas o destinatarios que utilizan la serialización JSON."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Cada componente de JOSE resuelve una responsabilidad diferente.",
    "headers": [
      "Estructura",
      "Protección o función",
      "Ejemplo de uso"
    ],
    "rows": [
      [
        "JWT",
        "Conjunto de claims con semántica definida por un perfil.",
        "ID token, access token, aserción de cliente o token de cierre de sesión."
      ],
      [
        "JWS",
        "Integridad y autenticación por firma o MAC.",
        "Token firmado y webhook firmado."
      ],
      [
        "JWE",
        "Confidencialidad e integridad a través de cifrado autenticado.",
        "Token con claims confidenciales destinados a un cliente específico."
      ],
      [
        "JWK/JWKS",
        "Representación y publicación de claves.",
        "Claves públicas del issuer para su validación."
      ],
      [
        "JWA",
        "Identificadores de algoritmos y parámetros.",
        "RS256, ES256, A256GCM y RSA-OAEP-256."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.2 Representación Base64url, UTF-8 y JSON",
    "id": "18-2-representacion-base64url-utf-8-y-json"
  },
  {
    "kind": "paragraph",
    "text": "Base64url transforma bytes en caracteres seguros para URL reemplazando los caracteres + y / y normalmente eliminando el relleno =. La operación no cifra, no comprime y no proporciona integridad. Cualquiera que reciba un JWS compacto puede decodificar el encabezado y la carga útil, incluso si no tiene la clave de firma."
  },
  {
    "kind": "paragraph",
    "text": "Antes de codificar, los objetos JSON se convierten a bytes UTF-8. Los espacios, el orden de los miembros, los escapes y las formas numéricas pueden producir diferentes secuencias de bytes incluso cuando dos representaciones parecen semánticamente equivalentes. En JWS, la firma cubre la representación exacta utilizada en la entrada de firma; una biblioteca no debe decodificar la carga útil y volver a serializarla para verificar la firma."
  },
  {
    "kind": "paragraph",
    "text": "JSON permite una flexibilidad que requiere validación defensiva. Los nombres de miembros duplicados, los números fuera del rango esperado, las cadenas con normalización diferente y las representaciones múltiples pueden provocar interpretaciones diferentes entre bibliotecas. El perfil que utiliza JWT debe definir claims, tipos y límites aceptados, rechazando objetos ambiguos."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - transformação do header\nheader JSON: {\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"key-2026-07\"}\nBASE64URL(UTF8(header))\n  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0yMDI2LTA3In0\nBase64url e apenas codificacao. O conteudo permanece legivel."
  },
  {
    "kind": "subhead",
    "text": "Error recurrente"
  },
  {
    "kind": "paragraph",
    "text": "Ocultar un token en el navegador, en un encabezado o en un registro no equivale a proteger la confidencialidad. Un JWS firmado sigue siendo legible. Para evitar que se lea el contenido, se requiere JWE u otro canal adecuado y protección de almacenamiento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.3 JWT: claims y sobre de seguridad",
    "id": "18-3-jwt-claims-y-sobre-de-seguridad"
  },
  {
    "kind": "paragraph",
    "text": "Una claim es una afirmación representada por un par nombre-valor. El conjunto de claims JWT es un objeto JSON que reúne estas claims. El formato no determina automáticamente quién puede emitir la claim, cuánto tiempo es válida o cómo debe interpretarse. Estas reglas pertenecen al perfil y a la relación de confianza entre issuer y destinatario."
  },
  {
    "kind": "paragraph",
    "text": "JWT puede estar protegido por JWS o JWE. En un JWS, las claims son legibles, pero los cambios se pueden detectar cuando la firma se verifica correctamente. En un JWE, el contenido está cifrado y autenticado. En ambos casos, el destinatario aún necesita validar las reglas específicas del issuer, la audience, la hora, el tipo y la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "Las claims no deben llevar un estado arbitrario solo porque el token admite JSON. Los tokens grandes aumentan el uso del ancho de banda, el tamaño del encabezado, la presión sobre los proxy y el riesgo de exposición. La emisión debe priorizar datos estables necesarios para la decisión, utilizando identificadores de información que deba ser consultada en tiempo real."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los claims registrados tienen una semántica general, pero el perfil define la obligación concreta.",
    "headers": [
      "Claim",
      "Semántica general",
      "Validación típica"
    ],
    "rows": [
      [
        "iss",
        "Identificador del issuer.",
        "Comparación precisa con el issuer habilitado."
      ],
      [
        "sub",
        "Identificador del asunto en el remitente.",
        "Interpretar junto con este y el perfil."
      ],
      [
        "aud",
        "Destinatario o conjunto de destinatarios.",
        "Contiene la audience de la API o del cliente."
      ],
      [
        "exp",
        "Instante tras el cual el token no debería ser aceptado.",
        "Reloj sincronizado y pequeña tolerancia."
      ],
      [
        "nbf",
        "Instante antes del cual no se debe aceptar el token.",
        "Rechazar el uso temprano fuera de tolerancia."
      ],
      [
        "iat",
        "Tiempo de emisión.",
        "Verifique las políticas de plausibilidad y edad."
      ],
      [
        "jti",
        "Identificador de token único.",
        "Reproducir detección o auditoría cuando el perfil lo requiera."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.4 Claims registradas, públicas y privadas",
    "id": "18-4-claims-registradas-publicas-y-privadas"
  },
  {
    "kind": "paragraph",
    "text": "Los claims registrados tienen nombres y semántica documentados en el registro de la IANA, como iss, sub, aud, exp y jti. No son obligatorios en todos los JWT, pero perfiles como OIDC y RFC 9068 especifican cuáles deben aparecer. El uso correcto depende de respetar el tipo JSON previsto y el propósito del perfil."
  },
  {
    "kind": "paragraph",
    "text": "Los claims públicos utilizan nombres resistentes a colisiones, generalmente registrados o basados en un URI controlado por la organización. Los claims privados son acuerdos locales entre el issuer y el consumidor, como roles, teniente_id o límite_transacción. Son útiles, pero pueden chocar entre ecosistemas y cambiar de significado cuando un token cruza los límites organizacionales."
  },
  {
    "kind": "paragraph",
    "text": "Una claim de autorización no debe aceptarse simplemente porque existe. El resource server necesita conocer el issuer, el perfil, el espacio de nombres, el tipo y la política que la produce. Por ejemplo, los roles emitidos por un directorio pueden representar grupos administrativos en lugar de permisos de dominio. La aplicación debe transformar claims confiables en decisiones locales explícitas."
  },
  {
    "kind": "subhead",
    "text": "Diseño de claims"
  },
  {
    "kind": "paragraph",
    "text": "Prefiere nombres estables, tipos simples y significado documentado. Evite incluir secretos, datos personales innecesarios, listas enormes de grupos u objetos comerciales que cambien durante la validez del token."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/figure-02-jws-compact.svg",
    "alt": "Serialización compacta JWS con encabezado protegido, carga útil, firma y entrada de firma",
    "caption": "Figura 2: la firma cubre el encabezado protegido y la carga útil codificada, unidos por un punto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.5 JWS: signing input y serializaciones",
    "id": "18-5-jws-entrada-de-firmas-y-serializaciones"
  },
  {
    "kind": "paragraph",
    "text": "JWS Compact Serialization tiene tres partes: encabezado protegido, carga útil y firma. Los dos primeros están codificados en Base64url y unidos por un punto para formar la entrada de firma. El algoritmo utiliza este valor y la clave adecuada para producir la tercera parte. La verificación reconstruye los mismos bytes y valida la operación criptográfica."
  },
  {
    "kind": "paragraph",
    "text": "La serialización JWS JSON representa el objeto como JSON y permite múltiples firmas en la misma carga útil. La forma aplanada contiene una firma; la forma general contiene una colección. Este modelo es útil cuando diferentes organizaciones o claves necesitan firmar el mismo contenido, aunque aumenta la complejidad de las políticas y el procesamiento."
  },
  {
    "kind": "paragraph",
    "text": "RFC 7797 permite cargas útiles no codificadas en Base64url a través del parámetro b64 en el encabezado protegido y el uso de crit. Esta opción es especializada y puede mejorar la integración con contenido resaltado, pero requiere soporte explícito y cuidado de los caracteres que interfieren con la serialización compacta. Las API comunes deberían preferir el comportamiento predeterminado que ofrecen las bibliotecas maduras."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - construção conceitual de um JWS\nprotected = BASE64URL(UTF8({\"alg\":\"ES256\",\"kid\":\"ec-1\"}))\npayload   = BASE64URL(payload_bytes)\nsigning_input = protected + \".\" + payload\nsignature = ECDSA_sign(private_key, signing_input)\njws_compact = protected + \".\" + payload + \".\" + BASE64URL(signature)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.6 Firma digital y MAC",
    "id": "18-6-firma-digital-y-mac"
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos asimétricos utilizan una clave privada para firmar y una clave pública para verificar. El issuer mantiene bajo control la clave privada y distribuye únicamente material público. Este modelo facilita la validación por múltiples API y reduce la capacidad de los validadores para emitir tokens, ya que tener la clave pública no permite crear nuevas firmas."
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos MAC como HMAC utilizan el mismo secreto para producir y verificar código. Cada componente capaz de validar también puede generar un token indistinguible. En arquitecturas con muchos servidores de recursos, el intercambio de secretos aumenta el impacto del compromiso y dificulta la asignación de qué componente produjo un token."
  },
  {
    "kind": "paragraph",
    "text": "La firma digital no crea automáticamente un no repudio legal. Se requieren registros, control de claves, certificación, políticas, auditorías y contexto. Asimismo, verificar la firma sólo prueba que los bytes corresponden a una clave aceptada; no prueba que el token esté vigente, destinado a esa API o autorizado para la operación."
  },
  {
    "kind": "table",
    "caption": "Tabla 3: La elección del modelo cambia los límites de confianza y respuesta a incidentes.",
    "headers": [
      "Modelo",
      "Distribución",
      "Implicación operativa"
    ],
    "rows": [
      [
        "Firma asimétrica",
        "Privado en el issuer; público en validadores.",
        "Los validadores no pueden emitir tokens. Facilita JWKS y la rotación."
      ],
      [
        "MAC simétrica",
        "Mismo secreto en issuer y validadores.",
        "Cualquier validador comprometido puede crear tokens."
      ],
      [
        "Firma con HSM/KMS",
        "Operación privada en módulo controlado.",
        "Reduce la exposición clave y mejora la auditoría, con costo y dependencia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.7 Algoritmos, allowlists y RFC 9864",
    "id": "18-7-algoritmos-listas-permitidas-y-rfc-9864"
  },
  {
    "kind": "paragraph",
    "text": "El encabezado alg declara el algoritmo utilizado, pero no debe controlar por sí solo la decisión. El consumidor debe tener una lista de permitidos configurada por perfil, issuer y token type. Si la aplicación acepta cualquier algoritmo anunciado, puede producirse confusión, degradación del algoritmo o uso de una clave operativa incompatible."
  },
  {
    "kind": "paragraph",
    "text": "Es necesario evaluar los algoritmos para determinar el conjunto completo de parámetros, tamaño de clave, biblioteca, requisitos reglamentarios e interoperabilidad. RS256 sigue siendo ampliamente compatible; PS256 utiliza RSA-PSS; ES256 utiliza ECDSA con P-256 y SHA-256. Los algoritmos modernos basados en EdDSA deben considerar actualizaciones de identificadores completamente especificados y soporte real del ecosistema."
  },
  {
    "kind": "paragraph",
    "text": "RFC 9864, publicado en 2025, diferencia los algoritmos completamente especificados de aquellos que dependen de parámetros externos para determinar el funcionamiento. Actualiza los registros JOSE y desaprueba los identificadores polimórficos en situaciones cubiertas por la especificación. Las nuevas arquitecturas deben consultar el registro actual de la IANA y evitar negociar nombres ambiguos sólo por compatibilidad histórica."
  },
  {
    "kind": "table",
    "caption": "Tabla 4: El algoritmo debe elegirse según la política, no según el contenido no confiable del token.",
    "headers": [
      "Algoritmo",
      "Familia",
      "Atención"
    ],
    "rows": [
      [
        "RS256",
        "RSA PKCS#1 v1.5 con SHA-256",
        "Amplio apoyo; Utilice suficiente llave y rotación gobernada."
      ],
      [
        "PS256",
        "RSA-PSS con SHA-256",
        "Relleno probabilístico; Confirme el soporte de todos los componentes."
      ],
      [
        "ES256",
        "ECDSA P-256 con SHA-256",
        "Firma compacta; requiere la implementación correcta de ECDSA."
      ],
      [
        "HS256",
        "HMAC con SHA-256",
        "El secreto compartido convierte a los validadores en issuers potenciales."
      ],
      [
        "ninguno",
        "Sin protección criptográfica",
        "No acepte tokens de seguridad."
      ],
      [
        "EdDSA / nombres actualizados",
        "curvas de edward",
        "Consulte RFC 9864 y el registro de IANA para obtener identificador y soporte actual."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "regla de seguridad"
  },
  {
    "kind": "paragraph",
    "text": "Configure el algoritmo esperado junto al issuer y el token type. No derive la lista de permitidos del propio encabezado alg y no reutilice la misma clave en familias de algoritmos incompatibles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.8 Headers typ, cty, kid y crit",
    "id": "18-8-headers-tipo-cty-kid-y-critico"
  },
  {
    "kind": "paragraph",
    "text": "El parámetro de tipo declara el tipo de objeto para la aplicación. No cambia el cifrado, pero ayuda a evitar confusión entre JWT con diferentes propósitos. RFC 8725 recomienda tipificación explícita y reglas mutuamente excluyentes. El perfil del access token RFC 9068 utiliza at+jwt, mientras que los tokens de identificación suelen utilizar JWT o dependen del contexto OIDC."
  },
  {
    "kind": "paragraph",
    "text": "cty describe el tipo de carga útil, siendo especialmente útil en objetos anidados. Un JWE que contiene un JWT firmado puede usar cty igual a JWT. kid es un consejo para seleccionar una clave entre varias; no es un identificador global, no prueba la propiedad y puede repetirse entre issuers."
  },
  {
    "kind": "paragraph",
    "text": "crit enumera los parámetros del header que deben entenderse para procesar el objeto. Si se desconoce un parámetro crítico, el consumidor debe rechazar el token. Ignorar crit destruye la capacidad de las extensiones para modificar la semántica de seguridad. Los headers que influyen en la operación criptográfica deben estar en el protected header, no solo en campos desprotegidos de la serialización JSON."
  },
  {
    "kind": "table",
    "caption": "Tabla 5: Los headers guían el procesamiento, pero requieren una política local.",
    "headers": [
      "Encabezado",
      "Función",
      "Validación"
    ],
    "rows": [
      [
        "typ",
        "Tipo de objeto para la aplicación.",
        "Compare con el perfil esperado y reglas separadas."
      ],
      [
        "cty",
        "Tipo de contenido protegido.",
        "Uso en contenido anidado y no obvio."
      ],
      [
        "kid",
        "Seleccione la clave del candidato.",
        "Resolver sólo dentro del issuer de confianza."
      ],
      [
        "crit",
        "Extensiones que deben entenderse.",
        "Rechazar si algún artículo no es compatible."
      ],
      [
        "jku/x5u",
        "URL de claves o certificados.",
        "No busque libremente tokens que no sean de confianza."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.9 JWK: anatomía y tipos clave",
    "id": "18-9-jwk-anatomia-y-tipos-clave"
  },
  {
    "kind": "paragraph",
    "text": "La clave web JSON representa material criptográfico con parámetros definidos por kty. Una clave RSA pública incluye n y e; una clave EC incluye crv, xey; una clave OKP incluye curva y coordenada pública; una clave simétrica oct incluye k. Los parámetros privados como d, p, q o k no deberían aparecer en JWKS públicos."
  },
  {
    "kind": "paragraph",
    "text": "uso indica un propósito amplio, como sig o enc. key_ops enumera operaciones específicas, como verificar, firmar, cifrar o descifrar. alg puede restringir la asociación con un algoritmo. Estos campos deben ser coherentes entre sí y con la política de aplicación; no deberían ampliar automáticamente lo que la clave puede hacer."
  },
  {
    "kind": "paragraph",
    "text": "Las claves deben tener origen, titular, fecha de activación, fecha de retiro, finalidad y procedimiento de revocación. Representar una clave en JSON no elimina los controles secretos. Las claves privadas deben permanecer en HSM, KMS, bóveda o almacenamiento seguro y cargarse únicamente mediante procesos autorizados."
  },
  {
    "kind": "code",
    "text": "Exemplo - JWK pública RSA\n{\n  \"kty\": \"RSA\",\n  \"kid\": \"signing-2026-07\",\n  \"use\": \"sig\",\n  \"alg\": \"RS256\",\n  \"n\": \"sXch...base64url-modulus...\",\n  \"e\": \"AQAB\"\n}"
  },
  {
    "kind": "subhead",
    "text": "material privado"
  },
  {
    "kind": "paragraph",
    "text": "Un JWKS público debe contener únicamente parámetros públicos. La presencia de d, p, q, dp, dq, qi o k puede exponer una clave privada o un secreto simétrico y requiere una respuesta inmediata al incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.10 JWKS y distribución de claves",
    "id": "18-10-jwks-y-distribucion-de-claves"
  },
  {
    "kind": "paragraph",
    "text": "Un conjunto de claves web JSON contiene la propiedad de claves con una lista de JWK. Los proveedores de identidades publican JWKS para que los clientes y servidores de recursos verifiquen las firmas. El endpoint debe obtenerse mediante una configuración confiable o metadata vinculados al issuer, nunca mediante una URL arbitraria proporcionada por el token."
  },
  {
    "kind": "paragraph",
    "text": "El consumidor mantiene el caché para evitar la dependencia de la red en cada solicitud. La caché debe respetar las políticas HTTP, tener un límite de tamaño, tiempo de espera, actualización controlada y respaldo seguro. En caso de una falla temporal del terminal, las claves conocidas pueden seguir siendo válidas según la política, pero los tokens sin clave no deben aceptarse solo para preservar la disponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "La validación primero debe corregir el issuer permitido, encontrar el conjunto correspondiente y luego usar kid, kty, alg y key_ops para filtrar candidatos. Un caché global indexado solo por kid permite colisiones entre tenants y issuers. El índice seguro incluye al menos el issuer y el identificador de clave."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La distribución de claves es parte de la disponibilidad y seguridad del token.",
    "headers": [
      "Componente",
      "Responsabilidad",
      "Fallo típico"
    ],
    "rows": [
      [
        "Configuración del issuer",
        "Establezca un dominio y un perfil de confianza.",
        "Token de otro tenant o entorno aceptado."
      ],
      [
        "jwks_uri",
        "Publicar las claves públicas actuales.",
        "La URL cambió o no está disponible."
      ],
      [
        "caché",
        "Reduzca la latencia y la dependencia por solicitud.",
        "Nueva clave no sembrada o antigua clave eterna."
      ],
      [
        "Selección por kid",
        "Elija un candidato del conjunto de confianza.",
        "Colisión global o kid inexistente."
      ],
      [
        "Actualizar",
        "Conjunto de búsqueda cuando sea necesario.",
        "Tormenta de actualización inducida por tokens maliciosos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.11 kid, thumbprints y certificados X.509",
    "id": "18-11-kid-huellas-digitales-y-certificados-x-509"
  },
  {
    "kind": "paragraph",
    "text": "kid es un identificador elegido por el issuer y puede ser una cadena opaca. Facilita la rotación, pero no tiene unicidad global. JWK Thumbprint, definido por RFC 7638, calcula un resumen sobre una representación canónica de los miembros requeridos de la clave y produce un identificador derivado del propio material público."
  },
  {
    "kind": "paragraph",
    "text": "x5c puede transportar una cadena de certificados X.509; x5t y x5t#S256 llevan thumbprints de certificados. Cuando se utilizan certificados, el consumidor debe validar la cadena, el uso de claves, la validez y la confianza según el perfil. Comparar solo un thumbprint recibido en el token no crea un ancla confiable."
  },
  {
    "kind": "paragraph",
    "text": "jku y x5u apuntan a recursos remotos. Seguir estas URL sin lista de permitidos crea SSRF, acceso a redes internas y transferencia de claves. En las plataformas empresariales, los endpoints de metadata y JWKS deben estar preconfigurados y resueltos a través de canales controlados y monitoreados."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - JWK Thumbprint\nthumbprint_input = canonical_json({\n  \"e\": \"AQAB\",\n  \"kty\": \"RSA\",\n  \"n\": \"sXch...\"\n})\njwk_thumbprint = BASE64URL(SHA256(UTF8(thumbprint_input)))"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/figure-03-key-rotation.svg",
    "alt": "Rotación de claves con publicación anticipada, superposición y retiro seguro",
    "caption": "Figura 3: La rotación segura publica la nueva clave antes de usarla y conserva la anterior durante la transferencia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.12 Rotación, cache y retirada de claves",
    "id": "18-12-rotacion-cache-y-recuperacion-de-claves"
  },
  {
    "kind": "paragraph",
    "text": "La rotación planificada comienza con la publicación anticipada de la nueva clave. Una vez que los cachés han tenido la oportunidad de actualizarlo, el issuer comienza a firmar nuevos tokens con el nuevo kid. La clave anterior permanece publicada hasta que todos los tokens firmados por ella hayan caducado, además de las tolerancias de reloj, las colas, los reintentos y el retraso de propagación."
  },
  {
    "kind": "paragraph",
    "text": "Quitar la clave inmediatamente después de cambiar el firmante hace que fallen los tokens que aún son válidos. Mantener las claves indefinidamente reduce la capacidad de revocación y amplía la superficie. La ventana debe calcularse en función de la vida útil máxima del token, la actualización, el Cache-Control, los tiempos de actualización y el comportamiento de los componentes desconectados."
  },
  {
    "kind": "paragraph",
    "text": "Cuando aparece un kid desconocido, el validador puede actualizar el JWKS una vez dentro de los límites y utilizar la fusión para evitar múltiples búsquedas simultáneas. Los tokens aleatorios no deberían generar una solicitud por intento. La limitación de velocidad, la caché negativa corta y el disyuntor protegen el endpoint de metadata y la propia API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "En caso de compromiso clave, la prioridad puede requerir el retiro inmediato y la invalidación de los tokens, aceptando una indisponibilidad controlada. El plan debe definir la detección, rotación de emergencia, comunicación a los consumidores, revocación, análisis de emisión indebida y restablecimiento de la confianza."
  },
  {
    "kind": "subhead",
    "text": "Ecuación operativa"
  },
  {
    "kind": "paragraph",
    "text": "El tiempo mínimo de superposición debe considerar: vida máxima del token + tolerancia del reloj + retraso de la caché + colas y reintentos. Utilice métricas reales, no solo el valor de experiencia nominal."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/figure-04-jwe-compact.svg",
    "alt": "Serialización compacta JWE con encabezado protegido, clave cifrada, IV, texto cifrado y etiqueta",
    "caption": "Figura 4: JWE separa la administración de claves y el cifrado de contenido autenticado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.13 JWE: alg, enc y Content Encryption Key",
    "id": "18-13-jwe-alg-enc-y-clave-de-cifrado-de-contenido"
  },
  {
    "kind": "paragraph",
    "text": "JWE utiliza una Content Encryption Key, o CEK, para cifrar plaintext con el algoritmo de cifrado autenticado indicado por enc. El parámetro alg define cómo se protege, transporta, deriva o comparte esta CEK con el destinatario. Por lo tanto, alg y enc tienen responsabilidades diferentes y ambas deben estar permitidas por la política."
  },
  {
    "kind": "paragraph",
    "text": "En RSA-OAEP-256, la CEK se cifra con la clave pública RSA del destinatario. En dir, la clave simétrica compartida se utiliza directamente como CEK. En ECDH-ES, una operación de acuerdo de claves deriva material de claves elípticas. La elección cambia la distribución de claves, el secreto directo, la interoperabilidad y el riesgo de compromiso."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos como el A256GCM brindan confidencialidad e integridad en una única operación autenticada. IV o nonce deben cumplir con los requisitos del algoritmo y no pueden reutilizarse bajo la misma clave cuando esto comprometa la seguridad. La etiqueta de autenticación debe validarse antes de publicar cualquier texto sin formato en la aplicación."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado no elimina la necesidad de una firma cuando el destinatario necesita verificar la autoría por separado. Un JWE demuestra que la etiqueta es válida según la clave de cifrado, pero la identidad del productor depende del mecanismo de gestión de claves y del perfil. Los tokens anidados pueden combinar firma y cifrado."
  },
  {
    "kind": "table",
    "caption": "Tabla 7: JWE combina administración de claves, cifrado de contenido y metadata protegidos.",
    "headers": [
      "Parámetro",
      "Ejemplo",
      "Responsabilidad"
    ],
    "rows": [
      [
        "alg",
        "RSA-OAEP-256",
        "Proteger o establecer la CEK para el destinatario."
      ],
      [
        "enc",
        "A256GCM",
        "Cifre el contenido y produzca una etiqueta de autenticación."
      ],
      [
        "cremallera",
        "DEF",
        "Comprimir antes del cifrado; utilizar sólo con análisis de riesgos."
      ],
      [
        "kid",
        "clave-destinataria-2",
        "Seleccione la clave de descifrado dentro del dominio confiable."
      ],
      [
        "cty",
        "JWT",
        "Indique que el texto sin formato es un JWT anidado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.14 Serializaciones de JWE y destinatarios múltiples",
    "id": "18-14-serializaciones-de-jwe-y-destinatarios-multiples"
  },
  {
    "kind": "paragraph",
    "text": "La serialización compacta tiene cinco partes: encabezado protegido, clave cifrada, IV, texto cifrado y etiqueta de autenticación. Es adecuado para un destinatario y transporte en parámetros o headers. La serialización JSON permite campos protegidos y desprotegidos, datos autenticados adicionales y múltiples destinatarios, cada uno con su propia clave cifrada."
  },
  {
    "kind": "paragraph",
    "text": "Entre varios destinatarios, se puede compartir el mismo texto cifrado mientras que la CEK está protegida por separado para cada clave. Esto reduce la duplicación, pero crea una política más compleja: todos los destinatarios reciben el mismo contenido y deben ser gobernados como un todo. Para eliminar un destinatario es necesario volver a cifrarlo para mensajes futuros."
  },
  {
    "kind": "paragraph",
    "text": "Los headers desprotegidos se pueden cambiar sin invalidar la etiqueta cuando no participan en AAD. La información que determina el algoritmo, clave, tipo o interpretación debe estar en el encabezado protegido. El consumidor necesita saber qué campos están autenticados y rechazar combinaciones inconsistentes."
  },
  {
    "kind": "code",
    "text": "Mapa da JWE Compact Serialization\nprotected.encrypted_key.iv.ciphertext.tag\n1. protected: alg, enc, kid, cty\n2. encrypted_key: CEK protegida para el destinatario\n3. iv: valor único exigido por el algoritmo\n4. ciphertext: plaintext cifrado\n5. tag: autenticidad del ciphertext y de los datos asociados"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.15 JWT anidado y orden de protecciones",
    "id": "18-15-jwt-anidado-y-orden-de-protecciones"
  },
  {
    "kind": "paragraph",
    "text": "Un JWT anidado aplica JWS y JWE en secuencia. El patrón común es firmar primero y cifrar después. El issuer crea un JWS que preserva la integridad y la autoría, luego utiliza ese JWS como texto sin formato de un JWE destinado al consumidor. El JWE externo usa cty igual que JWT para indicar contenido anidado."
  },
  {
    "kind": "paragraph",
    "text": "Después del descifrado, el destinatario aún necesita validar el JWS interno. La validez de la etiqueta externa no reemplaza la firma, el issuer, la audience o la hora del token interno. Asimismo, la firma interna no prueba que el objeto externo estuviera destinado al componente que lo recibió."
  },
  {
    "kind": "paragraph",
    "text": "Cifrar y luego firmar expone los metadata y la firma externa, y produce una semántica diferente. Los perfiles deben definir el orden, los algoritmos, los tipos y el manejo de errores. No invente su propia composición cuando un perfil estandarizado o un canal TLS firmado por token cumpla con el requisito."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - La elección depende de la confidencialidad, la autonomía, la revocación y la complejidad.",
    "headers": [
      "Estrategia",
      "Propiedad",
      "Uso"
    ],
    "rows": [
      [
        "Sólo JWS",
        "Integridad y origen; carga útil legible.",
        "Acceda a tokens comunes a través de canales TLS."
      ],
      [
        "Sólo JWE",
        "Confidencialidad e integridad bajo la clave de cifrado.",
        "Contenido destinado a un destinatario específico."
      ],
      [
        "JWS dentro de JWE",
        "Autoría interna y confidencialidad externa.",
        "JWT anidado con claims confidenciales."
      ],
      [
        "Referencia opaca",
        "Estado de las consultas al servidor por identificador.",
        "Revocación y minimización cuando no sean necesarias autocontenidas."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/es/figure-05-validation-pipeline.svg",
    "alt": "Canalización de validación JWT segura en un resource server",
    "caption": "Figura 5: La validación segura es una cadena; saltarse un paso cambia el modelo de confianza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.16 Pipeline de validación segura",
    "id": "18-16-canal-de-validacion-segura"
  },
  {
    "kind": "paragraph",
    "text": "El validador comienza con el contexto externo: endpoint, issuer esperado, token type y perfil. Luego realiza un análisis defensivo con límites de tamaño, número de segmentos, profundidad de JSON y tipos. El encabezado que no es de confianza solo se lee para seleccionar una operación permitida dentro de la configuración."
  },
  {
    "kind": "paragraph",
    "text": "La selección de claves se produce en el conjunto asociado al issuer. alg debe estar en la lista de permitidos y ser compatible con kty, use y key_ops. La firma, MAC o etiqueta está completamente verificada. Las fallas criptográficas finalizan el procesamiento sin probar algoritmos alternativos no autorizados."
  },
  {
    "kind": "paragraph",
    "text": "Después del cifrado vienen las validaciones semánticas: iss, aud, exp, nbf, iat, typ, cty, nonce, jti, scopes, tenants y claims de perfil. Las reglas para el access token, el ID token, la aserción del cliente y el token de cierre de sesión deben ser mutuamente excluyentes. Aceptar un token en múltiples contextos favorece la confusión entre JWT."
  },
  {
    "kind": "paragraph",
    "text": "Finalmente, la autorización aplica las reglas locales. Un token válido no implica permiso para ningún objeto. El backend debe verificar la operación, los recursos, la propiedad, el contexto empresarial y las políticas actuales. Los registros deben registrar resultados e identificadores mínimos, nunca el token completo."
  },
  {
    "kind": "table",
    "caption": "Tabla 9: El análisis, la autenticación de tokens y la autorización son pasos diferentes.",
    "headers": [
      "Paso",
      "Pregunta",
      "Resultado del fracaso"
    ],
    "rows": [
      [
        "Contexto",
        "¿Qué token type y issuer acepta este endpoint?",
        "Rechazar antes de confiar en los headers."
      ],
      [
        "Analizando",
        "¿Son aceptables la estructura, el tamaño y JSON?",
        "Error genérico sin procesamiento profundo."
      ],
      [
        "Algoritmo y clave",
        "¿Algoritmo permitido y clave de issuer correcta?",
        "Rechazar; actualice JWKS solo de forma controlada."
      ],
      [
        "Criptografía",
        "¿Son válidas la firma, MAC o etiqueta?",
        "Rechazar sin utilizar claims."
      ],
      [
        "Reclamaciones",
        "¿Son válidas las reglas de audience, horario, tipo y perfil?",
        "401 o error de protocolo correspondiente."
      ],
      [
        "Autorización",
        "¿Puede la identidad realizar la acción sobre el recurso?",
        "403 o respuesta de dominio apropiada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.17 Perfil JWT para access tokens OAuth 2.0",
    "id": "18-17-perfil-jwt-para-access-tokens-oauth-2-0"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9068 define un perfil interoperable para access tokens JWT. No obliga a OAuth a utilizar JWT; Los access tokens aún pueden ser opacos. Cuando se adopta el perfil, el token debe estar firmado, no puede usar alg none y debe declarar un tipo igual a at+jwt, además de claims y reglas específicas para issuer, asunto, audience, hora, client_id y autorización."
  },
  {
    "kind": "paragraph",
    "text": "El resource server valida el token para su propia audience. Los scopes pueden aparecer en el scope y se puede incluir información de autorización adicional según el perfil y los acuerdos. Las API de otra audience no deben aceptar el token simplemente porque fue emitido por el mismo authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Los access tokens JWT reducen las llamadas de introspección y permiten la validación local, pero dificultan la revocación inmediata. La corta vida útil, la rotación, las restricciones del remitente, las listas de emergencia y las políticas de sesión pueden reducir la exposición. Para datos que necesitan reflejar un estado instantáneo, la introspección o la consulta de autorización pueden ser más apropiadas."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - header e claims de access token\n{\n  \"typ\": \"at+jwt\",\n  \"alg\": \"RS256\",\n  \"kid\": \"as-signing-4\"\n}.\n{\n  \"iss\": \"https://auth.example\",\n  \"sub\": \"user-481\",\n  \"aud\": \"https://api.example/payments\",\n  \"client_id\": \"mobile-app\",\n  \"scope\": \"payments.read payments.create\",\n  \"iat\": 1784126100,\n  \"exp\": 1784126700,\n  \"jti\": \"8b28b730-...\"\n}"
  },
  {
    "kind": "subhead",
    "text": "El access token no es un ID token"
  },
  {
    "kind": "paragraph",
    "text": "El access token está destinado al resource server y describe la autoridad. El ID token está destinado al cliente OIDC y describe la autenticación. Aunque ambos son JWT firmados por el mismo issuer, sus reglas no se pueden intercambiar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.18 Otros perfiles JWT",
    "id": "18-18-otros-perfiles-jwt"
  },
  {
    "kind": "paragraph",
    "text": "JWT se utiliza en varios perfiles. Los tokens de identificación siguen las reglas de OpenID Connect. Las aserciones de cliente RFC 7523 le permiten autenticar a un cliente en el token endpoint o presentar una concesión. RFC 9101 Los objetos de solicitud protegen los parámetros de autorización. Los tokens de cierre de sesión llevan eventos específicos de la sesión. Las respuestas de introspección se pueden proteger como JWT según RFC 9701."
  },
  {
    "kind": "paragraph",
    "text": "Cada perfil define tipo, audience, claims obligatorios, tiempo, replay y destinatario. Una biblioteca genérica que sólo comprueba firmas no conoce estas reglas. La aplicación debe seleccionar un validador o una configuración específicos para cada tipo y mantener endpoints separados cuando sea posible."
  },
  {
    "kind": "paragraph",
    "text": "Siguen surgiendo nuevos formatos. RFC 9901, publicado en 2025, estandariza la divulgación selectiva JWT para permitir la presentación selectiva de claims en escenarios de credenciales. Este mecanismo cuenta con su propio modelo de emisión, presentación, divulgación y vinculación de claves; no debe tratarse como un JWT tradicional sólo porque reutiliza componentes JOSE."
  },
  {
    "kind": "table",
    "caption": "Tabla 10: Los diferentes tipos requieren reglas de validación mutuamente excluyentes.",
    "headers": [
      "Perfil",
      "Destinatario",
      "Control distintivo"
    ],
    "rows": [
      [
        "ID token OIDC",
        "Parte que confía",
        "client_id en reglas aud, nonce y OIDC."
      ],
      [
        "JWT access token",
        "Resource server",
        "escriba at+jwt, audience API y claims RFC 9068."
      ],
      [
        "afirmación del cliente",
        "Authorization server",
        "aud desde el endpoint, iss/sub desde el cliente y reproducción por jti."
      ],
      [
        "Token de cierre de sesión",
        "Parte que confía",
        "eventos, sid/sub, jti y ausencia de nonce."
      ],
      [
        "Solicitar objeto",
        "Authorization server",
        "Parámetros de solicitud de autorización protegidos."
      ],
      [
        "SD-JWT",
        "Verificador de credenciales",
        "Divulgaciones seleccionadas y reglas vinculantes clave."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.19 Proof-of-possession y claim cnf",
    "id": "18-19-proof-of-possession-y-claim-cnf"
  },
  {
    "kind": "paragraph",
    "text": "Los bearer tokens pueden ser utilizados por cualquier parte que obtenga el valor. Los sender-constrained tokens vinculan el uso a una clave o certificado. La claim cnf confirma qué clave debe demostrarse. El binding puede utilizar el thumbprint de la clave JWK, el thumbprint del certificado o parámetros definidos por el perfil."
  },
  {
    "kind": "paragraph",
    "text": "En DPoP, el cliente presenta una prueba JWS por solicitud y el access token puede contener jkt, la huella digital de la clave pública. En los access tokens vinculados a mTLS, cnf puede contener x5t#S256 del certificado utilizado en el canal. El resource server verifica tanto el token como la prueba o certificado correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "La proof-of-possession reduce la replay de tokens robados, pero agrega administración de claves, sincronización, nonces, proxies TLS y diagnósticos. La API Gateway debe preservar o verificar la evidencia en el punto correcto. Terminar mTLS en un componente y reenviar solo un encabezado que no es de confianza al backend destruye el enlace si ese encabezado se puede inyectar externamente."
  },
  {
    "kind": "code",
    "text": "Exemplos conceituais - confirmação da chave\n\"cnf\": {\n  \"jkt\": \"0ZcOCORZNYzC-7hV...\"\n}\n# ou, para certificado mTLS\n\"cnf\": {\n  \"x5t#S256\": \"qP3Q...thumbprint...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.20 Aplicación en API Gateways, Axway y Azure",
    "id": "18-20-aplicacion-en-api-gateways-axway-y-azure"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway actúa como un punto de aplicación de políticas y necesita separar la validación del token de autorización de la ruta. Una política sólida corrige el issuer, la audience, los algoritmos, la ubicación de los metadata, las claims obligatorias y el comportamiento de la caché. Los headers derivados de claims deben reemplazar los valores externos y enviarse al backend solo a través de un canal confiable."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, los filtros de validación JWT y las bibliotecas de identidad pueden verificar firmas, claims y certificados. La configuración debe limitar algoritmos, elegir tienda o JWKS por entorno y correlacionar fallas con seguimientos seguros. Las políticas compartidas evitan la divergencia, pero deben permitir diferencias de audience y perfil entre las API."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, validate-jwt y validate-azure-ad-token integran la validación con la configuración, las audiences y las notificaciones requeridas de OpenID. La política debe verificar el token destinado a la API y no simplemente aceptar cualquier token del tenant. Es necesario considerar la rotación y las cachés de metadata para cambios e incidentes."
  },
  {
    "kind": "paragraph",
    "text": "Cuando la API Gateway vuelve a emitir un token interno, se produce una nueva relación de confianza. Primero se debe validar el token externo; el token interno debe tener su propio issuer, audience, vida y claims mínimos. El backend confía en el issuer interno, no en el token original, y la correlación debe preservar los identificadores para la auditoría."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - política de validação no gateway\n<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://auth.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>https://api.example/payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"all\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Propagación de identidad"
  },
  {
    "kind": "paragraph",
    "text": "Elimine los headers de identidad recibidos de Internet antes de crear headers internos. El backend debe aceptar estos valores solo desde la API Gateway autenticada y, para decisiones críticas, continuar aplicando la autorización de dominio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.21 Amenazas y hardening",
    "id": "18-21-amenazas-y-hardening"
  },
  {
    "kind": "paragraph",
    "text": "La confusión de algoritmos ocurre cuando el consumidor permite que alguien seleccione una operación imprevista, como usar una clave pública RSA como secreto HMAC. La defensa es una lista de permitidos fija, claves separadas por uso y una biblioteca actualizada. alg none debe rechazarse en tokens de seguridad, a menos que sea un perfil excepcional y explícitamente aislado."
  },
  {
    "kind": "paragraph",
    "text": "La sustitución y la cross-JWT confusion ocurren cuando se acepta un token válido en el contexto incorrecto. Un ID Token usado como access token, un token de otra audience, un token de staging en producción y una client assertion aceptada por la API son ejemplos. typ explícito, reglas mutuamente excluyentes, issuer y audience reducen el riesgo."
  },
  {
    "kind": "paragraph",
    "text": "Los campos jku URL, x5u y jwk controlados por el token pueden inducir SSRF o sustitución de claves. kid puede provocar un recorrido de ruta o una consulta de base de datos insegura cuando se concatena sin validación. El validador debe tratar los headers como entradas hostiles, utilizar endpoints preconfigurados y limitar el tamaño y los caracteres."
  },
  {
    "kind": "paragraph",
    "text": "El oráculo de compresión es un riesgo cuando los datos secretos y controlados por el atacante se comprimen antes del cifrado y se puede observar el tamaño. RFC 8725 recomienda evitar la compresión de entradas criptográficas en escenarios sensibles. Los tokens también necesitan límites para evitar un consumo excesivo de CPU y memoria."
  },
  {
    "kind": "table",
    "caption": "Tabla 11: El refuerzo combina cifrado, análisis, redes y gobernanza.",
    "headers": [
      "Amenaza",
      "Ejemplo",
      "Controlar"
    ],
    "rows": [
      [
        "Confusión de algoritmos",
        "HS256 aceptado con material destinado a RSA.",
        "Lista de permitidos, compatibilidad con kty/alg y bibliotecas maduras."
      ],
      [
        "Confusión entre JWT",
        "ID token aceptado como access token.",
        "tipo, audience, perfil y validadores separados."
      ],
      [
        "Inyección de clave / SSRF",
        "jku apunta al host controlado o a la red interna.",
        "Endpoints preconfigurados y salida controlada."
      ],
      [
        "Reproducir",
        "Token copiado dentro de su validez.",
        "Vida corta, jti cuando corresponda y sender constraint."
      ],
      [
        "Compromiso clave",
        "Clave privada expuesta.",
        "HSM/KMS, rotación de emergencia y retirada coordinada."
      ],
      [
        "DoS criptográfico",
        "Tokens enormes o actualización forzada aleatoria para kids.",
        "Límites, caché negativo, límite de velocidad y disyuntor."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.22 Privacidad, logging y minimización",
    "id": "18-22-privacidad-registro-y-minimizacion"
  },
  {
    "kind": "paragraph",
    "text": "Un JWS puede contener nombre, correo electrónico, grupos, tenants, identificadores y datos comerciales en texto legible por humanos. El registro del token completo en registros de acceso, seguimientos, APM, herramientas de soporte o mensajes de error replica datos y credenciales en múltiples sistemas. Incluso los tokens caducados pueden revelar información personal o arquitectura interna."
  },
  {
    "kind": "paragraph",
    "text": "Los registros deben registrar solo los campos necesarios: issuer normalizado, audience esperada, kid, resultado de la validación, código de error, hash no reversible del jti o asunto cuando esté permitido e ID de correlación. El valor sin procesar del header Authorization debe enmascararse antes de llegar a los registros genéricos."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado JWE reduce la lectura durante el transporte y el almacenamiento, pero el destinatario necesita descifrado y puede filtrar el texto sin formato en los registros. La minimización sigue siendo el control más eficiente. Las declaraciones de autorización también pueden revelar la estructura organizacional; evaluar la necesidad, la retención y el acceso."
  },
  {
    "kind": "subhead",
    "text": "Regla de observabilidad"
  },
  {
    "kind": "paragraph",
    "text": "Recopile evidencia suficiente para diagnosticar sin copiar credenciales. Nunca publique tokens reales en tickets, chats, documentación o herramientas de descifrado en línea."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.23 Troubleshooting basada en evidencia",
    "id": "18-23-troubleshooting-basada-en-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico comienza con la clasificación de la avería. El error de análisis indica estructura, Base64url o JSON. La firma no válida apunta a clave, algoritmo, bytes, entorno o corrupción. Un kid desconocido sugiere una rotación, un caché o un issuer incorrectos. La audience no válida y el issuer no válido son fallas semánticas, no criptográficas."
  },
  {
    "kind": "paragraph",
    "text": "Compare el token con los metadata del issuer sin exponer el valor completo. Registre alg, kid, typ, iss, aud, exp y hora local. Consulte el JWKS confiable y confirme kty, uso, key_ops y alg. Compruebe si la nueva clave ya está publicada y si la anterior aún debería permanecer. En clústeres, compare cachés y relojes entre instancias."
  },
  {
    "kind": "paragraph",
    "text": "Para JWE, separe el error de la gestión de claves, el descifrado y la etiqueta. Una clave privada incorrecta, un algoritmo incompatible, un IV no válido y un texto cifrado modificado producen diferentes síntomas en la biblioteca, pero la respuesta externa debe ser genérica para no crear Oracle. Conserve los detalles solo en registros restringidos."
  },
  {
    "kind": "paragraph",
    "text": "En las API Gateways, correlacione el registro de acceso, el seguimiento de políticas, las métricas de metadata, el caché y el backend. La API Gateway, la API u otro proxy pueden generar una respuesta 401. Identifique el componente exacto y el paso que falló antes de cambiar la configuración."
  },
  {
    "kind": "table",
    "caption": "Tabla 12: Los síntomas del token apuntan a diferentes pasos del proceso.",
    "headers": [
      "Síntoma",
      "Hipótesis iniciales",
      "Evidencia"
    ],
    "rows": [
      [
        "JWT mal formado",
        "Segmentos, Base64url, JSON o tamaño.",
        "Error de recuento de piezas y analizador."
      ],
      [
        "Firma no válida",
        "Clave, alg, token o entorno incorrectos.",
        "Issuer, kid, JWK y bytes recibidos."
      ],
      [
        "kid desconocido",
        "Rotación, caché o issuer incorrectos.",
        "JWKS actual, antigüedad de la caché y cronograma de rotación."
      ],
      [
        "Caducado/aún no válido",
        "Reloj, exp, nbf o tolerancia.",
        "UTC de todas las instancias y claims temporales."
      ],
      [
        "Audiencia no válida",
        "Token emitido a otro recurso.",
        "aud, recurso solicitado y configuración de API."
      ],
      [
        "Falló el descifrado",
        "Clave privada, alg, enc, IV o etiqueta.",
        "Configuración JWE y error interno restringido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.24 Estudios de casos y laboratorios",
    "id": "18-24-estudios-de-casos-y-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: Rotación intermitente: algunas instancias aceptan el nuevo chico y otras devuelven 401. La investigación muestra cachés locales con diferentes tiempos y se actualizan sin fusionarse. La solución publica la clave con anticipación, estandariza el cache, agrega actualización controlada y mantiene la clave anterior para su máxima validez."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: token válido para una audience incorrecta: la API Gateway verifica la firma de un token emitido al portal y reenvía la llamada a la API. La solución requiere tipo de API y audience, separa los validadores de ID token y de access token y agrega pruebas negativas a la canalización."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: URL clave por token: una biblioteca sigue a jku y permite al atacante proporcionar su propia clave. La solución elimina la resolución dinámica, corrige los metadata por issuer, bloquea las salidas innecesarias y revisa los tokens ya aceptados."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4: claims confidenciales en registros: un incidente revela que APM almacenó la autorización completa. La solución enmascara el encabezado en el primer punto de entrada, reduce las claims emitidas, aplica retención y revoca tokens potencialmente expuestos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 1: validar un JWS con la biblioteca local"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Generar un par de claves de laboratorio en un entorno aislado y autorizado.",
      "Emita un JWS de corta duración con iss, aud, exp, typ y kid.",
      "Valide con la lista de permitidos de algoritmos y la clave pública preconfigurada.",
      "Cambie un byte de la carga útil y observe la falla criptográfica.",
      "Cambie aud sin volver a firmar para comparar el error de firma y el error semántico."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 2: simular la rotación de JWKS"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publica K1 y emite tokens con el kid K1.",
      "Agregue K2 al conjunto antes de usarlo para firmar.",
      "Actualice el firmante a K2 y mantenga K1 disponible.",
      "Observe el comportamiento de la caché en diferentes instancias.",
      "Elimine K1 solo después de que expiren los tokens y el margen operativo."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratorio 3 - pruebas negativas obligatorias"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Rechazar alg none y algoritmo fuera de la lista de permitidos.",
      "Rechazar issuer, audience y tipo incorrectos.",
      "Rechazar token vencido, futuro o excesivamente grande.",
      "Rechace a un kid desconocido sin activar una actualización ilimitada.",
      "Rechaza críticos desconocidos y headers remotos no autorizados.",
      "Rechazar el token de ID presentado a la API como un access token."
    ]
  },
  {
    "kind": "subhead",
    "text": "Seguridad del laboratorio"
  },
  {
    "kind": "paragraph",
    "text": "Utilice únicamente claves y tokens ficticios. Nunca copie credenciales de producción en herramientas de prueba, sitios de descifrado o documentos de capacitación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "JOSE separa claims, firma, cifrado, algoritmos y representación de claves. JWT no significa automáticamente token firmado, access token o credencial segura. La confianza surge de la combinación de estructura válida, funcionamiento criptográfico correcto, clave vinculada a un issuer permitido y validación semántica del perfil."
  },
  {
    "kind": "paragraph",
    "text": "JWS protege la integridad y el origen, pero mantiene la carga útil legible. JWE protege la confidencialidad mediante cifrado autenticado y separa alg, responsable de CEK, de enc, responsable del contenido. Los tokens anidados pueden combinar propiedades, pero aumentan la complejidad y necesitan un perfil claro."
  },
  {
    "kind": "paragraph",
    "text": "JWKS y la rotación son parte del runtime. La publicación temprana, el cache controlado, la superposición y el retiro planificado evitan el tiempo de inactividad. kid es sólo una pista dentro del issuer; Las URL y claves proporcionadas por el propio token no deberían generar confianza."
  },
  {
    "kind": "paragraph",
    "text": "RFC 8725 orienta allowlists, validaciones mutuamente excluyentes, tipado explícito y protección contra mix-up. RFC 9864 actualiza el tratamiento de algoritmos completamente especificados y el registro de IANA sigue siendo la referencia operativa para nombres y estados."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lista de verificación de diseño y operación."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿Existe un perfil documentado para cada tipo de JWT admitido?",
      "¿El issuer, la audience, el tipo y los algoritmos están definidos por la configuración de confianza?",
      "¿La validación utiliza la clave de issuer correcta y no un caché global por kid?",
      "¿JWKS tiene caché, límites, actualización combinada y rotación probada?",
      "¿Las claves privadas se almacenan en un HSM, KMS o una bóveda auditada?",
      "¿Los algoritmos son compatibles con kty, use y key_ops?",
      "¿Las claims temporales utilizan UTC, sincronización de reloj y tolerancia limitada?",
      "¿Los tokens de identificación, access tokens, aserciones de clientes y tokens de cierre de sesión utilizan validadores separados?",
      "¿Los headers jku, x5u, jwk y crit reciben un tratamiento seguro?",
      "¿Los registros enmascaran la autorización y no almacenan tokens completos?",
      "¿Las pruebas negativas cubren la confusión de tipo, audience, algoritmo y rotación?",
      "¿Existe un procedimiento para comprometer y retirar la llave de emergencia?"
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
    "ordered": false,
    "items": [
      "Explique por qué un JWT descodificado con éxito sigue siendo poco fiable.",
      "Describe la diferencia entre JWT, JWS y JWE usando un ejemplo de API.",
      "Calcule qué componentes pueden emitir tokens cuando HS256 se comparte entre cinco API.",
      "Proponer una secuencia de rotación para tokens con vencimiento de 20 minutos y caché JWKS de 10 minutos.",
      "Explique por qué el kid no puede identificar una clave globalmente.",
      "Diferenciar alg y enc en un JWE con RSA-OAEP-256 y A256GCM.",
      "Describa cómo typ ayuda a evitar el uso de ID Token como access token.",
      "Explique el riesgo de seguir a jku informado por el token.",
      "Compare el token JWT validado localmente y el token opaco con introspección.",
      "Defina qué información se puede registrar en los registros sin copiar la credencial."
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
    "caption": "Tabla 13 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "AAD",
        "Datos autenticados adicionales; datos autenticados sin estar cifrados."
      ],
      [
        "alg",
        "Algoritmo de firma, MAC o gestión de claves."
      ],
      [
        "Base64url",
        "Codificación de bytes segura para URL, sin confidencialidad."
      ],
      [
        "CEK",
        "Clave de cifrado de contenido utilizada para cifrar contenido en JWE."
      ],
      [
        "conjunto de claims",
        "Objeto JSON que contiene claims realizadas por JWT."
      ],
      [
        "crit",
        "Lista de parámetros críticos que el consumidor debe entender."
      ],
      [
        "cty",
        "Tipo de contenido protegido, útil en objetos anidados."
      ],
      [
        "enc",
        "Algoritmo de cifrado autenticado de contenido JWE."
      ],
      [
        "JWA",
        "Algoritmos web JSON; identificadores y parámetros criptográficos."
      ],
      [
        "JWE",
        "Cifrado web JSON; marco de criptografía autenticado."
      ],
      [
        "JWK",
        "Clave web JSON; Representación JSON de una clave."
      ],
      [
        "JWKS",
        "Conjunto de claves web JSON; conjunto de JWK."
      ],
      [
        "JWS",
        "Firma web JSON; firma digital o MAC sobre bytes."
      ],
      [
        "JWT",
        "Token web JSON; conjunto de claims protegidas por JWS o JWE."
      ],
      [
        "kid",
        "ID de clave; sugerencia de selección de clave dentro de un contexto."
      ],
      [
        "Nested JWT",
        "JWT protegido en múltiples capas, como JWS dentro de JWE."
      ],
      [
        "huella digital",
        "Compendio derivado de clave o certificado de identificación."
      ],
      [
        "typ",
        "Tipo de objeto declarado para la tramitación de la solicitud."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de decisión",
    "id": "anexo-a-matriz-de-decision"
  },
  {
    "kind": "table",
    "caption": "Tabla 14: La arquitectura depende del requisito, no solo de la preferencia de JWT.",
    "headers": [
      "Necesidad",
      "Estrategia inicial",
      "Controles esenciales"
    ],
    "rows": [
      [
        "API valida localmente",
        "JWS y JWKS asimétricos.",
        "Issuer, audience, tipo, lista de permitidos, caché y rotación."
      ],
      [
        "Revocación inmediata",
        "Token opaco o introspección.",
        "Disponibilidad de AS, caché corta y autenticación RS."
      ],
      [
        "Reclamaciones confidenciales",
        "JWE o referencia opaca.",
        "Minimización, alg/enc, clave de destinatario y registro."
      ],
      [
        "Múltiples validadores",
        "Firma asimétrica.",
        "Privado sólo en el issuer y público distribuido."
      ],
      [
        "Prueba de posesión",
        "Token vinculado a DPoP o mTLS.",
        "cnf, prueba por solicitud, nonce y proxies confiables."
      ],
      [
        "Múltiples tipos de JWT",
        "Validadores separados y tipo explícito.",
        "Reglas mutuamente excluyentes y pruebas negativas."
      ],
      [
        "Rotación frecuente",
        "JWKS con superposición planificada.",
        "Publicar antes, controlar el caché y eliminar más tarde."
      ],
      [
        "credencial selectiva",
        "SD-JWT según RFC 9901.",
        "Divulgaciones, enlace de claves, privacidad y perfil específico."
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
      "IETF. RFC 7515: Firma web JSON (JWS). 2015.",
      "IETF. RFC 7516: cifrado web JSON (JWE). 2015.",
      "IETF. RFC 7517: clave web JSON (JWK). 2015.",
      "IETF. RFC 7518 - Algoritmos web JSON (JWA). 2015.",
      "IETF. RFC 7519: token web JSON (JWT). 2015.",
      "IETF. RFC 7638: Huella digital de clave web JSON (JWK). 2015.",
      "IETF. RFC 7797: opción de carga útil sin codificar JWS. 2016.",
      "IETF. RFC 7800: Semántica clave de proof-of-possession para JWT. 2016.",
      "IETF. RFC 8037 - CFRG Curva Elíptica Diffie-Hellman y Firmas en JOSE. 2017.",
      "IETF. RFC 8725 / BCP 225: Mejores prácticas actuales de tokens web JSON. 2020.",
      "IETF. RFC 9068: perfil JWT para access tokens OAuth 2.0. 2021.",
      "IETF. RFC 9101: Solicitud de autorización protegida por OAuth 2.0 JWT. 2021.",
      "IETF. RFC 9278: URI de huella digital de JWK. 2022.",
      "IETF. RFC 9701: Respuesta de JWT para la introspección de tokens de OAuth. 2025.",
      "IETF. RFC 9864: Algoritmos completamente especificados para JOSE y COSE. 2025.",
      "IETF. RFC 9901: Divulgación selectiva para tokens web JSON. 2025.",
      "IANA. Registros JSON de firma y cifrado de objetos (JOSE).",
      "IANA. Registro de claims de tokens web JSON.",
      "Microsoft aprende. Políticas de validación-jwt y validación-azure-ad-token de Azure API Management.",
      "Documentación Axway. Filtros de validación, firma y cifrado API Gateway JWT.",
      "OWASP. Hoja de referencia de tokens web JSON para Java y hoja de referencia de seguridad OAuth 2.0."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de actualización"
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos, registros y perfiles de JOSE continúan evolucionando. Antes de implementar una combinación, confirme el estado actual en el registro de la IANA, los RFC que actualizan la especificación y el soporte exacto de la biblioteca, HSM, proveedor de identidad y API Gateway."
  }
];
