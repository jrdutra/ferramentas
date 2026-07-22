import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const ZERO_TRUST_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Zero Trust para APIs: verificar explicitamente e decidir por requisição"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/overview.svg",
    "alt": "Solicitação de API atravessando verificação de identidade, risco, política e enforcement",
    "caption": "Figura de abertura - O acesso a uma API é uma decisão dinâmica baseada no sujeito, no recurso, no contexto e na política vigente."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Nenhuma localização concede confiança implícita; cada acesso deve ser autenticado, autorizado, limitado e continuamente avaliado."
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
    "text": "A arquitetura tradicional de segurança foi construída em torno de fronteiras de rede. Usuários, servidores e aplicações localizados dentro de uma rede corporativa recebiam, de forma explícita ou implícita, um nível maior de confiança. Esse modelo perdeu eficácia à medida que APIs passaram a conectar nuvens, parceiros, dispositivos móveis, fornecedores, aplicações SaaS, datacenters e workloads efêmeros. A origem de uma conexão continua relevante como sinal, mas já não é suficiente para decidir se uma operação deve ser autorizada."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust é um conjunto de princípios e uma estratégia arquitetural baseada na eliminação de confiança implícita. Recursos são protegidos individualmente ou em grupos pequenos; sujeitos e dispositivos são identificados; decisões de acesso usam políticas e informações atuais; comunicações são protegidas; e a telemetria é utilizada para aperfeiçoar continuamente a postura. O objetivo não é desconfiar de pessoas de forma genérica, mas evitar que localização, propriedade ou uma autenticação passada produzam autorização ampla e permanente."
  },
  {
    "kind": "paragraph",
    "text": "APIs são um ponto natural para aplicar Zero Trust porque já materializam operações, identidades, dados e políticas. Um API Gateway pode atuar como Policy Enforcement Point na borda, enquanto service meshes aplicam controles entre workloads. Provedores de identidade emitem credenciais e tokens; mecanismos de postura fornecem contexto; motores de política tomam decisões; e observabilidade registra o que ocorreu. Entretanto, comprar um gateway, ativar mTLS ou exigir MFA não cria, isoladamente, uma arquitetura Zero Trust."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta os fundamentos de identidade, OAuth, mTLS, API Gateways, policies, service mesh, Kubernetes e observabilidade estudados anteriormente. O foco é técnico e operacional: como modelar sujeitos e recursos, como avaliar cada requisição, como limitar privilégios, como reduzir movimentação lateral, como tratar falhas dos componentes de decisão e como evoluir a implantação sem interromper integrações críticas."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada fluxo, identifique: sujeito, recurso, ação, contexto, fonte de identidade, motor de decisão, ponto de enforcement e evidência registrada. Essa decomposição transforma o termo Zero Trust em arquitetura verificável."
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
      "Explicar Zero Trust sem reduzi-lo a produto, VPN, mTLS ou autenticação multifator.",
      "Relacionar os princípios do NIST SP 800-207 ao desenho de APIs corporativas.",
      "Distinguir Policy Engine, Policy Administrator, Policy Enforcement Point, PDP, PIP e PAP.",
      "Modelar identidades humanas, aplicações, workloads, dispositivos e sessões.",
      "Aplicar autorização contextual e menor privilégio a operações e dados de APIs.",
      "Compreender tokens bearer, tokens vinculados, mTLS e DPoP no contexto de redução de replay.",
      "Projetar controles Zero Trust em API Gateways, service meshes e Kubernetes.",
      "Combinar microsegmentação, egress controlado, proteção de dados e observabilidade.",
      "Definir estratégias de disponibilidade, cache, fail-open e fail-closed para decisões de política.",
      "Planejar uma jornada de maturidade com métricas, testes, governança e resposta adaptativa."
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
      "34.1 O que Zero Trust é e o que não é",
      "34.2 Princípios e componentes lógicos",
      "34.3 Recursos, sujeitos e superfícies protegidas",
      "34.4 Decisão por requisição e confiança dinâmica",
      "34.5 Identidade humana, aplicação, workload e dispositivo",
      "34.6 Tokens, mTLS e prova de posse",
      "34.7 Autorização granular e arquitetura de políticas",
      "34.8 API Gateways como pontos de enforcement",
      "34.9 Service mesh, Kubernetes e tráfego east-west",
      "34.10 Microsegmentação, egress e proteção de dados",
      "34.11 Telemetria, risco e resposta adaptativa",
      "34.12 Disponibilidade, governança, maturidade e troubleshooting",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.1 O que Zero Trust é e o que não é",
    "id": "34-1-o-que-zero-trust-e-e-o-que-nao-e"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust é um modelo de segurança, um conjunto de princípios de projeto e uma estratégia coordenada de gestão. Sua premissa é que ameaças podem existir dentro e fora das fronteiras tradicionais e que nenhum elemento deve receber confiança implícita apenas por localização, propriedade ou relacionamento organizacional. A proteção se desloca de segmentos amplos de rede para usuários, dispositivos, workloads, aplicações, dados e recursos específicos."
  },
  {
    "kind": "paragraph",
    "text": "O termo não significa bloquear tudo, reautenticar o usuário manualmente a cada clique ou eliminar completamente redes privadas. Significa que cada acesso precisa estar apoiado em identidade, política e contexto suficientes para o risco daquela ação. Uma requisição de leitura de dados públicos e uma operação financeira irreversível não exigem necessariamente a mesma força de autenticação, o mesmo conjunto de sinais ou o mesmo tempo de validade da autorização."
  },
  {
    "kind": "paragraph",
    "text": "Também não existe um produto único chamado Zero Trust. Identity providers, gateways, service meshes, EDRs, motores de política, catálogos de dados, SIEMs e plataformas de observabilidade podem participar da arquitetura. O valor surge da integração coerente entre esses componentes, da qualidade das políticas, da cobertura dos recursos e da capacidade de medir e reagir a desvios."
  },
  {
    "kind": "paragraph",
    "text": "Uma rede interna ainda pode reduzir exposição, e um firewall continua útil. O erro é transformar a presença nessa rede em prova suficiente de identidade e autorização. Da mesma forma, mTLS autentica as pontas de um canal, mas não define sozinho se o serviço A pode executar a operação X sobre o recurso Y em nome do usuário Z."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Zero Trust deve ser compreendido como arquitetura e processo, não como marca de produto.",
    "headers": [
      "Afirmação",
      "Avaliação",
      "Explicação"
    ],
    "rows": [
      [
        "Zero Trust é ausência total de confiança.",
        "Incorreta.",
        "A confiança deixa de ser implícita e passa a ser explicitamente avaliada e limitada."
      ],
      [
        "VPN implementa Zero Trust.",
        "Incompleta.",
        "VPN cria conectividade; não garante autorização granular nem avaliação contínua."
      ],
      [
        "mTLS é suficiente.",
        "Incorreta.",
        "Autentica pares, mas precisa de políticas, identidade de negócio e controles de dados."
      ],
      [
        "Toda requisição deve ser avaliada.",
        "Correta como princípio.",
        "A avaliação pode usar decisões locais, cache seguro e sinais atuais conforme o risco."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.2 Princípios e componentes lógicos",
    "id": "34-2-principios-e-componentes-logicos"
  },
  {
    "kind": "paragraph",
    "text": "O NIST SP 800-207 descreve princípios que podem ser aplicados diretamente a APIs: recursos e serviços são tratados como ativos; toda comunicação é protegida independentemente da localização; o acesso é concedido por sessão e com menor privilégio; decisões consideram identidade, estado do ativo, comportamento e contexto; e a organização coleta informações para melhorar continuamente a postura."
  },
  {
    "kind": "paragraph",
    "text": "Na arquitetura lógica do NIST, o Policy Engine toma a decisão de conceder, negar ou revogar acesso. O Policy Administrator executa essa decisão, por exemplo configurando ou encerrando uma sessão. O Policy Enforcement Point habilita, monitora e termina a conexão entre o sujeito e o recurso. Em uma plataforma de APIs, o gateway, um proxy de mesh, um sidecar ou o próprio backend podem exercer o papel de enforcement."
  },
  {
    "kind": "paragraph",
    "text": "A terminologia de autorização usada em arquiteturas de software frequentemente complementa esse modelo com PDP, PEP, PIP e PAP. O Policy Decision Point avalia a política; o Policy Information Point fornece atributos; o Policy Administration Point administra políticas; e o Policy Enforcement Point aplica a decisão. Os nomes variam entre produtos, mas as responsabilidades precisam permanecer claras para evitar pontos cegos e decisões conflitantes."
  },
  {
    "kind": "paragraph",
    "text": "Uma decisão pode ser binária, porém arquiteturas avançadas também geram obrigações: exigir step-up, mascarar campos, reduzir limite transacional, ativar logging reforçado, impor rate limit específico ou encaminhar a operação para aprovação. Essas obrigações precisam ser suportadas pelo enforcement e auditadas como parte do resultado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-01.svg",
    "alt": "Policy Decision Point separado do Policy Enforcement Point e alimentado por sinais",
    "caption": "Figura 1 - A decisão e o enforcement são funções distintas, alimentadas por múltiplas fontes de sinais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.3 Recursos, sujeitos e superfícies protegidas",
    "id": "34-3-recursos-sujeitos-e-superficies-protegidas"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust começa pela identificação dos recursos que realmente precisam de proteção. Em APIs, o recurso não é apenas o hostname ou o endpoint. Pode ser uma operação, um registro, um campo sensível, um conjunto de dados, uma fila, um segredo, uma chave de assinatura ou uma função administrativa. Quanto mais precisa for a classificação, mais granular pode ser a política."
  },
  {
    "kind": "paragraph",
    "text": "O sujeito também precisa ser modelado corretamente. Uma mesma requisição pode carregar a identidade do usuário final, da aplicação cliente e do workload intermediário. Em fluxos delegados, o backend precisa distinguir quem está agindo e em nome de quem. Perder essa distinção produz tokens genéricos, logs incompletos e privilégios excessivos."
  },
  {
    "kind": "paragraph",
    "text": "A superfície protegida inclui interfaces públicas, integrações B2B, APIs internas, endpoints administrativos, canais de mensageria e dependências externas. O inventário deve relacionar owner, dados processados, método de autenticação, exposição, consumidores, criticidade e políticas. APIs desconhecidas, antigas ou de teste são difíceis de inserir em uma estratégia Zero Trust porque não possuem contexto de risco ou ciclo de vida governado."
  },
  {
    "kind": "paragraph",
    "text": "A classificação de dados influencia a decisão. Um consumidor autenticado pode receber campos básicos, mas não dados financeiros completos. Um workload autorizado a ler um cadastro pode não ter permissão para exportar milhares de registros. O princípio do menor privilégio precisa alcançar volume, finalidade, horário, contexto e propriedades do objeto."
  },
  {
    "kind": "subhead",
    "text": "Identidades distintas participam da mesma chamada"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-02.svg",
    "alt": "Identidade efetiva composta por usuário, aplicação, workload e dispositivo",
    "caption": "Figura 2 - A identidade efetiva de uma chamada é composta por várias camadas, não apenas pelo usuário."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.4 Decisão por requisição e confiança dinâmica",
    "id": "34-4-decisao-por-requisicao-e-confianca-dinamica"
  },
  {
    "kind": "paragraph",
    "text": "Em uma API, a unidade prática de decisão é normalmente a requisição ou uma sessão curta associada a um conjunto limitado de operações. O gateway identifica o sujeito, valida a credencial, extrai claims, consulta atributos quando necessário e avalia a política aplicável ao método, caminho, recurso e contexto. A autorização não deve ser inferida apenas porque uma conexão anterior foi aceita."
  },
  {
    "kind": "paragraph",
    "text": "Confiança dinâmica significa que o resultado pode mudar quando os sinais mudam. Um usuário autenticado com MFA pode perder acesso se o dispositivo ficar comprometido, se a localização se tornar incompatível, se o token for revogado ou se o risco da sessão aumentar. Em aplicações críticas, ações sensíveis podem exigir nova autenticação, prova adicional ou confirmação fora de banda."
  },
  {
    "kind": "paragraph",
    "text": "A avaliação contínua não implica que cada chamada dependa de dezenas de serviços remotos. Políticas podem ser compiladas e distribuídas para PDPs locais; atributos podem ter TTLs curtos; decisões de baixo risco podem ser armazenadas em cache; e eventos de revogação podem invalidar estado. O desafio é equilibrar atualidade, disponibilidade, latência e segurança."
  },
  {
    "kind": "paragraph",
    "text": "O desenho precisa especificar o comportamento quando sinais estão indisponíveis. Uma API de consulta pública pode operar de forma degradada, enquanto uma transferência de alto valor deve negar acesso se o PDP, o serviço antifraude ou a confirmação de postura não puderem ser consultados. Fail-open e fail-closed são decisões por classe de operação, não opções globais."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-03.svg",
    "alt": "Sequência de identificação, contexto, decisão e enforcement",
    "caption": "Figura 3 - A autorização é uma sequência de identificação, avaliação contextual, decisão e enforcement."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.5 Identidade humana, aplicação, workload e dispositivo",
    "id": "34-5-identidade-humana-aplicacao-workload-e-dispositivo"
  },
  {
    "kind": "paragraph",
    "text": "Identidade humana costuma ser estabelecida por um provedor de identidade com autenticação multifator e políticas de risco. O token resultante deve possuir issuer, subject, audience, escopos, tempo e nível de autenticação adequados. Grupos corporativos são úteis, mas frequentemente amplos demais para autorização fina; atributos de função, unidade, relacionamento e contexto podem complementar a decisão."
  },
  {
    "kind": "paragraph",
    "text": "A aplicação cliente também é um sujeito. Em OAuth 2.0, o client_id identifica o software registrado e o tipo de cliente influencia os controles disponíveis. Clientes confidenciais autenticam-se no token endpoint; clientes públicos dependem de PKCE e proteção do ambiente. Em integrações B2B, a identidade da organização e do sistema parceiro deve ser separada da identidade do usuário final."
  },
  {
    "kind": "paragraph",
    "text": "Workload identity evita credenciais estáticas compartilhadas entre serviços. Certificados de curta duração, SPIFFE IDs, managed identities e tokens projetados para contas de serviço permitem vincular a chamada à instância ou ao serviço executante. Em Kubernetes, ServiceAccounts e federação de identidade com a nuvem reduzem a necessidade de segredos permanentes em Pods."
  },
  {
    "kind": "paragraph",
    "text": "O dispositivo fornece sinais adicionais: registro, integridade, versão, criptografia, postura de EDR e conformidade. Esses sinais não devem ser confundidos com a identidade do usuário. Uma pessoa válida em um dispositivo não gerenciado pode receber acesso limitado; um workload válido em um nó comprometido pode exigir quarentena. Políticas maduras combinam as dimensões sem transformar uma delas em confiança absoluta."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Zero Trust combina identidades e sinais sem presumir que um único atributo seja suficiente.",
    "headers": [
      "Identidade",
      "Exemplos de evidência",
      "Uso em política"
    ],
    "rows": [
      [
        "Usuário",
        "sub, acr, amr, grupos, risco.",
        "Ações permitidas, step-up e segregação de funções."
      ],
      [
        "Aplicação",
        "clientid, certificado, software statement.",
        "Consumidor, canal, quotas e escopos."
      ],
      [
        "Workload",
        "SPIFFE ID, managed identity, ServiceAccount.",
        "Chamadas entre serviços e acesso a backends."
      ],
      [
        "Dispositivo",
        "registro, postura, EDR, versão.",
        "Acesso adaptativo e redução de privilégio."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.6 Tokens, mTLS e prova de posse",
    "id": "34-6-tokens-mtls-e-prova-de-posse"
  },
  {
    "kind": "paragraph",
    "text": "Bearer tokens são utilizados por quem os possui. Se forem copiados de logs, memória, browser ou canal comprometido, podem ser reutilizados até expirar ou serem revogados. Por isso, precisam de transporte protegido, armazenamento seguro, audience restrita, escopos mínimos e vida curta. Zero Trust não elimina bearer tokens, mas reduz sua abrangência e assume que vazamentos são possíveis."
  },
  {
    "kind": "paragraph",
    "text": "Sender-constrained tokens vinculam o uso do token a uma chave criptográfica. No OAuth, mTLS pode associar o token ao certificado cliente, enquanto DPoP usa uma prova assinada no nível da aplicação e vincula o token a uma chave pública. O resource server valida não apenas o token, mas também a demonstração de posse da chave correspondente."
  },
  {
    "kind": "paragraph",
    "text": "mTLS é especialmente adequado a integrações servidor-servidor, workloads e ambientes com PKI operacional. DPoP pode ser usado por clientes que não conseguem apresentar certificados TLS de forma conveniente. Ambos reduzem o valor de um token roubado, porém não impedem uso indevido por um cliente legítimo comprometido nem substituem autorização e proteção contra replay da própria operação."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs de alto risco, a prova de posse deve ser combinada a idempotência, assinatura de mensagens quando necessária, audience específica e detecção de anomalias. Tokens amplos, longa duração e propagação indiscriminada entre microsserviços contradizem menor privilégio, mesmo que estejam criptograficamente vinculados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-04.svg",
    "alt": "Token vinculado a uma chave criptográfica para prova de posse",
    "caption": "Figura 4 - Vincular o token a uma chave adiciona uma condição criptográfica para seu uso."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Prova de posse melhora a resistência a replay de tokens, mas exige validação e operação corretas.",
    "headers": [
      "Mecanismo",
      "Prova apresentada",
      "Uso típico",
      "Cuidado"
    ],
    "rows": [
      [
        "Bearer",
        "Apenas o token.",
        "APIs gerais e fluxos OAuth comuns.",
        "Proteção rigorosa contra vazamento."
      ],
      [
        "OAuth mTLS",
        "Certificado cliente no TLS.",
        "B2B e workloads com PKI.",
        "Ciclo de vida de certificados e terminação TLS."
      ],
      [
        "DPoP",
        "JWT de prova assinado por requisição.",
        "Clientes de aplicação e APIs HTTP.",
        "Validação de htm, htu, iat, jti e nonce quando usado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.7 Autorização granular e arquitetura de políticas",
    "id": "34-7-autorizacao-granular-e-arquitetura-de-politicas"
  },
  {
    "kind": "paragraph",
    "text": "RBAC é útil para responsabilidades estáveis, mas raramente é suficiente sozinho para APIs complexas. ABAC permite combinar atributos do sujeito, recurso, ação e ambiente. ReBAC representa relações, como titular, representante ou membro de uma organização. Políticas podem combinar esses modelos, desde que permaneçam compreensíveis, testáveis e auditáveis."
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura precisa definir onde a decisão ocorre. Um gateway pode consultar um PDP central, usar policy-as-code local ou combinar decisões. O backend continua responsável por regras que dependem de estado de negócio e por impedir acesso direto que contorne o gateway. Em service mesh, autorização entre workloads pode ocorrer no proxy, enquanto autorização de objeto permanece na aplicação."
  },
  {
    "kind": "paragraph",
    "text": "PIPs fornecem atributos de diretórios, CMDB, inventário de dispositivos, classificadores de dados, risco e contexto. O PAP administra as políticas e seu ciclo de vida. Para produção, políticas precisam de versionamento, revisão, testes unitários, simulações com tráfego histórico, aprovação, rollout gradual e rollback."
  },
  {
    "kind": "paragraph",
    "text": "O resultado da decisão deve ser explicável. Logs não precisam expor a política inteira, mas devem registrar identificador da decisão, versão da política, sujeito, recurso, ação, resultado e motivo principal. Essa evidência é essencial para auditoria, troubleshooting e investigação de incidentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-05.svg",
    "alt": "Cadeia governada de atributos, política, decisão e enforcement",
    "caption": "Figura 5 - A autorização depende de enforcement não contornável e de uma cadeia governada de política e atributos."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de policy-as-code"
  },
  {
    "kind": "paragraph",
    "text": "package api.transferencias default allow := false allow if { input.subject.assurance >= 2 input.subject.tenant == input.resource.tenant \"transfer:write\" in input.token.scopes input.transaction.amount <= input.subject.daily_limit input.device.compliant == true }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.8 API Gateways como pontos de enforcement",
    "id": "34-8-api-gateways-como-pontos-de-enforcement"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é um PEP natural para tráfego north-south. Ele pode terminar TLS, validar tokens, verificar certificados, consultar PDPs, aplicar rate limits, remover credenciais externas, propagar identidade controlada e registrar decisões. Sua posição central facilita consistência, porém não autoriza transformar o gateway em único componente de segurança."
  },
  {
    "kind": "paragraph",
    "text": "O gateway deve validar issuer, audience, assinatura, tempo, tipo do token e claims obrigatórios. Policies genéricas baseadas apenas em presença de token geram falsa sensação de proteção. A rota precisa estar associada a uma política de autorização explícita, e endpoints administrativos devem possuir controles ainda mais restritivos."
  },
  {
    "kind": "paragraph",
    "text": "A identidade propagada ao backend precisa ser protegida contra spoofing. Headers internos devem ser removidos da requisição externa e recriados pelo gateway; o canal até o backend deve ser autenticado; e o serviço precisa aceitar esses headers apenas de fontes autorizadas. Alternativamente, o gateway pode trocar o token por outro de audience específica ou usar credenciais de workload."
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade exige avaliar dependências do gateway: introspection, JWKS, PDP, KPS, diretórios e serviços de risco. Caches têm de respeitar expiração, revogação e versionamento. Métricas devem separar falhas de autenticação, negações de política, indisponibilidade do PDP, erro de backend e bloqueios por limite."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O gateway precisa produzir diagnósticos por etapa, sem devolver detalhes sensíveis ao consumidor.",
    "headers": [
      "Etapa no gateway",
      "Controle Zero Trust",
      "Falha que deve ser diferenciada"
    ],
    "rows": [
      [
        "TLS / mTLS",
        "Canal protegido e identidade do peer.",
        "Certificado inválido, SNI, CA ou revogação."
      ],
      [
        "Token",
        "Issuer, audience, assinatura, tempo e cnf.",
        "Token inválido, expirado ou não vinculado."
      ],
      [
        "Política",
        "Sujeito + ação + recurso + contexto.",
        "Negação legítima ou PDP indisponível."
      ],
      [
        "Propagação",
        "Headers ou token interno controlado.",
        "Spoofing, audience errada ou excesso de claims."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.9 Service mesh, Kubernetes e tráfego east-west",
    "id": "34-9-service-mesh-kubernetes-e-trafego-east-west"
  },
  {
    "kind": "paragraph",
    "text": "A segurança de borda não impede movimentação lateral se serviços internos confiarem em qualquer origem da rede. Um service mesh pode fornecer mTLS automático, identidade de workload e autorização L4/L7 entre serviços. Cada chamada passa a ser associada à identidade do workload, independentemente do IP efêmero ou do nó em que o Pod está executando."
  },
  {
    "kind": "paragraph",
    "text": "No Kubernetes, a identidade pode partir de ServiceAccounts e ser federada com provedores de nuvem. Pods não devem compartilhar credenciais estáticas de longa duração. RBAC controla ações na API do cluster, enquanto policies de mesh e NetworkPolicies controlam comunicações de workload. Esses mecanismos atuam em planos diferentes e precisam ser projetados em conjunto."
  },
  {
    "kind": "paragraph",
    "text": "A policy de mesh pode restringir quais workloads chamam qual serviço, porta, método ou caminho. Para autorização em nome do usuário, o proxy pode avaliar claims propagados, mas é preciso garantir origem e integridade. O backend continua necessário para decisões baseadas em objetos, saldos, relacionamentos ou estado de negócio."
  },
  {
    "kind": "paragraph",
    "text": "A adoção gradual deve evitar a crença de que modo permissivo é estado final. Primeiro, inventaria-se o tráfego; depois, habilita-se mTLS e identidade; em seguida, políticas explícitas substituem permissões amplas. A telemetria ajuda a detectar dependências ocultas antes do bloqueio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-06.svg",
    "alt": "Service mesh aplicando identidade e políticas entre workloads",
    "caption": "Figura 6 - A malha reduz confiança implícita entre workloads e permite enforcement próximo ao serviço."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.10 Microsegmentação, egress e proteção de dados",
    "id": "34-10-microsegmentacao-egress-e-protecao-de-dados"
  },
  {
    "kind": "paragraph",
    "text": "Microsegmentação limita caminhos de comunicação para reduzir a superfície de ataque e o raio de impacto. Em APIs, a segmentação pode usar identidade de workload, namespace, domínio, sensibilidade e finalidade, em vez de depender apenas de endereços IP. NetworkPolicies, políticas de mesh, firewalls e gateways internos podem cooperar, desde que ownership e precedência estejam definidos."
  },
  {
    "kind": "paragraph",
    "text": "Egress controlado é parte importante do modelo. Um workload comprometido não deve conseguir acessar qualquer destino da Internet, metadata de nuvem ou serviço interno. Gateways de saída, allowlists por nome e identidade, DNS controlado, proxies e monitoramento ajudam a limitar exfiltração e SSRF. Regras devem considerar resolução, redirects, IPs privados, protocolos e alterações de destino."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust é orientado a recursos e dados. Criptografia em trânsito e em repouso é necessária, mas políticas também precisam controlar minimização, mascaramento, finalidade, retenção e exportação. Uma API que retorna campos desnecessários ou permite paginação ilimitada pode violar menor privilégio mesmo com autenticação forte."
  },
  {
    "kind": "paragraph",
    "text": "Segredos, chaves e certificados devem ter escopo, rotação e trilha de uso. O acesso pode ser mediado por identity-aware proxies, secret stores e managed identities. Credenciais compartilhadas entre serviços impedem atribuição e revogação seletiva, aumentando o raio de impacto de um comprometimento."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Microsegmentação é apenas uma das camadas de uma estratégia orientada ao recurso.",
    "headers": [
      "Camada",
      "Objetivo",
      "Exemplo de controle"
    ],
    "rows": [
      [
        "Rede",
        "Reduzir caminhos possíveis.",
        "NetworkPolicy, firewall e egress gateway."
      ],
      [
        "Identidade",
        "Vincular chamada a sujeito verificável.",
        "mTLS, workload identity e token."
      ],
      [
        "Aplicação",
        "Restringir ação e objeto.",
        "ABAC, ReBAC e autorização por recurso."
      ],
      [
        "Dados",
        "Minimizar exposição e impacto.",
        "Mascaramento, classificação e limites de exportação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.11 Telemetria, risco e resposta adaptativa",
    "id": "34-11-telemetria-risco-e-resposta-adaptativa"
  },
  {
    "kind": "paragraph",
    "text": "Decisões adaptativas dependem de telemetria confiável. IdP, gateway, mesh, endpoint, WAF, SIEM e aplicação produzem sinais que podem indicar anomalia: mudanças de localização, volume incomum, enumeração de objetos, falhas repetidas, device posture degradada, novo certificado ou acesso fora do padrão. Esses sinais precisam ser normalizados, correlacionados e avaliados com latência compatível com o caso de uso."
  },
  {
    "kind": "paragraph",
    "text": "A resposta não precisa ser apenas bloquear. A arquitetura pode exigir MFA, reduzir escopos, limitar taxa, desabilitar exportação, marcar a sessão para revisão ou revogar credenciais. A escolha deve considerar impacto e confiança do detector. Controles excessivamente agressivos sem feedback geram indisponibilidade e incentivam exceções permanentes."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade de Zero Trust precisa registrar decisões, não apenas tráfego. Métricas úteis incluem taxa de allow/deny por política, latência do PDP, cache hit, decisões sem atributos, falhas de propagação, uso de credenciais antigas, cobertura de mTLS, fluxos não inventariados e tempo de revogação. Traces ajudam a identificar qual PEP ou backend tomou a decisão final."
  },
  {
    "kind": "paragraph",
    "text": "Privacidade e segurança dos próprios sinais precisam ser consideradas. Logs de autorização podem conter identificadores, grupos, risco e contexto. A coleta deve ser minimizada, protegida por acesso e retenção, e nunca incluir tokens completos, chaves privadas ou dados sensíveis desnecessários."
  },
  {
    "kind": "subhead",
    "text": "Verificação contínua não é vigilância indiscriminada"
  },
  {
    "kind": "paragraph",
    "text": "A coleta deve ser proporcional, finalística e protegida. Zero Trust exige sinais suficientes para decisões e investigação, mas não justifica registrar credenciais, payloads sensíveis ou atributos sem necessidade operacional."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.12 Disponibilidade e falhas dos componentes de confiança",
    "id": "34-12-disponibilidade-e-falhas-dos-componentes-de-confianca"
  },
  {
    "kind": "paragraph",
    "text": "Uma arquitetura Zero Trust adiciona componentes críticos ao caminho: IdP, JWKS, introspection, PDP, PIP, serviço de risco e infraestrutura de certificados. Cada dependência precisa de SLO, redundância, timeout, cache, fallback e runbook. Uma política segura que torna todas as APIs indisponíveis por falha simples é operacionalmente incompleta."
  },
  {
    "kind": "paragraph",
    "text": "Caching de chaves públicas costuma ser seguro quando respeita rotação e identificadores. Caching de decisões é mais delicado porque atributos e risco podem mudar. O cache deve incluir sujeito, recurso, ação, contexto relevante, versão da política e TTL. Eventos de revogação podem invalidar decisões antes do vencimento."
  },
  {
    "kind": "paragraph",
    "text": "Fail-open pode ser aceitável para operações públicas ou de baixo impacto, desde que o modo degradado seja explícito e monitorado. Fail-closed é apropriado para operações financeiras, administrativas ou de dados sensíveis. Entre os extremos, a organização pode oferecer leitura limitada, congelar alterações ou exigir um canal alternativo."
  },
  {
    "kind": "paragraph",
    "text": "A recuperação precisa ser testada. Rotação de certificados, indisponibilidade do IdP, rollback de policy, perda do cache e mudança de issuer são cenários de continuidade. Exercícios controlados mostram se a equipe consegue distinguir negação legítima de falha de infraestrutura."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Disponibilidade e segurança precisam ser modeladas juntas.",
    "headers": [
      "Dependência",
      "Risco",
      "Estratégia"
    ],
    "rows": [
      [
        "JWKS / PKI",
        "Chave indisponível ou rotação incorreta.",
        "Cache, sobreposição de chaves e monitoramento."
      ],
      [
        "PDP",
        "Latência ou indisponibilidade.",
        "Instâncias locais, timeout e política de degradação."
      ],
      [
        "PIP / risco",
        "Atributo ausente ou desatualizado.",
        "TTL, qualidade do sinal e decisão conservadora."
      ],
      [
        "IdP",
        "Falha de login ou emissão.",
        "Redundância, sessões curtas existentes e plano de continuidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.13 Governança e jornada de maturidade",
    "id": "34-13-governanca-e-jornada-de-maturidade"
  },
  {
    "kind": "paragraph",
    "text": "A adoção de Zero Trust é uma jornada de transformação, não um projeto isolado. Um ponto de partida prático é inventariar recursos, identidades, fluxos e políticas; remover credenciais compartilhadas; centralizar identidade; proteger comunicações; tornar decisões explícitas; e expandir a observabilidade. A ordem exata depende do risco e da capacidade da organização."
  },
  {
    "kind": "paragraph",
    "text": "Modelos de maturidade ajudam a organizar o trabalho em pilares. O CISA Zero Trust Maturity Model 2.0 trabalha com identidade, dispositivos, redes, aplicações e workloads, dados, visibilidade/analytics e automação/orquestração. Para APIs, esses pilares se traduzem em identidade forte, postura, microsegmentação, políticas de gateway, proteção de dados, telemetria e resposta automática."
  },
  {
    "kind": "paragraph",
    "text": "Exceções precisam de owner, justificativa, escopo, prazo e compensações. Policies e atributos devem possuir catálogo, versionamento e evidência de teste. Métricas de maturidade devem medir cobertura e resultado: percentual de APIs inventariadas, tokens de audience restrita, workloads sem credenciais estáticas, tráfego mTLS, políticas explícitas, tempo de revogação e incidentes de acesso indevido."
  },
  {
    "kind": "paragraph",
    "text": "A estratégia deve evitar big bang. Um modo de observação identifica fluxos; políticas são aplicadas a grupos controlados; negações são analisadas; e a cobertura cresce por domínio. Resultados de segurança precisam ser combinados a métricas de latência, disponibilidade e experiência dos consumidores."
  },
  {
    "kind": "subhead",
    "text": "Evolução de maturidade: de controles isolados a decisões adaptativas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-07.svg",
    "alt": "Pilares coordenados da maturidade Zero Trust",
    "caption": "Figura 7 - A maturidade cresce por coordenação entre pilares, não pela otimização isolada de um produto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.14 Troubleshooting e investigação",
    "id": "34-14-troubleshooting-e-investigacao"
  },
  {
    "kind": "paragraph",
    "text": "Uma negação Zero Trust pode nascer em múltiplas camadas: certificado, token, postura, policy, rate limit, mesh ou regra de negócio. O troubleshooting começa identificando o PEP que respondeu, o decision_id e o estágio da falha. O consumidor deve receber uma resposta segura; os detalhes permanecem em logs protegidos."
  },
  {
    "kind": "paragraph",
    "text": "Em autenticação, verifique cadeia de certificados, issuer, audience, assinatura, tempo, nonce e binding. Em autorização, compare sujeito, ação, recurso, contexto, atributos fornecidos e versão da política. Em mesh, confirme identidade de workload, modo mTLS e regra aplicada. Em Kubernetes, valide ServiceAccount, labels, namespace e NetworkPolicy."
  },
  {
    "kind": "paragraph",
    "text": "Relógios incorretos, caches antigos, rotação incompleta, headers removidos, audiences erradas e atributos ausentes produzem incidentes intermitentes. Traces distribuídos devem preservar correlação sem propagar tokens. Quando um PDP externo participa, sua latência e resultado precisam aparecer como span ou evento."
  },
  {
    "kind": "paragraph",
    "text": "A investigação deve evitar desabilitar controles amplos como primeira tentativa. Um bypass temporário precisa ser mínimo, aprovado, monitorado e removido. Caso contrário, a organização transforma troubleshooting em criação de dívida de segurança."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/pt/figure-08.svg",
    "alt": "Investigação seguindo identidade, contexto, política, enforcement e recurso",
    "caption": "Figura 8 - A investigação segue a cadeia de identidade, contexto, política, enforcement e recurso."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - A resposta HTTP é apenas o sintoma final; a evidência precisa localizar a decisão.",
    "headers": [
      "Sintoma",
      "Hipóteses iniciais",
      "Evidência"
    ],
    "rows": [
      [
        "401 após rotação",
        "JWKS antigo, CA incorreta ou clock skew.",
        "kid, cadeia, cache, datas e logs do IdP."
      ],
      [
        "403 apenas em uma rota",
        "Policy/escopo/audience ou autorização de objeto.",
        "decisionid, policyid, claims e recurso."
      ],
      [
        "Falha intermitente",
        "PDP regional, cache, sinal de risco ou propagação.",
        "latência por instância e trace completo."
      ],
      [
        "Serviço interno bloqueado",
        "Identidade de workload ou policy de mesh.",
        "SPIFFE ID, certificado, labels e regra L7."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.15 Estudos de caso e laboratórios",
    "id": "34-15-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - integração B2B: um parceiro utiliza OAuth Client Credentials com mTLS. O access token possui audience específica e escopos mínimos; o gateway valida o certificado e o binding do token; o backend recebe uma identidade interna controlada. A rotação ocorre com sobreposição de certificados e telemetria identifica consumidores ainda presos ao material antigo."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - microsserviços em Kubernetes: workloads recebem identidades curtas e comunicam-se por service mesh com mTLS. Policies permitem apenas os fluxos necessários e NetworkPolicies limitam caminhos de rede. A identidade do usuário final é propagada de forma verificável apenas onde necessária; decisões de objeto permanecem no serviço de domínio."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - operação financeira adaptativa: uma transferência comum é autorizada com sessão MFA válida, dispositivo conforme e limite diário. Quando o risco aumenta, o PDP exige step-up e reduz o valor máximo. O resultado, os sinais e a versão da política são auditados sem registrar o token ou o payload completo."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Modele sujeito, recurso, ação e contexto para três APIs. 2) Implemente uma policy deny-by-default em ambiente de teste. 3) Compare bearer token e DPoP/mTLS. 4) Configure autorização de workload em service mesh. 5) Simule indisponibilidade do PDP e valide o modo degradado. 6) Construa um dashboard de cobertura, decisões e latência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust elimina confiança implícita baseada apenas em rede, propriedade ou autenticação passada. A proteção concentra-se em recursos e decisões explícitas. Em APIs, isso significa identificar sujeitos, classificar dados, validar credenciais, avaliar contexto, aplicar autorização por ação e objeto e observar continuamente o resultado."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways, service meshes e backends exercem papéis complementares de enforcement. mTLS autentica peers; tokens vinculados reduzem replay; RBAC, ABAC e ReBAC expressam políticas; workload identity substitui segredos estáticos; microsegmentação reduz movimento lateral; e telemetria sustenta resposta adaptativa. Nenhum controle isolado implementa Zero Trust."
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura precisa ser disponível, governável e explicável. Policies, atributos e caches possuem ciclo de vida; dependências críticas exigem SLO e fallback; negações devem ser investigáveis; e a adoção precisa avançar gradualmente por risco e domínio. A maturidade é medida pela cobertura e pela redução efetiva do privilégio e do raio de impacto."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aplica os fundamentos de APIs, identidade, segurança e governança ao ecossistema de Open Finance e Open Banking Brasil, no qual confiança federada, consentimento, certificados, padrões de segurança e alta disponibilidade são requisitos centrais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist Zero Trust para APIs",
    "id": "checklist-zero-trust-para-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "APIs, operações, dados, owners e consumidores estão inventariados e classificados.",
      "Nenhuma localização de rede é usada como prova suficiente de autorização.",
      "Usuário, cliente, workload e dispositivo são identidades separadas e correlacionáveis.",
      "Tokens possuem audience, escopo e vida útil mínimos; credenciais estáticas são exceções controladas.",
      "mTLS ou DPoP é aplicado onde a redução de replay justifica o custo operacional.",
      "Policies avaliam sujeito, ação, recurso e contexto e possuem deny-by-default quando apropriado.",
      "PEPs são não contornáveis e os backends mantêm autorização de negócio e de objeto.",
      "Workloads usam identidades curtas; service mesh e NetworkPolicies reduzem movimento lateral.",
      "Egress, segredos, dados e exportações são controlados por finalidade e menor privilégio.",
      "Decisões, policy_id, versão, latência e motivos são observáveis sem registrar segredos.",
      "Falhas de IdP, PDP, PIP, JWKS e PKI possuem modo de degradação e runbook testado.",
      "A jornada de maturidade possui métricas de cobertura, prazo, owner e remoção de exceções."
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
      "Explique por que uma rede privada não deve conceder autorização automática a uma API.",
      "Mapeie Policy Engine, Policy Administrator e PEP em uma arquitetura com gateway e service mesh.",
      "Diferencie identidade do usuário, aplicação, workload e dispositivo em uma única chamada.",
      "Compare bearer token, OAuth mTLS e DPoP do ponto de vista de replay e operação.",
      "Projete uma policy ABAC para consulta e alteração de dados financeiros.",
      "Defina comportamento fail-open, fail-closed e degradado para três classes de operação.",
      "Proponha microsegmentação e egress controlado para uma API em Kubernetes.",
      "Descreva quais sinais devem ser registrados para explicar uma decisão de acesso.",
      "Monte um plano de migração de credenciais estáticas para workload identity.",
      "Defina indicadores de maturidade Zero Trust para uma plataforma corporativa de APIs."
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
        "Continuous verification",
        "Uso recorrente de sinais atuais para manter, limitar ou revogar acesso."
      ],
      [
        "Deny-by-default",
        "Postura em que acessos não explicitamente permitidos são negados."
      ],
      [
        "DPoP",
        "Mecanismo OAuth de prova de posse no nível da aplicação."
      ],
      [
        "Fail-closed",
        "Comportamento que nega acesso quando a decisão segura não pode ser obtida."
      ],
      [
        "Fail-open",
        "Comportamento que permite acesso em falha, aplicável apenas a riscos explicitamente aceitos."
      ],
      [
        "Microsegmentação",
        "Restrição granular dos caminhos de comunicação para reduzir movimento lateral."
      ],
      [
        "PAP",
        "Ponto responsável por administração e ciclo de vida de políticas."
      ],
      [
        "PDP",
        "Componente que avalia a política e produz uma decisão de autorização."
      ],
      [
        "PEP",
        "Componente que aplica a decisão de acesso ao tráfego ou recurso."
      ],
      [
        "PIP",
        "Fonte de atributos e contexto usados pela decisão."
      ],
      [
        "Policy Administrator",
        "Componente que executa a decisão do Policy Engine e estabelece ou encerra acesso."
      ],
      [
        "Policy Engine",
        "Componente lógico que decide conceder, negar ou revogar acesso."
      ],
      [
        "Sender-constrained token",
        "Token cujo uso exige prova da posse de uma chave vinculada."
      ],
      [
        "Step-up authentication",
        "Exigência de autenticação mais forte para ação ou risco elevado."
      ],
      [
        "Workload identity",
        "Identidade atribuída a software, serviço ou instância de execução."
      ],
      [
        "Zero Trust Architecture",
        "Arquitetura que elimina confiança implícita e protege recursos com decisões explícitas."
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
      "NIST SP 800-207 - Zero Trust Architecture. 2020.",
      "NIST SP 800-207A - A Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Location Environments. 2023.",
      "CISA - Zero Trust Maturity Model, Version 2.0. 2023.",
      "NIST SP 800-204B - Attribute-based Access Control for Microservices-based Applications Using a Service Mesh. 2021.",
      "NIST SP 800-204C - Implementation of DevSecOps for a Microservices-based Application with a Service Mesh. 2022.",
      "IETF RFC 6750 - OAuth 2.0 Bearer Token Usage.",
      "IETF RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens.",
      "IETF RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession at the Application Layer (DPoP).",
      "OpenID Foundation - OpenID Connect Core e especificações relacionadas.",
      "SPIFFE Project - SPIFFE e SPIRE specifications and documentation.",
      "Kubernetes Documentation - Service Accounts, RBAC, Network Policies e Pod Security.",
      "Istio Documentation - Security, PeerAuthentication e AuthorizationPolicy."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust é uma estratégia evolutiva e depende da versão dos produtos, do modelo de ameaça e do contexto regulatório. Antes de aplicar os exemplos, valide as especificações oficiais, o suporte do gateway, da malha, do provedor de identidade e da plataforma implantada."
  }
];
