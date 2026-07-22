import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const SERVICE_MESH_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Service mesh: uma camada de comunicação entre workloads"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/overview.svg",
    "alt": "Plano de controle distribuindo identidade, rotas e políticas para proxies entre serviços",
    "caption": "Figura de abertura - O service mesh introduz uma camada operacional uniforme entre os serviços."
  },
  {
    "kind": "paragraph",
    "text": "O plano de dados aplica controles de forma transparente ao tráfego east-west."
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
    "text": "Nos capítulos anteriores, o API Gateway foi estudado como ponto controlado de exposição, autenticação, políticas e observabilidade do tráfego que entra ou sai de um domínio. Em arquiteturas de microsserviços, entretanto, grande parte da comunicação ocorre dentro do ambiente, entre workloads que mudam de endereço, escalam horizontalmente e dependem de múltiplos serviços. Aplicar manualmente TLS, retries, métricas, autorização e balanceamento em cada aplicação gera duplicação, inconsistência e alto custo de manutenção."
  },
  {
    "kind": "paragraph",
    "text": "Um service mesh cria uma camada de infraestrutura para tratar esse tráfego east-west. A ideia central é separar a lógica de negócio das funções de comunicação. Proxies ou componentes equivalentes interceptam conexões, aplicam políticas e produzem telemetria. Um plano de controle observa o ambiente e distribui configuração aos componentes do plano de dados. Dessa forma, segurança e comportamento de rede podem ser administrados de maneira relativamente uniforme sem incorporar uma biblioteca específica em cada linguagem."
  },
  {
    "kind": "paragraph",
    "text": "Essa abstração não elimina a rede nem resolve automaticamente todos os problemas distribuídos. Pelo contrário: adiciona componentes, certificados, regras de roteamento e novas dependências. Uma configuração incorreta de retry pode multiplicar carga; uma política de autorização pode interromper tráfego legítimo; um proxy pode mascarar a origem de latência; e uma atualização mal coordenada do plano de controle pode produzir divergência de configuração. A adoção precisa ser orientada por problemas reais e acompanhada de capacidade operacional."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo aprofunda os conceitos de service mesh e compara três peças importantes do ecossistema. Istio oferece um plano de controle amplo e dois modelos de plano de dados: sidecar e ambient. Linkerd enfatiza simplicidade operacional e utiliza um microproxy próprio escrito em Rust. Envoy é um proxy de alto desempenho usado como data plane por Istio e por diversas plataformas, podendo atuar também em gateways e proxies independentes."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada recurso do mesh, identifique onde a decisão é declarada, qual componente distribui a configuração, onde ela é executada no caminho do tráfego e quais evidências comprovam o comportamento. Essa sequência reduz diagnósticos baseados apenas em manifests ou dashboards."
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
      "Explicar o problema que um service mesh procura resolver e seus custos arquiteturais.",
      "Distinguir tráfego north-south e east-west, além das fronteiras entre gateway e mesh.",
      "Descrever plano de controle, plano de dados, sidecar, ztunnel e waypoint proxy.",
      "Compreender mTLS entre workloads, identidade de serviço e autorização baseada em principal.",
      "Aplicar traffic splitting, retries, timeouts, circuit breaking e fault injection com senso crítico.",
      "Interpretar a arquitetura do Istio em sidecar mode e ambient mode.",
      "Interpretar a arquitetura do Linkerd, seus microproxies e componentes de identidade e discovery.",
      "Explicar listeners, filtros, routes, clusters, endpoints e xDS no Envoy.",
      "Relacionar service mesh a Gateway API, GAMMA, multi-cluster e observabilidade.",
      "Diagnosticar falhas de injeção, mTLS, protocolo, rota, policy e capacidade."
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
      "29.1 O problema da comunicação entre serviços; 29.2 O que é service mesh; 29.3 North-south x east-west; 29.4 Control plane e data plane; 29.5 Interceptação de tráfego; 29.6 Identidade e mTLS; 29.7 Autorização; 29.8 Traffic management; 29.9 Resiliência; 29.10 Observabilidade; 29.11 Istio; 29.12 Sidecar mode; 29.13 Ambient mode; 29.14 Linkerd; 29.15 Envoy; 29.16 xDS; 29.17 Gateway API e GAMMA; 29.18 Multi-cluster; 29.19 Egress; 29.20 Performance; 29.21 Segurança; 29.22 Operação e upgrades; 29.23 Troubleshooting; 29.24 Estudos de caso e laboratórios; resumo, checklist, exercícios, glossário e referências."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.1 O problema da comunicação entre serviços",
    "id": "29-1-o-problema-da-comunicacao-entre-servicos"
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação monolítica executa chamadas internas dentro do mesmo processo. Em uma arquitetura distribuída, a chamada vira comunicação de rede e passa a depender de DNS, sockets, balanceamento, TLS, timeouts, filas, retries e observabilidade. A semântica de uma função local não corresponde à semântica de uma chamada remota: a resposta pode atrasar, o request pode ter sido processado mesmo que o cliente receba timeout e o destino pode mudar durante a execução."
  },
  {
    "kind": "paragraph",
    "text": "Quando cada equipe implementa essas preocupações em bibliotecas próprias, surgem versões divergentes, configurações incompatíveis e dificuldade de governança. Um serviço Java pode usar uma política de retry diferente de um serviço Go; um workload legado pode não emitir métricas; outro pode manter certificados estáticos por anos. O mesh procura deslocar uma parte dessas responsabilidades para a infraestrutura, oferecendo comportamento uniforme ao redor das aplicações."
  },
  {
    "kind": "paragraph",
    "text": "O benefício é maior quando há muitos serviços, múltiplas linguagens, alto volume de mudanças e requisitos fortes de identidade e observabilidade. Em ambientes pequenos, a sobrecarga de instalar, operar e atualizar um mesh pode superar o ganho. A decisão deve considerar complexidade real, maturidade do time, criticidade do tráfego e capacidade de troubleshooting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.2 O que é service mesh",
    "id": "29-2-o-que-e-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Service mesh é uma camada dedicada à comunicação entre serviços. Ela não é um único protocolo e não substitui Kubernetes, API Gateway ou a lógica de negócio. Em sua forma mais comum, consiste em um plano de dados distribuído e um plano de controle. O plano de dados participa diretamente das conexões; o plano de controle calcula e distribui estado, políticas e identidade."
  },
  {
    "kind": "paragraph",
    "text": "O mesh pode fornecer descoberta de serviços, balanceamento, mTLS, autorização, retries, timeouts, circuit breaking, divisão de tráfego, telemetria e integração com tracing. Nem toda implementação oferece todos os recursos, e nem todo recurso deve ser ativado de forma indiscriminada. Por exemplo, retries automáticos são úteis para falhas transitórias, mas perigosos em operações não idempotentes."
  },
  {
    "kind": "paragraph",
    "text": "A transparência é uma propriedade operacional, não uma ausência de efeitos. A aplicação pode não conhecer o proxy, mas sofre os timeouts, resets, cabeçalhos, latência e políticas aplicados por ele. Por isso, arquitetura, SRE e desenvolvimento precisam compartilhar um modelo mental do caminho real da requisição."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/figure-01-control-data-plane.svg",
    "alt": "Separação entre plano de controle e plano de dados do service mesh",
    "caption": "Figura 1 - O plano de controle distribui decisões; o plano de dados aplica essas decisões no tráfego."
  },
  {
    "kind": "paragraph",
    "text": "Tráfego north-south cruza a borda do ambiente: consumidor externo para API Gateway, ingress ou aplicação. Tráfego east-west ocorre entre serviços dentro do ambiente ou entre domínios internos. O API Gateway concentra exposição, produtos, consumidores, autenticação de clientes, quotas e transformação na borda. O service mesh concentra comunicação entre workloads, identidade de serviço, telemetria e política distribuída."
  },
  {
    "kind": "paragraph",
    "text": "As fronteiras podem se sobrepor. Istio e Envoy também podem implementar ingress e egress gateways. Um API Gateway pode estar dentro do mesh e receber mTLS como qualquer workload. O erro arquitetural é presumir que uma tecnologia substitui automaticamente a outra. A pergunta correta é qual plano de governança, qual público e qual tipo de contrato cada componente controla."
  },
  {
    "kind": "paragraph",
    "text": "Em uma plataforma bancária, por exemplo, o APIM ou Axway pode autenticar o aplicativo e aplicar quotas no tráfego externo, enquanto o mesh autentica o gateway como workload e controla quais serviços internos podem ser chamados. Identidade do usuário e identidade do workload são contextos distintos e podem precisar ser propagados simultaneamente."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Gateway e mesh podem coexistir com responsabilidades complementares.",
    "headers": [
      "Componente",
      "Foco principal",
      "Exemplos de responsabilidade"
    ],
    "rows": [
      [
        "API Gateway",
        "Exposição e governança de APIs.",
        "Produtos, consumidores, OAuth, quotas, transformação e portal."
      ],
      [
        "Ingress Gateway",
        "Entrada de tráfego no cluster.",
        "TLS, host, path e roteamento inicial."
      ],
      [
        "Service Mesh",
        "Comunicação east-west.",
        "mTLS, policy de workload, retries, telemetry e traffic split."
      ],
      [
        "Egress Gateway",
        "Saída controlada.",
        "Política, auditoria e origem estável para destinos externos."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "O plano de dados precisa executar decisões com baixa latência e alta disponibilidade. Ele intercepta conexões, reconhece protocolo, seleciona destinos, estabelece TLS, aplica filtros e exporta métricas. Como participa de cada requisição, falhas de CPU, memória, configuração ou atualização no data plane afetam diretamente o tráfego."
  },
  {
    "kind": "paragraph",
    "text": "O plano de controle observa serviços, endpoints, identidades e recursos declarativos. A partir disso, produz configuração para os proxies. Em Istio, o istiod consolida discovery, configuração e emissão de identidade. Em Linkerd, serviços como destination e identity cumprem papéis específicos. No ecossistema Envoy, control planes usam APIs xDS para publicar listeners, routes, clusters, endpoints e secrets."
  },
  {
    "kind": "paragraph",
    "text": "A separação reduz dependência do plano de controle durante cada request. Proxies normalmente continuam usando a última configuração válida se o control plane ficar temporariamente indisponível. Entretanto, mudanças de endpoints, certificados ou políticas deixam de propagar. Assim, saúde do plano de controle e convergência do data plane precisam ser monitoradas separadamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.5 Interceptação de tráfego: sidecar, CNI e dataplanes por nó",
    "id": "29-5-interceptacao-de-trafego-sidecar-cni-e-dataplanes-por-no"
  },
  {
    "kind": "paragraph",
    "text": "No modelo sidecar, cada pod recebe um proxy adicional. Regras de iptables ou eBPF redirecionam tráfego de entrada e saída para esse proxy. O benefício é isolamento por workload e capacidade L7 próxima da aplicação. O custo inclui CPU e memória por pod, aumento do tempo de inicialização, necessidade de injeção e coordenação do ciclo de vida entre aplicação e proxy."
  },
  {
    "kind": "paragraph",
    "text": "Um plugin CNI pode instalar regras de redirecionamento fora do init container, reduzindo privilégios no pod. Ainda assim, o operador precisa conhecer portas excluídas, probes, tráfego do próprio proxy e condições em que uma conexão contorna o mesh. Marcar um namespace como injetado não prova que todos os pods atuais receberam sidecar; pods existentes precisam ser recriados."
  },
  {
    "kind": "paragraph",
    "text": "No modelo ambient do Istio, um ztunnel por nó fornece conectividade segura e políticas L4. Workloads que precisam de recursos L7 podem usar waypoint proxies baseados em Envoy. Isso reduz a necessidade de um sidecar em cada pod, mas introduz outra topologia operacional e exige compreender quais controles são aplicados no ztunnel e quais dependem do waypoint."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/figure-02-sidecar-ambient.svg",
    "alt": "Modelos sidecar e ambient do plano de dados do Istio",
    "caption": "Figura 2 - O Istio oferece sidecars por pod ou um plano de dados ambient dividido em L4 e L7."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.6 Identidade de workload e mTLS automático",
    "id": "29-6-identidade-de-workload-e-mtls-automatico"
  },
  {
    "kind": "paragraph",
    "text": "A segurança de um mesh começa pela identidade do workload. Em vez de confiar apenas no endereço IP, o proxy apresenta um certificado ligado a uma identidade do ambiente, frequentemente derivada de namespace e ServiceAccount. O peer valida a cadeia, o nome esperado e as políticas associadas. Assim, a autorização pode continuar válida mesmo quando o endereço do pod muda."
  },
  {
    "kind": "paragraph",
    "text": "O mTLS fornece confidencialidade, integridade e autenticação mútua entre proxies. Ele não prova, por si só, qual usuário final iniciou a operação. Para preservar contexto de negócio, o serviço pode continuar validando access tokens, claims ou outros elementos de identidade. O mesh protege a comunicação e identifica o workload; a aplicação decide o que aquele usuário ou processo pode fazer no domínio."
  },
  {
    "kind": "paragraph",
    "text": "Operação de certificados exige atenção a trust anchors, issuers, duração, renovação e relógio. Linkerd, por exemplo, vincula certificados à ServiceAccount e usa certificados de curta duração nos proxies. Istio pode emitir identidades usando sua CA ou integrar-se a uma PKI externa. Em multi-cluster, a estratégia de confiança determina quais identidades são reconhecidas entre ambientes."
  },
  {
    "kind": "subhead",
    "text": "mTLS não é autorização completa"
  },
  {
    "kind": "paragraph",
    "text": "Uma conexão autenticada informa quem é o workload remoto. Ainda é necessário declarar quais identidades podem acessar qual serviço, porta, método ou caminho. Sem policy de autorização, criptografia pode proteger tráfego indevido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.7 Autorização de serviço e política L4/L7",
    "id": "29-7-autorizacao-de-servico-e-politica-l4-l7"
  },
  {
    "kind": "paragraph",
    "text": "Políticas L4 avaliam propriedades como identidade da origem, namespace, porta e protocolo de transporte. Elas são eficientes e funcionam mesmo quando o proxy não interpreta HTTP. Políticas L7 podem considerar método, path, host, headers e claims. Esse nível oferece granularidade maior, mas depende de reconhecimento de protocolo e de um componente capaz de executar filtros de aplicação."
  },
  {
    "kind": "paragraph",
    "text": "No Istio ambient, autorização L4 pode ser aplicada no ztunnel, enquanto regras L7 dependem de waypoint. No modo sidecar, o Envoy do pod executa os dois níveis. Em Linkerd, o proxy inbound aplica políticas de autorização, e recursos de policy podem definir servidores, rotas e identidades permitidas. O desenho deve começar com default deny para superfícies sensíveis e exceções explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Uma política incorreta pode criar indisponibilidade total. Por isso, implantação gradual, modo de auditoria quando disponível, testes de integração e métricas de negação são indispensáveis. A regra deve ser revisada junto ao contrato da aplicação: permitir GET em um path não equivale a autorizar qualquer operação de negócio acessível por esse path."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.8 Traffic management e progressive delivery",
    "id": "29-8-traffic-management-e-progressive-delivery"
  },
  {
    "kind": "paragraph",
    "text": "O mesh pode dividir tráfego entre versões, aplicar canary, espelhamento, afinidade, roteamento por header e seleção baseada em identidade. Essas capacidades ajudam a realizar progressive delivery sem incorporar lógica de roteamento em cada aplicação. A regra declarativa é convertida pelo control plane em configuração distribuída aos proxies."
  },
  {
    "kind": "paragraph",
    "text": "Traffic splitting precisa considerar unidade de balanceamento e persistência. Uma regra 90/10 normalmente distribui requests, não usuários nem transações de negócio. Em conexões longas, HTTP/2 ou gRPC streaming, poucas conexões podem concentrar muito tráfego. Métricas por request e por conexão devem ser analisadas antes de concluir que a divisão atingiu a proporção planejada."
  },
  {
    "kind": "paragraph",
    "text": "Além disso, roteamento por cabeçalho pode criar dependência de metadados que atravessam fronteiras de confiança. Cabeçalhos usados para canary ou tenant devem ser produzidos por componentes confiáveis ou validados. Permitir que qualquer cliente escolha uma versão privilegiada pode contornar controles de rollout."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/figure-03-traffic-management.svg",
    "alt": "Traffic management transformando regra declarativa em divisão ponderada",
    "caption": "Figura 3 - A intenção declarativa só produz o resultado esperado quando o proxy possui endpoints e métricas corretas."
  },
  {
    "kind": "paragraph",
    "text": "Timeout define quanto tempo o chamador aceita esperar. Retry cria uma nova tentativa após uma falha considerada transitória. Circuit breaking limita conexões, requests pendentes ou erros para impedir saturação. Fault injection introduz atraso ou falha controlada para testar resiliência. Esses mecanismos são poderosos, mas interagem de maneira não linear."
  },
  {
    "kind": "paragraph",
    "text": "Um retry configurado no cliente, no proxy sidecar e no gateway pode multiplicar tentativas. Três camadas com duas tentativas adicionais podem produzir até vinte e sete execuções em uma cadeia de três serviços. Por isso, budgets de retry, idempotência, deadlines propagados e observabilidade por tentativa são essenciais. O ponto de retry deve ser escolhido conscientemente."
  },
  {
    "kind": "paragraph",
    "text": "Circuit breakers do proxy protegem recursos de transporte, mas não substituem limites de negócio nem mecanismos de fila. Fault injection deve ser restrita a ambientes, usuários ou percentuais controlados. Uma regra ampla em produção pode simular uma falha real e dificultar a distinção entre experimento e incidente."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Resiliência exige limites coordenados entre aplicação, gateway e mesh.",
    "headers": [
      "Mecanismo",
      "Objetivo",
      "Risco de configuração incorreta"
    ],
    "rows": [
      [
        "Timeout",
        "Limitar espera e liberar recursos.",
        "Prazo curto interrompe operações válidas; prazo longo amplifica filas."
      ],
      [
        "Retry",
        "Recuperar falhas transitórias.",
        "Tempestade de tentativas e duplicação de operações."
      ],
      [
        "Circuit breaking",
        "Conter saturação e falha em cascata.",
        "Rejeições prematuras ou estado divergente entre proxies."
      ],
      [
        "Fault injection",
        "Validar resiliência.",
        "Impacto não intencional em tráfego real."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.10 Observabilidade: métricas, logs e tracing",
    "id": "29-10-observabilidade-metricas-logs-e-tracing"
  },
  {
    "kind": "paragraph",
    "text": "Como o proxy observa tráfego de forma uniforme, o mesh consegue produzir métricas de request rate, error rate, latency, bytes, conexões e status TLS sem modificar cada aplicação. Essa uniformidade é valiosa em ambientes poliglotas. Entretanto, o proxy enxerga o protocolo e o transporte, não necessariamente a semântica completa do negócio."
  },
  {
    "kind": "paragraph",
    "text": "Métricas precisam distinguir reporter de origem e destino, workload, namespace, rota e resposta. Cardinalidade excessiva pode tornar o sistema de métricas caro ou instável. Access logs são úteis para investigação detalhada, mas podem conter tokens, IDs pessoais e payloads sensíveis se os formatos não forem controlados."
  },
  {
    "kind": "paragraph",
    "text": "Tracing distribuído normalmente depende de propagação de contexto pela aplicação. O proxy pode gerar spans e medir a comunicação, mas não consegue inferir sozinho a relação entre chamadas assíncronas ou tarefas internas. O desenho ideal combina spans da aplicação com spans da infraestrutura, usando IDs de correlação consistentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.11 Istio: arquitetura e componentes",
    "id": "29-11-istio-arquitetura-e-componentes"
  },
  {
    "kind": "paragraph",
    "text": "O Istio separa logicamente data plane e control plane. No modo sidecar, proxies Envoy são injetados nos pods e mediam tráfego. O istiod observa recursos do Kubernetes e configurações do mesh, executa service discovery, converte regras em configuração xDS e participa da emissão de identidades para os proxies."
  },
  {
    "kind": "paragraph",
    "text": "Recursos como VirtualService e DestinationRule foram historicamente usados para roteamento e políticas de destino. A adoção de Kubernetes Gateway API aumenta a padronização de recursos de entrada e mesh. Independentemente da API declarativa, o operador precisa verificar a configuração efetivamente recebida pelo Envoy: clusters, routes, listeners e endpoints."
  },
  {
    "kind": "paragraph",
    "text": "Istio oferece ingress e egress gateways, integração com telemetria, autorização, extensão por filtros e Wasm e modelos de implantação multi-cluster. Essa amplitude traz flexibilidade e também uma superfície operacional grande. Profiles, revisões do control plane e canary upgrade ajudam a reduzir risco de atualização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.12 Istio sidecar mode",
    "id": "29-12-istio-sidecar-mode"
  },
  {
    "kind": "paragraph",
    "text": "No sidecar mode, cada workload meshed recebe um Envoy. O proxy outbound resolve destinos, aplica rotas e políticas e abre conexão com o proxy inbound do destino. O proxy inbound valida identidade e aplica autorização. Como cada pod possui data plane dedicado, recursos L7 e extensões podem ser aplicados de forma granular."
  },
  {
    "kind": "paragraph",
    "text": "O custo operacional aparece em memória total, CPU, tempo de startup, quantidade de conexões com o control plane e coordenação de shutdown. A aplicação pode iniciar antes de o proxy estar pronto ou encerrar antes de drenar conexões. Hooks de lifecycle, probes e configurações de holdApplicationUntilProxyStarts precisam ser avaliados conforme o ambiente."
  },
  {
    "kind": "paragraph",
    "text": "Injeção automática depende de labels ou annotations e de um admission webhook. Falhas no webhook podem impedir criação de pods. Excluir portas incorretamente pode contornar mTLS ou gerar loops. Por isso, uma verificação de readiness do mesh deve observar tanto o pod da aplicação quanto a presença e o estado do sidecar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.13 Istio ambient mode: ztunnel e waypoint",
    "id": "29-13-istio-ambient-mode-ztunnel-e-waypoint"
  },
  {
    "kind": "paragraph",
    "text": "O ambient mode busca reduzir a necessidade de sidecars por workload. Um ztunnel executado por nó captura tráfego dos workloads inscritos no mesh, fornece mTLS, identidade, telemetria e policy L4. Quando uma aplicação precisa de roteamento, autorização ou observabilidade L7, um waypoint proxy baseado em Envoy pode ser associado ao serviço ou à identidade relevante."
  },
  {
    "kind": "paragraph",
    "text": "A divisão L4/L7 permite adotar segurança básica com menor custo por pod e adicionar recursos avançados apenas onde necessários. Contudo, troubleshooting muda: o caminho pode passar pelo ztunnel de origem, waypoint e ztunnel de destino. É necessário identificar qual componente deveria processar a policy e onde a conexão foi interrompida."
  },
  {
    "kind": "paragraph",
    "text": "Sidecar e ambient podem coexistir no mesmo mesh. Essa capacidade facilita migração gradual, mas exige testar fluxos entre modos, políticas equivalentes e comportamento de telemetria. Um workload não deve ser inscrito simultaneamente de forma ambígua nos dois modos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.14 Linkerd: arquitetura e princípios",
    "id": "29-14-linkerd-arquitetura-e-principios"
  },
  {
    "kind": "paragraph",
    "text": "O Linkerd também separa control plane e data plane. Seu data plane usa um microproxy transparente escrito em Rust, desenhado especificamente para service mesh. O proxy é injetado como sidecar, intercepta TCP e reconhece HTTP, HTTP/2, gRPC e WebSocket. O foco do projeto é oferecer recursos essenciais com operação relativamente simples e baixo consumo."
  },
  {
    "kind": "paragraph",
    "text": "No control plane, o destination service fornece discovery, identidade esperada do destino, policy e informações de rota. O identity service funciona como autoridade certificadora e emite certificados aos proxies. O proxy injector modifica pods marcados para injeção. Extensões como viz adicionam dashboard e componentes de observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Em uma conexão meshed, o proxy outbound realiza discovery, load balancing, retries e timeouts; o proxy inbound aplica autorização. O mTLS é automático entre pods meshed, com certificados vinculados à ServiceAccount e renovados pelo proxy. O operador ainda precisa cuidar da rotação de trust anchor e issuer e da confiança entre clusters."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A escolha depende de requisitos, maturidade e modelo operacional.",
    "headers": [
      "Aspecto",
      "Istio",
      "Linkerd"
    ],
    "rows": [
      [
        "Data plane",
        "Envoy sidecar ou ambient com ztunnel/waypoint.",
        "Microproxy próprio em Rust como sidecar."
      ],
      [
        "Control plane",
        "istiod e componentes/gateways associados.",
        "destination, identity, injector e extensões."
      ],
      [
        "Escopo funcional",
        "Amplo conjunto de L4/L7 e extensibilidade.",
        "Ênfase em simplicidade e funções essenciais."
      ],
      [
        "Adoção",
        "Grande flexibilidade e maior superfície operacional.",
        "Menor complexidade inicial, com trade-offs de recursos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.15 Envoy: proxy, filtros e upstreams",
    "id": "29-15-envoy-proxy-filtros-e-upstreams"
  },
  {
    "kind": "paragraph",
    "text": "Envoy é um proxy de alto desempenho escrito em C++ e projetado para arquiteturas distribuídas. Ele pode atuar como sidecar, gateway, edge proxy ou data plane universal. No Istio, Envoy executa grande parte das políticas L4 e L7. Outros control planes também o utilizam por meio das APIs xDS."
  },
  {
    "kind": "paragraph",
    "text": "Um listener aceita conexões em um endereço e porta. Filter chains escolhem filtros de rede e transporte conforme propriedades da conexão, como SNI. Para HTTP, o HTTP connection manager executa filtros, roteamento e observabilidade. Routes selecionam virtual hosts, clusters e ações. Clusters representam grupos lógicos de upstreams, e endpoints são as instâncias reais."
  },
  {
    "kind": "paragraph",
    "text": "Envoy mantém pools de conexão, realiza health checking, service discovery e load balancing. Recursos como outlier detection, circuit breaking, overload manager e draining são importantes em produção. A flexibilidade dos filtros é poderosa, mas extensões Lua ou Wasm precisam ser tratadas como código confiável e submetidas a governança."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/figure-04-envoy-model.svg",
    "alt": "Listener, filtros, rota e cluster no modelo interno do Envoy",
    "caption": "Figura 4 - Listener, filtros, rota e cluster formam o caminho lógico de uma requisição no Envoy."
  },
  {
    "kind": "paragraph",
    "text": "xDS é o conjunto de APIs usado para configurar dinamicamente Envoy. LDS publica listeners, RDS publica rotas, CDS publica clusters, EDS publica endpoints e SDS publica secrets. O Aggregated Discovery Service permite transportar múltiplos tipos sobre uma relação gRPC. O control plane precisa manter versão, nonce, ACK/NACK e consistência entre recursos relacionados."
  },
  {
    "kind": "paragraph",
    "text": "Configuração dinâmica evita reiniciar proxies a cada mudança, mas cria um sistema distribuído de convergência. Um proxy pode rejeitar uma configuração inválida e continuar usando a anterior. Logs de NACK e status de sincronização devem ser monitorados. Declarar um recurso no Kubernetes não garante que todos os proxies tenham aplicado a versão esperada."
  },
  {
    "kind": "paragraph",
    "text": "Em troubleshooting, é útil comparar a intenção declarada, o estado calculado pelo control plane e a configuração efetiva do proxy. Ferramentas de Istio como proxy-status e proxy-config materializam essa abordagem. Em control planes próprios, APIs administrativas do Envoy e config dumps cumprem papel semelhante."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.17 Gateway API e GAMMA para service mesh",
    "id": "29-17-gateway-api-e-gamma-para-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes Gateway API foi projetada como evolução das APIs de ingress e load balancing, com separação explícita de papéis. A iniciativa GAMMA estende seu uso a service mesh. Em vez de associar uma HTTPRoute apenas a um Gateway north-south, uma rota de mesh pode ser associada diretamente a um Service e controlar tráfego east-west."
  },
  {
    "kind": "paragraph",
    "text": "A padronização reduz dependência de CRDs específicos e facilita portabilidade conceitual. Ainda assim, cada implementação possui nível de conformidade e recursos estendidos. O operador deve verificar quais campos pertencem ao canal Standard, quais são Experimental e quais comportamentos dependem do mesh utilizado."
  },
  {
    "kind": "paragraph",
    "text": "Gateway API não elimina a necessidade de compreender o data plane. Ela padroniza a intenção declarativa. O resultado continua dependendo do controller, da tradução para configuração de proxy e da convergência dos endpoints."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de rota de mesh com Gateway API/GAMMA"
  },
  {
    "kind": "code",
    "text": "apiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: pedidos-canary\nspec:\n  parentRefs:\n  - group: \"\"\n    kind: Service\n    name: pedidos\n  rules:\n  - backendRefs:\n    - name: pedidos-v1\n      port: 8080\n      weight: 90\n    - name: pedidos-v2\n      port: 8080\n      weight: 10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.18 Multi-cluster e múltiplas redes",
    "id": "29-18-multi-cluster-e-multiplas-redes"
  },
  {
    "kind": "paragraph",
    "text": "Um mesh multi-cluster precisa resolver discovery, identidade, conectividade e política entre ambientes. Clusters podem compartilhar uma rede plana ou exigir gateways para atravessar redes distintas. O desenho também precisa decidir se haverá um único control plane, control planes primário-remoto ou control planes independentes com confiança federada."
  },
  {
    "kind": "paragraph",
    "text": "Compartilhar trust anchor simplifica reconhecimento de identidades, mas amplia a fronteira de confiança. Trust domains distintos podem ser federados com regras explícitas. Failover entre clusters precisa considerar consistência de dados, latência, capacidade e locality-aware load balancing. Redirecionar tráfego sem preparar dependências pode apenas mover a falha."
  },
  {
    "kind": "paragraph",
    "text": "Linkerd oferece componentes multicluster e requer planejamento de confiança entre clusters. Istio suporta diversas topologias e gateways east-west. Em ambos, DNS, ServiceExport/ServiceImport, rotas e health precisam ser observados em conjunto."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/pt/figure-05-multicluster.svg",
    "alt": "Service mesh conectando serviços e gateways em múltiplos clusters",
    "caption": "Figura 5 - Multi-cluster adiciona identidade, discovery, conectividade e failover à equação."
  },
  {
    "kind": "paragraph",
    "text": "Tráfego para bancos, SaaS e APIs externas não deve ser ignorado pelo desenho do mesh. Um egress gateway pode centralizar origem de rede, política, TLS e auditoria. O benefício é maior quando destinos exigem allowlist de IP ou inspeção. O custo é criar um ponto adicional de capacidade e disponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Service entries ou recursos equivalentes registram destinos externos no modelo do mesh. Isso permite aplicar routing e telemetria, mas não transforma um serviço externo em workload confiável. Certificados, DNS e políticas de saída continuam sendo responsabilidade da arquitetura."
  },
  {
    "kind": "paragraph",
    "text": "Bloquear qualquer destino desconhecido reduz exfiltração, mas pode interromper dependências não inventariadas. Uma adoção segura começa com observação, inventário e classificação, seguida de enforcement gradual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.20 Performance, capacidade e custo",
    "id": "29-20-performance-capacidade-e-custo"
  },
  {
    "kind": "paragraph",
    "text": "O mesh adiciona processamento, conexões, criptografia e telemetria. A latência por hop pode ser pequena, mas uma cadeia longa acumula custo. CPU e memória dependem de taxa, tamanho de payload, protocolo, quantidade de rotas, métricas, access logs e extensões. Benchmarks genéricos não substituem testes com o perfil real da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "No sidecar model, o consumo se multiplica pelo número de pods. Em ambient, parte do custo é compartilhada por nó e por waypoint. Isso muda a unidade de capacity planning. Proxies também mantêm pools e buffers; limites inadequados podem causar OOM, throttling de CPU ou filas internas."
  },
  {
    "kind": "paragraph",
    "text": "O plano de controle precisa escalar com quantidade de proxies e mudanças de configuração. Atualizações massivas de endpoints podem provocar picos de distribuição. Sharding, revisões e rollout controlado reduzem blast radius. Métricas de tempo de convergência e tamanho de config ajudam a identificar crescimento não sustentável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.21 Segurança e modelo de ameaça",
    "id": "29-21-seguranca-e-modelo-de-ameaca"
  },
  {
    "kind": "paragraph",
    "text": "O mesh melhora a segurança ao fornecer identidade e criptografia uniformes, mas também se torna infraestrutura crítica. Comprometer o control plane pode permitir distribuir rotas ou policies maliciosas. Comprometer credenciais de CA pode afetar toda a confiança. APIs administrativas, webhooks, secrets e service accounts exigem menor privilégio e segmentação."
  },
  {
    "kind": "paragraph",
    "text": "Proxies processam tráfego não confiável e extensões configuráveis. Filtros customizados, Wasm e scripts devem ter cadeia de fornecimento, revisão e assinatura. Debug endpoints e config dumps podem revelar nomes internos, rotas, certificados ou headers. Eles não devem ser expostos indiscriminadamente."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust no mesh significa verificar identidade, aplicar autorização explícita e manter telemetria, não apenas ativar mTLS. Políticas devem restringir movimento lateral e separar namespaces, ambientes e domínios. A segurança precisa incluir o tráfego que contorna o proxy, como probes, portas excluídas e host networking."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.22 Operação, upgrades e governança",
    "id": "29-22-operacao-upgrades-e-governanca"
  },
  {
    "kind": "paragraph",
    "text": "Operar um mesh exige gestão de versão do control plane, proxies e CRDs. Atualizações devem respeitar matrizes de compatibilidade. Istio suporta revisões para executar control planes paralelos e migrar namespaces gradualmente. Linkerd oferece procedimentos de upgrade e verificações de saúde. Envoy independente pode usar hot restart ou draining conforme o modelo de implantação."
  },
  {
    "kind": "paragraph",
    "text": "GitOps ajuda a auditar manifests, mas não substitui validação do estado runtime. Quality gates podem executar lint, dry-run, testes de policy e comparação de rotas. Recursos compartilhados precisam de ownership claro: plataforma mantém o mesh; equipes de domínio mantêm rotas e policies dentro de limites governados."
  },
  {
    "kind": "paragraph",
    "text": "A remoção do mesh também deve ser planejada. Desinjetar sidecars, retirar CNI, remover CRDs e alterar políticas de rede fora de ordem pode interromper tráfego. Um exit plan saudável demonstra que a aplicação não depende acidentalmente de comportamento não documentado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.23 Troubleshooting orientado pelo caminho real",
    "id": "29-23-troubleshooting-orientado-pelo-caminho-real"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico deve começar pela pergunta: qual caminho a conexão deveria percorrer? Identifique aplicação de origem, proxy outbound ou ztunnel, waypoint ou gateway intermediário, proxy inbound e aplicação de destino. Em seguida, verifique DNS, endpoints, sincronização do proxy, TLS, policy, rota, cluster, health e resposta da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Erros 503 podem significar ausência de endpoints, circuit breaker, upstream reset, conexão recusada ou policy. Falhas TLS podem decorrer de trust domain, identidade esperada, certificado expirado ou tráfego em plaintext. Um timeout pode estar no aplicativo, sidecar, gateway ou upstream. O texto do erro e o componente que o produziu são evidências essenciais."
  },
  {
    "kind": "paragraph",
    "text": "Compare os dois lados. Se o proxy de origem enviou request mas o destino não registrou conexão, investigue rede e mTLS. Se o proxy inbound aceitou mas a aplicação não recebeu, investigue porta e redirecionamento. Se a aplicação respondeu e o cliente recebeu reset, observe draining, timeout e conexão de retorno."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O diagnóstico deve correlacionar intenção, control plane, proxy e aplicação.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências úteis"
    ],
    "rows": [
      [
        "Pod sem sidecar",
        "Label, webhook, namespace ou pod antigo.",
        "Spec do pod, events e logs do injector."
      ],
      [
        "503 no proxy",
        "Sem endpoint, reset, circuit breaker ou cluster ausente.",
        "Config dump, endpoints, flags de resposta e upstream logs."
      ],
      [
        "mTLS falha",
        "Trust, SAN, identity ou relógio.",
        "Certificado, trust domain e logs de handshake."
      ],
      [
        "Rota não aplicada",
        "Resource inválido, NACK ou proxy desatualizado.",
        "Status de sync, ACK/NACK e config efetiva."
      ],
      [
        "Latência elevada",
        "Retry, fila, CPU do proxy ou upstream lento.",
        "Tracing por hop, retries e métricas de saturação."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - Um gateway chama três microsserviços internos. Após ativar retries no mesh, a latência de cauda aumenta e o backend satura durante falhas parciais. A investigação mostra retries simultâneos no SDK, no gateway e no sidecar. A correção centraliza a política, propaga deadlines e limita o retry budget."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Um namespace é migrado para Istio ambient. mTLS L4 funciona, mas uma policy por path não é aplicada. O time descobre que o serviço não possuía waypoint associado. A solução é implantar waypoint, revisar a policy L7 e validar o caminho com telemetria."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Dois clusters Linkerd precisam comunicar-se. A conexão falha após rotação de issuer. A análise separa trust anchor compartilhado, issuer de cada cluster, certificados dos proxies e componentes multicluster, identificando uma cadeia não atualizada no cluster remoto."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Injete dois serviços em um mesh e valide mTLS e identidade. 2) Configure 90/10 entre duas versões e compare requests e conexões. 3) Aplique timeout e retry somente em uma camada e observe traces. 4) Gere uma negação de policy e identifique o proxy que respondeu. 5) Inspecione listeners, routes, clusters e endpoints de um Envoy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Service mesh transfere funções de comunicação para uma camada de infraestrutura, oferecendo identidade, mTLS, policy, routing e observabilidade ao tráfego east-west. O modelo depende da separação entre control plane, que calcula e distribui configuração, e data plane, que participa das conexões."
  },
  {
    "kind": "paragraph",
    "text": "Istio oferece sidecar mode com Envoy por pod e ambient mode com ztunnel L4 e waypoint L7. Linkerd utiliza microproxies próprios em Rust e um control plane com discovery e identidade. Envoy fornece a base de proxy, filtros, clusters e configuração xDS usada em diversas plataformas."
  },
  {
    "kind": "paragraph",
    "text": "O mesh não substitui API Gateway, segurança de aplicação ou boas práticas distribuídas. Retries, timeouts e circuit breakers precisam ser coordenados. mTLS identifica workloads, mas não substitui autorização nem identidade do usuário. A observabilidade do proxy precisa ser combinada com métricas e tracing da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Uma adoção bem-sucedida exige capacidade, governança, upgrades controlados e troubleshooting baseado no caminho real. O valor aparece quando a organização reduz inconsistência e melhora segurança e observabilidade sem esconder os efeitos da rede."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda microserviços e padrões de integração, conectando as capacidades de rede do mesh a decisões de decomposição, comunicação síncrona e assíncrona, consistência e resiliência de domínio."
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
      "O problema que justifica o mesh está documentado e mensurável.",
      "Gateway, ingress, egress e mesh possuem responsabilidades delimitadas.",
      "Control plane e data plane têm SLOs e monitoração independentes.",
      "Todos os workloads esperados estão realmente inscritos no mesh.",
      "Trust anchors, issuers e rotação de certificados estão governados.",
      "Policies L4 e L7 foram testadas com identidades reais e default deny controlado.",
      "Timeouts, retries e circuit breakers estão coordenados com aplicação e gateway.",
      "Traffic splitting foi validado por request, conexão e impacto de negócio.",
      "Métricas e logs evitam cardinalidade e dados sensíveis excessivos.",
      "Upgrades usam canary, revisão ou rollout gradual com rollback.",
      "Configuração declarada é comparada com configuração efetiva dos proxies.",
      "O plano multi-cluster considera confiança, rede, failover e consistência.",
      "Existe procedimento para contornar ou remover o mesh em emergência."
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
      "Diferencie north-south e east-west e explique onde gateway e mesh se encontram.",
      "Descreva o fluxo de configuração do control plane até o proxy.",
      "Compare sidecar mode e ambient mode do Istio.",
      "Explique a função de ztunnel e waypoint.",
      "Descreva como Linkerd emite identidade e aplica mTLS.",
      "Explique listeners, filter chains, routes e clusters no Envoy.",
      "Proponha uma estratégia de retry que evite multiplicação entre camadas.",
      "Defina uma policy de autorização baseada em identidade de workload.",
      "Explique como Gateway API/GAMMA representa rotas de mesh.",
      "Desenhe uma topologia multi-cluster e identifique suas fronteiras de confiança.",
      "Monte um roteiro de troubleshooting para erro 503 após alteração de rota.",
      "Discuta quando não adotar um service mesh."
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
        "Ambient mode",
        "Modelo de data plane do Istio sem sidecar obrigatório em cada pod."
      ],
      [
        "Control plane",
        "Componente que calcula e distribui configuração, identidade e política."
      ],
      [
        "Data plane",
        "Proxies ou componentes que processam diretamente o tráfego."
      ],
      [
        "East-west",
        "Tráfego entre serviços ou domínios internos."
      ],
      [
        "Envoy",
        "Proxy L4/L7 de alto desempenho usado em meshes e gateways."
      ],
      [
        "GAMMA",
        "Iniciativa para uso do Kubernetes Gateway API em service mesh."
      ],
      [
        "Istiod",
        "Componente central do control plane do Istio."
      ],
      [
        "mTLS",
        "TLS com autenticação mútua entre os peers."
      ],
      [
        "North-south",
        "Tráfego que cruza a borda do ambiente."
      ],
      [
        "Sidecar",
        "Proxy executado ao lado da aplicação no mesmo pod."
      ],
      [
        "Service identity",
        "Identidade criptográfica associada ao workload."
      ],
      [
        "Traffic split",
        "Distribuição ponderada de tráfego entre destinos."
      ],
      [
        "Trust domain",
        "Espaço administrativo de identidades confiáveis."
      ],
      [
        "Waypoint proxy",
        "Proxy L7 usado no Istio ambient para serviços ou workloads."
      ],
      [
        "xDS",
        "Família de APIs de configuração dinâmica do Envoy."
      ],
      [
        "ztunnel",
        "Proxy por nó do data plane ambient do Istio."
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Istio Documentation. Architecture; Sidecar or ambient?; Ambient data plane; Security e Traffic Management.",
      "Linkerd Documentation. Architecture; Automatic mTLS; Authorization Policy; Multi-cluster communication.",
      "Envoy Proxy Documentation. Architecture Overview; Listeners; HTTP routing; Cluster Manager; xDS APIs; Overload Manager.",
      "Kubernetes SIG Network. Gateway API; Gateway API for Service Mesh; GAMMA Initiative.",
      "CNCF. Service Mesh Interface e materiais de arquitetura cloud native.",
      "IETF. RFC 8446 - The Transport Layer Security Protocol Version 1.3.",
      "OpenTelemetry Documentation. Distributed Tracing e semantic conventions para HTTP e RPC."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Istio, Linkerd, Envoy e Gateway API evoluem continuamente. Valide a documentação oficial da versão implantada antes de aplicar manifests, políticas, procedimentos de upgrade ou decisões de suporte a sidecar, ambient, Gateway API e multi-cluster."
  }
];
