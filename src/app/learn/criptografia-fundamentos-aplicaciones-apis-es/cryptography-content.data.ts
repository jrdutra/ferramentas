import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const CRYPTOGRAPHY_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-01-cryptographic-primitives.svg",
    "alt": "Mapa de las principales primitivas criptográficas y los objetivos que cumple cada una",
    "caption": "Figura 7.1 - Mapa de las principales primitivas criptográficas."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo presenta los fundamentos matemáticos y operativos de la criptografía moderna y conecta cada primitiva con el uso del mundo real en API, TLS, tokens, firmas de mensajes, almacenes de claves y API Gateways. El objetivo es permitir al lector reconocer el papel de cada algoritmo, sus parámetros críticos y los riesgos de una composición incorrecta."
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
      "Distinguir confidencialidad, integridad, autenticidad, autorización y no repudio, evitando atribuir a un algoritmo propiedades que no proporciona.",
      "Comprenda las diferencias entre cifrado simétrico y asimétrico, así como por qué los sistemas modernos combinan ambos en esquemas híbridos.",
      "Comprenda AES, modos de funcionamiento, cifrados de flujo, AEAD, nonces, IV, etiquetas y los efectos de la reutilización de parámetros.",
      "Comprenda las funciones hash, HMAC, KDF, almacenamiento de contraseñas y la diferencia entre hash simple y derivación resistente a ataques de contraseñas.",
      "Comprenda RSA, criptografía de curva elíptica, intercambio de claves, encapsulación de claves y firmas digitales.",
      "Relacione primitivas criptográficas con TLS, mTLS, JWT, JWS, JWE, webhooks, Open Finance, HSM, KMS, Axway API Gateway y Azure API Management.",
      "Cree un proceso de troubleshooting para fallas de firma, descifrado, integridad, cifrado y acceso a claves.",
      "Conozca los estándares poscuánticos FIPS 203, FIPS 204 y FIPS 205 y comprenda por qué la criptoagilidad y el inventario son requisitos arquitectónicos."
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
    "text": "La criptografía a menudo parece un conjunto de acrónimos aislados: AES, RSA, SHA, HMAC, ECDSA, EdDSA, GCM, OAEP y PSS. El aprendizaje mejora cuando estas siglas se organizan por objetivo. Primero identifique el servicio deseado: cifrado, verificación de integridad, autenticación de un mensaje, establecimiento de una clave o firma. Luego elija la primitiva, el esquema y los parámetros apropiados. Finalmente, examine el ciclo de vida clave y el contexto del protocolo."
  },
  {
    "kind": "paragraph",
    "text": "La atención se centrará no en demostrar todas las pruebas matemáticas, sino en proporcionar suficiente profundidad a la arquitectura y el funcionamiento. El lector debe terminar el capítulo sabiendo por qué usar AES-GCM es diferente de usar AES-ECB, por qué una función hash no cifra datos, por qué HMAC no es equivalente a una firma digital, por qué RSA no debería cifrar grandes cargas útiles directamente y por qué el mayor riesgo suele estar en la gestión de claves, no en el algoritmo."
  },
  {
    "kind": "paragraph",
    "text": "Regla editorial para diagramas Para evitar texto roto, los diagramas de este capítulo utilizan sólo etiquetas cortas. Las explicaciones contextuales y técnicas se encuentran en el cuerpo del texto, donde el flujo puede crecer de forma natural entre las páginas. Los cuadros resaltados del documento son tablas de altura automáticas, sin dimensiones fijas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "¿Qué resuelve la criptografía?",
    "id": "que-resuelve-la-criptografia"
  },
  {
    "kind": "paragraph",
    "text": "La criptografía es un conjunto de técnicas para proteger la información contra adversarios. En los sistemas digitales, puede evitar que personas no autorizadas lean los datos, detectar cambios, autenticar quién produjo un mensaje, establecer secretos entre partes que nunca han compartido una clave y producir evidencia técnica de autoría. Estos objetivos aparecen en protocolos de red, almacenamiento, identidad, pagos, API y dispositivos."
  },
  {
    "kind": "paragraph",
    "text": "Un error común es tratar el cifrado como sinónimo de cifrado. El cifrado es sólo una de las funciones posibles. Una firma digital, por ejemplo, normalmente no oculta el contenido; le permite verificar la integridad y autenticidad. Una función hash tampoco oculta el contenido de forma reversible; produce un resumen de longitud fija. Una MAC autentica un mensaje entre participantes que comparten un secreto. La arquitectura segura surge de la correcta composición de estos primitivos."
  },
  {
    "kind": "paragraph",
    "text": "En el contexto de las API, el cifrado protege múltiples fronteras. TLS asegura el canal. JWS protege la integridad de tokens y mensajes. JWE puede proporcionar confidencialidad de objetos. HMAC se utiliza en firmas de webhooks y autenticación de solicitudes. Los certificados y claves privadas admiten TLS, mTLS y firmas. KMS y HSM reducen la exposición clave. Cada mecanismo responde a una amenaza diferente."
  },
  {
    "kind": "paragraph",
    "text": "La elección criptográfica es también una decisión operativa. Los clientes, gateways, bibliotecas, dispositivos y HSM deben admitir algoritmos y tamaños de clave. Las claves deben generarse, distribuirse, rotarse, auditarse y descartarse. Una implementación puede utilizar un algoritmo robusto y aún así ser insegura debido a nonces repetidos, aleatoriedad débil, claves compartidas por muchos sistemas o registros que revelan material confidencial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos de seguridad y límites de las primitivas.",
    "id": "objetivos-de-seguridad-y-limites-de-las-primitivas"
  },
  {
    "kind": "paragraph",
    "text": "Confidencialidad significa impedir que terceros comprendan el contenido protegido. Integridad significa detectar cambios. La autenticidad relaciona el mensaje con una identidad o poseedor de una clave. La criptografía no proporciona automáticamente la disponibilidad, autorización y validación de las reglas comerciales. Un punto final puede utilizar TLS potente y aun así permitir un funcionamiento incorrecto debido a un error de autorización."
  },
  {
    "kind": "paragraph",
    "text": "El término no repudio debe usarse con precaución. Una firma digital puede crear evidencia técnica verificable por terceros, porque la clave pública es diferente de la privada. Sin embargo, la conclusión legal de que una persona no puede negar una acción depende de la identidad, la custodia de claves, la auditoría, la política, el dispositivo, el proceso de emisión y el contexto legal. Las matemáticas son parte del sistema probatorio, no el sistema completo."
  },
  {
    "kind": "paragraph",
    "text": "Otro límite es que el cifrado protege los datos en estados y fronteras específicos. El cifrado en tránsito no protege automáticamente los datos después de que la aplicación los descifra. El cifrado en reposo puede proteger los discos robados, pero no impide que un proceso autorizado y comprometido lea los datos. Las firmas detectan cambios, pero no garantizan que el contenido firmado sea verdadero o esté permitido."
  },
  {
    "kind": "paragraph",
    "text": "Los arquitectos deben formular la amenaza antes de elegir lo primitivo. ¿Quién es el oponente? ¿Observa la red, altera mensajes, compromete un servidor, roba una copia de seguridad, controla un cliente o tiene acceso administrativo? ¿Qué información debe permanecer en secreto y por cuánto tiempo? ¿Quién debe verificar la autenticidad? Estas respuestas determinan el algoritmo, la clave, el protocolo, el aislamiento y la gobernanza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Vocabulario esencial: claves, nonces, IV, salts y tags.",
    "id": "vocabulario-esencial-claves-nonces-iv-salts-y-tags"
  },
  {
    "kind": "paragraph",
    "text": "El texto claro es la información antes del cifrado. Texto cifrado y resultado producido por el algoritmo. La clave es un valor secreto o parcialmente público que controla la transformación. El algoritmo puede ser conocido por todos; la seguridad debe depender de la clave. Esta idea está asociada con el principio de Kerckhoffs: los sistemas deben permanecer seguros incluso si el adversario conoce el proyecto, excepto el secreto criptográfico."
  },
  {
    "kind": "paragraph",
    "text": "Nonce significa número usado una vez. En muchos esquemas, no es necesario que sea secreto, pero sí debe cumplir con una regla de unicidad o imprevisibilidad. En AES-GCM, reutilizar el mismo nonce con la misma clave puede comprometer la confidencialidad y la integridad. IV, vector de inicialización, es un parámetro utilizado por los modos de operación; sus requisitos varían. Tratar cada vía intravenosa como \"cualquier número aleatorio\" es peligroso."
  },
  {
    "kind": "paragraph",
    "text": "Salt es un valor asociado principalmente con la derivación de claves y el almacenamiento de contraseñas. Normalmente no es secreto. Su función es garantizar que entradas iguales produzcan resultados diferentes y dificultar las tablas precalculadas. Salt no reemplaza el costo computacional. Para las contraseñas es necesario utilizar una función de derivación adecuada, con parámetros de memoria y tiempo ajustados al entorno."
  },
  {
    "kind": "paragraph",
    "text": "La etiqueta de autenticación es el valor que permite verificar la integridad y autenticidad en un esquema AEAD o MAC. La aplicación debe rechazar el mensaje si falla la verificación de la etiqueta, sin publicar texto claro parcial. Reducir etiquetas excesivamente, comparar etiquetas de una manera que sea vulnerable al tiempo o continuar el procesamiento después de una falla de autenticación destruye las propiedades que el algoritmo debería proporcionar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aleatoriedad, entropía y generación de claves.",
    "id": "aleatoriedad-entropia-y-generacion-de-claves"
  },
  {
    "kind": "paragraph",
    "text": "Las claves, los nonces, las sales, los desafíos y los valores temporales dependen de una aleatoriedad adecuada. Un generador común utilizado para simulaciones o interfaces no es necesariamente seguro para el cifrado. Los generadores criptográficamente seguros combinan fuentes de entropía con mecanismos deterministas diseñados para producir secuencias impredecibles. NIST trata fuentes de entropía y DRBG en la familia SP 800-90."
  },
  {
    "kind": "paragraph",
    "text": "La entropía describe la incertidumbre. Una clave de 256 bits no tiene 256 bits de seguridad si fue elegida de una lista corta, una marca de tiempo o un identificador predecible. El tamaño de campo nominal no corrige un origen débil. Las claves deben ser generadas por bibliotecas criptográficas, sistemas operativos, HSM o KMS confiables, evitando implementaciones caseras."
  },
  {
    "kind": "paragraph",
    "text": "Los fallos de aleatoriedad pueden ser silenciosos. Dos dispositivos inicializados en el mismo estado pueden generar claves repetidas. Un contenedor clonado en un momento inadecuado puede reproducir secuencias. Un contador reiniciado puede repetir nonces. Una biblioteca puede caer en una fuente débil cuando falla la fuente principal. Por tanto, los módulos criptográficos necesitan inicialización, pruebas de estado, aislamiento y observabilidad."
  },
  {
    "kind": "paragraph",
    "text": "En las gateways, la aleatoriedad aparece en las sesiones TLS, la generación de claves, los tokens opacos, la correlación y las protecciones de reproducción. La puerta de enlace no debe utilizar identificadores predecibles como secretos. Las claves generadas externamente deben importarse con controles de acceso, y lo ideal es que las claves generadas en el HSM nunca abandonen el límite criptográfico en texto claro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografía simétrica",
    "id": "criptografia-simetrica"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-02-symmetric-asymmetric.svg",
    "alt": "Comparación entre cifrado simétrico y asimétrico en sistemas reales",
    "caption": "Figura 7.2 - Comparación entre cifrado simétrico y asimétrico."
  },
  {
    "kind": "paragraph",
    "text": "En el cifrado simétrico, las partes utilizan la misma clave secreta, o claves directamente relacionadas, para cifrar y descifrar. La principal ventaja es el rendimiento: los algoritmos simétricos procesan grandes volúmenes con un coste relativo bajo. Por lo tanto, los datos, archivos, discos y copias de seguridad de las aplicaciones TLS normalmente están protegidos mediante cifrados simétricos."
  },
  {
    "kind": "paragraph",
    "text": "El desafío es distribuir la clave. Si dos partes necesitan compartir un secreto, ¿cómo llega ese secreto a ambas partes sin ser interceptado? Los sistemas modernos resuelven esto con claves asimétricas, KEM, canales preseguros, KMS o procesos de aprovisionamiento. Una vez que se establece una clave de sesión, el cifrado simétrico protege el flujo de datos."
  },
  {
    "kind": "paragraph",
    "text": "Las claves simétricas requieren separación de propósitos. No se debe reutilizar la misma clave indiscriminadamente para cifrado, MAC, entornos, clientes y protocolos. Los KDF le permiten derivar claves distintas de un secreto maestro y un contexto. Esta separación reduce el impacto de las fallas y evita interacciones inesperadas entre esquemas."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado simétrico tampoco proporciona autenticidad automáticamente. Un modo de solo cifrado puede permitir cambios controlados en el texto cifrado. Por lo tanto, las arquitecturas modernas prefieren AEAD, que combina confidencialidad y autenticación, o una composición formalmente segura de cifrado y MAC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cifrados de bloque, cifrados de flujo y AES",
    "id": "cifrados-de-bloque-cifrados-de-flujo-y-aes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-03-aes-round.svg",
    "alt": "Transformaciones conceptuales realizadas durante una ronda AES",
    "caption": "Figura 7.3 - Vista conceptual de una ronda AES."
  },
  {
    "kind": "paragraph",
    "text": "Un cifrado de bloques transforma bloques de tamaño fijo. AES, estandarizado en FIPS 197, funciona con bloques de 128 bits y claves de 128, 192 o 256 bits. Los mensajes reales son más grandes o más pequeños que un bloque; Por lo tanto, es necesario utilizar AES con un modo operativo. El algoritmo AES es sólo el núcleo. La seguridad de la aplicación depende del modo, el nonce o IV, la autenticación y el manejo de errores."
  },
  {
    "kind": "paragraph",
    "text": "AES organiza el bloque en un estado y aplica rondas de sustitución, permutación, barajado y suma de claves. Estas operaciones crean confusión y difusión: las relaciones simples entre entrada, clave y salida desaparecen. El número de rondas varía según el tamaño de la llave. La implementación debe ser resistente a canales laterales, porque una ejecución matemáticamente correcta puede filtrar información por tiempo, caché, consumo o fallas inducidas."
  },
  {
    "kind": "paragraph",
    "text": "Los cifrados de flujo producen una secuencia de claves que se combina con el texto sin formato, generalmente mediante XOR. ChaCha20 es un ejemplo moderno, a menudo combinado con Poly1305 para formar un AEAD. Funciona bien en software y está especificado para protocolos IETF en RFC 8439. Al igual que con otros esquemas, reutilizar nonce y clave puede ser catastrófico."
  },
  {
    "kind": "paragraph",
    "text": "En las API, la elección entre AES-GCM y ChaCha20-Poly1305 suele realizarla el protocolo o la biblioteca. Las aplicaciones no deberían inventar sus propios formatos innecesariamente. Las bibliotecas de envelope encryption, TLS, JOSE, COSE y ya definen algoritmos, campos y comprobaciones. El análisis de interoperabilidad y seguridad de un protocolo establecido vale más que una composición artesanal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modos de operación: ECB, CBC, CTR y GCM",
    "id": "modos-de-operacion-ecb-cbc-ctr-y-gcm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-04-block-modes.svg",
    "alt": "Comparación entre los modos de funcionamiento ECB, CBC, CTR y GCM",
    "caption": "Figura 7.4 - Diferencias conceptuales entre modos de funcionamiento."
  },
  {
    "kind": "paragraph",
    "text": "El BCE cifra cada bloque de forma independiente. Bloques iguales bajo la misma clave generan bloques de cifrado iguales, revelando patrones. Por tanto, el BCE no es apropiado para proteger mensajes estructurados. Es un ejemplo didáctico importante: el uso de AES no garantiza la seguridad si el modo de funcionamiento es inadecuado."
  },
  {
    "kind": "paragraph",
    "text": "CBC encadena cada bloque con el bloque anterior y requiere un IV con las propiedades correctas. Históricamente se utilizó ampliamente, pero requiere un relleno y una autenticación separados. Los errores de validación pueden crear oráculos de relleno, lo que permite al atacante aprender información de diferentes respuestas. Los protocolos modernos tienden a preferir AEAD, lo que reduce la complejidad de la composición."
  },
  {
    "kind": "paragraph",
    "text": "CTR convierte un cifrado de bloque en un cifrado de flujo mediante contadores. Permite el paralelismo y no requiere relleno, pero reutilizar el mismo contador o nonce con la misma clave puede revelar relaciones entre textos claros. CTR proporciona confidencialidad, no autenticación; debe combinarse con una MAC de forma segura."
  },
  {
    "kind": "paragraph",
    "text": "GCM combina el modo contador con la autenticación basada en Galois, produciendo texto cifrado y etiquetas. Admite datos autenticados que no están cifrados, como encabezados de protocolo. GCM es eficiente y ampliamente utilizado en TLS y JOSE, pero depende en gran medida de la singularidad del nonce. NIST está revisando SP 800-38D, pero la recomendación final actual sigue siendo la referencia operativa hasta que una revisión final la reemplace."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "AEAD y datos asociados",
    "id": "aead-y-datos-asociados"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-05-aead.svg",
    "alt": "Entradas y salidas de un esquema de cifrado autenticado por la AEAD",
    "caption": "Figura 7.5 - Entradas y salidas de un esquema AEAD."
  },
  {
    "kind": "paragraph",
    "text": "AEAD significa Cifrado autenticado con datos asociados. El esquema protege la confidencialidad del texto plano y la autenticidad tanto del texto cifrado como de los datos asociados. AAD puede contener metadatos que deben protegerse contra modificaciones, pero deben permanecer visibles para su enrutamiento o procesamiento."
  },
  {
    "kind": "paragraph",
    "text": "Una operación AEAD recibe clave, nonce, texto sin formato y AAD. Devuelve texto cifrado y etiqueta. Al abrir, el receptor presenta los mismos parámetros y valida la etiqueta. Sólo después de una verificación exitosa se debe aceptar el texto sin formato. Este flujo evita que los datos modificados lleguen a la lógica empresarial como si fueran válidos."
  },
  {
    "kind": "paragraph",
    "text": "En formatos de token y mensaje, los campos que componen AAD deben estar definidos por el estándar. Cambiar la serialización, el orden, la canonicalización o la codificación puede hacer que la etiqueta falle, incluso cuando los datos aparecen semánticamente iguales. Esto es común en la retroubleshooting de JOSE: la firma o etiqueta cubre bytes exactos, no un objeto abstracto libremente interpretado."
  },
  {
    "kind": "paragraph",
    "text": "La gestión nonce debe ser parte del diseño. Generar nonces aleatorios puede ser apropiado cuando se controla la probabilidad de colisión; Los contadores pueden ser mejores en otros contextos, siempre y cuando no se reinicien con la misma clave. Los sistemas distribuidos necesitan coordinar la unicidad entre instancias o separar claves por instancia y contexto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Funciones hash criptográficas",
    "id": "funciones-hash-criptograficas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-06-hash-avalanche.svg",
    "alt": "Efecto avalancha producido por una función hash criptográfica",
    "caption": "Figura 7.6 - Efecto avalancha de una función hash."
  },
  {
    "kind": "paragraph",
    "text": "Una función hash toma un mensaje de tamaño arbitrario y produce un resumen de tamaño fijo. Debe ser determinista, eficiente y resistente a la preimagen, la segunda preimagen y las colisiones. La resistencia a la preimagen dificulta la recuperación de una entrada del resumen. La resistencia a las colisiones dificulta encontrar dos entradas diferentes con el mismo resumen."
  },
  {
    "kind": "paragraph",
    "text": "Los hashes se utilizan para integridad, firmas, estructuras de datos, identificadores, derivación y protocolos. No son cifrados porque no existe una clave de descifrado que recupere el mensaje. Tampoco es seguro proteger contraseñas simplemente calculando SHA-256, ya que los hashes genéricos son demasiado rápidos y permiten probar grandes volúmenes de conjeturas."
  },
  {
    "kind": "paragraph",
    "text": "La familia SHA-2 incluye SHA-256 y SHA-512. SHA-3, estandarizado en FIPS 202, utiliza una construcción diferente basada en Keccak y ofrece alternativas como las funciones SHA3-256 y XOF SHAKE. Tener diferentes familias aumenta la diversidad criptográfica. La elección depende de los requisitos de protocolo, interoperabilidad, rendimiento y cumplimiento."
  },
  {
    "kind": "paragraph",
    "text": "MD5 y SHA-1 no deben usarse cuando sea necesaria la resistencia a la colisión. Los sistemas heredados pueden limitarlos a identificadores no contradictorios, pero los nuevos diseños deben utilizar algoritmos modernos. La transición debe considerar dónde aparece el hash: firma, certificado, almacenamiento, ETag, suma de verificación, protocolo o integración externa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "MAC y HMAC",
    "id": "mac-y-hmac"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-07-hmac.svg",
    "alt": "Flujo simplificado de generación de un HMAC con un secreto compartido",
    "caption": "Figura 7.7 - Flujo HMAC simplificado."
  },
  {
    "kind": "paragraph",
    "text": "Un código de autenticación de mensaje produce una etiqueta utilizando una clave secreta compartida. El receptor que tiene la misma clave recalcula la etiqueta y compara. Si la verificación tiene éxito, hay evidencia de que el mensaje no fue alterado y fue producido por alguien que conoce el secreto. HMAC es una construcción estandarizada en RFC 2104 que combina una función hash con una clave."
  },
  {
    "kind": "paragraph",
    "text": "HMAC no cifra el contenido. El mensaje puede seguir siendo legible mientras se protege su integridad y autenticidad. Este modelo es común en webhooks, API de socios y firmas de solicitudes. El protocolo debe definir exactamente qué bytes van al HMAC, incluido el método, la ruta, la marca de tiempo, el cuerpo, los encabezados y la canonicalización."
  },
  {
    "kind": "paragraph",
    "text": "Como ambas partes tienen el mismo secreto, cualquiera de las partes puede generar etiquetas válidas. Esto limita la verificabilidad por parte de terceros y diferencia HMAC de la firma digital. HMAC es excelente para una autenticación bidireccional eficiente, pero no ofrece la misma separación de poderes que una clave pública y privada."
  },
  {
    "kind": "paragraph",
    "text": "La comparación de etiquetas debe realizarse en un tiempo constante cuando sea posible. El protocolo también necesita protección de reproducción, por ejemplo, marca de tiempo, nonce y ventana de aceptación. Un mensaje antiguo con un HMAC válido sigue siendo auténtico; Sin un mecanismo de actualización, el atacante puede retransmitirlo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "KDF y almacenamiento de contraseñas",
    "id": "kdf-y-almacenamiento-de-contrasenas"
  },
  {
    "kind": "paragraph",
    "text": "Una función de derivación de claves transforma el material de claves en una o más claves con propiedades adecuadas. HKDF, definido en RFC 5869, utiliza un paso de extracción y un paso de expansión. Es común en TLS y protocolos de establecimiento de claves, porque separa las claves por contexto, etiqueta y propósito."
  },
  {
    "kind": "paragraph",
    "text": "Las contraseñas humanas tienen baja entropía y necesitan funciones diseñadas para encarecer cada intento. PBKDF2 aplica repeticiones de una función pseudoaleatoria y sigue teniendo un amplio apoyo. Argon2id, recomendado en RFC 9106 para muchos escenarios, agrega costo de memoria, lo que dificulta los ataques paralelos con hardware especializado. Los parámetros deben calibrarse y revisarse con el tiempo."
  },
  {
    "kind": "paragraph",
    "text": "Salt debe ser único por contraseña y almacenarse junto al resultado. Un pimiento es un secreto adicional que se guarda por separado, por ejemplo en HSM o KMS, pero aumenta la complejidad operativa y necesita una rotación planificada. La aplicación debe almacenar el identificador del algoritmo y sus parámetros para permitir la verificación y la migración."
  },
  {
    "kind": "paragraph",
    "text": "En las API, lo ideal es que las contraseñas las manejen los proveedores de identidad, no las gateways de recursos. Aún así, comprender los KDF es importante para la autenticación básica heredada, los secretos de cliente, las bóvedas y los procesos de credenciales. Un secreto de cliente de alta entropía se puede almacenar como un hash para compararlo, mientras que una clave de firma debe permanecer disponible para operaciones criptográficas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografía asimétrica",
    "id": "criptografia-asimetrica"
  },
  {
    "kind": "paragraph",
    "text": "El cifrado asimétrico utiliza un par de claves relacionadas matemáticamente. La clave pública se puede distribuir; la clave privada debe permanecer protegida. Dependiendo del esquema, la clave pública permite cifrar al titular de la clave privada, verificar firmas o participar en un acuerdo de clave."
  },
  {
    "kind": "paragraph",
    "text": "La principal ventaja es reducir el problema de distribución secreta. Un cliente puede verificar una firma sin poseer la clave privada. Dos partes pueden establecer un secreto a través de un canal público. Sin embargo, las operaciones asimétricas son más costosas y producen artefactos más grandes, por lo que rara vez protegen grandes volúmenes directamente."
  },
  {
    "kind": "paragraph",
    "text": "Las claves asimétricas también requieren autenticidad de la clave pública. Recibir una clave pública a través de un canal inseguro no demuestra a quién pertenece. Certificados, huellas digitales, directorios, DNS seguro, procesos de fijación y aprovisionamiento asocian claves con identidades. El Capítulo 8 profundizará en PKI y X.509."
  },
  {
    "kind": "paragraph",
    "text": "En las gateways, las claves públicas validan JWS y certificados; Las claves privadas firman tokens, finalizan TLS y autentican el gateway en los backends. Separar las claves por entorno, emisor, propósito y algoritmo reduce el impacto y facilita la auditoría."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "RSA: cifrado, firma y relleno",
    "id": "rsa-cifrado-firma-y-relleno"
  },
  {
    "kind": "paragraph",
    "text": "RSA basa su seguridad práctica en la dificultad de factorizar un módulo grande compuesto de números primos. Una clave pública contiene módulo y exponente público; la clave privada contiene información que permite la operación inversa. RFC 8017 especifica esquemas de firma y cifrado RSA y muestra que la operación matemática sin formato necesita codificación y relleno seguros."
  },
  {
    "kind": "paragraph",
    "text": "Para el cifrado, RSAES-OAEP y el esquema moderno descrito en PKCS #1. RSA no debería cifrar cargas útiles grandes directamente. El uso normal es proteger una clave de sesión corta en el cifrado de sobre. RSAES-PKCS1-v1_5 permanece en sistemas heredados, pero su historial de oráculos requiere precaución y uniformidad de errores."
  },
  {
    "kind": "paragraph",
    "text": "Para las firmas, RSASSA-PSS introduce aleatoriedad y generalmente se prefiere en diseños nuevos cuando el ecosistema lo admite. RSASSA-PKCS1-v1_5 sigue siendo ampliamente utilizado e interoperable. La elección debe seguir el estándar del protocolo y la política de la organización, evitando el \"RSA puro\" o el relleno inventado."
  },
  {
    "kind": "paragraph",
    "text": "El tamaño de la clave afecta la seguridad, el rendimiento y el tamaño de la firma. RSA 2048 todavía aparece ampliamente; Los requisitos más largos pueden requerir 3072 bits o migración a ECC/PQC dependiendo del horizonte de protección. El tamaño correcto debe seguir las normas vigentes y el periodo durante el cual la información debe permanecer protegida."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Curvas elípticas, X25519 y Ed25519",
    "id": "curvas-elipticas-x25519-y-ed25519"
  },
  {
    "kind": "paragraph",
    "text": "La criptografía de curva elíptica ofrece altos niveles de seguridad con claves más pequeñas que RSA. La seguridad se basa en la dificultad del logaritmo discreto en grupos de puntos de una curva. Las claves y firmas más pequeñas reducen el ancho de banda, el almacenamiento y el costo, aunque la implementación requiere cuidado con la validación, las curvas y los canales laterales."
  },
  {
    "kind": "paragraph",
    "text": "X25519, especificado en RFC 7748 y utilizado para el acuerdo de claves. Para las firmas se utiliza Ed25519, descrito en RFC 8032 como una instancia de EdDSA. A pesar de los nombres relacionados, cumplen funciones diferentes y no deben tratarse como la misma clave o algoritmo. Los protocolos deben definir formatos y conversiones explícitamente."
  },
  {
    "kind": "paragraph",
    "text": "ECDSA es otra familia de firmas, estandarizada en FIPS 186-5. La seguridad de su implementación depende en gran medida de la generación nonce por firma; repetir o sesgar este valor puede revelar la clave privada. EdDSA se diseñó con un enfoque determinista, pero las implementaciones aún necesitan proteger las claves y resistir fallas y canales laterales."
  },
  {
    "kind": "paragraph",
    "text": "En JOSE el soporte de curvas depende de la implementación y registro de algoritmos. Las gateways deben validar el algoritmo permitido, la curva, el uso de claves y el origen de claves. Aceptar cualquier clave presentada en un token sin vincularla al emisor confiable convierte la verificación criptográfica en una garantía falsa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Acuerdo de claves, ECDH y KEM",
    "id": "acuerdo-de-claves-ecdh-y-kem"
  },
  {
    "kind": "paragraph",
    "text": "El acuerdo de clave permite a dos partes obtener un secreto compartido sin transmitirlo directamente. Diffie-Hellman y ECDH utilizan contribuciones de ambas partes. En el TLS moderno, las variantes efímeras proporcionan secreto directo: el compromiso futuro de la clave de identidad no revela automáticamente sesiones pasadas."
  },
  {
    "kind": "paragraph",
    "text": "El secreto en bruto producido por un acuerdo clave no debe utilizarse directamente. Un KDF incorpora contexto, nonces e identificadores para generar claves de tráfico distintas. La confirmación de clave y la autenticación mediante protocolo de enlace evitan ataques en los que un adversario se posiciona entre las partes."
  },
  {
    "kind": "paragraph",
    "text": "Un KEM, Mecanismo de Encapsulación de Claves, tiene operaciones para generar un texto cifrado de encapsulación y un secreto compartido, y recuperar este secreto con la clave privada. FIPS 203 estandariza ML-KEM, un mecanismo poscuántico. Los KEM son una opción natural para la criptografía híbrida y el establecimiento de claves."
  },
  {
    "kind": "paragraph",
    "text": "En las gateways, el acuerdo clave suele estar encapsulado en TLS. Aun así, el arquitecto necesita comprender las curvas, los grupos, el secreto directo y la compatibilidad. Una lista de grupos mal configurada puede impedir los apretones de manos; un terminador TLS antiguo puede eliminar las propiedades deseadas; Un HSM puede respaldar la firma, pero no un determinado acuerdo clave."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Firmas digitales",
    "id": "firmas-digitales"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-08-digital-signature.svg",
    "alt": "Flujos para generar y verificar una firma digital",
    "caption": "Figura 7.8 - Generación y verificación de firma digital."
  },
  {
    "kind": "paragraph",
    "text": "Una firma digital utiliza la clave privada para producir un valor verificable con la clave pública. Normalmente, el algoritmo firma un resumen o una representación codificada del mensaje. La verificación confirma que los bytes cubiertos no han sido alterados y que la firma fue generada por una clave privada correspondiente."
  },
  {
    "kind": "paragraph",
    "text": "Firmar y cifrar son operaciones diferentes. La suscripción no oculta el contenido. El cifrado de \"clave privada\" no es una explicación adecuada de las firmas modernas, porque esquemas como PSS, ECDSA, EdDSA y ML-DSA tienen estructuras y pruebas específicas. La comprensión debe seguir el esquema, no una analogía simplificada."
  },
  {
    "kind": "paragraph",
    "text": "La canonicalización es un desafío central. JSON se puede serializar de varias formas equivalentes. Si el productor y el verificador firman bytes diferentes, la verificación falla. JWS resuelve parte de este problema definiendo Base64url, encabezado protegido y entrada de firma. Los protocolos de firma HTTP también necesitan definir el orden y los componentes derivados."
  },
  {
    "kind": "paragraph",
    "text": "La clave de firma privada merece una fuerte protección. Los HSM le permiten firmar sin exportar la clave. Las políticas pueden requerir aprobación dual, registros inmutables, límites de uso y separación de claves de prueba y producción. Si la clave se ve comprometida, se pueden falsificar firmas válidas hasta que se revoque la confianza y se actualicen los consumidores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografía híbrida y envelope encryption",
    "id": "criptografia-hibrida-y-envelope-encryption"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-09-envelope-encryption.svg",
    "alt": "Cifrado híbrido con clave de datos y cifrado de sobre",
    "caption": "Figura 7.9 - Cifrado híbrido y cifrado de sobre."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado híbrido combina la eficiencia del cifrado simétrico con la distribución de claves asimétrica. La aplicación genera una clave de datos aleatoria, cifra la carga útil con AEAD y protege la clave de datos con RSA-OAEP, ECDH/KDF, KEM o una clave de sobre contenida en KMS. El paquete almacena texto cifrado, nonce, etiqueta y clave encapsulada."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado de sobre permite a KMS proteger solo claves pequeñas, mientras que la aplicación procesa grandes volúmenes localmente. Esto reduce las llamadas al servicio de claves y le permite rotar una clave maestra volviendo a cifrar las claves de datos, sin descifrar todas las cargas útiles. El dibujo deberá consignar la versión e identificador de la clave utilizada."
  },
  {
    "kind": "paragraph",
    "text": "Una clave de datos puede ser única por objeto, lote, sesión o período, según el riesgo y el costo. La reutilización generalizada aumenta el impacto del compromiso. Las claves de sobre requieren controles de acceso que impidan que un servicio descifre datos fuera de su dominio. La política de KMS debe reflejar la identidad y el propósito de la carga."
  },
  {
    "kind": "paragraph",
    "text": "JWE es un ejemplo de un formato de cifrado híbrido aplicado a objetos JOSE. Separa el algoritmo de gestión de claves y el algoritmo de cifrado de contenido. Las gateways que procesan JWE deben admitir combinaciones aprobadas, controlar tamaños y evitar descifrar contenido antes de validar los límites y el contexto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Gestión de claves, KMS y HSM",
    "id": "gestion-de-claves-kms-y-hsm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-10-key-lifecycle.svg",
    "alt": "Ciclo de vida de una clave criptográfica desde la generación hasta la rotación",
    "caption": "Figura 7.10 - Resumen del ciclo de vida de una clave criptográfica."
  },
  {
    "kind": "paragraph",
    "text": "Los algoritmos sólidos dependen de claves bien administradas. El ciclo incluye generación, registro, distribución, activación, almacenamiento, uso, rotación, suspensión, revocación, copia de seguridad, recuperación, archivo y destrucción. NIST SP 800-57 organiza principios para gestionar material criptográfico y ayuda a definir protecciones según el tipo y propósito de la clave."
  },
  {
    "kind": "paragraph",
    "text": "KMS es un servicio de gestión que aplica identidad, autorización, auditoría y operaciones clave. HSM es un módulo con un límite criptográfico diseñado para proteger claves y realizar operaciones. Un KMS puede usar HSM debajo. No es necesario que todas las claves estén al mismo nivel, pero las claves raíz, las claves de firma críticas y las claves de CA a menudo requieren una protección reforzada."
  },
  {
    "kind": "paragraph",
    "text": "El control de acceso debe estar orientado a las operaciones. Es posible que un servicio necesite firmar pero no exportar; otro puede verificar con una clave pública; una canalización puede activar una nueva versión, pero no utilizar la clave para los datos. Separar la administración, el uso y la auditoría reduce el abuso y el error humano."
  },
  {
    "kind": "paragraph",
    "text": "La rotación debe ser compatible con los datos y los consumidores existentes. Las claves de verificación antiguas pueden permanecer publicadas hasta que caduquen los tokens. Las claves de descifrado deben mantenerse mientras los datos estén cifrados. Los identificadores clave, como kid en JOSE, ayudan a seleccionar versiones, pero no deben aceptarse como una fuente confiable sin un emisor y un repositorio controlados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografía en TLS, JWT, JWS, JWE y webhooks",
    "id": "criptografia-en-tls-jwt-jws-jwe-y-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "TLS combina acuerdos de claves, firmas o certificados, KDF y AEAD. El cliente y el servidor negocian parámetros, autentican el protocolo de enlace y derivan claves de tráfico. El capítulo 6 analizó el protocolo; Aquí la lección es que TLS es una composición de primitivas con funciones distintas."
  },
  {
    "kind": "paragraph",
    "text": "JWT es un formato de reclamos. Cuando está protegido por JWS, recibe firma o MAC. Cuando está protegido por JWE, recibe cifrado autenticado. Un JWT codificado únicamente en Base64url no está protegido. La puerta de enlace debe verificar el algoritmo, el remitente, la audiencia, la hora, la clave y las reclamaciones, no solo confirmar que la firma matemática es válida."
  },
  {
    "kind": "paragraph",
    "text": "Los webhooks suelen utilizar HMAC sobre el cuerpo, la marca de tiempo y los identificadores. El consumidor necesita leer los bytes exactos recibidos antes de cualquier normalización que cambie el cuerpo. La verificación debe realizarse antes de procesar la operación, con una ventana de tiempo y almacenamiento de identificadores para evitar la repetición."
  },
  {
    "kind": "paragraph",
    "text": "En las integraciones bancarias y de Open Finance, las firmas pueden proteger mensajes, tokens y solicitudes además de TLS. El diseño debe dejar claro qué artefacto está firmado, qué clave se utiliza, cómo se distribuye la clave pública, qué algoritmo está permitido y cómo se produce la revocación y la rotación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicación en Axway API Gateway y Azure API Management",
    "id": "aplicacion-en-axway-api-gateway-y-azure-api-management"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-11-api-gateway-cryptography.svg",
    "alt": "Primitivas criptográficas aplicadas en una arquitectura API Gateway",
    "caption": "Figura 7.11 - Primitivas criptográficas en una arquitectura API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway puede terminar TLS, validar certificados de clientes, verificar JWT, producir tokens, firmar o validar mensajes, llamar a KMS y proteger secretos de backend. Estas funciones no deben tratarse como una única política de \"cifrado\". Cada política tiene entradas, claves, algoritmos y fallas específicas."
  },
  {
    "kind": "paragraph",
    "text": "En Axway API Gateway, los certificados, los almacenes de claves privadas, los almacenes de certificados de confianza, los filtros y las políticas conforman el flujo. El diagnóstico debe identificar si el fallo ocurre en el escucha TLS, en la validación del token, en la política de firma, en el descifrado o en la conexión saliente. Los registros deben informar el identificador clave y el algoritmo sin revelar una carga útil secreta o confidencial."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, pueden participar certificados, valores con nombre, Key Vault, identidad administrada y políticas. La plataforma puede validar JWT, autenticar el backend con certificado y obtener secretos de una bóveda. La identidad administrada reduce las credenciales estáticas, pero es necesario comprender los permisos de acceso a Key Vault y a la caché de actualización."
  },
  {
    "kind": "paragraph",
    "text": "En ambos productos, la puerta de entrada no debería convertirse en una caja fuerte indiscriminada. Los secretos necesitan un dueño, un propósito y una rotación. Las políticas deben utilizar algoritmos permitidos por la línea de base. Los entornos de desarrollo y producción deben tener claves independientes. Las exportaciones de configuración y las copias de seguridad deben protegerse, ya que pueden contener referencias o material confidencial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Errores y ataques comunes",
    "id": "errores-y-ataques-comunes"
  },
  {
    "kind": "paragraph",
    "text": "Reutilizar nonce en AES-GCM o ChaCha20-Poly1305 es uno de los errores más graves. Dependiendo del esquema, el atacante puede derivar relaciones entre textos sin formato, recuperar la clave de autenticación o falsificar mensajes. Los sistemas distribuidos necesitan una estrategia explícita para lograr la unicidad, especialmente después de reiniciar, revertir o clonar."
  },
  {
    "kind": "paragraph",
    "text": "Usar ECB, cifrar sin autenticar, validar el relleno con errores distinguibles, aceptar algoritmos elegidos por el atacante, mezclar claves entre entornos, deshabilitar la validación de certificados y almacenar claves en código son fallas recurrentes. Muchos no rompen los cálculos; rompen protocolo y funcionamiento."
  },
  {
    "kind": "paragraph",
    "text": "Los canales laterales exploran el tiempo, la caché, el consumo, las emisiones y el comportamiento de error. Las comparaciones de MAC y firmas deberían evitar fugas progresivas. Las implementaciones de RSA, ECC y AES deben utilizar bibliotecas maduras y recursos de hardware adecuados. Escribir primitivas manualmente casi nunca se justifica en aplicaciones empresariales."
  },
  {
    "kind": "paragraph",
    "text": "El cifrado también puede fallar debido a un exceso de confianza. Una carga útil firmada puede contener una operación maliciosa autorizada por una clave comprometida. Un token cifrado puede contener afirmaciones erróneas. Un hash puede validar la integridad de un archivo proporcionado por el mismo atacante que proporcionó el hash. El origen y el contexto confiables son tan importantes como la verificación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografía poscuántica y criptoagilidad",
    "id": "criptografia-poscuantica-y-criptoagilidad"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-12-post-quantum-transition.svg",
    "alt": "Pasos de inventario, pruebas híbridas y migración poscuántica",
    "caption": "Figura 7.12 - Pasos de una transición poscuántica."
  },
  {
    "kind": "paragraph",
    "text": "Las computadoras cuánticas de escala criptográficamente relevante podrían aplicar el algoritmo de Shor contra RSA, Diffie-Hellman y ECC. En teoría, los cifrados simétricos y los hashes también se ven afectados, pero pueden mantener márgenes más grandes con tamaños adecuados. El riesgo incluye recolectar ahora y descifrar después: capturar datos hoy para intentar descifrarlos en el futuro."
  },
  {
    "kind": "paragraph",
    "text": "En agosto de 2024, NIST publicó FIPS 203 para ML-KEM, FIPS 204 para ML-DSA y FIPS 205 para SLH-DSA. ML-KEM establece secretos; ML-DSA y SLH-DSA producen firmas. Estos algoritmos tienen tamaños y perfiles diferentes a los esquemas clásicos y requieren pruebas de rendimiento, ancho de banda, almacenamiento, certificados, HSM y protocolos."
  },
  {
    "kind": "paragraph",
    "text": "La migración poscuántica no significa cambiar todo inmediatamente y sin planificación. El primer paso es el inventario criptográfico: dónde aparecen RSA, ECC y DH, cuánto tiempo deben permanecer secretos los datos, qué proveedores controlan la implementación y qué dependencias carecen de agilidad. Luego viene la clasificación de riesgos, las pruebas y la transición."
  },
  {
    "kind": "paragraph",
    "text": "La criptoagilidad es la capacidad de intercambiar algoritmos, parámetros y claves sin reconstruir el sistema. Los protocolos deben negociar sólo conjuntos permitidos, los formatos deben identificar el algoritmo y la versión, y las aplicaciones no deben codificar tamaños fijos. Las estrategias híbridas combinan mecanismos clásicos y poscuánticos durante la transición, pero necesitan especificaciones formales para evitar composiciones inseguras."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Troubleshooting criptográfico",
    "id": "troubleshooting-criptografico"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/es/figure-13-cryptographic-troubleshooting.svg",
    "alt": "Árbol de retroubleshooting para clasificar fallos criptográficos",
    "caption": "Figura 7.13 - Árbol inicial de troubleshooting criptográficos."
  },
  {
    "kind": "paragraph",
    "text": "La retroubleshooting debe separar el formato, el algoritmo, los parámetros, la clave y el contexto. Una falla de \"firma no válida\" podría significar una clave pública incorrecta, un algoritmo diferente, una carga útil canonicalizada de otra manera, una URL Base64 incorrecta, un encabezado protegido diferente o un mensaje alterado. Cambiar la clave sin probar los bytes firmados puede enmascarar la causa."
  },
  {
    "kind": "paragraph",
    "text": "Los fallos de descifrado pueden deberse a una clave de datos incorrecta, una etiqueta no válida, un nonce incorrecto, un AAD, un relleno, una codificación o una versión del sobre diferentes. En AEAD, el error de etiqueta debe tratarse como un mensaje no auténtico. La aplicación no debe intentar \"recuperar\" texto parcial ni omitir la verificación para diagnosticar en producción."
  },
  {
    "kind": "paragraph",
    "text": "Los errores de acceso a KMS/HSM pueden parecer criptográficos, pero pueden ser errores de identidad, red, cuota, partición o permisos. Verifique qué principal llamó, qué operación fue denegada, qué versión de clave se seleccionó y si la clave está activa. La latencia y la limitación de KMS pueden requerir un almacenamiento en caché seguro de las claves de datos o ajustes del sobre de cifrado."
  },
  {
    "kind": "paragraph",
    "text": "Para reproducir una firma, capture solo datos no confidenciales y normalice el caso en un entorno controlado. Registre el algoritmo, el identificador de clave, la longitud, el hash de carga útil, la marca de tiempo y el resultado, sin registrar la clave privada, el secreto, el texto sin cifrar sensible o el token completo. Observabilidad segura y esencial para el diagnóstico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicación en el mundo bancario y financiero",
    "id": "aplicacion-en-el-mundo-bancario-y-financiero"
  },
  {
    "kind": "paragraph",
    "text": "Los bancos utilizan cifrado en canales digitales, pagos, Open Finance, PIN, tarjetas, mensajería, archivos, copias de seguridad, HSM, certificados y firmas de transacciones. La criticidad proviene del valor financiero, la privacidad, la regulación y la necesidad de auditoría. Una elección criptográfica debe considerar la disponibilidad y la recuperación, no solo la confidencialidad."
  },
  {
    "kind": "paragraph",
    "text": "Los HSM son comunes para claves de alta importancia, incluida la emisión, la firma, el procesamiento de pagos y las raíces de confianza. Controles como el control dual, el conocimiento dividido y las pistas de auditoría reducen la posibilidad de que una persona controle todo el ciclo. Estos controles organizacionales complementan las matemáticas."
  },
  {
    "kind": "paragraph",
    "text": "En Open Finance, TLS y mTLS protegen los canales y autentican a los participantes, mientras que OAuth y los tokens controlan la autorización. Las firmas de mensajes pueden garantizar la integridad en los saltos intermedios. Las claves y los certificados necesitan una rotación coordinada entre instituciones, con superposición y pruebas para evitar la indisponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "El profesional de el gateway debe distinguir entre el fracaso criptográfico y el fracaso empresarial. Una firma válida demuestra que los bytes fueron firmados por una clave confiable; no demuestra equilibrio, consentimiento o permiso. Las políticas criptográficas deben alimentar el contexto de autorización, no reemplazarlo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Tablas de referencia técnica",
    "id": "tablas-de-referencia-tecnica"
  },
  {
    "kind": "paragraph",
    "text": "Las tablas resumen decisiones frecuentes. No reemplazan la documentación del protocolo ni la política criptográfica de la organización."
  },
  {
    "kind": "table",
    "caption": "Tabla 1: Primitivas criptográficas, objetivos, ejemplos y precauciones.",
    "headers": [
      "Primitivo",
      "Objetivo principal",
      "Ejemplos",
      "Cuidados esenciales"
    ],
    "rows": [
      [
        "cifrado simétrico",
        "Confidencialidad eficiente",
        "AES, ChaCha20",
        "Modo, nonce/IV y autenticación."
      ],
      [
        "AEAD",
        "Confidencialidad y autenticidad",
        "AES-GCM, ChaCha20-Poly1305",
        "Nonce único por verificación de clave y etiqueta."
      ],
      [
        "picadillo",
        "Resumen e integridad cuando la referencia es confiable.",
        "SHA-256, SHA-3",
        "No utilice hash rápido como almacenamiento de contraseñas."
      ],
      [
        "MAC",
        "Integridad y autenticación con secreto compartido",
        "HMAC-SHA-256, GMAC",
        "Protección de reproducción y comparación segura."
      ],
      [
        "Suscripción",
        "Integridad y autenticidad verificables mediante clave pública.",
        "RSA-PSS, ECDSA, EdDSA, ML-DSA",
        "Custodia de claves, canonicalización y algoritmo permitido."
      ],
      [
        "KDF",
        "Derivar claves por contexto",
        "HKDF",
        "Propósito separado, sal/contexto y longitud."
      ],
      [
        "Contraseña KDF",
        "Hacer que adivinar contraseñas sea costoso",
        "Argón2id, PBKDF2",
        "Parámetros calibrados, sal única y migración."
      ],
      [
        "KEM / acuerdo",
        "Establecer secreto compartido",
        "X25519, ML-KEM",
        "Autenticación de protocolo y posterior derivación."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabla 2: Requisitos de secreto y unicidad para materiales criptográficos.",
    "headers": [
      "Término",
      "¿Tiene que ser secreto?",
      "¿Tiene que ser único?",
      "Observación"
    ],
    "rows": [
      [
        "Clave simétrica",
        "si",
        "Debe ser independiente por propósito.",
        "El compromiso permite el cifrado/descifrado o la autenticación."
      ],
      [
        "Nonce",
        "normalmente no",
        "A menudo sí, según el diagrama.",
        "En GCM lo reutilizo con la misma clave y registro."
      ],
      [
        "IV",
        "Depende del modo",
        "Los requisitos varían",
        "No asuma que la IV es siempre aleatoria o siempre secreta."
      ],
      [
        "sal",
        "No",
        "Debe ser único por credencial/derivación",
        "Precálculo de combate; no reemplaza el costo."
      ],
      [
        "Etiqueta AEAD/MAC",
        "No",
        "Derivada del mensaje y parámetros.",
        "Debe verificarse antes de aceptar el mensaje."
      ],
      [
        "Clave pública",
        "No",
        "La asociación con la identidad debe ser confiable",
        "Puede distribuirse mediante repositorio certificado o controlado."
      ],
      [
        "clave privada",
        "si",
        "Uno por identidad/propósito según política",
        "Idealmente no exportable en casos críticos."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabla 3 — Problemas criptográficos, hipótesis y verificaciones iniciales.",
    "headers": [
      "Problema observado",
      "Hipótesis",
      "Comprobaciones iniciales"
    ],
    "rows": [
      [
        "Firma no válida",
        "Clave, algoritmo, bytes o codificación diferente",
        "Compare la entrada de firma byte por byte, clave kid, alg y remitente."
      ],
      [
        "Etiqueta GCM no válida",
        "Clave divergente, nonce, AAD o texto cifrado",
        "Confirme todos los parámetros; no publique texto sin formato parcial."
      ],
      [
        "HMAC diferente",
        "Canonicalización, secreto o codificación",
        "Método de reproducción, ruta, marca de tiempo y cuerpo sin procesar."
      ],
      [
        "Acceso KMS denegado",
        "Identidad o política",
        "Verifique principal, operación, clave, versión y entorno."
      ],
      [
        "Algoritmo no compatible",
        "Biblioteca, puerta de enlace o HSM fuera de capacidad",
        "Consultar matriz de soporte y línea base aprobada."
      ],
      [
        "Error de PEM/DER",
        "Formato o cadena incorrectos",
        "Identifique contenedor, encabezados, Base64, algoritmo y tipo de clave."
      ],
      [
        "Fallo después de la rotación",
        "El consumidor utiliza una clave antigua o una clave incorrecta",
        "Mantenga la superposición y publique el conjunto de escaneo actualizado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejemplos técnicos comentados",
    "id": "ejemplos-tecnicos-comentados"
  },
  {
    "kind": "paragraph",
    "text": "Los siguientes ejemplos son didácticos. En producción utilizar bibliotecas, formatos y servicios aprobados por la organización. No implemente primitivas criptográficas manualmente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejemplo 1: Hash y HMAC en Python"
  },
  {
    "kind": "code",
    "text": "import hashlib\nimport hmac\nmensagem = b\"evento=pagamento&valor=100\"\nsegredo = b\"segredo-de-alta-entropia-obtido-de-um-cofre\"\ndigest = hashlib.sha256(mensagem).hexdigest()\nmac = hmac.new(segredo, mensagem, hashlib.sha256).hexdigest()\nprint(\"SHA-256:\", digest)\nprint(\"HMAC-SHA-256:\", mac)\n# Al verificar, prefiera compare_digest para reducir las fugas de tiempo.\nmac_recebido = mac\nassert hmac.compare_digest(mac, mac_recebido)"
  },
  {
    "kind": "paragraph",
    "text": "SHA-256 produce un resumen sin clave. Cualquiera puede recalcularlo. HMAC incluye un secreto compartido y autentica el mensaje entre los poseedores de ese secreto. La comparación debe utilizar una función adecuada y el protocolo aún necesita una marca de tiempo o un nonce para evitar la repetición."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejemplo 2: Inspección de algoritmos y claves con OpenSSL"
  },
  {
    "kind": "code",
    "text": "# Genera 32 bytes aleatorios en hexadecimal.\nopenssl rand -hex 32\n# Calcule SHA-256 a partir de un archivo.\nopenssl dgst -sha256 mensagem.json\n# Generar clave RSA para laboratorio.\nopenssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out chave-privada.pem\nopenssl pkey -in chave-privada.pem -pubout -out chave-publica.pem\n# Firme y verifique con RSA-PSS y SHA-256.\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -sign chave-privada.pem -out assinatura.bin\nmensagem.json\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -verify chave-publica.pem -signature\nassinatura.bin mensagem.json"
  },
  {
    "kind": "paragraph",
    "text": "El laboratorio separa las claves públicas y privadas y utiliza PSS. La clave privada no debe enviarse al verificador. En un entorno real, la firma puede ocurrir en un HSM o KMS y el verificador recibe la clave pública a través de un canal confiable."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ejemplo 3: estructura conceptual de una envolvente"
  },
  {
    "kind": "code",
    "text": "{\n  \"versao\": 1,\n  \"algoritmo_chave\": \"KMS-KEY-WRAP\",\n  \"algoritmo_conteudo\": \"AES-256-GCM\",\n  \"id_chave_mestra\": \"payments-prod-v12\",\n  \"chave_dados_encapsulada\": \"...\",\n  \"nonce\": \"...\",\n  \"aad\": \"...\",\n  \"ciphertext\": \"...\",\n  \"tag\": \"...\"\n}"
  },
  {
    "kind": "paragraph",
    "text": "El sobre registra la versión y los algoritmos para permitir la migración. La clave de datos encapsulada no es la clave maestra. El consumidor recupera la clave de datos a través de una operación autorizada en el KMS, valida la etiqueta y solo entonces acepta el texto sin cifrar."
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
    "text": "Caso 1: Webhook con HMAC válido y operación duplicada"
  },
  {
    "kind": "paragraph",
    "text": "Un socio envió webhooks firmados con HMAC-SHA-256. El consumidor verificó correctamente la firma, pero no registró el identificador del evento ni validó la marca de tiempo. Un intermediario transmitió un viejo mensaje. El HMAC siguió siendo válido porque el mensaje no se modificó y la transacción financiera se procesó dos veces."
  },
  {
    "kind": "paragraph",
    "text": "La corrección fue no cambiar el algoritmo. Estaba agregando una marca de tiempo firmada, una ventana de tolerancia, un identificador único, almacenamiento de eventos procesados ​​e idempotencia en el backend. El caso demuestra que la autenticidad no implica frescura o singularidad del negocio."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: falla intermitente de AES-GCM después del escalado horizontal"
  },
  {
    "kind": "paragraph",
    "text": "Una aplicación utilizó un contador local como nonce. Cada instancia inició el contador en cero. Cuando el servicio pasó de una a varias réplicas, diferentes instancias reutilizaron nonces con la misma clave. El sistema siguió funcionando, pero perdió las garantías criptográficas y abrió la posibilidad de falsificación."
  },
  {
    "kind": "paragraph",
    "text": "La solución requirió detener el uso de la clave afectada, rotar el material, evaluar los datos expuestos y adoptar una estrategia nonce distribuida o claves separadas por instancia. Se han incorporado al pipeline pruebas de reinicio y monitoreo de unicidad."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: la rotación de claves JWT hace caer a los consumidores"
  },
  {
    "kind": "paragraph",
    "text": "El emisor cambió la clave de firma e inmediatamente eliminó la antigua clave pública JWKS. Los tokens emitidos minutos antes todavía eran válidos, pero los consumidores no pudieron verificarlos. El incidente se interpretó inicialmente como un fallo de OAuth, aunque la causa estaba en el ciclo de vida criptográfico."
  },
  {
    "kind": "paragraph",
    "text": "La estrategia correcta mantuvo publicadas las claves de verificación antiguas hasta el final de la vida útil más larga de los tokens y cachés, utilizó kid consistente, publicó la nueva clave antes de activar la suscripción y monitoreó a los consumidores. La rotación segura es un cambio coordinado, no solo un reemplazo de archivos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4: el gateway valida la firma con la clave elegida por el token"
  },
  {
    "kind": "paragraph",
    "text": "Una política aceptaba una URL clave informada en el propio token. La puerta de enlace descargó la clave y confirmó que la firma era matemáticamente válida. Un atacante generó su propio par, publicó la clave y creó tokens aceptados. La verificación criptográfica funcionó, pero el atacante controlaba la raíz de confianza."
  },
  {
    "kind": "paragraph",
    "text": "La solución vinculó a cada emisor autorizado a un JWKS previamente configurado, algoritmos restringidos, emisor y audiencia validados y aplicó almacenamiento en caché seguro. El caso muestra que una clave pública debe ser confiable y estar asociada con una identidad; Una firma válida por sí sola no es suficiente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios de estudio",
    "id": "laboratorios-de-estudio"
  },
  {
    "kind": "paragraph",
    "text": "Entorno de laboratorio Ejecute pruebas solo en archivos y claves creadas para su estudio. No copie claves, tokens, cargas útiles ni secretos de producción. El objetivo es observar propiedades y formatos, no reproducir material sensible."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Calcule SHA-256 a partir de dos archivos que difieren en un carácter y compare los resúmenes. Relacione el resultado con el efecto avalancha.",
      "Calcula HMAC del mismo cuerpo con dos claves diferentes. Luego cambie un byte del mensaje y confirme que la verificación falla.",
      "Genere un par RSA de laboratorio, firme un archivo con RSA-PSS, verifique con la clave pública y confirme que la verificación falla después de cambiar el archivo.",
      "Examine una clave PEM e identifique si representa una clave privada, una clave pública o un certificado. Convierta entre PEM y DER solo en el laboratorio.",
      "Cree un pequeño sobre conceptual que contenga versión, algoritmo, ID de clave, nonce, texto cifrado y etiqueta. Explique cómo cada campo participa en el descifrado.",
      "Diseñe una política de puerta de enlace para webhook con HMAC, que incluya canonicalización, marca de tiempo, protección de reproducción, comparación segura y observabilidad.",
      "Cree un inventario criptográfico de una arquitectura ficticia: TLS, JWT, banco, copias de seguridad, colas, KMS y socios. Algoritmo de registro, clave, propietario, validez y dependencia.",
      "Elija una integración RSA/ECC ficticia y describa cómo sería una transición a un enfoque híbrido con un algoritmo poscuántico, incluidos los riesgos de tamaño y compatibilidad."
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
      "Explique por qué el cifrado es más amplio que el cifrado.",
      "Diferenciar entre confidencialidad, integridad, autenticidad, autorización y no repudio.",
      "¿Por qué el principio de Kerckhoff favorece los algoritmos públicos y las claves secretas?",
      "¿Cuál es la diferencia entre nonce, IV y sal?",
      "¿Por qué AES necesita un modo de operación?",
      "¿Por qué el BCE revela patrones?",
      "¿Qué propiedades proporciona AES-GCM y qué requisitos críticos y nonce?",
      "Diferenciar firma SHA-256, HMAC-SHA-256 y RSA-PSS.",
      "¿Por qué el hashing rápido no es adecuado para el almacenamiento de contraseñas?",
      "¿Cuál es el papel de un KDF como HKDF?",
      "¿Por qué RSA no debería cifrar cargas grandes directamente?",
      "Diferenciar entre X25519 y Ed25519.",
      "¿Cómo puede fallar una firma digital incluso cuando el productor y el verificador usan la misma clave?",
      "Explicar el envelope encryption y su relación con KMS.",
      "¿Por qué no debería tratarse al niño como una raíz de confianza?",
      "¿Qué controles adicionales necesita un webhook HMAC para evitar la reproducción?",
      "Describir el ciclo de vida de una llave y su rotación de cuidados.",
      "¿Cómo pueden Axway API Gateway o Azure API Management utilizar KMS, certificados y claves sin convertirse en repositorios indiscriminados de secretos?",
      "¿Qué familias de algoritmos se estandarizaron en FIPS 203, 204 y 205?",
      "¿Por qué el inventario y la criptoagilidad son requisitos previos para la migración poscuántica?"
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
    "caption": "Tabla 4 — Glosario del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "AEAD",
        "Cifrado autenticado con datos asociados, produciendo texto cifrado y etiqueta."
      ],
      [
        "AES",
        "Cifrado de bloques simétrico estandarizado en FIPS 197."
      ],
      [
        "DAA",
        "Datos autenticados, pero no cifrados, en un esquema AEAD."
      ],
      [
        "Texto cifrado",
        "Resultado cifrado de un mensaje."
      ],
      [
        "CSPRNG/DRBG",
        "Generador diseñado para producir bits impredecibles para uso criptográfico."
      ],
      [
        "digerir",
        "Salida de una función hash."
      ],
      [
        "Cifrado de sobre",
        "Protección de datos con clave de datos, que a su vez está protegida por una clave maestra o KEM."
      ],
      [
        "HMAC",
        "MAC creada a partir de una función hash y un secreto compartido."
      ],
      [
        "HSM",
        "Módulo de seguridad hardware que protege claves y realiza operaciones criptográficas."
      ],
      [
        "IV",
        "Vector de inicialización utilizado por ciertos modos de operación."
      ],
      [
        "KDF",
        "Función que deriva claves del material de entrada y el contexto."
      ],
      [
        "KEM",
        "Mecanismo de encapsulación de claves para establecer un secreto compartido."
      ],
      [
        "kms",
        "Servicio de gestión de claves con identidad, política, versión y auditoría."
      ],
      [
        "MAC",
        "Código de autenticación de mensajes basado en secreto compartido."
      ],
      [
        "Nonce",
        "Valor utilizado una vez o según la regla de unicidad del esquema."
      ],
      [
        "Texto sin formato",
        "Información antes del cifrado."
      ],
      [
        "sal",
        "El valor no secreto suele ser el único valor utilizado en la derivación, especialmente a partir de contraseñas."
      ],
      [
        "Etiqueta",
        "Valor de autenticación producido por MAC o AEAD."
      ],
      [
        "Criptoagilidad",
        "Capacidad de intercambiar algoritmos, parámetros y claves con impacto controlado."
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
    "kind": "list",
    "ordered": false,
    "items": [
      "La criptografía brinda diferentes servicios; Ningún primitivo resuelve por sí solo la confidencialidad, la integridad, la autenticación, la autorización y la disponibilidad.",
      "El cifrado simétrico protege grandes volúmenes; La criptografía asimétrica distribuye confianza, establece claves y permite firmas.",
      "AES debe usarse con el modo apropiado. AEAD, al igual que AES-GCM y ChaCha20-Poly1305, combina cifrado y autenticación.",
      "Nonces, IV, salts y tags tienen requisitos diferentes. No reutilizar puede destruir la seguridad de un esquema.",
      "Los hashes no cifran datos. HMAC se autentica con secreto compartido. Las firmas utilizan una clave privada y se verifican con una clave pública.",
      "Los KDF separan las claves por contexto; Las funciones de contraseña añaden un coste frente a las conjeturas.",
      "RSA-OAEP y RSA-PSS son esquemas con el relleno adecuado. ECC ofrece acuerdo y firma con claves más pequeñas.",
      "El cifrado de sobre y KMS/HSM reducen la exposición y organizan el ciclo de vida de la clave.",
      "Las gateways aplican cifrado en TLS, mTLS, tokens, webhooks y conexiones backend, pero necesitan una base de confianza, gobernanza y observabilidad.",
      "La transición poscuántica con ML-KEM, ML-DSA y SLH-DSA requiere inventario, pruebas y criptoagilidad."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiales y lecturas recomendadas",
    "id": "referencias-oficiales-y-lecturas-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 197 - Estándar de cifrado avanzado (AES): https://csrc.nist.gov/pubs/fips/197/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-38D - GCM y GMAC: https://csrc.nist.gov/pubs/sp/800/38/d/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 180-4 - Estándar Hash seguro: https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 202 - Estándar SHA-3: https://csrc.nist.gov/pubs/fips/202/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 186-5 - Estándar de firma digital: https://csrc.nist.gov/pubs/fips/186-5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-57 Parte 1 Rev. 5 - Gestión de claves: https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90A Rev. 1: Generadores deterministas de bits aleatorios: https://csrc.nist.gov/pubs/sp/800/90/a/r1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90B - Fuentes de entropía: https://csrc.nist.gov/pubs/sp/800/90/b/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90C - Construcciones de generadores de bits aleatorios: https://csrc.nist.gov/pubs/sp/800/90/c/final"
  },
  {
    "kind": "paragraph",
    "text": "RFC 2104 - HMAC: https://www.rfc-editor.org/info/rfc2104/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5869 - HKDF: https://www.rfc-editor.org/info/rfc5869/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8017 - PKCS #1 RSA v2.2: https://www.rfc-editor.org/info/rfc8017/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 7748 - X25519 y X448: https://www.rfc-editor.org/info/rfc7748/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8032 - EdDSA: https://www.rfc-editor.org/info/rfc8032/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8439: ChaCha20 y Poly1305: https://www.rfc-editor.org/info/rfc8439/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9106 - Argón2: https://www.rfc-editor.org/info/rfc9106/"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 203 - ML-KEM: https://csrc.nist.gov/pubs/fips/203/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 204 - ML-DSA: https://csrc.nist.gov/pubs/fips/204/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 205 - SLH-DSA: https://csrc.nist.gov/pubs/fips/205/final"
  },
  {
    "kind": "paragraph",
    "text": "Proyecto de criptografía poscuántica del NIST: https://csrc.nist.gov/projects/post-quantum-cryptography"
  },
  {
    "kind": "paragraph",
    "text": "Nota sobre los documentos bajo revisión Los estándares criptográficos evolucionan. A partir de julio de 2026, el NIST mantiene procesos de revisión de documentos como SP 800-38D y SP 800-57. Para proyectos nuevos, consulte siempre el estado de publicación oficial, la línea base de la organización y las matrices de soporte del producto antes de definir algoritmos y tamaños."
  }
];
