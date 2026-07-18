import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OAUTH_2_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Delegação OAuth 2.0: autorização sem compartilhar a senha do usuário"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/overview.svg",
    "alt": "OAuth 2.0 delegando autoridade entre usuário, cliente, authorization server, gateway e API",
    "caption": "Figura de abertura - OAuth delega autoridade limitada sem transformar o cliente em proprietário das credenciais do usuário."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O cliente recebe autoridade limitada para acessar uma API; autenticação do usuário e autorização da API continuam sendo decisões distintas."
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
    "text": "Os capítulos anteriores separaram identidade, autenticação, autorização e credenciais estáticas. Agora o curso aprofunda o framework OAuth 2.0, criado para permitir que um cliente obtenha autoridade limitada para acessar um recurso protegido. A ideia central é substituir o compartilhamento direto de credenciais por artefatos temporários, com audiência, escopo, duração e contexto controlados."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 não é um protocolo único e fechado. É uma família de papéis, endpoints, grants, tipos de cliente, formatos de token e extensões. A segurança de uma implantação depende da composição correta desses elementos. Um Authorization Code flow pode ser robusto quando usa PKCE, redirect URI estrita e proteção de estado, mas pode ser vulnerável quando aceita redirecionamentos amplos, mistura emissores ou expõe códigos e tokens em logs."
  },
  {
    "kind": "paragraph",
    "text": "A especificação original permanece importante, porém a prática moderna é guiada também por documentos posteriores. O Best Current Practice de segurança consolida experiências operacionais, desaconselha modos inseguros e reforça PKCE, redirect URI exata, proteção contra mix-up, restrição de refresh tokens e defesa contra replay. Extensões como PAR, JAR, RAR, mTLS, DPoP, metadata de recursos e token exchange atendem cenários de maior risco e integrações corporativas."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo percorre o ciclo completo: registro do cliente, solicitação de autorização, emissão e uso de tokens, renovação, revogação, introspecção, delegação entre serviços e enforcement no API Gateway. O objetivo é permitir que o leitor projete e diagnostique fluxos reais sem confundir autenticação do usuário, autenticação do cliente, consentimento, autorização do recurso e validação do token."
  },
  {
    "kind": "subhead",
    "text": "Estado das especificações"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.1 continua sendo um Internet-Draft em 2026. Ele consolida práticas modernas, mas não substitui automaticamente as RFCs publicadas. Para decisões normativas, use as RFCs vigentes e o OAuth 2.0 Security Best Current Practice, verificando a versão atual do draft apenas como orientação adicional."
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
      "Explicar o problema de delegação resolvido por OAuth 2.0 e seus limites.",
      "Distinguir resource owner, client, authorization server e resource server.",
      "Diferenciar authorization endpoint, token endpoint, introspection, revocation e metadata.",
      "Classificar clientes públicos e confidenciais e escolher autenticação compatível com sua capacidade de proteger chaves.",
      "Descrever Authorization Code com PKCE e os controles state, nonce, issuer e redirect URI.",
      "Aplicar Client Credentials, Device Authorization Grant e refresh tokens nos cenários adequados.",
      "Distinguir grants, códigos, access tokens, refresh tokens e ID tokens.",
      "Projetar scopes, audiences, resource indicators, consentimento e autorização detalhada.",
      "Compreender tokens opacos, JWTs, introspecção, revogação e perfis de access token.",
      "Aplicar PAR, JAR, JARM, RAR, mTLS, DPoP e token exchange conforme o risco.",
      "Integrar OAuth com API Gateways, Axway API Gateway e Azure API Management.",
      "Diagnosticar invalid_request, invalid_client, invalid_grant, invalid_token e insufficient_scope."
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
      "16.1 O problema que OAuth 2.0 resolve",
      "16.2 Papéis e fronteiras de confiança",
      "16.3 Endpoints, metadata e canais",
      "16.4 Registro, tipos de cliente e redirect URIs",
      "16.5 Grants, fluxos e tipos de token",
      "16.6 Authorization Code em profundidade",
      "16.7 PKCE e proteção contra interceptação",
      "16.8 State, nonce, issuer e proteção contra mix-up",
      "16.9 Autenticação de clientes confidenciais",
      "16.10 Aplicações web, SPAs, nativas e BFF",
      "16.11 Client Credentials",
      "16.12 Device Authorization Grant",
      "16.13 Refresh tokens, rotação e reutilização",
      "16.14 Access tokens, scopes, audience e resource indicators",
      "16.15 Tokens opacos, introspecção e revogação",
      "16.16 JWT access tokens e validação",
      "16.17 Consentimento, least privilege e Rich Authorization Requests",
      "16.18 PAR, JAR e JARM",
      "16.19 Sender-constrained tokens com mTLS e DPoP",
      "16.20 Token Exchange e on-behalf-of",
      "16.21 Metadata do authorization server e do recurso protegido",
      "16.22 OAuth em API Gateways, Axway e Azure",
      "16.23 Ameaças e hardening",
      "16.24 Troubleshooting orientado por evidências",
      "16.25 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.1 O problema que OAuth 2.0 resolve",
    "id": "16-1-o-problema-que-oauth-2-0-resolve"
  },
  {
    "kind": "paragraph",
    "text": "Antes de frameworks de delegação, era comum uma aplicação pedir a senha do usuário para acessar outro sistema. Essa prática entregava ao cliente poder excessivo, impedia limitar operações, dificultava revogação seletiva e expunha credenciais reutilizáveis. Se o cliente fosse comprometido, o atacante poderia agir como o usuário em qualquer interface que aceitasse a mesma senha."
  },
  {
    "kind": "paragraph",
    "text": "OAuth substitui esse compartilhamento por uma concessão de autoridade. O cliente solicita autorização para uma finalidade; o authorization server autentica o usuário quando necessário, aplica políticas e emite um access token destinado ao resource server. O cliente recebe apenas a capacidade representada pelo token, não a credencial primária do usuário."
  },
  {
    "kind": "paragraph",
    "text": "O framework não define sozinho como o usuário se autentica, como a API modela permissões de objeto ou como o token deve obrigatoriamente ser formatado. Também não transforma um access token em prova de login para o cliente. OpenID Connect atende a necessidade de comunicar autenticação do usuário ao cliente, enquanto a API continua responsável por autorização fina e regras de negócio."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "OAuth responde: “como um cliente obtém e apresenta autoridade limitada para um recurso?”. Ele não responde sozinho: “quem é o usuário para a interface?”, “o usuário é dono deste objeto?” ou “esta transação é permitida pelo domínio?”."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/figure-01-roles.svg",
    "alt": "Papéis OAuth e seus canais de comunicação e confiança",
    "caption": "Figura 1 - Os papéis são responsabilidades lógicas; um produto pode implementar mais de um papel, mas as fronteiras devem permanecer explícitas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.2 Papéis e fronteiras de confiança",
    "id": "16-2-papeis-e-fronteiras-de-confianca"
  },
  {
    "kind": "paragraph",
    "text": "O resource owner é a entidade capaz de conceder acesso ao recurso. Em muitos fluxos é uma pessoa, mas também pode ser uma organização ou política administrativa. O client é a aplicação que solicita acesso. Ele não é proprietário automático dos dados e não deve receber mais autoridade do que a necessária para sua função."
  },
  {
    "kind": "paragraph",
    "text": "O authorization server autentica o resource owner quando aplicável, avalia a solicitação, registra consentimento ou política e emite tokens. O resource server é a API que aceita access tokens e decide se a operação é permitida. Em uma plataforma corporativa, o API Gateway pode atuar como parte do resource server ao validar o token e aplicar controles transversais, enquanto o backend conserva decisões de domínio."
  },
  {
    "kind": "paragraph",
    "text": "Papéis lógicos não equivalem obrigatoriamente a processos separados. Um mesmo produto pode hospedar autorização e recursos, e um gateway pode intermediar múltiplas APIs. Mesmo assim, issuer, audience, chaves, endpoints e responsabilidades devem ser distintos para impedir que um token emitido para um serviço seja aceito indevidamente por outro."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Cada papel possui controles e evidências próprias.",
    "headers": [
      "Papel",
      "Responsabilidade principal",
      "Erro de desenho comum"
    ],
    "rows": [
      [
        "Resource owner",
        "concede autoridade sobre recursos",
        "tratar consentimento como autorização irrestrita."
      ],
      [
        "Client",
        "solicita e usa tokens",
        "armazenar segredo em aplicativo incapaz de protegê-lo."
      ],
      [
        "Authorization server",
        "emite tokens e publica metadata",
        "emitir audience ampla e aceitar redirect URI flexível."
      ],
      [
        "Resource server",
        "valida token e autoriza operação",
        "aceitar JWT apenas porque a assinatura é válida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.3 Endpoints, metadata e canais",
    "id": "16-3-endpoints-metadata-e-canais"
  },
  {
    "kind": "paragraph",
    "text": "O authorization endpoint recebe solicitações por meio do user agent e conduz interação com o resource owner. O token endpoint é acessado diretamente pelo cliente para trocar grants por tokens. Essa separação cria dois canais: front-channel, exposto a navegador, histórico, extensões e redirecionamentos; e back-channel, protegido por TLS e usado para requisições diretas entre cliente e authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Endpoints opcionais ampliam operação e interoperabilidade. Introspection permite que o resource server consulte o estado de um token. Revocation permite invalidar refresh tokens e, conforme a implementação, access tokens. PAR recebe parâmetros de autorização antecipadamente por back-channel. Metadata descreve issuer, endpoints, métodos de autenticação, algoritmos e capacidades suportadas."
  },
  {
    "kind": "paragraph",
    "text": "URLs de endpoints são dados de segurança. O cliente não deve construí-las por concatenação nem aceitar metadata de origem não confiável. O issuer retornado precisa corresponder ao emissor configurado. TLS, validação de hostname e resolução DNS confiável continuam essenciais porque OAuth protege autoridade, não substitui a segurança do canal."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Endpoints possuem exposições e controles distintos.",
    "headers": [
      "Endpoint",
      "Canal típico",
      "Finalidade"
    ],
    "rows": [
      [
        "Authorization",
        "front-channel",
        "interação do usuário e emissão de authorization code."
      ],
      [
        "Token",
        "back-channel",
        "troca de grant e autenticação do cliente."
      ],
      [
        "Introspection",
        "back-channel",
        "consulta de atividade e atributos de token."
      ],
      [
        "Revocation",
        "back-channel",
        "invalidação de token conforme política."
      ],
      [
        "PAR",
        "back-channel",
        "registro protegido dos parâmetros de autorização."
      ],
      [
        "Metadata",
        "leitura autenticada por origem",
        "descoberta de endpoints e capacidades."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.4 Registro, tipos de cliente e redirect URIs",
    "id": "16-4-registro-tipos-de-cliente-e-redirect-uris"
  },
  {
    "kind": "paragraph",
    "text": "O registro associa client_id, redirect URIs, tipo de aplicação, contatos, chaves, métodos de autenticação e grants permitidos. O client_id é um identificador público, não um segredo. A segurança depende do vínculo correto entre o identificador e as propriedades registradas, especialmente redirect URIs e material criptográfico."
  },
  {
    "kind": "paragraph",
    "text": "Clientes confidenciais conseguem manter credenciais sob controle, como aplicações web com backend ou serviços. Clientes públicos executam em ambientes onde o usuário ou atacante pode extrair o software e seus valores, como SPAs e aplicativos nativos. Inserir client_secret em JavaScript, pacote móvel ou aplicativo distribuído não transforma o cliente em confidencial; o segredo passa a ser copiável."
  },
  {
    "kind": "paragraph",
    "text": "Redirect URI deve ser comparada por correspondência exata, salvo regras muito específicas para loopback de aplicações nativas. Wildcards, prefix matching e open redirectors permitem desviar códigos. Cada ambiente deve possuir URIs próprias, e a aplicação precisa validar a rota de retorno antes de iniciar qualquer sessão local."
  },
  {
    "kind": "subhead",
    "text": "Segredo em cliente público"
  },
  {
    "kind": "paragraph",
    "text": "Um valor embutido em SPA, aplicativo móvel ou binário distribuído deve ser considerado público. A proteção adequada vem de PKCE, redirect URI estrita, sistema operacional, BFF quando aplicável e restrição dos tokens - não da tentativa de ocultar um client_secret."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.5 Grants, fluxos e tipos de token",
    "id": "16-5-grants-fluxos-e-tipos-de-token"
  },
  {
    "kind": "paragraph",
    "text": "Grant é a representação de uma autorização usada pelo cliente para obter access token. Authorization code, refresh token, client credentials e device code são exemplos. “Fluxo” descreve a sequência completa de interações. Confundir grant com token leva a logs e políticas imprecisas: o authorization code é curto, de uso único e destinado ao token endpoint; o access token é apresentado à API."
  },
  {
    "kind": "paragraph",
    "text": "O access token representa autoridade para um resource server. O refresh token permite solicitar novos access tokens e deve ficar restrito ao authorization server. O ID token pertence ao OpenID Connect e comunica ao cliente fatos sobre a autenticação; não deve ser usado como access token. Cada artefato possui destinatário, vida útil e proteção diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Os antigos Implicit Grant e Resource Owner Password Credentials não devem ser escolhidos para novos projetos. O primeiro expõe tokens no front-channel e perdeu sua justificativa com PKCE; o segundo entrega credenciais do usuário ao cliente e impede muitos controles modernos. Migrações devem priorizar Authorization Code com PKCE ou fluxos máquina a máquina apropriados."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Artefatos não são intercambiáveis.",
    "headers": [
      "Artefato",
      "Destinatário",
      "Propriedade operacional"
    ],
    "rows": [
      [
        "Authorization code",
        "token endpoint",
        "curto, uso único e vinculado a cliente/redirect URI/PKCE."
      ],
      [
        "Access token",
        "resource server",
        "autoridade temporária, audience e escopo."
      ],
      [
        "Refresh token",
        "authorization server",
        "credencial de longa duração relativa; exige proteção e rotação."
      ],
      [
        "ID token",
        "cliente OIDC",
        "asserção sobre autenticação, não credencial genérica de API."
      ],
      [
        "device_code",
        "token endpoint",
        "polling controlado para dispositivo limitado."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/figure-02.svg",
    "alt": "Authorization Code com PKCE usando front-channel e back-channel",
    "caption": "Figura 2 - PKCE vincula a troca do authorization code a uma prova criada pelo cliente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.6 Authorization Code em profundidade",
    "id": "16-6-authorization-code-em-profundidade"
  },
  {
    "kind": "paragraph",
    "text": "O cliente cria uma solicitação de autorização contendo response_type=code, client_id, redirect_uri, scope, state e parâmetros de PKCE. O navegador é redirecionado ao authorization server, onde o usuário pode ser autenticado e a política avaliada. Em caso de sucesso, o authorization server retorna um authorization code para a redirect URI registrada."
  },
  {
    "kind": "paragraph",
    "text": "O cliente recebe o code e o troca no token endpoint. Essa requisição direta inclui grant_type=authorization_code, code, redirect_uri e code_verifier. Clientes confidenciais também se autenticam. O servidor verifica uso único, prazo, cliente, redirect URI e PKCE antes de emitir tokens."
  },
  {
    "kind": "paragraph",
    "text": "O code não deve carregar autoridade reutilizável nem ser enviado a APIs. Ele existe para reduzir exposição de tokens no front-channel e permitir validações no back-channel. Logs, ferramentas de analytics, páginas de erro e referers não devem registrar o valor. Após a troca, a aplicação deve remover parâmetros sensíveis da URL e estabelecer seu próprio estado de sessão de forma segura."
  },
  {
    "kind": "subhead",
    "text": "Solicitação de autorização - valores ilustrativos"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=portal-pagamentos\n  &redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n  &scope=pagamentos.read%20pagamentos.write\n  &state=valor-aleatorio\n  &code_challenge=base64url-sha256-verifier\n  &code_challenge_method=S256"
  },
  {
    "kind": "subhead",
    "text": "Troca do código por tokens"
  },
  {
    "kind": "code",
    "text": "POST /token\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code\n&code=AUTHORIZATION_CODE\n&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n&client_id=portal-pagamentos\n&code_verifier=SEGREDO_ALEATORIO_DA_INSTANCIA"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.7 PKCE e proteção contra interceptação",
    "id": "16-7-pkce-e-protecao-contra-interceptacao"
  },
  {
    "kind": "paragraph",
    "text": "PKCE começa com um code_verifier aleatório, de alta entropia e exclusivo por tentativa. O cliente calcula code_challenge = BASE64URL(SHA256(code_verifier)) e envia o challenge no authorization endpoint. Na troca do code, apresenta o verifier original. O authorization server recalcula o challenge e exige correspondência."
  },
  {
    "kind": "paragraph",
    "text": "Se um atacante interceptar o authorization code, não poderá trocá-lo sem o verifier. O método S256 deve ser usado; plain existe por compatibilidade restrita e não oferece a mesma proteção contra observação do challenge. PKCE não substitui state, redirect URI exata, TLS ou autenticação do cliente confidencial. Ele resolve uma ameaça específica: interceptação e injeção de authorization code."
  },
  {
    "kind": "paragraph",
    "text": "PKCE deve ser exigido também para clientes confidenciais quando utilizam Authorization Code. Além de padronizar o fluxo, protege contra ataques nos quais um código obtido em outro contexto é injetado na sessão do cliente. O verifier não deve ser reutilizado e precisa ficar associado à mesma transação que contém state e redirect URI."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - PKCE é uma prova por transação, não uma credencial permanente.",
    "headers": [
      "Elemento",
      "Onde aparece",
      "Requisito"
    ],
    "rows": [
      [
        "code_verifier",
        "token request",
        "aleatório, secreto durante a transação e não reutilizado."
      ],
      [
        "code_challenge",
        "authorization request",
        "derivado do verifier por S256."
      ],
      [
        "code_challenge_method",
        "authorization request",
        "S256 para novos sistemas."
      ],
      [
        "Vínculo",
        "estado do cliente",
        "mesma tentativa, client_id, redirect URI e code."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.8 State, nonce, issuer e proteção contra mix-up",
    "id": "16-8-state-nonce-issuer-e-protecao-contra-mix-up"
  },
  {
    "kind": "paragraph",
    "text": "State vincula a resposta de autorização à sessão que iniciou a solicitação e ajuda a prevenir CSRF. Deve ser imprevisível, de uso único e associado localmente ao issuer, redirect URI, PKCE e intenção do usuário. Tratar state apenas como URL de retorno assinada pode deixar a sessão sem proteção adequada contra respostas não solicitadas."
  },
  {
    "kind": "paragraph",
    "text": "Nonce pertence ao OpenID Connect e vincula o ID token à solicitação de autenticação. Ele não substitui state na proteção do fluxo OAuth. Em clientes que usam OIDC, ambos podem ser necessários: state protege o redirecionamento e nonce é validado dentro do ID token."
  },
  {
    "kind": "paragraph",
    "text": "Ataques de authorization server mix-up exploram clientes que conversam com múltiplos emissores e não vinculam a resposta ao issuer correto. O cliente deve usar metadata confiável, validar o parâmetro iss quando suportado e enviar o code somente ao token endpoint do emissor associado à transação. Nunca selecione o token endpoint com base em dados não validados da resposta."
  },
  {
    "kind": "subhead",
    "text": "Estado transacional mínimo"
  },
  {
    "kind": "paragraph",
    "text": "Armazene, por tentativa: issuer esperado, client_id, redirect URI, state, code_verifier, nonce quando houver OIDC, scopes solicitados e horário. Consuma o registro uma única vez e expire rapidamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.9 Autenticação de clientes confidenciais",
    "id": "16-9-autenticacao-de-clientes-confidenciais"
  },
  {
    "kind": "paragraph",
    "text": "O token endpoint precisa distinguir o cliente que apresenta o grant. client_secret_basic é simples, mas depende de segredo simétrico e transporte seguro. client_secret_post coloca o segredo no corpo e aumenta risco de logs; deve ser evitado quando o método Basic é suportado. Segredos precisam de armazenamento em vault, rotação, owner e escopo por ambiente."
  },
  {
    "kind": "paragraph",
    "text": "private_key_jwt usa uma asserção JWT assinada pela chave privada do cliente. O authorization server valida issuer/subject, audience, expiração, identificador único e assinatura. A chave privada não é enviada, e a rotação pode ser administrada por JWKS. O mecanismo exige prevenção de replay de jti e validação estrita da audience do token endpoint."
  },
  {
    "kind": "paragraph",
    "text": "mTLS client authentication vincula a autenticação ao certificado apresentado na conexão TLS. Pode usar PKI tradicional ou certificado registrado. Em ambientes com proxies, deve ficar claro onde TLS termina e como a identidade do certificado é preservada. Autenticação forte do cliente não elimina a necessidade de PKCE no Authorization Code."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - O método deve corresponder à capacidade real do cliente.",
    "headers": [
      "Método",
      "Material",
      "Vantagem",
      "Cuidado"
    ],
    "rows": [
      [
        "client_secret_basic",
        "segredo simétrico",
        "amplo suporte",
        "rotação, logs e compartilhamento."
      ],
      [
        "private_key_jwt",
        "chave privada",
        "não envia segredo; boa automação",
        "jti, audience e rotação de JWKS."
      ],
      [
        "mTLS client auth",
        "certificado e chave",
        "forte vínculo ao canal",
        "terminação TLS e ciclo de certificados."
      ],
      [
        "none",
        "sem autenticação",
        "adequado a cliente público",
        "exigir PKCE e redirect URI segura."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.10 Aplicações web, SPAs, nativas e BFF",
    "id": "16-10-aplicacoes-web-spas-nativas-e-bff"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações web tradicionais mantêm código e credenciais no servidor. O navegador recebe apenas cookie de sessão protegido, enquanto o backend executa Authorization Code, armazena tokens e chama APIs. Essa separação reduz exposição de tokens ao JavaScript, mas exige proteção contra CSRF, fixation, XSS e roubo de sessão."
  },
  {
    "kind": "paragraph",
    "text": "SPAs são clientes públicos. Authorization Code com PKCE é o fluxo moderno, porém access tokens armazenados no navegador continuam expostos a XSS e extensões. Um Backend for Frontend pode receber o code, manter tokens no servidor e expor ao browser somente cookie HttpOnly, Secure e SameSite. O BFF adiciona estado e infraestrutura, mas reduz a superfície de tokens."
  },
  {
    "kind": "paragraph",
    "text": "Aplicações nativas utilizam navegador externo e redirect URIs baseadas em app links, universal links, custom schemes ou loopback. Embedded webviews prejudicam segurança e experiência de SSO. O sistema deve impedir que outro aplicativo capture a redirect URI e sempre combinar o mecanismo de retorno com PKCE."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - A arquitetura altera onde o token fica exposto.",
    "headers": [
      "Tipo",
      "Classificação",
      "Armazenamento preferido",
      "Fluxo"
    ],
    "rows": [
      [
        "Web com backend",
        "confidencial",
        "tokens no servidor; cookie de sessão no browser",
        "Authorization Code + PKCE."
      ],
      [
        "SPA pura",
        "público",
        "memória quando possível; minimizar persistência",
        "Authorization Code + PKCE."
      ],
      [
        "SPA com BFF",
        "BFF confidencial",
        "tokens no BFF; cookie protegido",
        "Authorization Code + PKCE."
      ],
      [
        "Aplicativo nativo",
        "público",
        "armazenamento seguro do sistema",
        "Authorization Code + PKCE e browser externo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.11 Client Credentials",
    "id": "16-11-client-credentials"
  },
  {
    "kind": "paragraph",
    "text": "Client Credentials é usado quando o cliente age em seu próprio nome, sem resource owner humano na transação. O cliente se autentica no token endpoint e recebe access token associado à identidade da aplicação. É apropriado para serviços, jobs e automações que possuem permissões próprias."
  },
  {
    "kind": "paragraph",
    "text": "O grant não deve ser usado para simular usuários nem transportar user_id arbitrário. A autorização deve se basear no principal da aplicação, seu tenant, owner e permissões de aplicação. Se um serviço precisa preservar contexto do usuário ao chamar outro, on-behalf-of ou token exchange é mais adequado."
  },
  {
    "kind": "paragraph",
    "text": "Como o token pode abrir acesso amplo, credenciais estáticas devem ser substituídas por private_key_jwt, mTLS, managed identity ou workload federation quando possível. Scopes de aplicação precisam ser separados de scopes delegados para impedir que um token app-only seja confundido com autoridade do usuário."
  },
  {
    "kind": "subhead",
    "text": "Client Credentials - exemplo conceitual"
  },
  {
    "kind": "code",
    "text": "POST /token\nAuthorization: Basic base64(client_id:client_secret)\nContent-Type: application/x-www-form-urlencoded\ngrant_type=client_credentials\n&scope=liquidacoes.process"
  },
  {
    "kind": "subhead",
    "text": "Pergunta de revisão"
  },
  {
    "kind": "paragraph",
    "text": "Se a operação precisa saber “qual usuário autorizou?”, Client Credentials isoladamente não fornece essa resposta. O principal é a aplicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.12 Device Authorization Grant",
    "id": "16-12-device-authorization-grant"
  },
  {
    "kind": "paragraph",
    "text": "O Device Authorization Grant atende dispositivos com entrada limitada ou sem navegador conveniente. O cliente solicita device_code e user_code, apresenta ao usuário uma verification_uri e inicia polling no token endpoint. O usuário conclui autenticação e autorização em outro dispositivo capaz de navegar."
  },
  {
    "kind": "paragraph",
    "text": "O cliente deve respeitar interval, expires_in e erros como authorization_pending e slow_down. Polling agressivo cria carga e pode provocar bloqueio. O user_code precisa ser curto o suficiente para digitação, mas protegido por rate limiting, expiração e vínculo ao device_code de alta entropia."
  },
  {
    "kind": "paragraph",
    "text": "O fluxo não deve ser usado como atalho para aplicações que já possuem navegador adequado. A interface deve mostrar claramente qual dispositivo e operação estão sendo autorizados, reduzindo ataques de phishing em que um código enviado por terceiro é inserido pela vítima."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O fluxo separa o dispositivo solicitante do canal de autenticação.",
    "headers": [
      "Etapa",
      "Artefato",
      "Controle"
    ],
    "rows": [
      [
        "Início",
        "device_code + user_code",
        "device_code secreto; user_code curto e expirável."
      ],
      [
        "Interação",
        "verification_uri",
        "exibir contexto do cliente e evitar phishing."
      ],
      [
        "Polling",
        "device_code",
        "respeitar interval e slow_down."
      ],
      [
        "Conclusão",
        "access/refresh token",
        "vincular ao cliente e política aprovada."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/figure-03.svg",
    "alt": "Ciclo de vida de grants, access tokens e refresh tokens",
    "caption": "Figura 3 - Tokens possuem ciclo de vida e decisões de revogação diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.13 Refresh tokens, rotação e reutilização",
    "id": "16-13-refresh-tokens-rotacao-e-reutilizacao"
  },
  {
    "kind": "paragraph",
    "text": "Refresh token é uma credencial de alto valor porque permite obter novos access tokens sem repetir toda a interação. Deve ser enviado apenas ao token endpoint, protegido em armazenamento adequado e limitado ao cliente e à autorização original. Access tokens curtos reduzem exposição; refresh tokens mantêm continuidade controlada."
  },
  {
    "kind": "paragraph",
    "text": "Para clientes públicos, o BCP recomenda refresh tokens sender-constrained ou com rotação. Na rotação, cada uso produz um novo refresh token e invalida o anterior. Se um token antigo reaparece, o servidor detecta possível roubo e revoga a família ou a autorização correspondente. A implementação precisa lidar com concorrência e respostas perdidas sem criar falsos positivos."
  },
  {
    "kind": "paragraph",
    "text": "Expiração absoluta, expiração por inatividade, revogação por logout, mudança de senha, retirada de consentimento e risco devem ser definidos. “Refresh token nunca expira” transfere todo o controle para uma revogação perfeita, algo difícil em sistemas distribuídos. O cliente deve tratar invalid_grant como necessidade de nova autorização, não como motivo para repetir indefinidamente."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Refresh token precisa de política própria.",
    "headers": [
      "Controle",
      "Objetivo",
      "Decisão operacional"
    ],
    "rows": [
      [
        "Rotação",
        "detectar reutilização",
        "revogar família e registrar incidente quando token antigo reaparece."
      ],
      [
        "Sender constraint",
        "vincular a uma chave",
        "validar mTLS/DPoP em cada renovação."
      ],
      [
        "Expiração absoluta",
        "limitar duração total",
        "exigir nova autorização após período definido."
      ],
      [
        "Inatividade",
        "encerrar autorizações abandonadas",
        "renovar apenas enquanto houver uso legítimo."
      ],
      [
        "Revogação",
        "responder a risco e desligamento",
        "propagar rapidamente e auditar motivo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.14 Access tokens, scopes, audience e resource indicators",
    "id": "16-14-access-tokens-scopes-audience-e-resource-indicators"
  },
  {
    "kind": "paragraph",
    "text": "Access token deve ser aceito somente pelo resource server para o qual foi emitido. Audience ampla transforma um token em passe reutilizável entre APIs. Resource Indicators permitem ao cliente declarar o recurso pretendido durante autorização ou token request, ajudando o authorization server a emitir tokens específicos."
  },
  {
    "kind": "paragraph",
    "text": "Scope representa autoridade solicitada e concedida, mas sua semântica deve ser documentada. Scopes como read e write são simples, porém podem ficar ambíguos em plataformas grandes. Nomes de domínio, operação e recurso ajudam: pagamentos.read, pagamentos.create e conciliacao.execute. Scope não substitui autorização de objeto, tenant ou estado do domínio."
  },
  {
    "kind": "paragraph",
    "text": "O resource server valida audience, escopo e contexto da requisição. Uma API não deve aceitar um token porque contém “admin” sem verificar issuer, tipo e origem da claim. Claims de autorização precisam ter governança: quem as emite, quando mudam, como são revogadas e qual serviço possui autoridade para interpretá-las."
  },
  {
    "kind": "subhead",
    "text": "Resource Indicator - exemplo conceitual"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=app\n  &resource=https%3A%2F%2Fapi.pagamentos.example\n  &scope=pagamentos.read"
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Validação técnica e autorização de negócio são complementares.",
    "headers": [
      "Elemento",
      "Pergunta de validação"
    ],
    "rows": [
      [
        "audience",
        "este token foi emitido para esta API ou gateway?"
      ],
      [
        "scope",
        "a autoridade concedida inclui a operação?"
      ],
      [
        "subject / client",
        "quem é o principal e qual aplicação atua?"
      ],
      [
        "tenant",
        "o principal e o recurso pertencem ao contexto permitido?"
      ],
      [
        "token type",
        "o artefato é um access token esperado, não ID token ou outro JWT?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.15 Tokens opacos, introspecção e revogação",
    "id": "16-15-tokens-opacos-introspeccao-e-revogacao"
  },
  {
    "kind": "paragraph",
    "text": "Token opaco não revela estrutura ao cliente ou resource server. A API consulta o authorization server por introspecção ou usa estado local distribuído. Essa abordagem facilita revogação imediata e minimiza exposição de claims, mas cria dependência de disponibilidade, latência, autenticação da API e política de cache."
  },
  {
    "kind": "paragraph",
    "text": "Introspection retorna active e atributos autorizados para o solicitante. active=false deve ser resposta normal para token inválido, expirado, revogado ou desconhecido, sem revelar detalhes. O endpoint precisa autenticar resource servers e limitar quais dados cada um pode consultar. Cache reduz carga, mas aumenta a janela entre revogação e enforcement."
  },
  {
    "kind": "paragraph",
    "text": "Revocation permite ao cliente solicitar invalidação. A resposta bem-sucedida não deve revelar se o token existia. Revogar refresh token normalmente encerra a capacidade de renovação; access tokens já emitidos podem continuar até expirar se forem auto-contidos. Arquiteturas de alto risco combinam TTL curto, introspecção, eventos de revogação ou denylist."
  },
  {
    "kind": "subhead",
    "text": "Introspecção - exemplo simplificado"
  },
  {
    "kind": "code",
    "text": "POST /introspect\nAuthorization: Basic <credencial-do-resource-server>\nContent-Type: application/x-www-form-urlencoded\ntoken=TOKEN_OPACO\nHTTP/1.1 200 OK\n{\n  \"active\": true,\n  \"client_id\": \"portal\",\n  \"scope\": \"pagamentos.read\",\n  \"exp\": 1770000000\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.16 JWT access tokens e validação",
    "id": "16-16-jwt-access-tokens-e-validacao"
  },
  {
    "kind": "paragraph",
    "text": "JWT permite ao resource server validar localmente assinatura e claims, reduzindo chamadas ao authorization server. O perfil de JWT access token padroniza claims e tipos úteis, mas a API ainda precisa conhecer issuer, audience, algoritmos e chaves confiáveis. Decodificar Base64URL não é validar."
  },
  {
    "kind": "paragraph",
    "text": "A validação deve fixar algoritmos permitidos, localizar a chave pelo kid em JWKS confiável, verificar assinatura, issuer, audience, expiração, not-before quando presente e tipo esperado. O resource server deve rejeitar tokens emitidos para outro uso, mesmo que a mesma chave assine ID tokens. typ e regras de profile ajudam a impedir confusão entre tipos de JWT."
  },
  {
    "kind": "paragraph",
    "text": "Rotação de chaves exige cache e atualização controlada. Quando kid desconhecido aparece, o gateway pode atualizar JWKS, mas não deve permitir que o token indique uma URL arbitrária de chave. Falha temporária de metadata não deveria invalidar imediatamente todas as chaves ainda confiáveis; ao mesmo tempo, caches excessivos atrasam remoção de chave comprometida."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Assinatura válida é apenas uma das verificações.",
    "headers": [
      "Validação",
      "Falha que evita"
    ],
    "rows": [
      [
        "assinatura e algoritmo fixado",
        "token alterado ou algorithm confusion."
      ],
      [
        "issuer exato",
        "token de domínio não confiável."
      ],
      [
        "audience",
        "reutilização em outra API."
      ],
      [
        "exp / nbf / relógio",
        "uso fora da janela permitida."
      ],
      [
        "typ / profile",
        "confusão entre access token, ID token e outros JWTs."
      ],
      [
        "scopes e claims",
        "operação além da autoridade concedida."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Conteúdo não criptografado"
  },
  {
    "kind": "paragraph",
    "text": "Um JWT assinado normalmente protege integridade, não confidencialidade. Evite PII e dados desnecessários. O token passa por clientes, proxies, gateways, ferramentas e logs; trate-o como credencial sensível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.17 Consentimento, least privilege e Rich Authorization Requests",
    "id": "16-17-consentimento-least-privilege-e-rich-authorization-requests"
  },
  {
    "kind": "paragraph",
    "text": "Consentimento é uma interface de decisão, não um substituto para política. Em ambientes corporativos, algumas permissões são aprovadas por administradores ou contratos, enquanto outras dependem do usuário. A tela deve identificar cliente, dados, ações, duração e consequências, evitando scopes técnicos incompreensíveis."
  },
  {
    "kind": "paragraph",
    "text": "Least privilege começa na definição dos scopes e continua no resource server. Solicitar todos os scopes “para evitar novo consentimento” aumenta impacto de vazamento. Incremental authorization permite pedir autoridade adicional apenas quando a funcionalidade é usada. O authorization server pode conceder subconjunto e o cliente precisa verificar a resposta."
  },
  {
    "kind": "paragraph",
    "text": "Rich Authorization Requests representa detalhes estruturados, como valor, moeda, conta e tipo de transação. Isso permite autorizações mais precisas do que strings de scope, especialmente em pagamentos e dados financeiros. O objeto de autorização deve ser validado, assinado ou protegido conforme o perfil adotado e não deve ser aceito como dado livre enviado pelo cliente à API."
  },
  {
    "kind": "subhead",
    "text": "Rich Authorization Request - exemplo didático"
  },
  {
    "kind": "code",
    "text": "{\n  \"authorization_details\": [{\n    \"type\": \"payment_initiation\",\n    \"instructedAmount\": {\"currency\": \"BRL\", \"amount\": \"150.00\"},\n    \"creditorAccount\": {\"iban\": \"EXEMPLO\"}\n  }]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.18 PAR, JAR e JARM",
    "id": "16-18-par-jar-e-jarm"
  },
  {
    "kind": "paragraph",
    "text": "Pushed Authorization Requests permite ao cliente enviar parâmetros ao authorization server por back-channel e receber request_uri de curta duração. O navegador transporta apenas a referência. Isso reduz manipulação, exposição e tamanho da URL, além de permitir autenticação do cliente antes da interação do usuário."
  },
  {
    "kind": "paragraph",
    "text": "JWT-Secured Authorization Request representa a solicitação em um JWT assinado e, opcionalmente, criptografado. O authorization server valida integridade e origem dos parâmetros. PAR e JAR podem ser combinados: o cliente envia um request object assinado ao endpoint PAR e usa o request_uri no authorization endpoint."
  },
  {
    "kind": "paragraph",
    "text": "JARM protege a resposta de autorização em um JWT assinado ou criptografado. Em vez de confiar somente em parâmetros soltos no redirect, o cliente valida issuer, audience, assinatura e tempo. Esses mecanismos aumentam complexidade e gestão de chaves, por isso são mais comuns em perfis financeiros, ecossistemas regulados e integrações de alto risco."
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - Mecanismos protegem etapas diferentes do front-channel.",
    "headers": [
      "Mecanismo",
      "Protege",
      "Benefício"
    ],
    "rows": [
      [
        "PAR",
        "envio dos parâmetros",
        "back-channel autenticado e URL reduzida."
      ],
      [
        "JAR",
        "conteúdo da solicitação",
        "integridade, origem e possível confidencialidade."
      ],
      [
        "JARM",
        "resposta de autorização",
        "assinatura, issuer e audience verificáveis."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/figure-04.svg",
    "alt": "Comparação entre bearer token e sender-constrained token",
    "caption": "Figura 4 - Proof-of-possession reduz a utilidade de um token copiado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.19 Sender-constrained tokens com mTLS e DPoP",
    "id": "16-19-sender-constrained-tokens-com-mtls-e-dpop"
  },
  {
    "kind": "paragraph",
    "text": "Bearer token funciona como dinheiro ao portador: quem obtém o valor pode apresentá-lo. Sender-constrained token vincula o access token a uma chave do cliente. O resource server exige, além do token, uma prova de posse correspondente. O objetivo é reduzir replay após vazamento em logs, proxies, memória ou canais laterais."
  },
  {
    "kind": "paragraph",
    "text": "Com mTLS, o authorization server associa o token ao certificado do cliente e o resource server verifica o certificado apresentado na conexão. O claim cnf pode carregar thumbprint. A arquitetura precisa garantir que a API observe a identidade TLS correta mesmo quando há load balancers ou gateways terminando conexões."
  },
  {
    "kind": "paragraph",
    "text": "DPoP usa um JWT de prova assinado pelo cliente em cada requisição, contendo método HTTP, URI, horário, identificador único e vínculo ao access token. A API valida assinatura, htm, htu, iat, jti, chave e ath. DPoP é proteção de camada de aplicação e não substitui TLS. Nonce do servidor e cache de jti podem fortalecer replay defense conforme o risco."
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - A escolha depende de cliente, infraestrutura e risco.",
    "headers": [
      "Mecanismo",
      "Vínculo",
      "Ponto forte",
      "Desafio"
    ],
    "rows": [
      [
        "mTLS",
        "certificado na conexão",
        "forte para clientes e serviços controlados",
        "proxies, PKI e terminação TLS."
      ],
      [
        "DPoP",
        "chave e prova por requisição",
        "aplicável sem certificado cliente",
        "validação de URI, relógio, jti e chave."
      ],
      [
        "Bearer",
        "nenhum",
        "simplicidade e compatibilidade",
        "replay após cópia do token."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.20 Token Exchange e on-behalf-of",
    "id": "16-20-token-exchange-e-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas de serviços, o primeiro backend pode precisar chamar outro mantendo parte da autoridade original. Encaminhar o mesmo access token para todos os serviços amplia audiences e expõe a credencial. Token Exchange permite trocar um subject token por outro token apropriado ao próximo recurso."
  },
  {
    "kind": "paragraph",
    "text": "O novo token pode representar o usuário, o serviço ator ou ambos. Claims de actor ajudam a registrar a cadeia. A política deve limitar quais clientes podem trocar tokens, quais audiences podem ser solicitadas e quais scopes podem ser preservados. A troca não deve elevar privilégio além do token de entrada e da autoridade do ator."
  },
  {
    "kind": "paragraph",
    "text": "On-behalf-of é uma implementação de delegação em que um serviço atua em nome do usuário. Logs precisam preservar usuário, cliente inicial, serviço intermediário e autorização efetiva. Se uma chamada passa por vários domínios de confiança, cada emissão deve ser tratada como nova decisão, não como simples cópia de headers."
  },
  {
    "kind": "table",
    "caption": "Tabela 13 - Preserve contexto sem reutilizar autoridade indiscriminadamente.",
    "headers": [
      "Estratégia",
      "Vantagem",
      "Risco"
    ],
    "rows": [
      [
        "Encaminhar token original",
        "simples",
        "audience ampla, vazamento e acoplamento."
      ],
      [
        "Token Exchange",
        "token específico por salto",
        "complexidade de política e correlação."
      ],
      [
        "Credencial do serviço apenas",
        "separa backend",
        "perde contexto do usuário quando ele é necessário."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.21 Metadata do authorization server e do recurso protegido",
    "id": "16-21-metadata-do-authorization-server-e-do-recurso-protegido"
  },
  {
    "kind": "paragraph",
    "text": "Authorization Server Metadata publica issuer, endpoints, métodos de autenticação, grants, scopes e algoritmos. Clientes devem obter o documento de origem configurada e validar coerência entre issuer e URL. Metadata simplifica rotação e interoperabilidade, mas não deve transformar descoberta em confiança automática."
  },
  {
    "kind": "paragraph",
    "text": "Protected Resource Metadata permite que uma API publique identificador do recurso, authorization servers relacionados, scopes e métodos de apresentação suportados. Isso ajuda clientes e authorization servers a entender como obter tokens para um recurso e melhora desafios WWW-Authenticate."
  },
  {
    "kind": "paragraph",
    "text": "Metadata deve ser versionada e monitorada como parte da plataforma. Mudanças em endpoint, algoritmo ou issuer podem interromper todos os clientes. Cache precisa respeitar disponibilidade sem congelar configuração indefinidamente. Ambientes internos, externos e de homologação devem ter documentos separados para impedir mistura de confiança."
  },
  {
    "kind": "subhead",
    "text": "Authorization Server Metadata - trecho ilustrativo"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"code_challenge_methods_supported\": [\"S256\"]\n}"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/pt/figure-05.svg",
    "alt": "OAuth em arquitetura corporativa com API Gateway e backend",
    "caption": "Figura 5 - O gateway atua como enforcement transversal; a autorização de domínio permanece no backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.22 OAuth em API Gateways, Axway e Azure",
    "id": "16-22-oauth-em-api-gateways-axway-e-azure"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways podem validar access tokens, consultar introspecção, exigir scopes, aplicar quota por client_id e propagar contexto confiável. Antes de inserir headers internos, o gateway deve remover versões fornecidas pelo cliente. O backend deve aceitar esses headers apenas de uma conexão autenticada proveniente do gateway."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, validate-jwt e validate-azure-ad-token podem validar tokens antes do backend. Policies podem exigir issuer, audience e claims, enquanto authentication-managed-identity permite ao gateway obter token para um backend compatível. A configuração do developer portal para OAuth facilita testes, mas não substitui enforcement na policy."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, filtros e serviços OAuth podem implementar authorization server, validação de token, autenticação de clientes e políticas de resource server. A topologia precisa registrar qual componente emite, qual valida, onde chaves são armazenadas e como revogação e rotação são tratadas. Como versões e licenças mudam, valide a documentação do produto instalado."
  },
  {
    "kind": "subhead",
    "text": "Azure API Management - policy conceitual"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences><audience>api://pagamentos</audience></audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\"><value>pagamentos.read</value></claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Divisão de responsabilidade"
  },
  {
    "kind": "paragraph",
    "text": "O gateway valida issuer, audience, assinatura, tempo, scopes e requisitos transversais. O backend continua verificando tenant, ownership, estado da transação, limites de negócio e autorização de objeto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.23 Ameaças e hardening",
    "id": "16-23-ameacas-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Intercepção de authorization code é reduzida por PKCE. CSRF e login CSRF exigem state e vínculo transacional. Mix-up exige associação ao issuer. Redirect URI manipulation exige comparação exata. Token leakage exige TLS, higiene de logs, headers corretos, armazenamento seguro e redução de TTL. Token replay pode exigir sender constraint."
  },
  {
    "kind": "paragraph",
    "text": "Open redirectors no cliente ou authorization server ampliam desvio de códigos. Referer, histórico e analytics podem capturar parâmetros do front-channel. Tokens em query string vazam com facilidade e não devem ser usados como forma normal de apresentação. Access tokens devem seguir Authorization header e respostas precisam de Cache-Control adequado."
  },
  {
    "kind": "paragraph",
    "text": "Authorization servers devem proteger endpoints contra brute force, credential stuffing, request flooding e abuso de user_code. Clientes precisam validar todas as respostas e não exibir detalhes internos. Resource servers devem limitar algoritmos, validar audience e não confiar em claims sem namespace e governança. Toda implantação necessita inventário de clientes, owners, grants, redirect URIs e chaves."
  },
  {
    "kind": "table",
    "caption": "Tabela 14 - Controles devem produzir evidências observáveis.",
    "headers": [
      "Ameaça",
      "Controle principal",
      "Evidência"
    ],
    "rows": [
      [
        "Code interception",
        "PKCE S256 e code de uso único",
        "falhas de verifier e reutilização."
      ],
      [
        "CSRF / login injection",
        "state vinculado à sessão",
        "state ausente, divergente ou consumido."
      ],
      [
        "AS mix-up",
        "issuer e metadata vinculados",
        "issuer da resposta e token endpoint usado."
      ],
      [
        "Token replay",
        "TTL, mTLS/DPoP e detecção",
        "jti, thumbprint e origem."
      ],
      [
        "Refresh token theft",
        "rotação e reuse detection",
        "família revogada e evento de risco."
      ],
      [
        "Redirect abuse",
        "comparação exata e sem open redirect",
        "URI registrada e URI recebida."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Práticas desaconselhadas"
  },
  {
    "kind": "paragraph",
    "text": "Não use Implicit Grant ou Resource Owner Password Credentials em novos projetos. Não armazene client_secret em cliente público. Não aceite redirect URI por prefixo. Não trate ID token como access token. Não aceite JWT somente porque “decodificou sem erro”."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.24 Troubleshooting orientado por evidências",
    "id": "16-24-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico começa identificando o endpoint e a etapa. Erro no authorization endpoint envolve parâmetros, sessão, política e redirect URI. Erro no token endpoint envolve client authentication, code, verifier, grant e relógio. Erro na API envolve apresentação, validação e autorização. Misturar essas etapas transforma invalid_grant em “JWT inválido” ou 403 em “falha do login”."
  },
  {
    "kind": "paragraph",
    "text": "Colete correlation ID, issuer esperado, client_id, grant_type, redirect URI normalizada, scopes, audience, kid, horário e status sem registrar tokens ou códigos. Compare o relógio dos componentes. Confirme metadata e JWKS acessadas pelo runtime, não apenas pelo notebook do operador. Em ambientes com proxy, registre hostname, TLS e destino real."
  },
  {
    "kind": "paragraph",
    "text": "Para intermitência, investigue rotação de chaves, múltiplos nós com cache divergente, reutilização concorrente de authorization code ou refresh token, balanceamento sem afinidade de estado e DNS. Reproduza com um único fluxo controlado e tokens sintéticos. Um token pode funcionar em um gateway e falhar em outro por configuração ou cache diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 15 - Classifique a etapa antes de alterar policies.",
    "headers": [
      "Erro",
      "Hipóteses iniciais",
      "Evidência"
    ],
    "rows": [
      [
        "invalid_request",
        "parâmetro ausente, duplicado ou incompatível",
        "requisição normalizada e metadata."
      ],
      [
        "invalid_client",
        "método, segredo, certificado ou assertion",
        "client_id, auth method, jti e certificate thumbprint."
      ],
      [
        "invalid_grant",
        "code expirado/usado, PKCE, redirect URI ou refresh revogado",
        "estado da transação e histórico de uso."
      ],
      [
        "invalid_token",
        "assinatura, issuer, audience, tempo ou revogação",
        "reason code interno e kid."
      ],
      [
        "insufficient_scope",
        "token válido sem autoridade necessária",
        "scope concedido e política da operação."
      ],
      [
        "401/403 divergente",
        "camadas diferentes responderam",
        "Via, Server, request-id e logs correlacionados."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Erro externo estável; causa detalhada permanece no log seguro"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"pagamentos\",\n  error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://errors.example/oauth/invalid-token\",\n  \"status\": 401,\n  \"correlationId\": \"corr-8f12\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.25 Estudos de caso",
    "id": "16-25-estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - SPA com segredo embutido"
  },
  {
    "kind": "paragraph",
    "text": "Uma SPA envia client_secret no token request. O valor é visível no bundle e pode ser copiado por qualquer usuário. A correção é registrar o cliente como público, usar Authorization Code com PKCE e redirect URI exata. Se o risco de tokens no browser for alto, adotar BFF e cookie protegido."
  },
  {
    "kind": "paragraph",
    "text": "A investigação também verifica CORS, armazenamento de token, XSS, logout e renovação. Apenas remover o segredo não resolve exposição de refresh token ou access token persistido em localStorage."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Token aceito por API errada"
  },
  {
    "kind": "paragraph",
    "text": "Duas APIs confiam no mesmo issuer e chave, mas uma delas não valida audience. Um token emitido para relatórios é aceito em pagamentos. A correção é exigir audience específica e separar scopes. Em sistemas críticos, resource indicators e tokens por recurso reduzem a possibilidade de reutilização cruzada."
  },
  {
    "kind": "paragraph",
    "text": "Os testes de contrato de segurança devem enviar tokens válidos para audiences vizinhas e esperar rejeição. Essa verificação negativa precisa existir em gateway e backend quando ambos validam tokens."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Refresh token reutilizado após timeout"
  },
  {
    "kind": "paragraph",
    "text": "O cliente usa um refresh token, recebe timeout e repete a chamada. O primeiro processamento havia emitido novo token; a repetição parece roubo e a família é revogada. A solução combina idempotência operacional, janela de tolerância controlada ou lógica de cliente que serializa renovação e trata respostas perdidas."
  },
  {
    "kind": "paragraph",
    "text": "Uma tolerância ampla enfraquece detecção de reutilização. A decisão deve considerar risco, rede e capacidade de correlacionar tentativas. Logs precisam registrar família, token predecessor, cliente e resultado sem armazenar o valor bruto."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - Gateway valida, backend rejeita"
  },
  {
    "kind": "paragraph",
    "text": "O gateway aceita o token para sua própria audience e o encaminha ao backend, que espera token destinado a ele. A arquitetura precisa escolher: backend confia no contexto propagado pelo gateway em canal autenticado, ou gateway obtém um novo token para o backend usando managed identity, client credentials ou token exchange."
  },
  {
    "kind": "paragraph",
    "text": "Encaminhar o token original só é correto quando o backend é o resource server daquela audience. A decisão deve estar documentada no contrato de segurança e testada com múltiplas APIs."
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
    "text": "Laboratório 1 - Authorization Code com PKCE"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use um authorization server de laboratório ou simulador autorizado.",
      "Gere verifier aleatório e challenge S256.",
      "Execute o fluxo correto e registre apenas valores sintéticos.",
      "Repita com verifier errado, state divergente, code reutilizado e redirect URI alterada.",
      "Classifique cada erro pela etapa e pelo endpoint."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - validação de audience e scope"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure duas APIs com audiences diferentes.",
      "Emita token para a API A e tente usá-lo na API B.",
      "Teste scope ausente, expirado e issuer alternativo.",
      "Compare resposta externa e reason code interno."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - introspecção e cache"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use tokens opacos de laboratório e endpoint de introspecção.",
      "Meça latência sem cache e com cache curto.",
      "Revogue o token e observe a janela até a rejeição.",
      "Documente a decisão entre disponibilidade e rapidez de revogação."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 4 - rotação de refresh token"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Obtenha um refresh token sintético.",
      "Renove e confirme emissão de sucessor.",
      "Reutilize o predecessor e observe a política da família.",
      "Simule duas renovações concorrentes e analise o resultado."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 5 - policy no gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure issuer, audience e scope em gateway de laboratório.",
      "Teste kid desconhecido e atualização de JWKS.",
      "Remova headers de identidade enviados pelo cliente.",
      "Propague somente claims validadas e compare com autorização do backend."
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
    "text": "OAuth 2.0 é um framework de delegação. Resource owner, client, authorization server e resource server possuem responsabilidades diferentes. Authorization endpoint e token endpoint usam canais distintos, e cada artefato - code, access token, refresh token e ID token - possui destinatário e ciclo de vida próprio."
  },
  {
    "kind": "paragraph",
    "text": "Authorization Code com PKCE é a base moderna para aplicações com usuário. PKCE protege contra interceptação, state vincula a transação, nonce pertence ao OIDC e issuer protege clientes multiemissor. Clientes públicos não possuem segredo confiável; clientes confidenciais podem usar secret, private_key_jwt ou mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Client Credentials representa a aplicação, Device Authorization atende entrada limitada e refresh tokens exigem rotação ou sender constraint. Access tokens precisam de audience e escopo mínimos. Tokens opacos favorecem controle central; JWTs favorecem validação local, mas exigem verificação completa e gestão de chaves."
  },
  {
    "kind": "paragraph",
    "text": "PAR, JAR, JARM e RAR fortalecem solicitações e respostas; mTLS e DPoP reduzem replay; Token Exchange controla delegação entre serviços. API Gateways aplicam validação transversal, enquanto backends preservam autorização de domínio. Segurança depende de inventário, least privilege, redirect URI exata, higiene de logs, observabilidade e testes negativos."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 17 aprofundará OpenID Connect: ID Token, UserInfo, nonce, acr, amr, autenticação federada, sessões, logout e integração segura de aplicações com provedores de identidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de OAuth 2.0",
    "id": "checklist-de-oauth-2-0"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada cliente possui owner, tipo, redirect URIs e grants explicitamente registrados.",
      "Authorization Code usa PKCE S256, inclusive para clientes confidenciais.",
      "State é aleatório, de uso único e vinculado a issuer, redirect URI e verifier.",
      "Clientes públicos não dependem de client_secret.",
      "Redirect URIs usam correspondência exata e não contêm open redirectors.",
      "Implicit e password grants não são usados em novos projetos.",
      "Access tokens possuem audience e scopes mínimos.",
      "ID token não é aceito como access token.",
      "Refresh tokens têm rotação, sender constraint ou política equivalente.",
      "JWTs validam assinatura, algoritmo, issuer, audience, tipo e tempo.",
      "Introspection é autenticada e possui cache compatível com revogação.",
      "Tokens não aparecem em URL, logs, analytics ou mensagens de erro.",
      "mTLS ou DPoP é considerado para risco elevado de replay.",
      "Gateway e backend têm divisão explícita de autorização.",
      "Rotação de JWKS, certificados e client credentials é testada.",
      "Erros OAuth são correlacionáveis sem revelar detalhes sensíveis.",
      "Clientes, grants, consentimentos e tokens possuem processo de desligamento."
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
      "Explique por que OAuth 2.0 não é, sozinho, um protocolo de autenticação do usuário.",
      "Diferencie authorization code, access token, refresh token e ID token.",
      "Descreva as verificações do Authorization Code com PKCE.",
      "Explique por que state e PKCE não são substitutos um do outro.",
      "Classifique uma SPA e justifique por que seu client_secret não é confiável.",
      "Compare client_secret_basic, private_key_jwt e mTLS.",
      "Modele Client Credentials para um job sem usuário.",
      "Explique reuse detection em refresh token rotation.",
      "Compare token opaco com JWT em revogação e disponibilidade.",
      "Liste validações obrigatórias de um JWT access token.",
      "Explique audience e resource indicators em plataforma com múltiplas APIs.",
      "Compare PAR, JAR e JARM.",
      "Diferencie mTLS-bound token e DPoP-bound token.",
      "Proponha Token Exchange para três serviços preservando o usuário.",
      "Monte roteiro de troubleshooting para invalid_grant intermitente."
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
    "caption": "Tabela 16 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Access token",
        "Credencial apresentada ao resource server para exercer autoridade."
      ],
      [
        "Authorization code",
        "Grant curto e de uso único trocado no token endpoint."
      ],
      [
        "Authorization server",
        "Componente que avalia autorização e emite tokens."
      ],
      [
        "Bearer token",
        "Token utilizável por qualquer portador do valor."
      ],
      [
        "Client",
        "Aplicação que solicita e usa autoridade."
      ],
      [
        "Client Credentials",
        "Grant em que a aplicação age em seu próprio nome."
      ],
      [
        "Confidential client",
        "Cliente capaz de proteger credenciais de autenticação."
      ],
      [
        "device_code",
        "Artefato usado no polling do Device Authorization Grant."
      ],
      [
        "DPoP",
        "Prova por requisição que vincula token a uma chave."
      ],
      [
        "Grant",
        "Representação de autorização usada para obter token."
      ],
      [
        "Introspection",
        "Consulta autenticada sobre atividade e atributos de token."
      ],
      [
        "JAR",
        "Solicitação de autorização protegida em JWT."
      ],
      [
        "JARM",
        "Resposta de autorização protegida em JWT."
      ],
      [
        "JWT access token",
        "Access token estruturado e assinado conforme perfil."
      ],
      [
        "PAR",
        "Envio antecipado de parâmetros por back-channel."
      ],
      [
        "PKCE",
        "Prova que vincula a troca do code à instância do cliente."
      ],
      [
        "Public client",
        "Cliente incapaz de manter segredo de forma confiável."
      ],
      [
        "Refresh token",
        "Credencial usada para obter novos access tokens."
      ],
      [
        "Resource owner",
        "Entidade capaz de conceder acesso ao recurso."
      ],
      [
        "Resource server",
        "API que aceita access tokens e protege recursos."
      ],
      [
        "Scope",
        "Representação textual de autoridade solicitada ou concedida."
      ],
      [
        "Sender-constrained token",
        "Token vinculado à prova de uma chave do cliente."
      ],
      [
        "State",
        "Valor que vincula solicitação e resposta e auxilia contra CSRF."
      ],
      [
        "Token Exchange",
        "Grant para trocar um token por outro adequado a novo contexto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de escolha de fluxo",
    "id": "anexo-a-matriz-de-escolha-de-fluxo"
  },
  {
    "kind": "table",
    "caption": "Tabela 17 - A escolha final depende de plataforma, risco e capacidade do cliente.",
    "headers": [
      "Cenário",
      "Fluxo inicial",
      "Controles essenciais"
    ],
    "rows": [
      [
        "Aplicação web com usuário",
        "Authorization Code + PKCE",
        "cliente confidencial, state, cookie protegido e redirect URI exata."
      ],
      [
        "SPA pura",
        "Authorization Code + PKCE",
        "cliente público, XSS hardening, token curto e sem secret."
      ],
      [
        "SPA de maior risco",
        "BFF + Authorization Code + PKCE",
        "tokens no servidor, CSRF e cookie HttpOnly/SameSite."
      ],
      [
        "Aplicativo nativo",
        "Authorization Code + PKCE",
        "browser externo, app/universal link e armazenamento do sistema."
      ],
      [
        "Serviço para serviço",
        "Client Credentials",
        "private_key_jwt, mTLS ou workload identity; audience mínima."
      ],
      [
        "Dispositivo limitado",
        "Device Authorization Grant",
        "user_code expirável, polling controlado e anti-phishing."
      ],
      [
        "Cadeia de serviços",
        "Token Exchange / on-behalf-of",
        "audience por salto, actor e correlação."
      ],
      [
        "Ecossistema regulado",
        "Code + PKCE + PAR/JAR/JARM",
        "RAR, sender constraint, assinatura e auditoria reforçada."
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
      "IETF. RFC 6749 - The OAuth 2.0 Authorization Framework. 2012.",
      "IETF. RFC 6750 - OAuth 2.0 Bearer Token Usage. 2012.",
      "IETF. RFC 7009 - OAuth 2.0 Token Revocation. 2013.",
      "IETF. RFC 7519 - JSON Web Token (JWT). 2015.",
      "IETF. RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients. 2015.",
      "IETF. RFC 7662 - OAuth 2.0 Token Introspection. 2015.",
      "IETF. RFC 8252 - OAuth 2.0 for Native Apps. 2017.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8628 - OAuth 2.0 Device Authorization Grant. 2019.",
      "IETF. RFC 8693 - OAuth 2.0 Token Exchange. 2020.",
      "IETF. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens. 2020.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9101 - JWT-Secured Authorization Request. 2021.",
      "IETF. RFC 9126 - Pushed Authorization Requests. 2021.",
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 Access Tokens. 2021.",
      "IETF. RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification. 2022.",
      "IETF. RFC 9396 - OAuth 2.0 Rich Authorization Requests. 2023.",
      "IETF. RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession. 2023.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "IETF. RFC 9701 - JWT Response for OAuth Token Introspection. 2025.",
      "IETF. RFC 9728 - OAuth 2.0 Protected Resource Metadata. 2025.",
      "IETF OAuth Working Group. The OAuth 2.1 Authorization Framework - Internet-Draft, versão consultada em 2026.",
      "Microsoft Learn. Azure API Management authentication, validate-jwt, validate-azure-ad-token e managed identity policies.",
      "Axway Documentation. OAuth 2.0 services, client authentication e token validation no API Gateway.",
      "OpenID Foundation. Financial-grade API Security Profile e OpenID Connect specifications, quando aplicáveis ao ecossistema."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "OAuth evolui por RFCs, Best Current Practices, perfis e drafts. Antes de implantar um fluxo ou policy, valide a especificação atual, a documentação da versão do produto e o comportamento em ambiente autorizado. Trate Internet-Drafts como trabalho em progresso, não como substitutos automáticos de RFCs."
  }
];
