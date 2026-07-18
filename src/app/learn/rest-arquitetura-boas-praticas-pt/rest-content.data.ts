import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const REST_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Caminho REST de uma operação corporativa"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/pt/overview.svg",
    "alt": "Caminho REST de uma operação corporativa do consumidor até a persistência",
    "caption": "Visão geral - o cliente expressa uma intenção sobre um recurso; gateway, domínio e persistência preservam a semântica da operação."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "O cliente seleciona um recurso e uma operação sem conhecer a implementação interna.",
      "O gateway valida contexto, aplica limites e encaminha uma mensagem HTTP semanticamente correta.",
      "O serviço altera ou consulta o estado do domínio e devolve uma representação do resultado."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "REST é frequentemente apresentado como uma coleção de convenções para criar endpoints HTTP, mas sua origem é arquitetural. O termo descreve um conjunto de restrições aplicadas a sistemas distribuídos de hipermídia para induzir propriedades como escalabilidade, simplicidade, evolução independente, visibilidade das interações e uso eficiente de intermediários. Uma API pode utilizar JSON, métodos HTTP e caminhos organizados sem cumprir todas essas restrições; por isso, distinguir \"API HTTP\" de \"arquitetura REST\" evita decisões baseadas apenas em rótulos."
  },
  {
    "kind": "paragraph",
    "text": "Neste capítulo, o foco recai sobre a ligação entre arquitetura e prática. As restrições serão estudadas a partir do trabalho de Roy Fielding, mas cada conceito será conectado ao desenho cotidiano de APIs corporativas: identificação de recursos, semântica de métodos, idempotência, cache, concorrência, paginação, erros, versionamento, documentação, segurança e operação em gateways. O objetivo não é impor uma estética única, e sim mostrar como decisões aparentemente pequenas afetam consumidores, observabilidade e evolução de longo prazo."
  },
  {
    "kind": "paragraph",
    "text": "O HTTP moderno possui semântica própria, consolidada principalmente na RFC 9110. REST se beneficia dessa semântica, mas não se reduz a ela. Da mesma forma, OpenAPI descreve contratos de APIs HTTP, porém uma descrição OpenAPI bem formada não transforma automaticamente uma interface em REST. Ao longo do material, esses limites serão explicitados para que o leitor saiba qual norma ou princípio está fundamentando cada escolha."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes bancários e corporativos, uma API raramente é acessada diretamente. Ela pode atravessar WAF, balanceador, API Gateway, service mesh e serviços de identidade. Esses intermediários alteram conexões, aplicam políticas e produzem respostas próprias. Um design REST robusto precisa preservar semântica e rastreabilidade mesmo quando a mensagem percorre várias camadas e diferentes equipes são responsáveis por cada trecho."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Leia primeiro as seções sobre restrições e interface uniforme. Depois use as tabelas de métodos e status como referência de projeto. Nos laboratórios, compare o comportamento observado no cliente, no gateway e no backend; a mesma resposta pode ter sido produzida por componentes diferentes."
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
      "Explicar REST como estilo arquitetural e diferenciar suas restrições de convenções de mercado.",
      "Distinguir recurso, estado, representação, identificador, operação e endpoint.",
      "Aplicar a interface uniforme ao desenho de URIs, métodos, headers, códigos de status e links.",
      "Analisar segurança, idempotência e cache sem confundir esses conceitos.",
      "Projetar coleções, paginação, filtros, ordenação, atualização parcial e operações assíncronas.",
      "Padronizar erros com Problem Details e controlar concorrência por precondições HTTP.",
      "Planejar compatibilidade e versionamento evitando mudanças desnecessariamente destrutivas.",
      "Usar OpenAPI, testes de contrato, observabilidade e políticas de gateway como mecanismos de governança.",
      "Diagnosticar falhas REST distinguindo problema de transporte, protocolo, gateway, contrato e domínio."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estrutura do capítulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "10.1 REST como estilo arquitetural",
      "10.2 Propriedades e restrições do estilo",
      "10.3 Cliente-servidor e separação de responsabilidades",
      "10.4 Stateless e contexto da requisição",
      "10.5 Cache e reutilização de respostas",
      "10.6 Interface uniforme",
      "10.7 Sistemas em camadas e código sob demanda",
      "10.8 Recurso, estado e representação",
      "10.9 Identificação de recursos e desenho de URIs",
      "10.10 Semântica dos métodos HTTP",
      "10.11 Segurança, idempotência e repetição",
      "10.12 Códigos de status",
      "10.13 Negociação de conteúdo e formatos",
      "10.14 PUT, PATCH e atualizações",
      "10.15 Coleções, filtros, ordenação e paginação",
      "10.16 Erros com Problem Details",
      "10.17 Cache condicional, ETag e concorrência",
      "10.18 Operações assíncronas",
      "10.19 Compatibilidade e versionamento",
      "10.20 Hipermídia e descoberta",
      "10.21 OpenAPI e design orientado a contrato",
      "10.22 Segurança e autorização",
      "10.23 API Gateways e políticas corporativas",
      "10.24 Observabilidade e troubleshooting",
      "10.25 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.1 REST como estilo arquitetural",
    "id": "10-1-rest-como-estilo-arquitetural"
  },
  {
    "kind": "paragraph",
    "text": "Representational State Transfer foi apresentado por Roy Fielding como um estilo arquitetural para sistemas distribuídos de hipermídia. Um estilo não é uma biblioteca, um protocolo nem um formato de dados. Ele define um conjunto nomeado de restrições sobre componentes, conectores e dados, e essas restrições induzem determinadas propriedades arquiteturais. Essa definição é importante porque permite analisar uma solução por suas decisões estruturais, não apenas por sua sintaxe externa."
  },
  {
    "kind": "paragraph",
    "text": "Na prática de mercado, \"REST API\" passou a designar quase toda API HTTP que usa recursos aparentes e JSON. Essa simplificação pode ser útil em conversas informais, mas produz confusão quando se discute cache, hipermídia, evolução e acoplamento. Uma interface com endpoints como /executarConsulta e /processarPagamento pode funcionar corretamente sobre HTTP, porém se aproxima mais de RPC. O problema não é usar RPC quando ele atende ao contexto; o problema é atribuir propriedades de REST a uma arquitetura que não foi desenhada com suas restrições."
  },
  {
    "kind": "paragraph",
    "text": "O valor de REST está nas propriedades emergentes. Separar cliente e servidor permite evolução independente; mensagens autocontidas aumentam visibilidade; cache reduz interações; interface uniforme simplifica intermediários; camadas permitem escalabilidade e políticas transversais. Cada benefício possui custo. Stateless transfere contexto para mensagens ou armazenamento compartilhado; interface uniforme limita operações específicas; hipermídia exige modelos e clientes capazes de interpretar relações."
  },
  {
    "kind": "paragraph",
    "text": "Portanto, boas práticas devem ser avaliadas pelo efeito sobre o sistema. Usar substantivos em URIs é uma heurística coerente com recursos, mas não é a essência de REST. Usar todos os códigos HTTP não garante boa semântica. Uma API madura define recursos estáveis, utiliza a semântica do protocolo de forma previsível e documenta explicitamente onde as necessidades do domínio exigem decisões diferentes."
  },
  {
    "kind": "subhead",
    "text": "Pergunta de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Antes de perguntar \"qual endpoint devo criar?\", pergunte: qual é o recurso, quem controla seu estado, qual representação será transferida e quais propriedades de evolução, cache e visibilidade são necessárias?"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.2 Propriedades e restrições do estilo",
    "id": "10-2-propriedades-e-restricoes-do-estilo"
  },
  {
    "kind": "paragraph",
    "text": "Fielding deriva REST combinando restrições conhecidas: cliente-servidor, stateless, cache, interface uniforme, sistema em camadas e, opcionalmente, código sob demanda. Nenhuma dessas restrições isoladamente define REST. Um sistema cliente-servidor pode manter sessão no servidor; um serviço stateless pode expor operações RPC; uma aplicação cacheável pode não possuir interface uniforme. O estilo surge da composição do conjunto."
  },
  {
    "kind": "paragraph",
    "text": "As propriedades desejadas incluem desempenho de interações, escalabilidade de componentes, simplicidade de interface, modificabilidade, visibilidade, portabilidade e confiabilidade. Existe tensão entre elas. Cache pode melhorar desempenho e escalabilidade, mas introduz risco de dados obsoletos. Camadas aumentam flexibilidade e segurança, mas adicionam latência. Interface uniforme simplifica a arquitetura geral, porém pode ser menos eficiente para uma operação altamente especializada."
  },
  {
    "kind": "paragraph",
    "text": "Arquitetura corporativa exige tornar essas trocas explícitas. Uma API de cotação pode aceitar poucos segundos de obsolescência e usar cache agressivo. Uma operação de transferência financeira precisa de consistência, autorização e idempotência mais rigorosas. Ambas podem usar HTTP, mas suas políticas de representação, precondição e resposta serão diferentes."
  },
  {
    "kind": "paragraph",
    "text": "A decisão correta não consiste em aplicar uma lista mecanicamente. Consiste em compreender a finalidade de cada restrição, preservar a semântica compartilhada e documentar exceções. Quando uma equipe introduz sessão de servidor, por exemplo, deve reconhecer o impacto sobre balanceamento, recuperação e escalabilidade, em vez de afirmar que o sistema continua stateless apenas porque utiliza tokens."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/pt/figure-01.svg",
    "alt": "As restrições arquiteturais que, combinadas, formam o estilo REST",
    "caption": "Figura 1 - REST resulta da combinação de restrições arquiteturais, não de uma convenção isolada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.3 Cliente-servidor e separação de responsabilidades",
    "id": "10-3-cliente-servidor-e-separacao-de-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "A restrição cliente-servidor separa preocupações de interface e experiência das preocupações de armazenamento e regra de negócio. O cliente conhece o contrato de interação; o servidor controla os recursos e sua evolução interna. Essa divisão permite que aplicações web, móveis, batch e parceiros reutilizem capacidades do mesmo domínio sem compartilhar a implementação do backend."
  },
  {
    "kind": "paragraph",
    "text": "Separação não significa ausência de acoplamento. O cliente ainda depende da semântica das representações, dos identificadores e das transições possíveis. Uma API que expõe diretamente tabelas internas ou nomes de classes transfere decisões de implementação para consumidores. Mudanças internas tornam-se mudanças públicas, reduzindo a independência que a restrição pretendia criar."
  },
  {
    "kind": "paragraph",
    "text": "Em plataformas corporativas, API Gateway e BFF acrescentam nuances. O gateway atua como intermediário e não deve absorver regras de domínio apenas por ser um ponto central. Um BFF pode adaptar granularidade e representação para um canal específico, mas precisa evitar copiar o modelo de negócio inteiro. A fronteira adequada mantém políticas transversais no gateway e decisões de domínio no serviço responsável."
  },
  {
    "kind": "paragraph",
    "text": "Uma boa avaliação observa a direção das dependências. O consumidor deve depender de um contrato estável; o serviço pode trocar banco, linguagem, algoritmo ou topologia sem alterar esse contrato. Quando a mudança interna exige atualização simultânea de todos os clientes, a separação existe apenas fisicamente, não arquiteturalmente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.4 Stateless e contexto da requisição",
    "id": "10-4-stateless-e-contexto-da-requisicao"
  },
  {
    "kind": "paragraph",
    "text": "Stateless significa que cada requisição contém as informações necessárias para ser compreendida e processada, e que o servidor não depende de contexto de sessão de aplicação armazenado entre requisições do mesmo cliente. O servidor obviamente mantém estado dos recursos, configurações, chaves e dados de negócio. A restrição se refere ao estado conversacional da interação cliente-servidor, não à inexistência de persistência."
  },
  {
    "kind": "paragraph",
    "text": "Tokens, cookies e cabeçalhos podem transportar contexto, mas o uso de um token não torna automaticamente a API stateless. Se o token referencia uma sessão mutável mantida em memória local de uma instância, o próximo request pode depender de afinidade. Por outro lado, um identificador de sessão armazenado em repositório compartilhado reduz dependência da instância, mas ainda representa estado de sessão no servidor. O desenho deve ser descrito com precisão."
  },
  {
    "kind": "paragraph",
    "text": "A principal vantagem operacional é permitir que qualquer instância compatível processe qualquer requisição. Isso facilita balanceamento, autoscaling e recuperação. Também melhora visibilidade, pois a mensagem contém contexto suficiente para auditoria. O custo é aumentar o tamanho das requisições e exigir que autorização, correlação e preferências sejam reenviadas ou derivadas de dados compartilhados."
  },
  {
    "kind": "paragraph",
    "text": "Em operações multietapas, o domínio frequentemente precisa persistir progresso. Isso não viola stateless se o progresso for modelado como recurso, por exemplo /solicitacoes-transferencia/abc, e não como memória implícita de uma conversa presa a um servidor. Transformar processo em recurso torna o estado observável, consultável e recuperável."
  },
  {
    "kind": "subhead",
    "text": "Stateless não é \"sem estado\""
  },
  {
    "kind": "paragraph",
    "text": "O servidor mantém o estado dos recursos. A restrição evita depender de estado conversacional oculto entre requisições. Modelar uma jornada como recurso persistente costuma ser mais escalável e auditável do que manter uma sessão implícita."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.5 Cache e reutilização de respostas",
    "id": "10-5-cache-e-reutilizacao-de-respostas"
  },
  {
    "kind": "paragraph",
    "text": "A restrição de cache exige que respostas indiquem se podem ser reutilizadas. Em HTTP, diretivas como Cache-Control, validators como ETag e regras de expiração permitem que clientes e intermediários evitem transferências e processamento desnecessários. Cache reduz latência e carga, mas só é seguro quando a semântica da resposta e a variação por usuário, autorização e conteúdo são corretamente declaradas."
  },
  {
    "kind": "paragraph",
    "text": "Uma resposta personalizada não deve ser armazenada em cache compartilhado sem controles adequados. Cache-Control: private restringe o reuso a cache privado; no-store pede que a mensagem não seja armazenada; Vary informa quais cabeçalhos alteram a representação. A ausência dessas informações pode causar vazamento entre usuários ou comportamento inconsistente, especialmente quando CDN, reverse proxy e gateway participam do caminho."
  },
  {
    "kind": "paragraph",
    "text": "Nem toda API deve desabilitar cache por padrão. Catálogos, parâmetros públicos, taxas de referência e metadados podem se beneficiar de revalidação. Mesmo quando a representação muda frequentemente, um GET condicional com If-None-Match pode devolver 304 sem corpo. Isso preserva correção e economiza banda."
  },
  {
    "kind": "paragraph",
    "text": "A equipe precisa definir quem controla a política. O backend conhece a semântica do recurso; o gateway pode aplicar limites ou complementar headers, mas não deveria inventar validade de dados que desconhece. Políticas centralizadas devem ser parametrizadas por contrato e testadas com caches reais para evitar regras amplas que mudem o comportamento de APIs diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.6 Interface uniforme",
    "id": "10-6-interface-uniforme"
  },
  {
    "kind": "paragraph",
    "text": "A interface uniforme é a característica central de REST e possui quatro aspectos: identificação de recursos; manipulação por representações; mensagens autocontidas; e hipermídia como motor do estado da aplicação. O objetivo é reduzir acoplamento por meio de uma semântica comum que possa ser compreendida por clientes, servidores e intermediários."
  },
  {
    "kind": "paragraph",
    "text": "Identificar recursos significa usar identificadores estáveis para conceitos, não necessariamente para linhas de banco. Manipulação por representações significa que o cliente recebe ou envia uma representação e o servidor interpreta essa representação conforme o método e o contrato. Mensagens autocontidas utilizam método, URI, headers, status e media type para informar como devem ser processadas."
  },
  {
    "kind": "paragraph",
    "text": "Hipermídia acrescenta relações e ações possíveis à representação. Em vez de o cliente construir todos os caminhos a partir de conhecimento externo, o servidor pode fornecer links e controles conforme o estado atual. Essa prática é menos comum em APIs corporativas, mas sua ideia continua valiosa: o servidor deve orientar transições válidas e reduzir regras de navegação codificadas fora do contrato."
  },
  {
    "kind": "paragraph",
    "text": "A uniformidade não significa que todas as APIs tenham os mesmos recursos. Significa que a interação usa elementos com significado compartilhado. GET não deveria ser redefinido como operação destrutiva, 404 não deveria significar indisponibilidade temporária e Content-Type não deveria ser omitido quando o corpo depende de interpretação. Quanto mais a API respeita a semântica comum, menos conhecimento especial o consumidor precisa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.7 Sistemas em camadas e código sob demanda",
    "id": "10-7-sistemas-em-camadas-e-codigo-sob-demanda"
  },
  {
    "kind": "paragraph",
    "text": "A restrição de sistema em camadas permite inserir intermediários sem que o cliente precise conhecer toda a topologia. Proxies, caches, gateways, service meshes e balanceadores podem receber uma interação e encaminhá-la. Cada componente vê apenas os vizinhos imediatos e aplica responsabilidades locais. Essa propriedade é fundamental em ambientes corporativos, nos quais segurança, roteamento e observabilidade são distribuídos."
  },
  {
    "kind": "paragraph",
    "text": "Camadas também criam riscos de perda de contexto. Um intermediário pode substituir Host, terminar TLS, alterar cache, remover headers ou produzir resposta própria. Por isso, o desenho precisa definir propagação de identidade, trace context, endereço original e correlação. A transparência arquitetural não deve virar invisibilidade operacional: logs precisam mostrar qual camada tomou cada decisão."
  },
  {
    "kind": "paragraph",
    "text": "Código sob demanda é a única restrição opcional de REST. Ela permite que o servidor envie código executável para estender o cliente, como ocorre com scripts na Web. Em APIs de integração, esse mecanismo é raro e geralmente indesejado por razões de segurança, previsibilidade e governança. Sua ausência não impede que a arquitetura seja REST."
  },
  {
    "kind": "paragraph",
    "text": "Em API Gateways, a camada deve reforçar políticas e adaptar detalhes de infraestrutura, mas a semântica do recurso precisa continuar coerente. Um gateway que converte todos os erros para 200 ou transforma GET em operação com efeito colateral rompe a interface uniforme e dificulta ferramentas, caches e consumidores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.8 Recurso, estado e representação",
    "id": "10-8-recurso-estado-e-representacao"
  },
  {
    "kind": "paragraph",
    "text": "Recurso é uma abstração conceitual identificável: cliente, conta, pagamento, proposta, limite ou solicitação. O recurso pode mudar ao longo do tempo, mas sua identidade permanece. Estado é a condição atual desse recurso no domínio. Representação é uma sequência de bytes acompanhada de metadados que descreve alguma visão desse estado, como JSON, XML, CSV ou imagem."
  },
  {
    "kind": "paragraph",
    "text": "Confundir recurso com representação leva a endpoints excessivamente orientados a formato. /cliente.json pode ser útil em contextos específicos, mas normalmente o formato é negociado por media type. Confundir recurso com tabela também limita evolução: uma conta pode agregar dados de várias fontes e expor somente propriedades autorizadas, sem refletir a estrutura interna."
  },
  {
    "kind": "paragraph",
    "text": "A representação não precisa conter todo o estado. Ela pode ser resumida, expandida, localizada ou filtrada conforme autorização e caso de uso. O contrato deve deixar claro quais campos são dados, metadados, links e informações calculadas. Campos ausentes também possuem semântica: podem significar não aplicável, não autorizado ou não solicitado, e essa distinção deve ser documentada."
  },
  {
    "kind": "paragraph",
    "text": "Em sistemas bancários, o mesmo recurso pode ter representações diferentes para cliente, atendente e auditor. O identificador permanece, mas cada canal recebe atributos compatíveis com sua finalidade e permissão. Essa abordagem é mais segura do que retornar um objeto completo e esperar que o consumidor ignore campos sensíveis."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/pt/figure-02.svg",
    "alt": "Relação entre recurso, estado e representações em formatos diferentes",
    "caption": "Figura 2 - O recurso possui identidade; representações transportam visões do estado em formatos específicos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.9 Identificação de recursos e desenho de URIs",
    "id": "10-9-identificacao-de-recursos-e-desenho-de-uris"
  },
  {
    "kind": "paragraph",
    "text": "URIs devem identificar recursos de forma estável e previsível. Nomes de coleção no plural, como /clientes e /pagamentos, são uma convenção útil, embora não normativa. O aspecto principal é preservar significado e evitar incorporar detalhes voláteis de implementação. Caminhos não precisam reproduzir a hierarquia de tabelas, pacotes ou serviços internos."
  },
  {
    "kind": "paragraph",
    "text": "Relações podem ser expressas por sub-recursos quando existe dependência clara: /clientes/123/contas. Entretanto, caminhos muito profundos aumentam acoplamento e dificultam reutilização. Se conta 456 possui identidade própria, /contas/456 pode ser o identificador canônico, enquanto a coleção sob cliente serve como forma de navegação ou filtro."
  },
  {
    "kind": "paragraph",
    "text": "Parâmetros de query representam seleção, busca, paginação, ordenação ou projeção. Eles não são inferiores a segmentos de caminho; possuem papel semântico diferente. /pagamentos?status=pendente seleciona uma visão da coleção, enquanto /pagamentos/abc identifica um membro. A equipe deve definir normalização, encoding, sensibilidade a maiúsculas e comportamento de parâmetros desconhecidos."
  },
  {
    "kind": "paragraph",
    "text": "Evite verbos que duplicam métodos, como /obterCliente ou /deletarPagamento. Operações de domínio que não se encaixam naturalmente em CRUD podem ser modeladas como recursos de ação ou processo, por exemplo POST /contas/123/bloqueios. Essa modelagem cria um registro identificável do bloqueio e permite auditoria, consulta e idempotência."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Exemplos de identificação de recursos e intenções distintas.",
    "headers": [
      "Situação",
      "URI preferível",
      "Motivo"
    ],
    "rows": [
      [
        "Coleção de contas",
        "/contas",
        "Identifica o conjunto de recursos."
      ],
      [
        "Conta específica",
        "/contas/123",
        "Identidade estável do membro."
      ],
      [
        "Filtro",
        "/contas?status=ativa",
        "Seleciona uma visão da coleção."
      ],
      [
        "Ação auditável",
        "POST /contas/123/bloqueios",
        "Modela a ação como criação de recurso."
      ],
      [
        "Evitar",
        "/executarBloqueioConta?id=123",
        "Mistura RPC, parâmetro e operação em um nome instável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.10 Semântica dos métodos HTTP",
    "id": "10-10-semantica-dos-metodos-http"
  },
  {
    "kind": "paragraph",
    "text": "Métodos HTTP carregam semântica compartilhada. GET solicita a transferência de uma representação; HEAD obtém metadados equivalentes sem o conteúdo; POST pede que o recurso alvo processe a representação conforme sua semântica; PUT substitui o estado da representação no identificador; DELETE solicita remoção da associação; PATCH aplica uma modificação parcial; OPTIONS descreve opções de comunicação."
  },
  {
    "kind": "paragraph",
    "text": "O método não é apenas um campo decorativo. Caches, proxies, bibliotecas e mecanismos de repetição tomam decisões com base nele. Um GET com efeito colateral relevante pode ser disparado por prefetch, crawler ou revalidação. Um POST tratado como idempotente sem chave de idempotência pode duplicar transações quando o cliente repete após timeout."
  },
  {
    "kind": "paragraph",
    "text": "PUT normalmente é dirigido a um URI conhecido. O cliente envia a representação desejada e, dependendo do contrato, cria ou substitui o recurso. POST costuma ser usado quando o servidor seleciona o identificador ou quando a semântica não é simples substituição. A distinção deve ser observável no contrato, não apenas na implementação."
  },
  {
    "kind": "paragraph",
    "text": "HEAD e OPTIONS são frequentemente negligenciados. HEAD pode apoiar verificação de existência e validators, desde que os headers correspondam ao GET. OPTIONS pode apoiar CORS e descoberta de capacidades, mas não substitui documentação formal. TRACE geralmente é desabilitado em produção por política de segurança e raramente tem utilidade em APIs de negócio."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Propriedades semânticas dos métodos HTTP. Idempotência descreve o efeito pretendido, não a igualdade literal das respostas.",
    "headers": [
      "Método",
      "Seguro",
      "Idempotente",
      "Uso típico",
      "Resposta frequente"
    ],
    "rows": [
      [
        "GET",
        "Sim",
        "Sim",
        "Ler recurso ou coleção",
        "200, 206, 304, 404"
      ],
      [
        "HEAD",
        "Sim",
        "Sim",
        "Ler metadados sem conteúdo",
        "200, 304, 404"
      ],
      [
        "POST",
        "Não",
        "Não por padrão",
        "Criar membro ou processar comando",
        "201, 202, 200, 409"
      ],
      [
        "PUT",
        "Não",
        "Sim",
        "Criar/substituir em URI conhecido",
        "200, 201, 204, 412"
      ],
      [
        "PATCH",
        "Não",
        "Depende do formato",
        "Aplicar alteração parcial",
        "200, 204, 409, 412"
      ],
      [
        "DELETE",
        "Não",
        "Sim em intenção",
        "Remover associação/recurso",
        "202, 204, 404"
      ],
      [
        "OPTIONS",
        "Sim",
        "Sim",
        "Opções e CORS",
        "200, 204"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.11 Segurança, idempotência e repetição",
    "id": "10-11-seguranca-idempotencia-e-repeticao"
  },
  {
    "kind": "paragraph",
    "text": "Um método seguro é definido como somente leitura na intenção do cliente. Isso não impede efeitos incidentais como logs, métricas ou cobrança técnica, desde que o cliente não tenha solicitado alteração de estado por aquela interação. GET e HEAD são seguros; POST, PUT, PATCH e DELETE não são. Segurança semântica é relevante para automação, pré-carregamento e navegação."
  },
  {
    "kind": "paragraph",
    "text": "Idempotência significa que múltiplas requisições idênticas possuem o mesmo efeito pretendido que uma única requisição. PUT e DELETE são idempotentes em intenção, embora respostas possam variar: o primeiro DELETE pode retornar 204 e o segundo 404. A propriedade ajuda clientes e intermediários a decidir se uma operação pode ser repetida após falha de transporte."
  },
  {
    "kind": "paragraph",
    "text": "POST pode ganhar repetição segura por meio de chave de idempotência. O cliente envia um identificador único por tentativa lógica; o servidor armazena o resultado associado e retorna a mesma operação quando recebe a chave novamente com conteúdo compatível. A chave precisa ter escopo, prazo, regras de colisão e persistência definidos. Apenas deduplicar por corpo pode unir transações legítimas iguais."
  },
  {
    "kind": "paragraph",
    "text": "Timeout ambíguo é um cenário crítico. O cliente não sabe se o servidor processou a requisição antes de a conexão falhar. Em pagamentos, repetir cegamente pode duplicar débito. Um design robusto combina identificador de negócio, chave de idempotência, consulta de status e reconciliação. O gateway pode validar presença e formato da chave, mas a deduplicação precisa alcançar a camada que controla o efeito de negócio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.12 Códigos de status e semântica de respostas",
    "id": "10-12-codigos-de-status-e-semantica-de-respostas"
  },
  {
    "kind": "paragraph",
    "text": "Códigos de status classificam o resultado da tentativa de processar a requisição. A classe 2xx indica sucesso, 3xx redirecionamento ou uso de representação armazenada, 4xx condição atribuída à requisição ou ao cliente e 5xx falha do servidor ou intermediário. A escolha deve representar o estado do protocolo, enquanto o corpo detalha o problema de domínio."
  },
  {
    "kind": "paragraph",
    "text": "200 é apropriado quando existe representação de sucesso. 201 indica criação e deve normalmente acompanhar Location. 202 informa que o processamento foi aceito, não concluído. 204 indica sucesso sem conteúdo. Usar 200 para todas as situações e colocar sucesso=false no JSON impede que infraestrutura, métricas e clientes genéricos interpretem corretamente a resposta."
  },
  {
    "kind": "paragraph",
    "text": "Entre 4xx, 400 representa requisição sintaticamente ou semanticamente inválida de forma geral; 401 requer autenticação válida; 403 indica que a identidade foi compreendida, mas a ação não é permitida; 404 informa que o recurso não foi encontrado ou não pode ser revelado; 409 representa conflito com o estado atual; 412 indica falha de precondição; 422 pode representar conteúdo bem formado, mas não processável semanticamente."
  },
  {
    "kind": "paragraph",
    "text": "Em 5xx, 500 cobre falha inesperada do componente que responde; 502 indica resposta inválida de upstream; 503 representa indisponibilidade temporária e pode incluir Retry-After; 504 indica timeout aguardando upstream. Em uma arquitetura em camadas, é essencial registrar qual componente produziu o código. Um 502 do gateway não deve ser confundido com resposta do backend."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Códigos frequentes em APIs corporativas e erros de interpretação.",
    "headers": [
      "Código",
      "Uso recomendado",
      "Erro comum"
    ],
    "rows": [
      [
        "200 OK",
        "Operação concluída com representação",
        "Usado para esconder erros no corpo."
      ],
      [
        "201 Created",
        "Novo recurso criado; Location recomendado",
        "Retornar sem identificador do recurso."
      ],
      [
        "202 Accepted",
        "Processamento assíncrono iniciado",
        "Interpretar como conclusão do negócio."
      ],
      [
        "204 No Content",
        "Sucesso sem corpo",
        "Enviar JSON junto com 204."
      ],
      [
        "400 Bad Request",
        "Mensagem inválida ou parâmetros gerais",
        "Usar para qualquer regra de domínio."
      ],
      [
        "401 Unauthorized",
        "Credencial ausente ou inválida",
        "Usar quando o usuário está autenticado sem permissão."
      ],
      [
        "403 Forbidden",
        "Identidade sem autorização",
        "Revelar detalhes sensíveis da política."
      ],
      [
        "409 Conflict",
        "Conflito com estado atual",
        "Usar no lugar de precondição 412."
      ],
      [
        "429 Too Many Requests",
        "Limite excedido",
        "Não informar janela ou Retry-After."
      ],
      [
        "503 Service Unavailable",
        "Indisponibilidade temporária",
        "Usar para falha permanente de contrato."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.13 Negociação de conteúdo e formatos",
    "id": "10-13-negociacao-de-conteudo-e-formatos"
  },
  {
    "kind": "paragraph",
    "text": "Content-Type descreve o tipo do conteúdo enviado. Accept expressa formatos aceitáveis para a resposta. Quando o servidor não consegue produzir formato compatível, 406 pode ser usado; quando não suporta o corpo recebido, 415 é apropriado. O media type é parte da semântica e não deve ser inferido apenas pela extensão da URI."
  },
  {
    "kind": "paragraph",
    "text": "JSON é comum por simplicidade e ecossistema, mas possui decisões que precisam ser contratadas: representação de datas, valores monetários, números grandes, null, enums, nomes de propriedades e precisão. Valores financeiros não devem depender de ponto flutuante binário sem estratégia explícita. Uma quantia pode ser modelada com decimal textual ou unidade mínima inteira acompanhada da moeda."
  },
  {
    "kind": "paragraph",
    "text": "Negociação também pode envolver idioma, compressão e perfis. Accept-Language permite preferências de linguagem, enquanto Content-Encoding descreve compressão. Cabeçalhos Vary precisam refletir dimensões que alteram a resposta para que caches não reutilizem representação incompatível."
  },
  {
    "kind": "paragraph",
    "text": "Media types específicos podem evoluir contratos com maior precisão, mas aumentam complexidade operacional. Para muitas organizações, application/json com versionamento e documentação claros é suficiente. O importante é não misturar múltiplas estruturas incompatíveis sob o mesmo tipo sem mecanismo de discriminação e testes de contrato."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.14 PUT, PATCH e atualizações parciais",
    "id": "10-14-put-patch-e-atualizacoes-parciais"
  },
  {
    "kind": "paragraph",
    "text": "PUT representa substituição do estado da representação no URI alvo. Se o contrato permite campos omitidos com significado de preservação, a operação deixa de ser substituição clara e se aproxima de patch. Para evitar perda de dados, o servidor deve documentar campos obrigatórios, somente leitura, valores padrão e comportamento de propriedades ausentes."
  },
  {
    "kind": "paragraph",
    "text": "PATCH aplica um conjunto de mudanças e seu comportamento depende do media type. JSON Patch descreve operações como add, remove, replace e test sobre caminhos; JSON Merge Patch usa um documento semelhante ao recurso, no qual null possui semântica de remoção. Esses formatos resolvem problemas diferentes e devem ser escolhidos conscientemente."
  },
  {
    "kind": "paragraph",
    "text": "Atualização parcial aumenta risco de autorização por propriedade. Um cliente autorizado a editar apelido pode tentar alterar limite, situação ou titularidade. O servidor precisa validar permissões no nível de campo e ignorar silenciosamente propriedades não autorizadas raramente é uma boa escolha, pois mascara erros e ataques. Retornar problema explícito é mais auditável."
  },
  {
    "kind": "paragraph",
    "text": "PUT e PATCH devem ser combinados com precondições quando concorrência é relevante. Sem If-Match, dois consumidores podem ler a mesma versão e o último sobrescrever mudanças do primeiro. Validators transformam essa condição em conflito detectável e permitem que o cliente recarregue o estado antes de tentar novamente."
  },
  {
    "kind": "code",
    "text": "# Exemplo conceitual de JSON Patch\nPATCH /clientes/123\nContent-Type: application/json-patch+json\nIf-Match: \"v12\"\n[\n  {\"op\": \"replace\", \"path\": \"/apelido\", \"value\": \"Conta principal\"},\n  {\"op\": \"test\", \"path\": \"/situacao\", \"value\": \"ATIVA\"}\n]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.15 Coleções, filtros, ordenação e paginação",
    "id": "10-15-colecoes-filtros-ordenacao-e-paginacao"
  },
  {
    "kind": "paragraph",
    "text": "Coleções precisam permanecer utilizáveis quando o volume cresce. Retornar todos os registros funciona em laboratório, mas produz latência, consumo de memória e risco de indisponibilidade. A API deve definir tamanho padrão, máximo permitido e comportamento quando o cliente solicita valor acima do limite. Limites precisam existir no backend, não apenas no gateway."
  },
  {
    "kind": "paragraph",
    "text": "Paginação por offset é simples e permite saltar para uma posição, mas pode repetir ou omitir itens quando o conjunto muda entre páginas. Paginação por cursor usa uma posição opaca derivada da ordenação e tende a oferecer continuidade melhor em dados mutáveis. O cursor não deve expor detalhes internos que impeçam evolução ou permitam manipulação indevida."
  },
  {
    "kind": "paragraph",
    "text": "Filtros e ordenação precisam ser restritos a campos suportados. Aceitar expressões arbitrárias pode criar consultas caras ou injeção. A API deve documentar operadores, múltiplos valores, timezone, sensibilidade a maiúsculas e combinação AND/OR. O gateway pode limitar tamanho da query, mas o serviço deve controlar custo semântico."
  },
  {
    "kind": "paragraph",
    "text": "Metadados de paginação podem aparecer no corpo ou em links. Informar next é mais confiável do que pedir ao cliente para calcular o próximo cursor. Totais exatos podem ser caros e inconsistentes em grandes conjuntos; o contrato deve distinguir total exato, estimado ou ausente. Em telas, às vezes \"há mais\" é suficiente."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Estratégias de paginação e seus compromissos.",
    "headers": [
      "Estratégia",
      "Vantagens",
      "Limitações",
      "Uso indicado"
    ],
    "rows": [
      [
        "Offset/limit",
        "Simples; permite saltos",
        "Instável sob inserções; offsets altos podem ser caros",
        "Relatórios e conjuntos moderados"
      ],
      [
        "Página numerada",
        "Familiar para UI",
        "Mesmas limitações do offset",
        "Navegação humana"
      ],
      [
        "Cursor",
        "Continuidade e desempenho",
        "Não permite salto arbitrário; cursor deve ser opaco",
        "Feeds e grandes coleções"
      ],
      [
        "Keyset",
        "Consulta eficiente por chave ordenada",
        "Exige ordenação estável e composta",
        "Dados transacionais de alto volume"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.16 Erros padronizados com Problem Details",
    "id": "10-16-erros-padronizados-com-problem-details"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9457 define Problem Details para transportar erros legíveis por máquina sem criar um formato novo para cada API. Os membros básicos são type, title, status, detail e instance. O tipo identifica uma classe de problema por URI; o detalhe explica a ocorrência específica; instance identifica a ocorrência quando apropriado. Extensões podem adicionar campos de domínio."
  },
  {
    "kind": "paragraph",
    "text": "O status no corpo não substitui o código HTTP; ele ajuda quando o objeto é armazenado ou trafega por contexto que separa metadados. O type não deve ser um texto livre mutável. Uma URI controlada pela organização pode documentar significado, campos e ações recomendadas. Clientes devem tratar extensões desconhecidas de forma tolerante."
  },
  {
    "kind": "paragraph",
    "text": "Erros de validação podem incluir uma coleção de violações com caminho, código e mensagem. Não inclua stack trace, consulta SQL, nome de servidor ou detalhes de política. A resposta externa deve apoiar correção sem expor implementação. O identificador de correlação permite que suporte localize detalhes internos em logs protegidos."
  },
  {
    "kind": "paragraph",
    "text": "Padronização reduz código especial em consumidores e melhora observabilidade. O gateway pode converter falhas técnicas próprias para o mesmo formato, mas deve preservar origem e categoria. Um problema de autenticação gerado pelo gateway não deve usar o mesmo type de regra de negócio gerada pelo backend."
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.empresa.example/problemas/conta-bloqueada\",\n  \"title\": \"A conta não permite movimentação\",\n  \"status\": 409,\n  \"detail\": \"A conta 123 está bloqueada para débitos.\",\n  \"instance\": \"/ocorrencias/req-7f2a\",\n  \"codigo\": \"CONTA_BLOQUEADA\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Erro público e diagnóstico interno"
  },
  {
    "kind": "paragraph",
    "text": "A resposta deve ser estável e segura. Logs internos podem conter stack trace e contexto técnico, ligados pelo request ID. Não transporte detalhes internos para o consumidor apenas para facilitar suporte."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.17 Cache condicional, ETag e concorrência",
    "id": "10-17-cache-condicional-etag-e-concorrencia"
  },
  {
    "kind": "paragraph",
    "text": "Validators permitem verificar se uma representação mudou. ETag é um identificador atribuído à versão da representação; Last-Modified usa data de modificação. Em leituras, If-None-Match pode resultar em 304 Not Modified. Em alterações, If-Match exige que a versão atual corresponda ao validator enviado e evita sobrescrita silenciosa."
  },
  {
    "kind": "paragraph",
    "text": "ETag forte indica equivalência byte a byte segundo as regras do protocolo; ETag fraca indica equivalência semântica suficiente para cache, mas não para algumas operações de intervalo. A API deve evitar calcular hash caro de corpos grandes quando uma versão de domínio ou identificador de persistência já fornece validator adequado."
  },
  {
    "kind": "paragraph",
    "text": "Controle otimista de concorrência é especialmente importante em cadastros e configurações. O cliente lê v7, altera e envia If-Match: \"v7\". Se outro processo já produziu v8, o servidor retorna 412. O cliente então decide se recarrega, mescla ou abandona. Essa decisão não deve ser substituída automaticamente pelo gateway."
  },
  {
    "kind": "paragraph",
    "text": "Precondições também protegem criação. If-None-Match: * pode solicitar que a operação ocorra apenas se o recurso não existir. Esse mecanismo é útil quando o cliente conhece o URI e deseja evitar substituição acidental. A semântica deve ser testada em todos os intermediários para garantir que headers sejam preservados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/pt/figure-03.svg",
    "alt": "Leitura condicional e controle otimista de concorrência com ETag",
    "caption": "Figura 3 - Validators permitem revalidação e controle otimista de concorrência sem sessão de servidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.18 Operações assíncronas e processos longos",
    "id": "10-18-operacoes-assincronas-e-processos-longos"
  },
  {
    "kind": "paragraph",
    "text": "Uma operação que exige minutos não deve manter a conexão aberta indefinidamente. O servidor pode aceitar a solicitação, criar um recurso de operação e retornar 202 com Location para consulta. O recurso representa progresso, resultado, falha e timestamps, permitindo que o consumidor retome acompanhamento após desconexão."
  },
  {
    "kind": "paragraph",
    "text": "O estado da operação deve ter ciclo de vida claro: recebida, em processamento, concluída, falhou, cancelada ou expirada. Percentual só deve ser usado quando possui significado. Para etapas sem previsão confiável, informe fase atual. O resultado pode ser incorporado, apontado por link ou disponibilizado como recurso separado."
  },
  {
    "kind": "paragraph",
    "text": "Retry-After orienta quando consultar novamente, mas o cliente deve usar backoff e limites. Webhooks podem reduzir polling, porém introduzem autenticação, entrega pelo menos uma vez, repetição e validação de destino. Uma arquitetura pode combinar recurso consultável com webhook, garantindo recuperação quando a notificação falha."
  },
  {
    "kind": "paragraph",
    "text": "Operações assíncronas também precisam de idempotência. Repetir a criação após timeout deve retornar a mesma operação lógica quando a chave é igual. O gateway pode impor timeout de conexão curto sem cancelar o processamento no backend; por isso, status e correlação devem sobreviver ao término da conexão original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.19 Compatibilidade e versionamento",
    "id": "10-19-compatibilidade-e-versionamento"
  },
  {
    "kind": "paragraph",
    "text": "Versionamento é consequência de mudanças incompatíveis, não um objetivo por si só. Adicionar campo opcional costuma ser compatível para clientes tolerantes, enquanto remover campo, alterar tipo, renomear enum ou mudar significado pode quebrar consumidores. A organização precisa definir sua política de compatibilidade e testá-la automaticamente."
  },
  {
    "kind": "paragraph",
    "text": "Versão em caminho, como /v1, é visível e fácil de rotear, mas transforma a versão em parte de todos os identificadores. Versão por header ou media type preserva URI, porém pode ser menos evidente e exigir suporte específico. Nenhuma estratégia elimina a necessidade de governança, catálogo, depreciação e migração."
  },
  {
    "kind": "paragraph",
    "text": "Evite criar v2 por qualquer adição. Múltiplas versões simultâneas aumentam custo de segurança, operação e dados. Técnicas de evolução incluem campos aditivos, defaults, tolerância a desconhecidos, expansão controlada e endpoints de compatibilidade temporários. Mudanças semânticas precisam ser documentadas mesmo quando o schema permanece igual."
  },
  {
    "kind": "paragraph",
    "text": "Depreciação deve ser observável. A equipe precisa identificar consumidores, comunicar prazos, medir tráfego e oferecer ambiente de teste. Headers padronizados de depreciação e links para documentação podem complementar comunicação. Desligar uma versão apenas pela data, sem confirmar migração de fluxos críticos, é risco operacional."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Compatibilidade depende do comportamento dos consumidores, não apenas do schema.",
    "headers": [
      "Mudança",
      "Tende a ser compatível?",
      "Observação"
    ],
    "rows": [
      [
        "Adicionar campo opcional",
        "Sim",
        "Clientes devem ignorar campos desconhecidos."
      ],
      [
        "Adicionar enum recebido pelo cliente",
        "Talvez não",
        "Clientes com switch fechado podem falhar."
      ],
      [
        "Remover ou renomear campo",
        "Não",
        "Exige migração ou versão."
      ],
      [
        "Aumentar limite máximo",
        "Geralmente",
        "Pode afetar desempenho e validações."
      ],
      [
        "Tornar campo opcional obrigatório",
        "Não",
        "Quebra requisições existentes."
      ],
      [
        "Alterar significado sem mudar schema",
        "Não",
        "É quebra semântica difícil de detectar."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Tabela 5 - Compatibilidade depende do comportamento dos consumidores, não apenas do schema."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.20 Hipermídia e descoberta de transições",
    "id": "10-20-hipermidia-e-descoberta-de-transicoes"
  },
  {
    "kind": "paragraph",
    "text": "Hipermídia como motor do estado da aplicação significa que representações incluem controles que orientam ações possíveis. Um pagamento pendente pode apresentar link para cancelar; um pagamento concluído pode apresentar link para comprovante. O consumidor segue relações conhecidas em vez de construir URIs a partir de regras externas."
  },
  {
    "kind": "paragraph",
    "text": "O benefício é reduzir acoplamento à estrutura de caminhos e permitir que o servidor varie transições conforme estado e autorização. O custo é definir media types, relações e clientes capazes de interpretar controles. Em integrações internas simples, o retorno pode não justificar uma implementação completa, mas links ainda são úteis para navegação e descoberta."
  },
  {
    "kind": "paragraph",
    "text": "Links não substituem autorização. A ausência de um link pode orientar interface, mas o servidor precisa rejeitar chamadas não permitidas. Da mesma forma, apresentar um link não garante que a operação continuará válida, pois o estado pode mudar antes do uso. O cliente deve tratar conflitos e precondições."
  },
  {
    "kind": "paragraph",
    "text": "Uma abordagem pragmática inclui links para recursos relacionados, paginação, operação assíncrona, documentação de problemas e depreciação. Relações devem possuir nomes estáveis e significado documentado. Retornar apenas URLs sem relação explícita força o cliente a interpretar strings e perde parte do valor da hipermídia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.21 OpenAPI e design orientado a contrato",
    "id": "10-21-openapi-e-design-orientado-a-contrato"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI fornece descrição legível por máquinas e pessoas para APIs HTTP. A versão 3.2.0 amplia a especificação mantendo o objetivo de descrever operações, parâmetros, corpos, respostas, segurança e componentes reutilizáveis. O documento pode apoiar geração de documentação, mocks, validação, SDKs e testes, mas precisa permanecer alinhado ao runtime."
  },
  {
    "kind": "paragraph",
    "text": "No design contract-first, equipes definem semântica e exemplos antes ou em paralelo à implementação. Isso permite revisão por consumidores, segurança e arquitetura. Code-first pode acelerar serviços pequenos, mas tende a capturar detalhes da implementação e produzir contratos menos intencionais. Ambas as abordagens exigem pipeline que detecte divergência."
  },
  {
    "kind": "paragraph",
    "text": "Schemas devem representar restrições reais: required, formatos, limites, enums, nulabilidade e composição. Exemplos precisam ser válidos e variados, incluindo erros. Descrições não devem repetir o nome do campo; devem explicar significado, unidade, origem e regras. Operações precisam de identifiers estáveis para ferramentas e governança."
  },
  {
    "kind": "paragraph",
    "text": "Uma especificação completa não garante boa API. É possível documentar cuidadosamente endpoints inconsistentes. Revisões devem combinar validação estrutural, lint de padrões corporativos, teste de compatibilidade e análise semântica humana. O contrato publicado também precisa indicar política de SLA, limites, autenticação, suporte e ciclo de vida."
  },
  {
    "kind": "code",
    "text": "openapi: 3.2.0\ninfo:\n  title: API de Contas\n  version: 1.4.0\npaths:\n  /contas/{contaId}:\n    get:\n      operationId: obterConta\n      parameters:\n        - name: contaId\n          in: path\n          required: true\n          schema: { type: string }\n      responses:\n        \"200\":\n          description: Conta encontrada\n        \"404\":\n          description: Conta não encontrada"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.22 Segurança e autorização em APIs REST",
    "id": "10-22-seguranca-e-autorizacao-em-apis-rest"
  },
  {
    "kind": "paragraph",
    "text": "REST não define autenticação ou autorização. APIs normalmente utilizam TLS, OAuth 2.0, OpenID Connect, mTLS, assinaturas ou mecanismos corporativos. A segurança precisa ser aplicada por recurso, operação e propriedade. Autenticar um cliente não significa autorizar acesso a qualquer objeto."
  },
  {
    "kind": "paragraph",
    "text": "Broken Object Level Authorization ocorre quando o servidor aceita um identificador e não verifica se a identidade pode acessar aquele objeto. A proteção deve estar na camada de domínio ou autorização, não apenas na ocultação de IDs. Identificadores não sequenciais reduzem enumeração, mas não substituem verificação."
  },
  {
    "kind": "paragraph",
    "text": "Mass assignment e autorização por propriedade surgem quando a API vincula automaticamente o corpo a entidades internas. O contrato deve usar modelos de entrada específicos e listas permitidas. Campos como perfil, limite, proprietário e situação não podem ser alterados apenas porque aparecem no JSON."
  },
  {
    "kind": "paragraph",
    "text": "Também são necessários limites de consumo, validação de URLs externas, proteção contra SSRF, tamanho máximo de corpo, timeouts e controles de fluxo de negócio. O gateway é adequado para autenticação, quotas e filtros gerais; decisões como \"este usuário pode movimentar esta conta neste horário\" dependem do contexto do domínio."
  },
  {
    "kind": "subhead",
    "text": "Princípio de autorização"
  },
  {
    "kind": "paragraph",
    "text": "Valide a identidade, a função, o recurso específico, a operação e as propriedades alteradas. Uma checagem apenas no nível do endpoint é insuficiente para objetos com proprietários e regras distintas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.23 REST em API Gateways e políticas corporativas",
    "id": "10-23-rest-em-api-gateways-e-politicas-corporativas"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway recebe uma mensagem HTTP e pode terminar TLS, autenticar, validar token, aplicar quota, transformar headers, rotear e registrar métricas. Ele é parte do sistema em camadas e deve preservar a semântica do contrato. Políticas precisam distinguir erros do consumidor, do gateway e do backend para não transformar todas as falhas em respostas indistinguíveis."
  },
  {
    "kind": "paragraph",
    "text": "Validação de schema no gateway bloqueia mensagens inválidas antes do backend, mas deve usar a mesma versão do contrato. Divergência entre especificação, policy e código produz falsos negativos ou aceitações diferentes por ambiente. O pipeline deve publicar contrato e configuração como artefatos relacionados, com testes ponta a ponta."
  },
  {
    "kind": "paragraph",
    "text": "Transformações são úteis para compatibilidade e mediação, porém criam uma segunda implementação da API. Mudanças de nomes, defaults e tipos precisam ser rastreadas. Transformações extensas em gateway tendem a ocultar dívida do backend e dificultar troubleshooting, especialmente quando logs não mostram mensagem antes e depois da política."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting pode usar consumidor, aplicação, operação ou recurso como chave. Limite global por IP pode punir usuários atrás de NAT. Retry-After e headers de quota ajudam clientes, mas não devem expor detalhes sensíveis. O gateway também precisa proteger suas conexões com backends por pooling, timeouts e circuit breaking sem alterar indevidamente códigos de negócio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/pt/figure-04.svg",
    "alt": "REST em uma plataforma corporativa com políticas transversais no API Gateway",
    "caption": "Figura 4 - O gateway aplica políticas transversais; o serviço continua responsável pela semântica do recurso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.24 Observabilidade e troubleshooting",
    "id": "10-24-observabilidade-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting deve localizar a camada antes de discutir o design do endpoint. Falha de DNS, connect timeout ou handshake TLS ocorre antes da semântica REST. Um 401 pode ser produzido pelo gateway; um 404 pode vir de roteamento ou do backend; um 504 pode indicar que o gateway aguardou um upstream além do limite. Logs precisam identificar produtor da resposta."
  },
  {
    "kind": "paragraph",
    "text": "Registre método, template de rota, status, duração, tamanho, consumidor, operação e correlation ID. Evite registrar tokens, dados pessoais e corpos completos sem necessidade. O template /clientes/{id} é mais útil para métricas agregadas do que a URI com cada identificador. Traces devem propagar contexto até dependências internas."
  },
  {
    "kind": "paragraph",
    "text": "Métricas por código precisam ser interpretadas semanticamente. Crescimento de 409 pode indicar concorrência esperada ou regressão de regra; 429 pode ser proteção funcionando; 404 pode ser enumeração maliciosa ou falha de catálogo. Combine métricas com logs estruturados, traces e eventos de mudança de configuração."
  },
  {
    "kind": "paragraph",
    "text": "Para reproduzir problemas, preserve método, URI, headers relevantes, corpo sanitizado, timestamp e ambiente. Compare a mensagem observada pelo gateway com a recebida no backend. Ferramentas como curl permitem controlar headers e mostrar negociação, mas testes devem respeitar autorização e políticas do ambiente."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Classificação inicial de sintomas em uma arquitetura de APIs.",
    "headers": [
      "Sintoma",
      "Camada provável",
      "Evidência inicial"
    ],
    "rows": [
      [
        "Nome não resolve",
        "DNS",
        "Consulta ao resolvedor usado pelo runtime."
      ],
      [
        "Connection refused",
        "TCP/listener",
        "IP, porta, firewall e processo em escuta."
      ],
      [
        "Falha de certificado",
        "TLS",
        "SNI, cadeia, hostname e truststore."
      ],
      [
        "401 antes do backend",
        "Gateway/identidade",
        "Log de autenticação e issuer/audience."
      ],
      [
        "404 apenas por uma rota",
        "Gateway ou aplicação",
        "Template publicado e access log do backend."
      ],
      [
        "409/412",
        "Domínio/precondição",
        "Versão do recurso e headers If-Match."
      ],
      [
        "429",
        "Política de consumo",
        "Chave da quota, janela e Retry-After."
      ],
      [
        "502/504",
        "Gateway/upstream",
        "Connect/read timeout e status do pool."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.25 Estudos de caso e laboratórios",
    "id": "10-25-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Criação de pagamento após timeout"
  },
  {
    "kind": "paragraph",
    "text": "Um aplicativo envia POST /pagamentos e recebe timeout. O backend concluiu o débito, mas a resposta foi perdida entre gateway e cliente. O aplicativo repete a requisição e cria segundo pagamento. O problema não é apenas timeout; é ausência de identidade para a tentativa lógica. O contrato deveria exigir chave de idempotência e fornecer recurso consultável pelo identificador de negócio."
  },
  {
    "kind": "paragraph",
    "text": "A investigação deve correlacionar request IDs, chave de idempotência, identificador do pagamento e eventos do ledger. O gateway pode ter encerrado a espera aos 30 segundos enquanto o backend terminou aos 32. A correção inclui reduzir latência, alinhar timeouts e implementar deduplicação na camada que controla o efeito financeiro."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Atualização perdida em cadastro"
  },
  {
    "kind": "paragraph",
    "text": "Dois canais leem a versão 5 de um cliente. Um altera endereço e outro telefone. Ambos enviam PUT completo. O segundo sobrescreve a alteração do primeiro porque não existe precondição. A API aparenta sucesso, mas perdeu dado. ETag e If-Match permitiriam detectar a versão divergente e retornar 412."
  },
  {
    "kind": "paragraph",
    "text": "A solução também exige decidir se PUT completo é adequado ou se operações parciais representam melhor as intenções. PATCH reduz área de conflito, mas não elimina concorrência. Validators continuam necessários quando duas alterações afetam a mesma propriedade ou regra."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Paginação instável"
  },
  {
    "kind": "paragraph",
    "text": "Uma consulta usa offset com ordenação por data. Entre a página 1 e a página 2, novos registros são inseridos no início. Alguns itens se repetem e outros não aparecem. Para um feed transacional, cursor baseado em data e identificador oferece posição estável, desde que a ordenação seja total e o cursor seja validado."
  },
  {
    "kind": "paragraph",
    "text": "O contrato deve informar se a visão é um snapshot ou um fluxo em mudança. Totais podem divergir. Para auditoria, talvez seja necessário criar recurso de relatório com corte temporal; para navegação operacional, consistência eventual pode ser aceitável."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - Semântica e precondições"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Execute GET em um recurso e registre ETag, Cache-Control, Content-Type e status.",
      "Repita com If-None-Match e verifique se o servidor devolve 304 sem representação.",
      "Envie atualização com If-Match correto e observe o novo validator.",
      "Repita usando o validator antigo e confirme 412 ou comportamento documentado.",
      "Compare logs do gateway e do backend para identificar preservação dos headers."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - Contrato e erros"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Valide um documento OpenAPI com ferramenta autorizada pela organização.",
      "Crie exemplos de 400, 401, 403, 404, 409, 412, 429 e 503 no formato Problem Details.",
      "Confirme que nenhum erro expõe stack trace, token, host interno ou dados pessoais.",
      "Verifique se type, codigo e correlation ID permanecem estáveis entre ambientes.",
      "Teste se o gateway preserva Content-Type application/problem+json."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - Paginação e custo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Gere conjunto de teste com inserções concorrentes e compare offset com cursor.",
      "Meça latência para offsets crescentes e para keyset pagination.",
      "Tente filtros e ordenações não suportados e confirme rejeição previsível.",
      "Valide limite máximo de page size no gateway e no backend.",
      "Documente o significado de total, next e cursor expirado."
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
    "text": "REST é um estilo arquitetural formado por restrições que produzem propriedades para sistemas distribuídos. O desenho de APIs deve começar em recursos, representações e semântica compartilhada, não em uma lista de endpoints. HTTP oferece métodos, códigos, headers, cache e precondições que permitem expressar intenções de forma interoperável."
  },
  {
    "kind": "paragraph",
    "text": "Boas práticas não são regras estéticas isoladas. URIs estáveis, métodos corretos, idempotência, erros padronizados, paginação, compatibilidade e observabilidade reduzem acoplamento e falhas operacionais. API Gateways reforçam políticas transversais, mas não substituem autorização de domínio nem corrigem contratos semanticamente frágeis."
  },
  {
    "kind": "paragraph",
    "text": "Uma API corporativa madura é previsível para consumidores e operável para equipes. Ela informa quando respostas podem ser reutilizadas, protege atualizações concorrentes, expõe processos longos como recursos, evolui de forma compatível e registra evidências suficientes para localizar falhas em cada camada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de projeto"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Os recursos possuem identidade estável e não refletem diretamente tabelas internas?",
      "Métodos e códigos mantêm a semântica HTTP?",
      "GET e HEAD são seguros e operações repetíveis possuem estratégia de idempotência?",
      "Campos de entrada são explicitamente permitidos e autorizados?",
      "Cache-Control, ETag, Vary e precondições foram avaliados?",
      "Coleções têm limites, paginação e ordenação estável?",
      "Erros usam formato consistente sem detalhes sensíveis?",
      "Operações longas expõem recurso de status e recuperação?",
      "Mudanças passam por análise de compatibilidade e inventário de consumidores?",
      "OpenAPI, gateway e implementação são validados no mesmo pipeline?",
      "Logs e traces identificam qual componente produziu a resposta?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exercícios de revisão"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por que usar JSON e métodos HTTP não é suficiente para caracterizar REST.",
      "Diferencie estado de recurso e estado de sessão.",
      "Dê um exemplo em que POST precisa de chave de idempotência.",
      "Compare 409 Conflict e 412 Precondition Failed.",
      "Modele uma solicitação de bloqueio de cartão como recurso, indicando URI, método e respostas.",
      "Defina uma política de paginação para extrato com novos lançamentos concorrentes.",
      "Crie um Problem Details para limite diário excedido sem expor regra interna sensível.",
      "Liste mudanças de schema que podem quebrar clientes mesmo sem remover endpoints.",
      "Explique quais responsabilidades pertencem ao gateway e quais permanecem no serviço.",
      "Descreva um roteiro de diagnóstico para 504 observado pelo consumidor."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Glossário"
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Glossário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Cache validator",
        "Metadado usado para verificar se uma representação mudou, como ETag."
      ],
      [
        "Cliente-servidor",
        "Separação de responsabilidades entre interface consumidora e provedor de recursos."
      ],
      [
        "Cursor",
        "Token opaco que representa posição em uma coleção paginada."
      ],
      [
        "ETag",
        "Valor que identifica uma versão de representação para cache e precondições."
      ],
      [
        "HATEOAS",
        "Uso de hipermídia para orientar transições de estado da aplicação."
      ],
      [
        "Idempotência",
        "Propriedade de múltiplas requisições iguais produzirem o mesmo efeito pretendido."
      ],
      [
        "Interface uniforme",
        "Semântica comum para identificar e manipular recursos por mensagens autocontidas."
      ],
      [
        "Media type",
        "Identificador do formato e semântica do conteúdo."
      ],
      [
        "Precondição",
        "Condição expressa por headers como If-Match antes de executar operação."
      ],
      [
        "Problem Details",
        "Formato padronizado pela RFC 9457 para erros em APIs HTTP."
      ],
      [
        "Representação",
        "Sequência de bytes e metadados que expressam uma visão do estado de um recurso."
      ],
      [
        "Recurso",
        "Abstração identificável cujo estado pode ser representado e manipulado."
      ],
      [
        "REST",
        "Estilo arquitetural de transferência de estado representacional."
      ],
      [
        "Seguro",
        "Método cuja intenção é somente leitura, como GET."
      ],
      [
        "Stateless",
        "Restrição que evita dependência de estado conversacional oculto entre requisições."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Referências técnicas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "FIELDING, Roy T. Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine, 2000. Capítulo 5: Representational State Transfer.",
      "IETF. RFC 9110 - HTTP Semantics. 2022.",
      "IETF. RFC 9111 - HTTP Caching. 2022.",
      "IETF. RFC 3986 - Uniform Resource Identifier: Generic Syntax. 2005.",
      "IETF. RFC 8259 - The JavaScript Object Notation Data Interchange Format. 2017.",
      "IETF. RFC 5789 - PATCH Method for HTTP. 2010.",
      "IETF. RFC 6902 - JavaScript Object Notation Patch. 2013.",
      "IETF. RFC 7386 - JSON Merge Patch. 2014.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs. 2023.",
      "IETF. RFC 6585 - Additional HTTP Status Codes. 2012.",
      "OpenAPI Initiative. OpenAPI Specification 3.2.0. 2025.",
      "OWASP. API Security Top 10 - 2023 Edition.",
      "OWASP. Top 10 Web Application Security Risks - 2025 Edition."
    ]
  },
  {
    "kind": "subhead",
    "text": "Encerramento"
  },
  {
    "kind": "paragraph",
    "text": "No próximo capítulo, o curso pode aprofundar a semântica do HTTP e a modelagem de contratos, ou avançar para mecanismos de autenticação e autorização conforme a sequência oficial do FAAC. Os conceitos deste capítulo permanecerão como base para qualquer estilo de API HTTP."
  }
];
