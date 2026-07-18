import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const GRAPHQL_GRPC_WEBSOCKET_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Três modelos, três semânticas: consulta, RPC e canal persistente"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/pt/overview.svg",
    "alt": "GraphQL, gRPC e WebSocket combinados em uma arquitetura moderna de APIs",
    "caption": "Figura de abertura - O capítulo compara três estilos frequentemente combinados em arquiteturas de APIs e integração."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Escolher a interface correta exige alinhar modelo de dados, acoplamento, latência, streaming e governança."
  },
  {
    "kind": "paragraph",
    "text": "Edição aprofundada - material de estudo e consulta profissional"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Até aqui, o curso tratou da comunicação HTTP clássica, da modelagem REST e da descrição formal de contratos por OpenAPI. Esses elementos continuam centrais em plataformas corporativas, porém não cobrem todos os problemas de integração. Sistemas distribuídos frequentemente precisam resolver consulta flexível de grafos de dados, comunicação eficiente entre serviços e entrega de eventos em tempo real. É nesse espaço que GraphQL, gRPC e WebSocket ganham relevância."
  },
  {
    "kind": "paragraph",
    "text": "Embora os três nomes apareçam frequentemente em discussões modernas, eles não são alternativas diretas entre si. GraphQL é uma linguagem de consulta e um modelo de execução orientado a schema. gRPC é um framework de chamada remota de procedimentos, fortemente tipado, geralmente apoiado em Protocol Buffers e HTTP/2. WebSocket é um protocolo para manter um canal bidirecional persistente, deixando a semântica da aplicação para uma camada superior. Compará-los apenas por desempenho ou popularidade leva a decisões superficiais."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas maduras observam qual problema precisa ser resolvido: consulta agregada para front-end, comunicação interna de baixa latência, streaming em uma ou duas direções, push para interfaces ricas, ou mediação por gateways. Também observam governança, segurança, observabilidade, caching, curva de adoção, tooling e compatibilidade com legados. Em muitos cenários, a melhor solução não é escolher um único modelo, mas combinar mais de um deles com papéis bem definidos."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo apresenta fundamentos, semântica, padrões operacionais, armadilhas e critérios de escolha. O objetivo é permitir que o leitor compreenda a forma de trabalho de cada tecnologia, reconheça quando ela se encaixa bem e identifique riscos de operação em gateways, service meshes e plataformas corporativas."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Ao ler cada tecnologia, responda a quatro perguntas: qual é o contrato exposto, quem controla a evolução do schema ou da interface, como a observabilidade é realizada e quais intermediários conseguem participar corretamente do fluxo. Essa disciplina evita tratar soluções de naturezas diferentes como se fossem apenas formatos alternativos de payload."
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
      "Distinguir as responsabilidades de GraphQL, gRPC e WebSocket e evitar comparações simplistas.",
      "Explicar o modelo de schema, execução e resolução do GraphQL.",
      "Compreender queries, mutations, subscriptions, tipos, fragments e introspection.",
      "Reconhecer problemas como overfetching, underfetching, N+1, profundidade excessiva e complexidade de consulta.",
      "Explicar o modelo de serviço do gRPC, a função do Protocol Buffers e os quatro padrões de chamada.",
      "Relacionar gRPC a HTTP/2, multiplexação, deadlines, metadata, status codes e streaming.",
      "Descrever o handshake de upgrade do WebSocket, frames, ping/pong e encerramento.",
      "Analisar escala, afinidade, autenticação e observabilidade em conexões persistentes.",
      "Comparar implicações de cache, versionamento, gateways, firewalls e balanceadores.",
      "Aplicar critérios práticos para escolher e combinar essas tecnologias em arquiteturas corporativas."
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
      "13.1 Por que esse capítulo existe após OpenAPI",
      "13.2 GraphQL: visão geral e motivação",
      "13.3 Schema, tipos, queries, mutations e subscriptions",
      "13.4 Resolvers, batching, N+1 e federação",
      "13.5 Segurança, governança e observabilidade em GraphQL",
      "13.6 gRPC: visão geral e Protocol Buffers",
      "13.7 Padrões de chamada, deadlines e streaming",
      "13.8 Segurança, mesh e governança em gRPC",
      "13.9 WebSocket: handshake, frames e ciclo de vida",
      "13.10 Operação, escalabilidade e segurança em WebSocket",
      "13.11 Comparação prática entre GraphQL, gRPC e WebSocket",
      "13.12 Uso em API Gateways, estudos de caso, resumo, exercícios e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.1 Por que este capítulo vem após OpenAPI",
    "id": "13-1-por-que-este-capitulo-vem-apos-openapi"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI descreve muito bem APIs HTTP orientadas a recursos ou operações. Entretanto, ele não representa com a mesma naturalidade um grafo consultável como GraphQL, chamadas RPC binárias e streaming bidirecional como no gRPC, nem um canal persistente orientado a mensagens como WebSocket. O leitor que dominou OpenAPI já possui base excelente de contrato, semântica HTTP e governança; agora precisa entender onde essas bases continuam válidas e onde novos modelos exigem outra forma de pensar."
  },
  {
    "kind": "paragraph",
    "text": "Em termos de arquitetura, este capítulo é uma expansão do repertório e não uma negação do que foi estudado antes. REST continua fortíssimo para exposição pública e integração entre organizações. O que muda é que certas necessidades práticas - como telas que pedem agregações muito variadas, microsserviços internos com alta cadência e aplicações que dependem de push em tempo real - podem ser melhor atendidas por modelos diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Também é importante perceber a diferença entre tecnologia de interface e tecnologia de transporte. GraphQL normalmente usa HTTP, mas sua semântica de contrato não é a mesma de REST. gRPC usa HTTP/2 como base, porém apresenta ao desenvolvedor a abstração de métodos e mensagens. WebSocket nasce de um handshake HTTP, mas depois abandona a lógica request/response para operar com frames full-duplex. Essa distinção evita conclusões incorretas sobre caching, segurança e troubleshooting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.2 GraphQL: visão geral e motivação",
    "id": "13-2-graphql-visao-geral-e-motivacao"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL surgiu para oferecer ao consumidor maior controle sobre a forma dos dados retornados. Em vez de a API expor uma coleção grande de endpoints com respostas pré-formatadas, ela publica um schema tipado e permite que o cliente declare, em uma query, exatamente quais campos deseja obter. Isso reduz underfetching, quando o cliente precisa chamar vários endpoints para montar uma tela, e pode reduzir overfetching, quando a resposta contém muito dado irrelevante para aquele caso específico."
  },
  {
    "kind": "paragraph",
    "text": "O modelo é particularmente atraente em experiências de front-end com múltiplas variações de composição: web, mobile, parceiros, painéis analíticos e jornadas diferentes sobre o mesmo domínio. Um gateway ou BFF baseado em GraphQL pode reunir dados de várias APIs e bancos, deixando para a camada de resolução a tarefa de compor o resultado. Essa flexibilidade, contudo, desloca complexidade para o servidor, que precisa validar, executar, limitar custo e observar o comportamento das consultas recebidas."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL não é uma linguagem de acesso arbitrário ao banco de dados. O contrato continua sendo definido pelo provedor, via schema, e a execução é controlada por resolvers. Isso significa que o fato de o cliente escolher campos não elimina a necessidade de governança. Pelo contrário: autenticação, autorização por campo, limites de profundidade, desativação de introspection em alguns cenários, persisted queries e proteções contra abuso tornam-se essenciais em ambientes corporativos."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - A mudança principal em GraphQL é de modelo de contrato, não apenas de sintaxe.",
    "headers": [
      "Aspecto",
      "REST tradicional",
      "GraphQL"
    ],
    "rows": [
      [
        "Unidade principal",
        "Recursos e endpoints.",
        "Schema tipado e operações sobre um endpoint lógico."
      ],
      [
        "Forma da resposta",
        "Predominantemente definida pelo servidor.",
        "Selecionada pelo cliente dentro do schema."
      ],
      [
        "Evolução",
        "Nova representação, novos campos ou novos endpoints.",
        "Evolução do schema com depreciação de campos e tipos."
      ],
      [
        "Risco característico",
        "Underfetching ou explosão de endpoints.",
        "Queries caras, N+1 e controle de complexidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.3 Schema, tipos, queries, mutations e subscriptions",
    "id": "13-3-schema-tipos-queries-mutations-e-subscriptions"
  },
  {
    "kind": "paragraph",
    "text": "O schema GraphQL descreve tipos escalares, objetos, enums, interfaces, unions, entradas e operações raiz. A operação Query representa leitura; Mutation representa alterações de estado; Subscription representa recebimento assíncrono de eventos sob uma relação contínua. O schema funciona como contrato de dados e também como ponto de introspection para ferramentas, geração de tipos e experiência de desenvolvimento."
  },
  {
    "kind": "paragraph",
    "text": "Uma Query é estruturada como um documento declarativo em que o consumidor especifica os campos desejados. Fragments permitem reutilizar seleções, aliases renomeiam campos na resposta e variables separam o documento dos valores dinâmicos. Em Mutation, o consumidor invoca uma alteração de estado definida pelo servidor, com tipos de entrada claros. Em Subscription, o cliente se inscreve em um fluxo que será emitido ao longo do tempo, normalmente por WebSocket ou tecnologia equivalente."
  },
  {
    "kind": "paragraph",
    "text": "Apesar da aparência compacta, a execução não é trivial. Cada campo do schema pode estar associado a um resolver. Uma operação simples, do ponto de vista do cliente, pode levar o servidor a acionar vários backends. Por isso, o schema precisa ser desenhado com disciplina. Tipos muito genéricos, campos que escondem operações pesadas e ausência de delimitação de fronteiras entre domínios tornam o contrato difícil de operar."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/pt/figure-01.svg",
    "alt": "Runtime GraphQL executando uma árvore de resolvers a partir da operação solicitada",
    "caption": "Figura 1 - O runtime GraphQL executa uma árvore de resolvers a partir da operação solicitada."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de query GraphQL"
  },
  {
    "kind": "code",
    "text": "query ClienteDetalhado($id: ID!) {\n  cliente(id: $id) {\n    id\n    nome\n    saldoAtual\n    pedidos(limit: 5) {\n      numero\n      valorTotal\n    }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.4 Resolvers, batching, N+1 e federação",
    "id": "13-4-resolvers-batching-n-1-e-federacao"
  },
  {
    "kind": "paragraph",
    "text": "Resolvers são funções responsáveis por produzir o valor de um campo. Em um objeto cliente, por exemplo, o campo saldoAtual pode vir de um core bancário, enquanto pedidos pode vir de uma API transacional. Essa granularidade é poderosa, mas também cria o problema clássico N+1: ao buscar uma lista de clientes e, para cada um, buscar dados adicionais em outra fonte, o servidor pode disparar um número excessivo de chamadas."
  },
  {
    "kind": "paragraph",
    "text": "A mitigação típica envolve batching e caching de curta duração no escopo da requisição. Bibliotecas como DataLoader agrupam várias solicitações lógicas em uma única busca ao backend. O time de arquitetura também deve questionar se o desenho do schema induz acesso ineficiente. Em alguns casos, o problema não se resolve apenas com técnica de execução; ele exige revisar o modelo e introduzir campos ou agregados mais apropriados."
  },
  {
    "kind": "paragraph",
    "text": "Em organizações grandes, a federação GraphQL permite compor um supergrafo a partir de subgrafos mantidos por equipes diferentes. Essa abordagem melhora autonomia, porém introduz governança mais sofisticada: ownership de tipos e campos, composição segura, versionamento do supergrafo, roteamento, observabilidade distribuída e proteção contra explosão de cardinalidade. Sem essas práticas, a federação pode trocar acoplamento de endpoint por acoplamento de schema."
  },
  {
    "kind": "subhead",
    "text": "Ponto crítico de operação"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL não elimina chamadas entre sistemas; ele frequentemente as esconde atrás da árvore de execução. Em troubleshooting, correlacione a query recebida com os resolvers acionados, os backends consultados e o custo total da operação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.5 Segurança, governança e observabilidade em GraphQL",
    "id": "13-5-seguranca-governanca-e-observabilidade-em-graphql"
  },
  {
    "kind": "paragraph",
    "text": "A segurança em GraphQL vai além do controle de autenticação do endpoint. Como o cliente escolhe a forma da consulta, o servidor precisa limitar profundidade, cardinalidade e custo computacional. Queries recursivas, uso abusivo de fragments, introspection exposta indevidamente e tentativas de enumeração de campos são vetores relevantes. Persisted queries reduzem risco ao permitir apenas documentos previamente registrados e identificados por hash."
  },
  {
    "kind": "paragraph",
    "text": "Autorização pode ocorrer em múltiplos níveis: operação, tipo, campo e até valor retornado. É comum que um mesmo tipo tenha campos com sensibilidades diferentes, como saldo, limite, CPF mascarado ou histórico completo. A política precisa ser explícita, testável e observável. Em gateways, uma prática útil é propagar identidade e contexto para o servidor GraphQL, enquanto o controle fino de campo permanece no runtime ou em um PDP conectado a ele."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade também muda. Em REST, o caminho do endpoint já informa muito. Em GraphQL, várias operações distintas podem trafegar pelo mesmo endpoint. Por isso, nomes de operação, hash de query persistida, custo calculado, profundidade, tempo por resolver e chamadas downstream tornam-se métricas essenciais. O registro da query literal exige cuidado com privacidade e com o volume de logs."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Em GraphQL, governança do schema e governança de execução caminham juntas.",
    "headers": [
      "Controle",
      "Objetivo",
      "Exemplo prático"
    ],
    "rows": [
      [
        "Limite de profundidade",
        "Evitar navegações excessivas.",
        "Rejeitar queries acima de um limiar definido."
      ],
      [
        "Cálculo de complexidade",
        "Controlar custo estimado.",
        "Atribuir pesos a campos caros."
      ],
      [
        "Persisted query",
        "Reduzir superfície de ataque e payload.",
        "Aceitar apenas hashes previamente cadastrados."
      ],
      [
        "Autorização por campo",
        "Proteger dados sensíveis.",
        "Campos financeiros exigem escopo adicional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.6 gRPC: visão geral e Protocol Buffers",
    "id": "13-6-grpc-visao-geral-e-protocol-buffers"
  },
  {
    "kind": "paragraph",
    "text": "gRPC é um framework de RPC moderno que enfatiza contratos tipados, geração de código e comunicação eficiente. Em vez de modelar recursos e representações como em REST, o provedor define serviços e métodos em arquivos .proto. Esses arquivos descrevem mensagens, campos e operações, e ferramentas geram stubs para cliente e servidor em várias linguagens."
  },
  {
    "kind": "paragraph",
    "text": "Protocol Buffers, ou Protobuf, é o mecanismo de serialização mais associado ao gRPC. Ele codifica mensagens binárias compactas e tipadas, com evolução baseada em números de campo. Isso produz payloads menores e parsing eficiente, especialmente útil em comunicação interna de microsserviços. O ganho de desempenho, porém, não deve ser romantizado: ele depende do caso de uso, da rede, da linguagem, do tamanho das mensagens e do custo real da lógica de negócio."
  },
  {
    "kind": "paragraph",
    "text": "O acoplamento ao contrato é mais explícito do que em integrações puramente textuais. Isso é positivo para segurança de tipos e produtividade, mas exige disciplina na evolução: campos não devem ter seus números reutilizados, reservas precisam ser aplicadas quando algo é removido e erros devem ser tratados dentro da semântica do gRPC, que distingue status de transporte e status da aplicação."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de definição .proto"
  },
  {
    "kind": "code",
    "text": "syntax = \"proto3\";\nservice ClienteService {\n  rpc ObterCliente (ClienteRequest) returns (ClienteResponse);\n  rpc ListarEventos (EventosRequest) returns (stream EventoResponse);\n}\nmessage ClienteRequest { string id = 1; }\nmessage ClienteResponse { string id = 1; string nome = 2; }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.7 Padrões de chamada, deadlines e streaming",
    "id": "13-7-padroes-de-chamada-deadlines-e-streaming"
  },
  {
    "kind": "paragraph",
    "text": "gRPC oferece quatro padrões principais. No unary, um request produz um response. No server streaming, o cliente envia um request e recebe uma sequência de respostas. No client streaming, o cliente envia várias mensagens antes de receber o resultado consolidado. No streaming bidirecional, ambos os lados trocam mensagens continuamente, sem relação fixa de um-para-um entre envio e recepção."
  },
  {
    "kind": "paragraph",
    "text": "Esses padrões operam sobre HTTP/2, aproveitando multiplexação, cabeçalhos compactados e fluxo full-duplex por stream. Ainda assim, o desenvolvedor precisa compreender conceitos próprios do gRPC, como deadlines, cancelamento, metadata e códigos de status. Deadline é especialmente importante em produção: sem ele, chamadas podem permanecer pendentes além do razoável, consumindo recursos e degradando cadeias inteiras de dependência."
  },
  {
    "kind": "paragraph",
    "text": "O tratamento de erro também muda de nuance. Uma resposta gRPC bem-sucedida no transporte pode carregar status de aplicação como NOT_FOUND, PERMISSION_DENIED ou UNAVAILABLE. Observabilidade e retries precisam considerar essas diferenças. Em ambientes corporativos, é comum traduzir parcial ou totalmente chamadas gRPC para HTTP/JSON na borda, preservando gRPC apenas entre serviços internos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/pt/figure-02.svg",
    "alt": "Quatro padrões de chamada gRPC: unary, server streaming, client streaming e bidirecional",
    "caption": "Figura 2 - O contrato gRPC suporta desde chamadas simples até streaming completo em duas direções."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A eficiência do gRPC depende de disciplina operacional, não apenas do uso de Protobuf.",
    "headers": [
      "Tema",
      "Prática recomendada",
      "Risco se ignorado"
    ],
    "rows": [
      [
        "Deadlines",
        "Definir prazos por método e propagar contexto.",
        "Chamadas presas e saturação em cascata."
      ],
      [
        "Versionamento",
        "Evoluir mensagens com campos opcionais e reservas.",
        "Quebra de compatibilidade binária."
      ],
      [
        "Status codes",
        "Mapear status de aplicação com cuidado.",
        "Retries incorretos ou diagnósticos confusos."
      ],
      [
        "Streaming",
        "Controlar backpressure e cancelamento.",
        "Consumo excessivo de memória e fila."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.8 Segurança, mesh e governança em gRPC",
    "id": "13-8-seguranca-mesh-e-governanca-em-grpc"
  },
  {
    "kind": "paragraph",
    "text": "Como gRPC é frequentemente adotado em comunicação east-west, ele aparece com frequência ao lado de service meshes. Nesse contexto, mTLS, identidade de workload, retries, circuit breaking e telemetria podem ser aplicados pela malha ou pelo sidecar, enquanto o serviço mantém a semântica de métodos. Isso simplifica certos controles, mas também introduz camadas adicionais no diagnóstico."
  },
  {
    "kind": "paragraph",
    "text": "Em segurança, o contrato .proto deve ser tratado como artefato governado. Métodos administrativos, operações perigosas e mensagens com dados sensíveis precisam de controle explícito de autorização. A presença de conexão interna não implica confiança automática. Além disso, alguns proxies e gateways têm suporte limitado a recursos mais avançados do gRPC, especialmente quando há streaming ou trailers envolvidos."
  },
  {
    "kind": "paragraph",
    "text": "Governança inclui catálogo de serviços, linting de .proto, políticas de nomenclatura, versionamento, compatibilidade, rastreamento distribuído e testes de contrato. Em cenários de integração com equipes de front-end, deve-se avaliar se a organização quer expor gRPC diretamente, usar gRPC-Web ou traduzir para HTTP/JSON. Cada escolha muda tooling, segurança no navegador e capacidades de intermediários."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.9 WebSocket: handshake, frames e ciclo de vida",
    "id": "13-9-websocket-handshake-frames-e-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "WebSocket é um protocolo padronizado para comunicação full-duplex persistente entre cliente e servidor. O processo começa com uma requisição HTTP contendo Upgrade: websocket e outros cabeçalhos específicos. Se o servidor aceitar, responde com status 101 Switching Protocols e a conexão passa a operar com frames WebSocket. A partir daí, não há mais a semântica clássica de uma requisição seguida de uma única resposta."
  },
  {
    "kind": "paragraph",
    "text": "O protocolo é valioso em aplicações que exigem baixa latência e push do servidor para o cliente, como painéis em tempo real, chats, acompanhamento de ordens, notificações operacionais e dashboards de observabilidade. Ele não define, por si só, a semântica da mensagem. A aplicação pode enviar JSON, binário, envelopes tipados ou protocolos mais elaborados sobre o canal. Isso dá flexibilidade, mas também exige padronização interna."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo de vida de uma conexão WebSocket inclui autenticação inicial, abertura, troca de frames, manutenção de liveness por ping/pong e encerramento controlado. Em plataformas escaladas horizontalmente, o desenho precisa considerar afinidade, fan-out, distribuição de eventos e sincronização de estado. É comum usar um broker ou pub/sub por trás do servidor WebSocket para desacoplar emissão de eventos da manutenção da conexão."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/pt/figure-03.svg",
    "alt": "Ciclo de vida WebSocket do upgrade HTTP ao encerramento da conexão",
    "caption": "Figura 3 - O HTTP participa apenas do estabelecimento; o restante do ciclo já pertence ao protocolo WebSocket."
  },
  {
    "kind": "subhead",
    "text": "Exemplo resumido de handshake de abertura"
  },
  {
    "kind": "code",
    "text": "GET /stream HTTP/1.1\nHost: api.empresa.example\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==\nSec-WebSocket-Version: 13"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.10 Operação, escalabilidade e segurança em WebSocket",
    "id": "13-10-operacao-escalabilidade-e-seguranca-em-websocket"
  },
  {
    "kind": "paragraph",
    "text": "Operar milhares ou milhões de conexões persistentes é muito diferente de operar requisições HTTP curtas. A infraestrutura precisa suportar sockets abertos por longo tempo, timeouts coerentes, proteção contra clientes lentos e mecanismos de backpressure. Proxies, firewalls e balanceadores devem ser configurados para não encerrar a conexão por inatividade indevida. Além disso, métricas como conexões ativas, taxa de mensagens, bytes por conexão e motivos de fechamento tornam-se essenciais."
  },
  {
    "kind": "paragraph",
    "text": "A autenticação costuma ocorrer no handshake inicial ou em uma primeira mensagem de aplicação. Tokens expiram, e a estratégia de renovação precisa ser planejada. Também é necessário decidir como tratar autorização dinâmica: uma conexão aberta não deve garantir permissão eterna para todos os eventos futuros. Em alguns cenários, o servidor precisa reavaliar o contexto do cliente ao publicar eventos sensíveis."
  },
  {
    "kind": "paragraph",
    "text": "Do ponto de vista de segurança, WebSocket amplia a importância de validação de origem, controle de payload, limitação de tamanho de frame, serialização segura e segregação de tópicos. Como a conexão persiste, um erro de autorização ou de fan-out pode vazar grande volume de informação rapidamente. Logs estruturados, IDs de conexão, correlação com a identidade do usuário e trilhas de fechamento ajudam no troubleshooting."
  },
  {
    "kind": "subhead",
    "text": "Armadilha comum"
  },
  {
    "kind": "paragraph",
    "text": "Usar WebSocket apenas porque a aplicação parece \"moderna\" pode aumentar custo operacional sem necessidade. Se o caso de uso é simples notificação unidirecional, SSE ou polling bem desenhado podem ser suficientes. Escolha pelo comportamento exigido, não pela novidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.11 Comparação prática entre GraphQL, gRPC e WebSocket",
    "id": "13-11-comparacao-pratica-entre-graphql-grpc-e-websocket"
  },
  {
    "kind": "paragraph",
    "text": "A comparação mais útil não pergunta qual tecnologia é melhor em abstrato, mas qual semântica combina melhor com o problema. GraphQL é forte quando o desafio é fornecer ao consumidor flexibilidade de consulta sobre um modelo de dados complexo. gRPC é forte quando o foco é integração tipada entre serviços, especialmente com alto volume, baixa latência e streaming. WebSocket é forte quando o problema principal é manter um canal aberto para troca contínua de eventos ou mensagens."
  },
  {
    "kind": "paragraph",
    "text": "Essas forças vêm acompanhadas de custos. GraphQL exige governança refinada de schema e execução. gRPC exige tooling específico, contratos .proto e compreensão de HTTP/2 e status próprios. WebSocket exige operação cuidadosa de conexões persistentes, afinidade e canais de publicação. Em contrapartida, cada um resolve de forma elegante problemas que seriam mais difíceis ou menos naturais em um modelo puramente REST."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas híbridas são comuns. Um banco digital pode expor REST/JSON ou GraphQL para canais digitais, usar gRPC entre serviços internos de domínio e empregar WebSocket para atualizar posições de investimento em tempo real na interface do cliente. O importante é que a organização possua critérios arquiteturais claros e não permita proliferação descontrolada de padrões incompatíveis."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O melhor critério de escolha é a natureza do problema e da operação.",
    "headers": [
      "Critério",
      "GraphQL",
      "gRPC",
      "WebSocket"
    ],
    "rows": [
      [
        "Problema central",
        "Consulta flexível de dados.",
        "RPC tipado e eficiente.",
        "Canal persistente e full-duplex."
      ],
      [
        "Contrato",
        "Schema GraphQL.",
        ".proto / serviço e mensagens.",
        "Contrato de aplicação definido externamente."
      ],
      [
        "Transporte comum",
        "HTTP.",
        "HTTP/2.",
        "Protocolo WebSocket após upgrade HTTP."
      ],
      [
        "Streaming",
        "Subscriptions conforme implementação.",
        "Nativo em vários modos.",
        "Nativo no canal."
      ],
      [
        "Cache e intermediários",
        "Menos trivial que REST.",
        "Suporte variável em gateways.",
        "Muito diferente do HTTP tradicional."
      ],
      [
        "Uso recorrente",
        "BFFs e agregação de dados.",
        "Microsserviços e integração interna.",
        "Tempo real, chat e notificações."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/pt/figure-04.svg",
    "alt": "Comparação semântica entre GraphQL, gRPC e WebSocket em uma arquitetura híbrida",
    "caption": "Figura 4 - Muitas plataformas combinam mais de uma dessas tecnologias com papéis complementares."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.12 API Gateways, estudos de caso e aplicação corporativa",
    "id": "13-12-api-gateways-estudos-de-caso-e-aplicacao-corporativa"
  },
  {
    "kind": "paragraph",
    "text": "Gateways tradicionais foram desenhados principalmente para HTTP/REST, autenticação, transformação, roteamento e políticas de borda. Quando a organização adota GraphQL, gRPC ou WebSocket, deve verificar até que ponto o gateway consegue compreender o protocolo ou a semântica da aplicação. Em alguns casos, o gateway atua de forma consciente da tecnologia; em outros, opera apenas como proxy ou terminador TLS."
  },
  {
    "kind": "paragraph",
    "text": "Para GraphQL, plataformas maduras conseguem aplicar autenticação, WAF, rate limiting e observabilidade básica na borda, enquanto a governança fina do schema e da execução permanece no servidor GraphQL. Para gRPC, o suporte precisa considerar HTTP/2 fim a fim, trailers e streaming. Para WebSocket, o gateway precisa lidar com upgrade, timeouts longos, afinidade e políticas adequadas a conexões persistentes. Em Axway, Azure APIM, Envoy e outros produtos, o nível de suporte varia por recurso e versão."
  },
  {
    "kind": "paragraph",
    "text": "Como estudo de caso, imagine uma plataforma de investimentos. O aplicativo móvel usa GraphQL para compor dashboard e carteira. Os microserviços internos de cálculo e consolidação trocam dados por gRPC. O módulo de cotação em tempo real publica eventos por WebSocket para os clientes conectados. A arquitetura fica coerente porque cada escolha responde a um comportamento distinto, e não a uma tentativa de padronizar tudo em um único mecanismo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.13 Troubleshooting e diagnósticos",
    "id": "13-13-troubleshooting-e-diagnosticos"
  },
  {
    "kind": "paragraph",
    "text": "O troubleshooting em GraphQL, gRPC e WebSocket exige separar transporte, protocolo e semântica da aplicação. Em GraphQL, uma resposta HTTP 200 pode carregar erros de negócio no array errors, enquanto em gRPC o transporte pode estar íntegro e o status final indicar PERMISSION_DENIED, DEADLINE_EXCEEDED ou UNAVAILABLE. Em WebSocket, a análise precisa considerar handshake, permanência da conexão, ping/pong, códigos de fechamento e mensagens da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas e evidências também mudam. Em GraphQL, nomes de operação, complexidade calculada, tempo por resolver e correlação com backends são mais úteis do que olhar apenas para a URL. Em gRPC, logs de método, metadata, deadlines, trailers, métricas por status code e traces por stream ajudam a localizar gargalos. Em WebSocket, contagem de conexões abertas, taxa de mensagens, fan-out, duração média, bytes por cliente e códigos de close apontam problemas de escala e comportamento anômalo."
  },
  {
    "kind": "paragraph",
    "text": "Do ponto de vista de gateway e rede, é importante saber que falhas podem ocorrer antes da tecnologia de aplicação entrar em cena. Um proxy sem suporte pleno a HTTP/2 pode degradar gRPC. Um balanceador com timeout agressivo pode derrubar WebSockets estáveis. Uma política WAF genérica pode interferir em payloads GraphQL. A camada correta do problema precisa ser identificada para evitar mudanças aleatórias no código."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - O sintoma correto depende da semântica de cada tecnologia.",
    "headers": [
      "Tecnologia",
      "Sintoma",
      "Hipóteses iniciais"
    ],
    "rows": [
      [
        "GraphQL",
        "Query lenta ou erro parcial.",
        "Resolver caro, N+1, backend lento ou limite de complexidade."
      ],
      [
        "gRPC",
        "Deadline excedido.",
        "Prazo curto, backend saturado, stream travado ou perda de capacidade."
      ],
      [
        "WebSocket",
        "Desconexões frequentes.",
        "Idle timeout, afinidade ausente, ping/pong inadequado ou rede instável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.14 Estudos de caso e laboratórios",
    "id": "13-14-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1: um portal de atendimento precisa consolidar perfil, produtos, limites e últimas interações em uma única tela móvel. A equipe opta por GraphQL para permitir que o front-end selecione apenas os dados necessários a cada jornada. O ganho vem da flexibilidade, mas o servidor precisa introduzir batching, persisted queries e autorização por campo para evitar explosão de custo e exposição de dados sensíveis."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2: um conjunto de microsserviços de pagamentos precisa trocar mensagens pequenas com alta cadência e forte tipagem. A equipe adota gRPC com Protobuf entre serviços internos, mantendo REST na borda para parceiros externos. O sucesso depende de gestão de arquivos .proto, deadlines coerentes, mTLS, observabilidade distribuída e tradução adequada quando chamadas precisam atravessar camadas de gateway."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3: uma plataforma de cotações em tempo real envia atualizações contínuas para dashboards operacionais e aplicativos móveis. O canal de push é implementado com WebSocket, enquanto a consulta inicial da posição ainda usa HTTP. O desenho só se sustenta porque há broker de eventos, escalabilidade horizontal, afinidade de sessão, identificação das conexões e política clara de reautenticação quando o token expira."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Monte uma query GraphQL com fragments e observe a árvore de resolvers. 2) Defina um serviço gRPC com um método unary e outro streaming e teste deadlines. 3) Abra um WebSocket, envie mensagens, simule ping/pong e observe o close handshake. 4) Em todos os casos, colete evidências de logs, métricas e traces."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.15 Critérios de decisão arquitetural",
    "id": "13-15-criterios-de-decisao-arquitetural"
  },
  {
    "kind": "paragraph",
    "text": "A decisão entre essas tecnologias deve ser institucionalizada como um conjunto de critérios. Perguntas úteis incluem: o consumidor precisa escolher campos dinamicamente? Há grande diversidade de telas e agregações? O tráfego é predominantemente service-to-service e exige contratos tipados? O caso de uso envolve streaming contínuo ou push de eventos? Os gateways atuais suportam o protocolo de maneira nativa? A equipe possui maturidade para operar o modelo escolhido?"
  },
  {
    "kind": "paragraph",
    "text": "Critérios não funcionam se forem apenas técnicos. É preciso considerar onboarding de equipes, geração de SDKs, capacidade de suporte, treinamento, postura de segurança, custo de observabilidade, curva de troubleshooting e aderência às normas corporativas. Uma tecnologia excelente sob o ponto de vista teórico pode ser inadequada se a organização não tiver processos e ferramentas para operá-la com segurança."
  },
  {
    "kind": "paragraph",
    "text": "Finalmente, a decisão precisa ser revisitada periodicamente. Produtos de gateway, service meshes, plataformas de nuvem e bibliotecas evoluem. O que era inviável em uma versão antiga pode tornar-se simples depois. Ainda assim, mudança de tecnologia nunca deve ocorrer apenas porque o mercado mudou de foco; ela precisa gerar benefício operacional ou de negócio mensurável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL, gRPC e WebSocket ampliam o repertório de integração, mas não competem no mesmo plano semântico. GraphQL é orientado a schema e consulta flexível; gRPC é orientado a serviços, métodos e mensagens tipadas; WebSocket é orientado a um canal persistente full-duplex sobre o qual a aplicação define sua própria semântica."
  },
  {
    "kind": "paragraph",
    "text": "A decisão arquitetural correta precisa considerar o problema de negócio, a forma do contrato, os requisitos de latência e streaming, a capacidade de governança, o suporte dos gateways e a maturidade operacional da organização. Escolhas feitas apenas por desempenho teórico ou por tendência do mercado tendem a falhar quando encontram observabilidade, segurança e manutenção do mundo real."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes corporativos, é comum combinar esses modelos com REST e OpenAPI. Essa combinação funciona bem quando ownership, padrões de contrato, políticas de segurança e critérios de troubleshooting estão explícitos. O principal ganho do capítulo é permitir ao leitor reconhecer o papel adequado de cada tecnologia em uma plataforma moderna de APIs."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "Com os modelos de comunicação alternativos apresentados, o próximo capítulo volta ao eixo de segurança e governança para diferenciar autenticação e autorização, base conceitual indispensável antes de avançar para credenciais, OAuth 2.0, OpenID Connect e tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura e operação",
    "id": "checklist-de-arquitetura-e-operacao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A escolha entre GraphQL, gRPC e WebSocket foi feita a partir do comportamento necessário, não apenas da preferência tecnológica.",
      "O contrato publicado está claramente identificado: schema GraphQL, .proto ou protocolo de aplicação sobre WebSocket.",
      "Há estratégia de autenticação, autorização e auditoria compatível com o modelo escolhido.",
      "Ferramentas de observabilidade capturam a granularidade correta: operação GraphQL, método gRPC ou evento/mensagem WebSocket.",
      "Os intermediários de rede e gateway suportam corretamente upgrade, HTTP/2, streaming, trailers ou conexões persistentes.",
      "O modelo de versionamento e evolução foi definido para schema, mensagens e clientes.",
      "Há proteção contra abuso: complexidade de query, limites de streaming, quotas e backpressure.",
      "Troubleshooting considera toda a cadeia: cliente, gateway, runtime da tecnologia, backends e transporte."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por que GraphQL não é apenas \"REST com um endpoint só\".",
      "Diferencie underfetching, overfetching e N+1 em GraphQL.",
      "Descreva os quatro padrões de chamada do gRPC e dê um caso de uso para cada um.",
      "Explique o papel de deadlines em gRPC e os riscos de ignorá-los.",
      "Descreva o que muda na conexão depois do status 101 do WebSocket.",
      "Compare as exigências operacionais de WebSocket e HTTP tradicional.",
      "Proponha uma arquitetura que use REST ou GraphQL na borda, gRPC entre serviços e WebSocket para eventos.",
      "Liste controles de segurança importantes para um servidor GraphQL exposto publicamente.",
      "Explique quando um gateway atua de forma consciente do protocolo e quando atua apenas como proxy genérico.",
      "Discuta por que a comparação mais útil entre essas tecnologias deve ser guiada pela semântica do problema."
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
    "caption": "Tabela 5 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Alias",
        "Recurso do GraphQL para renomear um campo na resposta."
      ],
      [
        "Batching",
        "Agrupamento de múltiplas buscas lógicas em uma chamada mais eficiente ao backend."
      ],
      [
        "Bidirectional streaming",
        "Troca contínua de mensagens em duas direções no gRPC."
      ],
      [
        "Deadline",
        "Prazo máximo aceito para conclusão de uma chamada gRPC."
      ],
      [
        "Federação GraphQL",
        "Composição de um supergrafo a partir de subgrafos mantidos por equipes distintas."
      ],
      [
        "Fragment",
        "Trecho reutilizável de seleção de campos em GraphQL."
      ],
      [
        "Introspection",
        "Capacidade de consultar o próprio schema GraphQL."
      ],
      [
        "Persisted query",
        "Query previamente registrada e referenciada normalmente por hash."
      ],
      [
        "Protocol Buffers",
        "Formato tipado de serialização binária usado com frequência no gRPC."
      ],
      [
        "Resolver",
        "Função que produz o valor de um campo no runtime GraphQL."
      ],
      [
        "Sec-WebSocket-Key",
        "Cabeçalho usado no handshake do WebSocket."
      ],
      [
        "Server streaming",
        "Padrão em que o cliente faz um request e recebe múltiplas respostas em gRPC."
      ],
      [
        "Subscription",
        "Operação GraphQL para entrega contínua de eventos ao consumidor."
      ],
      [
        "Trailer",
        "Metadado enviado ao final de um stream HTTP/2, relevante em gRPC."
      ],
      [
        "Upgrade",
        "Mecanismo HTTP usado para transição inicial ao protocolo WebSocket."
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
    "kind": "list",
    "ordered": false,
    "items": [
      "GraphQL Foundation. GraphQL Specification.",
      "GraphQL Foundation. GraphQL over HTTP Specification.",
      "gRPC Authors. gRPC Documentation.",
      "Protocol Buffers Documentation.",
      "IETF. RFC 6455 - The WebSocket Protocol.",
      "IETF. RFC 8441 - Bootstrapping WebSockets with HTTP/2.",
      "Microsoft Learn. Guidance for GraphQL, gRPC and WebSocket in Azure services.",
      "Envoy Proxy Documentation. gRPC, WebSocket and HTTP/2 support.",
      "OWASP. GraphQL Cheat Sheet e API Security Top 10."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas, gateways e malhas evoluem rapidamente. Antes de publicar políticas ou decisões de arquitetura, valide o suporte da versão específica do produto implantado em sua organização para GraphQL, gRPC, HTTP/2, streaming e WebSocket."
  }
];
