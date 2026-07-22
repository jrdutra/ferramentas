import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const API_GATEWAYS_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Do consumidor ao backend: controle centralizado no caminho da API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/overview.svg",
    "alt": "API Gateway mediando consumidores, edge, políticas e serviços de backend",
    "caption": "Figura de abertura - O API Gateway ocupa uma posição de mediação entre consumidores e backends."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O gateway divide uma chamada em duas relações independentes: consumidor-gateway e gateway-backend."
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
    "text": "Os capítulos anteriores construíram as bases necessárias para compreender o funcionamento real de um API Gateway. Endereçamento, DNS, TCP, HTTP, TLS, certificados, autenticação, autorização, OAuth, OpenID Connect, JWT, SAML e federação não são temas periféricos ao gateway: são mecanismos que ele frequentemente termina, valida, transforma, registra ou encaminha. Este capítulo reúne esses conhecimentos em uma arquitetura coerente."
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway é apresentado muitas vezes como uma caixa simples que fica na frente dos serviços. Essa representação é útil em diagramas de alto nível, porém insuficiente para operação. Na prática, o gateway mantém listeners, termina conexões, seleciona APIs, executa políticas, consulta repositórios, aplica limites, cria conexões com backends, transforma mensagens e produz telemetria. Cada chamada passa por estados diferentes, e uma falha pode acontecer antes de qualquer código de negócio ser executado."
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura também inclui elementos que não participam diretamente de cada requisição. Control planes distribuem configurações, management planes organizam ciclo de vida, portais atendem desenvolvedores, bancos armazenam metadados e componentes analíticos agregam eventos. Um desenho robusto precisa distinguir esses planos e decidir como o runtime se comporta quando algum componente de gestão está indisponível."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo deste capítulo é fornecer um modelo mental completo, independente de produto. Conceitos serão relacionados a arquiteturas encontradas em gateways comerciais, serviços gerenciados, proxies programáveis e plataformas híbridas. Os próximos capítulos entrarão nas políticas, no Axway API Gateway e no Azure API Management; por isso, este material enfatiza responsabilidades, fronteiras e decisões arquiteturais que permanecem válidas entre implementações diferentes."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Acompanhe cada seção desenhando duas setas: consumidor para gateway e gateway para backend. Para cada seta, registre DNS, IP, porta, TLS, protocolo, timeout, identidade e telemetria. Essa separação evita atribuir ao backend uma falha que ocorreu no listener ou atribuir ao consumidor uma falha criada no trecho de saída."
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
      "Definir API Gateway e diferenciá-lo de proxy, load balancer, WAF, ingress controller e service mesh.",
      "Explicar a separação entre data plane, control plane, management plane e developer plane.",
      "Descrever o ciclo completo de uma requisição desde o listener até o backend e a resposta.",
      "Compreender roteamento, políticas, transformação, autenticação, quotas, caching e observabilidade.",
      "Comparar topologias centralizadas, por domínio, em camadas, regionais, híbridas e gerenciadas.",
      "Projetar alta disponibilidade, tolerância a falhas, consistência de configuração e continuidade operacional.",
      "Relacionar TLS, mTLS, certificados, pools de conexão, health checks, retries e circuit breakers ao gateway.",
      "Analisar multitenancy, isolamento, governança e ciclo de vida de APIs.",
      "Dimensionar capacidade com base em conexões, throughput, latência, CPU, memória e dependências externas.",
      "Diagnosticar falhas por etapa e construir evidências correlacionadas entre consumidor, gateway e backend."
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
      "21.1 O que é um API Gateway",
      "21.2 O que um API Gateway não é",
      "21.3 Planos de dados, controle, gestão e desenvolvedores",
      "21.4 Anatomia de uma requisição no gateway",
      "21.5 Listeners, virtual hosts e seleção de API",
      "21.6 Motor de políticas e cadeia de processamento",
      "21.7 Roteamento, descoberta e conectividade com backends",
      "21.8 Segurança na entrada e na saída",
      "21.9 Controle de tráfego, proteção e caching",
      "21.10 Topologias e modelos de implantação",
      "21.11 Alta disponibilidade e consistência",
      "21.12 Estado, sessões e dependências externas",
      "21.13 Observabilidade, auditoria e correlação",
      "21.14 Governança, portal e ciclo de vida",
      "21.15 Desempenho e planejamento de capacidade",
      "21.16 Falhas, antipadrões e troubleshooting",
      "21.17 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.1 O que é um API Gateway",
    "id": "21-1-o-que-e-um-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway é um componente de mediação que recebe chamadas de consumidores em um conjunto controlado de endpoints e as encaminha para serviços de backend conforme regras de segurança, tráfego, transformação e roteamento. Ele funciona como um ponto de aplicação de políticas no caminho da mensagem. A centralização de controles reduz duplicação entre serviços, melhora consistência e permite que backends sejam protegidos de exposição direta."
  },
  {
    "kind": "paragraph",
    "text": "A palavra gateway indica mudança de contexto. O componente não apenas encaminha bytes; ele pode encerrar uma conexão TLS, interpretar HTTP, validar credenciais, converter uma identidade externa em contexto interno, selecionar uma versão de API, transformar headers, chamar um serviço de autorização e criar uma nova conexão para o backend. Por isso, consumidor-gateway e gateway-backend são relações independentes."
  },
  {
    "kind": "paragraph",
    "text": "Em termos de arquitetura, o gateway atua principalmente no data plane. A cada requisição, ele toma decisões com base em configuração publicada e em dados de runtime. Essas decisões precisam ser rápidas, determinísticas e observáveis. O gateway não deve depender de uma chamada remota lenta para cada política simples, nem pode se tornar um ponto único de falha que bloqueia toda a plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Uma plataforma de APIs pode incluir vários gateways. Um gateway externo protege APIs públicas; outro atende integrações internas; um terceiro fica em uma região específica; gateways dedicados podem ser usados por domínios regulados. A definição é funcional: todos são pontos de mediação e política, ainda que os produtos, topologias e responsabilidades variem."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "O gateway não é apenas um endereço. Ele é um runtime que transforma uma chamada recebida em uma decisão de política e em uma nova chamada para um destino selecionado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.2 O que um API Gateway não é",
    "id": "21-2-o-que-um-api-gateway-nao-e"
  },
  {
    "kind": "paragraph",
    "text": "Um reverse proxy aceita conexões em nome de servidores upstream e encaminha mensagens. Todo API Gateway executa alguma forma de reverse proxy, mas nem todo reverse proxy oferece catálogo, publicação, subscrição, analytics, autenticação delegada ou governança de ciclo de vida. O conceito de gateway acrescenta uma camada de produto e política sobre a intermediação básica."
  },
  {
    "kind": "paragraph",
    "text": "Um load balancer distribui conexões ou requisições entre destinos elegíveis. O gateway também pode balancear backends, porém seu papel não se reduz a isso. Ele compreende a API, a identidade do consumidor, a operação chamada e políticas associadas. Um balanceador L4 pode escolher uma instância sem interpretar HTTP; um gateway normalmente opera em L7, embora dependa de componentes L4 ao redor."
  },
  {
    "kind": "paragraph",
    "text": "Um WAF procura padrões de ataque em tráfego web. Ele complementa o gateway, mas não substitui autorização de negócio, validação de tokens, quotas por aplicação ou transformação de contratos. Um ingress controller publica serviços de um cluster Kubernetes e pode ter recursos de gateway; um service mesh controla tráfego entre workloads e pode possuir ingress e egress gateways. As fronteiras se sobrepõem, mas as responsabilidades de governança e exposição precisam continuar claras."
  },
  {
    "kind": "paragraph",
    "text": "Finalmente, o gateway não deve se tornar um backend disfarçado. Quando lógica de domínio, regras de negócio complexas e orquestrações extensas são acumuladas em políticas, a plataforma fica difícil de testar, versionar e evoluir. O gateway deve executar mediação e controles transversais; a lógica que define o negócio continua pertencendo aos serviços responsáveis."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Conceitos próximos não devem ser tratados como sinônimos.",
    "headers": [
      "Componente",
      "Responsabilidade principal",
      "Relação com o gateway"
    ],
    "rows": [
      [
        "Reverse proxy",
        "Terminar e recriar conexões para upstreams.",
        "É uma capacidade de base do gateway."
      ],
      [
        "Load balancer",
        "Distribuir fluxo entre destinos.",
        "Pode existir antes, dentro ou depois do gateway."
      ],
      [
        "WAF",
        "Detectar e bloquear ataques web genéricos.",
        "Complementa políticas específicas de API."
      ],
      [
        "Ingress controller",
        "Publicar serviços de um cluster.",
        "Pode implementar ou integrar um gateway."
      ],
      [
        "Service mesh",
        "Controlar comunicação entre workloads.",
        "Complementa o gateway na malha interna."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.3 Planos de dados, controle, gestão e desenvolvedores",
    "id": "21-3-planos-de-dados-controle-gestao-e-desenvolvedores"
  },
  {
    "kind": "paragraph",
    "text": "O data plane é o conjunto de runtimes que processa tráfego. Ele mantém listeners, conexões, tabelas de rotas, políticas compiladas, caches e pools de upstream. Sua prioridade é disponibilidade e baixa latência. Um problema no portal ou no banco de configuração não deveria interromper chamadas já publicadas, desde que o runtime tenha uma cópia válida e suficiente da configuração."
  },
  {
    "kind": "paragraph",
    "text": "O control plane transforma intenção em configuração distribuída. Ele recebe definições de APIs, políticas, certificados, endpoints e parâmetros, valida consistência e publica estado para os runtimes. Dependendo da plataforma, essa distribuição ocorre por push, pull, banco compartilhado, arquivos, APIs administrativas ou mecanismos de configuração dinâmica. O desenho precisa tratar versionamento, confirmação de aplicação e rollback."
  },
  {
    "kind": "paragraph",
    "text": "O management plane concentra operações administrativas e de governança: criação de APIs, controle de ambientes, RBAC administrativo, auditoria, catálogo, relatórios e automação de CI/CD. O developer plane atende consumidores e produtores por meio de portal, documentação, credenciais, produtos, planos e analytics. Esses planos podem estar no mesmo produto, mas possuem requisitos de segurança e disponibilidade diferentes."
  },
  {
    "kind": "paragraph",
    "text": "A separação protege o runtime contra acoplamento excessivo. Também melhora segurança: a interface administrativa não precisa estar exposta na mesma rede ou porta do tráfego de APIs. Em ambientes regulados, mudanças no control plane podem exigir aprovação, assinatura de artefatos, segregação de funções e trilha auditável antes de alcançar o data plane."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/figure-01-platform-planes.svg",
    "alt": "Planos de dados, controle, gestão e desenvolvedores de uma plataforma de APIs",
    "caption": "Figura 1 - A plataforma de APIs possui planos com responsabilidades e criticidades diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.4 Anatomia de uma requisição no gateway",
    "id": "21-4-anatomia-de-uma-requisicao-no-gateway"
  },
  {
    "kind": "paragraph",
    "text": "A jornada começa antes do gateway. O consumidor resolve um nome, seleciona um endereço, estabelece TCP ou QUIC e negocia TLS. Um balanceador ou front door pode receber a conexão antes do gateway. Quando o runtime finalmente aceita a mensagem, ele precisa associá-la a um listener e a uma definição de API com base em SNI, Host, método, caminho, headers ou outras propriedades."
  },
  {
    "kind": "paragraph",
    "text": "Depois da seleção, o gateway executa uma cadeia de processamento. Algumas etapas são comuns: validação de tamanho e formato, autenticação, autorização, quotas, transformação, enriquecimento, roteamento e observabilidade. A ordem importa. Aplicar uma transformação antes de validar assinatura pode alterar o conteúdo protegido; consultar um backend antes de autorizar pode vazar informação por tempo de resposta; registrar payloads antes de mascarar dados pode violar privacidade."
  },
  {
    "kind": "paragraph",
    "text": "No trecho de saída, o gateway resolve o nome do backend, escolhe rota e endereço de origem, abre ou reutiliza uma conexão, negocia TLS e envia a requisição transformada. A resposta percorre políticas de retorno, pode ser convertida, filtrada, armazenada em cache e registrada. Só então é devolvida pela conexão de entrada. Os dois lados podem usar versões diferentes de HTTP, certificados diferentes e timeouts diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Uma arquitetura operacional deve tornar essa sequência visível. Logs com apenas status final não informam onde ocorreu a falha. O runtime precisa expor estágio, política, route ID, upstream escolhido, tempo de conexão, tempo de resposta e motivo de rejeição sem revelar segredos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/figure-02-request-pipeline.svg",
    "alt": "Pipeline de processamento de uma requisição no API Gateway",
    "caption": "Figura 2 - Uma chamada é processada por estágios que podem aceitar, transformar, encaminhar ou interromper o fluxo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.5 Listeners, virtual hosts e seleção de API",
    "id": "21-5-listeners-virtual-hosts-e-selecao-de-api"
  },
  {
    "kind": "paragraph",
    "text": "Um listener associa o runtime a endereços e portas nos quais aceitará conexões. Ele pode escutar em um IP específico, em todas as interfaces ou em endereços virtuais fornecidos por um load balancer. O listener define protocolos permitidos, versões de TLS, certificados, limites de conexão e opções de HTTP. Uma configuração incorreta pode fazer a API parecer indisponível mesmo quando as políticas estão corretas."
  },
  {
    "kind": "paragraph",
    "text": "Virtual hosts permitem que várias APIs compartilhem endereço e porta, diferenciadas por nome. Em HTTPS, o SNI participa da seleção do certificado durante o handshake TLS; depois, o header Host ou a autoridade HTTP identifica o destino lógico da requisição. SNI e Host normalmente coincidem, mas não são o mesmo objeto. Divergências podem causar certificado incorreto, roteamento inesperado ou rejeição de segurança."
  },
  {
    "kind": "paragraph",
    "text": "A seleção de API costuma usar método e path após a escolha do host. Regras precisam ser determinísticas. Caminhos sobrepostos, curingas amplos, versões ambíguas e diferenças de barra final podem encaminhar uma chamada à política errada. É recomendável testar a tabela de rotas como um contrato, incluindo casos negativos e conflitos."
  },
  {
    "kind": "paragraph",
    "text": "O gateway também deve normalizar entradas com cuidado. Decodificação de URL, tratamento de barras duplicadas, case sensitivity e normalização de headers podem afetar segurança. Se o gateway e o backend interpretam o caminho de formas diferentes, um atacante pode explorar a discrepância para contornar autorização ou cache."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de seleção de API"
  },
  {
    "kind": "paragraph",
    "text": "Entrada recebida SNI: api.empresa.example Host: api.empresa.example Método: GET Path: /clientes/v2/123 Seleção lógica Listener HTTPS 443 Virtual host api.empresa.example API clientes-v2 Operação obter-cliente"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.6 Motor de políticas e cadeia de processamento",
    "id": "21-6-motor-de-politicas-e-cadeia-de-processamento"
  },
  {
    "kind": "paragraph",
    "text": "O motor de políticas é a parte do gateway que avalia regras sobre a requisição e a resposta. Uma política pode ser declarativa, como validar JWT com issuer e audience específicos, ou procedimental, como executar um script. Produtos diferentes usam fluxos gráficos, XML, YAML, linguagens próprias ou filtros encadeados. Independentemente da forma, a política precisa ter entradas, saídas, falhas e efeitos colaterais conhecidos."
  },
  {
    "kind": "paragraph",
    "text": "Políticas transversais incluem autenticação, autorização, rate limiting, quotas, CORS, validação de schema, transformação, masking, caching, roteamento, retries e logging. A ordem de execução deve ser projetada. Por exemplo, autenticação normalmente precede quotas por consumidor; validação de tamanho deve ocorrer antes de parsing caro; sanitização de logs deve ocorrer antes da emissão do evento de auditoria."
  },
  {
    "kind": "paragraph",
    "text": "O gateway precisa distinguir falhas técnicas e decisões de negócio. Uma assinatura inválida pode gerar 401; escopo insuficiente, 403; limite excedido, 429; backend indisponível, 503; erro de conexão ou protocolo, 502. Respostas padronizadas melhoram experiência do consumidor e observabilidade, mas não devem esconder a causa interna nos logs administrativos."
  },
  {
    "kind": "paragraph",
    "text": "Scripts e extensões oferecem flexibilidade, porém aumentam risco. Código arbitrário pode bloquear threads, consumir memória, vazar segredos ou criar dependências difíceis de governar. Prefira capacidades nativas e declarativas para controles comuns; use extensões apenas quando houver revisão, testes, limites e estratégia de manutenção."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Políticas precisam ser avaliadas pelo efeito operacional, não apenas pela funcionalidade.",
    "headers": [
      "Categoria",
      "Exemplos",
      "Pergunta de arquitetura"
    ],
    "rows": [
      [
        "Segurança",
        "JWT, mTLS, API Key, autorização.",
        "A decisão é local ou depende de serviço externo?"
      ],
      [
        "Tráfego",
        "Rate limit, quota, spike arrest.",
        "O estado é por nó, cluster ou serviço global?"
      ],
      [
        "Mediação",
        "Headers, JSON/XML, versionamento.",
        "A transformação preserva semântica e assinatura?"
      ],
      [
        "Resiliência",
        "Timeout, retry, circuit breaker.",
        "A operação é idempotente e segura para repetir?"
      ],
      [
        "Observabilidade",
        "Logs, métricas, traces, auditoria.",
        "Como correlacionar inbound e outbound?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.7 Roteamento, descoberta e conectividade com backends",
    "id": "21-7-roteamento-descoberta-e-conectividade-com-backends"
  },
  {
    "kind": "paragraph",
    "text": "Roteamento transforma a API lógica em um destino físico. O destino pode ser uma URL fixa, um pool de servidores, um serviço descoberto por DNS, um endpoint privado, um cluster Kubernetes ou uma função gerenciada. O gateway deve decidir como resolver nomes, quanto tempo manter respostas em cache, quando reavaliar endpoints e como reagir a mudanças de saúde."
  },
  {
    "kind": "paragraph",
    "text": "A conexão com o backend é independente da conexão de entrada. O gateway usa um endereço e uma porta de origem, possivelmente sujeitos a SNAT, allowlists e esgotamento de portas. Ele pode reutilizar conexões por pooling, negociar HTTP/2, enviar SNI diferente do Host e apresentar certificado de cliente em mTLS. Todos esses detalhes precisam estar alinhados com a expectativa do backend."
  },
  {
    "kind": "paragraph",
    "text": "Health checks indicam se um destino está elegível, mas não garantem que todas as operações funcionem. Um teste superficial em /health pode retornar sucesso enquanto dependências críticas estão indisponíveis. Readiness deve representar capacidade real de receber tráfego. Drenagem é necessária durante deploys para impedir que novas requisições sejam enviadas a uma instância em encerramento."
  },
  {
    "kind": "paragraph",
    "text": "Retries e circuit breakers melhoram resiliência quando aplicados com cuidado. Repetir automaticamente uma operação não idempotente pode duplicar pagamento ou criação de recurso. O gateway precisa considerar método, idempotency key, estágio da falha e tempo restante do orçamento. Circuit breakers devem proteger o sistema sem transformar um problema local em indisponibilidade prolongada por configuração agressiva."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A conectividade de saída concentra grande parte dos problemas 502 e 503.",
    "headers": [
      "Elemento",
      "Função",
      "Falha típica"
    ],
    "rows": [
      [
        "DNS / discovery",
        "Localizar endpoints atuais.",
        "Cache obsoleto ou resolução privada ausente."
      ],
      [
        "Pool de conexões",
        "Reutilizar transporte e reduzir handshakes.",
        "Conexões ociosas fechadas pelo peer."
      ],
      [
        "Health check",
        "Retirar destinos incapazes.",
        "Falso positivo por teste superficial."
      ],
      [
        "Retry",
        "Recuperar falhas transitórias.",
        "Duplicação ou tempestade de chamadas."
      ],
      [
        "Circuit breaker",
        "Conter falhas persistentes.",
        "Abertura indevida ou recuperação lenta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.8 Segurança na entrada e na saída",
    "id": "21-8-seguranca-na-entrada-e-na-saida"
  },
  {
    "kind": "paragraph",
    "text": "Na entrada, o gateway costuma terminar TLS, validar certificado do servidor e, em mTLS, verificar o certificado do cliente. Depois, interpreta mecanismos de aplicação como Basic Auth, API Key, OAuth access token, JWT ou SAML convertido por um broker. Autenticação identifica o principal; autorização decide se ele pode chamar a operação e acessar o recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "O gateway não deve confiar automaticamente em headers de identidade recebidos da Internet. Cabeçalhos como X-User, X-Roles ou X-Client-ID precisam ser removidos ou sobrescritos antes de propagar contexto interno. Caso contrário, o consumidor pode forjar identidade. O contexto confiável deve nascer de um mecanismo validado e ser protegido no trecho de saída, preferencialmente por TLS e autenticação entre workloads."
  },
  {
    "kind": "paragraph",
    "text": "Na saída, o gateway pode apresentar uma identidade própria ao backend por mTLS, managed identity, token exchange ou credencial técnica. Essa identidade representa o gateway ou a aplicação consumidora, conforme o modelo. Preservar apenas uma identidade genérica simplifica integração, mas pode reduzir auditoria e autorização fina. Propagar o token original aumenta contexto, porém expõe o backend à semântica externa e pode ampliar a superfície de confiança."
  },
  {
    "kind": "paragraph",
    "text": "Segredos, chaves e certificados devem ser obtidos de repositórios apropriados, rotacionados e auditados. Configuração em texto claro, logs de Authorization e exportação irrestrita de chaves privadas são falhas graves. O runtime precisa continuar operando durante rotações, aceitando períodos controlados de sobreposição quando necessário."
  },
  {
    "kind": "subhead",
    "text": "Fronteira de confiança"
  },
  {
    "kind": "paragraph",
    "text": "O gateway protege o backend apenas quando o acesso direto é bloqueado ou rigidamente controlado. Se o serviço continua exposto por outra rota, políticas do gateway podem ser contornadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.9 Controle de tráfego, proteção e caching",
    "id": "21-9-controle-de-trafego-protecao-e-caching"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting controla a velocidade de chamadas em uma janela; quota controla consumo acumulado em um período; throttling descreve a redução ou rejeição de tráfego quando limites são alcançados; spike arrest suaviza picos. Os termos variam entre produtos, mas a arquitetura precisa definir chave de contagem, granularidade, armazenamento de estado e comportamento quando o serviço de contagem falha."
  },
  {
    "kind": "paragraph",
    "text": "Contar por endereço IP é insuficiente em ambientes com NAT e proxies. Contar por application ID, subscription, subject, tenant ou operação produz controle mais alinhado ao contrato. Em clusters, limites locais por nó podem permitir consumo agregado acima do esperado. Limites globais exigem coordenação distribuída e adicionam latência e dependência."
  },
  {
    "kind": "paragraph",
    "text": "Caching reduz latência e carga, mas precisa respeitar semântica HTTP, identidade e privacidade. A chave de cache pode incluir método, URL, query, headers de negociação e contexto do consumidor. Armazenar resposta personalizada sem variar por usuário pode vazar dados. O gateway também deve definir invalidação, TTL, tratamento de erro e comportamento durante indisponibilidade do backend."
  },
  {
    "kind": "paragraph",
    "text": "Proteções de tamanho, timeout, parsing e concorrência devem ocorrer antes de operações caras. Limites muito baixos quebram casos válidos; limites muito altos permitem abuso de memória e CPU. A plataforma deve publicar valores, medir rejeições e ajustar com base em tráfego real."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Controles de tráfego dependem de chave, estado e semântica.",
    "headers": [
      "Controle",
      "Chave possível",
      "Decisão importante"
    ],
    "rows": [
      [
        "Rate limit",
        "cliente + API + operação.",
        "Janela fixa, deslizante ou token bucket."
      ],
      [
        "Quota",
        "subscription + período.",
        "Comportamento ao atingir o total."
      ],
      [
        "Concorrência",
        "backend + rota.",
        "Fila, rejeição ou backpressure."
      ],
      [
        "Cache",
        "URI + headers + identidade.",
        "Variação, TTL e dados sensíveis."
      ],
      [
        "Payload",
        "operação + content-type.",
        "Tamanho antes e depois de descompressão."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.10 Topologias e modelos de implantação",
    "id": "21-10-topologias-e-modelos-de-implantacao"
  },
  {
    "kind": "paragraph",
    "text": "Na topologia centralizada, um cluster compartilhado publica APIs de várias áreas. O modelo simplifica governança e operação, mas pode criar fila de mudanças, blast radius amplo e limites de capacidade comuns. A plataforma precisa de multitenancy, isolamento de configuração e processos claros para evitar que uma equipe afete outra."
  },
  {
    "kind": "paragraph",
    "text": "Gateways por domínio ou produto aproximam ownership do runtime e reduzem blast radius. Em contrapartida, aumentam quantidade de instâncias, custos, atualização e risco de padrões divergentes. Um modelo federado pode combinar uma plataforma central de padrões e automação com runtimes delegados a domínios."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas em camadas usam gateway externo na borda e gateways internos próximos aos serviços. A camada externa concentra proteção contra Internet, identidade de parceiros e contratos públicos; a interna controla tráfego entre zonas e domínios. É preciso evitar duplicação de políticas e latência acumulada. Cada camada deve ter responsabilidade explícita."
  },
  {
    "kind": "paragraph",
    "text": "Modelos gerenciados transferem operação de parte da infraestrutura ao provedor. Modelos self-hosted oferecem maior controle de rede e customização. Arquiteturas híbridas mantêm control plane central e data plane em datacenters, clusters ou regiões privadas. A escolha depende de conectividade, soberania, latência, compliance, equipe e requisitos de continuidade."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/figure-03-gateway-topologies.svg",
    "alt": "Topologias centralizada, por domínio, em camadas e híbrida de API Gateway",
    "caption": "Figura 3 - A topologia deve equilibrar centralização, autonomia, isolamento e custo operacional."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.11 Alta disponibilidade e consistência",
    "id": "21-11-alta-disponibilidade-e-consistencia"
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade começa pelo data plane. Múltiplas instâncias devem receber tráfego por load balancer ou roteamento equivalente. Instâncias precisam ser substituíveis, com estado mínimo local e configuração reproduzível. A perda de um nó não pode interromper todo o serviço nem exigir recuperação manual prolongada."
  },
  {
    "kind": "paragraph",
    "text": "O control plane também precisa ser resiliente, porém sua indisponibilidade pode ter impacto diferente. Se os gateways já possuem configuração válida, podem continuar processando chamadas enquanto novas publicações ficam bloqueadas. Esse modo degradado é desejável. O risco surge quando o runtime consulta o control plane em cada requisição ou não mantém configuração local suficiente."
  },
  {
    "kind": "paragraph",
    "text": "Distribuição de configuração precisa de versionamento e confirmação. Uma publicação parcial pode deixar nós com políticas diferentes. O sistema deve identificar a versão ativa em cada instância, rejeitar artefatos inválidos, aplicar mudanças atomicamente quando possível e permitir rollback. Canary de configuração reduz risco ao expor uma pequena parcela do tráfego antes da propagação total."
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade regional exige decidir sobre DNS, tráfego global, replicação de chaves, quotas, caches e dados de subscrição. Active-active aumenta capacidade e reduz tempo de recuperação, mas exige consistência e prevenção de dupla contagem. Active-passive simplifica alguns estados, porém precisa de testes frequentes para que o ambiente passivo esteja realmente pronto."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/figure-04-high-availability.svg",
    "alt": "Arquitetura de alta disponibilidade do data plane e control plane",
    "caption": "Figura 4 - A continuidade do runtime não deve depender de uma única instância ou do portal administrativo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.12 Estado, sessões e dependências externas",
    "id": "21-12-estado-sessoes-e-dependencias-externas"
  },
  {
    "kind": "paragraph",
    "text": "Gateways funcionam melhor quando o processamento de requisições é predominantemente stateless. Entretanto, várias políticas introduzem estado: quotas, rate limits distribuídos, caches, sessões, nonces, listas de revogação e circuit breakers. A arquitetura precisa identificar onde esse estado vive, como é replicado, qual consistência é necessária e o que acontece quando o repositório fica indisponível."
  },
  {
    "kind": "paragraph",
    "text": "Dependências externas incluem provedores de identidade, introspection endpoints, PDPs, bancos, serviços de segredo, DNS, PKI e sistemas de analytics. Chamar um serviço remoto em cada requisição aumenta latência e disponibilidade composta. Caches controlados, validação local de JWT, decisões pré-compiladas e timeouts curtos podem reduzir risco, desde que revogação e atualização sejam consideradas."
  },
  {
    "kind": "paragraph",
    "text": "A política de falha precisa ser explícita. Fail-open permite tráfego quando um controle está indisponível; fail-closed bloqueia. Para autorização e validação de credenciais, fail-closed costuma ser necessário. Para telemetria não crítica, o runtime pode armazenar eventos temporariamente ou descartá-los de modo controlado para preservar disponibilidade. Não existe uma única regra; existe classificação de criticidade."
  },
  {
    "kind": "paragraph",
    "text": "Sessões no gateway devem ser evitadas quando não são necessárias. Afinidade pode reduzir flexibilidade de escala e dificultar recuperação. Quando um protocolo exige estado de conexão, como WebSocket, esse estado deve ser tratado como parte explícita da arquitetura, com drenagem, reconexão e distribuição de eventos."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Cada dependência externa aumenta a disponibilidade composta do gateway.",
    "headers": [
      "Dependência",
      "Uso",
      "Estratégia de resiliência"
    ],
    "rows": [
      [
        "IdP / JWKS",
        "Validar tokens e chaves.",
        "Cache com atualização e rotação controlada."
      ],
      [
        "PDP",
        "Decisão de autorização.",
        "Timeout curto, cache por risco e fail-closed."
      ],
      [
        "Redis / contador",
        "Quotas e rate limits globais.",
        "Cluster, degradação conhecida e métricas."
      ],
      [
        "Secret store",
        "Credenciais e certificados.",
        "Cache seguro, rotação e acesso mínimo."
      ],
      [
        "Analytics",
        "Eventos e relatórios.",
        "Buffer assíncrono e backpressure."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.13 Observabilidade, auditoria e correlação",
    "id": "21-13-observabilidade-auditoria-e-correlacao"
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade do gateway precisa mostrar o que ocorreu em cada trecho. Métricas inbound medem conexões, requests, status e latência percebida pelo consumidor. Métricas outbound medem resolução, conexão, handshake, tempo até o primeiro byte e resposta do backend. A diferença entre as duas ajuda a identificar custo de políticas e espera interna."
  },
  {
    "kind": "paragraph",
    "text": "Logs devem registrar timestamp, API, operação, versão, consumidor, identidade, política de falha, route ID, upstream, status e tempos relevantes. Segredos e dados pessoais precisam ser mascarados. O gateway não deve registrar Authorization, cookies ou payload integral por padrão. Auditoria administrativa deve ser separada de access logs e registrar quem alterou configuração, o que mudou e quando entrou em vigor."
  },
  {
    "kind": "paragraph",
    "text": "Tracing distribuído conecta consumidor, gateway e backend. O gateway deve preservar ou gerar trace context conforme a política da organização, criando spans para processamento interno e chamada outbound. Quando proxies múltiplos existem, cada camada precisa contribuir sem sobrescrever a correlação. IDs de requisição proprietários ainda podem ser úteis, mas devem coexistir com padrões de tracing."
  },
  {
    "kind": "paragraph",
    "text": "Cardinalidade é um risco. Colocar subject, URL completa ou valores de query em labels de métrica pode explodir séries temporais e custo. Dados de alta cardinalidade pertencem a logs ou traces. Métricas devem usar dimensões controladas, como API, operação, status class, região e backend pool."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/pt/figure-05-observability.svg",
    "alt": "Correlação e observabilidade entre conexões inbound e outbound do gateway",
    "caption": "Figura 5 - A correlação precisa acompanhar a chamada nas duas conexões mantidas pelo gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.14 Governança, portal e ciclo de vida",
    "id": "21-14-governanca-portal-e-ciclo-de-vida"
  },
  {
    "kind": "paragraph",
    "text": "O gateway é parte de uma plataforma, não o ciclo de vida completo. Produtores precisam registrar APIs, publicar contratos, definir ownership, ambientes, versões, produtos e políticas. Consumidores precisam descobrir documentação, solicitar acesso, obter credenciais e acompanhar consumo. O portal de desenvolvedores materializa parte dessa relação, mas depende de processos e dados confiáveis."
  },
  {
    "kind": "paragraph",
    "text": "Governança deve ser automatizada no pipeline. OpenAPI, políticas, certificados, configurações de backend e testes podem ser versionados como código. Linting, validação de segurança, diff de contrato e promoção entre ambientes reduzem mudanças manuais. A interface administrativa do gateway não deve ser o único lugar onde a verdade existe."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo de vida inclui draft, revisão, publicação, operação, depreciação e retirada. O gateway precisa permitir coexistência de versões, comunicação de sunset e medição de consumidores ainda ativos. Remover uma rota sem telemetria e sem plano de migração transforma governança em indisponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Produtos e planos agrupam APIs com regras comerciais ou operacionais. Uma subscription pode vincular consumidor, credencial, quota e conjunto de operações. Esses objetos precisam de ownership, expiração, rotação e auditoria. Credenciais órfãs são um risco tão relevante quanto APIs órfãs."
  },
  {
    "kind": "subhead",
    "text": "Governança prática"
  },
  {
    "kind": "paragraph",
    "text": "A configuração publicada no gateway deve ser reproduzível por pipeline, revisável por pares e associada a um contrato. Mudanças exclusivamente manuais dificultam auditoria, rollback e consistência entre ambientes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.15 Desempenho e planejamento de capacidade",
    "id": "21-15-desempenho-e-planejamento-de-capacidade"
  },
  {
    "kind": "paragraph",
    "text": "Desempenho do gateway não pode ser resumido a requisições por segundo. O custo depende de tamanho de payload, TLS, algoritmo criptográfico, número de políticas, transformações, chamadas externas, logging, compressão, protocolos e latência do backend. Duas APIs com o mesmo RPS podem consumir recursos muito diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Conexões são uma dimensão própria. Um gateway pode receber muitas conexões curtas, poucas conexões HTTP/2 multiplexadas ou milhares de WebSockets persistentes. Limites de file descriptors, buffers, portas efêmeras, pools e timeouts precisam ser dimensionados. A CPU pode ficar baixa enquanto o sistema esgota sockets ou memória de buffer."
  },
  {
    "kind": "paragraph",
    "text": "Testes de carga devem reproduzir distribuição real de operações, autenticação, tamanhos, erros e think time. Testar apenas uma rota simples em loop fornece um número de laboratório, não capacidade de produção. É necessário observar percentis de latência, saturação, filas, retransmissões, garbage collection, conexões e dependências externas."
  },
  {
    "kind": "paragraph",
    "text": "Planejamento inclui headroom para falhas. Se o cluster suporta apenas a carga normal com todos os nós, a perda de uma instância causa saturação. A capacidade deve considerar manutenção, deploy, pico, crescimento e failover regional. Autoscaling ajuda, mas possui atraso; o sistema precisa sobreviver até que novas instâncias estejam prontas e aquecidas."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Capacidade é multidimensional e precisa de teste representativo.",
    "headers": [
      "Dimensão",
      "Indicadores",
      "Pergunta de capacidade"
    ],
    "rows": [
      [
        "Tráfego",
        "RPS, bytes/s, operações.",
        "Qual é a mistura real de chamadas?"
      ],
      [
        "Conexões",
        "ativas, novas/s, reutilização.",
        "Há pooling, HTTP/2 ou WebSocket?"
      ],
      [
        "CPU",
        "criptografia, parsing, scripts.",
        "Quais políticas dominam o custo?"
      ],
      [
        "Memória",
        "buffers, cache, payloads.",
        "Qual o pior tamanho simultâneo?"
      ],
      [
        "Dependências",
        "latência e erro externo.",
        "O gateway satura aguardando terceiros?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.16 Falhas, antipadrões e troubleshooting",
    "id": "21-16-falhas-antipadroes-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Um erro 404 pode ser produzido porque o host não correspondeu, a rota não foi encontrada, a versão não existe ou o backend retornou 404. Um 401 pode vir do gateway, do IdP, de uma política customizada ou do serviço. Um 502 normalmente indica falha ao falar com upstream, mas pode envolver DNS, TCP, TLS, HTTP inválido ou conexão encerrada. A investigação precisa localizar o emissor da resposta."
  },
  {
    "kind": "paragraph",
    "text": "O antipadrão mais comum é tratar o gateway como uma caixa opaca. Sem métricas por estágio e sem acesso a logs correlacionados, equipes alteram políticas, timeouts e backends por tentativa. Outro antipadrão é acumular lógica de negócio no gateway, criando fluxos longos e frágeis. Também é perigoso publicar todas as APIs em um cluster sem isolamento ou capacidade de contenção de falhas."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting deve seguir camadas. Primeiro confirme DNS e endereço. Depois conexão TCP, TLS, listener e seleção de API. Em seguida examine autenticação, autorização, quotas e transformações. Só então investigue rota, DNS do backend, conexão de saída e resposta upstream. A captura precisa indicar o ponto de observação, porque o IP e a porta mudam ao atravessar o gateway."
  },
  {
    "kind": "paragraph",
    "text": "Mudanças de configuração são uma fonte importante de incidentes. Registre versão ativa, horário de publicação e diferença em relação à versão anterior. Se apenas alguns nós apresentam erro, suspeite de propagação parcial, cache ou estado local. Se o problema aparece após rotação de certificado, verifique truststores, cadeias, SNI e sobreposição de validade."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O código final é apenas o início do diagnóstico.",
    "headers": [
      "Sintoma",
      "Etapas a verificar",
      "Evidência útil"
    ],
    "rows": [
      [
        "Connection refused",
        "listener, firewall, IP/porta.",
        "SYN/RST, socket em escuta, health do nó."
      ],
      [
        "TLS handshake failed",
        "certificado, SNI, trust, versão.",
        "alerta TLS e cadeia apresentada."
      ],
      [
        "401 / 403",
        "credencial, claims, política e PDP.",
        "issuer, audience, scope e policy ID."
      ],
      [
        "429",
        "chave de contagem e estado.",
        "contador, janela, nó e consumidor."
      ],
      [
        "502 / 503",
        "rota, DNS, pool, connect e health.",
        "upstream escolhido e tempos outbound."
      ],
      [
        "Latência alta",
        "fila, política externa, backend.",
        "spans e decomposição de tempos."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Checklist operacional de troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Roteiro mínimo de diagnóstico 1. Resolver nome e confirmar destino. 2. Testar TCP e TLS até o listener. 3. Confirmar host, método, path e API selecionada. 4. Identificar política que aceitou ou rejeitou. 5. Confirmar rota e upstream escolhido. 6. Medir DNS, connect, TLS e tempo do backend. 7. Correlacionar resposta com versão de configuração."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.17 Estudos de caso e laboratórios",
    "id": "21-17-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - Gateway externo e interno: uma instituição expõe APIs a parceiros por um gateway de borda e encaminha chamadas a um gateway interno próximo aos serviços. O gateway externo valida certificado de parceiro e access token; o interno aplica autorização por domínio e roteia para backends privados. O desenho funciona quando cada camada possui responsabilidade distinta e a correlação atravessa ambas."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - Configuração parcial: após uma publicação, metade das chamadas retorna 401. O balanceador distribui tráfego entre quatro nós, mas dois não receberam a nova chave JWKS. A versão de configuração registrada por instância revela a divergência. O incidente demonstra a necessidade de publicação atômica, confirmação e health de configuração, não apenas health de processo."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - Esgotamento de saída: o gateway recebe tráfego normalmente, mas começa a retornar 502 em picos. CPU e memória estão estáveis. Métricas de sockets mostram grande quantidade de conexões curtas e portas em TIME_WAIT por ausência de pooling. O ajuste de keep-alive, limites e estratégia de SNAT resolve a causa, que não estava em políticas HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - Dependência de autorização: todas as requisições consultam um PDP remoto. Quando o PDP apresenta latência, o gateway acumula threads e aumenta o tempo de resposta de APIs não relacionadas. A solução combina timeout, bulkhead, cache de decisões de baixo risco e dimensionamento separado, preservando fail-closed para operações sensíveis."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Configure um reverse proxy simples e observe as duas conexões. 2) Simule falha de DNS do backend e compare com listener indisponível. 3) Aplique uma política de JWT e registre o estágio da rejeição. 4) Teste pooling, retries e timeouts com um backend lento. 5) Publique duas versões de configuração e verifique rollback."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway é um runtime de mediação e aplicação de políticas entre consumidores e backends. Ele termina uma relação de transporte e cria outra, podendo alterar identidade, protocolo, headers, formato e destino. Essa posição concentra valor de segurança e governança, mas também cria criticidade operacional."
  },
  {
    "kind": "paragraph",
    "text": "Uma plataforma madura separa data plane, control plane, management plane e developer plane. O runtime precisa permanecer disponível com configuração válida mesmo durante falhas de gestão. Publicações devem ser versionadas, confirmadas e reversíveis. Topologia, alta disponibilidade e estado distribuído precisam ser definidos de forma explícita."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo da requisição inclui listener, seleção de API, políticas, roteamento, conexão outbound e processamento da resposta. Segurança, tráfego, caching, resiliência e observabilidade dependem da ordem e do estado dessas etapas. Diagnóstico confiável separa inbound e outbound e localiza o componente que produziu a decisão."
  },
  {
    "kind": "paragraph",
    "text": "O gateway não substitui lógica de negócio, WAF, load balancer, service mesh ou governança completa. Ele integra-se a esses componentes. A arquitetura correta equilibra centralização, autonomia, isolamento, capacidade e continuidade. O próximo capítulo aprofundará as políticas executadas pelo motor do gateway."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 22 aprofundará Políticas de Gateway: estrutura, ordem de execução, variáveis de contexto, autenticação, autorização, transformação, roteamento, resiliência, scripts, tratamento de erros e boas práticas de governança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura de API Gateway",
    "id": "checklist-de-arquitetura-de-api-gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "As responsabilidades do gateway estão diferenciadas de WAF, load balancer, ingress e service mesh.",
      "Data plane, control plane, management plane e developer plane possuem fronteiras e SLAs definidos.",
      "A indisponibilidade do plano de gestão não interrompe tráfego já publicado.",
      "Listeners, SNI, Host, paths e regras de seleção são determinísticos e testados.",
      "A ordem das políticas evita bypass, custo desnecessário e vazamento de dados.",
      "O acesso direto aos backends está bloqueado ou rigidamente controlado.",
      "Conexões outbound, DNS, SNAT, pooling, health checks e timeouts estão dimensionados.",
      "Retries são aplicados somente quando a operação pode ser repetida com segurança.",
      "Rate limits e quotas têm chave, escopo e armazenamento de estado conhecidos.",
      "Caches variam por identidade e não armazenam dados sensíveis de forma insegura.",
      "Configurações são versionadas, publicadas por pipeline, confirmadas e reversíveis.",
      "Logs, métricas e traces correlacionam inbound, políticas e outbound.",
      "O cluster suporta perda de nós e possui headroom para picos e failover.",
      "Dependências externas possuem timeout, estratégia de falha e observabilidade.",
      "Há runbooks para 401, 403, 429, 502, 503, TLS e latência."
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
      "Explique por que consumidor-gateway e gateway-backend são conexões independentes.",
      "Diferencie API Gateway, reverse proxy, WAF, load balancer e service mesh.",
      "Descreva os quatro planos lógicos de uma plataforma de APIs.",
      "Monte a sequência de processamento de uma requisição e justifique a ordem das políticas.",
      "Explique como SNI e Host participam da seleção de API.",
      "Compare topologias centralizada, por domínio, em camadas e híbrida.",
      "Proponha arquitetura de alta disponibilidade que sobreviva à perda do control plane.",
      "Discuta quando a validação local de JWT é preferível à introspection remota.",
      "Explique como pooling e SNAT afetam conectividade com backends.",
      "Proponha métricas para separar latência do gateway e latência do backend.",
      "Analise os riscos de armazenar lógica de negócio extensa em políticas.",
      "Crie um roteiro para investigar respostas 502 intermitentes em apenas uma região."
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
        "API Gateway",
        "Runtime de mediação e aplicação de políticas entre consumidores e backends."
      ],
      [
        "Control plane",
        "Plano que distribui configuração e estado desejado aos runtimes."
      ],
      [
        "Data plane",
        "Plano que processa o tráfego efetivo das APIs."
      ],
      [
        "Developer portal",
        "Interface de descoberta, documentação, onboarding e consumo."
      ],
      [
        "Drain",
        "Processo de parar novas requisições antes de encerrar uma instância."
      ],
      [
        "Egress",
        "Tráfego de saída do gateway em direção ao backend."
      ],
      [
        "Fail-closed",
        "Comportamento que bloqueia quando um controle crítico falha."
      ],
      [
        "Fail-open",
        "Comportamento que permite continuidade quando um controle falha."
      ],
      [
        "Ingress",
        "Tráfego que entra no runtime pelo listener."
      ],
      [
        "Listener",
        "Endpoint local que aceita conexões e protocolos."
      ],
      [
        "Management plane",
        "Plano administrativo de publicação, catálogo e governança."
      ],
      [
        "Policy",
        "Regra executada sobre requisição, resposta ou erro."
      ],
      [
        "Route",
        "Mapeamento entre API lógica e destino de backend."
      ],
      [
        "SNAT",
        "Tradução do endereço e porta de origem no trecho de saída."
      ],
      [
        "Upstream",
        "Servidor ou pool de destino chamado pelo gateway."
      ],
      [
        "Virtual host",
        "Identidade lógica de host compartilhando endereço e porta."
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
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9111 - HTTP Caching.",
      "IETF. RFC 8446 - The Transport Layer Security Protocol Version 1.3.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "NIST. SP 800-204 - Security Strategies for Microservices-based Application Systems.",
      "NIST. SP 800-207 - Zero Trust Architecture.",
      "OpenAPI Initiative. OpenAPI Specification.",
      "Microsoft Azure Architecture Center. API Gateway pattern.",
      "Envoy Proxy Documentation. Architecture overview and HTTP filters.",
      "OWASP. API Security Top 10.",
      "CNCF. Gateway API and service mesh architectural materials."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Produtos de gateway evoluem em ritmo próprio. Ao aplicar os conceitos em uma plataforma específica, confirme a documentação da versão implantada, principalmente para protocolos, políticas, clustering, limites, integração com identidade e comportamento de alta disponibilidade."
  }
];
