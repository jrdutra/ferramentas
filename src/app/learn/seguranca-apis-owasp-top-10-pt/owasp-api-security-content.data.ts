import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OWASP_API_SECURITY_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "OWASP API Security Top 10: riscos conectados ao ciclo completo da API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/pt/overview.svg",
    "alt": "Dez riscos do OWASP API Security Top 10 conectados ao ciclo de vida da API",
    "caption": "Figura de abertura - Os dez riscos representam classes de falhas que atravessam design, implementação, gateway e operação."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O gateway reduz exposição, mas a autorização e a lógica segura precisam existir em todas as camadas."
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
    "text": "O capítulo anterior detalhou o Azure API Management e mostrou como gateways aplicam policies, limites, autenticação, roteamento e observabilidade. Este capítulo amplia a visão: segurança de APIs não é uma funcionalidade exclusiva do gateway. A API pode estar perfeitamente protegida por TLS e ainda permitir que um usuário autenticado leia objetos de outro cliente, modifique campos proibidos ou execute uma operação administrativa indevida."
  },
  {
    "kind": "paragraph",
    "text": "O OWASP API Security Top 10 organiza os riscos mais relevantes para APIs em uma linguagem prática. A edição de 2023 destaca falhas de autorização em objetos, autenticação, propriedades, funções e fluxos sensíveis; consumo irrestrito de recursos; SSRF; configurações inseguras; inventário inadequado; e confiança excessiva em APIs de terceiros. Essas categorias ajudam equipes de produto, arquitetura, desenvolvimento, segurança e operação a construir um vocabulário comum."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo não é transformar o Top 10 em checklist superficial. Cada risco representa uma família de causas, condições de exploração e impactos. Para compreendê-los, é necessário relacionar identidade, autorização, schemas, limites operacionais, comportamento de negócio, topologia de rede, dependências externas e ciclo de vida. O capítulo também diferencia controles preventivos, detectivos e responsivos, mostrando o papel específico de API Gateways, WAFs, backends e processos de governança."
  },
  {
    "kind": "paragraph",
    "text": "Os exemplos utilizam cenários corporativos e bancários sem expor ambientes reais. O leitor deverá sair capaz de reconhecer padrões vulneráveis, formular hipóteses de ataque, propor controles em múltiplas camadas e transformar achados em requisitos verificáveis de engenharia."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada categoria, separe quatro dimensões: ativo protegido, condição vulnerável, ação do atacante e controle verificável. Depois, identifique qual parte pertence ao gateway, qual pertence ao backend e qual depende de governança ou processo."
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
      "Explicar o propósito e as limitações do OWASP API Security Top 10.",
      "Identificar as diferenças entre autorização de objeto, propriedade e função.",
      "Reconhecer falhas de autenticação e gestão de tokens, sessões e credenciais.",
      "Projetar limites contra consumo irrestrito de recursos e abuso de fluxos de negócio.",
      "Compreender SSRF, configurações inseguras, inventário inadequado e consumo inseguro de APIs.",
      "Relacionar cada risco a controles em código, API Gateway, WAF, rede, identidade e observabilidade.",
      "Aplicar threat modeling, testes de segurança e evidências de CI/CD ao ciclo de vida.",
      "Construir estratégias de hardening, monitoramento, resposta e melhoria contínua."
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
      "25.1 Modelo de segurança e uso responsável do Top 10",
      "25.2 API1: Broken Object Level Authorization",
      "25.3 API2: Broken Authentication",
      "25.4 API3: Broken Object Property Level Authorization",
      "25.5 API4: Unrestricted Resource Consumption",
      "25.6 API5: Broken Function Level Authorization",
      "25.7 API6: Unrestricted Access to Sensitive Business Flows",
      "25.8 API7: Server Side Request Forgery",
      "25.9 API8: Security Misconfiguration",
      "25.10 API9: Improper Inventory Management",
      "25.11 API10: Unsafe Consumption of APIs",
      "25.12 Controles de gateway e defesa em profundidade",
      "25.13 Testes, observabilidade e resposta",
      "25.14 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.1 Modelo de segurança e uso responsável do Top 10",
    "id": "25-1-modelo-de-seguranca-e-uso-responsavel-do-top-10"
  },
  {
    "kind": "paragraph",
    "text": "O Top 10 é um documento de conscientização e priorização, não uma especificação completa de segurança. Uma API pode estar vulnerável a riscos que não aparecem na lista, e a ausência de achados no Top 10 não prova segurança. O uso correto combina threat modeling, requisitos de proteção, arquitetura, testes, revisão de código, gestão de dependências, telemetria e resposta a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "APIs expõem operações diretamente consumíveis por software. Isso amplia automação do atacante, velocidade de enumeração e capacidade de encadear falhas. Identificadores em paths, queries e payloads podem ser alterados em grande escala; schemas permitem explorar propriedades não previstas; e fluxos legítimos podem ser abusados sem qualquer payload malformado. Por isso, segurança de API exige observar intenção e contexto, não apenas sintaxe."
  },
  {
    "kind": "paragraph",
    "text": "A defesa em profundidade distribui responsabilidades. O WAF reduz tráfego malicioso conhecido; o gateway valida tokens, quotas e contratos; o backend aplica autorização vinculada ao domínio; o banco limita acesso; e a observabilidade detecta padrões anômalos."
  },
  {
    "kind": "paragraph",
    "text": "Nenhuma dessas camadas substitui as outras. Um controle de borda pode ser contornado por tráfego interno, enquanto uma falha de negócio pode parecer perfeitamente válida para um filtro genérico."
  },
  {
    "kind": "subhead",
    "text": "Defesa em profundidade para APIs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/pt/figure-01-defense-in-depth.svg",
    "alt": "Consumidor, WAF, API Gateway, backend e dados como camadas de defesa em profundidade",
    "caption": "Figura 1 - Segurança de API é um sistema de controles complementares, não um produto isolado."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Cada camada protege um conjunto diferente de decisões.",
    "headers": [
      "Camada",
      "Controle característico",
      "Limitação"
    ],
    "rows": [
      [
        "WAF / borda",
        "Reputação, assinaturas, proteção volumétrica.",
        "Pouco contexto de domínio e ownership."
      ],
      [
        "API Gateway",
        "Token, schema, quotas, roteamento e auditoria.",
        "Não conhece toda a regra de negócio."
      ],
      [
        "Backend",
        "Autorização fina, invariantes e validações.",
        "Pode depender de identidade e contexto corretos."
      ],
      [
        "Dados / terceiros",
        "Menor privilégio e restrição de saída.",
        "Não substitui controles da aplicação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.2 API1: Broken Object Level Authorization - BOLA",
    "id": "25-2-api1-broken-object-level-authorization-bola"
  },
  {
    "kind": "paragraph",
    "text": "Broken Object Level Authorization ocorre quando uma operação recebe um identificador de objeto e não verifica se o sujeito autenticado possui permissão sobre aquele objeto específico. O atacante não precisa quebrar autenticação: ele utiliza a própria conta, altera um ID e tenta acessar conta, contrato, documento, pedido ou recurso pertencente a outra pessoa ou organização."
  },
  {
    "kind": "paragraph",
    "text": "O erro comum é interpretar autenticação como autorização. Saber quem fez a chamada não responde se esse sujeito pode ler ou modificar o objeto solicitado. UUIDs e identificadores aleatórios reduzem previsibilidade, mas não são controle de acesso. IDs podem aparecer em logs, links, respostas, dispositivos ou integrações, e a autorização precisa ser aplicada independentemente da dificuldade de adivinhação."
  },
  {
    "kind": "paragraph",
    "text": "A defesa mais robusta é vincular a busca ao contexto autorizado. Em vez de carregar um objeto apenas por ID e checar depois, o repositório pode buscar por ID, tenant e sujeito autorizado, retornando ausência quando a relação não existe. Políticas centralizadas ajudam, mas precisam receber atributos suficientes. Testes devem variar usuário, tenant, papel, objeto e método HTTP para encontrar inconsistências."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/pt/figure-02-bola.svg",
    "alt": "Usuário autenticado tentando acessar objeto pertencente a outro cliente",
    "caption": "Figura 2 - A verificação deve relacionar o objeto ao sujeito e ao tenant, não apenas validar o token."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de autorização por objeto"
  },
  {
    "kind": "code",
    "text": "// Padrão vulnerável\nconta = repositorio.buscarPorId(idDaRequisicao)\nreturn conta\n// Padrão defensivo\nconta = repositorio.buscarPorIdETitular(idDaRequisicao, subjectDoToken)\nif conta == null: negarAcesso()"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.3 API2: Broken Authentication",
    "id": "25-3-api2-broken-authentication"
  },
  {
    "kind": "paragraph",
    "text": "Broken Authentication reúne falhas que permitem assumir ou manter a identidade de outro usuário, aplicação ou workload. Exemplos incluem credenciais fracas, endpoints de login sem proteção contra automação, tokens previsíveis, validação incompleta de assinatura ou claims, recuperação de senha insegura, sessões que não expiram e refresh tokens reutilizáveis sem detecção."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs modernas, a autenticação normalmente envolve mais de um sistema: cliente, authorization server, gateway e backend. A validação precisa confirmar algoritmo, assinatura, issuer, audience, expiração, tipo de token e contexto de uso. Aceitar um ID Token onde se espera access token, ignorar audience ou confiar em chaves obtidas de origem não validada são falhas de desenho, não apenas de implementação."
  },
  {
    "kind": "paragraph",
    "text": "Controles incluem MFA para operações adequadas, PKCE, rotação de refresh tokens, proteção contra credential stuffing, limitação de tentativas, revogação, detecção de anomalias, armazenamento seguro de segredos e prova de posse quando o risco justificar. Mensagens de erro devem evitar enumeração de contas, e fluxos de recuperação precisam ter segurança equivalente ao login principal."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Autenticação segura depende do protocolo e de sua operação completa.",
    "headers": [
      "Falha",
      "Impacto",
      "Controle"
    ],
    "rows": [
      [
        "Issuer ou audience não validados",
        "Token de outro contexto é aceito.",
        "Validação estrita e configuração por ambiente."
      ],
      [
        "Refresh token sem rotação",
        "Roubo mantém acesso prolongado.",
        "Rotação e detecção de reutilização."
      ],
      [
        "Login sem proteção",
        "Credential stuffing e takeover.",
        "Rate limiting, MFA e detecção de risco."
      ],
      [
        "Segredo no código ou log",
        "Comprometimento do cliente.",
        "Vault, rotação e mascaramento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.4 API3: Broken Object Property Level Authorization",
    "id": "25-4-api3-broken-object-property-level-authorization"
  },
  {
    "kind": "paragraph",
    "text": "Essa categoria reúne falhas de autorização no nível das propriedades de um objeto. Na leitura, a API pode retornar campos que o usuário não deveria enxergar. Na escrita, pode aceitar propriedades que o consumidor não deveria controlar. A edição de 2023 combina problemas historicamente descritos como excessive data exposure e mass assignment."
  },
  {
    "kind": "paragraph",
    "text": "Um exemplo de leitura insegura é devolver o objeto completo da entidade e esperar que o front-end esconda CPF, limite interno, flags de fraude ou dados administrativos. O consumidor controla a requisição e pode observar a resposta bruta. Na escrita, vincular automaticamente o JSON recebido a uma entidade permite que campos como role, status, ownerId ou approved sejam alterados por quem não possui autorização."
  },
  {
    "kind": "paragraph",
    "text": "A solução usa modelos de entrada e saída específicos, allowlists de campos, autorização por propriedade, serialização contextual e validação de schema. GraphQL exige atenção especial porque campos sensíveis podem existir no schema e precisar de autorização própria. No gateway, validação e transformação ajudam, mas o backend deve controlar a verdade do domínio."
  },
  {
    "kind": "subhead",
    "text": "Payload que exige allowlist de propriedades editáveis"
  },
  {
    "kind": "code",
    "text": "{\n  \"nome\": \"Cliente Exemplo\",\n  \"email\": \"cliente@example.com\",\n  \"role\": \"admin\",\n  \"limiteAprovado\": 1000000\n}"
  },
  {
    "kind": "subhead",
    "text": "Regra prática"
  },
  {
    "kind": "paragraph",
    "text": "Nunca exponha ou aceite automaticamente todas as propriedades de uma entidade persistida. Contratos de API devem ser projeções explícitas, orientadas ao caso de uso e ao nível de autorização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.5 API4: Unrestricted Resource Consumption",
    "id": "25-5-api4-unrestricted-resource-consumption"
  },
  {
    "kind": "paragraph",
    "text": "APIs consomem CPU, memória, threads, conexões, armazenamento, banda e serviços cobrados por uso. Quando não existem limites coerentes, um atacante pode provocar indisponibilidade ou custo excessivo enviando muitas requisições, payloads grandes, consultas complexas, uploads, exportações ou operações que acionam terceiros caros."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting por requisição é apenas uma parte. É necessário controlar tamanho de corpo e resposta, profundidade de GraphQL, duração, concorrência, paginação, número de itens, compressão, quantidade de conexões WebSocket e custo acumulado por operação. Uma chamada de relatório pode custar milhares de vezes mais que uma leitura simples, portanto limites uniformes podem proteger mal o sistema."
  },
  {
    "kind": "paragraph",
    "text": "O desenho deve combinar quotas por identidade e tenant, timeouts, bulkheads, backpressure, filas, limites de conexão e circuit breakers. Métricas precisam distinguir rejeição protetiva de erro interno. Em cloud, alertas de custo e budgets também integram a proteção, pois abuso pode aparecer primeiro na fatura antes de causar indisponibilidade visível."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Consumo precisa ser medido pelo custo real da operação.",
    "headers": [
      "Recurso",
      "Abuso possível",
      "Controle técnico"
    ],
    "rows": [
      [
        "CPU / memória",
        "Query complexa, regex cara, decompression bomb.",
        "Complexidade, tamanho e timeout."
      ],
      [
        "Conexões",
        "Sockets persistentes ou pool esgotado.",
        "Limite de concorrência e idle timeout."
      ],
      [
        "Armazenamento",
        "Uploads e logs excessivos.",
        "Quota, retenção e tamanho máximo."
      ],
      [
        "Serviço pago",
        "SMS, mapas, IA ou antifraude.",
        "Budget, rate por fluxo e aprovação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.6 API5: Broken Function Level Authorization",
    "id": "25-6-api5-broken-function-level-authorization"
  },
  {
    "kind": "paragraph",
    "text": "Broken Function Level Authorization ocorre quando um usuário consegue invocar uma função que deveria estar restrita a outro papel, grupo ou contexto. A diferença para BOLA é o foco: BOLA pergunta se o usuário pode acessar aquele objeto; BFLA pergunta se pode executar aquela função, independentemente do objeto."
  },
  {
    "kind": "paragraph",
    "text": "Endpoints administrativos ocultos, mudanças de método HTTP e caminhos previsíveis são vetores comuns. Um usuário pode trocar GET por DELETE, chamar /admin, reutilizar uma operação observada no portal ou invocar diretamente uma função que a interface visual não exibe. Esconder o botão ou o endpoint não é autorização."
  },
  {
    "kind": "paragraph",
    "text": "Controles incluem deny by default, matriz de permissões por função, testes negativos, separação de superfícies administrativas e validação consistente em todos os métodos. O gateway pode aplicar scopes e roles, mas decisões de domínio podem depender de estado, alçada, valor da transação ou segregação de funções, exigindo avaliação no backend ou PDP."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Os três níveis de autorização devem ser testados separadamente.",
    "headers": [
      "Objeto da decisão",
      "Pergunta",
      "Exemplo"
    ],
    "rows": [
      [
        "Objeto - BOLA",
        "Este sujeito pode acessar esta conta?",
        "GET /contas/123"
      ],
      [
        "Função - BFLA",
        "Este sujeito pode encerrar contas?",
        "POST /contas/123/encerrar"
      ],
      [
        "Propriedade - BOPLA",
        "Este sujeito pode alterar este campo?",
        "PATCH role ou limite"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.7 API6: Unrestricted Access to Sensitive Business Flows",
    "id": "25-7-api6-unrestricted-access-to-sensitive-business-flows"
  },
  {
    "kind": "paragraph",
    "text": "Alguns fluxos são legítimos do ponto de vista técnico, mas valiosos para abuso automatizado. Compra de ingressos, criação de contas, solicitação de crédito, resgate de benefícios, envio de códigos, reservas e comentários podem ser explorados em escala por bots, mesmo que cada requisição tenha schema válido e usuário autenticado."
  },
  {
    "kind": "paragraph",
    "text": "O problema exige modelar intenção e economia do fluxo. Um limite genérico por IP pode falhar quando o atacante distribui requisições. A proteção pode exigir vínculo com identidade forte, limites por pessoa e dispositivo, detecção comportamental, filas, step-up, prova de humanidade, regras antifraude e restrições específicas por etapa."
  },
  {
    "kind": "paragraph",
    "text": "Não existe controle universal. O time precisa identificar fluxos sensíveis durante threat modeling, estimar como geram valor para o atacante e definir sinais de abuso. Logs de negócio, taxas de conversão, tentativas por entidade e padrões temporais são mais úteis que somente métricas técnicas de HTTP."
  },
  {
    "kind": "subhead",
    "text": "Diferença essencial"
  },
  {
    "kind": "paragraph",
    "text": "Abuso de fluxo de negócio pode usar requisições perfeitamente válidas. WAF e validação de schema raramente bastam; o controle precisa compreender a finalidade da operação e a identidade econômica do ator."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.8 API7: Server Side Request Forgery - SSRF",
    "id": "25-8-api7-server-side-request-forgery-ssrf"
  },
  {
    "kind": "paragraph",
    "text": "SSRF ocorre quando a API busca um recurso remoto usando uma URL ou destino influenciado pelo usuário sem restrições adequadas. O servidor possui conectividade e identidade diferentes do cliente, podendo alcançar metadata de nuvem, painéis internos, serviços administrativos, loopback ou redes privadas inacessíveis diretamente ao atacante."
  },
  {
    "kind": "paragraph",
    "text": "Casos comuns incluem importação por URL, webhooks, validação de imagens, conversão de documentos e callbacks. Validar apenas o esquema https não resolve: nomes DNS podem resolver para endereços privados, redirects podem mudar o destino e representações alternativas de IP podem contornar filtros ingênuos. DNS rebinding e diferenças entre validação e conexão ampliam o risco."
  },
  {
    "kind": "paragraph",
    "text": "A defesa preferida é allowlist de destinos e rotas de saída específicas. Quando URLs arbitrárias são necessárias, use resolver controlado, bloqueio de ranges privados e especiais, revalidação após redirects, proteção contra mudança de DNS, proxy de egress e identidade mínima. A resposta remota deve ser limitada em tamanho, tipo e tempo."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de tentativa de SSRF"
  },
  {
    "kind": "code",
    "text": "POST /importar-documento\n{\n  \"url\": \"http://169.254.169.254/metadata/...\"\n}\n# A entrada parece uma URL, mas o destino alcançado pelo servidor\n# pode expor serviços internos ou credenciais de infraestrutura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.9 API8: Security Misconfiguration",
    "id": "25-9-api8-security-misconfiguration"
  },
  {
    "kind": "paragraph",
    "text": "Security Misconfiguration cobre configurações inseguras em qualquer camada: CORS permissivo, TLS fraco, endpoints de debug, mensagens detalhadas, credenciais padrão, headers ausentes, serviços desnecessários, permissões excessivas, buckets públicos, administração exposta e policies inconsistentes entre ambientes."
  },
  {
    "kind": "paragraph",
    "text": "APIs são compostas por muitos componentes e o risco emerge das interações. Um gateway pode validar JWT corretamente, mas confiar em um header de identidade enviado pelo cliente. Um backend pode estar protegido na borda e exposto diretamente por outro endereço. Uma policy segura pode existir em produção, mas não no workspace ou na operação específica por causa de herança incorreta."
  },
  {
    "kind": "paragraph",
    "text": "A solução depende de baselines versionadas, infrastructure as code, revisão de mudanças, scanners de configuração, separação de ambientes, gestão de segredos e testes pós-deploy. Erros devem ser padronizados sem stack traces ou detalhes internos. Recursos administrativos precisam de rede e identidade próprias."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Configuração efetiva deve ser verificada, não apenas o arquivo pretendido.",
    "headers": [
      "Área",
      "Exemplo de misconfiguration",
      "Evidência"
    ],
    "rows": [
      [
        "TLS",
        "Versão ou cipher inadequado.",
        "Handshake e configuração do listener."
      ],
      [
        "CORS",
        "Origem refletida com credenciais.",
        "Headers preflight e policy."
      ],
      [
        "Gateway",
        "Header interno confiado sem remoção.",
        "Trace e configuração efetiva."
      ],
      [
        "Backend",
        "Endpoint direto público.",
        "DNS, scan autorizado e firewall."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.10 API9: Improper Inventory Management",
    "id": "25-10-api9-improper-inventory-management"
  },
  {
    "kind": "paragraph",
    "text": "Inventário inadequado ocorre quando a organização não sabe quais APIs, versões, hosts, ambientes, operações e dependências estão ativos. Shadow APIs, versões antigas, endpoints de teste e documentação divergente mantêm superfícies vulneráveis fora do processo de governança."
  },
  {
    "kind": "paragraph",
    "text": "O inventário precisa relacionar owner, classificação de dados, consumidores, versão, ambiente, hostname, backend, autenticação, data de depreciação e telemetria. Descoberta de tráfego pode complementar catálogo, pois documentação não prova que apenas os endpoints conhecidos estão acessíveis. DNS, ingress, gateways, repositórios e observabilidade devem ser correlacionados."
  },
  {
    "kind": "paragraph",
    "text": "Versões retiradas precisam ser realmente desativadas em toda a cadeia. Manter v1 sem suporte por medo de quebrar consumidores acumula risco. Uma política de lifecycle com Deprecation, Sunset, comunicação, evidência de uso e desligamento controlado reduz superfícies órfãs."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/pt/figure-03-api-lifecycle.svg",
    "alt": "Segurança acompanhando design, build, deploy, run e retire no ciclo da API",
    "caption": "Figura 3 - Segurança acompanha a API desde o design até a retirada, com inventário como eixo de governança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.11 API10: Unsafe Consumption of APIs",
    "id": "25-11-api10-unsafe-consumption-of-apis"
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação pode aplicar validação rigorosa a clientes externos e confiar excessivamente em APIs de parceiros, fornecedores ou serviços internos. Unsafe Consumption of APIs ocorre quando dados e comportamentos vindos dessas dependências são tratados como seguros, permitindo injeção, SSRF indireto, corrupção de dados, indisponibilidade ou comprometimento da cadeia."
  },
  {
    "kind": "paragraph",
    "text": "A comunicação autenticada e criptografada apenas prova o canal e a identidade do peer; não garante que a resposta seja correta ou não comprometida. Respostas de terceiros precisam de schema, limites de tamanho, timeout, validação semântica, tratamento seguro de redirects e encoding. Bibliotecas de cliente, certificados, DNS e configuração de proxy também integram a superfície."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas resilientes usam egress controlado, allowlists, circuit breakers, isolamento, contratos, observabilidade por dependência e menor privilégio. Segredos enviados ao parceiro devem ser específicos e rotacionáveis. Dados retornados nunca devem ser concatenados em SQL, comandos, templates ou URLs sem tratamento apropriado."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Dependências devem ser tratadas como fronteiras de confiança.",
    "headers": [
      "Dependência",
      "Risco",
      "Controle"
    ],
    "rows": [
      [
        "API de parceiro",
        "Resposta maliciosa ou inesperada.",
        "Schema, validação e isolamento."
      ],
      [
        "Webhook recebido",
        "Origem forjada e replay.",
        "Assinatura, timestamp e idempotência."
      ],
      [
        "SDK / biblioteca",
        "Comportamento ou cadeia comprometida.",
        "SBOM, pinning e atualização controlada."
      ],
      [
        "Serviço interno",
        "Confiança implícita lateral.",
        "mTLS, autorização e egress policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.12 Controles de gateway e defesa em profundidade",
    "id": "25-12-controles-de-gateway-e-defesa-em-profundidade"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é uma camada privilegiada para aplicar controles uniformes: autenticação, validação de tokens, schema, limite de payload, quotas, rate limiting, remoção de headers, roteamento, mTLS, observabilidade e bloqueio de versões. Ele também oferece um ponto de contenção para resposta a incidentes. Contudo, não deve ser transformado em único mecanismo de autorização de domínio."
  },
  {
    "kind": "paragraph",
    "text": "BOLA, autorização por propriedade e fluxos sensíveis normalmente exigem dados que só o backend conhece. O gateway pode validar scopes e claims, mas ownership, alçada, estado do objeto e segregação de função precisam ser avaliados no serviço ou em um PDP com contexto suficiente. A política deve negar por padrão e propagar identidade de forma não falsificável."
  },
  {
    "kind": "paragraph",
    "text": "Controles também precisam preservar diagnósticos. Rejeições devem registrar regra, identidade, operação, tenant e correlação sem expor segredo. Métricas de 401, 403, 429, schema violations e bloqueios WAF ajudam a detectar ataques, mas precisam ser contextualizadas para diferenciar abuso de falha de integração."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O gateway é importante, mas não substitui segurança da aplicação.",
    "headers": [
      "Risco",
      "Gateway contribui com",
      "Backend / processo precisa garantir"
    ],
    "rows": [
      [
        "API1 / API3 / API5",
        "Identidade, scopes e contrato.",
        "Ownership, função e propriedades autorizadas."
      ],
      [
        "API4 / API6",
        "Limites, quotas e telemetria.",
        "Custo real e regras de negócio."
      ],
      [
        "API7",
        "Egress policy e URL policy quando suportado.",
        "Validação de destino e isolamento."
      ],
      [
        "API8 / API9",
        "Baseline e publicação controlada.",
        "Inventário, lifecycle e configuração completa."
      ],
      [
        "API10",
        "mTLS, allowlist e timeout.",
        "Validação da resposta e confiança mínima."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.13 Testes, observabilidade e resposta",
    "id": "25-13-testes-observabilidade-e-resposta"
  },
  {
    "kind": "paragraph",
    "text": "Testes de segurança precisam explorar contexto, não apenas payloads. Para autorização, use matrizes com usuários, papéis, tenants, objetos, propriedades, estados e métodos. Para autenticação, teste tokens expirados, issuer incorreto, audience diferente, algoritmos e revogação. Para limites, meça comportamento sob concorrência, payloads grandes e operações caras em ambiente autorizado."
  },
  {
    "kind": "paragraph",
    "text": "Automação de CI/CD pode executar linting de OpenAPI, SAST, SCA, testes de contrato, scanners DAST e políticas de infraestrutura. Ainda assim, achados automáticos precisam de validação. Ferramentas identificam padrões, mas dificilmente compreendem todos os fluxos sensíveis e relações de ownership. Revisões manuais e threat modeling permanecem necessários."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade deve capturar sinais técnicos e de negócio: identidade, tenant, operação, objeto lógico, status, latência, tamanho, custo, rejeição, backend e correlação. Alertas devem buscar anomalias, como enumeração de IDs, aumento de 403, criação acelerada de contas ou chamadas a destinos incomuns. O plano de resposta precisa permitir revogar credenciais, bloquear rotas, reduzir limites e preservar evidências."
  },
  {
    "kind": "subhead",
    "text": "Teste responsável"
  },
  {
    "kind": "paragraph",
    "text": "Testes ofensivos devem ocorrer somente em ambientes e escopos explicitamente autorizados. Use dados sintéticos, limites controlados e plano de rollback para evitar impacto a usuários e sistemas produtivos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.14 Estudos de caso e laboratórios",
    "id": "25-14-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - BOLA em Open Finance: um endpoint consulta consentimento por identificador. O token é válido, mas o serviço não verifica se o consentimento pertence ao cliente e ao participante corretos. A correção inclui consulta por consentId, subject e organização, além de testes cruzados e logs de decisão."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - abuso de fluxo: um endpoint de simulação de crédito chama serviços pagos e permite alto volume por contas recém-criadas. Rate limiting por IP não funciona contra distribuição. A defesa combina limite por pessoa, dispositivo, tenant, custo por operação, detecção comportamental e filas."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - API de parceiro: um serviço de documentos aceita URL externa e segue redirects. Um domínio permitido redireciona para endereço privado. A correção usa egress proxy, resolução e validação do IP final, bloqueio de redes especiais, limite de redirects e resposta máxima."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Construa uma matriz de autorização para objeto, função e propriedade. 2) Modele limites por custo para três operações. 3) Revise uma especificação OpenAPI em busca de campos sensíveis e endpoints órfãos. 4) Desenhe uma arquitetura de egress segura contra SSRF. 5) Crie alertas para enumeração, abuso e aumento de rejeições."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "O OWASP API Security Top 10 2023 organiza riscos que aparecem de forma recorrente em APIs. As primeiras categorias destacam que autenticação e autorização precisam operar em níveis diferentes: objeto, propriedade, função e fluxo de negócio. Outros riscos tratam consumo de recursos, SSRF, configuração, inventário e dependências externas."
  },
  {
    "kind": "paragraph",
    "text": "A proteção efetiva combina controles em borda, gateway, backend, dados e processos. O gateway padroniza políticas e reduz exposição, mas não conhece sozinho ownership, estado e intenção de negócio. Desenvolvimento seguro, threat modeling, inventário e observabilidade são indispensáveis."
  },
  {
    "kind": "paragraph",
    "text": "O Top 10 deve orientar perguntas e prioridades, não servir como certificado de segurança. Uma plataforma madura transforma cada risco em requisitos, testes, métricas, evidências e planos de resposta, mantendo a proteção durante todo o ciclo de vida da API."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda CORS, CSP, HSTS e outros cabeçalhos HTTP, mostrando como políticas de navegador e transporte complementam a segurança das APIs e aplicações web."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de segurança de APIs",
    "id": "checklist-de-seguranca-de-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Toda operação que recebe um ID verifica ownership, tenant e contexto de autorização.",
      "Input e output usam modelos explícitos e allowlists de propriedades.",
      "Tokens são validados por assinatura, issuer, audience, tempo e tipo.",
      "Funções administrativas possuem deny by default e testes negativos.",
      "Operações têm limites de tamanho, tempo, concorrência, custo e paginação.",
      "Fluxos sensíveis possuem proteção contra automação e abuso econômico.",
      "Chamadas de saída usam allowlists, egress controlado e bloqueio de redes especiais.",
      "Configuração efetiva é versionada, revisada e testada após deploy.",
      "Inventário contém owner, versão, ambiente, dados, consumidores e data de retirada.",
      "Respostas de terceiros são validadas e tratadas como não confiáveis.",
      "Logs e traces preservam correlação sem registrar credenciais ou dados sensíveis.",
      "Há processo para revogar, bloquear, reduzir limites e responder a incidentes."
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
      "Diferencie BOLA, BFLA e autorização por propriedade com exemplos.",
      "Explique por que UUID não é controle de autorização.",
      "Liste validações necessárias para um access token JWT.",
      "Projete limites para uma operação de exportação de relatório.",
      "Descreva como um fluxo tecnicamente válido pode ser abusado por bots.",
      "Proponha controles contra SSRF em uma funcionalidade de importação por URL.",
      "Identifique riscos de confiar em um header de identidade vindo do cliente.",
      "Monte um inventário mínimo para APIs corporativas.",
      "Descreva como validar respostas de uma API de parceiro.",
      "Crie uma estratégia de telemetria para detectar enumeração de objetos."
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
        "BOLA",
        "Broken Object Level Authorization; falha de autorização sobre um objeto específico."
      ],
      [
        "BFLA",
        "Broken Function Level Authorization; acesso indevido a uma função ou operação."
      ],
      [
        "BOPLA",
        "Broken Object Property Level Authorization; exposição ou alteração indevida de propriedades."
      ],
      [
        "Credential stuffing",
        "Uso automatizado de credenciais vazadas em outros serviços."
      ],
      [
        "Deny by default",
        "Princípio de negar acesso quando não existe permissão explícita."
      ],
      [
        "Egress control",
        "Controle de destinos que uma aplicação pode acessar."
      ],
      [
        "Mass assignment",
        "Vinculação automática de campos de entrada a propriedades internas."
      ],
      [
        "Ownership",
        "Relação que determina quem pode acessar ou modificar um objeto."
      ],
      [
        "Rate limiting",
        "Restrição de frequência de chamadas em uma janela."
      ],
      [
        "Sensitive business flow",
        "Fluxo legítimo que produz valor e pode ser abusado em escala."
      ],
      [
        "Shadow API",
        "API ativa fora do inventário ou da governança oficial."
      ],
      [
        "SSRF",
        "Server Side Request Forgery; indução do servidor a acessar destinos indevidos."
      ],
      [
        "Threat modeling",
        "Análise estruturada de ativos, ameaças, superfícies e controles."
      ],
      [
        "Unsafe consumption",
        "Confiança excessiva em dados e comportamento de APIs dependentes."
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
      "OWASP API Security Project. OWASP API Security Top 10 - 2023.",
      "OWASP. API1:2023 - Broken Object Level Authorization.",
      "OWASP. API2:2023 - Broken Authentication.",
      "OWASP. API3:2023 - Broken Object Property Level Authorization.",
      "OWASP. API4:2023 - Unrestricted Resource Consumption.",
      "OWASP. API5:2023 - Broken Function Level Authorization.",
      "OWASP. API6:2023 - Unrestricted Access to Sensitive Business Flows.",
      "OWASP. API7:2023 - Server Side Request Forgery.",
      "OWASP. API8:2023 - Security Misconfiguration.",
      "OWASP. API9:2023 - Improper Inventory Management.",
      "OWASP. API10:2023 - Unsafe Consumption of APIs.",
      "OWASP Application Security Verification Standard e Cheat Sheet Series.",
      "NIST. Secure Software Development Framework - SSDF.",
      "IETF. RFC 9110 - HTTP Semantics."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo utiliza a edição 2023 do OWASP API Security Top 10, publicada pelo projeto oficial. A lista deve ser revisitada quando novas edições forem lançadas, sem abandonar controles derivados de riscos que continuem relevantes."
  }
];
