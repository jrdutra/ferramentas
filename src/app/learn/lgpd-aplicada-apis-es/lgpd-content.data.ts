import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const LGPD_ES_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "LGPD aplicada a las API: protección de datos durante todo el ciclo de vida"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/es/overview.svg",
    "alt": "Datos personales mediante recopilación, procesamiento, intercambio, retención y eliminación seguros",
    "caption": "Figura de apertura: la protección de datos sigue todo el ciclo de vida de la información procesada por las API."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "La privacidad debe traducirse en decisiones técnicas verificables, desde el contrato de API hasta los registros, las copias de seguridad, los terceros y la eliminación."
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
    "text": "Las API son canales de procesamiento de datos. Recopilan identificadores, reciben credenciales, consultan registros, mueven información entre sistemas, alimentan registros, cachés y colas y, en muchos casos, comparten datos con socios. Por lo tanto, la aplicación de la LGPD Personales no puede reducirse a un aviso de privacidad o una pantalla de consentimiento. El cumplimiento debe integrarse en el contrato, la arquitectura, el código, la operación y la gobernanza de la API."
  },
  {
    "kind": "paragraph",
    "text": "La LGPD regula el tratamiento de datos personales realizado por personas físicas o jurídicas de derecho público o privado, incluso en medios digitales. Para un equipo de API, esto significa comprender qué campos identifican o hacen identificable a una persona, qué finalidad justifica cada operación, quién decide el procesamiento, quién lo ejecuta on-behalf-of otro agente, qué terceros reciben datos y cuánto tiempo permanecen las copias en los entornos de producción, observabilidad, respaldo y desarrollo."
  },
  {
    "kind": "paragraph",
    "text": "El desafío técnico surge porque las API distribuidas multiplican copias y contextos. Un campo enviado en la carga útil puede aparecer en el registro de acceso de la API Gateway, en el seguimiento distribuido, en una cola de mensajes fallidos, en un lago de datos y en una copia de seguridad. Una solicitud de eliminación puede requerir acciones coordinadas entre múltiples servicios. Un cambio de contrato puede introducir una nueva categoría de datos sin que se actualice el análisis de impacto. Por lo tanto, mapear flujos y responsabilidades es una condición para aplicar la minimización, la necesidad, la transparencia y la seguridad."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo traduce los principios y obligaciones en prácticas para arquitectos, desarrolladores, equipos de API Gateways, seguridad y operaciones. El texto es didáctico y no sustituye a una valoración jurídica del caso concreto. La interpretación debe considerar la LGPD recopilada, la normativa vigente de la Agencia Nacional de Protección de Datos - ANPD, las normas sectoriales y los contratos aplicables."
  },
  {
    "kind": "paragraph",
    "text": "Cómo estudiar este capítulo Para cada endpoint, registre: finalidad, categorías de datos, base legal, propietario, origen, destinatarios, retención, controles de acceso, registros generados y procedimiento de cumplimiento de derechos. Esta token transforma conceptos legales en evidencia arquitectónica verificable."
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
      "Explique cómo se aplica la LGPD al ciclo de vida de una API.",
      "Distinguir datos personales, datos personales sensibles, datos anonimizados y seudonimizados.",
      "Relacionar los principios de la LGPD con los requisitos técnicos de los contratos y pasarelas.",
      "Diferenciar controlador, operador, supervisor y suboperadores en integraciones.",
      "Mapear las bases legales sin tratar el consentimiento como una opción universal.",
      "Diseño de minimización, retención, eliminación y cumplimiento de derechos.",
      "Aplique privacidad por diseño, seguridad y responsabilidad a las API.",
      "Comprender RIPD, incidencias, transferencias internacionales y contratos.",
      "Diagnostique riesgos en registros, tokens, cargas útiles, cachés, colas y entornos de prueba."
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
      "36.1 Alcance de la LGPD y el papel de las API",
      "36.2 Datos personales, sensibles, anonimización y seudonimización",
      "36.3 Principios traducidos en requisitos técnicos",
      "36.4 Agentes de procesamiento y responsabilidades",
      "36.5 Bases jurídicas y finalidad",
      "36.6 Inventario, mapeo de datos y linaje",
      "36.7 Minimización y diseño del contrato.",
      "36.8 Derechos de los titulares en arquitecturas distribuidas",
      "36.9 Retención, eliminación, copias de seguridad y registros",
      "36.10 Privacidad por diseño y RIPD",
      "36.11 Seguridad, incidencias y comunicación",
      "36.12 Transferencia internacional y terceros",
      "36.13 API Gateways, observabilidad y entornos de desarrollo",
      "36.14 Gobernanza, DevSecOps y evidencia",
      "36.15 Kids, adolescentes y protección reforzada",
      "36.16 Decisiones automatizadas, elaboración de perfiles e IA",
      "36.17 Inspección, sanciones y rendición de cuentas",
      "36.18 Troubleshooting y estudios de casos",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.1 Alcance de la LGPD y el papel de las API",
    "id": "36-1-alcance-de-la-lgpd-y-el-papel-de-las-api"
  },
  {
    "kind": "paragraph",
    "text": "La LGPD se aplica a las operaciones de tratamiento, un concepto amplio que incluye recolección, producción, recepción, clasificación, uso, acceso, reproducción, transmisión, distribución, procesamiento, archivo, almacenamiento, eliminación, evaluación, modificación, comunicación, transferencia, difusión y extracción. Una llamada API puede realizar varias de estas operaciones en secuencia. El endpoint no es sólo una interfaz técnica: es un punto en el flujo del tratamiento."
  },
  {
    "kind": "paragraph",
    "text": "El ámbito territorial no depende sólo de la ubicación del servidor. La ley cubre situaciones previstas en su texto, como procesamiento realizado en el territorio nacional, oferta o suministro de bienes y servicios a personas ubicadas en Brasil o datos recopilados en el país. Las arquitecturas globales necesitan analizar las regiones de la nube, el soporte internacional, la replicación, los proveedores y la transferencia de telemetría."
  },
  {
    "kind": "paragraph",
    "text": "Hay hipótesis de no aplicación y de regímenes especiales, pero hay que evaluarlas con atención. No es seguro asumir que una API interna está fuera de la LGPD o que los datos corporativos nunca son personales. Las direcciones de correo electrónico, matrículas, IP, identificaciones de usuario, identificadores de dispositivos y pistas de auditoría pueden estar relacionadas con personas físicas."
  },
  {
    "kind": "paragraph",
    "text": "Modelo mental La pregunta no es simplemente \"¿la respuesta contiene CPF?\". Pregunte si algún dato del flujo le permite identificar, individualizar, contactar, perfilar o tomar una decisión sobre una persona física, solo o en conjunto con otra información."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.2 Datos personales, sensibles, anonimización y seudonimización",
    "id": "36-2-datos-personales-sensibles-anonimizacion-y-seudonimizacion"
  },
  {
    "kind": "paragraph",
    "text": "Los datos personales son información relacionada con una persona física identificada o identificable. La identificación puede ser directa, como nombre y CPF, o indirecta, cuando combinaciones de atributos permiten reconocer a alguien. En las API, los identificadores técnicos también importan: un ID de cliente aparentemente aleatorio sigue siendo dato personal si la organización puede relacionarlo con el titular."
  },
  {
    "kind": "paragraph",
    "text": "Los datos personales sensibles reciben una protección mejorada. La categoría incluye, entre otros elementos definidos por la LGPD, datos sobre origen racial o étnico, convicciones religiosas, opinión política, afiliación sindical, salud, vida sexual, genética y biometría cuando se vincula a una persona. Una API de autenticación biométrica, atención médica o prevención de fraude debe reconocer explícitamente esta categoría y aplicar controles y bases legales compatibles."
  },
  {
    "kind": "paragraph",
    "text": "La anonimización busca eliminar la posibilidad razonable de asociación directa o indirecta con una persona, considerando los medios técnicos disponibles en el momento. La seudonimización reemplaza los identificadores con claves o tokens, pero preserva la posibilidad de reidentificación a través de información adicional. La seudonimización reduce el riesgo y la exposición, pero los datos siguen sujetos a la LGPD."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - La clasificación de los datos debe considerar el contexto y la posibilidad de asociación.",
    "headers": [
      "Categoría",
      "Ejemplo en API",
      "Implicación técnica"
    ],
    "rows": [
      [
        "Datos personales directos",
        "nombre, CPF, correo electrónico",
        "Acceso restringido, finalidad explícita y retención."
      ],
      [
        "Identificador indirecto",
        "ID de cliente, IP, ID de dispositivo",
        "Sigue siendo personal si existe una asociación razonable."
      ],
      [
        "Datos sensibles",
        "biometría, salud",
        "Protección reforzada e hipótesis jurídicas específicas."
      ],
      [
        "Seudónimo",
        "token que reemplaza a CPF",
        "Reduce la exposición, pero los datos personales permanecen."
      ],
      [
        "Anonimizado",
        "estadística sin reidentificación razonable",
        "Puedes abandonar el régimen, siempre que la anonimización sea efectiva."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.3 Principios traducidos en requisitos técnicos",
    "id": "36-3-principios-traducidos-en-requisitos-tecnicos"
  },
  {
    "kind": "paragraph",
    "text": "Los principios del art. 6. Guía todo el diseño. El propósito requiere que la API tenga un propósito legítimo, específico e informado. La adecuación requiere coherencia entre el tratamiento y la finalidad declarada. La necesidad limita el tratamiento al mínimo pertinente. Acceso gratuito, guía de calidad y transparencia a la documentación y canales de atención. La seguridad y la prevención requieren controles técnicos y administrativos. La no discriminación previene el uso abusivo. La rendición de cuentas y la rendición de cuentas requieren evidencia."
  },
  {
    "kind": "paragraph",
    "text": "En ingeniería, los principios deben convertirse en criterios de aceptación. La necesidad se puede verificar revisando el esquema y los campos opcionales. La transparencia puede respaldarse mediante catálogos y avisos coherentes. La seguridad aparece en la autenticación, autorización, cifrado, segregación, pruebas y monitoreo. La responsabilidad aparece en las decisiones registradas, los propietarios, el inventario, las revisiones, las métricas y los registros de auditoría."
  },
  {
    "kind": "paragraph",
    "text": "Los principios también ayudan a resolver situaciones que no están cubiertas por una regla operativa específica. Cuando un equipo quiere agregar un campo al registro \"para facilitar el soporte\", la pregunta no es solo si técnicamente funciona. Es necesario evaluar la necesidad, el riesgo, el acceso, la retención y la transparencia."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Los principios deben ser observables en las decisiones arquitectónicas y operativas.",
    "headers": [
      "Principio",
      "Pregunta para la API",
      "control asociado"
    ],
    "rows": [
      [
        "Propósito",
        "¿Por qué este endpoint necesita los datos?",
        "Registro de finalidad y uso permitido."
      ],
      [
        "necesidad",
        "¿Cuál es el campo mínimo establecido?",
        "Esquemas mínimos y filtrado de respuestas."
      ],
      [
        "Transparencia",
        "¿El titular entiende el flujo?",
        "Documentación y aviso consistentes."
      ],
      [
        "Seguridad",
        "¿Quién puede acceder y cómo protegemos?",
        "IAM, cifrado, registros y pruebas."
      ],
      [
        "Responsabilidad",
        "¿Qué evidencia demuestra el cumplimiento?",
        "Inventario, aprobaciones y auditoría."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.4 Agentes de procesamiento y responsabilidades",
    "id": "36-4-agentes-de-procesamiento-y-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "El responsable del tratamiento es la persona que toma las decisiones relativas al tratamiento. El operador lleva a cabo el tratamiento on-behalf-ofl responsable del tratamiento. El responsable actúa como canal de comunicación y desarrolla las funciones definidas en la LGPD y normativa. En las cadenas modernas, los proveedores de nube, las plataformas de observabilidad, los gateways gestionados y las oficinas pueden actuar como operadores o suboperadores según el contexto contractual y fáctico."
  },
  {
    "kind": "paragraph",
    "text": "La clasificación no es sólo el resultado del nombre utilizado en el contrato. Es necesario observar quién determina las finalidades y elementos esenciales del tratamiento. Una misma organización puede ser controlador en un flujo y operador en otro. Los arquitectos deben registrar las responsabilidades de API, dominio e integración, evitando documentos genéricos que no reflejen las operaciones reales."
  },
  {
    "kind": "paragraph",
    "text": "Los contratos con los operadores deberán describir instrucciones, confidencialidad, seguridad, subcontratación, incidencias, devolución o eliminación de datos, auditoría y soporte a los derechos de los interesados. Estos elementos deben coincidir con las capacidades técnicas del producto. No tiene sentido prometer una eliminación inmediata si la arquitectura mantiene copias en copias de seguridad sin una política definida."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Los artículos deben analizarse por operación de procesamiento, no sólo por empresa.",
    "headers": [
      "papel",
      "decisión principal",
      "Evidencia sobre API"
    ],
    "rows": [
      [
        "Controlador",
        "Define propósito y medios esenciales.",
        "Catálogo, base legal, titular y normas de uso."
      ],
      [
        "Operador",
        "Ejecute según las instrucciones.",
        "Contrato, runbook, controles e informes."
      ],
      [
        "a cargo",
        "Soporte de canales y gobernanza.",
        "Flujo de servicios y recomendaciones."
      ],
      [
        "Suboperador",
        "Ejecuta parte de la cadena.",
        "Inventario de terceros y cláusulas aplicables."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.5 Bases jurídicas y finalidad",
    "id": "36-5-bases-juridicas-y-finalidad"
  },
  {
    "kind": "paragraph",
    "text": "Cada operación de tratamiento debe estar respaldada por una hipótesis jurídica adecuada. La LGPD prevé bases diferentes para los datos personales y para los datos personales sensibles. El consentimiento es sólo uno de ellos y no debe utilizarse automáticamente cuando otra base representa mejor la relación. La elección requiere un análisis jurídico y fáctico, el registro del propósito y la coherencia entre la recopilación, el uso y el intercambio."
  },
  {
    "kind": "paragraph",
    "text": "La ejecución de un contrato, el cumplimiento de obligaciones legales o reglamentarias, el ejercicio regular de los derechos, la protección de la vida, la protección de la salud, la protección del crédito y el interés legítimo son ejemplos previstos por la ley, cada uno con sus propias condiciones. El interés legítimo requiere evaluación de finalidad, necesidad, equilibrio y salvaguardas, además de la consideración de las expectativas y derechos legítimos del titular."
  },
  {
    "kind": "paragraph",
    "text": "En la API, la base legal no necesita viajar como encabezado en cada llamada, pero debe estar vinculada al inventario y las reglas del producto. El mismo endpoint puede tener diferentes propósitos; esto debe evitarse cuando obstaculice la segregación y la gobernanza. Las API muy genéricas aumentan el riesgo de reutilización incompatible."
  },
  {
    "kind": "paragraph",
    "text": "El consentimiento no es sinónimo de autenticación. El inicio de sesión prueba o ayuda a comprobar quién está interactuando. El consentimiento es una expresión concreta para una finalidad determinada, cuando ésta sea la base aplicable. Una pantalla de inicio de sesión o el uso continuado del servicio no reemplazan automáticamente los requisitos de consentimiento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.6 Inventario, mapeo de datos y linaje",
    "id": "36-6-inventario-mapeo-de-datos-y-linaje"
  },
  {
    "kind": "paragraph",
    "text": "El inventario de procesamiento debe estar conectado al catálogo de API. Para cada operación, registre categorías de titulares, datos, finalidad, base jurídica, sistemas de origen y destino, participaciones, retención, controles y responsables. OpenAPI le ayuda a identificar campos, pero no revela por sí solo registros, transformaciones, cachés, réplicas u objetivos indirectos."
  },
  {
    "kind": "paragraph",
    "text": "El mapeo de datos describe el flujo. Lineage registra la trayectoria y las transformaciones. En una API Gateway, la carga útil se puede transformar, enriquecer y reenviar. En la mensajería, los eventos se pueden replicar a múltiples consumidores. En observabilidad, los atributos se pueden exportar a herramientas externas. El mapa debe incluir estas rutas, no sólo la base de datos principal."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/es/figure-01.svg",
    "alt": "Mapa del ciclo de vida de los datos que incluye API, registros, colas, cachés y copias de seguridad",
    "caption": "Figura 1: El mapa de datos debe incluir componentes operativos y copias indirectas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.7 Minimización y diseño del contrato.",
    "id": "36-7-minimizacion-y-diseno-del-contrato"
  },
  {
    "kind": "paragraph",
    "text": "La minimización comienza con el diseño. Las solicitudes sólo deben solicitar los datos necesarios; Las respuestas deben evitar objetos de gran tamaño. El hecho de que un backend tenga muchos campos no significa que todos tengan que pasar por la API Gateway. Las API basadas en contexto, los scopes adecuados, la autorización a nivel de campo y las proyecciones controladas ayudan a reducir la exposición."
  },
  {
    "kind": "paragraph",
    "text": "También es necesario minimizar los errores. Los seguimientos de pila, SQL, tokens, claves, datos de registro y respuestas completas de los proveedores no deberían llegar al consumidor. El mensaje externo debe ser útil sin revelar detalles innecesarios. Internamente, los registros deben equilibrar el diagnóstico y la protección."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL merece especial atención porque el cliente elige los campos. La autorización por campo, los límites de complejidad y los esquemas cuidadosamente diseñados evitan que la flexibilidad se convierta en exposición. En REST, los filtros de campo y las representaciones múltiples también deben respetar la autorización y el propósito."
  },
  {
    "kind": "paragraph",
    "text": "Contrato orientado a las necesidades # Ejemplo conceptual de respuesta minimizada { \"clienteId\": \"c_9f32...\", \"nomeExibicao\": \"João D.\", \"status\": \"ACTIVO\" } # No devolver por defecto: CPF completo, dirección, # biometría, historial y datos de otros dominios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.8 Derechos de los titulares en arquitecturas distribuidas",
    "id": "36-8-derechos-de-los-titulares-en-arquitecturas-distribuidas"
  },
  {
    "kind": "paragraph",
    "text": "La LGPD garantiza derechos como la confirmación de la existencia del tratamiento, el acceso, la rectificación, la anonimización, el bloqueo o supresión bajo determinadas condiciones, la portabilidad, la información sobre la compartición y la revisión de decisiones automatizadas en los términos aplicables. La operación deberá contar con un canal, autenticación proporcional y un proceso de localización de los datos del titular."
  },
  {
    "kind": "paragraph",
    "text": "En microservicios, el servicio no puede depender de consultas manuales sin coordinación. Un servicio de privacidad puede orquestar solicitudes, consultar catálogos y linajes, enviar comandos a dominios y recopilar pruebas. La identidad utilizada para localizar los datos debe ser segura: solicitar el CPF en texto plano a todos los servicios puede crear una nueva exposición."
  },
  {
    "kind": "paragraph",
    "text": "La eliminación no es absoluta en todas las situaciones. Las obligaciones legales y reglamentarias, el ejercicio de derechos y otras hipótesis pueden justificar la conservación. El sistema debe distinguir los datos activos, bloqueados, archivados y eliminados, registrando la base y el plazo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/es/figure-02.svg",
    "alt": "Derechos de los titulares coordinados entre identidad, catálogo y sistemas distribuidos",
    "caption": "Figura 2: Los derechos del titular requieren coordinación entre identidad, catálogo y sistemas distribuidos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.9 Retención, eliminación, copias de seguridad y registros",
    "id": "36-9-retencion-eliminacion-copias-de-seguridad-y-registros"
  },
  {
    "kind": "paragraph",
    "text": "La retención debe definirse por el propósito y la obligación aplicable, no por el hábito técnico. Los bancos, objetos, temas, cachés e índices necesitan políticas. Los datos caducados no deberían permanecer indefinidamente sólo porque el almacenamiento sea barato. La póliza debe describir el inicio del conteo, eventos que modifican el plazo, disposición y evidencia."
  },
  {
    "kind": "paragraph",
    "text": "Las copias de seguridad requieren un tratamiento específico. La eliminación inmediata de todos los registros en todos los medios puede no ser práctica, pero la organización debe controlar el acceso, limitar la retención y evitar que los datos restaurados vuelvan a su uso activo sin volver a aplicar las eliminaciones. Los runbooks de restauración deben abordar este riesgo."
  },
  {
    "kind": "paragraph",
    "text": "Los registros y rastros son fuentes frecuentes de fugas. Los tokens, headers de autorización, cookies, cargas útiles, cadenas de consulta e identificadores confidenciales deben enmascararse u omitirse. El principio es registrar lo necesario para el funcionamiento y la auditoría, utilizando identificadores de correlación y referencias seudónimas en lugar de contenido completo."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Las copias operativas deben formar parte de la política de retención.",
    "headers": [
      "Activo",
      "Riesgo típico",
      "Control recomendado"
    ],
    "rows": [
      [
        "Registro de acceso",
        "Headers o consulta con datos personales.",
        "Lista de campos permitidos y enmascaramiento."
      ],
      [
        "rastreo distribuido",
        "Identificadores de propagación de equipaje.",
        "Política de atributos y redacción."
      ],
      [
        "Fila/DLQ",
        "Carga útil retenida indefinidamente.",
        "TTL, cifrado y acceso restringido."
      ],
      [
        "Copia de seguridad",
        "Restaurar reintroduce los datos eliminados.",
        "Runbook de reaplicación y retención."
      ],
      [
        "Entorno de prueba",
        "Copia de producción desprotegida.",
        "Datos sintéticos o enmascarados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.10 Privacidad por diseño e Informe de Impacto",
    "id": "36-10-privacidad-por-diseno-e-informe-de-impacto"
  },
  {
    "kind": "paragraph",
    "text": "La privacidad por diseño significa incorporar protección desde la concepción del producto y durante todo su ciclo de vida. En la práctica, el descubrimiento identifica datos y propósitos; el diseño define minimización, segregación y autorización; el desarrollo implementa controles; las pruebas validan el abuso y la exposición; la operación mide, revisa y responde a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "El Informe de Impacto en la Protección de Datos Personales - RIPD - documenta tratamientos que pueden generar riesgos y describe medidas, salvaguardas y mecanismos de mitigación. La necesidad, forma y oportunidad deben considerar la LGPD, lineamientos de la ANPD, riesgo y contexto sectorial. Para las API, los diagramas de flujo, el inventario, las amenazas, los contratos y la evidencia técnica se incorporan al informe."
  },
  {
    "kind": "paragraph",
    "text": "La evaluación debe actualizarse cuando haya un cambio relevante: nuevo propósito, nuevo tercero, datos sensibles, elaboración de perfiles, expansión de escala, uso de IA, transferencia internacional o integración con ecosistemas externos. Un RIPD estático, desconectado del catálogo y del canal, pierde valor rápidamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/es/figure-03.svg",
    "alt": "Privacidad por diseño siguiendo requisitos, contratos, pruebas e implementación",
    "caption": "Figura 3: La privacidad debe seguir la rutina y los cambios de contrato."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.11 Seguridad, incidencias y comunicación",
    "id": "36-11-seguridad-incidencias-y-comunicacion"
  },
  {
    "kind": "paragraph",
    "text": "La LGPD exige medidas técnicas y administrativas capaces de proteger los datos contra accesos no autorizados y situaciones accidentales o ilícitas. Para las API, esto implica autenticación sólida, least privilege, mTLS cuando corresponda, cifrado, administración de secretos, segmentación, validación de entradas, protección contra abusos, seguridad de dependencias y monitoreo."
  },
  {
    "kind": "paragraph",
    "text": "Un incidente de seguridad no es automáticamente sinónimo de una obligación de comunicación, pero es necesario evaluarlo. El Reglamento de Notificación de Incidentes de Seguridad de la ANPD define criterios y procedimientos para situaciones que puedan resultar en riesgos o daños relevantes. La organización debe contar con un proceso para detectar, clasificar, contener, preservar evidencia y decidir rápidamente."
  },
  {
    "kind": "paragraph",
    "text": "El inventario de API acelera la respuesta. Cuando una credencial queda expuesta, necesita saber a qué endpoints llega, qué datos pueden haberse consultado, qué registros registran el uso y cómo revocarlos. La comunicación, cuando corresponda, debe ser consistente con hechos confirmados y medidas adoptadas."
  },
  {
    "kind": "subhead",
    "text": "Respuesta a una incidencia que involucre datos personales"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/es/figure-04.svg",
    "alt": "Respuesta a incidentes que conecta la contención, la evaluación de riesgos y la gobernanza",
    "caption": "Figura 4: La respuesta a incidentes combina operación técnica, evaluación de riesgos y gobernanza."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.12 Transferencia internacional y terceros",
    "id": "36-12-transferencia-internacional-y-terceros"
  },
  {
    "kind": "paragraph",
    "text": "La transferencia internacional ocurre cuando los datos personales se transfieren a un país extranjero u organización internacional. Las arquitecturas en la nube pueden realizar transferencias mediante alojamiento, soporte, observabilidad, respaldo, CDN o acceso remoto. La ubicación del endpoint por sí sola no revela todos los flujos."
  },
  {
    "kind": "paragraph",
    "text": "La Resolución CD/ANPD N° 19/2024 regula los mecanismos de transferencia, incluyendo cláusulas contractuales tipo, cláusulas específicas, estándares corporativos globales y decisiones de adecuación. En 2025, se modificó el reglamento. Los equipos deben mantener un inventario de destinos, proveedores, subprocesadores, regiones y mecanismos legales correspondientes."
  },
  {
    "kind": "paragraph",
    "text": "Las API de terceros también requieren la debida diligencia. El contrato deberá limitar finalidad, instrucciones, retención, subcontratación, seguridad e incidencias. Técnicamente, el control de salida, las listas permitidas, las API Gateways, el Token Exchange, la seudonimización y la minimización reducen la exposición. El proveedor deberá recibir únicamente lo necesario para su función."
  },
  {
    "kind": "paragraph",
    "text": "La nube no elimina la responsabilidad El servicio administrado reduce la carga operativa, pero no reemplaza la clasificación de datos, la configuración segura, los contratos, el control regional, la revisión del subprocesador y el monitoreo de acceso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.13 API Gateways, observabilidad y entornos de desarrollo",
    "id": "36-13-api-gateways-observabilidad-y-entornos-de-desarrollo"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway es un valioso punto de aplicación: autenticación, autorización, validación de esquemas, filtrado de campos, enmascaramiento, limitación de velocidad y auditoría. Sin embargo, no debería convertirse en un depósito de carga útil sin restricciones. Los seguimientos detallados y los monitores de tráfico requieren acceso controlado, retención breve y enmascaramiento."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe favorecer los metadata operativos: estado, latencia, ID de ruta, ID de cliente seudonimizado, resultado de política e ID de correlación. La captura del cadáver debe ser excepcional, justificada y temporal. Los paneles y las alertas también pueden exponer datos si las etiquetas y dimensiones tienen una alta cardinalidad con los identificadores de personas."
  },
  {
    "kind": "paragraph",
    "text": "Los entornos de desarrollo y aprobación deben utilizar datos sintéticos o adecuadamente enmascarados. Copiar la base de producción para investigar errores crea un tratamiento adicional y expande la superficie. Las herramientas de reproducción deben eliminar credenciales, cookies y campos personales."
  },
  {
    "kind": "paragraph",
    "text": "Política mínima para telemetría API # Ejemplo conceptual de política de registro permitir: método, ID de ruta, estado, latencia Ms, ID de seguimiento seudonimizar: ID de cliente, ID de socio máscara: correo electrónico, teléfono, bloque de documentos: autorización, cookie, token, contraseña, datos biométricos carga útil completa: solo excepción aprobada y temporal"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.14 Gobernanza, DevSecOps y evidencia",
    "id": "36-14-gobernanza-devsecops-y-evidencia"
  },
  {
    "kind": "paragraph",
    "text": "El cumplimiento sostenible depende de la automatización. El catálogo de API puede almacenar el propietario, la clasificación de los datos, el propósito y la retención. Linters puede detectar campos sensibles en OpenAPI. Las canalizaciones pueden evitar registros de headers prohibidos, requerir modelado de amenazas y aprobaciones de registros. Los escáneres y las pruebas contratados verifican la exposición accidental."
  },
  {
    "kind": "paragraph",
    "text": "La evidencia como código es la práctica de generar evidencia a partir de la cinta transportadora: hash del contrato, resultados de las pruebas, versión de la política, inventario actualizado, aprobación de seguridad y registro de implementación. Esto reduce las auditorías basadas en hojas de cálculo obsoletas. Las pruebas deben ser completas, accesibles para los responsables y proporcionadas al riesgo."
  },
  {
    "kind": "paragraph",
    "text": "La gobernanza también incluye capacitación, métricas y revisiones periódicas. Indicadores útiles: API con clasificación completa, campos sensibles sin propietario, registros con redacción, solicitudes del propietario a tiempo, incidentes, terceros revisados y retenciones vencidas."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - El cumplimiento aumenta cuando la cinta genera evidencia.",
    "headers": [
      "Control de cinta de correr",
      "Pruebas producidas",
      "Fracaso evitado"
    ],
    "rows": [
      [
        "Pelusa abierta API",
        "Informe de campos críticos.",
        "Entran nuevos datos sin revisión."
      ],
      [
        "Pruebas de políticas",
        "Resultado versionado.",
        "La API Gateway pierde encabezado o carga útil."
      ],
      [
        "SAST/exploración secreta",
        "Hallazgos y correcciones.",
        "Credenciales en el código."
      ],
      [
        "Implementación firmada",
        "Artefacto y aprobación.",
        "Configuración imposible de rastrear."
      ],
      [
        "Revisión periódica",
        "Registro y retención de propietarios.",
        "Inventario obsoleto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.15 Kids, adolescentes y protección reforzada",
    "id": "36-15-kids-adolescentes-y-proteccion-reforzada"
  },
  {
    "kind": "paragraph",
    "text": "El tratamiento de datos de kids y adolescentes requiere una consideración prioritaria de su interés superior. Los servicios digitales, las API educativas, los juegos, la salud, la identidad y los beneficios deben evaluar los mecanismos de lenguaje, transparencia, elaboración de perfiles, publicidad, intercambio y verificación o medición de la edad cuando corresponda al producto y la legislación vigente."
  },
  {
    "kind": "paragraph",
    "text": "Desde una perspectiva técnica, la arquitectura debe reducir la recopilación, evitar inferencias innecesarias, limitar la retención y evitar el uso secundario incompatible. Los identificadores de tutores, los datos escolares, la ubicación, los datos biométricos y el historial de uso pueden aumentar el riesgo. Los controles de consentimiento o representación, cuando sean necesarios, no deben implementarse como una simple casilla de verificación desconectada de la identidad y el propósito."
  },
  {
    "kind": "paragraph",
    "text": "La Ley N° 15.211/2025, conocida como Estatuto Digital del Kid y del Adolescente, agregó deberes específicos al ecosistema digital y reforzó la coordinación con la LGPD. A medida que evolucionan las regulaciones y las inspecciones, los equipos deben seguir las pautas oficiales de la ANPD y revisar los productos destinados a menores o accesibles a ellos."
  },
  {
    "kind": "paragraph",
    "text": "Protección por defecto Para audiences potencialmente más pequeñas, la configuración inicial debe priorizar la privacidad: menos recopilación, menos exposición, uso compartido restringido y controles comprensibles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.16 Decisiones automatizadas, elaboración de perfiles e inteligencia artificial",
    "id": "36-16-decisiones-automatizadas-elaboracion-de-perfiles-e-inteligencia-artificial"
  },
  {
    "kind": "paragraph",
    "text": "Las API suelen proporcionar puntuaciones, recomendaciones, detección de fraude, umbrales y clasificaciones producidas por modelos. Cuando las decisiones automatizadas afecten los intereses de su titular, la arquitectura debe permitir la explicabilidad proporcional, revisión, impugnación e identificación de criterios relevantes, observando los secretos comerciales e industriales y la legislación aplicable."
  },
  {
    "kind": "paragraph",
    "text": "El riesgo no está sólo en el endpoint de la inferencia. Los datos de entrenamiento, las funciones, las indicaciones, los registros, los comentarios y los resultados también forman parte del tratamiento. Es necesario registrar origen, finalidad, calidad, sesgos, retención, acceso y participaciones. Un modelo alojado por un tercero puede introducir transferencias internacionales, suboperadores y uso de datos secundarios."
  },
  {
    "kind": "paragraph",
    "text": "Los controles técnicos incluyen separación entre identificadores y atributos, control de versiones del modelo, registro de decisiones, monitoreo de deriva, pruebas de discriminación, revisión humana en casos críticos y limitación de datos enviados a los proveedores. La decisión de utilizar el interés legítimo, el consentimiento u otra base debe analizarse en el contexto concreto."
  },
  {
    "kind": "table",
    "caption": "Tabla 6: La IA extiende el ciclo de vida y requiere evidencia adicional.",
    "headers": [
      "Elemento",
      "Riesgo",
      "Se necesita evidencia"
    ],
    "rows": [
      [
        "Tienda de funciones",
        "Reutilizar más allá de su propósito.",
        "Catálogo, origen y política de retención."
      ],
      [
        "Endpoint de puntuación",
        "Decisión opaca o discriminatoria.",
        "Versión, criterios y revisión."
      ],
      [
        "Aviso/contexto",
        "Datos personales enviados a terceros.",
        "Minimización y contrato."
      ],
      [
        "Comentarios",
        "Ampliación silenciosa del tratamiento.",
        "Propósito y base revisados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.17 Inspección, sanciones y rendición de cuentas",
    "id": "36-17-inspeccion-sanciones-y-rendicion-de-cuentas"
  },
  {
    "kind": "paragraph",
    "text": "La ANPD puede actuar con carácter orientador, preventivo, supervisor y sancionador. La LGPD prevé sanciones administrativas y la Resolución CD/ANPD N° 4/2023 regula la dosimetría y su aplicación. El análisis considera factores previstos en las leyes y reglamentos, tales como severidad, buena fe, ventaja, reincidencia, cooperación y adopción de mecanismos capaces de minimizar el daño."
  },
  {
    "kind": "paragraph",
    "text": "Para los equipos técnicos, la rendición de cuentas significa demostrar que se tomaron decisiones antes del incidente o la auditoría. Las políticas documentadas, el inventario actualizado, las pruebas, las revisiones de acceso, los registros de eliminación, la capacitación y la respuesta a incidentes son evidencia más sólida que los documentos genéricos producidos posteriormente."
  },
  {
    "kind": "paragraph",
    "text": "Las métricas de cumplimiento deben ser procesables. La cantidad de API sin propietario, campos confidenciales no clasificados, retenciones vencidas, credenciales expuestas, solicitudes tardías y terceros no revisados ayudan a priorizar el riesgo. La gobernanza debe evitar transformar la privacidad en un mero recuento de documentos."
  },
  {
    "kind": "paragraph",
    "text": "Responsabilidad no es burocracia El objetivo de la evidencia es permitirnos reconstruir por qué la organización procesó datos, qué controles aplicó, cómo evaluó el riesgo y cómo corrigió las desviaciones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.18 Troubleshooting y estudios de casos",
    "id": "36-18-troubleshooting-y-estudios-de-casos"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1: carga útil que aparece en los registros: una API de registro registra todo el cuerpo para su diagnóstico. El problema no se resuelve simplemente reduciendo la retención. El análisis debe identificar campos, usuarios con acceso, destinos de exportación, respaldos y consultas realizadas. La remediación incluye eliminar la captura, enmascarar, restringir el acceso, revisar incidentes y actualizar pruebas."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2: Solicitud de purga incompleta: el registro maestro se elimina, pero los eventos, los índices y el lago de datos permanecen. La causa es un inventario incompleto y la falta de linaje. La solución requiere orquestación, estados de bloqueo, política de retención y evidencia por dominio."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3: el proveedor internacional recibe más datos de los necesarios: la integración envía el objeto completo cuando solo se necesita una puntuación. La solución combina contrato mínimo, seudonimización, control de salida, mecanismo de transferencia y revisión de propósito."
  },
  {
    "kind": "paragraph",
    "text": "La troubleshooting de privacidad debe preservar la evidencia sin ampliar la exposición. Evite copiar datos a chats, tickets y hojas de cálculo. Utilice ID de correlación, acceso temporal, entornos controlados y procedimientos de emergencia auditables."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumen del capítulo",
    "id": "resumen-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Aplicar LGPD a las API significa transformar principios y obligaciones en una arquitectura verificable. El cumplimiento comienza en el inventario, pasa por el propósito, la base legal, la minimización y las responsabilidades y continúa a través de registros, colas, copias de seguridad, terceros y cumplimiento de derechos."
  },
  {
    "kind": "paragraph",
    "text": "Los controladores y operadores necesitan conocer el flujo real. El contrato OpenAPI es parte de la evidencia, pero debe complementarse con linaje, retención, políticas de API Gateway, observabilidad y contratos con proveedores. Los datos seudonimizados siguen siendo personales; El consentimiento no sustituye a otras bases jurídicas ni se confunde con la autenticación."
  },
  {
    "kind": "paragraph",
    "text": "La privacidad por diseño, RIPD, la seguridad y la respuesta a incidentes forman un ciclo continuo. Los cambios de API pueden cambiar el riesgo y el propósito, lo que requiere revisión. La automatización de los controles y las pruebas en la cinta transportadora reduce la dependencia de los procesos manuales y aumenta la capacidad de demostrar responsabilidad."
  },
  {
    "kind": "paragraph",
    "text": "El siguiente paso del curso, el Capítulo 37, profundiza en las arquitecturas bancarias de alta disponibilidad, conectando la continuidad, la redundancia, la coherencia, la capacidad y la recuperación con los requisitos críticos de API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Lista de verificación LGPD para API",
    "id": "lista-de-verificacion-lgpd-para-api"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Por operación se registra la finalidad, la base jurídica, las categorías de datos y el titular de los datos.",
      "Los esquemas y las respuestas siguen la minimización y autorización por contexto.",
      "La API Gateway, los registros, los seguimientos, las colas, las cachés, las copias de seguridad y las pruebas se encuentran en el mapa de datos.",
      "Las funciones del controlador, operador y terceros reflejan la práctica y los contratos.",
      "La retención, el bloqueo, la eliminación y la restauración tienen reglas y pruebas.",
      "Los derechos de los titulares pueden satisfacerse de forma coordinada y segura.",
      "Los datos sensibles y los identificadores técnicos reciben una clasificación adecuada.",
      "Se encuentran inventariadas las transferencias internacionales y los subprocesadores.",
      "Las políticas impiden el registro de tokens, cookies, contraseñas y cargas útiles innecesarios.",
      "Los cambios de contrato desencadenan una revisión de la privacidad y los riesgos.",
      "Los incidentes tienen un proceso de contención, evaluación y comunicación.",
      "La cinta transportadora genera evidencias de pruebas, aprobaciones y versiones implementadas."
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
      "Asigne el ciclo de vida de los datos de una API de registro desde la API Gateway hasta las copias de seguridad.",
      "Clasifique el ID del cliente, la IP, la biometría y la puntuación crediticia y justifíquelos.",
      "Explique por qué la seudonimización no hace que los datos sean anónimos automáticamente.",
      "Compare el controlador y el operador en una integración SaaS antifraude.",
      "Proponer una respuesta minimizada para una API de consulta de cliente.",
      "Diseñar el flujo de respuesta a una solicitud de acceso en microservicios.",
      "Establezca una política de retención para registros de acceso, seguimientos, DLQ y copias de seguridad.",
      "Enumere los desencadenantes para actualizar un RIPD después del cambio de API.",
      "Proponer controles de API Gateway para evitar fugas de registros.",
      "Describa la evidencia necesaria para investigar un incidente simbólico expuesto."
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
    "caption": "Tabla 6 - Vocabulario esencial del capítulo.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "ANPD",
        "Agencia Nacional de Protección de Datos, responsable de regular y monitorear la protección de datos en Brasil."
      ],
      [
        "Anonimización",
        "Uso de medios técnicos razonables para eliminar la posibilidad de asociación con una persona."
      ],
      [
        "Base jurídica",
        "Hipótesis prevista por la ley que legitima una operación de tratamiento."
      ],
      [
        "Controlador",
        "Agente responsable de las decisiones relativas al tratamiento."
      ],
      [
        "Datos personales",
        "Información relacionada con una persona física identificada o identificable."
      ],
      [
        "Datos sensibles",
        "Categoría de datos personales con protección reforzada definida por la LGPD."
      ],
      [
        "a cargo",
        "Agente de canal y soporte con funciones previstas en la LGPD y normativa."
      ],
      [
        "Linaje",
        "Trazabilidad del origen, transformación y destino de los datos."
      ],
      [
        "Operador",
        "Agente que trata los datos por cuenta del responsable del tratamiento."
      ],
      [
        "Privacidad por diseño",
        "Integración de la protección de datos desde la concepción y durante todo el ciclo de vida."
      ],
      [
        "Seudonimización",
        "Tratamiento que separa identificadores, manteniendo la reidentificación mediante información adicional."
      ],
      [
        "RIPD",
        "Informe de Impacto en Protección de Datos Personales."
      ],
      [
        "Decisión automatizada",
        "Resultado producido exclusiva o predominantemente por procesamiento automatizado."
      ],
      [
        "Titular",
        "Persona física a quien se refieren los datos personales."
      ],
      [
        "Tratamiento",
        "Amplio conjunto de operaciones realizadas con datos personales."
      ],
      [
        "Transferencia internacional",
        "Transferencia de datos personales a un país extranjero u organización internacional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias técnicas y normativas",
    "id": "referencias-tecnicas-y-normativas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "BRASIL. Ley N° 13.709/2018 - LGPD Personales, texto compilado.",
      "BRASIL. Ley N° 13.853/2019 - modificaciones a la LGPD y creación de la ANPD.",
      "BRASIL. Ley N° 15.211/2025 - Estatuto Digital del Kid y del Adolescente.",
      "BRASIL. Ley nº 15.352/2026 - transformación de la ANPD en organismo regulador y modificaciones relacionadas.",
      "ANPD. Normativa vigente de la Agencia Nacional de Protección de Datos.",
      "ANPD. Resolución CD/ANPD nº 4/2023 - dosimetría y aplicación de sanciones administrativas.",
      "ANPD. Resolución CD/ANPD nº 15/2024 - Reglamento de Notificación de Incidentes de Seguridad.",
      "ANPD. Resolución CD/ANPD nº 18/2024 - función del responsable del tratamiento de datos personales.",
      "ANPD. Resolución CD/ANPD nº 19/2024 - Transferencia Internacional de Datos y cláusulas contractuales tipo.",
      "ANPD. Orientación sobre Hipótesis Jurídicas - Interés Legítimo.",
      "ANPD. Guía sobre seguridad de la información para pequeños agentes de procesamiento.",
      "ANPD. Guía para las definiciones de agentes de procesamiento y persona encargada.",
      "ANPD. Portal de derechos del interesado.",
      "OWASP. API Security Top 10 y prácticas de seguridad para API."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota legal y de actualización Este capítulo es material educativo. La aplicación de la LGPD depende del contexto, sector y normativa vigente. Validar decisiones con las áreas jurídica, de privacidad, seguridad y regulatoria y consultar las publicaciones oficiales actualizadas de la ANPD."
  }
];
