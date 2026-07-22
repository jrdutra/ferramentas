import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const SAML_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Federação SAML: identidade autenticada em um domínio e consumida em outro"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/overview.svg",
    "alt": "Federação SAML entre usuário, Service Provider, Identity Provider e sessão local",
    "caption": "Figura de abertura - O SAML conecta domínios de identidade por meio de mensagens XML e relações explícitas de confiança."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "SAML transporta declarações de segurança entre entidades que já estabeleceram metadados, chaves e regras de confiança."
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
    "text": "Os capítulos anteriores estudaram OAuth 2.0, OpenID Connect e a família JOSE. Esses padrões dominam aplicações modernas e APIs, mas não substituíram completamente os mecanismos de federação empresarial construídos antes deles. SAML 2.0 permanece amplamente presente em portais corporativos, sistemas SaaS, ambientes acadêmicos, governos, bancos e integrações entre organizações que precisam de Single Sign-On baseado em navegador e troca padronizada de atributos."
  },
  {
    "kind": "paragraph",
    "text": "SAML, abreviação de Security Assertion Markup Language, é um framework XML para comunicar declarações de autenticação, atributos e decisões de autorização. Seu uso mais conhecido é o Web Browser SSO Profile, no qual um Identity Provider autentica o usuário e envia ao Service Provider uma SAML Assertion assinada. Porém, compreender apenas o fluxo visual de redirecionamento é insuficiente. A segurança depende de bindings, metadata, certificados, validação de assinatura XML, condições temporais, audience, recipient, correlation e proteção contra replay."
  },
  {
    "kind": "paragraph",
    "text": "Diferentemente de um token bearer simples transportado diretamente para uma API, a resposta SAML normalmente é consumida por um endpoint específico do Service Provider, chamado Assertion Consumer Service. O SP valida a mensagem e cria sua própria sessão local. Essa separação explica por que SAML é especialmente adequado ao login federado de aplicações web, mas menos natural para autorização delegada de APIs e chamadas service-to-service."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo constrói um modelo mental completo do SAML 2.0: atores, assertions, protocol messages, bindings, profiles, metadata, NameID, atributos, assinatura, criptografia, Single Logout, federação e integração com gateways. O foco é permitir projeto, revisão e troubleshooting seguros, sem reduzir o padrão a copiar certificados entre dois consoles administrativos."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Separe sempre quatro camadas: assertion, protocol message, binding e profile. Depois, acompanhe a relação de confiança descrita em metadata e valide cada restrição de segurança. Essa decomposição torna o SAML muito menos confuso e evita misturar transporte, identidade e sessão."
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
      "Explicar as responsabilidades de principal, Identity Provider, Service Provider e autoridades SAML.",
      "Distinguir assertion, protocol message, binding, profile e metadata.",
      "Descrever statements de autenticação, atributos e decisão de autorização.",
      "Detalhar o Web Browser SSO Profile nos modos SP-initiated e IdP-initiated.",
      "Interpretar AuthnRequest, Response, Assertion, Subject, Conditions e SubjectConfirmation.",
      "Comparar HTTP-Redirect, HTTP-POST, HTTP-Artifact e SOAP bindings.",
      "Entender entityID, ACS, SSO Service, SLO Service, KeyDescriptor e rotação de certificados.",
      "Aplicar validação segura de XML Signature e reconhecer signature wrapping e replay.",
      "Compreender NameID, atributos, mapeamento de identidade, SLO e IdP discovery.",
      "Comparar SAML 2.0 com OpenID Connect e reconhecer o papel de gateways e brokers de identidade."
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
      "19.1 Fundamentos e componentes do SAML 2.0",
      "19.2 Assertions e statements",
      "19.3 Protocol messages",
      "19.4 Web Browser SSO Profile",
      "19.5 SP-initiated e IdP-initiated SSO",
      "19.6 AuthnRequest em profundidade",
      "19.7 Response e Assertion em profundidade",
      "19.8 Conditions, SubjectConfirmation e correlação",
      "19.9 Bindings SAML",
      "19.10 Metadata e confiança",
      "19.11 XML Signature e criptografia",
      "19.12 NameID, atributos e mapeamento",
      "19.13 Sessões, SLO e discovery",
      "19.14 SAML x OIDC, gateways, segurança e troubleshooting",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.1 Fundamentos e componentes do SAML 2.0",
    "id": "19-1-fundamentos-e-componentes-do-saml-2-0"
  },
  {
    "kind": "paragraph",
    "text": "SAML organiza a federação em entidades com papéis bem definidos. O principal é normalmente o usuário. O Identity Provider, ou IdP, autentica esse principal e emite declarações. O Service Provider, ou SP, oferece a aplicação e confia nas assertions produzidas pelo IdP conforme uma relação previamente configurada. Em cenários mais amplos, também podem existir Attribute Authorities, Authentication Authorities e Policy Decision Points."
  },
  {
    "kind": "paragraph",
    "text": "O padrão é composto por peças complementares. Core define assertions e mensagens de protocolo. Bindings descrevem como essas mensagens são transportadas por protocolos como HTTP ou SOAP. Profiles combinam assertions, mensagens e bindings para resolver casos de uso concretos, como browser SSO ou Single Logout. Metadata descreve entidades, endpoints, bindings suportados, identificadores, certificados e outras informações necessárias para interoperabilidade."
  },
  {
    "kind": "paragraph",
    "text": "A relação de confiança não nasce porque uma mensagem contém um certificado. O SP deve conhecer previamente o entityID do IdP e as chaves aceitas para assinatura. Da mesma forma, o IdP precisa conhecer o entityID do SP, seus ACS endpoints e, dependendo da política, as chaves usadas pelo SP. Metadata é o mecanismo padrão para distribuir essas informações, mas sua obtenção e atualização também precisam ser autenticadas e governadas."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - As camadas do SAML devem ser analisadas separadamente.",
    "headers": [
      "Conceito",
      "Responsabilidade",
      "Exemplo"
    ],
    "rows": [
      [
        "Assertion",
        "Contém declarações sobre um subject.",
        "Usuário autenticado com MFA e atributos corporativos."
      ],
      [
        "Protocol",
        "Coordena requisições e respostas SAML.",
        "AuthnRequest e Response."
      ],
      [
        "Binding",
        "Define o transporte da mensagem.",
        "HTTP-Redirect ou HTTP-POST."
      ],
      [
        "Profile",
        "Combina regras para um caso de uso.",
        "Web Browser SSO Profile."
      ],
      [
        "Metadata",
        "Publica identidade, endpoints e chaves.",
        "EntityDescriptor do IdP ou SP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.2 Assertions e statements",
    "id": "19-2-assertions-e-statements"
  },
  {
    "kind": "paragraph",
    "text": "Uma SAML Assertion é uma estrutura XML emitida por uma autoridade e relacionada a um subject. Ela possui identificador, versão, instante de emissão, issuer e zero ou mais statements. Também pode conter assinatura, condições e informações sobre como o subject deve confirmar sua identidade perante o destinatário."
  },
  {
    "kind": "paragraph",
    "text": "O Authentication Statement registra que uma autoridade autenticou o subject em determinado instante e contexto. Pode incluir SessionIndex, SessionNotOnOrAfter e AuthnContextClassRef, elementos usados por aplicações que precisam distinguir senha, MFA, certificado ou outros métodos. O Attribute Statement transporta pares de nome e valor, como identificador interno, e-mail, unidade organizacional ou grupos."
  },
  {
    "kind": "paragraph",
    "text": "O Authorization Decision Statement representa uma decisão de autorização sobre um recurso, mas é menos frequente no Web SSO moderno. Na prática, muitos SPs usam atributos e contexto de autenticação para alimentar suas próprias políticas locais. Essa escolha preserva autonomia de domínio, mas exige acordos claros sobre semântica, cardinalidade, namespaces e tratamento de atributos ausentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/figure-01-assertion-anatomy.svg",
    "alt": "Anatomia de uma SAML Assertion com issuer, subject, conditions, statements e assinatura",
    "caption": "Figura 1 - Uma assertion segura combina origem, subject, restrições, statements e proteção criptográfica."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Statements carregam semânticas distintas dentro da assertion.",
    "headers": [
      "Statement",
      "Declaração principal",
      "Uso recorrente"
    ],
    "rows": [
      [
        "AuthnStatement",
        "Como e quando o usuário foi autenticado.",
        "SSO, step-up e auditoria."
      ],
      [
        "AttributeStatement",
        "Atributos associados ao subject.",
        "Provisionamento lógico e autorização local."
      ],
      [
        "AuthzDecisionStatement",
        "Decisão sobre ação em recurso.",
        "Integrações específicas e legadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.3 Protocol messages",
    "id": "19-3-protocol-messages"
  },
  {
    "kind": "paragraph",
    "text": "As mensagens de protocolo SAML coordenam interações entre entidades. AuthnRequest pede autenticação; Response carrega uma ou mais assertions ou um status de erro; LogoutRequest e LogoutResponse participam de Single Logout; ArtifactResolve e ArtifactResponse recuperam mensagens por referência; AttributeQuery e AuthnQuery consultam autoridades especializadas."
  },
  {
    "kind": "paragraph",
    "text": "Cada mensagem possui ID, Version, IssueInstant e, conforme o tipo, Destination, Consent, InResponseTo e outros atributos. Esses campos não são decorativos. O ID permite correlação e proteção contra replay. Destination restringe o endpoint esperado. InResponseTo vincula uma resposta a uma solicitação previamente emitida. IssueInstant auxilia na validação temporal e na investigação de relógios desalinhados."
  },
  {
    "kind": "paragraph",
    "text": "O status da Response precisa ser interpretado antes da assertion. Success indica que o processamento principal foi concluído, mas não substitui todas as validações. Outros códigos podem representar requester error, responder error, autenticação falhou, método não suportado, usuário desconhecido ou ausência de consentimento."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de AuthnRequest\n<samlp:AuthnRequest\n  ID=\"_a12f...\"\n  Version=\"2.0\"\n  IssueInstant=\"2026-07-15T18:20:00Z\"\n  Destination=\"https://idp.empresa.example/sso\"\n  AssertionConsumerServiceURL=\"https://app.example/saml/acs\">\n  <saml:Issuer>https://app.example/saml</saml:Issuer>\n  <samlp:NameIDPolicy AllowCreate=\"true\"/>\n</samlp:AuthnRequest>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.4 Web Browser SSO Profile",
    "id": "19-4-web-browser-sso-profile"
  },
  {
    "kind": "paragraph",
    "text": "O Web Browser SSO Profile é o uso mais conhecido do SAML 2.0. O navegador atua como intermediário entre SP e IdP. Quando o usuário acessa um recurso protegido, o SP cria uma AuthnRequest e redireciona ou envia o navegador ao IdP. O IdP autentica o usuário, cria a Response, assina a assertion ou a própria response conforme o acordo e devolve o resultado ao Assertion Consumer Service do SP."
  },
  {
    "kind": "paragraph",
    "text": "O ACS recebe a mensagem, realiza validações estruturais, criptográficas e semânticas e, se tudo estiver correto, cria uma sessão local da aplicação. O SAML não define como essa sessão local deve ser implementada. Ela pode usar cookie seguro, sessão server-side ou outro mecanismo. Isso significa que a segurança pós-login depende também de controles clássicos como Secure, HttpOnly, SameSite, expiração, rotação e proteção contra fixation."
  },
  {
    "kind": "paragraph",
    "text": "RelayState preserva estado da aplicação, como o recurso originalmente solicitado. Ele não deve ser tratado como canal confiável de autorização e precisa ser protegido contra open redirect e adulteração. A implementação deve aceitar apenas destinos previstos ou valores opacos armazenados server-side."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/figure-02-sp-initiated-sso.svg",
    "alt": "Fluxo Web Browser SSO iniciado pelo Service Provider",
    "caption": "Figura 2 - No SP-initiated SSO, a Response deve ser correlacionada à AuthnRequest original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.5 SP-initiated e IdP-initiated SSO",
    "id": "19-5-sp-initiated-e-idp-initiated-sso"
  },
  {
    "kind": "paragraph",
    "text": "No SP-initiated SSO, o fluxo começa no Service Provider. O SP cria uma AuthnRequest, registra seu ID e espera uma resposta correlacionada. Esse modelo permite melhor controle de contexto, destination e retorno ao recurso solicitado. A validação de InResponseTo reduz ataques de resposta não solicitada e ajuda a associar a autenticação à transação correta."
  },
  {
    "kind": "paragraph",
    "text": "No IdP-initiated SSO, o fluxo começa em um portal do IdP ou catálogo de aplicações. O IdP envia uma Response não solicitada ao ACS do SP. Esse modo é conveniente para portais corporativos, porém perde a correlação com uma AuthnRequest. A implementação precisa compensar essa redução de contexto com controles estritos de issuer, audience, recipient, tempo, replay e destinos permitidos."
  },
  {
    "kind": "paragraph",
    "text": "Algumas aplicações aceitam os dois modos. Nessa situação, o código de validação deve distinguir claramente respostas solicitadas e não solicitadas. Não é seguro simplesmente tornar InResponseTo opcional em todos os casos. A política precisa definir quando IdP-initiated é aceito, para quais IdPs, ACSs e fluxos de negócio."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Os dois modos exigem políticas de validação distintas.",
    "headers": [
      "Aspecto",
      "SP-initiated",
      "IdP-initiated"
    ],
    "rows": [
      [
        "Início",
        "Usuário acessa o SP.",
        "Usuário parte do portal do IdP."
      ],
      [
        "AuthnRequest",
        "Existe e deve ser rastreada.",
        "Normalmente ausente."
      ],
      [
        "Correlação",
        "InResponseTo e estado local.",
        "Não há requisição original."
      ],
      [
        "Risco adicional",
        "Open redirect e request tampering.",
        "Replay e resposta não solicitada."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Tabela 3 - Os dois modos exigem políticas de validação distintas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.6 AuthnRequest em profundidade",
    "id": "19-6-authnrequest-em-profundidade"
  },
  {
    "kind": "paragraph",
    "text": "A AuthnRequest comunica ao IdP qual SP solicita autenticação e, opcionalmente, quais características deseja. Issuer identifica o SP. Destination aponta o endpoint do IdP. AssertionConsumerServiceURL ou AssertionConsumerServiceIndex seleciona o ACS. ProtocolBinding pode indicar como a Response deve retornar. NameIDPolicy pede formato de identificador e pode permitir criação de um novo pseudônimo."
  },
  {
    "kind": "paragraph",
    "text": "ForceAuthn solicita que o IdP reautentique o usuário mesmo que exista uma sessão SSO. IsPassive pede que o IdP não interaja com o usuário; se não for possível autenticar silenciosamente, a resposta deve indicar falha apropriada. RequestedAuthnContext expressa requisitos sobre método ou força de autenticação, mas sua interpretação precisa ser alinhada entre as partes."
  },
  {
    "kind": "paragraph",
    "text": "Assinar AuthnRequest pode ser obrigatório por política, especialmente quando o SP envia ACS dinâmico, solicita ForceAuthn ou opera em federações com exigências fortes. No Redirect binding, a assinatura ocorre sobre parâmetros da URL e não sobre um elemento ds:Signature dentro do XML. No POST binding, a mensagem pode carregar XML Signature. Confundir essas duas formas é causa comum de falha."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - A AuthnRequest controla mais do que um simples redirecionamento.",
    "headers": [
      "Campo",
      "Função",
      "Validação ou política"
    ],
    "rows": [
      [
        "Issuer",
        "Identifica o SP solicitante.",
        "Deve corresponder a metadata confiável."
      ],
      [
        "Destination",
        "Endpoint do IdP.",
        "Comparação exata com o endpoint recebido."
      ],
      [
        "ACS URL / Index",
        "Destino da Response.",
        "Somente valores registrados em metadata."
      ],
      [
        "ForceAuthn",
        "Solicita nova autenticação.",
        "Aplicar apenas conforme política."
      ],
      [
        "RequestedAuthnContext",
        "Requisito de autenticação.",
        "Mapear classes e comparação corretamente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.7 Response e Assertion em profundidade",
    "id": "19-7-response-e-assertion-em-profundidade"
  },
  {
    "kind": "paragraph",
    "text": "A Response é a mensagem de protocolo entregue ao SP. Ela possui Issuer, Status, Destination, InResponseTo e pode conter assertions. Em muitos perfis, a Response e a Assertion podem ser assinadas em combinações diferentes. A política do SP deve definir exatamente qual assinatura é necessária e em qual elemento, evitando aceitar mensagens parcialmente protegidas de forma inconsistente."
  },
  {
    "kind": "paragraph",
    "text": "A Assertion contém as declarações consumidas pela aplicação. O SP deve localizar a assertion autenticada por uma assinatura validada, e não simplesmente a primeira assertion com determinado XPath. Essa regra é central contra XML Signature Wrapping, ataque em que um elemento assinado válido é deslocado e outro elemento malicioso é colocado no local que a aplicação processa."
  },
  {
    "kind": "paragraph",
    "text": "Uma validação completa também verifica Issuer, Version, IssueInstant, Conditions, AudienceRestriction, SubjectConfirmationData, Recipient, NotOnOrAfter, InResponseTo, AuthnStatement e contexto exigido. Depois da validação, os atributos devem ser mapeados por regras explícitas. O fato de um XML ter sido assinado não torna todos os valores adequados à aplicação."
  },
  {
    "kind": "code",
    "text": "Estrutura simplificada de Response e Assertion\n<samlp:Response Destination=\"https://app.example/saml/acs\"\n                    InResponseTo=\"_a12f...\">\n  <saml:Issuer>https://idp.example/metadata</saml:Issuer>\n  <samlp:Status>...</samlp:Status>\n  <saml:Assertion ID=\"_assertion123\">\n    <saml:Subject>...</saml:Subject>\n    <saml:Conditions>...</saml:Conditions>\n    <saml:AuthnStatement>...</saml:AuthnStatement>\n    <saml:AttributeStatement>...</saml:AttributeStatement>\n  </saml:Assertion>\n</samlp:Response>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.8 Conditions, SubjectConfirmation e correlação",
    "id": "19-8-conditions-subjectconfirmation-e-correlacao"
  },
  {
    "kind": "paragraph",
    "text": "Conditions restringe quando e onde a assertion pode ser usada. NotBefore define o instante inicial, e NotOnOrAfter define um limite exclusivo. AudienceRestriction indica as entidades para as quais a assertion foi emitida. A aplicação deve comparar a audience com seu identificador esperado e usar tolerância de relógio pequena e controlada, sem transformar clock skew em janela ampla de replay."
  },
  {
    "kind": "paragraph",
    "text": "SubjectConfirmation normalmente usa o método bearer no Web Browser SSO. SubjectConfirmationData carrega Recipient, NotOnOrAfter e InResponseTo. Recipient precisa corresponder ao ACS efetivamente utilizado. InResponseTo deve apontar para uma AuthnRequest pendente quando o fluxo foi iniciado pelo SP. Uma resposta já processada deve ser marcada como consumida para impedir replay."
  },
  {
    "kind": "paragraph",
    "text": "A correlação também envolve RelayState, cookies temporários e estado local. Esses elementos não substituem uns aos outros. InResponseTo relaciona a Response à AuthnRequest; RelayState devolve contexto da aplicação; a sessão temporária do SP armazena informações sobre a transação. Um desenho robusto mantém todos os vínculos e remove o estado após uso."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/figure-03-validation-pipeline.svg",
    "alt": "Pipeline seguro de validação de uma SAMLResponse",
    "caption": "Figura 3 - A assinatura é uma etapa do pipeline, não a validação completa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.9 Bindings SAML",
    "id": "19-9-bindings-saml"
  },
  {
    "kind": "paragraph",
    "text": "Binding define como uma mensagem SAML é mapeada para outro protocolo. No HTTP-Redirect binding, a mensagem é normalmente comprimida com DEFLATE, codificada em Base64 e colocada na query string. É adequado para AuthnRequest pequenas, mas possui limites de URL e regras específicas de assinatura sobre SAMLRequest, RelayState e SigAlg."
  },
  {
    "kind": "paragraph",
    "text": "No HTTP-POST binding, a mensagem Base64 é enviada em um formulário HTML, geralmente por auto-submit. É o binding mais comum para transportar SAMLResponse ao ACS. Como o navegador entrega conteúdo de um domínio a outro, o endpoint precisa aceitar POST, proteger sessão local e validar integralmente a mensagem antes de qualquer redirecionamento."
  },
  {
    "kind": "paragraph",
    "text": "HTTP-Artifact envia apenas uma referência curta pelo navegador. O SP troca o artifact pela mensagem real em um canal back-channel, normalmente com SOAP. Isso reduz exposição da assertion ao user agent, mas adiciona disponibilidade, autenticação e latência ao artifact resolution service. SOAP também aparece em consultas e Single Logout back-channel."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/figure-04-bindings.svg",
    "alt": "Bindings SAML transportando a mesma mensagem por canais diferentes",
    "caption": "Figura 4 - Binding é transporte; o profile define como esse transporte participa do caso de uso."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Cada binding possui formato e riscos operacionais próprios.",
    "headers": [
      "Binding",
      "Uso típico",
      "Ponto técnico"
    ],
    "rows": [
      [
        "HTTP-Redirect",
        "AuthnRequest no navegador.",
        "DEFLATE, URL encoding e assinatura de parâmetros."
      ],
      [
        "HTTP-POST",
        "SAMLResponse para o ACS.",
        "Formulário HTML com mensagem Base64."
      ],
      [
        "HTTP-Artifact",
        "Referência no front-channel.",
        "Resolução da mensagem por back-channel."
      ],
      [
        "SOAP",
        "Consultas e troca direta.",
        "Canal servidor-servidor com XML SOAP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.10 Metadata e confiança",
    "id": "19-10-metadata-e-confianca"
  },
  {
    "kind": "paragraph",
    "text": "SAML Metadata descreve entidades por meio de EntityDescriptor. Um entityID é um identificador estável, frequentemente uma URI, mas não precisa ser uma URL acessível. Role descriptors informam se a entidade atua como IdP, SP ou outra autoridade. Endpoints incluem binding, location, índice e preferência. KeyDescriptor publica certificados associados a assinatura ou criptografia."
  },
  {
    "kind": "paragraph",
    "text": "Metadata do SP costuma conter ACS endpoints, NameID formats e certificados. Metadata do IdP contém SingleSignOnService, SingleLogoutService, certificados e outros recursos. O consumidor deve aceitar somente endpoints e chaves provenientes de fontes confiáveis. Permitir ACS arbitrário vindo apenas da AuthnRequest pode transformar o IdP em transmissor de assertions para um atacante."
  },
  {
    "kind": "paragraph",
    "text": "Rotação de certificado exige sobreposição. O novo certificado deve ser publicado antes de ser usado; o antigo permanece enquanto mensagens e caches ainda podem depender dele. Certificado expirado em metadata não deve ser tratado de forma simplista: o uso de X.509 em SAML é frequentemente como contêiner de chave, mas políticas corporativas podem exigir validações adicionais. O importante é possuir regra explícita e auditável."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/pt/figure-05-metadata-trust.svg",
    "alt": "Metadata de SP e IdP estabelecendo endpoints, identificadores e chaves confiáveis",
    "caption": "Figura 5 - Metadata reduz configuração manual, mas precisa de cadeia de distribuição confiável."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de metadata de SP\n<md:EntityDescriptor entityID=\"https://app.example/saml\">\n  <md:SPSSODescriptor AuthnRequestsSigned=\"true\"\n      protocolSupportEnumeration=\"urn:oasis:names:tc:SAML:2.0:protocol\">\n    <md:KeyDescriptor use=\"signing\">...</md:KeyDescriptor>\n    <md:AssertionConsumerService\n       Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\"\n       Location=\"https://app.example/saml/acs\"\n       index=\"0\" isDefault=\"true\"/>\n  </md:SPSSODescriptor>\n</md:EntityDescriptor>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.11 XML Signature e criptografia",
    "id": "19-11-xml-signature-e-criptografia"
  },
  {
    "kind": "paragraph",
    "text": "XML Signature protege integridade e autenticidade de elementos XML. Ela referencia um elemento por ID, aplica transforms, canonicalização e digest e produz SignatureValue. Canonicalização existe porque XML semanticamente equivalente pode ter diferenças de whitespace, namespaces e ordenação de atributos. A implementação deve usar bibliotecas maduras e uma política restrita de algoritmos, transforms e referências."
  },
  {
    "kind": "paragraph",
    "text": "O ataque XML Signature Wrapping explora divergência entre o elemento verificado e o elemento consumido. A defesa central é resolver a referência assinada de forma segura, exigir IDs únicos, rejeitar estruturas inesperadas e processar exatamente o nó autenticado. Consultas XPath genéricas como procurar a primeira Assertion no documento são perigosas quando não estão vinculadas à verificação criptográfica."
  },
  {
    "kind": "paragraph",
    "text": "XML Encryption permite criptografar a Assertion, o NameID ou atributos. O IdP usa a chave pública de criptografia do SP, e o SP descriptografa com sua chave privada. Assinar e criptografar resolvem problemas diferentes: criptografia protege confidencialidade no caminho e em intermediários; assinatura protege integridade e origem. Mesmo uma assertion criptografada precisa ser validada após a decriptação."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Controles criptográficos são complementares.",
    "headers": [
      "Controle criptográfico",
      "Protege",
      "Não substitui"
    ],
    "rows": [
      [
        "Assinatura da Response",
        "Mensagem de protocolo e destino.",
        "Validação da assertion e conditions."
      ],
      [
        "Assinatura da Assertion",
        "Declarações e restrições.",
        "Correlação e proteção de sessão."
      ],
      [
        "EncryptedAssertion",
        "Confidencialidade do conteúdo.",
        "Autenticidade e audience."
      ],
      [
        "TLS",
        "Canal entre participantes.",
        "Assinatura fim a fim da mensagem."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Regra de implementação"
  },
  {
    "kind": "paragraph",
    "text": "Nunca implemente XML Signature manualmente com concatenação de strings ou XPath improvisado. Use biblioteca especializada, mantenha parser XML endurecido, desabilite entidades externas e valide estrutura, IDs e referências antes de consumir atributos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.12 NameID, atributos e mapeamento de identidade",
    "id": "19-12-nameid-atributos-e-mapeamento-de-identidade"
  },
  {
    "kind": "paragraph",
    "text": "NameID identifica o subject em formatos padronizados. Persistent produz um identificador estável e geralmente opaco. Transient cria um valor temporário. EmailAddress usa e-mail, mas pode ser inadequado como chave imutável. Unspecified depende de acordo bilateral. A escolha deve considerar privacidade, correlação entre SPs, mudanças de dados e ciclo de vida de contas."
  },
  {
    "kind": "paragraph",
    "text": "Atributos são identificados por Name e, opcionalmente, NameFormat e FriendlyName. O SP não deve confiar apenas em nomes informais como role ou group sem contrato. É necessário definir namespace, tipo, cardinalidade, origem autoritativa e significado. Um grupo do diretório pode não equivaler a uma permissão de negócio, e mapeamentos automáticos podem elevar privilégios indevidamente."
  },
  {
    "kind": "paragraph",
    "text": "Account linking merece cuidado. Quando o SP recebe um subject federado, precisa vinculá-lo a uma conta local. Vincular apenas por e-mail pode permitir takeover se provedores diferentes emitirem o mesmo endereço ou se a verificação de e-mail não for equivalente. A chave recomendada normalmente combina issuer e identificador estável do subject, com processos controlados para migração."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Identificadores e atributos precisam de contrato, não apenas de XML válido.",
    "headers": [
      "Formato / elemento",
      "Característica",
      "Cuidado"
    ],
    "rows": [
      [
        "persistent NameID",
        "Estável e opaco por relação.",
        "Preservar vínculo durante migração."
      ],
      [
        "transient NameID",
        "Temporário e não correlacionável.",
        "Não usar como chave permanente."
      ],
      [
        "emailAddress",
        "Legível e familiar.",
        "Pode mudar e não ser globalmente único."
      ],
      [
        "Attribute",
        "Valor adicional sobre o subject.",
        "Definir semântica, origem e cardinalidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.13 Sessões, Single Logout e discovery",
    "id": "19-13-sessoes-single-logout-e-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Existem pelo menos duas sessões distintas: a sessão do usuário no IdP e a sessão local no SP. O AuthnStatement pode conter SessionIndex e SessionNotOnOrAfter, mas o SP decide como criar e expirar seu cookie. Encerrar a sessão do IdP não encerra automaticamente todas as sessões locais, a menos que Single Logout seja suportado e funcione em toda a cadeia."
  },
  {
    "kind": "paragraph",
    "text": "Single Logout coordena LogoutRequest e LogoutResponse entre participantes. Pode usar front-channel pelo navegador ou back-channel. Na prática, falhas parciais são comuns: um SP indisponível, cookie bloqueado ou timeout pode deixar sessões ativas. Por isso, SLO não deve ser tratado como substituto de sessões curtas, revogação local e controles próprios de risco."
  },
  {
    "kind": "paragraph",
    "text": "IdP Discovery aparece quando um SP aceita múltiplos provedores. A escolha pode ocorrer por domínio do usuário, portal, cookie de descoberta ou serviço dedicado. A interface deve evitar phishing e seleção confusa. Em federações amplas, metadata agregada e discovery service precisam ser operados com assinatura, expiração, filtros e governança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.14 SAML 2.0 x OpenID Connect",
    "id": "19-14-saml-2-0-x-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 e OpenID Connect resolvem autenticação federada, mas possuem modelos e ecossistemas diferentes. SAML usa XML, assertions, bindings e browser profiles. OIDC usa OAuth 2.0, JSON, JWT, endpoints HTTP e Discovery/JWKS. OIDC tende a se encaixar melhor em aplicações móveis, SPAs, APIs e arquiteturas modernas; SAML permanece muito forte em SaaS empresarial e integrações B2B legadas."
  },
  {
    "kind": "paragraph",
    "text": "A comparação não deve ser reduzida a antigo versus novo. SAML possui metadata rica, federações maduras e interoperabilidade consolidada em muitos produtos corporativos. OIDC oferece melhor alinhamento com APIs, bibliotecas modernas e tokens JSON. Uma organização pode operar ambos por muitos anos, usando um identity broker para traduzir protocolos e centralizar políticas."
  },
  {
    "kind": "paragraph",
    "text": "Tradução entre SAML e OIDC não é mera conversão sintática. NameID, subject, atributos, AuthnContext, acr, amr, sessão e logout possuem semânticas diferentes. O broker precisa de mapeamentos explícitos, política de confiança e observabilidade para que a garantia de autenticação não seja degradada durante a transformação."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Os padrões se sobrepõem em objetivo, mas não em todos os detalhes.",
    "headers": [
      "Aspecto",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Formato",
        "XML e XML Signature.",
        "JSON, JWT e JOSE."
      ],
      [
        "Uso dominante",
        "Web SSO corporativo e federação B2B.",
        "Apps web, mobile, APIs e identidade moderna."
      ],
      [
        "Descoberta",
        "Metadata SAML.",
        "Discovery metadata e JWKS."
      ],
      [
        "Identificador",
        "NameID e atributos.",
        "sub e claims."
      ],
      [
        "Sessão e logout",
        "SLO por mensagens SAML.",
        "RP-Initiated e canais de logout OIDC."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.15 SAML em API Gateways e brokers de identidade",
    "id": "19-15-saml-em-api-gateways-e-brokers-de-identidade"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways normalmente protegem APIs com tokens OAuth, JWT, mTLS ou credenciais técnicas. SAML pode aparecer na autenticação do portal de desenvolvedores, no login de consoles administrativos ou como protocolo de entrada de um identity broker. Quando uma aplicação SAML precisa chamar APIs, o padrão comum é trocar a sessão federada por um access token apropriado, e não enviar a SAML Assertion diretamente a todos os backends."
  },
  {
    "kind": "paragraph",
    "text": "Alguns gateways conseguem validar assertions SAML, extrair atributos e transformá-los em contexto ou tokens internos. Essa capacidade deve ser usada com cuidado: o gateway precisa validar assinatura, issuer, audience, recipient, tempo e replay com o mesmo rigor de um SP. Também deve evitar transformar atributos genéricos em privilégios amplos sem política explícita."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas híbridas, um broker pode receber SAML de parceiros e emitir OIDC/OAuth para aplicações modernas. Essa ponte reduz a necessidade de cada API compreender XML Signature, mas concentra confiança no broker. Logs devem registrar issuer externo, subject federado, método de autenticação, mapeamentos e token emitido, preservando rastreabilidade fim a fim."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.16 Ameaças e hardening",
    "id": "19-16-ameacas-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "As principais ameaças incluem assertion replay, assinatura inválida ou em elemento errado, acceptance de issuer inesperado, audience inadequada, ACS aberto, XML Signature Wrapping, parser XML vulnerável a entidades externas, algoritmos fracos, metadata adulterada, roubo de sessão, open redirect por RelayState e mapeamento inseguro de atributos."
  },
  {
    "kind": "paragraph",
    "text": "Hardening começa com allowlists de IdP e SP, metadata autenticada, algoritmos modernos, validação exata de endpoints, IDs únicos, caches de replay, tolerância de relógio curta e fail closed. O parser XML deve desabilitar DTD e external entities. A aplicação deve processar apenas elementos assinados e rejeitar mensagens com estrutura ambígua, assinaturas duplicadas ou referências inesperadas."
  },
  {
    "kind": "paragraph",
    "text": "A operação também importa. Certificados precisam de inventário, alertas e rotação com sobreposição. Relógios devem usar sincronização confiável. Mudanças de atributos e NameID exigem testes de regressão. Logs não devem armazenar assertions completas sem necessidade, porque elas podem conter dados pessoais e informações de autenticação."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - A maioria das falhas ocorre na validação e integração, não no conceito de SAML.",
    "headers": [
      "Ameaça",
      "Falha explorada",
      "Controle"
    ],
    "rows": [
      [
        "Replay",
        "Assertion válida reutilizada.",
        "Cache de IDs e janelas temporais curtas."
      ],
      [
        "Signature wrapping",
        "Elemento verificado difere do consumido.",
        "Processar exatamente o nó referenciado e assinado."
      ],
      [
        "ACS injection",
        "Destino controlado pelo atacante.",
        "Somente endpoints registrados em metadata."
      ],
      [
        "XXE",
        "Parser resolve entidade externa.",
        "DTD e entidades externas desabilitadas."
      ],
      [
        "Privilege mapping",
        "Atributo vira permissão excessiva.",
        "Mapeamento explícito e menor privilégio."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.17 Troubleshooting orientado por evidências",
    "id": "19-17-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting deve identificar o ponto exato do fluxo: criação da AuthnRequest, redirecionamento, autenticação no IdP, emissão da Response, entrega ao ACS, validação criptográfica, mapeamento de atributos ou criação da sessão. Erros de browser, gateway e aplicação podem parecer semelhantes, por isso IDs de request, timestamps, entityIDs e endpoints são essenciais."
  },
  {
    "kind": "paragraph",
    "text": "Mensagens como invalid signature podem resultar de certificado incorreto, canonicalização, XML alterado, algoritmo não permitido ou verificação do elemento errado. Audience invalid aponta para entityID divergente. Recipient mismatch indica ACS diferente. Response expired pode ser relógio desalinhado, fila longa ou janela pequena. InResponseTo unknown aponta para estado perdido, múltiplos nós sem compartilhamento de sessão ou resposta não solicitada."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas de captura devem ser usadas em ambientes autorizados e com cuidado para não expor assertions. O diagnóstico ideal compara metadata ativa, request emitida, response recebida, certificado selecionado e configuração da aplicação. Em clusters, verifique afinidade, armazenamento do request ID e relógio de todos os nós."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Diagnóstico SAML exige correlação entre mensagem, metadata e estado local.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências"
    ],
    "rows": [
      [
        "Invalid signature",
        "Chave errada, XML alterado, algoritmo ou referência.",
        "Certificado, SignedInfo, Reference URI e logs da biblioteca."
      ],
      [
        "Audience mismatch",
        "entityID diferente do esperado.",
        "AudienceRestriction e configuração do SP."
      ],
      [
        "InResponseTo desconhecido",
        "Estado perdido ou resposta não solicitada.",
        "Request ID, cookie temporário e nó do cluster."
      ],
      [
        "Assertion expirada",
        "Clock skew ou atraso excessivo.",
        "NotBefore, NotOnOrAfter e horário dos hosts."
      ],
      [
        "Usuário sem permissão",
        "Atributo ausente ou mapping incorreto.",
        "AttributeStatement e política local."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.18 Estudos de caso e laboratórios",
    "id": "19-18-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1: uma empresa integra seu IdP corporativo a um SaaS externo. O SP exige NameID persistent e grupos específicos. A equipe define metadata bilateral, certificados de assinatura, mapeamento de atributos, janela de rotação e testes de usuários com múltiplas unidades. O projeto falha inicialmente porque o e-mail era usado como chave imutável; a correção adota identificador estável e migração controlada."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2: um portal bancário aceita parceiros por SAML e converte a identidade em tokens internos para APIs. O broker valida a assertion, aplica política de issuer e AuthnContext, mapeia o subject externo a uma aplicação parceira e emite access token com audience restrita. O gateway nunca recebe a assertion original nos backends, reduzindo exposição do XML e centralizando a federação."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3: um cluster de SP apresenta falhas intermitentes de InResponseTo. A causa é o armazenamento local da AuthnRequest em cada nó sem afinidade ou sessão compartilhada. O navegador inicia em um nó e retorna a outro. A correção utiliza armazenamento distribuído de requests pendentes e mantém cache de replay por toda a janela de validade."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Examine metadata de IdP e SP e identifique entityID, ACS, SSO, SLO e certificados. 2) Decodifique uma AuthnRequest e uma Response de ambiente de laboratório. 3) Liste todas as validações além da assinatura. 4) Simule rotação de certificado com período de sobreposição. 5) Compare um fluxo SAML com Authorization Code + OIDC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 é um framework XML de federação baseado em assertions, protocol messages, bindings, profiles e metadata. Seu caso de uso mais comum é Web Browser SSO entre um Identity Provider e um Service Provider. O IdP autentica o principal, emite declarações e o SP valida a mensagem antes de criar sua própria sessão local."
  },
  {
    "kind": "paragraph",
    "text": "A segurança depende de muito mais que uma assinatura válida. Issuer, audience, recipient, destination, InResponseTo, tempo, SubjectConfirmation, replay, estrutura XML e metadata precisam ser validados de forma coerente. XML Signature Wrapping e parsing inseguro demonstram por que bibliotecas maduras e processamento do elemento efetivamente assinado são indispensáveis."
  },
  {
    "kind": "paragraph",
    "text": "SAML continua relevante em federações corporativas e B2B, enquanto OpenID Connect se encaixa melhor em aplicações e APIs modernas. Brokers de identidade permitem coexistência e tradução, mas precisam preservar semântica e rastreabilidade. Em plataformas de APIs, SAML normalmente autentica usuários em portais ou entra no broker, que então emite tokens apropriados para as APIs."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 20 aprofundará Identity Federation e Single Sign-On como arquitetura, comparando domínios de confiança, brokers, home realm discovery, provisionamento, ciclo de vida e coexistência entre SAML, OpenID Connect e outros mecanismos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de implementação e revisão",
    "id": "checklist-de-implementacao-e-revisao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "EntityIDs, endpoints e bindings vêm de metadata confiável e versionada.",
      "AuthnRequest IDs são únicos e armazenados até a correlação da Response.",
      "O ACS aceita somente destinos registrados e rejeita mensagens para outro recipient.",
      "A biblioteca valida XML Signature e a aplicação consome exatamente o elemento assinado.",
      "Issuer, audience, destination, recipient, InResponseTo e condições temporais são verificados.",
      "Assertions processadas são registradas em cache de replay durante a janela necessária.",
      "Parser XML desabilita DTD, external entities e construções perigosas.",
      "NameID e atributos possuem contrato de semântica, cardinalidade e origem.",
      "Mapeamentos de grupos para permissões seguem menor privilégio e possuem testes.",
      "Certificados têm inventário, monitoramento, sobreposição e plano de rollback.",
      "Sessão local usa cookies seguros e não depende exclusivamente de Single Logout.",
      "Logs preservam correlação sem armazenar dados pessoais desnecessários."
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
      "Diferencie assertion, protocol message, binding, profile e metadata.",
      "Descreva o fluxo SP-initiated SSO e indique onde InResponseTo é validado.",
      "Explique por que assinatura válida não é suficiente para aceitar uma assertion.",
      "Compare HTTP-Redirect, HTTP-POST, HTTP-Artifact e SOAP bindings.",
      "Explique o papel de AudienceRestriction, Recipient e SubjectConfirmationData.",
      "Diferencie assinatura da Response e assinatura da Assertion.",
      "Descreva XML Signature Wrapping e a principal regra de defesa.",
      "Proponha rotação de certificado sem indisponibilidade.",
      "Compare persistent, transient e emailAddress NameID.",
      "Explique por que SLO pode falhar parcialmente.",
      "Compare SAML 2.0 e OpenID Connect em uma arquitetura corporativa.",
      "Desenhe uma ponte SAML para OAuth/OIDC usando um identity broker."
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
        "ACS",
        "Assertion Consumer Service; endpoint do SP que recebe a Response."
      ],
      [
        "Assertion",
        "Estrutura XML com declarações sobre um subject."
      ],
      [
        "AttributeStatement",
        "Statement que transporta atributos do subject."
      ],
      [
        "AuthnContext",
        "Informação sobre o método ou força de autenticação."
      ],
      [
        "AuthnRequest",
        "Mensagem do SP que solicita autenticação ao IdP."
      ],
      [
        "Binding",
        "Mapeamento de mensagens SAML para outro protocolo."
      ],
      [
        "EntityID",
        "Identificador estável de uma entidade SAML."
      ],
      [
        "IdP",
        "Identity Provider que autentica e emite declarações."
      ],
      [
        "InResponseTo",
        "Correlação entre Response e request anterior."
      ],
      [
        "Metadata",
        "Descrição de entidade, roles, endpoints, bindings e chaves."
      ],
      [
        "NameID",
        "Identificador do subject em formato definido."
      ],
      [
        "Profile",
        "Conjunto de regras para um caso de uso SAML."
      ],
      [
        "RelayState",
        "Estado da aplicação transportado pelo fluxo de navegador."
      ],
      [
        "SLO",
        "Single Logout coordenado entre participantes."
      ],
      [
        "SP",
        "Service Provider que consome assertions e oferece a aplicação."
      ],
      [
        "SubjectConfirmation",
        "Regras pelas quais o subject apresenta a assertion."
      ],
      [
        "XML Signature Wrapping",
        "Ataque que separa elemento verificado do elemento consumido."
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
      "OASIS. Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Bindings for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Profiles for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Metadata for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Security Assertion Markup Language (SAML) V2.0 Technical Overview.",
      "OASIS. SAML V2.0 Metadata Interoperability Profile Version 1.0.",
      "W3C. XML Signature Syntax and Processing.",
      "W3C. XML Encryption Syntax and Processing.",
      "OWASP. SAML Security Cheat Sheet.",
      "NIST. Digital Identity Guidelines, quando aplicável ao contexto de autenticação e federação."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 é um padrão estável, mas produtos, algoritmos permitidos, perfis de interoperabilidade e práticas de hardening continuam evoluindo. Antes de implantar, valide documentação oficial do IdP, SP, gateway e biblioteca utilizados, incluindo comportamento de assinatura, metadata e rotação."
  }
];
