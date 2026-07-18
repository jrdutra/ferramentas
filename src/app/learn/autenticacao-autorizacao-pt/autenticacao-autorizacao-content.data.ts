import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const AUTHENTICATION_AUTHORIZATION_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Da identidade à decisão de acesso em uma API corporativa"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/pt/overview.svg",
    "alt": "Cadeia de identidade, credencial, autenticação, token, sessão e autorização em uma API corporativa",
    "caption": "Figura de abertura - A segurança de acesso é uma cadeia de provas, asserções e decisões contextualizadas."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Autenticar prova quem ou o que está chamando; autorizar decide o que essa identidade pode fazer agora."
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
    "text": "O capítulo anterior ampliou o repertório de comunicação ao apresentar GraphQL, gRPC e WebSocket. Independentemente do protocolo ou estilo adotado, qualquer interface corporativa precisa responder duas perguntas fundamentais: quem ou o que está realizando a chamada e o que essa identidade pode fazer naquele contexto. Uma API não deve aceitar uma operação apenas porque a mensagem chegou por HTTPS ou contém um header chamado Authorization. É necessário identificar o chamador, validar a prova apresentada, entender em nome de quem a operação é executada e aplicar uma política coerente ao recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "Identidade em APIs envolve pessoas, aplicações, dispositivos e workloads. Esses sujeitos possuem ciclos de vida, formas de cadastro e credenciais diferentes. Um usuário pode se autenticar com múltiplos fatores; uma aplicação pode usar certificado, chave assimétrica ou federação; um pod pode receber uma identidade curta por atestação do ambiente. Tratar todos como usuário e senha produz segredos estáticos, baixa rastreabilidade e autorizações excessivas."
  },
  {
    "kind": "paragraph",
    "text": "Autenticação e autorização são responsabilidades distintas. A autenticação estabelece que uma credencial corresponde a uma identidade sob determinado nível de confiança. A autorização avalia se essa identidade pode executar uma ação específica sobre um recurso, considerando escopo, tenant, atributos, relacionamento, risco e estado do domínio. Uma autenticação forte não compensa uma política de autorização ampla ou inexistente."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo constrói a base conceitual para os capítulos posteriores de credenciais, OAuth 2.0, OpenID Connect e tokens. Serão estudados os limites entre autenticação e autorização, os elementos de identidade, sessões, claims, modelos RBAC/ABAC/ReBAC/PBAC, delegação, identidade de workload, arquitetura PEP/PDP, respostas 401/403, observabilidade e aplicação em API Gateways. Basic Auth, Digest, API Keys e OAuth aparecem apenas no nível necessário para estabelecer diferenças conceituais; seus detalhes serão aprofundados nos capítulos seguintes."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Em cada exemplo, identifique sujeito, principal, credencial, autenticador, emissor, audiência, recurso, política e ponto de enforcement. Essa decomposição evita a conclusão genérica de que “o token está válido” quando a decisão de acesso ainda está incorreta."
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
      "Diferenciar identidade, sujeito, principal, credencial, autenticador, sessão, token e claim.",
      "Separar autenticação, autorização, delegação, federação e auditoria.",
      "Distinguir identidades humanas, aplicações, dispositivos e workloads.",
      "Avaliar API keys, Basic, cookies, secrets, certificados, tokens e mecanismos proof-of-possession.",
      "Validar JWTs considerando algoritmo, chave, emissor, audiência, tempo, tipo e política.",
      "Compreender o papel de OAuth 2.0 e OpenID Connect sem confundir access token com prova de login.",
      "Comparar RBAC, ABAC, ReBAC e políticas orientadas a atributos e contexto.",
      "Projetar PEP, PDP, PIP e PAP em arquiteturas com gateway e serviços.",
      "Aplicar identidade de workload, managed identity, federação e SPIFFE em integrações máquina a máquina.",
      "Diagnosticar erros 401, 403, tokens rejeitados, claims ausentes e decisões divergentes entre gateway e backend."
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
      "14.1 Identidade como fundamento do controle de acesso",
      "14.2 Vocabulário: sujeito, principal, credencial e sessão",
      "14.3 Autenticação, autorização, delegação e auditoria",
      "14.4 Identidades humanas, aplicações, dispositivos e workloads",
      "14.5 Cadastro, vínculo e ciclo de vida da identidade",
      "14.6 Fatores e autenticadores de usuários",
      "14.7 Credenciais de aplicações e prova de posse",
      "14.8 API keys: utilidade e limitações",
      "14.9 HTTP Basic e credenciais estáticas",
      "14.10 Sessões, cookies, CORS e CSRF",
      "14.11 Tokens opacos, estruturados, bearer e sender-constrained",
      "14.12 Claims, issuer, subject, audience, scopes e roles",
      "14.13 JWT: estrutura e validação segura",
      "14.14 OAuth 2.0 e OpenID Connect: limites conceituais",
      "14.15 Modelos de autorização RBAC, ABAC, ReBAC e PBAC",
      "14.16 PEP, PDP, PIP e PAP",
      "14.17 Delegação, impersonation e on-behalf-of",
      "14.18 Identidade de workload e zero trust",
      "14.19 Identidade em API Gateways, Axway e Azure",
      "14.20 Respostas 401, 403 e insufficient_scope",
      "14.21 Logs, auditoria, privacidade e correlação",
      "14.22 Ameaças e hardening",
      "14.23 Troubleshooting orientado por evidências",
      "14.24 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.1 Identidade como fundamento do controle de acesso",
    "id": "14-1-identidade-como-fundamento-do-controle-de-acesso"
  },
  {
    "kind": "paragraph",
    "text": "Uma API expõe capacidades, dados e transições de negócio. Para protegê-los, o sistema precisa associar cada requisição a um principal confiável. O principal é a identidade operacional usada na decisão: uma pessoa, uma aplicação, um dispositivo, um workload ou uma combinação, como “aplicação X atuando em nome do usuário Y”. Sem essa associação, rate limits, trilhas de auditoria e autorizações tornam-se aproximações baseadas em IP ou em segredos compartilhados."
  },
  {
    "kind": "paragraph",
    "text": "Identidade não é sinônimo de nome textual. Um e-mail, client_id ou SPIFFE ID é um identificador; a confiança surge do processo que vincula esse identificador a uma credencial e da validação realizada em cada uso. Dois sistemas podem utilizar o mesmo texto e possuir domínios de confiança diferentes. Por isso, o identificador precisa ser interpretado junto ao emissor, tenant, tipo de sujeito e política de registro."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas com intermediários, cada salto pode autenticar identidades diferentes. O balanceador pode autenticar o certificado do gateway; o gateway pode validar o access token do consumidor; o backend pode receber claims propagadas ou um novo token emitido para o trecho interno. O desenho deve declarar onde a identidade é estabelecida, transformada, reduzida ou substituída."
  },
  {
    "kind": "subhead",
    "text": "Regra de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Nunca use apenas um valor fornecido pelo próprio cliente, como X-User-Id ou X-Role, como prova de identidade. O dado precisa vir de uma credencial validada ou ser inserido por um intermediário confiável que remova qualquer valor externo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.2 Sujeito, principal, credencial, autenticador e sessão",
    "id": "14-2-sujeito-principal-credencial-autenticador-e-sessao"
  },
  {
    "kind": "paragraph",
    "text": "O sujeito é a entidade sobre a qual uma afirmação é feita. Em uma autenticação humana, pode ser uma pessoa cadastrada. Em uma integração, pode ser um serviço. O principal é a representação dessa entidade dentro do sistema de segurança. Uma mesma pessoa pode possuir principals distintos em tenants diferentes; uma aplicação pode operar como principal próprio ou atuar em nome de um usuário."
  },
  {
    "kind": "paragraph",
    "text": "Credencial é o material utilizado para demonstrar controle ou vínculo: senha, chave privada, certificado, segredo de cliente, authenticator físico, cookie de sessão ou token. O autenticador é o mecanismo que contém ou produz a prova. Em terminologia de identidade digital, o processo de autenticação verifica que o claimant controla um ou mais autenticadores vinculados ao subscriber."
  },
  {
    "kind": "paragraph",
    "text": "Sessão é estado criado após autenticação para evitar repetir o processo completo em cada interação. Tokens podem representar sessão, delegação ou autorização, mas não são automaticamente a mesma coisa. Uma sessão de navegador pode existir no provedor de identidade enquanto a API recebe access tokens independentes e de curta duração."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Termos próximos possuem responsabilidades diferentes.",
    "headers": [
      "Termo",
      "Pergunta respondida",
      "Exemplo"
    ],
    "rows": [
      [
        "Identificador",
        "Como a entidade é nomeada?",
        "sub, client id, SPIFFE ID. _"
      ],
      [
        "Credencial",
        "Qual material é apresentado?",
        "senha, chave, certificado, token."
      ],
      [
        "Autenticação",
        "A prova é válida para esta identidade?",
        "MFA, assinatura, mTLS."
      ],
      [
        "Sessão",
        "Qual estado temporário foi criado?",
        "cookie seguro ou sessão no IdP."
      ],
      [
        "Autorização",
        "A ação é permitida neste contexto?",
        "scope, role, atributo e regra de domínio."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/pt/figure-01.svg",
    "alt": "Identidade autenticada passando por uma decisão de autorização contextual",
    "caption": "Figura 1 - Uma identidade autenticada ainda precisa passar por uma decisão de autorização contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.3 Autenticação, autorização, delegação e auditoria",
    "id": "14-3-autenticacao-autorizacao-delegacao-e-auditoria"
  },
  {
    "kind": "paragraph",
    "text": "Autenticação valida uma prova. Autorização decide acesso. Delegação permite que um cliente obtenha autoridade limitada para agir em nome de outro sujeito. Federação permite que um domínio aceite asserções produzidas por outro domínio de confiança. Auditoria registra fatos suficientes para reconstruir quem fez o quê, em qual recurso, com qual decisão e qual resultado."
  },
  {
    "kind": "paragraph",
    "text": "Essas funções podem ocorrer em componentes distintos. Um provedor de identidade autentica o usuário; um authorization server emite um access token; o API Gateway valida o token e aplica políticas transversais; o backend verifica autorização fina relacionada ao estado do recurso. Concentrar toda decisão no gateway pode exigir dados de domínio que ele não possui; concentrar tudo no backend duplica controles e reduz governança."
  },
  {
    "kind": "paragraph",
    "text": "O desenho deve separar decisão e enforcement. Uma política pode ser avaliada localmente pelo gateway, por um serviço central ou em conjunto com o backend. Independentemente do modelo, a requisição precisa carregar contexto verificável e a decisão deve ser registrável. Transformações invisíveis de identidade geram confusão em incidentes e auditorias."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - As funções se encadeiam, mas não devem ser confundidas.",
    "headers": [
      "Função",
      "Entrada principal",
      "Saída"
    ],
    "rows": [
      [
        "Autenticação",
        "credencial, prova e contexto",
        "principal autenticado e nível de confiança."
      ],
      [
        "Autorização",
        "principal, ação, recurso e atributos",
        "permitir, negar ou exigir condição adicional."
      ],
      [
        "Delegação",
        "consentimento ou autoridade concedida",
        "token limitado para agir em nome de outro."
      ],
      [
        "Federação",
        "asserção de outro domínio",
        "identidade aceita segundo trust policy."
      ],
      [
        "Auditoria",
        "eventos e decisões",
        "trilha correlacionada e investigável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.4 Identidades humanas, aplicações, dispositivos e workloads",
    "id": "14-4-identidades-humanas-aplicacoes-dispositivos-e-workloads"
  },
  {
    "kind": "paragraph",
    "text": "Identidades humanas possuem características como vínculo empregatício, conta pessoal, consentimento, recuperação e autenticação multifator. O risco inclui phishing, sequestro de sessão, compartilhamento de conta e uso após desligamento. A autorização costuma considerar função, unidade, relacionamento com o recurso e ações realizadas em nome próprio."
  },
  {
    "kind": "paragraph",
    "text": "Aplicações e workloads são identidades não humanas. Elas não digitam uma senha nem respondem a um segundo fator. Precisam de credenciais provisionadas, atestação do ambiente ou federação. O ciclo de vida deve acompanhar deploy, rotação, mudança de owner e desativação. Um secret sem proprietário e sem expiração é uma dívida operacional e de segurança."
  },
  {
    "kind": "paragraph",
    "text": "Dispositivos podem fornecer sinais de postura, registro ou chave protegida por hardware. A identidade do dispositivo não substitui a identidade do usuário ou da aplicação; ela acrescenta contexto. Uma requisição pode envolver simultaneamente usuário, cliente OAuth, dispositivo e workload que executa o backend. Claims e logs precisam preservar essas camadas sem colapsá-las em um único campo."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Cada classe de identidade exige controles próprios.",
    "headers": [
      "Tipo",
      "Identificador típico",
      "Credencial preferível",
      "Risco de ciclo de vida"
    ],
    "rows": [
      [
        "Humano",
        "subject por tenant",
        "phishing-resistant MFA quando aplicável",
        "desligamento, recuperação e sessão."
      ],
      [
        "Aplicação",
        "client id / service principal _",
        "chave assimétrica ou federação",
        "segredo órfão e permissões amplas."
      ],
      [
        "Workload",
        "service account / SPIFFE ID",
        "credencial curta emitida por atestação",
        "réplica efêmera e identidade compartilhada."
      ],
      [
        "Dispositivo",
        "device ID e chave",
        "chave protegida e registro",
        "perda, clonagem ou postura desatualizada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.5 Cadastro, vínculo e ciclo de vida da identidade",
    "id": "14-5-cadastro-vinculo-e-ciclo-de-vida-da-identidade"
  },
  {
    "kind": "paragraph",
    "text": "Autenticação segura começa antes do login. O cadastro precisa estabelecer quem pode criar a identidade, quais atributos são confiáveis, quem é o proprietário e como o vínculo será revogado. Em identidades humanas, isso pode envolver prova de identidade e processos de RH. Em aplicações, envolve registro, owner técnico, ambiente, finalidade, repositório e aprovação de permissões."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo de vida inclui criação, ativação, mudança, suspensão, recuperação, rotação e encerramento. O controle não deve depender apenas de remover uma credencial: roles, grants, sessões, refresh tokens, certificados e associações em catálogos também precisam ser invalidados. Desativar a conta sem encerrar sessões pode manter acesso por horas ou dias."
  },
  {
    "kind": "paragraph",
    "text": "Identidades compartilhadas eliminam accountability. Quando vários sistemas usam o mesmo client_id e segredo, é impossível atribuir tráfego com precisão, aplicar menor privilégio ou retirar apenas um consumidor. A individualização da identidade permite quotas, políticas, telemetria e resposta a incidentes por aplicação."
  },
  {
    "kind": "subhead",
    "text": "Controle mínimo de cadastro"
  },
  {
    "kind": "paragraph",
    "text": "Toda identidade de aplicação deve possuir owner, finalidade, ambiente, data de revisão, mecanismo de credencial, permissões aprovadas e procedimento de desativação. A ausência de qualquer item deve impedir a promoção para produção."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.6 Fatores e autenticadores de usuários",
    "id": "14-6-fatores-e-autenticadores-de-usuarios"
  },
  {
    "kind": "paragraph",
    "text": "Fatores de autenticação são frequentemente agrupados em algo que o usuário sabe, possui ou é. O número de fatores não basta para determinar resistência: dois segredos memorizados não equivalem a dois fatores independentes. Também é necessário avaliar resistência a phishing, replay, roubo do autenticador, recuperação e binding entre a sessão e o contexto."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs acessadas por aplicações interativas, a autenticação do usuário normalmente ocorre no provedor de identidade, não diretamente no endpoint de negócio. A API recebe uma asserção ou access token resultante. Isso permite centralizar políticas de MFA, risco e sessão, enquanto a API se concentra em validar o token e autorizar o recurso."
  },
  {
    "kind": "paragraph",
    "text": "O nível de autenticação pode variar por ação. Consultar dados de baixo risco pode usar sessão existente; alterar limite ou cadastrar favorecido pode exigir step-up. Claims como acr e amr podem transportar informações sobre o método, mas o consumidor deve interpretar apenas valores documentados pelo emissor e adequados à política."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Fatores e sinais devem ser avaliados pelo risco da jornada.",
    "headers": [
      "Categoria",
      "Exemplo",
      "Observação"
    ],
    "rows": [
      [
        "Conhecimento",
        "senha ou PIN",
        "vulnerável a phishing, reutilização e vazamento."
      ],
      [
        "Posse",
        "chave de segurança ou app autenticador",
        "a segurança depende de proteção e binding."
      ],
      [
        "Inerência",
        "biometria",
        "normalmente desbloqueia um autenticador; exige cuidado com privacidade."
      ],
      [
        "Contexto",
        "dispositivo, rede, risco",
        "é sinal adicional, não fator isolado universal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.7 Credenciais de aplicações e prova de posse",
    "id": "14-7-credenciais-de-aplicacoes-e-prova-de-posse"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações podem usar segredo compartilhado, certificado, chave privada, assinatura de mensagem, mTLS ou federação de identidade. Segredos são simples, porém qualquer cópia permite impersonation. Chaves assimétricas reduzem distribuição de segredo: a chave privada permanece no cliente e o verificador utiliza a chave pública ou certificado."
  },
  {
    "kind": "paragraph",
    "text": "Prova de posse significa que o cliente demonstra controle da chave, não apenas apresenta um valor copiável. mTLS vincula a autenticação ao certificado usado no canal. DPoP adiciona uma prova assinada ao nível HTTP e pode vincular tokens a uma chave. Esses mecanismos reduzem replay de tokens roubados, mas exigem validação de nonce, método, URI, thumbprint e janela temporal conforme o protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Federação de workload evita armazenar secrets de longa duração. Um ambiente externo apresenta uma asserção curta de seu provedor; o domínio de destino valida emissor, subject e condições e emite um token local. O trust deve ser restrito a subjects e audiences específicos, nunca a qualquer token emitido pelo provedor."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Credenciais de aplicações devem privilegiar prova de posse e automação.",
    "headers": [
      "Mecanismo",
      "Material no cliente",
      "Vantagem",
      "Cuidado"
    ],
    "rows": [
      [
        "Client secret",
        "segredo copiável",
        "amplo suporte",
        "rotação, vazamento e distribuição."
      ],
      [
        "Certificado / private key",
        "chave assimétrica",
        "prova criptográfica e separação de chave pública",
        "proteção da chave e ciclo de certificado."
      ],
      [
        "mTLS",
        "certificado no handshake",
        "autenticação do canal e token binding possível",
        "terminação TLS e proxies."
      ],
      [
        "Federação",
        "asserção curta do ambiente",
        "sem segredo estático local",
        "trust policy precisa ser específica."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.8 API keys: utilidade e limitações",
    "id": "14-8-api-keys-utilidade-e-limitacoes"
  },
  {
    "kind": "paragraph",
    "text": "Uma API key é um identificador secreto ou semissecreto associado a um consumidor, produto ou plano. Ela é útil para medição, quotas, descoberta de abuso e separação de tráfego. Entretanto, não representa automaticamente uma identidade forte. Se copiada, pode ser reutilizada por qualquer parte, e muitas implementações não possuem audience, expiração curta ou prova de posse."
  },
  {
    "kind": "paragraph",
    "text": "API keys não devem ser enviadas em query string, porque URLs aparecem em logs, histórico, analytics e referers. Prefira header dedicado ou Authorization conforme contrato. O valor deve ser tratado como segredo: armazenado com proteção, exibido uma única vez, rotacionável e nunca registrado integralmente."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs públicas de baixo risco, uma key pode complementar controles. Em operações sensíveis, deve ser combinada com autenticação e autorização adequadas. O gateway pode validar a key e aplicar plano, mas o backend ainda precisa autorizar o recurso quando a identidade ou o contexto de negócio importam."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de transporte por header"
  },
  {
    "kind": "code",
    "text": "GET /catalogo/produtos HTTP/1.1\nHost: api.empresa.example\nX-API-Key: <valor-secreto>"
  },
  {
    "kind": "subhead",
    "text": "Antipadrão"
  },
  {
    "kind": "paragraph",
    "text": "Não use GET /recurso?api_key=segredo. A URL pode ser registrada por proxies, servidores, ferramentas de APM e navegadores, ampliando a superfície de exposição."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.9 HTTP Basic e credenciais estáticas",
    "id": "14-9-http-basic-e-credenciais-estaticas"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic transporta um identificador e senha codificados em Base64. Base64 não é criptografia; o mecanismo depende de TLS para confidencialidade. O header pode ser reenviado em cada requisição e, quando uma credencial é compartilhada, qualquer vazamento permite uso até a rotação."
  },
  {
    "kind": "paragraph",
    "text": "Basic ainda aparece em integrações legadas e endpoints administrativos. O uso deve ser limitado a canais protegidos, credenciais individuais, escopo mínimo, rate limiting e rotação. Nunca reutilize senha humana de diretório como senha de integração. Uma credencial de serviço precisa possuir ciclo de vida e owner próprios."
  },
  {
    "kind": "paragraph",
    "text": "A migração pode aceitar Basic e token durante janela controlada, registrar consumidores restantes e retirar o mecanismo antigo. Apenas converter username/password em um token no gateway sem melhorar cadastro, rotação e autorização preserva a fragilidade original."
  },
  {
    "kind": "subhead",
    "text": "Estrutura conceitual"
  },
  {
    "kind": "code",
    "text": "Authorization: Basic base64(client-id:secret)\n# O conteúdo decodificado continua sendo um segredo reutilizável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.10 Sessões, cookies, CORS e CSRF",
    "id": "14-10-sessoes-cookies-cors-e-csrf"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações de navegador frequentemente usam cookies de sessão. O navegador os envia automaticamente ao domínio correspondente, o que cria risco de cross-site request forgery quando uma origem maliciosa induz uma requisição autenticada. SameSite, tokens anti-CSRF, validação de Origin e métodos adequados reduzem o risco; CORS não é mecanismo completo de proteção contra CSRF."
  },
  {
    "kind": "paragraph",
    "text": "Cookies de sessão devem usar Secure, HttpOnly quando não precisam ser lidos por JavaScript, escopo de Domain/Path mínimo e política SameSite compatível com a arquitetura. O identificador de sessão deve ser imprevisível e rotacionado após autenticação ou elevação de privilégio. Logout precisa encerrar estado no servidor quando a sessão é stateful."
  },
  {
    "kind": "paragraph",
    "text": "Em SPAs, armazenar bearer tokens em localStorage amplia impacto de XSS. Uma arquitetura backend-for-frontend pode manter tokens no servidor e expor ao navegador apenas cookie de sessão protegido. A escolha depende do modelo de ameaça, mas o desenho precisa considerar XSS, CSRF, exfiltração, refresh e múltiplas abas."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Sessões de navegador exigem controles além da autenticação inicial.",
    "headers": [
      "Controle",
      "Risco tratado",
      "Observação"
    ],
    "rows": [
      [
        "Secure",
        "envio em canal não TLS",
        "não protege contra script ou servidor comprometido."
      ],
      [
        "HttpOnly",
        "leitura por JavaScript",
        "reduz exfiltração direta por XSS."
      ],
      [
        "SameSite",
        "envio cross-site",
        "precisa ser compatível com login federado e fluxos legítimos."
      ],
      [
        "Origin / CSRF token",
        "requisição induzida",
        "o servidor deve validar em operações com efeito."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.11 Tokens opacos, estruturados, bearer e sender-constrained",
    "id": "14-11-tokens-opacos-estruturados-bearer-e-sender-constrained"
  },
  {
    "kind": "paragraph",
    "text": "Um token opaco não revela significado ao cliente. O resource server consulta introspecção ou estado local para descobrir atividade, subject, scope e expiração. Isso facilita revogação e reduz exposição de claims, mas introduz dependência de rede, cache e disponibilidade do authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Um token estruturado, como JWT, transporta claims verificáveis localmente. Isso reduz chamadas por requisição, porém a revogação imediata é mais difícil e o conteúdo pode ser copiado durante sua validade. Assinatura garante integridade e origem, não confidencialidade. O payload de um JWS normalmente é apenas codificado e pode ser lido."
  },
  {
    "kind": "paragraph",
    "text": "Bearer token concede acesso a quem o possui. Sender-constrained token exige prova adicional do cliente legítimo, como mTLS ou DPoP. O binding reduz replay, mas não elimina necessidade de expiração curta, audience correta, escopo mínimo e proteção do endpoint de emissão."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Formato e modelo de posse são decisões diferentes.",
    "headers": [
      "Tipo",
      "Validação",
      "Vantagem",
      "Limitação"
    ],
    "rows": [
      [
        "Opaco",
        "introspecção ou armazenamento local",
        "revogação e pouca exposição",
        "latência e dependência central."
      ],
      [
        "JWT assinado",
        "chave pública e claims",
        "validação local e interoperabilidade",
        "replay e revogação até expirar."
      ],
      [
        "Bearer",
        "posse do valor",
        "simplicidade",
        "roubo permite reutilização."
      ],
      [
        "Sender-constrained",
        "token mais prova de chave",
        "reduz replay por terceiros",
        "maior complexidade operacional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.12 Claims, issuer, subject, audience, scopes e roles",
    "id": "14-12-claims-issuer-subject-audience-scopes-e-roles"
  },
  {
    "kind": "paragraph",
    "text": "Claims são afirmações sobre o token, sujeito, cliente ou contexto. iss identifica o emissor; sub identifica o sujeito no domínio do emissor; aud indica o destinatário pretendido; exp, nbf e iat estabelecem tempo; jti pode identificar o token. A combinação iss + sub é mais segura que interpretar sub isoladamente."
  },
  {
    "kind": "paragraph",
    "text": "Scope representa autoridade delegada em termos compreensíveis pelo resource server. Role costuma representar função atribuída a usuário ou aplicação. Permission ou entitlement pode expressar capacidades mais específicas. Misturar todos no mesmo campo torna a política ambígua. A organização precisa definir vocabulário, namespace e semântica."
  },
  {
    "kind": "paragraph",
    "text": "Claims não devem carregar dados desnecessários ou sensíveis. Tokens passam por clientes, gateways, logs e ferramentas. Quando o backend necessita informação dinâmica, pode buscar dados por identificador ou usar um serviço de atributos. Claims muito grandes aumentam headers, latência e risco de exposição."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Claims precisam de semântica e validação explícitas.",
    "headers": [
      "Claim",
      "Significado",
      "Validação"
    ],
    "rows": [
      [
        "iss",
        "quem emitiu",
        "comparação exata com emissor confiável."
      ],
      [
        "sub",
        "sujeito no emissor",
        "interpretar junto ao iss e tipo de identidade."
      ],
      [
        "aud",
        "recurso destinatário",
        "deve incluir a API esperada."
      ],
      [
        "exp / nbf",
        "janela temporal",
        "usar relógio confiável e skew limitado."
      ],
      [
        "scope",
        "autoridade delegada",
        "exigir apenas os scopes necessários à operação."
      ],
      [
        "azp / client id _",
        "cliente autorizado",
        "distinguir aplicação do usuário."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/pt/figure-02.svg",
    "alt": "Cadeia de validação de token do formato à política de acesso",
    "caption": "Figura 2 - A assinatura é apenas uma etapa da validação de um token."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.13 JWT: estrutura, assinatura, criptografia e validação segura",
    "id": "14-13-jwt-estrutura-assinatura-criptografia-e-validacao-segura"
  },
  {
    "kind": "paragraph",
    "text": "JWT é um formato de claims que pode ser protegido por JWS ou JWE. Em um JWT assinado, header, payload e assinatura são codificados em segmentos separados. O header indica parâmetros criptográficos; o payload contém claims; a assinatura protege integridade. JWE adiciona criptografia, mas não deve ser introduzido apenas para ocultar um design de dados excessivo."
  },
  {
    "kind": "paragraph",
    "text": "A validação precisa fixar algoritmos aceitos e rejeitar combinações inesperadas. O verificador não deve confiar cegamente em alg ou em URLs de chave fornecidas pelo token. As chaves devem vir de configuração ou metadata confiável, com cache, rotação e proteção contra confusão entre chaves simétricas e assimétricas."
  },
  {
    "kind": "paragraph",
    "text": "Além da assinatura, valide issuer, audience, exp, nbf, tipo do token e claims obrigatórias. Um ID token válido para um cliente OpenID Connect não deve ser aceito como access token por uma API. Tipagem explícita, regras distintas e audiences separadas reduzem substituição entre contextos."
  },
  {
    "kind": "subhead",
    "text": "Exemplo didático de claims de access token"
  },
  {
    "kind": "code",
    "text": "HEADER\n{ \"alg\": \"RS256\", \"typ\": \"at+jwt\", \"kid\": \"key-2026-01\" }\nPAYLOAD\n{\n  \"iss\": \"https://id.empresa.example\",\n  \"sub\": \"app:conciliacao\",\n  \"aud\": \"https://api.empresa.example/pagamentos\",\n  \"scope\": \"pagamentos.read\",\n  \"iat\": 1784130000,\n  \"exp\": 1784130300\n}"
  },
  {
    "kind": "subhead",
    "text": "Validação mínima"
  },
  {
    "kind": "paragraph",
    "text": "Aceitar apenas assinatura válida sem verificar iss, aud, tempo e tipo equivale a aceitar credenciais emitidas para outros sistemas. Cada API precisa declarar exatamente quais emissores, audiences, algoritmos e claims são permitidos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.14 OAuth 2.0 e OpenID Connect: limites conceituais",
    "id": "14-14-oauth-2-0-e-openid-connect-limites-conceituais"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 é um framework de autorização delegada. Ele define papéis e mecanismos para que um cliente obtenha access token e acesse um resource server com autoridade limitada. OAuth não define, sozinho, como o usuário foi autenticado nem garante que um access token contenha identidade humana. Client Credentials, por exemplo, representa acesso da aplicação em nome próprio."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect acrescenta uma camada de autenticação sobre OAuth 2.0. O ID token comunica claims sobre a autenticação do usuário ao cliente, e o UserInfo Endpoint pode fornecer dados adicionais. O ID token é destinado ao cliente e não deve ser enviado como credencial genérica para APIs, salvo contrato explícito e perfil adequado."
  },
  {
    "kind": "paragraph",
    "text": "A API deve validar access token destinado a ela. O cliente valida ID token destinado a ele. Confundir os dois pode permitir token substitution. Os próximos capítulos aprofundarão authorization code, PKCE, client credentials, refresh, consentimento, metadata, introspecção e segurança moderna conforme o OAuth Security BCP."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Artefatos de identidade possuem públicos e usos diferentes.",
    "headers": [
      "Artefato",
      "Destinatário",
      "Finalidade"
    ],
    "rows": [
      [
        "Access token",
        "resource server / API",
        "autorizar acesso a recursos."
      ],
      [
        "ID token",
        "cliente OpenID Connect",
        "informar resultado da autenticação do usuário."
      ],
      [
        "Refresh token",
        "authorization server",
        "obter novos access tokens conforme política."
      ],
      [
        "Authorization code",
        "token endpoint pelo cliente",
        "troca intermediária de curta duração."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.15 Modelos de autorização: RBAC, ABAC, ReBAC e PBAC",
    "id": "14-15-modelos-de-autorizacao-rbac-abac-rebac-e-pbac"
  },
  {
    "kind": "paragraph",
    "text": "RBAC atribui roles a principals e permissões a roles. É simples para funções organizacionais estáveis, mas roles excessivamente granulares produzem explosão e roles amplas violam menor privilégio. A role “analista” não responde sozinha se o usuário pode consultar qualquer conta ou apenas as de sua carteira."
  },
  {
    "kind": "paragraph",
    "text": "ABAC avalia atributos do sujeito, recurso, ação e ambiente. Pode combinar unidade, classificação, tenant, horário, dispositivo e risco. A flexibilidade aumenta a necessidade de dados confiáveis, semântica clara e testes. Atributos desatualizados ou manipuláveis tornam a política insegura."
  },
  {
    "kind": "paragraph",
    "text": "ReBAC utiliza relacionamentos, como owner, membro, responsável ou gestor. É útil quando acesso depende da posição do sujeito em um grafo. PBAC é um termo amplo para decisões baseadas em políticas, frequentemente combinando roles, atributos e relações. Em sistemas reais, modelos híbridos são comuns."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Modelos podem ser combinados por camada e risco.",
    "headers": [
      "Modelo",
      "Base da decisão",
      "Uso adequado",
      "Risco"
    ],
    "rows": [
      [
        "RBAC",
        "função ou role",
        "permissões organizacionais estáveis",
        "role explosion e excesso de privilégio."
      ],
      [
        "ABAC",
        "atributos e contexto",
        "regras contextuais e multitenant",
        "atributos incorretos e política complexa."
      ],
      [
        "ReBAC",
        "relações entre entidades",
        "owner, equipe, carteira e compartilhamento",
        "grafo desatualizado ou consulta cara."
      ],
      [
        "PBAC",
        "política declarativa",
        "combinação centralizada de sinais",
        "dependência do PDP e governança."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/pt/figure-03.svg",
    "alt": "Arquitetura de decisão com PEP, PDP, PIP, PAP e recurso protegido",
    "caption": "Figura 3 - O enforcement pode permanecer no gateway ou serviço enquanto a decisão usa política e atributos externos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.16 PEP, PDP, PIP e PAP",
    "id": "14-16-pep-pdp-pip-e-pap"
  },
  {
    "kind": "paragraph",
    "text": "O Policy Enforcement Point intercepta a operação e aplica a decisão. O API Gateway é um PEP natural para autenticação, scope, quota e regras transversais. O backend também atua como PEP para autorização de domínio. O Policy Decision Point avalia políticas e retorna uma decisão, possivelmente com obrigações, como mascarar campos ou exigir step-up."
  },
  {
    "kind": "paragraph",
    "text": "O Policy Information Point fornece atributos: dados do usuário, tenant, relacionamento, classificação do recurso ou risco. O Policy Administration Point é onde políticas são criadas, revisadas, versionadas e publicadas. Separar esses papéis permite governança, porém adiciona latência, disponibilidade e consistência como requisitos arquiteturais."
  },
  {
    "kind": "paragraph",
    "text": "Decisões centralizadas precisam de estratégia de cache e fail behavior. Fail-open pode expor dados quando o PDP falha; fail-closed pode causar indisponibilidade. A escolha depende do risco da operação. Políticas críticas devem possuir testes, versionamento, rollback e observabilidade equivalentes ao código de produção."
  },
  {
    "kind": "subhead",
    "text": "Divisão recomendada"
  },
  {
    "kind": "paragraph",
    "text": "Use o gateway para validar credenciais e aplicar controles independentes do estado do domínio. Mantenha no serviço as decisões que dependem de propriedade, saldo, estado da transação ou regras que mudam com o negócio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.17 Delegação, impersonation e on-behalf-of",
    "id": "14-17-delegacao-impersonation-e-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "Delegação concede autoridade limitada para um cliente agir em nome de um sujeito. O token precisa distinguir usuário, cliente e escopo delegado. Registrar apenas o usuário esconde qual aplicação executou a ação; registrar apenas a aplicação perde a pessoa que autorizou. Logs devem preservar ambos quando o fluxo envolve os dois."
  },
  {
    "kind": "paragraph",
    "text": "Impersonation é mais forte: um componente assume a identidade de outro. Deve ser raro, explicitamente autorizado e auditado, pois elimina fronteiras. Em ferramentas administrativas, a interface precisa indicar que o operador está atuando como outro usuário e registrar actor original, motivo e duração."
  },
  {
    "kind": "paragraph",
    "text": "On-behalf-of ocorre quando um serviço chama outro mantendo contexto do usuário. Encaminhar o mesmo token para todos os backends amplia audience e exposição. Token exchange ou emissão de token específico para o próximo recurso reduz privilégio e permite representar a cadeia de atores de forma controlada."
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - A identidade do ator não deve desaparecer durante a delegação.",
    "headers": [
      "Cenário",
      "Identidades que devem aparecer",
      "Controle"
    ],
    "rows": [
      [
        "App em nome do usuário",
        "usuário + cliente",
        "scopes delegados e consentimento/política."
      ],
      [
        "Serviço em nome do usuário",
        "usuário + serviço chamador",
        "audience específica e cadeia de ator."
      ],
      [
        "App-only",
        "aplicação/workload",
        "permissões de aplicação e owner."
      ],
      [
        "Impersonation administrativa",
        "operador + sujeito assumido",
        "aprovação, prazo, motivo e auditoria reforçada."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/pt/figure-04.svg",
    "alt": "Identidade de workload com atestação e credenciais curtas",
    "caption": "Figura 4 - Atestação e credenciais curtas reduzem secrets persistentes em workloads."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.18 Identidade de workload e zero trust",
    "id": "14-18-identidade-de-workload-e-zero-trust"
  },
  {
    "kind": "paragraph",
    "text": "Workload identity representa software em execução. Em nuvem, pode ser service principal ou managed identity. Em Kubernetes, pode usar service account federada. Em SPIFFE, o workload recebe um SPIFFE ID e documentos de identidade verificáveis por meio da Workload API. O objetivo é vincular credenciais ao ambiente e ciclo de vida reais do processo."
  },
  {
    "kind": "paragraph",
    "text": "Zero trust não significa desconfiar de tudo de forma abstrata; significa não conceder confiança implícita apenas por localização de rede. Cada acesso deve avaliar identidade, recurso e contexto. Estar dentro da VNet ou do cluster não substitui autenticação. Segmentação de rede continua útil, mas atua junto à identidade."
  },
  {
    "kind": "paragraph",
    "text": "Credenciais curtas e rotacionadas automaticamente diminuem a janela de abuso. O serviço não deve conseguir exportar uma credencial de longa duração quando a plataforma pode emitir tokens sob demanda. A autorização precisa limitar audience e permissões; uma managed identity sem secret ainda pode ser perigosa se possuir papel de administrador."
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - Identidade de workload deve acompanhar a plataforma e o ciclo de execução.",
    "headers": [
      "Tecnologia",
      "Identidade",
      "Emissão",
      "Uso"
    ],
    "rows": [
      [
        "Managed identity",
        "service principal gerenciado",
        "plataforma Azure emite tokens",
        "acesso a recursos que confiam no Microsoft Entra."
      ],
      [
        "Workload federation",
        "subject externo mapeado",
        "troca asserção por token local",
        "CI/CD, Kubernetes e multi-cloud sem secret."
      ],
      [
        "SPIFFE/SPIRE",
        "SPIFFE ID",
        "SVID curto via atestação",
        "mTLS ou JWT entre workloads."
      ],
      [
        "Service account estática",
        "conta de serviço",
        "secret ou token persistente",
        "legado; exige rotação e restrição."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.19 Identidade em API Gateways, Axway e Azure",
    "id": "14-19-identidade-em-api-gateways-axway-e-azure"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway pode extrair credenciais, validar API key, certificado ou JWT, aplicar scopes, consultar identidade externa e propagar contexto ao backend. A política deve remover headers de identidade fornecidos pelo cliente e inserir apenas valores derivados de validação. O backend deve confiar nesses headers somente quando a conexão vem do gateway autorizado."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, políticas como validate-jwt e validate-azure-ad-token validam tokens e podem exigir issuer, audience e claims. A configuração precisa usar metadata e chaves do emissor correto, registrar falhas sem expor token e separar a autorização de gateway das regras de domínio. Managed identity pode ser usada pelo gateway ou backend para obter tokens sem secrets estáticos em cenários suportados."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, filtros de OAuth, OpenID Connect e verificação de JWT podem participar de políticas. O desenho deve declarar se o gateway atua como authorization server, client ou resource server. Como produtos e versões variam, a política precisa ser testada com tokens reais autorizados, rotação de chave e cenários de erro."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de policy no Azure API Management"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://pagamentos</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"any\">\n      <value>pagamentos.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Atenção operacional"
  },
  {
    "kind": "paragraph",
    "text": "Validação de JWT depende de metadata, cache de chaves e rotação. Teste o comportamento quando o kid muda, a metadata fica indisponível, o relógio diverge ou o token possui audience múltipla."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.20 Respostas 401, 403 e insufficient_scope",
    "id": "14-20-respostas-401-403-e-insufficient-scope"
  },
  {
    "kind": "paragraph",
    "text": "HTTP 401 indica que a requisição não possui credenciais de autenticação válidas para o recurso. A resposta deve usar WWW-Authenticate quando aplicável, informando o esquema e parâmetros seguros. O código não significa necessariamente “usuário inexistente”; pode representar token ausente, expirado, assinatura inválida ou audience incorreta."
  },
  {
    "kind": "paragraph",
    "text": "HTTP 403 indica que o servidor compreendeu a requisição e se recusa a atendê-la. Pode ocorrer quando a identidade é válida, mas não possui permissão. Em alguns recursos sensíveis, o servidor pode preferir 404 para não revelar existência, desde que o comportamento seja consistente e documentado."
  },
  {
    "kind": "paragraph",
    "text": "No uso de bearer tokens, erros como invalid_token e insufficient_scope ajudam o cliente, mas detalhes não devem revelar chaves, regras internas ou existência de dados. O gateway e o backend precisam registrar internamente a causa exata e expor ao consumidor um erro estável, correlacionável e seguro."
  },
  {
    "kind": "table",
    "caption": "Tabela 13 - O status externo deve preservar semântica; o log interno preserva diagnóstico.",
    "headers": [
      "Situação",
      "Status provável",
      "Evidência interna"
    ],
    "rows": [
      [
        "Token ausente ou inválido",
        "401",
        "motivo de validação e issuer/audience esperados."
      ],
      [
        "Token válido sem permissão",
        "403",
        "scope, role ou regra negada."
      ],
      [
        "Recurso deliberadamente oculto",
        "404 possível",
        "decisão de política registrada."
      ],
      [
        "Rate limit excedido",
        "429",
        "identidade, plano, limite e janela."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Resposta externa sem detalhes sensíveis"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"pagamentos\", error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.example/problems/authentication\",\n  \"title\": \"Credencial inválida ou ausente\",\n  \"status\": 401,\n  \"correlationId\": \"9c0f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.21 Logs, auditoria, privacidade e correlação",
    "id": "14-21-logs-auditoria-privacidade-e-correlacao"
  },
  {
    "kind": "paragraph",
    "text": "Logs de acesso devem registrar principal, tipo de identidade, cliente, issuer, audience, operação, recurso, decisão, policy version e correlation ID. Não registre bearer token, secret, senha, cookie ou chave completa. Quando um identificador é sensível, utilize pseudonimização ou hash estável controlado conforme necessidade de investigação."
  },
  {
    "kind": "paragraph",
    "text": "A auditoria precisa distinguir autenticação bem-sucedida, autorização negada e falha de infraestrutura. Um 401 por token expirado é diferente de erro ao buscar metadata. Um 403 do gateway é diferente de 403 do backend. Campos como decision_source e response_origin reduzem investigações baseadas em suposição."
  },
  {
    "kind": "paragraph",
    "text": "Retenção e acesso aos logs devem respeitar privacidade e finalidade. Claims de perfil não devem ser copiadas integralmente para todos os eventos. Registre apenas atributos necessários à segurança, suporte e conformidade. Trilhas administrativas de alteração de políticas e grants são tão importantes quanto logs de chamadas."
  },
  {
    "kind": "table",
    "caption": "Tabela 14 - Auditoria útil registra identidade e decisão sem vazar credenciais.",
    "headers": [
      "Campo",
      "Exemplo",
      "Cuidado"
    ],
    "rows": [
      [
        "principal id _",
        "iss + sub normalizado",
        "não usar e-mail mutável como chave única."
      ],
      [
        "client id _",
        "aplicação chamadora",
        "preservar em fluxos delegados."
      ],
      [
        "auth method _",
        "mTLS, JWT, sessão",
        "não registrar material da credencial."
      ],
      [
        "decision",
        "permit / deny",
        "incluir policy e ponto que decidiu."
      ],
      [
        "correlation id _",
        "identificador ponta a ponta",
        "validar e normalizar valor externo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.22 Ameaças e hardening",
    "id": "14-22-ameacas-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Credential stuffing e password spraying exploram senhas reutilizadas. Phishing captura sessão ou fator. Secret leakage expõe credenciais de aplicação em repositórios e pipelines. Token replay reutiliza bearer tokens. Confusion attacks fazem um sistema aceitar token de outro contexto. Broken Object Level Authorization permite acessar recurso de outro usuário mesmo com token válido."
  },
  {
    "kind": "paragraph",
    "text": "Hardening começa pelo menor privilégio, credenciais curtas, rotação automática e separação de audiences. JWTs devem seguir boas práticas de algoritmo, tipagem e validação. Redirect URIs, clientes e scopes precisam ser restritos. Sessões e refresh tokens devem possuir revogação e detecção de anomalias conforme o risco."
  },
  {
    "kind": "paragraph",
    "text": "Autorização deve ocorrer em cada objeto e função, não apenas no endpoint genérico. Listar /contas com scope contas.read não garante que o sujeito pode ver todas as contas retornadas. O backend precisa filtrar pelo relacionamento e impedir que IDs manipulados bypasssem a regra."
  },
  {
    "kind": "table",
    "caption": "Tabela 15 - Tokens válidos não eliminam falhas de autorização e ciclo de vida.",
    "headers": [
      "Ameaça",
      "Falha explorada",
      "Controle principal"
    ],
    "rows": [
      [
        "Token replay",
        "bearer copiável",
        "TLS, expiração curta e sender constraint quando necessário."
      ],
      [
        "Token substitution",
        "audience/tipo não validados",
        "aud, iss, typ e regras separadas por token."
      ],
      [
        "BOLA",
        "objeto sem checagem de ownership",
        "autorização por objeto no serviço."
      ],
      [
        "Secret leakage",
        "credencial persistente em código",
        "vault, federação e scanning."
      ],
      [
        "Privilege creep",
        "grants acumulados",
        "revisão periódica e lifecycle."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.23 Troubleshooting orientado por evidências",
    "id": "14-23-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "A investigação começa identificando quem produziu a resposta. Verifique se a requisição chegou ao gateway, se havia credencial, qual política foi executada e se o backend foi chamado. Um 401 gerado na borda não aparecerá no log de aplicação. Um 403 do backend pode ocorrer depois de o gateway aceitar o token."
  },
  {
    "kind": "paragraph",
    "text": "Para JWT, extraia header e claims apenas em ambiente seguro, sem colar tokens de produção em sites externos. Compare iss, aud, exp, nbf, typ, kid, scopes e client_id com a configuração. Confirme relógio do gateway, descoberta OpenID, JWKS e rotação de chaves. Assinatura válida com audience errada deve continuar sendo rejeitada."
  },
  {
    "kind": "paragraph",
    "text": "Para autorização, reproduza com o mesmo principal e recurso. Verifique atributos, tenant, ownership, policy version e cache. Uma permissão recém-concedida pode não aparecer por atraso de replicação ou token antigo. Emitir novo token pode ser necessário quando claims são incorporadas no momento da emissão."
  },
  {
    "kind": "table",
    "caption": "Tabela 16 - Diagnóstico precisa correlacionar credencial, decisão e ponto de resposta.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências"
    ],
    "rows": [
      [
        "401 intermitente",
        "expiração, clock skew, rotação de chave",
        "timestamps, kid, JWKS e nó do gateway."
      ],
      [
        "403 apenas em alguns IDs",
        "ownership ou tenant",
        "recurso, principal e regra de domínio."
      ],
      [
        "Funciona no portal, falha no script",
        "audience, client type ou credencial",
        "tokens comparados e fluxo utilizado."
      ],
      [
        "Gateway aceita, backend rejeita",
        "propagação ou policy divergente",
        "headers confiáveis, audience interna e logs dos dois hops."
      ],
      [
        "Após grant ainda nega",
        "token/cache antigo",
        "iat, versão da política e TTL do atributo."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.24 Estudos de caso e laboratórios",
    "id": "14-24-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - access token aceito como ID token"
  },
  {
    "kind": "paragraph",
    "text": "Uma SPA usa o access token retornado pelo provedor para estabelecer a sessão local do usuário, lendo sub e e-mail sem validar audience ou tipo. Um token destinado a outra API é apresentado e aceito pela aplicação. A assinatura é válida, mas o token não foi emitido para aquele cliente."
  },
  {
    "kind": "paragraph",
    "text": "A correção separa validação de ID token e access token, exige audience e nonce adequados e usa a biblioteca do protocolo. O caso mostra que criptografia válida não substitui contexto de uso."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - gateway autoriza, backend expõe objeto de outro cliente"
  },
  {
    "kind": "paragraph",
    "text": "O gateway exige scope contas.read e encaminha GET /contas/{id}. O backend busca pelo ID sem verificar vínculo com o subject. Um consumidor autenticado altera o ID e lê conta de outro cliente. A autenticação e o scope estão corretos, mas existe Broken Object Level Authorization."
  },
  {
    "kind": "paragraph",
    "text": "A correção aplica autorização por objeto no domínio e registra principal, tenant e recurso. O gateway continua validando token e scope, mas não tenta inferir ownership sem dados confiáveis."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - secret compartilhado entre vinte aplicações"
  },
  {
    "kind": "paragraph",
    "text": "Vinte jobs usam o mesmo client_id e segredo. Após vazamento, a organização precisa rotacionar todos simultaneamente e não consegue identificar o responsável pelo tráfego. A migração cria identidade individual, owner, escopo e quota por job, seguida de revogação do segredo compartilhado."
  },
  {
    "kind": "paragraph",
    "text": "O ganho não é apenas criptográfico. A individualização permite menor privilégio, auditoria, depreciação e resposta a incidentes por consumidor."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - validar claims de um JWT sintético"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Gere um JWT de laboratório com issuer, audience, exp e scope controlados.",
      "Valide a assinatura com uma chave local e depois altere aud, exp e typ.",
      "Confirme que cada alteração é rejeitada por regra específica.",
      "Registre somente header e claims sintéticos, nunca tokens reais de produção."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - matriz de autorização"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Modele operações de leitura, criação, aprovação e cancelamento.",
      "Liste roles, atributos, relationships e condições necessárias.",
      "Implemente casos permitidos e negados com testes automatizados.",
      "Inclua tentativa de acessar objeto de outro tenant."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - policy no gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure um gateway ou simulador autorizado para exigir audience e scope.",
      "Envie tokens ausente, expirado, de outro issuer e sem scope.",
      "Compare 401 e 403 e registre qual camada respondeu.",
      "Altere a chave de assinatura e observe o comportamento de cache e rotação."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 4 - inventário de workload identities"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Liste service principals, managed identities, service accounts e secrets de um ambiente de laboratório.",
      "Associe owner, recurso, permissões e expiração.",
      "Identifique credenciais estáticas substituíveis por federação ou identidade gerenciada.",
      "Defina processo de desativação e teste a revogação."
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
    "text": "Identidade é a base do controle de acesso, mas depende de cadastro, credenciais, validação e ciclo de vida. Identificador não é prova. Autenticação estabelece um principal sob determinado contexto; autorização decide uma ação sobre um recurso. Delegação, federação e auditoria completam a cadeia."
  },
  {
    "kind": "paragraph",
    "text": "APIs podem usar API keys, Basic, sessões, tokens opacos, JWTs, mTLS e provas de posse. Cada mecanismo possui limites. Bearer tokens são reutilizáveis por quem os obtém; sender-constrained tokens reduzem replay. JWT assinado não é criptografado e precisa de validação de issuer, audience, tempo, tipo, algoritmo e claims."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 trata autorização delegada; OpenID Connect acrescenta autenticação para clientes. Access token, ID token e refresh token têm destinatários e finalidades diferentes. A autorização pode combinar RBAC, ABAC, ReBAC e políticas centralizadas, mas regras de domínio e objeto permanecem responsabilidade do serviço."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways funcionam como PEP para controles transversais e podem validar tokens, certificados e chaves. A arquitetura precisa preservar identidade do usuário e da aplicação, impedir headers forjados, registrar a origem da decisão e usar workload identities de curta duração. Segurança efetiva exige menor privilégio, rotação, observabilidade e testes de negação."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 15 aprofundará Basic Auth, Digest e API Keys, analisando transmissão de credenciais, desafios HTTP, armazenamento de segredos, replay, rotação, identificação de aplicações e limitações desses mecanismos em APIs corporativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de identidade e acesso",
    "id": "checklist-de-identidade-e-acesso"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada chamada pode ser associada a um principal individual e a um owner conhecido.",
      "A autenticação é separada da autorização de operação e de objeto.",
      "Issuer, audience, tipo, algoritmo e tempo são validados explicitamente.",
      "Access token e ID token não são intercambiados.",
      "API keys e secrets não aparecem em URL, logs ou código-fonte.",
      "Credenciais de aplicações possuem rotação e data de revisão.",
      "Scopes, roles, permissions e attributes possuem semântica documentada.",
      "O gateway remove headers de identidade externos antes de inserir contexto confiável.",
      "O backend aplica autorização fina quando depende do estado ou ownership.",
      "401 e 403 preservam semântica e não revelam detalhes sensíveis.",
      "Logs registram principal, cliente, decisão, recurso, policy e correlação sem tokens.",
      "Workloads usam credenciais curtas ou federação quando possível.",
      "Políticas possuem testes positivos e negativos, versionamento e rollback.",
      "Inventário e processo de desligamento incluem grants, sessões, tokens e certificados."
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
      "Diferencie sujeito, principal, identificador, credencial e token.",
      "Explique por que autenticação forte não corrige Broken Object Level Authorization.",
      "Compare API key, client secret, certificado e workload federation.",
      "Explique por que assinatura válida não basta para aceitar um JWT.",
      "Diferencie access token, ID token e refresh token.",
      "Modele autorização de uma transferência usando role, atributos e ownership.",
      "Descreva quando 401, 403 e 404 podem ser usados.",
      "Explique o papel de PEP, PDP, PIP e PAP.",
      "Proponha logs para uma chamada delegada preservando usuário e aplicação.",
      "Crie plano de migração de Basic para credencial assimétrica ou token.",
      "Liste controles contra replay de bearer token.",
      "Descreva troubleshooting para token aceito no gateway e rejeitado no backend."
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
    "caption": "Tabela 17 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "ABAC",
        "Autorização baseada em atributos de sujeito, recurso, ação e ambiente."
      ],
      [
        "Access token",
        "Credencial usada por um cliente para acessar um resource server."
      ],
      [
        "API key",
        "Valor associado a consumidor ou plano; não implica identidade forte por si só."
      ],
      [
        "Audience",
        "Destinatário para o qual um token foi emitido."
      ],
      [
        "Authentication",
        "Processo de validar uma prova vinculada a uma identidade."
      ],
      [
        "Authorization",
        "Decisão sobre ação permitida a um principal em um recurso."
      ],
      [
        "Bearer token",
        "Token utilizável por quem possui o valor."
      ],
      [
        "Claim",
        "Afirmação transportada em token ou asserção."
      ],
      [
        "Credential",
        "Material usado para demonstrar controle ou vínculo de identidade."
      ],
      [
        "Delegation",
        "Concessão limitada para agir em nome de outro sujeito."
      ],
      [
        "Federation",
        "Aceitação de identidades ou asserções de outro domínio de confiança."
      ],
      [
        "ID token",
        "Token OpenID Connect destinado ao cliente para comunicar autenticação."
      ],
      [
        "Issuer",
        "Entidade que emite e assina o token ou asserção."
      ],
      [
        "JWT",
        "Formato compacto para claims protegidas por JWS ou JWE."
      ],
      [
        "PDP",
        "Componente que avalia política e produz decisão."
      ],
      [
        "PEP",
        "Componente que aplica a decisão ao acesso."
      ],
      [
        "Principal",
        "Representação operacional de uma identidade no sistema."
      ],
      [
        "RBAC",
        "Autorização baseada em roles."
      ],
      [
        "ReBAC",
        "Autorização baseada em relacionamentos."
      ],
      [
        "Scope",
        "Autoridade delegada expressa para um access token."
      ],
      [
        "Sender-constrained token",
        "Token vinculado à prova de uma chave do cliente."
      ],
      [
        "Workload identity",
        "Identidade não humana atribuída a software em execução."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de escolha de mecanismo",
    "id": "anexo-a-matriz-de-escolha-de-mecanismo"
  },
  {
    "kind": "table",
    "caption": "Tabela 18 - A escolha final depende do risco, consumidores e infraestrutura.",
    "headers": [
      "Cenário",
      "Mecanismo inicial",
      "Controles adicionais"
    ],
    "rows": [
      [
        "API pública de baixo risco com quota",
        "API key",
        "TLS, rotação, rate limiting e monitoramento."
      ],
      [
        "Integração legada controlada",
        "Basic temporário",
        "credencial individual, TLS, vault e plano de migração."
      ],
      [
        "Usuário em aplicação web",
        "OIDC + sessão ou tokens",
        "MFA, CSRF/XSS, audience e autorização de objeto."
      ],
      [
        "Serviço para serviço",
        "client credentials, mTLS ou federação",
        "escopo mínimo, audience, rotação e owner."
      ],
      [
        "Workload em Azure",
        "managed identity",
        "RBAC mínimo e logs de sign-in."
      ],
      [
        "Workload multi-cloud/Kubernetes",
        "workload federation ou SPIFFE",
        "trust específico, credencial curta e atestação."
      ],
      [
        "API de alto risco",
        "sender-constrained token + política contextual",
        "mTLS/DPoP, step-up, detecção e auditoria reforçada."
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
      "IETF. RFC 9110 - HTTP Semantics. 2022.",
      "IETF. RFC 7617 - The Basic HTTP Authentication Scheme. 2015.",
      "IETF. RFC 6750 - OAuth 2.0 Bearer Token Usage. 2012.",
      "IETF. RFC 7519 - JSON Web Token (JWT). 2015.",
      "IETF. RFC 7662 - OAuth 2.0 Token Introspection. 2015.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens. 2020.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 Access Tokens. 2021.",
      "IETF. RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession. 2023.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "IETF. RFC 9728 - OAuth 2.0 Protected Resource Metadata. 2025.",
      "OpenID Foundation. OpenID Connect Core 1.0, Second Errata Set.",
      "NIST. SP 800-63-4 - Digital Identity Guidelines. 2025.",
      "NIST. SP 800-63B-4 - Authentication and Authenticator Management. 2025.",
      "NIST. SP 800-207 - Zero Trust Architecture. 2020.",
      "SPIFFE. SPIFFE Concepts, Workload API e SVID Specifications.",
      "Microsoft Learn. Microsoft Entra workload identities e managed identities.",
      "Microsoft Learn. Azure API Management validate-jwt e validate-azure-ad-token policies.",
      "Axway Documentation. OAuth 2.0, OpenID Connect e JWT verification no API Gateway.",
      "OWASP. API Security Top 10 - 2023 Edition."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Protocolos, bibliotecas, produtos e políticas de identidade evoluem. Antes de implantar qualquer fluxo ou policy, valide as especificações atuais, a versão do produto e o comportamento em ambiente autorizado."
  }
];
