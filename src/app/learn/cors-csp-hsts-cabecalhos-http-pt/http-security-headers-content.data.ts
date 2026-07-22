import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const HTTP_SECURITY_HEADERS_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Cabeçalhos como políticas declarativas entre servidor, gateway e navegador"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/pt/overview.svg",
    "alt": "CORS, CSP, HSTS e outros cabeçalhos como camadas declarativas de proteção",
    "caption": "Figura de abertura - Os cabeçalhos formam uma camada declarativa de proteção, mas atuam sobre problemas diferentes."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos não corrigem lógica de autorização, autenticação ou negócio; eles governam comportamento de clientes e intermediários."
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
    "text": "O capítulo anterior apresentou o OWASP API Security Top 10 e mostrou que a proteção de uma API depende de controles distribuídos entre cliente, navegador, gateway, backend, identidade, rede e operação. Este capítulo aprofunda uma parte específica dessa defesa: os cabeçalhos HTTP que instruem navegadores e intermediários sobre como tratar origens, conteúdo executável, transporte seguro, isolamento de contexto, privacidade e armazenamento em cache."
  },
  {
    "kind": "paragraph",
    "text": "CORS, CSP e HSTS são frequentemente agrupados como cabeçalhos de segurança, mas resolvem problemas muito diferentes. CORS define quando um navegador pode expor a uma aplicação web uma resposta obtida de outra origem. CSP limita fontes de scripts, estilos, frames, conexões e outros recursos, reduzindo impacto de injeção de conteúdo. HSTS instrui o navegador a utilizar HTTPS para um host durante um período definido. Nenhum deles substitui autenticação, autorização, validação de dados ou correção de vulnerabilidades no backend."
  },
  {
    "kind": "paragraph",
    "text": "Outros cabeçalhos complementam esse modelo. Referrer-Policy limita a informação enviada no Referer; Permissions-Policy controla recursos do navegador; X-Content-Type-Options reduz interpretações inesperadas de MIME; frame-ancestors e X-Frame-Options tratam incorporação em frames; COOP, COEP e CORP participam de isolamento entre origens; Cache-Control protege respostas sensíveis contra armazenamento indevido; atributos de cookies reduzem exposição a scripts, transporte inseguro e requisições cross-site."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo é construir um modelo mental preciso para implementação e troubleshooting. O leitor deverá saber distinguir uma falha real da API de uma decisão do navegador, reconhecer erros de configuração em API Gateways e CDNs, planejar rollout seguro de políticas restritivas e testar as proteções sem confiar apenas em scanners automáticos."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada cabeçalho, identifique cinco elementos: quem envia, quem aplica, qual ativo protege, qual ameaça reduz e qual comportamento legítimo pode ser quebrado. Essa análise evita a prática perigosa de copiar um conjunto de headers sem entender seus efeitos."
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
      "Explicar origem, site, same-origin policy e a fronteira de segurança do navegador.",
      "Descrever requisições CORS simples, preflight, credenciais e cache de preflight.",
      "Configurar corretamente Access-Control-Allow-Origin e cabeçalhos relacionados.",
      "Diferenciar CORS de autenticação, CSRF, firewall e segurança servidor-servidor.",
      "Projetar Content Security Policy com diretivas, nonces, hashes e implantação em report-only.",
      "Compreender HSTS, includeSubDomains, preload e riscos de rollout incorreto.",
      "Aplicar X-Content-Type-Options, frame-ancestors, Referrer-Policy e Permissions-Policy.",
      "Relacionar COOP, COEP e CORP ao isolamento cross-origin.",
      "Definir Cache-Control e atributos de cookies para respostas e sessões sensíveis.",
      "Implementar, testar e observar cabeçalhos em aplicações, gateways e CDNs."
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
      "26.1 Modelo de segurança do navegador e cabeçalhos declarativos",
      "26.2 Origem, site e Same-Origin Policy",
      "26.3 CORS: propósito e fluxo de decisão",
      "26.4 Requisições simples e preflight",
      "26.5 Cabeçalhos CORS de requisição e resposta",
      "26.6 Credenciais, cookies, Authorization e curingas",
      "26.7 CORS em API Gateways e erros frequentes",
      "26.8 Content Security Policy: modelo e diretivas",
      "26.9 Nonces, hashes, strict-dynamic e scripts inline",
      "26.10 Reporting e implantação gradual de CSP",
      "26.11 HTTP Strict Transport Security",
      "26.12 Clickjacking, MIME sniffing e proteção de frames",
      "26.13 Referrer-Policy e Permissions-Policy",
      "26.14 COOP, COEP e CORP",
      "26.15 Cache-Control, Clear-Site-Data e cookies",
      "26.16 Cabeçalhos obsoletos, troubleshooting e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.1 Modelo de segurança do navegador e cabeçalhos declarativos",
    "id": "26-1-modelo-de-seguranca-do-navegador-e-cabecalhos-declarativos"
  },
  {
    "kind": "paragraph",
    "text": "Navegadores executam código fornecido por múltiplas origens e precisam impedir que uma página maliciosa leia dados de outra aplicação apenas porque o usuário está autenticado nela. Essa proteção não é implementada por um único mecanismo. A Same-Origin Policy estabelece uma fronteira básica; CORS permite exceções controladas; CSP restringe o conteúdo que pode ser carregado ou executado; cookies possuem atributos próprios; e políticas de isolamento reduzem compartilhamento entre contextos."
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos de segurança são declarativos: o servidor envia uma política e o agente compatível decide como aplicá-la. Isso cria uma diferença importante entre segurança do navegador e segurança da API. Um cliente escrito em Java, Python ou curl pode ignorar completamente CORS e CSP, porque esses mecanismos não foram projetados como controle de acesso universal. A API ainda precisa validar credenciais, autorização, esquema e regras de negócio em todas as requisições."
  },
  {
    "kind": "paragraph",
    "text": "O gateway é um ponto eficiente para padronizar cabeçalhos, mas não conhece automaticamente todas as necessidades da aplicação. Uma CSP adequada depende dos scripts, frames e conexões realmente usados por cada front-end. CORS depende das origens consumidoras e da política de credenciais. Cache-Control depende da sensibilidade e da possibilidade de compartilhamento. Portanto, a plataforma pode fornecer defaults e guardrails, enquanto o produto mantém ownership da política específica."
  },
  {
    "kind": "subhead",
    "text": "Distinção essencial"
  },
  {
    "kind": "paragraph",
    "text": "CORS não protege a API contra chamadas externas; ele controla se um navegador entrega a resposta ao JavaScript de outra origem. Um atacante ou sistema servidor-servidor continua capaz de enviar a requisição. Autorização e proteção contra abuso permanecem obrigatórias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.2 Origem, site e Same-Origin Policy",
    "id": "26-2-origem-site-e-same-origin-policy"
  },
  {
    "kind": "paragraph",
    "text": "Uma origem é definida conceitualmente pelo trio esquema, host e porta. https://app.empresa.com e https://api.empresa.com possuem hosts diferentes e, portanto, origens diferentes. https://app.empresa.com e http://app.empresa.com diferem no esquema. https://app.empresa.com:443 e https://app.empresa.com:8443 diferem na porta. O caminho da URL não participa da origem."
  },
  {
    "kind": "paragraph",
    "text": "O conceito de site é relacionado, mas não idêntico. Mecanismos como SameSite em cookies trabalham com a noção de site, enquanto CORS usa origem. Dois subdomínios podem ser same-site e ainda cross-origin. Essa diferença explica cenários em que um cookie é enviado, mas o JavaScript não consegue ler a resposta porque a política CORS não autorizou a origem."
  },
  {
    "kind": "paragraph",
    "text": "A Same-Origin Policy limita leitura e interação entre contextos de origens diferentes. Ela não impede todo envio de dados cross-origin: formulários, imagens, links e outros recursos historicamente realizam requisições. A proteção principal está em restringir a capacidade do script de observar conteúdo e manipular objetos de outra origem. CORS é o protocolo que permite ao servidor declarar exceções controladas para determinadas operações."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - A origem é determinada por esquema, host e porta, não pelo caminho.",
    "headers": [
      "URL A",
      "URL B",
      "Mesma origem?",
      "Motivo"
    ],
    "rows": [
      [
        "https://app.exemplo.com",
        "https://app.exemplo.com/perfil",
        "Sim",
        "Mesmo esquema, host e porta."
      ],
      [
        "https://app.exemplo.com",
        "https://api.exemplo.com",
        "Não",
        "Host diferente."
      ],
      [
        "http://app.exemplo.com",
        "https://app.exemplo.com",
        "Não",
        "Esquema diferente."
      ],
      [
        "https://app.exemplo.com",
        "https://app.exemplo.com:8443",
        "Não",
        "Porta diferente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.3 CORS: propósito e fluxo de decisão",
    "id": "26-3-cors-proposito-e-fluxo-de-decisao"
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin Resource Sharing é um protocolo integrado ao modelo de fetch do navegador. Quando um script tenta acessar uma API de outra origem, o navegador acrescenta o cabeçalho Origin. A resposta precisa conter cabeçalhos que indiquem se aquela origem, método, conjunto de headers e uso de credenciais são permitidos. Quando a política não corresponde, a requisição pode até alcançar o servidor, mas a resposta não é disponibilizada ao JavaScript."
  },
  {
    "kind": "paragraph",
    "text": "Essa característica produz um sintoma frequente: o backend registra sucesso, o gateway devolve 200, mas o console do navegador mostra erro de CORS. Não há contradição. O servidor processou a operação; o navegador bloqueou a exposição da resposta. Por isso, operações com efeito colateral não podem depender de CORS como proteção contra CSRF ou ações indevidas."
  },
  {
    "kind": "paragraph",
    "text": "O navegador pode enviar diretamente a requisição quando ela satisfaz os critérios de uma requisição CORS simples. Em outras situações, realiza preflight com OPTIONS. O preflight pergunta ao servidor se o método e os cabeçalhos pretendidos são aceitos antes de enviar a operação real. A resposta positiva pode ser armazenada em cache específico do navegador por um período limitado."
  },
  {
    "kind": "subhead",
    "text": "CORS com preflight: o navegador negocia antes de enviar a operação real"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/pt/figure-01-cors-preflight.svg",
    "alt": "Navegador negociando preflight OPTIONS com API antes da requisição real",
    "caption": "Figura 1 - O preflight negocia permissão; a decisão final de exposição da resposta pertence ao navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.4 Requisições simples e preflight",
    "id": "26-4-requisicoes-simples-e-preflight"
  },
  {
    "kind": "paragraph",
    "text": "O termo requisição simples não significa que a operação seja segura para o negócio. Ele indica que o navegador pode enviá-la sem preflight por manter compatibilidade com padrões históricos da Web. Métodos como GET, HEAD e POST podem participar quando os headers e o Content-Type permanecem dentro do conjunto permitido pelo protocolo. Um POST application/json, por exemplo, normalmente provoca preflight."
  },
  {
    "kind": "paragraph",
    "text": "O preflight utiliza OPTIONS e inclui Access-Control-Request-Method. Se o script pretende enviar headers não safelisted, o navegador também inclui Access-Control-Request-Headers. O servidor responde com os métodos e headers autorizados. A requisição real só é liberada quando a resposta satisfaz as verificações do navegador."
  },
  {
    "kind": "paragraph",
    "text": "Preflight não é autenticação. Algumas arquiteturas cometem o erro de exigir token no OPTIONS ou encaminhar o preflight a backends que não conhecem CORS. Como o preflight é uma consulta de política realizada antes da requisição real, gateways normalmente o tratam de forma específica. Entretanto, responder permissivamente a qualquer origem e método também cria risco; a política precisa ser derivada de configuração confiável."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de preflight e resposta"
  },
  {
    "kind": "code",
    "text": "OPTIONS /clientes/123 HTTP/1.1\nHost: api.empresa.example\nOrigin: https://portal.empresa.example\nAccess-Control-Request-Method: PUT\nAccess-Control-Request-Headers: authorization, content-type\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://portal.empresa.example\nAccess-Control-Allow-Methods: GET, PUT\nAccess-Control-Allow-Headers: Authorization, Content-Type\nAccess-Control-Max-Age: 600\nVary: Origin"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.5 Cabeçalhos CORS de requisição e resposta",
    "id": "26-5-cabecalhos-cors-de-requisicao-e-resposta"
  },
  {
    "kind": "paragraph",
    "text": "Origin identifica a origem do contexto que iniciou a requisição. Access-Control-Allow-Origin informa qual origem está autorizada a ler a resposta. O valor pode ser uma origem específica ou o curinga em cenários sem credenciais. Quando a lista permitida é dinâmica, o servidor deve validar o valor recebido contra uma allowlist e devolver exatamente a origem aprovada, nunca refletir qualquer valor sem verificação."
  },
  {
    "kind": "paragraph",
    "text": "Access-Control-Allow-Methods e Access-Control-Allow-Headers participam principalmente do preflight. Access-Control-Expose-Headers permite que JavaScript leia cabeçalhos de resposta que não pertencem ao conjunto exposto por padrão. Access-Control-Max-Age influencia o cache do preflight, sujeito a limites do navegador. Access-Control-Allow-Credentials permite respostas credentialed quando combinado a uma origem explícita."
  },
  {
    "kind": "paragraph",
    "text": "Vary: Origin é importante quando a resposta pode mudar conforme a origem solicitante e passa por caches compartilhados. Sem essa indicação, um cache pode reutilizar para outra origem uma resposta que contém Access-Control-Allow-Origin específico. Em plataformas com CDN ou gateway, a chave de cache e a política CORS devem ser projetadas em conjunto."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - O conjunto CORS forma um protocolo de negociação, não um header isolado.",
    "headers": [
      "Cabeçalho",
      "Direção",
      "Função"
    ],
    "rows": [
      [
        "Origin",
        "Request",
        "Identifica a origem do contexto solicitante."
      ],
      [
        "Access-Control-Allow-Origin",
        "Response",
        "Autoriza uma origem ou, em casos limitados, o curinga."
      ],
      [
        "Access-Control-Allow-Methods",
        "Response de preflight",
        "Declara métodos permitidos."
      ],
      [
        "Access-Control-Allow-Headers",
        "Response de preflight",
        "Declara headers permitidos na requisição real."
      ],
      [
        "Access-Control-Expose-Headers",
        "Response",
        "Expõe headers adicionais ao JavaScript."
      ],
      [
        "Access-Control-Allow-Credentials",
        "Response",
        "Permite resposta com credenciais em contexto CORS."
      ],
      [
        "Access-Control-Max-Age",
        "Response de preflight",
        "Controla duração de cache do preflight."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Uma requisição credentialed pode envolver cookies, certificados de cliente ou credenciais HTTP controladas pelo agente. No fetch, o modo credentials determina se credenciais são enviadas e se respostas com Set-Cookie são consideradas. Para que o JavaScript receba uma resposta credentialed cross-origin, o servidor precisa retornar Access-Control-Allow-Credentials: true e uma origem explícita."
  },
  {
    "kind": "paragraph",
    "text": "O curinga em Access-Control-Allow-Origin não pode ser usado para expor respostas credentialed. Essa restrição reduz risco de um site arbitrário ler dados associados à sessão do usuário. Também é inadequado gerar Access-Control-Allow-Origin copiando o Origin recebido sem validação. Reflection irrestrita transforma a política em autorização universal disfarçada."
  },
  {
    "kind": "paragraph",
    "text": "CORS e atributos SameSite de cookies se relacionam, mas não são equivalentes. O cookie pode não ser enviado por causa de SameSite, Secure ou regras de terceiros antes mesmo de CORS ser avaliado. Em outro cenário, o cookie é enviado e o servidor processa a requisição, mas o navegador bloqueia a leitura da resposta. O diagnóstico precisa observar envio de cookies, preflight, resposta real e console do navegador separadamente."
  },
  {
    "kind": "subhead",
    "text": "Regra prática"
  },
  {
    "kind": "paragraph",
    "text": "Para APIs com sessão por cookie, trate CORS, SameSite, CSRF e política de origem como controles complementares. Para APIs com bearer token, valide token e autorização normalmente; o fato de o navegador exigir preflight não torna o endpoint protegido contra clientes fora do navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.7 CORS em API Gateways e erros frequentes",
    "id": "26-7-cors-em-api-gateways-e-erros-frequentes"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways podem centralizar CORS, responder preflight sem alcançar o backend e aplicar allowlists por ambiente, produto ou API. Essa centralização reduz duplicidade, mas exige definir ownership. Se gateway e backend adicionarem cabeçalhos diferentes, a resposta pode conter valores duplicados ou contraditórios. Alguns navegadores rejeitam respostas com múltiplos Access-Control-Allow-Origin."
  },
  {
    "kind": "paragraph",
    "text": "A política deve ser aplicada também a respostas de erro. Uma API que retorna CORS apenas em 2xx pode fazer o navegador esconder o corpo de 401, 403 ou 500, dificultando diagnóstico e experiência do cliente. A seção on-error ou equivalente do gateway precisa produzir os mesmos cabeçalhos relevantes sem abrir permissões adicionais."
  },
  {
    "kind": "paragraph",
    "text": "Outro erro frequente é permitir origens por comparação textual insegura. Testes como endsWith(\"empresa.com\") podem aceitar domínios maliciosos. O valor precisa ser interpretado como origem e comparado com allowlist exata ou regra de subdomínio cuidadosamente definida. Expressões regulares devem ser ancoradas e testadas contra esquemas, portas, case normalization e origens nulas quando aplicável."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Erros de CORS são frequentemente erros de arquitetura e não apenas de sintaxe.",
    "headers": [
      "Falha",
      "Sintoma",
      "Correção"
    ],
    "rows": [
      [
        "OPTIONS exige autenticação",
        "Preflight retorna 401 antes da chamada real.",
        "Tratar OPTIONS conforme política CORS e não como operação de negócio."
      ],
      [
        "CORS só em respostas 2xx",
        "Frontend vê erro genérico.",
        "Aplicar headers também no fluxo de erro."
      ],
      [
        "Origem refletida sem validação",
        "Qualquer site recebe permissão.",
        "Comparar com allowlist confiável."
      ],
      [
        "Gateway e backend duplicam headers",
        "Browser rejeita resposta ambígua.",
        "Definir um único ponto de emissão."
      ],
      [
        "Sem Vary: Origin em cache",
        "Origem recebe política de outra origem.",
        "Ajustar Vary e chave de cache."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.8 Content Security Policy: modelo e diretivas",
    "id": "26-8-content-security-policy-modelo-e-diretivas"
  },
  {
    "kind": "paragraph",
    "text": "Content Security Policy define restrições sobre os recursos que uma página pode carregar ou executar. A política pode ser enviada no header Content-Security-Policy ou, em casos específicos, por elemento meta. O header possui maior alcance e é a forma preferida para políticas completas. A CSP não corrige a vulnerabilidade que permitiu injeção, mas pode reduzir o que o conteúdo injetado consegue fazer."
  },
  {
    "kind": "paragraph",
    "text": "As diretivas são especializadas. default-src fornece fallback para vários tipos de recurso. script-src controla scripts; style-src controla estilos; img-src imagens; connect-src conexões realizadas por fetch, XHR, WebSocket e mecanismos relacionados; font-src fontes; frame-src conteúdo carregado em frames; frame-ancestors define quem pode incorporar a página; object-src controla plugins; base-uri restringe a URL base; form-action limita destinos de formulário."
  },
  {
    "kind": "paragraph",
    "text": "Uma política deve ser mínima e compatível com a aplicação real. Autorizar amplamente https: ou usar unsafe-inline e unsafe-eval reduz proteção. Ao mesmo tempo, bloquear recursos sem inventário pode quebrar login, telemetria, fontes, integrações e funcionalidades legítimas. Por isso, CSP deve ser construída a partir de inventário, testes e observação, não copiada de outra aplicação."
  },
  {
    "kind": "subhead",
    "text": "CSP: cada recurso é comparado com a política antes de ser carregado ou executado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/pt/figure-02-csp-resources.svg",
    "alt": "Documento HTML usando diretivas CSP para controlar scripts, frames e conexões",
    "caption": "Figura 2 - A política compara cada tipo de recurso com a diretiva correspondente."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de política CSP restritiva"
  },
  {
    "kind": "code",
    "text": "Content-Security-Policy:\n  default-src 'none';\n  script-src 'self' 'nonce-R4nd0mBase64';\n  style-src 'self';\n  img-src 'self' data:;\n  connect-src 'self' https://api.empresa.example;\n  frame-ancestors 'none';\n  base-uri 'none';\n  form-action 'self'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.9 Nonces, hashes, strict-dynamic e scripts inline",
    "id": "26-9-nonces-hashes-strict-dynamic-e-scripts-inline"
  },
  {
    "kind": "paragraph",
    "text": "Scripts inline são uma fonte importante de risco porque uma injeção de HTML pode se transformar em execução de JavaScript. Remover inline scripts e servir arquivos estáticos é a solução mais simples quando possível. Quando a aplicação precisa de script inline, um nonce criptograficamente imprevisível pode ser gerado por resposta e incluído tanto na CSP quanto no elemento script autorizado."
  },
  {
    "kind": "paragraph",
    "text": "Hashes permitem autorizar conteúdo inline cujo texto é conhecido e estável. O navegador calcula o hash do bloco e compara com o valor da política. Pequenas mudanças no conteúdo exigem novo hash. Nonces são mais adequados para conteúdo dinâmico, desde que não sejam reutilizados nem inseridos automaticamente em conteúdo controlado por usuário."
  },
  {
    "kind": "paragraph",
    "text": "strict-dynamic permite que scripts confiáveis carregados por nonce ou hash propaguem confiança a scripts adicionados por eles, reduzindo dependência de allowlists de host. Essa estratégia exige testes de compatibilidade e compreensão do bootstrap da aplicação. unsafe-inline e unsafe-eval devem ser tratados como concessões temporárias com plano de remoção, não como configuração padrão."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Nonces e hashes permitem reduzir dependência de unsafe-inline.",
    "headers": [
      "Mecanismo",
      "Quando usar",
      "Cuidado principal"
    ],
    "rows": [
      [
        "Arquivo externo em self",
        "Aplicação controla os scripts no próprio host.",
        "Comprometimento do host ainda compromete scripts."
      ],
      [
        "Nonce",
        "Script inline dinâmico autorizado por resposta.",
        "Gerar valor imprevisível e único por resposta."
      ],
      [
        "Hash",
        "Bloco inline estável e conhecido.",
        "Qualquer alteração exige atualizar o hash."
      ],
      [
        "strict-dynamic",
        "Bootstrap confiável carrega dependências.",
        "Validar compatibilidade e cadeia de confiança."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.10 Reporting e implantação gradual de CSP",
    "id": "26-10-reporting-e-implantacao-gradual-de-csp"
  },
  {
    "kind": "paragraph",
    "text": "Content-Security-Policy-Report-Only permite observar violações sem bloquear recursos. É útil para inventariar dependências e descobrir código inline, domínios de terceiros e fluxos não documentados. Entretanto, report-only não protege o usuário; ele é uma etapa de implantação. Uma organização madura define prazo para transformar observações em política efetiva."
  },
  {
    "kind": "paragraph",
    "text": "Relatórios podem conter URLs e informações sensíveis. O endpoint de coleta precisa de controle de volume, retenção e privacidade. Eventos devem ser agregados por diretiva, origem e versão da aplicação para distinguir ataques, extensões de navegador, ruído e regressões reais. A política efetiva e a política de observação podem coexistir, permitindo endurecimento progressivo."
  },
  {
    "kind": "paragraph",
    "text": "O rollout recomendado começa por inventário, passa por report-only, corrige violações legítimas, bloqueia diretivas de menor risco e evolui até política restritiva. Alterações de CSP devem participar do pipeline e ser testadas com jornadas críticas, porque um header incorreto pode indisponibilizar todo o front-end mesmo que a API permaneça saudável."
  },
  {
    "kind": "subhead",
    "text": "CSP não é lista de domínios confiáveis"
  },
  {
    "kind": "paragraph",
    "text": "Autorizar um domínio significa aceitar todo conteúdo que ele possa servir naquele contexto. CDNs compartilhadas, endpoints de upload e serviços de terceiros ampliam a superfície. Prefira nonces, hashes e fontes específicas em vez de allowlists excessivamente amplas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.11 HTTP Strict Transport Security",
    "id": "26-11-http-strict-transport-security"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Strict Transport Security permite que um host declare que deve ser acessado apenas por HTTPS. O navegador armazena a política recebida em uma conexão HTTPS válida e, durante max-age, transforma tentativas de HTTP em HTTPS antes de enviar a requisição pela rede. Isso reduz exposição a ataques de downgrade e remoção de TLS após o host ter sido conhecido como seguro."
  },
  {
    "kind": "paragraph",
    "text": "O header possui a diretiva max-age e pode incluir includeSubDomains. Esta última estende a política aos subdomínios e exige inventário completo: qualquer subdomínio sem HTTPS funcional pode se tornar inacessível. A diretiva preload é usada como sinal de intenção para programas de preload, mas a inclusão real depende de requisitos e processos externos ao protocolo."
  },
  {
    "kind": "paragraph",
    "text": "HSTS não corrige certificado expirado, hostname incorreto ou cadeia inválida. Ao contrário, o navegador deve falhar de forma rígida e não oferecer downgrade inseguro. O primeiro acesso continua sendo uma consideração quando o host ainda não está no estado HSTS; preload pode reduzir essa janela, mas aumenta o compromisso operacional de longo prazo."
  },
  {
    "kind": "subhead",
    "text": "HSTS altera decisões futuras do navegador para um host conhecido"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/pt/figure-03-hsts.svg",
    "alt": "Navegador aprendendo HSTS e promovendo HTTP para HTTPS",
    "caption": "Figura 3 - Depois de aprendido, HSTS faz o navegador preferir HTTPS e rejeitar downgrade."
  },
  {
    "kind": "subhead",
    "text": "Exemplos de HSTS"
  },
  {
    "kind": "code",
    "text": "Strict-Transport-Security: max-age=31536000; includeSubDomains\n# Implantação gradual possível\nStrict-Transport-Security: max-age=300\nStrict-Transport-Security: max-age=86400\nStrict-Transport-Security: max-age=31536000; includeSubDomains"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.12 Clickjacking, MIME sniffing e proteção de frames",
    "id": "26-12-clickjacking-mime-sniffing-e-protecao-de-frames"
  },
  {
    "kind": "paragraph",
    "text": "Clickjacking ocorre quando uma aplicação é incorporada de forma invisível ou enganosa em outro site e o usuário interage com controles sem perceber o contexto real. A diretiva CSP frame-ancestors é o mecanismo moderno para controlar quais origens podem enquadrar a página. X-Frame-Options oferece DENY e SAMEORIGIN, permanecendo relevante em compatibilidade, mas não possui a flexibilidade de uma lista de origens."
  },
  {
    "kind": "paragraph",
    "text": "X-Content-Type-Options: nosniff instrui o navegador a respeitar tipos MIME em contextos relevantes em vez de inferir conteúdo executável. Isso reduz cenários em que um recurso servido com tipo incorreto é interpretado como script ou stylesheet. O header não substitui Content-Type correto; ambos devem ser configurados."
  },
  {
    "kind": "paragraph",
    "text": "frame-ancestors protege documentos que podem ser enquadrados, enquanto frame-src controla quais frames a própria página pode carregar. Confundir as duas diretivas produz políticas ineficazes. Também é importante observar que APIs JSON puras normalmente não precisam ser renderizadas em frame, mas portais, consoles administrativos e páginas de autenticação precisam de proteção explícita."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Proteção de frame e tipo de conteúdo são responsabilidades diferentes.",
    "headers": [
      "Cabeçalho ou diretiva",
      "Exemplo",
      "Uso"
    ],
    "rows": [
      [
        "CSP frame-ancestors",
        "frame-ancestors 'none'",
        "Bloqueia incorporação por qualquer origem."
      ],
      [
        "X-Frame-Options",
        "DENY ou SAMEORIGIN",
        "Compatibilidade para proteção contra framing."
      ],
      [
        "X-Content-Type-Options",
        "nosniff",
        "Reduz MIME sniffing em recursos executáveis."
      ],
      [
        "Content-Type",
        "application/json",
        "Declara o tipo real do payload."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.13 Referrer-Policy e Permissions-Policy",
    "id": "26-13-referrer-policy-e-permissions-policy"
  },
  {
    "kind": "paragraph",
    "text": "O header Referer pode revelar URL de origem da navegação ou carregamento. Quando URLs contêm identificadores, parâmetros internos ou estrutura sensível, esse compartilhamento cria risco de privacidade. Referrer-Policy controla quanto da informação é enviado. Políticas como no-referrer, same-origin e strict-origin-when-cross-origin oferecem níveis diferentes de restrição."
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve equilibrar privacidade, antifraude, analytics e troubleshooting. Enviar a URL completa para terceiros raramente é necessário. Uma política orientada a origem reduz exposição de path e query em navegações cross-origin, mantendo informação suficiente para alguns controles. Dados sensíveis não devem estar em URL, mesmo com política restritiva, porque podem aparecer em logs e histórico."
  },
  {
    "kind": "paragraph",
    "text": "Permissions-Policy permite habilitar ou desabilitar recursos de navegador para o documento e frames, como câmera, microfone, geolocalização e fullscreen, conforme o conjunto suportado. O objetivo é reduzir capacidades disponíveis a conteúdo próprio e de terceiros. A antiga nomenclatura Feature-Policy foi substituída; configurações devem usar a sintaxe e os recursos atuais do agente alvo."
  },
  {
    "kind": "subhead",
    "text": "Exemplos de privacidade e capacidades do navegador"
  },
  {
    "kind": "code",
    "text": "Referrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=(self)\n# Exemplo mais restritivo\nReferrer-Policy: no-referrer"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.14 COOP, COEP e CORP",
    "id": "26-14-coop-coep-e-corp"
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin-Opener-Policy controla a relação entre um documento e janelas abertas ou que o abriram. Ao isolar grupos de contexto, reduz ataques e interferências que dependem de referências entre janelas. Cross-Origin-Embedder-Policy exige que recursos cross-origin incorporados sejam explicitamente compartilháveis por CORS ou CORP, conforme o modo adotado."
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin-Resource-Policy permite que um recurso declare se pode ser carregado por documentos de mesma origem, mesmo site ou qualquer contexto permitido. Em conjunto, COOP e COEP podem produzir cross-origin isolation, necessário para algumas APIs poderosas do navegador. Essa configuração deve ser testada porque recursos de terceiros sem headers adequados podem deixar de carregar."
  },
  {
    "kind": "paragraph",
    "text": "Esses cabeçalhos não são substitutos de CSP ou CORS. CORS controla acesso programático a respostas; CORP protege o recurso contra determinados carregamentos cross-origin; COOP separa contextos de navegação; COEP define requisitos de incorporação. A arquitetura precisa saber qual lado publica cada política e como CDNs, imagens, fontes e scripts de terceiros se comportam."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Políticas cross-origin se complementam, mas protegem fronteiras distintas.",
    "headers": [
      "Mecanismo",
      "Pergunta que responde",
      "Exemplo"
    ],
    "rows": [
      [
        "COOP",
        "Com quais janelas este documento compartilha grupo de contexto?",
        "Cross-Origin-Opener-Policy: same-origin"
      ],
      [
        "COEP",
        "Quais recursos cross-origin podem ser incorporados?",
        "Cross-Origin-Embedder-Policy: require-corp"
      ],
      [
        "CORP",
        "Quem pode carregar este recurso?",
        "Cross-Origin-Resource-Policy: same-site"
      ],
      [
        "CORS",
        "Qual origem pode acessar a resposta via navegador?",
        "Access-Control-Allow-Origin: https://app..."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.15 Cache-Control, Clear-Site-Data e cookies",
    "id": "26-15-cache-control-clear-site-data-e-cookies"
  },
  {
    "kind": "paragraph",
    "text": "Respostas sensíveis podem permanecer em cache do navegador, proxy ou CDN. Cache-Control define diretivas para armazenamento e reutilização. no-store é apropriado quando nenhuma retenção é aceitável; private permite cache privado, mas não compartilhado; no-cache exige revalidação antes do uso; max-age define frescor. As diretivas devem ser escolhidas pela semântica da resposta, não por uma regra única para toda a API."
  },
  {
    "kind": "paragraph",
    "text": "Autenticação não torna uma resposta automaticamente não cacheável. Gateways e CDNs precisam considerar Authorization, cookies, Vary e regras explícitas. Uma resposta personalizada armazenada em cache compartilhado pode vazar dados entre usuários. Em contrapartida, desabilitar todo cache indiscriminadamente pode degradar desempenho e aumentar custo. O desenho deve separar conteúdo público, privado, imutável e transacional."
  },
  {
    "kind": "paragraph",
    "text": "Clear-Site-Data permite solicitar limpeza de categorias de dados do site, como cache, cookies e storage, dependendo do suporte. Pode ser útil em logout ou resposta a incidente, mas deve ser usado com cuidado para não eliminar estado legítimo ou causar loops. Não substitui revogação de sessão no servidor."
  },
  {
    "kind": "paragraph",
    "text": "Set-Cookie possui atributos relevantes para segurança. Secure restringe envio a canais seguros; HttpOnly impede acesso por JavaScript; SameSite influencia envio em contextos cross-site; Path e Domain controlam escopo; Max-Age e Expires definem persistência. Cookies de sessão e autenticação devem usar escopo mínimo e não carregar informação sensível em texto claro."
  },
  {
    "kind": "subhead",
    "text": "Exemplos de cache, limpeza e cookie"
  },
  {
    "kind": "code",
    "text": "Cache-Control: no-store\nClear-Site-Data: \"cache\", \"cookies\", \"storage\"\nSet-Cookie: __Host-session=<valor>; Path=/; Secure; HttpOnly; SameSite=Lax\n# Conteúdo público versionado\nCache-Control: public, max-age=31536000, immutable"
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Cache e cookies exigem precisão semântica; nomes intuitivos podem enganar.",
    "headers": [
      "Diretiva ou atributo",
      "Significado operacional",
      "Cuidado"
    ],
    "rows": [
      [
        "no-store",
        "Não armazenar a resposta.",
        "Útil para dados altamente sensíveis."
      ],
      [
        "private",
        "Permitir cache privado, não compartilhado.",
        "Ainda pode permanecer no dispositivo do usuário."
      ],
      [
        "no-cache",
        "Armazenar, mas revalidar antes do uso.",
        "Não significa ausência de armazenamento."
      ],
      [
        "Secure",
        "Enviar cookie apenas por canal seguro.",
        "Depende de HTTPS corretamente implantado."
      ],
      [
        "HttpOnly",
        "Impedir acesso por JavaScript.",
        "Não impede envio automático do cookie."
      ],
      [
        "SameSite",
        "Limitar envio em contexto cross-site.",
        "Escolha depende do fluxo de login e integração."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.16 Cabeçalhos obsoletos e disclosure de tecnologia",
    "id": "26-16-cabecalhos-obsoletos-e-disclosure-de-tecnologia"
  },
  {
    "kind": "paragraph",
    "text": "Nem todo header historicamente recomendado deve continuar sendo implantado. X-XSS-Protection se relaciona a filtros antigos de navegador e não substitui CSP. Public Key Pinning for HTTP criou riscos operacionais significativos e foi abandonado por navegadores; HPKP não deve ser reintroduzido como hardening genérico. Expect-CT perdeu relevância com a evolução de Certificate Transparency e suporte dos agentes."
  },
  {
    "kind": "paragraph",
    "text": "Feature-Policy foi substituído por Permissions-Policy. X-Frame-Options continua útil para compatibilidade, mas frame-ancestors oferece controle moderno. Pragma é legado para cache HTTP/1.0 e não substitui uma política Cache-Control clara. A gestão de headers precisa acompanhar padrões e suporte real, removendo recomendações obsoletas de templates corporativos."
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos como Server e X-Powered-By podem revelar produtos e versões. Reduzir disclosure evita entregar informações desnecessárias, mas não deve ser confundido com correção de vulnerabilidades. Um atacante pode identificar tecnologia por outros sinais. A prioridade continua sendo patching, configuração segura, inventário e redução de superfície."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Segurança exige remover controles obsoletos, não apenas adicionar novos headers.",
    "headers": [
      "Item",
      "Situação recomendada",
      "Alternativa ou observação"
    ],
    "rows": [
      [
        "X-XSS-Protection",
        "Não tratar como controle moderno principal.",
        "Usar CSP e corrigir injeção/XSS."
      ],
      [
        "Public-Key-Pins",
        "Não implantar.",
        "Gerenciar certificados, CT e automação de renovação."
      ],
      [
        "Expect-CT",
        "Não adotar como requisito novo.",
        "Usar ecossistema atual de Certificate Transparency."
      ],
      [
        "Feature-Policy",
        "Migrar.",
        "Usar Permissions-Policy."
      ],
      [
        "X-Powered-By",
        "Remover quando possível.",
        "Não substitui hardening ou patching."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.17 Implementação em aplicações, gateways e CDNs",
    "id": "26-17-implementacao-em-aplicacoes-gateways-e-cdns"
  },
  {
    "kind": "paragraph",
    "text": "A aplicação conhece melhor o conteúdo e deve participar de CSP, cookies, cache e políticas específicas da jornada. O gateway pode aplicar defaults, CORS, HSTS, remoção de disclosure, observabilidade e guardrails. A CDN pode acrescentar ou normalizar headers, mas sua posição no fluxo precisa ser compreendida para evitar sobrescrita e duplicidade."
  },
  {
    "kind": "paragraph",
    "text": "Uma política corporativa madura define uma matriz por tipo de ativo: API JSON pública, API privada, portal estático, aplicação autenticada, console administrativo e download de arquivo. Cada categoria recebe baseline e exceções aprovadas. Aplicar a mesma CSP a uma API JSON e a uma SPA não faz sentido; da mesma forma, CORS pode ser irrelevante para integração exclusivamente servidor-servidor."
  },
  {
    "kind": "paragraph",
    "text": "Configuração como código e testes automatizados reduzem drift. O pipeline pode verificar presença, valor, duplicidade e consistência dos headers. Testes end-to-end devem validar comportamento real no navegador, porque proxies, redirects e respostas de erro podem alterar a política. Em ambientes distribuídos, registre qual componente adicionou ou removeu cada header."
  },
  {
    "kind": "subhead",
    "text": "Ordem de responsabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Evite múltiplos componentes escrevendo o mesmo cabeçalho sem regra de precedência. Defina claramente se aplicação, gateway, ingress, CDN ou servidor web é a fonte autoritativa. Duplicidade pode ser tão perigosa quanto ausência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.18 Troubleshooting e laboratórios",
    "id": "26-18-troubleshooting-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico começa no navegador: Network mostra preflight, redirects, cookies e headers; Console apresenta violações de CORS e CSP; ferramentas de Application mostram cookies e storage. Em seguida, compare a resposta observada no navegador com curl ou um cliente servidor-servidor. Se curl funciona e fetch falha, a diferença provavelmente está no modelo de segurança do navegador, não na conectividade básica."
  },
  {
    "kind": "paragraph",
    "text": "Para CORS, verifique Origin, método, headers solicitados, resposta OPTIONS, resposta real, credenciais, Vary e duplicidade. Para CSP, identifique a diretiva violada, a URL bloqueada, nonce ou hash e política efetiva. Para HSTS, confirme que o header foi recebido por HTTPS, o estado do host e a cobertura de subdomínios. Para cache, observe Age, Cache-Control, Vary e o componente que serviu a resposta."
  },
  {
    "kind": "paragraph",
    "text": "Laboratórios devem ser executados em ambientes autorizados. É útil montar duas origens locais em portas diferentes, observar requisição simples e preflight, ativar credenciais, testar allowlist, implantar CSP em report-only, introduzir um script inline bloqueado, habilitar HSTS com max-age curto e validar headers em respostas de erro do gateway."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - O diagnóstico deve identificar qual agente aplicou a política.",
    "headers": [
      "Sintoma",
      "Camada provável",
      "Evidência a coletar"
    ],
    "rows": [
      [
        "CORS error, backend registrou 200",
        "Política do navegador ou resposta CORS.",
        "Origin, ACAO, credenciais, console e resposta real."
      ],
      [
        "Script não executa após deploy",
        "CSP.",
        "Diretiva violada, nonce/hash e Report-Only."
      ],
      [
        "Subdomínio parou após HSTS",
        "Cobertura includeSubDomains.",
        "Estado HSTS e TLS do subdomínio."
      ],
      [
        "Dados de outro usuário aparecem",
        "Cache compartilhado.",
        "Cache-Control, Vary, chave e headers de identidade."
      ],
      [
        "Iframe legítimo foi bloqueado",
        "frame-ancestors/XFO.",
        "Política efetiva e origem do embedder."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "CORS, CSP e HSTS são mecanismos distintos. CORS controla acesso cross-origin mediado pelo navegador; CSP restringe carregamento e execução de conteúdo; HSTS estabelece uso obrigatório de HTTPS após a política ser aprendida. Nenhum deles substitui segurança de backend, autenticação ou autorização."
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos complementares reduzem outras classes de risco: frame-ancestors e X-Frame-Options tratam clickjacking; X-Content-Type-Options reduz MIME sniffing; Referrer-Policy melhora privacidade; Permissions-Policy limita capacidades; COOP, COEP e CORP participam do isolamento; Cache-Control e atributos de cookies protegem estado e respostas sensíveis."
  },
  {
    "kind": "paragraph",
    "text": "A implantação correta exige ownership, rollout gradual, testes em navegador, consistência em respostas de erro e observabilidade. Templates genéricos sem compreensão podem quebrar aplicações ou produzir falsa sensação de segurança. A política precisa refletir a arquitetura e ser revisada conforme padrões, navegadores e produtos evoluem."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O próximo capítulo aprofunda Rate Limiting, Quotas e Throttling, mecanismos que controlam consumo, protegem capacidade e aplicam contratos operacionais em API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de implementação",
    "id": "checklist-de-implementacao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "CORS possui allowlist explícita e não reflete Origin arbitrariamente.",
      "Preflight é tratado corretamente e não depende de autenticação da operação real.",
      "Headers CORS aparecem também nas respostas de erro relevantes.",
      "Respostas variáveis por origem usam Vary e chave de cache coerente.",
      "CSP foi implantada com inventário, report-only e plano de remoção de unsafe-inline/unsafe-eval.",
      "Scripts inline autorizados usam nonce ou hash corretamente.",
      "HSTS foi ativado gradualmente e includeSubDomains foi precedido de inventário.",
      "frame-ancestors, nosniff, Referrer-Policy e Permissions-Policy possuem valores adequados ao ativo.",
      "COOP, COEP e CORP foram testados com recursos de terceiros.",
      "Cache-Control protege respostas personalizadas e sensíveis sem bloquear cache legítimo indiscriminadamente.",
      "Cookies de sessão usam Secure, HttpOnly, SameSite e escopo mínimo.",
      "Cabeçalhos obsoletos foram removidos do baseline.",
      "Existe um componente autoritativo para cada header e testes contra duplicidade.",
      "Jornadas críticas são testadas em navegador após mudanças de gateway, CDN ou aplicação."
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
      "Explique por que CORS não impede que um cliente servidor-servidor chame uma API.",
      "Diferencie origem e site e relacione a diferença a CORS e SameSite.",
      "Descreva o fluxo completo de preflight para um PUT com Authorization e application/json.",
      "Explique por que Access-Control-Allow-Origin: * não funciona com resposta credentialed.",
      "Proponha uma CSP para uma SPA que carrega scripts próprios e chama uma API específica.",
      "Compare nonce, hash e unsafe-inline.",
      "Explique o risco operacional de includeSubDomains em HSTS.",
      "Diferencie frame-src, frame-ancestors e X-Frame-Options.",
      "Compare no-store e no-cache com um exemplo de API bancária.",
      "Explique as diferenças entre CORS, CORP, COOP e COEP.",
      "Monte um plano de rollout em gateway para CSP e CORS sem indisponibilidade.",
      "Liste evidências necessárias para investigar um erro de CORS que ocorre apenas em produção."
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
        "Allowlist",
        "Conjunto explícito de origens ou fontes autorizadas."
      ],
      [
        "CORS",
        "Protocolo para compartilhamento controlado de recursos entre origens no navegador."
      ],
      [
        "CSP",
        "Política que restringe recursos carregados e executados por uma página."
      ],
      [
        "COEP",
        "Política de requisitos para incorporação cross-origin."
      ],
      [
        "COOP",
        "Política de isolamento entre contextos de navegação."
      ],
      [
        "CORP",
        "Política declarada pelo recurso sobre carregamento cross-origin."
      ],
      [
        "Credentialed request",
        "Requisição CORS que utiliza credenciais segundo o modo do cliente."
      ],
      [
        "HSTS",
        "Política que obriga uso de HTTPS por determinado período."
      ],
      [
        "MIME sniffing",
        "Inferência do tipo de conteúdo pelo navegador em desacordo com o tipo declarado."
      ],
      [
        "Nonce",
        "Valor imprevisível usado para autorizar conteúdo específico em CSP."
      ],
      [
        "Origin",
        "Combinação de esquema, host e porta."
      ],
      [
        "Preflight",
        "Consulta OPTIONS realizada antes de determinadas requisições CORS."
      ],
      [
        "Referrer",
        "Informação sobre o contexto que originou uma navegação ou carregamento."
      ],
      [
        "Same-Origin Policy",
        "Conjunto de restrições que separa contextos de origens diferentes."
      ],
      [
        "Vary",
        "Header que indica dimensões da requisição usadas para selecionar representação em cache."
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
      "WHATWG. Fetch Standard - CORS protocol, preflight e políticas de fetch.",
      "WHATWG. HTML Standard - origem, navegação e políticas de contexto.",
      "W3C. Content Security Policy Level 3.",
      "IETF. RFC 6797 - HTTP Strict Transport Security (HSTS).",
      "IETF. RFC 7034 - HTTP Header Field X-Frame-Options.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9111 - HTTP Caching.",
      "W3C. Referrer Policy.",
      "W3C. Permissions Policy.",
      "W3C. Clear Site Data.",
      "OWASP. HTTP Headers Cheat Sheet e Cross Origin Resource Sharing Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Cabeçalhos e comportamento de navegadores evoluem. Antes de adotar uma política corporativa, valide a especificação atual, o suporte dos navegadores-alvo e o comportamento da versão específica do gateway, ingress, CDN e framework utilizados."
  }
];
