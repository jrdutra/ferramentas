import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const AXWAY_GATEWAY_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Da configuração em Policy Studio ao processamento distribuído no runtime"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/overview.svg",
    "alt": "Plataforma Axway com design, administração, execução, persistência e operação",
    "caption": "Figura de abertura - A plataforma combina ferramentas de design, administração centralizada, runtime de políticas e componentes de persistência e observabilidade."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O Axway API Gateway combina topologia administrativa, configuração versionável e runtime de políticas de alta performance."
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
    "text": "O capítulo anterior estudou políticas de gateway como unidades executáveis de segurança, transformação, roteamento e observabilidade. Agora o foco passa para uma implementação corporativa concreta: o Axway API Gateway. O produto materializa esses conceitos por meio de domínios administrativos, grupos, instâncias de gateway, Node Managers, Policy Studio, ferramentas web de operação e repositórios de dados utilizados por policies e pelo API Manager."
  },
  {
    "kind": "paragraph",
    "text": "Compreender a arquitetura exige separar três visões. A primeira é a visão de design, na qual equipes constroem policy circuits, listeners, serviços, certificados, KPS e configurações de ambiente. A segunda é a visão administrativa, na qual o domínio controla grupos, instâncias, implantações e acesso operacional. A terceira é a visão de runtime, em que uma mensagem entra por um listener, recebe contexto, percorre filtros, pode consultar repositórios, chama um backend e produz resposta, logs e métricas."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes bancários e de grande escala, o gateway raramente está sozinho. Ele costuma operar atrás de balanceadores, em zonas externas e internas, com bancos de métricas, Cassandra, serviços de identidade, HSMs, diretórios, observabilidade corporativa e backends distribuídos. Uma falha em qualquer uma dessas dependências pode aparecer ao consumidor como timeout, 502, 401, reset ou erro de policy. Por isso, o operador precisa dominar tanto a ferramenta quanto os fundamentos de rede, HTTP, TLS e identidade estudados nos capítulos anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo não pretende substituir a documentação de uma versão específica do produto. Seu objetivo é construir um modelo mental estável para arquitetura, funcionamento, implantação, alta disponibilidade, desempenho e troubleshooting. Nomes de menus e detalhes de configuração podem variar entre releases, mas os conceitos de domínio, grupos, instâncias, administração e execução de policies permanecem fundamentais."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Acompanhe cada seção distinguindo plano administrativo, runtime de tráfego e persistência. Em troubleshooting, escreva explicitamente qual componente está sendo observado: Policy Studio, Admin Node Manager, Node Manager, instância do gateway, API Manager, Cassandra, banco de métricas ou backend."
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
      "Explicar a relação entre domínio, grupos, instâncias, Node Managers e Admin Node Manager.",
      "Distinguir Policy Studio, API Gateway Manager, API Manager e Traffic Monitor.",
      "Descrever como configurações são modeladas, validadas, implantadas e ativadas no runtime.",
      "Explicar listeners, serviços, policy circuits, filtros e message context.",
      "Relacionar API Manager ao API Gateway sem confundir os dois produtos.",
      "Compreender o papel de KPS, Cassandra, bancos de métricas e arquivos de configuração.",
      "Projetar alta disponibilidade, escalabilidade horizontal, multi-zona e múltiplos datacenters.",
      "Aplicar TLS, mTLS, OAuth, API keys, certificados e HSMs no contexto do produto.",
      "Interpretar logs, métricas, Traffic Monitor e traces para diagnóstico.",
      "Planejar desempenho, capacity, implantação em containers e hardening operacional."
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
      "23.1 Posicionamento do produto e componentes principais",
      "23.2 Domínio, grupos e instâncias",
      "23.3 Admin Node Manager e Node Managers",
      "23.4 Policy Studio e modelo de configuração",
      "23.5 Runtime: listeners, services, circuits e filtros",
      "23.6 Message context e fluxo de execução",
      "23.7 API Manager sobre o API Gateway",
      "23.8 KPS, Cassandra e bancos de métricas",
      "23.9 Implantação, promoção e rollback",
      "23.10 Alta disponibilidade e escalabilidade",
      "23.11 Topologias de zona e múltiplos datacenters",
      "23.12 TLS, mTLS, PKI e criptografia",
      "23.13 Autenticação, OAuth e API keys",
      "23.14 Roteamento, conexão com backends e resiliência",
      "23.15 Observabilidade e Traffic Monitor",
      "23.16 Performance e capacidade",
      "23.17 Containers e OpenShift",
      "23.18 Segurança administrativa e hardening",
      "23.19 Troubleshooting e estudos de caso",
      "Resumo, checklist, laboratórios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.1 Posicionamento do produto e componentes principais",
    "id": "23-1-posicionamento-do-produto-e-componentes-principais"
  },
  {
    "kind": "paragraph",
    "text": "O Axway API Gateway é um runtime de mediação e segurança para tráfego de APIs e serviços. Ele recebe mensagens em listeners configurados, interpreta protocolos suportados, executa cadeias de filtros e encaminha chamadas para destinos. O produto pode operar como reverse proxy, enforcement point de segurança, transformador de mensagens, roteador e ponto de observabilidade. Sua capacidade não está concentrada em um único executável: ela é organizada por ferramentas de design, administração, runtime e persistência."
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio é a principal ferramenta de desenvolvimento e configuração. API Gateway Manager é a interface web para administrar topologia, acompanhar instâncias, logs e tráfego. O Admin Node Manager centraliza operações de gerenciamento do domínio, enquanto Node Managers administram componentes nos hosts e grupos correspondentes. As instâncias do API Gateway executam o tráfego de negócio. API Manager acrescenta capacidades de publicação, virtualização, aplicações, consumidores, chaves, portal e ciclo de vida sobre o runtime do gateway."
  },
  {
    "kind": "paragraph",
    "text": "Essa separação permite evoluir policies sem acoplar o tráfego ao console administrativo. Também exige disciplina: portas administrativas devem ser segregadas, acesso deve ser protegido por RBAC, configurações devem ser versionadas e dependências externas precisam ser monitoradas. Em produção, o runtime deve continuar processando tráfego mesmo quando ferramentas de design estão desligadas; porém, alterações e operações administrativas dependem da saúde do domínio de gerenciamento."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Componentes com funções diferentes dentro da plataforma.",
    "headers": [
      "Componente",
      "Responsabilidade principal",
      "Pergunta operacional"
    ],
    "rows": [
      [
        "Policy Studio",
        "Desenvolver e configurar policies, listeners, certificados e ambiente.",
        "Qual configuração foi criada e validada?"
      ],
      [
        "Admin Node Manager",
        "Administração central do domínio.",
        "O plano administrativo está disponível?"
      ],
      [
        "Node Manager",
        "Gerenciar instâncias e componentes no host ou grupo.",
        "O nó recebe e aplica operações?"
      ],
      [
        "API Gateway instance",
        "Executar tráfego e policy circuits.",
        "A requisição chegou ao runtime?"
      ],
      [
        "API Gateway Manager",
        "Monitorar topologia, logs, métricas e tráfego.",
        "Qual evidência o runtime produziu?"
      ],
      [
        "API Manager",
        "Gerenciar APIs, consumidores e publicação.",
        "Como a API foi virtualizada e exposta?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.2 Domínio, grupos e instâncias",
    "id": "23-2-dominio-grupos-e-instancias"
  },
  {
    "kind": "paragraph",
    "text": "Um domínio do API Gateway é a fronteira administrativa que reúne grupos e instâncias sob uma estrutura comum de gerenciamento. O domínio possui um Admin Node Manager e pode conter múltiplos grupos. Um grupo representa uma unidade lógica de implantação e administração, frequentemente alinhada a função, zona, ambiente ou conjunto de instâncias. Dentro de cada grupo, instâncias do gateway executam configurações e processam tráfego."
  },
  {
    "kind": "paragraph",
    "text": "A organização em grupos evita tratar cada instância como configuração isolada. Quando uma configuração é implantada em um grupo, as instâncias daquele grupo devem operar de forma coerente. Isso é essencial em clusters atrás de um balanceador: qualquer nó elegível precisa reconhecer os mesmos listeners, certificados, políticas, rotas e referências de ambiente, salvo diferenças explicitamente parametrizadas."
  },
  {
    "kind": "paragraph",
    "text": "Domínio não deve ser confundido com domínio DNS ou domínio de negócio. Trata-se de uma unidade do produto. Também não se deve supor que todos os grupos de um domínio recebam a mesma configuração. É possível organizar grupos externos, internos, administrativos ou especializados, com responsabilidades e exposições distintas. A escolha influencia blast radius, governança e processo de promoção."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/figure-01-domain-topology.svg",
    "alt": "Domínio Axway com Admin Node Manager, grupos, Node Managers e instâncias",
    "caption": "Figura 1 - O domínio organiza administração central, grupos, Node Managers e instâncias de runtime."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "Grupo é unidade lógica de implantação; instância é processo de execução; Node Manager administra componentes; Admin Node Manager coordena o domínio. Confundir esses níveis leva a implantações no alvo errado e diagnósticos imprecisos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.3 Admin Node Manager e Node Managers",
    "id": "23-3-admin-node-manager-e-node-managers"
  },
  {
    "kind": "paragraph",
    "text": "O Admin Node Manager, frequentemente abreviado como ANM, é o servidor administrativo central do domínio. Ferramentas como Policy Studio e API Gateway Manager conectam-se ao plano administrativo por ele. O ANM coordena operações de topologia, implantação e gerenciamento, e por isso deve ser protegido como componente crítico. Sua indisponibilidade pode impedir mudanças e certas operações administrativas, mesmo que instâncias de gateway continuem atendendo tráfego com a configuração já ativa."
  },
  {
    "kind": "paragraph",
    "text": "Node Managers executam funções de gerenciamento nos hosts ou grupos e se comunicam com o Admin Node Manager. A separação permite que o ANM mantenha visão central enquanto operações locais são realizadas pelos Node Managers. Em topologias grandes, a saúde dessa comunicação é tão importante quanto a saúde das instâncias do gateway. Problemas de certificado, porta, DNS, firewall ou versão podem impedir administração sem afetar imediatamente o tráfego de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade administrativa requer planejamento específico. Não basta colocar o listener da API atrás de um load balancer. O canal de gerenciamento usa portas e fluxos próprios e precisa de estratégia de HA, backup, recuperação e segregação. Acesso ao ANM deve ser restrito a redes administrativas, contas com menor privilégio e autenticação forte. Logs administrativos precisam ser preservados para auditoria."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Disponibilidade de gestão e disponibilidade de tráfego são dimensões distintas.",
    "headers": [
      "Falha observada",
      "Tráfego de negócio",
      "Administração",
      "Hipótese"
    ],
    "rows": [
      [
        "ANM indisponível",
        "Pode continuar com config ativa.",
        "Deploy e topologia podem falhar.",
        "Falha no plano administrativo."
      ],
      [
        "Node Manager isolado",
        "Instância pode seguir ativa.",
        "Operações locais não chegam.",
        "Rede, certificado ou processo local."
      ],
      [
        "Gateway instance parada",
        "Nó não atende tráfego.",
        "Pode aparecer offline.",
        "Processo, JVM, recursos ou configuração."
      ],
      [
        "Porta administrativa bloqueada",
        "APIs podem responder.",
        "Policy Studio/Manager falham.",
        "Firewall ou rota de gestão."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.4 Policy Studio e o modelo de configuração",
    "id": "23-4-policy-studio-e-o-modelo-de-configuracao"
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio oferece uma visão estruturada do projeto de gateway. Nele são configurados policy circuits, filtros, listeners, serviços, certificados, stores, alertas, KPS, recursos de ambiente e referências a sistemas externos. A ferramenta não deve ser tratada apenas como editor visual: o que ela produz é infraestrutura executável, com dependências, ordem de filtros, variáveis e efeitos colaterais que precisam de revisão e testes."
  },
  {
    "kind": "paragraph",
    "text": "Uma policy bem projetada possui entradas, saídas e responsabilidades claras. Filtros de autenticação devem estabelecer atributos previsíveis; filtros de autorização devem consumir identidade confiável; filtros de roteamento devem receber URL e timeout definidos; filtros de erro devem produzir respostas consistentes. Subcircuits reutilizáveis reduzem duplicação, mas podem ampliar o blast radius de mudanças. Por isso, reutilização precisa de versionamento e contrato."
  },
  {
    "kind": "paragraph",
    "text": "Configuração e dados de ambiente devem ser separados sempre que possível. URLs de backend, aliases de certificado, credenciais, nomes de hosts, timeouts e parâmetros por ambiente não devem exigir edição manual da lógica central. Essa separação facilita promover o mesmo artefato entre desenvolvimento, homologação e produção, reduzindo drift e risco humano."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - circuito de policy"
  },
  {
    "kind": "paragraph",
    "text": "# Estrutura conceitual de uma policy Início -> Correlation ID -> Validação de canal e método -> Autenticação -> Autorização -> Rate limit / quota -> Transformação controlada -> Roteamento ao backend -> Normalização da resposta -> Auditoria e métricas -> Fim"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.5 Runtime: listeners, services, circuits e filtros",
    "id": "23-5-runtime-listeners-services-circuits-e-filtros"
  },
  {
    "kind": "paragraph",
    "text": "No runtime, o listener é o ponto de entrada associado a endereço, porta, protocolo e parâmetros TLS. Quando uma conexão chega, o gateway negocia transporte e segurança, identifica o serviço aplicável e cria o contexto de mensagem. O serviço selecionado direciona a execução para um policy circuit. O circuito é composto por filtros conectados segundo caminhos de sucesso, falha e desvios explícitos."
  },
  {
    "kind": "paragraph",
    "text": "Filtros são unidades de processamento: validar certificado, extrair header, consultar KPS, chamar serviço, verificar JWT, transformar XML/JSON, registrar log ou definir uma mensagem. Cada filtro lê e escreve atributos do message context. O comportamento final depende da ordem e dos caminhos. Um filtro aparentemente simples pode consumir body, bloquear thread, acessar rede ou produzir resposta, alterando performance e semântica."
  },
  {
    "kind": "paragraph",
    "text": "Circuitos podem chamar subcircuits e compartilhar lógica. Essa modularidade ajuda a padronizar autenticação, auditoria e erro. Entretanto, dependências implícitas de atributos gerados por outro circuito tornam a configuração frágil. Um subcircuit deveria documentar quais atributos exige, quais produz e como sinaliza falhas. Sem esse contrato, pequenas mudanças geram regressões difíceis de localizar."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/figure-02-runtime-request.svg",
    "alt": "Caminho de listener, service, policy circuit, routing e response no runtime",
    "caption": "Figura 2 - O runtime converte uma conexão recebida em execução de filtros, roteamento e resposta observável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.6 Message context e fluxo de execução",
    "id": "23-6-message-context-e-fluxo-de-execucao"
  },
  {
    "kind": "paragraph",
    "text": "O message context é a memória de trabalho da transação. Ele contém propriedades da requisição, conexão, autenticação, certificados, headers, corpo, destino, resposta e atributos intermediários criados por filtros. Muitas decisões no Policy Studio são expressas como seletores ou referências a atributos do contexto. Isso oferece flexibilidade, mas exige padronização de nomes e tipos."
  },
  {
    "kind": "paragraph",
    "text": "Um atributo pode existir apenas em determinado caminho. Se a autenticação falha antes de criar o sujeito, um filtro de auditoria não pode assumir que o atributo está presente. Se uma chamada é atendida por cache, atributos gerados no roteamento ao backend podem não existir. Policies robustas tratam ausência, valores vazios e tipos inesperados explicitamente."
  },
  {
    "kind": "paragraph",
    "text": "O contexto também é uma fronteira de segurança. Headers recebidos do consumidor não devem ser promovidos diretamente a identidade confiável. O gateway deve remover ou sobrescrever atributos que serão propagados ao backend. Dados sensíveis, como tokens, senhas e chaves, não devem ser incluídos em traces indiscriminadamente. O operador precisa equilibrar diagnóstico e proteção de informação."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - O contexto é poderoso, mas precisa de contrato e higiene de segurança.",
    "headers": [
      "Tipo de atributo",
      "Exemplo",
      "Cuidado"
    ],
    "rows": [
      [
        "Transporte",
        "IP, porta, TLS, certificado.",
        "NAT e proxies alteram a origem observada."
      ],
      [
        "HTTP",
        "Método, URI, headers, body.",
        "Body pode ser stream e ter limite de memória."
      ],
      [
        "Identidade",
        "subject, client_id, scopes.",
        "Somente após validação confiável."
      ],
      [
        "Roteamento",
        "URL final, timeout, pool.",
        "Não registrar segredos presentes na URL."
      ],
      [
        "Observabilidade",
        "correlation ID, tempo, status.",
        "Preservar consistência em todos os caminhos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.7 API Manager sobre o API Gateway",
    "id": "23-7-api-manager-sobre-o-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "API Manager é uma camada de gerenciamento de APIs construída sobre o runtime do API Gateway. Ele adiciona conceitos como APIs virtualizadas, aplicações consumidoras, credenciais, planos, publicação, catálogo e portal. O Gateway continua sendo o mecanismo que executa as policies e atende tráfego. Essa relação explica por que a instalação e configuração do API Manager dependem de um domínio e de instâncias de gateway disponíveis."
  },
  {
    "kind": "paragraph",
    "text": "A virtualização de uma API transforma um contrato importado ou definido em uma interface publicada no gateway. O processo associa frontend, backend, segurança, quotas, políticas e metadados de catálogo. Mudanças feitas no API Manager podem gerar ou atualizar artefatos que serão executados pelo gateway. Por isso, equipes devem evitar editar manualmente componentes gerenciados pelo API Manager sem entender como futuras sincronizações se comportam."
  },
  {
    "kind": "paragraph",
    "text": "API Manager também utiliza persistência própria, frequentemente apoiada em Cassandra para dados de aplicações, organizações, APIs e credenciais. A saúde do runtime e a saúde do plano de gerenciamento podem divergir. Uma API existente pode continuar respondendo enquanto operações de cadastro ou publicação falham por indisponibilidade de Cassandra. O diagnóstico deve separar consumo de API, gestão de API e armazenamento de dados do management plane."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Management plane e runtime cooperam, mas não são a mesma camada.",
    "headers": [
      "Objeto",
      "API Manager",
      "API Gateway runtime"
    ],
    "rows": [
      [
        "API virtualizada",
        "Define publicação, frontend e políticas.",
        "Executa listener, circuitos e roteamento."
      ],
      [
        "Application",
        "Representa consumidor e credenciais.",
        "Valida credencial durante a chamada."
      ],
      [
        "Quota/plan",
        "Configura regra de consumo.",
        "Aplica contadores e decisão."
      ],
      [
        "Portal/catalog",
        "Facilita descoberta e onboarding.",
        "Não participa de cada chamada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.8 KPS, Cassandra e bancos de métricas",
    "id": "23-8-kps-cassandra-e-bancos-de-metricas"
  },
  {
    "kind": "paragraph",
    "text": "Key Property Store, ou KPS, é uma tabela de dados consultada por policies. Ele é adequado para informações lidas com frequência e alteradas com menor frequência, como mapeamentos, parâmetros, listas e dados auxiliares. O KPS não deve ser usado como substituto genérico para um banco transacional de domínio. Consultas e índices precisam refletir os padrões de acesso reais das policies."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra é utilizada pelo API Manager e pode também sustentar dados de KPS e outros componentes conforme a configuração. Por ser distribuído, o banco oferece escalabilidade e tolerância a falhas, mas exige operação especializada: consistência, replicação, repair, compaction, espaço em disco, heap, latência e saúde do cluster influenciam diretamente o plano de gerenciamento e policies dependentes."
  },
  {
    "kind": "paragraph",
    "text": "Métricas e relatórios podem utilizar bancos relacionais suportados. Esse repositório tem perfil diferente do Cassandra e do KPS. A indisponibilidade do banco de métricas pode degradar relatórios e visibilidade sem necessariamente impedir o tráfego. Contudo, configurações de logging síncrono ou dependências mal desenhadas podem transformar observabilidade em gargalo. O objetivo é que coleta de métricas seja controlada e que a plataforma possua retenção e purga planejadas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/figure-03-data-stores.svg",
    "alt": "Gateway runtime conectado a KPS, Cassandra e banco de métricas",
    "caption": "Figura 3 - Stores diferentes atendem finalidades distintas: execução de policy, gestão e observabilidade."
  },
  {
    "kind": "subhead",
    "text": "Regra de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Não coloque em KPS ou Cassandra dados que exigem transação forte, consultas arbitrárias ou atualização por requisição sem avaliar impacto. O store deve ser escolhido a partir do padrão de consistência e acesso, não apenas porque já existe na plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.9 Implantação, promoção e rollback",
    "id": "23-9-implantacao-promocao-e-rollback"
  },
  {
    "kind": "paragraph",
    "text": "Implantar uma configuração significa transferir artefatos validados ao domínio e ativá-los nos grupos ou instâncias escolhidos. Em ambientes maduros, essa operação deve ser automatizada por pipeline, vinculada a versionamento e acompanhada de evidências. Exportar e importar manualmente configurações sem rastreabilidade aumenta drift e dificulta rollback."
  },
  {
    "kind": "paragraph",
    "text": "A promoção entre ambientes deve separar lógica e dados específicos. O mesmo projeto pode referenciar variáveis, aliases e endpoints parametrizados por ambiente. Antes do deploy, pipelines devem executar validação estática, testes de policy, verificação de certificados e compatibilidade com a versão do runtime. Depois do deploy, smoke tests precisam cobrir listeners, autenticação, rotas, erros e observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Rollback não é apenas reinstalar um arquivo anterior. Se a mudança criou estruturas em KPS, alterou certificados, mudou schema em Cassandra ou atualizou dependências externas, restaurar somente a configuração pode ser insuficiente. O plano deve descrever artefatos, dados, sequência e critérios de retorno. Em grupos com múltiplas instâncias, zero downtime requer coordenação para evitar que todas recarreguem ou parem simultaneamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/figure-04-deployment-cycle.svg",
    "alt": "Ciclo de configuração entre Policy Studio, Admin Node Manager, Node Managers e instâncias",
    "caption": "Figura 4 - O ciclo de implantação precisa ser controlado desde o design até a ativação no runtime."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.10 Alta disponibilidade e escalabilidade",
    "id": "23-10-alta-disponibilidade-e-escalabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade do tráfego é obtida executando múltiplas instâncias atrás de um balanceador ou mecanismo equivalente. Cada instância precisa ser capaz de atender a mesma API com configuração e dependências coerentes. Health checks devem distinguir processo vivo, listener ativo e prontidão real para chamar backends. Um teste superficial pode manter no pool um nó sem acesso ao KPS, Cassandra, DNS ou serviço crítico."
  },
  {
    "kind": "paragraph",
    "text": "Escalabilidade horizontal funciona melhor quando policies são stateless ou utilizam stores distribuídos apropriados. Estado local, cache não compartilhado e afinidade indevida podem produzir comportamento inconsistente. Quando alguma função exige stickiness, a razão precisa ser explícita e o impacto em failover deve ser testado. A preferência deve ser por identidade, quota e sessão independentes do nó sempre que possível."
  },
  {
    "kind": "paragraph",
    "text": "A alta disponibilidade administrativa é uma dimensão separada. O Admin Node Manager pode ser configurado com estratégia de HA, e o canal administrativo usa porta distinta do tráfego de negócio. Backup de configuração, dados, certificados e arquivos essenciais também faz parte da disponibilidade. HA sem capacidade de recuperar credenciais e configuração após desastre é incompleta."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/pt/figure-05-high-availability.svg",
    "alt": "Load balancer com múltiplos gateways e alta disponibilidade administrativa",
    "caption": "Figura 5 - O balanceamento do tráfego e a disponibilidade administrativa precisam de desenhos próprios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.11 Topologias de zona e múltiplos datacenters",
    "id": "23-11-topologias-de-zona-e-multiplos-datacenters"
  },
  {
    "kind": "paragraph",
    "text": "Organizações frequentemente separam gateways em zona externa e interna. A zona externa recebe tráfego de consumidores e aplica controles de borda; a zona interna executa mediação adicional ou acessa sistemas protegidos. A comunicação entre zonas deve ser autenticada, limitada e observável. Replicar todas as policies em ambas as camadas aumenta latência e dificulta ownership; cada zona deve possuir responsabilidade clara."
  },
  {
    "kind": "paragraph",
    "text": "Em múltiplos datacenters, o desenho precisa decidir quais componentes são locais e quais dados são replicados. Gateways de runtime podem operar próximos aos consumidores e backends, enquanto gestão, Cassandra, métricas e catálogo exigem estratégia de consistência e recuperação. Latência entre datacenters não deve ser ignorada em KPS, introspection, chamadas de policy ou bancos distribuídos."
  },
  {
    "kind": "paragraph",
    "text": "Failover entre sites precisa ser exercitado. DNS, GSLB, certificados, rotas, firewall, replicação e capacidade do site sobrevivente fazem parte do teste. Não basta confirmar que o processo sobe no segundo datacenter; é necessário provar que consumidores resolvem o endereço correto, que credenciais continuam válidas e que quotas, APIs e dados de gestão estão consistentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A topologia deve equilibrar isolamento, latência, consistência e operabilidade.",
    "headers": [
      "Topologia",
      "Vantagem",
      "Risco principal"
    ],
    "rows": [
      [
        "Single site, múltiplos nós",
        "Simplicidade e HA local.",
        "Falha do datacenter."
      ],
      [
        "External + internal groups",
        "Separação de zonas e responsabilidades.",
        "Duplicação de policies e latência."
      ],
      [
        "Active/passive multi-DC",
        "Recuperação mais simples.",
        "Capacidade ociosa e failover pouco testado."
      ],
      [
        "Active/active multi-DC",
        "Distribuição e menor RTO.",
        "Consistência, roteamento e operação complexos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.12 TLS, mTLS, PKI e criptografia",
    "id": "23-12-tls-mtls-pki-e-criptografia"
  },
  {
    "kind": "paragraph",
    "text": "Listeners HTTPS dependem de certificados de servidor, chaves privadas, suites criptográficas e truststores. O gateway pode terminar TLS do consumidor e iniciar nova conexão TLS para o backend. Esses dois trechos são independentes: certificado, versão, SNI, hostname verification, truststore e mTLS podem ser diferentes. Troubleshooting precisa indicar em qual trecho o handshake falhou."
  },
  {
    "kind": "paragraph",
    "text": "No mTLS inbound, o listener solicita certificado do cliente e valida cadeia e propriedades. A policy pode então mapear o certificado a uma identidade, mas deve preferir SAN e regras explícitas em vez de confiar apenas no CN. No outbound, o gateway pode apresentar certificado ao backend. Alias incorreto, cadeia incompleta, chave indisponível ou ausência de permissão no HSM causam falhas antes do HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes com HSM ou aceleração criptográfica, as operações de chave são delegadas ao dispositivo ou provedor. Isso aumenta proteção de chaves, mas introduz dependência de sessão, driver, rede e capacidade. A monitoração deve incluir latência e disponibilidade do módulo. Rotação de certificados precisa ser ensaiada para evitar interrupção por reload, alias ou truststore desatualizado."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Cada canal possui identidade criptográfica e cadeia de confiança próprias.",
    "headers": [
      "Trecho",
      "Gateway atua como",
      "Configurações críticas"
    ],
    "rows": [
      [
        "Cliente -> Gateway",
        "Servidor TLS.",
        "Certificado, listener, trust de cliente, suites."
      ],
      [
        "Gateway -> Backend",
        "Cliente TLS.",
        "Truststore, SNI, hostname, certificado cliente."
      ],
      [
        "Administração",
        "Servidor/cliente de gestão.",
        "Certificados administrativos e RBAC."
      ],
      [
        "HSM",
        "Consumidor de chave protegida.",
        "Provider, sessão, slot, PIN e capacidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.13 Autenticação, OAuth e API keys",
    "id": "23-13-autenticacao-oauth-e-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "O gateway oferece filtros e configurações para vários mecanismos de autenticação. API keys podem ser armazenadas ou consultadas em KPS e vinculadas a aplicações gerenciadas pelo API Manager. Tokens OAuth podem ser validados localmente, consultados por introspection ou emitidos quando o gateway atua como authorization server, conforme a arquitetura. Certificados, LDAP, Kerberos e mecanismos customizados também podem participar de policies."
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve preservar separação entre autenticação e autorização. Validar uma chave ou token estabelece cliente e sujeito; não significa que qualquer operação esteja liberada. O circuito precisa verificar scopes, roles, contrato, produto, quota, tenant e contexto. Identidade propagada ao backend deve ser assinada, protegida por mTLS ou aceita somente de redes confiáveis."
  },
  {
    "kind": "paragraph",
    "text": "Caching de chaves, introspection e metadados melhora desempenho, mas altera tempo de revogação. A policy deve documentar TTL, comportamento em falha e consistência. Fail-open em autenticação normalmente é inadequado. Se o serviço de identidade não responde, permitir a chamada pode transformar indisponibilidade em bypass de segurança."
  },
  {
    "kind": "subhead",
    "text": "Pipeline conceitual de autenticação e autorização"
  },
  {
    "kind": "paragraph",
    "text": "# Fluxo conceitual de segurança extrair credencial validar integridade e validade resolver cliente e sujeito verificar audience e scopes consultar quota ou plano aplicar autorização contextual remover headers não confiáveis propagar identidade confiável ao backend"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.14 Roteamento, backends e resiliência",
    "id": "23-14-roteamento-backends-e-resiliencia"
  },
  {
    "kind": "paragraph",
    "text": "O roteamento outbound transforma uma decisão lógica em conexão real com um backend. A policy define URL, método, headers, TLS, timeout, pooling e tratamento de resposta. DNS, rota IP, firewall, NAT e certificado continuam relevantes. Um erro de routing filter pode ser causado por ausência de rota, pool esgotado, connect timeout, read timeout, hostname mismatch ou reset do servidor."
  },
  {
    "kind": "paragraph",
    "text": "Pools de conexão reduzem custo de handshake, mas precisam de limites, keep-alive, idle timeout e validação. Se o backend fecha conexões antes do gateway, a reutilização pode produzir resets intermitentes. Se o gateway abre conexões demais, pode esgotar portas efêmeras ou SNAT. Métricas de pool e socket devem ser correlacionadas com throughput e latência."
  },
  {
    "kind": "paragraph",
    "text": "Retry deve ser aplicado apenas a operações idempotentes ou protegidas por idempotency key. Repetir uma transferência financeira após timeout de leitura pode duplicar efeito. Circuit breaker, fallback e balanceamento devem considerar semântica de negócio. Resiliência não é simplesmente tentar novamente; é conter falhas sem multiplicar carga ou corromper estado."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O erro apresentado pelo gateway deve ser decomposto por camada.",
    "headers": [
      "Sintoma",
      "Camada provável",
      "Evidência"
    ],
    "rows": [
      [
        "Connect timeout",
        "Rede ou listener do backend.",
        "SYN, rota, firewall, pool."
      ],
      [
        "Read timeout",
        "Backend lento ou resposta bloqueada.",
        "Tempo no upstream e trace."
      ],
      [
        "Connection reset",
        "Peer ou intermediário fechou conexão.",
        "Captura TCP e logs do backend."
      ],
      [
        "502 do gateway",
        "Falha ao obter resposta válida.",
        "Traffic Monitor, trace e routing filter."
      ],
      [
        "Erro TLS outbound",
        "Trust, SNI, hostname ou certificado.",
        "Handshake e cadeia apresentada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.15 Observabilidade, logs e Traffic Monitor",
    "id": "23-15-observabilidade-logs-e-traffic-monitor"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway Manager oferece visão operacional de instâncias, logs e tráfego. Traffic Monitor registra detalhes de mensagens conforme configuração e pode ajudar a reconstruir o caminho de uma transação. Trace Log revela execução e mensagens de diagnóstico. Métricas agregadas permitem observar throughput, status, latência e saúde. Cada fonte possui custo e finalidade diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Traffic monitoring detalhado pode consumir CPU, I/O, banco e armazenamento. Em alto volume, registrar payload completo é caro e arriscado. A estratégia deve selecionar eventos, mascarar dados, limitar tamanho e definir retenção. Trace em nível elevado deve ser temporário e aplicado ao menor escopo possível. Observabilidade não pode comprometer a disponibilidade que pretende explicar."
  },
  {
    "kind": "paragraph",
    "text": "Correlação ponta a ponta deve usar identificador criado ou validado no início da policy e propagado ao backend. Logs do gateway precisam registrar API, operação, cliente, subject quando permitido, grupo, instância, backend, status, latência e motivo de falha. Para investigação de segurança, preserve eventos administrativos, alterações de configuração e autenticações do console."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Cada fonte responde a uma pergunta operacional diferente.",
    "headers": [
      "Fonte",
      "Granularidade",
      "Uso"
    ],
    "rows": [
      [
        "Trace Log",
        "Detalhe de execução e diagnóstico.",
        "Investigar policy, filtros e exceções."
      ],
      [
        "Traffic Monitor",
        "Transação e mensagem conforme configuração.",
        "Reconstruir chamadas e respostas."
      ],
      [
        "Métricas",
        "Agregados temporais.",
        "Capacidade, SLA e tendências."
      ],
      [
        "Audit/admin logs",
        "Ações de gestão.",
        "Governança e investigação."
      ],
      [
        "Open logging / SIEM",
        "Eventos exportados.",
        "Correlação corporativa e retenção."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.16 Performance e planejamento de capacidade",
    "id": "23-16-performance-e-planejamento-de-capacidade"
  },
  {
    "kind": "paragraph",
    "text": "Performance depende de CPU, memória, garbage collection, threads, sockets, criptografia, tamanho de mensagem, complexidade de policy e latência das dependências. Uma policy que apenas valida um header tem perfil diferente de outra que faz transformação XML, assinatura digital, chamada externa e logging detalhado. Capacity planning deve usar workload representativo, não apenas requests por segundo abstratos."
  },
  {
    "kind": "paragraph",
    "text": "Filtros síncronos de rede ampliam a latência e consomem recursos enquanto aguardam. Consultas de KPS e Cassandra precisam de índices e proximidade. Transformações grandes podem exigir buffering. Criptografia assimétrica e handshake TLS são mais caros que reutilização de conexão. A análise de performance precisa decompor tempo dentro do gateway e tempo gasto em serviços externos."
  },
  {
    "kind": "paragraph",
    "text": "Tuning sem evidência pode piorar o sistema. Aumentar heap demais prolonga pausas; aumentar threads pode elevar contenção; ampliar pools pode pressionar backends e SNAT. O processo correto estabelece baseline, mede percentis, identifica gargalo, altera uma variável e repete teste. Configurações de Traffic Monitor e trace devem ser incluídas nos cenários, porque mudam o custo do runtime."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Planejamento de capacidade exige métricas de runtime e dependências.",
    "headers": [
      "Dimensão",
      "Métrica",
      "Interpretação"
    ],
    "rows": [
      [
        "CPU",
        "uso, fila, steal.",
        "Policies computacionais e criptografia."
      ],
      [
        "Memória",
        "heap, GC, RSS.",
        "Buffering, leaks e volume de objetos."
      ],
      [
        "Conexões",
        "ativas, pool, erros.",
        "Capacidade TCP/TLS e backend."
      ],
      [
        "Latência",
        "p50, p95, p99.",
        "Caudas e dependências lentas."
      ],
      [
        "Stores",
        "latência e erro KPS/Cassandra.",
        "Impacto de persistência na policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.17 Containers, Kubernetes e OpenShift",
    "id": "23-17-containers-kubernetes-e-openshift"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway pode ser implantado em arquiteturas containerizadas, inclusive Kubernetes e OpenShift, seguindo referências de produto. Containerizar não elimina os conceitos de domínio, configuração, secrets, persistência e HA. A diferença é que instâncias passam a ser efêmeras, escaladas por orquestrador e sujeitas a probes, requests, limits, volumes e mecanismos de distribuição de configuração."
  },
  {
    "kind": "paragraph",
    "text": "Imagens devem ser imutáveis e configurações promovidas de forma reproduzível. Certificados e credenciais devem entrar por secrets ou integrações de vault, não ser gravados na imagem. Readiness precisa confirmar que o gateway está realmente pronto para receber tráfego; liveness não pode reiniciar o pod por lentidão transitória de um backend. PreStop e termination grace period ajudam a drenar conexões."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra e bancos de métricas exigem desenho próprio e não devem ser tratados como detalhes do pod. Escalar gateway sem observar limites de dependências pode apenas aumentar pressão. Em OpenShift, SCCs, rotas, services, NetworkPolicies, storage e observabilidade precisam estar alinhados à referência e às políticas corporativas."
  },
  {
    "kind": "subhead",
    "text": "Atenção em containers"
  },
  {
    "kind": "paragraph",
    "text": "Horizontal Pod Autoscaling baseado apenas em CPU pode reagir tarde a latência de backend ou conexões. Combine métricas de negócio, conexões, fila e capacidade dos sistemas dependentes. Escalar o gateway não cria capacidade no core bancário."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.18 Segurança administrativa e hardening",
    "id": "23-18-seguranca-administrativa-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "O plano administrativo deve ser isolado do tráfego público. Portas de ANM, Node Managers e consoles não devem estar expostas à Internet. RBAC deve separar desenvolvimento de policy, implantação, operação, auditoria e administração de segurança. Contas compartilhadas comprometem rastreabilidade. Credenciais padrão e segredos em arquivos precisam ser removidos ou protegidos conforme a versão."
  },
  {
    "kind": "paragraph",
    "text": "Hardening inclui patching, versões suportadas, TLS administrativo, rotação de certificados, proteção de arquivos, menor privilégio do sistema operacional, limitação de acesso a Cassandra e bancos, backup criptografado e integração com SIEM. Configurações customizadas devem ser inventariadas para não desaparecerem ou quebrarem em upgrade."
  },
  {
    "kind": "paragraph",
    "text": "Upgrade é um projeto de compatibilidade. Policies customizadas, scripts, filtros, bibliotecas, drivers, HSM, Cassandra, banco de métricas e sistema operacional precisam ser avaliados. O ambiente deve ser testado com tráfego realista e rollback. Manter release antiga sem suporte amplia risco de segurança e dificulta integração com dependências modernas."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Hardening combina produto, sistema operacional, rede e processo.",
    "headers": [
      "Controle",
      "Objetivo",
      "Evidência"
    ],
    "rows": [
      [
        "RBAC",
        "Menor privilégio administrativo.",
        "Perfis, grupos e revisão periódica."
      ],
      [
        "Segregação de rede",
        "Proteger portas de gestão.",
        "Firewall, rotas e bastion."
      ],
      [
        "Gestão de segredos",
        "Evitar exposição em projeto e logs.",
        "Vault, aliases e rotação."
      ],
      [
        "Patch/upgrade",
        "Corrigir vulnerabilidades e manter suporte.",
        "Inventário e calendário."
      ],
      [
        "Auditoria",
        "Rastrear mudança e acesso.",
        "Logs imutáveis e SIEM."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.19 Troubleshooting orientado por camadas",
    "id": "23-19-troubleshooting-orientado-por-camadas"
  },
  {
    "kind": "paragraph",
    "text": "Uma investigação eficiente começa classificando o problema. Se o nome não resolve, a policy ainda não participou. Se o TCP não estabelece, examine rota, firewall e listener. Se o TLS falha, examine certificado, SNI e trust. Se a requisição entra no Traffic Monitor e falha em um filtro, analise message context e caminho de policy. Se o routing filter inicia e o backend não responde, avance para conexão outbound."
  },
  {
    "kind": "paragraph",
    "text": "O ponto de observação é essencial. Logs do consumidor, balanceador, gateway externo, gateway interno e backend descrevem conexões diferentes. NAT e proxies alteram IP e porta. O timestamp precisa estar sincronizado. Correlation ID deve ser preservado. Sem esses elementos, equipes podem comparar transações distintas e concluir incorretamente que o gateway perdeu uma mensagem."
  },
  {
    "kind": "paragraph",
    "text": "Evite habilitar trace máximo em todo o cluster durante pico. Reproduza em ambiente controlado ou limite por instância e janela. Colete configuração da policy, versão implantada, grupo, instância, logs, métricas, captura quando autorizada e evidências do backend. Depois formule hipótese testável em vez de mudar vários timeouts simultaneamente."
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - Diagnóstico por camadas reduz tentativa e erro.",
    "headers": [
      "Etapa",
      "Teste",
      "Interpretação"
    ],
    "rows": [
      [
        "DNS",
        "Resolver frontend e backend no host do gateway.",
        "Nome, split DNS e cache."
      ],
      [
        "TCP",
        "Testar conexão às portas necessárias.",
        "Rota, firewall e listener."
      ],
      [
        "TLS",
        "Inspecionar handshake e cadeia.",
        "Trust, SNI, hostname e mTLS."
      ],
      [
        "Policy",
        "Localizar filtro e caminho executado.",
        "Contexto, condição e exceção."
      ],
      [
        "Backend",
        "Correlacionar chamada recebida.",
        "Gateway chamou ou encerrou antes."
      ],
      [
        "Persistência",
        "Verificar KPS, Cassandra e métricas.",
        "Dependência externa do fluxo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.20 Estudos de caso",
    "id": "23-20-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - 502 intermitente após aumento de tráfego. O Traffic Monitor mostra que a policy chega ao routing filter, mas algumas conexões são resetadas. Métricas revelam reutilização de conexões mantidas por mais tempo que o idle timeout do backend. A correção alinha keep-alive e validação do pool; aumentar read timeout não resolveria a causa."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Policy Studio não consegue implantar, mas APIs continuam respondendo. O erro é restrito à porta administrativa entre a estação e o Admin Node Manager. O listener de negócio está saudável. A separação de planos evita uma indisponibilidade maior e direciona a investigação para firewall, certificado administrativo e serviço do ANM."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Cadastro de nova aplicação falha no API Manager enquanto APIs existentes seguem ativas. Cassandra apresenta latência e nós indisponíveis. O runtime possui dados já carregados, mas o management plane não consegue persistir a operação. O incidente precisa de equipe de banco distribuído, e não de alteração na policy do frontend."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 4 - Após rotação de certificado outbound, apenas um nó falha. O balanceador distribui chamadas entre duas instâncias, e a falha parece aleatória. A comparação mostra truststore ou alias não atualizado na configuração efetiva de um membro do grupo. A solução é corrigir a promoção e validar consistência entre instâncias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "O Axway API Gateway organiza runtime e administração por domínios, grupos, instâncias, Node Managers e um Admin Node Manager central. Policy Studio modela a configuração; API Gateway Manager oferece operação e observabilidade; instâncias do gateway executam listeners, policy circuits e roteamento. API Manager adiciona gestão de APIs e consumidores sobre esse runtime."
  },
  {
    "kind": "paragraph",
    "text": "O funcionamento de uma chamada depende de message context, filtros, stores, rede, TLS, identidade e backends. KPS, Cassandra e bancos de métricas possuem finalidades diferentes e não devem ser tratados como um único repositório. Implantação, HA, multi-DC e containers exigem configuração reproduzível e separação clara entre plano administrativo e tráfego de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Operar a plataforma com segurança exige RBAC, segregação de portas administrativas, gestão de certificados, observabilidade controlada, capacity planning e upgrade disciplinado. Troubleshooting deve seguir camadas e pontos de observação, preservando correlation ID e evidências de cada componente."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda o Azure API Management (APIM), permitindo comparar uma plataforma gerenciada em nuvem com a arquitetura e o funcionamento estudados no Axway API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist operacional",
    "id": "checklist-operacional"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "O domínio, grupos, instâncias, Node Managers e ANM estão documentados e inventariados.",
      "Portas administrativas estão segregadas e protegidas por RBAC e rede de gestão.",
      "Policies possuem ownership, versionamento, testes e contratos de atributos do message context.",
      "Configuração e dados de ambiente estão separados e promovidos por pipeline.",
      "KPS, Cassandra e banco de métricas possuem monitoramento, backup e capacidade.",
      "Health checks verificam prontidão real sem sobrecarregar dependências.",
      "TLS inbound, outbound e administrativo possuem rotação e truststores controlados.",
      "Pools, timeouts, retries e circuit breakers respeitam a semântica das operações.",
      "Traffic Monitor e trace têm escopo, mascaramento e retenção definidos.",
      "Capacidade foi testada com workload representativo e percentis de latência.",
      "Containers possuem readiness, liveness, drain, secrets e limits adequados.",
      "Upgrades incluem policies customizadas, drivers, HSM, stores e rollback.",
      "Runbooks de troubleshooting separam DNS, TCP, TLS, policy, backend e persistência."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratórios e exercícios",
    "id": "laboratorios-e-exercicios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Desenhe um domínio com dois grupos e duas instâncias por grupo, indicando ANM, Node Managers e fluxos administrativos.",
      "Monte uma policy conceitual de autenticação, autorização, KPS, routing e erro; documente atributos produzidos e consumidos.",
      "Simule falha do ANM e explique o que pode continuar funcionando no runtime.",
      "Diferencie uma falha de Cassandra no API Manager de uma falha de conexão outbound ao backend.",
      "Proponha estratégia de implantação zero downtime para um grupo com quatro instâncias.",
      "Liste evidências para investigar um 502 intermitente em apenas um nó.",
      "Desenhe topologia external/internal zone com responsabilidades distintas.",
      "Explique como validar rotação de certificado mTLS inbound e outbound.",
      "Proponha conjunto mínimo de métricas para capacity planning do gateway.",
      "Descreva como migrar a plataforma para OpenShift sem incorporar segredos à imagem."
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
    "caption": "Tabela 12 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Admin Node Manager (ANM)",
        "Componente central de administração de um domínio do API Gateway."
      ],
      [
        "API Gateway Manager",
        "Console web de administração, monitoramento, logs e topologia."
      ],
      [
        "API Manager",
        "Camada de gestão de APIs, aplicações, consumidores e publicação sobre o gateway."
      ],
      [
        "Domain",
        "Fronteira administrativa que reúne grupos e instâncias."
      ],
      [
        "Filter",
        "Unidade de processamento utilizada em um policy circuit."
      ],
      [
        "Group",
        "Unidade lógica de implantação e administração de instâncias."
      ],
      [
        "Instance",
        "Processo do API Gateway que executa tráfego."
      ],
      [
        "KPS",
        "Key Property Store consultado por policies para dados auxiliares."
      ],
      [
        "Message context",
        "Conjunto de atributos e mensagens mantido durante a transação."
      ],
      [
        "Node Manager",
        "Componente de gerenciamento de instâncias e serviços em um nó ou grupo."
      ],
      [
        "Policy circuit",
        "Fluxo de filtros conectado por caminhos de sucesso e falha."
      ],
      [
        "Policy Studio",
        "Ferramenta de desenvolvimento e configuração do API Gateway."
      ],
      [
        "Traffic Monitor",
        "Visão de tráfego e transações disponível no API Gateway Manager."
      ],
      [
        "Virtualized API",
        "API publicada e mediada pelo API Manager/API Gateway."
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
      "Axway Documentation. API Gateway groups and domains.",
      "Axway Documentation. Configure Admin Node Manager high availability.",
      "Axway Documentation. Administer API Gateway and manage operations.",
      "Axway Documentation. Develop policies and Policy Studio configuration.",
      "Axway Documentation. Key Property Store overview and configuration.",
      "Axway Documentation. Monitoring, Traffic Monitor, logging and metrics.",
      "Axway Documentation. Configure API Manager and virtualize APIs.",
      "Axway Documentation. Administer Apache Cassandra for API Management.",
      "Axway Documentation. API Management multi-datacenter configuration.",
      "Axway Documentation. Container reference architectures for Kubernetes and OpenShift.",
      "Axway Documentation. Performance tuning and system requirements."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de versão"
  },
  {
    "kind": "paragraph",
    "text": "O produto evolui por releases e patches. Antes de aplicar comandos, portas, parâmetros ou procedimentos, valide a documentação oficial correspondente à versão instalada, ao sistema operacional, ao banco, ao modo de implantação e aos componentes licenciados no ambiente."
  }
];
