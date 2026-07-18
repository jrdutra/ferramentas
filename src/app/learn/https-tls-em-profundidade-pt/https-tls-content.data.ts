import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.
export const HTTPS_TLS_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-01-https-stack.svg",
    "alt": "HTTPS como HTTP executado sobre TLS e TCP na pilha de comunicação",
    "caption": "Figura 6.1 - HTTPS como composicao de HTTP sobre TLS e TCP."
  },
  {
    "kind": "paragraph",
    "text": "Este capitulo explica como o TLS protege chamadas de API, como HTTPS e construido, como certificados e cadeias de confianca funcionam, quais diferencas importam entre TLS 1.2 e TLS 1.3, e como esses conceitos aparecem em API Gateways corporativos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos do capitulo",
    "id": "objetivos-do-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Compreender a diferenca entre HTTP, HTTPS, TLS, SSL, certificado digital, chave privada e cadeia de confianca.",
      "Entender os objetivos de seguranca do TLS: confidencialidade, integridade, autenticacao e, quando bem configurado, forward secrecy.",
      "Ler o fluxo de handshake do TLS 1.2 e do TLS 1.3 sem tratar o processo como uma caixa-preta.",
      "Identificar o papel de SNI, ALPN, cipher suites, extensoes TLS, certificados X.509, truststores, keystores e rotacao de certificados.",
      "Entender modos de implantacao em gateways: TLS termination, TLS re-encryption, TLS pass-through e mTLS.",
      "Diagnosticar erros comuns de TLS em API Gateways, balanceadores, proxies, redes privadas e backends corporativos."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Mapa mental do capitulo",
    "id": "mapa-mental-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "TLS nao deve ser estudado apenas como \"aquele cadeado do navegador\". Em APIs corporativas, ele participa de decisoes de arquitetura, operacao, seguranca, observabilidade e governanca. Um problema de TLS pode impedir que a requisicao chegue ao gateway; pode fazer o gateway rejeitar um cliente; pode impedir que o gateway confie no backend; ou pode criar uma falsa sensacao de seguranca quando a conexao e criptografada, mas a identidade do servidor nao e validada corretamente."
  },
  {
    "kind": "paragraph",
    "text": "Este capitulo segue uma ordem pratica: primeiro explicamos o problema que o TLS resolve; depois analisamos os componentes criptograficos; em seguida abrimos o handshake; depois entramos nos certificados; por fim aplicamos tudo ao mundo de API Gateways, incluindo troubleshooting e operacao. O objetivo nao e decorar comandos, mas construir um modelo mental que permita diagnosticar falhas e desenhar configuracoes seguras."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "O problema que o HTTPS resolve",
    "id": "o-problema-que-o-https-resolve"
  },
  {
    "kind": "paragraph",
    "text": "Na Internet original, protocolos de aplicacao como HTTP trafegavam em texto claro. Isso significa que qualquer intermediario capaz de observar os pacotes poderia ler metodos, URIs, cabecalhos, cookies, tokens, dados pessoais e respostas. Em uma rede corporativa moderna, o caminho entre cliente e servidor pode atravessar Wi-Fi, proxies, balanceadores, firewalls, provedores, redes privadas, NATs, links dedicados e ambientes de nuvem. Sem uma camada criptografica, cada um desses pontos poderia ser um local de interceptacao ou alteracao de dados."
  },
  {
    "kind": "paragraph",
    "text": "HTTPS resolve esse problema ao executar HTTP sobre TLS. O HTTP continua definindo a semantica da aplicacao: GET, POST, status 200, status 401, cabecalhos, conteudo, cache e negociacao. O TLS fica abaixo, criando um canal seguro sobre o transporte. Essa separacao e importante porque muitas falhas de APIs sao diagnosticadas no nivel errado. Um erro de certificado, por exemplo, ocorre antes de qualquer policy OAuth ser executada no gateway. Um erro 401, por outro lado, normalmente ocorre depois que o TLS ja foi negociado com sucesso."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes bancarios e de Open Finance, HTTPS nao e apenas uma boa pratica. Ele e parte da superficie minima de protecao para dados sensiveis, tokens, credenciais e operacoes transacionais. Mesmo quando a rede e privada, criptografia de transporte reduz o impacto de configuracoes incorretas, acessos indevidos em segmentos intermediarios e ataques de man-in-the-middle. A pergunta correta nao costuma ser \"precisamos de HTTPS?\", mas sim \"onde o TLS deve terminar, quais identidades serao validadas e como os certificados serao governados?\" Tambem e essencial entender que HTTPS nao autentica o usuario final, nao autoriza a operacao e nao valida regras de negocio. Ele protege o canal e, normalmente, autentica o servidor para o cliente. Autenticacao de usuarios, autorizacao de escopos, validacao de JWT, assinatura de mensagens e consentimento sao camadas superiores. Essa distincao evita um erro frequente: acreditar que uma API esta segura apenas porque responde em HTTPS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS, SSL e a evolucao do protocolo",
    "id": "tls-ssl-e-a-evolucao-do-protocolo"
  },
  {
    "kind": "paragraph",
    "text": "O termo SSL ainda aparece em muitas interfaces, documentacoes e conversas de mercado, mas tecnicamente SSL e uma familia antiga de protocolos. O sucessor moderno e o TLS, Transport Layer Security. SSL 2.0 e SSL 3.0 foram abandonados por problemas de seguranca, e as versoes antigas do TLS tambem passaram a ser desaconselhadas ao longo do tempo. Em documentacao legada de produtos, \"SSL certificate\" muitas vezes significa apenas \"certificado usado em TLS\"."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.0 e TLS 1.1 fizeram parte da historia da Web segura, mas hoje nao devem ser usados em ambientes modernos. TLS 1.2 ainda e amplamente encontrado, especialmente por compatibilidade com clientes antigos, bibliotecas legadas e integracoes B2B. TLS 1.3, definido na RFC 8446, simplificou o protocolo, removeu opcoes inseguras, reduziu latencia do handshake e criptografou mais metadados do processo de negociacao. Isso o torna uma escolha preferencial para novas arquiteturas, quando compatibilidade permite."
  },
  {
    "kind": "paragraph",
    "text": "A evolucao do TLS mostra uma licao importante para arquitetos: configuracao criptografica nao e estatica. Um algoritmo considerado aceitavel em determinado momento pode se tornar inadequado anos depois. Ciphers, versoes, tamanhos de chave, modos de operacao, renegociacao, compressao e protocolos de revogacao evoluem. Por isso, plataformas corporativas precisam de inventario, politica de baseline e processo de revisao periodica."
  },
  {
    "kind": "paragraph",
    "text": "Em API Gateways, essa evolucao aparece de modo concreto. O gateway pode precisar aceitar TLS 1.2 de clientes externos por compatibilidade, mas usar TLS 1.3 em conexoes internas mais modernas. Pode ser necessario desabilitar ciphers antigos, restringir protocolos, alinhar configuracoes com politicas de seguranca corporativa e garantir que balanceadores, WAFs, proxies e backends nao mantenham um elo fraco no caminho."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos de seguranca do TLS",
    "id": "objetivos-de-seguranca-do-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-02-tls-objectives.svg",
    "alt": "Confidencialidade, integridade e autenticidade como objetivos fundamentais do TLS",
    "caption": "Figura 6.2 - Os objetivos fundamentais do TLS."
  },
  {
    "kind": "paragraph",
    "text": "O TLS foi projetado para proteger aplicacoes contra leitura indevida, alteracao de dados e falsificacao de mensagens durante o transporte. Em termos praticos, ele oferece confidencialidade, integridade e autenticacao. Confidencialidade significa que um observador na rede nao deve conseguir ler o conteudo protegido. Integridade significa que uma alteracao nos bytes trafegados deve ser detectada. Autenticacao significa que uma parte consegue verificar a identidade da outra, normalmente o cliente verificando o servidor."
  },
  {
    "kind": "paragraph",
    "text": "Esses objetivos sao atingidos por uma combinacao de criptografia assimetrica, criptografia simetrica, autenticacao de mensagens, derivacao de chaves, certificados e regras de validacao. A criptografia assimetrica e usada durante o handshake para autenticar identidades e estabelecer segredos. Depois, por desempenho, a protecao dos dados de aplicacao usa criptografia simetrica. Essa divisao e fundamental: algoritmos assimetricos sao flexiveis para troca de chaves e assinatura, mas caros; algoritmos simetricos sao eficientes para proteger grandes volumes de dados."
  },
  {
    "kind": "paragraph",
    "text": "Um objetivo adicional muito relevante e forward secrecy. Em configuracoes com troca de chaves efemera, como ECDHE, o comprometimento futuro da chave privada do servidor nao permite descriptografar automaticamente trafego antigo capturado no passado. Isso e crucial para ambientes de alto risco, porque um atacante pode capturar trafego hoje e tentar descriptografar anos depois caso consiga uma chave privada. TLS 1.3 foi desenhado com esse principio de forma muito mais consistente."
  },
  {
    "kind": "paragraph",
    "text": "Apesar de todos esses beneficios, TLS nao protege contra tudo. Ele nao impede que um cliente autorizado abuse da API, nao corrige autorizacao mal desenhada, nao valida payloads, nao substitui rate limiting, nao resolve vazamento de token no cliente e nao protege dados depois que eles sao descriptografados no gateway ou no backend. Em outras palavras, TLS e uma camada necessaria, mas insuficiente, dentro de uma arquitetura de seguranca de APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia simetrica, assimetrica, hashes e AEAD",
    "id": "criptografia-simetrica-assimetrica-hashes-e-aead"
  },
  {
    "kind": "paragraph",
    "text": "Para entender TLS, e necessario entender quatro familias de primitivas criptograficas. A criptografia simetrica usa a mesma chave para cifrar e decifrar. Ela e rapida e adequada para dados de aplicacao. Exemplos modernos incluem AES-GCM e ChaCha20-Poly1305. A criptografia assimetrica usa um par de chaves: uma privada e uma publica. Ela e usada para assinatura, verificacao e estabelecimento de segredos, mas nao para cifrar todo o fluxo de uma API de alto volume."
  },
  {
    "kind": "paragraph",
    "text": "Funcoes de hash produzem um resumo de tamanho fixo a partir de dados de entrada. Em TLS, hashes aparecem em assinaturas, derivacao de chaves e verificacoes de integridade. Um bom hash criptografico deve ser resistente a colisoes e pre-imagens. Entretanto, hash sozinho nao prova identidade nem autenticidade de origem. Para autenticidade, e necessario combinar chave e algoritmo apropriado, como HMAC, ou usar assinaturas digitais com chave privada."
  },
  {
    "kind": "paragraph",
    "text": "AEAD, Authenticated Encryption with Associated Data, e uma construcao moderna que combina confidencialidade e integridade em uma operacao. Em vez de cifrar e depois aplicar um MAC separado de maneira propensa a erros, modos AEAD autenticam o conteudo protegido e dados associados. TLS 1.3 exige o uso de suites AEAD, simplificando o modelo e evitando muitos problemas historicos relacionados a modos antigos."
  },
  {
    "kind": "paragraph",
    "text": "No cotidiano de gateways, essas primitivas aparecem nas listas de cipher suites. Quando um time de seguranca exige remover 3DES, RC4, CBC fraco ou RSA key exchange, a motivacao esta nessa base criptografica. Uma cipher suite nao e apenas um nome comprido: ela representa escolhas sobre algoritmo de troca de chaves, autenticacao, criptografia simetrica e hash. Escolhas ruins podem permitir ataques conhecidos ou reduzir garantias como forward secrecy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Handshake TLS: visao geral",
    "id": "handshake-tls-visao-geral"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-03-tls12-handshake.svg",
    "alt": "Fluxo de mensagens entre cliente e servidor durante um handshake TLS 1.2",
    "caption": "Figura 6.3 - Fluxo simplificado de handshake TLS 1.2."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-04-tls13-handshake.svg",
    "alt": "Fluxo simplificado e reduzido de mensagens durante um handshake TLS 1.3",
    "caption": "Figura 6.4 - Fluxo simplificado de handshake TLS 1.3."
  },
  {
    "kind": "paragraph",
    "text": "O handshake TLS e o processo pelo qual cliente e servidor combinam parametros de seguranca, autenticam identidades e derivam chaves para proteger a comunicacao. Antes do handshake, existe apenas uma conexao de transporte comum, normalmente TCP. Depois do handshake, os dados de aplicacao passam a ser protegidos pelo TLS record protocol. Se o handshake falha, nenhuma requisicao HTTP chega ao servidor de aplicacao ou as policies de gateway."
  },
  {
    "kind": "paragraph",
    "text": "Durante o handshake, o cliente envia um ClientHello com versoes suportadas, suites criptograficas, extensoes e valores aleatorios. Entre as extensoes mais importantes para APIs modernas estao SNI, que informa o nome do servidor pretendido, e ALPN, que permite negociar protocolos de aplicacao como http/1.1 ou h2. O servidor responde escolhendo parametros compatíveis e apresentando um certificado que sera validado pelo cliente."
  },
  {
    "kind": "paragraph",
    "text": "Apos a troca de parametros, as partes derivam chaves de sessao. Essas chaves sao diferentes da chave privada do certificado. A chave privada do servidor nao e usada para cifrar todos os dados; ela e usada para autenticar o handshake, provando que o servidor controla a identidade apresentada. Essa distincao ajuda a entender por que capturar uma chave de sessao compromete uma conexao especifica, enquanto capturar a chave privada compromete a identidade do servidor e, dependendo do protocolo e da configuracao, pode ter impactos mais amplos."
  },
  {
    "kind": "paragraph",
    "text": "Em troubleshooting, a etapa exata do handshake em que ocorreu a falha e extremamente valiosa. Uma falha antes do ServerHello sugere incompatibilidade de versao, ciphers ou extensoes. Uma falha apos o certificado pode indicar problema de cadeia, truststore, nome do host, validade ou revogacao. Uma falha no fim do handshake pode envolver troca de chaves, assinatura, mTLS ou middleboxes interferindo no fluxo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.2 em profundidade operacional",
    "id": "tls-1-2-em-profundidade-operacional"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.2, definido originalmente na RFC 5246 e posteriormente impactado por recomendacoes de seguranca mais novas, continua comum em ambientes corporativos. Ele permite muitas combinacoes de cipher suites e modos de troca de chaves. Essa flexibilidade ajudou na compatibilidade historica, mas tambem tornou configuracoes inseguras mais provaveis. A qualidade de uma instalacao TLS 1.2 depende fortemente do baseline configurado no servidor, no gateway e nos clientes."
  },
  {
    "kind": "paragraph",
    "text": "No TLS 1.2, a escolha da cipher suite carrega mais informacao do que em TLS 1.3. Uma suite pode indicar RSA para troca de chaves, ECDHE para troca efemera, algoritmo de autenticacao, algoritmo simetrico e modo de integridade. Suites com troca de chaves RSA estaticas, por exemplo, nao fornecem forward secrecy do mesmo modo que ECDHE. Por isso, muitas organizacoes restringem TLS 1.2 a suites com ECDHE e AEAD."
  },
  {
    "kind": "paragraph",
    "text": "Outro ponto historico do TLS 1.2 e a renegociacao. A renegociacao foi fonte de problemas e complexidade, especialmente com HTTP/2 e middlewares. Em arquiteturas modernas, deve-se evitar depender de renegociacao para pedir certificado de cliente depois que a conexao ja esta estabelecida. Para mTLS, o desenho mais claro e exigir o certificado no handshake inicial em pontos bem definidos da arquitetura."
  },
  {
    "kind": "paragraph",
    "text": "Em API Gateways, TLS 1.2 aparece quando clientes legados, parceiros externos, mainframes, barramentos antigos ou bibliotecas desatualizadas nao suportam TLS 1.3. Nesses casos, o papel do arquiteto e reduzir a superficie de risco: permitir apenas suites fortes, desabilitar compressao, proibir protocolos obsoletos, validar certificados corretamente e planejar a evolucao dos clientes para um baseline mais moderno."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.3: mudancas essenciais",
    "id": "tls-1-3-mudancas-essenciais"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3, especificado na RFC 8446, nao e apenas uma versao incremental. Ele redesenhou partes importantes do protocolo, removeu algoritmos e modos historicamente problemáticos e reduziu a quantidade de mensagens necessarias para estabelecer uma conexao segura. A ideia central foi manter os objetivos do TLS, mas eliminar opcoes que criavam complexidade e riscos operacionais."
  },
  {
    "kind": "paragraph",
    "text": "Uma diferenca importante e que TLS 1.3 criptografa mais partes do handshake. Apos o ServerHello, muitas mensagens que antes ficavam visiveis passam a trafegar protegidas. Isso reduz a exposicao de metadados e dificulta certas formas de inspeção passiva. A troca de chaves tambem foi modernizada para se apoiar em mecanismos efemeros, favorecendo forward secrecy por padrao."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 tambem simplifica cipher suites. As suites passam a indicar principalmente o algoritmo AEAD e o hash, enquanto grupos de troca de chaves e assinaturas sao negociados por extensoes separadas. Isso reduz ambiguidades e facilita o entendimento de configuracoes. A consequencia pratica e que muitos nomes de cipher suite em TLS 1.3 parecem mais curtos, mas o handshake ainda negocia varios elementos de seguranca."
  },
  {
    "kind": "paragraph",
    "text": "A reducao de round trips melhora latencia, especialmente em chamadas geograficamente distantes, APIs publicas e clientes moveis. Tambem existe 0-RTT data em TLS 1.3, mas seu uso exige cuidado porque dados 0-RTT podem ser suscetiveis a replay. Em APIs transacionais, financeiras ou que alteram estado, 0- RTT deve ser avaliado com extrema cautela e normalmente evitado para operacoes nao idempotentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificados digitais X.509",
    "id": "certificados-digitais-x-509"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-05-certificate-chain.svg",
    "alt": "Cadeia de confiança formada por raiz, intermediária e certificado do servidor",
    "caption": "Figura 6.5 - Cadeia de certificados e validacao pelo cliente."
  },
  {
    "kind": "paragraph",
    "text": "Um certificado digital X.509 associa uma identidade a uma chave publica. No contexto de HTTPS, ele permite que o servidor apresente ao cliente uma prova verificavel de que esta autorizado a representar determinado nome DNS. O certificado contem campos como subject, issuer, validade, chave publica, extensoes, usos de chave e nomes alternativos. Hoje, para verificacao de hostnames, o campo Subject Alternative Name e o ponto central."
  },
  {
    "kind": "paragraph",
    "text": "A chave privada correspondente ao certificado deve permanecer sob controle exclusivo da entidade que apresenta o certificado. Quando um gateway apresenta um certificado para api.empresa.com, ele precisa ter acesso a chave privada correspondente. Se essa chave vaza, um atacante pode se passar pelo servidor enquanto o certificado for aceito por clientes. Por isso, protecao de chaves privadas, HSMs, cofres, permissoes e rotacao sao temas operacionais tao importantes quanto o arquivo do certificado em si."
  },
  {
    "kind": "paragraph",
    "text": "Certificados possuem validade temporal. Um certificado expirado deve ser rejeitado por clientes corretos, porque a confianca atribuida a ele terminou. Certificados tambem podem ter usos restritos. Extensoes como Key Usage e Extended Key Usage indicam se uma chave pode ser usada para autenticacao de servidor, autenticacao de cliente, assinatura ou outros fins. Ignorar esses campos pode permitir usos indevidos de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs corporativas, e comum lidar com certificados publicos emitidos por CAs publicas, certificados internos emitidos por PKI corporativa e certificados de parceiros. Cada tipo exige governanca diferente. Certificados publicos sao mais adequados para endpoints expostos a Internet. Certificados internos podem proteger trafego entre datacenters, VNets e backends. Certificados de parceiros sao comuns em mTLS e integracoes B2B."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cadeia de confianca e validacao",
    "id": "cadeia-de-confianca-e-validacao"
  },
  {
    "kind": "paragraph",
    "text": "Validar um certificado nao significa apenas verificar se ele existe. O cliente precisa construir uma cadeia de certificacao ate uma autoridade raiz confiavel presente em seu truststore. Normalmente, o servidor envia o certificado final e um ou mais intermediarios. A raiz geralmente nao precisa ser enviada, pois ja deve estar no repositório de confianca do cliente. Se uma intermediaria estiver ausente, errada ou expirada, a validacao pode falhar."
  },
  {
    "kind": "paragraph",
    "text": "A validacao tambem exige conferir o nome. Se o cliente acessa https://api.empresa.com, o certificado precisa conter esse nome nos seus Subject Alternative Names ou estar coberto por uma regra valida, como um wildcard apropriado. Um certificado emitido para portal.empresa.com nao autentica api.empresa.com. Esse erro e comum em ambientes com varios domínios, migrações e custom domains em plataformas de API Management."
  },
  {
    "kind": "paragraph",
    "text": "Outro aspecto e a validade temporal. O relogio do cliente e do servidor precisa estar correto. Sistemas com NTP quebrado podem rejeitar certificados validos ou aceitar estados inconsistentes. Em containers, VMs, appliances e ambientes on-premises, sincronizacao de tempo e requisito silencioso para TLS, Kerberos, OAuth, logs e auditoria."
  },
  {
    "kind": "paragraph",
    "text": "A validacao de revogacao e mais complexa. CRLs e OCSP permitem verificar se um certificado foi revogado antes do fim da validade. Na pratica, politicas variam: alguns clientes fazem verificacao estrita, outros aceitam falhas temporarias de OCSP, e alguns gateways dependem de listas configuradas. Para ambientes regulados, a decisao entre fail-open e fail-closed precisa ser explicita, pois afeta disponibilidade e seguranca."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "SNI, ALPN e extensoes TLS",
    "id": "sni-alpn-e-extensoes-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-06-sni-alpn.svg",
    "alt": "SNI e ALPN no ClientHello para seleção de certificado e protocolo",
    "caption": "Figura 6.6 - SNI e ALPN no ClientHello."
  },
  {
    "kind": "paragraph",
    "text": "SNI, Server Name Indication, e uma extensao TLS que permite ao cliente informar o nome do servidor que deseja acessar logo no ClientHello. Isso e necessario porque muitos dominios podem compartilhar o mesmo IP e a mesma porta 443. Sem SNI, o servidor teria dificuldade para escolher qual certificado apresentar antes de saber o host HTTP, pois o host HTTP so aparece dentro da comunicacao protegida depois do handshake."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways e balanceadores, SNI e usado para selecao de certificado, roteamento e coexistencia de multiplos domínios. Um erro de SNI pode fazer o servidor apresentar o certificado errado, resultando em falha de validacao de hostname. Tambem pode fazer um balanceador enviar a conexao para o pool errado. Quando o teste com IP funciona, mas com hostname falha, ou quando curl precisa de --resolve para simular DNS, SNI deve entrar na analise."
  },
  {
    "kind": "paragraph",
    "text": "ALPN, Application-Layer Protocol Negotiation, permite que cliente e servidor negociem qual protocolo de aplicacao sera usado dentro do TLS, como http/1.1 ou h2. Isso foi essencial para HTTP/2 sobre TLS. Sem ALPN, o cliente poderia estabelecer um canal seguro, mas nao haveria acordo claro sobre como interpretar os bytes de aplicacao."
  },
  {
    "kind": "paragraph",
    "text": "Extensoes TLS sao o mecanismo pelo qual o protocolo evolui sem quebrar compatibilidade basica. Supported Versions, Signature Algorithms, Supported Groups, Key Share, SNI, ALPN e outras extensoes carregam informacoes importantes. Em problemas reais, middleboxes antigos podem interferir em extensoes desconhecidas, criando falhas que parecem \"misteriosas\". Por isso, diagnosticos com openssl, logs de gateway e capturas de rede sao valiosos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS record protocol e dados de aplicacao",
    "id": "tls-record-protocol-e-dados-de-aplicacao"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-07-record-protocol.svg",
    "alt": "Proteção de uma mensagem HTTP por fragmentação em records e criptografia AEAD",
    "caption": "Figura 6.7 - Protecao dos dados pelo TLS record protocol."
  },
  {
    "kind": "paragraph",
    "text": "Depois que o handshake termina, o TLS passa a proteger dados de aplicacao por meio do record protocol. O HTTP nao e enviado como texto claro na rede; ele e fragmentado em registros, protegido por chaves de sessao e transmitido sobre TCP. Para um observador externo, metodos, cabecalhos e corpo ficam inacessiveis, embora alguns metadados, como IPs, portas e tamanho aproximado de trafego, ainda possam ser observaveis."
  },
  {
    "kind": "paragraph",
    "text": "O record protocol separa o acordo criptografico do transporte dos dados. Isso permite que a aplicacao escreva bytes no canal seguro sem se preocupar com cada detalhe de cifragem. Entretanto, ele tambem cria limites importantes para troubleshooting. Uma ferramenta que captura pacotes sem chaves nao consegue ver HTTP dentro de TLS. Para inspecionar conteudo, e necessario terminar TLS em um ponto autorizado, usar logs de aplicacao ou configurar ambientes de teste com chaves exportaveis de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "Em API Gateways, essa camada e o ponto em que o trafego deixa de ser opaco. Se o gateway termina TLS, ele passa a enxergar HTTP e pode aplicar policies, validar JWT, transformar payloads, mascarar campos e registrar logs. Se o gateway apenas encaminha TLS por pass-through, ele nao enxerga o conteudo HTTP e suas capacidades de politica ficam limitadas a informacoes de camada 4 ou ao SNI."
  },
  {
    "kind": "paragraph",
    "text": "Essa diferenca impacta arquitetura. Uma empresa que deseja aplicar rate limiting por rota, validar escopos OAuth, transformar JSON, bloquear campos sensiveis ou registrar auditoria de URI precisa terminar TLS antes ou dentro do componente que executa essas funcoes. Por outro lado, pass-through pode ser escolhido quando a politica exige que o gateway nao tenha acesso ao conteudo, ou quando o mTLS deve ocorrer diretamente entre cliente e backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modos de TLS em API Gateways",
    "id": "modos-de-tls-em-api-gateways"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-08-gateway-tls-modes.svg",
    "alt": "Terminação, re-encryption e pass-through de TLS em gateways e balanceadores",
    "caption": "Figura 6.8 - Modos comuns de TLS em gateways e balanceadores."
  },
  {
    "kind": "paragraph",
    "text": "O modo mais comum em plataformas de APIs e TLS termination. Nesse modelo, o cliente estabelece TLS com o gateway ou balanceador. O componente termina a sessao, descriptografa o trafego e processa HTTP. A partir dali, ele pode encaminhar para o backend por HTTP interno ou por uma nova conexao HTTPS. Embora simples, esse modelo exige reconhecer que o gateway passa a ser um ponto de alta confianca, pois ve o conteudo em claro em memoria."
  },
  {
    "kind": "paragraph",
    "text": "TLS re-encryption cria duas sessoes TLS independentes: uma do cliente para o gateway e outra do gateway para o backend. Esse desenho e muito comum em ambientes corporativos porque permite que o gateway aplique policies HTTP sem abrir mao de criptografia no trecho interno. O certificado frontend autentica o gateway para o cliente; o certificado backend autentica o backend para o gateway. Truststores e keystores podem ser diferentes em cada perna."
  },
  {
    "kind": "paragraph",
    "text": "TLS pass-through, por sua vez, preserva a sessao TLS de ponta a ponta entre cliente e backend. Um balanceador ou gateway de camada 4 pode encaminhar bytes sem descriptografar. Isso reduz a exposicao do conteudo no intermediario, mas tambem reduz sua capacidade de tomar decisoes baseadas em HTTP. Pode haver roteamento por SNI, mas policies de autorizacao, validacao de JSON e transformacoes nao sao possiveis sem terminar TLS."
  },
  {
    "kind": "paragraph",
    "text": "Em alguns ambientes, ha combinacoes hibridas. Um balanceador externo termina TLS e recriptografa para o gateway; o gateway termina novamente e recriptografa para backends; ou um WAF fica antes do gateway. Cada terminacao cria uma nova fronteira de confianca e exige decidir quem valida o que. Uma arquitetura segura deve documentar essas fronteiras, os certificados usados, os truststores envolvidos e quais logs existem em cada ponto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Mutual TLS: visao introdutoria",
    "id": "mutual-tls-visao-introdutoria"
  },
  {
    "kind": "paragraph",
    "text": "mTLS, ou mutual TLS, e o uso de TLS com autenticacao bilateral. No HTTPS comum, o cliente valida o certificado do servidor. No mTLS, o servidor tambem solicita e valida um certificado do cliente. Isso permite autenticar uma aplicacao, organizacao, dispositivo ou parceiro por meio de PKI. Em APIs B2B, Open Finance, integracoes bancarias e sistemas de alta confianca, mTLS e frequentemente usado como camada forte de autenticacao de canal."
  },
  {
    "kind": "paragraph",
    "text": "E importante separar mTLS de autorizacao de negocio. Um certificado de cliente pode provar que a chamada veio de uma entidade tecnica confiavel, mas nao necessariamente que aquela entidade pode executar qualquer operacao. Em arquiteturas maduras, mTLS autentica o canal ou o cliente tecnico, enquanto OAuth, JWT, escopos, consentimentos e policies definem autorizacao de aplicacao. O erro comum e tratar o certificado como permissao total."
  },
  {
    "kind": "paragraph",
    "text": "Do ponto de vista operacional, mTLS exige um modelo de emissao, distribuicao, rotacao e revogacao de certificados de cliente. O gateway precisa confiar na CA que emitiu os certificados, validar cadeia e possivelmente verificar atributos como subject, SAN, serial number, thumbprint, OU ou policies especificas. Em muitos produtos, esses atributos podem ser copiados para contexto de policy e usados em decisoes de roteamento ou autorizacao."
  },
  {
    "kind": "paragraph",
    "text": "Este capitulo apresenta mTLS apenas como aplicacao do TLS. Um capitulo futuro deve aprofundar o tema com fluxos completos, modelos de onboarding, relacao com OAuth 2.0, certificados de transporte versus certificados de assinatura, problemas de propagacao de identidade e riscos de aceitar certificados sem validacao forte."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTPS, HSTS e redirecionamento",
    "id": "https-hsts-e-redirecionamento"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS protege uma conexao quando ela e usada. Mas existe um problema inicial: se o usuario ou sistema tenta acessar HTTP por engano, a primeira chamada pode trafegar sem protecao antes de receber um redirecionamento para HTTPS. Em navegadores, HSTS, definido na RFC 6797, permite que um site declare que deve ser acessado apenas por conexoes seguras durante um periodo. O navegador passa a recusar tentativas HTTP para aquele host enquanto a politica estiver vigente."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs server-to-server, HSTS normalmente tem menos impacto do que em navegadores, porque clientes programaticos devem ser configurados diretamente com HTTPS. Ainda assim, redirecionamentos HTTP para HTTPS em APIs merecem cuidado. Muitos clientes nao reenviam metodos, corpos ou cabecalhos sensiveis corretamente apos redirecionamento. Para APIs, o ideal e publicar contratos ja em HTTPS e rejeitar HTTP em vez de depender de redirecionamentos para fluxos transacionais."
  },
  {
    "kind": "paragraph",
    "text": "HSTS tambem pode criar riscos operacionais se configurado incorretamente com includeSubDomains e longos max-age em dominios amplos. Uma vez que navegadores memorizam a politica, uma falha de certificado em subdominios pode tornar servicos inacessiveis para usuarios afetados. O uso de preload aumenta ainda mais a responsabilidade, pois distribui a politica em listas incorporadas a navegadores."
  },
  {
    "kind": "paragraph",
    "text": "Para API Gateways, a decisao pratica e garantir que os endpoints publicos aceitem apenas HTTPS, que certificados estejam corretos, que redirecionamentos sejam evitados em fluxos de API sensiveis e que politicas de headers sejam aplicadas de forma consistente quando houver portais, documentacao, consoles ou interfaces Web associadas a plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cipher suites, versoes e baseline seguro",
    "id": "cipher-suites-versoes-e-baseline-seguro"
  },
  {
    "kind": "paragraph",
    "text": "Configurar TLS envolve escolher versoes permitidas, algoritmos de troca de chaves, assinaturas, grupos elipticos, cipher suites, parametros de sessao e comportamento de validacao. Um baseline seguro deve refletir recomendacoes atuais, requisitos regulatorios, compatibilidade de clientes e capacidade dos produtos. Permitir tudo por compatibilidade e uma decisao arriscada; bloquear tudo que nao seja o mais novo pode quebrar parceiros e sistemas legados."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9325 consolidou recomendacoes modernas para uso seguro de TLS e DTLS. Ela desaconselha protocolos antigos e orienta evitar suites fracas. O NIST SP 800-52 Rev. 2 tambem fornece diretrizes para selecao e configuracao de TLS em contextos que seguem algoritmos recomendados pelo NIST. Essas referencias sao uteis para construir uma politica corporativa, mas a implementacao concreta depende do produto: gateway, load balancer, WAF, servidor de aplicacao, client SDK e sistema operacional."
  },
  {
    "kind": "paragraph",
    "text": "Para APIs corporativas, a definicao de baseline deve ser documentada por ambiente. Por exemplo: endpoints publicos aceitam TLS 1.2 e 1.3, com preferencia por TLS 1.3; TLS 1.2 fica restrito a suites ECDHE com AEAD; backends internos exigem validacao de certificado; certificados de producao usam chaves e algoritmos aprovados; protocolos obsoletos ficam desabilitados. Essa politica deve ser testada com ferramentas automatizadas e monitorada continuamente."
  },
  {
    "kind": "paragraph",
    "text": "Ao mesmo tempo, uma politica de TLS precisa considerar a jornada de migracao. Se um parceiro critico ainda usa biblioteca antiga, a organizacao precisa decidir se cria uma excecao temporaria, se isola o parceiro em um endpoint dedicado, se aplica compensacoes de risco ou se exige atualizacao. Misturar excecoes no endpoint principal pode degradar a seguranca de todos. Segmentacao por dominio, host, produto ou gateway pode ajudar a controlar esse risco."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Sessao, retomada e desempenho",
    "id": "sessao-retomada-e-desempenho"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-09-session-resumption.svg",
    "alt": "Retomada de sessão TLS com ticket ou PSK e handshake reduzido",
    "caption": "Figura 6.9 - Retomada de sessao TLS e custo operacional."
  },
  {
    "kind": "paragraph",
    "text": "O handshake TLS consome CPU e adiciona latencia. Em APIs de alto volume, especialmente com conexoes curtas, isso pode ser significativo. Para reduzir custo, TLS oferece mecanismos de retomada de sessao. Em TLS 1.2, existem session IDs e session tickets. Em TLS 1.3, a retomada usa PSKs derivadas de handshakes anteriores. O objetivo e evitar repetir todo o custo criptografico de uma conexao nova quando as partes ja compartilham material seguro."
  },
  {
    "kind": "paragraph",
    "text": "Retomada melhora desempenho, mas tem implicacoes operacionais. Em clusters de gateways, varias instancias podem precisar compartilhar chaves de ticket ou manter estado de sessao para que a retomada funcione apos balanceamento. Se cada instancia tem material diferente, a retomada pode falhar e o cliente fara handshake completo. Isso nao costuma quebrar funcionalidade, mas aumenta latencia e CPU. Em picos de trafego, esse detalhe pode virar gargalo."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling tambem reduz custo. Um cliente que mantem conexoes HTTPS persistentes evita handshakes repetidos. Gateways frequentemente mantem pools para backends, reutilizando conexoes quando possivel. O desenho de timeouts, keep-alive, idle timeout, max connections e retries influencia diretamente o numero de handshakes e a estabilidade do ambiente."
  },
  {
    "kind": "paragraph",
    "text": "A busca por desempenho nao pode comprometer seguranca. Tickets com lifetime excessivo, compartilhamento descuidado de chaves entre instancias e 0-RTT em operacoes nao idempotentes podem introduzir riscos. A recomendacao e tratar retomada como otimizacao controlada: medir, configurar limites, acompanhar metricas e validar o comportamento em cenarios de failover e escalabilidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificados em plataformas corporativas",
    "id": "certificados-em-plataformas-corporativas"
  },
  {
    "kind": "paragraph",
    "text": "Em uma plataforma de APIs, certificados aparecem em varios lugares. No frontend, o gateway apresenta um certificado para clientes. No backend, o gateway valida o certificado de servidores internos. Em mTLS, o gateway pode exigir certificados de clientes e tambem apresentar certificado proprio ao backend. Alem disso, portais, consoles, agentes, analytics e integrações internas podem ter certificados separados."
  },
  {
    "kind": "paragraph",
    "text": "O conceito de keystore e truststore ajuda a organizar. Um keystore contem identidades que o componente apresenta, normalmente certificado e chave privada. Um truststore contem CAs ou certificados confiaveis usados para validar a outra ponta. Confundir os dois e uma fonte frequente de erro. Importar o certificado do backend no keystore do gateway nao faz o gateway confiar nele; para confiar, ele precisa estar no truststore ou ter sua CA confiavel."
  },
  {
    "kind": "paragraph",
    "text": "Em Azure API Management, custom domains podem usar certificados associados ao endpoint exposto, incluindo integracao com Azure Key Vault em cenarios suportados. Para backends, a plataforma tambem precisa validar TLS e pode trabalhar com certificados conforme configuracoes e policies. Em arquiteturas hibridas e self-hosted gateway, entram ainda redes privadas, DNS privado e truststores locais."
  },
  {
    "kind": "paragraph",
    "text": "Em Axway API Gateway, a gestao de certificados e chaves tambem e central para interfaces HTTPS, trusted certificates, conexoes de saida e policies. O profissional precisa saber onde esta o certificado apresentado ao cliente, quais CAs sao confiaveis para backends e como policies extraem ou validam atributos de certificados quando mTLS e usado. A diferenca entre erro de configuracao de interface, erro de trusted certificate e erro de policy precisa ser clara."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observabilidade e troubleshooting TLS",
    "id": "observabilidade-e-troubleshooting-tls"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-10-troubleshooting-tree.svg",
    "alt": "Árvore de troubleshooting para classificar falhas HTTPS por camada",
    "caption": "Figura 6.10 - Arvore de troubleshooting para falhas HTTPS."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting de TLS deve seguir uma sequencia por camadas. Primeiro, confirmar DNS, IP e porta. Depois, verificar se a conexao TCP e estabelecida. Em seguida, testar o handshake TLS, observando versao, cipher, certificado apresentado, cadeia, SNI e ALPN. Somente depois faz sentido analisar status HTTP e policies de gateway. Pular etapas leva a conclusoes erradas, como investigar OAuth quando a falha real e certificado expirado."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas como openssl s_client, curl -v, logs do gateway, logs do load balancer, tcpdump e Wireshark ajudam a localizar a falha. Com openssl, e possivel informar servername para testar SNI, exibir cadeia, forcar versoes e observar ciphers. Com curl, e possivel ver negociacao, certificado e resposta HTTP. Em ambientes corporativos, o acesso a capturas pode ser restrito, entao logs estruturados do gateway e metricas de handshake tornam-se ainda mais importantes."
  },
  {
    "kind": "paragraph",
    "text": "Erros comuns incluem certificate expired, self-signed certificate in chain, unable to get local issuer certificate, hostname mismatch, protocol version alert, handshake failure, unknown ca, bad certificate, connection reset e timeout. Cada erro aponta para uma camada diferente. Unknown CA sugere truststore; hostname mismatch sugere certificado ou DNS/SNI; handshake failure pode indicar incompatibilidade de cipher, versao ou exigencia de certificado de cliente."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, o diagnostico precisa distinguir frontend e backend. Um cliente pode falhar ao conectar ao gateway por problema no certificado público. O gateway pode conectar ao cliente, executar policies e depois falhar ao chamar o backend por trusted certificate ausente. Sem separar essas duas pernas, o time pode trocar o certificado errado ou alterar uma policy que nao participa do problema."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ataques e riscos historicos",
    "id": "ataques-e-riscos-historicos"
  },
  {
    "kind": "paragraph",
    "text": "A historia do TLS inclui diversos ataques e falhas de implementacao que motivaram mudancas no protocolo e nas recomendacoes. Ataques contra SSL e TLS antigos exploraram downgrade, modos de bloco, compressao, renegociacao, ciphers fracos, oraculos de padding e bugs de bibliotecas. Mesmo quando o protocolo e matematicamente forte, uma configuracao ruim ou uma implementacao vulneravel pode quebrar a protecao esperada."
  },
  {
    "kind": "paragraph",
    "text": "Downgrade e um risco classico: um atacante tenta forcar cliente e servidor a usar versoes ou algoritmos mais fracos. Protocolos modernos incluem protecoes, mas o baseline do servidor ainda importa. Se protocolos obsoletos permanecem habilitados, a superficie de ataque cresce. Por isso, hardening de TLS normalmente comeca removendo SSL, TLS 1.0, TLS 1.1 e ciphers obsoletos."
  },
  {
    "kind": "paragraph",
    "text": "Ataques de man-in-the-middle continuam relevantes quando clientes desabilitam validacao de certificado, aceitam qualquer certificado, ignoram hostname ou instalam CAs indevidas. Em desenvolvimento, e comum usar flags inseguras para \"fazer funcionar\". O problema surge quando esse padrao migra para producao ou para bibliotecas compartilhadas. A validacao correta do certificado e parte essencial do TLS, nao um detalhe opcional."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs, outro risco e a exposicao de dados apos a terminacao TLS. Se o gateway termina TLS e envia HTTP puro para o backend em uma rede ampla e pouco controlada, parte da protecao se perde. Se logs registram cabecalhos Authorization, tokens ou payloads sensiveis, a criptografia em transito nao impede vazamento por observabilidade mal desenhada. Segurança de transporte precisa estar alinhada a seguranca de aplicacao e dados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Ciclo de vida de certificados",
    "id": "ciclo-de-vida-de-certificados"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/pt/figure-11-certificate-lifecycle.svg",
    "alt": "Ciclo operacional de certificados do inventário à rotação",
    "caption": "Figura 6.11 - Ciclo de vida operacional de certificados."
  },
  {
    "kind": "paragraph",
    "text": "Certificados tem ciclo de vida: solicitacao, validacao, emissao, instalacao, monitoramento, renovacao, rotacao, revogacao e descarte. Em ambientes grandes, o desafio nao e emitir um certificado manualmente, mas manter centenas ou milhares de certificados corretos, atualizados e vinculados aos sistemas certos. Falhas de renovacao causam incidentes graves porque podem derrubar endpoints inteiros."
  },
  {
    "kind": "paragraph",
    "text": "Um bom processo comeca por inventario. A organizacao precisa saber quais certificados existem, onde estao instalados, quais dominios cobrem, quando expiram, quem e responsavel, qual CA emitiu, qual chave privada corresponde e quais sistemas dependem deles. Sem inventario, renovacao vira resposta a crise. Com inventario, e possivel automatizar alertas, rotacao e auditoria."
  },
  {
    "kind": "paragraph",
    "text": "ACME, definido na RFC 8555, popularizou a automacao de certificados para Web PKI. Em ambientes corporativos, automacao pode envolver Key Vaults, HSMs, PKI interna, pipelines, secret managers e integracoes com gateways. O objetivo e reduzir intervencao manual, padronizar validacao e minimizar janelas de expiracao. Mesmo quando ACME nao e usado, o principio operacional continua valido: certificados precisam de automacao e governanca."
  },
  {
    "kind": "paragraph",
    "text": "Rotacao exige planejamento para nao quebrar clientes. Em mTLS, por exemplo, trocar CA ou certificado de cliente pode exigir sobreposicao temporaria de confianca, distribuicao antecipada e janelas de compatibilidade. Em backends, trocar certificado pode exigir atualizar truststores do gateway. Em custom domains, trocar certificado pode exigir recarregar listeners ou validar que a cadeia completa esta sendo apresentada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicacao no mundo bancario e financeiro",
    "id": "aplicacao-no-mundo-bancario-e-financeiro"
  },
  {
    "kind": "paragraph",
    "text": "Instituicoes financeiras usam TLS para proteger canais digitais, APIs internas, integracoes B2B, Open Finance, pagamentos, autenticacao e trafego entre dominios de seguranca. A criticidade vem da combinacao de dados sensiveis, risco regulatorio, impacto financeiro e dependencia operacional. Uma falha de TLS pode resultar em indisponibilidade, rejeicao de parceiros, falha de auditoria ou exposicao de informacoes."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes bancarios, e comum separar certificados de transporte, certificados de assinatura e credenciais de aplicacao. Um certificado TLS autentica o canal. Um certificado de assinatura pode assinar payloads ou objetos. Um token OAuth pode representar consentimento, escopo e autorizacao. Misturar esses papeis gera arquiteturas confusas. Cada artefato deve ter finalidade, autoridade emissora, ciclo de vida e controles proprios."
  },
  {
    "kind": "paragraph",
    "text": "Gateways como Axway e Azure API Management aparecem como pontos de enforcement. Eles podem exigir TLS forte no frontend, validar certificados de cliente, validar JWT, aplicar throttling, rotear por produto, mascarar logs e chamar backends por TLS interno. A plataforma, entretanto, so e segura se configurada com cadeias corretas, politicas claras e observabilidade suficiente para auditoria."
  },
  {
    "kind": "paragraph",
    "text": "O profissional que domina TLS consegue conversar melhor com times de rede, seguranca, infraestrutura, desenvolvimento e arquitetura. Ele consegue explicar por que um certificado wildcard pode aumentar impacto de vazamento, por que truststore errado causa falha apenas em uma perna, por que SNI importa em custom domains, por que TLS termination muda a fronteira de confianca e por que mTLS nao substitui autorizacao de negocio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Tabelas de referencia tecnica",
    "id": "tabelas-de-referencia-tecnica"
  },
  {
    "kind": "paragraph",
    "text": "As tabelas a seguir condensam decisoes que aparecem frequentemente em projetos de APIs. Elas nao substituem a leitura das especificacoes, mas ajudam a organizar o raciocinio durante desenho de arquitetura e troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 — Conceitos essenciais de TLS em APIs.",
    "headers": [
      "Conceito",
      "O que significa",
      "Impacto pratico em APIs"
    ],
    "rows": [
      [
        "HTTPS",
        "HTTP executado sobre TLS.",
        "Protege chamadas de API em transito, mas nao substitui autorizacao ou validacao de token."
      ],
      [
        "TLS termination",
        "Intermediario encerra a sessao TLS do cliente.",
        "Permite policies HTTP, logs e transformacoes no gateway."
      ],
      [
        "TLS re-encryption",
        "Intermediario cria uma segunda sessao TLS para o backend.",
        "Mantem trafego interno criptografado e separa confianca frontend/backend."
      ],
      [
        "TLS pass-through",
        "Intermediario encaminha bytes sem descriptografar.",
        "Preserva criptografia ponta a ponta, mas limita policies HTTP no gateway."
      ],
      [
        "mTLS",
        "Cliente e servidor apresentam certificados.",
        "Autentica cliente tecnico ou parceiro, mas nao substitui autorizacao de aplicacao."
      ],
      [
        "SNI",
        "Nome do servidor informado no ClientHello.",
        "Permite selecionar certificado e rotear multiplos dominios no mesmo IP."
      ],
      [
        "ALPN",
        "Negociacao do protocolo de aplicacao dentro do TLS.",
        "Permite escolher HTTP/2 ou HTTP/1.1 no handshake."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabela 2 — Sintomas, causas prováveis e investigação de falhas HTTPS.",
    "headers": [
      "Falha observada",
      "Causa provavel",
      "Como investigar"
    ],
    "rows": [
      [
        "certificate has expired",
        "Certificado fora da validade.",
        "Verificar certificado apresentado pelo endpoint, cadeia e relogio dos sistemas."
      ],
      [
        "hostname mismatch",
        "Nome acessado nao consta no SAN do certificado.",
        "Conferir DNS, SNI, custom domain e Subject Alternative Name."
      ],
      [
        "unable to get local issuer certificate",
        "Cadeia incompleta ou CA ausente no truststore.",
        "Conferir intermediarias enviadas e CAs confiaveis no cliente/gateway."
      ],
      [
        "handshake failure",
        "Versao, cipher, certificado de cliente ou extensao incompatível.",
        "Forcar versoes/ciphers em teste e analisar logs de TLS."
      ],
      [
        "unknown ca",
        "Certificado apresentado foi emitido por CA nao confiavel.",
        "Importar CA correta no truststore apropriado ou usar CA publica/valida."
      ],
      [
        "connection reset during handshake",
        "Intermediario fechou conexao, SNI errado, policy de LB ou exigencia de mTLS.",
        "Testar com SNI explicito e comparar frontend/backend."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabela 3 — Decisões arquiteturais e cuidados.",
    "headers": [
      "Decisao arquitetural",
      "Quando faz sentido",
      "Risco ou cuidado"
    ],
    "rows": [
      [
        "Aceitar TLS 1.2 e 1.3",
        "Compatibilidade com clientes corporativos e parceiros.",
        "Restringir TLS 1.2 a suites fortes e planejar migracao."
      ],
      [
        "Exigir TLS 1.3 apenas",
        "Ecossistema controlado e clientes modernos.",
        "Pode quebrar bibliotecas antigas e parceiros B2B."
      ],
      [
        "Usar certificado wildcard",
        "Muitos subdominios sob mesmo dominio.",
        "Vazamento da chave impacta varios servicos."
      ],
      [
        "Usar certificados por dominio",
        "Separacao de risco e governanca granular.",
        "Maior volume de certificados para operar."
      ],
      [
        "Terminar TLS no gateway",
        "Necessidade de policies HTTP e observabilidade.",
        "Gateway ve o conteudo descriptografado e precisa ser altamente protegido."
      ],
      [
        "Pass-through para backend",
        "Exigencia de criptografia ponta a ponta sem inspeção intermediaria.",
        "Menos controle de API Management no caminho."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exemplos praticos de diagnostico",
    "id": "exemplos-praticos-de-diagnostico"
  },
  {
    "kind": "paragraph",
    "text": "Os exemplos abaixo sao ilustrativos. Eles devem ser adaptados ao ambiente, pois nomes de hosts, certificados, paths e policies variam. O objetivo e mostrar como separar camadas durante a investigacao."
  },
  {
    "kind": "subhead",
    "text": "Testar o certificado apresentado com SNI"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -showcerts"
  },
  {
    "kind": "subhead",
    "text": "Forcar TLS 1.2 para comparar compatibilidade"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_2"
  },
  {
    "kind": "subhead",
    "text": "Forcar TLS 1.3 para validar suporte"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_3"
  },
  {
    "kind": "subhead",
    "text": "Ver detalhes da chamada HTTP e da negociacao TLS com curl"
  },
  {
    "kind": "code",
    "text": "curl -v https://api.exemplo.com/clientes"
  },
  {
    "kind": "subhead",
    "text": "Testar um host com IP especifico preservando SNI/Host"
  },
  {
    "kind": "code",
    "text": "curl -v --resolve api.exemplo.com:443:203.0.113.10 https://api.exemplo.com/health"
  },
  {
    "kind": "subhead",
    "text": "Verificar datas de um certificado salvo em arquivo"
  },
  {
    "kind": "code",
    "text": "openssl x509 -in certificado.pem -noout -subject -issuer -dates -ext subjectAltName"
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, um teste externo bem-sucedido nao prova que o backend esta correto. Ele prova apenas que o cliente conseguiu negociar TLS com o endpoint externo e receber alguma resposta. Para validar a perna interna, e necessario testar do proprio gateway ou de uma origem com a mesma rota, DNS, truststore e politica de saida. Essa separacao e essencial em ambientes com VNets, private endpoints, proxies corporativos e firewalls de saida."
  },
  {
    "kind": "paragraph",
    "text": "Quando houver mTLS, o teste tambem deve apresentar certificado e chave de cliente. Uma falha sem certificado pode ser esperada. Uma falha com certificado pode indicar CA nao confiavel, certificado expirado, EKU incorreto, cadeia incompleta ou policy que nao reconhece o atributo esperado. Logs do gateway devem indicar se a falha ocorreu no handshake ou na policy depois do handshake."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudos de caso",
    "id": "estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Custom domain no API Management apresenta certificado errado"
  },
  {
    "kind": "paragraph",
    "text": "Um time publica api.empresa.com em um API Management com varios custom domains. Alguns clientes recebem erro de hostname mismatch. A primeira suspeita recai sobre OAuth, porque a API tambem retorna 401 em alguns cenarios. A investigacao correta com openssl s_client usando -servername mostra que, para determinado caminho de rede, o endpoint apresenta o certificado de portal.empresa.com."
  },
  {
    "kind": "paragraph",
    "text": "A causa provavel e configuracao incorreta de SNI, custom domain ou balanceador anterior ao APIM. A correcao nao esta no JWT nem na policy de autorizacao. Ela esta na associacao entre hostname, certificado e listener. Esse caso mostra por que separar TLS de HTTP evita desperdicio de tempo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Gateway chama backend HTTPS e falha com unknown ca"
  },
  {
    "kind": "paragraph",
    "text": "O cliente externo consegue conectar no gateway e autenticar normalmente. A policy do gateway, entretanto, falha ao chamar o backend com erro de certificado. O time troca o certificado frontend, mas o problema continua. A falha real esta na perna gateway-backend, nao na perna cliente-gateway."
  },
  {
    "kind": "paragraph",
    "text": "A solucao e importar a CA ou cadeia correta do backend no truststore usado pela conexao de saida do gateway, ou corrigir o certificado do backend para usar uma CA confiavel. Tambem e necessario verificar se o nome usado na URL interna corresponde ao SAN do certificado do backend."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Parceiro legado nao suporta baseline moderno"
  },
  {
    "kind": "paragraph",
    "text": "Uma organizacao desabilita TLS 1.0 e TLS 1.1 e restringe TLS 1.2 a suites modernas. Um parceiro antigo deixa de conseguir chamar a API. Tecnicamente, a mudanca esta correta, mas operacionalmente precisa de plano de migracao, comunicacao e janela de excecao controlada."
  },
  {
    "kind": "paragraph",
    "text": "Uma abordagem madura e isolar excecoes temporarias em endpoints dedicados, com monitoramento, prazo de fim, compensacoes de risco e dono responsavel. Reabrir ciphers fracos no endpoint principal para todos os clientes aumenta o risco global da plataforma."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - Certificado expira em ambiente interno"
  },
  {
    "kind": "paragraph",
    "text": "Um backend interno protegido por TLS expira no fim de semana. O gateway passa a retornar 502 ou 500 para clientes externos, embora o certificado publico do gateway esteja valido. O incidente acontece porque o inventario de certificados internos nao estava integrado ao monitoramento corporativo."
  },
  {
    "kind": "paragraph",
    "text": "O aprendizado e que certificados internos devem receber o mesmo rigor operacional de certificados publicos. Monitoramento de expiracao, responsaveis, rotacao antecipada e alertas em canais corretos reduzem incidentes evitaveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios sugeridos",
    "id": "laboratorios-sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "Os laboratorios devem ser executados em ambiente de estudo, sem usar certificados ou chaves de producao. A meta e observar o comportamento do TLS em condicoes controladas."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Suba um servidor HTTPS local com certificado autoassinado e observe como curl e navegador rejeitam a cadeia por falta de confianca.",
      "Crie uma CA local, emita um certificado para api.local, adicione a CA ao truststore do cliente e compare o resultado.",
      "Teste o mesmo endpoint com e sem SNI usando openssl s_client e observe o certificado retornado.",
      "Configure um reverse proxy terminando TLS e encaminhando HTTP para um backend local. Depois altere para re-encryption e compare logs.",
      "Force ciphers ou versoes TLS diferentes em cliente e servidor para provocar handshake failure controlado.",
      "Simule expiracao de certificado em ambiente local e observe mensagens de erro em cliente, proxy e aplicacao.",
      "Configure mTLS em laboratorio e teste tres cenarios: sem certificado de cliente, com certificado emitido por CA nao confiavel e com certificado valido."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura TLS para APIs",
    "id": "checklist-de-arquitetura-tls-para-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Todos os endpoints publicos usam HTTPS e nao dependem de HTTP com redirecionamento para operacoes de API.",
      "TLS 1.0, TLS 1.1, SSLv2 e SSLv3 estao desabilitados.",
      "TLS 1.2, quando aceito, esta restrito a suites fortes com forward secrecy e AEAD.",
      "TLS 1.3 esta habilitado quando suportado pelos clientes e pela plataforma.",
      "Certificados possuem SAN correto, cadeia completa e validade monitorada.",
      "Chaves privadas sao protegidas, com acesso restrito e, quando aplicavel, HSM ou Key Vault.",
      "Truststores de frontend, backend e mTLS sao documentados separadamente.",
      "SNI e ALPN sao testados nos endpoints que hospedam multiplos dominios ou suportam HTTP/2.",
      "A arquitetura documenta onde TLS termina e onde o trafego fica descriptografado.",
      "Logs nao registram tokens, segredos, chaves privadas ou payloads sensiveis sem mascaramento.",
      "Renovacao e rotacao de certificados possuem processo, responsavel e alertas de expiracao.",
      "Excecoes para clientes legados sao temporarias, isoladas e aprovadas por risco."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capitulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS e a combinacao de HTTP com TLS. O HTTP define a semantica da API; o TLS protege o canal. Essa separacao permite diagnosticar corretamente se uma falha ocorreu antes do HTTP, durante o handshake, na validacao de certificado, na policy do gateway ou no backend."
  },
  {
    "kind": "paragraph",
    "text": "TLS oferece confidencialidade, integridade e autenticacao. Com configuracoes modernas, tambem fornece forward secrecy. Essas garantias dependem de versoes, cipher suites, certificados, truststores, validacao de hostname e protecao de chaves privadas."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 simplifica e fortalece o protocolo em relacao ao TLS 1.2, mas TLS 1.2 ainda existe por compatibilidade. O papel do arquiteto e definir baselines seguros, gerenciar excecoes e planejar evolucao."
  },
  {
    "kind": "paragraph",
    "text": "Certificados X.509 e cadeias de confianca sao centrais. O cliente precisa validar CA, intermediarias, validade, hostname, usos de chave e, conforme politica, revogacao. Em API Gateways, ha certificados diferentes para frontend, backend e clientes mTLS."
  },
  {
    "kind": "paragraph",
    "text": "A operacao de TLS e tao importante quanto a teoria. Inventario, monitoramento, rotacao, automacao e troubleshooting por camadas evitam incidentes e reduzem tempo de resolucao."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossario",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 4 — Glossário do capítulo.",
    "headers": [
      "Termo",
      "Definicao"
    ],
    "rows": [
      [
        "TLS",
        "Protocolo de seguranca de transporte usado para proteger aplicacoes como HTTP."
      ],
      [
        "HTTPS",
        "HTTP executado sobre TLS."
      ],
      [
        "Certificado X.509",
        "Documento digital que associa identidade a chave publica e e assinado por uma CA."
      ],
      [
        "CA",
        "Certification Authority, entidade que emite certificados e participa da cadeia de confianca."
      ],
      [
        "Truststore",
        "Repositorio de CAs/certificados confiaveis usados para validar a outra ponta."
      ],
      [
        "Keystore",
        "Repositorio de identidades locais, normalmente certificado e chave privada."
      ],
      [
        "SNI",
        "Extensao TLS que informa o nome do servidor no ClientHello."
      ],
      [
        "ALPN",
        "Extensao TLS para negociar o protocolo de aplicacao, como HTTP/2."
      ],
      [
        "Cipher suite",
        "Conjunto de algoritmos usados pela sessao TLS, especialmente em TLS 1.2."
      ],
      [
        "Forward secrecy",
        "Propriedade em que trafego passado permanece protegido mesmo se uma chave privada futura vazar."
      ],
      [
        "OCSP",
        "Protocolo para consultar status de revogacao de certificado."
      ],
      [
        "HSTS",
        "Mecanismo HTTP para instruir navegadores a usar apenas conexoes seguras para um host."
      ],
      [
        "mTLS",
        "TLS com autenticacao mutua por certificados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercicios",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por que HTTPS nao substitui OAuth 2.0, JWT ou autorizacao de escopos.",
      "Descreva o caminho de uma chamada HTTPS ate um backend quando o gateway usa TLS re- encryption.",
      "Diferencie keystore e truststore usando um exemplo de cliente, gateway e backend.",
      "Explique o papel do SNI em um ambiente com varios custom domains no mesmo IP.",
      "Explique como ALPN influencia HTTP/2 sobre TLS.",
      "Compare TLS 1.2 e TLS 1.3 sob a perspectiva de seguranca e latencia.",
      "Por que 0-RTT em TLS 1.3 pode ser perigoso para operacoes transacionais?",
      "Um cliente recebe hostname mismatch. Liste pelo menos cinco causas possiveis.",
      "O gateway retorna erro ao chamar o backend HTTPS, mas clientes conectam ao gateway normalmente. Qual perna deve ser investigada?",
      "Explique por que certificados internos tambem precisam de monitoramento de expiracao.",
      "Crie uma politica de baseline TLS para uma API publica que precisa aceitar clientes corporativos legados.",
      "Explique quando TLS pass-through pode ser adequado e quais capacidades de gateway sao perdidas."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Questoes discursivas para revisao",
    "id": "questoes-discursivas-para-revisao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Imagine que uma instituicao financeira possui APIs publicas, APIs internas e APIs de parceiros. Proponha uma estrategia de certificados separando frontend, backend e mTLS. Indique quais truststores seriam necessarios e quais riscos voce monitoraria.",
      "Voce precisa desabilitar TLS 1.0 e TLS 1.1 em um gateway usado por parceiros antigos. Descreva o plano tecnico e operacional para reduzir risco sem causar indisponibilidade inesperada.",
      "Explique como voce investigaria uma falha intermitente de TLS que ocorre apenas quando o trafego passa por determinado balanceador. Quais evidencias coletaria?",
      "Uma equipe afirma que nao precisa de TLS interno porque a rede e privada. Apresente argumentos tecnicos a favor e contra essa decisao, considerando custo, risco e observabilidade."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: Certificate Transparency e emissao indevida",
    "id": "aprofundamento-certificate-transparency-e-emissao-indevida"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Transparency (CT) surgiu para reduzir o risco de certificados emitidos indevidamente por autoridades certificadoras. A ideia e registrar publicamente certificados emitidos em logs auditaveis, permitindo que donos de dominios, navegadores e pesquisadores detectem certificados suspeitos. CT nao substitui a validacao normal de cadeia; ele adiciona uma camada de transparencia ao ecossistema de Web PKI."
  },
  {
    "kind": "paragraph",
    "text": "Para arquiteturas corporativas, CT e mais relevante em certificados publicos usados por endpoints expostos a Internet. Se uma CA publica emitir indevidamente um certificado para um dominio da empresa, a existencia desse certificado pode aparecer em logs de CT. Monitorar esses logs ajuda a detectar uso indevido de dominios, erros de emissao ou tentativas de personificacao."
  },
  {
    "kind": "paragraph",
    "text": "Em certificados internos emitidos por PKI privada, CT normalmente nao se aplica da mesma forma, pois esses certificados nao fazem parte da Web PKI publica. Nesse caso, controles equivalentes dependem de inventario interno, auditoria de CA, trilhas de aprovacao, separacao de funcoes e monitoramento dos certificados emitidos pela propria organizacao."
  },
  {
    "kind": "paragraph",
    "text": "Em plataformas de API, CT deve ser visto como parte de governanca de dominio. O time responsavel por APIs precisa saber quais dominios publicos existem, quais certificados foram emitidos para eles, quem aprovou a emissao, onde estao instalados e quando expiram. Sem essa visao, um certificado tecnico pode se transformar em risco de marca, fraude ou indisponibilidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 — Controles de Certificate Transparency e emissão.",
    "headers": [
      "Controle",
      "Objetivo",
      "Aplicacao em APIs"
    ],
    "rows": [
      [
        "Monitoramento de CT",
        "Detectar certificados publicos inesperados.",
        "Alertar emissao suspeita para api.empresa.com ou subdominios."
      ],
      [
        "Inventario de dominios",
        "Saber quais hostnames existem e quem e dono.",
        "Evitar custom domains sem responsavel claro."
      ],
      [
        "Aprovacao de emissao",
        "Controlar quem pode solicitar certificados.",
        "Reduzir risco de emissao fora do processo corporativo."
      ],
      [
        "Auditoria de CA interna",
        "Governar certificados privados.",
        "Controlar certificados usados em backends e mTLS."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: certificate pinning",
    "id": "aprofundamento-certificate-pinning"
  },
  {
    "kind": "paragraph",
    "text": "Certificate pinning e a pratica de restringir um cliente a aceitar apenas um certificado especifico, uma chave publica especifica ou um conjunto limitado de emissores, em vez de confiar genericamente no truststore do sistema. A motivacao e reduzir o impacto de CAs comprometidas ou certificados emitidos indevidamente. Entretanto, pinning aumenta risco operacional, pois uma troca legitima de certificado pode quebrar clientes se o pin nao for atualizado corretamente."
  },
  {
    "kind": "paragraph",
    "text": "Em aplicativos moveis, pinning ja foi usado para dificultar interceptacao por proxies locais ou CAs instaladas no dispositivo. Em integracoes B2B, algumas organizacoes fazem uma forma de pinning pelo thumbprint do certificado do parceiro. Esse modelo pode ser simples de implementar, mas tende a gerar incidentes de renovacao. Quando o certificado expira e e substituido, o thumbprint muda, e chamadas passam a falhar."
  },
  {
    "kind": "paragraph",
    "text": "Uma alternativa mais flexivel e confiar em uma CA controlada ou em um conjunto de CAs intermediarias, em vez de fixar o certificado final. Outra abordagem e pinning de chave publica, que permite renovar o certificado preservando a mesma chave, embora reutilizar chaves por longos periodos tambem tenha desvantagens. Em geral, pinning deve ser uma decisao consciente, documentada e acompanhada de plano de rotacao."
  },
  {
    "kind": "paragraph",
    "text": "No contexto de API Gateways, pinning pode aparecer em clientes que chamam o gateway, em backends chamados pelo gateway ou em policies que comparam certificados. A recomendacao pratica e evitar dependencias rigidas do certificado default de plataformas gerenciadas e usar dominios/custom certificates sob controle da organizacao quando clientes externos dependem fortemente da identidade TLS."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 — Estratégias de certificate pinning.",
    "headers": [
      "Estrategia",
      "Vantagem",
      "Cuidado"
    ],
    "rows": [
      [
        "Pin por certificado final",
        "Controle muito especifico.",
        "Quebra em toda renovacao que mude o certificado."
      ],
      [
        "Pin por chave publica",
        "Permite renovar certificado com a mesma chave.",
        "Reutilizacao prolongada de chave reduz higiene criptografica."
      ],
      [
        "Pin por CA/intermediaria",
        "Mais flexivel para renovacoes.",
        "Confia em todos os certificados validos daquela autoridade."
      ],
      [
        "Truststore corporativo",
        "Modelo escalavel e governavel.",
        "Exige governanca forte da PKI interna."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: Java, truststore e erros comuns em clientes corporativos",
    "id": "aprofundamento-java-truststore-e-erros-comuns-em-clientes-corporativos"
  },
  {
    "kind": "paragraph",
    "text": "Muitos sistemas corporativos que consomem APIs rodam em Java. Nesses ambientes, a validacao TLS depende do truststore usado pela JVM ou pela aplicacao. Um erro frequente ocorre quando o certificado funciona no navegador, mas falha na aplicacao Java. Isso pode acontecer porque o navegador usa o truststore do sistema operacional, enquanto a JVM usa outro conjunto de CAs."
  },
  {
    "kind": "paragraph",
    "text": "O erro PKIX path building failed normalmente indica que a JVM nao conseguiu construir uma cadeia de confianca ate uma CA conhecida. A solucao nao deve ser desabilitar validacao TLS. O caminho correto e importar a CA correta no truststore apropriado, corrigir a cadeia enviada pelo servidor ou usar um certificado emitido por CA ja confiavel pela JVM. Em producao, aceitar todos os certificados e uma vulnerabilidade grave."
  },
  {
    "kind": "paragraph",
    "text": "Tambem e comum haver problema de hostname. Mesmo que a CA seja confiavel, o certificado precisa corresponder ao nome usado na URL. Se a aplicacao chama https://10.0.0.5 mas o certificado foi emitido para api.interno.empresa, a validacao deve falhar. A solucao e chamar pelo hostname correto, ajustar DNS ou emitir certificado com SAN apropriado, nao ignorar hostname verifier."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways que chamam backends Java ou clientes Java que chamam gateways, entender esses detalhes reduz incidentes. O time consegue explicar por que importar um certificado em um servidor nao afeta outro, por que containers podem ter truststores diferentes da maquina hospedeira e por que atualizacoes de JDK podem alterar CAs confiaveis."
  },
  {
    "kind": "subhead",
    "text": "Listar CAs em um truststore Java"
  },
  {
    "kind": "code",
    "text": "keytool -list -keystore cacerts -storepass changeit"
  },
  {
    "kind": "subhead",
    "text": "Importar uma CA corporativa em truststore de laboratorio"
  },
  {
    "kind": "code",
    "text": "keytool -importcert -file ca-corporativa.pem -alias ca-corporativa -keystore truststore.jks"
  },
  {
    "kind": "subhead",
    "text": "Testar handshake Java com logs detalhados"
  },
  {
    "kind": "code",
    "text": "java -Djavax.net.debug=ssl,handshake -jar cliente.jar"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: TLS em Kubernetes, Ingress e Service Mesh",
    "id": "aprofundamento-tls-em-kubernetes-ingress-e-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Em Kubernetes, TLS pode terminar em varios pontos: no load balancer externo, no ingress controller, no service mesh sidecar, no proprio pod ou em uma combinacao desses pontos. Cada terminacao muda a fronteira de confianca e altera onde policies podem ser aplicadas. Se o Ingress termina TLS, ele enxerga HTTP. Se o mesh faz mTLS entre sidecars, a aplicacao pode receber trafego local sem lidar diretamente com certificados."
  },
  {
    "kind": "paragraph",
    "text": "Ingress controllers como NGINX, Envoy e outros costumam selecionar certificados por SNI e encaminhar para services internos. Certificados podem ser gerenciados por secrets Kubernetes, operadores ou integracoes com gerenciadores externos. O desafio operacional e garantir que secrets sejam protegidos, renovados, replicados corretamente e associados ao host correto."
  },
  {
    "kind": "paragraph",
    "text": "Service Mesh adiciona mTLS interno entre workloads, frequentemente com emissao automatica de certificados curtos. Esse modelo ajuda em Zero Trust interno, mas nao elimina a necessidade de TLS no edge. Ele tambem introduz uma CA do mesh, politicas de identidade de workload e observabilidade propria. Arquitetos devem mapear a diferenca entre identidade externa da API e identidade interna dos workloads."
  },
  {
    "kind": "paragraph",
    "text": "Quando um API Gateway esta antes do cluster, a arquitetura pode ter TLS externo no gateway, re- encryption para o Ingress e mTLS dentro do mesh. Isso e poderoso, mas complexo. Documentacao de fluxo, nomes DNS, certificados e pontos de terminacao torna-se obrigatoria para troubleshooting e auditoria."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 — Pontos de terminação TLS em Kubernetes e plataformas corporativas.",
    "headers": [
      "Ponto de terminacao",
      "O que enxerga",
      "Uso comum"
    ],
    "rows": [
      [
        "Load balancer externo",
        "Pode enxergar apenas TLS ou terminar e ver HTTP.",
        "Exposicao publica e distribuicao regional."
      ],
      [
        "Ingress controller",
        "Normalmente ve HTTP apos terminar TLS.",
        "Roteamento por host/path dentro do cluster."
      ],
      [
        "API Gateway",
        "Ve HTTP e contexto de API quando termina TLS.",
        "Policies, seguranca, analytics e monetizacao."
      ],
      [
        "Service Mesh sidecar",
        "Protege trafego leste-oeste entre workloads.",
        "mTLS interno e identidade de servico."
      ],
      [
        "Aplicacao",
        "Controle total dentro do codigo.",
        "Cenarios especificos, mas aumenta responsabilidade do time de desenvolvimento."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: TLS, proxies corporativos e inspeção",
    "id": "aprofundamento-tls-proxies-corporativos-e-inspecao"
  },
  {
    "kind": "paragraph",
    "text": "Proxies corporativos podem operar de formas diferentes. Um proxy simples pode apenas encaminhar conexoes HTTPS usando CONNECT, sem inspecionar o conteudo. Um proxy com inspeção TLS age como uma autoridade intermediaria: ele termina TLS com o cliente, cria outra conexao TLS com o destino e apresenta ao cliente um certificado gerado dinamicamente por uma CA corporativa instalada no dispositivo. Esse modelo permite inspeção, mas muda completamente a cadeia de confianca percebida pelo cliente."
  },
  {
    "kind": "paragraph",
    "text": "Para navegadores gerenciados pela empresa, isso pode ser aceitavel conforme politica. Para APIs B2B, clientes externos e mTLS, a inspeção pode quebrar o fluxo. Um cliente que faz pinning pode rejeitar o certificado gerado pelo proxy. Um fluxo mTLS pode falhar porque o proxy nao possui o certificado de cliente ou nao consegue repassar a autenticacao de forma equivalente. Aplicacoes podem falhar se a CA corporativa nao estiver no truststore correto."
  },
  {
    "kind": "paragraph",
    "text": "A presença de proxy tambem afeta troubleshooting. O certificado visto pelo cliente pode nao ser o certificado real do gateway. O IP de origem pode mudar. O handshake com o destino pode ser feito pelo proxy, nao pelo cliente original. Em incidentes, e necessario identificar se existe inspeção TLS no caminho e comparar testes de dentro e fora da rede corporativa."
  },
  {
    "kind": "paragraph",
    "text": "Para APIs sensiveis, muitas organizacoes definem listas de exclusao de inspeção ou canais dedicados. A decisao envolve seguranca defensiva, privacidade, conformidade, estabilidade e requisitos de autenticacao forte. O ponto tecnico e que TLS deixa de ser ponta a ponta quando ha inspeção intermediaria, mesmo que cada trecho ainda use TLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: mTLS e propagacao de identidade",
    "id": "aprofundamento-mtls-e-propagacao-de-identidade"
  },
  {
    "kind": "paragraph",
    "text": "Quando o gateway autentica um cliente por mTLS, surge uma pergunta: como essa identidade chega ao backend? Uma opcao e o gateway tomar a decisao localmente e encaminhar apenas uma requisicao ja autorizada. Outra opcao e propagar atributos do certificado em cabecalhos internos. Uma terceira e emitir ou trocar um token que represente a identidade verificada. Cada escolha tem riscos."
  },
  {
    "kind": "paragraph",
    "text": "Propagar certificados ou atributos por cabecalho exige proteger fortemente o trecho entre gateway e backend. O backend precisa confiar que apenas o gateway pode inserir aqueles cabecalhos. Caso contrario, um cliente poderia forjar X-Client-Cert ou campos semelhantes. Por isso, quando cabecalhos de identidade sao usados, deve haver controle de rede, remocao/reescrita de cabecalhos no gateway e, idealmente, TLS ou mTLS interno."
  },
  {
    "kind": "paragraph",
    "text": "Trocar identidade de canal por token e um modelo mais explicito. O gateway valida o certificado, aplica regras e chama o backend com um JWT interno, token de delegacao ou contexto assinado. Isso aproxima a identidade de um formato que backends entendem melhor. Por outro lado, cria uma responsabilidade adicional: proteger a emissao, assinatura, validade e audiencia desse token interno."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes financeiros, e comum combinar mTLS com OAuth. O certificado autentica o cliente tecnico e ajuda a vincular o canal; o token carrega escopos, consentimentos e contexto da autorizacao. Essa separacao melhora auditabilidade e evita dar ao certificado mais poder do que ele deveria ter."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 — Modelos de propagação de identidade mTLS.",
    "headers": [
      "Modelo de propagacao",
      "Beneficio",
      "Risco principal"
    ],
    "rows": [
      [
        "Decisao apenas no gateway",
        "Backends ficam simples.",
        "Backend depende totalmente do gateway para contexto de seguranca."
      ],
      [
        "Cabecalhos com atributos do certificado",
        "Facil de integrar.",
        "Forja de cabecalhos se o caminho interno nao for protegido."
      ],
      [
        "Token interno assinado",
        "Contexto explicito e verificavel.",
        "Exige governanca de emissao e validacao do token."
      ],
      [
        "mTLS direto ate backend",
        "Backend valida cliente diretamente.",
        "Aumenta acoplamento e complexidade operacional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: politicas de auditoria e evidencias",
    "id": "aprofundamento-politicas-de-auditoria-e-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes regulados, nao basta configurar TLS corretamente; e necessario provar que a configuracao esta correta. Evidencias podem incluir inventario de certificados, relatorios de expiracao, baseline de versoes e ciphers, resultados de varreduras, logs de alteracao, aprovacao de excecoes e registros de incidentes. Sem evidencias, uma pratica tecnica correta pode ser dificil de defender em auditoria."
  },
  {
    "kind": "paragraph",
    "text": "As evidencias devem diferenciar frontend, backend e mTLS. Um relatorio que mostra apenas o certificado publico do dominio nao prova que conexoes internas ao backend validam certificados. Da mesma forma, uma lista de certificados de cliente cadastrados nao prova que a policy realmente exige mTLS no endpoint certo. A granularidade da evidencia deve seguir a arquitetura."
  },
  {
    "kind": "paragraph",
    "text": "Auditoria tambem precisa registrar excecoes. Se um parceiro usa cipher legado por prazo determinado, a excecao deve ter justificativa, aprovador, data de expiracao, controles compensatorios e plano de remediacao. Excecoes sem prazo viram baseline informal e enfraquecem a postura de seguranca."
  },
  {
    "kind": "paragraph",
    "text": "Uma boa pratica e transformar requisitos TLS em controles automatizados. Pipelines podem validar certificados antes de deploy; scanners podem verificar endpoints; alertas podem avisar expiracao; policies- as-code podem impedir configuracoes fracas; e dashboards podem mostrar aderencia por produto, ambiente e dominio."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 — Evidências para auditoria TLS.",
    "headers": [
      "Evidencia",
      "Pergunta que responde"
    ],
    "rows": [
      [
        "Inventario de certificados",
        "Quais certificados existem e quando expiram?"
      ],
      [
        "Baseline TLS aprovado",
        "Quais versoes e ciphers sao permitidos?"
      ],
      [
        "Resultado de varredura",
        "O endpoint exposto segue o baseline?"
      ],
      [
        "Log de alteracao",
        "Quem trocou certificado ou politica TLS?"
      ],
      [
        "Registro de excecao",
        "Por que um cliente legado ainda e aceito?"
      ],
      [
        "Teste de backend TLS",
        "O gateway valida corretamente o servidor interno?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aprofundamento: anti-padroes frequentes",
    "id": "aprofundamento-anti-padroes-frequentes"
  },
  {
    "kind": "subhead",
    "text": "Desabilitar validacao de certificado para resolver incidente"
  },
  {
    "kind": "paragraph",
    "text": "Pode fazer a chamada funcionar, mas remove a autenticacao do servidor e abre espaco para man-in-the- middle. A solucao correta e ajustar cadeia, truststore, hostname ou certificado."
  },
  {
    "kind": "subhead",
    "text": "Usar o mesmo certificado wildcard em todos os ambientes"
  },
  {
    "kind": "paragraph",
    "text": "Aumenta o impacto de vazamento e dificulta isolamento. Ambientes de desenvolvimento, homologacao e producao devem ter governanca separada."
  },
  {
    "kind": "subhead",
    "text": "Confiar em qualquer CA interna sem escopo"
  },
  {
    "kind": "paragraph",
    "text": "Um truststore amplo demais pode aceitar certificados indevidos. A confianca deve ser suficiente para o caso de uso, nao ilimitada."
  },
  {
    "kind": "subhead",
    "text": "Renovar certificado sem validar cadeia completa"
  },
  {
    "kind": "paragraph",
    "text": "O certificado final pode estar correto, mas a intermediaria ausente causa falha em clientes. Sempre testar cadeia apresentada pelo endpoint."
  },
  {
    "kind": "subhead",
    "text": "Confundir certificado de transporte com autorizacao de API"
  },
  {
    "kind": "paragraph",
    "text": "TLS autentica o canal ou a entidade tecnica. Permissoes de operacao ainda precisam de policy, token, escopo ou regra de negocio."
  },
  {
    "kind": "subhead",
    "text": "Investigar 401 antes de testar handshake"
  },
  {
    "kind": "paragraph",
    "text": "Se o handshake falha, nao existe HTTP nem 401. Troubleshooting precisa seguir camadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiais e leituras recomendadas",
    "id": "referencias-oficiais-e-leituras-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3 - https://www.rfc-editor.org/info/rfc8446/ RFC 9325 - Recommendations for Secure Use of TLS and DTLS - https://datatracker.ietf.org/doc/rfc9325/ RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile - https://www.rfc-editor.org/info/rfc5280/ RFC 6066 - Transport Layer Security (TLS) Extensions - SNI - https://datatracker.ietf.org/doc/html/rfc6066 RFC 7301 - TLS Application-Layer Protocol Negotiation Extension - https://datatracker.ietf.org/doc/html/rfc7301 RFC 6960 - Online Certificate Status Protocol - OCSP - https://www.rfc-editor.org/info/rfc6960/ RFC 6797 - HTTP Strict Transport Security (HSTS) - https://www.rfc-editor.org/info/rfc6797/ RFC 8555 - Automatic Certificate Management Environment (ACME) - https://datatracker.ietf.org/doc/html/rfc8555/ NIST SP 800-52 Rev. 2 - Guidelines for TLS Implementations - https://csrc.nist.gov/pubs/sp/800/52/r2/final Microsoft Learn - Configure custom domain name for Azure API Management - https://learn.microsoft.com/en-us/azure/api-management/configure-custom-domain Microsoft Learn - Secure APIs using client certificate authentication in Azure API Management - https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-mutual-certificates-for-clients Axway Documentation - Manage certificates and keys - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/ general_certificates/index.html Axway Documentation - Configure HTTP services and HTTPS interfaces - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_services/index.html"
  }
];
