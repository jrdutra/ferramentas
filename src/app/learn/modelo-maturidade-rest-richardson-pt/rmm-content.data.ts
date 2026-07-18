import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const RMM_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Evolução da interface segundo o Richardson Maturity Model"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/overview.svg",
    "alt": "Evolução da interface pelos quatro níveis do Richardson Maturity Model",
    "caption": "Visão geral - endpoint único, recursos, semântica HTTP e hipermídia formam uma progressão cumulativa de capacidades observáveis."
  },
  {
    "kind": "paragraph",
    "text": "Cada nível acrescenta uma capacidade de desenho; o modelo não certifica conformidade completa com REST."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "O Richardson Maturity Model, normalmente abreviado como RMM, organiza interfaces de serviços em quatro níveis: um ponto de entrada orientado a mensagens, recursos identificáveis, uso semântico do HTTP e controles de hipermídia. O modelo foi proposto por Leonard Richardson e popularizado por Martin Fowler como um caminho didático para decompor alguns elementos centrais de uma abordagem REST. Seu valor está em permitir que equipes observem capacidades concretas da interface sem depender apenas do rótulo “RESTful”."
  },
  {
    "kind": "paragraph",
    "text": "O modelo, entretanto, não é uma norma de certificação e não substitui as restrições arquiteturais descritas por Roy Fielding. Uma API pode atingir o nível 2 ao utilizar recursos, métodos e códigos HTTP de forma consistente e ainda manter sessão conversacional no servidor, impedir cache, expor detalhes de implementação ou criar forte acoplamento temporal. Da mesma forma, uma interface pode adotar links sem que seus clientes realmente naveguem pelas transições oferecidas. Portanto, nível e qualidade não são sinônimos automáticos."
  },
  {
    "kind": "paragraph",
    "text": "Neste capítulo, cada nível será analisado em profundidade, com exemplos de APIs corporativas e bancárias fictícias. Serão estudados os efeitos sobre contratos, consumidores, API Gateways, retries, idempotência, cache, autorização, observabilidade e evolução. O objetivo não é defender que toda API deva alcançar o nível 3, mas fornecer critérios para escolher conscientemente até onde avançar e quais propriedades se deseja obter."
  },
  {
    "kind": "paragraph",
    "text": "A análise também mostrará que a migração entre níveis não é apenas uma troca de URLs. Ela exige identificar recursos, separar comandos de representações, atribuir semântica correta a métodos e respostas, definir relações de hipermídia, planejar compatibilidade e ajustar políticas do gateway. Em ambientes com muitos consumidores, a sequência de evolução precisa ser mensurável e reversível."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo Use a mesma operação de negócio ao atravessar todos os níveis. Compare a forma de endereçar, a intenção expressa pelo método, os códigos retornados, a possibilidade de cache, as regras de retry e o conhecimento exigido do cliente. A comparação revela melhor o que cada nível acrescenta."
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
      "Explicar a origem, a finalidade e os limites do Richardson Maturity Model.",
      "Diferenciar os níveis 0, 1, 2 e 3 por propriedades observáveis da interface.",
      "Reconhecer padrões RPC e mensagens imperativas concentradas em um endpoint.",
      "Modelar recursos estáveis sem confundir recurso, tabela, DTO e operação.",
      "Aplicar métodos, códigos, headers, cache e precondições do HTTP no nível 2.",
      "Projetar links e ações de hipermídia que representem transições permitidas.",
      "Comparar RMM com as restrições arquiteturais de REST e com OpenAPI.",
      "Avaliar APIs existentes sem transformar a análise em uma pontuação superficial.",
      "Planejar migração incremental, governança e troubleshooting em API Gateways."
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
      "11.1 Origem e finalidade do modelo",
      "11.2 O que o RMM mede - e o que não mede",
      "11.3 Visão geral dos quatro níveis",
      "11.4 Nível 0: o pântano de POX",
      "11.5 Padrões e riscos operacionais do nível 0",
      "11.6 Transição do nível 0 para o nível 1",
      "11.7 Nível 1: recursos",
      "11.8 Identidade, granularidade e ciclo de vida",
      "11.9 Limitações do nível 1",
      "11.10 Transição para o nível 2",
      "11.11 Nível 2: métodos e semântica HTTP",
      "11.12 Status, headers, cache e precondições",
      "11.13 Idempotência, retries e erros",
      "11.14 Nível 2 em API Gateways",
      "11.15 Nível 3: controles de hipermídia",
      "11.16 Relações, links e ações",
      "11.17 Tipos de mídia e contratos de hipermídia",
      "11.18 Clientes orientados por transições",
      "11.19 Benefícios, custos e armadilhas do nível 3",
      "11.20 RMM versus REST de Fielding",
      "11.21 RMM, OpenAPI e governança",
      "11.22 Matriz de avaliação",
      "11.23 Estratégia de migração",
      "11.24 Observabilidade e troubleshooting",
      "11.25 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.1 Origem e finalidade do modelo",
    "id": "11-1-origem-e-finalidade-do-modelo"
  },
  {
    "kind": "paragraph",
    "text": "Leonard Richardson formulou o modelo como uma maneira de classificar estilos de serviços web pela adoção progressiva de recursos da Web. Martin Fowler o popularizou em 2010 com a imagem de uma escada: no nível 0 existe um único ponto de entrada orientado a mensagens; no nível 1 aparecem recursos; no nível 2 a interface usa métodos e respostas HTTP; no nível 3 as representações oferecem controles de hipermídia. A simplicidade dessa decomposição tornou o RMM útil em treinamentos, revisões de arquitetura e discussões de modernização."
  },
  {
    "kind": "paragraph",
    "text": "A palavra maturidade pode induzir uma interpretação equivocada. O nível superior não significa necessariamente que o produto, a equipe ou o domínio sejam “mais maduros” em todos os aspectos. O modelo descreve uma dimensão específica da interface. Segurança, disponibilidade, governança, documentação, desempenho, privacidade, consistência e experiência do desenvolvedor precisam de avaliações próprias. Uma API de nível 2 pode ser altamente confiável e adequada ao contexto; uma API de nível 3 pode ser insegura ou mal operada."
  },
  {
    "kind": "paragraph",
    "text": "O modelo funciona melhor como linguagem de diagnóstico. Em vez de perguntar apenas “esta API é REST?”, a equipe pode perguntar: há recursos identificáveis? Os métodos expressam intenção? A resposta usa status e headers coerentes? O consumidor descobre transições por hipermídia? Essas perguntas produzem evidências e decisões de evolução."
  },
  {
    "kind": "subhead",
    "text": "Uso responsável do termo maturidade Use o nível para descrever capacidades da interface, não para classificar pessoas ou determinar qualidade total. Registre separadamente atributos como segurança, compatibilidade, SLOs, documentação, governança e custo operacional."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.2 O que o RMM mede - e o que não mede",
    "id": "11-2-o-que-o-rmm-mede-e-o-que-nao-mede"
  },
  {
    "kind": "paragraph",
    "text": "O RMM observa principalmente três movimentos: decompor uma operação genérica em recursos identificáveis, aproveitar a semântica padronizada do HTTP e tornar transições visíveis na própria representação. Esses movimentos reduzem parte do acoplamento entre consumidor e servidor porque transferem conhecimento para elementos compartilhados da Web: URIs, métodos, códigos, headers, links e relações."
  },
  {
    "kind": "paragraph",
    "text": "O modelo não verifica todas as restrições de REST. Cliente-servidor, stateless, cache, sistema em camadas e código sob demanda não aparecem como degraus independentes. O nível 2 toca cache e interface uniforme, e o nível 3 se aproxima da hipermídia como motor do estado da aplicação, mas a avaliação completa de REST exige análise arquitetural mais ampla. Por isso, Fowler descreve o nível 3 como um passo em direção à “glória de REST”, não como uma prova automática de conformidade."
  },
  {
    "kind": "paragraph",
    "text": "Também não existe um teste universal para decidir o nível quando a API mistura estilos. Uma plataforma pode possuir endpoints de consulta no nível 2, comandos legados no nível 0 e um fluxo específico com hipermídia. Nesses casos, classificar a API inteira por um único número esconde informação. A análise deve ser feita por superfície, recurso ou jornada de negócio, registrando exceções."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.3 Visão geral dos quatro níveis",
    "id": "11-3-visao-geral-dos-quatro-niveis"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-01.svg",
    "alt": "Os quatro níveis cumulativos do Richardson Maturity Model",
    "caption": "Figura 1 - O RMM organiza capacidades da interface em quatro níveis cumulativos, mas não mede todos os atributos de uma plataforma de APIs."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Capacidades, dependências e riscos associados a cada nível.",
    "headers": [
      "Nível",
      "Elemento acrescentado",
      "Conhecimento principal do cliente",
      "Risco característico"
    ],
    "rows": [
      [
        "0",
        "Mensagens sobre um endpoint",
        "Operações e formato proprietário",
        "Dispatcher central, pouca semântica compartilhada"
      ],
      [
        "1",
        "Recursos e identificadores",
        "Quais recursos existem e como endereçá-los",
        "Recursos tratados apenas como envelopes de comandos"
      ],
      [
        "2",
        "Métodos, status e headers HTTP",
        "Semântica do protocolo e contrato do recurso",
        "Uso decorativo de verbos ou códigos inconsistentes"
      ],
      [
        "3",
        "Controles de hipermídia",
        "Relações e tipos de mídia",
        "Links sem semântica ou clientes que continuam codificando o fluxo"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.4 Nível 0: o pântano de POX",
    "id": "11-4-nivel-0-o-pantano-de-pox"
  },
  {
    "kind": "paragraph",
    "text": "No nível 0, o serviço costuma publicar um único endpoint e usar o corpo da mensagem para indicar qual operação deve ser executada. POX significa “Plain Old XML”, expressão histórica para mensagens XML sem aproveitar recursos mais ricos da Web; na prática atual, a mesma estrutura pode aparecer com JSON, Protobuf ou outro formato. O aspecto decisivo não é o formato, mas a concentração das intenções em uma interface genérica."
  },
  {
    "kind": "paragraph",
    "text": "Um serviço de pagamentos poderia receber sempre POST /servico-pagamentos e distinguir operações por um campo como operation. Consultar saldo, criar transferência, cancelar agendamento e emitir extrato compartilham o mesmo endereço e método. O servidor atua como dispatcher: interpreta o comando e encaminha para a rotina correspondente. Muitos serviços SOAP, RPC sobre HTTP e integrações legadas se aproximam desse nível."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-02.svg",
    "alt": "Várias intenções convergindo para um endpoint e um dispatcher no nível 0",
    "caption": "Figura 2 - No nível 0, o protocolo transporta uma mensagem proprietária e o corpo concentra a intenção da operação."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de mensagem no nível 0"
  },
  {
    "kind": "code",
    "text": "POST /servico-pagamentos HTTP/1.1\nContent-Type: application/json\n{\n  \"operation\": \"CRIAR_TRANSFERENCIA\",\n  \"contaOrigem\": \"991\",\n  \"contaDestino\": \"552\",\n  \"valor\": 120.00\n}"
  },
  {
    "kind": "paragraph",
    "text": "O nível 0 não é sinônimo de implementação ruim. Em cenários fechados, filas de comandos, protocolos binários, operações altamente especializadas ou compatibilidade com sistemas antigos, RPC pode ser uma decisão válida. O problema surge quando a organização espera propriedades da Web - cache, semântica uniforme, visibilidade por intermediários e evolução desacoplada - sem expor elementos que permitam obtê-las."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.5 Padrões e riscos operacionais do nível 0",
    "id": "11-5-padroes-e-riscos-operacionais-do-nivel-0"
  },
  {
    "kind": "paragraph",
    "text": "A principal consequência é que componentes intermediários enxergam pouca diferença entre operações. Um API Gateway observa vários POST para o mesmo caminho, e a distinção real está escondida no corpo. Regras de autorização, quotas, cache, métricas e roteamento precisam inspecionar conteúdo ou confiar em campos proprietários. Isso aumenta custo de política, reduz desempenho e dificulta correlação com ferramentas que agregam métricas por método e rota."
  },
  {
    "kind": "paragraph",
    "text": "Retries também se tornam arriscados. O método POST não informa se uma operação é repetível, e o mesmo endpoint pode conter consultas, comandos idempotentes e comandos não idempotentes. Um timeout deixa o cliente sem saber se o servidor executou a ação. A solução costuma exigir identificadores de correlação, chaves de idempotência ou status de processamento, mas esses mecanismos precisam ser definidos fora da semântica básica do protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Erros frequentemente retornam 200 com um envelope contendo success=false ou códigos internos. Essa prática impede que load balancers, gateways, SDKs e observabilidade usem a classe de status HTTP como sinal. Também cria ambiguidade entre falha de transporte, rejeição do gateway e erro de negócio. O consumidor precisa interpretar o corpo antes de classificar qualquer resultado."
  },
  {
    "kind": "subhead",
    "text": "Sinal de nível 0 Se a documentação começa por uma lista de operações aceitas em um campo action, command, operation ou serviceName e quase tudo usa POST no mesmo caminho, a interface provavelmente está no nível 0, mesmo quando as mensagens são JSON e o produto é chamado de API REST."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Efeitos típicos de uma interface concentrada no nível 0.",
    "headers": [
      "Sintoma",
      "Impacto no gateway",
      "Impacto no consumidor"
    ],
    "rows": [
      [
        "Um URI para tudo",
        "Políticas dependem de inspeção do body",
        "SDK precisa conhecer dispatcher e códigos internos"
      ],
      [
        "200 para sucesso e erro",
        "Métricas por status ficam enganosas",
        "Tratamento de erro depende do envelope"
      ],
      [
        "POST para leitura e escrita",
        "Cache e segurança não podem inferir intenção",
        "Retry exige regra específica por operação"
      ],
      [
        "Contrato central extenso",
        "Mudanças afetam grande superfície",
        "Versionamento e testes tornam-se monolíticos"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.6 Transição do nível 0 para o nível 1",
    "id": "11-6-transicao-do-nivel-0-para-o-nivel-1"
  },
  {
    "kind": "paragraph",
    "text": "A primeira transição consiste em tornar explícitas as entidades ou conceitos que possuem identidade e ciclo de vida. Em vez de enviar todas as mensagens a /servico, a interface passa a endereçar clientes, contas, transferências, agendamentos e extratos. Essa mudança exige compreender o domínio: uma transferência não é apenas uma função; ela pode ser criada, validada, confirmada, rejeitada, cancelada e consultada ao longo do tempo."
  },
  {
    "kind": "paragraph",
    "text": "A migração deve começar por inventário. Cada operação do dispatcher é classificada como consulta, criação, alteração, comando, processo ou integração. Em seguida, a equipe identifica quais objetos precisam de endereço estável, quais são subordinados a outros e quais representam processos. O objetivo não é transformar cada tabela em endpoint, mas encontrar unidades de significado que consumidores possam referenciar."
  },
  {
    "kind": "paragraph",
    "text": "Compatibilidade pode ser preservada com uma camada de adaptação. O endpoint legado continua aceitando mensagens e internamente chama os novos serviços orientados a recursos. Novos consumidores adotam a superfície nova, enquanto métricas medem a redução de uso do contrato antigo. Essa estratégia evita uma migração “big bang” e permite validar a modelagem antes de remover o dispatcher."
  },
  {
    "kind": "subhead",
    "text": "Pergunta de modelagem O que precisa ser identificado, consultado ou referenciado depois da operação terminar? A resposta frequentemente revela um recurso. Uma solicitação de transferência, por exemplo, continua existindo como entidade auditável mesmo após a resposta inicial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.7 Nível 1: recursos",
    "id": "11-7-nivel-1-recursos"
  },
  {
    "kind": "paragraph",
    "text": "No nível 1, a interface publica múltiplos recursos com identificadores próprios. O consumidor deixa de conhecer apenas uma porta de entrada genérica e passa a interagir com endereços que representam partes do domínio. A URI funciona como identificador, não como descrição completa da implementação. /transferencias/abc pode continuar válido mesmo que o serviço mude de banco, linguagem ou topologia."
  },
  {
    "kind": "paragraph",
    "text": "O modelo não exige que o nível 1 utilize corretamente todos os métodos HTTP. A API pode continuar enviando POST para /clientes/483/consultar, /transferencias/abc/cancelar ou /contas/991/extrato. Houve avanço na identificação, mas a intenção ainda está parcialmente codificada em verbos do caminho ou no corpo. Essa característica explica por que recursos são necessários, porém insuficientes para uma interface HTTP semanticamente rica."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-03.svg",
    "alt": "Recursos distintos com identidade e escopo visíveis no nível 1",
    "caption": "Figura 3 - Recursos distintos tornam identidade e escopo visíveis, embora operações ainda possam permanecer imperativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.8 Identidade, granularidade e ciclo de vida",
    "id": "11-8-identidade-granularidade-e-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "Um recurso é uma abstração identificável, e não obrigatoriamente uma linha de banco. Pode representar uma entidade durável, uma coleção, uma projeção, um documento, um processo ou o resultado de um cálculo. /limites-operacionais/cliente-483 pode ser uma visão calculada; /solicitacoes-transferencia/abc pode representar um processo; /extratos/conta-991/2026-07 pode representar um documento produzido para um período."
  },
  {
    "kind": "paragraph",
    "text": "A granularidade deve refletir coesão e padrões de acesso. Recursos excessivamente grandes forçam consumidores a transferir e atualizar dados irrelevantes. Recursos muito fragmentados aumentam round trips e complexidade de composição. Em sistemas corporativos, a fronteira também precisa considerar autorização, ownership, consistência transacional e capacidade de evolução independente."
  },
  {
    "kind": "paragraph",
    "text": "Identificadores públicos não devem expor chaves internas sem necessidade. Um número sequencial pode facilitar enumeração e revelar volume; uma chave de tabela pode mudar durante migrações. A API pode usar identificadores opacos, aliases de negócio ou URIs estáveis. O importante é definir unicidade, escopo, permanência e comportamento quando o recurso é removido ou substituído."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Perguntas para modelar recursos no nível 1.",
    "headers": [
      "Decisão",
      "Pergunta técnica",
      "Exemplo"
    ],
    "rows": [
      [
        "Identidade",
        "O recurso precisa ser referenciado depois?",
        "/transferencias/{id}"
      ],
      [
        "Escopo",
        "A identidade é global ou subordinada?",
        "/contas/{conta}/agendamentos/{id}"
      ],
      [
        "Granularidade",
        "Quais dados mudam e são autorizados juntos?",
        "preferências separadas do cadastro"
      ],
      [
        "Ciclo de vida",
        "Quais estados e transições existem?",
        "PENDENTE -> CONFIRMADA -> LIQUIDADA"
      ],
      [
        "Permanência",
        "O identificador sobrevive a migrações internas?",
        "ID público opaco"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.9 Limitações do nível 1",
    "id": "11-9-limitacoes-do-nivel-1"
  },
  {
    "kind": "paragraph",
    "text": "Separar recursos melhora observabilidade e organização, mas não resolve sozinho a semântica das operações. Endpoints como POST /transferencias/abc/consultar e POST /transferencias/abc/remover ainda escondem propriedades conhecidas pelo HTTP. O gateway não pode inferir que consultar é seguro ou que remover deve produzir determinada classe de resposta. O cliente depende de convenções específicas de cada API."
  },
  {
    "kind": "paragraph",
    "text": "Outro risco é criar “recursos falsos” apenas para acomodar verbos. Caminhos como /criarTransferencia, /executarPagamento ou /obterClientes usam múltiplos endereços, porém continuam modelando funções. Essa interface pode ser clara e funcional, mas o avanço em direção à interface uniforme é limitado. A análise deve observar o significado do identificador, não apenas contar URLs."
  },
  {
    "kind": "paragraph",
    "text": "No nível 1, coleções e relações também podem ser inconsistentes. Uma equipe pode usar /cliente/483/conta e outra /consultarContasPorCliente?id=483. Sem padrões de nomenclatura, cardinalidade, paginação e erros, a expansão de recursos aumenta a superfície sem gerar previsibilidade. Governança continua necessária."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.10 Transição para o nível 2",
    "id": "11-10-transicao-para-o-nivel-2"
  },
  {
    "kind": "paragraph",
    "text": "A segunda transição consiste em mapear intenções para a semântica do HTTP. Consultas usam GET ou HEAD; criação costuma usar POST na coleção; substituição idempotente pode usar PUT; remoção usa DELETE; atualizações parciais podem usar PATCH quando seu formato e semântica são definidos. O método deixa de ser apenas um campo de transporte e passa a comunicar propriedades a clientes e intermediários."
  },
  {
    "kind": "paragraph",
    "text": "Essa migração exige também revisar respostas. A criação pode retornar 201 Created com Location; processamento assíncrono pode usar 202 Accepted; precondição não satisfeita pode produzir 412; conflito de estado pode produzir 409; validação pode utilizar Problem Details. Headers como ETag, Cache-Control, Allow, Retry-After e Vary passam a fazer parte do contrato."
  },
  {
    "kind": "paragraph",
    "text": "Não basta substituir POST por verbos diferentes. O comportamento precisa respeitar segurança, idempotência e semântica. Um GET que cancela um agendamento continua perigoso, ainda que o caminho pareça orientado a recursos. Um PUT que cria efeitos adicionais em cada repetição não é idempotente. O nível 2 depende de comportamento observável, não de decoração sintática."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de leitura com semântica HTTP"
  },
  {
    "kind": "code",
    "text": "GET /transferencias/abc HTTP/1.1\nAccept: application/json\nHTTP/1.1 200 OK\nContent-Type: application/json\nETag: \"v7\"\n{ \"id\": \"abc\", \"status\": \"PENDENTE\", \"valor\": 120.00 }"
  },
  {
    "kind": "subhead",
    "text": "Critério de transição Para cada operação, registre: recurso alvo, método, propriedade de segurança, idempotência, resposta de sucesso, erros, headers, possibilidade de cache e política de retry. A tabela evidencia onde a troca de verbo exige mudança real de comportamento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.11 Nível 2: métodos e semântica HTTP",
    "id": "11-11-nivel-2-metodos-e-semantica-http"
  },
  {
    "kind": "paragraph",
    "text": "No nível 2, a interface utiliza o vocabulário do HTTP para expressar intenções. A semântica é compartilhada por navegadores, bibliotecas, proxies, gateways e ferramentas de observabilidade. GET é seguro e não deve solicitar alteração de estado; PUT e DELETE são idempotentes; POST é flexível e normalmente não idempotente; HEAD possui a mesma semântica de GET sem conteúdo de resposta. PATCH depende do tipo de documento de patch utilizado."
  },
  {
    "kind": "paragraph",
    "text": "O benefício não é apenas estético. Um gateway pode aplicar regras diferentes para leitura e escrita, caches podem reutilizar respostas, SDKs podem classificar resultados por status, clientes podem implementar retries de operações idempotentes com mais segurança e equipes de SRE podem agrupar métricas por método e rota. A interface torna-se mais visível para componentes que não conhecem o domínio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-04.svg",
    "alt": "Métodos e respostas HTTP carregando semântica compartilhada no nível 2",
    "caption": "Figura 4 - Métodos e respostas padronizadas permitem que componentes genéricos compreendam propriedades da interação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.12 Status, headers, cache e precondições",
    "id": "11-12-status-headers-cache-e-precondicoes"
  },
  {
    "kind": "paragraph",
    "text": "Códigos de status classificam o resultado da tentativa de processar a requisição. Eles não substituem detalhes de domínio, mas fornecem uma primeira camada interoperável. 2xx indica processamento bem-sucedido; 3xx orienta redirecionamento ou reutilização; 4xx indica que a requisição não pode ser atendida nas condições apresentadas; 5xx aponta falha do servidor ou de um intermediário. A escolha deve refletir quem produziu a resposta e o estado observado."
  },
  {
    "kind": "paragraph",
    "text": "Headers ampliam a semântica. Location identifica o recurso criado ou a localização relevante; ETag representa uma versão da representação; If-Match e If-None-Match expressam precondições; Cache-Control controla reutilização; Retry-After orienta nova tentativa; Allow informa métodos suportados; Vary descreve quais campos da requisição influenciam a resposta. Ignorar esses elementos reduz o nível 2 a uma tabela de verbos."
  },
  {
    "kind": "paragraph",
    "text": "Precondições são especialmente importantes em APIs corporativas. Dois consumidores podem ler a versão v7 de um recurso e tentar atualizá-lo. Sem controle, a última escrita sobrescreve a anterior. Com ETag e If-Match, o servidor executa a alteração apenas se a versão ainda corresponde. Se o estado mudou, retorna 412 Precondition Failed, permitindo que o cliente recarregue e reconcilie."
  },
  {
    "kind": "subhead",
    "text": "Atualização protegida por precondição"
  },
  {
    "kind": "code",
    "text": "PUT /preferencias/cliente-483 HTTP/1.1\nContent-Type: application/json\nIf-Match: \"v7\"\n{ \"idioma\": \"pt-BR\", \"notificacoes\": true }\nHTTP/1.1 412 Precondition Failed\nContent-Type: application/problem+json"
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Elementos do protocolo que tornam a interface mais operável.",
    "headers": [
      "Elemento HTTP",
      "Uso no nível 2",
      "Falha comum"
    ],
    "rows": [
      [
        "201 + Location",
        "Confirma criação e informa identificador",
        "Retornar 200 sem referência ao novo recurso"
      ],
      [
        "202 + monitor",
        "Aceita processo ainda não concluído",
        "Tratar aceitação como sucesso final"
      ],
      [
        "ETag / If-Match",
        "Evita perda de atualização",
        "Gerar ETag sem validar precondições"
      ],
      [
        "Cache-Control",
        "Define reutilização e revalidação",
        "Cachear resposta sensível sem política explícita"
      ],
      [
        "Retry-After",
        "Orienta nova tentativa",
        "Responder 429/503 sem janela ou estratégia"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.13 Idempotência, retries e erros",
    "id": "11-13-idempotencia-retries-e-erros"
  },
  {
    "kind": "paragraph",
    "text": "Idempotência significa que repetir a mesma requisição produz o mesmo efeito pretendido no servidor, embora a representação da resposta possa variar. PUT e DELETE são definidos como idempotentes; POST não recebe essa garantia por padrão. Em sistemas distribuídos, timeout não prova que a operação falhou. O cliente pode perder a resposta depois de o servidor concluir o comando, criando risco de duplicação."
  },
  {
    "kind": "paragraph",
    "text": "Para operações não idempotentes, uma chave de idempotência pode associar tentativas equivalentes a um único resultado. O servidor precisa definir escopo, expiração, comparação de payload, persistência e comportamento concorrente. O gateway pode exigir o header e limitar formato, mas a deduplicação de negócio geralmente pertence ao serviço que conhece a operação e sua transação."
  },
  {
    "kind": "paragraph",
    "text": "Erros devem combinar status HTTP e uma representação estável. Problem Details, definido atualmente pela RFC 9457, fornece campos como type, title, status, detail e instance, além de extensões. O status classifica o resultado; o type identifica uma categoria de problema; extensões carregam dados estruturados. Mensagens internas, stack traces e dados sensíveis não devem ser expostos."
  },
  {
    "kind": "subhead",
    "text": "Erro estruturado no nível 2"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.exemplo/problemas/estado-invalido\",\n  \"title\": \"Transição não permitida\",\n  \"status\": 409,\n  \"detail\": \"A transferência já foi liquidada.\",\n  \"instance\": \"/transferencias/abc\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Retry não é apenas configuração de cliente A estratégia depende de método, idempotência, fase da falha e capacidade de deduplicação. Repetir automaticamente um POST financeiro após timeout sem chave de idempotência pode duplicar efeitos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.14 Nível 2 em API Gateways",
    "id": "11-14-nivel-2-em-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways se beneficiam diretamente da semântica do nível 2. Políticas podem separar leitura e escrita por método, aplicar quotas por operação, bloquear métodos não publicados, validar Content-Type e Accept, propagar correlation IDs, produzir 405 quando o método não é permitido e normalizar erros de infraestrutura. Métricas por route template e status tornam-se mais representativas."
  },
  {
    "kind": "paragraph",
    "text": "O gateway, contudo, não transforma uma API em nível 2 apenas reescrevendo caminhos ou métodos. Se recebe GET e chama internamente um comando que altera estado, a propriedade de segurança foi violada. Se converte todo erro do backend em 200, destrói semântica. Se adiciona ETag sem garantir que a versão represente o estado, cria uma precondição falsa. A responsabilidade precisa ser compartilhada com o serviço."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas com múltiplos saltos, deve-se registrar onde cada resposta foi criada. Um 429 pode vir do gateway por quota, um 503 do balanceador, um 409 do domínio e um 401 do provedor de identidade. Padronização ajuda o consumidor, mas logs e headers de correlação precisam preservar a origem para troubleshooting."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-05.svg",
    "alt": "API Gateway reforçando políticas sem substituir a semântica do domínio",
    "caption": "Figura 5 - O gateway reforça a interface e aplica políticas transversais; a semântica do domínio continua pertencendo à API."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Uso do nível 2 em políticas de gateway.",
    "headers": [
      "Política",
      "Responsabilidade adequada",
      "Antipadrão"
    ],
    "rows": [
      [
        "Autenticação",
        "Validar credencial e contexto",
        "Inventar autorização fina sem dados do domínio"
      ],
      [
        "Roteamento",
        "Mapear contrato para upstream",
        "Mascarar rotas incompatíveis sem observabilidade"
      ],
      [
        "Rate limiting",
        "Proteger capacidade e planos",
        "Usar o mesmo limite para leitura leve e comando caro"
      ],
      [
        "Validação",
        "Rejeitar forma inválida do contrato",
        "Aceitar payload e alterar silenciosamente significado"
      ],
      [
        "Transformação de erro",
        "Normalizar infraestrutura e formato",
        "Converter todos os erros em 200 ou 500"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.15 Nível 3: controles de hipermídia",
    "id": "11-15-nivel-3-controles-de-hipermidia"
  },
  {
    "kind": "paragraph",
    "text": "O nível 3 acrescenta controles de hipermídia às representações. Além de retornar dados, o servidor informa relações e transições disponíveis no estado atual. Uma transferência pendente pode oferecer links self, confirm e cancel; uma transferência liquidada pode oferecer apenas self e receipt. O cliente não precisa construir todas as URLs nem manter uma tabela completa de estados para saber quais ações estão habilitadas."
  },
  {
    "kind": "paragraph",
    "text": "Essa abordagem se relaciona ao princípio HATEOAS: hypermedia as the engine of application state. “Estado da aplicação” refere-se ao progresso do cliente por uma sequência de interações, guiado por controles recebidos. O servidor continua controlando o estado dos recursos, enquanto a representação descreve caminhos possíveis. A Web funciona dessa forma quando um navegador recebe links e formulários."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-06.svg",
    "alt": "Controles de hipermídia expondo as transições permitidas para uma transferência",
    "caption": "Figura 6 - A representação de uma transferência pendente expõe somente as transições permitidas naquele momento."
  },
  {
    "kind": "subhead",
    "text": "Representação conceitual com controles de hipermídia"
  },
  {
    "kind": "code",
    "text": "{\n  \"id\": \"abc\",\n  \"status\": \"PENDENTE\",\n  \"valor\": 120.00,\n  \"_links\": {\n    \"self\":    { \"href\": \"/transferencias/abc\" },\n    \"confirm\": { \"href\": \"/transferencias/abc/confirmacao\", \"method\": \"POST\" },\n    \"cancel\":  { \"href\": \"/transferencias/abc/cancelamento\", \"method\": \"POST\" }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.16 Relações, links e ações",
    "id": "11-16-relacoes-links-e-acoes"
  },
  {
    "kind": "paragraph",
    "text": "Um link útil possui destino e relação semântica. A relação self indica a identificação canônica da representação; next e prev podem navegar páginas; collection aponta à coleção; item relaciona coleção e membro. Relações registradas no IANA permitem significado compartilhado, enquanto relações específicas podem usar URIs próprias. O nome do campo sozinho não deve ser a única definição semântica."
  },
  {
    "kind": "paragraph",
    "text": "Ações exigem mais informação que um href. O cliente pode precisar de método, tipo de conteúdo, campos, restrições e documentação. Diferentes formatos de hipermídia representam essas informações de formas distintas. Não existe um único formato obrigatório para REST; o contrato deve definir o tipo de mídia, as relações e como interpretar controles."
  },
  {
    "kind": "paragraph",
    "text": "Controles precisam refletir autorização e estado, mas sua ausência não substitui enforcement. O servidor deve validar novamente toda ação. Um cliente pode fabricar uma requisição ou reutilizar um link antigo. A hipermídia orienta a experiência e reduz tentativas inválidas; autorização e validação continuam obrigatórias."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Relações devem possuir significado estável e documentado.",
    "headers": [
      "Relação",
      "Significado possível",
      "Observação"
    ],
    "rows": [
      [
        "self",
        "Identificador da representação atual",
        "Ajuda cache, correlação e atualização"
      ],
      [
        "collection",
        "Coleção à qual o item pertence",
        "Pode orientar navegação e criação"
      ],
      [
        "next / prev",
        "Paginação ou sequência",
        "Prefira links completos a reconstrução de cursor"
      ],
      [
        "confirm",
        "Transição de domínio específica",
        "Defina relação por URI ou contrato de mídia"
      ],
      [
        "describedby",
        "Documento que descreve o recurso",
        "Não substitui controles executáveis"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.17 Tipos de mídia e contratos de hipermídia",
    "id": "11-17-tipos-de-midia-e-contratos-de-hipermidia"
  },
  {
    "kind": "paragraph",
    "text": "Hipermídia depende de uma convenção que o cliente compreenda. application/json, isoladamente, define apenas a sintaxe JSON; não informa que _links contém relações, que actions descreve formulários ou como URI templates devem ser expandidos. A API pode adotar um tipo de mídia conhecido, um perfil ou um tipo específico da organização. O importante é que o significado seja explícito e versionável."
  },
  {
    "kind": "paragraph",
    "text": "Tipos de mídia específicos podem permitir evolução independente de URLs, mas também aumentam governança e tooling. SDKs, validadores, gateways e documentação precisam conhecer o formato. Em organizações com muitas equipes, uma especificação interna de hipermídia deve definir campos obrigatórios, relações registradas, templates, ações, erros, compatibilidade e regras de segurança."
  },
  {
    "kind": "paragraph",
    "text": "Web Linking, definido pela RFC 8288, permite transportar links em headers e representações. URI Templates, definidos pela RFC 6570, permitem descrever destinos parametrizados. Esses padrões podem compor uma solução, mas não fornecem sozinhos um modelo completo de ações. A escolha deve considerar capacidades reais dos consumidores."
  },
  {
    "kind": "subhead",
    "text": "JSON não possui hipermídia por padrão Um campo chamado links é apenas dados até que o contrato defina relações, destinos, cardinalidade, templates e comportamento do cliente. A maturidade está na semântica compartilhada, não no nome do objeto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.18 Clientes orientados por transições",
    "id": "11-18-clientes-orientados-por-transicoes"
  },
  {
    "kind": "paragraph",
    "text": "Um cliente orientado por hipermídia inicia por um pequeno conjunto de pontos conhecidos e navega por relações. Ele procura rel=confirm, em vez de concatenar /confirmacao; interpreta uma ação disponível, em vez de codificar que PENDENTE sempre permite confirmação. Isso reduz acoplamento a topologia e parte das regras de fluxo."
  },
  {
    "kind": "paragraph",
    "text": "A redução não é absoluta. O cliente ainda conhece relações, tipos de mídia e semântica do domínio. Alterar o significado de confirm é breaking change. Remover uma relação pode alterar funcionalidade. Hipermídia desloca o acoplamento de URLs e sequências rígidas para vocabulários e affordances, que precisam de governança."
  },
  {
    "kind": "paragraph",
    "text": "Clientes gerados exclusivamente a partir de OpenAPI tendem a chamar operações estáticas. Para explorar nível 3, o runtime precisa analisar representações e escolher transições. É possível combinar as abordagens: OpenAPI descreve operações e schemas, enquanto relações nas respostas orientam disponibilidade e navegação. Testes devem verificar ambos."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo de cliente guiado por relações"
  },
  {
    "kind": "code",
    "text": "transfer = GET(entrypoint).follow(\"transfer-by-id\", id=\"abc\")\nif transfer.has_relation(\"confirm\"):\n    result = transfer.follow(\"confirm\", body={\"otp\": \"...\"})\nelse:\n    show_message(\"A confirmação não está disponível no estado atual\")"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.19 Benefícios, custos e armadilhas do nível 3",
    "id": "11-19-beneficios-custos-e-armadilhas-do-nivel-3"
  },
  {
    "kind": "paragraph",
    "text": "O principal benefício é permitir que o servidor comunique transições válidas e altere certos destinos sem exigir que clientes reconstruam URLs. Isso pode melhorar descoberta, reduzir chamadas inválidas, facilitar fluxos longos e tornar o estado mais explícito. Em domínios com máquinas de estado relevantes - onboarding, pagamentos, pedidos, aprovações - controles dinâmicos podem trazer valor concreto."
  },
  {
    "kind": "paragraph",
    "text": "O custo aparece em design, documentação, bibliotecas e testes. A equipe precisa definir vocabulários de relações, representar ações, manter tipos de mídia e educar consumidores. Ferramentas corporativas são mais maduras para OpenAPI e SDKs estáticos do que para clientes hipermídia genéricos. Se os consumidores ignoram links e continuam concatenando caminhos, o custo é pago sem obter o benefício."
  },
  {
    "kind": "paragraph",
    "text": "Uma armadilha comum é devolver todos os links possíveis, independentemente de estado ou autorização. Isso transforma hipermídia em catálogo estático e pode expor informações desnecessárias. Outra é usar relações sem definição, como action1 ou execute. Também é inadequado acreditar que links eliminam versionamento: schemas, relações e semântica continuam evoluindo."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - A decisão de adotar hipermídia depende do domínio e do ecossistema.",
    "headers": [
      "Situação",
      "Nível 3 tende a ajudar",
      "Nível 3 pode não compensar"
    ],
    "rows": [
      [
        "Fluxo de negócio",
        "Múltiplos estados e transições dinâmicas",
        "CRUD simples e estável"
      ],
      [
        "Consumidores",
        "Clientes capazes de interpretar relações",
        "Integrações batch rígidas e SDKs gerados"
      ],
      [
        "Topologia",
        "Destinos e ações evoluem com frequência",
        "Poucas operações e URLs estáveis"
      ],
      [
        "Governança",
        "Vocabulário e tipo de mídia compartilhados",
        "Cada equipe inventa formato próprio"
      ],
      [
        "Operação",
        "Telemetria de relações e transições",
        "Links não são observados nem testados"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.20 RMM versus REST de Fielding",
    "id": "11-20-rmm-versus-rest-de-fielding"
  },
  {
    "kind": "paragraph",
    "text": "O RMM é uma decomposição didática de alguns elementos; REST é um estilo arquitetural composto por restrições. O nível 1 se relaciona à identificação de recursos. O nível 2 aproxima-se da interface uniforme e do uso de semântica HTTP. O nível 3 enfatiza controles de hipermídia. Entretanto, o modelo não possui degraus explícitos para cliente-servidor, stateless, cache, sistema em camadas e código sob demanda."
  },
  {
    "kind": "paragraph",
    "text": "Uma API pode estar no nível 3 e ainda depender de afinidade de sessão em uma instância, desabilitar cache em todas as respostas, expor detalhes de persistência e exigir coordenação simultânea entre cliente e servidor a cada mudança. Nessa situação, a interface utiliza hipermídia, mas a arquitetura não obtém várias propriedades esperadas de REST."
  },
  {
    "kind": "paragraph",
    "text": "O inverso também exige nuance. Uma API no nível 2 pode aplicar cliente-servidor, stateless, cache e camadas de forma robusta, ficando distante apenas do uso pleno de hipermídia. Chamá-la de “imatura” sem considerar contexto pode ser menos útil que registrar exatamente quais restrições e propriedades estão presentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - RMM e REST respondem a perguntas relacionadas, porém diferentes.",
    "headers": [
      "Aspecto",
      "Richardson Maturity Model",
      "REST de Fielding"
    ],
    "rows": [
      [
        "Finalidade",
        "Classificar capacidades visíveis da interface",
        "Definir estilo arquitetural e propriedades emergentes"
      ],
      [
        "Estrutura",
        "Quatro níveis cumulativos",
        "Conjunto de restrições combinadas"
      ],
      [
        "Foco",
        "Recursos, HTTP e hipermídia",
        "Componentes, conectores, dados e restrições"
      ],
      [
        "Resultado",
        "Linguagem de avaliação e evolução",
        "Análise de propriedades arquiteturais"
      ],
      [
        "Limite",
        "Não mede qualidade total nem todas as restrições",
        "Não prescreve um desenho único de endpoints"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.21 RMM, OpenAPI e governança",
    "id": "11-21-rmm-openapi-e-governanca"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI descreve operações HTTP, parâmetros, schemas, respostas e mecanismos de segurança. Ele é excelente para design de contrato, documentação, geração de clientes, mocking e testes. Contudo, uma descrição válida pode representar qualquer nível: um único POST com campo operation, vários recursos ainda tratados por POST, uma interface de nível 2 ou operações cujas respostas incluem hipermídia."
  },
  {
    "kind": "paragraph",
    "text": "A governança pode utilizar regras automáticas para detectar sinais dos níveis: concentração excessiva de POST, verbos em caminhos, ausência de respostas 4xx, criação sem Location, métodos incompatíveis com segurança, falta de schemas de erro e operações sem tags de recurso. Essas regras são heurísticas. A semântica real, o comportamento idempotente e a qualidade das relações exigem revisão humana e testes."
  },
  {
    "kind": "paragraph",
    "text": "Em pipelines corporativos, a análise deve combinar lint do contrato, testes de contrato, testes de comportamento e telemetria. O OpenAPI informa o que foi declarado; testes verificam o que o runtime executa; o gateway mostra como consumidores realmente usam a interface. Uma API pode documentar PUT e implementar efeito não idempotente; apenas o comportamento revela a divergência."
  },
  {
    "kind": "subhead",
    "text": "Contrato não é comportamento OpenAPI pode declarar métodos e respostas corretos enquanto a implementação retorna 200 para todos os erros ou altera estado em GET. Maturidade precisa ser verificada por testes e evidências operacionais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.22 Matriz de avaliação",
    "id": "11-22-matriz-de-avaliacao"
  },
  {
    "kind": "paragraph",
    "text": "Uma avaliação útil evita reduzir a interface a uma nota. Para cada jornada, registre evidência, impacto e ação recomendada. O nível pode ser informado, mas deve vir acompanhado de observações sobre REST, segurança e operação. A tabela a seguir fornece perguntas mínimas que podem ser aplicadas a uma API ou conjunto de endpoints."
  },
  {
    "kind": "paragraph",
    "text": "A equipe também deve considerar peso e contexto. A ausência de hipermídia pode ter baixo impacto em uma API interna com dois consumidores estáveis, enquanto POST não idempotente sem deduplicação pode representar risco crítico. Prioridade de melhoria deve ser determinada por risco e valor, não apenas pela distância até o nível 3."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Matriz de avaliação baseada em evidências.",
    "headers": [
      "Dimensão",
      "Pergunta de evidência",
      "Indício"
    ],
    "rows": [
      [
        "Endpoint",
        "As intenções convergem em um único URI genérico?",
        "Nível 0"
      ],
      [
        "Recursos",
        "Entidades e processos possuem identidade estável?",
        "Nível 1"
      ],
      [
        "Métodos",
        "GET, POST, PUT, PATCH e DELETE respeitam semântica?",
        "Nível 2"
      ],
      [
        "Respostas",
        "Status e headers permitem interpretação genérica?",
        "Nível 2"
      ],
      [
        "Hipermídia",
        "Representações expõem relações e transições atuais?",
        "Nível 3"
      ],
      [
        "Stateless",
        "A requisição depende de sessão local anterior?",
        "Restrição REST"
      ],
      [
        "Cache",
        "Respostas reutilizáveis possuem política explícita?",
        "Restrição REST"
      ],
      [
        "Camadas",
        "O cliente depende da topologia interna?",
        "Restrição REST"
      ],
      [
        "Operação",
        "Logs distinguem gateway, API e domínio?",
        "Qualidade operacional"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exemplo de conclusão de avaliação"
  },
  {
    "kind": "subhead",
    "text": "Jornada: consulta e cancelamento de agendamento. Evidência: recursos identificados por /agendamentos/{id}; leitura usa GET; cancelamento usa POST /cancelar; erros usam 200 com envelope. Classificação: nível 1 com elementos parciais de nível 2. Risco: observabilidade e tratamento de retry inconsistentes. Próxima ação: adotar DELETE ou recurso de cancelamento conforme semântica do domínio, status HTTP e Problem Details, mantendo rota antiga durante migração."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.23 Estratégia de migração",
    "id": "11-23-estrategia-de-migracao"
  },
  {
    "kind": "paragraph",
    "text": "Migração deve começar por uma jornada de valor e não pela reescrita total do catálogo. Selecione operações com alto custo de suporte, risco de duplicação ou dificuldade de evolução. Inventarie consumidores, volumes, dependências de payload, códigos internos e políticas do gateway. Defina métricas de sucesso antes de publicar a nova interface."
  },
  {
    "kind": "paragraph",
    "text": "A nova superfície pode coexistir com a antiga. Um adaptador traduz mensagens do nível 0 para recursos e métodos do nível 2; respostas antigas são preservadas para clientes legados. Contratos possuem datas, políticas de depreciação e telemetria de uso. Mudanças irreversíveis só ocorrem após evidência de migração."
  },
  {
    "kind": "paragraph",
    "text": "Hipermídia deve ser adicionada quando existe um caso de uso. Começar por links self, next, prev e relações de processo permite testar tooling e consumidores. Ações dinâmicas podem ser introduzidas em fluxos com estados relevantes. A equipe evita criar um framework amplo antes de demonstrar benefício."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/pt/figure-07.svg",
    "alt": "Roteiro incremental de migração orientado por risco e compatibilidade",
    "caption": "Figura 7 - A evolução entre níveis pode ser incremental, compatível e orientada por risco."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.24 Observabilidade e troubleshooting",
    "id": "11-24-observabilidade-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "A maturidade da interface altera a qualidade dos sinais operacionais. No nível 0, métricas por POST /servico agregam todas as intenções; é necessário extrair operation do body ou adicionar atributo de negócio. No nível 1, rotas distinguem recursos, mas ações podem continuar escondidas. No nível 2, método, route template e status oferecem dimensões padronizadas. No nível 3, relações seguidas podem revelar transições e jornadas."
  },
  {
    "kind": "paragraph",
    "text": "Logs devem registrar método, route template, status, latência, origem da resposta, correlation ID, consumidor e identificador do recurso quando permitido. Evite usar a URI concreta como label de métrica, pois IDs de alta cardinalidade degradam sistemas de observabilidade. Use /transferencias/{id} como dimensão e preserve o identificador apenas em logs ou traces protegidos."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting precisa separar contrato e transporte. Um timeout ocorre antes de qualquer classificação RMM; um 405 indica que um componente HTTP respondeu; um 409 pode representar conflito de domínio; um 200 com erro interno sugere contrato de nível 0 ou adaptação inadequada. Em gateways, confirme se a resposta foi produzida pelo proxy, pela política ou pelo backend."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Sintomas úteis na investigação de interfaces em diferentes níveis.",
    "headers": [
      "Sintoma",
      "Hipótese",
      "Evidência a coletar"
    ],
    "rows": [
      [
        "Tudo aparece como uma rota",
        "Endpoint genérico de nível 0",
        "campo operation, política de extração e trace"
      ],
      [
        "GET altera estado",
        "Semântica de nível 2 violada",
        "logs de domínio e testes repetidos"
      ],
      [
        "Retry duplica operação",
        "POST sem deduplicação",
        "idempotency key e registros transacionais"
      ],
      [
        "Link existe mas falha",
        "Controle desatualizado ou sem autorização",
        "representação, estado e decisão de autorização"
      ],
      [
        "405 no gateway",
        "Método bloqueado ou não publicado",
        "Allow, configuração de rota e upstream"
      ],
      [
        "200 com problema",
        "Envelope legado ou transformação",
        "body, policy chain e status do backend"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.25 Estudos de caso e laboratórios",
    "id": "11-25-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Os exercícios a seguir utilizam um domínio fictício de transferências. Execute apenas em ambientes de laboratório ou mocks. O objetivo é observar diferenças de contrato e comportamento; não é reproduzir dados ou integrações reais."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudo de caso 1 - modernização de dispatcher"
  },
  {
    "kind": "paragraph",
    "text": "Uma API recebe POST /transacoes com action=CONSULTAR, action=CRIAR e action=CANCELAR. Todos os resultados usam 200. Proponha recursos, métodos e respostas. Considere como preservar consumidores antigos, como correlacionar a nova transferência e como tratar timeout após criação. Compare métricas antes e depois."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudo de caso 2 - processo assíncrono"
  },
  {
    "kind": "paragraph",
    "text": "Uma transferência pode permanecer em análise. Modele a solicitação como recurso, retorne 202 quando o processamento ainda não terminou e forneça um monitor. Depois acrescente relações self, cancel e receipt conforme o estado. Verifique que o servidor rejeita ações não autorizadas mesmo quando o link é fabricado."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - classificação por evidência"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Liste todos os endpoints de uma API de teste e agrupe por jornada.",
      "Identifique operações concentradas em body ou verbos no caminho.",
      "Classifique cada jornada, não apenas a API inteira.",
      "Registre evidências de recursos, métodos, status, headers e hipermídia.",
      "Produza recomendações priorizadas por risco e valor."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - teste de semântica HTTP"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Execute GET repetidamente e confirme que não há efeito solicitado sobre o domínio.",
      "Repita PUT e DELETE e observe o efeito pretendido.",
      "Simule atualização concorrente com ETag e If-Match.",
      "Provoque validação, conflito, ausência e indisponibilidade; compare status e Problem Details.",
      "Inspecione gateway e backend para descobrir qual componente produziu cada resposta."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - cliente de hipermídia"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Inicie por um entry point e procure relações, sem concatenar caminhos.",
      "Execute apenas ações presentes na representação.",
      "Altere o destino de uma relação no servidor sem modificar o cliente.",
      "Remova uma transição por mudança de estado e observe o comportamento.",
      "Capture métricas de relações seguidas e falhas de transição."
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
    "text": "O Richardson Maturity Model descreve uma evolução em quatro níveis. O nível 0 concentra operações em mensagens enviadas a um endpoint genérico. O nível 1 introduz recursos e identificadores. O nível 2 utiliza a semântica do HTTP por meio de métodos, status, headers, cache e precondições. O nível 3 acrescenta controles de hipermídia que orientam transições no estado atual."
  },
  {
    "kind": "paragraph",
    "text": "O modelo é útil para diagnóstico e planejamento, mas não mede todos os atributos de uma plataforma. Segurança, confiabilidade, governança, desempenho, documentação e compatibilidade exigem análises próprias. Ele também não substitui as restrições de REST descritas por Fielding. Uma interface pode atingir o nível 3 sem obter todas as propriedades arquiteturais do estilo."
  },
  {
    "kind": "paragraph",
    "text": "A evolução deve ser orientada por risco e valor. Recursos estáveis melhoram identidade; semântica HTTP melhora interoperabilidade e operação; hipermídia pode reduzir acoplamento a URLs e regras de fluxo. Cada passo possui custos e depende do ecossistema de consumidores. O objetivo não é alcançar uma pontuação, mas construir interfaces previsíveis, evolutivas e observáveis."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de avaliação"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "As operações estão concentradas em um endpoint e diferenciadas pelo body?",
      "Os conceitos do domínio possuem recursos e identificadores estáveis?",
      "URIs representam recursos em vez de nomes de funções?",
      "Métodos respeitam segurança e idempotência?",
      "Códigos de status identificam corretamente sucesso, erro do cliente e falha do servidor?",
      "Criações, processos assíncronos e precondições usam headers apropriados?",
      "Erros possuem formato estruturado e não expõem dados sensíveis?",
      "Retries consideram idempotência e deduplicação?",
      "Representações expõem links e ações com relações definidas?",
      "Clientes realmente interpretam as relações ou continuam codificando URLs?",
      "A avaliação separa RMM, restrições REST e atributos de qualidade?",
      "Gateway, backend e domínio preservam a mesma semântica?",
      "Métricas usam route templates e distinguem origem da resposta?",
      "A migração possui inventário de consumidores, telemetria e plano de depreciação?"
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
      "Explique por que usar JSON e POST não determina o nível de uma API.",
      "Classifique uma interface com vários caminhos, todos tratados por POST, e justifique.",
      "Modele consulta, criação e cancelamento de transferências nos níveis 0, 1 e 2.",
      "Descreva uma situação em que uma API de nível 2 seja adequada e nível 3 não compense.",
      "Explique como ETag e If-Match contribuem para uma interface de nível 2.",
      "Proponha relações de hipermídia para um processo de aprovação com quatro estados.",
      "Diferencie ausência de link e falta de autorização no servidor.",
      "Compare o RMM com as restrições stateless e cache de REST.",
      "Explique por que OpenAPI não certifica comportamento idempotente.",
      "Crie um plano de migração para um endpoint único usado por cinco consumidores.",
      "Descreva um roteiro de troubleshooting para 200 contendo erro interno.",
      "Elabore uma matriz de evidências para avaliar uma API no gateway e no backend."
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
    "caption": "Glossário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Affordance",
        "Indicação de uma ação possível e de como executá-la no contexto de uma representação."
      ],
      [
        "Endpoint",
        "Ponto de interação exposto por uma API, normalmente associado a URI e método."
      ],
      [
        "HATEOAS",
        "Uso de hipermídia para orientar o estado da aplicação e as próximas transições."
      ],
      [
        "Hipermídia",
        "Mídia que contém controles, relações ou links capazes de orientar navegação e ações."
      ],
      [
        "Idempotência",
        "Propriedade pela qual repetições equivalentes produzem o mesmo efeito pretendido."
      ],
      [
        "Link relation",
        "Relação que define o significado de um link entre o contexto e o destino."
      ],
      [
        "POX",
        "Plain Old XML; no RMM, representa mensagens proprietárias transportadas por um endpoint genérico, mesmo quando o formato moderno é JSON."
      ],
      [
        "Problem Details",
        "Formato padronizado para representar detalhes de problemas em APIs HTTP."
      ],
      [
        "Recurso",
        "Abstração identificável que pode possuir representações e estado controlado pelo servidor."
      ],
      [
        "Representação",
        "Dados transferidos que descrevem o estado atual ou pretendido de um recurso."
      ],
      [
        "Richardson Maturity Model",
        "Modelo de quatro níveis para observar adoção de recursos, semântica HTTP e hipermídia."
      ],
      [
        "RMM",
        "Sigla de Richardson Maturity Model."
      ],
      [
        "Semântica HTTP",
        "Significado compartilhado de métodos, códigos, headers e outros elementos do protocolo."
      ],
      [
        "URI Template",
        "Sintaxe para expressar URIs parametrizadas que podem ser expandidas por clientes."
      ],
      [
        "Web Linking",
        "Modelo padronizado para expressar links e relações em mensagens web."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências técnicas",
    "id": "referencias-tecnicas"
  },
  {
    "kind": "paragraph",
    "text": "As referências abaixo devem ser lidas em conjunto. O artigo de Fowler apresenta o modelo; a dissertação de Fielding fornece a base arquitetural de REST; as RFCs definem a semântica interoperável utilizada nos exemplos."
  },
  {
    "kind": "paragraph",
    "text": "[1] FOWLER, Martin. Richardson Maturity Model: steps toward the glory of REST. 2010. Disponível em: martinfowler.com/articles/richardsonMaturityModel.html."
  },
  {
    "kind": "paragraph",
    "text": "[2] FIELDING, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine, 2000. Capítulo 5: Representational State Transfer."
  },
  {
    "kind": "paragraph",
    "text": "[3] IETF. RFC 9110 - HTTP Semantics. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[4] IETF. RFC 9111 - HTTP Caching. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[5] IETF. RFC 8288 - Web Linking. 2017."
  },
  {
    "kind": "paragraph",
    "text": "[6] IETF. RFC 6570 - URI Template. 2012."
  },
  {
    "kind": "paragraph",
    "text": "[7] IETF. RFC 9457 - Problem Details for HTTP APIs. 2023."
  },
  {
    "kind": "paragraph",
    "text": "[8] IANA. Link Relations Registry. Registro de relações padronizadas para links."
  },
  {
    "kind": "paragraph",
    "text": "[9] OpenAPI Initiative. OpenAPI Specification. Especificação para descrição de APIs HTTP."
  },
  {
    "kind": "paragraph",
    "text": "[10] IETF. RFC 6902 - JavaScript Object Notation (JSON) Patch. 2013."
  },
  {
    "kind": "paragraph",
    "text": "[11] IETF. RFC 7386 - JSON Merge Patch. 2014."
  },
  {
    "kind": "paragraph",
    "text": "[12] IETF. RFC 7232 - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests. 2014. Obsoleta como documento agregado, mas historicamente relevante; a semântica atual está consolidada na RFC 9110."
  },
  {
    "kind": "subhead",
    "text": "Encerramento do capítulo O próximo passo do curso é aprofundar a descrição e governança de contratos de APIs, conectando modelagem HTTP, OpenAPI, validação, compatibilidade e automação de pipelines."
  }
];
