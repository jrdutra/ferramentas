import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const CASE_STUDIES_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Casos reais: arquitetura, operação, falhas e decisões em escala"
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O valor do estudo de caso está no raciocínio e nos trade-offs; copiar a solução sem contexto é um risco."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/pt/overview.svg",
    "alt": "Casos reais conectando decisões de arquitetura a problemas de produção",
    "caption": "Figura de abertura - Os casos conectam decisões de arquitetura a problemas observados em produção."
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
    "text": "Os capítulos anteriores estudaram protocolos, gateways, segurança, mensageria, observabilidade, Kubernetes, Zero Trust e disponibilidade de forma conceitual e técnica. Este capítulo muda a perspectiva: em vez de apresentar uma tecnologia isolada, observa como grandes organizações documentaram problemas reais e as decisões adotadas para operar em escala. A intenção é aproximar teoria e prática sem transformar histórias públicas em receitas universais."
  },
  {
    "kind": "paragraph",
    "text": "Estudos de caso de empresas globais são úteis porque expõem trade-offs que raramente aparecem em tutoriais. Um gateway pode precisar abandonar um modelo bloqueante; retries podem amplificar uma falha; um esquema de versionamento precisa equilibrar evolução e estabilidade; um backbone de eventos precisa preservar retenção e paralelismo; um portal interno precisa reduzir a fragmentação de ferramentas. Cada decisão responde a um contexto específico de volume, organização, legado e maturidade operacional."
  },
  {
    "kind": "paragraph",
    "text": "Ao mesmo tempo, fontes públicas são incompletas. Artigos de engenharia apresentam recortes, normalmente escritos depois de um projeto bem-sucedido ou de um incidente relevante. Custos, tentativas fracassadas, restrições comerciais e detalhes de segurança podem ser omitidos. Portanto, o leitor deve extrair princípios, não copiar topologias. A pergunta correta é: qual propriedade do sistema levou à decisão e como essa propriedade aparece no meu ambiente?"
  },
  {
    "kind": "paragraph",
    "text": "Os casos selecionados cobrem Netflix, Amazon/AWS, Stripe, Shopify, LinkedIn, Google, GitHub e Spotify. Eles foram escolhidos porque possuem publicações técnicas primárias e porque conectam vários temas do curso: API Gateway, load shedding, idempotência, versionamento, GraphQL, Kafka, SRE, gRPC, OpenAPI, developer portals e análise de incidentes."
  },
  {
    "kind": "paragraph",
    "text": "Como estudar este capítulo Para cada empresa, escreva cinco linhas: contexto, problema, decisão, resultado e limite de transferência. Depois, converta a lição em uma hipótese testável para um ambiente bancário ou corporativo. Essa prática evita copiar soluções sem compreender o mecanismo que as tornou eficazes."
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
      "Ler publicações de engenharia como evidências parciais e contextualizadas.",
      "Relacionar decisões de grandes empresas aos fundamentos de APIs e sistemas distribuídos.",
      "Analisar evolução de gateways, estratégias de resiliência e proteção contra sobrecarga.",
      "Compreender práticas reais de idempotência, versionamento e rate limiting.",
      "Relacionar GraphQL, Kafka, gRPC, SRE e developer portals a problemas organizacionais.",
      "Extrair padrões recorrentes sem confundir correlação com causalidade.",
      "Avaliar quando um caso é transferível para ambientes bancários, regulados ou híbridos.",
      "Transformar uma lição pública em experimento controlado, padrão técnico e runbook."
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
      "39.1 Como interpretar casos públicos com rigor",
      "39.2 Netflix: evolução do gateway Zuul",
      "39.3 Amazon/AWS: retries, idempotência, isolamento e estabilidade",
      "39.4 Stripe: APIs previsíveis, versionamento e rate limiting",
      "39.5 Shopify: GraphQL e limitação por custo",
      "39.6 LinkedIn: Kafka como backbone de dados",
      "39.7 Google: SRE, overload e gRPC",
      "39.8 GitHub: versionamento por data, OpenAPI e SDKs",
      "39.9 Spotify: plataforma interna e incidente de service discovery",
      "39.10 Comparação transversal e aplicação a bancos",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.1 Como interpretar casos públicos com rigor",
    "id": "39-1-como-interpretar-casos-publicos-com-rigor"
  },
  {
    "kind": "paragraph",
    "text": "Um caso público precisa ser lido como um recorte temporal. A arquitetura descrita pode ter sido substituída, ampliada ou dividida depois da publicação. Além disso, o mesmo termo pode significar coisas diferentes entre empresas. Gateway, plataforma, célula, domínio e serviço são palavras dependentes do contexto. O leitor deve registrar a data, a fonte primária, a escala descrita e o objetivo do texto antes de generalizar qualquer conclusão."
  },
  {
    "kind": "paragraph",
    "text": "A análise deve separar fato publicado de inferência. Se uma empresa informa que migrou um gateway para I/O assíncrono, isso é um fato. Concluir que todo gateway bloqueante é inadequado é uma inferência incorreta. O problema pode ter surgido apenas sob determinado perfil de conexão, quantidade de origens ou custo por thread. Bons estudos de caso explicitam a relação entre sintoma, mecanismo e decisão."
  },
  {
    "kind": "paragraph",
    "text": "Também é necessário observar o viés de sobrevivência. Soluções publicadas normalmente funcionaram o suficiente para merecer um artigo, mas isso não significa que sejam as únicas possíveis. Em uma organização menor, uma arquitetura mais simples pode produzir melhor disponibilidade por reduzir componentes e competências necessárias. Escala técnica e escala organizacional precisam ser consideradas juntas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/pt/figure-01.svg",
    "alt": "Estrutura para analisar contexto, problema, decisão e resultado de um caso público",
    "caption": "Figura 1 - Contexto e limites são tão importantes quanto a solução descrita."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Um caso técnico deve ser interrogado, não apenas admirado.",
    "headers": [
      "Pergunta",
      "Evidência desejada",
      "Risco de ignorar"
    ],
    "rows": [
      [
        "Qual era o problema?",
        "Sintoma, impacto e restrições.",
        "Copiar tecnologia sem necessidade."
      ],
      [
        "Qual era a escala?",
        "Volume, cardinalidade, regiões e times.",
        "Superdimensionar ou subdimensionar."
      ],
      [
        "Qual foi o trade-off?",
        "Custo, complexidade e falhas remanescentes.",
        "Tratar ganho como gratuito."
      ],
      [
        "O que mudou depois?",
        "Data e continuidade da arquitetura.",
        "Adotar solução já substituída."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.2 Netflix: evolução do gateway Zuul",
    "id": "39-2-netflix-evolucao-do-gateway-zuul"
  },
  {
    "kind": "paragraph",
    "text": "A Netflix publicou o Zuul como um edge service usado para receber tráfego, aplicar filtros, rotear chamadas e proteger sistemas em nuvem. A primeira geração foi construída em um modelo síncrono e bloqueante. À medida que o volume e a diversidade do tráfego cresceram, a empresa desenvolveu o Zuul 2 sobre uma arquitetura assíncrona e não bloqueante baseada em Netty, alterando profundamente o modelo de concorrência do gateway."
  },
  {
    "kind": "paragraph",
    "text": "A lição não é simplesmente que assíncrono é superior. O ganho aparece quando grande quantidade de conexões passa parte relevante do tempo aguardando I/O. Nesse cenário, reservar uma thread por conexão ou request pode elevar custo e dificultar controle de capacidade. A migração também aumenta a complexidade de programação, debugging e propagação de contexto. A Netflix precisou tratar filtros, observabilidade e compatibilidade operacional dentro do novo modelo."
  },
  {
    "kind": "paragraph",
    "text": "Publicações posteriores mostram que a otimização continuou. A adoção de multiplexação HTTP/2 para origens reduziu churn de conexões, e mecanismos de load shedding priorizado foram implementados na camada do gateway para preservar serviços mais importantes durante sobrecarga. Isso demonstra que a borda não é apenas roteamento: ela pode ser um ponto estratégico de proteção, classificação de tráfego e contenção de falhas."
  },
  {
    "kind": "paragraph",
    "text": "Lição transferível Em gateways de alto volume, meça conexões abertas, reutilização, filas, tempo bloqueado, churn e saturação antes de escolher o modelo de concorrência. A arquitetura de I/O deve responder ao perfil real do tráfego, e load shedding precisa ser definido por criticidade de negócio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.3 Amazon/AWS: retries, idempotência, isolamento e estabilidade",
    "id": "39-3-amazon-aws-retries-idempotencia-isolamento-e-estabilidade"
  },
  {
    "kind": "paragraph",
    "text": "A Amazon Builders Library documenta uma visão pragmática de confiabilidade em sistemas distribuídos. Timeouts são necessários para limitar trabalho e impedir espera indefinida, mas valores incorretos produzem falsos erros ou mantêm recursos presos. Retries recuperam falhas transitórias, porém também multiplicam carga justamente quando o destino pode estar degradado. Por isso, a recomendação combina tentativas limitadas, backoff exponencial, jitter e operações idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "A idempotência permite que o cliente repita uma solicitação sem duplicar o efeito pretendido. Em operações de criação ou pagamento, a empresa defende identificar a intenção do chamador por uma chave estável e persistir o resultado associado. Esse padrão é mais seguro do que tentar inferir duplicidade apenas pelo conteúdo. Ele também exige definir janela de retenção, conflito de parâmetros e comportamento após timeout entre processamento e resposta."
  },
  {
    "kind": "paragraph",
    "text": "Outros textos descrevem load shedding, static stability, dependency isolation e shuffle sharding. O princípio comum é reduzir o raio de impacto. Um sistema estaticamente estável continua atendendo com estado conhecido quando uma dependência de controle fica indisponível. Shuffle sharding distribui clientes em subconjuntos diferentes de recursos, diminuindo a probabilidade de dois consumidores compartilharem exatamente o mesmo domínio de falha. Esses padrões trocam eficiência máxima por contenção e previsibilidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - A confiabilidade vem da combinação de mecanismos, não de um único retry.",
    "headers": [
      "Padrão",
      "Problema atacado",
      "Trade-off"
    ],
    "rows": [
      [
        "Backoff + jitter",
        "Sincronização de retries e picos.",
        "Maior latência para recuperação."
      ],
      [
        "Idempotência",
        "Duplicação de efeitos após retry.",
        "Estado adicional e regras de conflito."
      ],
      [
        "Load shedding",
        "Colapso por sobrecarga.",
        "Parte do tráfego é rejeitada."
      ],
      [
        "Shuffle sharding",
        "Blast radius entre tenants.",
        "Capacidade menos compartilhada."
      ],
      [
        "Static stability",
        "Dependência de controle indisponível.",
        "Estado pode ficar temporariamente desatualizado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.4 Stripe: APIs previsíveis, versionamento e rate limiting",
    "id": "39-4-stripe-apis-previsiveis-versionamento-e-rate-limiting"
  },
  {
    "kind": "paragraph",
    "text": "A Stripe publicou práticas que tratam a API como infraestrutura de longo prazo. Em idempotência, a empresa propõe chaves fornecidas pelo cliente para tornar retries seguros em operações com efeitos. O servidor associa a chave a uma execução e retorna o resultado correspondente em novas tentativas. O padrão reduz o risco de duplicar cobranças quando a rede falha após o processamento, mas antes de a resposta chegar ao consumidor."
  },
  {
    "kind": "paragraph",
    "text": "No versionamento, a Stripe descreve uma estratégia em que integrações permanecem associadas a versões compatíveis enquanto a plataforma evolui. O objetivo é permitir mudanças internas e novos comportamentos sem forçar migração coordenada de todos os clientes. Isso exige uma camada capaz de aplicar transformações ou comportamentos por versão, documentação clara e governança rigorosa para evitar uma matriz incontrolável de compatibilidade."
  },
  {
    "kind": "paragraph",
    "text": "A empresa também descreve múltiplos limitadores: request rate limiters, concurrent request limiters, fleet usage load shedders e worker utilization load shedders. A lição importante é que uma única janela de requisições por segundo não protege todas as dimensões. Uma chamada longa pode consumir concorrência; um worker específico pode saturar; uma operação pode ser mais cara que outra. Proteção eficaz combina limites por taxa, concorrência e utilização."
  },
  {
    "kind": "paragraph",
    "text": "Padrão conceitual de idempotência POST /v1/payments Idempotency-Key: 7b89f6c2-..."
  },
  {
    "kind": "paragraph",
    "text": "# Repetir a mesma intenção com a mesma chave # deve recuperar o resultado anterior ou rejeitar # parâmetros incompatíveis para a chave existente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.5 Shopify: GraphQL e limitação por custo",
    "id": "39-5-shopify-graphql-e-limitacao-por-custo"
  },
  {
    "kind": "paragraph",
    "text": "A Shopify adota limitação calculada por custo em sua GraphQL Admin API. Em vez de contar cada query como uma unidade equivalente, o sistema atribui pontos aos campos e conexões solicitados. A combinação de app e loja recebe um bucket com capacidade e taxa de restauração. Queries mais simples consomem menos pontos; consultas amplas ou profundamente conectadas consomem mais."
  },
  {
    "kind": "paragraph",
    "text": "Esse modelo responde a uma característica específica de GraphQL: a mesma URL pode representar operações com custos muito diferentes. Um rate limit tradicional por request não distingue uma query pequena de uma operação que percorre milhares de objetos. O custo estimado permite proteger o servidor e, ao mesmo tempo, dar previsibilidade ao consumidor. A resposta informa custo solicitado, custo real e estado do bucket, permitindo adaptação do cliente."
  },
  {
    "kind": "paragraph",
    "text": "A Shopify também orienta o uso de bulk operations para grandes conjuntos de dados. Isso desloca trabalho longo para uma execução assíncrona e evita que o cliente tente contornar limites com paginação agressiva. A lição transferível é separar interações online de baixa latência de workloads analíticos ou massivos, oferecendo uma interface adequada para cada perfil."
  },
  {
    "kind": "paragraph",
    "text": "Lição transferível Quando o custo de uma operação varia muito, limite por peso ou complexidade, não apenas por quantidade de requests. Exponha ao consumidor informações suficientes para que ele reduza o custo ou migre para processamento assíncrono."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.6 LinkedIn: Kafka como backbone de dados",
    "id": "39-6-linkedin-kafka-como-backbone-de-dados"
  },
  {
    "kind": "paragraph",
    "text": "O Kafka nasceu no LinkedIn para coletar e entregar grandes volumes de dados com baixa latência. Publicações da empresa descrevem a evolução de um ambiente que ultrapassava os limites de um banco centralizado e precisava integrar sistemas especializados. A abstração escolhida foi um log distribuído, particionado e replicado, no qual produtores acrescentam registros e consumidores mantêm sua própria posição por offsets."
  },
  {
    "kind": "paragraph",
    "text": "A retenção diferencia o Kafka de filas descartáveis tradicionais. Consumidores podem reprocessar dados, criar novas visões e avançar em velocidades independentes. Partições fornecem paralelismo e ordenação por chave dentro de uma partição. Essas propriedades permitiram usar Kafka como backbone de mensageria, ingestão para processamento batch e alimentação de sistemas de streaming."
  },
  {
    "kind": "paragraph",
    "text": "A lição organizacional é tão importante quanto a técnica. Um backbone central reduz integrações ponto a ponto, mas cria uma plataforma crítica que exige ownership, capacidade, governança de schemas, quotas, isolamento e operação especializada. Transformar Kafka no sistema circulatório de dados aumenta sua importância e seu blast radius. A empresa investiu em ecossistema e ferramentas ao redor do broker, não apenas no cluster."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.7 Google: SRE, overload e gRPC",
    "id": "39-7-google-sre-overload-e-grpc"
  },
  {
    "kind": "paragraph",
    "text": "O modelo de Site Reliability Engineering do Google tornou explícita a relação entre engenharia de software e operação. O SRE Book enfatiza SLIs, SLOs, alertas acionáveis, playbooks, postmortems e redução de toil. Em overload e cascading failures, o material mostra que capacidade planejada não é suficiente: perda de réplicas, retries e filas podem criar feedback positivo e derrubar componentes ainda saudáveis."
  },
  {
    "kind": "paragraph",
    "text": "A resposta envolve proteção em várias camadas: limites de concorrência, load shedding, backpressure, timeouts, retries controlados e degradação. O monitoramento precisa representar experiência do usuário e saturação interna. Uma lição recorrente é que o sistema deve rejeitar trabalho cedo quando não consegue cumpri-lo, preservando latência e capacidade para as solicitações aceitas."
  },
  {
    "kind": "paragraph",
    "text": "Na comunicação entre serviços, o gRPC foi criado a partir da experiência do Google com Stubby, uma infraestrutura RPC usada para conectar grande quantidade de microsserviços. Contratos tipados, streaming, deadlines, health checking e integração com tracing demonstram como o protocolo carrega práticas de produção. O ganho não vem apenas da serialização binária; vem da padronização de comportamento entre clientes e servidores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.8 GitHub: versionamento por data, OpenAPI e SDKs",
    "id": "39-8-github-versionamento-por-data-openapi-e-sdks"
  },
  {
    "kind": "paragraph",
    "text": "O GitHub introduziu versionamento por data em sua REST API para continuar evoluindo o contrato sem surpreender integrações existentes. O consumidor informa a versão desejada em um header e recebe um período de migração para versões novas. Essa escolha separa a identidade dos recursos da seleção de versão e transforma a data em um marco de comportamento suportado."
  },
  {
    "kind": "paragraph",
    "text": "A empresa também publicou uma descrição OpenAPI de sua REST API. Além de documentação, o contrato passou a permitir geração, validação e automação. Em seus SDKs, o GitHub descreveu a substituição de definições manuais de rotas por geração a partir da documentação e de descrições estruturadas. Isso reduz drift, mas torna a qualidade do contrato e do pipeline parte crítica do produto."
  },
  {
    "kind": "paragraph",
    "text": "A lição é que versionamento e machine-readable contracts precisam caminhar juntos. Uma versão não é apenas um valor no header: ela precisa estar refletida na documentação, nos exemplos, no código gerado, nos testes e na telemetria. Automação reduz trabalho manual, porém propaga rapidamente erros do contrato; por isso, validação e revisão continuam essenciais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.9 Spotify: plataforma interna e incidente de service discovery",
    "id": "39-9-spotify-plataforma-interna-e-incidente-de-service-discovery"
  },
  {
    "kind": "paragraph",
    "text": "O Spotify criou o Backstage para unificar ferramentas, serviços e documentação em uma experiência consistente para desenvolvedores. O portal permite localizar ownership, criar componentes a partir de templates e integrar CI/CD, documentação, recursos de nuvem e observabilidade. O problema atacado não era apenas técnico: a autonomia de muitos times havia produzido fragmentação de ferramentas e dificuldade para descobrir quem operava cada serviço."
  },
  {
    "kind": "paragraph",
    "text": "O valor do caso está na ideia de plataforma como produto interno. Templates e plugins reduzem variabilidade sem eliminar autonomia. Um desenvolvedor recebe um caminho padrão para criar serviços, enquanto equipes de plataforma mantêm guardrails, catálogos e integrações. Isso transforma governança em experiência de uso, em vez de depender apenas de documentos e revisões manuais."
  },
  {
    "kind": "paragraph",
    "text": "Em 2022, o Spotify publicou um incidente no qual uma indisponibilidade no Traffic Director, combinada com um bug em uma biblioteca cliente gRPC, afetou o login. O relato evidencia falhas compostas: uma dependência externa degradou, e o comportamento do cliente ampliou o impacto. A lição é revisar modos de falha de discovery e control planes, testar fallback, limitar dependências críticas e observar bibliotecas compartilhadas como parte da arquitetura."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/pt/figure-02.svg",
    "alt": "Padrões recorrentes de isolamento, controle, evolução e observabilidade",
    "caption": "Figura 2 - Isolamento, controle, evolução e observabilidade aparecem repetidamente porque tratam propriedades fundamentais de sistemas distribuídos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.10 Comparação transversal dos casos",
    "id": "39-10-comparacao-transversal-dos-casos"
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A tecnologia muda; os mecanismos de controle e governança se repetem.",
    "headers": [
      "Empresa",
      "Problema central",
      "Padrão principal",
      "Cuidado de transferência"
    ],
    "rows": [
      [
        "Netflix",
        "Borda em alto volume.",
        "I/O assíncrono, H2 e load shedding.",
        "Complexidade do modelo reativo."
      ],
      [
        "Amazon/AWS",
        "Falhas transitórias e overload.",
        "Jitter, idempotência, isolamento e estabilidade.",
        "Mais estado e capacidade reservada."
      ],
      [
        "Stripe",
        "API financeira de longo prazo.",
        "Idempotência, versionamento e múltiplos limitadores.",
        "Matriz de compatibilidade."
      ],
      [
        "Shopify",
        "Queries GraphQL heterogêneas.",
        "Rate limit por custo e bulk operations.",
        "Cálculo de custo precisa ser transparente."
      ],
      [
        "LinkedIn",
        "Integração de dados em escala.",
        "Log distribuído e ecossistema Kafka.",
        "Backbone vira infraestrutura crítica."
      ],
      [
        "Google",
        "Operação confiável e RPC padronizado.",
        "SLOs, load shedding, deadlines e gRPC.",
        "Exige cultura e tooling."
      ],
      [
        "GitHub",
        "Evolução segura de API pública.",
        "Versão por data e contratos OpenAPI.",
        "Automação propaga erros do contrato."
      ],
      [
        "Spotify",
        "Fragmentação interna e dependências.",
        "Developer portal e análise de incidentes.",
        "Portal não substitui ownership real."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.11 Aplicação em arquiteturas bancárias",
    "id": "39-11-aplicacao-em-arquiteturas-bancarias"
  },
  {
    "kind": "paragraph",
    "text": "Ambientes bancários compartilham várias propriedades com os casos: alto volume, operações com efeito financeiro, integrações legadas, múltiplos consumidores, requisitos regulatórios e baixa tolerância a inconsistência. A aplicação mais direta é a idempotência em pagamentos, transferências e iniciações. Uma chave precisa representar a intenção do consumidor e ser verificada junto a parâmetros relevantes, evitando duplicidade sem mascarar solicitações realmente distintas."
  },
  {
    "kind": "paragraph",
    "text": "Na borda, as lições da Netflix, Stripe e Shopify ajudam a desenhar gateways com limites por criticidade, concorrência e custo. APIs de saldo, pagamento e autenticação não devem competir de forma indiferenciada com consultas analíticas. Load shedding e prioridades precisam ser definidos com o negócio, acompanhados de respostas previsíveis e observabilidade que mostre quem foi rejeitado e por quê."
  },
  {
    "kind": "paragraph",
    "text": "Para dados e integração, a experiência do LinkedIn demonstra o valor de um log de eventos, mas bancos precisam acrescentar governança rigorosa de schema, retenção, criptografia, reconciliação e segregação. O caso do Spotify reforça a importância de catálogo, ownership e caminhos padronizados. O modelo do Google mostra que SLOs, playbooks e postmortems precisam ser parte da operação diária, não uma atividade eventual após incidentes graves."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/pt/figure-03.svg",
    "alt": "Fluxo de adoção de uma lição por hipótese, experimento e governança",
    "caption": "Figura 3 - Um caso só deve virar padrão depois de hipótese, experimento e governança."
  },
  {
    "kind": "paragraph",
    "text": "O primeiro antipadrão é a escala imaginária: adotar dezenas de componentes porque uma empresa global os utiliza, mesmo que o volume, a equipe e os requisitos locais não justifiquem. Cada serviço adicional cria deploy, patch, observabilidade, backup, segurança e conhecimento operacional. Complexidade deve ser comprada apenas quando resolve uma restrição medida."
  },
  {
    "kind": "paragraph",
    "text": "O segundo antipadrão é copiar o componente e ignorar o ecossistema. Kafka sem governança, service mesh sem observabilidade, gateway sem capacity planning e developer portal sem ownership tornam-se vitrines. Grandes empresas normalmente investem em bibliotecas, templates, testes, operação e equipes especializadas ao redor da tecnologia principal."
  },
  {
    "kind": "paragraph",
    "text": "O terceiro antipadrão é copiar o estado final. Publicações mostram uma arquitetura depois de anos de evolução. A organização leitora precisa construir um caminho incremental, com métricas e reversibilidade. O melhor resultado pode ser adotar apenas o princípio - como idempotência, isolamento ou catálogo - com uma implementação mais simples."
  },
  {
    "kind": "paragraph",
    "text": "Regra de transferência Copie primeiro o problema, depois o mecanismo e somente por último a tecnologia. Se o problema local não produz a mesma pressão arquitetural, a solução provavelmente não deve ser igual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Os casos mostram que grandes plataformas evoluem por pressão concreta: conexões em excesso, falhas transitórias, contratos de longa duração, queries de custo variável, integração de dados, overload, fragmentação de tooling e dependências de controle. As respostas combinam arquitetura, operação e governança."
  },
  {
    "kind": "paragraph",
    "text": "Netflix evidencia a borda como ponto de proteção e concorrência. Amazon destaca idempotência, jitter, isolamento e estabilidade. Stripe e GitHub tratam APIs como contratos duradouros. Shopify demonstra limitação orientada por custo. LinkedIn mostra o poder e o risco de um backbone de eventos. Google conecta SRE e RPC padronizado. Spotify mostra plataforma interna e aprendizado transparente com incidentes."
  },
  {
    "kind": "paragraph",
    "text": "A principal competência não é memorizar nomes de produtos. É reconhecer mecanismos: reduzir blast radius, rejeitar cedo, tornar retries seguros, evoluir contratos, medir custo, padronizar interfaces e transformar operação em engenharia. Esses mecanismos podem ser implementados de formas diferentes conforme o contexto."
  },
  {
    "kind": "paragraph",
    "text": "O capítulo prepara o projeto final, no qual o leitor deverá combinar princípios do curso em uma plataforma completa de APIs. Os casos funcionam como repertório para justificar decisões, mas cada escolha do projeto precisará declarar contexto, trade-off, evidência e plano de operação."
  },
  {
    "kind": "paragraph",
    "text": "Próximo passo do curso O Capítulo 40 consolida toda a formação em um projeto final: desenhar e justificar uma plataforma completa de APIs, incluindo arquitetura, segurança, governança, observabilidade, operação e evolução."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist para analisar novos casos",
    "id": "checklist-para-analisar-novos-casos"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A fonte é primária e identifica data, autores e contexto?",
      "O problema, a escala e as restrições estão explícitos?",
      "A solução resolve um mecanismo conhecido ou apenas introduz tecnologia?",
      "Os custos, limites e falhas remanescentes foram considerados?",
      "A arquitetura continua atual ou foi substituída?",
      "Existe evidência de resultado além de percepção qualitativa?",
      "O ambiente local possui o mesmo perfil de carga, risco e maturidade?",
      "É possível testar a lição em pequena escala e com rollback?",
      "Ownership, observabilidade, segurança e operação foram incluídos?",
      "A decisão interna registra por que o caso é aplicável e onde não é?"
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
      "Explique por que a migração do Zuul para I/O assíncrono não deve ser copiada sem medir o perfil de espera e concorrência.",
      "Projete uma política de retry com timeout, backoff, jitter e idempotência para uma API de pagamentos.",
      "Compare o versionamento da Stripe e do GitHub e proponha uma política para uma API bancária pública.",
      "Modele um rate limit por custo para uma API GraphQL de extratos.",
      "Explique quais controles adicionais seriam necessários para usar Kafka como backbone de um banco.",
      "Relacione load shedding do Google e da Netflix com classes de prioridade no API Gateway.",
      "Proponha um catálogo interno inspirado no Backstage com ownership, OpenAPI, SLO e runbook.",
      "Escolha um caso do capítulo e escreva um experimento de adoção com métrica de sucesso e rollback.",
      "Liste três aspectos não publicados que poderiam mudar sua decisão arquitetural.",
      "Monte uma matriz de transferência com contexto, benefício, risco, pré-requisitos e evidência."
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
    "caption": "Tabela 4 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Blast radius",
        "Conjunto de usuários, serviços ou dados afetados por uma falha."
      ],
      [
        "Case study",
        "Relato contextualizado de problema, decisão e resultado."
      ],
      [
        "Cell",
        "Unidade isolada de capacidade e falha que atende subconjunto de workload."
      ],
      [
        "Developer portal",
        "Interface que reúne catálogo, templates, documentação e ferramentas internas."
      ],
      [
        "Fleet",
        "Conjunto de instâncias que executam a mesma função."
      ],
      [
        "Load shedding",
        "Rejeição controlada de trabalho para preservar o sistema."
      ],
      [
        "Machine-readable contract",
        "Contrato estruturado interpretável por ferramentas, como OpenAPI."
      ],
      [
        "Postmortem",
        "Análise estruturada de incidente com foco em aprendizado e prevenção."
      ],
      [
        "Shuffle sharding",
        "Isolamento por subconjuntos parcialmente sobrepostos de recursos."
      ],
      [
        "Static stability",
        "Capacidade de continuar operando com estado conhecido quando dependências de controle falham."
      ],
      [
        "Survivorship bias",
        "Tendência de observar apenas soluções que chegaram a ser publicadas ou mantidas."
      ],
      [
        "Transferability",
        "Grau em que uma lição pode ser aplicada a outro contexto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências técnicas e casos primários",
    "id": "referencias-tecnicas-e-casos-primarios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Netflix Technology Blog. Announcing Zuul: Edge Service in the Cloud.",
      "Netflix Technology Blog. Zuul 2: The Netflix Journey to Asynchronous, Non-Blocking Systems.",
      "Netflix Technology Blog. Curbing Connection Churn in Zuul.",
      "Netflix Technology Blog. Enhancing Netflix Reliability with Service-Level Prioritized Load Shedding.",
      "Amazon Builders Library. Timeouts, retries, and backoff with jitter.",
      "Amazon Builders Library. Making retries safe with idempotent APIs.",
      "Amazon Builders Library. Using load shedding to avoid overload.",
      "Amazon Builders Library. Static stability using Availability Zones.",
      "Amazon Builders Library. Workload isolation using shuffle-sharding.",
      "Stripe Engineering. Designing robust and predictable APIs with idempotency.",
      "Stripe Engineering. APIs as infrastructure: future-proofing Stripe with versioning.",
      "Stripe Engineering. Scaling your API with rate limiters.",
      "Shopify Developers. API rate limits and GraphQL calculated query cost.",
      "LinkedIn Engineering. Kafka at LinkedIn: Current and Future; Running Kafka at Scale.",
      "Google SRE Book. Monitoring Distributed Systems; Handling Overload; Addressing Cascading Failures.",
      "gRPC Authors. About gRPC and its origins in Google Stubby.",
      "GitHub Blog. Enabling the future of GitHub REST API with API versioning.",
      "GitHub Blog. Introducing GitHub OpenAPI Description; Our move to generated SDKs.",
      "Spotify Engineering. What the Heck is Backstage Anyway?; How We Use Backstage at Spotify.",
      "Spotify Engineering. Incident Report: Spotify Outage on March 8, 2022."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota metodológica Os casos foram construídos apenas com informações públicas e primárias. Eles não representam a arquitetura completa ou atual de cada empresa. Antes de usar qualquer lição como padrão, valide a data, o contexto e a documentação mais recente."
  }
];
