import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.
export const DNS_NAT_ES_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "presentacion-del-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "En capítulos anteriores, estudiamos cómo una aplicación produce una solicitud, cómo TCP o UDP transportan datos entre procesos y cómo IPv4 o IPv6 identifican interfaces y permiten a los enrutadores elegir una ruta. Este capítulo agrega los componentes que hacen que una arquitectura empresarial sea utilizable a escala: DNS transforma nombres estables en destinos mutables; NAT traduce identidades de red; los proxies dividen una comunicación en conexiones independientes; y los equilibradores seleccionan una instancia entre varias posibilidades."
  },
  {
    "kind": "paragraph",
    "text": "Estos mecanismos a menudo se dibujan en un solo diagrama como cuadros consecutivos, pero tienen diferentes responsabilidades. DNS normalmente participa antes de la conexión. NAT cambia los campos de los paquetes y mantiene el estado de traducción. Un proxy cierra una conexión y crea otra, pudiendo interpretar el protocolo de la aplicación. Un equilibrador aplica una estrategia de selección sobre un conjunto de objetivos. Un mismo producto puede realizar varias de estas funciones, lo que hace imprescindible distinguir el concepto de la implementación."
  },
  {
    "kind": "paragraph",
    "text": "En entornos API Gateway, los errores atribuidos a la aplicación suelen surgir antes de que se ejecute la política. Es posible que un registro privado no sea visible para el tiempo de ejecución; una respuesta DNS puede permanecer almacenada en caché; un grupo puede considerar una instancia en buen estado mediante una prueba superficial; un proxy puede reemplazar al Anfitrión; un equilibrador puede finalizar TLS con un certificado diferente; o un SNAT puede utilizar un origen no previsto por la lista de permitidos del backend. El último síntoma podría ser tiempo de espera, 502, 503, error de certificado o comportamiento intermitente."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo de este capítulo es proporcionar un modelo mental de un extremo a otro. Al final, el lector debería poder localizar dónde se tomó una decisión, qué datos se cambiaron y qué evidencia se debe recopilar en cada etapa. La atención se centra no en memorizar productos, sino en comprender los principios que se aplican a Axway API Gateway, Azure API Management, NGINX, HAProxy, Envoy, dispositivos de red, controladores de ingreso y servicios administrados en la nube."
  },
  {
    "kind": "subhead",
    "text": "Principio central"
  },
  {
    "kind": "paragraph",
    "text": "El nombre, la dirección, la conexión, el mensaje HTTP y la instancia de backend son objetos diferentes. Un diagnóstico fiable registra la transformación entre ellos en cada salto."
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
      "Explique la jerarquía DNS, las zonas, las delegaciones y las funciones del stub resolver, el resolvedor recursivo y el servidor autoritativo.",
      "Interpretar consultas, respuestas, códigos, banderas y los principales tipos de registros de recursos utilizados en las API.",
      "Relacione los cambios de TTL, caché positiva, caché negativa y DNS con el comportamiento real del cliente.",
      "Comprenda por qué DNS utiliza UDP y TCP, la función de EDNS(0) y el impacto del bloqueo selectivo.",
      "Diseñe DNS públicos, privados y de horizonte dividido para puertas de enlace, puntos finales privados y entornos híbridos.",
      "Diferenciar entre DNSSEC, DoT, DoH y TSIG, incluyendo qué protege cada mecanismo y qué no.",
      "Profundice la NAT básica, NAPT/PAT, SNAT, DNAT, horquilla NAT, tiempos de espera y agotamiento de puertos.",
      "Distinga el proxy directo, el proxy inverso, la puerta de enlace HTTP y el túnel según la semántica HTTP.",
      "Compare el paso a través de TLS, la descarga, el recifrado y mTLS cuando hay intermediarios.",
      "Diferenciar balanceo L4, L7 y basado en DNS, además de algoritmos de selección y afinidad.",
      "Diseñe controles de estado, preparación, drenaje, inicio lento y conmutación por error sin producir falsos positivos.",
      "Aplicar los conceptos a Axway API Gateway y los servicios de Azure utilizados en arquitecturas API.",
      "Diagnosticar fallas de resolución, 502/503, origen inesperado, distribución desigual y agotamiento de SNAT."
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
      "4.1 Cuatro decisiones diferentes en el camino hacia una API",
      "4.2 Arquitectura y jerarquía DNS",
      "4.3 Zonas, delegaciones y autoridad",
      "4.4 Resolución recursiva e iterativa",
      "4.5 Mensajes DNS y registros de recursos",
      "4.6 TTL, almacenamiento en caché y propagación",
      "4.7 UDP, TCP, EDNS y DNS cifrado",
      "4.8 DNS privado, horizonte dividido y descubrimiento de servicios",
      "4.9 Disponibilidad y equilibrio basados en DNS",
      "4.10 Seguridad DNS y DNSSEC",
      "4.11 NAT en profundidad",
      "4.12 SNAT, DNAT, horquilla y CGNAT",
      "4.13 NAT en gateways y nube",
      "4.14 Intermediarios HTTP",
      "4.15 Proxy directo, proxy inverso, puerta de enlace y túnel",
      "4.16 Capa 4, Capa 7 y terminación TLS",
      "4.17 Host, SNI, URL y encabezados reenviados",
      "4.18 Fundamentos del balanceo de carga",
      "4.19 Algoritmos de selección",
      "4.20 Controles de salud y ciclo de vida",
      "4.21 Agrupación de afinidad, estado y conexión",
      "4.22 Arquitectura multicapa",
      "4.23 Aplicación en Axway y Azure",
      "4.24 Solución de problemas",
      "4.25 Estudios de casos y laboratorios",
      "Resumen, lista de verificación, ejercicios, glosario y referencias."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.1 Cuatro decisiones diferentes en el camino hacia una API",
    "id": "4-1-cuatro-decisiones-diferentes-en-el-camino-hacia-una-api"
  },
  {
    "kind": "paragraph",
    "text": "Cuando una aplicación llama a https://api.empresa.com/clientes, la primera decisión es la resolución: ¿a qué dirección o servicio corresponde el nombre api.empresa.com? Esta decisión la toma el sistema de resolución de nombres, normalmente DNS, y puede producir una dirección IPv4, IPv6, una cadena de alias o información de servicio adicional. El resultado puede depender del entorno, la ubicación del resolvedor, el caché y las políticas de tráfico global."
  },
  {
    "kind": "paragraph",
    "text": "La segunda decisión es la traducción. Al atravesar una NAT, se reemplazan las direcciones y eventualmente los puertos del flujo. El destino puede observar la IP de un firewall, puerta de enlace en la nube o grupo SNAT, en lugar de la IP original de la aplicación. Esta traducción es una operación de red orientada al estado y no es equivalente al proxy HTTP, aunque ambos mecanismos pueden existir en el mismo equipo."
  },
  {
    "kind": "paragraph",
    "text": "La tercera decisión es de intermediación. Un proxy inverso recibe una conexión del cliente, interpreta o reenvía el mensaje y crea otra conexión ascendente. A partir de este punto existen dos relaciones de transporte independientes: cliente-proxy y proxy-backend. Los tiempos de espera, las versiones HTTP, los certificados, las direcciones de mantenimiento y de origen pueden ser diferentes para cada tramo."
  },
  {
    "kind": "paragraph",
    "text": "La cuarta decisión es la selección de instancias. Cuando hay varios destinos elegibles, un equilibrador elige cuál recibirá el flujo o la solicitud. La elección depende del algoritmo, pesos, estado de salud, afinidad y políticas de localidad. DNS, proxy y API Gateway también pueden realizar algún tipo de distribución, pero el momento y la granularidad de elección son diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Responsabilidades que deben analizarse por separado.",
    "headers": [
      "Mecanismo",
      "Entrada principal",
      "Decisión o transformación",
      "Evidencia típica"
    ],
    "rows": [
      [
        "DNS",
        "Nombre y tipo de registro",
        "Devuelve datos de resolución",
        "excavar, nslookup, Resolve-DnsName"
      ],
      [
        "NAT",
        "Flujo de IP/puerto",
        "Traducir origen o destino",
        "Tabla NAT, captura, registros de flujo"
      ],
      [
        "apoderado",
        "Conexión y protocolo",
        "Finaliza y recrea la comunicación.",
        "Registro de acceso, registro ascendente, encabezados"
      ],
      [
        "equilibrador de carga",
        "Grupo elegible",
        "Seleccionar destino",
        "Salud, algoritmo, métricas de backend"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.2 Arquitectura y jerarquía DNS",
    "id": "4-2-arquitectura-y-jerarquia-dns"
  },
  {
    "kind": "paragraph",
    "text": "El Sistema de Nombres de Dominio fue diseñado como una base de datos jerárquica distribuida. En lugar de mantener una tabla central que contenga todos los nombres de Internet, el espacio de nombres se organiza como un árbol invertido. La parte superior es la raíz, representada por un punto. Debajo se encuentran dominios de nivel superior como com, org y br. Cada sucursal se puede delegar en diferentes organizaciones, que luego gestionan las áreas correspondientes."
  },
  {
    "kind": "paragraph",
    "text": "Un nombre completo, o FQDN, se compone de etiquetas separadas por puntos. En api.pagamentos.empresa.com., api, pagos, empresa y com son etiquetas, y el punto explica la raíz. Las interfaces y herramientas a menudo omiten este punto final, pero la distinción entre nombre absoluto y nombre relativo es importante en los archivos de zona y en las configuraciones que agregan sufijos de búsqueda."
  },
  {
    "kind": "paragraph",
    "text": "La jerarquía proporciona escalabilidad administrativa. La organización responsable de com no necesita conocer las direcciones de api.empresa.com; debe indicar qué servidores tienen autoridad de empresa.com. De manera similar, la zona empresa.com puede delegar pagos.empresa.com a otro equipo. La resolución pasa por estas referencias hasta llegar a una autoridad capaz de responder al nombre consultado."
  },
  {
    "kind": "paragraph",
    "text": "DNS no es sólo una lista de nombres-IP. Almacena conjuntos de datos escritos llamados conjuntos de registros de recursos. Un nombre puede tener registros A, AAAA, TXT, MX, CAA y otros. La respuesta correcta depende del nombre, clase y tipo solicitado. Este modelo explica por qué puede existir un nombre y aún no tener el tipo de registro solicitado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-01-dns-hierarchy.svg",
    "alt": "Árbol jerárquico DNS con raíz, TLD, zonas y delegaciones",
    "caption": "Figura 1: la autoridad se distribuye entre zonas y delegaciones en el árbol DNS."
  },
  {
    "kind": "subhead",
    "text": "nombre absoluto"
  },
  {
    "kind": "paragraph",
    "text": "En configuración DNS, api.empresa.com y api.empresa.com. se puede interpretar de manera diferente. El punto indica que el nombre ya está completo y no debe tener el sufijo de la zona actual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.3 Zonas, delegaciones y autoridad",
    "id": "4-3-zonas-delegaciones-y-autoridad"
  },
  {
    "kind": "paragraph",
    "text": "Una zona DNS es la parte del espacio de nombres administrada como una unidad. Zona y dominio no son sinónimos perfectos: un dominio puede contener subdominios delegados que pertenecen a otras zonas. La zona empresa.com, por ejemplo, puede contener registros para api.empresa.com y delegado socios.empresa.com. Después de la delegación, los registros internos de los socios se mantienen en los servidores designados para la nueva zona."
  },
  {
    "kind": "paragraph",
    "text": "La delegación la publican los registros NS en el lado principal. Dependiendo de la posición de los propios servidores de nombres, pueden ser necesarios registros adicionales llamados glue para evitar la dependencia circular. Si empresa.com es atendido por ns1.empresa.com, el padre debe proporcionar la dirección de ns1.empresa.com junto con la referencia; de lo contrario, el resolvedor tendría que consultar la zona antes de saber cómo llegar a ella."
  },
  {
    "kind": "paragraph",
    "text": "El registro SOA describe las propiedades administrativas de la zona, como el servidor principal, el contacto, el número de serie y los temporizadores relacionados con la transferencia y el caché negativo. El serial es utilizado por servidores secundarios para detectar cambios. El diseño de alta disponibilidad normalmente publica varios servidores autoritativos en redes y ubicaciones independientes, y a menudo utiliza anycast para distribuir consultas."
  },
  {
    "kind": "paragraph",
    "text": "Una respuesta autoritativa significa que el servidor responde en función de la zona para la que tiene autoridad, no sólo en función del caché. La bandera AA del mensaje DNS indica esta condición en las respuestas apropiadas. En la resolución de problemas, preguntar a un resolvedor recursivo y preguntar directamente a cada servidor autoritativo son pruebas diferentes: la primera revela la experiencia del cliente; el segundo ayuda a identificar divergencias entre servidores y propagación de zonas."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Componentes de autoridad y delegación.",
    "headers": [
      "Elemento",
      "Función",
      "Fallo típico"
    ],
    "rows": [
      [
        "Zona",
        "unidad administrativa de datos DNS",
        "Registro creado en la zona incorrecta"
      ],
      [
        "Delegación NS",
        "Indica autoridad de la zona infantil.",
        "NS inconsistente o no disponible"
      ],
      [
        "pegamento",
        "Proporciona dirección para el servidor de nombres dentro de la zona delegada.",
        "Dependencia de resolución circular"
      ],
      [
        "SOA serie",
        "Versiones del contenido de la zona",
        "Secundario no detecta actualización"
      ],
      [
        "servidor autoritativo",
        "Responde a los datos del área.",
        "Respuestas divergentes entre réplicas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.4 Resolución recursiva e iterativa",
    "id": "4-4-resolucion-recursiva-e-iterativa"
  },
  {
    "kind": "paragraph",
    "text": "Normalmente, la aplicación no atraviesa la jerarquía DNS directamente. Utiliza un stub resolver del sistema operativo, que envía una consulta al resolvedor recursivo configurado en la red. El stub resolver solicita una respuesta final y generalmente activa el indicador RD, recursividad deseada. El resolvedor recursivo consulta su caché y, cuando es necesario, toma medidas para obtener la respuesta en nombre del cliente."
  },
  {
    "kind": "paragraph",
    "text": "En la resolución iterativa, los servidores intermedios devuelven la mejor información que tienen, normalmente una referencia a los servidores de la zona siguiente. El recursivo comienza con una raíz, recibe una referencia al TLD, consulta el TLD, recibe una referencia a la autoridad y luego consulta la zona de anotación. El resultado se almacena en caché de acuerdo con los TTL de los RRsets recibidos."
  },
  {
    "kind": "paragraph",
    "text": "La ruta exacta puede ser más compleja debido a los CNAME, las delegaciones, los registros adicionales y la validación de DNSSEC. Un CNAME indica que el nombre consultado es un alias de otro nombre; el resolvedor debe continuar resolviendo hasta obtener el tipo final. Cada enlace tiene su propio TTL y puede apuntar a una zona administrada por otra organización o proveedor de tráfico."
  },
  {
    "kind": "paragraph",
    "text": "En las redes corporativas, el resolvedor recursivo puede actuar como reenviador y reenviar consultas a otro resolvedor en lugar de atravesar la jerarquía pública. Esta cadena es común en sucursales, VPN y entornos de nube. También crea dependencias: una regla de reenvío condicional incorrecta puede provocar que nombres privados salgan a Internet o crear bucles entre servidores DNS."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-02-recursive-resolution.svg",
    "alt": "Secuencia de resolución de DNS entre aplicación, resolución recursiva, raíz, TLD y servidor autoritativo",
    "caption": "Figura 2: ejemplo simplificado de resolución recursiva con consultas iterativas."
  },
  {
    "kind": "subhead",
    "text": "Comandos de vigilancia: solo se ejecutan en entornos autorizados"
  },
  {
    "kind": "code",
    "text": "# Linux / macOS\ndig api.empresa.com A\ndig api.empresa.com AAAA\ndig +trace api.empresa.com\ndig @ns1.exemplo.net api.empresa.com A +norecurse"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nResolve-DnsName api.empresa.com -Type A\nResolve-DnsName api.empresa.com -Type AAAA\nResolve-DnsName api.empresa.com -Server 10.0.0.10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.5 Mensajes DNS y registros de recursos",
    "id": "4-5-mensajes-dns-y-registros-de-recursos"
  },
  {
    "kind": "paragraph",
    "text": "El mensaje DNS tiene un encabezado y cuatro secciones lógicas: Pregunta, Respuesta, Autoridad y Adicional. El encabezado incluye identificador, banderas y contadores de registros. Entre las banderas relevantes se encuentran QR, que distingue consulta y respuesta; RD y RA, relacionados con la recursividad; AA, que indica respuesta autoritaria; TC, que señala truncamiento; y el código de respuesta, como NOERROR, NXDOMAIN o SERVFAIL."
  },
  {
    "kind": "paragraph",
    "text": "Los datos se transportan como registros de recursos. Un RR contiene nombre, tipo, clase, TTL y datos específicos. Los registros con el mismo nombre, tipo y clase forman un RRset y deben tratarse como un conjunto. Esta idea es importante en DNSSEC y múltiples registros A o AAAA: el orden presentado no debe confundirse con garantías de selección o afinidad."
  },
  {
    "kind": "paragraph",
    "text": "A y AAAA asocian nombres con direcciones IPv4 e IPv6. CNAME crea un alias para otro nombre y tiene restricciones de coexistencia con otros datos en el mismo nodo. NS informa servidores autoritativos. SOA describe la zona. PTR se utiliza en resolución inversa. MX dirige el correo. TXT transporta texto estructurado por diferentes protocolos. SRV le permite descubrir el host y el puerto de un servicio, mientras que CAA informa qué autoridades certificadoras pueden emitir certificados para el dominio."
  },
  {
    "kind": "paragraph",
    "text": "Las API modernas también pueden encontrar registros SVCB y HTTPS, que le permiten anunciar las propiedades, alternativas y parámetros de conexión de un servicio. El soporte depende del cliente y de la plataforma; por lo tanto, estos registros no reemplazan automáticamente la configuración A, AAAA o de proxy inverso. El arquitecto debe separar la existencia del patrón de la capacidad realmente desplegada en el entorno."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Registros frecuentes de recursos en entornos corporativos.",
    "headers": [
      "Tipo",
      "Datos principales",
      "Uso en arquitectura API"
    ],
    "rows": [
      [
        "un",
        "dirección IPv4",
        "Punto final público o privado"
      ],
      [
        "AAAA",
        "dirección IPv6",
        "Doble pila y acceso IPv6"
      ],
      [
        "CNOMBRE",
        "Nombre canónico",
        "Alias para puerta de entrada, CDN o servicio gestionado"
      ],
      [
        "NS",
        "Servidor de nombres",
        "Delegación de zona"
      ],
      [
        "SOA",
        "Metadatos de zona",
        "Parámetros seriales y administrativos."
      ],
      [
        "PTR",
        "Nombre asociado a la IP",
        "Resolución inversa y auditoría"
      ],
      [
        "SRV",
        "Prioridad, peso, puerto y destino",
        "Descubrimiento de servicios en protocolos compatibles"
      ],
      [
        "CAA",
        "CA autorizada",
        "Gobernanza de la emisión de certificados"
      ],
      [
        "texto",
        "texto arbitrario",
        "Verificaciones y políticas de dominio"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Ficha de zona didáctica con bloques de documentación"
  },
  {
    "kind": "code",
    "text": "; Ejemplo didáctico de zona\n$ORIGIN empresa.com.\n$TTL 300\n@       IN SOA ns1.empresa.com. dnsadmin.empresa.com. (\n            2026071501  ; serial\n            3600        ; refresh\n            600         ; retry\n            1209600     ; expire\n            300 )       ; negative cache\n        IN NS  ns1.empresa.com.\n        IN NS  ns2.empresa.com.\napi     IN A   198.51.100.25\napi     IN AAAA 2001:db8:20::25\nstatus  IN CNAME api.empresa.com."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.6 TTL, almacenamiento en caché y significado de propagación",
    "id": "4-6-ttl-almacenamiento-en-cache-y-significado-de-propagacion"
  },
  {
    "kind": "paragraph",
    "text": "El TTL de un registro de recursos indica cuánto tiempo pueden permanecer los datos en la memoria caché. Cuando un resolvedor recibe un RRset con TTL 300, puede reutilizarlo durante cinco minutos sin consultar nuevamente a la autoridad. El valor disminuye en la caché y la entrada caduca cuando llega a cero. Authoritative no envía notificaciones a todos los cachés cuando cambia el registro; por lo tanto, diferentes clientes pueden observar respuestas antiguas hasta que caduquen sus entradas."
  },
  {
    "kind": "paragraph",
    "text": "La expresión propagación de DNS se utiliza de manera informal, pero puede ocultar diferentes fenómenos: transferencia de zona entre entidades autorizadas, actualización de los servidores de un proveedor, caducidad de cachés recursivos, caché del sistema operativo, caché de aplicaciones e incluso agrupación de conexiones para la dirección anterior. Cambiar el registro en el panel y confirmar el nuevo valor en el autoritativo no garantiza que una aplicación con caché o conexión persistente lo utilice inmediatamente."
  },
  {
    "kind": "paragraph",
    "text": "Un TTL bajo reduce el posible período de datos obsoletos y es útil antes de las migraciones, pero aumenta las consultas, la dependencia del DNS y la carga operativa. Además, algunos componentes aplican valores mínimos, máximos o sus propias estrategias de actualización. Para un cambio planificado, el TTL debe recortarse con suficiente antelación para que el valor anterior caduque en las cachés antes del recorte."
  },
  {
    "kind": "paragraph",
    "text": "La caché negativa almacena el conocimiento de que un nombre no existe, representado por NXDOMAIN, o que el nombre existe pero no tiene el tipo solicitado, a menudo llamado NODATA. Esta optimización reduce las consultas repetidas, pero sorprende a los equipos que crean un registro justo después de una respuesta negativa. El tiempo de caché negativo se deriva de la información de la zona según las reglas DNS actuales."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-03-ttl-cache.svg",
    "alt": "Línea de tiempo TTL con caché positiva, caché negativa, caducidad y resolución",
    "caption": "Figura 3: La caché sigue siendo válida hasta que caduque el TTL, incluso para respuestas negativas."
  },
  {
    "kind": "subhead",
    "text": "Cambio de punto final seguro"
  },
  {
    "kind": "paragraph",
    "text": "Antes de cambiar una dirección, reduzca el TTL, espere a que caduque el TTL anterior, valide el nuevo objetivo, realice el recorte y mantenga el objetivo anterior disponible durante la ventana de transición cuando sea posible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.7 UDP, TCP, EDNS y DNS cifrado",
    "id": "4-7-udp-tcp-edns-y-dns-cifrado"
  },
  {
    "kind": "paragraph",
    "text": "Las consultas DNS clásicas utilizan el puerto 53 a través de UDP y TCP. UDP tiene un coste menor ya que no establece conexión y responde a la mayoría de consultas. Sin embargo, DNS sobre TCP no es solo un mecanismo de transferencia de zona: las implementaciones deben admitirlo para respuestas grandes y truncadas y escenarios modernos. Un firewall que permite UDP/53 y bloquea TCP/53 puede crear fallas selectivas que son difíciles de reproducir."
  },
  {
    "kind": "paragraph",
    "text": "En el formato original, un mensaje DNS UDP tenía un pequeño límite práctico. EDNS(0) agrega un pseudorregistro OPT mediante el cual el solicitante anuncia los recursos y el tamaño de la carga útil UDP que puede recibir. Los valores exagerados pueden provocar fragmentación de IP; Los valores adecuados buscan equilibrar la eficiencia y la confiabilidad. Cuando la respuesta no encaja, el servidor puede configurar el indicador TC y el cliente vuelve a intentarlo a través de TCP."
  },
  {
    "kind": "paragraph",
    "text": "DNS sobre TLS, normalmente asociado al puerto 853, y DNS sobre HTTPS, transportado a través de HTTPS, protegen el canal entre el cliente y el resolvedor contra observación o alteración en la ruta. No convierten al resolvedor en una autoridad confiable por sí mismos y no proporcionan autenticación criptográfica de datos de zona como DNSSEC. La organización necesita evaluar la privacidad, la gobernanza, el filtrado y la observabilidad al habilitar resolvedores externos o DoH integrado en las aplicaciones."
  },
  {
    "kind": "paragraph",
    "text": "En las redes corporativas, interceptar o bloquear DoH sin una estrategia puede dañar las aplicaciones, mientras que liberarlas indiscriminadamente puede eludir las políticas privadas de DNS, registro y seguridad. El objetivo de la arquitectura debe ser proporcionar resolvedores corporativos que sean confiables, redundantes y compatibles con los mecanismos requeridos, al tiempo que controlan explícitamente qué canales alternativos están permitidos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-04-dns-transports.svg",
    "alt": "Comparación de transportes DNS UDP, TCP, EDNS, DNS sobre TLS y DNS sobre HTTPS",
    "caption": "Figura 4: DNS tiene múltiples transportes; cada uno resuelve un problema diferente."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Fallos relacionados con el transporte DNS.",
    "headers": [
      "Síntoma",
      "Posible causa",
      "prueba"
    ],
    "rows": [
      [
        "Las consultas simples funcionan, DNSSEC falla",
        "EDNS o respuestas grandes filtradas",
        "cavar + dnssec y capturar"
      ],
      [
        "UDP funciona, la gran respuesta falla",
        "TCP/53 bloqueado después de TC=1",
        "excavar + tcp"
      ],
      [
        "La aplicación omite el DNS privado",
        "Propio Departamento de Salud o resolución externa",
        "Verifique el destino DNS de la aplicación"
      ],
      [
        "Tiempo de espera solo en una rama",
        "Fragmentación/MTU o firewall DNS",
        "Compare la carga útil y la ruta de EDNS"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.8 DNS privado, horizonte dividido y descubrimiento de servicios",
    "id": "4-8-dns-privado-horizonte-dividido-y-descubrimiento-de-servicios"
  },
  {
    "kind": "paragraph",
    "text": "El DNS privado publica nombres que solo deben resolverse en determinados entornos, como redes corporativas, redes virtuales, clústeres y centros de datos. El acceso depende de qué resolvedores y zonas son visibles para la fuente. Puede existir un punto final privado sin una integración DNS adecuada y aún así quedar inutilizable: la aplicación continuará resolviendo el nombre en el punto final público o recibirá NXDOMAIN."
  },
  {
    "kind": "paragraph",
    "text": "En horizonte dividido, el mismo nombre devuelve diferentes respuestas según la ruta de resolución. Un cliente externo puede recibir la dirección WAF pública, mientras que la puerta de enlace interna recibe la dirección privada del backend. Esta técnica preserva nombres, certificados y URL consistentes, pero requiere disciplina para evitar divergencias silenciosas entre zonas públicas y privadas."
  },
  {
    "kind": "paragraph",
    "text": "El reenvío condicional dirige consultas para ciertos sufijos a resolvedores específicos. En un entorno híbrido, la VNet puede reenviar las corp.empresa al centro de datos, mientras que el centro de datos reenvía zonas de enlace privado o de nube al resolvedor correspondiente. Las reglas simétricas mal diseñadas pueden crear bucles y la falta de reglas puede filtrar nombres internos a los resolvedores públicos."
  },
  {
    "kind": "paragraph",
    "text": "El descubrimiento de servicios en Kubernetes y mallas de servicios también utiliza nombres y registros, pero los ciclos de vida son más dinámicos. Un servicio puede resolverse en una IP de clúster virtual, una lista de pods o un punto final de proxy. El TTL corto y el comportamiento de almacenamiento en caché del cliente son decisivos. Las bibliotecas que se resuelven una vez al inicio no rastrean los cambios, mientras que los servidores proxy como Envoy pueden consumir API de descubrimiento y tener una vista explícita de los puntos finales."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-05-split-horizon.svg",
    "alt": "DNS de horizonte dividido dirigido al mismo nombre para puntos finales públicos y privados",
    "caption": "Figura 5: el mismo FQDN puede dirigir clientes públicos y privados a diferentes puntos finales."
  },
  {
    "kind": "subhead",
    "text": "El punto final privado no es DNS"
  },
  {
    "kind": "paragraph",
    "text": "El punto final proporciona conectividad privada. La aplicación aún necesita resolver el nombre de la dirección privada, tener una ruta y pasar las políticas de red y TLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.9 Disponibilidad y equilibrio basados en DNS",
    "id": "4-9-disponibilidad-y-equilibrio-basados-en-dns"
  },
  {
    "kind": "paragraph",
    "text": "DNS puede devolver varias direcciones o elegir respuestas según la prioridad, el peso, la ubicación, el rendimiento y las políticas de salud. Esta técnica se utiliza para la distribución global y la conmutación por error entre regiones. La decisión se produce en la resolución; después de eso, el cliente se conecta directamente al punto final devuelto. Por lo tanto, el servicio DNS no necesariamente observa la conexión o solicitud de aplicación."
  },
  {
    "kind": "paragraph",
    "text": "El comportamiento depende del resolvedor recursivo. Las políticas geográficas pueden ver la dirección del resolvedor, que puede estar lejos del usuario real. El TTL controla cuánto tiempo permanece la decisión en caché. Durante una falla, los clientes con una respuesta anterior pueden continuar probando el punto final no disponible hasta que caduque el caché o la aplicación implemente su propio respaldo."
  },
  {
    "kind": "paragraph",
    "text": "Múltiples registros A o AAAA por sí solos no constituyen un balanceador de verificación de salud. El orden puede variar y los clientes sólo pueden elegir la primera dirección. Eliminar un registro no finaliza las conexiones existentes y no elimina la entrada de todas las cachés inmediatamente. El balanceo de carga basado en DNS debe combinarse con puntos finales resistentes y monitoreo compatible con ventanas de caché."
  },
  {
    "kind": "paragraph",
    "text": "Anycast es otra técnica utilizada por la infraestructura DNS y los servicios globales. La misma dirección se anuncia en varias ubicaciones y el enrutamiento de Internet lleva al cliente a una instancia cercana según la topología BGP. Anycast no es una operación por turnos de DNS: la respuesta puede contener una única IP, mientras que la distribución se produce en la capa de enrutamiento."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Diferentes formas de distribución global.",
    "headers": [
      "Estrategia",
      "Momento de decisión",
      "ventaja",
      "Limitación"
    ],
    "rows": [
      [
        "A/AAAA Múltiplos",
        "En el cliente/resolvedor",
        "Simplicidad",
        "La salud y las opciones varían según el cliente."
      ],
      [
        "GSLB por DNS",
        "Durante la resolución",
        "Distribución global y conmutación por error",
        "Vista TTL y resolvedor"
      ],
      [
        "cualquier transmisión",
        "Enrutamiento IP",
        "Punto final global con proximidad",
        "Depende de los anuncios y la convergencia."
      ],
      [
        "proxy inverso global",
        "Con cada conexión/solicitud",
        "Control L7, WAF y TLS",
        "El tráfico pasa por el servicio."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.10 Seguridad DNS y DNSSEC",
    "id": "4-10-seguridad-dns-y-dnssec"
  },
  {
    "kind": "paragraph",
    "text": "El DNS clásico se creó en un entorno con supuestos de confianza diferentes a los actuales. Los ataques pueden explotar respuestas falsificadas, envenenamiento de caché, servidores comprometidos, secuestro de la configuración del resolvedor y registros administrativos alterados. Los identificadores aleatorios, los puertos de origen impredecibles y las validaciones adicionales aumentan la resiliencia, pero no proporcionan una prueba criptográfica completa del origen de los datos."
  },
  {
    "kind": "paragraph",
    "text": "DNSSEC agrega autenticación de origen e integridad a los datos DNS a través de firmas sobre RRsets y una cadena de confianza basada en registros DS y DNSKEY. Un resolvedor validador puede distinguir datos firmados válidos, respuestas demostrablemente inexistentes y fallas de validación. DNSSEC no proporciona confidencialidad: los observadores aún pueden ver nombres y respuestas en el DNS tradicional."
  },
  {
    "kind": "paragraph",
    "text": "La validación depende del tiempo, las claves, las firmas y la publicación correcta. Una rotación mal ejecutada o una firma caducada pueden convertir una zona existente en SERVFAIL para los clientes validadores. Por lo tanto, DNSSEC requiere procedimientos específicos de monitoreo, sincronización horaria y transferencia. El beneficio es reducir la posibilidad de que un intermediario presente datos manipulados como si fueran autorizados."
  },
  {
    "kind": "paragraph",
    "text": "DNS sobre TLS y DNS sobre HTTPS protegen el transporte al resolvedor, mientras que DNSSEC protege la autenticidad de los datos entre la zona firmada y el validador. TSIG, a su vez, autentica transacciones entre participantes que comparten una clave, como transferencias y actualizaciones dinámicas. Estos mecanismos son complementarios y no deben tratarse como sustitutos."
  },
  {
    "kind": "subhead",
    "text": "Volver a vincular DNS"
  },
  {
    "kind": "paragraph",
    "text": "Las aplicaciones que confían únicamente en el nombre recibido del usuario pueden resolverse inicialmente en una IP pública y luego en una dirección interna. Los controles SSRF deben validar destinos, rangos, redireccionamientos y nuevas resoluciones efectivos, no solo la cadena del nombre de host."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.11 NAT en profundidad",
    "id": "4-11-nat-en-profundidad"
  },
  {
    "kind": "paragraph",
    "text": "La traducción de direcciones de red modifica las direcciones de los paquetes IP a medida que atraviesan un dispositivo perimetral. En NAT básica, una dirección de un dominio se asigna a otra dirección. En NAPT o PAT, la traducción incluye identificadores de transporte, lo que permite que múltiples conexiones internas compartan una dirección externa a través de diferentes puertos. El dispositivo mantiene el estado para invertir la traducción en el tráfico de retorno."
  },
  {
    "kind": "paragraph",
    "text": "Una traducción cambia los campos cubiertos por sumas de verificación. NAT necesita ajustar la IP y las sumas de verificación de transporte de acuerdo con el protocolo. Los protocolos que transportan direcciones o puertos dentro de la carga útil pueden requerir puertas de enlace a nivel de aplicación o fallar porque la traducción de encabezados no actualiza automáticamente los datos internos. La criptografía que protege estos campos también limita la capacidad de traducción transparente."
  },
  {
    "kind": "paragraph",
    "text": "NAT no es un firewall, aunque suele estar en el mismo equipo. El hecho de que una conexión entrante no tenga asignación no reemplaza la política de filtrado explícita. Port forwarding y DNAT pueden publicar servicios internos; las conexiones iniciadas desde dentro crean el estado; Las reglas del firewall determinan lo que se debe permitir. La seguridad debe modelarse como una política, no como un efecto secundario de abordarla."
  },
  {
    "kind": "paragraph",
    "text": "La presencia de NAT rompe la transparencia de las direcciones de un extremo a otro. Los registros de backend muestran la identidad traducida y los protocolos que dependen de la IP del cliente necesitan otro mecanismo. En HTTP, los servidores proxy controlados pueden insertar Forwarded o X-Forwarded-For, pero estos encabezados son metadatos de la aplicación y pueden falsificarse si el borde no elimina los valores enviados por el consumidor."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-06-pat-state.svg",
    "alt": "Tabla de estado PAT que traduce los flujos internos a distintos puertos públicos",
    "caption": "Figura 6: PAT permite que los flujos internos compartan una dirección externa a través de diferentes puertos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.12 SNAT, DNAT, NAT en horquilla y CGNAT",
    "id": "4-12-snat-dnat-nat-en-horquilla-y-cgnat"
  },
  {
    "kind": "paragraph",
    "text": "La NAT de origen cambia el origen del flujo y es común cuando se sale a Internet o a una red asociada. La NAT de destino cambia el destino y se utiliza para publicar un servicio interno detrás de una dirección virtual. Una conexión puede atravesar ambos: el cliente llega a un VIP que es DNAT para el servidor, y el retorno puede ser SNAT para garantizar la simetría y ocultar la topología interna."
  },
  {
    "kind": "paragraph",
    "text": "Hairpin NAT, también llamado NAT loopback, ocurre cuando un cliente interno accede a la dirección externa de un servicio que también está en la red interna. El dispositivo necesita traducir y guiar el flujo de regreso al interior. Sin soporte o configuración correcta, el cliente puede resolver el nombre público, enviarlo al firewall y recibir una respuesta directa del servidor, rompiendo el estado esperado. A menudo se utiliza DNS dividido para evitar este camino."
  },
  {
    "kind": "paragraph",
    "text": "NAT de nivel de operador permite a los proveedores compartir direcciones IPv4 entre suscriptores. En arquitecturas B2B, esto reduce la utilidad de identificar a un consumidor únicamente mediante IP pública. Varios clientes pueden compartir la misma dirección y el grupo puede cambiar. La lista de permitidos por IP puede seguir siendo un requisito de conectividad, pero no debería ser la única autenticación de una API confidencial."
  },
  {
    "kind": "paragraph",
    "text": "La doble NAT ocurre cuando el flujo atraviesa traducciones sucesivas, por ejemplo, NAT local, CGNAT y NAT en la nube. Cada estado tiene sus propios tiempos de espera y límites de puertos. La solución de problemas debe registrar el origen observado en cada límite; asumir que la IP de la estación llegará al backend produce reglas y auditorías incorrectas."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Modalidades de traducción y sus impactos.",
    "headers": [
      "Tipo",
      "Campo cambiado",
      "uso frecuente",
      "Riesgo operacional"
    ],
    "rows": [
      [
        "SNAT",
        "Origen",
        "Salida de puerta de enlace/API al backend",
        "Agotamiento de puertos y lista de permitidos"
      ],
      [
        "ADNT",
        "Destino",
        "Publicación VIP o de servicio.",
        "retorno asimétrico"
      ],
      [
        "PAT/NAPT",
        "IP y puerto",
        "Compartir dirección externa",
        "Estado y tiempo de espera"
      ],
      [
        "horquilla",
        "Traducción interna de retorno",
        "Acceso interno a dirección externa",
        "flujo asimétrico"
      ],
      [
        "CGNAT",
        "Origen en el proveedor",
        "Compartir IPv4 entre suscriptores",
        "IP no identifica al cliente"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.13 NAT en API Gateways y entornos de nube",
    "id": "4-13-nat-en-api-gateways-y-entornos-de-nube"
  },
  {
    "kind": "paragraph",
    "text": "Una API Gateway crea conexiones salientes a backends. Dependiendo del modo de red, estas conexiones pueden salir a través de las direcciones propias de la instancia, a través de un Gateway NAT, firewall, dispositivo o conjunto de IP administradas. El backend analiza esta fuente traducida y necesita permitir todas las direcciones posibles. El escalado, el cambio de niveles o el mantenimiento pueden cambiar la distribución entre las fuentes documentadas por la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "El agotamiento de SNAT se produce cuando demasiadas conexiones competidoras o conexiones cortas consumen los puertos disponibles para una combinación de origen y destino. El problema se agrava cuando la agrupación de conexiones está deshabilitada, los tiempos de espera mantienen los estados durante mucho tiempo o una única IP saliente sirve a un gran volumen. Los síntomas incluyen fallas de conexión intermitentes, tiempo de espera de conexión y recuperación espontánea después de que caducan los estados."
  },
  {
    "kind": "paragraph",
    "text": "La solución no es sólo agregar reintentos. Los reintentos agresivos pueden consumir aún más puertos. El diseño debe reutilizar conexiones, dimensionar direcciones y puertos de salida, distribuir destinos, ajustar tiempos de espera con discreción y monitorear el uso. Cuando la plataforma ofrece integración privada sin SNAT o NAT Gateway con múltiples IP, la elección debe considerar la capacidad y la previsibilidad de la fuente."
  },
  {
    "kind": "paragraph",
    "text": "El punto final privado entrante y la conectividad privada saliente son direcciones diferentes. Un punto final privado para la puerta de enlace permite a los consumidores acceder a ella de forma privada; no garantiza que la puerta de enlace acceda a los backends a través de una red privada. Cada tramo requiere su propio DNS, ruta, firewall, identidad y TLS."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico SNAT"
  },
  {
    "kind": "paragraph",
    "text": "Recopile la cantidad de conexiones nuevas por segundo, conexiones establecidas, TIME_WAIT, destinos, IP salientes, errores de conexión y métricas de plataforma. Un 502 en la puerta de enlace puede ser consecuencia de una falta de socket/puerto antes de cualquier respuesta del backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.14 Intermediarios HTTP",
    "id": "4-14-intermediarios-http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP permite una cadena de intermediarios. RFC 9110 distingue formas comunes como proxy, puerta de enlace y túnel. En la práctica, el vocabulario del producto varía, pero la pregunta técnica es estable: ¿el componente interpreta los mensajes HTTP y crea una nueva conexión, o simplemente reenvía bytes después de establecer un túnel? La respuesta determina qué políticas, registros y transformaciones son posibles."
  },
  {
    "kind": "paragraph",
    "text": "Cuando un intermediario finaliza HTTP, recibe un mensaje completo o una secuencia de protocolo, aplica reglas y envía otro mensaje al siguiente salto. Puede cambiar el Host, la ruta, la consulta, los encabezados, la codificación y la versión HTTP. El backend no observa directamente el socket del consumidor; observa la conexión creada por el intermediario. Esta separación explica por qué la IP, el certificado TLS y la latencia medidas en el backend representan el proxy."
  },
  {
    "kind": "paragraph",
    "text": "Los intermediarios mejoran la seguridad y la gobernanza centralizando la autenticación, WAF, limitación de velocidad, enrutamiento y observabilidad. Al mismo tiempo, agregan colas, tiempos de espera, buffers, límites de carga útil y puntos de falla. Cada capa debe tener un propósito claro. Apilar CDN, WAF, Application Gateway, API Gateway, ingress y sidecar sin definir responsabilidades produce duplicidad de TLS, reintentos y reglas contradictorias."
  },
  {
    "kind": "paragraph",
    "text": "Un proxy también modifica la semántica de fallas. Si no puede conectarse al flujo ascendente, puede devolver 502. Si el grupo no está disponible, puede devolver 503. Si el flujo ascendente excede el tiempo de espera, puede devolver 504. Es posible que el código recibido por el cliente haya sido creado por el intermediario y no por la aplicación. Los registros correlacionados por ID de solicitud son esenciales para localizar al remitente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.15 Proxy directo, proxy inverso, puerta de enlace y túnel",
    "id": "4-15-proxy-directo-proxy-inverso-puerta-de-enlace-y-tunel"
  },
  {
    "kind": "paragraph",
    "text": "El proxy directo representa a los clientes. Se configura en el sistema o aplicación y recibe un URI de destino. Las empresas lo utilizan para control, filtrado, inspección y autenticación de salida. Para HTTPS, el cliente puede utilizar el método CONNECT para solicitar un túnel TCP hacia el destino; en este caso, el proxy conoce el host y el puerto, pero no necesariamente interpreta el HTTP cifrado. En la inspección TLS empresarial, el proxy finaliza TLS y emite un certificado aceptado por la CA instalada en el cliente."
  },
  {
    "kind": "paragraph",
    "text": "El proxy inverso representa servidores. El cliente cree que se está conectando al servicio final, pero la conexión finaliza en el proxy, que elige un flujo ascendente. NGINX, HAProxy, Envoy, Application Gateway, Front Door y API Gateways pueden actuar así. El proxy inverso controla los certificados, los hosts virtuales, el enrutamiento de rutas, la compresión, el almacenamiento en caché y la protección, siempre que la capa de aplicación esté visible."
  },
  {
    "kind": "paragraph",
    "text": "El término puerta de enlace en HTTP describe un intermediario que actúa como fuente de la conexión entrante y traduce o se conecta a otro servicio. Una API Gateway amplía esta idea con políticas de seguridad, cuotas, transformación y ciclo de vida de API. Puede recibir REST/JSON y llamar a SOAP, JMS u otro HTTP, ocultando la implementación. El término no debe confundirse con puerta de enlace predeterminada de enrutamiento IP."
  },
  {
    "kind": "paragraph",
    "text": "Un túnel reenvía bytes sin interpretar el protocolo después de su creación. El paso de TLS en un equilibrador L4 se acerca a este modelo: el protocolo de enlace TLS se produce con el backend. La ventaja es preservar la autenticación y el cifrado de un extremo a otro; la limitación es que el intermediario no puede aplicar reglas basadas en el método, la ruta, el contenido JWT o HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-07-http-intermediaries.svg",
    "alt": "Comparación entre proxy directo, proxy inverso, puerta de enlace y túnel HTTP",
    "caption": "Figura 7 - Los intermediarios difieren según la entidad representada y el nivel de interpretación."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.16 Capa 4, Capa 7 y terminación TLS",
    "id": "4-16-capa-4-capa-7-y-terminacion-tls"
  },
  {
    "kind": "paragraph",
    "text": "Un equilibrador o proxy de Capa 4 decide en función de la información de transporte, como la dirección, el puerto y el estado del flujo. Puede reenviar TCP o UDP sin comprender la aplicación. Este enfoque admite distintos protocolos y reduce el acoplamiento a HTTP. Cuando TLS permanece intacto, el certificado y la negociación pertenecen al backend y el intermediario no puede inspeccionar rutas ni encabezados."
  },
  {
    "kind": "paragraph",
    "text": "En la capa 7, el componente comprende el protocolo de la aplicación. En HTTP, puedes enrutar por Host, URL, método, cookie o encabezado; aplicar WAF; reescribir mensajes; y generar respuestas. Para ello, en HTTPS normalmente termina TLS. La conexión backend puede ser HTTP, HTTPS o mTLS, formando una segunda sesión con parámetros independientes y de confianza."
  },
  {
    "kind": "paragraph",
    "text": "La descarga de TLS elimina el cifrado interno y simplifica el backend, pero deja datos de texto sin cifrar en la red después del proxy. El nuevo cifrado mantiene TLS en ambas secciones, pero no es TLS de extremo a extremo: el proxy tiene acceso al contenido y presenta su propia identidad al backend. Los certificados, SNI, versiones y conjuntos de cifrado deben configurarse en ambos lados."
  },
  {
    "kind": "paragraph",
    "text": "Cuando el cliente usa mTLS con el proxy, el certificado del cliente no se presenta automáticamente al backend. El proxy puede autenticar al cliente y propagar atributos a través de encabezados o tokens, siempre que el backend confíe exclusivamente en este proxy y la conexión esté segura. RFC 9440 documenta encabezados estandarizados para transportar información de certificados en escenarios de proxy inverso terminados en TLS, pero el modelo de confianza debe protegerse explícitamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-08-tls-modes.svg",
    "alt": "Comparación entre transferencia, descarga, recifrado y mTLS en el borde de TLS",
    "caption": "Figura 8: Cada modo TLS define diferentes límites de confianza."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-09-l4-l7.svg",
    "alt": "Comparación entre el balanceo de la capa 4 y la capa 7",
    "caption": "Figura 9 - La Capa 4 distribuye los flujos; La capa 7 puede tomar decisiones a través de HTTP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.17 Host, SNI, URL y encabezados reenviados",
    "id": "4-17-host-sni-url-y-encabezados-reenviados"
  },
  {
    "kind": "paragraph",
    "text": "El alojamiento virtual permite que múltiples servicios compartan una dirección. Antes de enviar HTTP a través de TLS, el cliente puede incluir SNI en ClientHello para indicar el nombre de host deseado, lo que permite que el terminador TLS seleccione el certificado y la configuración. Después del protocolo de enlace, HTTP contiene la autoridad de la solicitud, normalmente reflejada en el Host en HTTP/1.1 o en el pseudoencabezado :authority en HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "SNI y Host pertenecen a capas diferentes y pueden divergir debido a un error o un ataque. El equilibrador puede seleccionar el certificado por SNI y la ruta por Host. Las configuraciones deben validar las combinaciones permitidas para evitar un reenvío inadecuado. Cuando el proxy llama al backend con un nombre de host diferente, debe decidir si conserva el host original o usa el nombre ascendente. Esta elección afecta a los hosts virtuales, las redirecciones, las cookies y la validación de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Los proxies inversos insertan metadatos como X-Forwarded-For, X-Forwarded-Proto y X-Forwarded-Host. RFC 7239 define el encabezado Reenviado como una forma estandarizada de transportar información perdida en el proxy. Sin embargo, cualquier cliente puede enviar encabezados con estos nombres. El borde confiable debe eliminar o reconstruir los valores recibidos y el backend debe confiar solo en los saltos conocidos."
  },
  {
    "kind": "paragraph",
    "text": "La IP original también se puede conservar en la capa 4 mediante mecanismos como el protocolo PROXY, cuando sea compatible. Esto cambia el protocolo esperado en los primeros bytes de la conexión y debe habilitarse de manera consistente en ambos lados. El envío del protocolo PROXY a un oyente que espera TLS o HTTP genera fallas inmediatas y mensajes de protocolo no válidos."
  },
  {
    "kind": "subhead",
    "text": "Ejemplo didáctico de metadatos agregados por un borde confiable"
  },
  {
    "kind": "code",
    "text": "GET /clientes/123 HTTP/1.1"
  },
  {
    "kind": "code",
    "text": "Host: api.empresa.com"
  },
  {
    "kind": "code",
    "text": "Forwarded: for=192.0.2.60;proto=https;host=api.empresa.com"
  },
  {
    "kind": "code",
    "text": "X-Forwarded-For: 192.0.2.60"
  },
  {
    "kind": "code",
    "text": "X-Forwarded-Proto: https"
  },
  {
    "kind": "code",
    "text": "X-Request-Id: 9f2a7b1d"
  },
  {
    "kind": "subhead",
    "text": "Nunca confíes ciegamente en X-Forwarded-For"
  },
  {
    "kind": "paragraph",
    "text": "Defina la lista de proxies confiables y calcule el cliente a partir de la cadena conocida. De lo contrario, el consumidor puede introducir una IP arbitraria e influir en la auditoría, la limitación de tarifas o la autorización."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.18 Fundamentos del balanceo de carga",
    "id": "4-18-fundamentos-del-equilibrio-de-carga"
  },
  {
    "kind": "paragraph",
    "text": "El balanceo de carga distribuye el trabajo entre múltiples objetivos para utilizar la capacidad, tolerar fallas y permitir la escala. No acelera mágicamente una sola operación: una solicitud específica todavía es procesada por una instancia. La ganancia surge de la ejecución simultánea y la eliminación de puntos finales que no pueden atender nuevas solicitudes."
  },
  {
    "kind": "paragraph",
    "text": "El conjunto de destinos se denomina grupo, clúster ascendente o conjunto de backend, según el producto. Antes de aplicar un algoritmo, el equilibrador determina qué puntos finales son elegibles por configuración, prioridad, ubicación y estado. El algoritmo selecciona entre estos candidatos. Por lo tanto, una distribución inesperada podría deberse no al round robin, sino a que la mitad del grupo esté marcado como no saludable."
  },
  {
    "kind": "paragraph",
    "text": "El equilibrio puede ocurrir por conexión o por solicitud. En TCP L4, generalmente se toma una decisión cuando se crea el flujo y permanece hasta su terminación. En HTTP/1.1, el proxy puede reutilizar conexiones de backend y seleccionar por solicitud. En HTTP/2, varias solicitudes se multiplexan en unas pocas conexiones, lo que puede cambiar la relación entre la cantidad de conexiones y la carga real."
  },
  {
    "kind": "paragraph",
    "text": "El alcance puede ser local o global. Un equilibrador regional distribuye entre instancias cercanas. Un sistema global selecciona la región mediante DNS, anycast o proxy inverso de borde. Las arquitecturas robustas suelen combinar las dos capas: una decisión global elige la región y un equilibrador local elige la instancia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.19 Algoritmos de selección de backend",
    "id": "4-19-algoritmos-de-seleccion-de-backend"
  },
  {
    "kind": "paragraph",
    "text": "El round robin distribuye selecciones en secuencia y funciona bien cuando los servidores tienen capacidades similares y el costo de las solicitudes es relativamente homogéneo. El round robin ponderado asigna diferentes proporciones, lo que permite que una instancia más grande reciba más tráfico o que se introduzca una nueva versión gradualmente. Los pesos no garantizan porcentajes exactos en ventanas pequeñas."
  },
  {
    "kind": "paragraph",
    "text": "Menos conexiones elige el destino con menos conexiones activas. Es útil cuando las conexiones tienen duraciones variables, pero es posible que el recuento no represente el trabajo real en HTTP/2, o cuando una conexión contiene muchas operaciones. La menor solicitud y el menor tiempo de respuesta buscan aproximarse a la carga o latencia observada, pero deben evitar oscilaciones y decisiones basadas en métricas ruidosas."
  },
  {
    "kind": "paragraph",
    "text": "Hash selecciona el destino en función de una clave, como IP, cookie, encabezado o identificador. Proporciona afinidad determinista mientras el conjunto permanece estable. Cuando los puntos finales entran o salen, un simple hash puede reasignar la mayoría de las claves. El hash consistente y algoritmos como ring hash o Maglev buscan reducir la reasignación, siendo útiles para cachés y datos localizados."
  },
  {
    "kind": "paragraph",
    "text": "El poder de dos opciones selecciona dos candidatos aleatorios y elige el menos cargado, obteniendo una buena distribución con menos costo que examinar todo el grupo. Los productos modernos también combinan prioridad, localidad, pesos dinámicos, detección de valores atípicos y interrupción de circuitos. La elección debe validarse con el patrón de tráfico real, no sólo con una definición abstracta."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-10-load-balancing-algorithms.svg",
    "alt": "Comparación entre algoritmos de selección de backend",
    "caption": "Figura 10: Diferentes algoritmos optimizan diferentes patrones de carga."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Criterios para elegir el algoritmo.",
    "headers": [
      "Algoritmo",
      "Señal utilizada",
      "Indicado cuando",
      "Precaución"
    ],
    "rows": [
      [
        "Todos contra todos",
        "secuencia",
        "Instancias y solicitudes similares",
        "Ignorar la carga actual"
      ],
      [
        "RR ponderado",
        "Peso estático/dinámico",
        "Diferentes capacidades",
        "Pesos incorrectos carga concentrada"
      ],
      [
        "Menos conexiones",
        "Conexiones activas",
        "Sesiones de duración variable",
        "HTTP/2 distorsiona la métrica"
      ],
      [
        "Menor tiempo de respuesta",
        "Latencia y actividad",
        "Rendimiento variable",
        "puede oscilar"
      ],
      [
        "picadillo",
        "Solicitar clave",
        "Afinidad y caché local",
        "Reasignación y puntos de acceso"
      ],
      [
        "hash consistente",
        "Anillo/mesa estable",
        "Reducir la rotación por afinidad",
        "Más complejidad"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.20 Comprobaciones de estado, preparación, drenaje y conmutación por error",
    "id": "4-20-comprobaciones-de-estado-preparacion-drenaje-y-conmutacion-por-error"
  },
  {
    "kind": "paragraph",
    "text": "Las comprobaciones de estado determinan si un punto final debe recibir tráfico. Una verificación TCP confirma que el puerto acepta la conexión, pero no prueba que la aplicación pueda consultar la base de datos, validar tokens o responder a una operación crítica. Una verificación HTTP puede verificar una ruta, un estado y un contenido. El punto final de estado debe reflejar la preparación para el tráfico que se enviará, sin causar una carga excesiva ni depender de componentes irrelevantes."
  },
  {
    "kind": "paragraph",
    "text": "Liveness y readiness responden a diferentes preguntas. Liveness indica si el proceso debe reiniciarse. Readiness indica si está listo para recibir nuevas solicitudes. Mezclar los dos puede crear bucles: una dependencia temporalmente no disponible genera liveness falso, el orquestador reinicia todas las instancias y la recuperación se vuelve aún más difícil."
  },
  {
    "kind": "paragraph",
    "text": "Los umbrales evitan la eliminación en caso de un solo fallo y el retorno prematuro después de un único éxito. El intervalo, el tiempo de espera, la cantidad de fallas y la cantidad de éxitos definen la velocidad de detección y recuperación. Los controles muy agresivos pueden generar falsos negativos durante los picos; Las comprobaciones lentas mantienen las instancias rotas en el grupo por más tiempo."
  },
  {
    "kind": "paragraph",
    "text": "El drenaje elimina el punto final de las nuevas selecciones y al mismo tiempo permite que finalicen las conexiones existentes. El inicio lento aumenta el peso gradualmente después del inicio o la recuperación, evitando enviar la carga completa a cachés frías y runtimes que aún se están calentando. En las implementaciones, se deben coordinar readiness, pre-stop, el drenaje de conexiones y el tiempo de espera máximo de la aplicación para evitar reinicios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-11-endpoint-health-lifecycle.svg",
    "alt": "Ciclo de vida de salud del endpoint entre inicio, preparación, degradación, indisponibilidad y drenaje",
    "caption": "Figura 11: Un punto final recorre los estados que influyen en la elegibilidad y el peso."
  },
  {
    "kind": "subhead",
    "text": "Comprobación de estado de API Gateway"
  },
  {
    "kind": "paragraph",
    "text": "Un análisis de puertos puede marcar la puerta de enlace como en buen estado incluso cuando el repositorio de configuración, el DNS o los backends críticos no están disponibles. Diseñe comprobaciones por capa y también supervise la experiencia de un extremo a otro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.21 Agrupación de afinidad, estado y conexión",
    "id": "4-21-agrupacion-de-afinidad-estado-y-conexion"
  },
  {
    "kind": "paragraph",
    "text": "La afinidad de sesión dirige las solicitudes relacionadas al mismo backend, generalmente mediante cookie, IP o hash. Puede ser necesario para sistemas heredados con sesiones en memoria, pero reduce la libertad de distribución y complica la conmutación por error. Idealmente, las API REST mantienen el estado de la sesión en mecanismos o tokens compartidos, lo que permite que cualquier instancia procese la llamada."
  },
  {
    "kind": "paragraph",
    "text": "La afinidad de IP es frágil detrás de NAT y proxies, ya que muchos consumidores pueden aparecer con el mismo origen. Los usuarios de dispositivos móviles pueden cambiar las IP y IPv6 puede usar múltiples direcciones temporales. La afinidad basada en cookies ofrece una clave más específica, pero debe considerar el dominio, la seguridad, el mismo sitio y el comportamiento cuando el backend abandona el grupo."
  },
  {
    "kind": "paragraph",
    "text": "La agrupación de conexiones reutiliza las conexiones del proxy al upstream y reduce los protocolos de enlace TCP/TLS, la latencia y el consumo de puertos SNAT. Sin embargo, los grupos muy pequeños pueden concentrar el tráfico y las conexiones persistentes pueden mantener una dirección resuelta antes de un cambio de DNS. La política de actualización de DNS, duración de la conexión y tiempo de espera de inactividad debe ser compatible con la conmutación por error y la rotación de puntos finales."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 multiplexa múltiples flujos en una conexión. Si el proxy mantiene una única conexión HTTP/2 por backend, las métricas de conexión ya no representan la cantidad de solicitudes. Es necesario respetar el algoritmo, los límites de flujo y la creación de múltiples conexiones. La misma preocupación se aplica a gRPC, WebSocket y el sondeo largo, que tienen diferentes duraciones y patrones."
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - El estado y la persistencia cambian la distribución.",
    "headers": [
      "Mecanismo",
      "Beneficio",
      "efecto secundario"
    ],
    "rows": [
      [
        "Afinidad con las cookies",
        "Sesión estable",
        "Dependencia de backend y conmutación por error"
      ],
      [
        "hash de IP",
        "Sin galleta",
        "NAT concentra clientes"
      ],
      [
        "Agrupación de conexiones",
        "Menos apretón de manos y SNAT",
        "Viejas conexiones y concentración."
      ],
      [
        "Multiplexación HTTP/2",
        "Alta eficiencia",
        "La conexión no representa carga."
      ],
      [
        "Drenaje",
        "Implemente sin interrupciones abruptas",
        "Necesita tiempo de espera coordinado"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.22 Arquitectura multicapa",
    "id": "4-22-arquitectura-multicapa"
  },
  {
    "kind": "paragraph",
    "text": "Una arquitectura API puede contener DNS/GSLB, CDN o Front Door, WAF, equilibrador de carga regional, API Gateway, controlador de ingreso, malla de servicios y aplicación. Cada capa puede terminar TLS, generar encabezados, realizar reintentos y aplicar tiempo de espera. El diseño necesita definir una matriz de responsabilidades: quién autentica al cliente, quién aplica WAF, quién selecciona la región, quién selecciona la instancia, quién preserva el host y quién genera el ID de la solicitud."
  },
  {
    "kind": "paragraph",
    "text": "Los reintentos multicapa multiplican el tráfico. Si el cliente, Front Door, API Gateway y la red de servicios lo intentan tres veces, una sola operación puede producir docenas de llamadas al backend. En operaciones no idempotentes, esto también crea un riesgo funcional. El presupuesto de tiempo de espera debe disminuir a lo largo de la cadena para que las capas externas todavía tengan tiempo de procesar la falla y responder."
  },
  {
    "kind": "paragraph",
    "text": "La observabilidad debe registrar marcas de tiempo, dirección, nombre de host, protocolo, estado de origen, backend seleccionado, duración de la conexión y duración de la respuesta. Se debe crear un identificador de correlación en el borde o conservarlo de forma controlada. Los registros deben distinguir el estado del proxy y el estado ascendente, además del tiempo de espera de conexión, el error de TLS, el reinicio y el tiempo de espera de respuesta."
  },
  {
    "kind": "paragraph",
    "text": "La alta disponibilidad requiere eliminar puntos únicos de falla en la propia capa de puerta de enlace. Se requieren varias instancias detrás del equilibrador de carga, una configuración coherente y comprobaciones de estado. Los componentes con estado, las cachés distribuidas y los bancos de configuración requieren su propio diseño; Duplicar solo el oyente no garantiza que la plataforma continuará funcionando durante una falla de dependencia."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-12-api-request-path.svg",
    "alt": "Ruta empresarial de una llamada API entre cliente, DNS, borde, puerta de enlace API, equilibrador y backend",
    "caption": "Figura 12: Cada salto toma decisiones y puede cambiar la identidad observada."
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Ejemplo de división de responsabilidades.",
    "headers": [
      "capa",
      "Responsabilidad recomendada",
      "Evite la duplicación de"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "Elección global y conmutación por error de endpoints",
        "Reglas de aplicación"
      ],
      [
        "Borde/WAF",
        "Protección pública, TLS, enrutamiento amplio",
        "Autorización comercial"
      ],
      [
        "Puerta de enlace API",
        "Autenticación, cuotas, transformación, gobernanza",
        "Equilibrio global improvisado"
      ],
      [
        "LB/Ingreso",
        "Distribución local y salud.",
        "Políticas de identidad duplicadas"
      ],
      [
        "Malla de servicio",
        "Resiliencia de servicio a servicio y mTLS interno",
        "Reintentos sin presupuesto"
      ],
      [
        "Solicitud",
        "Regla de negocio y estado funcional.",
        "Dependencia de encabezados no validados"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.23 Aplicación en Axway API Gateway y Azure",
    "id": "4-23-aplicacion-en-axway-api-gateway-y-azure"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Puerta de enlace API de Axway"
  },
  {
    "kind": "paragraph",
    "text": "En una implementación de Axway de alta disponibilidad, varias instancias de API Gateway se ubican detrás de un equilibrador que realiza comprobaciones de estado y distribuye la carga. El equilibrador debe preservar o reconstruir correctamente la identidad del host, el protocolo y la fuente según lo diseñado. La afinidad sólo debe utilizarse cuando un recurso realmente depende de ella; las políticas y el estado compartido deben evaluarse por separado."
  },
  {
    "kind": "paragraph",
    "text": "En el enrutamiento saliente, filtros como Conectar a URL hacen que la puerta de enlace actúe como un punto final para el cliente y llame al destino configurado, ocultando la jerarquía de implementación. La configuración del host remoto controla cómo se conecta la puerta de enlace a destinos específicos, incluidas conexiones, tiempos de espera y parámetros relacionados. La resolución de DNS y la agrupación de conexiones pueden hacer que los cambios en el backend no se noten inmediatamente."
  },
  {
    "kind": "paragraph",
    "text": "Cuando la salida requiere un proxy corporativo, la configuración del proxy define un intermediario adicional. El diagnóstico necesita separar la conexión de puerta de enlace-proxy y de proxy-destino. En topologías con un equilibrador de carga al frente y un proxy a la salida, la puerta de enlace se encuentra entre dos formas de intermediación, cada una con su propio TLS, registros y tiempos de espera."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones de mantenimiento deben coordinar el drenaje del equilibrador de carga y el apagado controlado de la instancia para evitar la interrupción de las conexiones activas. La documentación de Axway también le permite configurar direcciones y opciones de balanceo de carga en integraciones específicas de API Manager; estos parámetros deben validarse según la versión en uso."
  },
  {
    "kind": "subhead",
    "text": "Aplicación práctica en Axway"
  },
  {
    "kind": "paragraph",
    "text": "Al investigar 502 o tiempo de espera de conexión, registre: nombre de host configurado en el filtro, respuesta DNS vista por el proceso, dirección seleccionada, configuración de host remoto aplicada, proxy saliente, grupo de conexiones y origen SNAT observada por el backend."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Servicios de Azure y gestión de API"
  },
  {
    "kind": "paragraph",
    "text": "Azure ofrece servicios de distribución para diferentes propósitos. Traffic Manager toma decisiones a través de DNS y el cliente se conecta directamente al punto final devuelto. Azure Front Door es un proxy inverso global de capa 7, con aceleración, TLS, enrutamiento y WAF. Azure Load Balancer opera principalmente en la capa 4. Application Gateway actúa como un proxy regional de capa 7 para HTTP/HTTPS, con host/ruta y enrutamiento WAF, así como capacidades L4 en escenarios admitidos por la plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management es una plataforma de administración de API cuya puerta de enlace aplica políticas, autenticación, transformación y observabilidad. No reemplaza automáticamente un WAF o un servicio de distribución global. Un diseño común coloca Front Door o Application Gateway delante de APIM, pero los sondeos de estado deben usar el nombre de host correcto, porque es posible que los puntos finales virtuales no respondan a los sondeos mediante IP y host predeterminados."
  },
  {
    "kind": "paragraph",
    "text": "En modo interno, los puntos finales APIM requieren DNS accesible dentro de la red virtual. Application Gateway frente a APIM necesita sondas personalizadas y una configuración de backend compatible con el nombre de host y el certificado. En la ruta de salida, APIM necesita resolver backends privados y tener conectividad a la red correspondiente. Configurar solo la exposición entrante no resuelve el tramo final."
  },
  {
    "kind": "paragraph",
    "text": "La elección entre Traffic Manager y Front Door ilustra la diferencia conceptual: Traffic Manager responde al DNS y no ve el tráfico de las aplicaciones; Front Door permanece en la ruta como proxy inverso. Esto cambia el origen observado, TLS, WAF, registros, conmutación por error y capacidad de enrutamiento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/es/figure-13-azure-services.svg",
    "alt": "Mapa conceptual de Traffic Manager, Front Door, Load Balancer, Application Gateway y API Management",
    "caption": "Figura 13 - Los servicios de Azure se diferencian por alcance, capa y permanencia en la ruta."
  },
  {
    "kind": "table",
    "caption": "Tabla 10 - Mapeo conceptual de los servicios de Azure.",
    "headers": [
      "Servicio",
      "Alcance/nivel",
      "¿Permanecer en el camino?",
      "Uso principal"
    ],
    "rows": [
      [
        "Administrador de tráfico",
        "Global por DNS",
        "No",
        "Elija el punto final por política y estado"
      ],
      [
        "puerta principal",
        "L7 mundial",
        "si",
        "Proxy inverso, WAF, TLS y aceleración"
      ],
      [
        "Equilibrador de carga",
        "Regional L4",
        "si",
        "Distribuir flujos TCP/UDP"
      ],
      [
        "Puerta de enlace de aplicaciones",
        "Regional L7",
        "si",
        "Enrutamiento de host/ruta, WAF y TLS"
      ],
      [
        "Gestión de API",
        "Puerta de enlace API",
        "si",
        "Seguridad, políticas y gobernanza de API"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.24 Solución de problemas sistemática",
    "id": "4-24-solucion-de-problemas-sistematica"
  },
  {
    "kind": "paragraph",
    "text": "El diagnóstico debe seguir el orden de llamada real. Comience en el entorno de consumidor o de ejecución que falla, no en una estación de trabajo diferente. Registre el nombre consultado, el servidor DNS utilizado, la respuesta A/AAAA/CNAME, TTL y caché. Luego identifique la dirección de destino, la ruta, NAT, terminación TLS, host y backend seleccionado."
  },
  {
    "kind": "paragraph",
    "text": "Compare una llamada exitosa y una llamada fallida. Las diferencias en el resolvedor, la familia de IP, la dirección de retorno, la origen SNAT o la instancia del grupo a menudo revelan intermitencia. Para 502, determine si hubo una falla de DNS, un error de conexión, un error de TLS, un reinicio o una respuesta no válida. Para 503, verifique si al grupo le faltan puntos finales en buen estado o si la política en sí causó la indisponibilidad. Para 504, compare los tiempos de espera en todas las capas."
  },
  {
    "kind": "paragraph",
    "text": "Las herramientas de captura y los registros deben usarse de manera autorizada y con filtros mínimos. excavar o Resolve-DnsName mira DNS; curl -v muestra resolución, conexión, TLS y HTTP; openssl s_client ayuda a analizar SNI y la cadena; ss/netstat muestra sockets; tcpdump/Wireshark confirma direcciones y restablece; Las métricas del balanceador muestran el estado y la selección de backend. Ninguna herramienta explica toda la cadena."
  },
  {
    "kind": "paragraph",
    "text": "El objetivo no es sólo restablecer el servicio, sino producir una causa verificable. Documente la configuración que causó la falla, la evidencia, el mecanismo técnico, la solución permanente y el monitoreo que detectará la recurrencia. Borrar la memoria caché, reiniciar la puerta de enlace o aumentar el tiempo de espera puede enmascarar el problema sin corregir la arquitectura."
  },
  {
    "kind": "subhead",
    "text": "Comandos de diagnóstico: úselos solo en sistemas y objetivos autorizados"
  },
  {
    "kind": "code",
    "text": "# DNS\ndig api.empresa.com A +noall +answer\ndig api.empresa.com AAAA +noall +answer\ndig api.empresa.com +tcp\ndig api.empresa.com +dnssec"
  },
  {
    "kind": "code",
    "text": "# HTTP/TLS\ncurl -v --resolve api.empresa.com:443:198.51.100.25 https://api.empresa.com/health\nopenssl s_client -connect 198.51.100.25:443 -servername api.empresa.com"
  },
  {
    "kind": "code",
    "text": "# Red y sockets\nip route get 198.51.100.25\nss -tan state established\nss -tan state time-wait"
  },
  {
    "kind": "table",
    "caption": "Tabla 11 - Síntomas y líneas iniciales de investigación.",
    "headers": [
      "Síntoma",
      "Hipótesis prioritarias",
      "evidencia"
    ],
    "rows": [
      [
        "NXDOMAIN después de crear el registro",
        "Caché negativo o zona incorrecta",
        "SOA, TTL negativo, consulta autoritativa"
      ],
      [
        "Funciona por IP, falla por nombre",
        "DNS, SNI, Host o certificado",
        "cavar, rizar --resolve, s_client"
      ],
      [
        "Algunos clientes utilizan puntos finales antiguos",
        "TTL/caché/conexión persistente",
        "TTL restante y grupo de conexiones"
      ],
      [
        "502 intermitente",
        "DNS múltiple, TLS ascendente, SNAT, reinicio",
        "Backend elegido y error detallado"
      ],
      [
        "503 en equilibrador",
        "Toda la piscina insalubre o vacía",
        "Estado de salud y registros de sonda"
      ],
      [
        "504 después del tiempo fijo",
        "Tiempo de espera en una capa",
        "Duración del estado y emisor"
      ],
      [
        "El backend ve la IP del proxy",
        "Proxy inverso o SNAT",
        "Encabezados y captura confiables"
      ],
      [
        "Distribución desigual",
        "Keep-alive, HTTP/2, afinidad, pesos",
        "Solicitudes y conexiones de backend"
      ],
      [
        "Salud verde, la API falla",
        "Sonda poco profunda",
        "Dependencias de prueba y camino real."
      ],
      [
        "Sólo fallan las respuestas DNS grandes",
        "TCP/53, EDNS o fragmentación",
        "Bandera TC, excavar +tcp, capturar"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Árbol de decisión ante un fallo de API"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "¿El nombre se resuelve en el mismo tiempo de ejecución que ejecuta la llamada? Registrar servidor DNS, respuesta, TTL y alias.",
      "¿La dirección resuelta es el punto final esperado para este entorno y familia de IP?",
      "¿Se crea la conexión TCP? En caso contrario, analice ruta, firewall, NAT, SNAT y capacidad de puerto.",
      "¿Finaliza el protocolo de enlace TLS? Valide SNI, certificado, CA, nombre de host y mTLS en el tramo correcto.",
      "¿El proxy recibe HTTP? Identifique el componente que generó el estado y el ID de solicitud.",
      "¿El grupo tiene puntos finales saludables y la sonda representa readiness real?",
      "¿Qué backend se eligió y qué host/ruta/encabezado se envió?",
      "¿El backend respondió, se reinició o se agotó el tiempo de espera?",
      "¿La respuesta llegó a través del mismo estado NAT y a través de las mismas capas?",
      "¿La solución elimina la causa o simplemente fuerza una nueva caché/conexión?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.25 Estudios de caso",
    "id": "4-25-estudios-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1: cambio de DNS sin reducir TTL"
  },
  {
    "kind": "paragraph",
    "text": "Un equipo cambia el registro api.empresa.com del antiguo balanceador al nuevo durante un cambio. El TTL anterior era de 3600 segundos. Las pruebas realizadas directamente en el sistema autorizado muestran la nueva dirección, pero algunos consumidores permanecen en el antiguo terminal durante casi una hora. Reiniciar una estación parece resolver el problema, mientras que las aplicaciones en contenedores mantienen conexiones antiguas."
  },
  {
    "kind": "paragraph",
    "text": "La causa combina el almacenamiento en caché recursivo válido y la agrupación de conexiones. El plan correcto sería reducir el TTL por adelantado, esperar a que caduque, mantener ambos puntos finales compatibles durante la transición y observar el tráfico por dirección. El evento demuestra que una actualización autorizada no equivale a una adopción inmediata por parte de todos los clientes."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2: APIM interno marcado como incorrecto por Application Gateway"
  },
  {
    "kind": "paragraph",
    "text": "Una puerta de enlace de aplicaciones utiliza la IP privada de API Management como backend y la sonda predeterminada envía un host incompatible. APIM responde solo a los nombres de host configurados y la sonda considera que el backend no está disponible. Los usuarios reciben 502 o 503 aunque APIM esté operativo cuando se accede a ellos con el nombre de host correcto."
  },
  {
    "kind": "paragraph",
    "text": "La solución es crear una sonda personalizada con el host y la ruta adecuados, configurar los ajustes HTTP del backend y garantizar la resolución/certificado. El caso muestra que la verificación de estado de la capa 7 debe reproducir la autoridad HTTP esperada y no solo alcanzar la IP."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3: agotamiento de SNAT causado por conexiones cortas"
  },
  {
    "kind": "paragraph",
    "text": "Una puerta de enlace llama a un backend externo y abre una nueva conexión TLS para casi cada solicitud. Durante el pico, las nuevas conexiones comienzan a fallar de forma intermitente. El backend no muestra saturación y los reintentos aumentan aún más el volumen. Las métricas revelan una gran cantidad de TIME_WAIT y consumo de puerto en la IP saliente."
  },
  {
    "kind": "paragraph",
    "text": "La solución implica agrupación de conexiones, mantenimiento de conexión, dimensionamiento de NAT, ajuste de tiempos de espera y monitoreo de puertos. Aumentar el tiempo de espera de HTTP no crea puertos y puede prolongar los estados. El caso relaciona conceptos de los capítulos de TCP y NAT con el comportamiento de API Gateway."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4: X-reenviado-for falsificado"
  },
  {
    "kind": "paragraph",
    "text": "Una API aplica una limitación de velocidad por el primer valor de X-Forwarded-For, pero el balanceador de carga simplemente agrega la IP observada al final del encabezado recibido. Un consumidor envía X-Forwarded-For con direcciones arbitrarias y cambia el primer valor para evitar el límite y la auditoría de contaminación."
  },
  {
    "kind": "paragraph",
    "text": "El borde debe eliminar los encabezados que no sean de confianza y crear la cadena a partir del zócalo observado. El backend debe configurar servidores proxy confiables y seleccionar la posición correcta. Una identidad sólida debe provenir de la autenticación, no de un encabezado controlable por el cliente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 5: Distribución desigual con HTTP/2"
  },
  {
    "kind": "paragraph",
    "text": "El equilibrador utiliza la menor cantidad de conexiones entre tres puertas de enlace. Un cliente abre algunas conexiones HTTP/2 y envía miles de transmisiones a través de la misma conexión. El contador de conexiones no refleja la carga por solicitud y una instancia recibe una parte desproporcionada del trabajo."
  },
  {
    "kind": "paragraph",
    "text": "La investigación compara flujos y solicitudes por backend, no solo por sockets. La solución puede implicar balanceo por solicitud en el proxy L7, múltiples conexiones, límites de transmisión o un algoritmo basado en solicitudes/latencia. El algoritmo debe ser compatible con el protocolo."
  },
  {
    "kind": "subhead",
    "text": "Aplicación en el mundo bancario"
  },
  {
    "kind": "paragraph",
    "text": "En las integraciones financieras, DNS, origen de red, mTLS e identificación de institución son controles diferentes. La lista de IP permitidas reduce el área de superficie, mTLS autentica la entidad en el canal y OAuth/JWT autoriza las operaciones. Ninguno de ellos debe utilizarse como sustituto automático de los demás."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios prácticos",
    "id": "laboratorios-de-observacion"
  },
  {
    "kind": "paragraph",
    "text": "Los laboratorios deberán realizarse en su entorno propio o autorizado. Utilice dominios de documentación, servicios locales o recursos de laboratorio. No escanee ni intente eludir los controles corporativos. Registre las predicciones antes de ejecutar comandos y compárelas con los resultados."
  },
  {
    "kind": "paragraph",
    "text": "Para cada práctica de laboratorio, anote la hora, la resolución, la respuesta DNS, el TTL, la dirección de destino, el protocolo, el terminador TLS, el host, el estado, el servidor elegido y la duración. Esta disciplina transforma comandos aislados en evidencia arquitectónica."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Consulta el A, AAAA, CNAME, NS y SOA de un dominio bajo tu control. Identificar autoridad y TTL.",
      "Ejecutar una resolución normal y luego una consulta directa con la autoridad. Compara banderas AA, RD y RA.",
      "Utilice dig +tcp y compárelo con UDP. Anote el tamaño, el momento y la presencia de EDNS.",
      "Cree un registro con un TTL bajo en el laboratorio, cambie el valor y realice un seguimiento del TTL restante en la caché.",
      "Pruebe una respuesta de NXDOMAIN y observe cuánto tiempo permanece en caché.",
      "Configure dos nombres locales que apunten al mismo proxy inverso y ruta por Host.",
      "En Docker o en la red local, configure NGINX/HAProxy con dos backends y observe el round robin y las conexiones mínimas.",
      "Deshabilite un backend y verifique cuántas comprobaciones se necesitan para eliminarlo del grupo.",
      "Habilite keep-alive y compare la cantidad de apretones de manos y sockets con nuevas conexiones por solicitud.",
      "Simule un cambio de DNS mientras mantiene activo el punto final antiguo y documente la ventana de coexistencia.",
      "Agregue un encabezado X-Forwarded-For en el cliente y confirme que Lab Edge lo elimine o lo conserve.",
      "Diseñar una arquitectura con DNS global, WAF, API Gateway y dos backends, indicando quién completa TLS y genera el ID de solicitud."
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
      "DNS es una base distribuida y jerárquica de RRsets, no solo un directorio de IP.",
      "Las zonas y los dominios no son idénticos; las delegaciones distribuyen la autoridad entre los registros NS y la pegan cuando es necesario.",
      "El stub resolver utiliza un resolvedor recursivo, que puede consultar la raíz, el TLD y el autoritativo o reenviarlo a otro resolvedor.",
      "TTL controla el caché; Los cambios no invalidan instantáneamente las entradas ya almacenadas.",
      "NXDOMAIN y la falta de tipos también se pueden almacenar en caché.",
      "DNS necesita funcionar sobre UDP y TCP; EDNS amplía las capacidades y las respuestas grandes pueden requerir un respaldo.",
      "DoT/DoH protegen el transporte; DNSSEC autentica datos; TSIG autentica transacciones específicas.",
      "El DNS privado y de horizonte dividido requiere visibilidad de zona, reenvío y control de bucle.",
      "El equilibrio de DNS toma una decisión antes de la conexión y está limitado por TTL y el comportamiento del resolvedor.",
      "NAT traduce direcciones y puertos con estado; No reemplaza el firewall ni la autenticación.",
      "SNAT cambia el origen observado y puede sufrir un agotamiento del puerto.",
      "El proxy inverso finaliza una conexión y crea otra; un túnel solo reenvía bytes una vez establecido.",
      "L4 decide por el flujo; L7 puede interpretar HTTP, terminar TLS, enrutar por host/ruta y aplicar WAF.",
      "Forwarded y X-Forwarded-* solo son confiables cuando los reconstruyen servidores proxy conocidos.",
      "El algoritmo selecciona entre puntos finales elegibles; Los controles de salud definen este conjunto.",
      "Round Robin, conexiones mínimas y hash cumplen con diferentes patrones de carga.",
      "La preparación, el drenaje y el inicio lento son necesarios para un despliegue y una recuperación sin avalanchas.",
      "La agrupación de conexiones reduce los protocolos de enlace y SNAT, pero influye en el DNS, la distribución y la conmutación por error.",
      "En Azure, Traffic Manager, Front Door, Load Balancer, Application Gateway y APIM tienen diferentes roles.",
      "En Axway, el balanceador de carga entrante, los filtros de enrutamiento, los hosts remotos y el proxy saliente deben analizarse por tramo."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de arquitectura"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "¿Qué FQDN utiliza cada consumidor y qué zona tiene autoridad?",
      "¿Qué resolvedores utilizan los clientes, puertas de enlace y backends?",
      "¿Existen respuestas públicas y privadas para el mismo nombre?",
      "¿Qué TTL positivos y negativos se han establecido?",
      "¿UDP/53 y TCP/53 funcionan en todas las rutas requeridas?",
      "¿Se valida y monitorea DNSSEC cuando se adopta?",
      "¿Qué componente realiza SNAT y qué IP puede observar el backend?",
      "¿La capacidad del puerto SNAT admite picos y tiempos de espera?",
      "¿Dónde termina cada conexión TCP/TLS?",
      "¿Qué nombre de host se utiliza en SNI, host y validación de certificados?",
      "¿Qué encabezados se eliminan y reconstruyen en el borde?",
      "¿Qué capa elige región y cuál elige instancia?",
      "¿La verificación de estado prueba readiness real y utiliza el host/ruta correctos?",
      "¿Hay umbrales, drenaje y comienzo lento?",
      "¿El algoritmo es adecuado para HTTP/2, gRPC, WebSocket y conexiones largas?",
      "¿Es realmente necesaria la afinidad? ¿Dónde está el Estado?",
      "¿Los grupos de conexiones respetan los cambios de DNS y la conmutación por error?",
      "¿Los reintentos y los tiempos de espera tienen un presupuesto coordinado?",
      "¿Los registros distinguen el estado del proxy y el estado ascendente?",
      "¿Hay métricas e ID de solicitud de un extremo a otro por backend?"
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
      "Diferenciar entre dominio, zona, delegación y servidor autoritativo.",
      "Explique por qué un FQDN puede terminar con un punto y el riesgo de omitirlo en un archivo de zona.",
      "Describa el flujo entre resolución de stub resolver, recursivo, raíz, TLD y autoritativo.",
      "Diferenciar consulta recursiva e iterativa.",
      "¿Cuál es la diferencia entre NXDOMAIN y NODATA?",
      "Explicar la función de las banderas AA, RD, RA y TC.",
      "Compare A, AAAA, CNAME, NS, SOA, PTR, SRV y CAA.",
      "¿Por qué varios registros A no garantizan un equilibrio uniforme?",
      "Explique cómo TTL y la agrupación de conexiones pueden mantener el uso de un punto final antiguo.",
      "¿Por qué publicar sólo UDP/53 puede romper el DNS?",
      "¿Qué problema resuelve EDNS(0) y qué riesgo surge con cargas útiles muy grandes?",
      "Compare DNSSEC, DoT, DoH y TSIG.",
      "¿Cómo ayuda el horizonte dividido y qué riesgos operativos crea?",
      "Diferenciar entre NAT Básica, NAPT/PAT, SNAT y DNAT.",
      "¿Por qué no debería tratarse NAT como un mecanismo de autenticación?",
      "Explique el agotamiento de SNAT y la relación con la agrupación de conexiones.",
      "Diferenciar entre proxy directo, proxy inverso, puerta de enlace y túnel.",
      "Compare el paso a través, la descarga y el nuevo cifrado de TLS.",
      "¿Por qué mTLS termina en el proxy y no mTLS automáticamente hasta el backend?",
      "Diferenciar entre SNI y Host y explicar cómo cada uno participa en el enrutamiento.",
      "¿Cómo se debe establecer la confianza en X-Forwarded-For?",
      "Compare el balanceo L4, L7 y DNS.",
      "¿Cuándo son apropiados el round robin, la menor cantidad de conexiones y el hash consistente?",
      "Diferenciar vivacidad, preparación y control de salud externo.",
      "Explique cómo HTTP/2 puede hacer que las conexiones mínimas sean inapropiadas.",
      "¿Cuál es la diferencia entre Azure Traffic Manager y Azure Front Door?",
      "¿Por qué podría fallar la sonda predeterminada de Application Gateway contra APIM interno?",
      "¿Qué elementos se deben recopilar para investigar un 502 en API Gateway?"
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
      "Una API cambia de 203.0.113.10 a 203.0.113.20, pero el 15% de los clientes permanecen en la dirección anterior. Proponer hipótesis y un plan de evidencia.",
      "El DNS privado devuelve 10.20.5.10 para las máquinas virtuales, pero API Gateway resuelve la dirección pública. Dibuja la ruta de resolución y los puntos a comprobar.",
      "Un backend permite solo una IP saliente, pero la puerta de enlace utiliza tres fuentes. Explique por qué la falla parece intermitente y proponga una solución.",
      "Un equilibrador de carga considera que el backend está en buen estado a través de TCP, pero la API devuelve 500 por banco no disponible. Diseñar controles adecuados.",
      "Un cliente utiliza mTLS hasta WAF y el backend necesita conocer la identidad del certificado. Definir un modelo de propagación confiable.",
      "Una aplicación con estado requiere afinidad de IP, pero los consumidores buscan CGNAT. Analizar el riesgo y proponer una alternativa.",
      "Una arquitectura tiene reintentos en el cliente, Front Door, APIM y la malla de servicios. Calcula el potencial de multiplicación y propone un presupuesto.",
      "Después de habilitar HTTP/2 entre el proxy y la puerta de enlace, la distribución por mínimo de conexiones se vuelve desigual. Explicar el mecanismo y posibles ajustes."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario técnico",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabla 12 - Glosario de capítulos.",
    "headers": [
      "Término",
      "Definición"
    ],
    "rows": [
      [
        "servidor autoritativo",
        "Servidor que responde con autoridad sobre una zona."
      ],
      [
        "CNOMBRE",
        "Registro que define un nombre como alias de otro nombre canónico."
      ],
      [
        "Delegación",
        "Transferir autoridad de una parte del árbol DNS a otra zona."
      ],
      [
        "ADNT",
        "Traducción de la dirección o puerto de destino."
      ],
      [
        "DNSSEC",
        "Extensiones que proporcionan autenticación de origen e integridad para los datos DNS."
      ],
      [
        "Departamento de Salud",
        "Transporte de mensajes DNS a través de HTTPS."
      ],
      [
        "punto",
        "Transporte de mensajes DNS sobre TLS."
      ],
      [
        "EDNS(0)",
        "Mecanismo extensible que anuncia la carga útil y las capacidades de DNS UDP."
      ],
      [
        "proxy directo",
        "Intermediario que representa a los clientes en destino."
      ],
      [
        "reenviado",
        "Encabezado HTTP estandarizado para proxy de metadatos."
      ],
      [
        "FQDN",
        "Nombre de dominio completo."
      ],
      [
        "Registro de pegamento",
        "Dirección proporcionada por el padre para llegar al servidor de nombres dentro de la zona delegada."
      ],
      [
        "GSLB",
        "Distribución global del tráfico, a menudo basada en DNS y estado."
      ],
      [
        "NAT de horquilla",
        "Traducción que permite a los clientes internos acceder a la dirección externa del servicio interno."
      ],
      [
        "control de salud",
        "Prueba utilizada para decidir si un criterio de valoración debe seguir siendo elegible."
      ],
      [
        "Menos conexiones",
        "Algoritmo que elige el endpoint con menos conexiones activas."
      ],
      [
        "NAPT/PAT",
        "Traducción que incluye direcciones y puertos de transporte."
      ],
      [
        "almacenamiento en caché negativo",
        "Caché sin nombre ni tipo DNS."
      ],
      [
        "resolución recursiva",
        "Servidor que obtiene la respuesta final en nombre del cliente y mantiene el caché."
      ],
      [
        "proxy inverso",
        "Intermediario que representa servidores y selecciona upstream."
      ],
      [
        "RRset",
        "Conjunto de registros con el mismo nombre, clase y tipo."
      ],
      [
        "Afinidad de sesión",
        "Mecanismo que intenta mantener las solicitudes relacionadas en el mismo backend."
      ],
      [
        "SNI",
        "Indicación de nombre de host enviada durante el protocolo de enlace TLS."
      ],
      [
        "SNAT",
        "Traducción de la dirección de origen o puerto."
      ],
      [
        "DNS de horizonte dividido",
        "Diferentes respuestas para el mismo nombre según el entorno de resolución."
      ],
      [
        "resolución de trozo",
        "Componente local que envía consultas a un resolvedor recursivo."
      ],
      [
        "TTL",
        "Tiempo durante el cual los datos DNS pueden permanecer en caché."
      ],
      [
        "Túnel",
        "Intermediario que reenvía bytes después de establecer un túnel."
      ],
      [
        "aguas arriba",
        "Destino al que el proxy o puerta de enlace reenvía el tráfico."
      ],
      [
        "Zona",
        "Porción administrada del espacio de nombres DNS."
      ]
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
    "text": "Las especificaciones siguientes son las fuentes principales de los conceptos presentados. Los RFC antiguos siguen siendo fundamentales, pero deben leerse junto con las actualizaciones indicadas en la página del Editor RFC. La documentación del producto cambia con el tiempo; Valide la versión y el modo de implementación en uso antes de aplicar una configuración."
  },
  {
    "kind": "paragraph",
    "text": "La lectura recomendada comienza con RFC 1034 y 1035, continúa con la terminología y el almacenamiento en caché, luego los transportes y DNSSEC. Para intermediarios HTTP, lea la arquitectura RFC 9110 y los encabezados reenviados. Luego compare la documentación sobre balanceo de carga y las referencias oficiales de Axway y Azure."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "RFC 1034 - Domain Names: Concepts and Facilities",
      "RFC 1035 - Domain Names: Implementation and Specification",
      "RFC 2308 - Negative Caching of DNS Queries",
      "RFC 6891 - Extension Mechanisms for DNS (EDNS(0))",
      "RFC 7766 - DNS Transport over TCP",
      "RFC 9499 - DNS Terminology",
      "RFC 4033 - DNS Security Introduction and Requirements",
      "RFC 4034 - Resource Records for DNSSEC",
      "RFC 4035 - DNSSEC Protocol Modifications",
      "RFC 7858 - DNS over TLS",
      "RFC 8484 - DNS Queries over HTTPS",
      "RFC 3022 - Traditional IP Network Address Translator",
      "RFC 4787 - NAT Behavioral Requirements for UDP",
      "RFC 5382 - NAT Behavioral Requirements for TCP",
      "RFC 9110 - HTTP Semantics",
      "RFC 7239 - Forwarded HTTP Extension",
      "RFC 9440 - Client-Cert HTTP Header Field",
      "IANA - Service Name and Port Number Registry",
      "IANA - Technical requirements for authoritative name servers",
      "NGINX - HTTP Load Balancing",
      "Envoy - Load Balancing Overview",
      "Axway - Configure API Gateway High Availability",
      "Axway - Routing Filters",
      "Axway - Remote Host Settings",
      "Axway - Configure Proxy Servers",
      "Azure Load Balancer Overview",
      "Azure Application Gateway Overview",
      "Azure Traffic Manager Overview",
      "Azure Front Door Overview",
      "Azure API Management Virtual Network Concepts",
      "Integrate API Management internal VNet with Application Gateway",
      "Azure Load Balancing Options"
    ]
  },
  {
    "kind": "subhead",
    "text": "Próximo capítulo"
  },
  {
    "kind": "paragraph",
    "text": "El Capítulo 5 profundizará en HTTP/1.1, HTTP/2 y HTTP/3: estructura de mensajes, semántica, conexiones persistentes, multiplexación, compresión de encabezados, QUIC e impactos en API Gateways."
  }
];
