import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const RATE_LIMITING_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Controle de consumo em múltiplas escalas de tempo"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/pt/overview.svg",
    "alt": "Rate limit, quota, throttling e fairness como controles complementares",
    "caption": "Figura de abertura - Frequência, orçamento acumulado e reação operacional são conceitos relacionados, mas distintos."
  },
  {
    "kind": "subhead",
    "text": "Pergunta fundamental"
  },
  {
    "kind": "paragraph",
    "text": "Quem pode consumir quanto, em qual janela, com qual custo e qual comportamento ocorre quando o orçamento termina?"
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
    "text": "Nos capítulos anteriores, o gateway foi estudado como ponto de segurança, roteamento, transformação e observabilidade. Este capítulo aprofunda uma responsabilidade que parece simples, mas se torna complexa quando a plataforma atende milhares de consumidores, múltiplas regiões e backends com custos diferentes: controlar o consumo sem destruir a experiência legítima de uso."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting, quotas e throttling são frequentemente usados como sinônimos. Essa simplificação esconde decisões importantes. Rate limiting controla a frequência em janelas curtas; quota controla um orçamento acumulado em períodos mais longos ou até durante toda a vida da assinatura; throttling descreve a reação aplicada quando a política identifica excesso, como rejeitar, atrasar, enfileirar, degradar ou redirecionar. Uma arquitetura pode combinar os três mecanismos."
  },
  {
    "kind": "paragraph",
    "text": "O controle também não deve ser reduzido a requisições por minuto. Uma chamada pode custar muito mais do que outra: gerar relatório, consultar histórico amplo, processar arquivo, executar inferência de IA ou disparar transação de negócio. Limites modernos consideram unidades ponderadas, bytes, tokens, concorrência e custo downstream. A chave de contabilização pode ser assinatura, aplicação, usuário, tenant, IP, operação ou uma composição desses elementos."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo é construir um modelo mental preciso para projeto e troubleshooting. O leitor aprenderá algoritmos, semântica HTTP, estado distribuído, aplicação em gateways, comportamento de clientes, testes e métricas. Ao final, deverá conseguir explicar não apenas qual número foi configurado, mas por que o limite existe, onde é contabilizado, qual precisão é possível e como o consumidor deve reagir."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada política, registre seis elementos: objetivo, chave, unidade de custo, janela, algoritmo e reação ao excesso. A ausência de qualquer um desses elementos torna a configuração ambígua e dificulta testes, comunicação e auditoria."
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
      "Diferenciar rate limiting, quota, throttling, concorrência, load shedding e proteção contra abuso.",
      "Explicar fixed window, sliding window, token bucket, leaky bucket e GCRA.",
      "Definir chaves de contabilização coerentes com identidade, produto, tenant e operação.",
      "Modelar custos ponderados por chamada, byte, token ou recurso downstream.",
      "Compreender limites locais, globais, hierárquicos e distribuídos.",
      "Interpretar 429, Retry-After e cabeçalhos informativos de limite.",
      "Projetar retries com backoff, jitter e idempotência.",
      "Aplicar policies em Axway API Gateway, Azure API Management e proxies modernos.",
      "Dimensionar limites a partir de capacidade, SLOs, burst e comportamento real.",
      "Diagnosticar rejeições inesperadas, overshoot, hot keys e contadores divergentes."
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
      "27.1 Conceitos e objetivos; 27.2 Chaves, unidades e escopos; 27.3 Fixed window; 27.4 Sliding window; 27.5 Token bucket; 27.6 Leaky bucket e GCRA; 27.7 Concorrência e backpressure; 27.8 Limites locais e globais; 27.9 Estado distribuído; 27.10 Políticas hierárquicas; 27.11 Semântica HTTP; 27.12 Comportamento do cliente; 27.13 Segurança e abuso; 27.14 Dimensionamento; 27.15 Azure APIM; 27.16 Axway e Envoy; 27.17 Observabilidade; 27.18 Testes; 27.19 Troubleshooting; estudos de caso, resumo, exercícios e referências."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.1 Conceitos: rate limit, quota e throttling",
    "id": "27-1-conceitos-rate-limit-quota-e-throttling"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting é uma política de fluxo. Ela estabelece quantas unidades podem ser consumidas durante uma janela curta, por exemplo 20 requisições por segundo ou 600 unidades por minuto. Seu papel principal é absorver picos, reduzir rajadas destrutivas e preservar capacidade para outros consumidores. A política pode permitir burst controlado sem abandonar uma taxa média sustentável."
  },
  {
    "kind": "paragraph",
    "text": "Quota é uma política de orçamento. Ela contabiliza consumo em horizonte maior: chamadas por dia, bytes por mês, transações por ciclo de faturamento ou tokens de IA por assinatura. Uma quota pode ser renovável, vitalícia ou vinculada a um plano comercial. Diferentemente do rate limit, ela não precisa controlar a forma temporal fina do tráfego; um consumidor pode gastar rapidamente uma quota ainda disponível."
  },
  {
    "kind": "paragraph",
    "text": "Throttling é a ação de contenção. A forma mais comum em APIs é responder 429 Too Many Requests, mas sistemas internos podem enfileirar, atrasar, reduzir qualidade, limitar paralelismo ou encaminhar para capacidade alternativa. A escolha precisa considerar latência, idempotência e custo. Atrasar requests síncronos por muito tempo costuma apenas transferir pressão para sockets, threads e filas."
  },
  {
    "kind": "paragraph",
    "text": "Esses controles não substituem capacity planning, WAF, proteção DDoS ou autorização. Rate limit por IP, por exemplo, pode reduzir força bruta, mas é frágil diante de NAT compartilhado, botnets ou rotação de origem. Uma defesa robusta combina identidade, comportamento, reputação e limites em camadas."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - A política deve separar orçamento, velocidade e reação.",
    "headers": [
      "Conceito",
      "Pergunta respondida",
      "Horizonte típico",
      "Reação"
    ],
    "rows": [
      [
        "Rate limit",
        "Com que frequência pode consumir?",
        "Segundos ou minutos.",
        "429, atraso curto ou shed."
      ],
      [
        "Quota",
        "Quanto pode consumir no total?",
        "Horas, dias, meses ou vida útil.",
        "Bloqueio até renovação ou upgrade."
      ],
      [
        "Throttling",
        "O que fazer quando exceder?",
        "Imediato e operacional.",
        "Rejeitar, enfileirar, degradar ou redirecionar."
      ],
      [
        "Concurrency limit",
        "Quantos trabalhos podem ficar em voo?",
        "Enquanto duram as operações.",
        "Não admitir mais trabalho."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.2 Chaves, unidades de custo e escopos",
    "id": "27-2-chaves-unidades-de-custo-e-escopos"
  },
  {
    "kind": "paragraph",
    "text": "A chave identifica o sujeito contabilizado. Limitar apenas por endereço IP é simples, porém pode penalizar milhares de usuários atrás de um mesmo NAT e permitir evasão por rotação de IP. Depois da autenticação, chaves como subscription key, client_id, subject, tenant ou certificado mTLS costumam representar melhor o consumidor. Em fluxos B2B, uma composição tenant + aplicação + operação oferece isolamento mais preciso."
  },
  {
    "kind": "paragraph",
    "text": "A unidade de custo define o que o contador representa. O modelo mais simples atribui custo 1 a cada chamada. Em APIs heterogêneas, essa igualdade é enganosa. Uma consulta por ID e uma exportação de milhões de registros não deveriam gastar a mesma unidade. É possível ponderar por operação, tamanho de payload, linhas processadas, duração estimada, chamadas downstream ou tokens consumidos."
  },
  {
    "kind": "paragraph",
    "text": "O escopo indica onde a regra vale: global, produto, API, operação, região, tenant ou backend. Regras sobrepostas precisam de semântica explícita. Uma chamada pode passar pelo limite global de proteção, pelo limite do plano comercial e por um limite específico de operação cara. Em geral, a requisição deve ser recusada quando qualquer orçamento obrigatório estiver esgotado."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - A chave correta depende da fronteira de responsabilidade.",
    "headers": [
      "Chave",
      "Vantagem",
      "Risco / cuidado"
    ],
    "rows": [
      [
        "IP de origem",
        "Disponível antes da autenticação.",
        "NAT compartilhado, proxies e evasão por IP."
      ],
      [
        "Subscription key",
        "Alinha consumo ao plano de API.",
        "Chave compartilhada por muitos usuários."
      ],
      [
        "client_id",
        "Identifica aplicação OAuth.",
        "Não separa usuários da mesma aplicação."
      ],
      [
        "sub / usuário",
        "Fairness por usuário final.",
        "Exige token validado e identidade estável."
      ],
      [
        "tenant + operação",
        "Isolamento corporativo e de custo.",
        "Cardinalidade e hot keys."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.3 Fixed window counter",
    "id": "27-3-fixed-window-counter"
  },
  {
    "kind": "paragraph",
    "text": "O fixed window counter divide o tempo em blocos discretos. Uma regra de 100 chamadas por minuto mantém um contador para cada minuto do relógio ou para cada período iniciado em um instante de referência. A implementação é simples: calcular a janela, incrementar atomicamente a chave e comparar com o limite. O estado expira ao fim do período."
  },
  {
    "kind": "paragraph",
    "text": "A principal limitação é o burst de fronteira. Um consumidor pode enviar 100 chamadas nos últimos segundos de uma janela e outras 100 imediatamente no início da seguinte. Embora cada janela respeite o limite, a infraestrutura observa 200 chamadas em poucos segundos. Esse comportamento é aceitável em alguns produtos e perigoso em backends sensíveis a rajadas."
  },
  {
    "kind": "paragraph",
    "text": "Fixed window é adequado para quotas e orçamentos longos, em que simplicidade e auditabilidade importam mais do que suavidade. Para proteção de curtíssimo prazo, costuma ser combinado com token bucket, sliding window ou limite de concorrência."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo conceitual de fixed window\nwindow_id = floor(now_epoch_seconds / window_seconds)\nkey = \"rl:\" + consumer_id + \":\" + window_id\ncount = atomic_increment(key)\nset_expiry_if_first_increment(key, window_seconds)\nallow = count <= limit"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.4 Sliding window: log exato e contador aproximado",
    "id": "27-4-sliding-window-log-exato-e-contador-aproximado"
  },
  {
    "kind": "paragraph",
    "text": "A sliding window considera o intervalo imediatamente anterior ao instante atual. Na variante de log, cada consumo registra um timestamp; antes de decidir, o sistema remove eventos antigos e conta os restantes. A precisão é alta, mas o estado cresce com o tráfego e as operações sobre coleções temporais podem ficar caras."
  },
  {
    "kind": "paragraph",
    "text": "A variante de contador aproxima a janela usando o contador do período atual e uma fração ponderada do período anterior. Ela reduz memória e custo, mas pode admitir pequena imprecisão. Produtos distribuídos ainda acumulam atraso de propagação e concorrência, portanto a palavra \"sliding\" não significa exatidão matemática absoluta."
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve ser orientada pelo risco. Login e operações antifraude podem justificar maior precisão. APIs de leitura de alto volume podem preferir aproximação rápida. O importante é documentar a tolerância a overshoot e validar o comportamento sob burst real."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Precisão, custo e burst são trade-offs inseparáveis.",
    "headers": [
      "Algoritmo",
      "Estado",
      "Precisão",
      "Comportamento"
    ],
    "rows": [
      [
        "Sliding log",
        "Timestamp por evento.",
        "Alta.",
        "Janela móvel exata, custo elevado."
      ],
      [
        "Sliding counter",
        "Contadores de janelas adjacentes.",
        "Aproximada.",
        "Suaviza fronteiras com pouco estado."
      ],
      [
        "Fixed window",
        "Um contador por período.",
        "Exata por bloco, não por intervalo móvel.",
        "Pode duplicar burst na fronteira."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.5 Token bucket",
    "id": "27-5-token-bucket"
  },
  {
    "kind": "paragraph",
    "text": "O token bucket modela capacidade acumulável. Um balde possui capacidade máxima B e recebe tokens à taxa r. Cada requisição consome c tokens. Se houver saldo, ela passa imediatamente; se não houver, a política aplica throttling. Enquanto o consumidor fica ocioso, tokens se acumulam até B, permitindo uma rajada inicial controlada."
  },
  {
    "kind": "paragraph",
    "text": "A taxa r governa o consumo médio sustentável, enquanto B define o burst tolerado. Um bucket com capacidade 20 e reposição de 10 tokens por segundo pode aceitar 20 chamadas instantâneas após ociosidade e, em seguida, sustentar aproximadamente 10 por segundo. Operações caras podem consumir mais de um token, transformando o algoritmo em limitador ponderado."
  },
  {
    "kind": "paragraph",
    "text": "Em implementação distribuída, reposição contínua costuma ser calculada de forma preguiçosa: ao receber uma requisição, o sistema determina quantos tokens deveriam ter sido repostos desde a última atualização, limita ao máximo B e realiza consumo atômico. Relógios, concorrência e particionamento precisam ser tratados cuidadosamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/pt/figure-01-token-bucket.svg",
    "alt": "Token bucket com capacidade de burst e taxa média sustentável",
    "caption": "Figura 1 - O token bucket permite burst limitado sem abandonar a taxa média configurada."
  },
  {
    "kind": "code",
    "text": "Lógica conceitual de reposição preguiçosa\nelapsed = now - last_refill\navailable = min(B, stored_tokens + elapsed * refill_rate)\nif available >= request_cost:\n    available -= request_cost\n    decision = ALLOW\nelse:\n    decision = THROTTLE"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.6 Leaky bucket e GCRA",
    "id": "27-6-leaky-bucket-e-gcra"
  },
  {
    "kind": "paragraph",
    "text": "O leaky bucket representa uma fila que drena em taxa aproximadamente constante. As requisições entram no recipiente e saem de forma suavizada. Quando a fila está cheia, novas entradas são rejeitadas. Ao contrário do token bucket, cujo objetivo clássico é permitir burst até a capacidade acumulada, o leaky bucket enfatiza regularidade da saída."
  },
  {
    "kind": "paragraph",
    "text": "Essa suavização pode ser útil em integração assíncrona, mas em APIs síncronas o enfileiramento precisa ser limitado. Manter requests esperando ocupa conexões, memória e prazos de timeout. Muitas vezes é melhor rejeitar cedo com informação clara para que o cliente tente novamente de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "O Generic Cell Rate Algorithm, ou GCRA, representa uma forma matemática de verificar conformidade temporal por meio de um tempo teórico de chegada. Ele é eficiente e aparece em implementações que precisam modelar taxa e tolerância a burst sem armazenar cada evento. Para o arquiteto, o ponto central é compreender que diferentes algoritmos podem produzir decisões distintas com o mesmo rótulo comercial de \"10 por segundo\"."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.7 Limite de concorrência, backpressure e load shedding",
    "id": "27-7-limite-de-concorrencia-backpressure-e-load-shedding"
  },
  {
    "kind": "paragraph",
    "text": "Rate por unidade de tempo não controla diretamente trabalho em voo. Dez chamadas por segundo podem ser seguras se durarem 20 ms e desastrosas se cada uma permanecer 30 segundos. O limite de concorrência protege threads, conexões, pools e filas ao restringir quantas operações podem executar simultaneamente."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure é a capacidade de um componente sinalizar que o consumidor deve reduzir o ritmo. Em HTTP síncrono, 429, 503 e Retry-After são sinais comuns. Em streaming e mensageria, o protocolo pode controlar janelas, créditos ou confirmação. Load shedding é a recusa deliberada de trabalho para preservar a saúde do sistema; deve priorizar operações críticas e rejeitar cedo antes de consumir recursos caros."
  },
  {
    "kind": "paragraph",
    "text": "Limitadores adaptativos observam latência, filas e erros para ajustar a admissão. Eles podem reagir melhor a capacidade variável, mas exigem estabilidade de controle e métricas confiáveis. Uma política adaptativa mal calibrada oscila, reduz throughput desnecessariamente ou aumenta carga no momento errado."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Limitar frequência e limitar concorrência resolvem problemas diferentes.",
    "headers": [
      "Controle",
      "Variável protegida",
      "Quando usar"
    ],
    "rows": [
      [
        "Rate limit",
        "Chegadas por tempo.",
        "Burst e fairness de consumo."
      ],
      [
        "Concurrency limit",
        "Trabalho simultâneo.",
        "Operações lentas, pools e chamadas downstream."
      ],
      [
        "Queue bound",
        "Itens aguardando.",
        "Absorver microbursts com espera limitada."
      ],
      [
        "Load shedding",
        "Capacidade global.",
        "Degradação severa e preservação do núcleo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.8 Limites locais e globais",
    "id": "27-8-limites-locais-e-globais"
  },
  {
    "kind": "paragraph",
    "text": "Um limite local mantém estado dentro de cada gateway, processo ou conexão. Ele é rápido, resiliente a falhas de rede e adequado para contenção inicial. Entretanto, em um cluster com N instâncias, um limite de 100 por segundo em cada nó pode permitir aproximadamente N vezes esse valor quando o tráfego é distribuído."
  },
  {
    "kind": "paragraph",
    "text": "Um limite global consulta ou atualiza estado compartilhado. Ele oferece visão consolidada por consumidor, produto ou tenant, mas adiciona latência e dependência de um serviço crítico. O desenho precisa escolher comportamento em falha: fail-open preserva disponibilidade e pode exceder o limite; fail-closed preserva proteção e pode bloquear tráfego legítimo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/pt/figure-02-local-global.svg",
    "alt": "Limites locais por instância e limite global compartilhado",
    "caption": "Figura 2 - Limites locais são rápidos; limites globais coordenam o conjunto, com custo de consistência e disponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Contadores distribuídos enfrentam concorrência, replicação e particionamento. Se cada nó mantém cache e sincroniza periodicamente, múltiplos nós podem admitir requests baseados no mesmo saldo. Se toda decisão depende de escrita síncrona em um armazenamento central, a precisão melhora, mas a latência e o risco de gargalo aumentam."
  },
  {
    "kind": "paragraph",
    "text": "Operações atômicas, scripts executados no servidor de dados, sharding por chave e expiração são técnicas comuns. Hot keys surgem quando muitos requests compartilham a mesma identidade, como um grande parceiro ou um limite global. Distribuir essa chave sem perder semântica exige particionamento de orçamento, contadores aproximados ou agregação hierárquica."
  },
  {
    "kind": "paragraph",
    "text": "Overshoot deve ser tratado como propriedade de projeto. A documentação do produto pode advertir que limites distribuídos não são completamente precisos. A arquitetura precisa definir a tolerância: uma API de consulta pode aceitar pequena ultrapassagem; uma quota financeira ou de licenciamento pode exigir reconciliação posterior e trilha auditável."
  },
  {
    "kind": "subhead",
    "text": "Não prometa precisão impossível"
  },
  {
    "kind": "paragraph",
    "text": "Em clusters e regiões distribuídas, \"100 chamadas\" pode significar uma meta operacional com tolerância. Registre o algoritmo, o ponto de contabilização, a frequência de sincronização e o máximo overshoot aceito."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.10 Políticas hierárquicas e múltiplas janelas",
    "id": "27-10-politicas-hierarquicas-e-multiplas-janelas"
  },
  {
    "kind": "paragraph",
    "text": "Uma única janela raramente é suficiente. Um consumidor pode respeitar 60 mil chamadas por hora e ainda enviar todas em poucos segundos. Por isso, políticas maduras combinam janelas: 50 por segundo, 1.000 por minuto e 50 mil por dia. Cada uma protege um aspecto diferente: burst, estabilidade e orçamento."
  },
  {
    "kind": "paragraph",
    "text": "Limites hierárquicos distribuem capacidade em níveis. Pode existir um orçamento global da plataforma, uma parcela por produto, outra por tenant e uma regra por usuário. Esse desenho evita que um grande consumidor esgote toda a capacidade, mas cria risco de subutilização se reservas forem rígidas. Em sistemas avançados, capacidade ociosa pode ser emprestada com limites máximos e prioridade."
  },
  {
    "kind": "paragraph",
    "text": "A composição precisa ser explicada ao consumidor. O limite mais próximo de esgotar pode ser mais útil do que publicar dezenas de contadores. Internamente, métricas devem indicar qual regra venceu a decisão, sua chave e seu escopo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/pt/figure-03-layered-control.svg",
    "alt": "Políticas de contenção em camadas desde a borda até o backend",
    "caption": "Figura 3 - Contenção em camadas reduz custo e melhora a precisão da chave usada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.11 Semântica HTTP: 429, Retry-After e campos de limite",
    "id": "27-11-semantica-http-429-retry-after-e-campos-de-limite"
  },
  {
    "kind": "paragraph",
    "text": "O status 429 Too Many Requests informa que o cliente enviou solicitações em excesso dentro de um período. A resposta deve ser produzida pelo componente que conhece a política e precisa ser distinguida de 401, 403, 503 e timeouts. Um 429 sem identificação da regra, sem correlação e sem orientação de recuperação transforma um mecanismo de proteção em fonte de incidentes."
  },
  {
    "kind": "paragraph",
    "text": "O campo Retry-After pode transportar um número de segundos ou uma data HTTP. O cliente deve tratá-lo como orientação mínima antes de repetir, considerando relógio, idempotência e orçamento próprio. Quando vários limites se aplicam, a resposta deve refletir a restrição efetiva, não apenas o contador mais fácil de obter."
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos X-RateLimit-* são amplamente usados, mas não possuem semântica universal. Em maio de 2026, o trabalho do IETF sobre campos RateLimit ainda é Internet-Draft e define RateLimit-Policy e RateLimit; portanto, deve ser tratado como especificação em evolução. A adoção precisa ser versionada e testada com clientes, sem apresentar o draft como RFC publicado."
  },
  {
    "kind": "code",
    "text": "Resposta recomendada ao exceder um limite de curto prazo\nHTTP/1.1 429 Too Many Requests\nContent-Type: application/problem+json\nRetry-After: 20\n{\n  \"type\": \"https://api.empresa.example/problems/rate-limit\",\n  \"title\": \"Limite de chamadas excedido\",\n  \"status\": 429,\n  \"detail\": \"Aguarde antes de repetir a operação.\",\n  \"policy\": \"cliente-leitura-burst\",\n  \"traceId\": \"7b2f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.12 Comportamento correto do cliente",
    "id": "27-12-comportamento-correto-do-cliente"
  },
  {
    "kind": "paragraph",
    "text": "O cliente deve respeitar Retry-After quando presente e aplicar exponential backoff com jitter para evitar que milhares de instâncias retornem ao mesmo tempo. O backoff precisa ter limite máximo, número de tentativas e orçamento de tempo. Retry infinito converte uma indisponibilidade curta em tempestade prolongada."
  },
  {
    "kind": "paragraph",
    "text": "Operações não idempotentes exigem cuidado. Se o cliente não sabe se o servidor processou a requisição, repetir pode duplicar efeitos. Idempotency-Key, identificadores de negócio e consulta de estado reduzem esse risco. Para 429 recebido antes do backend, a operação provavelmente não foi executada, mas essa propriedade deve ser garantida e documentada pelo gateway."
  },
  {
    "kind": "paragraph",
    "text": "Clientes cooperativos também podem controlar sua própria taxa antes de receber rejeições. Um SDK pode implementar token bucket local baseado no contrato publicado. Esse comportamento reduz latência desperdiçada, mas não elimina o enforcement do servidor, porque clientes podem estar desatualizados, mal configurados ou maliciosos."
  },
  {
    "kind": "code",
    "text": "Backoff exponencial com jitter - pseudocódigo\ndelay = retry_after if present else min(base * 2**attempt, max_delay)\ndelay = random_between(delay * 0.5, delay * 1.5)\nsleep(delay)\nretry_only_if(operation_is_safe_or_idempotent)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.13 Segurança, abuso e limites por fluxo sensível",
    "id": "27-13-seguranca-abuso-e-limites-por-fluxo-sensivel"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting é um controle importante contra brute force, credential stuffing, enumeração, scraping e abuso de fluxos de negócio. Contudo, o limite precisa ser específico ao ataque. Login pode combinar IP, conta e dispositivo; recuperação de senha deve limitar solicitações por identidade e destino; consulta de estoque pode exigir regra por produto e aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Limites excessivamente previsíveis podem ser usados para descobrir identificadores válidos ou provocar negação de serviço lógica contra uma vítima. Bloquear uma conta depois de poucas tentativas permite que um atacante impeça o acesso legítimo. Mecanismos progressivos, desafios adicionais e sinais de risco costumam ser melhores que bloqueios absolutos."
  },
  {
    "kind": "paragraph",
    "text": "A contagem deve acontecer cedo o suficiente para proteger recursos, mas depois da validação necessária para obter a chave correta. Uma camada grosseira por IP pode preceder autenticação; uma camada fina por usuário vem depois da validação do token. Payloads enormes precisam de limites de conexão e tamanho antes de qualquer parsing caro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.14 Dimensionamento de limites",
    "id": "27-14-dimensionamento-de-limites"
  },
  {
    "kind": "paragraph",
    "text": "Um número não deve nascer de preferência pessoal. O processo começa pela capacidade sustentável do backend, SLO de latência, margem de segurança e padrões de burst. A capacidade útil precisa descontar tráfego interno, retries, health checks, tarefas batch e falhas parciais. Depois, ela é distribuída por classes de consumidor e operações."
  },
  {
    "kind": "paragraph",
    "text": "Percentis de tráfego são mais úteis do que médias isoladas. É necessário observar requests por segundo, concorrência, duração, bytes, taxa de erro e fan-out downstream. Um endpoint que gera cinco chamadas internas deve consumir orçamento compatível. Em APIs monetizadas, o plano comercial precisa continuar respeitando a capacidade física."
  },
  {
    "kind": "paragraph",
    "text": "A implantação deve começar em modo observação ou shadow, registrando decisões sem bloquear. Em seguida, aplica-se enforcement gradual por percentual, ambiente ou consumidor piloto. Alertas precisam distinguir aproximação do limite, rejeição esperada por contrato e anomalia de plataforma."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Limites devem derivar de capacidade observada e política de negócio.",
    "headers": [
      "Entrada",
      "Pergunta de projeto",
      "Evidência"
    ],
    "rows": [
      [
        "Capacidade",
        "Quanto o backend sustenta com SLO?",
        "Teste de carga e métricas de produção."
      ],
      [
        "Burst",
        "Qual rajada é tolerável?",
        "Token bucket, fila e pool downstream."
      ],
      [
        "Fairness",
        "Como dividir entre consumidores?",
        "Planos, tenants, prioridades e histórico."
      ],
      [
        "Margem",
        "Quanto reservar para falhas e retries?",
        "Cenários degradados e capacity model."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.15 Azure API Management",
    "id": "27-15-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management oferece políticas por assinatura e por chave. rate-limit e rate-limit-by-key controlam velocidade; quota e quota-by-key controlam volume de chamadas e/ou largura de banda. A chave customizada pode ser construída por expressão a partir de IP, subject do JWT, tenant, operação ou outro atributo confiável."
  },
  {
    "kind": "paragraph",
    "text": "A implementação varia por tier. A documentação atual informa sliding window nos tiers clássicos e token bucket nos tiers v2. Ela também adverte que rate limiting distribuído não é completamente preciso. Em múltiplas regiões, os contadores de rate limit são aplicados por gateway regional, enquanto quotas operam de modo global no nível da instância."
  },
  {
    "kind": "paragraph",
    "text": "A ordem da policy importa. Para usar identidade do JWT como counter-key, o token deve ser validado antes. Increment-condition pode contar apenas respostas específicas, mas avaliações no outbound alteram o momento da atualização. Named values e fragments ajudam a padronizar limites, porém chaves iguais em escopos diferentes precisam de parâmetros coerentes."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de policy no Azure API Management"
  },
  {
    "kind": "code",
    "text": "<inbound>\n  <base />\n  <validate-jwt header-name=\"Authorization\" />\n  <rate-limit-by-key\n      calls=\"120\"\n      renewal-period=\"60\"\n      counter-key=\"@(context.Principal?.Identity?.Name ?? context.Request.IpAddress)\"\n      remaining-calls-header-name=\"X-Calls-Remaining\" />\n</inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.16 Axway API Gateway, Envoy e proxies modernos",
    "id": "27-16-axway-api-gateway-envoy-e-proxies-modernos"
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, o Throttling filter pode ser inserido no policy circuit para limitar chamadas a serviços e consumidores. O desenho deve definir a chave a partir do message context e, quando necessário, usar KPS para dados de configuração ou associação com planos. A posição do filtro determina quais custos já foram pagos e quais atributos estão disponíveis."
  },
  {
    "kind": "paragraph",
    "text": "Em topologias com múltiplas instâncias, é essencial verificar onde o estado do algoritmo reside e como os contadores são compartilhados. Uma policy visualmente idêntica pode ter comportamento diferente se cada gateway aplicar seu próprio contador. Logs e Traffic Monitor devem registrar a chave derivada, a regra e a decisão sem expor credenciais."
  },
  {
    "kind": "paragraph",
    "text": "Envoy oferece rate limit local baseado em token bucket e um filtro global que consulta um rate limit service por descriptors. Descriptors permitem combinar atributos de rota, origem, método e metadata. O arquiteto deve decidir fail-open ou fail-closed quando o serviço global falha e medir a latência adicional da decisão."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.17 Observabilidade e indicadores",
    "id": "27-17-observabilidade-e-indicadores"
  },
  {
    "kind": "paragraph",
    "text": "Contadores de 429 são apenas o começo. A plataforma precisa medir requests avaliados, permitidos, limitados, não aplicados em shadow, erros do serviço de decisão e fail-open. Métricas devem ser segmentadas por policy, operação, produto, região e classe de consumidor, sem criar cardinalidade incontrolável."
  },
  {
    "kind": "paragraph",
    "text": "A utilização do orçamento é mais informativa que a rejeição final. Percentual de tokens disponíveis, tempo até renovação, concorrência atual e aproximação de quota permitem alertar antes do impacto. Hot keys, consumidores dominantes e operações caras precisam de painéis específicos."
  },
  {
    "kind": "paragraph",
    "text": "Traces devem mostrar a decisão do limitador como span ou evento, incluindo política e duração da consulta, mas evitando a chave bruta quando ela contém identidade sensível. Logs de auditoria registram mudanças de configuração, owner, justificativa, rollout e rollback."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Métricas devem explicar proteção, fairness e falhas do mecanismo.",
    "headers": [
      "Métrica",
      "Interpretação"
    ],
    "rows": [
      [
        "allowed / rate limited",
        "Volume aceito e rejeitado por regra."
      ],
      [
        "remaining ratio",
        "Proximidade de esgotamento do orçamento."
      ],
      [
        "decision latency",
        "Custo do limitador no caminho crítico."
      ],
      [
        "overshoot estimado",
        "Diferença entre contrato e consumo observado."
      ],
      [
        "hot key concentration",
        "Dependência de poucos consumidores ou tenants."
      ],
      [
        "failure mode allowed",
        "Tráfego liberado por falha do serviço de decisão."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Testes precisam reproduzir padrão temporal, não apenas volume total. Casos mínimos incluem tráfego abaixo do limite, burst instantâneo, fronteira de janela, múltiplas chaves, múltiplos nós, expiração, mudança de configuração e falha do armazenamento. O relógio usado pelo teste deve ser controlado ou registrado com precisão."
  },
  {
    "kind": "paragraph",
    "text": "Valide a distribuição dos status e a orientação ao cliente. Retry-After deve ser coerente com a janela efetiva. Teste se requests recusados chegam ou não ao backend, se o contador é incrementado por respostas de erro e se operações com pesos diferentes consomem as unidades esperadas."
  },
  {
    "kind": "paragraph",
    "text": "Em ambiente autorizado, execute carga progressiva e compare tráfego gerado, aceito e observado no backend. Um limitador aparentemente correto no gateway pode falhar por retry automático, múltiplas regiões ou balanceamento desigual. O teste deve incluir correlação ponta a ponta."
  },
  {
    "kind": "code",
    "text": "Plano de validação temporal\n# Exemplo conceitual de cenário de teste\n1. enviar 8 req/s por 30 s  -> nenhuma rejeição esperada\n2. enviar burst de 30       -> rejeição conforme capacidade do bucket\n3. repetir com 4 identidades -> isolamento entre chaves\n4. distribuir por 3 gateways -> medir overshoot e escopo do contador\n5. derrubar rate-limit service -> validar fail-open/fail-closed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.19 Troubleshooting",
    "id": "27-19-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Quando um consumidor relata 429, primeiro identifique qual componente respondeu. CDN, WAF, ingress, gateway, service mesh e backend podem ter limites independentes. O corpo, headers, trace ID e assinatura visual da resposta ajudam a localizar a origem. Depois, determine a chave efetivamente usada e se ela corresponde à identidade esperada."
  },
  {
    "kind": "paragraph",
    "text": "Rejeições intermitentes podem resultar de múltiplas janelas, contadores regionais, clock skew, hot key, cache de configuração ou retries invisíveis. Um cliente pode enviar uma chamada e uma biblioteca repetir automaticamente, duplicando o consumo. Em HTTP/2, várias streams compartilham uma conexão; limitar por conexão produz semântica muito diferente de limitar por usuário."
  },
  {
    "kind": "paragraph",
    "text": "Se o limite parece não funcionar, verifique ordem da policy, condição de incremento, escopo, chave vazia, fallback para IP e consistência entre instâncias. Em sistemas distribuídos, teste cada nó e região. A ausência de 429 não prova ausência de throttling: o mecanismo pode atrasar, enfileirar ou responder com outro status."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Troubleshooting começa localizando o enforcement e a chave real.",
    "headers": [
      "Sintoma",
      "Hipótese",
      "Evidência"
    ],
    "rows": [
      [
        "Todos compartilham o mesmo limite",
        "Chave vazia ou IP do proxy.",
        "Log da counter-key e cadeia X-Forwarded-For confiável."
      ],
      [
        "Limite multiplica pelo número de nós",
        "Contador local por instância.",
        "Teste fixando rota em cada gateway."
      ],
      [
        "429 após poucas chamadas",
        "Múltiplas policies ou custo ponderado.",
        "Policy ID vencedor e increment-count."
      ],
      [
        "Quota excedida continua aceitando",
        "Propagação/restart ou janela incorreta.",
        "Estado do contador e início do período."
      ],
      [
        "Backend sobrecarrega sem 429",
        "Limite muito alto ou aplicado tarde.",
        "RPS e concorrência antes/depois do gateway."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - API bancária de saldo: limite por usuário impede que uma única sessão degrade os demais, enquanto limite por client_id protege o canal. Uma regra global de concorrência protege o core. O endpoint recebe custo 1; a exportação de extrato recebe custo maior. O gateway retorna 429 antes de chamar o backend e inclui Retry-After."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - Parceiro Open Finance: cada organização possui quota mensal contratual e rate limit de burst. A chave combina software statement, client_id e instituição. mTLS evita que apenas a posse de uma chave permita consumir o orçamento. Métricas separam consumo regulatório, retries e falhas de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - Plataforma de IA: a política controla requests por minuto e tokens processados. Prompts e respostas têm custo variável, portanto o contador é atualizado com consumo real quando disponível. Uma estimativa prévia impede payloads extremos; quota mensal controla custo comercial; concorrência protege GPUs e backends."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting controla velocidade, quota controla orçamento e throttling define a reação ao excesso. A política completa também precisa de chave, unidade, janela, algoritmo, escopo e comportamento de falha."
  },
  {
    "kind": "paragraph",
    "text": "Fixed window é simples, sliding window suaviza fronteiras, token bucket combina taxa média com burst, leaky bucket regulariza saída e limites de concorrência protegem trabalho em voo. Nenhum algoritmo é universalmente superior."
  },
  {
    "kind": "paragraph",
    "text": "Em clusters distribuídos, precisão compete com latência e disponibilidade. Limites locais e globais podem ser combinados, e overshoot deve ser tratado como propriedade mensurável. Respostas 429 e Retry-After permitem cooperação do cliente; backoff, jitter e idempotência evitam tempestades de retries."
  },
  {
    "kind": "paragraph",
    "text": "Gateways como Azure API Management e Axway oferecem policies próprias, enquanto proxies como Envoy distinguem limitadores locais e serviços globais. A configuração precisa ser validada com carga temporal, observabilidade e troubleshooting por chave e escopo."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 28 tratará de API Versioning, relacionando evolução de contratos, compatibilidade, coexistência, depreciação e governança do ciclo de vida."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de projeto",
    "id": "checklist-de-projeto"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "O objetivo do limite está documentado: proteção, fairness, segurança, custo ou plano comercial.",
      "A chave é estável, confiável e compatível com NAT, proxies e identidade.",
      "A unidade de consumo representa o custo real da operação.",
      "Janelas curtas e longas foram combinadas quando necessário.",
      "O algoritmo e a capacidade de burst são conhecidos.",
      "O escopo local, regional ou global está explícito.",
      "Fail-open/fail-closed foi decidido para falhas do serviço de contagem.",
      "429, Retry-After e corpo de erro são coerentes e testáveis.",
      "Clientes possuem orientação de backoff, jitter e idempotência.",
      "Métricas registram policy, decisão, overshoot, hot keys e latência.",
      "O rollout passou por shadow mode e enforcement gradual.",
      "Testes cobrem fronteira de janela, múltiplos nós e mudanças de configuração."
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
      "Diferencie rate limit, quota, throttling e limite de concorrência.",
      "Explique o burst de fronteira do fixed window.",
      "Calcule qualitativamente o comportamento de um token bucket com B=20 e r=5/s.",
      "Compare sliding log e sliding counter.",
      "Proponha chaves para login, API B2B e API multi-tenant.",
      "Explique por que um limite local pode multiplicar em um cluster.",
      "Defina uma estratégia de fail-open/fail-closed para uma API crítica.",
      "Escreva uma resposta 429 com Retry-After e Problem Details.",
      "Proponha múltiplas janelas para proteger burst e quota mensal.",
      "Monte um plano de teste para três gateways e duas regiões.",
      "Descreva métricas para detectar hot keys e overshoot.",
      "Explique quando custo ponderado é superior a contar chamadas."
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
    "caption": "Tabela 8 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Backpressure",
        "Sinalização para que o produtor reduza a velocidade de envio."
      ],
      [
        "Burst",
        "Rajada curta acima da taxa média sustentável."
      ],
      [
        "Counter key",
        "Identificador usado para agrupar e contabilizar consumo."
      ],
      [
        "Fail-closed",
        "Bloquear quando o serviço de decisão falha."
      ],
      [
        "Fail-open",
        "Permitir quando o serviço de decisão falha."
      ],
      [
        "Fixed window",
        "Contagem em períodos discretos."
      ],
      [
        "GCRA",
        "Algoritmo temporal para verificar conformidade de taxa e burst."
      ],
      [
        "Hot key",
        "Chave com volume desproporcional de atualizações."
      ],
      [
        "Leaky bucket",
        "Fila drenada em taxa aproximadamente constante."
      ],
      [
        "Load shedding",
        "Recusa deliberada de trabalho para preservar saúde."
      ],
      [
        "Overshoot",
        "Consumo admitido acima do limite configurado."
      ],
      [
        "Quota",
        "Orçamento acumulado de consumo."
      ],
      [
        "Rate limit",
        "Controle de frequência de consumo."
      ],
      [
        "Retry-After",
        "Campo HTTP que orienta quando repetir."
      ],
      [
        "Sliding window",
        "Janela móvel sobre o intervalo anterior ao instante atual."
      ],
      [
        "Throttling",
        "Ação de contenção aplicada ao exceder uma política."
      ],
      [
        "Token bucket",
        "Algoritmo com capacidade máxima e reposição de tokens."
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
      "IETF. RFC 6585 - Additional HTTP Status Codes, incluindo 429 Too Many Requests.",
      "IETF. RFC 9110 - HTTP Semantics, incluindo Retry-After.",
      "IETF HTTPAPI Working Group. RateLimit header fields for HTTP - Internet-Draft, work in progress.",
      "Microsoft Learn. Azure API Management: rate-limit, rate-limit-by-key, quota e quota-by-key policies.",
      "Microsoft Learn. Advanced request throttling with Azure API Management.",
      "Axway Documentation. API Gateway Throttling filter e policy filter reference.",
      "Envoy Proxy Documentation. Local rate limit e global rate limit filters.",
      "OWASP API Security Top 10 - Unrestricted Resource Consumption e proteção de fluxos sensíveis.",
      "ITU-T / traffic policing literature. Token bucket, leaky bucket e GCRA."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos e semântica de produtos gerenciados podem mudar por tier e versão. O draft de campos RateLimit ainda é trabalho em andamento em 2026. Antes de padronizar headers ou copiar policies, valide a documentação oficial da versão implantada."
  }
];
