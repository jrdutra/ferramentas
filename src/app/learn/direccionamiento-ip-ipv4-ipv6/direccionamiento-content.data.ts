import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Traducción completa al español del PDF proporcionado; solo se eliminaron encabezados, pies y saltos físicos de página.
export const DIRECCIONAMIENTO_IP_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Presentación del capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "En los capítulos anteriores, la comunicación fue observada como una secuencia de capas: la aplicación produce datos, la capa de transporte organiza la comunicación entre procesos y el protocolo IP conduce datagramas entre redes. Este capítulo se centra en el mecanismo que permite identificar interfaces y elegir caminos. Sin un plan de direccionamiento coherente y rutas correctas, la conexión TCP siquiera alcanza listener del API Gateway o del backend."
  },
  {
    "kind": "paragraph",
    "text": "Direccionamiento IP parece sencillo cuando reducido a una secuencia como 10.20.30.40, pero el funcionamiento real implica representación binaria, prefijos, tablas de rutas, alcances, direcciones especiales, traducción, fragmentación y coexistencia entre dos versiones del protocolo. En ambientes corporativos, estos elementos se combinan con redes virtuales, balanceadores, firewalls, private endpoints, túneles, datacenters y clusters. Una diferencia de un bit en la máscara puede encaminar el tráfico al lugar equivocado o producir superposición de redes difícil de diagnosticar."
  },
  {
    "kind": "paragraph",
    "text": "IPv4 permanece ampliamente utilizado y su espacio de 32 bits llevó a la adopción de CIDR, direcciones privadas y NAT. IPv6 amplía la dirección a 128 bits, modifica la cabecera, elimina el broadcast, hace Neighbor Discovery e ICMPv6 componentes centrales y ofrece mecanismos propios de autoconfiguración. La transición no ocurre como un intercambio instantáneo: redes dual stack, DNS con registros A y AAAA, Happy Eyeballs y mecanismos de traducción conviven durante largos períodos."
  },
  {
    "kind": "paragraph",
    "text": "Para profesionales de API Gateways, el objetivo es ir más allá de calcular subredes. Es necesario saber qué dirección alcanza el consumidor, qué dirección utiliza el gateway como origen, como el nombre de backend se resuelve, cuál ruta vence, donde ocurre NAT, cual componente preserva el IP original y cómo se establece el camino de retorno. Al final del capítulo, el lector debe lograr transformar síntomas como \"funciona de una red, pero no de otra\" en hipótesis verificables."
  },
  {
    "kind": "subhead",
    "text": "Cómo estudiar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Refaza los cálculos en papel y valide con herramientas como ipcalc, Python ipaddress o calculadoras corporativas autorizadas. En enrutamiento, siempre escriba origen, destino, prefijos correspondientes, ruta elegida y siguiente salto."
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
      "Explicar la función del protocolo IP y diferenciar nombre, dirección, interfaz, prefijo, ruta y siguiente salto.",
      "Interpretar direcciones IPv4 en decimal y binario, máscaras y notación CIDR.",
      "Calcular red, broadcast, pista de hosts y cantidad de direcciones de una subred.",
      "Comprender VLSM, sumarización, superposición y el principio de longest prefix match.",
      "Reconocer direcciones IPv4 privados, públicos y de finalidad especial.",
      "Relacionar NAT/PAT a la identidad de origen y a los límites operativos discutidos en el capítulo anterior.",
      "Describir el formato, la notación y los principales alcances de direcciones IPv6.",
      "Explicar Neighbor Discovery, Router Advertisement, SLAAC, DAD y DHCPv6.",
      "Comprender dual stack, registros A/AAAA, Happy Eyeballs y traducción IPv4/IPv6.",
      "Diagnosticar problemas de rutas, MTU, DNS, asimetría, allowlists y direccionamiento en API Gateways."
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
      "3.1 El papel del IP",
      "3.2 Nombres, direcciones, interfaces y rutas",
      "3.3 Dirección IPv4 y representación binaria",
      "3.4 Máscaras y CIDR",
      "3.5 Cálculo de subredes",
      "3.6 VLSM, sumarización y superposición",
      "3.7 Direcciones de red, broadcast, /31 y /32",
      "3.8 Direcciones IPv4 especiales",
      "3.9 Direcciones públicas, privadas y NAT",
      "3.10 Tabla de rutas y longest prefix match",
      "3.11 Gateway predeterminado y enrutamiento asimétrico",
      "3.12 MTU, fragmentación y Path MTU Discovery",
      "3.13 Motivaciones y cabecera de IPv6",
      "3.14 Notación IPv6",
      "3.15 Tipos y objetivos IPv6",
      "3.16 NDP, SLAAC, DAD y DHCPv6",
      "3.17 Planificación IPv6 y tamaños de prefijo",
      "3.18 Coexistencia IPv4/IPv6",
      "3.19 Direccionamiento en API Gateways",
      "3.20 Troubleshooting",
      "3.21 Estudios de caso y laboratorios",
      "Resumen, ejercicios, glosario y referencias"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.1 El papel del protocolo IP",
    "id": "o-papel-do-protocolo-ip"
  },
  {
    "kind": "paragraph",
    "text": "Internet Protocol proporciona un servicio de entrega de datagramas entre origen y destino en un conjunto de redes interconectadas. Cada datagrama contiene direcciones de origen y destino, y los routers analizan el destino para decidir el siguiente salto. El servicio es no orientado a la conexión: cada datagrama puede ser tratado de forma independiente y el protocolo no crea, por sí solo, una sesión lógica equivalente al TCP."
  },
  {
    "kind": "paragraph",
    "text": "La especificación de IPv4 deja claro que IP no proporciona confiabilidad final a fin, ordenación, retransmisión o control de flujo. Estas propiedades pertenecen a protocolos superiores o a la aplicación. Un router puede descartar un paquete por fila llena, TTL espirado, ausencia de ruta, política de seguridad o problema de MTU. La capa IP puede generar o provocar mensajes ICMP, pero no garantiza que la aplicación reciba una respuesta."
  },
  {
    "kind": "paragraph",
    "text": "La dirección IP identifica una interfaz en determinado contexto de red, y no necesariamente una persona, aplicación o máquina física de forma permanente. Un host multihomed posee varias interfaces y direcciones; un balanceador presenta una dirección virtual atendido por varias instancias; un pod puede tener dirección efêmero; un private endpoint asocia una dirección privada a un servicio administrado. Esa distinción es importante al interpretar logs y reglas de acceso."
  },
  {
    "kind": "paragraph",
    "text": "En una llamada API, el IP aparece en varios puntos: dirección resuelta por DNS, dirección de destino del front door o puerta de enlace, dirección utilizada por la puerta de enlace para alcanzar backend y dirección observada en el camino de retorno. La misma transacción de negocio puede atravesar múltiples pares de IPs debido a proxies y traducciones."
  },
  {
    "kind": "subhead",
    "text": "Límite de responsabilidad"
  },
  {
    "kind": "paragraph",
    "text": "IP intenta encaminar datagramas. Una respuesta HTTP 401 significa que el tráfico ya alcanzó una aplicación capaz de interpretar HTTP; ausencia de ruta o equipoout de conexión apunta para etapas anteriores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.2 Nombres, direcciones, interfaces y rutas",
    "id": "nomes-enderecos-interfaces-e-rotas"
  },
  {
    "kind": "paragraph",
    "text": "Un nombre como api.empresa.com es una identificación amigable usada por la aplicación y por el usuario. DNS normalmente asocia ese nombre a una o más direcciones IPv4 y IPv6. Después de la resolución, la pila IP trabaja con direcciones. Cambiar un registro DNS no cambia automáticamente conexiones ya establecidas, y el tiempo de vida de la caché influye cuando se utilizan nuevas direcciones."
  },
  {
    "kind": "paragraph",
    "text": "Una dirección está configurada en una interfaz lógica o física junto a un prefijo. El prefijo informa qué bits representan la red. La interfaz también puede poseer varias rutas y direcciones, incluyendo loopback, direcciones temporales y direcciones de diferentes familias. La aplicación puede escuchar en una dirección específica o en todas las direcciones locales, alterando su exposición."
  },
  {
    "kind": "paragraph",
    "text": "Una ruta describe cómo alcanzar un prefijo de destino. Contiene, de forma conceptual, prefijo, siguiente salto o interfaz de salida, métrica y origen de la información. Algunas rutas están directamente conectadas, otras son estáticas y otras llegan por protocolos dinámicos. El sistema elige una ruta para cada destino antes de transmitir el paquete."
  },
  {
    "kind": "paragraph",
    "text": "La distinción clásica ayuda en el diagnóstico: nombre indica lo que se busca, dirección indica donde está y ruta indica cómo llegar. Si curl resuelve el nombre equivocado, el problema es resolución o configuración. Si resuelve el IP correcto pero no hay ruta, el problema está en el encaminamiento. Si existe ruta y el peer responde con RST, el tráfico llegó a un endpoint, pero no encontró el servicio esperado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-01-name-address-route.svg",
    "alt": "DNS resuelve nombres; el sistema de enrutamiento decide cómo alcanzar la dirección",
    "caption": "Figura 1 — DNS resuelve nombres; el sistema de enrutamiento decide cómo alcanzar la dirección."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.3 Dirección IPv4 y representación binaria",
    "id": "endereco-ipv4-e-representacao-binaria"
  },
  {
    "kind": "paragraph",
    "text": "Una dirección IPv4 tiene 32 bits. La representación habitual divide estos bits en cuatro octetos y convierte cada octeto a decimal, produciendo la notación dotted decimal. El valor de cada octeto varía de 0 a 255 porque ocho bits representan 256 combinaciones. La dirección 192.168.10.77 es, por lo tanto, una forma compacta de escribir cuatro secuencias binarias."
  },
  {
    "kind": "paragraph",
    "text": "Las operaciones de subred no se realizan con los números decimales aislados, sino con bits. La máscara separa el prefijo de los bits disponibles dentro de la subred. Una operación AND entre dirección y máscara produce la dirección de red. Cuando todos los bits de host se colocan en 1, se obtiene el broadcast de la subred tradicional."
  },
  {
    "kind": "paragraph",
    "text": "Convertir algunos valores frecuentes acelera cálculos. En un octeto de máscara, los valores válidos son 0, 128, 192, 224, 240, 248, 252, 254 y 255 porque los bits 1 necesitan ser contiguos a partir de la izquierda. Una máscara 255.255.255.192 corresponde a 24 bits completos más dos bits en el último octeto, por lo tanto /26."
  },
  {
    "kind": "paragraph",
    "text": "El concepto histórico de clases A, B y C ayuda a entender documentos antiguos, pero la planificación moderna utiliza CIDR. Presumir que toda dirección iniciada por 10 es automáticamente /8 o que todo 192 es /24 genera errores. El prefijo debe ser informado explícitamente o obtenido de la configuración de red."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-02-ipv4-binary-prefix.svg",
    "alt": "IPv4 posee 32 bits y la máscara define el límite del prefijo",
    "caption": "Figura 2 — IPv4 posee 32 bits y la máscara define el límite del prefijo."
  },
  {
    "kind": "table",
    "caption": "Tabla 1 - Valores posibles en un octeto de máscara IPv4 continua.",
    "headers": [
      "Decimal",
      "Binario",
      "Bits de prefijo en octeto"
    ],
    "rows": [
      [
        "0",
        "00000000",
        "0"
      ],
      [
        "128",
        "10000000",
        "1"
      ],
      [
        "192",
        "11000000",
        "2"
      ],
      [
        "224",
        "11100000",
        "3"
      ],
      [
        "240",
        "11110000",
        "4"
      ],
      [
        "248",
        "11111000",
        "5"
      ],
      [
        "252",
        "11111100",
        "6"
      ],
      [
        "254",
        "11111110",
        "7"
      ],
      [
        "255",
        "11111111",
        "8"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.4 Máscaras de subred y notación CIDR",
    "id": "mascaras-de-sub-rede-e-notacao-cidr"
  },
  {
    "kind": "paragraph",
    "text": "CIDR representa el tamaño del prefijo por una barra seguida de la cantidad de bits 1 de la máscara. 10.20.30.0/24 indica que los 24 primeros bits identifican el prefijo y restan 8 bits a posiciones dentro de la subred. La misma máscara decimal es 255.255.255.0. El prefijo no solo informa cantidad de hosts; es la unidad usada en atribución y enrutamiento."
  },
  {
    "kind": "paragraph",
    "text": "La adopción de CIDR reemplazó el modelo rígido de clases y permitió atribuir bloques más próximos a la necesidad real. También permitió agregar rutas. En lugar de publicar cientos de redes pequeñas por separado, una organización puede anunciar un prefijo mayor que las contiene, siempre que la topología y la política permitan. La agregación reduce el estado en las tablas globales e internas."
  },
  {
    "kind": "paragraph",
    "text": "El tamaño total de un bloque IPv4 es 2 elevado al número de bits no pertenecientes al prefijo. Un /24 contiene 256 direcciones; /25 contiene 128; /26 contiene 64; /27 contiene 32. Cada incremento en el prefijo divide el bloque anterior por la mitad. Esa relación es más segura que decorar tablas sin comprender los bits."
  },
  {
    "kind": "paragraph",
    "text": "CIDR también se usa en listas de control y políticas de firewall. Permitir 10.20.0.0/16 proporciona acceso a 65.536 posiciones, no sólo a un servidor. Usar prefijo amplio por conveniencia puede violar el menor privilegio. Por otro lado, permitir direcciones individuales en entornos con salida dinámica puede causar biodisponibilidad. El diseño necesita alinear seguridad, estabilidad y operación."
  },
  {
    "kind": "table",
    "caption": "Tabla 2 - Prefijos IPv4 frecuentes. *La regla menos dos posee excepciones como /31 y /32.",
    "headers": [
      "Prefijo",
      "Máscara",
      "Direcciones en el bloque",
      "Hosts tradicionales*"
    ],
    "rows": [
      [
        "/24",
        "255.255.255.0",
        "256",
        "254"
      ],
      [
        "/25",
        "255.255.255.128",
        "128",
        "126"
      ],
      [
        "/26",
        "255.255.255.192",
        "64",
        "62"
      ],
      [
        "/27",
        "255.255.255.224",
        "32",
        "30"
      ],
      [
        "/28",
        "255.255.255.240",
        "16",
        "14"
      ],
      [
        "/29",
        "255.255.255.248",
        "8",
        "6"
      ],
      [
        "/30",
        "255.255.255.252",
        "4",
        "2"
      ],
      [
        "/31",
        "255.255.255.254",
        "2",
        "uso especial punto a punto"
      ],
      [
        "/32",
        "255.255.255.255",
        "1",
        "ruta de host"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.5 Cálculo de una subred IPv4",
    "id": "calculo-de-uma-sub-rede-ipv4"
  },
  {
    "kind": "paragraph",
    "text": "Considere 192.168.10.77/26. El prefijo /26 corresponde a 255.255.255.192. En el último octeto, el tamaño del bloque es 256 menos 192, o 64. Los intervalos comienzan en 0, 64, 128 y 192. Como 77 está entre 64 y 127, la dirección de red es 192.168.10.64 y el broadcast es 192.168.10.127."
  },
  {
    "kind": "paragraph",
    "text": "La pista de hosts tradicional comienza en la dirección siguiente a la red y termina en la dirección anterior al broadcast: 192.168.10.65 a 192.168.10.126. Existen 64 posiciones en el bloque y 62 posiciones tradicionalmente atribuibles a hosts. Esta regla atiende subredes multiacceso IPv4 comunes, pero no debe aplicarse mecánicamente a /31 y /32."
  },
  {
    "kind": "paragraph",
    "text": "El mismo cálculo se puede hacer con operación binaria. El último octeto de la dirección es 01001101 y el de la máscara es 11000000. AND produce 01000000, decimal 64. Para el broadcast, se preservan los bits de prefijo y se colocan los seis bits de host en 1, produciendo 01111111, decimal 127."
  },
  {
    "kind": "paragraph",
    "text": "En troubleshooting, el cálculo responde si dos interfaces se consideran locales. Un host 192.168.10.77/26 considera 192.168.10.100 directamente conectado, pero envía 192.168.10.130 a la puerta de enlace. Si el peer se ha configurado con /24, los dos lados no están de acuerdo con quién está en el mismo enlace. Esa asimetría de percepción genera ARP sin respuesta, caminos inesperados y fallas intermitentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-03-ipv4-subnet-calculation.svg",
    "alt": "Cálculo completo de la dirección 192.168.10.77/26",
    "caption": "Figura 3 — Cálculo completo de la dirección 192.168.10.77/26."
  },
  {
    "kind": "subhead",
    "text": "Validación didáctica con el módulo ipaddress de Python"
  },
  {
    "kind": "code",
    "text": "import ipaddress"
  },
  {
    "kind": "code",
    "text": "iface = ipaddress.ip_interface('192.168.10.77/26')\nprint('Red:', iface.network.network_address)\nprint('Broadcast:', iface.network.broadcast_address)\nprint('Máscara:', iface.network.netmask)\nprint('Direcciones totales:', iface.network.num_addresses)\nprint('Primer host:', next(iface.network.hosts()))\nprint('Último host:', list(iface.network.hosts())[-1])"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.6 VLSM, sumarización y superposición de redes",
    "id": "vlsm-sumarizacao-e-sobreposicao-de-redes"
  },
  {
    "kind": "paragraph",
    "text": "Variable Length Subnet Masking permite utilizar prefijos de tamaños diferentes dentro de un plan. Una red de usuarios puede recibir /24, una red de servidores /26 y un enlace punto a punto /31. La asignación eficiente comienza por las mayores necesidades, respeta las fronteras binarias y reserva espacio para crecimiento. Dividir bloques aleatorios crea fragmentación administrativa y dificulta la suma."
  },
  {
    "kind": "paragraph",
    "text": "Sumarización combina prefijos contíguos que comparten bits iniciales. Las redes 10.20.0.0/24, 10.20.1.0/24, 10.20.2.0/24 y 10.20.3.0/24 pueden ser representadas por 10.20.0.0/22. La ruta resumida reduce entradas, pero también cubre todo el intervalo 10.20.0.0 a 10.20.3.255. La publicará sin poseer todos los bloques puede atraer tráfico para destinos inexistentes o pertenecientes a otro dominio."
  },
  {
    "kind": "paragraph",
    "text": "Superposición ocurre cuando dos dominios utilizan prefijos que se intersectan. Es frecuente en fusiones, VPNs e integraciones con socios que eligieron los mismos bloques RFC 1918. Si la red local y la remota usan 10.0.0.0/8, la tabla no puede distinguir el significado solo por el destino. Traducción, redesign, VRFs o proxies se hacen necesarios."
  },
  {
    "kind": "paragraph",
    "text": "En arquitecturas de API híbridas, superposición puede impedir que una gateway en la nube alcance un backend on-premises. DNS resuelve 10.20.5.10, pero VNet ya usa 10.20.0.0/16 para otra finalidad y selecciona una ruta local. El error parece firewall, pero la causa está en el plano de direccionamiento. Documentar bloques, propietarios y reservas es una función arquitectural, no solo operacional."
  },
  {
    "kind": "subhead",
    "text": "Regla de planificación"
  },
  {
    "kind": "paragraph",
    "text": "Una buena sumarización nace de asignación jerárquica. No intente corregir un plan fragmentado sólo creando rutas agregadas que apuntan a destinos que el siguiente salto no conoce."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.7 Red, broadcast, /31 y /32",
    "id": "rede-broadcast-31-e-32"
  },
  {
    "kind": "paragraph",
    "text": "En una subred IPv4 multiacceso tradicional, la primera dirección representa la red y el último representa el broadcast dirigido. Estas direcciones no suelen atribuirse a interfaces de hosts. La regla de hosts igual a 2^h menos 2 deriva de esa reserva histórica. broadcast permite enviar a todos los nodos del segmento, aunque su uso es limitado por routers y políticas."
  },
  {
    "kind": "paragraph",
    "text": "RFC 3021 permite prefijos /31 en enlaces punto a punto. Como solo hay dos variables y no hay necesidad de red y broadcast separados para descubrir múltiples hosts, las dos posiciones pueden ser usadas. Esta práctica ahorra direcciones, pero requiere soporte en los equipos y debe ser aplicada al contexto correcto, no a una LAN común."
  },
  {
    "kind": "paragraph",
    "text": "Un /32 identifica una sola posición IPv4. Se utiliza en rutas de host, loopbacks de routers, políticas y anuncios específicos. Configurar un /32 en una interfaz no significa automáticamente ausencia de comunicación: rutas on-link, point-to-point o configuraciones especiales pueden definir el siguiente salto. Sin embargo, la interpretación difiere de una subred compartida."
  },
  {
    "kind": "paragraph",
    "text": "Broadcast limitado 255.255.255.255 permanece en el enlace local. Broadcast dirigido a una subred puede ser filtrado por razones de seguridad y operación. Aplicaciones modernas no deben depender de broadcast IP para descubrir entre redes. En IPv6, broadcast fue eliminado y funciones equivalentes utilizan multicast con alcance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.8 Direcciones IPv4 de finalidad especial",
    "id": "enderecos-ipv4-de-finalidade-especial"
  },
  {
    "kind": "paragraph",
    "text": "No todas las direcciones que cabe en el formato IPv4 son globalmente utilizables. La IANA mantiene un registro de bloques de finalidad especial e informa propiedades como origen permitido, destino permitido, encaminamiento y alcance global. Esta fuente es más confiable que listas memorizadas, pues nuevos bloques pueden ser reservados por RFCs."
  },
  {
    "kind": "paragraph",
    "text": "El bloque 127.0.0.0/8 se asocia con loopback. Trafego destinado a él debe permanecer en el propio nodo; 127.0.0.1 es la forma más conocida. 169.254.0.0/16 se utiliza para link-local IPv4 cuando una dirección no se obtiene por configuración normal. No debe ser roteado como dirección corporativa entre subredes."
  },
  {
    "kind": "paragraph",
    "text": "Los bloques 192.0.2.0/24, 198.51.100.0/24 y 203.0.113.0/24 se reservan para documentación. Los utilizarás en diagramas evita publicar direcciones reales o estimular copia de redes privadas que pueden resolver. El bloque 198.18.0.0/15 se reserva para benchmarking y no debe confundirse con una dirección pública común."
  },
  {
    "kind": "paragraph",
    "text": "Multicast IPv4 usa 224.0.0.0/4. 0.0.0.0 puede representar una dirección no especificada en contextos de configuración o bind, y 255.255.255.255 representa un broadcast limitado. La semántica depende del campo y de la operación; por ejemplo, escuchar en 0.0.0.0 significa aceptar en todas las direcciones IPv4 locales, no enviar a un servidor llamado 0.0.0.0."
  },
  {
    "kind": "table",
    "caption": "Tabla 3 - Bloques IPv4 importantes. Consulte el registro IANA para propiedades completas.",
    "headers": [
      "Bloque",
      "Finalidad principal",
      "Observación"
    ],
    "rows": [
      [
        "10.0.0.0/8",
        "Privado",
        "No globalmente enrutable"
      ],
      [
        "172.16.0.0/12",
        "Privado",
        "172.16.0.0 a 172.31.255.255"
      ],
      [
        "192.168.0.0/16",
        "Privado",
        "Uso interno común"
      ],
      [
        "100.64.0.0/10",
        "Shared Address Space",
        "Frecuentemente usado por CGN"
      ],
      [
        "127.0.0.0/8",
        "Loopback",
        "Permanece en el nodo"
      ],
      [
        "169.254.0.0/16",
        "Enlace local",
        "Comunicación en el enlace"
      ],
      [
        "192.0.2.0/24",
        "Documentación",
        "TEST-NET-1"
      ],
      [
        "198.51.100.0/24",
        "Documentación",
        "TEST-NET-2"
      ],
      [
        "203.0.113.0/24",
        "Documentación",
        "TEST-NET-3"
      ],
      [
        "224.0.0.0/4",
        "Multicast",
        "Grupos multicast IPv4"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.9 Direcciones públicas, privadas, NAT y PAT",
    "id": "enderecos-publicos-privados-nat-e-pat"
  },
  {
    "kind": "paragraph",
    "text": "RFC 1918 reservó tres bloques para redes privadas: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16. Estas direcciones pueden ser reutilizados por organizaciones diferentes y no son encaminadas globalmente en Internet. \"Privado\" describe el alcance de la rotación, no el nivel de seguridad. Una red privada todavía necesita segmentación, autenticación, criptografía, monitoreo y control de acceso."
  },
  {
    "kind": "paragraph",
    "text": "Para acceder a destinos externos, redes IPv4 privadas normalmente utilizan traducción. NAT cambia la dirección y, en muchos casos, PAT también altera el puerto para multiplexar flujos. El estado de traducción permite que la respuesta sea asociada al cliente interno. Este mecanismo preservó direcciones públicas, pero introdujo dependencia de estado y eliminó transparencia final a fin."
  },
  {
    "kind": "paragraph",
    "text": "El bloque 100.64.0.0/10 fue reservado como espacio compartido para proveedores, especialmente Carrier-Grade NAT. No es equivalente a los bloques RFC 1918 y puede aparecer entre el firmante e Internet. En troubleshooting, observar 100.64/10 no prueba que la dirección pertenece a la red privada de la organización; puede representar una capa adicional de traducción."
  },
  {
    "kind": "paragraph",
    "text": "Cuando una API recibe una conexión, la dirección IP de origen de socket es la dirección inmediatamente anterior después de las traducciones y proxies. Un encabezado como X-Forwarded-For puede cargar la cadena informada por proxies, pero es texto de aplicación. La pasarela debe eliminar valores enviados por consumidores no confiables y construir la cabecera desde una cadena conocida. Usar cabecera bruta para autorización permite spoofing."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-04-nat-observed-address.svg",
    "alt": "NAT altera el origen observado; los encabezados de proxy requieren confianza explícita",
    "caption": "Figura 4 — NAT altera el origen observado; los encabezados de proxy requieren confianza explícita."
  },
  {
    "kind": "subhead",
    "text": "Seguridad"
  },
  {
    "kind": "paragraph",
    "text": "No use la existencia de un IP privado como prueba de identidad. Dirección es señal de red y puede ser compartido, traducido o forjado en cabeceras de aplicación. Combine con autenticación y controles adecuados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.10 Tabla de rutas y longest prefix match",
    "id": "tabela-de-rotas-e-longest-prefix-match"
  },
  {
    "kind": "paragraph",
    "text": "La tabla de rutas puede contener varias entradas que corresponden al mismo destino. El principio de longest prefix match selecciona la ruta con el mayor número de bits iniciales correspondientes. Una ruta /24 es más específica que /16, que es más específica que /8. La ruta estándar /0 corresponde a cualquier destino, pero pierde para cualquier ruta más específica válida."
  },
  {
    "kind": "paragraph",
    "text": "Considere rutas para 0.0.0.0/0, 10.0.0.0/8, 10.20.0.0/16 y 10.20.30.0/24. Un paquete destinado a 10.20.30.25 corresponde a las cuatro, pero utiliza /24. Si esa ruta apunta a un túnel no disponible, la presencia de una ruta /16 alternativa no garantiza fallback automático; la ruta específica continúa ganando mientras permanece instalada y considerada utilizable."
  },
  {
    "kind": "paragraph",
    "text": "Después de elegir el prefijo más largo, implementaciones pueden usar métrica, distancia administrativa, política o múltiples caminos entre rutas equivalentes. Estos detalles varían, pero no sustituyen la regla de especificidad. En cloud, route tables definidas por el usuario pueden reemplazar rutas de sistema y enviar tráfico a appliances virtuales."
  },
  {
    "kind": "paragraph",
    "text": "Una ruta directamente conectada informa que el destino está en el enlace y exige resolución de vecino. Una ruta vía gateway envía el cuadro al siguiente salto, aunque la dirección IP de destino del datagrama sigue siendo el destino final. Confundir dirección del siguiente salto con destino IP dificulta la lectura de capturas Ethernet."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-05-longest-prefix-match.svg",
    "alt": "La ruta más específica vence entre los prefijos coincidentes",
    "caption": "Figura 5 — La ruta más específica vence entre los prefijos coincidentes."
  },
  {
    "kind": "subhead",
    "text": "Ejemplos para consultar la decisión de ruta local"
  },
  {
    "kind": "code",
    "text": "# Linux\nip route get 10.20.30.25\nip route show"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nGet-NetRoute -AddressFamily IPv4 | Sort-Object DestinationPrefix\nTest-NetConnection 10.20.30.25 -Port 443 -InformationLevel Detailed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.11 Gateway predeterminado, retorno y enrutamiento asimétrico",
    "id": "gateway-padrao-retorno-e-roteamento-assimetrico"
  },
  {
    "kind": "paragraph",
    "text": "La gateway predeterminado es el siguiente salto usado cuando ninguna ruta más específica corresponde al destino. Debe estar alcanzable según la configuración de la interfaz o por mecanismo propio de la plataforma. Configurar una pasarela no enseña automáticamente al resto de la red como regresar; el camino inverso depende de las tablas de los demás componentes."
  },
  {
    "kind": "paragraph",
    "text": "Roteamiento asimétrico ocurre cuando ida y vuelta atraviesan caminos diferentes. IP no requiere simetría, pero firewalls stateful, NATs y balanceadores frecuentemente dependen de observar ambos sentidos. Si la requisición entra por un firewall y la respuesta sale por otro, el segundo no posee estado y puede descartar el tráfico. El síntoma es conexión que inicia, pero no completa o funciona solo en algunas instancias."
  },
  {
    "kind": "paragraph",
    "text": "En redes híbridas, rutas propagadas por VPN o ExpressRoute pueden competir con rutas locales y de peering. Un cambio más específico en una región puede atraer solamente parte del tráfico. Capturar solo en el cliente no revela dónde el retorno se perdió; es necesario consultar rutas efectivas y logs en los puntos de tránsito."
  },
  {
    "kind": "paragraph",
    "text": "Source NAT a veces se usa para forzar el retorno al mismo dispositivo, ya que backend responde a la dirección del traductor. Eso simplifica simetría, pero esconde el origen real y consume puertos. La decisión debe considerar observabilidad, escala, política de seguridad y necesidad de preservar direcciones."
  },
  {
    "kind": "subhead",
    "text": "Pregunta decisiva"
  },
  {
    "kind": "paragraph",
    "text": "No basta con demostrar que hay ruta de A a B. Compruebe cómo B vuelve a la dirección de origen realmente observada después de NAT, balanceo y proxies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.12 MTU, fragmentación y Path MTU Discovery",
    "id": "mtu-fragmentacao-e-path-mtu-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Cada tecnología de enlace tiene una Maximum Transmission Unit, el mayor paquete que se puede cargar sin fragmentar en ese enlace. Un camino puede contener enlaces con MTUs diferentes. Encapsulamentos de VPN, túneles y overlays reducen el espacio disponible porque añaden cabeceras. Los paquetes pequeños funcionan como respuestas o handshakes mayores fallan, produciendo el conocido black hole de MTU."
  },
  {
    "kind": "paragraph",
    "text": "En IPv4, un router puede fragmentar un datagrama cuando el bit Don't Fragment no está definido. Los fragmentos se remontan al destino. Fragmentación aumenta el procesamiento y la pérdida de un fragmento invalida el datagrama completo. Con DF definido, el router descarta y debe enviar ICMP indicando la necesidad de paquete menor, permitiendo Path MTU Discovery."
  },
  {
    "kind": "paragraph",
    "text": "En IPv6, routers no fragmentan paquetes en tránsito. El nodo de origen es responsable de ajustar el tamaño y puede usar Fragment extension header cuando sea necesario. ICMPv6 Packet Too Big es parte esencial del funcionamiento. Bloquear todo ICMPv6 rompe descubrimiento de MTU y otras funciones fundamentales, diferentemente de la visión simplista de que ICMP sirve apenas a ping."
  },
  {
    "kind": "paragraph",
    "text": "En APIs, los problemas de MTU solo pueden surgir con certificados grandes, encabezados extensos, subidas o respuestas mayores. El TCP intenta retransmitir segmentos que nunca atraviesan, y la aplicación registra timeout. Ajustar MSS en túneles, corregir MTU y permitir mensajes ICMP necesarias son soluciones mejores que reducir arbitrariamente payloads."
  },
  {
    "kind": "table",
    "caption": "Tabla 4 - Diferencias conceptuales de fragmentación entre IPv4 y IPv6.",
    "headers": [
      "Aspecto",
      "IPv4",
      "IPv6"
    ],
    "rows": [
      [
        "Fragmentación por router",
        "Posible cuando DF no está definido",
        "No permitida"
      ],
      [
        "Responsable de ajustar",
        "Origen y posiblemente routers",
        "Origen"
      ],
      [
        "Señal de paquete grande",
        "ICMP Destination Unreachable / fragmentation needed",
        "ICMPv6 Packet Too Big"
      ],
      [
        "Cabecera",
        "Campos de fragmentación en la cabecera base",
        "Fragment extension header en origen"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.13 Por qué se creó IPv6",
    "id": "por-que-o-ipv6-foi-criado"
  },
  {
    "kind": "paragraph",
    "text": "IPv4 proporciona aproximadamente 4,29 mil millones de combinaciones, y parte del espacio está reservada. El crecimiento de Internet ha vuelto el agotamiento previsible. CIDR, NAT y políticas de asignación extendieron la vida de IPv4, pero también aumentaron complejidad. IPv6 amplió la dirección a 128 bits y fue diseñado para soportar un espacio mucho mayor y autoconfiguración moderna."
  },
  {
    "kind": "paragraph",
    "text": "IPv6 no es solo 'IPv4 con más números'. La cabecera base fue simplificada y posee un tamaño fijo de 40 bytes. Las funciones opcionales se transportan en extensión headers. El campo Hop Limit sustituye el papel de TTL, Next Header encadea protocolos y extensiones, y Flow Label permite identificar flujos para tratamiento consistente."
  },
  {
    "kind": "paragraph",
    "text": "El checksum de la cabecera IPv4 fue eliminado de la cabecera base IPv6, evitando recálculo en cada router. La fragmentación por routers también fue eliminada. Esas decisiones transfieren responsabilidades a endpoints y protocolos auxiliares. Neighbor Discovery reemplaza funciones de ARP y añade descubrimiento de routers, prefijos y alcanzabilidad."
  },
  {
    "kind": "paragraph",
    "text": "La abundancia de direcciones no elimina la necesidad de planificación. Prefijos deben ser jerárquicos, documentados y asociados a zonas de seguridad. La ganancia está en evitar la escasez como motivación central y reducir dependencia de NAT como mecanismo de conservación, no en dispensar firewalls o controles."
  },
  {
    "kind": "subhead",
    "text": "Concepto erróneo común"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 no hace una red automáticamente pública o insegura. El alcance depende de la rotación y las políticas. NAT no es sinónimo de firewall, y ausencia de NAT no significa ausencia de protección."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.14 Notación y normalización de direcciones IPv6",
    "id": "notacao-e-normalizacao-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "Una dirección IPv6 tiene 128 bits, normalmente escritos como ocho grupos de cuatro dígitos hexadecimás separados por dos puntos. Cada grupo representa 16 bits. El hexadecimal reduce la longitud en comparación con el binario, pero todavía produce textos extensos. Reglas de compresión permiten eliminar ceros a la izquierda y sustituir una secuencia continua de grupos cero por::"
  },
  {
    "kind": "paragraph",
    "text": "La abreviación: puede aparecer una vez, ya que la longitud total necesita permanecer deductible. 2001:0db8:0000:0000:021a:2bff:fe3c:4d5e puede ser escrito como 2001:db8::21a:2bff:fe3c:4d5e. La RFC 5952 recomienda forma canónica con letras minúsculas, supresión de ceros a la izquierda y compresión de la secuencia de ceros más larga."
  },
  {
    "kind": "paragraph",
    "text": "Las direcciones IPv6 utilizadas con puertos necesitan corchetes para eliminar ambigüedades. Una URL puede ser https://[2001:db8::25]:8443/. Sin corchetes, los dos puntos de la dirección serían confundidos con el separador de puerto. En logs y configuraciones, la normalización evita que la misma dirección aparezca en formas textuales diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Las direcciones link-local pueden requerir una zone identifier, como fe80::1%eth0 o fe80::1%12, para indicar la interfaz. La misma dirección enlace-local puede existir en enlaces distintos. El identificador es local al nodo y no debe ser tratado como parte global de la dirección."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-06-ipv6-canonical-form.svg",
    "alt": "Representación completa y forma canónica de una dirección IPv6",
    "caption": "Figura 6 — Representación completa y forma canónica de una dirección IPv6."
  },
  {
    "kind": "subhead",
    "text": "Normalización y prueba de pertenencia con Python"
  },
  {
    "kind": "code",
    "text": "from ipaddress import IPv6Address, IPv6Network"
  },
  {
    "kind": "code",
    "text": "a = IPv6Address('2001:0db8:0000:0000:021a:2bff:fe3c:4d5e')\nprint(a.compressed)\nprint(a.exploded)\nprint(a in IPv6Network('2001:db8::/32'))"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.15 Tipos y alcances de direcciones IPv6",
    "id": "tipos-e-escopos-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 define direcciones unicast, anycast y multicast. Unicast identifica una interfaz o punto lógico y entrega a un destino. Anycast utiliza direcciones de la forma unicast atribuidas a múltiples interfaces; el enrutamiento entrega a una de ellas conforme a la topología. Multicast entrega a un grupo y sustituye varios usos de broadcast."
  },
  {
    "kind": "paragraph",
    "text": "::/128 es la dirección no especificada y ::1/128 es loopback. fe80::/10 identifica link-local y se crea en interfaces IPv6 para comunicación en el enlace. Routeres no envían enlace-local entre enlaces. Unique local Addresses usan fc00::/7; en la práctica, prefijos localmente atribuidos usan fd00::/8 con identificador pseudoaleatorio para reducir colisiones."
  },
  {
    "kind": "paragraph",
    "text": "La franja actualmente asociada a global unicast está dentro de 2000::/3. Global no significa que toda dirección sea alcanzable por Internet: firewalls, políticas y anuncios determinan conectividad. 2001:db8::/32 se reserva para documentación. ff00::/8 contiene multicast, con campos que indican flags y alcance."
  },
  {
    "kind": "paragraph",
    "text": "El alcance es decisivo. Una dirección link-local es adecuada para descubrir el router local, pero no para configurar un backend en otra red. Un ULA puede ser roteado internamente entre sitios si la organización lo planea. Una dirección global puede ser usada internamente y filtrado en el borde. Elegir dirección solo por la apariencia textual lleva a errores."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-07-ipv6-address-scopes.svg",
    "alt": "Prefijos IPv6 frecuentes y sus alcances conceptuales",
    "caption": "Figura 7 — Prefijos IPv6 frecuentes y sus alcances conceptuales."
  },
  {
    "kind": "subhead",
    "text": "IPv6 no tiene broadcast"
  },
  {
    "kind": "paragraph",
    "text": "Descubrimiento y anuncios usan grupos multicast específicos. Esto reduce la necesidad de interrumpir todos los nodos del enlace, pero exige soporte correcto a ICMPv6 y multicast local."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.16 Neighbor Discovery, SLAAC, DAD y DHCPv6",
    "id": "neighbor-discovery-slaac-dad-e-dhcpv6"
  },
  {
    "kind": "paragraph",
    "text": "Neighbor Discovery Protocol utiliza ICMPv6 para descubrir routers, resolver direcciones de capa de enlace, detectar cambios de vecindad y verificar la alcanzabilidad. Neighbor Solicitation y Neighbor Advertisement sustituyen las funciones de ARP. Router Solicitation permite solicitar anuncios, y Router Advertisement informa prefijos, router estándar, flags y parámetros como MTU."
  },
  {
    "kind": "paragraph",
    "text": "Stateless Address Autoconfiguration permite que un host forme direcciones a partir de los prefijos anunciados. El método de creación del identificador de interfaz puede utilizar valores estables o temporales según la privacidad y el sistema operativo; no se debe suponer que el MAC aparezca en la dirección moderna. Antes de usar una dirección, Duplicate Address Detection verifica si ya está en uso."
  },
  {
    "kind": "paragraph",
    "text": "Router Advertisement puede indicar si el host debe usar DHCPv6 para direcciones o información adicional. DHCPv6 puede operar de forma stateful o proporcionar parámetros sin asignar dirección. La ruta estándar IPv6 viene normalmente de Router Advertisement, no de una opción DHCPv6 equivalente a la gateway predeterminado de DHCPv4. Esta diferencia sorprende a los operadores que intentan bloquear RA y depender sólo de DHCPv6."
  },
  {
    "kind": "paragraph",
    "text": "Como NDP y SLAAC dependen de ICMPv6, políticas que bloquean indiscriminadamente ICMPv6 provocan fallas de dirección, vecindad y MTU. Seguridad debe aplicar filtrado específico y mecanismos como RA Guard en redes adecuadas, preservando mensajes necesarios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-08-ipv6-neighbor-discovery.svg",
    "alt": "Router Advertisement, formación de direcciones y Neighbor Discovery en IPv6",
    "caption": "Figura 8 — Router Advertisement, formación de direcciones y Neighbor Discovery en IPv6."
  },
  {
    "kind": "table",
    "caption": "Tabla 5 - Mensajes centrales de Neighbor Discovery.",
    "headers": [
      "Mensaje",
      "Origen -> destino típico",
      "Función"
    ],
    "rows": [
      [
        "Router Solicitation",
        "Host -> routers multicast",
        "Solicita anuncio de router"
      ],
      [
        "Router Advertisement",
        "Router -> hosts",
        "Informa prefijos, ruta estándar y parámetros"
      ],
      [
        "Neighbor Solicitation",
        "Host -> multicast/unicast",
        "Resolve vecino o verifica alcanzabilidad"
      ],
      [
        "Neighbor Advertisement",
        "Vecino -> solicitante",
        "Informa dirección de enlace y estado"
      ],
      [
        "Redirect",
        "Router -> host",
        "Indica siguiente salto mejor en el enlace"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.17 Planificación de prefijos IPv6",
    "id": "planejamento-de-prefixos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "La arquitectura IPv6 utiliza ampliamente una frontera de 64 bits para subredes en LANs, especialmente para SLAAC. Esto deja 64 bits para el identificador de interfaz. El enorme número de posiciones no debe ser interpretado como desperdicio en el sentido IPv4; la estructura favorece autoconfiguración, estabilidad y jerarquía."
  },
  {
    "kind": "paragraph",
    "text": "Las organizaciones normalmente reciben un prefijo agregado y el subdividen por región, ambiente, zona y segmento. Un /48 ofrece 65.536 subredes /64. Un /56 ofrece 256 subredes /64. El plan debe reservar bits de forma predecible, evitando llenar todo el espacio sin margen. La documentación precisa indicar propietario, función, ruta y política de cada bloque."
  },
  {
    "kind": "paragraph",
    "text": "Hay excepciones. RFC 6164 recomienda /127 en enlaces punto a punto de routers en ciertos escenarios. Las direcciones /128 pueden representar loopbacks y servicios. No se debe transportar la regla IPv4 de «menor subred » posible para todas las LANs IPv6, ni aplicar /64 ciegamente a cualquier tipo de enlace sin observar los estándares."
  },
  {
    "kind": "paragraph",
    "text": "ULAs deben usar identificador global pseudoaleatorio para reducir colisiones cuando las redes están interconectadas. Elegir fd00:1::/48 en todas las empresas recrea el problema de superposición de IPv4 privado. Prefijos globales y ULAs pueden coexistir, pero la selección de direcciones y DNS deben ser planificadas para evitar caminos inesperados."
  },
  {
    "kind": "table",
    "caption": "Tabla 6 - Capacidad de subdivisión IPv6 en unidades /64.",
    "headers": [
      "Prefijo recibido",
      "Cantidad de /64",
      "Uso ilustrativo"
    ],
    "rows": [
      [
        "/48",
        "65.536",
        "Organización o sitio con una jerarquía amplia"
      ],
      [
        "/52",
        "4.096",
        "División regional o entorno grande"
      ],
      [
        "/56",
        "256",
        "Sitio más pequeño o delegación común"
      ],
      [
        "/60",
        "16",
        "Ambiente limitado"
      ],
      [
        "/64",
        "1",
        "Subred LAN típica con SLAAC"
      ],
      [
        "/127",
        "2 posiciones",
        "Enlace punto a punto conforme RFC 6164"
      ],
      [
        "/128",
        "1 dirección",
        "Ruta de host/loopback"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.18 Coexistencia de IPv4 e IPv6",
    "id": "coexistencia-ipv4-e-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "La transición ocurre por coexistencia. En dual stack, interfaces y servicios poseen conectividad IPv4 y IPv6. DNS puede publicar registros A y AAAA. El cliente elige una familia conforme política, disponibilidad y desempeño. Operar dual stack significa mantener dos superficies de enrutamiento, firewall, observabilidad y troubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "Happy Eyeballs reduce la demora cuando una familia está configurada, pero el camino está degradado. El algoritmo inicia intentos de forma coordinada y utiliza la conexión que se vuelve adecuada primero, evitando que un IPv6 roto force largos timeouts antes del fallback. Como consecuencia, un defecto IPv6 puede permanecer oculto porque los usuarios observan éxito vía IPv4."
  },
  {
    "kind": "paragraph",
    "text": "NAT64 permite que clientes IPv6 alcancen servidores IPv4 por traducción, normalmente en conjunto con DNS64, que sintetiza respuestas AAAA a partir de registros Cuando proceda. Aplicaciones que llevan direcciones literales, dependen de IPv4 en el payload o validan familias de forma rígida pueden fallar. Proxies de aplicación también pueden terminar una familia e iniciar otra."
  },
  {
    "kind": "paragraph",
    "text": "Al publicar una API en dual stack, las pruebas necesitan confirmar TLS, allowlists, WAF, rate limiting y logs en ambas familias. Una política que solo permite IPv4 del socio no cubre su salida IPv6. DNS split-horizon puede volver combinaciones diferentes dentro y fuera de la red."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-09-dual-stack.svg",
    "alt": "Un cliente dual-stack puede elegir entre direcciones A y AAAA",
    "caption": "Figura 9 — Un cliente dual-stack puede elegir entre direcciones A y AAAA."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico dual-stack"
  },
  {
    "kind": "paragraph",
    "text": "Prueba explícitamente curl -4 y curl -6. El éxito genérico no demuestra que ambas familias funcionan; sólo puede mostrar que el mecanismo de selección evitó el camino defectuoso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.19 Direccionamiento en arquitecturas de API Gateway",
    "id": "enderecamento-em-arquiteturas-de-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Un API Gateway puede poseer endpoints públicos, privados o ambos, dependiendo de la plataforma y del tier. La dirección presentada al consumidor puede pertenecer a un WAF, CDN, Application Gateway o load balancer anterior. La pasarela recibe una conexión cuyo IP de origen es frecuentemente el último proxy. Preservar el origen lógico requiere encabezados construidos por componentes confiables o protocolos de proxy soportados."
  },
  {
    "kind": "paragraph",
    "text": "En el lado de backend, la puerta de enlace resuelve el hostname conforme al DNS disponible en su red. Si backend tiene private endpoint, el nombre público suele necesitar resolver para una dirección privada por una zona DNS privada o configuración equivalente. Resolver la dirección pública cuando la intención era privada puede causar bloqueo, hairpin, costo o exposición indebida."
  },
  {
    "kind": "paragraph",
    "text": "En Azure API Management, las opciones de red virtual y private endpoint dependen del tier y del modo. Un private endpoint inbound atribuye una dirección de VNet al acceso privado y exige DNS que asigne el hostname para esa dirección. Integración de salida permite alcanzar backends aislados. Estas dos direcciones son diferentes: convertir la entrada privada no garantiza automáticamente que la puerta de enlace tenga ruta privada para todo backend."
  },
  {
    "kind": "paragraph",
    "text": "En appliances y pasarelas on-premises, las interfaces pueden ser separadas por zonas, VLANs y rutas. El listener puede estar en una DMZ y el backend en red interna. Rutas estáticas, firewalls y NAT necesitan considerar los dos sentidos. Clusters exigen distinguir IP de administración, IP de tráfico, dirección virtual y direcciones de las instancias."
  },
  {
    "kind": "paragraph",
    "text": "Allowlist basada en IP precisa considerar un origen efectivo. Si la puerta utiliza SNAT, backend permite las direcciones de salida de la puerta, no los consumidores individuales. Si la plataforma escala o cambia direcciones, usar lista incompleta crea intermitencia. Los servicios administrados pueden publicar pistas o ofrecer integración privada para reducir la dependencia de IPs públicos variables."
  },
  {
    "kind": "paragraph",
    "text": "La dirección del socket y el valor de X-Forwarded-For tienen diferentes finalidades. Logs deben registrar ambos con indicación de confianza y cadena. Las políticas de seguridad deben aceptar encabezados solamente de proxies autorizados, sobrescreciendo valores externos. Geolocalización o rate limiting por IP se vuelven aproximados cuando muchos consumidores comparten NAT."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/es/figure-10-api-addressing-chain.svg",
    "alt": "Cada salto puede resolver, enrutar y traducir direcciones de forma independiente",
    "caption": "Figura 10 — Cada salto puede resolver, enrutar y traducir direcciones de forma independiente."
  },
  {
    "kind": "table",
    "caption": "Tabla 7 - Puntos de observación de direcciones en una cadena de APIs.",
    "headers": [
      "Elemento",
      "Dirección observada",
      "Pregunta de arquitectura"
    ],
    "rows": [
      [
        "Consumidores",
        "IP local y destino resuelto",
        "¿A/AAAA correcto? ¿Ruta y proxy?"
      ],
      [
        "WAF/Load Balancer",
        "IP del consumidor o NAT anterior",
        "¿ Preserva el origen de forma confiable?"
      ],
      [
        "API Gateway inbound",
        "IP del proxy anterior",
        "Listener público/privado y allowlist"
      ],
      [
        "API Gateway outbound",
        "IP/SNAT de salida",
        "Backend ¿ permite ese origen?"
      ],
      [
        "Backend",
        "IP del gateway o del traductor",
        "Retorno, logs y confianza en encabezados"
      ],
      [
        "DNS privado",
        "IP privada del servicio",
        "¿Zona vinculada y resolución en el gateway?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.20 Troubleshooting de direccionamiento y enrutamiento",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "La investigación comienza registrando origen, destino nominal, direcciones resueltas, familia IP, prefijo de la interfaz, tabla de rutas y siguiente salto. Decir solo « no conecta al servidor » omite información que determina el camino. Compara el resultado en el cliente, en la gateway y en una máquina de la misma subred de backend."
  },
  {
    "kind": "paragraph",
    "text": "Herramientas de resolución muestran registros y servidores consultados. dig y nslookup exhiben A y AAAA; Resolve-DnsName ofrece información equivalente en Windows. Cache local, hosts file, DNS corporativo y split-horizon pueden producir respuestas diferentes. Consulte el nombre desde el mismo entorno de ejecución de la gateway, no solo del portátil del ingeniero."
  },
  {
    "kind": "paragraph",
    "text": "ip addr, ip route y ip neigh exhiben direcciones, rutas y vecinos en Linux. En Windows, Get-NetIPAddress, Get-NetRoute y Get-NetNeighbor cumplen una función similar. Traceroute o tracert sugieren saltos, pero dependen de ICMP y políticas y no prueban el camino completo de una conexión TCP. Tracepath ayuda a observar MTU en algunos sistemas."
  },
  {
    "kind": "paragraph",
    "text": "Capturas muestran destino real, TTL/Hop Limit, ICMP, ARP o NDP y retransmisiones. Si el host envía ARP a un destino que debería usar la gateway, la máscara puede estar demasiado amplia. Si envía a la puerta, pero no recibe retorno, investigue ruta y política adelante. En IPv6, Neighbor Solicitation sin Advertisement sugiere problema local de enlace o dirección."
  },
  {
    "kind": "paragraph",
    "text": "Clouds suministran effective routes, flow logs, connection troubleshoot y diagnósticos de private endpoint. Estas herramientas deben ser correlacionadas con configuración de DNS. Una prueba por dirección literal puede funcionar mientras el nombre resuelve incorrectamente, o viceversa por SNI y certificado. Siempre prueba el camino que la aplicación realmente usa."
  },
  {
    "kind": "subhead",
    "text": "Comandos de observación — use solo en entornos autorizados"
  },
  {
    "kind": "code",
    "text": "# Linux\nip -br addr\nip route\nip route get 10.20.30.25\nip neigh\ndig A api.exemplo.com\ndig AAAA api.exemplo.com\ncurl -4 -v https://api.exemplo.com/health\ncurl -6 -v https://api.exemplo.com/health\ntracepath api.exemplo.com"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nGet-NetIPAddress\nGet-NetRoute\nGet-NetNeighbor\nResolve-DnsName api.exemplo.com -Type A\nResolve-DnsName api.exemplo.com -Type AAAA\nTest-NetConnection api.exemplo.com -Port 443 -InformationLevel Detailed"
  },
  {
    "kind": "table",
    "caption": "Tabla 8 - Síntomas comunes y líneas iniciales de investigación.",
    "headers": [
      "Síntoma",
      "Hipótesis de red",
      "Evidencias útiles"
    ],
    "rows": [
      [
        "Nombre resuelve IP incorrecto",
        "DNS split, cache, zona privada ausente",
        "dig/Resolve-DnsName en el mismo ambiente"
      ],
      [
        "No route to host",
        "Ruta ausente, next hop, política local",
        "Tabla de rutas e ICMP"
      ],
      [
        "Funciona por IP, fallo por nombre",
        "DNS, SNI, certificado, proxy",
        "curl -v y resolución"
      ],
      [
        "Funciona IPv4, fallo IPv6",
        "Ruta IPv6, RA, firewall, DNS AAAA",
        "curl -4/-6, ip -6 route"
      ],
      [
        "Paquetes pequeños funcionan",
        "MTU/PMTUD, ICMP bloqueado",
        "tracepath, captura, Packet Too Big"
      ],
      [
        "Backend ve origen inesperado",
        "NAT, proxy, SNAT",
        "captura y logs de los hops"
      ],
      [
        "Sólo retorno falla",
        "Asíetria, firewall stateful",
        "rutas en ambos lados y flow logs"
      ],
      [
        "Parte IP funciona",
        "DNS con múltiples A/AAAA, allowlist parcial",
        "probar cada dirección y logs"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.21 Estudios de caso",
    "id": "estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 — Un backend privado resuelve a una dirección pública"
  },
  {
    "kind": "paragraph",
    "text": "Un enlace integrado a la red privada llama backend. El hostname tiene una variable pública y private endpoint, pero la zona DNS privada no está vinculada a la red de la gateway. La resolución vuelve la dirección pública. El firewall de backend bloquea el origen público y la puerta de enlace registra connect timeout o 403 en el servicio de borde."
  },
  {
    "kind": "paragraph",
    "text": "La prueba realizada por un administrador en una VM de otra VNet funciona porque la VNet posee la zona correcta. La investigación debe comparar la resolución dentro del runtime de la puerta de enlace. La corrección es alinear DNS privado, vínculo de zona y ruta; agregar el IP público a allowlist sólo elude el diseño deseado y puede ampliar la exposición."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 — Máscaras diferentes en el mismo segmento"
  },
  {
    "kind": "paragraph",
    "text": "La pasarela 192.168.50.10/24 necesita alcanzar la appliance 192.168.51.20/23. Para la appliance, las dos direcciones pertenecen al mismo /23 y él intenta responder directamente por ARP. Para la pasarela, 192.168.51.20 está fuera de /24 y la requisición sigue al router. Los lados poseen percepciones diferentes del enlace."
  },
  {
    "kind": "paragraph",
    "text": "La captura muestra requisición llegando a la appliance y ARP por 192.168.50.10 sin respuesta en el segmento esperado. La corrección es hacer prefijos coherentes o ajustar la rotación/topología. Crear excepciones de firewall no resuelve una discordancia de subred."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 — La allowlist cubre solo una dirección del gateway"
  },
  {
    "kind": "paragraph",
    "text": "Un servicio gestionado de gateway tiene múltiples direcciones de salida. backend solo permite uno de ellos. Llamadas funcionan cuando la conexión usa IP permitida y fallan cuando la plataforma selecciona otra dirección. El síntoma parece aleatorio y aumenta después de escala o mantenimiento."
  },
  {
    "kind": "paragraph",
    "text": "Los logs de backend muestran intentos de orígenes diferentes. La solución es utilizar la lista oficial completa, integración privada o mecanismo de identidad de servicio, según la plataforma. Fixar regla en una dirección observada ocasionalmente no es una estrategia estable."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 — IPv6 roto oculto por Happy Eyeballs"
  },
  {
    "kind": "paragraph",
    "text": "La API publica A y AAAA. Los usuarios modernos suelen acceder porque el cliente intenta IPv6, percibe retraso y utiliza IPv4. Monitores que fuerzan IPv6 fallan. La organización cree que dual stack está saludable porque la experiencia común no presenta biodisponibilidad."
  },
  {
    "kind": "paragraph",
    "text": "Pruebas separadas revelan ausencia de ruta de retorno IPv6 en un firewall. La corrección incluye rota, reglas y monitoreo por familia. Happy Eyeballs mejora experiencia, pero no sustituye la observabilidad explícita."
  },
  {
    "kind": "subhead",
    "text": "Principio operativo"
  },
  {
    "kind": "paragraph",
    "text": "En problemas de conectividad, escriba la cadena completa de direcciones antes y después de DNS, balanceo y NAT. La topología lógica de la aplicación no sustituye el camino efectivo de los paquetes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios de observación",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Los ejercicios siguientes solo deben ejecutarse en máquina de desarrollo o ambiente autorizado. No requieren exploración de redes. El objetivo es observar la propia configuración, calcular prefijos de documentación y comparar familias IP en un servicio controlado."
  },
  {
    "kind": "paragraph",
    "text": "Registra los resultados en una tabla con horario, interfaz, dirección, prefijo, gateway, ruta elegida y respuesta. El valor del laboratorio está en relacionar la previsión teórica con la evidencia, no solo ejecutar órdenes."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Liste direcciones y prefijos de la máquina. Identifique loopback, dirección de LAN, enlace-local y IPv6 cuando esté disponible.",
      "Elija un destino autorizado y utilice la orden de route get para predecir una interfaz y un salto próximo. Compara con captura o traceroute.",
      "Calcule manualmente 192.0.2.77/27 y valide con Python ipaddress. Regístrate red, broadcast y pista de hosts.",
      "Divida 198.51.100.0/24 en cuatro /26 y luego añadir las dos primeras redes.",
      "Resolva A y AAAA de un hostname bajo su control. Prueba separadamente con curl -4 y curl -6.",
      "Observe la tabla ARP/neighbor antes y después de acceder a un host local autorizado. En IPv6, identifica direcciones link-local.",
      "En un laboratorio local, configure un servicio en 127.0.0.1 y compruebe que no es alcanzable por otro host.",
      "Utilice un servidor HTTP local con bind en 127.0.0.1 y después en 0.0.0.0. Compara listeners, manteniendo firewall y autorización adecuados.",
      "Haga una captura filtrada de un intento IPv4 y una IPv6. Compara TTL/Hop Limit, ARP/NDP y cabeceras.",
      "Documente un camino de API ficticio usando los bloques de documentación: consumidor, WAF, gateway y backend, incluyendo rutas y traducciones."
    ]
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
      "IP ofrece encaminamiento de datagramas por direcciones y no garantiza confiabilidad final a fin.",
      "Nombre, dirección y ruta responden a preguntas diferentes; DNS no sustituye el enrutamiento.",
      "IPv4 posee 32 bits; máscaras y CIDR separan prefijo y posiciones dentro de la subred.",
      "El cálculo de subred depende de fronteras binarias, no de la clase histórica de la dirección.",
      "VLSM permite tamaños diferentes; sumarización exige bloques contiguos y propiedad coherente.",
      "/31 y /32 son excepciones importantes a la regla tradicional de hosts menos dos.",
      "Los bloques privados no son globalmente rutinables, pero no constituyen un mecanismo de seguridad.",
      "NAT altera el origen observado y crea estado; cabeceras de proxy solamente son confiables en cadena controlada.",
      "Routeres eligen el prefijo correspondiente más largo; la ruta estándar es sólo el último recurso.",
      "El camino de retorno y la simetría importan para firewalls, NATs y balanceadores stateful.",
      "MTU e ICMP son esenciales; bloquear mensajes necesarios puede crear fallas selectivas.",
      "IPv6 posee 128 bits, cabecera base simplificada, direcciones por alcance y no usa broadcast.",
      "Neighbor Discovery, Router Advertisement, SLAAC y DAD dependen de ICMPv6.",
      "Dual stack exige operación y monitorización de dos familias; Happy Eyeballs puede ocultar una de ellas rota.",
      "En pasarelas, dirección inbound, dirección outbound, DNS privado, SNAT y cabeceras de origen deben ser tratados por separado."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de diagnóstico para APIs"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Qué hostname la aplicación utiliza y qué registros ¿A/AAAA regresa en el ambiente de la puerta?",
      "¿Qué dirección de destino se ha usado realmente?",
      "¿Cuál prefijo está configurado en la interfaz de origen?",
      "¿Cuál ruta vence por longest prefix match y cuál es el siguiente salto?",
      "¿El destino se considera on-link o enviado a la puerta de enlace?",
      "¿Existe ruta de retorno para la dirección de origen después de la traducción?",
      "¿Hay NAT/SNAT y qué dirección observa backend?",
      "¿Los cortafuegos y allowlists cubren todas las direcciones y familias necesarias?",
      "¿Hay superposición entre redes locales, VPNs, VNets o socios?",
      "¿El problema ocurre solamente con una familia IP?",
      "ICMP/ICMPv6 necesario para PMTUD y NDP está permitido?",
      "¿El fallo depende del tamaño del paquete, certificado o respuesta?",
      "¿El private endpoint posee DNS privado correcto y vínculo con la red de la gateway?",
      "¿X-Forwarded-For es sobrescrito por un proxy confiable o puede ser enviado por el consumidor?",
      "Logs, captura y rutas fueron recolectados en el mismo horario y en los dos sentidos?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ejercicios de repaso",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Difierencie nombre, dirección, interfaz, prefijo y ruta.",
      "Convierta el último octeto de la máscara /27 para binario y decimal.",
      "Calcule la red, broadcast y la pista de hosts de 10.20.30.150/25.",
      "¿Cuántos direcciones existen en /22 y cuántas subredes /26 caben en él?",
      "Explique por qué clases A, B y C no deben utilizarse para inferir la máscara moderna.",
      "Muestra como 10.40.0.0/24 a 10.40.3.0/24 se pueden sumar.",
      "¿Por qué una superposición RFC 1918 puede romper una VPN?",
      "Explique las excepciones de /31 y /32.",
      "Difierencie 10.0.0.0/8, 100.64.0.0/10 y 127.0.0.0/8.",
      "¿Por qué la dirección privada no equivale a la red segura?",
      "Explique longest prefix match con ruta estándar, /8, /16 y /24.",
      "¿Cómo enrutamiento asimétrico afecta firewalls stateful?",
      "Compara fragmentación IPv4 y IPv6.",
      "Convierta 2001:0db8:0000:0000:0000:0000:0000:0025 para forma canónica.",
      "Diferencie global unicast, ULA y link-local IPv6.",
      "¿Qué funciones NDP ofrece además de resolver vecinos?",
      "¿Por qué DHCPv6 no sustituye necesariamente Router Advertisement?",
      "¿Qué Happy Eyeballs resuelve y qué puede ocultar?",
      "¿Por qué un private endpoint inbound no garantiza el acceso privado de la puerta a backend?",
      "¿Cómo validar con seguridad el IP original del consumidor detrás de proxies?"
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
      "Un enlace resuelve api-interna.exemplo a 10.50.20.10, pero route get apunta a Internet. Describa hipótesis y correcciones.",
      "La API funciona por 198.51.100.25, pero falla por el hostname. He leído las capas y pruebas necesarias.",
      "Las llamadas pequeñas funcionan, pero las respuestas con certificado o cabeceras mayores expiran en VPN. Proponga investigación de MTU.",
      "Un socio envía requisiciones por NAT y todos los usuarios aparecen con el mismo IP. Discuta impactos en rate limiting y auditoría.",
      "Una API dual stack funciona para navegadores, pero el monitor IPv6 falla. Muestra como Happy Eyeballs influencia la percepción."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Respuestas orientativas"
  },
  {
    "kind": "paragraph",
    "text": "Los cálculos deben demostrar la frontera binaria. Para 10.20.30.150/25, la máscara es 255.255.255.128, el bloque comienza en 128, la red es 10.20.30.128, el broadcast es 10.20.30.255 y la franja tradicional va de .129 a .254. Un /22 contiene 1.024 direcciones y se puede dividir en dieciséis /26."
  },
  {
    "kind": "paragraph",
    "text": "En la sumarización, 10.40.0.0/24 a 10.40.3.0/24 comparten los primeros 22 bits y forman 10.40.0.0/22. Longest prefix match selecciona el mayor prefijo correspondiente, independientemente de una ruta estándar también coincide."
  },
  {
    "kind": "paragraph",
    "text": "En los escenarios, respuestas fuertes separan DNS, ruta, política y aplicación. Funcionar por IP no valida hostname, SNI o certificado. Problemas por tamaño sugieren MTU/PMTUD, pero necesitan captura e ICMP. IP original en encabezados debe ser construido por proxies confiables, nunca aceptado directamente del consumidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glosario",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabla 9 - Términos esenciales del capítulo.",
    "headers": [
      "Término",
      "Definición resumida"
    ],
    "rows": [
      [
        "A record",
        "Registro DNS que asocia un nombre con una dirección IPv4."
      ],
      [
        "AAAA record",
        "Registro DNS que asocia un nombre con una dirección IPv6."
      ],
      [
        "Anycast",
        "La misma dirección anunciada o asignada en múltiples puntos; el enrutamiento elige uno de ellos."
      ],
      [
        "Broadcast",
        "Entrega IPv4 a todos los nodos de un dominio definido; no existe en IPv6."
      ],
      [
        "CIDR",
        "Notación y estrategia classless basada en la longitud del prefijo."
      ],
      [
        "DAD",
        "Duplicate Address Detection de IPv6."
      ],
      [
        "Default route",
        "Ruta /0 utilizada cuando no coincide ninguna ruta más específica."
      ],
      [
        "Dual stack",
        "Operación simultánea de IPv4 e IPv6."
      ],
      [
        "Gateway predeterminado",
        "Siguiente salto para destinos sin una ruta más específica."
      ],
      [
        "Global unicast",
        "Dirección IPv6 unicast con posible alcance global según el enrutamiento."
      ],
      [
        "ICMP",
        "Protocolo de mensajes de control y error asociado a IP."
      ],
      [
        "Interfaz",
        "Punto lógico o físico al que se asocian direcciones y rutas."
      ],
      [
        "Link-local",
        "Dirección válida únicamente en el enlace local."
      ],
      [
        "Longest prefix match",
        "Selección de la ruta coincidente más específica."
      ],
      [
        "MTU",
        "La unidad más grande que un enlace transporta sin fragmentación."
      ],
      [
        "NAT/PAT",
        "Traducción de direcciones y, con frecuencia, puertos."
      ],
      [
        "NDP",
        "Neighbor Discovery Protocol de IPv6."
      ],
      [
        "Prefijo",
        "Conjunto inicial de bits que identifica una red."
      ],
      [
        "Private endpoint",
        "Interfaz o dirección privada que expone un servicio administrado dentro de una red virtual."
      ],
      [
        "RA",
        "Router Advertisement utilizado para anunciar un router y parámetros IPv6."
      ],
      [
        "SLAAC",
        "Autoconfiguración stateless de una dirección IPv6."
      ],
      [
        "ULA",
        "Unique Local Address de IPv6 destinada al uso interno."
      ],
      [
        "VLSM",
        "Uso de máscaras de longitud variable en el mismo plan de direccionamiento."
      ],
      [
        "Zone identifier",
        "Identificador local de interfaz usado con direcciones IPv6 de alcance limitado."
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
    "kind": "paragraph",
    "text": "RFC 791 - Internet Protocol: https://www.rfc-editor.org/rfc/rfc791"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4632 - Classless Interdomain Routing (CIDR): https://www.rfc-editor.org/rfc/rfc4632"
  },
  {
    "kind": "paragraph",
    "text": "RFC 1918 - Address Allocation for Private Internets: https://www.rfc-editor.org/rfc/rfc1918"
  },
  {
    "kind": "paragraph",
    "text": "RFC 3021 - Using 31-Bit Prefixes on IPv4 Point-to-Point Links: https://www.rfc-editor.org/rfc/rfc3021"
  },
  {
    "kind": "paragraph",
    "text": "RFC 3927 - Dynamic Configuration of IPv4 Link-Local Addresses: https://www.rfc-editor.org/rfc/rfc3927"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5737 - IPv4 Address Blocks Reserved for Documentation: https://www.rfc-editor.org/rfc/rfc5737"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6598 - Shared Address Space: https://www.rfc-editor.org/rfc/rfc6598"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6890 - Special-Purpose IP Address Registries: https://www.rfc-editor.org/rfc/rfc6890"
  },
  {
    "kind": "paragraph",
    "text": "IANA - IPv4 Special-Purpose Address Registry: https://www.iana.org/assignments/iana-ipv4-special-registry/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8200 - Internet Protocol, Version 6 (IPv6) Specification: https://www.rfc-editor.org/rfc/rfc8200"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4291 - IPv6 Addressing Architecture: https://www.rfc-editor.org/rfc/rfc4291"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5952 - IPv6 Text Representation: https://www.rfc-editor.org/rfc/rfc5952"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4193 - Unique Local IPv6 Unicast Addresses: https://www.rfc-editor.org/rfc/rfc4193"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4861 - Neighbor Discovery for IPv6: https://www.rfc-editor.org/rfc/rfc4861"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4862 - IPv6 Stateless Address Autoconfiguration: https://www.rfc-editor.org/rfc/rfc4862"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6164 - IPv6 Prefix Length for Inter-Router Links: https://www.rfc-editor.org/rfc/rfc6164"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8415 - DHCP for IPv6: https://www.rfc-editor.org/rfc/rfc8415"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8201 - Path MTU Discovery for IPv6: https://www.rfc-editor.org/rfc/rfc8201"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8305 - Happy Eyeballs Version 2: https://www.rfc-editor.org/rfc/rfc8305"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6146 - Stateful NAT64: https://www.rfc-editor.org/rfc/rfc6146"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6147 - DNS64: https://www.rfc-editor.org/rfc/rfc6147"
  },
  {
    "kind": "paragraph",
    "text": "IANA - IPv6 Special-Purpose Address Registry: https://www.iana.org/assignments/iana-ipv6-special-registry/"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Azure API Management virtual network concepts: https://learn.microsoft.com/en-us/azure/api-management/virtual-network-concepts"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Set up inbound private endpoint for Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/private-endpoint"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Deploy API Management in an internal virtual network: https://learn.microsoft.com/en-us/azure/api-management/api-management-using-with-internal-vnet"
  },
  {
    "kind": "subhead",
    "text": "Orden de lectura recomendado"
  },
  {
    "kind": "paragraph",
    "text": "Lea RFC 4632 y RFC 1918 para consolidar IPv4 corporativo. A continuación use RFC 8200, RFC 4291 y RFC 5952 como base IPv6. Después avance para NDP/SLAAC y consulte los registros IANA siempre que encuentre un bloque especial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cierre",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "Enderezamiento y enrutamiento forman la estructura que permite al transporte alcanzar procesos. El prefijo determina pertenencia, la tabla de rutas elige el siguiente salto y traducciones pueden alterar la identidad observada. IPv4 y IPv6 utilizan principios comunes, pero difieren en formato, alcances, autoconfiguración y tratamiento de fragmentación."
  },
  {
    "kind": "paragraph",
    "text": "En el próximo capítulo, el estudio avanzará hacia DNS, NAT, proxies y balanceadores de carga. Estos componentes transforman nombres y caminos en arquitecturas de alta disponibilidad y explican por qué una única URL puede representar decenas de direcciones, regiones y instancias."
  }
];
