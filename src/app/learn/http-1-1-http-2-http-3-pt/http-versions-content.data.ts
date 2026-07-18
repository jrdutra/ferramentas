import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.
export const HTTP_VERSIONS_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "HTTP é frequentemente apresentado por meio de exemplos curtos de GET e POST, mas essa visão é insuficiente para quem opera gateways corporativos. Em produção, HTTP é um protocolo com semântica própria, regras rigorosas de delimitação, mecanismos de negociação, cache, condições, intermediários e diferentes mapeamentos de transporte. Uma chamada que aparenta ser uma única requisição pode ser recebida em HTTP/3 na borda, convertida para HTTP/2 até o gateway e encaminhada em HTTP/1.1 ao backend. Cada salto possui sua própria conexão, estado, timeout, compressão de campos e risco operacional."
  },
  {
    "kind": "paragraph",
    "text": "As versões HTTP/1.1, HTTP/2 e HTTP/3 não representam três APIs diferentes. Elas compartilham métodos, códigos de status, campos e conceitos de representação definidos pela semântica HTTP, mas codificam e transportam esses elementos de formas diferentes. HTTP/1.1 utiliza uma sintaxe textual sobre um fluxo TCP; HTTP/2 introduz frames binários e streams multiplexados sobre uma conexão; HTTP/3 leva a semântica HTTP para QUIC, que funciona sobre UDP e integra TLS 1.3 ao transporte."
  },
  {
    "kind": "paragraph",
    "text": "Para um engenheiro de API Gateway, a distinção entre semântica e versão de fio é central. Um erro 405 não é consequência de TCP ou QUIC; ele indica que o método não é permitido pelo recurso. Um timeout sem resposta HTTP aponta para outra camada. Um 502 pode ter sido gerado pelo gateway após falha na conexão com o upstream. Já um comportamento intermitente em HTTP/2 pode envolver limites de streams, janela de fluxo, drenagem ou uma tradução inadequada para HTTP/1.1 no próximo salto."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo constrói um modelo mental completo: primeiro estabelece a semântica comum, depois aprofunda o formato e as conexões de HTTP/1.1, em seguida explica a arquitetura de frames e streams do HTTP/2 e, por fim, apresenta QUIC e HTTP/3. O objetivo não é decorar listas, mas compreender quais propriedades permanecem estáveis, quais mudam entre versões e quais evidências devem ser coletadas em cada ponto de uma arquitetura corporativa."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "A semântica HTTP pertence à operação; a versão HTTP e a conexão pertencem a cada salto. Um proxy termina uma mensagem, aplica regras e cria uma nova mensagem para o próximo destino."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Objetivos de aprendizagem"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explicar a arquitetura semântica de HTTP e separar significado, representação e mapeamento de transporte.",
      "Interpretar método, alvo da requisição, autoridade, campos, conteúdo, trailers e códigos de status.",
      "Distinguir segurança, idempotência e cacheabilidade dos principais métodos.",
      "Projetar cache e revalidação usando Cache-Control, Age, ETag, Last-Modified e requisições condicionais.",
      "Interpretar a sintaxe de HTTP/1.1, incluindo CRLF, Content-Length, Transfer-Encoding e mensagens sem conteúdo.",
      "Compreender conexões persistentes, pipelining, keep-alive, timeouts e head-of-line blocking.",
      "Reconhecer riscos de parsing divergente, request smuggling, response splitting e campos hop-by- hop.",
      "Explicar frames, streams, multiplexação, controle de fluxo, GOAWAY e HPACK no HTTP/2.",
      "Entender ALPN, h2, h2c, coalescing de conexões e limites de concorrência.",
      "Explicar QUIC, integração com TLS 1.3, Connection IDs, migração, perda e streams independentes.",
      "Compreender frames HTTP/3, streams de controle, QPACK, Alt-Svc e descoberta por HTTPS/SVCB.",
      "Comparar HTTP/1.1, HTTP/2 e HTTP/3 em latência, observabilidade, segurança e operação.",
      "Aplicar os conceitos a Axway API Gateway, Azure API Management e arquiteturas com múltiplos proxies.",
      "Diagnosticar falhas por meio de traces, cabeçalhos, logs, métricas de conexão e capturas de tráfego."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estrutura do capítulo"
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Organização conceitual do capítulo.",
    "headers": [
      "Bloco",
      "Conteúdo",
      "Pergunta orientadora"
    ],
    "rows": [
      [
        "A",
        "Semântica HTTP",
        "O que a mensagem significa independentemente da versão?"
      ],
      [
        "B",
        "HTTP/1.1",
        "Como mensagens textuais são delimitadas dentro de um fluxo TCP?"
      ],
      [
        "C",
        "HTTP/2",
        "Como frames e streams compartilham uma conexão com eficiência?"
      ],
      [
        "D",
        "HTTP/3 e QUIC",
        "Como reduzir bloqueios e tornar conexão, segurança e mobilidade parte do transporte?"
      ],
      [
        "E",
        "Gateways e operação",
        "Como versões diferentes convivem e como localizar falhas em cada salto?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP: protocolo de aplicação e arquitetura semântica",
    "id": "http-protocolo-de-aplicacao-e-arquitetura-semantica"
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9110 define HTTP como um protocolo de aplicação stateless para sistemas distribuídos e estabelece conceitos comuns a todas as versões. “Stateless” não significa que aplicações não possam manter sessão ou estado de negócio. Significa que o protocolo não exige que o servidor preserve, entre requisições independentes, o contexto necessário para interpretar a próxima mensagem. Estado pode ser representado em recursos, bancos de dados, cookies, tokens, caches ou sessões, mas cada requisição precisa transportar informações suficientes para ser processada de acordo com o contrato."
  },
  {
    "kind": "paragraph",
    "text": "A unidade semântica principal é uma mensagem de requisição ou resposta. Uma requisição expressa um método aplicado a um alvo, acompanhada de campos e, opcionalmente, conteúdo. Uma resposta comunica o resultado por meio de um código de status, campos e possível conteúdo. HTTP não determina que o conteúdo seja JSON nem que a API seja REST. O protocolo pode transportar HTML, imagens, XML, Protobuf, arquivos, eventos e outros formatos registrados ou acordados entre as partes."
  },
  {
    "kind": "paragraph",
    "text": "A semântica também define propriedades que orientam intermediários. Caches precisam saber quando uma resposta pode ser reutilizada; proxies precisam diferenciar campos destinados ao próximo salto de metadados fim a fim; clientes precisam decidir quando uma operação pode ser repetida após falha; gateways precisam preservar autoridade, método e conteúdo sem criar ambiguidades. Essas propriedades são mais importantes para interoperabilidade do que a aparência textual observada em um exemplo de HTTP/1.1."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-01-shared-semantics.svg",
    "alt": "Semântica HTTP comum mapeada de formas diferentes por HTTP/1.1, HTTP/2 e HTTP/3",
    "caption": "Figura 1 - A semântica é compartilhada; cada versão define um mapeamento diferente para a rede."
  },
  {
    "kind": "subhead",
    "text": "Leitura para gateways"
  },
  {
    "kind": "paragraph",
    "text": "Quando um gateway recebe HTTP/2 e chama um backend em HTTP/1.1, ele não “encaminha frames”. Ele decodifica uma mensagem, executa políticas e gera outra mensagem compatível com o próximo protocolo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Evolução: de mensagens mínimas a transporte multiplexado",
    "id": "evolucao-de-mensagens-minimas-a-transporte-multiplexado"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/0.9 possuía uma forma extremamente simples: uma requisição GET seguida pelo caminho, e uma resposta composta pelo documento. Não havia códigos de status, campos, negociação de tipo ou conexão persistente. Essa simplicidade atendia aos primeiros documentos da Web, mas não oferecia mecanismos adequados para aplicações distribuídas complexas. HTTP/1.0 introduziu versões na linha inicial, códigos de status, campos e tipos de mídia, permitindo representar metadados e diferentes conteúdos."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 consolidou conexões persistentes por padrão, o campo Host, cache mais completo, requisições condicionais, transferências em chunks e regras de framing. O protocolo passou a suportar vários sites no mesmo endereço IP e reduziu o custo de abrir uma conexão por objeto. Ainda assim, a dependência de um fluxo TCP ordenado e o formato sequencial criaram limites para páginas e APIs com muitas operações concorrentes."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 preservou a semântica e substituiu o formato textual de mensagem por frames binários associados a streams. Isso permitiu intercalar várias trocas na mesma conexão e comprimir campos repetitivos com HPACK. HTTP/3 manteve o modelo de streams e frames, mas substituiu TCP por QUIC. Assim, perda em um stream não precisa impedir a entrega de dados disponíveis de outros streams, e o handshake criptográfico passa a integrar o estabelecimento do transporte."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-02-http-evolution.svg",
    "alt": "Linha do tempo da evolução do HTTP/0.9 ao HTTP/3",
    "caption": "Figura 2 - Evolução histórica do protocolo HTTP."
  },
  {
    "kind": "subhead",
    "text": "Compatibilidade semântica"
  },
  {
    "kind": "paragraph",
    "text": "Um método GET continua sendo GET em HTTP/1.1, HTTP/2 e HTTP/3. O que muda é como método, alvo, campos e conteúdo são representados e transportados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modelo de transação: requisição, resposta e mensagens autodescritivas",
    "id": "modelo-de-transacao-requisicao-resposta-e-mensagens-autodescritivas"
  },
  {
    "kind": "paragraph",
    "text": "Uma transação HTTP começa quando um cliente envia uma requisição a um servidor de origem ou intermediário. A requisição contém informações de controle e metadados que permitem determinar o recurso, a operação e a forma esperada de resposta. O servidor produz uma ou mais respostas informativas e uma resposta final. Em HTTP/1.1, os elementos aparecem como linhas e campos; em HTTP/2 e HTTP/3, são convertidos em pseudo-campos e frames."
  },
  {
    "kind": "paragraph",
    "text": "O conteúdo de uma mensagem é conceitualmente diferente de sua representação no fio. Campos como Content-Type e Content-Encoding descrevem a representação. O framing informa como localizar o conteúdo dentro da conexão. Em HTTP/1.1, Content-Length ou chunked pode delimitar o corpo; em HTTP/2 e HTTP/3, o conteúdo é carregado em frames DATA e o final do stream indica o término. Confundir metadados da representação com framing produz bugs de interoperabilidade e vulnerabilidades."
  },
  {
    "kind": "paragraph",
    "text": "Trailers são campos enviados após o conteúdo. Podem carregar metadados calculados ao final da transmissão, como integridade ou status de protocolos construídos sobre HTTP. Nem todos os intermediários preservam trailers, e o contrato precisa considerar essa possibilidade. Em gateways, transformar streaming em buffering completo pode mudar latência, memória consumida e a capacidade de entregar trailers ao cliente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-03-message-anatomy.svg",
    "alt": "Anatomia conceitual de uma requisição e de uma resposta HTTP",
    "caption": "Figura 3 - Anatomia conceitual de requisição e resposta."
  },
  {
    "kind": "code",
    "text": "POST /v1/payments HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAccept: application/json\nContent-Length: 42\n{\"amount\":100.00,\"currency\":\"BRL\"}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Identificadores, URI, autoridade e alvo da requisição",
    "id": "identificadores-uri-autoridade-e-alvo-da-requisicao"
  },
  {
    "kind": "paragraph",
    "text": "Uma URI identifica um recurso ou referência utilizada na interação. No uso comum de APIs, a URI inclui esquema, autoridade, caminho e consulta. Em `https://api.example.com:443/v1/accounts/123? view=summary`, o esquema é HTTPS, a autoridade contém host e porta, o caminho identifica uma hierarquia lógica e a query adiciona parâmetros. O fragmento, quando presente em uma URI, é processado pelo cliente e não é enviado na requisição HTTP."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 utiliza diferentes formas de request-target conforme o método e o tipo de intermediário. A origin-form envia caminho e query; a absolute-form é típica em forward proxies; a authority-form é usada por CONNECT; e a asterisk-form aparece em OPTIONS `*`. O campo Host é obrigatório em HTTP/1.1 e informa a autoridade pretendida. Em HTTP/2 e HTTP/3, pseudo-campos como `:scheme`, `:authority`, `:path` e `:method` representam esses componentes."
  },
  {
    "kind": "paragraph",
    "text": "Gateways devem tratar autoridade com atenção porque ela participa de roteamento, seleção de certificado, políticas e proteção contra ataques de Host header. Um proxy pode receber um endereço público e chamar um host interno diferente; isso não autoriza substituir indiscriminadamente o significado da autoridade original. Em algumas arquiteturas, o backend precisa conhecer o host externo por campos `Forwarded` ou equivalentes, mas esses campos só devem ser confiados quando inseridos por intermediários controlados."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Componentes comuns de uma URI HTTP.",
    "headers": [
      "Componente",
      "Exemplo",
      "Uso técnico"
    ],
    "rows": [
      [
        "Scheme",
        "https",
        "Define esquema e expectativas de segurança."
      ],
      [
        "Authority",
        "api.example.com:443",
        "Identifica host e porta lógica da origem."
      ],
      [
        "Path",
        "/v1/accounts/123",
        "Seleciona recurso ou rota."
      ],
      [
        "Query",
        "view=summary",
        "Parâmetros não hierárquicos."
      ],
      [
        "Fragment",
        "#section",
        "Não é enviado ao servidor."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Métodos: intenção, segurança e idempotência",
    "id": "metodos-intencao-seguranca-e-idempotencia"
  },
  {
    "kind": "paragraph",
    "text": "O método expressa a intenção da requisição. GET solicita a transferência de uma representação; HEAD solicita os mesmos metadados sem conteúdo de resposta; POST pede que o recurso processe o conteúdo conforme sua semântica; PUT substitui ou cria o estado no URI alvo; DELETE solicita a remoção da associação atual; OPTIONS descreve opções de comunicação; CONNECT estabelece um túnel; TRACE executa um diagnóstico de loopback e costuma ser desabilitado em ambientes corporativos."
  },
  {
    "kind": "paragraph",
    "text": "Um método seguro é definido como essencialmente de leitura: o cliente não solicita alteração do estado do servidor. Isso não impede logs, métricas ou cobrança operacional, mas significa que o efeito pretendido não é uma mudança de negócio. Idempotência significa que repetir a mesma intenção várias vezes deve produzir o mesmo efeito desejado que uma única execução. PUT e DELETE são idempotentes na semântica, embora respostas e efeitos secundários observáveis possam variar."
  },
  {
    "kind": "paragraph",
    "text": "A distinção é decisiva para retries. Um gateway pode repetir uma requisição GET após falha de conexão com menor risco semântico. Repetir POST de pagamento pode duplicar a operação se o backend tiver processado o conteúdo antes de a resposta se perder. APIs financeiras frequentemente introduzem uma chave de idempotência de aplicação, persistindo o resultado associado a uma chave única. Essa estratégia complementa, mas não altera, a semântica do método HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-04-method-properties.svg",
    "alt": "Comparação de segurança e idempotência dos principais métodos HTTP",
    "caption": "Figura 4 - Propriedades semânticas dos principais métodos."
  },
  {
    "kind": "subhead",
    "text": "Retry não é apenas uma decisão técnica"
  },
  {
    "kind": "paragraph",
    "text": "Antes de configurar retries no gateway, classifique a operação, determine o ponto em que o upstream pode ter produzido efeito e defina como duplicidades serão detectadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Códigos de status e autoria da resposta",
    "id": "codigos-de-status-e-autoria-da-resposta"
  },
  {
    "kind": "paragraph",
    "text": "O código de status descreve o resultado da tentativa de interpretar e satisfazer a requisição. Respostas 1xx são informativas; 2xx indicam sucesso; 3xx orientam redirecionamento ou uso de outra representação; 4xx indicam que a requisição não pode ser atendida nas condições apresentadas; 5xx informam falha do servidor ou intermediário. A classe é relevante, mas o código específico e os campos associados fornecem a semântica completa."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas com proxies, o código final pode ser criado por qualquer intermediário. Um 401 pode vir de uma política de autenticação do gateway sem que o backend seja chamado. Um 429 pode representar rate limit da borda. Um 502 normalmente indica que um gateway não obteve uma resposta válida do upstream; um 504 representa timeout atuando como gateway. Logs devem registrar autoria, estágio da política e status do upstream separadamente."
  },
  {
    "kind": "paragraph",
    "text": "Reason phrases de HTTP/1.1 são informativas e não devem controlar lógica. HTTP/2 e HTTP/3 transmitem o código em `:status` e não transportam reason phrase. Clientes devem tomar decisões com base no número e nos campos, não em textos como “OK” ou “Unauthorized”. Em APIs, respostas de erro podem adicionar um formato de problema, correlação e detalhes, mas o corpo não substitui a semântica do status."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Códigos frequentes em APIs corporativas.",
    "headers": [
      "Código",
      "Significado operacional",
      "Ponto de atenção em gateways"
    ],
    "rows": [
      [
        "200",
        "Operação concluída com representação.",
        "Pode ser cacheada conforme campos e método."
      ],
      [
        "201",
        "Recurso criado.",
        "Location pode identificar o novo recurso."
      ],
      [
        "204",
        "Sucesso sem conteúdo.",
        "Não inventar corpo durante transformação."
      ],
      [
        "304",
        "Representação armazenada continua válida.",
        "Não é resposta normal com corpo."
      ],
      [
        "400",
        "Requisição inválida.",
        "Pode vir de parsing, validação ou contrato."
      ],
      [
        "401",
        "Credenciais ausentes ou inválidas.",
        "WWW-Authenticate descreve o desafio."
      ],
      [
        "403",
        "Entidade compreendida, mas não autorizada.",
        "Não confundir com falha de autenticação."
      ],
      [
        "404",
        "Recurso não encontrado ou ocultado.",
        "Pode vir do roteamento do gateway."
      ],
      [
        "409",
        "Conflito com estado atual.",
        "Útil em concorrência e idempotência."
      ],
      [
        "413",
        "Conteúdo grande demais.",
        "Limite pode existir em cada intermediário."
      ],
      [
        "429",
        "Limite excedido.",
        "Retry-After pode orientar nova tentativa."
      ],
      [
        "502",
        "Resposta inválida do upstream.",
        "Investigar conexão e parsing entre gateway e backend."
      ],
      [
        "503",
        "Serviço indisponível.",
        "Pool vazio, manutenção ou overload."
      ],
      [
        "504",
        "Timeout de gateway.",
        "Descobrir qual hop expirou primeiro."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Campos HTTP: metadados, escopo e normalização",
    "id": "campos-http-metadados-escopo-e-normalizacao"
  },
  {
    "kind": "paragraph",
    "text": "Campos HTTP são pares nome-valor extensíveis. Eles transportam informações sobre controle, representação, cache, autenticação, negociação e intermediários. Nomes são case-insensitive, embora valores possam ter regras específicas. Um campo pode permitir uma única ocorrência, múltiplas ocorrências ou uma lista combinável. Implementações não devem concatenar campos indiscriminadamente, especialmente `Set-Cookie`, cuja semântica exige tratamento específico."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9110 distingue campos fim a fim de informações relacionadas à conexão. HTTP/1.1 usa o campo Connection para declarar nomes de campos que se aplicam apenas ao próximo salto. Intermediários devem remover esses campos antes de encaminhar. HTTP/2 e HTTP/3 proíbem diversos campos específicos de conexão, pois streams e frames substituem mecanismos como `Transfer-Encoding: chunked`. Replicar cabeçalhos de HTTP/1.1 sem entender seu escopo pode gerar falhas de protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Normalização é necessária, mas perigosa. Gateways podem alterar capitalização, ordem, combinar linhas, remover espaços opcionais ou reconstruir mensagens. Aplicações não devem depender da ordem dos campos. Por outro lado, assinaturas HTTP e esquemas de autenticação podem definir canonicalização explícita. Uma política de gateway que modifica valores assinados precisa ser executada antes da assinatura ou preservar exatamente os componentes cobertos."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Categorias de campos relevantes para APIs.",
    "headers": [
      "Categoria",
      "Exemplos",
      "Função"
    ],
    "rows": [
      [
        "Roteamento e alvo",
        "Host, Forwarded",
        "Identificar autoridade e caminho por intermediários."
      ],
      [
        "Representação",
        "Content-Type, Content-Encoding, Content-Language",
        "Descrever o conteúdo transferido."
      ],
      [
        "Negociação",
        "Accept, Accept-Encoding, Accept-Language",
        "Expressar preferências do cliente."
      ],
      [
        "Cache",
        "Cache-Control, Age, ETag, Vary",
        "Controlar armazenamento e reutilização."
      ],
      [
        "Autenticação",
        "Authorization, WWW-Authenticate",
        "Apresentar credencial ou desafio."
      ],
      [
        "Condição",
        "If-Match, If-None-Match, If-Modified-Since",
        "Executar operação conforme estado conhecido."
      ],
      [
        "Observabilidade",
        "traceparent, tracestate, correlação",
        "Propagar contexto entre serviços."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Representações, tipos de mídia e negociação de conteúdo",
    "id": "representacoes-tipos-de-midia-e-negociacao-de-conteudo"
  },
  {
    "kind": "paragraph",
    "text": "Um recurso é uma abstração; a representação é uma sequência de bytes e metadados que descreve um estado desse recurso. O mesmo recurso pode ser representado como JSON, XML, CSV ou imagem. `Content-Type` informa o tipo de mídia da representação enviada, enquanto `Accept` expressa quais tipos o cliente considera aceitáveis. Enviar JSON sem `Content-Type: application/json` obriga o receptor a inferir ou rejeitar o conteúdo."
  },
  {
    "kind": "paragraph",
    "text": "Content negotiation pode ocorrer de forma proativa, usando campos Accept, Accept-Encoding e Accept- Language, ou de forma reativa, quando o servidor oferece alternativas. O campo Vary informa quais dimensões da requisição influenciaram a seleção da resposta e é essencial para caches. Se uma resposta varia por `Accept-Encoding`, um cache não deve entregar bytes gzip a um cliente que não os aceita."
  },
  {
    "kind": "paragraph",
    "text": "Content-Encoding descreve transformações aplicadas à representação, como gzip ou br. Ele não deve ser confundido com Transfer-Encoding, que em HTTP/1.1 participa do framing da mensagem. Gateways que descomprimem conteúdo para inspeção precisam decidir se recompactam, corrigir Content-Length, preservar ETag quando semanticamente válido e considerar limites de expansão para evitar ataques de descompressão."
  },
  {
    "kind": "code",
    "text": "GET /reports/2026 HTTP/1.1\nHost: api.example.com\nAccept: application/json, application/xml;q=0.8\nAccept-Encoding: br, gzip\nHTTP/1.1 200 OK\nContent-Type: application/json\nContent-Encoding: gzip\nVary: Accept, Accept-Encoding"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cache HTTP: frescor, reutilização e invalidação",
    "id": "cache-http-frescor-reutilizacao-e-invalidacao"
  },
  {
    "kind": "paragraph",
    "text": "Cache HTTP não é apenas uma otimização de navegador. CDNs, reverse proxies e gateways podem armazenar respostas e atender requisições sem chamar o backend. A RFC 9111 define quando uma resposta pode ser armazenada, considerada fresca, reutilizada ou revalidada. Cache-Control transporta diretivas como max-age, no-cache, no-store, private, public e must-revalidate. `no-cache` não significa “não armazenar”; significa que a resposta precisa ser validada antes de reutilização, salvo regras específicas."
  },
  {
    "kind": "paragraph",
    "text": "A idade de uma resposta considera tempo desde sua geração e permanência em caches. O campo Age informa idade estimada. Caches compartilhados precisam respeitar autorização e diretivas de privacidade. Em APIs bancárias, armazenar respostas personalizadas sem chave de cache adequada pode causar vazamento entre usuários. A chave normalmente inclui URI e dimensões indicadas por Vary, mas gateways podem adicionar regras específicas conforme identidade, tenant ou produto."
  },
  {
    "kind": "paragraph",
    "text": "Invalidar cache é difícil porque cópias podem existir em múltiplos níveis. Estratégias incluem TTL curto, versionamento de URI, purga explícita e revalidação. A escolha precisa equilibrar consistência, custo e disponibilidade. Um backend indisponível pode ser protegido por respostas armazenadas, mas servir informação antiga em operação financeira pode ser inaceitável. Política de cache é uma decisão de domínio, não apenas de desempenho."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-05-etag-revalidation.svg",
    "alt": "Fluxo de revalidação condicional de cache com ETag",
    "caption": "Figura 5 - Revalidação condicional com ETag."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Requisições condicionais e controle de concorrência",
    "id": "requisicoes-condicionais-e-controle-de-concorrencia"
  },
  {
    "kind": "paragraph",
    "text": "Requisições condicionais permitem executar uma operação somente se o estado do recurso satisfizer uma condição. `If-None-Match` é usado para revalidar cache ou garantir criação apenas quando não existe representação atual. `If-Match` exige que a entidade atual corresponda a uma ETag e é útil para evitar lost updates. Campos baseados em data, como If-Modified-Since e If-Unmodified-Since, possuem granularidade e confiabilidade menores que validators opacos."
  },
  {
    "kind": "paragraph",
    "text": "ETag é um identificador da representação selecionada. Uma ETag forte indica equivalência byte a byte adequada a operações como ranges; uma fraca indica equivalência semântica suficiente para determinados usos de cache. Ela não precisa ser hash criptográfico nem revelar versão interna. Gateways que transformam conteúdo podem invalidar a ETag do backend, porque a representação entregue ao cliente deixou de ser a mesma."
  },
  {
    "kind": "paragraph",
    "text": "No controle otimista, o cliente lê uma representação com ETag, altera localmente e envia PUT ou PATCH com If-Match. Se outro ator modificou o recurso, o servidor responde 412 Precondition Failed. Isso evita sobrescrever silenciosamente uma atualização concorrente. A política deve ser implementada no componente que controla o estado de negócio; um gateway pode validar presença e formato, mas não conhece sozinho a versão atual do recurso."
  },
  {
    "kind": "code",
    "text": "GET /accounts/123\n<- ETag: \"v17\"\nPATCH /accounts/123\nIf-Match: \"v17\"\nContent-Type: application/merge-patch+json\n{\"nickname\":\"Reserva\"}\n<- 204 No Content   ou   412 Precondition Failed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/1.1: sintaxe textual e fluxo de bytes",
    "id": "http-1-1-sintaxe-textual-e-fluxo-de-bytes"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 representa mensagens como uma linha inicial, sequência de campos, linha vazia e conteúdo opcional. Linhas são delimitadas por CRLF. Uma requisição começa com método, request-target e versão; uma resposta começa com versão e status. Embora ferramentas exibam mensagens de forma legível, a implementação precisa tratar octetos, limites, espaços e caracteres proibidos conforme a especificação. Tolerância excessiva a mensagens inválidas é uma fonte recorrente de inconsistência entre intermediários."
  },
  {
    "kind": "paragraph",
    "text": "O receptor precisa determinar onde termina cada mensagem em uma conexão persistente. TCP entrega um fluxo sem fronteiras de mensagem: um `recv()` pode retornar parte de uma linha, várias linhas ou dados de mensagens consecutivas. O parser HTTP acumula bytes, reconhece a seção de campos e aplica regras de framing. A conexão não pode simplesmente usar “fim do pacote” como limite, pois pacotes IP e segmentos TCP são detalhes inferiores que podem ser divididos ou combinados."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs, limites de tamanho para linha inicial, campos e conteúdo existem em clientes, WAFs, gateways e servidores. Um campo aceito pela borda pode ser rejeitado pelo gateway; um payload permitido pelo gateway pode exceder o backend. Configurações precisam ser coordenadas. Erros 400, 413, 414 e 431 ajudam a diferenciar requisição malformada, conteúdo grande, URI longa e campos excessivos."
  },
  {
    "kind": "code",
    "text": "HTTP-message = start-line CRLF\n               *( field-line CRLF )\n               CRLF\n               [ message-body ]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Framing em HTTP/1.1: Content-Length, chunked e ausência de corpo",
    "id": "framing-em-http-1-1-content-length-chunked-e-ausencia-de-corpo"
  },
  {
    "kind": "paragraph",
    "text": "Content-Length informa o tamanho do conteúdo em octetos. Quando válido, o receptor lê exatamente essa quantidade após a linha vazia. `Transfer-Encoding: chunked` codifica o conteúdo em blocos, cada um precedido pelo tamanho hexadecimal, e termina com chunk zero e trailers opcionais. Chunked permite transmitir sem conhecer o tamanho total antecipadamente, mas é mecanismo hop-by-hop e não aparece em HTTP/2 ou HTTP/3."
  },
  {
    "kind": "paragraph",
    "text": "Nem toda resposta possui corpo. Respostas a HEAD não incluem conteúdo, embora os campos descrevam o que uma GET teria retornado. Códigos 1xx, 204 e 304 possuem regras específicas sem conteúdo. Respostas bem-sucedidas a CONNECT mudam a conexão para modo túnel. Em outros casos, o encerramento da conexão pode delimitar a resposta, mas isso impede reutilização e é menos robusto."
  },
  {
    "kind": "paragraph",
    "text": "Múltiplos Content-Length com valores diferentes, combinação indevida de Content-Length e Transfer- Encoding ou sintaxe chunked inválida precisam ser tratados como erro. Se um proxy e um backend escolhem regras diferentes, eles podem discordar sobre onde termina a requisição. O resultado pode variar de corrupção de conexão a request smuggling. A estratégia segura é parsing estrito e normalização consistente antes de encaminhar."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-06-http1-framing.svg",
    "alt": "Formas de delimitar o conteúdo de mensagens no HTTP/1.1",
    "caption": "Figura 6 - Duas formas comuns de delimitar conteúdo em HTTP/1.1."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Determinação de comprimento em HTTP/1.1.",
    "headers": [
      "Situação",
      "Como o comprimento é determinado",
      "Observação"
    ],
    "rows": [
      [
        "Resposta a HEAD",
        "Sem conteúdo",
        "Campos podem descrever uma GET equivalente."
      ],
      [
        "1xx, 204, 304",
        "Sem conteúdo",
        "Framing não deve inventar body."
      ],
      [
        "CONNECT 2xx",
        "Túnel após cabeçalhos",
        "Bytes seguintes não são mensagens HTTP comuns."
      ],
      [
        "Transfer-Encoding final chunked",
        "Chunks até tamanho zero",
        "Trailers podem seguir o chunk zero."
      ],
      [
        "Content-Length válido",
        "Número exato de octetos",
        "Valores conflitantes são erro."
      ],
      [
        "Resposta sem framing explícito",
        "Até fechar conexão",
        "Não reutilizável e suscetível a truncamento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Conexões persistentes, reuso, pooling e timeouts",
    "id": "conexoes-persistentes-reuso-pooling-e-timeouts"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 utiliza conexões persistentes por padrão. Após uma resposta, cliente e servidor podem reutilizar o TCP/TLS para novas requisições, reduzindo handshakes e latência. Reuso só é seguro quando a mensagem anterior foi completamente delimitada e consumida. Se um cliente abandona um corpo sem ler, a conexão pode ficar desalinhada para a próxima transação."
  },
  {
    "kind": "paragraph",
    "text": "Gateways mantêm pools de conexões para backends. O pool separa a conexão do cliente da conexão upstream: centenas de clientes podem compartilhar um conjunto de conexões persistentes, conforme concorrência e capacidade. Parâmetros relevantes incluem máximo por destino, tempo ocioso, tempo de vida, connect timeout, read timeout e validação antes do reuso. Um load balancer pode encerrar conexões ociosas antes do gateway, causando resets ao reutilizar sockets aparentemente válidos."
  },
  {
    "kind": "paragraph",
    "text": "Timeouts devem formar um orçamento coerente. O cliente precisa esperar mais que a borda; a borda, mais que o gateway; o gateway, tempo suficiente para o backend, mas menor que o limite total do consumidor. Se todos usam o mesmo valor, componentes podem expirar simultaneamente e produzir tempestades de retry. Logs precisam distinguir tempo de conexão, envio, espera pelo primeiro byte e leitura do conteúdo."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Timeouts e limites de conexão.",
    "headers": [
      "Parâmetro",
      "O que limita",
      "Sintoma quando inadequado"
    ],
    "rows": [
      [
        "Connect timeout",
        "Estabelecimento TCP/TLS ao upstream",
        "Falha rápida ou espera excessiva antes de enviar."
      ],
      [
        "Read/response timeout",
        "Espera por resposta ou dados",
        "504 mesmo quando backend conclui depois."
      ],
      [
        "Idle timeout",
        "Tempo sem tráfego em conexão reutilizável",
        "RST ao reutilizar conexão encerrada por outro salto."
      ],
      [
        "Max lifetime",
        "Vida total da conexão",
        "Ajuda a renovar DNS e distribuir conexões."
      ],
      [
        "Pool size",
        "Conexões simultâneas por destino",
        "Fila local, latência ou excesso de sockets."
      ],
      [
        "Request timeout total",
        "Orçamento da operação",
        "Precisa incluir políticas e todos os saltos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Pipelining e head-of-line blocking no HTTP/1.1",
    "id": "pipelining-e-head-of-line-blocking-no-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "Pipelining permite enviar várias requisições em uma conexão sem aguardar cada resposta. Entretanto, as respostas precisam ser emitidas na mesma ordem. Se a primeira requisição demora, respostas prontas das seguintes ficam retidas. Esse bloqueio é conhecido como head-of-line no nível de HTTP/1.1. A complexidade de retries, servidores intermediários e implementações inconsistentes limitou a adoção prática do pipelining."
  },
  {
    "kind": "paragraph",
    "text": "Clientes frequentemente contornaram o problema abrindo múltiplas conexões paralelas por origem. Isso aumenta handshakes, uso de portas, filas de congestionamento e pressão em balanceadores. Para APIs, múltiplas conexões podem distribuir carga de forma diferente de uma conexão HTTP/2 com muitos streams. Métricas baseadas apenas em “conexões ativas” deixam de representar corretamente a concorrência quando versões coexistem."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 foi projetado para multiplexar requisições independentes sem impor ordenação global de respostas. Ainda assim, todos os frames viajam sobre um fluxo TCP, portanto uma perda de segmento pode atrasar a entrega de bytes posteriores de todos os streams. HTTP/3 move o isolamento de streams para o transporte QUIC."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-07-http1-hol.svg",
    "alt": "Bloqueio head-of-line em respostas de pipelining HTTP/1.1",
    "caption": "Figura 7 - Head-of-line no pipelining HTTP/1.1."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Intermediários, campos hop-by-hop e transformação",
    "id": "intermediarios-campos-hop-by-hop-e-transformacao"
  },
  {
    "kind": "paragraph",
    "text": "Proxy é um participante HTTP que recebe uma mensagem e encaminha outra. Ele pode selecionar o próximo destino, aplicar autenticação, transformar conteúdo, armazenar cache ou registrar telemetria. Um gateway atua como intermediário com políticas orientadas à API. A mensagem de saída não precisa ser byte a byte igual à entrada, mas precisa preservar a semântica definida e cumprir requisitos de segurança."
  },
  {
    "kind": "paragraph",
    "text": "Campos hop-by-hop pertencem a uma única conexão e não devem ser encaminhados automaticamente. Em HTTP/1.1, Connection declara opções aplicáveis ao salto; TE possui uso restrito; Transfer-Encoding e Upgrade descrevem a conexão atual. HTTP/2 e HTTP/3 removem ou substituem esses conceitos. Um gateway traduz framing, e não deve enviar `Transfer-Encoding: chunked` em um stream HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "Transformações podem alterar Content-Length, Content-Encoding, ETag, assinatura, cacheabilidade e streaming. Uma policy que converte XML em JSON precisa definir novo Content-Type e recalcular comprimento. Se o gateway faz buffering para validar schema, a primeira resposta pode ficar mais lenta e o consumo de memória crescer com payloads. A arquitetura deve documentar quais transformações são permitidas e em qual salto."
  },
  {
    "kind": "subhead",
    "text": "Regra operacional"
  },
  {
    "kind": "paragraph",
    "text": "Capture a mensagem lógica antes e depois de cada policy relevante. Comparar apenas pacotes da borda com logs do backend ignora as transformações introduzidas no caminho."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Parsing divergente e segurança de mensagens HTTP/1.1",
    "id": "parsing-divergente-e-seguranca-de-mensagens-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "Request smuggling ocorre quando dois participantes interpretam limites de mensagem de forma diferente. Um atacante envia uma sequência ambígua; o primeiro proxy considera uma parte como corpo, enquanto o segundo interpreta bytes restantes como nova requisição. Isso pode contornar controles, envenenar cache, misturar respostas entre usuários ou alcançar rotas não previstas. Variações clássicas exploram conflitos entre Content-Length e Transfer-Encoding, mas o problema geral é desacordo de parsing."
  },
  {
    "kind": "paragraph",
    "text": "Response splitting explora inserção de delimitadores de linha em valores que acabam incorporados a cabeçalhos, criando campos ou respostas adicionais. Implementações precisam rejeitar CR e LF não permitidos. Normalização inconsistente de espaços, nomes e caracteres também pode criar divergências. O princípio é aceitar somente sintaxe válida, rejeitar ambiguidades e evitar encaminhar mensagens parcialmente interpretadas."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 e HTTP/3 possuem framing binário, mas podem participar de ataques quando um intermediário converte mensagens para HTTP/1.1 de forma insegura. Uma requisição H2 pode conter metadados que, ao serem serializados, criam ambiguidades no backend H1. Portanto, segurança exige validação no ponto de tradução, não apenas na borda. Atualizações recentes das especificações também refinam requisitos de Upgrade e dados antecipados; operadores devem acompanhar erratas e RFCs que atualizam o comportamento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-08-request-smuggling.svg",
    "alt": "Request smuggling causado por interpretações divergentes do framing",
    "caption": "Figura 8 - Exemplo conceitual de request smuggling por framing divergente."
  },
  {
    "kind": "subhead",
    "text": "Defesa em profundidade"
  },
  {
    "kind": "paragraph",
    "text": "Use parsers conformes, remova combinações ambíguas, normalize uma única vez, mantenha front- end e back-end atualizados e teste explicitamente traduções H2/H3 para H1."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/2: camada de framing binário",
    "id": "http-2-camada-de-framing-binario"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 é uma expressão otimizada da semântica HTTP. Depois de estabelecida a conexão, os participantes trocam frames binários com cabeçalho fixo que informa comprimento, tipo, flags e stream ID. Frames HEADERS carregam blocos de campos comprimidos; DATA transporta conteúdo; SETTINGS negocia parâmetros; WINDOW_UPDATE controla fluxo; RST_STREAM encerra um stream; GOAWAY inicia encerramento coordenado da conexão."
  },
  {
    "kind": "paragraph",
    "text": "Uma mensagem HTTP é mapeada para uma sequência de frames em um stream. O stream possui identificador e ciclo de vida independente. Requisição e resposta de uma operação usam o mesmo stream. Frames de streams distintos podem ser intercalados, permitindo concorrência sem abrir uma conexão TCP para cada chamada. O receptor reconstrói cada mensagem usando stream ID e flags como END_HEADERS e END_STREAM."
  },
  {
    "kind": "paragraph",
    "text": "O protocolo começa com um connection preface e troca de SETTINGS. Parâmetros incluem tamanho da tabela de campos, número máximo de streams simultâneos, tamanho inicial da janela e tamanho máximo de frame. SETTINGS precisa ser confirmado. Configurações são direcionais: o que um endpoint anuncia limita o comportamento do peer ao enviar para ele."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-09-http2-streams.svg",
    "alt": "Frames de diferentes streams intercalados em uma conexão HTTP/2",
    "caption": "Figura 9 - Frames de vários streams compartilhando uma conexão HTTP/2."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Frames importantes do HTTP/2.",
    "headers": [
      "Frame",
      "Escopo",
      "Finalidade"
    ],
    "rows": [
      [
        "DATA",
        "Stream",
        "Conteúdo da mensagem e possível END STREAM."
      ],
      [
        "HEADERS",
        "Stream",
        "Bloco inicial ou trailers comprimidos."
      ],
      [
        "SETTINGS",
        "Conexão",
        "Parâmetros e capacidades direcionais."
      ],
      [
        "WINDOW UPDATE",
        "Conexão ou stream",
        "Aumentar crédito de controle de fluxo."
      ],
      [
        "RST STREAM",
        "Stream",
        "Abortar operação específica."
      ],
      [
        "PING",
        "Conexão",
        "Medir vivacidade/RTT sem semântica HTTP."
      ],
      [
        "GOAWAY",
        "Conexão",
        "Parar novos streams e drenar os existentes."
      ],
      [
        "PRIORITY UPDATE",
        "Stream",
        "Sinalizar prioridade pelo modelo extensível atual."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Streams, estados e encerramento",
    "id": "streams-estados-e-encerramento"
  },
  {
    "kind": "paragraph",
    "text": "Streams podem estar idle, open, half-closed, reserved ou closed, conforme frames enviados e recebidos. END_STREAM fecha a direção do remetente, permitindo que a outra direção continue. RST_STREAM encerra imediatamente o stream e informa um código de erro. Erros de stream não precisam derrubar a conexão inteira; erros de conexão exigem GOAWAY e encerramento."
  },
  {
    "kind": "paragraph",
    "text": "GOAWAY contém o maior stream ID que pode ter sido processado e um código de erro. O peer não deve criar novos streams na conexão e pode repetir operações de streams acima do limite, considerando idempotência. Em deploys e draining, gateways devem emitir GOAWAY e permitir conclusão de streams aceitos. Encerrar TCP abruptamente transforma uma manutenção planejada em falhas indistinguíveis de rede."
  },
  {
    "kind": "paragraph",
    "text": "O número de streams concorrentes é limitado por SETTINGS_MAX_CONCURRENT_STREAMS e por recursos locais. Um cliente pode manter uma conexão, mas ficar bloqueado aguardando crédito para abrir novo stream. Métricas devem mostrar streams ativos, pendentes e rejeitados, não apenas conexões. Um único cliente com HTTP/2 pode gerar alta concorrência por uma conexão."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Eventos de ciclo de vida em HTTP/2.",
    "headers": [
      "Evento",
      "Efeito",
      "Decisão operacional"
    ],
    "rows": [
      [
        "END STREAM em requisição",
        "Cliente terminou conteúdo.",
        "Gateway pode iniciar processamento completo ou streaming."
      ],
      [
        "END STREAM em resposta",
        "Servidor terminou mensagem.",
        "Stream pode fechar se ambas direções terminaram."
      ],
      [
        "RST STREAM",
        "Cancela stream específico.",
        "Registrar iniciador e código; efeito de negócio pode já existir."
      ],
      [
        "GOAWAY NO ERROR",
        "Drenagem coordenada.",
        "Abrir nova conexão para novos streams."
      ],
      [
        "GOAWAY com erro",
        "Falha da conexão.",
        "Avaliar retries por stream e idempotência."
      ],
      [
        "Limite de streams",
        "Novas operações aguardam.",
        "Aumentar conexões ou ajustar concorrência com cautela."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Multiplexação, controle de fluxo e pressão de memória",
    "id": "multiplexacao-controle-de-fluxo-e-pressao-de-memoria"
  },
  {
    "kind": "paragraph",
    "text": "Multiplexação permite intercalar frames, mas não elimina a necessidade de backpressure. HTTP/2 aplica controle de fluxo a DATA no nível de conexão e de stream. O receptor anuncia crédito; à medida que consome bytes, envia WINDOW_UPDATE. Se a aplicação não lê um stream, sua janela pode zerar. Se a janela da conexão zera, todos os streams ficam impedidos de enviar DATA, mesmo que alguns consumidores estejam rápidos."
  },
  {
    "kind": "paragraph",
    "text": "Controle de fluxo não é o mesmo que congestion control TCP. O primeiro protege buffers do receptor e da aplicação; o segundo adapta envio à capacidade da rede. Ambos atuam simultaneamente. Aumentar janelas pode melhorar throughput em caminhos de alto bandwidth-delay product, mas aumenta memória potencial. Gateways precisam limitar streams, frames, campos e conteúdo para evitar que poucos clientes monopolizem recursos."
  },
  {
    "kind": "paragraph",
    "text": "O HTTP/2 original possuía um mecanismo de dependência e peso para prioridades que se mostrou difícil de implementar de forma interoperável. A especificação atual remove o modelo antigo do núcleo e permite um esquema extensível. Operadores não devem presumir que prioridade do cliente será honrada fim a fim, principalmente quando existem proxies que reordenam ou convertem protocolos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-10-multiplexing-hol.svg",
    "alt": "Multiplexação HTTP/2 e bloqueio residual causado por perda TCP",
    "caption": "Figura 10 - Multiplexação HTTP/2 e bloqueio residual causado pelo TCP."
  },
  {
    "kind": "subhead",
    "text": "Sintoma clássico"
  },
  {
    "kind": "paragraph",
    "text": "Conexão TCP saudável, ping HTTP/2 respondendo e alguns streams parados podem indicar janela de fluxo esgotada ou aplicação que deixou de consumir conteúdo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HPACK: compressão de campos com estado por conexão",
    "id": "hpack-compressao-de-campos-com-estado-por-conexao"
  },
  {
    "kind": "paragraph",
    "text": "APIs repetem campos como método, esquema, host, tipo de conteúdo e autenticação. Enviá-los integralmente em cada requisição aumenta overhead. HPACK comprime blocos de campos usando uma tabela estática de entradas comuns, uma tabela dinâmica construída durante a conexão, representações literais e codificação Huffman. Uma entrada repetida pode ser referenciada por índice em vez de retransmitir nome e valor."
  },
  {
    "kind": "paragraph",
    "text": "A tabela dinâmica é direcional e sincronizada pela ordem dos blocos na conexão. O encoder decide quais valores inserir; o decoder mantém a mesma sequência. Alterar tamanho de tabela ou receber índice inválido pode gerar erro de compressão e encerrar a conexão. Intermediários terminam HPACK: o gateway decodifica campos do cliente e cria sua própria codificação na conexão com o backend."
  },
  {
    "kind": "paragraph",
    "text": "Campos sensíveis, como Authorization ou cookies, não devem ser indexados quando isso aumenta risco ou retenção. HPACK inclui representação “never indexed”. Compressão também interage com ataques de canal lateral quando segredos e dados controlados compartilham contexto. Limites de tamanho de lista de campos continuam necessários, porque uma representação compacta pode expandir para muitos metadados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-11-hpack.svg",
    "alt": "Blocos de campos, tabelas estática e dinâmica e representação compacta do HPACK",
    "caption": "Figura 11 - Componentes conceituais do HPACK."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Negociação: TLS, ALPN, h2 e h2c",
    "id": "negociacao-tls-alpn-h2-e-h2c"
  },
  {
    "kind": "paragraph",
    "text": "Na Web segura, HTTP/2 é normalmente negociado durante TLS por ALPN. O cliente anuncia protocolos, por exemplo `h2` e `http/1.1`; o servidor seleciona um e informa no handshake. Isso evita enviar uma requisição no formato errado. O certificado e o nome ainda precisam ser válidos para a origem. Depois de selecionado h2, o cliente envia o preface e frames HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 também pode operar sem TLS usando o identificador h2c, com conhecimento prévio ou Upgrade de HTTP/1.1, mas esse modo é menos comum em tráfego público. Em redes internas, alguns componentes usam h2c para gRPC, enquanto TLS termina em sidecar ou gateway. Essa decisão reduz criptografia em um salto e precisa ser avaliada conforme confiança, compliance e observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Connection coalescing permite que uma conexão HTTP/2 seja reutilizada para múltiplas origens quando requisitos de resolução, certificado e autoridade são atendidos. Isso melhora eficiência, mas pode surpreender balanceamento baseado em conexão. Gateways e CDNs precisam impedir que autoridade não autorizada seja atendida na conexão. Origem lógica continua determinada pela semântica, não apenas pelo endereço IP conectado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-12-alpn.svg",
    "alt": "Negociação de HTTP/2 ou HTTP/1.1 por ALPN durante o handshake TLS",
    "caption": "Figura 12 - Negociação do protocolo de aplicação com ALPN."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTP/3: semântica HTTP sobre QUIC",
    "id": "http-3-semantica-http-sobre-quic"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 mapeia a semântica HTTP para QUIC. QUIC é um transporte orientado a conexão encapsulado em UDP, com streams, controle de fluxo, detecção de perda, congestion control, segurança e migração de caminho. TLS 1.3 é integrado ao handshake; não existe modo HTTP/3 sem proteção criptográfica conforme a especificação. A aplicação vê streams confiáveis e ordenados individualmente, não datagramas UDP crus."
  },
  {
    "kind": "paragraph",
    "text": "Assim como HTTP/2, HTTP/3 usa frames HEADERS e DATA, mas os frames viajam em streams QUIC. Cada requisição usa um stream bidirecional iniciado pelo cliente. Streams unidirecionais transportam controle e QPACK. Funções que QUIC já oferece, como stream ID e controle de fluxo, não são duplicadas pela camada HTTP. Por isso, alguns frames e mecanismos do HTTP/2 desaparecem ou mudam."
  },
  {
    "kind": "paragraph",
    "text": "Usar UDP não significa que HTTP/3 seja não confiável. QUIC implementa confirmação, retransmissão e ordenação por stream. A diferença é que essas funções estão em espaço de usuário, integradas à criptografia e capazes de evoluir sem depender da implementação TCP do sistema operacional. Firewalls e middleboxes que bloqueiam UDP podem impedir QUIC, exigindo fallback para HTTP/2 ou HTTP/1.1."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-13-protocol-stacks.svg",
    "alt": "Comparação das pilhas HTTP/1.1, HTTP/2 e HTTP/3",
    "caption": "Figura 13 - Pilhas simplificadas de HTTP/1.1, HTTP/2 e HTTP/3."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 não é “HTTP/2 sobre UDP”. Ele reutiliza ideias de streams e frames, mas delega ao QUIC propriedades que no HTTP/2 dependem de TCP e TLS separados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Handshake QUIC, TLS 1.3 e 0-RTT",
    "id": "handshake-quic-tls-1-3-e-0-rtt"
  },
  {
    "kind": "paragraph",
    "text": "O handshake QUIC negocia parâmetros de transporte e executa TLS 1.3. Em uma conexão nova, o cliente pode enviar um pacote Initial contendo dados do ClientHello; o servidor responde e as chaves evoluem por níveis de criptografia. Em condições normais, dados de aplicação podem ser enviados com baixa quantidade de round trips. O QUIC protege quase todo o conteúdo de controle, reduzindo a visibilidade passiva disponível a middleboxes."
  },
  {
    "kind": "paragraph",
    "text": "Em conexões retomadas, 0-RTT pode permitir que o cliente envie dados de aplicação antes de confirmar completamente o novo handshake. Esses dados não possuem a mesma proteção contra replay que dados 1-RTT. Servidores devem aceitar 0-RTT apenas para operações seguras contra repetição ou aplicar mecanismos de anti-replay e idempotência. Um POST financeiro não deve ser considerado seguro apenas porque usa TLS."
  },
  {
    "kind": "paragraph",
    "text": "QUIC aplica proteção contra amplificação antes de validar o endereço do cliente: o servidor limita bytes enviados em relação aos recebidos. Tokens Retry podem ajudar a validar origem e controlar abuso, ao custo de round trip adicional. Gateways na borda precisam dimensionar estado de handshakes, limites e proteção DoS sem tratar todo UDP como tráfego sem sessão."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Etapas relevantes do estabelecimento QUIC.",
    "headers": [
      "Fase",
      "Proteção / propriedade",
      "Risco operacional"
    ],
    "rows": [
      [
        "Initial",
        "Chaves deriváveis para permitir roteamento e início do handshake.",
        "Não confundir com ausência de integridade; conteúdo não é segredo forte contra observador."
      ],
      [
        "Handshake",
        "TLS autentica e negocia chaves finais.",
        "Perda ou bloqueio de UDP aparece como falha antes de HTTP."
      ],
      [
        "1-RTT",
        "Dados normais protegidos.",
        "Streams e controle de fluxo ativos."
      ],
      [
        "0-RTT",
        "Dados antecipados em retomada.",
        "Possível replay; restringir operações."
      ],
      [
        "Retry",
        "Validação adicional de endereço.",
        "Aumenta latência, reduz amplificação e estado abusivo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Streams QUIC e eliminação do head-of-line entre streams",
    "id": "streams-quic-e-eliminacao-do-head-of-line-entre-streams"
  },
  {
    "kind": "paragraph",
    "text": "Cada stream QUIC oferece entrega confiável e ordenada dentro do próprio stream. Pacotes podem carregar frames de vários streams. Se um pacote com dados do stream B se perde, o receptor pode continuar entregando dados completos dos streams A e C. Apenas o ponto faltante de B impede avanço ordenado daquele stream. Isso elimina o bloqueio transversal causado pelo fluxo único TCP em HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "A melhoria não elimina todo bloqueio. Um stream continua ordenado; perder bytes iniciais impede entregar bytes posteriores do mesmo stream. Controle de fluxo da conexão também pode bloquear todos os streams se o receptor não concede crédito. Dependências de QPACK podem suspender a decodificação de um bloco de campos. Portanto, métricas e traces precisam distinguir perda de pacote, stream bloqueado por dados, stream bloqueado por campos e janela de conexão."
  },
  {
    "kind": "paragraph",
    "text": "QUIC numera dados e confirma pacotes, mas retransmite informação em novos pacotes, não “o mesmo pacote”. Packet numbers nunca são reutilizados no mesmo espaço. Detecção de perda e congestion control foram especificados em documentos associados. A implementação em espaço de usuário permite evolução, mas também exige observabilidade específica da biblioteca ou proxy que termina QUIC."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-14-quic-loss-isolation.svg",
    "alt": "Isolamento de perda entre streams de uma conexão QUIC",
    "caption": "Figura 14 - Isolamento de perda entre streams QUIC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Connection IDs, NAT rebinding e migração de caminho",
    "id": "connection-ids-nat-rebinding-e-migracao-de-caminho"
  },
  {
    "kind": "paragraph",
    "text": "TCP identifica uma conexão pelo conjunto de endereços e portas. Se um dispositivo móvel muda de Wi- Fi para rede celular, a tupla muda e a conexão normalmente se perde. QUIC utiliza Connection IDs escolhidos pelos endpoints, permitindo associar pacotes de um novo caminho à conexão existente. O novo caminho é validado com desafios antes de ser usado plenamente."
  },
  {
    "kind": "paragraph",
    "text": "Connection IDs também permitem que balanceadores encaminhem pacotes sem depender exclusivamente da tupla. O desenho precisa considerar privacidade e evitar que um identificador estável permita rastreamento entre redes; endpoints podem fornecer múltiplos IDs e aposentá-los. Gateways e load balancers QUIC-aware precisam coordenar roteamento, chaves de retry/reset e afinidade."
  },
  {
    "kind": "paragraph",
    "text": "Migração não é garantia de continuidade em qualquer ambiente. Políticas podem desabilitá-la; firewalls podem bloquear o novo caminho; o servidor pode exigir validação; mudanças de MTU e RTT alteram desempenho. Logs devem registrar migração e path validation para diferenciar troca legítima de rede de instabilidade ou ataque."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-15-quic-migration.svg",
    "alt": "Migração de caminho QUIC com Connection IDs e validação do novo endereço",
    "caption": "Figura 15 - Validação e migração de caminho em QUIC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Frames e streams de controle no HTTP/3",
    "id": "frames-e-streams-de-controle-no-http-3"
  },
  {
    "kind": "paragraph",
    "text": "Uma conexão HTTP/3 possui um stream de controle por endpoint. Nele são enviados SETTINGS, GOAWAY e outros frames de controle. Fechar prematuramente o stream de controle é erro de conexão. Requisições usam streams bidirecionais do cliente; cada uma carrega HEADERS, DATA e trailers conforme permitido. Frames de uma mensagem não podem aparecer em qualquer ordem arbitrária."
  },
  {
    "kind": "paragraph",
    "text": "Como QUIC fornece controle de fluxo e reset de stream, HTTP/3 utiliza mecanismos de transporte para parte do ciclo de vida. Erros possuem códigos HTTP/3 e QUIC. Um cancelamento pode envolver reset do envio e pedido para interromper a direção oposta. Observabilidade deve associar stream QUIC, requisição HTTP e correlação de aplicação, pois um único connection ID pode carregar muitas operações."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 remove recursos de HTTP/2 que dependiam do fluxo TCP, mas preserva o conceito de drenagem. GOAWAY limita novos streams de requisição aceitos. Em deploy, a borda deve anunciar encerramento, manter a conexão enquanto operações permitidas terminam e direcionar novas chamadas a outra conexão. Fechar UDP state abruptamente causa perda de todas as operações ativas."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Estrutura básica de uma conexão HTTP/3.",
    "headers": [
      "Elemento HTTP/3",
      "Transporte",
      "Uso"
    ],
    "rows": [
      [
        "Request stream",
        "QUIC bidirecional iniciado pelo cliente",
        "Uma requisição e sua resposta."
      ],
      [
        "Control stream",
        "QUIC unidirecional por endpoint",
        "SETTINGS, GOAWAY e controle HTTP."
      ],
      [
        "QPACK encoder stream",
        "QUIC unidirecional",
        "Atualizações da tabela dinâmica."
      ],
      [
        "QPACK decoder stream",
        "QUIC unidirecional",
        "Confirmações e cancelamentos."
      ],
      [
        "HEADERS",
        "Frame HTTP/3",
        "Campos iniciais ou trailers."
      ],
      [
        "DATA",
        "Frame HTTP/3",
        "Conteúdo da mensagem."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "QPACK: compressão de campos adequada a streams QUIC",
    "id": "qpack-compressao-de-campos-adequada-a-streams-quic"
  },
  {
    "kind": "paragraph",
    "text": "HPACK depende da ordem única da conexão TCP para sincronizar a tabela dinâmica. Em QUIC, streams podem ser entregues independentemente; uma atualização de tabela perdida não deve bloquear desnecessariamente todos os streams. QPACK usa streams unidirecionais de encoder e decoder para transmitir instruções e confirmações, permitindo que blocos de campos em request streams façam referências controladas."
  },
  {
    "kind": "paragraph",
    "text": "Um bloco pode depender de entradas ainda não recebidas e ficar bloqueado até que as instruções cheguem. O decoder anuncia limites para número de streams bloqueados, e o encoder escolhe entre melhor compressão e risco de bloqueio. Representações literais e tabela estática permitem evitar dependências. Assim como no HPACK, valores sensíveis podem ser marcados para não indexação."
  },
  {
    "kind": "paragraph",
    "text": "Gateways terminam QPACK e criam novo contexto na conexão seguinte. Uma falha de QPACK é erro de conexão e pode afetar muitas requisições. Monitorar apenas status HTTP não revela essa classe de falha, porque a mensagem pode não chegar a ser reconstruída. Logs do terminador HTTP/3 precisam expor códigos de erro de decompression e streams bloqueados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-16-qpack.svg",
    "alt": "Fluxos de encoder, decoder, requisições e tabela dinâmica no QPACK",
    "caption": "Figura 16 - Fluxos conceituais do QPACK."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Descoberta de HTTP/3, Alt-Svc, HTTPS/SVCB e fallback",
    "id": "descoberta-de-http-3-alt-svc-https-svcb-e-fallback"
  },
  {
    "kind": "paragraph",
    "text": "Um cliente precisa saber que a origem oferece HTTP/3 e em qual endpoint. A RFC 9114 define anúncio por Alternative Services: uma resposta HTTP/1.1 ou HTTP/2 pode incluir `Alt-Svc: h3=\":443\"`. O cliente armazena a alternativa por tempo limitado e tenta QUIC. DNS também pode fornecer registros HTTPS/SVCB com parâmetros de protocolo e endpoint. Suporte varia entre clientes e infraestrutura."
  },
  {
    "kind": "paragraph",
    "text": "A origem lógica permanece a mesma, ainda que o serviço alternativo esteja em outro host ou porta. O cliente precisa validar a autoridade e certificado conforme as regras. Alt-Svc não é redirecionamento de aplicação e não altera a URI exibida. Se a tentativa QUIC falha, clientes normalmente continuam ou retornam a HTTP/2/1.1, mas detalhes de temporização e cache de falha dependem da implementação."
  },
  {
    "kind": "paragraph",
    "text": "Em troubleshooting, confirme se o cliente recebeu anúncio, se tentou UDP, se ALPN h3 foi negociado e se ocorreu fallback. Uma captura apenas do tráfego TCP pode mostrar a chamada funcionando e esconder tentativas QUIC malsucedidas. Bloquear UDP/443 pode aumentar latência inicial mesmo quando fallback mantém disponibilidade. Registros HTTPS/SVCB incorretos podem direcionar clientes modernos a endpoint diferente do usado por clientes legados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-17-http3-discovery.svg",
    "alt": "Descoberta, tentativa QUIC e fallback para HTTP/2 ou HTTP/1.1",
    "caption": "Figura 17 - Descoberta, tentativa e fallback de HTTP/3."
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 200 OK\nAlt-Svc: h3=\":443\"; ma=86400\n# O cliente pode tentar uma conexão QUIC para a mesma origem na porta 443."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Comparação arquitetural entre HTTP/1.1, HTTP/2 e HTTP/3",
    "id": "comparacao-arquitetural-entre-http-1-1-http-2-e-http-3"
  },
  {
    "kind": "paragraph",
    "text": "Escolher uma versão não é apenas buscar “a mais nova”. HTTP/1.1 possui ampla compatibilidade e observabilidade simples, mas exige mais conexões para concorrência e sofre bloqueio sequencial. HTTP/2 reduz overhead e permite muitos streams em uma conexão, sendo essencial para gRPC, porém concentra operações em um TCP e exige métricas de stream e fluxo. HTTP/3 melhora comportamento sob perda e mobilidade, mas depende de UDP, termina criptografia no componente que precisa interpretar HTTP e muda práticas de rede."
  },
  {
    "kind": "paragraph",
    "text": "Ganhos dependem do perfil. Em rede estável e baixa latência, uma API pequena pode mostrar diferença modesta. Em conexões móveis com perda, HTTP/3 pode reduzir impacto entre streams e preservar conexão durante mudança de caminho. Em uma arquitetura corporativa com muitos intermediários, o benefício fim a fim pode ser reduzido se a borda recebe H3, mas o restante usa H1.1 com pools saturados."
  },
  {
    "kind": "paragraph",
    "text": "Protocolos também afetam capacidade. Dez mil requisições podem usar milhares de conexões H1, centenas de conexões H2 ou H3, dependendo de concorrência e limites. Balanceamento por conexões fica menos representativo em multiplexação. Um único cliente pode concentrar streams em uma instância. Algoritmos, limites e observabilidade precisam evoluir com o protocolo."
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - Comparação resumida das versões.",
    "headers": [
      "Aspecto",
      "HTTP/1.1",
      "HTTP/2",
      "HTTP/3"
    ],
    "rows": [
      [
        "Transporte",
        "TCP; TLS separado em HTTPS",
        "TCP; normalmente TLS + ALPN",
        "QUIC sobre UDP; TLS 1.3 integrado"
      ],
      [
        "Formato",
        "Linhas e campos textuais",
        "Frames binários",
        "Frames sobre streams QUIC"
      ],
      [
        "Concorrência",
        "Sequencial/pipeline; várias conexões",
        "Streams multiplexados",
        "Streams multiplexados isolados por perda"
      ],
      [
        "Compressão de campos",
        "Não padronizada no protocolo",
        "HPACK",
        "QPACK"
      ],
      [
        "HOL",
        "No HTTP e no TCP",
        "Elimina HOL HTTP; mantém TCP HOL",
        "Perda bloqueia somente stream afetado"
      ],
      [
        "Migração de rede",
        "Conexão geralmente quebra",
        "Conexão geralmente quebra",
        "Connection IDs e path validation"
      ],
      [
        "Observabilidade passiva",
        "Mais simples após TLS termination",
        "Frames após TLS termination",
        "Mais controle criptografado; exige terminador QUIC"
      ],
      [
        "Compatibilidade",
        "Máxima",
        "Ampla em browsers/proxies modernos",
        "Depende de UDP e suporte da borda"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "API Gateways e tradução de protocolo por salto",
    "id": "api-gateways-e-traducao-de-protocolo-por-salto"
  },
  {
    "kind": "paragraph",
    "text": "Em uma cadeia corporativa, cada componente pode negociar sua própria versão. Um cliente usa HTTP/3 com uma CDN; a CDN usa HTTP/2 com o API Gateway; o gateway usa HTTP/1.1 com o backend. A semântica precisa ser preservada, mas framing, compressão, multiplexação e conexão são reconstruídos. Não existe stream H3 “atravessando” um gateway que termina HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Tradução muda comportamento. Muitas requisições multiplexadas de uma conexão H2 podem exigir várias conexões H1 ao backend ou ser serializadas conforme pool. Trailers podem ser perdidos se o próximo protocolo ou produto não os preserva. Um reset de stream pode virar cancelamento de socket, enquanto o backend já processou a operação. GOAWAY de um lado não tem correspondência direta em uma conexão independente do outro lado."
  },
  {
    "kind": "paragraph",
    "text": "Políticas devem ser semânticas. Rate limiting por conexão é inadequado quando uma conexão contém centenas de streams. Limites de payload precisam considerar tamanho descomprimido. Cache deve usar autoridade e Vary corretos. Observabilidade precisa registrar versão inbound, versão outbound, reutilização, stream ID quando disponível, tentativa de retry e status criado pelo gateway."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-18-protocol-per-hop.svg",
    "alt": "Versões HTTP negociadas independentemente em cada salto da arquitetura",
    "caption": "Figura 18 - Versões HTTP independentes em cada salto da arquitetura."
  },
  {
    "kind": "subhead",
    "text": "Pergunta de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Qual é a versão negociada em cada conexão real: cliente-borda, borda-gateway, gateway-mesh e mesh-backend? A resposta “a API usa HTTP/2” normalmente é incompleta."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicação em Axway API Gateway",
    "id": "aplicacao-em-axway-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "O Axway API Gateway utiliza serviços HTTP para receber tráfego e configurações de remote hosts para conexões de saída. Em um desenho real, listener, interface, TLS, política, roteamento e configurações do destino participam de saltos distintos. A investigação deve separar a versão e os campos recebidos pelo listener do que é produzido na conexão com o remote host. A documentação e a versão instalada precisam ser consultadas, pois capacidades e padrões podem variar por release."
  },
  {
    "kind": "paragraph",
    "text": "Ao encaminhar para um backend, conexão persistente e pooling influenciam latência, distribuição e consumo de sockets. Configurações legadas podem usar comportamentos conservadores de HTTP, e equipes devem validar explicitamente a versão outbound desejada. Transformações e filtros podem alterar conteúdo, campos e streaming. Transaction Access Logs e tracing de políticas devem registrar status final, tempo de conexão, tempo de resposta e erro de roteamento."
  },
  {
    "kind": "paragraph",
    "text": "Um cenário frequente é o cliente observar HTTP/2 na borda, mas o backend registrar HTTP/1.0 ou HTTP/1.1. Isso não é necessariamente erro; pode ser decisão ou default do salto outbound. O risco surge quando a aplicação depende de trailers, streaming ou concorrência que não sobrevive à tradução. Testes devem cobrir o protocolo efetivo, não apenas o endpoint público."
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - Evidências para investigar HTTP no Axway API Gateway.",
    "headers": [
      "Ponto de verificação",
      "Evidência",
      "Pergunta"
    ],
    "rows": [
      [
        "HTTP service/listener",
        "Configuração da porta, TLS e protocolo",
        "O que o cliente negocia com o gateway?"
      ],
      [
        "Policy flow",
        "Trace de filtros e transformações",
        "Quais campos e conteúdo foram alterados?"
      ],
      [
        "Routing / remote host",
        "Destino, versão, pool e timeout",
        "Como o gateway cria a conexão upstream?"
      ],
      [
        "Access log",
        "status, bytes, tempos, correlação",
        "Quem produziu a resposta e quanto demorou?"
      ],
      [
        "Backend log",
        "protocolo e autoridade observados",
        "O que realmente chegou ao serviço?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicação em Azure API Management",
    "id": "aplicacao-em-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, o gateway recebe chamadas, aplica policies e encaminha a backends. Suporte a HTTP/2 inbound, outbound e gRPC depende do tipo e da geração do gateway, tier e configuração. A policy `forward-request` possui atributo de versão HTTP para cenários suportados. Como a plataforma evolui, a documentação oficial deve ser tratada como fonte de verdade para a instância utilizada."
  },
  {
    "kind": "paragraph",
    "text": "A versão inbound não implica versão outbound. A documentação atual descreve comportamentos em que determinadas gerações aceitam HTTP/2 e podem fazer downgrade no encaminhamento, enquanto outras permitem configurar HTTP/2 para o backend. Isso afeta gRPC, trailers e streaming. Testes devem registrar `context`/traces, diagnóstico do backend e métricas da instância para confirmar o caminho efetivo."
  },
  {
    "kind": "paragraph",
    "text": "Policies como rewrite-uri, set-header, set-body, cache, retry e rate-limit operam sobre a mensagem lógica e podem mudar características observadas. Retry precisa considerar idempotência. Set-body geralmente implica acesso ao conteúdo e pode exigir buffering. Cache deve respeitar identidade e Vary. Ao combinar Application Gateway, Front Door, APIM e backend, cada serviço termina sua própria conexão e pode possuir timeout diferente."
  },
  {
    "kind": "table",
    "caption": "Tabela 13 - Pontos de atenção no Azure API Management.",
    "headers": [
      "Elemento APIM",
      "Impacto HTTP",
      "Validação"
    ],
    "rows": [
      [
        "Protocolos do gateway",
        "Capacidades inbound e TLS",
        "Verificar configuração e tier."
      ],
      [
        "forward-request",
        "Versão e timeout do salto ao backend",
        "Confirmar suporte do gateway utilizado."
      ],
      [
        "Policy de retry",
        "Pode repetir chamada após falha",
        "Classificar método e idempotência."
      ],
      [
        "set-header / rewrite-uri",
        "Altera mensagem encaminhada",
        "Comparar trace com log do backend."
      ],
      [
        "Cache policies",
        "Pode responder sem upstream",
        "Validar chave, TTL e privacidade."
      ],
      [
        "Diagnóstico e telemetry",
        "Distingue policy, gateway e backend",
        "Propagar correlation/trace context."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observabilidade: o que medir em cada versão",
    "id": "observabilidade-o-que-medir-em-cada-versao"
  },
  {
    "kind": "paragraph",
    "text": "Métricas comuns incluem taxa de requisições, status, latência, bytes e erros. Para HTTP/1.1, acrescente conexões abertas, novas conexões por segundo, reuso, pool wait e resets. Para HTTP/2, meça streams ativos por conexão, limite de concorrência, RST_STREAM, GOAWAY, janela de fluxo e erros de compressão. Para HTTP/3, inclua tentativas QUIC, sucesso/fallback, handshake, perda, RTT, migração, streams bloqueados e erros QPACK."
  },
  {
    "kind": "paragraph",
    "text": "Latência deve ser decomposta. DNS, conexão, TLS/QUIC, tempo de policy, espera no pool, tempo até primeiro byte do upstream e transferência do conteúdo respondem a perguntas diferentes. Uma métrica “total” alta não identifica causa. Distributed tracing começa quando existe mensagem HTTP; falhas anteriores podem exigir logs de rede e terminadores. O gateway deve criar ou propagar identificadores de correlação de forma confiável."
  },
  {
    "kind": "paragraph",
    "text": "Capturas de tráfego continuam úteis, mas criptografia limita conteúdo. Em TLS sobre TCP, o terminador pode fornecer key logging em laboratório controlado. QUIC criptografa mais elementos de controle, portanto qlog e métricas da biblioteca são valiosos. Em produção bancária, coleta precisa respeitar dados sensíveis: não registrar tokens, cookies, PAN, payloads ou cabeçalhos completos sem mascaramento e base legal."
  },
  {
    "kind": "table",
    "caption": "Tabela 14 - Observabilidade específica por versão.",
    "headers": [
      "Métrica",
      "HTTP/1.1",
      "HTTP/2",
      "HTTP/3"
    ],
    "rows": [
      [
        "Unidade de concorrência",
        "Conexão / requisição",
        "Stream",
        "Stream QUIC"
      ],
      [
        "Encerramento coordenado",
        "Connection: close / FIN",
        "GOAWAY + streams",
        "GOAWAY + fechamento QUIC"
      ],
      [
        "Cancelamento",
        "Fechar conexão pode afetar outras chamadas",
        "RST STREAM",
        "Reset/stop-sending por stream"
      ],
      [
        "Compressão de campos",
        "N/A no núcleo",
        "Erros HPACK",
        "Erros e bloqueios QPACK"
      ],
      [
        "Sinal de fallback",
        "Nova conexão em outra versão",
        "ALPN http/1.1",
        "Falha QUIC seguida de H2/H1"
      ],
      [
        "Perda relevante",
        "TCP retransmission",
        "TCP retransmission afeta streams",
        "Perda por path/stream e recovery QUIC"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Método de troubleshooting HTTP ponta a ponta",
    "id": "metodo-de-troubleshooting-http-ponta-a-ponta"
  },
  {
    "kind": "paragraph",
    "text": "O primeiro passo é determinar se houve uma resposta HTTP válida. Erros de DNS, TCP, UDP, TLS ou QUIC podem ocorrer antes de qualquer status. Ferramentas às vezes convertem falhas em mensagens genéricas, mas o gateway não pode ter produzido 504 se a chamada nem chegou a ele. Identifique o último componente que possui evidência da tentativa e o primeiro que não possui."
  },
  {
    "kind": "paragraph",
    "text": "Quando existe status, determine autoria. Compare status público, status upstream, erro interno e policy executada. Um 503 do backend pode ser preservado; outro 503 pode ser criado pelo gateway porque nenhum endpoint saudável estava disponível. Headers como Server não são prova suficiente, pois podem ser removidos ou falsificados. Use correlação e timestamps entre logs controlados."
  },
  {
    "kind": "paragraph",
    "text": "Em seguida, registre versão e conexão em cada salto. Confirme ALPN, protocolo outbound, reuso, stream reset, GOAWAY, retry e timeout. Compare método, autoridade, path, campos relevantes e comprimento antes e depois do gateway. Para falhas intermitentes, procure padrões por conexão, instância, stream, tamanho de payload, versão, rede e momento de deploy."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-versions/pt/figure-19-troubleshooting-tree.svg",
    "alt": "Árvore inicial para classificar falhas antes e depois de uma resposta HTTP",
    "caption": "Figura 19 - Árvore inicial para classificar falhas HTTP."
  },
  {
    "kind": "table",
    "caption": "Tabela 15 - Matriz de sintomas e evidências.",
    "headers": [
      "Sintoma",
      "Hipóteses prioritárias",
      "Evidência"
    ],
    "rows": [
      [
        "Sem resposta / connection error",
        "DNS, firewall, TCP/UDP, TLS/QUIC, porta",
        "dig/nslookup, connect trace, handshake, logs da borda."
      ],
      [
        "400 somente via gateway",
        "Parsing, normalização, limite, transformação",
        "Raw request em laboratório, trace de policy, log do backend."
      ],
      [
        "413/431",
        "Limite de conteúdo ou campos em algum salto",
        "Configurações e tamanho real descomprimido."
      ],
      [
        "502",
        "Falha/invalidade do upstream, reset, protocolo",
        "Erro interno do gateway, captura e log do backend."
      ],
      [
        "503 intermitente",
        "Pool, health, stream/conexão limit, deploy",
        "Métricas por instância e conexão."
      ],
      [
        "504",
        "Timeout do salto gateway-backend ou cadeia",
        "Breakdown de latência e orçamento de timeouts."
      ],
      [
        "H2 funciona, H1 falha",
        "Framing, trailers, concorrência ou Host",
        "Comparação da mensagem após tradução."
      ],
      [
        "H3 lento antes de funcionar",
        "Tentativa QUIC falha e fallback",
        "UDP/443, Alt-Svc/HTTPS RR e logs QUIC."
      ],
      [
        "RST em reuso",
        "Idle timeout desalinhado",
        "Idade da conexão e encerramento no outro salto."
      ],
      [
        "Duplicidade após timeout",
        "Retry de operação não idempotente",
        "Logs de tentativas e chave de idempotência."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudo de caso 1: POST duplicado após 504",
    "id": "estudo-de-caso-1-post-duplicado-apos-504"
  },
  {
    "kind": "paragraph",
    "text": "Um cliente envia POST para criar uma transferência. O gateway encaminha ao backend, que confirma a transação no banco, mas demora para gerar a resposta. O timeout do gateway expira e retorna 504. O cliente interpreta como falha e repete a chamada. Como POST não é idempotente por definição e não existe chave de deduplicação, o backend cria uma segunda transferência."
  },
  {
    "kind": "paragraph",
    "text": "O problema não é resolvido apenas aumentando timeout. A arquitetura deve definir semântica de idempotência: cliente envia chave única; gateway preserva; backend registra chave e resultado atomicamente. Em repetição, retorna o resultado anterior. O gateway pode usar retry somente para falhas claramente anteriores ao envio ou em operações classificadas. Logs precisam mostrar request ID, idempotency key, tentativa e resultado do backend."
  },
  {
    "kind": "subhead",
    "text": "Aprendizado"
  },
  {
    "kind": "paragraph",
    "text": "Timeout significa ausência de confirmação para o observador, não prova de ausência de efeito no sistema remoto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudo de caso 2: HTTP/2 público e saturação no backend HTTP/1.1",
    "id": "estudo-de-caso-2-http-2-publico-e-saturacao-no-backend-http-1-1"
  },
  {
    "kind": "paragraph",
    "text": "Uma borda recebe milhares de streams HTTP/2 em poucas conexões e encaminha ao gateway. O gateway chama um backend HTTP/1.1 com pool de 100 conexões. Durante pico, streams entram rapidamente, mas aguardam conexão upstream. Métricas de TCP inbound parecem estáveis porque existem poucas conexões H2; a fila e a latência crescem no pool outbound."
  },
  {
    "kind": "paragraph",
    "text": "A solução exige medir concorrência por stream e pool wait, aplicar limites de admissão, ajustar capacidade do backend e considerar HTTP/2 outbound quando suportado. Aumentar pool sem avaliar recursos pode deslocar overload para o serviço. Rate limit por conexão seria ineficaz, pois uma conexão H2 concentra muitos streams. O objetivo é alinhar concorrência lógica à capacidade real do upstream."
  },
  {
    "kind": "subhead",
    "text": "Aprendizado"
  },
  {
    "kind": "paragraph",
    "text": "Em protocolos multiplexados, conexão deixa de ser uma boa aproximação para número de operações simultâneas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudo de caso 3: HTTP/3 anunciado, mas UDP bloqueado",
    "id": "estudo-de-caso-3-http-3-anunciado-mas-udp-bloqueado"
  },
  {
    "kind": "paragraph",
    "text": "Uma CDN passa a anunciar `Alt-Svc: h3`. Clientes modernos tentam QUIC em UDP/443, mas uma rede corporativa bloqueia UDP. Após um atraso, o cliente faz fallback para HTTP/2 e a API funciona. Usuários relatam lentidão apenas no primeiro acesso; testes que forçam HTTP/2 não reproduzem. Logs da API mostram requisições normais, porque a tentativa falha antes da mensagem HTTP chegar."
  },
  {
    "kind": "paragraph",
    "text": "A investigação precisa observar DNS, Alt-Svc, pacotes UDP e temporização do fallback. A correção pode envolver permitir QUIC, remover anúncio para redes específicas quando possível ou aceitar o fallback com monitoramento. Não se deve concluir que HTTP/3 causou erro de aplicação. O problema está na descoberta e estabelecimento do transporte, anterior à transação HTTP observada pelo gateway."
  },
  {
    "kind": "subhead",
    "text": "Aprendizado"
  },
  {
    "kind": "paragraph",
    "text": "Disponibilidade por fallback pode esconder uma falha de caminho e adicionar latência invisível nos logs de aplicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudo de caso 4: tradução H2 para H1 cria framing inseguro",
    "id": "estudo-de-caso-4-traducao-h2-para-h1-cria-framing-inseguro"
  },
  {
    "kind": "paragraph",
    "text": "Um proxy aceita HTTP/2 e converte pseudo-campos e DATA para HTTP/1.1. Uma combinação malformada passa pela validação H2, mas gera no H1 dois sinais de comprimento incompatíveis. O backend interpreta a mensagem de forma diferente e bytes controlados passam a compor a próxima requisição na conexão persistente. A vulnerabilidade só aparece quando o caminho inclui a tradução específica."
  },
  {
    "kind": "paragraph",
    "text": "A mitigação exige validar a mensagem lógica antes de serializar H1, emitir exatamente um mecanismo de framing, rejeitar campos proibidos, atualizar intermediários e testar variações de smuggling. Desabilitar reuso pode reduzir impacto, mas não substitui correção. WAF baseado apenas no texto de entrada H2 pode não enxergar a mensagem produzida ao backend."
  },
  {
    "kind": "subhead",
    "text": "Aprendizado"
  },
  {
    "kind": "paragraph",
    "text": "O ponto de maior risco é frequentemente a fronteira entre dois parsers ou versões, não um parser isolado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratórios práticos de leitura e diagnóstico",
    "id": "laboratorios-praticos-de-leitura-e-diagnostico"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - Comparar HTTP/1.1 e HTTP/2 com cURL"
  },
  {
    "kind": "paragraph",
    "text": "Use um endpoint de laboratório que suporte ambas as versões. Execute chamadas forçando HTTP/1.1 e HTTP/2 e ative saída detalhada. Observe resolução, conexão, TLS, ALPN, linha de requisição exibida, reutilização e tempo. Repita várias chamadas no mesmo processo para verificar reuso. Não utilize endpoints produtivos nem tokens reais."
  },
  {
    "kind": "code",
    "text": "curl -v --http1.1 https://SEU-ENDPOINT-DE-LAB/status\ncurl -v --http2   https://SEU-ENDPOINT-DE-LAB/status\n# Registrar também tempos:\ncurl -sS -o /dev/null -w \"connect=%{time_connect} tls=%{time_appconnect} ttfb=%\n{time_starttransfer} total=%{time_total}\\n\" https://SEU-ENDPOINT-DE-LAB/status"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - Inspecionar ALPN com OpenSSL"
  },
  {
    "kind": "paragraph",
    "text": "Conecte-se a um servidor de laboratório e anuncie h2 e HTTP/1.1. Confirme o protocolo selecionado. Depois force apenas http/1.1 e compare. O objetivo é perceber que ALPN ocorre no handshake TLS antes das mensagens HTTP. Em ambientes com proxy, execute de pontos de rede diferentes para identificar terminações distintas."
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect SEU-ENDPOINT-DE-LAB:443 -servername SEU-ENDPOINT-DE-LAB -alpn\n\"h2,http/1.1\"\n# Procure por: ALPN protocol: h2"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - Cache e revalidação"
  },
  {
    "kind": "paragraph",
    "text": "Crie um serviço de laboratório que retorne ETag e Cache-Control. Faça uma GET, armazene a ETag e envie If-None-Match. Confirme 304 sem conteúdo. Modifique o recurso e repita. Adicione um proxy de cache controlado e observe Age e Vary. Documente como autenticação altera a possibilidade de cache compartilhado."
  },
  {
    "kind": "code",
    "text": "curl -i https://SEU-ENDPOINT-DE-LAB/resource\ncurl -i -H \"If-None-Match: \\\"ETAG-RECEBIDA\\\"\" https://SEU-ENDPOINT-DE-LAB/resource"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 4 - Framing HTTP/1.1 em ambiente isolado"
  },
  {
    "kind": "paragraph",
    "text": "Em um servidor local criado para estudo, envie mensagens com Content-Length correto e chunked válido. Observe como o servidor lê o corpo. Depois teste entradas inválidas apenas em laboratório autorizado e confirme que são rejeitadas, sem tentar explorar sistemas de terceiros. O objetivo é entender parsing e validação, não executar ataque."
  },
  {
    "kind": "code",
    "text": "printf \"POST /echo HTTP/1.1\\r\\nHost: localhost\\r\\nContent-Length: 5\\r\\n\\r\\nhello\" | nc\n127.0.0.1 8080"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 5 - Observar HTTP/3 e fallback"
  },
  {
    "kind": "paragraph",
    "text": "Use uma ferramenta e endpoint de laboratório com suporte conhecido a HTTP/3. Registre tentativa QUIC, protocolo final e fallback quando UDP é bloqueado em um ambiente de teste. Compare tempo até primeiro byte. Não altere firewalls corporativos sem autorização. Em clientes que suportam qlog, gere um trace local e visualize handshake e streams."
  },
  {
    "kind": "code",
    "text": "curl -v --http3 https://SEU-ENDPOINT-DE-LAB/status\ncurl -v --http3-only https://SEU-ENDPOINT-DE-LAB/status\n# A disponibilidade das opções depende da compilação do cURL e da biblioteca QUIC."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 6 - Mapear versões por salto no gateway"
  },
  {
    "kind": "paragraph",
    "text": "Publique uma API de laboratório que retorne protocolo, Host e cabeçalhos de correlação observados pelo backend. Chame o endpoint público em diferentes versões e compare logs do listener, trace de policy e saída do backend. Desenhe cada conexão independente e anote TLS, ALPN, versão, pool, timeout e transformação. Este mapa é mais útil que declarar uma única “versão da API”."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Registrar protocolo cliente-borda.",
      "Registrar protocolo borda-gateway.",
      "Registrar protocolo gateway-backend.",
      "Comparar Host/:authority e campos Forwarded.",
      "Executar chamada com conteúdo grande e observar buffering.",
      "Executar deploy controlado e observar draining/GOAWAY ou resets."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura HTTP para APIs corporativas",
    "id": "checklist-de-arquitetura-http-para-apis-corporativas"
  },
  {
    "kind": "table",
    "caption": "Tabela 16 - Checklist de projeto e revisão.",
    "headers": [
      "Tema",
      "Perguntas de revisão"
    ],
    "rows": [
      [
        "Semântica",
        "Métodos e status seguem suas propriedades? Retries respeitam idempotência?"
      ],
      [
        "URI/autoridade",
        "Host e autoridade original são validados e preservados quando necessário?"
      ],
      [
        "Campos",
        "Quais são removidos, criados, assinados ou confiados em cada salto?"
      ],
      [
        "Conteúdo",
        "Há transformação, compressão, buffering, streaming ou limite descomprimido?"
      ],
      [
        "Cache",
        "Quais respostas podem ser armazenadas? A chave considera identidade e Vary?"
      ],
      [
        "HTTP/1.1",
        "Framing é estrito? Pools e idle timeouts estão coordenados?"
      ],
      [
        "HTTP/2",
        "Quais limites de streams, campos e janelas são configurados? GOAWAY é tratado?"
      ],
      [
        "HTTP/3",
        "UDP é permitido? Há fallback? Como qlog e métricas QUIC são coletados?"
      ],
      [
        "Gateway",
        "Versões inbound/outbound foram confirmadas por evidência?"
      ],
      [
        "Observabilidade",
        "Status público, status upstream e erro interno são separados?"
      ],
      [
        "Segurança",
        "Traduções de protocolo foram testadas contra ambiguidades e smuggling?"
      ],
      [
        "Capacidade",
        "Concorrência é medida por requisições/streams, não apenas conexões?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "HTTP oferece uma semântica estável para interação entre clientes, servidores e intermediários. Métodos expressam intenção; status comunicam resultado; campos descrevem controle e representação; cache e condições permitem reutilização e concorrência. Esses conceitos são independentes de JSON, REST ou da versão de transporte."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/1.1 codifica mensagens textuais em um fluxo TCP e exige regras rigorosas de framing. Conexões persistentes economizam handshakes, mas pooling, timeouts e parsing divergente criam riscos. HTTP/2 introduz frames, streams, multiplexação, controle de fluxo e HPACK, reduzindo overhead e head-of-line no nível HTTP, embora perda TCP ainda afete todos os streams."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utiliza QUIC sobre UDP, integra TLS 1.3, isola perda por stream, suporta Connection IDs e usa QPACK. Descoberta pode ocorrer por Alt-Svc e registros HTTPS/SVCB, com fallback para versões anteriores. Em gateways, cada salto negocia sua própria versão; o profissional precisa observar a mensagem lógica e a conexão de cada segmento."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting confiável começa por classificar se a falha ocorreu antes ou depois de existir resposta HTTP, identificar quem criou o status e mapear versões, timeouts, pools, streams e transformações. A arquitetura deve proteger semântica, idempotência e segurança durante traduções entre protocolos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de fixação",
    "id": "exercicios-de-fixacao"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique a diferença entre semântica HTTP e mapeamento de uma versão específica.",
      "Por que stateless não significa que uma aplicação não possa manter sessão?",
      "Diferencie recurso, representação, conteúdo e framing."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Quais componentes de uma URI participam de uma requisição HTTP e qual não é enviado?",
      "Diferencie método seguro de método idempotente e dê exemplos.",
      "Por que repetir POST após timeout pode produzir duplicidade mesmo quando o cliente recebeu 504?",
      "Quem pode criar um 502 em uma cadeia com múltiplos proxies?",
      "Por que reason phrase não deve ser usada em lógica de cliente?",
      "Diferencie Content-Type, Content-Encoding e Transfer-Encoding.",
      "Explique por que Vary é necessário em negociação de conteúdo com cache.",
      "O que significa `Cache-Control: no-cache`?",
      "Como ETag e If-Match ajudam a evitar lost update?",
      "Por que TCP não preserva limites de mensagem HTTP?",
      "Quais riscos existem quando Content-Length e Transfer-Encoding são interpretados de forma diferente?",
      "Por que uma conexão persistente só pode ser reutilizada após consumir completamente a mensagem anterior?",
      "Descreva head-of-line no pipelining HTTP/1.",
      "",
      "Como HTTP/2 mapeia uma requisição para frames e streams?",
      "Diferencie controle de fluxo HTTP/2 de congestion control TCP.",
      "Qual é o papel de SETTINGS_MAX_CONCURRENT_STREAMS?",
      "Como GOAWAY ajuda em deploys e draining?",
      "Como HPACK reduz overhead e por que cria estado por conexão?",
      "Qual é o papel do ALPN na negociação de HTTP/2?",
      "Por que HTTP/2 continua sujeito a head-of-line do TCP?",
      "Por que afirmar que HTTP/3 é “UDP não confiável” está errado?",
      "Como QUIC permite migração de caminho?",
      "Qual é o risco de 0-RTT para operações com efeito?",
      "Como QPACK difere conceitualmente de HPACK?",
      "Como Alt-Svc pode anunciar HTTP/3 sem alterar a origem lógica?",
      "Por que uma API pode usar HTTP/3 publicamente e HTTP/1.1 no backend?",
      "Quais métricas adicionais são necessárias em HTTP/2 e HTTP/3?",
      "Proponha um orçamento de timeout para cliente, borda, gateway e backend.",
      "Desenhe uma estratégia de retry segura para GET e POST de pagamento.",
      "Explique como uma tradução H2 para H1 pode criar risco de request smuggling.",
      "Descreva as evidências necessárias para provar qual versão foi usada em cada salto."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Questões para discussão arquitetural",
    "id": "questoes-para-discussao-arquitetural"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Em uma organização com milhares de APIs, quais critérios justificam habilitar HTTP/2 ou HTTP/3 na borda e no backend?",
      "Como balanceadores devem distribuir carga quando poucas conexões carregam muitos streams?",
      "Quais campos devem ser removidos ou reconstruídos em uma cadeia com CDN, WAF, gateway e service mesh?",
      "Como garantir idempotência de operações financeiras quando timeouts e retries podem ocorrer em vários componentes?",
      "Qual nível de observabilidade QUIC é aceitável em ambiente regulado sem expor dados sensíveis?",
      "Quando buffering no gateway é necessário e quando destrói benefícios de streaming?",
      "Como testar segurança de parsing e tradução de protocolo em uma esteira automatizada?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 17 - Glossário do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "ALPN",
        "Extensão TLS usada para negociar o protocolo de aplicação, como h2 ou http/1.1."
      ],
      [
        "Alt-Svc",
        "Mecanismo para anunciar serviço HTTP alternativo, inclusive endpoint HTTP/3."
      ],
      [
        "Authority",
        "Componente que identifica host e porta lógica da origem."
      ],
      [
        "Cache compartilhado",
        "Cache que pode reutilizar respostas para mais de um usuário ou cliente."
      ],
      [
        "Connection coalescing",
        "Reuso controlado de uma conexão HTTP/2 para mais de uma origem."
      ],
      [
        "Connection ID",
        "Identificador QUIC que permite associar pacotes à conexão além da tupla IP/porta."
      ],
      [
        "Content",
        "Sequência de dados da mensagem após decodificações de framing apropriadas."
      ],
      [
        "Content negotiation",
        "Seleção de representação conforme preferências e capacidades."
      ],
      [
        "Control stream",
        "Stream HTTP/3 unidirecional que transporta controle da conexão."
      ],
      [
        "End-to-end field",
        "Campo cujo significado se aplica aos endpoints finais, mesmo através de intermediários."
      ],
      [
        "ETag",
        "Validator opaco associado a uma representação."
      ],
      [
        "Flow control",
        "Mecanismo que impede o emissor de exceder buffers anunciados pelo receptor."
      ],
      [
        "Framing",
        "Regras para determinar limites e conteúdo de mensagens no transporte."
      ],
      [
        "GOAWAY",
        "Sinal de que uma conexão não aceitará novos streams/requisições além de determinado limite."
      ],
      [
        "HEADERS frame",
        "Frame que transporta bloco comprimido de campos em HTTP/2 ou HTTP/3."
      ],
      [
        "Head-of-line blocking",
        "Atraso em operações independentes causado por um item anterior ausente ou lento."
      ],
      [
        "HPACK",
        "Compressão de campos utilizada pelo HTTP/2."
      ],
      [
        "HTTP/3",
        "Mapeamento da semântica HTTP para QUIC."
      ],
      [
        "Idempotência",
        "Propriedade pela qual repetir a mesma intenção produz o mesmo efeito pretendido."
      ],
      [
        "Intermediário",
        "Participante HTTP que recebe e encaminha mensagens, como proxy ou gateway."
      ],
      [
        "Multiplexação",
        "Compartilhamento de uma conexão por múltiplas trocas independentes."
      ],
      [
        "Origin",
        "Origem lógica responsável pelo recurso identificado pela URI."
      ],
      [
        "Pseudo-header",
        "Campo especial de HTTP/2/3 iniciado por dois-pontos, como :method."
      ],
      [
        "QPACK",
        "Compressão de campos usada pelo HTTP/3."
      ],
      [
        "QUIC",
        "Transporte seguro e multiplexado sobre UDP utilizado pelo HTTP/3."
      ],
      [
        "Representation",
        "Dados e metadados que representam o estado de um recurso."
      ],
      [
        "Request smuggling",
        "Ataque baseado em divergência sobre limites de requisição entre intermediários."
      ],
      [
        "Safe method",
        "Método cuja intenção é essencialmente de leitura."
      ],
      [
        "Stream",
        "Canal lógico e ordenado dentro de uma conexão multiplexada."
      ],
      [
        "Trailer",
        "Campo enviado após o conteúdo da mensagem."
      ],
      [
        "Validator",
        "Metadado usado para testar se representação armazenada continua válida."
      ],
      [
        "Vary",
        "Campo que informa dimensões da requisição usadas para selecionar uma resposta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências oficiais e leituras recomendadas",
    "id": "referencias-oficiais-e-leituras-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "As referências abaixo priorizam especificações e documentações oficiais. RFCs devem ser consultadas com suas erratas e eventuais documentos que as atualizam. Documentação de produtos deve ser validada para a versão, tier e gateway utilizados no ambiente."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "RFC 9110 - HTTP Semantics - https://www.rfc-editor.org/rfc/rfc9110.html",
      "RFC 9111 - HTTP Caching - https://www.rfc-editor.org/rfc/rfc9111.html",
      "RFC 9112 - HTTP/1.1 - https://www.rfc-editor.org/rfc/rfc9112.html",
      "RFC 9113 - HTTP/2 - https://www.rfc-editor.org/rfc/rfc9113.html",
      "RFC 9114 - HTTP/3 - https://www.rfc-editor.org/rfc/rfc9114.html",
      "RFC 7541 - HPACK: Header Compression for HTTP/2 - https://www.rfc-editor.org/rfc/rfc7541.html",
      "RFC 9204 - QPACK: Field Compression for HTTP/3 - https://www.rfc-editor.org/rfc/rfc9204.html",
      "RFC 9000 - QUIC: A UDP-Based Multiplexed and Secure Transport - https://www.rfc-editor.org/rfc/rfc9000.html",
      "RFC 9001 - Using TLS to Secure QUIC - https://www.rfc-editor.org/rfc/rfc9001.html",
      "RFC 9002 - QUIC Loss Detection and Congestion Control - https://www.rfc-editor.org/rfc/rfc9002.html",
      "RFC 7838 - HTTP Alternative Services - https://www.rfc-editor.org/rfc/rfc7838.html",
      "RFC 9460 - Service Binding and HTTPS DNS Resource Records - https://www.rfc-editor.org/rfc/rfc9460.html",
      "RFC 9651 - Structured Field Values for HTTP - https://www.rfc-editor.org/rfc/rfc9651.html",
      "RFC 7301 - TLS Application-Layer Protocol Negotiation - https://www.rfc-editor.org/rfc/rfc7301.html",
      "RFC 9308 - Applicability of the QUIC Transport Protocol - https://www.rfc-editor.org/rfc/rfc9308.html",
      "RFC 9312 - Manageability of the QUIC Transport Protocol - https://www.rfc-editor.org/rfc/rfc9312.html",
      "IANA HTTP Field Name Registry - https://www.iana.org/assignments/http-fields/http-fields.xhtml",
      "IANA HTTP Status Code Registry - https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml",
      "Axway - Configure HTTP services - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/general_services/index.html",
      "Axway - Configure remote host settings - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/general_remote_hosts/index.html",
      "Microsoft - API gateway in Azure API Management - https://learn.microsoft.com/en-us/azure/api-management/api-management-gateways-overview",
      "Microsoft - forward-request policy - https://learn.microsoft.com/en-us/azure/api-management/forward-request-policy",
      "Microsoft - Manage protocols and ciphers in API Management - https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-manage-protocols-ciphers"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ordem sugerida de leitura"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Ler as seções introdutórias e terminologia da RFC 9110 antes de estudar versões específicas.",
      "Estudar a RFC 9112 com foco em message framing, conexão e segurança de parsing.",
      "Ler a visão geral, frames, streams, flow control e erros da RFC 9113; consultar HPACK em paralelo.",
      "Estudar QUIC nas seções de conexão, streams, flow control e migration da RFC 9000, seguido da integração TLS na RFC 9001.",
      "Ler a RFC 9114 e QPACK, relacionando o que foi delegado ao QUIC.",
      "Consultar Alt-Svc e HTTPS/SVCB para compreender descoberta e fallback.",
      "Por fim, mapear as capacidades e limitações da versão de Axway e Azure APIM utilizada no trabalho."
    ]
  },
  {
    "kind": "subhead",
    "text": "Encerramento"
  },
  {
    "kind": "paragraph",
    "text": "Dominar HTTP é dominar a fronteira entre intenção de negócio e transporte. O próximo capítulo aprofundará HTTPS e TLS, explicando como identidade, confidencialidade e integridade protegem cada uma dessas conexões."
  }
];
