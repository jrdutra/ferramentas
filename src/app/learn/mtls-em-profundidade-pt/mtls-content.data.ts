import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MTLS_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Autenticação mútua no caminho corporativo de uma API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/overview.svg",
    "alt": "Visão geral da autenticação mútua no caminho corporativo de uma API",
    "caption": "Visão geral - da apresentação do certificado à autorização do consumidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Nos capítulos anteriores, certificados, PKI e confiança X.509 foram apresentados como fundamentos da proteção de APIs. Este capítulo aprofunda o mutual TLS, ou mTLS, mecanismo no qual cliente e servidor se autenticam durante o handshake TLS. Além de validar o certificado do servidor, o cliente apresenta sua própria credencial e demonstra que controla a chave privada correspondente."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes corporativos, mTLS é usado em integrações máquina a máquina, exposição de APIs para parceiros, comunicação entre microsserviços, service meshes, acesso administrativo e fluxos OAuth com tokens vinculados a certificado. Entretanto, habilitar a exigência de certificado do cliente é apenas o início. A segurança real depende de emissão, cadeia de confiança, validação de extensões, mapeamento de identidade, autorização, rotação, revogação e observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Para profissionais que trabalham com API Gateways, é essencial compreender em qual ponto a sessão TLS termina. Um gateway pode autenticar o consumidor e criar uma conexão diferente com o backend; um balanceador pode terminar TLS antes do gateway; ou uma malha pode estabelecer novas identidades de workload no tráfego interno. Cada salto possui certificados, truststores, timeouts e responsabilidades independentes."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo não é apenas reconhecer mensagens do handshake, mas construir um modelo operacional completo. Ao final, o leitor deverá conseguir projetar políticas de confiança, separar autenticação de autorização, planejar o ciclo de vida das credenciais e investigar falhas como unknown_ca, bad_certificate, certificate_expired, ausência de certificado e divergência de identidade."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Acompanhe as explicações com os comandos e laboratórios apresentados. Sempre registre: quem inicia a conexão, quem solicita o certificado, qual cadeia foi apresentada, qual truststore é usado, qual identidade foi extraída e qual política de autorização decidiu o acesso."
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
      "Diferenciar TLS unilateral, autenticação mútua e autorização de aplicação.",
      "Explicar CertificateRequest, Certificate, CertificateVerify e Finished no TLS 1.3.",
      "Validar cadeia, período de validade, Key Usage, Extended Key Usage, SAN, algoritmos e revogação.",
      "Projetar truststores e trust bundles segmentados por domínio de integração.",
      "Mapear certificados para identidades canônicas de consumidores, parceiros e workloads.",
      "Aplicar mTLS em API Gateways, service meshes e comunicação com backends.",
      "Compreender autenticação OAuth por mTLS e tokens vinculados a certificado.",
      "Planejar emissão, armazenamento, rotação, revogação e resposta a comprometimento.",
      "Usar OpenSSL, curl, Java e ferramentas de captura para troubleshooting.",
      "Definir métricas, logs, alertas e controles de hardening para operação em escala."
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
      "9.1 Do TLS unilateral ao mTLS",
      "9.2 Handshake mTLS em TLS 1.3",
      "9.3 Validação completa do certificado do cliente",
      "9.4 Da autenticação à autorização",
      "9.5 mTLS em API Gateways",
      "9.6 mTLS entre microsserviços e service mesh",
      "9.7 OAuth 2.0 com mutual TLS",
      "9.8 Ciclo de vida de certificados e chaves",
      "9.9 Padrões arquiteturais corporativos",
      "9.10 Configuração prática e ferramentas de diagnóstico",
      "9.11 Falhas frequentes e método de troubleshooting",
      "9.12 Observabilidade, auditoria e métricas",
      "9.13 Hardening e decisões de segurança",
      "9.14 Estudo de caso: integração de pagamentos B2B",
      "9.15 Resumo técnico e revisão",
      "Referências técnicas, exercícios e checklist operacional"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.1 Do TLS unilateral ao mTLS",
    "id": "9-1-do-tls-unilateral-ao-mtls"
  },
  {
    "kind": "paragraph",
    "text": "No uso mais comum do HTTPS, a autenticação ocorre apenas no sentido servidor para cliente. O servidor apresenta seu certificado, o cliente constrói e valida uma cadeia de confiança, verifica o nome esperado e participa da negociação das chaves de sessão. Esse processo protege confidencialidade e integridade do tráfego e reduz o risco de o cliente conversar com um servidor impostor."
  },
  {
    "kind": "paragraph",
    "text": "O cliente, porém, normalmente não apresenta identidade criptográfica durante o handshake. Sua autenticação acontece posteriormente, dentro do protocolo de aplicação, por meio de senha, sessão, API key, token OAuth, assinatura de mensagem ou outro mecanismo. O mTLS adiciona uma segunda autenticação ao próprio estabelecimento do canal: o servidor solicita um certificado do cliente, valida esse certificado e exige uma prova de posse da chave privada correspondente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "O que é autenticado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-01.svg",
    "alt": "Comparação entre autenticação TLS unilateral e autenticação mutual TLS",
    "caption": "Figura 1 - Comparação conceitual entre TLS unilateral e mutual TLS."
  },
  {
    "kind": "paragraph",
    "text": "Um certificado de cliente não autentica uma \"requisição HTTP\" isoladamente; ele autentica a entidade que participa da sessão TLS. Em uma conexão persistente, várias requisições podem compartilhar o mesmo canal autenticado. Isso melhora eficiência, mas exige cuidado ao relacionar identidade TLS, pooling de conexões, multiplexação HTTP/2, proxies intermediários e contexto de autorização da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "A prova criptográfica ocorre porque a parte autenticada assina dados derivados do transcript do handshake com sua chave privada. A chave privada não é enviada pela rede. O certificado transporta a chave pública e atributos assinados por uma autoridade certificadora, enquanto a assinatura do handshake demonstra que a entidade que apresentou o certificado controla a chave privada correspondente."
  },
  {
    "kind": "paragraph",
    "text": "O TLS 1.3 define contextos distintos para a assinatura de cliente e de servidor na mensagem CertificateVerify. [1]"
  },
  {
    "kind": "subhead",
    "text": "Conceito-chave"
  },
  {
    "kind": "paragraph",
    "text": "mTLS não é apenas “HTTPS com dois certificados”. É uma composição de três garantias: cadeia de confiança, prova de posse da chave privada e vinculação da identidade à sessão TLS."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "O que o mTLS não resolve sozinho"
  },
  {
    "kind": "paragraph",
    "text": "Mesmo quando o certificado é válido, ainda é necessário decidir o que aquela identidade pode fazer. Autenticação responde “quem participa da conexão”; autorização responde “quais recursos e operações essa identidade pode acessar”. Permitir qualquer certificado emitido por uma CA corporativa pode ampliar excessivamente a superfície de acesso caso a mesma hierarquia emita certificados para centenas de sistemas com finalidades diferentes."
  },
  {
    "kind": "paragraph",
    "text": "O mTLS também não substitui validação de entrada, limitação de taxa, segregação de funções, proteção contra abuso de lógica, auditoria ou segurança do código. Ele pode reduzir riscos de credenciais reutilizáveis e de clientes não autorizados, mas um consumidor autenticado continua capaz de enviar cargas malformadas, explorar permissões excessivas ou utilizar a API fora do propósito previsto."
  },
  {
    "kind": "subhead",
    "text": "Atenção"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trate “certificado válido” como sinônimo de “acesso total”. O resultado da validação deve alimentar uma política explícita de autorização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.2 Handshake mTLS em TLS 1.3",
    "id": "9-2-handshake-mtls-em-tls-1-3"
  },
  {
    "kind": "paragraph",
    "text": "O handshake TLS 1.3 negocia versão, algoritmos, parâmetros de troca de chaves e material criptográfico para proteger a sessão. Quando o servidor requer autenticação do cliente, ele envia CertificateRequest. Essa mensagem informa que um certificado de cliente é esperado e pode indicar autoridades certificadoras e algoritmos de assinatura aceitos."
  },
  {
    "kind": "paragraph",
    "text": "Em seguida, o servidor envia sua própria cadeia, sua prova de posse e a mensagem Finished. O cliente responde com sua cadeia de certificados, a mensagem CertificateVerify e sua mensagem Finished. A assinatura em CertificateVerify é calculada sobre o transcript do handshake, com um contexto específico."
  },
  {
    "kind": "paragraph",
    "text": "Isso impede que uma assinatura feita para outro propósito seja reutilizada como prova válida dentro do TLS. A mensagem Finished confirma integridade e posse dos segredos derivados da negociação. [1]"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "CertificateRequest e seleção do certificado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-02.svg",
    "alt": "Sequência simplificada do handshake com autenticação mútua em TLS 1.3",
    "caption": "Figura 2 - Sequência simplificada de autenticação mútua em TLS 1.3."
  },
  {
    "kind": "paragraph",
    "text": "Um cliente pode possuir vários certificados. A seleção correta depende das informações enviadas pelo servidor, dos algoritmos compatíveis, do emissor aceito, do propósito do certificado e da política local do cliente. Em integrações automatizadas, essa decisão deve ser determinística."
  },
  {
    "kind": "paragraph",
    "text": "Uma configuração ambígua pode selecionar um certificado errado ou falhar após uma atualização de truststore. A lista de autoridades aceitáveis funciona como orientação, mas não deve ser confundida com autorização final. O servidor ainda precisa validar a cadeia apresentada, as extensões e as regras da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes com múltiplas PKIs, é comum separar trust bundles por domínio de integração para evitar que uma CA confiável para um contexto seja aceita indevidamente em outro."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "CertificateVerify: a prova de posse"
  },
  {
    "kind": "paragraph",
    "text": "A presença de um certificado por si só não prova que o participante controla a chave privada. Qualquer pessoa pode copiar um certificado público. A mensagem CertificateVerify contém uma assinatura produzida com a chave privada correspondente à chave pública do certificado."
  },
  {
    "kind": "paragraph",
    "text": "O outro lado verifica a assinatura e confirma que o apresentador detém a chave necessária para participar daquela sessão. Essa distinção é importante durante incidentes. O vazamento de um certificado público não compromete a identidade; o vazamento da chave privada, sim."
  },
  {
    "kind": "paragraph",
    "text": "Por isso, a proteção do arquivo de chave, do keystore, do segredo no cluster, do HSM ou do mecanismo de assinatura remota é central."
  },
  {
    "kind": "paragraph",
    "text": "Permissões de arquivo, controle de acesso, não exportabilidade, rotação e auditoria devem ser tratados como controles de segurança primários."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TLS 1.2 e TLS 1.3"
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Comparação operacional entre TLS 1.2 e TLS 1.3.",
    "headers": [
      "Aspecto",
      "TLS 1.2",
      "TLS 1.3"
    ],
    "rows": [
      [
        "Negociação",
        "Mais opções históricas e combinações legadas.",
        "Conjunto simplificado e remoção de construções inseguras antigas."
      ],
      [
        "Autenticação do cliente",
        "CertificateRequest, Certificate e CertificateVerify conforme suíte e fluxo.",
        "Autenticação por certificado com transcript e contexto definidos para CertificateVerify."
      ],
      [
        "Latência",
        "Handshake completo normalmente exige mais trocas.",
        "Handshake principal reduz viagens de ida e volta."
      ],
      [
        "Algoritmos",
        "Permite combinações que precisam de restrição explícita.",
        "Remove várias opções obsoletas, mas ainda exige política corporativa."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Decisão arquitetural"
  },
  {
    "kind": "paragraph",
    "text": "Suportar TLS 1.2 por compatibilidade não significa habilitar qualquer algoritmo legado. A política deve restringir versões, cifras, assinaturas e curvas conforme o risco e os requisitos corporativos. O NIST SP 800-52 Rev. 2 fornece diretrizes de seleção e configuração de TLS. [4]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.3 Validação completa do certificado do cliente",
    "id": "9-3-validacao-completa-do-certificado-do-cliente"
  },
  {
    "kind": "paragraph",
    "text": "A validação não deve se limitar a conferir se o certificado está dentro da data de validade. O servidor precisa construir uma cadeia até uma âncora de confiança autorizada, verificar assinaturas, restrições de CA, extensões críticas, políticas aplicáveis e propósito de uso. O perfil de certificados X.509 e o algoritmo de validação de caminho são definidos no RFC 5280, posteriormente atualizado e esclarecido por outros documentos. [2][5] Em uma API corporativa, a regra de aceitação costuma ser mais restritiva que a validação X.509 genérica."
  },
  {
    "kind": "paragraph",
    "text": "Um certificado pode ser criptograficamente válido, mas pertencer a uma cadeia que não foi aprovada para aquele produto, possuir SAN fora do padrão, utilizar finalidade incompatível, ter sido emitido para um ambiente diferente ou representar uma aplicação desativada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Verificações essenciais"
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Verificações essenciais na validação do certificado de cliente.",
    "headers": [
      "Verificação",
      "O que deve ser avaliado",
      "Risco quando ignorada"
    ],
    "rows": [
      [
        "Cadeia de confiança",
        "Assinaturas até uma CA raiz ou intermediária explicitamente confiável.",
        "Aceitação de certificados emitidos por hierarquia não autorizada."
      ],
      [
        "Validade temporal",
        "notBefore e notAfter, relógio confiável e margem controlada.",
        "Uso de certificado expirado ou ainda não válido."
      ],
      [
        "Basic Constraints",
        "Intermediárias marcadas como CA e profundidade respeitada.",
        "Construção de cadeia inválida ou uso indevido de certificado final como CA."
      ],
      [
        "Key Usage / EKU",
        "Uso de chave e clientAuth compatíveis com o propósito.",
        "Certificado emitido para outra finalidade usado como cliente TLS."
      ],
      [
        "SAN / identidade",
        "Formato, namespace e normalização aprovados.",
        "Mapeamento ambíguo ou falsos positivos."
      ],
      [
        "Revogação",
        "CRL, OCSP ou estratégia equivalente.",
        "Continuidade de acesso após comprometimento."
      ],
      [
        "Algoritmos",
        "Assinaturas, curvas e tamanhos permitidos.",
        "Dependência de algoritmos fracos ou obsoletos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore não é uma coleção indiscriminada de CAs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-03.svg",
    "alt": "Etapas de validação e aceitação do certificado do cliente",
    "caption": "Figura 3 - Etapas de validação e aceitação do certificado de cliente."
  },
  {
    "kind": "paragraph",
    "text": "O truststore define quais âncoras podem iniciar uma cadeia aceita. Em ambientes corporativos, reutilizar o truststore global do sistema operacional pode ser inadequado para mTLS de APIs, pois ele geralmente contém autoridades públicas destinadas à autenticação de servidores da Internet. Para clientes corporativos, é preferível manter conjuntos de confiança dedicados ao domínio de integração."
  },
  {
    "kind": "paragraph",
    "text": "Também é recomendável separar confiança por contexto: parceiros externos, aplicações internas, workloads de uma malha e acessos administrativos podem possuir raízes e políticas distintas. Essa segmentação reduz o impacto de uma emissão indevida e facilita revogação de uma hierarquia sem interromper integrações não relacionadas."
  },
  {
    "kind": "subhead",
    "text": "Boa prática"
  },
  {
    "kind": "paragraph",
    "text": "Trate cada trust bundle como uma política de segurança versionada. Registre proprietário, finalidade, CAs incluídas, ambientes, consumidores afetados, data de revisão e processo de mudança."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidade em Subject e SAN"
  },
  {
    "kind": "paragraph",
    "text": "Historicamente, muitas implementações extraíam a identidade do Common Name no Subject. Em arquiteturas modernas, o Subject Alternative Name é mais apropriado para identidades estruturadas. O SAN pode carregar DNS, URI, endereço IP, e-mail ou outros nomes."
  },
  {
    "kind": "paragraph",
    "text": "Para workloads, URIs com namespace corporativo ou identidades no estilo SPIFFE podem reduzir ambiguidades e facilitar políticas automatizadas. O ponto central não é apenas escolher um campo, mas definir um contrato de identidade. O formato precisa ser único, estável, não reutilizável e ligado ao ciclo de vida da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Nomes baseados apenas em hostname podem ser inadequados quando o workload é efêmero; nomes humanos podem mudar; identificadores de projeto podem ser reutilizados. Uma boa identidade técnica permanece rastreável ao proprietário e ao inventário corporativo."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de namespace"
  },
  {
    "kind": "paragraph",
    "text": "Exemplo de SAN URI para uma identidade de workload:"
  },
  {
    "kind": "code",
    "text": "URI: spiffe://corp.exemplo/financeiro/pagamentos/worker-a\nDomínio de confiança: corp.exemplo\nÁrea: financeiro\nProduto: pagamentos\nWorkload: worker-a"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.4 Da autenticação à autorização",
    "id": "9-4-da-autenticacao-a-autorizacao"
  },
  {
    "kind": "paragraph",
    "text": "Depois de validar o certificado, o componente de borda deve extrair uma identidade canônica. Essa identidade não deve ser o certificado inteiro nem uma concatenação instável de campos. Em geral, escolhe-se um atributo primário, como SAN URI, SAN DNS ou identificador registrado, e aplica-se normalização estrita."
  },
  {
    "kind": "paragraph",
    "text": "O resultado é associado a um cadastro de consumidor ou workload. A autorização pode então considerar identidade, rota, método HTTP, ambiente, escopo, contrato, horário, origem de rede e contexto adicional. Em uma API Gateway, o certificado pode selecionar um plano de acesso, uma lista de APIs, quotas e políticas."
  },
  {
    "kind": "paragraph",
    "text": "Em uma malha de serviços, a identidade do workload pode ser usada em regras service-to-service, por exemplo: apenas o serviço de faturamento pode invocar a operação de liquidação."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estratégias de mapeamento"
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Estratégias de mapeamento de identidade X.509.",
    "headers": [
      "Estratégia",
      "Vantagem",
      "Limitação"
    ],
    "rows": [
      [
        "Subject DN completo",
        "Disponível em praticamente todos os certificados.",
        "Pode variar por ordem, escaping e atributos opcionais."
      ],
      [
        "Common Name",
        "Simples e amplamente conhecido.",
        "Pode ser ambíguo e não é o melhor campo para identidade moderna."
      ],
      [
        "SAN DNS",
        "Adequado para identidades associadas a nomes DNS.",
        "Pode confundir identidade do workload com localização."
      ],
      [
        "SAN URI",
        "Permite namespace estruturado e semântico.",
        "Exige governança e suporte consistente."
      ],
      [
        "Thumbprint",
        "Identifica uma emissão específica.",
        "Muda em toda rotação."
      ],
      [
        "SPKI hash",
        "Pode sobreviver à reemissão com a mesma chave.",
        "Pode desencorajar rotação de chave."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidade estável versus instância do certificado"
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação possui uma identidade lógica; um certificado é uma credencial temporária dessa identidade. A autorização deve preferencialmente se apoiar na identidade lógica, enquanto o inventário registra número de série, emissor, thumbprint, chave e validade da emissão atual. Isso permite rotacionar certificados sem reconfigurar todas as permissões."
  },
  {
    "kind": "paragraph",
    "text": "Há casos em que a política exige pinning de uma emissão ou chave específica. Essa técnica pode aumentar controle, mas amplia custo operacional. Se a regra estiver vinculada ao thumbprint, toda rotação exige atualização coordenada."
  },
  {
    "kind": "paragraph",
    "text": "Se estiver vinculada à chave, a rotação criptográfica deixa de ser transparente. O uso deve ser consciente e reservado a cenários em que a confiança na CA e nos atributos não é suficiente."
  },
  {
    "kind": "subhead",
    "text": "Regra de projeto"
  },
  {
    "kind": "paragraph",
    "text": "Separe três objetos: identidade da aplicação, credencial X.509 atual e política de autorização. Misturar esses conceitos cria acoplamento e torna a rotação mais arriscada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Propagação da identidade após terminação TLS"
  },
  {
    "kind": "paragraph",
    "text": "Quando o gateway termina a sessão mTLS, o backend não recebe diretamente o certificado original no handshake. Se a identidade precisar chegar ao serviço, o gateway deve propagá-la de forma confiável. Inserir um header simples, como X-Client-Cert ou X-Client-Id, só é seguro quando o backend aceita tráfego exclusivamente do gateway e o canal interno impede injeção ou alteração por terceiros."
  },
  {
    "kind": "paragraph",
    "text": "Uma abordagem robusta é remover qualquer header vindo do cliente, gerar um novo atributo a partir do certificado validado, assinar ou proteger o contexto e estabelecer mTLS entre gateway e backend. Em arquiteturas mais avançadas, a identidade pode ser representada em um token interno de curta duração emitido por um componente confiável. O serviço precisa distinguir identidade do cliente original, identidade do gateway e contexto de delegação."
  },
  {
    "kind": "subhead",
    "text": "Pipeline recomendado"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Remover headers de identidade recebidos externamente.",
      "Validar cadeia, validade, EKU, SAN e revogação.",
      "Resolver SAN URI -> consumer_id corporativo.",
      "Aplicar autorização e quota.",
      "Criar contexto interno assinado e de curta duração.",
      "Encaminhar ao backend por novo canal mTLS."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.5 mTLS em API Gateways",
    "id": "9-5-mtls-em-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é um ponto natural para aplicar mTLS em integrações externas porque concentra listeners, certificados de servidor, truststores de clientes, políticas, logs e rate limiting. Ele pode recusar a conexão antes de processar HTTP, reduzindo exposição das APIs a consumidores sem credencial confiável. Também centraliza regras de onboarding e segregação por domínio ou produto."
  },
  {
    "kind": "paragraph",
    "text": "Essa centralização não elimina a necessidade de desenho cuidadoso. É preciso decidir se o gateway exige certificado em todo o listener, em hostnames específicos ou em rotas específicas; como tratar clientes que não usam mTLS; como selecionar truststores; como publicar a cadeia correta; como registrar falhas de handshake; e como propagar a identidade validada aos serviços internos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Listener dedicado ou compartilhado"
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Alternativas de listener e aplicação de mTLS.",
    "headers": [
      "Modelo",
      "Descrição",
      "Quando usar"
    ],
    "rows": [
      [
        "Listener dedicado",
        "Hostname e porta exclusivos exigem certificado de cliente para toda conexão.",
        "Integrações B2B críticas, segregação forte e operação previsível."
      ],
      [
        "mTLS opcional",
        "O servidor solicita certificado, mas também aceita clientes sem credencial.",
        "Migração controlada ou rotas mistas, com autorização rigorosa."
      ],
      [
        "Política após terminação",
        "Um proxy frontal coleta o certificado e repassa contexto protegido ao gateway.",
        "Quando o terminador TLS está fora do gateway e existe confiança operacional forte."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Terminação, recriptografia e passthrough"
  },
  {
    "kind": "paragraph",
    "text": "Na terminação TLS, o gateway descriptografa o tráfego, valida o cliente e cria uma nova conexão até o backend. Isso permite inspecionar HTTP e aplicar políticas de API. No passthrough, o gateway de camada 4 encaminha a conexão sem encerrar TLS; o backend realiza a autenticação."
  },
  {
    "kind": "paragraph",
    "text": "O passthrough preserva autenticação ponta a ponta, mas limita recursos de camada 7 no intermediário. A recriptografia combina terminação externa com novo TLS ou mTLS interno. Esse padrão é comum porque permite controle de API no gateway e protege o trecho até o serviço."
  },
  {
    "kind": "paragraph",
    "text": "É importante não dizer que existe \"mTLS ponta a ponta\" quando há duas sessões distintas. Existem duas relações de confiança: cliente-gateway e gateway-backend. A identidade do cliente original precisa ser propagada separadamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.6 mTLS entre microsserviços e service mesh",
    "id": "9-6-mtls-entre-microsservicos-e-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas de microsserviços, o mTLS pode autenticar workloads e proteger tráfego leste-oeste. Uma service mesh normalmente utiliza proxies sidecar ou nós de dataplane para estabelecer conexões mTLS automaticamente. O plano de controle distribui identidades, certificados de curta duração, trust bundles e políticas."
  },
  {
    "kind": "paragraph",
    "text": "Isso reduz a necessidade de cada aplicação implementar diretamente toda a lógica TLS. A automação, porém, não elimina governança. A organização precisa definir domínio de confiança, identidade de cada workload, processo de atestação, emissão, rotação, política de autorização e limites entre clusters, ambientes e unidades de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Uma malha configurada em modo permissivo pode aceitar tráfego plaintext e mTLS simultaneamente, o que pode manter caminhos de bypass durante migrações."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identidade de workload"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-06.svg",
    "alt": "Identidades de workload protegidas por mutual TLS em uma service mesh",
    "caption": "Figura 6 - Identidades de workload em uma service mesh."
  },
  {
    "kind": "paragraph",
    "text": "Uma identidade de workload deve representar o software em execução, não apenas o nó ou endereço IP. Containers e pods são efêmeros; IPs mudam e podem ser reutilizados. Ao associar o certificado à conta de serviço, namespace, cluster e workload, a política acompanha a aplicação em vez da topologia momentânea da rede."
  },
  {
    "kind": "paragraph",
    "text": "O processo de emissão precisa confiar em alguma forma de atestação: identidade da plataforma, token de conta de serviço, metadados de instância, TPM, nó registrado ou outra evidência. Se qualquer processo puder solicitar um certificado em nome de outro workload, o mTLS apenas criptografará uma identidade falsa. Portanto, a segurança do emissor e do bootstrap é tão importante quanto o handshake."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Modos permissivo e estrito"
  },
  {
    "kind": "table",
    "caption": "Modos permissivo e estrito em uma service mesh.",
    "headers": [
      "Modo",
      "Comportamento",
      "Risco operacional"
    ],
    "rows": [
      [
        "Permissivo",
        "Aceita conexões mTLS e plaintext.",
        "Facilita migração, mas pode manter bypass silencioso."
      ],
      [
        "Estrito",
        "Exige mTLS para o tráfego coberto.",
        "Mais seguro; requer inventário e compatibilidade completos."
      ],
      [
        "Desabilitado",
        "Não usa mTLS naquele escopo.",
        "Adequado apenas quando outro controle oferece garantia equivalente e documentada."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Uma migração segura pode começar com telemetria, identificar dependências, habilitar emissão automática, aplicar mTLS permissivo por curto período e evoluir para modo estrito com data definida."
  },
  {
    "kind": "paragraph",
    "text": "Deixar o ambiente indefinidamente permissivo cria uma falsa sensação de zero trust. A meta deve ser mensurável: porcentagem de conexões autenticadas, workloads incompatíveis e exceções com prazo. Também é necessário validar egress."
  },
  {
    "kind": "paragraph",
    "text": "Um serviço autenticado dentro da malha pode iniciar conexões para destinos externos. Políticas de saída, gateways de egress e identidade do chamador ajudam a evitar exfiltração e a tornar auditoria mais completa."
  },
  {
    "kind": "subhead",
    "text": "Atenção"
  },
  {
    "kind": "paragraph",
    "text": "Criptografia automática sem autorização workload-to-workload produz uma rede protegida, mas ainda excessivamente aberta. mTLS deve ser combinado com políticas explícitas de quem pode chamar quem."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.7 OAuth 2.0 com mutual TLS",
    "id": "9-7-oauth-2-0-com-mutual-tls"
  },
  {
    "kind": "paragraph",
    "text": "O OAuth 2.0 normalmente autentica clientes no servidor de autorização e emite tokens para acesso a recursos. O RFC 8705 define dois usos principais do mTLS: autenticação do cliente no endpoint de token e tokens de acesso vinculados a certificado. A autenticação pode usar certificados emitidos por PKI ou certificados autoassinados previamente registrados, conforme o modelo adotado. [3] Na autenticação do cliente, o servidor de autorização valida a conexão mTLS e associa o certificado ao client_id."
  },
  {
    "kind": "paragraph",
    "text": "Isso substitui ou complementa segredos compartilhados. Como a chave privada não é transmitida, o risco de reutilização de um segredo estático diminui. Ainda assim, a chave privada precisa ser protegida e o registro do certificado deve suportar rotação."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Tokens certificate-bound"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-07.svg",
    "alt": "Token OAuth vinculado ao certificado apresentado na conexão mTLS",
    "caption": "Figura 7 - Token OAuth vinculado ao certificado mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Um bearer token tradicional pode ser usado por quem o possuir. Se for exfiltrado, outro processo pode apresentá-lo ao resource server. Um token vinculado ao certificado inclui ou referencia o thumbprint da chave/certificado do cliente."
  },
  {
    "kind": "paragraph",
    "text": "O resource server exige mTLS e verifica se a credencial usada na conexão corresponde à vinculação do token. Assim, token e chave privada precisam estar presentes juntos. Essa técnica reduz o valor de um token roubado isoladamente, mas introduz requisitos de interoperabilidade."
  },
  {
    "kind": "paragraph",
    "text": "O servidor de autorização, o gateway e o resource server precisam concordar sobre a informação de confirmação, o certificado apresentado e a forma de comparação. Em arquiteturas com proxies, a terminação mTLS deve preservar evidência confiável para o componente que valida a vinculação."
  },
  {
    "kind": "subhead",
    "text": "Conceito-chave"
  },
  {
    "kind": "paragraph",
    "text": "Token vinculado a certificado não elimina expiração, audiência, escopo e validação de emissor. Ele adiciona prova de posse ao uso do token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Fluxo resumido"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "O cliente estabelece mTLS com o servidor de autorização e solicita um token.",
      "O servidor de autorização autentica o cliente e vincula o token à chave/certificado apresentado.",
      "O cliente estabelece mTLS com o resource server ou gateway e envia o token.",
      "O resource server valida assinatura, emissor, audiência, expiração, escopos e confirmação do certificado."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "A requisição só é aceita quando token e prova de posse correspondem."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "PKI versus certificado autoassinado registrado"
  },
  {
    "kind": "table",
    "caption": "PKI versus certificado autoassinado registrado.",
    "headers": [
      "Modelo",
      "Como a confiança é estabelecida",
      "Implicação"
    ],
    "rows": [
      [
        "PKI",
        "Cadeia até CA confiável e associação por atributos do certificado.",
        "Escala com governança de emissão; exige PKI bem administrada."
      ],
      [
        "Autoassinado registrado",
        "Certificado ou chave pública é registrado diretamente para o cliente OAuth.",
        "Reduz dependência de CA, mas exige atualização coordenada em cada rotação."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "O registro direto pode ser adequado para poucos clientes de alta criticidade, mas o custo cresce com o número de integrações e ambientes. A decisão deve considerar escala, automação, segregação e capacidade de revogação."
  },
  {
    "kind": "paragraph",
    "text": "Quando o gateway valida o token e termina mTLS, ele deve verificar a vinculação antes de encaminhar. Repassar apenas o bearer token ao backend sem contexto pode ser aceitável se o gateway for o enforcement point confiável e o canal interno estiver protegido. Caso o backend também valide a prova de posse, precisa receber evidência autenticada do certificado ou participar diretamente do mTLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.8 Ciclo de vida de certificados e chaves",
    "id": "9-8-ciclo-de-vida-de-certificados-e-chaves"
  },
  {
    "kind": "paragraph",
    "text": "A maior parte dos problemas de mTLS em produção é operacional: certificado expirado, cadeia incompleta, relógio incorreto, truststore desatualizado, rotação sem sobreposição, chave inacessível ou revogação que não funciona. O desenho deve assumir que certificados vencem e serão substituídos. Renovação não é exceção; é parte normal do sistema."
  },
  {
    "kind": "paragraph",
    "text": "Um programa maduro mantém inventário de certificados, proprietários, aplicações, ambientes, emissores, chaves, datas de validade, dependências e políticas. Alertas devem começar com antecedência suficiente para diagnóstico e mudança. A automação de emissão e distribuição reduz falhas manuais, mas precisa incluir autenticação forte do solicitante e trilha de auditoria."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Emissão e bootstrap"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-08.svg",
    "alt": "Ciclo de vida operacional de certificados de cliente",
    "caption": "Figura 8 - Ciclo de vida operacional de certificados."
  },
  {
    "kind": "paragraph",
    "text": "O primeiro certificado cria um problema de bootstrap: como a CA sabe que o solicitante representa determinada aplicação? A resposta pode envolver aprovação humana, identidade da plataforma, segredo de uso único, atestação de nó, conta de serviço ou pipeline autenticado. O mecanismo deve impedir que um time solicite credenciais para identidade de outro produto."
  },
  {
    "kind": "paragraph",
    "text": "A solicitação de assinatura deve gerar a chave no local mais apropriado. Em muitos casos, a chave privada deve permanecer no workload, HSM ou cofre de chaves e apenas a CSR deve ser enviada. Gerar a chave centralmente e distribuí-la aumenta o número de lugares onde ela pode vazar."
  },
  {
    "kind": "paragraph",
    "text": "Quando exportação for necessária, o transporte precisa ser protegido e auditado."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Rotação sem indisponibilidade"
  },
  {
    "kind": "paragraph",
    "text": "A rotação deve usar janela de sobreposição. O servidor pode confiar temporariamente na credencial antiga e na nova, enquanto o cliente recebe o novo certificado e reinicia ou recarrega a configuração. Somente após confirmar o uso da nova credencial a antiga é removida."
  },
  {
    "kind": "paragraph",
    "text": "Em troca de CA, a sobreposição deve incluir cadeia antiga e nova, com plano de rollback. Aplicações precisam saber recarregar certificados. Algumas bibliotecas carregam keystore apenas no startup; outras suportam reload dinâmico."
  },
  {
    "kind": "paragraph",
    "text": "Reinícios coordenados podem gerar pico de conexões e indisponibilidade. Certificados de curta duração reduzem a janela de exposição, mas exigem automação altamente confiável e observabilidade do processo de renovação."
  },
  {
    "kind": "subhead",
    "text": "Padrão de rotação"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Publicar nova CA ou cadeia nos validadores.",
      "Emitir nova credencial para a mesma identidade lógica.",
      "Aceitar credencial antiga e nova durante a sobreposição.",
      "Confirmar adoção por telemetria e teste sintético.",
      "Retirar a credencial antiga e revogar quando aplicável."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Revogação"
  },
  {
    "kind": "paragraph",
    "text": "Revogar um certificado significa declarar que ele não deve mais ser aceito antes do vencimento. A PKI pode publicar CRLs ou responder por OCSP. A validação precisa definir comportamento diante de indisponibilidade do serviço de status: fail-open preserva disponibilidade, mas pode aceitar credencial revogada; fail-closed aumenta segurança, mas pode interromper integrações quando o verificador estiver indisponível."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes internos com certificados muito curtos, algumas arquiteturas priorizam expiração rápida e bloqueio da identidade no plano de controle. Isso não elimina a necessidade de uma estratégia para comprometimento imediato. A escolha entre CRL, OCSP, listas locais, remoção de trust, denylist de serial ou emissão curta deve ser documentada e testada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Proteção da chave privada"
  },
  {
    "kind": "table",
    "caption": "Proteção da chave privada.",
    "headers": [
      "Local",
      "Vantagens",
      "Cuidados"
    ],
    "rows": [
      [
        "Arquivo protegido",
        "Simples e compatível.",
        "Permissões, cópias, backup, imagem de container e logs."
      ],
      [
        "Keystore PKCS#12/JKS",
        "Integração com plataformas Java.",
        "Senha, distribuição, reload e acesso ao arquivo."
      ],
      [
        "Secret de orquestrador",
        "Automação e montagem no workload.",
        "Controle de acesso ao namespace, etcd, snapshots e rotação."
      ],
      [
        "HSM / KMS",
        "Chave pode ser não exportável e operações são auditadas.",
        "Latência, disponibilidade, custo e compatibilidade TLS."
      ],
      [
        "Sidecar/agente",
        "Abstrai emissão e rotação da aplicação.",
        "Confiança no agente, socket local e isolamento do workload."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.9 Padrões arquiteturais corporativos",
    "id": "9-9-padroes-arquiteturais-corporativos"
  },
  {
    "kind": "paragraph",
    "text": "Não existe uma única topologia mTLS para todos os casos. O desenho deve considerar fronteiras de confiança, necessidade de inspeção, responsabilidade por certificados, requisitos de auditoria, legado e escala. A seguir estão padrões recorrentes em plataformas de APIs."
  },
  {
    "kind": "paragraph",
    "text": "O elemento comum é tornar explícitas as relações de confiança. Cada sessão TLS possui participantes e política próprios. Quando há proxies, balanceadores e gateways, a conexão original termina em algum ponto."
  },
  {
    "kind": "paragraph",
    "text": "A partir dali, uma nova sessão pode ser criada com outra identidade. Diagramas e documentação devem evitar a impressão de que o certificado do cliente atravessa magicamente toda a cadeia."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Padrão A - parceiro para gateway"
  },
  {
    "kind": "paragraph",
    "text": "O parceiro recebe um certificado de cliente e se conecta a um hostname dedicado. O gateway valida a cadeia, extrai a identidade, aplica quota e autorização e registra o resultado. O backend confia no gateway e recebe um contexto interno protegido."
  },
  {
    "kind": "paragraph",
    "text": "Esse padrão é adequado para B2B, Open Finance, integrações de pagamento e APIs com contrato bilateral. O principal risco é a propagação insegura da identidade. O backend não deve aceitar o mesmo header de clientes que possam contornar o gateway."
  },
  {
    "kind": "paragraph",
    "text": "Regras de rede, mTLS interno e assinatura de contexto reduzem esse risco. O cadastro do parceiro deve vincular certificado, ambiente, contratos, contatos e plano de rotação."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Padrão B - gateway como cliente mTLS de backend"
  },
  {
    "kind": "paragraph",
    "text": "O gateway usa uma credencial própria para autenticar-se em cada backend ou domínio. Essa identidade representa o gateway, não o parceiro externo. O backend autoriza o gateway e, quando necessário, usa contexto adicional para aplicar permissões do consumidor original."
  },
  {
    "kind": "paragraph",
    "text": "É um padrão útil para consolidar egress e proteger serviços legados. Usar a mesma credencial do gateway para todos os backends cria um grande raio de impacto. É preferível segmentar certificados por ambiente, cluster, domínio ou produto."
  },
  {
    "kind": "paragraph",
    "text": "Assim, o comprometimento de uma chave não concede acesso universal e a revogação pode ser direcionada."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Padrão C - passthrough até o serviço"
  },
  {
    "kind": "paragraph",
    "text": "Um balanceador de camada 4 encaminha a sessão TLS até o serviço, que valida diretamente o certificado do cliente. A autenticação é realmente entre cliente e serviço, e intermediários não acessam o HTTP. Esse padrão pode ser necessário quando requisitos exigem terminação no destino ou quando o serviço implementa protocolo não HTTP."
  },
  {
    "kind": "paragraph",
    "text": "A limitação é a perda de funcionalidades de gateway de camada 7, como transformação, validação de payload e roteamento por conteúdo. Observabilidade também pode ser mais difícil. Pode-se combinar passthrough com telemetria de camada 4, mas políticas de API deverão residir no serviço ou em outro componente dentro da sessão."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Padrão D - identidade de workload automatizada"
  },
  {
    "kind": "paragraph",
    "text": "A plataforma emite certificados curtos para workloads e a malha aplica mTLS e autorização. O desenvolvedor usa uma identidade lógica, enquanto rotação e trust bundles são gerenciados pelo plano de controle. Esse padrão oferece escala e reduz credenciais estáticas, mas depende de maturidade da plataforma."
  },
  {
    "kind": "paragraph",
    "text": "O maior risco é confiar cegamente na automação. Atestação, RBAC do emissor, isolamento entre namespaces, proteção do socket do agente e política de aprovação precisam ser auditados. Um invasor que consegue solicitar identidade de outro serviço pode atravessar todas as políticas baseadas nessa identidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.10 Configuração prática e ferramentas de diagnóstico",
    "id": "9-10-configuracao-pratica-e-ferramentas-de-diagnostico"
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas de linha de comando ajudam a verificar cadeia, handshake, certificados apresentados e causas de falha. Elas devem ser usadas em ambientes autorizados e com cuidado para não expor chaves em histórico, logs ou processos. Os exemplos abaixo são deliberadamente genéricos e precisam ser adaptados ao sistema operacional e à política da organização."
  },
  {
    "kind": "paragraph",
    "text": "Um diagnóstico eficaz separa camadas: resolução DNS, conectividade TCP, negociação TLS, validação do servidor, solicitação de certificado de cliente, seleção da credencial, validação da cadeia, autorização HTTP e política da API. Tentar resolver tudo como “erro 403” pode ocultar que a conexão TLS sequer foi estabelecida."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Teste com curl"
  },
  {
    "kind": "subhead",
    "text": "Exemplo de chamada mTLS"
  },
  {
    "kind": "code",
    "text": "curl --verbose   --cert cliente.pem   --key cliente.key   --cacert ca-servidor.pem   https://api-\nparceiros.exemplo.com/v1/status"
  },
  {
    "kind": "paragraph",
    "text": "A opção --cert apresenta o certificado do cliente; --key aponta para a chave privada; --cacert define a confiança usada para validar o servidor. Em produção, arquivos de chave devem possuir permissões restritas. Quando certificado e chave estão em PKCS#12, o formato e a proteção por senha dependem da ferramenta e da versão instalada."
  },
  {
    "kind": "paragraph",
    "text": "O modo verbose revela mensagens importantes, mas pode imprimir detalhes sensíveis de headers. Logs de diagnóstico não devem ser compartilhados sem revisão. O código HTTP só aparece se o handshake for concluído; falhas anteriores normalmente surgem como erros TLS, alertas ou encerramento da conexão."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Inspeção com OpenSSL"
  },
  {
    "kind": "subhead",
    "text": "Inspeção de handshake"
  },
  {
    "kind": "code",
    "text": "openssl s_client \\\n  -connect api-parceiros.exemplo.com:443 \\\n  -servername api-parceiros.exemplo.com \\\n  -cert cliente.pem \\\n  -key cliente.key \\\n  -CAfile cadeia-servidor.pem \\\n  -showcerts -state -tlsextdebug"
  },
  {
    "kind": "paragraph",
    "text": "Certificados públicos podem ser compartilhados com menos risco, mas ainda podem revelar nomes internos e estrutura organizacional."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore Java"
  },
  {
    "kind": "subhead",
    "text": "Importação de uma âncora de confiança"
  },
  {
    "kind": "code",
    "text": "keytool -importcert \\\n  -alias ca-parceiros-producao \\\n  -file ca-parceiros.pem \\\n  -keystore truststore.p12 \\\n  -storetype PKCS12"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Segurança operacional"
  },
  {
    "kind": "paragraph",
    "text": "Nunca envie chaves privadas por e-mail, chat ou ticket. Para diagnóstico, prefira metadados, certificados públicos, serial, emissor, datas, thumbprint e logs sanitizados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.11 Falhas frequentes e método de troubleshooting",
    "id": "9-11-falhas-frequentes-e-metodo-de-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Mensagens de erro TLS variam entre bibliotecas e proxies. A mesma causa pode aparecer como unknown_ca, bad_certificate, certificate_required, handshake_failure, alert certificate expired ou simplesmente conexão encerrada. O objetivo do troubleshooting não é decorar mensagens, mas localizar qual verificação falhou e em qual componente."
  },
  {
    "kind": "paragraph",
    "text": "Um método estruturado reduz o risco de “corrigir” a falha desabilitando validações. Primeiro confirme a topologia real e o terminador TLS. Depois capture horário, hostname, SNI, origem, versão TLS, cadeia apresentada e identidade esperada."
  },
  {
    "kind": "paragraph",
    "text": "Compare com políticas e inventário. Somente então altere configuração."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Matriz de falhas"
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Matriz de sintomas e hipóteses de diagnóstico.",
    "headers": [
      "Sintoma",
      "Hipótese principal",
      "Evidência a coletar"
    ],
    "rows": [
      [
        "unknown ca _",
        "Emissor não está no truststore ou cadeia incompleta.",
        "Cadeia enviada, trust bundle e issuer/subject."
      ],
      [
        "bad certificate _",
        "Certificado, assinatura ou formato rejeitado.",
        "Alert TLS, extensões e algoritmos."
      ],
      [
        "certificate expired _",
        "Data expirada ou relógio incorreto.",
        "notBefore/notAfter e horário dos nós."
      ],
      [
        "handshake failure _",
        "Versão, cifra, curva, assinatura ou política incompatível.",
        "ClientHello, ServerHello e logs TLS."
      ],
      [
        "Sem certificado",
        "Cliente não selecionou credencial ou servidor não solicitou.",
        "CertificateRequest e configuração do keystore."
      ],
      [
        "HTTP 403 após mTLS",
        "Autenticação passou, autorização ou cadastro falhou.",
        "Identidade extraída, consumer id e política. _"
      ],
      [
        "Falha intermitente",
        "Nós com truststores diferentes ou rotação parcial.",
        "Configuração por instância e serial observado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Roteiro de diagnóstico"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-09.svg",
    "alt": "Roteiro de diagnóstico para falhas de mutual TLS",
    "caption": "Figura 9 - Roteiro resumido de troubleshooting."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Identifique exatamente onde TLS termina: load balancer, WAF, gateway, ingress, sidecar ou aplicação."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Confirme DNS, endereço, porta e SNI; um hostname incorreto pode selecionar outro certificado e política."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Teste a validação do servidor sem certificado de cliente para separar confiança de servidor e autenticação do cliente."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Observe se CertificateRequest é enviado e quais emissores/algoritmos são aceitos.",
      "Confirme que o cliente apresenta cadeia completa e possui acesso à chave privada.",
      "Valide cadeia, validade, EKU, SAN, revogação e política criptográfica no terminador.",
      "Depois do handshake, verifique identidade canônica, mapeamento, token, rota e autorização.",
      "Compare todos os nós e ambientes; divergência de configuração é comum em clusters."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "O perigo do bypass temporário"
  },
  {
    "kind": "paragraph",
    "text": "Desativar validação de certificado, aceitar qualquer CA ou tornar o certificado opcional pode restaurar conectividade, mas remove a propriedade de segurança que o mTLS deveria fornecer. Mudanças emergenciais precisam ser explícitas, limitadas, aprovadas, monitoradas e possuir prazo de reversão. Sempre que possível, corrija cadeia, truststore ou rotação sem ampliar confiança."
  },
  {
    "kind": "paragraph",
    "text": "Uma exceção temporária também pode se tornar permanente por esquecimento. Use mecanismos de configuração com expiração, tickets vinculados, alertas e revisão pós-incidente. Testes automatizados devem detectar listeners que deixaram de exigir certificado ou truststores que passaram a aceitar autoridades inesperadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.12 Observabilidade, auditoria e métricas",
    "id": "9-12-observabilidade-auditoria-e-metricas"
  },
  {
    "kind": "paragraph",
    "text": "Falhas de handshake acontecem antes da camada HTTP e podem não aparecer nos logs convencionais da API. O terminador TLS deve expor métricas e eventos próprios: tentativas, sucessos, falhas por motivo, versão negociada, algoritmo, emissor, identidade extraída e proximidade de expiração. Dados sensíveis devem ser minimizados e protegidos."
  },
  {
    "kind": "paragraph",
    "text": "A auditoria precisa responder quem acessou, com qual credencial, por qual gateway, em qual horário, qual API, decisão de autorização e resultado. O número de série e o thumbprint ajudam a vincular evento à emissão específica, enquanto a identidade lógica permite acompanhar o consumidor através de rotações. Guardar apenas Subject textual pode ser insuficiente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Métricas recomendadas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Taxa de handshakes mTLS bem-sucedidos e falhos por listener, parceiro e motivo.",
      "Distribuição de versões TLS, algoritmos de assinatura e ciphersuites negociadas.",
      "Certificados ativos por faixa de expiração: 90, 60, 30, 15, 7 e 1 dia.",
      "Renovações concluídas, falhas e tempo médio de propagação da nova credencial.",
      "Uso de certificado antigo durante janela de sobreposição.",
      "Falhas de revogação, indisponibilidade de OCSP/CRL e decisões fail-open/fail-closed.",
      "Identidades não mapeadas, tentativas fora do namespace e violações de autorização.",
      "Conexões plaintext ou permissivas em ambientes que deveriam estar estritos."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Logs úteis e minimização"
  },
  {
    "kind": "paragraph",
    "text": "É útil registrar emissor, serial, SAN canônico, validade e resultado de validação. Entretanto, o certificado pode conter dados internos ou pessoais. A política de logs deve definir quais campos são necessários, mascaramento, retenção e acesso."
  },
  {
    "kind": "paragraph",
    "text": "Chaves privadas nunca são registradas; cadeias completas raramente precisam ser repetidas em cada requisição. Correlação entre handshake e requisição pode ser feita com identificador de conexão, trace ID ou contexto gerado pelo gateway. Em HTTP/2, várias requisições compartilham a conexão, portanto a telemetria deve manter a associação sem assumir um handshake por requisição."
  },
  {
    "kind": "paragraph",
    "text": "Em proxies com pooling, é essencial distinguir a sessão externa da sessão interna."
  },
  {
    "kind": "subhead",
    "text": "Indicador de maturidade"
  },
  {
    "kind": "paragraph",
    "text": "Uma plataforma madura descobre certificados próximos do vencimento e identidades sem proprietário antes que o consumidor abra um incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.13 Hardening e decisões de segurança",
    "id": "9-13-hardening-e-decisoes-de-seguranca"
  },
  {
    "kind": "paragraph",
    "text": "Hardening de mTLS envolve reduzir algoritmos, identidades e caminhos aceitos ao mínimo necessário. A política deve definir versões TLS, assinaturas, curvas, tamanhos de chave, autoridades, profundidade de cadeia, EKU, namespace de SAN, revogação e tratamento de erro. Valores padrão de bibliotecas podem ser amplos demais para uma integração corporativa específica."
  },
  {
    "kind": "paragraph",
    "text": "Também é necessário proteger a configuração. Um atacante que altera o truststore ou troca o modo de client authentication pode desabilitar a segurança sem tocar no código da aplicação. Arquivos, secrets, pipelines e consoles de administração devem ter controle de acesso, revisão e trilha de auditoria."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de hardening"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Preferir TLS 1.3 e restringir TLS 1.2 às necessidades de compatibilidade aprovadas.",
      "Desabilitar versões e algoritmos legados conforme política criptográfica vigente.",
      "Usar listeners dedicados ou segregação clara para rotas que exigem mTLS.",
      "Manter truststores mínimos e específicos por domínio de confiança.",
      "Exigir EKU e atributos de identidade coerentes com o propósito do certificado.",
      "Normalizar e validar SAN antes do mapeamento; evitar regex permissiva e matching parcial.",
      "Negar certificados válidos que não estejam mapeados a consumidor ativo.",
      "Proteger chaves privadas e preferir credenciais curtas com rotação automatizada.",
      "Testar revogação, expiração, troca de CA, cadeia incompleta e indisponibilidade de verificador.",
      "Remover headers externos de identidade e proteger a propagação interna.",
      "Registrar mudanças em truststore, política TLS e autorização como mudanças de segurança.",
      "Monitorar modo permissivo e exceções com data obrigatória de encerramento."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pinning: usar com critério"
  },
  {
    "kind": "paragraph",
    "text": "Certificate pinning restringe confiança a um certificado, chave ou conjunto específico. Pode reduzir dependência de uma CA ampla, mas cria acoplamento operacional. Pinning de certificado quebra em toda reemissão; pinning de chave permite reemitir com a mesma chave, mas pode desencorajar rotação da chave."
  },
  {
    "kind": "paragraph",
    "text": "Pinning de CA intermediária é mais flexível, porém amplia o conjunto aceito. Em integrações B2B, um cadastro de certificados pode ser visto como pinning operacional. Para evitar indisponibilidade, o sistema precisa permitir duas credenciais simultâneas durante rotação, registrar data de ativação e desativação e oferecer processo seguro de atualização."
  },
  {
    "kind": "paragraph",
    "text": "O pinning não substitui verificação de validade, propósito e autorização."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Fail-open versus fail-closed"
  },
  {
    "kind": "paragraph",
    "text": "Quando uma dependência de validação falha, fail-closed rejeita conexões; fail-open mantém disponibilidade. Não existe resposta universal. Para autenticação de cliente em API crítica, fail-closed normalmente preserva a intenção de segurança."
  },
  {
    "kind": "paragraph",
    "text": "Entretanto, uma infraestrutura de revogação instável pode causar indisponibilidade sistêmica. A arquitetura deve melhorar redundância e cache em vez de simplesmente desabilitar a verificação. A decisão deve ser baseada em risco, documentada por controle e testada."
  },
  {
    "kind": "paragraph",
    "text": "É possível combinar cache de respostas válidas, CRLs distribuídas, certificados curtos, denylist emergencial e circuitos operacionais. O pior cenário é um comportamento implícito e desconhecido que varia entre produtos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.14 Estudo de caso: integração de pagamentos B2B",
    "id": "9-14-estudo-de-caso-integracao-de-pagamentos-b2b"
  },
  {
    "kind": "paragraph",
    "text": "Considere uma empresa que expõe uma API de pagamentos para três parceiros. Cada parceiro possui aplicações de produção e homologação. A plataforma utiliza um WAF, um API Gateway e serviços internos."
  },
  {
    "kind": "paragraph",
    "text": "O requisito é impedir clientes não cadastrados, vincular chamadas ao parceiro correto, proteger tokens OAuth e permitir rotação sem indisponibilidade. A solução começa com hostnames separados por ambiente e listeners que exigem certificado. A PKI de parceiros emite certificados com SAN URI padronizado."
  },
  {
    "kind": "paragraph",
    "text": "O gateway confia apenas nas CAs aprovadas para aquele ecossistema, valida EKU clientAuth, validade, cadeia e revogação e consulta um registro de consumidores. Certificados não mapeados são recusados mesmo quando a cadeia é válida."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Modelo de identidade"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/pt/figure-10.svg",
    "alt": "Arquitetura de integração de pagamentos B2B com mutual TLS",
    "caption": "Figura 10 - Arquitetura do estudo de caso B2B."
  },
  {
    "kind": "subhead",
    "text": "Identidade e cadastro do consumidor"
  },
  {
    "kind": "code",
    "text": "SAN URI:\nspiffe://b2b.exemplo/parceiro-017/app-pagamentos/producao\nconsumer_id: partner-017-payments-prod\nowner: parceiro-017\nallowed_apis: payments.create, payments.status\nrate_plan: b2b-gold\noauth_client_id: p017-payments-prod"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Fluxo de requisição"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "O parceiro estabelece mTLS com o gateway usando a credencial de produção.",
      "O gateway valida o certificado e resolve a SAN URI para consumer_id.",
      "O parceiro apresenta token OAuth vinculado ao certificado.",
      "O gateway valida token e correspondência entre confirmação e certificado mTLS.",
      "A política verifica API, método, escopo, quota e ambiente.",
      "O gateway cria conexão mTLS interna com o serviço de pagamentos.",
      "A identidade do parceiro é propagada em contexto interno assinado e auditável.",
      "O serviço executa autorização de negócio e registra consumer_id e serial da credencial."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Rotação planejada"
  },
  {
    "kind": "paragraph",
    "text": "Trinta dias antes do vencimento, a plataforma notifica o parceiro. Um novo certificado para a mesma identidade lógica é emitido. O cadastro aceita temporariamente as duas emissões."
  },
  {
    "kind": "paragraph",
    "text": "O parceiro instala a nova credencial e executa testes em endpoint de validação. A telemetria confirma que o novo serial está sendo utilizado. Depois da janela acordada, a emissão antiga é desativada e, se necessário, revogada."
  },
  {
    "kind": "paragraph",
    "text": "Se houver troca de CA intermediária, o gateway recebe a nova cadeia de confiança antes da emissão dos certificados. A configuração é distribuída a todos os nós e validada por teste sintético. Somente depois o parceiro migra."
  },
  {
    "kind": "paragraph",
    "text": "O runbook inclui rollback para a cadeia anterior durante a janela de sobreposição."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Resposta a comprometimento"
  },
  {
    "kind": "paragraph",
    "text": "Quando o parceiro suspeita de vazamento da chave, o acesso da emissão é bloqueado imediatamente no registro e o certificado é revogado. Alertas procuram uso do serial após o horário do incidente, origens anormais e tokens associados. Uma nova chave é gerada, e o certificado substituto passa por onboarding emergencial."
  },
  {
    "kind": "paragraph",
    "text": "A identidade lógica e o histórico permanecem preservados. Esse fluxo demonstra por que depender apenas da expiração é insuficiente. Também mostra a utilidade de separar identidade, credencial e autorização: bloquear uma emissão comprometida não exige apagar o consumidor nem recriar todos os contratos de API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.15 Resumo técnico e revisão",
    "id": "9-15-resumo-tecnico-e-revisao"
  },
  {
    "kind": "paragraph",
    "text": "O mTLS autentica as duas pontas durante o estabelecimento do canal TLS. A cadeia X.509 vincula a chave pública a uma identidade emitida por uma autoridade confiável, enquanto CertificateVerify demonstra posse da chave privada. A segurança final depende de validação rigorosa, truststores segmentados, identidade canônica, autorização e proteção da chave."
  },
  {
    "kind": "paragraph",
    "text": "Em plataformas de APIs, o principal desafio é transformar esse mecanismo criptográfico em capacidade operacional. Gateways, service meshes e servidores de autorização precisam compartilhar modelos de identidade e processos de ciclo de vida. Rotação, revogação, telemetria, troubleshooting e resposta a incidentes devem ser projetados antes da entrada em produção."
  },
  {
    "kind": "subhead",
    "text": "Síntese do capítulo"
  },
  {
    "kind": "paragraph",
    "text": "mTLS fornece uma identidade forte para a sessão, mas somente uma arquitetura completa transforma essa identidade em acesso seguro, escalável e operável."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Perguntas de revisão"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Qual é a diferença entre validar um certificado e comprovar posse da chave privada?",
      "Por que um certificado válido não deve receber acesso automaticamente?",
      "Quais campos e extensões X.509 devem ser verificados em um certificado de cliente?",
      "Por que o truststore do sistema operacional pode ser amplo demais para APIs B2B?",
      "Como separar identidade lógica da aplicação e emissão atual do certificado?",
      "O que muda quando o gateway termina mTLS e cria outra sessão até o backend?",
      "Como tokens OAuth vinculados a certificado reduzem o risco de token roubado?",
      "Qual é a ordem segura para rotacionar uma CA ou certificado sem indisponibilidade?",
      "Quais métricas detectam problemas antes da expiração?",
      "Quando fail-open ou fail-closed deve ser considerado na validação de revogação?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exercício de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Desenhe uma solução para uma API corporativa consumida por dez parceiros e por cinco serviços internos. Defina: fronteiras de terminação TLS; truststores; formato de SAN; registro de consumidores; política de autorização; propagação de identidade; fluxo OAuth; rotação; revogação; métricas; logs e procedimento de troubleshooting. Explique como sua solução evita que um certificado válido de um parceiro seja usado para acessar APIs de outro contrato."
  },
  {
    "kind": "paragraph",
    "text": "Depois, simule a troca da CA intermediária e descreva a sequência de implantação. Inclua janela de sobreposição, teste sintético, rollback, observação de adoção e retirada da cadeia antiga. O exercício deve demonstrar que a operação de PKI faz parte da arquitetura, e não apenas da infraestrutura."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Referências oficiais e leituras recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "As referências abaixo fundamentam os conceitos de handshake TLS 1.3, validação X.509, autenticação OAuth por mTLS e configuração segura de TLS. Documentos normativos podem receber atualizações; políticas corporativas devem acompanhar erratas e revisões aplicáveis."
  },
  {
    "kind": "paragraph",
    "text": "1. RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3. https://www.rfc-editor.org/rfc/rfc8446.html - Especificação do TLS 1.3 e das mensagens usadas no handshake."
  },
  {
    "kind": "paragraph",
    "text": "2. RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile. https://www.rfc-editor.org/rfc/rfc5280.html - Perfil de certificados X.509 e algoritmo de validação de caminho."
  },
  {
    "kind": "paragraph",
    "text": "3. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens. https://www.rfc-editor.org/rfc/rfc8705.html - Autenticação de clientes OAuth por mTLS e tokens vinculados a certificado."
  },
  {
    "kind": "paragraph",
    "text": "4. NIST SP 800-52 Rev. 2 - Guidelines for TLS Implementations. https://csrc.nist.gov/pubs/sp/800/52/r2/final - Diretrizes para seleção, configuração e uso seguro de TLS."
  },
  {
    "kind": "paragraph",
    "text": "5. RFC 6818 - Updates to the Internet X.509 PKI Certificate and CRL Profile. https://www.rfc-editor.org/rfc/rfc6818.html - Atualizações e esclarecimentos para o perfil X.509 do RFC 5280."
  },
  {
    "kind": "paragraph",
    "text": "6. RFC 9618 - Updates to X.509 Policy Validation. https://www.rfc-editor.org/rfc/rfc9618.html - Atualizações relacionadas à validação de políticas de certificados X.509."
  }
];
