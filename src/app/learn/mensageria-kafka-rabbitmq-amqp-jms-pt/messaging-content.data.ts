import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MESSAGING_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Mensageria: desacoplar tempo, capacidade e disponibilidade"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/overview.svg",
    "alt": "Produtor publicando mensagens em broker para consumidores independentes",
    "caption": "Figura de abertura - Brokers desacoplam produtores e consumidores, mas a confiabilidade continua sendo responsabilidade ponta a ponta."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Confiabilidade depende do protocolo, do broker e do comportamento correto de produtores e consumidores."
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
    "text": "Mensageria é uma das bases de arquiteturas distribuídas. Em vez de exigir que dois sistemas estejam disponíveis ao mesmo tempo e concluam uma interação no mesmo intervalo, um produtor publica uma mensagem em um intermediário e um ou mais consumidores processam essa mensagem quando possuem capacidade. Esse desacoplamento temporal reduz dependências diretas, absorve picos e permite compor fluxos assíncronos de negócio."
  },
  {
    "kind": "paragraph",
    "text": "A palavra mensageria, porém, cobre modelos diferentes. Uma fila tradicional distribui unidades de trabalho para consumidores e tende a remover ou confirmar mensagens após o processamento. Um log distribuído mantém registros por um período e permite que consumidores independentes avancem seus próprios offsets ou façam replay. Um sistema de publish/subscribe entrega cópias lógicas a vários grupos interessados. Cada modelo altera ordering, retenção, escalabilidade e recuperação."
  },
  {
    "kind": "paragraph",
    "text": "Kafka e RabbitMQ são frequentemente comparados como concorrentes, mas nasceram com ênfases distintas. Kafka organiza eventos em tópicos particionados e persistentes, otimizados para retenção, replay e alto throughput. RabbitMQ é um broker de mensageria com roteamento flexível por exchanges, filas, acknowledgements e diferentes tipos de fila. AMQP pode significar tanto o modelo 0-9-1 associado ao RabbitMQ quanto o protocolo padronizado AMQP 1.0. JMS, hoje Jakarta Messaging, é uma API Java e não um broker ou protocolo único."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo constrói um modelo mental que começa em mensagens, confirmação, ordering e idempotência; aprofunda Kafka e RabbitMQ; diferencia AMQP 0-9-1 de AMQP 1.0; explica a abstração JMS; e encerra com padrões de integração, segurança, observabilidade, capacidade e troubleshooting. O objetivo é permitir decisões técnicas conscientes, não apenas ensinar comandos de um produto."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada fluxo, escreva quem produz, onde a mensagem fica armazenada, como o broker confirma recebimento, quando o consumidor confirma processamento, qual é a unidade de ordering e como duplicatas serão tratadas. Sem essas respostas, a promessa de entrega permanece ambígua."
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
      "Explicar por que mensageria desacopla tempo, capacidade e disponibilidade entre sistemas.",
      "Distinguir fila, tópico, log distribuído, publish/subscribe e stream.",
      "Compreender acknowledgements, confirms, offsets e semânticas de entrega.",
      "Relacionar ordering, partições, consumer groups, retries e idempotência.",
      "Descrever a arquitetura do Kafka, incluindo tópicos, partições, réplicas, líderes e KRaft.",
      "Descrever a arquitetura do RabbitMQ, incluindo exchanges, queues, bindings, vhosts e channels.",
      "Diferenciar AMQP 0-9-1 e AMQP 1.0.",
      "Explicar Jakarta Messaging/JMS como API de programação e abstração de provider.",
      "Projetar DLQ, retry, Outbox, Inbox, request-reply e competing consumers.",
      "Aplicar segurança, observabilidade, planejamento de capacidade e troubleshooting."
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
      "31.1 Fundamentos de mensageria e desacoplamento",
      "31.2 Fila, publish/subscribe, stream e log distribuído",
      "31.3 Mensagens, envelopes, headers e contratos",
      "31.4 Acknowledgements, confirms e semânticas de entrega",
      "31.5 Ordering, partições, idempotência e duplicatas",
      "31.6 Kafka: arquitetura, produtores e consumidores",
      "31.7 Retenção, compactação, replay, Connect e Streams",
      "31.8 RabbitMQ: exchanges, filas, bindings e routing",
      "31.9 Confiabilidade, quorum queues, streams, DLX e prefetch",
      "31.10 AMQP 0-9-1 e AMQP 1.0",
      "31.11 Jakarta Messaging/JMS",
      "31.12 Padrões de integração, segurança, observabilidade e troubleshooting",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.1 Fundamentos de mensageria e desacoplamento",
    "id": "31-1-fundamentos-de-mensageria-e-desacoplamento"
  },
  {
    "kind": "paragraph",
    "text": "Em uma chamada síncrona, o consumidor depende da disponibilidade e do tempo de resposta do provedor. Em um fluxo assíncrono, o produtor transfere a responsabilidade imediata para um broker ou log, recebe uma confirmação apropriada e segue seu processamento. O consumidor pode trabalhar depois, respeitando sua própria capacidade. Essa diferença altera a arquitetura de falhas: indisponibilidade temporária do consumidor não precisa impedir a publicação, desde que o broker possua armazenamento e capacidade suficientes."
  },
  {
    "kind": "paragraph",
    "text": "O desacoplamento não é absoluto. Produtores e consumidores continuam compartilhando contrato, semântica, expectativa de prazo e regras de negócio. Uma mensagem pode estar tecnicamente entregue e ainda ser semanticamente inválida. Um consumidor pode confirmar cedo demais e perder trabalho, ou confirmar tarde demais e provocar duplicatas. Por isso, mensageria precisa de contrato, ownership, observabilidade e estratégia de recuperação."
  },
  {
    "kind": "paragraph",
    "text": "A decisão entre síncrono e assíncrono deve observar o significado do resultado. Consultas que precisam responder imediatamente ao usuário normalmente permanecem síncronas. Processos longos, integração com múltiplos sistemas, absorção de picos e propagação de eventos se beneficiam de assincronicidade. Muitos fluxos combinam ambos: uma API aceita o comando, persiste estado e publica um evento; o cliente acompanha a conclusão por consulta, callback ou canal de notificação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.2 Fila, publish/subscribe, stream e log distribuído",
    "id": "31-2-fila-publish-subscribe-stream-e-log-distribuido"
  },
  {
    "kind": "paragraph",
    "text": "Fila é uma estrutura em que mensagens aguardam consumidores. No padrão competing consumers, várias instâncias compartilham a fila e cada mensagem é processada por apenas uma delas. Publish/subscribe cria múltiplas assinaturas ou filas lógicas para que grupos diferentes recebam o mesmo evento. O termo tópico pode representar uma entidade de roteamento, uma categoria de publicação ou um log particionado, dependendo da tecnologia."
  },
  {
    "kind": "paragraph",
    "text": "Kafka trata um tópico como um log dividido em partições. Registros permanecem conforme políticas de retenção ou compactação, e consumidores registram offsets. Isso permite replay, múltiplos grupos independentes e reconstrução de projeções. RabbitMQ usa exchanges para rotear mensagens a filas ou streams; consumidores normalmente recebem de filas e confirmam processamento. Streams do RabbitMQ acrescentam retenção e leitura por offset, aproximando-se de casos de log."
  },
  {
    "kind": "paragraph",
    "text": "Escolher o modelo correto é mais importante do que escolher o produto por marca. Trabalho exclusivo e comandos direcionados combinam bem com filas. Eventos de domínio destinados a vários consumidores pedem fan-out ou grupos independentes. Histórico reprocessável, analytics e event streaming favorecem logs. Um sistema pode usar mais de um modelo ao mesmo tempo."
  },
  {
    "kind": "subhead",
    "text": "Fila tradicional e log distribuído preservam estados diferentes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-01-queue-log.svg",
    "alt": "Fila tradicional comparada a log distribuído com offsets",
    "caption": "Figura 1 - Filas e logs diferem principalmente no ciclo de vida da mensagem e na posição mantida pelo consumidor."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - O nome tópico não possui exatamente a mesma semântica em todas as plataformas.",
    "headers": [
      "Modelo",
      "Unidade de consumo",
      "Retenção típica",
      "Uso recorrente"
    ],
    "rows": [
      [
        "Fila",
        "Uma mensagem para um consumidor do grupo.",
        "Até ack, expiração ou descarte.",
        "Comandos, tarefas e integração operacional."
      ],
      [
        "Pub/sub",
        "Uma cópia lógica por assinatura ou grupo.",
        "Conforme cada destino.",
        "Eventos para múltiplos domínios."
      ],
      [
        "Log particionado",
        "Offset por partição e grupo.",
        "Por tempo, tamanho ou compactação.",
        "Replay, analytics e event streaming."
      ],
      [
        "Stream persistente",
        "Leitura sequencial com offset.",
        "Retenção configurada.",
        "Telemetria, eventos e fan-out durável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.3 Mensagens, envelopes, headers e contratos",
    "id": "31-3-mensagens-envelopes-headers-e-contratos"
  },
  {
    "kind": "paragraph",
    "text": "Uma mensagem possui payload e metadados. O payload carrega o dado de negócio; headers ou properties carregam informações como tipo, versão, correlation ID, content type, timestamp, trace context, prioridade, expiração e chave de particionamento. Misturar metadados de transporte com regras de negócio dificulta migração entre brokers e pode criar dependência excessiva de uma biblioteca específica."
  },
  {
    "kind": "paragraph",
    "text": "Contratos de eventos precisam definir semântica, não apenas JSON. O nome do evento deve indicar algo que ocorreu, como PagamentoAutorizado, e não uma instrução ambígua. O schema precisa informar campos obrigatórios, nullability, tipos, unidades, precisão, identificadores e compatibilidade. Avro, JSON Schema e Protobuf são opções comuns, mas a governança depende de regras de evolução, catálogo e testes."
  },
  {
    "kind": "paragraph",
    "text": "Envelopes padronizados facilitam correlação e observabilidade. Entretanto, replicar toda a entidade em cada evento pode expor dados desnecessários e aumentar acoplamento. Publicar apenas um identificador pode obrigar consumidores a fazer chamadas síncronas. A decisão deve equilibrar autonomia, privacidade, tamanho, consistência e frequência de mudança."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de envelope de evento"
  },
  {
    "kind": "code",
    "text": "{\n  \"specversion\": \"1.0\",\n  \"type\": \"pagamento.autorizado.v1\",\n  \"id\": \"evt-7f8d2a\",\n  \"source\": \"servico-pagamentos\",\n  \"time\": \"2026-07-16T11:30:00Z\",\n  \"subject\": \"pagamento/93842\",\n  \"data\": { \"pagamentoId\": \"93842\", \"valor\": 149.90 }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.4 Acknowledgements, confirms e semânticas de entrega",
    "id": "31-4-acknowledgements-confirms-e-semanticas-de-entrega"
  },
  {
    "kind": "paragraph",
    "text": "Confiabilidade precisa ser analisada por trecho. O produtor envia ao broker e precisa saber se a mensagem foi aceita com o nível de durabilidade requerido. Depois, o broker entrega ao consumidor e precisa saber se o processamento terminou. Publisher confirms e consumer acknowledgements resolvem essas duas relações separadas. Um confirm do broker não prova que o consumidor concluiu a regra de negócio."
  },
  {
    "kind": "paragraph",
    "text": "At-most-once aceita a possibilidade de perda para evitar repetição: a mensagem pode ser considerada concluída antes do processamento. At-least-once privilegia não perder, mas aceita duplicatas quando há falha após o efeito de negócio e antes do acknowledgement. Exactly-once é uma propriedade contextual, normalmente limitada a fronteiras específicas. Não significa que qualquer efeito externo, banco ou API remota será magicamente executado uma única vez."
  },
  {
    "kind": "paragraph",
    "text": "Em sistemas reais, at-least-once com idempotência é a base mais comum. O consumidor registra um identificador processado ou usa uma operação naturalmente idempotente, executa o efeito e confirma depois. Se a mensagem reaparecer, o mesmo resultado é preservado. Quando o efeito e o registro de deduplicação não compartilham transação, ainda existem janelas de falha que precisam ser tratadas pelo desenho."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-02-confirms-acks.svg",
    "alt": "Confirmações entre produtor, broker e consumidor",
    "caption": "Figura 2 - Confirmação de publicação e confirmação de processamento são mecanismos ortogonais."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - A semântica deve ser definida ponta a ponta, não apenas pelo nome do recurso do broker.",
    "headers": [
      "Semântica",
      "O que privilegia",
      "Risco residual"
    ],
    "rows": [
      [
        "At-most-once",
        "Evitar repetição.",
        "Mensagem pode ser perdida."
      ],
      [
        "At-least-once",
        "Evitar perda.",
        "Consumidor deve tolerar duplicatas."
      ],
      [
        "Exactly-once contextual",
        "Uma transação ou pipeline controlado.",
        "Efeitos externos podem ficar fora da garantia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.5 Ordering, partições, idempotência e duplicatas",
    "id": "31-5-ordering-particoes-idempotencia-e-duplicatas"
  },
  {
    "kind": "paragraph",
    "text": "Ordering global reduz paralelismo e é caro. A maioria das plataformas preserva ordem apenas dentro de uma fila, partição, canal ou sessão, e mesmo essa ordem pode ser alterada por requeue, prioridade, múltiplos produtores ou processamento concorrente. A arquitetura deve definir qual entidade precisa de ordem: conta, pedido, cliente ou agregado. Essa entidade costuma orientar a chave de particionamento ou o destino da mensagem."
  },
  {
    "kind": "paragraph",
    "text": "Uma chave estável concentra eventos relacionados na mesma partição, mas pode produzir hot partitions se a distribuição for desigual. Chaves aleatórias melhoram balanceamento, porém perdem ordering por entidade. O consumidor também precisa processar de forma compatível: várias threads sobre a mesma partição podem concluir fora de ordem se não houver coordenação."
  },
  {
    "kind": "paragraph",
    "text": "Duplicatas surgem em retries de produtor, reentrega após falha, failover e reprocessamento intencional. Idempotência pode usar chave de negócio, versão do agregado, tabela Inbox, compare-and-set, upsert ou controle de sequência. A solução deve definir por quanto tempo a deduplicação é mantida e qual é o comportamento quando uma mensagem antiga reaparece."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "Pergunte sempre: ordem entre quais mensagens, dentro de qual unidade, observada por qual consumidor e durante qual janela? Dizer apenas que o broker preserva ordem é insuficiente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.6 Kafka: arquitetura distribuída",
    "id": "31-6-kafka-arquitetura-distribuida"
  },
  {
    "kind": "paragraph",
    "text": "Kafka organiza dados em tópicos particionados. Cada partição é um log ordenado de registros identificados por offsets crescentes. Uma partição possui uma réplica líder que atende leituras e escritas e réplicas seguidoras que acompanham o log. Replicação aumenta tolerância a falhas, mas a durabilidade percebida depende de configurações de produtor, quantidade de réplicas e conjunto de réplicas sincronizadas."
  },
  {
    "kind": "paragraph",
    "text": "Brokers armazenam partições e atendem clientes. A metadata do cluster é coordenada pelo modo KRaft, baseado em quorum de controladores. A separação entre brokers e controladores pode ser física ou lógica, conforme o porte e a topologia. Planejamento de capacidade considera disco sequencial, page cache, rede, quantidade de partições, replicação, retenção e padrão de acesso."
  },
  {
    "kind": "paragraph",
    "text": "Tópicos não são filas exclusivas. Vários consumer groups podem ler o mesmo tópico de maneira independente. Dentro de um grupo, cada partição ativa é atribuída a apenas um consumidor por vez, o que limita o paralelismo útil ao número de partições. Adicionar consumidores além desse número não aumenta throughput daquele grupo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-03-kafka.svg",
    "alt": "Tópicos, partições, réplicas e consumer groups no Kafka",
    "caption": "Figura 3 - O Kafka combina partições, replicação e consumer groups para escalar armazenamento e consumo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.7 Produtores, consumidores, offsets e transações no Kafka",
    "id": "31-7-produtores-consumidores-offsets-e-transacoes-no-kafka"
  },
  {
    "kind": "paragraph",
    "text": "O produtor escolhe tópico, chave, headers e payload. A chave pode determinar a partição, e o batching agrupa registros para melhorar eficiência. A configuração acks controla quando a publicação é considerada concluída. Idempotent producer evita duplicação causada por retries dentro das garantias suportadas pelo protocolo. Isso não torna automaticamente idempotente um consumidor que grava em outro banco."
  },
  {
    "kind": "paragraph",
    "text": "Consumidores fazem parte de grupos, recebem partições e controlam offsets. Commit antecipado pode perder processamento; commit tardio pode causar reentrega. Rebalances redistribuem partições quando membros entram, saem ou alteram assinatura. Estratégias cooperativas e tratamento correto de revogação reduzem pausas, mas o consumidor precisa finalizar ou interromper trabalho de maneira segura."
  },
  {
    "kind": "paragraph",
    "text": "Transações Kafka podem agrupar publicações e commits de offsets para pipelines consume-transform-produce dentro do ecossistema Kafka. Com isolation apropriado, consumidores evitam ler registros abortados. A garantia não se estende automaticamente a bancos externos, e-mails ou chamadas HTTP. Para esses efeitos, Outbox, Inbox e idempotência continuam relevantes."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A confiabilidade do Kafka emerge da combinação de várias decisões.",
    "headers": [
      "Elemento",
      "Decisão técnica",
      "Impacto"
    ],
    "rows": [
      [
        "Chave",
        "Entidade usada no particionamento.",
        "Ordering e distribuição de carga."
      ],
      [
        "acks",
        "Nível de confirmação do cluster.",
        "Durabilidade e latência."
      ],
      [
        "Offset commit",
        "Momento em que o grupo avança.",
        "Perda ou duplicação após falha."
      ],
      [
        "Rebalance",
        "Redistribuição de partições.",
        "Pausas, revogação e paralelismo."
      ],
      [
        "Transação",
        "Publicações e offsets atômicos no Kafka.",
        "Exactly-once dentro de fronteiras controladas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.8 Retenção, compactação, replay, Kafka Connect e Kafka Streams",
    "id": "31-8-retencao-compactacao-replay-kafka-connect-e-kafka-streams"
  },
  {
    "kind": "paragraph",
    "text": "Retenção por tempo ou tamanho remove segmentos antigos independentemente de todos os consumidores terem lido. O dimensionamento precisa garantir que consumidores atrasados não ultrapassem a janela de retenção. Log compaction preserva, de forma eventual, o registro mais recente por chave e é útil para changelogs e reconstrução de estado. Tombstones representam remoções no modelo compactado."
  },
  {
    "kind": "paragraph",
    "text": "Replay é um recurso poderoso e perigoso. Reposicionar offsets permite reconstruir projeções e corrigir consumidores, mas também pode repetir efeitos externos. Antes de reprocessar, o time deve separar consumidores puramente determinísticos daqueles que enviam e-mail, debitam valores ou chamam terceiros. Ambientes de replay, tópicos de saída separados e dry-run reduzem risco."
  },
  {
    "kind": "paragraph",
    "text": "Kafka Connect padroniza integração com fontes e destinos por connectors, tasks e offsets. Kafka Streams oferece biblioteca para transformações, joins, janelas e state stores. Esses componentes não eliminam decisões de schema, semântica, partição e tratamento de erros; eles fornecem runtime e abstrações para implementá-las."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.9 RabbitMQ: arquitetura, exchanges, filas e bindings",
    "id": "31-9-rabbitmq-arquitetura-exchanges-filas-e-bindings"
  },
  {
    "kind": "paragraph",
    "text": "RabbitMQ recebe conexões TCP e multiplexa canais lógicos. Virtual hosts isolam namespaces, permissões e topologias. Em AMQP 0-9-1, publishers publicam em exchanges. A exchange analisa tipo, routing key, headers e bindings para encaminhar a mensagem a uma ou mais filas, streams ou outras exchanges. Uma mensagem não roteada pode ser descartada ou devolvida ao publisher quando o modo mandatory é usado."
  },
  {
    "kind": "paragraph",
    "text": "Exchanges direct comparam routing keys de forma exata; topic usam padrões hierárquicos; fanout distribuem para todos os bindings; headers usam propriedades da mensagem. Filas armazenam mensagens para consumidores. Durabilidade da fila, persistência da mensagem e replicação são conceitos diferentes: todos precisam estar coerentes com o requisito de sobrevivência a falhas."
  },
  {
    "kind": "paragraph",
    "text": "Connections são recursos relativamente pesados; channels são usados para multiplexar operações. Abrir um channel por mensagem é antipadrão. Publishers e consumidores de longa duração precisam tratar reconexão, recuperação de topologia, confirms, acknowledgements e fluxo. O broker não substitui lógica de aplicação para deduplicação ou reconciliação."
  },
  {
    "kind": "subhead",
    "text": "RabbitMQ AMQP 0-9-1: publicação em exchange e roteamento para filas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-04-rabbitmq.svg",
    "alt": "Exchange do RabbitMQ roteando publicações para filas",
    "caption": "Figura 4 - Exchanges desacoplam publicação e filas por meio de regras de roteamento."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - A exchange decide roteamento; a fila decide armazenamento e entrega aos consumidores.",
    "headers": [
      "Exchange",
      "Regra",
      "Uso comum"
    ],
    "rows": [
      [
        "Direct",
        "Routing key exata.",
        "Comandos por categoria ou destino."
      ],
      [
        "Topic",
        "Padrões com palavras e curingas.",
        "Eventos hierárquicos e assinaturas seletivas."
      ],
      [
        "Fanout",
        "Ignora routing key e distribui a todos.",
        "Broadcast para várias filas."
      ],
      [
        "Headers",
        "Combina headers da mensagem.",
        "Roteamento por múltiplos atributos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.10 RabbitMQ: acknowledgements, prefetch, quorum queues, streams e DLX",
    "id": "31-10-rabbitmq-acknowledgements-prefetch-quorum-queues-streams-e-dlx"
  },
  {
    "kind": "paragraph",
    "text": "Consumer acknowledgements podem ser automáticos ou manuais. No modo manual, o consumidor confirma após concluir o trabalho, rejeita sem requeue quando a mensagem é inválida ou pede requeue quando a falha parece temporária. Requeue indiscriminado pode criar loop de redelivery. Prefetch limita a quantidade de mensagens não confirmadas por consumidor e funciona como mecanismo de backpressure e distribuição de carga."
  },
  {
    "kind": "paragraph",
    "text": "Publisher confirms informam que o broker assumiu responsabilidade pela publicação. Eles são independentes dos consumer acknowledgements. Para alto throughput, aplicações normalmente usam confirms assíncronos e correlacionam sequências, em vez de bloquear após cada mensagem. O uso de transações de channel é possível, mas costuma ter custo maior e não substitui transações de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Quorum queues são filas replicadas orientadas a segurança de dados e consenso. Classic queues permanecem úteis para casos específicos, mas não são a escolha de alta disponibilidade. Streams e super streams oferecem retenção, replay e particionamento. Dead Letter Exchanges recebem mensagens expiradas, rejeitadas ou excedentes conforme políticas. Poison messages precisam de contagem de tentativas, quarentena e tratamento operacional, não apenas requeue infinito."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Recursos de confiabilidade precisam ser combinados com comportamento correto da aplicação.",
    "headers": [
      "Recurso",
      "Resolve",
      "Cuidado"
    ],
    "rows": [
      [
        "Prefetch",
        "Número de deliveries em voo.",
        "Valor alto aumenta memória e trabalho perdido em falha."
      ],
      [
        "Publisher confirm",
        "Aceitação da publicação pelo broker.",
        "Não confirma processamento do consumidor."
      ],
      [
        "Manual ack",
        "Conclusão do consumidor.",
        "Ack cedo demais pode perder efeito."
      ],
      [
        "Quorum queue",
        "Replicação e segurança de dados.",
        "Custo maior de disco, rede e quorum."
      ],
      [
        "DLX/DLQ",
        "Separação de mensagens não processáveis.",
        "Precisa de ownership, alerta e reprocessamento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.11 AMQP 0-9-1 e AMQP 1.0",
    "id": "31-11-amqp-0-9-1-e-amqp-1-0"
  },
  {
    "kind": "paragraph",
    "text": "AMQP 0-9-1 é o modelo de protocolo amplamente associado ao RabbitMQ. Ele define exchanges, queues, bindings, channels e métodos como basic.publish, basic.consume e acknowledgements. AMQP 1.0 é um padrão OASIS diferente: define protocolo binário de wire, sistema de tipos, mensagens, connections, sessions, links, flow control, settlement e outcomes. Compartilhar o nome AMQP não torna as versões interoperáveis diretamente."
  },
  {
    "kind": "paragraph",
    "text": "No AMQP 1.0, um link é unidirecional entre source e target e possui sender e receiver endpoints. Deliveries podem permanecer unsettled até que as partes concordem sobre o outcome. Créditos de link controlam fluxo. A especificação não obriga uma topologia de broker com exchanges e queues iguais às do RabbitMQ 0-9-1; produtos mapeiam conceitos do protocolo para suas próprias entidades."
  },
  {
    "kind": "paragraph",
    "text": "Arquitetos precisam registrar versão e implementação explicitamente. Dizer apenas usamos AMQP é insuficiente. Uma biblioteca AMQP 1.0 não se conecta automaticamente a um endpoint que aceita apenas 0-9-1. Também variam autenticação SASL, endereçamento, settlement, transactions e extensões do produto."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-05-amqp.svg",
    "alt": "Camadas de conexão, sessão e link do AMQP 1.0",
    "caption": "Figura 5 - AMQP 1.0 define uma pilha de protocolo diferente do modelo exchange/queue do AMQP 0-9-1."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - As duas famílias precisam ser documentadas separadamente.",
    "headers": [
      "Aspecto",
      "AMQP 0-9-1",
      "AMQP 1.0"
    ],
    "rows": [
      [
        "Ênfase",
        "Modelo de broker com exchanges e filas.",
        "Protocolo de wire e mensageria em camadas."
      ],
      [
        "Unidade lógica",
        "Connection e channel.",
        "Connection, session e link."
      ],
      [
        "Roteamento",
        "Exchange, routing key e bindings.",
        "Source/target e semântica do produto."
      ],
      [
        "Confirmação",
        "Publisher confirms e consumer acks.",
        "Settlement, delivery state e outcomes."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.12 Jakarta Messaging/JMS",
    "id": "31-12-jakarta-messaging-jms"
  },
  {
    "kind": "paragraph",
    "text": "JMS foi a API Java padronizada para mensageria corporativa e hoje faz parte de Jakarta Messaging. Ela oferece interfaces para criar conexões, produzir, consumir e ler mensagens por meio de um provider. A API simplificada usa JMSContext, enquanto o modelo clássico separa Connection, Session, MessageProducer e MessageConsumer. Destination representa Queue ou Topic."
  },
  {
    "kind": "paragraph",
    "text": "JMS define modelos point-to-point e publish/subscribe, durable subscriptions, selectors, delivery mode, priority, expiration, acknowledgement modes e sessões transacionadas. Também integra-se a transações distribuídas por XA quando o provider e o ambiente suportam. XA pode ser necessário em legados, porém adiciona acoplamento e custo operacional; padrões como Outbox são frequentemente preferidos em microserviços."
  },
  {
    "kind": "paragraph",
    "text": "JMS não define um único protocolo de rede nem garante que todos os providers implementem topologias idênticas. Um provider pode usar protocolo proprietário, AMQP ou outro transporte. Migrar de provider exige validar semântica de destino, redelivery, selectors, transações, temporary destinations, durable subscriptions e administração. O código Java pode compilar e ainda apresentar comportamento operacional diferente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/pt/figure-06-jms.svg",
    "alt": "Jakarta Messaging conectando aplicação Java ao provider e destinos",
    "caption": "Figura 6 - Jakarta Messaging padroniza a API da aplicação, enquanto o provider implementa conexão com o sistema de mensageria."
  },
  {
    "kind": "code",
    "text": "try (JMSContext context = connectionFactory.createContext()) {\n    Queue fila = context.createQueue(\"fila.pagamentos\");\n    JMSProducer producer = context.createProducer();\n    producer.setProperty(\"eventType\", \"PagamentoCriado\");\n    producer.send(fila, jsonPayload);\n}\n// O consumidor deve tratar redelivery e idempotência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.13 Padrões de integração com mensageria",
    "id": "31-13-padroes-de-integracao-com-mensageria"
  },
  {
    "kind": "paragraph",
    "text": "Competing Consumers distribui trabalho entre instâncias. Publish/Subscribe entrega o mesmo evento a grupos diferentes. Request-Reply usa correlation ID e reply destination, mas pode recriar acoplamento síncrono sobre o broker. Dead Letter Channel isola mensagens não processáveis. Retry com atraso deve diferenciar falha transitória de erro permanente e limitar tentativas."
  },
  {
    "kind": "paragraph",
    "text": "Transactional Outbox grava alteração de negócio e evento na mesma transação local; um relay publica depois. Inbox registra mensagens processadas para deduplicação. Saga coordena transações locais e compensações. Event-Carried State Transfer leva dados suficientes no evento para reduzir chamadas síncronas. Claim Check armazena payload grande fora do broker e transporta apenas referência segura."
  },
  {
    "kind": "paragraph",
    "text": "Cada padrão tem custo. Retry queues aumentam topologia e latência. DLQ sem processo operacional vira cemitério silencioso. Request-Reply pode saturar filas temporárias. Event-Carried State Transfer replica dados e exige governança de privacidade. O desenho deve incluir SLO, monitoramento, ownership e procedimento de reprocessamento."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Padrões só são completos quando incluem operação e recuperação.",
    "headers": [
      "Padrão",
      "Objetivo",
      "Risco"
    ],
    "rows": [
      [
        "Competing Consumers",
        "Escalar processamento de tarefas.",
        "Ordering e carga desigual."
      ],
      [
        "Pub/Sub",
        "Distribuir eventos para vários domínios.",
        "Contratos e consumidores esquecidos."
      ],
      [
        "Retry + DLQ",
        "Separar falhas transitórias e permanentes.",
        "Loops, acúmulo e reprocessamento inseguro."
      ],
      [
        "Outbox + Inbox",
        "Coordenar banco e publicação; deduplicar.",
        "Latência e armazenamento operacional."
      ],
      [
        "Request-Reply",
        "Obter resposta assíncrona correlacionada.",
        "Recriar dependência temporal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.14 Segurança, governança de schemas e privacidade",
    "id": "31-14-seguranca-governanca-de-schemas-e-privacidade"
  },
  {
    "kind": "paragraph",
    "text": "Segurança começa no transporte e identidade. Kafka pode usar TLS, mTLS, SASL e ACLs; RabbitMQ combina TLS, mecanismos de autenticação, usuários, vhosts e permissões; providers JMS possuem controles próprios. Credenciais precisam de rotação, menor privilégio e separação por aplicação. Confiar em rede interna não substitui autenticação entre workloads."
  },
  {
    "kind": "paragraph",
    "text": "Autorização deve limitar tópicos, grupos, exchanges, filas e operações administrativas. Um produtor comprometido não deve publicar em qualquer domínio, e um consumidor não deve ler eventos sensíveis sem necessidade. Em brokers multi-tenant, quotas, isolamento de namespace e proteção contra noisy neighbor são parte da segurança."
  },
  {
    "kind": "paragraph",
    "text": "Schemas precisam de catálogo, owner, compatibilidade e classificação de dados. Eventos persistidos por dias ou meses ampliam impacto de vazamento e direito de retenção. Criptografia em repouso protege mídia, mas não impede consumidores autorizados de ver payload. Tokenização, minimização e separação de tópicos podem ser necessárias para LGPD e políticas corporativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.15 Alta disponibilidade, capacidade e backpressure",
    "id": "31-15-alta-disponibilidade-capacidade-e-backpressure"
  },
  {
    "kind": "paragraph",
    "text": "Kafka distribui partições e réplicas entre brokers. RabbitMQ usa quorum queues, streams e outros mecanismos conforme o tipo de dado. Alta disponibilidade não é apenas ter três nós: é necessário distribuir falhas, testar eleição de líderes, verificar replicação, dimensionar disco e garantir que clientes descubram novos líderes ou reconectem corretamente."
  },
  {
    "kind": "paragraph",
    "text": "Capacidade é determinada por taxa de entrada, taxa de saída, tamanho de mensagem, retenção, replicação e backlog máximo. Um fluxo que recebe 20 MB/s, replica três vezes e retém sete dias exige muito mais que a soma do payload de negócio. Compactação, índices, page cache, picos, rebalance e margem operacional entram no cálculo."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure evita que produtores ou brokers sobrecarreguem consumidores. Kafka expressa pressão por lag, limites de polling e capacidade do consumidor. RabbitMQ usa prefetch, flow control e limites de fila. A aplicação precisa reduzir consumo, escalar ou rejeitar trabalho conscientemente. Acumular backlog sem SLO apenas desloca a indisponibilidade para o futuro."
  },
  {
    "kind": "subhead",
    "text": "Planejamento de capacidade"
  },
  {
    "kind": "paragraph",
    "text": "Dimensione para o pior backlog aceitável, não apenas para a média. Inclua retenção, replicação, overhead, reprocessamento, manutenção e crescimento. O broker precisa sobreviver ao período em que consumidores estão degradados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.16 Observabilidade e troubleshooting",
    "id": "31-16-observabilidade-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade de mensageria precisa conectar produtor, broker e consumidor. Métricas essenciais incluem taxa de publicação, taxa de consumo, bytes, latência, erros, confirms pendentes, mensagens não confirmadas, lag, backlog, idade da mensagem mais antiga, redeliveries, DLQ, partições sem réplica sincronizada e utilização de disco. Uma métrica isolada raramente explica o problema."
  },
  {
    "kind": "paragraph",
    "text": "Em Kafka, lag alto pode significar consumidor lento, partição quente, rebalance frequente, erro de processamento ou falta de capacidade. Em RabbitMQ, ready messages, unacked messages e taxa de acknowledgements ajudam a distinguir fila acumulada de consumidores travados. Em JMS, o diagnóstico também depende do provider e do modo de acknowledgement ou transação."
  },
  {
    "kind": "paragraph",
    "text": "Traces distribuídos devem propagar traceparent ou contexto equivalente em headers, mas o span assíncrono não deve fingir ser uma chamada síncrona longa. Correlation IDs, message IDs, causation IDs e timestamps permitem reconstruir cadeia de eventos. Logs precisam evitar payloads sensíveis e registrar decisões: published, confirmed, delivered, retried, dead-lettered e acknowledged."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Troubleshooting eficaz separa publicação, armazenamento, entrega e processamento.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências"
    ],
    "rows": [
      [
        "Lag crescente no Kafka",
        "Consumidor lento, hot partition ou rebalance.",
        "Lag por partição, tempo de processamento e eventos de grupo."
      ],
      [
        "Mensagens ready no RabbitMQ",
        "Falta de consumidores ou erro de roteamento.",
        "Consumer count, deliver rate e bindings."
      ],
      [
        "Muitas unacked",
        "Prefetch alto, consumidor travado ou ack tardio.",
        "Unacked por channel e duração do processamento."
      ],
      [
        "DLQ crescendo",
        "Contrato inválido, dependência quebrada ou poison message.",
        "Motivo, headers de retry e erro da aplicação."
      ],
      [
        "Duplicatas",
        "Retry, redelivery ou commit/ack fora de ordem.",
        "IDs, offsets, redelivered flag e tabela Inbox."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.17 Estudos de caso e laboratórios",
    "id": "31-17-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - pagamentos: a API registra a ordem e uma Outbox na mesma transação. Um relay publica PagamentoCriado em Kafka usando pagamentoId como chave. Serviços de fraude, notificação e conciliação usam grupos independentes. O serviço de fraude mantém ordering por pagamento e publica a decisão. Replays são executados em tópicos de saída isolados para não reenviar efeitos externos."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - tarefas operacionais: um sistema publica comandos em uma exchange topic do RabbitMQ. Filas por capacidade recebem mensagens por routing key. Consumidores usam prefetch limitado, manual ack e retry com atraso. Depois do limite, mensagens seguem para DLQ com causa e contagem. Um processo operacional permite corrigir dado e republicar com idempotency key."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - legado Java: uma aplicação Jakarta EE usa JMS para publicar em um provider corporativo. A modernização preserva o contrato lógico, mas revisa transações XA, selectors, durable subscriptions e redelivery antes de migrar para outro broker. O time evita assumir que a mesma API Java significa comportamento idêntico entre providers."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Publique mensagens em Kafka com duas chaves e observe partições e offsets. 2) Crie dois consumers no mesmo grupo e depois em grupos diferentes. 3) No RabbitMQ, configure direct, topic e fanout exchanges. 4) Teste manual ack, prefetch, nack, requeue e DLQ. 5) Implemente um consumidor idempotente com Inbox. 6) Compare uma API JMS com o protocolo real usado pelo provider."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Mensageria desacopla produtores e consumidores no tempo e na capacidade, mas não elimina contrato, ownership nem falhas distribuídas. Filas, publish/subscribe e logs particionados possuem ciclos de vida diferentes. A escolha deve considerar retenção, replay, ordering, fan-out e natureza do trabalho."
  },
  {
    "kind": "paragraph",
    "text": "Kafka organiza tópicos em partições persistentes e oferece consumer groups, offsets, retenção, compactação e pipelines transacionais dentro de fronteiras controladas. RabbitMQ enfatiza roteamento por exchanges, filas, acknowledgements, confirms, quorum queues, streams e topologias de entrega flexíveis. AMQP 0-9-1 e AMQP 1.0 são protocolos distintos, apesar do nome comum."
  },
  {
    "kind": "paragraph",
    "text": "Jakarta Messaging/JMS padroniza a programação Java, não o broker nem o protocolo de wire. Em qualquer plataforma, confiabilidade real depende da combinação de confirmações, idempotência, ordering, retries, DLQ, observabilidade e capacidade. O melhor desenho explicita as janelas de falha e o procedimento de recuperação."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda observabilidade de APIs e sistemas distribuídos, conectando logs, métricas e tracing com OpenTelemetry. Os conceitos de correlation ID, lag, backlog, redelivery e causalidade estudados aqui serão essenciais."
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
      "O modelo foi escolhido conscientemente: fila, pub/sub, log ou stream.",
      "Contrato, owner, versão e classificação de dados da mensagem estão documentados.",
      "Confirmação do produtor e acknowledgement do consumidor foram tratados separadamente.",
      "A unidade de ordering e a chave de particionamento estão definidas.",
      "Consumidores são idempotentes ou possuem estratégia explícita para duplicatas.",
      "Retries possuem limite, atraso e distinção entre falha transitória e permanente.",
      "DLQ possui alerta, owner, procedimento de análise e reprocessamento seguro.",
      "Retenção, replay e compactação foram avaliados contra privacidade e capacidade.",
      "Permissões seguem menor privilégio para tópicos, grupos, vhosts, exchanges e filas.",
      "Lag, backlog, idade da mensagem, confirms, unacked e DLQ são monitorados.",
      "Failover, eleição, reconexão e desastre foram testados.",
      "Planos de capacidade incluem replicação, picos, manutenção e reprocessamento."
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
      "Diferencie fila tradicional, publish/subscribe e log distribuído.",
      "Explique por que publisher confirm não substitui consumer acknowledgement.",
      "Descreva uma situação at-least-once e como torná-la idempotente.",
      "Explique por que Kafka preserva ordem por partição e não globalmente.",
      "Descreva a relação entre tópico, partição, offset e consumer group.",
      "Compare direct, topic, fanout e headers exchanges no RabbitMQ.",
      "Diferencie quorum queue, classic queue e stream.",
      "Explique por que AMQP 0-9-1 e AMQP 1.0 não devem ser tratados como a mesma coisa.",
      "Descreva o papel de JMSContext, Destination, Producer e Consumer.",
      "Projete retry e DLQ para um consumidor que chama um serviço externo.",
      "Liste métricas para diagnosticar lag alto no Kafka e unacked alto no RabbitMQ.",
      "Proponha uma estratégia de replay que não repita efeitos externos perigosos."
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
    "caption": "Tabela 9 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Acknowledgement",
        "Confirmação do consumidor ao broker sobre o processamento de uma entrega."
      ],
      [
        "Binding",
        "Regra que conecta exchange a fila, stream ou outra exchange no RabbitMQ."
      ],
      [
        "Broker",
        "Intermediário que recebe, armazena, roteia e entrega mensagens."
      ],
      [
        "Consumer group",
        "Conjunto de consumidores que divide partições de um tópico Kafka."
      ],
      [
        "Dead Letter Queue",
        "Destino para mensagens que não puderam ser processadas normalmente."
      ],
      [
        "Delivery semantics",
        "Garantia observada como at-most-once, at-least-once ou exatamente uma vez em contexto específico."
      ],
      [
        "Exchange",
        "Entidade RabbitMQ que roteia publicações conforme tipo e bindings."
      ],
      [
        "Idempotência",
        "Propriedade de repetir uma operação sem alterar o resultado final além da primeira execução."
      ],
      [
        "JMSContext",
        "Interface principal da API simplificada Jakarta Messaging."
      ],
      [
        "KRaft",
        "Modo de metadata e quorum de controladores do Kafka."
      ],
      [
        "Offset",
        "Posição de um registro em uma partição ou stream."
      ],
      [
        "Partition",
        "Subdivisão ordenada e escalável de um tópico Kafka."
      ],
      [
        "Prefetch",
        "Limite de mensagens não confirmadas entregues a um consumidor RabbitMQ."
      ],
      [
        "Publisher confirm",
        "Confirmação do broker ao produtor sobre a publicação."
      ],
      [
        "Quorum queue",
        "Fila replicada do RabbitMQ orientada a segurança de dados."
      ],
      [
        "Settlement",
        "Acordo sobre o estado final de uma delivery em AMQP 1.0."
      ],
      [
        "Tombstone",
        "Registro com valor nulo usado para remoção em logs compactados."
      ],
      [
        "Virtual host",
        "Namespace e fronteira de permissões no RabbitMQ."
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
      "Apache Software Foundation. Apache Kafka Documentation - conceitos, design, operações, Connect e Streams.",
      "RabbitMQ Documentation - queues, exchanges, consumers, publisher confirms, quorum queues, streams, TTL e dead lettering.",
      "OASIS. Advanced Message Queuing Protocol (AMQP) Version 1.0.",
      "Jakarta EE. Jakarta Messaging 3.1 Specification and API Documentation.",
      "Enterprise Integration Patterns - Message Channel, Competing Consumers, Publish-Subscribe, Dead Letter Channel e Request-Reply.",
      "CloudEvents Specification - envelope padronizado para eventos.",
      "OpenTelemetry Specification - propagação de contexto em mensageria.",
      "OWASP e recomendações corporativas de segurança para brokers, credenciais e dados persistidos."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Versões de Kafka, RabbitMQ, bibliotecas e providers JMS evoluem. Antes de adotar configurações, valide a documentação oficial da versão implantada, especialmente para KRaft, consumer groups, quorum queues, streams, AMQP 1.0 e integração transacional."
  }
];
