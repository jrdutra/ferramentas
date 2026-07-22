import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const CAPSTONE_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Projeto integrador: do contrato à operação resiliente"
  },
  {
    "kind": "subhead",
    "text": "Objetivo final"
  },
  {
    "kind": "paragraph",
    "text": "Construir uma plataforma demonstrável, segura, observável e operável, com decisões documentadas e testes reproduzíveis."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/pt/overview.svg",
    "alt": "Plataforma completa de APIs conectando design, proteção, execução e operação",
    "caption": "Figura de abertura - O projeto conecta as disciplinas do curso em uma plataforma operável de ponta a ponta."
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
    "text": "Este capítulo transforma os fundamentos e práticas estudados ao longo do curso em um projeto técnico completo. O objetivo não é apenas publicar uma API que responda corretamente, mas construir uma pequena plataforma capaz de demonstrar design de contratos, proteção de borda, identidade, autorização, integração síncrona e assíncrona, implantação automatizada, observabilidade, resiliência, governança e operação. O resultado deve poder ser explicado, testado e reproduzido por outra equipe."
  },
  {
    "kind": "paragraph",
    "text": "O cenário proposto representa uma instituição financeira fictícia chamada Banco Horizonte. A organização deseja disponibilizar APIs para consulta de clientes e contas, iniciação de pagamentos e recebimento de notificações. Consumidores internos, canais digitais e parceiros terão perfis diferentes de acesso. A plataforma deverá atender requisitos de segurança e privacidade semelhantes aos de ambientes corporativos reais, sem utilizar dados ou credenciais de produção."
  },
  {
    "kind": "paragraph",
    "text": "O projeto é intencionalmente modular. É possível implementar uma versão mínima em ambiente local com containers e evoluir para Kubernetes, service mesh, broker de mensagens e observabilidade distribuída. Essa progressão evita que a infraestrutura esconda os conceitos essenciais. Cada etapa deve introduzir uma capacidade clara e uma evidência objetiva de que ela funciona."
  },
  {
    "kind": "paragraph",
    "text": "A avaliação considera tanto o produto final quanto o raciocínio arquitetural. Diagramas, ADRs, contratos OpenAPI, modelos de ameaça, pipelines, dashboards, testes e runbooks são parte do projeto. Uma plataforma sem documentação e sem capacidade de diagnóstico não é considerada completa, mesmo que suas chamadas básicas estejam funcionando."
  },
  {
    "kind": "paragraph",
    "text": "Como usar este capítulo Trate o capítulo como um roteiro de execução. Em cada seção, registre decisões, hipóteses e evidências. Sempre que uma ferramenta específica não estiver disponível, substitua-a por uma equivalente, preservando o conceito arquitetural e documentando o trade-off."
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
      "Projetar uma plataforma completa de APIs a partir de requisitos funcionais e não funcionais.",
      "Transformar domínios de negócio em contratos OpenAPI coerentes e versionáveis.",
      "Aplicar OAuth 2.0, OpenID Connect, mTLS, API Keys e autorização conforme o perfil do consumidor.",
      "Configurar um API Gateway com policies de segurança, roteamento, transformação, limites e observabilidade.",
      "Implementar integração síncrona, assíncrona, idempotência, Outbox e tratamento de falhas.",
      "Implantar serviços em Kubernetes com probes, autoscaling, segurança e estratégia de rollout.",
      "Instrumentar logs, métricas e traces com OpenTelemetry e definir SLIs e SLOs.",
      "Planejar alta disponibilidade, backup, recuperação, testes de desastre e troubleshooting.",
      "Produzir documentação, automação e critérios de aceite que permitam auditoria e manutenção."
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
      "40.1 Cenário, escopo e restrições",
      "40.2 Arquitetura de referência",
      "40.3 Requisitos funcionais e não funcionais",
      "40.4 Domínios, APIs e contratos",
      "40.5 Identidade e segurança",
      "40.6 API Gateway e policies",
      "40.7 Microserviços, dados e mensageria",
      "40.8 Kubernetes, service mesh e rede",
      "40.9 Observabilidade e SRE",
      "40.10 CI/CD, IaC e governança",
      "40.11 Alta disponibilidade e recuperação",
      "40.12 Fases de implementação",
      "40.13 Critérios de aceite",
      "40.14 Entregáveis, demonstração e avaliação",
      "40.15 Laboratórios, troubleshooting e evolução futura"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.1 Cenário, escopo e restrições",
    "id": "40-1-cenario-escopo-e-restricoes"
  },
  {
    "kind": "paragraph",
    "text": "O Banco Horizonte precisa expor uma plataforma para três classes de consumidores. O aplicativo móvel consulta dados do próprio cliente e inicia pagamentos. Sistemas internos consultam contas e publicam eventos de atualização. Parceiros externos acessam operações limitadas mediante credenciais, consentimento e políticas de rate limiting. O desenho deve diferenciar claramente identidade humana, aplicação cliente e workload que executa cada serviço."
  },
  {
    "kind": "paragraph",
    "text": "A primeira versão do projeto deve conter quatro capacidades de negócio: cadastro e consulta de clientes, consulta de contas e saldos, iniciação idempotente de pagamentos e publicação de eventos de status. O escopo técnico inclui um gateway, um provedor de identidade, pelo menos dois serviços de domínio, um banco de dados, um broker ou log de eventos, instrumentação OpenTelemetry e uma esteira automatizada de entrega."
  },
  {
    "kind": "paragraph",
    "text": "As restrições existem para estimular decisões realistas. Dados pessoais devem ser fictícios e minimizados. Segredos não podem ser versionados no repositório. O ambiente precisa ser reproduzível por código. Toda operação de escrita deve suportar idempotência. Falhas de dependências devem produzir respostas controladas. Logs não podem registrar tokens, senhas, chaves ou payloads sensíveis completos."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - O projeto deve provar capacidades, não apenas apresentar componentes.",
    "headers": [
      "Dimensão",
      "Escopo mínimo",
      "Evidência esperada"
    ],
    "rows": [
      [
        "Negócio",
        "Clientes, contas, pagamentos e eventos.",
        "Jornadas demonstradas ponta a ponta."
      ],
      [
        "Segurança",
        "OAuth/OIDC, autorização, TLS e segredos.",
        "Testes positivos e negativos."
      ],
      [
        "Operação",
        "Logs, métricas, traces e alertas.",
        "Dashboard e trace correlacionado."
      ],
      [
        "Entrega",
        "Pipeline, IaC e versionamento.",
        "Ambiente recriado automaticamente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.2 Arquitetura de referência",
    "id": "40-2-arquitetura-de-referencia"
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura de referência separa borda, identidade, domínios, dados e operação. Na borda, DNS e balanceamento encaminham tráfego ao API Gateway. O gateway termina TLS, valida credenciais, aplica políticas e roteia para serviços internos. O provedor de identidade emite tokens para usuários e aplicações. Os serviços de clientes, contas e pagamentos mantêm responsabilidades próprias e evitam compartilhar tabelas diretamente."
  },
  {
    "kind": "paragraph",
    "text": "A comunicação síncrona utiliza HTTP/JSON ou gRPC conforme o objetivo do laboratório. Eventos de pagamento e atualização de cadastro são publicados em Kafka, RabbitMQ ou broker equivalente. O serviço de notificações consome eventos e demonstra desacoplamento temporal. Um cache pode ser introduzido para dados de leitura, desde que a política de invalidação seja explícita."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/pt/figure-01.svg",
    "alt": "Arquitetura lógica completa da plataforma de APIs do projeto final",
    "caption": "Figura 1 - Arquitetura lógica do projeto; produtos concretos podem variar sem alterar as responsabilidades."
  },
  {
    "kind": "paragraph",
    "text": "Regra de arquitetura Cada componente deve existir por uma razão verificável. Não adicione service mesh, cache, broker ou banco adicional apenas para aumentar a quantidade de tecnologias. A complexidade precisa resolver uma necessidade documentada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.3 Requisitos funcionais e não funcionais",
    "id": "40-3-requisitos-funcionais-e-nao-funcionais"
  },
  {
    "kind": "paragraph",
    "text": "Requisitos funcionais descrevem comportamentos observáveis do negócio. O consumidor deve consultar um cliente autorizado, listar contas associadas, obter saldo e iniciar um pagamento. O pagamento precisa receber uma chave de idempotência, produzir um identificador estável e evoluir por estados controlados. Uma consulta de status deve retornar o mesmo resultado independentemente da instância que atende a chamada."
  },
  {
    "kind": "paragraph",
    "text": "Requisitos não funcionais determinam a qualidade e a capacidade de operação. Defina disponibilidade alvo, latência por percentil, throughput, limites de payload, taxa por consumidor, RTO, RPO, retenção de logs e eventos, critérios de privacidade e requisitos de rastreabilidade. Mesmo em laboratório, números explícitos permitem testar e discutir trade-offs."
  },
  {
    "kind": "paragraph",
    "text": "Os requisitos devem ser mensuráveis. Em vez de escrever a API deve ser rápida, defina, por exemplo, p95 inferior a 300 ms para consultas sem dependência degradada. Em vez de a plataforma deve ser segura, liste verificações: tokens com issuer e audience válidos, menor privilégio, segredos externos, logs sem dados sensíveis e comunicação interna autenticada."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Requisitos não funcionais devem gerar testes e evidências.",
    "headers": [
      "Categoria",
      "Exemplo de requisito",
      "Como verificar"
    ],
    "rows": [
      [
        "Latência",
        "p95 de GET /contas abaixo de 300 ms.",
        "Teste de carga e dashboard."
      ],
      [
        "Disponibilidade",
        "SLO mensal de 99,9% para consultas.",
        "Métrica de sucesso por janela."
      ],
      [
        "Recuperação",
        "RPO de 5 min e RTO de 30 min.",
        "Exercício de restauração."
      ],
      [
        "Segurança",
        "Toda chamada protegida possui identidade e escopo.",
        "Testes negativos e auditoria."
      ],
      [
        "Privacidade",
        "Logs sem CPF completo, tokens ou segredos.",
        "Scanner e revisão amostral."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.4 Domínios, APIs e contratos",
    "id": "40-4-dominios-apis-e-contratos"
  },
  {
    "kind": "paragraph",
    "text": "A decomposição começa pelo domínio, não pelos endpoints. Cliente representa identidade cadastral e preferências. Conta representa vínculo financeiro e saldo disponível. Pagamento representa intenção, validação, execução e conclusão. Notificação representa comunicação derivada de eventos. Cada domínio deve possuir owner, modelo e fronteira de dados claros."
  },
  {
    "kind": "paragraph",
    "text": "Os contratos OpenAPI precisam definir recursos, métodos, parâmetros, schemas, exemplos, erros e segurança. O design deve usar semântica HTTP coerente: GET para leitura, POST para criação de intenção, PUT ou PATCH apenas quando a semântica estiver clara e códigos de status estáveis. Erros devem usar um envelope padronizado com código, mensagem segura, correlation ID e detalhes apropriados."
  },
  {
    "kind": "paragraph",
    "text": "A evolução do contrato precisa ser testada automaticamente. Mudanças incompatíveis exigem nova versão ou processo formal. Campos adicionados em responses devem considerar consumidores estritos. Enums, nullability, formatos e limites fazem parte do contrato. O portal deve publicar documentação, exemplos e changelog."
  },
  {
    "kind": "paragraph",
    "text": "Trecho mínimo do contrato de pagamentos openapi: 3.1.0 info: title: API de Pagamentos version: 1.0.0 paths: /pagamentos: post: operationId: iniciarPagamento parameters: - in: header name: Idempotency-Key required: true schema: { type: string, minLength: 16 } responses: '202': { description: Pagamento aceito para processamento } '409': { description: Chave de idempotência em conflito }"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/pt/figure-02.svg",
    "alt": "Ciclo orientado por contrato da implementação à evolução",
    "caption": "Figura 2 - O contrato orienta implementação, publicação, operação e evolução."
  },
  {
    "kind": "paragraph",
    "text": "O projeto deve separar autenticação de usuário, autenticação de aplicação e identidade de workload. O aplicativo móvel utiliza Authorization Code com PKCE e OpenID Connect. Integrações máquina a máquina utilizam Client Credentials, preferencialmente com autenticação forte do cliente. Workloads internos recebem identidade própria e não reutilizam credenciais humanas."
  },
  {
    "kind": "paragraph",
    "text": "O gateway valida assinatura, issuer, audience, tempo e escopos do access token. O backend continua responsável por autorização de objeto e regra de negócio. Um token válido não garante acesso a qualquer conta; o serviço precisa verificar a relação entre subject, consentimento e recurso solicitado. Essa divisão demonstra defesa em profundidade."
  },
  {
    "kind": "paragraph",
    "text": "Segredos devem permanecer em um secret manager ou solução equivalente. Certificados e chaves precisam de rotação planejada. APIs externas usam TLS; integrações sensíveis podem usar mTLS e tokens vinculados. O modelo de ameaças deve cobrir BOLA, autenticação quebrada, SSRF, abuso de fluxo, consumo irrestrito e exposição de dados."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A credencial deve corresponder ao tipo de sujeito e ao risco.",
    "headers": [
      "Fluxo",
      "Identidade principal",
      "Controle essencial"
    ],
    "rows": [
      [
        "Mobile -> API",
        "Usuário + cliente público.",
        "OIDC, PKCE, state, nonce e escopos."
      ],
      [
        "Parceiro -> API",
        "Aplicação confidencial.",
        "Client Credentials, mTLS e quota."
      ],
      [
        "Serviço -> serviço",
        "Workload.",
        "Identidade curta, mTLS e policy."
      ],
      [
        "Operador -> plataforma",
        "Pessoa administrativa.",
        "MFA, RBAC e auditoria."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.6 API Gateway e policies",
    "id": "40-6-api-gateway-e-policies"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é o ponto controlado de entrada, mas não deve concentrar toda a lógica de negócio. O pipeline inbound valida TLS, autenticação, autorização coarse-grained, schema, tamanho de payload, rate limit e correlação. A seção de backend seleciona destino e aplica timeout. A saída remove headers internos, padroniza respostas e registra telemetria. O fluxo de erro transforma falhas técnicas em respostas consistentes."
  },
  {
    "kind": "paragraph",
    "text": "Policies precisam ser organizadas por escopo e reutilização. Regras globais cuidam de correlação e segurança básica; policies de produto tratam quotas; policies de API validam contratos; policies de operação cobrem exceções específicas. Alterações passam por versionamento, revisão e testes automatizados. O projeto deve demonstrar pelo menos um bloqueio de token inválido, um 429 controlado, uma transformação segura e um fallback ou circuit breaker."
  },
  {
    "kind": "paragraph",
    "text": "Logs do gateway devem registrar rota, consumidor, status, latência, backend e correlation ID, sem capturar segredos. Métricas distinguem erros produzidos na borda de erros do backend. Um trace deve mostrar gateway e serviços downstream na mesma árvore."
  },
  {
    "kind": "paragraph",
    "text": "Pipeline conceitual de policies inbound: - validate-jwt: issuer, audience, signature, exp - require-scope: pagamentos.write - rate-limit: 20 req/s por client_id - validate-content: OpenAPI - set-correlation-id backend: - timeout: 2s - route: pagamento-service outbound: - remove-internal-headers - emit-telemetry on-error: - map-error-to-problem-details"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.7 Microserviços, dados e mensageria",
    "id": "40-7-microservicos-dados-e-mensageria"
  },
  {
    "kind": "paragraph",
    "text": "Cada serviço possui seu próprio modelo de dados e expõe contratos em vez de tabelas. O serviço de pagamentos grava a intenção e publica um evento sem depender de transação distribuída entre banco e broker. O padrão Transactional Outbox registra evento e estado na mesma transação local; um processo posterior publica o evento e marca a entrega."
  },
  {
    "kind": "paragraph",
    "text": "Consumidores precisam ser idempotentes. O serviço de notificações mantém Inbox ou registro de mensagens processadas. Retries utilizam backoff e jitter, e mensagens não processáveis seguem para DLQ com contexto suficiente para investigação. Ordering é exigido apenas por chave de negócio, como paymentId, evitando um gargalo global desnecessário."
  },
  {
    "kind": "paragraph",
    "text": "Consultas agregadas podem usar API Composition ou uma materialized view. CQRS e Event Sourcing são extensões opcionais; só devem ser incluídos quando o aluno consegue explicar seu custo. O projeto mínimo precisa demonstrar consistência eventual de forma explícita e uma estratégia de reconciliação para divergências."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Padrões distribuídos precisam ser comprovados por testes de falha.",
    "headers": [
      "Padrão",
      "Problema resolvido",
      "Evidência no projeto"
    ],
    "rows": [
      [
        "Idempotency Key",
        "Repetição segura de comandos.",
        "Mesmo resultado para replay válido."
      ],
      [
        "Outbox",
        "Atomicidade entre estado e evento.",
        "Evento publicado após commit local."
      ],
      [
        "Inbox",
        "Deduplicação no consumidor.",
        "Mensagem repetida não duplica efeito."
      ],
      [
        "DLQ",
        "Isolamento de falhas não transitórias.",
        "Mensagem inspecionável e reprocessável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.8 Kubernetes, service mesh e rede",
    "id": "40-8-kubernetes-service-mesh-e-rede"
  },
  {
    "kind": "paragraph",
    "text": "Os serviços devem ser empacotados em imagens imutáveis e executados com usuário não privilegiado. Deployments definem replicas, strategy, requests, limits e probes. Readiness só fica verdadeira quando a instância pode receber tráfego; liveness detecta travamento real; startup protege inicializações lentas. PodDisruptionBudget e topology spread reduzem concentração em um único domínio de falha."
  },
  {
    "kind": "paragraph",
    "text": "Services e DNS internos fornecem descoberta. NetworkPolicies restringem comunicação, egress e acesso a bancos. Ingress ou Gateway API expõe somente o gateway externo. Secrets são montados ou obtidos por identidade de workload, evitando credenciais fixas em manifests. HPA pode escalar por CPU e, preferencialmente, por métricas relacionadas a demanda."
  },
  {
    "kind": "paragraph",
    "text": "Uma service mesh opcional aplica mTLS e autorização east-west. O projeto deve comparar benefício e custo: sidecars ou ambient mesh consomem recursos e adicionam outra camada de diagnóstico. A adoção é válida quando há requisitos claros de identidade de workload, telemetria e controle uniforme."
  },
  {
    "kind": "paragraph",
    "text": "Manifest resumido do workload apiVersion: apps/v1 kind: Deployment metadata: { name: pagamento-service } spec: replicas: 3 template: spec: containers: - name: app image: registry/pagamento-service:1.0.0 resources: requests: { cpu: 200m, memory: 256Mi } limits: { cpu: 500m, memory: 512Mi } readinessProbe: httpGet: { path: /health/ready, port: 8080 } livenessProbe: httpGet: { path: /health/live, port: 8080 }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.9 Observabilidade e SRE",
    "id": "40-9-observabilidade-e-sre"
  },
  {
    "kind": "paragraph",
    "text": "Todos os componentes emitem logs estruturados, métricas e traces. O correlation ID acompanha a jornada, enquanto W3C Trace Context propaga traceparent entre gateway, serviços e consumidores. O OpenTelemetry Collector recebe sinais e remove atributos sensíveis antes da exportação. Semantic conventions são adotadas para HTTP, mensageria, banco e recursos de Kubernetes."
  },
  {
    "kind": "paragraph",
    "text": "Defina SLIs alinhados ao consumidor: taxa de sucesso, latência, disponibilidade e frescor do processamento assíncrono. Um SLO para pagamento pode combinar aceitação da intenção e conclusão dentro de uma janela. Alertas devem usar burn rate e sintomas percebidos, evitando notificação por qualquer variação de CPU."
  },
  {
    "kind": "paragraph",
    "text": "A demonstração precisa incluir um trace completo, um dashboard de golden signals e um alerta exercitado. Introduza uma falha controlada, como latência no backend ou indisponibilidade do broker, e mostre como o sistema degrada, quais políticas atuam e quais evidências permitem localizar a causa."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Golden signals transformam a plataforma em um sistema investigável.",
    "headers": [
      "Sinal",
      "Métrica principal",
      "Pergunta respondida"
    ],
    "rows": [
      [
        "Tráfego",
        "requests/s e mensagens/s.",
        "Quanto trabalho chega?"
      ],
      [
        "Erros",
        "taxa por código e origem.",
        "Onde e como falha?"
      ],
      [
        "Latência",
        "p50, p95 e p99.",
        "Quem percebe lentidão?"
      ],
      [
        "Saturação",
        "CPU, filas, conexões e lag.",
        "Qual recurso está perto do limite?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.10 CI/CD, infraestrutura como código e governança",
    "id": "40-10-ci-cd-infraestrutura-como-codigo-e-governanca"
  },
  {
    "kind": "paragraph",
    "text": "O repositório deve separar código, contratos, infraestrutura e documentação de forma compreensível. Pull requests executam lint de OpenAPI, testes unitários, testes de contrato, SAST, análise de dependências, build da imagem e verificação de manifests. A promoção para ambientes usa artefatos imutáveis, não reconstrução."
  },
  {
    "kind": "paragraph",
    "text": "Infraestrutura como código cria rede, cluster, gateway, observabilidade e identidades. GitOps pode reconciliar manifests do cluster. Segredos permanecem fora do Git e são referenciados por nomes ou identidades. O pipeline gera SBOM, assina imagens quando possível e bloqueia componentes vulneráveis acima do limite definido."
  },
  {
    "kind": "paragraph",
    "text": "Governança não deve impedir autonomia sem razão. Templates, policy fragments, bibliotecas de observabilidade e golden paths reduzem decisões repetitivas. Exceções possuem owner, justificativa, prazo e compensação. ADRs registram escolhas como REST versus gRPC, broker utilizado, estratégia de versão e modelo de autenticação."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/pt/figure-03.svg",
    "alt": "Fases do projeto com critérios de aceite e evidências armazenadas",
    "caption": "Figura 3 - Cada fase deve terminar com critérios de aceite e evidências armazenadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.11 Alta disponibilidade, continuidade e recuperação",
    "id": "40-11-alta-disponibilidade-continuidade-e-recuperacao"
  },
  {
    "kind": "paragraph",
    "text": "A plataforma deve tolerar perda de uma instância sem interrupção perceptível. Réplicas ficam distribuídas entre nós ou zonas. O gateway e os serviços são stateless sempre que possível. Estado persistente utiliza replicação e backups testados. Dependências críticas possuem timeouts, bulkheads e limites de concorrência."
  },
  {
    "kind": "paragraph",
    "text": "RTO e RPO orientam a estratégia de recuperação. Um backup que nunca foi restaurado não é evidência de recuperação. O laboratório deve executar ao menos um teste: remoção de Pod, indisponibilidade de backend, reinício do broker ou restauração de uma base em ambiente isolado. O resultado deve ser documentado com tempo, perda observada e ações corretivas."
  },
  {
    "kind": "paragraph",
    "text": "Failover não pode criar duplicidade financeira. Idempotência, fencing e reconciliação são essenciais. O plano de continuidade inclui contatos, critérios de declaração, runbooks, comunicação e retorno controlado. Alta disponibilidade sem capacidade de operação humana continua sendo frágil."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.12 Fases de implementação",
    "id": "40-12-fases-de-implementacao"
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - O projeto evolui por capacidade demonstrável, não por quantidade de componentes.",
    "headers": [
      "Fase",
      "Entregas principais",
      "Marco de aceite"
    ],
    "rows": [
      [
        "1. Fundação",
        "Repositórios, ADRs, OpenAPI, ambiente local e CI.",
        "Contrato validado e build reproduzível."
      ],
      [
        "2. Borda e identidade",
        "Gateway, IdP, TLS, JWT, scopes e rate limits.",
        "Jornadas autorizadas e bloqueios comprovados."
      ],
      [
        "3. Domínio e eventos",
        "Serviços, banco, idempotência, Outbox e consumidor.",
        "Fluxo de pagamento e evento íntegros."
      ],
      [
        "4. Plataforma",
        "Kubernetes, observabilidade, SLO, IaC e DR.",
        "Falha injetada, diagnosticada e recuperada."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Na fase de fundação, priorize clareza do domínio e contrato. A fase de borda adiciona segurança antes de aumentar o número de serviços. A terceira fase introduz consistência distribuída e mensageria. A fase final endurece operação, observabilidade e recuperação. Essa ordem reduz a chance de terminar com uma infraestrutura sofisticada e um fluxo de negócio incompleto."
  },
  {
    "kind": "paragraph",
    "text": "Cada fase deve ter uma demonstração curta e automatizável. Scripts de smoke test, coleções de requisições e dados sintéticos aceleram validação. A documentação precisa indicar comandos, pré-requisitos e resultado esperado. Uma pessoa que não participou do desenvolvimento deve conseguir executar o roteiro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.13 Critérios de aceite técnico",
    "id": "40-13-criterios-de-aceite-tecnico"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Contratos OpenAPI válidos, documentados, versionados e sem mudança incompatível não aprovada.",
      "Autenticação e autorização funcionam para usuário, parceiro e workload; testes negativos produzem respostas corretas.",
      "Gateway aplica validação, rate limit, correlação, timeout e tratamento de erro sem expor dados internos.",
      "Pagamento é idempotente, persiste estado e publica evento de forma confiável.",
      "Consumidor suporta duplicatas, retry e DLQ; há procedimento de reprocessamento.",
      "Workloads possuem requests, limits, probes, rollout e política de rede.",
      "Logs, métricas e traces permitem localizar uma falha ponta a ponta.",
      "Pipeline executa testes, scans e implantação reproduzível; infraestrutura é criada por código.",
      "Há SLO, alerta testado, backup restaurado e runbook para incidente crítico.",
      "Documentação descreve arquitetura, trade-offs, riscos, custos e evolução futura."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.14 Entregáveis, demonstração e avaliação",
    "id": "40-14-entregaveis-demonstracao-e-avaliacao"
  },
  {
    "kind": "paragraph",
    "text": "O pacote final deve conter diagrama de contexto, diagrama de containers, fluxos de autenticação e pagamento, contratos OpenAPI, arquivos .proto se utilizados, modelo de eventos, ADRs, threat model, manifests ou charts, infraestrutura como código, pipelines, dashboards, alertas, runbooks e relatório de testes. Capturas isoladas não substituem artefatos versionados."
  },
  {
    "kind": "paragraph",
    "text": "A demonstração sugerida dura de quinze a vinte minutos. Primeiro, apresente o problema e a arquitetura. Em seguida, execute uma jornada autorizada, uma tentativa bloqueada, uma repetição idempotente e o consumo de um evento. Depois, injete uma falha, navegue por métricas e traces, aplique recuperação e mostre o estado final. Encerre com limitações e próximos passos."
  },
  {
    "kind": "paragraph",
    "text": "A avaliação deve equilibrar funcionalidade, segurança, confiabilidade, observabilidade, automação e clareza. Uma solução menor, mas coerente e bem testada, vale mais do que uma arquitetura extensa sem evidências. Decisões conscientes de não utilizar determinada tecnologia também são válidas quando justificadas."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Rubrica sugerida para avaliação do projeto final.",
    "headers": [
      "Dimensão",
      "Peso sugerido",
      "Pergunta de avaliação"
    ],
    "rows": [
      [
        "Arquitetura e contratos",
        "20%",
        "As fronteiras e interfaces são coerentes?"
      ],
      [
        "Segurança e privacidade",
        "20%",
        "Identidades, dados e segredos estão protegidos?"
      ],
      [
        "Confiabilidade e dados",
        "20%",
        "Falhas, duplicatas e recuperação são tratadas?"
      ],
      [
        "Operação e observabilidade",
        "20%",
        "É possível detectar, explicar e responder?"
      ],
      [
        "Automação e documentação",
        "20%",
        "Outra equipe consegue reproduzir e manter?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.15 Troubleshooting e laboratórios finais",
    "id": "40-15-troubleshooting-e-laboratorios-finais"
  },
  {
    "kind": "paragraph",
    "text": "O laboratório final deve provocar falhas em camadas distintas: DNS incorreto, certificado não confiável, token com audience errada, policy de gateway mal ordenada, timeout de backend, Pod sem readiness, broker indisponível e consumidor com lag. Para cada caso, escreva hipótese, evidência, teste de confirmação e correção. O objetivo é demonstrar método, não apenas encontrar rapidamente a resposta."
  },
  {
    "kind": "paragraph",
    "text": "Uma segunda sequência deve testar abuso e limites: payload acima do permitido, enum inválido, BOLA, repetição de pagamento, burst de requisições, segredo exposto em log e query lenta. Registre como gateway, backend, banco e observabilidade respondem. Defesas precisam falhar de forma segura e produzir sinal suficiente para operação."
  },
  {
    "kind": "paragraph",
    "text": "Como evolução, o projeto pode receber GraphQL para composição de canais, gRPC entre serviços, WebSocket para notificações, multi-cluster, active-active, Open Finance ou políticas Zero Trust adaptativas. Cada extensão deve preservar o princípio do curso: compreender responsabilidades, contratos, riscos e evidências antes de adicionar complexidade."
  },
  {
    "kind": "paragraph",
    "text": "Encerramento do curso Uma plataforma de APIs é um sistema sociotécnico: protocolos, código, infraestrutura, segurança, operação, governança e pessoas precisam funcionar juntos. O projeto final é bem-sucedido quando torna essas relações explícitas e demonstráveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist final de entrega",
    "id": "checklist-final-de-entrega"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cenário, escopo, restrições e requisitos estão documentados.",
      "Arquitetura possui diagramas e ADRs atualizados.",
      "APIs, eventos e erros possuem contratos versionados.",
      "Identidades, escopos, consentimentos e regras de autorização estão explícitos.",
      "Gateway e políticas estão em código, testados e observáveis.",
      "Idempotência, Outbox, Inbox, retries e DLQ foram exercitados.",
      "Kubernetes possui segurança, probes, recursos, rollout e políticas de rede.",
      "Logs, métricas, traces, SLOs e alertas foram demonstrados.",
      "Pipelines, IaC, SBOM e estratégia de rollback estão disponíveis.",
      "Backup, restauração, failover e runbooks foram testados.",
      "Dados pessoais são fictícios, minimizados e protegidos.",
      "A demonstração pode ser executada por outra pessoa usando a documentação."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de consolidação",
    "id": "exercicios-de-consolidacao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Desenhe a arquitetura mínima e identifique todas as fronteiras de confiança.",
      "Defina os scopes e as regras de autorização de objeto para clientes, contas e pagamentos.",
      "Modele o estado de um pagamento e indique onde a idempotência é aplicada.",
      "Escreva o contrato do evento PagamentoAtualizado e a política de evolução.",
      "Proponha SLOs e alertas para consultas e iniciação de pagamentos.",
      "Defina uma falha que deve resultar em 502, outra em 503 e outra em 504.",
      "Crie um plano de rollback para uma versão incompatível de API.",
      "Descreva como restaurar o banco e reconciliar eventos após desastre.",
      "Liste quais controles pertencem ao gateway, ao backend, ao mesh e à plataforma.",
      "Apresente três extensões futuras e o custo operacional de cada uma."
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
    "caption": "Tabela 8 - Vocabulário essencial do projeto final.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "ADR",
        "Registro de uma decisão arquitetural, contexto, alternativas e consequências."
      ],
      [
        "Golden path",
        "Caminho padronizado e suportado para construir e operar serviços."
      ],
      [
        "Idempotency Key",
        "Identificador usado para repetir um comando sem duplicar seu efeito."
      ],
      [
        "Outbox",
        "Padrão que registra estado e evento na mesma transação local."
      ],
      [
        "PDP/PEP",
        "Componentes de decisão e aplicação de políticas de acesso."
      ],
      [
        "RPO/RTO",
        "Limites de perda de dados e tempo de recuperação."
      ],
      [
        "SLI/SLO",
        "Indicador medido e objetivo de confiabilidade."
      ],
      [
        "SBOM",
        "Inventário de componentes de software presentes em um artefato."
      ],
      [
        "Threat model",
        "Análise de ativos, ameaças, superfícies e controles."
      ],
      [
        "Trace Context",
        "Padrão de propagação de contexto de tracing distribuído."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências técnicas para execução",
    "id": "referencias-tecnicas-para-execucao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "OpenAPI Initiative. OpenAPI Specification 3.1.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. OAuth 2.0, PKCE e OAuth 2.0 Security Best Current Practice.",
      "OpenID Foundation. OpenID Connect Core.",
      "OWASP. API Security Top 10 e Application Security Verification Standard.",
      "Kubernetes Documentation. Workloads, Services, Security e Gateway API.",
      "OpenTelemetry Documentation. Signals, Collector e Semantic Conventions.",
      "NIST SP 800-207. Zero Trust Architecture.",
      "NIST Secure Software Development Framework.",
      "Documentações oficiais do gateway, broker, banco e provedor de identidade escolhidos."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota final Ferramentas e serviços mudam; os princípios avaliados permanecem. Registre versões, valide a documentação oficial do ambiente utilizado e preserve scripts e evidências para que o projeto continue reproduzível."
  }
];
