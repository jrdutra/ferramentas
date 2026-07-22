import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const KUBERNETES_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Kubernetes para APIs: reconciliar estado, tráfego e capacidade"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/overview.svg",
    "alt": "Cluster Kubernetes executando APIs com roteamento, segurança e observabilidade",
    "caption": "Figura de abertura - Kubernetes fornece reconciliação e abstrações operacionais; o caminho da API atravessa várias camadas."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes mantém estado desejado por reconciliação; confiabilidade depende da combinação correta de workloads, rede, capacidade, segurança e observabilidade."
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
    "text": "Os capítulos anteriores apresentaram microserviços, mensageria, service mesh e observabilidade. Kubernetes é a plataforma que frequentemente reúne esses elementos em produção: agenda workloads, distribui configurações, expõe serviços, executa rollouts, aplica políticas e fornece uma API declarativa para automação. Para equipes de APIs, porém, conhecer apenas comandos de kubectl não é suficiente. É necessário compreender como cada abstração interfere no caminho da requisição, no consumo de recursos, na identidade do workload e no comportamento durante falhas."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes não transforma automaticamente uma aplicação em sistema resiliente. O cluster pode reiniciar um container, mas não sabe se uma operação de negócio é idempotente. Pode criar mais réplicas, mas não conhece o limite de conexões do banco. Pode balancear tráfego entre Pods, mas não corrige uma readiness probe superficial. A plataforma automatiza mecanismos; a arquitetura precisa fornecer sinais, contratos, limites e políticas coerentes."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo percorre o cluster do control plane ao Pod e conecta os conceitos diretamente ao ciclo de vida de APIs. Serão estudados Deployments, Services, EndpointSlices, DNS, Gateway API, recursos e limites, probes, autoscaling, scheduling, configuração, segredos, identidade, RBAC, NetworkPolicy, armazenamento, observabilidade, GitOps e troubleshooting. O foco é construir um modelo mental operacional: dado um sintoma observado pelo consumidor, quais objetos e evidências devem ser examinados?"
  },
  {
    "kind": "paragraph",
    "text": "A abordagem considera clusters gerenciados e autogerenciados, sem depender de um provedor específico. Exemplos usam recursos estáveis e padrões amplamente adotados. Recursos adicionais, controladores e CRDs podem ampliar o Kubernetes, mas devem ser avaliados como software com ciclo de vida próprio, compatibilidade, permissões e impacto operacional."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada objeto, diferencie spec (estado desejado), status (estado observado), controller responsável, eventos gerados e dependências externas. Essa leitura é mais útil do que memorizar comandos isolados."
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
      "Explicar a arquitetura do cluster e a função dos principais componentes do control plane e dos nós.",
      "Relacionar o modelo declarativo e o loop de reconciliação à operação de APIs.",
      "Distinguir Pod, ReplicaSet, Deployment, StatefulSet, DaemonSet, Job e CronJob.",
      "Compreender Services, DNS, EndpointSlices, Ingress e Gateway API.",
      "Configurar requests, limits, probes e estratégias de rollout de forma coerente.",
      "Explicar HPA, VPA e node autoscaling, incluindo suas dependências e conflitos.",
      "Aplicar ServiceAccounts, RBAC, Pod Security Standards, NetworkPolicies e proteção de Secrets.",
      "Relacionar namespaces, quotas, scheduling e topologia a isolamento e disponibilidade.",
      "Integrar logs, métricas, tracing e eventos ao troubleshooting do cluster.",
      "Projetar uma cadeia de entrega declarativa, auditável e segura para APIs."
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
      "33.1 Kubernetes como sistema de reconciliação",
      "33.2 Arquitetura do cluster",
      "33.3 Pods e ciclo de vida de containers",
      "33.4 Controllers de workload e Deployments",
      "33.5 Services, DNS e EndpointSlices",
      "33.6 Ingress e Gateway API",
      "33.7 ConfigMaps, Secrets e configuração",
      "33.8 Requests, limits e QoS",
      "33.9 Startup, readiness e liveness probes",
      "33.10 Autoscaling e capacidade",
      "33.11 Scheduling, topologia e disponibilidade",
      "33.12 Segurança, identidade e rede",
      "33.13 Armazenamento e workloads stateful",
      "33.14 Observabilidade, entrega, troubleshooting e laboratórios"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.1 Kubernetes como sistema de reconciliação",
    "id": "33-1-kubernetes-como-sistema-de-reconciliacao"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes é uma plataforma declarativa. O usuário cria ou altera objetos na API, descrevendo um estado desejado. Controllers observam esses objetos e o estado real do cluster, calculam diferenças e executam ações para reduzir a divergência. Um Deployment com três réplicas não é um comando para iniciar três processos; é uma declaração persistente que continuará sendo reconciliada quando Pods falharem, nós forem drenados ou uma nova versão for publicada."
  },
  {
    "kind": "paragraph",
    "text": "Esse modelo produz uma mudança importante de raciocínio. Em sistemas imperativos, uma automação executa passos e considera o trabalho concluído quando os comandos retornam sucesso. No Kubernetes, o aceite de um manifesto indica apenas que o objeto passou pela API e foi persistido. A disponibilidade real depende de scheduling, download da imagem, inicialização, probes, dependências e status dos controllers. Por isso, pipelines precisam observar condições, não apenas o retorno do apply."
  },
  {
    "kind": "paragraph",
    "text": "A API do Kubernetes é extensível. CustomResourceDefinitions permitem registrar novos tipos e controllers podem implementar semânticas próprias, formando operators. Essa capacidade viabiliza bancos, gateways, certificados e plataformas internas, mas também aumenta a superfície operacional. Cada CRD precisa de ownership, política de upgrade, RBAC, backups e compreensão do que acontece quando seu controller fica indisponível."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "Objeto aceito não significa workload pronto. Leia generation, observedGeneration, conditions, eventos e status do controller para saber se o estado desejado foi realmente alcançado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.2 Arquitetura do cluster",
    "id": "33-2-arquitetura-do-cluster"
  },
  {
    "kind": "paragraph",
    "text": "Um cluster possui control plane e worker nodes. O kube-apiserver expõe a API e centraliza autenticação, autorização, admission e persistência. O etcd armazena o estado do cluster. O scheduler escolhe um nó para Pods ainda não agendados considerando recursos, afinidades, restrições e plugins. O kube-controller-manager executa loops de reconciliação para objetos nativos. Provedores podem adicionar cloud-controller-manager e outros controladores."
  },
  {
    "kind": "paragraph",
    "text": "Nos nós, o kubelet garante que os containers descritos nos PodSpecs estejam executando por meio de um container runtime compatível. A rede do Pod é implementada por plugins CNI; persistência usa CSI; integração com dispositivos pode usar plugins específicos. O componente de proxy ou uma implementação equivalente mantém regras de encaminhamento de Services. Em clusters gerenciados, parte desses componentes é operada pelo provedor, mas suas responsabilidades continuam relevantes para diagnóstico."
  },
  {
    "kind": "paragraph",
    "text": "A API do cluster é uma fronteira crítica. Toda automação, operador e pessoa que possui credenciais pode potencialmente alterar o estado do ambiente conforme suas permissões. A disponibilidade do control plane afeta mudanças e reconciliação, embora workloads existentes possam continuar processando tráfego por algum tempo. Backups de etcd, políticas de acesso, auditoria e procedimentos de recuperação pertencem ao desenho da plataforma."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-01.svg",
    "alt": "Control plane coordenando worker nodes e workloads",
    "caption": "Figura 1 - O control plane mantém o estado e coordena os nós; os workloads executam nos worker nodes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.3 Pods e ciclo de vida de containers",
    "id": "33-3-pods-e-ciclo-de-vida-de-containers"
  },
  {
    "kind": "paragraph",
    "text": "Pod é a menor unidade implantável do Kubernetes. Um Pod contém um ou mais containers co-localizados, compartilhando namespace de rede e volumes definidos no PodSpec. Containers no mesmo Pod comunicam-se por localhost e são agendados juntos. Esse acoplamento é adequado para sidecars ou auxiliares que pertencem ao mesmo ciclo de vida; não é um mecanismo para colocar vários microserviços independentes na mesma unidade."
  },
  {
    "kind": "paragraph",
    "text": "Pods são descartáveis. Um novo Pod normalmente recebe novo UID e novo endereço IP. Aplicações não devem depender da identidade de uma instância específica. Estado durável precisa estar em sistemas externos ou volumes persistentes, e descoberta deve usar Service ou mecanismos equivalentes. O Kubernetes reinicia containers no mesmo Pod conforme a restartPolicy, mas substituições realizadas por controllers geram novos Pods."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo inclui criação, scheduling, pull da imagem, execução de init containers, startup de containers, probes, hooks e término. Ao remover um Pod, o kubelet envia sinal de término, respeita o grace period e encerra forçadamente quando necessário. APIs precisam responder a SIGTERM, parar de aceitar novas requisições, concluir trabalho em andamento dentro do prazo e fechar recursos. Ignorar esse ciclo provoca erros durante rollouts e drenagem de nós."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Containers no mesmo Pod compartilham destino operacional e ciclo de vida.",
    "headers": [
      "Elemento",
      "Função",
      "Uso em APIs"
    ],
    "rows": [
      [
        "Init container",
        "Executa antes dos containers principais.",
        "Preparação curta e determinística; não deve substituir migração coordenada."
      ],
      [
        "Sidecar",
        "Container auxiliar no mesmo Pod.",
        "Proxy de mesh, agente ou adaptação estreitamente acoplada."
      ],
      [
        "Ephemeral container",
        "Diagnóstico temporário.",
        "Inspeção de Pods sem ferramentas, sob controle de acesso."
      ],
      [
        "Lifecycle hook",
        "Ação em eventos do container.",
        "Drenagem, registro ou encerramento controlado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.4 Controllers de workload e Deployments",
    "id": "33-4-controllers-de-workload-e-deployments"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações não devem criar Pods isolados para produção. Controllers de workload administram réplicas e substituições. Deployment é a escolha comum para APIs stateless: mantém ReplicaSets e executa atualizações declarativas. StatefulSet fornece identidade e ordenação estáveis para workloads que realmente precisam dessas propriedades. DaemonSet executa uma cópia por nó elegível, enquanto Job e CronJob representam trabalho finito e agendado."
  },
  {
    "kind": "paragraph",
    "text": "No rolling update, o Deployment cria gradualmente Pods da nova revisão e remove réplicas antigas. maxSurge controla capacidade temporária adicional; maxUnavailable limita indisponibilidade durante o rollout. Esses valores precisam ser compatíveis com quotas, capacidade de nós e comportamento das probes. Um rollout pode ficar bloqueado por imagem inválida, falta de recursos, readiness falhando ou PDBs e políticas de scheduling restritivas."
  },
  {
    "kind": "paragraph",
    "text": "Rollback restaura uma revisão anterior do template, mas não desfaz mudanças em banco, tópicos, contratos ou dependências externas. Estratégias seguras separam alterações de schema, mantêm compatibilidade durante a janela de coexistência e usam telemetria para promoção. Canary e blue-green normalmente exigem um controlador de entrega ou roteamento que divida tráfego e avalie métricas; Kubernetes puro oferece os blocos, não toda a política de decisão."
  },
  {
    "kind": "subhead",
    "text": "Deployment resumido para uma API stateless"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: apps/v1 kind: Deployment metadata: name: clientes-api spec: replicas: 3 strategy: rollingUpdate: maxSurge: 1 maxUnavailable: 0 selector: matchLabels: app: clientes-api template: metadata: labels: app: clientes-api spec: containers: - name: api image: registry.example/clientes-api:2.4.0 ports: - containerPort: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.5 Services, DNS e EndpointSlices",
    "id": "33-5-services-dns-e-endpointslices"
  },
  {
    "kind": "paragraph",
    "text": "Service fornece um endpoint lógico estável para um conjunto de Pods selecionados por labels ou por configuração explícita. ClusterIP cria acesso interno; NodePort publica uma porta nos nós; LoadBalancer solicita integração com um balanceador externo quando a plataforma oferece esse recurso. ExternalName cria um alias DNS e não funciona como proxy. A escolha deve refletir a topologia, não conveniência momentânea."
  },
  {
    "kind": "paragraph",
    "text": "O DNS do cluster cria nomes para Services. Uma aplicação no mesmo namespace pode usar apenas o nome curto; em outros namespaces, usa nome qualificado como clientes-api.pagamentos.svc. O TTL, o comportamento do resolver, pools de conexão e atualizações de EndpointSlices influenciam quanto tempo consumidores mantêm destinos antigos. Uma conexão já estabelecida não é movida automaticamente quando o conjunto de Pods muda."
  },
  {
    "kind": "paragraph",
    "text": "EndpointSlices representam endereços de backend associados a Services e incluem condições como ready, serving e terminating. Proxies e controladores usam essas informações para programar tráfego. Se uma readiness probe falha, o Pod pode continuar Running, mas deixar de aparecer como destino pronto. Esse detalhe explica por que olhar apenas para a fase do Pod é insuficiente durante incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Service abstrai destinos, mas a implementação de rede continua relevante.",
    "headers": [
      "Tipo de Service",
      "Exposição",
      "Observação"
    ],
    "rows": [
      [
        "ClusterIP",
        "Somente rede do cluster.",
        "Padrão para comunicação interna."
      ],
      [
        "NodePort",
        "Porta em cada nó.",
        "Frequentemente usado como bloco para balanceadores; exige controle de rede."
      ],
      [
        "LoadBalancer",
        "Endereço externo ou interno do provedor.",
        "Custo, health checks e origem do cliente dependem da implementação."
      ],
      [
        "ExternalName",
        "CNAME no DNS do cluster.",
        "Sem selector, proxy ou health check nativo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.6 Ingress e Gateway API",
    "id": "33-6-ingress-e-gateway-api"
  },
  {
    "kind": "paragraph",
    "text": "Ingress é um recurso consolidado para expor HTTP e HTTPS, mas seu modelo é limitado e vários comportamentos dependem de annotations específicas de cada controller. Gateway API evolui essa área com separação explícita de responsabilidades. GatewayClass representa uma implementação; Gateway solicita listeners e infraestrutura; Routes, como HTTPRoute, descrevem como o tráfego é associado a Services."
  },
  {
    "kind": "paragraph",
    "text": "A separação permite que a equipe de plataforma administre classes, endereços e listeners, enquanto equipes de aplicação controlam rotas autorizadas. HTTPRoute oferece matches por hostname, path, headers e outros critérios, além de filtros e múltiplos backends conforme o suporte da implementação. ReferenceGrant controla referências entre namespaces e reduz acoplamento implícito."
  },
  {
    "kind": "paragraph",
    "text": "Para APIs corporativas, Gateway API pode organizar entrada de tráfego sem substituir um API Gateway completo. Autenticação OAuth, quotas por consumidor, monetização, transformação avançada e portal de desenvolvedores podem permanecer em uma plataforma de API Management. O desenho deve decidir onde termina TLS, onde identidade é validada, como o endereço de origem é preservado e quais políticas são aplicadas em cada camada."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-02.svg",
    "alt": "Gateway e Route encaminhando tráfego por Service e EndpointSlices",
    "caption": "Figura 2 - Gateway e Route selecionam o Service; EndpointSlices conduzem o tráfego aos Pods elegíveis."
  },
  {
    "kind": "subhead",
    "text": "HTTPRoute simplificado"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: gateway.networking.k8s.io/v1 kind: HTTPRoute metadata: name: clientes spec: parentRefs: - name: gateway-corporativo hostnames: - api.example.com rules: - matches: - path: type: PathPrefix value: /clientes backendRefs: - name: clientes-api port: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.7 ConfigMaps, Secrets e configuração",
    "id": "33-7-configmaps-secrets-e-configuracao"
  },
  {
    "kind": "paragraph",
    "text": "ConfigMap armazena dados não confidenciais desacoplados da imagem. Pode ser consumido como variáveis de ambiente, argumentos ou arquivos em volumes. Alterações em variáveis não atualizam processos existentes; volumes projetados podem refletir mudanças após algum tempo, mas a aplicação precisa recarregar o arquivo. Reinícios controlados por hash de configuração são comuns para tornar a versão efetiva explícita."
  },
  {
    "kind": "paragraph",
    "text": "Secret representa pequena quantidade de dados sensíveis, porém sua existência não garante proteção completa. Dados podem ser apenas codificados em base64 no manifesto, persistidos em etcd e expostos a usuários com permissão de leitura ou criação de Pods capazes de montá-los. Boas práticas incluem criptografia em repouso, RBAC mínimo, integração com KMS ou provedores CSI, rotação e impedimento de logs acidentais."
  },
  {
    "kind": "paragraph",
    "text": "Configuração deve ser versionada e validada como parte do contrato operacional. Timeouts, URLs, flags, certificados e limites precisam de schema, ownership e estratégia de rollback. Colocar grandes arquivos, artefatos binários ou segredos de longa duração em objetos genéricos aumenta risco. Para APIs, configuração inválida deve causar falha clara de inicialização, não comportamento parcialmente funcional."
  },
  {
    "kind": "subhead",
    "text": "Segredo não é identidade"
  },
  {
    "kind": "paragraph",
    "text": "Montar uma credencial estática em todos os Pods cria distribuição e rotação difíceis. Quando possível, prefira identidade de workload e credenciais temporárias vinculadas ao ServiceAccount ou ao provedor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.8 Requests, limits e classes de QoS",
    "id": "33-8-requests-limits-e-classes-de-qos"
  },
  {
    "kind": "paragraph",
    "text": "Requests expressam recursos usados pelo scheduler para posicionar Pods e são base para vários mecanismos de autoscaling e capacidade. Limits restringem consumo conforme o recurso e runtime. CPU acima do limit tende a ser throttled; memória ultrapassando o limite pode levar a OOMKill. Um request muito baixo causa overcommit e competição; muito alto impede scheduling e desperdiça capacidade reservada."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes classifica Pods em classes de QoS conforme requests e limits. Guaranteed exige igualdade de request e limit para CPU e memória de todos os containers. Burstable cobre os demais Pods com alguma reserva. BestEffort não possui requests ou limits e tende a ser o primeiro candidato em pressão de recursos. QoS não substitui prioridade, PDB ou capacidade; é apenas um dos sinais usados em situações de pressão."
  },
  {
    "kind": "paragraph",
    "text": "Para APIs, valores devem vir de testes e telemetria. CPU costuma acompanhar throughput, enquanto memória pode depender de heap, cache, buffers, conexões e payloads. Sidecars também consomem recursos e precisam entrar no cálculo. Limites rígidos podem aumentar latência por throttling; ausência de limites pode permitir que uma falha afete o nó inteiro. A decisão precisa equilibrar isolamento, eficiência e comportamento do runtime."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Requests e limits são parâmetros de engenharia, não valores decorativos.",
    "headers": [
      "Configuração",
      "Efeito principal",
      "Falha comum"
    ],
    "rows": [
      [
        "CPU request",
        "Reserva lógica para scheduling.",
        "Baixo demais gera contenção; alto demais deixa Pod Pending."
      ],
      [
        "CPU limit",
        "Teto de tempo de CPU.",
        "Throttling e latência elevada."
      ],
      [
        "Memory request",
        "Base de scheduling e capacidade.",
        "Subestimativa produz pressão e evictions."
      ],
      [
        "Memory limit",
        "Teto de memória do container.",
        "OOMKill e reinício."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.9 Startup, readiness e liveness probes",
    "id": "33-9-startup-readiness-e-liveness-probes"
  },
  {
    "kind": "paragraph",
    "text": "Startup probe indica se a aplicação terminou de iniciar. Enquanto ela não obtém sucesso, liveness e readiness podem ser suprimidas, evitando que uma aplicação lenta seja reiniciada antes de ficar pronta. Readiness determina se o endpoint deve receber tráfego; falha remove o Pod dos destinos prontos. Liveness sinaliza que o processo está irrecuperavelmente travado e deve ser reiniciado."
  },
  {
    "kind": "paragraph",
    "text": "Misturar essas responsabilidades é perigoso. Uma liveness probe que consulta banco, DNS ou serviço externo pode reiniciar todas as réplicas durante uma falha downstream, ampliando o incidente. Readiness pode considerar dependências essenciais, mas precisa evitar flapping e efeitos em cascata. A resposta da probe deve ser barata, determinística e possuir timeout menor que o período."
  },
  {
    "kind": "paragraph",
    "text": "Durante término, a aplicação precisa falhar readiness antes de fechar conexões, permitindo que o balanceamento pare de enviar novas requisições. preStop pode auxiliar, mas não deve depender de tempo arbitrário sem observação. O grace period deve cobrir drenagem, requisições longas e flush de telemetria. WebSocket, gRPC streaming e consumidores de mensageria exigem lógica própria de encerramento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-03.svg",
    "alt": "Probes de startup, readiness e liveness com responsabilidades distintas",
    "caption": "Figura 3 - Startup, readiness e liveness controlam momentos e decisões distintas."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de probes com responsabilidades separadas"
  },
  {
    "kind": "paragraph",
    "text": "startupProbe: httpGet: path: /health/startup port: 8080 periodSeconds: 5 failureThreshold: 30 readinessProbe: httpGet: path: /health/ready port: 8080 periodSeconds: 5 timeoutSeconds: 2 livenessProbe: httpGet: path: /health/live port: 8080 periodSeconds: 10 failureThreshold: 3"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.10 Autoscaling e capacidade",
    "id": "33-10-autoscaling-e-capacidade"
  },
  {
    "kind": "paragraph",
    "text": "HorizontalPodAutoscaler ajusta a quantidade desejada de réplicas de um alvo escalável com base em métricas. CPU e memória podem vir da resource metrics API; métricas customizadas e externas exigem adaptadores. O cálculo usa requests como referência em vários cenários, portanto requests ausentes ou incorretos prejudicam o comportamento. Políticas de scaleUp, scaleDown, stabilizationWindow e tolerance reduzem oscilações."
  },
  {
    "kind": "paragraph",
    "text": "VerticalPodAutoscaler recomenda ou aplica novos requests e limits conforme histórico, dependendo do modo e da implementação instalada. Mudanças podem exigir recriação de Pods. HPA e VPA podem competir quando ambos atuam sobre a mesma métrica, por isso a arquitetura precisa definir responsabilidades. Node autoscaling adiciona ou consolida nós quando Pods não podem ser agendados ou há capacidade ociosa."
  },
  {
    "kind": "paragraph",
    "text": "Escala horizontal não remove limites externos. Se todas as réplicas usam o mesmo pool de banco, aumentar Pods pode saturar conexões mais cedo. Métricas de RPS, filas, latência ou concorrência frequentemente representam melhor a demanda de APIs do que CPU isolada. O tempo de inicialização, warm-up de cache e velocidade de provisionamento de nós precisam entrar no dimensionamento para picos."
  },
  {
    "kind": "subhead",
    "text": "Escala coordenada em múltiplas camadas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-04.svg",
    "alt": "HPA, scheduler e capacidade de nós em um sistema acoplado",
    "caption": "Figura 4 - HPA, scheduler e capacidade de nós formam um sistema acoplado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.11 Scheduling, topologia e disponibilidade",
    "id": "33-11-scheduling-topologia-e-disponibilidade"
  },
  {
    "kind": "paragraph",
    "text": "O scheduler filtra e pontua nós conforme recursos, selectors, affinity, taints, tolerations e restrições de topologia. nodeSelector é simples; node affinity expressa regras obrigatórias ou preferenciais. Pod affinity aproxima workloads, enquanto anti-affinity e topology spread constraints distribuem réplicas entre nós e zonas. Restrições excessivas podem deixar Pods Pending durante falhas ou expansão."
  },
  {
    "kind": "paragraph",
    "text": "Taints repelem Pods sem toleration correspondente e são úteis para nós dedicados, GPUs, workloads críticos ou condições especiais. Toleration apenas permite o agendamento; não garante preferência ou exclusividade. PriorityClass influencia preemption, podendo remover Pods de menor prioridade para acomodar trabalho crítico. Esse mecanismo precisa de governança para não transformar toda aplicação em prioridade máxima."
  },
  {
    "kind": "paragraph",
    "text": "PodDisruptionBudget limita interrupções voluntárias simultâneas, como drenagem e manutenção, mas não protege contra falha de nó ou aplicação. Um PDB incompatível com a quantidade de réplicas pode bloquear upgrades. Disponibilidade real combina réplicas, distribuição entre zonas, probes, capacidade, timeouts e redundância de dependências. Ter três Pods no mesmo nó não oferece tolerância à perda do nó."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Scheduling traduz requisitos de isolamento e disponibilidade em restrições.",
    "headers": [
      "Mecanismo",
      "Pergunta respondida",
      "Cuidado"
    ],
    "rows": [
      [
        "Affinity / anti-affinity",
        "Quais Pods ou nós devem ficar próximos ou separados?",
        "Regras obrigatórias podem reduzir capacidade elegível."
      ],
      [
        "Topology spread",
        "Como distribuir réplicas por domínio?",
        "Labels de topologia precisam ser confiáveis."
      ],
      [
        "Taints / tolerations",
        "Quais workloads podem usar determinado nó?",
        "Toleration não cria afinidade."
      ],
      [
        "PDB",
        "Quantas interrupções voluntárias são permitidas?",
        "Não cobre falhas involuntárias nem substitui réplicas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.12 Segurança, identidade e isolamento de rede",
    "id": "33-12-seguranca-identidade-e-isolamento-de-rede"
  },
  {
    "kind": "paragraph",
    "text": "ServiceAccount fornece identidade para processos em Pods quando eles acessam a API do Kubernetes ou sistemas integrados. Tokens projetados são temporários, possuem audience e podem ser vinculados ao ciclo de vida do Pod. Cada workload deve possuir ServiceAccount específico e automountServiceAccountToken deve ser desabilitado quando o token não é necessário. Identidade do workload não deve ser compartilhada entre aplicações sem motivo."
  },
  {
    "kind": "paragraph",
    "text": "RBAC controla ações sobre recursos da API por meio de Roles, ClusterRoles e bindings. Permissões como criar Pods, atualizar Deployments, ler Secrets ou vincular roles podem permitir escalada indireta. O princípio do menor privilégio exige revisar verbos, recursos, subresources, namespaces e capacidade de impersonation. Acesso humano e de automações deve ser auditado e separado."
  },
  {
    "kind": "paragraph",
    "text": "Pod Security Standards definem níveis Privileged, Baseline e Restricted para propriedades de segurança dos Pods. Admission pode aplicar políticas por namespace. NetworkPolicy controla comunicação permitida entre Pods e entidades de rede, desde que o plugin CNI implemente o recurso. Políticas default-deny, egress explícito, execução sem root, filesystem read-only, seccomp e capabilities mínimas reduzem impacto de comprometimento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-05.svg",
    "alt": "Camadas de segurança protegendo workloads e segredos",
    "caption": "Figura 5 - Segurança efetiva combina identidade, autorização, políticas de Pod, rede e proteção de segredos."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Cada controle protege uma superfície diferente.",
    "headers": [
      "Controle",
      "Escopo",
      "Exemplo para APIs"
    ],
    "rows": [
      [
        "ServiceAccount",
        "Identidade do workload.",
        "API usa credencial temporária para acessar serviço de nuvem."
      ],
      [
        "RBAC",
        "Kubernetes API.",
        "Runtime não pode listar Secrets nem alterar Deployments."
      ],
      [
        "Pod Security",
        "Configuração do Pod.",
        "Sem root, sem privilege escalation e com seccomp."
      ],
      [
        "NetworkPolicy",
        "Tráfego L3/L4 entre workloads.",
        "Somente gateway acessa a porta da API; egress limitado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.13 Namespaces, quotas e multi-tenancy",
    "id": "33-13-namespaces-quotas-e-multi-tenancy"
  },
  {
    "kind": "paragraph",
    "text": "Namespaces organizam nomes e políticas, mas não são uma fronteira de segurança absoluta por si só. Muitos recursos, como Roles, ResourceQuotas e NetworkPolicies, são namespace-scoped, o que permite delegar partes do cluster a equipes. Recursos cluster-scoped, nós, CRDs e componentes compartilhados continuam exigindo governança central."
  },
  {
    "kind": "paragraph",
    "text": "ResourceQuota limita consumo agregado de CPU, memória, armazenamento e quantidade de objetos em um namespace. LimitRange define defaults e limites por objeto. Quotas evitam que um time consuma toda a capacidade, mas valores rígidos sem processo de ajuste podem bloquear rollouts e resposta a incidentes. Ambientes compartilhados também precisam de isolamento de rede, RBAC, admission e observabilidade por tenant."
  },
  {
    "kind": "paragraph",
    "text": "Multi-tenancy forte pode exigir clusters separados, virtualização ou mecanismos adicionais conforme o risco. Isolamento por namespace costuma ser adequado para times da mesma organização com confiança parcial; não deve ser assumido como equivalente a ambientes fisicamente independentes. A decisão precisa considerar dados, requisitos regulatórios, blast radius, custo e capacidade de operação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.14 Armazenamento e workloads stateful",
    "id": "33-14-armazenamento-e-workloads-stateful"
  },
  {
    "kind": "paragraph",
    "text": "Volumes resolvem necessidades de dados dentro do ciclo do Pod, enquanto PersistentVolume e PersistentVolumeClaim abstraem armazenamento com ciclo de vida próprio. StorageClass descreve classes e provisionamento dinâmico. Access modes, reclaim policy, expansão, snapshots, zonas e desempenho variam conforme o driver CSI e o provedor. Um PVC Bound não garante que a aplicação tenha consistência ou backup adequado."
  },
  {
    "kind": "paragraph",
    "text": "StatefulSet fornece identidade estável, ordenação e templates de volume por réplica, mas não transforma qualquer banco em sistema distribuído seguro. Operadores de banco podem automatizar membros, failover e backup, porém adicionam dependência crítica de um controller. Para a maioria das APIs stateless, dados devem permanecer em serviços externos desenhados para persistência, enquanto Pods podem ser substituídos livremente."
  },
  {
    "kind": "paragraph",
    "text": "Backups precisam incluir dados, metadados e capacidade de restauração testada. Copiar manifests não recupera volumes nem estado externo. Mudanças de schema devem ser compatíveis com rollouts e rollback. Jobs de migração precisam de locking, idempotência e observabilidade; executá-los como init container de cada réplica pode produzir concorrência e indisponibilidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.15 Observabilidade do cluster e das APIs",
    "id": "33-15-observabilidade-do-cluster-e-das-apis"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes produz múltiplas fontes: métricas de componentes e nós, logs de containers e sistema, eventos de objetos, audit logs e status dos recursos. Eventos são úteis para scheduling, pulls, probes e admission, mas têm retenção limitada e não substituem logs centralizados. Logs precisam de armazenamento com ciclo independente de Pods e nós para sobreviver a reinícios e evictions."
  },
  {
    "kind": "paragraph",
    "text": "A aplicação deve continuar emitindo logs estruturados, métricas e traces como estudado no capítulo anterior. Resource attributes como cluster, namespace, Pod, container e Deployment permitem correlação. kube-state-metrics expõe estado de objetos; metrics-server atende a resource metrics API e autoscaling, não substitui uma plataforma completa de observabilidade. O Collector pode ser implantado como agente por nó e como gateway central conforme volume e requisitos."
  },
  {
    "kind": "paragraph",
    "text": "Alertas devem relacionar sintomas do usuário a sinais do cluster. Aumento de 5xx pode coincidir com Pods não prontos, OOMKills, throttling, DNS, NetworkPolicy ou backend externo. Dashboards apenas de CPU não explicam essa cadeia. Traces com identidade do Pod, logs com trace_id e métricas por revisão reduzem o tempo para separar falha de plataforma e falha de aplicação."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Diagnóstico confiável combina estado declarativo e telemetria de execução.",
    "headers": [
      "Evidência",
      "Pergunta",
      "Ferramenta ou objeto"
    ],
    "rows": [
      [
        "Status e conditions",
        "O controller alcançou o desejado?",
        "kubectl get/describe e API do objeto."
      ],
      [
        "Events",
        "Qual decisão recente ocorreu?",
        "Eventos de scheduling, pull, probe e volume."
      ],
      [
        "Logs",
        "O que o processo registrou?",
        "Logs do container, sidecar e componentes."
      ],
      [
        "Métricas e traces",
        "Qual impacto e caminho?",
        "Prometheus/OpenTelemetry e backend de observabilidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.16 Entrega declarativa, imagens e cadeia de suprimentos",
    "id": "33-16-entrega-declarativa-imagens-e-cadeia-de-suprimentos"
  },
  {
    "kind": "paragraph",
    "text": "Uma cadeia segura começa pela imagem. O build deve ser reproduzível, usar base mínima e atualizada, produzir SBOM, executar scanners e assinar o artefato. Tags mutáveis dificultam auditoria; digests identificam conteúdo exato. O runtime deve restringir registries, verificar assinaturas conforme a política e impedir containers privilegiados ou imagens não aprovadas."
  },
  {
    "kind": "paragraph",
    "text": "Manifestos podem ser gerenciados com YAML, Kustomize, Helm ou ferramentas equivalentes. GitOps mantém o estado desejado em repositório e um controller reconcilia o cluster, criando trilha auditável. Isso não elimina validação: pull requests precisam de schema, policy-as-code, diff, teste e segregação de funções. Segredos não devem ser commitados em texto claro."
  },
  {
    "kind": "paragraph",
    "text": "Rollouts precisam de readiness, estratégia de surge, capacidade temporária e métricas de sucesso. Progressive delivery pode pausar, analisar SLOs e promover gradualmente. Rollback deve considerar banco e contratos. Uma implantação tecnicamente bem-sucedida, mas com erro funcional, só será interrompida se telemetria e critérios de promoção representarem a experiência real do consumidor."
  },
  {
    "kind": "subhead",
    "text": "Entrega declarativa: do artefato ao estado reconciliado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-06.svg",
    "alt": "GitOps reconciliando estado desejado e estado observado",
    "caption": "Figura 6 - GitOps torna o estado desejado auditável; controllers continuam responsáveis pela convergência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.17 API Gateways, service mesh e Kubernetes",
    "id": "33-17-api-gateways-service-mesh-e-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "Em Kubernetes, ingress ou Gateway API cuida da entrada e do roteamento até Services, enquanto uma plataforma de API Management pode fornecer catálogo, autenticação, quotas, políticas e analytics. O gateway pode executar fora, na borda do cluster ou como workload interno. A decisão afeta latência, blast radius, gestão de certificados e dependência do próprio cluster para receber tráfego."
  },
  {
    "kind": "paragraph",
    "text": "Service mesh atua principalmente no tráfego east-west e fornece identidade de workload, mTLS, telemetria e políticas. Não deve duplicar de forma descoordenada retries, timeouts e circuit breakers já existentes no cliente ou gateway. A cadeia consumidor - edge - API gateway - mesh - serviço pode possuir vários pontos de terminação TLS e observabilidade; o desenho precisa documentar a autoridade de cada camada."
  },
  {
    "kind": "paragraph",
    "text": "Gateways e proxies também precisam de requests, limits, probes, PDBs e distribuição por zonas. O fato de serem infraestrutura compartilhada aumenta seu impacto. Atualizações devem preservar conexões, rotas e políticas. Contadores distribuídos de rate limiting, caches e stores de sessão precisam de arquitetura própria; não devem depender apenas da quantidade de réplicas do gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.18 Troubleshooting de APIs no Kubernetes",
    "id": "33-18-troubleshooting-de-apis-no-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico começa pelo sintoma externo e segue por camadas. Se o nome não resolve, investigue DNS e endereço do gateway. Se há timeout de conexão, valide load balancer, listeners, NetworkPolicies e endpoints. Se o gateway responde 503, examine Route, Service, EndpointSlices e readiness. Se o Pod reinicia, consulte container status, lastState, exit code, eventos, limits e logs anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Pending normalmente aponta para scheduling: recursos insuficientes, PVC, affinity, taints ou quotas. ImagePullBackOff indica acesso, nome, tag, credencial ou registry. CrashLoopBackOff é uma política de espera após falhas repetidas, não a causa; a causa está no processo, configuração, probe ou dependência. OOMKilled relaciona-se a memória, enquanto CPU throttling aparece em métricas e latência sem necessariamente reiniciar o container."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas devem ser usadas com hipótese. kubectl describe mostra eventos e condições; logs --previous recupera a execução anterior; port-forward isola caminho de rede; ephemeral containers ajudam quando a imagem não possui utilitários. Capturas, DNS e testes de conectividade devem respeitar autorização. Alterar probe, política ou limit sem evidência pode ocultar o problema e criar outro incidente."
  },
  {
    "kind": "subhead",
    "text": "Troubleshooting orientado por camadas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/pt/figure-07.svg",
    "alt": "Fluxo de troubleshooting desde objetos Kubernetes até a aplicação",
    "caption": "Figura 7 - A investigação progride do objeto declarado ao comportamento da aplicação e suas dependências."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Estados conhecidos reduzem troubleshooting por tentativa e erro.",
    "headers": [
      "Sintoma",
      "Evidência inicial",
      "Hipóteses"
    ],
    "rows": [
      [
        "Pod Pending",
        "Events e scheduler message.",
        "Recursos, affinity, taint, PVC, quota."
      ],
      [
        "CrashLoopBackOff",
        "Logs atuais/anteriores e exit code.",
        "Configuração, processo, probe ou dependência."
      ],
      [
        "Service sem endpoints",
        "EndpointSlices e readiness.",
        "Selector incorreto ou Pods não prontos."
      ],
      [
        "503 no gateway",
        "Route, Service, endpoints e upstream logs.",
        "Backend indisponível, política ou timeout."
      ],
      [
        "OOMKilled",
        "lastState, limits e métricas.",
        "Heap, leak, cache, payload ou limite baixo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.19 Estudos de caso e laboratórios",
    "id": "33-19-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - rollout com 503: uma nova versão inicia em 70 segundos, mas a liveness começa após 10 segundos e reinicia o container. O Deployment nunca obtém réplicas prontas. A correção separa startup e liveness, ajusta o grace period e adiciona monitoramento por revisão. A causa não estava no Service, embora o consumidor observasse 503."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - HPA aumenta erro de banco: o HPA escala de 5 para 40 Pods por CPU, mas cada Pod abre 20 conexões. O banco suporta apenas 300 conexões. A resposta correta inclui pool global coerente, limite de escala, métrica de fila e proteção do backend; simplesmente aumentar o cluster ampliaria a falha."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - API inacessível após default-deny: uma NetworkPolicy ingress permite o namespace do gateway, mas o selector de Pod não corresponde aos labels reais. EndpointSlices continuam prontos, porém pacotes são bloqueados pelo CNI. A investigação compara labels, policy e tráfego, sem remover toda a política permanentemente."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Implante uma API com Deployment, Service e HTTPRoute. 2) Simule falha de readiness e observe EndpointSlices. 3) Configure requests/limits e provoque OOM em ambiente isolado. 4) Aplique HPA e acompanhe métricas. 5) Crie ServiceAccount, RBAC mínimo e NetworkPolicy default-deny. 6) Execute rollout e rollback com observabilidade por revisão."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes fornece uma API declarativa e controllers que reconciliam o estado desejado. Essa abstração permite automatizar réplicas, rollouts, scheduling, configuração e exposição, mas não substitui decisões sobre contratos, dependências e consistência. Para APIs, cada objeto precisa ser relacionado ao caminho da requisição e aos sinais usados para operação."
  },
  {
    "kind": "paragraph",
    "text": "Pods são efêmeros; Deployments controlam revisões; Services e EndpointSlices fornecem descoberta; Gateway API organiza entrada e rotas. Requests, limits, probes, autoscaling e scheduling formam um sistema acoplado. Configurações incoerentes criam indisponibilidade mesmo quando todos os objetos parecem válidos individualmente."
  },
  {
    "kind": "paragraph",
    "text": "Segurança combina ServiceAccounts, RBAC, Pod Security, NetworkPolicy, segredos, cadeia de suprimentos e isolamento. Observabilidade combina estado, eventos, logs, métricas e traces. Entrega segura usa artefatos imutáveis, validação, reconciliação e critérios de promoção. Troubleshooting eficaz parte do estado observado e avança por camadas."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda Zero Trust aplicado a APIs, conectando identidade de workloads, menor privilégio, segmentação, verificação contínua e políticas distribuídas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist para APIs em Kubernetes",
    "id": "checklist-para-apis-em-kubernetes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Deployment usa imagem imutável, estratégia de rollout e rollback compatíveis com banco e contratos.",
      "Requests e limits foram definidos por teste e telemetria, incluindo sidecars.",
      "Startup, readiness e liveness respondem a perguntas distintas.",
      "Service e Route possuem selectors, portas, hostnames e referências validados.",
      "HPA usa métrica representativa e respeita capacidade de dependências.",
      "Réplicas estão distribuídas por nós e zonas, com PDB coerente.",
      "ServiceAccount e RBAC seguem menor privilégio; token é desabilitado quando desnecessário.",
      "Pod Security e NetworkPolicies reduzem privilégios e caminhos de rede.",
      "Secrets usam criptografia, rotação e acesso mínimo.",
      "Logs, métricas, traces, eventos e status estão correlacionados por revisão e Pod.",
      "Pipeline valida manifests, políticas, imagens e condições de rollout.",
      "Runbooks cobrem Pending, pull, crash, OOM, endpoints vazios, DNS e 503."
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
      "Explique a diferença entre aplicar um manifesto e alcançar o estado desejado.",
      "Compare Pod, Deployment, StatefulSet, DaemonSet, Job e CronJob.",
      "Descreva o caminho DNS/Gateway/Route/Service/EndpointSlice/Pod.",
      "Explique por que um Pod Running pode não receber tráfego.",
      "Proponha requests, limits e probes para uma API Java com inicialização lenta.",
      "Compare HPA, VPA e node autoscaling e identifique possíveis conflitos.",
      "Projete RBAC e NetworkPolicy mínimos para uma API acessível apenas pelo gateway.",
      "Explique como um PDB pode bloquear manutenção e por que não protege contra falha de nó.",
      "Descreva um rollout canary com critérios de promoção baseados em SLO.",
      "Monte um runbook para investigar 503 intermitente após um deploy."
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
        "Admission controller",
        "Etapa que valida ou modifica objetos antes da persistência."
      ],
      [
        "CNI",
        "Interface de plugins que implementam rede de containers e Pods."
      ],
      [
        "Controller",
        "Loop que reconcilia estado observado e desejado."
      ],
      [
        "CRD",
        "Extensão da API que registra um novo tipo de recurso."
      ],
      [
        "CSI",
        "Interface para integração de drivers de armazenamento."
      ],
      [
        "Deployment",
        "Controller de atualizações declarativas para workloads geralmente stateless."
      ],
      [
        "EndpointSlice",
        "Recurso que representa endpoints de rede de um Service."
      ],
      [
        "Gateway API",
        "Família de recursos para roteamento L4/L7 com papéis separados."
      ],
      [
        "HPA",
        "Controller que ajusta réplicas horizontalmente por métricas."
      ],
      [
        "Namespace",
        "Escopo lógico para nomes, políticas e delegação."
      ],
      [
        "NetworkPolicy",
        "Política de comunicação de Pods implementada pelo CNI."
      ],
      [
        "PDB",
        "Limite de interrupções voluntárias simultâneas."
      ],
      [
        "Pod",
        "Menor unidade implantável do Kubernetes."
      ],
      [
        "Service",
        "Abstração de rede estável para um conjunto de backends."
      ],
      [
        "ServiceAccount",
        "Identidade Kubernetes destinada a workloads."
      ],
      [
        "StatefulSet",
        "Controller para Pods com identidade e ordenação estáveis."
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
      "Kubernetes Documentation. Concepts, Cluster Architecture e Components.",
      "Kubernetes Documentation. Pods, Deployments, Services e EndpointSlices.",
      "Kubernetes Documentation. ConfigMaps, Secrets e Persistent Volumes.",
      "Kubernetes Documentation. Probes, Workload Autoscaling e Node Autoscaling.",
      "Kubernetes Documentation. Service Accounts, RBAC Good Practices e Pod Security Standards.",
      "Kubernetes Documentation. Network Policies, Multi-tenancy, Logging e Observability.",
      "Kubernetes Gateway API. API Overview, HTTPRoute, Security e Versioning.",
      "Cloud Native Computing Foundation. Kubernetes project and ecosystem documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes, Gateway API, plugins CNI/CSI e serviços gerenciados evoluem continuamente. Antes de aplicar exemplos, valide a versão do cluster, o suporte da implementação e o estado de estabilidade de cada recurso na documentação oficial."
  }
];
