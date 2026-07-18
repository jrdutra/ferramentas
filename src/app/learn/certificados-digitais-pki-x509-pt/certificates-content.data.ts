import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido, com remoção apenas de cabeçalhos, rodapés e quebras físicas de página.
export const CERTIFICATES_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-01.svg",
    "alt": "Visão geral do ecossistema de certificados e PKI",
    "caption": "Figura 8.1 - Visão geral do ecossistema de certificados e PKI."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo explica como certificados digitais transformam chaves públicas em identidades verificáveis. O leitor acompanhará o modelo X.509, a construção e validação de cadeias, a emissão por autoridades certificadoras, a revogação, os formatos de armazenamento e a operação desses elementos em TLS, mTLS, API Gateways e ambientes corporativos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos do capítulo",
    "id": "objetivos-do-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Diferenciar chave pública, certificado, identidade, confiança e autorização, evitando tratar esses conceitos como equivalentes.",
      "Compreender os componentes de uma PKI: titular, Registration Authority, Certification Authority, repositórios, políticas, auditores e partes confiantes.",
      "Ler a estrutura de um certificado X.509 v3, incluindo campos obrigatórios, extensões críticas, nomes, usos de chave e identificadores de autoridade.",
      "Distinguir construção de cadeia, validação de caminho e decisão de confiança, incluindo âncoras, intermediárias, políticas e restrições.",
      "Entender o ciclo de emissão: geração da chave, CSR PKCS #10, validação, assinatura, publicação, instalação, renovação, rotação, revogação e destruição.",
      "Compreender CRLs, OCSP, OCSP stapling, certificados de curta duração e os compromissos entre segurança, privacidade e disponibilidade.",
      "Reconhecer formatos DER, PEM, PKCS #12, JKS e interfaces PKCS #11, diagnosticando erros de cadeia, chave privada e conversão.",
      "Aplicar certificados em TLS de servidor, autenticação mTLS, Axway API Gateway, Azure API Management e integrações de backend.",
      "Executar troubleshooting estruturado com OpenSSL, logs de handshake, inspeção de trust stores e análise de datas, SAN, EKU e revogação."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Como estudar este capítulo",
    "id": "como-estudar-este-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Certificados digitais reúnem várias camadas ao mesmo tempo: criptografia assimétrica, formatos ASN.1, regras de identidade, políticas organizacionais, repositórios, protocolos de revogação e decisões de confiança. A melhor forma de estudar é separar as perguntas. Primeiro: qual identidade o certificado afirma? Segundo: quem assinou essa afirmação? Terceiro: por que o sistema confia no emissor? Quarto: a cadeia atende às regras de tempo, uso, nome, política e revogação?"
  },
  {
    "kind": "paragraph",
    "text": "O capítulo usa o perfil de Internet definido pela RFC 5280 como base, mas mostra que uma PKI real não é apenas um conjunto de certificados. Ela exige governança, proteção de chaves, perfis de emissão, auditoria, automação e resposta a incidentes. Em cada seção, conecte a teoria a um fluxo concreto: o certificado apresentado por um cliente, o certificado do listener de um gateway ou o certificado usado pelo gateway para autenticar-se perante um backend."
  },
  {
    "kind": "subhead",
    "text": "Regra editorial para diagramas"
  },
  {
    "kind": "paragraph",
    "text": "Para impedir textos quebrados dentro de caixas, os diagramas deste capítulo usam apenas rótulos curtos. Explicações técnicas completas permanecem no corpo do texto. As caixas de destaque do documento têm altura automática e margens internas ampliadas, sem dimensões verticais fixas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.1 Da chave pública ao certificado digital",
    "id": "8-1-da-chave-publica-ao-certificado-digital"
  },
  {
    "kind": "paragraph",
    "text": "Uma chave pública isolada permite verificar uma assinatura ou participar de um protocolo de estabelecimento de chaves, mas não informa, por si só, quem controla a chave privada correspondente. Um atacante poderia gerar seu próprio par de chaves e afirmar que a chave pública pertence a um banco, a um domínio ou a uma aplicação. O problema central não é matemático: é criar uma associação verificável entre um identificador e uma chave."
  },
  {
    "kind": "paragraph",
    "text": "O certificado digital resolve esse problema ao encapsular a chave pública, dados de identidade, período de validade, restrições de uso e metadados, protegendo o conjunto com a assinatura digital de um emissor. A assinatura não torna todas as informações verdadeiras por natureza; ela permite verificar que o emissor assumiu responsabilidade técnica pela declaração. A parte confiante ainda precisa decidir se reconhece aquele emissor, se o perfil é adequado e se a identidade apresentada corresponde ao contexto da operação."
  },
  {
    "kind": "paragraph",
    "text": "Em TLS de servidor, o certificado liga uma chave pública a nomes DNS ou endereços IP. Em mTLS, ele pode ligar uma chave a uma aplicação, dispositivo, parceiro ou pessoa jurídica. Em assinatura de código, ele associa uma chave a uma identidade de publicador. A mesma estrutura X.509 pode atender a finalidades diferentes, mas extensões, políticas e processos de validação determinam o que o certificado realmente pode provar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.2 O que é uma Infraestrutura de Chaves Públicas",
    "id": "8-2-o-que-e-uma-infraestrutura-de-chaves-publicas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-02.svg",
    "alt": "Papéis essenciais em uma Infraestrutura de Chaves Públicas",
    "caption": "Figura 8.2 - Papéis essenciais em uma Infraestrutura de Chaves Públicas."
  },
  {
    "kind": "paragraph",
    "text": "PKI, ou Public Key Infrastructure, é o conjunto de políticas, processos, pessoas, serviços, equipamentos e softwares usados para emitir, manter, distribuir, validar e revogar certificados e pares de chaves. A infraestrutura inclui autoridades certificadoras, sistemas de registro, repositórios de certificados e status, módulos criptográficos, procedimentos de auditoria, segregação de funções e documentos normativos."
  },
  {
    "kind": "paragraph",
    "text": "A Certification Authority, ou CA, assina certificados e listas de revogação. A Registration Authority, ou RA, valida informações e autoriza pedidos de emissão, mas pode não possuir a chave de assinatura da CA. O titular controla ou utiliza a chave privada vinculada ao certificado. A parte confiante valida o certificado antes de aceitar a identidade. Repositórios disponibilizam certificados, CRLs, informações de política ou respostas de status. Em uma PKI madura, esses papéis são separados para reduzir fraude e limitar o impacto de um comprometimento."
  },
  {
    "kind": "paragraph",
    "text": "Também existem papéis de governança. A autoridade de política define requisitos de identificação, algoritmos, prazos, usos e responsabilidades. Operadores administram componentes. Auditores verificam se práticas correspondem às políticas. Equipes de segurança protegem chaves, analisam eventos e coordenam revogação. Portanto, confiar em um certificado significa confiar em uma cadeia técnica e, simultaneamente, em uma cadeia de processos humanos e organizacionais."
  },
  {
    "kind": "table",
    "caption": "Componentes e responsabilidades de uma PKI.",
    "headers": [
      "Componente",
      "Função principal",
      "Risco se comprometido"
    ],
    "rows": [
      [
        "CA raiz",
        "Origina uma âncora ou hierarquia de confiança.",
        "Comprometimento pode exigir substituição ampla de confiança."
      ],
      [
        "CA intermediária",
        "Emite certificados finais ou outras intermediárias sob restrições.",
        "Permite emissão indevida dentro do escopo autorizado."
      ],
      [
        "RA",
        "Valida identidade e aprova solicitações.",
        "Pode autorizar certificados para identidades erradas."
      ],
      [
        "Titular",
        "Controla a chave privada e usa o certificado.",
        "Roubo da chave permite personificação até bloqueio ou expiração."
      ],
      [
        "Parte confiante",
        "Constrói e valida o caminho antes de confiar.",
        "Validação incompleta aceita identidades ou usos inválidos."
      ],
      [
        "Repositório de status",
        "Publica CRL, OCSP, certificados e metadados.",
        "Indisponibilidade ou dados desatualizados afetam a decisão."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.3 X.509, ASN.1 e codificação DER",
    "id": "8-3-x-509-asn-1-e-codificacao-der"
  },
  {
    "kind": "paragraph",
    "text": "X.509 é uma família de padrões para certificados de chave pública, listas de revogação e atributos. Na Internet, a RFC 5280 define um perfil de certificados X.509 v3 e CRLs X.509 v2. Um perfil restringe opções de um padrão amplo para que implementações independentes consigam interoperar. Nem tudo que a sintaxe X.509 permite é apropriado para TLS público ou para uma PKI corporativa."
  },
  {
    "kind": "paragraph",
    "text": "A estrutura é descrita em ASN.1, uma linguagem formal para definir tipos de dados. O certificado normalmente é codificado com DER, um subconjunto determinístico das Basic Encoding Rules. DER assegura uma representação única para os valores, característica importante porque a assinatura digital é calculada sobre bytes específicos. Alterar a codificação, mesmo sem mudar o significado aparente, produz bytes diferentes e invalida a assinatura."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas frequentemente mostram o certificado em formato textual, mas o objeto assinado continua sendo binário. PEM é apenas uma embalagem textual Base64 em torno do DER, acompanhada por linhas como BEGIN CERTIFICATE. Entender essa diferença evita confundir representação, estrutura e conteúdo: X.509 define o modelo, ASN.1 descreve a sintaxe, DER codifica os bytes e PEM facilita transporte em arquivos e configurações textuais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.4 Anatomia de um certificado X.509 v3",
    "id": "8-4-anatomia-de-um-certificado-x-509-v3"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-03.svg",
    "alt": "Estrutura conceitual de um certificado X.509",
    "caption": "Figura 8.3 - Estrutura conceitual de um certificado X.509."
  },
  {
    "kind": "paragraph",
    "text": "O objeto Certificate contém três partes: tbsCertificate, signatureAlgorithm e signatureValue. A sigla TBS significa to be signed. Dentro dessa parte ficam versão, número de série, algoritmo, issuer, validade, subject, SubjectPublicKeyInfo e extensões. A CA calcula a assinatura sobre a codificação DER do tbsCertificate. O verificador usa a chave pública do emissor para verificar signatureValue."
  },
  {
    "kind": "paragraph",
    "text": "O número de série identifica o certificado dentro do domínio do emissor e é usado em CRLs e consultas OCSP. O intervalo de validade contém notBefore e notAfter. Issuer identifica a entidade emissora; subject identifica o titular quando esse campo é utilizado. SubjectPublicKeyInfo inclui o algoritmo e a chave pública. As extensões X.509 v3 expressam nomes alternativos, restrições de autoridade, usos autorizados, políticas, pontos de distribuição e relações entre certificados."
  },
  {
    "kind": "paragraph",
    "text": "Há dois campos de algoritmo de assinatura: um dentro de tbsCertificate e outro no objeto externo. Eles precisam ser consistentes. O algoritmo da assinatura do certificado não é necessariamente igual ao algoritmo da chave pública do titular. Por exemplo, uma CA com chave RSA pode assinar um certificado que carrega uma chave pública elíptica. O que importa é que o verificador suporte o algoritmo usado pelo emissor e o algoritmo associado à chave do titular para o protocolo posterior."
  },
  {
    "kind": "table",
    "caption": "Campos de um certificado e perguntas de diagnóstico.",
    "headers": [
      "Campo",
      "Significado operacional",
      "Pergunta de diagnóstico"
    ],
    "rows": [
      [
        "Serial number",
        "Identificador único sob um emissor.",
        "O serial consultado em CRL/OCSP é o correto?"
      ],
      [
        "Issuer",
        "Nome do emissor declarado.",
        "Existe um certificado emissor compatível e confiável?"
      ],
      [
        "Validity",
        "Janela temporal de uso.",
        "Relógio, timezone e notBefore/notAfter estão corretos?"
      ],
      [
        "Subject",
        "Identidade nominal do titular.",
        "O perfil usa subject ou depende principalmente de SAN?"
      ],
      [
        "SubjectPublicKeyInfo",
        "Algoritmo e chave pública do titular.",
        "A chave é suportada e corresponde à chave privada instalada?"
      ],
      [
        "Extensions",
        "Nomes, usos e restrições.",
        "Alguma extensão crítica é desconhecida ou incompatível?"
      ],
      [
        "Signature",
        "Proteção de integridade e autoria do emissor.",
        "A assinatura verifica com a chave pública do emissor?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.5 Distinguished Names, Subject e Issuer",
    "id": "8-5-distinguished-names-subject-e-issuer"
  },
  {
    "kind": "paragraph",
    "text": "Subject e issuer costumam usar Distinguished Names, estruturas compostas por Relative Distinguished Names. Elementos comuns incluem countryName, organizationName, organizationalUnitName e commonName. A ordem, a codificação e as regras de comparação podem ser mais complexas do que uma simples comparação textual. Duas representações visualmente parecidas não são necessariamente idênticas em nível de codificação."
  },
  {
    "kind": "paragraph",
    "text": "Em certificados TLS modernos, o Common Name não deve ser tratado como fonte principal para validação de hostname quando Subject Alternative Name está presente. O SAN foi criado para representar formas de nome adequadas ao protocolo, como dNSName, iPAddress, rfc822Name e URI. Sistemas corporativos ainda podem usar DN para seleção de políticas, mas depender de texto livre de subject sem um perfil rígido gera fragilidade e ambiguidades."
  },
  {
    "kind": "paragraph",
    "text": "Issuer e subject também não bastam para construir uma cadeia de forma segura. Diferentes CAs podem compartilhar nomes semelhantes ou até iguais. Identificadores de chave, assinaturas, restrições e dados do caminho participam da decisão. Uma validação que apenas compara issuer do certificado filho com subject de um candidato não prova que o candidato é o emissor correto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.6 Subject Alternative Name e validação de identidade",
    "id": "8-6-subject-alternative-name-e-validacao-de-identidade"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-04.svg",
    "alt": "Validação do identificador solicitado contra Subject Alternative Name",
    "caption": "Figura 8.4 - Validação do identificador solicitado contra Subject Alternative Name."
  },
  {
    "kind": "paragraph",
    "text": "Para uma conexão HTTPS, o cliente inicia o acesso com um identificador: normalmente um nome DNS. Após validar assinatura e cadeia, ele deve verificar se esse identificador aparece de forma válida no certificado. Um dNSName é comparado segundo regras específicas de nomes DNS. Um acesso por endereço IP exige uma entrada iPAddress adequada; escrever o IP como texto em dNSName não produz a mesma semântica."
  },
  {
    "kind": "paragraph",
    "text": "Wildcards reduzem a quantidade de certificados, mas possuem limites e ampliam o impacto de um vazamento de chave. Um nome como *.exemplo.com normalmente cobre um único rótulo, como api.exemplo.com, e não deve ser presumido como cobertura para a.b.exemplo.com. Em ambientes internos, wildcards excessivamente amplos podem permitir que a mesma chave represente muitos serviços não relacionados, dificultando segregação e resposta a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "SNI e SAN resolvem problemas diferentes. SNI informa ao servidor, durante o handshake, qual nome o cliente pretende acessar, permitindo selecionar um certificado. SAN define quais identificadores o certificado está autorizado a representar. O servidor pode escolher um certificado com base no SNI e, ainda assim, enviar um certificado cujo SAN não corresponde ao nome. Nesse caso, a validação deve falhar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.7 Extensões críticas e não críticas",
    "id": "8-7-extensoes-criticas-e-nao-criticas"
  },
  {
    "kind": "paragraph",
    "text": "Cada extensão possui um identificador OID, um valor e um indicador critical. Se uma implementação não reconhece ou não consegue processar uma extensão marcada como crítica, a validação deve falhar. Uma extensão não crítica desconhecida pode ser ignorada, embora seu valor ainda possa ser relevante para aplicações específicas. Marcar tudo como crítico prejudica interoperabilidade; não marcar uma restrição essencial como crítica pode permitir que consumidores a ignorem."
  },
  {
    "kind": "paragraph",
    "text": "A criticidade não significa que a extensão seja importante em termos de negócio, mas define o comportamento diante de desconhecimento. Um perfil de certificado precisa especificar quais extensões são obrigatórias, seus valores, criticidade e interações. CAs não devem apenas copiar extensões solicitadas em um CSR: devem aplicar o perfil autorizado e rejeitar ou substituir atributos que o solicitante não tem permissão para escolher."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-05.svg",
    "alt": "Famílias de extensões X.509 usadas em validação e operação",
    "caption": "Figura 8.5 - Famílias de extensões X.509 usadas em validação e operação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.8 Basic Constraints, Key Usage e Extended Key Usage",
    "id": "8-8-basic-constraints-key-usage-e-extended-key-usage"
  },
  {
    "kind": "paragraph",
    "text": "Basic Constraints informa se o certificado pode atuar como CA. O campo cA verdadeiro identifica autoridade certificadora, e pathLenConstraint pode limitar quantas CAs subordinadas não autoemitidas podem aparecer abaixo dela. Um certificado final de servidor ou cliente normalmente deve ter cA falso. Aceitar um certificado final como emissor por ignorar Basic Constraints transforma uma credencial comum em autoridade indevida."
  },
  {
    "kind": "paragraph",
    "text": "Key Usage restringe operações criptográficas básicas, como digitalSignature, keyEncipherment, keyAgreement, keyCertSign e cRLSign. Certificados de CA precisam de keyCertSign para assinar certificados e, quando publicam CRLs, cRLSign. Para TLS, os bits apropriados dependem do algoritmo e da versão do protocolo. Configurações rígidas devem seguir o perfil, sem assumir que qualquer chave pública serve para qualquer operação."
  },
  {
    "kind": "paragraph",
    "text": "Extended Key Usage, ou EKU, expressa finalidades de aplicação, como serverAuth, clientAuth, codeSigning e OCSPSigning. Um certificado pode ter uma chave matematicamente capaz de assinar, mas estar semanticamente proibido de autenticar um cliente. Gateways que validam mTLS devem considerar EKU e não apenas cadeia e validade. Da mesma forma, um certificado de servidor sem serverAuth pode ser rejeitado por clientes conformes."
  },
  {
    "kind": "table",
    "caption": "Extensões X.509 e seus efeitos.",
    "headers": [
      "Extensão",
      "Exemplo",
      "Efeito"
    ],
    "rows": [
      [
        "Basic Constraints",
        "CA=TRUE, pathLen=0",
        "Autoriza emissão, mas impede intermediárias adicionais abaixo da CA."
      ],
      [
        "Key Usage",
        "digitalSignature",
        "Autoriza uso da chave em assinatura dentro do perfil."
      ],
      [
        "Key Usage",
        "keyCertSign",
        "Autoriza a chave de CA a assinar certificados."
      ],
      [
        "Extended Key Usage",
        "serverAuth",
        "Declara finalidade de autenticação de servidor TLS."
      ],
      [
        "Extended Key Usage",
        "clientAuth",
        "Declara finalidade de autenticação de cliente TLS."
      ],
      [
        "Subject Alternative Name",
        "DNS:api.exemplo.com",
        "Vincula a chave ao identificador usado pelo cliente."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.9 SKI, AKI, AIA e pontos de distribuição",
    "id": "8-9-ski-aki-aia-e-pontos-de-distribuicao"
  },
  {
    "kind": "paragraph",
    "text": "Subject Key Identifier, ou SKI, identifica a chave pública do certificado. Authority Key Identifier, ou AKI, ajuda a identificar a chave do emissor. Esses valores auxiliam a construção de cadeia quando existem emissores com nomes iguais, renovações de CA ou múltiplos caminhos. Eles não substituem a verificação de assinatura, mas reduzem ambiguidades ao selecionar candidatos."
  },
  {
    "kind": "paragraph",
    "text": "Authority Information Access pode indicar locais para obter certificados emissores e serviços OCSP. CRL Distribution Points indica onde recuperar listas de revogação. Esses campos são instruções para construção e status, não garantias de disponibilidade. Ambientes isolados podem bloquear acesso externo, e um gateway pode depender de cache, repositório corporativo ou cadeia fornecida pelo peer."
  },
  {
    "kind": "paragraph",
    "text": "A recuperação automática de intermediárias por AIA cria diferenças entre clientes. Um navegador pode completar uma cadeia que uma JVM, appliance ou biblioteca não completa da mesma maneira. Por isso, o servidor deve apresentar a cadeia intermediária necessária, sem depender de downloads oportunistas. A raiz geralmente não precisa ser enviada: ela deve estar no trust store da parte confiante."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.10 Certificate Policies e Name Constraints",
    "id": "8-10-certificate-policies-e-name-constraints"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Policies contém OIDs que representam políticas sob as quais o certificado foi emitido. Uma política pode indicar nível de validação, comunidade de confiança, requisitos contratuais ou perfil setorial. A presença de um OID não cria confiança automaticamente: a parte confiante precisa conhecer seu significado, mapear políticas e configurar os OIDs aceitáveis quando a política for relevante."
  },
  {
    "kind": "paragraph",
    "text": "Policy Constraints, Policy Mappings e Inhibit Any Policy participam do processamento de políticas ao longo do caminho. A RFC 9618 atualizou o algoritmo de validação de políticas da RFC 5280 para evitar comportamento exponencial em casos adversos, preservando resultado equivalente. Esse exemplo mostra que até algoritmos de validação aparentemente administrativos podem possuir impacto de segurança e disponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Name Constraints permite restringir namespaces que uma CA subordinada pode certificar, como determinados domínios, e-mails ou redes IP. É uma ferramenta poderosa para CAs privadas, intermediárias delegadas e integrações entre organizações. Entretanto, suporte inconsistente em sistemas legados e complexidade de nomes exigem testes. Uma CA tecnicamente restrita é preferível a uma CA com poder amplo controlado apenas por procedimento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.11 Hierarquias, raízes e intermediárias",
    "id": "8-11-hierarquias-raizes-e-intermediarias"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-06.svg",
    "alt": "Hierarquia de raiz, intermediárias e certificados finais",
    "caption": "Figura 8.6 - Hierarquia de raiz, intermediárias e certificados finais."
  },
  {
    "kind": "paragraph",
    "text": "Uma CA raiz costuma possuir certificado autoassinado, no qual subject e issuer representam a própria entidade e a assinatura é produzida pela chave privada correspondente. O fato de ser autoassinado não cria confiança. A confiança surge quando a chave ou o certificado da raiz é instalado explicitamente como trust anchor por uma organização, sistema operacional, navegador, runtime ou aplicação."
  },
  {
    "kind": "paragraph",
    "text": "A raiz normalmente permanece offline ou fortemente protegida e assina CAs intermediárias. Intermediárias executam emissão cotidiana e permitem segmentação por finalidade, ambiente, região, parceiro ou nível de segurança. Se uma intermediária for comprometida, a organização pode revogá-la e substituí-la sem trocar imediatamente todas as raízes. Essa arquitetura reduz a frequência de uso da chave mais sensível."
  },
  {
    "kind": "paragraph",
    "text": "Cadeias alternativas podem existir por cross-certification ou por intermediárias com mais de um emissor. O mesmo certificado final pode ser validado por caminhos diferentes dependendo do trust store e dos certificados disponíveis. Isso explica por que uma conexão funciona em um cliente e falha em outro. O diagnóstico precisa capturar a cadeia realmente construída, não apenas a cadeia que o servidor pretendia fornecer."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.12 Construção da cadeia versus validação do caminho",
    "id": "8-12-construcao-da-cadeia-versus-validacao-do-caminho"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-07.svg",
    "alt": "Diferença entre construir uma cadeia e validar o caminho",
    "caption": "Figura 8.7 - Diferença entre construir uma cadeia e validar o caminho."
  },
  {
    "kind": "paragraph",
    "text": "Construção de cadeia é o processo de localizar certificados candidatos até uma âncora de confiança. O motor pode usar a cadeia enviada pelo peer, certificados locais, caches, AIA e regras próprias de seleção. O resultado é um ou mais caminhos candidatos. A ordem recebida nem sempre é a ordem usada, e certificados extras podem ser ignorados ou introduzir caminhos inesperados."
  },
  {
    "kind": "paragraph",
    "text": "Validação de caminho aplica regras ao caminho escolhido: verifica assinaturas, validade temporal, Basic Constraints, Key Usage, EKU, políticas, Name Constraints, extensões críticas e, conforme a política local, status de revogação. Depois disso, a aplicação ainda verifica identidade do serviço, como hostname, e regras de negócio. Uma cadeia criptograficamente correta pode ser inadequada para serverAuth, clientAuth ou para a identidade solicitada."
  },
  {
    "kind": "paragraph",
    "text": "A âncora de confiança é uma entrada de configuração, não necessariamente um certificado processado como os demais. Implementações podem representar âncoras como certificados autoassinados ou como nome e chave pública. O importante é compreender que a assinatura da raiz sobre si mesma não é o fundamento da confiança; o fundamento é a decisão administrativa de confiar naquela chave sob determinados parâmetros."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.13 Emissão, CSR e prova de posse",
    "id": "8-13-emissao-csr-e-prova-de-posse"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-08.svg",
    "alt": "Ciclo de vida operacional de um certificado",
    "caption": "Figura 8.8 - Ciclo de vida operacional de um certificado."
  },
  {
    "kind": "paragraph",
    "text": "A emissão começa com a geração do par de chaves no local de custódia definido. Sempre que possível, a chave privada deve nascer no componente que a utilizará ou em HSM/KMS, evitando transporte. Em seguida, o titular produz uma Certificate Signing Request, normalmente PKCS #10. O CSR contém informações de solicitação, chave pública, atributos e uma assinatura gerada com a chave privada correspondente."
  },
  {
    "kind": "paragraph",
    "text": "A assinatura do CSR demonstra posse da chave privada de assinatura associada, mas não prova a identidade declarada. A RA ou CA precisa autenticar o solicitante e validar nomes, organização, domínio, aplicação ou dispositivo conforme a política. A CA também não deve aceitar cegamente Basic Constraints, EKU ou SAN solicitados. Ela emite um certificado segundo um perfil e uma autorização, podendo modificar ou rejeitar atributos."
  },
  {
    "kind": "paragraph",
    "text": "Após emissão, o certificado e a cadeia são instalados no serviço, enquanto a chave privada permanece protegida. A implantação deve verificar correspondência entre chave e certificado, cadeia completa, permissões, alias, formato e senha. A operação continua com inventário, monitoramento de expiração, renovação, rotação, revogação e destruição segura. Um certificado esquecido em um listener secundário pode causar indisponibilidade mesmo que o certificado principal tenha sido renovado."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de geração de chave e CSR para laboratório:"
  },
  {
    "kind": "code",
    "text": "openssl req -new -newkey rsa:3072 -nodes \\\n-keyout api.key -out api.csr \\\n-subj '/C=BR/O=Exemplo/CN=api.exemplo.com' \\\n-addext 'subjectAltName=DNS:api.exemplo.com,DNS:api-interno.exemplo.com'"
  },
  {
    "kind": "paragraph",
    "text": "O uso de -nodes deixa a chave sem criptografia no arquivo e é apropriado apenas para laboratório controlado. Em produção, a proteção depende do modelo operacional: senha, ACL, secret manager, keystore, HSM ou identidade gerenciada. Automatizar não significa armazenar chaves em texto claro indiscriminadamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.14 Perfis de certificado e separação de finalidades",
    "id": "8-14-perfis-de-certificado-e-separacao-de-finalidades"
  },
  {
    "kind": "paragraph",
    "text": "Um perfil define campos, extensões, algoritmos, tamanhos de chave, duração, nomes permitidos e processo de validação para uma finalidade. Perfis comuns incluem CA raiz, CA intermediária, TLS server, TLS client, assinatura de código, assinatura de documentos e OCSP responder. Separar perfis reduz permissões e facilita auditoria. Uma única CA emitindo qualquer tipo de certificado aumenta o raio de impacto de erros de política."
  },
  {
    "kind": "paragraph",
    "text": "Certificados de pessoa, aplicação e dispositivo podem usar estruturas semelhantes, mas exigem fontes de identidade diferentes. Um certificado de workload pode ser emitido automaticamente com validade curta. Um certificado de parceiro externo pode exigir contrato e validação organizacional. Um certificado de administrador pode exigir proteção em token físico. A tecnologia X.509 não determina sozinha o nível de confiança; o perfil e o processo de emissão fornecem o contexto."
  },
  {
    "kind": "paragraph",
    "text": "Em arquitetura corporativa, separe ao menos ambientes de produção e não produção, usos de servidor e cliente, e autoridades de emissão cotidiana das raízes. Quando parceiros precisam confiar apenas em uma parte da organização, uma intermediária dedicada e restrita é mais segura do que distribuir uma raiz corporativa ampla."
  },
  {
    "kind": "table",
    "caption": "Perfis de certificado e cuidados operacionais.",
    "headers": [
      "Perfil",
      "Campos/extensões típicos",
      "Cuidado principal"
    ],
    "rows": [
      [
        "CA raiz",
        "CA=TRUE, keyCertSign, cRLSign, vida longa",
        "Chave offline, cerimônia, backups e auditoria rigorosa."
      ],
      [
        "CA intermediária",
        "CA=TRUE, pathLen e restrições",
        "Limitar namespace e finalidade; facilitar substituição."
      ],
      [
        "TLS servidor",
        "SAN, serverAuth, CA=FALSE",
        "Nome correto, cadeia completa e rotação sem parada."
      ],
      [
        "TLS cliente",
        "clientAuth, identidade de workload/parceiro",
        "Mapeamento para autorização e revogação rápida."
      ],
      [
        "OCSP responder",
        "OCSPSigning",
        "Delegação e proteção contra respostas indevidas."
      ],
      [
        "Assinatura de código",
        "codeSigning",
        "Custódia forte e evidência temporal de assinatura."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.15 Validação de certificado de servidor TLS",
    "id": "8-15-validacao-de-certificado-de-servidor-tls"
  },
  {
    "kind": "paragraph",
    "text": "O cliente recebe a cadeia durante o handshake e precisa verificar se há caminho até uma âncora confiável, se cada assinatura é válida, se os certificados estão dentro da validade e se as CAs estão autorizadas. Em seguida, valida o uso de servidor e compara o identificador solicitado com SAN. Se qualquer etapa falha, prosseguir silenciosamente elimina a proteção contra personificação."
  },
  {
    "kind": "paragraph",
    "text": "SNI influencia qual certificado o servidor apresenta. Um teste sem SNI pode receber o certificado padrão e gerar um falso diagnóstico de hostname. Proxies e gateways podem terminar TLS e iniciar uma nova conexão com backend; nesse caso, existem validações independentes. O certificado visto pelo cliente externo não é necessariamente o certificado apresentado pelo backend ao gateway."
  },
  {
    "kind": "paragraph",
    "text": "Em clientes de máquina, é comum desativar validação para “resolver” ambientes de teste. Essa prática tende a migrar para produção. A solução correta é instalar a CA apropriada em um trust store delimitado, emitir certificado com SAN correto e ajustar relógio e cadeia. Trust-all transforma TLS em cifragem sem autenticação do destino."
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 \\\n-servername api.exemplo.com -showcerts -verify_return_error"
  },
  {
    "kind": "paragraph",
    "text": "Esse comando mostra a cadeia enviada, o certificado selecionado pelo SNI, detalhes de handshake e resultado de verificação. Ele não substitui o comportamento exato de todas as bibliotecas, mas ajuda a separar conectividade, negociação TLS e validação de certificado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.16 Certificados de cliente e mTLS",
    "id": "8-16-certificados-de-cliente-e-mtls"
  },
  {
    "kind": "paragraph",
    "text": "No TLS unilateral, apenas o servidor apresenta certificado. No mTLS, o servidor solicita certificado do cliente e valida a cadeia apresentada. A chave privada permanece no cliente e participa da prova criptográfica durante o handshake. O certificado pode identificar uma aplicação, parceiro ou dispositivo, oferecendo autenticação forte no canal."
  },
  {
    "kind": "paragraph",
    "text": "Autenticação não é autorização. Após validar o certificado, o gateway deve mapear a identidade para uma política: subject, SAN, fingerprint, serial, emissor, cadeia, OID ou cadastro interno. Confiar em qualquer certificado emitido por uma CA ampla pode conceder acesso a titulares não previstos. Uma CA de clientes dedicada, EKU clientAuth, Name Constraints e registros de parceiros reduzem esse risco."
  },
  {
    "kind": "paragraph",
    "text": "A rotação de mTLS exige sobreposição. Durante um período, o servidor pode precisar aceitar certificado antigo e novo ou confiar em duas intermediárias. O cliente deve instalar nova chave e certificado antes da retirada do antigo. O processo precisa considerar rollback, múltiplas instâncias, caches, sessões TLS e parceiros que atualizam em velocidades diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.17 Revogação por CRL",
    "id": "8-17-revogacao-por-crl"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-09.svg",
    "alt": "Principais modelos de obtenção de status de certificado",
    "caption": "Figura 8.9 - Principais modelos de obtenção de status de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Uma Certificate Revocation List é assinada por uma CA ou emissor autorizado e contém certificados revogados identificados por serial, datas e motivos. A parte confiante baixa a CRL, verifica assinatura e validade da lista e consulta o serial. CRLs permitem processamento local e podem funcionar em ambientes desconectados, mas crescem com o número de revogações e possuem intervalo entre publicações."
  },
  {
    "kind": "paragraph",
    "text": "Delta CRLs podem carregar apenas mudanças desde uma CRL base. Distribution Points permitem particionar listas por escopo. O projeto precisa definir periodicidade, nextUpdate, cache, indisponibilidade e comportamento quando a CRL expira. Uma CRL acessível por HTTP não precisa ser secreta, mas sua autenticidade depende da assinatura. A disponibilidade do repositório pode se tornar dependência crítica."
  },
  {
    "kind": "paragraph",
    "text": "Motivos de revogação incluem comprometimento de chave, mudança de afiliação, substituição e cessação de operação. Alguns motivos afetam análise de incidente, mas o consumidor normalmente precisa, no mínimo, distinguir válido, revogado e status indeterminado. Revogar uma intermediária pode invalidar um grande conjunto de certificados e requer coordenação com trust stores e cadeias alternativas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.18 OCSP, stapling e certificados de curta duração",
    "id": "8-18-ocsp-stapling-e-certificados-de-curta-duracao"
  },
  {
    "kind": "paragraph",
    "text": "OCSP permite consultar o status de um certificado específico sem transferir uma CRL inteira. A solicitação identifica emissor e serial; a resposta assinada informa good, revoked ou unknown, com tempos de produção e validade. Good significa que o responder não conhece revogação aplicável segundo seu escopo; não é uma afirmação universal de que a identidade ou todos os demais requisitos são válidos."
  },
  {
    "kind": "paragraph",
    "text": "Consultas OCSP diretas criam dependência de disponibilidade e podem revelar ao responder quais serviços o cliente acessa. OCSP stapling permite ao servidor obter uma resposta e entregá-la durante o handshake, reduzindo latência e exposição do cliente. A parte confiante precisa verificar assinatura, tempos e correspondência da resposta. Políticas de soft-fail melhoram disponibilidade, mas podem aceitar um certificado quando o serviço de status está indisponível; hard-fail aumenta segurança de revogação e risco de indisponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Certificados de curta duração reduzem a janela de exposição e podem operar sem informação de revogação em perfis específicos. A RFC 9608 define uma extensão para indicar ausência de revogação disponível em certos certificados. Esse modelo exige automação confiável: se a renovação falha, a expiração chega rapidamente. A decisão entre revogação online e curta duração depende do tempo de detecção, tempo de distribuição, criticidade, disponibilidade e capacidade de automação."
  },
  {
    "kind": "subhead",
    "text": "Situação da Web PKI em julho de 2026"
  },
  {
    "kind": "paragraph",
    "text": "Os requisitos públicos do CA/Browser Forum passaram a limitar certificados TLS de assinante emitidos desde 15 de março de 2026 a no máximo 200 dias. O cronograma oficial prevê 100 dias a partir de 15 de março de 2027 e 47 dias a partir de 15 de março de 2029. Esses limites se aplicam à Web PKI pública; PKIs privadas devem definir prazos próprios, mas a tendência reforça automação e inventário."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.19 Formatos e contêineres: DER, PEM, PKCS #12 e JKS",
    "id": "8-19-formatos-e-conteineres-der-pem-pkcs-12-e-jks"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-10.svg",
    "alt": "Formatos comuns de certificados, cadeias e chaves",
    "caption": "Figura 8.10 - Formatos comuns de certificados, cadeias e chaves."
  },
  {
    "kind": "paragraph",
    "text": "DER é a codificação binária do objeto ASN.1. PEM representa DER em Base64 com cabeçalhos textuais. Arquivos .cer ou .crt podem conter DER ou PEM; a extensão não determina o formato. Um arquivo PEM também pode conter múltiplos certificados, uma chave privada, parâmetros ou um CSR. Sempre inspecione o conteúdo em vez de confiar no nome."
  },
  {
    "kind": "paragraph",
    "text": "PKCS #12, normalmente .p12 ou .pfx, é um contêiner que pode transportar chave privada, certificado final e cadeia, protegido por senha e mecanismos de integridade. É comum em Windows, navegadores, Java e produtos de gateway. Uma importação pode falhar por algoritmo de proteção não suportado, senha, alias, ausência da chave privada ou cadeia incompleta."
  },
  {
    "kind": "paragraph",
    "text": "JKS é um formato tradicional de keystore Java. Versões modernas de Java também usam PKCS #12 como padrão. Truststore e keystore possuem papéis conceituais diferentes: o primeiro contém âncoras ou certificados confiáveis; o segundo contém identidades locais e chaves privadas, embora ferramentas possam armazenar ambos. PKCS #11 não é um formato de arquivo, mas uma interface para módulos criptográficos, como HSMs e tokens."
  },
  {
    "kind": "code",
    "text": "# Inspecionar certificado\nopenssl x509 -in api.crt -noout -text"
  },
  {
    "kind": "code",
    "text": "# Inspecionar CSR e verificar sua assinatura\nopenssl req -in api.csr -noout -text -verify"
  },
  {
    "kind": "code",
    "text": "# Inspecionar um PKCS#12 sem exportar a chave\nopenssl pkcs12 -in identidade.p12 -info -nokeys"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.20 Custódia da chave privada e HSM",
    "id": "8-20-custodia-da-chave-privada-e-hsm"
  },
  {
    "kind": "paragraph",
    "text": "O certificado é público; a chave privada é o ativo sensível. Quem obtém a chave pode personificar o titular, assinar mensagens ou estabelecer sessões conforme o uso autorizado. A proteção precisa considerar geração, armazenamento, uso, backup, transporte, rotação, recuperação e destruição. Permissões de arquivo são apenas uma camada e podem ser insuficientes para chaves de CA ou serviços críticos."
  },
  {
    "kind": "paragraph",
    "text": "HSMs protegem chaves em hardware ou módulos validados e executam operações sem exportar o material privado. KMSs fornecem gestão central, políticas, auditoria e integração, podendo usar HSM por baixo. Para raízes, são comuns cerimônias, autenticação multifator, quorum e operação offline. Para workloads, automação e identidades de máquina reduzem cópias manuais e segredos estáticos."
  },
  {
    "kind": "paragraph",
    "text": "Backup de chave de CA é diferente de backup de chave efêmera de serviço. Perder uma chave de CA pode impedir emissão, revogação ou continuidade; copiá-la excessivamente aumenta risco. Chaves de assinatura podem exigir arquivamento conforme política, enquanto chaves usadas para confidencialidade histórica podem demandar recuperação. Cada tipo de chave precisa de uma estratégia compatível com seu propósito e período criptográfico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.21 PKI pública, PKI privada e confiança explícita",
    "id": "8-21-pki-publica-pki-privada-e-confianca-explicita"
  },
  {
    "kind": "paragraph",
    "text": "A Web PKI pública é voltada a nomes publicamente verificáveis e confiança distribuída por root stores de navegadores e sistemas. CAs públicas seguem requisitos do CA/Browser Forum e programas de root stores. Uma PKI privada atende identidades internas, mTLS, dispositivos e workloads, com raízes distribuídas pela própria organização. Certificados privados não se tornam confiáveis externamente apenas por usar X.509."
  },
  {
    "kind": "paragraph",
    "text": "A vantagem da PKI pública é interoperabilidade com clientes comuns. A privada oferece controle de namespace, perfil, validade e emissão. O custo é distribuir e governar confiança. Instalar uma raiz privada no sistema inteiro concede poder amplo à CA sobre muitos protocolos; quando possível, use trust stores específicos por aplicação e intermediárias restritas."
  },
  {
    "kind": "paragraph",
    "text": "Certificados autoassinados de serviço podem funcionar quando a chave é distribuída por um canal confiável e fixada explicitamente, mas não escalam bem. Eles confundem rotação, inventário e validação. Uma CA privada permite renovar certificados mantendo a âncora, separar funções e revogar. Entretanto, uma CA privada mal protegida pode ampliar o impacto em vez de reduzi-lo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.22 Certificate Transparency, CAA e ACME",
    "id": "8-22-certificate-transparency-caa-e-acme"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Transparency cria logs públicos append-only para certificados da Web PKI, permitindo detectar emissões indevidas e aumentar auditabilidade. Precertificates e Signed Certificate Timestamps fazem parte desse ecossistema. CT não substitui validação de cadeia ou revogação, mas torna emissões observáveis e permite monitoramento de domínios."
  },
  {
    "kind": "paragraph",
    "text": "CAA é um registro DNS pelo qual o titular de um domínio pode indicar quais CAs estão autorizadas a emitir certificados para ele. A CA pública consulta CAA segundo os requisitos aplicáveis. CAA reduz certas emissões indevidas, mas não protege uma chave privada já comprometida e não substitui controle do domínio ou monitoramento."
  },
  {
    "kind": "paragraph",
    "text": "ACME, definido na RFC 8555, automatiza criação de conta, pedidos, desafios, finalização e obtenção de certificados. Desafios demonstram controle sobre identificadores. A automação reduz erros manuais e permite prazos curtos, mas credenciais de conta, permissões DNS, agentes e pipelines tornam-se ativos críticos. Um invasor com acesso ao mecanismo de validação pode emitir certificados legítimos para uso malicioso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.23 Rotação sem indisponibilidade",
    "id": "8-23-rotacao-sem-indisponibilidade"
  },
  {
    "kind": "paragraph",
    "text": "Rotação não é apenas substituir um arquivo. É preciso identificar todos os pontos que terminam TLS ou apresentam certificado: load balancers, listeners do gateway, ingress controllers, backends, jobs, clientes e ambientes de recuperação. O inventário deve registrar titular, emissor, SAN, serial, fingerprint, validade, local, proprietário e processo de renovação."
  },
  {
    "kind": "paragraph",
    "text": "Uma estratégia segura usa sobreposição. Para certificados de servidor, implante o novo certificado e confirme que todas as instâncias o apresentam antes de retirar o antigo. Para mudança de CA, distribua primeiro a nova âncora ou intermediária aos consumidores; depois emita e apresente a nova cadeia; por último remova confiança antiga. Inverter a ordem causa falhas de cadeia. Automação precisa de observabilidade. Monitorar apenas a data de expiração no repositório não garante que o listener ativo foi atualizado. Testes externos devem abrir handshake, verificar serial e cadeia e cobrir cada endpoint e região. Alertas devem considerar tempo de correção, janelas de mudança e dependências de parceiros, não apenas avisar no último dia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.24 Certificados em API Gateways e múltiplos saltos TLS",
    "id": "8-24-certificados-em-api-gateways-e-multiplos-saltos-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-11.svg",
    "alt": "Certificados e trust stores independentes em cada salto de uma arquitetura de APIs",
    "caption": "Figura 8.11 - Certificados e trust stores independentes em cada salto de uma arquitetura de APIs."
  },
  {
    "kind": "paragraph",
    "text": "Em uma arquitetura com cliente, balanceador, API Gateway e backend, cada conexão TLS é independente. O balanceador pode apresentar um certificado ao cliente e usar outra identidade para falar com o gateway. O gateway pode validar a CA do backend e, em mTLS, apresentar seu próprio certificado de cliente. Diagnosticar “o certificado da API” sem indicar o salto leva a conclusões erradas."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, políticas podem verificar cadeias, consultar CRLs e aplicar filtros de validação. O produto também mantém certificados e chaves usados por listeners, assinatura e conexões de saída. A configuração deve separar certificados confiáveis de identidades com chave privada, definir fontes de revogação e proteger o material criptográfico. Logs devem indicar em qual filtro e em qual estágio a validação falhou."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, certificados podem ser usados para autenticar clientes no tráfego de entrada, autenticar o APIM perante backends e adicionar CAs personalizadas para validação de backend. Políticas podem examinar propriedades do certificado apresentado. Em topologias com Application Gateway ou outro proxy à frente, é essencial saber onde o TLS termina e se o certificado do cliente chega criptograficamente ao APIM ou é transformado em metadado confiável por uma camada anterior."
  },
  {
    "kind": "subhead",
    "text": "Princípio operacional"
  },
  {
    "kind": "paragraph",
    "text": "Nunca trate subject, fingerprint ou um cabeçalho com certificado como prova suficiente sem assegurar a autenticidade do canal que transporta essa informação. Quando um proxy termina mTLS, o salto seguinte precisa autenticar o proxy e proteger o metadado contra injeção ou sobrescrita."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.25 Troubleshooting estruturado",
    "id": "8-25-troubleshooting-estruturado"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/pt/figure-12.svg",
    "alt": "Árvore inicial para diagnóstico de falhas de certificado",
    "caption": "Figura 8.12 - Árvore inicial para diagnóstico de falhas de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Comece identificando o papel e o salto: certificado do servidor externo, certificado de cliente, certificado do gateway para backend ou certificado de uma CA. Capture o hostname, SNI, porta, cadeia recebida, trust store efetivo, horário do sistema e política de revogação. Mensagens genéricas como unable to get local issuer certificate ou certificate unknown descrevem sintomas, não necessariamente a causa raiz."
  },
  {
    "kind": "paragraph",
    "text": "Falhas de tempo incluem certificado expirado, ainda não válido, CRL ou OCSP fora da janela e relógio incorreto. Falhas de identidade incluem SAN ausente, wildcard incompatível, acesso por IP e SNI errado. Falhas de cadeia incluem intermediária não enviada, raiz ausente, AKI/SKI incompatível, assinatura inválida e caminho alternativo não confiável. Falhas de uso incluem Basic Constraints, Key Usage, EKU ou extensão crítica não suportada."
  },
  {
    "kind": "paragraph",
    "text": "Depois de reproduzir, compare o comportamento entre ferramentas. OpenSSL pode usar um conjunto de raízes diferente da JVM, do Windows ou do appliance. Um teste que funciona com -CAfile explícito prova que a cadeia pode ser validada com aquela âncora, não que o produto está configurado para usá-la. Verifique também se o certificado e a chave privada correspondem e se a instância ativa carregou a versão nova."
  },
  {
    "kind": "table",
    "caption": "Sintomas frequentes de certificado e verificações iniciais.",
    "headers": [
      "Sintoma",
      "Causas prováveis",
      "Verificação"
    ],
    "rows": [
      [
        "Hostname mismatch",
        "SAN incorreto, SNI errado, acesso por IP.",
        "Inspecionar SAN e repetir handshake com SNI correto."
      ],
      [
        "Unknown CA",
        "Raiz ausente, trust store errado, CA privada.",
        "Listar âncoras efetivas e validar com CAfile explícito."
      ],
      [
        "Unable to get issuer",
        "Intermediária não enviada ou AIA inacessível.",
        "Examinar cadeia entregue e instalar intermediária."
      ],
      [
        "Certificate expired",
        "Listener ainda usa versão antiga ou relógio errado.",
        "Conferir serial apresentado por cada instância e horário."
      ],
      [
        "Unsupported certificate purpose",
        "EKU/KU incompatível.",
        "Inspecionar extensões e perfil de emissão."
      ],
      [
        "Revocation check failed",
        "CRL/OCSP indisponível, expirado ou resposta inválida.",
        "Testar endpoint, cache, nextUpdate e política de fail."
      ],
      [
        "Private key mismatch",
        "Certificado importado sem a chave correspondente.",
        "Comparar chave pública derivada e alias do keystore."
      ]
    ]
  },
  {
    "kind": "code",
    "text": "# Validar cadeia com raiz e intermediária explícitas\nopenssl verify -CAfile raiz.pem -untrusted intermediaria.pem servidor.pem"
  },
  {
    "kind": "code",
    "text": "# Mostrar datas, serial, emissor, subject e SAN\nopenssl x509 -in servidor.pem -noout \\\n-dates -serial -issuer -subject -ext subjectAltName"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.26 Estudos de caso",
    "id": "8-26-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - cadeia incompleta após renovação. Um gateway recebe um novo certificado de servidor emitido por outra intermediária. A equipe substitui apenas o certificado final, mas mantém a cadeia antiga. Navegadores que recuperam a intermediária por AIA funcionam; um parceiro Java falha. A correção é instalar e apresentar a nova cadeia, validar em clientes sem AIA e inventariar a associação entre certificado final e intermediárias."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - mTLS válido, autorização indevida. O gateway confia em uma CA corporativa que emite certificados para milhares de usuários e aplicações. A política aceita qualquer cadeia válida e usa apenas o organizationName. Um certificado legítimo, mas não destinado ao parceiro, ganha acesso. A solução envolve CA ou intermediária dedicada, EKU clientAuth, SAN ou identificador estável, cadastro de autorização e revogação operacional."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - renovação de backend causa 502. O certificado do backend muda de uma CA pública para uma CA privada. O gateway continua com trust store antigo e rejeita o handshake de saída. Para o cliente, o sintoma é erro de gateway. A análise precisa separar TLS de entrada e saída, capturar o erro do backend, instalar a nova CA com antecedência e manter sobreposição durante a migração."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - certificado aparentemente expirado. O repositório contém o certificado novo, mas uma instância do cluster não recarregou a configuração e continua apresentando o antigo. Monitores alternam entre sucesso e falha. A solução é verificar serial e fingerprint por nó, remover instância inconsistente, corrigir rollout e incluir teste ativo de handshake no processo de implantação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.27 Laboratórios práticos",
    "id": "8-27-laboratorios-praticos"
  },
  {
    "kind": "paragraph",
    "text": "Laboratório 1 - leitura de certificado. Obtenha um certificado de laboratório, execute openssl x509 -text e identifique versão, serial, algoritmo de assinatura, issuer, validade, subject, chave pública, SAN, Basic Constraints, KU, EKU, SKI, AKI, AIA e CRL Distribution Points. Explique qual identidade é afirmada e quais usos são permitidos."
  },
  {
    "kind": "paragraph",
    "text": "Laboratório 2 - CA privada simples. Em ambiente descartável, crie uma raiz e uma intermediária, emita um certificado de servidor com SAN e valide a cadeia. Compare validação quando a intermediária é omitida. Não reutilize as chaves de laboratório em sistemas reais; o objetivo é observar estrutura e fluxo, não construir uma PKI de produção."
  },
  {
    "kind": "paragraph",
    "text": "Laboratório 3 - erro de hostname. Emita um certificado para api.lab.local e apresente-o em um serviço acessado por outro nome. Observe que a cadeia pode ser confiável e a assinatura correta, mas a identidade falha. Depois, repita com SAN correto. Registre a diferença entre confiança no emissor e correspondência do nome."
  },
  {
    "kind": "paragraph",
    "text": "Laboratório 4 - PKCS #12. Empacote chave, certificado final e intermediária em um .p12. Importe em um keystore de teste, liste aliases e confirme se a entrada contém chave privada. Crie uma versão sem a intermediária e compare o comportamento do servidor. Esse exercício reproduz uma causa comum de falhas após renovação. Laboratório 5 - diagnóstico de endpoint. Use s_client com SNI, capture a cadeia e execute verify com um trust store explícito. Compare o resultado com curl ou uma JVM. Documente qual trust store cada ferramenta usa e por que resultados podem divergir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Certificado digital associa uma chave pública a identidade, período, usos e restrições sob assinatura de um emissor.",
      "PKI inclui governança, validação de identidade, CAs, RAs, repositórios, auditoria, proteção de chaves e resposta a incidentes.",
      "X.509 v3 usa extensões para nomes, autoridade, usos, políticas, encadeamento e status; extensões críticas desconhecidas invalidam o caminho.",
      "Construir uma cadeia é localizar um caminho; validar é aplicar assinaturas, tempo, restrições, usos, políticas, nomes e revogação.",
      "A confiança na raiz é administrativa. O fato de um certificado raiz ser autoassinado não cria confiança automaticamente.",
      "CSR prova posse da chave correspondente, mas não prova a identidade declarada; a CA deve aplicar validação e perfil.",
      "CRL, OCSP, stapling e certificados curtos representam diferentes compromissos entre atualização, privacidade e disponibilidade.",
      "DER, PEM, PKCS #12 e JKS têm papéis diferentes; extensão de arquivo não garante conteúdo nem presença de chave privada.",
      "Em gateways, cada salto TLS possui identidade, cadeia e trust store próprios. Troubleshooting deve nomear o salto exato.",
      "Rotação segura depende de inventário, sobreposição, automação, observabilidade e testes do certificado efetivamente apresentado."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de revisão",
    "id": "exercicios-de-revisao"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por que uma chave pública isolada não é suficiente para autenticar um servidor.",
      "Diferencie CA, RA, titular, parte confiante e repositório.",
      "Quais partes de um certificado são assinadas pela CA?",
      "Explique a diferença entre X.509, ASN.1, DER e PEM.",
      "Por que SAN é essencial para validação de hostname?",
      "Qual é a diferença entre Basic Constraints, Key Usage e Extended Key Usage?",
      "Como SKI e AKI auxiliam a construção da cadeia?",
      "Por que encontrar uma cadeia até uma raiz não significa que o certificado é válido?",
      "O que uma assinatura de CSR prova e o que ela não prova?",
      "Compare CRL, OCSP, OCSP stapling e certificados de curta duração.",
      "Por que a raiz normalmente não deve ser enviada pelo servidor durante o handshake?",
      "Qual é a diferença entre truststore e keystore?",
      "Descreva uma estratégia de rotação quando a CA intermediária também será substituída.",
      "Em mTLS, por que validar a cadeia não é suficiente para autorizar a chamada?",
      "Um certificado possui cadeia válida, serverAuth e validade correta, mas o acesso falha por hostname. Explique.",
      "Como um load balancer à frente de um gateway altera a análise de certificados?",
      "Quais riscos surgem quando uma organização instala sua raiz privada no trust store global dos servidores?",
      "Monte um checklist para diagnosticar unable to get local issuer certificate.",
      "Explique por que monitorar apenas arquivos no repositório não garante renovação bem-sucedida.",
      "Proponha uma arquitetura de CAs para produção, homologação, certificados de servidor e certificados de cliente."
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
    "caption": "Glossário de certificados digitais, PKI e X.509.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "AKI",
        "Authority Key Identifier; ajuda a identificar a chave do emissor."
      ],
      [
        "Âncora de confiança",
        "Chave ou certificado configurado como ponto inicial de confiança."
      ],
      [
        "CA",
        "Certification Authority; entidade que assina certificados e dados de status."
      ],
      [
        "CRL",
        "Lista assinada de certificados revogados."
      ],
      [
        "CSR",
        "Solicitação de certificado que inclui chave pública e prova de posse."
      ],
      [
        "DER",
        "Codificação binária determinística para estruturas ASN.1."
      ],
      [
        "DN",
        "Distinguished Name composto por atributos de nome."
      ],
      [
        "EKU",
        "Extended Key Usage; finalidades de aplicação autorizadas."
      ],
      [
        "HSM",
        "Módulo que protege chaves e executa operações criptográficas."
      ],
      [
        "OCSP",
        "Protocolo de consulta online de status de certificado."
      ],
      [
        "OID",
        "Identificador numérico de objeto usado em algoritmos, extensões e políticas."
      ],
      [
        "PEM",
        "Representação textual Base64 com cabeçalhos."
      ],
      [
        "PKCS #12",
        "Contêiner que pode armazenar chave privada, certificado e cadeia."
      ],
      [
        "RA",
        "Registration Authority; valida dados e aprova emissão."
      ],
      [
        "SAN",
        "Subject Alternative Name; nomes e identificadores vinculados ao certificado."
      ],
      [
        "SKI",
        "Subject Key Identifier; identificador da chave pública do certificado."
      ],
      [
        "Trust store",
        "Conjunto de âncoras e certificados confiáveis para validação."
      ],
      [
        "X.509",
        "Padrão de certificados, CRLs e estruturas relacionadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências oficiais e leituras recomendadas",
    "id": "referencias-oficiais-e-leituras-recomendadas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile",
      "RFC 6818 - Updates to RFC 5280",
      "RFC 9618 - Updates to X.509 Policy Validation",
      "RFC 2986 - PKCS #10 Certification Request Syntax",
      "RFC 6960 - Online Certificate Status Protocol",
      "RFC 9608 - No Revocation Available for X.509 Certificates",
      "RFC 8555 - Automatic Certificate Management Environment",
      "RFC 9162 - Certificate Transparency Version 2.0",
      "RFC 8659 - DNS Certification Authority Authorization",
      "NIST SP 800-57 Part 1 Rev. 5 - Recommendation for Key Management",
      "CA/Browser Forum - Baseline Requirements for TLS Server Certificates",
      "Microsoft - Secure APIs using client certificate authentication in API Management",
      "Microsoft - Secure API Management backend using client certificates",
      "Microsoft - Add a custom CA certificate to API Management",
      "Axway - Certificate validation filters",
      "Axway - API Gateway administration and certificate chain checks"
    ]
  },
  {
    "kind": "subhead",
    "text": "Observação sobre atualização normativa"
  },
  {
    "kind": "paragraph",
    "text": "A RFC 5280 permanece a base do perfil PKIX, mas recebe atualizações e interage com padrões posteriores. Requisitos da Web PKI e documentações de produtos mudam ao longo do tempo. Ao aplicar o conteúdo em produção, confirme a versão vigente das políticas da CA, do CA/Browser Forum, do runtime e do gateway utilizado."
  }
];
