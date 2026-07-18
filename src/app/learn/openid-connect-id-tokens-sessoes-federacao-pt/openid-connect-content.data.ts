import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OPENID_CONNECT_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Autenticação federada em uma aplicação corporativa"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/overview.svg",
    "alt": "OpenID Connect conectando usuário, Relying Party, OpenID Provider, ID Token e aplicação protegida",
    "caption": "Figura de abertura - OIDC comunica ao cliente um evento de autenticação verificável e interoperável."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O ID Token prova ao cliente um evento de autenticação; o access token autoriza acesso ao resource server."
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
    "text": "O capítulo anterior aprofundou OAuth 2.0 como estrutura de autorização delegada. OAuth permite que um cliente obtenha autoridade limitada para acessar um resource server, mas não define, sozinho, uma forma padronizada de comunicar ao cliente que um usuário foi autenticado. OpenID Connect acrescenta essa camada de identidade ao utilizar os endpoints e mecanismos do OAuth, introduzindo o escopo openid, o ID Token, claims padronizadas, UserInfo, discovery e regras específicas de validação."
  },
  {
    "kind": "paragraph",
    "text": "Essa distinção é decisiva em arquiteturas corporativas. O access token é destinado à API; o ID Token é destinado ao cliente que iniciou a autenticação. Uma aplicação web pode validar o ID Token e criar sua própria sessão, enquanto apresenta access tokens separados ao API Gateway. Encaminhar o ID Token ao backend como se fosse credencial de API mistura destinatários, amplia exposição de dados pessoais e cria validações incorretas."
  },
  {
    "kind": "paragraph",
    "text": "OIDC também organiza problemas que vão além do primeiro login: níveis de autenticação, MFA, step-up, identidade federada, consentimento de claims, identificadores de sujeito, descoberta de metadados, rotação de chaves, sessões distribuídas e logout. Em ambientes com múltiplos tenants e provedores, a segurança depende de associar cada token ao issuer correto e de evitar que metadados ou chaves de um domínio sejam aplicados a outro."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo detalha o Authorization Code Flow com PKCE sob a perspectiva OIDC, a anatomia e validação do ID Token, nonce, state, acr, amr, auth_time, UserInfo, subject identifiers, sessões e mecanismos de logout. Também relaciona os conceitos a aplicações web, SPAs, BFFs, aplicativos nativos, Axway API Gateway, Microsoft Entra e Azure API Management."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Em cada fluxo, marque quatro destinatários: navegador, cliente OIDC, OpenID Provider e API. Depois, associe cada artefato ao destinatário correto: authorization code, ID Token, access token, refresh token, cookie de sessão e logout token."
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
      "Explicar por que OpenID Connect é uma camada de identidade construída sobre OAuth 2.0.",
      "Diferenciar OpenID Provider, Relying Party, End-User, Authorization Server e Resource Server.",
      "Descrever o Authorization Code Flow com scope openid, state, nonce e PKCE.",
      "Interpretar e validar ID Tokens, incluindo iss, sub, aud, azp, exp, iat, nonce, auth_time, acr e amr.",
      "Distinguir ID Token, access token, refresh token, authorization code e resposta UserInfo.",
      "Compreender scopes de identidade e claims solicitadas, essenciais e voluntárias.",
      "Projetar identificadores public e pairwise sem usar e-mail como chave imutável.",
      "Relacionar acr, amr, max_age e prompt a MFA, step-up e políticas de risco.",
      "Distinguir sessão no OpenID Provider, sessão no cliente e autorização perante APIs.",
      "Comparar RP-Initiated, Front-Channel e Back-Channel Logout.",
      "Usar discovery e JWKS com validação de issuer, algoritmos e rotação de chaves.",
      "Diagnosticar falhas OIDC em aplicações, gateways e ambientes federados."
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
      "17.1 OIDC como camada de identidade sobre OAuth 2.0",
      "17.2 Papéis, endpoints e artefatos",
      "17.3 A solicitação de autenticação e o scope openid",
      "17.4 Authorization Code Flow com PKCE",
      "17.5 ID Token: finalidade, formato e claims",
      "17.6 Validação segura do ID Token",
      "17.7 state, nonce, PKCE, c_hash e at_hash",
      "17.8 Claims e scopes de identidade",
      "17.9 UserInfo Endpoint",
      "17.10 Subject identifiers: public e pairwise",
      "17.11 acr, amr, auth_time, max_age e prompt",
      "17.12 MFA, step-up e contexto de autenticação",
      "17.13 Sessões no OP, no RP e perante APIs",
      "17.14 Logout iniciado pelo RP",
      "17.15 Front-Channel e Back-Channel Logout",
      "17.16 Discovery, metadata e JWKS",
      "17.17 Registro de clientes e redirect URIs",
      "17.18 Federação de identidade e cadeia de confiança",
      "17.19 Multi-tenant, múltiplos issuers e account linking",
      "17.20 Aplicações web, SPA, BFF e aplicativos nativos",
      "17.21 OIDC em API Gateways, Axway e Azure",
      "17.22 Ameaças e hardening",
      "17.23 Troubleshooting",
      "17.24 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.1 OIDC como camada de identidade sobre OAuth 2.0",
    "id": "17-1-oidc-como-camada-de-identidade-sobre-oauth-2-0"
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect define uma camada de identidade que permite ao cliente verificar a identidade do usuário com base em uma autenticação realizada por um Authorization Server que também atua como OpenID Provider. O protocolo reutiliza o authorization endpoint, o token endpoint e os grants do OAuth 2.0, mas adiciona semântica de autenticação e um conjunto de mensagens e validações próprias."
  },
  {
    "kind": "paragraph",
    "text": "A ativação de OIDC ocorre quando a solicitação contém o scope openid. Sem esse valor, a transação permanece OAuth e o cliente não deve assumir que receberá um ID Token. Outros scopes, como profile, email, address e phone, solicitam conjuntos padronizados de claims, mas não substituem o scope openid."
  },
  {
    "kind": "paragraph",
    "text": "O principal resultado de autenticação é o ID Token, uma asserção de segurança sobre o evento de autenticação e sobre o identificador do usuário no contexto daquele issuer. O cliente valida essa asserção e decide criar ou atualizar uma sessão local. O ID Token não é uma consulta em tempo real ao diretório e não garante que todos os atributos permaneçam atuais durante toda a sessão."
  },
  {
    "kind": "subhead",
    "text": "Distinção essencial"
  },
  {
    "kind": "paragraph",
    "text": "OAuth responde “qual autoridade este cliente recebeu para acessar um recurso?”. OIDC responde “qual usuário foi autenticado para este cliente, por qual emissor e sob quais condições?”. Um sistema pode usar ambos na mesma transação sem confundir seus tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.2 Papéis, endpoints e artefatos",
    "id": "17-2-papeis-endpoints-e-artefatos"
  },
  {
    "kind": "paragraph",
    "text": "O End-User é a pessoa autenticada. O Relying Party, ou RP, é o cliente OIDC que solicita e consome a autenticação. O OpenID Provider, ou OP, autentica o usuário e emite ID Tokens. Em muitas plataformas, o mesmo produto exerce os papéis de OP e Authorization Server, mas a análise conceitual continua separando autenticação para o cliente e autorização para APIs."
  },
  {
    "kind": "paragraph",
    "text": "O authorization endpoint interage com o navegador para login, consentimento e retorno ao redirect URI. O token endpoint recebe o authorization code por back-channel e devolve tokens. O UserInfo Endpoint é um recurso protegido acessado com access token. O endpoint de discovery publica metadados, e o jwks_uri referencia as chaves públicas usadas na verificação de assinaturas."
  },
  {
    "kind": "paragraph",
    "text": "Os artefatos possuem ciclos de vida diferentes. O authorization code é curto e de uso único. O ID Token descreve a autenticação para o RP. O access token representa autoridade perante um resource server. O refresh token permite obter novos tokens conforme política. Cookies mantêm sessões no OP ou no RP e não devem ser tratados como equivalentes aos tokens."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Cada artefato possui destinatário e finalidade próprios.",
    "headers": [
      "Elemento",
      "Destinatário principal",
      "Finalidade"
    ],
    "rows": [
      [
        "Authorization code",
        "Token endpoint",
        "Representar temporariamente a autorização e vincular front-channel ao back-channel."
      ],
      [
        "ID Token",
        "Relying Party",
        "Comunicar identidade e contexto da autenticação ao cliente."
      ],
      [
        "Access token",
        "Resource Server / API",
        "Autorizar operações protegidas."
      ],
      [
        "Refresh token",
        "Authorization Server",
        "Obter novos tokens sem repetir toda a interação."
      ],
      [
        "UserInfo response",
        "Relying Party",
        "Entregar claims autorizadas sobre o usuário."
      ],
      [
        "Cookie do OP",
        "OpenID Provider",
        "Manter a sessão de autenticação federada."
      ],
      [
        "Cookie do RP",
        "Aplicação cliente",
        "Manter a sessão local da aplicação."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-01-flow.svg",
    "alt": "Authorization Code Flow OIDC separando front-channel, back-channel e criação da sessão local",
    "caption": "Figura 1 - O code trafega pelo navegador, mas os tokens são obtidos no token endpoint por canal direto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.3 Solicitação de autenticação e scope openid",
    "id": "17-3-solicitacao-de-autenticacao-e-scope-openid"
  },
  {
    "kind": "paragraph",
    "text": "A solicitação OIDC é uma authorization request OAuth acrescida de requisitos de identidade. Os parâmetros usuais incluem client_id, response_type, redirect_uri, scope, state, nonce, code_challenge e code_challenge_method. Outros parâmetros, como prompt, max_age, login_hint, ui_locales e acr_values, orientam a experiência ou o nível de autenticação desejado, desde que suportados pelo OP."
  },
  {
    "kind": "paragraph",
    "text": "O redirect_uri precisa corresponder a um valor previamente registrado. Comparações flexíveis, curingas amplos e redirecionamentos derivados de headers externos aumentam o risco de desvio do code e de phishing. O cliente deve gerar state, nonce e code_verifier com entropia suficiente para cada tentativa e associá-los à transação local antes de redirecionar o navegador."
  },
  {
    "kind": "paragraph",
    "text": "O parâmetro scope deve conter openid. Scopes adicionais indicam grupos de claims que o cliente solicita, mas o OP ainda aplica política, consentimento e minimização. Solicitar profile não garante que todas as claims do conjunto serão retornadas no ID Token; algumas podem aparecer em UserInfo ou ser omitidas."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - Authorization Request"
  },
  {
    "kind": "code",
    "text": "GET /authorize?\n  response_type=code\n  &client_id=portal-web\n  &redirect_uri=https%3A%2F%2Fportal.example%2Fcallback\n  &scope=openid%20profile%20email\n  &state=Qm9uZGluZy1mbG93LTE\n  &nonce=bm9uY2UtZm9yLWlkLXRva2Vu\n  &code_challenge=9Fq...\n  &code_challenge_method=S256 HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.4 Authorization Code Flow com PKCE",
    "id": "17-4-authorization-code-flow-com-pkce"
  },
  {
    "kind": "paragraph",
    "text": "No fluxo recomendado, o navegador é redirecionado ao authorization endpoint, o OP autentica o usuário e retorna um authorization code ao redirect URI do cliente. O cliente valida state e envia o code ao token endpoint junto ao code_verifier. Um cliente confidencial também se autentica no token endpoint por mecanismo compatível, preferencialmente credencial assimétrica ou método adequado ao ambiente."
  },
  {
    "kind": "paragraph",
    "text": "O PKCE vincula o code à instância que iniciou a transação. O code_challenge foi enviado na solicitação inicial e o code_verifier é revelado apenas na troca. Mesmo que um atacante intercepte o code, não consegue trocá-lo sem o verifier. PKCE não substitui state nem nonce: cada valor protege uma relação diferente."
  },
  {
    "kind": "paragraph",
    "text": "A resposta do token endpoint pode conter ID Token, access token, token_type, expires_in e, conforme política, refresh token. O cliente não deve criar uma sessão somente porque recebeu HTTP 200. Primeiro valida a resposta, o ID Token, o issuer, a audience, a assinatura, a janela temporal, nonce e demais requisitos do fluxo."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - troca do authorization code"
  },
  {
    "kind": "code",
    "text": "POST /token HTTP/1.1\nHost: id.example\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code&\ncode=SplxlOBeZQQYbYS6WxSbIA&\nredirect_uri=https%3A%2F%2Fportal.example%2Fcallback&\nclient_id=portal-web&\ncode_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-02.svg",
    "alt": "Estrutura de um ID Token com header, payload, assinatura e destinatário explícito",
    "caption": "Figura 2 - O ID Token é uma asserção destinada ao cliente OIDC, não uma credencial universal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.5 ID Token: finalidade, formato e claims",
    "id": "17-5-id-token-finalidade-formato-e-claims"
  },
  {
    "kind": "paragraph",
    "text": "O ID Token é um JWT que contém claims sobre a autenticação do usuário. Ele é assinado pelo OP e pode, em cenários específicos, também ser criptografado para o cliente. A assinatura oferece integridade e autenticação da origem; não oferece confidencialidade. Qualquer claim sensível incluída em um JWT apenas assinado pode ser lida por quem obtiver o valor."
  },
  {
    "kind": "paragraph",
    "text": "As claims fundamentais incluem iss, que identifica o emissor; sub, que identifica o usuário de forma local ao issuer; aud, que identifica o cliente destinatário; exp e iat, que delimitam validade e emissão. Dependendo do fluxo e da solicitação, aparecem nonce, auth_time, acr, amr, azp, at_hash e c_hash."
  },
  {
    "kind": "paragraph",
    "text": "O cliente deve usar a combinação iss e sub como chave externa estável. E-mail, telefone e nome são atributos mutáveis e podem ser reciclados. Em arquiteturas multi-tenant, o tenant ou o issuer completo também participa da identidade; usar apenas sub sem contexto pode produzir colisões entre emissores."
  },
  {
    "kind": "subhead",
    "text": "Payload ilustrativo de ID Token"
  },
  {
    "kind": "code",
    "text": "{\n  \"iss\": \"https://id.example\",\n  \"sub\": \"248289761001\",\n  \"aud\": \"portal-web\",\n  \"exp\": 1784127000,\n  \"iat\": 1784126100,\n  \"auth_time\": 1784126000,\n  \"nonce\": \"bm9uY2UtZm9yLWlkLXRva2Vu\",\n  \"acr\": \"urn:example:loa:2\",\n  \"amr\": [\"pwd\", \"otp\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "ID Token não é access token"
  },
  {
    "kind": "paragraph",
    "text": "Mesmo quando ambos são JWTs e compartilham algumas claims, seus destinatários e semânticas são diferentes. A API deve validar o access token emitido para sua audiência; o cliente valida o ID Token emitido para seu client_id."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-03.svg",
    "alt": "Cadeia obrigatória de validação criptográfica, temporal e contextual do ID Token",
    "caption": "Figura 3 - A verificação criptográfica é apenas uma etapa da validação contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.6 Validação segura do ID Token",
    "id": "17-6-validacao-segura-do-id-token"
  },
  {
    "kind": "paragraph",
    "text": "O cliente deve comparar iss com o issuer esperado de forma exata. Em seguida, seleciona uma chave confiável para verificar a assinatura e restringe algoritmos aos explicitamente aceitos. O valor alg do próprio token não pode decidir sozinho a política. O kid auxilia a seleção de chave, mas não substitui a confiança no jwks_uri associado ao issuer."
  },
  {
    "kind": "paragraph",
    "text": "A claim aud precisa conter o client_id do RP. Quando há múltiplas audiences, azp identifica a parte autorizada e deve ser avaliada conforme as regras do protocolo. exp deve estar no futuro dentro da tolerância de relógio; iat não pode ser absurdamente distante; auth_time é validado quando a solicitação exige idade máxima da autenticação."
  },
  {
    "kind": "paragraph",
    "text": "Se nonce foi enviado, o token deve conter o mesmo valor associado à tentativa local. Claims de segurança como acr e amr somente devem ser usadas quando sua semântica é documentada e confiável naquele issuer. A presença de uma string parecida com “mfa” não cria, por si só, garantia interoperável de nível de assurance."
  },
  {
    "kind": "paragraph",
    "text": "Bibliotecas OIDC maduras realizam grande parte das verificações, mas ainda exigem configuração correta de issuer, client_id, algoritmos, redirect URIs e armazenamento de estado. Decodificar o JWT manualmente e observar claims não equivale a validá-lo."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - A aceitação do ID Token depende de validações criptográficas e semânticas.",
    "headers": [
      "Verificação",
      "Falha evitada",
      "Evidência"
    ],
    "rows": [
      [
        "iss exato",
        "Aceitar token de emissor não autorizado",
        "Issuer obtido de configuração confiável."
      ],
      [
        "Assinatura e alg",
        "Token adulterado ou algoritmo indevido",
        "JWK correspondente e allowlist de algoritmos."
      ],
      [
        "aud / azp",
        "Token emitido para outro cliente",
        "client_id presente e parte autorizada coerente."
      ],
      [
        "exp / iat / auth time",
        "Replay fora da janela ou sessão antiga",
        "Relógio sincronizado e tolerância limitada."
      ],
      [
        "nonce",
        "Reuso ou substituição de resposta de autenticação",
        "Valor por transação armazenado no cliente."
      ],
      [
        "acr / amr",
        "Aceitar autenticação abaixo do requisito",
        "Semântica definida pelo issuer e política local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.7 state, nonce, PKCE, c_hash e at_hash",
    "id": "17-7-state-nonce-pkce-c-hash-e-at-hash"
  },
  {
    "kind": "paragraph",
    "text": "state vincula a resposta de autorização à transação iniciada pelo cliente e auxilia a proteção contra CSRF e injeção de respostas. nonce vincula o ID Token à solicitação de autenticação e reduz replay de tokens. PKCE vincula a troca do authorization code à instância que produziu o code_challenge. Os três valores podem coexistir e não devem ser reutilizados entre tentativas."
  },
  {
    "kind": "paragraph",
    "text": "Em response types que retornam artefatos pelo authorization endpoint, c_hash e at_hash podem vincular, respectivamente, o authorization code e o access token ao ID Token. A validação usa parte do hash calculado com algoritmo relacionado à assinatura. Em um fluxo code puro, a biblioteca pode não exigir ambos, mas o implementador precisa seguir as regras do response type realmente utilizado."
  },
  {
    "kind": "paragraph",
    "text": "Armazenar esses valores apenas em variáveis globais ou em localStorage sem vínculo a uma tentativa permite colisões e ataques por abas concorrentes. O cliente deve manter um registro de transação com issuer, client_id, redirect_uri, state, nonce, code_verifier, horário e parâmetros esperados, removendo-o após sucesso ou expiração."
  },
  {
    "kind": "paragraph",
    "text": "Valor O que vincula Onde é validado"
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Valores de correlação protegem relações distintas do fluxo.",
    "headers": [
      "Valor",
      "O que vincula",
      "Onde é validado"
    ],
    "rows": [
      [
        "state",
        "Solicitação e resposta de autorização",
        "No callback, antes de processar code ou erro."
      ],
      [
        "nonce",
        "Solicitação e ID Token",
        "Dentro do ID Token após validação de assinatura."
      ],
      [
        "code_verifier",
        "Authorization request e token request",
        "No token endpoint pelo OP."
      ],
      [
        "c hash",
        "Authorization code e ID Token",
        "No cliente quando exigido pelo response type."
      ],
      [
        "at hash",
        "Access token e ID Token",
        "No cliente quando exigido pelo response type."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.8 Claims e scopes de identidade",
    "id": "17-8-claims-e-scopes-de-identidade"
  },
  {
    "kind": "paragraph",
    "text": "OIDC define claims padronizadas para perfil, e-mail, endereço e telefone. Scopes como profile e email são atalhos para solicitar conjuntos de claims. A resposta efetiva depende do OP, do consentimento, da política e do local de entrega. Uma claim pode aparecer no ID Token, na resposta UserInfo ou em ambos."
  },
  {
    "kind": "paragraph",
    "text": "O parâmetro claims permite solicitar claims individualmente e indicar se são essenciais. “Essential” expressa requisito do cliente, mas não obriga um OP incapaz a fabricar o dado; a transação pode falhar ou prosseguir conforme suporte e política. Valores esperados também podem ser informados para algumas claims, exigindo cuidado com interoperabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Minimização é uma propriedade de segurança e privacidade. O cliente deve solicitar apenas os atributos necessários e evitar persistir cópias indefinidas. Claims de grupos e roles podem crescer, variar entre diretórios ou representar estado administrativo; não devem ser tratadas como substitutas universais de autorização de objeto e de regras do domínio."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - parâmetro claims"
  },
  {
    "kind": "code",
    "text": "{\n  \"id_token\": {\n    \"acr\": {\"essential\": true, \"values\": [\"urn:example:loa:2\"]},\n    \"email\": {\"essential\": true}\n  },\n  \"userinfo\": {\n    \"given_name\": null,\n    \"family_name\": null\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.9 UserInfo Endpoint",
    "id": "17-9-userinfo-endpoint"
  },
  {
    "kind": "paragraph",
    "text": "O UserInfo Endpoint é um recurso protegido que retorna claims sobre o usuário associado ao access token. O cliente chama esse endpoint com bearer token ou mecanismo sender-constrained, conforme o perfil adotado. A resposta normalmente é JSON assinado ou não, dependendo da configuração e dos metadados do OP."
  },
  {
    "kind": "paragraph",
    "text": "O cliente precisa validar que a claim sub de UserInfo é idêntica ao sub do ID Token. Essa comparação impede que claims de outro usuário sejam associadas à sessão atual. O fato de a conexão usar TLS não elimina essa validação semântica."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo é útil quando o cliente precisa de claims que não deveriam aumentar o ID Token ou quando o OP aplica entrega seletiva. Entretanto, cada chamada adiciona dependência de rede e tratamento de indisponibilidade. O desenho deve decidir quais dados são necessários no login, quais podem ser carregados sob demanda e por quanto tempo podem ser armazenados."
  },
  {
    "kind": "subhead",
    "text": "Cuidado com dados pessoais"
  },
  {
    "kind": "paragraph",
    "text": "ID Tokens e UserInfo podem conter dados pessoais. Não registre respostas completas em logs, traces ou ferramentas de erro. Prefira identificadores mínimos, mascaramento e controles de retenção alinhados à finalidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.10 Subject identifiers: public e pairwise",
    "id": "17-10-subject-identifiers-public-e-pairwise"
  },
  {
    "kind": "paragraph",
    "text": "A claim sub fornece um identificador localmente único e nunca reatribuído dentro do issuer. No modo public, o mesmo usuário tende a receber o mesmo sub para diferentes clientes. No modo pairwise, o OP calcula um identificador diferente por setor de clientes, reduzindo a possibilidade de correlacionar o usuário entre aplicações independentes."
  },
  {
    "kind": "paragraph",
    "text": "Pairwise subject identifiers são relevantes para privacidade, mas exigem planejamento de account linking, suporte e migração. Dois clientes do mesmo setor podem compartilhar o mesmo sub conforme a política do OP; clientes de setores diferentes recebem valores distintos mesmo para a mesma pessoa."
  },
  {
    "kind": "paragraph",
    "text": "O banco da aplicação deve persistir issuer e sub como chave federada, mantendo atributos como e-mail em campos atualizáveis. Quando há migração de issuer, fusão de tenants ou troca de estratégia de subject, a associação precisa de procedimento explícito e prova adicional; não deve ser inferida apenas por coincidência de e-mail."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O identificador de sujeito deve equilibrar estabilidade e privacidade.",
    "headers": [
      "Estratégia",
      "Vantagem",
      "Atenção operacional"
    ],
    "rows": [
      [
        "Public subject",
        "Facilita correlação entre clientes do mesmo issuer.",
        "Aumenta possibilidade de rastreamento entre aplicações."
      ],
      [
        "Pairwise subject",
        "Reduz correlação entre setores de clientes.",
        "Exige sector identifier e planejamento de linking."
      ],
      [
        "E-mail como chave",
        "Parece simples para o negócio.",
        "É mutável, pode ser reciclado e não é identificador seguro."
      ],
      [
        "iss + sub",
        "Identidade federada estável no domínio do emissor.",
        "Precisa ser preservada em migrações e multi-tenant."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.11 acr, amr, auth_time, max_age e prompt",
    "id": "17-11-acr-amr-auth-time-max-age-e-prompt"
  },
  {
    "kind": "paragraph",
    "text": "acr representa uma classe ou contexto de autenticação alcançado, conforme vocabulário do issuer ou de um perfil. amr lista métodos utilizados, como senha, OTP, biometria ou hardware, mas os valores e combinações precisam ser interpretados conforme documentação do OP. auth_time registra quando a autenticação ativa ocorreu."
  },
  {
    "kind": "paragraph",
    "text": "O cliente pode usar max_age para exigir que a autenticação não seja mais antiga que determinado limite. Quando max_age é solicitado, auth_time torna-se essencial para a verificação. prompt controla a interação: none tenta autenticação silenciosa; login força nova autenticação; consent força nova decisão de consentimento; select_account solicita escolha de conta, conforme suporte."
  },
  {
    "kind": "paragraph",
    "text": "acr_values expressa preferência por contextos de autenticação. Em operações de alto risco, o cliente pode iniciar um novo fluxo com requisito mais forte. A política não deve confiar apenas em parâmetros enviados pelo front-end; o OP e o cliente precisam validar que o contexto retornado satisfaz a regra da operação."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Claims e parâmetros descrevem recência e contexto de autenticação.",
    "headers": [
      "Claim / parâmetro",
      "Significado",
      "Uso típico"
    ],
    "rows": [
      [
        "acr",
        "Classe de contexto de autenticação alcançada",
        "Comparar com nível exigido pela operação."
      ],
      [
        "amr",
        "Métodos utilizados na autenticação",
        "Auditoria e políticas específicas do issuer."
      ],
      [
        "auth time",
        "Instante da autenticação ativa",
        "Validar max age e recência."
      ],
      [
        "max age",
        "Idade máxima aceitável da autenticação",
        "Forçar reautenticação para operação sensível."
      ],
      [
        "prompt",
        "Comportamento de interação solicitado",
        "none, login, consent ou select account."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.12 MFA, step-up e contexto de autenticação",
    "id": "17-12-mfa-step-up-e-contexto-de-autenticacao"
  },
  {
    "kind": "paragraph",
    "text": "MFA significa utilizar fatores independentes, não apenas duas etapas do mesmo fator. O RP normalmente não implementa os autenticadores; ele solicita ou verifica um contexto emitido pelo OP. Para uma operação de alto risco, o cliente pode iniciar step-up e exigir nova autenticação com acr ou política equivalente."
  },
  {
    "kind": "paragraph",
    "text": "A decisão deve considerar a autenticação já realizada, o risco atual, o dispositivo, o recurso e o tempo desde a última prova. Um usuário pode ter sessão SSO válida no OP, mas ainda precisar de uma autenticação adicional para autorizar pagamento, alterar credenciais ou acessar dados sensíveis."
  },
  {
    "kind": "paragraph",
    "text": "O resultado de step-up precisa ser vinculado à operação ou à sessão apropriada. Aceitar um ID Token antigo que continha MFA, sem avaliar auth_time e o contexto da transação, permite reutilização indevida. Em sistemas críticos, a confirmação de negócio pode exigir controles além de OIDC, como assinatura transacional ou aprovação independente."
  },
  {
    "kind": "subhead",
    "text": "Princípio de assurance"
  },
  {
    "kind": "paragraph",
    "text": "Não trate acr e amr como strings universais. Defina quais valores cada issuer pode emitir, o que significam, como são auditados e quais operações aceitam cada nível. Em federações, esse mapeamento precisa fazer parte do acordo de confiança."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-04.svg",
    "alt": "Sessões do OpenID Provider, Relying Party, tokens OAuth e estado da API",
    "caption": "Figura 4 - SSO, sessão local e autorização de API são estados relacionados, mas independentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.13 Sessões no OP, no RP e perante APIs",
    "id": "17-13-sessoes-no-op-no-rp-e-perante-apis"
  },
  {
    "kind": "paragraph",
    "text": "A sessão no OP permite Single Sign-On entre clientes que confiam no mesmo provedor. Ela costuma ser representada por cookie sob o domínio do OP. Quando outro RP envia uma authorization request, o OP pode reutilizar a autenticação existente, desde que política, prompt e max_age permitam."
  },
  {
    "kind": "paragraph",
    "text": "A sessão no RP é criada pela aplicação após validar o ID Token. Em uma aplicação web tradicional ou BFF, um cookie HttpOnly, Secure e com SameSite adequado referencia estado no servidor. Em SPA pura, bibliotecas podem manter tokens no navegador, o que aumenta a importância de proteção contra XSS e reduz as garantias de confidencialidade de segredos."
  },
  {
    "kind": "paragraph",
    "text": "A API normalmente valida access tokens a cada chamada e não conhece o cookie do OP nem o cookie do RP. Expirar a sessão local impede novas ações pelo navegador, mas não necessariamente revoga access tokens já emitidos. Da mesma forma, revogar um refresh token não limpa automaticamente todos os cookies de sessão."
  },
  {
    "kind": "paragraph",
    "text": "O desenho de sessão precisa definir tempos absolutos e de inatividade, renovação, rotação, revogação, reautenticação e comportamento em múltiplos dispositivos. A experiência “sair de todos os lugares” exige inventário e coordenação entre sessões e tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.14 Logout iniciado pelo Relying Party",
    "id": "17-14-logout-iniciado-pelo-relying-party"
  },
  {
    "kind": "paragraph",
    "text": "No RP-Initiated Logout, o cliente redireciona o navegador ao endpoint de logout do OP. Parâmetros comuns incluem id_token_hint, post_logout_redirect_uri, client_id e state, conforme suporte e regras do provedor. O post_logout_redirect_uri deve estar previamente registrado para evitar redirecionamento aberto."
  },
  {
    "kind": "paragraph",
    "text": "id_token_hint auxilia o OP a identificar a sessão e o cliente, mas não deve ser tratado como token de acesso. state pode correlacionar o retorno pós-logout e proteger a navegação. O RP deve limpar sua sessão local independentemente de o redirecionamento final ocorrer, evitando que uma falha de rede mantenha o usuário aparentemente autenticado na aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Logout iniciado pelo RP não garante, sozinho, que todas as outras aplicações conectadas ao OP sejam encerradas. O OP pode oferecer propagação por front-channel ou back-channel. A política de produto precisa deixar claro se “sair” significa encerrar apenas a aplicação atual, a sessão do provedor ou todas as sessões conhecidas."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - RP-Initiated Logout"
  },
  {
    "kind": "code",
    "text": "GET /logout?\n  id_token_hint=eyJ...\n  &post_logout_redirect_uri=https%3A%2F%2Fportal.example%2Fsigned-out\n  &state=bG9nb3V0LXRyYW5zYWN0aW9u HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-05.svg",
    "alt": "Comparação entre RP-Initiated, Front-Channel, Back-Channel Logout e sessão local",
    "caption": "Figura 5 - Os mecanismos de logout diferem pelo canal usado e pela dependência do navegador."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.15 Front-Channel e Back-Channel Logout",
    "id": "17-15-front-channel-e-back-channel-logout"
  },
  {
    "kind": "paragraph",
    "text": "Front-Channel Logout utiliza o user agent para carregar URLs de logout dos RPs. O mecanismo é simples e compatível com aplicações web, mas depende do navegador, de cookies e da conclusão das navegações. Restrições a cookies de terceiros e iframes podem reduzir a confiabilidade em alguns ambientes."
  },
  {
    "kind": "paragraph",
    "text": "Back-Channel Logout envia uma requisição direta do OP ao endpoint registrado pelo RP. O corpo contém um logout token assinado, com eventos específicos e identificadores como sid ou sub. O RP valida issuer, audience, assinatura, tempo, jti e evento antes de invalidar a sessão correspondente. O endpoint deve ser idempotente, resiliente e não depender de cookie do navegador."
  },
  {
    "kind": "paragraph",
    "text": "Session Management e polling de estado também podem detectar mudanças, mas o desenho deve preferir mecanismos finais e suportados pelo ecossistema. Nenhum logout substitui expiração curta de tokens, revogação quando aplicável e autorização contínua para operações de alto risco."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Logout precisa ser projetado como propagação de estado, não como um único redirect.",
    "headers": [
      "Mecanismo",
      "Canal",
      "Pontos fortes",
      "Limitações"
    ],
    "rows": [
      [
        "RP-Initiated",
        "Navegador do RP ao OP",
        "Experiência explícita de saída.",
        "Não propaga sozinho a todos os RPs."
      ],
      [
        "Front-Channel",
        "Navegador do OP aos RPs",
        "Implementação web direta.",
        "Depende do user agent, cookies e rede."
      ],
      [
        "Back-Channel",
        "OP chama endpoint do RP",
        "Não depende do navegador; mais determinístico.",
        "Exige endpoint, validação e tratamento resiliente."
      ],
      [
        "Expiração local",
        "Controle do próprio RP",
        "Sempre disponível e simples.",
        "Não encerra sessão do OP ou de outros RPs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.16 Discovery, metadata e JWKS",
    "id": "17-16-discovery-metadata-e-jwks"
  },
  {
    "kind": "paragraph",
    "text": "OIDC Discovery publica um documento de configuração em um endereço well-known derivado do issuer. O documento informa authorization_endpoint, token_endpoint, userinfo_endpoint, jwks_uri, end_session_endpoint quando disponível, response types, scopes, claims, métodos de autenticação de cliente e algoritmos suportados."
  },
  {
    "kind": "paragraph",
    "text": "O cliente deve iniciar a descoberta a partir de issuer previamente confiável e verificar que o issuer publicado no documento corresponde exatamente ao esperado. Não deve aceitar um issuer fornecido livremente pelo usuário e, a partir dele, buscar metadados sem política, pois isso permite SSRF, mix-up e confiança em provedores não autorizados."
  },
  {
    "kind": "paragraph",
    "text": "jwks_uri publica chaves públicas. Bibliotecas armazenam cache e usam kid para selecionar a chave. A rotação exige período de sobreposição: tokens assinados com chave anterior ainda podem estar válidos enquanto a nova chave já é publicada. Em falha de kid, o cliente pode atualizar o JWKS de forma controlada, evitando loops de rede causados por tokens maliciosos."
  },
  {
    "kind": "subhead",
    "text": "Trecho ilustrativo - OpenID Provider Metadata"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"userinfo_endpoint\": \"https://id.example/userinfo\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"end_session_endpoint\": \"https://id.example/logout\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"ES256\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "Metadados são configuração de segurança"
  },
  {
    "kind": "paragraph",
    "text": "Discovery reduz configuração manual, mas não transforma qualquer endpoint em confiável. O issuer raiz deve vir de configuração, allowlist ou cadeia de federação validada; redirects e jwks_uri continuam sujeitos a restrições de rede e política."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.17 Registro de clientes e redirect URIs",
    "id": "17-17-registro-de-clientes-e-redirect-uris"
  },
  {
    "kind": "paragraph",
    "text": "O OP precisa conhecer cada cliente: client_id, tipo de aplicação, redirect URIs, post-logout redirect URIs, métodos de autenticação, chaves, scopes e políticas. Clientes públicos não conseguem manter segredo confiável; clientes confidenciais precisam proteger credenciais e preferir autenticação assimétrica quando o risco justificar."
  },
  {
    "kind": "paragraph",
    "text": "Redirect URIs devem ser exatas e usar HTTPS, exceto exceções controladas para loopback de aplicativos nativos. Custom URI schemes exigem proteção contra colisão e preferência por app links ou universal links quando disponíveis. Curingas e prefix matching amplos podem permitir que o authorization code seja entregue a destino controlado por atacante."
  },
  {
    "kind": "paragraph",
    "text": "Registro dinâmico pode automatizar ecossistemas, mas amplia a superfície administrativa. Software statements, políticas, autenticação do registrante, validação de metadados e lifecycle management tornam-se necessários. Em ambientes corporativos comuns, registro governado por catálogo e pipeline oferece maior previsibilidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - A classificação do cliente determina controles possíveis, não apenas o nome do aplicativo.",
    "headers": [
      "Tipo de cliente",
      "Armazenamento de credencial",
      "Recomendação"
    ],
    "rows": [
      [
        "Web server / BFF",
        "Pode proteger segredo ou chave no servidor",
        "Code + PKCE e autenticação forte no token endpoint."
      ],
      [
        "SPA no navegador",
        "Não possui segredo confiável",
        "Code + PKCE; reduzir tokens no browser e avaliar BFF."
      ],
      [
        "Aplicativo nativo",
        "Usa armazenamento do sistema, mas é cliente público",
        "Code + PKCE com browser externo e redirect seguro."
      ],
      [
        "Daemon confidencial",
        "Pode usar chave, certificado ou identidade de workload",
        "Client Credentials para APIs; OIDC somente quando há usuário."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/pt/figure-06.svg",
    "alt": "Cadeia de confiança federada entre Relying Party, metadata, chaves, políticas e OpenID Provider",
    "caption": "Figura 6 - Federação depende de uma cadeia explícita de metadados, chaves, políticas e governança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.18 Federação de identidade e cadeia de confiança",
    "id": "17-18-federacao-de-identidade-e-cadeia-de-confianca"
  },
  {
    "kind": "paragraph",
    "text": "Federação permite que uma aplicação confie na autenticação realizada por outro domínio. Em uma relação bilateral, o RP configura diretamente issuer, metadados, chaves e regras. Em federações multilaterais, entidades e trust anchors podem publicar statements assinados e políticas que permitem resolver a cadeia de confiança de forma escalável."
  },
  {
    "kind": "paragraph",
    "text": "A confiança técnica não substitui acordo organizacional. É necessário definir onboarding, ownership, assurance, resposta a incidentes, rotação de chaves, disponibilidade, privacidade, semântica de claims e desligamento. Um OP pode emitir tokens criptograficamente válidos e ainda fornecer atributos incompatíveis com a política do RP."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Federation 1.0 formaliza trust chains e metadata policies para ecossistemas com muitas entidades. A adoção deve considerar maturidade de produtos, perfil setorial e necessidade real. Em uma empresa com poucos issuers, configuração explícita pode ser mais simples; em ecossistemas governamentais, financeiros ou de saúde, federação multilateral pode reduzir acordos bilaterais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.19 Multi-tenant, múltiplos issuers e account linking",
    "id": "17-19-multi-tenant-multiplos-issuers-e-account-linking"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações multi-tenant podem aceitar usuários de múltiplos diretórios. A validação precisa determinar o issuer autorizado para cada tenant e impedir que uma chave válida de um tenant autentique identidades em outro. Endpoints “common” ou equivalentes facilitam descoberta inicial, mas o token final deve ser associado ao issuer concreto e à política de tenancy."
  },
  {
    "kind": "paragraph",
    "text": "Account linking conecta identidades federadas a uma conta local. O processo deve exigir uma sessão já autenticada e uma nova prova no segundo provedor, com proteção contra CSRF e confirmação clara. Vincular automaticamente contas porque possuem o mesmo e-mail permite account takeover quando domínios ou endereços são reciclados."
  },
  {
    "kind": "paragraph",
    "text": "Em migrações, preserve o histórico entre issuer antigo, sub antigo e nova identidade por tabela de mapeamento governada. Logs de auditoria precisam registrar qual identidade federada foi usada, qual conta local resultou do linking e quem autorizou a associação."
  },
  {
    "kind": "subhead",
    "text": "Regra multiemissor"
  },
  {
    "kind": "paragraph",
    "text": "Nunca escolha a chave de validação apenas pelo kid sem antes fixar o issuer confiável. O mesmo kid pode existir em domínios diferentes, e metadados de um issuer não devem validar tokens de outro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.20 Aplicações web, SPA, BFF e aplicativos nativos",
    "id": "17-20-aplicacoes-web-spa-bff-e-aplicativos-nativos"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações web com backend podem manter tokens e credenciais no servidor e expor ao navegador apenas um cookie de sessão protegido. Esse modelo reduz a superfície de exfiltração por JavaScript, mas exige proteção contra CSRF, fixação de sessão, roubo de cookie e problemas de escalabilidade do estado."
  },
  {
    "kind": "paragraph",
    "text": "SPAs são clientes públicos. Authorization Code com PKCE substitui o implicit flow como abordagem moderna, mas tokens continuam acessíveis ao contexto do navegador se armazenados no front-end. Content Security Policy, redução de dependências, proteção contra XSS, tokens curtos e armazenamento cuidadoso são necessários. O padrão BFF transfere o tratamento de tokens ao servidor e oferece ao browser uma sessão restrita à origem."
  },
  {
    "kind": "paragraph",
    "text": "Aplicativos nativos devem usar navegador externo ou sessão de autenticação do sistema, não webview embutida que capture credenciais. Redirects usam app links, universal links ou loopback conforme plataforma. PKCE é obrigatório em prática moderna, e refresh tokens devem ser rotacionados e armazenados no mecanismo seguro do sistema quando suportado."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - O fluxo é semelhante, mas o local de execução muda o modelo de ameaça.",
    "headers": [
      "Arquitetura",
      "Onde ficam os tokens",
      "Risco dominante"
    ],
    "rows": [
      [
        "Web server",
        "Backend do cliente",
        "Sessão, CSRF, credencial do cliente e acesso ao servidor."
      ],
      [
        "SPA",
        "Contexto do navegador",
        "XSS, extensão maliciosa e persistência de tokens."
      ],
      [
        "BFF",
        "Backend; browser recebe cookie",
        "CSRF, sessão do BFF e confiança no backend."
      ],
      [
        "Aplicativo nativo",
        "Armazenamento do dispositivo",
        "Malware, redirect hijacking e dispositivo comprometido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.21 OIDC em API Gateways, Axway e Azure",
    "id": "17-21-oidc-em-api-gateways-axway-e-azure"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway pode atuar como Relying Party para autenticar usuários de portal ou console, como OpenID Provider em arquiteturas específicas ou como PEP que valida access tokens emitidos pelo mesmo ecossistema. Esses papéis devem ser configurados separadamente. Validar ID Token no gateway de uma API não corrige o erro de usar o token errado; a API continua precisando de access token destinado à sua audiência."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, filtros e serviços OIDC permitem atuar como provider ou relying party, criar e validar ID Tokens e integrar fluxos OAuth. O desenho deve separar políticas de login interativo das políticas de proteção de APIs, manter stores e certificados governados e validar issuer, audience, nonce e claims conforme o papel exercido."
  },
  {
    "kind": "paragraph",
    "text": "No Microsoft Entra, aplicações registradas recebem client_id, redirect URIs e configurações de token. O Azure API Management normalmente protege APIs validando access tokens com validate-jwt ou validate-azure-ad-token. A política pode usar OpenID configuration para obter issuer e chaves, mas deve exigir audience e claims adequadas; a simples validação criptográfica não substitui autorização."
  },
  {
    "kind": "paragraph",
    "text": "Em portais de desenvolvedores e consoles administrativos, OIDC pode fornecer SSO. Para chamadas runtime, o gateway deve preservar a identidade do usuário e da aplicação de forma controlada, remover headers externos equivalentes e, quando necessário, emitir ou obter credencial adequada para o backend."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual - APIM validando access token da API"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "O gateway não substitui o cliente OIDC"
  },
  {
    "kind": "paragraph",
    "text": "A aplicação cliente valida o ID Token e mantém a sessão do usuário. O gateway protege APIs validando access tokens e aplicando políticas. Misturar essas responsabilidades produz audiences erradas e exposição desnecessária de claims."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.22 Ameaças e hardening",
    "id": "17-22-ameacas-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Authorization code injection ocorre quando um code obtido em outra transação é inserido no callback do cliente. state, PKCE, nonce, validação de issuer e regras de mix-up reduzem o risco. Redirect URI aberta ou registro flexível permite desvio do code. XSS pode roubar tokens em SPAs, enquanto CSRF pode acionar callbacks ou logout em contexto indevido."
  },
  {
    "kind": "paragraph",
    "text": "Token substitution ocorre quando um ID Token ou access token válido para outro cliente, issuer ou propósito é aceito. A defesa é validação estrita de issuer, audience, azp, tipo e contexto. Algoritmos inesperados, chaves obtidas de URL indicada pelo token e cache global de kid criam falhas criptográficas e multiemissor."
  },
  {
    "kind": "paragraph",
    "text": "Login CSRF associa a sessão da vítima à conta do atacante, fazendo a vítima operar sob identidade errada. State por transação, correlação de sessão e confirmação de conta reduzem o risco. Account linking automático por e-mail é outra forma de confusão de identidade."
  },
  {
    "kind": "paragraph",
    "text": "Logout também possui ameaças: redirecionamento aberto, limpeza parcial, replay de logout token e negação de sessão. post_logout_redirect_uri deve ser registrado; logout tokens precisam de assinatura, audience, eventos, jti e tempo; endpoints devem ser idempotentes e limitar abuso."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - OIDC seguro depende de vínculos entre transações, emissores, clientes e artefatos.",
    "headers": [
      "Ameaça",
      "Erro de implementação",
      "Controle principal"
    ],
    "rows": [
      [
        "Mix-up de issuer",
        "Processar resposta sem fixar OP esperado",
        "Issuer por transação, metadata confiável e validação exata."
      ],
      [
        "Code injection",
        "Aceitar code sem vínculo à tentativa",
        "PKCE, state, nonce e callback correlacionado."
      ],
      [
        "Token substitution",
        "Aceitar JWT de outra audience ou tipo",
        "aud, azp, typ, issuer e finalidade do token."
      ],
      [
        "Login CSRF",
        "Criar sessão com resposta não iniciada pelo usuário",
        "state forte e registro de transação."
      ],
      [
        "XSS em SPA",
        "Tokens acessíveis a script comprometido",
        "BFF, CSP, redução de scripts e token curto."
      ],
      [
        "Account linking indevido",
        "Vincular por e-mail coincidente",
        "Reautenticação nos dois lados e confirmação explícita."
      ],
      [
        "Logout replay",
        "Aceitar logout token repetido ou antigo",
        "jti, exp/iat, assinatura e idempotência."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.23 Troubleshooting orientado por evidências",
    "id": "17-23-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico deve separar front-channel, token endpoint, validação do ID Token, criação de sessão e acesso à API. Um erro no callback pode ser state divergente, redirect URI incorreta ou code expirado. Um erro no token endpoint pode ser client authentication, PKCE, reutilização do code ou relógio. Um login bem-sucedido seguido de 401 na API normalmente aponta para access token ausente, audience errada ou policy do gateway."
  },
  {
    "kind": "paragraph",
    "text": "Colete correlation ID, issuer esperado, client_id, redirect URI normalizada, response_type, scopes, timestamps, kid, algoritmo, audiences e resultado de cada validação. Nunca registre tokens completos, authorization codes, code_verifiers, secrets ou cookies. Para análise, use claims sintéticas ou hashes irreversíveis controlados."
  },
  {
    "kind": "paragraph",
    "text": "Problemas intermitentes após rotação de chaves podem indicar cache de JWKS, nós com relógio divergente ou ausência de sobreposição. Falhas somente em um tenant sugerem issuer, consentimento, claims ou política de tenancy. Logout que funciona em uma aplicação e não em outra deve ser analisado por tipo de canal, sid/sub, endpoint registrado e estado local do RP."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Sintomas devem ser associados à etapa exata do fluxo.",
    "headers": [
      "Sintoma",
      "Hipóteses prioritárias",
      "Evidência"
    ],
    "rows": [
      [
        "invalid_state",
        "Transação perdida, cookie bloqueado, callback duplicado",
        "state emitido, recebido e sessão correlacionada."
      ],
      [
        "invalid_grant no token endpoint",
        "Code expirado/reusado, redirect ou verifier divergente",
        "Tempo, redirect uri e hash do verifier."
      ],
      [
        "Assinatura inválida",
        "kid novo, issuer errado, cache de JWKS",
        "Metadata, JWKS atual e relógio."
      ],
      [
        "Audience inválida",
        "ID Token emitido para outro client_id",
        "aud, azp e client_id configurado."
      ],
      [
        "nonce inválido",
        "Resposta de outra tentativa ou replay",
        "nonce armazenado por transação."
      ],
      [
        "Login funciona, API retorna 401",
        "Access token ausente, expirado ou audience errada",
        "Authorization header e policy do gateway."
      ],
      [
        "Logout parcial",
        "Mecanismo não propagado ou RP não limpou sessão",
        "sid/sub, endpoint e logs de logout."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Checklist de telemetria sem exposição de credenciais"
  },
  {
    "kind": "code",
    "text": "Registro seguro de diagnóstico:\n- transaction_id e correlation_id\n- issuer esperado e client_id\n- redirect_uri normalizada\n- state_match, nonce_match e pkce_result\n- alg, kid, aud, azp e tempos sem token bruto\n- sessão criada, renovada ou invalidada\n- código de erro do OP e etapa que respondeu"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.24 Estudos de caso",
    "id": "17-24-estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - ID Token aceito pela API"
  },
  {
    "kind": "paragraph",
    "text": "Um portal envia o ID Token no header Authorization para o API Gateway. O token possui assinatura válida e aud igual ao client_id do portal, não à API. O gateway foi configurado para verificar apenas assinatura e expiração, portanto aceita a chamada. O backend passa a confiar em um token destinado a outro componente e sem scopes de recurso."
  },
  {
    "kind": "paragraph",
    "text": "A correção é solicitar access token para a audience da API, validar issuer, audience, tipo e scopes no gateway e manter o ID Token apenas no cliente. A migração deve observar consumidores existentes e impedir que ambos os tipos sejam aceitos indefinidamente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Falha intermitente após rotação de chave"
  },
  {
    "kind": "paragraph",
    "text": "O OP começa a assinar novos tokens com outro kid, mas um nó da aplicação mantém JWKS em cache por período excessivo. Alguns usuários recebem tokens com a chave nova e falham; outros continuam autenticando com tokens antigos. Reiniciar o nó parece corrigir temporariamente."
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico compara kid, nó de atendimento e idade do cache. A solução inclui cache com refresh controlado em kid desconhecido, sobreposição de chaves pelo emissor, observabilidade e biblioteca OIDC atualizada. Não se deve buscar URL de chave fornecida pelo token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Account takeover por linking automático"
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação vincula automaticamente uma nova identidade federada à conta local quando o e-mail coincide. Um domínio libera um endereço antigo, que é atribuído a outra pessoa. O novo titular autentica no OP e recebe acesso à conta histórica."
  },
  {
    "kind": "paragraph",
    "text": "A correção exige iss + sub como identidade, processo explícito de linking com reautenticação e confirmação, alertas ao usuário e trilha de auditoria. E-mail permanece atributo de contato, não prova de continuidade da identidade."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - Logout fecha o portal, mas não encerra outras aplicações"
  },
  {
    "kind": "paragraph",
    "text": "O portal limpa seu cookie e chama o endpoint de logout do OP, porém outro RP mantém sessão local ativa. A expectativa de “logout global” não estava documentada e o OP não enviava front-channel ou back-channel logout."
  },
  {
    "kind": "paragraph",
    "text": "O desenho é revisado para registrar endpoints de back-channel, emitir sid, validar logout tokens e definir comportamento de indisponibilidade. A interface passa a distinguir “sair deste aplicativo” de “encerrar sessão corporativa”."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratórios de observação",
    "id": "laboratorios-de-observacao"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - fluxo OIDC completo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use um provedor e cliente de laboratório autorizados.",
      "Capture a authorization request sem registrar credenciais reais.",
      "Identifique state, nonce, code_challenge, code e token response.",
      "Valide o ID Token com biblioteca e compare iss, aud, nonce e tempo."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - matriz de validação"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Crie tokens sintéticos ou fixtures assinadas com chave de laboratório.",
      "Teste issuer errado, audience errada, expiração, nonce divergente e alg não permitido.",
      "Registre qual validação rejeitou cada token.",
      "Confirme que o cliente não cria sessão após qualquer falha."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - UserInfo e minimização"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Solicite openid, profile e email em ambiente de teste.",
      "Compare claims do ID Token e do UserInfo.",
      "Valide que sub é igual nas duas respostas.",
      "Reduza scopes e observe quais dados deixam de ser entregues."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 4 - sessão e logout"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Crie duas RPs de laboratório sob o mesmo OP.",
      "Observe SSO e diferencie cookies do OP e das RPs.",
      "Teste logout local, RP-Initiated e, se suportado, back-channel.",
      "Registre quais sessões permanecem ativas em cada cenário."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 5 - rotação de JWKS"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publique duas chaves de laboratório e altere a chave ativa.",
      "Observe cache, kid e aceitação de tokens antigos.",
      "Teste refresh controlado em kid desconhecido.",
      "Defina janela de sobreposição e alertas de falha."
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
    "text": "OpenID Connect acrescenta autenticação interoperável ao OAuth 2.0. O scope openid ativa o protocolo, e o ID Token comunica ao Relying Party um evento de autenticação. O access token continua destinado à API. Confundir os dois artefatos é uma falha de arquitetura, ainda que ambos sejam JWTs."
  },
  {
    "kind": "paragraph",
    "text": "O Authorization Code Flow com PKCE utiliza state, nonce e code_verifier para proteger relações diferentes. O cliente valida issuer, assinatura, algoritmo, audience, azp, tempo, nonce e requisitos de assurance antes de criar sessão. Claims como acr, amr e auth_time são úteis apenas quando sua semântica é conhecida."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo entrega claims autorizadas e precisa manter o mesmo sub do ID Token. A identidade federada deve ser persistida por iss + sub; e-mail não é chave imutável. Public e pairwise subjects oferecem diferentes propriedades de correlação e privacidade."
  },
  {
    "kind": "paragraph",
    "text": "Sessão no OP, sessão no RP e tokens perante APIs são estados independentes. Logout exige política explícita e pode usar RP-Initiated, Front-Channel ou Back-Channel. Discovery e JWKS facilitam configuração e rotação, mas o issuer raiz e a cadeia de confiança precisam ser controlados."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, OIDC protege login de portais e aplicações, enquanto APIs normalmente exigem access tokens. Axway e Azure oferecem recursos para discovery e validação, mas configuração de audience, claims e autorização continua responsabilidade da arquitetura."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 18 aprofundará JWT, JWS, JWE e JOSE: serialização, algoritmos, key identifiers, JWKS, rotação, validação, criptografia de tokens e armadilhas de implementação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de OpenID Connect",
    "id": "checklist-de-openid-connect"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "O scope openid está presente somente em fluxos de autenticação OIDC.",
      "O cliente utiliza Authorization Code com PKCE e redirect URI exata.",
      "state, nonce e code_verifier são únicos por transação e removidos após uso.",
      "O issuer é configurado ou resolvido por cadeia de confiança autorizada.",
      "A assinatura é validada com algoritmo permitido e chave do JWKS correto.",
      "aud e azp são comparados ao client_id esperado.",
      "exp, iat e auth_time usam relógio sincronizado e tolerância limitada.",
      "O ID Token permanece no cliente e não substitui access token da API.",
      "UserInfo sub é comparado ao sub do ID Token.",
      "A conta federada usa iss + sub, não e-mail, como chave externa.",
      "acr e amr possuem semântica documentada por issuer.",
      "Cookies de OP e RP têm proteção, expiração e política de renovação.",
      "Logout local, RP-Initiated, front-channel e back-channel têm comportamento definido.",
      "Discovery e JWKS possuem cache, refresh controlado e proteção de rede.",
      "Multi-tenant valida issuer concreto e política de tenancy.",
      "Logs não armazenam tokens, codes, secrets, verifiers ou cookies.",
      "Bibliotecas OIDC são mantidas atualizadas e testadas com casos negativos."
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
      "Explique por que OAuth 2.0 não é, isoladamente, um protocolo de login.",
      "Diferencie OP, RP, Authorization Server e Resource Server.",
      "Descreva o papel de scope openid, state, nonce e PKCE.",
      "Liste as validações obrigatórias de um ID Token.",
      "Explique quando azp precisa ser analisado.",
      "Compare ID Token, access token e resposta UserInfo.",
      "Explique por que iss + sub é melhor que e-mail para account linking.",
      "Compare public e pairwise subject identifiers.",
      "Modele step-up usando max_age, auth_time e acr.",
      "Diferencie sessão no OP, sessão no RP e validade de access token.",
      "Compare RP-Initiated, Front-Channel e Back-Channel Logout.",
      "Descreva como lidar com rotação de JWKS sem reiniciar aplicações.",
      "Proponha uma política multi-tenant que evite mix-up de issuer.",
      "Explique por que o gateway deve validar access token, não ID Token.",
      "Crie um roteiro de troubleshooting para invalid_state e invalid_grant."
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
    "caption": "Tabela 11 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "acr",
        "Authentication Context Class Reference; classe de contexto de autenticação."
      ],
      [
        "amr",
        "Authentication Methods References; métodos utilizados na autenticação."
      ],
      [
        "auth time",
        "Instante em que ocorreu a autenticação ativa do usuário."
      ],
      [
        "Authorization Code",
        "Artefato curto trocado no token endpoint."
      ],
      [
        "azp",
        "Authorized Party; cliente autorizado quando aud contém múltiplos valores."
      ],
      [
        "Back-Channel Logout",
        "Logout direto do OP para o endpoint do RP."
      ],
      [
        "c hash",
        "Hash que vincula authorization code ao ID Token em fluxos aplicáveis."
      ],
      [
        "Discovery",
        "Mecanismo para obter metadados do OpenID Provider."
      ],
      [
        "End-User",
        "Pessoa autenticada pelo OpenID Provider."
      ],
      [
        "Front-Channel Logout",
        "Logout propagado pelo navegador entre OP e RPs."
      ],
      [
        "ID Token",
        "JWT destinado ao RP para comunicar o evento de autenticação."
      ],
      [
        "iss",
        "Issuer; identificador do emissor do token."
      ],
      [
        "JWKS",
        "Conjunto JSON de chaves públicas para validação criptográfica."
      ],
      [
        "max age",
        "Idade máxima aceitável da autenticação."
      ],
      [
        "nonce",
        "Valor que vincula solicitação de autenticação e ID Token."
      ],
      [
        "OpenID Provider",
        "Entidade que autentica o usuário e emite ID Tokens."
      ],
      [
        "Pairwise subject",
        "sub diferente por setor de clientes para reduzir correlação."
      ],
      [
        "prompt",
        "Parâmetro que controla interação como none, login ou consent."
      ],
      [
        "Public subject",
        "sub reutilizado entre clientes conforme política do issuer."
      ],
      [
        "Relying Party",
        "Cliente OIDC que confia na autenticação do OP."
      ],
      [
        "RP-Initiated Logout",
        "Solicitação de logout iniciada pelo cliente."
      ],
      [
        "sid",
        "Identificador de sessão usado em mecanismos de logout."
      ],
      [
        "sub",
        "Subject Identifier; identificador do usuário no issuer."
      ],
      [
        "UserInfo",
        "Endpoint protegido que retorna claims autorizadas do usuário."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de arquitetura OIDC",
    "id": "anexo-a-matriz-de-arquitetura-oidc"
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - A escolha depende de plataforma, risco, experiência e capacidade do provedor.",
    "headers": [
      "Cenário",
      "Arquitetura inicial",
      "Controles essenciais"
    ],
    "rows": [
      [
        "Aplicação web corporativa",
        "Code + PKCE com sessão server-side",
        "client authentication, cookie seguro, CSRF, nonce e logout."
      ],
      [
        "SPA de baixo risco",
        "Code + PKCE",
        "CSP, token curto, sem secret e proteção XSS."
      ],
      [
        "SPA de maior risco",
        "BFF + Code + PKCE",
        "tokens no backend, cookie HttpOnly e CSRF."
      ],
      [
        "Aplicativo nativo",
        "Code + PKCE com browser externo",
        "app/universal link, armazenamento seguro e refresh rotation."
      ],
      [
        "Portal multi-tenant",
        "Issuer por tenant e policy explícita",
        "aud/azp, tenancy, consent e account linking seguro."
      ],
      [
        "Operação com step-up",
        "Nova authorization request com assurance",
        "max age, acr, auth time e vínculo à operação."
      ],
      [
        "SSO com logout corporativo",
        "Sessão OP + RP-Initiated + back-channel",
        "sid, logout token, idempotência e observabilidade."
      ],
      [
        "Federação multilateral",
        "OpenID Federation ou perfil setorial",
        "trust anchors, metadata policies e governança."
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
      "OpenID Foundation. OpenID Connect Core 1.0 incorporating errata set 2.",
      "OpenID Foundation. OpenID Connect Discovery 1.0 incorporating errata set 2.",
      "OpenID Foundation. OpenID Connect RP-Initiated Logout 1.0. 2022.",
      "OpenID Foundation. OpenID Connect Front-Channel Logout 1.0. 2022.",
      "OpenID Foundation. OpenID Connect Back-Channel Logout 1.0, com errata incorporada. 2023.",
      "OpenID Foundation. OpenID Connect Session Management 1.0. 2022.",
      "OpenID Foundation. OpenID Federation 1.0. 2026.",
      "IETF. RFC 6749 - The OAuth 2.0 Authorization Framework. 2012.",
      "IETF. RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients. 2015.",
      "IETF. RFC 7519 - JSON Web Token. 2015.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8252 - OAuth 2.0 for Native Apps. 2017.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification. 2022.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "Microsoft Learn. Microsoft identity platform and OpenID Connect protocol.",
      "Microsoft Learn. Azure API Management validate-jwt e validate-azure-ad-token policies.",
      "Axway Documentation. API Gateway and OpenID Connect; OpenID Connect filters.",
      "OWASP. OAuth 2.0 Security Cheat Sheet e Session Management Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "OIDC é um conjunto de especificações e perfis em evolução. Antes de implantar discovery, logout, federação ou claims de assurance, confirme a versão suportada pelo provedor, pela biblioteca e pelo gateway. Internet-Drafts e extensões proprietárias não substituem automaticamente especificações finais."
  }
];
