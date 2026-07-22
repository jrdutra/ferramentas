import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OBSERVABILITY_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Observabilidade: correlacionar sinais para explicar o comportamento real"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/overview.svg",
    "alt": "Logs, métricas e traces convergindo em contexto compartilhado",
    "caption": "Figura de abertura - Logs, métricas e traces ganham valor quando compartilham contexto e semântica."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Sinais isolados mostram sintomas; correlação por contexto permite reconstruir causa, impacto e dependências."
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
    "text": "Os capítulos anteriores mostraram que uma transação de API pode atravessar DNS, balanceadores, gateways, service meshes, serviços, bancos e sistemas de mensageria. Quando algo falha, nenhum componente isolado enxerga toda a jornada. Observabilidade é a disciplina que transforma sinais emitidos por esses componentes em capacidade de compreender o estado interno do sistema, reconstruir causalidade e avaliar impacto para consumidores e processos de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Logs, métricas e tracing distribuído são frequentemente chamados de pilares da observabilidade. A expressão é útil, mas pode induzir a uma interpretação fragmentada. O valor não está em armazenar três tipos de dados em ferramentas diferentes; está em correlacioná-los por identidade de serviço, ambiente, versão, requisição, trace e contexto de negócio. Uma métrica indica que a latência aumentou, um trace localiza a etapa responsável e um log explica o erro específico."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry fornece APIs, SDKs, convenções semânticas, protocolos e um Collector agnóstico de fornecedor para produzir, processar e exportar telemetria. Ele não substitui o backend de observabilidade. Seu papel é padronizar instrumentação e transporte, reduzindo dependência de agentes proprietários e permitindo que sinais consistentes sejam enviados a diferentes destinos."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo aprofunda a teoria de observabilidade, o desenho de logs e métricas, a anatomia de traces e spans, propagação de contexto, OTLP, Collector, semantic conventions, sampling, exemplars, SLOs, segurança, controle de cardinalidade e troubleshooting. O foco permanece em APIs corporativas, gateways e arquiteturas distribuídas."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Escolha uma única jornada de negócio - por exemplo, criar pagamento - e acompanhe como ela aparece nos três sinais. Pergunte qual identidade descreve o serviço, como o contexto atravessa cada salto, quais atributos são estáveis e como o diagnóstico mudaria se um dos sinais estivesse ausente."
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
      "Diferenciar monitoramento, telemetria, observabilidade, diagnóstico e auditoria.",
      "Projetar logs estruturados, métricas úteis e traces distribuídos com contexto consistente.",
      "Explicar trace, span, span context, resource, event, link, status e baggage.",
      "Compreender W3C Trace Context, traceparent, tracestate e propagação entre protocolos.",
      "Descrever APIs, SDKs, auto-instrumentação, OTLP e OpenTelemetry Collector.",
      "Aplicar semantic conventions e controlar atributos de alta cardinalidade.",
      "Comparar head sampling, parent-based sampling e tail sampling.",
      "Relacionar exemplars, logs e traces a métricas e SLOs.",
      "Desenhar pipelines resilientes, seguros e economicamente sustentáveis.",
      "Diagnosticar falhas de instrumentação e lacunas de correlação em API Gateways e microsserviços."
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
      "32.1 Observabilidade, monitoramento e telemetria",
      "32.2 Sinais e correlação",
      "32.3 Logs estruturados",
      "32.4 Métricas e cardinalidade",
      "32.5 Tracing distribuído e spans",
      "32.6 Propagação de contexto e baggage",
      "32.7 OpenTelemetry: API, SDK e instrumentação",
      "32.8 OTLP e OpenTelemetry Collector",
      "32.9 Semantic conventions e Resources",
      "32.10 Sampling e exemplars",
      "32.11 SLI, SLO, alertas e dashboards",
      "32.12 Observabilidade em gateways, Kubernetes e mensageria",
      "32.13 Segurança, privacidade, custos e troubleshooting",
      "Resumo, checklist, laboratórios, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.1 Observabilidade, monitoramento e telemetria",
    "id": "32-1-observabilidade-monitoramento-e-telemetria"
  },
  {
    "kind": "paragraph",
    "text": "Telemetria é o conjunto de dados emitidos pelo sistema: registros de eventos, medições, traces, perfis e outros sinais. Monitoramento utiliza parte desses dados para acompanhar condições conhecidas, comparar valores com limites e disparar alertas. Observabilidade é uma propriedade mais ampla: a capacidade de inferir o estado interno e responder perguntas novas a partir dos sinais externos disponíveis."
  },
  {
    "kind": "paragraph",
    "text": "Um sistema pode estar intensamente monitorado e ainda ser pouco observável. Dezenas de painéis de CPU, memória e disponibilidade não explicam por que somente consumidores de uma região recebem 502 ao consultar um backend específico. A observabilidade exige contexto, correlação, granularidade adequada e uma arquitetura de dados que permita navegar do sintoma agregado até a evidência individual."
  },
  {
    "kind": "paragraph",
    "text": "Auditoria possui objetivo diferente. Um log de auditoria registra ações relevantes para segurança e conformidade, preservando autoria, integridade e retenção. Ele pode participar de investigações, mas não deve ser confundido com log de diagnóstico. Misturar os dois usos leva a excesso de dados sensíveis em ferramentas operacionais ou a trilhas de auditoria incompletas."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Os conceitos se complementam, mas atendem objetivos diferentes.",
    "headers": [
      "Conceito",
      "Pergunta principal",
      "Exemplo"
    ],
    "rows": [
      [
        "Telemetria",
        "Quais sinais o sistema emitiu?",
        "Logs, métricas, traces e profiles."
      ],
      [
        "Monitoramento",
        "Uma condição conhecida ocorreu?",
        "Taxa de erros acima do limite."
      ],
      [
        "Observabilidade",
        "O que explica este comportamento?",
        "Correlacionar rota, versão, backend e trace."
      ],
      [
        "Auditoria",
        "Quem fez o quê, quando e sob qual autoridade?",
        "Alteração de policy ou acesso a dado sensível."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.2 Logs, métricas e traces como sinais correlacionados",
    "id": "32-2-logs-metricas-e-traces-como-sinais-correlacionados"
  },
  {
    "kind": "paragraph",
    "text": "Logs registram eventos discretos com contexto detalhado. Métricas representam medições agregadas e são eficientes para tendências, alertas e capacidade. Traces representam o caminho causal de uma operação através de processos e serviços. Cada sinal possui custos, modelos de consulta e granularidades distintas; nenhum deles é suficiente para todos os diagnósticos."
  },
  {
    "kind": "paragraph",
    "text": "A correlação depende de atributos comuns. Resource identifica a entidade que produziu a telemetria, como serviço, instância, pod, cluster e ambiente. Trace ID e Span ID conectam logs a uma execução específica. Atributos semânticos padronizam conceitos como método HTTP, rota, sistema de mensageria, banco de dados e código de erro. Sem consistência, painéis e consultas viram conjuntos de exceções por equipe."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry também trata baggage e profiles como sinais ou mecanismos adjacentes. Baggage propaga pares chave-valor pelo contexto distribuído; profiles registram uso de recursos em nível de código e estão evoluindo no ecossistema. Neste capítulo, o foco permanece nos três sinais mais presentes em APIs, sem ignorar que a arquitetura moderna pode correlacioná-los a outros dados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/figure-01-signals.svg",
    "alt": "Logs, métricas e traces correlacionados por contexto compartilhado",
    "caption": "Figura 1 - Os sinais ganham valor operacional quando descrevem a mesma entidade e a mesma jornada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.3 Logs estruturados e eventos operacionais",
    "id": "32-3-logs-estruturados-e-eventos-operacionais"
  },
  {
    "kind": "paragraph",
    "text": "Um log estruturado representa o evento como campos tipados ou pares chave-valor, normalmente serializados em JSON ou no formato nativo do agente. Em vez de escrever apenas \"falha no pagamento\", o registro inclui timestamp, severidade, serviço, ambiente, versão, operação, código de erro, trace_id, span_id e identificadores de negócio permitidos. Essa estrutura melhora filtragem, agregação e correlação automática."
  },
  {
    "kind": "paragraph",
    "text": "Severidade deve refletir a capacidade de ação. DEBUG e TRACE ajudam em ambientes controlados; INFO registra eventos operacionais relevantes; WARN indica degradação ou condição inesperada que não interrompeu a operação; ERROR registra falha de uma ação; FATAL ou equivalente indica incapacidade de continuar. Registrar toda exceção como ERROR cria ruído e destrói o valor do alerta."
  },
  {
    "kind": "paragraph",
    "text": "Logs precisam evitar dados pessoais, tokens, cookies, segredos, payloads completos e números financeiros desnecessários. Mascaramento posterior não é defesa suficiente, porque o dado já pode ter sido transportado ou persistido. O desenho correto começa na origem, com allowlist de campos, classificação de dados, retenção proporcional e acesso restrito."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de evento estruturado e correlacionável"
  },
  {
    "kind": "code",
    "text": "{\n  \"timestamp\": \"2026-07-16T11:42:31.052Z\",\n  \"severity\": \"ERROR\",\n  \"service.name\": \"pagamentos-api\",\n  \"deployment.environment.name\": \"producao\",\n  \"http.route\": \"/pagamentos/{id}/confirmacao\",\n  \"error.type\": \"BackendTimeout\",\n  \"trace_id\": \"4bf92f3577b34da6a3ce929d0e0e4736\",\n  \"span_id\": \"00f067aa0ba902b7\"\n}"
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Logs úteis são desenhados como contrato operacional.",
    "headers": [
      "Boa prática",
      "Motivo",
      "Antipadrão"
    ],
    "rows": [
      [
        "Campos estáveis",
        "Permitem consultas e alertas reutilizáveis.",
        "Mensagens livres com formatos diferentes."
      ],
      [
        "Timestamp confiável",
        "Ordena eventos e facilita correlação.",
        "Relógios divergentes sem sincronização."
      ],
      [
        "Trace e span IDs",
        "Conectam o evento ao trace.",
        "ID de correlação criado apenas em um serviço."
      ],
      [
        "Redação na origem",
        "Evita exposição de segredos e PII.",
        "Remover dados somente no backend de logs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.4 Métricas, instrumentos, agregações e cardinalidade",
    "id": "32-4-metricas-instrumentos-agregacoes-e-cardinalidade"
  },
  {
    "kind": "paragraph",
    "text": "Métricas representam observações numéricas agregadas no tempo. Contadores acumulam eventos, como requests e erros. Histograms distribuem valores, como duração e tamanho de payload, em faixas ou representações adequadas ao backend. Gauges registram um valor atual, como conexões abertas ou profundidade de fila. UpDownCounters representam quantidades que aumentam e diminuem."
  },
  {
    "kind": "paragraph",
    "text": "A escolha do instrumento define como a medição pode ser agregada. Uma duração de request não deve ser registrada apenas como média, porque a média esconde caudas. Histograms permitem consultar percentis e distribuição. Ainda assim, percentis agregados de forma incorreta podem produzir conclusões erradas; é necessário compreender o modelo do backend e a janela temporal."
  },
  {
    "kind": "paragraph",
    "text": "Cardinalidade é o número de combinações distintas de atributos. Adicionar user_id, order_id, URL completa ou trace_id como label de métrica cria séries quase ilimitadas, aumenta memória e custo e pode derrubar o pipeline. Métricas devem usar dimensões limitadas e estáveis, como rota normalizada, método, status class, região e versão. A evidência individual permanece em logs ou traces."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - O instrumento precisa representar a semântica da medição.",
    "headers": [
      "Instrumento / forma",
      "Uso típico",
      "Exemplo em APIs"
    ],
    "rows": [
      [
        "Counter",
        "Eventos que só crescem.",
        "Requests, erros e retries."
      ],
      [
        "Histogram",
        "Distribuição de valores.",
        "Duração, tamanho de request e fila."
      ],
      [
        "Gauge",
        "Valor observado no instante.",
        "Conexões WebSocket abertas."
      ],
      [
        "UpDownCounter",
        "Quantidade que sobe e desce.",
        "Operações em andamento."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Regra de cardinalidade"
  },
  {
    "kind": "paragraph",
    "text": "Atributos de métricas devem responder perguntas agregadas. Identificadores praticamente únicos pertencem a logs e traces. Antes de adicionar uma dimensão, estime quantos valores diferentes ela pode assumir por ambiente, serviço e janela de retenção."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.5 Tracing distribuído, traces e spans",
    "id": "32-5-tracing-distribuido-traces-e-spans"
  },
  {
    "kind": "paragraph",
    "text": "Um trace representa uma operação distribuída, como uma chamada de API que atravessa gateway, serviço, mensageria e banco. Cada etapa é representada por um span, com nome, intervalo de tempo, contexto, atributos, eventos, status e relações com outros spans. A estrutura permite observar latência total, caminho crítico e dependências acionadas."
  },
  {
    "kind": "paragraph",
    "text": "SpanKind descreve o papel do span, como SERVER, CLIENT, PRODUCER, CONSUMER ou INTERNAL. A classificação ajuda a compreender fronteiras e a calcular métricas a partir de traces. Events registram ocorrências pontuais dentro do span, como uma exceção. Links relacionam spans que não possuem uma única hierarquia pai-filho, situação comum em processamento assíncrono e fan-out."
  },
  {
    "kind": "paragraph",
    "text": "O nome do span deve possuir baixa cardinalidade e refletir a operação, não o identificador concreto. Em HTTP, uma rota normalizada é preferível à URL completa. Em mensageria, o nome do destino e a operação ajudam a reconstruir produção e consumo. O trace não deve ser transformado em armazenamento indiscriminado de payloads; atributos e eventos obedecem às mesmas regras de privacidade dos logs."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/figure-02-trace.svg",
    "alt": "Trace distribuído decompondo a latência entre gateway, serviço e dependências",
    "caption": "Figura 2 - Um trace mostra a decomposição da latência e o caminho crítico da transação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.6 Propagação de contexto, W3C Trace Context e Baggage",
    "id": "32-6-propagacao-de-contexto-w3c-trace-context-e-baggage"
  },
  {
    "kind": "paragraph",
    "text": "Para que spans de processos diferentes pertençam ao mesmo trace, o contexto precisa atravessar a fronteira de rede. O W3C Trace Context padroniza os headers traceparent e tracestate para HTTP. traceparent carrega versão, trace ID, parent ID e flags. tracestate transporta informações específicas de fornecedores de maneira interoperável. Instrumentações devem extrair o contexto recebido e injetá-lo nas chamadas de saída."
  },
  {
    "kind": "paragraph",
    "text": "Em gRPC, mensageria e protocolos proprietários, o mesmo princípio é aplicado por metadata ou propriedades de mensagem. A propagação deve respeitar fronteiras de confiança: aceitar IDs externos sem validação ou copiar todo baggage para sistemas internos pode introduzir abuso, vazamento e aumento de payload."
  },
  {
    "kind": "paragraph",
    "text": "Baggage carrega contexto de aplicação em pares chave-valor. Ele não deve transportar segredo, dado pessoal ou informação de alta cardinalidade sem justificativa. Como pode atravessar muitos serviços, um pequeno campo é multiplicado por toda a jornada. Baggage também não substitui autorização; a aplicação não deve confiar em uma claim propagada apenas porque chegou no contexto."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de contexto distribuído"
  },
  {
    "kind": "code",
    "text": "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\ntracestate: vendorname=opaque-value\nbaggage: tenant.tier=premium,region.origin=br-south"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.7 OpenTelemetry: API, SDK e instrumentação",
    "id": "32-7-opentelemetry-api-sdk-e-instrumentacao"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separa API e SDK. A API é usada por bibliotecas e aplicações para criar instrumentos sem depender de uma implementação específica. O SDK implementa sampling, processamento, agregação e exportação. Essa separação permite que uma biblioteca seja instrumentada sem obrigar o consumidor a enviar dados para um fornecedor determinado."
  },
  {
    "kind": "paragraph",
    "text": "Instrumentação manual é adequada para operações de negócio e trechos que a instrumentação genérica não compreende. Auto-instrumentação utiliza agentes, bytecode, monkey patching, eBPF ou mecanismos equivalentes para capturar frameworks e bibliotecas com pouca alteração de código. A combinação costuma ser superior: automática para cobertura de infraestrutura e manual para semântica de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Instrumentar não significa gerar o máximo de dados possível. Cada span, atributo, log e série possui custo. A equipe deve definir uma estratégia de telemetria: quais jornadas são críticas, quais atributos são necessários, quais convenções estão estáveis, quais sinais serão derivados e como a instrumentação será testada junto ao código."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - OpenTelemetry separa contrato de instrumentação e execução do pipeline.",
    "headers": [
      "Componente",
      "Responsabilidade",
      "Exemplo"
    ],
    "rows": [
      [
        "API",
        "Superfície usada pela instrumentação.",
        "Tracer, Meter e Logger APIs."
      ],
      [
        "SDK",
        "Processa e exporta o sinal.",
        "Sampler, SpanProcessor e MetricReader."
      ],
      [
        "Instrumentation Library",
        "Captura um framework ou biblioteca.",
        "HTTP client, JDBC, gRPC ou Kafka."
      ],
      [
        "Auto-instrumentation",
        "Aplica instrumentação sem alteração ampla do código.",
        "Agente Java ou mecanismo equivalente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.8 OTLP e OpenTelemetry Collector",
    "id": "32-8-otlp-e-opentelemetry-collector"
  },
  {
    "kind": "paragraph",
    "text": "OTLP é o protocolo nativo do OpenTelemetry para transportar telemetria. Ele pode operar sobre gRPC ou HTTP e possui modelos para traces, métricas e logs. O protocolo reduz a necessidade de formatos diferentes por fornecedor, mas não elimina decisões de rede, autenticação, compressão, fila, retry e proteção contra perda."
  },
  {
    "kind": "paragraph",
    "text": "O OpenTelemetry Collector recebe, processa e exporta telemetria. Receivers aceitam OTLP e outros formatos. Processors aplicam batch, filtragem, transformação, enriquecimento, sampling e proteção de memória. Exporters enviam dados a backends. Extensions fornecem capacidades auxiliares, como health checks e autenticação. As pipelines são declaradas por sinal."
  },
  {
    "kind": "paragraph",
    "text": "O Collector pode ser implantado como agent próximo da aplicação, gateway central por cluster ou região, ou combinação em camadas. O padrão agent reduz saltos e coleta dados locais; o padrão gateway centraliza processamento e credenciais de backend. O desenho deve considerar disponibilidade, filas persistentes, isolamento por tenant, escalabilidade e risco de tornar o Collector um ponto único de falha."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/figure-03-collector.svg",
    "alt": "OpenTelemetry Collector processando sinais entre receivers, processors e exporters",
    "caption": "Figura 3 - O Collector desacopla aplicações dos backends e aplica processamento em pipelines."
  },
  {
    "kind": "subhead",
    "text": "Exemplo resumido de pipeline do Collector"
  },
  {
    "kind": "code",
    "text": "receivers:\n  otlp:\n    protocols:\n      grpc: {}\n      http: {}\nprocessors:\n  memory_limiter:\n    limit_mib: 1024\n  batch: {}\nexporters:\n  otlp/backend:\n    endpoint: observabilidade.internal:4317\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, batch]\n      exporters: [otlp/backend]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.9 Semantic conventions, Resource e governança de atributos",
    "id": "32-9-semantic-conventions-resource-e-governanca-de-atributos"
  },
  {
    "kind": "paragraph",
    "text": "Semantic conventions definem nomes, tipos e significados comuns para atributos, span names, métricas e unidades. Sem essas convenções, cada equipe poderia registrar método HTTP como method, httpMethod ou verb, inviabilizando dashboards corporativos. A padronização permite consultar serviços escritos em linguagens diferentes com a mesma lógica."
  },
  {
    "kind": "paragraph",
    "text": "Resource descreve a entidade que produziu a telemetria. Atributos como service.name, service.version, deployment.environment.name, host, container e Kubernetes ajudam a localizar a origem. Resource não deve ser confundido com atributos da operação: service.name descreve o emissor; http.route descreve o request."
  },
  {
    "kind": "paragraph",
    "text": "Nem todas as semantic conventions possuem o mesmo nível de estabilidade. A governança deve registrar a versão adotada, acompanhar mudanças experimentais e impedir renomeações silenciosas. OTel Weaver e ferramentas de schema podem ajudar organizações a validar contratos de telemetria, mas a disciplina começa com um catálogo claro de atributos permitidos."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Convenções semânticas tornam a telemetria interoperável.",
    "headers": [
      "Categoria",
      "Exemplos de atributos",
      "Cuidado"
    ],
    "rows": [
      [
        "Resource",
        "service.name, service.version, k8s.cluster.name",
        "Valores estáveis por entidade."
      ],
      [
        "HTTP",
        "http.request.method, http.route, http.response.statuscode",
        "Usar rota normalizada."
      ],
      [
        "RPC",
        "rpc.system, rpc.service, rpc.method",
        "Acompanhar estabilidade da convenção."
      ],
      [
        "Mensageria",
        "messaging.system, destination e operation",
        "Evitar IDs únicos como labels."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.10 Sampling, perda controlada e preservação de traces úteis",
    "id": "32-10-sampling-perda-controlada-e-preservacao-de-traces-uteis"
  },
  {
    "kind": "paragraph",
    "text": "Sampling reduz volume de traces. Head sampling decide no início, usando probabilidade, parent context ou regras locais. É barato e rápido, mas não conhece o resultado final. Um erro raro pode ser descartado antes de acontecer. Parent-based sampling ajuda a manter coerência entre spans filhos e a decisão do trace."
  },
  {
    "kind": "paragraph",
    "text": "Tail sampling decide após reunir spans suficientes no Collector ou backend. Ele pode preservar traces com erro, alta latência ou atributos específicos. Em contrapartida, exige memória, espera, roteamento consistente de spans do mesmo trace e planejamento de capacidade. Uma implantação distribuída sem afinidade por trace pode tomar decisões incompletas."
  },
  {
    "kind": "paragraph",
    "text": "A política deve refletir objetivos: manter 100% de erros, traces acima do SLO, amostras representativas por rota e pequena porcentagem do tráfego saudável. Sampling não corrige telemetria mal desenhada. Mesmo traces descartados podem contribuir para métricas derivadas, dependendo do ponto em que a agregação ocorre."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/figure-04-sampling.svg",
    "alt": "Comparação entre head sampling e tail sampling",
    "caption": "Figura 4 - Head e tail sampling possuem custos e capacidades de decisão diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.11 Exemplars e correlação entre métricas, logs e traces",
    "id": "32-11-exemplars-e-correlacao-entre-metricas-logs-e-traces"
  },
  {
    "kind": "paragraph",
    "text": "Exemplar associa uma observação de métrica a um trace ou contexto representativo. Ao observar um bucket de alta latência, o operador pode abrir um trace real que contribuiu para aquele valor. Essa navegação reduz o salto entre visão agregada e evidência individual, especialmente em incidentes de cauda de latência."
  },
  {
    "kind": "paragraph",
    "text": "Logs também podem carregar trace_id e span_id. A correlação ideal permite navegar de um alerta para a série, da série para um exemplar, do exemplar para o trace e do span para logs da mesma execução. Essa experiência depende de instrumentação consistente, sincronização de tempo, retenção compatível e integração entre backends."
  },
  {
    "kind": "paragraph",
    "text": "A correlação não deve ser usada para copiar todos os dados para todos os sinais. Métricas continuam agregadas; traces continuam seletivos; logs continuam eventos. O objetivo é manter chaves de navegação e semântica comum, preservando as vantagens econômicas e operacionais de cada modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.12 SLI, SLO, orçamento de erro e alertas",
    "id": "32-12-sli-slo-orcamento-de-erro-e-alertas"
  },
  {
    "kind": "paragraph",
    "text": "SLI é uma medição do comportamento observado, como proporção de requests válidos concluídos com sucesso abaixo de um limite de latência. SLO define o alvo para uma janela, por exemplo 99,9% em 30 dias. O orçamento de erro representa a quantidade de falhas tolerada antes de ultrapassar o objetivo. Essa abordagem conecta telemetria à expectativa do usuário."
  },
  {
    "kind": "paragraph",
    "text": "Alertas baseados apenas em infraestrutura produzem muitos falsos positivos e falsos negativos. CPU alta pode ser normal; CPU baixa pode coexistir com indisponibilidade completa por erro de DNS. Alertas de burn rate observam quão rapidamente o orçamento de erro é consumido e podem combinar janelas curta e longa para equilibrar velocidade e estabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Dashboards devem seguir perguntas operacionais. Para APIs, as golden signals - latência, tráfego, erros e saturação - são um bom ponto de partida. Contudo, a rota, o consumidor, a região, a versão e o backend precisam ser dimensões controladas. Painéis sem owner, SLO e ação associada viram decoração."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/pt/figure-05-slo.svg",
    "alt": "Telemetria transformada em SLI, SLO e alerta de burn rate",
    "caption": "Figura 5 - Telemetria só se transforma em confiabilidade quando alimenta objetivos e decisões."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.13 Observabilidade em API Gateways, Kubernetes e mensageria",
    "id": "32-13-observabilidade-em-api-gateways-kubernetes-e-mensageria"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway deve registrar a visão de borda e a visão de upstream separadamente. Duração total, tempo até o backend, status produzido pelo gateway, status do upstream, política que falhou, rota, consumidor e trace context são evidências diferentes. Um 502 precisa indicar se houve falha de DNS, connect timeout, TLS, reset ou resposta inválida do backend."
  },
  {
    "kind": "paragraph",
    "text": "Em Kubernetes, Resources e atributos de infraestrutura conectam o serviço lógico a cluster, namespace, workload, pod, container e nó. O Collector pode enriquecer telemetria com metadados do ambiente. O desenho precisa tolerar pods efêmeros, rollouts e mudanças de IP sem tratar a instância como identidade permanente."
  },
  {
    "kind": "paragraph",
    "text": "Em mensageria, causalidade pode não formar uma árvore simples. Produção, armazenamento, consumo, retries e DLQ ocorrem em tempos diferentes. Links e atributos semânticos ajudam a relacionar mensagens. Métricas de lag, idade da mensagem, taxa de redelivery e profundidade de fila complementam traces, mas precisam ser interpretadas dentro da semântica do broker."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Cada camada possui sinais próprios, mas a jornada precisa permanecer correlacionável.",
    "headers": [
      "Camada",
      "Métricas essenciais",
      "Evidência detalhada"
    ],
    "rows": [
      [
        "Gateway",
        "Requests, latência, erros, upstream time, TLS failures.",
        "Trace por policy e logs de roteamento."
      ],
      [
        "Kubernetes",
        "CPU, memória, restarts, throttling, disponibilidade.",
        "Resource attributes, eventos e logs de pod."
      ],
      [
        "Mensageria",
        "Lag, depth, throughput, age, redelivery.",
        "Spans producer/consumer e IDs de mensagem controlados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.14 Segurança, privacidade e integridade da telemetria",
    "id": "32-14-seguranca-privacidade-e-integridade-da-telemetria"
  },
  {
    "kind": "paragraph",
    "text": "Telemetria é um ativo sensível. Ela pode revelar topologia interna, nomes de serviços, versões, falhas, identificadores de usuários e decisões de segurança. O pipeline deve usar autenticação, criptografia em trânsito, segregação por tenant, controles de acesso, retenção e trilha de administração. Coletores não devem aceitar dados de qualquer origem sem validação."
  },
  {
    "kind": "paragraph",
    "text": "A propagação de trace context atravessa fronteiras externas e precisa de política. IDs recebidos podem ser aceitos, regenerados ou relacionados por links conforme o risco e a necessidade de correlação. Baggage deve ser filtrado. Logs de autenticação precisam evitar tokens e credenciais; atributos de SQL ou HTTP não devem registrar valores sensíveis por padrão."
  },
  {
    "kind": "paragraph",
    "text": "Integridade também importa. Um invasor pode tentar esconder atividade reduzindo telemetria, inundar o pipeline ou injetar campos enganosos. Limites, autenticação mútua, validação de schema, monitoramento do próprio Collector e armazenamento imutável para auditoria reduzem esse risco."
  },
  {
    "kind": "subhead",
    "text": "Telemetria não é área livre de LGPD"
  },
  {
    "kind": "paragraph",
    "text": "Dados observacionais continuam sujeitos a finalidade, minimização, retenção, acesso e segurança. Um trace ID pode não identificar uma pessoa sozinho, mas logs e baggage frequentemente carregam contexto que torna a correlação possível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.15 Custos, retenção, cardinalidade e capacidade do pipeline",
    "id": "32-15-custos-retencao-cardinalidade-e-capacidade-do-pipeline"
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade possui custo de CPU, memória, rede, armazenamento, indexação e consulta. O custo nasce na instrumentação e se multiplica por volume, cardinalidade e retenção. Uma aplicação que adiciona cinco atributos de alta cardinalidade pode aumentar séries e índices muito mais do que o crescimento de tráfego sugere."
  },
  {
    "kind": "paragraph",
    "text": "A estratégia deve definir tiers de retenção, sampling, compactação, agregação e roteamento por sinal. Logs de debug podem permanecer poucos dias; métricas agregadas podem ter retenção longa; traces completos podem ser amostrados; auditoria segue política própria. O Collector permite filtrar, transformar e encaminhar dados para destinos diferentes antes de pagar o custo integral no backend."
  },
  {
    "kind": "paragraph",
    "text": "O pipeline também precisa de SLO. Filas internas, dropped spans, export failures, recusas por memória, tempo de processamento e uso de CPU do Collector devem ser monitorados. Uma plataforma de observabilidade que perde dados silenciosamente pode levar equipes a conclusões incorretas durante incidentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.16 Troubleshooting de observabilidade",
    "id": "32-16-troubleshooting-de-observabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Quando um trace está quebrado, verifique primeiro a propagação. O cliente injetou traceparent? O gateway preservou ou recriou o contexto? A biblioteca do serviço extraiu o header? Chamadas assíncronas carregaram o contexto correto? Uma falha em qualquer salto cria traces separados, mesmo que todos os componentes estejam instrumentados."
  },
  {
    "kind": "paragraph",
    "text": "Quando métricas desaparecem, investigue o instrumento, views, temporality, export interval, filtros e cardinalidade. Em logs, verifique parsing, timestamp, multiline, encoding e mapeamento de severity. No Collector, examine health, filas, memory limiter, batch, retries e erros dos exporters. O próprio pipeline precisa emitir telemetria para ser diagnosticado."
  },
  {
    "kind": "paragraph",
    "text": "Diferenças de horário produzem spans com ordem impossível e logs fora da janela. Sincronização de relógio é requisito básico. Também é comum que nomes de serviço vazios ou inconsistentes agrupem aplicações diferentes no backend. Uma checklist de Resource e semantic conventions deve fazer parte do deploy."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Diagnóstico começa separando geração, propagação, processamento e armazenamento.",
    "headers": [
      "Sintoma",
      "Hipótese",
      "Evidência"
    ],
    "rows": [
      [
        "Trace dividido",
        "Contexto não propagado ou formato incompatível.",
        "Headers/metadata em cada salto."
      ],
      [
        "Spans ausentes",
        "Sampling, shutdown sem flush ou exporter falhando.",
        "Logs do SDK e métricas do Collector."
      ],
      [
        "Métrica explode",
        "Atributo de alta cardinalidade.",
        "Contagem de séries por label."
      ],
      [
        "Logs sem correlação",
        "traceid/spanid não injetados.",
        "Configuração do appender e contexto ativo."
      ],
      [
        "Collector descarta dados",
        "Limite de memória, fila cheia ou backend indisponível.",
        "Internal telemetry e erros do exporter."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.17 Estudos de caso e laboratórios",
    "id": "32-17-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1: consumidores recebem intermitentemente 504 em uma API bancária. A métrica de latência mostra aumento apenas em uma rota. Um exemplar abre um trace cujo span do gateway consome pouco tempo, mas o span do backend permanece próximo ao timeout. Os logs do mesmo trace indicam pool de conexões esgotado. A correlação evita alterar policies do gateway sem necessidade."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2: após um rollout, o custo de métricas aumenta dez vezes. A investigação mostra que uma nova versão adicionou customer_id como atributo de histogram. A correção remove o identificador da métrica e o preserva apenas em spans amostrados e logs autorizados. O incidente demonstra por que telemetria precisa de revisão de contrato."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3: mensagens Kafka aparecem como traces separados do request original. O produtor criou spans, mas não injetou contexto nos headers da mensagem. Após corrigir a propagação e usar links no consumidor quando apropriado, a plataforma passa a reconstruir a jornada assíncrona sem forçar uma hierarquia incorreta."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Instrumente uma API com auto-instrumentação e um span manual de negócio. 2) Propague traceparent pelo gateway e confirme a continuidade do trace. 3) Configure um Collector com receiver OTLP, memory_limiter, batch e dois exporters. 4) Crie uma métrica com baixa cardinalidade e associe exemplars. 5) Simule erro, timeout e mensagem assíncrona e compare os três sinais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade é a capacidade de explicar o comportamento interno de sistemas a partir de sinais externos. Logs, métricas e traces possuem modelos diferentes e devem ser correlacionados por Resource, contexto distribuído e convenções semânticas. A qualidade da correlação é mais importante que a quantidade de dados."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separa APIs, SDKs, instrumentações, protocolo OTLP e Collector. Essa arquitetura permite instrumentação agnóstica de fornecedor, processamento centralizado e exportação para múltiplos backends. O Collector, porém, precisa ser projetado como componente crítico, com capacidade, filas, segurança e telemetria própria."
  },
  {
    "kind": "paragraph",
    "text": "Sampling, exemplars, SLOs e alertas transformam sinais em decisões. Cardinalidade, privacidade e custo precisam ser tratados desde o design. Em gateways, Kubernetes e mensageria, cada camada produz evidências específicas, mas a jornada completa só aparece quando contexto e semântica atravessam todas as fronteiras."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda Kubernetes para APIs, conectando workloads, Services, Ingress/Gateway API, probes, autoscaling, segurança e operação às práticas de observabilidade apresentadas aqui."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de observabilidade",
    "id": "checklist-de-observabilidade"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada serviço define service.name, versão, ambiente e ownership de forma consistente.",
      "Logs são estruturados, correlacionáveis e não contêm segredos ou dados pessoais desnecessários.",
      "Métricas usam instrumentos corretos e atributos de baixa cardinalidade.",
      "Spans descrevem operações estáveis, dependências, erros e tempo sem copiar payloads completos.",
      "Trace context é propagado em HTTP, gRPC e mensageria, respeitando fronteiras de confiança.",
      "Semantic conventions e sua estabilidade são governadas como contrato.",
      "Sampling preserva erros, latência elevada e representatividade do tráfego saudável.",
      "Collector possui memory limiter, batch, filas, retries, health checks e telemetria interna.",
      "Dashboards e alertas estão ligados a SLIs, SLOs, owners e ações conhecidas.",
      "Custos, retenção, cardinalidade e privacidade são revisados antes da produção."
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
      "Diferencie telemetria, monitoramento, observabilidade e auditoria.",
      "Explique por que trace_id é inadequado como label de métrica.",
      "Descreva Resource, span, event, link, status e baggage.",
      "Explique traceparent e tracestate em uma chamada HTTP distribuída.",
      "Compare instrumentação manual e auto-instrumentação.",
      "Desenhe uma pipeline do Collector com receivers, processors e exporters.",
      "Compare head sampling e tail sampling.",
      "Explique como exemplars conectam métricas e traces.",
      "Proponha um SLI de disponibilidade e outro de latência para uma API.",
      "Liste controles para impedir exposição de tokens e PII na telemetria.",
      "Descreva como diagnosticar um trace interrompido entre gateway e backend.",
      "Proponha um laboratório para correlacionar request HTTP, mensagem e processamento assíncrono."
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
        "Attribute",
        "Par chave-valor associado a Resource, span, métrica ou log."
      ],
      [
        "Baggage",
        "Contexto de aplicação propagado entre processos."
      ],
      [
        "Exemplar",
        "Observação de métrica associada a um trace ou contexto representativo."
      ],
      [
        "Head sampling",
        "Decisão de amostragem tomada no início do trace."
      ],
      [
        "LogRecord",
        "Modelo de registro de log no OpenTelemetry."
      ],
      [
        "OTLP",
        "Protocolo nativo de transporte do OpenTelemetry."
      ],
      [
        "Resource",
        "Entidade que produz a telemetria."
      ],
      [
        "Semantic conventions",
        "Nomes e significados padronizados para telemetria."
      ],
      [
        "SLI",
        "Indicador quantitativo do comportamento observado."
      ],
      [
        "SLO",
        "Objetivo definido para um SLI em uma janela."
      ],
      [
        "Span",
        "Unidade de trabalho temporizada dentro de um trace."
      ],
      [
        "Tail sampling",
        "Decisão de amostragem após observar spans do trace."
      ],
      [
        "Trace",
        "Representação causal de uma operação distribuída."
      ],
      [
        "Trace Context",
        "Padrão W3C de propagação de contexto distribuído."
      ],
      [
        "View",
        "Configuração que altera agregação e atributos de métricas no SDK."
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
      "OpenTelemetry. What is OpenTelemetry? e Observability Primer.",
      "OpenTelemetry. Concepts: Signals, Traces, Metrics, Logs, Baggage e Context Propagation.",
      "OpenTelemetry Specification. Overview, Tracing, Metrics e Logs.",
      "OpenTelemetry Semantic Conventions.",
      "OpenTelemetry Collector: Architecture, Configuration, Deployment Patterns e Scaling.",
      "W3C. Trace Context Level 2.",
      "W3C. Baggage.",
      "Google SRE. Service Level Objectives e Error Budgets.",
      "CNCF. OpenTelemetry project documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry evolui sinal por sinal, e semantic conventions podem estar estáveis ou experimentais. Antes de padronizar atributos, exporters ou configuração declarativa, valide o status da versão adotada e teste migrações em ambiente controlado."
  }
];
