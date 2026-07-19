import { GlossaryEntry } from './glossary.model';

/**
 * Shared glossary of acronyms and English technical terms used across the
 * Portuguese and Spanish Learn articles.
 *
 * These definitions complement each article's own "Glossário" / "Glosario"
 * table: entries declared inside an article always win, and these are only
 * used to fill the gaps so that every acronym and English word rendered in a
 * localized article can show its meaning in a popover.
 *
 * `aliases` exist because the matcher compares whole words, so plurals and
 * common spelling variants need to be listed explicitly.
 */
interface LocalizedTechnicalTerm {
  term: string;
  aliases?: readonly string[];
  pt: string;
  es: string;
}

const TECHNICAL_TERMS: readonly LocalizedTechnicalTerm[] = [
  // ---------------------------------------------------------------- Web / API
  {
    term: 'API',
    aliases: ['APIs'],
    pt: 'Application Programming Interface: contrato que permite que sistemas diferentes troquem dados e funcionalidades de forma programática.',
    es: 'Application Programming Interface: contrato que permite que sistemas distintos intercambien datos y funcionalidades de forma programática.'
  },
  {
    term: 'API Gateway',
    aliases: ['API Gateways'],
    pt: 'Componente que fica na frente das APIs e centraliza roteamento, autenticação, políticas de segurança, limites de uso e observabilidade.',
    es: 'Componente que se sitúa delante de las APIs y centraliza enrutamiento, autenticación, políticas de seguridad, límites de uso y observabilidad.'
  },
  {
    term: 'gateway',
    aliases: ['gateways'],
    pt: 'Ponto de entrada que recebe as chamadas dos clientes, aplica políticas e encaminha o tráfego para os serviços internos.',
    es: 'Punto de entrada que recibe las llamadas de los clientes, aplica políticas y reenvía el tráfico hacia los servicios internos.'
  },
  {
    term: 'APIM',
    pt: 'API Management: plataforma de gestão do ciclo de vida de APIs, incluindo publicação, versionamento, portal do desenvolvedor e políticas.',
    es: 'API Management: plataforma de gestión del ciclo de vida de las APIs, incluyendo publicación, versionado, portal del desarrollador y políticas.'
  },
  {
    term: 'REST',
    aliases: ['RESTful'],
    pt: 'Representational State Transfer: estilo arquitetural que usa recursos identificados por URI, verbos HTTP e comunicação sem estado.',
    es: 'Representational State Transfer: estilo arquitectónico que usa recursos identificados por URI, verbos HTTP y comunicación sin estado.'
  },
  {
    term: 'RMM',
    pt: 'Richardson Maturity Model: modelo que classifica APIs em níveis 0 a 3 conforme o uso de recursos, verbos HTTP e hipermídia.',
    es: 'Richardson Maturity Model: modelo que clasifica APIs en niveles 0 a 3 según el uso de recursos, verbos HTTP e hipermedia.'
  },
  {
    term: 'HATEOAS',
    pt: 'Hypermedia as the Engine of Application State: princípio REST em que a resposta traz links indicando as próximas transições possíveis.',
    es: 'Hypermedia as the Engine of Application State: principio REST en el que la respuesta trae enlaces indicando las siguientes transiciones posibles.'
  },
  {
    term: 'SOAP',
    pt: 'Simple Object Access Protocol: protocolo de mensagens em XML, anterior ao REST, com envelope próprio e contratos descritos em WSDL.',
    es: 'Simple Object Access Protocol: protocolo de mensajes en XML, anterior a REST, con sobre propio y contratos descritos en WSDL.'
  },
  {
    term: 'RPC',
    pt: 'Remote Procedure Call: modelo em que o cliente chama uma função remota como se fosse local, focando em operações e não em recursos.',
    es: 'Remote Procedure Call: modelo en el que el cliente llama a una función remota como si fuera local, centrado en operaciones y no en recursos.'
  },
  {
    term: 'gRPC',
    pt: 'Framework de RPC da Google sobre HTTP/2, com contratos em Protocol Buffers e suporte nativo a streaming bidirecional.',
    es: 'Framework de RPC de Google sobre HTTP/2, con contratos en Protocol Buffers y soporte nativo de streaming bidireccional.'
  },
  {
    term: 'GraphQL',
    pt: 'Linguagem de consulta para APIs em que o cliente declara exatamente quais campos quer receber, normalmente por um único endpoint.',
    es: 'Lenguaje de consulta para APIs en el que el cliente declara exactamente qué campos quiere recibir, normalmente por un único endpoint.'
  },
  {
    term: 'WebSocket',
    aliases: ['WebSockets'],
    pt: 'Protocolo que transforma uma conexão HTTP em um canal full-duplex persistente, usado para comunicação em tempo real.',
    es: 'Protocolo que convierte una conexión HTTP en un canal full-duplex persistente, usado para comunicación en tiempo real.'
  },
  {
    term: 'OpenAPI',
    pt: 'Especificação padrão para descrever APIs HTTP em YAML ou JSON, servindo de contrato para documentação, validação e geração de código.',
    es: 'Especificación estándar para describir APIs HTTP en YAML o JSON, que sirve de contrato para documentación, validación y generación de código.'
  },
  {
    term: 'Swagger',
    pt: 'Conjunto de ferramentas em torno do OpenAPI, incluindo o Swagger UI que renderiza a especificação como documentação navegável.',
    es: 'Conjunto de herramientas alrededor de OpenAPI, incluyendo Swagger UI, que renderiza la especificación como documentación navegable.'
  },
  {
    term: 'CRUD',
    pt: 'Create, Read, Update, Delete: as quatro operações básicas sobre um recurso, mapeadas em REST para POST, GET, PUT/PATCH e DELETE.',
    es: 'Create, Read, Update, Delete: las cuatro operaciones básicas sobre un recurso, mapeadas en REST a POST, GET, PUT/PATCH y DELETE.'
  },
  {
    term: 'BFF',
    pt: 'Backend for Frontend: camada de backend dedicada a um tipo de cliente, que agrega e adapta chamadas a várias APIs internas.',
    es: 'Backend for Frontend: capa de backend dedicada a un tipo de cliente, que agrega y adapta llamadas a varias APIs internas.'
  },
  {
    term: 'SPA',
    pt: 'Single Page Application: aplicação web que carrega uma única página e atualiza o conteúdo via JavaScript e chamadas de API.',
    es: 'Single Page Application: aplicación web que carga una única página y actualiza el contenido mediante JavaScript y llamadas de API.'
  },
  {
    term: 'SDK',
    pt: 'Software Development Kit: conjunto de bibliotecas e ferramentas que facilita o consumo de uma API em determinada linguagem.',
    es: 'Software Development Kit: conjunto de bibliotecas y herramientas que facilita el consumo de una API en un lenguaje determinado.'
  },
  {
    term: 'webhook',
    aliases: ['webhooks'],
    pt: 'Chamada HTTP que o servidor envia para uma URL do cliente quando um evento ocorre, invertendo o sentido usual da integração.',
    es: 'Llamada HTTP que el servidor envía a una URL del cliente cuando ocurre un evento, invirtiendo el sentido habitual de la integración.'
  },
  {
    term: 'callback',
    aliases: ['callbacks'],
    pt: 'Endereço ou função chamado de volta ao final de um fluxo, como a URL para onde o provedor redireciona após a autenticação.',
    es: 'Dirección o función a la que se llama al final de un flujo, como la URL a la que el proveedor redirige tras la autenticación.'
  },

  // ------------------------------------------------------------------- HTTP
  {
    term: 'HTTP',
    pt: 'HyperText Transfer Protocol: protocolo de aplicação que define métodos, cabeçalhos e códigos de status para requisições e respostas na web.',
    es: 'HyperText Transfer Protocol: protocolo de aplicación que define métodos, cabeceras y códigos de estado para peticiones y respuestas en la web.'
  },
  {
    term: 'HTTPS',
    pt: 'HTTP transportado dentro de uma conexão TLS, garantindo confidencialidade, integridade e autenticação do servidor.',
    es: 'HTTP transportado dentro de una conexión TLS, garantizando confidencialidad, integridad y autenticación del servidor.'
  },
  {
    term: 'QUIC',
    pt: 'Protocolo de transporte sobre UDP que integra criptografia e multiplexação, servindo de base para o HTTP/3.',
    es: 'Protocolo de transporte sobre UDP que integra cifrado y multiplexación, y que sirve de base para HTTP/3.'
  },
  {
    term: 'ALPN',
    pt: 'Application-Layer Protocol Negotiation: extensão TLS que permite cliente e servidor acordarem o protocolo de aplicação durante o handshake.',
    es: 'Application-Layer Protocol Negotiation: extensión TLS que permite a cliente y servidor acordar el protocolo de aplicación durante el handshake.'
  },
  {
    term: 'HPACK',
    pt: 'Algoritmo de compressão de cabeçalhos do HTTP/2, baseado em tabelas estática e dinâmica de entradas já enviadas.',
    es: 'Algoritmo de compresión de cabeceras de HTTP/2, basado en tablas estática y dinámica de entradas ya enviadas.'
  },
  {
    term: 'QPACK',
    pt: 'Algoritmo de compressão de cabeçalhos do HTTP/3, adaptado ao QUIC para evitar bloqueio entre streams independentes.',
    es: 'Algoritmo de compresión de cabeceras de HTTP/3, adaptado a QUIC para evitar el bloqueo entre streams independientes.'
  },
  {
    term: 'GET',
    pt: 'Método HTTP de leitura: recupera a representação de um recurso sem alterar seu estado, sendo seguro e idempotente.',
    es: 'Método HTTP de lectura: recupera la representación de un recurso sin alterar su estado, siendo seguro e idempotente.'
  },
  {
    term: 'POST',
    pt: 'Método HTTP usado para criar recursos ou submeter dados de processamento; não é seguro nem idempotente.',
    es: 'Método HTTP usado para crear recursos o enviar datos de procesamiento; no es seguro ni idempotente.'
  },
  {
    term: 'PUT',
    pt: 'Método HTTP que substitui integralmente a representação de um recurso; é idempotente, pois repetir gera o mesmo estado.',
    es: 'Método HTTP que sustituye íntegramente la representación de un recurso; es idempotente, porque repetirlo genera el mismo estado.'
  },
  {
    term: 'PATCH',
    pt: 'Método HTTP que aplica uma modificação parcial em um recurso, enviando apenas os campos que devem mudar.',
    es: 'Método HTTP que aplica una modificación parcial a un recurso, enviando solo los campos que deben cambiar.'
  },
  {
    term: 'DELETE',
    pt: 'Método HTTP que remove o recurso identificado pela URI; é idempotente, pois repetir mantém o recurso ausente.',
    es: 'Método HTTP que elimina el recurso identificado por la URI; es idempotente, porque repetirlo mantiene el recurso ausente.'
  },
  {
    term: 'HEAD',
    pt: 'Método HTTP idêntico ao GET, mas que retorna apenas os cabeçalhos da resposta, sem o corpo.',
    es: 'Método HTTP idéntico a GET, pero que devuelve solo las cabeceras de la respuesta, sin el cuerpo.'
  },
  {
    term: 'OPTIONS',
    pt: 'Método HTTP que consulta as capacidades disponíveis para um recurso; usado pelo navegador na verificação prévia de CORS.',
    es: 'Método HTTP que consulta las capacidades disponibles para un recurso; usado por el navegador en la verificación previa de CORS.'
  },
  {
    term: 'header',
    aliases: ['headers'],
    pt: 'Cabeçalho HTTP: par nome/valor que transporta metadados da requisição ou da resposta, como tipo de conteúdo ou credenciais.',
    es: 'Cabecera HTTP: par nombre/valor que transporta metadatos de la petición o de la respuesta, como tipo de contenido o credenciales.'
  },
  {
    term: 'trailer',
    aliases: ['trailers'],
    pt: 'Cabeçalho enviado depois do corpo da mensagem, útil quando o valor só é conhecido ao final de uma resposta em streaming.',
    es: 'Cabecera enviada después del cuerpo del mensaje, útil cuando el valor solo se conoce al final de una respuesta en streaming.'
  },
  {
    term: 'payload',
    aliases: ['payloads'],
    pt: 'Carga útil da mensagem: os dados efetivamente transportados, separados dos cabeçalhos e metadados de protocolo.',
    es: 'Carga útil del mensaje: los datos realmente transportados, separados de las cabeceras y metadatos de protocolo.'
  },
  {
    term: 'body',
    pt: 'Corpo da mensagem HTTP: a parte que carrega os dados enviados ou devolvidos, logo após os cabeçalhos.',
    es: 'Cuerpo del mensaje HTTP: la parte que transporta los datos enviados o devueltos, justo después de las cabeceras.'
  },
  {
    term: 'request',
    aliases: ['requests'],
    pt: 'Requisição HTTP: mensagem enviada pelo cliente contendo método, caminho, cabeçalhos e, opcionalmente, um corpo.',
    es: 'Petición HTTP: mensaje enviado por el cliente que contiene método, ruta, cabeceras y, opcionalmente, un cuerpo.'
  },
  {
    term: 'response',
    aliases: ['responses'],
    pt: 'Resposta HTTP: mensagem devolvida pelo servidor, com código de status, cabeçalhos e, normalmente, um corpo.',
    es: 'Respuesta HTTP: mensaje devuelto por el servidor, con código de estado, cabeceras y, normalmente, un cuerpo.'
  },
  {
    term: 'endpoint',
    aliases: ['endpoints'],
    pt: 'Endereço específico exposto por uma API, formado pela combinação de host, caminho e método que atende a uma operação.',
    es: 'Dirección específica expuesta por una API, formada por la combinación de host, ruta y método que atiende una operación.'
  },
  {
    term: 'query string',
    pt: 'Trecho da URL após o sinal de interrogação, que carrega parâmetros no formato nome=valor separados por &.',
    es: 'Parte de la URL después del signo de interrogación, que transporta parámetros con el formato nombre=valor separados por &.'
  },
  {
    term: 'status code',
    aliases: ['status codes'],
    pt: 'Código numérico de três dígitos que resume o resultado da requisição, agrupado em famílias 1xx a 5xx.',
    es: 'Código numérico de tres dígitos que resume el resultado de la petición, agrupado en familias 1xx a 5xx.'
  },
  {
    term: 'ETag',
    aliases: ['ETags'],
    pt: 'Identificador de versão de uma representação, usado em cache e em atualizações condicionais para detectar mudanças.',
    es: 'Identificador de versión de una representación, usado en caché y en actualizaciones condicionales para detectar cambios.'
  },
  {
    term: 'chunk',
    aliases: ['chunks', 'chunked'],
    pt: 'Bloco em que a mensagem é dividida na codificação por partes, permitindo enviar dados antes de conhecer o tamanho total.',
    es: 'Bloque en el que se divide el mensaje en la codificación por partes, permitiendo enviar datos antes de conocer el tamaño total.'
  },
  {
    term: 'keep-alive',
    pt: 'Mecanismo que mantém a conexão TCP aberta para reutilização em requisições seguintes, evitando novos handshakes.',
    es: 'Mecanismo que mantiene la conexión TCP abierta para reutilizarla en peticiones siguientes, evitando nuevos handshakes.'
  },
  {
    term: 'pipelining',
    pt: 'Envio de várias requisições em sequência sem aguardar cada resposta; no HTTP/1.1 sofre com bloqueio de cabeça de fila.',
    es: 'Envío de varias peticiones en secuencia sin esperar cada respuesta; en HTTP/1.1 sufre bloqueo de cabeza de línea.'
  },
  {
    term: 'multiplexing',
    aliases: ['multiplexação', 'multiplexación'],
    pt: 'Transporte simultâneo de várias trocas independentes sobre uma mesma conexão, identificadas por streams.',
    es: 'Transporte simultáneo de varios intercambios independientes sobre una misma conexión, identificados por streams.'
  },
  {
    term: 'stream',
    aliases: ['streams', 'streaming'],
    pt: 'Fluxo contínuo de dados; no HTTP/2 e HTTP/3 é também a unidade lógica que identifica cada troca dentro da conexão.',
    es: 'Flujo continuo de datos; en HTTP/2 y HTTP/3 es también la unidad lógica que identifica cada intercambio dentro de la conexión.'
  },
  {
    term: 'CORS',
    pt: 'Cross-Origin Resource Sharing: mecanismo de cabeçalhos que autoriza um navegador a chamar uma API hospedada em outra origem.',
    es: 'Cross-Origin Resource Sharing: mecanismo de cabeceras que autoriza a un navegador a llamar a una API alojada en otro origen.'
  },
  {
    term: 'MIME',
    pt: 'Multipurpose Internet Mail Extensions: padrão dos tipos de mídia, como application/json, que identificam o formato do conteúdo.',
    es: 'Multipurpose Internet Mail Extensions: estándar de los tipos de medio, como application/json, que identifican el formato del contenido.'
  },

  // ------------------------------------------------------------- Redes / Rede
  {
    term: 'TCP',
    pt: 'Transmission Control Protocol: protocolo de transporte orientado a conexão que entrega um fluxo de bytes ordenado e confiável.',
    es: 'Transmission Control Protocol: protocolo de transporte orientado a conexión que entrega un flujo de bytes ordenado y fiable.'
  },
  {
    term: 'UDP',
    pt: 'User Datagram Protocol: protocolo de transporte sem conexão, que envia datagramas independentes sem garantir entrega ou ordem.',
    es: 'User Datagram Protocol: protocolo de transporte sin conexión, que envía datagramas independientes sin garantizar entrega ni orden.'
  },
  {
    term: 'IP',
    pt: 'Internet Protocol: protocolo de rede responsável por endereçar e encaminhar datagramas entre redes interconectadas.',
    es: 'Internet Protocol: protocolo de red responsable de direccionar y encaminar datagramas entre redes interconectadas.'
  },
  {
    term: 'IPv4',
    pt: 'Versão 4 do Internet Protocol, com endereços de 32 bits escritos em notação decimal pontuada, como 192.168.0.1.',
    es: 'Versión 4 de Internet Protocol, con direcciones de 32 bits escritas en notación decimal con puntos, como 192.168.0.1.'
  },
  {
    term: 'IPv6',
    pt: 'Versão 6 do Internet Protocol, com endereços de 128 bits em notação hexadecimal, criada para superar o esgotamento do IPv4.',
    es: 'Versión 6 de Internet Protocol, con direcciones de 128 bits en notación hexadecimal, creada para superar el agotamiento de IPv4.'
  },
  {
    term: 'CIDR',
    pt: 'Classless Inter-Domain Routing: notação com prefixo (como /24) que define quantos bits do endereço identificam a rede.',
    es: 'Classless Inter-Domain Routing: notación con prefijo (como /24) que define cuántos bits de la dirección identifican la red.'
  },
  {
    term: 'VLSM',
    pt: 'Variable Length Subnet Masking: prática de dividir uma rede em sub-redes de tamanhos diferentes conforme a necessidade real.',
    es: 'Variable Length Subnet Masking: práctica de dividir una red en subredes de tamaños distintos según la necesidad real.'
  },
  {
    term: 'DNS',
    pt: 'Domain Name System: sistema distribuído que traduz nomes de domínio em endereços IP e outros registros.',
    es: 'Domain Name System: sistema distribuido que traduce nombres de dominio en direcciones IP y otros registros.'
  },
  {
    term: 'DNSSEC',
    pt: 'Extensões de segurança do DNS que assinam digitalmente os registros, permitindo detectar respostas forjadas.',
    es: 'Extensiones de seguridad de DNS que firman digitalmente los registros, permitiendo detectar respuestas falsificadas.'
  },
  {
    term: 'NAT',
    pt: 'Network Address Translation: tradução de endereços IP na passagem entre redes, geralmente entre a rede privada e a internet.',
    es: 'Network Address Translation: traducción de direcciones IP al pasar entre redes, normalmente entre la red privada e internet.'
  },
  {
    term: 'SNAT',
    pt: 'Source NAT: reescrita do endereço de origem na saída, fazendo várias máquinas internas compartilharem um IP público.',
    es: 'Source NAT: reescritura de la dirección de origen en la salida, haciendo que varias máquinas internas compartan una IP pública.'
  },
  {
    term: 'DNAT',
    pt: 'Destination NAT: reescrita do endereço de destino na entrada, publicando um serviço interno através de um IP externo.',
    es: 'Destination NAT: reescritura de la dirección de destino en la entrada, publicando un servicio interno a través de una IP externa.'
  },
  {
    term: 'MTU',
    pt: 'Maximum Transmission Unit: maior tamanho de pacote que um enlace transporta sem fragmentação.',
    es: 'Maximum Transmission Unit: mayor tamaño de paquete que un enlace transporta sin fragmentación.'
  },
  {
    term: 'RTT',
    pt: 'Round-Trip Time: tempo de ida e volta de um pacote entre cliente e servidor, base para timeouts e cálculo de latência.',
    es: 'Round-Trip Time: tiempo de ida y vuelta de un paquete entre cliente y servidor, base para timeouts y cálculo de latencia.'
  },
  {
    term: 'TTL',
    pt: 'Time To Live: prazo de validade de um dado, como o tempo de cache de um registro DNS ou o limite de saltos de um pacote IP.',
    es: 'Time To Live: plazo de validez de un dato, como el tiempo de caché de un registro DNS o el límite de saltos de un paquete IP.'
  },
  {
    term: 'ACK',
    aliases: ['ACKs'],
    pt: 'Acknowledgement: confirmação enviada pelo receptor TCP informando até que ponto os dados foram recebidos com sucesso.',
    es: 'Acknowledgement: confirmación enviada por el receptor TCP indicando hasta qué punto se recibieron correctamente los datos.'
  },
  {
    term: 'SYN',
    pt: 'Flag TCP que inicia uma conexão e sincroniza os números de sequência entre as duas pontas.',
    es: 'Flag TCP que inicia una conexión y sincroniza los números de secuencia entre ambos extremos.'
  },
  {
    term: 'FIN',
    pt: 'Flag TCP que sinaliza o encerramento ordenado do envio de dados por uma das pontas da conexão.',
    es: 'Flag TCP que señala el cierre ordenado del envío de datos por uno de los extremos de la conexión.'
  },
  {
    term: 'RST',
    pt: 'Flag TCP que aborta a conexão imediatamente, normalmente indicando erro ou porta fechada.',
    es: 'Flag TCP que aborta la conexión de inmediato, normalmente indicando error o puerto cerrado.'
  },
  {
    term: 'socket',
    aliases: ['sockets'],
    pt: 'Extremidade de comunicação identificada pela combinação de endereço IP e porta, usada pelas aplicações para trocar dados.',
    es: 'Extremo de comunicación identificado por la combinación de dirección IP y puerto, usado por las aplicaciones para intercambiar datos.'
  },
  {
    term: 'handshake',
    aliases: ['handshakes'],
    pt: 'Negociação inicial entre duas partes antes da troca de dados, como o three-way handshake do TCP ou o handshake TLS.',
    es: 'Negociación inicial entre dos partes antes del intercambio de datos, como el three-way handshake de TCP o el handshake TLS.'
  },
  {
    term: 'timeout',
    aliases: ['timeouts'],
    pt: 'Tempo máximo de espera por uma resposta; ao ser excedido, a operação é abortada para liberar recursos.',
    es: 'Tiempo máximo de espera de una respuesta; al superarse, la operación se aborta para liberar recursos.'
  },
  {
    term: 'hop',
    aliases: ['hops'],
    pt: 'Cada equipamento intermediário, como um roteador ou proxy, por onde o pacote passa até chegar ao destino.',
    es: 'Cada equipo intermedio, como un router o proxy, por el que pasa el paquete hasta llegar al destino.'
  },
  {
    term: 'upstream',
    pt: 'Sentido do serviço que recebe a chamada encaminhada; para o gateway, é o backend que está atrás dele.',
    es: 'Sentido del servicio que recibe la llamada reenviada; para el gateway, es el backend que está detrás de él.'
  },
  {
    term: 'downstream',
    pt: 'Sentido do cliente que originou a chamada, oposto ao upstream na cadeia de encaminhamento.',
    es: 'Sentido del cliente que originó la llamada, opuesto al upstream en la cadena de reenvío.'
  },
  {
    term: 'proxy',
    aliases: ['proxies'],
    pt: 'Intermediário que recebe requisições e as repassa em nome de outra parte, podendo aplicar cache, filtros e políticas.',
    es: 'Intermediario que recibe peticiones y las reenvía en nombre de otra parte, pudiendo aplicar caché, filtros y políticas.'
  },
  {
    term: 'load balancer',
    aliases: ['load balancers', 'load balancing'],
    pt: 'Balanceador de carga: componente que distribui as chamadas entre várias instâncias de backend segundo um algoritmo e health checks.',
    es: 'Balanceador de carga: componente que distribuye las llamadas entre varias instancias de backend según un algoritmo y health checks.'
  },
  {
    term: 'health check',
    aliases: ['health checks'],
    pt: 'Verificação periódica de saúde de uma instância; se falha, o balanceador para de enviar tráfego para ela.',
    es: 'Verificación periódica de salud de una instancia; si falla, el balanceador deja de enviarle tráfico.'
  },
  {
    term: 'failover',
    pt: 'Troca automática para um recurso ou site alternativo quando o principal falha, preservando a disponibilidade.',
    es: 'Conmutación automática a un recurso o sitio alternativo cuando el principal falla, preservando la disponibilidad.'
  },
  {
    term: 'pooling',
    pt: 'Reutilização de um conjunto pré-criado de conexões ou threads, evitando o custo de abrir e fechar recursos a cada chamada.',
    es: 'Reutilización de un conjunto ya creado de conexiones o hilos, evitando el coste de abrir y cerrar recursos en cada llamada.'
  },
  {
    term: 'polling',
    pt: 'Consulta repetida do cliente ao servidor para saber se há novidades, em contraste com notificações enviadas pelo servidor.',
    es: 'Consulta repetida del cliente al servidor para saber si hay novedades, en contraste con notificaciones enviadas por el servidor.'
  },
  {
    term: 'buffer',
    aliases: ['buffers'],
    pt: 'Área de memória que armazena dados temporariamente entre produtor e consumidor, absorvendo diferenças de velocidade.',
    es: 'Área de memoria que almacena datos temporalmente entre productor y consumidor, absorbiendo diferencias de velocidad.'
  },
  {
    term: 'backpressure',
    pt: 'Sinalização do receptor para que o emissor reduza o ritmo de envio quando não consegue processar os dados na velocidade recebida.',
    es: 'Señalización del receptor para que el emisor reduzca el ritmo de envío cuando no puede procesar los datos a la velocidad recibida.'
  },
  {
    term: 'CDN',
    pt: 'Content Delivery Network: rede distribuída de servidores que entrega conteúdo a partir do ponto de presença mais próximo do usuário.',
    es: 'Content Delivery Network: red distribuida de servidores que entrega contenido desde el punto de presencia más cercano al usuario.'
  },
  {
    term: 'VPN',
    pt: 'Virtual Private Network: túnel criptografado que conecta redes ou usuários remotos como se estivessem na mesma rede privada.',
    es: 'Virtual Private Network: túnel cifrado que conecta redes o usuarios remotos como si estuvieran en la misma red privada.'
  },
  {
    term: 'VLAN',
    aliases: ['VLANs'],
    pt: 'Virtual LAN: segmentação lógica de uma rede física em domínios de difusão independentes.',
    es: 'Virtual LAN: segmentación lógica de una red física en dominios de difusión independientes.'
  },
  {
    term: 'AAAA',
    pt: 'Tipo de registro DNS que associa um nome a um endereço IPv6, equivalente ao registro A usado no IPv4.',
    es: 'Tipo de registro DNS que asocia un nombre a una dirección IPv6, equivalente al registro A usado en IPv4.'
  },
  {
    term: 'CNAME',
    pt: 'Registro DNS que define um nome como apelido de outro, delegando a resolução ao nome canônico.',
    es: 'Registro DNS que define un nombre como alias de otro, delegando la resolución al nombre canónico.'
  },
  {
    term: 'IANA',
    pt: 'Internet Assigned Numbers Authority: organização que administra registros globais como portas, parâmetros de protocolo e blocos de endereços.',
    es: 'Internet Assigned Numbers Authority: organización que administra registros globales como puertos, parámetros de protocolo y bloques de direcciones.'
  },

  // ------------------------------------------------------- Segurança e cripto
  {
    term: 'TLS',
    pt: 'Transport Layer Security: protocolo que cifra e autentica a comunicação entre cliente e servidor, sucessor do SSL.',
    es: 'Transport Layer Security: protocolo que cifra y autentica la comunicación entre cliente y servidor, sucesor de SSL.'
  },
  {
    term: 'SSL',
    pt: 'Secure Sockets Layer: antecessor do TLS, hoje obsoleto, mas cujo nome ainda aparece em ferramentas e certificados.',
    es: 'Secure Sockets Layer: antecesor de TLS, hoy obsoleto, pero cuyo nombre aún aparece en herramientas y certificados.'
  },
  {
    term: 'mTLS',
    pt: 'Mutual TLS: variante do TLS em que também o cliente apresenta certificado, autenticando as duas pontas da conexão.',
    es: 'Mutual TLS: variante de TLS en la que también el cliente presenta certificado, autenticando ambos extremos de la conexión.'
  },
  {
    term: 'SNI',
    pt: 'Server Name Indication: extensão TLS em que o cliente informa o nome do host desejado, permitindo vários certificados no mesmo IP.',
    es: 'Server Name Indication: extensión TLS en la que el cliente indica el nombre del host deseado, permitiendo varios certificados en la misma IP.'
  },
  {
    term: 'HSTS',
    pt: 'HTTP Strict Transport Security: cabeçalho que instrui o navegador a acessar o domínio apenas por HTTPS por um período definido.',
    es: 'HTTP Strict Transport Security: cabecera que indica al navegador acceder al dominio solo por HTTPS durante un periodo definido.'
  },
  {
    term: 'PKI',
    pt: 'Public Key Infrastructure: conjunto de políticas, autoridades e processos que emitem e validam certificados digitais.',
    es: 'Public Key Infrastructure: conjunto de políticas, autoridades y procesos que emiten y validan certificados digitales.'
  },
  {
    term: 'CA',
    pt: 'Certificate Authority: autoridade certificadora que assina certificados e sustenta a cadeia de confiança.',
    es: 'Certificate Authority: autoridad certificadora que firma certificados y sostiene la cadena de confianza.'
  },
  {
    term: 'CSR',
    pt: 'Certificate Signing Request: pedido assinado com a chave privada, enviado à CA para que ela emita o certificado.',
    es: 'Certificate Signing Request: solicitud firmada con la clave privada, enviada a la CA para que emita el certificado.'
  },
  {
    term: 'CRL',
    pt: 'Certificate Revocation List: lista publicada pela CA com os certificados revogados antes do vencimento.',
    es: 'Certificate Revocation List: lista publicada por la CA con los certificados revocados antes de su vencimiento.'
  },
  {
    term: 'OCSP',
    pt: 'Online Certificate Status Protocol: consulta em tempo real do estado de revogação de um certificado.',
    es: 'Online Certificate Status Protocol: consulta en tiempo real del estado de revocación de un certificado.'
  },
  {
    term: 'SAN',
    pt: 'Subject Alternative Name: extensão do certificado que lista os nomes de host cobertos, hoje usada no lugar do Common Name.',
    es: 'Subject Alternative Name: extensión del certificado que lista los nombres de host cubiertos, hoy usada en lugar del Common Name.'
  },
  {
    term: 'EKU',
    pt: 'Extended Key Usage: extensão que restringe os usos permitidos de um certificado, como autenticação de servidor ou de cliente.',
    es: 'Extended Key Usage: extensión que restringe los usos permitidos de un certificado, como autenticación de servidor o de cliente.'
  },
  {
    term: 'X.509',
    pt: 'Padrão que define o formato dos certificados digitais de chave pública usados em TLS, mTLS e assinaturas.',
    es: 'Estándar que define el formato de los certificados digitales de clave pública usados en TLS, mTLS y firmas.'
  },
  {
    term: 'HSM',
    pt: 'Hardware Security Module: dispositivo dedicado que gera e guarda chaves privadas, executando operações sem expor o material.',
    es: 'Hardware Security Module: dispositivo dedicado que genera y guarda claves privadas, ejecutando operaciones sin exponer el material.'
  },
  {
    term: 'KMS',
    pt: 'Key Management Service: serviço que centraliza criação, rotação, uso e auditoria de chaves criptográficas.',
    es: 'Key Management Service: servicio que centraliza creación, rotación, uso y auditoría de claves criptográficas.'
  },
  {
    term: 'truststore',
    aliases: ['truststores'],
    pt: 'Repositório com os certificados das CAs em que a aplicação confia para validar a outra ponta da conexão.',
    es: 'Repositorio con los certificados de las CAs en las que la aplicación confía para validar el otro extremo de la conexión.'
  },
  {
    term: 'keystore',
    aliases: ['keystores'],
    pt: 'Repositório que guarda a chave privada e o certificado que a própria aplicação apresenta na conexão.',
    es: 'Repositorio que guarda la clave privada y el certificado que la propia aplicación presenta en la conexión.'
  },
  {
    term: 'fingerprint',
    aliases: ['fingerprints'],
    pt: 'Impressão digital: hash do certificado, usado para compará-lo ou fixá-lo sem transportar o conteúdo inteiro.',
    es: 'Huella digital: hash del certificado, usado para compararlo o fijarlo sin transportar el contenido completo.'
  },
  {
    term: 'AES',
    pt: 'Advanced Encryption Standard: cifra simétrica de bloco padrão da indústria, usada com chaves de 128, 192 ou 256 bits.',
    es: 'Advanced Encryption Standard: cifrado simétrico de bloque estándar de la industria, usado con claves de 128, 192 o 256 bits.'
  },
  {
    term: 'RSA',
    pt: 'Algoritmo assimétrico clássico, usado para assinatura digital e troca de chaves, baseado na dificuldade de fatorar números grandes.',
    es: 'Algoritmo asimétrico clásico, usado para firma digital e intercambio de claves, basado en la dificultad de factorizar números grandes.'
  },
  {
    term: 'ECC',
    pt: 'Elliptic Curve Cryptography: criptografia de curvas elípticas, que oferece a mesma segurança do RSA com chaves bem menores.',
    es: 'Elliptic Curve Cryptography: criptografía de curvas elípticas, que ofrece la misma seguridad que RSA con claves mucho menores.'
  },
  {
    term: 'ECDSA',
    pt: 'Algoritmo de assinatura digital baseado em curvas elípticas, comum em certificados TLS modernos.',
    es: 'Algoritmo de firma digital basado en curvas elípticas, habitual en certificados TLS modernos.'
  },
  {
    term: 'AEAD',
    pt: 'Authenticated Encryption with Associated Data: modo que cifra e autentica em uma única operação, detectando qualquer alteração.',
    es: 'Authenticated Encryption with Associated Data: modo que cifra y autentica en una sola operación, detectando cualquier alteración.'
  },
  {
    term: 'HMAC',
    pt: 'Hash-based Message Authentication Code: código que prova integridade e autenticidade de uma mensagem usando uma chave secreta.',
    es: 'Hash-based Message Authentication Code: código que prueba integridad y autenticidad de un mensaje usando una clave secreta.'
  },
  {
    term: 'SHA',
    aliases: ['SHA-1', 'SHA-256', 'SHA-512'],
    pt: 'Secure Hash Algorithm: família de funções de hash criptográfico; SHA-256 é hoje o padrão mais comum.',
    es: 'Secure Hash Algorithm: familia de funciones de hash criptográfico; SHA-256 es hoy el estándar más común.'
  },
  {
    term: 'MD5',
    pt: 'Função de hash antiga, considerada quebrada para uso criptográfico por permitir colisões práticas.',
    es: 'Función de hash antigua, considerada rota para uso criptográfico por permitir colisiones prácticas.'
  },
  {
    term: 'hash',
    aliases: ['hashes', 'hashing'],
    pt: 'Resumo de tamanho fixo calculado a partir de um dado; a mesma entrada gera sempre a mesma saída, e o inverso é inviável.',
    es: 'Resumen de tamaño fijo calculado a partir de un dato; la misma entrada genera siempre la misma salida, y el inverso es inviable.'
  },
  {
    term: 'salt',
    pt: 'Valor aleatório somado à senha antes do hash, para que senhas iguais produzam resultados diferentes.',
    es: 'Valor aleatorio añadido a la contraseña antes del hash, para que contraseñas iguales produzcan resultados distintos.'
  },
  {
    term: 'nonce',
    aliases: ['nonces'],
    pt: 'Número usado uma única vez em uma operação criptográfica ou protocolo, impedindo a reutilização de mensagens.',
    es: 'Número usado una sola vez en una operación criptográfica o protocolo, impidiendo la reutilización de mensajes.'
  },
  {
    term: 'KDF',
    pt: 'Key Derivation Function: função que deriva chaves criptográficas a partir de um segredo ou de uma senha.',
    es: 'Key Derivation Function: función que deriva claves criptográficas a partir de un secreto o de una contraseña.'
  },
  {
    term: 'replay',
    pt: 'Ataque em que uma mensagem legítima capturada é reenviada para obter o mesmo efeito uma segunda vez.',
    es: 'Ataque en el que un mensaje legítimo capturado se reenvía para obtener el mismo efecto una segunda vez.'
  },
  {
    term: 'downgrade',
    pt: 'Ataque que força as partes a negociar uma versão ou algoritmo mais fraco do que ambas suportam.',
    es: 'Ataque que fuerza a las partes a negociar una versión o algoritmo más débil del que ambas admiten.'
  },
  {
    term: 'CSRF',
    pt: 'Cross-Site Request Forgery: ataque que faz o navegador da vítima enviar uma requisição autenticada sem que ela perceba.',
    es: 'Cross-Site Request Forgery: ataque que hace que el navegador de la víctima envíe una petición autenticada sin que lo advierta.'
  },
  {
    term: 'XSS',
    pt: 'Cross-Site Scripting: injeção de script malicioso em uma página, executado no navegador de outros usuários.',
    es: 'Cross-Site Scripting: inyección de script malicioso en una página, ejecutado en el navegador de otros usuarios.'
  },
  {
    term: 'SSRF',
    pt: 'Server-Side Request Forgery: ataque em que o servidor é induzido a fazer requisições a destinos internos escolhidos pelo atacante.',
    es: 'Server-Side Request Forgery: ataque en el que el servidor es inducido a hacer peticiones a destinos internos elegidos por el atacante.'
  },
  {
    term: 'WAF',
    pt: 'Web Application Firewall: filtro que inspeciona o tráfego HTTP e bloqueia padrões de ataque conhecidos.',
    es: 'Web Application Firewall: filtro que inspecciona el tráfico HTTP y bloquea patrones de ataque conocidos.'
  },
  {
    term: 'OWASP',
    pt: 'Open Worldwide Application Security Project: comunidade que publica guias e listas de riscos de segurança em aplicações e APIs.',
    es: 'Open Worldwide Application Security Project: comunidad que publica guías y listas de riesgos de seguridad en aplicaciones y APIs.'
  },
  {
    term: 'NIST',
    pt: 'National Institute of Standards and Technology: instituto americano que publica padrões técnicos e recomendações de criptografia.',
    es: 'National Institute of Standards and Technology: instituto estadounidense que publica estándares técnicos y recomendaciones de criptografía.'
  },
  {
    term: 'FIPS',
    pt: 'Federal Information Processing Standards: padrões americanos que definem requisitos de segurança para módulos criptográficos.',
    es: 'Federal Information Processing Standards: estándares estadounidenses que definen requisitos de seguridad para módulos criptográficos.'
  },

  // ------------------------------------------------- Identidade e autorização
  {
    term: 'OAuth',
    pt: 'Framework de autorização que permite a uma aplicação obter acesso limitado a recursos em nome do usuário, sem receber sua senha.',
    es: 'Framework de autorización que permite a una aplicación obtener acceso limitado a recursos en nombre del usuario, sin recibir su contraseña.'
  },
  {
    term: 'OIDC',
    pt: 'OpenID Connect: camada de autenticação construída sobre o OAuth 2.0, que acrescenta o ID Token e informações do usuário.',
    es: 'OpenID Connect: capa de autenticación construida sobre OAuth 2.0, que añade el ID Token e información del usuario.'
  },
  {
    term: 'PKCE',
    pt: 'Proof Key for Code Exchange: extensão do OAuth que impede a interceptação do código de autorização em clientes públicos.',
    es: 'Proof Key for Code Exchange: extensión de OAuth que impide la interceptación del código de autorización en clientes públicos.'
  },
  {
    term: 'JWT',
    aliases: ['JWTs'],
    pt: 'JSON Web Token: token compacto em três partes codificadas em Base64URL, com cabeçalho, payload de claims e assinatura.',
    es: 'JSON Web Token: token compacto en tres partes codificadas en Base64URL, con cabecera, payload de claims y firma.'
  },
  {
    term: 'JWS',
    pt: 'JSON Web Signature: formato que assina digitalmente um conteúdo JSON, garantindo integridade e autoria.',
    es: 'JSON Web Signature: formato que firma digitalmente un contenido JSON, garantizando integridad y autoría.'
  },
  {
    term: 'JWE',
    pt: 'JSON Web Encryption: formato que cifra o conteúdo de um token, protegendo os dados além de garantir integridade.',
    es: 'JSON Web Encryption: formato que cifra el contenido de un token, protegiendo los datos además de garantizar integridad.'
  },
  {
    term: 'JWK',
    pt: 'JSON Web Key: representação de uma chave criptográfica em JSON, usada para publicar chaves públicas de verificação.',
    es: 'JSON Web Key: representación de una clave criptográfica en JSON, usada para publicar claves públicas de verificación.'
  },
  {
    term: 'JWKS',
    pt: 'JSON Web Key Set: endpoint que publica o conjunto de chaves públicas usadas para validar as assinaturas dos tokens.',
    es: 'JSON Web Key Set: endpoint que publica el conjunto de claves públicas usadas para validar las firmas de los tokens.'
  },
  {
    term: 'JOSE',
    pt: 'JSON Object Signing and Encryption: família de padrões IETF que reúne JWS, JWE, JWK e JWT.',
    es: 'JSON Object Signing and Encryption: familia de estándares del IETF que reúne JWS, JWE, JWK y JWT.'
  },
  {
    term: 'SAML',
    pt: 'Security Assertion Markup Language: padrão em XML para federação de identidade e SSO, anterior ao OpenID Connect.',
    es: 'Security Assertion Markup Language: estándar en XML para federación de identidad y SSO, anterior a OpenID Connect.'
  },
  {
    term: 'SSO',
    pt: 'Single Sign-On: mecanismo em que uma única autenticação dá acesso a várias aplicações.',
    es: 'Single Sign-On: mecanismo en el que una única autenticación da acceso a varias aplicaciones.'
  },
  {
    term: 'MFA',
    pt: 'Multi-Factor Authentication: exigência de mais de um fator de autenticação, como senha somada a um código temporário.',
    es: 'Multi-Factor Authentication: exigencia de más de un factor de autenticación, como contraseña más un código temporal.'
  },
  {
    term: 'RBAC',
    pt: 'Role-Based Access Control: modelo de autorização em que as permissões são concedidas a papéis atribuídos aos usuários.',
    es: 'Role-Based Access Control: modelo de autorización en el que los permisos se conceden a roles asignados a los usuarios.'
  },
  {
    term: 'ABAC',
    pt: 'Attribute-Based Access Control: modelo em que a decisão de acesso considera atributos do usuário, do recurso e do contexto.',
    es: 'Attribute-Based Access Control: modelo en el que la decisión de acceso considera atributos del usuario, del recurso y del contexto.'
  },
  {
    term: 'IdP',
    pt: 'Identity Provider: serviço que autentica o usuário e emite as asserções ou tokens consumidos pelas aplicações.',
    es: 'Identity Provider: servicio que autentica al usuario y emite las aserciones o tokens que consumen las aplicaciones.'
  },
  {
    term: 'token',
    aliases: ['tokens'],
    pt: 'Credencial emitida por um servidor de autorização que representa uma permissão concedida, com validade e escopo definidos.',
    es: 'Credencial emitida por un servidor de autorización que representa un permiso concedido, con validez y alcance definidos.'
  },
  {
    term: 'access token',
    aliases: ['access tokens'],
    pt: 'Token apresentado à API a cada chamada para provar que o cliente recebeu autorização de acesso.',
    es: 'Token presentado a la API en cada llamada para demostrar que el cliente recibió autorización de acceso.'
  },
  {
    term: 'refresh token',
    aliases: ['refresh tokens'],
    pt: 'Token de vida longa usado apenas para obter novos access tokens sem repetir a autenticação do usuário.',
    es: 'Token de larga duración usado solo para obtener nuevos access tokens sin repetir la autenticación del usuario.'
  },
  {
    term: 'ID Token',
    aliases: ['ID Tokens'],
    pt: 'Token do OpenID Connect que descreve quem é o usuário autenticado e como a autenticação aconteceu.',
    es: 'Token de OpenID Connect que describe quién es el usuario autenticado y cómo ocurrió la autenticación.'
  },
  {
    term: 'bearer',
    pt: 'Esquema em que quem porta o token pode usá-lo, sem prova adicional de posse; por isso ele deve trafegar sempre por TLS.',
    es: 'Esquema en el que quien porta el token puede usarlo, sin prueba adicional de posesión; por eso debe viajar siempre por TLS.'
  },
  {
    term: 'claim',
    aliases: ['claims'],
    pt: 'Afirmação contida no token, como identificador do usuário, emissor, público-alvo ou momento de expiração.',
    es: 'Afirmación contenida en el token, como identificador del usuario, emisor, audiencia o momento de expiración.'
  },
  {
    term: 'scope',
    aliases: ['scopes'],
    pt: 'Escopo: rótulo que delimita quais permissões o token concede, restringindo o que o cliente pode fazer.',
    es: 'Alcance: etiqueta que delimita qué permisos concede el token, restringiendo lo que el cliente puede hacer.'
  },
  {
    term: 'session',
    aliases: ['sessions'],
    pt: 'Sessão: estado que representa um usuário autenticado ao longo de várias requisições, normalmente mantido por cookie.',
    es: 'Sesión: estado que representa a un usuario autenticado a lo largo de varias peticiones, normalmente mantenido por cookie.'
  },
  {
    term: 'cookie',
    aliases: ['cookies'],
    pt: 'Pequeno dado guardado pelo navegador e reenviado ao servidor a cada requisição, muito usado para manter sessões.',
    es: 'Pequeño dato guardado por el navegador y reenviado al servidor en cada petición, muy usado para mantener sesiones.'
  },
  {
    term: 'Basic Auth',
    pt: 'Esquema HTTP que envia usuário e senha codificados em Base64 no cabeçalho Authorization, sem qualquer cifragem própria.',
    es: 'Esquema HTTP que envía usuario y contraseña codificados en Base64 en la cabecera Authorization, sin cifrado propio alguno.'
  },
  {
    term: 'API Key',
    aliases: ['API Keys'],
    pt: 'Chave estática enviada pelo cliente para identificar a aplicação chamadora; identifica, mas não autentica o usuário final.',
    es: 'Clave estática enviada por el cliente para identificar la aplicación llamante; identifica, pero no autentica al usuario final.'
  },
  {
    term: 'rate limiting',
    pt: 'Limitação da quantidade de chamadas que um cliente pode fazer em uma janela de tempo, protegendo o backend.',
    es: 'Limitación de la cantidad de llamadas que un cliente puede hacer en una ventana de tiempo, protegiendo el backend.'
  },
  {
    term: 'throttling',
    pt: 'Desaceleração deliberada do atendimento de chamadas excedentes, em vez de rejeitá-las imediatamente.',
    es: 'Ralentización deliberada de la atención de llamadas excedentes, en lugar de rechazarlas de inmediato.'
  },

  // -------------------------------------------------- Formatos e computação
  {
    term: 'JSON',
    pt: 'JavaScript Object Notation: formato leve de intercâmbio de dados baseado em objetos, listas e valores simples.',
    es: 'JavaScript Object Notation: formato ligero de intercambio de datos basado en objetos, listas y valores simples.'
  },
  {
    term: 'XML',
    pt: 'eXtensible Markup Language: formato de marcação hierárquico com esquemas e namespaces, muito usado em integrações legadas.',
    es: 'eXtensible Markup Language: formato de marcado jerárquico con esquemas y namespaces, muy usado en integraciones heredadas.'
  },
  {
    term: 'YAML',
    pt: 'Formato de serialização legível por humanos, baseado em indentação, comum em arquivos de configuração e no OpenAPI.',
    es: 'Formato de serialización legible por humanos, basado en indentación, común en archivos de configuración y en OpenAPI.'
  },
  {
    term: 'HTML',
    pt: 'HyperText Markup Language: linguagem de marcação que estrutura o conteúdo das páginas web.',
    es: 'HyperText Markup Language: lenguaje de marcado que estructura el contenido de las páginas web.'
  },
  {
    term: 'URI',
    aliases: ['URIs'],
    pt: 'Uniform Resource Identifier: identificador de um recurso; conceito geral do qual URL e URN são casos particulares.',
    es: 'Uniform Resource Identifier: identificador de un recurso; concepto general del que URL y URN son casos particulares.'
  },
  {
    term: 'URL',
    aliases: ['URLs'],
    pt: 'Uniform Resource Locator: URI que também informa como alcançar o recurso, indicando protocolo e localização.',
    es: 'Uniform Resource Locator: URI que además indica cómo alcanzar el recurso, señalando protocolo y ubicación.'
  },
  {
    term: 'URN',
    aliases: ['URNs'],
    pt: 'Uniform Resource Name: URI cuja função é dar um nome único e persistente ao recurso, sem indicar onde encontrá-lo.',
    es: 'Uniform Resource Name: URI cuya función es dar un nombre único y persistente al recurso, sin indicar dónde encontrarlo.'
  },
  {
    term: 'Base64',
    aliases: ['Base64URL'],
    pt: 'Codificação que representa bytes usando 64 caracteres imprimíveis; transporta dados binários, mas não os protege.',
    es: 'Codificación que representa bytes usando 64 caracteres imprimibles; transporta datos binarios, pero no los protege.'
  },
  {
    term: 'UTF-8',
    pt: 'Codificação de caracteres Unicode de tamanho variável, padrão na web por ser compatível com ASCII.',
    es: 'Codificación de caracteres Unicode de tamaño variable, estándar en la web por ser compatible con ASCII.'
  },
  {
    term: 'ASCII',
    pt: 'Conjunto original de 128 caracteres codificados em 7 bits, base histórica das demais codificações de texto.',
    es: 'Conjunto original de 128 caracteres codificados en 7 bits, base histórica de las demás codificaciones de texto.'
  },
  {
    term: 'UUID',
    aliases: ['UUIDs'],
    pt: 'Universally Unique Identifier: identificador de 128 bits gerado de forma a ser praticamente único sem coordenação central.',
    es: 'Universally Unique Identifier: identificador de 128 bits generado de forma que sea prácticamente único sin coordinación central.'
  },
  {
    term: 'schema',
    aliases: ['schemas'],
    pt: 'Descrição formal da estrutura esperada de um dado, usada para validar mensagens e gerar documentação ou código.',
    es: 'Descripción formal de la estructura esperada de un dato, usada para validar mensajes y generar documentación o código.'
  },
  {
    term: 'framework',
    aliases: ['frameworks'],
    pt: 'Estrutura de software que fornece a arquitetura e os pontos de extensão sobre os quais a aplicação é construída.',
    es: 'Estructura de software que aporta la arquitectura y los puntos de extensión sobre los que se construye la aplicación.'
  },
  {
    term: 'middleware',
    aliases: ['middlewares'],
    pt: 'Camada intermediária que processa a requisição antes ou depois da lógica principal, aplicando funções transversais.',
    es: 'Capa intermedia que procesa la petición antes o después de la lógica principal, aplicando funciones transversales.'
  },
  {
    term: 'backend',
    aliases: ['backends'],
    pt: 'Camada de servidor que executa a lógica de negócio e o acesso a dados, atrás da interface consumida pelo cliente.',
    es: 'Capa de servidor que ejecuta la lógica de negocio y el acceso a datos, detrás de la interfaz que consume el cliente.'
  },
  {
    term: 'frontend',
    aliases: ['frontends'],
    pt: 'Camada de interface executada no cliente, responsável pela apresentação e pela interação com o usuário.',
    es: 'Capa de interfaz ejecutada en el cliente, responsable de la presentación y de la interacción con el usuario.'
  },
  {
    term: 'stateless',
    pt: 'Sem estado: cada requisição carrega tudo o que o servidor precisa, sem depender de contexto guardado de chamadas anteriores.',
    es: 'Sin estado: cada petición lleva todo lo que el servidor necesita, sin depender de contexto guardado de llamadas anteriores.'
  },
  {
    term: 'stateful',
    pt: 'Com estado: o servidor mantém contexto entre requisições, o que dificulta escalar horizontalmente.',
    es: 'Con estado: el servidor mantiene contexto entre peticiones, lo que dificulta escalar horizontalmente.'
  },
  {
    term: 'cache',
    aliases: ['caches', 'caching'],
    pt: 'Armazenamento temporário de respostas para reaproveitá-las, reduzindo latência e carga sobre a origem.',
    es: 'Almacenamiento temporal de respuestas para reaprovecharlas, reduciendo latencia y carga sobre el origen.'
  },
  {
    term: 'log',
    aliases: ['logs', 'logging'],
    pt: 'Registro cronológico de eventos gerado pelos componentes, base para auditoria e diagnóstico de problemas.',
    es: 'Registro cronológico de eventos generado por los componentes, base para auditoría y diagnóstico de problemas.'
  },
  {
    term: 'tracing',
    aliases: ['trace', 'traces'],
    pt: 'Rastreamento distribuído: correlação das etapas de uma mesma chamada ao atravessar vários serviços.',
    es: 'Trazado distribuido: correlación de las etapas de una misma llamada al atravesar varios servicios.'
  },
  {
    term: 'troubleshooting',
    pt: 'Processo sistemático de investigar sintomas, isolar camadas e identificar a causa raiz de uma falha.',
    es: 'Proceso sistemático de investigar síntomas, aislar capas e identificar la causa raíz de un fallo.'
  },
  {
    term: 'retry',
    aliases: ['retries'],
    pt: 'Nova tentativa automática após uma falha temporária; só é seguro em operações idempotentes.',
    es: 'Nuevo intento automático tras un fallo temporal; solo es seguro en operaciones idempotentes.'
  },
  {
    term: 'backoff',
    pt: 'Espera crescente entre tentativas sucessivas, evitando amplificar a sobrecarga de um serviço degradado.',
    es: 'Espera creciente entre intentos sucesivos, evitando amplificar la sobrecarga de un servicio degradado.'
  },
  {
    term: 'circuit breaker',
    pt: 'Disjuntor: padrão que interrompe temporariamente as chamadas a um serviço que está falhando, dando tempo para ele se recuperar.',
    es: 'Cortacircuitos: patrón que interrumpe temporalmente las llamadas a un servicio que está fallando, dándole tiempo para recuperarse.'
  },
  {
    term: 'sidecar',
    aliases: ['sidecars'],
    pt: 'Contêiner auxiliar implantado junto à aplicação para tratar responsabilidades como TLS, roteamento e telemetria.',
    es: 'Contenedor auxiliar desplegado junto a la aplicación para atender responsabilidades como TLS, enrutamiento y telemetría.'
  },
  {
    term: 'container',
    aliases: ['containers'],
    pt: 'Unidade isolada que empacota aplicação e dependências, executando de forma previsível em qualquer ambiente.',
    es: 'Unidad aislada que empaqueta aplicación y dependencias, ejecutándose de forma previsible en cualquier entorno.'
  },
  {
    term: 'cluster',
    aliases: ['clusters'],
    pt: 'Conjunto de nós que operam como um único sistema, oferecendo escala e tolerância a falhas.',
    es: 'Conjunto de nodos que operan como un único sistema, ofreciendo escala y tolerancia a fallos.'
  },
  {
    term: 'pipeline',
    aliases: ['pipelines'],
    pt: 'Sequência automatizada de etapas, como build, testes e implantação, executada a cada mudança no código.',
    es: 'Secuencia automatizada de etapas, como build, pruebas y despliegue, ejecutada en cada cambio del código.'
  },
  {
    term: 'deploy',
    aliases: ['deploys', 'deployment'],
    pt: 'Implantação: publicação de uma versão da aplicação em um ambiente de execução.',
    es: 'Despliegue: publicación de una versión de la aplicación en un entorno de ejecución.'
  },
  {
    term: 'rollback',
    pt: 'Retorno controlado à versão anterior quando uma implantação apresenta problemas.',
    es: 'Vuelta controlada a la versión anterior cuando un despliegue presenta problemas.'
  },
  {
    term: 'dashboard',
    aliases: ['dashboards'],
    pt: 'Painel visual que consolida métricas e indicadores para acompanhamento operacional.',
    es: 'Panel visual que consolida métricas e indicadores para el seguimiento operativo.'
  },
  {
    term: 'flag',
    aliases: ['flags'],
    pt: 'Bit ou marcador que sinaliza um estado ou opção, como as flags SYN, ACK e RST do TCP.',
    es: 'Bit o marcador que señala un estado u opción, como las flags SYN, ACK y RST de TCP.'
  },
  {
    term: 'wildcard',
    pt: 'Curinga: símbolo que representa qualquer valor em uma posição, como o asterisco em um certificado *.exemplo.com.',
    es: 'Comodín: símbolo que representa cualquier valor en una posición, como el asterisco en un certificado *.ejemplo.com.'
  },
  {
    term: 'SLA',
    aliases: ['SLAs'],
    pt: 'Service Level Agreement: acordo formal que define os níveis de serviço prometidos e as consequências do descumprimento.',
    es: 'Service Level Agreement: acuerdo formal que define los niveles de servicio prometidos y las consecuencias de incumplirlos.'
  },
  {
    term: 'SLO',
    aliases: ['SLOs'],
    pt: 'Service Level Objective: meta interna de disponibilidade ou desempenho que orienta a operação do serviço.',
    es: 'Service Level Objective: objetivo interno de disponibilidad o rendimiento que orienta la operación del servicio.'
  },
  {
    term: 'IETF',
    pt: 'Internet Engineering Task Force: organização aberta que desenvolve e publica os padrões técnicos da internet.',
    es: 'Internet Engineering Task Force: organización abierta que desarrolla y publica los estándares técnicos de internet.'
  },
  {
    term: 'RFC',
    aliases: ['RFCs'],
    pt: 'Request for Comments: documento numerado publicado pelo IETF que descreve um padrão, prática ou proposta da internet.',
    es: 'Request for Comments: documento numerado publicado por el IETF que describe un estándar, práctica o propuesta de internet.'
  },
  {
    term: 'W3C',
    pt: 'World Wide Web Consortium: consórcio que padroniza tecnologias da web, como HTML, CSS e XML.',
    es: 'World Wide Web Consortium: consorcio que estandariza tecnologías de la web, como HTML, CSS y XML.'
  }
];

function toGlossaryEntries(language: 'pt' | 'es'): readonly GlossaryEntry[] {
  return TECHNICAL_TERMS.flatMap((entry) => {
    const definition = language === 'pt' ? entry.pt : entry.es;
    const canonical: GlossaryEntry = { term: entry.term, definition };
    const aliases = (entry.aliases ?? []).map((alias) => ({ term: alias, definition }));

    return [canonical, ...aliases];
  });
}

export const TECHNICAL_TERMS_PT: readonly GlossaryEntry[] = toGlossaryEntries('pt');
export const TECHNICAL_TERMS_ES: readonly GlossaryEntry[] = toGlossaryEntries('es');
