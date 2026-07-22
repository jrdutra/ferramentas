import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const AZURE_APIM_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Da publicação no Azure ao enforcement distribuído no gateway"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/pt/overview.svg",
    "alt": "Management plane, managed gateway, developer portal, self-hosted gateway e observabilidade no APIM",
    "caption": "Figura de abertura - O APIM reúne plano de gerenciamento, gateways e experiência de consumo sob uma plataforma única."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "APIM separa governança, publicação e operação do tráfego, mas cada decisão de tier e rede muda capacidades e limites."
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
    "text": "O capítulo anterior estudou a arquitetura do Axway API Gateway, separando design, domínio administrativo, instâncias de runtime, persistência e operação. O Azure API Management, conhecido como APIM, resolve um conjunto semelhante de problemas em um modelo de serviço gerenciado no Azure. Ele combina um plano de gerenciamento exposto por portal e APIs, um gateway responsável pelo tráfego, recursos de publicação e um portal para consumidores."
  },
  {
    "kind": "paragraph",
    "text": "A característica gerenciada reduz tarefas de instalação e manutenção do produto, mas não elimina decisões arquiteturais. Escolher tier, topologia de rede, capacidade, região, modelo de identidade, políticas, certificados, developer portal e estratégia de alta disponibilidade continua sendo responsabilidade da organização. A nuvem abstrai parte da infraestrutura; ela não substitui desenho, governança e troubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "O APIM também evoluiu para cenários híbridos e federados. Além do gateway gerenciado, a plataforma oferece self-hosted gateway para execução em containers fora do serviço gerenciado e workspaces para descentralizar a administração de APIs em uma infraestrutura compartilhada. Como a disponibilidade desses recursos varia conforme tier, gateway e região, decisões devem ser verificadas na documentação oficial e na matriz de recursos vigente."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo constrói um modelo mental completo: componentes, objetos de configuração, processamento de policies, importação de contratos, segurança, redes, escalabilidade, observabilidade, automação e falhas recorrentes. O objetivo não é ensinar apenas cliques no portal, mas permitir que o leitor raciocine sobre o comportamento do runtime e projete uma plataforma corporativa sustentável."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Separe sempre três perguntas: o que pertence ao plano de gerenciamento, o que é executado pelo gateway no caminho da requisição e o que pertence ao ecossistema do consumidor. Depois, identifique em qual tier e tipo de gateway a funcionalidade está disponível."
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
      "Explicar a arquitetura lógica do Azure API Management e seus principais componentes.",
      "Distinguir management plane, managed gateway, self-hosted gateway, workspace gateway e developer portal.",
      "Compreender o modelo de APIs, operações, backends, products, subscriptions, users e groups.",
      "Explicar seções, escopos, herança e ordem de execução das policies.",
      "Projetar autenticação, mTLS, certificados, managed identities e integração com Microsoft Entra ID.",
      "Comparar conectividade pública, VNet, private endpoint e topologias híbridas.",
      "Planejar scale units, zonas de disponibilidade, multi-região e recuperação.",
      "Aplicar observabilidade com Azure Monitor, Application Insights, logs e tracing.",
      "Automatizar configuração com ARM, Bicep, Terraform, REST, CLI e pipelines.",
      "Diagnosticar falhas de policy, rede, certificado, backend, capacidade e publicação."
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
      "24.1 Posicionamento e arquitetura lógica",
      "24.2 Management plane, gateway e developer portal",
      "24.3 Tiers, gateways e critérios de escolha",
      "24.4 Modelo de recursos do APIM",
      "24.5 Importação e publicação de APIs",
      "24.6 Policies: seções, ordem e contexto",
      "24.7 Escopos, herança e base",
      "24.8 Named values e policy expressions",
      "24.9 Identidade, subscriptions e autorização",
      "24.10 TLS, mTLS, certificados e Key Vault",
      "24.11 Redes, VNet, Private Link e backends privados",
      "24.12 Alta disponibilidade, zonas e multi-região",
      "24.13 Backends, resiliência, cache e limites",
      "24.14 Workspaces e governança federada",
      "24.15 Developer portal, products e onboarding",
      "24.16 Observabilidade e troubleshooting",
      "24.17 Automação, CI/CD e infraestrutura como código",
      "24.18 Segurança, hardening e estudos de caso",
      "Resumo, checklist, laboratórios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.1 Posicionamento e arquitetura lógica",
    "id": "24-1-posicionamento-e-arquitetura-logica"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management é uma plataforma de gerenciamento de APIs que recebe tráfego por meio de um gateway, aplica policies e encaminha a chamada para um backend. Em torno desse runtime, a plataforma oferece cadastro e importação de APIs, produtos, assinaturas, usuários, grupos, analytics, developer portal e interfaces administrativas. O serviço não hospeda necessariamente a lógica de negócio: ele cria uma fachada governada diante de backends que podem estar no Azure, em datacenters, em outras nuvens ou em serviços SaaS."
  },
  {
    "kind": "paragraph",
    "text": "O gateway é o data plane. Ele termina conexões, seleciona API e operação, executa policies, chama o backend e processa a resposta. O management plane é usado para criar ou alterar a configuração por Azure portal, REST, ARM, Bicep, Terraform, PowerShell ou CLI. O developer portal organiza descoberta, documentação, teste e onboarding. Essa separação permite que a configuração seja administrada centralmente enquanto o tráfego é executado em gateways gerenciados ou distribuídos."
  },
  {
    "kind": "paragraph",
    "text": "O modelo mental mais importante é não confundir o recurso Azure com o endpoint de tráfego. Uma instância APIM possui recursos administrativos, endpoints de gateway e, conforme configuração, portal, management API e outros hostnames. DNS, certificados, firewall e monitoramento podem ser diferentes para cada endpoint. Uma falha no portal administrativo não significa automaticamente falha no gateway, e o inverso também é verdadeiro."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/pt/figure-01-logical-architecture.svg",
    "alt": "Consumidores, gateway, backends, management plane e developer portal no Azure API Management",
    "caption": "Figura 1 - O gateway fica no caminho do tráfego; management plane e portal possuem responsabilidades diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Componentes devem ser monitorados e protegidos conforme sua função.",
    "headers": [
      "Componente",
      "Responsabilidade",
      "Evidência típica"
    ],
    "rows": [
      [
        "Management plane",
        "Provisionar e configurar o serviço.",
        "Activity Log, deployments, API administrativa."
      ],
      [
        "Managed gateway",
        "Executar policies e encaminhar chamadas.",
        "Gateway logs, métricas e traces."
      ],
      [
        "Self-hosted gateway",
        "Executar data plane em container fora do serviço gerenciado.",
        "Logs locais e telemetria enviada ao Azure."
      ],
      [
        "Workspace gateway",
        "Runtime associado a um workspace.",
        "Métricas e configuração do workspace."
      ],
      [
        "Developer portal",
        "Documentação, produtos, inscrição e teste.",
        "Publicação, conteúdo e identidade do portal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.2 Management plane, gateway e developer portal",
    "id": "24-2-management-plane-gateway-e-developer-portal"
  },
  {
    "kind": "paragraph",
    "text": "O management plane armazena e distribui a configuração do serviço: APIs, operations, policies, backends, named values, certificados, products, subscriptions e diagnósticos. Alterações são realizadas como operações de gerenciamento do Azure e podem levar algum tempo para chegar a todos os runtimes. Isso significa que deploy concluído e propagação total não são exatamente o mesmo evento. Pipelines devem incluir validação pós-deploy e testes sintéticos."
  },
  {
    "kind": "paragraph",
    "text": "O managed gateway é operado pela Microsoft e processa o tráfego conforme o tier e a topologia. Ele deve ser tratado como um componente distribuído: scale units, regiões e zonas afetam capacidade e resiliência. O gateway possui um endpoint de health que pode ser usado por monitoramento e por validações de disponibilidade. Contudo, um health check de plataforma não substitui uma transação sintética que exercite DNS, TLS, policy, identidade e backend."
  },
  {
    "kind": "paragraph",
    "text": "O developer portal é uma aplicação separada da API em si. Ele permite que consumidores descubram APIs agrupadas em products, leiam documentação, testem operações e solicitem subscriptions. A experiência do portal depende de publicação de conteúdo, identidades permitidas, configuração de CORS e disponibilidade do gateway. Em ambientes regulados, deve-se revisar cuidadosamente o que é exibido, quais exemplos contêm dados e como usuários externos são convidados ou removidos."
  },
  {
    "kind": "subhead",
    "text": "Separação operacional"
  },
  {
    "kind": "paragraph",
    "text": "Uma indisponibilidade do management plane pode impedir mudanças sem derrubar imediatamente o tráfego existente. Já uma falha no gateway afeta consumidores mesmo que o portal e o Azure Resource Manager estejam acessíveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.3 Tiers, gateways e critérios de escolha",
    "id": "24-3-tiers-gateways-e-criterios-de-escolha"
  },
  {
    "kind": "paragraph",
    "text": "O APIM possui famílias de tiers com características diferentes de capacidade, rede, escala, alta disponibilidade e recursos de governança. A família clássica inclui Developer, Basic, Standard e Premium, além do modelo Consumption. A família v2 moderniza opções de Basic, Standard e Premium. Como a disponibilidade de features varia e muda ao longo do tempo, a arquitetura deve usar a matriz oficial como fonte de verdade, e não suposições baseadas apenas no nome do tier."
  },
  {
    "kind": "paragraph",
    "text": "O tier Developer é voltado a cenários não produtivos e não deve ser escolhido como base de disponibilidade. Tiers de produção precisam ser selecionados de acordo com throughput, SLA, conectividade privada, zonas, multi-região, workspaces, self-hosted gateway e requisitos de compliance. Consumption utiliza um modelo serverless apropriado a cargas específicas, mas tem diferenças operacionais e de funcionalidade que precisam ser avaliadas."
  },
  {
    "kind": "paragraph",
    "text": "O self-hosted gateway é um container associado a uma instância APIM, executado em infraestrutura do cliente, como Kubernetes, OpenShift, on-premises ou outra nuvem. Ele mantém o gerenciamento central no Azure e aproxima o data plane dos backends ou consumidores. Essa arquitetura exige conectividade de saída para sincronização de configuração e, quando habilitado, envio de telemetria. Também exige responsabilidade local por capacidade, atualização, segurança e disponibilidade do container."
  },
  {
    "kind": "paragraph",
    "text": "Workspaces permitem delegar administração e produto de APIs a equipes, mantendo infraestrutura compartilhada. Eles possuem recursos e gateways próprios dentro do modelo suportado. Workspaces não são apenas pastas: introduzem limites de administração, ownership e runtime que precisam ser incorporados ao desenho de governança."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - O tipo de gateway muda o modelo operacional e de responsabilidade.",
    "headers": [
      "Opção",
      "Uso típico",
      "Responsabilidade crítica"
    ],
    "rows": [
      [
        "Managed gateway",
        "Exposição gerenciada no Azure.",
        "Escolher tier, escala, rede e regiões."
      ],
      [
        "Self-hosted gateway",
        "On-prem, multicloud e proximidade de backend.",
        "Operar container, capacidade e conectividade."
      ],
      [
        "Workspace gateway",
        "Runtime de equipe em governança federada.",
        "Definir ownership e limites do workspace."
      ],
      [
        "Consumption",
        "Carga elástica e modelo de consumo.",
        "Validar limitações e comportamento de escala."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.4 Modelo de recursos do APIM",
    "id": "24-4-modelo-de-recursos-do-apim"
  },
  {
    "kind": "paragraph",
    "text": "Uma API no APIM é uma fachada administrada. Ela possui nome, display name, path, protocols, subscription requirements e operações. Cada operation define método e template de URL, podendo possuir parâmetros, representações e policies próprias. O backend identifica o destino real e pode encapsular URL, credenciais, circuit breaker, pool ou outras propriedades conforme os recursos disponíveis."
  },
  {
    "kind": "paragraph",
    "text": "Products agrupam APIs e definem uma unidade de consumo. Um produto pode exigir subscription, possuir termos e associar quotas ou políticas. Subscriptions geram credenciais de acesso, normalmente uma primary key e uma secondary key, que facilitam rotação. Users e groups controlam quem acessa products pelo portal. Esse modelo é útil para onboarding, mas não deve ser confundido com autorização fina de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Named values armazenam parâmetros reutilizáveis nas policies. Eles podem conter valores simples, secretos ou referências a Key Vault, dependendo da configuração. Certificates representam certificados usados em hostnames, validação de cliente ou autenticação de backend. Loggers e diagnostics conectam o gateway a destinos de observabilidade. O desenho deve tratar esses recursos como código e manter ownership, nomenclatura e ciclo de vida."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Recursos administrativos possuem responsabilidades distintas.",
    "headers": [
      "Objeto",
      "Função",
      "Erro comum"
    ],
    "rows": [
      [
        "API",
        "Agrupar operações sob uma fachada.",
        "Misturar domínios e ciclos de vida incompatíveis."
      ],
      [
        "Operation",
        "Definir método e rota lógica.",
        "Templates ambíguos ou sem governança."
      ],
      [
        "Backend",
        "Representar o destino e sua configuração.",
        "Duplicar URL e credenciais em policies."
      ],
      [
        "Product",
        "Empacotar APIs para consumo.",
        "Usar product como autorização de negócio."
      ],
      [
        "Subscription",
        "Identificar consumo e fornecer chave.",
        "Compartilhar chave entre aplicações."
      ],
      [
        "Named value",
        "Parametrizar policies e segredos.",
        "Gravar segredo diretamente no XML."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.5 Importação e publicação de APIs",
    "id": "24-5-importacao-e-publicacao-de-apis"
  },
  {
    "kind": "paragraph",
    "text": "O APIM pode criar ou importar APIs a partir de fontes como OpenAPI, WSDL, OData, serviços de computação do Azure, WebSocket, GraphQL e backends gRPC, conforme suporte atual do serviço e do tier. A importação acelera o cadastro, mas não transforma automaticamente um contrato frágil em uma API governada. Paths, operation IDs, schemas, segurança, servers, exemplos e descrições precisam ser revisados antes da publicação."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI é a opção mais comum para APIs HTTP. O processo de importação cria operações e metadados, mas determinadas extensões, limites e versões da especificação podem ter restrições. Para SOAP, um WSDL pode ser importado como pass-through ou usado em cenários de conversão para REST. GraphQL e WebSocket possuem modelos próprios e policies aplicáveis de forma diferente. O pipeline deve validar o tipo de API e testar o comportamento real no gateway."
  },
  {
    "kind": "paragraph",
    "text": "Publicar uma API envolve mais que importá-la. É necessário configurar base URL, backend, policies, segurança, product, subscription, documentação, versioning, revision e observabilidade. Revisões permitem testar alterações sob a mesma versão pública; versões representam interfaces distintas para consumidores. A promoção deve ser automatizada e acompanhada de smoke tests."
  },
  {
    "kind": "subhead",
    "text": "Pipeline conceitual - publicação de API no APIM"
  },
  {
    "kind": "code",
    "text": "# Fluxo conceitual de publicação\nContrato validado\n  -> importação ou atualização da API\n  -> configuração de backend e named values\n  -> aplicação de policies por escopo\n  -> associação a product\n  -> testes no gateway\n  -> publicação no developer portal\n  -> observabilidade e rollout"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.6 Policies: seções, ordem e contexto",
    "id": "24-6-policies-secoes-ordem-e-contexto"
  },
  {
    "kind": "paragraph",
    "text": "Policies são documentos XML executados pelo gateway. A configuração é dividida em inbound, backend, outbound e on-error. Inbound processa a requisição antes do encaminhamento: autenticação, rate limit, rewrite, validação e transformação são exemplos comuns. Backend controla a interação com o destino, incluindo encaminhamento e retries. Outbound processa a resposta. On-error é executada quando ocorre falha e permite padronizar erro, registrar telemetria ou implementar caminhos controlados."
  },
  {
    "kind": "paragraph",
    "text": "A ordem das statements é semântica. Uma validação de JWT executada depois de um send-request sensível não protege a chamada já realizada. Um rewrite antes da seleção correta de operation pode alterar o contexto. Um return-response interrompe a execução e produz resposta imediata. Se uma falha ocorrer, etapas restantes das seções normais são ignoradas e a execução passa para on-error."
  },
  {
    "kind": "paragraph",
    "text": "Policy expressions usam C# limitado para avaliar contexto, headers, variáveis e resultados. Elas são poderosas e podem introduzir lógica complexa. O gateway não deve se transformar em uma aplicação monolítica escrita em XML. Policies precisam permanecer curtas, testáveis e focadas em concerns transversais. Lógica de negócio extensa pertence ao backend ou a um componente específico."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/pt/figure-02-policy-pipeline.svg",
    "alt": "Pipeline inbound, backend, outbound e on-error do APIM",
    "caption": "Figura 2 - O gateway executa statements em sequência e desvia para on-error quando ocorre uma falha."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado - policy XML\n<policies>\n  <inbound>\n    <base />\n    <set-variable name=\"correlationId\"\n                  value=\"@(context.Request.Headers.GetValueOrDefault(\"x-correlation-id\", Guid.NewGuid().ToString()))\" />\n    <validate-jwt header-name=\"Authorization\" failed-validation-httpcode=\"401\">\n      <openid-config url=\"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration\" />\n    </validate-jwt>\n  </inbound>\n  <backend>\n    <base />\n    <forward-request timeout=\"30\" />\n  </backend>\n  <outbound><base /></outbound>\n  <on-error><base /></on-error>\n</policies>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.7 Escopos, herança e base",
    "id": "24-7-escopos-heranca-e-base"
  },
  {
    "kind": "paragraph",
    "text": "Policies podem ser aplicadas em escopos como global, workspace, product, API e operation, conforme o recurso e o tipo de gateway. A composição permite impor controles gerais e especializar regras próximas da operação. O elemento base inclui as policies herdadas do escopo superior. O local onde base é colocado define quando a cadeia herdada executa em relação às statements do escopo atual."
  },
  {
    "kind": "paragraph",
    "text": "Omitir base pode quebrar herança e permitir que uma API deixe de receber autenticação, logging ou limites definidos globalmente. Por outro lado, herdar cegamente todas as policies pode produzir duplicação, ordem incorreta ou impacto inesperado. Governança madura define quais controles são obrigatórios e como exceções são aprovadas."
  },
  {
    "kind": "paragraph",
    "text": "O escopo product deve ser usado com cuidado porque uma API pode estar associada a múltiplos products ou ser chamada por subscription em escopo diferente. A autorização de negócio não deve depender apenas da presença em um produto. Global e workspace ajudam a implementar baseline, enquanto API e operation especializam comportamento. Cada policy deve declarar o escopo esperado e suas dependências."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Escopo define alcance e risco de uma mudança de policy.",
    "headers": [
      "Escopo",
      "Aplicação típica",
      "Cuidado"
    ],
    "rows": [
      [
        "Global",
        "Baseline de segurança e observabilidade.",
        "Blast radius amplo."
      ],
      [
        "Workspace",
        "Regras comuns a uma equipe federada.",
        "Coerência com baseline central."
      ],
      [
        "Product",
        "Limites e regras de consumo.",
        "Associação múltipla e subscription."
      ],
      [
        "API",
        "Contrato e backend de uma API.",
        "Não duplicar policy global."
      ],
      [
        "Operation",
        "Exceção ou semântica específica.",
        "Evitar fragmentação excessiva."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.8 Named values e policy expressions",
    "id": "24-8-named-values-e-policy-expressions"
  },
  {
    "kind": "paragraph",
    "text": "Named values permitem substituir literais repetidos por nomes administrados, como URLs, audiences, timeouts, flags e chaves. Valores secretos podem ser protegidos e referências a Azure Key Vault reduzem a necessidade de armazenar material sensível no APIM. Ainda assim, a política de acesso ao Key Vault, a managed identity e a conectividade precisam ser monitoradas. Referência externa não elimina dependência operacional."
  },
  {
    "kind": "paragraph",
    "text": "Policy expressions acessam context.Request, context.Response, context.Api, context.Operation, context.Subscription e variáveis. Elas podem processar strings, datas, JSON, certificados e claims dentro do conjunto permitido. Como erros em expressions ocorrem no runtime, pipelines devem testar caminhos positivos, negativos e valores ausentes. Uso de GetValueOrDefault é preferível quando um header pode não existir."
  },
  {
    "kind": "paragraph",
    "text": "Fragments de policy permitem reutilização, mas precisam de versionamento e ownership. Uma mudança em fragmento compartilhado pode afetar muitas APIs. Recomenda-se manter catálogo, testes unitários ou funcionais, revisão por pares e rollout progressivo. Named values devem ter nomes estáveis e não incorporar o ambiente de forma confusa."
  },
  {
    "kind": "subhead",
    "text": "Segredo não é configuração comum"
  },
  {
    "kind": "paragraph",
    "text": "Nunca registre chaves, tokens, senhas ou certificados diretamente em policy, repositório ou trace. Use named values secretos, Key Vault, managed identities e mascaramento de logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.9 Identidade, subscriptions e autorização",
    "id": "24-9-identidade-subscriptions-e-autorizacao"
  },
  {
    "kind": "paragraph",
    "text": "O APIM pode exigir subscription keys, validar JWTs, autenticar clientes por certificado, usar Basic em integrações legadas e obter tokens para backends. Subscription key identifica uma assinatura e habilita quotas ou analytics, mas não substitui identidade forte do usuário nem autorização de negócio. Chaves devem ser separadas por aplicação, rotacionadas e protegidas contra vazamento."
  },
  {
    "kind": "paragraph",
    "text": "validate-jwt e validate-azure-ad-token são usados para validar tokens conforme issuer, audience, assinatura e claims. A policy deve verificar os elementos exigidos pelo contrato, não apenas aceitar qualquer token emitido por um tenant. Depois da validação, claims podem ser usados para decisões simples ou enviados a um PDP externo. Autorizações complexas devem evitar listas extensas codificadas em XML."
  },
  {
    "kind": "paragraph",
    "text": "Managed identity permite ao gateway obter access tokens do Microsoft Entra ID para acessar backends e recursos protegidos sem armazenar client secrets. A policy authentication-managed-identity solicita e mantém o token em cache até sua expiração. É necessário conceder permissões à identidade correta e garantir conectividade ao recurso. Em ambientes com user-assigned identities, o desenho deve documentar qual identidade cada backend utiliza."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Os mecanismos podem ser combinados; eles resolvem problemas diferentes.",
    "headers": [
      "Mecanismo",
      "O que prova",
      "Uso adequado"
    ],
    "rows": [
      [
        "Subscription key",
        "Posse de uma chave de assinatura.",
        "Medição, onboarding e acesso básico."
      ],
      [
        "JWT/OAuth",
        "Token emitido e claims validados.",
        "APIs de usuário ou aplicação."
      ],
      [
        "Client certificate",
        "Posse da chave privada associada.",
        "mTLS e parceiros B2B."
      ],
      [
        "Managed identity",
        "Identidade Azure do APIM.",
        "Autenticação do gateway no backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.10 TLS, mTLS, certificados e Key Vault",
    "id": "24-10-tls-mtls-certificados-e-key-vault"
  },
  {
    "kind": "paragraph",
    "text": "O gateway termina TLS no hostname publicado. Custom domains permitem usar nomes corporativos e certificados próprios. Azure Key Vault é recomendado para gerenciar certificados de hostname e facilitar renovação, desde que a managed identity tenha acesso e a referência permaneça válida. A operação precisa monitorar expiração, cadeia, nome, versão do segredo e atualização no APIM."
  },
  {
    "kind": "paragraph",
    "text": "mTLS pode ser aplicado na entrada para autenticar consumidores por certificado e na saída para autenticar o APIM diante do backend. Na entrada, o gateway precisa negociar e validar o certificado conforme a topologia. Proxies anteriores podem alterar a forma de apresentação do certificado e precisam ser considerados. Na saída, o certificado cliente é associado ou referenciado por policy e deve conter chave privada utilizável."
  },
  {
    "kind": "paragraph",
    "text": "Certificados autoassinados ou cadeias privadas exigem instalação e confiança explícita. O troubleshooting deve separar falha de negociação TLS, falha de cadeia, mismatch de hostname, expiração e rejeição da policy. Renovação de certificado sem teste pode causar indisponibilidade quando o novo material não contém a cadeia ou o formato esperado."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - certificados em policy"
  },
  {
    "kind": "code",
    "text": "<authentication-certificate thumbprint=\"{{backend-client-cert-thumbprint}}\" />\n<!-- Validação simplificada de certificado de cliente -->\n<choose>\n  <when condition=\"@(context.Request.Certificate == null)\">\n    <return-response>\n      <set-status code=\"401\" reason=\"Client certificate required\" />\n    </return-response>\n  </when>\n</choose>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.11 Redes, VNet, Private Link e backends privados",
    "id": "24-11-redes-vnet-private-link-e-backends-privados"
  },
  {
    "kind": "paragraph",
    "text": "Arquitetura de rede do APIM precisa distinguir acesso de entrada ao gateway e conectividade de saída até o backend. Um private endpoint cria uma entrada privada para o endpoint do gateway por Azure Private Link. Ele não fornece, por si só, rota privada do APIM até os backends. Para alcançar serviços privados, o gateway precisa de conectividade de saída compatível com o tier, como integração ou injeção em VNet, peering, DNS privado e rotas adequadas."
  },
  {
    "kind": "paragraph",
    "text": "Nos tiers clássicos que suportam VNet, external mode mantém o gateway acessível externamente enquanto permite alcançar recursos da rede; internal mode publica endpoints na rede virtual e exige uma camada anterior ou acesso privado. Nos tiers v2, modelos de integração e private endpoint possuem características próprias. Como diferenças são significativas, a escolha precisa ser validada na documentação da família de tier adotada."
  },
  {
    "kind": "paragraph",
    "text": "DNS é uma dependência frequente. O gateway precisa resolver hostnames de backend, endpoints de identidade, Key Vault e serviços de telemetria. Um private endpoint sem zona DNS privada correta pode resolver para endereço público. UDRs, NSGs, firewalls e inspeção TLS podem bloquear chamadas de controle ou de dados. Testes devem registrar origem, destino, resolução e rota efetiva."
  },
  {
    "kind": "paragraph",
    "text": "Em março de 2026, a Microsoft retirou o mecanismo de trusted service connectivity do gateway para determinados serviços Azure no data plane. Arquiteturas que dependiam desse bypass precisam usar conectividade de rede explícita. Essa mudança reforça um princípio geral: conectividade implícita e exceções de firewall devem ser tratadas como dependências versionadas e monitoradas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/pt/figure-03-private-network.svg",
    "alt": "Entrada privada no APIM e acesso privado aos backends",
    "caption": "Figura 3 - Entrada privada e acesso privado ao backend são problemas de rede diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Diagnóstico de rede precisa observar o ponto real de execução.",
    "headers": [
      "Sintoma",
      "Verificação"
    ],
    "rows": [
      [
        "Gateway responde, backend dá timeout",
        "DNS do backend, rota de saída, NSG, firewall e porta."
      ],
      [
        "Private endpoint existe, mas acesso usa IP público",
        "Zona DNS privada, vínculo de VNet e cache."
      ],
      [
        "Funciona no portal, falha no gateway",
        "Origem de rede e identidade são diferentes."
      ],
      [
        "Custom domain não atualiza",
        "Acesso ao Key Vault, managed identity e versão do certificado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.12 Alta disponibilidade, zonas e multi-região",
    "id": "24-12-alta-disponibilidade-zonas-e-multi-regiao"
  },
  {
    "kind": "paragraph",
    "text": "Escala no APIM é expressa por unidades, capacidade do tier e, em alguns modelos, comportamento elástico. Adicionar unidades aumenta capacidade e pode contribuir para redundância. A métrica Capacity deve ser interpretada junto com latência, requests, CPU lógica, políticas pesadas e dependências de backend. Teste de carga é indispensável porque throughput varia conforme payload, TLS, policy e cache."
  },
  {
    "kind": "paragraph",
    "text": "Availability zones protegem contra falha de zona nas regiões e tiers compatíveis. A recomendação de redundância deve considerar quantidade mínima de unidades e distribuição automática ou configurada conforme o serviço. Zonas não protegem contra falha regional, erro de configuração global ou backend indisponível. Multi-region adiciona gateways regionais a uma instância e pode reduzir latência e melhorar resiliência, mas exige desenho de roteamento, certificados, backends e dados compartilhados."
  },
  {
    "kind": "paragraph",
    "text": "Uma implantação multi-região precisa decidir como o consumidor escolhe a região, normalmente com DNS ou serviço global de entrada. Policies e configuração são distribuídas, mas backends podem ter topologias diferentes. Named values e rotas regionais precisam ser explícitos. Failover deve ser testado, incluindo a possibilidade de uma região do APIM estar saudável enquanto o backend regional está indisponível."
  },
  {
    "kind": "paragraph",
    "text": "Self-hosted gateways acrescentam outra dimensão: podem manter processamento próximo ao backend mesmo quando a conectividade de baixa latência com Azure está degradada, dentro dos limites de sincronização e funcionamento suportados. A organização é responsável por réplicas, probes, atualização e recursos do cluster."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/pt/figure-04-availability.svg",
    "alt": "Scale units, availability zones, multi-region e self-hosted gateway",
    "caption": "Figura 4 - Capacidade, zona, região e gateway híbrido resolvem classes diferentes de falha."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.13 Backends, resiliência, cache e limites",
    "id": "24-13-backends-resiliencia-cache-e-limites"
  },
  {
    "kind": "paragraph",
    "text": "Backends devem ser definidos como recursos reutilizáveis quando múltiplas APIs compartilham destino, credenciais ou parâmetros. Policies como set-backend-service selecionam o backend. Retries precisam ser usados com critério: repetir uma operação não idempotente pode duplicar efeito. O retry do APIM executa policies filhas conforme condição e contagem; ele não torna a operação segura automaticamente."
  },
  {
    "kind": "paragraph",
    "text": "Timeouts precisam formar um orçamento ponta a ponta. O timeout do consumidor deve ser maior que o necessário para gateway e backend, mas não tão alto a ponto de manter recursos indefinidamente. Chamada auxiliar por send-request também consome tempo. Circuit breaker e pools de backend, quando disponíveis no modelo adotado, ajudam a conter falhas, mas precisam de thresholds e observabilidade coerentes."
  },
  {
    "kind": "paragraph",
    "text": "Cache pode reduzir latência e carga, porém somente respostas adequadas devem ser armazenadas. Dados personalizados, tokens, headers sensíveis e variações por usuário exigem chaves e regras corretas. Rate limit controla rajadas ou taxa por janela; quota controla volume acumulado. Policies podem usar subscription, IP, claim ou outra chave, mas cardinalidade e distribuição precisam ser avaliadas."
  },
  {
    "kind": "paragraph",
    "text": "O gateway não deve compensar indefinidamente um backend mal dimensionado. Retries, cache e throttling são controles de resiliência, não substitutos de capacidade e correção. Uma policy agressiva pode amplificar falhas: retries sincronizados aumentam carga, payload logging consome recursos e transformações extensas elevam latência."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Resiliência precisa considerar semântica e comportamento em falha.",
    "headers": [
      "Controle",
      "Benefício",
      "Risco"
    ],
    "rows": [
      [
        "Retry",
        "Recuperar falha transitória.",
        "Duplicidade e tempestade de retries."
      ],
      [
        "Cache",
        "Reduzir latência e carga.",
        "Vazamento ou resposta desatualizada."
      ],
      [
        "Rate limit",
        "Conter taxa em janela curta.",
        "Chave incorreta agrupa consumidores."
      ],
      [
        "Quota",
        "Controlar consumo acumulado.",
        "Bloqueio inesperado por período."
      ],
      [
        "Timeout",
        "Limitar espera e recursos.",
        "Cortes prematuros ou conexões presas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.14 Workspaces e governança federada",
    "id": "24-14-workspaces-e-governanca-federada"
  },
  {
    "kind": "paragraph",
    "text": "Workspaces foram criados para permitir que equipes descentralizadas administrem e publiquem APIs em uma infraestrutura APIM compartilhada. Um workspace contém APIs, products, subscriptions e outros recursos suportados, com acesso administrativo separado e gateway associado. Isso permite um modelo federado: a plataforma central opera infraestrutura e baseline; equipes de domínio controlam o ciclo de vida de suas APIs."
  },
  {
    "kind": "paragraph",
    "text": "O benefício vem acompanhado de novas fronteiras. Policies globais, de workspace e locais precisam compor-se sem bypass. Naming, tags, ownership, diagnósticos, custos e limites devem ser padronizados. Equipes não devem receber permissões no serviço inteiro quando apenas um workspace é necessário. Ao mesmo tempo, a plataforma precisa evitar centralização excessiva que transforme cada mudança em fila operacional."
  },
  {
    "kind": "paragraph",
    "text": "Workspaces não significam isolamento físico completo. Dependendo do tier e do gateway, recursos de infraestrutura e limites podem ser compartilhados. A avaliação de compliance deve verificar data plane, logs, identidades, rede e blast radius. A feature evolui rapidamente e sua matriz precisa ser revisada antes de compromissos arquiteturais."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Federação exige responsabilidades explícitas.",
    "headers": [
      "Responsável",
      "Funções sugeridas"
    ],
    "rows": [
      [
        "Plataforma central",
        "Landing zone, tier, rede, identidade, baseline, observabilidade e guardrails."
      ],
      [
        "Equipe de domínio",
        "Contratos, backends, policies específicas, products e suporte funcional."
      ],
      [
        "Segurança",
        "Padrões de token, certificados, logging e aprovação de exceções."
      ],
      [
        "SRE/Operação",
        "Capacidade, incidentes, SLOs, testes de failover e runbooks."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.15 Developer portal, products e onboarding",
    "id": "24-15-developer-portal-products-e-onboarding"
  },
  {
    "kind": "paragraph",
    "text": "O developer portal transforma o catálogo técnico em experiência de consumo. APIs são apresentadas diretamente ou dentro de products, com documentação, exemplos e console de teste. Consumidores podem criar conta, solicitar subscription e obter chaves conforme workflow configurado. Em APIs externas, termos de uso, contato, limites e processos de suporte precisam estar visíveis."
  },
  {
    "kind": "paragraph",
    "text": "Products devem representar ofertas coerentes, não apenas agrupamentos arbitrários. Um produto pode diferenciar sandbox e produção, parceiro e interno, ou níveis de serviço. Policies de product podem aplicar quota, mas contratos de negócio e autorização permanecem em camadas apropriadas. O portal deve evitar publicar endpoints internos, headers sensíveis ou payloads reais em exemplos."
  },
  {
    "kind": "paragraph",
    "text": "Customização do portal precisa ser versionada e testada. Alterações de identidade, domínio, CORS ou conteúdo podem impedir onboarding mesmo que o gateway esteja saudável. O API Center pode complementar descoberta corporativa multigateway, enquanto o developer portal do APIM continua focado no consumo das APIs gerenciadas naquela plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.16 Observabilidade e troubleshooting",
    "id": "24-16-observabilidade-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "O APIM expõe métricas e resource logs pelo Azure Monitor e pode integrar diagnósticos com Application Insights. Métricas mostram volume, latência, capacidade e códigos de resposta. Logs de gateway permitem investigar request, operation, backend, policy e erro. Application Insights adiciona correlação e análise distribuída quando o backend também participa do trace."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade precisa equilibrar detalhe e segurança. Payload logging pode capturar dados pessoais, tokens e segredos. Headers devem ser allowlisted e mascarados. Sampling reduz custo, mas pode esconder falhas raras. Correlation IDs precisam ser propagados ao backend e retornados ao consumidor quando apropriado. A policy trace pode adicionar eventos customizados aos traces e à telemetria conforme configuração."
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico deve separar erro gerado pelo APIM de erro retornado pelo backend. Um 401 pode vir de validate-jwt, subscription, mTLS ou serviço de negócio. Um 502 pode indicar falha de DNS, TLS ou conexão com backend, mas também transformação de resposta inválida. O contexto LastError em on-error fornece source, reason, message, scope, section e path, úteis para classificar a etapa que falhou."
  },
  {
    "kind": "paragraph",
    "text": "Traces de teste são úteis, mas devem ser protegidos e não usados como substituto de telemetria contínua. Health checks validam o gateway; transações sintéticas validam a jornada. Dashboards devem separar latência total, tempo de backend e tempo de policy para evitar culpar o componente errado."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Cada fonte de telemetria responde a uma camada diferente.",
    "headers": [
      "Sinal",
      "Pergunta respondida"
    ],
    "rows": [
      [
        "Gateway requests e status",
        "Qual volume e quais respostas o consumidor recebeu?"
      ],
      [
        "Backend duration",
        "Quanto tempo foi gasto no serviço de destino?"
      ],
      [
        "Capacity",
        "O gateway aproxima-se do limite do tier/unidades?"
      ],
      [
        "Application Insights",
        "Qual dependência, trace e exceção participaram?"
      ],
      [
        "Activity Log",
        "Quem alterou recurso ou configuração administrativa?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.17 Automação, CI/CD e infraestrutura como código",
    "id": "24-17-automacao-ci-cd-e-infraestrutura-como-codigo"
  },
  {
    "kind": "paragraph",
    "text": "Configuração manual pelo portal é útil para aprendizado e diagnóstico, mas não deve ser a principal forma de promover ambientes. APIM pode ser administrado por ARM, Bicep, Terraform, REST, PowerShell e CLI. Contratos, policies, named values, backends, products e diagnósticos devem ser versionados. Segredos devem entrar por referências seguras, não pelo repositório."
  },
  {
    "kind": "paragraph",
    "text": "Pipelines precisam separar infraestrutura da plataforma e conteúdo de APIs quando ownership é diferente. Um time central pode provisionar instância, rede, identidades e logs; times de domínio publicam APIs e policies dentro de guardrails. Lint de XML, validação de OpenAPI, diff de contrato, testes de policy, smoke tests e aprovação de mudança reduzem regressões."
  },
  {
    "kind": "paragraph",
    "text": "Revisions permitem testar uma alteração sem trocar imediatamente a versão pública. Após validação, uma revisão torna-se current. Versions permitem coexistência de contratos incompatíveis. Rollback deve considerar que configuração pode ter sido propagada e que consumidores podem ter observado a mudança. Backup e restore, quando aplicáveis ao tier e modelo, não substituem código fonte e reconstrução automatizada."
  },
  {
    "kind": "code",
    "text": "Drift entre portal e repositório é um risco. Azure Policy, RBAC, locks e pipelines ajudam a reduzir mudanças não rastreadas. Quando\numa correção emergencial é feita manualmente, ela precisa ser reconciliada com o código imediatamente.\nExemplo conceitual - API Management as code\n# Estrutura sugerida de repositório\ninfra/\n  apim.bicep\n  networking.bicep\n  diagnostics.bicep\napis/\n  clientes/openapi.yaml\n  clientes/policies/\n    api-policy.xml\n    operations/\nshared/\n  policy-fragments/\n  naming-and-standards.md"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.18 Segurança, hardening e estudos de caso",
    "id": "24-18-seguranca-hardening-e-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Hardening começa por reduzir exposição. Management plane deve usar RBAC de menor privilégio, PIM e trilhas de auditoria. Gateway deve aceitar apenas protocolos, cipher suites e hostnames necessários dentro das capacidades do serviço. Public network access deve ser desabilitado quando a arquitetura privada estiver validada. Custom domains, certificados e DNS precisam de ownership e renovação automatizada."
  },
  {
    "kind": "paragraph",
    "text": "Policies globais devem impor baseline de autenticação, headers, limites e logging, mas exceções precisam ser explícitas. Named values e certificados devem usar Key Vault quando apropriado. Traces e logs não podem registrar credenciais. APIs administrativas e portais devem ser protegidos separadamente do endpoint de gateway. Dependências como Entra ID, Key Vault, Application Insights e DNS precisam de monitoramento."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1: uma API pública usa Azure Front Door com WAF diante de APIM, private endpoint no gateway e backends privados. Front Door fornece entrada global e proteção L7; APIM executa OAuth, quotas e transformação. O desenho precisa garantir DNS privado, certificado entre camadas e preservação segura do IP original."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2: uma empresa mantém backends em OpenShift on-premises e usa self-hosted gateway no cluster. O Azure mantém configuração e catálogo, enquanto o tráfego permanece local. A operação precisa dimensionar réplicas, usar mTLS, garantir saída 443 para sincronização e monitorar versões do container."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3: equipes de pagamentos, crédito e cadastro usam workspaces. A plataforma central aplica baseline e observabilidade, enquanto cada domínio administra APIs e products. O principal risco é uma policy de workspace ignorar herança ou criar comportamento inconsistente; testes automáticos verificam base e padrões obrigatórios."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "Com Axway e Azure APIM estudados, o próximo capítulo aprofunda Segurança de APIs segundo o OWASP API Security Top 10, conectando ameaças concretas a controles de gateway, aplicação, identidade e operação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management separa management plane, data plane e experiência de consumo. O gateway executa policies e encaminha tráfego; o management plane administra a configuração; o developer portal organiza descoberta e onboarding. Managed, self-hosted e workspace gateways atendem topologias diferentes e transferem responsabilidades operacionais distintas."
  },
  {
    "kind": "paragraph",
    "text": "O modelo de recursos combina APIs, operations, backends, products, subscriptions, named values, certificates e diagnostics. Policies são executadas em inbound, backend, outbound e on-error, com escopos e herança controlados por base. A ordem das statements faz parte do comportamento e precisa de testes."
  },
  {
    "kind": "paragraph",
    "text": "Rede e disponibilidade dependem de tier. Private endpoint protege entrada, enquanto conectividade a backend exige desenho de saída. Scale units, zonas e multi-região resolvem classes diferentes de falha. Managed identity, Key Vault, TLS e mTLS reduzem segredos, mas dependem de permissões e conectividade."
  },
  {
    "kind": "paragraph",
    "text": "Operação madura exige observabilidade, automação, controle de drift, testes de contrato, capacidade e runbooks. APIM é gerenciado, mas a organização continua responsável por arquitetura, policies, identidade, dados, backends e experiência do consumidor."
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
      "O tier e o tipo de gateway foram escolhidos com base na matriz atual de recursos e no SLA exigido.",
      "Entrada no gateway e saída para backends possuem desenho de rede separado e documentado.",
      "DNS, certificados, custom domains e private endpoints possuem testes e ownership.",
      "Policies globais e de workspace usam base e possuem processo formal de exceção.",
      "Subscription keys não são usadas como substituto de identidade e autorização de negócio.",
      "Managed identities possuem apenas permissões necessárias e não dependem de bypass implícito de firewall.",
      "Named values secretos e certificados usam armazenamento e rotação apropriados.",
      "Timeouts, retries, cache, rate limits e quotas foram testados em cenários de falha.",
      "Métricas, logs, Application Insights e transações sintéticas cobrem a jornada.",
      "Configuração é versionada e publicada por pipeline com smoke test e plano de rollback.",
      "Alta disponibilidade inclui backends, identidade, DNS, entrada global e processo de recuperação.",
      "Developer portal e products expõem apenas documentação e exemplos aprovados."
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
      "Importe uma OpenAPI e identifique APIs, operations e backend gerados.",
      "Crie policies em inbound, outbound e on-error e observe a ordem de execução.",
      "Aplique uma policy global e outra de API usando base; teste o efeito de omitir base em laboratório.",
      "Configure um named value e substitua um literal da policy.",
      "Valide um JWT e diferencie 401 de 403 em respostas controladas.",
      "Use managed identity para autenticar o APIM em um backend protegido.",
      "Configure um custom domain com certificado de Key Vault em ambiente de teste.",
      "Desenhe uma topologia com Front Door, private endpoint e backend privado, indicando DNS e rotas.",
      "Crie um dashboard com requests, status, backend duration e capacity.",
      "Simule timeout de backend e capture LastError no on-error.",
      "Modele um workspace com responsabilidades de plataforma e domínio.",
      "Escreva um pipeline conceitual de importação, policy, teste e publicação."
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
    "caption": "Tabela 10 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "API Management instance",
        "Recurso Azure que reúne configuração, gateway e recursos de gerenciamento."
      ],
      [
        "Backend",
        "Recurso que representa o destino chamado pelo gateway."
      ],
      [
        "Base policy",
        "Elemento que inclui policies herdadas do escopo superior."
      ],
      [
        "Capacity",
        "Métrica que indica utilização relativa da capacidade do gateway."
      ],
      [
        "Developer portal",
        "Portal de descoberta, documentação, teste e onboarding."
      ],
      [
        "Diagnostic",
        "Configuração de emissão de telemetria para logger ou destino."
      ],
      [
        "Managed gateway",
        "Data plane operado pela Microsoft."
      ],
      [
        "Managed identity",
        "Identidade Entra administrada pelo Azure para acesso sem segredo estático."
      ],
      [
        "Named value",
        "Parâmetro reutilizável usado em policies."
      ],
      [
        "Operation",
        "Combinação de método e template de URL dentro de uma API."
      ],
      [
        "Policy expression",
        "Expressão C# limitada avaliada no runtime da policy."
      ],
      [
        "Product",
        "Pacote de APIs oferecido a consumidores."
      ],
      [
        "Revision",
        "Revisão de uma API sob a mesma versão pública."
      ],
      [
        "Self-hosted gateway",
        "Gateway APIM executado como container na infraestrutura do cliente."
      ],
      [
        "Subscription",
        "Entidade de consumo que pode possuir primary e secondary keys."
      ],
      [
        "Workspace",
        "Fronteira administrativa para gestão federada de APIs."
      ],
      [
        "Workspace gateway",
        "Gateway associado ao runtime de um workspace."
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
      "Microsoft Learn. Azure API Management - Overview and key concepts. Atualizado em 2025.",
      "Microsoft Learn. API gateway in Azure API Management. Atualizado em maio de 2026.",
      "Microsoft Learn. Azure API Management v2 tiers. Atualizado em março de 2026.",
      "Microsoft Learn. Feature-based comparison of Azure API Management tiers. Atualizado em 2026.",
      "Microsoft Learn. Policies in Azure API Management. Atualizado em maio de 2026.",
      "Microsoft Learn. Workspaces in Azure API Management. Atualizado em junho de 2026.",
      "Microsoft Learn. Self-hosted gateway overview and support policies. Atualizado em 2026.",
      "Microsoft Learn. Set up inbound private endpoint for Azure API Management. Atualizado em junho de 2026.",
      "Microsoft Learn. Reliability in Azure API Management and multi-region deployment.",
      "Microsoft Learn. Use managed identities in Azure API Management. Atualizado em abril de 2026.",
      "Microsoft Learn. Integrate Azure API Management with Application Insights. Atualizado em março de 2026.",
      "Microsoft Learn. Observability in Azure API Management. Atualizado em junho de 2026.",
      "Microsoft Learn. Import OpenAPI and SOAP APIs into Azure API Management.",
      "Microsoft Azure Well-Architected Framework. Service guide for Azure API Management."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management evolui com frequência. Tiers, regiões, limites, workspaces, gateways e policies podem mudar. Antes de implementar uma decisão, valide a documentação oficial e a matriz de recursos da região e do tier selecionados."
  }
];
