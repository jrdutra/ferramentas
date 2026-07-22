import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const IDENTITY_FEDERATION_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Uma autenticação, múltiplas aplicações e domínios de confiança"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/pt/overview.svg",
    "alt": "Usuário autenticado por um Identity Provider acessando múltiplas aplicações em domínios de confiança",
    "caption": "Figura de abertura - Federação conecta domínios de identidade; SSO reduz desafios repetidos sem eliminar as sessões locais."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Federação transfere confiança entre domínios; SSO reutiliza uma sessão de autenticação sob regras controladas."
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
    "text": "Os capítulos anteriores apresentaram OAuth 2.0, OpenID Connect, JWT/JOSE e SAML 2.0. Cada tecnologia resolve uma parte do problema: delegação de acesso, autenticação moderna, proteção de tokens ou troca de asserções entre organizações. Este capítulo reúne essas peças em uma visão arquitetural mais ampla: como domínios de identidade independentes estabelecem confiança e como uma autenticação realizada em um ponto pode ser reutilizada por várias aplicações."
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation é um arranjo de confiança em que um domínio aceita declarações de identidade produzidas por outro domínio. Single Sign-On é a experiência na qual o usuário acessa múltiplas aplicações sem repetir o desafio de autenticação a cada acesso. Os conceitos se relacionam, mas não são equivalentes. É possível ter SSO dentro de um único domínio sem federação, e é possível federar identidades sem oferecer uma experiência contínua de SSO."
  },
  {
    "kind": "paragraph",
    "text": "A complexidade real aparece quando várias sessões, protocolos, chaves, certificados, identificadores, políticas e ciclos de vida coexistem. A sessão do Identity Provider não é a mesma sessão da aplicação. Um token emitido para uma API não representa necessariamente a sessão do navegador. Logout em uma camada não encerra automaticamente as demais. Account linking mal projetado pode unir identidades erradas. Metadata desatualizada pode interromper toda a federação."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo aprofunda domínios de confiança, topologias, identity brokers, federação SAML e OIDC, sessões, logout, autenticação step-up, multitenancy, B2B/B2C, account linking, federação de workloads, segurança, privacidade, alta disponibilidade e integração com API Gateways. O objetivo é oferecer um modelo mental que permita projetar, operar e diagnosticar federações corporativas complexas."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Em cada fluxo, separe quatro elementos: a sessão no provedor de identidade, a asserção ou token transportado, a sessão local criada pela aplicação e a política de autorização aplicada ao recurso. Muitos problemas de SSO surgem quando essas camadas são tratadas como uma única coisa."
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
      "Distinguir identidade federada, SSO, provisionamento, sincronização e delegação.",
      "Explicar domínios de confiança, IdP, SP, RP, broker, diretório e autoridade de atributos.",
      "Comparar confiança direta, hub-and-spoke, multilateral e federação dinâmica.",
      "Compreender as camadas de sessão no IdP, na aplicação, no navegador e nas APIs.",
      "Relacionar SAML 2.0, OpenID Connect e outros protocolos aos casos de uso de federação.",
      "Projetar metadata, chaves, certificados, endpoints, claims e identificadores de forma governada.",
      "Avaliar account linking, identifiers public/pairwise e riscos de correlação indevida.",
      "Aplicar MFA, step-up, assurance level, acr e amr em jornadas federadas.",
      "Compreender identity brokering, tradução de protocolo e federação B2B/B2C/multitenant.",
      "Diagnosticar loops de login, falhas de logout, clock skew, audience, issuer, metadata e sessão."
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
      "20.1 Identidade federada e SSO: conceitos diferentes",
      "20.2 Domínios de identidade e fronteiras de confiança",
      "20.3 Papéis: IdP, SP, RP, broker e attribute authority",
      "20.4 Topologias de confiança federada",
      "20.5 SSO e as múltiplas camadas de sessão",
      "20.6 Federação com SAML 2.0 e OpenID Connect",
      "20.7 Metadata, chaves, certificados e descoberta",
      "20.8 Onboarding, ciclo de vida e governança de parceiros",
      "20.9 Identificadores, claims e account linking",
      "20.10 MFA, step-up e níveis de garantia",
      "20.11 Logout e encerramento de sessões",
      "20.12 Identity broker e tradução de protocolos",
      "20.13 Multitenancy, B2B, B2C e workforce identity",
      "20.14 Federação de workloads e token exchange",
      "20.15 Segurança, privacidade e ameaças",
      "20.16 Alta disponibilidade e recuperação de desastre",
      "20.17 Integração com API Gateways",
      "20.18 Observabilidade, auditoria e troubleshooting",
      "20.19 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.1 Identidade federada e SSO: conceitos diferentes",
    "id": "20-1-identidade-federada-e-sso-conceitos-diferentes"
  },
  {
    "kind": "paragraph",
    "text": "Federação de identidade é o estabelecimento de uma relação de confiança entre domínios administrativos distintos. Um domínio autentica o sujeito e produz uma asserção; outro domínio aceita essa asserção e cria um principal local ou temporário. O consumidor da asserção não precisa conhecer a senha, o fator biométrico ou o dispositivo usado na autenticação original. Ele confia no processo do emissor e nas condições da mensagem recebida."
  },
  {
    "kind": "paragraph",
    "text": "Single Sign-On descreve uma experiência: depois de autenticar-se uma vez, o usuário acessa aplicações adicionais sem repetir integralmente o desafio. O SSO costuma depender de uma sessão central no IdP. Quando uma nova aplicação redireciona o navegador para esse IdP, a sessão existente permite emitir uma nova asserção. Ainda assim, cada aplicação mantém sessão própria, regras próprias de expiração e autorização independente."
  },
  {
    "kind": "paragraph",
    "text": "Provisionamento e sincronização são problemas diferentes. SCIM, diretórios e processos de IAM podem criar contas e grupos antes do primeiro login; federação permite autenticar e transportar atributos no momento do acesso. Uma organização pode usar just-in-time provisioning durante o primeiro login, mas isso não elimina a necessidade de governar desligamento, mudanças de função e revogação de acesso."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Conceitos relacionados, mas com responsabilidades diferentes.",
    "headers": [
      "Conceito",
      "Pergunta principal",
      "Exemplo"
    ],
    "rows": [
      [
        "Federação",
        "Em qual emissor a aplicação confia?",
        "Empresa A aceita asserções do IdP da Empresa B."
      ],
      [
        "SSO",
        "O usuário precisa autenticar novamente?",
        "Uma sessão no IdP atende várias aplicações."
      ],
      [
        "Provisionamento",
        "A conta existe e possui atributos?",
        "SCIM cria o usuário e grupos no SaaS."
      ],
      [
        "Delegação",
        "Quem age em nome de quem?",
        "Aplicação acessa API em nome do usuário."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.2 Domínios de identidade e fronteiras de confiança",
    "id": "20-2-dominios-de-identidade-e-fronteiras-de-confianca"
  },
  {
    "kind": "paragraph",
    "text": "Um domínio de identidade é o conjunto administrativo que controla cadastro, autenticação, ciclo de vida, políticas, credenciais e atributos de uma população. Em uma federação, o domínio consumidor aceita que outro domínio execute parte dessas responsabilidades. Essa aceitação precisa ser explícita: quais emissores são confiáveis, quais algoritmos são permitidos, quais claims podem orientar autorização e quais níveis de autenticação são suficientes para cada operação."
  },
  {
    "kind": "paragraph",
    "text": "A fronteira de confiança não coincide necessariamente com a rede. Um IdP pode estar na nuvem, o SP em datacenter e o usuário em rede pública. A confiança é criptográfica e administrativa: chaves, certificados, metadata, contratos, auditorias e procedimentos de resposta a incidentes sustentam a relação. Colocar os componentes na mesma VNet ou VPN não substitui validação de issuer, audience, assinatura e condições temporais."
  },
  {
    "kind": "paragraph",
    "text": "Domínios federados também precisam alinhar semântica. O atributo role=admin de um parceiro não deve automaticamente conceder administração local. Claims externos precisam ser mapeados para conceitos internos sob uma política controlada. O consumidor da federação continua responsável por autorizar o acesso ao seu recurso."
  },
  {
    "kind": "subhead",
    "text": "Limite de confiança"
  },
  {
    "kind": "paragraph",
    "text": "Aceitar uma asserção de identidade não significa delegar toda a política de autorização ao emissor. O domínio consumidor deve decidir quais declarações externas são confiáveis, como serão transformadas e quais ações locais elas podem habilitar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.3 Papéis: IdP, SP, RP, broker e attribute authority",
    "id": "20-3-papeis-idp-sp-rp-broker-e-attribute-authority"
  },
  {
    "kind": "paragraph",
    "text": "O Identity Provider autentica o sujeito e emite informações de identidade. Em SAML, a aplicação consumidora é tradicionalmente chamada Service Provider. Em OpenID Connect, ela é chamada Relying Party. Os nomes mudam, mas a função é semelhante: confiar no emissor, validar a mensagem e criar uma sessão ou identidade local."
  },
  {
    "kind": "paragraph",
    "text": "Um identity broker se posiciona entre vários provedores e várias aplicações. Ele recebe asserções de um domínio, aplica transformação de protocolo e claims, e emite nova asserção para outro domínio. O broker reduz o número de integrações ponto a ponto, mas torna-se componente crítico: concentra chaves, políticas, disponibilidade, logs e impacto de configuração incorreta."
  },
  {
    "kind": "paragraph",
    "text": "Uma attribute authority é uma fonte confiável de atributos adicionais, que podem não vir do IdP principal. Em arquiteturas modernas, essa função pode ser exercida por diretórios, APIs de perfil, mecanismos de entitlement ou policy information points. O uso de atributos dinâmicos exige atenção a frescor, consistência e privacidade."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/pt/figure-01-federation-flow.svg",
    "alt": "Fluxo conceitual de federação e SSO entre usuário, aplicação, provedor e sessão local",
    "caption": "Figura 1 - A aplicação cria sessão própria depois de validar a asserção federada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.4 Topologias de confiança federada",
    "id": "20-4-topologias-de-confianca-federada"
  },
  {
    "kind": "paragraph",
    "text": "Na confiança direta, cada aplicação configura individualmente o IdP parceiro. O modelo é simples para poucas relações, porém escala mal: cada mudança de certificado, endpoint ou claim precisa ser coordenada com múltiplos sistemas. Em ecossistemas grandes, o número de integrações cresce rapidamente e a consistência de segurança diminui."
  },
  {
    "kind": "paragraph",
    "text": "No modelo hub-and-spoke, um broker ou federation gateway centraliza as relações. Os IdPs confiam no broker e as aplicações também. O broker normaliza protocolos e atributos, aplica políticas e fornece uma interface mais estável. A vantagem operacional é significativa, mas exige alta disponibilidade e governança rigorosa, pois uma falha afeta várias jornadas."
  },
  {
    "kind": "paragraph",
    "text": "Federações multilaterais utilizam uma autoridade ou metadata agregada para distribuir confiança entre muitos participantes. O setor acadêmico e ecossistemas regulados são exemplos comuns. Em modelos dinâmicos, as entidades constroem cadeias de confiança e consultam statements assinados. Esses arranjos reduzem configuração manual, mas aumentam a complexidade de validação e governança."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/pt/figure-02-trust-topologies.svg",
    "alt": "Comparação entre confiança direta e topologia hub-and-spoke com broker",
    "caption": "Figura 2 - A topologia define como relações de confiança são distribuídas e operadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.5 SSO e as múltiplas camadas de sessão",
    "id": "20-5-sso-e-as-multiplas-camadas-de-sessao"
  },
  {
    "kind": "paragraph",
    "text": "O SSO é frequentemente explicado como uma única sessão, mas a arquitetura real contém várias. O IdP possui uma sessão de autenticação central, normalmente representada por cookie. Cada aplicação cria sua sessão local depois de validar a asserção. APIs podem receber access tokens separados, com audiência e expiração próprias. O navegador mantém cookies e contexto, mas não é a autoridade final sobre nenhuma dessas sessões."
  },
  {
    "kind": "paragraph",
    "text": "Quando o usuário acessa uma segunda aplicação, ela redireciona ao IdP. Se a sessão central ainda é válida e a política permite, o IdP emite nova asserção sem pedir credenciais. Isso é SSO. A segunda aplicação ainda precisa validar issuer, audience, nonce ou InResponseTo, condições temporais e assinatura, e só então criar sessão própria."
  },
  {
    "kind": "paragraph",
    "text": "As políticas de tempo podem divergir. O IdP pode manter sessão por oito horas, enquanto uma aplicação financeira exige reautenticação a cada quinze minutos para ações sensíveis. Outro sistema pode aceitar sessão por uma hora, mas exigir MFA para uma transferência. O SSO não elimina autenticação step-up nem controles de risco."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/pt/figure-03-session-layers.svg",
    "alt": "Camadas independentes de sessão do IdP, aplicação, navegador e access token",
    "caption": "Figura 3 - Sessão central, sessão local e tokens possuem ciclos de vida independentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.6 Federação com SAML 2.0 e OpenID Connect",
    "id": "20-6-federacao-com-saml-2-0-e-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 é amplamente utilizado em SSO corporativo e integração com aplicações web empresariais. Ele transporta assertions XML por bindings como HTTP-Redirect e HTTP-POST. Metadata descreve entity IDs, endpoints, certificados e capacidades. O modelo é maduro, mas exige cuidado com assinatura XML, canonicalização, Destination, AudienceRestriction, Recipient e InResponseTo."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect usa OAuth 2.0 como base e introduz o ID Token, Discovery, UserInfo, scopes de identidade e mecanismos de sessão e logout. Ele se encaixa naturalmente em aplicações web modernas, SPAs, mobile e arquiteturas orientadas a JSON. A validação precisa considerar issuer, audience, azp, nonce, exp, iat, assinatura e algoritmo."
  },
  {
    "kind": "paragraph",
    "text": "A escolha não deve ser tratada como disputa abstrata. SAML pode ser a melhor opção para SaaS corporativo legado e federação workforce; OIDC costuma ser preferido em aplicações modernas e experiências digitais. Identity brokers permitem que um parceiro SAML acesse uma aplicação OIDC ou o contrário, desde que a transformação preserve contexto e segurança."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Os protocolos têm papéis semelhantes, mas ecossistemas e mecanismos diferentes.",
    "headers": [
      "Aspecto",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Formato",
        "XML e assertions.",
        "JSON/JWT e ID Token."
      ],
      [
        "Aplicações típicas",
        "SSO corporativo e SaaS.",
        "Web moderna, mobile, SPA e BFF."
      ],
      [
        "Descoberta",
        "Metadata XML.",
        "Discovery document e JWKS."
      ],
      [
        "Sessão e logout",
        "SLO profile e bindings.",
        "RP-Initiated, front-channel e back-channel."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.7 Metadata, chaves, certificados e descoberta",
    "id": "20-7-metadata-chaves-certificados-e-descoberta"
  },
  {
    "kind": "paragraph",
    "text": "Federação depende de configuração confiável de identificadores, endpoints e chaves. Em SAML, metadata XML pode conter entityID, SingleSignOnService, AssertionConsumerService, SingleLogoutService e certificados. Em OIDC, o Discovery document publica authorization_endpoint, token_endpoint, jwks_uri, issuer e recursos suportados."
  },
  {
    "kind": "paragraph",
    "text": "Chaves e certificados precisam de rotação planejada. A troca deve suportar sobreposição: a nova chave é publicada antes de ser usada, e a antiga permanece disponível até que tokens ou assertions emitidos com ela expirem. Rotação instantânea sem janela de coexistência causa falhas distribuídas difíceis de recuperar."
  },
  {
    "kind": "paragraph",
    "text": "Metadata não deve ser consumida sem validação. URLs, TLS, assinatura da metadata, origem do documento, cache e frequência de atualização precisam ser definidos. Em federação com parceiros, alterações devem passar por processo de change management, contatos técnicos e teste prévio."
  },
  {
    "kind": "subhead",
    "text": "Exemplo resumido de metadata OIDC"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.empresa.example\",\n  \"authorization_endpoint\": \"https://id.empresa.example/authorize\",\n  \"token_endpoint\": \"https://id.empresa.example/token\",\n  \"jwks_uri\": \"https://id.empresa.example/.well-known/jwks.json\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"PS256\"]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.8 Onboarding, ciclo de vida e governança de parceiros",
    "id": "20-8-onboarding-ciclo-de-vida-e-governanca-de-parceiros"
  },
  {
    "kind": "paragraph",
    "text": "Uma federação segura começa antes da primeira mensagem. O onboarding deve identificar responsáveis, domínios, ambientes, endpoints, certificados, claims, audiences, níveis de autenticação, contatos de incidente, janelas de manutenção e critérios de desligamento. Ambientes de teste precisam usar entidades e chaves separadas da produção."
  },
  {
    "kind": "paragraph",
    "text": "O contrato de federação deve definir quem é responsável pela prova de identidade, pelo ciclo de vida do usuário e pela qualidade dos atributos. Se um funcionário deixa a empresa parceira, quanto tempo leva para o acesso ser revogado? Se um certificado vaza, qual é o procedimento de emergência? Se um atributo muda de significado, como as aplicações consumidoras serão protegidas?"
  },
  {
    "kind": "paragraph",
    "text": "A governança precisa inventariar relações ativas, algoritmos, certificados, últimas autenticações, aplicações dependentes e datas de expiração. Federações esquecidas representam risco: chaves antigas, endpoints abandonados e contas sem owner permanecem como caminhos de acesso."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Federação é uma relação de ciclo de vida, não apenas uma configuração inicial.",
    "headers": [
      "Fase",
      "Atividades essenciais",
      "Evidência"
    ],
    "rows": [
      [
        "Onboarding",
        "Troca de metadata, teste, mapping e aprovação.",
        "Checklist e resultado de homologação."
      ],
      [
        "Operação",
        "Monitoramento, rotação e suporte.",
        "Métricas, alertas e contatos válidos."
      ],
      [
        "Mudança",
        "Novo certificado, endpoint ou claim.",
        "Plano de coexistência e rollback."
      ],
      [
        "Offboarding",
        "Bloqueio, remoção de confiança e auditoria.",
        "Confirmação de encerramento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.9 Identificadores, claims e account linking",
    "id": "20-9-identificadores-claims-e-account-linking"
  },
  {
    "kind": "paragraph",
    "text": "O identificador federado precisa ser estável, único dentro do contexto correto e pouco sujeito a reutilização. E-mail pode mudar, ser reciclado ou possuir aliases; por isso, não deve ser a única chave de vínculo. Em OIDC, o par issuer + subject identifica o usuário. Em SAML, NameID e atributos devem ser interpretados dentro da entidade emissora e do formato acordado."
  },
  {
    "kind": "paragraph",
    "text": "Account linking associa uma identidade externa a uma conta local existente. O processo é sensível: ligar automaticamente por e-mail pode permitir takeover quando domínios ou endereços são reutilizados. O vínculo deve exigir prova suficiente de controle das duas identidades, ou seguir processo administrativo verificado."
  },
  {
    "kind": "paragraph",
    "text": "Identificadores pairwise reduzem correlação entre aplicações, pois o mesmo usuário recebe subjects diferentes para cada setor ou cliente. Essa técnica melhora privacidade, porém exige estratégia de suporte e auditoria. Claims devem ser minimizados: a aplicação só deve receber os atributos necessários à finalidade declarada."
  },
  {
    "kind": "subhead",
    "text": "Risco de account linking"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trate coincidência de e-mail como prova universal de que duas identidades pertencem à mesma pessoa. O vínculo precisa considerar emissor, verificação do domínio, ciclo de vida do endereço e uma prova adicional controlada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.10 MFA, step-up e níveis de garantia",
    "id": "20-10-mfa-step-up-e-niveis-de-garantia"
  },
  {
    "kind": "paragraph",
    "text": "Federação precisa transportar não apenas quem foi autenticado, mas como e quando. Aplicações sensíveis podem exigir múltiplos fatores, autenticação resistente a phishing ou reautenticação recente. Em OIDC, acr, amr e auth_time ajudam a expressar contexto. Em SAML, AuthnContextClassRef e SessionIndex cumprem papel relacionado."
  },
  {
    "kind": "paragraph",
    "text": "Step-up ocorre quando uma sessão existente é insuficiente para uma operação de maior risco. A aplicação solicita ao IdP novo nível de autenticação, possivelmente com MFA. O resultado deve ser validado; não basta confiar que o usuário foi redirecionado. Políticas precisam definir quais níveis são aceitos para cada jornada."
  },
  {
    "kind": "paragraph",
    "text": "Assurance level também depende do cadastro inicial, da gestão de credenciais e do dispositivo. Um fator forte aplicado a uma identidade mal verificada não produz garantia alta. Em ecossistemas regulados, níveis precisam ser definidos de forma objetiva e auditável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.11 Logout e encerramento de sessões",
    "id": "20-11-logout-e-encerramento-de-sessoes"
  },
  {
    "kind": "paragraph",
    "text": "Logout federado é difícil porque há várias sessões independentes. Encerrar a sessão local remove o acesso à aplicação, mas a sessão central no IdP pode continuar ativa. Ao retornar, o usuário pode ser autenticado silenciosamente. Encerrar a sessão do IdP pode não alcançar todas as aplicações, especialmente quando cookies de terceiros são bloqueados ou quando uma aplicação está indisponível."
  },
  {
    "kind": "paragraph",
    "text": "SAML Single Logout coordena LogoutRequest e LogoutResponse entre participantes. OIDC define RP-Initiated Logout, front-channel e back-channel. Back-channel é mais confiável para notificar servidores sem depender do navegador, porém exige endpoints autenticados e processamento robusto. Nenhum mecanismo revoga automaticamente todos os access tokens já emitidos, salvo se houver integração com revogação ou introspecção."
  },
  {
    "kind": "paragraph",
    "text": "O desenho precisa distinguir logout da interface, encerramento de sessão local, encerramento no IdP e revogação de tokens. Em aplicações de alto risco, pode ser necessário registrar uma lista de sessões ativas, emitir eventos de revogação e reduzir o tempo de vida dos tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.12 Identity broker e tradução de protocolos",
    "id": "20-12-identity-broker-e-traducao-de-protocolos"
  },
  {
    "kind": "paragraph",
    "text": "O broker reduz integrações ponto a ponto e cria uma camada de abstração. Ele pode receber SAML de um parceiro, converter a identidade em sessão interna e emitir OIDC para aplicações modernas. Também pode consolidar IdPs sociais, workforce e parceiros B2B. A tradução, porém, não deve inventar contexto que não existe na origem."
  },
  {
    "kind": "paragraph",
    "text": "Claims e níveis de autenticação precisam ser normalizados com cuidado. Um AuthnContext SAML não deve ser convertido automaticamente em acr alto sem mapeamento explícito. Grupos externos podem ser convertidos em atributos intermediários, mas a autorização final deve permanecer sob controle do domínio consumidor."
  },
  {
    "kind": "paragraph",
    "text": "O broker também centraliza descoberta de IdP, home realm discovery, políticas de risco, MFA, account linking e sessão. Isso melhora consistência, mas aumenta a criticidade operacional. A arquitetura deve prever escalabilidade, chaves protegidas, segregação de tenants e recuperação de desastre."
  },
  {
    "kind": "subhead",
    "text": "Identity broker como ponto de tradução e política"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/pt/figure-04-identity-broker.svg",
    "alt": "Identity broker normalizando confiança, protocolos, claims e sessões",
    "caption": "Figura 4 - O broker normaliza confiança e protocolos, mas não elimina a responsabilidade da aplicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.13 Multitenancy, B2B, B2C e workforce identity",
    "id": "20-13-multitenancy-b2b-b2c-e-workforce-identity"
  },
  {
    "kind": "paragraph",
    "text": "Workforce identity atende funcionários e terceiros internos; B2B integra identidades de organizações parceiras; B2C atende consumidores em grande escala. Os modelos podem compartilhar tecnologia, mas possuem riscos, atributos e experiências diferentes. Uma política de MFA adequada a funcionário corporativo pode ser inviável para milhões de consumidores; um claim de departamento pode não existir em B2C."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes multitenant, issuer, tenant e audiência precisam ser validados com rigor. Aceitar tokens de qualquer tenant sem allowlist pode permitir acesso indevido. Aplicações precisam decidir se confiam em uma autoridade comum, em tenants específicos ou em um broker que aplica política de admissão."
  },
  {
    "kind": "paragraph",
    "text": "Home realm discovery seleciona o IdP correto com base em domínio, convite, tenant ou escolha do usuário. A descoberta não deve ser vulnerável a spoofing ou encaminhamento para emissores não confiáveis. Convites B2B precisam expirar e estar vinculados à identidade esperada."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Populações diferentes exigem políticas de identidade diferentes.",
    "headers": [
      "População",
      "Características",
      "Controle crítico"
    ],
    "rows": [
      [
        "Workforce",
        "Diretório corporativo e ciclo de RH.",
        "Desligamento rápido e MFA forte."
      ],
      [
        "B2B",
        "Usuários administrados pelo parceiro.",
        "Allowlist de IdPs e contrato de confiança."
      ],
      [
        "B2C",
        "Escala alta e recuperação de conta.",
        "Proteção contra fraude e privacidade."
      ],
      [
        "Workloads",
        "Processos e serviços sem usuário.",
        "Credenciais curtas e atestação do ambiente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.14 Federação de workloads e token exchange",
    "id": "20-14-federacao-de-workloads-e-token-exchange"
  },
  {
    "kind": "paragraph",
    "text": "Federação não se limita a usuários. Workloads em nuvem, clusters e pipelines podem trocar identidades sem armazenar secrets permanentes. Um emissor externo apresenta uma asserção ao security token service, que verifica a origem e emite credencial curta para o domínio de destino. Esse modelo é usado em workload identity federation e integrações entre nuvens."
  },
  {
    "kind": "paragraph",
    "text": "Token Exchange permite transformar um token em outro adequado ao próximo recurso ou domínio. O novo token deve reduzir audiência, escopo e tempo de vida, preservando subject e actor quando necessário. A transformação não deve ampliar privilégios. Logs precisam registrar cadeia de delegação para auditoria."
  },
  {
    "kind": "paragraph",
    "text": "Em microsserviços, a identidade do usuário e a identidade do serviço podem coexistir. O backend precisa saber se a operação foi executada por uma aplicação autônoma ou em nome de um usuário. Claims como sub, client_id e actor ajudam, mas a semântica precisa ser padronizada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.15 Segurança, privacidade e ameaças",
    "id": "20-15-seguranca-privacidade-e-ameacas"
  },
  {
    "kind": "paragraph",
    "text": "Federação concentra riscos de alto impacto. Se a chave do IdP for comprometida, um atacante pode emitir asserções para múltiplas aplicações. Se a aplicação não valida audience ou issuer, pode aceitar tokens destinados a outro serviço. Se RelayState, redirect_uri ou ACS forem manipulados, respostas podem ser desviadas. Replay ocorre quando uma asserção válida é reutilizada fora da janela ou do contexto esperado."
  },
  {
    "kind": "paragraph",
    "text": "Ataques de mix-up exploram confusão entre emissores ou endpoints. Signature wrapping em SAML explora diferenças entre o elemento assinado e o elemento processado. Algoritmos fracos, metadata não autenticada, clock skew excessivo e chaves antigas ampliam a superfície. A defesa exige validação estrita, bibliotecas maduras, pinagem lógica do emissor e monitoramento."
  },
  {
    "kind": "paragraph",
    "text": "Privacidade exige minimização de claims, consentimento quando aplicável, retenção limitada e proteção contra correlação. Um broker que centraliza todas as autenticações possui visão ampla do comportamento dos usuários. Logs devem evitar armazenar tokens completos e dados sensíveis sem necessidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A confiança federada precisa ser limitada por validações e políticas locais.",
    "headers": [
      "Ameaça",
      "Falha típica",
      "Controle"
    ],
    "rows": [
      [
        "Replay",
        "Asserção reutilizada.",
        "Nonce, InResponseTo, jti, janela curta e cache de uso."
      ],
      [
        "Issuer confusion",
        "Token aceito do emissor errado.",
        "Allowlist e validação exata de issuer."
      ],
      [
        "Audience mismatch",
        "Token destinado a outro serviço.",
        "Validar aud e azp quando aplicável."
      ],
      [
        "Key compromise",
        "Emissão fraudulenta em escala.",
        "HSM, rotação, revogação e resposta a incidente."
      ],
      [
        "Claim injection",
        "Atributo externo vira privilégio interno.",
        "Mapping explícito e autorização local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.16 Alta disponibilidade e recuperação de desastre",
    "id": "20-16-alta-disponibilidade-e-recuperacao-de-desastre"
  },
  {
    "kind": "paragraph",
    "text": "O IdP e o broker estão no caminho crítico de login. Uma indisponibilidade pode bloquear várias aplicações ao mesmo tempo. A arquitetura precisa considerar múltiplas instâncias, balanceamento, armazenamento de sessão, replicação de chaves, DNS, health checks e capacidade de sobrevivência a falhas regionais."
  },
  {
    "kind": "paragraph",
    "text": "A recuperação de desastre deve testar não apenas o endpoint, mas também issuer, metadata, certificados e cookies. Alterar issuer durante failover quebra validação. Usar o mesmo issuer em regiões diferentes exige coordenação consistente de chaves e estado. Sessões podem ser perdidas sem impedir novo login, desde que o domínio de confiança permaneça estável."
  },
  {
    "kind": "paragraph",
    "text": "Aplicações precisam definir comportamento quando o IdP está indisponível. Sessões já estabelecidas podem continuar por algum tempo, mas novas autenticações falharão. Bypass manual de autenticação não deve ser usado como contingência improvisada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.17 Integração com API Gateways",
    "id": "20-17-integracao-com-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways participam da federação como consumidores de tokens, pontos de enforcement ou intermediários de tradução. Um gateway pode validar access tokens OIDC/OAuth, converter identidade para headers internos, aplicar políticas por claim e emitir token interno para o backend. Também pode estar atrás de um portal autenticado por SAML ou OIDC."
  },
  {
    "kind": "paragraph",
    "text": "O gateway não deve aceitar cegamente headers de identidade vindos da Internet. Informações como X-User ou X-Roles precisam ser removidas na borda e recriadas apenas depois da validação. A confiança entre gateway e backend deve ser protegida por mTLS, rede controlada ou token sender-constrained."
  },
  {
    "kind": "paragraph",
    "text": "Em Axway API Gateway e Azure API Management, a implementação pode incluir validação JWT, introspecção, políticas, certificados, produtos e subscriptions. O desenho precisa separar autenticação do portal, autenticação do consumidor da API e identidade do backend. Essas identidades podem ser diferentes na mesma jornada."
  },
  {
    "kind": "subhead",
    "text": "Boa prática no gateway"
  },
  {
    "kind": "paragraph",
    "text": "Propague ao backend apenas claims necessárias e normalizadas. Registre issuer, subject, client, tenant, método de autenticação e decisão de política, mas nunca exponha ou grave tokens completos sem necessidade operacional."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.18 Observabilidade, auditoria e troubleshooting",
    "id": "20-18-observabilidade-auditoria-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting de federação precisa reconstruir a cadeia: aplicação inicial, redirecionamento, IdP selecionado, sessão existente, pedido de autenticação, resposta emitida, validação, criação da sessão local e acesso à API. Cada etapa possui IDs, timestamps e logs próprios. A correlação evita atribuir ao IdP um erro produzido pela aplicação ou pelo gateway."
  },
  {
    "kind": "paragraph",
    "text": "Loops de login normalmente indicam que a aplicação não preservou state/RelayState, não conseguiu criar cookie local, rejeitou a asserção ou redirecionou novamente ao IdP. Erros intermitentes podem surgir de clock skew, rotação de chave não propagada, afinidade de sessão, metadata divergente ou cookies SameSite."
  },
  {
    "kind": "paragraph",
    "text": "Auditoria deve registrar autenticação, resultado, IdP, nível de garantia, aplicação, tenant, subject pseudonimizado quando possível, criação e encerramento de sessão, mudança de vínculo e decisão de acesso. Métricas de taxa de sucesso, latência, MFA, falhas por issuer e expiração de certificados ajudam a antecipar incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Diagnóstico federado exige evidência de todas as camadas.",
    "headers": [
      "Sintoma",
      "Evidência a coletar",
      "Hipóteses"
    ],
    "rows": [
      [
        "Loop de login",
        "state/RelayState, cookies e logs da aplicação.",
        "Sessão local não criada ou resposta rejeitada."
      ],
      [
        "Invalid audience",
        "audience esperada e metadata.",
        "Aplicação ou ambiente incorreto."
      ],
      [
        "Assinatura inválida",
        "kid, certificado, JWKS e horário.",
        "Rotação incompleta ou emissor errado."
      ],
      [
        "Logout parcial",
        "sessões locais, IdP e tokens.",
        "Camadas não coordenadas."
      ],
      [
        "Usuário duplicado",
        "issuer, subject, NameID e mapping.",
        "Account linking ou identificador instável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.19 Estudos de caso e laboratórios",
    "id": "20-19-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - SaaS corporativo: funcionários acessam um sistema externo por SAML. O IdP corporativo autentica com MFA e envia NameID persistente e grupos controlados. O SaaS cria sessão local e mapeia grupos para papéis próprios. A governança inclui rotação de certificado, offboarding e teste de SLO."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Portal B2B: parceiros usam seus próprios IdPs. Um broker central aceita SAML ou OIDC, normaliza subject, tenant e assurance, e emite token interno. O portal usa OIDC, enquanto o API Gateway valida access tokens e aplica quotas por organização. Parceiros são permitidos por allowlist e contrato de confiança."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Workload federation: um pipeline em nuvem externa obtém identidade curta por atestação do ambiente e troca essa asserção por token do domínio corporativo. Nenhum secret permanente é armazenado. A audiência é restrita ao serviço de implantação e o token expira em poucos minutos."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Desenhe as sessões de um fluxo SSO com duas aplicações. 2) Compare metadata SAML e Discovery OIDC. 3) Simule rotação de chave com sobreposição. 4) Crie uma matriz de claims externos e papéis internos. 5) Investigue um loop de login usando state, cookies e logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation transfere confiança entre domínios; Single Sign-On reutiliza uma autenticação central para reduzir desafios repetidos. Os conceitos são relacionados, mas não equivalentes. Provisionamento, delegação e autorização continuam sendo responsabilidades separadas."
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura federada é sustentada por emissores, aplicações consumidoras, brokers, metadata, chaves, certificados, claims e políticas. Cada aplicação mantém sessão local, enquanto o IdP mantém sessão central. Logout e revogação precisam coordenar várias camadas independentes."
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 e OpenID Connect oferecem mecanismos maduros para federação. A escolha depende do ecossistema, do tipo de aplicação e da capacidade operacional. Identity brokers simplificam integrações e traduzem protocolos, mas concentram risco e disponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Segurança exige validação estrita de issuer, audience, assinatura, tempo, nonce, InResponseTo e contexto. Claims externos devem ser mapeados, não aceitos como privilégios locais. Governança, observabilidade, alta disponibilidade e gestão de ciclo de vida determinam a qualidade real da federação."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "Com os fundamentos de identidade, autenticação e federação consolidados, o próximo capítulo inicia a camada de plataforma: API Gateways, seus planos de dados e controle, responsabilidades arquiteturais e papel na segurança e governança de APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de federação e SSO",
    "id": "checklist-de-federacao-e-sso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Os domínios de confiança, emissores e aplicações consumidoras estão inventariados.",
      "Issuer, audience, endpoints e identificadores são validados de forma exata.",
      "Metadata e chaves possuem origem confiável, cache e rotação com sobreposição.",
      "Claims externos são minimizados, normalizados e mapeados para conceitos internos.",
      "Account linking exige prova controlada e não depende apenas de e-mail.",
      "A política define MFA, step-up, auth_time e níveis de garantia por jornada.",
      "Sessão do IdP, sessão da aplicação e tokens possuem tempos de vida coerentes.",
      "Logout local, logout central e revogação de tokens estão documentados separadamente.",
      "Brokers possuem alta disponibilidade, segregação de tenants e proteção de chaves.",
      "Federações B2B possuem owner, contato de incidente, offboarding e data de revisão.",
      "Gateways removem headers de identidade não confiáveis e propagam apenas claims normalizadas.",
      "Logs e métricas permitem correlacionar login, emissão, validação, sessão e acesso à API."
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
      "Diferencie identidade federada, SSO, provisionamento e delegação.",
      "Explique por que SSO não significa uma única sessão técnica.",
      "Compare confiança direta e hub-and-spoke com identity broker.",
      "Descreva como SAML e OIDC representam emissor, audiência e sessão.",
      "Explique por que account linking por e-mail pode ser inseguro.",
      "Proponha um fluxo de step-up para uma operação financeira sensível.",
      "Diferencie logout local, logout no IdP e revogação de access token.",
      "Desenhe uma federação B2B multitenant com allowlist de parceiros.",
      "Explique como workload identity federation elimina secrets estáticos.",
      "Liste as evidências necessárias para diagnosticar um loop de login."
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
    "caption": "Tabela 7 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Account linking",
        "Associação controlada entre identidades externas e uma conta local."
      ],
      [
        "Attribute authority",
        "Fonte confiável de atributos adicionais sobre um sujeito."
      ],
      [
        "Federation",
        "Relação de confiança entre domínios de identidade."
      ],
      [
        "Home realm discovery",
        "Processo de selecionar o IdP adequado ao usuário ou tenant."
      ],
      [
        "Identity broker",
        "Intermediário que normaliza confiança, protocolos, claims e sessões."
      ],
      [
        "IdP",
        "Identity Provider que autentica o sujeito e emite asserções."
      ],
      [
        "JIT provisioning",
        "Criação de conta local durante o primeiro login federado."
      ],
      [
        "Pairwise identifier",
        "Identificador diferente do mesmo usuário para cada cliente ou setor."
      ],
      [
        "Relying Party",
        "Aplicação OIDC que confia no OpenID Provider."
      ],
      [
        "Service Provider",
        "Aplicação SAML que consome assertions do IdP."
      ],
      [
        "Single Logout",
        "Coordenação de encerramento de sessões entre participantes."
      ],
      [
        "Single Sign-On",
        "Experiência de acesso a várias aplicações com reutilização de autenticação."
      ],
      [
        "Step-up authentication",
        "Autenticação adicional para elevar o nível de garantia."
      ],
      [
        "Trust domain",
        "Domínio administrativo que controla identidades e políticas de confiança."
      ],
      [
        "Workload federation",
        "Troca de identidade entre ambientes sem secret permanente."
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
      "OASIS. Security Assertion Markup Language (SAML) V2.0 Core, Bindings, Profiles e Metadata.",
      "OpenID Foundation. OpenID Connect Core 1.0.",
      "OpenID Foundation. OpenID Connect Discovery 1.0.",
      "OpenID Foundation. RP-Initiated Logout, Front-Channel Logout e Back-Channel Logout.",
      "IETF. RFC 8693 - OAuth 2.0 Token Exchange.",
      "IETF. RFC 7644 - System for Cross-domain Identity Management: Protocol.",
      "NIST. Digital Identity Guidelines.",
      "OWASP. Authentication, SAML Security e OAuth Security Cheat Sheets.",
      "Microsoft Learn. Identity federation, external identities e workload identity federation.",
      "SPIFFE Project. SPIFFE and SPIRE specifications and documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Protocolos, navegadores, políticas de cookies e produtos de identidade evoluem. Antes de implantar federação, valide a documentação oficial da versão utilizada, os algoritmos permitidos, o comportamento de logout e as capacidades do gateway ou broker no ambiente autorizado."
  }
];
