import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OPEN_FINANCE_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Open Finance Brasil: consentimento, confiança institucional e APIs padronizadas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/pt/overview.svg",
    "alt": "Cliente autorizando compartilhamento seguro entre instituições financeiras por APIs",
    "caption": "Figura de abertura - A jornada combina escolha do cliente, confiança entre participantes e APIs padronizadas."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O cliente controla o consentimento, enquanto participantes regulados preservam segurança, interoperabilidade, evidências e responsabilidades ponta a ponta."
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
    "text": "O Open Finance brasileiro é uma infraestrutura regulada de compartilhamento de dados e serviços financeiros por APIs. Sua proposta vai além da abertura de informações bancárias: o cliente pode autorizar que uma instituição receba dados mantidos por outra, iniciar serviços de pagamento e usar essas informações em jornadas de crédito, gestão financeira, investimentos e outros produtos. O valor do ecossistema surge da combinação entre portabilidade informacional, concorrência, inovação e controle pelo titular."
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura é tecnicamente exigente porque conecta instituições independentes em uma rede de confiança comum. Não basta publicar uma API REST. É necessário identificar participantes, proteger o transporte, autenticar o cliente, registrar consentimento, emitir tokens, limitar escopos, padronizar payloads, garantir não repúdio e produzir evidências para monitoramento e auditoria. O erro de uma única camada pode impedir a jornada ou, pior, expor dados de alto valor."
  },
  {
    "kind": "paragraph",
    "text": "O modelo brasileiro evoluiu a partir do Open Banking para um escopo mais amplo de Open Finance. As fases de implantação organizaram historicamente dados abertos, dados cadastrais e transacionais, iniciação de pagamentos e expansão para outros produtos financeiros. Em 2026, o ecossistema continua evoluindo por normas, manuais, agenda técnica e novas capacidades; por isso, profissionais devem distinguir princípios estáveis de versões específicas de APIs e regras operacionais."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta os conhecimentos anteriores do curso - OAuth 2.0, OpenID Connect, mTLS, JWT, gateways, segurança, observabilidade e alta disponibilidade - ao contexto brasileiro. O foco é construir um modelo mental ponta a ponta, útil para arquitetura, desenvolvimento, sustentação e troubleshooting em instituições participantes."
  },
  {
    "kind": "paragraph",
    "text": "Como estudar este capítulo Acompanhe cada fluxo identificando quatro objetos diferentes: consentimento, sessão de autenticação, token de acesso e chamada de API. Eles se relacionam, mas não são equivalentes. Em produção, cada um possui ciclo de vida, identificadores e evidências próprias."
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
      "Diferenciar Open Banking e Open Finance no contexto brasileiro.",
      "Explicar os papéis de cliente, receptor, transmissor, iniciador e detentor de conta.",
      "Descrever a jornada de consentimento, autenticação, confirmação e compartilhamento.",
      "Relacionar Diretório, certificados, OAuth 2.0, OIDC, FAPI-BR e mTLS.",
      "Compreender categorias de APIs, versionamento, idempotência e tratamento de erros.",
      "Analisar iniciação de pagamentos sem confundir jornada, autorização e liquidação.",
      "Aplicar princípios de privacidade, finalidade, minimização e revogação.",
      "Projetar gateways, observabilidade, alta disponibilidade e resposta a incidentes.",
      "Diagnosticar falhas de redirecionamento, certificados, tokens, consentimento e APIs."
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
      "35.1 Open Banking, Open Finance e portabilidade de dados",
      "35.2 Evolução e arcabouço regulatório",
      "35.3 Participantes, papéis e fronteiras de responsabilidade",
      "35.4 Consentimento e experiência do cliente",
      "35.5 Diretório, confiança e identidade institucional",
      "35.6 FAPI-BR, OAuth 2.0, OIDC e mTLS",
      "35.7 Categorias de APIs e contratos",
      "35.8 Iniciação de pagamentos",
      "35.9 Segurança, privacidade e prevenção a fraudes",
      "35.10 Gateway, observabilidade e disponibilidade",
      "35.11 Certificação e monitoramento",
      "35.12 Experiência do cliente e redirecionamentos",
      "35.13 Qualidade, semântica e ciclo de vida dos dados",
      "35.14 Requisitos não funcionais e capacidade",
      "35.15 Versionamento e gestão de mudanças",
      "35.16 Troubleshooting ponta a ponta",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.1 Open Banking, Open Finance e portabilidade de dados",
    "id": "35-1-open-banking-open-finance-e-portabilidade-de-dados"
  },
  {
    "kind": "paragraph",
    "text": "Open Banking descreve, em sentido amplo, a abertura controlada de dados e serviços bancários. Open Finance amplia esse princípio para um conjunto mais abrangente de produtos e relações financeiras. No Brasil, a denominação evoluiu porque o escopo passou a contemplar dados e serviços que ultrapassam conta corrente e cartão, incluindo crédito, investimentos, câmbio, seguros e previdência, conforme a regulamentação e os manuais aplicáveis."
  },
  {
    "kind": "paragraph",
    "text": "A mudança de nome não elimina a arquitetura original. O núcleo continua sendo o compartilhamento padronizado por APIs, mediante autorização do cliente quando os dados são pessoais ou protegidos. O cliente escolhe quem recebe, de onde os dados saem, para qual finalidade e por quanto tempo. A instituição receptora não recebe acesso irrestrito à conta; recebe apenas os dados ou serviços contemplados pelo consentimento e pelo escopo autorizado."
  },
  {
    "kind": "paragraph",
    "text": "Portabilidade de dados não significa copiar permanentemente toda a vida financeira para um repositório central. A arquitetura é distribuída: os dados permanecem nas instituições que os detêm e são transmitidos, sob demanda, para participantes autorizados. Essa característica reduz centralização, mas exige disponibilidade, interoperabilidade e consistência operacional entre muitas organizações."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Os termos se relacionam, mas não são sinônimos perfeitos.",
    "headers": [
      "Conceito",
      "Ênfase",
      "Exemplo"
    ],
    "rows": [
      [
        "Open Banking",
        "Dados e serviços bancários.",
        "Contas, cartões, crédito e pagamentos."
      ],
      [
        "Open Finance",
        "Ecossistema financeiro mais amplo.",
        "Investimentos, seguros, câmbio e previdência, conforme escopo vigente."
      ],
      [
        "Open API",
        "Interface publicada com regras de acesso.",
        "API padronizada para dados ou serviço financeiro."
      ],
      [
        "Portabilidade informacional",
        "Cliente controla o deslocamento dos dados.",
        "Compartilhar histórico para obter proposta melhor."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.2 Evolução e arcabouço regulatório",
    "id": "35-2-evolucao-e-arcabouco-regulatorio"
  },
  {
    "kind": "paragraph",
    "text": "A implementação brasileira foi organizada em etapas. A primeira concentrou dados abertos de produtos, canais e serviços. A segunda introduziu compartilhamento de dados cadastrais e transacionais mediante consentimento. A terceira incorporou iniciação de pagamentos e encaminhamento de propostas. A quarta expandiu o escopo para outros produtos financeiros. Essa divisão é útil como visão histórica, embora o ecossistema atual seja mantido por uma agenda evolutiva contínua."
  },
  {
    "kind": "paragraph",
    "text": "O marco central é a Resolução Conjunta nº 1, de 4 de maio de 2020, posteriormente alterada por outras normas. O Banco Central divulga manuais técnicos e operacionais que detalham APIs, experiência do cliente, segurança, serviços, escopo e monitoramento. Em 2026, novas instruções normativas continuaram atualizando esses manuais, o que reforça a necessidade de consultar a versão vigente antes de implementar ou promover mudanças."
  },
  {
    "kind": "paragraph",
    "text": "A Estrutura de Governança coordena especificações, diretório, certificações, monitoramento e processos comuns. As instituições continuam responsáveis por seus sistemas, dados, autenticação, segurança e atendimento regulatório. Governança compartilhada não transfere a responsabilidade individual por falhas de proteção ou indisponibilidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - As fases explicam a evolução, mas a operação atual é contínua e versionada.",
    "headers": [
      "Etapa histórica",
      "Conteúdo predominante",
      "Impacto arquitetural"
    ],
    "rows": [
      [
        "Dados abertos",
        "Produtos, tarifas, canais e características.",
        "APIs públicas, catálogo e padronização."
      ],
      [
        "Dados do cliente",
        "Cadastro e transações com consentimento.",
        "OAuth, identidade, escopo e privacidade."
      ],
      [
        "Serviços",
        "Iniciação de pagamentos e outras jornadas.",
        "Idempotência, status, antifraude e alta disponibilidade."
      ],
      [
        "Expansão",
        "Outros produtos e dados financeiros.",
        "Mais domínios, versões e integração intersetorial."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.3 Participantes, papéis e fronteiras de responsabilidade",
    "id": "35-3-participantes-papeis-e-fronteiras-de-responsabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Uma mesma instituição pode exercer mais de um papel. Como transmissora, disponibiliza dados que mantém. Como receptora, recebe dados autorizados para oferecer serviços. Como iniciadora de transação de pagamento, conduz a jornada e envia uma ordem autorizada, sem deter os fundos. Como detentora de conta, autentica o cliente, valida a autorização e executa o pagamento conforme as regras aplicáveis."
  },
  {
    "kind": "paragraph",
    "text": "Os papéis devem ser modelados por função, não apenas por marca. Um conglomerado pode possuir entidades jurídicas distintas, cada qual com certificados, registros e responsabilidades próprias. O roteamento e a autorização precisam respeitar o participante exato, o ambiente, a organização e o software cadastrado, evitando assumir que todo componente de um grupo financeiro compartilha automaticamente a mesma identidade."
  },
  {
    "kind": "paragraph",
    "text": "Também existem componentes comuns, como diretório, ferramentas de certificação, monitoramento e portais de especificação. Esses serviços criam interoperabilidade, mas não substituem os controles internos de cada participante. A instituição deve garantir que suas APIs, portais, certificados, credenciais e processos estejam atualizados e operacionais."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - O diagnóstico deve registrar qual papel cada instituição exercia na transação.",
    "headers": [
      "Papel",
      "Responsabilidade principal",
      "Evidência operacional"
    ],
    "rows": [
      [
        "Transmissor de dados",
        "Disponibilizar dados autorizados e padronizados.",
        "Logs de consentimento, token e chamadas."
      ],
      [
        "Receptor de dados",
        "Solicitar e usar dados conforme finalidade.",
        "Registro da jornada e base legal."
      ],
      [
        "Iniciador de pagamento",
        "Criar a jornada e transmitir a ordem.",
        "Consentimento, idempotência e status."
      ],
      [
        "Detentor de conta",
        "Autenticar e executar o pagamento.",
        "Confirmação, antifraude e retorno."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.4 Consentimento e experiência do cliente",
    "id": "35-4-consentimento-e-experiencia-do-cliente"
  },
  {
    "kind": "paragraph",
    "text": "O consentimento é uma autorização explícita para finalidades e condições determinadas. Ele não deve ser confundido com autenticação. A autenticação prova a identidade do cliente perante a instituição; o consentimento registra a decisão sobre dados ou serviços. A jornada precisa permitir que o cliente compreenda quem receberá os dados, quais categorias serão compartilhadas, por quanto tempo e para que finalidade."
  },
  {
    "kind": "paragraph",
    "text": "A experiência normalmente começa na instituição receptora. O cliente seleciona a instituição de origem e é redirecionado para um canal controlado por ela. Nesse ambiente, autentica-se com os mecanismos habituais e confirma a autorização. Depois, retorna à instituição receptora, que conclui a troca de tokens e inicia as chamadas. O receptor não deve coletar a senha usada no transmissor."
  },
  {
    "kind": "paragraph",
    "text": "Revogação e expiração são partes do ciclo de vida. Encerrar o consentimento impede novas chamadas amparadas por ele, mas não apaga automaticamente dados já recebidos quando existe obrigação ou outra base legal para retenção. A governança de dados precisa separar permissão para coletar, finalidade de uso, retenção, anonimização e descarte."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/pt/figure-01.svg",
    "alt": "Consentimento, autenticação e chamada de API como etapas independentes",
    "caption": "Figura 1 - Consentimento, autenticação e chamada de API são etapas relacionadas, porém independentes."
  },
  {
    "kind": "paragraph",
    "text": "Regra de segurança A senha ou fator de autenticação do banco de origem deve ser informado apenas no ambiente controlado por essa instituição. A instituição receptora trabalha com redirecionamento, consentimento e tokens, não com captura de credenciais bancárias."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.5 Diretório, confiança e identidade institucional",
    "id": "35-5-diretorio-confianca-e-identidade-institucional"
  },
  {
    "kind": "paragraph",
    "text": "O ecossistema depende de uma infraestrutura de confiança capaz de responder quem é o participante, quais funções exerce, quais softwares foram registrados, quais endpoints pertencem a ele e quais certificados estão associados à identidade. O Diretório cumpre papel central nessa descoberta e no estabelecimento de relações verificáveis entre organizações."
  },
  {
    "kind": "paragraph",
    "text": "Certificados e chaves precisam ser tratados como ativos de produção. Rotação, expiração, revogação, cadeia de confiança e associação ao ambiente correto devem ser monitoradas. Um certificado válido criptograficamente pode ser inadequado se estiver vinculado a outra organização, outro software ou outra finalidade. Por isso, validação de identidade não termina na assinatura; inclui metadados e registros do ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "A confiança também é versionada. Mudanças de certificados, endpoints, perfis de software e participantes precisam propagar-se sem janelas de inconsistência. Ambientes de homologação e produção não devem compartilhar segredos ou certificados de forma indiscriminada."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/pt/figure-02.svg",
    "alt": "Diretório e confiança institucional conectando participantes por criptografia e protocolos",
    "caption": "Figura 2 - Confiança institucional combina registro, criptografia, protocolos e evidências operacionais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.6 FAPI-BR, OAuth 2.0, OpenID Connect e mTLS",
    "id": "35-6-fapi-br-oauth-2-0-openid-connect-e-mtls"
  },
  {
    "kind": "paragraph",
    "text": "APIs financeiras lidam com dados e operações de alto risco. O perfil de segurança brasileiro, conhecido como FAPI-BR, acrescenta requisitos ao OAuth 2.0 e ao OpenID Connect para reduzir interceptação de códigos, adulteração de parâmetros, clientes falsos e reutilização de tokens. O perfil vigente deve ser consultado porque versões e períodos de convivência fazem parte da evolução técnica do ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "A jornada envolve servidor de autorização, cliente registrado e resource server. O cliente inicia uma autorização; o servidor autentica o usuário e vincula a transação ao consentimento; depois, emite tokens para acesso às APIs. Mecanismos como PKCE, parâmetros assinados, autorização empurrada, autenticação forte do cliente e tokens vinculados ao certificado podem participar do perfil, conforme a versão aplicável."
  },
  {
    "kind": "paragraph",
    "text": "mTLS protege o transporte e também pode vincular o token ao certificado do cliente. Nesse modelo, roubar o token não é suficiente: o atacante também precisaria demonstrar posse da chave privada correspondente. O gateway deve validar a cadeia, identidade, associação com o software registrado e confirmação presente no token, além de issuer, audience, expiração e escopos."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect apoia a autenticação e a entrega de claims de identidade no fluxo de autorização. Entretanto, APIs de dados devem validar access tokens, não utilizar ID Tokens como substitutos genéricos. A separação entre autenticação do usuário, autorização do cliente e acesso ao recurso continua essencial."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Segurança é composta por camadas; nenhum mecanismo isolado resolve todo o problema.",
    "headers": [
      "Camada",
      "Mecanismo",
      "Responsabilidade"
    ],
    "rows": [
      [
        "Transporte",
        "TLS e mTLS",
        "Confidencialidade, integridade e identidade de ponta."
      ],
      [
        "Autorização",
        "OAuth 2.0 / FAPI-BR",
        "Delegação, tokens, escopos e proteção do fluxo."
      ],
      [
        "Identidade",
        "OpenID Connect",
        "Autenticação e claims sobre o usuário."
      ],
      [
        "Mensagem",
        "JWT/JWS/JWE",
        "Assinatura, integridade e eventual confidencialidade."
      ],
      [
        "Ecossistema",
        "Diretório e certificados",
        "Identidade institucional e descoberta confiável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.7 Categorias de APIs e contratos",
    "id": "35-7-categorias-de-apis-e-contratos"
  },
  {
    "kind": "paragraph",
    "text": "O catálogo do Open Finance organiza APIs por grupos de dados e serviços. Entre as categorias recorrentes estão canais e produtos, dados cadastrais, contas, cartões, operações de crédito, investimentos, câmbio, seguros, previdência, consentimentos, recursos e pagamentos. A disponibilidade e a versão exata devem ser verificadas no catálogo oficial vigente."
  },
  {
    "kind": "paragraph",
    "text": "As especificações padronizam nomes, campos, tipos, paginação, cabeçalhos, erros e requisitos não funcionais. Isso reduz ambiguidades entre instituições, mas não elimina diferenças de dados de origem. Sistemas legados podem representar datas, saldos, contratos e titulares de formas distintas. A camada de adaptação deve preservar semântica, não apenas converter nomes de campos."
  },
  {
    "kind": "paragraph",
    "text": "Versionamento exige convivência planejada. Uma instituição pode precisar suportar mais de uma versão durante migrações, executar testes de conformidade e comunicar mudanças a consumidores. O gateway ajuda no roteamento, mas compatibilidade real depende de backend, contrato, documentação e observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Exemplo conceitual de chamada de dados GET /open-banking/accounts/vX/accounts/{accountId}/balances HTTP/1.1 Host: api.instituicao.example Authorization: Bearer <access-token> X-Fapi-Interaction-Id: <uuid> Accept: application/json # O caminho e os cabeçalhos exatos dependem da versão vigente da especificação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.8 Iniciação de pagamentos",
    "id": "35-8-iniciacao-de-pagamentos"
  },
  {
    "kind": "paragraph",
    "text": "A iniciação de pagamento permite que uma instituição autorizada crie a experiência e transmita a ordem para a instituição onde o cliente mantém a conta. O iniciador não precisa custodiar os fundos. O cliente escolhe a conta, autentica-se no detentor e confirma a operação. A execução financeira ocorre no arranjo e nos prestadores envolvidos, enquanto o iniciador acompanha estados e apresenta o resultado."
  },
  {
    "kind": "paragraph",
    "text": "Do ponto de vista de API, a jornada exige idempotência, correlação e máquina de estados. Repetir uma requisição por timeout não pode criar pagamentos duplicados. O identificador de idempotência precisa estar associado ao conteúdo e a uma janela definida. Estados intermediários devem ser tratados como parte do contrato: pendente, aceito, rejeitado, concluído ou cancelado podem exigir consultas ou notificações posteriores."
  },
  {
    "kind": "paragraph",
    "text": "Segurança antifraude não desaparece. Detentor e iniciador aplicam seus próprios controles, respeitando a experiência regulada. Sinais como dispositivo, comportamento, risco, valor, favorecido e histórico podem levar a autenticação adicional ou rejeição. A arquitetura precisa evitar vazamento de detalhes que ajudem atacantes a calibrar tentativas."
  },
  {
    "kind": "subhead",
    "text": "Iniciação de pagamento: separação entre jornada e movimentação dos fundos"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/pt/figure-03.svg",
    "alt": "Iniciador de pagamento orquestrando jornada executada pela instituição detentora",
    "caption": "Figura 3 - O iniciador orquestra a jornada, mas a instituição detentora executa a movimentação dos fundos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.9 Segurança, privacidade e prevenção a fraudes",
    "id": "35-9-seguranca-privacidade-e-prevencao-a-fraudes"
  },
  {
    "kind": "paragraph",
    "text": "Dados financeiros possuem alto valor e podem revelar renda, hábitos, localização indireta, relacionamentos e saúde financeira. O princípio de minimização exige solicitar apenas categorias necessárias à finalidade apresentada. O receptor deve impedir uso secundário incompatível, limitar acesso interno e registrar quem consultou ou processou os dados."
  },
  {
    "kind": "paragraph",
    "text": "A LGPD se aplica junto à regulamentação setorial. Consentimento no Open Finance é um mecanismo operacional e regulatório específico, mas o tratamento posterior ainda precisa respeitar finalidade, transparência, segurança e direitos do titular. Segredos, tokens, certificados e payloads não devem aparecer integralmente em logs, ferramentas de suporte ou ambientes de teste."
  },
  {
    "kind": "paragraph",
    "text": "Ameaças incluem phishing durante redirecionamento, aplicativos falsos, roubo de token, abuso de consentimentos, enumeração de recursos, fraude de pagamento, replay, SSRF e comprometimento de certificados. Controles eficazes combinam validação de redirect URIs, mTLS, tokens curtos, audience restrita, idempotência, detecção comportamental e resposta rápida a incidentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Cada ameaça precisa de controle preventivo e evidência verificável.",
    "headers": [
      "Ameaça",
      "Controle principal",
      "Evidência"
    ],
    "rows": [
      [
        "Aplicativo ou participante falso",
        "Diretório, certificados e validação de cliente.",
        "Identidade e software registrados."
      ],
      [
        "Token roubado",
        "mTLS/sender-constrained, audience e expiração curta.",
        "Falha de binding ou uso anômalo."
      ],
      [
        "Consentimento abusivo",
        "Finalidade, escopo, prazo e revogação.",
        "Registro da jornada e telas apresentadas."
      ],
      [
        "Pagamento duplicado",
        "Idempotência e máquina de estados.",
        "Mesma chave e mesmo conteúdo."
      ],
      [
        "Vazamento em logs",
        "Mascaramento e minimização.",
        "Logs sem tokens ou dados sensíveis completos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.10 API Gateway, observabilidade e alta disponibilidade",
    "id": "35-10-api-gateway-observabilidade-e-alta-disponibilidade"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway concentra controles de transporte, validação de certificados, tokens, rate limiting, roteamento, transformação e auditoria. Entretanto, ele não deve assumir sozinho regras de negócio do consentimento. O backend precisa verificar vínculo entre recurso, cliente, titular e escopo. Caso contrário, uma configuração equivocada no gateway pode abrir acesso indevido."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade deve correlacionar interaction ID, consent ID, client ID, organização, token, versão da API, endpoint, status, latência e backend. Tokens e dados pessoais devem ser mascarados. Métricas agregadas revelam disponibilidade e desempenho; traces ajudam a separar tempo no gateway, servidor de autorização, adaptador e legado."
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade é requisito sistêmico. Uma instituição pode estar saudável internamente e ainda falhar por DNS, certificado, diretório, dependência de autorização ou backend. Timeouts, retries e circuit breakers precisam considerar idempotência e natureza da operação. Repetir leitura pode ser seguro; repetir criação de pagamento sem chave correta pode ser desastroso."
  },
  {
    "kind": "subhead",
    "text": "Arquitetura de borda para APIs reguladas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/pt/figure-04.svg",
    "alt": "API Gateway aplicando controles de borda em uma jornada autorizada fim a fim",
    "caption": "Figura 4 - O gateway aplica controles de borda, enquanto consentimento e autorização de negócio permanecem fim a fim."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.11 Certificação, monitoramento e conformidade",
    "id": "35-11-certificacao-monitoramento-e-conformidade"
  },
  {
    "kind": "paragraph",
    "text": "O ecossistema utiliza mecanismos de certificação funcional e de segurança para aumentar interoperabilidade. A aprovação em testes não garante operação permanente: mudanças de versão, certificados, dependências e infraestrutura podem introduzir regressões. Por isso, conformidade precisa estar integrada ao CI/CD, com testes automatizados e validação antes de cada promoção."
  },
  {
    "kind": "paragraph",
    "text": "Monitoramento comum e indicadores permitem identificar indisponibilidade, degradação e diferenças de comportamento entre participantes. Em 2026, o Banco Central atualizou manuais de monitoramento e segurança, reforçando revisão periódica de configurações, serviços expostos e controles de autenticação e autorização. A equipe deve acompanhar normas e agenda evolutiva, não apenas o backlog interno."
  },
  {
    "kind": "paragraph",
    "text": "Evidências de conformidade incluem configuração publicada, versão da API, certificado ativo, resultado de testes, logs de jornada, métricas, incidentes e planos de correção. A ausência de trilha auditável transforma problemas técnicos em riscos regulatórios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.12 Experiência do cliente e redirecionamentos",
    "id": "35-12-experiencia-do-cliente-e-redirecionamentos"
  },
  {
    "kind": "paragraph",
    "text": "A experiência do cliente é parte do protocolo operacional. Redirecionamentos entre aplicativos e navegadores precisam preservar contexto sem expor credenciais. A interface deve deixar claro qual instituição recebe os dados, qual transmite, quais dados serão usados e por quanto tempo. Ambiguidade visual aumenta risco de phishing e abandono da jornada."
  },
  {
    "kind": "paragraph",
    "text": "Jornadas app-to-app e web-to-app exigem deep links, universal links ou mecanismos equivalentes configurados com domínio e aplicativo corretos. O parâmetro state protege a correlação e ajuda a impedir substituição de sessão. A aplicação deve tratar cancelamento, retorno sem código, expiração, mudança de dispositivo e retomada da jornada de forma previsível."
  },
  {
    "kind": "paragraph",
    "text": "A autenticação ocorre no ambiente da instituição transmissora ou detentora. O receptor não deve imitar a tela do outro banco nem solicitar sua senha. Mensagens de erro também precisam evitar termos internos e informar ao cliente qual etapa falhou, sem revelar detalhes de segurança."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - A experiência segura precisa prever caminhos de erro e cancelamento.",
    "headers": [
      "Situação",
      "Tratamento esperado",
      "Risco evitado"
    ],
    "rows": [
      [
        "Usuário cancela",
        "Retornar estado controlado e não criar consentimento.",
        "Consentimento fantasma."
      ],
      [
        "Deep link inválido",
        "Bloquear retorno e orientar nova tentativa.",
        "Sequestro de redirecionamento."
      ],
      [
        "state divergente",
        "Rejeitar a resposta.",
        "CSRF e troca de sessão."
      ],
      [
        "Sessão expirada",
        "Reiniciar autorização com contexto claro.",
        "Uso de sessão obsoleta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.13 Qualidade, semântica e ciclo de vida dos dados",
    "id": "35-13-qualidade-semantica-e-ciclo-de-vida-dos-dados"
  },
  {
    "kind": "paragraph",
    "text": "Interoperabilidade não significa apenas JSON válido. Campos precisam conservar significado entre instituições. Saldo disponível, saldo bloqueado, limite, data de contratação e situação de contrato podem ter regras distintas nos sistemas de origem. O adaptador deve aplicar a semântica da especificação e documentar limitações, evitando preencher campos com valores aproximados apenas para satisfazer o schema."
  },
  {
    "kind": "paragraph",
    "text": "Qualidade inclui completude, consistência, atualidade, unicidade e rastreabilidade. Quando um dado não existe ou não se aplica, a representação deve seguir o contrato. Null, campo ausente, zero e string vazia não são equivalentes. Erros sistemáticos de mapeamento podem produzir decisões de crédito incorretas mesmo quando a API está disponível."
  },
  {
    "kind": "paragraph",
    "text": "O receptor também precisa governar os dados após a coleta. Deve registrar origem, consentimento, finalidade, data de obtenção, transformações e regras de retenção. Quando o consentimento expira ou é revogado, novas coletas cessam; o tratamento dos dados já recebidos deve seguir obrigações legais, contratuais e políticas de descarte."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.14 Requisitos não funcionais e capacidade",
    "id": "35-14-requisitos-nao-funcionais-e-capacidade"
  },
  {
    "kind": "paragraph",
    "text": "As especificações do ecossistema incluem requisitos não funcionais como disponibilidade, latência, limites de tráfego, monitoramento e comportamento de erro. Esses parâmetros variam por grupo de API e versão. O planejamento de capacidade deve considerar rajadas de consentimentos, agregadores que consultam várias instituições, fechamentos mensais e novas funcionalidades regulatórias."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting precisa proteger a plataforma sem interromper consumidores legítimos. A chave de limite pode combinar organização, software, consentimento, token e API. Contadores locais são simples, mas podem permitir excesso em múltiplas instâncias; contadores globais melhoram consistência e acrescentam latência e dependência."
  },
  {
    "kind": "paragraph",
    "text": "A estratégia de disponibilidade deve incluir zonas independentes, renovação de certificados, rotação de chaves, replicação de configurações e testes de contingência. O objetivo não é apenas manter o endpoint respondendo, mas preservar autenticação, autorização, dados atualizados e status confiáveis durante falhas parciais."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Disponibilidade técnica sem qualidade ou segurança não representa sucesso.",
    "headers": [
      "Dimensão",
      "Indicador",
      "Pergunta operacional"
    ],
    "rows": [
      [
        "Disponibilidade",
        "Sucesso por API e participante.",
        "A jornada completa está disponível?"
      ],
      [
        "Latência",
        "Percentis por endpoint e backend.",
        "Onde o tempo está sendo consumido?"
      ],
      [
        "Capacidade",
        "RPS, concorrência e filas.",
        "Há margem para rajadas e retries?"
      ],
      [
        "Qualidade",
        "Campos ausentes e divergências.",
        "A resposta está semanticamente correta?"
      ],
      [
        "Segurança",
        "Falhas de token, mTLS e fraude.",
        "O controle está bloqueando o risco certo?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.15 Versionamento e gestão de mudanças",
    "id": "35-15-versionamento-e-gestao-de-mudancas"
  },
  {
    "kind": "paragraph",
    "text": "O catálogo diferencia versões atuais, candidatas e períodos de convivência. Uma nova versão pode alterar schemas, endpoints, requisitos de segurança ou regras não funcionais. A instituição precisa inventariar consumidores e dependências internas, atualizar mocks, contratos, gateways, backends e observabilidade antes da data obrigatória."
  },
  {
    "kind": "paragraph",
    "text": "Mudanças devem entrar por pipeline. Linting, testes de contrato, testes funcionais, certificação, segurança e performance precisam ser executados com a mesma configuração que chegará à produção. Exceções manuais devem ter prazo e responsável. A documentação deve informar qual versão está ativa, qual está em retirada e como identificar tráfego remanescente."
  },
  {
    "kind": "paragraph",
    "text": "Períodos de convivência não devem virar suporte indefinido. Telemetria por versão, organização e software ajuda a confirmar migração. A retirada só deve ocorrer quando requisitos regulatórios, comunicação e evidências técnicas estiverem alinhados."
  },
  {
    "kind": "paragraph",
    "text": "Governança de mudança Trate norma, manual, especificação e configuração de gateway como artefatos versionados. Uma alteração regulatória só termina quando código, certificados, testes, documentação, monitoramento e runbooks também foram atualizados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.16 Troubleshooting ponta a ponta",
    "id": "35-16-troubleshooting-ponta-a-ponta"
  },
  {
    "kind": "paragraph",
    "text": "Falhas de Open Finance precisam ser classificadas pela etapa. Se a instituição não aparece para seleção, investigue diretório, cadastro e descoberta. Se o redirecionamento falha, verifique redirect URI, estado, navegador, aplicativo e deep link. Se o token não é emitido, avalie autorização, PKCE, autenticação do cliente, certificado e consentimento. Se a API retorna 401 ou 403, valide issuer, audience, escopo, binding e recurso."
  },
  {
    "kind": "paragraph",
    "text": "Erros de mTLS exigem inspeção de cadeia, validade, hostname, certificado apresentado, truststore e associação da identidade. Timeouts podem estar em DNS, TCP, TLS, servidor de autorização, gateway, adaptador ou legado. O interaction ID deve acompanhar a investigação entre organizações, preservando dados mínimos e evitando envio de tokens completos em chamados."
  },
  {
    "kind": "paragraph",
    "text": "Em pagamentos, diferencie erro de criação, autorização, execução e consulta de status. Um timeout do cliente não prova falha financeira. Antes de repetir, consulte o estado usando os identificadores do contrato. O runbook deve dizer quando retry é permitido, quando reconciliação é obrigatória e quando intervenção manual é necessária."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - O diagnóstico começa pela etapa, não pelo produto apontado pelo usuário.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências prioritárias"
    ],
    "rows": [
      [
        "Instituição não aparece",
        "Diretório, cadastro, cache ou ambiente.",
        "Registro do participante e discovery."
      ],
      [
        "Falha no redirect",
        "URI divergente, state, app link ou sessão.",
        "Authorization request e logs do canal."
      ],
      [
        "invalidclient",
        "Certificado, private_key_jwt ou cadastro.",
        "Metadados e identidade do software."
      ],
      [
        "401 na API",
        "Token inválido, audience ou mTLS binding.",
        "Claims, certificado e logs do gateway."
      ],
      [
        "Pagamento duplicado",
        "Idempotência ausente ou retry incorreto.",
        "Chave, payload e histórico de estados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.17 Estudos de caso e laboratórios",
    "id": "35-17-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - Agregador financeiro: uma instituição receptora obtém consentimento para contas e cartões mantidos em dois bancos. O backend normaliza os dados e apresenta visão consolidada. O risco principal não é apenas disponibilidade; é preservar significado, moeda, datas, titularidade e finalidade ao combinar fontes diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Iniciação de Pix: o cliente inicia a jornada em um aplicativo terceiro, autentica-se no banco detentor e confirma o pagamento. O iniciador recebe status pendente após timeout. A estratégia correta é consultar o recurso pelo identificador e reconciliar o estado, não criar uma segunda ordem sem verificar idempotência."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Rotação de certificado: o novo certificado foi publicado, mas uma instância do gateway manteve truststore antigo. Parte das chamadas falha de modo intermitente. A investigação combina fingerprint, nó atendente, horário, cache e rollout da configuração."
  },
  {
    "kind": "paragraph",
    "text": "Laboratórios sugeridos 1) Desenhe uma jornada com consentimento, autorização e API separadas. 2) Valide um JWT conceitual com issuer, audience, expiração e confirmação de certificado. 3) Simule uma falha de mTLS e registre evidências por camada. 4) Modele estados e idempotência de uma iniciação de pagamento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Open Finance Brasil é uma infraestrutura regulada e distribuída que combina escolha do cliente, identidade institucional, consentimento, autenticação, tokens e APIs padronizadas. Open Banking representa a origem e parte do escopo; Open Finance amplia a visão para outros produtos e serviços financeiros."
  },
  {
    "kind": "paragraph",
    "text": "A segurança depende de camadas: Diretório, certificados, mTLS, OAuth 2.0, OpenID Connect, FAPI-BR, contratos, monitoramento e controles internos. Consentimento não substitui autenticação, e token não substitui autorização de negócio. A instituição deve validar todas as relações até o recurso solicitado."
  },
  {
    "kind": "paragraph",
    "text": "Operar o ecossistema exige versionamento, certificação, observabilidade, alta disponibilidade, privacidade e resposta coordenada a incidentes. Como normas e manuais continuam evoluindo, arquitetos e operadores precisam tratar documentação oficial e agenda regulatória como dependências de produção."
  },
  {
    "kind": "paragraph",
    "text": "Próximo passo do curso O próximo capítulo aprofunda a LGPD aplicada às APIs, conectando fundamentos jurídicos e técnicos de finalidade, minimização, direitos do titular, segurança, retenção e governança de dados."
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
      "Papéis de receptor, transmissor, iniciador e detentor estão explicitamente identificados.",
      "Consentimento, autenticação, token e chamada de API possuem correlação e ciclo de vida próprios.",
      "Diretório, certificados, endpoints e software statements estão atualizados.",
      "Issuer, audience, escopos, expiração e binding de token são validados.",
      "Logs não expõem tokens, credenciais ou dados financeiros completos.",
      "Idempotência e reconciliação estão definidas para operações de pagamento.",
      "Versionamento e períodos de convivência são tratados no gateway e no backend.",
      "Runbooks cobrem DNS, TLS, mTLS, OAuth, consentimento, API e legado.",
      "Testes de certificação e regressão fazem parte do pipeline.",
      "Normas, manuais e agenda evolutiva são monitorados por responsáveis definidos."
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
      "Diferencie Open Banking e Open Finance no contexto brasileiro.",
      "Explique por que consentimento e autenticação são objetos diferentes.",
      "Descreva o fluxo entre instituição receptora, transmissora e cliente.",
      "Explique o papel do Diretório na confiança entre participantes.",
      "Relacione FAPI-BR, OAuth 2.0, OIDC e mTLS.",
      "Explique por que ID Token não deve ser usado como access token genérico.",
      "Modele uma estratégia de idempotência para iniciação de pagamento.",
      "Liste evidências necessárias para diagnosticar uma falha 401.",
      "Proponha métricas e logs para uma API de dados de contas.",
      "Descreva os impactos de uma rotação de certificado incompleta."
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
        "Consentimento",
        "Autorização explícita do cliente para finalidade, escopo e duração determinados."
      ],
      [
        "Detentor de conta",
        "Instituição que mantém a conta e executa a transação autorizada."
      ],
      [
        "Diretório",
        "Infraestrutura de cadastro e descoberta de participantes, software e certificados."
      ],
      [
        "FAPI-BR",
        "Perfil brasileiro de segurança para APIs financeiras baseado no ecossistema FAPI."
      ],
      [
        "Iniciador de pagamento",
        "Participante que inicia a jornada sem deter os fundos."
      ],
      [
        "Interaction ID",
        "Identificador de correlação usado nas interações de API."
      ],
      [
        "Open Banking",
        "Abertura regulada de dados e serviços bancários."
      ],
      [
        "Open Finance",
        "Ampliação do compartilhamento para um ecossistema financeiro mais abrangente."
      ],
      [
        "Receptor de dados",
        "Participante que recebe dados conforme autorização do cliente."
      ],
      [
        "Transmissor de dados",
        "Participante que disponibiliza dados que mantém."
      ],
      [
        "mTLS",
        "TLS mútuo, com autenticação por certificado nos dois lados."
      ],
      [
        "Sender-constrained token",
        "Token cuja utilização depende de prova da chave associada."
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
      "Banco Central do Brasil. Open Finance - visão geral, segurança, clientes e participantes.",
      "Resolução Conjunta nº 1, de 4 de maio de 2020, e alterações posteriores.",
      "Banco Central do Brasil. Manual de APIs do Open Finance - versão vigente.",
      "Banco Central do Brasil. Manual de Segurança do Open Finance - versão vigente.",
      "Banco Central do Brasil. Manual de Experiência do Cliente - versão vigente.",
      "Banco Central do Brasil. Manual de Monitoramento do Open Finance - versão vigente.",
      "Open Finance Brasil. Área do Desenvolvedor e Catálogo de APIs.",
      "Open Finance Brasil. Financial-grade API Security Profile - FAPI-BR.",
      "IETF e OpenID Foundation. OAuth 2.0, OpenID Connect, PKCE, PAR, JAR, JARM e FAPI.",
      "Lei nº 13.709/2018 - Lei Geral de Proteção de Dados Pessoais."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de atualização Este capítulo apresenta princípios e arquitetura com base em fontes oficiais consultadas em julho de 2026. Antes de implementar, confirme sempre a versão vigente das normas, manuais, APIs, perfis de segurança e períodos de convivência publicados pelo Banco Central e pela Estrutura de Governança do Open Finance."
  }
];
