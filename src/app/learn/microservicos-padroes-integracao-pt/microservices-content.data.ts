import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MICROSERVICES_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Microserviços: autonomia local com coordenação explícita"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/pt/overview.svg",
    "alt": "Canal integrando domínios de pedidos, pagamentos e estoque com dados próprios",
    "caption": "Figura de abertura - A autonomia dos serviços depende de fronteiras claras e integração governada."
  },
  {
    "kind": "subhead",
    "text": "Integração madura"
  },
  {
    "kind": "paragraph",
    "text": "Contratos, consistência, idempotência, observabilidade e ownership são tão importantes quanto a divisão dos serviços."
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
    "text": "Microserviços são frequentemente descritos como aplicações pequenas que se comunicam por APIs. Essa definição é insuficiente. A arquitetura de microserviços é, antes de tudo, uma forma de organizar sistemas e equipes em torno de capacidades de negócio, autonomia de evolução e fronteiras explícitas de responsabilidade. A divisão técnica só produz benefício quando acompanha ownership de dados, contratos, operação e ciclo de vida."
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação monolítica pode possuir módulos bem definidos, baixa dependência e excelente capacidade de evolução. Um conjunto de serviços distribuídos pode, ao contrário, formar um monólito distribuído: cada alteração exige coordenação entre várias equipes, chamadas síncronas se encadeiam, bancos são compartilhados e uma falha local derruba a jornada inteira. Por isso, microserviços não devem ser adotados como objetivo em si, mas como resposta a necessidades concretas de escala organizacional, isolamento e velocidade de mudança."
  },
  {
    "kind": "paragraph",
    "text": "A integração é o ponto em que a autonomia encontra a realidade distribuída. Serviços precisam trocar comandos, consultas e eventos; coordenar processos que atravessam domínios; lidar com mensagens duplicadas e fora de ordem; manter consistência sem uma transação global; aplicar timeouts e retries sem multiplicar carga; e produzir evidências operacionais suficientes para investigar falhas. Padrões como Saga, Transactional Outbox, Idempotent Consumer, API Composition, CQRS e Event Sourcing existem para tornar essas decisões explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo apresenta os fundamentos de decomposição e os principais padrões de integração. O foco não é recomendar uma arquitetura única, mas fornecer um modelo mental para avaliar trade-offs. Cada padrão resolve um problema específico e introduz novos custos. A maturidade está em reconhecer essas trocas, medir o comportamento real e evitar complexidade distribuída quando um desenho mais simples seria suficiente."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada padrão, identifique o problema que ele resolve, as garantias que realmente oferece, os novos estados de falha que introduz e quais evidências operacionais serão necessárias. Nunca adote um padrão apenas porque ele aparece em diagramas de referência."
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
      "Explicar microserviços como arquitetura sociotécnica, e não apenas como divisão de código.",
      "Diferenciar capacidade de negócio, subdomínio, bounded context, serviço e componente.",
      "Avaliar critérios de decomposição, coesão, acoplamento e ownership de dados.",
      "Comparar comunicação síncrona, assíncrona, comandos, consultas e eventos.",
      "Compreender consistência local, consistência eventual e limites de transações distribuídas.",
      "Aplicar Saga por coreografia e orquestração com compensações de negócio.",
      "Explicar Transactional Outbox, CDC, Inbox e Idempotent Consumer.",
      "Distinguir API Composition, CQRS, materialized views e Event Sourcing.",
      "Projetar contratos, idempotência, retries, deadlines e prevenção de falhas em cascata.",
      "Planejar migração de legados, observabilidade e troubleshooting em jornadas distribuídas."
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
      "30.1 Microserviços como arquitetura sociotécnica",
      "30.2 Decomposição por domínio e bounded contexts",
      "30.3 Tamanho, coesão, acoplamento e autonomia",
      "30.4 Dados por serviço e fronteiras transacionais",
      "30.5 Comunicação síncrona e assíncrona",
      "30.6 Contratos, comandos, consultas e eventos",
      "30.7 Consistência distribuída e transações",
      "30.8 Saga: coreografia e orquestração",
      "30.9 Transactional Outbox, CDC e Inbox",
      "30.10 Idempotência, ordenação e entrega",
      "30.11 API Composition e agregação",
      "30.12 CQRS e materialized views",
      "30.13 Event Sourcing",
      "30.14 Resiliência e prevenção de cascatas",
      "30.15 Service discovery, gateway e mesh",
      "30.16 Observabilidade e correlação",
      "30.17 Segurança entre serviços",
      "30.18 Migração de monólitos e Strangler Fig",
      "30.19 Testes, governança e plataforma interna",
      "30.20 Antipadrões, troubleshooting e estudos de caso",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.1 Microserviços como arquitetura sociotécnica",
    "id": "30-1-microservicos-como-arquitetura-sociotecnica"
  },
  {
    "kind": "paragraph",
    "text": "Uma arquitetura de microserviços organiza um sistema como um conjunto de serviços implantáveis de forma independente, alinhados a capacidades de negócio e mantidos por equipes que assumem responsabilidade de ponta a ponta. Essa responsabilidade inclui código, dados, segurança, observabilidade, disponibilidade e evolução do contrato. A independência de deploy é um indicador importante, mas não é absoluta: mudanças de plataforma, contratos incompatíveis e eventos compartilhados ainda exigem coordenação governada."
  },
  {
    "kind": "paragraph",
    "text": "O termo sociotécnico é importante porque a estrutura do software reflete a estrutura de comunicação das equipes. Se cinco equipes precisam alterar simultaneamente o mesmo serviço, a fronteira técnica provavelmente não corresponde ao ownership real. Se uma única equipe mantém dezenas de serviços estreitamente acoplados, a divisão pode gerar custo sem autonomia. A arquitetura precisa alinhar domínio, organização e operação."
  },
  {
    "kind": "paragraph",
    "text": "Microserviços também alteram o modelo de falha. Chamadas que antes eram funções locais tornam-se operações de rede, sujeitas a latência, perda, timeout, duplicação e indisponibilidade parcial. O sistema deve aceitar que uma jornada pode estar em estados intermediários. A complexidade não desaparece; ela se move para contratos, integração, consistência e observabilidade."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O objetivo não é maximizar a quantidade de serviços, mas minimizar o custo de mudança dentro de fronteiras coerentes. Um serviço só é realmente autônomo quando sua equipe controla comportamento, dados, deploy e operação sem depender continuamente de alterações coordenadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.2 Decomposição por domínio e bounded contexts",
    "id": "30-2-decomposicao-por-dominio-e-bounded-contexts"
  },
  {
    "kind": "paragraph",
    "text": "A decomposição por capacidade de negócio procura separar aquilo que a organização faz, e não apenas camadas técnicas. Pagamentos, cadastro, crédito, fraude e notificações possuem regras, vocabulário, dados e ritmos de mudança diferentes. Domain-Driven Design ajuda a reconhecer subdomínios e bounded contexts, dentro dos quais termos têm significado consistente."
  },
  {
    "kind": "paragraph",
    "text": "Um bounded context não é automaticamente um microserviço. Ele pode ser implementado inicialmente como um módulo e, conforme necessidade, dividido em serviços. A relação importante é semântica: cada contexto possui modelo próprio e traduz conceitos ao integrar-se com outros. Um Cliente no contexto de relacionamento pode não ter o mesmo conjunto de atributos ou invariantes de um Tomador no contexto de crédito."
  },
  {
    "kind": "paragraph",
    "text": "A fronteira deve reduzir alterações que atravessam contextos. Quando uma regra de negócio exige mudanças frequentes em dois serviços, isso pode indicar divisão incorreta ou contrato inadequado. Event storming, análise de jornadas, matriz de dependências e histórico de mudanças ajudam a descobrir fronteiras melhores do que a separação por tabelas ou entidades isoladas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/pt/figure-01-bounded-contexts.svg",
    "alt": "Decomposição de microserviços por capacidades de negócio e bounded contexts",
    "caption": "Figura 1 - A decomposição acompanha linguagem e regras do domínio, não apenas entidades do banco."
  },
  {
    "kind": "paragraph",
    "text": "Não existe quantidade ideal de linhas, endpoints ou pessoas para definir um microserviço. Pequeno é uma consequência de uma responsabilidade coesa, não uma meta numérica. Um serviço pode encapsular uma capacidade complexa e ainda ser adequado. Dividir demais aumenta tráfego, contratos, deploys, observabilidade e estados de falha."
  },
  {
    "kind": "paragraph",
    "text": "Coesão mede o quanto as responsabilidades internas mudam juntas. Acoplamento mede o quanto uma mudança exige conhecimento ou alteração externa. O desenho busca alta coesão dentro do serviço e acoplamento reduzido entre serviços. Acoplamento temporal ocorre quando dois componentes precisam estar disponíveis ao mesmo tempo; acoplamento de dados surge quando compartilham schema ou interpretação interna; acoplamento de sequência aparece quando chamadas devem ocorrer em ordem rígida."
  },
  {
    "kind": "paragraph",
    "text": "Autonomia não significa ausência de padrões. Serviços podem compartilhar plataforma, observabilidade, bibliotecas de segurança e convenções de contrato. O cuidado é não criar uma biblioteca de domínio comum que force todos a evoluir no mesmo ritmo. Compartilhe capacidades técnicas estáveis e preserve decisões de negócio dentro dos contextos responsáveis."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - A qualidade da fronteira é observada pelo comportamento das mudanças.",
    "headers": [
      "Dimensão",
      "Sinal saudável",
      "Sinal de alerta"
    ],
    "rows": [
      [
        "Coesão",
        "Mudanças relacionadas permanecem no mesmo serviço.",
        "Uma funcionalidade simples altera muitos serviços."
      ],
      [
        "Dados",
        "Ownership claro e contratos de acesso.",
        "Escrita direta no banco de outro domínio."
      ],
      [
        "Deploy",
        "Versões podem ser implantadas de forma independente.",
        "Release train obrigatório para toda mudança."
      ],
      [
        "Operação",
        "Equipe observa e suporta sua capacidade.",
        "Responsabilidade fragmentada entre várias áreas."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "O princípio database per service estabelece que um serviço controla seus dados e que outros componentes acessam essas informações por contrato, não por tabelas compartilhadas. Isso não obriga um servidor físico por serviço; o importante é o ownership lógico e a impossibilidade de alterações externas não governadas. Schemas separados, permissões distintas e pipelines de migração independentes ajudam a reforçar a fronteira."
  },
  {
    "kind": "paragraph",
    "text": "Compartilhar banco parece simples no início, mas permite joins e atualizações que atravessam domínios, tornando o schema um contrato implícito. Uma alteração de coluna passa a exigir coordenação ampla, e invariantes de negócio podem ser violadas por consumidores que escrevem diretamente. A autonomia do serviço fica apenas aparente."
  },
  {
    "kind": "paragraph",
    "text": "A consequência é que transações ACID normalmente terminam na fronteira do serviço. Processos entre serviços precisam aceitar consistência eventual ou usar coordenação explícita. Isso não significa aceitar dados incorretos; significa modelar estados intermediários, definir invariantes locais, comunicar transições e oferecer mecanismos de reconciliação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.5 Comunicação síncrona e assíncrona",
    "id": "30-5-comunicacao-sincrona-e-assincrona"
  },
  {
    "kind": "paragraph",
    "text": "Na comunicação síncrona, o consumidor envia uma requisição e aguarda resposta. HTTP/REST e gRPC são exemplos frequentes. O modelo é simples para operações que exigem resultado imediato, porém cria acoplamento temporal: consumidor, rede, intermediários e provedor precisam estar disponíveis dentro do mesmo prazo. Cadeias longas multiplicam latência e probabilidade de falha."
  },
  {
    "kind": "paragraph",
    "text": "Na comunicação assíncrona, o produtor publica uma mensagem sem depender da conclusão imediata do consumidor. Brokers e logs distribuídos desacoplam disponibilidade e permitem absorver picos. O custo é maior complexidade de estado: a operação pode estar aceita, mas ainda não processada; mensagens podem ser repetidas; consumidores podem atrasar; e o usuário precisa de um mecanismo para consultar progresso ou receber notificação."
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve seguir a semântica do negócio. Uma consulta de saldo pode exigir resposta imediata. O envio de uma notificação pode ser assíncrono. Um pagamento pode iniciar de forma síncrona, retornar um identificador e concluir por eventos. Sistemas maduros combinam modelos em vez de impor um único estilo a todas as jornadas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/pt/figure-02-sync-async.svg",
    "alt": "Comparação entre integração síncrona e assíncrona",
    "caption": "Figura 2 - Síncrono acopla disponibilidade; assíncrono introduz estados e processamento posterior."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - O modelo de comunicação altera garantias e experiência operacional.",
    "headers": [
      "Critério",
      "Síncrono",
      "Assíncrono"
    ],
    "rows": [
      [
        "Resultado",
        "Disponível na resposta.",
        "Concluído posteriormente."
      ],
      [
        "Acoplamento temporal",
        "Maior.",
        "Menor entre produtor e consumidor."
      ],
      [
        "Falha",
        "Visível imediatamente ao chamador.",
        "Exige retry, DLQ e reconciliação."
      ],
      [
        "Picos",
        "Pressionam o provedor diretamente.",
        "Podem ser amortecidos por fila ou log."
      ],
      [
        "Experiência",
        "Fluxo simples request/response.",
        "Status, callback, evento ou polling."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.6 Contratos, comandos, consultas e eventos",
    "id": "30-6-contratos-comandos-consultas-e-eventos"
  },
  {
    "kind": "paragraph",
    "text": "Um comando expressa intenção de alterar estado, como AutorizarPagamento. Uma consulta pede informação sem alterar o estado observável. Um evento afirma que algo relevante já ocorreu, como PagamentoAutorizado. Misturar essas semânticas produz contratos confusos. Um evento não deve ser uma ordem disfarçada para um único consumidor, e um comando não deve ser publicado como fato consumado."
  },
  {
    "kind": "paragraph",
    "text": "Eventos de domínio representam fatos relevantes dentro de um bounded context. Eventos de integração são contratos publicados para outros contextos e podem ter formato mais estável, filtrado e governado. Nem todo evento interno deve atravessar a fronteira. Publicar detalhes demais acopla consumidores à implementação."
  },
  {
    "kind": "paragraph",
    "text": "Contratos precisam definir schema, versão, identidade do produtor, chave de correlação, timestamp, semântica de repetição e política de evolução. Em comunicação síncrona, OpenAPI ou Protobuf ajudam a formalizar. Em eventos, AsyncAPI, schemas em registry e testes de compatibilidade reduzem mudanças quebradoras."
  },
  {
    "kind": "subhead",
    "text": "Envelope conceitual de evento de integração"
  },
  {
    "kind": "code",
    "text": "{\n  \"eventId\": \"0c02d9d2-...\",\n  \"eventType\": \"PagamentoAutorizado\",\n  \"occurredAt\": \"2026-07-16T11:42:00Z\",\n  \"aggregateId\": \"pag-84219\",\n  \"correlationId\": \"ord-19384\",\n  \"version\": 3,\n  \"data\": { \"valor\": 125.40, \"moeda\": \"BRL\" }\n}\n30.7 Consistência distribuída e transações"
  },
  {
    "kind": "paragraph",
    "text": "Uma transação local protege invariantes dentro de um serviço. Quando um processo atravessa vários serviços, uma transação ACID global exigiria coordenação distribuída, disponibilidade dos participantes e protocolo de commit. Em arquiteturas modernas, esse custo e acoplamento frequentemente tornam preferível a consistência eventual com compensações e reconciliação."
  },
  {
    "kind": "paragraph",
    "text": "Consistência eventual não significa ausência de regras. O sistema define quais invariantes precisam ser imediatas e quais podem convergir. Um débito não pode ultrapassar o saldo disponível dentro do serviço que controla a conta. Já a projeção analítica ou o status exibido em outro contexto pode ser atualizado alguns segundos depois."
  },
  {
    "kind": "paragraph",
    "text": "Processos distribuídos precisam modelar estados como PENDENTE, RESERVADO, AUTORIZADO, FALHOU e COMPENSADO. Esses estados tornam o progresso observável e permitem retry seguro. Esconder a espera atrás de uma transação longa ou de chamadas síncronas em cascata não elimina a distribuição; apenas a torna mais frágil."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.8 Saga: coreografia e orquestração",
    "id": "30-8-saga-coreografia-e-orquestracao"
  },
  {
    "kind": "paragraph",
    "text": "Uma Saga coordena uma sequência de transações locais. Cada etapa confirma seu próprio estado e dispara a próxima. Se uma etapa posterior falha, ações compensatórias tentam desfazer ou neutralizar efeitos anteriores. Compensação é uma operação de negócio, não um rollback técnico perfeito: cancelar uma reserva ou emitir estorno deixa registros auditáveis e pode ter regras próprias."
  },
  {
    "kind": "paragraph",
    "text": "Na coreografia, serviços reagem a eventos uns dos outros. O modelo reduz um coordenador central, mas o fluxo pode ficar difícil de visualizar quando muitos eventos formam dependências implícitas. Na orquestração, um componente mantém o estado do processo e envia comandos aos participantes. Isso melhora observabilidade e controle do fluxo, mas o orquestrador precisa permanecer focado na coordenação, sem absorver regras internas de todos os domínios."
  },
  {
    "kind": "paragraph",
    "text": "A Saga deve prever timeout, repetição, mensagens fora de ordem, compensação que também falha e intervenção manual. O estado do processo precisa ser persistido. Uma jornada financeira pode entrar em análise ou reconciliação em vez de tentar retries infinitos. O desenho correto inclui owner operacional e procedimento de recuperação."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/pt/figure-03-saga.svg",
    "alt": "Saga como sequência de transações locais e compensações",
    "caption": "Figura 3 - A Saga preserva progresso por transações locais e compensações explícitas."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A escolha depende da complexidade e da necessidade de controle do processo.",
    "headers": [
      "Modelo",
      "Vantagem",
      "Risco"
    ],
    "rows": [
      [
        "Coreografia",
        "Baixo acoplamento a um coordenador e reação natural a fatos.",
        "Fluxo emergente, difícil de rastrear e controlar."
      ],
      [
        "Orquestração",
        "Estado e sequência explícitos; melhor visibilidade operacional.",
        "Coordenador pode concentrar lógica indevida."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "O dual write ocorre quando um serviço precisa atualizar seu banco e publicar uma mensagem. Se gravar primeiro e falhar antes de publicar, o estado muda sem evento. Se publicar primeiro e falhar antes de gravar, consumidores observam um fato que não existe. Uma transação distribuída entre banco e broker poderia resolver, mas frequentemente não é desejável ou suportada."
  },
  {
    "kind": "paragraph",
    "text": "O padrão Transactional Outbox grava a alteração de negócio e um registro de evento na mesma transação local. Um relay publica os registros pendentes no broker. Esse relay pode fazer polling ou usar Change Data Capture para observar o log do banco. Após publicar, marca ou remove a entrada. Como falhas entre publicação e marcação podem gerar duplicatas, consumidores precisam ser idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "O padrão Inbox registra mensagens recebidas e seu status de processamento. Ele ajuda a deduplicar e fornece trilha operacional. Outbox e Inbox não criam entrega exatamente uma vez no sentido absoluto; elas fornecem meios para obter efeitos equivalentes uma vez quando combinadas com idempotência, chaves estáveis e transações locais."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/pt/figure-04-transactional-outbox.svg",
    "alt": "Transactional Outbox conectando serviço, banco local e broker",
    "caption": "Figura 4 - A outbox fecha a lacuna entre commit local e publicação, mas não elimina duplicatas."
  },
  {
    "kind": "paragraph",
    "text": "Uma operação idempotente pode ser repetida sem produzir efeitos adicionais além do primeiro resultado válido. Em APIs, uma idempotency key permite que retries de criação retornem o resultado da operação original. Em mensageria, o consumidor armazena eventId ou chave de negócio processada e evita repetir efeitos."
  },
  {
    "kind": "paragraph",
    "text": "At-most-once pode perder mensagens, mas evita repetição. At-least-once favorece entrega, aceitando duplicatas. Exactly-once normalmente é uma garantia limitada a fronteiras específicas do broker ou do processamento transacional; não significa que um efeito externo, como cobrança ou e-mail, jamais será repetido. A arquitetura deve explicar claramente a fronteira da garantia."
  },
  {
    "kind": "paragraph",
    "text": "Ordenação também é contextual. Brokers costumam preservar ordem apenas dentro de uma partição ou chave. Para um agregado, use chave consistente, número de versão e validação de sequência. Quando eventos chegam fora de ordem, o consumidor pode aguardar, rejeitar, reprocessar ou reconstruir a projeção. A estratégia precisa ser definida, não improvisada durante incidente."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Entrega confiável combina protocolo, persistência e semântica de negócio.",
    "headers": [
      "Problema",
      "Controle",
      "Observação"
    ],
    "rows": [
      [
        "Retry de POST",
        "Idempotency-Key + resultado persistido.",
        "A chave deve ter escopo, validade e payload associados."
      ],
      [
        "Evento duplicado",
        "Inbox ou tabela de deduplicação.",
        "A gravação deve ocorrer na mesma transação do efeito local."
      ],
      [
        "Fora de ordem",
        "Aggregate ID + version.",
        "Ordem global costuma ser cara e desnecessária."
      ],
      [
        "Poison message",
        "Tentativas limitadas + DLQ.",
        "A DLQ exige owner, alerta e reprocessamento controlado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.11 API Composition e agregação",
    "id": "30-11-api-composition-e-agregacao"
  },
  {
    "kind": "paragraph",
    "text": "Quando dados pertencem a serviços diferentes, uma tela ou relatório não pode executar join direto em seus bancos. O padrão API Composition consulta múltiplos serviços e combina as respostas. Um BFF, gateway especializado ou serviço de composição pode assumir essa função. GraphQL também pode servir como camada de composição quando o schema e os resolvers são governados."
  },
  {
    "kind": "paragraph",
    "text": "A composição síncrona herda a disponibilidade e latência de todas as dependências. É necessário definir deadlines, respostas parciais, cache, fallback e número máximo de fan-outs. Uma página que consulta dez serviços sequencialmente tende a ser lenta e frágil. Paralelismo ajuda na latência, mas aumenta concorrência e pode pressionar backends."
  },
  {
    "kind": "paragraph",
    "text": "Quando a consulta é frequente e não exige dados estritamente atuais, uma visão materializada assíncrona pode ser melhor. Eventos atualizam um read model preparado para a jornada. A escolha entre composição em tempo real e projeção antecipada depende de frescor, custo de atualização, volume e tolerância a inconsistência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.12 CQRS e materialized views",
    "id": "30-12-cqrs-e-materialized-views"
  },
  {
    "kind": "paragraph",
    "text": "Command Query Responsibility Segregation separa modelos de escrita e leitura. O lado de comando protege invariantes e processa intenções. O lado de consulta oferece modelos otimizados para as necessidades dos consumidores. A separação pode existir apenas no código ou envolver bancos, schemas e serviços distintos."
  },
  {
    "kind": "paragraph",
    "text": "CQRS é útil quando escrita e leitura possuem modelos muito diferentes, grande assimetria de carga ou necessidades específicas de consulta. Ele não é requisito para microserviços. Em sistemas simples, separar tudo aumenta código, sincronização e operação sem benefício proporcional."
  },
  {
    "kind": "paragraph",
    "text": "Materialized views são projeções atualizadas por eventos. Elas aceitam algum atraso e precisam de estratégia de reconstrução, versionamento do projetor, tratamento de eventos antigos e verificação de divergência. A origem autoritativa permanece no serviço responsável pela escrita; a projeção é um modelo derivado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.13 Event Sourcing",
    "id": "30-13-event-sourcing"
  },
  {
    "kind": "paragraph",
    "text": "Event Sourcing persiste a sequência de eventos que representam alterações de estado, em vez de gravar apenas o estado atual. O estado de um agregado é reconstruído pela aplicação desses eventos. O modelo oferece histórico completo e permite novas projeções, mas exige disciplina rigorosa de schema, invariantes e evolução."
  },
  {
    "kind": "paragraph",
    "text": "Eventos armazenados são fatos imutáveis. Corrigir um erro normalmente significa acrescentar um novo evento, não editar o passado. Snapshots podem reduzir o custo de reconstrução. Projeções são derivadas e podem ser refeitas. A lógica que interpreta eventos antigos precisa permanecer compatível ou usar upcasters e migrações controladas."
  },
  {
    "kind": "paragraph",
    "text": "Event Sourcing é frequentemente confundido com publicar eventos de integração. Um sistema pode usar outbox e eventos sem ser event sourced. Adotar Event Sourcing apenas para obter auditoria pode ser excessivo. Ele faz mais sentido quando a sequência de decisões é parte central do domínio e a capacidade de reconstrução justifica a complexidade."
  },
  {
    "kind": "subhead",
    "text": "Cuidado arquitetural"
  },
  {
    "kind": "paragraph",
    "text": "CQRS, Event Sourcing e microserviços são padrões independentes. Eles podem ser combinados, mas nenhum exige automaticamente os demais. A adoção conjunta sem necessidade cria uma plataforma difícil de desenvolver, testar e operar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.14 Resiliência e prevenção de falhas em cascata",
    "id": "30-14-resiliencia-e-prevencao-de-falhas-em-cascata"
  },
  {
    "kind": "paragraph",
    "text": "Timeouts delimitam quanto uma dependência pode consumir do orçamento da requisição. Deadlines devem ser propagados para que serviços downstream não continuem trabalhando depois que o cliente já desistiu. Retries só são seguros para operações idempotentes ou protegidas por chave. Eles precisam de backoff, jitter, limite de tentativas e orçamento global."
  },
  {
    "kind": "paragraph",
    "text": "Circuit breakers interrompem temporariamente chamadas a uma dependência com alta taxa de falha. Bulkheads isolam pools, filas ou recursos para impedir que um componente consuma toda a capacidade. Load shedding rejeita trabalho quando o sistema não consegue processá-lo dentro do SLO. Esses controles reduzem cascatas, mas configuração agressiva pode causar rejeição desnecessária."
  },
  {
    "kind": "paragraph",
    "text": "Retries em várias camadas podem multiplicar chamadas. Se cliente, gateway, mesh e SDK tentarem três vezes, uma única operação pode produzir dezenas de tentativas. A política deve ter owner, considerar idempotência e usar telemetria. Resiliência não é esconder falhas indefinidamente; é preservar capacidade e produzir comportamento previsível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.15 Service discovery, API Gateway e service mesh",
    "id": "30-15-service-discovery-api-gateway-e-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Service discovery resolve nomes lógicos para instâncias disponíveis. Em Kubernetes, Services e DNS oferecem essa abstração. Em outros ambientes, registries ou balanceadores cumprem papel semelhante. O cliente não deve depender de IPs efêmeros. Health, readiness e draining precisam ser coerentes para evitar envio a instâncias incapazes de servir."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways protegem e governam tráfego north-south, oferecendo exposição, autenticação, quotas e mediação. Service meshes aplicam identidade, mTLS, roteamento e observabilidade ao tráfego east-west. Os limites não são absolutos, mas a duplicação de retries, rate limits e transformação entre camadas deve ser evitada."
  },
  {
    "kind": "paragraph",
    "text": "A integração precisa preservar contexto: correlation ID, trace context, identidade do usuário quando necessária, identidade do workload e deadline. Propagar todos os headers sem allowlist também é perigoso. Cada salto deve definir quais atributos são confiáveis e quais precisam ser removidos ou reconstruídos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.16 Observabilidade e correlação distribuída",
    "id": "30-16-observabilidade-e-correlacao-distribuida"
  },
  {
    "kind": "paragraph",
    "text": "Em uma jornada distribuída, um erro de negócio pode atravessar APIs, filas, consumidores e compensações. Logs isolados por serviço não são suficientes. Trace IDs, correlation IDs, causation IDs, event IDs e aggregate IDs precisam ser usados de forma consistente para reconstruir a história."
  },
  {
    "kind": "paragraph",
    "text": "Métricas devem combinar sinais técnicos e de negócio: latência, erro, saturação, backlog, idade da mensagem, taxa de retry, DLQ, sagas pendentes, compensações, divergência de projeção e tempo para conclusão da jornada. Uma fila vazia não prova que o processo está saudável se mensagens foram descartadas ou redirecionadas incorretamente."
  },
  {
    "kind": "paragraph",
    "text": "Tracing síncrono segue o contexto entre chamadas. Em assíncrono, o produtor injeta contexto na mensagem e o consumidor cria um novo span relacionado. A retenção e a cardinalidade precisam ser controladas. Payloads e dados pessoais não devem ser copiados integralmente para logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.17 Segurança entre serviços",
    "id": "30-17-seguranca-entre-servicos"
  },
  {
    "kind": "paragraph",
    "text": "A segurança deve distinguir identidade do usuário, da aplicação cliente e do workload que executa a chamada. mTLS autentica peers de transporte, mas não substitui autorização de negócio. Tokens podem transportar delegação, enquanto identidades de workload protegem comunicação interna. O serviço precisa validar audience, issuer, escopos e contexto esperado."
  },
  {
    "kind": "paragraph",
    "text": "Eventos também exigem controle. Tópicos, filas e schemas possuem políticas de produção e consumo. Um consumidor comprometido não deve ler todos os domínios. Dados sensíveis precisam de minimização, criptografia e retenção adequada. Chaves e secrets não devem circular em payloads ou headers de correlação."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust aplicado a microserviços implica autenticar cada relação, autorizar pelo menor privilégio e observar comportamento. Confiar em tudo que está na rede interna perpetua movimento lateral. Ao mesmo tempo, políticas excessivamente centralizadas podem bloquear autonomia; a plataforma deve oferecer padrões seguros e automação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.18 Migração de monólitos e Strangler Fig",
    "id": "30-18-migracao-de-monolitos-e-strangler-fig"
  },
  {
    "kind": "paragraph",
    "text": "Migrar um monólito por reescrita completa concentra risco e adia valor. O padrão Strangler Fig introduz uma camada de roteamento e substitui capacidades gradualmente. Novas funcionalidades podem nascer fora do monólito, enquanto funcionalidades existentes são extraídas por fatias verticais de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Antes de extrair, é útil modularizar internamente, mapear dependências e estabelecer testes. A extração deve incluir dados, operação e ownership, não apenas endpoints. Change Data Capture, anti-corruption layers e sincronização temporária podem apoiar transição, mas precisam de prazo para serem removidos."
  },
  {
    "kind": "paragraph",
    "text": "Uma etapa de migração bem-sucedida reduz acoplamento líquido. Se o novo serviço continua lendo e escrevendo tabelas do monólito, depende do mesmo release e não possui observabilidade própria, houve apenas distribuição física. Critérios de saída devem incluir domínio, dados, deploy, operação e contratos independentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.19 Testes, governança e plataforma interna",
    "id": "30-19-testes-governanca-e-plataforma-interna"
  },
  {
    "kind": "paragraph",
    "text": "Testes unitários continuam importantes, mas não cobrem contratos distribuídos. Consumer-driven contract tests verificam expectativas de consumidores sem exigir todo o ambiente. Testes de integração validam broker, banco e adapters. Testes end-to-end devem cobrir poucas jornadas críticas, porque são caros e frágeis."
  },
  {
    "kind": "paragraph",
    "text": "Em eventos, testes de schema e compatibilidade precisam observar direção dos dados. Um campo adicionado pode quebrar consumidores estritos. Testes de replay verificam se novos projetores processam eventos históricos. Chaos engineering e testes de falha avaliam timeout, retry, indisponibilidade parcial e recuperação."
  },
  {
    "kind": "paragraph",
    "text": "Uma Internal Developer Platform pode oferecer templates, pipelines, observabilidade, identidade, secrets, políticas e catálogos. O objetivo é reduzir trabalho indiferenciado, não impor um framework rígido. Golden paths devem ser fáceis de usar e permitir exceções governadas quando o domínio exigir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.20 Antipadrões comuns",
    "id": "30-20-antipadroes-comuns"
  },
  {
    "kind": "paragraph",
    "text": "O monólito distribuído ocorre quando serviços precisam ser implantados juntos, compartilham banco e chamam uns aos outros em sequência para qualquer operação. A complexidade de rede é adicionada sem autonomia. Outro antipadrão é o nanosserviço, pequeno demais para justificar contrato, deploy e operação próprios."
  },
  {
    "kind": "paragraph",
    "text": "Chatty services trocam muitas mensagens pequenas para montar uma operação. Shared libraries de domínio espalham regras e criam upgrade coordenado. Eventos genéricos com payloads gigantes tornam todos os consumidores dependentes do modelo interno. Uma fila usada como banco permanente sem estratégia de replay e retenção também gera risco."
  },
  {
    "kind": "paragraph",
    "text": "Centralizar toda lógica em gateway, ESB ou orquestrador recria um monólito de integração. A plataforma deve aplicar preocupações transversais, enquanto regras de negócio permanecem nos domínios. A correção de um antipadrão começa medindo dependências e frequência de mudanças, não apenas redesenhando diagramas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.21 Troubleshooting orientado pela jornada",
    "id": "30-21-troubleshooting-orientado-pela-jornada"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico começa com a jornada e seu identificador. Determine qual comando iniciou o processo, quais serviços participaram, quais eventos foram publicados, quais estados locais foram confirmados e qual etapa aguarda conclusão. A ausência de uma resposta HTTP não significa que o trabalho não ocorreu; um timeout pode ter sucedido depois do commit."
  },
  {
    "kind": "paragraph",
    "text": "Em fluxos síncronos, compare deadlines, retries, status e traces por hop. Em fluxos assíncronos, verifique offset, backlog, consumer group, tentativas, DLQ, deduplicação e ordem por chave. Em sagas, examine estado do orquestrador, compensações pendentes e transações locais. O diagnóstico precisa separar falha transitória, erro de contrato e violação de regra de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Reprocessamento deve ser controlado. Reenviar uma mensagem sem entender idempotência pode duplicar cobrança ou notificação. Ferramentas operacionais precisam registrar quem reprocessou, quando, qual versão do consumidor foi usada e qual resultado ocorreu. Reconciliação é parte do produto distribuído, não uma atividade improvisada."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - O troubleshooting deve reconstruir estados e mensagens, não apenas respostas HTTP.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências"
    ],
    "rows": [
      [
        "Pedido pendente",
        "Evento não publicado, consumidor parado ou compensação aguardando.",
        "Outbox, broker, consumer lag e estado da saga."
      ],
      [
        "Cobrança duplicada",
        "Retry sem idempotência ou deduplicação falha.",
        "Idempotency key, eventId e histórico transacional."
      ],
      [
        "Projeção divergente",
        "Evento perdido, fora de ordem ou projetor incompatível.",
        "Versões, offsets, replay e aggregate version."
      ],
      [
        "Latência em cascata",
        "Fan-out, retries múltiplos ou dependency timeout.",
        "Trace, budgets, tentativas e saturação."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - Uma plataforma de comércio cria pedido, reserva estoque e autoriza pagamento. O fluxo inicial usa três chamadas síncronas encadeadas e falha em picos. A evolução adota uma Saga orquestrada, estados persistidos, outbox e compensações. A API retorna 202 com identificador de processo e oferece consulta de status."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Um serviço publica PagamentoConfirmado depois de atualizar o banco. Falhas intermitentes entre commit e publish causam pedidos presos. A implantação de Transactional Outbox e CDC fecha a lacuna. O consumidor adiciona Inbox e chave idempotente para tolerar duplicatas."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Um dashboard consulta seis serviços e apresenta alta latência. A análise mostra fan-out sequencial e dados com tolerância de alguns segundos. A equipe cria uma materialized view atualizada por eventos, reduzindo dependências no caminho crítico e mantendo processo de replay para reconstrução."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Modele uma Saga de pedido e identifique compensações. 2) Implemente uma outbox em banco relacional e simule falha após o commit. 3) Crie consumidor idempotente com eventId. 4) Compare API Composition com uma materialized view. 5) Simule mensagens fora de ordem usando aggregate version."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Microserviços organizam autonomia em torno de capacidades de negócio, dados e ownership. A quantidade de serviços não define maturidade. Fronteiras coerentes, deploy independente e responsabilidade operacional são indicadores mais importantes do que tamanho físico."
  },
  {
    "kind": "paragraph",
    "text": "A integração torna explícitos os custos da distribuição. Comunicação síncrona cria acoplamento temporal; comunicação assíncrona introduz estados, duplicatas e necessidade de reconciliação. Comandos, consultas e eventos possuem semânticas diferentes e devem ser contratados de forma clara."
  },
  {
    "kind": "paragraph",
    "text": "Saga coordena transações locais e compensações. Transactional Outbox resolve o dual write dentro da fronteira do serviço, enquanto Inbox e idempotência reduzem efeitos duplicados. CQRS, materialized views e Event Sourcing são padrões opcionais, úteis apenas quando seus benefícios justificam a complexidade."
  },
  {
    "kind": "paragraph",
    "text": "Resiliência, segurança e observabilidade precisam ser projetadas desde o início. Timeouts, retries, DLQ, tracing, correlação e ferramentas de reprocessamento fazem parte do produto. A migração gradual de legados deve reduzir acoplamento real e evitar apenas transformar um monólito em vários processos dependentes."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda mensageria com Kafka, RabbitMQ, AMQP e JMS, detalhando brokers, filas, tópicos, partições, acknowledgements, consumer groups, retenção e operação de plataformas assíncronas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura e integração",
    "id": "checklist-de-arquitetura-e-integracao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A decomposição segue capacidades de negócio e bounded contexts, não apenas tabelas ou camadas técnicas.",
      "Cada serviço possui ownership claro de dados, contrato, deploy e operação.",
      "A escolha síncrona ou assíncrona está alinhada à experiência e às garantias do negócio.",
      "Comandos, consultas e eventos são distinguidos semanticamente.",
      "Invariantes imediatas permanecem dentro de transações locais.",
      "Processos distribuídos modelam estados intermediários e reconciliação.",
      "Sagas possuem compensações, timeout, persistência e owner operacional.",
      "Dual writes usam outbox, CDC ou mecanismo equivalente.",
      "Consumidores são idempotentes e toleram duplicatas e reprocessamento.",
      "Ordem é definida por agregado ou chave quando necessária.",
      "Retries têm backoff, jitter, budget e proteção contra multiplicação entre camadas.",
      "Contratos possuem schema, versão e testes de compatibilidade.",
      "Logs, métricas e traces permitem reconstruir a jornada ponta a ponta.",
      "Migrações reduzem dependências e possuem critérios de saída claros."
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
      "Explique por que microserviços são uma decisão sociotécnica.",
      "Diferencie subdomínio, bounded context, serviço e componente.",
      "Identifique sinais de um monólito distribuído.",
      "Compare comunicação síncrona e assíncrona em disponibilidade e experiência do usuário.",
      "Diferencie comando, consulta, evento de domínio e evento de integração.",
      "Modele uma Saga por coreografia e outra por orquestração para o mesmo processo.",
      "Explique o problema de dual write e como a outbox o mitiga.",
      "Descreva idempotência em uma API de criação e em um consumidor de eventos.",
      "Compare API Composition e materialized view.",
      "Explique quando CQRS e Event Sourcing não devem ser usados.",
      "Proponha uma estratégia de migração Strangler para um módulo legado.",
      "Monte um roteiro de troubleshooting para uma saga parada após pagamento."
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
    "caption": "Tabela 6 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Aggregate",
        "Conjunto de objetos protegido por uma fronteira de consistência."
      ],
      [
        "API Composition",
        "Consulta a múltiplos serviços com agregação de respostas."
      ],
      [
        "Bounded Context",
        "Fronteira em que um modelo e sua linguagem possuem significado consistente."
      ],
      [
        "CDC",
        "Change Data Capture; captura alterações a partir do log ou mecanismo do banco."
      ],
      [
        "Choreography",
        "Coordenação distribuída por reação a eventos."
      ],
      [
        "CQRS",
        "Separação entre modelos de comando e consulta."
      ],
      [
        "Event Sourcing",
        "Persistência do estado como sequência de eventos imutáveis."
      ],
      [
        "Idempotência",
        "Propriedade de repetir uma operação sem efeitos adicionais."
      ],
      [
        "Inbox",
        "Registro local de mensagens recebidas e processadas."
      ],
      [
        "Materialized View",
        "Projeção pré-calculada para leitura eficiente."
      ],
      [
        "Monólito distribuído",
        "Serviços fisicamente separados, mas fortemente acoplados."
      ],
      [
        "Orchestration",
        "Coordenação por componente que mantém estado e sequência do processo."
      ],
      [
        "Outbox",
        "Tabela ou log local usado para publicar eventos após commit de negócio."
      ],
      [
        "Saga",
        "Sequência de transações locais com ações compensatórias."
      ],
      [
        "Strangler Fig",
        "Migração gradual que substitui partes de um sistema legado."
      ],
      [
        "Transactional boundary",
        "Limite em que uma transação local protege invariantes."
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
      "Evans, Eric. Domain-Driven Design: Tackling Complexity in the Heart of Software.",
      "Fowler, Martin. Patterns of Enterprise Application Architecture e artigos sobre microservices, CQRS e Strangler Fig.",
      "Newman, Sam. Building Microservices.",
      "Richardson, Chris. Microservices Patterns.",
      "Hohpe, Gregor; Woolf, Bobby. Enterprise Integration Patterns.",
      "Kleppmann, Martin. Designing Data-Intensive Applications.",
      "Microsoft. Cloud Design Patterns: Saga, CQRS, Retry, Circuit Breaker, Competing Consumers e Materialized View.",
      "AWS Prescriptive Guidance. Transactional Outbox, Saga e padrões de decomposição.",
      "CloudEvents Specification e AsyncAPI Specification.",
      "OpenTelemetry Documentation. Context propagation e distributed tracing."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de aplicação"
  },
  {
    "kind": "paragraph",
    "text": "Padrões de integração são ferramentas de decisão, não requisitos universais. Antes de adotar Saga, CQRS, Event Sourcing, Outbox ou uma plataforma de mensageria, valide o problema real, a capacidade operacional e o caminho de recuperação em ambiente autorizado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de seleção de padrões",
    "id": "anexo-a-matriz-de-selecao-de-padroes"
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O padrão é escolhido pela necessidade e pelo custo operacional aceitável.",
    "headers": [
      "Necessidade",
      "Padrão candidato",
      "Pergunta de validação"
    ],
    "rows": [
      [
        "Coordenar processo entre serviços",
        "Saga",
        "As compensações e estados intermediários estão modelados?"
      ],
      [
        "Atualizar banco e publicar evento",
        "Transactional Outbox",
        "O consumidor tolera duplicatas e o relay é observável?"
      ],
      [
        "Consultar dados de vários domínios",
        "API Composition",
        "A latência e a disponibilidade do fan-out são aceitáveis?"
      ],
      [
        "Leitura com modelo muito diferente",
        "CQRS / Materialized View",
        "O atraso e a reconstrução da projeção são suportáveis?"
      ],
      [
        "Preservar sequência completa de decisões",
        "Event Sourcing",
        "O domínio realmente precisa de replay e histórico imutável?"
      ],
      [
        "Migrar funcionalidade legada gradualmente",
        "Strangler Fig",
        "A nova fronteira elimina dependências antigas de dados e deploy?"
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Qual capacidade de negócio é dona da decisão e dos dados?",
      "Quais invariantes precisam ser imediatas e quais podem convergir?",
      "O consumidor precisa de resposta imediata ou pode acompanhar um processo?",
      "Como duplicatas, mensagens fora de ordem e retries serão tratados?",
      "Qual é o estado observável da jornada durante falhas parciais?",
      "Quem reprocessa, reconcilia e autoriza intervenções manuais?",
      "Como contratos e schemas evoluem sem coordenar todos os consumidores?",
      "Quais logs, métricas e traces provam que o processo terminou corretamente?",
      "Como o desenho pode ser simplificado ou revertido se o custo superar o benefício?"
    ]
  }
];
